# Graph Report - .  (2026-04-19)

## Corpus Check
- Corpus is ~16,819 words - fits in a single context window. You may not need a graph.

## Summary
- 187 nodes · 169 edges · 64 communities detected
- Extraction: 76% EXTRACTED · 24% INFERRED · 0% AMBIGUOUS · INFERRED: 40 edges (avg confidence: 0.8)
- Token cost: 0 input · 0 output

## Community Hubs (Navigation)
- [[_COMMUNITY_Accounts Management|Accounts Management]]
- [[_COMMUNITY_Instagram Scraping|Instagram Scraping]]
- [[_COMMUNITY_Worker Pipeline|Worker Pipeline]]
- [[_COMMUNITY_AI Classifier|AI Classifier]]
- [[_COMMUNITY_Project Configuration|Project Configuration]]
- [[_COMMUNITY_API Routes|API Routes]]
- [[_COMMUNITY_HTML Parsing|HTML Parsing]]
- [[_COMMUNITY_Contest Pages|Contest Pages]]
- [[_COMMUNITY_Contest Updates|Contest Updates]]
- [[_COMMUNITY_Query Hooks Refactor|Query Hooks Refactor]]
- [[_COMMUNITY_Hook Extraction Patterns|Hook Extraction Patterns]]
- [[_COMMUNITY_Translation System|Translation System]]
- [[_COMMUNITY_Code Standards|Code Standards]]
- [[_COMMUNITY_Theme Provider|Theme Provider]]
- [[_COMMUNITY_Form Submit|Form Submit]]
- [[_COMMUNITY_Form Textarea|Form Textarea]]
- [[_COMMUNITY_Form Input|Form Input]]
- [[_COMMUNITY_i18n Provider|i18n Provider]]
- [[_COMMUNITY_Message Formatting|Message Formatting]]
- [[_COMMUNITY_Localized Text Tests|Localized Text Tests]]
- [[_COMMUNITY_Localized Text Hook|Localized Text Hook]]
- [[_COMMUNITY_Database Seed|Database Seed]]
- [[_COMMUNITY_Styled Components|Styled Components]]
- [[_COMMUNITY_Root Layout|Root Layout]]
- [[_COMMUNITY_App Providers|App Providers]]
- [[_COMMUNITY_Accounts Page|Accounts Page]]
- [[_COMMUNITY_Contest Card|Contest Card]]
- [[_COMMUNITY_App Shell|App Shell]]
- [[_COMMUNITY_ContestList Refactor|ContestList Refactor]]
- [[_COMMUNITY_Scraper Tests|Scraper Tests]]
- [[_COMMUNITY_Scraper Index|Scraper Index]]
- [[_COMMUNITY_UI Card|UI Card]]
- [[_COMMUNITY_Styled Types|Styled Types]]
- [[_COMMUNITY_UI Stack|UI Stack]]
- [[_COMMUNITY_UI Badge|UI Badge]]
- [[_COMMUNITY_Global Styles|Global Styles]]
- [[_COMMUNITY_UI Exports|UI Exports]]
- [[_COMMUNITY_UI Button|UI Button]]
- [[_COMMUNITY_UI Checkbox|UI Checkbox]]
- [[_COMMUNITY_UI Select|UI Select]]
- [[_COMMUNITY_UI Textarea|UI Textarea]]
- [[_COMMUNITY_UI Input|UI Input]]
- [[_COMMUNITY_Form Checkbox|Form Checkbox]]
- [[_COMMUNITY_Form Select|Form Select]]
- [[_COMMUNITY_Form Types|Form Types]]
- [[_COMMUNITY_Form Exports|Form Exports]]
- [[_COMMUNITY_i18n Exports|i18n Exports]]
- [[_COMMUNITY_Translation Keys|Translation Keys]]
- [[_COMMUNITY_Translator Tests|Translator Tests]]
- [[_COMMUNITY_Format Tests|Format Tests]]
- [[_COMMUNITY_Translation Dicts|Translation Dicts]]
- [[_COMMUNITY_i18n Types|i18n Types]]
- [[_COMMUNITY_i18n Context|i18n Context]]
- [[_COMMUNITY_AI Tests|AI Tests]]
- [[_COMMUNITY_AI Exports|AI Exports]]
- [[_COMMUNITY_Form Types Shared|Form Types Shared]]
- [[_COMMUNITY_Contest Types Shared|Contest Types Shared]]
- [[_COMMUNITY_Shared Types Index|Shared Types Index]]
- [[_COMMUNITY_Classifier Types|Classifier Types]]
- [[_COMMUNITY_Scraper Types|Scraper Types]]
- [[_COMMUNITY_Database Index|Database Index]]
- [[_COMMUNITY_Next.js Config|Next.js Config]]
- [[_COMMUNITY_Next.js Types|Next.js Types]]
- [[_COMMUNITY_Optional Skills|Optional Skills]]

