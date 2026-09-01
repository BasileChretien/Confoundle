import type { Puzzle } from "../schema.ts";

/**
 * Puzzle #14, intention to treat versus per protocol, on the STICH trial.
 *
 * Why this trial and not a tidier one: the two analyses reach OPPOSITE verdicts
 * on the same 1,212 patients, the same outcome and the same follow-up. Per
 * protocol, bypass surgery cuts deaths and the result is significant. As
 * randomised, it does not reach significance. There is no "different trial,
 * different endpoint" objection to answer, and no need to argue about effect
 * sizes: the conclusion itself flips.
 *
 *   As randomised (intention to treat):
 *     medicine alone   244 / 602 = 40.5%
 *     surgery added    218 / 610 = 35.7%      hazard ratio 0.86, P = 0.123
 *   Per protocol:
 *     medicine alone   229 / 537 = 42.6%
 *     surgery added    188 / 555 = 33.9%      hazard ratio 0.76, P = 0.005
 *   The patients the per-protocol set left out:
 *     assigned medicine  15 / 65 = 23.1%
 *     assigned surgery   30 / 55 = 54.5%
 *
 * The third panel is the mechanism, and it is what makes this puzzle rather
 * than an anecdote. The patients dropped from the medical arm are the ones who
 * CROSSED OVER to surgery, which required surviving long enough to reach an
 * operating table, so they died at 23%. The patients dropped from the surgical
 * arm are largely those who DIED BEFORE their operation, so they died at 55%.
 * Excluding them is not a neutral tidy-up: dying is part of what caused a
 * patient to be excluded.
 *
 * Both removals push the same way. The medical arm loses 65 people who were
 * dying less often than its own average, so its rate rises. The surgical arm
 * sheds 55 people who were dying far more often than its average, so its rate
 * falls. A 4.8 point gap becomes an 8.8 point gap without a single patient
 * changing what happened to them.
 *
 * Provenance detail worth knowing before touching these numbers. The four
 * counts in the first two panels are printed. The 65 and 55 are NOT printed:
 * they are 602 - 537 and 610 - 555, subtraction over printed denominators. The
 * 15 and 30 are likewise 244 - 229 and 218 - 188. That arithmetic closes three
 * ways, which is why it is safe: the excluded patients reassemble the
 * as-treated arms (537 + 55 = 592 and 555 + 65 = 620, summing to 1,212), and
 * total deaths are conserved in every split (244 + 218 = 259 + 203 = 462).
 * The P values come from Cox models, not from these 2x2 tables, and the
 * provenance note says so.
 *
 * The strata are one trial partitioned, not three samples, so pooling them
 * would count most patients twice: hence strataAreSeparateSamples. And nothing
 * is crowned, because crowning the taller bar in the per-protocol panel would
 * assert exactly the finding the puzzle exists to undermine.
 */
