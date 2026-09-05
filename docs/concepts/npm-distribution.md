# Concept — Installing the whole library in one command

Status: exploring · Date: 2026-09-05

> Hypothesis, not a plan. Nothing here is committed. Do not cite this document as
> evidence that anything exists or has been decided. The commands below were run
> against real tooling — that verifies **the tooling**, not that this library ships
> anything through it.

## The hunch

The README asks a first-time installer to paste **twenty `/plugin install` lines**.
Nobody does that. They install two, forget the library exists, and never see the
other eighteen — which are the ones that make the stack cohere, because a context
stack with three of its five tiers unwritten is not a stack.

The hunch is that the install story and the versioning story are **fighting each
other**, and that npm is where the fight becomes visible rather than where it gets
resolved. [ADR 0026](../decisions/0026-versions-are-per-skill-bumped-only-when-that-skill-changes.md)
says the unit of release is the skill. Every one-command installer that exists
treats the unit of distribution as the **repo**. So `install everything` and
`version each thing` are not obviously compatible, and picking a distribution
route is really picking which of the two bends.

## What is already true (and was not built here)

Run against `vidhunnan/agentic-skills` on 2026-09-05, unchanged:

```bash
npx skills add vidhunnan/agentic-skills --skill '*' -a claude-code -y
npx skills update
```

The first found all twenty skills, copied each **whole folder** — `SKILL.md` and
`.claude-plugin/` both — into `.claude/skills/`, and wrote a `skills-lock.json`.
The second refreshed all twenty in one pass.

This works because the layout already matches: [`vercel-labs/skills`](https://github.com/vercel-labs/skills)
walks three levels for a `SKILL.md`, and `skills/<name>/SKILL.md` is exactly that.
**The library is already installable in one command and nobody has been told.**

Two things about that tool are worth stating plainly, because they are the whole
argument below:

- Its registry is **GitHub, not npm**. `npx skills` is the delivery mechanism; npm
  only ships the CLI.
- Its lockfile pins a **`computedHash`**, not a version. Every `plugin.json`
  version in this repo is invisible to it. You cannot ask it for
  `handoff-generator@0.5.0`, and it cannot tell you which four skills moved.

## Why it might matter

- **The stack only works whole.** `decisions-logger` cites what `repo-setup` built;
  `design-critique` refuses to run without what `design-brief` wrote. A library
  whose install friction selects for partial adoption is selecting against its own
  thesis.
- **Twenty lines is a taste problem, not just a UX one.** The Install block is the
  most-read part of the README and currently reads as a list of chores.
- **`version-manager` argues that a released version is a thing you can point at.**
  Today the only pointer is "whatever is on `prod-stable` right now." A registry
  would make the library's own versioning claim checkable by someone outside it.

## The three routes

| | Install all | Update all | Per-skill versions | Cost to enable |
|---|---|---|---|---|
| **A. `npx skills`** | verified | verified | **no** — content hash | nothing |
| **B. npm source in `marketplace.json`** | per plugin | auto-update | **yes** — real semver | publish to npm, rewrite entries |
| **C. Our own `npx` CLI** | yes | yes | yes, on our terms | build and publish a package |

### A — free, and it flattens the versioning

Nothing to build. Two README lines. The cost is that it installs skills as
**plain skills, not plugins**: no `/plugin` manager entry, no `plugin-name:`
namespacing, and the per-skill versions this repo has an ADR about stop existing
at the install boundary. It also puts a third party between the library and its
installers.

### B — the only route that fits the model as written

Claude Code's marketplace takes an npm source directly:

```json
{
  "name": "handoff-generator",
  "source": { "source": "npm", "package": "@vidhunnan/handoff-generator", "version": "^0.5.0" }
}
```

Resolution order is marketplace `version` → `plugin.json` version → npm `latest`,
and marketplace auto-update then refreshes installed plugins in the background.
**The update half of the problem is already solved natively** — it is off by
default for third-party marketplaces and the installer toggles it once.

The cost is arithmetic. Twenty skills honestly versioned means **twenty npm
packages** to publish and keep publishing. One bundle package would be one entry
and one version, which is precisely the library-wide bump ADR 0026 exists to
refuse. There is no third option hiding here.

### C — one package, our rules

`npx @vidhunnan/agentic-skills install --all`, `update`, `status`. A `bin/` that
copies folders into `~/.claude/skills/` or `.claude/skills/`, writes a lockfile
carrying each skill's **real `plugin.json` version**, and on update prints *which
skills moved and to what* — the thing route A structurally cannot say.

Most of this already exists. `website/scripts/build-skill-zips.mjs` does
reproducible per-skill packaging with a source hash and a manifest, and solves the
one hard problem (deterministic bytes) already. The cost is that it is one more
piece of software to own, and this repo's whole argument is that unmaintained
artifacts are worse than absent ones.

## The actual fork

Not npm-or-not. It is:

> **Is the one-command install allowed to be version-blind?**

Route A says yes, today, for free. Route B says no and charges twenty packages for
it. Route C says no and charges a CLI. Choosing A is not "the cheap option" — it is
a position on whether per-skill versions are load-bearing for *installers* or only
for *the maintainer*, and ADR 0026 argued the former without ever being tested by
someone installing.

Worth noticing: nobody has yet asked for a specific version of a skill in this
library. If that is still true in six months, A was right and 0026 is a maintainer
convenience wearing a user-facing costume.

## What we'd have to believe

- That partial adoption is actually happening and actually harmful. **This is the
  shakiest one — there is no install telemetry, so the premise of the whole
  document is a guess.**
- That per-skill versions matter to someone who is not the maintainer.
- That a third-party installer (A) is an acceptable dependency for a library whose
  pitch is that the record should outlive the tooling.
- That twenty npm packages (B) would still be published in a year, by hand, on the
  day a skill changes. The version log exists because that discipline already
  slipped once.

## Open questions

- Does `npx skills` respect a `disable-model-invocation` frontmatter, or does
  installing all twenty flood a project's auto-trigger surface? **Twenty
  descriptions all matching natural phrasing is a real context cost** and nothing
  above measured it.
- Is there a route where the marketplace stays the canonical install and something
  else just *drives* it — a loop over the non-interactive `claude plugin install`?
  That is neither npm nor a CLI, and it preserves everything.
- Does any of this reach **Claude.ai**? No — no filesystem, zip upload only. So
  whatever gets built, the Chat surface keeps its committed zips and the split in
  the install story widens rather than closes.
- If B: scoped names (`@vidhunnan/handoff-generator`) or flat? Flat squats twenty
  generic words on a public registry, which is rude.

## What this does not solve

- **Claude.ai.** Unchanged, and now more obviously the odd one out.
- **Discovery.** A one-command install helps someone already convinced. Nothing here
  helps the person who has not heard of the library.
- **The README's twenty lines.** They stay, because per-skill install stays the
  documented path under every route. A one-command option sits *above* them.

## Graduate or kill

**Graduate** into a PRD when: someone outside the repo asks for a specific version
of a specific skill (→ B or C), or when a second installer says the twenty lines
stopped them (→ A, immediately, as two README lines).

**Kill** it when: the auto-trigger cost of installing twenty skills at once turns
out to make the bundle install a bad idea for the installer. Then the twenty lines
are not friction, they are a **filter**, and the README is already correct.

_Unresolved after a while? Kill it. A stale concept an agent can read is worse
than no concept at all._
