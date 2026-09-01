import type { Puzzle } from "../schema.ts";

/**
 * Two official measures of violence in England and Wales, moving in opposite
 * directions on the same reality.
 *
 * Francis and Walby build an ALIGNED pair of series, which is the whole reason
 * this works as a puzzle rather than as an apples-to-oranges complaint. The
 * survey series is cut down to the incidents respondents say they reported to
 * the police, and the police series is cut down to the survey's narrower
 * definition of violence. After that alignment the two instruments are counting
 * the same events, and they still disagree about which way violence went.
 *
 * From 2013-14 to 2022-23 the police series rises 134.8 per cent while the
 * survey series falls 52.0 per cent. They cross in 2015-16. By 2022-23 the
 * police record 3.17 times what the survey finds.
 *
 * WHY THE SETUP DRAWS THE POLICE LINE. Because that is the line that gets
 * reported. It is a clean, steep, unambiguous rise, and read alone it says
 * violence more than doubled. The reveal adds the survey without touching a
 * single number in the first picture: same axis, same scale, same years.
 *
 * WHY THE HEDGE IS THE CORRECT ANSWER. One instrument cannot settle the
 * question, and the reveal is that the other instrument says the opposite. The
 * framing states plainly that the chart counts offences the police RECORDED,
 * which is the discriminator a careful player needs, and the question asks about
 * violence itself rather than about the count. See docs/hedge-audit.md.
 *
 * WHAT IS DELIBERATELY NOT CLAIMED. Not that the survey is the honest one. The
 * paper's own conclusion is that better police recording explains part of the
 * gap and the survey's exclusion of vulnerable people explains another part, and
 * the survey's response rate had fallen to 42 per cent. Neither line is the
 * truth here. That is the lesson, not a caveat on it.
 *
 * THE NUMBERS ARE THE TABLES, NOT THE PROSE. Page 18 prints 1,293,492 where
 * Table 6 prints 1,293,402, and 848,467 where Table 5 prints 848,967. The tables
 * are the data, so the tables are what is authored, and the note says so.
 */
