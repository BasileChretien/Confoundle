import { describe, expect, it } from "vitest";

/**
 * A numeral the app draws follows the READER'S locale, never the runtime's and
 * never a locale written into the source.
 *
 * IT USED TO SCAN ONE DIRECTORY, and read as though it scanned the engine.
 * The glob was `./*.{ts,tsx}` from inside `engine/charts/`, so every
 * top-level view sat outside it: `TrapHuntView` and `CalibrationRunView`
 * both format counts for the reader and neither was ever looked at. That is
 * the same shape as the hole `charts/scopeLabels.test.ts` closed, a guard
 * whose name promises more than its glob delivers, and it was found by a
 * reviewer asking what this file actually covers rather than what it says.
 * It now scans engine, app, srs, server and puzzles, and it lives at the
 * root of `src` so its position says so.
 *
 * Nothing caught this, and nothing could. `chartsLocalized.test.ts` renders
 * every puzzle in six non-Latin locales and fails on any Latin word, which is
 * what found the strings that were never wrapped in `t()`; but it matches runs
 * of two or more Latin LETTERS and does not look at digits at all. So a figure
 * could draw "40,320" at a French reader who writes 40 320, or Western digits
 * at a Bengali reader, and sweep up perfectly clean. Six call sites did exactly
 * that, in four different spellings:
 *
 *   - `toLocaleString("en-US")` and `toLocaleString("en")`, which pin English
 *     grouping in all ten languages.
 *   - `toLocaleString()` and `toLocaleString(undefined, { ... })`, which look
 *     locale-aware and are not: an absent locale means the JavaScript runtime's
 *     default, which in a browser is the BROWSER'S language rather than the one
 *     the reader picked in the app. Two of these even carried a comment saying
 *     "locale-aware grouping", which was true of the mechanism and false of the
 *     locale it used.
 *   - `new Intl.NumberFormat()` with no argument, which is the same defect
 *     wearing the clothes of the fix.
 *
 * So this reads the source, the way `declaredColors.test.ts` and
 * `translations/inlineChrome.test.ts` do and for the same reason: the call site
 * is the only place the mistake is visible. A correct call and an incorrect one
 * produce identical types, identical output under `en`, and identical-looking
 * figures to anyone testing in English.
 *
 * WHAT THIS DELIBERATELY DOES NOT COVER, so that nobody reads it as more than
 * it is. `toFixed` never localises anything, and a couple of dozen chart
 * files still use it for decimals. That is the same bug in the wider sense
 * and it is not this test's subject, because sweeping it means touching every
 * shape at once. The boundary drawn instead is the one that can be held today:
 * no file may pick the WRONG locale, and no file may be half-localised, which
 * is the state `SurrogateView` argues is worse than either choice made
 * consistently. Every file that mixed the two has been converted whole; the
 * files that are uniformly unlocalised are internally consistent and wait their
 * turn. When they are converted, this scan is where `toFixed` should join.
 */

/**
 * Every source file the app ships, as text.
 *
 * Whole directories rather than a list read off anything: the defect is not
 * confined to the renderers handed a slice of the data (which is what
 * `declaredColors.test.ts` needs its list for), the pure derivation modules
 * beside them format numbers too, and so do the views, the share card and the
 * server's rendered pages. `estimation.ts` held one of the original six and
 * `CalibrationRunView.tsx` would have been the next one nobody checked.
 */
/*
  Five separate calls rather than one brace pattern, because `import.meta.glob`
  is resolved by static analysis at build time: its arguments must be literals,
  so the options cannot be hoisted into a shared constant and the directories
  cannot be assembled from a variable either. Hoisting them was the first
  attempt and it fails at transform time rather than at assertion time, which
  is at least loud.
*/
const SOURCES: Record<string, string> = {
  ...(import.meta.glob("./engine/**/*.{ts,tsx}", {
    query: "?raw",
    import: "default",
    eager: true,
  }) as Record<string, string>),
  ...(import.meta.glob("./app/**/*.{ts,tsx}", {
    query: "?raw",
    import: "default",
    eager: true,
  }) as Record<string, string>),
  ...(import.meta.glob("./srs/**/*.{ts,tsx}", {
    query: "?raw",
    import: "default",
    eager: true,
  }) as Record<string, string>),
  ...(import.meta.glob("./server/**/*.{ts,tsx}", {
    query: "?raw",
    import: "default",
    eager: true,
  }) as Record<string, string>),
  ...(import.meta.glob("./puzzles/**/*.{ts,tsx}", {
    query: "?raw",
    import: "default",
    eager: true,
  }) as Record<string, string>),
};

