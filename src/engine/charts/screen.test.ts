import { describe, expect, it } from "vitest";
import { puzzles } from "../../puzzles";
import type { FrequenciesData } from "../../puzzles/schema";
import {
  canScreen,
  flips,
  mostAreReal,
  screenFrame,
  screenModel,
} from "./screen";

const baseRate = puzzles.find((p) => p.slug === "medical-test")!;
const data = baseRate.setup.data as FrequenciesData;

describe("what the screening mixer holds still", () => {
  /**
   * THE ENTIRE CLAIM. The two characteristics belong to the TEST, and the
   * reader is only choosing who to point it at. A toy whose sensitivity drifted
   * as the slider moved would be showing a different test at every position,
   * which is not the lesson and is not true of any test.
   */
  it("never moves the test's characteristics, whatever the base rate", () => {
    const model = screenModel(data);
    const before = { s: model.sensitivity, f: model.falsePositiveRate };
    for (let i = 0; i <= 10; i++) screenFrame(model, (i / 10) * model.total);
    expect(model.sensitivity).toEqual(before.s);
    expect(model.falsePositiveRate).toEqual(before.f);
  });

  /**
   * AND IT MUST REPRODUCE THE PUZZLE'S OWN PUBLISHED NUMBERS at the base rate
   * the puzzle authored, or it is modelling a different study.
   *
   * This is the analogue of the Simpson mixer's fixed stratum rates: the one
   * position on the slider where the figure is a measurement rather than a
   * what-if has to agree, to the person, with the counts the reveal prints.
   */
  it("reproduces the authored counts exactly at the authored base rate", () => {
    const model = screenModel(data);
    const frame = screenFrame(model, data.withCondition);
    expect(frame.withCondition).toBe(data.withCondition);
    expect(frame.truePositives).toBe(data.positiveGivenCondition);
    expect(frame.falsePositives).toBe(data.positiveGivenNoCondition);
  });

  /**
   * The reader can check the division on the page, so the page's own numbers
   * have to be the ones that divide. A share taken from the unrounded rates
   * would be more precise and would not match the counts beside it.
   */
  it("computes the share from the counts it draws", () => {
    const model = screenModel(data);
    for (const n of [1, 7, 100, 499, 500, 900]) {
      const f = screenFrame(model, n);
      expect(f.shareReal).toEqual(
        f.truePositives / (f.truePositives + f.falsePositives),
      );
    }
  });

  it("clamps rather than inventing people outside the population", () => {
    const model = screenModel(data);
    expect(screenFrame(model, -50).withCondition).toBe(0);
    expect(screenFrame(model, model.total + 50).withCondition).toBe(model.total);
  });
});

/**
 * A SHAPE TESTED AGAINST ONE PUZZLE IS TESTED AGAINST THAT PUZZLE'S
 * CONVENTIONS, and this one's are unusually forgiving.
 *
 * `medical-test` has a test that catches everybody it should: 1 case, 1 caught,
 * so its sensitivity is exactly 1. Every multiplication by it is therefore the
 * identity, and hardcoding `sensitivity: 1` in the model passed the entire
 * suite. Nothing was wrong with the code; the only puzzle available could not
 * tell the difference.
 *
 * That is the same hole `mixer.test.ts` covers with its lower-is-better table,
 * and it is filled the same way: a synthetic case whose numbers differ from the
 * shipped one's, asserted end to end so the value has to be read rather than
 * assumed.
 */
