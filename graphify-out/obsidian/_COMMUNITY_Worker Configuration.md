---
type: community
cohesion: 0.21
members: 16
---

# Worker Configuration

**Cohesion:** 0.21 - loosely connected
**Members:** 16 nodes

## Members
- [[.open()]] - code - libs/scraper/src/instagram.ts
- [[classifyAndStore()]] - code - apps/worker/src/pipeline.ts
- [[config.ts_2]] - code - apps/worker/src/config.ts
- [[emit()]] - code - apps/worker/src/logger.ts
- [[finishRun()]] - code - apps/worker/src/pipeline.ts
- [[loadWorkerEnv()]] - code - apps/worker/src/config.ts
- [[logger.ts]] - code - apps/worker/src/logger.ts
- [[main()_3]] - code - apps/worker/src/main.ts
- [[main()_1]] - code - apps/worker/src/runOnce.ts
- [[main()_2]] - code - apps/worker/src/seedAccounts.ts
- [[main.ts]] - code - apps/worker/src/main.ts
- [[pipeline.ts]] - code - apps/worker/src/pipeline.ts
- [[runOnce.ts]] - code - apps/worker/src/runOnce.ts
- [[runPipeline()]] - code - apps/worker/src/pipeline.ts
- [[scrapeAndStore()]] - code - apps/worker/src/pipeline.ts
- [[seedAccounts.ts]] - code - apps/worker/src/seedAccounts.ts

## Live Query (requires Dataview plugin)

```dataview
TABLE source_file, type FROM #community/Worker_Configuration
SORT file.name ASC
```

## Connections to other communities
- 6 edges to [[_COMMUNITY_Instagram Scraper Core]]
- 2 edges to [[_COMMUNITY_AI Classifier]]

## Top bridge nodes
- [[loadWorkerEnv()]] - degree 5, connects to 2 communities
- [[runPipeline()]] - degree 9, connects to 1 community
- [[classifyAndStore()]] - degree 3, connects to 1 community
- [[scrapeAndStore()]] - degree 3, connects to 1 community
- [[.open()]] - degree 2, connects to 1 community