import { z } from "zod";
import { LocalizedText } from "./schema";

/**
 * Trap Hunt items: short, neutral scenarios used to test whether a player can
 * DETECT a reasoning trap when nobody has told them one is there.
 *
 * Two rules keep this a real test rather than a bias-naming quiz:
 *  1. Some items are genuinely sound (`trap: null`). Without them, players learn
 *     that the answer is always "trap" and the score means nothing.
 *  2. The wording must not telegraph the flaw the way a teaching puzzle does.
 *
 * These are deliberately hypothetical scenarios, not claims about the world, so
 * they carry no provenance. Anything asserting a real finding belongs in a
 * puzzle (which does require provenance), not here.
 */
export const TestItem = z.object({
  id: z.string().min(1),
  scenario: LocalizedText,
  /** null = the reasoning is sound; otherwise the reasoningSkill it trips on. */
  trap: z.string().nullable(),
  explanation: LocalizedText,
});
export type TestItem = z.infer<typeof TestItem>;

const items: TestItem[] = [
  // ---- Simpson's paradox ----
  {
    id: "sp-schools",
    scenario: {
      en: "Two schools publish exam results. School B has the higher pass rate overall, 75% against 70%. When results are split by student background, School A comes out ahead in every single group. The district praises School B.",
    },
    trap: "simpsons-paradox",
    explanation: {
      en: "A wins in every group but loses overall, which happens when the groups are mixed unevenly. The pooled number is the misleading one here.",
    },
  },
  {
    id: "sp-factory",
    scenario: {
      en: "A factory reports its new process has a lower defect rate than the old one, 3% against 4%. Looking at simple parts and complex parts separately, the old process had fewer defects in both.",
    },
    trap: "simpsons-paradox",
    explanation: {
      en: "Better in both categories yet worse overall means the two processes handled very different mixes of simple and complex parts.",
    },
  },

  // ---- Base-rate fallacy ----
  {
    id: "br-screening",
    scenario: {
      en: "A condition affects about 1 in 2,000 people. A screening test is 99% accurate. A patient tests positive and is told they almost certainly have the condition.",
    },
    trap: "base-rate-fallacy",
    explanation: {
      en: "With a condition this rare, the 1% error rate produces far more false positives than there are real cases, so a positive is still more likely to be a false alarm.",
    },
  },
  {
    id: "br-security",
    scenario: {
      en: "A system flags travellers as suspicious and is 95% accurate. About 1 in 1,000 travellers is actually a threat. An official states that a flagged traveller is 95% likely to be a threat.",
    },
    trap: "base-rate-fallacy",
    explanation: {
      en: "That confuses the test's accuracy with the odds after a flag. Because threats are rare, the overwhelming majority of flags are ordinary travellers.",
    },
  },

  // ---- Correlation is not causation ----
  {
    id: "cc-parks",
    scenario: {
      en: "Neighbourhoods with more parks have lower obesity rates. A council report concludes that building parks will reduce obesity, and proposes a park-building programme.",
    },
    trap: "correlation-not-causation",
    explanation: {
      en: "Wealth and urban planning plausibly drive both park provision and health, so the link may not be the parks doing the work.",
    },
  },
  {
    id: "cc-library",
    scenario: {
      en: "Students who visit the library more often get higher grades. A university announces mandatory weekly library visits to raise grades.",
    },
    trap: "correlation-not-causation",
    explanation: {
      en: "Motivated students both study more and visit the library. Forcing the visit does not import the motivation that produced the grades.",
    },
  },

  // ---- Survivorship bias ----
  {
    id: "sv-companies",
    scenario: {
      en: "A business book studies companies that have thrived for fifty years and finds nearly all had bold, risk-taking leaders. It concludes that bold leadership causes lasting success.",
    },
    trap: "survivorship-bias",
    explanation: {
      en: "The bold companies that went under are not in the sample. Boldness may equally well cause spectacular failure, which the study cannot see.",
    },
  },
  {
    id: "sv-rehab",
    scenario: {
      en: "A clinic reviews patients who completed its demanding rehabilitation programme and finds excellent outcomes. It reports the programme as highly effective.",
    },
    trap: "survivorship-bias",
    explanation: {
      en: "Patients who dropped out are excluded, and they are likely the ones doing worst. Counting only finishers flatters the programme.",
    },
  },

  // ---- Prosecutor's fallacy ----
  {
    id: "pf-dna",
    scenario: {
      en: "A database search turns up one man whose DNA matches a crime-scene sample. The lab reports that the profile occurs in about 1 person in a million. The prosecutor tells the jury there is therefore about a one in a million chance that he is innocent.",
    },
    trap: "prosecutors-fallacy",
    explanation: {
      en: "The 1 in a million is the chance of a match if he is innocent, not the chance he is innocent given a match. In a large pool other people match too, so the two numbers are nowhere near the same.",
    },
  },
  {
    id: "pf-fibres",
    scenario: {
      en: "Fibres on a suspect's coat match the victim's carpet. An expert says only about 1 coat in 5,000 would carry such fibres. Counsel concludes the suspect is 4,999 times more likely to be guilty than innocent.",
    },
    trap: "prosecutors-fallacy",
    explanation: {
      en: "A rarity figure describes the evidence, not the person. How many innocent people could have picked up those fibres depends on how many people were ever near that carpet.",
    },
  },

  // ---- Will Rogers phenomenon ----
  {
    id: "wr-scanner",
    scenario: {
      en: "A hospital installs a more sensitive scanner. Over the next two years it reports that survival improved in every severity grade of the disease, from the mildest to the most advanced, and concludes that its care has got better.",
    },
    trap: "will-rogers-phenomenon",
    explanation: {
      en: "A sharper scanner regrades patients. Those moved out of a mild grade were its sickest, and they arrive in a severe grade as its healthiest, so both averages rise without anyone doing better.",
    },
  },
  {
    id: "wr-streaming",
    scenario: {
      en: "A school adopts a placement test that is much better at identifying struggling pupils, and uses it to sort them into a top and a bottom stream. The next year, average results rise in both streams. The head teacher credits the new teaching methods.",
    },
    trap: "will-rogers-phenomenon",
    explanation: {
      en: "The pupils reclassified out of the top stream were its weakest and become the strongest of the bottom stream, so both averages climb on reshuffling alone.",
    },
  },

  // ---- Lead-time bias ----
  {
    id: "lt-bloodtest",
    scenario: {
      en: "A hospital introduces a blood test that picks up a cancer about two years before symptoms would have appeared. Among patients diagnosed there, five-year survival rises from 41% to 68%. The hospital announces that the test is saving lives.",
    },
    trap: "lead-time-bias",
    explanation: {
      en: "Survival is counted from diagnosis, and the diagnosis now happens two years sooner. Everyone gets a two-year head start towards the five-year mark, whether or not the test changed anyone's outcome.",
    },
  },
  {
    id: "lt-registry",
    scenario: {
      en: "A national registry reports that the average time between diagnosis and death for a disease has risen from three years to six since a new scan came into routine use. A minister says patients now live twice as long.",
    },
    trap: "lead-time-bias",
    explanation: {
      en: "Time from diagnosis to death can double purely because the diagnosis moved earlier. To claim people live longer you have to show that death is arriving later, not that the label is arriving sooner.",
    },
  },

  // ---- Spectrum bias ----
  {
    id: "sb-donors",
    scenario: {
      en: "A rapid test is validated on patients admitted to hospital with severe disease and on healthy blood donors. It separates the two groups almost perfectly, and the maker reports 98% sensitivity. It is then sold to family doctors for patients with a mild cough.",
    },
    trap: "spectrum-bias",
    explanation: {
      en: "Telling the obviously ill from the obviously well is the easiest task there is. A family doctor's patients are all somewhere in between, and that is precisely where the test has never been measured.",
    },
  },
  {
    id: "sb-faulty",
    scenario: {
      en: "A textbook lists a scan as 90% sensitive. A clinic that sees mostly early, mild cases adopts it and finds it misses about a third of the cases later confirmed by specialists. The clinic concludes its machine must be faulty.",
    },
    trap: "spectrum-bias",
    explanation: {
      en: "A quoted sensitivity comes attached to the patients it was measured on. Earlier and milder disease gives a test less to find, so a lower catch rate is what you should expect, not evidence of a broken machine.",
    },
  },

  // ---- Berkson's bias ----
  {
    id: "bk-inpatients",
    scenario: {
      en: "A study of one hospital's inpatients finds that those with a metabolic disease are far more likely to also have a gallbladder disease than the other inpatients. The authors conclude that the first disease brings on the second.",
    },
    trap: "berksons-bias",
    explanation: {
      en: "Either illness on its own can put someone in a hospital bed, so patients with both are over-represented among inpatients. The link may exist only inside the building.",
    },
  },
  {
    id: "bk-dating",
    scenario: {
      en: "Someone notices that among the people they have dated, the better looking ones were consistently less pleasant company. They conclude that good looks spoil the character.",
    },
    trap: "berksons-bias",
    explanation: {
      en: "People generally agree to a date because someone is good looking or because they are pleasant company. Selecting on that forces a trade-off between the two inside the sample, whatever the relationship is outside it.",
    },
  },

  // ---- Relative versus absolute risk ----
  {
    id: "ra-halves",
    scenario: {
      en: "A press release says a new drug halves the risk of a rare complication. It does not say how common the complication is. A newspaper runs the story under the headline that the drug halves the danger.",
    },
    trap: "relative-vs-absolute-risk",
    explanation: {
      en: "Halving a risk means nothing until you know the risk. If the complication strikes 2 people in 10,000, halving it spares one of them.",
    },
  },
  {
    id: "ra-supplement",
    scenario: {
      en: "A supplement is advertised as cutting the chance of a particular cancer by 40%. The trial it rests on found 7 cases among about 1,000 people taking the supplement and 12 among about 1,000 taking a dummy.",
    },
    trap: "relative-vs-absolute-risk",
    explanation: {
      en: "The 40% is arithmetically right and it amounts to 5 people in 1,000. Around 200 people would have to take the supplement for years for one of them to avoid a cancer.",
    },
  },

  // ---- Publication bias ----
  {
    id: "pb-review",
    scenario: {
      en: "A review gathers every published trial of a treatment it can find. Eleven of the thirteen are positive, and it concludes the treatment works. The review does not say how many trials of the treatment were ever started.",
    },
    trap: "publication-bias",
    explanation: {
      en: "Searching the literature finds the studies that reached print, not the studies that were run. Without knowing how many were started, there is no way to tell whether two disappointing trials is the whole story or the visible corner of it.",
    },
  },
  {
    id: "pb-drawer",
    scenario: {
      en: "A researcher runs a study that finds nothing, decides it is not interesting enough to write up, and moves on to the next project. Several colleagues in the same field do the same thing that year.",
    },
    trap: "publication-bias",
    explanation: {
      en: "Nobody here has done anything dishonest, and that is exactly the point. The filter is made of ordinary decisions about what is worth the effort, and it still leaves the published record systematically sunnier than the research was.",
    },
  },

  // ---- Length-time bias ----
  {
    id: "lt2-prostate",
    scenario: {
      en: "A clinic reports that men whose cancer was picked up by its regular screening programme are far more likely to still be alive ten years on than men who came in with symptoms. It concludes that screening works.",
    },
    trap: "length-time-bias",
    explanation: {
      en: "A test run at intervals catches slow tumours easily and fast ones hardly at all, because fast ones surface between visits. So the screen-detected group is loaded with the gentle kind of disease before treatment is even considered.",
    },
  },
  {
    id: "lt2-indolent",
    scenario: {
      en: "A new scan finds three times as many cases of a cancer as were previously diagnosed in the same population, and the people it finds do very well. Deaths from that cancer in the population are unchanged.",
    },
    trap: "length-time-bias",
    explanation: {
      en: "More cases found, the same number of deaths, and excellent outcomes among the extra cases is the signature of finding disease that was never going to cause harm. The survival figures improve because the denominator filled up with people who were never in danger.",
    },
  },

  // ---- Confounding by indication ----
  {
    id: "ci-oxygen",
    scenario: {
      en: "A hospital reviews its records and finds that patients who were given a particular breathing support died far more often than patients who were not. A committee recommends using it less.",
    },
    trap: "confounding-by-indication",
    explanation: {
      en: "The support was given to the patients who were struggling to breathe. It is standing in for how ill they already were, and the records cannot separate the treatment from the reason it was reached for.",
    },
  },
  {
    id: "ci-adjusted",
    scenario: {
      en: "An observational study finds higher mortality among patients on a drug. The authors adjust for age, sex, blood pressure and twelve laboratory values, the excess shrinks a little but remains, and they conclude the drug is harmful.",
    },
    trap: "confounding-by-indication",
    explanation: {
      en: "Adjustment can only remove what was recorded. The clinician's sense that this patient was deteriorating is exactly why the drug was prescribed, and it is not among the twelve laboratory values.",
    },
  },

  // ---- Intention to treat ----
  {
    id: "itt-completers",
    scenario: {
      en: "A weight-loss trial randomly assigns 400 people to a programme or to usual care. It reports the average weight lost among the 180 programme participants who attended at least eight sessions, and among all 200 controls. The programme wins comfortably.",
    },
    trap: "intention-to-treat",
    explanation: {
      en: "One arm has been filtered and the other has not. Attending eight sessions is something people who were doing well were more able to do, so the programme group has quietly been reduced to its successes while the control group keeps everybody.",
    },
  },
  {
    id: "itt-crossover",
    scenario: {
      en: "In a surgical trial, some patients assigned to medication deteriorate and are operated on anyway. The analysis counts each patient under the treatment they ended up receiving, and finds surgery ahead.",
    },
    trap: "intention-to-treat",
    explanation: {
      en: "Switching happened after the coin flip and for a reason: those patients had to survive long enough to reach the operating table. Counting people by what they received rather than what they were assigned sorts them by how they were doing, which is the thing being measured.",
    },
  },
  {
    id: "itt-nonadherent",
    scenario: {
      en: "A trial of a daily tablet excludes anyone who took less than 80 percent of their doses, on the grounds that the question is whether the drug works when actually taken. Both arms are filtered the same way.",
    },
    trap: "intention-to-treat",
    explanation: {
      en: "Filtering both arms identically does not repair it. Who manages to take 80 percent of their tablets differs by how well they are and by much else besides, so each arm loses a different kind of patient and the groups the coin made no longer exist.",
    },
  },
  {
    id: "itt-withdrew-early",
    scenario: {
      en: "A trial reports that among patients who completed the full twelve months, the new drug halved relapses. A quarter of that arm withdrew before twelve months and are not counted.",
    },
    trap: "intention-to-treat",
    explanation: {
      en: "People usually withdraw for a reason, and relapsing is one of the commonest. An analysis of completers can turn the drug's failures into people who simply are not in the table.",
    },
  },

  // ---- Recall bias ----
  {
    id: "rb-birth-defect",
    scenario: {
      en: "Mothers of babies born with a heart defect are interviewed about what they took during pregnancy, alongside mothers of healthy babies. The mothers of affected babies report far more medicine use in the first trimester, and a report concludes the medicines are implicated.",
    },
    trap: "recall-bias",
    explanation: {
      en: "One group has spent months being asked what went wrong and searching for it. The other has had no reason to think about the first trimester at all. The comparison is partly of what was taken and partly of how hard each group looked.",
    },
  },
  {
    id: "rb-phone-tumour",
    scenario: {
      en: "People with a brain tumour and people without are asked how many hours a week they used a mobile phone ten years ago, and on which side of the head. Those with a tumour report more hours, and more often on the side the tumour is on.",
    },
    trap: "recall-bias",
    explanation: {
      en: "Nobody can accurately recall a decade of phone habits, so the gap is filled in, and the tumour tells them which side to fill it in on. Billing records would settle it; memory cannot.",
    },
  },
  {
    id: "rb-diet-questionnaire",
    scenario: {
      en: "After a bowel cancer diagnosis, patients are asked to describe their diet over the previous twenty years, and their answers are compared with those of healthy volunteers of the same age.",
    },
    trap: "recall-bias",
    explanation: {
      en: "The patients have already been told which foods are suspected, and are reconstructing twenty years around a diagnosis. The volunteers are reconstructing twenty years around nothing in particular.",
    },
  },
  {
    id: "rb-injury-claim",
    scenario: {
      en: "Workers making a compensation claim for back pain are asked how heavy their lifting used to be, and their answers are compared with those of colleagues who made no claim.",
    },
    trap: "recall-bias",
    explanation: {
      en: "Both groups did the same job. Only one has spent months assembling an account of how demanding it was, and that account is what is being measured.",
    },
  },

  // ---- Immortal time bias ----
  {
    id: "it-transplant",
    scenario: {
      en: "A registry compares patients who received a transplant with those on the waiting list who did not, counting each patient's survival from the day they joined the list. The transplanted group lives far longer.",
    },
    trap: "immortal-time-bias",
    explanation: {
      en: "To be transplanted you must survive until an organ arrives, so everyone in that group is guaranteed to have lived from listing to surgery. Anyone who dies while waiting can only ever be in the other group.",
    },
  },
  {
    id: "it-completed-course",
    scenario: {
      en: "A hospital reports that patients who completed the full six-week rehabilitation course had better one-year survival than those who did not, measured from the day of admission.",
    },
    trap: "immortal-time-bias",
    explanation: {
      en: "Completing six weeks requires being alive for six weeks. The comparison group collects everyone who died in the meantime, and the course is credited with those first six weeks of guaranteed survival.",
    },
  },
  {
    id: "it-dispensed",
    scenario: {
      en: "Using a prescription database, researchers classify each patient as a drug user if they were ever dispensed it during follow-up, and count follow-up from the date of their hospital discharge.",
    },
    trap: "immortal-time-bias",
    explanation: {
      en: "The classification uses the future. Time between discharge and the first dispensing cannot contain a death for anyone counted as a user, yet it is credited to the drug. Counting each patient as unexposed until their first prescription removes it.",
    },
  },
  {
    id: "it-responders",
    scenario: {
      en: "An oncology paper reports that patients whose tumour responded to chemotherapy survived longer than non-responders, timing survival from the start of treatment. Response was assessed after three cycles.",
    },
    trap: "immortal-time-bias",
    explanation: {
      en: "You cannot be classed as a responder unless you live to the assessment after three cycles. Patients who die during the first two cycles are all non-responders by construction, so the responder group starts with survival built into it.",
    },
  },

  // ---- A second pass, clinically flavoured ----
  {
    id: "sp-hospitals",
    scenario: {
      en: "A national audit finds that patients operated on at small local hospitals survive more often than those at large teaching hospitals. Broken down by how severe the case was, the teaching hospitals come out ahead in every category.",
    },
    trap: "simpsons-paradox",
    explanation: {
      en: "Teaching hospitals take the difficult cases, so their pooled figure is dragged down by a case mix nobody chose at random. Better in every severity band and worse overall is the signature of that.",
    },
  },
  {
    id: "br-genetic",
    scenario: {
      en: "A genetic test for a condition affecting about 1 in 5,000 people is 99.9% accurate. A clinic tells everyone who screens positive that the diagnosis is essentially confirmed.",
    },
    trap: "base-rate-fallacy",
    explanation: {
      en: "Even at 99.9%, errors outnumber real cases when the condition is this rare. Among 100,000 people about 20 have it, and about 100 healthy people also test positive, so a positive is right roughly one time in six.",
    },
  },
  {
    id: "sv-followup",
    scenario: {
      en: "A surgeon reports excellent long-term results in the patients seen at the five-year follow-up clinic. Patients who moved away, stopped attending, or died before five years are not in the series.",
    },
    trap: "survivorship-bias",
    explanation: {
      en: "The series was defined by who was still turning up. The patients who did worst are precisely the ones most likely to be missing from it, so the outcomes describe the survivors rather than the operation.",
    },
  },
  {
    id: "cc-monitor",
    scenario: {
      en: "Hospitals that use more of a particular monitoring device have lower death rates. The manufacturer's brochure concludes that buying the device saves lives.",
    },
    trap: "correlation-not-causation",
    explanation: {
      en: "Hospitals that can afford more monitors can usually afford more of everything else too, including staff. The device may be a marker of a well resourced hospital rather than the cause of its results.",
    },
  },
  {
    id: "pf-adverse",
    scenario: {
      en: "A rare reaction occurs in about 1 in 50,000 people taking a drug. A patient develops it, and a report concludes there is only a 1 in 50,000 chance the drug was not responsible.",
    },
    trap: "prosecutors-fallacy",
    explanation: {
      en: "That flips the question round. The 1 in 50,000 is how often the reaction appears among people taking the drug, not the chance the drug caused this case. Answering that needs to know how often the same thing happens in people who never took it.",
    },
  },

  // ---- Genuinely sound reasoning (decoys) ----
  {
    id: "ok-prespecified",
    scenario: {
      en: "A trial reports the outcome it registered in advance as its main one, states that it also measured eleven others, and says plainly that success was judged on the registered outcome alone.",
    },
    trap: null,
    explanation: {
      en: "Naming the outcome before seeing the data, and then reporting all of them, is what stops a study quietly promoting whichever measure happened to come out well.",
    },
  },
  {
    id: "ok-triangulated",
    scenario: {
      en: "A cohort study links an exposure to a disease. It reports that the association survived adjustment for the confounders named in advance, that more exposure went with more disease, and that two independent cohorts elsewhere found the same pattern.",
    },
    trap: null,
    explanation: {
      en: "No single one of these settles causation, but together they are the things that make an observational finding worth taking seriously: a prior plan, a dose-response pattern, and replication in populations that do not share the same quirks.",
    },
  },
  {
    id: "ok-randomised-drug",
    scenario: {
      en: "Patients are assigned by a computer to a drug or a dummy tablet, with neither they nor their doctor knowing which. Deaths are counted in everyone assigned, whatever they went on to take. The drug group does slightly better.",
    },
    trap: null,
    explanation: {
      en: "A coin flip knows nothing about the patient, so it cannot smuggle the reason for treatment into the comparison. Counting everyone as assigned keeps that protection even when people stop taking their tablets.",
    },
  },
  {
    id: "ok-both-shown",
    scenario: {
      en: "A clinic compares its results with a national benchmark, adjusts for how severe its patients' illness was, and publishes the crude and the adjusted figures side by side along with the case mix it adjusted for.",
    },
    trap: null,
    explanation: {
      en: "Showing both figures and the mix behind them is the honest move. A reader can see how much of the difference was case mix and how much survived accounting for it, instead of being handed only the flattering one.",
    },
  },
  {
    id: "ok-both-figures",
    scenario: {
      en: "A trial reports that the treatment reduced strokes from 12 in every 100 patients to 8 in every 100, calls that a reduction of a third, and adds that about 25 patients need to be treated for five years to prevent one stroke.",
    },
    trap: null,
    explanation: {
      en: "The relative figure, the plain numbers of people and the number needed to treat are all on the table, so nothing is hidden behind the percentage. This is how a result should be reported.",
    },
  },
  {
    id: "ok-consecutive-patients",
    scenario: {
      en: "A diagnostic test is evaluated on every consecutive patient arriving at a clinic with the same presenting complaint, whatever their eventual diagnosis, and the paper reports its accuracy separately for mild and for advanced disease. Another clinic with a similar caseload adopts the figures.",
    },
    trap: null,
    explanation: {
      en: "This is how a diagnostic study should be built. Consecutive patients with one presenting problem, and accuracy broken down by severity, so a reader can find the subgroup that actually resembles their own patients.",
    },
  },
  {
    id: "ok-sampled-before-filter",
    scenario: {
      en: "A company asks whether two things about its users go together. It samples at random from everyone who ever opened an account, including those who never came back and those who cancelled, and finds no relationship between them.",
    },
    trap: null,
    explanation: {
      en: "The sample was drawn before any filter that either of the two things could have influenced. Nothing about staying, succeeding or being admitted decided who got counted, so a selection artefact cannot be hiding in it.",
    },
  },
  {
    id: "ok-screening-mortality",
    scenario: {
      en: "A region invites half its residents, chosen at random, to be screened for a disease and leaves the other half uninvited. Ten years on it counts deaths from that disease among everyone in both halves, screened or not, attended or not. Deaths are 30% lower in the invited half.",
    },
    trap: null,
    explanation: {
      en: "This is the design an earlier diagnosis cannot fool. The clock starts at the invitation rather than at diagnosis, and the count includes everyone invited, so no head start and no extra diagnoses can manufacture the difference.",
    },
  },
  {
    id: "ok-no-migration",
    scenario: {
      en: "A hospital reports that survival improved in every severity grade over five years. It also reports that the grading criteria did not change in that time, that no new diagnostic test was introduced, and that the number of patients in each grade stayed about the same.",
    },
    trap: null,
    explanation: {
      en: "This is the case where the improvement is real. Nothing reclassified the patients, and the grades held the same share of people, so no reshuffling could have manufactured the gain.",
    },
  },
  {
    id: "ok-match-stated-well",
    scenario: {
      en: "An expert testifies that the DNA profile occurs in roughly 1 person in a million, and adds that in a city of two million this means about two other people would be expected to match as well, so the match alone does not single out the defendant.",
    },
    trap: null,
    explanation: {
      en: "This is the rarity figure stated correctly. The expert converts it into expected matches in the population instead of flipping it into a probability of innocence.",
    },
  },
  {
    id: "ok-rct",
    scenario: {
      en: "Patients are assigned at random to a drug or a placebo. The drug group has fewer strokes, and the difference holds within every age group. The researchers conclude the drug reduces strokes.",
    },
    trap: null,
    explanation: {
      en: "Randomisation balances the hidden differences, and the effect survives splitting by age. This reasoning is sound.",
    },
  },
  {
    id: "ok-common-condition",
    scenario: {
      en: "A test with a 1% false-positive rate is used in a clinic where about 40% of those tested genuinely have the condition. A doctor tells a patient that a positive result makes the condition much more likely.",
    },
    trap: null,
    explanation: {
      en: "The base rate matters, and here it is high. With 40% prevalence a positive really is strong evidence, so applying the rare-disease lesson would be a mistake.",
    },
  },
  {
    id: "ok-speed-limit",
    scenario: {
      en: "A city compares road deaths before and after lowering a speed limit, adjusts for traffic volume, and checks the national trend over the same years. The local drop is larger than the national trend.",
    },
    trap: null,
    explanation: {
      en: "They accounted for the obvious confounders and for the background trend, which is what makes a before-and-after comparison credible.",
    },
  },
  {
    id: "ok-full-cohort",
    scenario: {
      en: "A trial reports outcomes for everyone who was enrolled, including those who stopped treatment early, and states how many dropped out and why.",
    },
    trap: null,
    explanation: {
      en: "Reporting the whole enrolled group, dropouts included, is exactly the defence against counting only the survivors.",
    },
  },
  {
    id: "ok-time-varying",
    scenario: {
      en: "A drug-safety study counts each patient as untreated from enrolment until the day of their first prescription, and as treated from that day onwards, so a patient can contribute time to both groups.",
    },
    trap: null,
    explanation: {
      en: "Nobody is credited to a group before they belong to it, so no stretch of guaranteed survival is handed to the treated group. This is the standard fix, correctly applied.",
    },
  },
  {
    id: "ok-landmark",
    scenario: {
      en: "A study of patients who completed a course of treatment starts everyone's clock at the end of the course, and excludes anyone who died before that point from both groups alike.",
    },
    trap: null,
    explanation: {
      en: "Starting the clock after the point where group membership was settled means neither group can be credited with survival it was guaranteed. It costs some early data, and it removes the head start.",
    },
  },
  {
    id: "ok-prescription-records",
    scenario: {
      en: "A study of a drug taken in pregnancy takes the exposure from the national prescription database rather than from interviews, then compares outcomes. Neither the mothers nor the researchers supplied the exposure data.",
    },
    trap: null,
    explanation: {
      en: "The exposure was written down before anyone knew the outcome, by someone with no stake in it. That is the standard defence against memory bending, and here it was used.",
    },
  },
  {
    id: "ok-negative-control-question",
    scenario: {
      en: "A case-control study asks about the suspected exposure and also about a second, unrelated one that nobody associates with the disease. Both groups report the second one at the same rate, and the authors say so before reporting the first.",
    },
    trap: null,
    explanation: {
      en: "The second question is a control for the searching itself. If one group were simply remembering harder across the board, it would show up there too, and it did not.",
    },
  },
  {
    id: "ok-itt-primary",
    scenario: {
      en: "A trial's main result counts every patient in the group they were randomly assigned to, including the 40 who never started the treatment. A per-protocol analysis is reported alongside it, agrees with it, and is labelled as secondary.",
    },
    trap: null,
    explanation: {
      en: "The randomised comparison is the one the conclusion rests on, the other is shown for completeness, and the two agree. That is how both analyses are supposed to be used.",
    },
  },
  {
    id: "ok-per-protocol-noninferiority",
    scenario: {
      en: "A trial testing whether a simpler regimen is no worse than the standard one reports both analyses, notes that counting non-adherent patients in their assigned group tends to make two treatments look alike, and declines to claim non-inferiority because only one of the two analyses supports it.",
    },
    trap: null,
    explanation: {
      en: "Counting everyone as assigned is conservative when you are trying to show a difference and permissive when you are trying to show similarity, so a non-inferiority claim needs both analyses to agree. Refusing to claim it when they disagree is the careful move, not the trap.",
    },
  },

  // ---- simpsons-paradox, second wave ----
  {
    id: "sp-shots",
    scenario: {
      en: "Two players are compared over a season. Player A made 35% of all shots and Player B made 65%, and the coach's report names B the more accurate shooter. Sorted into close shots and long shots, A had the higher percentage in both.",
    },
    trap: "simpsons-paradox",
    explanation: {
      en: "Almost all of B's attempts were close range, where anyone scores often, while A shot mostly from distance, so the pooled percentages record where the shots were taken from rather than who shoots better.",
    },
  },
  {
    id: "sp-recruit",
    scenario: {
      en: "A company reviews last year's applications. Overall 70% of outside applicants were hired against 40% of internal ones, and a manager tells the board the process quietly favours outsiders. Team by team, internal applicants were hired at the higher rate in both the engineering team and the sales team.",
    },
    trap: "simpsons-paradox",
    explanation: {
      en: "Outside applicants went mainly to engineering, which was hiring heavily, while internal ones applied mainly to sales, where almost nobody was being taken on, so the pooled figures compare which team people applied to.",
    },
  },
  {
    id: "sp-signup",
    scenario: {
      en: "A team replaces its sign up page. The new page signs up 35% of visitors against the old page's 13%, and the product lead calls it a clear win. Looked at separately, the old page did better among desktop visitors and better among phone visitors.",
    },
    trap: "simpsons-paradox",
    explanation: {
      en: "The old page was seen mostly by phone visitors, who rarely sign up on either version, and the new one mostly by desktop visitors, who sign up often, so the overall gap tracks the audience mix.",
    },
  },
  {
    id: "sp-callcentre",
    scenario: {
      en: "Two customer service centres are compared. One settles 85% of calls at the first attempt and the other 54%, so the bonus goes to the first. Broken into routine calls and complicated ones, the second centre settles the higher share of each.",
    },
    trap: "simpsons-paradox",
    explanation: {
      en: "Nearly all of the second centre's work is complicated calls, which are hard to settle at once, while the first handles mostly routine ones, so the combined rate compares workloads rather than skill.",
    },
  },
  {
    id: "sp-guestscore",
    scenario: {
      en: "A chain compares two hotels on guest ratings. One averages 4.3 out of 5 and the other 3.3, and head office holds the second up as the weaker property. Among business guests the second scores higher, and among holiday guests it scores higher too.",
    },
    trap: "simpsons-paradox",
    explanation: {
      en: "Almost all of the lower rated hotel's reviews come from business guests, who mark every hotel down, while the other's come mostly from holidaymakers, who mark everything up, so the averages compare who was reviewing.",
    },
  },
  {
    id: "sp-seed",
    scenario: {
      en: "A cooperative compares two seed varieties across its members' fields. One averaged 5.6 tonnes a hectare and the other 2.6, and the newsletter recommends the first. On clay ground the second variety yielded more, and on sandy ground it yielded more as well.",
    },
    trap: "simpsons-paradox",
    explanation: {
      en: "The lower yielding variety was sown almost entirely on sandy ground, which grows little of anything, and the other almost entirely on clay, so the averages mostly record where each seed was planted.",
    },
  },
  {
    id: "sp-courier",
    scenario: {
      en: "Two courier firms report on time delivery. One arrives on time for 92% of parcels and the other for 72%, so a retailer moves its contract to the first. Counting town deliveries and country deliveries separately, the second firm is on time more often in both.",
    },
    trap: "simpsons-paradox",
    explanation: {
      en: "The firm with the worse headline figure carries nearly all the country parcels, which run late for everyone, while the other carries mostly short town runs, so the combined rate reflects the routes each was given.",
    },
  },
  // ---- base-rate-fallacy, second wave ----
  {
    id: "br-doping",
    scenario: {
      en: "A screening test at an amateur athletics meeting catches 99% of competitors who have used a banned substance and wrongly flags 1% of those who have not. About 1 competitor in 500 has used one. A commentator says a flagged athlete is 99% certain to be guilty.",
    },
    trap: "base-rate-fallacy",
    explanation: {
      en: "Clean competitors outnumber users 499 to 1, so flagging one percent of them yields roughly five wrong flags for every real one, and most flagged athletes have taken nothing.",
    },
  },
  {
    id: "br-cardflag",
    scenario: {
      en: "A bank's monitoring catches essentially every fraudulent card payment and wrongly flags 1 legitimate payment in 200. About 1 payment in 10,000 is fraudulent. A manager proposes freezing the account of anyone whose payment is flagged, saying almost all of them are frauds.",
    },
    trap: "base-rate-fallacy",
    explanation: {
      en: "For each fraudulent payment there are about 10,000 legitimate ones, and half a percent of those is roughly 50 wrong flags per real fraud, so nearly every frozen account belongs to an ordinary customer.",
    },
  },
  {
    id: "br-essay",
    scenario: {
      en: "A university's text checking tool is 98% accurate in both directions. About 1 essay in 200 is genuinely copied. The disciplinary panel tells every student it flags that there is a 98% chance they copied.",
    },
    trap: "base-rate-fallacy",
    explanation: {
      en: "Honest essays outnumber copied ones 199 to 1, so two percent of them produces about four wrong flags for every real one, and a flagged student is more likely innocent than not.",
    },
  },
  {
    id: "br-inspection",
    scenario: {
      en: "A camera on a production line spots 95% of faulty units and wrongly rejects 3% of good ones. About 1 unit in 1,000 leaves the line faulty. The plant manager scraps every rejected unit, saying almost all of them must be defective.",
    },
    trap: "base-rate-fallacy",
    explanation: {
      en: "Good units outnumber faulty ones about 1,000 to 1, so rejecting three percent of them discards roughly thirty sound units for every faulty one caught.",
    },
  },
  {
    id: "br-pipe",
    scenario: {
      en: "A water company's sensors are right 95% of the time when they call a pipe section leaking or sound. About 1 section in 400 leaks in a given year. The operations plan assumes crews will find a leak at nearly every flagged section.",
    },
    trap: "base-rate-fallacy",
    explanation: {
      en: "Sound sections outnumber leaking ones 399 to 1, so the five percent of them wrongly called leaking gives about twenty wasted excavations for every genuine leak.",
    },
  },
  {
    id: "br-integrity",
    scenario: {
      en: "A retailer screens applicants with a questionnaire that correctly identifies 90% of people who would steal stock and wrongly flags 10% of those who would not. About 1 applicant in 100 would steal. The hiring team rejects everyone flagged, saying nine in ten of them are thieves.",
    },
    trap: "base-rate-fallacy",
    explanation: {
      en: "Honest applicants outnumber the rest 99 to 1, so flagging a tenth of them turns away about eleven blameless people for every one who would have stolen.",
    },
  },
  {
    id: "br-phish",
    scenario: {
      en: "A company's mail filter is 99% accurate at telling phishing from ordinary mail. About 1 arriving message in 3,000 is phishing. The security lead tells staff that anything the filter quarantines is almost certainly an attack.",
    },
    trap: "base-rate-fallacy",
    explanation: {
      en: "Ordinary messages outnumber phishing ones about 3,000 to 1, so the one percent of them wrongly quarantined outnumbers the real attacks by roughly thirty to one.",
    },
  },
  // ---- correlation-not-causation, second wave ----
  {
    id: "cc-dashcam",
    scenario: {
      en: "An insurer finds that drivers who have fitted a dashboard camera claim for accidents far less often than drivers who have not. Its marketing team announces that fitting a camera makes you a safer driver, and offers a discount to anyone who installs one.",
    },
    trap: "correlation-not-causation",
    explanation: {
      en: "Cautious drivers are the ones who buy the cameras in the first place, so the camera marks out a type of driver rather than changing how anyone drives.",
    },
  },
  {
    id: "cc-support",
    scenario: {
      en: "A consultant surveys firms and reports that those with the largest customer support teams receive the most complaints. The write up advises keeping support teams small so that complaints stay down.",
    },
    trap: "correlation-not-causation",
    explanation: {
      en: "Firms staff up because complaints are already arriving, so the arrow runs from complaints to headcount, and larger firms generate more of both anyway.",
    },
  },
  {
    id: "cc-thermostat",
    scenario: {
      en: "An energy supplier reports that homes with a smart thermostat use a fifth less gas than homes without one. Its advertising says the thermostat cuts your gas use by a fifth.",
    },
    trap: "correlation-not-causation",
    explanation: {
      en: "The households that install one tend to have newer, better insulated homes and an existing interest in trimming bills, so the comparison is between two kinds of household as much as two thermostats.",
    },
  },
  {
    id: "cc-cameras",
    scenario: {
      en: "A motoring column notes that stretches of road with fixed speed cameras record more crashes than stretches without them, and argues that the cameras distract drivers into crashing.",
    },
    trap: "correlation-not-causation",
    explanation: {
      en: "Cameras are installed on stretches that already had a bad crash record, so the crashes came first and chose the camera sites rather than the other way round.",
    },
  },
  {
    id: "cc-sauna",
    scenario: {
      en: "A gym newsletter reports that members who use the sauna after training take fewer sick days than members who do not, and concludes that ten minutes in the sauna strengthens the immune system.",
    },
    trap: "correlation-not-causation",
    explanation: {
      en: "Members with the time and habit to stay on for the sauna are the ones training regularly and in better health already, so sauna use is a marker of that group rather than a cause.",
    },
  },
  {
    id: "cc-plants",
    scenario: {
      en: "A trend piece points out that over eleven years national sales of houseplants and of noise cancelling headphones rose almost in step, and suggests the houseplant boom is what pushed people to buy headphones.",
    },
    trap: "correlation-not-causation",
    explanation: {
      en: "Both climbed alongside the same rise in city renting and spending on home comfort, and any two quantities that drift steadily upward will track each other whatever is driving them.",
    },
  },
  {
    id: "cc-radio",
    scenario: {
      en: "A plant manager notices that shifts where the radio is playing turn out fewer defective units, and orders music to be played on every shift to bring the defect rate down.",
    },
    trap: "correlation-not-causation",
    explanation: {
      en: "The radio happens to be on during day shifts, which are staffed by the longest serving operators working the easier product runs, so experience and workload are what separate the shifts.",
    },
  },
  // ---- survivorship-bias, second wave ----
  {
    id: "sv-fundtable",
    scenario: {
      en: "An investment firm's brochure lists the twenty funds it offers today and reports that the average one has beaten the market over the past ten years. The sales team presents this as proof of the firm's stock-picking skill.",
    },
    trap: "survivorship-bias",
    explanation: {
      en: "The table contains only funds still open today, so the ones that did badly enough to be closed or merged away during the decade have been dropped from the average before it was taken.",
    },
  },
  {
    id: "sv-dropouts",
    scenario: {
      en: "A magazine profiles thirty founders whose companies are now worth billions and finds that most left university early and ignored advice to take a safe job. Its careers columnist tells readers that leaving early is the surer path.",
    },
    trap: "survivorship-bias",
    explanation: {
      en: "The thirty were picked for having made it, so the far larger number who left early, failed and were never profiled are missing, and the failure rate of the strategy cannot be read off this group.",
    },
  },
  {
    id: "sv-bridges",
    scenario: {
      en: "A council engineer notes that the stone bridges built in the town two centuries ago all still carry traffic, while several concrete ones from the 1970s have had to be replaced. He writes that the older building methods were plainly more durable.",
    },
    trap: "survivorship-bias",
    explanation: {
      en: "Only the two hundred year old bridges good enough to last are left to inspect, while the poorly built ones of that era collapsed or were demolished long ago and never enter the comparison.",
    },
  },
  {
    id: "sv-demos",
    scenario: {
      en: "A music magazine interviews twenty bands that reached the charts after years in small venues, and finds that every one of them refused to change their sound when a label asked. The writer concludes that refusing to compromise is what gets a band signed.",
    },
    trap: "survivorship-bias",
    explanation: {
      en: "The sample was drawn from bands that charted, so the many acts that also refused and were dropped or never signed are absent, leaving the cost of the tactic invisible.",
    },
  },
  {
    id: "sv-rally",
    scenario: {
      en: "A car magazine surveys owners at an enthusiasts' rally for a model built thirty years ago. Almost all report low running costs and few breakdowns, and the magazine names it the most dependable car of its era.",
    },
    trap: "survivorship-bias",
    explanation: {
      en: "Only cars sound enough to still be driven to a rally are in the sample; the ones that rusted or failed were scrapped years ago and their owners are not there to be asked.",
    },
  },
  {
    id: "sv-amphorae",
    scenario: {
      en: "A museum label states that the region's ancient potters worked to a standard modern factories struggle to match. The claim rests on the jars in the case, all of them lifted whole from a buried settlement two thousand years later.",
    },
    trap: "survivorship-bias",
    explanation: {
      en: "The collection is filtered by what stayed intact underground for two millennia, so thin, flawed or badly fired pots are physically absent from the evidence used to judge the average standard.",
    },
  },
  {
    id: "sv-academy",
    scenario: {
      en: "A rowing academy studies the athletes in its national squad and finds that nearly all of them trained through serious pain at eighteen. The head coach tells new recruits that pushing through injury is what separates those who make it.",
    },
    trap: "survivorship-bias",
    explanation: {
      en: "The squad consists of those whose bodies withstood it, while recruits whose injuries ended their careers left the sport and are no longer in the group being examined, hiding the risk of the advice.",
    },
  },
  // ---- prosecutors-fallacy, second wave ----
  {
    id: "pf-print",
    scenario: {
      en: "A partial print from a break-in is searched against a national database of six million people and returns one name. The examiner says about 1 person in 500,000 would match it. Counsel tells the jury there is therefore a 1 in 500,000 chance the man was not there.",
    },
    trap: "prosecutors-fallacy",
    explanation: {
      en: "The 1 in 500,000 is how often an unconnected person matches, and searching six million people should turn up about a dozen such matches, so it is not the chance that this man was elsewhere.",
    },
  },
  {
    id: "pf-ledger",
    scenario: {
      en: "An auditor screens every branch of a retail chain for a rounding pattern that would arise by chance in about 1 honestly kept ledger in 10,000. One of the chain's 30,000 branches shows it, and the report states that the manager is almost certainly falsifying figures.",
    },
    trap: "prosecutors-fallacy",
    explanation: {
      en: "The 1 in 10,000 describes how often honest books show the pattern, not how often books showing it are dishonest, and screening 30,000 branches should produce about three honest ones like it.",
    },
  },
  {
    id: "pf-lottery",
    scenario: {
      en: "A weekly prize draw has been won twice by the same person. An organiser calculates that the odds of a given player winning twice are about one in a million, and concludes the draw was rigged. The draw has run for twenty years with over three million regular players.",
    },
    trap: "prosecutors-fallacy",
    explanation: {
      en: "One in a million applies to one player named in advance, whereas the question asked afterwards is whether anyone at all among three million regular players would win twice, which is close to expected.",
    },
  },
  {
    id: "pf-birthday",
    scenario: {
      en: "An internal auditor at a company of 700 staff reports that two employees who sign off each other's expense claims were born on the same day of the year. He puts the chance of that at 1 in 365 and states they are almost certainly working together.",
    },
    trap: "prosecutors-fallacy",
    explanation: {
      en: "The 1 in 365 fits one pair chosen in advance, but he combed hundreds of pairs for any oddity, and how often innocent pairs share a birthday is not the probability of innocence given a shared birthday.",
    },
  },
  {
    id: "pf-cluster",
    scenario: {
      en: "Four children on one street develop the same rare illness within a year. A campaigner calculates that this would happen by chance in about one street in a million, and tells a public meeting there is therefore a one in a million chance the nearby plant is blameless.",
    },
    trap: "prosecutors-fallacy",
    explanation: {
      en: "The figure is the chance of such a cluster on a street picked in advance with nothing causing it, and with millions of streets in the country a few clusters are expected somewhere regardless of the plant.",
    },
  },
  {
    id: "pf-typeface",
    scenario: {
      en: "An anonymous threatening letter was printed in a distinctive typeface installed on roughly 1 printer in 20,000. A suspect's office printer carries it. The investigating officer writes that the odds against anyone else having produced the letter are 20,000 to 1.",
    },
    trap: "prosecutors-fallacy",
    explanation: {
      en: "With millions of printers in the country, several hundred carry the same typeface, so the figure measures how rare the feature is rather than how likely this owner is to have written the letter.",
    },
  },
  {
    id: "pf-doping",
    scenario: {
      en: "A national programme screens about 60,000 samples a year. One athlete's sample shows a marker found in roughly 1 in 10,000 samples from clean competitors, and the panel chair states there is a 1 in 10,000 chance the athlete competed clean.",
    },
    trap: "prosecutors-fallacy",
    explanation: {
      en: "1 in 10,000 is how often clean samples show the marker, so about six clean athletes a year would show it; turning that into the chance of being clean also requires knowing how few competitors dope.",
    },
  },
  // ---- will-rogers-phenomenon, second wave ----
  {
    id: "wr-relegation",
    scenario: {
      en: "A league moves its four lowest-ranked clubs down into the second tier. A ratings service recalculates the tier averages and finds the average club rating is now higher in both tiers than before the reshuffle. The commissioner calls it a sign that standards are rising everywhere.",
    },
    trap: "will-rogers-phenomenon",
    explanation: {
      en: "Those four clubs rated below the top tier's average and above the second tier's, so taking them out lifts one figure and adding them lifts the other, while no club plays any better than before.",
    },
  },
  {
    id: "wr-insurance",
    scenario: {
      en: "An insurer moves the safest quarter of its high-risk motor policies into its standard pool. The next report shows the average claim cost has risen in the high-risk pool and in the standard pool, and the underwriting director warns that both books are deteriorating.",
    },
    trap: "will-rogers-phenomenon",
    explanation: {
      en: "The transferred policies cost less than the high-risk average and more than the standard average, so removing them raises one mean and adding them raises the other, with no driver's risk changed.",
    },
  },
  {
    id: "wr-fitness",
    scenario: {
      en: "An armed service brings in a medical screen that catches minor problems the old one missed, and moves the personnel it flags from fully deployable to restricted duties. Average fitness scores then come out higher in both categories, and a spokesman credits the new training programme.",
    },
    trap: "will-rogers-phenomenon",
    explanation: {
      en: "Those moved were the least fit of the deployable group and the fittest of the restricted group, so both averages rise on the reclassification alone, without anyone's fitness changing.",
    },
  },
  {
    id: "wr-credit",
    scenario: {
      en: "A bank tightens the test that puts a loan on its watch list, so a batch of loans previously counted as performing moves across. The next figures show a higher average credit score in the performing book and in the watch list, and the risk committee reports improvement on both.",
    },
    trap: "will-rogers-phenomenon",
    explanation: {
      en: "The moved loans were the weakest of the performing book and the strongest of the watch list, so both averages rise the moment they change column, with no borrower's position altered.",
    },
  },
  {
    id: "wr-maintenance",
    scenario: {
      en: "A depot fits a vibration sensor that picks up early wear, and engines it flags are shifted from the serviceable list to the overhaul list. The next report shows average hours between faults up on both lists, and the fleet manager credits a change of lubricant.",
    },
    trap: "will-rogers-phenomenon",
    explanation: {
      en: "The flagged engines were the worst on the serviceable list and the best on the overhaul list, so removing them lifts one average and adding them lifts the other, with no engine actually wearing less.",
    },
  },
  {
    id: "wr-salesteams",
    scenario: {
      en: "A sales director has a senior team averaging 50 sales a month and a junior team averaging 30. She moves two representatives who each average 40 from the senior team to the junior team. The next report shows both team averages have gone up, and she credits the reshuffle.",
    },
    trap: "will-rogers-phenomenon",
    explanation: {
      en: "The two sell below the senior team's average and above the junior team's, so the senior mean climbs above 50 and the junior mean above 30 while nobody sells a single unit more.",
    },
  },
  {
    id: "wr-produce",
    scenario: {
      en: "An exporter grades boxes as premium, averaging 90 points, or standard, averaging 70. It changes the cut-off so that boxes scoring 82, until now premium, count as standard. The next quality report shows the average score up in both grades, and the manager says the growers have improved.",
    },
    trap: "will-rogers-phenomenon",
    explanation: {
      en: "Boxes at 82 sat below the premium average of 90 and above the standard average of 70, so shifting them lifts both figures without a single box of fruit being any better.",
    },
  },
  {
    id: "wr-conservatoire",
    scenario: {
      en: "A conservatoire moves its five weakest cellists out of the advanced class and into the intermediate class. At the end of term the average examination mark is higher in the advanced class and higher in the intermediate class, and the principal praises the new teaching plan.",
    },
    trap: "will-rogers-phenomenon",
    explanation: {
      en: "Those five scored below the advanced class average and above the intermediate class average, so taking them out raises one mean and adding them raises the other, whatever any student's playing does.",
    },
  },
  // ---- lead-time-bias, second wave ----
  {
    id: "lt-bearings",
    scenario: {
      en: "A haulage firm fits vibration sensors that flag a failing gearbox about eight months before a driver would notice the noise. The log now shows an average of fourteen months from first fault report to breakdown, up from six. The firm's newsletter says the sensors are making gearboxes last far longer.",
    },
    trap: "lead-time-bias",
    explanation: {
      en: "The breakdowns still happen when they always did; only the moment the fault entered the log moved earlier, so the measured gap from report to breakdown grew by exactly the warning the sensors bought.",
    },
  },
  {
    id: "lt-girders",
    scenario: {
      en: "A roads authority begins ultrasound surveys that reveal cracking in girders years before it becomes visible. Girders are still replaced at the same age as before, yet the average time from a crack being recorded to replacement has risen from four years to nine. The authority reports longer girder life.",
    },
    trap: "lead-time-bias",
    explanation: {
      en: "Replacement happens at the same age it always did, so nothing about the girder changed. Recording the crack earlier simply lengthened the interval being measured.",
    },
  },
  {
    id: "lt-disks",
    scenario: {
      en: "A data centre switches on drive health alerts that fire well before a disk starts losing sectors. Disks are still retired at the same age, but the mean time from first alert to retirement has tripled. The operations page claims the alerts are extending disk life threefold.",
    },
    trap: "lead-time-bias",
    explanation: {
      en: "The retirement date did not move. Starting the count at an earlier alert stretches the measured interval without a single disk lasting longer.",
    },
  },
  {
    id: "lt-battery",
    scenario: {
      en: "A phone maker adds a diagnostic that warns of battery decline far earlier than the old check did. Support records show the average time from first warning to replacement has doubled, and batteries are still replaced at the same age. Marketing says the diagnostic doubles battery life.",
    },
    trap: "lead-time-bias",
    explanation: {
      en: "Batteries reach replacement at the same age as before; only the warning moved forward, so the interval from warning to replacement grew by the time gained in detecting decline.",
    },
  },
  {
    id: "lt-orchard",
    scenario: {
      en: "A grower adopts a leaf assay that identifies infected trees months before wilting appears. Records now show infected trees standing fifteen months after detection rather than five, and trees are still felled at the same age. The assay supplier's leaflet claims it keeps infected trees productive three times as long.",
    },
    trap: "lead-time-bias",
    explanation: {
      en: "Felling happens at the same age, so no tree gained a day. The assay only started the clock earlier, which inflates the interval from detection to felling.",
    },
  },
  {
    id: "lt-leaks",
    scenario: {
      en: "A water utility installs acoustic monitoring that finds leaks long before they surface. Pipes are still dug up only when a leak reaches the road, yet the average time from logging a leak to the dig has risen from two months to eleven. The utility reports that leaking pipes now last far longer.",
    },
    trap: "lead-time-bias",
    explanation: {
      en: "The dig is still triggered by the same event at the same moment. Logging the leak nine months sooner adds nine months to the measured interval and nothing to the pipe.",
    },
  },
  {
    id: "lt-memory",
    scenario: {
      en: "A memory service introduces a test that identifies a degenerative condition several years earlier than before. Patients still move into full time care at about the same age, but the average interval from diagnosis to that move has risen from four years to seven. A leaflet says the test delays dependence.",
    },
    trap: "lead-time-bias",
    explanation: {
      en: "The move into full time care happens at the same age as before, so nothing was delayed. Diagnosing sooner simply lengthened the stretch of time counted after diagnosis.",
    },
  },
  {
    id: "lt-agecheck",
    scenario: {
      en: "Before a new imaging protocol, a clinic's patients were identified at an average age of 62 and died at 66. Since the protocol, they are identified at 59 and still die at 66. The annual report states that average survival after diagnosis has risen from four years to seven.",
    },
    trap: "lead-time-bias",
    explanation: {
      en: "The age at death is unchanged, so no patient gained time. Moving the moment of identification three years earlier adds three years to every measured interval.",
    },
  },
  // ---- spectrum-bias, second wave ----
  {
    id: "sb-notes",
    scenario: {
      en: "A detector is checked against obvious photocopied notes and crisp notes straight from the mint, and separates them almost perfectly. The maker advertises 99% accuracy. A bank buys it to sort well made counterfeits from worn, creased notes taken over the counter, and expects the same figure.",
    },
    trap: "spectrum-bias",
    explanation: {
      en: "The advertised figure came from the crudest fakes set against the cleanest genuine notes. Where the fakes are skilled and the genuine notes are battered, the two groups overlap on exactly the features the detector reads.",
    },
  },
  {
    id: "sb-spam",
    scenario: {
      en: "A filter is benchmarked on bulk advertising full of misspellings and on a folder of ordinary personal mail, and scores 99.6%. A firm deploys it against carefully written impersonation attempts and against unusual but genuine messages from new suppliers, quoting the same score to its board.",
    },
    trap: "spectrum-bias",
    explanation: {
      en: "The benchmark asked the filter to separate the most obvious junk from the most obviously legitimate mail. Polished impersonations and odd but genuine supplier mail sit in the middle, where the filter was never measured.",
    },
  },
  {
    id: "sb-language",
    scenario: {
      en: "A placement test was validated on absolute beginners and on near native speakers, and told them apart almost every time. A school now uses it to sort intermediate learners into three levels and cites the original accuracy figure in its prospectus.",
    },
    trap: "spectrum-bias",
    explanation: {
      en: "The test was only ever asked to separate the two ends of the range, which almost any crude measure manages. Intermediate learners sit in the middle, where it was never shown to discriminate at all.",
    },
  },
  {
    id: "sb-welds",
    scenario: {
      en: "An inspection system was tuned on deliberately ruined test welds and on flawless reference welds, and caught 97% of the bad ones. On the production line, where flaws are hairline and sound welds carry cosmetic spatter, it catches far fewer. The plant keeps quoting 97% to customers.",
    },
    trap: "spectrum-bias",
    explanation: {
      en: "The 97% was measured on wrecked welds against pristine ones, a comparison with a wide gap. Real line output has faint flaws and untidy good welds, so the same thresholds separate much less.",
    },
  },
  {
    id: "sb-aitext",
    scenario: {
      en: "A tool that claims to tell machine written text from human writing was checked on raw machine output and on handwritten classroom essays, scoring 98%. A college applies it to lightly edited submissions and to careful work by students writing in a second language, and treats every flag as proof.",
    },
    trap: "spectrum-bias",
    explanation: {
      en: "The 98% came from the most obvious machine output set against the most obviously human writing. Edited text and unusually careful second language prose sit between those extremes, where the tool's accuracy was never established.",
    },
  },
  {
    id: "sb-damp",
    scenario: {
      en: "A moisture meter was calibrated against soaking wet blocks and oven dried blocks, and told them apart every time. A surveyor now uses it on borderline walls where mild condensation and genuine structural damp look much alike, and reports the manufacturer's accuracy figure in his findings.",
    },
    trap: "spectrum-bias",
    explanation: {
      en: "Calibration contrasted two extremes that any meter could tell apart. The walls the surveyor actually meets are neither soaked nor bone dry, so the readings that mattered in calibration barely differ here.",
    },
  },
  {
    id: "sb-lesions",
    scenario: {
      en: "An image classifier for a skin condition was built from textbook photographs of advanced lesions and clear photographs of normal skin, reporting 96% accuracy. A community clinic runs it on early lesions and on patients with eczema and insect bites, and quotes the same 96% to them.",
    },
    trap: "spectrum-bias",
    explanation: {
      en: "The reported accuracy came from advanced textbook lesions against plainly normal skin. In the clinic the lesions are early and the comparison skin carries rashes and bites that mimic them, so the separation the figure rested on is gone.",
    },
  },
  {
    id: "sb-concussion",
    scenario: {
      en: "A sideline test for head injury was validated on players with unmistakable symptoms and on rested players at the start of the season, sorting them almost perfectly. A club now applies it late in matches, to subtle knocks in tired and dehydrated players, quoting the same numbers.",
    },
    trap: "spectrum-bias",
    explanation: {
      en: "Validation contrasted obvious injury with fresh, unaffected controls. Late in a match the injuries are subtle and the uninjured are fatigued, so both groups score alike on the very things the test measures.",
    },
  },
  // ---- berksons-bias, second wave ----
  {
    id: "bk-shortlist",
    scenario: {
      en: "A firm interviews any applicant who scores highly on either the coding test or the communication exercise. Among the applicants who reach interview, the two scores move in opposite directions. The hiring manager concludes that people who are good with code tend to be poor with people.",
    },
    trap: "berksons-bias",
    explanation: {
      en: "Reaching interview required a high score on one test or the other, so a weak communicator is there only because the coding score carried them, which produces the opposite pattern inside the interview pool while saying nothing about applicants in general.",
    },
  },
  {
    id: "bk-conservatory",
    scenario: {
      en: "A conservatory offers places to musicians who are outstanding in either technical playing or expressive interpretation. Among those who take up a place, the strongest technicians consistently receive the lowest expression marks. A tutor writes that drilling technique appears to blunt musicality.",
    },
    trap: "berksons-bias",
    explanation: {
      en: "A place required excellence on at least one of the two measures, so a student who is flat on expression must have been outstanding technically to get in, and the tradeoff exists only among those offered places.",
    },
  },
  {
    id: "bk-warranty",
    scenario: {
      en: "A repair shop sees a device only when the battery has failed or the screen has cracked. Its records show that devices with dead batteries have unusually intact screens. The owner writes a blog post arguing that battery wear somehow spares the glass.",
    },
    trap: "berksons-bias",
    explanation: {
      en: "A device reaches the shop if at least one of the two faults happened, so a battery failure gets a device in without any screen damage, leaving cracked screens rarer among battery cases than among devices as a whole.",
    },
  },
  {
    id: "bk-guide",
    scenario: {
      en: "A city guide lists a restaurant only if it is unusually cheap or unusually good. A blogger works through the listings and finds that the pricier ones nearly always have the better food. He tells readers that in this city you really do get what you pay for.",
    },
    trap: "berksons-bias",
    explanation: {
      en: "A restaurant earns a listing by being cheap or by being good, so any expensive one in the guide is there because the food is good, which links price to quality inside the guide even if the city's restaurants show no such link.",
    },
  },
  {
    id: "bk-squad",
    scenario: {
      en: "A national squad picks players who are either exceptionally quick or exceptionally good at reading the game. Within the squad, the fastest players score lowest on the tactical assessment. The coaching staff decide that sprint work must be dulling game intelligence.",
    },
    trap: "berksons-bias",
    explanation: {
      en: "A place needed one outstanding quality or the other, so a very quick player did not also need tactical strength to be picked, and the inverse pattern appears only among the players who were picked.",
    },
  },
  {
    id: "bk-grants",
    scenario: {
      en: "A funding panel awards money to proposals that have either a strong past record or a genuinely novel idea. Reviewing the funded projects five years later, an analyst finds the most novel ones came from the weakest records, and reports that experience seems to kill originality.",
    },
    trap: "berksons-bias",
    explanation: {
      en: "Funding required strength on one criterion or the other, so a novel proposal did not also need a strong record to win money, and the tradeoff holds among funded projects rather than among everyone who applied.",
    },
  },
  {
    id: "bk-claims",
    scenario: {
      en: "An insurer studies its motor claim file, which holds a case only when the vehicle was badly damaged or someone was hurt. In the file, badly damaged vehicles are less often linked to injuries. A memo suggests that heavier crash damage somehow protects the occupants.",
    },
    trap: "berksons-bias",
    explanation: {
      en: "A crash enters the file if it caused serious damage or an injury, so heavily damaged vehicles are recorded even with nobody hurt, while lightly damaged ones appear only when someone was injured.",
    },
  },
  {
    id: "bk-talks",
    scenario: {
      en: "A conference accepts a talk when the research is strikingly new or the speaker is a superb presenter. An attendee notices that the most original talks are the worst delivered, and posts afterwards that the polished speakers must be doing the shallowest work.",
    },
    trap: "berksons-bias",
    explanation: {
      en: "Acceptance needed novelty or delivery, so an original talk got on the programme without a polished speaker, and the tradeoff exists among accepted talks rather than among everything submitted.",
    },
  },
  // ---- relative-vs-absolute-risk, second wave ----
  {
    id: "ra-gearbox",
    scenario: {
      en: "A motoring magazine reports that one gearbox is 40 percent more likely to fail in its first three years than the alternative. The maker's own figures show 7 failures per 10,000 cars against 5 per 10,000. Readers are advised to avoid the model.",
    },
    trap: "relative-vs-absolute-risk",
    explanation: {
      en: "The gap is 2 extra failures per 10,000 cars, so 9,998 owners in 10,000 notice no difference at all, and the 40 percent describes a change to an already tiny number.",
    },
  },
  {
    id: "ra-lottery",
    scenario: {
      en: "A lottery app tells users that buying a second ticket doubles their chance of taking the jackpot, and pushes a two ticket bundle at checkout. A single ticket wins the jackpot about once in 14 million draws.",
    },
    trap: "relative-vs-absolute-risk",
    explanation: {
      en: "Doubling moves the chance from about 1 in 14 million to about 2 in 14 million, an increase of roughly one chance in 14 million, which is why the proportional wording sounds far larger than the actual change.",
    },
  },
  {
    id: "ra-fleet",
    scenario: {
      en: "An airline advertisement says its new fleet has cut a particular in flight fault by 60 percent. The maintenance log behind the claim shows the fault used to occur on about 5 flights per million and now occurs on about 2 per million.",
    },
    trap: "relative-vs-absolute-risk",
    explanation: {
      en: "That is 3 fewer faults per million flights, so a passenger's chance was already about 1 in 200,000 before the new fleet arrived and the headline percentage sits on a very small starting number.",
    },
  },
  {
    id: "ra-savings",
    scenario: {
      en: "A bank advertises that its new account pays 50 percent more interest than the old one. The old account paid 0.2 percent a year and the new one pays 0.3 percent. A saver moves a 2,000 dollar balance across, expecting a noticeable difference.",
    },
    trap: "relative-vs-absolute-risk",
    explanation: {
      en: "On 2,000 dollars the switch is worth 6 dollars a year instead of 4, a gain of 2 dollars, because 50 percent more of a very small rate is still a very small rate.",
    },
  },
  {
    id: "ra-snack",
    scenario: {
      en: "A newspaper reports that eating a particular snack every day raises the chance of a rare bowel condition by 25 percent, and shoppers start avoiding it. The figures behind the story are 4 cases per 10,000 people over ten years among non eaters and 5 per 10,000 among daily eaters.",
    },
    trap: "relative-vs-absolute-risk",
    explanation: {
      en: "The difference is 1 extra case per 10,000 people across a decade, so 9,999 in 10,000 are unaffected either way and the 25 percent applies to an outcome that was already rare.",
    },
  },
  {
    id: "ra-nnt",
    scenario: {
      en: "A clinic leaflet says a daily tablet cuts the chance of a particular event over five years from 4 in 1,000 to 3 in 1,000, a reduction of a quarter. The leaflet adds that this means about one patient in four will be spared the event.",
    },
    trap: "relative-vs-absolute-risk",
    explanation: {
      en: "Only 1 patient in 1,000 avoids the event, so about 1,000 people must take the tablet for five years for one to benefit; the quarter describes how much a small chance shrank, not the share of patients helped.",
    },
  },
  {
    id: "ra-ratio",
    scenario: {
      en: "A factory's internal report gives the risk ratio for injuries after a new floor marking scheme as 0.47. The staff newsletter announces that the scheme has cut injuries by 47 percent, and the plant manager repeats that figure to the board.",
    },
    trap: "relative-vs-absolute-risk",
    explanation: {
      en: "A ratio of 0.47 means injuries fell to 47 percent of the old level, which is a fall of 53 percent, so the newsletter has reported the share that remains as though it were the share removed.",
    },
  },
  {
    id: "ra-stove",
    scenario: {
      en: "A home insurer tells customers that fitting a certain type of wood stove triples the chance of a fire claim, and raises those premiums by a third. Its own data show 1 claim per 10,000 insured homes a year without the stove and 3 per 10,000 with it.",
    },
    trap: "relative-vs-absolute-risk",
    explanation: {
      en: "The extra chance is 2 fire claims per 10,000 homes a year, so 9,997 homes in 10,000 with the stove make no claim, and tripling something rare leaves it rare.",
    },
  },
  // ---- confounding-by-indication, second wave ----
  {
    id: "ci-tutoring",
    scenario: {
      en: "A school picks pupils for extra tutoring on the basis of which ones teachers judge most likely to fail. At the end of the year the tutored pupils score lower on average than the rest, and a governors' report calls the tutoring ineffective and recommends closing it.",
    },
    trap: "confounding-by-indication",
    explanation: {
      en: "Teachers chose pupils for tutoring precisely because they were already heading for a poor result, so the tutored group started further behind and the tutoring is blamed for the reason it was offered.",
    },
  },
  {
    id: "ci-retention",
    scenario: {
      en: "A phone company calls customers its model flags as most likely to leave and offers them a discount. Over the next quarter those customers cancel more often than customers who got no call. The analysis concludes that retention calls push people out of the door.",
    },
    trap: "confounding-by-indication",
    explanation: {
      en: "The call went only to customers already judged most likely to cancel, so the flag that triggered the call, not the call itself, explains their higher cancellation rate.",
    },
  },
  {
    id: "ci-servicing",
    scenario: {
      en: "A plant sends a machine for early servicing whenever an operator reports an unusual noise. An audit finds that machines serviced early broke down more often the following year than machines left alone, and recommends servicing less.",
    },
    trap: "confounding-by-indication",
    explanation: {
      en: "The noise that prompted early servicing was itself a sign of a machine on its way to failing, so the servicing takes the blame for the condition that selected it.",
    },
  },
  {
    id: "ci-workshop",
    scenario: {
      en: "Places on a prison workshop scheme are limited, so staff give them to the inmates they judge most motivated and least likely to offend again. Two years on, scheme graduates have far lower reoffending, and the governor presents this as proof the scheme works.",
    },
    trap: "confounding-by-indication",
    explanation: {
      en: "Staff selected participants using their own judgement of who would reoffend, which is the very outcome being measured, so the places went to the men already likely to do best.",
    },
  },
  {
    id: "ci-loanterms",
    scenario: {
      en: "A bank rewrites the terms of a loan as soon as the account shows early signs of strain. A year later, rewritten loans have defaulted more often than the rest of the book, and the credit committee concludes that rewriting terms encourages default.",
    },
    trap: "confounding-by-indication",
    explanation: {
      en: "The rewrite was triggered by warning signs that already predicted default, so the rewritten loans began from a worse position that the comparison never accounted for.",
    },
  },
  {
    id: "ci-mentoring",
    scenario: {
      en: "An employer assigns a senior mentor to the graduate recruits its managers rate as highest potential. Three years later the mentored recruits have been promoted twice as often as the others, and the internal newsletter credits the mentoring scheme.",
    },
    trap: "confounding-by-indication",
    explanation: {
      en: "Managers picked mentees on a judgement of who would rise fastest, so the mentored group was already on the quicker track before any mentoring happened.",
    },
  },
  {
    id: "ci-carehome",
    scenario: {
      en: "A care home moves residents to its specialist wing when staff judge that they are declining fastest. A quality review finds that residents in the specialist wing die sooner than those on ordinary floors, and questions whether the wing should stay open.",
    },
    trap: "confounding-by-indication",
    explanation: {
      en: "The move was decided by how fast a resident was already declining, and that decline, not the wing, drives the difference in how long they lived.",
    },
  },
  {
    id: "ci-shoulder",
    scenario: {
      en: "A clinic offers its intensive shoulder programme only to patients who can already raise the arm to shoulder height, since the exercises need it. Those patients regain full movement far more often than the rest, and the clinic advertises the programme as its most effective treatment.",
    },
    trap: "confounding-by-indication",
    explanation: {
      en: "The entry rule handed the programme the patients whose shoulders were least damaged to begin with, so the people most likely to recover anyway are the ones being counted.",
    },
  },
  // ---- length-time-bias, second wave ----
  {
    id: "lg-brakes",
    scenario: {
      en: "A fleet inspects every van once a year. Vans whose brake faults were picked up at inspection go on to have far fewer roadside breakdowns than vans whose faults turned up in between. The workshop manager concludes that the annual inspection catches the dangerous faults.",
    },
    trap: "length-time-bias",
    explanation: {
      en: "A yearly check can only find wear slow enough to still be half formed on the day the inspector calls; anything that goes from sound to broken inside a year declares itself between visits. The inspected group is therefore stacked with the gradual faults from the outset.",
    },
  },
  {
    id: "lg-fraud",
    scenario: {
      en: "A card issuer reviews merchant accounts once a month. Accounts stopped by the review have cost the issuer far less on average than accounts reported by cardholders between reviews. The risk team reports that the monthly review is holding losses down.",
    },
    trap: "length-time-bias",
    explanation: {
      en: "A scheme that opens, drains and vanishes within days sits entirely between two reviews, so the review can only catch the slow, low value operations. Those were the cheaper ones before anyone intervened.",
    },
  },
  {
    id: "lg-audit",
    scenario: {
      en: "A software team audits its codebase every quarter. Defects the audit finds are rated far less severe than those users report between audits. The engineering lead writes that auditing removes problems before they can turn serious.",
    },
    trap: "length-time-bias",
    explanation: {
      en: "A defect that crashes the app is reported by a user within hours of shipping, long before the next quarterly pass, leaving the audit only the quiet long lived ones. Those were the mild defects already, not defects the audit made mild.",
    },
  },
  {
    id: "lg-survey",
    scenario: {
      en: "A housing association surveys each block once every five years. Defects found by the survey are almost always cosmetic, while the serious ones, a collapsed ceiling or a burst tank, arrive as emergency calls. The association reports that its survey programme keeps defects minor.",
    },
    trap: "length-time-bias",
    explanation: {
      en: "A defect that takes years to develop is present, and still small, whichever year the surveyor happens to call. One that develops in a fortnight almost certainly falls between two surveys and comes in as an emergency instead.",
    },
  },
  {
    id: "lg-lines",
    scenario: {
      en: "A grid operator surveys its lines from the air twice a year. Faults seen on a survey are almost always minor, and the faults behind most outages had never appeared on one. The operator's report credits the surveys with keeping serious faults rare.",
    },
    trap: "length-time-bias",
    explanation: {
      en: "Only damage that creeps along for months is still sitting there to be photographed when the aircraft passes. Damage that goes from intact to failed in a fortnight becomes an outage before any survey can see it, so the surveyed set is minor by construction.",
    },
  },
  {
    id: "lg-dental",
    scenario: {
      en: "A dental practice recalls its patients every eighteen months. Problems found at recall are nearly always fixable with a filling, while most extractions come from patients who telephone in pain between appointments. The practice tells patients that regular recall prevents extractions.",
    },
    trap: "length-time-bias",
    explanation: {
      en: "Decay that creeps along for years is present, and still small, whenever the recall falls. A tooth that goes from sound to abscessed in three months announces itself before the next appointment, so the recall sees the slow problems and little else.",
    },
  },
  {
    id: "lg-workplace",
    scenario: {
      en: "A large employer offers a lung scan every two years. Employees whose disease is found at a scan need much less urgent treatment than those who arrive breathless at the clinic between rounds. Occupational health reports that scanning catches disease while it is still controllable.",
    },
    trap: "length-time-bias",
    explanation: {
      en: "Disease that progresses over many years is detectable at whichever round comes along, while disease that goes from nothing to breathless inside two years surfaces between rounds. The scanned group is loaded with the milder illness before any treatment starts.",
    },
  },
  {
    id: "lg-interval",
    scenario: {
      en: "A clinic lengthens its check up interval from one year to three. The cases it now picks up look milder on average than the ones it used to find, and the clinical lead takes this as evidence that the longer interval suits patients better.",
    },
    trap: "length-time-bias",
    explanation: {
      en: "Stretching the gap gives fast moving disease more room to appear and declare itself between visits, so a larger share of what the check up still finds is the slow moving kind. The milder mix reflects what the interval now misses, not better care.",
    },
  },
  // ---- publication-bias, second wave ----
  {
    id: "pb-abtest",
    scenario: {
      en: "A company's product newsletter runs a write up whenever an experiment beats the current design. Teams whose tests showed no difference tend to move on without writing anything. A new joiner reads a year of newsletters and concludes that almost every idea here lifts sign ups.",
    },
    trap: "publication-bias",
    explanation: {
      en: "Only the experiments that won were written up, so the newsletter records a small winning slice of the year's tests while the flat and losing ones never appeared anywhere the new joiner could read them.",
    },
  },
  {
    id: "pb-bootcamp",
    scenario: {
      en: "A training provider's homepage carries fifteen graduate stories, each describing a good job within months of finishing. The stories came from graduates who answered a request for success stories. A prospective student reads them and concludes the course almost always leads to work.",
    },
    trap: "publication-bias",
    explanation: {
      en: "The page gathers only graduates who had a success to report, so those who finished the course and found nothing are missing from the evidence the student is weighing.",
    },
  },
  {
    id: "pb-forum",
    scenario: {
      en: "On a woodworking forum, members post photographs of finished cabinets, and the build threads run to hundreds of admiring replies. A newcomer reads twenty of them and decides the design is straightforward enough for a first project.",
    },
    trap: "publication-bias",
    explanation: {
      en: "Builds that were abandoned halfway never get a thread, so the forum shows the attempts that worked and gives no sign of how often the design defeated someone.",
    },
  },
  {
    id: "pb-casestudy",
    scenario: {
      en: "A software vendor's website hosts twelve customer case studies, each with a chart of improved results. The vendor decides which pilots to turn into case studies after seeing how they went. A buyer reads all twelve and signs a three year contract.",
    },
    trap: "publication-bias",
    explanation: {
      en: "The vendor wrote up only the pilots that turned out well, so the twelve studies are the flattering end of a larger set of pilots whose disappointing results were never put on the site.",
    },
  },
  {
    id: "pb-allotment",
    scenario: {
      en: "An allotment association's newsletter has carried enthusiastic reports of a plant feed for ten years. Members who noticed a big difference send in a report; members who noticed nothing rarely bother. The committee votes to buy the feed in bulk for every plot.",
    },
    trap: "publication-bias",
    explanation: {
      en: "Only growers who saw an effect wrote in, so a decade of newsletters preserves the striking results and leaves out every plot where the feed changed nothing.",
    },
  },
  {
    id: "pb-leaderboard",
    scenario: {
      en: "A research group posts a blog each time a new network design beats the standard benchmark, and quietly shelves the runs that did not. A reader tallies such posts across several groups and writes that progress in the field is accelerating sharply.",
    },
    trap: "publication-bias",
    explanation: {
      en: "Runs that failed to beat the benchmark were never posted, so the tally counts the successes drawn from far more attempts and reads a filtered record as though it were the rate of progress.",
    },
  },
  {
    id: "pb-smallstudies",
    scenario: {
      en: "Someone collects every published trial of a supplement and notices that the small trials report much larger benefits than the large ones. He averages all of them together and reports a clear overall benefit.",
    },
    trap: "publication-bias",
    explanation: {
      en: "A small trial that found nothing is easy to leave unwritten, while a small trial that happened to land a striking result gets submitted, so the small studies on show are the lucky ones and averaging them pushes the estimate up.",
    },
  },
  {
    id: "pb-novelty",
    scenario: {
      en: "A journal's guidance for authors says it looks for findings that are surprising and change how readers think. A student reviews ten years of its issues and concludes that effects in this field are usually large.",
    },
    trap: "publication-bias",
    explanation: {
      en: "The journal chose papers by how striking the result was, so modest and flat findings were turned away or never submitted, and the ten years the student read contain none of them.",
    },
  },
  // ---- intention-to-treat, second wave ----
  {
    id: "itt-savings",
    scenario: {
      en: "A bank randomly gives half of its new savers an automatic top up feature and the rest a standard account. Its year end report compares average balances among savers still paying in after twelve months, and finds the feature far ahead.",
    },
    trap: "intention-to-treat",
    explanation: {
      en: "Whether someone was still paying in at twelve months was settled after the random split, and the feature itself affects who keeps going, so the sets compared are no longer the groups the allocation created.",
    },
  },
  {
    id: "itt-nonstarters",
    scenario: {
      en: "Classes are randomly allocated to a new reading scheme or to the usual lessons. Twelve allocated classes never got the scheme running, so the evaluators move them into the comparison group, saying the figures should reflect what actually happened in the classroom.",
    },
    trap: "intention-to-treat",
    explanation: {
      en: "Which classes failed to start was determined after allocation, probably by the schools least able to run anything new, so shifting them loads the comparison group with the weakest classes.",
    },
  },
  {
    id: "itt-movers",
    scenario: {
      en: "An employer randomly assigns supervisors to a management course or to nothing. Anyone who changed department during the year is then left out of the analysis, in both groups alike, because the evaluator says their results would not be comparable.",
    },
    trap: "intention-to-treat",
    explanation: {
      en: "Department moves happened after the assignment, and the course itself can prompt or prevent them, so the filter removes a different sort of person from each group.",
    },
  },
  {
    id: "itt-quitline",
    scenario: {
      en: "A council randomly assigns smokers to a quit programme or to a leaflet. The final report covers only those who turned up to the four week check, since the rest could not be verified. Attendance was 70% in the programme arm and 90% in the leaflet arm.",
    },
    trap: "intention-to-treat",
    explanation: {
      en: "Turning up to the check happened after assignment and at very different rates in the two arms, and the people likeliest to be missing from the programme arm are those who went back to smoking.",
    },
  },
  {
    id: "itt-orchards",
    scenario: {
      en: "Farms are randomly allocated a new pest control routine or their usual one. Farms that sprayed late or missed a spray are dropped, and so are farms in the other group whose records had gaps. The routine comes out strongly ahead.",
    },
    trap: "intention-to-treat",
    explanation: {
      en: "Whether a farm followed the routine was decided after allocation and reflects how well it is run, so the best run farms in one group are being set against a differently filtered set in the other.",
    },
  },
  {
    id: "itt-drivers",
    scenario: {
      en: "An insurer randomly fits a driving feedback device to half of its new policies. Drivers who unplugged the device are dropped from that group, and drivers in the other group who bought one privately are dropped from theirs. The remaining comparison shows far fewer claims with the device.",
    },
    trap: "intention-to-treat",
    explanation: {
      en: "Unplugging a device and buying one privately both happened after the random split and mark out very different drivers, so what is left is two self selected sets rather than the groups the allocation made.",
    },
  },
  // ---- recall-bias, second wave ----
  {
    id: "rb-brochure",
    scenario: {
      en: "Travellers whose holiday went badly are asked what the brochure promised about the hotel, and their answers are set against those of travellers who enjoyed the same trip. The operator's complaints team treats the gap as evidence of mis-selling.",
    },
    trap: "recall-bias",
    explanation: {
      en: "People whose holiday disappointed them have already been back over what they were told looking for a broken promise, while the satisfied travellers have never revisited the brochure.",
    },
  },
  {
    id: "rb-smell",
    scenario: {
      en: "After a food company recalls a batch, buyers are phoned and asked whether anything seemed odd about the smell. Those who fell ill report an odd smell far more often, and the report concludes the smell was a reliable warning sign.",
    },
    trap: "recall-bias",
    explanation: {
      en: "Buyers who got ill have replayed the meal hunting for something wrong with it, while those who felt fine had no reason to think about the smell at all.",
    },
  },
  {
    id: "rb-bend",
    scenario: {
      en: "A road safety survey asks drivers how fast they usually take a particular bend. Drivers who have crashed there give very different figures from drivers who have not, and the survey uses the gap to set a recommended limit.",
    },
    trap: "recall-bias",
    explanation: {
      en: "A driver who crashed at that bend has gone over the moment repeatedly and knows how it ended, so the speed now reported is reconstructed from the crash rather than independent of it.",
    },
  },
  {
    id: "rb-adviser",
    scenario: {
      en: "A regulator asks customers who lost money on an investment what the salesperson said about the risk, and compares their accounts with those of satisfied customers who bought the same product from the same team.",
    },
    trap: "recall-bias",
    explanation: {
      en: "Customers sitting on a loss have gone back through the conversation looking for a reassurance that should never have been given, while satisfied customers have had no reason to replay it.",
    },
  },
  {
    id: "rb-homework",
    scenario: {
      en: "Parents of pupils who failed their final exams are asked how much homework the school set three years earlier, alongside parents of pupils who passed. The parents of failing pupils report much less, and a campaign group blames the school.",
    },
    trap: "recall-bias",
    explanation: {
      en: "Parents whose children failed have been searching for an explanation ever since the results came out, so their account of past homework is produced by the outcome rather than measured independently of it.",
    },
  },
  {
    id: "rb-buffet",
    scenario: {
      en: "After an outbreak of illness following a conference dinner, attendees are asked which dishes they ate. Those who fell ill much more often say they had the seafood, and the report names it as the source.",
    },
    trap: "recall-bias",
    explanation: {
      en: "Attendees who became ill have reconstructed the meal trying to work out what caused it, so they account for their plate far more thoroughly than guests who never thought about dinner again.",
    },
  },
  // ---- immortal-time-bias, second wave ----
  {
    id: "it-loyaltyaward",
    scenario: {
      en: "A company reports that staff who received its five year loyalty award go on to average eleven years with the firm, against three years for everyone else, counted from each person's start date. HR presents the award as proof that recognition keeps people.",
    },
    trap: "immortal-time-bias",
    explanation: {
      en: "Receiving the award required staying five years, so anyone who left sooner cannot be in that group at all, and those five guaranteed years are counted into its average.",
    },
  },
  {
    id: "it-upgrade",
    scenario: {
      en: "A subscription service reports that customers who ever moved to its premium tier stay subscribed four times longer than customers who never did, measured from the day each one signed up. Marketing pushes the upgrade at new customers on the strength of it.",
    },
    trap: "immortal-time-bias",
    explanation: {
      en: "A customer had to still be subscribed in order to upgrade, so everyone who left early lands automatically in the other group, and the months before the upgrade are credited to premium.",
    },
  },
  {
    id: "it-cupfinal",
    scenario: {
      en: "A sports channel reports that clubs reaching the cup final went an average of nine weeks unbeaten in the competition, far better than clubs knocked out early, and puts it down to the finalists' training methods.",
    },
    trap: "immortal-time-bias",
    explanation: {
      en: "Reaching the final required winning every earlier round, so those weeks cannot contain a defeat for any club in that group; the unbeaten run is the entry condition rather than a result of training.",
    },
  },
  {
    id: "it-fleet",
    scenario: {
      en: "A delivery firm refurbishes each van at five years old. It reports that refurbished vans last on average four years longer than the rest of the fleet, measuring every van's life from the day it was bought, and orders more refurbishments.",
    },
    trap: "immortal-time-bias",
    explanation: {
      en: "A van had to still be running at five years to be refurbished, so vans that failed before then can only be in the other group, and those first five years are credited to refurbishment.",
    },
  },
  {
    id: "it-dissertation",
    scenario: {
      en: "A college reports that students who submitted the optional final year dissertation were far less likely to have left before graduating than students who did not, counted from enrolment, and proposes making the dissertation compulsory.",
    },
    trap: "immortal-time-bias",
    explanation: {
      en: "Submitting required still being enrolled in the final year, so every student who left earlier falls automatically into the other group and cannot count against the dissertation.",
    },
  },
  {
    id: "it-noclaims",
    scenario: {
      en: "An insurer reports that drivers who earned its five year no claims discount average far fewer claims per year of cover than other drivers, counted from the day each policy began, and advertises the discount as something that makes people drive better.",
    },
    trap: "immortal-time-bias",
    explanation: {
      en: "Earning the discount required five years without a claim, so those claim free years are built into the group by definition and any driver who crashed early could never appear in it.",
    },
  },
  // ---- Genuinely sound reasoning (more decoys), second wave ----
  {
    id: "ok-cells-all-agree",
    scenario: {
      en: "A firm reports that offers made by its retrained recruiters were accepted 71% of the time against 62% for the rest. The appendix tables show the retrained group ahead in every role family and at every seniority level.",
    },
    trap: null,
    explanation: {
      en: "The headline gap points the same way as every published subgroup, so no mix of roles can be producing it; a hasty player would accuse the aggregate of hiding a reversal it has already ruled out.",
    },
  },
  {
    id: "ok-common-route-mix",
    scenario: {
      en: "Two bus depots are compared on punctuality. Because one runs far more rural routes than the other, the report recalculates both depots using a single common mix of route types, and prints the mix it used.",
    },
    trap: null,
    explanation: {
      en: "Standardising both depots to one route mix removes the difference in case mix before comparing, which is exactly the correction a pooled figure needs; a hasty player would accuse it of lumping unlike routes together.",
    },
  },
  {
    id: "ok-arms-balanced",
    scenario: {
      en: "An online store sends each visitor at random to one of two checkout designs, and design B converts better overall. The report notes that the share of new and returning visitors came out almost identical in the two arms.",
    },
    trap: null,
    explanation: {
      en: "With the visitor mix verified as the same in both arms, the pooled result is a weighted average using identical weights, so a reversal inside the segments is arithmetically impossible; a hasty player would demand the segments be split out.",
    },
  },
  {
    id: "ok-flag-share-fraud",
    scenario: {
      en: "A bank's model flags card transactions for review. Before quoting a figure to the fraud team, the analyst combines the flag rate with how often transactions in that category actually turn out to be fraudulent, and reports the share of flagged transactions that are genuine fraud.",
    },
    trap: null,
    explanation: {
      en: "The number quoted is the chance of fraud given a flag, worked out using how common fraud is, rather than the model's accuracy read backwards; a hasty player would accuse the team of confusing the two.",
    },
  },
  {
    id: "ok-defects-common",
    scenario: {
      en: "A vision system catches nearly every cracked casting and wrongly marks about one sound casting in twenty. On this line roughly a third of castings really are cracked. The supervisor tells the crew a marked casting is probably cracked and sends marked ones for rework.",
    },
    trap: null,
    explanation: {
      en: "With a third of castings genuinely cracked, marked parts are cracked around nine times in ten, so the condition needed for false alarms to swamp true ones is absent; a hasty player would object to accuracy being read as the chance of a crack.",
    },
  },
  {
    id: "ok-flagged-essays",
    scenario: {
      en: "A text checker flags about 3% of original essays and nearly all copied ones. On a module where past audits found roughly one submission in five was copied, the tutor treats a flag as good reason to open an investigation rather than as proof.",
    },
    trap: null,
    explanation: {
      en: "Copying is common enough here that a flag makes it much more likely than not, and the conclusion drawn is only to investigate; a hasty player would accuse the tutor of reading the checker's accuracy as the chance of copying.",
    },
  },
  {
    id: "ok-voucher-lottery",
    scenario: {
      en: "An online grocer picks half its customers at random to receive a free delivery voucher and holds the rest back. Over the next three months the voucher group spends more, and the company reports that the voucher raised spending.",
    },
    trap: null,
    explanation: {
      en: "Chance decided who got a voucher, so the difference cannot come from the sort of customer who would have sought one out; a hasty player would accuse the grocer of reading cause off an association.",
    },
  },
  {
    id: "ok-lighting-lottery",
    scenario: {
      en: "A council can afford to relight only twelve of its forty districts this year and draws the twelve by lot. Night collisions then fall in the relit districts over the following year and hold steady in the rest, and the council credits the lighting.",
    },
    trap: null,
    explanation: {
      en: "The lot decided which districts were treated, so the untouched districts are a fair comparison over the same period; a hasty player would dismiss it as a before and after story with no control.",
    },
  },
  {
    id: "ok-clubs-association-only",
    scenario: {
      en: "A district notes that schools running more after school clubs have better attendance. Its report says the two go together, adds that clubs are commoner in better funded schools, and asks for a small trial before any wider rollout.",
    },
    trap: null,
    explanation: {
      en: "The report stops at an association, names the obvious alternative explanation, and calls for an experiment instead of acting; a hasty player would accuse it of proposing a rollout on the strength of a pattern.",
    },
  },
  {
    id: "ok-whole-portfolio",
    scenario: {
      en: "A fund publishes the average return across every company it backed in its first five years, including the fourteen that closed and the four sold at a loss, and states how each was valued.",
    },
    trap: null,
    explanation: {
      en: "The failures sit in the denominator beside the successes, so the average is not computed from the companies that lasted; a hasty player would assume only the winners were counted.",
    },
  },
  {
    id: "ok-every-enrolment",
    scenario: {
      en: "A flying school reports what share of trainees reach a licence. The figure counts everyone who enrolled in a given year, including those who left partway through and those who failed the final check.",
    },
    trap: null,
    explanation: {
      en: "The denominator is the entry cohort rather than the group who finished, so leavers cannot inflate the pass rate; a hasty player would assume the number came only from trainees still flying.",
    },
  },
  {
    id: "ok-units-sold",
    scenario: {
      en: "A manufacturer reports pump faults per thousand units sold, taking faults from the warranty claim file and the denominator from the sales register rather than from the units brought into its workshops. This year's model comes out ahead of last year's on the same two sources.",
    },
    trap: null,
    explanation: {
      en: "Every unit sold sits in the denominator, including those that never came back, so neither year's rate is computed only among the pumps that turned up for repair; a hasty player would assume the figures came from the workshop queue.",
    },
  },
  {
    id: "ok-tread-narrows",
    scenario: {
      en: "An examiner testifies that the tyre pattern from the scene appears on about one van in three hundred, and adds that with roughly nine hundred vans registered in the area, some three of them would carry the same pattern.",
    },
    trap: null,
    explanation: {
      en: "The rarity figure is turned into how many other vehicles would match, presenting the mark as narrowing the field rather than as a chance of innocence; a hasty player would expect the small number to be flipped into a probability of guilt.",
    },
  },
  {
    id: "ok-many-clerk-months",
    scenario: {
      en: "An auditor finds that one clerk's rounding pattern would arise by chance in about one month in five hundred. Noting that two hundred clerks were reviewed across twelve months, the auditor asks for a routine check of that ledger rather than a referral.",
    },
    trap: null,
    explanation: {
      en: "Across 2,400 clerk months such a pattern is expected several times by chance, and the response is scaled to that; a hasty player would accuse the auditor of treating a rare coincidence as evidence of wrongdoing.",
    },
  },
  {
    id: "ok-odds-updated",
    scenario: {
      en: "An investigator reports that this claim pattern is about forty times more likely when a claim is fraudulent than when it is honest. Since roughly one claim in a thousand is fraudulent, she puts the chance this one is fraudulent at about one in twenty five and opens a file.",
    },
    trap: null,
    explanation: {
      en: "The strength of the evidence is combined with how common fraud is, giving the chance of fraud given the pattern rather than the reverse; a hasty player would expect the forty fold figure itself to be quoted as the odds of guilt.",
    },
  },
  {
    id: "ok-same-divisions",
    scenario: {
      en: "A youth league keeps the same clubs in the same two divisions for two seasons running, with no promotions or relegations in between. Average match attendance rose in both divisions in the second season.",
    },
    trap: null,
    explanation: {
      en: "No club moved between divisions, so a rise in both cannot come from shuffling teams from one group into the other; a hasty player would suspect the categories had been rearranged between the seasons.",
    },
  },
  {
    id: "ok-regraded-both-years",
    scenario: {
      en: "A council changed how it grades road defects in 2023. To compare repair times with 2019, it first re-graded every 2019 record under the current rules, then compared grade by grade.",
    },
    trap: null,
    explanation: {
      en: "Both years are sorted by identical rules, so an improvement within a grade cannot be produced by defects sliding between grades; a hasty player would assume the new grading had quietly reshuffled the categories.",
    },
  },
  {
    id: "ok-failures-per-mile",
    scenario: {
      en: "A rail operator fits sensors that pick up bearing wear months before a bearing would fail in service. In the two years after fitting, in service bearing failures per million miles run fell by about a third.",
    },
    trap: null,
    explanation: {
      en: "The measure is how often failures occur per mile, not how long the operator knew about a fault beforehand, so spotting problems earlier cannot by itself move the number; a hasty player would assume earlier detection was doing the work.",
    },
  },
  {
    id: "ok-clock-from-impact",
    scenario: {
      en: "A team installs monitoring that alerts it to outages far sooner. Its quarterly report measures the time from the first affected customer request, taken from server logs, to full recovery, and shows that this fell after the tool went in.",
    },
    trap: null,
    explanation: {
      en: "The clock starts at the moment of impact rather than at detection, so learning of an outage earlier cannot stretch the measured interval; a hasty player would assume earlier alerts manufactured the improvement.",
    },
  },
  {
    id: "ok-same-applicant-pool",
    scenario: {
      en: "A lender builds a repayment risk model and tests it on applicants from the same branches, income range and loan sizes where it will be used. Accuracy is reported separately for applicants with long credit histories and for those with almost none.",
    },
    trap: null,
    explanation: {
      en: "The test population matches the one the model will run on and performance is broken out by how hard the cases are, so a figure earned on an easier mix is not being carried across; a hasty player would assume it was validated on obvious cases.",
    },
  },
  {
    id: "ok-revalidated-plots",
    scenario: {
      en: "A soil test's published accuracy came from severely degraded plots. Before recommending it, a co-op ran the test again on ordinary member farms and quotes those second figures, not the original ones, in its guidance.",
    },
    trap: null,
    explanation: {
      en: "The test was measured again in the ordinary fields where it will actually be used, so the easy contrast of the original setting is not passed off as everyday performance; a hasty player would attack the original validation.",
    },
  },
  {
    id: "ok-scoped-crack-size",
    scenario: {
      en: "An inspection rig's detection rate was measured on cracks longer than two millimetres. The report says so plainly, notes that shorter cracks were not tested, and the plant uses the rig only as a check on the longer class.",
    },
    trap: null,
    explanation: {
      en: "The stated accuracy stays tied to the crack sizes it was measured on and use is limited to that range, so it is never applied to a harder mix; a hasty player would accuse the plant of importing a number from an easy test set.",
    },
  },
  {
    id: "ok-all-applicants-measured",
    scenario: {
      en: "A firm asks whether its coding test score and its interview rating agree. Both are recorded for every applicant before any shortlist is drawn, and across all applicants the two rise together mildly.",
    },
    trap: null,
    explanation: {
      en: "The pair is measured on everyone who applied rather than only on those who cleared a bar that both scores helped set, so selection cannot manufacture the relationship; a hasty player would assume the sample had been filtered on both.",
    },
  },
  {
    id: "ok-county-register",
    scenario: {
      en: "A county register covering every resident, not only those who were admitted somewhere, reports that two conditions occur together a little more often than chance alone would give.",
    },
    trap: null,
    explanation: {
      en: "The pattern comes from the whole resident population rather than from people filtered in by admission, so it is not an artefact of both conditions raising the odds of being in the sample; a hasty player would assume a hospital roster.",
    },
  },
  {
    id: "ok-helmet-counts",
    scenario: {
      en: "A safety body reports that the new helmet standard cut serious head injuries by about a quarter, and adds that in the riders studied this meant roughly 12 serious injuries per 10,000 a year falling to about 9.",
    },
    trap: null,
    explanation: {
      en: "The proportional figure is given with the counts it came from, so the size of the benefit cannot be inflated in the reader's head; a hasty player would object to the percentage before noticing the numbers behind it.",
    },
  },
  {
    id: "ok-filter-counts",
    scenario: {
      en: "A vendor's brochure says its filter cuts successful phishing by about 60%, and states directly below that in the trial this was 12 staff in every 1,000 falling to about 5 over a year.",
    },
    trap: null,
    explanation: {
      en: "The relative claim is anchored to absolute numbers in the same place, letting the reader see how large the change really is; a hasty player would reject the headline percentage as unanchored marketing.",
    },
  },
  {
    id: "ok-label-counts",
    scenario: {
      en: "A drink maker's label gives the trial counts behind its claim, 14 cases of a stomach complaint among 5,000 users of the new formula against 18 among 5,000 of the old, and calls the difference small and not certain.",
    },
    trap: null,
    explanation: {
      en: "The counts are shown and the conclusion is scaled down to match them rather than being dressed up as a 22% reduction; a hasty player would expect a percentage to be doing the persuading.",
    },
  },
  {
    id: "ok-same-indication-newusers",
    scenario: {
      en: "Two painkillers are compared using patients who started one or the other for the same recorded complaint, at the same clinics, restricted to people who had taken neither before. Side effect rates come out similar.",
    },
    trap: null,
    explanation: {
      en: "Comparing first time users of two drugs given for the same complaint means both groups were treated for the same reason, so the reason for prescribing is not what separates them; a hasty player would assume sicker patients got one of the drugs.",
    },
  },
  {
    id: "ok-tutoring-lottery",
    scenario: {
      en: "More pupils apply for extra tutoring than a council can fund, so places are drawn by lot. The evaluation compares later grades between pupils who were drawn and pupils who applied but were not.",
    },
    trap: null,
    explanation: {
      en: "Everyone in both groups wanted the tutoring and only chance decided who received it, so the tutored pupils are not the ones judged to need it most; a hasty player would assume places went to those struggling hardest.",
    },
  },
  {
    id: "ok-even-fleet-numbers",
    scenario: {
      en: "A haulier puts a new engine oil in every truck whose fleet number ends in an even digit and keeps the rest on the old oil. After a year it compares breakdown rates between the two halves.",
    },
    trap: null,
    explanation: {
      en: "The last digit is arbitrary and has nothing to do with a truck's age or condition, so the treated trucks are not the ones a mechanic thought needed help; a hasty player would assume the worst trucks were picked for the new oil.",
    },
  },
  {
    id: "ok-advanced-case-rate",
    scenario: {
      en: "A region that began offering a regular check reports how many residents per 100,000 are found with advanced disease each year. That figure falls over the following decade while neighbouring regions stay flat.",
    },
    trap: null,
    explanation: {
      en: "Fewer advanced cases arising in the whole population cannot be produced by a check that merely finds slow growing cases sooner; a hasty player would expect survival among detected cases to be the number on offer.",
    },
  },
  {
    id: "ok-sampled-by-open-date",
    scenario: {
      en: "An analyst measuring how long support tickets stay open takes every ticket opened in a given month last year and follows each one to its closure, rather than looking at the tickets sitting in the queue today.",
    },
    trap: null,
    explanation: {
      en: "Sampling by opening date gives quick and slow tickets the same chance of entering the sample, while a snapshot of the queue would be crowded with the ones that linger; a hasty player would assume the long cases dominate.",
    },
  },
  {
    id: "ok-all-filed-trials",
    scenario: {
      en: "A national medicines agency reviews a treatment using every trial the maker was required to file with it, including three whose results were never written up anywhere, and pools them all.",
    },
    trap: null,
    explanation: {
      en: "The pool is defined by what had to be filed rather than by what reached a journal, so dull results are still in it; a hasty player would assume the review was built from the literature.",
    },
  },
  {
    id: "ok-all-experiments-listed",
    scenario: {
      en: "A product team's quarterly memo lists the outcome of all forty tests it ran that quarter, including the twenty seven that moved nothing, alongside the four whose results it acted on.",
    },
    trap: null,
    explanation: {
      en: "Every experiment run is reported, so the ones that worked are read against the full set of attempts; a hasty player would assume only the wins were written up.",
    },
  },
  {
    id: "ok-small-trials-checked",
    scenario: {
      en: "Before averaging fifteen field trials of a fertiliser, an analyst compares the small trials with the large ones and notes that the small ones landed below the overall average as often as above it.",
    },
    trap: null,
    explanation: {
      en: "The check for missing unfavourable small studies was made and came out clean, which is the very thing that would otherwise tilt the average; a hasty player would assume the small trials were the ones cherry picked.",
    },
  },
  {
    id: "ok-everyone-offered",
    scenario: {
      en: "A city offers a free three month transit pass to a randomly chosen half of newly registered residents. The evaluation compares car trips between everyone offered a pass and everyone not offered, including the third who never collected theirs.",
    },
    trap: null,
    explanation: {
      en: "People are counted in the group they were offered, so those keen enough to collect a pass are not being measured against everybody else; a hasty player would want only the actual pass holders analysed.",
    },
  },
  {
    id: "ok-extremes-bracketed",
    scenario: {
      en: "A jobs programme evaluation counts every applicant in the group chance assigned them to. For the twenty two who could not be traced at one year, it repeats the sums assuming first that all were unemployed and then that all were working, and the ranking holds either way.",
    },
    trap: null,
    explanation: {
      en: "Nobody is dropped for being untraceable, and the two extreme assumptions bracket anything the missing answers could have done; a hasty player would assume the untraced were quietly excluded.",
    },
  },
  {
    id: "ok-fitted-at-purchase",
    scenario: {
      en: "A haulage study compares trucks that were fitted with a driver alert system when they were bought against trucks bought without one, counting each truck's mileage from the day it entered service.",
    },
    trap: null,
    explanation: {
      en: "Which group a truck belongs to was settled before its clock started, so no truck has to survive a waiting period in order to count as equipped; a hasty player would assume the fitted trucks were credited with time before fitting.",
    },
  },
  {
    id: "ok-matched-at-passing",
    scenario: {
      en: "An employer compares staff who passed a certification with those who did not. Each person who passed is matched, at the moment of passing, to a colleague still employed at that point with the same months of service, and both are followed from then on.",
    },
    trap: null,
    explanation: {
      en: "Follow up starts when the certification is achieved and the matched colleague has already worked the same stretch, so the months spent studying are not credited to the certified group; a hasty player would assume that time was counted.",
    },
  },
  {
    id: "ok-weekly-diaries",
    scenario: {
      en: "A study of whether long commutes wear people down uses travel diaries that staff filled in each week through the year, well before anyone knew who would later resign.",
    },
    trap: null,
    explanation: {
      en: "The exposure was written down as it happened rather than reconstructed afterwards, so knowing the outcome cannot have coloured the answers; a hasty player would assume leavers were asked to look back.",
    },
  },
  {
    id: "ok-register-and-claims",
    scenario: {
      en: "To ask whether a safety course reduces injuries, an analyst takes attendance from the course register and injuries from the insurer's claim file, matching the two by employee number. Nobody is asked to remember anything.",
    },
    trap: null,
    explanation: {
      en: "Both the exposure and the outcome come from records written at the time, so no one's account of the course can be shaped by whether they were later hurt; a hasty player would assume the workers were interviewed.",
    },
  },
  {
    id: "ok-checked-against-records",
    scenario: {
      en: "Owners of a failed appliance and owners of a working one are asked when they bought it and how often they ran it. Their answers are then compared with till receipts and app usage logs, and the two groups' errors turn out to be the same size and in the same direction.",
    },
    trap: null,
    explanation: {
      en: "The reported histories were checked against records and both groups misremembered equally, so the comparison is not driven by one group searching its memory harder; a hasty player would assume the aggrieved owners overstated their use.",
    },
  },

  // ---- nocebo-effect, second wave ----
  {
    id: "nc-turbine-headaches",
    scenario: {
      en: "Six months after a wind farm opened, a campaign group posted leaflets asking residents to report headaches and poor sleep. Ninety of the 400 households replied describing such symptoms. The group states that the turbines are making the village ill and wants them switched off.",
    },
    trap: "nocebo-effect",
    explanation: {
      en: "Nobody counted headaches and poor sleep in comparable villages with no turbines, where both are common anyway. A leaflet asking people to watch for particular symptoms also changes how many get noticed and reported.",
    },
  },
  {
    id: "nc-office-aircon",
    scenario: {
      en: "An office replaced its ventilation system and emailed staff that the airflow would feel different. A survey the following month found 38% reporting afternoon tiredness and dry throats. Facilities management concluded the new system was at fault and had it re-engineered.",
    },
    trap: "nocebo-effect",
    explanation: {
      en: "The same question was never asked before the change, nor on the floors still running the old system, so there is nothing to say whether 38% is unusual for that building.",
    },
  },
  {
    id: "nc-wifi-sleep",
    scenario: {
      en: "A student unplugs his hall's new wireless router at night and records that he sleeps better on the nights it is off. He tells friends, who try it and agree. The residents' committee asks for the router to be taken out.",
    },
    trap: "nocebo-effect",
    explanation: {
      en: "He knew on every single night whether the router was on, so what he expected could shape both his sleep and how he rated it. The test needs nights where neither he nor whoever flipped the switch knew.",
    },
  },
  {
    id: "nc-school-paint",
    scenario: {
      en: "A primary school was repainted over the holidays. In the first week back, 27 pupils were sent home feeling sick. A parents' meeting concluded that fumes from the paint were responsible and called for the classrooms to be stripped.",
    },
    trap: "nocebo-effect",
    explanation: {
      en: "No one checked how many pupils are sent home sick in a normal first week back, or whether nearby schools with no new paint saw the same thing that week.",
    },
  },
  {
    id: "nc-uniform-rash",
    scenario: {
      en: "A retailer issued a new uniform. After a widely shared staff forum thread about the fabric being itchy, complaints of rashes went from a handful to several hundred in a fortnight. The retailer withdrew the uniform and apologised.",
    },
    trap: "nocebo-effect",
    explanation: {
      en: "The itching is real, but the surge tracks the forum thread rather than the rollout, and rash rates were never compared with branches still wearing the old uniform, where skin complaints also occur.",
    },
  },
  {
    id: "nc-app-eyestrain",
    scenario: {
      en: "An app update's release notes warned that text might look slightly different. Tickets mentioning eye strain tripled that week. The team announced a rollback, tickets returned to normal, and the engineer wrote that the change had been straining users' eyes.",
    },
    trap: "nocebo-effect",
    explanation: {
      en: "Users told to expect a visual difference went looking for one, and the rollback was announced just as loudly, so both the rise and the fall follow what people were told rather than any measured change on screen.",
    },
  },
  {
    id: "nc-taxi-queasy",
    scenario: {
      en: "A taxi firm switched to electric cars and briefed drivers that the smooth one-pedal acceleration can make passengers queasy, asking them to note any complaints. Drivers logged sixty queasy passengers in a month. The firm concluded the cars cause travel sickness and reordered the old fleet.",
    },
    trap: "nocebo-effect",
    explanation: {
      en: "Nobody ever logged queasy passengers in the old fleet, so sixty has nothing to be compared against, and drivers primed to expect complaints will hear and record more of them.",
    },
  },
  {
    id: "nc-detox-crash",
    scenario: {
      en: "A wellness programme tells participants that days two and three will bring headaches, irritability and aching as the body clears itself. Most report exactly that, then feel better. The organiser presents this as proof the programme is doing its work.",
    },
    trap: "nocebo-effect",
    explanation: {
      en: "Participants were told precisely which sensations to expect and on which days, and no comparison group followed an ordinary diet or an inert version of the plan. The pattern matches the prediction they were given.",
    },
  },
  {
    id: "nc-open-extension",
    scenario: {
      en: "During a trial's blinded year, muscle aches were reported by 14% on the tablet and 13% on the dummy. Everyone was then told what they had taken and offered the tablet openly; that year one in five reported aches. A patients' group says the harm only shows in real use.",
    },
    trap: "nocebo-effect",
    explanation: {
      en: "The only thing that changed between the two years is that everyone now knew what they were taking. While nobody knew, the ache rate was the same with the drug and without it.",
    },
  },
  {
    id: "nc-tablet-switch",
    scenario: {
      en: "A pharmacy moved patients onto an equivalent tablet from a different maker, oval and yellow rather than round and white, sending a letter explaining the change. Reports of dizziness and nausea from those patients rose fivefold over two months, and a newsletter concluded the new version is poorly tolerated.",
    },
    trap: "nocebo-effect",
    explanation: {
      en: "The letter drew attention to the change and gave everyday dizziness something new to be attributed to, and no one measured the rate over the same two months in patients kept on the original tablet.",
    },
  },
  // ---- Genuinely sound reasoning (more decoys), second wave ----
  {
    id: "ok-fabric-blinded",
    scenario: {
      en: "A retailer had 200 volunteers wear a sleeve of the new cloth on one arm and the old cloth on the other for two weeks, without being told which was which. An assessor who did not know either graded photographs of both arms: visible redness on 31 new-cloth arms and 4 old-cloth arms.",
    },
    trap: null,
    explanation: {
      en: "Every volunteer carried both fabrics at once without knowing which arm had which, and the redness was graded by someone equally unaware, so what anyone expected cannot account for the gap.",
    },
  },
  {
    id: "ok-mattress-rechallenge",
    scenario: {
      en: "A man's back pain began after a new mattress arrived. His partner swapped the old and new mattresses under identical covers on a schedule he never saw, three times across six weeks. His pain scores were high on every new-mattress stretch and low on every old-mattress stretch.",
    },
    trap: null,
    explanation: {
      en: "The mattress was removed and returned repeatedly while he had no way of knowing which one he was lying on, so his expectations could not have followed the pattern his pain followed.",
    },
  },
  {
    id: "ok-heating-honest",
    scenario: {
      en: "A housing committee reviewing a new communal heating system logged 46 residents reporting headaches and dry eyes. Its report states that no similar block without the system was surveyed, that nobody knows how common these complaints were beforehand, and that it therefore cannot say the system is the cause.",
    },
    trap: null,
    explanation: {
      en: "The committee reports the count it actually has and stops there, because with no comparable block and no before figure a complaint total on its own supports no causal claim.",
    },
  },
  {
    id: "ok-blinded-dry-mouth",
    scenario: {
      en: "In a trial where neither patients nor their doctors knew who was getting what, dry mouth was reported by 44% of those on the drug and 6% of those on the dummy tablet. The report lists dry mouth as a side effect of the drug.",
    },
    trap: null,
    explanation: {
      en: "Both groups were equally unaware of what they were taking and equally primed to watch for side effects, so the gap between 44% and 6% is what the drug itself added.",
    },
  },

  // ---- Non-differential misclassification ----
  {
    id: "nm-salt-ffq",
    scenario: {
      en: "A large study estimates each person's salt intake from a single question about how often they add table salt, then finds almost no link between salt and blood pressure. The authors conclude that salt does not affect blood pressure.",
    },
    trap: "non-differential-misclassification",
    explanation: {
      en: "A one-question estimate gets almost everyone's real salt intake wrong, and wrong in every direction rather than by group. Blurring the heavy and light salters together makes them look alike, which pushes any true link toward zero and can bury it.",
    },
  },
  {
    id: "nm-solvent-jobtitle",
    scenario: {
      en: "To study a factory solvent, researchers mark workers as exposed or not purely by job title, though people with the same title handle very different amounts. They find no excess disease in the exposed group and report the solvent as safe.",
    },
    trap: "non-differential-misclassification",
    explanation: {
      en: "Sorting by job title puts many truly exposed workers in the unexposed column and the reverse, roughly evenly. When each compared group is a mixture of the real ones, their disease rates move together, so a genuine hazard is watered down toward no difference.",
    },
  },
  {
    id: "nm-pedometer",
    scenario: {
      en: "A study tracks activity with a cheap clip-on counter that miscounts steps erratically for everyone, and finds no relationship between daily steps and weight change over a year. A columnist writes that step counts do not matter.",
    },
    trap: "non-differential-misclassification",
    explanation: {
      en: "A counter unreliable for every wearer scrambles the active and the inactive together. Noise spread evenly across the whole sample drags a correlation toward zero, so the missing relationship may be the instrument rather than the activity.",
    },
  },
  {
    id: "nm-pollution-postcode",
    scenario: {
      en: "An asthma study assigns each child the average air pollution of their postcode, though levels vary sharply from street to street. The link with asthma comes out weak, and a summary says local air quality has little effect.",
    },
    trap: "non-differential-misclassification",
    explanation: {
      en: "A postcode average is wrong for most individual children, and wrong in both directions rather than by who is ill. Measuring exposure this bluntly blends the high and low together and flattens a real gradient toward nothing.",
    },
  },
  {
    id: "nm-two-readers",
    scenario: {
      en: "Two overworked assessors grade a tissue feature from slides, making frequent slips that are just as likely for patients with the disease as for those without. The feature turns out only weakly linked to the disease, and a report calls it unimportant.",
    },
    trap: "non-differential-misclassification",
    explanation: {
      en: "Errors falling equally on cases and controls are non-differential. They shuffle people between feature-present and feature-absent on both sides, so the two groups look more alike than they are and a real link is dragged toward the null.",
    },
  },
  {
    id: "nm-survey-question",
    scenario: {
      en: "A health survey measures a habit with a confusingly worded question that people answer more or less at random. No link is found between the habit and an illness, and the survey concludes the habit is harmless.",
    },
    trap: "non-differential-misclassification",
    explanation: {
      en: "A question answered almost at random splits the true doers and non-doers evenly across both answers. That equal confusion mixes the groups and pulls any genuine link toward zero, so the null describes the question, not the habit.",
    },
  },
  {
    id: "nm-registry-coding",
    scenario: {
      en: "A study compares two treatments using a hospital database in which the outcome is coded inconsistently, with the same sloppiness for both treatment groups. The treatments look equally effective, and the paper reports no difference.",
    },
    trap: "non-differential-misclassification",
    explanation: {
      en: "When the outcome is recorded just as unreliably in both arms, the errors favour neither treatment. They blur any real gap between the arms, so no difference can be the coding rather than the treatments truly being alike.",
    },
  },
  {
    id: "nm-assay-sensitivity",
    scenario: {
      en: "A test for a blood marker misses about half of the true positives, at random and regardless of who is ill. Using it to classify people, a study finds the marker unrelated to the disease and drops it from further work.",
    },
    trap: "non-differential-misclassification",
    explanation: {
      en: "A test that mislabels exposure the same way in the sick and the well is non-differential. Filing half of the truly positive people as negative on both sides makes the two groups resemble each other, biasing the marker's apparent effect toward none.",
    },
  },
  {
    id: "nm-attendance-sheet",
    scenario: {
      en: "Researchers measure class attendance from a sign-in sheet that students fill in haphazardly, and find attendance unrelated to exam marks. The faculty concludes that turning up makes no difference.",
    },
    trap: "non-differential-misclassification",
    explanation: {
      en: "A haphazard sheet mislabels regular and irregular attenders alike, in no particular direction. The noise is spread evenly across everyone, which mixes the groups and pushes any real effect of attending toward zero.",
    },
  },
  {
    id: "nm-sleep-recall",
    scenario: {
      en: "A study estimates how much people sleep from one vague question and looks for a link with next-day reaction time. Everyone's estimate is off by an hour or two either way, unrelated to how they performed. No link appears, and the write-up says sleep length does not affect alertness.",
    },
    trap: "non-differential-misclassification",
    explanation: {
      en: "An estimate imprecise for everyone, and untied to performance, is non-differential error. It scrambles short and long sleepers together, and mixing them like this drags a real relationship toward nothing rather than inventing one.",
    },
  },

  // ---- Genuinely sound reasoning about measurement (more decoys) ----
  {
    id: "ok-validated-null",
    scenario: {
      en: "A study measures an exposure with a method carefully validated to be accurate for nearly everyone, finds no association with the disease, and concludes the exposure probably has little effect, noting that because the measurement was reliable the null is unlikely to be hiding a large one.",
    },
    trap: null,
    explanation: {
      en: "A null is weak evidence only when the measurement is poor. Here the exposure was measured accurately, so blurring cannot explain the missing link, and reading the null as meaningful is the sound move.",
    },
  },
  {
    id: "ok-measurement-caveat",
    scenario: {
      en: "A study measured diet with a rough questionnaire and found no link to an illness. Rather than declaring the diet safe, the authors write that their crude measurement could have hidden a real effect, and call for a study with better dietary records.",
    },
    trap: null,
    explanation: {
      en: "They recognised that error spread across everyone tends to bury associations, so a null from a blunt instrument cannot prove there is nothing there. Declining to over-read it is the careful conclusion, not a trap.",
    },
  },
  {
    id: "ok-repeat-measures",
    scenario: {
      en: "Because a single blood-pressure reading is noisy, a study averages several readings taken on separate days for every participant before testing the link with the outcome, and reports the association from those averaged values.",
    },
    trap: null,
    explanation: {
      en: "Averaging repeated measurements cuts the random error that would otherwise blur participants together and weaken the association. Reducing non-differential error this way is exactly how to keep a real effect visible.",
    },
  },

  // ---- Regression to the mean ----
  {
    id: "rm-speed-cameras",
    scenario: {
      en: "A council installs speed cameras at the twenty junctions with the most crashes last year. Over the next year crashes at those junctions fall, and the council reports the cameras as a clear success.",
    },
    trap: "regression-to-the-mean",
    explanation: {
      en: "The junctions were picked for an exceptionally bad year, which is partly bad luck that does not repeat. Crashes would have fallen at the worst sites anyway, so crediting the cameras needs junctions that were equally bad and left uncovered.",
    },
  },
  {
    id: "rm-worst-schools",
    scenario: {
      en: "A ministry gives extra funding to the fifty lowest-scoring schools. The next year their average results rise, and the funding is declared to have worked.",
    },
    trap: "regression-to-the-mean",
    explanation: {
      en: "Schools land at the very bottom partly through a bad year that will not recur, so the lowest scorers tend to climb on their own. Without a comparison of equally low-scoring schools that got nothing, the rise cannot be pinned on the money.",
    },
  },
  {
    id: "rm-cholesterol-diet",
    scenario: {
      en: "A clinic enrols the patients with the highest cholesterol readings onto a new diet. At the recheck their readings have dropped, and the clinic recommends the diet to everyone.",
    },
    trap: "regression-to-the-mean",
    explanation: {
      en: "People selected for the highest readings include many caught on an unusually high day, which the next test will not repeat. Their readings would fall without the diet, so only an equally high group left alone can show the diet did anything.",
    },
  },
  {
    id: "rm-manager-sacked",
    scenario: {
      en: "A football club sacks its manager after the worst run of results in years. Under the caretaker the team climbs the table, and the board congratulates itself on the decision.",
    },
    trap: "regression-to-the-mean",
    explanation: {
      en: "Clubs sack managers at their lowest ebb, and a lowest ebb is partly a run of bad luck that tends to end. The recovery is what a bad patch usually does next, so it is no proof the sacking helped.",
    },
  },
  {
    id: "rm-cold-remedy",
    scenario: {
      en: "People try a herbal remedy when their cold feels at its worst. Most feel much better within two days and recommend it to friends.",
    },
    trap: "regression-to-the-mean",
    explanation: {
      en: "A cold is usually taken on at its peak, and symptoms fade from a peak on their own. Feeling better after the worst day is what a cold does, with or without the remedy.",
    },
  },
  {
    id: "rm-sophomore-slump",
    scenario: {
      en: "An athlete voted best newcomer of the season plays less brilliantly the year after. Pundits conclude the fame went to his head.",
    },
    trap: "regression-to-the-mean",
    explanation: {
      en: "A best-newcomer season is a peak, and peaks are partly luck that does not hold. A more ordinary second year is what regression predicts, and it needs no story about character.",
    },
  },
  {
    id: "rm-worst-branches",
    scenario: {
      en: "A chain sends its consultants to the ten stores with the worst sales last quarter. Those stores do better the following quarter, and the consultancy is retained.",
    },
    trap: "regression-to-the-mean",
    explanation: {
      en: "The ten stores were chosen for an unusually bad quarter, which tends to be followed by a better one regardless. Judging the consultants fairly needs equally poor stores they never visited.",
    },
  },
  {
    id: "rm-bp-recall",
    scenario: {
      en: "A screening drive recalls everyone whose blood pressure read highest and gives them lifestyle advice. At the recall visit their pressure is lower, and the advice is judged effective.",
    },
    trap: "regression-to-the-mean",
    explanation: {
      en: "A single high reading is partly a bad moment, so the highest readers tend to read lower next time anyway. The fall is expected without any advice, and a comparison group is the only way to see the advice's own effect.",
    },
  },
  {
    id: "rm-driver-course",
    scenario: {
      en: "Drivers who collected the most penalty points in a year are required to attend a safety course. In the following year they collect far fewer points, and the course is expanded.",
    },
    trap: "regression-to-the-mean",
    explanation: {
      en: "Drivers are picked at a peak year of offences, and a peak is partly chance that eases off. Fewer points the next year is what regression predicts, so the drop does not by itself show the course worked.",
    },
  },
  {
    id: "rm-mock-exam",
    scenario: {
      en: "Students who scored worst on a mock exam are enrolled in a revision workshop. On the real exam they improve markedly, and the school makes the workshop compulsory for low scorers.",
    },
    trap: "regression-to-the-mean",
    explanation: {
      en: "The worst mock scores include students who simply had an off day, who tend to do better next time regardless. Only students who scored equally badly and skipped the workshop could show whether it added anything.",
    },
  },

  // ---- Genuinely sound reasoning about extremes (more decoys) ----
  {
    id: "ok-rtm-control",
    scenario: {
      en: "A charity funds the lowest-attaining schools and evaluates the programme against an equally low-attaining set of schools, chosen the same way but left unfunded. The funded schools improved more than the unfunded ones.",
    },
    trap: null,
    explanation: {
      en: "Both sets were equally extreme, so both would drift upward by about the same amount on their own. Because the comparison schools absorb that drift, the extra improvement in the funded schools is a fair estimate of what the funding added.",
    },
  },
  {
    id: "ok-rtm-placebo",
    scenario: {
      en: "Patients with high blood pressure are randomly assigned to a drug or a dummy pill. Pressure falls in both groups, but it falls further on the drug, and the trial reports the difference between the two as the drug's effect.",
    },
    trap: null,
    explanation: {
      en: "Both arms started high and both drift back toward the average, so the fall in the dummy-pill arm measures that drift. Subtracting it leaves the part that is the drug, which is exactly why the comparison arm is there.",
    },
  },

  // ---- Effect modification versus confounding ----
  {
    id: "em-sunscreen-skintype",
    scenario: {
      en: "A study reports that regular sunscreen use cuts skin cancer risk by about a fifth on average, adjusting for skin type. The benefit is large in fair-skinned people and negligible in the darkest-skinned. The health message quotes only the one-fifth figure.",
    },
    trap: "effect-modification-vs-confounding",
    explanation: {
      en: "The effect genuinely differs by skin type, so a single averaged number describes neither group. Skin type here is not a nuisance to adjust away but the thing that decides how much sunscreen helps, and it should be reported separately.",
    },
  },
  {
    id: "em-bp-drug-age",
    scenario: {
      en: "A blood pressure drug is licensed with the claim that it lowers pressure by 8 mmHg. Split by age, it barely moves pressure under 50 and lowers it markedly over 70. Only the single average appears on the label.",
    },
    trap: "effect-modification-vs-confounding",
    explanation: {
      en: "Age changes the size of the effect, so the 8 mmHg is an average that fits no age group well. When an effect differs across subgroups it should be reported by subgroup, not collapsed into one figure.",
    },
  },
  {
    id: "em-painkiller-genotype",
    scenario: {
      en: "A painkiller relieves pain strongly in people with one liver-enzyme genotype and hardly at all in those with another. A review pools every patient and reports a modest average benefit.",
    },
    trap: "effect-modification-vs-confounding",
    explanation: {
      en: "The genotype decides whether the drug works, so pooling produces a number that overstates it for one group and invents it for the other. The genotype is the finding, not a variable to average over.",
    },
  },
  {
    id: "em-treatment-opposite",
    scenario: {
      en: "Researchers find a treatment helps men and harms women by about the same amount. To account for sex, they adjust for it and report a single near-zero effect, concluding the treatment does nothing.",
    },
    trap: "effect-modification-vs-confounding",
    explanation: {
      en: "Adjusting for sex has buried two real and opposite effects under an average of nearly zero. Sex is modifying the effect, not confounding it, so the honest report is the two subgroups apart, not one number that hides both.",
    },
  },
  {
    id: "em-fertiliser-soil",
    scenario: {
      en: "A fertiliser trial across many fields finds it raises yield on sandy soil and does nothing on clay. The report gives the average increase and recommends the fertiliser for all fields.",
    },
    trap: "effect-modification-vs-confounding",
    explanation: {
      en: "Soil type changes whether the fertiliser works at all, so an average across soils recommends it where it is useless. The effect should be reported by soil, which is the practical answer a farmer needs.",
    },
  },
  {
    id: "em-vaccine-age",
    scenario: {
      en: "A vaccine is highly protective in younger adults and only weakly protective in the elderly. A briefing note gives a single overall efficacy figure for the whole population.",
    },
    trap: "effect-modification-vs-confounding",
    explanation: {
      en: "Age modifies how well the vaccine works, so one figure overstates the protection the elderly can expect. A modifier like this belongs in the results split out, because the subgroups need different advice.",
    },
  },
  {
    id: "em-tutoring-baseline",
    scenario: {
      en: "A tutoring programme raises test scores sharply for pupils who started behind and not at all for those already ahead. The evaluation reports one average gain and rolls the programme out to everyone.",
    },
    trap: "effect-modification-vs-confounding",
    explanation: {
      en: "Starting level decides who benefits, so an average gain misdescribes both the pupils it helps and those it does not. This is an effect that differs by subgroup, to be reported by subgroup rather than averaged.",
    },
  },
  {
    id: "em-solvent-smoking",
    scenario: {
      en: "An occupational study finds a workplace solvent raises lung cancer risk steeply in smokers and not detectably in non-smokers. The authors adjust for smoking and present a single modest risk for the solvent.",
    },
    trap: "effect-modification-vs-confounding",
    explanation: {
      en: "Smoking is not just a confounder here, it decides whether the solvent does harm, so adjusting it into one number hides that the danger is concentrated in smokers. The two groups should be reported separately.",
    },
  },
  {
    id: "em-diet-diabetes",
    scenario: {
      en: "A dietary change lowers heart attacks in people with diabetes and has no effect in people without it. A meta-analysis pools all participants and concludes the diet has a small, marginal benefit.",
    },
    trap: "effect-modification-vs-confounding",
    explanation: {
      en: "The diet's effect depends on diabetes status, so pooling dilutes a real benefit for one group into a marginal-looking average for everyone. Diabetes is the modifier, and the strata carry the real message.",
    },
  },
  {
    id: "em-app-newusers",
    scenario: {
      en: "A feature raises spending a lot among brand-new users and not at all among long-standing ones. The product team reports the average uplift across all users and ships the feature to everybody.",
    },
    trap: "effect-modification-vs-confounding",
    explanation: {
      en: "How long someone has used the product decides whether the feature does anything, so the average uplift misleads about both groups. When an effect differs by subgroup, the subgroups are the result, not a detail to average over.",
    },
  },

  // ---- Genuinely sound reasoning about subgroups and adjustment (more decoys) ----
  {
    id: "ok-confounder-adjusted",
    scenario: {
      en: "Coffee drinkers have more heart disease, but they also smoke more. After adjusting for smoking the association disappears, and the same near-zero link holds within smokers and within non-smokers alike. The authors report that coffee is not associated once smoking is accounted for.",
    },
    trap: null,
    explanation: {
      en: "Because the link is the same small thing in both smoking groups, smoking was a genuine confounder and adjusting for it is the right move. A single adjusted number is a fair summary precisely because the strata agree.",
    },
  },
  {
    id: "ok-subgroups-reported",
    scenario: {
      en: "A trial finds a drug clearly helps patients with a particular marker and does nothing for those without it. Rather than quoting one overall effect, the report gives the two groups separately and recommends the drug only for the marker-positive patients.",
    },
    trap: null,
    explanation: {
      en: "When an effect differs by subgroup, reporting the subgroups apart is exactly right, and pooling them into one average would have been the error. Prespecifying the marker and acting on it is careful practice, not a trap.",
    },
  },

  // ---- Detection (observer) bias ----
  {
    id: "db-wound-photos",
    scenario: {
      en: "In an open trial of a new dressing, the surgeon who chose which patients got it also reviewed their wound photos and decided which counted as infected. The new dressing came out with far fewer infections.",
    },
    trap: "detection-bias",
    explanation: {
      en: "Whether a borderline wound is called infected is a judgement, and the person making it knew which dressing each patient had. Have someone blinded to the dressing grade the same photos before believing the size of the gap.",
    },
  },
  {
    id: "db-physio-scores",
    scenario: {
      en: "A physiotherapist testing her own new programme also scored each patient's mobility at the end. Her scores showed the new programme clearly beating usual care.",
    },
    trap: "detection-bias",
    explanation: {
      en: "The person hoping the programme works is the one rating the outcome, so ambiguous movements get scored generously for her group. A blinded assessor rating the same patients is what would settle it.",
    },
  },
  {
    id: "db-xray-progression",
    scenario: {
      en: "A radiologist was told which patients were on the new cancer drug before reading their follow-up scans. He marked the drug group as 'stable or improved' far more often than the comparison group.",
    },
    trap: "detection-bias",
    explanation: {
      en: "Reading a scan as progression or not takes interpretation, and knowing the arm tilts the close calls. Scans read blind, in a random order, are the only version worth trusting.",
    },
  },
  {
    id: "db-essay-grading",
    scenario: {
      en: "A teacher graded her pupils' essays knowing which of them had used a new writing app she had championed. The app users scored noticeably higher, and she reported the app as a success.",
    },
    trap: "detection-bias",
    explanation: {
      en: "Essay marks are a judgement, and the grader both knew the groups and wanted the app to work. Marking the essays blind, with names and app-use hidden, is what would show whether the gap is real.",
    },
  },
  {
    id: "db-gym-judging",
    scenario: {
      en: "At a gymnastics meet the judges could see which athletes came from a famous academy. Those athletes received higher marks for routines that, on video review by judges who could not tell where they trained, scored about the same as everyone else's.",
    },
    trap: "detection-bias",
    explanation: {
      en: "Scoring a routine is a judgement call, and knowing the prestigious academy nudged it upward. The blinded video review of the same routines is the unbiased measurement.",
    },
  },
  {
    id: "db-vet-lameness",
    scenario: {
      en: "A vet assessing whether horses were still lame knew which ones had been given a new joint supplement. She rated the supplement group as sounder, and the makers advertised the result.",
    },
    trap: "detection-bias",
    explanation: {
      en: "Grading lameness is a judgement, and the assessor knew which horses were supposed to improve. A vet blinded to which horses got the supplement, watching the same gaits, is what the claim needs.",
    },
  },
  {
    id: "db-diary-coding",
    scenario: {
      en: "A researcher read patients' free-text symptom diaries and coded each week as better or worse, with the treatment arm visible at the top of every page. Ambiguous weeks were coded 'better' more often for the treated patients.",
    },
    trap: "detection-bias",
    explanation: {
      en: "Turning a vague diary entry into better-or-worse is interpretation, and the arm label steered the doubtful ones. Coding the diaries with the arm hidden removes the tilt.",
    },
  },
  {
    id: "db-behaviour-observers",
    scenario: {
      en: "Observers scored children's classroom behaviour for a study of a new diet. They were told which children were on the diet, and recorded fewer disruptive episodes for that group.",
    },
    trap: "detection-bias",
    explanation: {
      en: "Whether a fidget counts as a disruptive episode is a judgement, and knowing who was on the diet shaded it. Observers blinded to the diet, scoring the same footage, are what a real test requires.",
    },
  },
  {
    id: "db-endoscopy-healing",
    scenario: {
      en: "An endoscopist assessing whether ulcers had healed could see, on each patient's chart, which drug they had received. He judged more ulcers 'healed' in the new-drug group.",
    },
    trap: "detection-bias",
    explanation: {
      en: "Calling an ulcer healed or not is an interpretation, and the visible drug name nudged the borderline ones. The images should be read by someone who cannot tell which drug the patient took.",
    },
  },
  {
    id: "db-rash-severity",
    scenario: {
      en: "A dermatologist rated the severity of patients' rashes on a ten-point scale, aware of which cream each had been given. The trial cream's patients were scored two points milder on average.",
    },
    trap: "detection-bias",
    explanation: {
      en: "A severity score is a judgement, and knowing the cream drew the ratings toward the hoped-for answer. A rater blinded to the cream, scoring the same rashes, is what would show the true difference.",
    },
  },

  // ---- Sound assessment (more decoys) ----
  {
    id: "ok-blinded-committee",
    scenario: {
      en: "In a heart-drug trial, every suspected heart attack was judged by an independent committee working from anonymised records that never revealed which drug the patient had taken. The drug group had fewer confirmed heart attacks.",
    },
    trap: null,
    explanation: {
      en: "The people deciding the outcome could not tell the groups apart, so their judgement cannot have been swayed by expectation. This is exactly how a subjective outcome should be assessed.",
    },
  },
  {
    id: "ok-death-registry",
    scenario: {
      en: "An open-label trial could not blind patients or doctors, but its only outcome was death from any cause, taken from the national death registry. The treated group had fewer deaths.",
    },
    trap: null,
    explanation: {
      en: "Death recorded by a registry needs no interpretation, so it does not matter that everyone knew the assignment. For a hard endpoint like this, an unblinded assessor cannot bend the result.",
    },
  },
  {
    id: "ok-automated-readout",
    scenario: {
      en: "A blood-pressure study used a validated monitor that recorded each reading and uploaded it automatically, with no clinician deciding or transcribing the number, even though staff knew who was on the drug.",
    },
    trap: null,
    explanation: {
      en: "No human judged the outcome, so knowing the group could not colour it. Automating the measurement removes the room for an assessor's expectation to creep in.",
    },
  },

  // ---- Statistical versus clinical significance ----
  {
    id: "sc-app-loading",
    scenario: {
      en: "A company tested a redesign on 4 million users and reported that it loaded significantly faster, p < 0.0001. The press release calls it a major speed improvement. The measured difference is 3 milliseconds.",
    },
    trap: "statistical-vs-clinical-significance",
    explanation: {
      en: "With 4 million users even a 3 millisecond difference is far too consistent to be chance, so the tiny p-value is guaranteed. Nobody can perceive 3 milliseconds, so the result is certain and worthless.",
    },
  },
  {
    id: "sc-diet-kilo",
    scenario: {
      en: "A weight-loss programme trialled in 30,000 people reports that participants lost significantly more than controls, p < 0.001, and markets itself on that result. Over a year the difference averaged 400 grams.",
    },
    trap: "statistical-vs-clinical-significance",
    explanation: {
      en: "A 400 gram difference over a year is of no health consequence, but with 30,000 people it is measured precisely enough to be highly significant. The p-value confirms the difference is real, not that it is worth the effort.",
    },
  },
  {
    id: "sc-bp-half-point",
    scenario: {
      en: "A supplement lowered blood pressure by 0.6 mmHg more than placebo in a trial of 50,000 adults, p < 0.001. An advert says it is clinically proven to lower blood pressure, without naming the number.",
    },
    trap: "statistical-vs-clinical-significance",
    explanation: {
      en: "Guidelines treat blood pressure changes of a few mmHg as the smallest worth acting on, so 0.6 is negligible, but 50,000 people make it statistically certain. The claim leans entirely on significance and hides the size.",
    },
  },
  {
    id: "sc-tutoring-mark",
    scenario: {
      en: "An education study of 100,000 pupils found that an online tutoring add-on raised exam marks by a statistically significant amount, p < 0.001, and a minister cites it as proof the programme works. The gain was 0.3 marks out of 100.",
    },
    trap: "statistical-vs-clinical-significance",
    explanation: {
      en: "A third of a mark out of a hundred changes nothing for any pupil, yet 100,000 of them pin the estimate down tightly enough to be highly significant. Significance is being used as a stand-in for a benefit nobody has shown.",
    },
  },
  {
    id: "sc-biobank-correlation",
    scenario: {
      en: "Researchers report a significant association between a food and a blood marker in 500,000 people, with a vanishingly small p-value. A news story says the food strongly affects the marker. The correlation is 0.01.",
    },
    trap: "statistical-vs-clinical-significance",
    explanation: {
      en: "A correlation of 0.01 explains essentially none of the variation, but half a million people make even that distinguishable from zero many times over. The extreme p-value reflects the sample size, not the strength of the link.",
    },
  },
  {
    id: "sc-sleep-tracker",
    scenario: {
      en: "A mattress company's study of 80,000 sleepers found their model gave significantly more sleep than a standard one, p < 0.001, and the packaging says so. The extra sleep averaged 90 seconds a night.",
    },
    trap: "statistical-vs-clinical-significance",
    explanation: {
      en: "Ninety seconds is well below any amount a sleeper would notice or benefit from, yet 80,000 people make it a highly significant difference. The claim rests on the p-value and never mentions the size.",
    },
  },
  {
    id: "sc-fuel-additive",
    scenario: {
      en: "A fuel additive tested across 200,000 journeys significantly improved fuel economy, p < 0.001. The manufacturer advertises proven savings. The improvement was 0.1 percent, and the additive costs more than that.",
    },
    trap: "statistical-vs-clinical-significance",
    explanation: {
      en: "The improvement is real and precisely measured, which is what the p-value shows, but at 0.1 percent it costs more than it saves. Statistical significance says the effect exists, not that it is worth buying.",
    },
  },
  {
    id: "sc-wait-time",
    scenario: {
      en: "A hospital reports that a new triage system significantly reduced waiting times across 300,000 attendances, p < 0.001, and the board declares the rollout a success. Average waits fell from 247 minutes to 245.",
    },
    trap: "statistical-vs-clinical-significance",
    explanation: {
      en: "Two minutes off a four-hour wait is nothing to a patient, but 300,000 attendances make it statistically unmistakable. The board has read certainty as importance.",
    },
  },
  {
    id: "sc-pain-score",
    scenario: {
      en: "A painkiller beat placebo on a 0 to 100 pain scale in 25,000 patients, p < 0.001, and is promoted on that basis. The difference was 1.5 points, and researchers in the field treat about 10 points as the smallest change patients notice.",
    },
    trap: "statistical-vs-clinical-significance",
    explanation: {
      en: "The field already has a yardstick, roughly 10 points, and 1.5 falls far below it. The large trial makes that small difference statistically certain without making it perceptible to anyone.",
    },
  },
  {
    id: "sc-battery-life",
    scenario: {
      en: "A phone maker tested a software update on 2 million handsets and reported significantly longer battery life, p < 0.0001, headlining the update. Screen-on time rose by 40 seconds.",
    },
    trap: "statistical-vs-clinical-significance",
    explanation: {
      en: "Forty seconds of screen time is imperceptible over a day, yet two million handsets make the measurement precise enough for an extreme p-value. The headline reports how sure they are, not how much it helps.",
    },
  },

  // ---- Sound reasoning about size and significance (more decoys) ----
  {
    id: "ok-reports-size-and-threshold",
    scenario: {
      en: "A trial reports that its drug improved walking distance by 68 metres, states that researchers in the field regard 30 metres as the smallest improvement patients notice, and concludes the benefit is both statistically and clinically meaningful.",
    },
    trap: null,
    explanation: {
      en: "The report gives the size of the effect, names an external yardstick, and shows the effect clears it. That is exactly the pair of questions a result should answer, so nothing is being smuggled past the reader.",
    },
  },
  {
    id: "ok-significant-but-declared-small",
    scenario: {
      en: "A very large study finds a statistically significant difference and its authors write that, although the p-value is small, the difference is too slight to change practice, and recommend against acting on it.",
    },
    trap: null,
    explanation: {
      en: "The authors separate the two questions properly: the effect is real, and it is not worth acting on. Declining to convert a small p-value into a recommendation is the careful move, not the trap.",
    },
  },
  {
    id: "ok-underpowered-honest",
    scenario: {
      en: "A small trial finds a promising-looking improvement that does not reach statistical significance, and the authors report the estimate with a wide confidence interval, saying the study cannot rule out either a useful benefit or no benefit at all.",
    },
    trap: null,
    explanation: {
      en: "A non-significant result from a small study means the question is unsettled, not that the treatment fails. Reporting the wide interval instead of claiming no effect is the honest reading.",
    },
  },

  // ---- The ecological fallacy ----
  {
    id: "ec-country-sugar",
    scenario: {
      en: "Countries that eat more sugar have higher rates of a disease. A columnist tells readers that eating sugar raises their personal risk, citing the country comparison as the evidence.",
    },
    trap: "ecological-fallacy",
    explanation: {
      en: "The rows in that table are countries, not people. Rich countries differ from poor ones in dozens of ways at once, so the line across them may not hold for any individual. A claim about a person needs data measured on people.",
    },
  },
  {
    id: "ec-school-funding",
    scenario: {
      en: "Schools with more spending per pupil get better average exam results, so a council concludes that spending more on any given child will raise that child's marks.",
    },
    trap: "ecological-fallacy",
    explanation: {
      en: "The comparison is between schools, and schools differ in intake as well as budget. Well-funded schools often sit in wealthier areas, so the pattern can be about which children attend rather than about what an extra pound does for one of them.",
    },
  },
  {
    id: "ec-region-income-vote",
    scenario: {
      en: "Richer regions vote for one party more often, so an analyst writes that richer voters back that party. No individual-level survey is cited.",
    },
    trap: "ecological-fallacy",
    explanation: {
      en: "A region's average income and an individual's income are different variables. The regional pattern can run one way while richer individuals inside those regions vote the other way, which is exactly what has been found in some countries.",
    },
  },
  {
    id: "ec-hospital-staffing",
    scenario: {
      en: "Hospitals with more nurses per bed have lower average death rates, and a manager concludes that any individual patient given more nursing attention is less likely to die.",
    },
    trap: "ecological-fallacy",
    explanation: {
      en: "The unit here is the hospital. Better staffed hospitals also tend to be better funded and to treat different case mixes, so the between-hospital pattern is not by itself a statement about what happens to one patient.",
    },
  },
  {
    id: "ec-air-quality-town",
    scenario: {
      en: "Towns with cleaner air have longer average life expectancy, so a report states that breathing cleaner air will add years to a reader's life, using only the town-level figures.",
    },
    trap: "ecological-fallacy",
    explanation: {
      en: "Towns with clean air differ from others in wealth, occupation and smoking as well. The town-level association can be produced by who lives where, so it cannot on its own quantify what cleaner air does for one person.",
    },
  },
  {
    id: "ec-country-chocolate-height",
    scenario: {
      en: "Across 30 countries, average height rises with average dairy consumption, and a magazine advises readers that drinking more milk will make them taller, citing that country chart.",
    },
    trap: "ecological-fallacy",
    explanation: {
      en: "Each point is a whole country, so the chart compares national averages shaped by genetics, wealth and childhood nutrition together. Turning it into personal advice treats a fact about countries as a fact about a body.",
    },
  },
  {
    id: "ec-postcode-crime",
    scenario: {
      en: "Neighbourhoods with more young men have more recorded crime, and a report concludes that a given young man is more likely to be an offender than a given older resident, using only the neighbourhood totals.",
    },
    trap: "ecological-fallacy",
    explanation: {
      en: "The data counts neighbourhoods, so it cannot say who committed the crimes. Areas with young populations also tend to differ in income and housing, and the individual claim needs individual records.",
    },
  },
  {
    id: "ec-team-experience",
    scenario: {
      en: "Teams with more experienced staff ship fewer bugs on average, so a director tells one junior engineer that their individual bug rate must be the reason their team struggles.",
    },
    trap: "ecological-fallacy",
    explanation: {
      en: "The pattern is measured across teams, which differ in the difficulty of what they build as well as in experience. Nothing in a team-level average identifies which person produced which defect.",
    },
  },
  {
    id: "ec-national-literacy-tv",
    scenario: {
      en: "Countries with more television sets per household report higher literacy, and an editorial argues that watching television makes an individual more literate.",
    },
    trap: "ecological-fallacy",
    explanation: {
      en: "Television ownership marks how wealthy a country is, and wealth brings schools. The country-level link is about national development, so it licenses no claim about what watching television does to one viewer.",
    },
  },
  {
    id: "ec-clinic-waiting",
    scenario: {
      en: "Clinics with longer average waiting times report higher patient satisfaction, and a board concludes that making an individual patient wait longer will make that patient happier.",
    },
    trap: "ecological-fallacy",
    explanation: {
      en: "Comparing clinics is not comparing patients. Busy, popular clinics can have both long queues and good care, so a clinic-level correlation cannot be read as what waiting does to one person, and here it is plainly implausible.",
    },
  },

  // ---- Sound reasoning about levels (more decoys) ----
  {
    id: "ok-individual-level-data",
    scenario: {
      en: "Researchers wanted to know whether a diet affects one person's risk, so rather than comparing country averages they followed 40,000 individuals, recording each person's own diet and their own outcome, and reported the association among those people.",
    },
    trap: null,
    explanation: {
      en: "The question was about individuals and the data was measured on individuals, so the unit of analysis matches the claim. That is precisely the step the ecological fallacy skips.",
    },
  },
  {
    id: "ok-ecological-claim-kept-ecological",
    scenario: {
      en: "A study finds that countries with stricter seatbelt laws have fewer road deaths per head, and concludes that such laws are associated with lower national death rates, explicitly declining to say what any individual driver's risk would be.",
    },
    trap: null,
    explanation: {
      en: "The data is national and the conclusion is kept national. Policy questions are legitimately asked at the level of populations, and the authors do not smuggle the finding down to a person.",
    },
  },
  {
    id: "ok-multilevel-model",
    scenario: {
      en: "Analysts studying whether neighbourhood poverty affects individual health use records that hold both each person's own income and their neighbourhood's, and report the neighbourhood effect after accounting for the person's own circumstances.",
    },
    trap: null,
    explanation: {
      en: "Holding both levels in the same model is the standard way to separate what an area does from what a person's own situation does, so the group-level claim is not resting on individual-level guesswork.",
    },
  },

  // ---- The framing effect ----
  {
    id: "fr-surgery-survival",
    scenario: {
      en: "A surgeon tells patients the operation has a 90 percent survival rate, and most agree to it. A colleague who tells the identical patients it has a 10 percent death rate finds far fewer agree. The hospital concludes the first surgeon is better at reassuring people.",
    },
    trap: "framing-effect",
    explanation: {
      en: "Ninety percent survival and ten percent mortality are the same number said two ways, so nothing about the operation differed. What differed was the wording, and it moved the decision.",
    },
  },
  {
    id: "fr-yoghurt-fat",
    scenario: {
      en: "A yoghurt sells far better labelled 90 percent fat free than the identical product labelled 10 percent fat. The company reports that shoppers are choosing the healthier option.",
    },
    trap: "framing-effect",
    explanation: {
      en: "It is one product with one fat content, described two ways. The shoppers did not choose a healthier yoghurt, they responded to a label written to sound like a gain.",
    },
  },
  {
    id: "fr-tax-relief",
    scenario: {
      en: "A policy polls well when described as keeping money in your pocket and badly when the identical policy is described as reducing what is collected for services. The pollster reports the public is broadly in favour.",
    },
    trap: "framing-effect",
    explanation: {
      en: "Two descriptions of the same policy produced two verdicts, so the poll measured the wording as much as the opinion. A finding like this has to report how the question was put.",
    },
  },
  {
    id: "fr-employment-rate",
    scenario: {
      en: "A government announces that 94 percent of people are in work. The opposition announces that 6 percent are out of work. A commentator says the two sides cannot agree on the figures.",
    },
    trap: "framing-effect",
    explanation: {
      en: "They agree completely on the figure, which is one number stated from two ends. The disagreement is over which end to say out loud, and that choice does the persuading.",
    },
  },
  {
    id: "fr-vaccine-effect",
    scenario: {
      en: "A leaflet says a vaccine lets 99 in 100 get through the season without the illness. A rival leaflet says 1 in 100 still catch it despite the vaccine. A survey finds people who read the first are much likelier to take it, and concludes the first leaflet is more accurate.",
    },
    trap: "framing-effect",
    explanation: {
      en: "Both leaflets state the identical result, one as a gain and one as a residual loss. Being more persuasive is not the same as being more accurate, and here neither is wrong.",
    },
  },
  {
    id: "fr-discount-surcharge",
    scenario: {
      en: "A shop charges less for cash than for card. Customers barely object when it is called a cash discount and complain loudly when the identical price gap is called a card surcharge. The owner concludes customers dislike card fees.",
    },
    trap: "framing-effect",
    explanation: {
      en: "The two prices are the same either way. Calling the gap a discount makes the lower price the bonus, calling it a surcharge makes the higher price a penalty, and the objection follows the word.",
    },
  },
  {
    id: "fr-crime-drop",
    scenario: {
      en: "One newspaper reports that crime fell by 5 percent. Another reports that 95 percent of last year's crime is still happening. Readers of the second are far gloomier, and an editor concludes the public mood has shifted.",
    },
    trap: "framing-effect",
    explanation: {
      en: "Both sentences describe the same change. The mood tracked which sentence a reader met, so it is evidence about the two write-ups rather than about the public.",
    },
  },
  {
    id: "fr-battery-warning",
    scenario: {
      en: "An app tells one group of users their battery is at 20 percent and another group that 80 percent is used. The second group plugs in sooner, and the designer reports that users respond better to usage information.",
    },
    trap: "framing-effect",
    explanation: {
      en: "The two readouts carry identical information about the battery. The behaviour changed with the wording, which tells you about the framing rather than about what users understand.",
    },
  },
  {
    id: "fr-donation-ask",
    scenario: {
      en: "A charity asks one group to give 2 pounds and tells another that 2 pounds is all it takes to stop a child going without. The second group gives far more often, and the charity concludes those donors care more.",
    },
    trap: "framing-effect",
    explanation: {
      en: "The sum asked for is identical, and the donors were not selected for anything. The difference is entirely in how the ask was worded, so it says nothing about who cares more.",
    },
  },
  {
    id: "fr-exam-pass",
    scenario: {
      en: "A school reports that 7 in 10 pupils passed. A local paper reports that 3 in 10 failed. Parents surveyed after reading the paper rate the school much worse, and a governor concludes the paper uncovered a real decline.",
    },
    trap: "framing-effect",
    explanation: {
      en: "Nothing was uncovered, because the two reports carry one result. The parents were reacting to whether the number was given as passes or as failures.",
    },
  },

  // ---- Sound reasoning about wording (more decoys) ----
  {
    id: "ok-both-framings-given",
    scenario: {
      en: "A consent leaflet states that the operation has a 90 percent survival rate and, in the same paragraph, that 10 percent of patients die, so that the reader meets the result stated both ways before deciding.",
    },
    trap: null,
    explanation: {
      en: "Giving both statements of the identical figure is the standard defence against framing, since the reader cannot be steered by whichever end was chosen for them.",
    },
  },
  {
    id: "ok-real-difference-not-wording",
    scenario: {
      en: "Two treatments were described to patients in the same words, using the same survival framing for both, and patients still chose one far more often. The report concludes patients prefer that treatment.",
    },
    trap: null,
    explanation: {
      en: "The wording was held constant across the two options, so the difference in choices cannot be an artefact of framing. The preference is about the treatments.",
    },
  },
  {
    id: "ok-wording-reported",
    scenario: {
      en: "A polling company publishes the exact question wording alongside its result, and notes that an alternative wording tested at the same time produced a different level of support, so readers can see how sensitive the finding is.",
    },
    trap: null,
    explanation: {
      en: "Publishing the wording, and what a different wording produced, treats the framing as part of the finding. That is the honest way to report an opinion measurement.",
    },
  },

  // ---- Misleading chart axes ----
  {
    id: "mx-injuries-inverted",
    scenario: {
      en: "A safety report charts workplace injuries by year, with the vertical axis running from 0 at the top down to 500 at the bottom. The plotted line climbs steadily up the page across five years. A local paper reports that injuries have risen sharply.",
    },
    trap: "misleading-axis",
    explanation: {
      en: "With zero at the top, a line climbing the page is a count falling towards zero. The paper read the shape of the line and not the direction of the axis, and printed the opposite of what the chart shows.",
    },
  },
  {
    id: "mx-truncated-scores",
    scenario: {
      en: "Two schools' average exam marks are drawn as bars on a vertical axis running from 68 to 72. One bar is more than twice the height of the other, and a campaign leaflet says the first school performs twice as well.",
    },
    trap: "misleading-axis",
    explanation: {
      en: "The two averages differ by about two marks out of a hundred. Starting the axis at 68 cuts away everything the schools have in common, so the remaining sliver fills the frame. Bar heights are only ratios when the axis starts at zero.",
    },
  },
  {
    id: "mx-aspect-stretch",
    scenario: {
      en: "A company plots monthly revenue on a chart four times taller than it is wide. The line looks close to vertical and the annual report describes explosive growth. Drawn on a square chart, the identical figures rise gently.",
    },
    trap: "misleading-axis",
    explanation: {
      en: "The same numbers cannot be both explosive and gentle. Steepness is a property of the frame a line is drawn in as much as of the data, so a rate of change read off the slope alone is not a measurement.",
    },
  },
  {
    id: "mx-no-labels",
    scenario: {
      en: "An infographic shows two bars, one clearly taller than the other, above a caption stating that the difference is dramatic. The vertical axis carries no numbers and no label.",
    },
    trap: "misleading-axis",
    explanation: {
      en: "With no scale the bars say nothing about size: the gap could be one percent or a hundredfold. An unlabelled axis turns an assertion into something drawn to look like evidence.",
    },
  },
  {
    id: "mx-dual-axis",
    scenario: {
      en: "A chart plots ice cream sales against a left-hand axis and library visits against a right-hand one, each scaled so the two lines sit almost on top of each other. The commentary says the two track each other almost perfectly.",
    },
    trap: "misleading-axis",
    explanation: {
      en: "Two independent axes can be scaled to make almost any pair of series overlap, and rescaling either one pulls the lines apart again. How closely they sit is a choice made by whoever drew the chart, not a finding.",
    },
  },
  {
    id: "mx-log-unsaid",
    scenario: {
      en: "A chart of cases over time uses a vertical axis where each gridline is ten times the one below it. The curve rises as a straight line, and a summary describes growth as steady.",
    },
    trap: "misleading-axis",
    explanation: {
      en: "On a scale where each step multiplies by ten, a straight line means the count is multiplying at a constant rate, so it is doubling again and again. That is the fastest kind of growth there is, and the summary read the shape as if the axis were an ordinary one.",
    },
  },
  {
    id: "mx-flattened",
    scenario: {
      en: "A regulator draws two regions' contamination readings as bars on an axis running from 0 to 10,000, although both regions sit between 40 and 90. The bars are indistinguishable, and the report concludes there is no meaningful difference between them.",
    },
    trap: "misleading-axis",
    explanation: {
      en: "One region reads about twice the other, and the chart has flattened that into invisibility by running the axis far past anything in the data. An axis can bury a real difference as easily as it can manufacture a fake one.",
    },
  },
  {
    id: "mx-satisfaction-zoom",
    scenario: {
      en: "A customer satisfaction tracker is charted on a vertical axis running from 44 to 48 percent. The line zigzags violently from the top of the frame to the bottom and back, and a commentary describes wild swings in how customers feel.",
    },
    trap: "misleading-axis",
    explanation: {
      en: "The whole chart is four points tall, so a movement of a point or so, which is inside the noise of most surveys, crosses the entire frame. The violence is in the axis rather than in the customers.",
    },
  },
  {
    id: "mx-waiting-times-inverted",
    scenario: {
      en: "A hospital dashboard shows average waiting times with the vertical axis running from 120 minutes at the top down to 0 at the bottom. The bars for the newest quarter are the tallest on the chart, and the newsletter reports the longest waits on record.",
    },
    trap: "misleading-axis",
    explanation: {
      en: "The axis is upside down, so the tallest bar is the shortest wait. The newsletter took height to mean magnitude, which is exactly the reflex this layout defeats.",
    },
  },
  {
    id: "mx-broken-axis-cropped",
    scenario: {
      en: "A chart of quarterly sales has a zigzag break drawn low on the vertical axis, marking a stretch of the scale that has been left out. A slide deck reproduces the chart with the break cropped off the bottom and presents the remaining bars as showing sales tripling.",
    },
    trap: "misleading-axis",
    explanation: {
      en: "The break was the chart's own warning that its heights are not proportional to its numbers. Cropping it away leaves bars that look like a ratio and are not one.",
    },
  },

  // ---- Sound reasoning about axes (more decoys) ----
  {
    id: "ok-rank-axis-inverted",
    scenario: {
      en: "A league table is charted with position 1 at the top of the vertical axis and position 20 at the bottom, the axis labelled Position, so a line climbing the page is a team climbing the table.",
    },
    trap: null,
    explanation: {
      en: "The axis runs downwards because that is what the quantity means: first place is the top. The direction is labelled and agrees with the reader's intuition rather than fighting it, so nothing is being reversed.",
    },
  },
  {
    id: "ok-truncated-declared",
    scenario: {
      en: "A chart of body temperature through a day starts its vertical axis at 36 degrees rather than zero, prints the range on the axis, and the text reports the change in degrees rather than describing how tall the line got.",
    },
    trap: null,
    explanation: {
      en: "A zero baseline would be meaningless for a quantity that never goes near zero, and the claim is made in units rather than read off the height. The axis is doing its job and saying what it did.",
    },
  },
  {
    id: "ok-log-declared",
    scenario: {
      en: "An epidemic curve is drawn on a scale where each gridline is ten times the last, the axis says so in its label, and the accompanying text states that cases are doubling every nine days.",
    },
    trap: null,
    explanation: {
      en: "The scale is declared and the finding is given as a doubling time, a number the reader can check, rather than inferred from how steep the line looks. That is the right way to use a multiplying axis.",
    },
  },
  {
    id: "ok-both-axis-versions",
    scenario: {
      en: "A report prints the same figures twice, once on an axis starting at zero and once zoomed in on the range the data actually occupies, and says which question each version is there to answer.",
    },
    trap: null,
    explanation: {
      en: "Both framings are true and they answer different questions, one about the size of the difference and one about its shape. Showing both means the reader is not depending on someone else's choice of scale.",
    },
  },

  // ---- Mean versus median ----
  {
    id: "mm-startup-salary",
    scenario: {
      en: "A startup with 30 staff advertises an average salary of 95,000. The founder and two executives take home over a million between them. A candidate is told they can expect to earn about the average.",
    },
    trap: "mean-vs-median",
    explanation: {
      en: "Three very large salaries pull the average far above what the other 27 people earn. The candidate should ask what the middle employee is paid, because that is the figure their own offer will sit near.",
    },
  },
  {
    id: "mm-waiting-time",
    scenario: {
      en: "A clinic reports a mean waiting time of 40 minutes. Most patients are seen within 15 minutes, but a handful wait several hours when an emergency comes in. A manager tells patients to expect a 40 minute wait.",
    },
    trap: "mean-vs-median",
    explanation: {
      en: "Waiting time has a floor of zero and no ceiling, so the rare multi-hour waits drag the mean well above the typical experience. The median wait describes what a patient should actually expect.",
    },
  },
  {
    id: "mm-house-prices",
    scenario: {
      en: "A district reports that the average house sold last year went for 780,000. Reporting notes that a small number of large estates changed hands. A council paper uses the 780,000 figure to argue ordinary families can afford to buy there.",
    },
    trap: "mean-vs-median",
    explanation: {
      en: "A few very expensive sales lift the mean without changing what an ordinary house costs. Housing affordability is normally reported as a median precisely because sale prices have such a long upper tail.",
    },
  },
  {
    id: "mm-charity-donation",
    scenario: {
      en: "A charity announces that its supporters give an average of 240 a year and asks members whether they are giving their fair share. One donor that year gave several million.",
    },
    trap: "mean-vs-median",
    explanation: {
      en: "A single enormous gift can lift the mean of a large group on its own. Asking ordinary members to measure themselves against that figure compares them with a number no ordinary member produced.",
    },
  },
  {
    id: "mm-hospital-stay",
    scenario: {
      en: "A ward reports a mean length of stay of 6.2 days and plans its bed numbers on the assumption that a typical patient occupies a bed for about six days. Most patients go home on day two or three; a few stay for months.",
    },
    trap: "mean-vs-median",
    explanation: {
      en: "The long-stay patients pull the mean upward while the typical patient leaves far sooner. Planning around the mean will misjudge both how fast beds turn over and how many are locked up long term.",
    },
  },
  {
    id: "mm-app-revenue",
    scenario: {
      en: "A marketplace tells prospective sellers that the average shop on the platform earns 3,400 a month. A handful of very large shops account for most of the platform's sales volume.",
    },
    trap: "mean-vs-median",
    explanation: {
      en: "With a few dominant shops, the mean describes almost none of the sellers. A prospective seller wants the middle shop's earnings, and would also want to know how many shops earn nothing at all.",
    },
  },
  {
    id: "mm-class-scores",
    scenario: {
      en: "A tutor reports that students improved by an average of 18 points. Of the 20 students, 17 gained about 4 points and 3 gained more than 90 each after starting from almost zero.",
    },
    trap: "mean-vs-median",
    explanation: {
      en: "The three large gains carry the average. Reporting 18 points as the typical improvement describes none of the 17 students who actually make up the bulk of the class.",
    },
  },
  {
    id: "mm-response-time",
    scenario: {
      en: "A support team advertises a mean first-response time of 2 hours. Almost all tickets are answered within 20 minutes, while a small number sit unanswered for days. The team treats the 2 hour figure as its service standard.",
    },
    trap: "mean-vs-median",
    explanation: {
      en: "The stalled tickets are what produce the 2 hour mean, and they are exactly the cases the standard should be about. A median plus a worst-case percentile would describe both the usual case and the failures.",
    },
  },
  {
    id: "mm-family-wealth",
    scenario: {
      en: "A report states that average household wealth in a country is 480,000 and concludes that most households have substantial savings to fall back on in a downturn.",
    },
    trap: "mean-vs-median",
    explanation: {
      en: "Wealth is among the most lopsided quantities there is, with a floor at zero and an extremely long tail, so the mean sits far above the middle household. Nothing about typical savings follows from it.",
    },
  },
  {
    id: "mm-average-citations",
    scenario: {
      en: "A department evaluates researchers by the average citations of the journals they publish in, treating a paper in a high-average journal as a stronger paper than one in a low-average journal.",
    },
    trap: "mean-vs-median",
    explanation: {
      en: "A journal's average is dragged up by a small number of very heavily cited papers, so most of its papers fall below it. The average of the container says remarkably little about any individual item in it.",
    },
  },

  // ---- Sound reasoning about averages (more decoys) ----
  {
    id: "ok-median-reported",
    scenario: {
      en: "A statistics agency reports median household income and states the mean alongside it, noting that the gap between the two reflects how unevenly income is spread.",
    },
    trap: null,
    explanation: {
      en: "Both figures are given and the gap between them is explained rather than hidden. That is the standard honest way to report a quantity with a long tail.",
    },
  },
  {
    id: "ok-mean-symmetric",
    scenario: {
      en: "A factory reports the mean diameter of a machined part as 20.00 mm, with measurements clustered tightly and symmetrically either side of that value.",
    },
    trap: null,
    explanation: {
      en: "For a symmetric, tightly clustered quantity the mean and the median coincide, and the mean is the right summary. The problem only arises when the distribution is lopsided.",
    },
  },
  {
    id: "ok-mean-for-total",
    scenario: {
      en: "A utility multiplies the mean household consumption by the number of households to work out how much electricity it must generate in total.",
    },
    trap: null,
    explanation: {
      en: "The mean is exactly the right tool here, because a total is what it is built from. It would be the wrong tool for describing a typical household, which is a different question.",
    },
  },
];

/** Fail fast on malformed items, same contract discipline as puzzles. */
export const TEST_ITEMS: TestItem[] = items.map((item) => {
  const parsed = TestItem.safeParse(item);
  if (!parsed.success) {
    throw new Error(
      `Invalid test item "${item.id}": ${parsed.error.issues.map((i) => i.message).join("; ")}`,
    );
  }
  return parsed.data;
});
