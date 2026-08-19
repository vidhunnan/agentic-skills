import { createHash } from "node:crypto";
import { readdir, readFile } from "node:fs/promises";
import { join, relative } from "node:path";
import { expect, test } from "@playwright/test";
import { SKILL_GROUPS } from "../components/lib/skills";

/*
  The zips under public/skills/ are COMMITTED build output.

  They have to be: Vercel's Root Directory is website/, so skills/ is not on disk
  at build time — the first attempt at generating them there died with
  ENOENT /vercel/skills/repo-setup.

  Committed build output goes stale silently, which is the whole problem with it.
  This is the thing that stops that: it rehashes every skill folder and compares
  against the manifest written when the zips were built. Edit a SKILL.md without
  re-running the build and this fails.

  Fix by running: npm run prebuild
*/
// process.cwd() is website/ — Playwright's rootDir. import.meta is unavailable
// here because the specs are transpiled to CJS.
const SKILLS_DIR = join(process.cwd(), "..", "skills");
const MANIFEST = join(process.cwd(), "public", "skills", "manifest.json");

const CHAT_SKILLS = SKILL_GROUPS.flatMap((g) => g.skills)
  .filter((s) => s.surfaces.includes("Chat"))
  .map((s) => s.name);

async function walk(dir: string): Promise<string[]> {
  const out: string[] = [];
  for (const entry of await readdir(dir, { withFileTypes: true })) {
    const full = join(dir, entry.name);
    if (entry.isDirectory()) out.push(...(await walk(full)));
    else if (entry.name !== ".DS_Store") out.push(full);
  }
  return out;
}

async function hashSkill(name: string): Promise<string> {
  const dir = join(SKILLS_DIR, name);
  const files = (await walk(dir)).sort();
  const hash = createHash("sha256");
  for (const file of files) {
    hash.update(join(name, relative(dir, file))).update(await readFile(file));
  }
  return hash.digest("hex");
}

test.describe("committed skill zips", () => {
  test("cover exactly the Chat-capable skills", async () => {
    const manifest = JSON.parse(await readFile(MANIFEST, "utf8"));
    expect(Object.keys(manifest.skills).sort()).toEqual([...CHAT_SKILLS].sort());
  });

  test("are not stale — every skill hashes to what was zipped", async () => {
    const manifest = JSON.parse(await readFile(MANIFEST, "utf8"));
    for (const name of CHAT_SKILLS) {
      expect(
        await hashSkill(name),
        `${name} changed since its zip was built — run: npm run prebuild`,
      ).toBe(manifest.skills[name]);
    }
  });
});
