# 0003. The site follows the system colour scheme, with a re-lit palette rather than an inversion

- **Status:** **Accepted**
- **Date:** 2026-08-16
- **Supersedes:** —

## Context

The site had no `prefers-color-scheme` handling at all: one light palette,
served to everyone. [ADR 0017](../../docs/decisions/0017-the-website-design-direction-is-swiss-whitepaper.md)
established the "Swiss whitepaper" direction — *"a light paper background with ink
and greys carrying the page"* — and a paper metaphor has an obvious tension with a
dark ground.

The prompt was a website upgrade in which dark mode was explicitly asked for. The
positioning brief's non-goal — *"don't redesign the site visually"* — still holds,
so the question was whether a second palette counts as a redesign or as an
extension of the existing one.

## Options considered

| Option | The bet | Why it lost |
|---|---|---|
| **Follow `prefers-color-scheme`, re-lit palette — chosen** | The direction is the *system* — one hairline rule, heavy whitespace, ink-on-ground, accents used sparingly — not the specific hex values. Keep the system, move the light source | — |
| Stay light-only | The paper metaphor is the direction; a dark paper is a contradiction, and one palette is half the maintenance | Rejected: a site read mostly on laptops at night that ignores the OS setting reads as unfinished, not as principled |
| Invert the palette mechanically | Cheapest possible: swap `--ink` and `--paper`, done | Rejected — it does not survive contact with the accents. Cobalt `#2743c8` on a `#14140f` ground is **1.9:1**, and the redline is 2.9:1. A mechanical inversion produces an inaccessible page |
| Add a manual toggle | Gives the reader control regardless of OS | Rejected for v1: a toggle needs persisted state and a control in the nav, which *is* a visual change, and the brief's non-goal blocks that. `color-scheme: light dark` leaves the door open |

## Decision

The site follows the system preference via `@media (prefers-color-scheme: dark)`,
with a **second palette that is re-lit rather than inverted**. The ground stays the
ground and the ink stays the figure; what moves is the light source. Both accents
are lifted — cobalt to `#8fa2ff`, redline to `#ff8a6d` — because both lose contrast
fast on a dark ground.

Every token in both palettes clears WCAG AA (4.5:1) against its own ground, verified
by computation, not by eye. Documented in [`../system/palette.md`](../system/palette.md).

## What we gave up

- **The paper metaphor is weaker.** "Swiss whitepaper" was a specific physical
  idea, and half the time the page is now not paper. The system survives; the
  metaphor is diluted, and that is a real cost to the direction ADR 0017 chose.
- **Two palettes to keep honest.** Every future colour decision is now two
  decisions, and a value added carelessly to one is a contrast bug in the other.
  The `--scrim` tokens exist because the nav had already hardcoded `--paper` twice
  and would have desynced immediately.
- **The accents are no longer the brand values in dark.** `#8fa2ff` is not the
  drafting cobalt from the talk deck. Anyone comparing the deck and the site side
  by side at night sees two different blues.

## What would make us revisit

- If a manual toggle is ever wanted, this decision does not block it —
  `color-scheme: light dark` is already declared — but the toggle is a nav control
  and needs the brief's visual non-goal lifted first.
- If the deck and the site are ever shown together as one system, the divergent
  accents become a real problem and the dark palette should be re-derived from the
  deck rather than from contrast maths alone.

## Evidence

- **Primary:** this session, 2026-08-16 — dark mode was requested explicitly
  alongside responsive and motion work, and the re-lit-not-inverted approach was
  chosen against measured contrast.
  > Cobalt `#2743c8` measures **1.90:1** on the dark ground `#14140f`; the lifted
  > `#8fa2ff` measures **7.72:1**.
- **Corroborating:** `website/app/globals.css` — both palettes with their measured
  ratios in comments · [`../system/palette.md`](../system/palette.md) ·
  [ADR 0017](../../docs/decisions/0017-the-website-design-direction-is-swiss-whitepaper.md),
  whose direction this extends · `design/briefs/positioning.md`, whose non-goal
  scoped it.
- **Rationale:** stated at the time.

## Follow-up

*Append-only. Everything above this heading is **frozen**.*

*(none yet)*

---

_**Exactly two things in this file may ever change:** the `**Status:**` line and
additions under `## Follow-up`._
