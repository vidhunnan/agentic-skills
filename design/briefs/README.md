# Briefs — What problem are we solving?

**Question:** What problem are we solving?
**Tense:** imperative
**Status:** proposal — the design PRD
**Written by:** human (an agent may draft)
**Lifecycle:** draft → active → closed when the work ships or is abandoned. A closed brief is still the intent the work was judged against — it is not deleted.

The document design work usually starts without. It states what the work is for, who it is for, and what would count as having worked.

This tier is **load-bearing for the rest of the design stack**. `design-critique` reviews *against* a brief; `design-decisions` cites it for the constraints a fork was weighed under; a case study opens with it. Without one, feedback has nothing to be measured against and collapses into taste — where the loudest preference wins.

## What goes here

- One file per piece of design work: `design/briefs/<slug>.md`.
- The problem, stated observably. Who feels it, and when. Jobs to be done.
- Constraints that would actually kill a direction — technical, brand, time.
- What success looks like, and **non-goals and anti-goals**.

## What does NOT go here

- Solutions, directions, layouts — those are `../explorations/`.
- Evidence for a claim — that's `../research/`. A brief may *state* a belief; the study that supports it lives next door.
- The reasoning behind a settled choice — that's `../decisions/`.
- Anything you're guessing at. **A section marked `*(not stated)*` is worth more than a plausible invention**, because later work gets judged against whatever this document says.

## Template

Copy `_TEMPLATE.md`. Run `/design-brief` to be interviewed into one.
