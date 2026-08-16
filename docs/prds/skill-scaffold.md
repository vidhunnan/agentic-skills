# PRD — skill-scaffold

Status: Draft v0.1 · Owner: Vidhunnan Murugan · Repo: vidhunnan/agentic-skills

## 1. Problem

Adding a skill to this library touches **seven places**, and every one of them is
maintained by hand:

1. `docs/prds/<name>.md`
2. `skills/<name>/SKILL.md`
3. `skills/<name>/.claude-plugin/plugin.json`
4. the root `.claude-plugin/marketplace.json`
5. a `README.md` row, in the right group
6. a `README.md` Install-block line
7. `website/components/lib/skills.ts` → `SKILL_GROUPS`

`CONTRIBUTING.md` lists six of them. It omits the website, which means **the
documented process for adding a skill leaves the published site stale** — a
silent failure nobody notices until the site disagrees with the repo.

The cost is not just the typing. Every skill in this library shares a specific
internal shape — `Step 0 — Detect your surface`, a per-surface delivery split, a
marker-delimited CLAUDE.md protocol block, an `Edge cases` step — and that shape
lives nowhere except in the six existing `SKILL.md` files. A seventh author
(including a future session of Claude) reconstructs it by reading and imitating,
and imitation drifts.

With seventeen design skills and five others on the roadmap, hand-authoring is the
bottleneck and the drift is guaranteed.

## 2. Goals

- Generate a complete, conventional, installable skill from an interview — all
  seven touchpoints, consistent with the six that already exist.
- Encode the house `SKILL.md` skeleton in exactly one place, so it can be changed
  in exactly one place.
- Make the trigger `description` a deliberate, interviewed artifact rather than a
  generated afterthought — it is the auto-invocation matcher and the single most
  common way a skill fails silently.
- Be idempotent and additive: re-running on an existing skill reconciles rather
  than clobbers.
- Fix the `CONTRIBUTING.md` gap as part of shipping, so the documented process and
  the automated one agree.

## Non-goals (v1)

- **Writing the skill's actual logic.** It generates the skeleton, the frontmatter,
  the registrations and a PRD stub. The Steps that make a skill worth installing
  are the author's job. A scaffold that invents behaviour produces a plausible
  skill that does nothing — worse than an obvious stub.
- **Removing or renaming a skill.** Deletion touches the same seven places and is
  destructive in five of them. Out of scope; do it by hand.
- **Working outside this repo.** The touchpoints are this repo's layout. In another
  project the skill should say so and offer only the `SKILL.md` + `plugin.json`
  pair.
- **Publishing.** No git operations, no marketplace push. It writes files.

## 3. Primary user

The maintainer of this library, and any fork of it — someone adding skill number
seven through thirty-two who wants it to look like the first six.

## 4. Core workflow

1. Detect surface. Claude Code writes files; Claude.ai emits artifacts.
2. Confirm the repo is this library (or a fork with the same layout). If not,
   degrade to the two-file subset.
3. Interview: name, one-line purpose, the group it belongs to, surfaces, tools,
   **trigger phrases**, whether it registers a CLAUDE.md protocol block, and
   whether it has argument modes.
4. Derive the frontmatter `description` from the interview and **show it back for
   confirmation**, explaining that it is the trigger matcher.
5. Present the full file plan — every path, marked CREATE or EDIT — and take one
   confirmation. Nothing is written before this.
6. Write the seven touchpoints.
7. Report every path, and the next step: fill in the Steps, then install locally
   and test the trigger.

## 5. Output template

The generated `SKILL.md` skeleton:

