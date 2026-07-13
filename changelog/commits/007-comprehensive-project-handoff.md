# Rework handoff-generator into a comprehensive project handoff

- **Commit:** `826dad19c3d062b754ad7e0ed8c15bc6f9255728` (`826dad1`)
- **Author:** Vidhunnan Murugan
- **Date:** 2026-07-13

## Commit message

The skill emitted a minimal five-section brief (Context, Decisions, Open Questions, Files, Next Actions) sourced only from the live conversation. That loses too much: the receiver still had to reconstruct where the project actually stands. The two reference handoffs the change is modelled on carry the whole state — progress, timeline, feature status, decisions, a changelog delta, and exact repo state.

Replace the brief with a single comprehensive project handoff (ten fixed sections): What this is · Snapshot · Progress & Timeline · Features/Components · Decisions Made · What this session changed · Open Questions · Files Referenced · Next Actions · Notes for the receiver.

The section shape is identical on both surfaces; only the sourcing differs. On Claude Code the handoff is verified against the repo — git for the timeline, `changelog/` for the session delta, `docs/decisions/` for decision cross-refs, workspaces/phases for features, and git for exact repo state — with graceful fallback when a source is absent. On Claude.ai everything is drawn from the conversation. Faithful-not-generative is kept and sharpened.

## Changes in detail

### `skills/handoff-generator/SKILL.md` (modified)

- **Frontmatter `description`** reframed to "comprehensive project handoff" and to name what it carries (progress, timeline, features, decisions, changelog delta), while keeping every existing trigger phrase so auto-invocation is unchanged.
- **Intro** rewritten: the skill now produces a ~10-section project handoff, and is explicitly surface-aware (same shape both surfaces; on Code verified against the repo, on Chat drawn from the conversation).
- **Step 3 rewritten** from a 5-item extraction list into: a Step 3A "gather repo facts first" block (concrete `git`/`changelog`/`docs/decisions` reads for Claude Code), the 10-section spec (Step 3B), a per-surface sourcing table, and a graceful-degradation rule so the skill still works on target projects that lack `changelog/`, `docs/decisions/`, or `docs/phases/`.
- **Step 4** gains derivation of a `Status:` (phase/stage) header value.
- **Step 5** template replaced with the comprehensive ten-section shape; the empty-section `- None.` contract and resume-only `Continued from:` rule are kept, plus a conditional `Status:` line.
- **Step 7 edge cases** add missing-repo-source degradation and an explicit "never invent a timeline or changelog not backed by git or the conversation."

### `docs/prds/handoff-generator.md` (modified)

- Status bumped to Draft v0.4. Problem, Goals, and Non-goals reframed from "lightweight brief" to "comprehensive project handoff" (keeping the manual-bridge and faithful-not-generative non-goals). §4 workflow, §5 template, and §6 functional-requirements table updated — §6 gains a **Sourcing** column describing the per-surface split.

### `handoff/_TEMPLATE.md` (modified)

- Replaced the five-section template with the comprehensive one so the repo's own handoff tier stays in sync with the skill; the footer note now states the surface-sourcing split and the no-invented-timeline rule.

### `handoff/README.md` (modified)

- "What goes here" lists the new section set; the "what does NOT go here" line softened so carrying progress/what-changed no longer reads as contradicting "not minutes."

### `skills/handoff-generator/.claude-plugin/plugin.json` (modified)

- `version` 0.3.0 → 0.4.0; `description` refreshed to match the new framing.

### `.claude-plugin/marketplace.json` and `README.md` (modified)

- Both one-line descriptions for `handoff-generator` refreshed to the comprehensive-handoff framing (README table row also notes the Claude Code repo-verification behavior).

## Files changed

```
 .claude-plugin/marketplace.json                    |   2 +-
 README.md                                          |   2 +-
 docs/prds/handoff-generator.md                     |  72 ++++---
 handoff/README.md                                  |   4 +-
 handoff/_TEMPLATE.md                               |  56 +++++-
 .../handoff-generator/.claude-plugin/plugin.json   |   4 +-
 skills/handoff-generator/SKILL.md                  | 223 +++++++++++++++------
 7 files changed, 267 insertions(+), 96 deletions(-)
```
