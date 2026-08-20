# docs: changelog 044–059, and exploration rounds 3–5

- **Commit:** `7e72ec3ae30250d65ce4124174ca70974e0e4fdb` (`7e72ec3`)
- **Author:** Vidhunnan Murugan
- **Date:** 2026-08-20

## Commit message

Sixteen entries covering every substantive commit after d7c630e, across both
prod-stable and this branch. Only the PR #22 merge was skipped.

Rounds 3, 4 and 5 appended to the exploration log. The sticky 01–04 rail is the
record worth having: built, screenshotted, and cut — it read as documentation
furniture, an anti-reference the language doc names by hand, and the 246px it took
was what the headline needed. Six other kills carry their reasons: the shadow pair,
the lead card, markers in chrome, the "14 skills" counter, the pause control, and
the reserved-caption fix's justification, which retired while its constraint stayed.

FIVE MORE OF MY COMMIT MESSAGES DID NOT SURVIVE A CHECK, and the entries carry the
corrections rather than repeating the claims:

- "four hours earlier" (218c91d) — seventeen minutes by commit timestamp.
- "four months after ADR 0009 retired it" (10b64af) — eighty-four minutes, the same
  evening. The design tier only starts 2026-08-16; no four-month interval exists
  anywhere in it.
- "11 zips, smaller than the og.png already shipping" (10b64af) — 90,775 bytes
  against og.png's 62,462. They are 45% LARGER in total; the claim is true only per
  archive.
- "the comment above MATRIX now says so" (62c7a59) — the diff is four string values;
  no comment was touched, it already existed. The same message says the four red
  rows are unchanged and then describes changing two of them.
- "FIXES THE OVERLAP" (1c7f754) — the broken descendant selectors never reached a
  tracked file, so the fix cannot be verified from history. Recorded as unverifiable
  rather than asserted or denied, the way entry 042 handled the same situation.

Three things could not be documented faithfully and say so: rounds 4 and 5 have no
exploration artifact (both were built straight into website/), no screenshot of the
cut rail exists in git, and the test-pass counts come from commit messages because a
diff cannot yield them.

## Changes in detail

**Eighteen files, 2,330 insertions, zero deletions.** A pure append: sixteen new
per-commit entries, the CHANGELOG index, and 289 lines onto the exploration log.

### Why this was documented at all

**Seventeen of the eighteen files are `changelog/`, which the protocol says to skip.**
It is documented anyway because the eighteenth is not:
`docs/concepts/website/website-revamp.md` gains **289 lines** — rounds 3, 4 and 5 of the
exploration log, which is substantive work in the **explorations tier**, the one subfolder
of `docs/concepts/` that CLAUDE.md marks append-only and **not** disposable.

This is the precedent [entry 038](./038-catch-up-032-037-and-register-the-handoff-protocol.md)
set and [entry 044](./044-document-040-043-and-correct-four-claims.md) followed, both in
the same words: *a catch-up commit that **also** does substantive work outside
`changelog/` is documented for that work.* Recording it here so the exception reads as a
rule being applied rather than as an oversight — and so the ratio is visible: **044 was
five changelog files against two substantive ones; this is seventeen against one.** The
one is 289 lines — the exploration log goes **143 → 432 lines**, so this commit is twice
again everything the file previously held.

### Coverage: sixteen commits, and where they live

- **Twelve on this branch**, contiguous and in order: `c36625c`, `714e0ea`, `edf8025`,
  `b9dd1a3`, `9373c37`, `62c7a59`, `fdc98f2`, `1c7f754`, `b014643`, `6997e28`, `5952626`,
  `7699f59` → entries 048–059.
- **Four that exist only on `feat/website-revamp`**: `3a80f62`, `218c91d`, `10b64af`,
  `3ddee88` → entries 044–047. **None of the four is an ancestor of this commit.** Their
  content reached `prod-stable` inside `c8c3bf2` *"Feat/website revamp (#22)"* — 101 files,
  7,421 insertions — and `git branch --contains` still finds them only on the original
  branch.
- **On the skipped commit:** `c8c3bf2` has a **single parent** (`773be0d`), so
  `git log --merges d7c630e..6c04582` returns nothing at all — it is a squash, which git
  does not classify as a merge. The message's *"only the PR #22 merge was skipped"* holds
  in substance: what was skipped is the one commit that would have flattened four rounds
  of work into a single 101-file entry, and the four commits it squashes are documented
  individually instead. That is the better record; it is worth knowing that the protocol's
  *"merge commits are omitted"* clause was applied to a commit git reports as an ordinary
  one.

### The exploration log, rounds 3–5 (`+289`, all additions)

Three rounds, each in the tier's own `What changed` / `What we learned` / `Verdict`
shape, plus a closing `## What rounds 3–5 cost, and what they bought`:

- **Round 3 — Chrome, scale, composition, surface**
- **Round 4 — Flatten it, and take the syntax out of the chrome**
- **Round 5 — Truthful tags, real downloads, and two retirements reopened**

