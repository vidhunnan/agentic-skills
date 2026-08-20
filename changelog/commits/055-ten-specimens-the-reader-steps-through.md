# feat(website): ten specimens the reader steps through, all of them verbatim

- **Commit:** `1c7f75462bd254973b59ba4bd779ae593716593b` (`1c7f754`)
- **Author:** Vidhunnan Murugan
- **Date:** 2026-08-20

## Commit message

Per Figma node 2283:5091 — prev/next and "N of 10" under the card.

FIXES THE OVERLAP. The stack's hide rules were written as descendant selectors
(.stepped .stack > .slide) while .stepped sits ON .stack, so they matched nothing
and every card painted on top of every other. They are compound now
(.stack.stepped > .slide), with a comment saying why, because the failure mode is
silent: the page still renders, it just renders all ten at once.

FIXED FRAME. The stack is one grid cell at 426px, so the card is exactly as tall
whichever record is showing and the caption and controls below never move as you
step. The text inside changes; the frame does not. All ten were measured against
that frame — one overflowed by 71px and was trimmed to its self-contained opening
rather than shrinking the type for everyone.

THE CONTENT IS THE POINT. Ten records across seven skills: two design decisions
(one with its reason, one that admits it never had one), an architectural ADR, the
reject ledger, raw git output with its provenance line, a changelog correcting its
own author, a handoff reconciled against the session before it, a killed
exploration that declines to over-claim why, a brief naming its own failure modes,
and a design doc that legislates words.

EVERY ENTRY IS GENERATED FROM ITS FILE BY LINE RANGE, not transcribed. That matters
because the test added earlier today found that FIVE of the six hand-written
specimens were not verbatim. The worst stitched fragments from two non-adjacent
rows of a Markdown table into what read as one continuous passage — words dropped
from the middle, which the data file's own rule forbids. None had ever rendered, so
nothing false reached a reader; they were waiting in the array for exactly this
change to expose them.

tests/specimen.spec.ts now checks all ten against their sources and reports every
drift at once rather than stopping at the first, plus that the card renders what it
claims and that stepping wraps.

Controls mount-gate as everywhere else here; every record ships in the static
export. This supersedes design ADR 0010's "one specimen" — but not ADR 0006's bar,
which governs motion: 0010 killed a TIMER-driven rotation, and this moves only when
a reader presses an arrow.

## Corrections to the commit message

The content claims all hold — ten specimens across seven distinct skills, verified
against the `by:` field of every entry. One framing does not.

**1. "FIXES THE OVERLAP" — the broken selectors never existed in a committed state.**

`website/components/Hero.module.css` at `1c7f754^` contains **no `.stack` and no
`.stepped` rule at all**; both are introduced by this commit. The descendant form
(`.stepped .stack > .slide`) the message describes as the bug being fixed appears in no
tracked file at any commit. Like entry 042's correction 4, this is a working-tree state
that no commit captured: **nothing regressed and nothing was repaired in any tracked
file.** *Recorded as unverifiable, neither asserted nor denied.*

The engineering note it carries is still worth keeping, because it is a claim about CSS
rather than about history: `.stepped` sits **on** `.stack`, so the hide rules must be
compound (`.stack.stepped > .slide`) and not descendant, and **the failure mode is
silent** — *"the page still renders, it just renders all ten at once."* The shipped
stylesheet carries that reasoning as a comment.

**2. "one overflowed by 71px and was trimmed" — not checkable from git.**

The 426px frame and the trimmed entry are both in the diff; the 71px measurement and
which entry overflowed are stated only in the message. *Recorded as author-supplied.*

**3. "This supersedes design ADR 0010's 'one specimen'" — the supersession is asserted
in the message and written nowhere else.**

`design/decisions/` ends at `0011` at this commit and at every commit through
`7699f59`. [0010](../../design/decisions/0010-one-hero-specimen-not-six.md)'s
`**Status:**` reads `Accepted` and is not touched. The message is right that a supersession has happened
and right about its scope — 0010 killed a **timer-driven** rotation, and this moves only
on a reader's press, so ADR 0006's motion bar is not re-triggered — but **the design
decision log does not record any of it.** Four commits later, `7699f59` (entry 059)
restates the same debt as *"Still owed: a design ADR."*

