# 0002. Enforce conventions in CLAUDE.md, not git hooks

- **Status:** Accepted
- **Date:** 2026-07-12

## Context

Several skills in this library (`changelog-tracker`, `model-strategy`, `branch-naming`, `handoff-generator`) don't just do a thing once — they establish an ongoing convention in the *target project* they're installed into: "document every commit," "follow the model policy," "name branches this way."

A convention that Claude forgets between sessions is not a convention. Something had to make the behavior persist across sessions with no shared memory.

## Decision

Skills make their conventions stick by **registering a delimited protocol block into the target repo's `CLAUDE.md`**, which Claude re-reads at the start of every session. Each block is wrapped in `<!-- BEGIN skill:<name> -->` / `<!-- END skill:<name> -->` markers, is idempotent (matched on the literal markers, never the title), and is inserted under a `## Skill protocols` heading only after the user confirms.

## Alternatives considered

- **Git hooks** — the mechanism you would normally reach for to fire behavior on a commit. It lost because there is no per-event hook available here for this purpose, and because a hook enforces mechanically while a protocol block enforces *by briefing*: it tells the agent what the convention is, which is what a memoryless teammate actually needs.

## Consequences

- The convention survives every new session for free, because CLAUDE.md is re-read each time. No infrastructure, no install step, nothing to keep running.
- **Enforcement is soft.** There is no hook, so "after every commit, document it" is a briefing, not a guarantee — it can be missed. This cost was accepted knowingly and is recorded as a risk in `docs/prds/changelog-tracker.md` §9.
- Any skill writing into a user's own `CLAUDE.md` is editing a file that isn't ours, in a project we can't see — which is why [0005](./0005-review-is-the-test-suite.md) mandates a top-tier review pass for exactly this code.

## Evidence

- **Primary:** `CLAUDE.md` §Skill protocols — the CLAUDE.md registration pattern
  > Since Claude Code has no per-event hook here (by design — enforcement is CLAUDE.md-based, not hook-based), these skills make the behavior stick by **registering a protocol block into the target repo's `CLAUDE.md`**, which Claude re-reads every session.
- **Corroborating:** `docs/prds/changelog-tracker.md` §9 Risks (records the soft-enforcement cost) · `git:506a5c6` (2026-07-12) — shipping evidence.
- **Rationale:** stated in the primary source

## Follow-up

*Append-only. Everything above this heading is frozen.*

- **2026-07-13** — Scope widened. `repo-setup` and `decisions-logger` both register protocol blocks by the same mechanism; six skills now use it. The marker format has not changed since it was introduced. Evidence: `git:32e425a`, `git:d6ee986`.

---

_Append-only. If this turns out to be wrong, **do not edit it** — write a new decision that supersedes it and links back._

_**Exactly two things in this file may ever change:** the `**Status:**` line and additions under `## Follow-up`._
