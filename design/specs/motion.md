# Spec — Motion

**Source:** `website/app/globals.css` · `website/components/Reveal.tsx` · **Version:** `git:737dad8` (2026-08-16)
**Status:** built

Motion is the least-documented layer in most design systems: easing and duration get
rebuilt by feel on every screen because nobody wrote them down. This is the site's
entire motion vocabulary — four behaviours, one easing curve.

## Layout

No motion on layout. Nothing moves that the reader did not cause, except the reveal
below, which runs once per element.

## Tokens used

| Role | Value | Notes |
|---|---|---|
| Reveal duration | `0.5s` | opacity + transform together |
| Reveal easing | `cubic-bezier(0.22, 0.61, 0.36, 1)` | ease-out; fast start, long settle |
| Reveal offset | `translateY(8px)` | small — it should read as settling, not sliding |
| Stagger step | `45ms` | via `--reveal-i`, the row index |
| Hover / state | `0.15s ease` | links, buttons |
| Nav scrim | `0.25s ease` | background + border on scroll |
| Scroll progress | `0.05s linear` | near-instant; it tracks a value, it doesn't animate |

## States

| Trigger | Property | Duration | Delay | Communicates |
|---|---|---|---|---|
| Element enters viewport (once) | `opacity` 0→1, `translateY` 8px→0 | 0.5s | `index × 45ms` | this row is arriving in order |
| Pointer over a link | `color` | 0.15s | — | interactive |
| Page scrolled > 4px | nav `background`, `border-color` | 0.25s | — | the nav has detached from the page |
| Scroll position changes | progress bar `width` | 0.05s | — | position in the document |

## Interaction

**Reveal fires once.** `IntersectionObserver` at `threshold: 0.1` with
`rootMargin: 0px 0px -8% 0px`, unobserved on first intersect. The negative bottom
margin starts the transition slightly *before* the row reaches the viewport, so it
reads as already-settling rather than popping in.

**Stagger is per-list, not per-page.** `--reveal-i` is the index within its own list,
so each section starts its cascade from zero. A page-wide counter would give the
last skill row a 45 × 20 = 900ms delay — long enough to read as broken.

## Edge cases

- **No JavaScript.** Content is visible. The hidden state lives behind a
  `.js-reveal` class set on `<html>` at mount, so the static HTML ships readable.
  *This was a real bug*: `.reveal { opacity: 0 }` used to ship in the prerendered
  markup and be cleared only by client JS, which blanked every stack tier and all
  eleven skill rows on a fully static export.
- **No `IntersectionObserver`.** Falls through to visible immediately.
- **Element already in viewport on load.** IO fires on observe, so above-the-fold
  rows animate once on arrival rather than sitting hidden.

## Accessibility

`prefers-reduced-motion: reduce` collapses **every** transition and animation on the
page to `0.01ms` and zeroes all delays — not just the reveal, which is all the
previous rule covered. Hover transitions, the nav scrim and the progress bar are now
included. The reveal's hidden state is also neutralised, so nothing depends on a
transition completing to become visible.

Nothing in this system conveys meaning through motion alone.

## Open questions for engineering

- The scroll-progress bar has no `role` or `aria-hidden`; it is an unlabelled empty
  element. Harmless, but it should probably be `aria-hidden="true"`.
- `CopyButton` changes its `aria-label` on success with no live region, so screen
  readers get no announcement unless focus is re-read.
- Whether the 45ms step should scale down on lists longer than ~12 rows. Untested;
  the longest list today is 4.
