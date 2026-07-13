# PRD — repo-setup

Status: Draft v0.1 · Owner: Vids · Repo: vidhunnan/agentic-skills

## 1. Problem

The other skills in this library each maintain *one* convention — a changelog, a branch name, a model policy, a handoff. None of them answers the question that comes first: **where does a doc go, and how much should an agent trust it?**

Without that answer, an agent reading a repo treats a half-finished brainstorm and a shipped changelog entry as equally true. It will cite a PRD as evidence a feature exists. The `reviz.tools` repo solved this by hand — a tiered docs structure where each folder answers a different question a human teammate would ask, and declares its own trustworthiness. This skill makes that structure reproducible.

The tiers, and the question each answers:

| Tier | Question | For a human, you'd call it |
|---|---|---|
| Concepts | What are we even trying to build? | The whiteboard |
| PRDs | What are we still deciding? | A proposal |
| Decisions | Why did we choose that? | The meeting you missed |
| Handoffs | Where did we leave off? | "Morning — what'd I miss?" |
| Changelog | What actually shipped? | Standup |
| Phases *(opt-in)* | What's the plan to build it? | The sprint board |

## 2. Goals

- Scaffold the tiers, each with a `README.md` declaring its tense, status, author, and lifecycle, plus a `_TEMPLATE.md`.
- **Survey before writing.** Detect an existing (possibly differently-named) structure, map it onto the tiers, and adopt the existing names rather than imposing canon.
- Enforce the **done-vs-explored** rule structurally: `changelog/` is generated truth and lives outside `docs/`; everything under `docs/` is hand-written hypothesis.
- Register a **routing table** in the project's CLAUDE.md so every future session can resolve "where does this doc go, and how much do I believe it?" in one lookup.
- Compose with the sibling skills without owning them.

## Non-goals (v1)

- **Not a migration tool.** It never moves, renames, or deletes. If the right answer requires moving files, it says so and the human does it.
- Not a docs *linter* for content — it checks structure (`/repo-setup check`), not whether a given PRD is any good.
- Does not write another skill's protocol block, and cannot install a plugin.
- No per-package scaffolding in a monorepo (repo root only).

## 3. Primary user

Vids, and anyone starting a repo they intend to build with an agent. Mirrors the `reviz.tools` context stack — 42 documents against 101,444 lines of generated code.

## 4. Core workflow

1. Detect surface; resolve the argument mode (*none* / `check` / `add <tier>`).
2. **Survey** (read-only): CLAUDE.md protocol blocks → directory census → root markdown → repo-shape flags.
3. **Map** candidates onto tiers via a name lexicon, confirmed by a content sniff, sorted by a confidence ladder.
4. **Interview** — only the questions the survey couldn't answer (cap 4, ideally 1).
5. **Present the mapping and get one confirmation.** Nothing is written before this gate.
6. **Write the gaps** — folders, READMEs, templates. Additive only.
7. Register the context-stack protocol in CLAUDE.md, rendered from the *confirmed* mapping.
8. Offer the sibling skills, gated by relevance.
9. Confirm back: what was written, what was adopted, what was left alone.

## 5. Path-resolution order

The canon is a fallback, not a mandate. For each tier, the path is the first of:

1. **A path declared in an existing CLAUDE.md protocol block** — the repo has already committed to it.
2. **An existing folder** whose name and/or content maps to the tier (adopt its name and its on-disk casing).
3. **The canonical path** — `docs/concepts/`, `docs/prds/`, `docs/decisions/`, `docs/handoffs/`, `changelog/`, `docs/phases/`.

This is what lets `repo-setup` and `handoff-generator` disagree about the default (`docs/handoffs/` vs `handoff/`) without either being wrong: in a repo where handoff-generator has registered its block, its declared `handoff/` wins, and no duplicate folder is created.

`changelog/` sits outside `docs/` by design — `docs/` is hand-written hypothesis, `changelog/` is generated truth. The folder layout *is* the done-vs-explored rule.

## 6. Functional requirements

| Surface | Trigger | Survey source | Output |
|---|---|---|---|
| Claude Code | `/repo-setup [check\|add <tier>]` or natural phrasing ("set up the docs structure", "scaffold the context stack", "where should this doc go") | the live repo — CLAUDE.md blocks, directory census, root markdown, repo-shape flags | folders + `README.md` + `_TEMPLATE.md` per confirmed tier, plus the CLAUDE.md protocol block |
| Claude.ai | explicit mention or description-match | a docs tree the user pastes or describes | the READMEs and templates as downloadable artifacts + the protocol block printed to paste (no writes) |

**Argument modes:** *none* = full flow · `check` = survey + drift report, **zero writes** · `add <tier>` = one tier only.

## 7. CLAUDE.md registration

Idempotent injection of a `<!-- BEGIN skill:repo-setup -->…<!-- END -->` block under `## Skill protocols`, matched on the literal markers (never the title). Missing CLAUDE.md → offer a full `/init`-style generation (confirmation-gated) before inserting.

**The block carries a table, not a one-line rule — a deliberate departure from the house norm.** Every other skill's block encodes a single rule ("document every commit", "name branches like this"). This one encodes a **namespace map**: six paths, each with a trust level. The routing table *is* the payload, and an agent must resolve a lookup against it in one read. As prose it would be both longer and less parseable. The block is still one delimited block with the rule stated once, in bold — it stays within the spirit of the pattern.

The table is rendered from the **confirmed mapping**, not the canon, so it always reflects the repo's real paths.

## 8. Success criteria

- On this repo, a run adopts `docs/prds/`, `changelog/`, and `handoff/` (the last **because handoff-generator's block declares it**), creates `docs/concepts/` and `docs/decisions/`, asks about phases, and leaves `docs/MODEL-STRATEGY.md`, `skills/`, and `.github/` untouched.
- Re-running reports "registered and consistent, nothing to do" — no duplicate folders, no rewritten READMEs.
- `/repo-setup check` leaves `git status` clean.
- No run ever produces a `mv`, an `rm`, or an overwrite.

## 9. Risks

- **Mis-mapping an ambiguous folder.** `docs/design/` and `rfcs/` each map to two tiers. Mitigated by the content sniff, the confidence ladder (ambiguity is the *only* thing that becomes a question), and the Step 4 confirmation gate before any write.
- **Ceremony on a small repo.** Six folders on a two-file project is a cost. Mitigated by the `minimal` preset (decisions + changelog).
- **Publishing hypothesis.** If `docs/` is a published site (mkdocs/docusaurus), `docs/concepts/` ships half-formed thinking to production. Detected via config files; the stack relocates to `.context/`.
- **Divergence from sibling skills.** The handoffs and changelog templates are copies of templates the sibling skills own. If those skills change their format, these drift. Mitigated by path-resolution order (declared paths win) and by never writing another skill's block — but the templates remain a real coupling.

## 10. Open questions for v2

- A `--fix` mode that proposes (never performs) the `git mv` commands to migrate an adopted-but-awkward layout onto canon.
- Enforcement: should `check` be runnable in CI as a docs-structure lint?
- Per-package stacks in a monorepo.
- Should PRD requirement IDs (`R1`, `R2`) be validated against the phase docs that cite them?
