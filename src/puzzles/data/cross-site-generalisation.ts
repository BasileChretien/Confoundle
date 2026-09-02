import type { Puzzle } from "../schema.ts";

/**
 * Cross-site generalisation, on the new `shortcut` shape.
 *
 * A pneumonia detector reported area under the curve of 0.931 on held-out
 * chest X-rays. A second model, given nothing but the name of the hospital
 * each X-ray came from and never shown the image, scored 0.861 on the same
 * test set. Pneumonia appears in 34.2 per cent of the Mount Sinai collection
 * and 1.2 per cent of the NIH one, so knowing the hospital is worth a great
 * deal, and a model that can name the hospital gets that for free. One could,
 * with 99.95 per cent accuracy.
 *
 * THE CARD IS THE TRIVIAL MODEL, NOT THE DROP AT AN OUTSIDE HOSPITAL, and
 * backlog entry 81 was rewritten to say so after the numbers were read. The
 * internal-to-external drop is real and unremarkable (0.802 to 0.717), and it
 * compares two different test sets, which invites the reply that the sets
 * simply differ. The trivial model is measured on the SAME set as the 0.931,
 * so nothing is being compared across populations.
 *
 * THE HEDGE IS WRONG HERE, deliberately, and the setup is built to earn that.
 * The composition of the test set, both collections with their sizes and their
 * pneumonia rates, is on screen at the COMMIT beat, not held back for the
 * reveal. A reader who notices that one collection is 28 times more pneumonic
 * than the other can work out that naming the collection is itself predictive,
 * which is exactly the reasoning the card is teaching. Withholding that would
 * have made "there is no way to tell" the only defensible answer and turned
 * the reveal into an ambush.
 *
 * 0.861 IS QUOTED, NEVER 0.857. Reconstructing the trivial model from the
 * printed prevalences gives 0.857, close enough to confirm what "trivial
 * model" means and not close enough to print. A figure drawing a number
 * derived here beside a citation printing a different one is the rounding trap
 * `competing-risks` was written to avoid.
 *
 * THE SITE FIGURES ARE COLLECTION SIZES, NOT TEST-SET SIZES. The paper prints
 * 112,120 and 42,396 for the collections and prints its test-set counts only
 * for the hospital-identification model. Using the latter as though they were
 * the pneumonia model's split would be an assumption wearing a citation, so
 * the figure states collection sizes and the note says the models were scored
 * on held-out portions.
 */
