import { describe, it, expect, beforeEach, afterEach, vi } from "vitest";
import { createElement } from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { LocaleProvider } from "../app/i18n";
import { UI } from "../app/ui";
import { puzzles } from "../puzzles/all";
import { newProgress, type SkillProgress } from "../srs/schedule";
import { HomeView } from "./HomeView";

/**
 * The home screen offers the standing page only once there is a standing.
 *
 * WHAT THIS REPLACED. `ProgressPanel` rendered INLINE on this screen, and it
 * declined to render only when nothing at all had been learned. So the second
 * puzzle was met by eleven stacked data displays including a seventy-day
 * activity heatmap that was sixty-nine empty squares and a calibration table
 * with a single row. An empty progress panel is not neutral; it reads as a list
 * of things not done, and it frames the whole activity as assessment before the
 * player has read a sentence.
 *
 * The threshold is a judgement, not a measurement, so what is pinned here is
 * the SHAPE: nothing below it, something above it. If the number changes, this
 * file changes with it deliberately rather than by surprise.
 */

function memoryStorage() {
  const m = new Map<string, string>();
  return {
    getItem: (k: string) => m.get(k) ?? null,
    setItem: (k: string, v: string) => void m.set(k, String(v)),
    removeItem: (k: string) => void m.delete(k),
    clear: () => m.clear(),
  };
}

/** `n` enrolled skills, taken from the real registry so the ids are real. */
function progressFor(n: number): SkillProgress[] {
  return puzzles
    .slice(0, n)
    .map((p) => newProgress(p.reasoningSkill, Date.now()));
}

/** The same, but every skill overdue, so reviews are genuinely waiting. */
function dueProgressFor(n: number): SkillProgress[] {
  return progressFor(n).map((p) => ({ ...p, dueAt: Date.now() - 60_000 }));
}

function render(progress: SkillProgress[], dueCount = 0): string {
  return renderToStaticMarkup(
    createElement(LocaleProvider, {
      locale: "en",
      children: createElement(HomeView, {
        progress,
        dueCount,
        onOpenLesson: () => {},
        onStartReviews: () => {},
        onStartTrapHunt: () => {},
        onPractise: () => {},
        onOpenAbout: () => {},
        onOpenLessons: () => {},
        onOpenProgress: () => {},
        onStartRun: () => {},
      onStartDaily: () => {},
      }),
    }),
  );
}

function text(html: string): string {
  return html.replace(/<[^>]*>/g, " ").replace(/\s+/g, " ");
}

describe("the home screen", () => {
  beforeEach(() => vi.stubGlobal("localStorage", memoryStorage()));
  afterEach(() => vi.restoreAllMocks());

  it("renders at all, so the absences below mean something", () => {
    // Guards the rest of the file: a component that threw or rendered nothing
    // would satisfy every "does not contain" assertion here.
    expect(text(render(progressFor(6)))).toContain(UI.allLessons.en);
  });

  it("opens on the calibration run, not on what you owe", () => {
    /*
      The top slot used to carry "Reviews due: 3", which tells a returning
      player what they owe rather than offering them something to do. The run
      is the thing worth doing most days, so it takes the headline.
    */
    const out = text(render(dueProgressFor(6), 3));
    const run = out.indexOf("How sure are you?");
    const owed = out.indexOf(UI.reviewsBlurb.en);
    expect(run, "the calibration run is missing from home").toBeGreaterThan(-1);
    expect(owed, "the review card vanished instead of moving down").toBeGreaterThan(-1);
    expect(run).toBeLessThan(owed);
  });

  it("keeps the schedule reachable, with its count, directly below", () => {
    // Demoted, not deleted: the minority who want the ladder lose the top
    // slot and nothing else.
    const out = text(render(dueProgressFor(6), 3));
    expect(out).toContain(UI.reviewsDue.en);
    expect(out).toContain("3");
  });

  it("offers the run before anything has been learned too", () => {
    // A player one puzzle in still gets the mode as their headline.
    expect(text(render(progressFor(1)))).toContain("How sure are you?");
  });

  it("does not offer the standing page to somebody with two skills", () => {
    const out = text(render(progressFor(2)));
    expect(out).not.toContain(UI.progress.en);
  });

  it("offers it once there is a sample worth describing", () => {
    expect(text(render(progressFor(6)))).toContain(UI.progress.en);
  });

  it("never draws the panel's own displays inline, at any size", () => {
    /*
      The load-bearing one. The panel moved behind a tap, so none of its
      headings belong on this screen regardless of how much has been learned.
      Checked at a size well past the threshold, because the old code showed
      MORE of it the further along you were.
    */
    const out = text(render(progressFor(12)));
    /*
      `UI.calibration.en` is "Calibration", and the calibration run's entry
      point on this very screen is "Calibration run", so a substring probe on
      it now reports a collision rather than the panel. Dropped rather than
      loosened: the panel cannot render inline without also bringing the four
      below, so the guard still catches exactly what it was built to catch.
    */
    for (const heading of [
      UI.mastery.en,
      UI.weekAhead.en,
      UI.activityTitle.en,
      UI.nemesesTitle.en,
    ]) {
      expect(out, `"${heading}" is still inline on home`).not.toContain(heading);
    }
  });

  it("keeps the character and the practice action", () => {
    // Both were inside the panel and both are the exception to moving it: one
    // is a hook rather than a report, the other is an action.
    const out = text(render(progressFor(6)));
    expect(out).toContain(UI.confounderName.en);
    // The BLURB, not the label: the Confounder's own idle quip contains the
    // words "Practise anyway", so matching the label would pass on the quip
    // and prove nothing about the button.
    expect(out).toContain(UI.practiseBlurb.en);
  });

  it("hides the practice prompt when reviews are actually waiting", () => {
    /*
      THE FIXTURE IS THE TEST, and the first version of it was worthless.

      The prompt is gated on the SAME derivation the Confounder uses, not on
      the `dueCount` prop, so that the creature cannot say "nothing due just
      now, practise anyway" on a screen with reviews waiting. To catch a
      regression to prop-gating, the two must disagree ACROSS ZERO, because
      that is the only thing the gate branches on.

      This first passed `dueCount: 3` against six overdue skills. Both numbers
      were non-zero, so `=== 0` was false either way and the test passed
      against the very mutant it existed to catch. `dueCount: 0` with genuinely
      overdue progress is the discriminating case: prop-gated, the prompt would
      wrongly appear.
    */
    const out = text(render(dueProgressFor(6), 0));
    expect(out).not.toContain(UI.practiseBlurb.en);
  });
});
