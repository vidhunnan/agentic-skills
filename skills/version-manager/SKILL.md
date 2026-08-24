---
name: version-manager
description: Manages how a project versions and releases whatever it ships — npm package, Claude Code plugin, Docker image, Python package, binary, deployed site, editor extension, mobile app, or a plain exported file. Splits the released version from the local build you're testing so a test build can never move the published number, checks every file carrying the version agrees, and keeps a generated ledger of every build and every release. Use when the user says "what version are we on", "bump the version", "cut a release", "prep a release", "set up versioning", "release checklist", "log this build", "version this", "which version is published", "my local build drifted", or runs /version-manager. Claude Code primary; on Claude.ai it interviews and produces the policy and ledger entries as downloadable artifacts.
argument-hint: "[status|init|local|release|scaffold]"
allowed-tools: Read, Write, Edit, Bash, Glob, Grep, AskUserQuestion
disable-model-invocation: false
---

# version-manager

Gives a project one honest answer to four questions: **what version is this**, **what's
actually published**, **what am I testing right now**, and **what changed between them**.

It exists because those four collapse into one number the moment nobody's watching. A
local test build bumps the manifest to get a tarball, the manifest is also what the
publish step reads, and now the repo's version is ahead of the registry with nothing to
say which is true. That is not a hypothetical: it is the drift bug this skill was
generalised from, and the fix was structural rather than careful.

Two rules govern everything below:

- **Two tracks, never conflated.** The **released** version has exactly one writer. A
  **candidate** build carries a suffix that cannot be published and must never move the
  released number — and if a candidate build has to edit a manifest to produce an
  artifact, it restores it afterwards, including when the build fails.
- **Faithful, never generative.** Every version, date and change line comes from git, the
  manifest, or the registry. A version history is load-bearing precisely because people
  trust it without checking; a plausible invented row is worse than an empty ledger.

## The model

Four ideas, the same for every artifact type:

| | |
|---|---|
| **The two tracks** | released (one writer) vs candidate (`X.Y.Z-local.N`, `-rc.N`, a dated draft) |
| **The version surface** | *every* file carrying the version — manifest, hardcoded copies, marketplace entries, pinned image tags — and whether they agree |
| **The ledger** | `changelog/VERSION-LOG.md`: generated, newest-first, every build and every release, each mapping to the other |
| **The profile** | which files and which commands, per artifact type — see `references/profiles.md` |

**This skill does not own the changelog.** `changelog-tracker` owns `changelog/commits/`
and `changelog/CHANGELOG.md` — what changed, per commit. This one owns
`changelog/VERSION-LOG.md` only — what shipped, per version. They sit in the same folder
and never write each other's files.

## Instructions

### Step 0 — Detect your surface, and pick a mode

Decide where you're running, using **Bash availability**:

- **Claude Code** — Bash works, there's a real filesystem and repo. Full flow.
- **Claude.ai** — no filesystem, no registry access. Degrade: ask the user to paste their
  manifest(s) and describe how they release, do Steps 1–2 conversationally, and produce
  `VERSIONING.md` and the ledger rows as **downloadable artifacts** plus the CLAUDE.md
  block to paste. Skip every write, the registry lookups, and the scaffold. Don't error.

Confirm the repo: `git rev-parse --show-toplevel`. Without git there is no honest history —
say so, and offer the subset that still works (the policy doc and a ledger starting today).

**Modes:**

| Argument | What it does | Writes |
|---|---|---|
| *(none)* | `status` if a policy exists, `init` if it doesn't | — |
| `status` | the report: released, surface, candidate, published, next-bump preview | **none** |
| `init` | detect profile → interview → policy + ledger + CLAUDE.md block | yes |
| `local` | record a candidate build | ledger only |
| `release` | pre-flight → bump the whole surface → log → hand off | yes |
| `scaffold` | emit the ledger writer and a release pipeline | yes, opt-in |

### Step 1 — Read the profile catalog, then detect

