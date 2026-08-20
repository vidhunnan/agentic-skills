# 0024. Skills ship as build-time zips, committed to the repo

- **Status:** **Accepted**
- **Date:** 2026-08-19

## Context

The catalogue could tell a Claude Code reader how to install a skill — one command per
row — and could tell a Claude.ai reader nothing. On Claude.ai a skill is installed by
uploading a zip under Settings → Customize → Skills, and the site had no zip to give.
Round 5 added the downloads.

The site is a static export (`output: "export"`, [0015](./0015-the-website-is-an-isolated-next-js-build.md)),
so nothing can be produced at request time: a download has to exist as a file under
`website/public/` before the build finishes. `10b64af` added a `prebuild` script that
walks `skills/`, writes one archive per skill into `website/public/skills/`, and lets a
plain `next build` pick them up.

Then it failed on Vercel:

```
Error: ENOENT: no such file or directory, scandir '/vercel/skills/repo-setup'
```

The project's Root Directory is `website/`, so the build process sees only that subtree.
`skills/` is a sibling of it, not a descendant, and is simply not on disk when the build
runs — the script walked up two levels from `scripts/` and landed in `/vercel`. It had
passed on every local run, because locally the whole repo is there. That is the class of
bug a local-only check cannot catch.

## Decision

We committed the generated archives. `website/public/skills/*.zip` and its
`manifest.json` are build output tracked in git, and
`website/scripts/build-skill-zips.mjs` picks its mode from whether `skills/` exists:
**generate** rebuilds every archive from source and rewrites the manifest (any local
build); **verify** confirms that every expected archive and manifest entry is present and
exits 0 (Vercel). The deploy no longer needs to see the sources it is shipping.

Two constraints ride along with the fork, and both are scope rather than a second
decision. **Only the eleven Chat-capable skills get an archive.** `changelog-tracker`,
`branch-naming` and `model-strategy` need git, so a zip of one of them uploaded to
Claude.ai would not do what its description says, and offering it would be a claim the
page cannot back. **And every archive is asserted, not assumed:** generate mode fails the
build unless each zip contains both a `SKILL.md` and a `.claude-plugin/plugin.json`,
because `.claude-plugin` is a dot-directory — a glob without `dot: true`, or a shell
`zip skills/x/*`, produces a one-file archive that looks perfectly fine and is missing
the plugin manifest that [0001](./0001-each-skill-folder-is-also-a-plugin.md) makes half
of what a skill folder is.

## Alternatives considered

- **Enable "Include source files outside of the Root Directory" in the Vercel project
  settings.** With `skills/` on disk at build time the script needs only its generate
  mode, no archive ever enters git, and not one of this decision's costs is incurred. It
  lost because it is a toggle in the Vercel project dashboard, and the agent making the
  fix could not perform one — the fix had to be reachable from inside the repo. **This is
  the live revisit condition:** if that setting is ever turned on, the committed zips,
  the manifest, the verify mode and the staleness test all become dead weight, and this
  decision should be superseded rather than maintained. *(The setting is not mentioned in
  `3ddee88` or anywhere else in the tree; the reason it lost was supplied by the owner on
  2026-08-20, after the fact.)*
- **Move `skills/` under `website/`, or point Vercel's Root Directory at the repo root.**
  Either would put the sources where the build can see them, with no committed output and
  no second mode. **`*(reason not stated)*`** — no source records it being weighed. What
  is on the record, offered as fact rather than as the reason: `.claude-plugin/marketplace.json`
  sources every plugin at `./skills/<name>`, the README's standalone install is
  `cp -r skills/<name> ~/.claude/skills/`, and
  [0001](./0001-each-skill-folder-is-also-a-plugin.md) makes that path the plugin
  contract — so the move would not have been local to the website.
- **Link the download at GitHub instead of hosting the file** — a repo archive or the
  folder itself, and no build step at all. **`*(reason not stated)*`**. On the record: the
  README documents the Claude.ai path as *zipped and uploaded*, and a link to a folder is
  not the artifact that path takes.

## Consequences

- **A plain `next build` now works from any root directory.** The deploy needs no
  monorepo configuration, no knowledge of what sits above `website/`, and no setting a
  future maintainer has to know to switch on. `vercel.json` stays four lines.
- **Committed build output goes stale silently — that is the real cost, and it was
  accepted knowingly.** The mitigation is `website/tests/skill-zips.spec.ts`, which
  rehashes every skill folder and compares against the `manifest.json` written when the
  zips were built: edit a `SKILL.md` without re-running the build and the suite fails,
  naming the skill and the command to fix it. Both the script header and the spec's own
  comment name this as the thing that stops the staleness.
