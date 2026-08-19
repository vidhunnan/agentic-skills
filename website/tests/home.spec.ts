import { expect, test } from "@playwright/test";
import {
  ALL_INSTALL_LINES,
  MARKETPLACE_CMD,
  TOTAL_SKILLS,
} from "../components/lib/skills";

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
        catalogue.getByRole("button", { name: `Copy: ${cmd}` }),
        `one copy button for "${cmd}" in the catalogue`,
      ).toHaveCount(1);
    }

    // Page-wide button budget, derived from the data plus the three
    // deliberate extras: the marketplace command in the hero, and the
    // marketplace + repo-setup pair in the install sequence.
    await expect(page.getByRole("button", { name: /^Copy: / })).toHaveCount(
      TOTAL_SKILLS + 3,
    );

    // And no per-skill command is *printed* more than once. (The marketplace
    // command is the one intentional repeat: hero and install section.)
    const codeBlocks = await page.locator("code").allInnerTexts();
    const printed = codeBlocks.map((t) => t.trim());
    for (const cmd of ALL_INSTALL_LINES) {
      expect(
        printed.filter((t) => t === cmd).length,
        `"${cmd}" printed at most once`,
      ).toBeLessThanOrEqual(1);
    }
    expect(printed.filter((t) => t === MARKETPLACE_CMD).length).toBe(2);
  });
});
