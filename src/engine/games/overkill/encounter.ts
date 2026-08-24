import { ENEMIES, PORE_REACH, type EnemyKind, type WeaponId } from "./content";
import { VERB, blockerOf, outcomeOf, type Blocker, type Verb } from "./verbs";

export { PORE_REACH };

/**
 * ONE MEETING, DRAWN SLOWLY, ALONE.
 *
 * THE RULE THE WHOLE THING IS BUILT ON, and it is the best idea the specialist
 * panel produced:
 *
 *   A failure animation is the SUCCESS animation, run identically, and
 *   interrupted at the exact step that cannot complete.
 *
 * A strike-through is a verdict. It announces a conclusion and hides the
 * cause, which is what the shipped game does and precisely why a player could
 * not say why anything failed. An interruption explains itself, because the
 * viewer has already watched the same motion succeed and can see which step is
 * missing. That has a hard corollary, enforced in `encounter.test.ts`: a
 * failure must never be the first time somebody sees a given effector move.
 *
 * SO THE RULE IS THE DATA STRUCTURE. Every verb is an ordered list of steps,
 * and every blocker names the step it stops at. There is no separate failure
 * animation anywhere in this file, and there cannot be one: the same sequence
 * runs either way and a blocked encounter simply stops advancing. That makes
 * it impossible to draw a failure that does not correspond to a real step of a
 * real mechanism, which was the defect in the shipped version, where every
 * failure was one grey mark that named nothing.
 *
 * THE OUTCOME IS ARITHMETIC. Nobody scripted "complement fails on S. aureus";
 * the pore reaches 0.22 of a radius, the peptidoglycan is 0.36 of one, and
 * `verbs.ts` derives the rest from properties the pathogen already has.
 */

/** Played at this fraction of real time, so a sequence lasts about 2.5s. */
export const ENCOUNTER_SPEED = 0.4;

export interface Step {
  readonly name: string;
  readonly ticks: number;
}

/**
 * What each verb does, in order.
 *
 * Read these as sentences. "Reach, embrace, close, digest" is phagocytosis and
 * nothing else; "deposit, assemble, insert, burst" is a membrane attack
 * complex and nothing else. If a sequence cannot be read aloud as the
 * mechanism, it is decoration.
 */
export const SEQUENCE: Readonly<Record<Verb, readonly Step[]>> = {
  engulf: [
    { name: "reach", ticks: 10 },
    { name: "embrace", ticks: 16 },
    { name: "close", ticks: 8 },
    { name: "digest", ticks: 16 },
  ],
  pore: [
    { name: "deposit", ticks: 12 },
    { name: "assemble", ticks: 14 },
    { name: "insert", ticks: 8 },
    { name: "burst", ticks: 26 },
  ],
  coat: [
    { name: "approach", ticks: 10 },
    { name: "bind", ticks: 14 },
    { name: "cover", ticks: 14 },
    { name: "neutralise", ticks: 14 },
  ],
  condemn: [
    { name: "dock", ticks: 10 },
    { name: "read", ticks: 14 },
    { name: "polarise", ticks: 12 },
    { name: "apoptose", ticks: 22 },
  ],
  burn: [
    { name: "charge", ticks: 8 },
    { name: "release", ticks: 12 },
    { name: "oxidise", ticks: 16 },
    { name: "dissolve", ticks: 18 },
  ],
  spray: [
    { name: "attempt", ticks: 12 },
    { name: "tether", ticks: 10 },
    { name: "degranulate", ticks: 14 },
    { name: "necrose", ticks: 20 },
  ],
  signal: [
    { name: "secrete", ticks: 10 },
    { name: "diffuse", ticks: 16 },
    { name: "bind", ticks: 12 },
    { name: "answer", ticks: 18 },
  ],
};

/**
 * Which step each reason stops at, PER VERB.
 *
 * Not a flat table from reason to step, and two attempts at one both broke in
 * the same way. A step is a property of the MECHANISM, not of the reason: a
 * phagocyte meeting a worm gets all the way to `embrace` and its arms cannot
 * meet, while an oxidative burst meeting the same worm has no embrace to fail
 * at, it releases fine and the chemistry is simply not enough. Writing
 * `tooLarge: "embrace"` once meant the burst named a step it does not have, so
 * it never stopped at all and ran to `dissolve`, drawing a kill for a pair the
 * matrix calls a failure. The same thing happened first with `self`.
 *
 * Every entry is a claim about WHERE IN THE MECHANISM the trouble is, which is
 * a different and much more useful claim than "this does not work". Two
 * reasons may stall the same step and still draw differently, because the step
 * says where it stopped and the blocker says why.
 */
export const STOPS_AT: Readonly<Record<Verb, Partial<Record<Blocker, string>>>> = {
  engulf: {
    /** The arms grow around it and cannot meet. */
    tooLarge: "embrace",
    /** Recognised on contact as one of yours, and never begun. */
    self: "reach",
  },
  pore: {
    /** The ring assembles perfectly and cannot reach through what it sits on. */
    wall: "insert",
    self: "deposit",
  },
  coat: {
    /** It arrives at a host membrane with nothing on it to bind. */
    hidden: "bind",
  },
  condemn: {
    /** The receptor sweeps the surface and finds no slot to read. */
    noBadge: "read",
  },
  burn: {
    /** The chemistry lands on something with no chemistry in it. */
    inert: "oxidise",
    /** And on something there is simply far too much of. */
    tooLarge: "oxidise",
    self: "charge",
  },
  spray: {
    /** The granules leave and drift past something that never needed them. */
    tooSmall: "degranulate",
    self: "attempt",
  },
  signal: {},
};

