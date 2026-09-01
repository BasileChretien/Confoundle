import type { Puzzle } from "../schema.ts";

/**
 * How big people think countries are, and the shape of how wrong they get it.
 *
 * Battersby and Montello gave 194 students the names of twenty-six world
 * regions, told them the conterminous United States counts as 1,000 units, and
 * asked them to write a number for each. No maps were shown at any point. The
 * mean guesses are compressed towards the middle: Denmark, which is 5.3 units,
 * came back as 140, while Brazil, which is 1,088, came back as 615.
 *
 * The seven regions here are a subset of the twenty-six, and the puzzle's test
 * carries all twenty-six and proves the pattern is not an artefact of the
 * subset. They span the range: the second most overestimated region in the
 * study (Denmark), the most underestimated (Brazil), and Peru, which the same
 * people put at 165 against a true 166 and which is in the figure precisely
 * because it shows the error is a function of size rather than of ignorance.
 *
 * The setup draws the guesses alone. They are correctly ordered, and the paper
 * reports the guesses correlating with the truth at r = 0.82, so they read as a
 * sensible ranking. The reveal adds the true size under each one without
 * moving anything, and the ordering turns out to have been the only thing that
 * was right.
 *
 * WHY GREENLAND IS THE TRAP. Everyone has heard that the Mercator projection
 * makes Greenland look the size of Africa, so Greenland is the answer that
 * comes to mind. It is wrong twice over. People put Greenland at 1.9 times its
 * real size, and fifteen of the other twenty-five regions in the study are
 * overestimated by more than that. And the study's own conclusion is that map
 * projections do not measurably shape these beliefs at all: across the
 * twenty-six regions the error tracks size, not latitude.
 */
