# Handoff Brief — agentic-skills: skill library + context stack buildout
From: code   To: chat
Date: 2026-07-13
Status: Private · 6 skills built · pre-public-release
Continued from: handoff-code-to-chat-2026-07-12-build-publish-skill.md

## What this is
`agentic-skills` is a personal, soon-to-be-public library of Claude / Cursor-compatible **agent skills** — each a self-contained folder of Markdown (a `SKILL.md` plus supporting docs). There is no build system, test runner, or application code; "working on the code" means authoring and refining skill definitions and their specs. The repo is designed around a **multi-surface constraint**: every skill must behave correctly on two surfaces that don't share state — Claude Code (has a filesystem, writes files) and Claude.ai (no filesystem, produces artifacts). It is headed for public release once the library is solid.

## Snapshot — current state
- **6 skills built and installable** (each is also a plugin via its own `.claude-plugin/plugin.json`): `handoff-generator`, `changelog-tracker`, `model-strategy`, `branch-naming`, `repo-setup`, `decisions-logger`.
- **The context stack is scaffolded and live** — docs are tiered by the question they answer (concepts → PRDs → decisions → handoffs → changelog), enforced via CLAUDE.md protocol blocks.
- **`handoff-generator` is now comprehensive** — grew from a code→chat brief into an ~11-section bidirectional project handoff with a near-verbatim Session Log. Version `0.5.0`.
- **Decision log backfilled** — 14 ADRs + a "not-logged" ledger under `docs/decisions/`.
- **Repo still private.** Public-release prep (visibility flip, GitHub About/topics) is the main gate remaining.

