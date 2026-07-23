import { describe, it, expect } from "vitest";
import { ALL_DICTIONARIES as DICTIONARIES } from "./all";
import { puzzles } from "../../puzzles";
import { TEST_ITEMS } from "../../puzzles/testItems";
import { TAGS } from "../../puzzles/tags";

/**
 * Translation parity, enforced rather than trusted.
 *
 * Every user-facing string a puzzle owns is authored in English and looked up
 * in each locale's dictionary by that exact English text (see app/i18n.ts). So
 * a puzzle shipped without its translations degrades silently: nine locales
 * quietly fall back to English and nobody notices. These tests make that loud.
 *
 * Two properties:
 *  1. Coverage: every authored English string exists in every dictionary.
 *  2. Parity: the dictionaries all carry the same key set, so a string added to
 *     one language cannot be forgotten in the other eight.
 */

/** Every `en` value reachable from a content object, however deeply nested. */
function collectEnglish(value: unknown, into: Set<string>): void {
  if (Array.isArray(value)) {
    for (const item of value) collectEnglish(item, into);
    return;
  }
  if (value === null || typeof value !== "object") return;

  const record = value as Record<string, unknown>;
  // A LocalizedText is exactly "an object with a string `en`". Nothing else in
  // the content model has that shape, so this identification is safe.
  if (typeof record.en === "string") {
    into.add(record.en);
    return;
  }
  for (const child of Object.values(record)) collectEnglish(child, into);
}

function authoredStrings(): string[] {
  const found = new Set<string>();
  collectEnglish(puzzles, found);
  collectEnglish(TEST_ITEMS, found);
  collectEnglish(Object.values(TAGS), found);
  return [...found];
}

const LOCALES = Object.keys(DICTIONARIES);
const STRINGS = authoredStrings();

/**
 * The failure message below is the translation worklist: it names every source
 * string a locale is missing. When starting a translation pass it is worth
 * having that list as JSON instead, so keys can be copied programmatically
 * rather than transcribed (a transcribed key that differs by one character
 * fails silently at runtime, falling back to English forever). CLAUDE.md holds
 * the throwaway recipe for dumping it.
 */

describe("translation coverage", () => {
  it("has something to check", () => {
    expect(LOCALES.length).toBe(9);
    expect(STRINGS.length).toBeGreaterThan(100);
  });

  for (const locale of LOCALES) {
    it(`${locale} translates every authored string`, () => {
      const dict = DICTIONARIES[locale];
      const missing = STRINGS.filter((s) => dict[s] == null);
      expect({ locale, missing }).toEqual({ locale, missing: [] });
    });
  }
});

describe("translation parity", () => {
  it("keeps the same key set in every locale", () => {
    const reference = LOCALES[0];
    const referenceKeys = new Set(Object.keys(DICTIONARIES[reference]));
    for (const locale of LOCALES.slice(1)) {
      const keys = Object.keys(DICTIONARIES[locale]);
      const missing = [...referenceKeys].filter(
        (k) => DICTIONARIES[locale][k] == null,
      );
      const extra = keys.filter((k) => !referenceKeys.has(k));
      expect({ locale, missing, extra }).toEqual({
        locale,
        missing: [],
        extra: [],
      });
    }
  });

  it("never leaves a translation empty", () => {
    for (const locale of LOCALES) {
      const blank = Object.entries(DICTIONARIES[locale])
        .filter(([, v]) => v.trim().length === 0)
        .map(([k]) => k);
      expect({ locale, blank }).toEqual({ locale, blank: [] });
    }
  });
});
