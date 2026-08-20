# 0007. The site's visual direction is terminal-rendered markdown

- **Status:** **Accepted**
- **Date:** 2026-08-19

> **Supersedes a decision in the other tier.** The direction this replaces is
> [repo ADR 0017](../../docs/decisions/0017-the-website-design-direction-is-swiss-whitepaper.md),
> which predates the design stack and therefore lives in `docs/decisions/`. It is
> cross-referenced rather than listed under `**Supersedes:**`, because that field
> points inside this tier. 0017 carries a dated Follow-up entry pointing here.

## Context

The site shipped in the "Swiss whitepaper" direction on 2026-07-19 — light paper,
ink and greys carrying the page, cobalt and redline as accents, one hairline system,
heavy whitespace. Repo ADR 0017 chose it to express *"a clean product spec"* and
recorded a cost in the same breath: it *"carries less of a distinctive 'signature'
than the Blueprint direction's schematic would have."*

Two things changed. The **argument the page makes** changed — the library outgrew the
memory thesis, and the revamp brief re-states the problem as *the record was never
written, and asking an agent to write it produces fiction*. And 0017 **had no revisit
condition**, so there was no stated bar to clear before reopening it.

A pressure test on 2026-08-19 found that no evidence existed that the shipped
direction was failing: the site was three days old in its current form,
`design/research/` was empty, and Vercel Web Analytics returned `404 — not found`.
So the direction was **not** reopened on the grounds that it was failing. It was
reopened because the content it exists to express is different, and because the
brief's brand constraint naming the Swiss-minimal look was lifted deliberately when
`positioning.md` was closed.

The direction was then chosen by exploration rather than in conversation — the
correction a pressure test forced, after "mono is the primary face" was nearly written
into the language doc as a constraint, which would have made two of three explored
directions strawmen.

## Options considered

| Option | The bet | Why it lost |
|---|---|---|
| Swiss whitepaper *(incumbent, repo ADR 0017)* | Restraint reads as rigour | Its own ADR concedes it lacks a signature; and it was named as an **anti-reference** in the language doc — one of the two directions the page would drift into without effort |
| The Field Report deck, ported faithfully | Consistency with the talk's identity — masthead bands, folio numbers, FIG. plates, TRUTH/HYPOTHESIS stamps | Also named an anti-reference. 0017 had already declined a faithful port; this made the divergence deliberate rather than incidental |
| **B — Running Log** *(layout structure)* | A record is a sequence of dated entries, not titled sections; append-only drawn rather than described | Lost on register. **Its axis was never genuinely tested** — the round 1 comps carried a fifth of the content, and layout structure is a property of a long page |
| **C — Accession** *(density)* | Every claim carries its provenance at the point you read it | Same: lost on register, axis untested for the same reason |
| **A — Marked Output → terminal-rendered markdown — chosen** | The page and the artifact are the same material | — |

## Decision

We chose **terminal-rendered markdown**: monospace throughout, box-drawing characters
for rules and tables, **markdown syntax present but recessive** rather than hidden,
colour used only as signal, and hierarchy from case, weight and colour rather than
from size. The palette is inherited entire from the existing system, both modes,
unchanged.

The reason, in the owner's words on 2026-08-19 and deliberately not paraphrased:

> *"this direction feels more skill styles and markdown styles and which represent all
> the context or how all files stores also"*

The direction is earned by two things already on record rather than by taste alone.
The library ships `.md` files — the skills, the records, `CLAUDE.md`, the README are
all markdown, so a page that reads like the files is the same material as its own
subject. And the language doc's brand posture is **adjacent to Claude Code**;
terminal-rendered markdown is literally what Claude Code shows.

It also satisfies the hard constraint *"records are shown verbatim, never restyled"*
in the strongest available way: showing `##` and `*(reason not stated)*` as recessive
source **is** verbatim, where rendering them into styled components would not be.

## What we gave up

- **The paper metaphor, finally.** Design ADR 0003 already recorded it as *"weaker"*
  when dark mode landed — half the time the page was no longer paper. A monospace
  terminal register retires it altogether. The palette survives; the idea it was
  derived from does not.
- **Typographic range.** Hierarchy now comes from case, weight and colour on one
  face. Anything that needed a display size to work no longer has one, and long-form
  prose is harder to read in monospace than in the sans it replaces. This is the
  direction's central bet and its central cost.
- **Two structural ideas that were never properly tested.** B's dated, numbered
  gutter and C's provenance rail both lost on register at a fifth of the content.
  They are recorded as merge candidates rather than as failures, but the fork closed
  before either got a fair test.
- **Distance from the developer-docs template.** Monospace, hairlines and restraint is
  the road to every tool's documentation site. The annotation layer is the only thing
  holding the page somewhere else, which makes it load-bearing rather than decorative.
  This risk was explicitly **declined** as a failure condition, so nothing in the
  brief will catch it — it is carried below instead.

## What would make us revisit

- **One of the losing directions is built at full content and works better.** B and C
  were killed on a variable they were not built to be judged on; a later round that
  gives either its stated axis a fair test would be grounds to reopen this.
- **A cold reader can't say what the library is for.** The revamp brief's success
  criterion, and the only test for its second failure condition. Untested as of this
  decision.
- **Someone outside calls it a developer docs site.** Declined as a failure condition,
  restored here as a trigger so the risk is still caught by something.
- **Monospace body text proves unreadable at real reading lengths.** If long-form
  prose does not hold, the companion face has to take running text and the type
  strategy changes underneath this decision.

## Evidence

- **Primary:** [`docs/concepts/website/website-revamp.md`](../../docs/concepts/website/website-revamp.md)
  round 1, and the artifacts it links — `git:3333f33`.
  > *"this direction feels more skill styles and markdown styles and which represent
  > all the context or how all files stores also"*
- **Corroborating:** [`design/system/language-website.md`](../system/language-website.md)
  — brand posture *adjacent to Claude Code*, and both anti-references ·
  [`design/briefs/website-revamp.md`](../briefs/website-revamp.md) §Constraints ·
  [repo ADR 0017](../../docs/decisions/0017-the-website-design-direction-is-swiss-whitepaper.md)
  §Consequences, which concedes the signature cost.
- **Rationale:** stated by the owner on 2026-08-19, at the fork, and quoted verbatim
  above rather than reconstructed.

## Follow-up

*Append-only. Everything above is **frozen**. Entries below are dated and additive.*

- **2026-08-19** — **[0012](./0012-markdown-markers-leave-the-chrome.md) narrows one clause
  of the Decision above, and does not replace it.** The direction stands entire: monospace,
  colour as signal, hierarchy from case and weight, the palette inherited. What changed is
  scope — markdown markers now appear only inside quoted records, not in the page's own
  headings.

  The argument turns on this record's own words. The verbatim justification here cites `##`
  and `*(reason not stated)*`, and **both of those are lines in the hero specimen** — a
  quoted record, not chrome. 0012 reads that as the constraint having always been scoped to
  records. Whether that was the intent when this was written is *(not recorded)*.

  This record is **not** superseded and its status is unchanged.

---

_**Exactly two things in this file may ever change:** the `**Status:**` line and
additions under `## Follow-up`. If this turns out to be wrong, do not edit it —
supersede it with a new decision that links back._
