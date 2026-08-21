/**
 * The tuning table and the immunology: what the effectors are, what the
 * pathogens are, and which of them actually work on which.
 *
 * SEPARATE FROM `sim.ts` ON PURPOSE. The simulation is the part that has to be
 * right; this is the part that has to be BALANCED and TRUE, and those fail in
 * completely different ways and get fixed by completely different work.
 *
 * WHY THIS FILE WAS REBUILT. An independent measurement against the previous
 * version found that the damage meter's ranking was identical in every seed:
 * the same six weapons in the same order, always. A game about diagnosis whose
 * diagnosis is a constant is learnable in two runs and pointless in three.
 *
 * The fix is that the right answer must depend on WHAT IS ATTACKING, and the
 * happiest thing about it is that the real answers are not arbitrary.
 * Complement lyses E. coli and cannot lyse S. aureus. Antibody neutralises a
 * virus in the open and is useless the moment it is inside a cell. A worm
 * cannot be eaten at all. Those are facts, they are sourced against `EFFECTIVE`
 * below, and a player who learns them by playing well has learned immunology.
 */

export type WeaponId =
  | "neutrophil"
  | "burst"
  | "complement"
  | "antibody"
  | "killerT"
  | "nk"
  | "eosinophil"
  | "cytokine";

/**
 * What a pathogen IS, which is the only thing that decides what beats it.
 *
 * Deliberately a property of the enemy rather than a name: influenza appears
 * as both `freeVirion` and `infectedCell` inside one wave, and the point of
 * that wave is that the correct answer inverts when it changes.
 */
export type PathogenClass =
  | "gramNegative"
  | "gramPositive"
  | "freeVirion"
  | "infectedCell"
  | "fungus"
  | "helminth";

export type EnemyKind = "coli" | "aureus" | "virion" | "infected" | "candida" | "worm";

export const TICK_HZ = 60;
export const DT = 1 / TICK_HZ;

/** Eight seconds. Long enough to be frightening. */
export const CUT_TICKS = 8 * TICK_HZ;
export const CUTS_PER_RUN = 3;

/**
 * Where the ring of spawns sits.
 *
 * IT USED TO BE INSIDE THE SCREEN, at 430, while the visible half-diagonal on
 * a 375 by 812 phone is 513: measured, 33% of spawns materialised inside the
 * frame. Kept CIRCULAR rather than matched to the screen, because the death
 * screen replays a recorded run on whatever device opens it, so a world whose
 * shape depended on the viewport would replay as a different game. Sized from
 * the worst plausible half-diagonal instead.
 */
export const SPAWN_RADIUS = 640;
export const DESPAWN_RADIUS = 900;

/**
 * How much of the ring gets folded round to the side the player is walking
 * towards, so that running is worth doing without being free.
 *
 * STILL A BINARY FLIP, AND IT SHOULD NOT BE. Two specialists called it a hack
 * covering for the real problem, which is that most pathogens are slower than
 * the player and therefore cannot ever catch a moving one. The better version
 * is a smooth angular distribution centred on the heading, so pressure has a
 * direction rather than a wall, and there is always a discoverable good way to
 * run. Left as it is here only because it is not what this change is about.
 */
export const FORWARD_BIAS = 0.72;

/**
 * The circle that is inside the viewport on EVERY device, since the short side
 * always shows 430 world units so its half-extent is always 215.
 *
 * Any telegraph must begin inside this, which enforces fair warning with no
 * camera-aware code in the simulation at all. Derived by a specialist after it
 * conceded that a screen-shaped world would break replay.
 */
export const SAFE_RADIUS = 215;

export const PLAYER_SPEED = 92;
export const PLAYER_HP = 100;
export const PLAYER_RADIUS = 9;
/** Contact damage cannot land more often than this. */
export const HURT_COOLDOWN = 18;

/**
 * The most damage one contact window may deal, as a fraction of maximum health.
 *
 * Everything touching the player lands at once, so without a ceiling a deep
 * encirclement is an instant, unreadable death. Forty per cent guarantees
 * three windows, 0.75 seconds, from full health to dead.
 *
 * Fifteen per cent was proposed and is too tight: six of the weakest pathogen
 * already deal 18, so the cap would bind in ordinary play and "surrounded"
 * would stop differing from "very surrounded", which deletes the only skill
 * signal a movement-only game has.
 */
