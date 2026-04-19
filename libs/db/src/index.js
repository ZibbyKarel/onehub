/**
 * Single Prisma client instance shared across the monorepo.
 *
 * Why a singleton: Next.js dev mode hot-reloads modules, which, without this
 * guard, would spawn a new PrismaClient on every reload and exhaust the
 * Postgres connection pool. The global cache keeps one client across reloads.
 */
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { PrismaClient } from '@prisma/client';
if (!process.env.DATABASE_URL && typeof process.loadEnvFile === 'function') {
    const currentDir = dirname(fileURLToPath(import.meta.url));
    const workspaceEnvPath = resolve(currentDir, '../../../.env');
    try {
        process.loadEnvFile(workspaceEnvPath);
    }
    catch (error) {
        if (!(error instanceof Error) ||
            !('code' in error) ||
            error.code !== 'ENOENT') {
            throw error;
        }
    }
}
const globalForPrisma = globalThis;
export const prisma = globalForPrisma.prisma ??
    new PrismaClient({
        log: process.env.NODE_ENV === 'development' ? ['warn', 'error'] : ['error'],
    });
if (process.env.NODE_ENV !== 'production') {
    globalForPrisma.prisma = prisma;
}
export * from '@prisma/client';
//# sourceMappingURL=index.js.map