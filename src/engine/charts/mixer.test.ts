import { describe, it, expect } from "vitest";
import {
  OPENING_MIX,
  betterInEveryStratum,
  canMix,
  leaderAt,
  mixerFrame,
  mixerModel,
  reversedAt,
  reverses,
} from "./mixer";
import { puzzles } from "../../puzzles/all";
import type { RatesData } from "../../puzzles/schema";

const kidneyStones = puzzles.find((p) => p.slug === "kidney-stones")!;
const data = kidneyStones.setup.data as RatesData;

describe("what the mixer holds still", () => {
  it("never moves a stratum rate, whatever the mix", () => {
    /*
      THE ENTIRE LESSON. Simpson's paradox is the pooled number moving while
      nothing underneath it does, so a mixer whose stratum rates drifted would
      be teaching the opposite of the thing it exists for.
    */
    const model = mixerModel(data);
    const before = model.groups.map((g) => [...g.byStratum]);
    for (let i = 0; i <= 10; i++) mixerFrame(model, i / 10);
    expect(model.groups.map((g) => [...g.byStratum])).toEqual(before);
  });

  it("lands exactly on the measured rate at both ends", () => {
    /*
      A CLAIM THIS TEST USED TO MAKE AND COULD NOT SUPPORT. It said `(1-t)*a +
      t*b` is exact at t=1 where `a + (b-a)*t` is not, and that the project had
      been caught by the difference. Review checked: for these numbers the two
      forms agree to the bit, and rewriting the implementation into the second
      form passed the whole suite.

      The assertion is still worth having, because what actually matters is
      that the ends of the slider show the MEASURED rate and not something a
      hair away from it. That is a statement about the output, which survives
      whatever algebra produces it, so it is written as one.
    */
    const model = mixerModel(data);
    const [aEasy, aHard] = model.groups[0]!.byStratum;
    expect(mixerFrame(model, 0)[0]).toEqual(aEasy);
    expect(mixerFrame(model, 1)[0]).toEqual(aHard);
  });

  it("clamps rather than extrapolating past the ends", () => {
    const model = mixerModel(data);
    expect(mixerFrame(model, -3)).toEqual(mixerFrame(model, 0));
    expect(mixerFrame(model, 9)).toEqual(mixerFrame(model, 1));
  });
});

describe("the reversal the reader causes", () => {
  const model = mixerModel(data);

  it("swaps the leader somewhere along the slider", () => {
    expect(reverses(model)).toBe(true);
    expect(leaderAt(model, 0)).not.toBe(leaderAt(model, 1));
  });

  it("keeps one treatment ahead in every stratum the whole time", () => {
    // The paradox: A wins both groups and can still lose overall. If this ever
    // stopped holding, the slider would just be showing a better treatment
    // winning, which is not a paradox and not worth a shape.
    expect(betterInEveryStratum(model)).toBe("A");
  });

  it("moves the overall rate monotonically", () => {
    // A leader that swapped back and forth would be a rendering artefact
    // rather than a mechanism.
    const a = Array.from({ length: 21 }, (_, i) => mixerFrame(model, i / 20)[0]!);
    for (let i = 1; i < a.length; i++) expect(a[i]!).toBeLessThanOrEqual(a[i - 1]!);
  });
});

