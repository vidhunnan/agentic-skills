# 0010. The hero shows one specimen; the rotation is retired

- **Status:** Superseded by [0017](./0017-ten-records-stepped-by-the-reader-and-advanced-by-a-timer.md)
- **Date:** 2026-08-19
- **Supersedes:** [0006](./0006-the-hero-specimen-rotates-through-six-skills.md)

## Context

[0006](./0006-the-hero-specimen-rotates-through-six-skills.md) rotated six specimens
through the hero card on a 6.5-second timer, stoppable five ways. It cost a deliberate
amendment to [`../specs/motion.md`](../specs/motion.md), turning *"nothing moves that
the reader did not cause"* into a rule with two exceptions, and it wrote a three-part
bar into the spec so the exception could not be reused casually.

Two things then changed underneath it.

**The duplication was named.** The revamp brief found that *"Hero specimens 1, 6 and 3
**are** Proof receipts 1, 2 and 3 — the same artifacts described twice in different
words."* The rotation was the mechanism that put six artifacts above the fold; the
Proof section below described the same ones again.

**The direction changed.** [0007](./0007-the-site-is-terminal-rendered-markdown.md)
was won by two artifacts that contained no JavaScript at all — round 2's commit
records *"no JS at all, so it reads with JS off and nothing types itself"* — and the
language doc had already turned that into a hard constraint: *"Nothing types itself.
No replay, no typewriter, no simulated terminal session."*

**None of 0006's own three revisit conditions fired.** The pause control was never
measured against the dots, no seventh specimen was wanted, and nobody cited it to
justify a second exception. It is worth recording that a decision can be retired
without any of the conditions it set for itself coming true.

## Options considered

| Option | The bet | Why it lost |
|---|---|---|
| Keep the rotation, restyled into the new direction | 0006's argument is untouched by a change of typeface: six records still cannot fit above the fold any other way, and the three-part bar it wrote is still cleared | **`*(reason not stated)*`** as a deliberation. On the record: the rebuild removed every other piece of client JS from the page's chrome, and the artifact the direction was approved as contained none |
| Six specimens as a static gallery below the fold | The breadth without the motion — the option 0006 itself considered and rejected on reach | **`*(reason not stated)*`.** What shipped instead moved breadth to the catalogue: fourteen skills, three shown in full and eleven as a one-line index |
| **One specimen, static — chosen** | Breadth belongs to the catalogue; the hero's job is to show **one** record properly, and `SPECIMENS[0]` — the ADR that says it doesn't know — is the one that proves the differentiating behaviour | — |

## Decision

The hero renders `SPECIMENS[0]` and nothing else. `Specimens.tsx` (222 lines) and its
stylesheet (203 lines) are deleted, and with them the dwell timer, the dots, the pause
control, the stacked CSS grid and the `data-ready` guard that kept six cards from
printing on top of one another without JS. The card carries its real path and links to
the file, as the language doc requires.

The exception 0006 bought in `motion.md` is **returned**: the site is back to one
motion exception, the scroll reveal, and `globals.css` now states it in the file —
*"One exception, and only one: the reveal, once per element."*

## What we gave up

- **Five records, off the page.** The reject ledger, the brief with a blank
  constraint, the handoff that found a hole in its own protocol — 0006 put those in
  front of the reader and this takes them back off. Its argument still stands
  unanswered: material below the fold is read by the same nobody, and now there is not
  even a gallery down there.
- **The same unmeasurable trade, decided twice in opposite directions.** 0006 named it
  — one record read six times may land harder than six records read once — and called
  it *"not measurable from here."* It is still not measured, and it has now been
  settled both ways without evidence either time.
- **The one thing on the page that could show range without a click.** Range is now a
  list of fourteen names, which is a different claim: the catalogue says the skills
  exist, the specimens showed what they produce.
- **The answers to 0006's own questions.** Whether the pause control beat the dots,
  and whether 6.5 seconds was right, are now permanently unknown. Both were listed as
  open questions in `motion.md` and both die with the feature.

## What would make us revisit

- **A cold reader takes the single specimen as the only artifact the library has
  produced.** With one card and no gallery, nothing else on the page is a record — the
  catalogue is names, the matrix is tiers. This is testable by the brief's
  comprehension test, which is still unrun.
- **The specimen's source is superseded or rewritten.** The rule in `skills.ts` — quote
  exactly, re-quote or drop — bites harder with one card than with six, because there
  is no second specimen to carry the section while the first is replaced.
- **A second motion exception is ever wanted.** This decision is the reason the bar in
  `motion.md` is unspent. Anything asking for it should be weighed against a rule that
  is absolute again, not against a rule with a precedent already in it.

## Evidence

- **Primary:** `website/components/Hero.tsx` (`git:fcea6dd`, 2026-08-19), the comment
  that names this ADR:
  > *"SPECIMENS[0] is load-bearing: it is the ADR that says it doesn't know, and it is
  > what a JS-off reader sees. The rotation was retired (design ADR 0010), so breadth
  > moved to the catalogue and this shows one record properly."*
- **Corroborating:** `git:fcea6dd` commit message — *"Proof collapses into a single
  hero specimen carrying its real path"*, and the duplication it fixes ·
  [`../briefs/website-revamp.md`](../briefs/website-revamp.md) §Three things duplicated
  or untrue · [`../system/language-website.md`](../system/language-website.md) §Hard
  constraints — *"Nothing types itself"* · `git:5e1d1ca` — round 2 shipped with no JS ·
  [0006](./0006-the-hero-specimen-rotates-through-six-skills.md), whose motion
  exception this returns · [`../specs/motion.md`](../specs/motion.md), re-pinned by
  this decision.
- **Rationale:** stated in the code comment, quoted above — breadth moved to the
  catalogue so the hero could show one record properly. The comparison against 0006's
  own alternatives is **`*(not recorded)*`**: no source shows the static gallery or the
  restyled rotation being weighed before deletion.

## Follow-up

*Append-only. Everything above is **frozen**. Entries below are dated and additive.*

- **2026-08-20** — **Superseded by [0017](./0017-ten-records-stepped-by-the-reader-and-advanced-by-a-timer.md).**
  The hero shows ten records, stepped by the reader, and — as of `git:5952626` — advanced
  by a timer again.

  Read 0017 before assuming this record was simply reversed. It is explicit that it does
  **not** clear the three-part bar design ADR 0006 was held to: the leg about records not
  fitting on the page any other way stopped being true the moment arrows reached all ten.
  The timer is justified on discovery instead, which is a weaker claim, and 0017 says so.

  One thing this record got right and the replacement inherited: specimen [0] is still
  what a JS-off reader sees.

- **2026-08-19** — **On the "six specimens as a static gallery" alternative.** Asked whether
  it was ever considered, the owner did not recognise the option: *"six specimens as a
  gallery — I don't know what that is."*

  So it was not a fork that was weighed and rejected. On the evidence it was constructed when
  this record was written, which is exactly what the `*(not recorded)*` marker in §Evidence
  was flagging. The row stays in the table above — that text is frozen — but a reader should
  treat it as an option that existed on paper only, and should not cite it as proof the
  gallery was tried.

  Worth naming as a pattern rather than a one-off: an alternatives table is the easiest place
  in an ADR for a plausible-but-unreal option to appear, because a decision reads better with
  a loser in it.

---

_**Exactly two things in this file may ever change:** the `**Status:**` line and
additions under `## Follow-up`. If this turns out to be wrong, do not edit it —
supersede it with a new decision that links back._
