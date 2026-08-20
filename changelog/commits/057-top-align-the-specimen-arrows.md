# fix(website): top-align the specimen arrows, and stop reflowing preformatted lines

- **Commit:** `6997e286630d9cbdb439976c9a33ae82da07ae0c` (`6997e28`)
- **Author:** Vidhunnan Murugan
- **Date:** 2026-08-20

## Commit message

The arrows are top-aligned now, level with the caption's first line, so they read
as part of that block instead of floating off its bottom edge. It also makes their
position independent of caption length — the reserved caption height is now about
keeping the section stable, not the arrows.

Two joining bugs, both found by looking at what the change exposed rather than by
the tests, which pass either way because they normalise whitespace:

Preformatted lines were being reflowed. The changelog specimen is a `git show
--stat` diffstat, and joining its rows turned five aligned columns into one
unreadable line. Those lines now carry kind "pre" and never join, because their
whitespace IS the content.

Detecting them needs the file, not the passage: that range OPENS INSIDE a fenced
block, with no opening ``` anywhere in the quoted lines. The generator counts
fences above the range to know it started inside one. A first attempt used "is
this line indented?", which was wrong in both directions — it missed nothing but
falsely claimed the brief and the language doc, whose indents are list
continuations that SHOULD reflow.

And list-continuation indents now go when lines are joined, alongside the "> " a
blockquote repeats. Leaving the indent in produced "The   closed positioning
brief" — the join space plus the source's two-space continuation.

All ten regenerated from their files, all ten still fit the fixed frame, no
doubled spaces anywhere. 36 tests passing.

## Changes in detail

**37 insertions against 10 deletions** across three source files. The alignment change
is one line of intent; the two bugs it exposed are the entry.

### The alignment, and what it changes about the previous fix

- The arrows are top-aligned, level with the caption's first line, *"so they read as
  part of that block instead of floating off its bottom edge."*
- **It also retires the reason the previous commit existed.** Entry 056 reserved three
  caption lines to stop the arrows moving; with top alignment their position is
  independent of caption length, so *"the reserved caption height is now about keeping
  the section stable, not the arrows."* The constraint stays, its justification changes,
  and the commit says so rather than leaving a rule with a stale reason attached.

### The tests could not have caught either bug — stated plainly

Both defects *"were found by looking at what the change exposed rather than by the
tests, which pass either way because they normalise whitespace."* That normalisation was
a deliberate choice made in entry 052 — *"words and markers must match, where the lines
break must not"* — and this is the first commit to record what it costs. A guard scoped
to words is blind to layout by construction.

### Bug 1: preformatted lines were being reflowed

- The changelog specimen is a `git show --stat` **diffstat**. The paragraph reflow from
  entry 052 joined its rows, *"turn[ing] five aligned columns into one unreadable line."*
- Those lines now carry `kind: "pre"` and never join, on the correct argument: **their
  whitespace IS the content.**
- **Detecting them needs the file, not the passage** — the notable finding here. That
  line range **opens inside a fenced block**, with no opening ``` ``` ``` anywhere in the
  quoted lines, so nothing in the passage itself reveals its kind. The generator counts
  fences above the range to know it started inside one.
- **The rejected heuristic is recorded with its failure in both directions**: *"is this
  line indented?"* *"missed nothing but falsely claimed the brief and the language doc,
  whose indents are list continuations that SHOULD reflow."* A wrong approach written
  down with its counterexamples is the part of this commit most likely to save someone
  later.

### Bug 2: list-continuation indents survived the join

- Leaving the indent in produced `"The   closed positioning brief"` — the join space
  plus the source's two-space continuation.
- Continuation indents are now stripped when lines join, **alongside the `> ` a
  blockquote repeats** — the strip added in entry 054. The two are the same rule applied
  to two markers, and the file now handles both in one place.

### `Specimen.tsx` (+17/−2), `skills.ts` (+13/−7), `Hero.module.css` (+7/−1)

- All ten specimens regenerated from their files, all ten still fit the 426px frame set
  in entry 055, *"no doubled spaces anywhere."*

### Suite count

- **36 tests passing**, unchanged from entry 056 — consistent with the message's own
  point that neither bug was test-visible.

## Files changed

```
 website/components/Hero.module.css          |   8 +++++++-
 website/components/Specimen.tsx             |  19 +++++++++++++++++--
 website/components/lib/skills.ts            |  20 +++++++++++++-------
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
 14 files changed, 37 insertions(+), 10 deletions(-)
```

---

_Generated by `/changelog-tracker` from `git log -1` and `git show --stat`. Every
fact here comes from git: **faithful, not generative.**_
