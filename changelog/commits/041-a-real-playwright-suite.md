# test(website): a real Playwright suite, replacing the init scaffold

- **Commit:** `670c2a9e354a0da5bc527b8ec585238cabda4efc` (`670c2a9`)
- **Author:** Vidhunnan Murugan
- **Date:** 2026-08-19

## Commit message

`npx playwright init` left the stock example pointing at playwright.dev. This is
five specs that assert things about this site, across chromium and Pixel 5.

The one worth knowing about is tests/matrix-mobile.spec.ts. Before the rebuild,
the stack section set its trust qualifiers to display:none below 720px — which
deleted the one thing the section existed to say, on the device most people would
read it on. The spec pins a 390px viewport and asserts every question, qualifier,
added-by value and the stacked "today:"/"adds:" labels are present, using
useInnerText so a re-introduced display:none fails rather than ships. It was
checked against the actual bug: injecting the old rule makes it fail.

The catalogue spec derives its count from SKILL_GROUPS rather than hardcoding
fourteen, so it guards CLAUDE.md's step 6 — adding a skill without registering it
in the site's data is the touchpoint that has historically been missed.

Firefox and WebKit dropped: one static route whose only client JS is
IntersectionObserver and navigator.clipboard, both already feature-detected. Three
engines asserting identical text is cost without coverage.

## Corrections to the commit message

Two statements in the message above do not match the diff, and one is not checkable
from the record. The message is in the git log permanently and cannot be edited, so
the corrections are recorded here. Everything else in it was verified and holds.

**1. "Replacing the init scaffold" — nothing was replaced, because nothing was there.**

There is no deletion anywhere in this commit. `tests/example.spec.ts` and
`tests-examples/` are not removed because **they were never committed**. The stock
`npx playwright init` example pointing at playwright.dev is a fact about the working
tree at the time, not about the history; the diff can neither confirm nor contradict
it. The commit is purely additive.

**2. "Five specs" — five `test()` blocks, across three spec files.**

Three in `home.spec.ts`, one in `matrix-mobile.spec.ts`, one in
`skills-catalog.spec.ts`. Read as "five files" the count is wrong; read as "five test
cases" it is right. Times the two browser projects, that is the 10 runs commit
`467dc5b` reports as *"10/10 tests"*.

**3. "It was checked against the actual bug: injecting the old rule makes it fail" —
not verifiable from the record.**

No fixture, no failing-run artifact and no trace of the injected rule is committed. If
the check was performed it was performed in the working tree. Recorded as
unverifiable, neither asserted nor denied.

## Changes in detail

**The repo gets its first test runner.** Until this commit the only quality gates were
`next build` and `tsc --noEmit` — both of which pass on a page that renders the wrong
thing. `npm test` now exists.

### `website/playwright.config.ts` (new, 42 lines)

- Two projects — `chromium` on Desktop Chrome and `mobile-chrome` on Pixel 5 — a
  `webServer` block running `npm run dev` against `localhost:3000`, `fullyParallel`, and
  CI-conditional `forbidOnly`, `retries: 2`, `workers: 1` and reporter.
- The file states the Firefox/WebKit argument in its own header, and states it as a
  claim about this page specifically: *"nothing here is engine-specific (no polyfilled
  APIs, no CSS beyond grid/flex, clipboard and IntersectionObserver are both
  feature-detected in the components)"*. Pixel 5 is there for one reason — *"the one real
  regression risk on this page is layout at the 720px breakpoint."*

### `website/tests/matrix-mobile.spec.ts` (new, 48 lines)

- Headed **`REGRESSION GUARD — do not weaken.`** It pins `viewport: { width: 390, height:
  844 }`, asserts `#written li` has exactly `MATRIX.length` rows, and for every row
  asserts the question, the `answeredToday` qualifier, the `addedBy` value, and both the
  `today:` and `adds:` stacked labels.
- Every assertion passes `useInnerText: true`, which is the mechanism the guard rests
  on: `display: none` text does not count toward inner text, so re-introducing the old
  rule fails the assertion rather than passing it silently.
- The defect it guards is the one entry 037 recorded as fixed by construction — the
  pre-rebuild stack section hid its trust qualifiers below 720px, *"deleting the point of
  the table while leaving it looking fine."*

### `website/tests/skills-catalog.spec.ts` (new, 34 lines)

- Imports `SKILL_GROUPS` and `TOTAL_SKILLS` from the site's own data and asserts the
  catalogue renders exactly `TOTAL_SKILLS` copy buttons matching `/^Copy: \/plugin
  install /`, then walks every group and every skill asserting one copy button for its
  `install` string and one exact-text match for its `name`.
- Nothing is hardcoded to fourteen. The file states what it is really guarding: *"the
  repo's convention is that adding a skill means adding it there too — the step that
  historically got missed"* (CLAUDE.md's step 6).

### `website/tests/home.spec.ts` (new, 78 lines)

- Three cases: the title and hero heading, **no console errors or uncaught page errors**,
  and *"offers each install command exactly once"* — the duplication defect the rebuild
  fixed, now asserted rather than trusted. It scrolls the whole page so every
  `IntersectionObserver`-driven `Reveal` runs before asserting.

### `website/package.json` (modified)

- Adds `test: playwright test` and `test:ui: playwright test --ui`, and
  `@playwright/test@^1.62.1` as a devDependency.
- Unmentioned in the commit message: the `description` field's `\u2014`
  escape sequence is replaced with a literal em dash. No text change, only the encoding.

### `.gitignore` and `website/.gitignore` (modified, new)

- The repo-root ignore gains `.playwright-mcp/` — Playwright MCP scratch output. A new
  `website/.gitignore` adds the seven Playwright paths (`test-results/`,
  `playwright-report/`, `blob-report/`, `playwright/.cache/`, `playwright/.auth/`, plus
  `node_modules/`).

### `website/package-lock.json` (modified, +63)

- The lockfile entries for `@playwright/test` and `playwright-core`.

## Files changed

```
 .gitignore                           |  3 +++
 website/.gitignore                   |  7 +++++++
 website/package-lock.json            | 63 +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
 website/package.json                 |  7 +++++--
 website/playwright.config.ts         | 42 ++++++++++++++++++++++++++++++++++++++++++
 website/tests/home.spec.ts           | 78 ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
 website/tests/matrix-mobile.spec.ts  | 48 ++++++++++++++++++++++++++++++++++++++++++++++++
 website/tests/skills-catalog.spec.ts | 34 ++++++++++++++++++++++++++++++++++
 8 files changed, 280 insertions(+), 2 deletions(-)
```

---

_Generated by `/changelog-tracker` from `git log -1` and `git show --stat`. Every
fact here comes from git: **faithful, not generative.**_
