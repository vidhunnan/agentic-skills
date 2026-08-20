import { readFileSync } from "node:fs";
import { join } from "node:path";
import { expect, test } from "@playwright/test";
import { COUNTS } from "../components/lib/counts";

/*
  The counts are committed build output, because the deployed build cannot see
  the repo. Committed build output goes stale silently — this is what stops it.

  It is also the guard against the failure that made this necessary: the page
  once shipped "-1 decisions" because counts were read from a filesystem that
  was not there and every failure fell through to 0. A count that is zero or
  negative is not a missing number, it is a false claim, and it must fail here
  rather than render.

  Fix a failure by running: npm run prebuild
*/
const ROOT = join(process.cwd(), "..");
const NUMBERED = /^\d{4}-.*\.md$/;

async function derive() {
  const { readdirSync } = await import("node:fs");
  const count = (dir: string, re: RegExp) =>
    readdirSync(join(ROOT, dir)).filter((f) => re.test(f)).length;
  const claudeMd = readFileSync(join(ROOT, "CLAUDE.md"), "utf8");
  return {
    rules: (claudeMd.match(/BEGIN skill:[a-z]/g) ?? []).length,
    decisions: count("docs/decisions", NUMBERED) - 1,
    designDecisions: count("design/decisions", NUMBERED),
    commits: count("changelog/commits", /^\d{3}-.*\.md$/),
    handoffs: count("handoff", /^handoff-.*\.md$/),
  };
}

test("every count is positive — a zero would ship as a false claim", () => {
  for (const [name, value] of Object.entries(COUNTS)) {
    expect(value, `${name} must be a real count`).toBeGreaterThan(0);
  }
});

test("the committed counts still match the repo", async () => {
  expect(
    COUNTS,
    "counts are stale — run: npm run prebuild",
  ).toEqual(await derive());
});

test("the page renders the counts it committed", async ({ page }) => {
  await page.goto("/");
  const note = await page.locator("#how").innerText();
  for (const [name, value] of Object.entries(COUNTS)) {
    expect(note, `${name} (${value}) appears in the loop note`).toContain(
      String(value),
    );
  }
  expect(note, "no negative count ever reaches the page").not.toMatch(/-\d/);
});
