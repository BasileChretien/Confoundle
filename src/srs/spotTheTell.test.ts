import { describe, expect, it } from "vitest";
import { TestItem } from "../puzzles/testItems";
import type { TestItem as Item } from "../puzzles/testItems";
import { itemBank } from "../puzzles/itemBank";
import { ALL_DICTIONARIES as DICTIONARIES } from "../app/translations/all";
import {
  gradeSpot,
  hasSpot,
  segmentJoin,
  spottable,
  spottableShare,
  withOneSpot,
} from "./spotTheTell";

const t = (en: string) => ({ en });

/** A trap whose scenario is three clauses, the middle one doing the damage. */
const annotated: Item = {
  id: "x-annotated",
  scenario: t("One thing happened. Then a second thing. Then a third."),
  trap: "simpsons-paradox",
  explanation: t("Because of the second thing."),
  spot: {
    segments: [t("One thing happened."), t("Then a second thing."), t("Then a third.")],
    tell: 1,
    why: t("The second clause is where the group changed."),
  },
};

const plain: Item = {
  id: "x-plain",
  scenario: t("Nothing to point at here."),
  trap: "simpsons-paradox",
  explanation: t("Still a trap."),
};

const sound: Item = {
  id: "x-sound",
  scenario: t("This one is fine."),
  trap: null,
  explanation: t("Sound."),
};

describe("which items can ask the clause question", () => {
  it("narrows the type, so a caller keeps the annotation", () => {
    expect(hasSpot(annotated)).toBe(true);
    expect(hasSpot(plain)).toBe(false);
    if (hasSpot(annotated)) expect(annotated.spot.tell).toBe(1);
  });

  it("filters and counts", () => {
    expect(spottable([annotated, plain, sound]).map((i) => i.id)).toEqual(["x-annotated"]);
    expect(spottableShare([annotated, plain, sound, plain])).toBeCloseTo(0.25, 10);
    expect(spottableShare([])).toBe(0);
  });
});

describe("grading a tap", () => {
  it("compares the INDEX, not the text", () => {
    // Two clauses may legitimately read the same. Comparing strings would call
    // a tap on the wrong one correct.
    const repeated: Item = {
      ...annotated,
      scenario: t("It rose. It rose. Then it fell."),
      spot: {
        segments: [t("It rose."), t("It rose."), t("Then it fell.")],
        tell: 1,
        why: t("The second one."),
      },
    };
    if (!hasSpot(repeated)) throw new Error("expected an annotation");
    expect(gradeSpot(repeated, 0).correct).toBe(false);
    expect(gradeSpot(repeated, 1).correct).toBe(true);
  });

  it("reports the tell so the view can highlight it after a wrong tap", () => {
    if (!hasSpot(annotated)) throw new Error("expected an annotation");
    expect(gradeSpot(annotated, 0)).toEqual({ correct: false, tell: 1 });
    expect(gradeSpot(annotated, 1)).toEqual({ correct: true, tell: 1 });
  });
});

describe("what sits between the clauses", () => {
  it("is a space in the eight locales that use one", () => {
    for (const l of ["en", "fr", "es", "pt", "ru", "hi", "bn", "ar"]) {
      expect({ l, join: segmentJoin(l) }).toEqual({ l, join: " " });
    }
  });

  it("is nothing in Japanese and Chinese", () => {
    expect(segmentJoin("ja")).toBe("");
    expect(segmentJoin("zh")).toBe("");
  });

  it("reads the language subtag, so a regional code cannot slip past", () => {
    expect(segmentJoin("zh-Hans")).toBe("");
    expect(segmentJoin("ja-JP")).toBe("");
    expect(segmentJoin("pt-BR")).toBe(" ");
  });
});

describe("guaranteeing a round reaches the second beat", () => {
  /**
   * A SECOND ANNOTATED ITEM, and it is the whole reason this bank is not the
   * obvious one-of-each.
   *
   * The first version of these tests used a bank holding exactly one annotated
   * item, and the test named "leaves a draw that already has one alone" passed
   * with the early return DELETED: with the only candidate already drawn, the
   * filter emptied the pool and the function returned the draw unchanged for a
   * different reason than the one being asserted. Two distinct candidates mean
   * the swap has somewhere to go, so removing the early return really does
   * change the answer and the test really does test it.
   */
  const other: Item = { ...annotated, id: "x-annotated-2" };
  const bank = [plain, plain, annotated, other, sound];

  it("swaps one in when the draw contains none", () => {
    const out = withOneSpot([plain, sound], () => 0, bank);
    expect(out.filter(hasSpot)).toHaveLength(1);
    expect(out).toHaveLength(2);
  });

  it("leaves a draw that already has one completely alone", () => {
    const drawn = [annotated, plain, sound];
    expect(withOneSpot(drawn, () => 0, bank)).toEqual(drawn);
  });

  it("keeps every id distinct, however it got there", () => {
    // NOT an isolation test for the `present` filter, which is unreachable as
    // a difference: a draw containing an annotated item has already returned
    // above, so no candidate can collide with one. Asserted anyway because the
    // property is what callers rely on, and stated plainly so that nobody
    // later reads a green test as proof that the filter is load-bearing.
    const out = withOneSpot([plain, sound], () => 0, bank);
    expect(new Set(out.map((i) => i.id)).size).toBe(out.length);
  });

  it("returns the draw unchanged when the bank has nothing to offer", () => {
    const drawn = [plain, sound];
    expect(withOneSpot(drawn, () => 0, [plain, sound])).toEqual(drawn);
  });

  it("survives a generator that always returns its top value", () => {
    // The failure `drawRound` already documents: a seeded generator pinned at
    // one end must not index past the array.
    const out = withOneSpot([plain, sound], () => 0.999999, bank);
    expect(out.filter(hasSpot)).toHaveLength(1);
    expect(out.every((i) => i !== undefined)).toBe(true);
  });
});

