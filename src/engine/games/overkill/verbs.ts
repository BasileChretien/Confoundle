import { ENEMIES, type EnemyKind, type WeaponId } from "./content";
import { PORE_REACH } from "./encounter";

/**
 * WHAT EACH EFFECTOR ACTUALLY DOES, and whether it can do it here.
 *
 * The game had one causal verb. `hit()` subtracted health and `EFFECTIVE`
 * varied how much, so phagocytosis, pore formation, neutralisation and the
 * cytotoxic killing of a host cell were, on screen and in the code, the same
 * event in different colours. That is why two passes of better drawing did not
 * make anything comprehensible: mechanism does not live in the sprite, it
 * lives in the causal graph, and there was only one edge in it.
 *
 * SIX VERBS, AND THE OUTCOME IS DERIVED FROM THE PATHOGEN'S PROPERTIES rather
 * than looked up per pair. That is the whole point and it is the strongest
 * correctness check available: a citation can justify a number, but a drawing
 * has to justify a mechanism, so a verb that cannot say WHY it failed against
 * a particular target is a verb whose entry in `EFFECTIVE` nobody has thought
 * about hard enough. `verbs.test.ts` runs the derivation against the matrix
 * and requires them to agree, which is a check neither could pass alone.
 */

export type Verb =
  /** Wrap it and dissolve it. Works on things smaller than the cell doing it. */
  | "engulf"
  /** Assemble a pore and vent the contents. Defeated by a thick wall. */
  | "pore"
  /** Stick to the surface. There is no surface if it is inside one of yours. */
  | "coat"
  /** Read the badge, and kill the cell wearing the wrong one. */
  | "condemn"
  /** Burn it where it stands: reactive oxygen, and traps for what will not fit. */
  | "burn"
  /** Degranulate onto it from outside, for anything far too big even to burn. */
  | "spray"
  /** Call for help. Touches nothing, kills nothing, and is not nothing. */
  | "signal";

export const VERB: Readonly<Record<WeaponId, Verb>> = {
  neutrophil: "engulf",
  burst: "burn",
  complement: "pore",
  antibody: "coat",
  killerT: "condemn",
  nk: "condemn",
  eosinophil: "spray",
  cytokine: "signal",
};

/**
 * The largest thing a phagocyte can close around, in world units.
 *
 * A REAL LIMIT, NOT A LIST. The player's own radius is 9, and a cell cannot
 * wrap something appreciably bigger than itself. Everything at or under this
 * gets eaten and everything over it has to be attacked from the outside, which
 * is why the eosinophil exists and why it is the exact inverse of this test.
 * A pathogen added later needs no entry anywhere: its radius decides.
 */
export const ENGULF_MAX = 10.5;

/**
 * The largest thing the oxidative burst and its traps can still handle.
 *
 * THE SECOND RUNG OF A LADDER, and the ladder is the design. Size chooses the
 * strategy: under `ENGULF_MAX` a phagocyte eats it, under this a neutrophil
 * burns it where it stands or nets it, and over this the thing is a metazoan
 * and has to be attacked from the outside by something that never tries to
 * swallow anything. Three bands, three machineries, and each one derives a
 * whole row of `EFFECTIVE` from a single radius.
 *
 * This is not a metaphor imposed on the biology. Branzk et al. (Nat Immunol
 * 2014, PMID 25064073) showed neutrophils SENSE MICROBE SIZE and selectively
 * release extracellular traps for pathogens too large to phagocytose. The game
 * arrived at the same rule from the requirement that every failure be
 * drawable, which is the best evidence so far that the requirement is a good
 * one.
 */
export const BURN_MAX = 15;

export type Outcome =
  /** The verb completes and the target dies. */
  | "kills"
  /** The verb completes and the target does not die. See `engulf` on a virion. */
  | "hollow"
  /** The verb starts and cannot finish. */
  | "fails";

/**
 * What happens when `weapon` meets `kind`, from the pathogen's properties.
 *
 * Every branch here is a sentence somebody could say out loud, which is the
 * test that it is a mechanism rather than a table.
 */
