import { type EnemyKind, type WeaponId } from "./content";

/**
 * The colours, in one place because two files draw with them.
 *
 * Split out of `render.ts` when the immune cells got their own module: the
 * cells need the palette and the renderer needs the cells, and a cycle between
 * two modules that each own half the drawing is the sort of thing that works
 * until a bundler splits them and then does not.
 */

/**
 * S. aureus is gold because S. aureus is gold: the name is Latin for golden,
 * after the colour of its colonies. When the fiction and the fact agree for
 * free, take it.
 */
export const ENEMY_COLOR: Readonly<Record<EnemyKind, string>> = {
  coli: "#65A30D",
  aureus: "#CA8A04",
  virion: "#DB2777",
  infected: "#9333EA",
  candida: "#D6D3D1",
  worm: "#B45309",
};

/**
 * Drawing a tick, as a white blood cell fighting its way through an infection.
 *
 * THE SUBJECT IS THE POINT, not decoration on top of one. A neutrophil against
 * bacteria, viruses and something antibiotics have stopped touching is a scene
 * anybody recognises in a second, and it puts the game's actual question,
 * which of these is doing the work, in the one setting where a reader of this
 * app has met it before. The previous version drew coloured dots fighting
 * other coloured dots, which is legible to nobody.
 *
 * WEAPONS ARE ON SCREEN AT ALL TIMES, which is the other thing that was
 * missing. Before, a weapon existed only as a flash at the instant it hit, so
 * a player could not see what they had, could not see it improve, and had no
 * picture in their head to attach the meter's numbers to. Now the antibodies
 * orbit, the killer T cells circle, the oxidative burst glows, and complement
 * visibly eats whatever it has attached to.
 *
 * The particles are the one piece of state the renderer owns. Nothing reads
 * them back, and they are seeded from the simulation's deterministic death
 * list, so two people watching the same run see the same thing without the
 * simulation having to know they exist.
 */

export const WEAPON_COLOR: Readonly<Record<WeaponId, string>> = {
  /** The neutrophil's own blade, which is how the manga arms them. */
  neutrophil: "#F1F5F9",
  /** The oxidative burst: bleach, essentially, at arm's length. */
  burst: "#FB923C",
  /** Complement: drills a hole and lets the pressure do the rest. */
  complement: "#A3E635",
  /** Antibodies: tag it, slow it, do almost no damage yourself. */
  antibody: "#67E8F9",
  /** A cytotoxic T cell, which only ever has one job. */
  killerT: "#C084FC",
  /** An NK cell, hunting for one of yours that stopped saying hello. */
  nk: "#FDE047",
  /** Eosinophils, named for the dye that stains them, so: rose. */
  eosinophil: "#FB7185",
  /** Cytokines: the shout that brings everyone else. */
  cytokine: "#A5B4FC",
};
