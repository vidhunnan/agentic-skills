# 0002. The site uses a three-family type system: Newsreader, Archivo, IBM Plex Mono

- **Status:** Superseded by [0008](./0008-geist-mono-alone.md)
- **Date:** 2026-07-19 *(approx. — dated from `git:e4a1f2e`, the commit that shipped the site)*
- **Supersedes:** —

## Context

The landing page was built in the "Swiss whitepaper" direction
([ADR 0017](../../docs/decisions/0017-the-website-design-direction-is-swiss-whitepaper.md)),
which names the type system as part of the direction — *"Newsreader (display) +
Archivo (body) + IBM Plex Mono"* — but argues only the **direction**, never the
type system itself. Its recorded alternatives are Field Report (faithful) and
Blueprint (lightened); neither is a typographic alternative.

The exploration drafts in `docs/concepts/website/` show the type system was not
settled from the start. Three artifacts, three different answers:

| Artifact | Families loaded |
|---|---|
| `index.html`, `index_1.html` | Newsreader + IBM Plex Mono — **two families, no separate body face** |
| `agentic-skills-blueprint-draft.html` | Space Grotesk + IBM Plex Mono — **no serif at all** |
| Shipped site (`website/app/layout.tsx`) | Newsreader + Archivo + IBM Plex Mono — **three** |

So a real fork happened: a third family was added for body text, and the serif-led
approach beat a grotesk-led one.

## Options considered

| Option | The bet | Why it lost |
|---|---|---|
| **Newsreader + Archivo + IBM Plex Mono — chosen** | — | — |
| Newsreader + IBM Plex Mono (two families) — as shipped in `index.html` and `index_1.html` | A serif display face and a mono are enough; fewer families, less to load, tighter system | *(reason not stated)* |
| Space Grotesk + IBM Plex Mono (no serif) — as shipped in `agentic-skills-blueprint-draft.html` | A grotesk-led, technical-drawing voice matching the Blueprint direction | Died with the Blueprint direction (ADR 0017), but whether the typeface pairing was independently rejected is *(not recorded)* |

## Decision

The site loads three families: **Newsreader** for display, **Archivo** for body,
and **IBM Plex Mono** for code and labels.

## What we gave up

*(none identified)* — the trade was never articulated. Mechanically, a third
family is a third webfont on a page whose stated virtue is restraint, and the
two-family drafts demonstrably worked without it; but **no one recorded weighing
that**, and it is not this record's job to supply the reasoning after the fact.

## What would make us revisit

*(not stated)*

## Evidence

- **Primary:** `website/app/layout.tsx` (`git:e4a1f2e`) — the shipped three-family
  system; and the exploration drafts in `docs/concepts/website/`, which supply the
  named alternatives.
  > `index.html`: `family=Newsreader`, `family=IBM+Plex+Mono`
  > `agentic-skills-blueprint-draft.html`: `family=Space+Grotesk`, `family=IBM+Plex+Mono`
- **Corroborating:** [ADR 0017](../../docs/decisions/0017-the-website-design-direction-is-swiss-whitepaper.md),
  which states the trio as part of the chosen direction without arguing it.
- **Rationale:** **`*(reason not stated)*` — no reason was ever recorded.** Asked
  on 2026-08-16, the owner did not remember why the third family was added or why
  the serif-led pairing won. Nothing in the repo, the ADRs, the changelog or the
  drafts states it.

## Follow-up

*Append-only. Everything above this heading is **frozen**.*

- **2026-08-19** — **Superseded by [0008](./0008-geist-mono-alone.md)**, which
  replaced all three families with Geist Mono alone. The trio never had a recorded
  rationale to argue against — this record's own `*(reason not stated)*` is what let
  the replacement be decided on evidence rather than against a stated position.

- **2026-08-16** — Logged retrospectively, ~4 weeks after the decision was made.
  The alternatives above were **recovered from the exploration drafts**, not from
  memory or from any written record; the reasoning was not recoverable from
  either. This is the first entry in this tier to demonstrate why
  `docs/concepts/website/` is kept append-only: had those drafts been deleted when
  the site shipped, the losers would have been unrecoverable and this ADR could
  not have been written at all. Evidence: `docs/concepts/website/index.html`,
  `docs/concepts/website/agentic-skills-blueprint-draft.html`.

---

_**Exactly two things in this file may ever change:** the `**Status:**` line and
additions under `## Follow-up`. A decision with an honest gap is worth more than
one with a plausible fiction — and in design there is no diff to catch the
fiction._
