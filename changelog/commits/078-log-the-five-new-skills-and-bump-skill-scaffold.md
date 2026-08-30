# chore(version): log the five new skills and bump skill-scaffold

- **Commit:** `883193c0cb13e119ad5eb8bbb45f7221cf7fdc5c` (`883193c`)
- **Author:** Claude
- **Date:** 2026-08-30

## Commit message

Six ledger rows, all candidates. A version is a candidate until its branch
merges, and this branch has not.

## Changes in detail

### `changelog/VERSION-LOG.md` (+29)
- Five new skills at `0.1.0`, per the rule that a new skill starts there.
- `skill-scaffold` `0.1.0` → **`0.2.0`**. Its touchpoint list said seven while the build had
  eight, so the fix changes **what the skill does**, not how it reads — a minor under the bump
  rules, not a patch.

### `docs/VERSIONING.md` (+3 / −1)
- Adds `website/public/skills/` to the version surface table. It carries no version, but it
  belongs in the **registration** check for the same reason `skills.ts` does: a Chat-capable
  skill missing from it ships a download link to nothing.

### `website/public/skills/`
- `skill-scaffold.zip` rebuilt again — the version bump changes `plugin.json`, which the
  manifest hashes. A second demonstration that touchpoint 8 is not optional.
