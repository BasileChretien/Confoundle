import { describe, it, expect } from "vitest";
import { siblingsFor } from "./lessonSiblings";
import { puzzles } from "../puzzles";

/**
 * The 730 lesson pages were isolated leaves: three links each, its source and
 * twice the site root. This is what turns them into a graph, and what stops the
 * call to action offering a reader who arrived from a search about Berkson's
 * paradox a puzzle about chocolate.
 */
describe("what a lesson page offers next", () => {
  it("never offers the page you are already on", () => {
    for (const p of puzzles) {
      expect(siblingsFor(p, puzzles).map((s) => s.slug)).not.toContain(p.slug);
    }
  });

  it("never offers the skill you have just had spoiled", () => {
    // The page prints this puzzle's answer. Another card on the same skill is
    // the one card the reader can no longer be fooled by.
    for (const p of puzzles) {
      for (const s of siblingsFor(p, puzzles)) {
        expect(s.reasoningSkill, `${p.slug} -> ${s.slug}`).not.toBe(
          p.reasoningSkill,
        );
      }
    }
  });

  it("leaves no page a leaf", () => {
    // The whole point. A puzzle whose tags are unique to it would otherwise get
    // nothing back, which is the state this is meant to remove.
    for (const p of puzzles) {
      expect(siblingsFor(p, puzzles), p.slug).toHaveLength(3);
    }
  });

  it("prefers a shared tag, so the next card is in the same world", () => {
    const p = puzzles.find((x) => x.tags.length > 0)!;
    const [first] = siblingsFor(p, puzzles);
    const shared = first!.tags.filter((t) => p.tags.includes(t));
    expect(shared.length).toBeGreaterThan(0);
  });

  it("is deterministic, because these are static files", () => {
    // The same build must produce the same page, or every deploy is a diff of
    // noise and the crawl looks unstable.
    for (const p of puzzles.slice(0, 10)) {
      expect(siblingsFor(p, puzzles).map((s) => s.slug)).toEqual(
        siblingsFor(p, puzzles).map((s) => s.slug),
      );
    }
  });

  it("does not repeat itself within one page", () => {
    for (const p of puzzles) {
      const slugs = siblingsFor(p, puzzles).map((s) => s.slug);
      expect(new Set(slugs).size, p.slug).toBe(slugs.length);
    }
  });
});

/**
 * THE TWO RULES THE REAL DECK CANNOT EXERCISE.
 *
 * Mutation testing found both: deleting the same-skill filter, and deleting the
 * fallback that stops a page being a leaf, each left all six tests above green.
 * Not because the tests are careless but because the data never binds the
 * conditions. There are 73 puzzles and 73 distinct skills, so no two can share
 * one, and every puzzle shares a tag with something, so the fallback never
 * fires.
 *
 * Both exist for cases the deck will reach: a second card on a skill is the
 * ordinary way this deck grows, and a puzzle carrying a new tag would otherwise
 * be handed nothing. Synthetic decks are the only way to prove they work, and a
 * rule proven on data that cannot violate it is not proven at all.
 */
describe("the rules today's deck cannot test", () => {
  const puzzleLike = (slug: string, skill: string, tags: string[]) =>
    ({ slug, reasoningSkill: skill, tags, lesson: { skillName: { en: slug } } }) as unknown as
      (typeof puzzles)[number];

  it("refuses a second card on the skill just spoiled", () => {
    const deck = [
      puzzleLike("a", "same-skill", ["x"]),
      puzzleLike("b", "same-skill", ["x"]),
      puzzleLike("c", "other", ["x"]),
      puzzleLike("d", "another", ["x"]),
      puzzleLike("e", "third", ["x"]),
    ];
    const got = siblingsFor(deck[0]!, deck).map((p) => p.slug);
    expect(got).not.toContain("b");
    expect(got).toEqual(["c", "d", "e"]);
  });

  it("still fills a page whose tags are shared with nothing", () => {
    const deck = [
      puzzleLike("lonely", "one", ["unique-tag"]),
      puzzleLike("b", "two", ["common"]),
      puzzleLike("c", "three", ["common"]),
      puzzleLike("d", "four", ["common"]),
    ];
    // No shared tag with anything, so without the fallback this page would
    // render no related links at all and go straight back to being a leaf.
    expect(siblingsFor(deck[0]!, deck).map((p) => p.slug)).toEqual(["b", "c", "d"]);
  });

  it("cannot fill a page when the deck genuinely has too few cards", () => {
    // Honest about the limit: the fallback finds what exists, it does not
    // invent. A two-card deck has one sibling and that is all.
    const deck = [puzzleLike("a", "one", ["x"]), puzzleLike("b", "two", ["x"])];
    expect(siblingsFor(deck[0]!, deck)).toHaveLength(1);
  });
});

describe("which sibling comes first", () => {
  it("offers the closest match, not merely a related one", () => {
    /*
      MUTATION FOUND THIS UNGUARDED. Sorting ascending, so the LEAST related
      card is offered first, passed all 27 tests: every assertion checked only
      that some sharing existed. The ordering is the recommendation, so it is
      the part worth pinning.
    */
    const p = (slug: string, skill: string, tags: string[]) =>
      ({ slug, reasoningSkill: skill, tags, lesson: { skillName: { en: slug } } }) as unknown as
        (typeof puzzles)[number];
    const deck = [
      p("home", "a", ["x", "y", "z"]),
      p("distant", "b", ["z"]),
      p("closest", "c", ["x", "y", "z"]),
      p("middling", "d", ["y", "z"]),
    ];
    expect(siblingsFor(deck[0]!, deck).map((s) => s.slug)).toEqual([
      "closest",
      "middling",
      "distant",
    ]);
  });
});
