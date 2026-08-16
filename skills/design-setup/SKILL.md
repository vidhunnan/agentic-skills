---
name: design-setup
description: Scaffolds a project's design context stack — the tiered folders (briefs, research, explorations, decisions, specs, system) that let an agent or a new teammate be briefed on design work the way git briefs them on code. Surveys what already exists, adopts your existing folder names, writes only the gaps, and registers the routing table in CLAUDE.md. Use when the user says "set up the design docs", "scaffold the design stack", "where do design decisions go", "set up this repo for design work", or runs /design-setup. Claude Code primary; on Claude.ai it produces the scaffold as downloadable artifacts.
argument-hint: "[check|add <tier>]"
allowed-tools: Read, Write, Edit, Bash, Glob, Grep, AskUserQuestion
disable-model-invocation: false
---

# design-setup

Builds a project's **design context stack**: the folders that make design reasoning
survive the person who did it.

Code has `git log`. Every decision leaves a commit, a diff, a blame line — a poor
record, but a recoverable one. **A Figma file is a snapshot of the winner.** It does
not hold the problem, the directions that were killed, why the survivor won, what
was traded away, or which details are decisions rather than leftovers. That
reasoning lives in comment threads and one person's memory, and within months it is
gone from both.

Every other design skill — critique, decisions, exploration logs, specs — needs
somewhere to write. This is what creates it.

Two principles govern every step, inherited from `repo-setup` because they are the
same two problems:

- **Detect, map, confirm — never impose.** If the project already calls it
  `brand/`, then the system tier *is* `brand/`. Canon fills gaps; it does not
  rename anyone's repo.
- **Additive only.** Never move, rename, delete, or overwrite. Every write is a
  file that did not exist. If the right answer requires moving files, say so and
  let the human do it.

## The canon

Used only to fill gaps — an existing path always wins (see Step 1).

| Tier | Canonical path | Question it answers | Status |
|---|---|---|---|
| Briefs | `design/briefs/` | What problem are we solving? | proposal — the design PRD |
| Research | `design/research/` | What did we learn? | evidence — observation kept separate from interpretation |
| Explorations | `design/explorations/` | What did we try? | history — includes everything killed |
| Decisions | `design/decisions/` | Why did we choose this? | truth — past tense, append-only |
| Specs | `design/specs/` | What is it, exactly? | spec — pinned to a source version |
| System | `design/system/` | What's reusable? | truth — the system of record |

**There is no design changelog tier, deliberately.** What shipped is `changelog/`,
generated from git. A hand-written parallel would be hypothesis wearing the costume
of truth — the exact failure the done-vs-explored rule exists to prevent. If the
user asks for one, say this and point at `changelog/`.

**Two tiers are easy to confuse, so both READMEs must say it outright:** research is
about the **problem and the people**; explorations are about the **solution**. A
competitive scan is research. A rejected layout is an exploration.

`design/explorations/` is the tier with no equivalent in any design tool, and it is
the reason this stack is worth building: **a durable record of rejected directions
and why they lost.** It is the first thing anyone wants a year later and the first
thing that disappears.

## Instructions

### Step 0 — Detect your surface

Using **Bash availability**:

- **Claude Code** — Bash works and there's a real filesystem. Full flow.
- **Claude.ai** — no repo to survey. Degrade: ask the user to paste or describe
  their existing design folders, do the mapping conversationally (Steps 2–4), and
  produce the tier READMEs and `_TEMPLATE.md` files as downloadable artifacts plus
  the CLAUDE.md block to paste. Skip every write and the registration. Don't error.

Confirm the repo: `git rev-parse --show-toplevel`.

**Argument modes:**
- *(no argument)* — the full flow, Steps 1–8.
- `check` — Steps 1–3 and a drift report, **zero writes**.
- `add <tier>` — scaffold one named tier only; skip the rest of the survey.

### Step 1 — Survey (read-only census)

Gather everything before deciding anything. Four sources, in **descending
authority**:

