# AGENTS.md — Instagram Giveaway Aggregator

Guidelines for AI coding agents (Claude Code, Cursor, Copilot) working in this repo.

## Project summary

Self-hosted aggregator of Instagram giveaways. A Node.js worker runs once per day, logs in to Instagram via Playwright (persistent session), pulls new posts from a configured list of accounts, classifies them with the Claude API, extracts the giveaway tasks + generates a ready-to-paste comment, and stores everything in Postgres. A Next.js dashboard lets the user browse detected giveaways and copy the generated comment.

See `/Users/zibby/.claude/plans/twinkly-sparking-crab.md` for the full plan.

## Stack

- **Language**: TypeScript (strict) everywhere
- **Runtime**: Node.js 20
- **Monorepo**: NX + pnpm workspaces
- **Web**: Next.js 15 (App Router) + Tanstack Query + Styled-Components
- **Background worker**: plain Node.js with `node-cron` + Playwright
- **DB**: PostgreSQL + Prisma
- **AI**: Anthropic SDK, default model `claude-opus-4-7` (overridable via `ANTHROPIC_MODEL`), with ephemeral prompt caching on the system prompt
- **Forms**: react-hook-form + Zod (wrapped by `libs/form` with `Form*` prefix)
- **Deployment**: docker-compose (local dev only)

## Repository layout

```
apps/
  web/        Next.js dashboard
  worker/     cron + scraper + classifier pipeline
libs/
  db/            Prisma client + schema re-exports
  ai/            Claude classifier
  scraper/       Playwright Instagram helpers
  ui-tokens/     design tokens
  ui/            Styled-Components design system
  form/          react-hook-form wrappers (FormInput, FormSelect, …)
  shared-types/  Zod schemas shared between apps
prisma/          schema.prisma (source of truth for libs/db)
```

## Local skills in use

Installed under `.claude/skills/` from `vercel-labs/agent-skills`:

- **`react-best-practices`** — apply when writing/reviewing React components in `apps/web` or `libs/ui`. 70 rules in 8 categories (waterfalls, bundle size, server perf, re-render, etc.). Reference this before writing any new Next.js page or data fetch.
- **`composition-patterns`** — apply when designing the API for `libs/form` and `libs/ui` components. Favours compound components + slots over boolean-prop explosions.
- **`web-design-guidelines`** — audit dashboard UI for accessibility and UX consistency; run before finishing any `apps/web` screen.
- **`react-view-transitions`** — nice-to-have for screen transitions in the dashboard (list → detail).

Built-in skills to use:

- **`claude-api`** — MUST be active when editing `libs/ai`. Guarantees prompt caching is wired correctly and that the model string is current.
- **`superpowers:systematic-debugging`** — when a scraper, worker, or classifier run fails.
- **`superpowers:test-driven-development`** — write tests first for `libs/ai` (mock Anthropic), `libs/form` (@testing-library), and `libs/scraper` (HTML fixtures).

## Coding conventions

- TypeScript `strict: true`, no `any` without a `// TODO` justifying it.
- Every public API exported from a `libs/*` package must have a Zod schema in `libs/shared-types` if it crosses a process/HTTP boundary.
- Styled-components: use theme tokens from `@app/ui`; never hardcode hex/px.
- Form components: always render through `libs/form` wrappers in `apps/web`; raw `<input>` is forbidden in app code.
- Secrets: only via `process.env`, typed through a central `env.ts` per app.

## Critical invariants

1. **Never commit real Instagram credentials or Anthropic keys.** `.env` is gitignored; `.env.example` is the template.
2. **Never bypass rate limits** in `libs/scraper` — minimum 10s between handles, 25 posts max per handle per run.
3. **Never call Claude without `cache_control: { type: "ephemeral" }`** on the system prompt in `libs/ai`.
4. **Never mutate `schema.prisma` without running `prisma migrate dev`** — migrations are part of the commit.

## Running locally

```bash
cp .env.example .env                     # fill IG_USERNAME / IG_PASSWORD / ANTHROPIC_API_KEY
docker compose up -d postgres
pnpm install                              # postinstall runs `prisma generate`
pnpm prisma:migrate                       # apply migrations
pnpm --filter @app/worker dev:run-once    # one worker pass
pnpm --filter @app/web dev                # dashboard on :3000
```