describe("the annotations the bank actually carries", () => {
  const annotatedItems = spottable(itemBank());

  it("has enough of them that a round can guarantee one", () => {
    // Below this the swap has nothing to swap in and the second verb silently
    // does not exist, which would read as a broken view rather than an empty
    // pool.
    expect(annotatedItems.length).toBeGreaterThanOrEqual(8);
  });

  it("joins every one of them back into its own scenario", () => {
    // The schema enforces this at load, so this is the guard on the guard: if
    // the refinement were ever loosened, the text a player taps could drift
    // from the text they read and nothing else would notice.
    const broken = annotatedItems
      .filter((i) => i.spot.segments.map((s) => s.en).join(" ") !== i.scenario.en)
      .map((i) => i.id);
    expect(broken).toEqual([]);
  });

  it("puts the tell inside the segments and never on a sound item", () => {
    for (const i of annotatedItems) {
      expect(i.spot.tell).toBeLessThan(i.spot.segments.length);
      expect(i.trap).not.toBeNull();
    }
  });

  it("never makes the whole scenario one clause, which would answer itself", () => {
    for (const i of annotatedItems) expect(i.spot.segments.length).toBeGreaterThanOrEqual(3);
  });
});

describe("the schema, on the annotation it now allows", () => {
  const parse = (d: unknown) => TestItem.safeParse(d);

  it("accepts the annotated item", () => {
    expect(parse(annotated).success).toBe(true);
  });

  it("refuses segments that do not join back to the scenario", () => {
    expect(
      parse({
        ...annotated,
        spot: { ...annotated.spot!, segments: [t("One thing happened."), t("Then a second thing."), t("Something else.")] },
      }).success,
    ).toBe(false);
  });

  it("refuses a tell that names no segment", () => {
    expect(parse({ ...annotated, spot: { ...annotated.spot!, tell: 3 } }).success).toBe(false);
  });

  it("refuses an annotation on sound reasoning", () => {
    expect(parse({ ...annotated, trap: null }).success).toBe(false);
  });

  it("refuses fewer than three clauses, which would be a coin toss", () => {
    expect(
      parse({
        ...annotated,
        scenario: t("One thing happened. Then a second thing."),
        spot: {
          segments: [t("One thing happened."), t("Then a second thing.")],
          tell: 1,
          why: t("The second."),
        },
      }).success,
    ).toBe(false);
  });

  it("still accepts an item with no annotation at all", () => {
    expect(parse(plain).success).toBe(true);
    expect(parse(sound).success).toBe(true);
  });
});

/**
 * THE TAPPABLE TEXT AND THE READ TEXT ARE THE SAME TEXT, IN EVERY LANGUAGE.
 *
 * The English half of this is enforced by `TestItem` itself, at load. This is
 * the other nine, and it is worth a test rather than a hope because of how the
 * translations were produced: each segment was cut out of the scenario
 * translation that was already in the dictionary, so no clause was translated
 * twice and the two cannot disagree. That property is easy to lose. A
 * translator improving one string and not the other, or a future annotation
 * written the obvious way by translating the clauses fresh, would leave a
 * screen whose paragraph reads one way before the tap and another after it,
 * and nothing else in the suite would notice.
 *
 * `coverage.test.ts` guarantees every key resolves, so a miss here is a real
 * disagreement rather than a fallback to English.
 */
describe("the clauses join back to the scenario in all ten languages", () => {
  const annotatedItems = spottable(itemBank());

  it.each(Object.keys(DICTIONARIES))("%s", (locale) => {
    const d = DICTIONARIES[locale as keyof typeof DICTIONARIES];
    const say = (text: { en: string }) => d[text.en] ?? text.en;
    const joiner = segmentJoin(locale);
    const broken = annotatedItems
      .filter((i) => i.spot.segments.map(say).join(joiner) !== say(i.scenario))
      .map((i) => i.id);
    expect({ locale, broken }).toEqual({ locale, broken: [] });
  });

  it("checked all nine translations and not just English", () => {
    // A guard on the guard: if the dictionary import ever came back empty the
    // block above would pass by iterating nothing.
    expect(Object.keys(DICTIONARIES)).toHaveLength(9);
    expect(annotatedItems.length).toBeGreaterThanOrEqual(8);
  });
});
