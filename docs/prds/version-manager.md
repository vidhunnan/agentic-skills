# PRD — version-manager

Status: Draft v0.1 · Owner: Vids · Repo: vidhunnan/agentic-skills

## 1. Problem

Every project that ships anything more than once needs to answer four questions, and
almost none of them can: *what version is this*, *what's actually published*, *what am I
testing right now*, and *what changed between the two*. The usual answer is a version
number in a manifest, a `CHANGELOG.md` somebody stopped updating, and a release process
that lives in one person's shell history.

`reviz.tools` hit the specific failure this skill exists to prevent. Local test builds and
the release used **one** version number, so packing a build to try it in a demo app moved
the number that npm would publish next. Local drifted ahead of the registry, and nothing in
the repo could say which was true. The fix was structural: split the two tracks
permanently, give the released number exactly one writer (the Release workflow), give local
builds a suffix that can never be published (`X.Y.Z-local.N`), and log every event of
either kind to a single generated ledger. That system works — and it is ~430 lines of bash
and YAML welded to one npm package.

The shape generalises. A Docker image, a Python package, a Claude Code plugin, a deployed
site, a binary release and an exported deck all have a released thing, a candidate thing,
a set of files carrying the number, and a history nobody writes down. What differs is only
*which files* and *which command tells you what's live*.

## 2. Goals

- Make the **two-track model** (released vs candidate) explicit and enforceable in any
  repo, so a test build can never move the published number.
- Know the project's **version surface** — every file carrying the version — and check
  those files agree, because a version in two places is a version in disagreement.
- Keep a generated, newest-first **version ledger** recording every candidate build and
  every release, each mapping to the other.
- Cover many **artifact types** from one abstraction — npm, Claude Code plugin, Docker,
  PyPI, binary/CLI, deployed site, editor extension, mobile, generic export — via a
  catalog that can grow without changing the skill.
- Answer *what version are we on* in one command, including what is actually published.
- Register itself in the project's CLAUDE.md so the convention outlives the session.

## Non-goals (v1)

- **Not a changelog generator.** `changelog-tracker` owns per-commit history; this skill
  records versions and cites it. The ledger summarises commit subjects, it does not
  replace the commit record.
- **Not a publisher.** It never runs `npm publish`, `docker push`, or a store submission
  itself. It prepares, checks, logs, and hands off to the release owner.
- **Does not invent a release process** for a repo that has none — it proposes one and
  scaffolds it only when asked (`scaffold` mode is opt-in).
- **Not a semver adviser.** It computes the bump you choose; it does not decide whether
  your change is breaking.
- **No monorepo-wide coordinated release** in v1 — one policy per released artifact.

## 3. Primary user

Vids, and anyone maintaining something that ships repeatedly and has already been bitten
by "wait, which version is that?" — typically a solo maintainer or small team with no
release engineer, where the process lives in one person's head.

## 4. Core workflow

Five modes, one shared model.

1. **`init`** — run every detection signal in the profile catalog, show which profiles
   matched (a repo can match several), confirm which artifacts are actually released and
   whether they move together, interview the gaps, write `docs/VERSIONING.md`, seed
   `changelog/VERSION-LOG.md`, register the CLAUDE.md block.
2. **`status`** — released version, each file on the version surface with a sync mark,
   the latest candidate, what's published, and the next-version preview. Zero writes.
3. **`local`** — record a candidate build: compute the next `X.Y.Z-local.N` for the target
   release, append the ledger row and its change list. Never moves the released number.
4. **`release`** — pre-flight (surface in sync, tree clean, ledger current), compute the
   bump, apply it across the whole surface, log the row mapping back to the candidate that
   became it, hand off to the release owner.
5. **`scaffold`** *(opt-in)* — emit the generated ledger writer and, where the profile has
   one, a release pipeline.

## 5. Output templates

**Policy** (`docs/VERSIONING.md`):
```md
# Versioning — {artifact}

**Profile:** {npm package | Docker image | …}   **Scheme:** semver
**Released version is owned by:** {the one writer}
**Candidate builds:** `{form}` — never published, never move the released number.

## Version surface
| File | Field | Notes |
|---|---|---|
| `{path}` | `{field}` | {authoritative / must match} |

## Bump rules
- patch / minor / major — {what each means here}

## Ledger
`changelog/VERSION-LOG.md` — generated. Never hand-edited.
```

