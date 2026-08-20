# 0013. Shadows are removed; contained regions rest on a border and one tonal step

- **Status:** **Accepted**
- **Date:** 2026-08-19

> **A same-day reversal.** The treatment this removes was added by round 3
> (`git:467dc5b`, 18:52) and removed by round 4 (`git:218c91d`, 19:09) — seventeen
> minutes apart by commit timestamp; the round 4 message describes the call it
> reverses as *"made the same day, four hours earlier"*. Round 3 was never logged as
> an ADR, so this record has to carry both halves: what was argued for, and what
> undid it.

## Context

Round 3's brief was craft — *"there is no nav, footer, or modren layout styles"* — and
part of its answer was depth. It gave contained regions a 5px radius, a two-value
shadow pair and a dark-mode inset highlight, and argued the surface treatment
explicitly:

> *"Surface. Contained regions get 5px corners, a shadow pair and stronger internal
> dividers; the page itself stays flat. Both shadow values are alpha of `--ink`, which
> is what `--rule` already is, so no colour enters the palette. Dark mode carries
> depth with a 1px top highlight instead — a shadow does nothing on `#14140f`."*

Three tokens shipped with it — `--shadow`, `--shadow-lift`, `--inset` — applied across
eight `box-shadow` declarations. `--shadow-lift` had exactly one consumer, the hero
specimen card.

**The palette argument that justified the shadows was already false in half the
product**, though this was not established until later. `changelog/commits/042` §
Corrections checked the claim against the diff:

> *"In `:root`, `--shadow` and `--shadow-lift` are built from `rgba(22, 22, 15, …)`,
> which is `#16160f`, which is `--ink`. The claim holds there. In the
> `prefers-color-scheme: dark` block they are `rgba(0, 0, 0, 0.85)` and
> `rgba(0, 0, 0, 0.95)` — **pure black, not alpha of anything in the palette**, while
> dark `--ink` is `#edece4`."*

and, on the "instead":

> *"Dark mode gets the highlight **and** its own redefined, heavier shadow pair. The
> 'instead' implies the shadows are dropped in dark mode; the diff shows all three
> tokens redefined there."*

**This correction is not the reason the shadows were removed.** It is not cited in
`git:218c91d`, and the reason given there points the other way — at light mode. It is
recorded here because it is the only independent check anyone ran on the treatment,
and because a reader deciding whether to bring depth back should know that the
argument which first admitted it did not survive contact with the diff.

## Options considered

| Option | The bet | Why it lost |
|---|---|---|
| Keep round 3's shadow pair *(incumbent, four hours old)* | Depth is what separates a contained region from the page; without it, panels read as flat blocks and the composition has no near-and-far | Stated at the time: *"the border and the `--paper`/`--paper-2` step were already doing the work, and least of all in light mode."* Depth was not adding a distinction the page did not already have |
| Keep depth in dark mode only — the inset highlight where it works, no shadow on paper | The removal reason is itself mode-specific. On `#14140f` a shadow does nothing and the 1px highlight is the treatment tuned for it; the failure the feedback named was a light-mode one | **`*(reason not stated)*`** — no deliberation is recorded. Recorded instead: a mode-forked surface is what round 3 already shipped, and the standing instruction the removal wrote forbids a shadow **in either mode** rather than in one |
| Strengthen borders to `--rule` now, as compensation | If the shadow was carrying containment, removing it without replacing it loses containment | **`*(reason not stated)*`.** Recorded instead: it was written down as the **future** remedy, not applied — *"If a region stops reading as contained, strengthen its border to `--rule`"* — so the page shipped on the existing border and was left to fail first |
| **No shadows anywhere — chosen** | The border and the one `--paper` → `--paper-2` step are sufficient to say "contained", and a page whose register is a terminal has no business simulating light | — |

## Decision

Eight `box-shadow` declarations and all three tokens — `--shadow`, `--shadow-lift`,
`--inset` — were deleted, from both `:root` and the `prefers-color-scheme: dark`
block. Containment is now carried by a border plus the single tonal step between
`--paper` and `--paper-2`; `--radius: 5px` is the only surface token left. No palette
value changed.

The reversal and the standing rule are written into `globals.css` where the tokens
used to be, so the next person to reach for depth reads the decision before they reach:

