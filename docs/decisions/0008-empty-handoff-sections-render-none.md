# 0008. Empty handoff sections render "None" rather than being omitted

- **Status:** Accepted
- **Date:** 2026-07-12

## Context

A handoff brief has a fixed set of sections: Context, Decisions Made, Open Questions, Files Referenced, Next Actions. Any given session might genuinely have nothing to put in one of them — a thread that resolved nothing has no decisions to record.

The receiver of a handoff is a fresh agent with no memory of the session. It has to be able to tell "there were no decisions" apart from "the decisions section is missing," and those two look identical if an empty section is simply dropped.

## Decision

Keep every section header, always. When a section has nothing in it, write an explicit line — `- None.`, `- None referenced in this conversation.`, `- [ ] (none identified — clarify scope with the user)` — rather than leaving it blank or omitting it.

## Alternatives considered

- **Omit empty sections** — the tidier output, and the obvious default. It lost because a stable shape is a reliable contract for the receiver: a missing section is ambiguous, an explicit "None" is information.

## Consequences

- The brief is machine-readable in the only way that matters here: a consumer can rely on the headings existing, so "was anything decided?" is answerable without inference.
- Briefs from thin sessions look padded, carrying headers with nothing under them. That is the intended trade — the padding *is* the signal.

## Evidence

- **Primary:** `handoff/handoff-code-to-chat-2026-07-12-build-publish-skill.md` §Decisions Made
  > Empty sections render explicit "None" lines rather than being omitted — a stable shape is a reliable contract for the receiver.
- **Corroborating:** `skills/handoff-generator/SKILL.md` Step 5 (*"A stable shape makes the brief reliable for the receiver."*) · `git:dca4561` (2026-07-12) — shipping evidence.
- **Rationale:** stated in the primary source

## Follow-up

*Append-only. Everything above this heading is frozen.*

- **2026-07-13** — Predicted benefit observed. `decisions-logger` mines `## Decisions Made` from handoff files; it can do so because the section is guaranteed to exist. Evidence: `skills/decisions-logger/SKILL.md` Step 3A (Tier S).

---

_Append-only. If this turns out to be wrong, **do not edit it** — write a new decision that supersedes it and links back._

_**Exactly two things in this file may ever change:** the `**Status:**` line and additions under `## Follow-up`._
