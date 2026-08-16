# Amend the motion spec and log design ADR 0006

- **Commit:** `fc1ed08e043025ce20ba9d841fcb0749087afb5c` (`fc1ed08`)
- **Author:** Claude
- **Date:** 2026-08-16

## Commit message

The rotation shipped in 1e30551 made a sentence in design/specs/motion.md
false: "No motion on layout. Nothing moves that the reader did not cause,
except the reveal below." Leaving that standing would have been the worst
version of this change -- a site arguing that records decay when nobody
writes down what changed, decaying its own record to avoid the paperwork.

motion.md now:

- names two exceptions, not one, and states the bar this one cleared: the
  moving thing IS the content, six records could not fit any other way,
  and it can be stopped. A decorative loop clears none of that.
- carries the dwell, both crossfade durations and the 6px offset as tokens
- records the four transient holds and why the tab/viewport pair is
  tracked separately from pointer/focus
- records the no-JS guard ahead of the bug this time, rather than after it
- records the pause control, the reduced-motion stop, and the tabs pattern
- keeps three open questions, including that 6500ms has been tested on
  nobody

Design ADR 0006 logs the fork itself. Three named losers, all real: a
separate gallery section (lost to reach -- the material's whole problem was
being below the fold), reader-driven dots with no timer (lost because a
control nobody has a reason to press is not a control), and a typewriter
effect (lost on honesty -- the skills do not write at 28ms per character,
and a page arguing against plausible fiction should not open with a
dramatisation).

What we gave up is the section that matters here, and the first item is
the real cost: "nothing moves that the reader did not cause" was
enforceable by anyone reading it, and "nothing moves except where it is
justified" is a conversation. The next person wanting an animation now has
a precedent to point at rather than a rule to argue with.

Also fixes a real annoyance the spec surfaced while being written: pressing
a dot selected a specimen but left the timer running, so the card was taken
away six seconds later from the one person who had asked for it. Choosing
now stops the rotation; the pause control resumes it. That turned an open
question into a behaviour, and left a better open question behind -- whether
stopping on a press is too sticky in the other direction.

Verified in Chromium: 24 checks across autoplay, all five holds, keyboard,
reduced motion, JS off, and dark mode at 390px.

## Changes in detail

### `design/specs/motion.md` (modified)

- §Layout no longer says nothing moves that the reader did not cause. It names two exceptions and, more importantly, writes down the bar the second one cleared — so the next request for an animation has something to be measured against rather than a rule that has already been broken once.
- Four new token rows (dwell, fade in, fade out, offset) and three new state rows. No new easing curve: the crossfade in reuses the reveal's `0.5s cubic-bezier(0.22, 0.61, 0.36, 1)`.
- §Interaction gains the four transient holds and the reason the tab/viewport pair is tracked apart from pointer/focus — otherwise leaving the card with the mouse resumes a rotation a hidden tab still wants held.
- §Edge cases gains the no-JS guard, recorded *before* it could become the bug it already was for `.reveal`, and the note that specimen 0 is load-bearing.
- §Accessibility gains the reduced-motion stop (JS, so the global CSS rule cannot reach it), the pause control and its WCAG 2.2 SC 2.2.2 justification, and the tabs pattern.
- The version stamp moves to `git:1e30551` and `Specimens.tsx` joins the source list.

### `design/decisions/0006-the-hero-specimen-rotates-through-six-skills.md` (new)

- The fork, with three named losers a reasonable person would have picked. `What we gave up` names four costs, the first being the spec's own enforceability — and the second the possibility that one card read six times lands harder than six read once, which is a real trade and not measurable from here.
- `What would make us revisit` includes the condition that would prove this wrong: the pause control getting used more than the dots, which would mean readers are escaping the rotation rather than following it.
- Rationale is `stated at the time` — unlike 0002, this one had its reasoning recorded while it was being made.

### `design/decisions/README.md` (modified)

- Index row for 0006; unsuperseded count 4 → 5.

### `website/components/Specimens.tsx` (modified)

- `pick()` — choosing a specimen by dot or arrow key now also stops the rotation, so the timer cannot take away the card the reader just asked for. Found while writing the spec's open questions, and fixed rather than logged.
