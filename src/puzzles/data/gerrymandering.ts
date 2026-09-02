import type { Puzzle } from "../schema.ts";

/**
 * Puzzle #29, gerrymandering, on Griffith (1907), p. 73.
 *
 * The Massachusetts senate election of 1812, the one that gave the practice its
 * name. Griffith prints all four numbers on a single page:
 *
 *   Federalists   51,766 votes   11 of 40 seats
 *   Democrats     50,164 votes   29 of 40 seats
 *
 * and states the total vote for senators was 101,930, which is exactly
 * 51,766 + 50,164, so the two party figures are confirmed a second way by a
 * number printed independently of them. 11 + 29 = 40.
 *
 * WHY THIS CASE AND NOT A MODERN ONE. The audit rejected the North Carolina
 * ensemble work, which is better evidence in every technical respect, purely on
 * partisanship: it is about maps drawn by one named living party and concludes
 * they were extreme. This case has the same mathematics and none of that
 * problem, because BOTH parties in it have been extinct for two centuries. No
 * reader alive identifies with the Federalists or the Democratic-Republicans,
 * so the lesson lands as arithmetic rather than as an accusation. That is the
 * whole reason a two-hundred-year-old source beats a rigorous modern one here.
 *
 * NO NEW SHAPE. This is `rates` with `strataAreSeparateSamples` set. Votes and
 * seats are two separate countings of the same election, not two parts of one
 * population, so pooling them would be meaningless and the flag stops the
 * engine trying. The setup draws the votes stratum alone, which reads as an
 * ordinary near-tie that the Federalists narrowly won; the reveal adds the
 * seats stratum and the winner has swapped.
 *
 * WHY THE HEDGE IS WRONG. The framing supplies the one fact that settles it:
 * the senate districts had been redrawn months earlier, by the party that went
 * on to lose the popular vote, and signed into law by a governor of that party.
 * A district map drawn by one side, for the purpose of winning, is not a
 * neutral instrument, so the side that drew it does better than its votes.
 * "Far fewer than half" follows from that; the exact 11 of 40 does not, and the
 * reveal supplies it.
 *
 * WHAT THIS MUST NOT BECOME. The lesson is that the map maker chooses the
 * result, not that one tradition is uniquely guilty. The copy says outright
 * that the practice has since been used by every party that has ever held the
 * pen, and the deep dive points at the modern quantitative work rather than
 * leaving a 1907 book to carry a claim about the present.
 */
