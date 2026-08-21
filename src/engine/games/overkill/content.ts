/**
 * The tuning table: what the weapons do, what the enemies are, when they come.
 *
 * SEPARATE FROM `sim.ts` ON PURPOSE. The simulation is the part that has to be
 * right; this is the part that has to be BALANCED, and the two fail in
 * completely different ways and get fixed by completely different work. The
 * numbers here are a starting point chosen to realise the design, not a
 * measured result, and they are expected to move once the headless policy
 * tests can say which of them make diagnosis necessary.
 *
 * WHAT THE DESIGN NEEDS FROM THESE NUMBERS, so a later tuner knows what is
 * load bearing and what is arbitrary:
 *
 *   - Lightning must post an enormous share of the damage and buy little
 *     survival. It gets there by hitting many weak things at long range, most
 *     of which were never going to reach the player. That surplus is measured
 *     as `overkill` and is the first way the meter misleads.
 *
 *   - Ice must post almost NO damage and be close to load bearing. It is the
 *     second and better way the meter misleads, because it changes the
 *     outcome without touching the quantity the meter reports. Its damage is
 *     deliberately a rounding error.
 *
 *   - No weapon may be generally good, or a player can win by feeding the
 *     biggest bar and never asking the question.
 *
 *   - But specialisation may not become a lookup table either, which is the
 *     opposite failure and the harder one. That is a property of the PHASES
 *     below rather than of the weapons: the same enemy needs different answers
 *     depending on how many arrive and what arrives alongside it.
 */

export type WeaponId = "lightning" | "knife" | "fire" | "ice" | "poison" | "orb";
export type EnemyKind = "chaff" | "hunter" | "brute";

export const TICK_HZ = 60;
export const DT = 1 / TICK_HZ;

/** Eight seconds, per the design. Long enough to be frightening. */
export const CUT_TICKS = 8 * TICK_HZ;
export const CUTS_PER_RUN = 3;

/** Where the ring of spawns sits, and how far out an enemy is culled. */
export const SPAWN_RADIUS = 430;

/**
 * How much of the ring gets folded round to the side the player is walking
 * towards.
 *
 * WITHOUT THIS THE GAME HAS NO TEETH, and the discovery is worth recording
 * because it invalidated a whole tuning pass. Spawns land on a ring centred on
 * the player, so a player who simply runs in one direction outpaces anything
 * slower than they are and can never be caught. Every weapon that slows things
 * down then wins the game outright on its own, ice included, which is the
 * opposite of no weapon being generally good; and the first version of the
 * tuning had exactly that, with an eight minute run that refused to end.
 *
 * Biasing the ring forward is what the genre actually does, since spawns come
 * in at the edge of the screen and moving means meeting the ones ahead of you.
 * Running is still worth doing. It is no longer free.
 */
export const FORWARD_BIAS = 0.72;
export const DESPAWN_RADIUS = 620;

export const PLAYER_SPEED = 92;
export const PLAYER_HP = 100;
export const PLAYER_RADIUS = 9;
/** Contact damage cannot land more often than this, or a crowd deletes you. */
export const HURT_COOLDOWN = 18;

/**
 * A ceiling on live enemies. Present for a reason that is not performance:
 * without it a run that goes badly becomes a run where nothing any weapon does
 * matters, and every counterfactual collapses to the same number.
 */
export const MAX_ENEMIES = 220;

/** Cards offered at a level up. Three, per the design. */
export const OFFER_SIZE = 3;

/**
 * First upgrade at twenty seconds, then every twenty five. The first cut is
 * meant to land around 1:15, so a player needs to have made two or three
 * investment decisions before then and to have had time to grow attached to
 * one of them.
 */
export const FIRST_UPGRADE = 20 * TICK_HZ;
export const UPGRADE_EVERY = 25 * TICK_HZ;

export function isUpgradeTick(tick: number): boolean {
  return tick >= FIRST_UPGRADE && (tick - FIRST_UPGRADE) % UPGRADE_EVERY === 0;
}

export interface EnemySpec {
  readonly hp: number;
  readonly speed: number;
  readonly damage: number;
  readonly radius: number;
  /**
   * Flat reduction on every hit, and the reason no weapon is generally good.
   * A weapon that sprays nine points a time is doing nothing at all to a
   * brute, and the meter reports that honestly; what it cannot report is that
   * the brute is the thing about to kill you. Poison ignores armour, which is
   * its whole identity.
   */
  readonly armour: number;
}

export const ENEMIES: Readonly<Record<EnemyKind, EnemySpec>> = {
  /** Dies to anything. Arrives in numbers. Inflates every wide weapon. */
  chaff: { hp: 8, speed: 46, damage: 3, radius: 7, armour: 0 },
  /** Fast enough to actually arrive. This is what kills you. */
  hunter: { hp: 45, speed: 112, damage: 12, radius: 8, armour: 6 },
  /** Slow, and nothing that sprays will bring it down. */
  brute: { hp: 340, speed: 30, damage: 30, radius: 16, armour: 18 },
};

/** How a weapon chooses among the enemies inside its band. */
export type Prefer = "any" | "nearest" | "toughest";

