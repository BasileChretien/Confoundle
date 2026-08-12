import { it } from "vitest";
import { ALL_DICTIONARIES as DICTIONARIES } from "./all";
import { puzzles } from "../../puzzles/index";
import { TEST_ITEMS } from "../../puzzles/testItems";
import { TAGS } from "../../puzzles/tags";

/** Throwaway: writes the missing-string worklist as JSON. Delete after use. */
it("writes the worklist", async () => {
  const strings: string[] = [];
  const walk = (v: unknown) => {
    if (!v || typeof v !== "object") return;
    const o = v as Record<string, unknown>;
    if (typeof o.en === "string") strings.push(o.en);
    for (const k of Object.keys(o)) walk(o[k]);
  };
  walk(puzzles);
  walk(TEST_ITEMS);
  walk(TAGS);
  const unique = [...new Set(strings)];
  const out: Record<string, string[]> = {};
  for (const [locale, dict] of Object.entries(DICTIONARIES)) {
    const d = dict as Record<string, string>;
    out[locale] = unique.filter((s) => !(s in d));
  }
  const fs = await import("node:fs");
  fs.writeFileSync("worklist.json", JSON.stringify(out, null, 1));
  // eslint-disable-next-line no-console
  console.log("missing per locale:", Object.fromEntries(Object.entries(out).map(([k, v]) => [k, v.length])));
});
