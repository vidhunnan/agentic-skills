# 0014. The catalogue is one flat list of fourteen collapsed rows, not three cards plus an index

- **Status:** **Accepted**
- **Date:** 2026-08-19

## Context

Round 3 (`git:467dc5b`) shipped the catalogue as an asymmetric grid: one lead card,
two beside it, and the remaining eleven as a two-column index. `Skills.tsx` argued the
asymmetry in its own docstring:

> *"Equal thirds is the docs-template shape; an asymmetric grid says which skill to
> read first. `decisions-logger` leads because it is the one the page's own argument
> rests on — the hero specimen is its output. The three are chosen to cover the three
> evidence sources — from git, from you, and from the record itself — not to be the
> 'best' three."*

The same round rebuilt the install section on the same premise, and stated the cost of
the alternative in the strongest terms anywhere on the page. `Install.tsx` at
`467dc5b`:

> *"A sequence, not a menu. The old section printed one command per skill — fifteen
> near-identical rows, each already on its own catalogue row, and thirty copy buttons
> for fourteen commands. **Fourteen equal options is a paralysis machine**; the
> library has an obvious entry point and this says so."*

Round 4 was six pieces of craft feedback on the built round 3. Two things about the
grid were named: it **read as congested** — two shapes doing the same job, with three
cards tall enough to fill a screen — and it **did not scale**, since the roadmap runs
to thirty-two skills and eleven index entries were already the smaller half. A first
pass within round 4 boxed and ruled the list into columns and was killed for reading
as a spreadsheet.

## Options considered

| Option | The bet | Why it lost |
|---|---|---|
| Keep round 3's lead card + two + eleven-row index *(incumbent)* | An asymmetric grid tells a first-time reader where to start, which a list of equals cannot | Stated at the time: *"it read as congested — two shapes doing the same job, and the cards were tall enough that three of them filled a screen. One shape scales: at the thirty-two on the roadmap this is thirty-two rows, not eleven screens"* |
| Keep the lead card, flatten the other thirteen | Preserves the "start with this one" signal for the price of one extra shape, and drops the congestion of three cards side by side | **`*(reason not stated)*`** — not recorded as a weighed option. Recorded instead: the stated objection was *two shapes doing the same job*, and this keeps two |
| Fourteen equal cards | One shape, and the card keeps the description visible without a click | **`*(reason not stated)*`.** Recorded instead: round 3 had already found that **three** cards filled a screen, so fourteen is roughly five |
| Fourteen rows, boxed and ruled into columns *(built and killed inside round 4)* | A table is the densest honest shape for fourteen items of identical structure | Stated: *"First pass boxed and ruled it into columns and read as a spreadsheet"* |
| A JS disclosure rather than `<details>` | Full control over the open/close behaviour and its animation | Stated: `<details>`/`<summary>` is *"keyboard accessible for free and working with JS off, so no dead control ships"* — this page's standing rule is that JS may enhance, never reveal |
| **Fourteen equal rows, all collapsed — chosen** | One shape that scales by row; the description is the reward for opening a row, not the thing that crowds fourteen of them | — |

## Decision

The catalogue became **fourteen rows of one shape, all closed on load**, each a native
`<details>`/`<summary>` opening to its description and its install command, separated
by a single hairline rather than boxed. Closed, a row shows its description clamped to
two lines; open, the clamp is released. `decisions-logger` is ordered first and that
ordering is the only remaining recommendation.

**The cost was written down at the moment of the choice, in capitals, by the person
making it** — from the commit message:

> *"WHAT THE CATALOGUE GIVES UP: the lead card and the 'start with this one' signal.
> `decisions-logger` is merely first now. `Install.tsx`'s own comment calls a flat menu
> of equals 'a paralysis machine' — this is one, mitigated only by ordering."*

and, at greater length, in the round 4 `Skills.tsx` docstring:

> *"WHAT THIS GIVES UP: the lead card, and with it the 'start with this one' signal.
> `decisions-logger` stays first in the list, but a first row is a much weaker
> recommendation than a card three times the size of its neighbours."*

**Both of those statements have since left the working tree, which is why this record
matters.** The `Install.tsx` comment that supplied the phrase *"a paralysis machine"*
was itself deleted by the very commit that quotes it — `Install.tsx` at `218c91d`
reads only *"A sequence, not a menu. The old section printed one command per skill —
fifteen near-identical rows and thirty copy buttons for fourteen commands."* And the
`Skills.tsx` docstring did not survive round 5's split into `SkillList.tsx`. As of
today the words survive in `git:467dc5b`, `git:218c91d` and
`changelog/commits/042` — nowhere in the code they describe.

## What we gave up

- **The "start with this one" signal.** A first row is a far weaker recommendation
  than a card three times its neighbours' size, and the page's own argument rests on
  `decisions-logger` — the hero specimen is its output. The recommendation is now
  carried entirely by list position.
- **The page's answer to its own objection.** Round 3 named a flat menu of fourteen
  equals *a paralysis machine* and built the install section specifically to avoid
  being one. The catalogue is now that shape, and the mitigation is ordering alone.
- **Descriptions at a glance.** Closed rows clamp to two lines, so reading any skill
  properly costs a click. Fourteen rows show at most twenty-eight lines of
  description between them.
