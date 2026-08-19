# 0017. The website design direction is "Swiss whitepaper"

- **Status:** Superseded by [design ADR 0007](../../design/decisions/0007-the-site-is-terminal-rendered-markdown.md)
- **Date:** 2026-07-19

## Context

Three landing-page concepts existed before the production build: two dark "Field Report" editorial variants (`index.html`, `index_1.html`) and one "Blueprint" technical draft (`agentic-skills-blueprint-draft.html`). The owner wanted the production site lighter than those ("not so dark"), airier, and referencing the talk deck's own "Field Report" design system (`writing-for-machines-v8-present.html`). Three *light* directions were then presented to choose from: Field Report faithful, Blueprint lightened, and Swiss whitepaper.

## Decision

We built the site in the **Swiss whitepaper** direction: a light paper background with ink and greys carrying the page, drafting cobalt (`#2743C8`) and redline (`#D0361B`) used only as accents, one hairline-rule system, heavy whitespace, and Newsreader (display) + Archivo (body) + IBM Plex Mono — a pared-down application of the deck's Field Report palette rather than a full editorial port of it.

## Alternatives considered

- **Field Report, faithful** — a direct editorial port of the deck (masthead running-headers, folio numbers, redline margin annotations, TRUTH/HYPOTHESIS stamps). Rejected: the owner wanted something lighter and more restrained than the deck's full editorial treatment.
- **Blueprint, lightened** — the technical-drawing look (grid, corner-bracket frames, an interactive click-to-expand schematic with trust gauges) recoloured onto paper. Rejected: more decorative and interactive than the minimal, airy look the owner asked for.

## Consequences

- The site reads like a clean product spec — minimal, fast, and adjacent to the deck's palette without competing with it.
- It deliberately diverges from the deck's bolder editorial look, so the two are not visually identical, and it carries less of a distinctive "signature" than the Blueprint direction's schematic would have. The animated console demo from the concepts was also dropped as out of scope for this direction.

## Evidence

- **Primary:** `git:e4a1f2e` (2026-07-19) — the shipped CSS implements the Swiss-minimal treatment (light tokens, hairline system, the three-typeface stack).
- **Corroborating:** this session — the owner selected "Swiss whitepaper" from the three light directions presented · `docs/concepts/website/writing-for-machines-v8-present.html` — the Field Report design system it pares down.
- **Rationale:** supplied by the owner on 2026-07-19 (this session) — the stated wants were lighter, airier, minimal ink, and referencing the deck.

## Follow-up

*Append-only. Everything above this heading is **frozen**. Entries below are dated and additive — evidence that the world moved, not a revision of what was decided.*

- **2026-08-19** — **Superseded by [design ADR 0007](../../design/decisions/0007-the-site-is-terminal-rendered-markdown.md)**, which chose terminal-rendered markdown. The supersession crosses tiers: this decision predates the design context stack, so a design direction is logged here rather than in `design/decisions/`. Note what did **not** cause it — no evidence was found that this direction was failing. The site was three days old in its current form, `design/research/` was empty, and Vercel Web Analytics returned `404 — not found`. It was reopened because the argument the page makes changed, and because this ADR recorded **no revisit condition**, so there was no bar to clear. Its own §Consequences conceded the cost that decided it: *"it carries less of a distinctive 'signature' than the Blueprint direction's schematic would have."* Evidence: `docs/concepts/website/website-revamp.md` round 1 · `git:3333f33`.
- **2026-08-19** — Two colour values in the Decision above never matched what shipped, and the drift was never recorded as a decision: the redline is stated here as `#D0361B` while `globals.css` and `design/system/palette.md` carry `#bf3018`, and `--mute` moved from the deck's `#8B8B7E` to `#6b6b60`. Both were darkened for contrast — `#D0361B` measures below AA on the paper ground. Recorded here rather than corrected above, because the body of a logged decision is frozen even when it is wrong.

---

_Append-only. If this turns out to be wrong, **do not edit it** — write a new decision that supersedes it and links back. Being wrong on the record is more useful to the next reader than a clean file._

_**Exactly two things in this file may ever change:** the `**Status:**` line (to point at a superseding decision) and additions under `## Follow-up`._
