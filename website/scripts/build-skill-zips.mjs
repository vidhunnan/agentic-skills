/**
 * Build one .zip per Chat-capable skill, for upload to Claude.ai
 * (Settings → Customize → Skills).
 *
 * Runs as `prebuild`/`predev`, so Vercel picks it up from a plain `next build`
 * without any vercel.json change.
 *
 * ONLY Chat-capable skills get a zip. A Code-only skill uploaded to Claude.ai
 * would not do what its description says — offering the download would be a
 * claim the page cannot back.
 *
 * THE TRAP THIS GUARDS: every skill folder contains `.claude-plugin/plugin.json`,
 * and `.claude-plugin` is a dot-directory. A glob without `dot: true`, or a
 * shell `zip skills/x/*`, silently produces a one-file archive that looks
 * perfectly fine and is missing the plugin manifest. Every archive is asserted
 * to contain both entries and the build fails loudly if not.
 */
import { readdir, readFile, mkdir, writeFile, rm, stat } from "node:fs/promises";
import { join, relative } from "node:path";
import JSZip from "jszip";

const ROOT = join(import.meta.dirname, "..", "..");
const SKILLS = join(ROOT, "skills");
const OUT = join(import.meta.dirname, "..", "public", "skills");

/** Source of truth for which skills are Chat-capable. */
async function chatCapable() {
  const src = await readFile(
    join(import.meta.dirname, "..", "components", "lib", "skills.ts"),
    "utf8",
  );
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
    // withFileTypes lists dotfiles, which is the whole point — see the header.
    const full = join(dir, entry.name);
    if (entry.isDirectory()) out.push(...(await walk(full)));
    else if (entry.name !== ".DS_Store") out.push(full);
  }
  return out;
}

const names = await chatCapable();
await rm(OUT, { recursive: true, force: true });
await mkdir(OUT, { recursive: true });

let total = 0;
for (const name of names) {
  const dir = join(SKILLS, name);
  const files = await walk(dir);

  const zip = new JSZip();
  for (const file of files) {
    // Entries are prefixed with the folder name, so unzipping gives you the
    // skill folder rather than loose files.
    zip.file(join(name, relative(dir, file)), await readFile(file));
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

  const buf = await zip.generateAsync({ type: "nodebuffer", compression: "DEFLATE" });
  const dest = join(OUT, `${name}.zip`);
  await writeFile(dest, buf);
  total += (await stat(dest)).size;
}

console.log(
  `skill zips: ${names.length} written to public/skills (${(total / 1024).toFixed(1)} KB total)`,
);
