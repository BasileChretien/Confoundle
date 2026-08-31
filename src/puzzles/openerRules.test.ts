import { describe, it, expect } from "vitest";
import { puzzles } from "./all";
import { getOpeningPuzzle, OPENING_SLUG } from "./index";

/**
 * The first puzzle a stranger ever sees, checked against the three properties
 * that made it the choice.
 *
 * The app now drops a first-time visitor straight into a puzzle instead of a
 * page of pitch, which makes the opener load-bearing in a way no other card
 * is: it is the only one whose reader has no idea yet what the app does, and
 * the only one that cannot be reached a second time for the first time.
 *
 * These are guards on a DELIBERATE decision rather than laws of the deck. If
 * the opener changes, this file should be read and argued with, not silenced.
 */

/**
 * How this deck phrases a refusal, taken from the deck itself rather than
 * imagined: the correct answer is one of these in eight puzzles, and nothing
 * else comes close to that wording.
 *
 * A TELL-LIST, NOT A PROOF, in the same spirit as `hedgeTells.test.ts`, and it
 * is meant to grow. A new way of writing "you cannot tell from this" belongs
 * here the moment somebody writes one.
 */
const REFUSAL_TELLS = [
  "no way to tell",
  "neither yet",
  "cannot tell",
  "can't tell",
  "not enough to say",
  "impossible to say",
];

describe("the opening puzzle", () => {
  const opener = getOpeningPuzzle();

  it("is the puzzle it says it is, not the fallback", () => {
    // `getOpeningPuzzle` falls back to the first registry entry rather than
    // throwing, so without this the whole file could be quietly asserting
    // things about the wrong card.
    expect(opener.slug).toBe(OPENING_SLUG);
  });

  it("answers with a position, not a refusal", () => {
    /*
      THE ONE THAT MATTERS. Opening on a puzzle whose correct answer is "there
      is no way to tell" means a stranger's first act is to commit, stake their
      confidence, and be told that every concrete answer was wrong. Correct by
      the hedge rule, and it reads as a trick.
    */
    const correct = opener.choices.find((c) => c.isCorrect);
    expect(correct, "the opener has no correct answer at all").toBeDefined();
    const label = correct!.label.en.toLowerCase();
    for (const tell of REFUSAL_TELLS) {
      expect(
        label,
        `the opener's correct answer is a refusal: "${correct!.label.en}"`,
      ).not.toContain(tell);
    }
  });

  it("is the gentlest card in the deck", () => {
    expect(opener.difficulty).toBe("easy");
  });

  it("actually changes its figure between the two beats", () => {
    /*
      An opener whose chart looks the same before and after would teach a
      newcomer that the reveal is a paragraph, which is the opposite of the
      thing the app is for.
    */
    expect(opener.setup.initialView.kind).not.toBe(opener.reveal.view.kind);
  });

  it("draws on data the deck already validated", () => {
    // Registry membership, so the opener cannot drift out of the deck while
    // still being pointed at.
    expect(puzzles.some((p) => p.slug === OPENING_SLUG)).toBe(true);
  });
});
