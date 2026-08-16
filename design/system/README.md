# System — What's reusable?

**Question:** What's reusable?
**Tense:** imperative
**Status:** truth — the system of record
**Written by:** human
**Lifecycle:** The system of record. **Changes to it are decisions** — log them in `../decisions/` rather than quietly editing a value here.

The tokens, components and rules that recur — documented so they can be applied without re-deriving them, and without a designer in the room.

## What goes here

- Tokens: colour, type scale, spacing, radii, elevation, motion. Name, value, and **what the role is** — a token nobody knows when to use is a hex code with extra steps.
- Components: anatomy, variants, states, accessibility requirements.
- Voice and terminology rules, where they're checkable.
- **When to use it — and when *not* to.** This is the section nearly every real design system omits, and it's the one an agent most needs: without it, every component looks equally applicable to every problem.
- A link to the decision that produced it, wherever one exists.

## What does NOT go here

- One-off layouts — those are `../specs/`.
- Directions still being explored — the explorations tier.
- The reasoning behind a choice. Put the *rule* here and the *why* in `../decisions/`, then link. A system doc that argues with itself is a system doc nobody trusts.

## A warning this repo earned

A system doc that states a rule with **no reasoning** reads exactly like a decision and contains none. It is the highest-risk input in this whole stack: a model reading *"cards use a 1px border, never a shadow"* will happily produce a confident, entirely fabricated Context paragraph for it.

So: rules live here, reasons live in `../decisions/`, and a rule with no logged decision behind it is an honest gap — **not** an invitation to invent one.

## Template

Copy `_TEMPLATE.md`.
