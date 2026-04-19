import { chromium } from 'playwright';
import { jitter, sleep } from './jitter.js';
import { extractPostsFromNodes, extractTimelineNodesFromHtml } from './parse.js';
const IG_BASE = 'https://www.instagram.com';
const REALISTIC_UA = 'Mozilla/5.0 (Macintosh; Intel Mac OS X 13_5) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/127.0.0.0 Safari/537.36';
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
export class InstagramScraper {
    context;
    config;
    constructor(context, config) {
        this.context = context;
        this.config = config;
    }
    static async open(config) {
        const context = await chromium.launchPersistentContext(config.sessionDir, {
            headless: config.headless,
            userAgent: REALISTIC_UA,
            viewport: { width: 1280, height: 800 },
            locale: 'cs-CZ',
            timezoneId: 'Europe/Prague',
        });
        return new InstagramScraper(context, config);
    }
    async close() {
        await this.context.close();
    }
    /**
     * Ensure the persistent session is logged in. No-op if cookies already point
     * at the feed; runs the login form otherwise.
     */
    async ensureLoggedIn() {
        const page = await this.newPage();
        try {
            await page.goto(IG_BASE, { waitUntil: 'domcontentloaded' });
            await jitter(this.config.jitterMinMs, this.config.jitterMaxMs);
            if (await this.isLoggedIn(page))
                return;
            await this.performLogin(page);
        }
        finally {
            await page.close();
        }
    }
    /**
     * Fetch the most recent posts for a handle, newest-first.
     *
     * - Stops once it hits a post older than `since` (when provided).
     * - Always capped at `maxPosts`.
     * - Returns `[]` on any parse failure (caller logs and continues).
     */
    async fetchRecentPosts(handle, opts) {
        const maxPosts = opts.maxPosts ?? this.config.maxPostsPerHandle;
        const page = await this.newPage();
        try {
            await page.goto(`${IG_BASE}/${encodeURIComponent(handle)}/`, {
                waitUntil: 'domcontentloaded',
            });
            await jitter(this.config.jitterMinMs, this.config.jitterMaxMs);
            if (await this.hasChallenge(page)) {
                // IG showed a captcha / checkpoint — bail out and let caller log it.
                return [];
            }
            const html = await page.content();
            const nodes = extractTimelineNodesFromHtml(html);
            return extractPostsFromNodes(nodes, {
                accountHandle: handle,
                since: opts.since,
                maxPosts,
            });
        }
        finally {
            await page.close();
        }
    }
    /** Wait between handle scrapes to respect the configured rate limit. */
    async waitBetweenHandles() {
        await sleep(this.config.handleDelaySeconds * 1000);
    }
    async newPage() {
        const page = await this.context.newPage();
        // Strip the webdriver flag; stealth-lite.
        await page.addInitScript(() => {
            Object.defineProperty(navigator, 'webdriver', { get: () => false });
        });
        return page;
    }
    async isLoggedIn(page) {
        // The logged-out home page shows a `/accounts/login/` button; the logged-in
        // feed does not. Checking cookies is flakier because IG issues several
        // transitional cookies even while logged out.
        const loginLink = page.locator('a[href="/accounts/login/"]').first();
        return !(await loginLink.isVisible({ timeout: 2_000 }).catch(() => false));
    }
    async hasChallenge(page) {
        const url = page.url();
        return url.includes('/challenge/') || url.includes('/checkpoint/');
    }
    async performLogin(page) {
        await page.goto(`${IG_BASE}/accounts/login/`, { waitUntil: 'domcontentloaded' });
        await jitter(this.config.jitterMinMs, this.config.jitterMaxMs);
        await page.fill('input[name="username"]', this.config.igUsername);
        await page.fill('input[name="password"]', this.config.igPassword);
        await jitter(500, 1500);
        await page.click('button[type="submit"]');
        // Wait for either the feed or a challenge. If we end up on a challenge,
        // the caller must log in interactively at least once (headless: false).
        await page.waitForLoadState('networkidle', { timeout: 30_000 }).catch(() => { });
        if (await this.hasChallenge(page)) {
            throw new Error('Instagram presented a challenge/checkpoint. Run once with IG_HEADLESS=false ' +
                'and complete the challenge manually to seed the persistent session.');
        }
    }
}
//# sourceMappingURL=instagram.js.map