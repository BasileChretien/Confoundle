import { describe, it, expect } from "vitest";
import { createElement } from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { LocaleProvider } from "../app/i18n";
import { FriendsBoard } from "./FriendsBoard";

/**
 * The line a player pastes into a group chat names the card they played.
 *
 * It used to name the DAY: `session.puzzleNumber()` returned days since launch,
 * so everyone finishing any puzzle on the same date emitted the same number and
 * the board ranked their scores against each other. Score depends on which card
 * and what the player staked, so that was a ranking across different
 * denominators, which is the mistake this deck teaches against.
 *
 * The number now comes in as a prop from the beat that knows which puzzle it
 * is, and this is the test that the prop reaches the line. `registryOrder` pins
 * what the number means; this pins that the board uses the one it was handed.
 */
describe("the shared result line", () => {
  const render = (puzzleNo: number): string =>
    renderToStaticMarkup(
      createElement(LocaleProvider, {
        locale: "en",
        children: createElement(FriendsBoard, {
          puzzleNo,
          today: { caught: true, score: 36, streak: 5 },
        }),
      }),
    );

  it("carries the number it was given, not one it made up", () => {
    expect(render(7)).toContain("Confoundle #7");
    // A different card, a different line. A board keyed on something constant
    // would pass the assertion above and still group every puzzle together.
    expect(render(41)).toContain("Confoundle #41");
    expect(render(41)).not.toContain("Confoundle #7");
  });
});
