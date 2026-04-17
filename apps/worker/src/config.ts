import { loadClassifierConfigFromEnv } from '@app/ai';
import { loadScraperConfigFromEnv } from '@app/scraper';
import type { PipelineConfig } from './pipeline.js';

/**
 * Worker-level env. Each sub-lib owns its own env parsing; we just stitch them
 * together here so tests can still hand-craft a `PipelineConfig`.
 */
export interface WorkerEnv extends PipelineConfig {
  cron: string;
}

export function loadWorkerEnv(env: NodeJS.ProcessEnv = process.env): WorkerEnv {
  return {
    cron: env.WORKER_CRON?.trim() || '0 6 * * *',
    scraper: loadScraperConfigFromEnv(env),
    classifier: loadClassifierConfigFromEnv(env),
  };
}
