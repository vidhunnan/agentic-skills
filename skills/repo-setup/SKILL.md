---
name: repo-setup
description: Scaffolds a project's context stack — the tiered docs folders (concepts, PRDs, decisions, handoffs, changelog, optional phases) that let an agent be briefed on a project. Surveys what already exists, maps it onto the tiers, adopts your existing names, and registers the routing table in CLAUDE.md. Use when the user says "set up the docs structure", "scaffold the context stack", "set up this repo for agents", "where should this doc go", or runs /repo-setup. Claude Code primary; on Claude.ai it produces the scaffold as downloadable artifacts.
argument-hint: "[check|add <tier>]"
allowed-tools: Read, Write, Edit, Bash, Glob, Grep, AskUserQuestion
disable-model-invocation: false
---

# repo-setup

Builds a project's **context stack**: the documentation tiers that let an agent with no memory be briefed on a project. Each tier answers one question a human teammate would ask — *what are we trying to build, what are we still deciding, why did we choose that, what actually shipped, where did we leave off* — and each one declares how much an agent should trust it.

The anchor rule the whole stack exists to enforce is **done vs. explored**: `changelog/` is what shipped (truth, past tense, generated from git); everything under `docs/` is what we *thought* (hypothesis, hand-written, disposable). Mix them and you have handed a teammate contradictory instructions — a human pushes back, an agent just agrees, confidently, in both directions.

Two principles govern every step:

- **Detect, map, confirm — never impose.** If the repo already calls it `docs/adr/`, then the decisions tier *is* `docs/adr/`. Canon fills gaps; it does not rename anyone's repo.
- **Additive only.** Never move, rename, delete, or overwrite. Every write is a file that did not exist. If the right answer requires moving files, say so and let the human do it.

## The canon

Used only to fill gaps — an existing path always wins (see Step 1).

| Tier | Canonical path | Question it answers | Status |
|---|---|---|---|
| Concepts | `docs/concepts/` | What are we even trying to build? | hypothesis — future tense, disposable |
| PRDs | `docs/prds/` | What are we still deciding? | proposal — a concept worth building |
| Decisions | `docs/decisions/` | Why did we choose that? | truth — past tense, append-only |
| Handoffs | `docs/handoffs/` | Where did we leave off? | snapshot — the latest one wins |
| Changelog | `changelog/` | What actually shipped? | **TRUTH** — generated from git |
| Phases *(opt-in)* | `docs/phases/` | What's the plan to build it? | plan — gated by an exit checklist |

`changelog/` sits outside `docs/` deliberately: `docs/` is hand-written hypothesis, `changelog/` is generated truth. The folder layout *is* the done-vs-explored rule.

## Instructions

### Step 0 — Detect your surface

Decide where you're running before doing anything, using **Bash availability**:

- **Claude Code** — Bash works and there's a real filesystem. Proceed with the full flow.
- **Claude.ai** — no Bash, no repo to survey. Degrade gracefully: ask the user to paste or describe their existing docs tree, do the mapping conversationally (Steps 2–4), and produce the folder READMEs and `_TEMPLATE.md` files as downloadable artifacts plus the CLAUDE.md block for them to paste. Skip all writes and registration. Don't error.

