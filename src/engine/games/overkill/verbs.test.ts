import { describe, expect, it } from "vitest";
import { EFFECTIVE, ENEMIES, WEAPON_IDS, type EnemyKind, type WeaponId } from "./content";
import { VERB, blockerOf, completes, outcomeOf } from "./verbs";

/**
 * DOES THE DRAWING AGREE WITH THE MATRIX?
 *
 * `EFFECTIVE` is 48 numbers, each justified by a citation. `outcomeOf` derives
 * the same 48 answers from four properties of the pathogen: how big it is, how
 * thick its wall is, whether the thing that must die is inside a host cell,
 * and whether the target is one of yours. The two are built from completely
 * different material and have to agree.
 *
 * That is a much stronger check than either alone, and the reason is worth
 * stating: a citation can justify a number, but a mechanism has to justify
 * itself against every other entry in its own row. When they disagree it is
 * always interesting. Both disagreements found on the first run were real.
 */

const KINDS = Object.keys(ENEMIES) as EnemyKind[];
const pairs: [WeaponId, EnemyKind][] = WEAPON_IDS.flatMap((w) =>
  KINDS.map((k) => [w, k] as [WeaponId, EnemyKind]),
);

describe("the mechanism and the matrix are the same claim", () => {
  it("completes exactly where the matrix says the effector is a principal defence", () => {
    for (const [w, k] of pairs) {
      if (VERB[w] === "signal") continue; // Recruiters multiply; they never act.
      const principal = EFFECTIVE[w][ENEMIES[k].cls] === 1;
      expect(
        outcomeOf(w, k) === "kills",
        `${w} vs ${k}: matrix says ${principal ? "principal defence" : "not"}, ` +
          `mechanism says ${outcomeOf(w, k)}`,
      ).toBe(principal);
    }
  });

  it("names a reason for every failure, because a failure without one is a number", () => {
    // The rule the encounters are built on is that a failure animation is the
    // success animation interrupted at the step that cannot complete. A pair
    // with no nameable blocker cannot be drawn, and a pair that cannot be
    // drawn is one whose matrix entry nobody thought about.
    for (const [w, k] of pairs) {
      if (completes(w, k)) {
        expect(blockerOf(w, k), `${w} vs ${k}`).toBeNull();
      } else {
        expect(blockerOf(w, k), `${w} vs ${k} fails for no stated reason`).not.toBeNull();
      }
    }
  });

  it("uses every blocker it defines", () => {
    // A reason nothing ever hits is a reason nobody has checked. Reading the
    // set off the pairs rather than listing it means a blocker added for a new
    // pathogen has to be reachable or this fails.
    const used = new Set(pairs.map(([w, k]) => blockerOf(w, k)).filter((b) => b !== null));
    expect([...used].sort()).toEqual([
      "hidden",
      "inert",
      "noBadge",
      "self",
      "tooLarge",
      "tooSmall",
      "wall",
    ]);
  });
});

describe("the four facts the waves are built on", () => {
  it("stops complement at a thick wall and not at a thin one", () => {
    expect(outcomeOf("complement", "coli")).toBe("kills");
    expect(blockerOf("complement", "aureus")).toBe("wall");
  });

  it("stops antibody at a host membrane, and lets the T cell through it", () => {
    expect(blockerOf("antibody", "infected")).toBe("hidden");
    expect(outcomeOf("killerT", "infected")).toBe("kills");
    expect(outcomeOf("nk", "infected")).toBe("kills");
  });

  it("gives the T cell nothing to read on something that is not a cell", () => {
    expect(blockerOf("killerT", "virion")).toBe("noBadge");
  });

  it("makes the worm too large to eat and therefore the eosinophil's job", () => {
    expect(blockerOf("neutrophil", "worm")).toBe("tooLarge");
    expect(outcomeOf("eosinophil", "worm")).toBe("kills");
    // And the inverse: the machinery for a worm is the wrong size for a coli.
    expect(blockerOf("eosinophil", "coli")).toBe("tooSmall");
  });

  it("swallows a virion without killing it, which is neither success nor failure", () => {
    // A phagocyte closes around a virion perfectly well and has nothing that
    // harms it. Without this third state the derivation would insist a
    // neutrophil beats influenza.
    expect(outcomeOf("neutrophil", "virion")).toBe("hollow");
    expect(blockerOf("neutrophil", "virion")).toBeNull();
  });

  it("has antibody coat a bacterium rather than kill it", () => {
    // Antibody has no intrinsic bactericidal power. It marks things for
    // something that does, which is why opsonisation has to be visible rather
    // than asserted, and why the matrix giving it 1.0 against both gram
    // classes was the game teaching the opposite of the mechanism.
    expect(outcomeOf("antibody", "coli")).toBe("hollow");
    expect(outcomeOf("antibody", "virion")).toBe("kills");
  });
});
