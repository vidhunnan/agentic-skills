import { readdirSync, readFileSync } from "node:fs";
import { join } from "node:path";

/**
 * The five counts the page states about this repo, derived from the repo.
 *
 * These were typed by hand until 2026-08-19 and drifted three times in a single
 * day — the site said seven rules and 32 commits, the round 3 artifact said 7
 * design decisions and 37 commits, and both were stale within the session that
 * wrote them. A typed count is a claim the page cannot source, which the design
 * language doc lists as a hard constraint.
 *
 * Node APIs are safe here: this module is imported only by server components and
 * runs at build time under `output: "export"`. Importing it from a client
 * component will fail the build, which is the correct failure.
 */
const REPO_ROOT = join(process.cwd(), "..");

const countFiles = (dir: string, re: RegExp) => {
  try {
    return readdirSync(join(REPO_ROOT, dir)).filter((f) => re.test(f)).length;
  } catch {
    return 0;
  }
};

/** Protocol blocks registered in CLAUDE.md — the `<!-- BEGIN skill:<name> -->` markers. */
function countProtocolBlocks(): number {
  try {
    const md = readFileSync(join(REPO_ROOT, "CLAUDE.md"), "utf8");
    // The literal `BEGIN skill:<name>` in the docs example has no real name after
    // the colon, so it is excluded by requiring at least one lowercase letter.
    return (md.match(/BEGIN skill:[a-z]/g) ?? []).length;
  } catch {
    return 0;
  }
}

const NUMBERED = /^\d{4}-.*\.md$/;

export const COUNTS = {
  rules: countProtocolBlocks(),
  decisions: countFiles("docs/decisions", NUMBERED) - 1, // 0000 is the reject ledger
  designDecisions: countFiles("design/decisions", NUMBERED),
  commits: countFiles("changelog/commits", /^\d{3}-.*\.md$/),
  handoffs: countFiles("handoff", /^handoff-.*\.md$/),
} as const;
