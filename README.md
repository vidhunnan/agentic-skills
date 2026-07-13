# agentic-skills

An agent starts every session with no memory of the last one. It doesn't need a better prompt — it needs a briefing.

These are the skills that write that briefing. They author the context files a project should have anyway: a changelog of what actually shipped, a decision log of why you chose what you chose, a handoff for where you left off. All of it is Markdown. None of it is code.

**Six skills, all live.** Install one, or all of them.

## Skills

### Set up the repo

Start here. It builds the folders the rest of them fill.

| Skill | What it does | Surfaces | Status |
|---|---|---|---|
| **[`repo-setup`](skills/repo-setup/SKILL.md)**<br>`/plugin install repo-setup` | Scaffolds your **context stack** — concepts, PRDs, decisions, handoffs, changelog. Surveys what you already have, adopts your existing folder names, and never moves or overwrites a thing. | Code · Chat | Live |

### Keep the record

The three questions a teammate with amnesia will ask.

| Skill | What it does | Surfaces | Status |
|---|---|---|---|
| **[`changelog-tracker`](skills/changelog-tracker/SKILL.md)**<br>`/plugin install changelog-tracker` | *What actually shipped?* — documents every substantive commit into a per-commit file plus a rolling index. Every fact comes from git. | Code | Live |
| **[`decisions-logger`](skills/decisions-logger/SKILL.md)**<br>`/plugin install decisions-logger` | *Why did we choose that?* — mines the project for decisions that were really made and writes each as an ADR with its evidence. Where the reasoning was never written down, it **asks** rather than inventing one. | Code · Chat | Live |
| **[`handoff-generator`](skills/handoff-generator/SKILL.md)**<br>`/plugin install handoff-generator` | *Where did we leave off?* — an interactive, bidirectional Chat↔Code **project handoff**: progress, timeline, features, decisions, changelog delta, open questions, next actions. Interviews you first; on Claude Code it verifies against the repo. | Code · Chat | Live |

### Working conventions

| Skill | What it does | Surfaces | Status |
|---|---|---|---|
| **[`branch-naming`](skills/branch-naming/SKILL.md)**<br>`/plugin install branch-naming` | Suggests and creates a branch name that follows your project's convention — read from CLAUDE.md, or inferred from your existing branches. | Code | Live |
| **[`model-strategy`](skills/model-strategy/SKILL.md)**<br>`/plugin install model-strategy` | Builds `docs/MODEL-STRATEGY.md` — which Claude model for which kind of work, tailored by interview, with a mandatory review rule. | Code | Live |

Every skill has a PRD in [`docs/prds/`](docs/prds/) — the spec behind it, and the thing to read before you change one.

## Install

### 1. Add the marketplace (once)

```
/plugin marketplace add vidhunnan/agentic-skills
```

### 2. Install the skills you want

```
/plugin install repo-setup
/plugin install changelog-tracker
/plugin install decisions-logger
/plugin install handoff-generator
/plugin install branch-naming
/plugin install model-strategy
```

Each skill is a separate plugin, so take one or take all six. The command for a single skill sits next to its name in the tables above.

### Other surfaces

**Claude Code, standalone (no plugin)** — copy the folder in:

```
cp -r skills/repo-setup ~/.claude/skills/
```

Use `.claude/skills/` inside a project instead of `~/.claude/skills/` to scope it to that project.

**Claude.ai** — zip a skill folder (e.g. `skills/handoff-generator/`) and upload it under **Settings → Customize → Skills**. Skills marked *Chat* above have a Claude.ai path; the others need a filesystem and git.

## The context stack

This is what `repo-setup` builds, and it's the idea the whole library is organised around. Each folder answers one question a human teammate would ask — and declares how far an agent should trust it.

| Question | Folder | How far to trust it |
|---|---|---|
| What are we even trying to build? | `docs/concepts/` | Hypothesis — future tense, disposable |
| What are we still deciding? | [`docs/prds/`](docs/prds/) | Proposal — a concept worth building |
| Why did we choose that? | [`docs/decisions/`](docs/decisions/README.md) | Truth — past tense, append-only |
| Where did we leave off? | [`handoff/`](handoff/) | Snapshot — the latest one wins |
| What actually shipped? | [`changelog/`](changelog/CHANGELOG.md) | **Truth** — generated from git |

**Done vs. explored.** `changelog/` is what shipped. Everything under `docs/` is what we *thought*. That's why the changelog sits outside `docs/` — the folder layout *is* the rule. Never cite a PRD as evidence that a feature exists; check the changelog, or check the code.

Mix the two and you've handed a teammate contradictory instructions. A human pushes back. An agent just agrees — confidently, in both directions.

## This repo runs on its own skills

Everything above was used to build this repo, so you can read the output before you install anything:

- **[`docs/decisions/`](docs/decisions/README.md)** — 14 ADRs explaining why this repo is shaped the way it is, each with the evidence it was drawn from. Written by `decisions-logger`. It also records the [five decisions whose reasoning was never written down](docs/decisions/0000-not-logged.md) — the honest gaps, kept visible rather than filled in with a plausible guess.
- **[`changelog/`](changelog/CHANGELOG.md)** — every substantive commit documented, with the diff and the reason. Written by `changelog-tracker`.
- **[`docs/MODEL-STRATEGY.md`](docs/MODEL-STRATEGY.md)** — the model policy this repo actually follows. Written by `model-strategy`.
- **[`handoff/`](handoff/)** — the briefs that carried this work between Claude.ai and Claude Code. Written by `handoff-generator`.
- **[`CLAUDE.md`](CLAUDE.md)** § Skill protocols — the live protocol blocks each skill registered, which is how the conventions survive a new session.

## Repo conventions

- One folder per skill under `skills/`, kebab-case, matching the `name` field in its `SKILL.md`.
- Each skill folder doubles as an installable plugin: it carries its own `.claude-plugin/plugin.json` alongside `SKILL.md`.
- Every skill ships a matching entry in the repo-root `.claude-plugin/marketplace.json` (its `source` points at the skill folder).
- Nothing referencing internal, employer-specific, or unreleased work goes in this repo.

## Contributing

PRs welcome. `prod-stable` is protected — open a pull request against it and the maintainer reviews and merges. See [CONTRIBUTING.md](CONTRIBUTING.md) for the workflow and skill conventions.

## License

MIT — see [LICENSE](LICENSE).
