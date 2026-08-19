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

      At the stock ceilings this suite fails intermittently, and every failure
      is a TIMEOUT rather than an assertion: `CrowdLines` and
      `shareCardLocalized` on the 10s hook, `chartsLocalized`, `SetupView` and
      `scrubCapability` on the 5s test. How intermittently depends entirely on
      what else the machine is doing: about one run in seven on a quiet one,
      four out of four while another agent was running the same suite in the
      same checkout. That spread is the finding, not noise around it.

      WHAT MAKES THEM SLOW, measured rather than guessed. Nine dictionaries of
      6,700 to 6,900 lines, about 23 MB of TypeScript, which seven test files
      load in a `beforeAll`, RE-TRANSFORMED IN EVERY WORKER because each is
      isolated. On this 24-core box Vitest forks about 23 of them and they
      compete: aggregate transform 307s and test time 56s, against 52s and 26s
      for the same suite at `--maxWorkers=4`. Test execution alone more than
      halves when the workers are not fighting, which is the contention stated
      as a number.

      Not a cold-cache effect, and an earlier version of this note said it was:
      warm and `--no-cache` runs cost the same, because the transform is paid
      per worker per run either way.

      THE ROOT CAUSE IS THEREFORE UNTREATED HERE. This raises the ceiling; it
      does not lower the pressure. Two candidate treatments, both measured
      above as leads rather than proven: cap `maxWorkers` (costs about 10s of
      wall time and collapses the variance), or emit the dictionaries as JSON,
      which Vite parses far more cheaply than 3 MB of TypeScript. Either is a
      better fix than this one and neither is a reason to leave the ceilings
      where they were.

      WHY THIS IS NOT PAPERING OVER A HANG. A timeout exists to stop a test
      waiting forever on something that will never arrive. Every one of these
      arrives, just late, and the same suite passes in isolation and in CI in
      29 seconds. Raising the ceiling changes which runs are believable, not
      which code is correct. Note also that in a suite this synchronous a
      `testTimeout` catches less than it looks: a blocking loop runs to
      completion and only then reports, and an infinite one never reports at
      all, at any ceiling. What the ceiling actually governs here is a promise
      that never settles, and the suite has none.

      THE NUMBERS. 60s for hooks because the dictionary loads are the slow
      thing and CI's job has no `timeout-minutes`, so the six-hour default
      makes the 50s difference from the stock ceiling irrelevant. 30s for
      tests is generous, since the slowest test in the suite costs about 1s;
      it is set for headroom rather than for today, because `chartsLocalized`
      renders every puzzle in six locales and so grows with the deck.

      GLOBAL RATHER THAN PER-HOOK, deliberately. `beforeAll(fn, 60_000)` on
      the seven dictionary loaders is tighter and self-documenting, but it has
      to be remembered by whoever writes the eighth, and forgetting it
      reproduces the silent skip below. That is the same argument
      `declaredColors.test.ts` and `scopeLabels.test.ts` make for reading an
      enumeration off a runtime source: a guard maintained by hand is
      maintained by the person least likely to know it exists.

      AND WHY IT MATTERS MORE THAN A RE-RUN. A `beforeAll` that times out does
      not fail the file's tests, it SKIPS them: six of `CrowdLines`' tests,
      eight of `shareCardLocalized`'s, reported as "2167 passed | 6 skipped".
      (A `beforeEach` that times out fails them instead; the distinction is
      real and it is the `beforeAll` form that all seven of these use.) The run
      exits non-zero so CI is safe, and `Test Files 1 failed` does sit on the
      line above. But the count a person actually reads is green, and this
      project's entire safety argument is that a person reads the guards. A
      suite that intermittently declines to run part of itself, quietly,
      teaches everyone to re-run instead of to look, which is the most
      expensive habit a repo like this one can acquire.
    */
    testTimeout: 30_000,
    hookTimeout: 60_000,
  },
});