**Read `references/profiles.md` every run.** Do not work from memory — it holds the
detection signals, the version surfaces, the published-state commands and the per-profile
gotchas for npm, Claude Code plugins, Docker, Python, binaries, deployed sites, editor
extensions, mobile apps, generic exports, and the interviewed unknown.

Run every detection signal and **report all matches, not the first one**:

```
find . -maxdepth 3 \( -name package.json -o -name pyproject.toml -o -name setup.py \
  -o -name Dockerfile -o -name 'compose*.y*ml' -o -name Cargo.toml -o -name go.mod \
  -o -name '*.podspec' -o -name build.gradle -o -name pubspec.yaml \
  -o -name vercel.json -o -name netlify.toml \) \
  -not -path '*/node_modules/*' -not -path '*/.git/*'
ls -d .claude-plugin 2>/dev/null
```

A repo commonly matches several — a Dockerised Next.js app matches *Docker image* and
*Deployed site*; a Python service with a `Dockerfile` matches two more. **Matching is not
releasing.** Show what matched and ask which artifacts are actually released, and whether
they move together or independently (AskUserQuestion). One policy per released artifact.

If nothing matches, say plainly that the catalog didn't cover this repo, and interview the
five questions from the catalog's Unknown profile rather than forcing the nearest fit.

### Step 2 — Find the existing policy, or run `init`

Look for a policy already in force, in **descending authority**:

1. **A CLAUDE.md `<!-- BEGIN skill:version-manager -->` block** — a path or rule declared
   there has been committed to by this repo and beats everything below, including this
   skill's canon.
2. `docs/VERSIONING.md`, `VERSIONING.md`, or whatever the block names.
3. An existing ledger: `changelog/VERSION-LOG.md`, or an adopted equivalent.
4. The repo's actual behaviour — a release workflow, a `version`/`release` script, tags.

**Adopt what exists; never impose.** If the repo keeps releases in `docs/releases/` or a
root `CHANGELOG.md` with version headings, that *is* the ledger tier — extend it in place
rather than creating a second one. Every write is additive: never move, rename or
overwrite. If the right answer needs a file moved, say so and let the human do it.

**`init` (no policy found):**

1. Confirm the detected profile(s) and which artifacts are released (Step 1).
2. Establish the **version surface**: start from the profile's list, then search for
   copies the profile can't know about —
   `grep -rn "<current-version>" --include='*.ts' --include='*.py' --include='*.yml' . | grep -v node_modules`.
   Every hit is a candidate surface file; confirm each with the user rather than assuming.
3. Interview only what the repo can't answer (cap at two rounds): who owns the released
   version, what a candidate build is called, what counts as patch/minor/major here.
4. Write `docs/VERSIONING.md` — profile, scheme, the one writer, the candidate form, the
   surface table, the bump rules, and a pointer to the ledger.
5. Seed the ledger (Step 5) with **one baseline row** recording today's real state. Do not
   backfill history you cannot read; if tags exist, you may seed from
   `git tag --list --sort=-v:refname` and say the record begins there.
6. Register the CLAUDE.md block (Step 7).

### Step 3 — `status` (zero writes)

The report, assembled from the profile's commands. Never guess a field — print
`(offline / unknown)` when a lookup fails or its CLI is absent.

```
  {artifact} versions
  ──────────────────────────────────────────────
  published               latest: {X.Y.Z}{   next: {X.Y.Z-beta.N} if genuinely ahead}
  {surface file}          {X.Y.Z}
  {surface file}          {X.Y.Z}   ✓ in sync | ✗ OUT OF SYNC
  latest candidate        {X.Y.Z-local.N}   (or: none — run /version-manager local)
  next release            patch → …   minor → …   major → …
  next candidate          keep → {base}-local.N   patch → …   minor → …   major → …

  Released version is owned by {the one writer}. Candidate builds never move it.
```

Three details that are easy to get wrong and matter:

- **Sync check across the whole surface**, not just the manifest. Two files carrying a
  version are two chances to disagree; report the disagreement loudly and offer to fix it,
  never silently repair it.
- **A moving pointer is not a version.** npm's `latest`, Docker's `:latest` — report the
  exact version or digest behind the tag.
