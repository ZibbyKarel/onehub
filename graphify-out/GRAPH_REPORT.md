# Graph Report - .  (2026-04-19)

## Corpus Check
- Corpus is ~35,011 words - fits in a single context window. You may not need a graph.

## Summary
- 245 nodes · 227 edges · 75 communities detected
- Extraction: 71% EXTRACTED · 29% INFERRED · 0% AMBIGUOUS · INFERRED: 65 edges (avg confidence: 0.77)
- Token cost: 0 input · 0 output

## Community Hubs (Navigation)
- [[_COMMUNITY_Classification Pipeline|Classification Pipeline]]
- [[_COMMUNITY_Accounts Management UI|Accounts Management UI]]
- [[_COMMUNITY_Instagram Scraper Core|Instagram Scraper Core]]
- [[_COMMUNITY_Worker Configuration|Worker Configuration]]
- [[_COMMUNITY_AI Classifier|AI Classifier]]
- [[_COMMUNITY_Agent Governance|Agent Governance]]
- [[_COMMUNITY_Component Refactoring|Component Refactoring]]
- [[_COMMUNITY_Error Handling|Error Handling]]
- [[_COMMUNITY_Instagram Parsing|Instagram Parsing]]
- [[_COMMUNITY_Contest Pages|Contest Pages]]
- [[_COMMUNITY_Form Components|Form Components]]
- [[_COMMUNITY_Community 11|Community 11]]
- [[_COMMUNITY_Community 12|Community 12]]
- [[_COMMUNITY_Community 13|Community 13]]
- [[_COMMUNITY_Community 14|Community 14]]
- [[_COMMUNITY_Community 15|Community 15]]
- [[_COMMUNITY_Community 16|Community 16]]
- [[_COMMUNITY_Community 17|Community 17]]
- [[_COMMUNITY_Community 18|Community 18]]
- [[_COMMUNITY_Community 19|Community 19]]
- [[_COMMUNITY_Community 20|Community 20]]
- [[_COMMUNITY_Community 21|Community 21]]
- [[_COMMUNITY_Community 22|Community 22]]
- [[_COMMUNITY_Community 23|Community 23]]
- [[_COMMUNITY_Community 24|Community 24]]
- [[_COMMUNITY_Community 25|Community 25]]
- [[_COMMUNITY_Community 26|Community 26]]
- [[_COMMUNITY_Community 27|Community 27]]
- [[_COMMUNITY_Community 28|Community 28]]
- [[_COMMUNITY_Community 29|Community 29]]
- [[_COMMUNITY_Community 30|Community 30]]
- [[_COMMUNITY_Community 31|Community 31]]
- [[_COMMUNITY_Community 32|Community 32]]
- [[_COMMUNITY_Community 33|Community 33]]
- [[_COMMUNITY_Community 34|Community 34]]
- [[_COMMUNITY_Community 35|Community 35]]
- [[_COMMUNITY_Community 36|Community 36]]
- [[_COMMUNITY_Community 37|Community 37]]
- [[_COMMUNITY_Community 38|Community 38]]
- [[_COMMUNITY_Community 39|Community 39]]
- [[_COMMUNITY_Community 40|Community 40]]
- [[_COMMUNITY_Community 41|Community 41]]
- [[_COMMUNITY_Community 42|Community 42]]
- [[_COMMUNITY_Community 43|Community 43]]
- [[_COMMUNITY_Community 44|Community 44]]
- [[_COMMUNITY_Community 45|Community 45]]
- [[_COMMUNITY_Community 46|Community 46]]
- [[_COMMUNITY_Community 47|Community 47]]
- [[_COMMUNITY_Community 48|Community 48]]
- [[_COMMUNITY_Community 49|Community 49]]
- [[_COMMUNITY_Community 50|Community 50]]
- [[_COMMUNITY_Community 51|Community 51]]
- [[_COMMUNITY_Community 52|Community 52]]
- [[_COMMUNITY_Community 53|Community 53]]
- [[_COMMUNITY_Community 54|Community 54]]
- [[_COMMUNITY_Community 55|Community 55]]
- [[_COMMUNITY_Community 56|Community 56]]
- [[_COMMUNITY_Community 57|Community 57]]
- [[_COMMUNITY_Community 58|Community 58]]
- [[_COMMUNITY_Community 59|Community 59]]
- [[_COMMUNITY_Community 60|Community 60]]
- [[_COMMUNITY_Community 61|Community 61]]
- [[_COMMUNITY_Community 62|Community 62]]
- [[_COMMUNITY_Community 63|Community 63]]
- [[_COMMUNITY_Community 64|Community 64]]
- [[_COMMUNITY_Community 65|Community 65]]
- [[_COMMUNITY_Community 66|Community 66]]
- [[_COMMUNITY_Community 67|Community 67]]
- [[_COMMUNITY_Community 68|Community 68]]
- [[_COMMUNITY_Community 69|Community 69]]
- [[_COMMUNITY_Community 70|Community 70]]
- [[_COMMUNITY_Community 71|Community 71]]
- [[_COMMUNITY_Community 72|Community 72]]
- [[_COMMUNITY_Community 73|Community 73]]
- [[_COMMUNITY_Community 74|Community 74]]