## God Nodes (most connected - your core abstractions)
1. `InstagramScraper` - 11 edges
2. `runPipeline()` - 9 edges
3. `jitter()` - 6 edges
4. `AccountsManager()` - 6 edges
5. `handleRouteError()` - 6 edges
6. `classifyBatch()` - 5 edges
7. `loadWorkerEnv()` - 5 edges
8. `AccountsManager Component Refactoring` - 4 edges
9. `extractTimelineNodesFromHtml()` - 3 edges
10. `findTimelineEdges()` - 3 edges

## Surprising Connections (you probably didn't know these)
- `loadWorkerEnv()` --calls--> `loadScraperConfigFromEnv()`  [INFERRED]
  apps/worker/src/config.ts → libs/scraper/src/config.ts
- `loadWorkerEnv()` --calls--> `loadClassifierConfigFromEnv()`  [INFERRED]
  apps/worker/src/config.ts → libs/ai/src/config.ts
- `IG Giveaway Aggregator Project` --semantically_similar_to--> `Instagram Giveaway Aggregator Project Summary`  [INFERRED] [semantically similar]
  README.md → AGENTS.md
- `Technology Stack` --semantically_similar_to--> `Technology Stack Definition`  [INFERRED] [semantically similar]
  README.md → AGENTS.md
- `Monorepo Layout` --semantically_similar_to--> `Repository Layout`  [INFERRED] [semantically similar]
  README.md → AGENTS.md

## Hyperedges (group relationships)
- **Extracted TanStack Query Hooks Set** — refactoring_summary_fetchaccountsquery, refactoring_summary_createaccountmutation, refactoring_summary_updateaccountmutation, refactoring_summary_deleteaccountmutation, refactoring_summary_updatestatusmutation [EXTRACTED 1.00]
- **AI Agent Skill Governance Framework** — agents_tier1_skills, agents_tier2_skills, agents_coding_conventions, agents_critical_invariants [EXTRACTED 1.00]
- **Project Documentation & Configuration** — readme_ig_giveaway_aggregator, readme_tech_stack, agents_project_summary, agents_stack [INFERRED 0.82]

## Communities

### Community 0 - "Accounts Management"
Cohesion: 0.11
Nodes (7): AccountsManager(), useCreateAccountMutation(), useDeleteAccountMutation(), useFetchAccountsQuery(), formatRelative(), formatDateTime(), useUpdateAccountMutation()

### Community 1 - "Instagram Scraping"
Cohesion: 0.22
Nodes (5): loadScraperConfigFromEnv(), InstagramScraper, jitter(), randomJitter(), sleep()

### Community 2 - "Worker Pipeline"
Cohesion: 0.21
Nodes (7): loadWorkerEnv(), main(), classifyAndStore(), finishRun(), runPipeline(), scrapeAndStore(), main()

### Community 3 - "AI Classifier"
Cohesion: 0.24
Nodes (6): classify(), classifyBatch(), extractText(), parseJsonFromText(), renderBatchUserMessage(), loadClassifierConfigFromEnv()

