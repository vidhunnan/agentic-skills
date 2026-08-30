---
name: post-setup
description: Scaffolds the posts tier — the derived folder the working-in-public skills write into — and captures how your posts should sound, by interview plus real samples you paste in. Personal profiles are gitignored by default; the skill ships a template and never a voice. Use when the user says "set up posts", "where do my posts go", "set up this repo for working in public", "capture my writing voice", or runs /post-setup. Claude Code primary; on Claude.ai it produces the scaffold as downloadable artifacts.
when_to_use: 'Also fires on: "set up the post folder", "define my post voice", "how should my posts sound", "set up the card direction", "/post-setup check". This skill only scaffolds and captures; it drafts nothing. To capture material use post-export, to find an angle use post-angles, to draft copy use post-generator, to render frames use post-card. For the docs context stack use repo-setup, and for the design stack use design-setup.'
argument-hint: "[check|add <thing>]"
allowed-tools: Read, Write, Edit, Bash, Glob, Grep, AskUserQuestion
disable-model-invocation: false
---

# post-setup

Builds the tier the working-in-public family writes into, and captures the two
profiles the rest of the family reads: **how your posts sound**, and **how your
frames look**.

Without a voice file a drafting skill falls back on the model's defaults, which is
LinkedIn announcement copy — em dashes, "excited to share", emoji bullets, a
hashtag stack — recognisable within one line and corrosive to the credibility the
content was supposed to earn. Without a card direction a frame generator invents a
look nobody chose, and a feed where nothing matches is most of what a card was
meant to prevent.

Three rules govern this skill:

- **It ships a template, never a voice.** A captured voice is personal data — one
  person's register, derived from their own writing. `VOICE.md` is generated *into
  your project* and is **gitignored by default**, because most repos a skill runs
  in are public or shared. What ships with the plugin is the shape and the
  banned-moves list. This is the same relationship `model-strategy` has to
  `docs/MODEL-STRATEGY.md`: the skill writes the file, the file is not the skill.
- **Never invent a voice.** Asked how someone writes, a model will produce a
  confident, generic answer. If the user supplies neither samples nor answers, the
  positive half of `VOICE.md` stays **empty and says so**. A plausible voice nobody
  chose is worse than an admitted gap, because every later draft inherits it
  silently.
- **Detect, map, confirm — never impose. Additive only.** Inherited from
  `repo-setup` and `design-setup`, because they are the same two problems. If the
  project already calls it `content/`, the tier *is* `content/`. Every write is a
  file that did not exist.

## The canon

Used only to fill gaps. An existing path always wins.

| Path | What it holds | Committed? |
|---|---|---|
| `posts/README.md` | The tier's tense: **derived — it cites the record, never a source** | yes |
| `posts/VOICE.md` | How the posts sound | **gitignored by default** |
| `posts/VOICE.example.md` | The shape, plus the banned-moves list | yes |
| `posts/CARD.md` | How the frames look | **gitignored by default** |
| `posts/CARD.example.md` | The shape | yes |
| `posts/material/README.md` | The backlog index | yes |
| `posts/material/assets/` | Snapshots of a before-state | yes |
| `posts/cards/` | Rendered frames | yes |

**`posts/` is downstream of the context stack, not a tier in it.** It gets no row
in `repo-setup`'s routing table, and nothing may cite a post as evidence that
something shipped. If the user asks for it to be added to the routing table, say
this and point at `changelog/`.

## Instructions

### Step 0 — Detect your surface

Using **Bash availability**:

- **Claude Code** — Bash works and there's a real filesystem. Full flow.
- **Claude.ai** — no repo to survey. Degrade: ask the user to describe any existing
  posts folder, run both interviews conversationally, and produce the tier READMEs,
  the templates and the captured profiles as **downloadable artifacts**, plus the
  CLAUDE.md block to paste. Skip every write, the gitignore step and the
  registration. Don't error.

