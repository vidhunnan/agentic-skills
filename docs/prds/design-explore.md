# PRD — design-explore

Status: Draft v0.1 · Owner: Vidhunnan Murugan · Repo: vidhunnan/agentic-skills

## 1. Problem

Asked for "a few options", a model reliably produces one layout in three colourways,
describes them in confident prose, and calls it an exploration. Nothing was
explored: the same structural decision was made three times and painted
differently. The user picks one, and the result is the model's default structure
with a colour they chose — which is why generated design work converges.

The design stack has the tiers on either side of this and nothing in between.
`design-brief` and `design-language` state what the work is for and what it should
look like. `exploration-log` records a round after the fact and is forbidden from
evaluating or recommending. `design-decisions` records the fork once it is settled.
**The step where options come into existence is missing** — the stack can describe
every part of the work except the part where there is something to choose between.

This skill is the only one in the design territory permitted to generate.
[ADR 0021](../decisions/0021-design-skills-never-make-the-design-decision.md)
restricted the territory to *interview, record, structure, check*;
[ADR 0022](../decisions/0022-generation-is-allowed-only-into-explorations.md)
narrowed that to permit generation **into the explorations tier only**, under three
conditions that all must hold — a written visual intent exists first, the artifacts
are candidates and never the record, and the verdict belongs to another skill. Those
three conditions are why this skill is in the library, and they are load-bearing:
drop any one and 0021's original objection applies again.

## 2. Goals

- Produce three directions that differ on **named structural axes**, not on hue.
- Make the comparison visual by default — artifacts you open, not prose you read.
- Refuse to generate without a stated visual intent.
- Make merging sayable: lettered directions, and an explicit Merging section.
- Hand the verdict to `exploration-log` and `design-decisions` rather than recording
  it.
- Keep the three ADR 0022 conditions visible in the skill body, not only in the ADR,
  so an author editing the skill cannot erode them by accident.

## Non-goals (v1)

- **Recording the outcome.** Which direction won and why belongs to the sibling
  skills. Writing it here produces two records that drift, and makes one skill both
  the author and the judge of its own output. This is condition 3 of ADR 0022, not a
  preference.
- **Judging the directions.** The skill states each direction's bet and risk; it
  does not recommend one.
- **Building the winner.** Directions are throwaway artifacts, not production code.
- **Supplying the visual intent.** If no `design-language` doc exists it offers one,
  or runs a compressed interview — it never invents a direction to generate against.
- **Writing outside the explorations tier.** ADR 0022 permits generation there and
  nowhere else.
- **Scaffolding the tier.** `design-setup` owns the tier's README and `_TEMPLATE.md`.
- **Iterating in place.** A second pass is a second round, not an edit of the first.
  A killed direction is never deleted.

## 3. Primary user

Someone about to build a new surface who wants to choose between real alternatives
rather than accept the first thing generated.

## 4. Core workflow

1. Detect surface; resolve the Explorations tier path.
2. Load the visual intent, or run a compressed four-question version. *(`check`
   stops here and reports.)*
3. Ask the output form and the count.
4. Name the three axes and show them before generating.
5. Generate — same content, three structures.
6. Write `directions.md` + artifacts + `index.html`, behind one write gate.
7. Hand off to `exploration-log` / `design-decisions`, and stop.

## 5. Output template

```md
# Design exploration — {title}

Date: {YYYY-MM-DD} · Generated against: {path to the language doc, or "unanchored"}

> Candidates, not a record. Nothing here is evidence that anything was decided or
> shipped. `/exploration-log` records the verdict; `/design-decisions` records why.

## The question this round is asking
{One line. What the three directions are actually testing.}

## The directions

| | A — {name} | B — {name} | C — {name} |
|---|---|---|---|
| **Axis** | {…} | {…} | {…} |
| **Thesis** | {…} | {…} | {…} |
| **The bet** | {…} | {…} | {…} |
| **The risk** | {…} | {…} | {…} |

## A — {name}
{What to look at, and what to look for.} {Link to the artifact.}

## B — {name}
## C — {name}

## Merging
{The combinations worth considering, named.}

## Constraints honoured
{Each hard constraint from the language doc, confirmed — or, if one was relaxed by
agreement, which one and why.}
```

Alongside it, in live-HTML mode: `a-{name}.html`, `b-{name}.html`, `c-{name}.html`,
and `index.html` — a plain contact sheet openable from disk with no server.

## 6. Functional requirements

