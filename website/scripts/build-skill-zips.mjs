/**
 * Build one .zip per Chat-capable skill, for upload to Claude.ai
 * (Settings → Customize → Skills).
 *
 * THE DEPLOY CONSTRAINT: Vercel's Root Directory for this project is `website/`,
 * so at build time the process sees only that subtree — `skills/` is not on disk.
 * The first version of this script walked up two levels and died with
 * ENOENT /vercel/skills/repo-setup.
 *
 * So the zips are COMMITTED, and this script has two modes:
 *
 *   generate — repo root found (any local build). Rebuilds every zip from source
 *              and rewrites manifest.json.
 *   verify   — repo root absent (Vercel). Confirms the committed zips and their
 *              manifest are present and complete, and exits 0.
 *
 * Committed build output is a real cost: it can go stale silently. That is what
 * manifest.json and tests/skill-zips.spec.ts are for — the test rehashes the
 * skill sources and fails if they no longer match what was zipped.
 */
import { readdir, readFile, mkdir, writeFile, rm, stat, access } from "node:fs/promises";
import { join, relative } from "node:path";
import { createHash } from "node:crypto";
import JSZip from "jszip";

const HERE = import.meta.dirname;
const WEBSITE = join(HERE, "..");
const OUT = join(WEBSITE, "public", "skills");
const MANIFEST = join(OUT, "manifest.json");

const exists = async (p) => access(p).then(() => true).catch(() => false);

/** Source of truth for which skills are Chat-capable. */
async function chatCapable() {
  const src = await readFile(join(WEBSITE, "components", "lib", "skills.ts"), "utf8");
  const re = /name: "([a-z-]+)",[\s\S]*?surfaces: \[([^\]]+)\]/g;
  const names = [];
  let m;
  while ((m = re.exec(src))) if (m[2].includes("Chat")) names.push(m[1]);
  if (names.length === 0) throw new Error("parsed zero skills from skills.ts");
  return names;
}

async function walk(dir) {
  const out = [];
  for (const entry of await readdir(dir, { withFileTypes: true })) {
    // withFileTypes lists dotfiles, which is the point: .claude-plugin is a
    // dot-directory, and a glob that skips it yields a zip that looks fine and
    // is missing the plugin manifest.
    const full = join(dir, entry.name);
    if (entry.isDirectory()) out.push(...(await walk(full)));
    else if (entry.name !== ".DS_Store") out.push(full);
  }
  return out;
}

const names = await chatCapable();
const SKILLS = join(WEBSITE, "..", "skills");

if (!(await exists(SKILLS))) {
  // ── verify mode ─────────────────────────────────────────────────────────
  if (!(await exists(MANIFEST))) {
    throw new Error(
      `No skills/ directory and no committed manifest at ${MANIFEST}. ` +
        `The zips must be committed for a root-directory build to work.`,
    );
  }
  const manifest = JSON.parse(await readFile(MANIFEST, "utf8"));
  const missing = [];
  for (const name of names) {
    const zip = join(OUT, `${name}.zip`);
    if (!(await exists(zip))) missing.push(`${name}.zip`);
    else if (!manifest.skills?.[name]) missing.push(`${name} (absent from manifest)`);
  }
  if (missing.length) {
    throw new Error(`committed zips incomplete: ${missing.join(", ")}`);
  }
  console.log(
    `skill zips: verified ${names.length} committed archives (no skills/ dir — root-directory build)`,
  );
} else {
  // ── generate mode ───────────────────────────────────────────────────────
  await rm(OUT, { recursive: true, force: true });
  await mkdir(OUT, { recursive: true });

  const manifest = { generatedFrom: "skills/", skills: {} };
  let total = 0;

  for (const name of names) {
    const dir = join(SKILLS, name);
    const files = (await walk(dir)).sort();

    const zip = new JSZip();
    const hash = createHash("sha256");
    for (const file of files) {
      const buf = await readFile(file);
      const entry = join(name, relative(dir, file));
      zip.file(entry, buf);
      hash.update(entry).update(buf);
    }

    const entries = Object.keys(zip.files);
    const hasSkill = entries.some((e) => e.endsWith("SKILL.md"));
    const hasPlugin = entries.some((e) => e.endsWith(".claude-plugin/plugin.json"));
    if (!hasSkill || !hasPlugin) {
      throw new Error(
        `${name}.zip is incomplete — SKILL.md:${hasSkill} plugin.json:${hasPlugin}. ` +
          `Entries: ${entries.join(", ")}`,
      );
    }

    // Fixed date on every entry: JSZip stamps mtime by default, which would
    // make the bytes differ on every run and produce a diff in git for a file
    // whose contents did not change.
    const buf = await zip.generateAsync({
      type: "nodebuffer",
      compression: "DEFLATE",
      date: new Date("2020-01-01T00:00:00Z"),
    });
    await writeFile(join(OUT, `${name}.zip`), buf);
    manifest.skills[name] = hash.digest("hex");
    total += (await stat(join(OUT, `${name}.zip`))).size;
  }

  await writeFile(MANIFEST, JSON.stringify(manifest, null, 2) + "\n");
  console.log(
    `skill zips: generated ${names.length} archives (${(total / 1024).toFixed(1)} KB total)`,
  );
}