- **The one asymmetric composition on the page.** Round 3's argument was that *"equal
  thirds is the docs-template shape"*. A list of fourteen identical rows is closer to
  that shape than the grid it replaced, which pushes on the risk
  [0007](./0007-the-site-is-terminal-rendered-markdown.md) carries as a revisit
  trigger: someone outside calling it a developer docs site.
- **Copy that still describes the dead layout.** `SKILLS_COPY.sub` in
  `website/components/lib/content.ts` — rendered above the flat list by
  `SkillList.tsx` — still reads *"Fourteen, each a separate plugin. **Three worth
  reading properly; the rest are one line each.**"* `leadTag: "start with this one"`,
  `leadNote`, `leadOutputPrefix`, `leadOutput` and `leadOutputSuffix` are still
  defined there and no component imports them. The lead card's vocabulary outlived the
  lead card.

## What would make us revisit

- **The list reaches the roadmap's thirty-two and stops being scannable.** Scaling is
  this decision's stated bet — *"at the thirty-two on the roadmap this is thirty-two
  rows, not eleven screens"* — and it has been tested at fourteen and nowhere else.
- **Anybody asks which one to start with.** That question is the paralysis cost
  arriving, and it is the only trigger available: no instrumentation exists to catch
  it. 0007 records that Vercel Web Analytics returned `404 — not found`, and nothing
  has changed that.
- **The groups have to come back.** `SKILL_GROUPS` still carries the five job groups
  and their notes, and the flat list uses them only as a source for the ranker's
  keywords. If the list needs headings to stay navigable, the "one shape for all of
  them" premise ends.
- **A row's contents outgrow a row.** Each row now holds a description, surface tags,
  a copy control and, for eleven skills, a download. If a skill needs a screenshot, an
  example of its output, or anything else with a height, the collapsed-row shape is
  the constraint that breaks first.

## Evidence

- **Primary:** `git:218c91d` (2026-08-19), the commit message:
  > *"The catalogue is fourteen rows, all closed, each opening to its description and
  > its command. `<details>`/`<summary>`, not a JS disclosure — keyboard accessible for
  > free and working with JS off, so no dead control ships. First pass boxed and ruled
  > it into columns and read as a spreadsheet; this is one hairline between entries,
  > the description visible and clamped to two lines when closed, released when
  > open."*
  > and, separately: *"WHAT THE CATALOGUE GIVES UP: the lead card and the 'start with
  > this one' signal."*
- **Corroborating:** `git:218c91d:website/components/Skills.tsx`, the docstring quoted
  above — the fullest statement of the cost, and no longer in the tree ·
  `git:467dc5b:website/components/Install.tsx`, the *"paralysis machine"* comment,
  deleted by `218c91d` · `git:467dc5b:website/components/Skills.tsx`, the lead-card
  argument · [`changelog/commits/042-…`](../../changelog/commits/042-round-3-chrome-scale-composition-and-no-more-typed-counts.md),
  which preserves both round 3 comments verbatim · `git:10b64af` (round 5) ·
  `website/components/lib/content.ts` §`SKILLS_COPY` and `website/components/SkillList.tsx`,
  for the copy that still describes the round 3 shape ·
  `website/tests/skills-catalog.spec.ts`, which asserts one catalogue entry per skill
  in `SKILL_GROUPS`.
- **Rationale:** **stated at the time**, in the commit message and in the round 4
  docstring, including the cost. Round 4 has **no exploration-log round** — the
  log ends at round 2 — and the changelog is generated from git, so any entry for the
  commit restates this same message. `git:218c91d` is the only record, and the
  loss of both source comments since makes it the only surviving one. **Why the two
  unbuilt alternatives lost is not recorded**; see the table.

## Follow-up

*Append-only. Everything above is **frozen**. Entries below are dated and additive.*

**2026-08-20 — four refinements, none of them reopening the shape.** All four keep
fourteen collapsed rows of one shape; three come from a Figma spec, cited by node id
in the commits and not held as a file in `design/specs/`.

- `git:10b64af` (2026-08-19, round 5) — a filter over the catalogue, which is **the
  first mitigation of the paralysis cost beyond ordering**. It hides rows rather than
  unmounting them, so the whole catalogue stays in the static export. The same commit
  made the surface tags honest (a row shows only the surfaces it has) and added
  downloads for the eleven Chat-capable skills.
- `git:c36625c` — the filter moves into the section header, *"a property of the
  section, not a control floating above the list"* (Figma node 2265:2179).
- `git:714e0ea` — surface tags become fully rounded pills (node 2265:1241), and
  `SkillList`'s inline duplicate of `Tags` is collapsed into the shared component.
- `git:edf8025` — the row's command becomes the hero's primary `CopyButton` variant
  (node 2283:2645), so the catalogue reuses the control rather than printing a bare
  `<code>` beside a chip.
- `git:b9dd1a3` — only one row open at a time, via the native `name` attribute on
  `<details>` rather than controlled state: *"no state, no effect, no re-render, and it
  keeps working with JS off."* Browsers without support fall back to the
  several-open-at-once behaviour that shipped until then.

---

_**Exactly two things in this file may ever change:** the `**Status:**` line and
additions under `## Follow-up`. If this turns out to be wrong, do not edit it —
supersede it with a new decision that links back._
