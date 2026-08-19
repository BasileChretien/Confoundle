import { describe, it, expect } from "vitest";
import { ACCOUNT, LESSON_SHARE, UI } from "./ui";
import { LOCALES } from "./locales";

/**
 * Chrome strings are translated too, and enforced rather than remembered.
 *
 * The dictionary coverage test in app/translations only walks puzzles, test
 * items and tags, so nothing there can see these. Without this test a string
 * added to the account panel would ship as English in nine languages and stay
 * that way indefinitely, because there is no failure to notice.
 */
const CODES = LOCALES.map((l) => l.code);

describe("interface strings", () => {
  it("covers every locale the app offers", () => {
    expect(CODES.length).toBe(10);
    for (const [name, block] of [
      ["UI", UI],
      ["ACCOUNT", ACCOUNT],
      ["LESSON_SHARE", LESSON_SHARE],
    ] as const) {
      for (const [key, text] of Object.entries(block)) {
        const missing = CODES.filter((code) => !text[code]?.trim());
        expect({ block: name, key, missing }).toEqual({
          block: name,
          key,
          missing: [],
        });
      }
    }
  });

  it("keeps the interpolation slot in every translation of a string that has one", () => {
    // "{n} skills in sync" is the only templated string; a translation that
    // drops the placeholder silently loses the number.
    for (const [key, text] of Object.entries({ ...UI, ...ACCOUNT })) {
      if (!text.en.includes("{n}")) continue;
      const broken = CODES.filter((code) => text[code] && !text[code].includes("{n}"));
      expect({ key, broken }).toEqual({ key, broken: [] });
    }
  });
});

/**
 * A string in the wrong script, which is how a typo hides in a language you
 * cannot read.
 *
 * I dropped a Japanese fragment into a Russian sentence while writing the crash
 * copy, and caught it only by reading the line back. Nothing would have failed:
 * `ui.test.ts` checks that every locale HAS a string, never that the string is
 * in that locale's script, so it would have shipped to every Russian reader who
 * ever crashed the app.
 *
 * This cannot check grammar or meaning. It checks the one thing a machine can:
 * that a Latin-script language contains no CJK, Devanagari, Bengali or Arabic,
 * and vice versa. That is exactly the shape of the mistake a keyboard or a
 * careless paste produces.
 */
describe("no string wanders into another script", () => {
  /*
    THE DEVANAGARI RANGE HAS A HOLE IN IT ON PURPOSE. The danda `।` and double
    danda live at U+0964 and U+0965, inside the Devanagari block, and Bengali
    uses them as its full stop. The obvious range therefore reported all 27
    Bengali strings as containing Devanagari, which is how a guard like this
    ends up deleted for crying wolf instead of narrowed. Shared punctuation is
    excluded; the letters are not.
  */
  const BLOCKS = {
    cjk: /[぀-ヿ一-鿿]/,
    devanagari: /[ऀ-ॣ०-ॿ]/,
    bengali: /[ঀ-৿]/,
    arabic: /[؀-ۿ]/,
  };
  // Which blocks each locale is allowed to contain. Latin locales may quote a
  // proper noun in principle, so this would need relaxing if one ever does.
  const ALLOWED: Record<string, (keyof typeof BLOCKS)[]> = {
    en: [], fr: [], es: [], pt: [], ru: [],
    zh: ["cjk"], ja: ["cjk"], hi: ["devanagari"], bn: ["bengali"], ar: ["arabic"],
  };

  it("catches a stray fragment when there is one", () => {
    // The guard on the guard: the exact mistake that prompted this.
    expect(BLOCKS.cjk.test("с ошибкой,から которой")).toBe(true);
    expect(BLOCKS.cjk.test("с ошибкой, от которой")).toBe(false);
    // And the narrowing above did not narrow the guard into uselessness.
    expect(BLOCKS.devanagari.test("कुछ गड़बड़ हो गई")).toBe(true);
    expect(BLOCKS.devanagari.test("আপনার মানচিত্র শুরু করুন।")).toBe(false);
  });

  it.each(Object.keys(ALLOWED))("%s stays in its own script", (locale) => {
    const allowed = ALLOWED[locale]!;
    const offenders: string[] = [];
    for (const entry of Object.values(UI)) {
      const text = (entry as Record<string, string>)[locale];
      if (typeof text !== "string") continue;
      for (const [name, re] of Object.entries(BLOCKS)) {
        if (!allowed.includes(name as keyof typeof BLOCKS) && re.test(text)) {
          offenders.push(`${name}: ${text.slice(0, 60)}`);
        }
      }
    }
    expect(offenders).toEqual([]);
  });
});
