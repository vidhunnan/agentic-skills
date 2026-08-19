# feat(website): rebuild in terminal-rendered markdown

- **Commit:** `fcea6dd59e8cddf46ab280a971fc7b260a465be4` (`fcea6dd`)
- **Author:** Vidhunnan Murugan
- **Date:** 2026-08-19

## Commit message

Builds design ADR 0007 in the real site. The reference is round 2's artifact;
this is that structure and copy in Next.js.

The direction, concretely: markdown syntax is present but recessive. `##`, `**`,
the table pipes and the fence ticks render in --mute rather than hidden. That is the
strongest reading of the language doc's "records shown verbatim, never restyled" —
showing the source markers IS verbatim, where rendering them into styled components
would not be.

Type: Geist Mono alone, and it turned out to be a variable font, so the whole weight
range is one file. 39 woff2 files and 608KB become 6 files and 68KB. Newsreader and
Archivo are gone. Geist Mono has no italic; nothing in this design uses one.

Structure: six sections in six forms, replacing six sections in one. The two parallel
stack sections become one nine-question matrix — they were printing changelog/ and
decisions/ twice with identical text. Proof collapses into a single hero specimen
carrying its real path. And "How one skill works" is new: the mechanism this library
runs on has never appeared on the site.

Deleted: Nav, CommandPalette, ContextStack, Proof, Specimens, and ~90 lines of
hand-rolled search ranker for a 14-item index. Nav imported OPEN_EVENT from
CommandPalette — the only component-to-component value import in the tree — so those
two had to go in the same commit.

Three defects fixed by construction rather than by patching:

- The mobile content loss. Trust qualifiers were display:none below 720px, which
  deleted the one thing the table exists to say. The matrix stacks and keeps every
  value; the only display:none rules left are the decorative column heads and pipes.
- The duplication. Specimens 1/6/3 were receipts 1/2/3 described twice; install
  commands appeared twice; the answers question rendered twice per row. One specimen,
  one place per command, one question per row.
- The eyebrow trap. The old global .eyebrow was display:flex, which split React's
  text nodes into flex items and rendered "14 skills" as "14skills". Not inherited.

Caught during verification: the compact index shipped without install commands, so
eleven skills had no reachable way to be installed. The index is now the only place
those commands live, which is why they belong on the row.

Also: npm run lint could not work — next lint was removed in Next 16 and there is no
eslint dependency. Replaced with typecheck (tsc --noEmit). next build was the only
quality gate in the repo.

Vocabulary rules enforced against the built HTML. One violation caught and fixed —
LOOP_STEPS said "Not your memory", and "memory" is out of bounds because it invites
the retired thesis back through the copy.

## Changes in detail

### `website/app/layout.tsx` (modified)

- Three font families become one. `Archivo`, `Newsreader` and `IBM_Plex_Mono` are
  replaced by `Geist_Mono`, loaded without a `weight` array because it is a variable
  font — the whole weight range in a single file, so 39 woff2 files and 608KB become 6
  files and 68KB. The `<html>` element now carries one font variable instead of three.
- The title, the meta description, the OG description and the OG image alt are all
  rewritten off the retired memory thesis. The description still derives its count from
  `TOTAL_SKILLS_WORD` rather than prose.
- The in-file comment cites *design ADR 0008* for the choice over IBM Plex Mono and a
  zero-webfont system stack.

### `website/app/page.tsx` (modified)

- The composition changes wholesale: `Nav` and `CommandPalette` out, `FileBar` in; the
  two `ContextStack` renders and `Proof` out, `Matrix` and `Loop` in. `Hero`, `Skills`,
  `Install` and `Footer` stay, rebuilt. The second `ContextStack` call took ~30 lines of
  JSX copy inline — that is gone with it.

### `website/components/FileBar.tsx`, `FileBar.module.css` (new)

- Frames the page as a file: a repo path plus four in-page links. A server component
  with no JS — the old `Nav`'s scroll-progress bar, scrollspy and palette trigger did
  not survive the rebuild.
- Its comment states the rule the old nav broke: a link's label must match the heading
  it points at, where the nav had called a section "System" while the section called
  itself "The context stack".

### `website/components/Matrix.tsx`, `Matrix.module.css` (new)

- Nine questions in three columns — question, what answers it today, what this adds —
  replacing the two parallel stack sections. Its comment cites *design ADR 0011* and
  the duplication it fixes: the two sections printed `changelog/` and `decisions/`
  twice with identical text.
- Redline marks only rows where nothing answers the question today, stated in the file
  as a constraint: it is the same signal the records use for an unrecorded reason, so it
  must not be spent on anything else here.
- The column heads and the `│` pipes are `aria-hidden` decoration; on narrow screens a
  `today:` label carries the value that the old table hid.

### `website/components/Loop.tsx`, `Loop.module.css` (new)

- "How one skill works" — the mechanism, shown once and concretely, walking
  `decisions-logger` from "you decided something" through its steps. The section is new
  to the site; its comment records that the site showed outputs and descriptions and
  never the loop that produces them.
- Names step 4 as the one nothing else does, on the argument that a skill stopping at
  step 3 leaves one good document and no second one.
- The counts in the closing note are flagged in the file as the only hardcoded numbers
  on the page, because they describe this repo's own record rather than the library and
  cannot be derived from `skills.ts`.

### `website/components/Hero.tsx`, `Hero.module.css` (modified)

