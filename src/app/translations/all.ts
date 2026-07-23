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
