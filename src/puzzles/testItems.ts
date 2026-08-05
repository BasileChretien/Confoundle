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

  // ---- Counting reports is not counting events ----
  {
    id: "rr-harassment-policy",
    scenario: {
      en: "A company introduces an anonymous reporting line for harassment and runs a campaign telling staff how to use it. Reported incidents triple over the following year, and a board paper concludes that harassment has become a serious and worsening problem at the firm.",
    },
    trap: "reporting-rate",
    explanation: {
      en: "The campaign was designed to raise the share of incidents that get reported, and it appears to have worked. A count of reports moves when reporting moves, so a tripling immediately after a push to report tells you very little about whether the underlying behaviour changed at all.",
    },
  },
  {
    id: "rr-adverse-drug-reactions",
    scenario: {
      en: "A drug regulator notes that reported side effects for a medicine rose sharply in the year after a widely covered safety scare, and a newspaper reports that the drug has become more dangerous.",
    },
    trap: "reporting-rate",
    explanation: {
      en: "Publicity is one of the strongest known drivers of spontaneous reporting. Doctors and patients who would previously have shrugged an event off now file it, so the count climbs while the risk per patient stays where it was.",
    },
  },
  {
    id: "rr-hospital-incident-forms",
    scenario: {
      en: "A hospital ward makes incident forms easier to file and protects staff who file them. Reported near misses double the next quarter, and the trust's risk committee grades the ward as less safe than the one next door, which reported almost none.",
    },
    trap: "reporting-rate",
    explanation: {
      en: "The ward that reports nothing is the one nobody can see into. Making reporting easier raises the count without raising the number of near misses, and a ward with a healthy reporting culture will always look worse than a silent one on a measure built out of reports.",
    },
  },
  {
    id: "rr-fraud-detection-team",
    scenario: {
      en: "A bank hires a dedicated fraud team and installs new detection software. Confirmed fraud cases rise 60 per cent over two years, and the annual report presents this as evidence that fraud against the bank is escalating.",
    },
    trap: "reporting-rate",
    explanation: {
      en: "The bank changed how much fraud it can see, then measured how much it saw. A rise in confirmed cases is exactly what a working detection system produces, whether the attempts against the bank went up, stayed flat or fell.",
    },
  },
  {
    id: "rr-missing-persons",
    scenario: {
      en: "A police force changes its policy so that every report of a missing child is logged immediately rather than after a waiting period. The recorded number of missing children in the county rises by a third, and a councillor calls it a child safety crisis.",
    },
    trap: "reporting-rate",
    explanation: {
      en: "The definition of what enters the record changed on a known date, so the series before and after are not counting the same thing. The rise measures a policy, and nothing in it says whether more children went missing.",
    },
  },
  {
    id: "rr-food-poisoning-outbreak",
    scenario: {
      en: "A public health agency introduces free testing for a stomach bug at pharmacies. Confirmed cases in the region climb steeply and the agency's press office announces an outbreak.",
    },
    trap: "reporting-rate",
    explanation: {
      en: "Free testing converts illnesses that would never have been counted into confirmed cases. The confirmed count is the illness rate multiplied by the testing rate, and only one of those two clearly changed.",
    },
  },
  {
    id: "rr-falling-count-reassurance",
    scenario: {
      en: "After a police station closes and the local force moves to an online reporting form, recorded shoplifting in the town falls by a quarter. The force cites the fall in its annual performance summary.",
    },
    trap: "reporting-rate",
    explanation: {
      en: "This is the same error running downhill, which is why it rarely gets challenged. Making reporting harder removes reports, and a count built from reports will fall whether or not a single shoplifting stopped happening.",
    },
  },
  {
    id: "rr-two-instruments-disagree",
    scenario: {
      en: "A government's administrative count of homelessness rises for the fifth year running, while a household survey of the same population finds the number falling. A minister quotes the administrative figure, noting that it is a full count rather than a sample.",
    },
    trap: "reporting-rate",
    explanation: {
      en: "Being a full count is no defence: it is a full count of the people who reached the system, and access to the system can change. The disagreement between two instruments is the finding here, and picking whichever supports your position throws away the only useful information available.",
    },
  },
  {
    id: "rr-hate-crime-league-table",
    scenario: {
      en: "A league table ranks police forces by recorded hate crime per head. The force at the top, which has spent three years training officers to identify and log these offences, is described as policing the country's least tolerant area.",
    },
    trap: "reporting-rate",
    explanation: {
      en: "The force that got better at recording rises up a table built out of records. Comparing areas on a recorded count compares their recording practice at least as much as it compares their behaviour, so the ranking may be close to upside down.",
    },
  },
  {
    id: "rr-app-bug-reports",
    scenario: {
      en: "A software team adds a one-tap crash reporting button to its app. Reported bugs per week double, and the engineering lead tells the board that quality has deteriorated since the last release.",
    },
    trap: "reporting-rate",
    explanation: {
      en: "The team lowered the cost of reporting and then read the resulting rise as a fall in quality. Crash telemetry that fires without a user deciding anything would answer the quality question; a count of voluntary reports answers a different one.",
    },
  },

  // ---- The margin on a lead is not the margin on the poll ----
  {
    id: "moe-two-flavours",
    scenario: {
      en: "An ice cream maker polls 900 customers on a new flavour. 46 per cent prefer the new one, 41 per cent the old, and the report notes a margin of error of plus or minus 3.3 points. The company launches the new flavour, citing a lead outside the margin of error.",
    },
    trap: "margin-of-error",
    explanation: {
      en: "The 3.3 is the margin on one share. The five point lead is a difference between two shares of the same 900 people, and its own margin is close to twice that, so the poll has not separated the two flavours. Doubling the printed margin before believing a lead is the whole check.",
    },
  },
  {
    id: "moe-subgroup-difference",
    scenario: {
      en: "A survey of 1,500 adults finds 61 per cent of women and 55 per cent of men agree with a statement, and reports a margin of error of plus or minus 2.5 points for the full sample. The write-up calls the six point gender gap statistically significant.",
    },
    trap: "margin-of-error",
    explanation: {
      en: "Two things are wrong at once. The margin quoted belongs to the full sample, while each subgroup is roughly half that size and carries a wider margin of its own, and the gap between two subgroups is a difference and needs a wider margin again. Neither correction was made.",
    },
  },
  {
    id: "moe-month-on-month",
    scenario: {
      en: "A tracking poll puts approval at 44 per cent this month against 41 per cent last month, each survey with a margin of plus or minus 3 points. A commentator describes the three point rise as real movement because it matches the margin.",
    },
    trap: "margin-of-error",
    explanation: {
      en: "A change between two surveys is a difference between two independent samples, so the margin on the change is about 4.2 points, wider than either survey's own. A three point move sits comfortably inside it, and matching the single-survey margin is not a test of anything.",
    },
  },
  {
    id: "moe-inside-the-band",
    scenario: {
      en: "A poll of 1,000 people finds a product recommended by 52 per cent and not recommended by 48 per cent, with a margin of plus or minus 3.1 points. A press release says a clear majority recommends it.",
    },
    trap: "margin-of-error",
    explanation: {
      en: "The four point lead is smaller than the margin on the difference, which is about 6.2 points here, so the poll cannot say which side is ahead at all. Reading a majority off a split this close is reading the noise.",
    },
  },
  {
    id: "moe-narrow-crosstab",
    scenario: {
      en: "A national poll of 1,200 adults reports a margin of plus or minus 2.8 points. A columnist quotes the result for adults under 30, a group of 180 respondents in the sample, and applies the same margin to it.",
    },
    trap: "margin-of-error",
    explanation: {
      en: "A margin of error shrinks with the square root of the sample it is computed on. On 180 respondents it is around 7.3 points, not 2.8, so the crosstab is far softer than the headline figure and the same number cannot be carried down the table.",
    },
  },
  {
    id: "moe-three-way",
    scenario: {
      en: "Three options in a survey of 800 people draw 36, 33 and 31 per cent, with a stated margin of plus or minus 3.5 points. A summary ranks them first, second and third.",
    },
    trap: "margin-of-error",
    explanation: {
      en: "Every gap in that ranking is smaller than the margin on a difference, which is around 7 points at these shares, so the ordering is not established by the data. A poll can say all three are in the same region without being able to say which is on top.",
    },
  },
  {
    id: "moe-two-departments",
    scenario: {
      en: "An employer surveys 1,000 staff and reports engagement scores of 71 per cent in one department and 67 in another, each department contributing about 500 responses, alongside the survey's margin of error of plus or minus 3.1 points. The second department is put on an improvement plan.",
    },
    trap: "margin-of-error",
    explanation: {
      en: "The 3.1 was computed on the whole survey. Each department rests on about half that, so each already carries a margin near 4.2 points, and the difference between the two carries about 5.9. A four point gap is well inside it, and the department is being managed on noise.",
    },
  },
  {
    id: "moe-exit-poll-lead",
    scenario: {
      en: "A survey of 2,000 households finds 49 per cent of homes have a particular appliance in a coastal region and 45 per cent inland, each region contributing about half the sample, and the report treats the four point difference as established.",
    },
    trap: "margin-of-error",
    explanation: {
      en: "The two regional figures rest on about 1,000 respondents each, so each already carries a margin near 3 points, and the difference between two independent groups carries about 4.4. A four point gap does not clear it.",
    },
  },
  {
    id: "moe-precision-theatre",
    scenario: {
      en: "A polling firm reports support at 47.3 per cent with a margin of error of plus or minus 3 points, and a headline notes that support has slipped from 47.8 per cent last week.",
    },
    trap: "margin-of-error",
    explanation: {
      en: "A decimal point on an estimate whose margin is three points is precision the survey does not have, and a half point week-on-week move is far inside the margin on a change. The extra digit invites a comparison the data cannot support.",
    },
  },
  {
    id: "moe-approval-two-groups",
    scenario: {
      en: "A hospital surveys 1,400 patients and reports that 68 per cent of day-case patients and 63 per cent of inpatients rated their care as good, with a margin of error of plus or minus 2.6 points, and concludes that day cases are more satisfied.",
    },
    trap: "margin-of-error",
    explanation: {
      en: "The five point difference is between two groups, each smaller than the full sample the 2.6 was computed on, and a difference needs a wider margin than either group's own. Nothing in the report has compared the gap against a ruler built for a gap.",
    },
  },
  {
    id: "moe-lead-narrowed",
    scenario: {
      en: "A poll last month put one option 9 points ahead and this month puts it 5 points ahead, both surveys of about 1,000 people with margins near plus or minus 3 points. A newspaper reports that the lead has narrowed.",
    },
    trap: "margin-of-error",
    explanation: {
      en: "A change in a lead is a difference between two differences, and its margin is wider than any of the four figures behind it, comfortably more than the four point move being reported. Each individual lead may be real while the change between them is invisible.",
    },
  },
  {
    id: "moe-tie-called",
    scenario: {
      en: "Two products are tested with the same 1,100 users. One is preferred by 51 per cent, the other by 49, and the margin of error is plus or minus 3 points. A blog post reports the result as too close to call.",
    },
    trap: null,
    explanation: {
      en: "This is sound. The two point gap is smaller than the margin on a single share, and smaller again than the wider margin that belongs to a difference, so declining to name a winner is the correct reading. Note that being right here needs no arithmetic: when the gap is below even the printed margin, no correction can rescue a lead.",
    },
  },
  {
    id: "moe-doubled-first",
    scenario: {
      en: "An analyst looking at a poll of 1,000 people, where one option draws 55 per cent and another 38 with a printed margin of plus or minus 3.1 points, notes that the 17 point lead would survive even a margin twice as wide, and reports the lead as real.",
    },
    trap: null,
    explanation: {
      en: "This is sound, and it is sound because of the check that was made rather than the conclusion that was reached. Doubling the printed margin before believing a lead is the right rule of thumb for two shares of one sample, and a 17 point gap clears it easily.",
    },
  },
  {
    id: "moe-named-the-quantity",
    scenario: {
      en: "A pollster is asked whether a four point lead in her latest survey is outside the margin of error. They reply that the printed margin applies to each candidate's share, that the margin on the gap between them is roughly twice that, and that the survey therefore cannot separate the two.",
    },
    trap: null,
    explanation: {
      en: "This is sound. They have identified which quantity the claim is about before choosing a ruler for it, which is exactly the step that the usual reading skips.",
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

  // ---- The illusory truth effect ----
  {
    id: "it-slogan-repeat",
    scenario: {
      en: "A campaign repeats one unsupported claim in every advert for six weeks. Polling afterwards finds more people rate the claim plausible than before, and the campaign concludes that the public examined the argument and found it convincing.",
    },
    trap: "illusory-truth",
    explanation: {
      en: "No argument was ever offered, so nothing was examined. Repetition on its own raises how true a claim feels, which means the poll measured exposure rather than persuasion by evidence.",
    },
  },
  {
    id: "it-rumour-familiar",
    scenario: {
      en: "A rumour circulates in an office for a month. Asked about it, staff say it must have something to it because they have heard it from several directions, though nobody can name an original source.",
    },
    trap: "illusory-truth",
    explanation: {
      en: "Hearing something from several directions feels like corroboration and is often just the same claim going round. Without an original source, the sense that it must have something to it is a memory of exposure, not evidence.",
    },
  },
  {
    id: "it-factcheck-restate",
    scenario: {
      en: "A newspaper runs a weekly column that restates a popular false claim in its headline and debunks it underneath. A survey a month later finds readers of the column more likely to believe the claim than non-readers.",
    },
    trap: "illusory-truth",
    explanation: {
      en: "Every restatement is another exposure, and the familiarity outlasts the correction attached to it. Leading with the falsehood is the risky format; leading with the true version and never headlining the false one avoids it.",
    },
  },
  {
    id: "it-ad-frequency",
    scenario: {
      en: "A brand runs the same claim about its product 40 times a week rather than 4, and reports that the higher frequency is what made audiences believe it, since belief was higher than in an unexposed region.",
    },
    trap: "illusory-truth",
    explanation: {
      en: "Comparing 40 exposures against zero cannot tell you what the extra 36 bought. Most of the shift in believability arrives on the first repeat, so the comparison the claim needs is 40 against 4, not 40 against none.",
    },
  },
  {
    id: "it-training-myth",
    scenario: {
      en: "A teaching myth is repeated in induction sessions year after year. Staff who first heard it as a caution, and were told at the time it was unproven, now cite it as established practice.",
    },
    trap: "illusory-truth",
    explanation: {
      en: "What survives repetition is the claim, not the caveat attached to it. People can dismiss something on first contact, forget where they met it, and later find it plausible purely because it feels familiar.",
    },
  },
  {
    id: "it-headline-skim",
    scenario: {
      en: "A reader scrolls past the same unverified headline on four platforms without opening any of them. Weeks later they repeat it in conversation as something they are fairly sure is true, and cannot say where they read it.",
    },
    trap: "illusory-truth",
    explanation: {
      en: "Not being able to name the source while feeling fairly sure is the signature of the effect. The confidence is built out of fluency from repeated exposure rather than out of anything anyone actually checked.",
    },
  },
  {
    id: "it-expert-knows",
    scenario: {
      en: "A team assumes its specialists are immune to a repeated falsehood about their own field, on the grounds that they know the correct answer and would simply notice.",
    },
    trap: "illusory-truth",
    explanation: {
      en: "Knowing the right answer does not prevent the feeling of familiarity, which arrives before any deliberate checking. People who can state the correct fact when asked directly still rate the repeated falsehood as more plausible.",
    },
  },
  {
    id: "it-review-echo",
    scenario: {
      en: "A product claim is quoted in a dozen blog posts, all of which trace back to a single press release. A buyer says the claim is well supported because it appears in so many places.",
    },
    trap: "illusory-truth",
    explanation: {
      en: "A dozen copies of one source is one source. Counting appearances measures how widely something was repeated, which is a fact about distribution and not about whether it is true.",
    },
  },
  {
    id: "it-slow-drip",
    scenario: {
      en: "An organisation decides that a rival's occasional, low-volume repetition of a false claim is harmless, because it is nothing like a saturation campaign and so cannot move anyone.",
    },
    trap: "illusory-truth",
    explanation: {
      en: "The dose response is heavily front-loaded, so the first repeat does most of the work and a low-volume drip is not proportionally harmless. Volume is not what makes repetition effective.",
    },
  },
  {
    id: "it-familiar-plausible",
    scenario: {
      en: "Sorting claims to investigate, a team puts the ones that sound plausible at the bottom of the list, reasoning that plausible-sounding claims are less likely to be worth checking.",
    },
    trap: "illusory-truth",
    explanation: {
      en: "Sounding plausible is partly just having been encountered before, so this rule deprioritises exactly the claims that have already circulated most. Familiarity and truth feel identical from the inside.",
    },
  },

  // ---- Sound reasoning about repetition (more decoys) ----
  {
    id: "ok-repeat-with-evidence",
    scenario: {
      en: "A public health body repeats one message consistently for a year, and the message states a finding along with the trial it comes from, so that each repetition carries the evidence with it.",
    },
    trap: null,
    explanation: {
      en: "Repetition is a delivery choice and not a flaw in itself. What matters is whether the claim is supported, and here the support travels with it rather than being replaced by familiarity.",
    },
  },
  {
    id: "ok-independent-sources",
    scenario: {
      en: "A claim is reported by three outlets that each did their own reporting, naming different primary documents and interviewing different people, and an editor treats the agreement as genuine corroboration.",
    },
    trap: null,
    explanation: {
      en: "These are independent lines of evidence rather than one claim echoing, so their agreement really is corroboration. The problem arises only when repeated appearances all trace back to a single source.",
    },
  },
  {
    id: "ok-truth-sandwich",
    scenario: {
      en: "A broadcaster corrects a false claim by leading with the accurate version, describing the false one briefly and only once, and closing on the accurate version again.",
    },
    trap: null,
    explanation: {
      en: "This is the format designed around the problem: the true statement gets the repetitions and the false one gets as few as possible. Correcting is not the risk; headlining the falsehood repeatedly is.",
    },
  },

  // ---- Anchoring ----
  {
    id: "an-salary-first",
    scenario: {
      en: "A recruiter opens by naming a figure far above anything the role has ever paid. The final agreed salary lands well above the usual range, and the employer concludes the candidate negotiated unusually well.",
    },
    trap: "anchoring",
    explanation: {
      en: "The opening figure set the scale on which every later number was judged, so the settlement drifted toward it. That is a fact about who spoke first, not about anyone's negotiating skill.",
    },
  },
  {
    id: "an-charity-ladder",
    scenario: {
      en: "A donation page offers preset amounts starting at 500. Average gifts rise compared with the previous page, which started at 20, and the charity reports that supporters have become more generous.",
    },
    trap: "anchoring",
    explanation: {
      en: "The same supporters met a different first number. Presets are anchors, so the shift measures the design of the page rather than any change in generosity.",
    },
  },
  {
    id: "an-price-was-now",
    scenario: {
      en: "A shop labels an item as reduced from 200 to 90. Shoppers rate it better value than the identical item labelled simply as 90, and the shop concludes they prefer the discounted version.",
    },
    trap: "anchoring",
    explanation: {
      en: "The struck-through 200 is a reference point rather than information about the item, and value judgements are made relative to it. The product and the price paid are the same in both cases.",
    },
  },
  {
    id: "an-estimate-meeting",
    scenario: {
      en: "In a planning meeting the most senior person says a task will take about two weeks before anyone else speaks. The team's estimates cluster near two weeks, and the manager treats the agreement as independent confirmation.",
    },
    trap: "anchoring",
    explanation: {
      en: "Once a number is in the room, later estimates adjust from it rather than being formed independently. Agreement reached this way is not corroboration; the estimates should be written down before anyone speaks.",
    },
  },
  {
    id: "an-house-listing",
    scenario: {
      en: "Two groups of appraisers tour the same house with identical information packs, except that the listed asking price differs. Their valuations differ in the same direction, and the agency concludes one group was better at spotting the property's potential.",
    },
    trap: "anchoring",
    explanation: {
      en: "The house was identical, so the difference tracks the listing price and nothing about the property. Expertise does not remove the pull; it mostly makes people more confident that it did not apply to them.",
    },
  },
  {
    id: "an-budget-lastyear",
    scenario: {
      en: "A department builds next year's budget by starting from last year's figure and adjusting. When challenged, the finance lead says the process is evidence-based because every adjustment was justified line by line.",
    },
    trap: "anchoring",
    explanation: {
      en: "Justifying each step away from a starting point does not test the starting point itself, and adjustments from an anchor are systematically too small. A zero-based estimate would answer a different and better question.",
    },
  },
  {
    id: "an-random-number",
    scenario: {
      en: "Before estimating an unfamiliar quantity, participants are asked to write down the last two digits of their phone number. Estimates correlate with those digits, and the researcher concludes the sample must be unrepresentative.",
    },
    trap: "anchoring",
    explanation: {
      en: "An anchor does not have to be relevant or even plausible to work, and participants can know it is arbitrary and still be moved by it. The correlation is the expected result, not a sign of a bad sample.",
    },
  },
  {
    id: "an-sentencing-demand",
    scenario: {
      en: "Two panels assess the same case file, given different suggested figures for the penalty by a party with no expertise. Their recommendations track the suggestions, and a reviewer concludes the panels disagreed about the facts.",
    },
    trap: "anchoring",
    explanation: {
      en: "The file was identical, so there was nothing factual to disagree about. What differed was the number each panel was handed before it started, which set the range their adjustments moved within.",
    },
  },
  {
    id: "an-extreme-demand",
    scenario: {
      en: "A group repeatedly voices a position far outside anything previously considered normal. Over time, positions that once looked extreme are described as moderate, and commentators say public opinion has genuinely moved to meet them.",
    },
    trap: "anchoring",
    explanation: {
      en: "Where the middle appears to be depends on what the endpoints are, and repeating a distant position moves the endpoints without any argument being made. That is a change in the frame rather than demonstrated movement in what people believe.",
    },
  },
  {
    id: "an-first-quote",
    scenario: {
      en: "A buyer collects three quotes for a job and judges the second and third as cheap or expensive relative to the first, which happened to arrive first for no particular reason.",
    },
    trap: "anchoring",
    explanation: {
      en: "The first quote arrived first by accident, yet it is doing the work of a benchmark. Cheap and expensive should be measured against what the job is worth, which none of the three quotes establishes on its own.",
    },
  },

  // ---- Sound reasoning about reference points (more decoys) ----
  {
    id: "ok-independent-estimates",
    scenario: {
      en: "A team asks every member to write down their estimate privately before any figure is spoken aloud, then reveals all of them at once and discusses the spread.",
    },
    trap: null,
    explanation: {
      en: "This is the standard defence: estimates formed before anyone hears a number are genuinely independent, so their spread carries information and their agreement is real corroboration.",
    },
  },
  {
    id: "ok-informative-baseline",
    scenario: {
      en: "An engineer estimates the cost of a new bridge by starting from the recorded cost of three comparable bridges and adjusting for size and materials, stating the comparators used.",
    },
    trap: null,
    explanation: {
      en: "Here the starting point is relevant evidence rather than an arbitrary number, and it is declared so the reader can judge it. Adjusting from an informative baseline is estimation working as intended.",
    },
  },
  {
    id: "ok-sensitivity-check",
    scenario: {
      en: "Before accepting a forecast, an analyst redoes it from a starting figure twice as large and again from one half as large, and reports that the conclusion holds in all three cases.",
    },
    trap: null,
    explanation: {
      en: "Testing whether the answer survives a different starting point is exactly how you find out whether you were reasoning or decorating an anchor. The conclusion here does not depend on where it began.",
    },
  },

  // ---- Gerrymandering ----
  {
    id: "gm-seats-vs-votes",
    scenario: {
      en: "A party wins 48 percent of the votes cast across a region and takes 70 percent of the seats. The party's chairman says the result shows the public clearly preferred them.",
    },
    trap: "gerrymandering",
    explanation: {
      en: "Fewer than half the voters chose them, so the seat count is a fact about how the boundaries gathered votes rather than about what the public preferred. Seats and votes are two different countings.",
    },
  },
  {
    id: "gm-who-drew",
    scenario: {
      en: "Boundaries for the next election are drawn by a committee controlled by one of the parties contesting it. That party then outperforms its vote share, and a spokesman calls the outcome a neutral consequence of geography.",
    },
    trap: "gerrymandering",
    explanation: {
      en: "Geography may well matter, but it cannot be assumed when the people who drew the lines had a stake in the result. The way to separate the two is to compare the enacted map against many maps drawn without a stake.",
    },
  },
  {
    id: "gm-shape-proof",
    scenario: {
      en: "A commentator points to a district with a strange snaking outline and says its shape proves the map was manipulated.",
    },
    trap: "gerrymandering",
    explanation: {
      en: "Shape is a weak clue in both directions: an odd outline can follow a river or a coastline, and a tidy rectangle can split a community deliberately. What settles it is how the map performs against alternatives, not how it looks.",
    },
  },
  {
    id: "gm-sales-regions",
    scenario: {
      en: "A manager redraws the sales regions, then reports that his own team now leads on the share of regions hitting target, even though total sales per person are unchanged.",
    },
    trap: "gerrymandering",
    explanation: {
      en: "The underlying performance did not move; only the boundaries the performance is counted inside did. Whenever results are measured within units somebody chose, the choice of unit is part of the result.",
    },
  },
  {
    id: "gm-packed-district",
    scenario: {
      en: "One district returns a candidate with 91 percent of its vote while six neighbouring districts are lost by two or three points each. A report describes the 91 percent as a stronghold and evidence of deep support.",
    },
    trap: "gerrymandering",
    explanation: {
      en: "A 91 percent result means tens of thousands of votes elected exactly one representative, while the narrow losses next door elected none. That pattern is the signature of packing, and it converts real support into very few seats.",
    },
  },
  {
    id: "gm-school-catchment",
    scenario: {
      en: "A council redraws school catchment boundaries and afterwards reports that the proportion of schools meeting the intake target has improved, with no change in the number of pupils or places.",
    },
    trap: "gerrymandering",
    explanation: {
      en: "Nothing about the pupils or the schools changed, so the improvement is entirely in where the lines were put. This is the same move as an electoral gerrymander, applied to catchments.",
    },
  },
  {
    id: "gm-both-sides",
    scenario: {
      en: "A researcher finds that in the states where one party controlled redistricting, its seat share exceeded its vote share, and concludes that this party is uniquely willing to manipulate boundaries.",
    },
    trap: "gerrymandering",
    explanation: {
      en: "The comparison needed is against states where the other party controlled the process, not against nothing. Without it, the finding is about who held the pen in the sample examined rather than about any party's character.",
    },
  },
  {
    id: "gm-efficiency",
    scenario: {
      en: "Asked whether a new map is fair, an official replies that every district contains almost exactly the same number of people, so the map cannot favour anyone.",
    },
    trap: "gerrymandering",
    explanation: {
      en: "Equal population is necessary and nowhere near sufficient. Maps with perfectly equal districts can produce almost any seat outcome, because what matters is which voters are grouped together, not how many.",
    },
  },
  {
    id: "gm-hospital-trusts",
    scenario: {
      en: "A regulator reorganises hospitals into new trusts and then reports that fewer trusts are now failing its standard, using the same underlying hospital-level data as before.",
    },
    trap: "gerrymandering",
    explanation: {
      en: "The hospitals performed the same before and after; only the groupings they are judged in changed. Counting failures at the level of a boundary somebody redrew measures the redrawing as much as the performance.",
    },
  },
  {
    id: "gm-one-election",
    scenario: {
      en: "A single election produces a large gap between one party's vote share and its seat share, and an analyst treats this as proof that the map was drawn to produce that gap.",
    },
    trap: "gerrymandering",
    explanation: {
      en: "One election cannot separate the map from the geography, since supporters of a party may genuinely be concentrated in cities whoever draws the lines. Establishing intent needs the same votes retallied on many alternative maps.",
    },
  },

  // ---- Sound reasoning about boundaries (more decoys) ----
  {
    id: "ok-ensemble-comparison",
    scenario: {
      en: "Before judging a district map, a team generates thousands of alternative maps by computer under the jurisdiction's own stated rules, retallies the same real votes on each, and reports where the enacted map falls in that distribution.",
    },
    trap: null,
    explanation: {
      en: "This is the method designed for the question: it holds the votes and the rules fixed and varies only the boundaries, so an unusual result cannot be explained away by geography. It is also blind to which party drew the map.",
    },
  },
  {
    id: "ok-independent-commission",
    scenario: {
      en: "Boundaries are drawn by a commission whose members are barred from standing in the elections concerned and who are given the population and geography data without party registration or past results.",
    },
    trap: null,
    explanation: {
      en: "The people drawing the lines have no stake in the outcome and lack the information needed to favour anyone even if they wished to. That is a process designed against the problem rather than a claim of good intentions.",
    },
  },
  {
    id: "ok-votes-reported",
    scenario: {
      en: "An election report gives both the seat totals and the vote totals for each party side by side, and notes the size of the gap between them without asserting a cause.",
    },
    trap: null,
    explanation: {
      en: "Publishing both countings and declining to explain the gap without evidence is exactly right. The gap is real and worth showing; attributing it to the map would need the comparison this report does not claim to have made.",
    },
  },

  // ---- Self-selection ----
  {
    id: "ss-online-poll",
    scenario: {
      en: "A newspaper puts a question on its website and reports that of 340,000 people who clicked, 78 percent agreed. It notes that this is far more responses than any conventional poll could gather.",
    },
    trap: "self-selection",
    explanation: {
      en: "Everyone in that 340,000 chose to click, and the thing that makes somebody bother to click is usually feeling strongly. The count is large and tells you nothing about the people who scrolled past.",
    },
  },
  {
    id: "ss-response-rate-unreported",
    scenario: {
      en: "A survey of doctors reports its sample size, its confidence intervals and its margin of error, but nowhere states how many of those approached agreed to take part.",
    },
    trap: "self-selection",
    explanation: {
      en: "A margin of error describes sampling variability among those who answered. It says nothing at all about the ones who did not, so a missing response rate leaves the largest possible bias unmeasured.",
    },
  },
  {
    id: "ss-bigger-fixes-it",
    scenario: {
      en: "A researcher worries that a volunteer survey may be unrepresentative and decides the fix is to keep it open longer and gather four times as many responses.",
    },
    trap: "self-selection",
    explanation: {
      en: "Every extra response arrives through the same self-selecting door as the ones before it, so the bias is reproduced rather than diluted. More volunteers is a bigger pile of volunteers.",
    },
  },
  {
    id: "ss-product-reviews",
    scenario: {
      en: "A product carries 4,000 reviews averaging 4.6 stars, and the seller cites the number of reviews as evidence that the rating is reliable.",
    },
    trap: "self-selection",
    explanation: {
      en: "People write reviews when they are delighted or furious, and mostly stay silent in between. The number of reviews measures how many people were moved to write, not how the product performs.",
    },
  },
  {
    id: "ss-phone-in",
    scenario: {
      en: "A radio programme invites listeners to call in about a proposed law and reports that callers ran nine to one against it.",
    },
    trap: "self-selection",
    explanation: {
      en: "Calling a radio station costs time and effort, which people spend when they are angry. A nine to one split among callers is evidence about intensity, not about how the audience divides.",
    },
  },
  {
    id: "ss-exit-survey",
    scenario: {
      en: "A hospital leaves satisfaction cards at the exit and reports that 92 percent of returned cards rated the visit good or excellent.",
    },
    trap: "self-selection",
    explanation: {
      en: "The people most upset by a visit are often the least likely to stop at a table and fill in a card on the way out. The returned cards are a sample of who chose to stay and write.",
    },
  },
  {
    id: "ss-mailing-list-fixed",
    scenario: {
      en: "A polling firm is criticised for an unrepresentative contact list, so it buys a properly random list of the whole population and mails everyone on it. A fifth reply, and it publishes the result as a random sample.",
    },
    trap: "self-selection",
    explanation: {
      en: "Randomising who you approach does nothing about who agrees to answer. A random list with a one in five reply rate yields a self-selected fifth, and the two problems need separate fixes.",
    },
  },
  {
    id: "ss-recruited-volunteers",
    scenario: {
      en: "A trial of a fitness programme advertises for participants and finds that those who enrolled improved substantially over six months, concluding the programme works.",
    },
    trap: "self-selection",
    explanation: {
      en: "People who answer an advertisement for a fitness programme are already motivated to get fitter, and some would have improved anyway. The comparison needed is against similar volunteers who were not given the programme.",
    },
  },
  {
    id: "ss-petition-count",
    scenario: {
      en: "A campaign presents a petition with 60,000 signatures and describes it as showing what the county thinks.",
    },
    trap: "self-selection",
    explanation: {
      en: "A petition counts only people who agreed and were reached and bothered to sign; there is no denominator and no way for a disagreeing person to be recorded. It measures organisation, not opinion.",
    },
  },
  {
    id: "ss-alumni-salaries",
    scenario: {
      en: "A university reports median graduate earnings from a survey its alumni office sent out, noting proudly that it received several thousand replies.",
    },
    trap: "self-selection",
    explanation: {
      en: "Graduates who are doing well are more willing to tell their university what they earn. The several thousand replies are drawn disproportionately from the successful, which pushes the median up.",
    },
  },

  // ---- Sound reasoning about who gets counted (decoys) ----
  {
    id: "ok-reported-nonresponse",
    scenario: {
      en: "A survey states that 4,200 households were approached, that 2,900 took part, and that the results are weighted to match census figures for age, region and housing tenure.",
    },
    trap: null,
    explanation: {
      en: "The response rate is disclosed and the known imbalances are corrected. That does not guarantee the non-responders were like the responders, but it is exactly what a careful survey can do and report.",
    },
  },
  {
    id: "ok-chased-nonresponders",
    scenario: {
      en: "Researchers follow up a sample of people who did not reply to their questionnaire, interview them in person, and report that their answers closely matched those of the original responders.",
    },
    trap: null,
    explanation: {
      en: "This is the direct test for non-response bias rather than an assurance about it. Sampling the silent group and comparing is the only way to learn whether their absence mattered.",
    },
  },
  {
    id: "ok-census-total",
    scenario: {
      en: "A council reports the number of children enrolled in its schools from its own enrolment records rather than from a survey, and gives the figure without a margin of error.",
    },
    trap: null,
    explanation: {
      en: "This is a count of everybody rather than a sample of anybody, so nobody selected themselves into it and no sampling error applies. Reporting it without a margin of error is correct.",
    },
  },

  // ---- The misinformation effect ----
  {
    id: "me-leading-detail",
    scenario: {
      en: "An investigator asks a witness how far away the man in the grey jacket was standing. The witness later describes a man in a grey jacket, and the investigator treats the agreement as corroboration.",
    },
    trap: "misinformation-effect",
    explanation: {
      en: "The grey jacket entered the account in the question, not in the answer. A detail supplied by the interviewer and handed back later is not independent confirmation of anything.",
    },
  },
  {
    id: "me-confidence-as-accuracy",
    scenario: {
      en: "A witness who has been interviewed four times now recalls the scene in vivid detail and says she is completely certain. The report cites her certainty as a reason to rely on the account.",
    },
    trap: "misinformation-effect",
    explanation: {
      en: "Repeated interviewing gives a memory more chances to absorb detail from the questions, and rehearsal raises confidence whether or not it raises accuracy. Certainty grows with retelling, so it cannot vouch for the retelling.",
    },
  },
  {
    id: "me-group-discussion",
    scenario: {
      en: "Six people who saw the same incident discuss it together for an hour before giving statements. Their accounts turn out to agree closely, which the report describes as strong evidence.",
    },
    trap: "misinformation-effect",
    explanation: {
      en: "After an hour of discussion the six accounts are no longer six independent observations. Agreement produced by conversation looks identical to agreement produced by everyone having seen the same thing.",
    },
  },
  {
    id: "me-photo-first",
    scenario: {
      en: "Before an identity parade, an officer shows a witness a single photograph of the suspect to check they are on the right lines. The witness then picks that person out of the parade.",
    },
    trap: "misinformation-effect",
    explanation: {
      en: "The face in the photograph is now in the witness's memory alongside whatever they saw at the scene, and nothing labels which is which. The parade is testing recognition of the photograph.",
    },
  },
  {
    id: "me-news-before-statement",
    scenario: {
      en: "A bystander reads three days of news coverage of the incident, including a description of the vehicle, and then gives a formal statement that matches that description.",
    },
    trap: "misinformation-effect",
    explanation: {
      en: "Post-event information gets absorbed into recollection without a marker saying where it came from. The match tells you the statement is consistent with the coverage, not that it is consistent with the event.",
    },
  },
  {
    id: "me-questionnaire-wording",
    scenario: {
      en: "A hospital asks patients whether they experienced the sharp pain in the first week after surgery, and reports the proportion who say yes as the incidence of sharp pain.",
    },
    trap: "misinformation-effect",
    explanation: {
      en: "The question presupposes the sharp pain rather than asking whether there was any pain and what it was like. A presupposition in a question is a detail offered to the person answering.",
    },
  },
  {
    id: "me-therapy-recovered",
    scenario: {
      en: "A questionnaire asks respondents to describe how they felt when they got lost in a shopping centre as a young child. Most produce an account, and the researchers report it as a common childhood experience.",
    },
    trap: "misinformation-effect",
    explanation: {
      en: "Asking somebody to describe an event asserts that it happened, and people can generate a plausible account of something that did not. Without an independent record of who actually got lost, the responses measure suggestion as much as memory.",
    },
  },
  {
    id: "me-no-control",
    scenario: {
      en: "A study finds that witnesses given a strongly worded question afterwards reported a detail 30 percent of the time, against 14 percent for a neutral question, and concludes the strong wording created the memory in three of ten people.",
    },
    trap: "misinformation-effect",
    explanation: {
      en: "There is no group that was asked nothing, so the background rate of reporting that detail unprompted is unknown. The comparison shows a difference between two wordings, not how much either added to nothing at all.",
    },
  },
  {
    id: "me-consistent-detail",
    scenario: {
      en: "A researcher argues that because a suggested detail was accepted by many participants, a question could be used to make people remember almost anything about the scene.",
    },
    trap: "misinformation-effect",
    explanation: {
      en: "The details that get absorbed are ones that fit the scene already, which is why they slip in without friction. Extending the finding to details that contradict what somebody saw goes well past what the evidence supports.",
    },
  },
  {
    id: "me-own-memory",
    scenario: {
      en: "After discussing an old argument with a friend who was present, someone says they now clearly remember a remark the friend described, and takes the clarity of the recollection as proof it happened.",
    },
    trap: "misinformation-effect",
    explanation: {
      en: "The friend's description is post-event information like any other, and clarity is not a marker of origin. A reconstructed detail can feel exactly like a remembered one, which is precisely what makes this hard to catch in yourself.",
    },
  },

  // ---- Sound handling of a witness account (decoys) ----
  {
    id: "ok-free-recall-first",
    scenario: {
      en: "An interviewer asks the witness to describe everything they remember in their own words, without interruption, and only afterwards asks specific questions about points the witness raised.",
    },
    trap: null,
    explanation: {
      en: "Free recall before specific questions is the standard protection: nothing has been supplied yet, so anything in the first account came from the witness. Asking about points they themselves raised adds no new detail.",
    },
  },
  {
    id: "ok-recorded-before",
    scenario: {
      en: "A researcher compares statements recorded on the night of the incident with statements from the same witnesses six months later, and reports where the two diverge.",
    },
    trap: null,
    explanation: {
      en: "The early statement is a record made before the intervening months could add anything, so the comparison measures drift rather than assuming it. This is the right way to study how an account changes.",
    },
  },
  {
    id: "ok-physical-evidence",
    scenario: {
      en: "Investigators find that a witness's account of the vehicle's colour matches paint traces recovered from the scene, and treat the paint as the evidence rather than the account.",
    },
    trap: null,
    explanation: {
      en: "The paint was not produced by anybody's memory and cannot have been suggested by a question. Corroborating an account against a physical record is exactly the check that recollection alone cannot provide.",
    },
  },

  // ---- Statistical power and the type II error ----
  {
    id: "sp-null-means-equivalent",
    scenario: {
      en: "A trial of 40 patients finds no significant difference between the new drug and the old one, and the discussion concludes that the two are equally effective.",
    },
    trap: "statistical-power",
    explanation: {
      en: "With forty patients the confidence interval will be wide enough to contain a substantial benefit in either direction. The trial did not find the two equal, it failed to distinguish them, which is a different result.",
    },
  },
  {
    id: "sp-p-protects",
    scenario: {
      en: "A researcher explains that because the analysis used a five per cent significance threshold, the risk of drawing the wrong conclusion from the study is under five per cent.",
    },
    trap: "statistical-power",
    explanation: {
      en: "The five per cent threshold controls only the risk of claiming an effect that is not there. It says nothing about the risk of missing one that is, and in a small study that second risk can be enormous.",
    },
  },
  {
    id: "sp-power-without-effect-size",
    scenario: {
      en: "A protocol states that the study is adequately powered, without saying what effect size it is powered to detect.",
    },
    trap: "statistical-power",
    explanation: {
      en: "Power is never a property of a study on its own, only of a study against a specified effect. Adequately powered with no effect size named is not a claim that can be checked or falsified.",
    },
  },
  {
    id: "sp-subgroup-null",
    scenario: {
      en: "A large trial shows a clear benefit overall. In a subgroup of 60 older patients the difference is not significant, and the authors conclude the treatment does not work in the elderly.",
    },
    trap: "statistical-power",
    explanation: {
      en: "A subgroup of sixty has a fraction of the whole trial's power, so a non-significant result there is close to uninformative. Concluding the treatment fails in that group requires evidence it does not have.",
    },
  },
  {
    id: "sp-safety-null",
    scenario: {
      en: "A trial designed to detect a difference in cure rates reports no significant increase in serious side effects, and the summary describes the treatment as safe.",
    },
    trap: "statistical-power",
    explanation: {
      en: "The trial was sized for the cure rate, not for a rare harm. A study can be perfectly adequate for its main question and hopeless for a side effect that occurs in one patient in two hundred.",
    },
  },
  {
    id: "sp-post-hoc-power",
    scenario: {
      en: "After a study finds nothing, the analysts compute the power to detect the effect they actually observed and report that the study was underpowered by that measure.",
    },
    trap: "statistical-power",
    explanation: {
      en: "Power computed from the observed effect is a restatement of the p value and adds no information. The useful calculation is against an effect size that would matter clinically, chosen independently of the result.",
    },
  },
  {
    id: "sp-many-small-nulls",
    scenario: {
      en: "Eight small trials each report no significant benefit, and a review concludes that the accumulated evidence shows the treatment is ineffective.",
    },
    trap: "statistical-power",
    explanation: {
      en: "Eight uninformative studies do not add up to one informative one just by being counted. Combining them properly in a meta-analysis might settle the question, and can equally reveal a benefit none of them could see alone.",
    },
  },
  {
    id: "sp-non-inferiority",
    scenario: {
      en: "A non-inferiority trial concludes the cheaper treatment is not worse, having set its margin so that anything short of a fifteen per cent loss of effectiveness counts as not worse.",
    },
    trap: "statistical-power",
    explanation: {
      en: "The conclusion is only as strong as the margin, and a fifteen per cent loss is a real loss. Not worse is a claim about the margin chosen, not about the treatments, and the margin has to be judged on its own.",
    },
  },
  {
    id: "sp-wide-interval-ignored",
    scenario: {
      en: "A report gives a relative risk of 0.82 with a confidence interval from 0.55 to 1.22 and concludes there was no association, without discussing the interval.",
    },
    trap: "statistical-power",
    explanation: {
      en: "The interval reaches down to a forty-five per cent reduction in risk, which would matter a great deal if real. The data are consistent with no association and also with a large benefit, so no association overstates what was shown.",
    },
  },
  {
    id: "sp-absence-of-evidence",
    scenario: {
      en: "A screening study of a rare exposure finds no cases of harm among 120 exposed people and reports that the exposure carries no risk.",
    },
    trap: "statistical-power",
    explanation: {
      en: "Seeing no cases in 120 people is compatible with a risk of roughly one in forty or lower, which is not the same as no risk. Absence of evidence is evidence of absence only when the evidence would have shown up.",
    },
  },

  // ---- Sound handling of a null result (decoys) ----
  {
    id: "ok-prespecified-power",
    scenario: {
      en: "A protocol registered before recruitment states that 1,400 patients give ninety per cent power to detect a five percentage point difference, which the investigators justify as the smallest difference that would change practice.",
    },
    trap: null,
    explanation: {
      en: "The effect size is named, justified clinically, and fixed before any data arrive. That is what makes a later null result interpretable rather than merely disappointing.",
    },
  },
  {
    id: "ok-tight-null",
    scenario: {
      en: "A trial of 9,000 patients reports a hazard ratio of 1.01 with a confidence interval from 0.96 to 1.06, and concludes that any effect is too small to be clinically important.",
    },
    trap: null,
    explanation: {
      en: "Here the interval excludes everything that would matter, so the null result is genuine evidence of absence rather than an absence of evidence. This is what an informative negative study looks like.",
    },
  },
  {
    id: "ok-reports-interval",
    scenario: {
      en: "A small study finds no significant difference and states plainly that its confidence interval remains consistent with a benefit of up to thirty per cent, so the question is unresolved.",
    },
    trap: null,
    explanation: {
      en: "The authors report what the data could not rule out instead of converting a null result into a negative one. A small study that says the question is open has reported itself correctly.",
    },
  },

  // ---- Allocation concealment ----
  {
    id: "ac-randomised-word",
    scenario: {
      en: "A trial report says only that patients were randomised to the two arms, with nothing about how the sequence was generated or how it was kept from the enrolling clinicians.",
    },
    trap: "allocation-concealment",
    explanation: {
      en: "Randomised on its own describes an intention, not a safeguard. Without knowing how the sequence was concealed there is no way to judge whether the groups were formed by chance or by somebody's judgement.",
    },
  },
  {
    id: "ac-open-envelopes",
    scenario: {
      en: "Allocations are supplied to each recruiting site as a stack of sealed envelopes, and a site reports that it sometimes opens the next one to plan staffing before deciding whether the patient is eligible.",
    },
    trap: "allocation-concealment",
    explanation: {
      en: "Once the next allocation is known before eligibility is settled, the decision to enrol can depend on it. That is the whole failure, and it needs no dishonesty: a clinician who thinks one arm is better will hesitate over the wrong patient.",
    },
  },
  {
    id: "ac-alternate-days",
    scenario: {
      en: "A study assigns patients arriving on odd-numbered days to the new treatment and those arriving on even days to the old one, and describes the allocation as random.",
    },
    trap: "allocation-concealment",
    explanation: {
      en: "Alternating by date is predictable, so anybody who knows the rule knows tomorrow's assignment and can time an admission. A sequence that can be forecast is not concealed, whatever else it is.",
    },
  },
  {
    id: "ac-blinding-confused",
    scenario: {
      en: "Asked about concealment, an investigator answers that the trial was double blind, so the allocation could not have influenced who was enrolled.",
    },
    trap: "allocation-concealment",
    explanation: {
      en: "Blinding starts after assignment and protects the measurement of the outcome. Concealment operates before assignment and protects the formation of the groups. A trial can be perfectly blinded and still have had its groups selected at the door.",
    },
  },
  {
    id: "ac-ratio-off",
    scenario: {
      en: "A trial that randomised 1:1 with blocks of six reports 940 patients in one arm and 762 in the other, and does not comment on the difference.",
    },
    trap: "allocation-concealment",
    explanation: {
      en: "Blocking exists to hold the arms level, so a gap that size cannot come from the allocation process working as described. An unexplained ratio is one of the few fingerprints a concealment failure leaves in a published report.",
    },
  },
  {
    id: "ac-baseline-sicker",
    scenario: {
      en: "The baseline table of an unblinded trial shows the control arm was older and had more advanced disease at entry, and the discussion attributes this to the play of chance in randomisation.",
    },
    trap: "allocation-concealment",
    explanation: {
      en: "Chance is a possible explanation and so is a sequence somebody could see, and the baseline table cannot distinguish them on its own. Whether to believe the chance explanation depends on how the allocation was concealed, which is the thing to go and check.",
    },
  },
  {
    id: "ac-central-not-used",
    scenario: {
      en: "A multicentre trial generates its sequence centrally with a validated computer program, then posts the full list to each site at the start of recruitment.",
    },
    trap: "allocation-concealment",
    explanation: {
      en: "A perfectly generated sequence that everyone can read is not concealed at all. Generation and concealment are separate safeguards, and doing the first impeccably does nothing for the second.",
    },
  },
  {
    id: "ac-retrospective-fix",
    scenario: {
      en: "After discovering that some sites had subverted the allocation, a team adjusts the analysis for the baseline characteristics that turned out to be imbalanced, and reports the adjusted result as unbiased.",
    },
    trap: "allocation-concealment",
    explanation: {
      en: "Adjustment can only handle the imbalances that were measured and recorded. The reason randomisation is valuable is that it balances the things nobody thought to measure, and once it has failed that protection cannot be restored afterwards.",
    },
  },
  {
    id: "ac-consent-after",
    scenario: {
      en: "In an unblinded trial, clinicians learn the allocation and then seek consent, and rather more patients decline in the arm the clinicians consider less desirable.",
    },
    trap: "allocation-concealment",
    explanation: {
      en: "Consent sought after the assignment is known lets the assignment influence who stays in the trial, which produces two groups that differ by more than the treatment. Seeking consent before allocation removes the opportunity entirely.",
    },
  },
  {
    id: "ac-small-trial-imbalance",
    scenario: {
      en: "A trial of 40 patients with a properly concealed central allocation ends up with 24 in one arm and 16 in the other, and a reader treats this as evidence that the concealment failed.",
    },
    trap: "allocation-concealment",
    explanation: {
      en: "In forty patients a 24 to 16 split is well within what chance produces, so this ratio is no evidence of anything. The arithmetic fingerprint only becomes readable when the numbers are large enough that chance cannot reach the observed gap.",
    },
  },

  // ---- Sound handling of allocation (decoys) ----
  {
    id: "ok-central-randomisation",
    scenario: {
      en: "Clinicians enrol a patient by calling a central service, confirming eligibility first, and receiving the allocation only once the patient is irrevocably in the trial.",
    },
    trap: null,
    explanation: {
      en: "The allocation cannot be seen before the decision to enrol and cannot be undone afterwards, which is exactly what concealment means. This is the standard the method exists to reach.",
    },
  },
  {
    id: "ok-reports-method",
    scenario: {
      en: "A trial report states that the sequence was computer generated by a statistician with no clinical contact, held centrally, and released one patient at a time after eligibility was confirmed.",
    },
    trap: null,
    explanation: {
      en: "Generation and concealment are both described, separately and specifically, so a reader can judge them rather than take the word randomised on trust. This is what an adequate methods section looks like.",
    },
  },
  {
    id: "ok-unblinded-but-concealed",
    scenario: {
      en: "A surgical trial cannot be blinded, since the surgeon knows which operation they performed, but allocation is issued centrally after consent and the outcome is assessed by someone who does not know the assignment.",
    },
    trap: null,
    explanation: {
      en: "Blinding the treatment is impossible here and that is not the failure. Concealing the allocation before enrolment and blinding the outcome assessment afterwards cover the two things that were still available.",
    },
  },

  // ---- The Hawthorne effect ----
  {
    id: "he-audited-compliance",
    scenario: {
      en: "A hospital publishes hand hygiene compliance of 94 per cent, collected by trained auditors who stand on the ward with a clipboard, and uses it to reassure the board.",
    },
    trap: "hawthorne-effect",
    explanation: {
      en: "The figure describes behaviour while an auditor was standing there, which is not the behaviour the patients received the rest of the time. Open observation measures the observed state, and that is the only state it measures.",
    },
  },
  {
    id: "he-ward-league-table",
    scenario: {
      en: "A trust ranks its wards by audited hand hygiene and puts the bottom three into an improvement programme. All the audits used the same method and the same auditors.",
    },
    trap: "hawthorne-effect",
    explanation: {
      en: "Identical methods do not give identical inflation, because the auditor is a bigger change on some wards than others. A ranking built from audited figures can put wards in an order their real performance never had.",
    },
  },
  {
    id: "he-before-after",
    scenario: {
      en: "After a training campaign, observed compliance rises from 62 to 89 per cent, and the report attributes the improvement to the training.",
    },
    trap: "hawthorne-effect",
    explanation: {
      en: "A campaign tells everyone that this behaviour is being watched, so it raises both the behaviour and the awareness of being measured at once. Without a measure that does not depend on being noticed, the two cannot be separated.",
    },
  },
  {
    id: "he-inspection-day",
    scenario: {
      en: "A restaurant chain reports that 97 per cent of its kitchens met hygiene standards at their last scheduled inspection, with dates agreed in advance.",
    },
    trap: "hawthorne-effect",
    explanation: {
      en: "An inspection whose date is known measures the kitchen on the day it was expecting to be measured. The interesting number is what an unannounced visit would find, and that is a different number.",
    },
  },
  {
    id: "he-pilot-enthusiasm",
    scenario: {
      en: "A new procedure is piloted on one enthusiastic unit with researchers frequently present, works well, and is rolled out on the strength of the pilot.",
    },
    trap: "hawthorne-effect",
    explanation: {
      en: "During the pilot the staff knew they were part of something being watched, and that attention is not part of the rollout. Pilots routinely outperform the thing they are piloting for reasons that have nothing to do with the procedure.",
    },
  },
  {
    id: "he-driving-test",
    scenario: {
      en: "A study of a road safety measure reports that drivers signalled correctly 98 per cent of the time, based on observers riding in the passenger seat.",
    },
    trap: "hawthorne-effect",
    explanation: {
      en: "A driver with an observer beside them is driving a test, not a commute. The number is real and it describes a situation that almost never occurs on the road.",
    },
  },
  {
    id: "he-self-report-diary",
    scenario: {
      en: "Participants asked to keep a daily food diary for a study of snacking report far less snacking in week four than week one, and the authors conclude the habit was declining.",
    },
    trap: "hawthorne-effect",
    explanation: {
      en: "Writing down what you eat is itself an intervention, and it also makes you conscious of being assessed. Either the snacking changed or the recording did, and a diary cannot tell you which.",
    },
  },
  {
    id: "he-comparing-audited",
    scenario: {
      en: "Two countries report audited surgical checklist compliance of 91 and 68 per cent, and a commentary concludes the first has a stronger safety culture.",
    },
    trap: "hawthorne-effect",
    explanation: {
      en: "Both figures were lifted by being collected, and there is no reason the lift was the same size in each. Subtracting two observed numbers does not cancel the bias, because the bias is not a constant.",
    },
  },
  {
    id: "he-teacher-observation",
    scenario: {
      en: "An inspectorate grades teaching quality from announced lesson observations and reports that 88 per cent of lessons were good or better.",
    },
    trap: "hawthorne-effect",
    explanation: {
      en: "An announced observation samples the lesson a teacher prepares when they know somebody is coming. That is worth knowing, but it is not an estimate of the lessons nobody watched.",
    },
  },
  {
    id: "he-more-auditors",
    scenario: {
      en: "Concerned that its compliance figures may be inflated, a hospital responds by increasing the number of audits and the number of auditors on the wards.",
    },
    trap: "hawthorne-effect",
    explanation: {
      en: "More open observation produces more observed behaviour, so the figure rises and the gap it was hiding stays hidden. The fix has to be a measure that does not depend on anyone noticing, not more of the measure that failed.",
    },
  },

  // ---- Sound handling of measurement under observation (decoys) ----
  {
    id: "ok-electronic-counts",
    scenario: {
      en: "A hospital fits its gel dispensers with electronic counters and reports usage from the hardware, without anyone standing on the ward to record it.",
    },
    trap: null,
    explanation: {
      en: "Nobody has to be noticed for the count to happen, so the measurement does not create the behaviour it measures. Instrumenting the process rather than observing it is the standard answer to this problem.",
    },
  },
  {
    id: "ok-routine-records",
    scenario: {
      en: "Researchers evaluate a policy using prescribing data that was collected for billing long before the study was designed, and that nobody knew would be analysed.",
    },
    trap: null,
    explanation: {
      en: "Data gathered for another purpose, before anyone knew it would be looked at, cannot have been shaped by the knowledge of being studied. This is one of the genuine advantages of routinely collected records.",
    },
  },
  {
    id: "ok-states-the-method",
    scenario: {
      en: "A report gives audited compliance of 93 per cent and states plainly that the audits were overt, that overt figures are known to exceed unobserved behaviour, and that the true rate is likely lower by an unknown margin.",
    },
    trap: null,
    explanation: {
      en: "The number is reported with the thing that limits it, and the limit is not quantified because the report cannot quantify it. Saying the margin is unknown is more honest than inventing a correction.",
    },
  },

  // ---- Neyman, or prevalence-incidence bias. Deliberately NOT a puzzle of its
  // own: its reveal is duration-biased sampling, which is what length-time
  // already reveals, and its "you never see the ones who died" framing is what
  // survivorship already reveals. See plan-syllabus-gaps.md gap 5.
  {
    id: "nb-prevalent-cases",
    scenario: {
      en: "Researchers recruit patients currently living with a fatal heart condition and compare their past exposures with healthy controls. A factor known to make the condition kill quickly comes out looking protective.",
    },
    trap: "length-time-bias",
    explanation: {
      en: "Recruiting people who currently have the disease samples them in proportion to how long they have it, so the fast-killing cases are largely absent. A factor that shortens survival removes its own cases from the study and therefore looks protective.",
    },
  },
  {
    id: "nb-clinic-attenders",
    scenario: {
      en: "A study of an aggressive cancer draws its cases from patients attending a specialist clinic in a given month, and reports which lifestyle factors are commoner among them than among controls.",
    },
    trap: "length-time-bias",
    explanation: {
      en: "A snapshot of who is attending in one month is a sample weighted by how long people survive to keep attending. Anything that shortens the illness is under-represented, so the exposure profile describes long survivors rather than the disease.",
    },
  },
  {
    id: "nb-survivor-interviews",
    scenario: {
      en: "To find out what caused an outbreak, investigators interview everyone still in hospital three weeks later about what they ate, and note that one dish was eaten less often than expected.",
    },
    trap: "survivorship-bias",
    explanation: {
      en: "The people interviewed are those who were still there to be interviewed. If a dish carried a heavier dose, its victims left the sample first, by discharge or by death, and it will look less dangerous than it was.",
    },
  },
  {
    id: "ok-incident-cases",
    scenario: {
      en: "A study enrols every patient at the moment they are first diagnosed, follows them forwards, and compares exposures between those who go on to die quickly and those who do not.",
    },
    trap: null,
    explanation: {
      en: "Enrolling at diagnosis catches the fast and slow cases alike, because nobody has had time to leave the pool. Sampling incident rather than prevalent cases is the specific fix for this whole family of problems.",
    },
  },

  // ---- Sponsorship and conflict of interest ----
  {
    id: "sb-good-methods",
    scenario: {
      en: "A trial funded entirely by the company that makes the drug reports a clear benefit. It was randomised, double blind, published in a major journal, and a clinician accepts the result on those grounds.",
    },
    trap: "sponsorship-bias",
    explanation: {
      en: "Those are the checks that catch sloppiness, and sponsored trials routinely pass them; the difference shows up in what was compared, what was measured and how the conclusion was worded. Good methods do not answer the funding question, they only make it harder to see.",
    },
  },
  {
    id: "sb-inconclusive",
    scenario: {
      en: "A review of whether a chemical harms health concludes that the evidence remains inconclusive and that more research is needed. Its author has consulted for the manufacturer for a decade.",
    },
    trap: "sponsorship-bias",
    explanation: {
      en: "Doubt is the useful product here, not a favourable finding, and the evidence on almost any question can honestly be called inconclusive. When the party who benefits from delay is the one calling for more research, that call is a position rather than a neutral observation.",
    },
  },
  {
    id: "sb-head-to-head",
    scenario: {
      en: "Two trials compare the same two drugs against each other and reach opposite conclusions about which is better. Each was funded by one of the two manufacturers.",
    },
    trap: "sponsorship-bias",
    explanation: {
      en: "The comparison is identical and the answers are not, so something other than the drugs is driving the conclusion. Choice of dose, of endpoint and of how to phrase the summary can each move a head to head trial without any step in it being wrong.",
    },
  },
  {
    id: "sb-guideline-panel",
    scenario: {
      en: "A treatment guideline recommends a newer, costlier drug as first line. Most of the panel members have consulting arrangements with its manufacturers, which are listed in an appendix.",
    },
    trap: "sponsorship-bias",
    explanation: {
      en: "Disclosure records the conflict, it does not neutralise it, and a guideline is exactly the judgement call that funding shifts. The useful question is whether an independent panel reading the same evidence reached the same recommendation.",
    },
  },
  {
    id: "sb-no-role-statement",
    scenario: {
      en: "An industry funded review states that the sponsor played no part in selecting the studies, assessing them, or interpreting the results, and a reader concludes the funding therefore cannot have mattered.",
    },
    trap: "sponsorship-bias",
    explanation: {
      en: "The association between funding and conclusions holds even among reviews carrying exactly this statement, which means the mechanism does not require the sponsor to touch the manuscript. Who was commissioned, and what they already thought, are decided before anyone writes anything.",
    },
  },
  {
    id: "sb-counting-papers",
    scenario: {
      en: "A newspaper reports that scientists are split on a health question, and supports it by counting how many published reviews land on each side.",
    },
    trap: "sponsorship-bias",
    explanation: {
      en: "Counting reviews measures how many were written and published, not how much evidence there is, and anyone with money can raise the count on one side. A split in the literature and a split in the evidence are different things.",
    },
  },
  {
    id: "sb-conclusion-outruns-results",
    scenario: {
      en: "A sponsored trial finds no significant difference on its primary outcome, and its discussion concludes that the drug offers meaningful benefit in this population.",
    },
    trap: "sponsorship-bias",
    explanation: {
      en: "The gap between what a study found and what it says it found is wider in sponsored work, and the abstract is the part most people read. Read the results table against the conclusion rather than the conclusion alone.",
    },
  },
  {
    id: "sb-pooled-without-split",
    scenario: {
      en: "A meta-analysis pools thirty trials of a drug, most of them manufacturer funded, and reports a single overall effect with no breakdown by who paid.",
    },
    trap: "sponsorship-bias",
    explanation: {
      en: "If sponsored and independent trials give different answers, pooling them averages the two and hides the disagreement. A funding subgroup analysis costs nothing and its absence leaves the reader unable to check.",
    },
  },
  {
    id: "sb-nothing-to-declare",
    scenario: {
      en: "A paper on a device carries the line that the authors have nothing to declare. The lead author's previous three studies were funded by the manufacturer, and the company pays for their travel to conferences.",
    },
    trap: "sponsorship-bias",
    explanation: {
      en: "Disclosure rules usually cover the work in hand and a short window before it, so a long relationship can end up invisible in the one place a reader looks. An empty statement means the rules were satisfied, not that there is no interest.",
    },
  },
  {
    id: "sb-agreeable-funder",
    scenario: {
      en: "A study funded by a campaign group confirms exactly the harm the group was founded to publicise, and a reader who shares its aims passes over the funding line without pausing.",
    },
    trap: "sponsorship-bias",
    explanation: {
      en: "The mechanism does not care which direction the interest points, and an organisation whose existence depends on an answer has a stake in it. Applying the test only to conclusions you dislike converts a real check into a way of keeping the ones you already hold.",
    },
  },

  // ---- Sound handling of funded evidence (decoys) ----
  {
    id: "ok-registered-protocol",
    scenario: {
      en: "A reader notes that a trial was manufacturer funded, then checks the public registry and finds the primary outcome and analysis plan posted before recruitment began and unchanged in the published paper.",
    },
    trap: null,
    explanation: {
      en: "Fixing the outcome and the analysis in public beforehand removes most of the room in which a sponsor's preferences could operate. Noting the funding and then checking what it could actually have changed is the whole method.",
    },
  },
  {
    id: "ok-independent-replication",
    scenario: {
      en: "A promising result from a company funded trial is treated as provisional until a publicly funded group with no commercial interest runs its own trial and gets the same answer.",
    },
    trap: null,
    explanation: {
      en: "Independent replication is the one check that does not depend on trusting anybody's motives, because a shared interest cannot explain agreement between parties who do not share one.",
    },
  },
  {
    id: "ok-funding-subgroup",
    scenario: {
      en: "A meta-analysis states in its protocol that it will compare results from industry funded and independently funded trials, and reports both estimates alongside the pooled one.",
    },
    trap: null,
    explanation: {
      en: "Planning the comparison in advance and publishing both figures lets the reader see whether funding made a difference here rather than assuming it did or did not. That is the specific fix for pooling evidence of mixed provenance.",
    },
  },

  // ---- The availability heuristic ----
  {
    id: "av-drives-instead",
    scenario: {
      en: "After a widely reported airliner crash, someone cancels a short flight and drives the distance instead, saying flying suddenly feels too risky.",
    },
    trap: "availability-heuristic",
    explanation: {
      en: "The crash changed how easily a crash comes to mind, not how often one happens, and the comparison that matters is against the risk of the drive. A single reported event moves the feeling and leaves the rates exactly where they were.",
    },
  },
  {
    id: "av-crime-feels-worse",
    scenario: {
      en: "A resident is sure crime in their town is climbing, because they can recall several recent incidents from the local news. Recorded offences have fallen for four years.",
    },
    trap: "availability-heuristic",
    explanation: {
      en: "What they are counting is stories they remember, and a newsroom prints what is unusual rather than what is typical. Recall is a measure of coverage and salience, not of frequency.",
    },
  },
  {
    id: "av-missed-diagnosis",
    scenario: {
      en: "A doctor missed a rare but serious diagnosis last month. Since then they have ordered the test for it on almost every patient with vaguely similar symptoms.",
    },
    trap: "availability-heuristic",
    explanation: {
      en: "The recent case has made that diagnosis easy to picture, which is not the same as it having become more common. Testing should follow how likely the condition is in the patient in front of them, and that has not changed.",
    },
  },
  {
    id: "av-stranger-danger",
    scenario: {
      en: "A parent, unsettled by a reported child abduction, rules out walking to school alone, while the unfenced garden pond stays as it is.",
    },
    trap: "availability-heuristic",
    explanation: {
      en: "The two hazards are being weighed by how vividly each can be imagined rather than by how often each kills a child. Abduction is reported nationally and drowning usually is not, so the quieter risk is the one that gets left alone.",
    },
  },
  {
    id: "av-safety-meeting",
    scenario: {
      en: "A safety committee ranks the plant's hazards by asking each member which incidents they can remember, then funds the top three.",
    },
    trap: "availability-heuristic",
    explanation: {
      en: "Memorable incidents are the dramatic ones and the recent ones, which is a different list from the frequent ones. The incident log already holds the counts, and asking the room instead substitutes recall for the record.",
    },
  },
  {
    id: "av-side-effect-headline",
    scenario: {
      en: "A patient refuses a drug because of a side effect they read about in a newspaper feature, and does not ask how often it occurs.",
    },
    trap: "availability-heuristic",
    explanation: {
      en: "A side effect is written about because it is striking, and the frequency is the part the article usually omits. Knowing that something can happen says nothing about whether it is likelier than the illness being treated.",
    },
  },
  {
    id: "av-sharks",
    scenario: {
      en: "Asked whether shark attacks or falling coconuts kill more people, someone picks sharks, explaining that they can name three attacks and no coconut deaths.",
    },
    trap: "availability-heuristic",
    explanation: {
      en: "Being able to name examples measures what was reported to you, and a shark attack is filmed while other deaths are not. The count of stories you hold is the output of a news filter rather than a sample of events.",
    },
  },
  {
    id: "av-fund-picks",
    scenario: {
      en: "An investor estimates how well technology funds have done from the two funds whose names they recognise, both of which have been in the papers for their returns.",
    },
    trap: "availability-heuristic",
    explanation: {
      en: "Funds become nameable by doing something worth writing about, which is usually doing unusually well. Recognition is the selection filter here, and the ones that closed quietly never entered the reckoning.",
    },
  },
  {
    id: "av-recent-outage",
    scenario: {
      en: "After a noisy outage in one system, a team reallocates most of its reliability budget to that system, having not looked at where the year's downtime actually accumulated.",
    },
    trap: "availability-heuristic",
    explanation: {
      en: "The loud failure is the one everybody can describe, and loudness is not duration. Slow, quiet degradation in a less visible service can account for far more lost time and generate no story at all.",
    },
  },
  {
    id: "av-terror-vs-road",
    scenario: {
      en: "A traveller judges a destination unsafe on the strength of an attack there two years ago, without comparing it with the road risk of the journey they take every day.",
    },
    trap: "availability-heuristic",
    explanation: {
      en: "One vivid event is being weighed against a background risk so routine that no instance of it is memorable at all. The comparison is between one thing you can picture and one thing you cannot, and that is not a comparison of sizes.",
    },
  },

  // ---- Sound handling of frequency questions (decoys) ----
  {
    id: "ok-looked-up-the-rate",
    scenario: {
      en: "Before choosing, someone looks up how many deaths each cause produced last year and how many people were exposed to each, rather than going by which one they have heard more about.",
    },
    trap: null,
    explanation: {
      en: "A published count and a population at risk answer the frequency question directly, and neither depends on what anyone happens to remember. Replacing recall with a rate is the specific fix.",
    },
  },
  {
    id: "ok-incident-register",
    scenario: {
      en: "A safety committee ranks hazards from the incident register, which logs every event whether or not anybody found it memorable, and notes that the register may under-record near misses.",
    },
    trap: null,
    explanation: {
      en: "A record kept as events occur is not filtered by what stuck in anyone's mind, so it measures frequency rather than salience. Flagging that near misses are probably under-recorded names the one filter it does have.",
    },
  },
  {
    id: "ok-names-own-recency",
    scenario: {
      en: "A doctor who recently missed a rare diagnosis says so aloud, notes that the case is making them want to test everybody, and goes back to the guideline's criteria to decide.",
    },
    trap: null,
    explanation: {
      en: "Noticing that a recent case is inflating your sense of how common something is does not make the feeling go away, but it does stop the feeling from being used as evidence. Deferring to a pre-written criterion is what turns that noticing into a decision.",
    },
  },

  // ---- Multiple comparisons ----
  {
    id: "mc-subgroup-reversal",
    scenario: {
      en: "A large trial shows a drug clearly works. One of its fourteen subgroups shows no benefit, and a guideline committee proposes withholding the drug from that group.",
    },
    trap: "multiple-comparisons",
    explanation: {
      en: "With fourteen slices of one trial, a subgroup landing on the wrong side of nothing is expected rather than surprising, and each slice is far smaller than the whole. The best estimate for those patients is the overall result, which already includes them.",
    },
  },
  {
    id: "mc-forty-outcomes",
    scenario: {
      en: "A study measured forty outcomes. The abstract reports the one that reached significance and describes it as the study's finding.",
    },
    trap: "multiple-comparisons",
    explanation: {
      en: "At the usual threshold, forty tests on data with nothing in them would be expected to produce about two significant results anyway. A reader shown only the winner cannot tell it from the two you would get for free.",
    },
  },
  {
    id: "mc-dashboard-red",
    scenario: {
      en: "An operations dashboard tracks sixty metrics with control limits set to flag the most extreme 5 per cent. Every week two or three flash red and get investigated as incidents.",
    },
    trap: "multiple-comparisons",
    explanation: {
      en: "Sixty metrics at a one in twenty threshold produce about three red flags a week even when nothing is wrong. The flags are the threshold working as specified, so investigating each as an incident spends the week chasing the design.",
    },
  },
  {
    id: "mc-fund-record",
    scenario: {
      en: "A marketing brochure highlights a fund that beat its benchmark ten years running, out of the eight hundred funds the firm has launched.",
    },
    trap: "multiple-comparisons",
    explanation: {
      en: "With enough funds a ten-year streak appears by chance alone, and the firm chose which one to show after the fact. The relevant number is how many were run, not how well the survivor did.",
    },
  },
  {
    id: "mc-regional-cluster",
    scenario: {
      en: "A health department maps a rare cancer across three thousand districts, finds one with three times the national rate, and opens an investigation into local industry.",
    },
    trap: "multiple-comparisons",
    explanation: {
      en: "Three thousand districts guarantee that some will sit far above the average from chance alone, especially small ones where a few cases move the rate a long way. A cluster found by scanning a map is a hypothesis, not evidence.",
    },
  },
  {
    id: "mc-genome-scan",
    scenario: {
      en: "Researchers test half a million genetic variants against a disease and report the twenty that came out at p below 0.05.",
    },
    trap: "multiple-comparisons",
    explanation: {
      en: "Half a million tests at that threshold would yield about twenty-five thousand hits with no real association at all, so twenty is fewer than chance would give. This is exactly why genome-wide work uses a far stricter threshold.",
    },
  },
  {
    id: "mc-ab-test-peeking",
    scenario: {
      en: "A team runs an A/B test and checks the results every morning, stopping as soon as the difference reaches significance.",
    },
    trap: "multiple-comparisons",
    explanation: {
      en: "Checking daily and stopping on the first significant reading is many tests, not one, and the stopping rule guarantees you halt on a favourable wobble. The false positive rate is far above the nominal one.",
    },
  },
  {
    id: "mc-school-league",
    scenario: {
      en: "A newspaper ranks two hundred schools by the change in their exam results and profiles the one that improved most, looking for what its head teacher did differently.",
    },
    trap: "multiple-comparisons",
    explanation: {
      en: "The largest change out of two hundred is where the noise is largest, and small schools swing most because a few pupils move the average. The profile explains a number that was mostly going to happen to somebody.",
    },
  },
  {
    id: "mc-post-hoc-cut",
    scenario: {
      en: "A trial finds no overall effect. The authors then report that the drug worked in women aged under 50 with severe disease, a group defined after the results came in.",
    },
    trap: "multiple-comparisons",
    explanation: {
      en: "A subgroup drawn after seeing the data is chosen because it looks good, so the usual thresholds do not apply to it at all. Defining a group by three characteristics at once means the analyst had a great many possible groups to pick from.",
    },
  },
  {
    id: "mc-many-questionnaires",
    scenario: {
      en: "A wellbeing study administers twelve questionnaires at four time points and reports that the intervention improved one score at one visit.",
    },
    trap: "multiple-comparisons",
    explanation: {
      en: "Twelve instruments at four time points is forty-eight opportunities, and at the usual threshold two or three would look positive with no effect whatever. A single hit among forty-eight is roughly what nothing looks like.",
    },
  },

  // ---- Sound handling of many comparisons (decoys) ----
  {
    id: "ok-prespecified-primary",
    scenario: {
      en: "A protocol registered before recruitment names one primary outcome and states that everything else is exploratory. The paper reports the primary result first and labels the rest as hypothesis-generating.",
    },
    trap: null,
    explanation: {
      en: "Naming the primary outcome in advance means one test carries the claim and the reader can see which one it was. Labelling the others exploratory does not weaken them, it describes them accurately.",
    },
  },
  {
    id: "ok-corrected-threshold",
    scenario: {
      en: "A study testing thirty hypotheses tightens its threshold to account for the number of tests, reports both the raw and adjusted values, and says which results survive.",
    },
    trap: null,
    explanation: {
      en: "Adjusting the threshold for the number of tests is the direct remedy, and printing both figures lets a reader see what the adjustment cost. Stating which survive avoids the trick of correcting and then discussing the uncorrected list.",
    },
  },
  {
    id: "ok-subgroup-deferred-to-overall",
    scenario: {
      en: "A trial reports that one subgroup showed no benefit, notes that the test for a real difference between subgroups was not significant, and recommends the treatment for that subgroup on the strength of the overall result.",
    },
    trap: null,
    explanation: {
      en: "When there is no evidence that the subgroups genuinely differ, the overall estimate is the better estimate for each of them, and it rests on far more patients. Reporting the odd subgroup while declining to act on it is the honest handling.",
    },
  },
  // ---- The conjunction fallacy ----
  {
    id: "cf-recession-mechanism",
    scenario: {
      en: "An economist offers a committee two forecasts for next year: a recession, or a recession triggered by an energy price shock. The committee rates the second as more likely because it names a mechanism.",
    },
    trap: "conjunction-fallacy",
    explanation: {
      en: "Every recession triggered by an energy shock is a recession, so the second forecast describes a smaller set of futures and cannot be the likelier one. Naming a mechanism makes a story easier to picture, which is not the same as making it easier to happen.",
    },
  },
  {
    id: "cf-failure-chain",
    scenario: {
      en: "A risk review compares two statements: that the system may fail during peak load, and that a queue may overflow during peak load and take the payment service down with it. The named chain is scored as the higher risk.",
    },
    trap: "conjunction-fallacy",
    explanation: {
      en: "The specific chain is one of the ways the system could fail, so its probability is at most that of failing at all. A scenario earns its place in a risk register by being worth preparing for, not by being the most probable, and the two questions have been run together here.",
    },
  },
  {
    id: "cf-hospital-infection",
    scenario: {
      en: "Asked what is most likely to be going on with a feverish patient, a team ranks a hospital-acquired infection resistant to first-line antibiotics above an infection.",
    },
    trap: "conjunction-fallacy",
    explanation: {
      en: "Resistant hospital-acquired infections are a subset of infections, so they cannot be more common than the category containing them. The narrower answer feels better because it explains more, and explaining more is precisely what adds conditions and cuts the number of patients who fit.",
    },
  },
  {
    id: "cf-travel-insurance",
    scenario: {
      en: "Travellers are offered two policies at the same price: one that pays out on death from any cause during the trip, and one that pays out on death caused by an act of terrorism during the trip. Most pick the second.",
    },
    trap: "conjunction-fallacy",
    explanation: {
      en: "The first policy covers everything the second covers and a great deal besides, so at the same price it is strictly the better buy. The second wins because a vivid named cause feels more real than the abstract category that contains it.",
    },
  },
  {
    id: "cf-candidate-profile",
    scenario: {
      en: "Given a description of an applicant who volunteers at a climbing club, a hiring panel judges it more likely that she is an engineer who climbs at weekends than that she is an engineer.",
    },
    trap: "conjunction-fallacy",
    explanation: {
      en: "Engineers who climb at weekends are engineers, so there cannot be more of them. The description was chosen to match the extra clause, and matching a description is a different question from how many people fit it.",
    },
  },
  {
    id: "cf-weather-pair",
    scenario: {
      en: "A forecaster tells a race organiser there is a good chance of rain, and a better chance of rain with strong winds, because the front coming in usually brings both.",
    },
    trap: "conjunction-fallacy",
    explanation: {
      en: "However tightly rain and wind travel together, days with both are a subset of days with rain, so the pair cannot be the more likely outcome. A strong correlation makes the two probabilities close, and close is the most it can ever do.",
    },
  },
  {
    id: "cf-business-plan",
    scenario: {
      en: "Two pitches ask for the same investment. One says the company will reach profitability within three years. The other says it will reach profitability within three years by winning two named retail chains and then expanding into a second country. The second reads as the safer bet.",
    },
    trap: "conjunction-fallacy",
    explanation: {
      en: "The second pitch has to clear three hurdles rather than one, so it is the less likely of the two by construction. Detail reads as competence, and here it is also a list of extra ways to fail.",
    },
  },
  {
    id: "cf-survey-option",
    scenario: {
      en: "A survey asks readers to rate how likely each of two events is over the next year: that the local river floods, and that the local river floods after a storm upstream. The second gets the higher average rating.",
    },
    trap: "conjunction-fallacy",
    explanation: {
      en: "Floods that follow a storm upstream are floods, so the second event cannot be rated higher without the ratings being inconsistent. Rating each statement separately hides the nesting, which is exactly why this shows up in surveys that ask about one item per line.",
    },
  },
  {
    id: "cf-incident-story",
    scenario: {
      en: "After a warehouse fire, an investigator's colleagues find a detailed account naming a faulty charger, an overloaded socket and a propped fire door more convincing than the plain statement that an electrical fault started it.",
    },
    trap: "conjunction-fallacy",
    explanation: {
      en: "The detailed account is one particular electrical fault story among many, so it is less probable than the plain statement even though it feels better supported. A narrative that hangs together is being read as evidence, when what it actually is is a narrower claim.",
    },
  },
  {
    id: "cf-lost-first-set",
    scenario: {
      en: "Before a match, a commentator says it is more likely that the defending champion loses the first set and goes on to win the match than that she loses the first set at all.",
    },
    trap: "conjunction-fallacy",
    explanation: {
      en: "Losing the first set and winning the match is one of the things that can follow from losing the first set, so it cannot be the likelier of the two. The comeback is a better story, and a better story is not a bigger share of matches.",
    },
  },

  // ---- Sound handling of nested claims (decoys) ----
  {
    id: "ok-narrower-is-rarer",
    scenario: {
      en: "An analyst presents a detailed scenario, then notes that because it specifies three separate conditions it is less likely than the general outcome it is an instance of, and gives it as an illustration rather than a forecast.",
    },
    trap: null,
    explanation: {
      en: "This is the arithmetic handled correctly and out loud. A specific scenario is worth writing down for planning, and saying so while marking it as the rarer case keeps its usefulness without borrowing probability it does not have.",
    },
  },
  {
    id: "ok-plan-for-not-predict",
    scenario: {
      en: "A team builds its contingency plan around one specific failure sequence, stating that it is not the most probable thing that could go wrong but is the one they are least able to recover from.",
    },
    trap: null,
    explanation: {
      en: "Which scenario to prepare for and which scenario is most likely are different questions, and this separates them explicitly. Planning around a rare case is a judgement about consequences, which is legitimate as long as nobody claims it is also the probable one.",
    },
  },
  {
    id: "ok-conditional-stated",
    scenario: {
      en: "A report states that if the supplier fails, the most likely follow-on is a shortage within two weeks, and separately gives the chance that the supplier fails at all.",
    },
    trap: null,
    explanation: {
      en: "Splitting the claim into a conditional probability and the probability of the condition avoids the trap entirely, because the reader can multiply the two rather than judging a compound story by how well it hangs together.",
    },
  },
  // ---- The self-applied label ----
  {
    id: "sal-institute-name",
    scenario: {
      en: "A television debate introduces a guest as the director of the Institute for Independent Policy Research. The host treats the affiliation as establishing that the guest has no stake in the outcome.",
    },
    trap: "self-applied-label",
    explanation: {
      en: "The word independent in an organisation's name was chosen by that organisation and required nobody's agreement. Independence is a fact about who funds and directs the work, which is a matter of public filings rather than of stationery.",
    },
  },
  {
    id: "sal-official-country-name",
    scenario: {
      en: "A briefing note describes a state as a republic on the strength of its official name, and infers from this that its head of state must be answerable to some elected body.",
    },
    trap: "self-applied-label",
    explanation: {
      en: "A country's official name is written by whoever holds power there, so it is a claim rather than a finding, and several of the most tightly controlled states in the world carry the most generous names. What settles it is whether anyone has ever been removed from office by a vote.",
    },
  },
  {
    id: "sal-natural-label",
    scenario: {
      en: "Two jars sit side by side at the same price. One is labelled all natural. A shopper concludes it must have fewer additives, without turning either jar around.",
    },
    trap: "self-applied-label",
    explanation: {
      en: "In most jurisdictions natural on a food label is not a defined term and no one verifies it, so it costs the manufacturer nothing to print. The ingredients list on the back is the regulated part, which is why it is the part worth reading.",
    },
  },
  {
    id: "sal-bill-title",
    scenario: {
      en: "A committee member argues that colleagues opposing a bill are hard to explain, since the bill's official short title announces that it protects children.",
    },
    trap: "self-applied-label",
    explanation: {
      en: "The title of a bill is written by its sponsors and is a piece of advocacy attached to the text, not a summary of it. Whether the bill protects anybody is a question about its clauses, and a title chosen to make opposition sound indefensible is a reason to read them more carefully rather than less.",
    },
  },
  {
    id: "sal-mission-statement",
    scenario: {
      en: "An investor reviewing a company's safety record is reassured by the values page on its website, which states that safety is the firm's first priority and always has been.",
    },
    trap: "self-applied-label",
    explanation: {
      en: "A values page is written by the company about the company and passes no external test, so it carries no information about the company's conduct. The incident rate, the inspection findings and the settled claims are written by other people, which is what makes them worth something.",
    },
  },
  {
    id: "sal-eco-seal",
    scenario: {
      en: "A product carries a green leaf seal reading Certified Eco Friendly. A buyer takes the seal as evidence the claim has been checked, without looking up who issues it.",
    },
    trap: "self-applied-label",
    explanation: {
      en: "A seal is only worth the independence of whoever grants it, and some are run by the industries they certify or invented by the manufacturer outright. The question is not whether a badge exists but who can withhold it, and on what evidence.",
    },
  },
  {
    id: "sal-journal-title",
    scenario: {
      en: "A paper is cited as authoritative because it appeared in a journal whose title contains the words International and Advanced, and which describes itself on its homepage as rigorously peer reviewed.",
    },
    trap: "self-applied-label",
    explanation: {
      en: "Any publisher may put those words in a title and on a homepage, and predatory journals do exactly that because the words are free. Whether review happened is a question about the editorial board, the indexing and the fees, none of which the title reports.",
    },
  },
  {
    id: "sal-democratic-charter",
    scenario: {
      en: "A trade body's founding charter guarantees that members may vote out the executive at any general meeting. A journalist reports the body as member controlled on that basis.",
    },
    trap: "self-applied-label",
    explanation: {
      en: "A written guarantee describes what the document says, not what has happened under it, and the two come apart routinely. The reportable fact is how often a contested vote has been held and whether an executive has ever actually lost one.",
    },
  },
  {
    id: "sal-grassroots-group",
    scenario: {
      en: "A campaign group calling itself Local Families for Fair Energy runs advertisements against a proposed levy, and a councillor cites it as evidence that residents oppose the measure.",
    },
    trap: "self-applied-label",
    explanation: {
      en: "A name asserting that a group is local and made of families is chosen by whoever registered it, and campaigns funded by an affected industry are routinely named this way for precisely that reason. Who pays for the advertising is on the record and answers the question the name only gestures at.",
    },
  },
  {
    id: "sal-award-self-issued",
    scenario: {
      en: "A clinic advertises itself as an award-winning centre of excellence. The award turns out to be one the clinic's own parent group created and administers.",
    },
    trap: "self-applied-label",
    explanation: {
      en: "An award given by the recipient to itself conveys nothing beyond a willingness to print it, and centre of excellence is in most places an unregulated phrase. What would count is an accreditation that can be refused, or outcomes reported to a registry the clinic does not control.",
    },
  },

  // ---- Sound handling of names and labels (decoys) ----
  {
    id: "ok-label-with-an-auditor",
    scenario: {
      en: "A shopper trusts an organic label after checking that it is a legally defined term in her country, that certification requires an annual inspection, and that certificates have been withdrawn from producers who failed.",
    },
    trap: null,
    explanation: {
      en: "This is the right test applied and passed. A label means something exactly when an outside party can refuse it and sometimes does, and the shopper checked both halves rather than trusting the word itself.",
    },
  },
  {
    id: "ok-name-set-aside",
    scenario: {
      en: "A researcher writing about a self-described think tank uses its name once, notes that the description is the organisation's own, and then reports its funding sources and publication record.",
    },
    trap: null,
    explanation: {
      en: "Naming a thing as it names itself is unavoidable and harmless as long as the reader is told whose description it is. Setting the label aside and going to the funded, checkable facts is exactly the move the label was designed to forestall.",
    },
  },
  {
    id: "ok-promise-and-record-separate",
    scenario: {
      en: "A report on a company's climate pledge states what the pledge commits to, states separately what the company's audited emissions have done since, and does not treat the first as evidence for the second.",
    },
    trap: null,
    explanation: {
      en: "Keeping the promise and the performance in separate columns is the whole discipline, because it lets a reader see the gap instead of having it closed for them. A pledge is worth reporting as a pledge, and only the audited figure speaks to what happened.",
    },
  },
  // ---- Metaphor framing ----
  {
    id: "mf-war-on",
    scenario: {
      en: "A strategy paper declares a war on obesity. The plan that follows is built around targets, campaigns and defeating the problem, and contains nothing about redesigning the places people live.",
    },
    trap: "metaphor-framing",
    explanation: {
      en: "Calling it a war imports enemies, victory and surrender, and quietly rules out the possibility that the thing is a condition to be managed rather than an opponent to be beaten. The metaphor made that choice before any argument was offered for it.",
    },
  },
  {
    id: "mf-belt-tightening",
    scenario: {
      en: "A minister argues that the country must tighten its belt like any household that has overspent. The comparison is not defended, and the budget follows from it.",
    },
    trap: "metaphor-framing",
    explanation: {
      en: "The household metaphor brings the intuition that spending less is always prudent, which is a contested economic claim smuggled in as common sense. A state that issues its own currency and borrows at long maturities differs from a household in exactly the respects that matter here.",
    },
  },
  {
    id: "mf-immune-system",
    scenario: {
      en: "A security vendor describes its product as an immune system for the network. The buyer starts asking about detection and response, and stops asking whether the vulnerable service should be exposed at all.",
    },
    trap: "metaphor-framing",
    explanation: {
      en: "An immune system fights intruders that have already entered, so the metaphor moves attention to detection and away from prevention. Both are real options, and the figure of speech chose between them without saying so.",
    },
  },
  {
    id: "mf-viral-rumour",
    scenario: {
      en: "A report on a rumour spreading online frames it as a contagion and recommends quarantining accounts and inoculating the public. Nobody asks why people found the rumour worth believing.",
    },
    trap: "metaphor-framing",
    explanation: {
      en: "Contagion treats belief as something people catch passively, which rules out the possibility that they were persuaded by something and had reasons. The remedies proposed follow from the metaphor rather than from any finding about why the rumour spread.",
    },
  },
  {
    id: "mf-brain-hard-drive",
    scenario: {
      en: "A popular article explains memory as the brain's hard drive, then reports as a surprising discovery that memories change each time they are recalled.",
    },
    trap: "metaphor-framing",
    explanation: {
      en: "Storage metaphors imply faithful retrieval, so reconstruction looks like a malfunction rather than like how the system works. The finding is only surprising relative to the metaphor, which was never evidence for anything.",
    },
  },
  {
    id: "mf-arms-race",
    scenario: {
      en: "Two companies' hiring is described as an arms race for talent, and the board concludes it must outspend the rival or lose.",
    },
    trap: "metaphor-framing",
    explanation: {
      en: "An arms race is a contest in which falling behind is fatal and the only move is to escalate, which forecloses restraint, differentiation, or simply competing somewhere else. The word decided the strategy before the strategy was discussed.",
    },
  },
  {
    id: "mf-flood",
    scenario: {
      en: "A briefing describes arrivals at a border as a flood, and the options tabled are barriers, containment and stemming the flow.",
    },
    trap: "metaphor-framing",
    explanation: {
      en: "A flood is a mindless force of nature, which removes the individuality of the people described and rules out any option involving processing, hosting or selecting among them. Whatever the right policy is, the metaphor settled the shape of the answer in advance.",
    },
  },
  {
    id: "mf-battle-with-illness",
    scenario: {
      en: "A patient's illness is repeatedly described as a fight she must not give up, and the care team notices she is reluctant to discuss palliative options.",
    },
    trap: "metaphor-framing",
    explanation: {
      en: "The battle metaphor turns stopping treatment into surrender and dying into a personal failure, which is a heavy thing to attach to a clinical decision. It is also not neutral about which choices are respectable, though nothing in the evidence made it so.",
    },
  },
  {
    id: "mf-broken-machine",
    scenario: {
      en: "A consultant describes a struggling department as a broken machine and proposes replacing the faulty parts, meaning several members of staff.",
    },
    trap: "metaphor-framing",
    explanation: {
      en: "A machine has interchangeable components and no relationships, so the metaphor makes replacement the natural repair and hides everything about incentives, information and how the work actually flows. The diagnosis came from the figure of speech.",
    },
  },
  {
    id: "mf-marketplace-of-ideas",
    scenario: {
      en: "A platform defends its policy by saying the marketplace of ideas will sort truth from falsehood, and declines to consider whether its own ranking favours some claims over others.",
    },
    trap: "metaphor-framing",
    explanation: {
      en: "A marketplace implies informed buyers, comparable goods and no thumb on the scale, and the argument depends entirely on those implications holding. Stating them plainly turns a settled metaphor back into the empirical question it was standing in for.",
    },
  },

  // ---- Sound handling of a metaphor (decoys) ----
  {
    id: "ok-metaphor-named-and-tested",
    scenario: {
      en: "An analyst opens by saying she will treat the problem as an epidemic, notes that this assumes person to person transmission, and then shows the transmission data before continuing.",
    },
    trap: null,
    explanation: {
      en: "The metaphor is named, its load-bearing assumption is made explicit, and that assumption is then supported with evidence rather than borrowed. This is a metaphor used as a hypothesis instead of as an argument.",
    },
  },
  {
    id: "ok-metaphor-swapped",
    scenario: {
      en: "Before signing off a recommendation, a team restates the same facts under a second, opposite metaphor and checks whether their conclusion still follows. It does, and they say so in the paper.",
    },
    trap: null,
    explanation: {
      en: "This is the swap, applied deliberately. A conclusion that survives being retold under a rival figure of speech was resting on the evidence, and recording that the check was run lets a reader see it was not an accident.",
    },
  },
  {
    id: "ok-plain-description",
    scenario: {
      en: "A report avoids calling the problem anything at all, describing instead what is rising, by how much, among whom and over what period, and lists the available responses without grouping them.",
    },
    trap: null,
    explanation: {
      en: "Refusing the shorthand costs the reader a little vividness and buys them the whole option set. Listing responses without grouping them is the part that matters most, since a grouping is itself a quiet metaphor about which things belong together.",
    },
  },
  // ---- Compliance sequencing ----
  {
    id: "cs-petition-then-sign",
    scenario: {
      en: "A canvasser asks residents to sign a harmless petition supporting road safety. Two weeks later the same organisation returns asking them to host a large sign in their front garden, and finds far more agree than on streets it had never visited.",
    },
    trap: "compliance-sequencing",
    explanation: {
      en: "The petition was not the ask, it was the setup, and signing it is what makes the second request land on somebody who now thinks of themselves as involved. The second request should be judged on whether you want the sign, which is a question you can answer without reference to the first visit.",
    },
  },
  {
    id: "cs-free-trial",
    scenario: {
      en: "A service offers a free thirty-day trial that requires setting up an account, importing your data and inviting two colleagues. The paid plan is pitched on day twenty-eight.",
    },
    trap: "compliance-sequencing",
    explanation: {
      en: "The trial is not a sample of the product, it is a sequence of small completed actions, and each one makes the next agreement easier. The question worth asking on day twenty-eight is what you would pay if the offer arrived today with none of that behind you.",
    },
  },
  {
    id: "cs-outrageous-opening-bid",
    scenario: {
      en: "A supplier opens with a price so high the buyer laughs, then comes down to a figure that feels like a real concession. The buyer accepts it without checking it against other quotes.",
    },
    trap: "compliance-sequencing",
    explanation: {
      en: "The refused opening is doing the work, because a visible concession feels like it calls for one in return, and the second number is being judged against the first rather than against the market. A refusal does not reset the exchange, it is the mechanism.",
    },
  },
  {
    id: "cs-charity-small-gift",
    scenario: {
      en: "A charity asks people for a token donation of one pound, describing it as symbolic. Those who give are contacted six months later with a request for a monthly commitment, and give at much higher rates than fresh contacts.",
    },
    trap: "compliance-sequencing",
    explanation: {
      en: "The token amount was never about the money, it was about producing a donor, and the later request is addressed to that person rather than to a stranger. Nothing here is deceptive, which is precisely why checking the charity's honesty does not protect you.",
    },
  },
  {
    id: "cs-survey-then-upsell",
    scenario: {
      en: "A caller says she is doing a two-minute research survey and is not selling anything, which is true. At the end of the survey she asks whether the respondent would like to hear about an offer.",
    },
    trap: "compliance-sequencing",
    explanation: {
      en: "Every word of that is accurate and the survey really was research, and the sequence still does its work. Having just spent two minutes helping her, refusing the next thing feels like a change of character rather than a decision about an offer.",
    },
  },
  {
    id: "cs-interrogation-small-admission",
    scenario: {
      en: "An investigator opens by getting a suspect to confirm trivial and undisputed facts, such as where he parked and what time he left, before moving to the matter at issue.",
    },
    trap: "compliance-sequencing",
    explanation: {
      en: "A run of easy agreements is a recognised technique for making the next agreement easier, and the trivial facts are chosen because refusing them would seem absurd. Whether to answer the substantive question is a separate decision, and it does not become smaller because the last four answers were.",
    },
  },
  {
    id: "cs-escalating-commitment-meeting",
    scenario: {
      en: "A vendor asks only for a fifteen-minute introductory call, then a short technical demo, then a workshop with your team, then a pilot. Nobody ever proposed the pilot at the start.",
    },
    trap: "compliance-sequencing",
    explanation: {
      en: "A chain of small agreements arrives at a place nobody would have agreed to in one step, and each link seems reasonable relative to the one before it. The check is whether you would have said yes to the pilot cold, which is the request the sequence was always heading for.",
    },
  },
  {
    id: "cs-refused-then-moderate",
    scenario: {
      en: "A colleague asks you to take over an entire project for three months. You refuse. He immediately asks you to cover just the reporting for it, and you agree, having not considered whether you have time for that either.",
    },
    trap: "compliance-sequencing",
    explanation: {
      en: "The smaller request is being weighed against the one you just refused instead of against your actual workload, and his apparent retreat reads as a concession you should match. Ask what you would say if the reporting request had come first and alone.",
    },
  },
  {
    id: "cs-onboarding-profile",
    scenario: {
      en: "An app asks for a nickname, then a photo, then contacts access, then location, each on its own screen after the previous one is completed.",
    },
    trap: "compliance-sequencing",
    explanation: {
      en: "Splitting a large disclosure into a sequence of small ones is a design choice, not a technical necessity, and each completed step raises the odds of the next. Presented on one screen as a single list the same requests would be refused far more often.",
    },
  },
  {
    id: "cs-loyalty-punch-card",
    scenario: {
      en: "A cafe hands new customers a loyalty card that already has two of the ten squares stamped, describing it as a welcome bonus, and finds these cards are completed far more often than empty ten-square cards.",
    },
    trap: "compliance-sequencing",
    explanation: {
      en: "The same eight purchases are required either way, and the two free stamps change nothing but the sense of having already started. That feeling of a sequence under way is the entire product of the gift.",
    },
  },

  // ---- Sound handling of a sequence of requests (decoys) ----
  {
    id: "ok-judged-cold",
    scenario: {
      en: "Offered an upgrade at the end of a long and genuinely helpful support call, a customer asks himself what he would pay for it in an email from a stranger, decides that is less than the price, and declines.",
    },
    trap: null,
    explanation: {
      en: "This is the defence applied exactly as it should be. Testing the request as though it had arrived cold strips out the sequence without requiring anyone to work out how much the sequence moved them.",
    },
  },
  {
    id: "ok-sequence-disclosed",
    scenario: {
      en: "A fundraiser tells prospective donors at the outset what the full programme involves, that it begins with a small gift and will later include a request for a regular commitment, and asks them to decide about both.",
    },
    trap: null,
    explanation: {
      en: "Disclosing the sequence in advance is what turns it from a technique into an offer, because the decision is now being made with the whole shape visible. The small first step still helps, but it is no longer doing work the donor cannot see.",
    },
  },
  {
    id: "ok-refusal-noted-not-repaid",
    scenario: {
      en: "After turning down a large request, a manager notices that the smaller follow-up feels like something she owes, sets that feeling aside, and evaluates the smaller task against her actual capacity before agreeing to part of it.",
    },
    trap: null,
    explanation: {
      en: "Noticing the sense of obligation and declining to treat it as evidence is the whole skill, and it does not require refusing the second request. She agreed on the merits, which is a different thing from agreeing because a concession seemed to have been made.",
    },
  },
  // ---- False balance ----
  {
    id: "fb-two-chairs",
    scenario: {
      en: "A broadcaster covering a new surgical technique books one surgeon who uses it and one who thinks it unsafe, and gives them nine minutes each. Of the surgeons who have published on the technique, the producer knows that the great majority use it.",
    },
    trap: "false-balance",
    explanation: {
      en: "Nine minutes each tells the audience the profession is split about evenly, which is a claim about the evidence and it is false. Neither surgeon has to say anything untrue for the segment to leave viewers with a wrong impression of where the field stands.",
    },
  },
  {
    id: "fb-school-textbook",
    scenario: {
      en: "A textbook committee decides that a disputed historical question should be presented with two interpretations side by side and equal space, on the grounds that pupils should make up their own minds. One interpretation is held by a handful of writers, the other by nearly every academic historian of the period.",
    },
    trap: "false-balance",
    explanation: {
      en: "Equal space is not neutrality, it is a statement that the profession divides evenly, and pupils cannot make up their own minds about evidence they have been given a distorted picture of. Presenting both and saying honestly how each is held would be neutral; presenting both as equals is not.",
    },
  },
  {
    id: "fb-safety-panel",
    scenario: {
      en: "An engineering review of a bridge design assembles a panel of six: three who consider the design sound and three who consider it unsafe. The three critics were recruited specifically to make the panel even, from a field in which almost nobody shares their view.",
    },
    trap: "false-balance",
    explanation: {
      en: "The panel was built to look balanced rather than to sample the field, so its composition carries no information about the design and the even split is an artefact of recruitment. A reader who takes the three-to-three split as evidence of genuine professional disagreement has been misled by the shape of the panel.",
    },
  },
  {
    id: "fb-manufactured-minority",
    scenario: {
      en: "A trade association responds to a critical review of its product by funding a small number of dissenting studies, then asks reporters covering the topic to represent both sides of what it calls an ongoing scientific debate.",
    },
    trap: "false-balance",
    explanation: {
      en: "Producing a minority and then demanding it be given equal weight turns the balance norm into a tool. The reporter who complies has not been bribed or lied to; the format itself does the work, because two sides in print look the same whether the split is even or lopsided.",
    },
  },
  {
    id: "fb-omitted-minority",
    scenario: {
      en: "A clinical guideline summary presents a treatment as settled and does not mention that roughly a third of the specialist committee filed a dissent, on the grounds that the summary should give clinicians a clear recommendation.",
    },
    trap: "false-balance",
    explanation: {
      en: "This is the same failure running the other way, and it is worth recognising as one: the format has again claimed something about the distribution of expert opinion that is not true, this time by manufacturing consensus rather than controversy. A third dissenting is a fact clinicians need, and clarity is not a reason to withhold it.",
    },
  },
  {
    id: "fb-comment-section",
    scenario: {
      en: "A journal publishes a large study alongside a single critical commentary, formatted identically and of equal length. A reader concludes that the finding is contested within the field.",
    },
    trap: "false-balance",
    explanation: {
      en: "One commentary is evidence that one group objected, not evidence about how many did. Equal formatting and equal length invite the reader to weigh the two as comparable bodies of opinion, and nothing in the layout says how many researchers stand behind each.",
    },
  },
  {
    id: "fb-sports-pundit",
    scenario: {
      en: "A sports programme debating whether a rule change reduced injuries seats a former player who says it did against one who says it did not, and lets them argue for the segment. The medical literature on the rule is cited by neither.",
    },
    trap: "false-balance",
    explanation: {
      en: "The question has an answer that somebody has measured, and the segment has replaced that with a two-sided argument in which the sides are people rather than evidence. The audience learns that opinion divides, which was never in doubt, and nothing about which view the data supports.",
    },
  },
  {
    id: "fb-courtroom-experts",
    scenario: {
      en: "Each side in a civil case calls one expert witness. The jury is told that expert opinion on the technical question is divided, and reasons that since the experts cancel out, the point should be set aside.",
    },
    trap: "false-balance",
    explanation: {
      en: "One expert per side is a rule of procedure, not a sample of the field, so the apparent tie is produced by the format of the trial. Whether the field actually divides evenly is a separate question the jury has not been given the means to answer, and treating the point as neutralised assumes an answer to it.",
    },
  },
  {
    id: "fb-poll-of-two",
    scenario: {
      en: "A technology site asks two analysts whether a security standard is ready for production, publishes one yes and one no, and headlines the piece as analysts split. The site approached only those two.",
    },
    trap: "false-balance",
    explanation: {
      en: "Two people disagreeing is not a split in the field, it is a sample of two, and the headline promotes it to a statement about analysts generally. The smaller the sample, the easier it is to produce any division you like without anybody misreporting a word.",
    },
  },
  {
    id: "fb-letters-page",
    scenario: {
      en: "A newspaper runs its letters page on a scientific controversy with an equal number of letters each way, as a matter of editorial policy, having received nine times as many on one side as the other.",
    },
    trap: "false-balance",
    explanation: {
      en: "The policy has thrown away the one piece of information the postbag contained. Readers see an even page and infer an even division, when the letters themselves recorded nine to one, so the format has erased a real measurement in the name of fairness.",
    },
  },
  {
    id: "ok-balance-with-denominator",
    scenario: {
      en: "A programme covering a disputed treatment interviews a supporter and a critic, and the presenter states that a recent survey found roughly nine in ten specialists take the supporter's position. The two are then allowed to make their cases.",
    },
    trap: null,
    explanation: {
      en: "Airing a minority view is not the problem and never was. Supplying the denominator is what stops the two-chair format from making its own silent claim, and here the audience has been told how the field divides before hearing the argument.",
    },
  },
  {
    id: "ok-genuinely-open-question",
    scenario: {
      en: "A magazine gives equal space to two research groups reading the same ambiguous fossil evidence in different ways, and notes that specialists are split with no clear majority either way.",
    },
    trap: null,
    explanation: {
      en: "Equal weight is the accurate treatment when the weight really is equal, which is why balance is the right default rather than a trap in itself. The error is applying the format without checking, not applying it here.",
    },
  },
  {
    id: "ok-minority-reported-as-minority",
    scenario: {
      en: "A report on a contested diagnostic threshold devotes most of its length to the majority position, gives the dissenting group a shorter section, and says plainly how many committee members took each view.",
    },
    trap: null,
    explanation: {
      en: "Space proportional to support, with the numbers stated, is what accurate coverage of a lopsided question looks like. The dissent is neither hidden nor inflated, and a reader can weigh it themselves because they have been told how much of it there is.",
    },
  },
  {
    id: "ok-refusing-a-manufactured-side",
    scenario: {
      en: "Offered a spokesperson to represent the other side of a question on which an editor can find no published disagreement among specialists, the editor declines the interview and instead reports that the specialist literature is one-sided.",
    },
    trap: null,
    explanation: {
      en: "Declining to stage a debate that does not exist in the field is not censorship of a view, it is a refusal to misreport the distribution of expert opinion. The one-sidedness has been reported rather than concealed, which is what the audience needed to know.",
    },
  },
  {
    id: "ok-split-really-is-even",
    scenario: {
      en: "Covering a macroeconomic forecast, a broadcaster notes that a survey of forecasters found them close to evenly divided, and gives roughly equal time to a representative of each camp.",
    },
    trap: null,
    explanation: {
      en: "The airtime here matches a division that was measured rather than assumed, so the format is saying something true. Checking the denominator first is the whole of the skill, and it can perfectly well come back even.",
    },
  },
  // ---- The continued influence effect ----
  {
    id: "ci-withdrawn-on-a-technicality",
    scenario: {
      en: "A journal withdraws a paper because the authors did not have ethical approval for the data collection, saying nothing about whether the findings are sound. Six months later the finding is still being cited approvingly in reviews.",
    },
    trap: "continued-influence-effect",
    explanation: {
      en: "The withdrawal gave readers no reason to think the result was wrong, only that it should not have been gathered, so the belief it created has nothing to displace it. A retraction has to supply a replacement account to take effect, and a procedural one supplies none.",
    },
  },
  {
    id: "ci-cannot-stand-it-up",
    scenario: {
      en: "A newspaper retracts an allegation against a company, saying only that it was unable to substantiate the claim to its own standards. Readers surveyed afterwards still believe the allegation at close to the original rate.",
    },
    trap: "continued-influence-effect",
    explanation: {
      en: "Unable to substantiate is not the same as untrue, and readers hear it as the paper backing down rather than as the claim being false. Without a competing account of what actually happened, the original story is still the only story they have.",
    },
  },
  {
    id: "ci-recall-then-reinstated",
    scenario: {
      en: "A device is pulled from sale while a fault is investigated, then reinstated when the investigation finds no fault. Sales stay depressed, and clinicians report that they now avoid it for reasons they find hard to articulate.",
    },
    trap: "continued-influence-effect",
    explanation: {
      en: "The recall planted a specific belief, that this device fails, and the all-clear only removed the reason for suspicion without addressing the belief itself. That the clinicians cannot articulate the reason is characteristic: influence of this kind survives the correction and is not introspectively visible.",
    },
  },
  {
    id: "ci-sealed-not-disproved",
    scenario: {
      en: "A tribunal rules that a leaked document cannot be entered as evidence because of how it was acquired, and instructs the panel to set it aside. The panel members each report having done so, and the eventual finding tracks the document closely.",
    },
    trap: "continued-influence-effect",
    explanation: {
      en: "Nobody told the panel the document was inaccurate, only that it was off-limits, so setting it aside would require disbelieving something they still think is true. Their sincere reports of compliance are exactly what this effect predicts, because the influence does not feel like influence.",
    },
  },
  {
    id: "ci-correction-in-small-print",
    scenario: {
      en: "A magazine corrects a figure it had overstated by a factor of ten, printing the true number in a short notice. A reader who saw both later recalls the topic as involving a very large number without being able to say which.",
    },
    trap: "continued-influence-effect",
    explanation: {
      en: "The correction did supply a replacement, which is the kind that can work, but the impression it had to displace was already doing structural work in the reader's picture of the topic. What survives is the gist rather than the digit, so a correction that only swaps a number often leaves the conclusion it supported standing.",
    },
  },
  {
    id: "ci-rumour-and-denial",
    scenario: {
      en: "An organisation responds to a rumour about a departing executive by stating that it does not comment on personnel matters. Staff take the non-denial as confirmation and the rumour hardens.",
    },
    trap: "continued-influence-effect",
    explanation: {
      en: "Declining to engage leaves the rumour as the only account in circulation, and refusing to say it is false is heard as being unable to. A correction that neither denies nor explains cannot displace anything, and here it has added weight to what it was meant to damp.",
    },
  },
  {
    id: "ci-retracted-but-explained",
    scenario: {
      en: "A safety scare about an additive is retracted after the original lab admits its samples were contaminated and shows how. Later surveys find belief in the scare has dropped close to its level before the story ran.",
    },
    trap: null,
    explanation: {
      en: "This is what an effective retraction looks like, and it is worth recognising that they exist. Readers were handed a different account of why the result appeared, so there is something to believe instead of the scare, and the original belief has somewhere to go.",
    },
  },
  {
    id: "ci-jury-told-evidence-false",
    scenario: {
      en: "A judge tells a jury to disregard a witness's identification because the line-up was run in a way known to produce false identifications, and explains why. The jury acquits at the same rate as a comparable jury that never heard the identification.",
    },
    trap: null,
    explanation: {
      en: "Being told the evidence is probably wrong, with the reason, gives jurors grounds to disbelieve rather than merely grounds not to mention. That is the version of the instruction people do comply with, so nothing here needs explaining away.",
    },
  },
  {
    id: "ci-blamed-the-correction",
    scenario: {
      en: "A team reviewing why a project failed keeps returning to a supplier problem that was identified early and later shown to have been a misreading of a delivery log. The misreading was circulated and acknowledged, but no alternative cause was ever established.",
    },
    trap: "continued-influence-effect",
    explanation: {
      en: "Withdrawing a cause leaves a hole in the account of what happened, and a hole is uncomfortable enough that the withdrawn cause keeps filling it. Corrections take hold much better when they come with a replacement explanation, and here there is none to be had.",
    },
  },
  {
    id: "ci-preprint-then-peer-review",
    scenario: {
      en: "A preprint reporting a striking treatment effect circulates widely. Peer review later finds the analysis excluded a third of the randomised patients, and the published version reports no effect. Clinicians continue to cite the striking figure.",
    },
    trap: "continued-influence-effect",
    explanation: {
      en: "The correction here does supply grounds for disbelief, so it is the kind that can work, but only for people who encounter it, and a null result circulates far less than a striking one. Where the retraction is real and the exposure is not, the original claim keeps running on its head start.",
    },
  },
  {
    id: "ci-headline-then-clarification",
    scenario: {
      en: "A broadcaster reports that a chemical was found in a water supply, then clarifies the next day that the level was a hundredth of the safety threshold. Complaints about the water supply continue to rise for weeks.",
    },
    trap: "continued-influence-effect",
    explanation: {
      en: "The clarification did not contradict the original claim, it qualified it, so listeners keep both and the alarming half is the memorable one. A number that is technically consistent with the first report gives the belief nothing to bump against.",
    },
  },
  {
    id: "ci-source-recanted",
    scenario: {
      en: "An investigation's central witness recants and explains that they had been mistaken about the date. Coverage reporting the recantation is as prominent as the original, and subsequent commentary treats the allegation as closed.",
    },
    trap: null,
    explanation: {
      en: "A recantation with a reason and equal prominence is close to the best case for a correction: it names what was wrong, supplies the replacement, and reaches the same audience. Corrections working under those conditions is the finding, not an exception to it.",
    },
  },
  {
    id: "ci-both-versions-heard",
    scenario: {
      en: "Asked whether a colleague was involved in an incident, a manager who read both the initial report and its detailed retraction says she is not sure, checks the retraction again before answering, and answers from it.",
    },
    trap: null,
    explanation: {
      en: "Noticing that she holds two versions and going back to the source rather than to memory is the defence against this effect, not a symptom of it. The uncertainty is appropriate; acting on the checked document rather than the vivid first impression is the whole skill.",
    },
  },
  {
    id: "ci-quietly-unpublished",
    scenario: {
      en: "A government agency removes a guidance page that had circulated widely, without announcement or explanation. The advice on it continues to be repeated in training materials for years.",
    },
    trap: "continued-influence-effect",
    explanation: {
      en: "A silent removal is the weakest form of correction there is: no reader is told the advice was wrong, so nobody has any reason to revise anything. Absence cannot displace a belief, and the people repeating the advice have no way of knowing there is anything to displace.",
    },
  },
  // ---- The sleeper effect ----
  {
    id: "se-nobody-believes-them",
    scenario: {
      en: "An editor decides not to respond to a claim circulating in an outlet with a poor reputation, on the grounds that the outlet's readers already discount everything it prints and a response would only spread the claim further.",
    },
    trap: "sleeper-effect",
    explanation: {
      en: "The discount is real today and is the part that expires. Readers keep the claim as something they vaguely know and stop applying the reason they had for setting it aside, so the outlet's reputation protects them at the time and not later.",
    },
  },
  {
    id: "se-heard-it-somewhere",
    scenario: {
      en: "Asked why she thinks a particular supplement helps, someone says she is not sure where she read it but has the impression it is well supported. She had in fact read it in a promotional leaflet and dismissed it at the time.",
    },
    trap: "sleeper-effect",
    explanation: {
      en: "This is the effect in its plainest form. The claim survived as a proposition about the world while the fact about where it came from stopped being applied to it, so a judgement she made correctly has quietly reversed itself.",
    },
  },
  {
    id: "se-repeat-to-mock",
    scenario: {
      en: "A commentator quotes an absurd claim at length in order to ridicule it. Weeks later, surveys of his audience find higher agreement with the claim than before the segment aired.",
    },
    trap: "sleeper-effect",
    explanation: {
      en: "Repeating a claim puts it into memory; the mockery is the part that has to stay attached, and attachments are what decay. Quoting something to demolish it is one of the reliable ways of spreading it, which is why the defence is to describe rather than repeat.",
    },
  },
  {
    id: "se-retracted-source-still-cited",
    scenario: {
      en: "A team dismisses a figure because it came from an industry press release with no method attached. Six months later the same figure appears in their own internal slide deck, sourced to nothing in particular.",
    },
    trap: "sleeper-effect",
    explanation: {
      en: "The figure entered circulation the moment it was discussed, and the reason for distrusting it was a fact about its origin rather than a property of the number. The number travelled and the caveat did not.",
    },
  },
  {
    id: "se-briefing-caveat",
    scenario: {
      en: "A briefing note presents an estimate with a clear warning that it comes from a single unreplicated study. The estimate is quoted in three later documents, none of which carries the warning.",
    },
    trap: "sleeper-effect",
    explanation: {
      en: "Conditions travel worse than the propositions they attach to, and here the decay is visible in the paper trail rather than in anybody's memory. The mechanism is the same: what was true only given a caveat becomes true simply.",
    },
  },
  {
    id: "se-trusted-source-fades-too",
    scenario: {
      en: "A clinician accepts a recommendation because it came from a body she trusts, without following up the reasoning. A year later she still follows it and can no longer say why it was recommended.",
    },
    trap: "sleeper-effect",
    explanation: {
      en: "The same decay runs in the flattering direction and is worth recognising there too: the good reason for believing something has dropped away and left a bare conviction. She is not wrong to trust the body, but she now holds the conclusion without anything that could tell her when it stops applying.",
    },
  },
  {
    id: "se-oppo-research",
    scenario: {
      en: "A campaign circulates an allegation it knows will be publicly and convincingly rebutted within days, judging that the rebuttal will settle the matter and cost them little.",
    },
    trap: "sleeper-effect",
    explanation: {
      en: "The calculation is that the immediate measurement is the one that matters, and the immediate measurement is the one this effect contradicts. A claim that is discounted now can be doing work weeks later, and the campaign has probably assessed that correctly.",
    },
  },
  {
    id: "se-fiction-detail",
    scenario: {
      en: "A reader who knows a novel is fiction later reports a historical belief that appears nowhere except in that novel, and is confident it is established fact.",
    },
    trap: "sleeper-effect",
    explanation: {
      en: "Knowing a source is fiction is a discounting cue like any other, and it is stored separately from what the source said. The belief was never checked against anything because at the time it never needed to be.",
    },
  },
  {
    id: "se-anonymous-tip-line",
    scenario: {
      en: "An investigator reads an anonymous tip, notes that anonymous tips are worthless as evidence, and files it. Months into the inquiry he finds his working theory matches the tip closely, having reached it, as far as he can tell, from the documents.",
    },
    trap: "sleeper-effect",
    explanation: {
      en: "The tip supplied a hypothesis, and hypotheses are what steer which documents look significant. He correctly refused to treat it as evidence and it shaped the investigation anyway, because the refusal applied to the tip's status and not to the idea it planted.",
    },
  },
  {
    id: "se-advertising-recall",
    scenario: {
      en: "Focus groups shown an advertisement say the claims are obvious marketing and they do not believe any of them. A survey of the same people six weeks later finds them rating the product more favourably than a group who never saw it.",
    },
    trap: "sleeper-effect",
    explanation: {
      en: "That an advertisement is an advertisement is a discounting cue, and the whole business model works if that cue fades faster than the impression does. Reporting disbelief in the room is not evidence about what the campaign will have done by the time anybody buys anything.",
    },
  },
  {
    id: "se-wrote-down-why",
    scenario: {
      en: "On dismissing a striking statistic from an unnamed source, an analyst adds a line to her notes recording what she would need to see before using it. Asked about the figure a month later, she checks the note and repeats the condition.",
    },
    trap: null,
    explanation: {
      en: "Putting the condition somewhere outside her own memory is exactly the defence, because the condition is the part that decays and the claim is not. Nothing here needs explaining away; this is the behaviour the finding recommends.",
    },
  },
  {
    id: "se-checked-before-repeating",
    scenario: {
      en: "Before including a well-known figure in a report, a writer notices he cannot remember where it came from, looks it up, finds it traces back to a press release, and leaves it out.",
    },
    trap: null,
    explanation: {
      en: "Noticing that the source has detached from the claim, and treating that as a reason to check rather than as a reason to relax, is the skill. The failure would have been to take his own familiarity with the figure as evidence for it.",
    },
  },
  {
    id: "se-first-impression-held",
    scenario: {
      en: "A committee revisits a proposal it rejected a year ago on grounds it recorded in the minutes at the time. Reading the minutes, it finds the objection still holds and rejects the proposal again.",
    },
    trap: null,
    explanation: {
      en: "The reasoning is anchored to a written record rather than to what anybody remembers feeling about it, so the conditions attached to the original judgement are still available. Consistency reached this way is evidence, unlike consistency reached from memory alone.",
    },
  },
  {
    id: "se-described-not-quoted",
    scenario: {
      en: "Covering a conspiracy claim, a broadcaster describes its structure and what would have to be true for it to hold, without stating the claim itself in a quotable form.",
    },
    trap: null,
    explanation: {
      en: "This is the practical response to the finding rather than an instance of it. Nothing memorable has been put into circulation that could later come loose from its context, and the audience has still been told what is going on.",
    },
  },
  // ---- Paltering ----
  {
    id: "pa-meets-every-standard",
    scenario: {
      en: "Asked whether its product has ever failed a safety test, a manufacturer replies that the product meets every current regulatory standard. The questioner takes this as a no and moves on.",
    },
    trap: "paltering",
    explanation: {
      en: "Meeting today's standards and never having failed a test are different facts, and only the second was asked about. The answer is true, unfalsifiable and completely unresponsive, which is the signature: repeat the question and it either gets answered or visibly does not.",
    },
  },
  {
    id: "pa-no-evidence-of-harm",
    scenario: {
      en: "Asked whether a chemical is safe at the levels found in drinking water, a spokesperson says there is no evidence of harm at those levels. Nobody has looked.",
    },
    trap: "paltering",
    explanation: {
      en: "No evidence of harm is true when no one has gone looking, and it is heard as evidence of no harm. The statement survives any fact-check because it describes the state of the literature rather than the state of the world, and those come apart precisely when nothing has been studied.",
    },
  },
  {
    id: "pa-record-quarter",
    scenario: {
      en: "A company announces its best quarter for new customer sign-ups in five years. It does not mention that departures also hit a five-year high and that the customer base shrank.",
    },
    trap: "paltering",
    explanation: {
      en: "Sign-ups really were a record; that is not the misleading part. Choosing the one true measure that points the right way, from a set the speaker can see and the audience cannot, is what does the work. Ask which measure you would want if you were choosing, then ask why that one was not given.",
    },
  },
  {
    id: "pa-previously-owned-by",
    scenario: {
      en: "Selling a car, an owner says it has been serviced by the main dealer its whole life. It has, twice, and it has been off the road for two of the last three years.",
    },
    trap: "paltering",
    explanation: {
      en: "Every word holds up and the impression is of a well-maintained car. The technique is to state something true whose usual implication does not apply in this case, and to leave the implication to do the lying.",
    },
  },
  {
    id: "pa-i-was-not-charged",
    scenario: {
      en: "Asked about an investigation, a public figure says repeatedly and truthfully that they were never charged with anything. The investigation concluded that the conduct occurred but fell outside the statute.",
    },
    trap: "paltering",
    explanation: {
      en: "Not charged is true and answers a legal question that nobody asked; the question was about what happened. Substituting an adjacent question you can answer cleanly for the one that was put is the standard move, and the tell is that the answer is more precise than the question.",
    },
  },
  {
    id: "pa-up-to-forty-per-cent",
    scenario: {
      en: "A tariff is advertised as saving households up to 40 per cent. The 40 per cent applies to one usage pattern shared by a small fraction of customers; the median saving is near zero.",
    },
    trap: "paltering",
    explanation: {
      en: "The claim is true for somebody, which is all up to requires, and it is heard as a description of what you would get. A range whose top end is real for a handful of people is a true statement engineered to be read as a typical one.",
    },
  },
  {
    id: "pa-declined-to-renew",
    scenario: {
      en: "A reference letter states accurately that the employee's contract was not renewed at the end of its term, and says nothing else about the circumstances. The employee had been dismissed for misconduct.",
    },
    trap: "paltering",
    explanation: {
      en: "Not renewed at the end of its term is literally correct and reads as an ordinary expiry. This is the version that is legally careful on purpose, which is much of the appeal: it can be defended sentence by sentence if it is ever challenged.",
    },
  },
  {
    id: "pa-fastest-growing",
    scenario: {
      en: "A treatment is promoted as the fastest growing in its class. It is growing fastest because it started from almost nothing and remains the least prescribed option.",
    },
    trap: "paltering",
    explanation: {
      en: "Growth rates are largest where the base is smallest, so fastest growing is compatible with least used and is often chosen for exactly that reason. The true statement about change is standing in for a false impression about level.",
    },
  },
  {
    id: "pa-technically-on-schedule",
    scenario: {
      en: "Asked whether a project is on schedule, a manager says no milestone has been formally missed. The schedule was rebaselined twice in the last quarter, each time moving the milestones.",
    },
    trap: "paltering",
    explanation: {
      en: "No milestone missed is true of the current schedule and says nothing about the original one, which is what on schedule meant to the person asking. Answering about a definition that has quietly moved is a palter, and the giveaway is the word formally.",
    },
  },
  {
    id: "pa-independent-review",
    scenario: {
      en: "A firm describes a report as an independent review. The reviewers had no financial stake and were selected, briefed and paid by the firm, and their terms of reference excluded the contested question.",
    },
    trap: "paltering",
    explanation: {
      en: "Independent is defensible on the narrow sense the firm has in mind and is heard in the broad sense the audience has in mind. Words with a strict technical reading and a loose everyday one are the natural raw material for this, because the strict reading is the defence.",
    },
  },
  {
    id: "ok-answered-the-question-asked",
    scenario: {
      en: "Asked whether its product has ever failed a safety test, a manufacturer says that it failed twice in 2019, explains what was changed, and adds that it has passed every test since.",
    },
    trap: null,
    explanation: {
      en: "The question was answered on its own terms before any context was added, which is the shape an honest reply has. Adding favourable true information after answering is not paltering; substituting it for the answer is.",
    },
  },
  {
    id: "ok-declined-to-answer-openly",
    scenario: {
      en: "Asked about a confidential settlement, a spokesperson says she is not able to discuss the terms and will not try to characterise them either way.",
    },
    trap: null,
    explanation: {
      en: "Refusing to answer is not deception, and saying plainly that you are refusing leaves the questioner correctly informed that they have not been told. The failure mode would have been a true remark shaped to sound like a denial.",
    },
  },
  {
    id: "ok-asked-again-narrowly",
    scenario: {
      en: "Told that a supplier meets all current standards, a buyer replies that she is asking something narrower, namely whether any batch has been rejected in the past two years, and waits.",
    },
    trap: null,
    explanation: {
      en: "Repeating the question in a narrowed form is the defence against paltering, because a true but unresponsive answer cannot be given twice without becoming visible. She has not accused anybody of anything and has made the evasion impossible to repeat.",
    },
  },
  {
    id: "ok-volunteered-the-bad-number",
    scenario: {
      en: "Presenting a strong quarter for sign-ups, a chief executive puts the departure figure on the same slide and notes that the customer base shrank overall.",
    },
    trap: null,
    explanation: {
      en: "The favourable number is real and is being reported alongside the measure that qualifies it, so the audience can form the impression the full picture supports. Selecting a true measure is only paltering when the selection is what creates the impression.",
    },
  },
  // ---- The third-person effect ----
  {
    id: "tp-ads-dont-work-on-me",
    scenario: {
      en: "A marketing director explains that advertising is enormously effective, which is why the budget is what it is, and adds that personally she has never bought anything because of an advertisement.",
    },
    trap: "third-person-effect",
    explanation: {
      en: "She is running two theories of persuasion at once, one for the market and one for herself, and only the first has evidence behind it. Being persuaded feels from the inside like being convinced, so the absence of a memory of being moved is not evidence that nothing moved her.",
    },
  },
  {
    id: "tp-ban-it-for-them",
    scenario: {
      en: "A council votes to restrict a category of material on the grounds that it is harmful to viewers. Every councillor has seen the material in order to vote, and none reports being harmed.",
    },
    trap: "third-person-effect",
    explanation: {
      en: "The vote assumes an effect that none of the voters can detect in themselves, which is the standard structure of the argument for restricting what other people may see. If the harm were visible from the inside, someone in the room would have reported it.",
    },
  },
  {
    id: "tp-my-feed-is-fine",
    scenario: {
      en: "Asked whether social media recommendation systems shape what people believe, a user says they clearly radicalise a lot of people, and that his own feed has simply got better at showing him things he was already interested in.",
    },
    trap: "third-person-effect",
    explanation: {
      en: "The same mechanism is described as radicalisation when it happens to others and as good recommendations when it happens to him. He has access to his own reasons for finding things interesting and only to other people's changed opinions, which makes influence look like something that occurs elsewhere.",
    },
  },
  {
    id: "tp-propaganda-for-others",
    scenario: {
      en: "A researcher argues that state broadcasting is dangerously effective on its domestic audience, and watches several hours of it a week to keep track of what is being said, judging that it has no effect on her.",
    },
    trap: "third-person-effect",
    explanation: {
      en: "Watching in order to study it is not a mechanism of immunity, and nothing in her account distinguishes her from the audience she is worried about except that she can see her own reasoning. That is exactly the asymmetry the effect describes.",
    },
  },
  {
    id: "tp-warning-labels",
    scenario: {
      en: "A survey finds strong majority support for warning labels on a kind of content, and also finds that respondents overwhelmingly report the content has no effect on their own judgement.",
    },
    trap: "third-person-effect",
    explanation: {
      en: "A majority believes both that the content is harmful and that it is harmless to them, which cannot be true of everyone at once, since the majority is the public. The gap between the two answers is the finding, not an inconsistency to be explained away.",
    },
  },
  {
    id: "tp-jury-cannot-be-trusted",
    scenario: {
      en: "A judge excludes prejudicial material from a trial because jurors could not put it out of their minds, having read it himself in chambers and formed the view that it would not sway him.",
    },
    trap: "third-person-effect",
    explanation: {
      en: "The exclusion may well be right, but the reasoning behind it is asymmetric: the same material is assumed to work on twelve people and not on the thirteenth who has read it. Nothing in the judge's training makes the mechanism stop.",
    },
  },
  {
    id: "tp-misinformation-training",
    scenario: {
      en: "A team designs a media literacy course after finding that most of the public shares false stories. Nobody on the team takes the course, on the grounds that they built it.",
    },
    trap: "third-person-effect",
    explanation: {
      en: "Knowing how a bias works is not the same as being exempt from it, and this one is documented to survive knowing about it. Designing the intervention is a reason to be well informed about the mechanism, not a reason to think it stops at you.",
    },
  },
  {
    id: "tp-polling-effect",
    scenario: {
      en: "A campaign avoids publishing an unfavourable poll on the grounds that voters who see it will be discouraged from turning out. The staff have all seen it and are working harder.",
    },
    trap: "third-person-effect",
    explanation: {
      en: "The prediction about voters is not derived from anything observed; it is derived from an assumption that information moves other people in one direction. The one group whose reaction they can actually observe went the other way.",
    },
  },
  {
    id: "tp-parenting-controls",
    scenario: {
      en: "A parents' group campaigns for age restrictions on a genre, arguing that it desensitises children. Asked about their own childhoods, most say they consumed similar material and turned out fine.",
    },
    trap: "third-person-effect",
    explanation: {
      en: "The same exposure is treated as harmless when it is their own history and harmful when it is somebody else's children. Their own case is the one piece of direct evidence they have, and it points the other way from the campaign.",
    },
  },
  {
    id: "tp-training-video",
    scenario: {
      en: "A compliance officer requires staff to watch a video on manipulative sales tactics because staff are vulnerable to them, and skips it himself, saying he already knows the tactics.",
    },
    trap: "third-person-effect",
    explanation: {
      en: "Recognising a tactic in the abstract is not the same as being unaffected by it in the moment, and that is precisely the gap the training is supposed to close. He has exempted the one person whose susceptibility he cannot observe from the outside.",
    },
  },
  {
    id: "ok-checked-a-specific-purchase",
    scenario: {
      en: "Wondering whether advertising works on her, a shopper goes through her last month of purchases and finds two she first heard of in an advertisement and would not otherwise have considered.",
    },
    trap: null,
    explanation: {
      en: "She replaced an unanswerable question about the sort of person she is with a specific one that has a checkable answer. That is the defence, and here it produced an answer she did not expect rather than confirming what she assumed.",
    },
  },
  {
    id: "ok-applied-it-to-himself",
    scenario: {
      en: "Reading that a broadcaster's coverage shifts its audience's views, an editor asks what he has been reading daily for a decade and whether he would accept the same explanation of his own opinions.",
    },
    trap: null,
    explanation: {
      en: "Turning the explanation around and checking whether he would accept it about himself is exactly the test, and he applied it before reaching a conclusion rather than after being challenged.",
    },
  },
  {
    id: "ok-restriction-argued-on-evidence",
    scenario: {
      en: "A regulator restricts a marketing practice citing a trial in which exposed households bought measurably more, and does not claim anything about who is susceptible.",
    },
    trap: null,
    explanation: {
      en: "The case rests on a measured effect rather than on an assumption about other people's weakness, so the third-person structure never enters it. Restricting things is not the error; assuming an effect you cannot detect in yourself is.",
    },
  },
  {
    id: "ok-included-herself-in-the-sample",
    scenario: {
      en: "Presenting a finding that a persuasion technique works on most people, a researcher notes that she was run through the same procedure by a colleague and moved about as much as her participants did.",
    },
    trap: null,
    explanation: {
      en: "She has treated herself as a member of the population the finding is about, which is what the evidence supports, rather than as an observer standing outside it. Nothing here needs explaining away.",
    },
  },
  // ---- Quoting out of context, filed under paltering ----
  // Backlog entry 21 could not find a study that counts anything, and the deck
  // does not ship a puzzle without one. But the technique is a species of
  // paltering rather than a separate skill: every quoted word is genuine and
  // the impression is false, which is the paltering test exactly. What differs
  // is only whose true statements are being selected, and the defence is the
  // same one the paltering lesson gives, namely go and look at what was
  // actually asked and answered.
  {
    id: "qm-clipped-conditional",
    scenario: {
      en: "A scientist writes that the model predicts severe effects if emissions continue unchecked and that current policy makes that path unlikely. A campaign quotes the first half exactly and stops.",
    },
    trap: "paltering",
    explanation: {
      en: "The quotation is verbatim and the conditional it depended on has been cut off, which turns a claim about one scenario into a claim about the future. Whenever a quote begins mid-sentence or ends before a comma would naturally fall, the missing clause is the thing to go and find.",
    },
  },
  {
    id: "qm-attributed-the-objection",
    scenario: {
      en: "A columnist quotes a philosopher as saying that morality is merely a convenient fiction. In the book, that sentence introduces a position the philosopher spends the next chapter refuting.",
    },
    trap: "paltering",
    explanation: {
      en: "The words are on the page in that order, and they are the view being argued against rather than the view being argued for. Setting out an opponent's position clearly is what careful writing looks like, which is exactly what makes it quotable against the author.",
    },
  },
  {
    id: "qm-ellipsis-doing-work",
    scenario: {
      en: "A press release quotes a review as calling the show a triumph of staging. The full sentence read that it would have been a triumph of staging in the hands of a better cast.",
    },
    trap: "paltering",
    explanation: {
      en: "Nothing has been added and the meaning has been reversed, which is the signature of the technique. An ellipsis or a tight fragment in a favourable quote is worth the ten seconds it takes to find the original sentence.",
    },
  },
  {
    id: "qm-answer-to-another-question",
    scenario: {
      en: "An interview clip shows an official saying that of course the department was aware. In the recording, the question was whether the department was aware of the weather forecast, not of the safety report.",
    },
    trap: "paltering",
    explanation: {
      en: "The answer is genuine and belongs to a different question, so the deception is carried entirely by what was cut. A clip that opens on an answer rather than a question should be treated as incomplete until the question is found.",
    },
  },
  {
    id: "qm-hostile-summary-quoted-back",
    scenario: {
      en: "A minute records a manager saying the plan is unworkable as described. She was reading back a colleague's summary in order to say that the summary was wrong.",
    },
    trap: "paltering",
    explanation: {
      en: "Repeating something in order to correct it puts the words in your mouth in the record, and the record does not mark the difference. This is why the defence is to read the surrounding turns rather than the sentence.",
    },
  },
  {
    id: "qm-selective-sample-of-quotes",
    scenario: {
      en: "A report on a consultation quotes eleven respondents opposing a proposal and none supporting it. All eleven quotes are accurate, and support ran at about two thirds.",
    },
    trap: "paltering",
    explanation: {
      en: "Each quotation is true and the selection is the lie, which is the same move as choosing the one favourable measure from a set only the speaker can see. Ask what proportion the quoted voices represent, because a set of quotations is a sample and should be treated as one.",
    },
  },
  {
    id: "ok-quoted-with-the-condition",
    scenario: {
      en: "A journalist quotes a researcher's striking sentence and includes the clause that follows it, in which the researcher says the result holds only for the age group studied.",
    },
    trap: null,
    explanation: {
      en: "The quotation carries the qualification that came with it, so the reader ends up with the claim the researcher actually made. Quoting is not the problem; quoting the half that survives without its condition is.",
    },
  },
  {
    id: "ok-checked-the-transcript",
    scenario: {
      en: "Sent a damaging fifteen second clip of a rival, a campaign manager finds the full recording, sees that the line was a summary of the opposing view, and does not use it.",
    },
    trap: null,
    explanation: {
      en: "Going to the source before using the clip is the whole defence against this, and it is cheap when the original is public. Declining to use material that would have worked is what the check is for.",
    },
  },
  // ---- The innuendo effect ----
  {
    id: "in-headline-question",
    scenario: {
      en: "A front page asks whether a charity's director diverted funds. The article beneath reports that an audit found no irregularities and that nobody has alleged any.",
    },
    trap: "innuendo-effect",
    explanation: {
      en: "The headline makes no claim, so there is nothing in it to correct and no retraction anybody could demand, and it still puts the accusation in front of every reader. That unanswerability is the point of the question mark rather than a side effect of it.",
    },
  },
  {
    id: "in-im-not-saying",
    scenario: {
      en: "During a meeting a manager says he is not suggesting anyone tampered with the figures, and that it is interesting how the discrepancy only ever appears on one person's shifts.",
    },
    trap: "innuendo-effect",
    explanation: {
      en: "The disclaimer is what makes the insinuation sayable, because it leaves nothing on the record that could be shown false or apologised for. Convert it into the assertion it invites, namely that this person tampered with the figures, and ask what evidence was offered for that.",
    },
  },
  {
    id: "in-cross-examination",
    scenario: {
      en: "A barrister asks a witness whether he has ever been treated for a drinking problem. The objection is sustained and the jury is told to disregard the question, which the witness never answered.",
    },
    trap: "innuendo-effect",
    explanation: {
      en: "Nothing was testified and nothing was established, and the jury now holds a possibility it did not hold before. This is why the technique survives procedural rules: the sanction lands on a question that has already done its work.",
    },
  },
  {
    id: "in-just-raising-it",
    scenario: {
      en: "A commentator says she has no idea whether the resignation was connected to the investigation, that she is only raising the question, and that viewers can draw their own conclusions.",
    },
    trap: "innuendo-effect",
    explanation: {
      en: "Inviting the audience to draw a conclusion is how the conclusion gets drawn without anybody being on the hook for asserting it. Asking what would settle the question usually reveals that no evidence was ever on the table, which is why it was put as a question.",
    },
  },
  {
    id: "in-questions-remain",
    scenario: {
      en: "A campaign leaflet says serious questions remain about a candidate's business dealings, and lists three questions. All three were answered in a published inquiry two years earlier.",
    },
    trap: "innuendo-effect",
    explanation: {
      en: "Questions remain is a claim about the state of somebody's knowledge and reads as a claim about the state of the world. Once you ask whether the questions have in fact been answered, the form collapses, and here they had been.",
    },
  },
  {
    id: "in-poll-the-suspicion",
    scenario: {
      en: "A broadcaster runs a viewer poll asking whether people think a public figure has something to hide, and reports the result as a finding about public concern.",
    },
    trap: "innuendo-effect",
    explanation: {
      en: "The poll manufactures the concern it then reports, because asking the question is what puts the possibility into viewers' heads. The number is real and it measures the effect of having asked rather than anything about the person.",
    },
  },
  {
    id: "in-what-are-they-hiding",
    scenario: {
      en: "After a company declines to comment on a confidential settlement, a rival's briefing note asks what they are so keen to keep quiet, and offers nothing further.",
    },
    trap: "innuendo-effect",
    explanation: {
      en: "Confidentiality has been converted into evidence of wrongdoing purely by being asked about, and the company cannot answer without breaching the thing that made it confidential. A question whose target is barred from answering it is the strongest form of this, not the weakest.",
    },
  },
  {
    id: "in-social-post-ellipsis",
    scenario: {
      en: "A widely shared post reads: interesting that this study was funded by the industry it exonerates. Makes you wonder. The study's methods and data are public and nobody has challenged them.",
    },
    trap: "innuendo-effect",
    explanation: {
      en: "Makes you wonder does the work of an accusation while committing to nothing, and the funding fact is true and irrelevant to whether the methods hold. Funding is a reason to look harder at the work, not a substitute for looking at it.",
    },
  },
  {
    id: "in-reference-hint",
    scenario: {
      en: "Asked for a reference, a former manager writes that the candidate was never the subject of a formal complaint during her time there. There had been no complaints of any kind, formal or otherwise.",
    },
    trap: "innuendo-effect",
    explanation: {
      en: "Every word is true and the sentence is built to imply a category of informal complaints that never existed. The tell is a denial narrower than the question, since specifying formal invites the reader to ask about the rest.",
    },
  },
  {
    id: "in-title-question-paper",
    scenario: {
      en: "A magazine article is titled with a question asking whether a common food additive causes a disease. The body reports that studies have consistently found no association.",
    },
    trap: "innuendo-effect",
    explanation: {
      en: "Most readers meet only the title, and the title raises a possibility that the article itself closes. Whether the piece is accurate is a separate question from what the headline leaves behind in people who read no further.",
    },
  },
  {
    id: "ok-asked-and-answered-it",
    scenario: {
      en: "An investigation opens by asking whether a supplier overcharged, then reports the invoices, the comparison prices, and the conclusion that it did not.",
    },
    trap: null,
    explanation: {
      en: "The question was posed and then settled with evidence in the same piece, which is what an inquiry looks like. The failure mode is posing it and leaving it open when there was never anything to settle it with.",
    },
  },
  {
    id: "ok-stated-what-was-known",
    scenario: {
      en: "An editor rejects a headline asking whether a minister misled parliament, and runs one saying that the minister's account differs from the department's, which is what the documents show.",
    },
    trap: null,
    explanation: {
      en: "The published version asserts something specific that can be checked and, if wrong, corrected. Trading an unanswerable question for a falsifiable claim is exactly the move the lesson asks for, and it costs the story nothing here.",
    },
  },
  // ---- Confirmation bias ----
  {
    id: "cb-admin-two-factor",
    scenario: {
      en: "Told to verify that every administrator account has two-factor authentication on, an auditor exports the list of accounts with two-factor on and confirms that they are administrators.",
    },
    trap: "confirmation-bias",
    explanation: {
      en: "That list cannot break the rule no matter what it says, because the rule allows non-administrators to have two-factor as well. The check that could break it is the list of administrators, looking for one without it, and that is the list nobody pulled.",
    },
  },
  {
    id: "cb-supplier-always-late",
    scenario: {
      en: "Convinced that one supplier is always late, a buyer pulls up every late delivery from the past year and finds that a third of them came from that supplier.",
    },
    trap: "confirmation-bias",
    explanation: {
      en: "Late deliveries were selected first, so the number says something about who is late rather than about whether this supplier is. The claim is broken by that supplier's deliveries arriving on time, so the list to pull is that supplier's deliveries.",
    },
  },
  {
    id: "cb-eleven-countries",
    scenario: {
      en: "An analyst arguing that a tax reform drives growth searches the database for countries that adopted it and then grew, finds eleven, and puts the eleven in the report.",
    },
    trap: "confirmation-bias",
    explanation: {
      en: "The search was written so that only agreeing cases could come back, which guarantees a result whether or not the reform does anything. The adopters that did not grow, and the growth among countries that never adopted it, are the two groups that could have shown the claim was wrong.",
    },
  },
  {
    id: "cb-test-that-confirms",
    scenario: {
      en: "A clinician suspecting one particular diagnosis orders the scan that would look abnormal if that condition is present, and does not order the blood test whose normal result would rule it out.",
    },
    trap: "confirmation-bias",
    explanation: {
      en: "Both tests were available and only the agreeing one was ordered, so a hypothesis that is wrong can still survive the workup. Deciding what to order is exactly the moment the choice between confirming and falsifying evidence gets made.",
    },
  },
  {
    id: "cb-lucky-socks",
    scenario: {
      en: "A player says the socks work, and can list six matches won while wearing them. He has never counted the matches won without them, or the ones lost while wearing them.",
    },
    trap: "confirmation-bias",
    explanation: {
      en: "Six agreeing cases are compatible with the socks doing nothing at all, since the same six exist whatever the truth is. The two counts he has never taken are the only ones that could have told him anything.",
    },
  },
  {
    id: "cb-dairy-diary",
    scenario: {
      en: "Suspecting that dairy gives her headaches, someone notes each headache and checks back over what she ate. Most headache days had dairy in them, so she is now sure.",
    },
    trap: "confirmation-bias",
    explanation: {
      en: "Starting from the headaches can only ever fill in one cell of the four, and if she eats dairy most days that cell fills up whether or not dairy matters. The days with dairy and no headache are what would break it, and they were never counted.",
    },
  },
  {
    id: "cb-interview-questions",
    scenario: {
      en: "A manager who has decided a candidate is disorganised spends the interview asking for examples of missed deadlines and dropped handovers, and gets two.",
    },
    trap: "confirmation-bias",
    explanation: {
      en: "Almost anyone can produce two such examples on request, so the answers do not distinguish a disorganised candidate from an organised one. Asking what she shipped on time would have given the belief a chance to fail, which is what testing it means.",
    },
  },
  {
    id: "cb-competitive-programming",
    scenario: {
      en: "A recruiter notices that the four strongest engineers on the team all did competitive programming at university, and makes it a screening criterion.",
    },
    trap: "confirmation-bias",
    explanation: {
      en: "The strongest engineers were picked first, so their shared background was going to look meaningful whatever it turned out to be. The hires who did competitive programming and struggled are the ones who could have shown the criterion is worthless, and they were not looked at.",
    },
  },
  {
    id: "cb-horoscope-morning",
    scenario: {
      en: "Having read in the morning that today brings an unexpected message, someone spends the day noticing messages and counts three by the evening.",
    },
    trap: "confirmation-bias",
    explanation: {
      en: "The forecast set the search running and the day supplied the matches, as almost any day would. Nothing was ever going to count as the forecast failing, and a claim that cannot fail has not been tested.",
    },
  },
  {
    id: "cb-deploy-caused-it",
    scenario: {
      en: "After an outage, a team pulls the four occasions where a deploy was followed by an incident and concludes that deploying at midday is the problem. They do not count the midday deploys that were followed by nothing.",
    },
    trap: "confirmation-bias",
    explanation: {
      en: "Four agreeing cases would be there even if midday deploys were perfectly safe, provided the team deploys at midday often enough. The quiet deploys are the evidence that could have settled it, and they are the ones nobody goes looking for.",
    },
  },
  {
    id: "ok-cb-named-the-kill-number",
    scenario: {
      en: "Before running the pilot, a product team writes down that fewer than forty weekly returning users would mean the feature does not work. It comes in at thirty-one and they drop it.",
    },
    trap: null,
    explanation: {
      en: "Naming in advance what would count as being wrong, and then honouring it, is the entire defence. The number was fixed before the result was known, so it could not be reinterpreted once the result arrived.",
    },
  },
  {
    id: "ok-cb-ordered-the-rule-out",
    scenario: {
      en: "A clinician who thinks a clot is unlikely orders the test whose negative result rules it out, rather than the one that would only look abnormal if a clot were there.",
    },
    trap: null,
    explanation: {
      en: "The test was chosen for what a negative result would settle, which is the case that carries information. Selecting evidence by what it could exclude rather than what it could support is the move the lesson asks for.",
    },
  },
  {
    id: "ok-cb-pulled-both-lists",
    scenario: {
      en: "An analyst checking the same tax claim pulls every country that adopted the reform and every comparable country that did not, and reports growth in both.",
    },
    trap: null,
    explanation: {
      en: "Both lists were fixed by a rule set before the outcomes were looked at, so the disagreeing cases had to appear if they existed. That is the difference between a search and a demonstration.",
    },
  },
  {
    id: "ok-cb-logged-every-day",
    scenario: {
      en: "Told that noting only headache days would not settle it, someone logs dairy and headaches every day for six weeks, including the uneventful ones.",
    },
    trap: null,
    explanation: {
      en: "Logging every day fills all four combinations, including dairy without a headache, which is the one that can break the belief. Recording the boring days is what makes the interesting ones mean anything.",
    },
  },
  // ---- Threshold bunching ----
  {
    id: "tb-exam-pass-mark",
    scenario: {
      en: "A school reports that 62 per cent of its pupils reached the pass grade this year. The mark distribution has a pronounced spike in the two marks immediately above the boundary and a dip immediately below it.",
    },
    trap: "threshold-bunching",
    explanation: {
      en: "Marks do not naturally cluster at a boundary, so the spike is a record of effort aimed at the line, whether by pupils, markers or moderators. The pass rate is partly a measure of how much the boundary mattered rather than of what pupils knew.",
    },
  },
  {
    id: "tb-ambulance-eight-minutes",
    scenario: {
      en: "An ambulance service must reach urgent calls within eight minutes. Its published figures show far more arrivals logged at seven minutes and fifty-something seconds than at eight minutes and a few seconds.",
    },
    trap: "threshold-bunching",
    explanation: {
      en: "A cliff at the exact target is the signature of the target itself, not of how quickly ambulances travel. Whether it comes from harder driving, different dispatching or when the clock is stopped, the compliance figure now describes the line as much as the service.",
    },
  },
  {
    id: "tb-quarterly-sales",
    scenario: {
      en: "A sales team's quota is one million in the quarter. Over five years the distribution of quarter-end totals has a heavy pile between one million and one and a half million, and almost nothing between eight hundred thousand and one million.",
    },
    trap: "threshold-bunching",
    explanation: {
      en: "Hitting just under a quota is nearly as common as hitting just over it, in any process the quota does not touch. The missing bin means deals were being pulled forward or pushed back across the line, so quarter totals no longer measure quarterly demand.",
    },
  },
  {
    id: "tb-p-value-cliff",
    scenario: {
      en: "A survey of published results finds a marked excess of p values just below 0.05 and a shortage just above it, across thousands of papers in a field.",
    },
    trap: "threshold-bunching",
    explanation: {
      en: "Nothing in nature distinguishes 0.049 from 0.051, so a step at that point is a fact about publishing rather than about the phenomena studied. The proportion of significant findings in the literature is partly a measure of the threshold's power.",
    },
  },
  {
    id: "tb-tax-bracket",
    scenario: {
      en: "Reported self-employment income shows a sharp pile of taxpayers reporting just below the point where a higher rate starts, and a thinning immediately above it.",
    },
    trap: "threshold-bunching",
    explanation: {
      en: "Income is not naturally lumpy at a number the tax code invented. The pile is people adjusting hours, timing or what they declare, so the count below the line measures the line's bite rather than what people earned.",
    },
  },
  {
    id: "tb-four-hour-target",
    scenario: {
      en: "A hospital reports that 95.3 per cent of emergency patients were dealt with inside the four-hour target. A breakdown by ten-minute interval shows a large spike in the final ten minutes before four hours.",
    },
    trap: "threshold-bunching",
    explanation: {
      en: "Two hospitals with the same headline figure can have completely different profiles behind it, and the spike says decisions were being made against the clock. The compliance percentage on its own cannot distinguish them.",
    },
  },
  {
    id: "tb-warranty-mileage",
    scenario: {
      en: "A manufacturer notes that warranty claims per thousand cars fall sharply once vehicles pass sixty thousand miles, the point at which the warranty expires.",
    },
    trap: "threshold-bunching",
    explanation: {
      en: "Cars do not become more reliable at the moment cover ends. What changes is whether a fault gets reported as a claim, so the claim rate past the line measures reporting rather than reliability.",
    },
  },
  {
    id: "tb-minimum-order",
    scenario: {
      en: "An online shop offers free delivery over fifty pounds. Its basket-value chart has a tall column between fifty and fifty-five pounds and a shallow trough between forty-five and fifty.",
    },
    trap: "threshold-bunching",
    explanation: {
      en: "The average basket value has gone up, but the shape shows why: customers added an item to clear the line. Reading the rise as growing appetite would credit demand for something the delivery rule did.",
    },
  },
  {
    id: "tb-hospital-readmission",
    scenario: {
      en: "A payer penalises readmissions within thirty days of discharge. A hospital's readmission counts by day show a dip on days twenty-eight and twenty-nine and a jump on day thirty-one.",
    },
    trap: "threshold-bunching",
    explanation: {
      en: "Illness does not know the counting window, so the notch at the boundary reflects decisions about when to readmit. The thirty-day rate has become partly a measure of scheduling around the rule.",
    },
  },
  {
    id: "tb-grant-word-limit",
    scenario: {
      en: "Applications to a funder are capped at 2,000 words. The distribution of submitted lengths climbs steadily to a huge peak at 1,990 to 2,000 words and stops dead.",
    },
    trap: "threshold-bunching",
    explanation: {
      en: "The peak at the cap says applicants wrote to the limit rather than to the argument, so average length measures the rule, not how much anyone had to say. Any statistic taken at a boundary people can see and act on carries this.",
    },
  },
  {
    id: "ok-tb-payday-spike",
    scenario: {
      en: "A bank notices that current-account balances spike sharply on the same few days each month, then decline. Salaries in the country are overwhelmingly paid on those days.",
    },
    trap: null,
    explanation: {
      en: "There is a spike, but it is caused by the thing being measured rather than by a line anyone is aiming at. Money arriving on payday is the real process, not a distortion of a measurement.",
    },
  },
  {
    id: "ok-tb-no-cliff",
    scenario: {
      en: "An inspector checks whether a supplier is meeting a ninety-eight per cent on-time target by plotting deliveries against how early or late they arrived. The curve is smooth through the deadline with no step at it.",
    },
    trap: null,
    explanation: {
      en: "A smooth curve through the threshold is exactly what you check for and exactly what you want to find. Absence of a step is evidence the headline figure is describing performance rather than the target.",
    },
  },
  {
    id: "ok-tb-looked-at-shape",
    scenario: {
      en: "Told that a department's pass rate rose from 71 to 78 per cent, an auditor asks for the full mark distribution for both years before deciding whether anything improved.",
    },
    trap: null,
    explanation: {
      en: "Asking for the shape rather than the headline is the whole defence. A rise with the distribution shifting everywhere means something changed; a rise created entirely at the boundary means the boundary moved people, not the teaching.",
    },
  },
  {
    id: "ok-tb-round-number-report",
    scenario: {
      en: "A charity reports that it served just over ten thousand meals this year. The monthly counts are irregular and show no clustering near any round total.",
    },
    trap: null,
    explanation: {
      en: "A round number in a headline is not itself evidence of bunching; the question is whether the underlying counts pile up against a line. Here they do not, so the total is just a total that happens to look tidy.",
    },
  },
  // ---- Whataboutism ----
  {
    id: "wa-late-delivery",
    scenario: {
      en: "A supplier is told its last four deliveries arrived late. It replies that the buyer has twice paid its invoices after the due date.",
    },
    trap: "whataboutism",
    explanation: {
      en: "Both things can be true at once, and the buyer's late payments do not make the deliveries punctual. The reply changes the subject from what happened to who is entitled to raise it.",
    },
  },
  {
    id: "wa-audit-finding",
    scenario: {
      en: "Presented with an audit finding that its safety checks were skipped on eleven occasions, a department head asks why the auditors have never looked at the neighbouring department, which is worse.",
    },
    trap: "whataboutism",
    explanation: {
      en: "Whether the neighbours are worse is a question about audit priorities, not about the eleven occasions. Even if the complaint about scope is fair, it leaves the finding exactly where it was.",
    },
  },
  {
    id: "wa-smoker-doctor",
    scenario: {
      en: "A doctor tells a patient that smoking is harming his lungs. The patient points out that the doctor smokes.",
    },
    trap: "whataboutism",
    explanation: {
      en: "The evidence on smoking does not depend on the habits of the person describing it. A hypocrite can give correct advice, and this one is, which is what makes the reply feel like a point while settling nothing.",
    },
  },
  {
    id: "wa-your-record",
    scenario: {
      en: "Asked in an interview about a specific unmet commitment, an official responds by listing commitments the questioner's own organisation failed to meet.",
    },
    trap: "whataboutism",
    explanation: {
      en: "The question was about one commitment and what happened to it. Answering with somebody else's record is a way of appearing to engage while leaving the original question untouched.",
    },
  },
  {
    id: "wa-code-review",
    scenario: {
      en: "Told that a function is 400 lines long and needs splitting, an engineer replies that the reviewer wrote a 600-line function last year.",
    },
    trap: "whataboutism",
    explanation: {
      en: "The reviewer's old code has no bearing on whether this function should be split. If the standard is wrong, argue that; if the reviewer is inconsistent, that is a separate conversation to have separately.",
    },
  },
  {
    id: "wa-emissions",
    scenario: {
      en: "A company challenged over its emissions figures responds that its main competitor emits considerably more and nobody asks them about it.",
      },
    trap: "whataboutism",
    explanation: {
      en: "The competitor's figures do not change this company's figures. The reply is a claim about fairness of attention, which may even be true, and it answers nothing about the numbers that were raised.",
    },
  },
  {
    id: "wa-you-were-late-too",
    scenario: {
      en: "A manager raises that a team member missed two stand-ups this week. The reply is that the manager was absent from three last month.",
    },
    trap: "whataboutism",
    explanation: {
      en: "The manager's attendance is a real issue if anyone wants to raise it, and it is not this issue. The tell is that after the reply, the original question is still sitting there unanswered.",
    },
  },
  {
    id: "wa-country-comparison",
    scenario: {
      en: "Asked about a documented failure in its own prison system, a government spokesman lists worse documented failures in other countries' prisons.",
    },
    trap: "whataboutism",
    explanation: {
      en: "Comparisons can be informative about scale, but only if that was the question. Here the question was whether a specific failure occurred, and the answer is unaffected by conditions elsewhere.",
    },
  },
  {
    id: "wa-charity-overheads",
    scenario: {
      en: "A charity questioned about its administrative costs replies that its critics work for organisations with far higher overheads.",
    },
    trap: "whataboutism",
    explanation: {
      en: "The critics' employers have no bearing on this charity's accounts. Redirecting attention to the person raising the issue is what the move is for, and it works because it sounds like a rebuttal.",
    },
  },
  {
    id: "wa-past-vote",
    scenario: {
      en: "Someone argues a proposed rule is unworkable and explains why. The answer is that they supported an unworkable rule five years ago.",
    },
    trap: "whataboutism",
    explanation: {
      en: "The reasons given for this rule being unworkable are either sound or not, and their author's history does not touch them. Nobody has to have a clean record to make an argument that stands up.",
    },
  },
  {
    id: "ok-wa-witness-credibility",
    scenario: {
      en: "A witness testifies that she saw the defendant at the scene. The defence establishes that she has twice been convicted of giving false statements to police.",
    },
    trap: null,
    explanation: {
      en: "Here the question genuinely is whether to believe this person, so her record of truthfulness is directly relevant rather than a change of subject. Attacking the source is fair when the source is the evidence.",
    },
  },
  {
    id: "ok-wa-expert-vouching",
    scenario: {
      en: "An expert says her method is reliable and offers her own track record as the reason. A reviewer points out that two of her previous studies were retracted.",
    },
    trap: null,
    explanation: {
      en: "She rested the claim on her own reliability, so her reliability became the matter at issue. Answering the argument that was actually made is not a personal attack, even when it is about the person.",
    },
  },
  {
    id: "ok-wa-answered-then-raised",
    scenario: {
      en: "Challenged on a missed deadline, a supplier explains what went wrong and what has changed, and then separately asks to discuss the buyer's late payments at the next review.",
    },
    trap: null,
    explanation: {
      en: "The original question was answered before the second one was raised, and the second was flagged as a separate item. Raising a counter-issue is only a dodge when it arrives instead of an answer.",
    },
  },
  {
    id: "ok-wa-relevant-precedent",
    scenario: {
      en: "A regulator is told that a proposed penalty is disproportionate, and the objection cites three earlier cases with similar facts where much smaller penalties were imposed.",
    },
    trap: null,
    explanation: {
      en: "Consistency of treatment is the actual question when the complaint is about proportionality, so the comparison is the argument rather than a diversion from it. Other cases are relevant precisely because like cases are supposed to be treated alike.",
    },
  },
  // ---- The boomerang effect ----
  {
    id: "bo-net-two-points",
    scenario: {
      en: "A charity reports that its campaign moved public support for its cause up by two points, and treats this as a small but real win worth repeating.",
    },
    trap: "boomerang-effect",
    explanation: {
      en: "Two points net can be almost nobody moving, or it can be a large group won over and a nearly as large group driven off. Only the second is dangerous to repeat, and the net figure cannot tell them apart.",
    },
  },
  {
    id: "bo-strongest-version",
    scenario: {
      en: "Preparing to address an audience known to disagree, a speaker decides to lead with the most uncompromising version of the argument, on the grounds that a strong case is more convincing than a hedged one.",
    },
    trap: "boomerang-effect",
    explanation: {
      en: "Strength and distance are different things. A case pitched far outside what the audience will treat as arguable tends to be filed as unreasonable, and once it is filed there the listener has moved further away rather than staying put.",
    },
  },
  {
    id: "bo-no-change-stubborn",
    scenario: {
      en: "After a safety briefing, average attitudes among a crew are unchanged, and the manager concludes that the crew simply ignored it.",
    },
    trap: "boomerang-effect",
    explanation: {
      en: "An unchanged average is equally consistent with nobody listening and with half the crew being convinced while the other half hardened against it. Those call for opposite responses, and only counting movement in both directions distinguishes them.",
    },
  },
  {
    id: "bo-graphic-warning",
    scenario: {
      en: "A public health team finds that a deliberately shocking warning label produced no net change in intentions, and plans to make the next version more shocking still.",
    },
    trap: "boomerang-effect",
    explanation: {
      en: "If the null came from some people being moved and others reacting against it, then escalating will widen both effects rather than tip the balance. The direction to check first is whether anyone moved the wrong way.",
    },
  },
  {
    id: "bo-ab-test-flat",
    scenario: {
      en: "An A/B test of a blunter sign-up prompt shows conversion flat against the old wording, so the team ships the blunter one, reasoning that it costs nothing and reads more clearly.",
    },
    trap: "boomerang-effect",
    explanation: {
      en: "Flat overall can hide a segment converting more and another converting less. Shipping on a null assumes the effect is uniformly zero, which is the one thing the aggregate number does not establish.",
    },
  },
  {
    id: "bo-town-meeting",
    scenario: {
      en: "A developer presents the most ambitious version of a scheme at a first public meeting, expecting that opposition will negotiate it down to something reasonable from there.",
    },
    trap: "boomerang-effect",
    explanation: {
      en: "That plan assumes an opening position only sets a starting point and cannot itself move people. If the opening lands far enough outside what residents consider arguable, it can harden them, leaving less room to negotiate rather than more.",
    },
  },
  {
    id: "bo-average-unmoved",
    scenario: {
      en: "A polling firm reports that an attack advertisement left the targeted candidate's approval statistically unchanged, and concludes the advertisement had no effect.",
    },
    trap: "boomerang-effect",
    explanation: {
      en: "No net effect and no effect are different claims. An advertisement that repels one group and attracts another produces the same unchanged headline as one nobody noticed, and the two matter very differently to whoever paid for it.",
    },
  },
  {
    id: "bo-correction-hardening",
    scenario: {
      en: "A team measures whether a strongly worded correction changes belief in a false claim, records the average shift, and does not record how many individuals moved in each direction.",
    },
    trap: "boomerang-effect",
    explanation: {
      en: "The design cannot detect the thing most worth detecting. Recording only the mean makes an offsetting pair of effects look identical to no effect at all, which is the failure mode this measurement most needed to rule out.",
    },
  },
  {
    id: "bo-recruiting-pitch",
    scenario: {
      en: "A recruiter finds that an aggressively worded advertisement produced the same number of applications as the previous one and keeps it, since it did no harm.",
    },
    trap: "boomerang-effect",
    explanation: {
      en: "The same total can come from a different set of people, some newly attracted and others put off. Whether that is harmless depends entirely on which people left, and the headcount does not say.",
    },
  },
  {
    id: "bo-escalate-because-unmoved",
    scenario: {
      en: "Told that a group of sceptics did not shift after a first presentation, an advocate concludes they need a harder push and prepares a more forceful second one.",
    },
    trap: "boomerang-effect",
    explanation: {
      en: "The inference treats absence of movement as evidence that the message was too weak. It is at least as consistent with the message having been too far away, in which case a more forceful one moves them further off.",
    },
  },
  {
    id: "ok-bo-counted-both-ways",
    scenario: {
      en: "A team reports that its message moved 30 per cent of the audience towards the position and 27 per cent away from it, for a net of three, and says so in those terms.",
    },
    trap: null,
    explanation: {
      en: "Reporting both directions is exactly the fix. The reader can now see that a small net came from large offsetting movements, and can decide what to do about it rather than being told nothing much happened.",
    },
  },
  {
    id: "ok-bo-pitched-near",
    scenario: {
      en: "Aiming to shift a sceptical group, a campaigner tests a modest ask first and a stronger one later, on the grounds that a request just outside what people already accept is more likely to land than one far outside it.",
    },
    trap: null,
    explanation: {
      en: "That is the lesson applied rather than a case of it. Choosing a position by how far it sits from the audience, instead of by how strongly it is felt, is what the evidence on distance actually supports.",
    },
  },
  {
    id: "ok-bo-real-null",
    scenario: {
      en: "A trial of a leaflet finds no change in average attitude, and its per-person data show almost nobody moved in either direction.",
    },
    trap: null,
    explanation: {
      en: "Here the null really is a null, and it is known to be one because both directions were counted. The leaflet did nothing, which is a finding rather than an ambiguity.",
    },
  },
  {
    id: "ok-bo-strong-and-close",
    scenario: {
      en: "An expert gives a firmly worded warning to colleagues who already accept the underlying premise, and it shifts most of them further in that direction.",
    },
    trap: null,
    explanation: {
      en: "Forcefulness is not the problem; distance is. A strong message to an audience already inside the relevant range is the situation where pushing harder does move people further.",
    },
  },
  // ---- Prebunking ----
  {
    id: "pb-read-about-it",
    scenario: {
      en: "Having read a long article about anchoring, a buyer concludes that the seller opening at a high number can no longer affect her, and stops writing down her own valuation first.",
    },
    trap: "prebunking",
    explanation: {
      en: "Knowing the mechanism reduces the effect rather than removing it, so the reasonable estimate of how much it still moves her is somewhere well above zero. Dropping the external check because of what she has read is exactly the wrong response to having read it.",
    },
  },
  {
    id: "pb-training-then-nothing",
    scenario: {
      en: "A firm runs a one-hour session on cognitive bias for its analysts and, on the strength of it, retires the requirement that two people independently value each deal.",
    },
    trap: "prebunking",
    explanation: {
      en: "The training may well help, but the procedure it replaced worked whether or not anyone remembered the training. Swapping a structural check for an educational one trades something reliable for something partial.",
    },
  },
  {
    id: "pb-warned-jury",
    scenario: {
      en: "A judge warns jurors at the start of a trial that they may hear inadmissible material and must set it aside, and treats that warning as removing the need to consider a mistrial later.",
    },
    trap: "prebunking",
    explanation: {
      en: "A warning given in advance measurably reduces reliance on material later struck out, which is why it is worth giving. It does not reduce it to nothing, so it cannot carry the weight of a decision that assumes the material has no effect at all.",
    },
  },
  {
    id: "pb-media-literacy-claim",
    scenario: {
      en: "A campaign reports that its media-literacy course halved how often participants shared false headlines, and describes the participants as now inoculated against misinformation.",
    },
    trap: "prebunking",
    explanation: {
      en: "Halving is a genuinely large effect and worth reporting as one. Inoculated is a different claim, and the same data show the remaining half, which is what the word quietly denies.",
    },
  },
  {
    id: "pb-i-know-im-biased",
    scenario: {
      en: "Asked whether his own hiring decisions might be affected by the candidate's school, a manager answers that he is aware of that bias and therefore controls for it.",
    },
    trap: "prebunking",
    explanation: {
      en: "Awareness is the beginning of the fix, not the fix. The claim to control for it introspectively is precisely the claim that the evidence on forewarning does not support, and it displaces the structural remedies that would work.",
    },
  },
  {
    id: "pb-disclosure-solves-it",
    scenario: {
      en: "A journal decides that requiring authors to disclose funding at the top of each paper is sufficient, since readers now know to allow for it.",
    },
    trap: "prebunking",
    explanation: {
      en: "Telling readers in advance what to watch for reduces how much the funding colours their reading, and it does not neutralise it. Disclosure is a discount on the problem rather than a solution to it, which is an argument for keeping the other safeguards.",
    },
  },
  {
    id: "pb-forewarned-shopper",
    scenario: {
      en: "Before a negotiation, a team reminds itself that the other side will open with an extreme number, and on that basis decides it does not need to agree its walk-away point beforehand.",
    },
    trap: "prebunking",
    explanation: {
      en: "Predicting the move in advance helps and does not immunise. The walk-away point written down before the meeting is the thing that still works after the extreme number has been heard, which is why it is worth having.",
    },
  },
  {
    id: "pb-corrected-and-warned",
    scenario: {
      en: "A newsroom warns readers at the top of a developing story that early details often turn out wrong, then issues a correction two days later, and considers the record fully repaired.",
    },
    trap: "prebunking",
    explanation: {
      en: "Both steps are right and both are partial. The evidence is that a warning plus a correction still leaves people using the withdrawn detail, so treating the pair as a complete fix overstates what either can do.",
    },
  },
  {
    id: "pb-debiasing-course",
    scenario: {
      en: "After a debiasing workshop, a team stops recording the reasons for its forecasts, on the grounds that the participants can now catch their own errors as they make them.",
    },
    trap: "prebunking",
    explanation: {
      en: "The written record is what lets an error be caught by somebody who was not in the workshop, and later by the person who was. Replacing it with trained self-monitoring assumes the training does more than the evidence says it does.",
    },
  },
  {
    id: "pb-this-wont-work-on-me",
    scenario: {
      en: "Shown an advertisement and told plainly that it is engineered to associate the product with belonging, a viewer concludes that having seen through it means it has had no effect on him.",
    },
    trap: "prebunking",
    explanation: {
      en: "Seeing through something and being unaffected by it are different states, and the gap between them is the whole finding. The expectation to hold is a reduced effect, not an absent one.",
    },
  },
  {
    id: "ok-pb-warned-and-kept-the-check",
    scenario: {
      en: "A reviewer is told in advance that a manuscript comes from a well-known laboratory, notes that this is likely to soften her reading, and asks for a second reviewer who is not told.",
    },
    trap: null,
    explanation: {
      en: "This is prebunking used correctly. The warning is taken as reason to add an external check rather than as a substitute for one, which is what the evidence supports.",
    },
  },
  {
    id: "ok-pb-reported-both",
    scenario: {
      en: "A training programme reports that errors fell by about half and states plainly that the remaining half persisted despite everyone having been taught the material.",
    },
    trap: null,
    explanation: {
      en: "Reporting the reduction and the residue together is the honest form. It lets the reader see both that the training worked and that it did not finish the job.",
    },
  },
  {
    id: "ok-pb-specific-over-vague",
    scenario: {
      en: "Rather than telling staff to be sceptical of supplier claims, a manager walks through the exact pattern a particular supplier uses and what it will look like next quarter.",
    },
    trap: null,
    explanation: {
      en: "Specific beats vague, and that is what the evidence shows: a detailed account of the mechanism does considerably more than a general instruction to take care. This is the lesson applied.",
    },
  },
  {
    id: "ok-pb-structural-fix",
    scenario: {
      en: "A hospital finds that reminding clinicians about anchoring on the first diagnosis helps only somewhat, and adds a checklist step requiring one alternative to be recorded before discharge.",
    },
    trap: null,
    explanation: {
      en: "Noticing that the educational fix is partial and adding a structural one is the right response to a partial result. The check works whether or not the reminder was remembered that day.",
    },
  },
  // ---- Compressed sense of magnitude ----
  {
    id: "mc-ranking-to-budget",
    scenario: {
      en: "A safety committee lists five hazards in order of how many injuries each causes, checks the order against the injury records and finds it exactly right, then divides next year's prevention budget equally between the five.",
    },
    trap: "magnitude-compression",
    explanation: {
      en: "Confirming the order tells you nothing about the distances between the entries. If the first hazard causes forty times as many injuries as the fifth, an equal split is nowhere near proportionate, and no amount of checking the ranking would ever have shown that.",
    },
  },
  {
    id: "mc-quiz-order",
    scenario: {
      en: "A geography test is marked purely on whether pupils put a list of countries into the correct size order. The class does well, and the report concludes that they have a sound grasp of the relative sizes of countries.",
    },
    trap: "magnitude-compression",
    explanation: {
      en: "Relative size is a set of ratios, and the test measured a sequence. A pupil who thinks the largest country on the list is three times the smallest can score full marks alongside one who thinks it is three hundred times.",
    },
  },
  {
    id: "mc-felt-about-twice",
    scenario: {
      en: "Two pieces of work are ranked by how long they will take, and the ranking turns out to be right. The schedule then gives the second twice the time of the first, because that is how much larger it felt.",
    },
    trap: "magnitude-compression",
    explanation: {
      en: "The ranking was tested and the multiplier was not. Being right about which is longer offers no evidence at all for the factor, and a plan built on the felt ratio inherits none of the confidence the ranking earned.",
    },
  },
  {
    id: "mc-flat-correction",
    scenario: {
      en: "An analyst notices that her team's estimates of small quantities come in high and their estimates of large ones come in low, and corrects for it by subtracting a fixed number of units from every small estimate and adding the same fixed number to every large one.",
    },
    trap: "magnitude-compression",
    explanation: {
      en: "The bias she has spotted is real, but it scales: the small estimates are out by a multiple, not by a quantity. A flat adjustment is far too small at the small end, where the estimate might be twenty times over, and does almost nothing useful at the large end.",
    },
  },
  {
    id: "mc-two-figures-one-line",
    scenario: {
      en: "A briefing note lists each of the department's commitments on one line with its cost beside it. One line reads four million and another reads one billion. The meeting allots each commitment the same discussion time and settles both in a single session.",
    },
    trap: "magnitude-compression",
    explanation: {
      en: "The two figures differ by a factor of two hundred and fifty, and the format hides it by making every line look like a comparable object. Attention allocated by list position rather than by size is attention allocated by the wrong variable.",
    },
  },
  {
    id: "mc-sketch-from-memory",
    scenario: {
      en: "Asked to sketch last year's spending by department from memory, a manager produces a chart with the departments in the correct order, then uses the heights in his sketch to argue that the largest department is running somewhat over budget.",
    },
    trap: "magnitude-compression",
    explanation: {
      en: "The order in the sketch came from memory and so did the heights, but only the order is likely to have survived the trip. Somewhat over budget is a statement about a height, and heights recalled without the figures beside them tend to be flattened at the top of the range.",
    },
  },
  {
    id: "mc-scope-equal-value",
    scenario: {
      en: "A fundraiser finds that an appeal describing a programme as reaching two thousand people and one describing it as reaching two hundred thousand bring in roughly the same total, and concludes that donors value the two programmes about equally.",
    },
    trap: "magnitude-compression",
    explanation: {
      en: "What the test showed is that the two descriptions produced the same response, which is a fact about how the numbers were read rather than about what donors value. A hundredfold difference that leaves giving unchanged is evidence the size did not register.",
    },
  },
  {
    id: "mc-knows-where-they-stand",
    scenario: {
      en: "A buyer can put four suppliers in order from cheapest to dearest and is confident she has it right. She decides there is no need to pull the actual quotes before choosing, since she already knows where each one stands.",
    },
    trap: "magnitude-compression",
    explanation: {
      en: "Knowing the order settles which is cheapest and nothing else. Whether the gap between the first and second is one per cent or one hundred is exactly the question a purchase turns on, and it is the question the ordering cannot answer.",
    },
  },
  {
    id: "mc-cities-accurate-picture",
    scenario: {
      en: "A study reports that respondents ordered ten cities by population almost perfectly, and the write-up says the public has an accurate picture of how these cities compare in size.",
    },
    trap: "magnitude-compression",
    explanation: {
      en: "How they compare in size is a claim about ratios; the study measured a sequence. Near-perfect ordering is compatible with respondents thinking the largest city is twice the smallest when it is fifty times, so the write-up is asserting something that was never tested.",
    },
  },
  {
    id: "mc-doubling-a-rare-risk",
    scenario: {
      en: "A committee is told that one procedure carries a risk of about one in fifty and another about one in fifty thousand. It records both as rare and treats the choice between them as turning on cost.",
    },
    trap: "magnitude-compression",
    explanation: {
      en: "Both fall under the same word and they differ by a factor of a thousand. Collapsing that range into one label is the compression happening in the vocabulary rather than in the head, and the decision then proceeds as though the difference had been considered.",
    },
  },
  {
    id: "mc-divides-and-is-surprised",
    scenario: {
      en: "Before comparing two budget lines, an officer converts both to the same units and divides one by the other. The answer is much larger than he expected, and he rewrites his recommendation around it.",
    },
    trap: null,
    explanation: {
      en: "This is the correct handling. He did not trust the felt size of the gap, he computed it, and he treated his own surprise as information about his intuition rather than as a reason to doubt the arithmetic.",
    },
  },
  {
    id: "mc-order-only-claim",
    scenario: {
      en: "A report states that respondents ranked the ten items in very nearly the right order, and says in the same paragraph that the study did not test whether they could judge how far apart the items were.",
    },
    trap: null,
    explanation: {
      en: "The claim is exactly the size of the evidence. Naming what the design cannot support, in the same breath as the finding, is what stops a ranking result being read as a result about magnitudes.",
    },
  },
  {
    id: "mc-measured-not-guessed",
    scenario: {
      en: "A team needs the relative sizes of eight quantities for a chart. Rather than working from what the analysts already know, it pulls the recorded figure for each one and sets the spacing from those.",
    },
    trap: null,
    explanation: {
      en: "Nothing here rests on anyone's feel for the sizes. The ordering and the spacing both come from the measurements, so the chart carries no more confidence about the gaps than the records themselves do.",
    },
  },
  {
    id: "mc-defers-the-split",
    scenario: {
      en: "Shown that a panel ranked five categories of loss in the right order, a manager declines to set the budget split until someone brings the actual totals, while accepting the ranking as sound.",
    },
    trap: null,
    explanation: {
      en: "He takes the ranking for what it is worth and no further. Accepting a result while refusing to extend it to a quantity it never measured is the whole of the discipline here.",
    },
  },
  // ---- Familiarity read as accuracy ----
  {
    id: "pd-house-style",
    scenario: {
      en: "A reviewer is shown two versions of the same figures. One follows the chart style the field has used for thirty years; the other is unfamiliar. She recommends the familiar one on the grounds that it is clearer, without comparing either against the underlying table.",
    },
    trap: "projection-distortion",
    explanation: {
      en: "Clearer here means easier for her to read, which is a fact about her practice rather than about the figures. Whether either version represents the table faithfully is a separate question and it was not asked of either one.",
    },
  },
  {
    id: "pd-new-index-rejected",
    scenario: {
      en: "A statistical agency publishes a revised index built to correct a known bias in the old one. Commentators note that the new series looks nothing like the series everyone is used to, and treat that as evidence the revision went wrong.",
    },
    trap: "projection-distortion",
    explanation: {
      en: "A correction that changed nothing would not have been worth making, so looking different is what a successful revision is supposed to do. The disagreement with the old series is the thing being explained, not evidence against the explanation.",
    },
  },
  {
    id: "pd-unfamiliar-scale",
    scenario: {
      en: "Shown a chart on a logarithmic scale, an audience objects that the growth looks much less dramatic than in the usual version and concludes that the presenter has played it down.",
    },
    trap: "projection-distortion",
    explanation: {
      en: "Which scale flatters the story is not the same question as which one represents it faithfully, and the audience answered the first while believing they had answered the second. Whether a log scale is right here depends on what the quantity does, not on which picture they have seen before.",
    },
  },
  {
    id: "pd-accent-credibility",
    scenario: {
      en: "A panel rates recorded explanations of the same result. Explanations delivered in the accent most of the panel share are rated as more likely to be factually correct.",
    },
    trap: "projection-distortion",
    explanation: {
      en: "Nothing about the delivery bears on whether the result is right, and the content was identical across recordings by construction. What the panel could assess quickly was familiarity, so that is what the ratings ended up measuring.",
    },
  },
  {
    id: "pd-legacy-format",
    scenario: {
      en: "An auditor finds that a firm's accounts follow the presentation used across its industry, and reports the presentation as evidence that the accounts are sound.",
    },
    trap: "projection-distortion",
    explanation: {
      en: "An industry-wide convention is evidence about the industry, not about this firm's numbers. If the convention itself obscures something, every firm following it looks equally reassuring and the auditor's check cannot see it.",
    },
  },
  {
    id: "pd-redrawn-boundaries",
    scenario: {
      en: "A geography textbook replaces its world map with an equal-area projection. Parents complain that the countries look the wrong shape and ask for the old map back on the grounds that it was more accurate.",
    },
    trap: "projection-distortion",
    explanation: {
      en: "The shapes did get worse; that is what an equal-area projection trades away. What it bought is that every country is now drawn in true proportion to its area. Calling the result less accurate treats one property as accuracy itself and ignores the one that improved.",
    },
  },
  {
    id: "pd-translation-fluency",
    scenario: {
      en: "Two translations of a technical document are compared. The one that reads more smoothly in the target language is chosen as the more faithful, without either being checked against the source.",
    },
    trap: "projection-distortion",
    explanation: {
      en: "Smoothness is assessable without the original and fidelity is not, so the comparison quietly substituted the question that could be answered for the question that was asked. A translation can read beautifully and say something the source does not.",
    },
  },
  {
    id: "pd-old-photo",
    scenario: {
      en: "Asked which of two colour renderings of a historical photograph is truer to the original scene, a group picks the one whose palette matches the film stock they associate with the period.",
    },
    trap: "projection-distortion",
    explanation: {
      en: "The palette they recognise is the palette of the film, which is itself a distortion of the scene it recorded. Matching a familiar rendering is a claim about the medium, and it is being read as a claim about the world in front of the camera.",
    },
  },
  {
    id: "pd-standard-questionnaire",
    scenario: {
      en: "A research team keeps a long-standing question wording because it is the standard in the field and switching would make their results incomparable with everyone else's, and describes the wording in their write-up as validated on that basis.",
    },
    trap: "projection-distortion",
    explanation: {
      en: "Comparability is a real and good reason to keep the wording, and it is not the same as validation. Every study in the field sharing a flawed wording produces a literature that agrees with itself, which is exactly what widespread use cannot distinguish from correctness.",
    },
  },
  {
    id: "pd-familiar-projection-web",
    scenario: {
      en: "A news team notices that the online mapping tool it uses stretches high latitudes, and reassures itself that the tool must be fine because it is what every major mapping service uses.",
    },
    trap: "projection-distortion",
    explanation: {
      en: "Every major service uses it because it keeps angles right at every zoom level, which is what panning and zooming a street map needs. That is a reason it suits their software and no reason at all that it suits a graphic comparing the size of countries.",
    },
  },
  {
    id: "pd-checks-the-property",
    scenario: {
      en: "Before choosing a projection for a graphic comparing the land area of countries, a designer looks up which projections preserve area exactly and picks from that list, accepting that the shapes will look unusual.",
    },
    trap: null,
    explanation: {
      en: "She asked what the map needed to keep exact, found the family that keeps it, and paid the known price. That the result looks unfamiliar is a consequence she has priced in rather than a signal she has misread.",
    },
  },
  {
    id: "pd-two-renderings-same-table",
    scenario: {
      en: "Given an unfamiliar chart that contradicts his expectations, an analyst goes back to the underlying table and recomputes two of the values by hand before deciding whether to trust the chart.",
    },
    trap: null,
    explanation: {
      en: "He treated his own surprise as a reason to check the source rather than as a verdict on the chart. Recomputing from the table answers the question that looking at the chart cannot.",
    },
  },
  {
    id: "pd-names-the-tradeoff",
    scenario: {
      en: "A cartographer explains that her map keeps angles exact and therefore cannot keep areas exact, states which property the reader should not rely on it for, and prints that note beside the map.",
    },
    trap: null,
    explanation: {
      en: "Every flat map gives something up, and naming what this one gives up is what lets a reader use it correctly. Declaring the trade-off is the opposite of the failure this trap is about.",
    },
  },
  {
    id: "pd-conventional-and-checked",
    scenario: {
      en: "A team keeps the conventional chart format after testing it against the raw data and confirming it represents the values faithfully, and records that the choice was made on those grounds rather than on convention.",
    },
    trap: null,
    explanation: {
      en: "Familiar and accurate are not opposites, and this format happens to be both. What makes the reasoning sound is that the accuracy was established separately rather than inferred from the familiarity.",
    },
  },
  // ---- When a measure becomes a target ----
  {
    id: "cl-call-answer-time",
    scenario: {
      en: "A support desk is told that 90 per cent of calls must be answered within 30 seconds, and bonuses follow the figure. A year later it reports 91 per cent and the manager presents this as proof that service has improved.",
    },
    trap: "campbells-law",
    explanation: {
      en: "The one thing a year of pressure guarantees is that the reported number went up. Whether service improved is a separate question, and answering a call at 29 seconds to hang up at 31 satisfies the measure without touching it.",
    },
  },
  {
    id: "cl-stable-under-pressure",
    scenario: {
      en: "A regulator notes that a hospital's key performance indicator has sat just above the required threshold every quarter for six years, and cites the consistency as evidence that the standard is being maintained comfortably.",
    },
    trap: "campbells-law",
    explanation: {
      en: "A number that never moves and never quite falls below a line it is judged against is behaving like something being managed rather than something being observed. Six years of just clearing the bar is the pattern that should prompt a look at the distribution, not the pattern that settles the question.",
    },
  },
  {
    id: "cl-school-pass-mark",
    scenario: {
      en: "A school system rewards the share of pupils reaching a grade C. Two schools report the same share, and the inspectorate treats them as equivalent for the purposes of ranking.",
    },
    trap: "campbells-law",
    explanation: {
      en: "One school may have lifted borderline pupils across the line while the rest were left alone, and the other may have taught everybody. The measure sees one cut through the distribution, so schools with very different results at the top and bottom arrive at the same figure.",
    },
  },
  {
    id: "cl-surgeon-mortality",
    scenario: {
      en: "Surgeons' individual death rates are published, and a hospital finds the following year that its published rates have fallen across the board. It reports the fall as an improvement in surgical technique.",
    },
    trap: "campbells-law",
    explanation: {
      en: "Declining to operate on the sickest patients would move the same number in the same direction without a single technique changing. The published figure cannot distinguish better surgery from a different set of patients, so it cannot on its own support the claim being made.",
    },
  },
  {
    id: "cl-ambulance-clock",
    scenario: {
      en: "An ambulance service must reach a set proportion of emergency calls within eight minutes. A review finds the target met and concludes that response times are under control across the service.",
    },
    trap: "campbells-law",
    explanation: {
      en: "Under control across the service is a claim about the whole distribution, and the target only reports one point on it. Calls that were never going to be reached in eight minutes are worth nothing to the measure, so the time they wait is exactly what the figure stops describing.",
    },
  },
  {
    id: "cl-bug-count",
    scenario: {
      en: "A software team is assessed on the number of open bug reports. The count falls sharply over two quarters, and the lead cites it in an argument that the codebase is now in good shape.",
    },
    trap: "campbells-law",
    explanation: {
      en: "Closing reports and fixing defects are different actions that move the same counter. Once the counter is the thing being judged, its fall stops being evidence about the codebase and becomes evidence about how reports are being handled.",
    },
  },
  {
    id: "cl-readmission-window",
    scenario: {
      en: "Hospitals are penalised for readmissions within thirty days of discharge. National readmissions inside the window fall, and the programme is judged a success on that basis.",
    },
    trap: "campbells-law",
    explanation: {
      en: "A patient held in observation, or readmitted on day thirty-two, does not appear in the measure and may be no better off. A fall inside a window that is itself the thing being rewarded is consistent with the intended improvement and with movement around the edge of the window, and the figure does not separate them.",
    },
  },
  {
    id: "cl-sales-quota-quarter",
    scenario: {
      en: "A sales team meets its quarterly quota every quarter for three years. Management concludes that demand is stable and plans capacity on that basis.",
    },
    trap: "campbells-law",
    explanation: {
      en: "Deals can be pulled forward or pushed back across a quarter boundary at no cost to anyone whose bonus depends on the quarter. The steadiness of the reported series is what you would expect from a smoothed indicator, so planning capacity from it means planning from the smoothing.",
    },
  },
  {
    id: "cl-university-ranking",
    scenario: {
      en: "A university rises twelve places in a ranking after focusing on the inputs the ranking weights most heavily. The vice-chancellor describes the rise as an improvement in the quality of education.",
    },
    trap: "campbells-law",
    explanation: {
      en: "Moving the components a ranking weights is precisely how a ranking is moved, and it is exactly what was done. The rise is strong evidence about attention paid to the formula, and no evidence at all about teaching, which the formula only ever stood in for.",
    },
  },
  {
    id: "cl-crime-recording",
    scenario: {
      en: "Police forces are set a target to reduce recorded offences in a category. Recorded offences in that category fall, and a report treats the fall as a fall in offending.",
    },
    trap: "campbells-law",
    explanation: {
      en: "Recorded offences and offences are different quantities, and the target is attached to the first. Any change in how incidents are classified at the point of recording moves it without anything happening on the street, which is why the two need separate evidence.",
    },
  },
  {
    id: "cl-holds-the-distribution",
    scenario: {
      en: "Before accepting that a waiting-time target is working, an analyst asks for the full distribution of waits rather than the share inside the limit, and finds the shape unchanged apart from a small shift at the limit itself.",
    },
    trap: null,
    explanation: {
      en: "Asking for the distribution behind the indicator is the right check, and she made it before drawing a conclusion rather than after. What she found is also reported honestly rather than as either a success or a scandal.",
    },
  },
  {
    id: "cl-unrewarded-measure",
    scenario: {
      en: "A team tracks a metric that nobody is assessed on, that carries no bonus and that is not published, and uses it to monitor whether a process is drifting.",
    },
    trap: null,
    explanation: {
      en: "The corrupting pressure this trap is about comes from the measure being used to judge people. An indicator nobody is rewarded for moving is the case where reading it as a description of the world is reasonable.",
    },
  },
  {
    id: "cl-second-unrewarded-check",
    scenario: {
      en: "A regulator keeps its published target and adds an unannounced audit of a random sample of cases, on the grounds that the target alone cannot show whether the underlying work has changed.",
    },
    trap: null,
    explanation: {
      en: "This is the structural response rather than the educational one. The audit measures the thing itself, is not the number anyone is paid to move, and answers the question the target cannot.",
    },
  },
  {
    id: "cl-declines-to-rank",
    scenario: {
      en: "Given two branches with identical scores on the company's single performance measure, a director declines to say which is better run and asks what each measure would fail to capture before commissioning anything further.",
    },
    trap: null,
    explanation: {
      en: "Identical scores on one indicator support identical scores on that indicator and nothing more. Refusing to convert a summary figure into a judgement about how somewhere is run, and asking what the figure omits, is the discipline this trap is about.",
    },
  },
  // ---- Polls that shape what they measure ----
  {
    id: "ps-lead-repeated",
    scenario: {
      en: "A broadcaster leads every bulletin for a month with the same finding that one side of a referendum is ahead. When the gap widens over that month, the editor cites the widening as proof the early polls were reading the public correctly.",
    },
    trap: "polls-shape-opinion",
    explanation: {
      en: "The later polls measured a public that had been told for a month which side was ahead. A gap that widens under repetition is what you would expect both from an accurate early reading and from the reporting having helped along the thing it reported, and the bulletins cannot tell those apart.",
    },
  },
  {
    id: "ps-office-show-of-hands",
    scenario: {
      en: "Before a team discussion, the chair announces that a quick straw poll found most people already favour the proposal, then asks for views around the table.",
    },
    trap: "polls-shape-opinion",
    explanation: {
      en: "The straw poll has become part of the discussion rather than a summary of it. Whatever the room says next is a response to having been told where the majority sits, so the chair can no longer read the round table as independent evidence of what people think.",
    },
  },
  {
    id: "ps-bandwagon-donations",
    scenario: {
      en: "A fundraising page displays a running total and a note that most visitors have already given. The organisers point to the rising total as evidence the cause is widely supported.",
    },
    trap: "polls-shape-opinion",
    explanation: {
      en: "The display of what others did is one of the things producing the total, so the total cannot be used as an independent measure of support. It measures support plus whatever the display added, and nothing on the page separates the two.",
    },
  },
  {
    id: "ps-review-count",
    scenario: {
      en: "A shop sorts products by average rating with the number of reviews shown. The top item pulls further ahead each month, and the buyer treats the growing gap as increasingly reliable evidence of quality.",
    },
    trap: "polls-shape-opinion",
    explanation: {
      en: "Being at the top brings more buyers, and buyers who chose because it was top are not an independent sample of opinion about it. The gap can widen from position alone, so more data here does not straightforwardly mean a better estimate.",
    },
  },
  {
    id: "ps-primary-viability",
    scenario: {
      en: "Coverage of a crowded selection contest focuses on which candidates are viable according to current surveys. Support for the front runner grows, and commentators describe the surveys as having been prescient.",
    },
    trap: "polls-shape-opinion",
    explanation: {
      en: "Telling people who can win changes who they are willing to back, so the surveys were an input to the outcome as well as a forecast of it. Prescience and influence look identical from the outside, and the coverage is not a neutral observer of the race it is reporting.",
    },
  },
  {
    id: "ps-consultation-running-tally",
    scenario: {
      en: "A public consultation publishes a live tally of responses for and against. Officials later report the final split as a measure of public opinion on the proposal.",
    },
    trap: "polls-shape-opinion",
    explanation: {
      en: "Everyone who responded after the first day could see which way the tally was going. The final split therefore measures opinion after exposure to the tally, which is not the quantity the report claims to be describing.",
    },
  },
  {
    id: "ps-norm-message",
    scenario: {
      en: "A campaign tells households that most of their neighbours have switched to a new scheme, then measures uptake in those households and reports the figure as the underlying level of interest in the scheme.",
    },
    trap: "polls-shape-opinion",
    explanation: {
      en: "The message was designed to raise uptake and probably did. The resulting figure is a measure of interest after a nudge, so describing it as the underlying level drops the nudge out of the description while keeping its effect in the number.",
    },
  },
  {
    id: "ps-panel-shown-earlier-answers",
    scenario: {
      en: "In the second round of an expert panel, each member is shown the distribution of first-round answers before revising. The tighter spread in round two is reported as growing expert consensus.",
    },
    trap: "polls-shape-opinion",
    explanation: {
      en: "Convergence is what showing people the distribution reliably produces, whether or not anyone learned anything. A narrower spread is evidence that the procedure worked as designed, and only weak evidence about the question the panel was convened to answer.",
    },
  },
  {
    id: "ps-market-odds",
    scenario: {
      en: "A newspaper reports betting odds on an outcome every day as an indicator of what informed people expect. The odds shorten steadily and the paper describes the expectation as having firmed up.",
    },
    trap: "polls-shape-opinion",
    explanation: {
      en: "Daily publication feeds back into the betting, so later odds partly reflect earlier reporting of odds. That does not make them useless, but firming up describes the loop as if it were only the underlying expectation moving.",
    },
  },
  {
    id: "ps-charity-thermometer",
    scenario: {
      en: "An appeal shows a progress thermometer near its target and finds that pledges made after the thermometer appeared are larger. It concludes that the cause turned out to be more popular than expected.",
    },
    trap: "polls-shape-opinion",
    explanation: {
      en: "Larger later pledges are exactly what a visible near-complete target produces. Popularity and the pull of an almost-met goal both raise the same number, and the appeal has no measurement that separates them.",
    },
  },
  {
    id: "ps-reports-without-tally",
    scenario: {
      en: "A consultation collects responses without publishing any running total, and reports the final split alongside a note that respondents were self-selected and could not see how others had answered.",
    },
    trap: null,
    explanation: {
      en: "Withholding the tally removes the feedback loop, and the self-selection caveat names the limitation that remains. The number is reported as the thing it can support rather than as a measure of the public at large.",
    },
  },
  {
    id: "ps-blind-first-round",
    scenario: {
      en: "A committee asks each member to write down and hand in a judgement before any discussion, and only then opens the floor.",
    },
    trap: null,
    explanation: {
      en: "Collecting judgements before anyone hears the others is precisely how you get views that are not a response to the room. The discussion can then add information rather than only spreading whichever opinion was voiced first.",
    },
  },
  {
    id: "ps-separates-the-questions",
    scenario: {
      en: "Reading that a proposal has majority support, an analyst notes the figure, sets it aside, and goes to the impact assessment to decide what she thinks of the proposal itself.",
    },
    trap: null,
    explanation: {
      en: "She keeps what the public thinks and what the policy does as two separate questions. Knowing the majority view is useful information about the politics, and she has not let it stand in for evidence about the merits.",
    },
  },
  {
    id: "ps-pre-registered-baseline",
    scenario: {
      en: "Researchers measure attitudes in a group that has seen no polling information and compare it with a randomly assigned group that has, rather than comparing this month's national poll with last month's.",
    },
    trap: null,
    explanation: {
      en: "Random assignment to seeing or not seeing the information is what makes the comparison clean. Two national polls months apart differ by everything that happened in between, including the reporting of the first one.",
    },
  },
  {
    id: "ok-reporting-rate-held-constant",
    scenario: {
      en: "A country's road deaths are counted from death certificates, a system unchanged in method and coverage for thirty years. The certified count falls by 40 per cent over a decade, and a transport agency concludes that fewer people are dying on the roads.",
    },
    trap: null,
    explanation: {
      en: "This is sound. A death certificate does not depend on a victim deciding to come forward, coverage is effectively complete, and the recording method did not change over the period. When the instrument is stable and the ascertainment is near total, a fall in the count really is a fall in the events.",
    },
  },
  {
    id: "ok-reporting-rate-second-instrument",
    scenario: {
      en: "A city's recorded burglaries fall by a third. A separate household survey, which asks people whether they were burgled regardless of whether they told anyone, finds the same fall over the same years. The city reports that burglary has fallen.",
    },
    trap: null,
    explanation: {
      en: "This is sound. Two instruments with different failure modes agree: one depends on people reporting to the police and one does not. That agreement is what makes the conclusion safe, and it is exactly the check that a single administrative series cannot provide on its own.",
    },
  },

  // ---- Floor and ceiling effects ----
  {
    id: "fc-tutoring-top-set",
    scenario: {
      en: "A tutoring programme is evaluated on whether pupils pass an end-of-year exam. Pass rates rise sharply in the middle sets and not at all in the top set, where 98 per cent were passing before the programme began. The report concludes that the strongest pupils have nothing left to gain from tutoring.",
    },
    trap: "floor-and-ceiling",
    explanation: {
      en: "With 98 per cent already passing there is almost no room for a pass rate to rise, so the top set would show a flat line whether the tutoring helped them or not. The measure ran out before the pupils did, and the report reads that as a fact about the pupils.",
    },
  },
  {
    id: "fc-plant-safety",
    scenario: {
      en: "A safety programme is rolled out across twelve plants and judged by whether each plant records any reportable incident in the following year. The three plants that had gone incident-free for years show no improvement, and the review concludes that the programme adds nothing where safety culture is already strong.",
    },
    trap: "floor-and-ceiling",
    explanation: {
      en: "A plant already at zero cannot go below zero, so on this measure it can only stay where it is or get worse, however much the programme helps. Judging it on a count already sitting at the floor guarantees a null result, which is not the same as finding one.",
    },
  },
  {
    id: "fc-partisan-persuasion",
    scenario: {
      en: "A message is tested on voters and scored by whether each person says they would vote for the candidate. It shifts moderates noticeably and moves the strongest supporters and strongest opponents by almost nothing. The campaign concludes that committed voters are immune to persuasion.",
    },
    trap: "floor-and-ceiling",
    explanation: {
      en: "The outcome is a single yes or no, so it records only whether somebody crossed the line between the two answers. Committed voters sit a long way from that line in both directions, so a message that shifted their views substantially would still register as no change at all.",
    },
  },
  {
    id: "fc-satisfaction-refurbishment",
    scenario: {
      en: "A hotel chain refurbishes its rooms and compares guest satisfaction before and after on a five-point scale. Branches that had been scoring 2.8 improve by nearly a point; branches already scoring 4.8 do not move, and head office concludes that refurbishment only helps struggling branches.",
    },
    trap: "floor-and-ceiling",
    explanation: {
      en: "A branch at 4.8 has two tenths of a point of headroom on a scale that stops at five, so the largest improvement it could possibly record is a fifth of what the struggling branches recorded. What is being compared is not what the branches did but what the scale let them show.",
    },
  },
  {
    id: "fc-pain-relief-severe",
    scenario: {
      en: "A painkiller is assessed by asking patients whether they are pain-free at four hours. It helps most of the moderate group and almost none of the severe group, and the write-up concludes that the drug does not work for severe pain.",
    },
    trap: "floor-and-ceiling",
    explanation: {
      en: "Pain-free is a threshold, and patients starting at the top of the range have much further to travel to reach it. A drug that took every severe patient from nine out of ten down to five would count as a complete failure on this outcome while obviously working.",
    },
  },
  {
    id: "fc-vaccination-districts",
    scenario: {
      en: "A reminder campaign raises childhood vaccination coverage in districts sitting at 60 per cent and produces no measurable rise in districts already at 97 per cent. The evaluation reports that reminders do not work where uptake is high.",
    },
    trap: "floor-and-ceiling",
    explanation: {
      en: "Three points is all the movement the districts at 97 per cent could ever have shown, and a campaign of any strength would look small against one with thirty-seven points to work with. Treating the two as though they had the same opportunity to move is the error.",
    },
  },
  {
    id: "fc-ad-recall-binary",
    scenario: {
      en: "An advertising test scores each viewer on whether they can name the brand unprompted afterwards. Among viewers who already knew the brand well the advertisement changes nothing, and the agency concludes that its work only reaches new customers.",
    },
    trap: "floor-and-ceiling",
    explanation: {
      en: "Viewers who already knew the brand were going to name it either way, so the measure has nothing left to record for them. Whether the advertisement changed how they felt about the brand was never asked, and a flat line on a question already answered is not evidence about a question that was not put.",
    },
  },
  {
    id: "fc-language-app-advanced",
    scenario: {
      en: "A language app is evaluated with a test scored out of twenty. Beginners gain six points on average and advanced learners gain half a point. The advanced learners had been averaging nineteen. The app is redesigned for beginners on the strength of this.",
    },
    trap: "floor-and-ceiling",
    explanation: {
      en: "One point is the most an advanced learner could gain, so half a point is half of everything available to them, while six out of the beginners' fourteen available points is well under half. On the only comparison this test can support the advanced learners did better, and the raw gains say the opposite.",
    },
  },
  {
    id: "fc-poverty-line-crossing",
    scenario: {
      en: "A cash transfer is judged by the share of households above a fixed poverty line. Households just below the line cross it in large numbers; the very poorest show almost no change on the measure, and the programme is described as failing to reach the poorest.",
    },
    trap: "floor-and-ceiling",
    explanation: {
      en: "The measure records only whether a household crossed one particular line. The poorest were furthest from it, so the same transfer that visibly rescued the households sitting just underneath would leave them exactly where the statistic found them, however much their income rose.",
    },
  },
  {
    id: "fc-therapy-mild-symptoms",
    scenario: {
      en: "A therapy is tested on a symptom questionnaire whose lowest possible score is zero. Patients with moderate symptoms improve by several points; patients who entered with mild symptoms, averaging two points, barely move. The clinic stops offering the therapy to mild cases.",
    },
    trap: "floor-and-ceiling",
    explanation: {
      en: "A patient scoring two has two points of possible improvement before the questionnaire runs out, so a barely-moving average is what this instrument would produce for a therapy that worked perfectly. Whether those patients felt better in ways the questionnaire cannot score was never measured.",
    },
  },
  {
    id: "ok-fc-checked-the-headroom",
    scenario: {
      en: "Reviewing a training evaluation that shows no gain for the highest-scoring group, an analyst checks their starting scores, finds them averaging 62 out of 100, and concludes that the flat result for that group is a real finding rather than an artefact of the scale.",
    },
    trap: null,
    explanation: {
      en: "This is the check being run, and passed. With 38 points of headroom the top group had ample room to improve, so their failure to improve is information about the training. The reasoning is sound precisely because the possibility was tested rather than assumed away.",
    },
  },
  {
    id: "ok-fc-reported-the-limit",
    scenario: {
      en: "A report states that an intervention produced no measurable change in the highest-performing sites, and adds that those sites were already at 99 per cent on the outcome measure, so the study cannot say whether it helped them.",
    },
    trap: null,
    explanation: {
      en: "Naming the limit and declining to draw the conclusion is the honest form. The null result is reported, the reason it carries no weight is reported beside it, and nothing is claimed about a group the measurement could not have spoken about.",
    },
  },
  {
    id: "ok-fc-finer-instrument",
    scenario: {
      en: "Finding that almost every pupil in a school passes a national test, a researcher measuring the effect of a reading scheme switches from the pass rate to the underlying score, on the grounds that the pass rate cannot distinguish the pupils she is interested in.",
    },
    trap: null,
    explanation: {
      en: "Replacing a threshold with the continuous quantity behind it is the standard remedy, and it is being applied for the right reason. A pass rate at the top of its range has no resolution left, and the score it was derived from still does.",
    },
  },
  {
    id: "ok-fc-share-of-available-gain",
    scenario: {
      en: "Two groups improve by different absolute amounts on a test scored out of fifty. Before comparing them, an evaluator works out how many points each group had available to gain from where it started, and compares shares of that available gain rather than raw point totals.",
    },
    trap: null,
    explanation: {
      en: "Comparing improvement against the improvement that was possible is the right adjustment when two groups start at different distances from the top of a scale. The raw totals would have flattered whichever group had more room, independently of anything the intervention did.",
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