1. **CLAUDE.md protocol blocks — highest authority.** Read `<root>/CLAUDE.md` (and
   `.claude/CLAUDE.md`). Any `<!-- BEGIN skill:* -->` block naming a path is
   already committed to by this repo — **a declared path beats canon and beats
   inference**, even if the folder doesn't exist yet. Read `skill:repo-setup`'s
   routing table too: you need to know what the code stack already claims so you
   don't collide with it.
2. **Directory census.** `find . -maxdepth 3 -type d`, pruning `.git`,
   `node_modules`, `dist`, `build`, `.next`, `vendor`, `target`. Match
   **case-insensitively** — on macOS `mkdir -p design/research` silently reuses an
   existing `design/Research`.
3. **Root and design-adjacent files.** `ls *.md`, plus `tokens.json`,
   `*.tokens.json`, `theme.*`, `figma.md`, `BRAND.md`, `STYLEGUIDE.md` — each is a
   tier candidate *as a file*.
4. **Repo-shape flags:**
   - `docs/` is a published site (`mkdocs.yml`, `docusaurus.config.*`,
     `astro.config.*`, `.vitepress/`) → a `docs/design/` tier would **ship your
     rejected directions to production**.
   - No code at all → a design-only repo; the `changelog/` cross-reference is
     meaningless, so drop it from the block.
   - `.gitignore` covering `design/` → the stack would be invisible to everyone.

Per candidate folder, note whether it holds any `*.md` and
`git log -1 --format=%ad -- <dir>`. A folder untouched for two years is a fossil,
not a live tier.

### Step 2 — Map candidates onto tiers

**2a. Name lexicon** (case-insensitive, singular/plural tolerant). A *hypothesis*,
not a verdict:

| Tier | Aliases seen in the wild |
|---|---|
| Briefs | `briefs/`, `design-briefs/`, `problems/`, `docs/design/`* |
| Research | `research/`, `user-research/`, `discovery/`, `insights/`, `interviews/` |
| Explorations | `explorations/`, `iterations/`, `concepts/`*, `wip/`, `sketches/`, `rounds/`, `variants/` |
| Decisions | `design/adr/`, `design-decisions/`, `rationale/` |
| Specs | `specs/`, `redlines/`, `handoff/`*, `annotations/` |
| System | `system/`, `design-system/`, `brand/`, `tokens/`, `styleguide/`, `ui-kit/` |

`*` = **structurally ambiguous, and the collisions are real**:

- `concepts/` and `docs/design/` may already belong to the **code** stack — check
  `repo-setup`'s routing table first. If the code stack claims it, it is not
  available; say so and use canon.
- `handoff/` is almost certainly `handoff-generator`'s. Never claim it for specs.

**2b. Content sniff.** Read the first ~40 lines of up to 3 files per candidate:

- Problem / jobs-to-be-done / success criteria / non-goals → **Briefs**.
- Participant counts, quotes, "N of M users", session dates → **Research**.
- Dated rounds, "v2", "what we tried", frame links, before/after → **Explorations**.
- `Status: Accepted|Superseded`, Context / Decision / Consequences → **Decisions**.
- Spacing values, states, breakpoints, token names, redlines → **Specs**.
- Component anatomy, variants, usage do/don't, token definitions → **System**.

**2c. Confidence ladder** — what keeps the interview short:

- **HIGH** — canonical name, *or* a path declared in a CLAUDE.md block, *or* alias
  and content agree → **adopt silently**, no question.
- **MEDIUM** — alias name but the folder is empty or thin → **adopt, marked `?`**
  in the mapping table. The Step 4 gate is the correction point. No question.
- **LOW / CONFLICT** — two candidates for one tier, content contradicts name, one
  folder plausibly maps to two tiers, or the code stack already claims it →
  **this, and only this, becomes an interview question.**

**2d. Unmapped.** Everything mapping to no tier goes on an explicit **"left alone"**
list. Showing what you *saw* and are *not touching* is what makes the confirmation
trustworthy.

