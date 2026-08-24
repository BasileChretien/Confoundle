import { describe, expect, it } from "vitest";
import { ENEMIES, WAVES, type EnemyKind } from "./content";
import { portraitPlan } from "./BriefingSheet";

/**
 * DOES THE BRIEFING ANNOUNCE THE WHOLE WAVE?
 *
 * It did not, and that was a breach of the oldest rule in `CLAUDE.md`: never
 * mark a well-reasoning player wrong in order to land a surprise.
 *
 * The influenza wave announces free virions and then becomes infected host
 * cells at 38 seconds. A player who reasons correctly from what they were
 * shown deploys antibody, which is the right answer to a free virion and
 * physically cannot reach a virus inside one of your own cells. The loadout is
 * locked for the wave, so there is no remedy. The game asked a question,
 * accepted the correct answer, and killed them for it, and I described that in
 * a commit message as the best moment in the design.
 *
 * The surprise worth keeping is that the answer INVERTS. The surprise that had
 * to go is that you were not told there would be a second half.
 */

const dominant = (mix: readonly (readonly [EnemyKind, number])[]): EnemyKind => {
  let best = mix[0]![0];
  let weight = -1;
  for (const [kind, w] of mix) {
    if (w > weight) {
      weight = w;
      best = kind;
    }
  }
  return best;
};

describe("the briefing shows what is coming", () => {
  const shown = (i: number) => new Set(portraitPlan(i, 360, 112).pathogens.map((p) => p.kind));

  it("names the headline of every wave", () => {
    for (let i = 0; i < WAVES.length; i++) {
      expect([...shown(i)], `wave ${i}`).toContain(WAVES[i]!.headline);
    }
  });

  it("names the second half of a wave that turns over", () => {
    // THE RULE, read off `WAVES` rather than written out for the one wave that
    // currently turns, so a second one added later is covered without its
    // author knowing this file exists.
    const turning = WAVES.map((w, i) => [w, i] as const).filter(([w]) => w.turnsInto !== undefined);
    expect(turning.length, "no wave turns over, so this proves nothing").toBeGreaterThan(0);
    for (const [wave, i] of turning) {
      const becomes = dominant(wave.turnsInto!.mix);
      expect([...shown(i)], `wave ${i} hides what it becomes`).toContain(becomes);
    }
  });

  it("draws an arrow exactly where something turns into something else", () => {
    // The arrow is the only thing carrying "and then"; without it the two
    // halves read as one mixed wave, which is a different and wrong claim.
    for (let i = 0; i < WAVES.length; i++) {
      const plan = portraitPlan(i, 360, 112);
      const turns = WAVES[i]!.turnsInto !== undefined;
      expect(plan.arrowAt === null, `wave ${i}`).toBe(!turns);
    }
  });

  it("separates the two halves so the arrow has something to point between", () => {
    for (let i = 0; i < WAVES.length; i++) {
      const plan = portraitPlan(i, 360, 112);
      if (plan.arrowAt === null) continue;
      const before = plan.pathogens.filter((p) => p.x < plan.arrowAt!.x);
      const after = plan.pathogens.filter((p) => p.x > plan.arrowAt!.x);
      expect(before.length, `wave ${i}`).toBeGreaterThan(0);
      expect(after.length, `wave ${i}`).toBeGreaterThan(0);
      // And they are different pathogens, or the arrow says nothing.
      expect(new Set(before.map((p) => p.kind))).not.toEqual(new Set(after.map((p) => p.kind)));
    }
  });

  it("keeps every drawing inside the canvas it is given", () => {
    // A silhouette clipped off the edge is a threat the player was not shown,
    // which is the same defect in a different costume.
    const w = 360;
    const h = 112;
    for (let i = 0; i < WAVES.length; i++) {
      for (const p of portraitPlan(i, w, h).pathogens) {
        // Pathogens are drawn from their centre and the widest, the worm,
        // reaches about 3.8 radii across.
        const reach = p.r * (ENEMIES[p.kind].radius > 15 ? 2 : 1.4);
        expect(p.x - reach, `wave ${i} ${p.kind} off the left`).toBeGreaterThan(-8);
        expect(p.x + reach, `wave ${i} ${p.kind} off the right`).toBeLessThan(w + 8);
      }
    }
  });
});
