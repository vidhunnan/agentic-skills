# fix(website): the deployed page was claiming "-1 decisions", and the zips churned

- **Commit:** `04a408a5612732459b6916fe707c134d0e45ba6a` (`04a408a`)
- **Author:** Vidhunnan Murugan
- **Date:** 2026-08-20

## Commit message

Two defects on prod-stable, both found while writing repo ADR 0024 rather than by
any test — which is the argument for writing the record.

THE COUNTS. counts.ts read the repo filesystem at build time. Vercel's Root
Directory is website/, so the repo root is not on disk there — the same absence
that made the zip script die with ENOENT in 3ddee88. Every lookup threw, every
catch returned 0, and `decisions` is `files - 1` for the reject ledger, so the
deployed page read:

    0 rules live in this repo's CLAUDE.md. They have produced -1 decisions,
    0 design decisions, 0 documented commits and 0 handoffs.

Not a missing number — a false one, shipped silently, on the page whose own stated
constraint is "no claim the page cannot source". The irony is total: the fix for
hardcoded counts introduced a worse failure than the hardcoding did.

Counts are now derived where the repo exists and committed as counts.json, exactly
like the skill zips. The script refuses to write a non-positive value and, on a
root-directory build, refuses to ship one. Verified against a tree with no repo
root: it verifies and exits 0; tamper the file to -1 and it fails naming the key.

tests/counts.spec.ts asserts every count is positive, that the committed numbers
still match the repo, and that the rendered page contains them and no negative
number anywhere in the section.

THE ZIP CHURN. 3ddee88 claimed a fixed entry date made the archives reproducible.
It did not, and two attempts were needed to find out why:

  1. `date` on generateAsync stamps the ARCHIVE, not the entries.
  2. `date` on every zip.file() left four bytes moving per run. JSZip
     auto-creates the intermediate FOLDER entries and stamps those with "now"
     regardless — two DOS time fields at 2-second resolution.

Every entry is restamped after the tree is built, folders included. Two runs 2.5
seconds apart now produce byte-identical archives, which is what the earlier claim
asserted without checking.

52 tests passing.

## Changes in detail

**Seventeen files, 182 insertions against 46 deletions** — of which eleven files are
`.zip` binaries that changed **without changing content**. Two independent defects, both
of them consequences of the same fact: on Vercel, `website/` is the whole world.

### `components/lib/counts.ts` (+18/−42) — the filesystem read is gone

**Verified in the diff.** The module opened with `import { readdirSync, readFileSync } from
"node:fs"`; it now opens with `import counts from "./counts.json"`. Every deleted line is
the machinery that made the bug possible:

- `const REPO_ROOT = join(process.cwd(), "..")` — the path that does not exist on Vercel.
- `countFiles()` with its `try { … } catch { return 0 }`, and `countProtocolBlocks()` with
  the same swallow. **The `catch` returning `0` is the defect**, not the missing directory:
  a build that cannot find the repo should fail, and this one substituted a number.
- `decisions: countFiles("docs/decisions", NUMBERED) - 1` — the `- 1` for the reject
  ledger, applied to a zero, is where `-1 decisions` came from.

What remains is a typed re-export of the JSON, so a stale count is now a **visible** value
in a committed file rather than an invisible failure at build time.

### `components/lib/counts.json` (new, 7 lines) — checked against the repo

```json
{ "rules": 8, "decisions": 25, "designDecisions": 17, "commits": 59, "handoffs": 3 }
```

**All five recomputed from the tree at this commit, and all five match:** 8 occurrences of
`BEGIN skill:[a-z]` in `CLAUDE.md`; 26 numbered ADRs in `docs/decisions/` minus the reject
ledger = 25; 17 in `design/decisions/`; 59 files in `changelog/commits/`; 3 in `handoff/`.

### `scripts/build-counts.mjs` (new, 75 lines) — and it does refuse, in both modes

The message's checkable claim is that the script *"refuses to write a non-positive value
and, on a root-directory build, refuses to ship one."* **Both branches are in the diff:**

- **Repo present:** `derive()`, then
  `if (bad.length) throw new Error(...)` on any value `<= 0` **before** `writeFileSync`.
  The comment above `derive()` states the rule as policy: *"Every count is a hard failure
  here. Never a fallback, never a zero."*
- **No repo root** (`!existsSync(join(ROOT, "CLAUDE.md"))`): it throws if `counts.json` is
  also absent, and otherwise re-validates the committed file — rejecting anything that is
  `typeof v !== "number" || v <= 0` with *"A zero or negative count would ship as a false
  claim."* The root-directory branch is the **stricter** of the two, which is the right way
  round: it is the branch that runs in production.
- `package.json` wires it in behind both `prebuild` and `predev`, chained after the zip
  build.

### `tests/counts.spec.ts` (new, 57 lines) — three tests, three claims

| Test | Asserts |
|---|---|
| *"every count is positive — a zero would ship as a false claim"* | `toBeGreaterThan(0)` over every key of `COUNTS` |
| *"the committed counts still match the repo"* | `COUNTS` deep-equals a fresh derivation, failing with *"counts are stale — run: npm run prebuild"* |
| *"the page renders the counts it committed"* | every value appears in `#how`, **and** `expect(note).not.toMatch(/-\d/)` |

**All four claims the message makes about this file hold.** The last assertion is worth
reading precisely: it forbids *any* hyphen-then-digit in the section, which is broader than
"no negative count" — a stricter guard than advertised, and the failure mode it was written
for could not slip past it.

