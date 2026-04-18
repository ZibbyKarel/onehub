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

## Skill adoption matrix (Tier 1 required vs Tier 2 optional)

Use this matrix to decide which skill to activate before making changes.

### Tier 1 (required)

| Skill | Target paths | Trigger scenarios |
| --- | --- | --- |
| `react-best-practices` | `apps/web`, `libs/ui` | Building or refactoring Next.js pages, hooks, data-fetching boundaries, rendering patterns, or component performance-sensitive UIs. **Invariant reminders:** keep TypeScript strict (no unjustified `any`), use `libs/form` wrappers instead of raw inputs in app code, and keep styling token-based via `@app/ui` (no hardcoded hex/px). |
| `composition-patterns` | `libs/form`, `libs/ui`, `apps/web` | Designing/reworking component APIs, especially when props are growing; prefer compound components and slots over boolean-prop expansion. **Invariant reminders:** preserve form-wrapper usage in `apps/web`, and ensure public cross-boundary APIs still map to Zod schemas in `libs/shared-types`. |
| `web-design-guidelines` | `apps/web`, `libs/ui` | Final pass on dashboard screens for accessibility, hierarchy, interaction clarity, and visual consistency before merge. **Invariant reminders:** maintain design-token usage and avoid introducing UX shortcuts that bypass established form/UI conventions. |
| `claude-api` | `libs/ai` | Any Anthropic client/prompt/model/cache-control changes; must preserve ephemeral prompt caching behavior and model configuration discipline. **Invariant reminders:** always keep `cache_control: { type: "ephemeral" }` on system prompts, keep secrets in `process.env` only, and do not hardcode keys/model credentials. |
| `superpowers:test-driven-development` | `libs/ai`, `libs/form`, `libs/scraper`, related app consumers | New behavior or bug fixes where tests can be written first; required for classifier logic, form wrapper behavior, and scraper parsing/fixtures. **Invariant reminders:** include tests for scraper pacing limits (10s between handles, 25 posts max), Claude cache-control behavior, and schema/form constraints when behavior changes. |
| `superpowers:systematic-debugging` | `apps/worker`, `libs/scraper`, `libs/ai` | Worker pipeline failures, flaky scraping sessions, classifier misclassification, cron/runtime failures, and reproduction/isolation workflows. **Invariant reminders:** debug without bypassing scraper rate limits, never expose secrets in logs, and if debugging touches Prisma schema assumptions, ensure `prisma migrate dev` is run before commit. |

### Tier 2 (optional / situational)

| Skill | Target paths | Trigger scenarios | Decision |
| --- | --- | --- | --- |
| `react-view-transitions` | `apps/web` | Nice-to-have list → detail and similar navigational transitions when UX polish is explicitly in scope. | **Install now (optional use):** lightweight UX enhancement skill for dashboard polish work; not required for routine feature delivery. |
| `nx-workspace` | whole repo | Repository exploration, dependency/task discovery, and determining the right project/target before running commands. | **Defer local install:** use built-in Nx guidance/MCP workflow for now; revisit local mirror only if repeated discovery friction appears. |
| `nx-generate` | whole repo | Any scaffolding/generator workflow (new app/lib/config structure) before using Nx generator commands. | **Defer local install:** current repo has stable structure and low scaffolding frequency; add local mirror when generator-heavy work begins. |

Tier 2 handling rationale:
- We keep optional skills intentionally lean to reduce maintenance/sync overhead.
- `react-view-transitions` is worth keeping locally because it directly benefits `apps/web` polish tasks.
- `nx-workspace` and `nx-generate` remain documented and available conceptually through project Nx guidance, but are deferred from local `.claude/skills` sync until demand justifies ongoing upkeep.
- Deferral does **not** change Nx-first workflow requirements in this repository.

### Optional-skill usage boundaries (to avoid accidental “mandatory” interpretation)

- **Tier 1 skills are the only mandatory default set** for routine implementation and review.
- **`react-view-transitions` is opt-in only** when UX transition polish is explicitly requested/scope-approved; do not block feature completion on adding transitions.
- **`nx-workspace` and `nx-generate` are workflow aids, not merge gates** in their deferred state; continue following Nx-first commands and guidance even without local mirrored skill directories.
- **Do not fail/redo otherwise-correct work solely because an optional skill was not invoked** unless the task explicitly requires that optional capability.
- **Escalate optional skills to required-on-task only when acceptance criteria says so** (for example, “add animated list→detail transition” or “scaffold a new Nx library”).
- **Documentation and PR summaries should label optional skill use as discretionary** (“used for polish/scaffolding support”), not as baseline policy.

## Excluded upstream skills and rationale

To keep this repository focused, we intentionally do **not** adopt every skill from `vercel-labs/agent-skills`.

