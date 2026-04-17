import { z } from 'zod';

/** Raw post extracted from Instagram before persistence. */
export const scrapedPostSchema = z.object({
  /** IG shortcode, e.g. "C1a2b3d4". This is the canonical dedup key. */
  shortcode: z.string().min(5).max(20),
  accountHandle: z.string(),
  postedAt: z.coerce.date(),
  caption: z.string(),
  mediaUrl: z.string().url().nullable(),
  permalink: z.string().url(),
});
export type ScrapedPost = z.infer<typeof scrapedPostSchema>;

/** Options controlling a single `fetchRecentPosts` invocation. */
export const scrapeOptionsSchema = z.object({
  /** Stop paginating once a post older than this is reached. */
  since: z.coerce.date().nullable(),
  /** Safety cap regardless of `since`. */
  maxPosts: z.number().int().positive().default(25),
});
export type ScrapeOptions = z.infer<typeof scrapeOptionsSchema>;
