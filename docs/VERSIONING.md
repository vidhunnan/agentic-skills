# Versioning — agentic-skills

**Profile:** Claude Code plugin (one plugin per skill) · **Scheme:** semver
**Released version is owned by:** a commit on `prod-stable` — installs resolve from the
default branch, so merging *is* releasing. There is no registry and no tag today.
**Candidate builds:** an unpublished commit on a feature branch. There is no suffix to
apply and none is invented — a skill's version is a candidate until its branch merges.

Written and maintained by [`version-manager`](../skills/version-manager/SKILL.md).
Live state: `/version-manager status`.

## The unit of release is the skill, not the library

Each skill installs on its own (`/plugin install <name>`), so each carries **its own
version, bumped only when that skill changes**. A library-wide bump would tell someone
reinstalling `branch-naming` that something changed in a skill they don't have.

This is why the versions are uneven and should stay uneven: `handoff-generator` is at
`0.5.0` because it has been revised five times; everything else is at `0.1.0` because it
has shipped once.

## Version surface

| File | Field | Notes |
|---|---|---|
| `skills/<name>/.claude-plugin/plugin.json` | `version` | **Authoritative.** The only file carrying a version. |
| `.claude-plugin/marketplace.json` | — | Carries no `version` field, so it is **not** part of the surface. It is a *registration* check: every skill folder must have an entry, and every entry must point at a folder that exists. |
| `website/components/lib/skills.ts` | — | Same: no version, but the site's single source of truth. A skill missing here ships a stale site. |
| `README.md` | — | Skills table + install block. Registration only. |

So `status` on this repo checks two different things, and should say which is which:
**version agreement** (trivial here — one file per skill) and **registration completeness**
across the four touchpoints above.

## Bump rules

Per skill, on the change that lands it:

- **patch** — wording, a clarified step, a fixed path. Behaviour unchanged.
- **minor** — a new step, a new mode, a new output section, a changed trigger phrase set.
  This is the common one: skills are prose, and most real edits change what the skill does.
- **major** — the skill's output template or its contract with the target repo changes in
  a way that makes an existing project's files wrong. Renaming a protocol block's markers
  is a major: the old block stops being found and silently duplicates.

A **new skill starts at `0.1.0`**. Nothing here is `1.0.0` yet; that is deliberate.

## Ledger

[`changelog/VERSION-LOG.md`](../changelog/VERSION-LOG.md) — generated, newest-first, never
hand-edited. It records which skills moved and why, which is the part the per-skill
version numbers can't say on their own.

`changelog/commits/` and `changelog/CHANGELOG.md` belong to `changelog-tracker` and record
*what changed per commit*. This log records *what shipped per version*. They do not write
each other's files.
