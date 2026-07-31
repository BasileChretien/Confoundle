import type { Puzzle } from "../schema";

/**
 * Puzzle #39, the self-applied label, on Law and Versteeg (2013). Backlog entry
 * 13, requested directly: the deck had `framing-effect`, which is the same
 * facts told with a different emotional colour, and nothing at all on a name or
 * charter that simply makes a false claim about itself.
 *
 * THE TECHNIQUE HAS NO SINGLE AGREED NAME, and the lesson says so rather than
 * inventing one and passing it off as standard. Four established terms each
 * cover part of it: persuasive definition (Stevenson 1938), glittering
 * generality (Institute for Propaganda Analysis 1937), doublespeak (Lutz after
 * Orwell), and decoupling or ceremonial conformity (Meyer and Rowan 1977). The
 * last is the one with an empirical tradition, and it is what this source
 * measures. The skill takes a plain English name of its own and the lesson
 * points at all four.
 *
 * READ FROM TABLE 1 ON PAGE 913, VISUALLY. `pdftotext -layout` shifts this
 * table in TWO separate places, both caused by wrapped row labels, and the
 * naive extraction mislabels five rows: it puts religious freedom's 2010 figure
 * on the right-to-health row and hands minority rights' 1981 figure to freedom
 * of expression. Four independent prose anchors on the facing page settle the
 * true reading: footnote 136 spells out 136/175 for arbitrary arrest, and the
 * prose gives 12.3 per cent for torture, 70 per cent for religious freedom, and
 * "every country" for the death penalty.
 *
 * Countries fully honouring the right, out of those whose constitution
 * guarantees it:
 *
 *                                   1981             2010
 *   Prohibition of torture      26/83  (31.3%)   19/155 (12.3%)
 *   Freedom of expression       25/136 (18.4%)   48/180 (26.7%)
 *   Religious freedom          112/142 (78.9%)  127/179 (70.9%)
 *   Freedom of movement         82/97  (84.5%)  137/162 (84.6%)
 *   Prohibition of death penalty 14/14 (100.0%)   49/49 (100.0%)
 *
 * RECONCILED: all seventeen figures taken from the paper reproduce their
 * printed percentages from the counts, asserted in the test file. The typology
 * counts used in the deep dive are a separate check: they sum to exactly the
 * 167 constitutions the text states, and all five of their printed percentages
 * reproduce.
 *
 * NO NEW SHAPE, but the first use of `initialView.groupIds` in the deck. The
 * setup hides 2010 rather than hiding a stratum, because the question is what
 * happened to the same promise over thirty years. `strataAreSeparateSamples` is
 * ON: each right has its own denominator, since the countries promising a
 * torture ban are not the countries promising to abolish the death penalty, so
 * a pooled bar would be meaningless.
 *
 * THE REVEAL MUST CARRY THE OTHER HALF OR THE LESSON IS MERELY CYNICAL. Every
 * country that constitutionally barred the death penalty refrained from
 * executions, in all four survey years, and freedom of movement held at about
 * 85 per cent throughout. The point is not that charters are worthless. It is
 * that the charter is not the evidence, and which promise you are looking at
 * decides everything.
 *
 * NOBODY LIVING IS BEING SCORED OFF. The unit is the state, the span is 1981 to
 * 2010, the examples are the authors' own, and no party or side is named. The
 * lesson generalises to product labels, organisation names and certification
 * seals on purpose, so it cannot be read as being about one country.
 */
