import type { Puzzle } from "../schema.ts";

/**
 * Puzzle #12, length-time bias, on the Mayo Lung Project.
 *
 * Counts are the extended follow-up report (Marcus et al., JNCI 2000):
 *   Table 3, p. 1312, among men diagnosed with lung cancer, deaths FROM lung
 *     cancer: 133 of 206 screened, 119 of 160 usual care.
 *   Table 2, p. 1311, deaths from lung cancer among EVERYONE randomised:
 *     337 of 4,607 screened, 303 of 4,585 usual care.
 *
 * A published erratum matters here. Table 3 prints the usual-care case count as
 * 106, which is wrong; it is 160. Six independent checks in the same paper say
 * so: the body text on p. 1310, the Figure 2 curve label, and Table 3's own
 * percentages (119/160 = 74, 37/160 = 23, 156/160 = 98, 4/160 = 3, all as
 * printed), plus Table 4 (41 + 119) and Table 5 (51 + 38 + 24 + 45 + 2). With
 * 106 the lung-cancer deaths alone would exceed the cohort. We use 160 and the
 * provenance says why.
 *
 * Honesty about what this trial can and cannot show: it bundles length-time
 * bias, lead-time bias and overdiagnosis, and it compares two screening
 * intensities rather than screening against none. The lesson is written to the
 * mechanism the data does support, that screen-detected cases look better than
 * the disease does, and says the three effects travel together.
 */
