# Spec — Motion

**Source:** `website/app/globals.css` · `website/components/Reveal.tsx` · `website/components/LoopSteps.tsx` · `website/components/NavLinks.tsx` · **Version:** `git:467dc5b` (2026-08-19)
**Status:** built

Motion is the least-documented layer in most design systems: easing and duration get
rebuilt by feel on every screen because nobody wrote them down. This is the site's
entire motion vocabulary — and as of `git:fcea6dd` it is one behaviour, one easing
curve.

> **Amended 2026-08-19, re-pinned from `git:1e30551` to `git:fcea6dd`.** The rebuild
> deleted `Nav`, `CommandPalette` and `Specimens`, and with them four of the five
> behaviours this spec used to document: the specimen rotation, the palette open
> transition, the scroll-progress bar and the nav scrim. They are not deprecated —
> they are gone. What they were, and why they were given up, is in
> [design ADR 0009](../decisions/0009-the-command-palette-is-retired.md) and
> [design ADR 0010](../decisions/0010-one-hero-specimen-not-six.md); this file
> documents what the site does, not what it used to.

## Layout

No motion on layout. **Nothing moves that the reader did not cause, with one
exception:** the reveal, which runs once per element as it enters the viewport.

The rule was absolute until [design ADR 0006](../decisions/0006-the-hero-specimen-rotates-through-six-skills.md)
knowingly broke it for the hero specimen rotation — a timer-driven exception that
cleared a three-part bar: the moving thing *was* the content, six records could not
fit any other way, and it could be stopped. [ADR 0010](../decisions/0010-one-hero-specimen-not-six.md)
retired the rotation, so **the exception it was granted lapses with it** and the
count returns to one.

That the count went two → one is worth keeping visible. An exception that outlives
the thing it was granted for is how a motion system loses its rule.

## Tokens used

| Role | Value | Notes |
|---|---|---|
| Reveal duration | `0.5s` | opacity + transform together |
| Reveal easing | `cubic-bezier(0.22, 0.61, 0.36, 1)` | ease-out; fast start, long settle |
| Reveal offset | `translateY(8px)` | small — it should read as settling, not sliding |
| Stagger step | `45ms` | via `--reveal-i`, the row index |
| Hover / state | `0.15s ease` | links and buttons |
| Step highlight | `0.35s ease` | background + left border on the active loop step |
| Nav mark | *(none)* | the active section is a colour swap, untransitioned |

One curve for everything. A second easing function has never been needed and adding
one is the change this table exists to make visible.

## States

| Trigger | Property | Duration | Delay | Communicates |
|---|---|---|---|---|
| Element enters viewport (once) | `opacity` 0→1, `translateY` 8px→0 | 0.5s | `index × 45ms` | this row is arriving in order |
| Pointer over a link or button | `color`, `border-color` | 0.15s | — | interactive |
| Loop step passes the middle of the viewport | `background`, `border-left-color` | 0.35s | — | this is the step you are reading |
| Section enters the viewport | nav link `color` | — | — | where you are in the document |

## Interaction

**Reveal fires once.** `IntersectionObserver` at `threshold: 0.1` with
`rootMargin: 0px 0px -8% 0px`, unobserved on first intersect. The negative bottom
margin starts the transition slightly *before* the row reaches the viewport, so it
reads as already-settling rather than popping in.

**Stagger is per-list, not per-page.** `--reveal-i` is the index within its own list,
so each section starts its cascade from zero. A page-wide counter would give the last
skill row a 45 × 20 = 900ms delay — long enough to read as broken.

## Edge cases

- **No JavaScript.** Content is visible. The hidden state lives behind a `.js-reveal`
  class set on `<html>` at mount, so the static HTML ships readable. *This was a real
  bug*: `.reveal { opacity: 0 }` used to ship in the prerendered markup and be cleared
  only by client JS, which blanked every stack tier and all eleven skill rows on a
  fully static export. **This is the load-bearing rule of the whole file** — JS may
  enhance, never reveal.
- **No `IntersectionObserver`.** Falls through to visible immediately.
- **Element already in viewport on load.** IO fires on observe, so above-the-fold rows
  animate once on arrival rather than sitting hidden.

## Accessibility

`prefers-reduced-motion: reduce` collapses **every** transition and animation on the
page to `0.01ms` and zeroes all delays — not just the reveal. The reveal's hidden
state is also neutralised, so nothing depends on a transition completing to become
visible.

With the rotation gone, **nothing on this page auto-updates**, so WCAG 2.2 SC 2.2.2
(Pause, Stop, Hide) no longer applies to anything here. That is a simplification
worth naming: the pause control, the roving-tabindex dots, the `inert` panels and the
`change`-listener on the motion preference were all machinery this page needed only
because something moved on a timer. None of it survives, and none of it should be
reintroduced without a decision that clears ADR 0006's bar again.

Nothing in this system conveys meaning through motion alone.

## Round 3, now built

The **scroll-linked step highlight** and the **nav's active-section marking** both
ship in `git:467dc5b` and are in the tables above. Neither is an exception to the
Layout rule: both track scroll position and do nothing on their own, which is the
definition of reader-caused. The count of exceptions stays at one.

A previous draft of this section also promised a **sticky rail** carrying the same
active-section marker. The rail was cut before it shipped — it read as documentation
furniture — and the nav absorbed the job. Recorded here rather than deleted, because
a spec that quietly drops what it promised is how a reader stops trusting it.

**Nothing types itself.** No replay, no typewriter, no simulated terminal session.
That is a hard constraint in `design/system/language-website.md`, it fails all three
of design ADR 0006's tests, and it is what killed the console demos in two earlier
drafts. The step highlight is the closest thing on the page to a sequence, and it
only ever follows the reader.

## Open questions for engineering

- `CopyButton` changes its `aria-label` on success with no live region, so screen
  readers get no announcement unless focus is re-read.
- Whether the 45ms step should scale down on lists longer than ~12 rows. Untested;
  the longest list today is 11 (the skills index).