export const BURST_CAP = 0.4;

/**
 * A ceiling on live pathogens. IT DOES NOT BIND IN A REAL RUN, measured: the
 * peak live count under scripted play is 84 to 121. A safety rail against a
 * tuning pass that makes something unkillable, not a mechanic.
 */
export const MAX_ENEMIES = 220;

/**
 * PATHOGEN LOAD: how many live pathogens the body tolerates before the
 * infection itself starts doing the damage, regardless of what touches you.
 *
 * THIS IS THE STAKES FIX, AND IT IS ALSO A CORRECTION TO THE BIOLOGY. The game
 * modelled harm as contact damage only, which says you are hurt because a
 * germ bumped into you. Nobody dies of that. People die of an infection that
 * is not being cleared, and the distinction is the whole difference between a
 * scratch and sepsis.
 *
 * It happens to be the only thing that can create stakes here, for a reason
 * worth writing down. Measured: PLAYER_SPEED is 92 and the bacteria move at 44
 * and 48, so a player simply walks away, and the median count of pathogens
 * within 40 units of them is ZERO, with a 99th percentile of three, even in a
 * run with 198 alive on screen. They are spread across the annulus between the
 * spawn ring at 640 and the despawn ring at 900 and they never form a wall. So
 * every proximity-based idea, crowding, blocking, contact pressure, was going
 * to fire on nothing.
 *
 * Raising speeds does not work either, and failed three times in a row for the
 * same reason each time: faster pathogens come TO the player, so kills land
 * closer, gems are easier to collect, and the arm that was already matching
 * gets stronger. At an aureus speed of 86 the matched arm went from 306
 * seconds to 600 while the mismatched arm did not move by one second. Speed is
 * a reward lever, not a punishment lever.
 *
 * A load term is immune to all of that because it does not care where anybody
 * is. It cannot be dodged, it can only be cleared, and clearing is exactly the
 * thing the loadout decides. A player who brought the wrong effectors watches
 * the screen fill and takes damage for as long as it stays full, which is the
 * consequence the briefing was always supposed to have.
 */
export const LOAD_TOLERATED_BASE = 75;

/**
 * How much more each later wave is allowed to hold.
 *
 * A FIXED CEILING PUNISHES SURVIVING, which a flat 70 did: measured over four
 * seeds, a matched run sits at 50 pathogens through the early waves and rises
 * to a 99th percentile of 123 in the late ones, not because it is failing but
 * because a wave of helminths at 420 health each takes far longer to clear
 * than a wave of E. coli at 9. A run that never gets there peaks at 63. So the
 * flat ceiling read "you reached wave five" as "you are losing", and it cost
 * the matched arm forty seconds of median survival while barely touching the
 * arm it was aimed at.
 *
 * Raising the flat ceiling to 140 fixed that and then fired on nobody, because
 * a mismatched run reaches 150 to 200 DURING WAVE ONE, where a matched run is
 * still at 50. The two never overlap at the same moment; they only overlap
 * when you ignore what wave it is. So the tolerance rises with the wave, and
 * the signal becomes "more alive than this wave should be holding" rather than
 * "a lot alive".
 */
export const LOAD_TOLERATED_PER_WAVE = 20;

export function loadTolerated(waveIndex: number): number {
  return LOAD_TOLERATED_BASE + waveIndex * LOAD_TOLERATED_PER_WAVE;
}

/** Health per second, per live pathogen above what the wave should hold. */
export const LOAD_DPS_PER_ENEMY = 0.08;

export const OFFER_SIZE = 3;
/** How many effectors may be deployed at once. */
export const LOADOUT_SIZE = 3;

/**
 * Experience needed to go from `level` to the next one.
 *
 * Levels are earned by collecting what dies, not handed out on a timer. Six
 * levels in the first twenty five seconds is not generosity, it is an
 * interruption every four seconds.
 */
export function xpToNext(level: number): number {
  return Math.round(4 + (level - 1) * 2.4 + Math.pow(level - 1, 1.95));
}

export const XP_VALUE: Readonly<Record<EnemyKind, number>> = {
  coli: 1,
  aureus: 2,
  virion: 1,
  infected: 5,
  candida: 3,
  worm: 14,
};

/** Gems inside this are pulled towards the player, and picked up inside that. */
export const MAGNET_RADIUS = 132;
export const PICKUP_RADIUS = 20;
export const GEM_SPEED = 300;
export const MAX_GEMS = 500;

