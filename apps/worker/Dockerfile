# Worker image: Node + Playwright + cron. Based on the official Playwright
# image so Chromium and all its system deps are pre-installed.
#
# Build:
#   docker build -f apps/worker/Dockerfile -t igga-worker .

ARG PLAYWRIGHT_VERSION=v1.47.0-jammy

FROM mcr.microsoft.com/playwright:${PLAYWRIGHT_VERSION} AS base
ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"
RUN npm install -g pnpm@9.12.0

# ---------- deps ----------
FROM base AS deps
WORKDIR /app
COPY package.json pnpm-lock.yaml pnpm-workspace.yaml nx.json tsconfig.base.json ./
COPY apps/worker/package.json apps/worker/
COPY libs/db/package.json libs/db/
COPY libs/db/prisma libs/db/prisma
COPY libs/ai/package.json libs/ai/
COPY libs/scraper/package.json libs/scraper/
COPY libs/shared-types/package.json libs/shared-types/
RUN pnpm install --frozen-lockfile

# ---------- build ----------
FROM base AS build
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .
RUN pnpm --filter @app/db exec prisma generate
RUN pnpm --filter @app/worker build

# ---------- runtime ----------
FROM base AS runtime
WORKDIR /app
ENV NODE_ENV=production
COPY --from=build /app/node_modules ./node_modules
COPY --from=build /app/apps/worker/dist ./apps/worker/dist
COPY --from=build /app/libs ./libs
COPY --from=build /app/apps/worker/package.json ./apps/worker/package.json
COPY --from=build /app/package.json ./package.json
# Run migrations on boot (`migrate deploy` is idempotent) then start the cron.
CMD ["sh", "-c", "pnpm --filter @app/db exec prisma migrate deploy && node apps/worker/dist/main.js"]
