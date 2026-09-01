import type { Puzzle } from "../schema.ts";

/**
 * The proxy target, on the `proxy` shape.
 *
 * A commercial risk score decides who a hospital offers a care management
 * programme to. It was trained to predict COST, because cost is what the claims
 * data holds. The setup shows the two things anyone would check: the score it
 * gives each group, and what they went on to cost. Both are nearly level, which
 * is what "well calibrated" means and is exactly what the paper found.
 *
 * The reveal keeps those rows and adds what happened to the same people.
 * Hospitalisations, hospital days and emergency visits are 44, 56 and 84 per
 * cent apart. Twelve per cent more was spent on patients using far more acute
 * care, because less is spent on Black patients at the same level of need.
 *
 * THE HEDGE IS THE CORRECT ANSWER HERE, and that is forced rather than clever.
 * The setup shows cost and a score derived from cost. Neither measures health,
 * so a player who says the data cannot answer a question about health is
 * reasoning correctly, and the project's oldest rule says never to mark that
 * wrong in order to land a surprise. The surprise is still in the reveal: not
 * that more data was needed, but that the accuracy check everybody runs is
 * structurally unable to see this.
 *
 * Numbers are Table 1 of Obermeyer et al. 2019 as printed, whole sample, over
 * 88,080 White and 11,929 Black patient-years. The 4.8 against 3.8 chronic
 * conditions is from the body text at the 97th percentile and is quoted in the
 * reveal rather than drawn, because the paper prints no cost figure at that
 * percentile and a chart placing the two together would be inventing a reading.
 */
