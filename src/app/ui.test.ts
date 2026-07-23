import { describe, it, expect } from "vitest";
import { ACCOUNT, UI } from "./ui";
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