**2e. Contradiction detection.** If a CLAUDE.md block declares `design/system/` but
the disk has `brand/` with the content, the repo is telling an agent two different
things. Surface it loudly. Default: change nothing, report, recommend the fix.

### Step 3 — Interview (ask only what the survey couldn't answer)

Cap: **4 questions, ideally 0.** A greenfield repo should get none — the scope
question below only fires when the stack is mostly missing.

**Ask only if triggered:**

- Each **LOW-confidence** item from 2c — e.g. *"`explorations/` — is this design
  iterations, or the code stack's concepts folder?"*
- **Scope**, when ≥4 tiers are missing: a multi-select of the missing tiers, all
  pre-selected, plus a **`minimal` preset — decisions + explorations only**.
  Those two are the ones with no substitute anywhere else; briefs, research, specs
  and system all have partial homes in other tools. **Say the cost out loud:** six
  folders of ceremony on a project with one Figma file is real overhead, and if
  the honest answer is "this project doesn't need a stack", say that.
- **A design-only repo** — confirm there's no code, so the block omits the
  `changelog/` row rather than pointing at a tier that will never exist.

**Never ask** (infer it): the project name, whether CLAUDE.md exists, tense and
lifecycle wording, or "may I create folders?" — that's the Step 4 gate.

### Step 4 — Present the mapping and get one confirmation (the write gate)

**Nothing is written before this.** One table, one "left alone" list, the exact
file list:

```
Proposed design context stack for {project}

| Tier         | Question it answers        | Verdict          | Path                  |
|--------------|----------------------------|------------------|-----------------------|
| Briefs       | What problem are we solving?| CREATE           | design/briefs/        |
| Research     | What did we learn?          | ADOPT (exists)   | research/             |
| Explorations | What did we try?            | CREATE           | design/explorations/  |
| Decisions    | Why did we choose this?     | CREATE           | design/decisions/     |
| Specs        | What is it, exactly?        | SKIP (declined)  | —                     |
| System       | What's reusable?            | ADOPT (exists)   | brand/                |

Left alone (map to no tier): docs/, .github/, public/logo.svg

Will write N new files (nothing existing is touched):
  design/briefs/README.md, design/briefs/_TEMPLATE.md
  design/explorations/README.md, design/explorations/_TEMPLATE.md
  design/decisions/README.md, design/decisions/_TEMPLATE.md
  research/README.md              (folder exists, README missing)
  + 1 CLAUDE.md protocol block
```

Then `AskUserQuestion`: **Proceed** / **Edit the mapping** (loops back to Step 2
with the correction — don't force a decline to fix one path) / **Cancel** (print
the tree inline, write nothing).

### Step 5 — Write the gaps (additive only)

Per confirmed tier:

1. `mkdir -p <path>` — **CREATE** rows only.
2. **`README.md`** — write **only if absent**. Never overwrite an adopted folder's
   README. If one exists, leave it and offer to append a short "Role in the design
   stack" section, or show the canonical README to merge by hand.
3. **`_TEMPLATE.md`** — the adopt principle recurses to the file level. If the
   folder already has `template.md`, `TEMPLATE.md` or `_template.md`, **adopt it**
   and name that file in the README. Never add a second template.

**Field values are canon — don't improvise them:**

| Tier | Tense | Status | Written by | Lifecycle |
|---|---|---|---|---|
| Briefs | imperative | proposal | human (an agent may draft) | draft → active → closed when the work ships or is abandoned. The stated intent every critique and decision cites. |
| Research | past | evidence | human | Append-only. Findings don't expire, but their **premises** do — note when a study's context no longer holds rather than deleting it. |
| Explorations | past | history | either | Append-only. **A killed direction is never deleted** — the record of what lost is the point of the tier. |
| Decisions | past | truth | human | **Append-only.** Never edit a decision — supersede it with a new one that links back. |
| Specs | imperative | spec | either | Pinned to a source version. Stale when the source moves; say which version it describes. |
| System | imperative | truth | human | The system of record. Changes are decisions — log them. |

