# Contributing to agentic-skills

Thanks for your interest! This is a small, curated library of Claude / Cursor-compatible skills. Contributions are welcome via pull request.

## Workflow

`prod-stable` is the default branch and is protected: **nobody pushes to it directly.** All changes land through a pull request that the maintainer ([@vidhunnan](https://github.com/vidhunnan)) reviews and merges.

1. **Fork** the repo (or, if you're a collaborator, create a branch).
2. **Branch** off `prod-stable`, using a descriptive name: `feat/<skill-name>`, `fix/<thing>`, `docs/<thing>`.
3. Make your change and commit with a clear message.
4. **Open a pull request** against `prod-stable`. Fill out the PR template.
5. The maintainer reviews. Once approved, **the maintainer merges** — you won't have (and don't need) merge access.

> You can open PRs freely. Merging is restricted to the maintainer by design.

## Adding or changing a skill

**The fastest way is `/skill-scaffold`** — it generates all seven touchpoints below from a short interview. Do them by hand only if you'd rather.

Follow the conventions in [`CLAUDE.md`](CLAUDE.md) and the [README](README.md#repo-conventions):

- **One folder per skill** under `skills/`, kebab-case, matching the `name` field in its `SKILL.md`.
- Each skill folder carries its own `.claude-plugin/plugin.json` (it doubles as an installable plugin).
- Add a matching entry to the repo-root `.claude-plugin/marketplace.json`, with `source` pointing at `./skills/<name>`.
- For non-trivial skills, write a PRD in `docs/prds/<name>.md` and keep it in sync with the skill.
- Add a row to the right group in the README's Skills tables, and a line to the Install block.
- **Add the entry to `website/components/lib/skills.ts`** (`SKILL_GROUPS`). It's the site's single source of truth. Miss it and the published site silently goes stale — this is the step that used to be undocumented.

### Skill quality bar

- The `description` frontmatter must clearly list the trigger phrases and the `/<name>` slash form — it's what drives auto-invocation.
- Keep the multi-surface split explicit (Claude Code vs Claude.ai) where relevant.
- Don't reference internal, employer-specific, or unreleased systems — this repo is public.

## Validating before you open a PR

- JSON manifests parse: `python3 -m json.tool .claude-plugin/marketplace.json` and each `plugin.json`.
- The site builds: `cd website && npm run build`. `SKILL_GROUPS` is typed, so a malformed entry fails the build — which is the point.
- Trigger the skill locally (install from a local marketplace: `/plugin marketplace add ./`) and confirm it behaves as the PRD describes. Trigger it **two ways**: the `/<name>` slash form, and one of the natural phrases from its `description`. If the phrase doesn't fire it, the description is wrong — and that's a silent failure in the wild.

## Reporting issues

Open a GitHub issue describing the problem or proposal. For a new skill idea, a short description of the trigger, surfaces, and desired output is plenty to start.

## License

By contributing, you agree that your contributions are licensed under the repository's [MIT License](LICENSE).