- **Hide a stale prerelease.** Only surface a `next` / prerelease tag when it is actually
  ahead of the released version; a registry tag left behind reads as "newer" forever.
- **The next-candidate line builds on the latest candidate**, not on the released version,
  when the candidate is ahead — otherwise successive builds re-offer the same number and
  the two lines contradict each other.

### Step 4 — `local` (record a candidate build)

1. Determine the **base**: the further ahead of (released version, latest candidate's
   target). Successive local builds stack instead of re-offering the same option.
2. Ask which release this build targets — `keep` / `patch` / `minor` / `major`
   (AskUserQuestion). **Never decide silently**; the answer is what the row means.
3. Compute `N` = next build number for that target, counted from **both** the ledger and
   the build artifacts already on disk (old tarballs are a build history — never delete
   them to make numbering easier).
4. If producing the artifact requires writing the version into a manifest: **write it,
   build, and restore the committed value — guaranteed even on failure.** In a script
   that's a `trap`; done by hand it's a recorded before-value and a restore that runs
   before you report anything. Verify the restore by re-reading the file.
5. Append the ledger row + change list (Step 5).
6. Report the artifact path, the release it targets, and that the released version is
   unchanged — quote it back from the file, don't assert it.

### Step 5 — The ledger (`changelog/VERSION-LOG.md`)

**Generated. Never hand-edited, never rewritten.** Newest-first table with the change
lists below it, mirroring `CHANGELOG.md`'s shape:

```md
# Version Log

Newest-first ledger of every release and candidate build of `{artifact}`.
Generated — do not hand-edit. Live state: `/version-manager status`.

| Date | Type | Version | Maps to | Summary |
|------|------|---------|---------|---------|
| {YYYY-MM-DD} | **release** | `{X.Y.Z}` _(latest)_ | `{X.Y.Z-local.N}` | {first subject} _(+N)_ |
| {YYYY-MM-DD} | local | `{X.Y.Z-local.N}` | → `{X.Y.Z}` ({bump}) | {first subject} _(+N)_ |

---

## Change details

<!-- LOG:DETAILS — change lists inserted below, newest first -->

### `{version}` — {release · {tag} · {digest} | local build · targets `{X.Y.Z}` ({bump}) · built from `{sha}`} · {date}

- {commit subject}
- _…+N more_
```

Rules:

- **Insert the table row directly after the header separator line** so the table stays
  contiguous and valid; insert the detail block directly after the `LOG:DETAILS` marker.
  Match on the marker, never on a heading's text.
- **Change list from git**, not from memory:
  `git log $(git tag --list 'v*' --sort=-v:refname | head -1)..HEAD --no-merges --pretty=format:%s`.
  Cap the detail at ~15 lines with a `_…+N more_` tail; the table cell gets the first
  subject truncated plus `_(+N)_`. Escape `|` in cell text.
- **Every row maps to its counterpart** — a candidate row names the release it targets, a
  release row names the candidate that became it. Where a candidate has no counterpart,
  write `_(no local build logged)_`; do not leave it blank and do not invent one.
- **Record the immutable identity** where the published state is a pointer: the digest for
  a container, the exact version for a dist-tag, the URL for a preview deployment.
- **No commits since the last release** → `- _(no commits since last release)_`. That is a
  real state, and worth seeing.

### Step 6 — `release`

Confirmation-gated, and it **never publishes**. Pre-flight first, and stop on any failure:

- the version surface is in sync (Step 3) — a release that publishes disagreeing files
  bakes the drift in;
- the working tree is clean (`git status --porcelain`) and on the release branch;
- the ledger's newest row is consistent with the surface;
- the commits since the last release are documented, if the repo runs a changelog protocol;
- the profile's own gate — an immutable-version registry (PyPI, a Marketplace) means a
  wrong number is unrecoverable, so re-check that this version isn't already published.

