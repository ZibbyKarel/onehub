# Multi-stage Dockerfile for apps/web. Builds Next.js in standalone mode so
# the runtime image only ships `.next/standalone` + static assets.
#
# Build from the repo root:
#   docker build -f apps/web/Dockerfile -t igga-web .
#
# The context is the monorepo root because we need @app/db (+ its generated
# Prisma client) and the other workspace libs.

ARG NODE_VERSION=20-alpine

FROM node:${NODE_VERSION} AS base
ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"
RUN corepack enable

# ---------- deps ----------
FROM base AS deps
WORKDIR /app
COPY package.json pnpm-lock.yaml pnpm-workspace.yaml nx.json tsconfig.base.json ./
COPY apps/web/package.json apps/web/
COPY libs/db/package.json libs/db/
COPY libs/db/prisma libs/db/prisma
COPY libs/ai/package.json libs/ai/
COPY libs/scraper/package.json libs/scraper/
COPY libs/ui/package.json libs/ui/
COPY libs/ui-tokens/package.json libs/ui-tokens/
COPY libs/form/package.json libs/form/
COPY libs/shared-types/package.json libs/shared-types/
RUN pnpm install --frozen-lockfile

# ---------- build ----------
FROM base AS build
WORKDIR /app
# Copy the entire dependency tree from deps stage
COPY --from=deps /app .
# Overwrite with actual source files
COPY . .
RUN pnpm --filter @app/db exec prisma generate
RUN pnpm --filter @app/web build
# Create empty directories for optional assets if they don't exist
RUN mkdir -p apps/web/public node_modules/.prisma node_modules/@prisma/client

# ---------- runtime ----------
FROM node:${NODE_VERSION} AS runtime
WORKDIR /app
ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1
# Next standalone output copies only what's needed; we add the prisma client
# generated binaries explicitly.
COPY --from=build /app/apps/web/.next/standalone ./
COPY --from=build /app/apps/web/.next/static ./apps/web/.next/static
COPY --from=build /app/apps/web/public ./apps/web/public
COPY --from=build /app/node_modules/.prisma ./node_modules/.prisma
COPY --from=build /app/node_modules/@prisma/client ./node_modules/@prisma/client
EXPOSE 3000
CMD ["node", "apps/web/server.js"]
