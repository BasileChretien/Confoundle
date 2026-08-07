import type { Puzzle } from "../schema";

/**
 * Puzzle #64, overdiagnosis, on the German neuroblastoma screening trial.
 *
 * A NEW SHAPE, `yield`, and the reason is in schema.ts at length. The short
 * version: this lesson needs ONE PAIR OF POPULATIONS measured on SEVERAL
 * DIFFERENT OUTCOMES, and no existing shape holds that. `rates` derives every
 * rate from a denominator, and this paper prints rates and intervals while the
 * births they are taken over appear nowhere; back-computing the denominator and
 * then re-deriving the rate is a check that cannot fail. `forest` puts one
 * estimate per row against a null line, and cumulative incidence has no null.
 *
 * WHY THIS TRIAL AND NOT A TIDIER ONE. Overdiagnosis is argued about in public
 * wherever it is easiest to source, which rules out the breast and prostate
 * screening trials on the deck's neutral-ground rule. Neuroblastoma screening
 * is the one large controlled evaluation nobody is still fighting over: the
 * programmes were stopped in Canada, the United States, Germany and Japan on
 * the strength of these results, and this is the twenty-year follow-up written
 * by the people who ran it. It is also the cleanest instance available, because
 * the mechanism is not "slow-growing tumours were caught preferentially" but
 * something stronger and stranger: infant neuroblastoma REGRESSES, and a
 * measurable share of the tumours found would have disappeared untreated.
 *
 * WHY IT IS NOT THE TWO SCREENING PUZZLES ALREADY SHIPPED. `lead-time-bias` is
 * about the clock starting earlier, so survival measured from diagnosis
 * stretches while the date of death does not move. `length-time-bias` is about
 * which cases screening preferentially catches. Both leave the disease itself
 * untouched and change only how it is measured. Overdiagnosis is the one where
 * the disease found was never going to surface at all, and the giveaway here is
 * that the excess sits ENTIRELY in stages 1 to 3 while stage 4, the form that
 * kills, is identical to a decimal place in the two areas. `length-time` says
 * so itself: the Mayo Lung Project bundles all three effects, so it could not
 * separate them and does not try.
 *
 * THE COMMIT BEAT IS ANSWERABLE, and this is the part that took the most care.
 * The setup does NOT stop at "screening found 44 per cent more", which would
 * make the mortality question a guess and would mark a careful player wrong for
 * having no way to tell. It also draws the stage 4 row, where the two areas sit
 * at 5.0 and 5.0. A player who sees that the metastatic rate did not fall, and
 * who knows that deaths come from metastatic disease, can reach "mortality did
 * not move" by reasoning rather than by luck. The surprise survives anyway,
 * because "we found 44 per cent more cancers, and found them before symptoms"
 * pulls very hard indeed. The four bands are four distinct readings rather than
 * four guesses at one number: a large fall, a small fall, no change, and a rise
 * from overtreatment. That last one is the sophisticate's answer and it is also
 * wrong, which is deliberate: the paper looked and found no notable increase in
 * toxic deaths.
 *
 * WHAT THE CARD MUST NOT SAY, and every beat is written around this. It must
 * not say the screening killed children: 4 toxic deaths among stage 1 to 3
 * patients in the screening area against 0 in the control area looks damning
 * and is not, because the pre-study cohort ran at 5 of 101 and the paper's own
 * conclusion is that toxic death did not notably increase. It must not say the
 * trial proves screening does nothing for anybody: 18 children with stage 4
 * disease were found by screening at 12 to 23 months and did strikingly well,
 * and the authors say plainly they cannot tell whether that is earlier
 * detection or kinder biology. And it must not describe the areas as
 * randomised, because they were not: the paper states no randomisation was
 * performed and 61.2 per cent of families took part.
 */
