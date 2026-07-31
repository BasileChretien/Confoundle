import { describe, it, expect } from "vitest";
import { LESSON_PAGE } from "./lessonPageStrings";
import { LOCALES } from "../app/locales";

/**
 * The same enforcement ui.test.ts applies to the interface strings, applied to
 * the shareable lesson page's chrome, and for a sharper reason: this table
 * exists because the strings in it shipped as English in nine languages for as
 * long as the pages existed, and nobody noticed. Falling back to English is the
 * designed behaviour of a dictionary miss, so an untranslated string here has
 * no symptom at all beyond somebody eventually reading the page.
 *
 * Neither of the other two tests can see this table. The dictionary coverage
 * test walks puzzles, test items and tags; ui.test.ts walks app/ui.ts.
 */
const CODES = LOCALES.map((l) => l.code);

describe("the lesson page's chrome", () => {
  it("covers every locale the app offers", () => {
    expect(CODES.length).toBe(10);
    for (const [key, text] of Object.entries(LESSON_PAGE)) {
      const missing = CODES.filter(
        (code) => !(text as Record<string, string>)[code]?.trim(),
      );
      expect({ key, missing }).toEqual({ key, missing: [] });
    }
  });

  it("carries no locale the app cannot serve", () => {
    // A key for a locale that is not in LOCALES is dead weight that reads as
    // coverage, and would hide the string being genuinely missing if the app
    // ever spelled that locale differently.
    for (const [key, text] of Object.entries(LESSON_PAGE)) {
      const stray = Object.keys(text).filter((code) => !CODES.includes(code));
      expect({ key, stray }).toEqual({ key, stray: [] });
    }
  });
});