Confirm the repo: `git rev-parse --show-toplevel`.

**Argument modes:**
- *(no argument)* — the full flow, Steps 1–8.
- `check` — Steps 1–2 and a drift report, **zero writes**.
- `add <thing>` — scaffold one named piece only (`voice`, `card`, `material`), and
  skip the rest of the survey. Use this to re-run the voice interview later.

### Step 1 — Survey (read-only census)

Report, never assume:

1. **An existing tier** — `posts/`, `content/`, `social/`, `writing/`. Match
   **case-insensitively**. If one exists, it *is* the tier; canon fills only gaps.
2. **A design system** — `design/system/`, `design/system/palette.md`, or a
   `design-language` output. This pre-fills the card direction in Step 4.
3. **The record tiers** — `changelog/`, `docs/decisions/`, the explorations tier,
   `handoff/`. You are not creating these; you are establishing **what the drafting
   skills will be able to source from**.
4. **CLAUDE.md** and its `<!-- BEGIN skill:* -->` blocks.
5. **`.gitignore`**, and whether the repo has a public remote.

**Say what you found before you write anything**, including the sourcing report
from item 3 — see Step 7.

### Step 2 — Confirm the mapping

Show the adopted path for every piece and ask once. Declined pieces get skipped,
not silently created. If the user wants a different layout, take it: the folder
names are theirs.

### Step 3 — Capture the voice

**Two inputs, and both matter.** A described voice and a demonstrated one are
different things: the interview gets the rules the user can articulate, the samples
get the patterns they cannot.

1. **Ask for three to five real posts they wrote.** Pasted in, or paths to them.
   Say why: without samples the positive half of the file stays empty.
2. **Ask what genre the samples are.** Announcement posts, build-logs, essays,
   replies. This is not optional — a voice captured from one genre does not
   transfer to another, and announcement samples will otherwise produce
   announcement-register build-logs.
3. **Read the samples and extract, citing evidence.** Every trait under **Carries
   over** records how many of how many samples showed it. A rule that cites its
   evidence can be checked; one that doesn't is your taste wearing the user's name.

   Look for the traits people rarely articulate about themselves:

   | Look for | Why it matters |
   |---|---|
   | How other people are referred to | Crediting habits are the most consistent and most personal trait there is |
   | Whether numbers appear, and whether they are real | Separates a voice that reports from one that impresses |
   | Who the post is addressed to | Reader-facing and author-facing openings produce different posts |
   | Where the argument sits | Thesis-first, or built up to |
   | Paragraph length and rhythm | The most reliable tell, and the hardest to describe from memory |
   | How a post closes | Invitation, statement, or call to action |

4. **Ask what to strip.** Show what you observed and ask which of it they do not
   want. **Where the user's instruction contradicts the samples, the instruction
   wins** — and the contradiction goes in the **Stripped** table with its evidence
   count, recorded rather than silently resolved. A user who says "no em dashes"
   about samples full of em dashes has told you something real; hiding the conflict
   loses it.
5. **Mark any register you have no samples for as uncaptured.** Do not infer it.

**If the user declines both samples and interview**, write the banned-moves list,
leave the positive half explicitly empty, and say plainly that every draft until
they return will be generic.

### Step 4 — Capture the card direction

Same rule, one level down: **ask, don't propose a look.**

Where Step 1 found a design system, **pre-fill from it and confirm** — tokens,
type, and any semantic role the palette assigns a colour. Where a palette says
*this accent means unverified*, that meaning carries into the cards and is not
available for decoration. Where no design system exists, interview: ground, figure,
one accent, how much text a frame holds, whether it carries a wordmark.

Record frame sizes with an explicit note that they drift and must be verified
before use. A stale aspect ratio looks correct locally and crops wrong in the feed,
which is the worst kind of wrong.

### Step 5 — Set the privacy default

**`posts/VOICE.md` and `posts/CARD.md` are gitignored unless the user says
otherwise.** Add the lines with a comment saying why, so a later reader doesn't
"fix" the omission.

