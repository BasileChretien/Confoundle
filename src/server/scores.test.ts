import { describe, it, expect } from "vitest";
import {
  addScore,
  histogramKey,
  isValidSlug,
  parseHistogram,
  percentileOf,
  readSubmission,
} from "./scores";
import { MIN_SCORE, MAX_SCORE } from "./scoreBounds";

/**
 * The percentile has to be a claim about people who played the same card.
 *
 * It bucketed by calendar day, so "you beat 63% of players today" compared a
 * score earned on one puzzle against scores earned on others, with the wager
 * paying differently on each. The friends board carried the identical defect,
 * keyed on days since launch, and was fixed one component away on the same
 * screen. These tests are the guard that the denominator stays the card.
 */
describe("the score histogram", () => {
  it("keys on the puzzle, never on a date", () => {
    expect(histogramKey("kidney-stones")).toBe("puzzle:kidney-stones");
    // A numeric key is what the old scheme wrote. Nothing may produce one.
    expect(histogramKey("kidney-stones")).not.toMatch(/^day:/);
  });

  it("accepts a registry-shaped slug and refuses anything else", () => {
    expect(isValidSlug("kidney-stones")).toBe(true);
    expect(isValidSlug("a")).toBe(true);
    expect(isValidSlug("-leading-dash")).toBe(false);
    expect(isValidSlug("Upper")).toBe(false);
    expect(isValidSlug("has space")).toBe(false);
    expect(isValidSlug("../escape")).toBe(false);
    expect(isValidSlug("")).toBe(false);
    expect(isValidSlug(20657)).toBe(false);
    expect(isValidSlug("x".repeat(65))).toBe(false);
  });

  it("counts a score into its own bucket without mutating the input", () => {
    const before = { "40": 2 };
    const after = addScore(before, 40);
    expect(after).toEqual({ "40": 3 });
    expect(before).toEqual({ "40": 2 });
    expect(addScore(before, -20)).toEqual({ "40": 2, "-20": 1 });
  });

  it("says nothing rather than something about a population of one", () => {
    // The player's own entry is the only one. "You beat 0% of players" would
    // be a claim about a population of one, on a deck about exactly that.
    expect(percentileOf({ "40": 1 }, 40)).toEqual({ percentile: null, n: 1 });
  });

  it("ranks strictly below, so ties do not flatter", () => {
    const h = { "10": 1, "20": 2, "30": 1 };
    // Four entries; two are strictly below 30.
    expect(percentileOf(h, 30)).toEqual({ percentile: 75, n: 4 });
    // Against the tied bucket itself: only the single 10 is below.
    expect(percentileOf(h, 20)).toEqual({ percentile: 25, n: 4 });
    expect(percentileOf(h, 10)).toEqual({ percentile: 0, n: 4 });
  });

  it("treats an unusable stored value as an empty histogram", () => {
    // A throw here would cost the request; an empty histogram costs one
    // comparison and the caller already renders nothing for that.
    expect(parseHistogram(null)).toEqual({});
    expect(parseHistogram("{ not json")).toEqual({});
    expect(parseHistogram("[1,2,3]")).toEqual({});
    expect(parseHistogram("null")).toEqual({});
    expect(parseHistogram('{"40":"lots"}')).toEqual({});
    expect(parseHistogram('{"40":-3}')).toEqual({});
    expect(parseHistogram('{"40":2,"20":1}')).toEqual({ "40": 2, "20": 1 });
  });
});

describe("what the endpoint will accept", () => {
  it("requires both a slug and a score inside the wager's bounds", () => {
    expect(readSubmission({ slug: "kidney-stones", score: 40 })).toEqual({
      slug: "kidney-stones",
      score: 40,
    });
    expect(readSubmission({ slug: "kidney-stones", score: MIN_SCORE })).not.toBeNull();
    expect(readSubmission({ slug: "kidney-stones", score: MAX_SCORE })).not.toBeNull();
  });

  it("refuses a body that would write a key nobody can read back", () => {
    expect(readSubmission({ score: 40 })).toBeNull();
    expect(readSubmission({ slug: "kidney-stones" })).toBeNull();
    expect(readSubmission({ slug: "Bad Slug", score: 40 })).toBeNull();
    expect(readSubmission({ slug: "kidney-stones", score: MAX_SCORE + 1 })).toBeNull();
    expect(readSubmission({ slug: "kidney-stones", score: MIN_SCORE - 1 })).toBeNull();
    expect(readSubmission({ slug: "kidney-stones", score: "40" })).not.toBeNull();
    expect(readSubmission({ slug: "kidney-stones", score: NaN })).toBeNull();
    expect(readSubmission(null)).toBeNull();
    expect(readSubmission("nonsense")).toBeNull();
    // The old body shape, which must no longer be accepted: without a slug
    // there is no denominator, and silently taking it would restore the defect.
    expect(readSubmission({ day: 20657, score: 40 })).toBeNull();
  });
});
