---
name: skill-scaffold
description: Registers a new skill across all seven touchpoints of the agentic-skills library — the PRD, the SKILL.md skeleton, plugin.json, the marketplace entry, the README row and install line, and the website's SKILL_GROUPS entry — from a short interview. Interviews for the real trigger phrases rather than inventing them, and writes nothing until you confirm the full file plan. Use when the user says "add a skill to this library", "scaffold a skill", "wire up a new skill", "new skill called X", "set up the boilerplate for a skill", or runs /skill-scaffold. This is the plumbing for *this repo's* conventions — for authoring or improving a skill's content in general, or for skills outside this library, use skill-creator instead. Claude Code primary; on Claude.ai it emits the files as downloadable artifacts plus the registry snippets to paste.
argument-hint: "[<skill-name>]"
allowed-tools: Read, Write, Edit, Bash, Glob, Grep, AskUserQuestion
disable-model-invocation: false
---

# skill-scaffold

Adds a skill to this library. Not the skill's *logic* — its **plumbing**: the seven
places a new skill has to appear before it installs, triggers, and shows up on the
site, plus the house `SKILL.md` skeleton every skill here shares.

The shape of a skill in this repo lives nowhere except in the existing `SKILL.md`
files. Every new author — including a future session of Claude — reconstructs it by
reading and imitating, and imitation drifts. This skill exists to hold that shape in
one place.

Two rules govern it:

- **Scaffold, never generate.** It writes headings, frontmatter and registrations.
  It does **not** write the Steps that make a skill worth installing. A scaffold
  that invents behaviour produces a plausible skill that does nothing — strictly
  worse than an obvious stub, because nobody notices the stub is empty until it
  fails in front of a user.
- **The description is the product.** `description` is the auto-invocation matcher.
  A skill whose description reads beautifully and matches nothing a user would
  actually type is broken, and broken *silently*. So the trigger phrases are
  **interviewed, never invented**, and the assembled description is shown back
  before it is used.

## The seven touchpoints

Adding a skill means all seven. `CONTRIBUTING.md` documents six — it omits the
website, which is why adding a skill by hand leaves the published site stale.

| # | Path | What lands there |
|---|---|---|
| 1 | `docs/prds/<name>.md` | The spec, from `docs/prds/_TEMPLATE.md` |
| 2 | `skills/<name>/SKILL.md` | Frontmatter + the house skeleton |
| 3 | `skills/<name>/.claude-plugin/plugin.json` | `name`, `description`, `version`, `author` |
| 4 | `.claude-plugin/marketplace.json` | One entry, `source: ./skills/<name>` |
| 5 | `README.md` — Skills tables | One row, in the right group |
| 6 | `README.md` — Install block | One `/plugin install <name>` line |
| 7 | `website/components/lib/skills.ts` | One `Skill` object inside the right `SkillGroup` |

## Instructions

### Step 0 — Detect your surface

Using **Bash availability**:

- **Claude Code** — Bash works and there's a real filesystem. Full flow.
- **Claude.ai** — no filesystem. Run the interview conversationally, then emit
  `SKILL.md`, `plugin.json` and the PRD as **downloadable artifacts**, plus the
  exact snippets for touchpoints 4–7 for the user to paste. Skip every write and
  the verification step. Don't error.

Then confirm you are in this library or a fork of it:

```
git rev-parse --show-toplevel
```

and check for `.claude-plugin/marketplace.json` and `skills/`. **If they're
absent, this is not this library** — say so plainly and offer the portable subset:
just `SKILL.md` and `.claude-plugin/plugin.json` in whatever location the user
names. The other five touchpoints are this repo's layout and mean nothing
elsewhere.

### Step 1 — Read the house shape before writing any of it

Do not scaffold from memory. Read, every run:

