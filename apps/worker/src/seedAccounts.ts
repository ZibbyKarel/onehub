import { readFile } from 'node:fs/promises';
import { resolve } from 'node:path';
import { prisma } from '@app/db';
import { accountFormSchema } from '@app/shared-types';
import { log } from './logger.js';

/**
 * Seeds the Account table from `accounts.seed.json` at the repo root.
 *
 * Format:
 *   [{ "handle": "nike", "displayName": "Nike", "active": true }, ...]
 *
 * Run via `pnpm --filter @app/worker seed:accounts`. Safe to run repeatedly
 * — uses `upsert` keyed on `handle`.
 */
async function main(): Promise<void> {
  const path =
    process.env.ACCOUNTS_SEED_PATH ?? resolve(process.cwd(), 'accounts.seed.json');
  const raw = await readFile(path, 'utf8');
  const parsed = JSON.parse(raw) as unknown;
  if (!Array.isArray(parsed)) {
    throw new Error(`${path} must contain an array of account objects`);
  }

  let inserted = 0;
  for (const entry of parsed) {
    const account = accountFormSchema.parse(entry);
    await prisma.account.upsert({
      where: { handle: account.handle },
      update: {
        displayName: account.displayName || null,
        active: account.active,
      },
      create: {
        handle: account.handle,
        displayName: account.displayName || null,
        active: account.active,
      },
    });
    inserted++;
  }
  log.info('accounts seeded', { file: path, count: inserted });
  await prisma.$disconnect();
}

main().catch(async (err) => {
  log.error('seed failed', { message: err instanceof Error ? err.message : String(err) });
  await prisma.$disconnect();
  process.exit(1);
});
