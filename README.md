# agentic-skills

An agent starts every session with no memory of the last one. It doesn't need a better prompt — it needs a briefing.

These are the skills that write that briefing. They author the context files a project should have anyway: a changelog of what actually shipped, a decision log of why you chose what you chose, a handoff for where you left off. All of it is Markdown. None of it is code.

**Twenty skills, all live.** Install one, or all of them.

## Skills

### Set up the repo

Start here. It builds the folders the rest of them fill.

| Skill | What it does | Surfaces | Status |
|---|---|---|---|
| **[`repo-setup`](skills/repo-setup/SKILL.md)**<br>`/plugin install repo-setup` | Scaffolds your **context stack** — concepts, PRDs, decisions, handoffs, changelog. Surveys what you already have, adopts your existing folder names, and never moves or overwrites a thing. | Code · Chat | Live |

### Keep the record

The three questions a teammate with amnesia will ask.

| Skill | What it does | Surfaces | Status |
|---|---|---|---|
| **[`changelog-tracker`](skills/changelog-tracker/SKILL.md)**<br>`/plugin install changelog-tracker` | *What actually shipped?* — documents every substantive commit into a per-commit file plus a rolling index. Every fact comes from git. | Code | Live |
| **[`decisions-logger`](skills/decisions-logger/SKILL.md)**<br>`/plugin install decisions-logger` | *Why did we choose that?* — mines the project for decisions that were really made and writes each as an ADR with its evidence. Where the reasoning was never written down, it **asks** rather than inventing one. | Code · Chat | Live |
| **[`handoff-generator`](skills/handoff-generator/SKILL.md)**<br>`/plugin install handoff-generator` | *Where did we leave off?* — an interactive, bidirectional Chat↔Code **project handoff**: progress, timeline, features, decisions, changelog delta, open questions, next actions, and a near-verbatim session log. Interviews you first; on Claude Code it verifies against the repo. | Code · Chat | Live |

### Working conventions

Three conventions, made to stick across sessions.

| Skill | What it does | Surfaces | Status |
|---|---|---|---|
| **[`branch-naming`](skills/branch-naming/SKILL.md)**<br>`/plugin install branch-naming` | Suggests and creates a branch name that follows your project's convention — read from CLAUDE.md, or inferred from your existing branches. | Code | Live |
| **[`model-strategy`](skills/model-strategy/SKILL.md)**<br>`/plugin install model-strategy` | Builds `docs/MODEL-STRATEGY.md` — which Claude model for which kind of work, tailored by interview, with a mandatory review rule. | Code | Live |
| **[`version-manager`](skills/version-manager/SKILL.md)**<br>`/plugin install version-manager` | *What version is this, and what actually shipped?* — splits the **released** version from the build you're testing, so a local build can never move the published number. Checks every file carrying the version agrees, and keeps a generated ledger of every build and release. Knows npm, Claude Code plugins, Docker, PyPI, binaries, sites, extensions, mobile apps and plain exports. | Code · Chat | Live |

### Design work

Code has `git log`. Design has nothing — a Figma file shows the winner and never what was tried, what was given up, or why. These write the record design doesn't leave behind.

| Skill | What it does | Surfaces | Status |
|---|---|---|---|
| **[`design-setup`](skills/design-setup/SKILL.md)**<br>`/plugin install design-setup` | Scaffolds the **design context stack** — briefs, research, explorations, decisions, specs, system. Same rules as `repo-setup`: adopts your existing folder names, never moves a thing. The `design/explorations/` tier is the one no design tool has: a durable record of the directions you killed, and why. | Code · Chat | Live |
| **[`design-brief`](skills/design-brief/SKILL.md)**<br>`/plugin install design-brief` | *What are we actually solving?* — interviews you into a brief: problem, who feels it, jobs to be done, constraints, success criteria, non-goals. The stated intent everything downstream cites. Marks what you couldn't answer instead of inventing it. | Code · Chat | Live |
| **[`design-language`](skills/design-language/SKILL.md)**<br>`/plugin install design-language` | *What should it look like?* — interviews you into a written visual direction: the surface and whether it wears the brand, the references and the one you're **explicitly not** pulling from, constraints stated as rules that can be broken. Asks what you want rather than proposing a look for you. | Code · Chat | Live |
| **[`design-explore`](skills/design-explore/SKILL.md)**<br>`/plugin install design-explore` | *What are the options?* — generates three directions that differ on **named structural axes**, not on hue, each with its thesis, its bet and its risk. Refuses to generate against nothing, and hands the verdict to the two skills below. | Code · Chat | Live |
| **[`exploration-log`](skills/exploration-log/SKILL.md)**<br>`/plugin install exploration-log` | *Did we already try that?* — logs a round of iteration: what it tested, what changed, what you learned, and whether it was kept, **killed** or parked. Append-only, so the directions you abandoned are still readable a year later. Also answers the question back. | Code · Chat | Live |
| **[`design-critique`](skills/design-critique/SKILL.md)**<br>`/plugin install design-critique` | *Does this match what we said?* — reviews built work against its stated intent, naming how the thing **reads** before proposing any fix. **Delete** is a first-class verdict, listed first. Refuses to critique without a written intent, because that's just taste with extra steps. | Code · Chat | Live |
| **[`design-decisions`](skills/design-decisions/SKILL.md)**<br>`/plugin install design-decisions` | *Why is it like this?* — records a design fork as an append-only ADR, including **what you gave up** and what would make you revisit. Where nobody remembers the reason, it writes `(reason not stated)` — in design there's no diff to catch a plausible fiction. | Code · Chat | Live |

