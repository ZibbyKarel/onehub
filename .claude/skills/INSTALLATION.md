# Local skills installation

Pinned upstream source:
- Repository: `https://github.com/vercel-labs/agent-skills`
- Commit: `ce3e64e468f8fa09a2d075d102771838061fdac0`
- Synced local skill directories:
  - `skills/react-best-practices` -> `.claude/skills/react-best-practices`
  - `skills/composition-patterns` -> `.claude/skills/composition-patterns`
  - `skills/web-design-guidelines` -> `.claude/skills/web-design-guidelines`
  - `skills/react-view-transitions` -> `.claude/skills/react-view-transitions`

Notes:
- `claude-api` and `superpowers/*` are referenced by this repository's policy, but they are not present in `vercel-labs/agent-skills` at the pinned commit above.
- `nx-workspace` and `nx-generate` remain intentionally deferred for local `.claude/skills` sync as documented in `AGENTS.md`.

Reproducible sync/update procedure:
1. Remove or back up the local `.claude/skills` directory if a clean sync is desired.
2. Clone `vercel-labs/agent-skills` and check out commit `ce3e64e468f8fa09a2d075d102771838061fdac0`.
3. Copy the four selected skill directories from `skills/` into `.claude/skills/`.
4. Verify expected contents, including supporting files such as `AGENTS.md`, `README.md`, `metadata.json`, `rules/`, or `references/` where upstream provides them.
