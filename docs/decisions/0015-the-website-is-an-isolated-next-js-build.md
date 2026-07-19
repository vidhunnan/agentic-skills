# 0015. The website is an isolated Next.js build under `/website`

- **Status:** Accepted
- **Date:** 2026-07-19

## Context

This repo's founding identity is that it contains no software: `CLAUDE.md` describes it as a library of Markdown skills with "no build system, no test runner, and no application code." The owner wanted a public landing page for the six skills, and three static-HTML concepts already existed under `docs/concepts/website/`. A landing page needs a front end, which forced a choice: extend the no-build ethos to the site and ship a single static HTML file, or introduce a real front-end toolchain into the repo.

## Decision

We built the website as an isolated **Next.js** app (App Router, TypeScript, `output: 'export'` static export) under `/website`, with its own `package.json` and `node_modules`, deliberately kept out of the build-free skills tree. Its build artifacts (`node_modules/`, `.next/`, `out/`) are gitignored. The skills library itself remains build-free; the toolchain lives only inside `/website`.

## Alternatives considered

- **A single self-contained static HTML file** — matches the concept files (which were exactly that) and the repo's "copy one file" ethos, with zero dependencies. Rejected: the owner opted for a React/Next build. *(The deeper reason — React over static HTML — is owner preference expressed as "not html, let's try react, nextjs or something", not a written-down engineering tradeoff.)*
- **Folding the site build into the repo root** (shared tooling) — rejected: it would impose a build system and a dependency tree on the skills library, contradicting the "no build system, no code" identity the whole repo is organised around.

## Consequences

- Component reuse, self-hosted fonts, typed content, and a conventional Vercel deploy all become straightforward.
- The repo now carries a build toolchain and npm dependencies it never had — a real maintenance and security surface, already exercised (a Next.js CVE bump to 16.x and a `postcss` override on the first install). The repo's "no code" claim is now scoped to the *skills*, not the whole repository, and that scoping has to be stated wherever the claim is made.

## Evidence

- **Primary:** `git:e4a1f2e` (2026-07-19) — the commit that added `/website` as a Next.js app (`next.config.mjs` with `output: "export"`, its own `package.json`).
- **Corroborating:** `CLAUDE.md` §"What this repo is" — the ethos the site is scoped against:
  > there is no build system, no test runner, and no application code
  · this session (the owner chose a React/Next build over static HTML).
- **Rationale:** the isolation — keeping the skills tree build-free — was stated in the approved implementation plan; the React/Next choice itself was supplied by the owner on 2026-07-19 (this session), not recorded as a written-down tradeoff.

## Follow-up

*Append-only. Everything above this heading is **frozen**. Entries below are dated and additive — evidence that the world moved, not a revision of what was decided.*

*(none yet)*

---

_Append-only. If this turns out to be wrong, **do not edit it** — write a new decision that supersedes it and links back. Being wrong on the record is more useful to the next reader than a clean file._

_**Exactly two things in this file may ever change:** the `**Status:**` line (to point at a superseding decision) and additions under `## Follow-up`._
