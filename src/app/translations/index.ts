import { fr } from "./fr";

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
};
