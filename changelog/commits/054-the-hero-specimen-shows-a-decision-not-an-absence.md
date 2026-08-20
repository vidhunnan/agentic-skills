# feat(website): the hero specimen shows a decision, not an absence

- **Commit:** `fdc98f2756f80706726a6e800b8e763312cb624a` (`fdc98f2`)
- **Author:** Vidhunnan Murugan
- **Date:** 2026-08-20

## Commit message

It was design/decisions/0002 — two redlined gap markers and a caption reading
"nobody remembered why". It is now 0007's Decision section: what was chosen, and
the reason in the owner's own words, quoted rather than paraphrased.

The old choice was deliberate and is being reversed on purpose, so: a record of an
ABSENCE is a strange thing to lead with when the argument is that these skills
write decisions down. The honest gap is still the library's sharpest claim and it
still appears — in the hero lede and in four rows of the matrix — but it is no
longer the first artifact a reader meets. The comment in skills.ts that mandated
the old choice ("it stays the ADR that says it doesn't know") is updated rather
than deleted, and 0002 is kept in the array.

It is also the decision that produced the page it is printed on, which the caption
does not point out because a reader who notices does not need telling.

Fixes a real bug the swap exposed. A blockquote repeats "> " on every source line
as the BLOCK's marker, and the paragraph reflow joined those lines without
stripping it — putting a stray ">" mid-sentence: "...which represent all > the
context...". Continuation markers are now dropped, which is what the format means.

specimen.spec.ts normalises block markers on both sides for the same reason: the
source carries one ">" per line, the card renders the block once, so the counts
legitimately differ. Inline markers — ## ** *(…)* — are still compared as-is. The
words must match exactly, and they do.

The entry was generated from the file rather than retyped.

30 tests passing.

## Changes in detail

**50 insertions against 4 deletions** across three source files. The editorial reversal
is the headline; the blockquote bug is the part that would have shipped wrong text.

### The reversal, and how it is recorded

- The hero specimen moves from
  [`design/decisions/0002`](../../design/decisions/0002-a-three-family-type-system-for-the-site.md)
  — *"two redlined gap markers and a caption reading 'nobody remembered why'"* — to
  [`0007`](../../design/decisions/0007-the-site-is-terminal-rendered-markdown.md)'s
  Decision section, with the owner's reason quoted rather than paraphrased.
- **The prior choice was deliberate, and the commit treats it that way.** Round 3
  (`467dc5b`, entry 042) had extended the 0002 quotation specifically to carry two
  honest gaps, and `skills.ts` carried a comment mandating it — *"it stays the ADR that
  says it doesn't know."* That comment is **updated rather than deleted**, and 0002 is
  **kept in the array**. Nothing about the old reasoning is erased to make the new
  choice look obvious.
- The argument for the reversal is stated in one line: *"a record of an ABSENCE is a
  strange thing to lead with when the argument is that these skills write decisions
  down."* The honest gap is not dropped from the page — it survives in the hero lede
  and in **four rows of the matrix** (the four `hasAnswerToday: false` rows, entry 053)
  — *"but it is no longer the first artifact a reader meets."*
- One deliberate silence, recorded as deliberate: 0007 is *"the decision that produced
  the page it is printed on, which the caption does not point out because a reader who
  notices does not need telling."*

### The blockquote bug the swap exposed — `Hero.tsx` (+10/−1)

- 0007's Decision section contains a **blockquote**, and a blockquote repeats `> ` on
  every source line as the **block's** marker. The paragraph reflow shipped one commit
  earlier (`9373c37`, entry 052) joined those lines without stripping it, producing a
  stray `>` mid-sentence — the message quotes the actual output: *"…which represent all
  > the context…"*.
- Continuation markers are now dropped, *"which is what the format means"* — the same
  argument-from-the-format that justified the reflow itself.
- **This is the reflow's first real test against a non-trivial block**, and it failed.
  Worth noting the sequence: the reflow shipped, the specimen swap exercised it, the bug
  surfaced within six minutes of commit time. The class of defect is one only a change
  of content could have found.

### `website/tests/specimen.spec.ts` (+9/−1)

- Block markers are normalised on **both** sides, for a stated reason: *"the source
  carries one '>' per line, the card renders the block once, so the counts legitimately
  differ."*
- **Inline markers — `##`, `**`, `*(…)*` — are still compared as-is.** The loosening is
  scoped to exactly the thing that legitimately differs, which is what keeps the guard
  meaningful. *"The words must match exactly, and they do."*

### `website/components/lib/skills.ts` (+31/−2)

- The new specimen entry, *"generated from the file rather than retyped"* — the practice
  entry 055 makes universal one commit later, after this spec finds five of six
  hand-written specimens were not verbatim.

## Files changed

```
 website/components/Hero.tsx                 |  11 ++++++++++-
 website/components/lib/skills.ts            |  33 +++++++++++++++++++++++++++++++--
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
 website/tests/specimen.spec.ts              |  10 +++++++++-
 14 files changed, 50 insertions(+), 4 deletions(-)
```

---

_Generated by `/changelog-tracker` from `git log -1` and `git show --stat`. Every
fact here comes from git: **faithful, not generative.**_
