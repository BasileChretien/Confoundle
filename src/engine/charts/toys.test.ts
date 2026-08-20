import { describe, expect, it } from "vitest";
import { puzzles } from "../../puzzles";
import { canMix } from "./mixer";
import { canScreen } from "./screen";
import { canSlice } from "./subgroups";
import { hasToy } from "./toys";

/**
 * `hasToy` HAS TO BE CHECKED SOMEWHERE THAT IS NOT THE BADGE TEST.
 *
 * `toyBadge.test.ts` asks `hasToy` what the badge should say, which is right:
 * it means the view and its guard cannot drift apart. It also means that test
 * cannot catch `hasToy` being wrong, because a mutation moves both sides of
 * its assertion at once. Deleting a toy from the disjunction left all 74 of
 * those assertions green while a shipped toy lost its badge.
 *
 * So the disjunction is checked here, against the three predicates named one
 * by one. That list is the one thing in this area that is hand-kept, and it is
 * hand-kept deliberately: it is four lines, it lives beside the function it
 * describes, and the alternative is a test that agrees with any answer.
 *
 * ADDING A FOURTH TOY MEANS ADDING IT HERE. The count below is the reminder:
 * it fails on the next toy, which is the point at which somebody has to look.
 */
const PREDICATES = [
  ["canMix", canMix],
  ["canScreen", canScreen],
  ["canSlice", canSlice],
] as const;

describe("hasToy", () => {
  it.each(PREDICATES)("says yes to every puzzle %s accepts", (_name, can) => {
    const accepted = puzzles.filter((p) => can(p.setup.data));
    expect(accepted.length).toBeGreaterThan(0);
    for (const p of accepted) {
      expect({ slug: p.slug, toy: hasToy(p.setup.data) }).toEqual({
        slug: p.slug,
        toy: true,
      });
    }
  });

  it("says no to a puzzle no predicate accepts", () => {
    for (const p of puzzles) {
      const any = PREDICATES.some(([, can]) => can(p.setup.data));
      expect({ slug: p.slug, toy: hasToy(p.setup.data) }).toEqual({
        slug: p.slug,
        toy: any,
      });
    }
  });

  /**
   * The canary. Not a fact worth pinning for its own sake; it exists so that
   * adding a toy fails a test whose comment explains what to do about it,
   * rather than passing silently with the new toy left out of `hasToy`.
   */
  it("covers three toys today, and this line is the reminder to update it", () => {
    expect(PREDICATES).toHaveLength(3);
    expect(puzzles.filter((p) => hasToy(p.setup.data)).map((p) => p.slug)).toEqual([
      "kidney-stones",
      "medical-test",
      "written-in-the-stars",
    ]);
  });
});
