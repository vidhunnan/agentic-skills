# PRD — decisions-logger

Status: Draft v0.1 · Owner: Vids · Repo: vidhunnan/agentic-skills

## 1. Problem

`repo-setup` creates `docs/decisions/` — the tier that answers *"why did we choose that?"*. Nothing fills it.

Meanwhile the reasoning behind every real choice in a project is scattered and rotting: half of it is in handoff briefs, some in PRD risk sections, some in commit bodies, some in CLAUDE.md prose, and a good deal of it only in someone's head. Six months later the code says *what*, and nobody can say *why*. An agent reading that repo will confidently propose undoing a decision whose reason it cannot see.

**But the obvious fix is a trap.** Decisions are the truth tier. Pointing a model at a repo and asking it to extract "why we chose X" is precisely where it invents rationale that sounds right — and a plausible fabricated reason is indistinguishable from a real one to every future reader. It poisons the one tier the rest of the project is supposed to trust.

A survey of this repo found **~22 real decisions: 18 with a recoverable why, and 4 without.** Those 4 (*"branch names carry no area segment"*, *"`prod-stable`, not `main`"*) are the whole problem: the rule is written down, the reason never was, and a naive implementation will produce four confident, plausible, entirely invented justifications.

## 2. Goals

- Mine a project for decisions that were **actually made**, and write each as a numbered ADR with its evidence.
- **Never invent a rationale.** Where the "why" isn't in a source, ask — and where nobody remembers, record `*(reason not stated)*`.
- Record **impact over time** without violating append-only, via a dated `## Follow-up` section.
- Keep an index (table + supersession graph) so "how we got here" is legible at a glance.
- Make the capture **proactive** — Claude offers to log a decision at natural milestones, while the reasoning is still recoverable.
- Be idempotent: safe to re-run, and it never re-proposes what you already rejected.

## Non-goals (v1)

- **Not a decision *maker*.** It records choices; it does not evaluate or recommend them.
- Not a rewriter. It never edits a logged ADR's reasoning (see §7).
- Does not create the decisions tier — that's `repo-setup`'s job, and its README/template are `repo-setup`'s files.
- No cross-repo or org-wide decision log.

## 3. Primary user

Vids, and anyone who has been building with an agent long enough that they can no longer reconstruct why the project is shaped the way it is.

## 4. Core workflow

