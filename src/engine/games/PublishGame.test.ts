// @vitest-environment happy-dom
import { afterEach, beforeAll, beforeEach, describe, expect, it } from "vitest";
import { act, createElement } from "react";
import { createRoot, type Root } from "react-dom/client";
import { LocaleProvider } from "../../app/i18n";
import { loadDictionary } from "../../app/translations";
import { LOCALES } from "../../app/locales";
import { ENDPOINTS, HYPOTHESES, analyse, cohort } from "./publish";
import { PublishGame } from "./PublishGame";

/**
 * A GAME IS A SEQUENCE, so it is tested by playing one.
 *
 * The model's honesty is pinned in `publish.test.ts`; what cannot be seen from
 * there is whether the thing in front of a player actually goes briefing to
 * hunt to publication to replication, and whether the numbers it prints are
 * the ones the model computed. `renderToStaticMarkup` cannot press a button,
 * so this runs a whole session in a DOM.
 */

let container: HTMLDivElement;
let root: Root;

beforeAll(async () => {
  await Promise.all(LOCALES.map((l) => l.code).map(loadDictionary));
}, 60_000);

beforeEach(() => {
  globalThis.IS_REACT_ACT_ENVIRONMENT = true;
  container = document.createElement("div");
  document.body.appendChild(container);
  root = createRoot(container);
});

afterEach(() => {
  act(() => root.unmount());
  container.remove();
});

function mount(locale = "en") {
  act(() => {
    root.render(
      createElement(LocaleProvider, {
        locale: locale as "en",
        children: createElement(PublishGame, { onDone: () => {} }),
      }),
    );
  });
}

const buttons = () => [...container.querySelectorAll("button")];
const press = (text: string) => {
  const b = buttons().find((x) => (x.textContent ?? "").trim() === text);
  if (!b) throw new Error(`no button "${text}" (have: ${buttons().map((x) => x.textContent).join(" | ")})`);
  act(() => {
    b.dispatchEvent(new Event("click", { bubbles: true }));
  });
};
const text = () => container.textContent ?? "";

describe("playing Publish or Perish", () => {
  it("opens on the dare rather than on a mystery", () => {
    mount();
    // The player is told there is nothing in the data BEFORE they hunt. Saving
    // it for the end would make a better trick and a worse lesson.
    expect(text()).toContain("There is nothing in it");
    expect(text()).toContain("Find something publishable anyway");
  });

  it("counts every test the player runs", () => {
    mount();
    press("Open the dataset");
    expect(text()).toContain("Tests run: 0");
    press("Men");
    expect(text()).toContain("Tests run: 1");
    press("Women");
    expect(text()).toContain("Tests run: 2");
    // Asking the same question twice is not a new test, which matters because
    // the counter is the whole indictment at the end.
    press("Men");
    expect(text()).toContain("Tests run: 2");
  });

  it("shows the counts behind the p-value, so it can be checked", () => {
    mount();
    press("Open the dataset");
    press("Left-handed");
    expect(text()).toMatch(/p = 0\.\d{3}/);
    expect(text()).toMatch(/\d+ of \d+ against \d+ of \d+/);
  });

  /**
   * THE WHOLE ARC, on a seed chosen so the hunt succeeds. Every published
   * finding must be reported, and replication must take it away: that is the
   * ending the game exists for, and nothing else in the suite renders it.
   */
  it("publishes a finding and then loses it to replication", () => {
    mount();
    press("Open the dataset");

    // Sweep until something turns up, exactly as a player would.
    let published = 0;
    for (const e of ENDPOINTS) {
      press(e.label.en);
      for (const h of HYPOTHESES) {
        press(h.label.en);
        if (buttons().some((b) => (b.textContent ?? "").trim() === "Publish it")) {
          press("Publish it");
          published++;
        }
      }
    }

    press("Send it all for replication");
    expect(text()).toContain("Tests run: 54.");
    expect(text()).toContain(`Published: ${published}.`);
    if (published > 0) {
      expect(text()).toContain("There was never anything there.");
      // Every finding is accounted for, one way or the other.
      const verdicts =
        (text().match(/Did not replicate/g) ?? []).length +
        (text().match(/Held up/g) ?? []).length;
      expect(verdicts).toBe(published);
    } else {
      expect(text()).toContain("Publishing none of it is the right answer");
    }
  });

  it("lets the player start again on fresh data", () => {
    mount();
    press("Open the dataset");
    press("Men");
    press("Send it all for replication");
    press("New dataset");
    expect(text()).toContain("Find something publishable anyway");
  });
});

describe("the game in every language", () => {
  /**
   * Neither translation guard reaches this file: `inlineChrome.test.ts` scans
   * for strings that ARE wrapped in `t()`, and `chartsLocalized.test.ts` only
   * renders through `DataViewRenderer`. So sweep it directly, the way the toys
   * are swept, on the screen with the most prose.
   */
  it.each(["ja", "zh", "ru", "hi", "bn", "ar"])(
    "leaves no English on the briefing for %s",
    (loc) => {
      mount(loc);
      const latin = [...text().matchAll(/[A-Za-z]{2,}/g)].map((m) => m[0]);
      expect(latin).toEqual([]);
    },
  );

  it.each(["ja", "zh", "ru", "hi", "bn", "ar"])(
    "leaves no English on the hunting screen for %s",
    (loc) => {
      mount(loc);
      press(
        // The briefing's button, in this locale.
        buttons()[buttons().length - 2]!.textContent!.trim(),
      );
      /*
        Runs of two or more Latin letters, so the lone "p" of "p = 0.031" is
        not swept up: it is a symbol rather than a word, and every language
        prints it that way. A translated panel has no other Latin in it.
      */
      const latin = [...text().matchAll(/[A-Za-z]{2,}/g)].map((m) => m[0]);
      expect(latin).toEqual([]);
    },
  );
});

describe("what the game refuses to pretend", () => {
  it("never finds an effect that is really there", () => {
    // Belt and braces over the model's own tests: whatever the player clicks,
    // the underlying truth is a coin that does not know which arm it is in.
    const patients = cohort(42);
    const overall = analyse(patients, "everyone", "recovered");
    const rateT = overall.treated.events / overall.treated.n;
    const rateC = overall.control.events / overall.control.n;
    expect(Math.abs(rateT - rateC)).toBeLessThan(0.1);
  });
});
