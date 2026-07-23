import type { Puzzle } from "../schema";

/**
 * Puzzle #15, recall bias, on the Norwegian Women and Cancer study.
 *
 * What makes this the strongest available version of the lesson: it is the SAME
 * WOMEN answering the SAME QUESTION twice, once before anyone knew they would
 * get melanoma and once after they had been told. Almost every recall-bias
 * example compares cases with controls and then argues about what the cases
 * "would have" said beforehand. Here that counterfactual was actually recorded.
 *
 *   Said their skin tans little or not at all:
 *     before diagnosis   cases  54 / 141 = 38.3%   controls  281 / 1094 = 25.7%
 *     after diagnosis    cases  64 / 141 = 45.4%   controls  269 / 1094 = 24.6%
 *
 * The cases drift 7.1 points up. The controls, asked the same question over the
 * same interval, drift 1.1 points down. Nobody's skin changed.
 *
 * THE HONEST PART, and the reason this puzzle is written the way it is: poor
 * tanning ability really is a melanoma risk factor. The association is not
 * manufactured, it is INFLATED. The crude odds ratio these four cells give
 * rises from about 1.8 to about 2.5, so roughly a third of the apparent
 * association after diagnosis was not there before it. A puzzle that taught
 * "recall bias invents findings" would swap one tidy falsehood for another,
 * which CONTRIBUTING.md rules out explicitly, so the correct answer here is
 * "partly", and the option saying the whole thing is an artefact is wrong.
 *
 * Provenance care. The paper prints odds ratios of 1.90 and 3.01 for this
 * comparison; those are the authors' own estimates and are NOT the crude
 * two-by-two odds ratios these counts give (1.80 and 2.55). Both pairs move the
 * same way and by a similar factor, but they are not the same quantity, so only
 * the derived ones appear anywhere a reader might check them against the counts,
 * and the note says why. The test file re-derives them, so a mistyped count
 * fails CI rather than shipping a claim the data does not support.
 *
 * The strata are the same 1,235 women answering twice, so pooling them would
 * count every woman a second time: hence strataAreSeparateSamples. Nothing is
 * crowned, because "more of this group reported pale skin" has no winner.
 */
