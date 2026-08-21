import { ENEMIES, type EnemyKind } from "./content";

/**
 * ONE MEETING, DRAWN SLOWLY, ALONE.
 *
 * This is a prototype answering exactly one question: can a wordless animation
 * make a mechanism legible, where two passes of better draughtsmanship could
 * not? Five specialists read the game and two of them, from different fields,
 * independently proposed the same thing and the same cheap way to falsify it:
 * build the complement encounter, run it against a thin wall and a thick one
 * side by side, and if that single sequence does not read, abandon the
 * approach before building nine more.
 *
 * So this is deliberately NOT wired into the run. It is reachable on its own
 * and it scores nothing.
 *
 * THE RULE THAT MAKES IT WORK, and it is the best idea the panel produced:
 *
 *   A failure animation is the SUCCESS animation, run identically, and
 *   interrupted at the exact step that cannot complete.
 *
 * A strike-through is a verdict. It announces a conclusion and hides the
 * cause, which is precisely what the shipped game does and precisely why a
 * player cannot say why anything failed. An interruption explains itself,
 * because the viewer has already watched the same motion succeed and can see
 * which step is missing. That has a hard corollary: a failure must never be
 * the first time somebody sees a given effector move.
 *
 * THE OUTCOME IS ARITHMETIC, NOT A BRANCH. `penetrates` is `wall < PORE_REACH`
 * on the pathogen's own `wall` field. Nobody scripted "complement fails on
 * S. aureus"; the pore reaches 0.22 of a radius, the peptidoglycan is 0.36 of
 * one, and the rest follows. Which means the drawing has to justify the
 * mechanism rather than merely illustrate a number that was justified
 * elsewhere, and that turns out to be a much stronger correctness check.
 */

/**
 * How deep the membrane attack complex can insert, as a fraction of the
 * target's radius.
 *
 * Between coli's 0.1 and aureus's 0.36 because that is the fact being modelled:
 * C5b-9 spans a lipid bilayer and cannot span a thick peptidoglycan layer, so
 * a gram negative lyses and a gram positive does not. Sitting between them is
 * the whole of it.
 */
export const PORE_REACH = 0.22;

/** Sixty ticks at 60Hz, then played back slowly. See `ENCOUNTER_SPEED`. */
export const ENCOUNTER_TICKS = 60;

/** Played at this fraction of real time, so the sequence lasts about 2.5s. */
export const ENCOUNTER_SPEED = 0.4;

export type MacStage =
  /** Subunits arriving and landing scattered on the surface. */
  | "deposit"
  /** Sliding around the surface into an evenly spaced ring. */
  | "assemble"
  /** Driving inward, either through the wall or into it. */
  | "insert"
  /** Through: the contents vent and the cell collapses. */
  | "lyse"
  /** Stopped: the ring sits on the wall, jitters, and falls off. */
  | "stall";

export interface MacState {
  readonly stage: MacStage;
  /** 0 to 1 within the current stage, for easing. */
  readonly t: number;
  /** Whether the pore reaches the membrane. Arithmetic, not a script. */
  readonly penetrates: boolean;
  /** How far in the ring has driven, as a fraction of radius. */
  readonly depth: number;
  /** How scattered the subunits still are: 1 at arrival, 0 once assembled. */
  readonly scatter: number;
  /** How much the body has swollen. Only ever non-zero when penetrating. */
  readonly swell: number;
  /** 0 to 1, how far through collapse or fade-off the sequence is. */
  readonly done: number;
}

const CUTS = { deposit: 12, assemble: 26, insert: 34 } as const;

function span(tick: number, from: number, to: number): number {
  return Math.min(1, Math.max(0, (tick - from) / (to - from)));
}

/**
 * The whole sequence as a pure function of the tick and the target.
 *
 * Pure and separate from the drawing on purpose, so the claim this prototype
 * exists to make ("the ring assembles either way, and only the last step
 * differs") is testable without a canvas.
 */
export function macAt(tick: number, kind: EnemyKind): MacState {
  const wall = ENEMIES[kind].wall;
  const penetrates = wall < PORE_REACH;
  const t = Math.min(tick, ENCOUNTER_TICKS);

  if (t < CUTS.deposit) {
    return {
      stage: "deposit",
      t: span(t, 0, CUTS.deposit),
      penetrates,
      depth: 0,
      scatter: 1,
      swell: 0,
      done: 0,
    };
  }

  if (t < CUTS.assemble) {
    // THE RING ASSEMBLES IDENTICALLY EITHER WAY, and that is load bearing.
    // Complement is not prevented from forming on a gram positive; it forms
    // perfectly well and then cannot reach through. Showing the assembly
    // succeed is what makes the next beat mean what it means, and skipping
    // it would teach "complement does not work here", which is a different
    // and wrong lesson.
    return {
      stage: "assemble",
      t: span(t, CUTS.deposit, CUTS.assemble),
      penetrates,
      depth: 0,
      scatter: 1 - span(t, CUTS.deposit, CUTS.assemble),
      swell: 0,
      done: 0,
    };
  }

  if (t < CUTS.insert) {
    const p = span(t, CUTS.assemble, CUTS.insert);
    /*
      Driving in, THE SAME DISTANCE IN BOTH RUNS.

      The first version drove the failing pore as deep as the wall was thick,
      which made the gram positive look MORE penetrated than the gram negative
      at every moment of the insertion: 0.243 against 0.1485 halfway through.
      The picture said the opposite of the mechanism, and the test caught it.

      C5b-9 is a fixed-length object. It inserts as far as it inserts, and the
      only question is whether the wall it is buried in is thinner than that.
      So both rings travel exactly `PORE_REACH`, one arrives at a membrane and
      one is still inside peptidoglycan, and the motion is identical right up
      to the instant one of them breaks through. Which is the rule this whole
      prototype is built on, arrived at by being wrong first.
    */
    const reach = PORE_REACH;
    // A recoil at the end of a failed insertion, so it reads as hitting
    // something rather than as simply deciding to stop.
    const bounce = penetrates ? 0 : Math.max(0, p - 0.75) * 0.12;
    return {
      stage: "insert",
      t: p,
      penetrates,
      depth: reach * Math.min(1, p * 1.35) - bounce,
      scatter: 0,
      swell: 0,
      done: 0,
    };
  }

  const p = span(t, CUTS.insert, ENCOUNTER_TICKS);
  return {
    stage: penetrates ? "lyse" : "stall",
    t: p,
    penetrates,
    depth: PORE_REACH,
    scatter: 0,
    // Osmotic: water rushes in through the hole, the cell swells, then bursts.
    swell: penetrates ? Math.sin(Math.min(1, p * 1.6) * Math.PI) * 0.18 : 0,
    done: p,
  };
}

/**
 * The three still frames the sequence reduces to under `prefers-reduced-motion`.
 *
 * NOT A DEGRADED FALLBACK. A cross-fade between "ring assembled" and "ring
 * stopped on the wall" is arguably the clearer teaching artefact, because the
 * comparison is held still instead of having to be remembered across two
 * seconds. The rest of this repository honours the preference and the game
 * currently honours it nowhere, which is its own defect.
 */
export const STILL_FRAMES: readonly number[] = [CUTS.deposit - 1, CUTS.insert - 1, ENCOUNTER_TICKS];
