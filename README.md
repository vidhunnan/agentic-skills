# agentic-skills

Personal library of Claude / Cursor-compatible skills. Private for now — will flip public once the first skill is solid.

## Skills

| Skill | What it does | Surfaces | Status |
|---|---|---|---|
| [`handoff-generator`](skills/handoff-generator/SKILL.md) | Interactive, bidirectional Chat↔Code handoff brief — interviews you, then writes the brief | Claude Code, Claude.ai | Implemented ([PRD](docs/prds/handoff-generator.md)) |

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

## License

MIT — see [LICENSE](LICENSE).
