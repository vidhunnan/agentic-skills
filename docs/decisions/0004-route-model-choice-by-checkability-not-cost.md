# 0004. Route model choice by checkability, not by cost

- **Status:** Accepted
- **Date:** 2026-07-12

## Context

This repo has no build system, no tests, and no runtime — the artifact *is* the prose. That inverts the usual model-choice calculus. In a normal codebase a cheaper model's mistakes get caught by a compiler or a test suite, so routing by cost is rational. Here there is no compiler to catch a bad call, and a subtly wrong `description:` line ships as a skill that fires at the wrong moment in someone else's project.

## Decision

Route model choice by **whether the output's correctness is mechanically checkable**, not by what the work costs. Where a human can verify the result by reading it once, use the cheaper tier; where correctness is a judgment call, use the most capable one. The four assignments are rows of that single policy:

| Model | Use for | Because |
|---|---|---|
| **Opus 4.8** | The default: `SKILL.md`, PRDs, reviewing and refactoring skills, anything touching the multi-surface split | Judgment-heavy work whose correctness isn't mechanically checkable |
| **Sonnet 5** | Plumbing: `plugin.json`, `marketplace.json`, README rows, governance files | Fixed schema; correctness *is* checkable by eye |
| **Fable 5** | Break glass — a genuinely hard design problem Opus 4.8 has actually failed at | More capable, but priced above Opus tier; not worth it for prose Opus handles well |
| **Haiku 4.5** | Nothing, by default | Nothing here is high-volume or latency-critical enough to justify the quality tradeoff |

## Alternatives considered

- **Route by cost — a cheaper model by default, escalating when it struggles** — the standard approach, and correct in a repo with tests. It lost because nothing here would catch the cheaper model being subtly wrong: the failure mode isn't a broken build, it's a skill that quietly misfires in a stranger's project months later.
- **Use the most capable model for everything** — rejected implicitly by keeping a plumbing tier: schema-shaped edits are verifiable at a glance, so paying top-tier for them buys nothing.

## Consequences

- Quality is protected exactly where a mistake would be invisible, and money is saved exactly where a mistake would be obvious.
- The policy needs a judgment call *about* whether a task is judgment-shaped — so it carries an explicit escape hatch: if a "plumbing" task turns out to force a decision about how a skill is named or scoped, it stops being plumbing and escalates.
- The lineup table names specific model IDs, which age. See [0006](./0006-model-ids-are-verified-live-never-hardcoded.md).

## Evidence

- **Primary:** `docs/MODEL-STRATEGY.md` §1 The lineup (the table carries a literal *Why* column) and its framing paragraph
  > This repo has no build system, no tests, and no runtime — the artifact *is* the prose. That inverts the usual model-choice calculus: there is no compiler to catch a bad call, and a subtly wrong `description:` line ships as a skill that fires at the wrong moment in someone else's project. So the rule here is simple: **quality over speed, everywhere that matters.**
- **Corroborating:** `docs/MODEL-STRATEGY.md` §4 Escalation & de-escalation · `git:0fc116e` (2026-07-12) — shipping evidence.
- **Rationale:** stated in the primary source

*Note on granularity: the four model assignments are four rows of one routing policy, not four decisions. Reversing "Haiku, never" changes the policy rather than standing alone. The mandatory review rule in §3 of the same document **is** independently reversible and is therefore recorded separately, as [0005](./0005-review-is-the-test-suite.md).*

## Follow-up

*Append-only. Everything above this heading is frozen.*

*(none yet)*

---

_Append-only. If this turns out to be wrong, **do not edit it** — write a new decision that supersedes it and links back._

_**Exactly two things in this file may ever change:** the `**Status:**` line and additions under `## Follow-up`._
