import type { Puzzle } from "../schema.ts";

/**
 * Puzzle #69, surrogate endpoints, on CAST (N Engl J Med 1989;321:406-412),
 * read in full at the publisher.
 *
 * WHY CAST AND NOT ONE OF THE OTHER SURROGATE DISASTERS. The usual teaching
 * examples (bone density and fractures, HbA1c and cardiovascular death, CD4 and
 * AIDS) all compare a marker arm against a control arm, so the marker result is
 * itself a randomised comparison and a reader can see the two side by side.
 * CAST is stronger and rarer: the marker response was an ENTRY CRITERION.
 * Patients were given the drug open-label first, and only those whose ectopy
 * was actually suppressed went on to be randomised. So the trial is a clean
 * question with no confound available: among people in whom the drug provably
 * did the thing it was designed to do, does continuing it help? The answer was
 * that it more than doubled their chance of being dead within ten months.
 *
 * THE HEDGE DECISION, MADE DELIBERATELY. Suppression licenses no direction for
 * mortality whatsoever, so asking a player to predict the deaths would be
 * asking them to guess, and would mark a well-reasoning player wrong. The
 * question therefore asks what the suppression result ON ITS OWN tells you, and
 * "nothing at all" is correct. The surprise lives in the reveal, which is the
 * second route CLAUDE.md allows and the right one here.
 *
 * ADJACENCY, checked against the cards rather than assumed. `composite-endpoints`
 * (`count-it-differently`) is about bundling outcomes so a soft one carries a
 * win: the endpoint is still clinical and the trick is packaging.
 * `statistical-vs-clinical-significance` (`certainly-tiny`) is a real effect on
 * a real outcome that is too small to matter. `intention-to-treat` is about who
 * gets counted. None is a measurement standing in for the thing you care about,
 * and none can show a marker moving the right way while the patient does worse.
 */
