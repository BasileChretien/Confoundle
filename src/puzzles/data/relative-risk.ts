import type { Puzzle } from "../schema";

/**
 * Puzzle #10, relative versus absolute risk, on the `risk` shape.
 *
 * The counts are the WOSCOPS primary endpoint (Shepherd et al., NEJM 1995):
 * definite nonfatal myocardial infarction or death from coronary heart disease,
 * 248 events on placebo and 174 on pravastatin, over an average 4.9 years.
 *
 * Everything the puzzle shows is derived from those four integers, so the
 * headline and the reveal cannot drift apart:
 *   248/3293 = 7.5%, 174/3302 = 5.3%
 *   relative reduction 30%, absolute reduction 2.3 points
 *   about 23 men spared per 1,000, number needed to treat 44
 *
 * The paper reports 31%, from a proportional-hazards model rather than the
 * crude counts, which is why the framing says "about a third" rather than
 * quoting a figure the chart would then contradict. The provenance says so.
 */
export const relativeRisk: Puzzle = {
  schemaVersion: 1,
  id: "relative-absolute-risk-statin",
  slug: "relative-risk",
  category: "statistical-reasoning",
  reasoningSkill: "relative-vs-absolute-risk",
  difficulty: "medium",
  tags: ["everyday", "clinical", "pharmacology"],
  supportedLocales: ["en"],

  setup: {
    headline: {
      en: "A drug cuts your risk of a heart attack by about a third. How many people does that help?",
    },
    framing: {
      en: "A trial gave 6,595 middle-aged men with high cholesterol and no history of heart trouble either a statin or a dummy pill, and followed them for about five years. The drug cut heart attacks and coronary deaths by roughly a third. That is a real result, and it is how the finding was reported.",
    },
    question: {
      en: "Out of 1,000 men who took it for five years, how many were spared a heart attack or a coronary death?",
    },
    data: {
      type: "risk",
      label: { en: "A five-year statin trial in 6,595 men" },
      outcomeLabel: { en: "Heart attack or death from heart disease" },
      control: {
        label: { en: "Dummy pill" },
        short: { en: "Dummy pill" },
        events: 248,
        n: 3293,
      },
      treated: {
        label: { en: "Statin" },
        short: { en: "Statin" },
        events: 174,
        n: 3302,
      },
      scale: 1000,
      relativeCaption: { en: "of the risk removed" },
      absoluteCaption: { en: "spared, in every 1,000 men treated for five years" },
      nntCaption: { en: "men treated for five years to spare one" },
    },
    initialView: { kind: "relative" },
  },

  choices: [
    {
      id: "third",
      label: { en: "About 300" },
      sublabel: { en: "roughly a third of them" },
      isCorrect: false,
      isIntuitiveTrap: true,
    },
    {
      id: "hundred",
      label: { en: "About 100" },
      sublabel: { en: "one in ten" },
      isCorrect: false,
      isIntuitiveTrap: false,
    },
    {
      id: "few",
      label: { en: "About 23" },
      sublabel: { en: "roughly 1 in 44" },
      isCorrect: true,
      isIntuitiveTrap: false,
    },
  ],

  reveal: {
    headline: { en: "Twenty three men in a thousand." },
    mechanismLabel: { en: "A third of what?" },
    mechanismName: { en: "A third of a risk that was small to begin with" },
    explanation: {
      en: "Both numbers come from the same trial. Without the drug, about 75 men in 1,000 had a heart attack or died of heart disease over the five years. With it, about 53 did. That is a third of the risk gone, and it is also 23 men in 1,000. The first number is divided by the risk, the second by the people, which is the whole reason they feel so different. Put the other way round, 44 men had to take the drug for five years for one of them to be spared:",
    },
    view: { kind: "absolute" },
  },

  lesson: {
    skillName: { en: "Relative versus absolute risk" },
    takeaway: {
      en: "A percentage reduction tells you what share of a risk went away. It cannot tell you how big that risk was, and that is the part that decides whether it matters to you.",
    },
    body: {
      en: "Whenever you meet a percentage change, ask what it is a percentage of. Halving a one-in-a-million risk and halving a one-in-two risk make the same headline and mean completely different things. The two figures worth asking for are the difference in plain numbers of people, and how many have to be treated for one of them to benefit.",
    },
    howItWorks: {
      en: "Take a risk of 8 in 100 and drop it to 5 in 100. Divide the drop by the risk and you get a third, which sounds like a lot. Divide the same drop by the people and you get 3 in 100, which sounds like very little. Neither is wrong. They answer different questions: what fraction of the danger was removed, and what are the odds this helps me. Only the second one is about you. The gap between them grows as the risk shrinks, which is why the most impressive relative figures usually come from the rarest outcomes. This is not only a media problem. Relative figures make treatments look better to doctors too, and the same trial result draws more enthusiasm when it is described relatively than when it is described in whole people. It also cuts the other way with harms: a scare expressed as a doubling of risk sounds alarming whether the risk went from 1 in 10 to 2 in 10 or from 1 in 100,000 to 2 in 100,000. The habit that protects you in both directions is to insist on the numbers out of a fixed group of people, and on how many have to be treated, or exposed, for one to be affected.",
    },
    examples: [
      {
        title: { en: "The same kind of drug, in people at real risk" },
        summary: {
          en: "A second trial gave a statin to patients who had already had a heart attack or had angina. Major coronary events fell from 28 percent to 19 percent. As a relative figure that is about a third, almost the same headline as in the healthy men. But because the risk it was cutting into was nearly four times larger, the gain was about 9 patients in every 100 instead of 2. The identical headline, several times the benefit. This is why a percentage on its own cannot tell you whether a drug is worth taking, and why the answer differs from patient to patient.",
        },
        provenance: {
          source:
            "Scandinavian Simvastatin Survival Study Group. Randomised trial of cholesterol lowering in 4444 patients with coronary heart disease: the Scandinavian Simvastatin Survival Study (4S). Lancet. 1994;344(8934):1383-1389. (Major coronary events, 622 of the placebo group, 28 percent, against 431 on simvastatin, 19 percent; deaths 256 against 182.)",
          year: 1994,
          doi: "10.1016/S0140-6736(94)90566-5",
          url: "https://pubmed.ncbi.nlm.nih.gov/7968073/",
        },
      },
      {
        title: { en: "When a relative figure did real damage" },
        summary: {
          en: "In October 1995 a British safety committee warned that some contraceptive pills carried about twice the risk of a blood clot. The warning travelled as a doubling, with no sense of how small the risk was either way, and women stopped taking the pill. Among girls under 16, use fell from 40 percent to 27 percent within a year. The health service met roughly 21 million pounds in extra maternity costs and 46 million pounds in abortion provision. A relative figure with no absolute figure beside it is not a neutral way to describe a risk.",
        },
        provenance: {
          source:
            "Furedi A. The public health implications of the 1995 'pill scare'. Hum Reprod Update. 1999;5(6):621-626.",
          year: 1999,
          doi: "10.1093/humupd/5.6.621",
          url: "https://pubmed.ncbi.nlm.nih.gov/10652971/",
        },
      },
      {
        title: { en: "The fix is in the wording" },
        summary: {
          en: "Describe the same result in whole people, so many out of 1,000 against so many out of 1,000, and both patients and doctors judge it far more accurately than when it arrives as a percentage reduction. Relative risks belong to a small family of formats that reliably confuse, alongside single-event probabilities and conditional ones like a test's sensitivity. None of them is wrong. They are just easy to misread, and there is a clearer way to say the same thing.",
        },
        provenance: {
          source:
            "Gigerenzer G, Edwards A. Simple tools for understanding risks: from innumeracy to insight. BMJ. 2003;327(7417):741-744.",
          year: 2003,
          doi: "10.1136/bmj.327.7417.741",
          url: "https://pubmed.ncbi.nlm.nih.gov/14512488/",
        },
      },
    ],
  },

  share: {
    title: { en: "Relative versus absolute risk, a reasoning trap." },
    explainer: {
      en: "\"Cuts your risk by a third\" sounds enormous. But a third of what? If the risk was 75 in 1,000, a third of it is 23 people. If the risk was 3 in 1,000, a third of it is one. The percentage tells you how much of the risk went away and says nothing at all about how much risk there was, which is the part that decides whether it matters to you. Ask for the plain numbers: how many out of 1,000, and how many people have to take it for one of them to benefit.",
    },
    captions: {
      competitive: { en: "Caught it. Bet you can't." },
      selfDeprecating: { en: "I totally fell for this." },
    },
  },

  provenance: {
    source:
      "Shepherd J, Cobbe SM, Ford I, et al. Prevention of coronary heart disease with pravastatin in men with hypercholesterolemia. N Engl J Med. 1995;333(20):1301-1307. (The West of Scotland Coronary Prevention Study.)",
    year: 1995,
    doi: "10.1056/NEJM199511163332001",
    url: "https://pubmed.ncbi.nlm.nih.gov/7566020/",
    note: {
      en: "The counts are the trial's primary endpoint, a definite nonfatal heart attack or death from coronary heart disease: 248 events among the men on placebo and 174 among those on pravastatin, over an average of 4.9 years. The paper reports a 31 percent relative risk reduction, estimated from a proportional-hazards model; the crude counts give 30 percent. Every figure this puzzle shows is derived from the counts, so it quotes about a third rather than a number the chart would contradict.",
    },
  },

  goDeeperUrl: "https://en.wikipedia.org/wiki/Absolute_risk_reduction",
};