**Templates — the shapes:**

- `{briefs}/_TEMPLATE.md` — Problem / Who feels it / Jobs to be done / Constraints /
  What success looks like / **Non-goals and anti-goals** / Open questions.
- `{research}/_TEMPLATE.md` — Method / Participants / **Observations** (verbatim,
  with counts) / **Interpretation** (clearly separated, clearly labelled as claim) /
  What this changes / Confidence.
- `{explorations}/_TEMPLATE.md` — Round / Date / What this was testing / What
  changed / Links (frame/version) / What we learned / **Kept or killed — and why**.
- `{decisions}/_TEMPLATE.md` — ADR: Status / Context / Options considered /
  Decision / **What we gave up** / **What would make us revisit** / Evidence /
  Follow-up. *(`design-decisions` owns this shape — copy it verbatim so the tier
  doesn't drift.)*
- `{specs}/_TEMPLATE.md` — Source + version / Layout / Tokens used / States /
  Responsive / Interaction / Edge cases / Accessibility / **Open questions for
  engineering**.
- `{system}/_TEMPLATE.md` — What it is / Anatomy / Variants / States /
  Accessibility requirements / **When to use — and when not to** / The decision
  that produced it.

The **observation/interpretation split** in the research template and the **kept or
killed** field in the explorations template are the two load-bearing bits. Without
them those tiers collapse into "notes" and the stack loses its reason to exist.

### Step 6 — Register the design-stack protocol in CLAUDE.md

Idempotent registration (Claude Code only; on Claude.ai, print the block to paste):

1. Locate CLAUDE.md: `git rev-parse --show-toplevel` → `<root>/CLAUDE.md` (accept
   `.claude/CLAUDE.md`; prefer existing).
2. **Exists** → Read; search for the literal `<!-- BEGIN skill:design-setup -->`.
   Absent: show the block, ask (AskUserQuestion), insert under `## Skill protocols`
   (create the heading if needed), never blind-append. Present: update in place only
   if the block changed; else "already registered." **Never touch other skills'
   blocks** — `skill:repo-setup`'s routing table in particular is a different stack
   and not yours to edit.
3. **Missing** → don't stub; offer a full `/init`-style analysis
   (confirmation-gated), then insert.

**Render the table from the confirmed mapping — the adopted paths, not canon.**
Declined tiers get no row.

Canonical block:
```md
<!-- BEGIN skill:design-setup -->
### Design context stack
Design work is tiered by the question it answers. Before writing a design doc, route it. Before trusting one, check its tier.

| Question | Tier | Path | Status |
|---|---|---|---|
| What problem are we solving? | Briefs | `design/briefs/` | proposal — the design PRD |
| What did we learn? | Research | `design/research/` | evidence — observation ≠ interpretation |
| What did we try? | Explorations | `design/explorations/` | history — includes what was killed |
| Why did we choose this? | Decisions | `design/decisions/` | truth — past tense, append-only |
| What is it, exactly? | Specs | `design/specs/` | spec — pinned to a source version |
| What's reusable? | System | `design/system/` | truth — the system of record |
| What actually shipped? | Changelog | `changelog/` | TRUTH — generated from git |

**A Figma file is not the record.** It shows what won; it never shows what was tried, what was given up, or why. Never cite a brief as evidence something exists — check the changelog or the built product. **A killed direction is never deleted from `design/explorations/`** — that record is the point of the tier. Run `/design-setup check` to re-verify the stack.
<!-- END skill:design-setup -->
```

Like `repo-setup`'s, this block is longer than the one-rule blocks the sibling
skills register, and for the same reason: the payload is a **namespace map**, and
an agent must resolve "where does this go?" in one lookup.

### Step 7 — Offer the sibling design skills (once, gated, never pushy)

**This skill cannot install a plugin, and must never write another skill's protocol
block on that skill's behalf.** A block is its owning skill's contract and drifts
with it; a stale copy authored by a third party is worse than an absent one. So
"install" means one of two honest things:

- **Available in-session** → *"run `/design-decisions` and it will register its own
  protocol."*
- **Not available** → print `/plugin marketplace add vidhunnan/agentic-skills` and
  `/plugin install design-decisions`. Nothing more.

Relevance gate — only offer a sibling the survey earned, and never if its block is
already registered:

| Sibling | Offer only when |
|---|---|
| `design-decisions` | the decisions tier is in the stack **and** its block is absent |
| `design-brief` | the briefs tier is in the stack **and** `design/briefs/` is empty |
| `repo-setup` | there is code but no `skill:repo-setup` block — the design stack is half a stack without it |

One multi-select `AskUserQuestion`, all optional, easy to dismiss. On a re-run,
demote to a single footnote line.

### Step 8 — Confirm back

Report the final tree, every file written, every folder **adopted** (and under whose
name), the "left alone" list, and any flagged tension. If a lot was written, suggest
a dedicated commit — and note that it will trip the changelog protocol, which is
expected, not a loop.

### Step 9 — Re-run behaviour (reconcile, never rebuild)

A prior run is detected by the literal `<!-- BEGIN skill:design-setup -->`. Then:

1. **Parse the routing table out of the existing block** → the *declared* stack.
2. Re-survey the disk (Step 1).
3. **Diff declared vs. actual:**
   - Declared path **gone from disk** → renamed or deleted. Content-sniff for the
     rename; offer to re-point the table (preferred) or re-create the folder.
   - A new folder mapping to a tier **not in the table** → offer to add the row.
   - Folder present but `README.md` / `_TEMPLATE.md` **missing** → offer to restore
     just those.
   - **No drift** → "Design context stack registered and consistent. Nothing to
     do." Stop. Ask nothing.
4. Never overwrite an existing `README.md` or `_TEMPLATE.md` — only fill absences.
5. Rewrite the block **only if the table changed**.

`/design-setup check` runs 1–3 and reports with **zero writes**.

### Step 10 — Edge cases

- **`docs/` is a published website** and the user wants the stack under it — adding
  `docs/design/explorations/` **ships your rejected directions to production**.
  Detect it, warn, and default to `design/` at the root instead. If the generator
  treats `_`-prefixed files specially, name the template `TEMPLATE.md`.
- **The code stack already claims `docs/design/` or `concepts/`** — `repo-setup`'s
  lexicon maps both. Never claim a path another block declares. Report the
  collision and use canon.
- **Design-only repo (no code)** — omit the `changelog/` row; there's no git history
  of shipped product to point at. Say so rather than leaving a dangling row.
- **Tiny project, one Figma file** — don't inflict six folders. Recommend the
  `minimal` preset (decisions + explorations), or say plainly that no stack is
  warranted yet. An abandoned stack is worse than none.
- **`brand/` exists and is a folder of logo files, not docs** — it's an asset
  folder, not the system tier. Content-sniff before adopting; if it holds no
  Markdown, leave it alone and create `design/system/` beside it.
- **Case-insensitive filesystem (macOS)** — `mkdir -p design/research` silently
  reuses `design/Research`. Match case-insensitively; adopt the on-disk casing.
- **Two candidates for one tier** — never pick silently. Ask which is canonical and
  offer to route new docs to one and leave the other alone.
- **Fossil folder** — `git log -1 -- research/` says 2023. Adopt it if it maps, but
  flag it: an agent briefed on stale research is worse than one briefed on nothing.
- **Stack is gitignored** — flag before writing. A stack only the author can see
  defeats the purpose.
- **The user asks for a design changelog** — decline and explain: `changelog/` is
  generated from git and is the only tier entitled to say what shipped. Offer
  `design/explorations/` for the iteration history instead, which is what they
  usually actually want.
- **User declines at the gate** — print the proposed tree and the block inline,
  write nothing. A legitimate outcome, not a failure.
- **Hard invariant** — never `mv`, never `rm`, never rename. If the right answer
  requires moving files, say so and let the human do it.
