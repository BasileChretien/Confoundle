import { describe, it, expect } from "vitest";
import { puzzles } from "../../puzzles";
import { canScrub } from "./DataViewRenderer";

/**
 * Which puzzles may be dragged, asked of every puzzle in the deck.
 *
 * THE TEST THAT WAS MISSING, and its absence is why a defect shipped past a
 * green suite. `rates` was added to a set of scrubbable TYPES, verified
 * against `kidney-stones`, and described as covering the 30 rates puzzles.
 * Exactly two of the 30 author the aggregate/stratified pair the code
 * assumed, and one of those runs the other way round. The other 28 are
 * stratified on both beats and differ only by which groups or strata each
 * view restricts, which the scrub had no way to honour: it drew the withheld
 * group at phase 0 and spoiled the setup before the reader touched anything.
 *
 * The lesson is not "rates was the wrong shape". It is that a capability
 * verified on ONE puzzle was asserted of THIRTY, and nothing walked the deck
 * to check. So this walks the deck.
 */

/** Narrowing through the filter, so the flag below is reachable on the type. */
type RatesPuzzle = (typeof puzzles)[number] & {
  setup: { data: { type: "rates"; strataAreSeparateSamples?: boolean } };
};
const RATES = puzzles.filter(
  (p): p is RatesPuzzle => p.setup.data.type === "rates",
);

const scrubs = (p: (typeof puzzles)[number]) =>
  canScrub(p.setup.data, p.setup.initialView, p.reveal.view);

describe("which puzzles can be dragged", () => {
  it("has a deck to walk, so the assertions below are not vacuous", () => {
    expect(puzzles.length).toBeGreaterThan(50);
    expect(RATES.length).toBeGreaterThan(20);
  });

  it("refuses any rates puzzle whose beats are not a pooled/split pair", () => {
    /*
      THE ONE THAT MATTERS. Two stratified views differ by which slice each
      draws, which is an arrival rather than a transformation, and drawing it
      as a cross-dissolve between a pooled layer and a split one shows the
      reader a pooled total the puzzle never authored.
    */
    for (const p of RATES) {
      const kinds = [p.setup.initialView.kind, p.reveal.view.kind].sort();
      const isPair = kinds.join("+") === "aggregate+stratified";
      expect(
        scrubs(p),
        `${p.slug} scrubs=${scrubs(p)} but its beats are ${kinds.join(" and ")}`,
      ).toBe(isPair && p.setup.data.strataAreSeparateSamples !== true);
    }
  });

  it("never pools two views of the same people", () => {
    /*
      `strataAreSeparateSamples` marks a puzzle whose strata are overlapping
      samples of one cohort, so summing them double counts. `aggregateRates`
      knows nothing of that flag, and a scrub is the only thing that would
      ever call it on such a puzzle.
    */
    for (const p of RATES) {
      if (p.setup.data.strataAreSeparateSamples !== true) continue;
      expect(scrubs(p), `${p.slug} would pool overlapping samples`).toBe(false);
    }
  });

  it("lets exactly the puzzles that can be drawn continuously be dragged", () => {
    // Named, so that a puzzle joining or leaving this list is a decision
    // somebody made rather than something that happened.
    const dragging = puzzles.filter(scrubs).map((p) => p.slug).sort();
    expect(dragging).toEqual(["kidney-stones", "relative-risk", "stage-migration"]);
  });

  it("refuses shapes whose two beats are unrelated drawings", () => {
    // `causal` is a scatter and then a node diagram; `ecological` changes the
    // unit of analysis, so a smooth path between its views teaches the
    // opposite of its lesson.
    for (const type of ["causal", "ecological"] as const) {
      for (const p of puzzles.filter((x) => x.setup.data.type === type)) {
        expect(scrubs(p), `${p.slug} should not scrub`).toBe(false);
      }
    }
  });
});
