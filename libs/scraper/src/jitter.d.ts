/**
 * Small helpers for randomised pacing. Used between navigation steps to avoid
 * looking like a script. Deterministic `sleep` so tests can stub it.
 */
export declare const sleep: (ms: number) => Promise<void>;
export declare function randomJitter(minMs: number, maxMs: number): number;
export declare const jitter: (minMs: number, maxMs: number) => Promise<void>;
//# sourceMappingURL=jitter.d.ts.map