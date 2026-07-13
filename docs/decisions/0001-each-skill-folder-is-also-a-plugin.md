# 0001. Each skill folder is also a plugin

- **Status:** Accepted
- **Date:** 2026-07-12

## Context

The repo's stated convention was one folder per skill under `skills/`, kebab-case, with the folder name matching the `name` in its `SKILL.md` frontmatter. Skills also needed to be installable three ways: through the Claude Code plugin marketplace, by copying the folder into `~/.claude/skills/`, and by zipping it for upload to Claude.ai.

The Claude Code plugin format expects a `.claude-plugin/plugin.json` manifest. The obvious way to add that is a separate `plugins/` tree at the repo root — but doing so would split each skill across two locations, and the standalone-copy install path would no longer carry the manifest.

## Decision

Each `skills/<name>/` folder carries its own `.claude-plugin/plugin.json` alongside its `SKILL.md`, so the skill folder *is* the plugin. The repo-root `.claude-plugin/marketplace.json` lists every skill with a `source` pointing at `./skills/<name>`.

## Alternatives considered

- **A separate `plugins/` tree at the repo root** — the conventional layout, and the one the plugin format nudges you toward. It lost because it breaks the "one folder per skill under `skills/`" convention and severs the standalone-copy install path: a copied folder would no longer be a valid plugin.

## Consequences

- One folder is the unit of everything — authoring, installing, zipping, and publishing. `cp -r skills/<name> ~/.claude/skills/` and `/plugin install <name>` both work off the same directory.
- Each new skill must remember to add *two* manifests: its own `plugin.json` and an entry in the root `marketplace.json`. That duplication is the cost, and it is checked only by eye.

## Evidence

- **Primary:** `handoff/handoff-code-to-chat-2026-07-12-build-publish-skill.md` §Decisions Made
  > Packaging = "skill folder = plugin" — each `skills/<name>/` carries its own `.claude-plugin/plugin.json`; the marketplace `source` points at `./skills/handoff-generator` — chosen to preserve the README's "one folder per skill under `skills/`" convention and the standalone-copy install path.
- **Corroborating:** `CLAUDE.md` §Layout & conventions (restates the rule) · `git:dca4561` (2026-07-12, "Implement handoff-generator skill + plugin scaffold") — shipping evidence.
- **Rationale:** stated in the primary source

## Follow-up

*Append-only. Everything above this heading is frozen.*

- **2026-07-12** — Scope widened. Applied to three more skills (`changelog-tracker`, `model-strategy`, `branch-naming`) without the decision changing. Evidence: `git:506a5c6`.
- **2026-07-13** — Scope widened again, to `repo-setup` and `decisions-logger`. Six skills now follow the pattern; no migration was ever needed. Evidence: `git:32e425a`, `git:d6ee986`.

---

_Append-only. If this turns out to be wrong, **do not edit it** — write a new decision that supersedes it and links back._

_**Exactly two things in this file may ever change:** the `**Status:**` line and additions under `## Follow-up`._