export const surrogateEndpoints: Puzzle = {
  schemaVersion: 1,
  id: "surrogate-endpoints-cast-1989",
  slug: "the-beats-went-away",
  category: "statistical-reasoning",
  reasoningSkill: "surrogate-endpoints",
  difficulty: "hard",
  tags: ["clinical", "research", "statistics"],
  supportedLocales: ["en"],

  setup: {
    headline: {
      en: "A drug silenced the irregular heartbeats that predict sudden death, in three of every four patients who tried it. What did that buy them?",
    },
    framing: {
      en: "After a heart attack, extra beats fired off by damaged muscle are one of the strongest known warnings of sudden death: the more of them a survivor has, the likelier they are to drop dead in the following two years. So the reasoning was straightforward. Silence the beats, prevent the deaths. The Cardiac Arrhythmia Suppression Trial gave 2,309 such patients an antiarrhythmic drug in the open, adjusting the dose until the beats stopped, and counted how many responded. Responding meant at least 80 per cent fewer extra beats and at least 90 per cent fewer runs of fast rhythm, measured on a 24-hour recording. The 1,727 patients in whom the drug demonstrably worked were then randomly assigned, double-blind, either to stay on the drug that had worked for them or to switch to a matching placebo, and were followed for an average of ten months.",
    },
    question: {
      en: "Before you see the follow-up: what does the suppression result on its own tell you about how these patients will fare?",
    },
    data: {
      type: "surrogate",
      label: { en: "What the drug did to the heartbeats" },
      criterionLabel: {
        en: "Responding meant at least 80 per cent fewer extra beats and at least 90 per cent fewer runs of fast rhythm, on a 24-hour recording.",
      },
      runInLabel: { en: "Patients given the drug in the open, before any randomisation" },
      endpointLabel: { en: "Of those randomised, over an average of ten months" },
      noControlNote: {
        en: "The response bar has no comparison group by design: responding is what qualified a patient to be randomised at all, so at this stage there is nobody to compare them against.",
      },
      entered: 2309,
      /**
       * The qualifying stage leads, because the renderer draws the stages in
       * order and the lesson is the size of the success before anything else.
       */
      stages: [
        {
          id: "suppressed",
          label: { en: "Beats suppressed, so randomised" },
          short: { en: "Suppressed" },
          count: 1727,
          qualified: true,
        },
        {
          id: "partial",
          label: { en: "Only partly suppressed" },
          short: { en: "Partly" },
          count: 135,
        },
        {
          id: "failed",
          label: {
            en: "Beats worsened, drug not tolerated, or died before randomisation",
          },
          short: { en: "No response" },
          count: 447,
        },
      ],
      arms: [
        {
          id: "drug",
          label: { en: "Stayed on the drug that had worked" },
          short: { en: "Stayed on the drug" },
          n: 730,
        },
        {
          id: "placebo",
          label: { en: "Switched to a matching placebo" },
          short: { en: "Switched to placebo" },
          n: 725,
        },
      ],
      endpoints: [
        {
          id: "arrhythmic",
          label: { en: "Died of an arrhythmia, or had a cardiac arrest" },
          short: { en: "Arrhythmic death or arrest" },
          note: { en: "This was the outcome the trial was designed to prevent." },
        },
        {
          id: "anycause",
          label: { en: "Died of any cause" },
          short: { en: "Death from any cause" },
        },
      ],
      observations: [
        { endpointId: "arrhythmic", armId: "drug", events: 33 },
        { endpointId: "arrhythmic", armId: "placebo", events: 9 },
        { endpointId: "anycause", armId: "drug", events: 56 },
        { endpointId: "anycause", armId: "placebo", events: 22 },
      ],
    },
    initialView: {
      kind: "markeronly",
      // Deliberately NOT the same words as `label` above: the engine draws the
      // figure title and the scope caption on the same line, so repeating the
      // label prints it twice at the setup beat.
      caption: { en: "Before anyone was randomised" },
    },
  },

  choices: [
    {
      /**
       * The intuitive trap, and the reasoning the trial itself was built on.
       * Worth saying plainly: this was not a fringe belief. Suppressing ectopy
       * after infarction was standard practice, and the trial existed to
       * confirm it rather than to question it.
       */
      id: "fewer-deaths",
      label: {
        en: "Fewer deaths",
      },
      sublabel: { en: "silence the warning, prevent the death" },
      isCorrect: false,
      isIntuitiveTrap: true,
    },
    {
      id: "same-deaths",
      label: {
        en: "The same deaths",
      },
      sublabel: { en: "predicting no change in survival" },
      isCorrect: false,
      isIntuitiveTrap: false,
    },
    {
      id: "more-deaths",
      label: {
        en: "More deaths",
      },
      sublabel: { en: "the cure is the poison" },
      isCorrect: false,
      isIntuitiveTrap: false,
    },
    {
      id: "cannot-tell",
      label: {
        en: "Nothing at all",
      },
      sublabel: { en: "you have not been shown a single death" },
      isCorrect: true,
      isIntuitiveTrap: false,
    },
  ],

  reveal: {
    headline: {
      en: "Among the patients in whom the drug had provably worked, staying on it more than doubled the chance of being dead within ten months: 56 of 730, against 22 of 725 who switched to placebo.",
    },
    mechanismLabel: { en: "And what happened to the patients" },
    mechanismName: { en: "The marker moved, the patients died" },
    explanation: {
      en: "The drug did everything it was asked to do. In 1,727 of 2,309 patients, three out of four, the beats it was aimed at went away and stayed away, which is about as unambiguous a success on a marker as medicine ever gets. Then those responders were randomised, and the outcome the trial existed to prevent went the wrong way. Death from arrhythmia or cardiac arrest: 33 of 730 who stayed on the drug, against 9 of 725 who switched to placebo, which is 4.5 per cent against 1.2, a relative risk of 3.6. Death from any cause: 56 against 22, 7.7 per cent against 3.0, a relative risk of 2.5. Look at what that comparison actually is, because it is the sharpest part. Both groups had responded to the drug. Every single person in the placebo column had already had their beats suppressed by it, and was then taken off. So this is not sick patients against well ones, or responders against non-responders. It is the same kind of patient, all of them proven responders, differing only in whether the successful suppression continued. The suppression is the thing that killed them. The trial was designed as a one-tailed test, because the investigators considered it implausible enough that the drug would do harm that they did not build the study to detect it; the monitoring board stopped the encainide and flecainide arms anyway, in April 1989, on data showing the opposite of the hypothesis.",
    },
    body: {
      en: "How could a marker that predicts death so reliably be so useless as a target? Because the extra beats were a symptom of a heart that had been damaged, and the damage was doing the killing. Silencing the beats did nothing about the damage, and the particular drugs used to do it slowed electrical conduction through scarred muscle in a way that made a much worse rhythm easier to start. So the marker went in the intended direction, the underlying disease did not, and the treatment added a hazard nobody was measuring. This is worth stating precisely, because the lesson is often overstated into something false. It is not that surrogate endpoints are worthless, and it is not that a marker which predicts an outcome can never be a target. It is that the two are separate claims, and evidence for the first is not evidence for the second. A marker earns the right to stand in for an outcome only when someone has shown that moving it moves the outcome, and that is a different experiment from the one which showed it predicts. CAST is the most expensive demonstration of the difference that has ever been run: at the time it started, suppressing these beats was ordinary practice, and a reasonable estimate is that the drugs were killing tens of thousands of Americans a year while doing exactly what they were prescribed to do."
    },
    view: {
      kind: "andoutcome",
      // Same rule as the setup caption: not the words of `label`, and not the
      // words of `mechanismLabel` either, since the engine draws the caption on
      // the figure and the mechanism label just below it.
      caption: { en: "The randomised comparison, at last" },
    },
  },

  lesson: {
    skillName: { en: "The number that stood in for the thing" },
    takeaway: {
      en: "A measurement that predicts an outcome is not the same as a measurement worth moving. Showing that a treatment shifts the marker tells you nothing about the outcome until somebody runs the trial that measures the outcome itself.",
    },
    body: {
      en: "A surrogate endpoint is a stand-in: something quick and countable, measured because the thing you actually care about is slow, rare, or expensive to wait for. Tumour shrinkage stands in for surviving cancer, bone density for not breaking a hip, viral load for not dying of the infection, blood pressure and cholesterol for not having the stroke. These are not foolish choices. A trial with death as its endpoint may need thousands of patients and years of follow-up, and a marker can be read in months, which is why regulators accept them and why most drugs you have heard of were approved on one. The trap is not in using them. It is in a specific and very natural slide: the marker predicts the outcome, therefore improving the marker improves the outcome. The first half is an observation about people who have not been treated. The second is a claim about what a treatment does, and it needs its own evidence, because a drug reaches the marker by some mechanism and that mechanism may reach other things too. CAST is the cleanest case because the trial removed every escape route: the patients were selected for responding, so nobody can argue the drug failed to work, and they were randomised after responding, so nobody can argue the groups differed. The marker did what it was supposed to and the patients died anyway. The pattern has repeated often enough to have a literature of its own. Encainide and flecainide suppressed ectopy and raised mortality. Fluoride raised bone density and raised fracture rates. Torcetrapib raised the good cholesterol and raised deaths. Rosiglitazone lowered blood sugar and, on the most contested reading, raised heart attacks. In each, the number moved the right way and the patients did not.",
    },
    howItWorks: {
      en: "Three questions to ask whenever a result is reported on a marker rather than on an outcome. First, and most simply: is this endpoint the thing I care about, or a proxy for it? That sounds too obvious to need asking, and it is asked far too rarely, because a trial reported as a success tends to be read as a success at the thing the disease is named for. Progression-free survival is not survival. A reduction in detected disease is not a reduction in death. Second: has anyone shown that moving this marker moves that outcome, with this class of treatment? Validation is specific, not general. Lowering cholesterol with a statin reduces heart attacks; lowering it with torcetrapib did not, and the marker was the same marker. So a surrogate validated for one mechanism carries no warranty for another. Third: what else could this treatment be doing that nobody is counting? CAST's drugs were doing something serious to conduction through scarred tissue, and the trial was not built to look for it, having been designed one-tailed on the assumption that harm was not a realistic outcome. Outside medicine the shape is the same and the stakes are only lower. A school raises test scores without raising learning. A team improves the metric that management watches without improving the product. A safety programme drives reported incidents down and gets there partly by making reporting harder. In each case something real is being measured, the measurement genuinely correlates with what you want, and moving the measurement directly has broken that correlation. The deck's `campbells-law` card is the version where people game the measure on purpose. This one is stranger and more sobering, because at CAST nobody was gaming anything: the drug really did suppress the beats, the doctors really were trying to save lives, and it killed people anyway.",
    },
  },

  share: {
    title: { en: "The number that stood in for the thing, a reasoning trap." },
    explainer: {
      en: "In the Cardiac Arrhythmia Suppression Trial, 2,309 heart-attack survivors were given an antiarrhythmic drug and 1,727 of them, three in four, had the irregular beats that predict sudden death suppressed. Those responders were then randomised to stay on the drug or switch to placebo. Death from arrhythmia or cardiac arrest: 33 of 730 on the drug against 9 of 725 on placebo. Death from any cause: 56 against 22. The marker did exactly what it was supposed to do, and the patients on the working drug died at more than twice the rate.",
    },
    captions: {
      competitive: { en: "Refused to read a marker as an outcome." },
      selfDeprecating: { en: "I would have kept taking the drug that worked." },
    },
  },

  provenance: {
    source:
      "The Cardiac Arrhythmia Suppression Trial (CAST) Investigators. Preliminary report: effect of encainide and flecainide on mortality in a randomized trial of arrhythmia suppression after myocardial infarction. New England Journal of Medicine. 1989;321(6):406-412. DOI 10.1056/NEJM198908103210629. Read in full at the publisher. Design: multicentre, randomised, double-blind, placebo-controlled trial in patients six days to two years after a documented myocardial infarction with six or more ventricular premature depolarisations per hour on an ambulatory recording of at least 18 analysable hours, and an ejection fraction of 0.55 or less if the recording was within 90 days of infarction or 0.40 or less if later. Patients first underwent an open-label titration phase averaging 15 days, testing up to three drugs (encainide, flecainide, moricizine) at two doses each; suppression was defined as at least 80 per cent reduction of ventricular premature depolarisations and at least 90 per cent reduction of runs of unsustained ventricular tachycardia on 24-hour Holter recording 4 to 10 days after each dose began. As of the analysis date of 30 March 1989, 2,309 patients had entered titration; 1,727 (75 per cent) achieved suppression and were randomised, of whom 1,455 to encainide, flecainide or matching placebo and 272 to moricizine or placebo; 447 (19 per cent) had arrhythmia worsen, were intolerant of the drugs, or died before randomisation; 135 (6 per cent) had only partial suppression and were randomised separately. Among the 1,455: death from arrhythmia or cardiac arrest 33 of 730 taking encainide or flecainide (4.5 per cent) against 9 of 725 taking placebo (1.2 per cent), relative risk 3.6 (95 per cent CI 1.7 to 8.5); total mortality 56 of 730 (7.7 per cent) against 22 of 725 (3.0 per cent), relative risk 2.5 (95 per cent CI 1.6 to 4.5). Average follow-up 10 months. The trial was designed as a one-tailed test with alpha 0.025 and power approximately 0.85, sized at 4,400 patients; the Data and Safety Monitoring Board met on 16 and 17 April 1989 and recommended that encainide and flecainide be discontinued.",
    year: 1989,
    doi: "10.1056/NEJM198908103210629",
    url: "https://pubmed.ncbi.nlm.nih.gov/2473403/",
    note: {
      en: "Five things. First, the arithmetic, all of which reconciles and is asserted in this puzzle's test file: 1,727 plus 447 plus 135 is exactly the 2,309 who entered titration, and the three printed percentages recompute to 74.8, 19.4 and 5.8 against a printed 75, 19 and 6. The four event counts recompute to 4.52, 1.24, 7.67 and 3.03 per cent against a printed 4.5, 1.2, 7.7 and 3.0, and the two relative risks recompute to 3.64 and 2.53 against a printed 3.6 and 2.5. Second, a discrepancy a careful reader will find, which the figure handles rather than hides. The funnel shows 1,727 randomised but the two arms hold 1,455 between them, because 272 of the randomised patients were assigned to moricizine or its placebo and the paper does not report their outcomes: the monitoring board recommended that the trial continue with moricizine, so the investigators remained blinded to it. The card therefore shows the encainide and flecainide comparison only, and says so. Third, the drugs are reported together, which is the paper's own choice and its stated reasons are that the trial was not designed to detect differences between them, that the results were virtually identical, and that both are class IC agents; the separately computed relative risks for arrhythmic death were 3.4 and 4.4. Fourth, on what the placebo arm is, because it is what makes this card work: every patient in it had already had their arrhythmia suppressed by the drug during open-label titration and was then switched off it. The comparison is therefore continued suppression against withdrawn suppression among proven responders, not treated against untreated. Fifth, on scope and on what is left out. This is a preliminary report at 10 months; the final report (N Engl J Med 1991;324:781-788) confirmed the excess with longer follow-up, and the moricizine arm was later stopped as well after CAST II. The claim this card makes is about the structure of the inference and not about antiarrhythmic drugs, which are not otherwise the subject.",
    },
  },

  goDeeperUrl: "https://en.wikipedia.org/wiki/Cardiac_Arrhythmia_Suppression_Trial",
};
