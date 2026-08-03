import type { Puzzle } from "../schema";

/**
 * Puzzle #41, compliance sequencing, on Freedman and Fraser (1966) with
 * Cialdini et al. (1975) as the deep dive. Backlog entry 19, opened by the
 * propaganda audit.
 *
 * WHY THE PAIR IS THE LESSON. Foot-in-the-door says ask for something tiny
 * first and the large request succeeds. Door-in-the-face says ask for something
 * outrageous first, get refused, and the moderate request succeeds. They are
 * opposite prescriptions and both are true, which is exactly why a reader
 * cannot defend themselves with a rule of thumb about request size. The only
 * defence is noticing that a prior interaction happened at all.
 *
 * READ FROM TABLE 1 ON PAGE 197, VISUALLY, because `pdftotext -layout`
 * misaligns the condition labels against their percentages. N = 36 per group,
 * so every printed percentage converts to an exact whole number:
 *
 *   Performance, carried out the small request   19/36  52.8
 *   Agree-Only, agreed but never had to do it    12/36  33.3
 *   Familiarization, same call with no request   10/36  27.8
 *   One-Contact, no prior contact                 8/36  22.2
 *
 * RECONCILED THREE WAYS, asserted in the test file. All four percentages
 * reproduce from an integer out of 36 with no rounding needed. Four groups of
 * 36 is 144, and the methods state 156 housewives with 12 extra distributed
 * among the two-contact conditions who could not be reached for the second call
 * and were excluded, so 144 plus 12 is exactly 156. And the two starred rows
 * carry the significance levels against the Performance condition.
 *
 * THE CONTROLS ARE WHY THIS IS A PUZZLE AND NOT A FACT. Familiarization holds
 * constant the time on the phone with the same person and produces almost
 * nothing, so the effect is not rapport or liking. Agree-Only shows that saying
 * yes is worth much less than having actually done the thing. Each bar kills a
 * different explanation, which is why the reveal shows all four rather than the
 * headline pair.
 *
 * NO NEW SHAPE. `rates` with four groups and a single stratum, which the schema
 * has always allowed and no puzzle had used. The setup filters to the
 * One-Contact group so the reader sees only the baseline.
 */
