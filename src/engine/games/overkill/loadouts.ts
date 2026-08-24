import {
  EFFECTIVE,
  ENEMIES,
  LOADOUT_SIZE,
  WEAPONS,
  WEAPON_IDS,
  waveAt,
  type EnemyKind,
  type PathogenClass,
  type WeaponId,
} from "./content";

import type { LoadoutChoice } from "./policies";

/**
 * The oracle: what a player who has already learned the immunology would
 * deploy against the wave that was just announced.
 *
 * IT IS DELIBERATELY A CHEAT, and it lives in its own file so that the cheat
 * is visible. `policies.ts` is scanned to prove it never reads the tuning
 * table, because a scripted player that knows the answers measures the author
 * rather than the game. This one knows all of them, on purpose: it is the
 * CEILING of the briefing decision, and `MISMATCHED` is the floor. What a real
 * player is worth sits somewhere between, and the gap between the two is the
 * only evidence that the briefing is a mechanic rather than a modal.
 *
 * If that gap turns out to be small, the honest response is to delete the
 * briefing rather than to ship it.
 */

/**
 * The pathogen classes a wave sends, weighted by how much DANGER each carries,
 * over all phases.
 *
 * BY THREAT AND NOT BY HEADCOUNT, and the first version got this wrong in a
 * way that was visible the moment the picks were printed. The last wave is
 * five parts worm to five parts E. coli, so by headcount the two classes are
 * equal and the oracle answered a wave of schistosomes with complement and
 * antibody, leaving the eosinophil on the bench: the one effector that wave
 * exists to teach. By headcount that is arithmetically correct and as a piece
 * of advice it is nonsense, because a worm has forty six times the health of
 * an E. coli and nearly nine times the contact damage.
 *
 * Health times damage is a crude proxy for how much of the danger a class
 * represents, and crude is enough: it puts the worms at 99.75% of that wave,
 * which is the answer a player arrives at by being hit.
 */
export function classWeights(waveIndex: number): Readonly<Record<string, number>> {
  const wave = waveAt(waveIndex);
  const phases = wave.turnsInto === undefined ? [wave.mix] : [wave.mix, wave.turnsInto.mix];
  const out: Record<string, number> = {};
  for (const mix of phases) {
    const threat = (kind: keyof typeof ENEMIES, n: number) =>
      n * ENEMIES[kind].hp * ENEMIES[kind].damage;
    let total = 0;
    for (const [kind, n] of mix) total += threat(kind, n);
    for (const [kind, n] of mix) {
      const cls: PathogenClass = ENEMIES[kind].cls;
      out[cls] = (out[cls] ?? 0) + threat(kind, n) / total / phases.length;
    }
  }
  return out;
}

/**
 * How much of what is coming an effector can actually kill, weighted by how
 * much of it there is.
 *
 * CYTOKINES SCORE ZERO HERE, and that is a property of this scorer rather than
 * a claim about the game. Their row in the matrix is all ones because those
 * numbers never multiply anything: they recruit and never kill. Counted
 * naively they would rank first against every wave in the deck, and the
 * "matched" arm would quietly become "always take the one that kills nothing".
 * The same trap caught the solvability test in `waves.test.ts`.
 */
export function loadoutScore(id: WeaponId, waveIndex: number): number {
  if (WEAPONS[id].recruits === true) return 0;
  const weights = classWeights(waveIndex);
  let score = 0;
  for (const cls of Object.keys(weights)) {
    score += weights[cls]! * EFFECTIVE[id][cls as PathogenClass];
  }
  return score;
}

