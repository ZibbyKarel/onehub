/**
 * Idempotent dev seed: adds a few sample Instagram accounts to scrape.
 * Run with `pnpm --filter @app/db seed`.
 */
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const SEED_ACCOUNTS: { handle: string; displayName?: string }[] = [
  { handle: 'instagram', displayName: 'Instagram (official)' },
  // Add your favourite giveaway-heavy handles here, e.g.:
  // { handle: 'nike' },
  // { handle: 'adidas_cz' },
];

async function main() {
  for (const acc of SEED_ACCOUNTS) {
    await prisma.account.upsert({
      where: { handle: acc.handle },
      create: { handle: acc.handle, displayName: acc.displayName ?? null },
      update: { displayName: acc.displayName ?? null, active: true },
    });
    console.log(`seeded account @${acc.handle}`);
  }
}

main()
  .catch((err) => {
    console.error(err);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());