/**
 * Tests are excluded because they quote the defect in order to prove the
 * detector fires on it, and the dictionaries because they are data: nine files
 * of about five thousand translated strings each, holding no code at all and
 * costing real time to read on every run.
 */
const isScanned = (path: string) =>
  !/\.test\.tsx?$/.test(path) && !path.includes("/translations/");

/**
 * Comments are not code, and this project writes a great many of them.
 *
 * This is not hypothetical: the first run of this scan reported three files
 * that had just been FIXED, because each one's comment quotes the call it
 * replaced in order to explain why. `translations/inlineChrome.test.ts` hit the
 * same wall and built a character-level scanner for it, because it hunts string
 * literals and had to keep them intact. This hunts a method name, so it can be
 * cruder: block comments and line comments come out, string literals are left
 * exactly where they are.
 *
 * `dangling` reports a block comment that never closed, which would have eaten
 * the rest of the file and read as a pass. The one hole left is a `//` inside a
 * string literal, which truncates that line: a URL followed by a formatting
 * call on the SAME line would be missed. Nothing in this directory looks like
 * that, and the failure would be one line rather than one file.
 */
function stripComments(source: string): { code: string; dangling: boolean } {
  const out: string[] = [];
  let inBlock = false;
  /** A template literal, which is the one literal that survives a newline. */
  let inTemplate = false;
  for (const line of source.split("\n")) {
    let kept = "";
    let i = 0;
    while (i < line.length) {
      if (inBlock) {
        const end = line.indexOf("*/", i);
        if (end === -1) break;
        inBlock = false;
        i = end + 2;
        continue;
      }
      if (inTemplate) {
        const c = line[i];
        kept += c;
        i++;
        if (c === "\\") {
          if (i < line.length) {
            kept += line[i];
            i++;
          }
          continue;
        }
        if (c === "`") inTemplate = false;
        continue;
      }
      // A quote opens a literal, and NOTHING inside it is a comment marker.
      // Copied through verbatim rather than skipped, because the literal may
      // itself hold a formatting call the scan has to see: the self-test below
      // asserts exactly that on a quoted `toLocaleString`.
      if (line[i] === '"' || line[i] === "'" || line[i] === "`") {
        const quote = line[i];
        kept += quote;
        i++;
        if (quote === "`") {
          inTemplate = true;
          continue;
        }
        while (i < line.length) {
          const c = line[i];
          kept += c;
          i++;
          if (c === "\\") {
            if (i < line.length) {
              kept += line[i];
              i++;
            }
            continue;
          }
          if (c === quote) break;
        }
        continue;
      }
      if (line.startsWith("//", i)) break;
      if (line.startsWith("/*", i)) {
        inBlock = true;
        i += 2;
        continue;
      }
      kept += line[i];
      i++;
    }
    out.push(kept);
  }
  return { code: out.join("\n"), dangling: inBlock };
}

/**
 * `toLocaleString` in any spelling. There is no correct argument to it here:
 * a literal locale is wrong by definition, and an absent one silently means the
 * runtime's. The replacement is always an `Intl.NumberFormat` built from
 * `useLocale()`, so the method is banned outright rather than policed.
 */