/*
  THE TWO ARMS MUST DIFFER IN MATCHING AND IN NOTHING ELSE, and for a while
  they did not, which quietly corrupted every measurement taken with them.

  `loadoutScore` returns 0 for the recruiter, deliberately: it kills nothing,
  so it is not a matching choice and scoring it on the matrix would rank it
  first against every wave in the deck. But 0 is also the MINIMUM, so sorting
  descending put it last and sorting ascending put it FIRST. The ceiling arm
  never took it and the floor arm always took it, on every briefing of every
  run. The recruiter is worth about 196 seconds of median survival, so the
  "deliberately worst" loadout was quietly handed the strongest card in the
  game and duly beat the "correct" one, 332 seconds to 325.

  That is a textbook confound and it was sitting inside the instrument built to
  measure a game about confounds. It also went unnoticed because `MISMATCHED`
  had no test of its own anywhere: it was only ever read off in scratch
  measurements, where a surprising number reads as a finding.

  So both arms now choose among KILLERS ONLY. The recruiter is held constant
  across the comparison, at zero, which is what holding a factor constant
  means. What it is worth is a separate question and deserves a separate arm
  rather than a free ride inside this one.
*/
/**
 * What a whole LOADOUT is worth, which is not the sum of its parts any more.
 *
 * THE ORACLE USED TO SCORE EFFECTORS ONE AT A TIME AND ADD THEM UP, and that
 * stopped being valid the moment opsonisation existed. Antibody is worth
 * almost nothing alone against a bacterium and it makes a phagocyte able to
 * finish one, so the value of the card depends entirely on what else is in the
 * three slots. An additive scorer cannot represent that, and it showed:
 * measured, the "correct" loadout came in at 125 seconds against 128 for never
 * choosing at all. The ceiling arm was below the floor.
 *
 * That is the immunologist's objection arriving as a number. A model in which
 * every effector is independent cannot express the one fact about immunity
 * that matters most, which is that almost nothing in it works alone.
 *
 * So the arms now search over COMBINATIONS. There are at most 35 of them and
 * they are evaluated once per briefing, five times a run.
 */
export function setScore(ids: readonly WeaponId[], waveIndex: number): number {
  const weights = kindWeights(waveIndex);
  let total = 0;
  for (const id of ids) {
    if (WEAPONS[id].recruits === true) continue;
    for (const kind of Object.keys(weights) as EnemyKind[]) {
      // NO COAT TERM, because the simulation has none: see the long note in
      // `hit`. The rule this file has to keep is that the oracle scores the
      // game that is actually played, and a scorer that models a cooperation
      // the simulation does not have will confidently recommend nonsense. It
      // did, briefly, and deployed a phagocyte against influenza.
      total += weights[kind]! * EFFECTIVE[id][ENEMIES[kind].cls];
    }
  }
  return total;
}

/**
 * The same threat weighting as `classWeights`, kept by KIND rather than
 * collapsed to class, because whether a coat can land is a fact about the
 * pathogen and not about its category.
 */
export function kindWeights(waveIndex: number): Readonly<Partial<Record<EnemyKind, number>>> {
  const wave = waveAt(waveIndex);
  const phases = wave.turnsInto === undefined ? [wave.mix] : [wave.mix, wave.turnsInto.mix];
  const out: Partial<Record<EnemyKind, number>> = {};
  for (const mix of phases) {
    const threat = (kind: EnemyKind, n: number) => n * ENEMIES[kind].hp * ENEMIES[kind].damage;
    let sum = 0;
    for (const [kind, n] of mix) sum += threat(kind, n);
    for (const [kind, n] of mix) {
      out[kind] = (out[kind] ?? 0) + threat(kind, n) / sum / phases.length;
    }
  }
  return out;
}

/** Every way of filling the slots from what is on the table. */
function combinations(pool: readonly WeaponId[], size: number): WeaponId[][] {
  if (size === 0) return [[]];
  const out: WeaponId[][] = [];
  for (let i = 0; i <= pool.length - size; i++) {
    for (const rest of combinations(pool.slice(i + 1), size - 1)) {
      out.push([pool[i]!, ...rest]);
    }
  }
  return out;
}

function ranked(sign: number): LoadoutChoice {
  return (view, unlocked) => {
    // Killers only, in both arms: see the comment above `MATCHED`. The pool is
    // walked in `WEAPON_IDS` order so ties resolve the same way every run.
    const pool = WEAPON_IDS.filter(
      (id) => unlocked.includes(id) && WEAPONS[id].recruits !== true,
    );
    const sets = combinations(pool, Math.min(LOADOUT_SIZE, pool.length));
    let best = sets[0]!;
    let bestScore = sign * setScore(best, view.waveIndex);
    for (const set of sets) {
      const score = sign * setScore(set, view.waveIndex);
      if (score < bestScore) {
        bestScore = score;
        best = set;
      }
    }
    return best;
  };
}

/**
 * Deploys the best available answer to the announced threat. The ceiling of
 * the MATCHING decision, which is narrower than the ceiling of play: it never
 * deploys the recruiter, and a real optimum sometimes would.
 */
export const MATCHED: LoadoutChoice = ranked(-1);

/**
 * Deploys the worst available answer. The floor, and the control.
 *
 * Note that on the opening wave the two arms agree, and that is correct rather
 * than a defect: every innate effector is a principal defence against E. coli,
 * so there is no worse choice to make. A wave with no wrong answer is pinned
 * on purpose in `waves.test.ts`, and a control that manufactured a difference
 * there would be inventing one.
 */
export const MISMATCHED: LoadoutChoice = ranked(1);