### Working in public

Everything else in this library writes for the next session. These write for a reader — the record, aimed outward.

| Skill | What it does | Surfaces | Status |
|---|---|---|---|
| **[`post-setup`](skills/post-setup/SKILL.md)**<br>`/plugin install post-setup` | Scaffolds the `posts/` tier and captures **how your posts sound** — by interview *plus* real posts you paste in, because a described voice and a demonstrated one differ. Personal profiles are gitignored by default: the skill ships a template and **never a voice**. | Code · Chat | Live |
| **[`post-export`](skills/post-export/SKILL.md)**<br>`/plugin install post-export` | *What was postable about this?* — captures material while the work is warm: the attempt that failed and why, the decision and what it cost. Git keeps the before-state of your code and **nothing of the rendered before**, so it snapshots that too, before it's overwritten. | Code · Chat | Live |
| **[`post-angles`](skills/post-angles/SKILL.md)**<br>`/plugin install post-angles` | *Is there a post in this?* — proposes three or four angles from the backlog and the record, each with its tension, its named reader and its **weakest point**. Says **"nothing here yet"** rather than padding to three, and never ranks or predicts reach. | Code · Chat | Live |
| **[`post-generator`](skills/post-generator/SKILL.md)**<br>`/plugin install post-generator` | Drafts per-platform copy in your captured voice and decides **how the post breaks into frames** — proposed, not picked, because where you cut the argument changes what each frame says. Every refusal is visible in a **Not claimed** section. Nothing publishes. | Code · Chat | Live |
| **[`post-card`](skills/post-card/SKILL.md)**<br>`/plugin install post-card` | Renders the visual plan into self-contained HTML frames at real dimensions, from a direction you chose. **A frame is where a claim stops being auditable** — so it never states what the post declined to claim, and carries "unverified" visibly when that's the truth. | Code · Chat | Live |

### Build the skills themselves

The library, building itself.

| Skill | What it does | Surfaces | Status |
|---|---|---|---|
| **[`skill-scaffold`](skills/skill-scaffold/SKILL.md)**<br>`/plugin install skill-scaffold` | Wires a new skill into this library — all eight touchpoints, from the PRD to the website entry. Interviews for the trigger phrases rather than inventing them, because a description that matches nothing fails silently. For authoring skill *content* in general, use Anthropic's `skill-creator` instead. | Code · Chat | Live |

Every skill has a PRD in [`docs/prds/`](docs/prds/) — the spec behind it, and the thing to read before you change one. Where the library is going next is in [`docs/concepts/`](docs/concepts/) — a roadmap, and the case for [a context stack for design work](docs/concepts/design-context-stack.md).

## Install

### 1. Add the marketplace (once)

```
/plugin marketplace add vidhunnan/agentic-skills
```

### 2. Install the skills you want

```
/plugin install repo-setup
/plugin install changelog-tracker
/plugin install decisions-logger
/plugin install handoff-generator
/plugin install branch-naming
/plugin install model-strategy
/plugin install version-manager
/plugin install design-setup
/plugin install design-brief
/plugin install design-language
/plugin install design-explore
/plugin install exploration-log
/plugin install design-critique
/plugin install design-decisions
/plugin install post-setup
/plugin install post-export
/plugin install post-angles
/plugin install post-generator
/plugin install post-card
/plugin install skill-scaffold
```

Each skill is a separate plugin, so take one or take all twenty. The command for a single skill sits next to its name in the tables above.

### Other surfaces

**Claude Code, standalone (no plugin)** — copy the folder in:

```
cp -r skills/repo-setup ~/.claude/skills/
```

Use `.claude/skills/` inside a project instead of `~/.claude/skills/` to scope it to that project.

**Claude.ai** — zip a skill folder (e.g. `skills/handoff-generator/`) and upload it under **Settings → Customize → Skills**. Skills marked *Chat* above have a Claude.ai path; the others need a filesystem and git.

## The context stack

This is what `repo-setup` builds, and it's the idea the whole library is organised around. Each folder answers one question a human teammate would ask — and declares how far an agent should trust it.

