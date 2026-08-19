import { defineConfig } from "vitest/config";

// Kept separate from vite.config.ts so the PWA plugin / service worker does not
// run during unit tests. The engine logic under test is DOM-free (pure derivation).
export default defineConfig({
  test: {
    environment: "node",
    include: ["src/**/*.test.ts"],

    /*
      THE DEFAULT TIMEOUTS ARE TOO TIGHT FOR THIS PROJECT, AND WHEN THEY BITE
      THEY LOOK LIKE A BUG IN THE CODE RATHER THAN A BUG IN THE CLOCK.

      Four runs of the suite on a developer machine failed four different ways,
      every one of them a timeout and not an assertion: `CrowdLines` and
      `shareCardLocalized` on the 10s hook, `chartsLocalized`, `SetupView` and
      `scrubCapability` on the 5s test. The last is the tell, because it is a
      loop of 101 iterations over a pure function with no I/O in it at all. A
      test like that does not become slow; the machine around it does.

      What makes it slow is the thing this project cannot give up: nine
      dictionaries of about 6,500 lines each, which several test files load in
      a `beforeAll`, transformed per worker with the workers competing. Cold,
      on Windows, that is comfortably past ten seconds.

      WHY THIS IS NOT PAPERING OVER A HANG. A timeout exists to stop a test
      waiting forever on something that will never arrive. Every one of these
      arrives, just late, and the same suite passes in isolation and in CI in
      27 seconds. Raising the ceiling changes which runs are believable, not
      which code is correct.

      AND WHY IT MATTERS MORE THAN A RE-RUN. A hook that times out does not
      fail the file's tests, it SKIPS them: six of `CrowdLines`' tests, twenty
      across one run, reported as "2167 passed | 6 skipped" beside a green
      count. The run exits non-zero so CI is safe, but a person glancing at
      that line reads it as a pass, and this project's entire safety argument
      is that a person reads the guards. A suite that intermittently declines
      to run part of itself, quietly, teaches everyone to re-run instead of to
      look, which is the most expensive habit a repo like this one can acquire.
    */
    testTimeout: 30_000,
    hookTimeout: 60_000,
  },
});