/** Where this exact pair stops, or null when it completes. */
export function stopStep(weapon: WeaponId, kind: EnemyKind): string | null {
  const blocker = blockerOf(weapon, kind);
  if (blocker === null) return null;
  return STOPS_AT[VERB[weapon]][blocker] ?? null;
}

export interface Encounter {
  readonly verb: Verb;
  /** Which step is running. */
  readonly step: string;
  /** How far through that step, 0 to 1. */
  readonly t: number;
  /** How far through the whole sequence, 0 to 1. */
  readonly at: number;
  /** Null when this pair completes. */
  readonly blocker: Blocker | null;
  /** True once the sequence has stopped and will not continue. */
  readonly stalled: boolean;
  /** Whether the target dies at the end of it. */
  readonly kills: boolean;
}

/** Total ticks of a verb's sequence, before any interruption. */
export function lengthOf(verb: Verb): number {
  return SEQUENCE[verb].reduce((sum, s) => sum + s.ticks, 0);
}

/** The longest sequence, so a caller can size a scrubber without guessing. */
export const ENCOUNTER_TICKS = Math.max(
  ...(Object.keys(SEQUENCE) as Verb[]).map((v) => lengthOf(v)),
);

/**
 * The whole meeting as a pure function of the tick.
 *
 * Pure and separate from the drawing on purpose, so the claims this makes can
 * be tested without a canvas: that the two runs are identical until the
 * blocked step, that a blocked one never advances past it, and that every
 * blocker names a step its own verb actually has.
 */
export function encounterAt(weapon: WeaponId, kind: EnemyKind, tick: number): Encounter {
  const verb = VERB[weapon];
  const steps = SEQUENCE[verb];
  const blocker = blockerOf(weapon, kind);
  const stopAt = stopStep(weapon, kind);

  let elapsed = 0;
  for (const step of steps) {
    const within = tick - elapsed;
    if (within < step.ticks) {
      const t = Math.max(0, within / step.ticks);
      return {
        verb,
        step: step.name,
        t,
        at: Math.min(1, tick / lengthOf(verb)),
        blocker,
        stalled: false,
        kills: outcomeOf(weapon, kind) === "kills",
      };
    }
    elapsed += step.ticks;
    if (step.name === stopAt) {
      // BLOCKED. The sequence holds here for the rest of the encounter, which
      // is what "interrupted at the step that cannot complete" means: not a
      // different animation, the same one, stopped.
      return {
        verb,
        step: step.name,
        t: 1,
        at: Math.min(1, tick / lengthOf(verb)),
        blocker,
        stalled: true,
        kills: false,
      };
    }
  }

  const last = steps[steps.length - 1]!;
  return {
    verb,
    step: last.name,
    t: 1,
    at: 1,
    blocker,
    stalled: blocker !== null,
    kills: outcomeOf(weapon, kind) === "kills",
  };
}

/**
 * The membrane attack complex, in the extra detail its drawing needs.
 *
 * DERIVED FROM `encounterAt` rather than kept beside it. This predates the
 * general sequence and carried three scalars of its own; folding it in was
 * worth the churn, because two systems describing the same event is exactly
 * how a drawing and a mechanism drift apart.
 */
export interface MacState {
  readonly stage: "deposit" | "assemble" | "insert" | "lyse" | "stall";
  readonly t: number;
  readonly penetrates: boolean;
  readonly depth: number;
  readonly scatter: number;
  readonly swell: number;
  readonly done: number;
}

export function macAt(tick: number, kind: EnemyKind): MacState {
  const e = encounterAt("complement", kind, tick);
  const penetrates = ENEMIES[kind].wall < PORE_REACH && !ENEMIES[kind].self;
  const stalled = e.stalled;
  const stage: MacState["stage"] =
    e.step === "burst" ? "lyse" : stalled && e.step === "insert" ? "stall" : (e.step as MacState["stage"]);
  return {
    stage,
    t: e.t,
    penetrates,
    // BOTH RINGS TRAVEL THE SAME DISTANCE. C5b-9 is a fixed length object, and
    // the only question is whether the wall it is buried in is thinner than
    // that. An earlier version drove the failing pore as deep as the wall was
    // thick, so the gram positive read as MORE penetrated throughout.
    depth:
      stage === "insert" || stage === "stall"
        ? PORE_REACH * Math.min(1, e.t * 1.35) - (penetrates ? 0 : Math.max(0, e.t - 0.75) * 0.12)
        : stage === "lyse"
          ? PORE_REACH
          : 0,
    scatter: stage === "deposit" ? 1 : stage === "assemble" ? 1 - e.t : 0,
    // Osmotic: water rushes in through the hole, the cell swells, then bursts.
    swell: stage === "lyse" && penetrates ? Math.sin(Math.min(1, e.t * 1.6) * Math.PI) * 0.18 : 0,
    done: stage === "lyse" || stalled ? e.t : 0,
  };
}

/**
 * The three still frames a sequence reduces to under `prefers-reduced-motion`.
 *
 * NOT A DEGRADED FALLBACK. A cross-fade between "assembled" and "stopped on
 * the wall" is arguably the clearer teaching artefact, because the comparison
 * is held still instead of having to be remembered across two seconds.
 */
export function stillFrames(verb: Verb): readonly number[] {
  const steps = SEQUENCE[verb];
  let elapsed = 0;
  const out: number[] = [];
  for (const s of steps.slice(0, 3)) {
    elapsed += s.ticks;
    out.push(elapsed - 1);
  }
  return out;
}
