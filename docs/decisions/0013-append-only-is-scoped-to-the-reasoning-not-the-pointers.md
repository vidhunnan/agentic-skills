# 0013. Append-only is scoped to the reasoning, not the pointers

- **Status:** Accepted
- **Date:** 2026-07-13

## Context

The decisions tier was created with a flat rule: *never edit a decision — supersede it with a new one that links back.*

That rule breaks the moment it is used. When decision 0002 is superseded by 0009, 0002's `**Status:**` line still reads **Accepted**. A reader who opens 0002 directly — which is what a link from anywhere else in the repo will do — is told the decision is live. It is not. The file is lying, and the strictest possible reading of "never edit" is what makes it lie.

## Decision

Append-only applies to the **reasoning**, not the **pointers**. The frozen region of an ADR is Context, Decision, Alternatives, and Consequences — the record of what was thought at the time, which never changes. **Exactly two mutations are permitted:**

1. The `**Status:**` line, repointed at a superseding decision.
2. An append under `## Follow-up`.

Enforced by mechanism, not intention: read the file, split it into (Status line) + (frozen body) + (Follow-up), and assert the frozen body is byte-identical before writing.

A superseded ADR also gets a dated Follow-up entry naming its successor — so the **authoritative** forward link lives in the append-only region, and the Status line is a derived cache of it. Nothing load-bearing depends on the one edit permitted.

## Alternatives considered

- **Pure append-only — never touch the file at all.** A superseded ADR keeps saying "Accepted"; its death is recorded only in its Follow-up section and in the index. It lost because a reader who opens the file and doesn't scroll is actively misled, and the purity buys nothing that the Follow-up entry doesn't already provide.
- **Allow free editing of superseded ADRs** — never seriously considered. It destroys the one property the tier exists to have.

## Consequences

- A superseded decision is honest at the top of the file, where a reader looks first.
- The "never edit" rule is now a rule with an exception, which is harder to state and easier to get wrong — mitigated by the byte-identical assertion, which makes the boundary mechanical rather than a matter of care.
- The index can be rebuilt from Follow-up entries alone, because the Status line is never the only record of a supersession.

## Evidence

- **Primary:** `docs/decisions/README.md` §What "append-only" means, exactly
  > The **frozen** region of an ADR is its reasoning: Context, Decision, Alternatives, Consequences. […] **The `**Status:**` line** — repointed when the decision is superseded. This is a *navigational* pointer, not history: a superseded ADR still reading "Accepted" is lying to the next reader. Updating a pointer isn't rewriting the past; refusing to is hiding it.
- **Corroborating:** `skills/decisions-logger/SKILL.md` Step 9 (the byte-identical enforcement) · `docs/prds/decisions-logger.md` §7 · `git:d6ee986` (2026-07-13) — shipping evidence.
- **Rationale:** stated in the primary source

*Note: this decision refines the flat "never edit a decision" rule written the day before (`git:32e425a`). It is recorded as one decision rather than as a supersession of that rule, because the earlier rule was never logged as an ADR — it existed only as prose in a README.*

## Follow-up

*Append-only. Everything above this heading is frozen.*

*(none yet)*

---

_Append-only. If this turns out to be wrong, **do not edit it** — write a new decision that supersedes it and links back._

_**Exactly two things in this file may ever change:** the `**Status:**` line and additions under `## Follow-up`._