export const complianceSequencing: Puzzle = {
  schemaVersion: 1,
  id: "compliance-sequencing-1966",
  slug: "the-small-favour-first",
  category: "causal-reasoning",
  reasoningSkill: "compliance-sequencing",
  difficulty: "medium",
  tags: ["everyday", "psychology", "economics"],
  supportedLocales: ["en"],

  setup: {
    headline: {
      en: "A stranger phoned and asked to send six men into their homes for two hours. Some said yes.",
    },
    framing: {
      en: "156 households were telephoned by a man from something called the California Consumers' Group. His large request was the same for everybody: five or six men from his staff would come into the home one morning for about two hours, with full freedom to go through every cupboard and storage place and classify all the household products in it. Below is what happened among the people who had never heard from him before. The interesting part is that three other groups of the same size had all had one earlier phone call from the same man, three days beforehand, and those calls differed only in what they asked for.",
    },
    question: {
      en: "One earlier group had been asked a tiny favour and had done it: answered eight questions about their household soap. What share of them agreed to the two-hour search?",
    },
    data: {
      type: "rates",
      metricLabel: {
        en: "Agreed to the two-hour search of their home",
      },
      // Compliance with a manipulation. Neither direction is virtuous, and the
      // engine only reads this when a winner is crowned, which it is not.
      higherIsBetter: true,
      // Crowning a bar would frame one condition as the victor of a contest.
      // The four conditions are an experiment, not a competition.
      crownWinner: false,
      groups: [
        {
          id: "one-contact",
          label: { en: "No earlier call at all" },
          short: { en: "No call" },
        },
        {
          id: "familiarization",
          label: {
            en: "Earlier call, but he asked for nothing and just introduced himself",
          },
          short: { en: "Just talked" },
        },
        {
          id: "agree-only",
          label: {
            en: "Earlier call, agreed to answer the questions but was never asked them",
          },
          short: { en: "Agreed only" },
        },
        {
          id: "performance",
          label: {
            en: "Earlier call, agreed and actually answered eight questions about soap",
          },
          short: { en: "Did the favour" },
        },
      ],
      strata: [{ id: "all", label: { en: "The large request" } }],
      observations: [
        {
          groupId: "one-contact",
          stratumId: "all",
          numerator: 8,
          denominator: 36,
        },
        {
          groupId: "familiarization",
          stratumId: "all",
          numerator: 10,
          denominator: 36,
        },
        {
          groupId: "agree-only",
          stratumId: "all",
          numerator: 12,
          denominator: 36,
        },
        {
          groupId: "performance",
          stratumId: "all",
          numerator: 19,
          denominator: 36,
        },
      ],
    },
    initialView: {
      kind: "aggregate",
      groupIds: ["one-contact"],
      caption: { en: "People who had never been called before" },
    },
  },

  choices: [
    {
      id: "same",
      label: { en: "About the same. Eight questions about soap buys nothing" },
      sublabel: { en: "the two requests are not remotely comparable" },
      isCorrect: false,
      isIntuitiveTrap: true,
    },
    {
      // Deliberately points the other way. This slot used to read "a little
      // more, perhaps a third of them", which shared a direction with the
      // correct answer while nothing in the setup could choose between them:
      // foot-in-the-door licenses "more", never "how much more". Reversed
      // rather than deleted, because reactance is a real prediction and a
      // reader who makes it has thought about the problem rather than skipped
      // it.
      id: "fewer",
      label: { en: "Fewer. A second approach from the same man puts people on guard" },
      sublabel: { en: "nobody enjoys being softened up" },
      isCorrect: false,
      isIntuitiveTrap: false,
    },
    {
      id: "double",
      label: { en: "More than double. Over half of them agreed" },
      sublabel: { en: "having done the small thing changed who they were" },
      isCorrect: true,
      isIntuitiveTrap: false,
    },
    {
      // The hedge, reused verbatim from the rest of the deck so it carries no
      // lexical tell. Wrong here: all four conditions were run and counted.
      id: "cannot-tell",
      label: { en: "There is no way to tell" },
      sublabel: { en: "too little to go on" },
      isCorrect: false,
      isIntuitiveTrap: false,
    },
  ],

  reveal: {
    headline: {
      en: "Answering eight questions about soap more than doubled it.",
    },
    mechanismLabel: { en: "What the earlier phone call asked for" },
    mechanismName: {
      en: "The first small yes is what the second request is really asking about",
    },
    explanation: {
      en: "With no earlier call, 8 of 36 agreed to let six men search their home for two hours. Among those who had answered eight questions about soap three days earlier, 19 of 36 agreed: 53 per cent against 22. The large request was word for word the same, and the earlier call had asked for perhaps three minutes.",
    },
    body: {
      en: "The two middle bars are the ones that make this an experiment rather than an anecdote, and each kills a different explanation. If the effect were rapport, or simply having spoken to a friendly man from an organisation you now recognise, then the Familiarization group should show it: those people got the same call from the same person, heard all the same questions read out, and spent the same time on the phone. He simply never asked them for anything. They came in at 10 of 36, barely above the people who had never been called. So it is not liking, and it is not familiarity. If the effect were agreement itself, the Agree-Only group should match the Performance group: they said yes to exactly the same request. They came in at 12 of 36, roughly halfway. So saying yes is worth something and doing the thing is worth much more. What seems to move is the picture the person now has of themselves, as someone who helps out with this sort of survey, and the second request is then asking that person rather than the one who answered the phone on Monday.",
    },
    view: {
      kind: "aggregate",
      caption: { en: "All four groups, and each control kills an explanation" },
    },
  },

  lesson: {
    skillName: { en: "Compliance sequencing" },
    takeaway: {
      en: "A request rarely arrives alone. What you agreed to earlier changes what you will agree to now, and the earlier thing is usually so small that you would not think to count it as part of the decision.",
    },
    body: {
      en: "The trap here has a shape most reasoning traps do not, because there are two opposite versions of it and both work. Foot in the door is the one measured above: ask for something trivial, get it, and the large request that follows succeeds far more often. Door in the face is its mirror image, and Cialdini demonstrated it nine years later: ask for something outrageous, get refused, then ask for the thing you wanted, and that also roughly doubles compliance. One says start small. The other says start impossible. They cannot both be a rule about the size of the first request, which is precisely the point. What they share is that a prior exchange has happened, and the second request is being judged against it rather than on its own terms. In the first case you are judging it against the person you have just demonstrated yourself to be. In the second you are judging it against a demand you have just refused, so it looks like a concession you owe something for. Either way the anchor is invisible, because it feels like a separate conversation that is now over.",
    },
    howItWorks: {
      en: "Three habits. First, when you find yourself agreeing to something notably larger than you would have expected, ask what happened immediately before, and count it even if it seemed like nothing and even if it ended in your refusing. A refusal is not a reset; in the door-in-the-face version the refusal is the mechanism. Second, judge the request on its own terms by asking what you would say if it arrived cold from a stranger this minute. That is a question you can actually answer, and it strips out the sequence without requiring you to work out how the sequence affected you. Third, be aware that this is the deliberate design of most fundraising, most sales scripts and most negotiation training, and that none of it depends on deceiving you about the request itself. Everything said in the study above was true. The men really would have come. The questions really were about soap. This is why a habit of checking whether claims are accurate does not protect you at all here: nothing inaccurate was ever said. And note the honest limit of the finding, which is that a follow-up request must be plausibly connected to the first. Nobody has shown that answering a survey makes you agreeable to everything, only to the next thing from the same quarter.",
    },
    examples: [
      {
        title: { en: "The opposite trick, which works just as well" },
        summary: {
          en: "Cialdini and colleagues stopped students on campus and made an extreme request: work without pay as a counsellor at a juvenile detention centre, two hours a week, for a minimum of two years. Not one person out of the whole experiment agreed to it. Then, having been turned down, the experimenter immediately asked for something far smaller: chaperone a group of juvenile delinquents on a two-hour trip to the zoo. Half of them said yes, 12 of 24. Among students asked only for the zoo trip, with no extreme request first, 4 of 24 agreed. A third group heard the extreme request described but were not themselves asked to do it, which tests whether merely hearing something enormous makes the moderate thing look small by comparison, and they came in at 6 of 24, not significantly different from the control. So it is not a trick of perspective. It is that the requester appears to have given ground, and a concession seems to call for a concession in return. The lesson for a reader is uncomfortable: being asked for something absurd and refusing it leaves you more likely to agree to the next thing, not less.",
        },
        provenance: {
          source:
            "Cialdini RB, Vincent JE, Lewis SK, Catalan J, Wheeler D, Darby BL. Reciprocal concessions procedure for inducing compliance: the door-in-the-face technique. Journal of Personality and Social Psychology. 1975;31(2):206-215. Experiment 1, Table 1, page 209: percentage of subjects complying with the smaller request was 50.0 in the rejection-moderation condition, 25.0 in the exposure control and 16.7 in the smaller-request-only control, with the note stating n = 24 for each condition, giving 12, 6 and 4 of 24. Page 209 also states that no subject during the course of the experiment ever agreed to perform the initial, large favor. The contrast between the two controls gave chi-squared = .50, not significant, and the combined controls against the rejection-moderation condition gave chi-squared = 6.42, p = .011, two-tailed.",
          year: 1975,
          doi: "10.1037/h0076284",
        },
      },
    ],
  },

  share: {
    title: { en: "Compliance sequencing, a reasoning trap." },
    explainer: {
      en: "A man phoned 156 households and asked to send five or six men into the home for two hours to go through every cupboard. With no prior contact, 8 of 36 agreed. Among those who three days earlier had answered eight questions about their household soap, 19 of 36 agreed. Same request, more than double the yes rate. And the controls rule out the easy explanations: people who got the same friendly call but were asked for nothing came in at 10 of 36, and people who agreed to the questions but were never actually asked them at 12 of 36. Saying yes is worth something. Having done it is worth much more.",
    },
    captions: {
      competitive: { en: "Caught it. Bet you can't." },
      selfDeprecating: { en: "I totally fell for this." },
    },
  },

  provenance: {
    source:
      "Freedman JL, Fraser SC. Compliance without pressure: the foot-in-the-door technique. Journal of Personality and Social Psychology. 1966;4(2):195-202. Table 1, page 197, percentage of subjects complying with the large request in Experiment 1: Performance 52.8, Agree-Only 33.3, Familiarization 27.8, One-Contact 22.2, with the note stating N = 36 for each group, giving 19, 12, 10 and 8 of 36. Significance levels in that table are against the Performance condition, p below .07 for Familiarization and p below .02 for One-Contact. Method at pages 196-197: 156 Palo Alto, California housewives, 36 in each condition, with an additional 12 distributed equally among the three two-contact conditions who could not be reached for the second contact and are not included in the analysis; all contacts by telephone from the same experimenter, the first call on a Monday or Tuesday and the second always three days later; the large request described five or six men coming into the home for about two hours with full freedom to go through cupboards and storage places.",
    year: 1966,
    doi: "10.1037/h0023552",
    note: {
      en: "Read from the paper, and Table 1 read from the rendered page rather than from extracted text, because the automatic extraction misaligns the four condition labels against their four percentages and would have paired every one of them wrongly. Reconciled three ways. All four printed percentages reproduce from a whole number out of 36 with no rounding required, which is a strong check because a misread cell would almost certainly not land on an integer. Four groups of 36 is 144, and the method states 156 housewives with 12 extra spread among the two-contact conditions who could not be reached for the second call and were excluded, so 144 plus 12 is exactly the stated total. And the two starred rows carry significance levels against the Performance condition, which is the comparison the paper is making. Five things a careful reader should hold against this puzzle. First, the denominators include people who refused the small request. The paper says only about two thirds of those in the Performance and Agree-Only conditions agreed to answer the soap questions at all, and that none of those who refused later agreed to the large request, but all of them remain in the denominator. So the effect among those who actually complied with the small request is larger than 52.8 per cent, and this puzzle deliberately quotes the smaller, more conservative figure the table prints. Second, thirty-six per group is a small experiment and the differences carry p values around .02 to .07, so this is evidence of an effect and not a precise measurement of its size. Third, the sample is housewives in Palo Alto, California in the mid 1960s, reached by telephone in the morning, and neither the population nor the era nor the recruitment method generalises without argument. Fourth, this is one experiment from a paper that reports two; the second used a different task and is not drawn on here. Fifth, on what the lesson claims: the deep dive reports Cialdini's opposite technique from a separate paper and a separate sample, and the two studies are not directly comparable to each other. They are placed side by side because they point in opposite directions about request size while agreeing about sequence, which is the reasoning point, and not because their percentages belong on one axis.",
    },
  },

  goDeeperUrl: "https://en.wikipedia.org/wiki/Foot-in-the-door_technique",
};
