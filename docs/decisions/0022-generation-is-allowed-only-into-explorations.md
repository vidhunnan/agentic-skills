# 0022. Generation is allowed, but only into the explorations tier

- **Status:** **Accepted**
- **Date:** 2026-08-19

## Context

[0021](./0021-design-skills-never-make-the-design-decision.md) restricted every skill in the
design territory to four verbs — **interview, record, structure, check** — and forbade any of
them from making a design decision, generating a visual, or proposing a direction. It closed by
setting that boundary for "the seventeen unbuilt design skills."

Three skills were then built outside this library, in a consuming repo, against a real project:
`design-language`, `design-explore`, `design-critique`. Two of them fit 0021 without strain —
`design-language` interviews, `design-critique` checks. **`design-explore` does not.** It
generates three design directions as artifacts you can open and look at, each committed to a
named structural axis, ending in a comparison matrix. That is generating a visual and proposing
a direction, twice over. Its own PRD said so in writing and said adoption would require
returning to this decision.

What forced the question was that 0021 was written before any generative skill existed to test
it against. The rule was correct about the harm it named. It had never been asked whether that
harm applies uniformly across all seven tiers, because at the time every design skill wrote into
a tier that claims to be true.

## Decision

We narrowed 0021 rather than reversing it. **Generation is permitted into `design/explorations/`
and nowhere else**, and only under three conditions, all of which must hold:

1. **A written visual intent must exist first.** A generating skill refuses to run against
   nothing — `design-language` is the gate.
2. **The artifacts are candidates, never the record.** They are material to look at and reject,
   not a claim about what is true.
3. **The verdict belongs to another skill.** `exploration-log` records what was kept or killed;
   `design-decisions` records why. A generating skill never writes the outcome of its own
   output.

The record tiers — `design/briefs/`, `design/research/`, `design/decisions/`, `design/system/` —
remain under 0021 unchanged. Nothing may generate a problem statement, an observation, a
rationale, or a system rule.

## Alternatives considered

- **Leave 0021 intact and refuse `design-explore` entry to the library.** The cleanest option,
  and the one that costs nothing to maintain. It lost because the gap it preserves is real: the
  stack goes from "write a brief" straight to "log the decision that was made" with nothing in
  between, and the concept doc's own roadmap already reserved two slots (`design-brainstorm`,
  `design-directions`) for exactly the step being refused. Holding the line would have meant the
  design stack could describe every part of the work except the part where options come into
  existence.
- **Ship `design-explore` and treat 0021 as not applying, without logging anything.** Tempting
  because the argument is defensible — explorations are explicitly not the record. It lost
  because it leaves the decision log contradicting a shipped skill, with no explanation for the
  next reader. That is the precise failure `decisions-logger` exists to prevent, committed by
  the repo that argues against it.
- **Supersede 0021 entirely and replace it with a narrower rule.** It lost because 0021 is not
  wrong. Everything it says about the record tiers still holds, and its reasoning about why a
  prose caveat cannot survive is the reasoning this decision leans on. Superseding it would
  discard an argument we are still using.

## Consequences

- The design stack can now cover divergence, which was the largest hole in it. `design-explore`
  ships, and the two roadmapped slots it absorbs come off the backlog.
- **What this costs:** 0021 was a single sentence anyone could hold in their head — "design
  skills never generate." It is now a rule with an exception and three conditions, which is
  harder to apply and easier to erode. The next skill that wants to generate will cite this ADR
  as precedent, and whoever reviews it has to check three conditions instead of saying no.
- **The three conditions are load-bearing, not decoration.** Drop the intent gate and the skill
  produces the median of everything it has seen. Drop the candidate framing and generated
  artifacts start being cited as the record. Drop the verdict hand-off and one skill both makes
  and judges its own output. Any of those three failing puts 0021's original objection back in
  force, and the correct response is to fix the skill, not to widen this exception.
- The distinction now rests on the tier a skill writes into rather than on the verb it uses.
  That is a sharper line than "generate vs. record" and it is checkable — but it means
  `design-setup`'s tier mapping is load-bearing for a rule it was not designed to carry.

## Evidence

- **Primary:** `docs/concepts/design-context-stack.md` §The seven tiers — the tier status table
  that makes the distinction this decision rests on.
  > `design/explorations/` · past · **history — includes everything killed**

  Contrast the four record tiers in the same table: *proposal*, *evidence*, *truth — append-only*,
  and *truth — the system of record*.
- **Corroborating:** [0021](./0021-design-skills-never-make-the-design-decision.md) §Consequences,
  which set the boundary this narrows · `docs/concepts/design-context-stack.md` §The twenty
  skills, which already roadmapped `design-brainstorm` and `design-directions` as generative
  steps · [0010](./0010-a-declared-path-beats-an-existing-folder-beats-canon.md), which the tier
  resolution these conditions depend on inherits.
- **Rationale:** supplied by the owner on 2026-08-19 while porting the three skills into this
  library (not written down at the time the three skills were built).

## Follow-up

*Append-only. Everything above this heading is **frozen**. Entries below are dated and
additive — evidence that the world moved, not a revision of what was decided.*

*(none yet)*

---

_Append-only. If this turns out to be wrong, **do not edit it** — write a new decision that
supersedes it and links back. Being wrong on the record is more useful to the next reader
than a clean file._

_**Exactly two things in this file may ever change:** the `**Status:**` line (to point at a
superseding decision) and additions under `## Follow-up`. The Status line is a convenience —
the authoritative forward link is the dated Follow-up entry. Everything else is frozen._
