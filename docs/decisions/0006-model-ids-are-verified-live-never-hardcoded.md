# 0006. Model IDs are verified live, never hardcoded

- **Status:** Accepted
- **Date:** 2026-07-12

## Context

`docs/MODEL-STRATEGY.md` names specific model IDs (`claude-opus-4-8`, `claude-sonnet-5`, and so on). Model lineups change: IDs are added, renamed, and retired faster than a document gets revisited. A model-strategy document whose IDs have aged is worse than none — it will confidently route work to a model that no longer exists, or miss one that would now be the right call.

The same hazard applies to the `model-strategy` skill itself, which generates that document in someone else's repo.

## Decision

The lineup is **confirmed against the live model lineup every time the strategy is written or updated** — never reproduced from memory or copied forward from the last version. The `model-strategy` skill makes this its Step 1, before it interviews or writes anything, and `MODEL-STRATEGY.md` carries the verification date in its own §1.

## Alternatives considered

- **Hardcode the IDs in the skill and update them when someone notices** — simpler, and correct on the day it's written. It lost because "when someone notices" is not a mechanism: the failure is silent, and the document keeps looking authoritative while being wrong.

## Consequences

- The strategy stays honest without anyone remembering to maintain it, and the verification date makes staleness visible on the page.
- Every run costs a lookup before it can do anything useful, and a skill that can't reach the live lineup has to degrade rather than guess.

## Evidence

- **Primary:** `docs/MODEL-STRATEGY.md` §1 The lineup
  > Verified against the live lineup on 2026-07-12 (via the `claude-api` skill). Re-verify before editing — model IDs age fast.
- **Corroborating:** `skills/model-strategy/SKILL.md` Step 1 — *"Confirm the current Claude lineup (do NOT hardcode stale IDs)"* · `CLAUDE.md` `skill:model-strategy` block · `git:0fc116e` (2026-07-12) — shipping evidence.
- **Rationale:** stated in the primary source

## Follow-up

*Append-only. Everything above this heading is frozen.*

*(none yet)*

---

_Append-only. If this turns out to be wrong, **do not edit it** — write a new decision that supersedes it and links back._

_**Exactly two things in this file may ever change:** the `**Status:**` line and additions under `## Follow-up`._