Confirm you're in a git repo: `git rev-parse --show-toplevel`. If it fails, the changelog tier can't be honest (it's generated from git) — say so and offer the docs-only subset.

**Argument modes:**
- *(no argument)* — the full flow, Steps 1–8.
- `check` — Steps 1–3 and a drift report, with **zero writes**. A lint you can run before briefing an agent.
- `add <tier>` — scaffold one named tier only; skip the rest of the survey.

### Step 1 — Survey the repo (read-only census)

Gather everything before deciding anything. Four sources, in **descending authority**:

1. **CLAUDE.md protocol blocks — highest authority.** Read `<root>/CLAUDE.md` (and `.claude/CLAUDE.md`). Any `<!-- BEGIN skill:* -->` block that names a path has already been committed to by this repo. A **declared path beats the canon**, and beats any inference — even if it doesn't exist on disk yet, it's the name to use. (This is how a repo whose `skill:handoff-generator` block declares `handoff/` keeps `handoff/` instead of gaining a duplicate `docs/handoffs/`.)
2. **Directory census.** `find . -maxdepth 3 -type d`, pruning `.git`, `node_modules`, `dist`, `build`, `.next`, `vendor`, `target`. Match **case-insensitively** — on macOS, `mkdir -p docs/decisions` silently reuses an existing `docs/Decisions`.
3. **Root markdown.** `ls *.md` — `CHANGELOG.md`, `HISTORY.md`, `DECISIONS.md`, `ROADMAP.md` are tier candidates *as files*.
4. **Repo-shape flags**, which change the recommendation (see Step 10):
   - `mkdocs.yml`, `docusaurus.config.*`, `astro.config.*`, `.vitepress/`, `docs/_sidebar.md` → **`docs/` is a published website**.
   - `pnpm-workspace.yaml`, `packages/*/package.json` → **monorepo**.
   - `.gitignore` entries covering `docs/` or `changelog/` → the stack would be **invisible** to every collaborator and CI agent.

Per candidate directory also note: does it contain any `*.md`, and `git log -1 --format=%ad -- <dir>` — a folder untouched for two years is a fossil, not a live tier.

### Step 2 — Map candidates onto tiers

**2a. Name lexicon** (case-insensitive, singular/plural tolerant). This yields a *hypothesis*, not a verdict:

| Tier | Aliases seen in the wild |
|---|---|
| Concepts | `ideas/`, `notes/`, `brainstorm/`, `explorations/`, `research/`, `scratch/`, `docs/design/`* |
| PRDs | `specs/`, `proposals/`, `product/`, `features/`, `rfcs/`*, `docs/design/`* |
| Decisions | `adr/`, `adrs/`, `docs/adr/`, `architecture/decisions/`, `DECISIONS.md`, `rfcs/`* |
| Handoffs | `handoff/`, `handoffs/`, `sessions/`, `context/` |
| Changelog | `CHANGELOG.md` (root file), `HISTORY.md`, `docs/changelog/`, `releases/` |
| Phases | `phases/`, `milestones/`, `plans/`, `roadmap/` |

`*` = **structurally ambiguous** — `docs/design/` and `rfcs/` each map to two tiers. Never coin-flip these; they go to the interview.

**2b. Content sniff.** For any candidate, read the first ~40 lines of up to 3 files:

- `Status: Accepted|Superseded` plus Context / Decision / Consequences headings, past tense → **Decisions** (the ADR template is a giveaway).
- Numbered requirements (`R1`, `FR-1`), "Acceptance criteria", "Non-goals" → **PRDs**.
- Hedged future tense ("we could", "what if"), no status field → **Concepts**.
- Date-stamped filenames, "next actions", "where we left off" → **Handoffs**.
- Commit hashes, `Added`/`Changed`/`Fixed`, version headings → **Changelog**.
- "Phase N", task tables, exit checklists → **Phases**.

`rfcs/` resolves by lifecycle: accepted-and-frozen → Decisions; open proposals under review → PRDs.

**2c. Confidence ladder** — this is what keeps the interview short:

- **HIGH** — canonical name, *or* a path declared in a CLAUDE.md block, *or* alias and content agree → **adopt silently**, no question.
- **MEDIUM** — alias name, but the folder is empty or its content is thin/mixed → **adopt, marked `?`** in the mapping table. The user corrects it at the Step 4 gate if it's wrong. Still no separate question.
- **LOW / CONFLICT** — two candidates for one tier, content contradicts name, or one folder plausibly maps to two tiers → **this, and only this, becomes an interview question.**

**2d. Unmapped.** Everything that corresponds to no tier (`docs/api/`, `runbooks/`, a stray `docs/MODEL-STRATEGY.md`) goes on an explicit **"left alone"** list. Showing the user what you *saw* and are *not touching* is what makes the confirmation trustworthy.

**2e. Contradiction detection.** If a CLAUDE.md block declares `changelog/` but the disk has `docs/changelog/`, the repo is telling an agent two different things — precisely the failure the anchor rule exists to prevent. Surface it loudly. Default: change nothing, report, recommend the fix.

### Step 3 — Interview (ask only what the survey couldn't answer)

Cap: **4 questions, ideally 1.** A clean greenfield repo gets exactly one. Use `AskUserQuestion` on Claude Code, plain text on Claude.ai, and **wait for answers**.

**Always ask (1):** phases — opt-in and unguessable. *"Add `docs/phases/`? A phase doc carries a task table (with a model per task), acceptance criteria mapped to PRD requirement IDs, a test plan, and an exit checklist. The rule: you don't start a phase until the previous phase's exit checklist is done."* Skip this if a phases-like folder already exists — then it's a mapping, not a question.

**Ask only if triggered:**
- Each **LOW-confidence** item from 2c — e.g. *"`docs/design/` — is this the whiteboard (concepts) or the spec (PRDs)?"*
- **Root `CHANGELOG.md`** (Step 3b).
- **Scope**, if ≥3 tiers are missing: a multi-select of the missing tiers, all pre-selected, plus a **`minimal` preset (decisions + changelog only)**. Six folders of ceremony on a two-file repo is a real cost — say so.

**Never ask** (infer it): the project name (git remote / `package.json` / README H1), the docs root, whether CLAUDE.md exists, tense/lifecycle wording, or "may I create folders?" — that's the Step 4 gate, not a question here.

#### Step 3b — Root `CHANGELOG.md` vs `changelog/`

The one case that genuinely needs judgment. Decide by reading the root file:

- **Has version headings** (`## [1.2.0] - 2026-04-01`) → it's **release notes**, a *different artifact* from a per-commit log. Recommend **coexistence**: adopt or create `changelog/` for the commit tier, leave `CHANGELOG.md` alone, and say plainly that these answer different questions — releases vs. commits.
- **An ad-hoc dated list of changes, no versions** → it already *is* the commit log. Recommend **adopting the file as the tier** (path = `CHANGELOG.md`, no folder created), and note that `changelog-tracker` expects a folder, so moving to one is the upgrade path.
- **Both `CHANGELOG.md` and `changelog/` exist** → adopt `changelog/`; the root file goes on the "left alone" list.
- **`docs/changelog/` exists** → adopt the path (never move files), but flag the tension out loud: generated truth is living inside hand-written hypothesis. Offer to keep the path (the protocol still labels it TRUTH) or to create `changelog/` and migrate by hand later. Default: keep the path. **Never `mv`.**

### Step 4 — Present the mapping and get one confirmation (the write gate)

**Nothing is written before this.** Print one table, one "left alone" list, and the exact file list:

```
Proposed context stack for {project}

| Tier      | Question it answers               | Verdict          | Path            |
|-----------|-----------------------------------|------------------|-----------------|
| Concepts  | What are we even trying to build? | CREATE           | docs/concepts/  |
| PRDs      | What are we still deciding?       | ADOPT (exists)   | docs/prds/      |
| Decisions | Why did we choose that?           | CREATE           | docs/decisions/ |
| Handoffs  | Where did we leave off?           | ADOPT (declared) | handoff/        |
| Changelog | What actually shipped?            | ADOPT (declared) | changelog/      |
| Phases    | What's the plan to build it?      | SKIP (declined)  | —               |

Left alone (map to no tier): docs/MODEL-STRATEGY.md, .github/, CONTRIBUTING.md

Will write N new files (nothing existing is touched):
  docs/concepts/README.md, docs/concepts/_TEMPLATE.md
  docs/decisions/README.md, docs/decisions/_TEMPLATE.md
  docs/prds/README.md            (folder exists, README missing)
  + 1 CLAUDE.md protocol block
```

Then `AskUserQuestion` with three options: **Proceed** / **Edit the mapping** (loops back to Step 2 with the correction — don't force a decline just to fix one path) / **Cancel** (print the tree inline, write nothing).

### Step 5 — Write the gaps (additive only)

Per confirmed tier:

1. `mkdir -p <path>` — for **CREATE** rows only.
2. **`README.md`** — write **only if absent**. Never overwrite an adopted folder's README. If one exists, default to leaving it and offer either to append a short "Role in the context stack" section or to show the canonical README for the user to merge by hand.
3. **`_TEMPLATE.md`** — the adopt principle recurses to the file level. If the folder already has `template.md`, `TEMPLATE.md`, `0000-template.md`, or `adr-template.md`, **adopt it** and name that file in the tier's README. Do not add a second template.

**README shape** — five fixed fields, so an agent can parse it:

```md
# {Tier} — {the question it answers}

**Question:** {…}
**Tense:** {future | imperative | past | point-in-time}
**Status:** {hypothesis | proposal | truth | snapshot | plan}
**Written by:** {human | agent, from git | either}
**Lifecycle:** {…}

## What goes here
## What does NOT go here
## Template
Copy `_TEMPLATE.md`.
```

Field values are **canon — don't improvise them**:

| Tier | Tense | Status | Written by | Lifecycle |
|---|---|---|---|---|
| Concepts | future | hypothesis | human | Disposable. Delete it or graduate it into a PRD. Never cite a concept as a decision. |
| PRDs | imperative | proposal | human (an agent may draft) | draft → accepted (spawns decisions and phases) → superseded. Requirements are numbered `R1`, `R2`, … |
| Decisions | past | truth (of intent) | human | **Append-only.** Never edit a decision — supersede it with a new one that links back. |
| Handoffs | point-in-time | snapshot | either | Stale by design. The latest one wins; an old handoff is not current state. |
| Changelog | past | **TRUTH** | agent, from git | Append-only, generated. **Never hand-edit.** |
| Phases | imperative | plan | human | Gated: a phase does not start until the previous phase's exit checklist is complete. |

**Templates — borrow, don't invent.** Three of these are owned by sibling skills; copy their shape verbatim or the stack drifts:

- `{handoffs}/_TEMPLATE.md` ← **handoff-generator's brief template** (Handoff Brief / Context / Decisions Made / Open Questions / Files Referenced / Next Actions).
- `{changelog}/_TEMPLATE.md` ← **changelog-tracker's per-commit template** (title / Commit / Author / Date / PR / Commit message / Changes in detail / Files changed).
- `{prds}/_TEMPLATE.md` — Problem / Goals / Non-goals / Primary user / Core workflow / Output / **numbered requirements (`R1`, `R2`, …)** / Success criteria / Open questions. The requirement IDs are load-bearing: phase acceptance criteria reference them, and that link is the whole reason phases are worth having.
- `{decisions}/_TEMPLATE.md` — ADR: Status / Context / Decision / Consequences / Supersedes.
- `{concepts}/_TEMPLATE.md` — deliberately loose: Hunch / Why it might matter / What we'd need to believe / Open questions / Graduate-or-kill.
- `{phases}/_TEMPLATE.md` — Goal / Depends on / Task table (`| # | Task | Model | Owner | Status |`) / Acceptance criteria (→ `PRD R#`) / Test plan / **Exit checklist**.

### Step 6 — Register the context-stack protocol in CLAUDE.md

Idempotent registration (Claude Code only; on Claude.ai, print the block to paste):

1. Locate CLAUDE.md: `git rev-parse --show-toplevel` → `<root>/CLAUDE.md` (accept `.claude/CLAUDE.md`; prefer existing).
2. **Exists** → Read; search for the literal `<!-- BEGIN skill:repo-setup -->`. Absent: show the block, ask (AskUserQuestion), insert under `## Skill protocols` (create the heading if needed), never blind-append. Present: update in place only if the block changed; else "already registered." Don't touch other skills' blocks.
3. **Missing** → don't stub; offer a full `/init`-style analysis (confirmation-gated) to generate a real CLAUDE.md, then insert.

**Render the block from the confirmed mapping — the adopted paths, not the canon.** Declined tiers get no row.

Canonical block:
```md
<!-- BEGIN skill:repo-setup -->
### Context stack
Project docs are tiered by the question they answer. Before writing a doc, route it. Before trusting one, check its tier.

| Question | Tier | Path | Status |
|---|---|---|---|
| What are we even trying to build? | Concepts | `docs/concepts/` | hypothesis — future tense, disposable |
| What are we still deciding? | PRDs | `docs/prds/` | proposal — a concept worth building |
| Why did we choose that? | Decisions | `docs/decisions/` | truth — past tense, append-only |
| Where did we leave off? | Handoffs | `docs/handoffs/` | snapshot — the latest one wins |
| What actually shipped? | Changelog | `changelog/` | TRUTH — generated from git |

**Done vs. explored:** `changelog/` is what shipped; everything under `docs/` is what we *thought*. Never cite a concept or a PRD as evidence something exists — check the changelog or the code. Never hand-edit the changelog. Each folder's `README.md` states its tense and lifecycle. Run `/repo-setup check` to re-verify the stack.
<!-- END skill:repo-setup -->
```

This block is longer than the one-rule blocks the sibling skills register, and deliberately so: every other block encodes a single rule, while this one encodes a **namespace map**. The routing table *is* the payload — an agent must be able to resolve "where does this doc go?" in one lookup. Rendered as prose it would be both longer and less parseable.

### Step 7 — Offer the sibling skills (once, gated, never pushy)

Be honest about what "install" means: **this skill cannot install a plugin**, and it must **never write another skill's protocol block on that skill's behalf.** A block is its owning skill's contract and drifts with it; a stale copy authored by a third party is worse than an absent one, and two skills claiming one block is exactly the contradiction the anchor rule forbids. So "install" means one of two honest things:

- **The skill is available in-session** → hand off: *"run `/changelog-tracker` and it will register its own protocol."*
- **It isn't** → print the copy-pasteable lines (`/plugin marketplace add vidhunnan/agentic-skills`, then `/plugin install changelog-tracker`). Nothing more.

**Relevance gate** — only offer a sibling if the survey earned it, and never if its block is already registered:

| Sibling | Offer only when |
|---|---|
| `changelog-tracker` | the changelog tier is in the stack **and** `skill:changelog-tracker` is absent from CLAUDE.md |
| `handoff-generator` | the handoffs tier is in the stack **and** its block is absent |
| `model-strategy` | phases were enabled (the phase task table has a **Model** column and is meaningless without a policy), **or** `docs/MODEL-STRATEGY.md` exists with no block |
| `branch-naming` | never a question — one trailing line of prose, at most |

Deliver as **one** multi-select AskUserQuestion, all optional, easy to dismiss. On a re-run (the `skill:repo-setup` block already exists), demote this to a single footnote line — the absence of a block is not consent to be asked twice.

### Step 8 — Confirm back

Report the final tree, every file written, every folder **adopted** (and under whose name), the "left alone" list, and any flagged tensions (e.g. *"`docs/changelog/` keeps generated truth under `docs/` — noted, not moved"*). If a lot was written, suggest a dedicated commit on a `chore/context-stack` branch, and note that this commit will itself trip the changelog protocol — which is expected, not a loop.

### Step 9 — Re-run behavior (reconcile, never rebuild)

A prior run is detected by the literal `<!-- BEGIN skill:repo-setup -->`. Then:

1. **Parse the routing table out of the existing block** → the *declared* stack.
2. Re-survey the disk (Step 1).
3. **Diff declared vs. actual:**
   - A declared path **gone from disk** → renamed or deleted. Content-sniff for the rename; offer to re-point the table (preferred) or re-create the folder.
   - A new folder on disk that **maps to a tier not in the table** (the user hand-added `docs/phases/`) → offer to add the row.
   - Folder present but its `README.md` / `_TEMPLATE.md` is **missing** → offer to restore just those files.
   - **No drift** → "Context stack registered and consistent. Nothing to do." Stop. Ask nothing.
4. Never overwrite an existing `README.md` or `_TEMPLATE.md` — only fill absences.
5. Rewrite the block **only if the table changed**.

`/repo-setup check` runs 1–3 and reports with **zero writes**.

### Step 10 — Edge cases

- **`docs/` is a published website** (`mkdocs.yml`, `docusaurus.config.*`, `astro.config.*`, `.vitepress/`) — adding `docs/concepts/` **ships your hypothesis to production**. Detect it, warn, and offer an alternate root (`internal-docs/` or `.context/`); the whole stack relocates and the block reflects that. If the site generator treats `_`-prefixed files specially, name the template `TEMPLATE.md` instead.
- **Monorepo** — multiple `packages/*/docs/`. Ask which root owns the stack; default to the repo root; do not scaffold per package.
- **Tiny repo, no docs at all** — don't inflict six folders on a two-file project. Offer the `minimal` preset: decisions + changelog.
- **Not a git repo** — the changelog tier is generated from git and can't be honest. Offer the docs-only subset and say why.
- **Stack is gitignored** — if `.gitignore` covers `docs/` or `changelog/`, the stack is invisible to every collaborator and CI agent. Flag it before writing.
- **Case-insensitive filesystem (macOS)** — `mkdir -p docs/decisions` silently reuses an existing `docs/Decisions`. Match case-insensitively in the survey and adopt the on-disk casing.
- **Two candidates for one tier** (`rfcs/` *and* `docs/prds/`) — never pick silently. Ask which is canonical and offer to route new docs to one and leave the other alone.
- **Empty adopted folder** — nothing to content-sniff. Fall back to the name lexicon at MEDIUM confidence; the Step 4 gate is the safety net.
- **Fossil folder** — `git log -1 -- notes/` says 2023. Adopt it if it maps, but flag it: an agent briefed on stale hypothesis is worse than one briefed on nothing.
- **Adopted folder already has a README or template** — never overwrite. Leave it (default), or append a clearly marked "Role in the context stack" section.
- **CLAUDE.md contradicts the disk** (a block says `changelog/`, disk has `docs/changelog/`) — report loudly; do **not** silently rewrite another skill's block. Offer a confirmation-gated, path-token-only correction with the exact diff shown. This is the one place the "never touch other skills' blocks" rule may be bent, and only by explicit confirmation, never by default.
- **Symlinked `docs/`** — resolve it, tell the user where writes would actually land, and ask before writing through it.
- **User declines at the gate** — print the proposed tree and the block inline, write nothing. That's a legitimate outcome, not a failure.
- **Hard invariant** — never `mv`, never `rm`, never rename. If the right answer requires moving files, say so and let the human do it.
