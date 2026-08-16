# 0014. Never invent a rationale — an honest gap beats a plausible fiction

- **Status:** Accepted
- **Date:** 2026-07-13

## Context

`decisions-logger` mines a repo for the reasoning behind choices that were made. That is precisely the task where a language model invents rationale that sounds right — and a plausible fabricated reason is **indistinguishable from a real one** to every future reader. It would poison the one tier the rest of the project is supposed to trust.

The hazard is not hypothetical. A survey of this repo found 22 decisions, of which **four have no recorded reason at all**. `CLAUDE.md`'s `skill:branch-naming` block says branches carry *"No area segment"* — and says nothing about why, though `docs/prds/branch-naming.md` shows an alternative was weighed and dropped. A miner reading that block will produce a confident, fluent, entirely fabricated Context paragraph, and nothing downstream could tell it apart from the eighteen real ones.

## Decision

**An honest gap beats a plausible fiction.** Two mechanisms enforce it:

- **A source firewall.** A candidate may be *born* in a weak source but never *justified* by one. Sources are tiered by what they are permitted to contribute: files that state rules without reasons (protocol blocks, README conventions, CONTRIBUTING) may supply the *rule* and not one word of Context, Alternatives, or Consequences. A candidate sourced only from that tier is stamped `NOT STATED` **by construction** — it cannot be written from mined text at all, and is routed to the user.
- **An escape hatch on every question.** Every interview question offers *"I don't remember."* Choosing it produces a real ADR, with the alternative named and the reason recorded literally as `*(reason not stated)*`.

## Alternatives considered

- **Ban the weak sources outright** — the first design, and wrong. The four reason-less decisions exist *only* in those files, so banning them makes those decisions unfindable. The firewall is strictly stronger at the thing actually feared: it forbids the destination, not the reading.
- **Infer the "why" and tag it `(inferred — unverified)`** — fastest and most complete. It lost because a tag does not survive a copy-paste, a summary, or a reader in a hurry, and because it puts model-generated reasoning into the truth tier at all.
- **Log only what is provable and silently drop the rest** — it lost because *"we did this and nobody wrote down why"* is exactly what a reader needs to know before they change it. The gap is information.

## Consequences

- Every rationale in the log traces to a source or to a human's answer. Nothing in the tier is invented.
- Some ADRs are honestly incomplete, reading `*(reason not stated)*` — and that is a feature, not a defect: it marks a decision as safe to revisit rather than falsely settled.
- The skill cannot run fully unattended on a cold repo. Reason-less decisions require a human, and there is no way around that without giving up the property the whole design exists to protect.
- A reason supplied by a human years later is tagged as such (`supplied by {who} on {date}, not written down at the time`), because a reconstructed reason is not the same artifact as a recorded one.

## Evidence

- **Primary:** `skills/decisions-logger/SKILL.md` §Two principles and Step 3A, Invariant 1
  > A block that says *"Branches follow `<type>/<slug>`. **No area segment.**"* reads exactly like a decision and contains **zero reasoning**. A model that reads it will produce a beautiful, confident, entirely fabricated Context paragraph. The ban has to be on the *destination fields*, not on reading the file — because you must read it to find the candidate at all.
  >
  > **"I don't remember" is always an option.** […] **A decision with an honest gap is worth more than one with a plausible fiction.**
- **Corroborating:** `docs/prds/decisions-logger.md` §5 (the firewall and its three invariants) and §9 (the confabulation test as a shipping gate) · `git:d6ee986` (2026-07-13) — shipping evidence.
- **Rationale:** stated in the primary source

*Note on granularity: the firewall and the escape hatch share one Context — the confabulation risk — and are therefore two mechanisms of one decision, not two decisions.*

## Follow-up

*Append-only. Everything above this heading is frozen.*

- **2026-07-13** — Held, on its first real run. The backfill that produced this log classified four candidates as `NOT STATED` and routed them to the user rather than writing a rationale for any of them. Evidence: `docs/decisions/0000-not-logged.md`, and the `*(reason not stated)*` ADRs in this folder.
- **2026-08-16** — **Scope widened; the decision did not change.** Extended from code to design work, where the backstop this decision assumed does not exist: an invented rationale for code can eventually be checked against a diff, but a plausible reason for a layout choice is uncheckable forever. [0021](./0021-design-skills-never-make-the-design-decision.md) restates the rule for the design territory and hardens it into a scope limit on what those skills may produce at all. Evidence: `docs/decisions/0021-design-skills-never-make-the-design-decision.md`, `skills/design-decisions/SKILL.md`.

---

_Append-only. If this turns out to be wrong, **do not edit it** — write a new decision that supersedes it and links back._

_**Exactly two things in this file may ever change:** the `**Status:**` line and additions under `## Follow-up`._
