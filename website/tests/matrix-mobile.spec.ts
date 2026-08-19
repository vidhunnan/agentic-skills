import { expect, test } from "@playwright/test";
import { MATRIX } from "../components/lib/skills";

/**
 * REGRESSION GUARD — do not weaken.
 *
 * The design this page replaced set the matrix's trust qualifier (the "what
 * answers it today" column) to `display: none` below 720px. That column is the
 * entire argument of the section: it is what makes the redlined rows mean
 * "nothing answers this". Hiding it on a phone deleted the point of the table
 * while leaving it looking fine.
 *
 * The rebuild fixed it by construction — Matrix.module.css stacks the row at
 * <=720px and turns on the "today:" / "adds:" labels instead of hiding cells.
 * These assertions use `useInnerText`, which ignores `display: none` text, so
 * anything that hides that content again fails here rather than shipping.
 */
test.describe("matrix at a phone viewport", () => {
  // 390px is comfortably under the 720px breakpoint where the row stacks.
  test.use({ viewport: { width: 390, height: 844 } });

  test("keeps every question, qualifier and label visible", async ({
    page,
  }) => {
    await page.goto("/");

    const rows = page.locator("#written li");
    await expect(rows).toHaveCount(MATRIX.length);

    for (const entry of MATRIX) {
      const row = rows.filter({ hasText: entry.question });
      await expect(row, `row for "${entry.question}"`).toHaveCount(1);
      await row.scrollIntoViewIfNeeded();

      // useInnerText => display:none content does not count.
      await expect(row).toContainText(entry.question, { useInnerText: true });
      await expect(row).toContainText(entry.answeredToday, {
        useInnerText: true,
      });
      await expect(row).toContainText(entry.addedBy, { useInnerText: true });

      // The stacked layout drops the column heads, so each cell must carry
      // its own label — otherwise the qualifier is visible but unattributed.
      await expect(row).toContainText("today:", { useInnerText: true });
      await expect(row).toContainText("adds:", { useInnerText: true });
    }
  });
});