- The rotation is gone; the hero renders `SPECIMENS[0]` only. The comment records why
  that entry is load-bearing — it is the ADR that says it doesn't know, and it is what a
  JS-off reader sees — and cites *design ADR 0010* for retiring the rotation, with
  breadth moved to the catalogue.
- The headline, lede and eyebrow are rewritten in the direction's idiom: the eyebrow is
  an HTML comment, the `#` and `##` markers render recessively, and the install command
  sits inside a ```` ```sh ```` fence.

### `website/components/Skills.tsx`, `Skills.module.css` (modified)

- Three skills shown in full, the other eleven as a one-line index. The comment states
  the reason in numbers: fourteen full rows was ~2,400px and would be ~5,400px at the
  thirty-two on the roadmap, and an index scales by rows instead of by screens.
- The three featured are chosen to cover the three evidence sources — from git, from
  you, and from the record itself — explicitly not to be the "best" three.
- Every index row carries its own install command, which the commit message records as
  a defect caught during verification: the compact index first shipped without them, so
  eleven skills had no reachable way to be installed.

### `website/components/Install.tsx`, `Install.module.css` (modified)

- A sequence, not a menu: the marketplace command, then `/plugin install repo-setup` as
  the named entry point, then a comment telling the reader to add the rest as they hit
  the need. The comment records what it replaces — fifteen near-identical rows and
  thirty copy buttons for fourteen commands, each already present on its own catalogue
  row.

### `website/components/Footer.tsx`, `Footer.module.css` (modified)

- Reduced to a single line wrapped in a rendered HTML comment, consistent with the
  page's idiom.

### `website/components/lib/skills.ts` (modified)

- `RECEIPTS` and the `Receipt` interface are deleted; `CONTEXT_STACK` and `DESIGN_STACK`
  are replaced by `MATRIX` and a `MatrixRow` interface, with a comment citing design ADR
  0011. `LOOP_STEPS` is added for the new section.
- `answeredToday` is deliberately never a flat "nothing" — the file says a reader who
  does write some of this down will bounce off a table telling them they don't — and
  `hasAnswerToday: false` is what paints the redline.
- 83 lines added against 222 removed — the largest single-file change in the commit.

### `website/app/globals.css` (modified)

- Retitled from "Swiss whitepaper" to a token file, described as the only place a colour
  or a scale step is defined, with `design/system/palette.md` named as the system of
  record and a rule that no colour is added without computing both contrast ratios.
- The three type variables (`--serif`, `--sans`, `--mono`) collapse to one `--mono`
  whose fallback stack stays monospace, so a font failure degrades to the right register
  rather than to a serif.
- Two new scales replace ad-hoc values, with the counts recorded in the file: a
  five-step type scale replacing 15 values between 10 and 17px, and a seven-step spacing
  scale replacing 33 values. The measure becomes `78ch`.
- All eleven palette values and both modes are carried over unchanged, contrast ratios
  and all — the language doc forbids re-deriving them.

### `website/components/Nav.{tsx,module.css}`, `CommandPalette.{tsx,module.css}`, `ContextStack.{tsx,module.css}`, `Proof.{tsx,module.css}`, `Specimens.{tsx,module.css}` (deleted)

- Ten files, 1,475 deletions. `Nav` imported `OPEN_EVENT` from `CommandPalette` — the
  only component-to-component value import in the tree — so those two had to go together.
- `CommandPalette` took ~90 lines of hand-rolled search ranker with it, for a 14-item
  index.

### `website/package.json` (modified)

- `lint: next lint` becomes `typecheck: tsc --noEmit`. The commit message records that
  the old script could not have worked: `next lint` was removed in Next 16 and there is
  no eslint dependency, so `next build` was the repo's only quality gate.
- The package description is updated off "Swiss-whitepaper".

## Files changed

```
 website/app/globals.css                      | 149 +++++++------
 website/app/layout.tsx                       |  39 +---
 website/app/page.tsx                         |  41 +---
 website/components/CommandPalette.module.css | 199 -----------------
 website/components/CommandPalette.tsx        | 246 ---------------------
 website/components/ContextStack.module.css   | 145 -------------
 website/components/ContextStack.tsx          |  77 -------
 website/components/FileBar.module.css        |  53 +++++
 website/components/FileBar.tsx               |  39 ++++
 website/components/Footer.module.css         |  40 +---
 website/components/Footer.tsx                |  43 +---
 website/components/Hero.module.css           | 165 ++++++---------
 website/components/Hero.tsx                  |  99 +++++----
 website/components/Install.module.css        | 103 ++++-----
 website/components/Install.tsx               |  78 ++++---
 website/components/Loop.module.css           |  60 ++++++
 website/components/Loop.tsx                  |  50 +++++
 website/components/Matrix.module.css         | 102 +++++++++
 website/components/Matrix.tsx                |  65 ++++++
 website/components/Nav.module.css            | 144 -------------
 website/components/Nav.tsx                   | 110 ----------
 website/components/Proof.module.css          |  94 ---------
 website/components/Proof.tsx                 |  35 ---
 website/components/Skills.module.css         | 181 +++++++---------
 website/components/Skills.tsx                | 115 +++++-----
 website/components/Specimens.module.css      | 203 ------------------
 website/components/Specimens.tsx             | 222 -------------------
 website/components/lib/skills.ts             | 305 ++++++++-------------------
 website/package.json                         |   4 +-
 29 files changed, 915 insertions(+), 2291 deletions(-)
```

---

_Generated by `/changelog-tracker` from `git log -1` and `git show --stat`. Every
fact here comes from git: **faithful, not generative.**_
