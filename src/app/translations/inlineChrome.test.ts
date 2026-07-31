import { describe, it, expect } from "vitest";
import { ALL_DICTIONARIES as DICTIONARIES } from "./all";

/**
 * The hole the other two coverage tests leave, closed.
 *
 * `coverage.test.ts` walks puzzles, test items and tags, which is everything a
 * puzzle owns. `ui.test.ts` walks the ten-locale tables in `app/ui.ts` and
 * `server/lessonPageStrings.ts`. Between them sits a third kind of string: the
 * ones the engine writes inline at the call site as `t({ en: "Next" })`,
 * expecting the dictionaries to carry them. Nothing walked those, and the
 * dictionaries are populated by hand, so whether any given one was translated
 * came down to whether somebody remembered.
 *
 * Mostly they did. Forty-five of them were in all nine dictionaries. Twelve
 * were in none, and had been rendering English in every language for as long as
 * they had existed, including "Next" and "See your score" on the commit beat,
 * where a player meets them mid-puzzle. There was no symptom: a dictionary miss
 * falls back to English by design, which is the same thing that hid the lesson
 * pages' headings for 342 pages.
 *
 * So this reads the source rather than the module graph. That is unusual for a
 * test and it is the point: an inline string is invisible to anything that
 * imports, because by the time it is a value it is just an object with an `en`
 * key, indistinguishable from the puzzle content that is already covered. The
 * file text is the only place the call site itself is visible.
 *
 * `import.meta.glob` rather than `node:fs` because the project carries no
 * `@types/node`, and Vite's client types are already in tsconfig.
 */

/** Every source file that could hold an inline string, as text. */
const SOURCES = import.meta.glob("../../**/*.{ts,tsx}", {
  query: "?raw",
  import: "default",
  eager: true,
}) as Record<string, string>;

/**
 * Puzzle content is already covered by `coverage.test.ts`, and its files are
 * nothing but `{ en: ... }` objects, so scanning them here would just restate
 * that test with a worse failure message. Dictionaries and tests are not
 * user-facing at all.
 */
function isScanned(path: string): boolean {
  if (/\.test\.tsx?$/.test(path)) return false;
  if (path.includes("/puzzles/")) return false;
  if (path.includes("/translations/")) return false;
  return true;
}

/**
 * Comments are not code, and this project writes a great many of them: the
 * first version of this scan reported "The rule" as untranslated because a
 * doc comment in `lessonPageStrings.ts` quotes `t({ en: "The rule" })` while
 * explaining why that form is a trap. Stripped precisely rather than by
 * regex, because a `//` inside a string literal is common (every URL has one)
 * and cutting at it would drop real strings from the scan, which fails silent.
 */
function stripComments(source: string): string {
  let out = "";
  let i = 0;
  while (i < source.length) {
    const c = source[i];
    if (c === '"' || c === "'" || c === "`") {
      out += c;
      i++;
      while (i < source.length) {
        const ch = source[i];
        out += ch;
        i++;
        if (ch === "\\") {
          if (i < source.length) out += source[i++];
          continue;
        }
        if (ch === c) break;
      }
      continue;
    }
    if (c === "/" && source[i + 1] === "/") {
      while (i < source.length && source[i] !== "\n") i++;
      continue;
    }
    if (c === "/" && source[i + 1] === "*") {
      i += 2;
      while (i < source.length && !(source[i] === "*" && source[i + 1] === "/")) i++;
      i += 2;
      continue;
    }
    out += c;
    i++;
  }
  return out;
}

/**
 * An object literal whose ONLY key is `en`, which is exactly the shape of a
 * string written in English and left to the dictionaries. The closing brace has
 * to follow the string for this to match, so the ten-locale tables in `ui.ts`
 * and `lessonPageStrings.ts` are excluded by construction: they carry nine more
 * keys and need no dictionary entry, since an inline locale key wins.
 */
const INLINE = /\{\s*en:\s*("(?:[^"\\]|\\.)*")\s*,?\s*\}/g;

interface Found {
  text: string;
  file: string;
}

function inlineStrings(): Found[] {
  const found = new Map<string, Found>();
  for (const [path, source] of Object.entries(SOURCES)) {
    if (!isScanned(path)) continue;
    for (const match of stripComments(source).matchAll(INLINE)) {
      const text = JSON.parse(match[1]) as string;
      if (!text.trim()) continue;
      // First file wins, so the failure message names one place to look
      // rather than all of them.
      if (!found.has(text)) found.set(text, { text, file: path.replace("../../", "src/") });
    }
  }
  return [...found.values()];
}

const LOCALES = Object.keys(DICTIONARIES);
const INLINE_STRINGS = inlineStrings();

describe("inline chrome strings", () => {
  it("finds the call sites at all", () => {
    // If the scan silently matched nothing, every assertion below would pass
    // and the test would be worse than useless: it would read as coverage.
    expect(Object.keys(SOURCES).length).toBeGreaterThan(20);
    expect(INLINE_STRINGS.length).toBeGreaterThan(20);
    expect(LOCALES.length).toBe(9);
  });

  for (const locale of LOCALES) {
    it(`${locale} translates every string the engine writes inline`, () => {
      const dict = DICTIONARIES[locale];
      const missing = INLINE_STRINGS.filter((s) => dict[s.text] == null).map(
        (s) => `${s.text}  (${s.file})`,
      );
      expect({ locale, missing }).toEqual({ locale, missing: [] });
    });
  }

  it("keeps every interpolation slot through translation", () => {
    // "Does this fall for {skill}?" is one string with a slot rather than a
    // fragment glued to a variable, because the skill name does not fall at
    // the end of that question in Japanese, Hindi or Arabic. That only works
    // while every translation still carries the slot: drop it and the skill
    // name is silently not shown at all, which reads as a finished sentence.
    const slots = /\{[a-z]+\}/g;
    for (const { text } of INLINE_STRINGS) {
      const expected = text.match(slots);
      if (!expected) continue;
      for (const locale of LOCALES) {
        const translated = DICTIONARIES[locale][text];
        if (translated == null) continue; // already reported above
        const dropped = expected.filter((slot) => !translated.includes(slot));
        expect({ locale, text, dropped }).toEqual({ locale, text, dropped: [] });
      }
    }
  });
});
