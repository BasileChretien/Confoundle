import type { Puzzle } from "../schema";

/**
 * Puzzle #7, lead-time bias, on the new `timeline` data shape.
 *
 * The timeline is schematic, like the bomber diagram: it illustrates one life,
 * it does not report a measurement. What it illustrates is real, and the
 * puzzle's factual claim is sourced to Welch et al. (JAMA 2000), who showed
 * that across the 20 most common solid tumours the change in five-year survival
 * tracked the change in how many cancers were being found, not the change in
 * how many people died of them.
 *
 * The accompanying test (lead-time.test.ts) asserts the property the puzzle
 * teaches: survival measured from diagnosis differs between the two tracks
 * while the life itself, and the instant of death, do not move at all.
 */
export const leadTime: Puzzle = {
  schemaVersion: 1,
  id: "lead-time-bias-screening",
  slug: "lead-time",
  category: "statistical-reasoning",
  reasoningSkill: "lead-time-bias",
  difficulty: "medium",
  tags: ["clinical", "screening", "epidemiology"],
  supportedLocales: ["en"],

  setup: {
    headline: {
      en: "Screened patients survive five years after diagnosis. Unscreened ones survive two.",
    },
    framing: {
      en: "The same cancer, growing at the same speed, treated the same way. One person had a scan that found it early. The other went to a doctor years later, when the first symptom appeared. Survival is counted from the day of diagnosis, which is how survival is almost always counted.",
    },
    question: { en: "Did finding it early give this person more time alive?" },
    data: {
      type: "timeline",
      label: { en: "One life, two moments of diagnosis" },
      unit: { en: "years" },
      span: 12,
      onsetLabel: { en: "cancer begins" },
      detectedLabel: { en: "diagnosed" },
      diedLabel: { en: "died" },
      survivalLabel: { en: "Survival counted from diagnosis" },
      tracks: [
        {
          id: "symptoms",
          label: { en: "Found when symptoms appeared" },
          onsetAt: 2,
          detectedAt: 7,
          diedAt: 9,
        },
        {
          id: "screened",
          label: { en: "Found early, by screening" },
          onsetAt: 2,
          detectedAt: 4,
          diedAt: 9,
        },
      ],
    },
    initialView: { kind: "survival" },
  },

  choices: [
    {
      id: "longer",
      label: { en: "Yes, three extra years" },
      sublabel: { en: "five instead of two" },
      isCorrect: false,
      isIntuitiveTrap: true,
    },
    {
      id: "unknowable",
      label: { en: "There is no way to tell" },
      sublabel: { en: "too little to go on" },
      isCorrect: false,
      isIntuitiveTrap: false,
    },
    {
      id: "same",
      label: { en: "No, not one extra day" },
      sublabel: { en: "only the clock moved" },
      isCorrect: true,
      isIntuitiveTrap: false,
    },
  ],

  reveal: {
    headline: { en: "Both died on exactly the same day." },
    mechanismLabel: { en: "The extra years" },
    mechanismName: { en: "The clock started earlier, the life did not get longer" },
    explanation: {
      en: "Screening did not postpone anything. It moved the diagnosis three years earlier, so this person spent three more years knowing they had cancer. Counted from diagnosis that reads as three extra years of survival. Put both lives on the same calendar and they end at the same instant:",
    },
    view: { kind: "lifespan" },
  },

  lesson: {
    skillName: { en: "Lead-time bias" },
    takeaway: {
      en: "Finding a disease earlier stretches survival measured from diagnosis even when it postpones death by not a single day.",
    },
    body: {
      en: "This does not mean early detection is worthless. It means survival from diagnosis cannot tell you whether it worked. Whenever survival improves after a new test arrives, ask whether people are living longer or simply being told sooner. The measure that cannot be fooled this way is the death rate in the whole population, screened and unscreened alike.",
    },
    howItWorks: {
      en: "Survival statistics start their clock on the day of diagnosis. That day is not a fact about the disease, it is a fact about when somebody looked. Move the looking earlier and you add time to the front of the measurement while changing nothing at the back. Everyone diagnosed early is guaranteed to clear the five-year mark more often, because they were handed a head start. Two other effects push the same way. A screening programme catches slow-growing disease far more often than fast-growing disease, simply because slow disease sits there longer waiting to be found, and slow disease has a better outlook anyway. And a sensitive enough test finds harmless abnormalities that would never have caused trouble, which are then counted as cured cancers. All three flatter survival without saving anyone. The only honest test is to take a whole population, invite half of it to be screened, and count deaths in everyone from the day of the invitation. Screening programmes that pass that test exist, which is exactly why the test is worth insisting on.",
    },
    examples: [
      {
        title: { en: "Survival rose for every cancer. Deaths did not follow." },
        summary: {
          en: "Between 1950 and 1995, five-year survival improved for all 20 of the most common solid tumours in the United States, by as little as 3 points for pancreatic cancer and as much as 50 for prostate. Over the same years the death rate fell for 12 of those cancers and rose for the other 8. Comparing tumour by tumour, the change in survival was unrelated to the change in mortality, and instead tracked the change in how many cancers were being found.",
        },
        provenance: {
          source:
            "Welch HG, Schwartz LM, Woloshin S. Are increasing 5-year survival rates evidence of success against cancer? JAMA. 2000;283(22):2975-2978. (Correlation of the change in five-year survival with the change in mortality, Pearson r = 0.00; with the change in incidence, Pearson r = 0.49.)",
          year: 2000,
          doi: "10.1001/jama.283.22.2975",
          url: "https://pubmed.ncbi.nlm.nih.gov/10865276/",
        },
      },
      {
        title: { en: "Screening babies for a childhood tumour" },
        summary: {
          en: "Two large programmes tested screening infants for neuroblastoma. Quebec screened 476,654 children born over five years, with 92 percent taking part, and deaths from the tumour before the age of eight came to 4.78 per 100,000, no lower than in the comparison populations. Germany compared 1,475,773 screened children with 2,117,600 unscreened ones and found advanced disease in 3.7 against 3.8 per 100,000, and deaths in 1.3 against 1.2. More tumours were found. The same number of children died.",
        },
        provenance: {
          source:
            "Woods WG, Gao RN, Shuster JJ, et al. Screening of infants and mortality due to neuroblastoma. N Engl J Med. 2002;346(14):1041-1046. Companion trial: Schilling FH, Spix C, Berthold F, et al. Neuroblastoma screening at one year of age. N Engl J Med. 2002;346(14):1047-1053.",
          year: 2002,
          doi: "10.1056/NEJMoa012387",
          url: "https://pubmed.ncbi.nlm.nih.gov/11932470/",
        },
      },
      {
        title: { en: "What a real benefit looks like" },
        summary: {
          en: "Screening is not doomed to be an illusion, it just has to be measured properly. A trial put 46,551 people aged 50 to 80 into three groups: yearly stool testing for hidden blood, testing every two years, or none. Over 13 years, deaths from colorectal cancer came to 5.88 per 1,000 in the yearly group against 8.83 in the unscreened group, a third fewer. That is a count of deaths in everyone invited, not survival from diagnosis, so no head start could have produced it.",
        },
        provenance: {
          source:
            "Mandel JS, Bond JH, Church TR, et al. Reducing mortality from colorectal cancer by screening for fecal occult blood. Minnesota Colon Cancer Control Study. N Engl J Med. 1993;328(19):1365-1371. (Thirteen-year cumulative colorectal-cancer mortality per 1,000: 5.88 annual, 8.33 biennial, 8.83 control; the biennial arm did not differ significantly from control.)",
          year: 1993,
          doi: "10.1056/NEJM199305133281901",
          url: "https://pubmed.ncbi.nlm.nih.gov/8474513/",
        },
      },
    ],
  },

  share: {
    title: { en: "Lead-time bias, a reasoning trap." },
    explainer: {
      en: "Survival is counted from the day you are diagnosed. So a test that finds a disease earlier automatically makes survival look longer, even if it changes nothing about when the disease kills you. You simply spend more of your life as a patient. That is why a screening programme can raise five-year survival dramatically while exactly the same number of people die. None of which means screening is useless: some programmes genuinely do cut deaths, and this is exactly how you tell which ones. Count deaths in everyone invited, not survival among the diagnosed.",
    },
    captions: {
      competitive: { en: "Caught it. Bet you can't." },
      selfDeprecating: { en: "I totally fell for this." },
    },
  },

  provenance: {
    source:
      "Welch HG, Schwartz LM, Woloshin S. Are increasing 5-year survival rates evidence of success against cancer? JAMA. 2000;283(22):2975-2978.",
    year: 2000,
    doi: "10.1001/jama.283.22.2975",
    url: "https://pubmed.ncbi.nlm.nih.gov/10865276/",
    note: {
      en: "The timeline is a schematic illustration of one life, not measured data. The finding behind it is Welch and colleagues': across the 20 most common solid tumours between 1950 and 1995, five-year survival rose for every one, yet tumour by tumour the change in survival was uncorrelated with the change in mortality (Pearson r = 0.00) and instead tracked the change in incidence (Pearson r = 0.49).",
    },
  },

  goDeeperUrl: "https://en.wikipedia.org/wiki/Lead_time_bias",
};
