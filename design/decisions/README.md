# Design decisions — Why did we choose this?

**Question:** Why did we choose this?
**Tense:** past
**Status:** truth — past tense, append-only
**Written by:** human
**Lifecycle:** **Append-only.** Never edit a logged decision — supersede it with a new one that links back, or append under `## Follow-up`. The only edit ever permitted is the `**Status:**` line.

The answer to *"why is it like this?"* six months later, when everyone who knew has forgotten.

**This tier is separate from [`../../docs/decisions/`](../../docs/decisions/README.md) on purpose.** Architectural and design decisions have different audiences, different evidence, and different readers. An engineer scanning for why the build is configured a certain way should not have to page through rejected nav layouts, and vice versa. See [ADR 0020](../../docs/decisions/0020-design-gets-its-own-stack-not-a-shoehorn-into-docs.md).

## Why this is harder than the architectural log

`decisions-logger` can mine a codebase, because code leaves evidence: commits, diffs, PR threads, a config file that changed on a date. **Design leaves none of it.** A Figma file shows the winner and nothing else.

Which makes the fabrication risk worse here than anywhere else in this repo. In code, an invented rationale can eventually be checked against a diff. **A plausible reason for a layout choice is indistinguishable from a real one to every future reader, forever.** There is nothing to check it against.

So `*(reason not stated)*` is a **first-class outcome**, not a failure. *"We did this, nobody wrote down why"* is exactly what a reader needs to know before they change it.

## What goes here

- One numbered ADR per fork: `NNNN-slug.md`. `0000` is reserved for the reject ledger.
- A named alternative a reasonable person would have chosen — **no loser, no decision.**
- **What we gave up.** Design choices are trades; the traded-away half is the first thing anyone asks about later and the first thing that decays into "that's just how it is."
- **What would make us revisit.** A condition, not a platitude.

## What does NOT go here

- Architectural or process decisions — that's `../../docs/decisions/`.
- A fork still in play — that's the brief's Open questions.
- What was tried — that's the explorations tier.
- An invented rationale. Ever.

## Template

Copy `_TEMPLATE.md`. Run `/design-decisions` to log one.
