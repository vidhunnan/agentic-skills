# chore: ignore node_modules and the generated context graph

- **Commit:** `eeb3d4676d0d926bf61e3aa0fa1a6d6a69fa7e16` (`eeb3d46`)
- **Author:** Vidhunnan Murugan
- **Date:** 2026-08-24

## Commit message

Three untracked artifacts were sitting in `git status` with nothing ignoring
them: a root `node_modules/`, and `.graph-context/` plus `GRAPH.md` — both
generated output of the context-graph tool, regenerable from the repo.

`node_modules/` is scoped to the whole repo rather than a second per-directory
line. The root install is new (it has no ignore rule at all), and
`website/node_modules/` was already covered twice — by the root file and by
`website/.gitignore` — so the redundant root line goes and the broad rule stays.
Nothing under either path was ever tracked, so no cache cleanup was needed.

`GRAPH.md` is ignored by exact name, not as a pattern. It is a generated
sibling of README.md at the repo root, and a looser rule risks catching a
future hand-written doc.

## Changes in detail

### `.gitignore` (modified)
- **New `# Node` section: `node_modules/`.** The root of this repo acquired a `package.json`
  and an install with no rule covering it. The rule is written unanchored so it matches at
  any depth, which is the conventional form and means a future subdirectory package needs
  no third line.
- **`website/node_modules/` removed.** It became redundant the moment the broad rule landed,
  and it was *already* redundant a second way: `website/.gitignore:2` ignores `node_modules/`
  in that subtree independently. `git check-ignore -v` confirms the split after the change —
  root `node_modules` matches `.gitignore:18`, `website/node_modules` matches
  `website/.gitignore:2`. The comment above the remaining lines still reads
  *"website (Next.js build artifacts)"*, which is now more accurate than it was: what's left
  under it (`.next/`, `out/`, `next-env.d.ts`, `tsconfig.tsbuildinfo`) really is build output.
- **New `# graph-context` section: `.graph-context/` and `GRAPH.md`.** Both are generated —
  `.graph-context/viz.json` is a 130KB derived index, and `GRAPH.md` opens with a
  `<!-- BEGIN graph-context:graph -->` marker and reports 167 documents, 133 fragments and
  423 edges read out of the repo. Committing either would put a second, staler copy of the
  context stack next to the tiers that *are* the record.
- **The directory is ignored with a trailing slash, the file by exact name.** `GRAPH.md`
  deliberately gets no wildcard: it sits at the root beside `README.md` and `CLAUDE.md`, and
  a pattern like `GRAPH*` or `*GRAPH*.md` would be a rule that silently swallows a
  hand-written doc someone adds later.
- **Nothing was tracked.** `git ls-files | grep -c node_modules` returned `0` before the
  edit, so this is purely a status-noise fix — no `git rm --cached`, no history rewrite, and
  no risk of un-tracking a file someone depended on.

### Not in this commit
- `package.json` and `package-lock.json` remain **untracked and un-ignored**. They pin the
  tool that generates the graph, which is normally worth committing — unlike its output. The
  call was left to the owner rather than made silently in a commit about ignore rules.

## Files changed

```
 .gitignore | 8 +++++++-
 1 file changed, 7 insertions(+), 1 deletion(-)
```
