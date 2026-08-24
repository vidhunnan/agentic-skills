# feat(version-manager): split the released version from the build you're testing

- **Commit:** `06cc13742b7d0975487eb31ac3aaaa235dfd340e` (`06cc137`)
- **Author:** Claude
- **Date:** 2026-08-24

## Commit message

Generalises reviz.tools' versioning system into a skill. That system exists
because of a real drift bug: local test builds and the release shared one
version number, so packing a build to try it in a demo app moved the number npm
would publish next, and nothing in the repo could say which was true.

The fix was structural rather than careful, and it is what this skill encodes:
two tracks that are never conflated (a released version with exactly one writer,
and candidate builds carrying a suffix that cannot be published), a version
surface — every file carrying the number — that is checked for agreement, and a
generated newest-first ledger where each candidate row names the release it
targets and each release row names the candidate that became it.

The abstraction is artifact-agnostic, so the profile catalog covers npm, Claude
Code plugins, Docker, PyPI, binary/CLI releases, deployed sites, editor
extensions, mobile apps and plain exports, plus an interviewed unknown. It lives
in references/profiles.md — the first supporting file in this library — so it can
grow without SKILL.md carrying ten profiles inline.

Two rules from the catalog worth naming here: a moving tag is not a version
(Docker's :latest and npm's dist-tags are pointers, so the ledger records the
digest or exact version beside them), and mobile's marketing-version plus
build-number pair is not a special case — it is the released/candidate split
with both halves given their own field.

Registered across all seven touchpoints. The catalogue is fifteen skills now, so
the counts and the comments that state them were updated with it; the website's
own assertions derive from TOTAL_SKILLS and needed no change.

## Changes in detail

### `skills/version-manager/SKILL.md` (new)
- The skill. Frontmatter whose `description` enumerates the phrases that should fire it
  ("what version are we on", "cut a release", "bump the version", "my local build
  drifted"), plus the `/version-manager` slash form.
- Five modes behind one `argument-hint`: `status` (zero writes — released version, the
  surface with a sync mark per file, latest candidate, published state, next-bump
  preview), `init` (detect → interview → policy + ledger + CLAUDE.md block), `local`
  (record a candidate build), `release` (pre-flight → bump the whole surface → log → hand
  off), and an opt-in `scaffold`.
- Two invariants stated up front, because they are the reason the skill exists: a
  candidate build never moves the released version and restores the manifest even on
  failure; and every version, date and change line comes from git, the manifest or the
  registry — a plausible invented row is worse than an empty ledger.
- States explicitly that it does **not** own `changelog/commits/` or `CHANGELOG.md`. Those
  are `changelog-tracker`'s; this skill owns `VERSION-LOG.md` only. Two skills writing the
  same folder needed a boundary in writing.

### `skills/version-manager/references/profiles.md` (new)
- The artifact-profile catalog: npm, Claude Code plugin, Docker, Python, binary/CLI,
  deployed site, editor extension, mobile app, generic export, and an interviewed unknown.
  Each answers the same five questions — detected by, version surface, candidate form,
  release owner, published state — plus its own gotchas.
- The first supporting file in this library; every other skill is `SKILL.md` +
  `plugin.json` alone. `CLAUDE.md` already permitted it ("plus optional supporting docs"),
  and the zip builder walks the folder, so it ships to Claude.ai without changes.
- Two rules generalised out of the profiles rather than repeated in each: a moving tag is
  a pointer, not a version; and detection is a hypothesis, since a Dockerised Next.js app
  matches two profiles and matching is not releasing.

### `docs/prds/version-manager.md` (new)
- The spec, from `_TEMPLATE.md`. Thirteen numbered requirements (R1–R13) covering
  detection, the surface check, the restore guarantee, ledger faithfulness, `status`
  writing nothing, `release` not publishing, immutable identity for moving tags, and the
  Claude.ai degrade path.
- Non-goals are load-bearing here: not a changelog generator, not a publisher, not a
  semver adviser, and no coordinated monorepo release in v1.

### `skills/version-manager/.claude-plugin/plugin.json` (new)
- Makes the folder installable on its own. Starts at `0.1.0`, per the policy this repo
  adopted in the next commit.

### `.claude-plugin/marketplace.json`, `README.md`, `website/components/lib/skills.ts` (modified)
- The remaining registrations: marketplace entry, a row in the **Working conventions**
  group, the `/plugin install version-manager` line, and the typed `Skill` object. The
  group's note moved from "Two small habits" to "Three conventions" in both places it is
  written.

### `website/components/lib/content.ts`, `Skills.tsx`, `SkillList.tsx`, `InstallSteps.tsx`, `tests/*.spec.ts` (modified)
- Counts that are prose rather than computed: "Fourteen" → "Fifteen" wherever a comment or
  a line of copy states the catalogue's size. The historical references were left alone —
  `Install.tsx` and `home.spec.ts` describe a past defect ("thirty copy buttons for
  fourteen commands") and `Tags.tsx` describes how rows read before round 5. Changing
  those would falsify the record they exist to keep.
- One assertion comment in `home.spec.ts` said the page-wide copy-button count is "thirty
  again"; that arithmetic is now 32, so it states the ratio instead of the number.

### `website/public/skills/manifest.json`, `version-manager.zip` (generated)
- Build output from `prebuild`. The zip contains `SKILL.md`, `plugin.json` **and**
  `references/profiles.md` — the builder walks the tree, so the supporting file needed no
  special handling.

## Files changed

```
 .claude-plugin/marketplace.json                   |   5 +
 README.md                                         |   8 +-
 docs/prds/version-manager.md                      | 173 ++++++++++++
 skills/version-manager/.claude-plugin/plugin.json |   8 +
 skills/version-manager/SKILL.md                   | 308 ++++++++++++++++++++++
 skills/version-manager/references/profiles.md     | 194 ++++++++++++++
 website/components/InstallSteps.tsx               |   4 +-
 website/components/SkillList.tsx                  |   4 +-
 website/components/Skills.tsx                     |   2 +-
 website/components/lib/content.ts                 |   2 +-
 website/components/lib/skills.ts                  |  13 +-
 website/public/skills/manifest.json               |   1 +
 website/public/skills/version-manager.zip         | Bin 0 -> 13416 bytes
 website/tests/home.spec.ts                        |   8 +-
 website/tests/skills-catalog.spec.ts              |   2 +-
 15 files changed, 715 insertions(+), 17 deletions(-)
```
