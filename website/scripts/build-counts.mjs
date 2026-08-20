/**
 * Derive the five counts the page states about this repo, into a committed JSON.
 *
 * THE BUG THIS FIXES: counts.ts read the repo filesystem at build time. Vercel's
 * Root Directory is `website/`, so the repo root is not on disk there — the same
 * absence that made the zip script die with ENOENT. counts.ts caught every
 * failure and returned 0, and the decisions count is `files - 1` for the reject
 * ledger, so the deployed page read:
 *
 *     0 rules live in this repo's CLAUDE.md. They have produced -1 decisions,
 *     0 design decisions, 0 documented commits and 0 handoffs.
 *
 * On a page whose stated constraint is "no claim the page cannot source", that is
 * the worst available failure: not a missing number, a false one. Silently, and
 * only in production.
 *
 * So the counts are computed where the repo exists and committed, exactly like
 * the skill zips. Same tradeoff, same mitigation: committed build output goes
 * stale, and tests/counts.spec.ts is what catches it.
 */
import { readdirSync, readFileSync, writeFileSync, existsSync } from "node:fs";
import { join } from "node:path";

const HERE = import.meta.dirname;
const WEBSITE = join(HERE, "..");
const ROOT = join(WEBSITE, "..");
const OUT = join(WEBSITE, "components", "lib", "counts.json");

const NUMBERED = /^\d{4}-.*\.md$/;

/** Every count is a hard failure here. Never a fallback, never a zero. */
export function derive() {
  const count = (dir, re) =>
    readdirSync(join(ROOT, dir)).filter((f) => re.test(f)).length;

  const claudeMd = readFileSync(join(ROOT, "CLAUDE.md"), "utf8");
  // The literal `BEGIN skill:<name>` in the docs example has no real name after
  // the colon, so it is excluded by requiring a lowercase letter.
  const rules = (claudeMd.match(/BEGIN skill:[a-z]/g) ?? []).length;

  return {
    rules,
    decisions: count("docs/decisions", NUMBERED) - 1, // 0000 is the reject ledger
    designDecisions: count("design/decisions", NUMBERED),
    commits: count("changelog/commits", /^\d{3}-.*\.md$/),
    handoffs: count("handoff", /^handoff-.*\.md$/),
  };
}

if (!existsSync(join(ROOT, "CLAUDE.md"))) {
  // Root-directory build: the repo is not here, and the committed file is the
  // only source. Verify it rather than silently shipping whatever it holds.
  if (!existsSync(OUT)) {
    throw new Error(`No repo root and no committed ${OUT}. Counts cannot ship.`);
  }
  const counts = JSON.parse(readFileSync(OUT, "utf8"));
  const bad = Object.entries(counts).filter(
    ([, v]) => typeof v !== "number" || v <= 0,
  );
  if (bad.length) {
    throw new Error(
      `committed counts are not all positive: ${JSON.stringify(bad)}. ` +
        `A zero or negative count would ship as a false claim.`,
    );
  }
  console.log(
    `counts: verified committed values (no repo root — root-directory build)`,
  );
} else {
  const counts = derive();
  const bad = Object.entries(counts).filter(([, v]) => v <= 0);
  if (bad.length) throw new Error(`derived a non-positive count: ${JSON.stringify(bad)}`);
  writeFileSync(OUT, JSON.stringify(counts, null, 2) + "\n");
  console.log("counts:", JSON.stringify(counts));
}
