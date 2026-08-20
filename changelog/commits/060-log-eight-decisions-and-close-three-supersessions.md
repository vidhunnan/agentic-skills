# docs: log eight decisions from the revamp, and close three supersessions

- **Commit:** `6c04582c42ec16288090d99b6b24d70ab66c6aea` (`6c04582`)
- **Author:** Vidhunnan Murugan
- **Date:** 2026-08-20

## Commit message

Design 0012–0017 and repo 0024–0025, covering rounds 4 and 5 and the specimen work.
Everything here was decided in conversation over two days and existed only in commit
messages, which is the condition this tier exists for.

  0012  markdown markers leave the chrome and stay in the records
  0013  shadows removed; a border and one tonal step carry containment
  0014  the catalogue is one flat list of fourteen
  0015  search returns, as a filter over the catalogue
  0016  the installer prints every command the catalogue prints, on purpose
  0017  ten records, stepped by the reader and advanced by a timer
  0024  skills ship as build-time zips, committed to the repo
  0025  section prose moves out of components into a content module

Supersessions: 0009 → 0015, 0010 → 0017, repo 0023 → 0025. Only Status lines and
dated Follow-up entries were touched on those three; 0007 gains a Follow-up and
keeps its Accepted status, because 0012 narrows one clause of it rather than
replacing the direction.

TWENTY PLACES SAY *(reason not stated)*. That is the point of the exercise, not a
shortfall in it. Most of these decisions were made in conversation where the commit
message is the only surviving record, so the message is quoted; where even that is
silent, the gap is written rather than filled with something plausible.

Three records carry an argument rather than an assertion, because each is a reversal
that would otherwise read as a mistake:

- 0015 supersedes 0009 in status but only partly in substance. 0009 decided two
  things — the palette goes, and nothing replaces it. The palette is still gone and
  0015 reaffirms it; the second half is now false. Neither of 0009's revisit
  conditions fired: the catalogue is fourteen rows, not the ~30 it named, and nobody
  asked for record contents. It came back because the owner asked. Said plainly.
- 0016 reinstates half of a defect the brief itself recorded. The page-wide copy
  count went 17 → 30, which is the historical defect's own number, and what
  distinguishes them now is a test contract, quoted in full.
- 0017 does NOT clear ADR 0006's three-part bar. The leg about records not fitting
  any other way stopped being true once arrows reached all ten, so the timer rests on
  discovery instead — a weaker claim, written as one. It also records that the page
  fails WCAG 2.2 SC 2.2.2 by decision, after the trade was raised.

0024 records the Vercel root-directory constraint that forced committed build output,
and names the dashboard toggle that would make it unnecessary as the live revisit
condition. Writing it surfaced two defects on prod-stable, reported separately.

## Changes in detail

**Fourteen files, 1,427 insertions against 11 deletions.** Eight new ADRs across both
decision tiers, four existing records touched only where an append-only log permits, and
both indexes updated. **The largest commit ever made to the two decision tiers** — 1,427
lines into `docs/decisions/` and `design/decisions/`, against a previous high of 844 and
nearly double the 715-line original backfill in `f52b824`.

### The eight new records

| ADR | Tier | Insertions | Status at this commit |
|---|---|---|---|
| [0012](../../design/decisions/0012-markdown-markers-leave-the-chrome.md) markdown markers leave the chrome | design | 154 | Accepted |
| [0013](../../design/decisions/0013-no-shadows-borders-and-one-tonal-step.md) no shadows; a border and one tonal step | design | 155 | Accepted |
| [0014](../../design/decisions/0014-the-catalogue-is-one-flat-list-of-fourteen.md) the catalogue is one flat list of fourteen | design | 175 | Accepted |
| [0015](../../design/decisions/0015-search-returns-as-a-catalogue-filter.md) search returns, as a catalogue filter | design | 189 | Accepted · supersedes 0009 |
| [0016](../../design/decisions/0016-the-installer-reprints-every-command-on-purpose.md) the installer reprints every command | design | 160 | Accepted |
| [0017](../../design/decisions/0017-ten-records-stepped-by-the-reader-and-advanced-by-a-timer.md) ten records, stepped and timed | design | 226 | Accepted · supersedes 0010 |
| [0024](../../docs/decisions/0024-skills-ship-as-committed-build-time-zips.md) skills ship as committed build-time zips | repo | 149 | Accepted |
| [0025](../../docs/decisions/0025-section-prose-moves-into-a-content-module.md) section prose moves into a content module | repo | 147 | Accepted · supersedes 0023 |

- **0017 is the longest record in either tier** at 226 lines, which is what a reversal
  costs when it declines to reuse the bar its predecessor was held to.
- **Only 0017 carries this commit's own date.** The other seven are dated `2026-08-19`
  while the commit lands on `2026-08-20` — the decisions are dated when they were made,
  not when they were written down, which is the correct behaviour for this tier and worth
  knowing before diffing the dates against `git log`.

### The append-only rule held, and the diff proves it

The commit message's narrowest checkable claim is that on the three superseded records
*"only Status lines and dated Follow-up entries were touched."* **Verified against the
diff — all three, exactly:**

- [0009](../../design/decisions/0009-the-command-palette-is-retired.md): `- **Status:**
  **Accepted**` → `- **Status:** Superseded by [0015]`, plus a dated `2026-08-19` entry
  under `## Follow-up`. Nothing else in the file moves.