Then **offer committing as a real choice**, once: it survives a fresh clone, works
across machines, and lets a team share one voice. Say what it costs — a profile of
how someone writes, published into whatever repo this is. Take either answer.

### Step 6 — Write the gaps

Only what does not exist. Never move, rename or overwrite.

The `*.example.md` templates are committed and carry the banned-moves list; the
captured profiles are not. Both are written, and they are different files — the
example is what would ship with the plugin, the real one is the user's.

### Step 7 — Report what the drafting skills can source

The most useful thing this skill says, and the part people skip:

- **Record tiers present** → the family can verify claims, and `post-angles` has
  something to read.
- **None present** → say plainly that `post-export` and `post-generator` will run
  in conversation-sourced mode, labelling their output
  `*(from conversation, not the record)*`. This is supported and honest, but the
  user should know which mode they are in before the first draft, not after.
- **Voice captured or not**, and what that means for the next draft.

### Step 8 — Register the posts protocol in CLAUDE.md

Idempotent registration (Claude Code only; on Claude.ai, print the block to paste):

1. Locate CLAUDE.md: `git rev-parse --show-toplevel` → `<root>/CLAUDE.md` (accept
   `.claude/CLAUDE.md`; prefer existing).
2. **Exists** → Read; search for the literal `<!-- BEGIN skill:post-setup -->`.
   Absent: show the block, ask (AskUserQuestion), insert under `## Skill protocols`
   (create the heading if needed), never blind-append. Present: update in place only
   if the block changed; else "already registered." **Never touch other skills'
   blocks.**
3. **Missing** → don't stub; offer a full `/init`-style analysis
   (confirmation-gated), then insert.

**Render the paths from the confirmed mapping, not canon.**

Canonical block:
```md
<!-- BEGIN skill:post-setup -->
### Working in public
Posts live in `posts/` and are **derived**: they cite the record and are never a source. Never cite a post as evidence something shipped — check `changelog/`, or check the code. Nothing in this family ever publishes; drafts are drafts and the human posts them.

Material is perishable, so **capture is offered and posting never is.** At the end of a stretch of work, offer `/post-export` once to capture what was postable while it is still warm — the failed attempt and why, what a flow looked like before, the output of the run that broke. Git keeps the before-state of code and nothing of the rendered before. Take no for an answer, and never suggest that the user should be posting more.

`posts/VOICE.md` and `posts/CARD.md` are personal profiles and are gitignored. Flow: `/post-export` → `/post-angles` → `/post-generator` → `/post-card`. Run `/post-setup check` to re-verify the tier.
<!-- END skill:post-setup -->
```

### Step 9 — Edge cases

- **The tier already exists** — adopt it, report what is present, write only gaps.
  Never migrate someone's folder.
- **A voice file already exists** — never overwrite it. Offer `add voice` to
  re-run the interview and show a diff before replacing anything.
- **The user says "you know how I write, just do it"** — decline the substance.
  You have their samples or you do not. Offer to draft the file *from the samples
  in front of you*, section by section, and confirm. An invented voice is the one
  failure that contaminates every future post.
- **Samples that are all one genre** — say so, capture what carries over, and mark
  the other register uncaptured. This is the common case and it is not a problem
  as long as the file admits it.
- **Samples containing other people's private information** — a thank-you post
  naming colleagues is fine; a screenshot of a private thread is not. Extract the
  pattern, never quote the content.
- **A public repo** — mention it once at Step 5. The default already covers it.
- **No design system, and the user has no view on the cards** — write `CARD.md`
  with one restrained default and mark it unconfirmed. `post-card` will ask again.
- **The user wants `posts/` in the routing table** — decline and explain: a derived
  tier in the routing table is how a post becomes citable as evidence.
- **Not a git repo** — the survey degrades to a directory listing. Say so, and skip
  the gitignore step with an explicit warning that nothing is protected.
