# explore(website): three directions for the revamp, generated against the language doc

- **Commit:** `3333f3310e89dd6c52d2a17efdc047cd35fe69c2` (`3333f33`)
- **Author:** Vidhunnan Murugan
- **Date:** 2026-08-19

## Commit message

The first real run of design-explore, and the first generation permitted under
ADR 0022. All three of its conditions held: a written visual intent existed first
(design/system/language-website.md, written an hour earlier), the artifacts are
candidates and say so, and the verdict belongs to exploration-log and
design-decisions rather than to this round.

Tier resolved to docs/concepts/website/ by rule 1 — the path declared in CLAUDE.md's
design-setup routing table. design/explorations/ does not exist and canon was not
used, which is ADR 0010 working as specified rather than as a hypothetical.

Three directions on three distinct structural axes, none of them colour:

- A, Marked Output (type contrast) — one face, three sizes, hierarchy from case and
  colour. The redline is the only visual event, so the eye lands on the unrecorded
  reason first.
- B, Running Log (layout structure) — five numbered dated entries down a gutter
  instead of titled sections. Append-only drawn rather than described: entry 04 is a
  superseded direction, struck and still present.
- C, Accession (density) — a provenance rail on every object. The specimen's rail
  ends in "Rationale — provenance unknown", which makes the fidelity claim structural
  instead of asserted.

The shipped site is carried as an unlettered baseline column so the three read as
departures, not as a fresh start.

Every hard constraint checked per direction and recorded in directions.md. One
caveat stated rather than buried: the no-CDN constraint means local system fonts
only, so type indicates register — mono, serif, sans — not the final faces. A
direction cannot be rejected on the typeface it happens to render in.

Also recorded: none of this has been shown to anyone. The risks in the matrix are
reasoned, not observed.

## Changes in detail

### `docs/concepts/website/website-revamp/directions.md` (new)

- The round's written record: the question it asks (*what structural idea should carry
  a page whose content is records?*), the four-column comparison matrix — baseline plus
  A, B and C, with a row each for axis, thesis, bet, risk and how the gap is shown —
  and a per-direction "look at" note naming what to judge each one on.
- Opens with the candidates-not-a-record blockquote the skill stamps: nothing here is
  evidence that anything was decided or shipped; `/exploration-log` records the
  verdict and `/design-decisions` records why.
- §Merging names three ideas worth carrying across directions — B's gutter with A's
  type, C's provenance rail scoped to specimens only, and A's matrix in any of them,
  the last on the grounds that the table is nearly identical in all three and is
  therefore settled rather than undifferentiated.
- §Constraints honoured checks all seven hard constraints from the language doc and
  marks each **Honoured**, with one caveat stated in the open: the no-CDN rule means
  local system fonts only, so type here indicates *register* — mono, serif, sans — and
  a direction cannot be rejected on the typeface it happens to render in.
- Closes with **Not tested:** none of it has been shown to anyone, `design/research/`
  is empty, and the risks in the table are reasoned rather than observed.

### `docs/concepts/website/website-revamp/index.html` (new)

- The contact sheet: three linked cards carrying each direction's letter, axis, name
  and what it believes; the comparison matrix; and the same candidates-not-a-record
  blockquote.
- Self-contained — the eleven palette tokens are copied verbatim from `globals.css`
  in both modes, type is a system monospace stack, and there is no script.

### `docs/concepts/website/website-revamp/a-marked-output.html` (new)

- **Axis: type contrast.** One face at three sizes, hierarchy from case, weight and
  colour. The redline is the only visual event on the page, so the unrecorded reason
  and the unanswered question are what the eye lands on first.

### `docs/concepts/website/website-revamp/b-running-log.html` (new)

- **Axis: layout structure.** Five numbered, dated entries down a left gutter instead
  of titled sections. Append-only is drawn rather than described — entry 04 is a
  superseded direction, struck through and still on the page.

### `docs/concepts/website/website-revamp/c-accession.html` (new)

- **Axis: density.** A provenance rail on every object — source file, author, recorded
  and decided dates. The specimen's rail ends in `Rationale — provenance unknown`,
  which makes the fidelity claim structural instead of asserted.

## Files changed

```
 .../website/website-revamp/a-marked-output.html    | 106 +++++++++++++++++
 .../website/website-revamp/b-running-log.html      | 131 +++++++++++++++++++++
 .../website/website-revamp/c-accession.html        | 121 ++++++++++++++++++
 docs/concepts/website/website-revamp/directions.md |  91 ++++++++++++++
 docs/concepts/website/website-revamp/index.html    |  96 +++++++++++++++
 5 files changed, 545 insertions(+)
```

---

_Generated by `/changelog-tracker` from `git log -1` and `git show --stat`. Every
fact here comes from git: **faithful, not generative.**_