export const recallBias: Puzzle = {
  schemaVersion: 1,
  id: "recall-bias-nowac",
  slug: "asked-twice",
  category: "statistical-reasoning",
  reasoningSkill: "recall-bias",
  difficulty: "hard",
  tags: ["clinical", "research", "epidemiology"],
  supportedLocales: ["en"],

  setup: {
    headline: {
      en: "Women with melanoma report burning easily far more often than women without it. How much of that gap is their skin?",
    },
    framing: {
      en: "141 women who had been diagnosed with melanoma and 1,094 who had not, asked how their skin responds to the sun. 45 percent of the women with melanoma said they tan little or not at all, against 25 percent of the others. Pale, easily burned skin is a known risk factor, so the finding looks exactly as expected.",
    },
    question: { en: "Is that twenty point gap what their skin was really like?" },
    data: {
      type: "rates",
      metricLabel: { en: "Said their skin tans little or not at all" },
      higherIsBetter: false,
      // There is no winner in "more of this group reported pale skin".
      crownWinner: false,
      // The same women answered twice. Pooling the panels would count each of
      // them again.
      strataAreSeparateSamples: true,
      groups: [
        {
          id: "cases",
          label: { en: "Women who developed melanoma" },
          short: { en: "Melanoma" },
        },
        {
          id: "controls",
          label: { en: "Women who did not" },
          short: { en: "No melanoma" },
        },
      ],
      strata: [
        { id: "after", label: { en: "Asked after the diagnosis" } },
        { id: "before", label: { en: "Asked years before anyone knew" } },
      ],
      observations: [
        { groupId: "cases", stratumId: "after", numerator: 64, denominator: 141 },
        { groupId: "controls", stratumId: "after", numerator: 269, denominator: 1094 },
        { groupId: "cases", stratumId: "before", numerator: 54, denominator: 141 },
        { groupId: "controls", stratumId: "before", numerator: 281, denominator: 1094 },
      ],
    },
    initialView: {
      kind: "stratified",
      strataIds: ["after"],
      caption: { en: "Asked after the diagnosis" },
    },
  },

  choices: [
    {
      id: "real",
      label: { en: "Yes, pale skin is a real risk factor" },
      sublabel: { en: "the gap is their skin" },
      isCorrect: false,
      isIntuitiveTrap: true,
    },
    {
      id: "artefact",
      label: { en: "No, the whole association is an artefact" },
      sublabel: { en: "they are reinterpreting their past" },
      isCorrect: false,
      isIntuitiveTrap: false,
    },
    {
      id: "partly",
      label: { en: "Partly, and part of it appeared afterwards" },
      sublabel: { en: "real, but not this large" },
      isCorrect: true,
      isIntuitiveTrap: false,
    },
  ],

  reveal: {
    headline: { en: "These same women had already answered, years earlier." },
    mechanismLabel: { en: "What the diagnosis changed" },
    mechanismName: { en: "The question was answered by a different person, in a sense" },
    explanation: {
      en: "Every one of these women filled in the same question before anyone knew who would get melanoma. Back then the gap was thirteen points, not twenty. The women who went on to be diagnosed shifted seven points towards saying they burn; the women who were not diagnosed, answering over the same years, shifted a point the other way. Nobody's skin changed in between. What changed was that some of them had since been asked to explain a cancer:",
    },
    body: {
      en: "So the risk factor is real and the study still overstates it: the crude odds ratio these counts give is about 1.8 before the diagnosis and about 2.5 after it, so roughly a third of what the later study measured was not there beforehand. That is the awkward shape of recall bias. It rarely conjures an association out of nothing. It takes a true one and inflates it, which is far harder to spot, because the result still agrees with everything you already believed.",
    },
    view: { kind: "stratified", caption: { en: "The same women, asked twice" } },
  },

  lesson: {
    skillName: { en: "Recall bias" },
    takeaway: {
      en: "People who know how their story ended remember the beginning differently, so asking about the past after the outcome is known measures the outcome as well as the past.",
    },
    body: {
      en: "Nobody here is lying. Searching your memory harder because you have been given a reason to search it is an ordinary human thing to do, and the answers that come back are honestly meant. That is what makes it so hard to correct for: there is no dishonest group to exclude and no question you can ask that fixes it, because the more carefully someone thinks about it, the worse it gets.",
    },
    howItWorks: {
      en: "A case-control study starts from the outcome and works backwards, asking people who have a disease and people who do not what they were exposed to. It is fast, it is cheap, and for a rare disease it is often the only design that will ever be affordable. Its weakness is that one group has been given a reason to search their memory. A diagnosis prompts the question \"why me\", and the mind answers it, reaching for the sunburn, the chemical, the medicine, the difficult pregnancy. The other group has no such prompt and remembers no harder than anyone remembers anything. So the two groups are not just being compared on exposure, they are being compared on how hard they looked. The direction is usually predictable: it inflates whatever the person already suspects is to blame, which means it tends to confirm the hypothesis under test. The defences are all about not relying on memory. Take the exposure from a record written before the outcome, from a prescription database, a workplace log, a stored blood sample, a questionnaire filled in years earlier. Or build in a comparison the mechanism cannot touch, such as a second exposure question that nobody associates with the disease: if the groups drift equally on that one, the drift is not about the disease. What does not work is asking the question more carefully, and what does not work is telling people to be objective.",
    },
    examples: [
      {
        title: { en: "The study everyone credits for this does not show it" },
        summary: {
          en: "A 1967 Finnish study is cited across the literature as the origin of recall bias. It re-interviewed mothers whose answers had been recorded during pregnancy, and its own text reports no significant difference between the mothers of affected and healthy children in how often the replies disagreed. What it does show, and spectacularly, is something else: only about a quarter of the information collected prospectively reappeared identically at re-interview, and roughly two thirds of the retrospective positive answers had no prospective record behind them, in both groups alike. That is not recall bias, it is a warning that retrospective interviews are unreliable even when nobody is biased at all.",
        },
        provenance: {
          source:
            "Klemetti A, Saxen L. Prospective versus retrospective approach in the search for environmental causes of malformations. Am J Public Health Nations Health. 1967;57(12):2071-2075. Free full text.",
          year: 1967,
          doi: "10.2105/ajph.57.12.2071",
          url: "https://pubmed.ncbi.nlm.nih.gov/6070161/",
        },
      },
      {
        title: { en: "And the largest test of it found almost none" },
        summary: {
          en: "The biggest study of this design compared what parents said in interview against what their family doctor had already written down, for 1,624 children with cancer and 2,524 without. Agreement with the records was poor in places, but it was poor in much the same way in both groups. The authors found essentially no evidence that having a sick child changed how the past was reported. Recall bias is a real mechanism and a reason to prefer records over memory. It is not a law that memory always bends, and a study is not discredited by the mere fact that it asked people to remember.",
        },
        provenance: {
          source:
            "Hall N, Ansell P, Simpson J, et al. Determinants of recall bias in case-control studies: results from the United Kingdom Childhood Cancer Study. Int J Epidemiol. 2023;52(4):1187-1196. Open access.",
          year: 2023,
          doi: "10.1093/ije/dyad018",
          url: "https://pubmed.ncbi.nlm.nih.gov/36857444/",
        },
      },
    ],
  },

  share: {
    title: { en: "Recall bias, a reasoning trap." },
    explainer: {
      en: "Ask someone what they were exposed to before they got ill and you are not only asking about the past, you are asking someone who has been given a reason to search it. A diagnosis makes people look harder, and looking harder turns up more. In one study the same women answered the same question about their skin years apart, once before anyone knew and once after a melanoma diagnosis, and the ones who had been diagnosed had shifted. Their skin had not. This rarely invents a finding from nothing. It takes a true one and makes it look bigger, which is much harder to catch, because the answer still agrees with what you expected.",
    },
    captions: {
      competitive: { en: "Caught it. Bet you can't." },
      selfDeprecating: { en: "I totally fell for this." },
    },
  },

  provenance: {
    source:
      "Parr CL, Hjartaker A, Laake P, Lund E, Veierod MB. Recall bias in melanoma risk factors and measurement error effects: a nested case-control study within the Norwegian Women and Cancer study. Am J Epidemiol. 2009;169(3):257-266, Table 4, p. 262. Tanning ability, category \"light tan or no tan\", prospective and retrospective responses from the same participants.",
    year: 2009,
    doi: "10.1093/aje/kwn363",
    url: "https://pubmed.ncbi.nlm.nih.gov/19074773/",
    note: {
      en: "Two things a careful reader should know. First, the reference standard is the woman's own questionnaire filled in before diagnosis, not an external record, so this shows that the answers moved rather than which of the two answers was correct, and the authors' own conclusion is appropriately hedged: tanning ability was the one host factor whose shift was significant in the cases and not in the controls. Second, the paper prints odds ratios of 1.90 and 3.01 for this comparison. Those are the authors' own estimates and are not the crude odds ratios of these four cells, which are 1.80 and 2.55. The two pairs move in the same direction by a similar factor but they are not the same quantity, so only the crude ones, which anyone can recompute from the counts shown, appear in the text above.",
    },
  },

  goDeeperUrl: "https://en.wikipedia.org/wiki/Recall_bias",
};