export const selfAppliedLabel: Puzzle = {
  schemaVersion: 1,
  id: "self-applied-label-2013",
  slug: "what-it-calls-itself",
  category: "causal-reasoning",
  reasoningSkill: "self-applied-label",
  difficulty: "medium",
  tags: ["everyday", "politics", "research"],
  supportedLocales: ["en"],

  setup: {
    headline: {
      en: "Almost every constitution on earth bans torture. That is not the same as almost nobody being tortured.",
    },
    framing: {
      en: "Two law professors took the written constitution of every country they had data for, listed which rights each one guaranteed, and then checked those same countries against independent human rights reporting to see which guarantees were kept in full. Below is the ban on torture in 1981: 83 constitutions contained one, and 26 of those countries honoured it completely. Over the next thirty years the ban spread a long way, and by 2010 it was written into 155 constitutions.",
    },
    question: {
      en: "By 2010, how many of those 155 countries were fully honouring the ban they had written down?",
    },
    data: {
      type: "rates",
      metricLabel: { en: "Fully honoured the right their constitution guarantees" },
      // Rights kept, so a higher bar is the better one.
      higherIsBetter: true,
      // Crowning a year would turn the reveal into a scoreboard. The puzzle is
      // about the gap between a promise and a practice, not about which decade
      // won.
      crownWinner: false,
      // Each right has its own denominator, because the countries promising a
      // torture ban are not the countries promising to abolish the death
      // penalty. Pooling them would count some countries repeatedly and others
      // not at all.
      strataAreSeparateSamples: true,
      groups: [
        {
          id: "y1981",
          label: { en: "As things stood in 1981" },
          short: { en: "1981" },
        },
        {
          id: "y2010",
          label: { en: "As things stood in 2010" },
          short: { en: "2010" },
        },
      ],
      strata: [
        { id: "torture", label: { en: "Constitution prohibits torture" } },
        {
          id: "expression",
          label: { en: "Constitution guarantees freedom of expression" },
        },
        {
          id: "religion",
          label: { en: "Constitution guarantees religious freedom" },
        },
        {
          id: "movement",
          label: { en: "Constitution guarantees freedom of movement" },
        },
        {
          id: "death-penalty",
          label: { en: "Constitution prohibits the death penalty" },
        },
      ],
      observations: [
        { groupId: "y1981", stratumId: "torture", numerator: 26, denominator: 83 },
        { groupId: "y2010", stratumId: "torture", numerator: 19, denominator: 155 },
        { groupId: "y1981", stratumId: "expression", numerator: 25, denominator: 136 },
        { groupId: "y2010", stratumId: "expression", numerator: 48, denominator: 180 },
        { groupId: "y1981", stratumId: "religion", numerator: 112, denominator: 142 },
        { groupId: "y2010", stratumId: "religion", numerator: 127, denominator: 179 },
        { groupId: "y1981", stratumId: "movement", numerator: 82, denominator: 97 },
        { groupId: "y2010", stratumId: "movement", numerator: 137, denominator: 162 },
        { groupId: "y1981", stratumId: "death-penalty", numerator: 14, denominator: 14 },
        { groupId: "y2010", stratumId: "death-penalty", numerator: 49, denominator: 49 },
      ],
    },
    initialView: {
      kind: "stratified",
      groupIds: ["y1981"],
      strataIds: ["torture"],
      caption: { en: "The torture ban in 1981" },
    },
  },

  choices: [
    {
      id: "more",
      label: { en: "More, and a similar share. Around 48 of them" },
      sublabel: { en: "the ban spread because the norm spread" },
      isCorrect: false,
      isIntuitiveTrap: true,
    },
    {
      id: "similar-count",
      label: { en: "About the same number as before, so roughly 26" },
      sublabel: { en: "the new signatories added promises, not practice" },
      isCorrect: false,
      isIntuitiveTrap: false,
    },
    {
      id: "fewer",
      label: { en: "Fewer than in 1981. Nineteen countries" },
      sublabel: { en: "twice the promise, less than half the share" },
      isCorrect: true,
      isIntuitiveTrap: false,
    },
    {
      // The hedge, reused verbatim from the rest of the deck so it carries no
      // lexical tell. Wrong here: the authors counted every constitution they
      // had data for and printed the counts for four separate survey years.
      id: "cannot-tell",
      label: { en: "There is no way to tell" },
      sublabel: { en: "too little to go on" },
      isCorrect: false,
      isIntuitiveTrap: false,
    },
  ],

  reveal: {
    headline: {
      en: "The ban nearly doubled its reach. The share keeping it fell by more than half.",
    },
    mechanismLabel: { en: "What was promised, and what was kept" },
    mechanismName: {
      en: "A charter is a claim the author made about itself, and it cost them nothing",
    },
    explanation: {
      en: "In 1981, 26 of the 83 countries whose constitution banned torture honoured that ban in full, about 31 per cent. By 2010 the ban was in 155 constitutions and 19 of those countries honoured it, about 12 per cent. Not 19 per cent, 19 countries. The promise spread to nearly twice as many places and the number of countries actually keeping it went down.",
    },
    body: {
      en: "Now look at the other four rights, because a puzzle that stopped here would be teaching cynicism rather than reasoning. The constitutional bar on executions was honoured by every single country that adopted one, 14 out of 14 in 1981 and 49 out of 49 in 2010, and the same held at both survey years in between. Freedom of movement sat at about 85 per cent in both years. Religious freedom ran near 71 per cent. Freedom of expression, meanwhile, was honoured by 48 of the 180 countries that guaranteed it. So constitutional promises are not uniformly worthless and they are not uniformly reliable, which is the awkward and useful finding: the same document, in the same country, is close to binding on one line and close to decorative three lines later. You cannot tell which by reading it. The authors put it more sharply still, and this is the part worth carrying: across the fifteen rights they tracked, writing a right into the constitution was mostly uncorrelated with respecting it, and for four of them, including the ban on torture, the guarantee was negatively correlated with the practice.",
    },
    view: {
      kind: "stratified",
      caption: { en: "Five promises, thirty years apart" },
    },
  },

  lesson: {
    skillName: { en: "The self-applied label" },
    takeaway: {
      en: "A name, a charter or a mission statement is a claim its owner made about itself, and making it cost them nothing. It is the cheapest possible evidence, which is exactly why the things least entitled to a virtue are often the loudest about claiming it.",
    },
    body: {
      en: "The Democratic People's Republic of Korea is not democratic, not obviously a republic, and its constitution promises freedom of speech, assembly and travel. National Socialism was not socialism; the word was there to recruit people who liked the word. This move has no single agreed name, which is part of why it keeps working, so here are the four that circle it. Charles Stevenson called it a persuasive definition in 1938: a word keeps its warm emotional charge while quietly being attached to something else, which is precisely what happens to democratic, to socialist, to patriot and to reform. The Institute for Propaganda Analysis in 1937 listed the glittering generality, a virtue word draped over a thing to win assent without evidence. Orwell's descendants call it doublespeak. And sociologists have the least colourful and most useful term: decoupling, from Meyer and Rowan in 1977, where an organisation adopts the legitimate outward form, the names and charters and committees, while its actual practice goes its own way. The constitutional study is a measurement of exactly that. What all four have in common is a reader who accepts a self-description as though someone else had verified it.",
    },
    howItWorks: {
      en: "The habit is a single question asked at the right moment: who wrote this name, and what did it cost them to write it? A label is evidence in proportion to how hard it was to obtain, so the first thing to establish is whether anyone outside the thing being labelled had to agree. Compare an organisation called the Institute for Independent Research, which requires nothing but a registration form, with a court judgment or an audited account, which requires convincing somebody with the power to say no. Second, look for the specific claim hiding inside the general one. Democratic asserts that leaders can be removed by voters, so ask when that last happened rather than arguing about the word. Third, treat an unusually emphatic label as mildly bad news rather than good, since organisations with the property rarely need to assert it in their own name and the ones without it have every reason to. Fourth, notice that this is not a political phenomenon that happens to appear elsewhere; it is a general one that politics happens to do loudly. Natural and clean and sustainable on packaging, artisan on industrial bread, and a company's own values page are all the same move. And the useful counter-question is always the same and always cheap: who checked?",
    },
    examples: [
      {
        title: { en: "Two hundred years of parchment barriers" },
        summary: {
          en: "The same study sorted the world's constitutions into four kinds by crossing what they promise against what the country does. Of the 167 constitutions in force in 2010 for which the authors had enough data, 74 promised a lot and delivered, 39 promised a lot and did not, 13 promised little and delivered little, 11 promised little and delivered more than they promised, and 30 sat exactly at the average. So about one constitution in four was, by their measure, a sham, and roughly one in fifteen quietly protected rights it had never bothered to write down. The second group is the one that makes the point cleanly, because it shows the gap runs in both directions and is therefore about the relationship between documents and practice rather than about wicked governments. The worry itself is old: the phrase parchment barriers is from the argument over the United States Bill of Rights in the 1780s, when the objection to writing rights down was precisely that a government inclined to ignore them would not be stopped by ink.",
        },
        provenance: {
          source:
            "Law DS, Versteeg M. Sham constitutions. California Law Review. 2013;101(4):863-947. Pages 885-886 for the typology counts: of 167 constitutions in force in 2010 with sufficient data, 74 (44.3 per cent) strong, 39 (23.4 per cent) sham, 13 (7.8 per cent) weak, 11 (6.6 per cent) modest, and 30 (18.0 per cent) containing exactly the average of 9 of the 15 rights. Pages 883-884 for the typology definitions and their numerical cutoffs. The five counts sum to 167 and all five printed percentages reproduce from them.",
          year: 2013,
          url: "https://comparativeconstitutionsproject.org/wp-content/uploads/2013_Sham-Constitutions_with-DL.pdf",
        },
      },
    ],
  },

  share: {
    title: { en: "The self-applied label, a reasoning trap." },
    explainer: {
      en: "In 1981, 83 constitutions banned torture and 26 of those countries honoured the ban. By 2010 the ban was in 155 constitutions, and 19 countries honoured it. Not 19 per cent, 19 countries: the promise spread to nearly twice as many places while the number keeping it fell. Yet in the same study every country that constitutionally barred the death penalty refrained from executions, 49 out of 49. A charter is a claim its author made about itself. Some are kept and some are decoration, and reading it will not tell you which.",
    },
    captions: {
      competitive: { en: "Caught it. Bet you can't." },
      selfDeprecating: { en: "I totally fell for this." },
    },
  },

  provenance: {
    source:
      "Law DS, Versteeg M. Sham constitutions. California Law Review. 2013;101(4):863-947. Table 14, page 913, proportion and percentage of countries that fully honour a constitutional guarantee, out of those whose constitution contains it. Prohibition of torture: 26/83 (31.3 per cent) in 1981, 15/99 (15.2) in 1990, 11/149 (7.4) in 2000, 19/155 (12.3) in 2010. Freedom of expression: 25/136 (18.4) in 1981 and 48/180 (26.7) in 2010. Religious freedom: 112/142 (78.9) and 127/179 (70.9). Freedom of movement: 82/97 (84.5) and 137/162 (84.6). Prohibition of the death penalty: 14/14 (100.0) and 49/49 (100.0), and 100.0 per cent in 1990 and 2000 as well. Page 912 states the compliance rate definition and reports in prose that eleven of the fifteen rights are fully respected by less than half of the countries promising them. Section V.B, pages 913-914, reports that for the majority of the fifteen rights a constitutional guarantee has been either uncorrelated or negatively correlated with respect for that right, with the negative cases being prohibitions against torture, education rights, women's economic rights and fair trial rights. Read from the open-access copy of the published article hosted by the Comparative Constitutions Project, whose page furniture carries the California Law Review volume, page and year. CrossRef holds no registered DOI for the journal version; the only registered identifier for this work is 10.2139/ssrn.1989979, which is the 2012 SSRN preprint and is not what was read here.",
    year: 2013,
    url: "https://comparativeconstitutionsproject.org/wp-content/uploads/2013_Sham-Constitutions_with-DL.pdf",
    note: {
      en: "Read from the paper, and specifically from Table 14 rendered as an image, because the automatic text extraction of that table shifts in two separate places, both caused by row labels wrapping onto a second line, and mislabels five rows. It hands religious freedom's 2010 figure to the right-to-health row and minority rights' 1981 figure to freedom of expression, so authoring from the extraction would have put the wrong number under four of the five rights this puzzle uses. Four independent anchors in the prose on the facing page settle the true reading: footnote 136 spells out 136/175 for arbitrary arrest and detention, and the body text gives 12.3 per cent for torture, 70 per cent for religious freedom, and the statement that every country with a constitutional bar on the death penalty refrained from executions. All seventeen figures taken from the paper reproduce their printed percentages from the counts, and the typology counts used in the deep dive independently sum to the stated 167. Five things a careful reader should hold against this puzzle. First, fully honour is the authors' threshold and it is strict: a country coded as an occasional violator of a guarantee counts as failing to comply, which is why compliance rates look low and why the torture figure should not be read as twelve per cent of countries being torture-free. Second, the de facto side rests on other people's human rights coding, principally the Cingranelli and Richards dataset and sources of that kind, so it inherits their judgements and their reporting bias, and reporting on rights abuses improved a great deal between 1981 and 2010, which could by itself depress the later compliance figures. That possibility is not something this deck can resolve and it is why the puzzle's reveal leans on the comparison between rights within a single year rather than only on the trend. Third, the denominators change because the number of countries with constitutions and codeable data changes, so 83 and 155 are not the same countries observed twice. Fourth, the data end in 2010 and the paper was published in 2013, so nothing here describes the present day. Fifth, and most important for what the puzzle claims: the finding is not that written rights are useless. The same table shows a constitutional bar on the death penalty honoured by every country that adopted one across all four survey years. The claim is narrower and harder to dismiss, namely that the document does not tell you which of its own promises are binding, and that a reader who treats the promise as the evidence has been given no evidence at all.",
    },
  },

  goDeeperUrl: "https://en.wikipedia.org/wiki/Persuasive_definition",
};
