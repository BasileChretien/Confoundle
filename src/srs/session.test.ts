import { describe, expect, it } from "vitest";
import type { TestItem } from "../puzzles/testItems";
import { itemBank } from "../puzzles/itemBank";
import { puzzles } from "../puzzles";
import {
  COUSINS,
  FOLLOW_UPS,
  NAME_OPTIONS,
  cousinsOf,
  gradeName,
  nameOptions,
  planSteps,
} from "./session";

const t = (en: string) => ({ en });

const trap = (id: string, skill = "simpsons-paradox"): TestItem => ({
  id,
  scenario: t("Something happened."),
  trap: skill,
  explanation: t("Because."),
});

const sound = (id: string): TestItem => ({
  id,
  scenario: t("Nothing wrong here."),
  trap: null,
  explanation: t("Sound."),
});

const annotated = (id: string): TestItem => ({
  ...trap(id),
  scenario: t("One. Two. Three."),
  spot: { segments: [t("One."), t("Two."), t("Three.")], tell: 1, why: t("The second.") },
});

/** Cycles, so a plan is reproducible without pretending to be random. */
function seq(values: number[]): () => number {
  let i = 0;
  return () => values[i++ % values.length]!;
}

describe("which items carry a follow-up", () => {
  it("gives every item the binary and nothing else a free pass", () => {
    const items = [trap("a"), sound("b"), trap("c")];
    const steps = planSteps(items, seq([0]));
    expect(steps.map((s) => s.beats[0])).toEqual(["judge", "judge", "judge"]);
    expect(steps).toHaveLength(items.length);
  });

  it("never asks a follow-up of sound reasoning", () => {
    // "Which trap" and "point at it" have no answer when there is no trap, and
    // inventing one would teach the habit the sound decoys exist to punish.
    const items = [sound("a"), sound("b"), sound("c")];
    const steps = planSteps(items, seq([0]));
    expect(steps.every((s) => s.beats.length === 1)).toBe(true);
  });

  it("spends the clause question wherever the annotation exists", () => {
    // Eleven items in a thousand carry one. A plan that drew one and then asked
    // the ordinary question would waste the only beat that can be hard.
    const items = [trap("a"), trap("b"), annotated("c"), trap("d")];
    const steps = planSteps(items, seq([0]), 1);
    const withBeat = steps.filter((s) => s.beats.length > 1);
    expect(withBeat).toHaveLength(1);
    expect(withBeat[0]!.item.id).toBe("c");
    expect(withBeat[0]!.beats[1]).toBe("spot");
  });

  it("names the skill on the traps that carry no annotation", () => {
    const steps = planSteps([trap("a"), trap("b")], seq([0]), 2);
    expect(steps.map((s) => s.beats[1])).toEqual(["name", "name"]);
  });

  it("hands out no more follow-ups than asked for, or than there are traps", () => {
    expect(planSteps([trap("a"), sound("b")], seq([0]), 5)
      .filter((s) => s.beats.length > 1)).toHaveLength(1);
    expect(planSteps([trap("a"), trap("b"), trap("c")], seq([0]), 0)
      .filter((s) => s.beats.length > 1)).toHaveLength(0);
  });

  it("leaves the drawn ORDER alone, which is what stops the binary leaking", () => {
    // The one decision here a reasonable person would get wrong. Only a trap
    // can carry a follow-up, so a difficulty ramp puts the traps at the end and
    // a player who has played twice knows the answer before reading.
    const items = [sound("a"), trap("b"), sound("c"), annotated("d")];
    const steps = planSteps(items, seq([0.5]), 2);
    expect(steps.map((s) => s.item.id)).toEqual(["a", "b", "c", "d"]);
  });

  it("does not always decorate the same positions", () => {
    const items = [trap("a"), trap("b"), trap("c"), trap("d")];
    const decorated = (r: () => number) =>
      planSteps(items, r, 1).find((s) => s.beats.length > 1)!.item.id;
    const seen = new Set([
      decorated(seq([0])),
      decorated(seq([0.99])),
      decorated(seq([0.4, 0.9, 0.1])),
    ]);
    expect(seen.size).toBeGreaterThan(1);
  });
});