**On "52 tests passing":** a diff cannot prove tests ran, but the number is consistent.
There are **26 `test()` blocks** across the eight spec files at this commit, and
`playwright.config.ts` defines **two projects** (`chromium`, `mobile-chrome`) — 26 × 2 = 52.

### `scripts/build-skill-zips.mjs` (+23/−2) — the third attempt, not the first

The header comment added here is the record of the two attempts that failed, and neither is
recoverable from git alone:

> *1. `date` on generateAsync only — that stamps the ARCHIVE, not the entries.*
> *2. `date` on every zip.file() — closer, but four bytes still moved each run. JSZip
> auto-creates the intermediate FOLDER entries … and stamps those with "now" no matter what
> the files say.*

The fix is three lines: a shared `const EPOCH = new Date("2020-01-01T00:00:00Z")`,
`{ date: EPOCH }` on every `zip.file()`, and then the line that actually closes it —

```js
// Folders included — see EPOCH. This is the line that makes it reproducible.
for (const entry of Object.values(zip.files)) entry.date = EPOCH;
```

`zip.files` holds **every** entry JSZip has materialised, folders included, so restamping
after the tree is built is what reaches the two auto-created directory entries that
`zip.file()` never sees. **Attempt 1 is verifiable in git** — the parent commit's line is
`date` on `generateAsync` alone. **Attempt 2 never reached a tracked file**, so the "four
bytes" figure rests on the header comment only; recorded here as the author's account
rather than as something the history confirms, the same treatment entry 042 gave the
artifact's callout kicker.

### Eleven archives rewritten once — and the manifest is the proof

Every `.zip` in `website/public/skills/` changed. **That is the fix restamping them, not
the churn it fixes**, and there are two independent checks:

1. **`website/public/skills/manifest.json` did not change.** Its per-skill sha256 is
   computed over entry paths and file bytes — never over timestamps — so an unchanged
   manifest beside eleven changed archives means **no skill content moved**. A content
   change would have moved both.
2. **Every archive kept its exact byte length** (`Bin 12702 -> 12702`, `5184 -> 5184`, and
   so on for all eleven), which is only possible if fixed-width fields were overwritten in
   place.

Byte-level, on `design-brief.zip`: **exactly 32 bytes differ**, in eight runs of four
contiguous bytes — four entries × two locations each (local header and central directory) ×
the 4-byte DOS date/time pair. `repo-setup.zip` differs by exactly 32 as well. Listing the
archives shows what moved:

```
before:  08-20-2026 04:54   design-brief/, design-brief/.claude-plugin/, plugin.json, SKILL.md
after:   01-01-2020 00:00   (all four)
```

Note what that listing also settles: **before this commit every entry carried "now", not
just the folders** — the parent tree passed no `date` to `zip.file()` at all. The
folders-only residue the header comment describes belongs to the uncommitted second
attempt.

**This is the one rewrite that ends the churn.** [Entry 047](./047-commit-the-skill-zips.md)
documented `3ddee88` committing these archives and repeated its reproducibility claim — while
also recording, without drawing the conclusion, that *"later commits still show them as
`Bin N -> N bytes` touched-but-identical."* That observation was the defect, written down
**six minutes before this commit fixed it** — 047 lands in `7e72ec3` at 10:47, this fix at
10:53 — and not connected to a cause in either place until now. This commit is what makes the claim true:
*"which is what the earlier claim asserted without checking."*

### Where this came from

Neither defect was found by a test. Both surfaced while **writing repo ADR 0024** in
`6c04582` (entry 060), whose Context section, as of this commit, states the deploy
constraint that produced them: *"The project's Root Directory is `website/`, so the build
process sees only that subtree."* 0024's message ended *"Writing it surfaced two defects on
prod-stable, reported separately"* — this is the separate report, one commit later.

## Files changed

```
 website/components/lib/counts.json          |   7 +++++++
 website/components/lib/counts.ts            |  60 ++++++++++++++++++------------------------------------------
 website/package.json                        |   4 ++--
 website/public/skills/decisions-logger.zip  | Bin 12702 -> 12702 bytes
 website/public/skills/design-brief.zip      | Bin 5184 -> 5184 bytes
 website/public/skills/design-critique.zip   | Bin 6877 -> 6877 bytes
 website/public/skills/design-decisions.zip  | Bin 9072 -> 9072 bytes
 website/public/skills/design-explore.zip    | Bin 7378 -> 7378 bytes
 website/public/skills/design-language.zip   | Bin 7436 -> 7436 bytes
 website/public/skills/design-setup.zip      | Bin 9933 -> 9933 bytes
 website/public/skills/exploration-log.zip   | Bin 5266 -> 5266 bytes
 website/public/skills/handoff-generator.zip | Bin 8690 -> 8690 bytes
 website/public/skills/repo-setup.zip        | Bin 9809 -> 9809 bytes
 website/public/skills/skill-scaffold.zip    | Bin 8428 -> 8428 bytes
 website/scripts/build-counts.mjs            |  75 +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
 website/scripts/build-skill-zips.mjs        |  25 +++++++++++++++++++++++--
 website/tests/counts.spec.ts                |  57 +++++++++++++++++++++++++++++++++++++++++++++++++++++++
 17 files changed, 182 insertions(+), 46 deletions(-)
```

---

_Generated by `/changelog-tracker` from `git log -1` and `git show --stat`. Every
fact here comes from git: **faithful, not generative.**_
