# docs(changelog): document 040–043, and correct four claims I got wrong

- **Commit:** `3a80f623fe142505db2e5c061cf67ef925e9105a` (`3a80f62`)
- **Author:** Vidhunnan Murugan
- **Date:** 2026-08-19

## Commit message

Entries 040–043 cover the ADR follow-ups, the Playwright suite, the round 3 port
and the motion re-pin.

042 and 041 each carry a Corrections section, because four claims in my own commit
messages do not survive the diff and git history is not rewritable:

- "Both shadow values are alpha of --ink" is true in light and false in dark, where
  the shadows are pure black and --ink is #edece4. Only --inset is alpha of ink.
- "Dark mode carries depth with a highlight instead" — it gets the highlight AND
  its own heavier shadows.
- "Only tokens were added" — --t-h1 was deleted and --t-h2 changed value.
- "The callout kicker was --red in the artifact" is unverifiable from the record:
  the artifact enters git already at --mute. Recorded as neither asserted nor
  denied rather than quietly dropped.
- In 041, "replacing the init scaffold" deleted nothing, because the scaffold was
  never committed, and "five specs" is five test() blocks across three files.

A reader six months out needs to know which sentences in the git log to distrust.

Also corrects both decision indexes, which 42b8f13 left stale: the follow-up
counters for 0008, 0009, 0010 and 0023 still read 0, and the design index still
claimed four records carry an unrecorded rationale after three were answered. The
note now records what actually happened — three of four gaps closed because
somebody asked, hours after the records were written — which is the argument for
marking a gap rather than filling it with a guess.

## Changes in detail

**Documented despite being mostly a changelog commit**, on the precedent entry 038
set: a catch-up commit that *also* does substantive work outside `changelog/` is
documented for that work. Five of its seven files are changelog; the other two are
the corrections to both decision indexes, which are the substantive half.

### `changelog/commits/040`–`043` (new, 661 lines) and `changelog/CHANGELOG.md` (+14)

- Four per-commit entries written from git in one pass, covering `42b8f13`,
  `670c2a9`, `467dc5b` and `d7c630e`. `042` is the largest entry in the log to date
  at 326 lines.
- Two of the four carry a `## Corrections to the commit message` section — the first
  time that section appears anywhere in `changelog/commits/`. It establishes the
  pattern later entries follow: a commit message is frozen in git, so a claim it
  makes that the diff does not support is corrected in the changelog rather than
  silently inherited.

### `design/decisions/README.md` (modified, +7/−5)

- **Three follow-up counters go `0` → `1`** — for [0008](../../design/decisions/0008-geist-mono-alone.md),
  [0009](../../design/decisions/0009-the-command-palette-is-retired.md) and
  [0010](../../design/decisions/0010-one-hero-specimen-not-six.md). This closes the
  gap entry 040 recorded as still open. Worth noting for anyone diffing the file:
  the three replacement rows are written `|1 |` without the leading space the rest
  of the table uses — cosmetic in rendered Markdown, inconsistent in source.
- **The standing note is rewritten from a count to a history.** *"Four records in
  this tier carry an unrecorded rationale"* becomes *"Four records carried an
  unrecorded rationale; three were answered by asking"*, naming each answer and
  restating that the frozen text above each still reads `*(reason not stated)*`
  *"because that is what was true when the decision was made."*
- **One gap is separated out and kept.** [0002](../../design/decisions/0002-a-three-family-type-system-for-the-site.md)
  gets its own paragraph headed *"One stands unfilled."*
- A new closing line states the reusable lesson: *"three of four gaps closed because
  somebody asked, four hours after the records were written. A gap is worth marking
  precisely because it is answerable later; it is not worth inventing a reason to
  avoid."*

### `docs/decisions/README.md` (modified, +1/−1)

- One counter: [0023](../../docs/decisions/0023-site-content-is-split-by-kind-data-vs-prose.md)
  goes `0` → `1` follow-ups. Nothing else in the repo index changes — the standing
  claim that *"the one supersession crosses tiers"*, which entry 039 recorded as no
  longer true, is **not** corrected here.

### What this commit did not do

- **No ADR was written for the content split.** Entries 040 and 042 both recorded
  that `467dc5b`'s prose move *"supersedes 0023's split — that needs its own ADR now
  that it is real, not just intended."* At `3a80f62` the repo decision log still ends
  at 0023 and no successor exists. Correcting the counter is not the same as writing
  the record.

## Files changed

```
 changelog/CHANGELOG.md                                                             |  14 +++++
 changelog/commits/040-record-the-rationales-the-owner-supplied.md                  | 125 ++++++++++++++++++++++++++++++++++++++++++
 changelog/commits/041-a-real-playwright-suite.md                                   | 138 ++++++++++++++++++++++++++++++++++++++++++++++
 changelog/commits/042-round-3-chrome-scale-composition-and-no-more-typed-counts.md | 326 +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
 changelog/commits/043-re-pin-the-motion-spec-to-round-3.md                         |  72 ++++++++++++++++++++++++
 design/decisions/README.md                                                         |  12 ++--
 docs/decisions/README.md                                                           |   2 +-
 7 files changed, 683 insertions(+), 6 deletions(-)
```

---

_Generated by `/changelog-tracker` from `git log -1` and `git show --stat`. Every
fact here comes from git: **faithful, not generative.**_
