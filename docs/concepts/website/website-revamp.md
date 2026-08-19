# Exploration — The website revamp

Status: active · Started: 2026-08-19

> Append-only. Rounds below are frozen; new rounds go at the bottom. **A killed
> direction is never deleted** — that record is the point of this file.

## Round 1 — Three structural directions, at a fifth of the content

**Date:** 2026-08-19
**Testing:** given a page whose content is records — paths, dated entries, numbered
decisions, trust labels and gaps — what **structural idea** should carry it? Not the
palette (inherited entire) and not the typeface, but what the page is shaped like.
**Links:** [`website-revamp/index.html`](./website-revamp/index.html) ·
[`website-revamp/directions.md`](./website-revamp/directions.md) · `git:3333f33`

### What changed

The first round of the revamp, and the first generation permitted under
[ADR 0022](../../decisions/0022-generation-is-allowed-only-into-explorations.md).
Generated against [`design/system/language-website.md`](../../../design/system/language-website.md),
written an hour earlier and deliberately carrying **constraints only, no direction**,
so the round was not pre-decided.

Three directions on three distinct axes, none of them colour:

- **A — Marked Output** *(type contrast)*. One face, three sizes. Hierarchy from case,
  weight and colour; the redline the only visual event.
- **B — Running Log** *(layout structure)*. Numbered, dated entries down a gutter
  instead of titled sections. Append-only drawn rather than described — one entry is a
  superseded direction, struck and still present.
- **C — Accession** *(density)*. A provenance rail on every object; the specimen's
  rail ends in `Rationale — provenance unknown`.

The shipped site was carried as an unlettered baseline column so the three read as
departures rather than as a fresh start.

### What we learned

**The comps were too thin to test what they were scoped to test.** They carried 3 of
14 skills, 1 of 6 specimens, 0 receipts, no nav and no footer — roughly a fifth of the
page, ~6.5KB against the real page's ~104KB.

That has a consequence the round has to own: **thin comps can only communicate
register.** Strip out density, rhythm and how a long page behaves, and the only
variable left is typographic voice. So the round tested *one* variable when it was
scoped to test three, and the feedback it produced was a register verdict —
*"the html feels more of POC"* and *"the content of the website feels empty."*

**B's and C's stated axes were therefore never genuinely exercised.** Layout structure
and density are both properties of a long, dense page. Neither direction got one.

What did come through, and is the round's real finding: **the markdown / skill-file
register is the one that pulled.** The page reading like the files it is about — the
same material as the `.md` records the library produces — was legible even at a fifth
of the content.

### Verdict

**A — Marked Output · Kept.** The owner's reason, recorded verbatim rather than
tidied:

> *"this direction feels more skill styles and markdown styles and which represent all
> the context or how all files stores also"*

Narrowed in the same breath to **terminal-rendered markdown** — what Claude Code
itself shows: monospace, box-drawing rules, markdown syntax present but recessive.

**B — Running Log · Killed.** Lost on register. **Its stated axis was never tested** —
see above — so this is a verdict on voice, not on whether a dated, numbered sequence
is the right structure. Its numbered gutter survives as a merge candidate and is
recorded in `directions.md` as one.

**C — Accession · Killed.** Same caveat, same reason. Its provenance rail survives as
a merge candidate, scoped to specimens rather than applied whole.

---

## Round 2 — The same register, at full content

**Date:** 2026-08-19
**Testing:** round 1 could only test register, because its comps carried a fifth of
the page. So: **does terminal-rendered markdown survive a full page?** Density,
rhythm, and a fourteen-row catalogue are exactly what a thin comp cannot show, and
they are where a monospace register is most likely to fail.
**Links:** [`website-revamp/r2-terminal-markdown.html`](./website-revamp/r2-terminal-markdown.html) · `git:5e1d1ca`

### What changed

One direction, not three — the fork closed in round 1, so this is not a comparison.
Built to the scope round 1 lacked: all 14 skills, all 9 matrix rows, six sections,
nav and footer. 19KB against round 1's ~6.5KB.

The direction was made concrete for the first time. **Markdown syntax is present but
recessive** — `##` before a heading, `**` around bold, the pipes in a table, the
fence ticks around a code block, all rendered in `--mute` rather than hidden.

Two sections were authored that exist nowhere else:

- **The worked loop** — `decisions-logger` from "you decided something" through
  reading the evidence, asking what it cannot find, writing the record, registering
  the rule, and offering again next session unasked. Step 4 named as the one nothing
  else does. The shipped site has never shown the mechanism working.
- **Install as a sequence** rather than a menu of fourteen equal commands.

### What we learned

**The register held.** The failure mode a monospace page is most exposed to — a long
catalogue turning into an undifferentiated wall — did not appear at fourteen rows,
because the compact index carries most of them at one line each and only three are
shown in full.

**Recessive syntax turned out to be the strongest reading of a constraint we already
had.** The language doc requires records to be *"shown verbatim, never restyled."*
Showing `##` and `*(reason not stated)*` dimmed rather than hidden **is** verbatim;
rendering them into styled components would not be. The direction and the constraint
turned out to be the same idea, which was not obvious when either was written.

**One craft variable is unresolved and is the main risk:** how dim *recessive* should
be. It is the line between *this is the file* and *this is a costume*, and it was set
by eye in a single pass.

### Verdict

**Kept** — approved for build on 2026-08-19.

Round 2's question was whether the register survives full page length; it was approved
at full content, which answers that question. **No reason beyond round 1's was
separately articulated, and none is invented here** — round 1's stated reason carries.

---

## What this round cost, and what it bought

Round 1 spent a generation cycle to learn something it could not have learned by
argument: that the register was the answer and the structure was not yet the question.
It also produced a reusable finding about the method — **an exploration built at a
fifth of the content tests register and nothing else**, and should be scoped to that
honestly rather than claiming three axes it cannot exercise.

Two directions were killed on a variable they were not built to be judged on. That is
recorded here rather than smoothed over, because in six months the artifacts will
still be on disk and the temptation will be to assume they lost on their merits.
