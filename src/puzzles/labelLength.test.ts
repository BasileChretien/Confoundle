import { describe, it, expect } from "vitest";
import { puzzles } from "./index";

/**
 * AN ANSWER IS AN ANSWER. THE ARGUMENT GOES IN THE SUBLABEL.
 *
 * The four buttons ran to 496 vertical pixels on a phone, which is most of the
 * reading window the setup beat has, and the worst puzzle spent 117 words on
 * them. Each one argued its own case in a full sentence or two, which is a
 * reading-comprehension test wearing a quiz's clothes.
 *
 * Every choice in the deck already carries a `sublabel`, and the good ones are
 * where the writing is: "the cure is the poison", "the arrow points backwards",
 * "the split was not assigned". The argument had somewhere to go the whole
 * time.
 *
 * THE LIMIT IS NOT THE POINT AND THIS TEST SAYS SO. A short label that drops
 * the discriminator is far worse than a long one, because a band nobody can
 * refute from the framing is a well-reasoning player marked wrong. That is what
 * `reverse-causality.test.ts` caught during this very change: shortening the
 * smoking band to "adjusting removes it" lost the claim that the gap GOES AWAY,
 * which is the specific claim the framing's within-stratum result refutes. The
 * label is nine words rather than four for that reason.
 *
 * So this bounds the WORST case rather than the average, and it is set above
 * the four rewritten puzzles rather than at them: it is a ratchet against the
 * next 117-word set, not a target to trim towards.
 */
const words = (s: string) => s.trim().split(/\s+/).filter(Boolean).length;

describe("the answers a player chooses between", () => {
  const totals = puzzles.map((p) => ({
    slug: p.slug,
    total: p.choices.reduce((n, c) => n + words(c.label.en), 0),
    longest: Math.max(...p.choices.map((c) => words(c.label.en))),
  }));

  it("never spends more than a hundred words on one set", () => {
    // The four worst were 117, 114, 108 and 103. Nothing may go back there.
    const over = totals.filter((t) => t.total > 100);
    expect(over.map((t) => `${t.slug}: ${t.total}`)).toEqual([]);
  });

  it("keeps every single answer under thirty words", () => {
    const over = totals.filter((t) => t.longest >= 30);
    expect(over.map((t) => `${t.slug}: ${t.longest}`)).toEqual([]);
  });

  it("gives every answer a sublabel to put the argument in", () => {
    // The instrument the rewrite depends on. If a puzzle ever ships without
    // one, its author has nowhere to move the reasoning to and the label grows
    // back.
    const missing = puzzles.flatMap((p) =>
      p.choices.filter((c) => !c.sublabel).map((c) => `${p.slug}/${c.id}`),
    );
    expect(missing).toEqual([]);
  });

  it("shortened the four it set out to shorten", () => {
    /*
      Named, so this reads as a record of what was done rather than as a bound
      that happens to hold. The count is asserted first, because a filter that
      matched nothing would make every assertion below it vacuous, which is the
      way a test like this usually fails.
    */
    const done = [
      "surrogate-endpoints",
      "healthy-adherer",
      "reverse-causality",
      "halo-effect",
    ];
    const rewritten = puzzles.filter((p) => done.includes(p.reasoningSkill));
    expect(rewritten.map((p) => p.reasoningSkill).sort()).toEqual([...done].sort());

    for (const p of rewritten) {
      const total = p.choices.reduce((n, c) => n + words(c.label.en), 0);
      expect(total, p.slug).toBeLessThan(40);
    }
  });
});
