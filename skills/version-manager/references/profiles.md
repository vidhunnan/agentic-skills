# Artifact profiles

The catalog `version-manager` reads in Step 1. Each profile answers the same five
questions for one kind of released thing:

| | |
|---|---|
| **Detected by** | files whose presence says "this repo ships one of these" |
| **Version surface** | every file carrying the version — the thing that must agree |
| **Candidate form** | what an unreleased build is called, and why it can't be published |
| **Release owner** | the one writer allowed to move the released number |
| **Published state** | the command that answers "what's actually live" |

**Detection is a hypothesis, never a verdict.** A repo can match several profiles — a
Dockerised Next.js app matches *Docker image* and *Deployed site*, a Python service with a
`Dockerfile` matches two more. Show what matched, ask which artifacts are actually
released and whether they move together, and let the answer decide. A repo that matches
nothing gets the **Unknown** profile — interviewed, and said plainly.

**Every published-state command must degrade.** If the CLI is missing, the registry is
unreachable, or the user is logged out, report `(offline / unknown)` and carry on. A
version report that dies because `docker` isn't installed is worse than one that says so.

---

## Summary

| Profile | Detected by | Version surface | Candidate | Release owner | Published state |
|---|---|---|---|---|---|
| npm package | `package.json`, not `private` | manifest + hardcoded copies | `X.Y.Z-local.N` tarball | CI workflow | `npm view <pkg> dist-tags` |
| Claude Code plugin | `.claude-plugin/` | `plugin.json` + marketplace entry + site data | unpublished commit | commit on default branch | marketplace on default branch |
| Docker image | `Dockerfile`, `compose.yml` | tags + OCI version label + pinned tags in manifests | `:sha-<short>` / `:dev` | CI build+push | `docker manifest inspect` |
| Python package | `pyproject.toml`, `setup.py` | manifest + `__version__` | local wheel/sdist | CI workflow | PyPI JSON API |
| Binary / CLI | `go.mod`, `Cargo.toml`, `.goreleaser.yml` | manifest + version baked at build | local build, dirty tree | tag → GitHub Release | `gh release list` |
| Deployed site | `vercel.json`, `netlify.toml`, `next.config.*` | manifest version + git tag | preview deployment | production deploy | the live deployment |
| Editor extension | `package.json` with `engines.vscode` | manifest + `CHANGELOG.md` | local `.vsix` | `vsce publish` | Marketplace listing |
| Mobile app | `Info.plist`, `build.gradle` | marketing version **and** build number | TestFlight / internal track | store submission | store listing |
| Generic export | none — declared | filename stem + ledger row | dated draft | the human | the shared copy |
| Unknown | — | interviewed | interviewed | interviewed | not tracked |

---

## npm package

- **Detected by** `package.json` without `"private": true`. A workspace root that *is*
  private is not the artifact — look in `packages/*/package.json`.
- **Version surface** `package.json` `version`, plus every hardcoded copy in source. Find
  them: `grep -rn "$(node -p "require('./package.json').version")" src/ --include='*.ts' --include='*.js'`.
  These are the ones that rot — `reviz-tool` carries one in `src/mcp/server.ts` and its
  publish workflow fails the build when the two disagree.
- **Candidate form** `X.Y.Z-local.N` (or `-rc.N`) in a tarball built with
  `npm pack` / `pnpm pack`. The suffix is what makes it unpublishable by accident.
  Build number `N` = next for that target, counted from the ledger **and** from tarballs
  already on disk.
- **Release owner** a CI workflow, dispatched with a bump choice. It computes the version
  with `npm version` (never hand-typed), syncs the hardcoded copies, tags `vX.Y.Z`, and
  publishes the **committed** version verbatim.
- **Published state** `npm view <pkg> dist-tags --json`. Report `latest`; report `next`
  only when it is actually ahead of `latest` — a stale prerelease tag lingers forever and
  reads as "newer" when it isn't.
- **Gotchas** `latest` is a moving pointer, so log the exact version beside it. A scoped
  package needs `--access public` on first publish. A publish of an existing version is a
  hard error — check `npm view <pkg>@<version> version` first and treat a hit as a no-op,
  not a failure.

## Claude Code plugin / skill

- **Detected by** `.claude-plugin/plugin.json`, or a `.claude-plugin/marketplace.json`
  listing `source` paths.
- **Version surface** `plugin.json` `version`, the marketplace entry, and any site or docs
  data that republishes it. The surface is *wider than the manifest* — that's the whole
  point of checking it.
- **Candidate form** there is no registry, so the candidate is simply an unpublished
  commit or a branch. Say so rather than inventing a suffix.
- **Release owner** a commit on the default branch — installs resolve from there.
- **Published state** what the default branch says: `git show origin/<default>:.claude-plugin/marketplace.json`.
- **Gotchas** plugins install individually, so versions are usually **per plugin, bumped
  only when that plugin changes**; a library-wide bump tells users something changed in a
  skill it didn't. Marketplace entries commonly omit `version` — then `plugin.json` is
  authoritative and the entry is not part of the surface.

## Docker image

- **Detected by** `Dockerfile`, `compose.yml` / `docker-compose.yml`, `.dockerignore`, or
  a `k8s/` directory pinning an image tag.
- **Version surface** the tags you push, the `org.opencontainers.image.version` label in
  the `Dockerfile` or build args, and **every place a tag is pinned** — compose files,
  Helm values, k8s manifests, deploy scripts. The pinned tags are the surface people
  forget, and the reason a "released" image never reaches production.
- **Candidate form** a locally built tag that is not a version:
  `myimage:sha-<short>` or `myimage:dev`. Never build a candidate as `:latest`.
