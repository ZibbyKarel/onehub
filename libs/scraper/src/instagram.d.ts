import type { ScrapedPost } from '@app/shared-types';
import type { ScraperConfig } from './config.js';
/**
 * Top-level Instagram scraper.
 *
 * Usage:
 *   const scraper = await InstagramScraper.open(config);
 *   try {
 *     await scraper.ensureLoggedIn();
 *     const posts = await scraper.fetchRecentPosts('nike', { since, maxPosts: 25 });
 *   } finally {
 *     await scraper.close();
 *   }
 *
 * Persistent context (cookies, localStorage) is stored in `config.sessionDir`.
 * Mount that path as a volume so re-login isn't required after every container
 * restart.
 */
export declare class InstagramScraper {
    private readonly context;
    private readonly config;
    private constructor();
    static open(config: ScraperConfig): Promise<InstagramScraper>;
    close(): Promise<void>;
    /**
     * Ensure the persistent session is logged in. No-op if cookies already point
     * at the feed; runs the login form otherwise.
     */
    ensureLoggedIn(): Promise<void>;
    /**
     * Fetch the most recent posts for a handle, newest-first.
     *
     * - Stops once it hits a post older than `since` (when provided).
     * - Always capped at `maxPosts`.
     * - Returns `[]` on any parse failure (caller logs and continues).
     */
    fetchRecentPosts(handle: string, opts: {
        since: Date | null;
        maxPosts?: number;
    }): Promise<ScrapedPost[]>;
    /** Wait between handle scrapes to respect the configured rate limit. */
    waitBetweenHandles(): Promise<void>;
    private newPage;
    private isLoggedIn;
    private hasChallenge;
    private performLogin;
}
//# sourceMappingURL=instagram.d.ts.map