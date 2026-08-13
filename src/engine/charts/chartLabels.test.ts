import { describe, expect, it } from "vitest";

/**
 * A chart may not build a visible label out of a template literal.
 *
 * This closes a hole that two shipped figures fell through, and the reason it
 * is a SOURCE scan rather than a render is worth stating, because the render
 * looks like the better tool and cannot work here. `n = {count}` is notation
 * every locale keeps, so all ten dictionaries hold the same string and the
 * rendered output is byte-identical whether the label was translated or
 * inlined. Nothing downstream of rendering can tell the two apart. The only
 * place the difference exists is the call site.
 *
 * Why the existing nets missed it, which is the interesting part:
 *
 *  - `translations/coverage.test.ts` walks authored puzzle content, and a
 *    string in a renderer is not puzzle content.
 *  - `translations/inlineChrome.test.ts` reads the source for the
 *    `t({ en: ... })` form, so a string that was never wrapped is exactly what
 *    it cannot see. It enforces that wrapped strings are translated; it says
 *    nothing about strings that were never wrapped.
 *  - `chartsLocalized.test.ts` does render every chart in six non-Latin
 *    locales, but matches runs of TWO or more Latin letters, because a single
 *    letter is an axis label rather than a word. A label whose only Latin is
 *    `n` falls through.
 *
 * So `n = 357` sat visible on the published figure in ten locales, formatted
 * with a hardcoded English `toLocaleString("en")`, and every check was green.
 *
 * WHAT IS FLAGGED is narrow on purpose. These files are full of legitimate
 * template literals: CSS lengths, SVG path data, class names, viewBox values.
 * A literal is reported only when BOTH hold:
 *
 *  1. It is not in an attribute or object-property position, which excludes
 *     `style={{ left: `${x}%` }}`, `className={`...`}` and their kind.
 *  2. Its literal text looks like a LABEL rather than like markup: a Latin
 *     letter next to an equals sign, or a word followed by a space.
 *
 * The fix, when it fires, is the one `PublishedView` and `ConditionalView` now
 * use: `fillSlots(t({ en: "n = {count}" }), { count: nf.format(v.n) })`, which
 * puts the wording in the dictionary and the value in a slot.
 */

const SOURCES = import.meta.glob("./*.tsx", {
  query: "?raw",
  import: "default",
  eager: true,
}) as Record<string, string>;

/** Comments hold prose and would otherwise dominate the report. */
function stripComments(code: string): string {
  return code.replace(/\/\*[\s\S]*?\*\//g, "").replace(/(^|[^:])\/\/[^\n]*/g, "$1");
}

/**
 * Every template literal, with the position it starts at. Nesting inside
 * `${...}` is followed so an inner literal is read as its own literal rather
 * than as part of the outer one's text.
 */
function templateLiterals(code: string): { at: number; text: string }[] {
  const out: { at: number; text: string }[] = [];
  for (let i = 0; i < code.length; i++) {
    if (code[i] !== "`") continue;
    if (i > 0 && code[i - 1] === "\\") continue;
    const start = i;
    let literal = "";
    let depth = 0;
    i++;
    for (; i < code.length; i++) {
      const c = code[i];
      if (depth === 0 && c === "`") break;
      if (depth === 0 && c === "$" && code[i + 1] === "{") {
        depth = 1;
        i++;
        continue;
      }
      if (depth > 0) {
        if (c === "{") depth++;
        else if (c === "}") depth--;
        continue;
      }
      literal += c;
    }
    out.push({ at: start, text: literal });
  }
  return out;
}

/** `attr={` and `prop:` are markup, not prose. */
const MARKUP_POSITION = /(?:[A-Za-z-]+\s*=\s*\{\s*|[A-Za-z-]+\s*:\s*|\?\s*|:\s*)$/;

/** A label reads as `n = ` or as a word and a space; markup does not. */
const LOOKS_LIKE_A_LABEL = /[A-Za-z]\s*=|[A-Za-z]{2,}\s/;

function offenders(code: string): string[] {
  const clean = stripComments(code);
  return templateLiterals(clean)
    .filter(({ at, text }) => {
      if (!text.trim()) return false;
      if (!LOOKS_LIKE_A_LABEL.test(text)) return false;
      return !MARKUP_POSITION.test(clean.slice(Math.max(0, at - 80), at));
    })
    .map(({ text }) => text.trim());
}

describe("chart labels", () => {
  it("reads the renderer sources", () => {
    // A glob that matched nothing would report every file clean.
    expect(Object.keys(SOURCES).length).toBeGreaterThan(20);
  });

  it("builds no visible label out of a template literal", () => {
    const found: Record<string, string[]> = {};
    for (const [path, code] of Object.entries(SOURCES)) {
      const bad = offenders(code);
      if (bad.length) found[path.replace("./", "")] = bad;
    }
    expect(found).toEqual({});
  });

  /**
   * The scan has to be shown to bite, or an empty report proves nothing. This
   * is the exact line `PublishedView` shipped, and the exact line
   * `ConditionalView` was written with.
   */
  it("catches the two labels that actually shipped", () => {
    const shipped = [
      'const x = p.values.map((v) => `n = ${v.n.toLocaleString("en")}`).join(" · ");',
      "const y = s.points.map((p) => `n = ${nf.format(p.n)}`).join(' · ');",
    ];
    for (const line of shipped) expect(offenders(line)).toHaveLength(1);
  });

  /** And that it stays quiet on the markup these files are full of. */
  it("passes over CSS, SVG and class names", () => {
    const fine = [
      "style={{ left: `${left * 100}%` }}",
      "style={{ border: `2px solid ${color}` }}",
      "style={{ backgroundImage: `repeating-linear-gradient(45deg, ${c} 0 3px, transparent 3px 6px)` }}",
      "<svg viewBox={`0 0 ${W} ${H}`} />",
      'const cmd = `${px(d.x).toFixed(1)} ${py(d.y).toFixed(1)}`;',
      'segments.push(`M${current.join("L")}`);',
      'className={`h-2 w-2 ${isOn ? "opacity-100" : "opacity-40"}`}',
    ];
    for (const line of fine) expect(offenders(line)).toEqual([]);
  });
});
