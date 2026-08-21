import { describe, expect, it } from "vitest";
import {
  EFFECTIVE,
  ENEMIES,
  LOADOUT_SIZE,
  STARTING_LOADOUT,
  WAVES,
  WEAPONS,
  WEAPON_IDS,
  type PathogenClass,
  type WeaponId,
} from "./content";

/**
 * THE WAVE TABLE HAS TO BE SOLVABLE, and nothing else in the suite can see it.
 *
 * The failure this exists for was real and it was silent. The first draft
 * unlocked the cytotoxic T cell at the END of the influenza wave, which is the
 * only wave in the deck that contains an infected cell. So the card existed,
 * could be picked, was drawn, was translated, and could never once be the
 * right answer to anything, in any run, at any difficulty. Every test passed.
 * The game would simply have had a dead button in it.
 *
 * The general shape is worth naming, because it will recur the moment anybody
 * adds a sixth wave: an unlock schedule and a threat schedule are two lists
 * that have to agree, and neither one looks wrong on its own. So these tests
 * read BOTH off `WAVES` and check the agreement, and a wave added later is
 * covered without its author knowing this file exists.
 */

/** What the player can choose from at wave `index`'s briefing. */
function offeredAt(index: number): readonly WeaponId[] {
  const out: WeaponId[] = [...STARTING_LOADOUT];
  for (let i = 0; i < index; i++) {
    for (const id of WAVES[i]!.unlocks ?? []) if (!out.includes(id)) out.push(id);
  }
  return out;
}

/** Every phase of a wave, since one of them turns over halfway through. */
function phasesOf(index: number): readonly (readonly (readonly [string, number])[])[] {
  const w = WAVES[index]!;
  return w.turnsInto === undefined ? [w.mix] : [w.mix, w.turnsInto.mix];
}

function classesIn(index: number): readonly PathogenClass[] {
  const out = new Set<PathogenClass>();
  for (const mix of phasesOf(index)) {
    for (const [kind] of mix) out.add(ENEMIES[kind as keyof typeof ENEMIES].cls);
  }
  return [...out];
}

/** Effectors that actually kill, which is every one except the cytokines. */
const KILLERS = WEAPON_IDS.filter((id) => WEAPONS[id].recruits !== true);

describe("the wave table is solvable", () => {
  it("offers a principal defence for every class in every phase of every wave", () => {
    for (let i = 0; i < WAVES.length; i++) {
      // FILTERED TO `KILLERS`, and this test passed for the wrong reason
      // until it was. Cytokines have an all-ones row, because those numbers
      // never multiply anything: they recruit and never kill. Counted as an
      // answer, they make every class in the deck look defended, and a
      // mutation that unlocked the eosinophil after the only wave with a worm
      // in it sailed straight through this assertion. It was caught by the
      // dead-effector test instead, which is luck rather than coverage.
      const offered = offeredAt(i).filter((id) => KILLERS.includes(id));
      for (const cls of classesIn(i)) {
        const answers = offered.filter((id) => EFFECTIVE[id][cls] === 1);
        expect(answers.length, `wave ${i} phase class ${cls}`).toBeGreaterThan(0);
      }
    }
  });

  it("offers enough to fill the loadout at every briefing", () => {
    for (let i = 0; i < WAVES.length; i++) {
      expect(offeredAt(i).length, `wave ${i}`).toBeGreaterThanOrEqual(LOADOUT_SIZE);
    }
  });

  it("never unlocks an effector after the last wave it could have worked in", () => {
    // THE ONE THAT CAUGHT THE REAL BUG. An effector is dead if the last wave
    // whose briefing could offer it is earlier than the first wave it is a
    // principal defence against. Stated as a search over the table rather than
    // as a list of weapons, so it keeps holding when the table changes.
    for (const id of KILLERS) {
      const firstOffered = WAVES.findIndex((_, i) => offeredAt(i).includes(id));
      const usefulIn = WAVES.map((_, i) => i).filter((i) =>
        classesIn(i).some((cls) => EFFECTIVE[id][cls] === 1),
      );
      expect(firstOffered, `${id} is never offered`).toBeGreaterThanOrEqual(0);
      expect(usefulIn.length, `${id} is a principal defence against nothing that spawns`)
        .toBeGreaterThan(0);
      // The last wave repeats forever once it is reached, so being useful in
      // it is enough even if it is offered on its own briefing.
      const reachable = usefulIn.some((i) => i >= firstOffered) || firstOffered <= WAVES.length - 1
        && usefulIn.includes(WAVES.length - 1);
      expect(reachable, `${id} unlocks only after every wave it works in`).toBe(true);
    }
  });

  it("shows a headline that is actually in the wave's opening mix", () => {
    // The briefing draws `headline` and nothing else. If that is not what
    // arrives, the screen is lying about the thing the whole design rests on.
    for (let i = 0; i < WAVES.length; i++) {
      const opening = WAVES[i]!.mix.map(([kind]) => kind);
      expect(opening, `wave ${i}`).toContain(WAVES[i]!.headline);
    }
  });
});

