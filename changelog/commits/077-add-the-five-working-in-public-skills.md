# feat: add the five working-in-public skills

- **Commit:** `0701f86d592bb73d20fb24b476ca60b318a743b5` (`0701f86`)
- **Author:** Claude
- **Date:** 2026-08-30

## Commit message

Five installable skills implementing the PRDs, plus the eighth touchpoint three
different docs had been omitting.

## Changes in detail

### `skills/post-{setup,export,angles,generator,card}/` (new, 1,057 lines of SKILL.md)
- Each Step body traces to a numbered requirement in its PRD. The family is the library's
  first **outbound** one and the first where skills compose, so the honesty rules the inbound
  skills enforce are carried across explicitly rather than assumed.
- **`post-setup`** captures voice from an interview *plus* real samples, citing how many
  samples evidenced each trait, and records rather than resolves the cases where the user's
  instruction contradicts them. Personal profiles are gitignored by default.
- **`post-export`** captures typed material against a scan checklist, snapshots the rendered
  before-state that git does not keep, and holds each item's unverified claims next to the
  material. **Interjection mode writes and returns without interviewing** — a capture step
  that interrupts is a capture step that gets turned off.
- **`post-angles`** proposes sourced angles or declines outright, names a specific reader, and
  never ranks or predicts reach.
- **`post-generator`** establishes intent before platform, proposes composition rather than
  picking it, and lists every refusal in `Not claimed`.
- **`post-card`** holds treatment across a carousel, refuses a plan whose frame count no
  longer matches its copy, and never states what the post declined to claim.

### `skills/skill-scaffold/SKILL.md` (+43 / −8), `CLAUDE.md`, `CONTRIBUTING.md`
- **Documents touchpoint 8.** All three said *seven touchpoints* while the build has eight: a
  Chat-capable skill needs `npm run prebuild` to regenerate its committed zip, and
  `tests/skill-zips.spec.ts` fails when it goes stale. The list had already been wrong once in
  the same direction, having omitted the website entry — both omissions share a shape, a step
  living outside the obvious files.

### Registries and build output
- Marketplace goes to **20 plugins**; a new **Working in public** group in both `README.md`
  and `skills.ts`, with the same note sentence in each because `SkillGroup.note` is required
  and a mismatch shows as a broken README. The hand-typed counts move from fifteen to twenty;
  `TOTAL_SKILLS` is derived and needed nothing.
- Five new zips plus a rebuilt `skill-scaffold.zip`, since editing that skill made its own
  committed zip stale — the exact trap this commit documents.