/**
 * How long a gem survives before it fades.
 *
 * Without it the floor is a savings account, and worse, it taxed the wrong
 * strategy: a player running in a straight line loses gems, and one circling
 * sweeps back over their own kills every lap and collects everything anyway.
 * Twelve seconds is under a wide circle's lap time and over a tight one's.
 */
export const GEM_TICKS = 12 * TICK_HZ;

export interface EnemySpec {
  readonly cls: PathogenClass;
  readonly hp: number;
  readonly speed: number;
  readonly damage: number;
  readonly radius: number;
  /**
   * Reduction on every hit, never down to nothing: `effectiveDamage` keeps a
   * fifteen per cent trickle, because an effector doing literally zero reads
   * as a broken weapon rather than as the wrong tool for the job.
   */
  readonly armour: number;
  /**
   * How thick the outer wall is, as a fraction of the pathogen's radius.
   *
   * A NUMBER AND NOT A DRAWING DECISION, because the whole point is that the
   * membrane attack complex either reaches the membrane underneath or does
   * not, and that is arithmetic: `wall < PORE_REACH`. Complement's row in
   * `EFFECTIVE` is a consequence of this number rather than an opinion beside
   * it, and the encounter animation and the arena silhouette read the same
   * field, so the picture cannot drift from the mechanism.
   */
  readonly wall: number;
}

export const ENEMIES: Readonly<Record<EnemyKind, EnemySpec>> = {
  /** E. coli. Thin walled, and complement goes straight through it. */
  coli: { cls: "gramNegative", hp: 9, speed: 48, damage: 3, radius: 7, armour: 0 , wall: 0.1 /* a hairline wall, and complement goes straight through it */ },
  /** S. aureus. The thick wall is the whole lesson, so it is drawn thick. */
  aureus: { cls: "gramPositive", hp: 26, speed: 44, damage: 5, radius: 8, armour: 3 , wall: 0.36 /* the thick peptidoglycan the MAC cannot reach past */ },
  /**
   * A free influenza virion, out where an antibody can still reach it.
   *
   * ARMOUR ZERO, and deliberately: a capsid is not a wall, and there is no
   * anatomy here for armour to stand for. It was 2, which is most of an
   * antibody's three points of damage, so the effector that is SUPPOSED to be
   * the answer to this wave read as feeble against it. The lesson has to be
   * legible from playing, and "the right answer barely scratches it" is the
   * wrong lesson taught convincingly.
   */
  virion: { cls: "freeVirion", hp: 14, speed: 104, damage: 7, radius: 7, armour: 0 , wall: 0 /* an envelope, no wall at all */ },
  /** One of your own cells, infected. Killing it is the only thing that works. */
  infected: { cls: "infectedCell", hp: 60, speed: 34, damage: 14, radius: 12, armour: 6 , wall: 0.08 /* your own membrane, thin, and defended another way */ },
  /** Candida. The filamentous form is far too big to engulf. */
  candida: { cls: "fungus", hp: 70, speed: 38, damage: 12, radius: 13, armour: 5 , wall: 0.3 /* a chitin and glucan wall, thick enough to resist */ },
  /** A schistosome. Too large to phagocytose, and indifferent to most of you. */
  worm: { cls: "helminth", hp: 420, speed: 30, damage: 26, radius: 19, armour: 10 , wall: 0.5 /* a syncytial tegument, and far too much of it */ },
};

/**
 * THE MATRIX. How well each effector works on each class of pathogen.
 *
 * 1 is a principal defence, 0.35 contributes without being sufficient alone,
 * and 0.12 is the trickle that means "this cannot do the job". NEVER ZERO: an
 * effector that does literally nothing reads as a bug, and the player has to
 * SEE the attack land and fail rather than see nothing happen at all.
 *
 * Every row is sourced. The load-bearing ones:
 *
 *   Complement kills mainly gram negatives; gram positives resist the membrane
 *   attack complex because the peptidoglycan is too thick for C5b-9 to reach
 *   the plasma membrane (Microbiol Mol Biol Rev, mmbr.00177-20).
 *
 *   Intracellular pathogens are inaccessible to antibody and can be cleared
 *   only by destroying the infected cell; cytotoxic T cells do exactly that,
 *   before the virus can spread (Janeway's Immunobiology, NBK27101).
 *
 *   Viruses pull MHC class I off the surface to hide from T cells, which is
 *   precisely what makes them NK targets under missing-self recognition
 *   (Front Immunol 2014.00349).
 *
 *   Helminths are too large to phagocytose and carry a resistant integument;
 *   IgE coats them and eosinophils kill by antibody dependent cellular
 *   cytotoxicity (PMC2817558).
 *
 *   Neutrophils clear extracellular bacteria and fungi by phagocytosis, the
 *   oxidative burst and NETs (PMC3052948).
 */
