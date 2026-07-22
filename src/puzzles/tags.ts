import type { LocalizedText, TagId } from "./schema";

/**
 * Display metadata for the tag vocabulary defined in schema (`TAG_IDS`).
 * `kind` drives styling (audience tags read stronger than topic tags); `group`
 * clusters topics by discipline for a future browse/filter screen. Keeping this
 * out of the schema means relabeling or regrouping never touches the contract.
 */
export interface TagMeta {
  label: LocalizedText;
  kind: "audience" | "topic";
  group:
    | "audience"
    | "method"
    | "medicine"
    | "science"
    | "social"
    | "applied"
    | "humanities";
  blurb: LocalizedText; // one line, for a future browse/filter screen
}

const audience = (label: string, blurb: string): TagMeta => ({
  label: { en: label },
  kind: "audience",
  group: "audience",
  blurb: { en: blurb },
});

const topic = (
  group: TagMeta["group"],
  label: string,
  blurb: string,
): TagMeta => ({ label: { en: label }, kind: "topic", group, blurb: { en: blurb } });

export const TAGS: Record<TagId, TagMeta> = {
  // audience, who most needs this
  everyday: audience("Everyday", "Anyone can fall for it"),
  clinical: audience("Clinical", "Bites at the bedside"),
  research: audience("Research", "Study design & evidence appraisal"),
  // method
  statistics: topic("method", "Statistics", "Reading the numbers"),
  // medicine
  diagnosis: topic("medicine", "Diagnosis", "Tests & diagnostic reasoning"),
  screening: topic("medicine", "Screening", "Screening programmes"),
  epidemiology: topic("medicine", "Epidemiology", "Populations, exposure & risk"),
  pharmacology: topic("medicine", "Pharmacology", "Drugs & drug safety"),
  // sciences
  psychology: topic("science", "Psychology", "Mind & behaviour"),
  biology: topic("science", "Biology", "Life & evolution"),
  technology: topic("science", "Technology", "Data, computing & AI"),
  // social sciences
  economics: topic("social", "Economics", "Markets & incentives"),
  politics: topic("social", "Politics", "Elections & policy"),
  education: topic("social", "Education", "Teaching & testing"),
  // applied
  finance: topic("applied", "Finance", "Investing & returns"),
  business: topic("applied", "Business", "Management & strategy"),
  law: topic("applied", "Law", "Courts & forensics"),
  sports: topic("applied", "Sports", "Performance & records"),
  // humanities
  history: topic("humanities", "History", "The past & how we read it"),
  media: topic("humanities", "Media", "News & the numbers in it"),
};

/** Canonical display order: audience first, then by discipline group. */
export const TAG_ORDER: TagId[] = [
  "everyday",
  "clinical",
  "research",
  "statistics",
  "diagnosis",
  "screening",
  "epidemiology",
  "pharmacology",
  "psychology",
  "biology",
  "technology",
  "economics",
  "politics",
  "education",
  "finance",
  "business",
  "law",
  "sports",
  "history",
  "media",
];

/** Puzzle tags in canonical order (drops any not in the registry, defensively). */
export function orderedTags(tags: TagId[]): TagId[] {
  return TAG_ORDER.filter((id) => tags.includes(id));
}
