---
type: community
cohesion: 0.39
members: 8
---

# Instagram Parsing

**Cohesion:** 0.39 - loosely connected
**Members:** 8 nodes

## Members
- [[extractPostsFromNodes()]] - code - libs/scraper/src/parse.ts
- [[extractTimelineNodesFromHtml()]] - code - libs/scraper/src/parse.ts
- [[extractTimelineNodesFromHtml() Function]] - code - libs/scraper/src/parse.ts
- [[findTimelineEdges()]] - code - libs/scraper/src/parse.ts
- [[isTimelineNode()]] - code - libs/scraper/src/parse.ts
- [[node()]] - code - libs/scraper/src/parse.test.ts
- [[parse.test.ts]] - code - libs/scraper/src/parse.test.ts
- [[parse.ts]] - code - libs/scraper/src/parse.ts

## Live Query (requires Dataview plugin)

```dataview
TABLE source_file, type FROM #community/Instagram_Parsing
SORT file.name ASC
```

## Connections to other communities
- 3 edges to [[_COMMUNITY_Instagram Scraper Core]]

## Top bridge nodes
- [[parse.ts]] - degree 6, connects to 1 community
- [[extractPostsFromNodes()]] - degree 3, connects to 1 community
- [[extractTimelineNodesFromHtml()]] - degree 3, connects to 1 community