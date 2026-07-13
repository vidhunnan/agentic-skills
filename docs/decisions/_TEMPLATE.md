# {NNNN}. {The decision, as a statement — "Enforce conventions in CLAUDE.md, not git hooks"}

- **Status:** Proposed | **Accepted** | Superseded by [{NNNN}](./{NNNN}-{slug}.md)
- **Date:** {YYYY-MM-DD — when the decision was **made**, taken from the evidence. Not the
  day you logged it. Append *(approx.)* if inferred from the earliest evidence.}
- **Supersedes:** [{NNNN}](./{NNNN}-{slug}.md) *(omit if none)*

## Context

{What was true that forced a choice? The constraint, the pressure, the thing that broke.
Past tense — this is a record of a moment, not a plan.

If the pressure isn't in a source, write what **was** true. Do not narrate a motive nobody
wrote down.}

## Decision

{What was chosen. One paragraph, active voice: "We chose X." Not "we should choose X."

**One fork per decision.** If this paragraph needs an "and", you probably have two ADRs —
unless there is a single principle underneath, in which case name the principle rather than
listing its consequences.}

## Alternatives considered

- **{Option B}** — {why it lost. Be specific and be fair to it; a strawman here makes the
  whole record untrustworthy.}
- **{Option C}** — {why it lost.}

{**If you cannot name a single alternative a reasonable person would have picked, this is
not a decision** — it's a fact or a chore, and it does not belong in this folder.

If an alternative existed but the reason it lost was never written down, name the
alternative and write *(reason not stated)*. That is an honest and useful record. An
invented reason is neither.}

## Consequences

- {What this makes easy.}
- {What this makes hard — the cost you knowingly accepted. Do not leave this blank.
  A decision with no downside was not a decision.}

## Evidence

- **Primary:** `{path}` §{heading} — the **one** source this decision is drawn from.
  > {A short verbatim quote. Cite by quote as well as by path: paths rot, and this file is
  > forever.}
- **Corroborating:** `{path}` · `git:{short-hash}` ({YYYY-MM-DD}) — {what it confirms.}
- **Rationale:** stated in the primary source | supplied by {who} on {YYYY-MM-DD} (not
  written down at the time) | **not recoverable — no reason was ever recorded**

{Two citation rules, and they are the difference between a record and a rumour:

**A PRD may never be the Primary source.** A proposal is not evidence that anything shipped.
It may *corroborate* the reasoning behind a decision the changelog or the code proves shipped.

**Never cite a summary as the source of a "why" it is summarising.** If a changelog entry
describes another file, follow the link and cite that file. Primary means *original*, not
*most recent*.}

## Follow-up

*Append-only. Everything above this heading is **frozen**. Entries below are dated and
additive — evidence that the world moved, not a revision of what was decided.*

- **{YYYY-MM-DD}** — {one of: a predicted consequence materialised; the decision's scope
  widened without changing; a premise in the Context expired; practice drifted from this
  record.} Evidence: `{path}` / `git:{short-hash}`.

*(none yet)*

---

_Append-only. If this turns out to be wrong, **do not edit it** — write a new decision that
supersedes it and links back. Being wrong on the record is more useful to the next reader
than a clean file._

_**Exactly two things in this file may ever change:** the `**Status:**` line (to point at a
superseding decision) and additions under `## Follow-up`. The Status line is a convenience —
the authoritative forward link is the dated Follow-up entry. Everything else is frozen._
