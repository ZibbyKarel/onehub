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
export const DEFAULT_MODEL = 'claude-opus-4-7';
/** Messages API `max_tokens` — enough headroom for 10 result objects. */
export const DEFAULT_MAX_TOKENS = 4096;
/** Hard cap on posts per Claude call; worker batches in chunks of this size. */
export const MAX_POSTS_PER_BATCH = 10;
/** Classification results below this confidence are discarded by the worker. */
export const MIN_CONFIDENCE = 0.6;
/**
 * Build a `ClassifierConfig` from `process.env`. Throws if the API key is
 * missing so callers fail fast at startup instead of at first request.
 */
export function loadClassifierConfigFromEnv(env = process.env) {
    const apiKey = env.ANTHROPIC_API_KEY?.trim();
    if (!apiKey) {
        throw new Error('ANTHROPIC_API_KEY is required for @app/ai classifier');
    }
    return {
        apiKey,
        model: env.ANTHROPIC_MODEL?.trim() || DEFAULT_MODEL,
        maxTokens: Number(env.ANTHROPIC_MAX_TOKENS) || DEFAULT_MAX_TOKENS,
    };
}
//# sourceMappingURL=config.js.map