- **Release owner** a CI build-and-push, tagging `X.Y.Z` **and** moving `:latest`.
- **Published state** `docker manifest inspect <image>:<tag>` (no pull needed), or the
  registry API. Capture the digest: `docker buildx imagetools inspect <image>:<tag> --format '{{.Manifest.Digest}}'`.
- **Gotchas** **a tag is a pointer, a digest is the artifact** — `:latest` and even
  `:1.2.3` can be re-pushed over, so the ledger records `sha256:…` beside the tag. A
  multi-arch image's digest is the index digest, not any one platform's. Don't ask the
  *running* container what version it is; ask the registry.

## Python package

- **Detected by** `pyproject.toml`, `setup.py`, or `setup.cfg`.
- **Version surface** `pyproject.toml` `[project] version`, plus `__version__` in the
  package — unless the project uses a dynamic version
  (`[tool.setuptools.dynamic]`, `hatch-vcs`, `setuptools-scm`), in which case **the tag is
  the surface** and editing a file is wrong.
- **Candidate form** a local wheel/sdist in `dist/`, versioned `X.Y.Z.devN` or
  `X.Y.ZrcN` (PEP 440 — *not* semver's `-rc.N`; the hyphen form normalises away and
  will surprise you).
- **Release owner** a CI workflow publishing with trusted publishing or a token.
- **Published state** `curl -s https://pypi.org/pypi/<pkg>/json | python3 -c "import json,sys;print(json.load(sys.stdin)['info']['version'])"`.
- **Gotchas** PyPI versions are **immutable and non-reusable** — a bad publish burns the
  number, so pre-flight matters more here than anywhere else. Normalisation means
  `1.0.0-rc1`, `1.0.0rc1` and `1.0.0.rc1` are one version.

## Binary / CLI release

- **Detected by** `go.mod`, `Cargo.toml`, `.goreleaser.yml`, or a release workflow that
  uploads assets.
- **Version surface** the manifest version where one exists (`Cargo.toml`; Go has none),
  and the version **baked into the binary at build time** — `-ldflags "-X main.version=…"`,
  `env!("CARGO_PKG_VERSION")`. For Go the git tag is the version, full stop.
- **Candidate form** a local build from a possibly dirty tree; stamp it
  `X.Y.Z-dev+<sha>` so `--version` output can never be mistaken for a release.
- **Release owner** the git tag, plus the workflow that builds assets onto the Release.
- **Published state** `gh release list --limit 5`, or `git ls-remote --tags origin`.
- **Gotchas** Go module proxy caching means a tag is effectively immutable once fetched —
  never retag. `v` prefixes are required by Go tooling and optional elsewhere; pick one and
  record it in the policy.

## Deployed site / app

- **Detected by** `vercel.json`, `netlify.toml`, `next.config.*`, `astro.config.*`, or a
  deploy workflow.
- **Version surface** `package.json` version and the git tag — and anything the site
  *displays* (a footer build string, an `/api/version` route, a public changelog page).
  A site whose footer says 0.1.0 while npm says 0.2.1 is the same drift bug wearing a
  different hat.
- **Candidate form** a preview deployment — it has a URL, so log the URL, not a fake
  version.
- **Release owner** the production deploy (a merge to the default branch, or a tag).
- **Published state** the live deployment: the provider's CLI/API, or fetching the
  version the site exposes.
- **Gotchas** the deploy is the release even when nobody bumped a number — so either bump
  deliberately or record deploys by commit. A rollback moves the live version *backwards*;
  the ledger must be able to say so.

## Editor extension (VS Code and friends)

- **Detected by** `package.json` with `engines.vscode` (or `contributes`), plus `.vsixmanifest`.
- **Version surface** `package.json` version, and `CHANGELOG.md`, which the Marketplace
  renders as the release notes — so it is part of the release, not documentation about it.
- **Candidate form** a local `.vsix` from `vsce package`, sideloaded.
- **Release owner** `vsce publish` (or the Open VSX equivalent), usually from CI.
- **Published state** the Marketplace listing / `vsce show <publisher>.<name>`.
- **Gotchas** the Marketplace rejects a re-used version. Pre-release versions use the
  `x.ODD.z` minor convention rather than a semver suffix.

## Mobile app

- **Detected by** `Info.plist`, `build.gradle` / `build.gradle.kts`, `pubspec.yaml`,
  `app.json` (Expo).
- **Version surface** **two numbers, both required**: the marketing version
  (`CFBundleShortVersionString`, `versionName`) and the monotonic build number
  (`CFBundleVersion`, `versionCode`) — plus their copies in Fastlane config or CI.
- **Candidate form** a TestFlight / internal-track build: same marketing version, higher
  build number.
- **Release owner** the store submission.
- **Published state** the store listing (App Store Connect / Play Console API).
- **Gotchas** this is **not a special case** — it is the released/candidate split with both
  halves given their own field, which is exactly the model. The build number must increase
  forever and can never be reused, even for a rejected build. Store review means
  "released" and "available" are days apart; the ledger records submission and availability
  as separate events.

## Generic export / document

- **Detected by** nothing — the user declares it. Decks, PDFs, design exports, data
  extracts, anything handed to someone else repeatedly.
- **Version surface** the filename stem and the ledger row. Optionally a version printed
  on the artifact itself.
- **Candidate form** a dated draft (`-draft-YYYY-MM-DD`).
- **Release owner** the human who shares it.
- **Published state** the copy that was actually sent — record where it went.
- **Gotchas** with no manifest and no registry, **the ledger is the only record that
  exists**. Never fabricate a history for one; start it at today and say the record begins
  here.

## Unknown

No signal matched. Say so plainly — "the catalog didn't cover this" — then interview the
five questions directly and write the answers into the policy. An honest interviewed
profile is worth more than the nearest-looking match, which will be wrong in exactly the
place that matters. Consider adding the profile to this file afterwards.