## God Nodes (most connected - your core abstractions)
1. `InstagramScraper` - 12 edges
2. `InstagramScraper` - 11 edges
3. `runPipeline()` - 9 edges
4. `classifyBatch()` - 7 edges
5. `jitter()` - 6 edges
6. `AccountsManager()` - 6 edges
7. `handleRouteError()` - 6 edges
8. `TanStack Query & Mutation Refactoring` - 6 edges
9. `loadWorkerEnv()` - 5 edges
10. `Instagram Giveaway Aggregator Project Summary` - 5 edges

## Surprising Connections (you probably didn't know these)
- `loadWorkerEnv()` --calls--> `loadScraperConfigFromEnv()`  [INFERRED]
  apps/worker/src/config.ts → libs/scraper/src/config.ts
- `IG Giveaway Aggregator Project` --semantically_similar_to--> `Instagram Giveaway Aggregator Project Summary`  [INFERRED] [semantically similar]
  README.md → AGENTS.md
- `Technology Stack` --semantically_similar_to--> `Technology Stack Definition`  [INFERRED] [semantically similar]
  README.md → AGENTS.md
- `Monorepo Layout` --semantically_similar_to--> `Repository Layout`  [INFERRED] [semantically similar]
  README.md → AGENTS.md
- `loadWorkerEnv()` --calls--> `loadClassifierConfigFromEnv()`  [INFERRED]
  apps/worker/src/config.ts → libs/ai/src/config.ts

## Hyperedges (group relationships)
- **Extracted TanStack Query Hooks Set** — refactoring_summary_fetchaccountsquery, refactoring_summary_createaccountmutation, refactoring_summary_updateaccountmutation, refactoring_summary_deleteaccountmutation, refactoring_summary_updatestatusmutation [EXTRACTED 1.00]
- **AI Agent Skill Governance Framework** — agents_tier1_skills, agents_tier2_skills, agents_coding_conventions, agents_critical_invariants [EXTRACTED 1.00]
- **Project Documentation & Configuration** — readme_ig_giveaway_aggregator, readme_tech_stack, agents_project_summary, agents_stack [INFERRED 0.82]
- **InstagramScraper Lifecycle** — instagram_instagramscraper, instagram_constructor, instagram_open, instagram_ensureloggedin, instagram_close [INFERRED 0.85]
- **Classifier Processing Pipeline** — classifier_classifybatch, classify_classify, classifier_extracttext, classifier_parseJsonFromText, classifier_renderbatchusermessage [INFERRED 0.80]
- **Form Components** — forminput_forminput, formtextarea_formtextarea, uselocalizedtext_uselocalizedtext [INFERRED 0.70]
- **Instagram Scraper Login Flow** — instagram_scraper, performlogin, ensurelogged_in, isloggedin [INFERRED 0.80]
- **Data Pipeline Flow** — run_pipeline, scrapeand_store, classifyand_store, finishrun [INFERRED 0.85]

## Communities

### Community 0 - "Classification Pipeline"
Cohesion: 0.1
Nodes (5): classifyAndStore(), InstagramScraper, jitter(), runPipeline(), scrapeAndStore()

### Community 1 - "Accounts Management UI"
Cohesion: 0.11
Nodes (7): AccountsManager(), useCreateAccountMutation(), useDeleteAccountMutation(), useFetchAccountsQuery(), formatRelative(), formatDateTime(), useUpdateAccountMutation()

### Community 2 - "Instagram Scraper Core"
Cohesion: 0.22
Nodes (5): loadScraperConfigFromEnv(), InstagramScraper, jitter(), randomJitter(), sleep()

### Community 3 - "Worker Configuration"
Cohesion: 0.21
Nodes (7): loadWorkerEnv(), main(), classifyAndStore(), finishRun(), runPipeline(), scrapeAndStore(), main()