## Progress & Timeline
- **2026-07-12** — Repo bootstrapped; `handoff-generator` implemented as a plugin (PRs #1–#3), slug-in-filename fix, contributor governance (CODEOWNERS/CONTRIBUTING/PR template). *(Prior handoff written here.)*
- **2026-07-12 (later)** — Three git-workflow skills added: `branch-naming`, `changelog-tracker`, `model-strategy`, with shared CLAUDE.md registration; changelog baseline + model strategy registered (PRs #4–#5).
- **2026-07-13** — `repo-setup` skill + context-stack scaffold; `decisions-logger` skill; decision log backfilled (14 ADRs, PR #9); README rewritten around the context stack (PR #11); `handoff-generator` expanded to a comprehensive handoff + Session Log section (PR #12).

## Features / Components
| Area | What it is | Status |
|---|---|---|
| handoff-generator | Bidirectional, surface-aware, comprehensive project-handoff generator (this skill) | Built · v0.5.0 |
| changelog-tracker | Documents every substantive commit into `changelog/` | Built |
| model-strategy | Maintains `docs/MODEL-STRATEGY.md` model-assignment policy | Built |
| branch-naming | Generates `<type>/<slug>` branch names per convention | Built |
| repo-setup | Scaffolds & re-verifies the tiered context stack | Built |
| decisions-logger | Mines & records ADRs into `docs/decisions/` | Built |
| Context stack | Tiered docs (concepts/PRDs/decisions/handoffs/changelog) + CLAUDE.md routing table | Live |
| Public release | Visibility flip + GitHub About/topics + release tag | Not started |

## Decisions Made
- **Skill folder = plugin** — each `skills/<name>/` carries its own `.claude-plugin/plugin.json`; no separate `plugins/` tree — [ADR 0001].
- **Conventions enforced via CLAUDE.md, not git hooks** — skills register delimited protocol blocks the target repo re-reads each session — [ADR 0002].
- **Surface detection = Bash availability** (present → Claude Code; absent → Claude.ai) — [ADR 0003].
- **Model choice routed by checkability, not cost** — [ADR 0004]; **model IDs verified live, never hardcoded** — [ADR 0006].
- **Review is the test suite** — there is no automated test runner; review stands in — [ADR 0005].
- **Changelog skips merge & changelog-only commits** — [ADR 0007]; **changelog lives outside `docs/`** (it's truth, not hypothesis) — [ADR 0009].
- **Empty handoff sections render explicit "None"** rather than being omitted — [ADR 0008].
- **repo-setup is additive-only** — [ADR 0012]; its **CLAUDE.md block is a routing table** — [ADR 0011]; **a declared path beats an existing folder beats canon** — [ADR 0010].
- **Decision-log append-only is scoped to the reasoning, not the pointers** — [ADR 0013]; **never invent a rationale** — write `(reason not stated)` — [ADR 0014].
- *(All ADRs above are logged and current under `docs/decisions/`.)*

## What this session changed
This Claude Code session made **no repo changes** (clean working tree) — it was invoked only to generate this handoff. The delta below is everything that landed **since the 2026-07-12 brief**:

| # | Commit | Subject |
|---|---|---|
| 1 | 6e7dc21 | Add contributor governance: CODEOWNERS, CONTRIBUTING, PR template |
| 2 | 506a5c6 | Add three git-workflow skills + shared CLAUDE.md registration |
| 3 | 75f7a7c | Add install commands for all skills in README |
| 4 | 0fc116e | Add changelog baseline, model strategy, and skill protocol registrations |
| 5 | 32e425a | Add repo-setup skill and scaffold this repo's context stack |
| 6 | d6ee986 | Add decisions-logger skill |
| 7 | f52b824 | Backfill the decision log: 14 ADRs + the not-logged ledger |
| 8 | 4ab3c74 | Rewrite the README around the context stack |
| 9 | 826dad1 | feat(handoff-generator): produce a comprehensive project handoff |
| 10 | 091f679 | feat(handoff-generator): add a near-verbatim Session Log section |

## Open Questions
Reconciled against the 2026-07-12 brief:
- **[CLOSED] Slug-in-filename bug** — fixed in `8b02a1b` ("Fix: include slug in handoff filename"); Step 6A now uses `...-{date}-{slug}.md`.
- **[CLOSED] Commit `bf31614` (README intro)** — merged to the default branch via PR #2.
- **[STILL OPEN] Repo is private** — must be flipped public before anyone else can `/plugin marketplace add vidhunnan/agentic-skills`.
- **[STILL OPEN] GitHub About description + topics** — drafted in the prior brief, not yet applied.
- **[STILL OPEN] v2 ideas parked in the PRD** — auto-fire on chat wind-down, Cursor `.mdc` counterpart, multi-file handoffs, chaining across multiple prior handoffs.
- **[NEW] Branch not merged to default** — `claude/handoff-generator-2h0scw` is 5 commits ahead of `origin/prod-stable`; the comprehensive-handoff + Session Log work (`826dad1`, `091f679`) is **not yet on the default branch**.
- **[NEW] Release tag** — `plugin.json` is at `0.5.0`; no matching git tag / release exists yet.

## Files / Repos Referenced
- vidhunnan/agentic-skills (GitHub repo, default branch `prod-stable`)
- skills/handoff-generator/SKILL.md
- skills/{changelog-tracker,model-strategy,branch-naming,repo-setup,decisions-logger}/SKILL.md
- docs/decisions/ (0000-not-logged.md + 0001–0014 ADRs, README.md index)
- docs/prds/handoff-generator.md
- .claude-plugin/marketplace.json
- CLAUDE.md
- changelog/commits/ (001–008), changelog/CHANGELOG.md
- handoff/handoff-code-to-chat-2026-07-12-build-publish-skill.md (prior brief)

## Next Actions for chat
- [ ] Get the 5 branch commits onto the default branch — open/merge a PR from `claude/handoff-generator-2h0scw` (or `feat/comprehensive-handoff`) into `prod-stable` so `826dad1`/`091f679` ship.
- [ ] Make the repo **public** (GitHub → Settings → Change visibility) so others can add the marketplace and install.
- [ ] Apply the GitHub **About description + topics** (drafts in the prior brief: topics like `claude-code`, `claude-skills`, `agent-skills`, `claude-ai`, `anthropic`, `plugin-marketplace`).
- [ ] Tag a release (e.g. `v0.5.0`) to match `plugin.json`.
- [ ] Decide on **skill #7** using the established "skill folder = plugin" + context-stack pattern.
- [ ] Consider a `concepts/` doc for any of the parked v2 handoff ideas before promoting one to a PRD.

## Notes for the receiver
- **Conventions (from CLAUDE.md `## Skill protocols`):** changelog every substantive commit; branches are `<type>/<slug>`; model choices follow `docs/MODEL-STRATEGY.md`; decisions are append-only ADRs; the context stack routes every doc by the question it answers.
- **Context-stack rule of thumb:** `changelog/` and code are *truth* (what shipped); everything under `docs/` is *what we thought* — never cite a PRD or concept as evidence something exists.
- **Orientation map:** skill definitions in `skills/<name>/SKILL.md`; PRDs in `docs/prds/`; decisions in `docs/decisions/`; the marketplace manifest at repo-root `.claude-plugin/marketplace.json`.
- **Stale-doc findings:** None found this pass — the decision log, changelog, and README all reflect the current 6-skill state.
- **Exact repo state:** branch `claude/handoff-generator-2h0scw`, working tree **clean**, **5 commits ahead of `origin/prod-stable` / 0 behind**, `handoff-generator` plugin version `0.5.0`.

## Session Log
- **User:** "I want run skill handoff-generator" (the `/handoff-generator` slash form returned "Unknown command"; ran the skill from its `SKILL.md` directly).
- **Claude:** Detected surface = Claude Code (Bash available); found an existing `handoff/` with the 2026-07-12 brief; flagged that *this* session has no substantive back-and-forth, so the handoff would be repo/git-sourced and this Session Log would be thin.
- **Explored:** offered structured choices (destination / resume / focus) — the AskUserQuestion prompt failed to reach the user (permission stream closed).
- **User:** "Continue from where you left off." → interpreted as: resume from the 2026-07-12 brief, keep the `code→chat` direction, reconcile its open questions and next actions.
- **Claude:** Gathered repo facts (git timeline, `docs/decisions/`, changelog, marketplace, branch-vs-`prod-stable`), confirmed the prior slug bug was already fixed (`8b02a1b`) and that the branch is 5 commits ahead of the default, then wrote this brief.
