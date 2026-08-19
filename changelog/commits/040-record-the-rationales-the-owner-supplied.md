# docs(design): record the rationales the owner supplied, and one that stands unfilled

- **Commit:** `42b8f137b5d6aab357c13499debae2483350c40a` (`42b8f13`)
- **Author:** Vidhunnan Murugan
- **Date:** 2026-08-19

## Commit message

Three of the four gaps closed by asking. Each is an additive Follow-up; no frozen
text was touched.

0008 — Geist Mono: variable font, and it reads like a marked-up file. Recorded with
the seam showing: fcea6dd words the variable font as "it turned out to be", so it is
logged as a bet that paid off rather than the deciding factor, and the third clause
("we have to build on a new direction") is recorded unresolved rather than read as
a rejection of Plex.

0009 — the palette was retired for fit, not failure. The direction it was built for
was replaced and the replacement did not call for it. That converts a retirement into
a deferral, which is a materially different record from what the frozen text implies.

0010 — asked whether "six specimens as a static gallery" was considered, the owner did
not recognise the option. So it was not a weighed alternative; it was constructed when
the record was written. Logged with the general hazard named: an alternatives table is
where a plausible-but-unreal option appears, because a decision reads better with a
loser in it.

0023 — no reason for the existing split was given, so the gap stands and is not
retro-filled. What was given was an instruction to end the split. That is intent, not
a decision: when the prose actually moves, it needs its own ADR superseding 0023.

## Changes in detail

**Four files, four appended Follow-up entries, nothing else.** Verified against the
diff: every hunk in this commit replaces a `*(none yet)*` placeholder under an existing
`## Follow-up` heading. **No `**Status:**` line and no frozen body text was touched in
any of the four** — which is what the append-only rule permits and what the commit
message claims.

The four records are the ones commit `e05015d` (entry 039) logged the previous day
carrying `*(reason not stated)*`. This is the answer coming back, one day later, from
the only source that could supply it.

### `design/decisions/0008-geist-mono-alone.md` (modified, +23/−1)

- The rationale for Geist Mono is no longer unstated. The owner's answer is quoted
  **as dictated rather than tidied**, with the one editorial insertion marked inline:
  *"it has a lot of other features. Right? For example, variable font and other things.
  And also, it's very close to how a marked \[-up\] file might \[read at\] top level, but
  we have to build on a new direction."*
- The entry splits the answer into three parts and grades each. **Variable font** is
  corroborated by `git:fcea6dd` — 39 woff2 files and 608KB becoming 6 files and 68KB —
  but the entry records that the commit words it as *"it turned out to be a variable
  font"*, i.e. found during the build, **so it reads as a confirmed bet rather than the
  deciding factor**. **Reads like a marked-up file** is identified as ADR 0007's
  direction argument applied to the face, not a new claim.
- The third clause — *"we have to build on a new direction"* — is **recorded as said and
  deliberately not resolved**: whether it means the incumbent was rejected *because* it
  belonged to the superseded direction is marked not stated.
- Closes with the rule that makes the append-only tier work: *"This does not make the
  frozen text above wrong. At the time of the decision, no reason was on record; that
  remains true... What changed is what the next reader knows."*

### `design/decisions/0009-the-command-palette-is-retired.md` (modified, +19/−1)

- The reason is **fit, not failure**: *"for the new website direction, we would have not
  needed it. But maybe we can add it in later stages, because right now we can keep it
  simpler."*
- The entry names what that corrects. Nothing about the palette was found wanting; a
  reader would reasonably have read the frozen text as *"it was cut because it was not
  used"* — **an assumption no evidence ever supported**, since the analytics 0005 asked
  for were never obtainable.
- It also **converts a retirement into a deferral**, and says why that is not a licence:
  *"maybe we can add it in later stages"* is an intent, not a plan, and a rebuild would
  still need a new decision, because 0005's evidence *"still cannot be collected while
  there is nothing to measure."*

### `design/decisions/0010-one-hero-specimen-not-six.md` (modified, +14/−1)

- Asked whether the "six specimens as a static gallery" alternative was considered, the
  owner **did not recognise the option**: *"six specimens as a gallery — I don't know
  what that is."*
- So it was not a fork that was weighed and rejected — **on the evidence it was
  constructed when the record was written**, which is what the `*(not recorded)*` marker
  in §Evidence had flagged. The row stays in the frozen table; the entry instructs the
  reader not to cite it as proof the gallery was tried.
- The entry generalises it rather than leaving it as a one-off: *"an alternatives table
  is the easiest place in an ADR for a plausible-but-unreal option to appear, because a
  decision reads better with a loser in it."*

### `docs/decisions/0023-site-content-is-split-by-kind-data-vs-prose.md` (modified, +22/−1)

- **The one gap that stays open.** No reason for the existing data/prose split was given,
  so the `*(reason not stated)*` markers remain correct and are explicitly **not
  retro-filled**.
- What was given instead was an instruction about what happens next: *"instead of
  hardcoding, can you maybe make it into proper tokens and things like that."* The entry
  records this as **a reversal in intent, recorded the same day the decision itself was
  logged** — and holds the line that **intent is not a decision**: *"When the prose actually moves,
  that needs its own ADR superseding this one."*
- Attaches the checkable version of the same failure: the page's five derived counts
  drifted three times in one day, **32 → 37 → 39 documented commits**.

### What this commit did not update

- **Neither index was touched.** `design/decisions/README.md` still carries the note
  *"Four records in this tier carry an unrecorded rationale"* naming 0002, 0008, 0009 and
  0010 — three of which now have their reason on record — and the follow-up counters for
  0008, 0009 and 0010 still read `0`, as does 0023's row in `docs/decisions/README.md`.
  This is stated as a fact about the tree, not as a defect the commit message claims.

## Files changed

```
 design/decisions/0008-geist-mono-alone.md                          | 23 ++++++++++++++++++++++-
 design/decisions/0009-the-command-palette-is-retired.md            | 19 ++++++++++++++++++-
 design/decisions/0010-one-hero-specimen-not-six.md                 | 14 +++++++++++++-
 docs/decisions/0023-site-content-is-split-by-kind-data-vs-prose.md | 22 +++++++++++++++++++++-
 4 files changed, 74 insertions(+), 4 deletions(-)
```

---

_Generated by `/changelog-tracker` from `git log -1` and `git show --stat`. Every
fact here comes from git: **faithful, not generative.**_