const TO_LOCALE_STRING = /\.toLocaleString\s*\(/g;

/**
 * `Intl.NumberFormat(` whose first argument is not an identifier: `()` or
 * `("en")` or `(undefined, {...})`. A call like `new Intl.NumberFormat(locale)`
 * or `new Intl.NumberFormat(props.locale, {...})` passes, which is as far as a
 * source scan can see: whether that identifier came from `useLocale()` is a
 * question about values, and the render tests in `chartsLocalized.test.ts` and
 * the throwaway locale sweeps are what answer it.
 *
 * `new` IS OPTIONAL, and that is not pedantry. `Intl.NumberFormat("en")` without
 * it is legal and returns a formatter exactly as the constructor call does, so
 * requiring `new` here would have let the identical defect through in the one
 * spelling nobody thinks to grep for.
 */
const HARDCODED_FORMAT =
  /(?:new\s+)?Intl\.NumberFormat\s*\(\s*(?:\)|["'`]|undefined\b)/g;

function offendersIn(source: string): string[] {
  return [
    ...[...source.matchAll(TO_LOCALE_STRING)].map(() => "toLocaleString()"),
    ...[...source.matchAll(HARDCODED_FORMAT)].map((m) =>
      m[0].replace(/\s+/g, " "),
    ),
  ];
}

describe("numerals on a chart follow the reader's locale", () => {
  it("actually reads the chart sources", () => {
    // A scan that reads nothing passes everything, which is the failure mode
    // every source scan in this repo is written to argue against. Floors
    // rather than exact counts, so adding a chart cannot fail this, but a glob
    // that has quietly stopped matching must.
    expect(Object.keys(SOURCES).length).toBeGreaterThan(300);
    expect(Object.keys(SOURCES).filter(isScanned).length).toBeGreaterThan(180);
    // The directories, named, so a glob that silently stops matching one of
    // them cannot hide behind the total from the other four.
    for (const dir of ["/engine/", "/app/", "/srs/", "/server/", "/puzzles/"]) {
      expect(
        Object.keys(SOURCES).filter((p) => p.includes(dir)).length,
        `the glob for ${dir} matched nothing`,
      ).toBeGreaterThan(5);
    }
  });

  it("would recognise every spelling of the defect if one came back", () => {
    // The detector proved against the exact six call sites this was written
    // for, quoted verbatim from the commit that removed them. An assertion of
    // absence cannot tell a clean directory from a broken matcher, and four of
    // these six differ only in their argument.
    const shipped = [
      `return \`\${t({ en: "1 in" })} \${n.toLocaleString("en-US")}\`;`,
      `{p.values.map((v) => \`n = \${v.n.toLocaleString("en")}\`).join(" · ")}`,
      `const formatCount = (n: number) => n.toLocaleString();`,
      `? Math.round(n).toLocaleString()`,
      `\`\${n.toLocaleString(undefined, { maximumFractionDigits: 2 })}%\``,
      `const nf = new Intl.NumberFormat();`,
      // `new` is optional in the language, so it is optional here. This
      // spelling is legal, returns the same formatter, and would have been the
      // one way to reintroduce the defect without tripping the scan.
      `const nf = Intl.NumberFormat("en");`,
      `const nf = Intl.NumberFormat(undefined, { maximumFractionDigits: 1 });`,
    ];
    for (const line of shipped) {
      expect({ line, found: offendersIn(line) }).not.toEqual({
        line,
        found: [],
      });
    }

    // And the forms that must NOT fire, or the scan would be noise that the
    // next person turns off rather than a rule they follow.
    for (const clean of [
      `const nf = new Intl.NumberFormat(locale);`,
      `new Intl.NumberFormat(locale, { maximumFractionDigits: 1 })`,
      `new Intl.NumberFormat(props.locale)`,
      `const nf = Intl.NumberFormat(locale);`,
    ]) {
      expect({ clean, found: offendersIn(clean) }).toEqual({ clean, found: [] });
    }
  });

  it("does not let a quoted comment marker blind it", () => {
    // THE HOLE THIS CLOSES, and why it is worse than the `//` one. A `/*`
    // inside a string or regex literal used to open a fake block comment, and
    // a block comment runs until the next `*/` REGARDLESS OF LINES. So one
    // quoted `/*` anywhere in a file silently deleted everything after it, and
    // the file swept up clean. `dangling` caught it only when no `*/` happened
    // to appear later, which in a directory this heavily commented is rare.
    //
    // The literal is copied through rather than skipped, because a formatting
    // call can sit inside one, and a scan that dropped literals would be the
    // same silent pass wearing different clothes.
    const hidden = [
      'const marker = "/*";\nconst nf = new Intl.NumberFormat("en");\nconst end = "*/";',
      "const re = '/*';\nn.toLocaleString();",
    ];
    for (const line of hidden) {
      const { code, dangling } = stripComments(line);
      expect({ line, dangling }).toEqual({ line, dangling: false });
      expect({ line, found: offendersIn(code) }).not.toEqual({
        line,
        found: [],
      });
    }

    // A real comment is still removed, or the fix would have gone too far the
    // other way and turned the stripper off.
    const { code } = stripComments(
      '/* new Intl.NumberFormat("en") */\nconst ok = new Intl.NumberFormat(locale);',
    );
    expect(offendersIn(code)).toEqual([]);
  });

  it("strips the comments without stripping the code", () => {
    // The stripper is the part that can fail silently: strip too much and
    // every file sweeps up clean. So prove on a real file that a known
    // formatting call SURVIVES stripping, and that a known comment does not.
    // `SurrogateView` is the file that argued the rule in the first place.
    const surrogate = Object.entries(SOURCES).find(([p]) =>
      p.endsWith("/SurrogateView.tsx"),
    );
    expect(surrogate).toBeDefined();
    const { code } = stripComments(surrogate![1]);
    expect(code).toContain("new Intl.NumberFormat(locale)");
    expect(surrogate![1]).toContain("This was `toLocaleString");
    expect(code).not.toContain("This was `toLocaleString");
  });

  it("leaves no file picking a locale of its own", () => {
    // Build the formatter from `useLocale()` (or take the locale as an
    // argument, if the module is a pure one that any surface can call), and
    // convert EVERY numeral in the same figure while you are there: a count
    // grouped in Bengali beside a percentage that is not is worse than either
    // choice made consistently.
    //
    // An equality against a NAMED list rather than a bare `toEqual({})`, on the
    // same reasoning as `ANNOUNCED_IN_ENGLISH` in `chartsLocalized.test.ts`:
    // the two read the same today and fail differently tomorrow. It fails in
    // both directions on purpose, so a stale entry left behind after its file
    // was fixed is as loud as a new offender, and anyone tempted to quiet a
    // failure has to add a line to a list whose comment says it may only
    // shrink.
    //
    // That is not a hypothetical either: the list held `PublishedView.tsx` for
    // exactly one CI run. It was written while PR #165 had that file's fix open
    // in review, so that this branch would neither duplicate that work nor
    // convert half of that figure; #165 merged before this did, and CI, which
    // builds the branch against main rather than against the commit it was
    // written on, failed on the stale entry within the hour.
    const found: Record<string, string[]> = {};
    const unparsed: string[] = [];
    for (const [path, source] of Object.entries(SOURCES)) {
      if (!isScanned(path)) continue;
      const { code, dangling } = stripComments(source);
      if (dangling) unparsed.push(path);
      const offenders = offendersIn(code);
      if (offenders.length) found[path] = offenders;
    }
    // A file the stripper could not read to the end was not fully scanned, and
    // that reads as a pass. Reported rather than tolerated.
    expect(unparsed).toEqual([]);
    expect(found).toEqual(PENDING);
  });
});

/**
 * Files still picking a locale of their own, each with the PR that is fixing it.
 *
 * Kept rather than deleted along with its last entry, and the assertion above
 * stays an equality against a NAMED list rather than becoming a bare
 * `toEqual({})`, for the reason `ANNOUNCED_IN_ENGLISH` gives in
 * `chartsLocalized.test.ts`: the two read the same today and fail differently
 * tomorrow. An equality against something named says what the empty object
 * MEANS, which is that no chart may pick its own locale rather than that none
 * currently happens to. A future chart that regresses is then a failing diff
 * against a documented floor, and anyone tempted to quiet it has to add a line
 * to a list whose comment says it may only shrink.
 *
 * AN ENTRY IS ONLY EVER A CROSS-PR HANDOFF, never a deferral. The distinction
 * is the whole reason the list is allowed to be non-empty: a file named here
 * has an owner and a number, and the equality means the entry cannot outlive
 * the fix by more than one CI run. A file with no PR against it does not belong
 * here; it belongs fixed, in the change that touched it.
 *
 * It has held two entries and holds none now, both discharged exactly the way
 * the mechanism intends: `PublishedView.tsx` against #165, and
 * `FrequencyView.tsx` against #167, each named while the other PR had that
 * file's fix in review and each deleted on the rebase that followed the merge.
 * Neither had to be remembered, because the assertion is an equality and a
 * stale entry fails as loudly as a new offender.
 *
 * So: it is at zero, and a new entry needs a PR number to point at.
 */
const PENDING: Record<string, string[]> = {};