- [0010](../../design/decisions/0010-one-hero-specimen-not-six.md): same shape, `2026-08-20`
  follow-up.
- Repo [0023](../../docs/decisions/0023-site-content-is-split-by-kind-data-vs-prose.md):
  same shape, `2026-08-19` follow-up.
- [0007](../../design/decisions/0007-the-site-is-terminal-rendered-markdown.md) takes a
  follow-up and **no status change** — its `*(none yet)*` placeholder becomes an entry
  arguing that 0012 narrows one clause. It ends *"This record is **not** superseded and
  its status is unchanged,"* and the diff contains no `Status:` line for the file.

### Twenty gaps, counted

**`TWENTY PLACES SAY *(reason not stated)*` is exact.** Counting only added lines in this
commit: **20 occurrences**, distributed 4 in 0012, 3 each in repo 0023 and 0025, and 2 in
each of 0007, 0009, 0010, 0013, 0014, 0015, 0016, 0017, 0024 and the design index. The
message frames it as *"the point of the exercise, not a shortfall in it"* — twenty places
where a plausible reason was available and not written.

### Four defects the diff carries

Recorded because this commit is the record and nobody diffs an ADR index twice:

1. **A corrupted evidence cell.** In `docs/decisions/README.md`, 0023's row changes from
   `` `git:fcea6dd` `` to `` `git:fcea6dd2 `` — an unclosed backtick with a stray `2`
   where the closing one was. It renders as literal text mid-table.
2. **The mermaid graph gains a duplicate edge and a redefined node.** `0006 -.->|superseded
   by| 0010` now appears twice, and `0010["0010 · One specimen"]` is declared a second
   time with `:::superseded` appended. Mermaid tolerates both; the source no longer reads
   as a single pass.
3. **One sentence in the design index went stale inside its own paragraph.** The counts
   are updated — *"11 decisions logged, 5 superseded, 6 stand"* becomes *"17 decisions
   logged, 7 superseded, 10 stand"*, which matches the table exactly (10 `Accepted`, 7
   `Superseded by`). The sentence immediately after it still reads *"Four of the five were
   superseded on the same day"*, and there is no longer a five for it to refer to.
4. **The new index paragraph names the wrong record in its lead.** It is headed
   *"**[0015] is superseded in status, partial in substance**"* — but 0015 is the
   superseding record; 0009 is the one superseded, which is what the rest of the same
   paragraph then correctly describes. The commit message states it the right way round
   (*"0015 supersedes 0009 in status but only partly in substance"*), so this is a slip in
   the file rather than in the reasoning.

### What the indexes now say

- **`design/decisions/README.md` (+24/−6):** 0009 and 0010 flip to `Superseded by`, their
  follow-up counters go `1` → `2`, 0007's goes `0` → `1`, and six rows are added for
  0012–0017. Two new paragraphs are appended: *"Two chains run three deep"* — 0004 → 0005
  → 0009 → 0015 for search and 0006 → 0010 → 0017 for the specimen — and the partial-
  supersession note carrying defect 4 above.
- **`docs/decisions/README.md` (+8/−6):** rows for 0024 and 0025, 0023 flipped to
  superseded, *"23 decisions logged; 21 stand"* → *"25 decisions logged; 22 stand"*
  (consistent: 25 logged, 3 superseded), and *"Two supersessions"* → *"Three
  supersessions, one of which crosses tiers."*

### The debt entry 059 named is now partly paid

Entry 059 recorded **three open ADR debts** in a row: the content-split ADR owed by
`467dc5b`, 0009's reinstatement, and 0010's retirement being re-granted in two commit
messages that no record held. **This commit closes all three** — 0025, 0015 and 0017
respectively. The gap between the commit message asserting a decision and the tier holding
it ran four commits at its longest.

## Files changed

```
 design/decisions/0007-the-site-is-terminal-rendered-markdown.md                    |  13 ++++++-
 design/decisions/0009-the-command-palette-is-retired.md                            |  16 +++++++-
 design/decisions/0010-one-hero-specimen-not-six.md                                 |  14 ++++++-
 design/decisions/0012-markdown-markers-leave-the-chrome.md                         | 154 ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
 design/decisions/0013-no-shadows-borders-and-one-tonal-step.md                     | 155 +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
 design/decisions/0014-the-catalogue-is-one-flat-list-of-fourteen.md                | 175 ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
 design/decisions/0015-search-returns-as-a-catalogue-filter.md                      | 189 +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
 design/decisions/0016-the-installer-reprints-every-command-on-purpose.md           | 160 +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
 design/decisions/0017-ten-records-stepped-by-the-reader-and-advanced-by-a-timer.md | 226 +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
 design/decisions/README.md                                                         |  24 ++++++++++--
 docs/decisions/0023-site-content-is-split-by-kind-data-vs-prose.md                 |   8 +++-
 docs/decisions/0024-skills-ship-as-committed-build-time-zips.md                    | 149 ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
 docs/decisions/0025-section-prose-moves-into-a-content-module.md                   | 147 +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
 docs/decisions/README.md                                                           |   8 ++--
 14 files changed, 1427 insertions(+), 11 deletions(-)
```

---

_Generated by `/changelog-tracker` from `git log -1` and `git show --stat`. Every
fact here comes from git: **faithful, not generative.**_
