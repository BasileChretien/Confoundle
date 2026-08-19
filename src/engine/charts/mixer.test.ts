import { describe, it, expect } from "vitest";
import {
  betterInEveryStratum,
  canMix,
  leaderAt,
  mixerFrame,
  mixerModel,
  reverses,
} from "./mixer";
import { puzzles } from "../../puzzles";
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

  it("is exact at both ends rather than nearly right", () => {
    // `(1-t)*a + t*b` is exactly `b` at t=1 in floating point; `a + (b-a)*t` is
    // not, and this project has been caught by that difference before.
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
