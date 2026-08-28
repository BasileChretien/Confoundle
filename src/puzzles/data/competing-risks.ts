import type { Puzzle } from "../schema";

/**
 * The competing risk, on the `competing` shape.
 *
 * 481 Framingham members who had already broken a hip, followed until a second
 * fracture, death, dropout, or the study closing in 2003. The setup draws the
 * standard survival-analysis curve and nothing else, because that is what a
 * paper prints and what a reader is asked to believe: 21 per 100 by ten years.
 *
 * The reveal adds the competing-risk curve, which ends at 12, and beneath it
 * the fates of the whole cohort. That last part is what makes the reveal a
 * fact rather than a second opinion: 73 of every 100 died without a second
 * fracture, so the first curve spends ten years counting people who were not
 * there.
 *
 * THE MODEL IS NOT WRONG AND THE CARD MUST NOT SAY IT IS. One minus
 * Kaplan-Meier correctly estimates a well defined thing: the risk that would
 * be seen if death did not intervene. For a question about biology that can be
 * the quantity you want. It is simply not the quantity a patient asking "will
 * this happen to me" is asking about.
 *
 * NUMBERS ARE THE OBSERVED COMPARISON ONLY. The source's section is headed
 * "Simulation Study", and part of it is: mortality was varied from 10 to 85
 * per cent to draw Figures 1 and 2. Those figures are simulated and are not
 * used here. The 3/7/11/21 against 3/6/8/12 comparison and the 15/73/12
 * composition are the real cohort at its own observed mortality, stated in the
 * Results with no assumption attached. See backlog entry 76.
 *
 * ONE RATIO IS QUOTED AND THE OTHER IS NOT, deliberately. 21 over 12 is 1.75
 * exactly and the paper independently says "75% greater", so the reveal quotes
 * it. 11 over 8 is 1.375, which rounds to 38, while the paper says 37 because
 * it computed from unrounded estimates. Printing a derived five-year ratio
 * beside the citation would have the page contradict its own source over a
 * rounding artefact.
 */
