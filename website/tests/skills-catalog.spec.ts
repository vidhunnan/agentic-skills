// Round 4 note on `includeHidden` and `allTextContents` below: the catalogue is
// now fifteen collapsed <details> rows and the install block steps one command at
// a time, so most copy buttons are legitimately outside the accessibility tree on
// load. The SELECTORS changed to see them; not one assertion did. If a count here
// ever needs lowering, that is content going missing, not a test needing a tweak.
import { expect, test } from "@playwright/test";
import { SKILL_GROUPS, TOTAL_SKILLS } from "../components/lib/skills";

/**
 * skills.ts is the site's single source of truth, and the repo's convention is
 * that adding a skill means adding it there too — the step that historically
 * got missed. This test reads the data rather than a hardcoded number, so the
 * page and the data can never silently disagree.
 */
test("renders one catalogue entry per skill in SKILL_GROUPS", async ({
  page,
}) => {
  await page.goto("/");

  const catalogue = page.locator("#skills");
  const entries = catalogue.getByRole("button", {
    includeHidden: true,
    name: /^Copy: \/plugin install /,
  });

  await expect(entries).toHaveCount(TOTAL_SKILLS);

  for (const group of SKILL_GROUPS) {
    for (const skill of group.skills) {
      await expect(
        catalogue.getByRole("button", {
          name: `Copy: ${skill.install}`,
          includeHidden: true,
        }),
        `catalogue entry for ${skill.name}`,
      ).toHaveCount(1);
      await expect(
        catalogue.getByText(skill.name, { exact: true }),
        `name printed for ${skill.name}`,
      ).toHaveCount(1);
    }
  }
});
