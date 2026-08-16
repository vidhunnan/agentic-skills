# Give design billing above the fold, and fix two defects while in here

- **Commit:** `737dad8f5d34d3b8d0b0d167992f6e98772b4554` (`737dad8`)
- **Author:** Claude
- **Date:** 2026-08-16

## Commit message

Phase B -- the decided-but-unexecuted half of design/decisions/0001. The page
body already gave the two stacks equal billing; the fold did not mention
design at all, so a visitor who bounced never learned the library covered it.

- Hero: the eyebrow, subhead and CTAs now name both domains. The h1 is
  untouched -- it is surface-agnostic and still the best sentence on the page.
  A second CTA jumps straight to the design stack.
- Proof: RECEIPTS moved out of the component into skills.ts. It was the last
  content on the site outside the single source of truth, contra ADR 0016.
  Three design artifacts added, led by design/decisions/0002 -- the ADR whose
  rationale reads (reason not stated), given a redline marker because --red
  means hypothesis and failure in this palette and an unrecorded reason is
  exactly that.
- Trust levels: only `Truth` had styling, so Evidence / History / Spec -- the
  three unique to the design stack -- rendered as undifferentiated grey and
  the design tiers did not read as tiers. Three bands now: verified,
  happened, provisional.
- skill.answers rendered at last. It was on all eleven skills, consumed by
  nothing, and the type comment described a column that was never built. It
  is the fastest way to tell whether a skill is for you, so it leads the row.
- Nav gained the orphaned #proof section.

Phase D -- two defects, both awkward on a design library's own site.

- Content was invisible without JavaScript. `.reveal { opacity: 0 }` shipped
  in the static HTML and was cleared only by client JS, so with JS off every
  stack tier and all eleven skill rows rendered blank on a fully prerendered
  page. Hiding now lives behind a .js-reveal class set on mount: visible
  unless JS has proved it can animate.
- --mute was #8b8b7e, 3.08:1 on --paper -- failing WCAG AA on ~10 small-text
  elements including every nav link's default state. Now #6b6b60 (4.81:1).
  --red was 4.43:1 and has just become load-bearing for text, so it moved to
  #bf3018 (5.13:1). Visual character unchanged.

Also: prefers-reduced-motion now covers every transition rather than only the
reveal; Nav's two hardcoded rgba copies of --paper became --scrim tokens, so
the nav can no longer desync from the palette; and page.tsx's inline
fontFamily became <code>, which was dropping the size and colour that .mono
carries.

Fixed in passing: .eyebrow is display:flex, so React's split text nodes
become separate anonymous flex items and the leading space is stripped --
"{TOTAL_SKILLS} skills" rendered as "11skills". Interpolating into a single
template string fixes it. A static string never hit this.

## Changes in detail

### `website/app/globals.css` (modified)

- Dark palette behind prefers-color-scheme; --mute darkened from 3.08:1 to 4.81:1 and --red from 4.43:1 to 5.13:1; --scrim tokens so the nav cannot desync from the palette; --bp breakpoint token; the reveal's hidden state moved behind .js-reveal; reduced-motion now covers every transition rather than only the reveal.

### `website/app/page.tsx` (modified)

- Inline fontFamily replaced with <code>, which was dropping the size and colour .mono carries.

### `website/components/ContextStack.module.css` (modified)

- Three trust bands — verified, happened, provisional — so the design tiers read as tiers. Previously only Truth had styling.

### `website/components/ContextStack.tsx` (modified)

- Trust class derived per level instead of a Truth-only branch; stagger via index.

### `website/components/Hero.module.css` (modified)

- Breakpoint unified to 720px.

### `website/components/Hero.tsx` (modified)

- Eyebrow, subhead and CTAs name both domains; the h1 is untouched. Eyebrow interpolation moved into a single template string because .eyebrow is display:flex and React's split text nodes lost the leading space, rendering "11skills".

### `website/components/Install.module.css` (modified)

- Breakpoint unified to 720px.

### `website/components/Nav.module.css` (modified)

- Scrim tokens replace two hardcoded rgba copies of --paper; under 720px the links become a horizontally scrollable rail instead of display:none, which had left phones with no way to reach any section.

### `website/components/Nav.tsx` (modified)

- The orphaned #proof section gains a nav entry.

### `website/components/Proof.module.css` (modified)

- Redline marker for that receipt — --red means hypothesis and failure in this palette, and an unrecorded reason is exactly that.

### `website/components/Proof.tsx` (modified)

- Reads RECEIPTS from skills.ts; highlights the one receipt demonstrating the honest gap.

### `website/components/Reveal.tsx` (modified)

- Sets .js-reveal on mount so content ships visible; honours prefers-reduced-motion directly; stagger driven by an index prop rather than an inline delay; rootMargin so rows read as settling rather than popping.

### `website/components/Skills.module.css` (modified)

- Style for the answers line.

### `website/components/Skills.tsx` (modified)

- Renders skill.answers, which was on all eleven skills and consumed by nothing.

## Files changed

```
 website/app/globals.css                    | 89 +++++++++++++++++++++++++-----
 website/app/page.tsx                       |  6 +-
 website/components/ContextStack.module.css | 33 ++++++++++-
 website/components/ContextStack.tsx        |  8 +--
 website/components/Hero.module.css         |  2 +-
 website/components/Hero.tsx                |  5 +-
 website/components/Install.module.css      |  2 +-
 website/components/Nav.module.css          | 23 +++++++-
 website/components/Nav.tsx                 |  1 +
 website/components/Proof.module.css        | 30 ++++++++++
 website/components/Proof.tsx               | 33 +++--------
 website/components/Reveal.tsx              | 38 +++++++++++--
 website/components/Skills.module.css       | 13 +++++
 website/components/Skills.tsx              |  6 +-
 14 files changed, 228 insertions(+), 61 deletions(-)
```

---

_Generated by `/changelog-tracker` from `git log -1` and `git show --stat`. Every
fact here comes from git: **faithful, not generative.**_
