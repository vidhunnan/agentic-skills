/**
 * Every user-facing string on the page, in one place.
 *
 * Until 2026-08-19 these ~50 strings — every headline, every section intro —
 * were literals inside the components, while only repeated content (skills,
 * matrix rows, specimens) lived as data. Repo ADR 0016 claimed content was
 * data-driven from one source; that was false as written, which is what ADR
 * 0023 records. This file is the half that was missing.
 *
 * Prose only. Structured, repeated content stays in `skills.ts`; counts are
 * derived in `counts.ts` and never written here.
 */

export const NAV = {
  mark: "agentic-skills",
  file: "README.md",
  cta: "[ install ]",
  /** Labels must match the heading each one points at. */
  links: [
    { id: "written", label: "what gets written" },
    { id: "how", label: "how one skill works" },
    { id: "skills", label: "the skills" },
  ],
  source: "source ↗",
} as const;

export const HERO = {
  eyebrow: "agent skills for claude code",
  headline: "An agent needs context to do good work.",
  headlineCont: "Most of it was never written down.",
  ledeBefore:
    "What shipped, why you chose it, what you tried and killed — from git, your files and your answers. And where nobody remembers why, ",
  /** Painted in --red: it names the honest gap, which is what the colour means. */
  ledeGap: "they say so",
  ledeAfter: ".",
  metaTail: "every output is Markdown",
  metaLink: "read the catalogue ↓",
  specimenNote: "a real file in this repo",
  specimenLink: "[read the whole thing]",
} as const;

export const MATRIX_COPY = {
  heading: "What gets written",
  sub: "Nine questions a project has to answer. Most of them already have an answer — it’s just nowhere you can read it.",
  columns: ["Question", "What answers it today", "This adds"],
  labelToday: "today: ",
  labelAdds: "adds: ",
  noteRed: "Red",
  note: " is not styling. It marks the rows where nothing answers the question today — the same signal the records use for a reason nobody recorded.",
} as const;

export const LOOP_COPY = {
  heading: "How one skill works",
  subLead: "Take ",
  subSkill: "decisions-logger",
  subRest: ". You’ve just decided something — “plain CSS Modules, not Tailwind.”",
  calloutKicker: "step 4",
  calloutLead: "This is the one nothing else does.",
  calloutBody:
    " A skill that stopped at step 3 would be forgotten by tomorrow — you’d have one good document and no second one. The rule is what makes it happen again.",
  /** Counts come from counts.ts. Never type one into this sentence. */
  noteTail: " — all of it readable in the repo.",
} as const;

export const SKILLS_COPY = {
  heading: "The skills",
  sub: "Fourteen, each a separate plugin. Three worth reading properly; the rest are one line each.",
  leadTag: "start with this one",
  leadNote:
    "It is the skill the specimen at the top of this page came from — including the two lines where the record says nobody recorded a reason.",
  leadOutputPrefix: "→ writes ",
  leadOutput: "docs/decisions/0018-",
  leadOutputSuffix: "….md",
  /* Shown under the download. True for every skill that offers one: the zip is
     the skill, and on Claude.ai a skill that would normally register a standing
     rule has nowhere to write it. */
  downloadHint:
    "Upload under Settings → Customize → Skills. On Claude.ai there is no file to write a standing rule into, so a skill that registers one prints it for you to paste instead.",
} as const;

export const INSTALL_COPY = {
  heading: "Install",
  sub: "Read a couple of the records above before you trust it with your repo — including the one that says it doesn’t know.",
  comments: [
    "# once",
    "# start here — it builds the folders the rest fill",
    "# then add the rest as you hit the need for them",
  ],
  bodyLead: "Claude Code gives you the system. Claude.ai gives you the artifact.",
  bodyRestBefore:
    " On Claude.ai a skill interviews you and hands back a document — there is no folder to write into and no rule registered, so nothing happens next session unless you paste the block in yourself. Skills marked ",
  bodyChat: "Chat",
  bodyRestAfter: " above have that path; the rest need git.",
} as const;

export const FOOTER = {
  blurb:
    "Skills for Claude Code that write your project’s context. Authored in Markdown, no code.",
  groups: [
    {
      title: "The page",
      links: [
        { label: "What gets written", href: "#written" },
        { label: "How one skill works", href: "#how" },
        { label: "The skills", href: "#skills" },
        { label: "Install", href: "#install" },
      ],
    },
    {
      title: "The record",
      links: [
        { label: "changelog/", href: "/tree/prod-stable/changelog" },
        { label: "decisions/", href: "/tree/prod-stable/docs/decisions" },
        { label: "design/decisions/", href: "/tree/prod-stable/design/decisions" },
        { label: "handoff/", href: "/tree/prod-stable/handoff" },
      ],
    },
  ],
  elsewhere: [
    { label: "github ↗", href: "" },
    { label: "vidhunnan.design ↗", href: "https://vidhunnan.design" },
    { label: "README.md", href: "/blob/prod-stable/README.md" },
  ],
  builtBy: "Built by",
  author: "Vidhunnan Murugan",
  authorHref: "https://vidhunnan.design",
  licence: "MIT licensed · authored in Markdown, no code",
} as const;
