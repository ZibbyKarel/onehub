/**
 * Single Prisma client instance shared across the monorepo.
 *
 * Why a singleton: Next.js dev mode hot-reloads modules, which, without this
 * guard, would spawn a new PrismaClient on every reload and exhaust the
 * Postgres connection pool. The global cache keeps one client across reloads.
 */
import { PrismaClient } from '@prisma/client';

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined;
};

export const prisma =
  globalForPrisma.prisma ??
  new PrismaClient({
    log: process.env.NODE_ENV === 'development' ? ['warn', 'error'] : ['error'],
  });

if (process.env.NODE_ENV !== 'production') {
  globalForPrisma.prisma = prisma;
}

export * from '@prisma/client';
export type { PrismaClient } from '@prisma/client';