Then: ask for the bump (patch / minor / major / prerelease), compute it with real semver
rather than string arithmetic, apply it to **every** file on the surface, append the ledger
row mapping back to the candidate that became it, and **hand off to the release owner** —
run the workflow, push the tag, or tell the user the exact command. Say which was done.

If the repo's release owner is a CI workflow, prefer dispatching it over doing the bump
locally: the point of one writer is that it stays one writer.

### Step 7 — Register the protocol in CLAUDE.md

So the convention survives the session (Claude Code only; on Claude.ai, print it to paste):

1. Locate CLAUDE.md: `git rev-parse --show-toplevel` → `<root>/CLAUDE.md` (accept
   `.claude/CLAUDE.md`; prefer an existing file over inventing a location).
2. **If it exists:** read it and search for the literal `<!-- BEGIN skill:version-manager -->`.
   - **Absent** → show the block, ask permission (AskUserQuestion), and on yes insert it
     under a `## Skill protocols` heading (create the heading at the end if missing).
     Never blind-append.
   - **Present** → replace only the text between this skill's markers, and only if it
     differs; otherwise report "already registered". Never touch another skill's block.
3. **If CLAUDE.md is missing entirely:** do not write a stub. Offer a full `/init`-style
   analysis (confirmation-gated), then insert.

Canonical block — fill the braces from the policy:

```md
<!-- BEGIN skill:version-manager -->
### Versioning
`{artifact}` has two version tracks that must not be conflated. The **released version** lives in {surface files} and is owned **only** by {the one writer}. **Candidate builds** are `{form}` — they never move the released version and are restored after building. Every release and every candidate build is logged to `changelog/VERSION-LOG.md`, which is **generated — never hand-edit it**. Policy: `docs/VERSIONING.md`. Run `/version-manager status` for live state, `/version-manager release` to cut a release.
<!-- END skill:version-manager -->
```

### Step 8 — `scaffold` (opt-in, never automatic)

Only when explicitly asked. **Show the full file plan and wait**, then write:

- `scripts/version-log.mjs` — the single writer for the ledger (`next-local`, `local`,
  `release` subcommands), so the table and detail insertion stop being done by hand.
- Where the profile has a pipeline: a bump→sync→tag→publish workflow pair for npm/PyPI
  adapted to the detected package manager; a build-and-push workflow that captures the
  **digest** for Docker; a tag-and-release workflow for binaries.
- A **sync gate** in whatever runs on release: fail the build when two surface files
  disagree. This is the cheapest guard in the whole system and the one that catches the
  bug this skill is named after.

Never overwrite an existing script or workflow — write beside it and say so.

### Step 9 — Confirm back

Report the exact files written, the row appended, and the released version **quoted from
the file** rather than asserted. If anything was skipped — a lookup that was offline, a
surface file the user declined to include — say which, and why.

### Step 10 — Edge cases

- **Not a git repo** — no honest history; offer the policy-only subset.
- **No version anywhere** — offer to start at `0.1.0` and say the record begins today.
- **Surface out of sync** — report which files disagree and which one is authoritative,
  offer to fix, never fix silently.
- **Monorepo / multi-profile** — one policy per released artifact; ask which, and don't
  assume the workspace root is the artifact (a `private: true` root usually isn't).
- **Registry unreachable or CLI missing** (`npm`, `docker`, `gh`, network) — report
  `(offline / unknown)` and continue. Never fail the run over a lookup.
- **Prereleases** — `-beta.N` / `-rc.N` publish under a pre-release channel, stable under
  the default one. PEP 440 differs from semver here (`1.0.0rc1`); follow the profile.
- **Immutable registries** (PyPI, Marketplaces, Go module proxy) — a wrong number is
  burned forever; pre-flight harder and never retag.
- **A version already published** — treat a re-publish as a no-op to report, not an error
  to retry.
- **Dynamic versions** (`setuptools-scm`, `hatch-vcs`, Go) — the **tag is the surface**;
  editing a file is the wrong move, and saying so is the skill's job.
- **Rollback** — the live version can move backwards. Log it as its own event rather than
  editing the row that said it shipped.
- **User declines a write** — print the assembled policy, row or block inline instead.
