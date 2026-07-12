# Changelog

A running record of substantive changes to `agentic-skills`. Format loosely follows [Keep a Changelog](https://keepachangelog.com/).

## Per-commit documentation

Every substantive commit is documented in a file under [`commits/`](./commits/), numbered chronologically. Merge commits and changelog-only commits are omitted.

| # | Commit | Date | Subject |
|---|--------|------|---------|
| [003](./commits/003-add-changelog-baseline-model-strategy-and-skill-protocol-registrations.md) | `0fc116e` | 2026-07-12 | Add changelog baseline, model strategy, and skill protocol registrations |
| [002](./commits/002-add-install-commands-for-all-skills-in-readme.md) | `75f7a7c` | 2026-07-12 | Add install commands for all skills in README |
| [001](./commits/001-add-three-git-workflow-skills-shared-claude-md-registration.md) | `506a5c6` | 2026-07-12 | Add three git-workflow skills + shared CLAUDE.md registration |

---

## 2026-07-12

### Added
- **Three git-workflow skills** (`506a5c6`) — `changelog-tracker`, `model-strategy`, and `branch-naming`, each with a SKILL.md, plugin manifest, and PRD, plus a shared CLAUDE.md protocol-registration mechanism reused across the library (and retrofitted into `handoff-generator`).
- **Changelog baseline, model strategy, and protocol registrations** (`0fc116e`) — the repo dogfooding its own skills: `changelog/` (this index plus per-commit files), `docs/MODEL-STRATEGY.md` (Opus 4.8 as the default tier, Sonnet 5 for plumbing, plus a mandatory review rule for anything that writes into a user's own CLAUDE.md), and an "Active protocols" section in `CLAUDE.md` holding the live `changelog-tracker`, `branch-naming`, and `model-strategy` blocks.

### Changed
- **README install commands** (`75f7a7c`) — the Install section now lists `/plugin install` for all four skills, not just `handoff-generator`.
