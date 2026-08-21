import { describe, expect, it } from "vitest";
import { foldSpawn, stream, unitVector, weightedIndex } from "./rng";

const take = (n: number, seed: number): number[] => {
  const r = stream(seed);
  return Array.from({ length: n }, () => r());
};

describe("the streams", () => {
  it("gives the same sequence for the same seed", () => {
    expect(take(20, 42)).toEqual(take(20, 42));
  });

  it("gives different sequences for different seeds", () => {
    expect(take(20, 42)).not.toEqual(take(20, 43));
  });

  it("stays inside [0, 1)", () => {
    const xs = take(4000, 7);
    expect(Math.min(...xs)).toBeGreaterThanOrEqual(0);
    expect(Math.max(...xs)).toBeLessThan(1);
  });

  it("keeps two streams independent, which is the property the game rests on", () => {
    // Draw from one an unequal number of times and the other is unmoved. If
    // this ever failed, one weapon consuming a draw would shift another
    // concern's sequence and every counterfactual in the game would be
    // comparing two different worlds.
    const a = stream(11);
    const b = stream(22);
    const first = [b(), b(), b()];
    for (let i = 0; i < 137; i++) a();
    const second = [b(), b(), b()];
    expect(second).not.toEqual(first);
    expect([...first, ...second]).toEqual(take(6, 22));
  });
});

describe("unitVector", () => {
  it("returns points on the unit circle", () => {
    const r = stream(5);
    for (let i = 0; i < 500; i++) {
      const v = unitVector(r);
      expect(Math.hypot(v.x, v.y)).toBeCloseTo(1, 12);
    }
  });

  it("is reproducible", () => {
    expect(unitVector(stream(9))).toEqual(unitVector(stream(9)));
  });

  it("covers the whole circle rather than one quadrant", () => {
    const r = stream(3);
    const quadrants = new Set<number>();
    for (let i = 0; i < 200; i++) {
      const v = unitVector(r);
      quadrants.add((v.x >= 0 ? 1 : 0) + (v.y >= 0 ? 2 : 0));
    }
    expect(quadrants.size).toBe(4);
  });
});

/**
 * The detector's own test. Every determinism guard in the suite concludes
 * "these two worlds are the same" from this fold agreeing, so a fold that is
 * blind to one of its arguments would hand back that conclusion for two worlds
 * that differ in exactly that way. Mutation testing found precisely this:
 * dropping the x coordinate broke nothing anywhere.
 */
describe("foldSpawn", () => {
  const base = foldSpawn(0, 100, 1, 12.5, -30.25);

  it("reacts to every argument it is given", () => {
    expect(foldSpawn(1, 100, 1, 12.5, -30.25)).not.toBe(base);
    expect(foldSpawn(0, 101, 1, 12.5, -30.25)).not.toBe(base);
    expect(foldSpawn(0, 100, 2, 12.5, -30.25)).not.toBe(base);
    expect(foldSpawn(0, 100, 1, 12.6, -30.25)).not.toBe(base);
    expect(foldSpawn(0, 100, 1, 12.5, -30.15)).not.toBe(base);
  });

  it("does not let x and y cancel each other out", () => {
    // A fold that added the coordinates would call these two the same world.
    expect(foldSpawn(0, 100, 1, 40, 10)).not.toBe(foldSpawn(0, 100, 1, 10, 40));
  });

  it("is order dependent, so a reshuffled sequence is a different sequence", () => {
    const ab = foldSpawn(foldSpawn(0, 1, 0, 1, 1), 2, 0, 2, 2);
    const ba = foldSpawn(foldSpawn(0, 2, 0, 2, 2), 1, 0, 1, 1);
    expect(ab).not.toBe(ba);
  });

  it("agrees with itself", () => {
    expect(foldSpawn(0, 100, 1, 12.5, -30.25)).toBe(base);
  });
});

describe("weightedIndex", () => {
  it("respects the weights", () => {
    const r = stream(1);
    const counts = [0, 0, 0];
    for (let i = 0; i < 12000; i++) counts[weightedIndex(r, [1, 3, 6])]! += 1;
    expect(counts[0]! / 12000).toBeCloseTo(0.1, 1);
    expect(counts[1]! / 12000).toBeCloseTo(0.3, 1);
    expect(counts[2]! / 12000).toBeCloseTo(0.6, 1);
  });

  it("never picks something with no weight", () => {
    const r = stream(2);
    for (let i = 0; i < 3000; i++) expect(weightedIndex(r, [0, 5, 0])).toBe(1);
  });

  it("stays in range", () => {
    const r = stream(4);
    for (let i = 0; i < 3000; i++) {
      const k = weightedIndex(r, [2, 2]);
      expect(k === 0 || k === 1).toBe(true);
    }
  });
});
