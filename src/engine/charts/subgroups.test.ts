import { describe, expect, it } from "vitest";
import { puzzles } from "../../puzzles/all";
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
  it.each([0, 1, 5])("shows no contradiction when uncut, on deal %i", (deal) => {
    expect(contraryCount(model, sliceFrame(model, 1, deal))).toBe(0);
  });

  /**
   * THE POINT. Cut the same patients twelve ways, with no subgroup effect
   * anywhere in the data, and some subgroups still say the opposite of the
   * trial. ISIS-2 found one; a reader finds their own.
   */
  it("produces subgroups that contradict the trial once it is sliced", () => {
    // Across deals rather than within one, so this cannot become a fact about
    // a seed the way its predecessor did.
    const atCap = Array.from({ length: 40 }, (_, deal) =>
      contraryCount(model, sliceFrame(model, MAX_SLICES, deal)),
    );
    /*
      MOST deals, not every deal. Asserting that all of them contradict was the
      same mistake in the other direction: a handful of deals at the cap really
      do come out clean, and a test demanding otherwise would have to be
      loosened by whoever next changed the generator. What is true is that
      contradictions are ordinary here and rare when uncut.
    */
    expect(atCap.filter((n) => n > 0).length).toBeGreaterThan(atCap.length * 0.8);
  });

  /**
   * WHETHER TWELVE FINDS ANYTHING IS LUCK, AND THAT IS THE LESSON.
   *
   * An earlier version of this file asserted `contraryCount(model, 12) === 0`
   * and a comment explained that the effect was too strong to reverse in
   * groups of seven hundred. Both were properties of ONE DEAL. Measured over
   * two thousand: 43.8% of deals give no contradiction at twelve, 56.2% give
   * at least one, mean 0.70.
   *
   * That mattered beyond the arithmetic. This puzzle is about a trial that was
   * cut twelve ways and DID produce a subgroup pointing the other way, and the
   * toy beside it was telling readers that twelve ways finds nothing.
   *
   * So the claim is now the one that survives re-dealing, and it is stronger:
   * at the trial's own twelve, both outcomes are ordinary. Nothing anywhere may
   * depend on which deal you happen to be looking at.
   */
  it("finds a contradiction at twelve in some deals and not others", () => {
    const outcomes = Array.from({ length: 40 }, (_, deal) =>
      contraryCount(model, sliceFrame(model, 12, deal)),
    );
    expect(outcomes.some((n) => n === 0)).toBe(true);
    expect(outcomes.some((n) => n > 0)).toBe(true);
  });

  /**
   * And re-dealing really re-deals: the same cut, a different arrangement.
   */
  it("gives a different arrangement on a different deal", () => {
    expect(sliceFrame(model, 12, 0)).not.toEqual(sliceFrame(model, 12, 1));
    expect(sliceFrame(model, 12, 3)).toEqual(sliceFrame(model, 12, 3));
  });

  /**
   * THE TREND SURVIVES THE LUCK, which is what the slider is for. Averaged
   * over deals, cutting more ways buys more contradictions. Asserted as an
   * average precisely because no single deal is allowed to carry it.
   */
  it("produces more contradictions on average the more it is cut", () => {
    const mean = (k: number) =>
      Array.from({ length: 40 }, (_, deal) =>
        contraryCount(model, sliceFrame(model, k, deal)),
      ).reduce((a, b) => a + b, 0) / 40;
    expect(mean(4)).toBeLessThan(mean(12));
    expect(mean(12)).toBeLessThan(mean(MAX_SLICES));
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

  /**
   * AND IT COMPARES RATES, NOT COUNTS, which ISIS-2 cannot show because its
   * arms are the same size.
   *
   * Review found that `overallLeader` could drop its denominator entirely,
   * `g.events / g.total` to `g.events`, and the whole suite stayed green: with
   * 8,585 against 8,599 patients the two readings agree, and they agree again
   * when `higherIsBetter` is flipped, so even the direction test could not see
   * it. That is the fifth time on these toys that this deck's own numbers have
   * hidden a defect.
   *
   * The consequence is not subtle. On a 2:1 randomised trial the larger arm
   * can have MORE events and a LOWER rate, so the wrong arm is named the
   * overall winner; `contraryCount` then reports the complement, the verdict
   * names the wrong arm in ten languages, and the cell grid colours agreement
   * as disagreement. Here is that trial.
   */
  it("compares rates when the arms are different sizes", () => {
    const unequal = slicerModel({
      ...data,
      strata: [data.strata![0]!],
      observations: [
        // 2:1 allocation. The big arm has more deaths and a lower rate, so
        // counts and rates disagree, which is the whole point of the case.
        { groupId: "aspirin", stratumId: "gemini-libra", numerator: 90, denominator: 1000 },
        { groupId: "placebo", stratumId: "gemini-libra", numerator: 60, denominator: 500 },
      ],
    } as RatesData);
    expect(unequal.groups.map((g) => [g.events, g.total])).toEqual([
      [90, 1000],
      [60, 500],
    ]);
    // 9.0% against 12.0%, and deaths are bad, so aspirin leads on rate even
    // though it recorded half as many deaths again.
    expect(overallLeader(unequal)).toBe("aspirin");
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

  /**
   * THREE ARMS, WHICH THE TWO-ARM CHECK IS ACTUALLY FOR. Review found that
   * check and the "clear overall winner" check shadow each other: the existing
   * test passes a ONE-group table, where `leaderOf` reads an undefined second
   * rate and returns null, so the winner check refuses it first and deleting
   * the arm count changed nothing.
   *
   * Three is the case with teeth. `leaderOf` destructures `[a, b]` and ignores
   * everything after, so a three-arm randomised trial would be accepted and
   * its third arm would be silently absent from every subgroup verdict while
   * the pooled rows above printed all three.
   */
  it("refuses three arms, not just one", () => {
    const third = { id: "third", label: { en: "Third" }, short: { en: "C" } };
    expect(
      canSlice(
        rates({
          groups: [...data.groups, third],
          observations: [
            ...data.observations,
            ...data.strata!.map((st) => ({
              groupId: third.id,
              stratumId: st.id,
              numerator: 200,
              denominator: 2000,
            })),
          ],
        }),
      ),
    ).toBe(false);
  });

  it("refuses samples that cannot be pooled", () => {
    expect(canSlice(rates({ strataAreSeparateSamples: true }))).toBe(false);
  });

  /**
   * A TRIAL WITH NO WINNER HAS NOTHING TO CONTRADICT. Two arms at identical
   * rates: `overallLeader` is null, so "points the other way" has no other way
   * to point and the cell colouring has nothing to mean.
   *
   * Written because the two checks that could refuse this now shadow each
   * other in the opposite direction from before. The arm count catches one and
   * three arms; only an exact draw between two reaches this line, and only
   * this test does.
   */
  it("refuses a trial with no overall winner", () => {
    expect(
      canSlice(
        rates({
          strata: [data.strata![0]!],
          observations: [
            { groupId: "aspirin", stratumId: "gemini-libra", numerator: 500, denominator: 5000 },
            { groupId: "placebo", stratumId: "gemini-libra", numerator: 500, denominator: 5000 },
          ],
        }),
      ),
    ).toBe(false);
  });

  it("refuses a shape that is not a rates table", () => {
    const freq = puzzles.find((p) => p.slug === "medical-test")!.setup.data;
    expect(canSlice(freq)).toBe(false);
  });
});
