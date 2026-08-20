import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { expect, test } from "@playwright/test";
import { SPECIMENS } from "../components/lib/skills";

/*
  The hero specimen must still be the file it claims to be.

  This is the page's load-bearing claim: "a real file in this repo". If the
  quote drifts from the source — a reworded ADR, a typo fixed in one place, a
  renderer that drops a line — the page becomes exactly the thing it argues
  against, and nothing else in the suite would notice.

  Whitespace is normalised before comparing, deliberately. The record is stored
  at the source's own ~80-column wraps so it can be grepped against the file,
  and the card reflows those into paragraphs, because in Markdown a single
  newline is not a line break. Words and markers must match; where the lines
  break must not.
*/
// Whitespace collapses, and so do blockquote markers. A ">" repeats on every
// line of a quote in the source as the BLOCK's marker; the card renders the
// block once, so the counts legitimately differ. Every other marker — ##, **,
// *(…)* — is inline and is compared as-is. What must match is the words.
const norm = (t: string) =>
  t
    .replace(/>/g, " ")
    .replace(/\s+/g, " ")
    .trim();

test("every specimen matches its source file word for word", async () => {
  expect(SPECIMENS.length, "the set is not empty").toBeGreaterThan(0);

  // Collect every failure rather than stopping at the first: if several have
  // drifted you want to see all of them, not fix one and rerun six times.
  const drifted: string[] = [];

  for (const spec of SPECIMENS) {
    // The display path is elided ("design/decisions/0007"), so resolve the file
    // from the href — the link a reader would actually click.
    const path = spec.href.split("/blob/prod-stable/")[1];
    expect(path, `${spec.source} links to a repo file`).toBeTruthy();

    const source = await readFile(join(process.cwd(), "..", path), "utf8");
    const quoted = norm(spec.lines.map((l) => l.text).join("\n"));

    if (!norm(source).includes(quoted)) drifted.push(`${spec.source} (${path})`);
  }

  expect(
    drifted,
    `these quotes are no longer present in their source files — re-quote or drop them:\n  ${drifted.join("\n  ")}`,
  ).toEqual([]);
});

test("the card renders the record it claims to", async ({ page }) => {
  await page.goto("/");

  const first = SPECIMENS[0];
  const rendered = norm(await page.locator("#top pre").first().innerText());
  expect(rendered, "the visible card is the first record").toBe(
    norm(first.lines.map((l) => l.text).join("\n")),
  );

  // Every record ships in the static export, not just the visible one.
  await expect(page.locator("#top pre")).toHaveCount(SPECIMENS.length);
});

test("stepping moves to the next record", async ({ page }) => {
  await page.goto("/");
  const count = page.locator("#top").getByText(/^\d+ of \d+$/);
  await expect(count).toHaveText(`1 of ${SPECIMENS.length}`);

  await page.getByRole("button", { name: "Next record" }).click();
  await expect(count).toHaveText(`2 of ${SPECIMENS.length}`);

  // Wraps rather than dead-ending.
  await page.getByRole("button", { name: "Previous record" }).click();
  await page.getByRole("button", { name: "Previous record" }).click();
  await expect(count).toHaveText(`${SPECIMENS.length} of ${SPECIMENS.length}`);
});