### Community 4 - "Project Configuration"
Cohesion: 0.18
Nodes (12): Claude API Skill Requirement Rationale, Critical Invariants, NX Workflow Guidelines, Instagram Giveaway Aggregator Project Summary, Repository Layout, Technology Stack Definition, Internationalization (i18n) Quick Guide, IG Giveaway Aggregator Project (+4 more)

### Community 5 - "API Routes"
Cohesion: 0.27
Nodes (6): handleRouteError(), zodErrorResponse(), DELETE(), GET(), PATCH(), POST()

### Community 6 - "HTML Parsing"
Cohesion: 0.38
Nodes (4): extractPostsFromNodes(), extractTimelineNodesFromHtml(), findTimelineEdges(), isTimelineNode()

### Community 7 - "Contest Pages"
Cohesion: 0.29
Nodes (3): fetchContestsByStatus(), CurrentContestsPage(), HistoryPage()

### Community 8 - "Contest Updates"
Cohesion: 0.4
Nodes (2): ContestList(), useUpdateStatusMutation()

### Community 9 - "Query Hooks Refactor"
Cohesion: 0.4
Nodes (5): AccountsManager Component Refactoring, createAccountMutation Hook, deleteAccountMutation Hook, fetchAccountsQuery Hook, updateAccountMutation Hook

### Community 10 - "Hook Extraction Patterns"
Cohesion: 0.5
Nodes (4): Refactoring Benefits Rationale, Mutation Hook Extraction Pattern, Query Hook Extraction Pattern, TanStack Query & Mutation Refactoring

### Community 11 - "Translation System"
Cohesion: 0.67
Nodes (0): 

### Community 12 - "Code Standards"
Cohesion: 0.67
Nodes (3): Coding Conventions, Tier 1 Required Skills Matrix, Skills (Guardrails for Claude Code)

### Community 13 - "Theme Provider"
Cohesion: 1.0
Nodes (0): 

### Community 14 - "Form Submit"
Cohesion: 1.0
Nodes (0): 

### Community 15 - "Form Textarea"
Cohesion: 1.0
Nodes (0): 

### Community 16 - "Form Input"
Cohesion: 1.0
Nodes (0): 

### Community 17 - "i18n Provider"
Cohesion: 1.0
Nodes (0): 

### Community 18 - "Message Formatting"
Cohesion: 1.0
Nodes (0): 

### Community 19 - "Localized Text Tests"
Cohesion: 1.0
Nodes (0): 

### Community 20 - "Localized Text Hook"
Cohesion: 1.0
Nodes (0): 

### Community 21 - "Database Seed"
Cohesion: 1.0
Nodes (0): 

### Community 22 - "Styled Components"
Cohesion: 1.0
Nodes (0): 

### Community 23 - "Root Layout"
Cohesion: 1.0
Nodes (0): 

### Community 24 - "App Providers"
Cohesion: 1.0
Nodes (0): 

### Community 25 - "Accounts Page"
Cohesion: 1.0
Nodes (0): 

### Community 26 - "Contest Card"
Cohesion: 1.0
Nodes (0): 

### Community 27 - "App Shell"
Cohesion: 1.0
Nodes (0): 

### Community 28 - "ContestList Refactor"
Cohesion: 1.0
Nodes (2): ContestList Component Refactoring, updateStatusMutation Hook

### Community 29 - "Scraper Tests"
Cohesion: 1.0
Nodes (0): 

### Community 30 - "Scraper Index"
Cohesion: 1.0
Nodes (0): 

### Community 31 - "UI Card"
Cohesion: 1.0
Nodes (0): 

### Community 32 - "Styled Types"
Cohesion: 1.0
Nodes (0): 

### Community 33 - "UI Stack"
Cohesion: 1.0
Nodes (0): 

### Community 34 - "UI Badge"
Cohesion: 1.0
Nodes (0): 

### Community 35 - "Global Styles"
Cohesion: 1.0
Nodes (0): 

