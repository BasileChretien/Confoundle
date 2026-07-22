import type { LocalizedText, TagId } from "./schema";

/**
 * Display metadata for the tag vocabulary defined in schema (`TAG_IDS`).
 * `kind` splits the two axes: **audience** (who most needs this bias) and
 * **domain** (where in medicine/statistics it shows up). Keeping this out of the
 * schema means relabeling or recolouring a tag never touches the contract.
 */
export interface TagMeta {
  label: LocalizedText;
  kind: "audience" | "domain";
  blurb: LocalizedText; // one line, for a future browse/filter screen
}

export const TAGS: Record<TagId, TagMeta> = {
  everyday: {
    kind: "audience",
    label: { en: "Everyday" },
    blurb: { en: "Anyone can fall for it" },
  },
  clinical: {
    kind: "audience",
    label: { en: "Clinical" },
    blurb: { en: "Bites at the bedside" },
  },
  research: {
    kind: "audience",
    label: { en: "Research" },
    blurb: { en: "Study design & evidence appraisal" },
  },
  statistics: {
    kind: "domain",
    label: { en: "Statistics" },
    blurb: { en: "Reading the numbers" },
  },
  diagnosis: {
    kind: "domain",
    label: { en: "Diagnosis" },
    blurb: { en: "Tests & diagnostic reasoning" },
  },
  screening: {
    kind: "domain",
    label: { en: "Screening" },
    blurb: { en: "Screening programmes" },
  },
  epidemiology: {
    kind: "domain",
    label: { en: "Epidemiology" },
    blurb: { en: "Populations, exposure & risk" },
  },
  pharmacology: {
    kind: "domain",
    label: { en: "Pharmacology" },
    blurb: { en: "Drugs & drug safety" },
  },
};

/** Canonical display order: audience tags first, then domain tags. */
export const TAG_ORDER: TagId[] = [
  "everyday",
  "clinical",
  "research",
  "statistics",
  "diagnosis",
  "screening",
  "epidemiology",
  "pharmacology",
];

/** Puzzle tags in canonical order (drops any not in the registry, defensively). */
export function orderedTags(tags: TagId[]): TagId[] {
  return TAG_ORDER.filter((id) => tags.includes(id));
}