export const intentionToTreat: Puzzle = {
  schemaVersion: 1,
  id: "intention-to-treat-stich",
  slug: "who-got-left-out",
  category: "statistical-reasoning",
  reasoningSkill: "intention-to-treat",
  difficulty: "hard",
  tags: ["clinical", "research", "statistics"],
  supportedLocales: ["en"],

  setup: {
    headline: {
      en: "Among the patients who actually got the treatment they were assigned, surgery saved lives. Is that the trial's answer?",
    },
    framing: {
      en: "1,212 people with heart failure, randomly assigned to medicine alone or to medicine plus bypass surgery. Analysing the ones who received what they were assigned, 43 percent of the medicine group died against 34 percent of the surgery group. The difference is statistically significant.",
    },
    question: { en: "Does this trial show that surgery cuts deaths?" },
    data: {
      type: "rates",
      metricLabel: { en: "Died during follow-up" },
      higherIsBetter: false,
      // Crowning the shorter bar in the per-protocol panel would assert the
      // very finding this puzzle exists to take apart.
      crownWinner: false,
      // One trial partitioned three ways. Pooling the panels would count most
      // of the 1,212 patients twice.
      strataAreSeparateSamples: true,
      groups: [
        {
          id: "medical",
          label: { en: "Medicine alone" },
          short: { en: "Medicine" },
        },
        {
          id: "surgery",
          label: { en: "Surgery added" },
          short: { en: "Surgery" },
        },
      ],
      strata: [
        { id: "protocol", label: { en: "Only those who got what they were assigned" } },
        { id: "randomised", label: { en: "Everyone, as the coin assigned them" } },
        { id: "excluded", label: { en: "The patients left out of the first panel" } },
      ],
      observations: [
        { groupId: "medical", stratumId: "protocol", numerator: 229, denominator: 537 },
        { groupId: "surgery", stratumId: "protocol", numerator: 188, denominator: 555 },
        { groupId: "medical", stratumId: "randomised", numerator: 244, denominator: 602 },
        { groupId: "surgery", stratumId: "randomised", numerator: 218, denominator: 610 },
        { groupId: "medical", stratumId: "excluded", numerator: 15, denominator: 65 },
        { groupId: "surgery", stratumId: "excluded", numerator: 30, denominator: 55 },
      ],
    },
    initialView: {
      kind: "stratified",
      strataIds: ["protocol"],
      caption: { en: "Those who followed the protocol" },
    },
  },

  choices: [
    {
      id: "yes",
      label: { en: "Yes, that is what surgery does" },
      sublabel: { en: "nine points fewer deaths" },
      isCorrect: false,
      isIntuitiveTrap: true,
    },
    {
      id: "underestimate",
      label: { en: "No, and it understates the benefit" },
      sublabel: { en: "crossovers dilute a real effect" },
      isCorrect: false,
      isIntuitiveTrap: false,
    },
    {
      id: "broken",
      label: { en: "No, that comparison is no longer randomised" },
      sublabel: { en: "dying is why some were left out" },
      isCorrect: true,
      isIntuitiveTrap: false,
    },
    {
      // The hedge. Offered in nearly every puzzle so that picking it is a
      // judgement rather than a tell, and wrong here, because the setup
      // already gives you what you need to answer.
      id: "cannot-tell",
      label: { en: "There is no way to tell" },
      sublabel: { en: "too little to go on" },
      isCorrect: false,
      isIntuitiveTrap: false,
    },
  ],

  reveal: {
    headline: {
      en: "Counting everyone the coin assigned, the difference is not significant.",
    },
    mechanismLabel: { en: "Who the analysis dropped" },
    mechanismName: { en: "The surgical patients who were dropped had mostly died first" },
    explanation: {
      en: "The 120 patients missing from the first panel are not a random sample. Of the 55 dropped from the surgery group, 30 died, and most of them died before they ever reached an operating table. Of the 65 dropped from the medicine group, only 15 died, because crossing over to surgery required living long enough to have it. So the surgical arm shed its worst outcomes and the medical arm lost its best, and the gap nearly doubled without one patient's fate changing:",
    },
    body: {
      en: "A randomised comparison is only worth something while it is still random. The coin flip made the two groups alike; deciding afterwards who counts, on the basis of something that happened after the flip, undoes that. Here the deciding factor was survival itself, which is the outcome being measured. Counting everyone in the group they were assigned to, whatever happened next, is the analysis that keeps the coin flip intact.",
    },
    view: { kind: "stratified", caption: { en: "All three views of one trial" } },
  },

  lesson: {
    skillName: { en: "Intention to treat" },
    takeaway: {
      en: "Once you exclude people for what happened after they were randomised, you are no longer comparing the groups the coin made, and the exclusions usually favour one side.",
    },
    body: {
      en: "This is not a rule that per-protocol analysis is dishonest. It answers a different question, and there are trials where it is the right one to ask. The rule is narrower and harder: any analysis that drops people for something that happened after randomisation has to explain why those people were not different, and when the reason for dropping is entangled with the outcome, no explanation will do.",
    },
    howItWorks: {
      en: "Randomisation buys one thing: two groups that differ only by chance, including in all the ways nobody measured. Everything a trial claims rests on that. The trouble is that trials are run on people, who cross over, refuse the operation, stop the tablets or die before treatment starts, and it is tempting to set those people aside and look at the clean comparison underneath. But whether someone stayed on protocol is itself an outcome. Patients who cross from medicine to surgery must survive to be operated on. Patients assigned to surgery who never get it are often the ones too ill to be operated on, or already dead. Removing them is removing patients selected by prognosis, and prognosis is what the trial is measuring. Intention to treat keeps everyone in the arm the coin put them in, which sounds absurd when a patient never received the treatment, and is exactly the point: it measures the effect of the decision to treat, under real conditions, which is also the decision a doctor actually faces. It has a known cost. Crossovers pull the arms together, so intention to treat tends to shrink a real effect towards nothing. That is a conservative failure when you are trying to prove a drug works, and a dangerous one when you are trying to prove a drug is no worse than another, which is why non-inferiority trials report both analyses and are believed only when the two agree.",
    },
    examples: [
      {
        title: { en: "Where every excluded patient had already relapsed" },
        summary: {
          en: "A trial compared two treatments for opioid dependence in 570 people. Counting only those who actually started the drug they were assigned, the first treatment looked slightly better: 52 percent relapsed against 56 percent. Counting everyone the coin assigned, it was clearly worse, 65 percent against 57 percent. The reason is the cleanest you will find. That first drug can only be started after a full detoxification, or it triggers immediate withdrawal, so 79 of its patients never managed to begin it, against 17 in the other arm. Every single one of those 79 relapsed. Dropping them removed the whole of the treatment's failure.",
        },
        provenance: {
          source:
            "Lee JD, Nunes EV Jr, Novo P, et al. Comparative effectiveness of extended-release naltrexone versus buprenorphine-naloxone for opioid relapse prevention (X:BOT). Lancet. 2018;391(10118):309-318, Table 2. Free full text at PMC5806119. Relapse among those who initiated: 106 of 204 and 150 of 270. Relapse in the full randomised sample: 185 of 283 and 163 of 287. The counts for the patients excluded are subtraction over those printed integers, and they close: 283 minus 204 is 79 never inducted, and 185 minus 106 is 79 relapses among them.",
          year: 2018,
          doi: "10.1016/S0140-6736(17)32812-X",
          url: "https://pubmed.ncbi.nlm.nih.gov/29150198/",
        },
      },
      {
        title: { en: "The same trap, without the verdict flipping" },
        summary: {
          en: "A tuberculosis trial compared shorter regimens with the standard six-month one. In the group treated per protocol, the standard regimen appeared to fail in about 8 percent of patients. Counting everyone who was randomised and had an assessable outcome, it failed in about 16 percent. Almost everyone the per-protocol analysis removed had had an unfavourable outcome, because an unfavourable outcome was frequently the reason they left the protocol. Nothing about the trial's conclusion changed, and every failure rate in it halved.",
        },
        provenance: {
          source:
            "Gillespie SH, Crook AM, McHugh TD, et al. Four-month moxifloxacin-based regimens for drug-sensitive tuberculosis (REMoxTB). N Engl J Med. 2014;371(17):1577-1587, Table 2. Rates in the modified intention-to-treat and per-protocol populations are reported side by side for each arm.",
          year: 2014,
          doi: "10.1056/NEJMoa1407426",
          url: "https://pubmed.ncbi.nlm.nih.gov/25196020/",
        },
      },
    ],
  },

  share: {
    title: { en: "Intention to treat, a reasoning trap." },
    explainer: {
      en: "A trial flips a coin so its two groups start out alike. Then real life happens: people switch treatments, refuse the operation, or die before it. It seems only fair to compare the ones who actually got what they were assigned. It is not, because whether someone stuck to the plan depends on how they were doing, and often on whether they survived. Dropping them quietly sorts the groups by prognosis, which is the very thing the trial is trying to measure. Count everyone where the coin put them, and the flattering result can vanish.",
    },
    captions: {
      competitive: { en: "Caught it. Bet you can't." },
      selfDeprecating: { en: "I totally fell for this." },
    },
  },

  provenance: {
    source:
      "Velazquez EJ, Lee KL, Deja MA, et al. Coronary-artery bypass surgery in patients with left ventricular dysfunction (STICH). N Engl J Med. 2011;364(17):1607-1616, and its Supplementary Appendix, Table S5 (death from any cause at a median of 56 months, intention-to-treat and per-protocol populations).",
    year: 2011,
    doi: "10.1056/NEJMoa1100356",
    url: "https://pubmed.ncbi.nlm.nih.gov/21463150/",
    note: {
      en: "The four counts in the first two panels are printed. The third panel is subtraction over those printed integers rather than figures of its own: 65 and 55 are 602 minus 537 and 610 minus 555, and 15 and 30 are 244 minus 229 and 218 minus 188. It closes three ways. The excluded patients reassemble the as-treated arms, 537 plus 55 and 555 plus 65 giving 592 and 620, which sum to the 1,212 randomised; and total deaths are conserved in every split, 244 plus 218 and 259 plus 203 both giving 462. Note also that the trial's P values, 0.12 as randomised and 0.005 per protocol, come from Cox proportional-hazards models over the whole follow-up, not from these four-cell tables, so they are quoted as the trial's own results and not recomputed here.",
    },
  },

  goDeeperUrl: "https://en.wikipedia.org/wiki/Intention-to-treat_analysis",
};
