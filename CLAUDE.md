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

## Adding a new skill

1. Write `docs/prds/<name>.md` for anything non-trivial (problem, goals/non-goals, workflow, output template, per-surface trigger + output table).
2. Create `skills/<name>/SKILL.md` with frontmatter whose `name` matches the folder and whose `description` lists the trigger phrases.
3. Add `skills/<name>/.claude-plugin/plugin.json` (minimal: `name`, `description`, `version`, `author`) so the folder is installable as a plugin.
4. Add the corresponding entry to the repo-root `.claude-plugin/marketplace.json`, with `source` pointing at `./skills/<name>`.
5. Add a row to the Skills table in `README.md`.

## Distribution

Skills are consumed three ways (see README for exact commands): the Claude Code plugin marketplace (`/plugin install <name>`), standalone copy into `~/.claude/skills/` or a project `.claude/skills/`, or zipped and uploaded to Claude.ai under Settings → Customize → Skills.
