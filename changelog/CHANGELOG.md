# Changelog

A running record of substantive changes to `agentic-skills`. Format loosely follows [Keep a Changelog](https://keepachangelog.com/).

## Per-commit documentation

Every substantive commit is documented in a file under [`commits/`](./commits/), numbered chronologically. Merge commits and changelog-only commits are omitted.

| # | Commit | Date | Subject |
|---|--------|------|---------|
| [007](./commits/007-comprehensive-project-handoff.md) | `826dad1` | 2026-07-13 | Rework handoff-generator into a comprehensive project handoff |
| [006](./commits/006-rewrite-the-readme-around-the-context-stack.md) | `4ab3c74` | 2026-07-13 | Rewrite the README around the context stack |
| [005](./commits/005-add-decisions-logger-skill.md) | `d6ee986` | 2026-07-13 | Add decisions-logger skill |
| [004](./commits/004-add-repo-setup-skill-and-scaffold-this-repos-context-stack.md) | `32e425a` | 2026-07-13 | Add repo-setup skill and scaffold this repo's context stack |
| [003](./commits/003-add-changelog-baseline-model-strategy-and-skill-protocol-registrations.md) | `0fc116e` | 2026-07-12 | Add changelog baseline, model strategy, and skill protocol registrations |
| [002](./commits/002-add-install-commands-for-all-skills-in-readme.md) | `75f7a7c` | 2026-07-12 | Add install commands for all skills in README |
| [001](./commits/001-add-three-git-workflow-skills-shared-claude-md-registration.md) | `506a5c6` | 2026-07-12 | Add three git-workflow skills + shared CLAUDE.md registration |

---

## 2026-07-13

### Added
- **`repo-setup` skill** (`32e425a`) — scaffolds a project's context stack: the tiered docs folders (concepts, PRDs, decisions, handoffs, changelog, optional phases) that let an agent with no memory be briefed on a project, each declaring the question it answers and how far it can be trusted. It surveys a repo before writing, adopts existing folder names rather than imposing canon, and is strictly additive — it never moves, renames, or overwrites.
- **This repo's own context stack** (`32e425a`) — `repo-setup` run on `agentic-skills`: adds `docs/concepts/` and `docs/decisions/`, a README plus `_TEMPLATE.md` for all five tiers (adopting the existing `handoff/`, `docs/prds/`, and `changelog/` under their current names), and the context-stack routing table in `CLAUDE.md`.
- **`decisions-logger` skill** (`d6ee986`) — mines a project for the decisions that were actually made and writes each as a numbered ADR with its evidence. Built around a **source firewall**: a candidate may be *born* in a weak source but never *justified* by one, so a rule stated without a reason (CLAUDE.md's protocol blocks) can be found but never rationalized. Where the "why" was never written down it asks, and where nobody remembers it records `(reason not stated)` — it never invents one.

### Changed
- **`handoff-generator` reworked into a comprehensive project handoff** (`826dad1`) — the minimal five-section brief is replaced by a single ten-section project handoff (What this is · Snapshot · Progress & Timeline · Features/Components · Decisions Made · What this session changed · Open Questions · Files Referenced · Next Actions · Notes for the receiver). The section shape is identical on both surfaces; only the sourcing differs — on Claude Code it is verified against the repo (git for the timeline, `changelog/` for the session delta, `docs/decisions/` for decision cross-refs, git for exact repo state), degrading gracefully when a source is absent; on Claude.ai it is drawn from the conversation. Faithful-not-generative is kept and sharpened: never invent a timeline or changelog not backed by git, and never cite a PRD/concept as proof something shipped. PRD to v0.4; `handoff/_TEMPLATE.md` kept in sync; plugin `0.3.0 → 0.4.0`.
- **README rewritten around the context stack** (`4ab3c74`) — the install section is now three independently copyable blocks instead of one that ran all six installs at once, with each skill's `/plugin install` command beside its name in the table. The Skills tables are grouped by job (`repo-setup` builds the stack; `changelog-tracker` / `decisions-logger` / `handoff-generator` fill it; `branch-naming` / `model-strategy` hold the conventions), and the Status column reads `Live` rather than an identical "Implemented (PRD)" on every row. Adds "The context stack" (what each folder means and how far to trust it) and "This repo runs on its own skills" (where to find the 14 ADRs, the changelog, and the model strategy).
- **The decisions tier's append-only rule** (`d6ee986`) — made precise. The *reasoning* (Context/Decision/Alternatives/Consequences) is frozen; the `**Status:**` line is a navigational pointer and `## Follow-up` is append-only. A superseded ADR still reading "Accepted" lies to the next reader, so exactly two mutations are permitted, enforced by a byte-identical check on the frozen body. `docs/decisions/_TEMPLATE.md` gains `## Evidence` and `## Follow-up`.

## 2026-07-12

### Added
- **Three git-workflow skills** (`506a5c6`) — `changelog-tracker`, `model-strategy`, and `branch-naming`, each with a SKILL.md, plugin manifest, and PRD, plus a shared CLAUDE.md protocol-registration mechanism reused across the library (and retrofitted into `handoff-generator`).
- **Changelog baseline, model strategy, and protocol registrations** (`0fc116e`) — the repo dogfooding its own skills: `changelog/` (this index plus per-commit files), `docs/MODEL-STRATEGY.md` (Opus 4.8 as the default tier, Sonnet 5 for plumbing, plus a mandatory review rule for anything that writes into a user's own CLAUDE.md), and an "Active protocols" section in `CLAUDE.md` holding the live `changelog-tracker`, `branch-naming`, and `model-strategy` blocks.

### Changed
- **README install commands** (`75f7a7c`) — the Install section now lists `/plugin install` for all four skills, not just `handoff-generator`.