### Community 4 - "AI Classifier"
Cohesion: 0.21
Nodes (8): classify(), classifyBatch(), extractText(), parseJsonFromText() Function, parseJsonFromText(), renderBatchUserMessage(), classify() Function, loadClassifierConfigFromEnv()

### Community 5 - "Agent Governance"
Cohesion: 0.18
Nodes (13): Claude API Skill Requirement Rationale, Coding Conventions, Critical Invariants, NX Workflow Guidelines, Instagram Giveaway Aggregator Project Summary, Repository Layout, Technology Stack Definition, Tier 1 Required Skills Matrix (+5 more)

### Community 6 - "Component Refactoring"
Cohesion: 0.24
Nodes (11): AccountsManager Component Refactoring, ContestList Component Refactoring, createAccountMutation Hook, deleteAccountMutation Hook, fetchAccountsQuery Hook, Mutation Hook Extraction Pattern, Query Hook Extraction Pattern, Refactoring Benefits Rationale (+3 more)

### Community 7 - "Error Handling"
Cohesion: 0.27
Nodes (6): handleRouteError(), zodErrorResponse(), DELETE(), GET(), PATCH(), POST()

### Community 8 - "Instagram Parsing"
Cohesion: 0.39
Nodes (5): extractPostsFromNodes(), extractTimelineNodesFromHtml() Function, extractTimelineNodesFromHtml(), findTimelineEdges(), isTimelineNode()

### Community 9 - "Contest Pages"
Cohesion: 0.29
Nodes (3): fetchContestsByStatus(), CurrentContestsPage(), HistoryPage()

### Community 10 - "Form Components"
Cohesion: 0.43
Nodes (6): AccountsManager(), AccountsManager Component Refactoring, createAccountMutation Hook, deleteAccountMutation Hook, fetchAccountsQuery Hook, updateAccountMutation Hook

### Community 11 - "Community 11"
Cohesion: 0.33
Nodes (3): FormInput(), FormTextarea(), useLocalizedText()

### Community 12 - "Community 12"
Cohesion: 0.33
Nodes (1): handleRouteError()

### Community 13 - "Community 13"
Cohesion: 0.4
Nodes (2): ContestList(), useUpdateStatusMutation()

### Community 14 - "Community 14"
Cohesion: 0.4
Nodes (5): InstagramScraper.ensureLoggedIn() Method, InstagramScraper.fetchRecentPosts() Method, InstagramScraper.hasChallenge() Method, InstagramScraper.isLoggedIn() Method, InstagramScraper.performLogin() Method

### Community 15 - "Community 15"
Cohesion: 0.5
Nodes (4): Critical Invariants, Instagram Giveaway Aggregator Project Summary, Repository Layout, Technology Stack Definition

### Community 16 - "Community 16"
Cohesion: 0.5
Nodes (0): 

### Community 17 - "Community 17"
Cohesion: 0.67
Nodes (0): 

### Community 18 - "Community 18"
Cohesion: 1.0
Nodes (0): 

### Community 19 - "Community 19"
Cohesion: 1.0
Nodes (0): 

### Community 20 - "Community 20"
Cohesion: 1.0
Nodes (0): 

### Community 21 - "Community 21"
Cohesion: 1.0
Nodes (0): 

### Community 22 - "Community 22"
Cohesion: 1.0
Nodes (0): 

### Community 23 - "Community 23"
Cohesion: 1.0
Nodes (0): 

### Community 24 - "Community 24"
Cohesion: 1.0
Nodes (0): 

### Community 25 - "Community 25"
Cohesion: 1.0
Nodes (0): 

### Community 26 - "Community 26"
Cohesion: 1.0
Nodes (0): 

### Community 27 - "Community 27"
Cohesion: 1.0
Nodes (0): 

### Community 28 - "Community 28"
Cohesion: 1.0
Nodes (0): 

### Community 29 - "Community 29"
Cohesion: 1.0
Nodes (0): 

### Community 30 - "Community 30"
Cohesion: 1.0
Nodes (0): 

### Community 31 - "Community 31"
Cohesion: 1.0
Nodes (0): 

### Community 32 - "Community 32"
Cohesion: 1.0
Nodes (0): 

### Community 33 - "Community 33"
Cohesion: 1.0
Nodes (0): 

### Community 34 - "Community 34"
Cohesion: 1.0
Nodes (0): 

