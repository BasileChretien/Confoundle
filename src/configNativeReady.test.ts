import { describe, expect, it } from "vitest";

/**
 * Everything the Vite config imports can be resolved by Node alone.
 *
 * WHAT THIS IS PROTECTING. `vite.config.ts` imports the puzzle registry, the
 * ten dictionaries and the prerender in order to write 760 lesson pages at
 * build time. Vite currently loads that config by bundling it first, which
 * resolves extensionless specifiers the way a bundler does. Vite 8.2 announced
 * that `configLoader: 'native'` will become the default in a future major, and
 * under it Node loads the config directly, where `./src/puzzles/all` is simply
 * not a file.
 *
 * That failure was reproduced rather than assumed. Before this test existed,
 * `vite build --configLoader native` died with ERR_MODULE_NOT_FOUND on the
 * very first import, and the build printed 172 lines of forward-compatibility
 * warning about the rest. So the day the default flips, every lesson page
 * stops being generated, and nothing about the app's own tests would notice:
 * the pages are a build artefact, not a module anything imports.
 *
 * The fix was to give every relative specifier in that graph its file
 * extension. This test is what keeps it fixed, because a single extensionless
 * import added to any of the 93 files below quietly restores the breakage, and
 * the symptom would not appear until a major version bump months later.
 *
 * WHY NOT JUST RUN THE BUILD. Because the suite does not run builds, and a
 * test that did would cost more than the whole file is worth. This checks the
 * property the build would check, on the same graph, by reading the source.
 * `pnpm build --configLoader native` remains the real proof and is worth
 * running whenever this test is touched.
 *
 * TYPE-ONLY IMPORTS ARE EXEMPT, deliberately. Node strips them before
 * resolution, so `import type { Puzzle } from "./schema"` would load fine with
 * no extension. Requiring one anyway would be a rule failing code that is not
 * broken. They happen to carry extensions throughout this graph because the
 * pass that fixed it was not that fussy, and that is fine: this test states
 * the requirement, not the current state.
 */

const SOURCES = import.meta.glob("../{src/**/*.{ts,tsx},vite.config.ts}", {
  query: "?raw",
  import: "default",
  eager: true,
}) as Record<string, string>;

/**
 * Keyed by path relative to the REPO ROOT, e.g. "vite.config.ts".
 *
 * `import.meta.glob` keys are relative to the importing file, which is in
 * `src/`, so a source file arrives as "./app/App.tsx" while the config, one
 * level up, arrives as "../vite.config.ts". Both are rewritten to root
 * relative here so that a specifier can be joined against them directly.
 */
const files = new Map<string, string>(
  Object.entries(SOURCES).map(([k, v]) => [
    k.startsWith("../") ? k.slice(3) : `src/${k.replace(/^\.\//, "")}`,
    v,
  ]),
);

/** Comments quote imports in this repo, so they go before anything is matched. */
function stripComments(src: string): string {
  return src.replace(/\/\*[\s\S]*?\*\//g, "").replace(/(^|[^:])\/\/[^\n]*/g, "$1");
}

/**
 * Relative specifiers Node will actually have to resolve: value imports,
 * re-exports, side-effect imports and dynamic `import()`. `import type` and
 * `export type` are excluded because type stripping removes them.
 */
export function resolvedSpecifiers(src: string): string[] {
  const clean = stripComments(src);
  const out: string[] = [];
  const patterns = [
    /(?:^|[\s;}])(?:import|export)\s+(?!type[\s{])[\s\S]*?\sfrom\s*(["'])(\.[^"']*)\1/g,
    /import\s*\(\s*(["'])(\.[^"']*)\1/g,
    /(?:^|[\s;}])import\s*(["'])(\.[^"']*)\1/g,
  ];
  for (const p of patterns) {
    for (const m of clean.matchAll(p)) out.push(m[2]!);
  }
  return out;
}

/** Exactly what Node does: join, and require a file to be there. No guessing. */
function joinExact(fromFile: string, spec: string): string {
  const parts = fromFile.split("/").slice(0, -1);
  for (const piece of spec.split("/")) {
    if (piece === "." || piece === "") continue;
    else if (piece === "..") parts.pop();
    else parts.push(piece);
  }
  return parts.join("/");
}

const ENTRY = "vite.config.ts";

function walk(): { reached: Set<string>; broken: string[] } {
  const reached = new Set<string>();
  const broken: string[] = [];
  const queue = [ENTRY];
  while (queue.length > 0) {
    const file = queue.pop()!;
    if (reached.has(file)) continue;
    reached.add(file);
    const src = files.get(file);
    if (src === undefined) continue;
    for (const spec of resolvedSpecifiers(src)) {
      const target = joinExact(file, spec);
      if (files.has(target)) {
        if (!reached.has(target)) queue.push(target);
      } else {
        broken.push(`${file}: "${spec}" does not name a file Node could load`);
      }
    }
  }
  return { reached, broken };
}

describe("the Vite config under a native loader", () => {
  it("can see its own entry point and the graph behind it", () => {
    // Without this the assertions below would pass on an empty glob.
    expect(files.has(ENTRY)).toBe(true);
    expect(files.size).toBeGreaterThan(200);
  });

  it("actually reaches the modules the prerender needs", () => {
    // Proves the walker walks. A bug returning an empty set would otherwise
    // make "nothing is broken" true and meaningless.
    const { reached } = walk();
    expect(reached.has("src/puzzles/all.ts")).toBe(true);
    expect(reached.has("src/app/translations/all.ts")).toBe(true);
    expect(reached.has("src/server/prerender.ts")).toBe(true);
    expect(reached.has("src/puzzles/schema.ts")).toBe(true);
    expect(reached.size).toBeGreaterThan(80);
  });

  it("resolves every specifier in that graph without a bundler", () => {
    const { broken } = walk();
    expect(
      broken,
      "add the file extension; Vite's native config loader is Node, and Node does not guess",
    ).toEqual([]);
  });

  it("counts a mixed type-and-value import, and skips a pure type one", () => {
    // The one subtle case. `import { a, type B }` still loads the module.
    expect(resolvedSpecifiers('import { a, type B } from "./y.ts";')).toEqual(["./y.ts"]);
    expect(resolvedSpecifiers('import type { B } from "./y";')).toEqual([]);
    expect(resolvedSpecifiers('export type { B } from "./y";')).toEqual([]);
    expect(resolvedSpecifiers('const m = await import("./y.ts");')).toEqual(["./y.ts"]);
    expect(resolvedSpecifiers('import "./y.ts";')).toEqual(["./y.ts"]);
    expect(resolvedSpecifiers('/* import { a } from "./y"; */')).toEqual([]);
  });
});
