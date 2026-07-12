# PRD — model-strategy

Status: Draft v0.1 · Owner: Vids · Repo: vidhunnan/agentic-skills

## 1. Problem

Model choice is usually ad-hoc: people default to one model for everything, or guess. IDs get hardcoded into docs and go stale as the lineup changes. And the highest-stakes work often doesn't get a mandated review pass. `reviz.tools/docs/MODEL-STRATEGY.md` codified a per-project answer; this skill makes that reusable.

## 2. Goals

- Generate a tailored `docs/MODEL-STRATEGY.md` mapping the project's task types to the right Claude model, with reasons.
- Include a mandatory review rule for the riskiest changes.
- Keep model IDs current by confirming the live lineup each run (never hardcode stale IDs).
- Register itself in CLAUDE.md so the strategy is followed.

## Non-goals (v1)

- Not a benchmarking tool and not pricing advice.
- Doesn't choose the model for you at runtime — it's the policy doc that informs the choice.

## 3. Primary user

Vids and teams who want a deliberate, documented model policy per project.

## 4. Core workflow

1. Confirm the current lineup (via `claude-api` skill or the user).
2. Create vs. update `docs/MODEL-STRATEGY.md`.
3. Interview the user about task categories, highest-stakes work, latency-vs-quality, and any shipped AI features.
4. Assemble the 5-section doc.
5. Register the protocol in CLAUDE.md.
6. Deliver (file on Code, artifact on Claude.ai).

## 5. Output template

Title + `**Version:** X · **Last updated:** YYYY-MM-DD` + audience line, then:
- `## 1. The lineup` — table: Model | ID | Use for | Why.
- `## 2. Assignment rules by work type` — `### <Model> — "<subtitle>"` subsections + bulleted task assignments.
- `## 3. Mandatory review rule` — numbered invariants.
- `## 4. Escalation & de-escalation` — when to move a tier up/down.
- `## 5. <project>'s own AI features (for clarity)` — or "N/A".

## 6. Functional requirements

| Surface | Trigger | Interview | Output |
|---|---|---|---|
| Claude Code | `/model-strategy [create\|update]`, "set up/update model strategy" | task categories, stakes, latency/quality, shipped AI features | writes/updates `docs/MODEL-STRATEGY.md` |
| Claude.ai | explicit mention | same, in plain text | downloadable `MODEL-STRATEGY.md` artifact |

## 7. Lineup-currency requirement

Confirm current models each run; prefer the `claude-api` skill as source of truth. Baseline (to verify, not trust): Fable 5 `claude-fable-5`, Opus 4.8 `claude-opus-4-8`, Sonnet 5 `claude-sonnet-5`, Haiku 4.5 `claude-haiku-4-5-20251001`. Any unverified ID is labelled "(verify)".

## 8. CLAUDE.md registration

Idempotent `<!-- BEGIN skill:model-strategy -->…<!-- END -->` block under `## Skill protocols`; full `/init`-style generation offered (confirmation-gated) if CLAUDE.md is absent.

## 9. Success criteria

- The doc reflects the project's actual task mix (not a generic template).
- Every model ID was verified this session or flagged.
- A mandatory review rule is present.
- The protocol registers once (idempotent).

## 10. Risks

- **Stale IDs** — mitigated by confirming the lineup each run and labelling unverified IDs.
- **Interview fatigue** — keep it short; skip questions already answered by context.

## 11. Open questions for v2

- Auto-refresh the doc when a new model ships.
- Add a cost/latency column sourced from `claude-api`.
