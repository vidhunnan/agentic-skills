# agentic-skills

Personal library of Claude / Cursor-compatible skills — small, focused tools you install into Claude Code or Claude.ai. The first skill, [`handoff-generator`](skills/handoff-generator/SKILL.md), is implemented and ready to use.

## Skills

| Skill | What it does | Surfaces | Status |
|---|---|---|---|
| [`handoff-generator`](skills/handoff-generator/SKILL.md) | Interactive, bidirectional Chat↔Code handoff brief — interviews you, then writes the brief | Claude Code, Claude.ai | Implemented ([PRD](docs/prds/handoff-generator.md)) |
| [`changelog-tracker`](skills/changelog-tracker/SKILL.md) | Documents every substantive commit into per-commit files + a rolling CHANGELOG index | Claude Code | Implemented ([PRD](docs/prds/changelog-tracker.md)) |
| [`model-strategy`](skills/model-strategy/SKILL.md) | Creates/maintains docs/MODEL-STRATEGY.md — which Claude model for which work, tailored via interview | Claude Code, Claude.ai | Implemented ([PRD](docs/prds/model-strategy.md)) |
| [`branch-naming`](skills/branch-naming/SKILL.md) | Suggests/creates a git branch name that follows the project's convention | Claude Code | Implemented ([PRD](docs/prds/branch-naming.md)) |

## Install

**Claude Code (plugin marketplace):**
```
/plugin marketplace add vidhunnan/agentic-skills
/plugin install handoff-generator
```

**Claude Code (standalone, no plugin):**
Copy the skill folder into `~/.claude/skills/` (personal) or `.claude/skills/` inside a project.

**Claude.ai:**
Zip the skill folder (e.g. `skills/handoff-generator/`) and upload it under Settings → Customize → Skills.

## Repo conventions

- One folder per skill under `skills/`, kebab-case, matching the `name` field in its `SKILL.md`.
- Each skill folder doubles as an installable plugin: it carries its own `.claude-plugin/plugin.json` alongside `SKILL.md`.
- Every skill ships a matching entry in the repo-root `.claude-plugin/marketplace.json` (its `source` points at the skill folder).
- PRDs for non-trivial skills live in `docs/prds/`.
- Nothing referencing internal/employer-specific systems or unreleased work goes in this repo.

## Contributing

PRs welcome. `prod-stable` is protected — open a pull request against it and the maintainer reviews and merges. See [CONTRIBUTING.md](CONTRIBUTING.md) for the workflow and skill conventions.

## License

MIT — see [LICENSE](LICENSE).
