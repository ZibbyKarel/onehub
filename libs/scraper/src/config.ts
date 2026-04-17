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

export const DEFAULTS = {
  headless: true,
  maxPostsPerHandle: 25,
  handleDelaySeconds: 10,
  jitterMinMs: 2000,
  jitterMaxMs: 5000,
} as const;

export function loadScraperConfigFromEnv(env: NodeJS.ProcessEnv = process.env): ScraperConfig {
  const username = env.IG_USERNAME?.trim();
  const password = env.IG_PASSWORD?.trim();
  if (!username || !password) {
    throw new Error('IG_USERNAME and IG_PASSWORD are required for @app/scraper');
  }
  return {
    igUsername: username,
    igPassword: password,
    sessionDir: env.IG_SESSION_DIR?.trim() || '/data/ig-session',
    headless: env.IG_HEADLESS !== 'false',
    maxPostsPerHandle: Number(env.WORKER_MAX_POSTS_PER_HANDLE) || DEFAULTS.maxPostsPerHandle,
    handleDelaySeconds: Number(env.WORKER_HANDLE_DELAY_SECONDS) || DEFAULTS.handleDelaySeconds,
    jitterMinMs: Number(env.IG_JITTER_MIN_MS) || DEFAULTS.jitterMinMs,
    jitterMaxMs: Number(env.IG_JITTER_MAX_MS) || DEFAULTS.jitterMaxMs,
  };
}
