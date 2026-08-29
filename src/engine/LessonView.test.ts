import { describe, it, expect, beforeAll, afterAll, vi } from "vitest";
import { createElement } from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { LocaleProvider } from "../app/i18n";
import { puzzles } from "../puzzles/all";
import type { Puzzle } from "../puzzles/schema";
import { LessonView } from "./LessonView";

/**
 * YOU DO NOT EXPLAIN THE JOKE TO A ROOM THAT HAS ALREADY LAUGHED.
 *
 * Measured across the deck, the median reveal is 203 words and the median
 * lesson is 376, and the lesson is longer than the reveal in 71 of the 73
 * puzzles. So the longest, slowest, most explanatory beat in the app arrived
 * after the reversal had landed, in the exit path, ahead of the card the player
 * earned.
 *
 * `lesson.body` now sits inside the disclosure that already held `howItWorks`
 * and `examples`. Nothing is deleted and nothing is dumbed down: the reader who
 * wants all 654 words of `overdiagnosis` is one tap away, and the reader who
 * just laughed gets to leave on the laugh.
 *
 * The fold's condition had to grow to match, which is the part worth a test.
 * Every puzzle today also has `howItWorks` or an example, so the fold always
 * opens and nothing would have been lost. The schema makes all three optional,
 * so the first puzzle authored with a body alone would have had it silently
 * deleted by a change described as moving it.
 */
// `ShareLesson` builds its URL from `window.location.origin`, and the suite runs
// in the node environment. A minimal stub is enough: nothing here asserts on the
// link, only on where the body sits relative to the fold.
beforeAll(() =>
  vi.stubGlobal("window", { location: { origin: "https://confoundle.org" } }),
);
afterAll(() => vi.unstubAllGlobals());

function render(puzzle: Puzzle): string {
  return renderToStaticMarkup(
    createElement(LocaleProvider, {
      locale: "en",
      children: createElement(LessonView, {
        puzzle,
        onNext: () => {},
        onHome: () => {},
      }),
    }),
  );
}

/** React escapes on the way out, so an expectation has to as well. */
function esc(s: string): string {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#x27;");
}

const bodyOf = (p: Puzzle): string =>
  (p.lesson as { body?: { en: string } }).body?.en ?? "";

describe("the lesson beat", () => {
  it("keeps the body behind the fold on every puzzle in the deck", () => {
    for (const puzzle of puzzles) {
      const body = bodyOf(puzzle);
      if (!body) continue;
      const html = render(puzzle);
      const at = html.indexOf(esc(body).slice(0, 40));
      const fold = html.indexOf("<details");
      expect(at, `${puzzle.slug}: body missing entirely`).toBeGreaterThan(-1);
      expect(fold, `${puzzle.slug}: no fold rendered`).toBeGreaterThan(-1);
      expect(at, `${puzzle.slug}: body is in the exit path`).toBeGreaterThan(
        fold,
      );
    }
  });

  it("opens a fold for a body even when it is the only thing in one", () => {
    // The case no puzzle occupies today, and the one where moving the body
    // would otherwise have deleted it.
    const base = puzzles[0]!;
    const bodyOnly = {
      ...base,
      lesson: {
        ...base.lesson,
        body: { en: "The only deep-dive content this puzzle has." },
        howItWorks: undefined,
        examples: [],
      },
    } as Puzzle;
    const html = render(bodyOnly);
    expect(html).toContain("<details");
    expect(html).toContain("The only deep-dive content this puzzle has.");
  });

  it("still leads with the skill and the takeaway", () => {
    // The fix was to move the seminar, not to hide the lesson.
    const p = puzzles[0]!;
    const html = render(p);
    const skill = html.indexOf(esc(p.lesson.skillName.en));
    expect(skill).toBeGreaterThan(-1);
    expect(skill).toBeLessThan(html.indexOf("<details"));
  });
});
