// `includeHidden` and `allTextContents` throughout: the catalogue is fifteen
// collapsed <details> rows and the installer shows one skill at a time, so most
// copy buttons are legitimately outside the accessibility tree on load. Content
// that is merely collapsed still counts; content that is gone does not.
import { expect, test } from "@playwright/test";
import {
  ALL_INSTALL_LINES,
  MARKETPLACE_CMD,
  TOTAL_SKILLS,
} from "../components/lib/skills";

/*
  THE CONTRACT: each per-skill command appears exactly once per surface, and there
  are exactly two surfaces — the catalogue (#skills) and the installer (#install).

  This replaces "at most once page-wide", which round 5 broke deliberately. The
  original defect was "thirty copy buttons for fourteen commands": one list of
  commands rendered twice with nothing to tell the two apart. The installer now
  cycles all fifteen on purpose — you read about a skill in the catalogue and you
  install it from the installer — so the page-wide count is two per command again,
  and the number alone no longer distinguishes the defect from the design.

  What distinguishes it is per-surface uniqueness, which is what this now asserts.
  It still fails loudly if either surface prints a command twice, and it still
  fails if a THIRD place starts printing commands — which is what "the duplication
  is back" would actually look like.
*/

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

  test("prints each install command exactly once per surface", async ({
    page,
  }) => {
    await page.goto("/");

    const catalogue = page.locator("#skills");
    const installer = page.locator("#install");

    for (const cmd of ALL_INSTALL_LINES) {
      await expect(
        catalogue.getByRole("button", {
          name: `Copy: ${cmd}`,
          includeHidden: true,
        }),
        `one copy button for "${cmd}" in the catalogue`,
      ).toHaveCount(1);
      await expect(
        installer.getByRole("button", {
          name: `Copy: ${cmd}`,
          includeHidden: true,
        }),
        `one copy button for "${cmd}" in the installer`,
      ).toHaveCount(1);
    }

    // Page-wide budget, derived: every skill twice (catalogue + installer),
    // plus the marketplace command in the hero and again in the installer.
    await expect(
      page.getByRole("button", { name: /^Copy: /, includeHidden: true }),
    ).toHaveCount(TOTAL_SKILLS * 2 + 2);

    // textContent, not innerText: collapsed rows and non-current slides both
    // have text innerText will not return.
    const printed = (await page.locator("code").allTextContents()).map((t) =>
      t.trim(),
    );
    for (const cmd of ALL_INSTALL_LINES) {
      expect(
        printed.filter((t) => t === cmd).length,
        `"${cmd}" printed on more than its two surfaces`,
      ).toBe(2);
    }
    expect(printed.filter((t) => t === MARKETPLACE_CMD).length).toBe(2);
  });});
