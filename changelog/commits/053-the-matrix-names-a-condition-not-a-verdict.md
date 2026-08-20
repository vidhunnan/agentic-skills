# feat(website): the matrix names a condition, not a verdict

- **Commit:** `62c7a59c0a3c38c9a1f52699de2c3eeab82f1f11` (`62c7a59`)
- **Author:** Vidhunnan Murugan
- **Date:** 2026-08-20

## Commit message

Four of the nine "what answers it today" values change, per the design:

  git history, badly           -> git history, only changes
  commit messages, badly       -> commit messages
  whatever someone remembered  -> when someone writes it
  whatever someone remembered  -> when someone documents it

Two improvements, and they are the same improvement twice.

The "badly" rows editorialised. A reader who does keep a careful git history was
being told, by a table, that they don't — and that reader is exactly the one this
page needs. "only changes" is a fact about what git records; it argues the same
point without insulting anyone who arrived already doing the work.

And the two rows that both read "whatever someone remembered" now say different
things, which they always should have: one is about what gets written, the other
about what gets documented. A duplicated cell in a nine-row table reads as filler
even when it isn't.

Both new red rows state a CONDITION — "when someone writes it" — rather than a
verdict. That is the honest form of the claim: the answer exists if a person
happens to produce it, and nothing in the toolchain makes them. The comment above
MATRIX now says so, so the next edit knows what the column is for.

The four red rows are unchanged, and matrix-mobile.spec.ts derives from this data,
so it followed on its own. 30 tests passing.

## Corrections to the commit message

The four value changes are exactly as listed — verified line by line against the diff.
Two sentences of commentary around them are not supported.

**1. "The comment above MATRIX now says so" — the comment is not touched by this
commit.**

The diff is **four insertions and four deletions**, all of them `answeredToday` string
values inside the `MATRIX` array. No comment line is added, removed or changed. The
comment the sentence describes does exist —

> *"`answeredToday` is deliberately not absolute. Plenty of teams write some of this
> down; a reader who does will bounce off a table telling them they don't.
> `hasAnswerToday: false` is what paints the redline."*

— but it is **already present at `62c7a59^`**, and entered the tree with the rebuild
(`fcea6dd`, entry 037). The claim is true of the file and false of the commit: the
guidance was there first, and this commit is the guidance being **applied**, not
written. *That is arguably the better story, and it is the one the diff supports.*

**2. "The four red rows are unchanged" — two of the four are exactly what changed.**

`MATRIX` at this commit holds **five rows with `hasAnswerToday: true` and four with
`false`**. The redline is painted by `hasAnswerToday: false`, per the interface's own
comment (*"false → the row is marked in redline"*). Of the four changed values, **two
are on red rows** — *"What are we trying to build?"* and *"What are we still
deciding?"*, the pair that had both read *"whatever someone remembered."*

The message contradicts itself two paragraphs apart: *"Both new red rows state a
CONDITION"* is correct, and *"The four red rows are unchanged"* is not. The sentence
that holds is the one about the **black** rows: the two `badly` values changed are both
on `hasAnswerToday: true` rows, and the two red rows reading *"nothing, by default"* —
*"What did we learn?"* and *"Where did we leave off?"* — are untouched.

## Changes in detail

**Four strings.** 4 insertions against 4 deletions in one file — the smallest source
change in the round and the one with the most argument attached to it.

### `website/components/lib/skills.ts` (modified, +4/−4)

| Question | `hasAnswerToday` | Before | After |
|---|---|---|---|
| What did we try? | `true` | `git history, badly` | `git history, only changes` |
| Why did we choose that? | `true` | `commit messages, badly` | `commit messages` |
| What are we trying to build? | `false` | `whatever someone remembered` | `when someone writes it` |
| What are we still deciding? | `false` | `whatever someone remembered` | `when someone documents it` |

### The two arguments, both worth keeping

- **The `badly` rows editorialised against the reader the page needs.** *"A reader who
  does keep a careful git history was being told, by a table, that they don't — and
  that reader is exactly the one this page needs."* `only changes` is a fact about what
  git records; it makes the same argument without the insult.
- **A duplicated cell reads as filler even when it isn't.** The two rows that both said
  *"whatever someone remembered"* were making genuinely different claims — one about
  what gets **written**, one about what gets **documented** — and printing identical
  text collapsed the distinction. This is the same defect class design ADR 0011 was
  logged for (entry 039): `changelog/` and `decisions/` rendered twice character for
  character in the two parallel stack sections.
- **A condition, not a verdict.** *"the answer exists if a person happens to produce
  it, and nothing in the toolchain makes them."*

### `matrix-mobile.spec.ts` needed no edit

- The regression guard added in entry 041 derives its assertions from `MATRIX` rather
  than hardcoding the strings, so it followed the data change on its own. **The
  diffstat confirms it**: no test file appears. That is the design decision from entry
  041 paying off in the first commit that could have exercised it.

## Files changed

```
 website/components/lib/skills.ts            |   8 ++++----
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
 12 files changed, 4 insertions(+), 4 deletions(-)
```

---

_Generated by `/changelog-tracker` from `git log -1` and `git show --stat`. Every
fact here comes from git: **faithful, not generative.**_
