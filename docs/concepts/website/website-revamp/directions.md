# Design exploration — the website revamp

Date: 2026-08-19 · Generated against: [`design/system/language-website.md`](../../../../design/system/language-website.md)

> **Candidates, not a record.** Nothing here is evidence that anything was decided or
> shipped. `/exploration-log` records the verdict; `/design-decisions` records why.

## The question this round is asking

Given a page whose content is records — paths, dated entries, numbered decisions,
trust labels and gaps — **what structural idea should carry it?** Not which palette
(the palette is inherited entire) and not which typeface, but what the page *is*
shaped like.

## The directions

| | Baseline *(shipped)* | A — Marked Output | B — Running Log | C — Accession |
|---|---|---|---|---|
| **Axis** | — | Type contrast | Layout structure | Density |
| **Thesis** | Restraint reads as rigour | The page is machine output; the only human thing on it is the mark | A record is a sequence of dated entries, not a set of titled sections | Every claim should carry where it came from, at the point you read it |
| **The bet** | Minimal ink, heavy whitespace, one hairline system | The mark carries everything, so nothing else has to. One face, three sizes, hierarchy from case and colour | The form argues append-only before a word is read. Numbered gutter, struck-not-deleted | Verifiability at the point of reading. A provenance rail on every object |
| **The risk** | Indistinguishable from a portfolio site — ADR 0017 concedes it lacks a signature | Reads as a developer docs site | Reads as a blog, or as skeuomorphism | Too dense to enter; the rail becomes noise |
| **The gap shown as** | A red left bar, once | Red source text, in place | A status in the entry's gutter | `provenance unknown` in the rail |

## A — Marked Output

One typeface, three sizes, and all hierarchy from case, weight and colour. The
redline is the only visual event on the page, so the eye goes to the unrecorded
reason and the unanswered question before anything else. The matrix's middle column
is red where nothing answers the question today — the same signal the records use.

Look at: whether one face at three sizes can hold a page this long, and whether the
marks read as content or as highlighting.

→ [`a-marked-output.html`](./a-marked-output.html)

## B — Running Log

Not sections — five numbered, dated entries down a left gutter. Append-only is drawn
rather than described: entry 04 is a superseded direction, struck through and still
on the page. The matrix becomes one entry among others rather than a destination.

Look at: whether the gutter earns its width, and whether the serif reads as *record*
or as *blog*.

→ [`b-running-log.html`](./b-running-log.html)

## C — Accession

Every object on the page carries a provenance rail: source file, who wrote it, when
it was recorded, when it was decided. The specimen's rail ends in
`Rationale — provenance unknown`, which is the fidelity claim made structural instead
of asserted. The matrix gains a fourth column for tier status.

Look at: whether the rail is convincing or exhausting, and whether it works on
anything that isn't a record.

→ [`c-accession.html`](./c-accession.html)

## Merging

- **B's gutter with A's type.** The dated, numbered sequence is the strongest
  structural idea in the round, and it does not depend on B's serif. A's single-face
  discipline would make it far less blog-like.
- **C's provenance rail, scoped to specimens only.** The rail is convincing on a
  record and heavy on everything else. Applied just to the artifacts, it defends the
  *"records read as a gimmick"* failure better than any of the three do whole.
- **A's matrix, in any of them.** The three-column table is nearly identical across
  all three, which suggests that part is settled rather than undifferentiated.

## Constraints honoured

Every hard constraint in the language doc, checked per direction:

| Constraint | Status |
|---|---|
| Records shown verbatim, never restyled | **Honoured.** `##`, `**` and `*(…)*` render as literal source in all three. No badge, pill or icon stands in for a mark |
| A shown record carries its path | **Honoured.** The specimen names its file in all three |
| Nothing types itself | **Honoured.** Zero JS, zero animation, zero transitions |
| Redline keeps its meaning | **Honoured.** `--red` appears only on unrecorded reasons, unanswered questions and superseded entries. Never for emphasis |
| The palette is not re-derived | **Honoured.** All 11 tokens copied verbatim from `globals.css`, both modes |
| Readable with JS off | **Honoured.** No scripts at all |
| No claim the page cannot source | **Honoured**, with one caveat below |

**The caveat, stated rather than buried:** the constraint forbids CDN dependencies, so
these use **local system fonts only**. Type here indicates *register* — mono, serif,
sans — not the final faces. A direction cannot be rejected on the specific typeface
it happens to render in on your machine.

**Not tested:** none of this has been shown to anyone. `design/research/` is empty.
The risks in the table are reasoned, not observed.