export const competingRisks: Puzzle = {
  schemaVersion: 1,
  id: "competing-risks-second-hip-fracture",
  slug: "the-risk-if-nobody-died",
  category: "causal-reasoning",
  reasoningSkill: "competing-risks",
  difficulty: "hard",
  tags: ["research", "clinical", "epidemiology"],
  supportedLocales: ["en"],

  setup: {
    headline: {
      en: "A study follows older people who have just broken a hip, to find out how often it happens again. The published curve climbs to 21 in 100 by ten years.",
    },
    framing: {
      en: "481 members of the Framingham Heart Study broke a hip between 1948 and 2003. Each was then followed until a second hip fracture, until death, until they dropped out, or until the study closed. Half were followed for less than 4.2 years, though a few were followed for more than forty. This is the standard survival-analysis curve, drawn the way almost every paper draws one.",
    },
    question: { en: "Out of 100 such patients, how many break a hip again within ten years?" },
    data: {
      type: "competing",
      label: { en: "Second hip fracture after a first one" },
      timeUnit: { en: "years" },
      metricLabel: { en: "patients per 100 who have had a second hip fracture" },
      naiveLabel: { en: "Standard survival analysis" },
      adjustedLabel: { en: "Counting death as an outcome" },
      gapLabel: {
        en: "The shaded band is the extra risk the upper curve reports by treating the people who had died as though they were still able to break a hip.",
      },
      cohortNote: {
        en: "481 Framingham Heart Study members with a first hip fracture, 1948 to 2003. Median follow-up 4.2 years.",
      },
      points: [
        { t: 1, naive: 3, adjusted: 3 },
        { t: 3, naive: 7, adjusted: 6 },
        { t: 5, naive: 11, adjusted: 8 },
        { t: 10, naive: 21, adjusted: 12 },
      ],
      fates: [
        {
          id: "again",
          label: { en: "Broke a hip a second time" },
          share: 15,
          role: "event",
        },
        {
          id: "died",
          label: { en: "Died without a second fracture" },
          share: 73,
          role: "competing",
        },
        {
          id: "alive",
          label: { en: "Alive when the study closed" },
          share: 12,
          role: "stillfollowed",
        },
      ],
    },
    initialView: { kind: "asestimated" },
  },

  /*
    THE SKILL LICENSES A DIRECTION, NOT A MAGNITUDE, so exactly one band sits
    on the low side. That 21 becomes 12 rather than 17 is not derivable from
    the setup and nobody is asked to derive it.

    "There is no way to tell" is WRONG here, and that is the one thing on this
    card worth checking twice, since the project's rule normally pushes the
    other way. It is wrong because the ordering is a theorem rather than a
    guess: treating a death as a censoring keeps that patient in the risk set,
    so the drawn curve is an upper bound on the answer, always. The framing
    says death ended follow-up, so a player knows deaths occurred. The
    direction really is tellable, and a player who says otherwise has missed
    something knowable rather than been ambushed.
  */
  choices: [
    {
      id: "as-drawn",
      label: { en: "About 21 in 100" },
      sublabel: { en: "that is what the curve measures" },
      isCorrect: false,
      isIntuitiveTrap: true,
    },
    {
      id: "fewer",
      label: { en: "Fewer than 21 in 100" },
      sublabel: { en: "many of them die before they can break it again" },
      isCorrect: true,
      isIntuitiveTrap: false,
    },
    {
      id: "more",
      label: { en: "More than 21 in 100" },
      sublabel: { en: "some were followed for less than ten years" },
      isCorrect: false,
      isIntuitiveTrap: false,
    },
    {
      id: "cannot-tell",
      label: { en: "There is no way to tell" },
      sublabel: { en: "a curve like this cannot say" },
      isCorrect: false,
      isIntuitiveTrap: false,
    },
  ],

  reveal: {
    headline: {
      en: "Twelve in 100. The curve reads 21 because it spends ten years counting people who had already died, and 73 of every 100 of these patients died without ever breaking a hip again.",
    },
    mechanismLabel: { en: "The risk of what, for whom?" },
    mechanismName: { en: "A competing risk" },
    explanation: {
      en: "Survival analysis was built to describe death in the presence of people who simply stopped being followed. Anyone not yet known to have the outcome is censored, and a censored patient is treated as still at risk for the rest of the study. That is reasonable for somebody who moved house. It is not reasonable for somebody who is dead, because they cannot go on to break a hip, and no amount of follow-up will change that. Here 73 in 100 died first, so the curve carries them upward for years after they were beyond risk. At ten years the published figure is 75 per cent greater than the estimate that counts death as an outcome in its own right.",
    },
    body: {
      en: "The same study gives the tell, if anyone looks. By standard survival analysis the median time to a second hip fracture was 26 years. A median is the point by which half the group has had the event, and in this cohort only 15 in 100 ever did. The number is not a median of anything that happened; it is a median in a world where these patients live long enough for it to mean something. Notice also that the gap widens with follow-up: at one year the two methods agree exactly, at three years they differ by one point, and at ten by nine. The longer you follow an elderly cohort, the more of it is dead, and the more of the curve is describing them.",
    },
    view: { kind: "aseveryone" },
  },

  lesson: {
    skillName: { en: "Competing risks" },
    takeaway: {
      en: "A survival curve answers the question of how likely the outcome would be if nothing else could happen first. When something else can, and often does, that is not the question anyone asked. Before reading a risk off a curve, ask what the people who are no longer being followed are doing, and whether they could still have the outcome at all.",
    },
    body: {
      en: "A competing risk is any event that removes a person from the possibility of the outcome you are counting. Death is the common one, but not the only one: a transplant competes with dialysis complications, a second-line drug competes with relapse on the first, an operation competes with the wait for one. The arithmetic of survival analysis is not in doubt and its assumptions are stated openly. The trouble is that one of them, that a person who leaves the study could still have had the outcome, is silently false for the dead, and nobody rereads an assumption they have seen printed a hundred times.",
    },
    howItWorks: {
      en: "Two quantities get the same name. The first is the risk of the outcome in a hypothetical world where the competing event has been abolished, which is what one minus Kaplan-Meier estimates. The second is the share of real people who go on to have the outcome, which is what a cumulative incidence function estimates and what a patient in a clinic is asking about. When the competing event is rare, the two are close and the confusion costs nothing. When it is common, they come apart, and they come apart further the longer the follow-up runs, because the pool of people being carried along after death keeps growing. The first quantity is not useless: for a question about mechanism, abolishing death may be exactly the thought experiment you want. The test is whether you are describing a biological tendency or telling somebody what is likely to happen to them. Only the second needs the competing event counted, and it is the one that reaches patients.",
    },
    examples: [
      {
        title: { en: "The number that pointed the other way" },
        summary: {
          en: "The same paper ran the comparison a second time, on the effect of age rather than on the risk. Standard Cox regression put the hazard ratio for each extra five years of age at 1.3, meaning older patients broke a hip again more often. Competing risk regression on the same people put it at 0.9, meaning they did so less often. Both are defensible answers to different questions, and only one of them describes what happens to a cohort of eighty-year-olds, in which the extra five years of age are mostly spent dying of something else. A difference in method that changes an estimate by a factor is worth noticing; one that changes its direction is worth stopping for.",
        },
        provenance: {
          source:
            "Berry SD, Ngo L, Samelson EJ, Kiel DP. Competing risk of death: an important consideration in studies of older adults. J Am Geriatr Soc 2010;58(4):783-787, Results. Free full text at PMC2873048",
          year: 2010,
          doi: "10.1111/j.1532-5415.2010.02767.x",
          url: "https://pmc.ncbi.nlm.nih.gov/articles/PMC2873048/",
        },
      },
    ],
  },

  share: {
    title: { en: "A risk that was measured in a world where nobody dies." },
    explainer: {
      en: "Survival curves treat anyone no longer being followed as though they could still have the outcome. For someone who moved house that is fair. For someone who died it is not, and in an elderly cohort most of the people the curve is carrying are dead. The published risk of a second hip fracture was 21 in 100 at ten years. Counting the deaths, it was 12. Ask what the people who left the study are doing before you read a risk off a curve.",
    },
    captions: {
      competitive: { en: "Asked what the dead were still doing in the risk set." },
      selfDeprecating: { en: "I read a risk off a world that does not exist." },
    },
  },

  provenance: {
    source:
      "Berry SD, Ngo L, Samelson EJ, Kiel DP. Competing risk of death: an important consideration in studies of older adults. J Am Geriatr Soc 2010;58(4):783-787, Results. The cohort is Berry SD, Samelson EJ, Hannan MT, et al, Arch Intern Med 2007;167(18):1971-1976. Figures 1 and 2 of the 2010 paper vary mortality by simulation and are not used here. Free full text at PMC2873048",
    year: 2010,
    doi: "10.1111/j.1532-5415.2010.02767.x",
    url: "https://pmc.ncbi.nlm.nih.gov/articles/PMC2873048/",
  },
};
