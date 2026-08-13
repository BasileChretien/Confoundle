import { describe, expect, it } from "vitest";
import { haloEffect } from "./halo-effect";
import { spreadOf, spreadRatio } from "../../engine/charts/conditional";

/**
 * The commit beat has to be answerable, which for this card is the whole
 * difficulty.
 *
 * The setup draws ONE row, the good essay, where the photograph moved the mark
 * by less than a point and the difference was not significant. Nothing in that
 * row licenses a direction for the poor essay: a player who reasons only from
 * what is drawn can quite properly conclude that a small effect stays small,
 * and `about-the-same` says exactly that. Marking it wrong to land the reveal
 * is the failure `docs/hedge-audit.md` catalogues and `CLAUDE.md` forbids.
 *
 * So the framing has to earn the answer key by naming the axis the question
 * turns on, WITHOUT naming the direction: how much room the cue has depends on
 * how far the work settles the mark by itself. From that, "much more" follows
 * and "about the same" requires ignoring the sentence. The surprise then lives
 * where it belongs, in the reveal, and it is the SIZE of the gap, two and a
 * half marks out of nine, plus the quiet fact that the no-photograph condition
 * sits next to the attractive one.
 *
 * This mirrors `statistical-power.test.ts`, which pins its own discriminating
 * sentence for the same reason.
 */
describe("halo effect, the commit beat", () => {
  it("names the axis in the framing, which is what earns the answer key", () => {
    // If this sentence is ever cut, `about-the-same` becomes defensible and
    // the card starts marking a well-reasoning player wrong.
    expect(haloEffect.setup.framing.en).toContain(
      "how far the essay in front of them settles the mark on its own",
    );
  });

  it("keeps the reasonable extrapolation as the trap, not as a defensible answer", () => {
    const small = haloEffect.choices.find((c) => c.id === "about-the-same");
    expect(small?.isIntuitiveTrap).toBe(true);
    expect(small?.isCorrect).toBe(false);
  });

  it("has exactly one correct answer, and it is the conditional one", () => {
    const correct = haloEffect.choices.filter((c) => c.isCorrect);
    expect(correct.map((c) => c.id)).toEqual(["much-more"]);
  });

  /**
   * The setup must not carry the poor-essay row, or there is nothing to
   * predict and the reveal restates the setup.
   */
  it("draws only the good essay at the setup, and both rows at the reveal", () => {
    expect(haloEffect.setup.initialView.kind).toBe("onerow");
    expect(haloEffect.setup.initialView.groupIds).toHaveLength(1);
    expect(haloEffect.reveal.view.kind).toBe("bothrows");
    expect(haloEffect.reveal.view.groupIds).toBeUndefined();
  });

  /**
   * The card's factual claim, checked against the derivation rather than
   * against a number retyped into the prose: the photograph is worth far more
   * on the poor essay than on the good one.
   */
  it("reconciles the two gaps the lesson rests on", () => {
    const data = haloEffect.setup.data;
    if (data.type !== "conditional") throw new Error("shape changed");
    // Good essay 6.7 against 5.9; poor essay 5.2 against 2.7.
    expect(spreadOf(data, "good")).toBeCloseTo(0.8, 5);
    expect(spreadOf(data, "poor")).toBeCloseTo(2.5, 5);
    // The reveal says the photograph was worth about three times as much once
    // the work stopped answering the question. Derived, never retyped.
    expect(spreadRatio(data, "poor", "good")).toBeGreaterThan(3);
  });
});
