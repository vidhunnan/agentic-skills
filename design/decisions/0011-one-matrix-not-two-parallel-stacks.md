# 0011. One nine-question matrix replaces the two parallel stack sections

- **Status:** **Accepted**
- **Date:** 2026-08-19
- **Supersedes:** [0001](./0001-two-stacks-equal-billing.md)

## Context

[0001](./0001-two-stacks-equal-billing.md) put the code stack and the design stack
side by side, *"as two parallel sections rendered from one component and one data
source. Neither is framed as the primary and neither as an extension."* That shipped
as two `ContextStack` renders over `CONTEXT_STACK` (five tiers) and `DESIGN_STACK`
(seven tiers).

**The two sections printed the same rows twice.** This is a defect in the built page,
not a judgement about length. From the data as it stood at `fcea6dd^`:

| | `folder` | `question` | `trust` | `qualifier` |
|---|---|---|---|---|
| `CONTEXT_STACK` | `changelog/` | What actually shipped? | Truth | generated from git |
| `DESIGN_STACK` | `changelog/` | What actually shipped? | Truth | generated from git |
| `CONTEXT_STACK` | `docs/decisions/` | Why did we choose **that**? | Truth | past tense, append-only |
| `DESIGN_STACK` | `design/decisions/` | Why did we choose **this**? | Truth | past tense, append-only |

`changelog/` was rendered twice, character for character. The two decisions rows
shared their trust label and their qualifier exactly and differed by one word in the
question. A reader scrolling the page met the same row a second time and had no way
to tell whether it was a repeat or a distinction they had missed.

The duplication is **not an accident of authoring.** `changelog/` is a tier of both
stacks by design — CLAUDE.md's `skill:repo-setup` and `skill:design-setup` routing
tables both list it, because a design record may never claim what shipped either. Two
sections rendering two complete stacks will always print it twice.

Two further facts were on the record. 0001's *"one component and one data source"* was
true of the component and false of the copy: the second `ContextStack` call carried
~30 lines of JSX copy inline. And below 720px the trust qualifiers were `display:
none` — the brief calls this out as a defect, *"a tier's trustworthiness is the entire
point of the stack, and on a phone it is gone."*

## Options considered

| Option | The bet | Why it lost |
|---|---|---|
| Keep two sections, de-duplicated by hand — drop `changelog/` from one stack and reword the two decisions rows | Preserves 0001's equal billing exactly as argued, for the smallest possible change | **`*(reason not stated)*`** — no deliberation is recorded. On the record: `changelog/` is a tier of both stacks in both routing tables, so dropping it from one would have made the page contradict the structure it is describing |
| Keep both sections and fix only the mobile defect | The duplication is cosmetic; the `display: none` is the real bug and the only one a reader loses content to | **`*(reason not stated)*`.** Recorded instead: the rebuild fixed the mobile loss *by construction* — *"the matrix stacks and keeps every value"* — rather than by patching the media query |
| **One nine-question matrix — chosen** | Organise by the question rather than by the folder tree. Each question appears once, with what answers it today and what this library adds, so a shared tier is a shared row instead of a repeat | — |

## Decision

One section, nine rows, three columns — **question · what answers it today · this
adds.** `CONTEXT_STACK` and `DESIGN_STACK` are deleted and replaced by `MATRIX`.
Twelve rows become nine by merging the three the two stacks genuinely share: the
changelog row, the decisions row, and the briefs row, which now names both tiers on a
single line (`concepts · briefs`, `prds · briefs`). Nothing is dropped and nothing is
printed twice.

Redline marks only the four rows where nothing answers the question today — the same
signal the records use for a reason nobody recorded, so it is not spent on anything
else here. Every value survives below 720px; the only `display: none` rules left are
the decorative column heads and the `│` pipes.

The matrix was authored and read at full content in exploration round 2 before it was
ported — `git:5e1d1ca` shipped *"all 9 matrix rows"* in the artifact the direction was
approved from.

## What we gave up

- **Equal billing as a visible thing.** 0001's decision was that the two stacks sit
  side by side and neither is framed as primary. One table cannot show that. The
  design tiers are now words inside shared rows — `briefs`, `research`, `specs`,
  `system` — rather than a section with its own heading and its own count. The claim
  survives in the content; the *form* that argued it is gone, and form was the
  argument.
- **The folder names.** The old sections printed real paths — `docs/decisions/`,
  `design/research/` — and the matrix prints tier names only. A reader can no longer
  read the routing table off the page, which was a quiet part of what made the stack
  legible as something real rather than a diagram.
- **`design/briefs/` as a row of its own.** It is now a suffix on two rows, so the one
  tier that answers two different questions is the one the merge treats least well.
- **A structure that scaled by stack.** Adding a third stack later meant adding a
  section; now it means re-cutting nine questions, which is a harder edit and a more
  visible one.

## What would make us revisit

- **A reader cannot tell from the page that the library covers design work at all.**
  0001's stated failure mode was engineers bouncing if the repo skills read as
  secondary; this is its mirror, and the merge makes it the more likely of the two.
  Neither has been tested — the brief's comprehension test is still unrun.
- **The tiers diverge.** If a question one stack answers stops being answerable by the
  other, the shared row is no longer true and the merge has to come apart. The three
  merged rows are the ones to watch.
- **The matrix has to carry paths again.** If the page needs to show where these files
  actually live, three columns will not hold it and the structure changes.

## Evidence

- **Primary:** `git:fcea6dd` (2026-08-19), the commit message:
  > *"The two parallel stack sections become one nine-question matrix — they were
  > printing changelog/ and decisions/ twice with identical text."*
- **Corroborating:** `git:fcea6dd^:website/components/lib/skills.ts` — the two arrays,
  where the `changelog/` entries are identical in all four fields and the two
  `decisions/` entries share trust and qualifier · `website/components/Matrix.tsx` and
  `lib/skills.ts` §MATRIX, both of whose comments cite this ADR and name the same
  defect · [`../briefs/website-revamp.md`](../briefs/website-revamp.md) §Three things
  duplicated or untrue, and the `display: none` defect · `git:5e1d1ca` — the matrix at
  full content in round 2 · [0001](./0001-two-stacks-equal-billing.md).
- **Rationale:** stated in the commit message and in both source comments, all three
  naming the duplicate rows. **Nothing on record objects to twelve rows** — this was
  not a headcount argument, and the row count fell as a consequence of merging
  duplicates rather than as the goal.

## Follow-up

*Append-only. Everything above is **frozen**. Entries below are dated and additive.*

*(none yet)*

---

_**Exactly two things in this file may ever change:** the `**Status:**` line and
additions under `## Follow-up`. If this turns out to be wrong, do not edit it —
supersede it with a new decision that links back._
