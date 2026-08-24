import { describe, expect, it } from "vitest";
import {
  LOADOUT_SIZE,
  STARTING_LOADOUT,
  WAVES,
  WEAPONS,
  WEAPON_IDS,
  type WeaponId,
} from "./content";
import { MATCHED, MISMATCHED, classWeights, loadoutScore } from "./loadouts";
import type { RunView } from "./sim";

/**
 * IS THE CONTROL A CONTROL?
 *
 * These exist because it was not, and because nothing anywhere asked. The two
 * arms are the instrument that measures what the briefing decision is worth,
 * and they differed in two things at once: how well they matched the announced
 * threat, AND whether they deployed the recruiter, which the scorer ranks at
 * zero and which is worth about 196 seconds. The floor arm got it on every
 * briefing of every run and the ceiling arm never did, so the "deliberately
 * worst" loadout beat the "correct" one and the number looked like a finding
 * about the game instead of a defect in the ruler.
 *
 * `MISMATCHED` was imported by no test in the repository at the time. It was
 * read off in throwaway measurement scripts, which is exactly where a
 * surprising number is least likely to be challenged.
 */

const zero = Object.fromEntries(WEAPON_IDS.map((id) => [id, 0]));

/** What is on the table at wave `index`, derived the way the sim derives it. */
function offeredAt(index: number): readonly WeaponId[] {
  const out: WeaponId[] = [...STARTING_LOADOUT];
  for (let i = 0; i < index; i++) {
    for (const id of WAVES[i]!.unlocks ?? []) if (!out.includes(id)) out.push(id);
  }
  return out;
}

const viewAt = (waveIndex: number): RunView =>
  ({
    tick: 0,
    hp: 100,
    x: 0,
    y: 0,
    enemies: [],
    levels: zero as RunView["levels"],
    damage: zero as RunView["damage"],
    cutsLeft: 3,
    cutUntil: zero as RunView["cutUntil"],
    firedThisTick: [],
    hurtThisTick: false,
    hitsThisTick: [],
    deathsThisTick: [],
    gems: [],
    level: 1,
    xp: 0,
    xpNeeded: 3,
    active: [],
    unlocked: offeredAt(waveIndex),
    waveIndex,
    waveTick: 0,
    overload: 0,
    firstContact: null,
  }) as RunView;

const pickAt = (arm: typeof MATCHED, i: number) => arm(viewAt(i), offeredAt(i));
const waves = WAVES.map((_, i) => i);

describe("the two arms differ in matching and in nothing else", () => {
  it("never lets either arm deploy the recruiter", () => {
    // THE DEFECT, NAMED. The scorer gives the recruiter 0 because it kills
    // nothing, and 0 is the minimum, so descending put it last and ascending
    // put it first. Held constant now, at none, in both arms.
    for (const i of waves) {
      for (const [name, arm] of [["matched", MATCHED], ["mismatched", MISMATCHED]] as const) {
        const picked = arm(viewAt(i), offeredAt(i));
        const recruiters = picked.filter((id) => WEAPONS[id].recruits === true);
        expect(recruiters, `${name} deployed a recruiter at wave ${i}`).toEqual([]);
      }
    }
  });

  it("keeps the two arms drawing from the same pool", () => {
    // A control that could reach cards the other arm could not would be
    // measuring availability as well as matching.
    for (const i of waves) {
      const pool = offeredAt(i).filter((id) => WEAPONS[id].recruits !== true);
      for (const arm of [MATCHED, MISMATCHED]) {
        for (const id of arm(viewAt(i), offeredAt(i))) expect(pool).toContain(id);
      }
    }
  });

  it("fills every slot in both arms", () => {
    for (const i of waves) {
      expect(pickAt(MATCHED, i)).toHaveLength(LOADOUT_SIZE);
      expect(pickAt(MISMATCHED, i)).toHaveLength(LOADOUT_SIZE);
    }
  });
});

describe("the arms bracket the matching decision", () => {
  const total = (picked: readonly WeaponId[], i: number) =>
    picked.reduce((sum, id) => sum + loadoutScore(id, i), 0);

  it("never scores the floor above the ceiling", () => {
    for (const i of waves) {
      expect(
        total(pickAt(MATCHED, i), i),
        `wave ${i}`,
      ).toBeGreaterThanOrEqual(total(pickAt(MISMATCHED, i), i));
    }
  });

  it("actually separates them on the waves that have a wrong answer", () => {
    // Without this the control is vacuous: two arms that always agree bracket
    // nothing, and every measurement taken between them reads as "the decision
    // is worth zero" no matter what the game does.
    const separated = waves.filter(
      (i) => total(pickAt(MATCHED, i), i) > total(pickAt(MISMATCHED, i), i),
    );
    expect(separated.length).toBeGreaterThanOrEqual(WAVES.length - 1);
  });

  it("agrees on the opening wave, because there is no worse choice there", () => {
    // Correct rather than a defect. Every innate effector is a principal
    // defence against E. coli; `waves.test.ts` pins that the opening wave has
    // no wrong answer on purpose. A control that manufactured a difference
    // here would be inventing one.
    expect([...pickAt(MISMATCHED, 0)].sort()).toEqual([...pickAt(MATCHED, 0)].sort());
  });
});

describe("the scorer itself", () => {
  it("weights a wave by threat rather than by headcount", () => {
    // The last wave is five parts worm to five parts E. coli by spawn count
    // and 99% worm by danger. Weighting by headcount made the oracle answer a
    // wave of schistosomes with anti-bacterials and bench the eosinophil.
    const w = classWeights(WAVES.length - 1);
    expect(w.helminth!).toBeGreaterThan(0.9);
    expect(w.gramNegative!).toBeLessThan(0.1);
  });

  it("scores the recruiter at zero, which is why it needs excluding by hand", () => {
    // The two halves of the original bug, stated together so nobody removes
    // one without seeing the other.
    for (const i of waves) expect(loadoutScore("cytokine", i)).toBe(0);
    const killers = WEAPON_IDS.filter((id) => WEAPONS[id].recruits !== true);
    for (const id of killers) expect(loadoutScore(id, 0)).toBeGreaterThan(0);
  });
});
