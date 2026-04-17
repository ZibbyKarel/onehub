# IG Giveaway Aggregator

Self-hosted aplikace, která 1× denně scrapuje vybrané Instagram účty, přes Claude API vyhodnotí nové posty jako soutěž / ne-soutěž, a u soutěžních postů připraví zadání + hotový komentář k copy-paste. Dashboard v Next.js 15 ti ukáže aktuální soutěže a ty je ručně splníš.

> ⚠️ Scraping IG je proti jejich TOS. Tohle je dev tool pro **tvůj vlastní** účet — používej throwaway IG profil a nepouštěj si to na cizí infrastruktuře.

## Stack

- **Monorepo**: pnpm workspaces + NX 20
- **Web**: Next.js 15 (App Router) + React 19 + Styled-Components + Tanstack Query
- **Worker**: Node.js 20 + node-cron + Playwright (persistent context)
- **AI**: Anthropic SDK, default model `claude-opus-4-7`, prompt caching na system promptu
- **DB**: PostgreSQL 16 + Prisma 5
- **Form layer**: react-hook-form + Zod resolver + vlastní `@app/form` wrappery (prefix `Form*`)

## Layout

```
apps/
  web/      Next.js 15 dashboard
  worker/   cron + scraping pipeline
libs/
  db/           Prisma schema + client singleton
  ai/           Classifier přes Anthropic SDK
  scraper/      Playwright helpers + IG flow
  ui-tokens/    design tokeny (colors/typography/…)
  ui/           Styled-Components DS (Button, Input, Card, …)
  form/         FormInput / FormSelect / FormCheckbox / FormSubmit
  shared-types/ Zod schémata sdílená napříč balíčky
```

## Rychlý start (lokálně)

```bash
# 1. Setup
cp .env.example .env   # doplň ANTHROPIC_API_KEY, IG_USERNAME, IG_PASSWORD
pnpm install
docker compose up -d postgres
pnpm --filter @app/db exec prisma migrate dev

# 2. Přidej 1–2 testovací handles
cp accounts.seed.json.example accounts.seed.json   # uprav handles
pnpm --filter @app/worker seed:accounts

# 3. První běh workeru (bez cronu)
pnpm --filter @app/worker dev:run-once

# 4. Dashboard
pnpm --filter @app/web dev
# → http://localhost:3000
```

> Při úplně prvním loginu může IG vyhodit captchu/checkpoint. Spusť worker jednou s `IG_HEADLESS=false`, dokončí ručně, session se uloží do volume a příště už to projde headless.

## Plná docker orchestrace

```bash
cp .env.example .env
docker compose up --build
```

Služby: `postgres` (5432), `web` (3000), `worker` (na pozadí podle `WORKER_CRON`).

## Skripty

| Příkaz                                         | Co dělá                                 |
| ---------------------------------------------- | ----------------------------------------- |
| `pnpm install`                                 | Install + `prisma generate` přes postinstall |
| `pnpm prisma:migrate`                          | Vytvoří / aplikuje Prisma migrace         |
| `pnpm --filter @app/worker dev:run-once`       | Jeden běh pipeline proti DB               |
| `pnpm --filter @app/worker seed:accounts`      | Naseeduje handles z `accounts.seed.json`  |
| `pnpm --filter @app/web dev`                   | Dev server Next.js                        |
| `pnpm --filter @app/db studio`                 | Prisma Studio                             |
| `pnpm nx run-many -t typecheck`                | `tsc --noEmit` přes celé monorepo         |
| `pnpm nx run-many -t test`                     | Vitest napříč balíčky                     |

## Konfigurace prompt cachingu

`libs/ai` posílá system prompt se `cache_control: { type: "ephemeral" }`. Ověř v testech, že `response.usage.cache_read_input_tokens > 0` na druhém volání v řadě — pokud je nula, někdo nejspíš vrazil do promptu `new Date().toISOString()` nebo jiný invalidátor.

## Testy

- `libs/ai` — mock Anthropic response, Zod parsing, ephemeral cache header, chunking, confidence filter
- `libs/scraper` — timeline parser proti HTML fixtures a legacy `window._sharedData`

Další úrovně (komponentní testy, e2e) nejsou ve v0 scope.

## Skills (guardrails pro Claude Code)

Viz `AGENTS.md`. V `.claude/skills/` leží:
- `react-best-practices` (Next 15 fetch/bundle optimalizace)
- `composition-patterns` (compound komponenty pro `@app/form`)
- `web-design-guidelines` (a11y + UX na dashboardu)
- `react-view-transitions` (smooth přechody mezi stránkami)

Bundled `claude-api` skill se aktivuje automaticky při práci na `libs/ai`.

## Known limitations (v0)

- Žádná autentizace — pouze localhost
- Žádné notifikace (Telegram / email) při nové soutěži
- Scraper nemá proxy support — jestli IG banne tvoji IP, je potřeba buď residential proxy, nebo snížit frekvenci
- Web používá `force-dynamic` fetch pro všechny seznamy (žádné ISR) — pro 1 usera je to dost
