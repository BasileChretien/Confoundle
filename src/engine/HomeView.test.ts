import { describe, it, expect, beforeEach, afterEach, vi } from "vitest";
import { createElement } from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { LocaleProvider } from "../app/i18n";
import { UI } from "../app/ui";
import { puzzles } from "../puzzles";
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
    for (const heading of [
      UI.mastery.en,
      UI.weekAhead.en,
      UI.activityTitle.en,
      UI.nemesesTitle.en,
      UI.calibration.en,
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
      Gated on the SAME derivation the Confounder uses, not on the `dueCount`
      prop. Splitting those was a real defect while writing this: the creature
      derives due-now from `progress`, so a prop-gated button could show
      "nothing is due, practise anyway" on a screen with three reviews waiting.
      Passing an inconsistent fixture here is what surfaced it.
    */
    const out = text(render(dueProgressFor(6), 3));
    expect(out).not.toContain(UI.practiseBlurb.en);
  });
});
