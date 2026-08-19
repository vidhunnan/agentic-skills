# PRD — design-language

Status: Draft v0.1 · Owner: Vidhunnan Murugan · Repo: vidhunnan/agentic-skills

## 1. Problem

`design-brief` captures why a thing is being built and never what it should look
like — "Brand" is one row of a three-row constraints table, meant for constraints
that would kill a direction. Nothing else asks about typography, colour, register,
references, or the visual language of the thing being made.

The consequence is concrete. Asked to design anything with no stated visual intent,
a model produces the median of its training data: competent, plausible, and
indistinguishable from every other generated interface. Users notice the result
looks generated and can't say why. The cause is that nobody wrote down what they
were aiming at, or — more importantly — what they were aiming away from.

It also gates two sibling skills:

- **`design-critique` cannot run.** It reviews only against a written intent
  ([ADR 0021](../decisions/0021-design-skills-never-make-the-design-decision.md)).
  With no document stating any visual intent, critique of anything aesthetic is
  impossible by construction.
- **`design-explore` may not run.** Condition 1 of
  [ADR 0022](../decisions/0022-generation-is-allowed-only-into-explorations.md) is a
  written visual intent. This document is that gate, which means its quality sets
  the ceiling on everything generated from it.

## 2. Goals

- Capture visual intent in one cheap interview: surface, brand posture, references,
  constraints, vocabulary, failure condition.
- Force the **anti-reference**. A reference list without a negative is decoration.
- Force constraints into **falsifiable** form — a rule a design can be caught
  breaking, not an adjective.
- Harvest what's already on disk (tokens, theme config, the brief) instead of asking
  for it.
- Produce a document `design-explore` can generate against and `design-critique` can
  check line by line.
- Be checkable without being run: `check` mode reports whether a stated intent
  exists and how complete it is.

## Non-goals (v1)

- **Supplying the taste.** The skill never proposes an aesthetic, not even as "a
  starting point to react to". The user's taste is the input; a supplied one becomes
  the yardstick everything downstream is judged by, under their name.
- **Generating anything visual.** No mockups, no palettes, no token values invented.
  That is `design-explore`, and it is the only skill in this territory permitted to
  generate at all.
- **Building a design system.** This states the rules; component specs and token
  documentation are the System tier's other artifacts.
- **Evaluating work.** That is `design-critique`.
- **Scaffolding the tier.** `design-setup` owns the tier's README and `_TEMPLATE.md`.
- **Reading design tools.** No Figma connector in v1.

## 3. Primary user

A designer-who-codes starting a new surface — or an existing one whose visual
direction was never written down — who wants generated work to reflect their taste
rather than the model's.

## 4. Core workflow

1. Detect surface; resolve the System tier path.
2. Harvest existing tokens, the brief, and the conversation. *(`check` stops here
   and reports.)*
3. Interview: two rounds, four questions each, every one skippable.
4. Mark each section stated or not stated.
5. Show back Hard constraints and the anti-reference at a single write gate.
6. Write `{system}/language-{slug}.md`, or emit an artifact on Claude.ai.
7. Confirm the path back and name the skills that will now cite it.

## 5. Output template

```md
# Design language — {title}

Status: {active | closed} · Date: {YYYY-MM-DD}

## The surface
{What this is and where it lives.}

**Brand posture:** {wears the brand · deliberately doesn't — and why}

## References
**Pulling from:** {reference — and what specifically is being taken from it}
**Explicitly not:** {the anti-reference}

## The first two seconds
{Three adjectives.}

## Hard constraints
| Rule | Value | Why it's load-bearing |
|---|---|---|
| {Accent colours} | {Exactly one} | {…} |

## Vocabulary
**The noun this runs on:** {…}
**Out of bounds:** {…}

## Inheritance
{The token set or surface this extends, with its file path — or "Greenfield".}

## What would count as failure
{Failure even if it looks good.}

## Open questions
- {Unresolved — and who could answer it.}
```

## 6. Functional requirements