- **Technology mismatch**: Skills centered on stacks not used here (for example Vue/Svelte/mobile-native ecosystems, non-Node backend frameworks, or cloud/provider-specific workflows that do not map to this self-hosted setup).
- **Low impact for this codebase**: Skills that duplicate guidance already covered by our required set (`react-best-practices`, `composition-patterns`, `web-design-guidelines`, `claude-api`, TDD/debugging superpowers) without adding concrete day-to-day value.
- **Out of current scope**: Skills aimed at domains not in this project’s roadmap (e.g., specialized animation-heavy UX systems, infra/security hardening playbooks beyond our existing invariants, or language/tooling ecosystems absent from this monorepo).

Inclusion rule of thumb: a skill is adopted only when it has a clear trigger scenario in `apps/web`, `apps/worker`, `libs/ai`, `libs/form`, or `libs/ui`, and improves implementation quality beyond existing repository conventions.

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

<!-- nx configuration start-->
<!-- Leave the start & end comments to automatically receive updates. -->

## General Guidelines for working with Nx

- For navigating/exploring the workspace, invoke the `nx-workspace` skill first - it has patterns for querying projects, targets, and dependencies
- When running tasks (for example build, lint, test, e2e, etc.), always prefer running the task through `nx` (i.e. `nx run`, `nx run-many`, `nx affected`) instead of using the underlying tooling directly
- Prefix nx commands with the workspace's package manager (e.g., `pnpm nx build`, `npm exec nx test`) - avoids using globally installed CLI
- You have access to the Nx MCP server and its tools, use them to help the user
- For Nx plugin best practices, check `node_modules/@nx/<plugin>/PLUGIN.md`. Not all plugins have this file - proceed without it if unavailable.
- NEVER guess CLI flags - always check nx_docs or `--help` first when unsure

### Nx-first workflow examples by common task

- **Run web lint/tests/build** (`apps/web`): use `pnpm nx run web:lint`, `pnpm nx run web:test`, `pnpm nx run web:build` rather than calling underlying tools directly.
- **Run worker checks** (`apps/worker`): use `pnpm nx run worker:test` / `pnpm nx run worker:build` as available in project targets.
- **Run many projects after shared library changes** (`libs/ui`, `libs/form`, `libs/ai`): use `pnpm nx run-many -t lint,test --projects=ui,form,ai` (or equivalent project names in workspace config).
- **Run only changed projects before merge**: use `pnpm nx affected -t lint,test,build`.
- **Explore before acting**: invoke `nx-workspace` to inspect projects/targets/dependencies first, then execute the minimal `nx run`/`run-many`/`affected` command set.
- **Scaffold safely**: invoke `nx-generate` before any generator command, then run the generated command via `pnpm nx ...`.
- **Flag uncertainty**: if you are unsure about arguments/options, check `pnpm nx <command> --help` (or nx_docs for advanced cases) before running commands.

These examples apply even when `nx-workspace`/`nx-generate` are deferred from local `.claude/skills`; Nx-first execution is still mandatory in this repo.

## Scaffolding & Generators

- For scaffolding tasks (creating apps, libs, project structure, setup), ALWAYS invoke the `nx-generate` skill FIRST before exploring or calling MCP tools
- After planning with `nx-generate`, execute scaffolding through package-manager-prefixed Nx commands (for example `pnpm nx g ...`) and validate resulting targets with Nx commands.

## When to use nx_docs

- USE for: advanced config options, unfamiliar flags, migration guides, plugin configuration, edge cases
- DON'T USE for: basic generator syntax (`nx g @nx/react:app`), standard commands, things you already know
- The `nx-generate` skill handles generator discovery internally - don't call nx_docs just to look up generator syntax
- Also use `nx_docs` (or `--help`) before trying less-common `run-many`/`affected` selector combinations to avoid guessed flags.

<!-- nx configuration end-->
## Validation checklist for skill adoption and documentation

Use this checklist after skill sync/docs updates to confirm structure and guidance are complete.

### Structural verification (required)

- [ ] `.claude/skills/react-best-practices/` exists with expected skill artifacts (instructions/rules/prompts as provided by upstream).
- [ ] `.claude/skills/composition-patterns/` exists with expected skill artifacts.
- [ ] `.claude/skills/web-design-guidelines/` exists with expected skill artifacts.
- [ ] `.claude/skills/claude-api/` exists with expected skill artifacts.
- [ ] `.claude/skills/superpowers/test-driven-development/` exists with expected skill artifacts.
- [ ] `.claude/skills/superpowers/systematic-debugging/` exists with expected skill artifacts.
- [ ] Optional installed skill `.claude/skills/react-view-transitions/` exists (if still in install-now state).
- [ ] Deferred optional skills (`nx-workspace`, `nx-generate`) are documented as deferred (not silently omitted).
- [ ] `AGENTS.md` includes Tier 1 vs Tier 2 mapping and concrete trigger scenarios for `apps/web`, `apps/worker`, `libs/ai`, `libs/form`, and `libs/ui`.
- [ ] `AGENTS.md` includes reproducible upstream source pinning details and sync/update procedure reference.

<!-- nx configuration end-->
