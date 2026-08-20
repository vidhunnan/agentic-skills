# fix(website): commit the skill zips — Vercel's root directory has no skills/

- **Commit:** `3ddee8853c132e3659da36aefcd899beb34cb8fb` (`3ddee88`)
- **Author:** Vidhunnan Murugan
- **Date:** 2026-08-19

## Commit message

The round 5 build failed on Vercel:

    Error: ENOENT: no such file or directory, scandir '/vercel/skills/repo-setup'

The project's Root Directory is `website/`, so the build process sees only that
subtree. `skills/` is a sibling of `website/`, not a descendant, and it is simply
not on disk at build time. The script walked up two levels from `scripts/` and
landed in `/vercel`. It worked locally because locally the whole repo is there —
the exact class of bug a local-only check cannot catch.

So the zips are committed, and the script has two modes:

- generate — repo root found (any local build). Rebuilds every zip and rewrites
  manifest.json.
- verify — no skills/ dir (Vercel). Confirms every expected archive and its
  manifest entry is present, and exits 0.

Both paths were exercised against an isolated tree with no skills/ above it:
verify passes, and deleting one zip makes it fail with the archive named. A check
that cannot fail is not a check.

Committed build output goes stale silently, which is the real cost of this fix.
tests/skill-zips.spec.ts is what stops that: it rehashes every skill folder and
compares against the manifest written when the zips were built, so editing a
SKILL.md without re-running the build fails the suite with the command to fix it.

Zip entries are also stamped with a fixed date now. JSZip writes mtime by default,
which made the bytes differ on every run and would have produced a git diff for a
file whose contents had not changed.

26 tests passing.

## Changes in detail

**15 files, 175 insertions against 49 deletions**, eleven of them binary. This is the
first commit in the repo to check build output into git, and the message is unusually
careful to name the cost of that rather than only the fix.

### The bug

The failure is a deployment-topology bug, not a code bug: the Vercel project's Root
Directory is `website/`, so `skills/` — a **sibling** of `website/`, not a descendant
— is not on disk at build time. `build-skill-zips.mjs` walked up two levels from
`scripts/` and landed in `/vercel`. The message names the class honestly: *"It worked
locally because locally the whole repo is there — the exact class of bug a local-only
check cannot catch."*

### `website/scripts/build-skill-zips.mjs` (rewritten, +138/−49)

- **Two modes, selected by what is on disk.** *generate* when a repo root with
  `skills/` is found (any local build): rebuild every archive and rewrite
  `manifest.json`. *verify* when there is no `skills/` (Vercel): confirm every expected
  archive and its manifest entry is present, then exit 0.
- The message records that **both paths were exercised against an isolated tree**, and
  that the failure path was checked by deleting an archive and watching it fail with
  that archive named. The principle it states is the durable part: *"A check that
  cannot fail is not a check."*
- **Zip entries are stamped with a fixed date.** JSZip writes mtime by default, which
  made the bytes differ on every run — *"and would have produced a git diff for a file
  whose contents had not changed."* This is what makes the eleven binaries stable
  enough to live in git at all; later commits still show them as `Bin N -> N bytes`
  touched-but-identical.

### `website/public/skills/*.zip` (new, 11 binaries) + `manifest.json` (new, 16 lines)

- The eleven Chat-capable skills' archives enter git: `decisions-logger` (12,702),
  `design-brief` (5,184), `design-critique` (6,877), `design-decisions` (9,072),
  `design-explore` (7,378), `design-language` (7,436), `design-setup` (9,933),
  `exploration-log` (5,266), `handoff-generator` (8,690), `repo-setup` (9,809),
  `skill-scaffold` (8,428) — **90,775 bytes, 88.6KB total.**

### `website/tests/skill-zips.spec.ts` (new, 65 lines)

- **The guard against the cost the fix incurs.** The message names the real risk
  plainly — *"Committed build output goes stale silently"* — and then closes it: the
  spec rehashes every skill folder and compares against the manifest written when the
  zips were built, so editing a `SKILL.md` without re-running the build fails the suite
  **with the command to fix it**.
- This is the same shape as the `matrix-mobile.spec.ts` regression guard from entry
  041: the defect is made to fail a test rather than left to be noticed.

### `.gitignore` (modified, +5/−2)

- Adjusted so `website/public/skills/` is tracked; round 5 (`10b64af`) had added three
  lines ignoring it.

## Files changed

```
 .gitignore                                  |   5 +++--
 website/public/skills/decisions-logger.zip  | Bin 0 -> 12702 bytes
 website/public/skills/design-brief.zip      | Bin 0 -> 5184 bytes
 website/public/skills/design-critique.zip   | Bin 0 -> 6877 bytes
 website/public/skills/design-decisions.zip  | Bin 0 -> 9072 bytes
 website/public/skills/design-explore.zip    | Bin 0 -> 7378 bytes
 website/public/skills/design-language.zip   | Bin 0 -> 7436 bytes
 website/public/skills/design-setup.zip      | Bin 0 -> 9933 bytes
 website/public/skills/exploration-log.zip   | Bin 0 -> 5266 bytes
 website/public/skills/handoff-generator.zip | Bin 0 -> 8690 bytes
 website/public/skills/manifest.json         |  16 ++++++++++++++++
 website/public/skills/repo-setup.zip        | Bin 0 -> 9809 bytes
 website/public/skills/skill-scaffold.zip    | Bin 0 -> 8428 bytes
 website/scripts/build-skill-zips.mjs        | 138 +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++-----------------------------------------------
 website/tests/skill-zips.spec.ts            |  65 +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
 15 files changed, 175 insertions(+), 49 deletions(-)
```

---

_Generated by `/changelog-tracker` from `git log -1` and `git show --stat`. Every
fact here comes from git: **faithful, not generative.**_
