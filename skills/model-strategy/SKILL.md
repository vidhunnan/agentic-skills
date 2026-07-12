---
name: model-strategy
description: Creates and maintains docs/MODEL-STRATEGY.md — a tailored guide for which Claude model to use for which kind of work, with a mandatory review rule. Interviews you about your project's task categories first. Use when the user says "set up model strategy", "update the model strategy", "which model should I use for X", or runs /model-strategy. Claude Code primary; on Claude.ai it produces a downloadable artifact.
argument-hint: "[create|update]"
allowed-tools: Read, Write, Edit, Bash, AskUserQuestion
disable-model-invocation: false
---

# model-strategy

Produces a project-specific `docs/MODEL-STRATEGY.md`: which Claude model does which kind of work, why, and the review rules that guard the highest-stakes changes. It's a decision aid for both the human directing the work and the agent executing it — so model choice stops being ad-hoc.

Two principles:

- **Tailored, not boilerplate.** The assignments come from *this* project's task mix, gathered by a short interview — not a generic template.
- **IDs must be current.** Model names and IDs change. Confirm the live lineup every run; never emit an ID you didn't verify this session.

## Instructions

### Step 0 — Detect your surface

Using **Bash availability**:
- **Claude Code** — write `docs/MODEL-STRATEGY.md` and register the protocol.
- **Claude.ai** — no filesystem; produce the strategy as a downloadable Markdown artifact and skip CLAUDE.md registration (print the block for the user to paste).

### Step 1 — Confirm the current Claude lineup (do NOT hardcode stale IDs)

Model tiers and IDs age fast. Before writing anything, confirm the current lineup:
- If the `claude-api` skill is available, use it as the source of truth for current model names and IDs.
- Otherwise, ask the user to confirm the current models, or state clearly which IDs you're using and that they should be verified.

Baseline as of authoring (treat as *to be verified*, not trusted): Fable 5 = `claude-fable-5`, Opus 4.8 = `claude-opus-4-8`, Sonnet 5 = `claude-sonnet-5`, Haiku 4.5 = `claude-haiku-4-5-20251001`. **Never emit an ID you didn't verify this session.**

### Step 2 — Create vs. update

- If `docs/MODEL-STRATEGY.md` already exists: Read it, bump `**Version:**`, refresh `**Last updated:**` (`date +%F` via Bash), and update in place with Edit — preserving the tailored assignments unless they've changed.
- Otherwise, create it fresh.

### Step 3 — Interview the user (tailoring is the whole point)

Ask a short, relevant set (AskUserQuestion on Claude Code; plain text on Claude.ai), then wait for answers:
- What are the project's main task categories? (e.g. UI work, infra/architecture, docs, data migrations, boilerplate.)
- What's the highest-stakes / most review-worthy work — the stuff that must not break?
- How sensitive is this project to latency vs. answer quality?
- Does the app itself ship any AI features? (For the "own AI features" clarity section.)

### Step 4 — Assemble `docs/MODEL-STRATEGY.md`

Use this structure (mirrors a proven layout):

```md
# {Project} — Model Strategy
**Version:** {X} · **Last updated:** {YYYY-MM-DD}
**Audience:** the AI coding agent (Claude Code) executing the work, and the human directing it.

{1–2 sentence purpose}

---

## 1. The lineup

| Model | ID | Use for | Why |
|---|---|---|---|
| **{Model}** | `{id}` | {when} | {why} |

## 2. Assignment rules by work type

### {Model} — "{subtitle}"
{when to use it, from the interview}
- **{task category}** — {reason}

## 3. Mandatory review rule

{The invariant, e.g. highest-stakes work gets a review pass by a top-tier model.}

1. {invariant}
2. {invariant}

## 4. Escalation & de-escalation

- **Escalate (→ one tier up)** when: {conditions}
- **De-escalate (→ one tier down)** when: {conditions}

## 5. {Project}'s own AI features (for clarity)

{What the product itself does or doesn't do with models — or "N/A".}
```

Fill the lineup and assignments from Steps 1 and 3. Order tiers from most-capable/most-reserved to most-routine.

### Step 5 — Register the model-strategy protocol in CLAUDE.md

Idempotent registration (Claude Code only; on Claude.ai, print the block to paste):
1. Locate CLAUDE.md: `git rev-parse --show-toplevel` → `<root>/CLAUDE.md` (accept `.claude/CLAUDE.md`; prefer existing).
2. **Exists** → Read; search for `<!-- BEGIN skill:model-strategy -->`. Absent: show the block, ask (AskUserQuestion), insert under `## Skill protocols` (create the heading if needed), never blind-append. Present: update in place only if the block changed; else "already registered." Don't touch other skills' blocks.
3. **Missing** → don't stub; offer a full `/init`-style analysis (confirmation-gated) to generate a real CLAUDE.md, then insert.

Canonical block:
```md
<!-- BEGIN skill:model-strategy -->
### Model strategy
Model assignments for AI work in this project live in `docs/MODEL-STRATEGY.md`. Follow its assignment rules and the mandatory review rule when choosing a Claude model. Keep model IDs current (confirm against the live lineup, e.g. via the `claude-api` skill) rather than hardcoding stale ones. Update via `/model-strategy` when the lineup or task mix changes.
<!-- END skill:model-strategy -->
```

### Step 6 — Deliver

- **Claude Code:** write `docs/MODEL-STRATEGY.md` (create `docs/` if missing, with confirmation) and confirm the path.
- **Claude.ai:** produce a downloadable `MODEL-STRATEGY.md` artifact and note the protocol block to paste.

### Step 7 — Edge cases

- **Can't confirm the lineup** — use the baseline but flag every ID with "(verify)" and tell the user to confirm.
- **No `docs/` folder** — create it after confirming.
- **No AI features in the app** — §5 becomes "N/A — this project makes no model calls of its own."
- **Update with no real changes** — report "already current," still refresh `Last updated` only if something changed.
- **One-off "which model for X?"** — answer from the existing `docs/MODEL-STRATEGY.md` without rewriting the file.