| Question | Folder | How far to trust it |
|---|---|---|
| What are we even trying to build? | `docs/concepts/` | Hypothesis — future tense, disposable |
| What are we still deciding? | [`docs/prds/`](docs/prds/) | Proposal — a concept worth building |
| Why did we choose that? | [`docs/decisions/`](docs/decisions/README.md) | Truth — past tense, append-only |
| Where did we leave off? | [`handoff/`](handoff/) | Snapshot — the latest one wins |
| What actually shipped? | [`changelog/`](changelog/CHANGELOG.md) | **Truth** — generated from git |

**Done vs. explored.** `changelog/` is what shipped. Everything under `docs/` is what we *thought*. That's why the changelog sits outside `docs/` — the folder layout *is* the rule. Never cite a PRD as evidence that a feature exists; check the changelog, or check the code.

Mix the two and you've handed a teammate contradictory instructions. A human pushes back. An agent just agrees — confidently, in both directions.

## The design stack

Same idea, harder problem. This is what `design-setup` builds.

Code has `git log`. Every decision leaves a commit, a diff, a blame line — a bad record, but a recoverable one. **A Figma file is a snapshot of the winner.** It never holds the problem, the directions that were killed, why the survivor won, or which details were load-bearing decisions rather than leftovers. That reasoning lives in comment threads and one person's memory, and within months it's gone from both.

| Question | Folder | How far to trust it |
|---|---|---|
| What problem are we solving? | [`design/briefs/`](design/briefs/README.md) | Proposal — the design PRD |
| What did we learn? | [`design/research/`](design/research/README.md) | Evidence — observation kept separate from interpretation |
| What did we try? | [`docs/concepts/website/`](docs/concepts/website/README.md) *(adopted)* | History — includes everything killed |
| Why did we choose this? | [`design/decisions/`](design/decisions/README.md) | **Truth** — past tense, append-only |
| What is it, exactly? | [`design/specs/`](design/specs/README.md) | Spec — pinned to a source version |
| What's reusable? | [`design/system/`](design/system/README.md) | **Truth** — the system of record |
| What actually shipped? | [`changelog/`](changelog/CHANGELOG.md) | **Truth** — generated from git |

Two distinctions code doesn't need, and design collapses constantly:

- **Evidence vs. interpretation.** *"7 of 9 users scrolled past the CTA"* is an observation. *"Users ignore the CTA"* is a claim about why. Collapse them and the claim hardens into folklore, cited a year later as fact.
- **What was tried vs. what won.** Code deletes the rejected approach and git keeps it anyway. Design deletes it and it's simply gone.

**`explorations/` is the one with no equivalent in any design tool** — a durable record of the directions you killed and why. It's the first thing anyone wants a year later, and the first thing that disappears. In this repo it's adopted at `docs/concepts/website/`, where the drafts already lived: the design stack is additive-only, so it never moved them.

There is deliberately **no design changelog**. What shipped is `changelog/`, generated from git — a hand-written parallel would be hypothesis wearing the costume of truth.

## This repo runs on its own skills

Everything above was used to build this repo, so you can read the output before you install anything:

- **[`docs/decisions/`](docs/decisions/README.md)** — 26 ADRs explaining why this repo is shaped the way it is, each with the evidence it was drawn from. Written by `decisions-logger`. It also records the [five decisions whose reasoning was never written down](docs/decisions/0000-not-logged.md) — the honest gaps, kept visible rather than filled in with a plausible guess.
- **[`changelog/`](changelog/CHANGELOG.md)** — every substantive commit documented, with the diff and the reason. Written by `changelog-tracker`.
- **[`docs/MODEL-STRATEGY.md`](docs/MODEL-STRATEGY.md)** — the model policy this repo actually follows. Written by `model-strategy`.
- **[`handoff/`](handoff/)** — the briefs that carried this work between Claude.ai and Claude Code. Written by `handoff-generator`.
- **[`design/`](design/decisions/README.md)** — the design stack, scaffolded by `design-setup` on this repo. Its explorations tier is [`docs/concepts/website/`](docs/concepts/website/README.md), adopted where the landing-page drafts already lived rather than moved — including the **Blueprint direction that was killed**, still readable, which is the entire point of the tier.
- **[`CLAUDE.md`](CLAUDE.md)** § Skill protocols — the live protocol blocks each skill registered, which is how the conventions survive a new session.

## Repo conventions

- One folder per skill under `skills/`, kebab-case, matching the `name` field in its `SKILL.md`.
- Each skill folder doubles as an installable plugin: it carries its own `.claude-plugin/plugin.json` alongside `SKILL.md`.
- Every skill ships a matching entry in the repo-root `.claude-plugin/marketplace.json` (its `source` points at the skill folder).
- Nothing referencing internal, employer-specific, or unreleased work goes in this repo.

## Contributing

PRs welcome. `prod-stable` is protected — open a pull request against it and the maintainer reviews and merges. See [CONTRIBUTING.md](CONTRIBUTING.md) for the workflow and skill conventions.

## License

MIT — see [LICENSE](LICENSE).