- **Two existing `SKILL.md` files** — one that registers a CLAUDE.md protocol block
  (`skills/decisions-logger/SKILL.md`) and one that doesn't
  (`skills/design-brief/SKILL.md`). These are the shape. *(Most skills here do
  register a block — `branch-naming` and `model-strategy` included. Only
  `design-brief`, `exploration-log` and this skill don't.)*
- `docs/prds/_TEMPLATE.md` — including the house quirk: `## Non-goals (v1)` is
  deliberately unnumbered, sitting between `## 2. Goals` and `## 3. Primary user`.
- `.claude-plugin/marketplace.json` — for entry shape and ordering.
- `website/components/lib/skills.ts` — for the `Skill` / `SkillGroup` types and the
  current groups.
- An existing `plugin.json` — for the `author` block and the starting `version`.

This costs one round of reads and is what keeps the output from drifting away from
the six skills already here.

### Step 2 — Interview

**First, read the room.** The fastest interview is the one that skips what is
already settled. Before asking anything, harvest answers from:

- **the current conversation** — if the user has been describing the skill for ten
  turns, you already have its purpose, its group and its output shape;
- **an approved plan or a concept doc** naming this skill — treat what it fixed as
  answered;
- **the argument**, if a name was passed.

Then **confirm the harvested answers in one pass rather than re-asking them**, and
interview only for what's genuinely open. A skill built as part of a larger piece
of work usually has one real unknown — the trigger phrases — and re-asking the other
seven wastes the user's patience on the run where they have least of it.

Cap the remaining questions at **two rounds**. Use `AskUserQuestion` on Claude Code,
plain text on Claude.ai, and **wait for answers**.

**Round 1 — identity and placement:**

1. **Name** — kebab-case. Validate immediately: `[a-z0-9-]+` only, and not already
   present in `skills/`. This becomes the folder name, the frontmatter `name`, and
   the slash command; they must all agree.
2. **One line: what does it produce?** Not what it is *about* — what artifact or
   change comes out. If the answer doesn't name an output, ask again.
3. **Group** — offer the existing `SKILL_GROUPS` titles plus "a new group". A new
   group needs a title and a one-line note.
4. **Surfaces** — Code only, or Code and Chat. If Chat is included, the skeleton
   gets a per-surface delivery split; if not, `Step 0` says Claude Code only and
   the description says so too.

**Round 2 — behaviour:**

5. **Trigger phrases** — *the important one.* Ask for **three to six phrases the
   user would actually type**, in their own words. Push back on anything that reads
   like documentation rather than speech. Never supply the list yourself; you may
   offer one example to show the register, then ask for theirs.
6. **Does it establish a durable convention in the target project?** If yes it
   registers a CLAUDE.md protocol block and the skeleton gains that Step. If the
   user is unsure, the test is: *would a future session need to know this rule
   without being told?*

   **Then check whether a sibling already states it.** Read the existing
   `<!-- BEGIN skill:* -->` blocks in this repo's CLAUDE.md. If one already carries
   the rule, **do not add a second block** — say which block covers it and offer to
   name the new skill inside that block instead. One block per skill, and one rule
   in one place: two blocks asserting the same convention is exactly the drift the
   marker convention exists to prevent, and the duplicate will rot first.
7. **Argument modes** — e.g. `check`, `add <thing>`, free text. Optional; skip if
   none, and omit `argument-hint` entirely rather than emitting an empty one.
8. **Tools** — propose a set from the answers and confirm. The house default is
   `Read, Write, Edit, Bash, AskUserQuestion`; add `Glob, Grep` for anything that
   surveys a repo. Don't request tools the skill won't use.

### Step 3 — Assemble the description, and show it back

The `description` field is the matcher. Build it in four parts:

```
{what it produces}. {how it works — one clause, usually the governing principle}.
Use when the user says "{phrase}", "{phrase}", "{phrase}", or runs /{name}.
{Surface note}.
```

**Overflow goes in `when_to_use`, not in `description`.** It is the documented
field for extended trigger phrases, and the cap is on the two fields *combined*
(~1,536 characters), so a long phrase list belongs there rather than bloating the
lead. Keep `description` leading with the key use case; put the remaining phrases,
and any "for X, use Y instead" pointer, in `when_to_use`.

**Three failure modes to check before showing it:**

- **Too abstract to match** — "improves documentation quality" matches nothing.
  Trigger phrases must be lexically close to what a user types.
- **So broad it fires constantly** — a description matching every mention of
  "design" or "docs" will hijack unrelated turns. If the phrases are that generic,
  say so and ask for narrower ones.
- **Collides with a skill that already exists.** *The one that actually bites.*
  Compare the proposed phrases against every installed skill — the siblings in this
  repo **and** the first-party ones (`skill-creator`, `code-review`, `init`, …).
  Two skills a single word apart will compete, and the more established one tends
  to win. Check with `ListSkills` or `SearchSkills` where available; otherwise read
  the `description` of every `skills/*/SKILL.md`.

  **Fix a collision by scoping, never by broadening.** Add an explicit negative
  clause naming the sibling and what this skill is *not* for — e.g. *"for this
  library's conventions, not general skill authoring; use `skill-creator` for
  that."* Widening your own phrasing to win the match just moves the collision.

Then **show the assembled fields to the user verbatim** and say what they are:
*"This is the text that decides whether the skill fires on its own. Does it match
how you'd actually ask?"*

### Step 4 — Present the file plan and get one confirmation (the write gate)

**Nothing is written before this.** Print every path with a verdict:

```
Scaffold plan — {name}

CREATE  docs/prds/{name}.md
CREATE  skills/{name}/SKILL.md
CREATE  skills/{name}/.claude-plugin/plugin.json
EDIT    .claude-plugin/marketplace.json      (+1 entry)
EDIT    README.md                            (+1 row in "{group}", +1 install line)
EDIT    website/components/lib/skills.ts     (+1 entry in "{group}")

Registers a CLAUDE.md protocol block: yes — the Step is scaffolded, the block text is yours to write
Frontmatter description:
  "{the assembled description}"
```

Then one `AskUserQuestion`: **Proceed** / **Edit something** (loop back to the
relevant interview answer — don't force a cancel to fix one field) / **Cancel**
(print everything inline, write nothing).

### Step 5 — Write the skill files (touchpoints 1–3)

**`skills/<name>/SKILL.md`** — frontmatter, then this skeleton. Section headings
and a one-line statement of intent per Step. **No invented Step bodies.**

````md
---
name: {name}
description: {assembled in Step 3 — leads with the key use case}
when_to_use: {overflow trigger phrases + any "for X, use Y instead" pointer; omit if description covers it}
argument-hint: "[{modes}]"          # omit the line entirely if there are none
allowed-tools: {tools}
disable-model-invocation: false
---

# {name}

{One paragraph: what this produces, and for whom. TODO — the author writes this.}

{One paragraph: the principle that governs it — the thing a reader must understand
to change it safely. Every skill here has one. TODO.}

## Instructions

### Step 0 — Detect your surface

Using **Bash availability**:

- **Claude Code** — Bash works and there's a real filesystem. Full flow.
- **Claude.ai** — no filesystem. {TODO: how this degrades. Never error.}

### Step 1 — {TODO}

### Step 2 — {TODO}

### Step N — Register the {…} protocol in CLAUDE.md      # only if Step 2.6 was yes

{The standard registration procedure — see below.}

### Step N+1 — Edge cases

- {TODO: what happens when the input is empty}
- {TODO: what happens when the user declines at the gate — print inline, write
  nothing. A legitimate outcome, not a failure.}
````

When the skill produces an artifact, split delivery by surface as two steps
(`Step N — Claude Code: write the file` / `Step N — Claude.ai: produce a
downloadable artifact`), matching `handoff-generator`.

**Protocol-block Step** — scaffold it verbatim; only the block text is the
author's:

`````md
1. Locate CLAUDE.md: `git rev-parse --show-toplevel` → `<root>/CLAUDE.md` (accept
   `.claude/CLAUDE.md`; prefer existing).
2. **Exists** → Read; search for the literal `<!-- BEGIN skill:{name} -->`. Absent:
   show the block, ask (AskUserQuestion), insert under `## Skill protocols` (create
   the heading if needed), never blind-append. Present: update in place only if
   changed; else "already registered." Don't touch other skills' blocks.
3. **Missing** → don't stub; offer a full `/init`-style analysis
   (confirmation-gated), then insert.

Canonical block:
```md
<!-- BEGIN skill:{name} -->
### {Protocol title}
{1–5 lines. TODO — the rule a future session must follow.}
<!-- END skill:{name} -->
```
`````

**Fence depth matters.** This template nests a fenced block inside a fenced block.
The outer fence must use *more* backticks than the inner one, or the inner opener
silently terminates the outer block and everything after it renders as code. Use
five backticks outside, three inside.

**`skills/<name>/.claude-plugin/plugin.json`** — copy the `author` block from an
existing one; `version` starts at `0.1.0`; `description` is the **one-line** form
from Step 2.2, not the full matcher.

**`docs/prds/<name>.md`** — from `docs/prds/_TEMPLATE.md`, preserving the section
order and the unnumbered `## Non-goals (v1)`. Fill in what the interview answered
(Problem, Goals, Primary user, and R1 from the output description); leave the rest
as the template's prompts. Do **not** invent requirements — a fabricated `R4` will
be cited by a phase doc later.

### Step 6 — Update the registries (touchpoints 4–7)

**Surgical edits only.** Every other entry must be byte-identical afterwards. Use
`Edit` with a unique anchor, never a whole-file rewrite.

1. **`.claude-plugin/marketplace.json`** — append to `plugins`:
   ```json
   {
     "name": "{name}",
     "source": "./skills/{name}",
     "description": "{the one-liner}"
   }
   ```
   Then **verify it parses**: `python3 -m json.tool .claude-plugin/marketplace.json`.
   Do the same for the new `plugin.json`. A malformed manifest breaks every
   install, so this check is not optional.

2. **`README.md` — the group table.** Match the existing row shape exactly:
   ```md
   | **[`{name}`](skills/{name}/SKILL.md)**<br>`/plugin install {name}` | {what it does} | {Code · Chat} | Live |
   ```
   A **new group** gets an `### {Title}` heading and its one-line note above the
   table, placed in lifecycle order among the existing groups.

   **The note is not optional, and it must match `skills.ts`.** `SkillGroup.note`
   is a required field of the TypeScript type, so a group always has a note on the
   site; if you omit it from the README the two sources silently disagree and the
   README is the one that looks wrong. Write the same sentence in both places.

3. **`README.md` — the Install block.** Add `/plugin install {name}` to the fenced
   list, in the same order as the tables.

4. **`website/components/lib/skills.ts`** — add a `Skill` object to the right
   `SkillGroup`:
   ```ts
   {
     name: "{name}",
     desc: "{one or two sentences — the site's copy, not the matcher}",
     surfaces: ["Code"],          // or ["Code", "Chat"]
     install: "/plugin install {name}",
     answers: "{the question this skill answers, in the user's voice}",
   },
   ```
   A new group gets a new `SkillGroup` with `title` and `note`. The file is typed,
   so a malformed entry fails the site build — which is the point.

### Step 7 — Confirm back, and hand over the real work

Report every path written and every registry edited. Then state plainly what is
**not** done:

```
Scaffolded {name}. The plumbing is complete; the skill does nothing yet.

Next:
  1. Write the Steps in skills/{name}/SKILL.md — the TODOs are the whole skill.
  2. Fill in docs/prds/{name}.md beyond what the interview answered.
  3. /plugin marketplace add ./  →  /plugin install {name}
  4. Trigger it two ways: /{name}, and one of your own phrases —
     "{a phrase from the interview}". If the phrase doesn't fire it,
     the description needs work, not the Steps.
  5. cd website && npm run build
```

Step 4 is the one people skip. Say it every time.

### Step 8 — Re-run behaviour (reconcile, never clobber)

If `skills/<name>/` already exists, this is a reconcile, not a create:

1. Check all seven touchpoints and report which are present and which are missing.
2. **Never overwrite an existing `SKILL.md`, `plugin.json` or PRD.** Offer to fill
   only the absent touchpoints.
3. If the frontmatter `name` and the folder name disagree, **stop**. That breaks
   both the plugin and the slash command, and the fix is a rename the user must
   choose — offer both directions, change nothing.
4. If everything is present: "`{name}` is fully registered across all seven
   touchpoints. Nothing to do." Stop. Ask nothing.

### Step 9 — Edge cases

- **Name collides with an existing skill** — never silently suffix. Report it and
  ask for a different name, or treat it as a reconcile (Step 8).
- **Name isn't kebab-case** — normalize and show the result for confirmation; the
  folder, `name` field and slash command must match exactly.
- **The user won't give trigger phrases** ("you decide") — don't. Explain that
  invented phrases are the main way a skill fails silently, and offer to derive
  candidates *from their own description of the problem*, shown back for approval.
  Approval of a derived phrase is consent; invention is not.
- **A new group is requested for one skill** — fine, but say what it costs: a group
  of one reads as an afterthought on the site. Offer the nearest existing group
  first, once, then do what they ask.
- **`skills.ts` has been restructured** — if the `SKILL_GROUPS` shape no longer
  matches, don't guess. Report it and emit the entry for hand-placement.
- **Not this repo** — offer only `SKILL.md` + `plugin.json` (Step 0).
- **JSON fails to parse after the edit** — restore the entry you added and report.
  Never leave a broken manifest behind; a broken `marketplace.json` breaks every
  install of every skill, not just the new one.
- **User cancels at the gate** — print all seven artifacts inline, write nothing.
  A legitimate outcome, not a failure.