- **The mitigation is a manual gate, and it can never run where the bug lived.** This repo
  has no CI (`.github/workflows` does not exist), so the suite runs when a human types
  `npm test`. Verify mode — the only check the deploy runs — tests presence, not
  freshness: it will happily ship an archive built from a skill that has since been
  rewritten. And the test needs `skills/` on disk, so it can only ever run locally, which
  is exactly the environment where the original ENOENT was invisible.
- **Editing a Chat-capable skill is now a two-step commit.** The folder change and
  `npm run prebuild` have to travel together, or the next person to run the suite gets
  the failure.
- **The archives are not reproducible in practice, so they churn.** `3ddee88` stamped
  every entry with a fixed date precisely to stop that — JSZip writes mtime by default,
  which would produce a git diff for a file whose contents had not changed. It did not
  hold: `5952626`, a commit touching only `Hero.module.css`, `Specimen.tsx`,
  `playwright.config.ts` and one spec, rewrote all eleven binaries, each to exactly its
  previous byte count, with `manifest.json` unchanged — so no skill source had changed.
  Committing build output means any commit made after a local build can carry eleven
  undiffable binary changes that mean nothing, and a reviewer cannot tell those from the
  ones that do.
- **Three skills have a download-shaped hole in the page and nothing explains it.** The
  absence of the Chat tag is the only signal, by design; a reader who wants
  `changelog-tracker` on Claude.ai is told nothing about why there is no file — only that
  there isn't one.
- **The repo now carries binaries that grow with the library.** 88.6 KB across eleven
  archives at `10b64af`; ~116 KB today. Every new Chat-capable skill adds one more.

## Evidence

- **Primary:** `website/scripts/build-skill-zips.mjs` §header — the constraint and the two
  modes, stated where the code that implements them lives.
  > THE DEPLOY CONSTRAINT: Vercel's Root Directory for this project is `website/`, so at
  > build time the process sees only that subtree — `skills/` is not on disk. The first
  > version of this script walked up two levels and died with ENOENT
  > /vercel/skills/repo-setup. So the zips are COMMITTED […] Committed build output is a
  > real cost: it can go stale silently.
- **Corroborating:** `git:3ddee88` (2026-08-19), the deploy fix and its two exercised
  modes — *"deleting one zip makes it fail with the archive named. A check that cannot
  fail is not a check."* · `git:10b64af` (2026-08-19), which introduced the downloads and
  states the Chat-only scoping — *"a zip of a Code-only skill uploaded to Claude.ai would
  not do what its description says, and offering it would be a claim the page cannot
  back"* · `website/tests/skill-zips.spec.ts` · `website/package.json` (`prebuild`,
  `predev`) · `website/public/skills/` (11 archives + `manifest.json`, tracked in git) ·
  `website/components/SkillList.tsx` and `InstallSteps.tsx`, the two places the archive is
  offered.
- **Rationale:** the committing and the two modes are **stated in the primary source**,
  quoted above. **Why the Vercel setting was not used instead was supplied by the owner on
  2026-08-20** (not written down at the time — `3ddee88` does not mention the setting).

## Follow-up

*Append-only. Everything above this heading is **frozen**. Entries below are dated and
additive — evidence that the world moved, not a revision of what was decided.*

- **2026-08-20** — **The churn is fixed; the consequence above is closed.** `git:04a408a`.
  The Consequences section is frozen and stays as written, because it was accurate when
  written and the record of *why* it took three attempts is worth more than a tidy file.

  What the fix actually was: `3ddee88` stamped the archive via `generateAsync`, which does
  not reach the entries. A second attempt stamped every `zip.file()`, and **four bytes
  still moved per run** — JSZip auto-creates the intermediate FOLDER entries
  (`repo-setup/`, `repo-setup/.claude-plugin/`) and stamps those with "now" regardless of
  what the files say. Those four bytes are two DOS time fields at 2-second resolution.
  Every entry is now restamped after the tree is built, folders included, and two runs 2.5
  seconds apart produce byte-identical archives.

  **The staleness consequence above still stands, unchanged.** `tests/skill-zips.spec.ts`
  is still local-only, still cannot run in the environment whose absence caused the
  original ENOENT, and editing a Chat-capable skill is still a two-step commit. The
  revisit condition — the Vercel "Include source files outside of the Root Directory"
  toggle — is also unchanged, and would still retire most of this record.

---

_Append-only. If this turns out to be wrong, **do not edit it** — write a new decision that
supersedes it and links back. Being wrong on the record is more useful to the next reader
than a clean file._

_**Exactly two things in this file may ever change:** the `**Status:**` line (to point at a
superseding decision) and additions under `## Follow-up`. The Status line is a convenience —
the authoritative forward link is the dated Follow-up entry. Everything else is frozen._
