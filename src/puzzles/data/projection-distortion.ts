import type { Puzzle } from "../schema";

/**
 * Which world map tells the truth about size, and which one people accuse.
 *
 * Battersby and Kessler showed six world projections to 31 undergraduates with
 * no training in map projections and asked, for each, whether it distorted
 * area. Two of the six are equal-area projections, which means they draw every
 * region in exact proportion to the ground it covers. Those two were among the
 * most accused. The projection accused least, by a wide margin, was Robinson,
 * which really does distort area.
 *
 * The setup draws two of them, Robinson and Gall-Peters, and asks which is
 * area-true. Robinson is the trap because it is the map almost everyone has
 * seen: one of the study's own participants said it "looks like the standard
 * map that I am used to looking at". Gall-Peters looks stretched and wrong, and
 * is exactly right.
 *
 * THE MAPS ARE COMPUTED, NOT COPIED. Both outlines were generated from Natural
 * Earth 110m land, which is public domain, by applying each projection's
 * published formula. Nothing from the paper's figures or from any copyrighted
 * map is reproduced. `projections.test.ts` proves from those formulae that
 * Gall-Peters is area-exact at every latitude and that Robinson inflates the
 * far north by about double.
 *
 * EISENLOHR IS DELIBERATELY ABSENT. The paper prints its novice figure twice
 * and the two disagree: Table 1 says 55 per cent and the prose on page 97 says
 * 58 per cent. Every other projection used here is printed twice and agrees
 * both times. Rather than pick a side, it is left out.
 *
 * THE SECOND GROUP IS DELIBERATELY ABSENT TOO. The study's 42 trained
 * participants cannot be used: their Mercator figure of 91 per cent is not
 * reachable by any whole number of 42 people, so the column cannot be
 * reconciled at all.
 */