export const magnitudeCompression: Puzzle = {
  schemaVersion: 1,
  id: "magnitude-compression-battersby",
  slug: "how-big-is-denmark",
  category: "statistical-reasoning",
  reasoningSkill: "magnitude-compression",
  difficulty: "medium",
  tags: ["everyday", "psychology", "statistics", "education"],
  supportedLocales: ["en"],

  setup: {
    headline: {
      en: "194 people were told the lower 48 states count as 1,000, then asked how big each of these countries is. Their averages came back in the right order.",
    },
    framing: {
      en: "Nobody was shown a map. They wrote a number for each name. The order they put the countries in is very nearly correct, and the guesses correlate with the truth at 0.82, so at first glance this looks like a group that broadly knows its geography.",
    },
    question: {
      en: "One of these guesses is wrong by a far bigger multiple of the country's real size than the others. Which one?",
    },
    data: {
      type: "magnitude",
      label: { en: "How big is each country?" },
      scaleLabel: { en: "Lower 48 states = 1,000" },
      estimatedLabel: { en: "What people guessed" },
      actualLabel: { en: "What it actually is" },
      statNote: {
        en: "Mean guesses from 194 people, seven of the twenty-six regions in the study. The other nineteen behave the same way.",
      },
      items: [
        {
          id: "denmark",
          label: { en: "Denmark" },
          actual: 5.3,
          estimated: 140,
        },
        {
          id: "greece",
          label: { en: "Greece" },
          actual: 16.1,
          estimated: 179,
        },
        { id: "japan", label: { en: "Japan" }, actual: 47.5, estimated: 269 },
        { id: "peru", label: { en: "Peru" }, actual: 166.0, estimated: 165 },
        {
          id: "greenland",
          label: { en: "Greenland" },
          actual: 271.2,
          estimated: 520,
        },
        {
          id: "australia",
          label: { en: "Australia" },
          actual: 985.3,
          estimated: 740,
        },
        {
          id: "brazil",
          label: { en: "Brazil" },
          actual: 1087.6,
          estimated: 615,
        },
      ],
    },
    initialView: { kind: "asnumbers" },
  },

  choices: [
    {
      // The answer everybody has heard. Greenland is out by 1.9 times, and
      // fifteen of the study's other regions are out by more.
      id: "greenland",
      label: { en: "Greenland" },
      sublabel: { en: "the one Mercator inflates" },
      isCorrect: false,
      isIntuitiveTrap: true,
    },
    {
      id: "denmark",
      label: { en: "Denmark" },
      sublabel: { en: "the smallest one here" },
      isCorrect: true,
      isIntuitiveTrap: false,
    },
    {
      // Sound reasoning, wrong question. Brazil IS the furthest off in raw
      // units, by 473 of them. That is why the question says multiple.
      id: "brazil",
      label: { en: "Brazil" },
      sublabel: { en: "the biggest one here" },
      isCorrect: false,
      isIntuitiveTrap: false,
    },
    {
      id: "cannot-tell",
      label: { en: "There is no way to tell" },
      sublabel: { en: "too little to go on" },
      isCorrect: false,
      isIntuitiveTrap: false,
    },
  ],

  reveal: {
    headline: { en: "Denmark, by twenty-six times. Greenland was nearly fine." },
    mechanismLabel: { en: "The same guesses, against the truth" },
    mechanismName: { en: "Small things feel far bigger than they are" },
    explanation: {
      en: "Denmark is 5 units and came back as 140. Greece is 16 and came back as 179. Japan is 48 and came back as 269. Then the error changes sign: Australia is 985 and came back as 740, Brazil is 1,088 and came back as 615. Peru, in the middle, came back at 165 against a true 166. The same people were almost exactly right about one country and out by a factor of twenty-six about another, and what separates the two is nothing but size.",
    },
    body: {
      en: "The ranking was never the problem. Read the guesses on their own and they look like knowledge, because the order is right and the correlation with the truth is 0.82. What that order hides is that the whole scale is squashed: everything is pulled towards the middle, so the small end is inflated and the large end is flattened. Guesses that differ by a factor of four can be describing countries that differ by a factor of two hundred. Greenland is worth a second look. It is the one region everybody expects to be wildly overestimated, because of the Mercator projection, and it is out by less than fifteen of the other regions in the study. The authors checked latitude directly and found it explains almost nothing; size explains nearly all of it.",
    },
    view: { kind: "againsttruth" },
  },

  lesson: {
    skillName: { en: "Compressed sense of magnitude" },
    takeaway: {
      en: "People are good at ordering quantities and bad at spacing them. A list that is in the right order can still be wrong by a factor of twenty-six at the small end and by half at the large end, so a ranking you trust tells you almost nothing about the gaps between its entries.",
    },
    body: {
      en: "This is not a fact about geography. The same squashing turns up whenever people put numbers on things they cannot count directly: how loud a sound is, how much a policy costs, how many people a disease kills, how long a project will take. Small quantities get talked up and large ones get talked down, and because the ordering survives, the estimates keep looking competent. It is why a budget line of a few million and one of a few billion end up feeling like comparable amounts of money in an argument, and why a rare risk and a common one can be discussed in the same tone of voice.",
    },
    howItWorks: {
      en: "Psychophysics has a name for it. When people estimate a magnitude, their answers tend to follow the true value raised to a power, and for area that power is well under one, which is exactly what compression means: multiply the real thing by a hundred and the guess goes up by far less than a hundred. Battersby and Montello measured that exponent at about 0.56 in both of their studies. The practical consequence is that your sense of proportion degrades fastest exactly where it matters, at the extremes, and it degrades quietly, because the ordering keeps looking sensible. So when a comparison turns on how much bigger one thing is than another, do not trust the feeling of the gap. Get both numbers on the same scale and divide one by the other. If the answer surprises you, that surprise is the compression, and it was there the whole time you were reasoning without it."
    },
    examples: [
      {
        title: { en: "The same squashing, in what people think things cost" },
        summary: {
          en: "Asked to place familiar quantities on a line, people compress the range in the same direction: the low end is pushed up and the high end pulled down. The pattern is general enough to have its own literature in psychophysics, and it is why estimates of frequencies, costs and durations tend to be far too flat across their real range even when the ordering is right.",
        },
        provenance: {
          source:
            "Stevens SS. On the psychophysical law. Psychological Review 1957;64(3):153-181",
          year: 1957,
          doi: "10.1037/h0046162",
          url: "https://psycnet.apa.org/record/1959-00082-001",
        },
      },
    ],
  },

  share: {
    title: { en: "A compressed sense of size, a reasoning trap." },
    explainer: {
      en: "Ask people how big countries are and they get the order almost right and the spacing badly wrong. Denmark comes back at twenty-six times its real size; Brazil comes back at little over half. Ordering is cheap and spacing is hard, so a ranking that looks knowledgeable tells you almost nothing about the gaps in it. When an argument turns on how much bigger one thing is, get the two numbers and divide.",
    },
    captions: {
      competitive: {
        en: "You know which is bigger. You have no idea by how much.",
      },
      selfDeprecating: {
        en: "I put Denmark at twenty-six times its actual size. Confidently.",
      },
    },
  },

  provenance: {
    source:
      "Battersby SE, Montello DR. Area estimation of world regions and the projection of the global-scale cognitive map. Annals of the Association of American Geographers 2009;99(2):273-291",
    year: 2009,
    doi: "10.1080/00045600802683734",
    url: "https://people.geog.ucsb.edu/~montello/pubs/area_estim.pdf",
    note: {
      en: "Study 1, 194 students, magnitude estimation from memory with the conterminous United States set at 1,000 units and no maps shown. True sizes are the paper's modulus areas, printed as integers in Table 1 and to one decimal place in Table 3; both recompute exactly from the areas in square kilometres in Table 1 against the 7,809,158 square kilometres it gives for the conterminous United States, for all twenty-six regions. Guesses are the mean estimated areas in Table 2. The seven regions drawn here are a subset chosen to span the range, and the puzzle's test carries all twenty-six and checks that the pattern holds across the full set. Two honesty notes. The paper's Table 3 index of relative estimation accuracy is a mean of per-participant ratios rather than a ratio of the means, so it is a different statistic from anything computed here and is deliberately not used. And the paper's headline conclusion is the negative one: nonequal area projections, the Mercator in particular, were found not to have much if any influence on these beliefs, which is why Greenland is the trap in this puzzle rather than the answer.",
    },
  },

  goDeeperUrl: "https://people.geog.ucsb.edu/~montello/pubs/area_estim.pdf",
};
