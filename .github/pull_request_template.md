<!-- Thanks for contributing! Please fill this out so the maintainer can review quickly. -->

## What & why

<!-- What does this PR change, and why? Link any related issue (e.g. Closes #12). -->

## Type of change

- [ ] New skill
- [ ] Change to an existing skill
- [ ] Docs / conventions
- [ ] Packaging (marketplace / plugin manifest)
- [ ] Other:

## Checklist

- [ ] Branched off `prod-stable`; PR targets `prod-stable`.
- [ ] Followed the conventions in `CONTRIBUTING.md` / `CLAUDE.md`.
- [ ] For a skill change: `SKILL.md` frontmatter (`name`, `description`, trigger phrases) is correct and, if non-trivial, the PRD in `docs/prds/` is updated to match.
- [ ] For a new skill: added `.claude-plugin/plugin.json`, a `marketplace.json` entry, and a README Skills-table row.
- [ ] JSON manifests parse (`python3 -m json.tool ...`).
- [ ] Triggered/tested the skill locally and it behaves as described.
- [ ] No internal, employer-specific, or unreleased references.

## Notes for the reviewer

<!-- Anything you want the maintainer to focus on, or open questions. -->
