# agentic-skills — Model Strategy

**Version:** 1 · **Last updated:** 2026-07-12
**Audience:** the AI coding agent (Claude Code) executing the work, and the human directing it.

This repo has no build system, no tests, and no runtime — the artifact *is* the prose. That inverts the usual model-choice calculus: there is no compiler to catch a bad call, and a subtly wrong `description:` line ships as a skill that fires at the wrong moment in someone else's project. So the rule here is simple: **quality over speed, everywhere that matters.** This document says where it matters.

---

## 1. The lineup

Verified against the live lineup on 2026-07-12 (via the `claude-api` skill). Re-verify before editing — model IDs age fast.

| Model | ID | Use for | Why |
|---|---|---|---|
| **Opus 4.8** | `claude-opus-4-8` | The default for essentially all work in this repo: authoring `SKILL.md`, writing PRDs, reviewing and refactoring skills. | Most capable Opus-tier model; strongest at long-horizon, judgment-heavy work where correctness isn't mechanically checkable. This repo is exactly that. |
| **Fable 5** | `claude-fable-5` | Reserved. Reach for it only on a genuinely hard, unsolved design problem — e.g. reconciling the multi-surface split across the whole library, or a from-scratch protocol mechanism. | Most capable widely released model, but priced above Opus tier. Not worth it for prose that Opus 4.8 already handles well. |
| **Sonnet 5** | `claude-sonnet-5` | Repo plumbing and metadata: `plugin.json`, `marketplace.json` entries, README table rows, CODEOWNERS, PR templates. | Near-Opus quality on structured, schema-shaped edits at lower cost. These edits are mechanical and their correctness *is* checkable by eye. |
| **Haiku 4.5** | `claude-haiku-4-5-20251001` | Nothing, by default. | Nothing in this repo is high-volume or latency-critical enough to justify the quality tradeoff. Listed for completeness. |

---

## 2. Assignment rules by work type

### Opus 4.8 — "the default, and the one that touches the contracts"

Use it for anything where the output is judgment, not transcription.

- **Authoring `SKILL.md`** — the frontmatter `description` doubles as the auto-trigger matcher. Getting it right means predicting the natural-language phrasings a user will actually reach for, and *not* matching the ones they won't. That's a modeling problem, not a formatting one.
- **Writing PRDs** (`docs/prds/<name>.md`) — for a stub skill, the PRD *is* the source of truth for the output template, trigger rules, and per-surface behavior. A vague PRD produces a vague skill three steps later.
- **Reviewing and refactoring skills** — consistency across the library, and the idempotent-edit logic in the CLAUDE.md registration step, both require holding the whole system in view at once.
- **Anything touching the multi-surface split** — Claude Code vs Claude.ai produce different output mechanics from the same skill. This is the easiest thing in the repo to get subtly, silently wrong.

Run at `high` effort by default; `xhigh` for whole-library refactors or a new protocol mechanism.

### Sonnet 5 — "the plumbing tier"

Use it where the shape is fixed and a human can verify the result at a glance.

- **`plugin.json` / `marketplace.json`** — fixed schema, one new entry per skill.
- **README Skills-table rows** — one row, known columns.
- **Governance files** (CODEOWNERS, PR template) — boilerplate with a known target.

If a "plumbing" task turns out to require a judgment call — say, the marketplace entry forces a decision about how a skill is named or scoped — that is no longer plumbing. Escalate to Opus 4.8.

### Fable 5 — "break glass"

Not part of the routine loop. Justified only when Opus 4.8 has actually been tried on a hard design problem and come up short. Note the reason in the PR if you use it.

---

## 3. Mandatory review rule

The repo has no test suite, so review *is* the test suite. Two invariants:

1. **Anything that writes into a user's own repo gets a review pass by Opus 4.8 (or better) before merge.** That means the CLAUDE.md protocol-registration step in `changelog-tracker`, `model-strategy`, `branch-naming`, and `handoff-generator` — the idempotent `BEGIN`/`END` marker logic, in particular. A bug here corrupts a file that isn't ours, in a project we can't see. Never ship it from a lower tier and never ship it unreviewed.

2. **Every new or changed `description:` frontmatter line gets a deliberate trigger review.** Read it and ask both questions: *which phrasings fire this that shouldn't?* and *which phrasings should fire it and won't?* Over-triggering is the more common failure and the more annoying one.

A third, non-model rule that belongs here because it's the same class of irreversible: **this repo is headed for public release.** Before any commit, confirm nothing employer-specific, internal, or unreleased has crept into a skill, a PRD, or an example. That check is on the human, not the model.

---

## 4. Escalation & de-escalation

- **Escalate (Sonnet 5 → Opus 4.8)** when: the task stops being schema-shaped and starts requiring a judgment call; the edit touches trigger phrasing, per-surface behavior, or the CLAUDE.md registration mechanism; or the first attempt comes back plausible-but-off and you find yourself correcting it.
- **Escalate (Opus 4.8 → Fable 5)** when: a genuinely hard design problem has resisted a real Opus 4.8 attempt — not on the first try, and not speculatively.
- **De-escalate (Opus 4.8 → Sonnet 5)** when: the work is purely mechanical — adding the marketplace entry for a skill that's already designed, adding a README row, fixing a typo. If a human can verify it correct by reading it once, Sonnet 5 is enough.
- **Never de-escalate** the two review-rule items in §3, regardless of how small the diff looks.

---

## 5. agentic-skills' own AI features (for clarity)

**N/A — this project makes no model calls of its own.** The repo is Markdown end to end: skills are instructions *for* Claude, not code that invokes Claude. There is no SDK dependency, no API key, and nothing here to point a model ID at.

The distinction matters when reading this document: every model choice above is about **which model you use while working *on* this repo**, not about anything the repo does at runtime. If that ever changes — a validation script that calls the API, say — this section stops being N/A and needs a real answer.
