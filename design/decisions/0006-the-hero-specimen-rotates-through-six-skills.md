# 0006. The hero specimen rotates through six skills, on a timer

- **Status:** Accepted
- **Date:** 2026-08-16
- **Supersedes:** —

## Context

The hero carried one specimen: a verbatim fragment of
[ADR 0002](./0002-a-three-family-type-system-for-the-site.md), the decision whose
rationale reads `*(reason not stated)*`. It is the strongest thing on the page,
because it proves the library's one differentiating behaviour — these skills
decline to invent — by showing a real file instead of describing one.

It also represented one skill out of eleven. The other ten had written artifacts
just as good, all committed in this repo and all unread: the reject ledger, the
brief with a blank constraint, the handoff that found a hole in its own protocol,
the commit entry recording a deliberate fabrication test, the exploration rounds
that were killed and kept anyway. None of it was on the page above the fold.

The constraint was that [`../specs/motion.md`](../specs/motion.md) said, flatly:
*"No motion on layout. Nothing moves that the reader did not cause, except the
reveal below."* Any rotation contradicts that sentence. The spec was four
behaviours and one easing curve, and its restraint is part of the
[Swiss whitepaper direction](../../docs/decisions/0017-the-website-design-direction-is-swiss-whitepaper.md).

## Options considered

| Option | The bet | Why it lost |
|---|---|---|
| Leave it static, add a specimen gallery lower down | The hero's single card is load-bearing and undivided; range belongs in its own section, below the fold | It lost to reach. The Proof section already lists these artifacts as prose and nobody scrolls to it cold; a second section further down would be read by the same nobody. The material's whole problem was that it was below the fold. |
| Rotate, but only when the reader asks — dots and arrows, no timer | Honours the motion spec exactly as written, needs no amendment and no ADR | It lost because a control the reader has no reason to press is not a control. Nothing on a static card suggests there are five more behind it, so the default experience stays one specimen and the other five ship as dead affordances. |
| Type the card out, as if the skill were writing it now | Most on-theme with the `WRITTEN BY` tag; dramatises the claim | It lost on honesty and on cost. The skills do not write at 28ms per character, and a page arguing against plausible-looking fiction should not open with a dramatisation. Also the heaviest motion on the site by a wide margin. |
| **Rotate on a timer, stoppable — chosen** | Six records get seen; the motion is the content moving, not decoration; the spec gets amended in the open rather than quietly broken | — |

## Decision

The hero card cycles through six specimens, one per skill, holding each for 6.5
seconds. It stops when the pointer or focus is inside it, when the tab is
backgrounded, when the hero scrolls out of view, when the reader picks a specimen,
and when they press pause. Under `prefers-reduced-motion: reduce` it does not
rotate at all. Specimen 0 — the ADR that says it doesn't know — is what ships in
the static HTML and what a JS-off or reduced-motion visitor sees.

`motion.md` was amended in the same change rather than left contradicting the
site. Its "nothing moves that the reader did not cause" now names two exceptions
and states the bar this one cleared: the moving thing *is* the content, six
records could not fit any other way, and it can be stopped.

## What we gave up

- **The spec's absolutism, which was its whole value.** "Nothing moves that the
  reader did not cause" is enforceable by anyone reading it. "Nothing moves except
  where it is justified" is a conversation, and the next person wanting an
  animation now has a precedent to point at rather than a rule to argue with. The
  bar written into `motion.md` is an attempt to hold this, and a written bar is
  weaker than a written prohibition.
- **The undivided single specimen.** One record, read six times by six visitors,
  may land harder than six records each read once. The old card had the reader's
  full attention and one thing to say with it. This is a real trade and it is not
  measurable from here.
- **Roughly 2KB of JavaScript and a client boundary in the hero**, on a page that
  made a point of needing almost none, and immediately after
  [0005](./0005-the-palette-searches-skills-and-copies-one-thing.md) cut the
  palette back partly on that same grounds.
- **A permanently taller hero.** The card is now sized to the tallest of six
  specimens, so five of them carry slack the single card never had, and the
  install command sits that much further down.

## What would make us revisit

- **If the pause control gets used more than the dots.** That would mean the
  rotation is being escaped rather than followed, and the reader-driven option
  above was right.
- **If a seventh specimen is wanted.** Six at 6.5s is a 39-second cycle; seven is
  past the point where anyone sees the last one, and the answer at that point is a
  gallery section, not a shorter dwell.
- **If this ADR gets cited to justify a second exception.** The amendment to
  `motion.md` is a bar, not a door. A decorative loop clears none of its three
  conditions, and if one ships anyway the rule failed and should go back to being
  absolute.

## Evidence

- **Primary:** this conversation, 2026-08-16. The maintainer chose autoplay with
  hover/focus pause over the reader-driven option, having been shown that it
  contradicts the motion spec:
  > requires: motion.md amendment + design ADR
- **Corroborating:** [`../specs/motion.md`](../specs/motion.md) §Layout, the
  sentence this decision made false · `website/components/Specimens.tsx` ·
  [ADR 0005](./0005-the-palette-searches-skills-and-copies-one-thing.md), which
  cut JS from this page on grounds this decision spends some back ·
  `git:1e30551` — shipping evidence.
- **Rationale:** stated at the time.

## Follow-up

*Append-only. Everything above is **frozen**. Entries below are dated and additive.*

*(none yet)*

---

_**Exactly two things in this file may ever change:** the `**Status:**` line and
additions under `## Follow-up`. If this turns out to be wrong, do not edit it —
supersede it with a new decision that links back._
