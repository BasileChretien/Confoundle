import { describe, expect, it } from "vitest";
import { puzzles } from "../../puzzles";
import type { RatesData } from "../../puzzles/schema";
import {
  MAX_SLICES,
  canSlice,
  contraryCount,
  overallLeader,
  sliceFrame,
  slicerModel,
} from "./subgroups";

const isis2 = puzzles.find((p) => p.slug === "written-in-the-stars")!;
const data = isis2.setup.data as RatesData;
const model = slicerModel(data);

describe("what the slicer holds still", () => {
  /**
   * THE PUBLISHED TRIAL, POOLED. If this drifts, every subgroup below is a
   * rearrangement of the wrong study.
   */
  it("pools the arms to the counts the paper prints", () => {
    expect(model.groups.map((g) => [g.id, g.events, g.total])).toEqual([
      ["aspirin", 804, 8585],
      ["placebo", 1015, 8599],
    ]);
    expect(overallLeader(model)).toBe("aspirin");
  });

  /**
   * THE ANCHOR. One slice is not a simulation of the trial, it IS the trial,
   * to the patient. This is the same property the other two toys have: exactly
   * one position where the picture is a measurement.
   */
  it("reproduces the trial exactly at one slice", () => {
    const [whole, ...rest] = sliceFrame(model, 1);
    expect(rest).toEqual([]);
    expect(whole!.events).toEqual([804, 1015]);
    expect(whole!.totals).toEqual([8585, 8599]);
    expect(whole!.rates).toEqual([804 / 8585, 1015 / 8599]);
    expect(whole!.leader).toBe("aspirin");
  });

  /**
   * AND EVERY DEAL IS THE SAME PATIENTS. The subgroups are the trial
   * rearranged, so their counts must add back up to it at every slice count.
   * Drawing outcomes from a fitted rate would pass every other test in this
   * file and quietly print people who were never in the study.
   */
  it.each(Array.from({ length: MAX_SLICES }, (_, i) => i + 1))(
    "deals every patient exactly once at %i slices",
    (k) => {
      const frame = sliceFrame(model, k);
      expect(frame).toHaveLength(k);
      model.groups.forEach((g, gi) => {
        const events = frame.reduce((n, s) => n + s.events[gi]!, 0);
        const total = frame.reduce((n, s) => n + s.totals[gi]!, 0);
        expect({ id: g.id, events, total }).toEqual({
          id: g.id,
          events: g.events,
          total: g.total,
        });
      });
    },
  );

  /** And nobody has an event they did not have. */
  it.each([1, 4, 12])("keeps every subgroup's events inside its head count at %i", (k) => {
    for (const s of sliceFrame(model, k)) {
      s.events.forEach((e, gi) => {
        expect(e).toBeGreaterThanOrEqual(0);
        expect(e).toBeLessThanOrEqual(s.totals[gi]!);
      });
    }
  });

  it("gives the same deal every time, so the figure can be talked about", () => {
    expect(sliceFrame(model, 7)).toEqual(sliceFrame(model, 7));
  });
});

