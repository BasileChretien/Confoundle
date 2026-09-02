import { describe, expect, it } from "vitest";
import { ALL_DICTIONARIES as DICTIONARIES } from "../app/translations/all";
import { puzzles } from "../puzzles";
import { humanizeCategory, lessonCategories } from "./lessons";

/**
 * Category badges, translated under enforcement rather than by luck.
 *
 * THE HOLE THIS CLOSES, which is `charts/scopeLabels.test.ts`'s hole at a
 * different call site. `humanizeCategory("causal-reasoning")` returns the bare
 * English "Causal reasoning" and every call site wraps it as
 * `t({ en: humanizeCategory(p.category) })`. That resolves through the
 * dictionaries at runtime, so a translated badge works and a missing one falls
 * back to English forever, silently, by design. Nothing checked, and both of
 * the repo's translation guards are structurally unable to:
 *
 *  - `translations/coverage.test.ts` walks `puzzles`, `TEST_ITEMS` and `TAGS`
 *    for objects with a string `en`. A category is an id on a puzzle, not a
 *    `LocalizedText`, so the walk never produces the humanised form.
 *  - `translations/inlineChrome.test.ts` scans source for the literal
 *    `t({ en: "..." })` shape. Here the argument is computed, so its matcher
 *    cannot see it.
 *
 * NOTHING IS BROKEN TODAY, and that is the whole reason to write this now. All
 * four categories the deck uses are translated in all nine dictionaries; they
 * got there by somebody remembering. What did not exist was anything that
 * would notice a fifth. Authoring this card nearly supplied one: `study-design`
 * read as the better fit for a lesson about a design choice, and "Study design"
 * is in no dictionary at all, so it would have shipped an English badge on four
 * surfaces in nine languages with a green suite. The card uses
 * `causal-reasoning` instead, which is where its nearest cousin
 * `immortal-time-bias` already sits, and the guard is here so the next author
 * does not have to be lucky.
 *
 * A NOTE ON HOW THE ABSENCE WAS ALMOST MISREAD. The first check for these keys
 * was a regex over the dictionary FILES, and it reported "Measurement" missing
 * from all nine. It is present in all nine. Dictionary keys are English source
 * text and the files are large and nested; membership has to be tested against
 * the imported object, which is what the assertion below does.
 *
 * IT ENUMERATES OFF THE REGISTRY rather than listing the categories, for the
 * reason `declaredColors.test.ts` reads its renderers off `DataViewRenderer`
 * and `scopeLabels.test.ts` reads its kinds off the zod union: a category
 * introduced by a card written next year is covered without its author knowing
 * this file exists. A hand-written list would have to be maintained by exactly
 * the person least likely to know it needs maintaining.
 */

const LOCALES = Object.keys(DICTIONARIES) as Array<keyof typeof DICTIONARIES>;

describe("category badges", () => {
  it("enumerates the categories off the registry, not a hardcoded list", () => {
    const cats = lessonCategories(puzzles());
    // A guard on the guard: reading zero would pass every assertion below
    // while checking nothing.
    expect(cats.length).toBeGreaterThanOrEqual(3);
    expect(new Set(cats).size).toBe(cats.length);
    expect(cats).toContain("causal-reasoning");
  });

  it("humanises an id into the exact string the dictionaries are keyed by", () => {
    // The key IS this output, character for character, so the transformation
    // is pinned rather than assumed. A stray change here silently orphans
    // every translation of every category at once.
    expect(humanizeCategory("causal-reasoning")).toBe("Causal reasoning");
    expect(humanizeCategory("measurement")).toBe("Measurement");
    expect(humanizeCategory("a-b-c")).toBe("A b c");
  });

  it.each(LOCALES)("%s translates every category the deck actually uses", (locale) => {
    const dictionary = DICTIONARIES[locale];
    const missing = lessonCategories(puzzles())
      .map(humanizeCategory)
      .filter((label) => !(label in dictionary));
    expect({ locale, missing }).toEqual({ locale, missing: [] });
  });
});
