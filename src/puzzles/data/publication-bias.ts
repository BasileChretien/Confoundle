import type { Puzzle } from "../schema.ts";

/**
 * Puzzle #13, publication bias, on Turner et al. (NEJM 2008).
 *
 * The design is what makes it work: because every trial had to be registered
 * with the FDA before approval, the authors had the denominator the published
 * literature hides. 74 trials of 12 antidepressants, 12,564 patients.
 *
 *   As the journals tell it:  48 of 51 published trials read as positive = 94%
 *   As the registry tells it: 38 of 74 registered trials were positive = 51%
 *
 * Every integer is printed. 48 = 37 (FDA-positive and published) + 11
 * (FDA-negative or questionable, but published reading as positive). 51 = the
 * 40 whose publication agreed with the FDA plus those 11. Table 1 (p. 255)
 * prints 40, 11 and 23, summing to 74; Figure 1A (p. 256) prints the split by
 * verdict. Cross-check: the paper itself prints 94% and 51% side by side.
 *
 * A framing the counts forced. The obvious chart, publication rate by verdict,
 * is unusable: 37 of 38 positive trials were published, which is 97% and
 * saturates the bar. The journals-versus-registry pair is the paper's own
 * headline and both bars sit mid-range.
 *
 * Two judgements must stay distinct, and the lesson keeps them apart. The
 * positive/negative verdict is the FDA's own regulatory decision on the
 * prespecified primary outcome. "Questionable" is the authors' label, not the
 * FDA's, and so is the judgement that 11 publications conveyed a positive
 * outcome. The FDA never called those papers misleading.
 */