export const reportingRate: Puzzle = {
  schemaVersion: 1,
  id: "reporting-rate-violent-crime",
  slug: "the-crime-that-doubled",
  category: "measurement",
  reasoningSkill: "reporting-rate",
  difficulty: "medium",
  tags: ["everyday", "statistics", "law", "media"],
  supportedLocales: ["en"],

  setup: {
    headline: {
      en: "Violent offences recorded by the police in England and Wales, from 2010-11 to 2022-23. The count more than doubled.",
    },
    framing: {
      en: "This is the official police figure, on one consistent definition of violence held steady across the whole period, so no change of category is doing the work. Read what it counts carefully: offences the police recorded. The question below is not about the count. It is about the violence.",
    },
    question: {
      en: "Did violence in England and Wales rise over this period?",
    },
    data: {
      type: "series",
      label: { en: "Violent offences a year, England and Wales" },
      metricLabel: {
        en: "Violent offences a year, on one aligned definition, England and Wales",
      },
      crossoverLabel: {
        en: "In 2015-16 the two official measures swap places. Before it the survey found more violence than the police recorded; after it, less, and by 2022-23 the police record more than three times what the survey finds. Both series are cut to the same narrower class of violence, and the survey one counts only incidents the respondent said were reported to the police.",
      },
      // Drawn under both beats, so it has to be true of the setup without
      // announcing that a second series exists. The alignment between the two
      // instruments belongs to the reveal, and is carried by the label above.
      statNote: {
        en: "Francis and Walby 2025, Tables 5 and 6, aligned totals. Annual counts on one definition of violence held constant across the period. Years are the ones the paper tabulates.",
      },
      lines: [
        {
          id: "survey",
          label: { en: "The Crime Survey for England and Wales" },
          short: { en: "Crime survey" },
        },
        {
          id: "police",
          label: { en: "Police recorded crime" },
          short: { en: "Police records" },
        },
      ],
      points: [
        { id: "y2010", label: { en: "2010-11" } },
        { id: "y2013", label: { en: "2013-14" } },
        { id: "y2015", label: { en: "2015-16" } },
        { id: "y2017", label: { en: "2017-18" } },
        { id: "y2019", label: { en: "2019-20" } },
        { id: "y2022", label: { en: "2022-23" } },
      ],
      observations: [
        { lineId: "survey", pointId: "y2010", count: 872361 },
        { lineId: "survey", pointId: "y2013", count: 848967 },
        { lineId: "survey", pointId: "y2015", count: 776001 },
        { lineId: "survey", pointId: "y2017", count: 561724 },
        { lineId: "survey", pointId: "y2019", count: 575933 },
        { lineId: "survey", pointId: "y2022", count: 407806 },
        { lineId: "police", pointId: "y2010", count: 576484 },
        { lineId: "police", pointId: "y2013", count: 550850 },
        { lineId: "police", pointId: "y2015", count: 794937 },
        { lineId: "police", pointId: "y2017", count: 1044306 },
        { lineId: "police", pointId: "y2019", count: 1190845 },
        { lineId: "police", pointId: "y2022", count: 1293402 },
      ],
    },
    initialView: { kind: "oneinstrument", groupIds: ["police"] },
  },

  choices: [
    {
      // What the drawn line says, and what a headline built on it would say.
      // Wrong, because the line counts records rather than events.
      id: "doubled",
      label: { en: "Yes, it more than doubled" },
      sublabel: { en: "the count went from 576,484 to 1,293,402" },
      isCorrect: false,
      isIntuitiveTrap: true,
    },
    {
      // The other instrument's answer, and equally unavailable from one line.
      // A player cannot know this from the setup, so it cannot be correct here.
      id: "fell",
      label: { en: "No, violence fell over the same years" },
      sublabel: { en: "the recorded count went the wrong way" },
      isCorrect: false,
      isIntuitiveTrap: false,
    },
    {
      // The sophisticated distractor: the right suspicion, stated as a fact the
      // chart cannot establish and the paper does not support on its own.
      id: "recording",
      label: { en: "It rose, but only because recording improved" },
      sublabel: { en: "the police got better at logging it" },
      isCorrect: false,
      isIntuitiveTrap: false,
    },
    {
      // The hedge, and here it is right. One instrument counts records, not
      // events, and nothing in the setup says how the two relate.
      id: "cannot-tell",
      label: { en: "There is no way to tell from this" },
      sublabel: { en: "a record is not an event" },
      isCorrect: true,
      isIntuitiveTrap: false,
    },
  ],

  reveal: {
    headline: {
      en: "The other official measure of the same violence fell by half.",
    },
    mechanismLabel: { en: "Both instruments, same axis" },
    mechanismName: { en: "The count moved because reporting moved" },
    explanation: {
      en: "Nothing in the first picture changed. The survey line is simply drawn on top of it, on the same scale and the same years. From 2013-14 to 2022-23 the police series rises 134.8 per cent while the survey series falls 52.0 per cent, and they cross in 2015-16. Before that year the survey found more violence than the police recorded, which is what you expect when most of it never reaches a police station. After it, the police record more than the survey finds at all, and by 2022-23 more than three times more. Both series have been cut to the same definition of violence and the survey series counts only incidents the respondent says were reported, so this is not two measures of two different things.",
    },
    body: {
      en: "A recorded crime figure is the product of two things: how much happens, and how much of it reaches a record. Reporting rates and recording practice both changed sharply over this period, after inspectors found forces were failing to record offences that were reported to them. So the police series can climb while the underlying violence falls, and neither line is lying. Note what this does not say. It does not say the survey is the honest one. The survey misses people in institutions, misses those too frightened or too repeatedly victimised to answer, and its response rate had fallen to 42 per cent. The authors' conclusion is that better recording explains part of the divergence and the survey's blind spots explain another part. There is no clean number underneath. The point is not that the police figure is wrong; the point is that one instrument reading alone could never have told you which way violence went.",
    },
    view: { kind: "bothinstruments" },
  },

  lesson: {
    skillName: { en: "Counting reports is not counting events" },
    takeaway: {
      en: "Any official count of a hidden thing measures reporting as much as it measures the thing. When the count moves, ask first whether what changed was the world or the willingness and ability to record it, and never settle the question with one instrument when a second one exists.",
    },
    body: {
      en: "This is one of the most common ways a true number produces a false belief. Crime, side effects, harassment, near misses in a hospital, faults on a factory line: all of them are counted only when somebody reports them and somebody else writes them down. Both of those steps are human, both respond to campaigns and rules and scandals, and both can change far faster than the underlying rate. A campaign that makes people more willing to come forward will show up as a wave of new cases, and it looks exactly like a wave of new cases.",
    },
    howItWorks: {
      en: "Write the count as three factors: how many events happen, what fraction of them are reported, and what fraction of the reports are recorded. Only the first is the thing you care about, and the other two are usually the ones that moved. That is why a recorded figure is best read as a lower bound with a moving floor rather than as a measurement. The practical defence is to look for a second instrument built on a different mechanism. A population survey does not depend on anyone deciding to call the police, so where a survey and an administrative count disagree, the disagreement itself is the information: it locates the change in the reporting chain rather than in the world. Two warnings come with that. First, the second instrument has its own blind spots, and here the survey's are severe, so a crossover tells you the two measures cannot both be describing events without telling you which is closer. Second, watch for the reverse case, where a count falls because reporting collapsed, which is the same error wearing a reassuring face and is much less likely to make the news.",
    },
    examples: [
      {
        title: { en: "The inspection that changed the count" },
        summary: {
          en: "Her Majesty's Inspectorate of Constabulary examined how forces in England and Wales recorded the crimes reported to them and found that a large share of reported offences were not being recorded at all, with violence against the person among the worst affected categories. The forces were told to fix it. What follows in the recorded series is a rise, and part of that rise is the fix rather than the crime, which is exactly why the recorded figures for this period lost their designation as national statistics.",
        },
        provenance: {
          source:
            "Her Majesty's Inspectorate of Constabulary. Crime-recording: making the victim count. The final report of an inspection of crime data integrity in police forces in England and Wales",
          year: 2014,
          url: "https://hmicfrs.justiceinspectorates.gov.uk/publications/crime-recording-making-the-victim-count/",
        },
      },
    ],
  },

  share: {
    title: { en: "Counting reports is not counting events, a reasoning trap." },
    explainer: {
      en: "Police recorded violence in England and Wales rose 134.8 per cent from 2013-14 to 2022-23. On the same aligned definition, the national crime survey found violence falling 52.0 per cent over the very same years, and the two measures crossed in 2015-16. Both are official, both count the same class of offence, and neither is lying. A recorded count measures how much happens multiplied by how much gets reported and written down, and over this period what changed most was the recording. Before believing any official count of a hidden thing, ask what a second instrument says.",
    },
    captions: {
      competitive: {
        en: "Violence more than doubled. Violence fell by half. Same country, same years.",
      },
      selfDeprecating: {
        en: "I read one line off a chart and thought I knew which way the country was going.",
      },
    },
  },

  provenance: {
    source:
      "Francis BJ, Walby S. Conflicting trends in violent crime measured by police recorded crime and the crime survey in England and Wales since 2010. PLoS One 2025;20(6):e0324272",
    year: 2025,
    doi: "10.1371/journal.pone.0324272",
    url: "https://journals.plos.org/plosone/article?id=10.1371/journal.pone.0324272",
    note: {
      en: "Every count drawn here is read off the paper's own tables: the survey series from Table 5 and the police series from Table 6, both of them the aligned totals rather than the headline ones. The alignment is the paper's contribution and it is what makes the comparison fair. The police series is restricted to the narrower class of violence the survey covers, and the survey series is restricted to incidents the respondent said were reported to the police, so the two instruments are counting the same events. Nothing is derived from an abstract or a figure. The percentage changes quoted in this puzzle, 134.8 per cent up and 52.0 per cent down between 2013-14 and 2022-23, and the ratio of 3.17 in 2022-23, are recomputed from those printed counts rather than copied from the text; the paper states them as 134 per cent and a fall of just over half. One discrepancy is recorded rather than smoothed over: the prose gives 1,293,492 for the last police figure where Table 6 gives 1,293,402, and 848,467 for the 2013-14 survey figure where Table 5 gives 848,967, differences of 90 and 500. The tables are the data, so the tables are what is authored, and neither reading changes any claim made here. Three things are deliberately not claimed. Nothing here says the survey is the true measure: its response rate had fallen to 42 per cent by the end of the period, and it does not cover people in institutions or reach the most repeatedly victimised, which the authors treat as a serious limitation. Nothing here attributes the divergence wholly to police recording, since the paper's conclusion divides it between improved recording and the survey's coverage gaps. And no year is drawn that the paper does not tabulate, which is why the axis skips the years it skips.",
    },
  },

  goDeeperUrl:
    "https://journals.plos.org/plosone/article?id=10.1371/journal.pone.0324272",
};
