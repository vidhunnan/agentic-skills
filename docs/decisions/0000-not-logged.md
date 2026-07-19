# 0000. Not logged

Candidates the decision log deliberately does **not** contain — so a re-run doesn't propose them again, forever.

**This is a ledger, not a decision.** Unlike its numbered siblings it is *hand-editable*: delete a row to make a candidate eligible again, or run `/decisions-logger reconsider` to re-open everything here for one run.

## Declined by the owner

Real decisions whose reasoning was never recorded anywhere. Each was surfaced with its named alternative and its reason marked `NOT STATED`; each was declined rather than logged with an honest gap. **They remain undocumented decisions** — that is a knowing choice, recorded here so it is at least visible.

| Date | Candidate (the claim) | Primary evidence | Class | Why not |
|---|---|---|---|---|
| 2026-07-13 | Branch names carry no area segment — over `<area>/<type>/<slug>` | `CLAUDE.md` `skill:branch-naming` block (Tier D — rule only) | declined | Reason was never written down; owner declined to log it with `(reason not stated)`. |
| 2026-07-13 | `prod-stable` is the protected default branch — over `main` | `CONTRIBUTING.md` (Tier D — "by design" asserts intent, states no reason) | declined | As above. |
| 2026-07-13 | Skills are private-first, public later — over public from day one | `CLAUDE.md`; `handoff/…-build-publish-skill.md` §Open Questions | declined | As above. Arguably a rollout fact rather than a durable decision. |
| 2026-07-13 | Skills target two surfaces (Claude Code + Claude.ai) — over Claude Code alone | `CLAUDE.md` §Multi-surface design (states the constraint, not the reason) | declined | As above. Every skill pays for this in a branching Step 0. |
| 2026-07-13 | `handoff-generator` is interview-first and bidirectional | `handoff/…-build-publish-skill.md` §Decisions Made ("per the owner's expanded requirements" — an authority, not a reason) | declined | As above. |

## Below the bar

Filtered out by the significance gates before ever reaching the owner.

| Date | Candidate (the claim) | Primary evidence | Class | Why not |
|---|---|---|---|---|
| 2026-07-13 | Added a `.gitignore` for OS/editor cruft | `handoff/…-build-publish-skill.md` §Decisions Made | below-bar | **Fork Test.** The loser would be "commit `.DS_Store`". Nobody would defend it. A fact, not a fork. |
| 2026-07-13 | The slug was added to the handoff filename | `git:8b02a1b` (2026-07-12) | below-bar | **Fork Test.** A bug fix — the "loser" is the bug. No reasonable person picks the collision. |
| 2026-07-13 | PRD bumped to v0.2 to match the expanded scope | `handoff/…-build-publish-skill.md` §Decisions Made | below-bar | Bookkeeping. No fork. |
| 2026-07-13 | Committed on `feat/handoff-generator`, not directly on `prod-stable` | `handoff/…-build-publish-skill.md` §Decisions Made | below-bar | **Policy, not instance.** A record of *complying* with a rule is not a decision — the rule is. Collapses into the `prod-stable` row above. |
| 2026-07-13 | Handoff filename collisions use a numeric counter (`-2`), not a timestamp | `handoff/…-build-publish-skill.md` §Decisions Made | below-bar | **Blast radius (Gate 2).** A real fork with a stated reason, but reversal is one line of one skill. Below the bar for an ADR. |
| 2026-07-13 | PRD `## Non-goals (v1)` is deliberately unnumbered | `docs/prds/README.md` (calls it a "house quirk") | below-bar | A style quirk, not load-bearing. A quirk is not a reason. |
| 2026-07-19 | `website/vercel.json` pins the framework preset to `nextjs` | `git:6df57db` (2026-07-19) | below-bar | **Blast radius (Gate 2).** A config fix for Vercel's framework misdetection; reversal is one file. Below the bar for an ADR. |
| 2026-07-19 | The website uses `output: 'export'` (static export) | `git:e4a1f2e` §`website/next.config.mjs` | below-bar | **Fork Test.** For a no-dynamic-content marketing site, a server runtime is not an alternative a reasonable person picks. A fact, not a fork. |
| 2026-07-19 | The website credits the author (footer byline + `<meta>`) | `git:d763f7a` (2026-07-19, PR #17 — not yet merged) | below-bar | **Fork Test.** No defensible loser to "put the author's name on their own site". Also unshipped to `prod-stable` at time of logging. |
| 2026-07-19 | The site is served from the custom domain `agentic-skills.vidhunnan.design` | `website/app/layout.tsx` (`SITE_URL`) · `git:a95956e` | below-bar | A deployment/config fact, not a fork. |

---

**Classes** — `below-bar` (failed the Fork Test or the blast-radius gate) · `declined` (the owner said no) · `deferred` (the owner said *not now* — re-proposed as a footnote) · `unshipped` (a proposal with no shipping evidence — re-proposed automatically once evidence appears).