## Changes in detail

**438 insertions against 199 deletions** across four source files — the largest
website commit since round 5, and the one that puts the most records on the page.

### The content is the change

Ten records, verified against the `by:` field on each entry — **seven distinct skills**:

| # | Source | Written by |
|---|---|---|
| 1 | `design/decisions/0007` | `design-decisions` |
| 2 | `design/decisions/0002` | `design-decisions` |
| 3 | `docs/decisions/0023` | `decisions-logger` |
| 4 | `docs/decisions/0000-not-logged` | `decisions-logger` |
| 5 | `changelog/commits/037` | `changelog-tracker` |
| 6 | `changelog/commits/042` | `changelog-tracker` |
| 7 | `handoff/…-context-stack` | `handoff-generator` |
| 8 | `docs/concepts/website/type-system` | `exploration-log` |
| 9 | `design/briefs/website-revamp` | `design-brief` |
| 10 | `design/system/language-website` | `design-language` |

Entry 4 is the **reject ledger** and entry 6 is **a changelog entry correcting its own
author** — entry 042's Corrections section, printed on the page it documents. The
selection is doing argumentative work: it is the library's output range shown rather
than described, which is what the site had never managed with one specimen.

### What the new test found — the most valuable thing in the commit

- `specimen.spec.ts`, added six commits earlier in `9373c37` (entry 052) to guard the
  page's load-bearing claim, **found that five of the six hand-written specimens were
  not verbatim.**
- The worst is described precisely: it *"stitched fragments from two non-adjacent rows
  of a Markdown table into what read as one continuous passage — words dropped from the
  middle, which the data file's own rule forbids."*
- **The honest qualifier is in the message and matters**: *"None had ever rendered, so
  nothing false reached a reader; they were waiting in the array for exactly this change
  to expose them."* The array had held them since the round 2 rebuild; only entry 042's
  single displayed specimen was ever checked by eye.
- The response is structural rather than corrective: **every entry is now generated from
  its file by line range, not transcribed.**

### `website/components/Specimen.tsx` (new, 170 lines)

- The stepped card, `prev`/`next` and an `N of 10` readout per Figma node 2283:5091.
- Controls mount-gate as everywhere else on this page; **every record ships in the
  static export.** The rule from round 4's `InstallSteps` (entry 045) — *"JS may
  enhance, never reveal"* — holds without a new exception.

### `website/components/Hero.module.css` (+97), `Hero.tsx` (−105 net)

- **A fixed 426px frame.** The stack is one grid cell, so *"the card is exactly as tall
  whichever record is showing and the caption and controls below never move as you
  step. The text inside changes; the frame does not."*
- The compound-selector comment ships in the stylesheet, so the silent failure mode is
  documented where the next editor will be standing.
- `Hero.tsx` sheds the specimen rendering to `Specimen.tsx` and shrinks by 105 lines.

### `website/components/lib/skills.ts` (+~100 net, 202 lines touched)

- `SPECIMENS` rewritten from six hand-written entries to ten generated ones.

### `website/tests/specimen.spec.ts` (+47/−12)

- Checks **all ten** against their sources and **reports every drift at once rather
  than stopping at the first** — the difference between a test that names the problem
  and one that names the first symptom.
- Also asserts the card renders what it claims, and that stepping wraps.

### Suite count

- 30 → **34 tests passing.**

## Files changed

```
 website/components/Hero.module.css          |  97 +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
 website/components/Hero.tsx                 | 109 +++-----------------------------------------------------------------------------
 website/components/Specimen.tsx             | 170 ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
 website/components/lib/skills.ts            | 202 ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++----------------------------------------------------------------------------------
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
 website/tests/specimen.spec.ts              |  59 ++++++++++++++++++++++++++++++++-----------
 16 files changed, 438 insertions(+), 199 deletions(-)
```

---

_Generated by `/changelog-tracker` from `git log -1` and `git show --stat`. Every
fact here comes from git: **faithful, not generative.**_
