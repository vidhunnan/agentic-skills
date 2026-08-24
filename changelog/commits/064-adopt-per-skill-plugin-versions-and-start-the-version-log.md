# docs(versioning): adopt per-skill plugin versions and start the version log

- **Commit:** `55ebabca0f2535362d8d7d02129311a6dc1b39a4` (`55ebabc`)
- **Author:** Claude
- **Date:** 2026-08-24

## Commit message

Runs the new skill on this repo. Each skill installs on its own, so each carries
its own version, bumped only when that skill changes — a library-wide bump would
tell someone reinstalling branch-naming that something changed in a skill they
don't have. That is why the numbers are uneven and should stay uneven:
handoff-generator is at 0.5.0 after five revisions, everything else has shipped
once.

docs/VERSIONING.md records the policy, including the part the version numbers
can't state themselves: the surface here is one file per skill, but the
marketplace entry, skills.ts and the README row carry no version and are a
registration check instead. Both were run before writing this — fifteen skills,
zero drift.

changelog/VERSION-LOG.md starts today with a baseline row read from the repo.
There are no tags and no prior release log, so nothing before today is claimed,
and why each of handoff-generator's four bumps happened is not written down
rather than plausibly reconstructed. The record starts clean.

## Changes in detail

### `docs/VERSIONING.md` (new)
- The policy: profile (Claude Code plugin), scheme (semver), the one writer (a commit on
  `prod-stable` — merging *is* releasing here, since installs resolve from the default
  branch), and what a candidate is when there is no registry to publish to (an unmerged
  branch, with no invented suffix).
- The version surface table draws a distinction this repo needed: `plugin.json` is the only
  file carrying a version, so *version agreement* is trivial; the marketplace entry,
  `skills.ts` and the README row carry none, so what they need is a *registration* check.
  Conflating the two would have produced a surface that is three-quarters noise.
- Bump rules written for prose artifacts rather than code: minor is the common case
  because most real edits to a skill change what it does, and renaming a protocol block's
  markers is a **major** — the old block stops being found and silently duplicates.

### `changelog/VERSION-LOG.md` (new)
- The ledger, seeded. Two rows: `version-manager@0.1.0` as a **candidate** (it is on a
  branch, so it is honestly not released yet) and a **baseline** row recording the
  fourteen committed skill versions as read from disk.
- No history was backfilled. There are no tags and no prior release log, so the file says
  the record begins today, and states plainly that the reasoning behind
  `handoff-generator`'s four bumps is not recoverable — rather than reconstructing four
  plausible entries that nothing could check.

### `CLAUDE.md` (modified)
- Adds the `<!-- BEGIN skill:version-manager -->` protocol block under `## Skill
  protocols`, so the convention is re-read every session rather than depending on anyone
  remembering it.
- Updates the count in the section preamble from nine protocol-registering skills to ten,
  which `grep -l "BEGIN skill:" skills/*/SKILL.md` confirms.

### `website/components/lib/counts.json` (generated)
- `rules` 8 → 9. The site states how many protocol blocks live in this repo's CLAUDE.md;
  adding one changes the number, and `counts.spec.ts` is what catches it going stale.

## Files changed

```
 CLAUDE.md                          |  7 ++++-
 changelog/VERSION-LOG.md           | 57 ++++++++++++++++++++++++++++++++++++++
 docs/VERSIONING.md                 | 56 +++++++++++++++++++++++++++++++++++++
 website/components/lib/counts.json |  2 +-
 4 files changed, 120 insertions(+), 2 deletions(-)
```
