/**
 * Centralised scraper configuration.
 *
 * Keep env parsing in one place — both the worker and any ad-hoc scripts
 * should go through `loadScraperConfigFromEnv`.
 */
export interface ScraperConfig {
    /** Instagram login — used on first run or when cookies expire. */
    igUsername: string;
    igPassword: string;
    /**
     * Directory where Playwright persists its context (cookies + localStorage).
     * Mount this as a volume in docker-compose so sessions survive restarts.
     */
    sessionDir: string;
    /** Run Chromium headless. Turn off when debugging login flows. */
    headless: boolean;
    /** Hard cap on posts per handle per invocation (regardless of `since`). */
    maxPostsPerHandle: number;
    /** Minimum seconds between handle scrapes to avoid rate-limiting. */
    handleDelaySeconds: number;
    /** Extra random jitter (ms) added to every navigation step. */
    jitterMinMs: number;
    jitterMaxMs: number;
}
export declare const DEFAULTS: {
    readonly headless: true;
    readonly maxPostsPerHandle: 25;
    readonly handleDelaySeconds: 10;
    readonly jitterMinMs: 2000;
    readonly jitterMaxMs: 5000;
};
export declare function loadScraperConfigFromEnv(env?: NodeJS.ProcessEnv): ScraperConfig;
//# sourceMappingURL=config.d.ts.map