export const gerrymandering: Puzzle = {
  schemaVersion: 1,
  id: "gerrymandering-massachusetts-1812",
  slug: "more-votes-fewer-seats",
  category: "statistical-reasoning",
  reasoningSkill: "gerrymandering",
  difficulty: "medium",
  tags: ["everyday", "history", "politics"],
  supportedLocales: ["en"],

  setup: {
    headline: {
      en: "In this election one party won more votes than the other. Just barely, but it won them.",
    },
    framing: {
      en: "Massachusetts, 1812, electing the forty members of the state senate. Months before the vote, the legislature had redrawn the senate districts and the governor had signed the new map into law. Both the legislature and the governor belonged to one of the two parties, and that party drew the boundaries. When the votes were counted, 101,930 had been cast for senators, and the OTHER party, the one that had not drawn the map, came out narrowly ahead.",
    },
    question: {
      en: "How many of the 40 senate seats did the party with more votes win?",
    },
    data: {
      type: "rates",
      metricLabel: { en: "Share won" },
      higherIsBetter: true,
      // Votes and seats are two separate countings of one election, not two
      // parts of one population, so an "overall" bar across them would be
      // meaningless. The flag stops the engine offering one.
      strataAreSeparateSamples: true,
      groups: [
        {
          id: "federalists",
          label: { en: "Federalists, who did not draw the map" },
          short: { en: "Federalists" },
        },
        {
          id: "democrats",
          label: { en: "Democratic-Republicans, who drew the map" },
          short: { en: "Democratic-Republicans" },
        },
      ],
      strata: [
        { id: "votes", label: { en: "Votes cast for senators" } },
        { id: "seats", label: { en: "Senate seats won" } },
      ],
      observations: [
        { groupId: "federalists", stratumId: "votes", numerator: 51766, denominator: 101930 },
        { groupId: "democrats", stratumId: "votes", numerator: 50164, denominator: 101930 },
        { groupId: "federalists", stratumId: "seats", numerator: 11, denominator: 40 },
        { groupId: "democrats", stratumId: "seats", numerator: 29, denominator: 40 },
      ],
    },
    initialView: {
      kind: "stratified",
      strataIds: ["votes"],
      caption: { en: "The votes, and nothing else yet" },
    },
  },

  choices: [
    {
      id: "about-half",
      label: { en: "About half, close to their share of the vote" },
      sublabel: { en: "seats should follow votes" },
      isCorrect: false,
      isIntuitiveTrap: true,
    },
    {
      id: "majority",
      label: { en: "A majority, since they won the most votes" },
      sublabel: { en: "they did win, after all" },
      isCorrect: false,
      isIntuitiveTrap: false,
    },
    {
      id: "far-fewer",
      label: { en: "Far fewer than half" },
      sublabel: { en: "consider who drew the districts" },
      isCorrect: true,
      isIntuitiveTrap: false,
    },
    {
      // The hedge. Offered in nearly every puzzle so that picking it is a
      // judgement rather than a tell, and wrong here: the framing says who drew
      // the map and why, which settles the direction on its own.
      id: "cannot-tell",
      label: { en: "There is no way to tell" },
      sublabel: { en: "too little to go on" },
      isCorrect: false,
      isIntuitiveTrap: false,
    },
  ],

  reveal: {
    headline: {
      en: "Eleven of forty. The party with fewer votes took twenty-nine seats.",
    },
    mechanismLabel: { en: "What the boundaries did" },
    mechanismName: {
      en: "The same votes, sorted into different boxes, give a different parliament",
    },
    explanation: {
      en: "Not one voter changed their mind, and not one ballot was miscounted. The Federalists received 51,766 votes and the Democratic-Republicans 50,164, so the Federalists genuinely won the election by about 1,600 votes out of 101,930. They then received eleven of the forty seats. The party that had drawn the districts took the other twenty-nine, which is nearly three quarters of the chamber on slightly under half the vote:",
    },
    body: {
      en: "The trick is in how the lines gather people up. Pack as many of your opponent's voters as possible into a handful of districts they win overwhelmingly, so those votes pile up far beyond what is needed, and spread the rest thinly across many districts they lose narrowly. Their votes are then either wasted on enormous majorities or wasted on near misses, and yours are spent efficiently. One of the new Massachusetts districts was drawn in such a contorted shape that a newspaper cartoon added wings and claws and called it a salamander, after the governor who signed it: Elbridge Gerry. That is where the word comes from, and the word has outlived both of the parties involved.",
    },
    view: {
      kind: "stratified",
      caption: { en: "Votes, and the seats they produced" },
    },
  },

  lesson: {
    skillName: { en: "Gerrymandering" },
    takeaway: {
      en: "When votes are counted inside districts, whoever draws the districts is choosing part of the answer before anyone votes. A result can be arithmetically correct at every step and still not reflect what people chose.",
    },
    body: {
      en: "Note what this is not. It is not a claim about any living party: this practice has been used by whichever side happened to hold the pen, in many countries and in every century since, and the two parties in this example both ceased to exist long ago. It is also not an argument that districts are a mistake. Drawing boundaries is unavoidable in any system with local representation, and someone has to do it. What the example shows is narrower and harder to argue with: the drawing is not a neutral technical step, and asking who did it is a reasonable question about any districted result.",
    },
    howItWorks: {
      en: "The mechanism has a name in the modern literature: wasted votes. Every vote cast for a losing candidate is wasted, and so is every vote for a winner beyond the number needed to win. A map maker who wants a particular result arranges the boundaries so that the other side wastes as many votes as possible, and there are exactly two ways to do it. Packing puts their supporters into a small number of districts where they win by enormous margins, so tens of thousands of their votes elect one representative. Cracking splits the rest across many districts where they lose by a little, so those votes elect nobody at all. Both are legal, both leave every individual count accurate, and together they let a minority of voters elect a majority of seats. Two consequences are worth carrying. First, the shape of a district is a weak clue, not proof, and this cuts both ways: a bizarre outline can be the innocent result of a river or a city boundary, while a tidy rectangle can be carefully drawn to split a community in half. That is why the serious modern work does not look at shapes at all. Instead it generates many thousands of alternative maps by computer under the state's own stated rules, retallies the same real votes on each one, and asks where the enacted map falls in that distribution. A map that produces a result almost no neutral map produces is the finding, and this method has caught maps drawn by more than one party. Second, and more transferable, the same reasoning applies far outside politics. Whenever performance is measured inside units that somebody chose, whether those are sales regions, school catchments, hospital trusts or department boundaries, the choice of unit is part of the result. Ask who drew the boundary and when, and whether the answer would survive being drawn differently.",
    },
    examples: [
      {
        title: { en: "How the same question is answered today" },
        summary: {
          en: "Modern work replaces argument about shapes with a distribution. One study generated 24,518 alternative district maps for a US state by computer, following that state's own stated redistricting rules, then retallied the same real votes on every one of them. The enacted maps produced a seat split that appeared in less than one per cent of those alternatives, while a map drawn separately by a bipartisan panel of retired judges behaved like a typical map from the pile. That second finding is the useful one for this lesson: a drawing process without a stake in the outcome produced an unremarkable outcome, which is what makes the question about the enacted map a question about who drew it rather than about which party they belonged to.",
        },
        provenance: {
          source:
            "Herschlag G, Kang HS, Luo J, Graves CV, Bangia S, Ravier R, Mattingly JC. Quantifying gerrymandering in North Carolina. Statistics and Public Policy. 2020;7(1):30-38. Preprint arXiv:1801.03783. The ensemble comprised 24,518 randomly generated redistricting plans; the judges' plan is compared against that ensemble alongside the enacted plans.",
          year: 2020,
          doi: "10.1080/2330443X.2020.1796400",
          url: "https://www.tandfonline.com/doi/full/10.1080/2330443X.2020.1796400",
        },
      },
    ],
  },

  share: {
    title: { en: "Gerrymandering, a reasoning trap." },
    explainer: {
      en: "Massachusetts, 1812. One party won the popular vote for the state senate, 51,766 against 50,164. It received eleven of the forty seats. The other party, which had redrawn the district boundaries a few months earlier, took twenty-nine. Nobody miscounted anything: when votes are tallied inside districts, whoever draws the districts has already chosen part of the answer. A newspaper thought one of the new districts looked like a salamander and named it after the governor who signed it, Elbridge Gerry. Both those parties are long gone and the practice is not. Whenever a result is measured inside units that someone chose, ask who chose them.",
    },
    captions: {
      competitive: { en: "Caught it. Bet you can't." },
      selfDeprecating: { en: "I totally fell for this." },
    },
  },

  provenance: {
    source:
      "Griffith EC. The Rise and Development of the Gerrymander. Chicago: Scott, Foresman and Company; 1907, p. 73. On the Massachusetts senate election of 1812: twenty-nine Democratic senators were elected and eleven Federalists; the total vote for senators was 101,930, of which the Federalists received 51,766 and the Democrats 50,164.",
    year: 1907,
    url: "https://archive.org/details/risedevelopmento00grif",
    note: {
      en: "The four figures are printed together on one page and reconcile two ways: 51,766 plus 50,164 is exactly the 101,930 total the same sentence gives, and 11 plus 29 is the 40 seats of the chamber, so the party numbers are confirmed by a total stated independently of them. This case was chosen over far better modern evidence for one reason. The rigorous contemporary work analyses maps drawn by a named living party and concludes they were extreme, which would make one side look uniquely foolish; here both parties have been extinct for two centuries, so the same mathematics carries no partisan charge. Three limits. The party Griffith calls the Democrats is the Democratic-Republican party of Jefferson and Madison, which is not the ancestor of any single modern party and should not be read as one. Griffith is a 1907 secondary work on 1812 sources, which is the standard scholarly account of the episode's origin but is not a modern reanalysis of the returns. And a single election cannot show that the map caused the gap rather than the geography, which is precisely the question the modern ensemble method exists to answer, and why it is the deep-dive example rather than a footnote.",
    },
  },

  goDeeperUrl: "https://en.wikipedia.org/wiki/Gerrymandering",
};
