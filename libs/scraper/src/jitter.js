/**
 * Small helpers for randomised pacing. Used between navigation steps to avoid
 * looking like a script. Deterministic `sleep` so tests can stub it.
 */
export const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
export function randomJitter(minMs, maxMs) {
    if (maxMs <= minMs)
        return minMs;
    return Math.floor(minMs + Math.random() * (maxMs - minMs));
}
export const jitter = (minMs, maxMs) => sleep(randomJitter(minMs, maxMs));
//# sourceMappingURL=jitter.js.map