```md
---
name: {name}
description: {what it does}. {How it works, one clause}. Use when the user says {"phrase"}, {"phrase"}, {"phrase"}, or runs /{name}. {Surface note}.
argument-hint: "[{modes}]"          # omitted when there are none
allowed-tools: {tools}
disable-model-invocation: false
---

# {name}

{One paragraph: what it produces and for whom.}

{One paragraph: the principle that governs it — the thing a reader must
understand to change it safely.}

## Instructions

### Step 0 — Detect your surface
### Step 1 — {…}
### Step N — Register the {…} protocol in CLAUDE.md    # only if it registers one
### Step N+1 — Edge cases
```

## 6. Functional requirements

| ID | Requirement | Surface |
|---|---|---|
| R1 | The skill MUST write or update all seven touchpoints listed in §1. | Claude Code |
| R2 | The skill MUST NOT write anything before a single explicit confirmation showing the complete file plan. | Claude Code, Claude.ai |
| R3 | The skill MUST interview for trigger phrases and MUST NOT invent them; the assembled `description` MUST be shown back for confirmation before use. | Claude Code, Claude.ai |
| R4 | The generated `SKILL.md` MUST contain `Step 0 — Detect your surface` and a final `Edge cases` step, and MUST include a per-surface delivery split when the skill produces an artifact. | Claude Code, Claude.ai |
| R5 | The folder name MUST equal the frontmatter `name`, and the skill MUST refuse to proceed on a mismatch. | Claude Code |
| R6 | On a name that already exists, the skill MUST reconcile — report which touchpoints are missing and offer to fill only those — and MUST NOT overwrite an existing `SKILL.md`. | Claude Code |
| R7 | Registry edits (`marketplace.json`, `skills.ts`, `README.md`) MUST be surgical insertions that leave every other entry byte-identical. | Claude Code |
| R8 | Generated JSON MUST parse; the skill MUST verify with `python3 -m json.tool` after writing. | Claude Code |
| R9 | When the CLAUDE.md protocol block is requested, the generated `Step N` MUST use the literal `<!-- BEGIN skill:<name> -->` / `<!-- END skill:<name> -->` markers and MUST match on the markers, never the title. | Claude Code |
| R10 | On Claude.ai the skill MUST emit the same content as downloadable artifacts plus the registry snippets to paste, and MUST NOT attempt any write. | Claude.ai |
| R11 | The skill MUST NOT generate Step bodies beyond section headings and a one-line intent — it does not invent behaviour (see Non-goals). | Claude Code, Claude.ai |

## 7. Success criteria

- A skill generated by this one is indistinguishable in shape from the six
  hand-written ones — same headings, same frontmatter fields, same block format.
- It installs from a local marketplace (`/plugin marketplace add ./`) and its
  slash form resolves, without hand-editing any registry file.
- `cd website && npm run build` passes immediately after generation.
- Generating three skills in one session surfaces no manual fix-ups.
- The author's remaining work is only the Steps — never the plumbing.

## 8. Risks

- **A plausible skill that never triggers** — the description is generated,
  reads well, and matches nothing a user would say. Mitigation: R3, and showing
  the assembled description back with the explanation that it is the matcher.
- **Registry corruption** — a bad `skills.ts` edit breaks the site build, a bad
  `marketplace.json` breaks every install. Mitigation: R7 surgical edits, R8
  parse check, and the site build in the verification pass.
- **The skeleton ossifies.** Encoding the house shape in one place is the goal,
  but it also freezes it. Mitigation: the skeleton lives in this skill's own
  `SKILL.md` as visible Markdown, not in a template file, so changing it is an
  ordinary edit with a diff.
- **Scaffolding becomes generating.** Pressure to make the output "more useful"
  leads to invented Steps. Mitigation: R11 is a hard requirement, not a default.

## 9. Open questions for v2

- Should it offer to run the local install and trigger test itself, rather than
  telling the author to?
- A `skill-scaffold check` mode that audits all existing skills for missing
  touchpoints — or does that belong to `skill-audit`?
- Should the PRD it writes be a stub, or should it interview deeply enough to
  produce a real one? v1 writes a stub with the section headings and the
  interview answers filled in where they map.
