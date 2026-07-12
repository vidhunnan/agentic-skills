# Add changelog baseline, model strategy, and skill protocol registrations

- **Commit:** `0fc116e0c0ef03b68812643a8b95a9a8aec03983` (`0fc116e`)
- **Author:** Vidhunnan Murugan
- **Date:** 2026-07-12

## Commit message

Add changelog baseline, model strategy, and skill protocol registrations

Captures the output of three git-workflow skills run against this repo:

- changelog/ — the CHANGELOG index plus per-commit files 001/002,
  documenting the two commits on the git-workflow-skills branch.
- docs/MODEL-STRATEGY.md — model assignments for work on this repo,
  with the mandatory review rule for anything that writes into a
  user's own CLAUDE.md.
- CLAUDE.md — an "Active protocols" section holding the live
  changelog-tracker, branch-naming, and model-strategy blocks.

Co-Authored-By: Claude Opus 4.8 <noreply@anthropic.com>

## Changes in detail

This is the repo dogfooding its own skills: the three git-workflow skills were run against `agentic-skills` itself, and this commit is their combined output.

### `docs/MODEL-STRATEGY.md` (added)
- Project-specific model strategy produced by `/model-strategy`, tailored via interview rather than templated.
- Assigns **Opus 4.8** as the default for all judgment-heavy work (authoring `SKILL.md`, PRDs, reviewing/refactoring skills), on the reasoning that a Markdown-only repo has no compiler or test suite to catch a bad call — the artifact *is* the prose.
- Assigns **Sonnet 5** to the plumbing tier (`plugin.json`, `marketplace.json`, README rows, governance boilerplate) where the shape is fixed and verifiable by eye; **Fable 5** is explicitly break-glass; **Haiku 4.5** is listed but assigned nothing.
- Codifies a mandatory review rule: anything that writes into a *user's own* `CLAUDE.md` (the idempotent `BEGIN`/`END` marker logic across four skills) gets an Opus-4.8-or-better review pass, and every new or changed `description:` frontmatter line gets a deliberate trigger review.
- §5 records that the repo ships no AI features of its own — it makes no model calls, so the strategy governs only work done *on* the repo.

### `CLAUDE.md` (modified)
- Adds an **"Active protocols in this repo"** area under the existing `## Skill protocols` heading, holding the live delimited blocks the skills registered against this repo.
- Registers three blocks: `skill:changelog-tracker`, `skill:branch-naming`, and `skill:model-strategy`.
- This makes the repo the first consumer of its own registration mechanism — the blocks are re-read by Claude each session, which is what makes the conventions stick without hooks.

### `changelog/CHANGELOG.md` (added)
- Rolling index in a Keep-a-Changelog-style layout: a per-commit table (newest first) plus a dated section grouping changes by type.
- Seeded with the two substantive commits already in history (`506a5c6`, `75f7a7c`).

### `changelog/commits/001-…md`, `changelog/commits/002-…md` (added)
- Per-commit baseline files for the two existing substantive commits, establishing the format subsequent entries follow.

## Files changed

```
 CLAUDE.md                                          | 17 +++++
 changelog/CHANGELOG.md                             | 22 ++++++
 ...orkflow-skills-shared-claude-md-registration.md | 81 ++++++++++++++++++++++
 ...dd-install-commands-for-all-skills-in-readme.md | 24 +++++++
 docs/MODEL-STRATEGY.md                             | 77 ++++++++++++++++++++
 5 files changed, 221 insertions(+)
```
