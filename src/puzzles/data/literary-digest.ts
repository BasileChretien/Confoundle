import type { Puzzle } from "../schema.ts";

/**
 * Puzzle #30, self-selection, on the Literary Digest poll of 1936.
 *
 * Two sources, both read at source, and every number below is exact.
 *
 * The magazine's own final count, printed 31 October 1936 and quoted in Squire:
 *
 *   Landon    1,293,669
 *   Roosevelt   972,897
 *   Lemke        83,610
 *   total     2,350,176   against "more than 10 million" ballots mailed
 *
 * The official return, Statistics of the Congressional Election of November 3,
 * 1936 (Clerk of the House), national recapitulation on pp. 42 to 43:
 *
 *   Roosevelt 27,476,673
 *   Landon    16,679,583
 *   total     45,646,817   including minor parties
 *
 * RECONCILED TWO WAYS ON EACH SIDE. The Digest's three counts sum to 2,350,176
 * and each printed percentage recomputes from it; 2,350,176 of 10 million is
 * 23.5%, matching Squire's "less than a 25% participation rate". On the official
 * side the six party columns sum to the printed grand total to the vote, and
 * Landon's 36.54% independently matches the 37% Squire quotes from elsewhere.
 *
 * WHY THIS CASE. The deck has `survivorship` and `publication-bias` as cousins
 * but nothing where the RESPONDENTS CHOSE THEMSELVES, which the AP US Government
 * framework names as a required limitation under "opt-in polling". And the
 * reveal is the deck's shape in its purest form: the enormous number is the
 * problem rather than the reassurance.
 *
 * NO NEW SHAPE. `rates` with `strataAreSeparateSamples` set. The returned
 * ballots and the election are two separate countings, not two parts of one
 * population, so pooling them would be meaningless and the flag stops the engine
 * offering it. The setup draws the ballots alone, which reads as a comfortable
 * Landon lead on an unprecedented sample; the reveal adds the election and the
 * winner has swapped.
 *
 * WHY THE HEDGE IS WRONG. The framing supplies both defects explicitly: the
 * names came from car registrations and telephone books, and only about a
 * quarter of the ballots came back. Both push the same way, so a reader who
 * takes them seriously can reject "much as the ballots said" and "narrowly". The
 * exact size of the swing does not follow and the reveal supplies it.
 *
 * WHAT THIS MUST NOT BECOME. The folk version, that the magazine polled only
 * rich car owners, is what most textbooks say and Squire's evidence contradicts
 * it. Respondents owning both a car and a telephone still backed Roosevelt, and
 * everyone who RECEIVED a ballot backed Roosevelt: the sample would have called
 * the winner. It was who bothered to reply that lost it. The lesson beat carries
 * that correction, because teaching the famous explanation would be teaching
 * something false.
 */
