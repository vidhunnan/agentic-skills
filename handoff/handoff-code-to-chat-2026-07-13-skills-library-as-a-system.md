# Handoff Brief — The skills library became a system
From: code   To: chat
Date: 2026-07-13

## Context

`agentic-skills` went from four loose skills to a six-skill system that composes. Two new skills were built and shipped: **`repo-setup`**, which scaffolds a project's context stack (the tiered docs folders that let an agent with no memory be briefed), and **`decisions-logger`**, which mines a project for the decisions that were actually made and writes each as an ADR. `repo-setup` builds the folders; `changelog-tracker` and `decisions-logger` fill them.

The skills were then run on this repo. `repo-setup` scaffolded the stack, and `decisions-logger` produced **14 ADRs** in `docs/decisions/` — including a ledger of five decisions whose reasoning was never written down anywhere. The README was rewritten around the whole thing. Five PRs (#6, #7, #9, #10, #11) are all merged; `prod-stable` is clean and there are no open PRs.

The source material for both skills was the "Writing for Machines" talk — its doc-types slide is now a working implementation rather than a slide.

## Decisions Made

- **`repo-setup`'s canon is everything under `docs/`, with `changelog/` at the root** — `docs/` is hand-written hypothesis, `changelog/` is generated truth, so the folder layout *is* the done-vs-explored rule.
- **`repo-setup` detects, maps, and confirms — it never imposes** — it surveys a repo, maps existing folders onto tiers with a name lexicon confirmed by a content sniff, and adopts existing names. Canon only fills gaps.
- **`repo-setup` is additive-only: never `mv`, `rm`, or overwrite** — it reasons about someone else's repo from a heuristic, and a wrong guess that creates a folder is noise while a wrong guess that moves files is damage.
- **`handoff-generator` was NOT migrated to `docs/handoffs/`** — instead `repo-setup` resolves paths as *declared-in-CLAUDE.md > exists-on-disk > canon*, so it adopts the existing `handoff/` and no duplicate folder is created. Chosen to avoid a breaking change to an already-installed skill.
- **`docs/phases/` is offered in the interview, not forced** — most small repos would carry an empty phases folder forever.
- **`decisions-logger` proposes candidates, then interviews — it never invents a rationale** — mining a repo for "why we chose X" is exactly where a model fabricates reasoning, and a plausible fake is indistinguishable from a real one to every future reader.
- **The anti-confabulation mechanism is a source *firewall*, not a ban** — an earlier design banned reading the files that state rules without reasons (CLAUDE.md protocol blocks, CONTRIBUTING). That was wrong: the reason-less decisions live *only* in those files, so a ban makes them unfindable. Instead their prose is forbidden from reaching an ADR's Context/Alternatives/Consequences, so such a candidate is stamped `NOT STATED` by construction.
- **Every interview question must offer "I don't remember"** — remove that option and the model fills the gap. It produces a real ADR reading `*(reason not stated)*`.
- **Append-only was scoped to the reasoning, not the pointers** — the flat "never edit a decision" rule broke on first use: a superseded ADR whose Status still reads "Accepted" lies to the next reader. Exactly two mutations are now permitted (the `Status:` line and appends under `## Follow-up`), enforced by a byte-identical check on the frozen body.
- **The reject ledger is a prose table in git (`0000-not-logged.md`), not a hidden JSON cache** — the record of what we chose *not* to record is part of the record, and the user must be able to see and correct it.
- **All five reason-less decisions were declined rather than logged with `(reason not stated)`** — (reason not stated).
- **README: install split into three independently copyable blocks; Status column reads `Live`; Skills tables grouped by job** — the single fenced block copied all seven commands at once, and a Status column whose cells were all identical carried no information.
- **The two skills shipped as stacked PRs rather than waiting for each merge** — chosen to avoid blocking on a maintainer-only merge.

## Open Questions

- **The changelog protocol has a hole, and it will recur.** Commit `f52b824` (the 14 ADRs) never got a changelog entry — it landed through a PR merge, and nothing in the protocol catches that. `changelog-tracker` skips merge commits by design, so a squashed or merged feature branch can slip through undocumented. Fixing entry 007 does not fix the mechanism.
- **Five decisions in this repo remain undocumented, by choice.** No area segment in branch names; `prod-stable` over `main`; private-first; the two-surface split; `handoff-generator` being interview-first and bidirectional. All five are real forks whose reasoning was never recorded, and all five were declined at the interview. They are visible in `docs/decisions/0000-not-logged.md` but their reasoning is now only in one head.
- **`repo-setup` and `handoff-generator` still disagree about the default handoff path.** `repo-setup`'s canon says `docs/handoffs/`; `handoff-generator` writes `handoff/`. Path resolution makes this safe in *this* repo (the existing folder wins), but in a **fresh** repo scaffolded by `repo-setup` and then run through `handoff-generator`, you get `docs/handoffs/` created and then `handoff/` written into — two folders. This was flagged when the canon was chosen and accepted knowingly; it has not been revisited.
- **`docs/concepts/` is empty.** The tier exists with a README and template; nothing has been filed in it.
- **`decisions-logger`'s own design decisions are unlogged** — e.g. the `0000` prose ledger over a JSON cache, the source firewall over a ban. Legal to log, but logging the tool's own machinery in the log it produces was left alone.

## Files / Repos Referenced

- `vidhunnan/agentic-skills` (GitHub repo, default branch `prod-stable`)
- `skills/repo-setup/SKILL.md`
- `skills/decisions-logger/SKILL.md`
- `docs/prds/repo-setup.md`
- `docs/prds/decisions-logger.md`
- `docs/decisions/` — `0000-not-logged.md` plus ADRs `0001`–`0014`
- `docs/decisions/README.md` (carries the `<!-- BEGIN decisions-index -->` region)
- `docs/decisions/_TEMPLATE.md`
- `docs/MODEL-STRATEGY.md`
- `changelog/commits/004-add-repo-setup-skill-and-scaffold-this-repos-context-stack.md`
- `changelog/commits/005-add-decisions-logger-skill.md`
- `changelog/commits/006-rewrite-the-readme-around-the-context-stack.md`
- `README.md`, `CLAUDE.md`, `CONTRIBUTING.md`
- `/Users/vidhunnan/Desktop/handoff-chat-to-code-2026-07-13.md` (the deck→repo handoff)
- `/Users/vidhunnan/Desktop/HANDOFF.md` (the talk's own handoff)
- `/Users/vidhunnan/Downloads/writing-for-machines-v7.html` (the deck; its doc-types slide is the spec)
- PRs: #6 (repo-setup), #7/#10 (decisions-logger), #9 (the 14-ADR backfill), #11 (README) — all merged
- Commit `f52b824` — the ADR backfill, still undocumented in the changelog

## Next Actions for chat

- [ ] Document commit `f52b824` (the 14-ADR backfill) as `changelog/commits/007-*.md` and add it to the index — the one concrete gap in the changelog.
- [ ] Decide how to close the protocol hole so merge-landed commits stop slipping through. Options worth thinking about: have `changelog-tracker` reconcile against `git log` and report *undocumented* commits rather than only documenting the one in front of it, or add a `/changelog-tracker check` mode mirroring `/repo-setup check`.
- [ ] Decide whether to revisit the five declined decisions. Their reasoning exists only in memory right now, and memory is the thing this whole library exists to distrust.
- [ ] Decide whether `handoff-generator`'s default should move to `docs/handoffs/` in a v0.4, closing the two-folder divergence for fresh repos.
- [ ] Consider what the deck should say now. Slide 20's doc-types table was described in the talk's own handoff as "evolution based on various repos" with two rows never confirmed — those folder names are now a shipped, dogfooded implementation with 14 ADRs behind them.
