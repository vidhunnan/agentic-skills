# feat(website): round 5 — honest tags, downloads, a filterable catalogue, a cycling installer

- **Commit:** `10b64af57f70c2e2e8ff776946107099ef69ea61` (`10b64af`)
- **Author:** Vidhunnan Murugan
- **Date:** 2026-08-19

## Commit message

Six pieces of feedback. Three of them add capability rather than adjust craft, and
two of those reopen decisions rather than extend them.

The tags told a lie. Every row printed "Code · Chat" and struck Chat through when
it was missing, which put the same two words on all fourteen rows and turned the
column into decoration. Now a row shows only the surfaces it has — 11 are Code +
Chat, 3 are Code-only — and the absence of a tag is the information. No
line-through survives anywhere in the built CSS.

Downloads for the eleven Chat-capable skills. A prebuild step zips each skill
folder into public/skills/, so Vercel picks it up from a plain `next build`. Only
Chat-capable skills get one: a zip of a Code-only skill uploaded to Claude.ai would
not do what its description says, and offering it would be a claim the page cannot
back. 11 zips, 88.6KB total, smaller than the og.png already shipping.

The zip script asserts its own output. Every skill folder contains
.claude-plugin/plugin.json, and .claude-plugin is a dot-directory: a glob without
dot:true, or a shell `zip skills/x/*`, produces a one-file archive that looks
perfectly fine and is missing the manifest. Each archive is checked for both
entries and the build fails loudly rather than shipping a broken download.

The installer cycles all fourteen, wrapping, with the marketplace command pinned
above the cycle where it cannot be stepped past. This deliberately reprints every
command the catalogue prints, and the page-wide copy-button count goes 17 → 30 —
which is the exact number the original defect was recorded as. The difference is
that the two lists now do different jobs: you read about a skill in one and install
it from the other.

So the test contract changed rather than the number being bumped. It was "each
command at most once page-wide"; it is now "exactly once per surface, and there are
exactly two surfaces". That still fails if either surface prints a command twice,
and still fails if a third place starts printing commands — which is what the
duplication actually returning would look like.

Search is back, four months after design ADR 0009 retired it. Neither of 0009's own
revisit conditions fired: the catalogue is fourteen rows, not the ~30 it named, and
nobody asked for record search. It is back because the owner asked for it, and the
ADR should say exactly that.

The ranker is the retired palette's, restored from fcea6dd^ with its two hard-won
behaviours intact: group.note stays in the keywords (dropping it once silently lost
the query "figma", whose only occurrence in the dataset is the Design work group
note), and the band order stands (the keywords band must outrank the fuzzy band or
changelog-tracker wins the query "chat").

ONE DELIBERATE CHANGE to it: fuzzy matches are now a fallback, not a peer — dropped
whenever anything matched properly. The palette only ever sorted, so a stray
subsequence hit sat harmlessly at the bottom of a list; a filter is binary. "chat"
returned twelve rows, because changelog-tracker contains c-h-a-t in order. Ranking
hid that; filtering exposed it. A new spec pins all four queries.

The nav hides on the way down and returns on the way up, never within 80px of the
top, and stays put entirely under prefers-reduced-motion — a header that leaves and
returns is exactly the unrequested movement that preference is asking not to see.

Also: CLAUDE.md named six skills as registering protocol blocks. Nine do. Corrected,
with the command that re-derives it, in the file whose entire job is to be re-read
every session.

Verified: typecheck, build, 22/22 tests, no out-of-bounds vocabulary in the built
HTML, 11 zips exported each containing both entries, and zero search inputs or
stepper controls in the pre-mount markup with all 14 rows present.

## Corrections to the commit message

Three claims do not survive a check. The rest of the message's checkable numbers hold
— the 11/3 surface split, the nine protocol-registering skills, the 88.6KB zip total,
and the removal of the `line-through`.

**1. "Search is back, four months after design ADR 0009 retired it" — it was the same
day, one hour and twenty-four minutes.**

