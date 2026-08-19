# docs(design): log exploration round 1 and design ADR 0007

- **Commit:** `9e19cc47263d95cd86a5c8fc39b5004ac72dd505` (`9e19cc4`)
- **Author:** Vidhunnan Murugan
- **Date:** 2026-08-19

## Commit message

The verdict from round 1, recorded before round 2 starts — which is the whole point
of the tier, since the reason is recoverable now and won't be in three weeks. Design
ADR 0002 is the cautionary tale two files away: three families, 608KB of webfonts,
and nobody could reconstruct why four weeks later.

The owner's reason is quoted verbatim rather than tidied:

  "this direction feels more skill styles and markdown styles and which represent
   all the context or how all files stores also"

A wins, narrowed to terminal-rendered markdown. B and C are killed — and the log
records the uncomfortable part rather than smoothing it: their stated axes were never
genuinely tested. The round 1 comps carried 3 of 14 skills, 1 of 6 specimens, no nav
and no footer — a fifth of the page. Layout structure and density are both properties
of a long, dense page, and neither direction got one. They lost on register, on a
variable they weren't built to be judged on. In six months the artifacts will still be
on disk and the temptation will be to assume they lost on their merits.

The round's reusable finding: an exploration built at a fifth of the content tests
register and nothing else, and should be scoped to that honestly rather than claiming
three axes it cannot exercise.

ADR 0007's supersession crosses tiers. It replaces the direction in repo ADR 0017,
which predates the design stack and so was logged in docs/decisions/. The Supersedes
field points inside its own tier only, so the link is carried as a note in 0007, a
dated Follow-up on 0017, and an explanation in both indexes.

0017 also gains a second follow-up for two colour values that never matched what
shipped — redline #D0361B vs #bf3018, --mute #8B8B7E vs #6b6b60, both darkened for
contrast and neither recorded at the time. Appended rather than corrected, because
the body of a logged decision is frozen even when it is wrong.

0007 states what did NOT cause the supersession: no evidence the old direction was
failing. Three days old, empty research tier, analytics returning 404. It was
reopened because the argument changed and because 0017 recorded no revisit condition.

## Changes in detail

### `docs/concepts/website/website-revamp.md` (new)

- The exploration log's first round, opened as an append-only file: rounds are frozen,
  new rounds go at the bottom, and a killed direction is never deleted.
- §What changed records that this was the first generation permitted under ADR 0022,
  generated against a language doc written an hour earlier that deliberately carried
  constraints only, so the round was not pre-decided.
- §What we learned states the uncomfortable finding rather than the flattering one:
  the comps carried 3 of 14 skills, 1 of 6 specimens, 0 receipts, no nav and no footer
  — ~6.5KB against the real page's ~104KB — so they could only communicate **register**.
  The round tested one variable when it was scoped to test three.
- §Verdict: **A kept**, narrowed in the same breath to terminal-rendered markdown, with
  the owner's reason quoted verbatim rather than tidied. **B and C killed**, each
  marked as lost on register with the explicit caveat that its stated axis was never
  tested, and each with its surviving merge candidate named.
- A closing section states the round's reusable method finding — an exploration built
  at a fifth of the content tests register and nothing else — and says plainly that two
  directions were killed on a variable they were not built to be judged on, so that a
  later reader does not assume they lost on their merits.

### `design/decisions/0007-the-site-is-terminal-rendered-markdown.md` (new)

- The design fork: monospace throughout, box-drawing rules, **markdown syntax present
  but recessive** rather than hidden, colour as signal only, hierarchy from case,
  weight and colour. The palette is inherited entire, both modes, unchanged.
- Opens with a blockquote explaining that it supersedes a decision in the *other* tier
  and is cross-referenced rather than listed under `**Supersedes:**`, because that
  field points inside its own tier.
- §Context states what did **not** cause the reopening: no evidence the shipped
  direction was failing — the site was three days old in its current form,
  `design/research/` was empty, and Vercel Web Analytics returned `404 — not found`. It
  was reopened because the argument the page makes changed and because 0017 recorded
  no revisit condition.
- §Options considered carries five rows, including both anti-references and B and C
  with *"its axis was never genuinely tested"* recorded as part of why each lost.
- §Decision quotes the owner's rationale verbatim and deliberately unparaphrased, then
  grounds the choice in two things already on record: the library ships `.md` files, and
  the language doc's brand posture is *adjacent to Claude Code*.
- §What we gave up names four costs, leading with the paper metaphor and with
  typographic range — *"the direction's central bet and its central cost"* — and ending
  with distance from the developer-docs template, a risk the brief explicitly declined
  as a failure condition and which is therefore carried here instead.
- §What would make us revisit carries four triggers, including one of the losing
  directions being built at full content and working better.

### `docs/decisions/0017-the-website-design-direction-is-swiss-whitepaper.md` (modified)

- Two permitted mutations only. `**Status:**` becomes *Superseded by design ADR 0007*,
  and two dated entries are appended under `## Follow-up`. The frozen body is untouched.
- The first entry records the supersession, why it crosses tiers, and what did not cause
  it, citing `docs/concepts/website/website-revamp.md` round 1 and `git:3333f33`.
- The second records two colour values in the frozen Decision that never matched what
  shipped — redline `#D0361B` against `#bf3018`, and `--mute` `#8B8B7E` against
  `#6b6b60` — both darkened for contrast and neither logged at the time. Appended
  rather than corrected, because the body of a logged decision is frozen even when it
  is wrong.

### `design/decisions/README.md` (modified)

- 0007 added to the index table. The unsuperseded count moves from 5 to 6.
- A paragraph added under the supersession graph stating that one supersession crosses
  tiers and is therefore not in the graph, with the three places the link is carried.

### `docs/decisions/README.md` (modified)

- 0017's row updated: status becomes *Superseded by design 0007*, follow-up count 0 → 2.
- The summary line changes from *"No supersessions yet"* to *"22 decisions logged; 21
  stand"*, and a paragraph explains why there is still no graph here — the one
  supersession points into the other log, because 0017 is a design direction that
  predates the design context stack (ADR 0020). Any future design-direction ADR goes in
  `design/decisions/`.

## Files changed

```
 .../0007-the-site-is-terminal-rendered-markdown.md | 129 +++++++++++++++++++++
 design/decisions/README.md                         |   5 +-
 docs/concepts/website/website-revamp.md            |  89 ++++++++++++++
 ...website-design-direction-is-swiss-whitepaper.md |   5 +-
 docs/decisions/README.md                           |   6 +-
 5 files changed, 229 insertions(+), 5 deletions(-)
```

---

_Generated by `/changelog-tracker` from `git log -1` and `git show --stat`. Every
fact here comes from git: **faithful, not generative.**_
