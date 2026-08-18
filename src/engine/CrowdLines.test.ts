import { describe, it, expect, beforeAll } from "vitest";
import { createElement } from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { LocaleProvider } from "../app/i18n";
import { loadDictionary } from "../app/translations";
import type { Distribution } from "../app/answerStats";
import { CrowdLinesView } from "./CrowdLines";

/**
 * The two crowd sentences, rendered.
 *
 * WHY RENDERING AND NOT SCANNING. `inlineChrome.test.ts` proves the English
 * source of each sentence has a key in all nine dictionaries, and the unit
 * tests beside `formatShare` prove the arithmetic. Neither watches the two
 * meet. A slot spelled one way in the source and another in a dictionary, a
 * sentence that resolves to English because it was never wrapped, a numeral
 * built from a hardcoded locale: all three pass both of those and are visible
 * here, because this is the string a player reads.
 *
 * `renderToStaticMarkup` runs no effects, which is why `CrowdLinesView` takes
 * its tally as a prop. Testing the fetching shell instead would assert only
 * that an unloaded component draws nothing.
 */

const dist = (over: Partial<Distribution> = {}): Distribution => ({
  total: 400,
  choices: [
    { choiceId: "trap", count: 240 },
    { choiceId: "right", count: 160 },
  ],
  // Deliberately NOT the same percentage as the company line above, which is
  // 60%. When both lines compute to one number, an assertion naming that
  // number cannot say which line produced it, and a mutation hardcoding the
  // locale at one of the two call sites survives the whole file.
  certain: [
    { choiceId: "trap", count: 75 },
    { choiceId: "right", count: 25 },
  ],
  ...over,
});

function render(d: Distribution | null, locale = "en"): string {
  return renderToStaticMarkup(
    createElement(LocaleProvider, {
      locale,
      children: createElement(CrowdLinesView, {
        dist: d,
        choiceId: "trap",
        correctChoiceId: "right",
        wasCorrect: false,
      }),
    }),
  );
}

describe("CrowdLinesView", () => {
  beforeAll(async () => {
    await loadDictionary("ja");
    await loadDictionary("bn");
  });

  it("draws nothing at all before the tally arrives", () => {
    // Not a spinner and not a zero: the reveal must never wait on the network.
    expect(render(null)).toBe("");
  });

  it("says what share of the certain players were wrong", () => {
    // 75 of the 100 certain players picked the trap, against 60% of the 400
    // players overall: the two lines must not agree by construction.
    expect(render(dist())).toContain(
      "75% of players who said they were certain got this wrong.",
    );
    expect(render(dist())).toContain("60% of players fell for the same one.");
  });

  it("draws the company line and the certainty line as separate sentences", () => {
    const html = render(dist());
    expect(html).toContain("of players fell for the same one.");
    expect(html).toContain("who said they were certain");
    // Two paragraphs, so a translator is never handed a fragment to glue.
    expect(html.match(/<p>/g)).toHaveLength(2);
  });

  it("keeps the certainty line when the player's own option is untallied", () => {
    // Their answer never reached the server, so the company line has nothing
    // to say. The certain subgroup is unaffected and still does.
    const html = render(dist({ choices: [{ choiceId: "right", count: 400 }] }));
    expect(html).not.toContain("fell for the same one");
    expect(html).toContain("who said they were certain");
  });

  it("resolves both sentences in a language that is not English", () => {
    const html = render(dist(), "ja");
    // The English source of either sentence appearing here means a key that
    // never reached the dictionaries, which is how nine chart captions shipped.
    expect(html).not.toContain("of players");
    expect(html).toContain("確信あり");
  });

  it("draws the reader's own numerals, not the runtime's", () => {
    // Bengali digits. A hardcoded "en-US", or an argument-less Intl, draws
    // Latin ones and every other assertion in this file still passes.
    const html = render(dist(), "bn");
    expect(html).toContain("৬০%"); // the company line
    expect(html).toContain("৭৫%"); // the certainty line
    expect(html).not.toContain("60");
    expect(html).not.toContain("75");
  });
});
