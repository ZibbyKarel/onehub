# Multi-stage Dockerfile for apps/web. Builds Next.js in standalone mode so
# the runtime image only ships `.next/standalone` + static assets.
#
# Build from the repo root:
#   docker build -f apps/web/Dockerfile -t igga-web .
#
# The context is the monorepo root because we need @app/db (+ its generated
# Prisma client) and the other workspace libs.

ARG NODE_VERSION=20-bullseye-slim
ARG PNPM_VERSION=9.12.0

FROM node:${NODE_VERSION} AS base
ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"
RUN apt-get update && apt-get install -y --no-install-recommends openssl ca-certificates && rm -rf /var/lib/apt/lists/*
RUN npm install -g pnpm@${PNPM_VERSION}

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
COPY libs/form/package.json libs/form/
COPY libs/sharedTypes/package.json libs/sharedTypes/
RUN pnpm install --frozen-lockfile

# ---------- build ----------
FROM base AS build
WORKDIR /app
COPY --from=deps /app ./
COPY . .
RUN pnpm prisma:generate
RUN pnpm --filter @app/web build

# ---------- runtime ----------
FROM node:${NODE_VERSION} AS runtime
WORKDIR /app
ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1
# Next standalone output copies the traced app files, but Prisma's engine can
# still be missed in monorepo Docker builds. Copying `node_modules` from the
# build stage keeps the generated client + engine available at runtime.
COPY --from=build /app/apps/web/.next/standalone ./
COPY --from=build /app/apps/web/.next/static ./apps/web/.next/static
COPY --from=build /app/node_modules ./node_modules
EXPOSE 3000
CMD ["node", "apps/web/server.js"]
