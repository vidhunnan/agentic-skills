# PRD — design-brief

Status: Draft v0.1 · Owner: Vidhunnan Murugan · Repo: vidhunnan/agentic-skills

## 1. Problem

Most design work starts without a written statement of what it is for. The problem
is understood in a meeting, held in someone's head, and never written down.

Three failures follow, all of them familiar:

- **Critique becomes taste.** With no stated intent, feedback has nothing to be
  measured against, so it collapses into preference — and the loudest preference
  wins.
- **Scope creeps invisibly.** Without non-goals, every plausible addition is
  arguable, and nobody can point to the line.
- **"Did this work?" is unanswerable.** Success was never defined, so the work is
  judged on whether it looks good.

The rest of the design territory depends on this document existing. `design-critique`
reviews *against* it. `design-decisions` cites it for the constraints a fork was
weighed under. `case-study-writer` opens with it. Without a brief, each of those
skills is reduced to guessing at intent — and a model guessing at intent produces
confident, generic, useless output.

The brief also has to be **cheap**. A brief that takes an afternoon does not get
written before a deadline, which is precisely when it matters most.

## 2. Goals

- Produce a short, structured brief from a **conversation**, not a form — the user
  talks about the problem, the skill shapes it.
- Force the two sections people skip: **non-goals** and **what success looks like**.
- Capture what the user actually holds, and mark what they don't, rather than
  filling gaps with plausible product-management prose.
- Write to the briefs tier `design-setup` declared, so the sibling skills can find
  it.
- Be re-runnable: update a brief as understanding changes, without silently
  rewriting what it used to say.

## Non-goals (v1)

- **Deciding the problem.** The skill interviews and structures. It does not
  propose what the project should be about, invent user needs, or supply success
  metrics the user hasn't named. A fabricated success criterion is worse than a
  missing one — later work will be judged against it.
- **Research.** A brief states what is believed; `design-research-log` records the
  evidence. If a claim in the brief has no evidence behind it, say so in the brief
  rather than dressing it as a finding.
- **Solutioning.** No layouts, no directions, no "we should". Those belong to
  `design-brainstorm` and `design-directions`.
- **Scaffolding the tier.** If `design/briefs/` doesn't exist, point at
  `/design-setup add briefs` — that skill owns the tier README and template.

## 3. Primary user

A designer starting a piece of work, or picking up work whose framing was never
written down.

## 4. Core workflow

1. Detect surface; resolve the briefs path.
2. Read the room first — the conversation, and on Claude Code any brief already in
   the tier, plus the project README.
3. Interview in two rounds, capped, skipping anything the user already said.
4. Mark every section as **stated** or **not stated**. Never invent.
5. Assemble the brief and show the non-goals and success sections back explicitly —
   they are the ones people get wrong.
6. Write to `{briefs}/<slug>.md`, or update an existing brief with a dated revision
   note.
7. Confirm the path back and name the skills that will now cite it.

## 5. Output template

```md
# Design brief — {title}

Status: {active | closed} · Date: {YYYY-MM-DD}

## The problem
{What is wrong today, concretely. Present tense, observable.}

## Who feels it
{The people, and when they hit it.}

## Jobs to be done
- {When {situation}, they want to {motivation}, so they can {outcome}.}

## Constraints
| Kind | Constraint |
|---|---|
| Technical | {…} |
| Brand | {…} |
| Time | {…} |

## What success looks like
- {Observable. If it can't be observed, it isn't a success criterion.}

## Non-goals
- {What this deliberately does not do.}

## Anti-goals
- {What would count as failure even if it tested well.}

## Open questions
- {Unresolved, with who could answer it.}
```

## 6. Functional requirements

| ID | Requirement | Surface |
|---|---|---|
| R1 | The skill MUST interview before writing and MUST NOT emit a brief from the trigger alone. | Claude Code, Claude.ai |
| R2 | The skill MUST NOT invent a success criterion, a user need, or a constraint the user has not stated; unknown sections MUST render `*(not stated)*`. | Claude Code, Claude.ai |
| R3 | The brief MUST always contain a Non-goals section and a What success looks like section, rendered explicitly even when empty. | Claude Code, Claude.ai |
| R4 | The skill MUST resolve the briefs path from a CLAUDE.md declared path, then an existing folder, then canon `design/briefs/`. | Claude Code |
| R5 | If the tier does not exist, the skill MUST NOT create it silently; it MUST recommend `/design-setup add briefs`. | Claude Code |
| R6 | On updating an existing brief, the skill MUST append a dated revision note rather than silently replacing prior content. | Claude Code |
| R7 | The skill MUST distinguish anti-goals from non-goals in the output and in the interview. | Claude Code, Claude.ai |
| R8 | On Claude.ai the skill MUST emit the brief as a downloadable artifact and attempt no writes. | Claude.ai |

## 7. Success criteria

- A brief is produced in under ten minutes of conversation.
- `design-critique` run against the brief produces findings that cite specific
  lines of it, rather than generic craft feedback.
- Sections the user could not answer are visibly marked, not quietly filled.
- Re-running on a brief that has moved on produces a revision note, and the
  original framing is still readable.

## 8. Risks

- **Fluent fabrication.** The single biggest risk: a model asked for a design brief
  will happily produce excellent-sounding jobs-to-be-done and success metrics for a
  problem it knows nothing about. Mitigation: R2, `*(not stated)*` as a first-class
  output, and an explicit "I don't know yet" option on every interview question.
- **Too long to be used.** Mitigation: two capped rounds, and permission to leave
  sections empty.
- **Non-goals as an afterthought.** People write them last and vaguely. Mitigation:
  they are asked about directly, and shown back before writing.

## 9. Open questions for v2

- Should the brief carry a status that other skills can read, so `design-critique`
  can refuse to review against a brief marked `closed`?
- Should it be able to draft a brief from an existing PRD when one exists, rather
  than interviewing from scratch?
- Is "anti-goals" a real distinction from non-goals in practice, or does it just
  produce an empty section?