[`design/decisions/0009-the-command-palette-is-retired.md`](../../design/decisions/0009-the-command-palette-is-retired.md)
carries `**Date:** 2026-08-19`. It was written by `e05015d` (entry 039) at
**2026-08-19 18:05:34 +0530**. This commit is **2026-08-19 19:29:13 +0530** — the same
day, **84 minutes later**. Even measured against the code rather than the record, the
palette was deleted by `fcea6dd` on 2026-08-19. **There is no four-month interval
anywhere in this history**; the design decisions tier itself only begins on 2026-08-16.

The correction makes the sentence more pointed, not less. A retirement was logged as a
decision and reversed inside the same evening — which is exactly why the message's next
sentence matters: *"Neither of 0009's own revisit conditions fired … It is back because
the owner asked for it, and the ADR should say exactly that."*

**2. "11 zips, 88.6KB total, smaller than the og.png already shipping" — the total is
exact; the comparison is backwards.**

Measured at `3ddee88`, where the archives first enter git: **11 zips, 90,775 bytes =
88.6KB**, and `website/public/og.png` is **62,462 bytes = 61.0KB**. The zips are
**larger** than the og.png, by roughly 45%. The claim is true only per-archive — the
biggest single zip is `decisions-logger.zip` at 12,702 bytes — but the sentence pairs
it with the total, which is the reading a reader will take. *The argument the sentence
was making (that the payload is small enough not to matter) is not disturbed by the
correction; the comparison it reached for is.*

**3. "the ADR should say exactly that" — as of this commit, it does not.**

`design/decisions/` ends at `0011` at `10b64af`, and still does at the last commit
covered by this changelog (`7699f59`). No committed record describes the reinstatement,
and 0009's `**Status:**` is untouched by this commit. The message states the obligation
correctly and the diff does not discharge it. *(Whether the ADR is written later is a
question for the decision log, not for this entry — the changelog reports git.)*

## Changes in detail

**19 files, 876 insertions against 204 deletions** — the largest website commit since
round 3. Three of the six changes add capability rather than adjust craft, and two of
those reopen a logged decision.

### The tags stop lying — `Tags.{tsx,module.css}` (new), `skills.ts` (+105)

- `skills.ts` gains a `surfaces` field on every skill. Counted at this commit:
  **11 rows carry `["Code", "Chat"]`, 3 carry `["Code"]`** — exactly the split the
  message states.
- The old markup printed `Code · Chat` on all fourteen rows and struck the second
  through when absent. `text-decoration: line-through` is deleted from
  `Skills.module.css` and does not reappear.
- The reason is written into `SkillList.tsx` rather than only into the log: *"A
  struck-through 'Chat' was decoration pretending to be data — the absence of the tag
  is the information."*

### Downloads — `scripts/build-skill-zips.mjs` (new, 85 lines), `package.json` (+4)

- A `prebuild` step zips each Chat-capable skill folder into `website/public/skills/`,
  so a plain `next build` produces them. `jszip` enters `package.json`; the lockfile
  grows 113 lines.
- **Only Chat-capable skills get a zip**, on a stated argument: a Code-only skill
  uploaded to Claude.ai would not do what its description says, so offering the
  download would be *"a claim the page cannot back."*
- The script asserts its own output. The named failure mode is real and specific:
  `.claude-plugin/` is a dot-directory, so a glob without `dot: true` — or a shell
  `zip skills/x/*` — produces an archive that looks fine and is missing
  `plugin.json`. Each archive is checked for both entries and the build fails loudly.
- **The 88.6KB total is exact**; the comparison drawn against `og.png` is not — see
  correction 2.

### The catalogue becomes filterable — `SkillList.tsx` (new, 116 lines), `Skills.tsx` (−63)

- `Skills.tsx` drops from a full catalogue renderer to a section wrapper; the rows
  move into a `"use client"` `SkillList`.
- **The filter hides rows rather than unmounting them**, and the file says why: *"every
  row stays in the DOM and in the static export, so nothing is destroyed by a query and
  a JS-off reader has the whole catalogue."*
- **Order never changes.** The ranker can sort; it is used *"purely as the matcher"*,
  because *"reordering fourteen rows under the reader's cursor as they type is worse
  than leaving them where they were."*
- The input renders only after mount, holding the page's standing rule that no control
  ships that does nothing without JS.
