# Changelog — What actually shipped?

**Question:** What actually shipped?
**Tense:** past
**Status:** **TRUTH**
**Written by:** agent, from git
**Lifecycle:** Append-only, generated. **Never hand-edit.**

Standup. One file per substantive commit, plus a rolling index. Every fact in here comes from git — hashes, dates, diffstats, the verbatim message. Nothing is inferred, nothing is aspirational.

## This is the tier you trust

**`changelog/` is what shipped. Everything under `docs/` is what we *thought*.**

That split is the reason this folder sits outside `docs/` instead of at `docs/changelog/`. `docs/` is hand-written hypothesis; this is generated truth. The folder layout *is* the rule.

Mix them and you've handed a teammate contradictory instructions. A human pushes back. An agent just agrees — confidently, in both directions.

So: **never cite a concept or a PRD as evidence a feature exists.** Check here, or check the code.

## What goes here

- `commits/NNN-slug.md` — one per substantive commit (hash, author, date, PR, verbatim message, per-file what + why, diffstat).
- `CHANGELOG.md` — the rolling index: a newest-first per-commit table plus dated Keep-a-Changelog sections.

## What does NOT go here

- Anything not yet true. This tier is past tense, without exception.
- Merge commits and changelog-only commits — they're deliberately skipped.
- **Hand-written prose.** If you're typing into this folder, something has gone wrong. Run `/changelog-tracker`.

## Template

`_TEMPLATE.md` is the per-commit shape, for reference. In practice you never fill it in by hand — `/changelog-tracker` generates it from `git log -1` and `git show --stat` after each commit.
