import { fr } from "./fr";
import { es } from "./es";
import { pt } from "./pt";
import { ja } from "./ja";
import { zh } from "./zh";
import { ru } from "./ru";
import { hi } from "./hi";
import { bn } from "./bn";
import { ar } from "./ar";

/**
 * One dictionary per locale, mapping an English source string to its
 * translation. `translate()` consults these when a string has no inline value
 * for the active locale. Adding a language is adding a file and a line here;
 * the puzzle data files stay English-only and readable.
 *
 * Draft-and-ship: entries can be incomplete. Anything missing falls back to
 * English, so a half-translated locale still works.
 */
export const DICTIONARIES: Record<string, Record<string, string>> = {
  fr,
  es,
  pt,
  ja,
  zh,
  ru,
  hi,
  bn,
  ar,
};