describe("the matrix", () => {
  it("never lets an effector do literally nothing", () => {
    // A zero reads as a broken weapon rather than as the wrong tool. The
    // player has to SEE the attack land and fail.
    for (const id of WEAPON_IDS) {
      for (const cls of Object.keys(EFFECTIVE[id]) as PathogenClass[]) {
        expect(EFFECTIVE[id][cls], `${id}/${cls}`).toBeGreaterThan(0);
      }
    }
  });

  it("keeps the two facts the whole design is built on", () => {
    // Complement lyses gram negatives and cannot lyse gram positives: the
    // peptidoglycan is too thick for C5b-9 to reach the membrane.
    expect(EFFECTIVE.complement.gramNegative).toBe(1);
    expect(EFFECTIVE.complement.gramPositive).toBeLessThan(0.35);
    // Antibody cannot reach a pathogen that is inside a cell, and killing the
    // cell is the only thing that works.
    expect(EFFECTIVE.antibody.freeVirion).toBe(1);
    expect(EFFECTIVE.antibody.infectedCell).toBeLessThan(0.35);
    expect(EFFECTIVE.killerT.infectedCell).toBe(1);
    expect(EFFECTIVE.nk.infectedCell).toBe(1);
    // A helminth is too large to phagocytose. Eosinophils and IgE, or nothing.
    expect(EFFECTIVE.eosinophil.helminth).toBe(1);
    expect(EFFECTIVE.neutrophil.helminth).toBeLessThan(0.35);
  });

  it("opens on a wave where nothing can be got wrong", () => {
    // DELIBERATE, AND PINNED HERE SO IT STAYS DELIBERATE. The opening wave is
    // where the briefing mechanic is taught, and it is taught on the one
    // threat every innate effector answers, so a player who has not yet
    // worked out what the screen is asking pays nothing for guessing. It also
    // builds the habit that wave two breaks, and you cannot break a trust you
    // have not first established. Anyone who adds a dud to this wave will
    // fail this test and has to decide that on purpose.
    const classes = classesIn(0);
    const duds = offeredAt(0).filter(
      (id) => WEAPONS[id].recruits !== true && classes.every((cls) => EFFECTIVE[id][cls] < 0.35),
    );
    expect(duds).toEqual([]);
  });

  it("gives every later wave a wrong answer as well as a right one", () => {
    // Without this a briefing is not a decision, it is a formality: if
    // everything on the table works, there is nothing to get wrong and
    // nothing to learn. Checked against what is OFFERED, not against the
    // whole roster, because an effector you do not have cannot mislead you.
    for (let i = 1; i < WAVES.length; i++) {
      const classes = classesIn(i);
      const duds = offeredAt(i).filter(
        (id) => WEAPONS[id].recruits !== true && classes.every((cls) => EFFECTIVE[id][cls] < 0.35),
      );
      expect(duds.length, `wave ${i} has no wrong answer`).toBeGreaterThan(0);
    }
  });
});
