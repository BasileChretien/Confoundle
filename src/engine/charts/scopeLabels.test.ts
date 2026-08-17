import { describe, it, expect } from "vitest";
import { ALL_DICTIONARIES as DICTIONARIES } from "../../app/translations/all";
import { DataView, type DataViewKind } from "../../puzzles/schema";
import { scopeLabel } from "./DataViewRenderer";

/**
 * Scope labels, translated under enforcement rather than by luck.
 *
 * THE HOLE THIS CLOSES. `scopeLabel(kind)` returns a BARE ENGLISH STRING and
 * its call sites wrap it as `t({ en: scopeLabel(view.kind) })`, which does
 * resolve through the dictionaries at runtime. So a translated label works
 * fine and a missing one falls back to English forever, silently, by design.
 * The problem was that nothing checked. Both of the repo's existing guards are
 * structurally blind to this call:
 *
 *  - `translations/coverage.test.ts` walks `puzzles`, `TEST_ITEMS` and `TAGS`
 *    for objects with a string `en`. Scope labels are engine chrome and live
 *    in none of those, so it never sees them.
 *  - `translations/inlineChrome.test.ts` scans source text for the literal
 *    `t({ en: "..." })` form. Here the argument is a COMPUTED value, not a
 *    literal, so its regex cannot match it either.
 *
 * All 72 labels therefore sat in the one blind spot between two tests that
 * each looked like they covered it. Nine of them were in no dictionary at all
 * and shipped English in nine languages, including "As one judge marked it"
 * and "As every judge marked it", which were masked only because the single
 * `raters` puzzle sets explicit captions on both of its views. The second
 * raters puzzle would have shipped the defect with nothing failing anywhere.
 *
 * WHY IT ENUMERATES RATHER THAN LISTS. The kinds come off `DataView.options`,
 * the runtime zod union, in the same spirit as `declaredColors.test.ts`
 * reading its list of slice-drawing renderers off `DataViewRenderer` instead
 * of hard-coding them. A view kind added in six months is covered without its
 * author knowing this test exists, which is the only version of this guard
 * worth having.
 */

/** Every `kind` the schema allows, read off the runtime union. */
function allViewKinds(): DataViewKind[] {
  return DataView.options.map(
    (option) => option.shape.kind.value as DataViewKind,
  );
}

const LOCALES = Object.keys(DICTIONARIES) as Array<keyof typeof DICTIONARIES>;

describe("scope labels", () => {
  it("enumerates the view kinds off the schema, not a hardcoded list", () => {
    const kinds = allViewKinds();
    // If this ever reads zero the test would pass vacuously while checking
    // nothing, which is the failure mode a blind scan must never have.
    expect(kinds.length).toBeGreaterThan(50);
    expect(new Set(kinds).size).toBe(kinds.length);
    expect(kinds).toContain("aggregate");
    expect(kinds).toContain("stratified");
  });

  it("gives every view kind a label, or deliberately none", () => {
    // `scopeLabel` returns "" for kinds whose figures always carry an authored
    // caption. That is allowed; what is not allowed is a label that exists and
    // is untranslated, which is the next test.
    for (const kind of allViewKinds()) {
      expect(typeof scopeLabel(kind)).toBe("string");
    }
  });

  it("has every non-empty label in all nine dictionaries", () => {
    const missing: string[] = [];

    for (const kind of allViewKinds()) {
      const label = scopeLabel(kind);
      if (label === "") continue;
      for (const locale of LOCALES) {
        if (!(label in DICTIONARIES[locale])) {
          missing.push(`${locale}: ${JSON.stringify(label)} (kind "${kind}")`);
        }
      }
    }

    expect(
      missing,
      `Scope labels missing from dictionaries. Each is a chart caption that ` +
        `would render in English to a reader who chose another language:\n` +
        missing.join("\n"),
    ).toEqual([]);
  });
});
