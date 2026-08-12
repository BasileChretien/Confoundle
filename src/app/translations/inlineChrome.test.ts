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
 *
 * WHAT THIS STILL CANNOT SEE, and what does. It matches the CALL SITE, so a
 * string that was never wrapped in `t()` at all is invisible to it, and so is
 * one whose English is computed rather than written (`t({ en: humanize(...) })`
 * is a function call, not a literal). Both of those shipped: every glyph in
 * `engine/share/ShareCard.tsx` drew bare English onto the share image, in all
 * ten languages, and the category eyebrow beside it went through `t()` with a
 * computed key. `engine/share/shareCardLocalized.test.ts` covers that half by
 * rendering the card in six non-Latin locales and failing on any Latin word,
 * which catches what no source scan can. The two are complements: that one
 * proves a string reaches the reader translated, this one proves it is held to
 * all nine dictionaries rather than only the one that got tested.
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

interface Stripped {
  code: string;
  /**
   * A quote opened a literal that never closed, which means everything after
   * it was swallowed as string content and no call site in the rest of the
   * file was seen. That reads as a pass, so it is reported rather than
   * tolerated: a scanner that silently covers three files less than it claims
   * is the same failure it was written to catch.
   *
   * This is not hypothetical. The first version of the check flagged
   * `http.ts`, `lessonPage.ts` and `unsubscribePage.ts` on sight, because
   * `escapeHtml` contains `.replace(/"/g, "&quot;")`: a regex literal holding
   * a double quote, which opened a string that never closed. Hence the regex
   * handling below.
   */
  dangling: boolean;
}

/**
 * Where a `/` may begin a regex literal rather than a division.
 *
 * The distinction is not decidable from the character alone, which is why
 * every hand-rolled JavaScript scanner has to take a position on it. The
 * standard one holds: a regex can only appear where an expression may start,
 * so it is the preceding significant character that decides. `.replace(/"/g)`
 * qualifies on the `(`; `a / b` does not, on the `a`.
 */
const BEFORE_REGEX = new Set([
  "(", ",", "=", ":", "[", "!", "&", "|", "?", "{", "}", ";", "+", "-", "*",
  "%", "^", "~", "<", ">", "\n",
]);

/**
 * Comments are not code, and this project writes a great many of them: the
 * first version of this scan reported "The rule" as untranslated because a
 * doc comment in `lessonPageStrings.ts` quotes `t({ en: "The rule" })` while
 * explaining why that form is a trap. Stripped precisely rather than by
 * regex, because a `//` inside a string literal is common (every URL has one)
 * and cutting at it would drop real strings from the scan, which fails silent.
 */
function stripComments(source: string): Stripped {
  let out = "";
  let dangling = false;
  let i = 0;
  /** Last character that was neither whitespace nor comment. */
  let previous = "";
  const emit = (text: string) => {
    out += text;
    const trimmed = text.trimEnd();
    if (trimmed) previous = trimmed[trimmed.length - 1];
    else if (text.includes("\n")) previous = "\n";
  };

  while (i < source.length) {
    const c = source[i];
    if (c === '"' || c === "'" || c === "`") {
      let literal = c;
      i++;
      let closed = false;
      while (i < source.length) {
        const ch = source[i];
        literal += ch;
        i++;
        if (ch === "\\") {
          if (i < source.length) literal += source[i++];
          continue;
        }
        if (ch === c) {
          closed = true;
          break;
        }
      }
      if (!closed) dangling = true;
      emit(literal);
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
    if (
      c === "/" &&
      (previous === "" || BEFORE_REGEX.has(previous)) &&
      // A `/` directly after a `<` closes a JSX tag; it cannot open a regex.
      // Without this the scan silently ate every closing tag whose `<` sat
      // after a `>` or a `}`, which is most of them, and with it the rest of
      // that LINE. A call site written as `<b>{t({ en: "a" })}</b> and
      // <i>{t({ en: "b" })}</i>` therefore lost its second string, and lost it
      // the quiet way: no error, just one fewer string held to nine locales.
      source[i - 1] !== "<"
    ) {
      // A regex literal. Its body is dropped rather than kept: it can hold
      // quotes and braces that would confuse everything downstream, and it can
      // never contain a call site.
      i++;
      let inClass = false;
      while (i < source.length && source[i] !== "\n") {
        const ch = source[i];
        i++;
        if (ch === "\\") {
          i++;
          continue;
        }
        if (ch === "[") inClass = true;
        else if (ch === "]") inClass = false;
        else if (ch === "/" && !inClass) break;
      }
      while (i < source.length && /[a-z]/.test(source[i])) i++; // flags
      emit("0"); // a value stood here, so `/` after it is division
      continue;
    }
    emit(c);
    i++;
  }
  return { code: out, dangling };
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

/** Files the scanner could not parse cleanly, and so did not fully read. */
const UNPARSED: string[] = [];

function inlineStrings(): Found[] {
  const found = new Map<string, Found>();
  for (const [path, source] of Object.entries(SOURCES)) {
    if (!isScanned(path)) continue;
    const { code, dangling } = stripComments(source);
    if (dangling) UNPARSED.push(path.replace("../../", "src/"));
    for (const match of code.matchAll(INLINE)) {
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
    // Floors, not exact counts: adding a string must not fail this, but the
    // scan quietly finding a fraction of what it used to must. It reads 109
    // files and 60 strings today. A scan that has shrunk to half of that has
    // broken, and every assertion below it would still pass.
    expect(Object.keys(SOURCES).length).toBeGreaterThan(80);
    expect(INLINE_STRINGS.length).toBeGreaterThan(50);
    expect(LOCALES.length).toBe(9);
  });

  it("reads every file to the end", () => {
    // A count floor cannot catch partial coverage: if a quote the scanner
    // does not understand opens a literal that never closes, the rest of that
    // file is swallowed and its call sites are simply never seen. That reads
    // as a pass. This is the difference between a test that enforces and one
    // that only looks like it does.
    expect(UNPARSED).toEqual([]);
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
