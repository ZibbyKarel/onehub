import { classify, type ClassifierConfig } from '@app/ai';
import { prisma, type Account } from '@app/db';
import { InstagramScraper, type ScraperConfig } from '@app/scraper';
import type { ClassifierInputPost, ContestTask, ScrapedPost } from '@app/shared-types';
import { log } from './logger.js';

export interface PipelineConfig {
  scraper: ScraperConfig;
  classifier: ClassifierConfig;
}

interface RunResult {
  runId: string;
  postsScanned: number;
  contestsFound: number;
  errors: Array<{ handle: string; message: string }>;
}

/**
 * One full worker pass:
 *   1. Load active accounts.
 *   2. For each account: scrape recent posts since `lastScrapedAt`.
 *   3. Upsert new posts (dedup by IG shortcode = Post.id).
 *   4. Send new posts to the classifier.
 *   5. Persist detected contests.
 *   6. Record a ClassificationRun row so we can debug later.
 *
 * Failures on a single handle are logged into `errors` but never abort the run
 * — one banned account shouldn't block the rest.
 */
export async function runPipeline(config: PipelineConfig): Promise<RunResult> {
  const run = await prisma.classificationRun.create({ data: {} });
  const errors: Array<{ handle: string; message: string }> = [];
  let postsScanned = 0;
  let contestsFound = 0;

  const accounts = await prisma.account.findMany({ where: { active: true } });
  if (accounts.length === 0) {
    log.warn('no active accounts to scrape');
    await finishRun(run.id, { postsScanned, contestsFound, errors });
    return { runId: run.id, postsScanned, contestsFound, errors };
  }

  const scraper = await InstagramScraper.open(config.scraper);
  try {
    await scraper.ensureLoggedIn();

    for (const account of accounts) {
      try {
        const scraped = await scrapeAndStore(scraper, account);
        postsScanned += scraped.newPosts.length;

        if (scraped.newPosts.length > 0) {
          const detected = await classifyAndStore(config.classifier, scraped.newPosts);
          contestsFound += detected;
        }

        await prisma.account.update({
          where: { id: account.id },
          data: { lastScrapedAt: new Date() },
        });
        log.info('handle scraped', {
          handle: account.handle,
          newPosts: scraped.newPosts.length,
        });
      } catch (err) {
        const message = err instanceof Error ? err.message : String(err);
        log.error('handle failed', { handle: account.handle, message });
        errors.push({ handle: account.handle, message });
      }

      await scraper.waitBetweenHandles();
    }
  } finally {
    await scraper.close();
  }

  await finishRun(run.id, { postsScanned, contestsFound, errors });
  log.info('pipeline run complete', { runId: run.id, postsScanned, contestsFound });
  return { runId: run.id, postsScanned, contestsFound, errors };
}

async function scrapeAndStore(
  scraper: InstagramScraper,
  account: Account,
): Promise<{ newPosts: ScrapedPost[] }> {
  const scraped = await scraper.fetchRecentPosts(account.handle, {
    since: account.lastScrapedAt,
  });

  const newPosts: ScrapedPost[] = [];
  for (const post of scraped) {
    // Dedup by shortcode (Post.id). Skip ones we've already stored.
    const existing = await prisma.post.findUnique({ where: { id: post.shortcode } });
    if (existing) continue;

    await prisma.post.create({
      data: {
        id: post.shortcode,
        accountId: account.id,
        postedAt: post.postedAt,
        caption: post.caption,
        mediaUrl: post.mediaUrl,
        permalink: post.permalink,
      },
    });
    newPosts.push(post);
  }
  return { newPosts };
}

async function classifyAndStore(
  config: ClassifierConfig,
  posts: ScrapedPost[],
): Promise<number> {
  const input: ClassifierInputPost[] = posts.map((p) => ({
    postId: p.shortcode,
    accountHandle: p.accountHandle,
    postedAt: p.postedAt,
    caption: p.caption,
    permalink: p.permalink,
  }));

  const results = await classify(config, input);
  let stored = 0;

  for (const result of results) {
    if (!result.isContest || !result.summary) continue;
    await prisma.contest.upsert({
      where: { postId: result.postId },
      update: {
        summary: result.summary,
        suggestedComment: result.suggestedComment,
        tasks: result.tasks satisfies ContestTask[],
        deadline: result.deadline ? new Date(result.deadline) : null,
      },
      create: {
        postId: result.postId,
        summary: result.summary,
        suggestedComment: result.suggestedComment,
        tasks: result.tasks satisfies ContestTask[],
        deadline: result.deadline ? new Date(result.deadline) : null,
      },
    });
    stored++;
  }
  return stored;
}

async function finishRun(
  runId: string,
  stats: { postsScanned: number; contestsFound: number; errors: Array<{ handle: string; message: string }> },
): Promise<void> {
  await prisma.classificationRun.update({
    where: { id: runId },
    data: {
      finishedAt: new Date(),
      postsScanned: stats.postsScanned,
      contestsFound: stats.contestsFound,
      errors: stats.errors.length ? stats.errors : undefined,
    },
  });
}
