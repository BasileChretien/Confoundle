import { describe, expect, it } from "vitest";
import { TICK_HZ, WEAPON_IDS, type WeaponId } from "./content";
import { simulate } from "./sim";
import { policy } from "./policies";
import {
  pairedLoss,
  recording,
  replay,
  seedsFor,
  study,
  summarise,
  type Arm,
  type CounterfactualStudy,
  type RunLog,
} from "./replay";

const SEEDS = { spawnSeed: 12345, offerSeed: 999 };
const RUN = 360 * TICK_HZ;

function logged(feed: Parameters<typeof policy>[0] = { kind: "biggestBar" }) {
  const rec = recording(policy(feed), SEEDS);
  const result = simulate({ ...SEEDS, controller: rec.controller, maxTicks: RUN });
  return { result, log: rec.log() };
}

/**
 * One study, shared. Eight seeds across seven arms is fifty six runs of three
 * minutes each, so recomputing it per test costs more than everything else in
 * the suite put together.
 */
let cached: { result: ReturnType<typeof simulate>; log: RunLog; study8: CounterfactualStudy } | null =
  null;
function fixture() {
  if (cached === null) {
    const { result, log } = logged();
    cached = { result, log, study8: study(log, 8) };
  }
  return cached;
}

describe("recording and replaying", () => {
  it("replays a recorded run to the last number", () => {
    const { result, log } = fixture();
    expect(replay(log)).toEqual(result);
  });

  it("records the decisions rather than the offers", () => {
    const { log } = fixture();
    expect(log.upgrades.length).toBeGreaterThan(0);
    for (const w of log.upgrades) expect(WEAPON_IDS).toContain(w);
    // A log of indices would replay as something else the moment the offer
    // stream changed, and would be unreadable in the meantime.
    expect(log.upgrades.every((w) => typeof w === "string")).toBe(true);
  });

  it("stores only the changes of direction", () => {
    const { log } = fixture();
    expect(log.moves.length).toBeGreaterThan(0);
    let previous: number | null = null;
    for (const [, d] of log.moves) {
      expect(d).not.toBe(previous);
      previous = d;
    }
  });
});