describe("a test that misses some of them", () => {
  const imperfect: FrequenciesData = {
    ...data,
    total: 1000,
    withCondition: 100,
    positiveGivenCondition: 80, // catches 80%
    positiveGivenNoCondition: 90, // fires on 10% of the 900 who are well
  };

  it("reads the sensitivity off the counts rather than assuming a perfect test", () => {
    const model = screenModel(imperfect);
    expect(model.sensitivity).toEqual(0.8);
    expect(model.falsePositiveRate).toEqual(0.1);
  });

  it("carries the missed cases through into the counts it draws", () => {
    const model = screenModel(imperfect);
    const frame = screenFrame(model, 100);
    // 80 of the 100 caught, and 10% of the remaining 900 flagged wrongly.
    expect(frame.truePositives).toBe(80);
    expect(frame.falsePositives).toBe(90);
    expect(frame.shareReal).toEqual(80 / 170);
    expect(mostAreReal(model, 100)).toBe(false);

    // Half the population, and the same test is now mostly right.
    const half = screenFrame(model, 500);
    expect(half.truePositives).toBe(400);
    expect(half.falsePositives).toBe(50);
    expect(mostAreReal(model, 500)).toBe(true);
  });
});

describe("the reversal the reader causes", () => {
  const model = screenModel(data);

  it("turns a mostly-wrong positive into a mostly-right one", () => {
    // The published figure: 1 in 1,000, and a positive is right about 2% of
    // the time. Test a population where half have it and the same test is
    // right about 95% of the time.
    expect(mostAreReal(model, 1)).toBe(false);
    expect(mostAreReal(model, model.total / 2)).toBe(true);
    expect(flips(model)).toBe(true);
  });

  it("moves the share monotonically, so the slider reads as one direction", () => {
    const shares = Array.from(
      { length: 21 },
      (_, i) => screenFrame(model, (i / 20) * model.total).shareReal ?? 0,
    );
    for (let i = 1; i < shares.length; i++) {
      expect(shares[i]!).toBeGreaterThanOrEqual(shares[i - 1]!);
    }
  });

  it("has no answer when nobody tests positive at all", () => {
    // A perfectly specific test on a population with none of the condition
    // produces no positives, and the share of nothing is not zero, it is
    // undefined. Printing 0% there would assert something about positives
    // that do not exist.
    const perfect = screenModel({
      ...data,
      withCondition: 10,
      positiveGivenCondition: 10,
      positiveGivenNoCondition: 0,
    });
    expect(screenFrame(perfect, 0).shareReal).toBeNull();
    expect(mostAreReal(perfect, 0)).toBeNull();
  });
});

describe("what it refuses", () => {
  const freq = (over: Partial<FrequenciesData>): FrequenciesData =>
    ({ ...data, ...over }) as FrequenciesData;

  /**
   * THE REFUSAL THAT NO ARITHMETIC COULD MAKE. `prosecutors-fallacy` is the
   * same shape, its share flips, and it is still nonsense to drag, because one
   * crime happened. It is refused because it does not opt in, and this asserts
   * that the shipped puzzle really does not.
   */
  it("refuses a frequencies puzzle that has not opted in", () => {
    const prosecutors = puzzles.find((p) => p.slug === "courtroom-odds")!;
    expect(prosecutors.setup.data.type).toBe("frequencies");
    expect(canScreen(prosecutors.setup.data)).toBe(false);
    expect(canScreen(freq({ baseRateCanVary: undefined }))).toBe(false);
  });

  it("accepts the puzzle that did opt in", () => {
    expect(canScreen(data)).toBe(true);
  });

  it("refuses a population with only one kind of person in it", () => {
    expect(canScreen(freq({ withCondition: 0 }))).toBe(false);
    expect(canScreen(freq({ withCondition: data.total }))).toBe(false);
  });

  it("refuses a test that catches nobody", () => {
    expect(canScreen(freq({ positiveGivenCondition: 0 }))).toBe(false);
  });

  /**
   * And a test whose answer never changes meaning. A perfect test is right at
   * every base rate, so the slider would move a number that always means the
   * same thing, and the caption could never fire.
   */
  it("refuses a test whose verdict never flips", () => {
    expect(
      canScreen(freq({ positiveGivenNoCondition: 0, baseRateCanVary: true })),
    ).toBe(false);
  });

  it("refuses a shape that is not a frequency table", () => {
    const kidney = puzzles.find((p) => p.slug === "kidney-stones")!;
    expect(canScreen(kidney.setup.data)).toBe(false);
  });
});
