import type { Puzzle } from "../schema";

/**
 * Puzzle #66, the Pygmalion effect, on Chen et al. (2019). The last of the
 * rang A leads in `docs/lesson-backlog.md`, which had it recorded as "no
 * obvious dataset" since the list was written. There is one, it is open, and
 * the authors published every trial-level observation.
 *
 * WHY THIS AND NOT ROSENTHAL. The name comes from Rosenthal and Jacobson's
 * 1968 classroom study, and that study is not shippable here: its IQ instrument
 * was taken apart within months of publication, and the modern reading of the
 * classroom literature is that expectancy effects there are real but small,
 * fragile, and heavily moderated. A card built on it would be teaching the
 * legend. This experiment tests the same mechanism with the thing the classroom
 * work cannot offer, which is a randomised manipulation of the observer's
 * belief and an outcome that does not depend on anybody's opinion.
 *
 * READ AT SOURCE, then checked against the authors' own data. Full text from
 * PMC7494051 through the NCBI efetch endpoint (Europe PMC's own fullTextXML
 * route 404s on this record despite its isOpenAccess flag, which is the same
 * trap entry 63 recorded: that flag reports membership of Europe PMC's OA
 * subset, not the paper's status). Every number below was then recomputed from
 * the trial-level CSVs the authors released, and the recomputed differences
 * reproduce the paper's printed mixed-model coefficients:
 *
 *                              recomputed        paper's model
 *   Study 3 doctors   -32.20 (SE 2.74)    b = -31.92 (SE 2.89), p < .001
 *   Study 3 patients   -3.88 (SE 1.46)    b =  -3.70 (SE 1.53), p = .02
 *   Study 1 patients   -7.19 (SE 1.60)    b =  -7.30 (SE 1.53), p < .001
 *   Study 2 original   -7.45 (SE 1.42)    b =  -7.35 (SE 1.84), p = .002
 *   Study 2 reversed   +2.51 (SE 2.35)    b =  +2.25 (SE 2.05), p = .69
 *
 * The small residuals are the covariates in their models (stimulation site,
 * cream colour, trial number) which a raw paired mean does not carry. The
 * agreement in sign, size and standard error across five independent
 * comparisons is what makes the raw means safe to draw.
 *
 * WHICH STUDY THE CARD DRAWS, and why it matters. Study 3, not the headline
 * Study 1. Study 1 gave every patient the control cream first, so its 7-point
 * result is perfectly confounded with order, and a player answering "they got
 * used to the heat" would have been reasoning correctly and marked wrong. That
 * is the failure this project treats as unshippable. Study 3 ran the creams in
 * an ABBA sequence, so the framing can state the order and close that door
 * honestly. The price is a smaller effect, 3.88 points against 7.19, and the
 * card pays it.
 *
 * THE HEDGE AUDIT, which drove the answer bands. The setup withholds exactly
 * one column, the temperature, and withholds it from BOTH tiers. With it
 * missing, no reading of the figure is safe, so "there is no way to tell" is
 * the correct answer and the reveal carries the surprise. The three distractors
 * take three different directions (a pharmacological one, a psychological one
 * and a statistical one) so that none of them shares a direction with another
 * or with the answer. The psychological distractor is the dangerous one,
 * because expectation really is at work here, so the reveal says so in as many
 * words: expectation is what the patients' 3.9 points are made of, and it is
 * not what made the doctors' drop eight times bigger.
 *
 * NEW SHAPE, `delivered`. See the block comment in `schema.ts` for why no
 * existing shape can draw a comparison together with what each side was given.
 */
