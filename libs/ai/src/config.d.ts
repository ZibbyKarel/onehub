/**
 * Centralised configuration for the Anthropic client.
 *
 * Keep env access isolated here so tests can pass a `ClassifierConfig` directly
 * without mucking with `process.env`.
 */
/**
 * Default model. Per the `claude-api` skill this is the current Opus release —
 * use the exact string, never append a date suffix. Override per-call if a
 * cheaper tier (e.g. Sonnet) is sufficient.
 */
export declare const DEFAULT_MODEL: "claude-opus-4-7";
/** Messages API `max_tokens` — enough headroom for 10 result objects. */
export declare const DEFAULT_MAX_TOKENS = 4096;
/** Hard cap on posts per Claude call; worker batches in chunks of this size. */
export declare const MAX_POSTS_PER_BATCH = 10;
/** Classification results below this confidence are discarded by the worker. */
export declare const MIN_CONFIDENCE = 0.6;
export interface ClassifierConfig {
    /** API key from `ANTHROPIC_API_KEY`. Required unless you inject a client. */
    apiKey: string;
    /** Model id (see `claude-api` skill for current options). */
    model: string;
    /** `max_tokens` for the Messages API response. */
    maxTokens: number;
}
/**
 * Build a `ClassifierConfig` from `process.env`. Throws if the API key is
 * missing so callers fail fast at startup instead of at first request.
 */
export declare function loadClassifierConfigFromEnv(env?: NodeJS.ProcessEnv): ClassifierConfig;
//# sourceMappingURL=config.d.ts.map