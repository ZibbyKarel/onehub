---
type: community
cohesion: 0.22
members: 17
---

# Instagram Scraper Core

**Cohesion:** 0.22 - loosely connected
**Members:** 17 nodes

## Members
- [[.close()]] - code - libs/scraper/src/instagram.ts
- [[.constructor()]] - code - libs/scraper/src/instagram.ts
- [[.ensureLoggedIn()]] - code - libs/scraper/src/instagram.ts
- [[.fetchRecentPosts()]] - code - libs/scraper/src/instagram.ts
- [[.hasChallenge()]] - code - libs/scraper/src/instagram.ts
- [[.isLoggedIn()]] - code - libs/scraper/src/instagram.ts
- [[.newPage()]] - code - libs/scraper/src/instagram.ts
- [[.performLogin()]] - code - libs/scraper/src/instagram.ts
- [[.waitBetweenHandles()]] - code - libs/scraper/src/instagram.ts
- [[InstagramScraper]] - code - libs/scraper/src/instagram.ts
- [[config.ts]] - code - libs/scraper/src/config.ts
- [[instagram.ts]] - code - libs/scraper/src/instagram.ts
- [[jitter()]] - code - libs/scraper/src/jitter.ts
- [[jitter.ts]] - code - libs/scraper/src/jitter.ts
- [[loadScraperConfigFromEnv()]] - code - libs/scraper/src/config.ts
- [[randomJitter()]] - code - libs/scraper/src/jitter.ts
- [[sleep()]] - code - libs/scraper/src/jitter.ts

## Live Query (requires Dataview plugin)

```dataview
TABLE source_file, type FROM #community/Instagram_Scraper_Core
SORT file.name ASC
```

## Connections to other communities
- 6 edges to [[_COMMUNITY_Worker Configuration]]
- 3 edges to [[_COMMUNITY_Instagram Parsing]]

## Top bridge nodes
- [[.fetchRecentPosts()]] - degree 8, connects to 2 communities
- [[InstagramScraper]] - degree 11, connects to 1 community
- [[.ensureLoggedIn()]] - degree 7, connects to 1 community
- [[.close()]] - degree 4, connects to 1 community
- [[instagram.ts]] - degree 4, connects to 1 community