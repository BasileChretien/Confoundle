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
import { MIN_ANSWERS_TO_SHOW } from "./answers";

/** A histogram with `n` entries, all scoring `at`, plus optional extras. */
const crowd = (n: number, at = 0, extra: Record<string, number> = {}) => ({
  [String(at)]: n,
  ...extra,
});

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

  it("uses the same floor as the answer tally, not a smaller one", () => {
    /*
      THE TEST THE PER-PUZZLE CHANGE MADE NECESSARY. The floor was `total > 1`,
      so a percentile could be published off two entries, and `answers.ts` names
      that exact case as why its own floor exists: two entries is the state in
      which an aggregate can describe an individual. At n=2 "you beat 0%" says
      precisely where one other play fell against yours.

      Day buckets pooled every card, so two entries was rare. Puzzle buckets sit
      there for a long time on a new card or a quiet locale, so the fix to the
      denominator is what made the old floor dangerous.
    */
    expect(percentileOf(crowd(1, 40), 40).percentile).toBeNull();
    expect(percentileOf(crowd(2, 40), 40).percentile).toBeNull();
    expect(
      percentileOf(crowd(MIN_ANSWERS_TO_SHOW - 1, 10), 40).percentile,
    ).toBeNull();
    // And it does report once the floor is reached, so the guard is not simply
    // switching the feature off.
    expect(percentileOf(crowd(MIN_ANSWERS_TO_SHOW, 10), 40)).toEqual({
      percentile: 100,
      n: MIN_ANSWERS_TO_SHOW,
    });
  });

  it("ranks strictly below, so ties do not flatter", () => {
    const h = { "10": 5, "20": 10, "30": 5 };
    // Twenty entries; five are strictly below 30... plus the ten at 20.
    expect(percentileOf(h, 30)).toEqual({ percentile: 75, n: 20 });
    // Against the tied bucket itself: only the five at 10 are below.
    expect(percentileOf(h, 20)).toEqual({ percentile: 25, n: 20 });
    expect(percentileOf(h, 10)).toEqual({ percentile: 0, n: 20 });
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
    // A bucket key that is not a score inflates the total while never counting
    // as below it, so the percentile it produces is silently too low.
    expect(parseHistogram('{"abc":5}')).toEqual({});
    expect(parseHistogram('{"1.5":5}')).toEqual({});
    expect(parseHistogram(`{"${MAX_SCORE + 1}":5}`)).toEqual({});
    expect(parseHistogram(`{"${MIN_SCORE - 1}":5}`)).toEqual({});
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
