# feat(website): move the catalogue filter into the section header

- **Commit:** `c36625c1f4e4e8c8c4a01737a359195d2844ade1` (`c36625c`)
- **Author:** Vidhunnan Murugan
- **Date:** 2026-08-20

## Commit message

Built from the Figma spec (Scratchpad, node 2265:2179).

Nearly all of it already matched — 1320px section at 116px padding, 33px heading
over a 15.5px sub, hairline dividers, 34px rows, neutral Code/Chat tags, the
two-line description clip, the 13px plus, and the open state's command → COPY →
download .zip → hint. Even the hint's 449px cap is the 68ch already shipping.

Four things changed:

- The filter moves out of its own row above the list and into the section header,
  right-aligned opposite the heading, 36px above the list. That makes it a
  property of the section rather than a control floating over it, which is what
  the spec draws.
- Fixed 285x38 box, --paper fill, --rule border, 5px radius.
- Placeholder is now "search for skills, repo, design".
- The "14 skills" / "7 of 14" counter is gone, per the spec and confirmed.

The counter's removal is worth naming: it was the only feedback that the filter
had done anything, so a query matching nothing now shows an empty list under the
heading with nothing explaining why. The rows are still hidden rather than
unmounted, so nothing is destroyed by a query — but the reader has no count to
read. Accepted deliberately; revisit if a miss reads as a broken page.

The heading moved inside SkillList because the filter sits beside it and owns the
query state. Skills.tsx is now just the section wrapper.

26 tests passing.

## Changes in detail

**The first of four commits built against a Figma file rather than against feedback
on the built page.** 44 insertions against 33 deletions across four source files; the
other eleven entries in the diffstat are the skill zips, rewritten byte-identical by
the prebuild step — every commit from here on carries them, and none of them changes a
zip's contents.

### What did *not* change, and why that is the finding

The message leads with the negative result: **nearly all of the spec already matched**
what round 5 shipped — the 1320px section at 116px padding, the 33px heading over a
15.5px sub, the hairline dividers, 34px rows, neutral tags, the two-line description
clip, the 13px plus, and the open row's `command → COPY → download .zip → hint`
sequence. The hint's 449px cap in the file is the `68ch` measure already in
`globals.css`. Recording that convergence is more useful than listing the four deltas,
because it is evidence the design system and the built page had not drifted.

### `website/components/SkillList.tsx` (modified, +14/−11), `Skills.tsx` (−5 net)

- **The heading moves into `SkillList`.** It has to: the filter now sits beside it and
  `SkillList` owns the query state. `Skills.tsx` reduces to a section wrapper.
- **The filter leaves its own row and enters the section header**, right-aligned
  opposite the heading, 36px above the list — *"a property of the section rather than a
  control floating over it."*
- Fixed 285×38 box, `--paper` fill, `--rule` border, 5px radius.
- **Placeholder changes**: round 5's `filter — try design, chat, figma` becomes
  `search for skills, repo, design`.

### The removed counter — the one regression this commit accepts

- The `14 skills` / `7 of 14` readout, added in round 5 with `aria-live="polite"`, is
  **removed** per the spec.
- **The commit names the consequence rather than shipping it silently**: it was the
  only feedback that the filter had done anything, *"so a query matching nothing now
  shows an empty list under the heading with nothing explaining why."* The mitigation
  it can still claim is stated exactly as far as it goes — rows are hidden, not
  unmounted, so *"nothing is destroyed by a query — but the reader has no count to
  read."*
- **A revisit condition is set in the message**: *"revisit if a miss reads as a broken
  page."* That is the shape a design ADR asks for, recorded in a commit message where
  no ADR was written.

### `website/components/lib/content.ts` (+1)

- The new placeholder string, kept in the content module rather than in the component
  — the boundary `467dc5b` established (entry 042) holding.

## Files changed

```
 website/components/SkillList.tsx            |  25 ++++++++++++++-----------
 website/components/Skills.module.css        |  43 ++++++++++++++++++++++++++-----------------
 website/components/Skills.tsx               |   8 +++-----
 website/components/lib/content.ts           |   1 +
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
 15 files changed, 44 insertions(+), 33 deletions(-)
```

---

_Generated by `/changelog-tracker` from `git log -1` and `git show --stat`. Every
fact here comes from git: **faithful, not generative.**_
