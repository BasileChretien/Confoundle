import { fr } from "./fr.ts";
import { es } from "./es.ts";
import { pt } from "./pt.ts";
import { ja } from "./ja.ts";
import { zh } from "./zh.ts";
import { ru } from "./ru.ts";
import { hi } from "./hi.ts";
import { bn } from "./bn.ts";
import { ar } from "./ar.ts";

/**
 * Every dictionary, eagerly. FOR TESTS AND TOOLING ONLY.
 *
 * The app must never import this: it defeats the whole point of the on-demand
 * loading in ./index.ts, and would put all ten languages back into one chunk.
 * Nothing reachable from the app entry imports it, so it is not in the
 * production bundle at all.
 *
 * The coverage and parity tests need every dictionary at once by definition,
 * and a translation pass needs the same to generate its worklist, so the eager
 * map has to live somewhere. Here, clearly labelled, is better than a lazy map
 * the tests have to await.
 */
export const ALL_DICTIONARIES: Record<string, Record<string, string>> = {
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