| Surface | Trigger | Sources | Output |
|---|---|---|---|
| Claude Code | `/design-explore [check\|<slug>]`, or natural phrasing ("show me some directions", "give me options for this", "what could this look like") | the `design-language` doc for the surface, else a `design-brief`, else a compressed four-question interview | `{explorations}/{slug}/directions.md` + one artifact per direction + `index.html` |
| Claude.ai | explicit mention or description-match | whatever the user pastes | each direction as its own artifact (HTML renders) plus `directions.md` as a downloadable artifact. **Tier resolution and prior-round detection are unavailable — the skill says so rather than guessing.** |

**Modes:** *(none)* full flow · `check` Steps 1–2 plus a report, zero writes ·
`<slug>` full flow with the slug supplied.

| ID | Requirement | Surface |
|---|---|---|
| R1 | The skill MUST assign each direction a distinct named axis and state all three before generating. | Claude Code, Claude.ai |
| R2 | The skill MUST NOT produce two directions differing only in colour, and MUST use Colour strategy as at most one of three axes. | Claude Code, Claude.ai |
| R3 | The skill MUST read a `design-language` doc or `design-brief` where one exists, and MUST offer `/design-language` where none does. A compressed inline interview satisfies the gate; skipping the questions does not. | Claude Code |
| R4 | The skill MUST honour every hard constraint in the intent doc, and MUST ask before relaxing a named rule rather than breaking one silently. | Claude Code, Claude.ai |
| R5 | The skill MUST ask the output form every run (live HTML · token sets · prose · Figma). | Claude Code, Claude.ai |
| R6 | Each direction MUST carry a name, thesis, bet, risk and axis, all present in the matrix. | Claude Code, Claude.ai |
| R7 | The skill MUST NOT ship a direction it cannot argue for. | Claude Code, Claude.ai |
| R8 | In live-HTML mode artifacts MUST be single-file, dependency-free and openable from disk. | Claude Code |
| R9 | The skill MUST build the same content in every direction. | Claude Code, Claude.ai |
| R10 | The skill MUST take one confirmation before writing, printing the full file plan, and MUST print inline if declined. | Claude Code |
| R11 | The skill MUST NOT record which direction was chosen; it MUST point at `/exploration-log`. | Claude Code, Claude.ai |
| R12 | A direction blocked by a hard constraint MUST appear as a labelled out-of-bounds fourth option, never as one of the three. | Claude Code, Claude.ai |
| R13 | The skill MUST write only into the explorations tier, resolved by declared block → existing folder → canon, and MUST NOT create a missing tier silently. | Claude Code |
| R14 | `directions.md` MUST carry the candidates-not-a-record notice, and the skill MUST NOT overwrite a prior round's artifacts. | Claude Code, Claude.ai |
| R15 | In `check` mode the skill MUST report the resolved path, whether a visual intent exists and what it constrains, and any existing rounds — with **zero writes and no questions asked**. | Claude Code |

## 7. Success criteria

- Three directions are structurally distinguishable in a screenshot with the colour
  removed.
- The user can open the contact sheet and choose within a minute.
- Merges happen — the Merging section gets used, rather than a single column winning
  by default.
- No round ships a filler direction.
- A year later, a reader of `design/explorations/` can tell a candidate from a
  decision without asking anyone.

## 8. Risks

- **Erosion of the ADR 0022 conditions.** The largest risk, and it is structural
  rather than behavioural: each condition costs the user something in the moment —
  the intent gate delays generation, the hand-off means one more skill to run. The
  pressure to quietly relax one is constant. Mitigated by R3/R11/R14 and by stating
  the conditions in the skill body, where an author editing it will see them; not
  eliminated.
- **Convergent generation** — three axes named, three near-identical outputs.
  Mitigated by the self-check edge case: name the collapse and regenerate.
- **Constraint theatre** — claiming constraints were honoured without checking.
  Mitigated by the Constraints honoured section being explicit and per-rule.
- **Artifact sprawl** — every round writing five files. Mitigated by round folders
  and by `exploration-log` owning the narrative.
- **Trigger collision with `exploration-log`** — both match on "explore". Mitigated
  by scoping: this skill owns the generative, future-tense phrasings, the sibling
  owns the past-tense record ones, and each `when_to_use` points at the other.
- **Overlap with `frontend-design`** — that skill builds one polished interface;
  this one produces three comparable bets against a stated intent.

## 9. Open questions for v2

- Should it screenshot its own HTML output so the matrix is visual in Markdown?
- Should a second round diff against the first automatically?
- Is Figma mode worth keeping, or does it belong in a separate skill?
- Should the skill refuse outright when the language doc is mostly
  `*(not stated)*` — a technically-satisfied gate that is functionally unanchored?