describe("the reversal the reader causes", () => {
  it("shows no contradiction when the trial is not sliced", () => {
    expect(contraryCount(model, sliceFrame(model, 1))).toBe(0);
  });

  /**
   * THE POINT. Cut the same patients twelve ways, with no subgroup effect
   * anywhere in the data, and some subgroups still say the opposite of the
   * trial. ISIS-2 found one; a reader finds their own.
   */
  it("produces subgroups that contradict the trial once it is sliced", () => {
    const contrary = Array.from({ length: MAX_SLICES }, (_, i) =>
      contraryCount(model, sliceFrame(model, i + 1)),
    );
    expect(contrary[0]).toBe(0);
    expect(Math.max(...contrary)).toBeGreaterThan(0);
    // And the payoff is reachable at the end of the slider, not only at some
    // lucky position in the middle that a reader might scroll past.
    expect(contrary[MAX_SLICES - 1]).toBeGreaterThan(0);
  });

  /**
   * AND TWELVE IS NOT ENOUGH, which is why the cap is not twelve.
   *
   * Dealing ISIS-2 into twelve, the number of astrological signs the trial
   * actually used, produces no contradiction at all: aspirin wins every one
   * and the closest subgroup is a dead tie. Pinned because it is the reason
   * `MAX_SLICES` is 24, and because the alternative fix was to keep twelve and
   * go looking for a seed that reversed there, which is the very search this
   * puzzle is about.
   */
  it("finds nothing at twelve, which is what makes the cap honest", () => {
    expect(contraryCount(model, sliceFrame(model, 12))).toBe(0);
    expect(contraryCount(model, sliceFrame(model, 13))).toBeGreaterThan(0);
  });

  /**
   * A SUBGROUP THAT COMES OUT LEVEL CONTRADICTS NOTHING, and the branch that
   * says so is unreachable on the shipped trial: exact ties between two rates
   * of a few hundred people essentially never happen, so removing the guard
   * changed no number anywhere and the whole suite stayed green. Asserted
   * directly instead, on a frame built for the purpose.
   */
  it("does not count a level subgroup as a contradiction", () => {
    const level = [
      { events: [10, 10], totals: [100, 100], rates: [0.1, 0.1], leader: null },
      { events: [5, 12], totals: [100, 100], rates: [0.05, 0.12], leader: "aspirin" },
      { events: [12, 5], totals: [100, 100], rates: [0.12, 0.05], leader: "placebo" },
    ];
    expect(contraryCount(model, level)).toBe(1);
  });

  it("reads the direction off the puzzle rather than assuming one", () => {
    // ISIS-2 counts deaths, so the arm with the LOWER rate leads. Flip the
    // flag alone and the reading must invert, or the flag is being defaulted.
    const flipped = slicerModel({ ...data, higherIsBetter: true } as RatesData);
    expect(overallLeader(model)).toBe("aspirin");
    expect(overallLeader(flipped)).toBe("placebo");
  });
});

describe("what it refuses", () => {
  const rates = (over: Partial<RatesData>): RatesData =>
    ({ ...data, ...over }) as RatesData;

  /**
   * THE REFUSAL NO ARITHMETIC COULD MAKE, isolated on the trial where
   * everything else passes.
   *
   * ISIS-2 clears every structural check by construction, so removing the flag
   * and nothing else is the only way to see the flag work. An earlier version
   * of this test used `kidney-stones` and asserted "only the flag stops it",
   * WHICH WAS FALSE: those arms hold 350 patients each, below the minimum for
   * cutting twenty-four ways, so it was refused twice over and the assertion
   * would have passed with the flag deleted. That is the same defect the
   * screening toy shipped and review caught, one shape later, which is why the
   * isolation is now done on data chosen to make it possible.
   */
  it("refuses the same trial with the randomisation flag removed", () => {
    expect(canSlice(data)).toBe(true);
    expect(canSlice({ ...data, armsAreRandomised: undefined })).toBe(false);
  });

  /**
   * And the deck's observational comparison stays out, which is the case that
   * actually matters: dealing surgeons' choices at random would teach that a
   * confounded difference is chance. It is refused on two counts, its size as
   * well as its flag, so this asserts the outcome and does not pretend to
   * isolate either.
   */
  it("refuses the deck's observational comparison", () => {
    const kidney = puzzles.find((p) => p.slug === "kidney-stones")!.setup
      .data as RatesData;
    expect(canSlice(kidney)).toBe(false);
    expect(canSlice({ ...kidney, armsAreRandomised: true })).toBe(false);
  });

  it("accepts the trial that did opt in", () => {
    expect(canSlice(data)).toBe(true);
  });

  it("refuses a trial too small to cut twelve ways", () => {
    expect(
      canSlice(
        rates({
          observations: data.observations.map((o) => ({
            ...o,
            numerator: Math.round(o.numerator / 100),
            denominator: Math.round(o.denominator / 100),
          })),
        }),
      ),
    ).toBe(false);
  });

  it("refuses anything but two arms", () => {
    expect(canSlice(rates({ groups: [data.groups[0]!] }))).toBe(false);
  });

  it("refuses samples that cannot be pooled", () => {
    expect(canSlice(rates({ strataAreSeparateSamples: true }))).toBe(false);
  });

  it("refuses a shape that is not a rates table", () => {
    const freq = puzzles.find((p) => p.slug === "medical-test")!.setup.data;
    expect(canSlice(freq)).toBe(false);
  });
});
