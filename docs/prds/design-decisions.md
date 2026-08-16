# PRD — design-decisions

Status: Draft v0.1 · Owner: Vidhunnan Murugan · Repo: vidhunnan/agentic-skills

## 1. Problem

`decisions-logger` mines a codebase for the decisions that were actually made. It
can do that because code leaves evidence: commits, diffs, PR threads, config files
that changed on a date.

Design leaves none of it. A Figma file shows the winner and nothing else — not the
options, not the reasoning, not the cost. The reasoning exists in a comment thread,
a Slack message, and one person's memory, and within months it is gone from all
three. The result is a repeating conversation: *why is it like this?* — *I think
there was a reason.*

Two things make this worse than the code case:

- **There is nothing to mine.** `decisions-logger`'s whole architecture is a source
  hierarchy — Tier S may supply rationale, Tier D may not. Here almost every tier
  is empty. The evidence has to come from the person, in the moment, or it does not
  exist.
- **A fabricated rationale cannot be caught.** In code, an invented reason can
  eventually be checked against a diff. A plausible-sounding reason for a layout
  choice is indistinguishable from a real one to every future reader, forever.

Design ADRs also need two fields architectural ones usually omit, and they are the
two that get asked about later: **what was given up**, and **what would make us
revisit**. A design choice is nearly always a trade — legibility against density,
speed against delight — and the trade is the part that decays into "this is just
how it is."

## 2. Goals

- Record a design fork as a numbered, append-only ADR with its options, its cost,
  and its revisit condition.
- Capture the reasoning **at the moment of the decision**, since it will not be
  recoverable later.
- Offer proactively — before the reasoning evaporates — without becoming noise.
- Cite the brief, the research and the explorations the choice rested on, so an ADR
  is anchored to evidence rather than floating.
- Never invent a rationale, and make `*(reason not stated)*` a first-class outcome.

## Non-goals (v1)

- **Making the decision.** The skill records a fork that a human resolved. It does
  not recommend an option, and it does not evaluate the design.
- **Mining a design tool.** No Figma connector in v1. Evidence comes from the
  conversation and from the design tiers on disk.
- **Backfilling at scale.** `decisions-logger` mines a whole repo; this skill's
  default is the decision in front of it. A best-effort sweep of
  `design/explorations/` and `design/briefs/` is offered, but the sources are thin
  and the skill must say so rather than manufacture candidates.
- **Scaffolding the tier.** `design-setup` owns the tier README and template.

## 3. Primary user

A designer at the moment of a fork, or someone trying to reconstruct why a design
is the way it is before changing it.

## 4. Core workflow

1. Detect surface; resolve the decisions path; detect the numbering scheme.
2. Load existing ADRs — the idempotency and supersession baseline.
3. Either the fast path (a decision named in the trigger) or a thin sweep of the
   design tiers.
4. Apply the Fork Test: name the loser, or it is not a decision.
5. Interview for what was given up and what would make us revisit — with "I don't
   remember" always on offer.
6. Write the ADR; rebuild the index region.
7. Register the protocol block.

## 5. Output template

```md
# {NNNN}. {The decision, as a statement}

**Status:** Accepted
**Date:** {YYYY-MM-DD}
**Supersedes:** —

## Context
{What was true when this came up. Never a motive — what was the situation.}

## Options considered
| Option | The bet | Why it lost |
|---|---|---|
| {A} | {…} | {…} |
| **{B} — chosen** | {…} | — |

## Decision
{What was chosen, stated plainly.}

## What we gave up
{The cost. Every design choice is a trade; this is the traded-away half.}

## What would make us revisit
{The condition. "If mobile passes 60% of sessions." Not "if it stops working."}

## Evidence
- Primary: {brief / exploration round / research finding / this conversation}
- {Supporting citations}

## Follow-up
- {dated entries, appended only}
```

## 6. Functional requirements

| ID | Requirement | Surface |
|---|---|---|
| R1 | The skill MUST NOT write a rationale not traceable to a source or the user's own words; where the reason was never stated it MUST write `*(reason not stated)*`. | Claude Code, Claude.ai |
| R2 | Every interview question MUST offer an explicit "I don't remember" option. | Claude Code, Claude.ai |
| R3 | A candidate MUST pass the Fork Test — a specific alternative a reasonable person would have chosen — or be rejected as a fact or a task. | Claude Code, Claude.ai |
| R4 | Every ADR MUST contain a `## What we gave up` and a `## What would make us revisit` section, rendered explicitly even when not stated. | Claude Code, Claude.ai |
| R5 | Existing ADRs MUST be append-only: the only permitted mutations are the `**Status:**` line and an append under `## Follow-up`. The frozen body MUST be verified byte-identical before any append. | Claude Code |
| R6 | The skill MUST adopt the existing numbering scheme and MUST NOT renumber or reuse a burned number. | Claude Code |
| R7 | The date MUST be when the decision was made, taken from evidence — not today — marked `(approx.)` when only an earliest-evidence date is available. | Claude Code |
| R8 | The index MUST live in a `<!-- BEGIN design-decisions-index -->` region, fully regenerated each run, with everything outside the markers untouched. | Claude Code |
| R9 | If the tier does not exist, the skill MUST recommend `/design-setup add decisions` rather than creating it silently. | Claude Code |
| R10 | The skill MUST NOT auto-supersede; supersession requires confirmation and a stated *why now*. | Claude Code |
| R11 | On Claude.ai the skill MUST emit ADRs as downloadable artifacts and MUST state that dedup and supersession detection are unavailable. | Claude.ai |

## 7. Success criteria

- A decision made in conversation is logged in under five minutes, with its cost
  recorded.
- A decision whose reasoning nobody remembers produces a real ADR reading
  `*(reason not stated)*` — not a plausible paragraph.
- Running twice produces no duplicates.
- Six months later, "why is it like this?" is answerable from the folder.

## 8. Risks

- **Fabrication, and it is undetectable here.** The primary risk of the whole
  skill. Mitigations: R1, R2, and the same firewall `decisions-logger` uses — a
  source may *surface* a candidate without being allowed to *justify* it.
- **Everything looks like a decision.** Design work is a continuous stream of small
  choices; without a hard gate the tier fills with noise and stops being read.
  Mitigation: the Fork Test, non-overridable.
- **Offering too often.** A skill that interrupts every design turn gets muted.
  Mitigation: offer once per fork, be specific, take no for an answer.
- **Thin evidence dressed as strong.** With few sources, an ADR can cite "this
  conversation" for everything. That is legitimate but must be visible, so the
  Evidence block names the conversation explicitly rather than implying a document.

## 9. Open questions for v2

- Should it read Figma comment threads via the connector as a Tier A source? They
  are the closest thing design has to a PR thread — and also full of noise.
- Should a superseded design decision link forward to the exploration round that
  replaced it?
- Is a shared numbering space with `docs/decisions/` ever wanted, or is the split
  between architectural and design ADRs always right?
