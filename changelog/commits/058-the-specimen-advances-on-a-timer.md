# feat(website): the specimen advances on a timer, with a line showing when

- **Commit:** `5952626a44189851878c67bd75023054e2b9bb20` (`5952626`)
- **Author:** Vidhunnan Murugan
- **Date:** 2026-08-20

## Commit message

Reinstates something this repo retired on purpose, so the terms matter.

Dwell is 6500ms, reused from the rotation ADR 0010 killed rather than re-picked —
it was chosen to clear the longest record at an unhurried pace. Its own spec entry
admits it was never tested on a reader, and that is still true.

Hard cut between records, by choice: no fade, no lift. The retired version
crossfaded 0.5s in and 0.22s out, so this moves strictly less. The only thing that
moves is a 2px line filling across the card's bottom edge over the dwell, which is
what makes the advance legible rather than startling. It started as a 1px hairline
and was invisible sitting on the card's own border — a progress indicator nobody
can see is just an animation.

Four brakes, all from the implementation this replaces: the pointer is over it,
focus is inside it, the tab is backgrounded, or the card is scrolled out of view.
The last two are tracked separately from the first two, because otherwise moving
the mouse away resumes a timer a hidden tab still wants held.

A manual arrow press stops it for good — the timer should not take a record away
from the one person who asked for it — but leaving the section clears that stop, so
returning starts it again. One IntersectionObserver does both jobs.

Reduced motion turns it off entirely, read through a change listener rather than
once at mount, so enabling it with the page open stops the timer immediately. This
is JS; the global CSS rule cannot reach it.

NO PAUSE CONTROL, at the owner's request after the tradeoff was raised. The
consequence is on the record in the component and not argued further: a visitor who
never hovers, focuses or presses an arrow gets content that auto-updates
indefinitely, which is what WCAG 2.2 SC 2.2.2 asks for a mechanism against. The four
brakes above are now the whole of it.

The suite defaults to reducedMotion: "reduce" — true of the site, and it makes every
other spec deterministic, since a card that changes under an assertion is a flake
generator. specimen-autoplay.spec.ts is the only file that opts out, and it guards
the brakes rather than the timer: holds on hover, stops on a press, resumes after
leaving and returning, never runs under reduced motion.

Every test needed the card scrolled into view first — on a phone it sits below the
fold, where "off-screen" correctly holds the timer. That is the feature working, not
a test workaround.

46 tests passing. Ten records and zero controls still ship in the static export.

## Changes in detail

**229 insertions against 5 deletions.** The commit reinstates motion this repo retired
in writing, and it is unusually careful about the terms — including the one it does not
meet.

### The dwell is inherited, not re-picked — verified

- `Specimen.tsx` gains `const DWELL_MS = 6500;`. The retired `Specimens.tsx`, deleted by
  the rebuild, carried **the identical line** at `fcea6dd^`: `const DWELL_MS = 6500;`.
  The message's claim that the value is *"reused from the rotation ADR 0010 killed
  rather than re-picked"* checks out against git.
- **And it inherits the value's weakness with it**, stated rather than dropped: *"Its
  own spec entry admits it was never tested on a reader, and that is still true."* The
  motion spec's row still reads *"inherited from the retired rotation, not re-picked.
  Never tested on a reader."*

### The motion is strictly less than what was retired

- **Hard cut between records — no fade, no lift.** The retired version crossfaded 0.5s
  in and 0.22s out, *"so this moves strictly less."* That is a comparative claim a reader
  can check against the deleted component, and it is the strongest available argument
  for re-granting an exception.
- **The only thing that moves is a 2px progress line** filling across the card's bottom
  edge over the dwell — *"which is what makes the advance legible rather than
  startling."* Its own history is recorded: *"It started as a 1px hairline and was
  invisible sitting on the card's own border — a progress indicator nobody can see is
  just an animation."*

### Four brakes, and why two are tracked separately

- Pointer over it, focus inside it, tab backgrounded, or card scrolled out of view.
- **The last two are tracked separately from the first two**, on a real bug: *"otherwise
  moving the mouse away resumes a timer a hidden tab still wants held."*
- **A manual arrow press stops it for good** — *"the timer should not take a record away
  from the one person who asked for it"* — but leaving the section clears that stop. One
  `IntersectionObserver` does both jobs.
- **Reduced motion is read through a `change` listener, not once at mount**, so enabling
  it with the page open stops the timer immediately. The reason is exact: *"This is JS;
  the global CSS rule cannot reach it."*

### The accessibility gap, on the record

- **There is no pause control**, at the owner's request after the trade-off was raised.
- The consequence is written into the component rather than argued away: *"a visitor who
  never hovers, focuses or presses an arrow gets content that auto-updates indefinitely,
  which is what WCAG 2.2 SC 2.2.2 asks for a mechanism against. The four brakes above are
  now the whole of it."*
- Entry 039 recorded that the pause control, the roving-tabindex dots, the `inert` panels
  and the `change` listener were *"machinery needed only because something moved on a
  timer, and none of it should return without clearing ADR 0006's bar again."* Something
  now moves on a timer; the `change` listener is back and **the pause control is not.**
  The commit names that as decided rather than missed, which is the honest version, and
  entry 059 carries it into the spec one commit later.
- **No design ADR is committed for this.** `design/decisions/` ends at `0011` here and
  through `7699f59`, the last commit this changelog covers.

### `website/playwright.config.ts` (+7) — the suite-wide default

- The suite now defaults to `reducedMotion: "reduce"`, on two stated grounds: it is
  **true of the site**, and it makes every other spec deterministic, *"since a card that
  changes under an assertion is a flake generator."*
- `specimen-autoplay.spec.ts` (new, 85 lines) is the only file that opts out, and **it
  guards the brakes rather than the timer**: holds on hover, stops on a press, resumes
  after leaving and returning, never runs under reduced motion. Testing the stopping
  conditions rather than the interval is what makes the spec stable.
- One note worth keeping: every test needed the card scrolled into view first, because on
  a phone it sits below the fold where *"off-screen"* correctly holds the timer. *"That
  is the feature working, not a test workaround."*

### Suite count

- 36 → **46 tests passing.** Ten records and zero controls still ship in the static
  export.

## Files changed

```
 website/components/Hero.module.css          |  39 +++++++++++++++++++++++++++++++++++++++
 website/components/Specimen.tsx             | 103 ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++-----
 website/playwright.config.ts                |   7 +++++++
 website/public/skills/decisions-logger.zip  | Bin 12702 -> 12702 bytes
 website/public/skills/design-brief.zip      | Bin 5184 -> 5184 bytes
 website/public/skills/design-critique.zip   | Bin 6877 -> 6877 bytes
 website/public/skills/design-decisions.zip  | Bin 9072 -> 9072 bytes
 website/public/skills/design-explore.zip    | Bin 7378 -> 7378 bytes
 website/public/skills/design-language.zip   | Bin 7436 -> 7436 bytes
 website/public/skills/design-setup.zip      | Bin 9933 -> 9933 bytes
 website/public/skills/exploration-log.zip   | Bin 5266 -> 5266 bytes
 website/public/skills/handoff-generator.zip | Bin 8690 -> 8690 bytes
 website/public/skills/repo-setup.zip        | Bin 9809 -> 9809 bytes
 website/public/skills/skill-scaffold.zip    | Bin 8428 -> 8428 bytes
 website/tests/specimen-autoplay.spec.ts     |  85 +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
 15 files changed, 229 insertions(+), 5 deletions(-)
```

---

_Generated by `/changelog-tracker` from `git log -1` and `git show --stat`. Every
fact here comes from git: **faithful, not generative.**_
