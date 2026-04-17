import cron from 'node-cron';
import { prisma } from '@app/db';
import { loadWorkerEnv } from './config.js';
import { log } from './logger.js';
import { runPipeline } from './pipeline.js';

/**
 * Worker entry point. Schedules the pipeline per `WORKER_CRON` and also runs
 * once immediately on boot so we catch up after downtime.
 */
async function main(): Promise<void> {
  const env = loadWorkerEnv();
  if (!cron.validate(env.cron)) {
    throw new Error(`Invalid WORKER_CRON expression: ${env.cron}`);
  }

  log.info('worker starting', { cron: env.cron });

  let running = false;
  const tick = async (trigger: string) => {
    if (running) {
      log.warn('pipeline already running, skipping tick', { trigger });
      return;
    }
    running = true;
    try {
      await runPipeline(env);
    } catch (err) {
      log.error('pipeline crashed', {
        trigger,
        message: err instanceof Error ? err.message : String(err),
      });
    } finally {
      running = false;
    }
  };

  // Kick off one run on boot so we don't have to wait for the next cron tick.
  void tick('boot');

  const task = cron.schedule(env.cron, () => {
    void tick('cron');
  });

  const shutdown = async (signal: string) => {
    log.info('received signal, shutting down', { signal });
    task.stop();
    await prisma.$disconnect();
    process.exit(0);
  };
  process.on('SIGINT', () => void shutdown('SIGINT'));
  process.on('SIGTERM', () => void shutdown('SIGTERM'));
}

main().catch((err) => {
  log.error('worker boot failed', {
    message: err instanceof Error ? err.message : String(err),
  });
  process.exit(1);
});