### Community 35 - "Community 35"
Cohesion: 1.0
Nodes (0): 

### Community 36 - "Community 36"
Cohesion: 1.0
Nodes (0): 

### Community 37 - "Community 37"
Cohesion: 1.0
Nodes (0): 

### Community 38 - "Community 38"
Cohesion: 1.0
Nodes (0): 

### Community 39 - "Community 39"
Cohesion: 1.0
Nodes (0): 

### Community 40 - "Community 40"
Cohesion: 1.0
Nodes (0): 

### Community 41 - "Community 41"
Cohesion: 1.0
Nodes (0): 

### Community 42 - "Community 42"
Cohesion: 1.0
Nodes (0): 

### Community 43 - "Community 43"
Cohesion: 1.0
Nodes (0): 

### Community 44 - "Community 44"
Cohesion: 1.0
Nodes (0): 

### Community 45 - "Community 45"
Cohesion: 1.0
Nodes (0): 

### Community 46 - "Community 46"
Cohesion: 1.0
Nodes (0): 

### Community 47 - "Community 47"
Cohesion: 1.0
Nodes (0): 

### Community 48 - "Community 48"
Cohesion: 1.0
Nodes (0): 

### Community 49 - "Community 49"
Cohesion: 1.0
Nodes (0): 

### Community 50 - "Community 50"
Cohesion: 1.0
Nodes (0): 

### Community 51 - "Community 51"
Cohesion: 1.0
Nodes (0): 

### Community 52 - "Community 52"
Cohesion: 1.0
Nodes (0): 

### Community 53 - "Community 53"
Cohesion: 1.0
Nodes (0): 

### Community 54 - "Community 54"
Cohesion: 1.0
Nodes (0): 

### Community 55 - "Community 55"
Cohesion: 1.0
Nodes (0): 

### Community 56 - "Community 56"
Cohesion: 1.0
Nodes (0): 

### Community 57 - "Community 57"
Cohesion: 1.0
Nodes (0): 

### Community 58 - "Community 58"
Cohesion: 1.0
Nodes (0): 

### Community 59 - "Community 59"
Cohesion: 1.0
Nodes (0): 

### Community 60 - "Community 60"
Cohesion: 1.0
Nodes (0): 

### Community 61 - "Community 61"
Cohesion: 1.0
Nodes (0): 

### Community 62 - "Community 62"
Cohesion: 1.0
Nodes (0): 

### Community 63 - "Community 63"
Cohesion: 1.0
Nodes (0): 

### Community 64 - "Community 64"
Cohesion: 1.0
Nodes (1): Internationalization (i18n) Quick Guide

### Community 65 - "Community 65"
Cohesion: 1.0
Nodes (1): Known Limitations (v0)

### Community 66 - "Community 66"
Cohesion: 1.0
Nodes (1): InstagramScraper.close() Method

### Community 67 - "Community 67"
Cohesion: 1.0
Nodes (1): InstagramScraper.waitBetweenHandles() Method

### Community 68 - "Community 68"
Cohesion: 1.0
Nodes (1): InstagramScraper.newPage() Method

### Community 69 - "Community 69"
Cohesion: 1.0
Nodes (1): InstagramScraper.open() Method

### Community 70 - "Community 70"
Cohesion: 1.0
Nodes (1): InstagramScraper.constructor() Method

### Community 71 - "Community 71"
Cohesion: 1.0
Nodes (1): Claude API Skill Requirement Rationale

### Community 72 - "Community 72"
Cohesion: 1.0
Nodes (0): 

### Community 73 - "Community 73"
Cohesion: 1.0
Nodes (0): 

### Community 74 - "Community 74"
Cohesion: 1.0
Nodes (0): 

## Knowledge Gaps
- **23 isolated node(s):** `ContestList Component Refactoring`, `Query Hook Extraction Pattern`, `Mutation Hook Extraction Pattern`, `Refactoring Benefits Rationale`, `Internationalization (i18n) Quick Guide` (+18 more)
  These have ≤1 connection - possible missing edges or undocumented components.
