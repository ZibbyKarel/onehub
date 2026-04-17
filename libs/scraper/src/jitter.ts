/**
 * Small helpers for randomised pacing. Used between navigation steps to avoid
 * looking like a script. Deterministic `sleep` so tests can stub it.
 */

export const sleep = (ms: number): Promise<void> =>
  new Promise((resolve) => setTimeout(resolve, ms));

export function randomJitter(minMs: number, maxMs: number): number {
  if (maxMs <= minMs) return minMs;
  return Math.floor(minMs + Math.random() * (maxMs - minMs));
}

export const jitter = (minMs: number, maxMs: number): Promise<void> =>
  sleep(randomJitter(minMs, maxMs));
