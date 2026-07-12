# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## What this repo is

A personal library of Claude / Cursor-compatible **agent skills**. Each skill is a self-contained folder of Markdown (a `SKILL.md` plus optional supporting docs) — there is no build system, no test runner, and no application code. "Working on the code" here means authoring and refining skill definitions and their specs.

Currently private; intended to go public once the first skill (`handoff-generator`) is solid.

## Layout & conventions

- **One folder per skill** under `skills/`, kebab-case, where the folder name **must match** the `name` field in that skill's `SKILL.md` frontmatter.
- Each skill's entry point is `skills/<name>/SKILL.md`. Its frontmatter (`name`, `description`, `allowed-tools`, `disable-model-invocation`, plus optionally `argument-hint`) is the contract that drives how and when the skill triggers — the `description` doubles as the auto-trigger matcher, so it must enumerate the natural-language phrases and the `/<name>` slash form that should fire it.
- **Skill folder = plugin.** Each `skills/<name>/` doubles as an installable plugin by carrying its own `.claude-plugin/plugin.json` next to `SKILL.md`. This is the reusable pattern for every future skill: it keeps the "one folder per skill under `skills/`" convention *and* the standalone-copy install (`cp -r skills/<name> ~/.claude/skills/`) working, with no separate `plugins/` tree.
- **PRDs for non-trivial skills** live in `docs/prds/<name>.md`. When a `SKILL.md` is still a stub, the PRD is the source of truth for the output template, trigger rules, and per-surface behavior — read it before implementing. Keep the PRD in sync when the skill's scope changes.
- **The repo-root `.claude-plugin/marketplace.json`** lists every skill as a plugin, each `source` pointing at its `skills/<name>` folder. Add an entry here whenever you add a skill.
- Nothing referencing internal/employer-specific systems or unreleased work belongs in this repo (it's headed for public release).

## Multi-surface design (the core architectural constraint)

Skills here are written to run on **two surfaces that do not share state**: Claude Code and Claude.ai. A skill's behavior must branch by surface, and this is the main thing that requires reading the PRD to get right. The `handoff-generator` PRD is the reference pattern:

- **Claude Code**: triggered by `/<name>` or natural phrasing; can write files directly into the project (e.g. `handoff/{date}-{slug}.md`, creating folders as needed) and confirm the path back.
- **Claude.ai**: triggered by explicit mention or description-match only; has no persistent project folder, so output is produced as a downloadable Markdown artifact instead.

When adding or editing a skill, keep this split explicit — the same skill produces different output mechanics depending on where it runs.

## Skill protocols — the CLAUDE.md registration pattern

Several skills (`changelog-tracker`, `model-strategy`, `branch-naming`, `handoff-generator`) enforce an ongoing convention in the **target project** they're used in — "document every commit," "follow the model policy," "name branches this way." Since Claude Code has no per-event hook here (by design — enforcement is CLAUDE.md-based, not hook-based), these skills make the behavior stick by **registering a protocol block into the target repo's `CLAUDE.md`**, which Claude re-reads every session.

The shared mechanism, embedded as a Step in each such skill:

- **One delimited block per skill**, under a `## Skill protocols` heading in the target CLAUDE.md:
  ```md
  <!-- BEGIN skill:<name> -->
  ### <Protocol title>
  <1–5 line protocol Claude follows>
  <!-- END skill:<name> -->
  ```
- **Idempotent:** match on the literal `BEGIN`/`END` markers (never the title). Absent → ask, then insert under `## Skill protocols`. Present → update in place only if changed; never duplicate; never touch other skills' blocks.
- **Missing CLAUDE.md:** don't stub — offer a full `/init`-style analysis (confirmation-gated) to generate a real one, then insert.
- **Claude.ai:** no filesystem — print the block for the user to paste.

When building a new skill that establishes a durable per-project convention, reuse this exact mechanism and marker format.

**Active protocols in this repo** (live blocks the skills registered here):

<!-- BEGIN skill:changelog-tracker -->
### Changelog protocol
After every substantive commit (skip merge commits and changelog-only commits), document it: create `changelog/commits/NNN-slug.md` (NNN = next zero-padded 3-digit number, slug = kebab-case of the subject) and update `changelog/CHANGELOG.md` (per-commit table newest-first, plus the dated section). Pull all data from git (`git log -1`, `git show --stat`). Run `/changelog-tracker` if unsure of the format.
<!-- END skill:changelog-tracker -->

<!-- BEGIN skill:branch-naming -->
### Branch naming
Branches follow: `<type>/<slug>` (kebab-case; `type` ∈ `feat`/`fix`/`chore`/`docs`/`refactor`) — e.g. `feat/handoff-generator`, `chore/changelog-baseline`. No area segment. Before creating a branch, derive a name from the work context and this convention, then confirm with the user. Use `/branch-naming` to generate one.
<!-- END skill:branch-naming -->

<!-- BEGIN skill:model-strategy -->
### Model strategy
Model assignments for AI work in this project live in `docs/MODEL-STRATEGY.md`. Follow its assignment rules and the mandatory review rule when choosing a Claude model. Keep model IDs current (confirm against the live lineup, e.g. via the `claude-api` skill) rather than hardcoding stale ones. Update via `/model-strategy` when the lineup or task mix changes.
<!-- END skill:model-strategy -->

## Adding a new skill

1. Write `docs/prds/<name>.md` for anything non-trivial (problem, goals/non-goals, workflow, output template, per-surface trigger + output table).
2. Create `skills/<name>/SKILL.md` with frontmatter whose `name` matches the folder and whose `description` lists the trigger phrases.
3. Add `skills/<name>/.claude-plugin/plugin.json` (minimal: `name`, `description`, `version`, `author`) so the folder is installable as a plugin.
4. Add the corresponding entry to the repo-root `.claude-plugin/marketplace.json`, with `source` pointing at `./skills/<name>`.
5. Add a row to the Skills table in `README.md`.

## Distribution

Skills are consumed three ways (see README for exact commands): the Claude Code plugin marketplace (`/plugin install <name>`), standalone copy into `~/.claude/skills/` or a project `.claude/skills/`, or zipped and uploaded to Claude.ai under Settings → Customize → Skills.
