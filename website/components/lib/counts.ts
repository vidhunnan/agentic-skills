import counts from "./counts.json";

/**
 * The five counts the page states about this repo.
 *
 * READ FROM A COMMITTED JSON, not from the filesystem. The previous version
 * walked the repo at build time, which works locally and fails on Vercel, where
 * the Root Directory is `website/` and the repo root is not on disk. It caught
 * the failure and returned 0 — and `decisions` is `files - 1`, so the deployed
 * page claimed "-1 decisions". A false number, shipped silently, on the page
 * whose own constraint is "no claim the page cannot source".
 *
 * `scripts/build-counts.mjs` regenerates this on every local build and refuses
 * to write a non-positive value. `tests/counts.spec.ts` fails if the committed
 * numbers no longer match the repo.
 */
export const COUNTS: {
  rules: number;
  decisions: number;
  designDecisions: number;
  commits: number;
  handoffs: number;
} = counts;