- **Thin community `Community 18`** (2 nodes): `ThemeProvider.tsx`, `ThemeProvider()`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 19`** (2 nodes): `FormSubmit()`, `FormSubmit.tsx`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 20`** (2 nodes): `InternationalizationProvider()`, `InternationalizationProvider.tsx`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 21`** (2 nodes): `formatMessage()`, `format.ts`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 22`** (2 nodes): `useLocalizedText.spec.tsx`, `ProviderWrapper()`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 23`** (2 nodes): `seed.ts`, `main()`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 24`** (2 nodes): `StyledComponentsRegistry.tsx`, `StyledComponentsRegistry()`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 25`** (2 nodes): `layout.tsx`, `RootLayout()`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 26`** (2 nodes): `Providers.tsx`, `Providers()`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 27`** (2 nodes): `page.tsx`, `AccountsPage()`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 28`** (2 nodes): `ContestCard.tsx`, `copyComment()`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 29`** (2 nodes): `AppShell.tsx`, `AppShell()`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 30`** (1 nodes): `vitest.config.ts`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 31`** (1 nodes): `index.ts`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 32`** (1 nodes): `Card.tsx`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 33`** (1 nodes): `styled.d.ts`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 34`** (1 nodes): `Stack.tsx`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 35`** (1 nodes): `Badge.tsx`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 36`** (1 nodes): `GlobalStyles.tsx`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 37`** (1 nodes): `index.ts`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 38`** (1 nodes): `Button.tsx`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 39`** (1 nodes): `Checkbox.tsx`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 40`** (1 nodes): `Select.tsx`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 41`** (1 nodes): `Textarea.tsx`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 42`** (1 nodes): `Input.tsx`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 43`** (1 nodes): `FormCheckbox.tsx`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 44`** (1 nodes): `FormSelect.tsx`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 45`** (1 nodes): `types.ts`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 46`** (1 nodes): `index.ts`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 47`** (1 nodes): `index.ts`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 48`** (1 nodes): `translationKeys.ts`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 49`** (1 nodes): `translator.spec.ts`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 50`** (1 nodes): `format.spec.ts`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 51`** (1 nodes): `dictionaries.ts`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 52`** (1 nodes): `types.ts`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 53`** (1 nodes): `context.tsx`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 54`** (1 nodes): `vitest.config.ts`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 55`** (1 nodes): `index.ts`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 56`** (1 nodes): `forms.ts`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 57`** (1 nodes): `contest.ts`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 58`** (1 nodes): `index.ts`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 59`** (1 nodes): `classifier.ts`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 60`** (1 nodes): `scraper.ts`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 61`** (1 nodes): `index.ts`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 62`** (1 nodes): `next.config.mjs`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 63`** (1 nodes): `next-env.d.ts`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 64`** (1 nodes): `Internationalization (i18n) Quick Guide`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 65`** (1 nodes): `Known Limitations (v0)`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 66`** (1 nodes): `InstagramScraper.close() Method`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 67`** (1 nodes): `InstagramScraper.waitBetweenHandles() Method`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 68`** (1 nodes): `InstagramScraper.newPage() Method`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 69`** (1 nodes): `InstagramScraper.open() Method`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 70`** (1 nodes): `InstagramScraper.constructor() Method`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 71`** (1 nodes): `Claude API Skill Requirement Rationale`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 72`** (1 nodes): `ThemeProvider()`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 73`** (1 nodes): `formatMessage()`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 74`** (1 nodes): `AppShell()`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `runPipeline()` connect `Worker Configuration` to `Instagram Scraper Core`?**
  _High betweenness centrality (0.016) - this node is a cross-community bridge._
- **Why does `classifyAndStore()` connect `Worker Configuration` to `AI Classifier`?**
  _High betweenness centrality (0.013) - this node is a cross-community bridge._
- **Why does `classify()` connect `AI Classifier` to `Worker Configuration`?**
  _High betweenness centrality (0.012) - this node is a cross-community bridge._
- **Are the 2 inferred relationships involving `InstagramScraper` (e.g. with `loadScraperConfigFromEnv()` and `scrapeAndStore()`) actually correct?**
  _`InstagramScraper` has 2 INFERRED edges - model-reasoned connections that need verification._
- **Are the 5 inferred relationships involving `runPipeline()` (e.g. with `main()` and `.open()`) actually correct?**
  _`runPipeline()` has 5 INFERRED edges - model-reasoned connections that need verification._
- **Are the 3 inferred relationships involving `jitter()` (e.g. with `.ensureLoggedIn()` and `.fetchRecentPosts()`) actually correct?**
  _`jitter()` has 3 INFERRED edges - model-reasoned connections that need verification._
- **What connects `ContestList Component Refactoring`, `Query Hook Extraction Pattern`, `Mutation Hook Extraction Pattern` to the rest of the system?**
  _23 weakly-connected nodes found - possible documentation gaps or missing edges._