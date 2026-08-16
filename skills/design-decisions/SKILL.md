---
name: design-decisions
description: Records a design fork as a numbered, append-only ADR in the design decisions tier — the options, what was chosen, what was given up, and what would make us revisit — with an index and supersession handling. Captures the reasoning while it still exists, and writes "(reason not stated)" rather than inventing one. Use when the user says "log this design decision", "why did we choose this", "record this design rationale", "write a design ADR", "we're going with X not Y", or runs /design-decisions. Claude Code primary; on Claude.ai it produces ADRs as downloadable artifacts.
argument-hint: "[check|reconsider|<the decision, in your own words>]"
allowed-tools: Read, Write, Edit, Bash, Glob, Grep, AskUserQuestion
disable-model-invocation: false
---

# design-decisions

Fills the **design decisions tier** — the folder that answers *"why is it like
this?"* six months after everyone who knew has forgotten.

`decisions-logger` can mine a codebase, because code leaves evidence: commits,
diffs, PR threads, a config file that changed on a date. **Design leaves none of
it.** A Figma file shows the winner and nothing else — not the options, not the
reasoning, not the cost. So this skill inverts its sibling's design: there is almost
nothing to mine, and the evidence has to be captured **from the person, in the
moment**, or it will not exist at all.

That makes the fabrication risk worse here than anywhere else in this library. In
code, an invented rationale can eventually be checked against a diff. **A plausible
reason for a layout choice is indistinguishable from a real one to every future
reader, forever.** There is nothing to check it against.

Three rules follow:

- **Faithful, not generative.** Every clause traces to a source or to the user's own
  words. `*(reason not stated)*` is a first-class outcome, not a failure —
  *"we did this, nobody wrote down why"* is exactly what a reader needs before they
  change it.
- **Name the loser or it isn't a decision.** Design is a continuous stream of small
  choices. Without a hard gate this tier fills with noise and stops being read.
- **Record the trade.** Design choices are nearly always trades — legibility against
  density, speed against delight. The traded-away half is the first thing anyone
  asks about later and the first thing that decays into "that's just how it is." So
  **What we gave up** is a required section, not an optional one.

## Instructions

### Step 0 — Detect your surface

Using **Bash availability**:

- **Claude Code** — Bash works, real filesystem. Full flow.
- **Claude.ai** — no filesystem, no existing ADRs to compare against. Degrade: ask
  the user to paste their index (or say there isn't one), run the interview
  conversationally, emit each ADR as a downloadable artifact plus the index region
  and the CLAUDE.md block. **Say plainly that dedup and supersession detection are
  unavailable here — do not guess at them.**

**Argument modes:**
- *(no argument)* — sweep the design tiers for unlogged forks (Step 3A).
- `check` — Steps 1–5 plus a report, **zero writes**.
- `reconsider` — ignore the reject ledger for one run.
- `"<free text>"` — the **fast path** (Step 3B), and the common case. The user just
  made a decision and is naming it.

### Step 1 — Resolve the decisions path

In descending authority:

1. **A path declared in a CLAUDE.md protocol block** — `skill:design-setup`'s
   routing table row for Decisions, or this skill's own block.
2. **An existing folder** — `design/decisions/`, `design/adr/`, `design-decisions/`.
   Match **case-insensitively**.
3. **Canon** — `design/decisions/`.

If **nothing exists**: do not create it silently. Recommend
`/design-setup add decisions` — that skill owns the tier's README and `_TEMPLATE.md`.
If the user declines, offer to create just the folder and the ADRs.

**This tier is separate from `docs/decisions/` by design.** Architectural and design
decisions have different audiences, different evidence, and different readers. If
the project keeps them together and says so, adopt that — but never merge them on
your own initiative.

Detect the existing **numbering scheme** (`0001-`, `001-`, `ADR-001-`) and **adopt
it. Never renumber** — renumbering breaks every inbound link and every supersession
edge.

### Step 2 — Load the existing record (the idempotency baseline)

Before anything else, read:

1. **Every ADR** in the tier — number, title, date, status, `Supersedes`, evidence
   citations.
2. **`{decisions}/0000-not-logged.md`** — the reject ledger, if present. This is
   what stops rejected candidates resurfacing forever.
3. **The index region** (`<!-- BEGIN design-decisions-index -->`), if present.

Reduce every ADR and candidate to a **normalized claim**:

```
{subject} := {chosen option}  ⟂  {rejected option}
```

e.g. `nav-placement := persistent-left-rail ⟂ collapsible-top-bar`

Dedup and supersession are the same comparison, two outcomes:

| Candidate vs. a logged ADR | Outcome |
|---|---|
| same subject, **same** chosen option | **duplicate** → drop |
| same subject, **different** chosen option | **supersession candidate** → Step 7 |
| different subject | **new** → proceed |

### Step 3 — Find the fork

#### 3A — The sweep (no argument)

**Be honest about how thin this is.** Unlike `decisions-logger`, there is no git
history of design choices to mine. The sources available:

| Tier | Source | May supply | May **never** supply |
|---|---|---|---|
| **S — primary** | this conversation · `design/explorations/` rounds with a stated *kept or killed — and why* · a handoff's `## Decisions Made` | claim, why, alternatives, date | — |
| **A — corroborating** | `design/briefs/` constraints and non-goals · `design/research/` findings | the *why*, the constraint a choice was made under | **existence.** A brief may never be the `Primary:` citation. |
| **B — anchors** | `design/specs/` · `design/system/` docs · the built product | proof it shipped, date | the rejected alternative |
| **D — rules, not reasons** | a system doc stating a rule with no reasoning ("buttons are always 44px") | **the rule only** — that a fork happened | **any word** of Context, Options, or What we gave up. Firewalled. |
| **X — never mine** | `{decisions}/` itself · brief `## Open questions` (unresolved ≠ decided) | — | everything |

The firewall matters most here. A system doc reading *"Cards use a 1px border, never
a shadow"* looks exactly like a decision and contains **zero reasoning**. A model
that reads it will produce a confident, entirely fabricated Context paragraph. A
candidate whose only source is Tier D is stamped `WHY: NOT STATED` **by
construction** and routed to the interview — it cannot be written from mined text at
all.

**If the sweep finds nothing, say so and stop.** Never manufacture an ADR to justify
the run.

#### 3B — The fast path (`/design-decisions "<the decision>"`)

The common case, and the one that matters most, because the reasoning is still in
the room. No sweep. Evidence is **this session**: what was just argued, the options
that were on the table, the user's own words. Still run the Step 2 dedup — the
moment a decision feels settled is the most likely moment to re-log something
already in the folder.

### Step 4 — The Fork Test (hard gate)

**Name the loser.** Can you name a *specific alternative a reasonable person would
have chosen*? If not, this is a preference, a task, or a fact — not a decision. Not
overridable by anyone's enthusiasm.

- *"Used the brand blue for the primary button"* → the loser is "some other colour",
  which nobody was arguing for. **Fail** — unless there was a real argument, in
  which case the fork is that argument, not the colour.
- *"Persistent left rail over a collapsible top bar"* → real, defensible, someone
  would have chosen the other. **Pass.**

Second gate — **blast radius**: reversal must touch more than one screen, or force a
second decision. Changing one icon is an edit. Reversing the nav model re-opens
every layout.

**Collapse instances into policies.** "This modal has no close button" is an
instance; the decision is the policy ("destructive modals require an explicit
choice"). Log the policy.

**One fork, one ADR.** The test is independent reversal: if reversing A forces you
to re-open B, they are one decision. If the title needs an "and", you have two ADRs
— or you haven't found the principle yet.

Everything filtered out goes to the reject ledger as `below-bar`, which is what
makes the filter idempotent instead of re-running its own judgment every time.

### Step 5 — Interview (never invent a why)

Cap at **4 questions**. Show the fork and the loser you inferred, then ask. **Every
question carries an "I don't remember" option** — the moment it doesn't, the model
fills the gap.

Four things to establish, in this order:

1. **Why did the winner win?**
   **(a)** I'll tell you · **(b)** I don't remember — log it as *(reason not
   stated)* · **(c)** Skip for now · **(d)** Don't log this
2. **What did we give up?** The required one. If the answer is "nothing", push once
   — a choice with no cost usually means the loser was never real, which sends this
   back to Step 4. Record `*(none identified)*` if it survives the push.
3. **What would make us revisit?** A condition, not a platitude. "If mobile passes
   60% of sessions" is a condition; "if it stops working" is not. `*(not stated)*`
   is fine.
4. **What was this weighed against?** The brief's constraints, a research finding, a
   technical limit. This is the Evidence anchor.

Outcomes:

- **(a)** → if the reason is being supplied now for a decision made earlier, record
  the provenance: `**Rationale:** supplied by {user} on {date} (not written down at
  the time)`. A reason reconstructed later is not the same artifact as one recorded
  in the moment, and the record should say so.
- **(b)** → write the ADR with the alternative **named** and the reason literally
  `*(reason not stated)*`. Context describes **what was true**, never a motive.
- **(c)/(d)** → reject ledger, class `deferred` / `declined`.

### Step 6 — Write the ADR

- **Numbering:** 4-digit, zero-padded, from `0001`. **`0000` is reserved** for the
  reject ledger. Next = highest existing prefix + 1; re-scan immediately before
  writing, bump on collision, **never overwrite**, **never reuse a burned number**.
- **Slug:** kebab-case of the decision statement, ≤ 60 chars.
- **Date = when the decision was MADE**, from the evidence — **not today**. Only the
  earliest evidence date available? Use it and mark `(approx.)`. Today's date
  appears only in Follow-up entries and the ledger.
- If the folder has a **pre-existing template** with different sections, adopt it.
  Never rewrite existing ADRs to match a new one.

```md
# {NNNN}. {The decision, as a statement}

**Status:** Accepted
**Date:** {YYYY-MM-DD}
**Supersedes:** —

## Context
{What was true when this came up. The situation, never a motive.}

## Options considered
| Option | The bet | Why it lost |
|---|---|---|
| {A} | {…} | {…} |
| **{B} — chosen** | {…} | — |

## Decision
{What was chosen, stated plainly.}

## What we gave up
{The cost. Required — `*(none identified)*` if it survived the push.}

## What would make us revisit
{The condition. `*(not stated)*` if none.}

## Evidence
- Primary: {this conversation, {date} | design/explorations/{round} | …}
- {supporting}

## Follow-up
- None yet.
```

### Step 7 — Supersession

**Append-only applies to the *reasoning*, not the *pointers*.** The frozen region is
Context / Options / Decision / What we gave up / What would make us revisit. The
**Status line is navigational** — a superseded ADR still reading **Accepted** is
lying to the next reader.

**Exactly two mutations of an existing ADR are ever permitted:**

1. The `**Status:**` line → `Superseded by [0009](./0009-….md)`.
2. An append under `## Follow-up`.

**Enforce this by mechanism:** read the file, split it into (Status line) + (frozen
body) + (Follow-up), and **assert the frozen body is byte-identical** to what you
read. If it isn't, abort and report. "Be careful" is not a mechanism.

The superseded ADR also gets a dated Follow-up entry, so the authoritative forward
link lives in the append-only region and the Status line is a derived cache of it:

```md
- **{date}** — Superseded by [0009](./0009-….md). Reason: {why now}. Evidence: {…}.
```

- The new ADR carries `**Supersedes:** [0003](./0003-….md)`.
- **Never auto-supersede.** Always confirm, and **require the user to state the *why
  now*** — the reason a design decision changed is the most valuable sentence in the
  new ADR and is almost never written anywhere.
- **No "partially superseded."** If the new decision changes any part of the old
  Decision, the old one is Superseded, full stop, and the new ADR **restates** what
  carries over.

### Step 8 — Follow-ups

For each **Accepted** ADR, scan for evidence newer than its date. **Exactly four
triggers**, so the section doesn't become a dumping ground:

1. **A predicted cost materialized** — the ADR said density would suffer; a later
   critique or research finding says it did. The record should say the bill came due.
2. **The scope widened without the decision changing** — decided for one screen,
   later applied to the whole product. The most common legitimate follow-up.
3. **A premise expired** — the Context said "desktop-first"; mobile is now the
   majority. The decision may still stand, but the next reader must know.
4. **Practice drifted from the record** — the product no longer matches the ADR and
   nobody superseded it. **The loud one:** emit the follow-up *and* raise a
   supersession candidate. Never let drift pass as "just a follow-up."

**Not a follow-up:** restating the decision, a new decision, a supersession, or
anything undated or without a citation. The frozen-body byte-check applies to every
append.

### Step 9 — Reject ledger and index

**`{decisions}/0000-not-logged.md`** — a prose table in git, not a hidden cache. The
record of what we chose not to record is part of the record. Classes: `below-bar`
(failed the Fork or blast-radius test) · `declined` (the user said no) · `deferred`
(*not now* — re-proposed as a footnote) · `unshipped` (no evidence it was built —
re-proposed automatically once there is).

**Always print the suppression count**, even when zero. Suppression the user can't
see is indistinguishable from a bug.

**The index** lives in a `<!-- BEGIN design-decisions-index -->` … `<!-- END
design-decisions-index -->` region of the tier's `README.md` — deliberately a
different marker from `decisions-logger`'s `decisions-index`, so the two tiers never
clobber each other. The region is **generated and fully rewritten every run**;
everything outside the markers is never touched. If the README is absent, don't stub
it — write to `{decisions}/INDEX.md` and recommend `/design-setup add decisions`.

```md
<!-- BEGIN design-decisions-index -->
## Index

*Generated by `/design-decisions` from the ADR files. Edit the ADRs, not this table.*

| # | Decision | Date | Status | Gave up | Follow-ups |
|---|---|---|---|---|---|
| [0001](./0001-persistent-left-rail.md) | Persistent left rail over a collapsible top bar | 2026-08-02 | Accepted | Vertical space on small screens | 1 |
<!-- END design-decisions-index -->
```

Keep the **Gave up** column. A tier whose costs are legible at a glance is one
people actually read, and it is the earliest warning that a supersession is coming.

### Step 10 — Register the protocol in CLAUDE.md

1. Locate CLAUDE.md: `git rev-parse --show-toplevel` → `<root>/CLAUDE.md` (accept
   `.claude/CLAUDE.md`; prefer existing).
2. **Exists** → Read; search for the literal `<!-- BEGIN skill:design-decisions -->`.
   Absent: show the block, ask (AskUserQuestion), insert under `## Skill protocols`
   (create the heading if needed), never blind-append. Present: update only if
   changed; else "already registered." Don't touch other skills' blocks — in
   particular, `skill:decisions-logger` governs a **different tier** and is not
   yours to edit.
3. **Missing** → don't stub; offer a full `/init`-style analysis
   (confirmation-gated), then insert.

Canonical block:
```md
<!-- BEGIN skill:design-decisions -->
### Design decision log
Design forks live in `design/decisions/` as numbered ADRs (`NNNN-slug.md`), separate from the architectural log in `docs/decisions/`. The tier is **truth**: past tense, **append-only**. The only edit ever permitted to a logged ADR is its `**Status:**` line; everything else is superseded or appended under `## Follow-up`.

Every design ADR records **what we gave up** and **what would make us revisit** — a design choice is a trade, and the traded-away half is what decays into "that's just how it is."

**Offer to log at the fork, not later.** Design reasoning is not recoverable: there is no diff, no commit, no blame line. When a direction is chosen over a named alternative, offer once — specifically — and take no for an answer. **Never invent a rationale.** If nobody remembers why, write `*(reason not stated)*`; an honest gap is worth more than a plausible fiction, and here there is nothing to check the fiction against. Run `/design-decisions` to log one.
<!-- END skill:design-decisions -->
```

### Step 11 — Confirm back

Report every ADR written, every follow-up appended and to which ADR, every
supersession showing both edits, the index rewritten, ledger rows by class, and
**every candidate not proposed, with the reason**.

### Step 12 — Edge cases

- **Zero candidates** — "Design decision log is current. Nothing to log." Stop.
  **Never manufacture an ADR to justify the run.**
- **The user wants the rationale written for them** ("just write why we did it") —
  decline the substance. Explain that here, unlike code, there is nothing to check
  an invented reason against. Offer `*(reason not stated)*` with the alternative
  named, which is a genuinely useful record.
- **"It just looked better."** A real and common answer — record it verbatim as the
  rationale. Do not upgrade it into a principle about hierarchy or balance the user
  did not state. An honest thin reason beats a fabricated thick one.
- **The fork was never actually resolved** — two directions still in play. That is
  not a decision; it belongs in the brief's Open questions. Say so.
- **A decision that contradicts a live ADR, neither superseding** — report
  **loudly**, propose the supersession, and **never silently reconcile them.** This
  is the failure the tier exists to prevent.
- **The tier doesn't exist** — never create it silently (Step 1).
- **Pre-existing ADRs on a different template** — adopt them. Never retrofit
  sections into a frozen file. New ADRs use the new shape; old ones keep theirs.
  Appending a Follow-up is always legal.
- **Evidence is only "this conversation"** — legitimate, and the common case for
  design. Cite it explicitly with the date rather than implying a document exists.
- **The design tiers don't exist at all** — the sweep has nothing to read. Say so
  and use the fast path instead of reporting an empty result as if it meant
  "nothing was decided."
- **User cancels at the gate** — print the ADRs inline, write nothing. A legitimate
  outcome, not a failure.