export const projectionDistortion: Puzzle = {
  schemaVersion: 1,
  id: "projection-distortion-battersby-kessler",
  slug: "which-map-lies",
  category: "measurement",
  reasoningSkill: "projection-distortion",
  difficulty: "medium",
  tags: ["everyday", "education", "statistics", "media"],
  supportedLocales: ["en"],

  setup: {
    headline: {
      en: "Two maps of the same planet. One of them draws every country in exact proportion to its real area. The other does not.",
    },
    framing: {
      en: "Every flat map has to distort something, because a sphere cannot be flattened without stretching it somewhere. But a map can choose what to sacrifice, and some projections keep area exactly right and give up other things instead. One of these two is such a map.",
    },
    question: {
      en: "Which of these two draws every country at its true relative size?",
    },
    data: {
      type: "projection",
      label: { en: "The same world, projected two ways" },
      accusedLabel: {
        en: "Share of 31 people who said this map distorts the sizes of countries",
      },
      exactLabel: { en: "Every area exactly right" },
      distortsLabel: { en: "Areas distorted" },
      percentNote: {
        en: "Answers from 31 people with no training in map projections. Outlines computed from public-domain coastlines; the study's own maps are not reproduced.",
      },
      projections: [
        {
          id: "robinson",
          label: { en: "Robinson" },
          equalArea: false,
          saidDistorts: 10,
          mapId: "robinson",
        },
        {
          id: "gallpeters",
          label: { en: "Gall-Peters" },
          equalArea: true,
          saidDistorts: 39,
          mapId: "gallpeters",
        },
        {
          id: "vandergrinten",
          label: { en: "Van der Grinten" },
          equalArea: false,
          saidDistorts: 58,
        },
        {
          id: "goode",
          label: { en: "Goode homolosine" },
          short: { en: "Goode" },
          equalArea: true,
          saidDistorts: 71,
        },
        {
          id: "mercator",
          label: { en: "Mercator" },
          equalArea: false,
          saidDistorts: 74,
        },
      ],
    },
    initialView: { kind: "asdrawn" },
  },

  choices: [
    {
      // The map almost everyone has seen, and the one the study's participants
      // let off most easily. It is the one that distorts.
      id: "robinson",
      label: { en: "The one on the left" },
      sublabel: { en: "it looks like every map I have seen" },
      isCorrect: false,
      isIntuitiveTrap: true,
    },
    {
      id: "gallpeters",
      label: { en: "The one on the right" },
      sublabel: { en: "the stretched-looking one" },
      isCorrect: true,
      isIntuitiveTrap: false,
    },
    {
      // Half-remembered and wrong. Every flat map distorts SOMETHING; that does
      // not mean every flat map distorts AREA. Equal-area projections give up
      // shape and angle instead, and keep area exact.
      id: "neither",
      label: { en: "Neither, every flat map distorts area" },
      sublabel: { en: "you cannot flatten a sphere" },
      isCorrect: false,
      isIntuitiveTrap: false,
    },
    {
      id: "cannot-tell",
      label: { en: "There is no way to tell by looking" },
      sublabel: { en: "too little to go on" },
      isCorrect: false,
      isIntuitiveTrap: false,
    },
  ],

  reveal: {
    headline: {
      en: "The strange-looking one is the honest one. And it is the one people accuse.",
    },
    mechanismLabel: { en: "The same two maps, with the answer on them" },
    mechanismName: { en: "Familiar is not the same as accurate" },
    explanation: {
      en: "Gall-Peters, on the right, is an equal-area projection: every patch of ground is drawn in exact proportion to its real size, everywhere on the map. Robinson, on the left, is a compromise that keeps neither area nor angle, and it inflates the far north by roughly double against the tropics. Look at Greenland in each. Africa is about fourteen times its area, and only one of these two maps says so. Then look at what people said: of 31 people with no training, 39 per cent accused Gall-Peters of distorting area, which it does not, and only 10 per cent accused Robinson, which does.",
    },
    body: {
      en: "The pattern holds across the whole study. Goode is also an equal-area projection, also exactly right about size, and 71 per cent said it distorts area, more than any other map in the study except Mercator. What Goode and Gall-Peters have in common is not error, it is strangeness: one is interrupted into lobes, the other stretches the tropics into tall thin bands. Robinson gets the benefit of the doubt for the opposite reason. It was the standard world map of the National Geographic Society for a quarter of a century, so it is what a world map looks like, and what a world map looks like is what people check a world map against. That is the trap, and it has nothing to do with maps. When you judge whether a representation is accurate, you are usually judging whether it is familiar, because familiarity is the thing you can actually assess at a glance and accuracy is not.",
    },
    view: { kind: "whichisexact" },
  },

  lesson: {
    skillName: { en: "Familiarity read as accuracy" },
    takeaway: {
      en: "People check a picture of the world against the pictures they have already seen, not against the world. So the most conventional presentation feels the most truthful, and a correction that looks unusual gets treated as the distortion. Ask what a representation is designed to preserve, and check that against the thing itself, not against your memory of other representations.",
    },
    body: {
      en: "This is why an unfamiliar but accurate chart is a hard sell and a familiar but misleading one slips through. It is the same reflex behind trusting the graph style you grew up with, the accounting presentation everyone in the industry uses, or the league table published every year in the same shape. None of those are accurate because they are standard; they are trusted because they are standard. The map case is useful precisely because the accuracy question has a definite answer: a projection either preserves area or it does not, and you can check.",
    },
    howItWorks: {
      en: "A sphere cannot be laid flat without stretching it, so every world map gives something up. What varies is what. A conformal projection like Mercator keeps angles right, which is why it was built for navigation, and pays for that by inflating everything far from the equator without limit. An equal-area projection keeps every area in exact proportion and pays for it in shape. A compromise projection like Robinson keeps neither exactly and tries to look reasonable, which is a design goal about appearance rather than about accuracy. None of this is hidden knowledge; it is the definition of each family. The practical move is to stop asking whether a picture looks right and start asking what it was built to preserve. That question has an answer for maps, for charts, for accounting statements and for league tables, and the answer is usually written down somewhere by the person who built it. If nobody can tell you what a representation is designed to keep exact, the honest conclusion is that nobody has checked, not that it must be fine because it looks normal."
    },
    examples: [
      {
        title: { en: "The same reflex, in what a projection is actually for" },
        summary: {
          en: "Mercator's projection is often described as a mistake that made Europe look big. It was nothing of the kind: it was built so that a line of constant compass bearing is a straight line on the chart, which is exactly what a sixteenth-century navigator needed and is still why it underlies web maps. The inflation of high latitudes is not an error in it, it is the arithmetic price of the property it was designed to keep. Judging it as a poster of relative size is judging a tool against a job it was never built for.",
        },
        provenance: {
          source:
            "Snyder JP. Map Projections: A Working Manual. US Geological Survey Professional Paper 1395, United States Government Printing Office, 1987, pages 38 to 47",
          year: 1987,
          doi: "10.3133/pp1395",
          url: "https://pubs.usgs.gov/pp/1395/report.pdf",
        },
      },
    ],
  },

  share: {
    title: { en: "Familiarity read as accuracy, a reasoning trap." },
    explainer: {
      en: "Shown six world maps, people with no training accused the accurate ones of lying. Two of the six draw every country in exact proportion to its real area; 39 and 71 per cent said those two distorted size. The map they let off, at 10 per cent, was the one that really does distort it, and also the one that had been the standard world map for twenty-five years. Familiar is what you can judge at a glance. Accurate is not. Ask what a picture was built to preserve.",
    },
    captions: {
      competitive: {
        en: "You can spot a weird map. You cannot spot a wrong one.",
      },
      selfDeprecating: {
        en: "I called the accurate map distorted because it looked odd.",
      },
    },
  },

  provenance: {
    source:
      "Battersby SE, Kessler FC. Cues for interpreting distortion in map projections. Journal of Geography 2012;111(3):93-101",
    year: 2012,
    doi: "10.1080/00221341.2011.609895",
    url: "https://doi.org/10.1080/00221341.2011.609895",
    note: {
      en: "Table 1, the Novice column: 31 undergraduates self-reporting no background in map projections were shown six world projections and asked for each whether it distorted area. The shares who said it did are Robinson 10, Gall-Peters 39, Van der Grinten 58, Goode 71 and Mercator 74 per cent. Five of those six are printed twice, once in Table 1 and once in the discussion of that projection, and both printings agree in every case. Four honesty notes. Eisenlohr is the sixth projection and is excluded, because Table 1 gives its novice figure as 55 per cent while the prose gives 58, and there is no basis here for choosing between them. The study's second group of 42 trained participants is excluded entirely, because its Mercator figure of 91 per cent cannot be produced by any whole number of 42 people, so the column does not reconcile. The shares are authored exactly as published rather than converted to counts: they do each pin a unique number of people out of 31, but no other printed quantity in the paper confirms those counts, so converting them would assert more precision than the source supports. And the maps drawn here are not the study's. They were computed for this puzzle from Natural Earth 110m coastlines, which are public domain, using each projection's published formula, and the puzzle's test proves from that arithmetic that Gall-Peters is exactly area-true at every latitude while Robinson draws a ten-degree cell at 70 north about twice the size, relative to its ground, as one at the equator.",
    },
  },

  goDeeperUrl: "https://pubs.usgs.gov/pp/1395/report.pdf",
};