### Community 36 - "UI Exports"
Cohesion: 1.0
Nodes (0): 

### Community 37 - "UI Button"
Cohesion: 1.0
Nodes (0): 

### Community 38 - "UI Checkbox"
Cohesion: 1.0
Nodes (0): 

### Community 39 - "UI Select"
Cohesion: 1.0
Nodes (0): 

### Community 40 - "UI Textarea"
Cohesion: 1.0
Nodes (0): 

### Community 41 - "UI Input"
Cohesion: 1.0
Nodes (0): 

### Community 42 - "Form Checkbox"
Cohesion: 1.0
Nodes (0): 

### Community 43 - "Form Select"
Cohesion: 1.0
Nodes (0): 

### Community 44 - "Form Types"
Cohesion: 1.0
Nodes (0): 

### Community 45 - "Form Exports"
Cohesion: 1.0
Nodes (0): 

### Community 46 - "i18n Exports"
Cohesion: 1.0
Nodes (0): 

### Community 47 - "Translation Keys"
Cohesion: 1.0
Nodes (0): 

### Community 48 - "Translator Tests"
Cohesion: 1.0
Nodes (0): 

### Community 49 - "Format Tests"
Cohesion: 1.0
Nodes (0): 

### Community 50 - "Translation Dicts"
Cohesion: 1.0
Nodes (0): 

### Community 51 - "i18n Types"
Cohesion: 1.0
Nodes (0): 

### Community 52 - "i18n Context"
Cohesion: 1.0
Nodes (0): 

### Community 53 - "AI Tests"
Cohesion: 1.0
Nodes (0): 

### Community 54 - "AI Exports"
Cohesion: 1.0
Nodes (0): 

### Community 55 - "Form Types Shared"
Cohesion: 1.0
Nodes (0): 

### Community 56 - "Contest Types Shared"
Cohesion: 1.0
Nodes (0): 

### Community 57 - "Shared Types Index"
Cohesion: 1.0
Nodes (0): 

### Community 58 - "Classifier Types"
Cohesion: 1.0
Nodes (0): 

### Community 59 - "Scraper Types"
Cohesion: 1.0
Nodes (0): 

### Community 60 - "Database Index"
Cohesion: 1.0
Nodes (0): 

### Community 61 - "Next.js Config"
Cohesion: 1.0
Nodes (0): 

### Community 62 - "Next.js Types"
Cohesion: 1.0
Nodes (0): 

### Community 63 - "Optional Skills"
Cohesion: 1.0
Nodes (1): Tier 2 Optional Skills Matrix

## Knowledge Gaps
- **16 isolated node(s):** `Query Hook Extraction Pattern`, `Mutation Hook Extraction Pattern`, `fetchAccountsQuery Hook`, `createAccountMutation Hook`, `updateAccountMutation Hook` (+11 more)
  These have ≤1 connection - possible missing edges or undocumented components.