export const publicationBias: Puzzle = {
  schemaVersion: 1,
  id: "publication-bias-antidepressants",
  slug: "what-got-printed",
  category: "statistical-reasoning",
  reasoningSkill: "publication-bias",
  difficulty: "medium",
  tags: ["clinical", "research", "pharmacology"],
  supportedLocales: ["en"],

  setup: {
    headline: {
      en: "Read the journals and almost every trial of these drugs worked. How many actually did?",
    },
    framing: {
      en: "Twelve antidepressants, and every trial run to get them approved had to be registered with the American regulator before it began. That registry is the rare thing in medicine: a complete list, including the trials nobody ever wrote up. Go to the medical journals instead and you find 51 published trials, of which 48 read as positive.",
    },
    question: {
      en: "Out of all 74 trials that were actually run, how many did the regulator judge positive?",
    },
    data: {
      type: "rates",
      metricLabel: { en: "Trials that read as positive" },
      higherIsBetter: true,
      // Neither number is a winner. One is what the literature shows and the
      // other is what happened; crowning either would be nonsense.
      crownWinner: false,
      groups: [
        {
          id: "journals",
          label: { en: "As the journals tell it" },
          short: { en: "Journals" },
        },
        {
          id: "registry",
          label: { en: "As the full registry tells it" },
          short: { en: "Registry" },
        },
      ],
      strata: [
        { id: "all", label: { en: "Trials of twelve antidepressants" } },
      ],
      observations: [
        { groupId: "journals", stratumId: "all", numerator: 48, denominator: 51 },
        { groupId: "registry", stratumId: "all", numerator: 38, denominator: 74 },
      ],
    },
    initialView: {
      kind: "stratified",
      groupIds: ["journals"],
      caption: { en: "The published literature" },
    },
  },

  choices: [
    {
      id: "most",
      label: { en: "Nearly all of them" },
      sublabel: { en: "the journals are the evidence" },
      isCorrect: false,
      isIntuitiveTrap: true,
    },
    {
      id: "twothirds",
      label: { en: "About two thirds" },
      sublabel: { en: "some trials always fail" },
      isCorrect: false,
      isIntuitiveTrap: false,
    },
    {
      id: "half",
      label: { en: "About half" },
      sublabel: { en: "38 of the 74" },
      isCorrect: false,
      isIntuitiveTrap: false,
    },
    {
      // The hedge. Offered in nearly every puzzle so that picking it is a
      // judgement rather than a tell, and correct here, because the setup
      // withholds the very quantity the question asks for.
      id: "cannot-tell",
      label: { en: "There is no way to tell" },
      sublabel: { en: "too little to go on" },
      isCorrect: true,
      isIntuitiveTrap: false,
    },
  ],

  reveal: {
    headline: { en: "Half. A coin flip, printed as a near-certainty." },
    mechanismLabel: { en: "What never reached print" },
    mechanismName: { en: "The failures were filtered out on the way to the journals" },
    explanation: {
      en: "The regulator judged 38 of the 74 trials positive and 36 not. Of those 36, twenty two were never published at all. Eleven more did reach print, but reading as a positive result. So a doctor searching the literature finds 48 positive trials out of 51 and concludes the case is overwhelming, when the complete record says it was close to even:",
    },
    body: {
      en: "Two of those judgements belong to different people, and it matters. Positive or negative was the regulator's own decision on the outcome each trial had promised to measure in advance. The reading that eleven publications conveyed a positive result was the study authors' assessment, not the regulator's, and they said so. What is not a matter of opinion is the twenty two that never appeared.",
    },
    view: { kind: "stratified", caption: { en: "Journals against the registry" } },
  },

  lesson: {
    skillName: { en: "Publication bias" },
    takeaway: {
      en: "The published literature is not a sample of the research done. It is the research that someone chose to submit and someone chose to print, and success survives that filter far better than failure.",
    },
    body: {
      en: "This is why a registry matters more than it sounds. Requiring every trial to be declared before it starts creates the denominator, so the missing ones become countable instead of invisible. When you read a review, the question is not only what the studies found but whether you are looking at all of them.",
    },
    howItWorks: {
      en: "Nothing here requires anyone to lie. A trial that finds nothing is duller to write up, harder to place, and commercially unwelcome, so it drifts to the bottom of the pile and quietly never gets finished. Repeat that across a field and the surviving literature is systematically sunnier than the research was. The effect compounds, because reviews and guidelines are built on what was published, so the gap is inherited by everything downstream and looks like accumulating evidence rather than a filter. Two things push back. The first is registration: declare the trial and its primary outcome before you start, and an unpublished result leaves a visible hole rather than no trace. The second is the funnel plot, which exploits the fact that small studies scatter widely and large ones cluster; if the small studies that should have landed on the disappointing side are missing, the scatter comes out lopsided. Neither fix works retrospectively on a literature that predates them, which is why the regulator's archive was the only way to answer this question at all.",
    },
    examples: [
      {
        title: { en: "The drugs also looked stronger than they were" },
        summary: {
          en: "The same trials were pooled twice, once as the regulator held them and once as the journals reported them. Measured across the complete set the average benefit was 0.31 on a standardised scale; measured from the published literature alone it was 0.41, about a third larger. That is a standardised mean difference, not a share of patients helped, and the effect was not confined to one drug: every one of the twelve looked better in the journals, by between 11 and 69 percent.",
        },
        provenance: {
          source:
            "Turner EH, Matthews AM, Linardatos E, Tell RA, Rosenthal R. Selective publication of antidepressant trials and its influence on apparent efficacy. N Engl J Med. 2008;358(3):252-260, Figure 3 (p. 258). Effect sizes are Hedges's g, a standardised mean difference.",
          year: 2008,
          doi: "10.1056/NEJMsa065779",
          url: "https://pubmed.ncbi.nlm.nih.gov/18199864/",
        },
      },
      {
        title: { en: "It got better, which is the point" },
        summary: {
          en: "The same team repeated the audit on four antidepressants approved between 2008 and 2013, after trial registration had become the norm. This time all 15 positive trials were reported transparently, and of the 15 negative ones 6 went unpublished and 2 were reported as positive. Still imperfect, and still worth knowing about, but the inflation in apparent effect had roughly halved. Publication bias is not a law of nature; it responds to rules about declaring trials in advance.",
        },
        provenance: {
          source:
            "Turner EH, Cipriani A, Furukawa TA, Salanti G, de Vries YA. Selective publication of antidepressant trials and its influence on apparent efficacy: updated comparisons and meta-analyses of newer versus older trials. PLoS Med. 2022;19(1):e1003886. (30 trials of four drugs approved 2008 to 2013, 13,747 patients.)",
          year: 2022,
          doi: "10.1371/journal.pmed.1003886",
          url: "https://journals.plos.org/plosmedicine/article?id=10.1371/journal.pmed.1003886",
        },
      },
    ],
  },

  share: {
    title: { en: "Publication bias, a reasoning trap." },
    explainer: {
      en: "Search the medical literature on a drug and you are not seeing the research that was done. You are seeing the research that got written up and accepted, and studies that found something clear survive that filter much better than studies that found nothing. For one class of drugs the regulator's complete archive showed about half the trials were positive, while the journals showed nearly all of them. Nobody had to lie for that to happen. The disappointing ones simply never got finished.",
    },
    captions: {
      competitive: { en: "Caught it. Bet you can't." },
      selfDeprecating: { en: "I totally fell for this." },
    },
  },

  provenance: {
    source:
      "Turner EH, Matthews AM, Linardatos E, Tell RA, Rosenthal R. Selective publication of antidepressant trials and its influence on apparent efficacy. N Engl J Med. 2008;358(3):252-260. Counts are Table 1 (p. 255) and Figure 1A (p. 256): of 74 registered trials, the FDA judged 38 positive; 40 publications agreed with the FDA, 11 conflicted by reading as positive, and 23 were never published.",
    year: 2008,
    doi: "10.1056/NEJMsa065779",
    url: "https://pubmed.ncbi.nlm.nih.gov/18199864/",
    note: {
      en: "Three points of care. The positive or negative verdict on each trial is the regulator's own, on the outcome the trial specified in advance; the label questionable, and the reading that eleven publications conveyed a positive result, are the study authors' judgements and the paper says so. The published-trial figure of 48 of 51 is the sum of two printed counts, 37 and 11, rather than a single printed number. And the authors note that they excluded articles covering several studies at once, so they probably counted a few trials as unpublished that were technically published, which makes 22 and 23 upper bounds.",
    },
  },

  goDeeperUrl: "https://en.wikipedia.org/wiki/Publication_bias",
};
