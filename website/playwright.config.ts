import { defineConfig, devices } from "@playwright/test";

/**
 * End-to-end tests for the agentic-skills landing page.
 *
 * The site is a single statically-exported Next.js page with two bits of
 * client JS (a clipboard button and an IntersectionObserver reveal). What can
 * actually break here is content drift, a responsive breakpoint that hides
 * something, and duplicated install commands — so that is what these test.
 *
 * Browsers: Chromium at desktop width and Pixel 5, because the one real
 * regression risk on this page is layout at the 720px breakpoint. Firefox and
 * WebKit are dropped: nothing here is engine-specific (no polyfilled APIs, no
 * CSS beyond grid/flex, clipboard and IntersectionObserver are both feature-
 * detected in the components), and the download cost is not worth a third
 * engine re-asserting the same text.
 */
export default defineConfig({
  testDir: "./tests",
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,
  reporter: process.env.CI ? "list" : [["list"], ["html", { open: "never" }]],

  use: {
    baseURL: "http://localhost:3000",
    trace: "on-first-retry",
  },

  projects: [
    { name: "chromium", use: { ...devices["Desktop Chrome"] } },
    { name: "mobile-chrome", use: { ...devices["Pixel 5"] } },
  ],

  webServer: {
    command: "npm run dev",
    url: "http://localhost:3000",
    reuseExistingServer: !process.env.CI,
    timeout: 120_000,
  },
});