**Ledger** (`changelog/VERSION-LOG.md`) — newest-first table plus change details:
```md
| Date | Type | Version | Maps to | Summary |
|------|------|---------|---------|---------|
| {YYYY-MM-DD} | **release** | `{X.Y.Z}` _(latest)_ | `{X.Y.Z-local.N}` | {subject} _(+N)_ |
| {YYYY-MM-DD} | local | `{X.Y.Z-local.N}` | → `{X.Y.Z}` ({bump}) | {subject} _(+N)_ |

### `{version}` — {release|local build} · {tag/digest} · {date} · from `{source}`
- {commit subject}
```

**Status report** (printed, not written):
```
  {artifact} versions
  ──────────────────────────────────────────────
  published               latest: {X.Y.Z}
  {surface file 1}        {X.Y.Z}
  {surface file 2}        {X.Y.Z}   ✓ in sync
  latest candidate        {X.Y.Z-local.N}
  next release            patch → …   minor → …   major → …
```

## 6. Functional requirements

| ID | Requirement | Surface |
|---|---|---|
| R1 | The skill MUST detect its artifact profile from repo signals and confirm the match before writing a policy. | Claude Code |
| R2 | The skill MUST record the version surface — every file carrying the version — and report agreement or disagreement across it. | Claude Code, Claude.ai |
| R3 | A candidate build MUST NOT change the released version; if it edits a manifest to build, it MUST restore it, including on failure. | Claude Code |
| R4 | Every candidate build and every release MUST append one ledger row plus a change list, newest-first, mapping candidate ↔ release. | Claude Code, Claude.ai |
| R5 | The ledger MUST be generated from git and the registry; the skill MUST NOT invent a version, date, or change entry. | Claude Code, Claude.ai |
| R6 | `status` MUST perform zero writes. | Claude Code, Claude.ai |
| R7 | `release` MUST pre-flight (surface in sync, clean tree, ledger current) and MUST NOT publish — it hands off to the release owner. | Claude Code |
| R8 | Where a published state is a moving pointer (`:latest`, an npm dist-tag), the ledger MUST record the immutable identity (digest / exact version) beside it. | Claude Code |
| R9 | The skill MUST adopt existing paths (`CHANGELOG.md`, `docs/releases/`) over its canon, and MUST be additive — never moving, renaming, or overwriting. | Claude Code |
| R10 | The skill MUST register an idempotent `<!-- BEGIN skill:version-manager -->` block in the project's CLAUDE.md, matched on the literal markers. | Claude Code |
| R11 | `scaffold` MUST NOT run unless explicitly requested, and MUST show the full file plan before writing. | Claude Code |
| R12 | On Claude.ai the skill MUST degrade to an interview plus downloadable artifacts, with no writes and no repo inspection. | Claude.ai |
| R13 | A missing release CLI (`npm`, `docker`, `gh`) MUST report the published state as unknown rather than failing the run. | Claude Code |

## 7. CLAUDE.md registration

Idempotent injection of `<!-- BEGIN skill:version-manager -->…<!-- END -->` under
`## Skill protocols`, matched on the literal markers (never the title). Missing CLAUDE.md →
offer a full `/init`-style generation, confirmation-gated, before inserting.

## 8. Success criteria

- A local build can never move the released number — provable by running `local` and
  re-reading the surface.
- `status` on `reviz.tools` reports the same answer as `pnpm tool:version`.
- `status` on `agentic-skills` lists all skills' plugin versions and flags any
  marketplace / `skills.ts` disagreement.
- The ledger's newest row always matches what the surface says, or `status` reports drift.
- Re-running `init` never duplicates the protocol block or the ledger.

## 9. Risks

- **Catalog rot** — registry commands and manifest conventions change. Mitigation: the
  catalog is one reference file, each entry small, and unknown profiles are interviewed
  rather than guessed.
- **Two skills touching `changelog/`** — `changelog-tracker` owns `commits/` and
  `CHANGELOG.md`; this one owns `VERSION-LOG.md` only. Stated in both.
- **Scaffolded CI drifting from the repo's real pipeline** — mitigated by `scaffold` being
  opt-in and showing the plan first.
- **Multi-profile repos** — a Dockerised Next.js app matches two profiles; mitigated by
  asking which artifacts are actually released rather than assuming one.

## 10. Open questions for v2

- Coordinated monorepo releases (several packages, one version bump).
- Reading a published changelog back to reconcile a ledger seeded mid-project.
- Deprecation / yank tracking (`npm deprecate`, a pulled image tag).
- A `check` lint suitable for CI (surface out of sync → non-zero exit).
