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

test("the hero specimen matches its source file word for word", async ({
  page,
}) => {
  const spec = SPECIMENS[0];

  // The display path is elided ("design/decisions/0002"), so resolve the file
  // from the href, which is the thing a reader would actually click.
  const path = spec.href.split("/blob/prod-stable/")[1];
  expect(path, "the specimen links to a repo file").toBeTruthy();

  const source = await readFile(join(process.cwd(), "..", path), "utf8");
  const quoted = norm(spec.lines.map((l) => l.text).join("\n"));

  expect(
    norm(source).includes(quoted),
    `the quote is no longer present in ${path} — re-quote it or drop the specimen`,
  ).toBe(true);

  await page.goto("/");
  const rendered = norm(await page.locator("#top pre").innerText());
  expect(rendered, "the card renders exactly what was quoted").toBe(quoted);
});
