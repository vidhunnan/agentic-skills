import { expect, test } from "@playwright/test";
import { SKILL_GROUPS, TOTAL_SKILLS } from "../components/lib/skills";

/*
  The filter, and the two regressions its ranker already survived once.

  "figma" is the one worth keeping forever: the word appears nowhere in any
  skill's name, description or question — its only occurrence in the whole
  dataset is the Design work group's note, "a Figma file shows the winner".
  Dropping group.note from the search keywords once made this query silently
  return nothing, and it was caught by testing the index rather than by reading
  the diff (design ADR 0005, Follow-up 2026-08-16).

  "chat" is the other: changelog-tracker contains c-h-a-t as a subsequence, so
  it outranks the real Chat skills unless the keywords band beats the fuzzy band.
*/
const CHAT_SKILLS = SKILL_GROUPS.flatMap((g) => g.skills).filter((s) =>
  s.surfaces.includes("Chat"),
);
const DESIGN_SKILLS =
  SKILL_GROUPS.find((g) => g.title === "Design work")?.skills ?? [];

const rows = (page: import("@playwright/test").Page) =>
  page.locator("#skills li:visible");

test.describe("catalogue filter", () => {
  test("shows every skill before anything is typed", async ({ page }) => {
    await page.goto("/");
    await expect(rows(page)).toHaveCount(TOTAL_SKILLS);
  });

  test("filters to the Design work group on 'design'", async ({ page }) => {
    await page.goto("/");
    await page.getByLabel("Filter skills").fill("design");
    // Six of the seven are named design-*; exploration-log matches via its
    // group. All seven must survive.
    for (const s of DESIGN_SKILLS) {
      await expect(
        page.locator("#skills li:visible").filter({ hasText: s.name }),
        `${s.name} survives "design"`,
      ).toHaveCount(1);
    }
  });

  test("'figma' finds the Design work group through its note", async ({
    page,
  }) => {
    await page.goto("/");
    await page.getByLabel("Filter skills").fill("figma");
    await expect(rows(page)).toHaveCount(DESIGN_SKILLS.length);
  });

  test("'chat' returns exactly the Chat-capable skills", async ({ page }) => {
    await page.goto("/");
    await page.getByLabel("Filter skills").fill("chat");
    await expect(rows(page)).toHaveCount(CHAT_SKILLS.length);
  });

  test("'code' returns all of them, because they all run on Code", async ({
    page,
  }) => {
    await page.goto("/");
    await page.getByLabel("Filter skills").fill("code");
    await expect(rows(page)).toHaveCount(TOTAL_SKILLS);
  });

  test("a miss empties the list without destroying it", async ({ page }) => {
    await page.goto("/");
    await page.getByLabel("Filter skills").fill("kubernetes");
    await expect(rows(page)).toHaveCount(0);
    // Hidden, not unmounted — the catalogue is still whole.
    await expect(page.locator("#skills li")).toHaveCount(TOTAL_SKILLS);
  });
});
