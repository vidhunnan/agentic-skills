# PRD — design-setup

Status: Draft v0.1 · Owner: Vidhunnan Murugan · Repo: vidhunnan/agentic-skills

## 1. Problem

`repo-setup` builds a context stack for code. Nothing builds one for design, and
design is where the record is worst.

Code has `git log`. Every decision leaves a commit, a diff, a blame line — a bad
record, but a recoverable one. A Figma file is a snapshot of the winner. It does
not hold the problem being solved, the directions that were killed, why the
survivor won, what was traded away, or which details are decisions rather than
leftovers. That reasoning lives in comment threads, Slack, and one person's memory,
and within months it is gone from all three.

The consequence is not abstract: design rationale gets re-litigated every quarter,
a new team member cannot distinguish a decision from an accident, and writing up
what happened becomes archaeology.

Every skill in the design territory — critique, decisions, exploration logs,
specs — needs somewhere to write. Today there is nowhere, and no shared convention
for where. Without this, each design skill invents its own path and the result is
the folder sprawl that `repo-setup` was built to prevent on the code side.

## 2. Goals

- Scaffold the seven design tiers, each with a `README.md` that declares its
  question, tense, status, authorship and lifecycle.
- Adopt what the project already calls things — `brand/`, `research/`,
  `explorations/` — rather than imposing new names next to them.
- Register a routing table in CLAUDE.md so a later session can resolve "where does
  this design doc go?" in one lookup.
- Stay honest about ceremony: offer a minimal preset, and say plainly when the full
  stack is more structure than the project warrants.
- Give the rest of the design territory a stable, declared set of paths to write
  into.

## Non-goals (v1)

- **Writing any content into the tiers.** This creates folders, READMEs and
  templates. Briefs, decisions and exploration logs are the sibling skills' job,
  and authoring their artifacts here would produce the stale-copy failure
  `repo-setup` explicitly forbids.
- **Moving, renaming or deleting anything.** Additive only. If the right answer
  requires a move, say so and let the human do it.
- **Touching Figma.** No connector, no API. This is a filesystem skill.
- **Merging with the code stack.** `docs/` and `design/` stay separate trees;
  overlaying design tiers onto `docs/` would put evidence and hypothesis in the
  same namespace.
- **A design changelog.** What shipped is `changelog/`, generated from git. A
  hand-written parallel would be hypothesis dressed as truth.

## 3. Primary user

A designer, or a design-engineer, working in a repo — either alongside the code
stack `repo-setup` built, or in a design-only repo.

## 4. Core workflow

1. Detect surface; confirm a git repo.
2. Survey read-only: CLAUDE.md declared paths first, then the directory census,
   then root markdown, then repo-shape flags.
3. Map candidates onto the seven tiers with a confidence ladder; only genuinely
   ambiguous cases become questions.
4. Interview — capped, and often zero questions on a greenfield repo.
5. Present the mapping, the "left alone" list, and the exact file list. One
   confirmation. Nothing written before it.
6. Write only the gaps.
7. Register the routing table in CLAUDE.md.
8. Offer the sibling design skills, once, gated.
9. Confirm back.

## 5. Output template

Each tier gets a `README.md` in the same five-field shape `repo-setup` uses:

```md
# {Tier} — {the question it answers}

**Question:** {…}
**Tense:** {imperative | past}
**Status:** {proposal | evidence | history | truth | spec}
**Written by:** {human | either | agent, from git}
**Lifecycle:** {…}

## What goes here
## What does NOT go here
## Template
Copy `_TEMPLATE.md`.
```

## 6. Functional requirements

| ID | Requirement | Surface |
|---|---|---|
| R1 | The skill MUST resolve each tier's path in descending authority: a path declared in a CLAUDE.md protocol block, then an existing folder on disk (matched case-insensitively), then canon. | Claude Code |
| R2 | The skill MUST NOT move, rename, delete or overwrite any existing file or folder. Every write is a file that did not exist. | Claude Code |
| R3 | The skill MUST present the complete mapping, a "left alone" list, and the exact file list, and MUST obtain one confirmation before any write. | Claude Code, Claude.ai |
| R4 | The skill MUST classify each mapping HIGH / MEDIUM / LOW and MUST only ask about LOW-confidence items. Interview capped at 4 questions. | Claude Code, Claude.ai |
| R5 | The skill MUST offer a `minimal` preset (decisions + explorations) and MUST recommend it when the project shows little design material. | Claude Code, Claude.ai |
| R6 | The skill MUST register a marker-delimited `<!-- BEGIN skill:design-setup -->` block containing the routing table rendered from the **confirmed** paths, not from canon. | Claude Code |
| R7 | The skill MUST NOT write another skill's protocol block, and MUST NOT modify blocks it does not own. | Claude Code |
| R8 | `check` MUST run the survey and report drift with **zero writes**. | Claude Code |
| R9 | On re-run the skill MUST reconcile against the declared table rather than rebuild, and MUST stop silently when there is no drift. | Claude Code |
| R10 | The skill MUST surface a contradiction between a declared path and the disk loudly, and MUST change nothing by default. | Claude Code |
| R11 | The skill MUST NOT create a design changelog tier; it MUST point at `changelog/` and say why. | Claude Code, Claude.ai |
| R12 | On Claude.ai the skill MUST produce the READMEs and templates as downloadable artifacts plus the CLAUDE.md block, and MUST attempt no writes. | Claude.ai |

## 7. Success criteria

- Run on a repo with an existing `brand/` or `research/` folder, it adopts those
  names and says so — no duplicate folder appears next to them.
- Run twice, the second run reports no drift and writes nothing.
- A sibling design skill can resolve its write path from the CLAUDE.md block alone,
  without asking the user.
- On a repo with one Figma link and no design docs, the user is offered the minimal
  preset and told the full stack is overkill.
- `check` never writes.

## 8. Risks

- **Ceremony.** Seven folders is a lot. On a small project this is pure overhead
  and the user abandons it. Mitigation: R5, and the survey-driven interview that
  produces zero questions on a clean repo.
- **Tier confusion between `design/research/` and `design/explorations/`.** Both
  hold "things we did." The line is: research is about the *problem and the users*;
  explorations are about the *solution*. Both READMEs must state it explicitly.
- **Overlap with `repo-setup`.** Two skills scaffolding two stacks can produce
  contradictory routing tables. Mitigation: separate marker namespaces, separate
  trees, and this skill reads `repo-setup`'s block first and never edits it.
- **A stack nobody writes into.** The real risk is the folders existing and staying
  empty. This skill cannot fix that; `design/explorations/` staying empty after a
  full project cycle is the documented kill condition for the whole territory.

## 9. Open questions for v2

- Should `design/` live at the repo root, or under `docs/design/` when the project
  already keeps everything in `docs/`? v1 defaults to root and adopts an existing
  `docs/design/` if one is found — but the alias is ambiguous, since `repo-setup`
  already treats `docs/design/` as a concepts-or-PRDs candidate. This is the one
  real collision between the two stacks.
- Should it detect a design-only repo (no code) and drop the changelog reference?
- A `design-setup add <tier>` mode, mirroring `repo-setup add`.
