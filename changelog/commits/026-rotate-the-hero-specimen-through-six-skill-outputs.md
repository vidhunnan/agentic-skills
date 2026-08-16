# Rotate the hero specimen through six skill outputs

- **Commit:** `1e30551374dc0c4d2e3d00f7509fccd7042bcab3` (`1e30551`)
- **Author:** Claude
- **Date:** 2026-08-16

## Commit message

The hero showed one card -- a verbatim fragment of design/decisions/0002,
the ADR that says it doesn't know why. It is the strongest thing on the
page and it represented one skill out of eleven, while the other ten had
equally good committed artifacts sitting unread in the repo.

The card now cycles through six specimens, one per skill:

  design-decisions   design/decisions/0002 -- *(reason not stated)*
  decisions-logger   docs/decisions/0000-not-logged -- the Fork Test
  design-brief       design/briefs/positioning -- anti-goals, | Time | blank
  handoff-generator  the handoff that found a hole in its own protocol
  changelog-tracker  changelog/commits/022 -- "No rationale was invented."
  exploration-log    docs/concepts/website/type-system -- Killed / Kept

Every line is quoted exactly from a file committed here; each was verified
with grep -F against its source before shipping. Trimming at a sentence or
markdown soft-wrap boundary is typesetting and is allowed. Dropping words
from the middle is not, and nothing here does.

Three of the six have no red line at all. kind: "gap" paints a line in
--red, which in this palette means hypothesis, failure, the unrecorded
reason -- never decoration (design/system/palette.md). Making the cards
visually uniform would have destroyed the signal that makes the first one
mean anything.

Mechanics:

- All six render into one CSS grid cell, so the card is permanently as
  tall as the tallest and the CTAs below it never move. A reserved
  min-height would have been a guess, and the captions differ enough that
  the guess would have been wrong. Measured: the CTA row does not move.
- Before JS mounts, CSS shows specimen 0 only. Without that guard a JS-off
  visitor gets six cards printed on top of one another -- the same class
  of bug that once blanked every reveal on a fully static export.
- Autoplay holds on hover, on focus, on a backgrounded tab, and when the
  hero is scrolled out of view. The tab and viewport holds are tracked as
  refs and folded into one flag, so neither can clear a hold the other
  still wants.
- prefers-reduced-motion is read through a change listener, not a one-shot
  read: a visitor can turn it on with the page already open. Under it,
  nothing autoplays and the pause control is not rendered at all.
- An explicit pause button, because hover and focus pausing never reaches
  a visitor who does not enter the widget and this auto-updates for longer
  than five seconds (WCAG 2.2 SC 2.2.2).
- Dots are the tabs pattern with a roving tabindex; inactive slides are
  inert, so their "Read it" links leave the tab order.

No new easing: the crossfade in is the reveal's own 0.5s
cubic-bezier(0.22, 0.61, 0.36, 1). Out is 0.22s so the outgoing card has
cleared before the incoming one settles. No new dependencies.

The rotation is a deliberate exception to design/specs/motion.md, which
says nothing moves that the reader did not cause. That fork is logged
separately rather than made quietly, which on this site is the point.

Also drops .specimenBody .heading:nth-child(4) -- it hardcoded the fourth
child as the second stanza's start, which was true of exactly one card.
The stanza break is now a line kind.

## Changes in detail

### `website/components/lib/skills.ts` (modified)

- `SPECIMEN` (one object) becomes `SPECIMENS` (six), with a `Specimen` interface and a `SpecimenLineKind` union. Adds `by`, so each card names the skill that wrote it, and a `"blank"` line kind so the stanza break is data rather than a CSS position.
- The docblock's verbatim contract widens from one ADR to the array, and states the boundary it allows: trimming at a sentence or soft-wrap edge is typesetting; dropping words from the middle is not. It also pins the ordering rule — `[0]` is what ships in the static HTML, so it stays the record that admits it doesn't know.
- A second docblock records why three of the six carry no red line: `--red` means hypothesis, failure and the unrecorded reason in this palette, so `kind: "gap"` is reserved for a real gap.

### `website/components/Specimens.tsx` (new)

- The rotation. Client component; `Hero.tsx` stays a server component. Reuses the `Reveal` idioms — the same `IntersectionObserver` setup and `matchMedia` handling — rather than introducing a second style of doing it.
- Five ways to stop: pointer, focus, hidden tab, scrolled-out-of-view, and the explicit pause button. The first four are transient holds; the button is sticky and is never cleared by the others.
- Deliberately does *not* `unobserve` after the first intersection, which is the one place it diverges from `Reveal`: this observer has to keep toggling as the hero enters and leaves.

### `website/components/Specimens.module.css` (new)

- The specimen styles, moved verbatim from `Hero.module.css`, plus the stacked grid, the crossfade, the dots and the pause control.
- `.slide + .slide { display: none }` is the no-JS guard; the stacking only applies under `[data-ready]`, set on mount.
- The line-kind container is named `.lines`, not `.body` — the kinds are looked up as `styles[kind]`, so a container called `.body` would have shadowed the `"body"` kind and painted those lines with the container's rule.
- Dots are a 6px mark in a 24px target.

### `website/components/Hero.tsx` (modified)

- The inline `<figure>` becomes `<Specimens />`. Nothing else in the hero changed.

### `website/components/Hero.module.css` (modified)

- The `.specimen*` block and its mobile rule are gone, including `.specimenBody .heading:nth-child(4)` — the hardcoded stanza break that was true of exactly one card.