export const proxyTarget: Puzzle = {
  schemaVersion: 1,
  id: "proxy-target-care-management",
  slug: "the-number-it-was-trained-on",
  category: "causal-reasoning",
  reasoningSkill: "proxy-target",
  difficulty: "hard",
  tags: ["research", "clinical", "technology"],
  supportedLocales: ["en"],

  setup: {
    headline: {
      en: "A hospital uses an algorithm to find the patients who most need extra care. Checked for fairness, it scores two groups almost identically, and their costs come out almost identical too.",
    },
    framing: {
      en: "Every primary care patient at a large hospital gets a risk score. Above the 97th percentile they are enrolled in a care management programme automatically; above the 55th their doctor is asked to consider them. The question the hospital cares about is whether the algorithm is finding the people with the greatest health needs. Here is what it scored each group, and what each group went on to cost.",
    },
    question: { en: "Is it finding the patients who need the most care?" },
    data: {
      type: "proxy",
      label: { en: "A care management algorithm, by patient group" },
      trainedOnLabel: {
        en: "These are the numbers the algorithm was built and checked against.",
      },
      mattersLabel: {
        en: "The lower rows are what happened to the same people. Nobody trained on them.",
      },
      basisNote: { en: "Per patient-year. 88,080 White and 11,929 Black patient-years." },
      groups: [
        { id: "white", label: { en: "White patients" }, short: { en: "White" } },
        { id: "black", label: { en: "Black patients" }, short: { en: "Black" } },
      ],
      measures: [
        {
          id: "score",
          label: { en: "Algorithm risk score" },
          scale: "proxy",
          unit: "percentile",
          per: { en: "Mean percentile. The programme's own ranking." },
        },
        {
          id: "cost",
          label: { en: "Health care cost" },
          scale: "proxy",
          unit: "currency",
          per: { en: "What the algorithm was trained to predict." },
        },
        {
          id: "admissions",
          label: { en: "Hospitalisations" },
          scale: "truth",
          unit: "count",
        },
        { id: "days", label: { en: "Hospital days" }, scale: "truth", unit: "count" },
        {
          id: "emergency",
          label: { en: "Emergency visits" },
          scale: "truth",
          unit: "count",
        },
      ],
      observations: [
        { measureId: "score", groupId: "white", value: 50 },
        { measureId: "score", groupId: "black", value: 52 },
        { measureId: "cost", groupId: "white", value: 7540 },
        { measureId: "cost", groupId: "black", value: 8442 },
        { measureId: "admissions", groupId: "white", value: 0.09 },
        { measureId: "admissions", groupId: "black", value: 0.13 },
        { measureId: "days", groupId: "white", value: 0.5 },
        { measureId: "days", groupId: "black", value: 0.78 },
        { measureId: "emergency", groupId: "white", value: 0.19 },
        { measureId: "emergency", groupId: "black", value: 0.35 },
      ],
    },
    initialView: { kind: "astrained" },
  },

  choices: [
    {
      id: "fair",
      label: { en: "Yes, it is treating the two groups the same" },
      sublabel: { en: "same score, same costs" },
      isCorrect: false,
      isIntuitiveTrap: true,
    },
    {
      id: "favours-costly",
      label: { en: "No, it favours the group it spends more on" },
      sublabel: { en: "the higher costs pull the scores up" },
      isCorrect: false,
      isIntuitiveTrap: false,
    },
    {
      id: "favours-cheap",
      label: { en: "No, it favours the group it spends less on" },
      sublabel: { en: "the lower costs pull the scores up" },
      isCorrect: false,
      isIntuitiveTrap: false,
    },
    {
      // Correct, and forced by the setup rather than chosen for variety. Cost
      // and a score built from cost are the only numbers on the table, and
      // neither is a measure of health. Marking this wrong would be punishing
      // somebody for noticing exactly the thing the puzzle is about.
      id: "cannot-tell",
      label: { en: "There is no way to tell" },
      sublabel: { en: "nothing here measures health" },
      isCorrect: true,
      isIntuitiveTrap: false,
    },
  ],

  reveal: {
    headline: {
      en: "The same patients used 44 per cent more hospitalisations, 56 per cent more hospital days and 84 per cent more emergency care, while 12 per cent more was spent on them. The algorithm never saw any of that.",
    },
    mechanismLabel: { en: "Accurate about what?" },
    mechanismName: { en: "A proxy target" },
    explanation: {
      en: "The algorithm predicts cost, because cost is what the claims data holds. On that job it does well: at every level of predicted risk the two groups go on to cost about the same, which is what calibration means and is the check anyone would run. But cost is not need. Less is spent on Black patients at the same level of illness, so a patient who is sicker but cheaper scores lower, and the model concludes she is healthier. At the 97th percentile, the threshold for automatic enrolment, Black patients carried 4.8 chronic conditions against 3.8 for White patients.",
    },
    body: {
      en: "Nothing here is a broken model, and that is the uncomfortable part. It was asked to predict cost and it predicts cost well, by race, at every point in the distribution. Every fairness test built around accuracy passes, because accuracy is measured against the label the model was trained on, and the label is where the problem is. The authors estimated that removing the gap would raise the share of Black patients identified for extra help from 17.7 per cent to 46.5 per cent.",
    },
    view: { kind: "asithappened" },
  },

  lesson: {
    skillName: { en: "Proxy targets" },
    takeaway: {
      en: "When a model is trained on a stand-in for the thing you care about, checking that it predicts the stand-in accurately cannot tell you whether it serves the purpose. Ask what the label measures before asking how well the model predicts it, because a gap between the label and the goal is invisible to every test built on the label.",
    },
    body: {
      en: "Prediction problems arrive with a target already chosen, usually whatever the data happens to record. Cost stands in for need, clicks stand in for interest, arrests stand in for crime, a test score stands in for learning. Each is a real measurement and each is correlated with the thing it replaces, which is what makes them look serviceable. The failure is not that the stand-in is noisy. It is that its distance from the real thing is not the same for everyone, so a model can be accurate everywhere and still rank one group below another at the same level of the thing you actually meant.",
    },
    howItWorks: {
      en: "Two questions get confused. \"Is the model accurate?\" is asked against the label, and can be answered from the data the model was trained on. \"Does the model do what we wanted?\" is asked against the goal, and cannot be answered from that data at all, because the goal was never measured. When the label and the goal are the same thing, the two questions collapse into one and the confusion is harmless. When they differ, the first question can be answered yes forever while the second is never asked. The way to find it is not a better accuracy metric but an outside measurement: get hold of the thing you actually care about, for a sample, and check the model against that instead. In the case here, that meant linking risk scores to laboratory results and diagnoses, data the algorithm never touched, and asking whether patients it called equally risky were equally ill. They were not."
    },
    examples: [
      {
        title: { en: "The same algorithm, retrained on health" },
        summary: {
          en: "The authors did not stop at describing the problem. Working with the manufacturer, they built predictors of health rather than cost, using the same claims data and the same modelling approach, and the racial gap in who was flagged largely closed. Nothing about the mathematics changed and no protected attribute was added. What changed was the question the model was asked, from what will this patient cost to how ill will this patient be, and that turned out to be the whole of it.",
        },
        provenance: {
          source:
            "Obermeyer Z, Powers B, Vogeli C, Mullainathan S. Dissecting racial bias in an algorithm used to manage the health of populations. Science 2019;366(6464):447-453, Table 1 and the section on experiments with label choice. Open access at science.org",
          year: 2019,
          doi: "10.1126/science.aax2342",
          url: "https://www.science.org/doi/10.1126/science.aax2342",
        },
      },
    ],
  },

  share: {
    title: { en: "An algorithm that was accurate and asked the wrong question." },
    explainer: {
      en: "A model is trained on whatever the data happens to hold, and that stand-in is rarely the thing anyone cares about. Cost stands in for need, clicks for interest, arrests for crime. Checking that the model predicts the stand-in accurately cannot tell you whether it serves the purpose, because every such check is measured against the stand-in itself. Ask what the label measures before asking how well it is predicted.",
    },
    captions: {
      competitive: { en: "Asked what the number was measuring." },
      selfDeprecating: { en: "I checked the accuracy of the wrong question." },
    },
  },

  provenance: {
    source:
      "Obermeyer Z, Powers B, Vogeli C, Mullainathan S. Dissecting racial bias in an algorithm used to manage the health of populations. Science 2019;366(6464):447-453, Table 1. Open access at science.org",
    year: 2019,
    doi: "10.1126/science.aax2342",
    url: "https://www.science.org/doi/10.1126/science.aax2342",
  },
};