> *"surface — a corner radius and nothing else. Round 3 added a shadow pair and a
> dark-mode inset highlight; they were removed the same day. Depth was doing no work
> that the border and the `--paper`/`--paper-2` step were not already doing, and least
> of all in light mode.*
>
> *If a region stops reading as contained, strengthen its border to `--rule`. **Do not
> reintroduce a shadow.**"*

## What we gave up

- **Every depth cue on the page.** Containment now rests on two signals — a hairline
  and one tonal step — and both are quiet by design. Where a region sits on
  `--paper-2` and the band behind it does too, the border is the only thing left.
- **The dark-mode inset highlight, which was never the thing complained about.** The
  reason given is explicitly a light-mode one (*"least of all in light mode"*), and
  `--inset` — `rgba(237, 236, 228, 0.09)`, the one value in the set that genuinely was
  alpha of its mode's `--ink` — was removed with the rest. Dark mode paid for a
  light-mode judgement.
- **Emphasis without spending containment.** `--shadow-lift` let one region sit above
  its neighbours; the hero specimen card used it. Raising an element now means a
  heavier border or a different tone, and both of those are already the containment
  vocabulary, so lifting something means weakening the signal that says it is a
  region at all.
- **Any evidence about whether it worked.** The treatment existed for one afternoon
  and never faced a reader. Nobody can now say whether round 3's depth was solving a
  real legibility problem, because the only thing on record is that it was added and
  removed the same day.
- **A vocabulary for stacking.** Nothing on the page currently floats over content
  except the sticky nav. A future overlay — a dialog, a panel over text — cannot say
  "above" with a tonal step, and this decision leaves no token for it.

## What would make us revisit

- **A region stops reading as contained.** The remedy is already specified and it is
  not a shadow: raise its border to `--rule` first. Only a region that a full `--rule`
  border still fails to contain is grounds to reopen this.
- **`--paper` and `--paper-2` converge.** The tonal step is half the containment. Any
  palette change that narrows it — which `language-website.md` already constrains
  (*"any new value is computed against both grounds, never picked by eye"*) — takes
  this decision's second signal with it.
- **Something has to float above content.** A modal, a dropdown, a panel that overlaps
  running text. Stacking is the one thing a border and a tone cannot express, and it
  is the case this decision was not made against.
- **Contrast fails at the ends.** If a reader on a dim or washed-out display reports
  that panels disappear into the page, the hairline-plus-one-step scheme is being
  asked to work below the contrast it was designed at.

## Evidence

- **Primary:** `git:218c91d` (2026-08-19), the commit message:
  > *"Shadows out, everywhere. Eight box-shadow declarations and three tokens gone;
  > the border and the --paper/--paper-2 step were already doing the work, and least
  > of all in light mode. This reverses a call made the same day, four hours earlier —
  > the comment in globals.css says so, and says to strengthen a border rather than
  > bring a shadow back."*
- **The half it reverses:** `git:467dc5b` (2026-08-19) §Surface, quoted in full above ·
  `git:467dc5b:website/app/globals.css` lines 62–64 and 83–85 (the three tokens in both
  modes) and `Hero.module.css:83` (`--shadow-lift`'s only consumer).
- **Corroborating:** `website/app/globals.css`, the `surface` comment above `--radius`,
  which carries both the reversal and the standing instruction ·
  [`changelog/commits/042-round-3-chrome-scale-composition-and-no-more-typed-counts.md`](../../changelog/commits/042-round-3-chrome-scale-composition-and-no-more-typed-counts.md)
  §Corrections 1 and 2, and its forward note that the tokens *"are introduced by this
  commit and removed again in round 4"* ·
  [`../system/language-website.md`](../system/language-website.md) §Hard constraints,
  *"The palette is not re-derived"*.
- **Rationale:** **stated at the time** — the reason is written in the commit message
  and in the stylesheet comment, and the two agree. The feedback that prompted it was
  verbal: the owner's position was that the shadows made little sense in light mode,
  which is the judgement both written sources record as *"least of all in light
  mode"*. **No verbatim record of the spoken feedback exists** — round 4 has no
  exploration-log round, and the changelog is generated from git, so any entry for the
  commit restates the same message — so the wording above is the closest the record
  gets, and nothing further should be attributed to it.

## Follow-up

*Append-only. Everything above is **frozen**. Entries below are dated and additive.*

*(none yet)*

---

_**Exactly two things in this file may ever change:** the `**Status:**` line and
additions under `## Follow-up`. If this turns out to be wrong, do not edit it —
supersede it with a new decision that links back._
