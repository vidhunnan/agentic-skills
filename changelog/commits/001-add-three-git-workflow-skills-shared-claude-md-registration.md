# Add three git-workflow skills + shared CLAUDE.md registration

- **Commit:** `506a5c6a9f1262d7780a92bd637a60c91a7f5221` (`506a5c6`)
- **Author:** Vidhunnan Murugan
- **Date:** 2026-07-12

## Commit message

New skills (each: SKILL.md + plugin.json + PRD, mirroring reviz.tools formats):
- changelog-tracker: documents every substantive commit into
  changelog/commits/NNN-slug.md + a rolling CHANGELOG index
- model-strategy: creates/maintains docs/MODEL-STRATEGY.md, tailored by interview
- branch-naming: suggests/creates branch names per the project's convention

Shared mechanism: each skill registers a delimited protocol block into the
target repo's CLAUDE.md (under ## Skill protocols) so the convention sticks
across sessions; idempotent, with a confirmation-gated /init-style fallback
when CLAUDE.md is absent. Documented as a repo convention in CLAUDE.md.

Retrofit: handoff-generator gains the same registration step (Step 6C),
Edit tool, plugin 0.3.0, PRD v0.3. Marketplace + README updated (4 skills).

Co-Authored-By: Claude Opus 4.8 <noreply@anthropic.com>

## Changes in detail

### `skills/changelog-tracker/SKILL.md` (new)
- Adds the changelog-tracker skill: a 10-step flow that documents substantive commits into `changelog/commits/NNN-slug.md` plus a rolling index, pulling all data from git.
- Skips merge and changelog-only commits so the log never documents itself.

### `skills/model-strategy/SKILL.md` (new)
- Adds the model-strategy skill: interviews the user, then writes a 5-section `docs/MODEL-STRATEGY.md` mapping task types to Claude models.
- Confirms the live model lineup each run instead of hardcoding IDs that would age.

### `skills/branch-naming/SKILL.md` (new)
- Adds the branch-naming skill: resolves the project's branch convention (CLAUDE.md → infer → define), proposes conforming names, and can create the branch after confirmation.

### `skills/{changelog-tracker,model-strategy,branch-naming}/.claude-plugin/plugin.json` (new)
- Per-skill plugin manifests so each folder installs as its own plugin (the repo's "skill folder = plugin" pattern).

### `docs/prds/{changelog-tracker,model-strategy,branch-naming}.md` (new)
- PRDs for the three new skills, mirroring the handoff-generator PRD shape (problem, goals/non-goals, workflow, templates, CLAUDE.md registration, risks).

### `skills/handoff-generator/SKILL.md` (modified)
- Retrofit: adds Step 6C (register the handoff protocol in CLAUDE.md) and adds `Edit` to allowed-tools, so handoff-generator uses the same shared registration mechanism.

### `skills/handoff-generator/.claude-plugin/plugin.json` (modified)
- Version bumped to 0.3.0 for the registration retrofit.

### `docs/prds/handoff-generator.md` (modified)
- Status → Draft v0.3; adds a "CLAUDE.md registration" subsection describing the shared mechanism.

### `.claude-plugin/marketplace.json` (modified)
- Registers the three new skills as plugins (marketplace now lists four).

### `CLAUDE.md` (modified)
- Documents the "Skill protocols — the CLAUDE.md registration pattern" section: the marker format, idempotency rules, and missing-CLAUDE.md fallback, as a reusable convention for future skills.

### `README.md` (modified)
- Adds three rows to the Skills table for the new skills.

## Files changed

```
 .claude-plugin/marketplace.json                    |  15 +++
 CLAUDE.md                                          |  19 +++
 README.md                                          |   3 +
 docs/prds/branch-naming.md                         |  64 ++++++++++
 docs/prds/changelog-tracker.md                     |  92 ++++++++++++++
 docs/prds/handoff-generator.md                     |   8 +-
 docs/prds/model-strategy.md                        |  73 +++++++++++
 skills/branch-naming/.claude-plugin/plugin.json    |   8 ++
 skills/branch-naming/SKILL.md                      |  76 ++++++++++++
 skills/changelog-tracker/.claude-plugin/plugin.json |   8 ++
 skills/changelog-tracker/SKILL.md                  | 137 +++++++++++++++++++++
 skills/handoff-generator/.claude-plugin/plugin.json |   2 +-
 skills/handoff-generator/SKILL.md                  |  31 ++++-
 skills/model-strategy/.claude-plugin/plugin.json   |   8 ++
 skills/model-strategy/SKILL.md                     | 117 ++++++++++++++++++
 15 files changed, 657 insertions(+), 4 deletions(-)
```