**Seven kills are recorded with their reasons**, which is the point of an append-only
explorations tier — the sticky 01–04 rail leading, then *"the round 3 shadow pair · Killed,
seventeen minutes after it was committed"*, the lead card *"with the cost written into the
file"*, markdown markers in page chrome, the `14 skills` / `7 of 14` counter, the pause
control *"at the owner's request, with the consequence on the record"*, and the
reserved-caption fix, **kept while the reason for it retired inside the same round**
(`b014643` reserved three caption lines to stop the arrows moving; `6997e28` top-aligned
them, making the reservation independent of caption length — the height stays, its original
justification does not).

**The rail's record is the one that could not be finished, and says so.** The log states
the 246px figure *"is stated in `git:467dc5b`'s message and nowhere else"*, and that no
screenshot of it survives in git. A direction that was built, seen and cut leaves nothing
behind but the sentence someone wrote about it.

### Four of the sixteen entries carry a Corrections section

`## Corrections to the commit message` appears in **045, 046, 053 and 055** — five
corrections, because `10b64af` contributes two. **Spot-checked against git, all four
numeric claims hold:**

| Correction | Checked how | Result |
|---|---|---|
| *"four hours earlier"* → seventeen minutes | `467dc5b` 18:52:39 → `218c91d` 19:09:42 | **17m 03s** ✓ |
| *"four months after ADR 0009"* → eighty-four minutes | `e05015d` 18:05:34 → `10b64af` 19:29:13 | **83m 39s** ✓ |
| the design tier admits no four-month interval | earliest dates in `design/decisions/README.md` | **2026-08-16** ✓ |
| *"11 zips, smaller than og.png"* → 45% larger | sum of the eleven committed archives vs `og.png` | **90,775 vs 62,462 bytes = +45.3%** ✓ |

The zip figure is the sharpest of them: the claim is true *per archive* — the largest
single zip is 12,702 bytes — and false for the set, which is the comparison the original
sentence actually invited.

### What the commit declines to claim

Three gaps are named rather than papered over: **rounds 4 and 5 have no exploration
artifact** (both were built straight into `website/`, so the log's `Links:` line reads
*"no exploration artifact — this round was built directly"*), **no screenshot of the cut
rail exists in git**, and **the test-pass counts are inherited from commit messages**
because a diff cannot produce them. The fifth correction follows the same rule for
`1c7f754`'s *"FIXES THE OVERLAP"*: the broken selectors never reached a tracked file, so it
is recorded as **unverifiable** — neither asserted nor denied — the way entry 042 handled
the artifact's callout kicker.

## Files changed

```
 changelog/CHANGELOG.md                                                                            |  41 ++++++++++++++
 changelog/commits/044-document-040-043-and-correct-four-claims.md                                 | 104 ++++++++++++++++++++++++++++++++++
 changelog/commits/045-round-4-flatten-it-drop-the-syntax-from-chrome-open-the-catalogue.md        | 201 +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
 changelog/commits/046-round-5-honest-tags-downloads-a-filterable-catalogue-a-cycling-installer.md | 232 +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
 changelog/commits/047-commit-the-skill-zips.md                                                    | 119 +++++++++++++++++++++++++++++++++++++++
 changelog/commits/048-move-the-catalogue-filter-into-the-section-header.md                        | 109 ++++++++++++++++++++++++++++++++++
 changelog/commits/049-surface-tags-become-pills.md                                                |  75 +++++++++++++++++++++++++
 changelog/commits/050-the-catalogues-command-becomes-the-pressable-block.md                       |  86 ++++++++++++++++++++++++++++
 changelog/commits/051-only-one-catalogue-row-open-at-a-time.md                                    |  83 +++++++++++++++++++++++++++
 changelog/commits/052-the-specimen-reflows-its-paragraphs.md                                      | 100 +++++++++++++++++++++++++++++++
 changelog/commits/053-the-matrix-names-a-condition-not-a-verdict.md                               | 128 ++++++++++++++++++++++++++++++++++++++++++
 changelog/commits/054-the-hero-specimen-shows-a-decision-not-an-absence.md                        | 117 ++++++++++++++++++++++++++++++++++++++
 changelog/commits/055-ten-specimens-the-reader-steps-through.md                                   | 181 +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
 changelog/commits/056-the-specimen-arrows-hold-still-while-you-step.md                            |  95 +++++++++++++++++++++++++++++++
 changelog/commits/057-top-align-the-specimen-arrows.md                                            | 116 ++++++++++++++++++++++++++++++++++++++
 changelog/commits/058-the-specimen-advances-on-a-timer.md                                         | 152 +++++++++++++++++++++++++++++++++++++++++++++++++
 changelog/commits/059-the-motion-spec-says-two-exceptions-again.md                                | 102 +++++++++++++++++++++++++++++++
 docs/concepts/website/website-revamp.md                                                           | 289 ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
 18 files changed, 2330 insertions(+)
```

---

_Generated by `/changelog-tracker` from `git log -1` and `git show --stat`. Every
fact here comes from git: **faithful, not generative.**_
