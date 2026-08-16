# Spec — Motion

**Source:** `website/app/globals.css` · `website/components/Reveal.tsx` · `website/components/Specimens.tsx` · **Version:** `git:1e30551` (2026-08-16)
**Status:** built

Motion is the least-documented layer in most design systems: easing and duration get
rebuilt by feel on every screen because nobody wrote them down. This is the site's
entire motion vocabulary — five behaviours, one easing curve.

## Layout

No motion on layout. Nothing moves that the reader did not cause, with **two**
exceptions, both listed below: the reveal, which runs once per element, and the
hero specimen rotation, which runs on a timer until the reader stops it.

The rotation is a knowing exception to the rule this section used to state
absolutely — see [design ADR 0006](../decisions/0006-the-hero-specimen-rotates-through-six-skills.md).
It is not licence for a second one. The bar it cleared: the moving thing *is* the
content, six records could not fit on the page any other way, and it can be stopped.
A decorative loop clears none of that.

## Tokens used

| Role | Value | Notes |
|---|---|---|
| Reveal duration | `0.5s` | opacity + transform together |
| Reveal easing | `cubic-bezier(0.22, 0.61, 0.36, 1)` | ease-out; fast start, long settle |
| Reveal offset | `translateY(8px)` | small — it should read as settling, not sliding |
| Stagger step | `45ms` | via `--reveal-i`, the row index |
| Specimen dwell | `6500ms` | long enough to read a seven-line record, not to wait through one |
| Specimen fade in | `0.5s` same ease-out curve | the reveal's own duration; no new easing was added |
| Specimen fade out | `0.22s` same curve | shorter on purpose — the outgoing card clears before the incoming settles |
| Specimen offset | `translateY(6px)` | 2px less than the reveal: the card is larger, so the same distance reads as further |
| Hover / state | `0.15s ease` | links, buttons, the rotation dots |
| Nav scrim | `0.25s ease` | background + border on scroll |
| Scroll progress | `0.05s linear` | near-instant; it tracks a value, it doesn't animate |
| Palette backdrop | `0.14s ease-out` | fade only |
| Palette dialog | `0.16s` same ease-out curve | 6px lift; short enough not to delay typing |

## States

| Trigger | Property | Duration | Delay | Communicates |
|---|---|---|---|---|
| Element enters viewport (once) | `opacity` 0→1, `translateY` 8px→0 | 0.5s | `index × 45ms` | this row is arriving in order |
| Specimen dwell elapses, or a dot is chosen | `opacity` + `translateY` 6px→0 in, `opacity`→0 out | 0.5s in / 0.22s out | — | a different record, not a different page |
| Pointer or focus enters the specimen | *(none — the timer holds)* | — | — | you are reading; it will wait |
| A dot is chosen | *(none — the timer stops for good)* | — | — | you picked this one; it stays |
| Pointer over a link | `color` | 0.15s | — | interactive |
| Page scrolled > 4px | nav `background`, `border-color` | 0.25s | — | the nav has detached from the page |
| Scroll position changes | progress bar `width` | 0.05s | — | position in the document |
| Command palette opens | backdrop `opacity`, dialog `opacity` + `translateY` | 0.14s / 0.16s | — | a layer above the page, not a new page |

**The palette has no exit animation.** Closing is instant: it unmounts. An exit
transition on a keyboard-driven surface makes `esc` feel unresponsive, and the
palette is opened and dismissed far more often than any other element here.

## Interaction

**Reveal fires once.** `IntersectionObserver` at `threshold: 0.1` with
`rootMargin: 0px 0px -8% 0px`, unobserved on first intersect. The negative bottom
margin starts the transition slightly *before* the row reaches the viewport, so it
reads as already-settling rather than popping in.

**Stagger is per-list, not per-page.** `--reveal-i` is the index within its own list,
so each section starts its cascade from zero. A page-wide counter would give the
last skill row a 45 × 20 = 900ms delay — long enough to read as broken.

