import Anthropic from '@anthropic-ai/sdk';
import { type ClassifierInputPost, type ClassifierResult } from '@app/shared-types';
import { type ClassifierConfig } from './config.js';
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
export declare function classify(config: ClassifierConfig, posts: ClassifierInputPost[], options?: ClassifyOptions): Promise<ClassifierResult[]>;
//# sourceMappingURL=classifier.d.ts.map