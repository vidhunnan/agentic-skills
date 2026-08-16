# Exploration — Type system for the landing page

Status: closed · Started: 2026-07-19 *(approx.)*

> Append-only. Rounds below are frozen; new rounds go at the bottom. **A killed
> direction is never deleted** — that record is the point of this file.
>
> **Logged retrospectively on 2026-08-16**, roughly four weeks after the work. The
> rounds below were reconstructed from the draft files in this folder and from
> `git:e4a1f2e` — **not from memory.** What the drafts show is recorded; what they
> don't say is marked as not stated rather than filled in.

## Round 1 — Serif display + mono, two families

**Date:** 2026-07-19 *(approx.)*
**Testing:** *(not stated)* — the drafts show the pairing but not the question it
was answering.
**Links:** [`index.html`](./index.html), [`index_1.html`](./index_1.html)

### What changed

The starting point. Two families: **Newsreader** for display and **IBM Plex Mono**
for code and labels. No separate body face — Newsreader carries body text too.

### What we learned

*(nothing conclusive recorded)*

### Verdict

**Killed** — superseded by round 3's three-family system. *(reason not stated)*

---

## Round 2 — Grotesk-led, no serif

**Date:** 2026-07-19 *(approx.)*
**Testing:** the Blueprint direction — a technical-drawing voice, grid and
corner-bracket frames, an interactive schematic.
**Links:** [`agentic-skills-blueprint-draft.html`](./agentic-skills-blueprint-draft.html)

### What changed

Dropped the serif entirely: **Space Grotesk** + **IBM Plex Mono**. A different
voice from round 1, matching a different overall direction rather than a
typographic preference.

### What we learned

The direction read as *"more decorative and interactive than the minimal, airy
look the owner asked for"* — recorded in
[ADR 0017](../../decisions/0017-the-website-design-direction-is-swiss-whitepaper.md).

### Verdict

**Killed** — with the Blueprint direction. Whether the typeface pairing was
*independently* rejected, or simply went down with the direction it belonged to,
is *(not recorded)*.

---

## Round 3 — Three families, shipped

**Date:** 2026-07-19
**Testing:** *(not stated)*
**Links:** `website/app/layout.tsx` · `git:e4a1f2e`

### What changed

Added a third family: **Archivo** for body text, leaving Newsreader for display
and IBM Plex Mono for code. A body face the two-family drafts did without.

### What we learned

*(nothing conclusive recorded)*

### Verdict

**Kept** — shipped, and still live. *(reason not stated)* — see
[design ADR 0002](../../../design/decisions/0002-a-three-family-type-system-for-the-site.md).

---

## Why this thread is worth having

The three rounds above were **entirely recoverable from files that were never
deleted**, and entirely unrecoverable from anyone's memory four weeks later.

Had the drafts been cleaned up when the site shipped — the ordinary, tidy thing to
do — the losers would be gone, and design ADR 0002 could not have named a single
alternative. It would have had to be rejected as "not a decision" for want of a
namable loser, and the fork would have vanished from the record entirely.

That is the argument for this tier, demonstrated on its first entry.
