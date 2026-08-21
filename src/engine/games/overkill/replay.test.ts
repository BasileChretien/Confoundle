import { beforeAll, describe, expect, it } from "vitest";
import { MAX_LEVEL, TICK_HZ, WEAPON_IDS, type WeaponId } from "./content";
import { simulate } from "./sim";
import { policy, type LoadoutChoice } from "./policies";
import { MATCHED } from "./loadouts";
import {
  decisionStudy,
  decisionStudyByArm,
  decisionToAskAbout,
  pairedGain,
  pairedLoss,
  switchingController,
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
/**
 * Long enough that the run ENDS IN DEATH, which several tests below depend on
 * without saying so.
 *
 * At two hundred seconds nobody dies, so every arm comes back censored at the
 * limit, the baseline has no spread, and the luck term is exactly zero. Two
 * tests then fail in a way that looks like a broken study and is really a
 * fixture that never finished.
 */
const RUN = 420 * TICK_HZ;

/**
 * The loadout the fixture plays with.
 *
 * IT INCLUDES THE RECRUITER, because the whole of what this file measures is
 * what removing an effector costs, and removing one that was never deployed
 * costs exactly nothing. A meter-following loadout would never deploy the
 * recruiter at all (see `policies.test.ts`), so every arm below would have come
 * back identical and the study would have looked broken rather than
 * misconfigured.
 *
 * AND IT MATCHES THE WAVE, which a fixed trio did not. Holding
 * [neutrophil, burst, cytokine] for the whole run walked into the influenza
 * wave with nothing that can touch a virion, so every run ended at the same
 * tick against the same wall, and a counterfactual cannot measure anything
 * when both arms die to something neither of them could have affected:
 * removing the recruiter came back as costing EXACTLY zero, alongside the five
 * effectors that were never deployed at all. A degenerate fixture, not a
 * regression, but it reads identically to one. The two best answers to the
 * announced wave plus the recruiter keeps the run alive long enough that the
 * arms have somewhere to diverge.
 */
const DEPLOYED: LoadoutChoice = (view, unlocked) => [
  ...MATCHED(view, unlocked).slice(0, 2),
  "cytokine",
];

function logged(feed: Parameters<typeof policy>[0] = { kind: "biggestBar" }) {
  const rec = recording(policy(feed, DEPLOYED), SEEDS);
  const result = simulate({ ...SEEDS, controller: rec.controller, maxTicks: RUN });
  return { result, log: rec.log() };
}

/**
 * One run and one study, shared by the whole file and built in a hook so the
 * cost lands somewhere with its own timeout rather than on whichever test
 * happens to run first.
 */
let cached: { result: ReturnType<typeof simulate>; log: RunLog; study8: CounterfactualStudy };
beforeAll(() => {
  const { result, log } = logged();
  cached = { result, log, study8: study(log, 4) };
}, 180_000);
function fixture() {
  return cached;
}

describe("recording and replaying", () => {
  it("replays a recorded run to the last number", () => {
    const { result, log } = fixture();
    expect(replay(log)).toEqual(result);
  });

  it("records the whole decision, not just the answer", () => {
    const { log } = fixture();
    expect(log.upgrades.length).toBeGreaterThan(0);
    for (const d of log.upgrades) {
      // The weapon rather than an index into the offers: a log saying
      // "index 2" is unreadable and silently means something else the moment
      // the offer stream changes.
      expect(WEAPON_IDS).toContain(d.chosen);
      // And the cards that were on the table, because the death screen asks
      // about a decision and a decision cannot be described without them.
      expect(d.offers).toContain(d.chosen);
      expect(d.offers.length).toBeGreaterThan(0);
      expect(d.tick).toBeGreaterThanOrEqual(0);
    }
    // The moments are in order, so an index into this list names a moment.
    for (let i = 1; i < log.upgrades.length; i++) {
      expect(log.upgrades[i]!.tick).toBeGreaterThan(log.upgrades[i - 1]!.tick);
    }
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
      weapon: null,
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
      weapon: null,
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
 * The recruiter is last on the meter, by an exact zero, on a quantity the
 * meter reports perfectly accurately. It is nowhere near last in what it is
 * worth, because everything it is worth was counted in another column. That gap
 * is the second and better of the two ways the game misleads, and it is the
 * one a researcher recognises: the thing being measured is not the thing
 * anybody cares about.
 */
describe("the meter and the truth disagree", () => {
  it("puts the recruiter bottom of the meter and nowhere near bottom in what it buys", () => {
    const { result, study8: st } = fixture();
    const total = WEAPON_IDS.reduce((sum, id) => sum + result.damage[id], 0);

    // BOTTOM BY AN EXACT ZERO, which is a stronger statement than the one this
    // test used to make. The old subject was a slow-only weapon whose damage
    // was merely small; the recruiter's is nil by construction, because it
    // recruits and never kills. There is no threshold to argue about.
    expect(result.damage.cytokine).toBe(0);
    expect(total).toBeGreaterThan(0);

    // And it is not free to lose. Everything it is worth has landed in other
    // effectors' columns, which is precisely why the meter cannot show it.
    const loss = (id: WeaponId) =>
      pairedLoss(st.baseline, st.arms.find((a) => a.weapon === id)!);
    const beaten = WEAPON_IDS.filter((id) => id !== "cytokine" && loss(id) < loss("cytokine"));
    expect(beaten.length).toBeGreaterThanOrEqual(2);
  });

  it("has an effector whose damage is nil and whose absence is not", () => {
    // Stated separately from the ranking above because the ranking could be
    // satisfied by everything being close together, and the point is the size
    // of the gap rather than the order.
    const { result, study8: st } = fixture();
    const arm = st.arms.find((a) => a.weapon === "cytokine")!;
    expect(result.damage.cytokine).toBe(0);
    expect(pairedLoss(st.baseline, arm)).toBeGreaterThan(5 * TICK_HZ);
  });
});

/**
 * THE MARGINAL VALUE OF THE NEXT LEVEL, which is the only quantity in the game
 * a player can act on.
 *
 * Removing a weapon is a clean question that nobody can answer with their
 * thumb. Taking a different card is the whole of the player's agency, so it is
 * what the reveal measures now.
 */
describe("what one card was worth", () => {
  it("reproduces the run exactly when the card taken is the one that was taken", () => {
    // THE CHECK THAT SAYS THE SWITCH CHANGES ONLY THE DECISION. If re-taking
    // the same card gave a different run, something other than the choice
    // would be moving and every number on the screen would be measuring it.
    const { log } = fixture();
    const at = decisionToAskAbout(log)!;
    const st = decisionStudy(log, at, 4);
    const same = st.arms.find((a) => a.weapon === st.decision.chosen)!;
    expect(same.ticks).toEqual(st.baseline.ticks);
    expect(same.censored).toEqual(st.baseline.censored);
    expect(pairedGain(st.baseline, same)).toBe(0);
  });

  it("measures exactly the cards that were on the table", () => {
    const { log } = fixture();
    const at = decisionToAskAbout(log)!;
    const st = decisionStudy(log, at, 3);
    expect(st.arms.map((a) => a.weapon)).toEqual([...st.decision.offers]);
    expect(st.decision).toEqual(log.upgrades[at]);
  });

  it("changes the run when a different card is taken", () => {
    // Non-vacuity: if switching did nothing, the test above would pass by
    // accident and the whole reveal would be reporting zeroes.
    const { log } = fixture();
    const at = decisionToAskAbout(log)!;
    const st = decisionStudy(log, at, 6);
    const others = st.arms.filter((a) => a.weapon !== st.decision.chosen);
    expect(others.length).toBeGreaterThan(0);
    expect(others.some((a) => !a.ticks.every((t, i) => t === st.baseline.ticks[i]))).toBe(true);
  });

  it("never asks about the first level up, where there is nothing to be misled by", () => {
    const { log } = fixture();
    expect(decisionToAskAbout(log)).toBeGreaterThan(0);
    expect(decisionToAskAbout(log)).toBeLessThan(log.upgrades.length);
    // A run too short to have made a second decision has nothing to ask about,
    // and saying so beats asking about a moment that did not happen.
    expect(decisionToAskAbout({ ...log, upgrades: [] })).toBeNull();
    expect(decisionToAskAbout({ ...log, upgrades: log.upgrades.slice(0, 1) })).toBeNull();
  });

  it("changes exactly one decision and leaves the rest alone", () => {
    // THE CENTRAL CLAIM OF THE WHOLE MEASUREMENT, and mutation testing found
    // it untested: making the switch fire at EVERY level up left every other
    // assertion in this block green, and the screen would then have been
    // reporting the value of a whole different strategy while calling it the
    // value of one card.
    const { log } = fixture();
    const at = decisionToAskAbout(log)!;
    const other = log.upgrades[at]!.offers.find((o) => o !== log.upgrades[at]!.chosen)!;

    const rec = recording(switchingController(log, at, other), SEEDS);
    simulate({ ...SEEDS, controller: rec.controller, maxTicks: log.ticks });
    const after = rec.log().upgrades;

    expect(after[at]!.chosen).toBe(other);
    for (let i = 0; i < at; i++) {
      expect(after[i]!.chosen).toBe(log.upgrades[i]!.chosen);
      expect(after[i]!.tick).toBe(log.upgrades[i]!.tick);
    }
    // And every later decision still takes the card the player took, because
    // only the one under study was substituted.
    for (let i = at + 1; i < Math.min(after.length, log.upgrades.length); i++) {
      expect(after[i]!.chosen).toBe(log.upgrades[i]!.chosen);
    }
  });

  it("keeps offering a weapon that is already at its ceiling", () => {
    // The spawn-stream argument, one level up. If the bag of cards were
    // filtered by which weapons are already maxed, the offers would depend on
    // the choices, switching one card would deal a different hand at every
    // later level up, and the difference the reveal reports would not be the
    // decision.
    //
    // POOLED OVER SEVERAL RUNS, because a single run leaves only three or four
    // decisions after the ceiling is reached and three cards drawn from six is
    // about even money each time: an earlier version missed by chance and
    // looked like a real failure. Pooling makes a miss vanishingly unlikely
    // without weakening what is asserted.
    let laterTotal = 0;
    let sawIt = 0;
    for (let k = 0; k < 4; k++) {
      const seeds = { spawnSeed: SEEDS.spawnSeed + k * 7919, offerSeed: SEEDS.offerSeed };
      const rec = recording(policy({ kind: "fixed", weapon: "cytokine" }), seeds);
      simulate({ ...seeds, controller: rec.controller, maxTicks: 14 * 60 * TICK_HZ });
      const decisions = rec.log().upgrades;

      let level = 1;
      let maxedAt = -1;
      for (let i = 0; i < decisions.length; i++) {
        if (decisions[i]!.chosen === "cytokine") level += 1;
        if (level >= MAX_LEVEL && maxedAt < 0) maxedAt = i;
      }
      if (maxedAt < 0) continue;
      const later = decisions.slice(maxedAt + 1);
      laterTotal += later.length;
      sawIt += later.filter((d) => d.offers.includes("cytokine")).length;
    }
    // The premise: runs really did take something to its ceiling and carry on.
    expect(laterTotal).toBeGreaterThan(6);
    expect(sawIt).toBeGreaterThan(0);
  }, 120_000);

  it("reads positive when the alternative was better", () => {
    // The sign is the meaning: a negated gain would draw the losing card as
    // the winner. Asserted on hand-built arms so it cannot depend on tuning.
    const base: Arm = { weapon: null, ticks: [100, 100], censored: [false, false] };
    const better: Arm = { weapon: "antibody", ticks: [160, 140], censored: [false, false] };
    const worse: Arm = { weapon: "killerT", ticks: [40, 60], censored: [false, false] };
    expect(pairedGain(base, better)).toBe(50);
    expect(pairedGain(base, worse)).toBe(-50);
    // And it is the exact opposite of the loss the removal study reports.
    expect(pairedGain(base, better)).toBe(-pairedLoss(base, better));
  });

  it("agrees with its own progressive form, arm for arm", () => {
    const { log } = fixture();
    const at = decisionToAskAbout(log)!;
    const it = decisionStudyByArm(log, at, 3);
    let step = it.next();
    let steps = 0;
    while (step.done !== true) {
      steps += 1;
      step = it.next();
    }
    expect(steps).toBeGreaterThan(1);
    expect(step.value).toEqual(decisionStudy(log, at, 3));
  });
});