- **Thin community `Theme Provider`** (2 nodes): `ThemeProvider.tsx`, `ThemeProvider()`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Form Submit`** (2 nodes): `FormSubmit()`, `FormSubmit.tsx`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Form Textarea`** (2 nodes): `FormTextarea()`, `FormTextarea.tsx`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Form Input`** (2 nodes): `FormInput()`, `FormInput.tsx`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `i18n Provider`** (2 nodes): `InternationalizationProvider()`, `InternationalizationProvider.tsx`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Message Formatting`** (2 nodes): `formatMessage()`, `format.ts`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Localized Text Tests`** (2 nodes): `useLocalizedText.spec.tsx`, `ProviderWrapper()`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Localized Text Hook`** (2 nodes): `useLocalizedText.ts`, `useLocalizedText()`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Database Seed`** (2 nodes): `seed.ts`, `main()`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Styled Components`** (2 nodes): `StyledComponentsRegistry.tsx`, `StyledComponentsRegistry()`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Root Layout`** (2 nodes): `layout.tsx`, `RootLayout()`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `App Providers`** (2 nodes): `Providers.tsx`, `Providers()`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Accounts Page`** (2 nodes): `page.tsx`, `AccountsPage()`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Contest Card`** (2 nodes): `ContestCard.tsx`, `copyComment()`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `App Shell`** (2 nodes): `AppShell.tsx`, `AppShell()`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `ContestList Refactor`** (2 nodes): `ContestList Component Refactoring`, `updateStatusMutation Hook`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Scraper Tests`** (1 nodes): `vitest.config.ts`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Scraper Index`** (1 nodes): `index.ts`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `UI Card`** (1 nodes): `Card.tsx`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Styled Types`** (1 nodes): `styled.d.ts`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `UI Stack`** (1 nodes): `Stack.tsx`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `UI Badge`** (1 nodes): `Badge.tsx`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Global Styles`** (1 nodes): `GlobalStyles.tsx`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `UI Exports`** (1 nodes): `index.ts`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `UI Button`** (1 nodes): `Button.tsx`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `UI Checkbox`** (1 nodes): `Checkbox.tsx`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `UI Select`** (1 nodes): `Select.tsx`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `UI Textarea`** (1 nodes): `Textarea.tsx`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `UI Input`** (1 nodes): `Input.tsx`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Form Checkbox`** (1 nodes): `FormCheckbox.tsx`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Form Select`** (1 nodes): `FormSelect.tsx`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Form Types`** (1 nodes): `types.ts`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Form Exports`** (1 nodes): `index.ts`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `i18n Exports`** (1 nodes): `index.ts`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Translation Keys`** (1 nodes): `translationKeys.ts`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Translator Tests`** (1 nodes): `translator.spec.ts`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Format Tests`** (1 nodes): `format.spec.ts`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Translation Dicts`** (1 nodes): `dictionaries.ts`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `i18n Types`** (1 nodes): `types.ts`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `i18n Context`** (1 nodes): `context.tsx`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `AI Tests`** (1 nodes): `vitest.config.ts`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `AI Exports`** (1 nodes): `index.ts`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Form Types Shared`** (1 nodes): `forms.ts`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Contest Types Shared`** (1 nodes): `contest.ts`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Shared Types Index`** (1 nodes): `index.ts`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Classifier Types`** (1 nodes): `classifier.ts`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Scraper Types`** (1 nodes): `scraper.ts`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Database Index`** (1 nodes): `index.ts`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Next.js Config`** (1 nodes): `next.config.mjs`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Next.js Types`** (1 nodes): `next-env.d.ts`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Optional Skills`** (1 nodes): `Tier 2 Optional Skills Matrix`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `runPipeline()` connect `Worker Pipeline` to `Instagram Scraping`?**
  _High betweenness centrality (0.025) - this node is a cross-community bridge._
- **Why does `classifyAndStore()` connect `Worker Pipeline` to `AI Classifier`?**
  _High betweenness centrality (0.019) - this node is a cross-community bridge._
- **Why does `classify()` connect `AI Classifier` to `Worker Pipeline`?**
  _High betweenness centrality (0.018) - this node is a cross-community bridge._
- **Are the 5 inferred relationships involving `runPipeline()` (e.g. with `main()` and `.open()`) actually correct?**
  _`runPipeline()` has 5 INFERRED edges - model-reasoned connections that need verification._
- **Are the 3 inferred relationships involving `jitter()` (e.g. with `.ensureLoggedIn()` and `.fetchRecentPosts()`) actually correct?**
  _`jitter()` has 3 INFERRED edges - model-reasoned connections that need verification._
- **Are the 5 inferred relationships involving `AccountsManager()` (e.g. with `useFetchAccountsQuery()` and `useCreateAccountMutation()`) actually correct?**
  _`AccountsManager()` has 5 INFERRED edges - model-reasoned connections that need verification._
- **Are the 4 inferred relationships involving `handleRouteError()` (e.g. with `GET()` and `POST()`) actually correct?**
  _`handleRouteError()` has 4 INFERRED edges - model-reasoned connections that need verification._