export const crossSiteGeneralisation: Puzzle = {
  schemaVersion: 1,
  id: "cross-site-generalisation-pneumonia",
  slug: "it-learned-the-hospital",
  category: "causal-reasoning",
  reasoningSkill: "cross-site-generalisation",
  difficulty: "hard",
  tags: ["research", "technology", "diagnosis"],
  supportedLocales: ["en"],

  setup: {
    headline: {
      en: "A neural network reads chest X-rays for pneumonia and scores 0.931, where 0.5 is a coin toss and 1 is perfect. It was tested on tens of thousands of images it had never seen.",
    },
    framing: {
      en: "The test images were pooled from two hospital collections. One is far larger than the other, and pneumonia is far commoner in the smaller one. The model was trained on images from both and scored on held-out images from both.",
    },
    question: { en: "Is 0.931 good evidence that the model can read a chest X-ray?" },
    data: {
      type: "shortcut",
      label: { en: "Detecting pneumonia on a chest X-ray" },
      metricLabel: { en: "area under the curve" },
      outcomeLabel: { en: "pneumonia" },
      prevalenceLabel: { en: "How often pneumonia appears in each collection" },
      separabilityLabel: { en: "shown only the images, told the two hospitals apart" },
      separability: 99.95,
      cohortNote: {
        en: "Zech et al 2018. Collection sizes shown; models were trained and scored on held-out portions of them.",
      },
      chance: 0.5,
      sites: [
        {
          id: "nih",
          label: { en: "National Institutes of Health" },
          short: { en: "NIH" },
          n: 112120,
          prevalence: 1.2,
        },
        {
          id: "msh",
          label: { en: "Mount Sinai Hospital" },
          short: { en: "Mount Sinai" },
          n: 42396,
          prevalence: 34.2,
        },
      ],
      models: [
        {
          id: "deep",
          label: { en: "Trained on X-rays from both hospitals" },
          score: 0.931,
          usesEvidence: true,
        },
        {
          id: "trivial",
          label: { en: "Told only which hospital, never shown an X-ray" },
          score: 0.861,
          usesEvidence: false,
          note: {
            en: "It ranks every Mount Sinai image above every NIH one and does nothing else.",
          },
        },
      ],
    },
    initialView: { kind: "asscored" },
  },

  /*
    Exactly one band sits on the direction the figure licenses. The trap reads
    the score and stops. The sample-size band is refuted by the counts on
    screen. The hedge is wrong because the composition IS shown: a reader who
    sees 34.2 against 1.2 can reason that naming the collection predicts the
    diagnosis, without needing a second hospital to prove it.
  */
  choices: [
    {
      id: "yes-strong",
      label: { en: "Yes, that is strong performance on a large test set" },
      sublabel: { en: "0.931 is a long way above a coin toss" },
      isCorrect: false,
      isIntuitiveTrap: true,
    },
    {
      id: "too-small",
      label: { en: "No, the test set is too small to support it" },
      sublabel: { en: "single studies overstate their own results" },
      isCorrect: false,
      isIntuitiveTrap: false,
    },
    {
      id: "without-image",
      label: { en: "No, much of that score is available without the image" },
      sublabel: { en: "one collection is far more pneumonic than the other" },
      isCorrect: true,
      isIntuitiveTrap: false,
    },
    {
      id: "need-another-hospital",
      label: { en: "There is no way to tell without trying another hospital" },
      sublabel: { en: "only an outside test could settle it" },
      isCorrect: false,
      isIntuitiveTrap: false,
    },
  ],

  reveal: {
    headline: {
      en: "A model told only which hospital each X-ray came from, and never shown a single image, scores 0.861 on the very same test set. Measured from the coin toss, that is 84 per cent of everything the real model achieved.",
    },
    mechanismLabel: { en: "What was it actually looking at?" },
    mechanismName: { en: "A shortcut" },
    explanation: {
      en: "Pneumonia appears in about a third of the Mount Sinai images and in about one in eighty of the NIH ones, a difference of some 28 times. So the hospital an image came from is by itself a powerful predictor of the diagnosis, and any model that can work out the hospital inherits that power without learning anything about lungs. These models can: shown only the images, a network identified which hospital they came from 99.95 per cent of the time, from portable-scanner markings, positioning, exposure and the small habits that differ between institutions. Within one hospital, a network told inpatient from emergency images every single time.",
    },
    body: {
      en: "Notice what this does not say. The model is not a fraud and its authors are the ones who found this; the paper exists to report it. Nor is it useless: trained and tested at a single hospital it still scores around 0.8, which is real if unspectacular. What collapses is the interpretation of the 0.931, because that number was earned on a pooled set whose parts differ, and a pooled set rewards a model for knowing which part it is looking at. The same shortcut is why performance falls at a hospital the model has never seen: there the marking it learned means nothing, and the prevalence it memorised is somebody else's.",
    },
    view: { kind: "whatitsaw" },
  },

  lesson: {
    skillName: { en: "Shortcuts and outside validation" },
    takeaway: {
      en: "A model's score is earned on a particular test set, and if that set is pooled from sources that differ in how often the outcome occurs, part of the score is payment for recognising the source. Before believing a number, ask what a model could achieve on that same data while being denied the evidence it is supposed to be using. If the answer is most of it, the number is about the data rather than about the task.",
    },
    body: {
      en: "A shortcut is any feature that predicts the answer in the data you have without being the thing you meant. A scanner marking, a ward, a date, the way one hospital crops its images. Models find them because they are looking for whatever predicts the label and have no notion of which features are legitimate. The tell is almost never visible in the headline number, which is why the check has to be built rather than looked for: train a model on everything except the evidence, and see how far it gets. That control costs an afternoon and is worth more than another point of accuracy.",
    },
    howItWorks: {
      en: "Two things have to be true for a shortcut to inflate a score. Something in the input has to identify the source, and the sources have to differ in how often the outcome occurs. Both are easy to arrange by accident. Images acquired on different equipment carry equipment signatures; records from different clinics carry formatting; text from different eras carries vocabulary. And sources almost always differ in outcome rate, because they serve different populations for different reasons, which is usually why several were pooled in the first place. The result is that pooling data to get a bigger training set can raise the apparent score while lowering what the model has actually learned. The defences are unglamorous and all involve refusing to be impressed by one number: hold out a whole source rather than a random sample of rows, report performance per source rather than pooled, and run the deliberately blinded control. None of them requires a better model, which is the point, because a better model would find the shortcut faster.",
    },
    examples: [
      {
        title: { en: "The same models, at a hospital they had never seen" },
        summary: {
          en: "The authors also tested across institutions. A model trained at Mount Sinai scored 0.802 on held-out Mount Sinai images and 0.717 at the NIH; a model trained on both scored 0.931 on their pooled data and 0.815 at a third hospital in Indiana. Those drops are real, and they are the part of the study most often quoted, but they are the weaker evidence: they compare different test sets, so a sceptic can always reply that the sets differ for ordinary reasons. The blinded control avoids that objection entirely by staying on one set, which is why it is the finding this card is built on.",
        },
        provenance: {
          source:
            "Zech JR, Badgeley MA, Liu M, Costa AB, Titano JJ, Oermann EK. Variable generalization performance of a deep learning model to detect pneumonia in chest radiographs: a cross-sectional study. PLOS Medicine 2018;15(11):e1002683, Results. Open access",
          year: 2018,
          doi: "10.1371/journal.pmed.1002683",
          url: "https://journals.plos.org/plosmedicine/article?id=10.1371/journal.pmed.1002683",
        },
      },
    ],
  },

  share: {
    title: { en: "It learned the hospital, not the disease." },
    explainer: {
      en: "A pneumonia detector scored 0.931 on held-out chest X-rays. A model given nothing but the name of the hospital, and never shown an image, scored 0.861 on the same test set, because pneumonia was 28 times commoner in one of the two collections than the other. Shown only the images, a network could name the hospital 99.95 per cent of the time. Before believing a model's score, ask how much of it survives taking the evidence away.",
    },
    captions: {
      competitive: { en: "Asked what the model was actually looking at." },
      selfDeprecating: { en: "I was impressed by a model reading the letterhead." },
    },
  },

  provenance: {
    source:
      "Zech JR, Badgeley MA, Liu M, Costa AB, Titano JJ, Oermann EK. Variable generalization performance of a deep learning model to detect pneumonia in chest radiographs: a cross-sectional study. PLOS Medicine 2018;15(11):e1002683. Collection sizes, prevalences, the pooled and trivial model AUCs and the hospital-identification accuracy are all as printed. Open access",
    year: 2018,
    doi: "10.1371/journal.pmed.1002683",
    url: "https://journals.plos.org/plosmedicine/article?id=10.1371/journal.pmed.1002683",
  },
};