1. Detect surface; resolve the mode (*none* / `check` / `reconsider` / free-text fast path).
2. Resolve the decisions path (`repo-setup`'s order); adopt the existing numbering scheme.
3. Load the existing ADRs and the reject ledger — the idempotency baseline.
4. **Mine the sources, firewalled by tier** (§5).
5. Apply the significance filter and the granularity rule (§6).
6. Dedup against both ledgers.
7. **Present the candidates with their evidence and a why-verdict.** Nothing is written before this gate.
8. **Interview only the gaps** — never invent a why.
9. Write ADRs; handle supersessions and follow-ups.
10. Rebuild the index; write the reject ledger; register the protocol in CLAUDE.md.

## 5. The source firewall

The central mechanism. **A candidate may be *born* in a weak source. It may never be *justified* by one.**

| Tier | Sources | May supply | May **never** supply |
|---|---|---|---|
| **S — primary** | `docs/MODEL-STRATEGY.md` · `handoff/*.md` §Decisions Made · tier `README.md`s · CLAUDE.md **narrative prose** | claim, why, alternatives, date | — |
| **A — corroborating** | PRD §Risks, §Non-goals, rationale paragraphs | the why, the named alternative | **existence** — never the `Primary:` citation |
| **B — anchors** | `git log` bodies (non-merge, multi-line) | date, hash, shipping proof | the rejected alternative; never the sole rationale |
| **C — index/dating** | `changelog/CHANGELOG.md`, `changelog/commits/*.md` | date, hash, shipping proof | **any rationale** — these are summaries |
| **D — rules, not reasons** | CLAUDE.md `<!-- BEGIN skill:* -->` blocks · README conventions · CONTRIBUTING | **the rule only** | **any word** of Context / Alternatives / Consequences |
| **X — never** | PRD §Open questions for v2 · `docs/decisions/` itself | — | everything |

A blanket *ban* on Tier D was considered and rejected: the four reason-less decisions exist **only** in those files, so a ban makes them unfindable. The firewall is stronger at the thing we actually fear — Tier D prose physically cannot reach a rationale field, so such a candidate is stamped `WHY: NOT STATED` **by construction** and routed to the interview.

### The three invariants

| # | Invariant | Failure mode it kills |
|---|---|---|
| R1 | Every sentence in Context / Alternatives / Consequences traces to Tier S, A, B, or a user answer. | **Rule-without-reason** — confabulating a why for a rule whose reason was never recorded. |
| R2 | An ADR requires shipping evidence (commit, changelog entry, or artifact on disk). **A PRD alone is never enough.** | **Proposal-as-truth** — logging a proposal as though it shipped. |
| R3 | Exactly one Primary, ranked by **originality, not recency**. If a changelog entry summarizes another file, follow the link and cite that file. | **Rationale laundering** — an ADR whose "why" is a paraphrase of a paraphrase. |

## 6. Significance and granularity

| ID | Requirement |
|---|---|
| R4 | **The Fork Test (hard gate).** A candidate must have a namable alternative *a reasonable person would have chosen*. `.gitignore` for `.DS_Store` has no loser → it's a fact, not a decision. |
| R5 | **Blast radius.** Reversal must touch more than one file, or force a second decision. |
| R6 | **Policy, not instance.** A line recording *compliance* with a rule is not a decision — the rule is. Collapse instances upward. |
| R7 | **One fork, one ADR**, tested by *independent reversal*: if reversing A forces you to re-open B, they are one decision. Corollary: shared Context or shared Alternatives → one ADR. A title needing an "and" → more than one, or you haven't found the principle. |
| R8 | **Co-location is not co-reasoning.** Never merge two decisions because they shared a commit or a document. |

R7 in practice: a model-strategy doc's *"Opus default / Sonnet plumbing / Fable break-glass / Haiku never"* is **one** ADR (four rows of one routing policy, one Context, one rationale spine). Its mandatory-review rule is a **separate** ADR — independently reversible, own stated why.

## 7. Append-only, made precise

The tier says *never edit a decision*. But a superseded ADR whose Status still reads **Accepted** is lying to the next reader. Resolved:

> **Append-only applies to the *reasoning*, not the *pointers*.** The frozen region is Context / Decision / Alternatives / Consequences. The Status line is *navigational* — it says where the file sits relative to the rest of the record. Updating a pointer is not rewriting history. Refusing to update it is hiding history.

| ID | Requirement |
|---|---|
| R9 | **Exactly two mutations** of an existing ADR are permitted: the `**Status:**` line, and appends under `## Follow-up`. |
| R10 | Enforced **by mechanism**: read → split (Status / frozen body / Follow-up) → assert the frozen body is **byte-identical** → write. "Be careful" is not a mechanism. |
| R11 | The superseded ADR also gets a dated Follow-up entry, so the **authoritative forward link lives in the append-only region** and the Status line is a derived cache of it. The index can be rebuilt from Follow-ups alone. |
| R12 | **Never auto-supersede.** Always confirm, and require the user to state the *why now* — the reason a decision changed is the most valuable sentence in the new ADR and is almost never in any source. |
| R13 | **No "partially superseded."** It makes the graph a lie. Restate the parts that carry over and supersede cleanly. One edge type only. |

**Follow-up triggers — exactly four**, or the section becomes a dumping ground: a predicted consequence materialized; the scope widened without the decision changing (the most common); a premise in the Context expired; **practice drifted from the record** (emit the Follow-up *and* raise a supersession candidate).

## 8. Functional requirements

| Surface | Trigger | Sources | Output |
|---|---|---|---|
| Claude Code | `/decisions-logger [check\|reconsider\|"<decision>"]`, natural phrasing ("log this decision", "backfill the decision log", "what have we decided"), or the proactive milestone offer | the live repo, tiered and firewalled (§5) | `docs/decisions/NNNN-slug.md` ADRs · appends to `## Follow-up` · the `0000-not-logged.md` ledger · the regenerated index region · the CLAUDE.md block |
| Claude.ai | explicit mention or description-match | whatever the user pastes | ADRs as downloadable artifacts + the index region and protocol block to paste. **Dedup, supersession detection, and the shipping cross-check are unavailable — the skill says so rather than guessing.** |

**Modes:** *none* = everything not yet logged · `check` = report, **zero writes** · `reconsider` = ignore the reject ledger for one run · `"<free text>"` = fast path, one ADR (**still runs dedup** — a milestone is the most likely moment to re-log something).

| ID | Requirement |
|---|---|
| R14 | **Every interview question offers "I don't remember."** It produces a real ADR with the alternative named and the reason as `*(reason not stated)*`. **Remove this option and the model fills the gap** — it is the single most important choice in the skill. |
| R15 | A user-supplied why is tagged `supplied by {who} on {date} (not written down at the time)`. A reason reconstructed years later is not the same artifact as one recorded in the moment. |
| R16 | **Date = when the decision was made**, from the evidence — never `date +%F`. Backfilling with today's date destroys the chronology the supersession graph depends on. |
| R17 | Numbering: 4-digit from `0001`; **`0000` reserved** for the ledger; re-scan and bump before each write; **never reuse a burned number**. Adopt an existing scheme; **never renumber**. |
| R18 | The reject ledger is a **prose table in git, not a hidden cache** — the record of what we chose not to record is part of the record, and the user must be able to see and correct it. Classes: `below-bar` / `declined` / `deferred` / `unshipped`. **"No" is permanent; "not now" is a snooze.** |
| R19 | **Always print the suppression count.** Suppression the user can't see is indistinguishable from a bug. |
| R20 | The index lives in a `<!-- BEGIN decisions-index -->` region of `docs/decisions/README.md` — **not** the `skill:*` namespace, which is reserved for CLAUDE.md protocol blocks. `repo-setup` owns the file; this skill owns the region. Mermaid graph renders **only connected components**; omitted entirely when there are no supersessions. |

## 9. Success criteria

- On this repo: ~22 candidates, ~18 `STATED` / ~4 `NOT STATED`.
- **The confabulation test.** *"Branch names carry no area segment"* is visible only in a Tier D source. It **must** come back `NOT STATED — will ask`. If the skill produces a Context paragraph explaining why, the firewall has failed and it is not shippable.
- **The noise test.** *"Added a `.gitignore` for OS cruft"* — a real line in a real handoff's Decisions Made — must fail the Fork Test and land in the ledger as `below-bar`.
- **The laundering test.** The model-strategy ADR cites `docs/MODEL-STRATEGY.md` as Primary, **not** the more-recent changelog file that summarizes it.
- Re-running reports "Decision log is current." Zero new files, zero re-proposed rejects.
- A supersession changes exactly one line of the superseded file.

## 10. Risks

- **Confabulation.** The whole point of §5 and R14. Residual risk: a Tier S source that *sounds* like it states a reason but is actually a restatement. Mitigated by R3 (cite the original) and by the user seeing the evidence at the propose gate.
- **The nag.** A skill that offers to log a decision every turn gets its CLAUDE.md block deleted within a week. Mitigated by *"offer once, be specific, take no for an answer"* in the block itself.
- **Ledger rot.** `0000-not-logged.md` grows and nobody reads it. Mitigated by keeping it hand-editable and always printing the suppression count.
- **Coupling to `repo-setup`.** This skill depends on its path-resolution order and does not own the tier's README or template. If `repo-setup` changes them, this skill's index region and template assumptions drift.

## 11. Open questions for v2

- Should `check` be runnable in CI as a "decisions drift" lint?
- Should follow-up detection run automatically on a schedule rather than only when the skill is invoked?
- Cross-linking: should a PRD's requirement IDs (`R1`, `R2`) be citable from an ADR's Consequences?
- Is there a useful "decision debt" metric — accepted decisions with expired premises and no follow-up?