export const lengthTime: Puzzle = {
  schemaVersion: 1,
  id: "length-time-bias-mayo-lung",
  slug: "screen-detected",
  category: "statistical-reasoning",
  reasoningSkill: "length-time-bias",
  difficulty: "hard",
  tags: ["clinical", "screening", "epidemiology"],
  supportedLocales: ["en"],

  setup: {
    headline: {
      en: "Screened men whose lung cancer was found died of it less often. Did the screening save them?",
    },
    framing: {
      en: "9,211 male smokers were randomly assigned either to chest x-rays and sputum tests every four months for six years, or to usual care, and followed for two decades. Among the men who were diagnosed with lung cancer, 65 percent of the intensively screened died of it, against 74 percent of the others.",
    },
    question: { en: "Did the extra screening save lives?" },
    data: {
      type: "rates",
      metricLabel: { en: "Died of lung cancer" },
      higherIsBetter: false,
      // The whole-trial panel is 7.3 against 6.6 percent, a difference the
      // paper itself reports as not statistically significant. Crowning a bar
      // there would assert that screening killed people, which the trial does
      // not show.
      crownWinner: false,
      // Two different denominators, the diagnosed and everyone randomised, so
      // pooling the panels would be meaningless.
      strataAreSeparateSamples: true,
      groups: [
        {
          id: "screened",
          label: { en: "Screened every four months" },
          short: { en: "Screened" },
        },
        {
          id: "usual",
          label: { en: "Usual care" },
          short: { en: "Usual care" },
        },
      ],
      strata: [
        { id: "diagnosed", label: { en: "Among the men diagnosed with lung cancer" } },
        { id: "everyone", label: { en: "Among everyone in the trial" } },
      ],
      observations: [
        { groupId: "screened", stratumId: "diagnosed", numerator: 133, denominator: 206 },
        { groupId: "usual", stratumId: "diagnosed", numerator: 119, denominator: 160 },
        { groupId: "screened", stratumId: "everyone", numerator: 337, denominator: 4607 },
        { groupId: "usual", stratumId: "everyone", numerator: 303, denominator: 4585 },
      ],
    },
    initialView: {
      kind: "stratified",
      strataIds: ["diagnosed"],
      caption: { en: "Among the diagnosed" },
    },
  },

  choices: [
    {
      id: "saved",
      label: { en: "Yes, fewer of them died of it" },
      sublabel: { en: "65% against 74%" },
      isCorrect: false,
      isIntuitiveTrap: true,
    },
    {
      id: "wait",
      label: { en: "Too early to say" },
      sublabel: { en: "the follow-up is too short" },
      isCorrect: false,
      isIntuitiveTrap: false,
    },
    {
      id: "none",
      label: { en: "No, count everyone and it vanishes" },
      sublabel: { en: "the cases changed, not the deaths" },
      isCorrect: true,
      isIntuitiveTrap: false,
    },
  ],

  reveal: {
    headline: { en: "Count everyone, and the screened arm did no better." },
    mechanismLabel: { en: "Who became a case" },
    mechanismName: { en: "Screening changed who counted as having cancer" },
    explanation: {
      en: "The screened men were diagnosed far more often, 206 against 160, in a trial that split them evenly. The extra cancers were not a random sample of the disease. A test applied every few months catches the slow-growing tumours, because slow ones sit in the detectable stage for years waiting to be found, while fast ones surface between visits. Slow tumours also do better whatever you do, and some would never have surfaced at all. Those cases join the pool of people with lung cancer and survive it, so the share dying falls. Nobody was saved:",
    },
    body: {
      en: "Three effects travel together here and this trial cannot separate them: the slow cases are caught preferentially (length-time), the clock starts earlier for those caught (lead-time), and some tumours found would never have caused harm (overdiagnosis). All three flatter the diagnosed group and none of them postpones a death. The number that stayed honest is deaths among everyone randomised, and it did not fall.",
    },
    view: { kind: "stratified", caption: { en: "Both ways of counting" } },
  },

  lesson: {
    skillName: { en: "Length-time bias" },
    takeaway: {
      en: "Screening does not sample disease fairly. It catches the slow-growing kind preferentially, and the slow kind was always going to do better, so screen-detected cases flatter the test.",
    },
    body: {
      en: "Whenever a screening programme is defended with how well its detected cases do, ask what kind of disease a periodic test can catch. A tumour that takes years to declare itself is available to be found on many visits; one that goes from nothing to symptoms in three months is available on almost none. The only fair question is whether deaths fall in everyone offered screening. None of which says screening cannot work. Where disease caught earlier is genuinely more treatable, so that the stage it is found at changes what treatment can achieve, finding it early does save lives, and randomised trials have shown exactly that for several cancers. What this bias says is narrower: you cannot demonstrate that benefit by comparing how screen-detected cases fare against symptom-detected ones, because those two groups were never the same kind of disease to begin with.",
    },
    howItWorks: {
      en: "Picture the same disease arriving in two speeds. Slow tumours spend years in the window where a test could find them but the patient feels nothing. Fast ones cross that window in weeks. Now sample the population every six months. You will find nearly all the slow ones and almost none of the fast ones, because the fast ones announce themselves between your visits. So the pile of screen-detected cases is loaded with indolent disease, and the pile of symptom-detected cases is loaded with aggressive disease, before treatment enters the story at all. Compare their outcomes and screening looks wonderful. At the extreme edge of this sits overdiagnosis: disease so slow it would never have troubled the person in their lifetime, which counts as a cancer found and cured while doing nothing but harm through the treatment. The defence is the same one that beats lead-time bias, and it is the reason screening programmes are judged the way they are: randomise who is invited, then count deaths in everyone invited, attended or not, diagnosed or not. Programmes that pass that test exist, which is the other half of the point. Where catching disease at an earlier stage genuinely changes what treatment can do, the benefit is real and it shows up as fewer deaths in the invited group; the test is simply what tells you which programmes those are.",
    },
    examples: [
      {
        title: { en: "The trial's own explanation" },
        summary: {
          en: "The authors did not attribute the gap to better treatment. They noted that similar mortality alongside better survival points to lesions of limited clinical relevance being found in the screened arm. Twenty years of follow-up did not rescue the result: deaths from lung cancer were 337 among 4,607 screened men and 303 among 4,585 others, a difference in the wrong direction and not statistically significant.",
        },
        provenance: {
          source:
            "Marcus PM, Bergstralh EJ, Fagerstrom RM, et al. Lung cancer mortality in the Mayo Lung Project: impact of extended follow-up. J Natl Cancer Inst. 2000;92(16):1308-1316, Table 2 (p. 1311) and the discussion of overdiagnosis.",
          year: 2000,
          doi: "10.1093/jnci/92.16.1308",
          url: "https://academic.oup.com/jnci/article/92/16/1308/2905917",
        },
      },
      {
        title: { en: "Why screening is judged on deaths, not survival" },
        summary: {
          en: "This is not a historical curiosity. National screening programmes are assessed on whether they lower deaths from the disease in the whole invited population, precisely because survival among detected cases can be lifted by three separate artefacts without a single life being extended. A programme that raises five-year survival and leaves mortality untouched has, on the evidence, done nothing except give more people the label.",
        },
        provenance: {
          source:
            "Welch HG, Schwartz LM, Woloshin S. Are increasing 5-year survival rates evidence of success against cancer? JAMA. 2000;283(22):2975-2978. (Across the 20 most common solid tumours, the change in five-year survival tracked the change in incidence, Pearson r = 0.49, and not the change in mortality, r = 0.00.)",
          year: 2000,
          doi: "10.1001/jama.283.22.2975",
          url: "https://pubmed.ncbi.nlm.nih.gov/10865276/",
        },
      },
    ],
  },

  share: {
    title: { en: "Length-time bias, a reasoning trap." },
    explainer: {
      en: "A test you run every few months finds slow-growing disease far more easily than fast-growing disease, because slow disease sits there for years waiting to be found while fast disease erupts between visits. Slow disease also has a better outlook whatever anyone does. So the cases a screening programme catches are the gentle ones, and they do well, and the programme takes the credit. None of this means screening cannot work: where disease caught earlier is genuinely more treatable, catching it early does save lives, and randomised trials have shown it. It means you cannot prove it by comparing the cases the screen caught against the cases that walked in. The only number that cannot be gamed this way is deaths in everyone offered screening, whether or not they attended.",
    },
    captions: {
      competitive: { en: "Caught it. Bet you can't." },
      selfDeprecating: { en: "I totally fell for this." },
    },
  },

  provenance: {
    source:
      "Marcus PM, Bergstralh EJ, Fagerstrom RM, Williams DE, Fontana R, Taylor WF, Prorok PC. Lung cancer mortality in the Mayo Lung Project: impact of extended follow-up. J Natl Cancer Inst. 2000;92(16):1308-1316. Counts among the diagnosed are Table 3 (p. 1312); counts among everyone randomised are Table 2 (p. 1311).",
    year: 2000,
    doi: "10.1093/jnci/92.16.1308",
    url: "https://academic.oup.com/jnci/article/92/16/1308/2905917",
    note: {
      en: "Table 3 prints the usual-care case count as 106, which is a typographic error; the correct figure is 160, and this puzzle uses 160. The paper says so itself six times over: the body text on page 1310, the Figure 2 curve label, Table 3's own percentages (119 of 160 printed as 74 percent, 156 of 160 as 98 percent), and the totals of Tables 4 and 5. With 106 the lung-cancer deaths alone would outnumber the cohort. Note also that this trial compared two screening intensities rather than screening against none, and that it cannot separate length-time bias from lead-time bias and overdiagnosis, which is why the lesson names all three.",
    },
  },

  goDeeperUrl: "https://en.wikipedia.org/wiki/Length_time_bias",
};
