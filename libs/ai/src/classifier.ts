import Anthropic from '@anthropic-ai/sdk';
import {
  classifierBatchResponseSchema,
  type ClassifierBatchResponse,
  type ClassifierInputPost,
  type ClassifierResult,
} from '@app/shared-types';
import {
  DEFAULT_MAX_TOKENS,
  DEFAULT_MODEL,
  MAX_POSTS_PER_BATCH,
  MIN_CONFIDENCE,
  type ClassifierConfig,
} from './config.js';
import { CLASSIFIER_SYSTEM_PROMPT } from './prompts/classify.js';

export interface ClassifyOptions {
  /** Drop results with `confidence < minConfidence`. Default 0.6. */
  minConfidence?: number;
  /** Inject a client for tests. Defaults to a fresh Anthropic client. */
  client?: Anthropic;
}

/**
 * Classify a batch of Instagram posts.
 *
 * Behaviour:
 * - Splits `posts` into chunks of {@link MAX_POSTS_PER_BATCH} to keep latency
 *   predictable and stay well below the model's output window.
 * - System prompt is sent with `cache_control: { type: "ephemeral" }` — every
 *   call after the first reads the prefix from cache. Verify via
 *   `response.usage.cache_read_input_tokens` in tests.
 * - Response is validated against {@link classifierBatchResponseSchema}. A
 *   schema mismatch throws — treat it as a hard error and let the worker
 *   record it in `ClassificationRun.errors`.
 * - Results with `confidence < minConfidence` are silently dropped; only
 *   high-confidence detections reach the DB.
 */
export async function classify(
  config: ClassifierConfig,
  posts: ClassifierInputPost[],
  options: ClassifyOptions = {},
): Promise<ClassifierResult[]> {
  if (posts.length === 0) return [];

  const client = options.client ?? new Anthropic({ apiKey: config.apiKey });
  const minConfidence = options.minConfidence ?? MIN_CONFIDENCE;
  const all: ClassifierResult[] = [];

  for (const chunk of chunkPosts(posts, MAX_POSTS_PER_BATCH)) {
    const batch = await classifyBatch(client, config, chunk);
    for (const r of batch.results) {
      if (r.confidence >= minConfidence) all.push(r);
    }
  }

  return all;
}

async function classifyBatch(
  client: Anthropic,
  config: ClassifierConfig,
  posts: ClassifierInputPost[],
): Promise<ClassifierBatchResponse> {
  const response = await client.messages.create({
    model: config.model || DEFAULT_MODEL,
    max_tokens: config.maxTokens || DEFAULT_MAX_TOKENS,
    system: [
      {
        type: 'text',
        text: CLASSIFIER_SYSTEM_PROMPT,
        cache_control: { type: 'ephemeral' },
      },
    ],
    messages: [
      {
        role: 'user',
        content: renderBatchUserMessage(posts),
      },
    ],
  });

  const text = extractText(response);
  const json = parseJsonFromText(text);
  return classifierBatchResponseSchema.parse(json);
}

/** Serialise the batch as structured JSON inside the user message. */
function renderBatchUserMessage(posts: ClassifierInputPost[]): string {
  const payload = posts.map((p) => ({
    postId: p.postId,
    accountHandle: p.accountHandle,
    postedAt: p.postedAt.toISOString(),
    caption: p.caption,
    permalink: p.permalink,
  }));
  return [
    'Klasifikuj tyto posty. Vra\u0165 **pouze** JSON objekt ve form\u00e1tu popsan\u00e9m v system promptu, bez textu kolem.',
    '',
    '```json',
    JSON.stringify({ posts: payload }, null, 2),
    '```',
  ].join('\n');
}

/** Pull the first text block out of the Messages API response. */
function extractText(response: Anthropic.Message): string {
  for (const block of response.content) {
    if (block.type === 'text') return block.text;
  }
  throw new Error('Classifier response contained no text block');
}

/**
 * Tolerant JSON extractor — Claude sometimes wraps JSON in ```json fences even
 * when told not to. Strip them before parsing.
 */
function parseJsonFromText(text: string): unknown {
  const trimmed = text.trim();
  const fenced = trimmed.match(/```(?:json)?\s*([\s\S]*?)```/);
  const body = fenced?.[1]?.trim() ?? trimmed;
  try {
    return JSON.parse(body);
  } catch (err) {
    throw new Error(
      `Classifier returned non-JSON response: ${(err as Error).message}\n---\n${body.slice(0, 500)}`,
    );
  }
}

function* chunkPosts<T>(items: T[], size: number): Generator<T[]> {
  for (let i = 0; i < items.length; i += size) {
    yield items.slice(i, i + size);
  }
}