describe("the study", () => {
  it("puts the run that really happened in the baseline", () => {
    const { result, log } = fixture();
    const st = study(log, 4);
    expect(st.seeds[0]).toBe(SEEDS.spawnSeed);
    expect(st.actual).toBe(result.ticks);
    expect(st.baseline.ticks[0]).toBe(result.ticks);
  });

  it("measures every arm on the same seeds, which is the whole design", () => {
    const { log } = fixture();
    const st = study(log, 4);
    expect(st.arms).toHaveLength(WEAPON_IDS.length);
    for (const a of st.arms) expect(a.ticks).toHaveLength(st.seeds.length);
    expect(st.baseline.ticks).toHaveLength(st.seeds.length);
  });

  it("derives its seeds reproducibly", () => {
    const { log } = fixture();
    expect(seedsFor(log, 6)).toEqual(seedsFor(log, 6));
  });

  /**
   * THE REASON THE ARMS ARE PAIRED, stated as the identity it actually is.
   *
   * The obvious death screen compares the run that happened against
   * counterfactuals drawn from other worlds and calls the gap the weapon's
   * contribution. The error that introduces is not noise and it is not small:
   * it is exactly how lucky the player's own seed was, added to EVERY weapon's
   * number identically, whatever the weapon did.
   *
   * An earlier version of this test asserted that the unpaired reading
   * overstates. It does not always; whether it runs high or low depends on
   * whether the run that happened was a good one, which is the point. So the
   * assertion is the identity, plus the fact that on this run the luck term is
   * worth tens of seconds and would have been reported as an effect of a
   * weapon.
   */
  it("shows that an unpaired comparison reports the player's luck as an effect", () => {
    const st = fixture().study8;
    const mean = (xs: readonly number[]) => xs.reduce((a, b) => a + b, 0) / xs.length;
    const luck = st.actual - mean(st.baseline.ticks);

    for (const a of st.arms) {
      const unpaired = st.actual - mean(a.ticks);
      expect(unpaired - pairedLoss(st.baseline, a)).toBeCloseTo(luck, 6);
    }
    // The two readings genuinely differ. How MUCH they differ is a fact about
    // which world this player happened to be dealt, which is why an earlier
    // version of this assertion, demanding tens of seconds, was fitting a
    // threshold to one lucky seed rather than testing anything.
    expect(luck).not.toBe(0);
  });

  it("shows the luck term is the size of a real effect, which is why it cannot be ignored", () => {
    // The spread of the baseline across seeds is the size of the problem: the
    // same player, replaying the same recorded inputs, lives that much longer
    // or shorter depending only on which world they were dealt, and an
    // unpaired death screen charges all of it to a weapon.
    //
    // Compared against the smallest real effect rather than a fixed number of
    // seconds, because a fixed number is a threshold fitted to today's tuning
    // and this is the claim that actually matters: the noise an unpaired
    // reading would import is bigger than an effect the screen means to
    // report, so the two would be indistinguishable.
    const st = fixture().study8;
    const spread = Math.max(...st.baseline.ticks) - Math.min(...st.baseline.ticks);
    const smallest = Math.min(...st.arms.map((a) => Math.abs(pairedLoss(st.baseline, a))));
    expect(spread).toBeGreaterThan(smallest);
  });

  it("marks a run that outlived the log rather than inventing a number for it", () => {
    // A counterfactual replays recorded inputs, so it cannot run past the end
    // of them. When an arm is still alive at that point the honest statement
    // is "at least this long", and the flag is how the death screen knows not
    // to draw a hard end on the bar.
    const { log, study8: st } = fixture();
    const all: Arm[] = [st.baseline, ...st.arms];
    for (const a of all) {
      for (let i = 0; i < a.ticks.length; i++) {
        if (a.censored[i]) expect(a.ticks[i]).toBe(log.ticks);
        else expect(a.ticks[i]).toBeLessThanOrEqual(log.ticks);
      }
    }
    const s = summarise(st.baseline);
    expect(s.censoredShare).toBeGreaterThanOrEqual(0);
    expect(s.censoredShare).toBeLessThanOrEqual(1);
    expect(s.low).toBeLessThanOrEqual(s.median);
    expect(s.median).toBeLessThanOrEqual(s.high);
  });

  it("actually raises the censoring flag when a run outlives its log", () => {
    // NON-VACUITY, and it was missing. The test above only says that IF a run
    // is marked censored THEN its length equals the log's, which is satisfied
    // perfectly by never marking anything. Hard-wiring the flag to false left
    // the whole study suite green. So here is a log short enough that nobody
    // dies inside it, where every arm must come back censored.
    const rec = recording(policy({ kind: "biggestBar" }), SEEDS);
    simulate({ ...SEEDS, controller: rec.controller, maxTicks: 45 * TICK_HZ });
    const short = rec.log();
    const st = study(short, 3);
    const all = [st.baseline, ...st.arms];
    expect(all.some((a) => a.censored.some(Boolean))).toBe(true);
    for (const a of all) {
      for (let i = 0; i < a.ticks.length; i++) {
        if (a.censored[i]) expect(a.ticks[i]).toBe(short.ticks);
      }
    }
    expect(summarise(st.baseline).censoredShare).toBeGreaterThan(0);
  });

  it("says so when the middle of an arm is censored", () => {
    const arm: Arm = {
      without: null,
      ticks: [100, 200, 300, 300, 300],
      censored: [false, false, true, true, true],
    };
    const s = summarise(arm);
    expect(s.median).toBe(300);
    expect(s.medianCensored).toBe(true);
    expect(s.censoredShare).toBeCloseTo(0.6, 6);
  });

  it("does not call an uncensored middle censored", () => {
    const arm: Arm = {
      without: null,
      ticks: [100, 200, 300, 400, 900],
      censored: [false, false, false, false, true],
    };
    const s = summarise(arm);
    expect(s.median).toBe(300);
    expect(s.medianCensored).toBe(false);
  });
});

/**
 * THE DESIGN CLAIM, measured rather than asserted in prose.
 *
 * Ice is last on the meter, by a distance, on a quantity the meter reports
 * perfectly accurately. It is nowhere near last in what it is worth. That gap
 * is the second and better of the two ways the game misleads, and it is the
 * one a researcher recognises: the thing being measured is not the thing
 * anybody cares about.
 */
describe("the meter and the truth disagree", () => {
  it("puts ice bottom of the meter and nowhere near bottom in what it buys", () => {
    const { result, study8: st } = fixture();
    const total = WEAPON_IDS.reduce((s, id) => s + result.damage[id], 0);
    const share = (id: WeaponId) => result.damage[id] / total;

    expect(share("ice")).toBeLessThan(0.01);
    const byMeter = [...WEAPON_IDS].sort((a, b) => share(b) - share(a));
    expect(byMeter[byMeter.length - 1]).toBe("ice");

    const loss = (id: WeaponId) =>
      pairedLoss(st.baseline, st.arms.find((a) => a.without === id)!);
    const beatenByIce = WEAPON_IDS.filter((id) => id !== "ice" && loss(id) < loss("ice"));
    expect(beatenByIce.length).toBeGreaterThanOrEqual(2);
    expect(loss("ice")).toBeGreaterThan(20 * TICK_HZ);
  });

  it("has a weapon whose damage is a rounding error and whose absence is not", () => {
    // Stated separately from the ranking above because the ranking could be
    // satisfied by everything being close together, and the point is the size
    // of the gap rather than the order.
    const { result, study8: st } = fixture();
    const iceArm = st.arms.find((a) => a.without === "ice")!;
    expect(result.damage.ice).toBeLessThan(result.damage.lightning / 100);
    expect(pairedLoss(st.baseline, iceArm)).toBeGreaterThan(15 * TICK_HZ);
  });
});
