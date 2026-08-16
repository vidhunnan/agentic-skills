# 0001. The library is context engineering for code *and* design, at equal billing

- **Status:** **Accepted**
- **Date:** 2026-08-16
- **Supersedes:** —

## Context

The library reached eleven skills, five of them design skills, while every
outward-facing surface still argued the original repo-only thesis — README hero,
landing page, and the talk deck. See [`../briefs/positioning.md`](../briefs/positioning.md),
which states the problem and the constraint this was weighed under: content and
structure only, no new visual direction, and the deck out of scope.

The forcing question was whether design is a **section** of a repo-first library
or a **peer** of it.

## Options considered

| Option | The bet | Why it lost |
|---|---|---|
| **Two stacks, equal billing — chosen** | The thesis generalises: the five questions are work questions, not repo questions, so code and design are two applications of one idea | — |
| Design-led, code as the origin story | Design is the harder, more differentiated problem and the sharper hook; leading with it would separate the library from every other agent-skills repo | Rejected as too big a bet on an audience the library has not yet earned, and it risks the engineer anti-goal in the brief |
| Stay repo-first, design as a section | Defer until the design skills have real usage behind them; avoids repositioning on speculation | Rejected: the library already *is* 45% design skills. The pitch would keep describing something the repo has stopped being, which is the contradiction the whole library exists to prevent |

## Decision

The library is positioned as **context engineering applied to two domains, at
equal billing.** The code stack and the design stack sit side by side — in the
README, and on the site as two parallel sections rendered from one component and
one data source. Neither is framed as the primary and neither as an extension.

## What we gave up

**The tight single-thesis pitch.** *"An agent has no memory; these skills write
the briefing"* was one sentence, and it landed. Two stacks at equal billing is a
harder thing to say quickly, and the page now has to carry two arguments where it
carried one. That is a real cost in immediate legibility, accepted in exchange
for the pitch matching the library.

We also gave up the option of a **clean design-first relaunch** later. Having
positioned them as peers, moving design to the front would be a second
repositioning rather than a first one.

## What would make us revisit

- If the design skills accumulate real usage and the repo skills do not — equal
  billing would then be understating the actual centre of gravity, and the
  design-led option returns.
- If cold readers consistently fail the brief's success criterion because two
  stacks is one too many to absorb, the answer is to pick one, not to explain
  harder.

## Evidence

- **Primary:** [`../briefs/positioning.md`](../briefs/positioning.md) — the stated
  intent, its constraints and its anti-goals.
  > "Engineers bounce. If the repo skills start reading as secondary… the
  > reposition has failed even if design interest rises."
- **Corroborating:** `docs/concepts/skill-library-expansion.md` §Open questions,
  where this was recorded as the lead unresolved question · `git:0c67e8c`, which
  put both stacks on the site · [ADR 0020](../../docs/decisions/0020-design-gets-its-own-stack-not-a-shoehorn-into-docs.md).
- **Rationale:** stated by the owner on 2026-08-16.

## Follow-up

*Append-only. Everything above this heading is **frozen**.*

*(none yet)*

---

_**Exactly two things in this file may ever change:** the `**Status:**` line and
additions under `## Follow-up`._