**The specimen rotation stops for four things**, any one of which is enough: the
pointer is over it, focus is inside it, the tab is backgrounded, or the hero has
scrolled out of view. The last two are tracked separately from the first two,
because otherwise leaving the card with the mouse would resume a rotation that a
hidden tab still wants held. Nothing here animates while nobody is looking at it.

**The card never resizes.** All six specimens occupy one CSS grid cell, so its
height is the tallest specimen's height at all times and the CTAs below it never
move. A reserved `min-height` would have been a guess, and the captions differ
enough that the guess would have been wrong.

## Edge cases

- **No JavaScript.** Content is visible. The hidden state lives behind a
  `.js-reveal` class set on `<html>` at mount, so the static HTML ships readable.
  *This was a real bug*: `.reveal { opacity: 0 }` used to ship in the prerendered
  markup and be cleared only by client JS, which blanked every stack tier and all
  eleven skill rows on a fully static export.
- **No `IntersectionObserver`.** Falls through to visible immediately. For the
  specimen this means the rotation keeps running while scrolled past — a waste, not
  a break.
- **Element already in viewport on load.** IO fires on observe, so above-the-fold
  rows animate once on arrival rather than sitting hidden.
- **No JavaScript, specimen.** The same lesson as the reveal, applied ahead of the
  bug this time: the stacked-grid layout lives behind a `data-ready` attribute set
  on mount, so without JS the CSS shows specimen 0 only. Ship it without that guard
  and a JS-off visitor gets six cards printed on top of one another. The dots and
  the pause control are not rendered until mount either — without a working rotation
  they would be seven buttons that do nothing.
- **Specimen 0 is load-bearing.** It is what a JS-off, reduced-motion or
  never-waited visitor sees, so it stays the record that says it doesn't know.

## Accessibility

`prefers-reduced-motion: reduce` collapses **every** transition and animation on the
page to `0.01ms` and zeroes all delays — not just the reveal, which is all the
previous rule covered. Hover transitions, the nav scrim and the progress bar are now
included. The reveal's hidden state is also neutralised, so nothing depends on a
transition completing to become visible.

**Reduced motion also stops the specimen rotating at all** — this one is JS, not
CSS, so the global rule cannot reach it. The dots still work; the pause control is
not rendered, because there is nothing left to pause. The preference is read through
a `change` listener rather than once at mount, so turning it on with the page
already open stops the rotation immediately.

**The rotation has a real pause control.** Holding on hover and focus does not reach
a visitor who never enters the widget, and the card auto-updates for longer than five
seconds (WCAG 2.2 SC 2.2.2 — Pause, Stop, Hide). Pressing it is sticky: unlike the
four transient holds, it is never cleared by moving the pointer or scrolling away.

The dots are the APG tabs pattern — `role="tablist"`, roving `tabindex`, `←`/`→`/
`Home`/`End`, selection following focus. Inactive specimens are `inert`, so their
`Read it` links are not in the tab order even though their boxes still hold the
card's height open. The panel is not a live region: an autoplaying region that
announces itself is worse than one that does not.

Nothing in this system conveys meaning through motion alone.

## Open questions for engineering

- The scroll-progress bar has no `role` or `aria-hidden`; it is an unlabelled empty
  element. Harmless, but it should probably be `aria-hidden="true"`.
- `CopyButton` changes its `aria-label` on success with no live region, so screen
  readers get no announcement unless focus is re-read.
- Whether the 45ms step should scale down on lists longer than ~12 rows. Untested;
  the longest list today is 4.
- Whether 6500ms is right. It was chosen to clear the longest specimen at an unhurried
  reading pace and has not been tested on anyone. The failure mode in each direction is
  known and opposite: too short and the reader loses a record mid-sentence, too long and
  the card reads as static and nobody discovers the other five.
- Whether stopping on a dot press is too sticky in the other direction. Choosing a
  specimen stops the rotation, on the reasoning that the timer should not take a card
  away from the one person who asked for it. Nobody has tested whether a reader who
  clicks once expects it to resume on its own afterwards.