describe("what it refuses", () => {
  const rates = (over: Partial<RatesData>): RatesData =>
    ({ ...data, ...over }) as RatesData;

  it("refuses anything but two groups and two strata", () => {
    // One slider cannot describe a three-way split, and averaging the extra
    // strata would draw a number nobody authored.
    expect(canMix(rates({ groups: [data.groups[0]!] }))).toBe(false);
    expect(canMix(rates({ strata: [data.strata![0]!] }))).toBe(false);
  });

  it("refuses THREE as firmly as it refuses one", () => {
    /*
      THE HALF THE TEST ABOVE WAS MISSING, and the gap was not academic:
      relaxing `!== 2` to `< 2` passed the entire suite. `mixerFrame` reads
      `byStratum[0]` and `[1]` and nothing else, so a 2x3 table would have been
      accepted and its third stratum silently dropped, which is the precise
      "drawing a number nobody authored" failure this module's header says it
      refuses. `stage-migration` is a shipped 2x3 puzzle, so the shape is real.
    */
    const third = { id: "third", label: { en: "Third" } };
    const withThreeStrata = rates({
      strata: [...data.strata!, third],
      observations: [
        ...data.observations,
        ...data.groups.map((g) => ({
          groupId: g.id,
          stratumId: third.id,
          numerator: 5,
          denominator: 10,
        })),
      ],
    });
    expect(canMix(withThreeStrata)).toBe(false);

    const thirdGroup = { id: "C", label: { en: "C" }, short: { en: "C" } };
    const withThreeGroups = rates({
      groups: [...data.groups, thirdGroup],
      observations: [
        ...data.observations,
        ...data.strata!.map((st) => ({
          groupId: thirdGroup.id,
          stratumId: st.id,
          numerator: 5,
          denominator: 10,
        })),
      ],
    });
    expect(canMix(withThreeGroups)).toBe(false);
  });

  it("refuses samples that cannot be pooled", () => {
    // The same flag the scrub refuses on: overlapping samples of the same
    // people have no meaningful total to move.
    expect(canMix(rates({ strataAreSeparateSamples: true }))).toBe(false);
  });

  it("refuses a table with a missing cell", () => {
    // A gap would have to be filled with an invented rate.
    expect(
      canMix(rates({ observations: data.observations.slice(0, 3) })),
    ).toBe(false);
  });

  it("refuses data that is not rates at all", () => {
    expect(canMix({ type: "frequencies" } as never)).toBe(false);
  });

  it("accepts the puzzle it was built for", () => {
    // A guard that refused everything would pass every check above.
    expect(canMix(data)).toBe(true);
  });
});

/**
 * A MORTALITY TABLE IS A RATES PUZZLE LIKE ANY OTHER, and comparing one with
 * `>` names the arm that kills more people as the winner.
 *
 * This module compared with `>` throughout and no test noticed, because the one
 * shipped puzzle it accepts counts successes. Review built the counter-example:
 * an arm better (lower) in both strata that takes the severe cases, on which
 * the caption would have printed the exact inverse of the paradox, in ten
 * languages, on a translated sentence.
 *
 * NOT REACHABLE IN TODAY'S DECK ONLY BY COINCIDENCE. `written-in-the-stars` is
 * already `higherIsBetter: false` and already passes `mixableShape`, refused
 * only for lacking a dominant group, and four more 2x2 lower-is-better rates
 * puzzles are refused only by `strataAreSeparateSamples`. One edit to any of
 * them and this ships.
 */
describe("when lower is better", () => {
  /** A better (lower) in both strata, and A takes the severe cases. */
  const mortality: RatesData = {
    ...data,
    higherIsBetter: false,
    observations: [
      { groupId: "A", stratumId: "small", numerator: 2, denominator: 100 },
      { groupId: "A", stratumId: "large", numerator: 20, denominator: 100 },
      { groupId: "B", stratumId: "small", numerator: 5, denominator: 100 },
      { groupId: "B", stratumId: "large", numerator: 30, denominator: 100 },
    ],
  } as RatesData;

  const model = mixerModel(mortality);

  it("names the arm that does better, not the arm with the bigger number", () => {
    expect(betterInEveryStratum(model)).toBe("A");
    // At t=1 A carries every severe case: 20% against B's 5%. A is behind.
    expect(leaderAt(model, 1)).toBe("B");
    expect(leaderAt(model, 0)).toBe("A");
  });

  it("reads the direction off the puzzle rather than assuming one", () => {
    // The same table with the flag flipped must give the opposite reading, or
    // the flag is being ignored.
    const flipped = mixerModel({ ...mortality, higherIsBetter: true } as RatesData);
    expect(betterInEveryStratum(flipped)).toBe("B");
    expect(leaderAt(flipped, 1)).toBe("A");
  });

  it("still offers the mixer, and captions it the right way round", () => {
    expect(canMix(mortality)).toBe(true);
    expect(reversedAt(model, 1)).toBe("A");
    expect(reversedAt(model, 0)).toBeNull();
  });
});

describe("where the slider opens", () => {
  it("does not open on the puzzle's own headline numbers, swapped", () => {
    /*
      At the midpoint this mixer produces 83.1% and 77.7%. `kidney-stones`
      offers "83% overall" and "78% overall" as two of its four answers, on the
      OPPOSITE arms. A reader who has just chosen between those two numbers
      would open the fold and meet them the other way round, with nothing
      marking where the real study sat.
    */
    const model = mixerModel(data);
    const middle = mixerFrame(model, 0.5).map((r) => Math.round(r * 100));
    expect(middle).toEqual([83, 78]);
    expect(OPENING_MIX).not.toBe(50);

    // And the opening state must still be one where no claim is being made.
    expect(reversedAt(model, OPENING_MIX / 100)).toBeNull();
  });
});