| Surface | Trigger | Sources | Output |
|---|---|---|---|
| Claude Code | `/design-language [check\|<slug>]`, or natural phrasing ("what should this look like", "define the visual direction", "set the design language") | tokens and theme config on disk, an existing `design-brief`, prior language docs in the tier, the conversation | `{system}/language-{slug}.md`, or a dated revision appended to an existing one |
| Claude.ai | explicit mention or description-match | whatever the user pastes | the doc as a downloadable artifact. **Tier resolution, token harvesting and revision detection are unavailable — the skill says so rather than guessing.** |

**Modes:** *(none)* full flow · `check` Steps 1–2 plus a report, zero writes ·
`<slug>` full flow with the slug supplied.

| ID | Requirement | Surface |
|---|---|---|
| R1 | The skill MUST resolve the System path by declared block → existing folder → canon, and MUST NOT create a missing tier silently. | Claude Code |
| R2 | The skill MUST grep for existing design tokens before asking about colour or type, and MUST ask inherit-or-depart when it finds them. | Claude Code |
| R3 | The skill MUST cap the interview at two rounds of four questions, each carrying a "not decided yet" option. | Claude Code, Claude.ai |
| R4 | The skill MUST push once for the anti-reference when it is skipped. | Claude Code, Claude.ai |
| R5 | The skill MUST push once on any constraint that cannot be violated, asking how a design would be caught breaking it. | Claude Code, Claude.ai |
| R6 | The skill MUST render unanswered sections as `*(not stated)*` and MUST NOT infer an aesthetic from the product category. | Claude Code, Claude.ai |
| R7 | The skill MUST show back Hard constraints and the anti-reference at a single confirmation gate, and MUST write nothing before it is accepted. | Claude Code, Claude.ai |
| R8 | The skill MUST append revisions rather than replacing prior content, quoting the prior text, and MUST abort if untouched sections have changed since they were read. | Claude Code |
| R9 | The skill MUST decline "just pick something" and offer a reference-led path instead. | Claude Code, Claude.ai |
| R10 | The skill MUST NOT write a CLAUDE.md protocol block; `skill:design-setup` already declares the tier. | Claude Code |
| R11 | In `check` mode the skill MUST report the resolved path, every language doc found, its unanswered-section count, and whether the project is ready for `/design-explore` — with **zero writes and no questions asked**. | Claude Code |

## 7. Success criteria

- A user running `/design-explore` immediately after gets three directions that
  differ from the model's default aesthetic in ways traceable to the doc.
- Every line in the doc traces to something the user said, or reads `*(not stated)*`.
- Constraints are checkable: `design-critique` can test each row mechanically.
- The interview completes in under five minutes on a surface with existing tokens.
- `/design-language check` on a project with no language doc says so plainly and
  recommends the next step, rather than producing an empty document.

## 8. Risks

- **The model supplies taste anyway** — the failure is invisible, because a proposed
  aesthetic the user accepts looks identical to one they chose. Mitigated by R6 and
  the Step 4 rule that agreement to a wholesale proposal is not "stated".
- **The doc becomes a wish list** — unfalsifiable adjectives fill the constraints
  table. Mitigated by R5 and the "only adjectives" edge case.
- **Drift from the built tokens** — the doc says one accent, the code has four.
  Detectable by `design-critique`; not prevented here.
- **Overlap with `frontend-design`** — that skill proposes aesthetic direction; this
  one refuses to. The boundary is stated in `when_to_use`.
- **It becomes a checkbox before exploring.** Being the ADR 0022 gate creates
  pressure to produce a thin doc just to unblock generation. Mitigated only weakly,
  by `check` mode surfacing the `*(not stated)*` count — a thin doc is visible, but
  nothing prevents one.

## 9. Open questions for v2

- Should it emit a starter token file, or does that cross into generation?
- Should brand posture across sibling surfaces be reconcilable — a project-level
  view of which surfaces wear the brand?
- Does a `brand-doc` skill still make sense above this, or does this absorb it?
- Should `check` fail loudly — not just report — when `design-explore` is about to
  run against a doc that is mostly `*(not stated)*`?