export const overdiagnosis: Puzzle = {
  schemaVersion: 1,
  id: "overdiagnosis-neuroblastoma",
  slug: "the-extra-cases",
  category: "statistical-reasoning",
  reasoningSkill: "overdiagnosis",
  difficulty: "hard",
  tags: ["clinical", "screening", "epidemiology"],
  supportedLocales: ["en"],

  setup: {
    headline: {
      en: "Screening found 44 percent more childhood cancers. It found exactly as much of the kind that kills.",
    },
    framing: {
      en: "Neuroblastoma is the commonest solid tumour of early childhood, and it leaks a marker into the urine, so a nappy can be tested for it. Six German states offered that test at the routine one-year check-up. The other ten did not. About 1.5 million children were screened, 61 percent of those invited, and every child born in either area between 1994 and 1999 was then followed to the age of six through a national cancer registry. The screened states found substantially more neuroblastoma: 13.4 cases per 100,000 births against 9.3 where no test was offered. The extra cases were found early, mostly in the second year of life, and mostly before any symptom had appeared. But look at where the extra cases sit. Neuroblastoma is staged 1 to 4. Stages 1 to 3 are localised or regional. Stage 4 is metastatic, it is the form that kills, and even now fewer than half of those children are alive at ten years. Stage 4 was diagnosed at 5.0 per 100,000 births in the screened states and 5.0 in the unscreened ones. The whole of the 44 percent excess is in stages 1 to 3.",
    },
    question: {
      en: "The same two areas were then compared on deaths from neuroblastoma. What did that comparison show?",
    },
    data: {
      type: "yield",
      label: { en: "Two halves of one country, one disease, followed to age six" },
      perLabel: {
        en: "Cumulative rate per 100,000 births, children aged 12 to 71 months, birth cohorts 1994 to 1999.",
      },
      metricLabel: {
        en: "Each row is one outcome, measured in both areas. The two numbers on the right are the screened area and the unscreened one, in that order.",
      },
      rateNote: {
        en: "Rates and 95 percent intervals exactly as published. The areas were assigned, not randomised.",
      },
      axisMax: 15,
      arms: [
        { id: "screened", label: { en: "The six states that screened" }, short: { en: "Screened" } },
        {
          id: "control",
          label: { en: "The ten states that did not" },
          short: { en: "Not screened" },
        },
      ],
      /**
       * THE TWO DRAWN AT THE SETUP LEAD THIS ARRAY, so a row cannot change
       * position, and therefore cannot change meaning, when the setup filters.
       */
      rows: [
        {
          id: "any",
          label: { en: "Diagnosed with neuroblastoma" },
          short: { en: "Diagnosed with neuroblastoma" },
        },
        {
          id: "stage4",
          label: { en: "Diagnosed with stage 4, the metastatic form" },
          short: { en: "Diagnosed at stage 4" },
          note: { en: "The stage that kills. Identical in the two areas." },
        },
        {
          id: "died",
          label: { en: "Died of neuroblastoma within ten years of diagnosis" },
          short: { en: "Died of neuroblastoma" },
        },
      ],
      observations: [
        { rowId: "any", armId: "screened", rate: 13.4, ciLow: 12.2, ciHigh: 14.6 },
        { rowId: "any", armId: "control", rate: 9.3, ciLow: 8.2, ciHigh: 10.3 },
        { rowId: "stage4", armId: "screened", rate: 5.0, ciLow: 4.3, ciHigh: 5.7 },
        { rowId: "stage4", armId: "control", rate: 5.0, ciLow: 4.2, ciHigh: 5.8 },
        { rowId: "died", armId: "screened", rate: 3.5, ciLow: 2.9, ciHigh: 4.1 },
        { rowId: "died", armId: "control", rate: 3.8, ciLow: 3.1, ciHigh: 4.5 },
      ],
    },
    initialView: {
      kind: "whatitfound",
      groupIds: ["any", "stage4"],
      caption: { en: "What the screening found" },
    },
  },

  choices: [
    {
      // The trial was designed to detect exactly this: its stated aim was a 50
      // per cent reduction in mortality in the screened group.
      id: "halved",
      label: {
        en: "Deaths fell by roughly half, which is the reduction the trial was built to detect",
      },
      sublabel: { en: "caught early, treated early" },
      isCorrect: false,
      isIntuitiveTrap: true,
    },
    {
      id: "fell-a-little",
      label: {
        en: "Deaths fell a little, roughly in proportion to how many extra children were caught early",
      },
      sublabel: { en: "some benefit, not a lot" },
      isCorrect: false,
      isIntuitiveTrap: false,
    },
    {
      id: "unchanged",
      label: {
        en: "Deaths were the same in both areas: 3.5 per 100,000 births against 3.8",
      },
      sublabel: { en: "nothing moved" },
      isCorrect: true,
      isIntuitiveTrap: false,
    },
    {
      id: "rose",
      label: {
        en: "Deaths rose where screening ran, because treating all those extra children cost some of them their lives",
      },
      sublabel: { en: "the cure did the damage" },
      isCorrect: false,
      isIntuitiveTrap: false,
    },
  ],

  reveal: {
    headline: {
      en: "Nothing moved. 3.5 deaths per 100,000 births where screening ran, 3.8 where it did not.",
    },
    mechanismLabel: { en: "And the row that says what the screening changed" },
    mechanismName: { en: "The extra tumours were never going to surface" },
    explanation: {
      en: "The stage 4 row in the setup had already given the answer, for anyone who noticed what it meant. Almost everyone who dies of neuroblastoma dies of stage 4 disease. Screening did not reduce how much stage 4 disease there was: 5.0 per 100,000 births in both areas, an excess the paper measures at minus 0.5, which is to say none. If the metastatic disease is still all there, the deaths will still all be there, and they were. So what were the extra cases? They were localised tumours, stages 1 to 3, running at 8.3 per 100,000 births in the screened states against 4.2 in the unscreened ones. Infant neuroblastoma does something most cancers do not: it regresses. Tumours shrink and disappear without anyone touching them. The screening was finding real tumours, correctly identified by a test that was working, in children who genuinely had them, and a large share of those tumours were going to vanish on their own before they ever caused a symptom. Nobody made a diagnostic error. The disease was there. It just was not coming.",
    },
    body: {
      en: "It is worth being careful about what this trial does and does not establish, because the temptation is to swing too far. It does not show that the screening killed anybody. Four children with stage 1 to 3 disease in the screened area died of treatment toxicity against none in the control area, which reads as damning until you see that the cohort before screening began ran at five such deaths in 101 patients; the authors looked hard at this and concluded toxic death did not notably increase. Nor does it show that no individual child was helped. Eighteen children with stage 4 disease were picked up by screening in their second year, and they did strikingly well, with 94 percent alive at ten years against 29 percent for the stage 4 children in the unscreened states. The authors are honest that they cannot tell whether that is because those children were found earlier or because a tumour detectable by this test at that age is a biologically gentler tumour; only one of them carried the MYCN amplification that marks the aggressive form, against 68 percent of the control cases. What the trial establishes is the population claim, and the population claim is what a screening programme has to answer for: 1.5 million children screened, a great many extra diagnoses, and the same number of children dead. The programmes were stopped in Canada, the United States, Germany and Japan. Two structural caveats belong on the record. The areas were assigned rather than randomised, and 61 percent of invited families took part, so the screened area's figure mixes participants with non-participants; among participants alone the incidence was higher still, at 15.7.",
    },
    view: {
      kind: "whatitchanged",
      caption: { en: "Found, and prevented" },
    },
  },

  lesson: {
    skillName: { en: "Disease that was never coming" },
    takeaway: {
      en: "A test can be right about every case it finds and still do harm, if some of what it finds would never have hurt anyone. More diagnoses is not the same as more disease, and it is not evidence of a benefit.",
    },
    body: {
      en: "Overdiagnosis is the hardest of the screening traps to accept, because it asks you to believe something that sounds false: that a person can have a real disease, correctly diagnosed, that was never going to affect them. There is no error anywhere in that sentence. The tumour is there, the pathologist is right, the test performed exactly as designed. What is missing is the thing nobody can observe in an individual, which is what would have happened next. Some disease progresses, some sits still, and some goes away. Screening does not sample this evenly: the slower something moves, the longer it spends in the detectable-but-silent state, and so the more chances a test has to catch it. Push that to its limit and you reach disease that never leaves the silent state at all, which is what the German trial found by the thousand. This is why overdiagnosis is invisible from the inside and why it is so easy to mistake for success. Every overdiagnosed child was a child who had cancer, was treated, and survived. Each one looks exactly like a life saved, to the family and to the doctor and in the survival statistics, and none of them was. The only way to see it is from above, by counting a whole population: if the disease is being caught in time, then the advanced disease should become rarer, and the deaths should become fewer. In Germany neither happened, which is the signature. It is worth separating this from its two neighbours, which are different mistakes about the same data. Lead-time bias is when survival looks longer only because the clock started earlier. Length-time bias is when screen-detected cases look better because the slow ones were preferentially caught. Overdiagnosis is the extreme case of that second one, where the disease was not merely slow but never destined to matter, and it is the only one of the three that inflates the number of cases rather than just flattering their outcome.",
    },
    howItWorks: {
      en: "The tell is a gap between how many cases are found and how many bad outcomes are prevented. When you meet a screening claim, the first question is what it counts. If the headline is about how many cases were detected, how early they were caught, or how many of those patients were alive five years later, you are being shown numbers that overdiagnosis inflates rather than numbers that would expose it. Every one of those improves when you find harmless disease. The numbers that would expose it are the rate of advanced disease and the death rate from that disease, both measured across the whole population rather than among the diagnosed. If a programme is working, advanced disease becomes rarer, because cases are being intercepted before they get there. If advanced disease has not budged, then whatever was found was not on its way to becoming advanced disease, and the extra diagnoses bought nothing. Watch also for the shape of the incidence curve over the years a programme runs. A genuine rise in disease pushes cases through every stage; a detection effect piles them up in the early stages and leaves the late ones flat, which is exactly the pattern in the German data and in the thyroid cancer epidemic in South Korea. And note the asymmetry in what this costs, because it is what makes the question worth asking rather than academic. Where a programme reduces deaths, the overdiagnosed are the price of the ones it saves, and that is a trade worth making. Where it does not, they are the only thing it produced: children treated for cancer they did not need treating for, and no lives kept.",
    },
  },

  share: {
    title: { en: "Disease that was never coming, a reasoning trap." },
    explainer: {
      en: "Six German states tested every one-year-old for neuroblastoma; ten did not. About 1.5 million children were screened, and the screened states found 44 percent more cancers, most of them before any symptom appeared. But the rate of stage 4 disease, the form that kills, was identical: 5.0 per 100,000 births in both. And so was the death rate: 3.5 against 3.8. The extra tumours were real and correctly diagnosed, and they were the kind that disappears on its own. Every child treated for one looked like a life saved. None of them was.",
    },
    captions: {
      competitive: { en: "Checked whether the deadly kind got rarer." },
      selfDeprecating: { en: "I thought finding more cancer had to be good news." },
    },
  },

  provenance: {
    source:
      "Schilling FH, Erttmann R, Berthold F, Hero B, Ernst A, Spix C, Kaatsch P, Treuner J, Michaelis J, Berthold F. Neuroblastoma Screening at 1 Year of Age: The Final Results of a Controlled Trial. JNCI Cancer Spectrum. 2021;5(4):pkab041. PMCID PMC8259619, open access, read at source through the Europe PMC REST full-text endpoint together with its supplementary material. Design: urinary catecholamine screening offered at the routine health check at 1 year of age (9 to 18 months) in 6 German states, with the remaining 10 states as the control area; no randomisation was performed; birth cohorts 1 July 1994 to 31 October 1999; 61.2 percent participation; 1,475,773 children screened; all analyses restricted to cases diagnosed at 12 to 71 months. Cumulative incidence per 100,000 births, screening area against control area (Table 1 and Supplementary Table 1): all stages 13.4 (95 percent CI 12.2 to 14.6) against 9.3 (8.2 to 10.3), P < .001; stages 1 to 3, 8.3 (7.3 to 9.2) against 4.2 (3.5 to 4.9), P < .001; stage 4, 5.0 (4.3 to 5.7) against 5.0 (4.2 to 5.8), not significant. Cumulative mortality within 10 years of diagnosis per 100,000 births (Table 2): 3.5 (2.9 to 4.1) against 3.8 (3.1 to 4.5), P = .78. Estimated excess cases among screening participants against the contemporaneous control area (Table 3): 6.4 per 100,000 births overall, and minus 0.5 for stage 4. Patient counts (Supplementary Figures 1 and 2): screening area 352 patients, of whom 219 stages 1 to 3 and 133 stage 4; control area 189 patients, of whom 84 stages 1 to 3 and 105 stage 4.",
    year: 2021,
    doi: "10.1093/jncics/pkab041",
    url: "https://europepmc.org/article/MED/34240006",
    note: {
      en: "Six things. First, on what is drawn and what is derived. The rates and their 95 percent intervals are transcribed exactly as published; this deck derives only which pairs separate and which overlap, which is what the shape is for. The rates are authored rather than built from counts because the paper prints no birth denominators anywhere: they can be recovered as cases divided by incidence, which lands at about 776,000 births a year across both areas and matches German births in the mid 1990s, but a denominator recovered from the rate cannot then be used to check the rate, so it is quoted here as a sanity check and used nowhere. Second, and this deck records such things when it finds them, the paper's Results section contains an internal discrepancy. It states that 352 patients aged 12 to 71 months had stage 1 to 3 disease in the screening area and that 219 had stage 4. The supplementary Kaplan-Meier figures give the opposite assignment, 219 with stages 1 to 3 and 133 with stage 4, summing to the 352 that Supplementary Figure 1 gives for all stages, and Supplementary Table 4's average of 58.7 cases per birth year across six birth years reproduces 352 as the all-stages total. The supplement is right and the Results sentence has swapped the all-stages total into the stage 1 to 3 slot: the same sentence reports 80 deaths among the stage 4 patients, and 80 deaths out of 133 leaves 39.8 percent alive, matching the published 40.6 percent ten-year survival, where 80 out of 219 would leave 63.5 percent and contradict the paper's own curve. The control area figure of 84 for stages 1 to 3 is consistent across both. None of the numbers this card draws depend on that sentence. Third, the areas were assigned and not randomised, and the card says so on the figure itself. Participation was 61.2 percent, so the screened area's 13.4 mixes families who took the test with families who did not; among participants alone the incidence was 15.7 (14.0 to 17.4) and the stage 4 incidence was 4.4 (3.5 to 5.3), which is if anything lower than the control area's 5.0. Fourth, on toxicity, where the tempting overclaim is the opposite of the tempting one elsewhere. There were 4 toxic deaths among stage 1 to 3 patients in the screening area against 0 in the control area, but the pre-study cohort ran at 5 in 101 patients and the authors conclude that toxic death did not notably increase during the study. This card therefore does not claim the programme killed anyone, and says the burden was unnecessary treatment. Fifth, on the subgroup that may have benefited: 18 children with stage 4 disease were detected by screening at 12 to 23 months, with 94.4 percent overall survival at ten years against 29.0 percent for control-area children of the same age and stage. The authors state they cannot separate earlier detection from more favourable biology, noting that only 1 of 17 of those tumours carried MYCN amplification against 17 of 25 in the control group. The card reports this rather than burying it, because a lesson that hid it would be making the same mistake in reverse. Sixth, the mortality row is cumulative mortality within 10 years of diagnosis, per 100,000 births, so it is a population rate and not a case fatality rate; the five-year version in Supplementary Table 3 tells the same story, 3.1 against 3.4.",
    },
  },

  goDeeperUrl: "https://en.wikipedia.org/wiki/Overdiagnosis",
};
