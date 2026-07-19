# docs(decisions): log the four website ADRs (0015-0018)

- **Commit:** `efcb70b7359bf64966d2e844c40d9cc1090d70c8` (`efcb70b`)
- **Author:** Vidhunnan Murugan
- **Date:** 2026-07-19

## Commit message

Record the decisions behind the /website build, each traced to git:e4a1f2e,
the approved plan, or the owner's own words this session:

- 0015 — the website is an isolated Next.js build under /website (over a
  static HTML file matching the repo's no-build ethos)
- 0016 — site content is data-driven from one components/lib/skills.ts,
  sourced from the README/SKILL.md (over hardcoding it in markup)
- 0017 — the design direction is "Swiss whitepaper" (over the Field Report
  and Blueprint concept directions)
- 0018 — styling is plain CSS Modules, not Tailwind or a UI library

Rebuild the index region in README.md (18 decisions stand, no supersessions)
and add four below-bar rows to 0000-not-logged.md (the vercel.json preset
fix, output: 'export', the author byline, and the custom domain).

## Changes in detail

### `docs/decisions/0015-the-website-is-an-isolated-next-js-build.md` (new)
- Logs the decision to build the site as an isolated Next.js app under `/website` rather than a single static HTML file, recording the tension it creates with the repo's "no build system, no code" identity (now scoped to the skills) and citing `git:e4a1f2e` plus the owner's own words this session.

### `docs/decisions/0016-site-content-is-data-driven-from-one-source.md` (new)
- Logs the decision to drive all site content from one `components/lib/skills.ts` sourced from the README/SKILL.md, over hardcoding it in markup; rationale quoted from the commit body of `e4a1f2e`.

### `docs/decisions/0017-the-website-design-direction-is-swiss-whitepaper.md` (new)
- Logs the choice of the "Swiss whitepaper" design direction over the Field Report and Blueprint concept directions; rationale supplied by the owner this session (lighter, airier, minimal ink, deck-referenced).

### `docs/decisions/0018-website-styling-is-plain-css-modules.md` (new)
- Logs the choice of plain CSS Modules over Tailwind or a UI library, for restraint and a small dependency surface; rationale from the approved plan.

### `docs/decisions/0000-not-logged.md` (modified)
- Adds four `below-bar` rows to the reject ledger: the `vercel.json` framework-preset fix (blast-radius gate), `output: 'export'` (no defensible loser), the author byline (no loser; also unmerged), and the custom domain (config fact).

### `docs/decisions/README.md` (modified)
- Rebuilds the generated index region: adds rows for 0015–0018, updates the standing count to 18 decisions, and bumps the reject-ledger tally to 15 candidates. No supersessions, so the graph stays omitted.

## Files changed

```
 docs/decisions/0000-not-logged.md                  |  4 +++
 ...015-the-website-is-an-isolated-next-js-build.md | 42 ++++++++++++++++++++++
 ...-site-content-is-data-driven-from-one-source.md | 39 ++++++++++++++++++++
 ...website-design-direction-is-swiss-whitepaper.md | 40 +++++++++++++++++++++
 .../0018-website-styling-is-plain-css-modules.md   | 41 +++++++++++++++++++++
 docs/decisions/README.md                           |  8 +++--
 6 files changed, 172 insertions(+), 2 deletions(-)
```
