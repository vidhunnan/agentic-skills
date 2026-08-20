import { expect, test } from "@playwright/test";
import { SPECIMENS } from "../components/lib/skills";

/*
  The only spec that opts out of the suite's reduced-motion default, because it
  is the only one testing the thing reduced motion turns off.

  What this guards is not "does a timer fire" — it is the set of brakes that had
  to come with putting a timer back on this page at all: it holds when the pointer
  or focus is on it, it holds when nobody is looking, it stops for good once the
  reader steers it themselves, and it never runs at all for someone who asked for
  less motion.

  There is no pause control; it was removed at the owner's request. These brakes
  are therefore the whole of it.
*/
test.use({ contextOptions: { reducedMotion: "no-preference" } });

const DWELL = 6500;
const counter = (page: import("@playwright/test").Page) =>
  page.locator("#top").getByText(/^\d+ of \d+$/);

test.describe("the specimen advances on its own", () => {
  test("moves to the next record after the dwell", async ({ page }) => {
    await page.goto("/");
    await page.locator("#top pre").first().scrollIntoViewIfNeeded();
    await expect(counter(page)).toHaveText(`1 of ${SPECIMENS.length}`);
    await expect(counter(page)).toHaveText(`2 of ${SPECIMENS.length}`, {
      timeout: DWELL * 2,
    });
  });

  test("holds while the pointer is over it", async ({ page }) => {
    await page.goto("/");
    await page.locator("#top pre").first().scrollIntoViewIfNeeded();
    await page.locator("#top pre").first().hover();
    await page.waitForTimeout(DWELL * 1.4);
    await expect(
      counter(page),
      "hovering the card holds the timer",
    ).toHaveText(`1 of ${SPECIMENS.length}`);
  });

  test("a manual press stops it for good", async ({ page }) => {
    await page.goto("/");
    await page.locator("#top pre").first().scrollIntoViewIfNeeded();
    await page.getByRole("button", { name: "Next record" }).click();
    await expect(counter(page)).toHaveText(`2 of ${SPECIMENS.length}`);

    await page.waitForTimeout(DWELL * 1.4);
    await expect(
      counter(page),
      "choosing a record means the timer does not take it away",
    ).toHaveText(`2 of ${SPECIMENS.length}`);
  });

  test("leaving the section and returning starts it again", async ({ page }) => {
    await page.goto("/");
    await page.locator("#top pre").first().scrollIntoViewIfNeeded();
    await page.getByRole("button", { name: "Next record" }).click();
    await expect(counter(page)).toHaveText(`2 of ${SPECIMENS.length}`);

    // Out of view clears the sticky stop; coming back resumes.
    await page.locator("#install").scrollIntoViewIfNeeded();
    await page.waitForTimeout(400);
    await page.locator("#top").scrollIntoViewIfNeeded();
    await page.mouse.move(0, 0);

    await expect(counter(page), "the timer resumed on return").toHaveText(
      `3 of ${SPECIMENS.length}`,
      { timeout: DWELL * 2 },
    );
  });
});

test.describe("reduced motion", () => {
  test.use({ contextOptions: { reducedMotion: "reduce" } });

  test("never advances", async ({ page }) => {
    await page.goto("/");
    await page.locator("#top pre").first().scrollIntoViewIfNeeded();
    await page.waitForTimeout(DWELL * 1.4);
    await expect(counter(page)).toHaveText(`1 of ${SPECIMENS.length}`);
  });
});
