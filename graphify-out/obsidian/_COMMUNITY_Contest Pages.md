---
type: community
cohesion: 0.29
members: 7
---

# Contest Pages

**Cohesion:** 0.29 - loosely connected
**Members:** 7 nodes

## Members
- [[CurrentContestsPage()]] - code - apps/web/src/app/page.tsx
- [[HistoryPage()]] - code - apps/web/src/app/history/page.tsx
- [[contests.ts]] - code - apps/web/src/lib/contests.ts
- [[fetchContestsByStatus()]] - code - apps/web/src/lib/contests.ts
- [[page.tsx_2]] - code - apps/web/src/app/history/page.tsx
- [[page.tsx]] - code - apps/web/src/app/page.tsx
- [[toCard()]] - code - apps/web/src/lib/contests.ts

## Live Query (requires Dataview plugin)

```dataview
TABLE source_file, type FROM #community/Contest_Pages
SORT file.name ASC
```
