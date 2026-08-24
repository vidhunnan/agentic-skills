# chore: pin graph-context, the tool that generates GRAPH.md

- **Commit:** `c6fea42710ebe6ff3bf946215e3ab705058b68a6` (`c6fea42`)
- **Author:** Vidhunnan Murugan
- **Date:** 2026-08-24

## Commit message

The manifest and lockfile for the dependency whose output eeb3d46 just
ignored. The output is regenerable and stays out; the pin that makes it
regenerable goes in — otherwise `.gitignore` names a tool nothing in the repo
declares.

One dependency, `graph-context@^0.1.0`. The lockfile comes with it rather than
after it: a caret range on a `0.x` package is the case where the manifest alone
does not reproduce an install.

The manifest is minimal as written — no `name`, `version`, or `private` field.
Left as generated rather than filled in with plausible values; this repo
versions per skill and publishes nothing to npm.

## Changes in detail

### `package.json` (new)
- Five lines, one dependency: `graph-context@^0.1.0`. This is the **counterpart to the
  previous commit, not an afterthought to it** — `.gitignore` now excludes `.graph-context/`
  and `GRAPH.md` on the grounds that they are regenerable, and that claim is only true while
  something in the repo declares what regenerates them.
- **No `name`, `version`, or `private` field.** Committed as generated. Inventing a version
  would be the worse error of the two available: this repo's versioning policy is explicitly
  **per-skill**, in `skills/<name>/.claude-plugin/plugin.json`, and a root `"version"` would
  read as the library-wide number [ADR 0026](../../docs/decisions/0026-versions-are-per-skill-bumped-only-when-that-skill-changes.md)
  decided against. `"private": true` is the one arguably-missing field with a real
  consequence — it is what refuses an accidental `npm publish` — and it was left out rather
  than added silently in a commit about pinning a dependency.

### `package-lock.json` (new)
- `lockfileVersion: 3`, **109 resolved packages** for one direct dependency.
- Committed **with** the manifest rather than left for later. `^0.1.0` is a caret range on a
  `0.x` package, where the caret does not float across the minor: it is precisely the case
  where the manifest alone does not describe the install anyone actually has, so the two
  halves are only useful together.
- The lockfile carries `integrity` hashes and resolved registry URLs for the whole tree,
  which is what makes a future regeneration of `GRAPH.md` reproducible rather than
  approximately reproducible.

## Files changed

```
 package-lock.json | 1368 +++++++++++++++++++++++++++++++++++++++++++++++++++++
 package.json      |    5 +
 2 files changed, 1373 insertions(+)
```
