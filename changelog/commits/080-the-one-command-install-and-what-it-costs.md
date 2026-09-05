# docs(concepts): the one-command install, and what it costs

- **Commit:** `fbc65750d6cb854cbf524aed59378ebf6391aaf7` (`fbc6575`)
- **Author:** Claude
- **Date:** 2026-09-05

## Commit message

Three routes to installing the library in one go — the existing npx skills
CLI (verified working today, unchanged), an npm source in marketplace.json,
and our own CLI. The fork isn't npm-or-not; it's whether a one-command
install is allowed to be version-blind, which puts it against ADR 0026.

## Changes in detail

### `docs/concepts/npm-distribution.md` (new, +175)

- **The premise:** the README's Install block asks for twenty `/plugin install`
  lines, and the stack only works whole — `design-critique` refuses to run without
  what `design-brief` wrote. Install friction that selects for partial adoption
  selects against the library's own thesis.
- **What is already true.** `npx skills add vidhunnan/agentic-skills --skill '*'`
  and `npx skills update` were run against the live repo, unchanged: all twenty
  skills found, each whole folder copied (`SKILL.md` **and** `.claude-plugin/`),
  a `skills-lock.json` written, and all twenty updated in one pass. The layout
  already matches — [`vercel-labs/skills`](https://github.com/vercel-labs/skills)
  walks three levels for a `SKILL.md`. **The library is already installable in one
  command and nobody has been told.**
- **Three routes, tabled:** the existing `npx skills` CLI (free, version-blind);
  an `{"source": "npm", "package": …}` entry in `marketplace.json`, which Claude
  Code supports natively and which preserves semver; and a first-party
  `npx @vidhunnan/agentic-skills` CLI.
- **The fork is named, not resolved:** *is the one-command install allowed to be
  version-blind?* Route A says yes for free; B charges twenty npm packages for
  "no"; C charges a CLI. That puts the choice directly against
  [ADR 0026](../../docs/decisions/0026-versions-are-per-skill-bumped-only-when-that-skill-changes.md) —
  every one-command installer treats the **repo** as the unit of distribution,
  and 0026 says the unit of release is the **skill**.
- **The shakiest assumption is flagged as such:** there is no install telemetry,
  so "partial adoption is happening and harmful" is a guess, and the document
  says so rather than arguing past it.
- **Kill condition is a real one:** if installing twenty skills at once floods a
  project's auto-trigger surface, the twenty README lines are not friction, they
  are a filter, and the README is already correct.

## Not done

- **No decision, and no ADR.** The concepts tier is hypothesis; the fork above is
  live and unresolved. Nothing in `.claude-plugin/marketplace.json`, `README.md`
  or `website/` changed.
- **No npm package published, and no CLI built.** Route C would reuse
  `website/scripts/build-skill-zips.mjs`, which already solves the deterministic
  packaging problem — noted in the concept, not acted on.
- **Claude.ai left where it was.** No filesystem there, zip upload only, so no
  route reaches it and the concept says the install split widens rather than
  closes.