export const EFFECTIVE: Readonly<Record<WeaponId, Readonly<Record<PathogenClass, number>>>> = {
  neutrophil: {
    gramNegative: 1, gramPositive: 1, freeVirion: 0.12,
    infectedCell: 0.12, fungus: 1, helminth: 0.12,
  },
  burst: {
    gramNegative: 1, gramPositive: 1, freeVirion: 0.12,
    infectedCell: 0.12, fungus: 1, helminth: 0.12,
  },
  complement: {
    gramNegative: 1, gramPositive: 0.12, freeVirion: 0.35,
    infectedCell: 0.12, fungus: 0.35, helminth: 0.35,
  },
  antibody: {
    gramNegative: 1, gramPositive: 1, freeVirion: 1,
    infectedCell: 0.12, fungus: 0.35, helminth: 0.35,
  },
  killerT: {
    gramNegative: 0.12, gramPositive: 0.12, freeVirion: 0.12,
    infectedCell: 1, fungus: 0.12, helminth: 0.12,
  },
  nk: {
    gramNegative: 0.12, gramPositive: 0.12, freeVirion: 0.12,
    infectedCell: 1, fungus: 0.12, helminth: 0.12,
  },
  eosinophil: {
    gramNegative: 0.12, gramPositive: 0.12, freeVirion: 0.12,
    infectedCell: 0.12, fungus: 0.35, helminth: 1,
  },
  /** Kills nothing, so these numbers never multiply anything. See below. */
  cytokine: {
    gramNegative: 1, gramPositive: 1, freeVirion: 1,
    infectedCell: 1, fungus: 1, helminth: 1,
  },
};

/** How a weapon chooses among the pathogens inside its band. */
export type Prefer = "any" | "nearest" | "toughest";

export interface WeaponSpec {
  readonly cooldown: number;
  readonly minRange: number;
  readonly maxRange: number;
  readonly maxTargets: number;
  readonly prefer: Prefer;
  readonly damage: number;
  readonly slowFactor?: number;
  readonly slowTicks?: number;
  readonly poisonDps?: number;
  readonly poisonTicks?: number;
  /** Complement goes through the wall rather than around it. */
  readonly pierces?: boolean;
  /**
   * Cytokines: recruits rather than kills, so every point of its contribution
   * lands in somebody else's bar on the meter. This is the whole reason it
   * exists. See `RECRUIT_BONUS`.
   */
  readonly recruits?: boolean;
}

/**
 * Iteration order is FIXED by this object's key order and nothing may sort it.
 * Two effectors hitting the same pathogen on the same tick both want the kill,
 * and which one gets it decides whose column it lands in.
 */
export const WEAPONS: Readonly<Record<WeaponId, WeaponSpec>> = {
  /** The neutrophil's own blade: phagocytosis, at arm's length. */
  neutrophil: {
    cooldown: 15, minRange: 0, maxRange: 44, maxTargets: 2, prefer: "nearest", damage: 24,
  },
  /** The oxidative burst. Bleach, essentially, in a ring around you. */
  burst: {
    cooldown: 24, minRange: 0, maxRange: 104, maxTargets: 8, prefer: "any", damage: 11,
  },
  /** Complement: drills a hole and lets the pressure do the rest. */
  complement: {
    cooldown: 34, minRange: 0, maxRange: 190, maxTargets: 5, prefer: "any",
    damage: 0, poisonDps: 20, poisonTicks: 150, pierces: true,
  },
  /** IgG: tags what it hits, which slows it and marks it for everything else. */
  antibody: {
    cooldown: 18, minRange: 0, maxRange: 150, maxTargets: 10, prefer: "any",
    damage: 3, slowFactor: 0.5, slowTicks: 45,
  },
  /** A cytotoxic T cell, which only ever has one job. */
  killerT: {
    cooldown: 21, minRange: 40, maxRange: 168, maxTargets: 2, prefer: "toughest", damage: 30,
  },
  /** An NK cell, looking for one of yours that has stopped saying hello. */
  nk: {
    cooldown: 26, minRange: 0, maxRange: 140, maxTargets: 3, prefer: "toughest", damage: 22,
  },
  /** Eosinophils degranulating onto something far too big to swallow. */
  eosinophil: {
    cooldown: 30, minRange: 0, maxRange: 130, maxTargets: 2, prefer: "toughest", damage: 34,
  },
  /**
   * CYTOKINES, AND THE POINT OF THEM.
   *
   * They kill nothing at all. What a neutrophil does with them is call for
   * help, and the help does the killing, so every point of their contribution
   * appears in somebody else's bar. That is confounding by mediation: the
   * meter is not lying, it is answering a different question than the one the
   * player is asking it.
   *
   * It is also the better biology. One cell recruits; it does not command.
   */
  cytokine: {
    cooldown: 90, minRange: 0, maxRange: 220, maxTargets: 0, prefer: "any",
    damage: 0, recruits: true,
  },
};