describe("the four names a `name` beat offers", () => {
  const skills = ["simpsons-paradox", "recall-bias", "publication-bias", "anchoring", "halo-effect"];

  it("always contains the right answer", () => {
    const out = nameOptions(trap("a"), skills, seq([0]));
    expect(out).toContain("simpsons-paradox");
  });

  it("offers four when the deck can fill them", () => {
    expect(nameOptions(trap("a"), skills, seq([0]))).toHaveLength(NAME_OPTIONS);
  });

  it("never repeats an option", () => {
    const out = nameOptions(trap("a"), skills, seq([0.3, 0.7, 0.1, 0.9]));
    expect(new Set(out).size).toBe(out.length);
  });

  it("returns nothing for sound reasoning, which has no name to give", () => {
    expect(nameOptions(sound("a"), skills, seq([0]))).toEqual([]);
  });

  it("returns a short list rather than throwing when the deck is tiny", () => {
    // A short list is a usable question. An exception is a blank screen.
    const out = nameOptions(trap("a"), ["simpsons-paradox", "anchoring"], seq([0]));
    expect(out).toHaveLength(2);
    expect(out).toContain("simpsons-paradox");
  });

  it("NEVER OFFERS A NEAR-COUSIN AS A WRONG ANSWER", () => {
    // The hedge rule, applied to the bank. A player who picks a cousin has
    // given a defensible reading and would be marked wrong for it.
    const withCousin = ["prevalent-user-bias", "survivorship-bias", "anchoring", "halo-effect", "recall-bias"];
    for (let i = 0; i < 20; i++) {
      const out = nameOptions(trap("a", "prevalent-user-bias"), withCousin, seq([i / 20]));
      expect(out).not.toContain("survivorship-bias");
    }
  });
});

describe("the cousin table", () => {
  const registered = new Set(puzzles().map((p) => p.reasoningSkill));

  it("names only skills the deck actually teaches", () => {
    const unknown = [...new Set(COUSINS.flat())].filter((s) => !registered.has(s));
    expect(unknown).toEqual([]);
  });

  it("is symmetric, whichever way round it was written", () => {
    for (const [a, b] of COUSINS) {
      expect({ pair: [a, b], has: cousinsOf(a).has(b) }).toEqual({ pair: [a, b], has: true });
      expect({ pair: [b, a], has: cousinsOf(b).has(a) }).toEqual({ pair: [b, a], has: true });
    }
  });

  it("never pairs a skill with itself", () => {
    expect(COUSINS.filter(([a, b]) => a === b)).toEqual([]);
  });

  it("lists no pair twice", () => {
    const keys = COUSINS.map(([a, b]) => [a, b].sort().join("|"));
    expect(new Set(keys).size).toBe(keys.length);
  });

  it("leaves enough room to fill an option list after exclusions", () => {
    // A skill with so many cousins that four options cannot be drawn would
    // silently produce a shorter, easier question.
    const thin = [...registered].filter(
      (s) => registered.size - 1 - cousinsOf(s).size < NAME_OPTIONS - 1,
    );
    expect(thin).toEqual([]);
  });
});

describe("grading a name", () => {
  it("is the trap id and nothing else", () => {
    expect(gradeName(trap("a"), "simpsons-paradox")).toBe(true);
    expect(gradeName(trap("a"), "anchoring")).toBe(false);
  });

  it("is never true for sound reasoning, even for an untyped caller", () => {
    expect(gradeName(sound("a"), "simpsons-paradox")).toBe(false);
    // The interesting case, and the only one the null check earns its keep on.
    // TypeScript forbids it, so under types alone the check is redundant and a
    // test that omitted this line would pass with it deleted. A caller reaching
    // this module from untyped code, which the app's own JSON-ish item data is
    // one step away from, would otherwise have a sound item name itself.
    expect(gradeName(sound("a"), null as unknown as string)).toBe(false);
  });
});

describe("a session over the real bank", () => {
  const bank = itemBank();

  it("can fill its follow-ups from what the bank holds", () => {
    const eight = bank.slice(0, 40).filter((i) => i.trap !== null).slice(0, 8);
    const steps = planSteps(eight, seq([0.2, 0.7, 0.5]), FOLLOW_UPS);
    expect(steps.filter((s) => s.beats.length > 1)).toHaveLength(FOLLOW_UPS);
  });

  it("asks a name question whose options are all real skills", () => {
    const skills = [...new Set(puzzles().map((p) => p.reasoningSkill))];
    const item = bank.find((i) => i.trap !== null)!;
    const out = nameOptions(item, skills, seq([0.1, 0.6, 0.35]));
    expect(out.every((s) => skills.includes(s))).toBe(true);
    expect(out).toContain(item.trap);
  });
});
