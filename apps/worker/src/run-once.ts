import { prisma } from '@app/db';
import { loadWorkerEnv } from './config.js';
import { log } from './logger.js';
import { runPipeline } from './pipeline.js';

/**
 * One-shot CLI: run the pipeline exactly once and exit. Handy for
 * `pnpm --filter @app/worker dev:run-once` while debugging.
 */
async function main(): Promise<void> {
  const env = loadWorkerEnv();
  log.info('one-shot pipeline run starting');
  try {
    const result = await runPipeline(env);
    log.info('one-shot pipeline run finished', result);
  } finally {
    await prisma.$disconnect();
  }
}

main().catch((err) => {
  log.error('run-once failed', {
    message: err instanceof Error ? err.message : String(err),
  });
  process.exit(1);
});