export const WEAPON_IDS = Object.keys(WEAPONS) as readonly WeaponId[];

/** How much every other deployed effector gains per level of cytokines. */
export const RECRUIT_BONUS = 0.18;

export const MAX_LEVEL = 6;

/** A level buys damage. Fewer and bigger steps than before, deliberately. */
export function levelScale(level: number): number {
  return 1 + 0.55 * (level - 1);
}

/**
 * What actually lands: the matrix, then armour, then a floor.
 *
 * The floor stops an effector becoming a silent no-op. A player must SEE the
 * wrong tool land and fail, because nothing happening reads as a bug.
 */
export function effectiveDamage(
  raw: number,
  armour: number,
  pierces: boolean,
  match: number,
): number {
  const matched = raw * match;
  if (pierces) return Math.max(0, matched);
  return Math.max(matched * 0.15, matched - armour);
}

/**
 * The lowest fraction of maximum health a hit at this match can push a target
 * to. THE WRONG TOOL NEVER FINISHES THE JOB.
 *
 * WHY THIS EXISTS. Measured, deliberately mismatching every briefing scored
 * 129 seconds, never changing your loadout scored 130, and following the
 * damage meter scored 130. Matching scored 300. So the game rewarded choosing
 * well and did not punish choosing badly: every route to not-deciding arrived
 * at the same floor, and a player had no way to discover that their answer was
 * wrong rather than merely unlucky.
 *
 * The cause was that the matrix was a minority term in its own equation. Raw
 * throughput varies 4.6x between effectors before the matrix is consulted, and
 * `levelScale` adds another 3.75x on top, so roughly 17x of non-matrix spread
 * sat against a matrix penalty of 8.3x. Complement at level 6 against a
 * helminth it "cannot do the job" on out-damaged a level 1 eosinophil, the
 * actual answer, by six times. The lesson was a rounding error next to the
 * thing the player was not supposed to be thinking about.
 *
 * A CAP RATHER THAN A MULTIPLIER, and that is the whole idea. Scaling numbers
 * further would just move the same race; a ceiling on what a mismatched hit
 * can ACHIEVE makes the match dominant by construction, because no amount of
 * levelling buys a kill. It is also better biology than "eight times slower":
 * complement does not lyse S. aureus slowly, it opsonises a little and stops.
 *
 * And it pays for the feedback problem at the same time, for free. A stalled
 * target stops dying, so the crowd stops thinning, and a change in RATE is the
 * one thing peripheral vision reads well while a thumb is busy. One enemy's
 * health stalling at a fixed fraction is a mechanism; a number going down more
 * slowly is a statistic.
 */
export function killFloor(match: number): number {
  // A principal defence finishes what it starts.
  if (match >= 1) return 0;
  // "Contributes without being sufficient alone" is a claim about SUFFICIENCY,
  // so it is drawn as one: this tier can take a target most of the way down
  // and cannot land the last quarter. Two such effectors together still
  // cannot, which is what "alone" has to mean for the word to do any work.
  if (match >= 0.35) return 0.25;
  // Cannot do the job. Lands, is felt, and gets nowhere.
  return 0.6;
}

