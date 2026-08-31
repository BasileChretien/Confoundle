import { describe, it, expect } from "vitest";
import { createElement } from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { LocaleProvider } from "../app/i18n";
import { puzzles } from "../puzzles/all";
import type { Puzzle } from "../puzzles/schema";
import { SetupView } from "./SetupView";

/**
 * ONE THING IS PINNED TO THE FOOT OF THE SCREEN, AND IT IS THE ASK.
 *
 * The commit bar used to be `sticky bottom-0` with the question, all four
 * answers and the confidence row inside it. Answers on this deck are written as
 * whole sentences, so on a 375x812 phone that bar measured 626px against a
 * viewport of 812: a 77% bar, leaving 188px to read a 229-word setup and a
 * 384px figure through. The figure could not be shown entire at any scroll
 * position, on a deck whose entire method is that the setup and the reveal are
 * two views of one figure. Measured after the change, same puzzle and viewport:
 * 715px. The lightest puzzle in the deck went from 542 to 763.
 *
 * This is a layout property and a test cannot see layout. What it can see is
 * the thing that caused it, which is how many elements claim the foot of the
 * screen, so that is what it counts. Anything pinned there is subtracted from
 * every word and every figure a player reads before answering, so the count is
 * one and the one is the question.
 *
 * IT COUNTED ONLY `sticky` AT FIRST, AND THAT WAS THE OLD MISTAKE AGAIN. A
 * review reintroduced the exact defect using `fixed bottom-0` instead, pinning
 * all four answers to the foot of the screen, and every assertion here passed.
 * The name promised a guarded behaviour while the body matched one spelling of
 * one utility class: the same shape as the scans this repo has already been
 * bitten by, where the glob was narrower than the docstring. It now looks for
 * either positioning scheme, written as a class or as an inline style, and the
 * matcher proves it fires before the counts are believed.
 *
 * IT RUNS OVER EVERY PUZZLE rather than two chosen by hand, because the
 * question is authored per puzzle and the longest is not the puzzle with the
 * longest setup. `back-where-it-started` is the worst by the bar this removed;
 * `what-everyone-thinks` carries the tallest strip left behind. Choosing
 * examples by hand is how a test ends up describing the case its author
 * happened to open.
 */

/** Every element that takes itself out of flow and pins to the viewport. */
function pinnedCount(html: string): number {
  const classes = [...html.matchAll(/class="([^"]*)"/g)].map((m) => m[1]!);
  const byClass = classes.filter((c) =>
    c.split(/\s+/).some((token) => token === "sticky" || token === "fixed"),
  ).length;
  const byStyle = [...html.matchAll(/style="[^"]*position:\s*(?:sticky|fixed)/g)]
    .length;
  return byClass + byStyle;
}

/** React escapes these on the way out, so an expectation has to as well. */
function escape(s: string): string {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#x27;");
}

describe("the setup beat", () => {
  const render = (puzzle: Puzzle, locale = "en"): string =>
    renderToStaticMarkup(
      createElement(LocaleProvider, {
        locale,
        children: createElement(SetupView, { puzzle, onCommit: () => {} }),
      }),
    );

  it("catches every way of pinning something, not one spelling", () => {
    // The guard on the guard. A matcher that has stopped matching reports a
    // clean deck, which is the failure this whole file is written against.
    expect(pinnedCount('<div class="sticky bottom-0">')).toBe(1);
    expect(pinnedCount('<div class="fixed bottom-0 z-20">')).toBe(1);
    expect(pinnedCount('<div style="position:fixed;bottom:0">')).toBe(1);
    expect(pinnedCount('<div style="position: sticky">')).toBe(1);
    expect(pinnedCount('<div class="flex flex-col gap-2">')).toBe(0);
    // A word that merely contains one of the tokens is not a position.
    expect(pinnedCount('<div class="max-w-fixed stickyish">')).toBe(0);
  });

  it.each(puzzles.map((p) => [p.slug, p] as const))(
    "%s pins exactly one element, and it is the question",
    (_slug, puzzle) => {
      const html = render(puzzle);
      expect(pinnedCount(html)).toBe(1);
      // A `<p>` cannot hold the answer buttons, so proving the pinned element
      // is this paragraph proves they are not pinned with it. Read by index
      // rather than by a regex built from a template literal, where a word
      // boundary is a backspace character and the pattern matches nothing
      // while looking exactly right.
      const open = html.indexOf('<p class="sticky');
      expect(open).toBeGreaterThan(-1);
      const shown = html.slice(
        html.indexOf(">", open) + 1,
        html.indexOf("</p>", open),
      );
      expect(shown).toBe(escape(puzzle.setup.question.en));
    },
  );

  it("puts the answers after the question rather than around it", () => {
    for (const puzzle of puzzles) {
      const html = render(puzzle);
      const question = html.indexOf(escape(puzzle.setup.question.en));
      expect(question).toBeGreaterThan(-1);
      expect(html.indexOf("<button")).toBeGreaterThan(question);
    }
  });

  it("still renders the framing, the figure and every answer", () => {
    // The point was to stop the answers eating the screen, not to lose any of
    // the beat: a fix that quietly dropped a choice would pass the count above.
    for (const puzzle of puzzles) {
      const html = render(puzzle);
      expect(html).toContain(escape(puzzle.setup.headline.en));
      expect(html).toContain("<figure");
      expect(html.match(/<button/g)).toHaveLength(puzzle.choices.length);
    }
  });
});
