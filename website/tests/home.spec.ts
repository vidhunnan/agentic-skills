// Round 4 note on `includeHidden` and `allTextContents` below: the catalogue is
// now fourteen collapsed <details> rows and the install block steps one command at
// a time, so most copy buttons are legitimately outside the accessibility tree on
// load. The SELECTORS changed to see them; not one assertion did. If a count here
// ever needs lowering, that is content going missing, not a test needing a tweak.
import { expect, test } from "@playwright/test";
import {
  ALL_INSTALL_LINES,
  MARKETPLACE_CMD,
  TOTAL_SKILLS,
} from "../components/lib/skills";

/*
  Two commands are allowed to appear twice, and only these two.

  The defect this test was written for was FOURTEEN commands printed twice — once
  on a catalogue chip and again in an install list. That is still guarded: every
  other command must appear at most once.

  The two exceptions are deliberate and are the sequence, not duplication:
  the marketplace command opens both the hero and the install steps, and
  repo-setup is named as the entry point in the install sequence while also being
  one of the fourteen skills in the catalogue. Removing either would mean either a
  hero with no command or an install sequence that tells you to start with a skill
  without giving you the line.

  If a third command ever needs adding here, that is duplication returning.
*/
const REPEATS: Record<string, number> = {
  [MARKETPLACE_CMD]: 2,
  "/plugin install repo-setup": 2,
};

test.describe("landing page", () => {
  test("loads with the right title and hero heading", async ({ page }) => {
    await page.goto("/");

    await expect(page).toHaveTitle(
      "agentic-skills — the context your agent doesn't have",
    );

    const h1 = page.getByRole("heading", { level: 1 });
    await expect(h1).toHaveCount(1);
    await expect(h1).toContainText("An agent needs context to do good work.");
    await expect(h1).toContainText("Most of it was never written down.");

    // The five sections the page is built from, in order.
    for (const id of ["top", "written", "how", "skills", "install"]) {
      await expect(page.locator(`#${id}`)).toBeVisible();
    }
  });

  test("produces no console errors or uncaught page errors", async ({
    page,
  }) => {
    const problems: string[] = [];
    page.on("console", (msg) => {
      if (msg.type() === "error") problems.push(`console.error: ${msg.text()}`);
    });
    page.on("pageerror", (err) => problems.push(`pageerror: ${err.message}`));

    await page.goto("/", { waitUntil: "networkidle" });
    // Scroll the whole page so every IntersectionObserver-driven Reveal runs.
    await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
    await page.waitForTimeout(500);

    expect(problems).toEqual([]);
  });

  test("offers each install command exactly once", async ({ page }) => {
    await page.goto("/");

    // A documented past defect: the install section printed one command per
    // skill, duplicating every catalogue row — "thirty copy buttons for
    // fourteen commands". The catalogue is the single home for the per-skill
    // commands, so each must appear there exactly once.
    const catalogue = page.locator("#skills");
    for (const cmd of ALL_INSTALL_LINES) {
      await expect(
        catalogue.getByRole("button", {
          name: `Copy: ${cmd}`,
          includeHidden: true,
        }),
        `one copy button for "${cmd}" in the catalogue`,
      ).toHaveCount(1);
    }

    // Page-wide button budget, derived from the data plus the three
    // deliberate extras: the marketplace command in the hero, and the
    // marketplace + repo-setup pair in the install sequence.
    await expect(
      page.getByRole("button", { name: /^Copy: /, includeHidden: true }),
    ).toHaveCount(
      TOTAL_SKILLS + 3,
    );

    // And no per-skill command is *printed* more than once. (The marketplace
    // command is the one intentional repeat: hero and install section.)
    // textContent, not innerText: a collapsed <details> and a non-current step
    // both have text that innerText will not return.
    const codeBlocks = await page.locator("code").allTextContents();
    const printed = codeBlocks.map((t) => t.trim());
    for (const cmd of ALL_INSTALL_LINES) {
      expect(
        printed.filter((t) => t === cmd).length,
        `"${cmd}" printed more than the allowance`,
      ).toBeLessThanOrEqual(REPEATS[cmd] ?? 1);
    }
    expect(printed.filter((t) => t === MARKETPLACE_CMD).length).toBe(2);
  });
});