- Placeholder at this commit: `filter — try design, chat, figma`. A live counter reads
  `14 skills` or `7 of 14`.
- The ranker is restored from `fcea6dd^` with both of its recorded behaviours: `group.note`
  stays in the keywords (dropping it once lost the query `figma`, whose only occurrence
  in the dataset is the Design work group note), and the keywords band outranks the
  fuzzy band (or `changelog-tracker` wins the query `chat`).
- **One deliberate change to the restored ranker**, with the reasoning in the message:
  fuzzy matches become a fallback dropped whenever anything matched properly, because
  *"the palette only ever sorted … a filter is binary."* The worked example is `chat`
  returning twelve rows on the subsequence c-h-a-t inside `changelog-tracker`.
  *"Ranking hid that; filtering exposed it."*

### The installer cycles — `InstallSteps.tsx` (rewritten, +153/−?)

- The three-step sequence becomes a wrapping cycle through all fourteen commands, with
  the marketplace command pinned above the cycle where it cannot be stepped past.
- The commit is explicit that this reprints every command the catalogue prints, and
  that **the test contract was rewritten rather than the number bumped**: from *"each
  command at most once page-wide"* to *"exactly once per surface, and there are exactly
  two surfaces."* That still fails on a duplicate within a surface and on a third
  surface appearing.

### The nav hides on scroll — `NavShell.tsx` (new, 54 lines)

- rAF-throttled passive scroll listener, *"the same shape the deleted Nav used for its
  scrollspy."* Two guards in the file: it never hides within the first 80px, and a 6px
  threshold stops trackpad jitter flickering it.
- **Under `prefers-reduced-motion: reduce` the effect returns before registering the
  listener** — the bar simply never hides. The file states the argument the message
  makes: *"a header that leaves and returns is exactly the kind of unrequested movement
  that preference is asking not to see, and hiding it without the transition would be
  worse."*

### `CLAUDE.md` (modified, +1/−1)

- **Verified against the tree.** At `10b64af`, `grep -l "BEGIN skill:" skills/*/SKILL.md`
  returns exactly nine: `branch-naming`, `changelog-tracker`, `decisions-logger`,
  `design-decisions`, `design-setup`, `handoff-generator`, `model-strategy`,
  `repo-setup`, `skill-scaffold`. The file had named six.
- The correction ships **with the command that re-derives it** inline in the sentence,
  which is the durable half: the next reader can check the count instead of trusting it.

### `website/tests/skills-search.spec.ts` (new, 74 lines), `home.spec.ts` (+43/−38)

- A new spec pins the four queries the ranker's behaviour turns on. `home.spec.ts` is
  substantially rewritten around the per-surface command contract.

## Files changed

```
 .gitignore                            |   3 +++
 CLAUDE.md                             |   2 +-
 website/components/Install.module.css |  95 ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++-------------------
 website/components/InstallSteps.tsx   | 153 ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++---------------------------------------------------------------
 website/components/Nav.module.css     |   6 ++++++
 website/components/Nav.tsx            |   5 +++--
 website/components/NavShell.tsx       |  54 ++++++++++++++++++++++++++++++++++++++++++++++++++++++
 website/components/SkillList.tsx      | 116 ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
 website/components/Skills.module.css  |  76 +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++-----------
 website/components/Skills.tsx         |  69 ++++-----------------------------------------------------------------
 website/components/Tags.module.css    |  12 ++++++++++++
 website/components/Tags.tsx           |  21 +++++++++++++++++++++
 website/components/lib/content.ts     |   5 +++++
 website/components/lib/skills.ts      | 105 +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
 website/package-lock.json             | 113 +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
 website/package.json                  |   5 ++++-
 website/scripts/build-skill-zips.mjs  |  85 +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
 website/tests/home.spec.ts            |  81 +++++++++++++++++++++++++++++++++++++++------------------------------------------
 website/tests/skills-search.spec.ts   |  74 ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
 19 files changed, 876 insertions(+), 204 deletions(-)
```

---

_Generated by `/changelog-tracker` from `git log -1` and `git show --stat`. Every
fact here comes from git: **faithful, not generative.**_
