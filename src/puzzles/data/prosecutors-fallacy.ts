import type { Puzzle } from "../schema.ts";

/**
 * The prosecutor's fallacy (the transposed conditional), via People v. Collins
 * (Cal. 1968). The prosecution multiplied six assumed frequencies to reach
 * "1 in 12 million" and invited the jury to read it as the chance the couple in
 * the dock were innocent. Reusing the frequencies data shape: the "condition" is
 * being the pair who actually did it, the "positive" is fitting the description.
 *
 * Counts follow the court's own appendix, which took the pool at about 12
 * million couples: 1 guilty pair (who of course fit) plus, at odds of 1 in 12
 * million across 12 million couples, about 1 innocent pair who fit by chance.
 * The engine derives the ~50% predictive value from those counts; nothing here
 * hardcodes a percentage.
 */
export const prosecutorsFallacy: Puzzle = {
  schemaVersion: 1,
  id: "prosecutors-fallacy-courtroom-odds",
  slug: "courtroom-odds",
  category: "statistical-reasoning",
  reasoningSkill: "prosecutors-fallacy",
  difficulty: "hard",
  tags: ["everyday", "statistics", "law"],
  supportedLocales: ["en"],

  setup: {
    headline: { en: "A 1 in 12 million match. Case closed?" },
    framing: {
      en: "Los Angeles, 1964. A woman is knocked down and her purse is taken. Witnesses describe the pair who ran off: a blonde woman with a ponytail and a bearded Black man, in a partly yellow car. A couple who fit every detail are charged. At the trial an expert is asked to assume a frequency for each feature, multiplies them together, and gets 1 in 12 million. The prosecutor tells the jury that is the chance the two in the dock are innocent. Take the 1 in 12 million at face value, and picture the 12 million couples who could have been the ones.",
    },
    question: {
      en: "This couple fits the description. What are the odds they did it?",
    },
    data: {
      type: "frequencies",
      label: { en: "In 12 million couples" },
      total: 12000000,
      conditionLabel: { en: "did it" },
      positiveLabel: { en: "fit the description" },
      withCondition: 1,
      positiveGivenCondition: 1,
      positiveGivenNoCondition: 1,
    },
    initialView: { kind: "headline" },
  },

  choices: [
    {
      id: "certain",
      label: { en: "Virtually certain" },
      sublabel: { en: "12 million to one against them" },
      isCorrect: false,
      isIntuitiveTrap: true,
    },
    {
      id: "strong",
      label: { en: "Around 99%" },
      sublabel: { en: "not quite proof, but close" },
      isCorrect: false,
      isIntuitiveTrap: false,
    },
    {
      id: "coinflip",
      label: { en: "About a coin flip" },
      sublabel: { en: "roughly 50/50" },
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
    headline: { en: "One in 12 million, and still a coin flip." },
    mechanismLabel: { en: "The flipped question" },
    mechanismName: { en: "Rare evidence is common in a big crowd" },
    explanation: {
      en: "The 1 in 12 million answers one question: pick a couple at random, how likely are they to fit? The jury has to answer a different one: of all the couples who do fit, which pair did it? Line up 12 million couples. One pair are the robbers, and of course they fit. But at odds of 1 in 12 million, roughly one more couple in that crowd fits by pure chance. So a couple who fits is about as likely to be innocent as guilty.",
    },
    body: {
      en: "The California Supreme Court reversed the conviction in 1968. Working from the prosecution's own figures, it found a likelihood of over 40 percent that at least one other couple could have fitted the description just as well, and it warned that guilt cannot be settled by arithmetic like this.",
    },
    view: { kind: "breakdown" },
  },

  lesson: {
    skillName: { en: "The prosecutor's fallacy" },
    takeaway: {
      en: "“If he were innocent, this evidence would be that unlikely” is not the same as “this evidence makes him that unlikely to be innocent.” Swap the two and a coin flip starts to sound like certainty.",
    },
    body: {
      en: "Before you accept a one in a million match, ask how big the pool was. One in a million odds across a city of ten million throw up about ten matches, and only one of those people did it. The number means nothing until you say who was in the crowd.",
    },
    howItWorks: {
      en: "Two questions sound identical and are not. The first: if this person had nothing to do with it, how likely is this evidence? That is what a lab or an expert can actually measure, and it is where figures like 1 in 12 million come from. The second: given this evidence, how likely is it that this person did it? That is what a jury has to decide, and it depends on something no lab measures, namely how many people could have done it. Push odds of 1 in 12 million through a crowd of 12 million and you expect about one innocent match, so the match on its own is worth roughly a coin flip. Shrink the crowd, or add independent evidence, and the same match becomes powerful. Grow the crowd, and it becomes weak. The trap also runs in reverse: a defence lawyer can say that 2,000 people in the city share that blood type, so the evidence proves nothing, which quietly ignores that the other 1,999 were nowhere near the crime.",
    },
    examples: [
      {
        title: { en: "Two cot deaths, and a number that became guilt" },
        summary: {
          en: "An English murder trial heard that the chance of two cot deaths in a family like the defendant's was 1 in 73 million. Press reports turned that into the chance the deaths were natural. The Royal Statistical Society said publicly that the figure had no statistical basis, because it assumed the two deaths were independent, and that reading it as a chance of innocence is the prosecutor's fallacy. What the jury needed was a comparison: two cot deaths and two murders are both rare, so which is rarer here?",
        },
        provenance: {
          source:
            "Royal Statistical Society. News release: Royal Statistical Society concerned by issues raised in Sally Clark case. 23 October 2001. (Her convictions were later quashed on appeal: R v Clark [2003] EWCA Crim 1020, 11 April 2003.)",
          year: 2001,
          url: "https://rss.org.uk/RSS/media/File-library/Membership/Sections/2020/Sally-Clark-RSS-statement-2001.pdf",
        },
      },
      {
        title: { en: "Almost nobody spots the swap" },
        summary: {
          en: "Researchers gave 73 students a murder case in which the killer's blood type is found in 1 person in 100, then showed them a prosecution argument built on the swapped question: only a 1 percent chance the blood came from someone else, so a 99 percent chance the suspect is guilty. 21 of the 73 rated that argument correct, and only 16 saw that it and the opposing defence argument were both wrong.",
        },
        provenance: {
          source:
            "Thompson WC, Schumann EL. Interpretation of statistical evidence in criminal trials: the prosecutor's fallacy and the defense attorney's fallacy. Law Hum Behav. 1987;11(3):167-187.",
          year: 1987,
          doi: "10.1007/BF01044641",
          url: "https://link.springer.com/article/10.1007/BF01044641",
        },
      },
    ],
  },

  share: {
    title: { en: "The prosecutor's fallacy, a reasoning trap." },
    explainer: {
      en: "When an expert says there is only a one in a million chance of a match by accident, that is a fact about the evidence, not about the person in the dock. Flip the two around and you get the prosecutor's fallacy. The cure is to ask how many people were in the pool: one in a million odds across a city of ten million produce about ten innocent matches, so on its own a match can be nowhere near proof.",
    },
    captions: {
      competitive: { en: "Spotted the swap. Bet you don't." },
      selfDeprecating: { en: "I'd have convicted on the spot." },
    },
  },

  provenance: {
    source:
      "People v. Collins, 68 Cal.2d 319, 438 P.2d 33, 66 Cal.Rptr. 497 (Cal. 1968), decided 11 March 1968. (The prosecution multiplied six assumed frequencies, 1/10, 1/4, 1/10, 1/3, 1/10 and 1/1000, to reach 1 in 12 million, and urged the jury to read it as the chance the defendants were innocent. The conviction was reversed.)",
    year: 1968,
    url: "https://scocal.stanford.edu/opinion/people-v-collins-22583",
    note: {
      en: "The court's appendix showed that on those same figures, with a pool of about 12 million couples, the chance that at least one other couple fitted the description was roughly 41 percent.",
    },
  },

  goDeeperUrl: "https://en.wikipedia.org/wiki/Prosecutor%27s_fallacy",
};
