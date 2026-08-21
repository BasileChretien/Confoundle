/**
 * Seeded randomness for the Overkill simulation, in NAMED STREAMS.
 *
 * WHY THE STREAMS ARE SEPARATE, which is the only interesting thing in this
 * file. The whole game rests on a counterfactual: re-run your run with one
 * weapon switched off and see how long you last. That comparison is worth
 * nothing unless the world you are compared against is the SAME world. If
 * spawns and upgrade offers came out of one shared generator, then disabling
 * the knife would change how many draws combat consumed, every later spawn
 * would shift, and the death screen would be comparing two different games and
 * calling the difference an effect of the knife.
 *
 * So each concern gets its own generator, seeded independently, and nothing
 * else may draw from it. `sim.test.ts` asserts exactly this: the spawn
 * sequence of a run is byte-identical with a weapon disabled.
 *
 * NO TRIGONOMETRY, deliberately. Spawn directions are the one place a ring
 * naturally wants `Math.cos`, and `Math.cos` is implementation-defined: the
 * spec permits any implementation-approximated result, so two engines may
 * differ in the last bits and a replay recorded in one browser could diverge
 * in another. `Math.sqrt` is required to be correctly rounded, so rejection
 * sampling a point in the unit disc and normalising it is exact everywhere.
 * It costs about 1.27 iterations on average.
 */

export type Rng = () => number;

/**
 * mulberry32. Small, fast, and good enough for a game; the property that
 * matters here is reproducibility, not statistical excellence.
 */
export function stream(seed: number): Rng {
  let a = seed >>> 0;
  return () => {
    a = (a + 0x6d2b79f5) >>> 0;
    let t = a;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

/** A point on the unit circle, without trigonometry. See the note above. */
export function unitVector(rng: Rng): { x: number; y: number } {
  for (;;) {
    const x = rng() * 2 - 1;
    const y = rng() * 2 - 1;
    const d2 = x * x + y * y;
    // The lower bound rejects points close enough to the origin that dividing
    // by the length would blow the result up; the upper bound is the disc.
    if (d2 > 1e-6 && d2 <= 1) {
      const d = Math.sqrt(d2);
      return { x: x / d, y: y / d };
    }
  }
}

/**
 * Folds one spawn into a running digest of the spawn sequence.
 *
 * THE DETECTOR FOR THE ONE BUG THAT WOULD RUIN THE GAME QUIETLY, so it is a
 * function of its own with its own test. A guard is worth exactly what its
 * detector can see, and mutation testing found that out the hard way here:
 * blanking the x coordinate out of the fold left every determinism assertion
 * in the suite green, because the runs being compared agreed on everything
 * else anyway. A digest that ignores half the position would report two
 * genuinely different worlds as the same one, which is the failure the guard
 * exists to prevent, wearing the guard's own uniform.
 *
 * Coordinates are folded at a thousandth, which is far finer than anything
 * gameplay can distinguish and coarse enough not to trip on the last bit of a
 * float.
 */
export function foldSpawn(
  digest: number,
  tick: number,
  kindIndex: number,
  x: number,
  y: number,
): number {
  let h = Math.imul(digest, 31) + tick;
  h = (Math.imul(h, 31) + kindIndex) | 0;
  h = (Math.imul(h, 31) + Math.round(x * 1000)) | 0;
  h = (Math.imul(h, 31) + Math.round(y * 1000)) | 0;
  return h;
}

/**
 * Pick an index from integer weights. Takes the weights rather than a
 * cumulative table so a caller cannot pass one that does not sum to its own
 * total, which is the failure this signature exists to make impossible.
 */
export function weightedIndex(rng: Rng, weights: readonly number[]): number {
  let total = 0;
  for (const w of weights) total += w;
  let r = rng() * total;
  for (let i = 0; i < weights.length; i++) {
    r -= weights[i]!;
    if (r < 0) return i;
  }
  // Only reachable through floating point slop at the very top of the range.
  return weights.length - 1;
}