export interface Wave {
  /** What the briefing shows. The threat, never the answer. */
  readonly headline: EnemyKind;
  readonly ticks: number;
  /** One spawn every this many ticks. */
  readonly everyTicks: number;
  readonly mix: readonly (readonly [EnemyKind, number])[];
  /**
   * A wave may change what it is halfway through, which is the best moment in
   * the design: influenza in the open becomes influenza inside your own cells,
   * and the correct answer inverts without a word being said.
   */
  readonly turnsInto?: {
    readonly atTick: number;
    readonly mix: readonly (readonly [EnemyKind, number])[];
    readonly everyTicks: number;
  };
  /** Effectors that become available at the NEXT briefing once this ends. */
  readonly unlocks?: readonly WeaponId[];
}

/**
 * FIVE WAVES, and the order is a difficulty curve and a teaching order at
 * once: each one breaks a habit the one before it rewarded.
 *
 * Innate defences act within minutes to hours; an adaptive response takes four
 * to seven days, during which innate immunity holds the line (Janeway,
 * NBK27090). So a run opens innate and the adaptive effectors arrive on their
 * own schedule, which is both true and exactly the acquisition curve a
 * roguelite wants.
 *
 * THE UNLOCK ORDER IS CONSTRAINED, and the constraint is easy to get wrong.
 * `infectedCell` appears in exactly ONE wave, so both of the things that kill
 * an infected cell have to be on the table by that wave's briefing, and
 * nothing may unlock one afterwards. The first draft of this table unlocked
 * the cytotoxic T cell at the END of the influenza wave, which made it a card
 * that could never be used for anything at all, in any run, and no test
 * anywhere would have gone red. `waves.test.ts` now proves the general
 * property off this array rather than off a memory of it: every principal
 * defence is reachable when it is needed, and no effector is dead.
 *
 * It happens to be better biology as well. NK cells are innate and act within
 * hours; cytotoxic T cells are adaptive and take days. Arriving in that order,
 * both before the virus goes intracellular, is what actually occurs.
 */
export const WAVES: readonly Wave[] = [
  {
    // Everything works. This wave exists to build the wrong habit deliberately,
    // because you cannot break a trust you have not established.
    headline: "coli",
    ticks: 55 * TICK_HZ,
    everyTicks: 13,
    mix: [["coli", 1]],
    unlocks: ["antibody", "nk"],
  },
  {
    // The same silhouette family with a visibly thicker wall, and complement
    // stops working. The first real decision, and the meter will not tell you.
    headline: "aureus",
    ticks: 65 * TICK_HZ,
    everyTicks: 15,
    mix: [["aureus", 7], ["coli", 3]],
    unlocks: ["killerT"],
  },
  {
    // Antibody neutralises in the open and is worthless the moment the virus
    // is inside. This wave turns over halfway and inverts its own answer.
    headline: "virion",
    ticks: 80 * TICK_HZ,
    everyTicks: 12,
    mix: [["virion", 1]],
    turnsInto: { atTick: 38 * TICK_HZ, mix: [["infected", 6], ["virion", 4]], everyTicks: 20 },
    unlocks: ["eosinophil"],
  },
  {
    // Back to something the innate side handles, except the filamentous form
    // is too big to engulf, so the burst matters more than the blade.
    headline: "candida",
    ticks: 75 * TICK_HZ,
    everyTicks: 20,
    mix: [["candida", 6], ["aureus", 4]],
  },
  {
    // Too large to eat. Only the effector nobody has been feeding works at all.
    headline: "worm",
    ticks: 90 * TICK_HZ,
    everyTicks: 34,
    mix: [["worm", 5], ["coli", 5]],
  },
];

/** Everything available before the first briefing. Innate, all of it. */
export const STARTING_LOADOUT: readonly WeaponId[] = [
  "neutrophil",
  "burst",
  "complement",
  "cytokine",
];

export function waveAt(index: number): Wave {
  return WAVES[Math.min(index, WAVES.length - 1)]!;
}

/** The mix in force, which a wave that turns over changes partway through. */
export function mixAt(
  wave: Wave,
  waveTick: number,
): { mix: readonly (readonly [EnemyKind, number])[]; everyTicks: number } {
  if (wave.turnsInto !== undefined && waveTick >= wave.turnsInto.atTick) {
    return { mix: wave.turnsInto.mix, everyTicks: wave.turnsInto.everyTicks };
  }
  return { mix: wave.mix, everyTicks: wave.everyTicks };
}