export function outcomeOf(weapon: WeaponId, kind: EnemyKind): Outcome {
  const e = ENEMIES[kind];
  switch (VERB[weapon]) {
    case "engulf":
      // Too big to wrap, or hiding inside something you must not eat.
      if (e.radius > ENGULF_MAX || e.self) return "fails";
      // AND THE THIRD STATE, which is neither. A phagocyte closes around a
      // virion perfectly well and then has nothing that harms it: swallowed,
      // not killed. Without this the derivation would insist a neutrophil
      // beats influenza, and the matrix would be right and the drawing wrong.
      if (e.intracellular || e.cls === "freeVirion") return "hollow";
      return "kills";

    case "pore":
      // The membrane attack complex spans a membrane and cannot span a thick
      // peptidoglycan layer. And it does not open your own cells, which carry
      // CD46, CD55 and CD59 precisely to stop it.
      if (e.self) return "fails";
      if (e.wall >= PORE_REACH) return "fails";
      // The pore opens, and on a virion there is nothing inside to come out.
      // Complement does breach an envelope; it is not what destroys influenza.
      return e.cls === "freeVirion" ? "hollow" : "kills";

    case "coat":
      // An antibody binds a surface. A virus inside one of your cells has none
      // that faces out, so the antibody arrives and has nowhere to land.
      if (e.intracellular) return "fails";
      // Coating a bacterium does not kill it; it marks it for something that
      // can. The hollow state is the honest one and it is what makes
      // opsonisation visible rather than asserted.
      return e.cls === "freeVirion" ? "kills" : "hollow";

    case "condemn":
      // There is only one thing to condemn: a cell of yours that has been
      // taken over. A free virion is not a cell and presents no badge at all.
      return e.intracellular ? "kills" : "fails";

    case "burn":
      // Reactive oxygen and extracellular traps. It does not fire on your own
      // cells, it has nothing to oxidise in a virion, which is not a living
      // thing, and a metazoan is simply beyond it.
      if (e.self) return "fails";
      if (e.cls === "freeVirion") return "fails";
      return e.radius <= BURN_MAX ? "kills" : "fails";

    case "spray":
      // Degranulating onto one of your own cells is not a defence, it is
      // damage. And spraying something another cell could simply have eaten,
      // or burned, is a sledgehammer missing a walnut.
      if (e.self) return "fails";
      return e.radius > BURN_MAX ? "kills" : "fails";

    case "signal":
      // It never touches anything, so it never fails against anything.
      return "hollow";
  }
}

/** Whether the verb runs to completion, whatever the target's fate. */
export function completes(weapon: WeaponId, kind: EnemyKind): boolean {
  return outcomeOf(weapon, kind) !== "fails";
}

/**
 * WHICH STEP THE FAILURE STOPS AT, which is the entire teaching content.
 *
 * A failure animation is the success animation interrupted at the step that
 * cannot complete, so every failing pair has to name that step. A pair that
 * cannot is a pair whose matrix entry is a number nobody justified.
 */
export type Blocker =
  /** The arms cannot meet round it. */
  | "tooLarge"
  /** The wall is thicker than the pore is long. */
  | "wall"
  /** It is inside one of your own cells and has no surface facing out. */
  | "hidden"
  /** There is no badge to read, because it is not a cell. */
  | "noBadge"
  /** It is one of yours, and this would be friendly fire. */
  | "self"
  /** It is small enough for something else, so this machinery is oversized. */
  | "tooSmall"
  /** There is no living chemistry here to poison. */
  | "inert";

export function blockerOf(weapon: WeaponId, kind: EnemyKind): Blocker | null {
  if (completes(weapon, kind)) return null;
  const e = ENEMIES[kind];
  switch (VERB[weapon]) {
    case "engulf":
      return e.self ? "self" : "tooLarge";
    case "pore":
      return e.self ? "self" : "wall";
    case "coat":
      return "hidden";
    case "condemn":
      return "noBadge";
    case "burn":
      if (e.self) return "self";
      if (e.cls === "freeVirion") return "inert";
      return "tooLarge";
    case "spray":
      return e.self ? "self" : "tooSmall";
    case "signal":
      return null;
  }
}
