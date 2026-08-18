import { describe, it, expect } from "vitest";
import { createElement } from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { LocaleProvider } from "../app/i18n";
import { puzzles } from "../puzzles";
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
 * two views of one figure.
 *
 * Measured after the change, on the same puzzle and the same viewport: 715px.
 * The lightest puzzle in the deck went from 542 to 763.
 *
 * This is a layout property and a test cannot see layout. What it can see is
 * the thing that caused it, which is how many elements claim the foot of the
 * screen, so that is what it counts. Anything pinned there is subtracted from
 * every word and every figure a player reads before answering, so the count is
 * one and the one is the question.
 */
describe("the setup beat", () => {
  const render = (puzzle: Puzzle, locale = "en"): string =>
    renderToStaticMarkup(
      createElement(LocaleProvider, {
        locale,
        children: createElement(SetupView, { puzzle, onCommit: () => {} }),
      }),
    );

  const heaviest = puzzles.find((p) => p.slug === "back-where-it-started")!;
  const lightest = puzzles.find((p) => p.slug === "kidney-stones")!;

  it.each([heaviest, lightest].map((p) => [p.slug, p] as const))(
    "%s pins exactly one element, and it is the question",
    (_slug, puzzle) => {
      const html = render(puzzle);
      const pinned = [...html.matchAll(/class="([^"]*\bsticky\b[^"]*)"/g)];
      expect(pinned).toHaveLength(1);
      // A `<p>` cannot hold the answer buttons, so proving the pinned element
      // is this paragraph proves they are not pinned with it. Read by index
      // rather than by a regex built from a template literal, where a word
      // boundary is a backspace character: the pattern then matches nothing
      // while looking exactly right.
      const open = html.indexOf('<p class="sticky');
      expect(open).toBeGreaterThan(-1);
      const shown = html.slice(html.indexOf('>', open) + 1, html.indexOf('</p>', open));
      expect(shown).toBe(escape(puzzle.setup.question.en));
    },
  );

  it("puts the answers after the question rather than around it", () => {
    const html = render(heaviest);
    const question = html.indexOf(escape(heaviest.setup.question.en));
    const firstButton = html.indexOf("<button");
    expect(question).toBeGreaterThan(-1);
    expect(firstButton).toBeGreaterThan(question);
  });

  it("still renders the framing, the figure and every answer", () => {
    // The point was to stop the answers eating the screen, not to lose any of
    // the beat: a fix that quietly dropped a choice would pass the count above.
    const html = render(heaviest);
    expect(html).toContain(escape(heaviest.setup.headline.en));
    expect(html).toContain("<figure");
    for (const choice of heaviest.choices) {
      expect(html).toContain(escape(choice.label.en));
    }
    expect(html.match(/<button/g)).toHaveLength(heaviest.choices.length);
  });
});

/** React escapes these on the way out, so an expectation has to as well. */
function escape(s: string): string {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#x27;");
}