export const literaryDigest: Puzzle = {
  schemaVersion: 1,
  id: "literary-digest-1936",
  slug: "the-biggest-poll-ever-taken",
  category: "statistical-reasoning",
  reasoningSkill: "self-selection",
  difficulty: "medium",
  tags: ["everyday", "history", "politics"],
  supportedLocales: ["en"],

  setup: {
    headline: {
      en: "The largest opinion poll anyone had ever run said the challenger would win comfortably.",
    },
    framing: {
      en: "The United States, 1936. A magazine called the Literary Digest had forecast the winner of every presidential election since 1920, once to within a single point, and this time it went bigger than ever. It posted more than ten million ballots to names taken mainly from automobile registration lists and telephone books. About a quarter came back, 2,350,176 of them, which was still more people than any survey had ever reached. The magazine said the returns were not weighted, adjusted, nor interpreted, and printed them as they stood.",
    },
    question: {
      en: "What happened on election day?",
    },
    data: {
      type: "rates",
      metricLabel: { en: "Share of the vote" },
      higherIsBetter: true,
      // The returned ballots and the election are two separate countings, not
      // two parts of one population, so an "overall" bar across them would be
      // meaningless. The flag stops the engine offering one.
      strataAreSeparateSamples: true,
      groups: [
        {
          id: "landon",
          label: { en: "Landon, who led the magazine's ballots" },
          short: { en: "Landon" },
        },
        {
          id: "roosevelt",
          label: { en: "Roosevelt, the sitting president" },
          short: { en: "Roosevelt" },
        },
      ],
      strata: [
        { id: "ballots", label: { en: "Ballots returned to the magazine" } },
        { id: "election", label: { en: "Votes cast on election day" } },
      ],
      observations: [
        { groupId: "landon", stratumId: "ballots", numerator: 1293669, denominator: 2350176 },
        { groupId: "roosevelt", stratumId: "ballots", numerator: 972897, denominator: 2350176 },
        { groupId: "landon", stratumId: "election", numerator: 16679583, denominator: 45646817 },
        { groupId: "roosevelt", stratumId: "election", numerator: 27476673, denominator: 45646817 },
      ],
    },
    initialView: {
      kind: "stratified",
      strataIds: ["ballots"],
      caption: { en: "Two and a third million ballots, and nothing else yet" },
    },
  },

  choices: [
    {
      id: "landon-won",
      label: { en: "Landon won, much as the ballots said" },
      sublabel: { en: "two million replies is a great many replies" },
      isCorrect: false,
      isIntuitiveTrap: true,
    },
    {
      id: "roosevelt-narrow",
      label: { en: "Roosevelt won, but narrowly" },
      sublabel: { en: "a sample that big cannot be far out" },
      isCorrect: false,
      isIntuitiveTrap: false,
    },
    {
      id: "roosevelt-landslide",
      label: { en: "Roosevelt won comfortably" },
      sublabel: { en: "ask who owns a car, then ask who posts a reply" },
      isCorrect: true,
      isIntuitiveTrap: false,
    },
    {
      // The hedge. Offered in nearly every puzzle so that picking it is a
      // judgement rather than a tell, and wrong here: the framing names both
      // defects, the mailing list and the quarter that replied.
      id: "cannot-tell",
      label: { en: "There is no way to tell" },
      sublabel: { en: "too little to go on" },
      isCorrect: false,
      isIntuitiveTrap: false,
    },
  ],

  reveal: {
    headline: {
      en: "Roosevelt took 46 of the 48 states. The poll had him losing by fourteen points.",
    },
    mechanismLabel: { en: "What the returns were made of" },
    mechanismName: {
      en: "The people who answer are not the people you asked",
    },
    explanation: {
      en: "The magazine's ballots gave Landon 1,293,669 against Roosevelt's 972,897, a lead of fourteen points on the largest sample ever gathered. The country gave Roosevelt 27,476,673 against Landon's 16,679,583. The poll did not merely miss the margin, it named the wrong winner, and the error runs to more than thirty points. The magazine folded in 1938.",
    },
    body: {
      en: "Nothing was miscounted, and the sample was not too small. It was too self-selected. More than ten million ballots went out and only about a quarter came back, and the people who chose to post one back were not a miniature of the people who received one. A larger pile of returns does not fix that, because every extra ballot arrives by the same self-selecting route as the last. This is why a modern poll of a thousand people, chosen rather than volunteering, beats a website survey with a hundred thousand responses. The number that matters is not how many answered. It is who was left out, and whether their absence was random.",
    },
    view: {
      kind: "stratified",
      caption: { en: "The magazine's returns, and the election itself" },
    },
  },

  lesson: {
    skillName: { en: "Self-selection" },
    takeaway: {
      en: "When people decide for themselves whether to be counted, the size of the sample stops protecting you. A bigger pile of volunteers is still a pile of volunteers, and no amount of it tells you about the people who stayed silent.",
    },
    body: {
      en: "The explanation almost everyone gives for this failure is that the magazine drew its names from car registrations and telephone books and so missed the poor, who were Roosevelt's people. That explanation is the famous one and it is not what the evidence shows. Squire tested it against a Gallup survey from 1937 that asked people whether they had received a Literary Digest ballot and whether they had sent it back. Respondents who owned both a car and a telephone still backed Roosevelt, by 55 to 45. More decisively, everyone who reported receiving a ballot backed Roosevelt by 55 to 44. The mailing list would have called the winner correctly. Only among the people who actually returned a ballot does Landon lead, by 51 to 48. The list was skewed and it mattered, but the thing that reversed the result was who replied.",
    },
    howItWorks: {
      en: "The formal name for the second failure is non-response bias, and the useful thing about this case is that the two failures can be separated and measured. Squire's decomposition runs 66 to 55 to 48. The Gallup survey put Roosevelt's support at 66 per cent overall; among people sent a Digest ballot it was 55 per cent; among people who returned one it was 48. The first drop, of about eleven points, is the mailing list. The second, of about seven points, is who chose to reply. Both are real and the second is the one nobody talks about. Why should replying correlate with how you vote? Because posting a ballot back is an act of enthusiasm, and in 1936 the people most eager to register an opinion were the ones who wanted a change. A sample can be flawless and still fail this way. That is the part worth carrying: randomising who you approach does nothing about who agrees to answer, and the two problems need separate fixes. Serious surveys therefore report their response rate, chase non-responders, and weight for the ones they cannot reach, and a survey that reports none of these has not told you whether it has this problem. The everyday version is easy to spot once you know the shape. Online polls, reviews on a product page, phone-ins, petitions, satisfaction cards left on a table: in all of them the respondent volunteered. So the question to ask is never how many answered. It is what would make somebody bother, and whether that reason has anything to do with the thing being measured. If it does, the sample size is decoration.",
    },
    examples: [
      {
        title: { en: "The two totals for the same election" },
        summary: {
          en: "A small illustration of how a number becomes contested. The official return of the Clerk of the House gives Roosevelt 27,476,673 votes, which is 60.19 per cent of the 45,646,817 cast. Almost every later compilation gives him about 27,751,841, or 60.8 per cent. Neither is wrong. The difference is New York, where Roosevelt also stood on the ticket of the American Labor Party, founded that year so that voters could support him without voting Democratic. The official return lists those 274,924 votes in a separate column; the compilations add them to his total. Two defensible national figures for one election, a quarter of a million votes apart, and the gap is not an error in anyone's arithmetic but a decision about what counts as a vote for a candidate. It is worth knowing that such decisions exist before quoting any total to the last digit.",
        },
        provenance: {
          source:
            "Statistics of the Congressional Election of November 3, 1936. Compiled from official sources by Leroy D. Brandon under the direction of South Trimble, Clerk of the House of Representatives; corrected to December 18, 1936. National recapitulation, Popular vote for President and Vice President, pp. 42-43. The New York row lists 274,924 votes in the Other column.",
          year: 1936,
          url: "https://history.house.gov/Institution/Election-Statistics/1936election/",
        },
      },
    ],
  },

  share: {
    title: { en: "Self-selection, a reasoning trap." },
    explainer: {
      en: "In 1936 a magazine posted more than ten million ballots and got 2,350,176 back, the largest poll ever taken. It said Landon would beat Roosevelt by fourteen points. Roosevelt won by more than twenty. The sample was not too small, it was self-selected: only about a quarter replied, and people who bother to reply are not a miniature of everybody. A modern poll of a thousand chosen people beats a website survey with a hundred thousand volunteers. The number to ask about is never how many answered. It is what would make somebody bother.",
    },
    captions: {
      competitive: { en: "Caught it. Bet you can't." },
      selfDeprecating: { en: "I totally fell for this." },
    },
  },

  provenance: {
    source:
      "Squire P. Why the 1936 Literary Digest poll failed. Public Opinion Quarterly. 1988;52(1):125-133. The magazine's final count, quoted there from the Literary Digest of 31 October 1936, pp. 5-6: Landon 1,293,669, Roosevelt 972,897, Lemke 83,610, from more than 10 million ballots mailed. Election figures from Statistics of the Congressional Election of November 3, 1936 (Clerk of the House), pp. 42-43: Roosevelt 27,476,673, Landon 16,679,583, of 45,646,817 cast.",
    year: 1988,
    doi: "10.1086/269085",
    url: "https://academic.oup.com/poq/article-abstract/52/1/125/1817110",
    note: {
      en: "Both sides reconcile two ways. The magazine's three counts sum to 2,350,176 and each of its printed percentages recomputes from that total, while 2,350,176 against more than ten million mailed gives 23.5 per cent, matching Squire's less than 25 per cent participation. On the official side the six party columns sum to the printed grand total of 45,646,817 to the vote, and Landon's resulting 36.54 per cent independently matches the 37 per cent Squire quotes from a different source. Three things a careful reader should know. First, the official return gives Roosevelt 60.19 per cent while most books give 60.8; the difference is his New York votes on the American Labor Party line, which the official return lists separately, and the deep dive explains it. Second, Squire's evidence rests on a Gallup survey from May 1937, whose quota sample was itself imperfect, which overstates the winner's vote by about five points, and which asks people to recall six months later whether they returned a ballot; Squire argues that the overstatement would if anything favour Roosevelt and so cannot rescue the mailing-list explanation. Third, his tables do not quite nest: the returned and not-returned cells total 829 respondents while the table of those who received a ballot gives 780, a difference of 49 that he does not comment on and that is most likely item non-response, so the two should not be quoted as though one is a subset of the other.",
    },
  },

  goDeeperUrl: "https://en.wikipedia.org/wiki/The_Literary_Digest#1936_presidential_election",
};