export const pygmalion: Puzzle = {
  schemaVersion: 1,
  id: "pygmalion-transmitted-placebo",
  slug: "what-the-doctor-believed",
  category: "measurement",
  reasoningSkill: "pygmalion-effect",
  difficulty: "hard",
  tags: ["clinical", "research", "psychology"],
  supportedLocales: ["en"],

  setup: {
    headline: {
      en: "Same cream, same burn, same rating scale. One group felt eight times more relief than the other.",
    },
    framing: {
      en: "Sixty volunteers were brought in two at a time, and in each pair one was picked at random to play the doctor and the other the patient. The doctors were told they would be giving two creams: Thermedol, described to them as a new drug that blocks the nerve channels carrying heat pain, and an inert control cream. Each doctor first tried both creams on their own forearm, with a thermal probe pressed against each treated patch, so they would know from their own skin what they were about to hand over. Then they applied both creams to their patient's forearm and pressed a probe against each patch there. Everyone rated every burn from 0, no pain at all, to 100, the worst imaginable. The patients were never told which cream was which, and the doctors had been told this was a single-blind study and that they were not permitted to reveal any difference between the two. Each patient got the creams in the sequence control, Thermedol, Thermedol, control, so neither cream sat in a favoured position in the session.",
    },
    question: {
      en: "The doctors' drop was more than eight times the patients'. Why?",
    },
    data: {
      type: "delivered",
      label: { en: "Two roles, two creams, one rating scale" },
      metricLabel: {
        en: "Mean pain rating, 30 doctors and their 30 patients, every burn rated 0 to 100.",
      },
      scale: {
        min: 0,
        max: 100,
        minLabel: { en: "0, no pain at all" },
        maxLabel: { en: "100, worst imaginable" },
      },
      exposureLabel: { en: "Heat actually applied" },
      exposureUnit: { en: " °C" },
      arms: [
        {
          id: "control",
          label: { en: "The inert control cream" },
          short: { en: "Control cream" },
        },
        {
          id: "thermedol",
          label: { en: "Thermedol" },
          short: { en: "Thermedol" },
        },
      ],
      tiers: [
        {
          id: "doctors",
          label: { en: "The doctors, trying both creams on their own arm" },
          short: { en: "Doctors, on their own arm" },
          note: {
            en: "A drop of 32.2 points. Four burns per cream, per doctor.",
          },
        },
        {
          id: "patients",
          label: { en: "The patients, treated by those doctors" },
          short: { en: "Patients, treated by those doctors" },
          note: {
            en: "A drop of 3.9 points, which the study reports as a real one (p = 0.02). Sixteen burns per cream, per patient.",
          },
        },
      ],
      observations: [
        { tierId: "doctors", armId: "control", mean: 39.8, n: 30, exposure: 48 },
        { tierId: "doctors", armId: "thermedol", mean: 7.6, n: 30, exposure: 43 },
        { tierId: "patients", armId: "control", mean: 32.77, n: 30, exposure: 48 },
        { tierId: "patients", armId: "thermedol", mean: 28.89, n: 30, exposure: 48 },
      ],
    },
    initialView: {
      kind: "asmeasured",
      caption: { en: "What each group reported" },
    },
  },

  choices: [
    {
      /**
       * The pharmacological direction. Attractive because the doctors did put
       * the cream on themselves and patients had it put on for them, so a
       * difference in how well it went in is a real-sounding mechanism.
       */
      id: "better-dose",
      label: {
        en: "The doctors rubbed the cream in themselves, so more of it reached the skin",
      },
      sublabel: { en: "same drug, bigger dose" },
      isCorrect: false,
      isIntuitiveTrap: true,
    },
    {
      /**
       * The psychological direction, and the dangerous band: expectation IS at
       * work in this experiment. What makes it refutable is the magnitude the
       * question pins it to. The framing asks why the doctors' drop is eight
       * times the patients', and expectation is not what did that.
       */
      id: "knew-what-they-took",
      label: {
        en: "The doctors knew Thermedol was meant to be the real drug and the patients did not, so the doctors expected relief and felt it",
      },
      sublabel: { en: "expectation, on the people who had one" },
      isCorrect: false,
      isIntuitiveTrap: false,
    },
    {
      id: "too-few",
      label: {
        en: "Thirty pairs is far too few to compare two drops. The difference between them is noise",
      },
      sublabel: { en: "nothing to explain" },
      isCorrect: false,
      isIntuitiveTrap: false,
    },
    {
      /**
       * Correct, and findable: the framing describes the probe twice without
       * ever saying what it was set to, and pins the order for the patients
       * while saying nothing about the conditions the doctors met.
       */
      id: "not-told",
      label: {
        en: "There is no way to tell from this. Nothing here says the two groups were burned at the same temperature",
      },
      sublabel: { en: "a column is missing" },
      isCorrect: true,
      isIntuitiveTrap: false,
    },
  ],

  reveal: {
    headline: {
      en: "The doctors' Thermedol burn was five degrees cooler. It had been rigged that way on purpose, to make them believe.",
    },
    mechanismLabel: { en: "And the column the figure was missing" },
    mechanismName: { en: "The belief was installed, then it was passed on" },
    explanation: {
      en: "The doctors were not subjects in a study of Thermedol. They were the thing being manipulated. During their own turn on the probe, the experimenters set it to 48 degrees over the control cream and 43 degrees over Thermedol, and said nothing about the difference. Five degrees on a thermal probe is an enormous change in how much a burn hurts, which is why the doctors' ratings collapsed from 39.8 to 7.6. They came away certain that Thermedol worked, because as far as their own arm was concerned it had. Now look at the second row again with the missing column filled in. The patients got 48 degrees under the control cream and 48 degrees under Thermedol. Same probe, same setting, same four patches of forearm, and both creams were the same jar of petroleum jelly with nothing in either. There was no drug and there was no dose. The only thing that was different about the Thermedol patches was that the person applying them believed in them, and the patients still rated those burns 3.9 points lower. Expectation was in the room, and it was doing the work: the patients ended up believing Thermedol was the more effective cream, and that belief is what their 3.9 points is made of. But it is not what made the doctors' drop eight times bigger. The doctors' 32 points were bought with five degrees of heat. The patients' 3.9 were bought with nothing at all.",
    },
    body: {
      en: "Three things stop this being a story about people saying what they thought was expected of them. The patients' skin conductance response, which is autonomic and not something you decide, was also lower on the Thermedol burns (p = 0.04). Their faces showed less pain on those burns, scored by a model trained on facial action units rather than by anyone who knew the conditions. And they rated the doctors as more empathetic while giving Thermedol (p = 0.02), which is a clue to the channel: the doctors' own faces were doing something different when they handed over the cream they believed in, and the authors traced the transmission there. In this study the experimenters were blind to the conditions during the doctor-patient phase, there were no cameras on the participants, and the creams' colours were counterbalanced, so none of those is available as an explanation. The effect also held in two earlier samples, 194 people across all three. Two limits belong on the card rather than in a footnote. First, it depends on the patient meeting the control cream first. When the second of these studies reversed the order and gave Thermedol first, the effect vanished, and the authors say plainly that a reference experience seems to be needed before a placebo can be felt against it. Second, the people involved were undergraduates rather than clinicians and patients, and the encounter lasted an hour. What that buys is the causal claim, which no observational study of real consultations can make, because in a real consultation the doctors who believe in a treatment are not the ones a coin toss picked.",
    },
    view: {
      kind: "asdelivered",
      caption: { en: "And what each was actually given" },
    },
  },

  lesson: {
    skillName: { en: "Somebody else's expectation" },
    takeaway: {
      en: "Blinding the patient is not what makes a comparison fair. If the person handing over the treatment knows which is which, their belief travels to the patient without either of them saying anything, and it moves the outcome you are measuring.",
    },
    body: {
      en: "The name for this is the Pygmalion effect, after the sculptor whose statue came to life because he believed in it, and it came into psychology through Robert Rosenthal: first with laboratory rats, where students told their animals were bred for maze-brightness got better runs out of randomly assigned rats, then with the 1968 classroom study that gave the effect its fame. That classroom study is worth naming for a second reason, which is that it does not survive close reading; its intelligence measure was taken apart within a couple of years, and the honest modern summary of teacher expectancy is that the effect exists but is small, fragile and much smaller than the legend. The wider literature calls the same thing an interpersonal expectancy effect, and this experiment calls its own version a socially transmitted placebo. What all three names point at is one mechanism: a belief held by the observer changes what the person being observed actually does or feels, without instruction, and often without either party being able to say how. Notice what separates this from the traps next to it. The Hawthorne effect is about knowing you are being watched, and it needs nobody to believe anything in particular. The nocebo and placebo effects are about your own expectation of a treatment, formed from what you were told or what you hope. Detection bias is about the observer's belief changing the score they write down, not the thing being scored. This is the fourth one and the least intuitive: the observer's belief, never stated, changing the measurement itself, arriving through channels neither person controls. It is the reason a trial blinds the staff and not just the patients, and the reason a trial that could only blind one of them has to say so.",
    },
    howItWorks: {
      en: "When you meet a comparison, ask who knew what, and then ask what they could have done with knowing it. The question is not whether anybody cheated. Nobody in this experiment cheated: the doctors were under instruction to say nothing and there is no evidence any of them did. The leak was in their faces. So the useful test is whether the person who delivered the treatment, took the measurement or spent the time with the participants knew which arm they were in, and whether the outcome is the kind of thing a person's manner could touch. Pain, mood, fatigue, breathlessness, function, anything scored by asking someone how they feel: those move. So does anything mediated by how hard a participant tries, which is why exercise and rehabilitation trials are so hard to blind and so easy to over-read. Hard endpoints resist it, though less completely than people assume, because a clinician who believes in a treatment may also chase a diagnosis harder or intervene sooner. Then ask what was done about it. A trial that says double-blind should be able to say who was blinded and whether the blind held, and a trial that could not blind should say what it did instead, such as a blinded assessor, an objective endpoint, or an attention control arm that gives the comparison group the same contact time. Where none of that was possible, the effect does not disappear; it just goes unmeasured, and the honest reading is that some unknown part of the difference belongs to the people delivering it. The same question is worth asking outside trials. A teacher told which pupils are promising, an interviewer told which candidate came recommended, a manager told which recruits scored well: in each case somebody's belief about a person is about to meet that person, and the outcome that follows is no longer a clean measurement of anything.",
    },
  },

  share: {
    title: { en: "Somebody else's expectation, a reasoning trap." },
    explainer: {
      en: "Sixty volunteers were paired off and a coin decided who played doctor. Each doctor tried two creams on their own arm first: the burn under the control cream was set to 48 degrees and the burn under Thermedol to 43, so they came away convinced Thermedol worked. Then they treated their patients, where both creams got 48 degrees and both jars held the same petroleum jelly. The patients still rated the Thermedol burns lower, and their skin conductance was lower too. Nobody said a word. Blinding the patient is not what makes a comparison fair.",
    },
    captions: {
      competitive: { en: "Asked what the two groups were actually given." },
      selfDeprecating: { en: "I thought a blinded patient was a fair test." },
    },
  },

  provenance: {
    source:
      "Chen PA, Cheong JH, Jolly E, Elhence H, Wager TD, Chang LJ. Socially transmitted placebo effects. Nature Human Behaviour. 2019;3(12):1295-1305. PMID 31636406, PMCID PMC7494051 (author manuscript), read at source through the NCBI efetch full-text endpoint. Design: three studies, 194 participants, undergraduates paired into dyads and randomly assigned to the roles of doctor and patient. Doctors were told Thermedol was a TRP-channel blocker with analgesic effects; both creams were in fact identical petroleum-based jelly with no analgesic effect. In the doctor conditioning phase the experimenters paired the control cream with a hot stimulation and Thermedol with a cooler one, without telling the doctor. In the doctor-patient interaction phase both creams were given the same stimulation temperature. Study 3, which this card draws: 60 participants, 30 dyads, 48 degrees Celsius in the interaction phase, a within-subject ABBA administration sequence (control, Thermedol, Thermedol, control), no head cameras, and experimenters blind to condition. Published results for Study 3: doctors' pain during conditioning b = -31.92, SE 2.89, t(30.02) = -11.02, p < .001; patients' pain during the interaction b = -3.70, SE 1.53, t(27.30) = -2.42, p = .02, CI -6.76 to -0.64; patients' skin conductance b = -1.37, SE 0.67, t(285.60) = -2.04, p = .04; patients' rating of the doctor's empathy b = 6.88, SE 2.89, t(96.03) = 2.38, p = .02. Study 2 order effect (43 dyads, counterbalanced): condition by order interaction F(1, 38.10) = 12.34, p = .001, with b = -7.35, p = .002 in the original order and b = 2.25, p = 0.69 in the reversed order. Trial-level data published by the authors at https://github.com/cosanlab/socially_transmitted_placebo_effects and used to recompute every mean drawn here.",
    year: 2019,
    doi: "10.1038/s41562-019-0749-5",
    url: "https://www.ncbi.nlm.nih.gov/pmc/articles/PMC7494051/",
    note: {
      en: "Five things. First, on what is drawn. The four means are not printed in the paper, which reports mixed-model coefficients rather than cell means, so they were computed from the authors' released trial-level files: study3_doc_condition_rating_data.csv (240 rows, 30 doctors, 4 burns per cream each) and study3_pat_interaction_rating_data.csv (960 rows, 30 patients, 16 burns per cream each). Doctors 39.80 against 7.60, patients 32.77 against 28.89. The temperatures drawn beside them are the values in the Temperature and Current pain columns of those same files, 48 and 43 for the doctors and 48 throughout for the patients, which is what the methods section describes. Second, the recomputed differences were checked against the paper's published models before anything was authored: doctors -32.20 (SE 2.74) against the published -31.92 (SE 2.89), patients -3.88 (SE 1.46) against the published -3.70 (SE 1.53). The same check was run on Study 1 (-7.19 against -7.30) and on both arms of Study 2's order split (-7.45 against -7.35, and +2.51 against +2.25). Five independent comparisons agreeing in sign, size and standard error is the reason raw paired means are safe to draw here; the residual differences are the site, colour and trial-number covariates the published models carry and a raw mean does not. Third, on why Study 3 rather than the more striking Study 1. Study 1's patients always received the control cream first, so its 7-point effect cannot be separated from the order, and a reader answering that the patients simply got used to the heat would be reasoning correctly. Study 3's ABBA sequence removes that, at the cost of a smaller effect, and the framing states the sequence so the reader can use it. Fourth, on a limit the card states in the reveal rather than hiding: in Study 2, which counterbalanced the order across dyads, the effect appeared only when the control cream came first and was absent when Thermedol came first. The authors interpret this as a reference experience being needed rather than as habituation, and Study 3's within-subject design is their answer to the habituation reading. A card claiming this effect is unconditional would be overstating the source. Fifth, on the population. These were undergraduates in an hour-long laboratory session, not clinicians and patients, and the paper says so. The claim the card makes is causal rather than clinical: that an unblinded person delivering a treatment can move a measured outcome without saying anything. Whether the size of it carries into a real consultation is not established here, and the card does not say it is. Note also on the access route: Europe PMC's isOpenAccess flag is Y for this record while its own fullTextXML endpoint returns 404, so the text was fetched from NCBI instead. That flag reports membership of Europe PMC's open-access subset and not the status of the paper.",
    },
  },

  goDeeperUrl: "https://en.wikipedia.org/wiki/Pygmalion_effect",
};