export interface WeaponSpec {
  readonly cooldown: number;
  readonly minRange: number;
  readonly maxRange: number;
  readonly maxTargets: number;
  readonly prefer: Prefer;
  readonly damage: number;
  /** Ice only: multiplies enemy speed while it lasts. */
  readonly slowFactor?: number;
  readonly slowTicks?: number;
  /** Poison only: damage per second, applied for a while after the hit. */
  readonly poisonDps?: number;
  readonly poisonTicks?: number;
}

/**
 * Iteration order over the weapons is FIXED by this object's key order and
 * nothing may sort it. Two weapons firing at the same enemy in the same tick
 * both want the kill, and which one gets it decides whose column the kill
 * lands in; a run that resolved them in a different order would be a
 * different run.
 */
export const WEAPONS: Readonly<Record<WeaponId, WeaponSpec>> = {
  /** Wide, frequent, weak. Erases crowds and cannot dent anything solid. */
  lightning: {
    cooldown: 30,
    minRange: 0,
    maxRange: 172,
    maxTargets: 8,
    prefer: "any",
    damage: 9,
  },
  /** Kills nothing at range and destroys whatever reaches you. */
  knife: {
    cooldown: 15,
    minRange: 0,
    maxRange: 36,
    maxTargets: 1,
    prefer: "nearest",
    damage: 26,
  },
  /** Holds the ground immediately around you. */
  fire: {
    cooldown: 24,
    minRange: 0,
    maxRange: 95,
    maxTargets: 8,
    prefer: "any",
    damage: 11,
  },
  /**
   * THE ONE THE DESIGN IS ABOUT. Four tenths of a point of damage, and it
   * decides whether anything reaches you at all.
   */
  ice: {
    cooldown: 18,
    minRange: 0,
    maxRange: 124,
    maxTargets: 10,
    prefer: "any",
    damage: 0.4,
    slowFactor: 0.5,
    slowTicks: 45,
  },
  /** The only answer to a brute, and wasted on anything that dies quickly. */
  poison: {
    cooldown: 60,
    minRange: 0,
    maxRange: 220,
    maxTargets: 3,
    prefer: "toughest",
    damage: 0,
    poisonDps: 22,
    poisonTicks: 240,
  },
  /** A middle distance weapon with a hole underneath it. */
  orb: {
    cooldown: 21,
    minRange: 40,
    maxRange: 115,
    maxTargets: 2,
    prefer: "any",
    damage: 11,
  },
};

export const WEAPON_IDS = Object.keys(WEAPONS) as readonly WeaponId[];

/**
 * What actually lands. Extracted from the simulation so it can be tested on
 * its own: it is three lines and it is the whole of "no weapon is generally
 * good", so it is worth being able to state it without standing up a run.
 *
 * Poison pierces, which is its identity. Everything else is reduced flat, so a
 * weapon that sprays nine points a time does literally nothing to a brute and
 * the meter reports that honestly. What the meter still cannot say is that the
 * brute is the thing about to kill you.
 */
export function effectiveDamage(raw: number, armour: number, pierces: boolean): number {
  if (pierces) return Math.max(0, raw);
  return Math.max(0, raw - armour);
}

export const MAX_LEVEL = 8;

/** A level buys damage. Deliberately linear, so a player can feel it. */
export function levelScale(level: number): number {
  return 1 + 0.45 * (level - 1);
}

export interface Phase {
  readonly fromTick: number;
  /** One spawn every this many ticks. */
  readonly everyTicks: number;
  readonly mix: readonly (readonly [EnemyKind, number])[];
}

/**
 * The composition changes at a minute and again at three and a third, which is
 * what makes the swarm evidence rather than wallpaper: a player who reads what
 * is arriving can predict which weapon is about to matter, and a player who
 * does not has to find out by spending a cut.
 */
export const PHASES: readonly Phase[] = [
  { fromTick: 0, everyTicks: 14, mix: [["chaff", 1]] },
  { fromTick: 60 * TICK_HZ, everyTicks: 10, mix: [["chaff", 5], ["hunter", 5]] },
  { fromTick: 200 * TICK_HZ, everyTicks: 7, mix: [["chaff", 4], ["hunter", 4], ["brute", 2]] },
  /*
    THE RAMP MUST NOT STOP, and the first version of this table stopped here.

    With the last phase flat, the pressure plateaus and a player who keeps
    moving simply never dies: measured over twenty five seeds, six of nine
    scripted policies reached the six minute ceiling, so every arm reported the
    same number and the question the plan's third test asks, whether diagnosis
    is necessary, could not even be posed. A game whose difficulty stops
    climbing has no answer to "how long did you last".
  */
  { fromTick: 260 * TICK_HZ, everyTicks: 6, mix: [["chaff", 3], ["hunter", 5], ["brute", 2]] },
  { fromTick: 320 * TICK_HZ, everyTicks: 5, mix: [["chaff", 3], ["hunter", 5], ["brute", 3]] },
  { fromTick: 380 * TICK_HZ, everyTicks: 4, mix: [["chaff", 2], ["hunter", 5], ["brute", 4]] },
];

export function phaseAt(tick: number): Phase {
  let found = PHASES[0]!;
  for (const p of PHASES) if (tick >= p.fromTick) found = p;
  return found;
}
