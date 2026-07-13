# 0005. Review is the test suite

- **Status:** Accepted
- **Date:** 2026-07-12

## Context

The repo has no test suite. There is nothing that can fail red before a bad change ships. Two classes of mistake are therefore irreversible in practice, because nothing else will catch them:

- Code that **writes into a user's own repo** — the CLAUDE.md protocol-registration step ([0002](./0002-enforce-conventions-in-claude-md-not-git-hooks.md)), and its idempotent `BEGIN`/`END` marker logic in particular. A bug there corrupts a file that isn't ours, in a project we can't see.
- A **`description:` frontmatter line**, which doubles as the auto-trigger matcher. Get it wrong and the skill fires at the wrong moment in someone else's session.

## Decision

Where a mistake would be invisible or would land in someone else's repo, **mandate a review pass at the top tier, and never de-escalate it** — regardless of how small the diff looks. Two invariants:

1. Anything that writes into a user's own repo gets a review pass by Opus 4.8 or better before merge.
2. Every new or changed `description:` line gets a deliberate trigger review, asking both *which phrasings fire this that shouldn't* and *which should fire it and won't*.

## Alternatives considered

- **Trust the model tier** — let [0004](./0004-route-model-choice-by-checkability-not-cost.md)'s routing policy be sufficient on its own, with no separate mandatory review. It lost because the tier policy protects against using a *weak* model; it does nothing about a strong model being confidently wrong, and there is no test to catch that here.
- **Add a test suite** — not attempted. The artifact is prose; there is no obvious thing to assert.

## Consequences

- The two most dangerous surfaces in the library get a guaranteed second look, and neither can be quietly shipped from a lower tier "because the diff was small."
- It is a human discipline, not a mechanism. Nothing enforces it — the same soft-enforcement cost that [0002](./0002-enforce-conventions-in-claude-md-not-git-hooks.md) accepted.
- Over-triggering is explicitly named as the more common and more annoying failure, which biases the trigger review toward tightening rather than broadening.

## Evidence

- **Primary:** `docs/MODEL-STRATEGY.md` §3 Mandatory review rule
  > The repo has no test suite, so review *is* the test suite. […] **Anything that writes into a user's own repo gets a review pass by Opus 4.8 (or better) before merge.** […] A bug here corrupts a file that isn't ours, in a project we can't see. Never ship it from a lower tier and never ship it unreviewed.
- **Corroborating:** `docs/MODEL-STRATEGY.md` §4 (*"Never de-escalate the two review-rule items in §3, regardless of how small the diff looks."*) · `git:0fc116e` (2026-07-12) — shipping evidence.
- **Rationale:** stated in the primary source

*Note on granularity: §3's two invariants share one Context — "the repo has no test suite, so review is the test suite" — and are therefore one decision, not two. §1's model routing is independently reversible and is recorded as [0004](./0004-route-model-choice-by-checkability-not-cost.md).*

## Follow-up

*Append-only. Everything above this heading is frozen.*

- **2026-07-13** — Predicted scope held. `repo-setup` and `decisions-logger` both write into a user's own CLAUDE.md, so both fall under invariant 1; both PRs flag the review requirement explicitly. Evidence: `docs/prds/repo-setup.md`, `docs/prds/decisions-logger.md`.

---

_Append-only. If this turns out to be wrong, **do not edit it** — write a new decision that supersedes it and links back._

_**Exactly two things in this file may ever change:** the `**Status:**` line and additions under `## Follow-up`._
