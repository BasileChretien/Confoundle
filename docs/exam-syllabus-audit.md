# What the national medical exams actually require, and what Confoundle covers

Working document. The point is to stop guessing which biases matter and instead
audit the deck against the four blueprints a qualifying doctor is examined on:

- **Japan**: 医師国家試験出題基準 (MHLW), with the 医学教育モデル・コア・カリキュラム behind it.
- **France**: the EDN programme, defined by arrêté as numbered items with rang A
  and rang B objectives, plus the LCA (lecture critique d'article) framework.
- **USA**: the USMLE Content Outline, plus the per-Step specifications.
- **UK**: the GMC's MLA content map and Outcomes for Graduates.

Two tiers are kept apart throughout, because conflating them would overstate
what is actually required:

- **Named**: the blueprint prints the term.
- **Taught**: the concept is standard in the teaching and question banks of that
  country but the official document does not enumerate it. Absence from a
  blueprint is not evidence of non-examinability (the USMLE outline says so of
  itself), but it does change how confidently we can claim "the exam requires
  this".

## Status

| Source | Read | Notes |
|---|---|---|
| USA, USMLE | done | Official outline names roughly 15 bias terms; the taught taxonomy runs past 40. |
| Japan, 出題基準 令和6年版 | done | Names only seven error terms. Cross-checked against 1,200 real exam questions. |
| France, EDN | done | The only layer that names biases is the intitulés de connaissance, not the arrêté. |
| UK, MLA | done | Names essentially no statistical bias. The negative is the finding. |
| Korea, KMLE | done | Blueprint names no bias; the released 2026 paper names five in one question. |
| China, 医师资格考试大纲 | done | Names exactly three biases. Textbooks teach the subtypes; the exam does not. |
| Russia, первичная аккредитация | done | The clean negative. Zero named biases, with an internal control proving it is deliberate. |
| Spain, MIR | done | No blueprint exists at all. Evidence comes from five years of real papers. |
| Germany, IMPP-GK | done | Three bias terms, but a rich set of *psychological* judgement errors nobody else has. |

**All nine read.** No jurisdiction has been left pending.

## Germany: three bias terms, and a psychology catalogue that is unique

The legally operative documents are the Approbationsordnung für Ärzte (2002,
amended 2012) and IMPP's Gegenstandskataloge. IMPP states its own catalogues are
"ohne rechtliche Bindung" for the exams, and the NKLM 2.1 published in June 2026
is explicitly non-binding, existing in two parallel variants because a new
Approbationsordnung has stalled. So the operative catalogues are GK 1 (2010) and
GK 2 (5.1, October 2021).

Between them they name exactly three bias-family terms:

- **Störfaktoren (Confounding)**, with control techniques
- **Bias**, generic, with "Ursachen und Formen" but **no types enumerated**
- **kognitive Verzerrungen**, generic, in the team safety-culture context

Worth noting that IMPP glosses confounding as *Störfaktoren*, a rendering the
German epidemiology community has criticised in print.

**What Germany has that nobody else does** is a well-populated set of
*psychological* judgement errors, inherited from the 2010 Medizinische
Psychologie catalogue: **Haloeffekt, Primacy- und Recency-Effekt,
Rosenthaleffekt, Placeboeffekt, Labeling, Urteilsheuristiken, Stereotypien,
Beurteilungsfehler**, plus Störvariable, mediator and moderator variables,
internal and external validity, and statistical versus substantive significance.

A sharp asymmetry there: **Rosenthal (observer-expectancy) and placebo are named;
Hawthorne is not.** So the German graduate meets the investigator-side effect
without the subject-side one.

Checked and **absent from every operative German catalogue**: Selektionsbias,
Informationsbias, Recall-Bias, **Vorlaufzeit-Bias (lead-time)**, **Längenbias
(length-time)**, **Regression zur Mitte**, Publikationsbias, Berkson,
Healthy-Worker-Effekt, Hawthorne-Effekt, Simpson-Paradoxon, ökologischer
Fehlschluss, immortal time, and confounding by indication. Overdiagnosis appears
only in the non-operative competency catalogue; the operative one has just
"Überversorgung".

This denies the common assumption, which I had shared, that Germany owns
lead-time and length bias outright. They are taught in the Q1 course and in
commercial prep, and are defensible under the generic "Ursachen und Formen von
Bias", but no official document names them.

Weighting: M1 allocates **60 of 320 questions** to the psychology and sociology
pot, the only one that can carry methodology, with no published sub-quota. M2 is
320 questions with **no official per-subject quota at all**, so any published
"Q1 is X% of M2" figure is a commercial reconstruction.

## Spain: no blueprint exists, so the papers are the only evidence

This is settled in law rather than by inference. Real Decreto 589/2022 art. 21.1
says the MIR "versará sobre los contenidos de las titulaciones universitarias",
defining content by reference to the degree rather than by a list. The annual
convocatoria specifies only mechanics (200 questions, four options, +3 correct,
-1 wrong). Its Anexo II is titled "áreas temáticas" and **for Medicine it
contains a single cross-reference to Orden ECI/332/2008 and no topics at all**,
while Psychology, Biology, Chemistry and Physics all get real subject lists.

Orden ECI/332/2008 requires epidemiología, bioestadística, interpreting
statistical data in the medical literature, critically appraising scientific
texts, and the principles of evidence-based medicine. It **names zero biases**.
The strings sesgo, confusión, falacia, validez and causalidad do not appear in it.

So the only hard evidence is the exams. Five years of official Ministry
booklets (1,050 items) name:

- **falacia ecológica** (ecological fallacy), the correct answer in the paper sat
  January 2026, with **efecto Hawthorne**, **falacia de Neyman** (prevalence
  -incidence) and **regresión a la media** as its three distractors
- the **selección / información / análisis** taxonomy
- **attrition** and **measurement error** as named risk-of-bias domains
- **confusión**, explicitly distinguished from the Bradford Hill criteria
- **sobrediagnóstico** and **prevención cuaternaria**

Checked and **not evidenced in any of the 1,050 items**: sesgo de memoria
(recall), sesgo de Berkson, paradoja de Simpson, sesgo de adelanto diagnóstico
(lead-time), sesgo de duración (length-time), sesgo de publicación, sesgo del
trabajador sano, and every cognitive bias. Also essentially absent: type I and
type II error, statistical power, p-values. Confidence intervals and statistical
significance appear only as *wrong* options.

**What Spain does test, repeatedly, is our puzzle #10.** Two structurally
identical items five years apart present the same relative halving of risk at
two different baselines (10 to 5 percent against 8 to 4 percent), with the trap
option being "equally effective in both, because it halves mortality in both".
Another item computes a number needed to treat of 167 from PREDIMED event rates,
and another catches the conversion error of reading a relative risk of 0.47 as
a 47 percent reduction. Conditional-probability inversion is tested repeatedly
by making every wrong option a flipped conditional, though the dependence of
predictive value on prevalence is never stated outright.

Two further unnamed traps worth stealing: **systematic error is not cured by a
larger sample** (tested as a false statement to identify), and **precision is
not validity**.

Volume: roughly 8 to 12 of 210 items per paper, clustered around questions 40
to 52.

## Russia: the clean negative, and a control group that proves it

The ФГОС ВО for 31.05.01 Лечебное дело names **no bias and no appraisal skill**.
Its nearest competency, ОПК-10, requires solving standard tasks *using*
bibliographic resources; the verb stops at retrieval and never reaches judging
whether a source is biased. No national ПООП supplying indicators could be found.

The last officially published national test bank (4,011 items) was mined
exhaustively:

- **1 item** contains the words систематическая ошибка or конфаундер, and it
  uses **both as wrong answers**. The candidate must only recognise that they
  are not what a risk group is.
- **0 items** test any named bias, any study design, any effect measure, or any
  diagnostic-accuracy metric. No относительный риск, no ЧБНЛ, no доверительный
  интервал, no p-значение anywhere in 4,011 items.
- **9 items (0.22%)** contain any quantitative-methods vocabulary at all, and
  all nine are Soviet-lineage sanitary statistics: экстенсивный versus
  интенсивный показатели, ошибка репрезентативности, Student's coefficient.
- Screening appears 16 times, always as protocol recall ("which test screens for
  X"). **No item anywhere addresses the harms of screening**, or why earlier
  detection can flatter survival.
- The one OSCE station named for screening (Диспансеризация) states in its own
  passport that interpretation of results **is not assessed**.

**The control group is what makes this conclusive.** The same agency, in the
same year, in the same format, produced the bank for Медико-профилактическое
дело (sanitary physicians), which contains **48 genuine epidemiological-method
items**: 21 on relative risk and odds ratios, 16 on cohort studies, 12 on
case-control, 15 on placebo, and real reasoning items including a
confidence-interval-crosses-one question and a correct reading of positive
predictive value. So the concepts exist in Russian medical accreditation. They
are **quarantined in the public-health degree**.

Structural reason, worth knowing: Russian training splits what the Anglophone
world fuses. Эпидемиология is historically infectious-disease control, and
медицинская статистика sits inside общественное здоровье as health-service
statistics. Clinical epidemiology, the discipline that generates the bias
vocabulary, belongs to neither by default.

Terminology trap for any future Russian localisation: **ошибка
репрезентативности** is the standard error of a proportion, a *precision*
concept, and translating it as "representativeness bias" would be wrong. Bias is
систематическая ошибка, abbreviated СисО.

## China: three families, and nothing below them

The 临床执业医师 syllabus (2024 edition, still governing 2025 and 2026, since the
2026 revision touched only the humanities part) puts every bias in a single
细目, 偏倚控制及病因推断, and names exactly three:

- **选择偏倚** selection bias
- **信息偏倚** information bias
- **混杂偏倚** confounding bias

Plus, elsewhere, **假设检验的两类错误** (type I and type II error) and
**因果关系判断标准** (criteria for causal inference).

Checked individually and **absent from every official Chinese licensing
syllabus, for every physician category**: 回忆偏倚 (recall), 领先时间偏倚
(lead-time), 病程长短偏倚 (length-time), 过度诊断 (overdiagnosis), 发表偏倚
(publication), 伯克森偏倚 (Berkson), 霍桑效应 (Hawthorne), 安慰剂效应 (placebo),
认知偏倚 (cognitive). The words 随机化, 盲法 and 标准化 never appear as 要点 in
the clinical preventive-medicine part either. The **assistant** physician
syllabus does not contain the word 偏倚 at all.

The public health physician syllabus is more granular and adds the only named
subtype in Chinese licensing, **失访偏倚** (loss to follow-up), given
parenthetically as an example of selection bias. It also hides
**regression to the mean** in plain sight: its health-education evaluation unit
lists threats to validity as 历史性因素, 熟练性, 失访 and **回归因素**, which is
history effect, practice effect, attrition and regression to the mean, none of
them named as biases.

**The taxonomy everyone associates with Chinese epidemiology is textbook, not
blueprint.** The 人民卫生出版社 textbooks teach 伯克森偏倚, 奈曼偏倚, 回忆偏倚,
无应答偏倚, 志愿者偏倚, 报告偏倚, 诊断怀疑偏倚, 暴露怀疑偏倚 and 易感性偏倚 by
name, attributing the three-family frame to Miettinen (1976). A Chinese-trained
clinician has almost certainly met those names; they are only examined on the
three families.

Weighting: preventive medicine, statistics, epidemiology, screening and EBM
together are a low single-digit share of a 600-item paper, and bias is one 细目
within that. No official per-subject weighting is published.

**Practical consequence for localisation.** Lead-time, length-time,
overdiagnosis and publication bias are not revision for a Chinese doctor, they
are new material. The best hooks into what they were taught are 收益 (yield) and
提高试验效率的方法 for the base-rate puzzle, 混杂偏倚 with 分层分析 and 标准化法
for confounding, and 因果关系判断标准 with 剂量反应关系 for causation. Register
note for the dictionary: the syllabus uses 筛检 rather than 筛查, and 混杂偏倚
rather than 混杂因素.

## Korea: the blueprint delegates, the paper delivers

The official KMLE written blueprint (평가목표집, 2014, still operative) names
**zero individual biases**. The token 바이어스 appears three times, always as a
bare category with enumeration handed to the candidate: objective PE #102 says
only "list the biases that can arise in epidemiologic research, and explain the
cause of each and the remedy", and PE #100 refers to "the biases that can be a
problem when evaluating screening test effectiveness" without naming lead-time
or length-time. The word 교란 (confounding) does not appear at all.

**But the actual exam is far more demanding than its blueprint.** The 90th KMLE
(sat January 2026, officially released) contains one question, 1교시 Q67, whose
correct answer is **버크슨 바이어스, Berkson's bias**, presented as a
single-hospital case-control study with OR 2.3 that collapses to 1.1 on
nationwide replication. Its four distractors are **탈락 (attrition), 무응답
(non-response), 기간차이 (length-time) and 자발적 참여자 (volunteer) bias**. So
five biases are expected by name in one item.

The same paper requires Bradford Hill criteria by name (Q59), discriminating
proportional mortality from four other mortality measures (Q64), computing a
**relative risk reduction of 50% where the absolute reduction is 0.8 percentage
points** (Q73), and refusing the largest relative risk in favour of the only one
whose confidence interval excludes 1 (Q74).

Note the register: Korean exam material uses the transliteration **바이어스**,
not 편향 and not 비뚤림 (which is the Cochrane/NECA term). That matters if the
app is ever localised to Korean.

## UK: the blueprint names almost nothing, and that is deliberate

Across **both** versions of the GMC's MLA content map (632 strings in the 2019
edition, 861 in the 2026 one), a programmatic scan finds **zero** occurrences of:
confounding, lead time, length time, anchoring, premature closure, availability,
confirmation bias, heuristic, cognitive, sensitivity, specificity, predictive
value, prevalence, incidence, absolute risk, relative risk, odds ratio, number
needed to treat, p-value, confidence interval, randomised, blinding, intention
to treat, regression to the mean, critical appraisal, systematic review, cohort,
case-control, causation.

The word **bias appears exactly once**, in the 2026 edition, and it means
discrimination: "recognising both conscious and unconscious bias towards
individuals and groups". The only named epistemic error in the entire assessment
blueprint is **over-diagnosis**, and only from September 2026.

This is not an oversight. The GMC was asked during consultation to add public
health to the map and **declined**, recording that it was not "a context of care
delivery in the UK Foundation Programme". The map also states it is not a
syllabus and "should not be viewed as exhaustive".

The binding graduation standard, **Outcomes for Graduates**, is broader but still
names no type of bias. It requires interpreting common statistical tests,
critically appraising study design and diagnostic/prognostic/treatment trials,
describing stratified risk, and recognising the consequences of over-diagnosis
and over-treatment. Everything else is functional: "interpreting and using
research, data and statistics" is the single line carrying all of biostatistics
in the assessment blueprint.

**Named bias content in the UK sits one level up, in postgraduate documents.**

- The GMC's **Generic professional capabilities framework**, which every
  postgraduate curriculum must incorporate, names "fixation error, unconscious
  and cognitive biases" in Domain 6 and defines all three in its glossary. No
  individual diagnostic bias is named.
- The **RCGP curriculum topic guides** (from August 2025) are the most detailed
  official UK list by a wide margin, naming bias and confounding, sensitivity,
  specificity, predictive values, absolute and relative risk, NNT and NNH,
  hazard and odds ratios, type 1 and type 2 errors, power. This is GP training,
  not qualification.
- **Anchoring, availability, confirmation and search satisfaction** appear in an
  **HSSIB investigation report**, not in any curriculum.

On screening, the UK NSC criteria embed the substance without the vocabulary:
criterion 11 requires RCT evidence of reduced **mortality or morbidity**, and
criterion 13 names **overdiagnosis, overtreatment, false positives and false
reassurance** as harms. **Lead-time bias appears once in any current official UK
document** (NHS Population Screening Standards, section 3.2) and **length-time
bias could not be found named in any of them.** The common claim that UK practice
formally embeds both is, on the documents, half true.

## The consolidated list, and what the deck covers

Legend: **A** named and required of every doctor · **O** officially named ·
**E** examined in practice though not in the blueprint · **T** taught
consensus only · **X** absent from official documents.

| Reasoning trap | JP | FR | US | UK | In deck |
|---|---|---|---|---|---|
| Confounding (general) | A | A | O | X | via Simpson's, indication |
| Selection bias (general) | X | A | O | X | via Berkson, survivorship |
| Information / classification bias | X | A | O | X | **gap** |
| Recall bias | X | **A** | O | X | **shipped** |
| Attrition / loss to follow-up | X | **A** | O | X | **gap**; partly inside intention to treat |
| Intention to treat vs per protocol | O | **A** | O | X | **shipped** |
| Lead-time bias | X | **A** | O | (once) | shipped |
| Length-time bias | X | **A** | O | X | **shipped**; also in Korea 2026 paper |
| Overdiagnosis | X | **A** | T | **A** | inside length-time |
| Publication bias | E | A(body) | O | X | **shipped this session** |
| Base rate / predictive value vs prevalence | **E every year** | A | O | X | shipped |
| Relative vs absolute risk, NNT | A (x2) | A | O | X | shipped |
| Blinding: performance + detection bias | X | **A** | O | X | **gap** |
| Allocation concealment | X | **A** | O | X | **gap** |
| Effect modification vs confounding | X | B | X | X | **gap, high value** |
| Confounding by indication | X | B | T | X | shipped |
| Differential vs non-differential misclassification | X | B | T | X | **gap** |
| Placebo / nocebo | X | **A** | O | X | **gap** |
| Statistical vs clinical significance | X | **A** | O | X | **gap** |
| Power, type I and type II error | X | **A** | O | X | **gap** |
| Sponsorship / conflict of interest | X | **A** | T | X | **gap** |
| Regression to the mean | X | **X** | O | X | **gap** |
| Ecological fallacy | X | **X** | O | X | **gap** |
| Simpson's paradox | X | **X** | **X** | X | shipped (consensus only) |
| Berkson's bias | X | **X** | **X** | X | shipped; **named in Korea 2026 paper** |
| Survivorship bias | X | **X** | **X** | X | shipped (consensus only) |
| Spectrum bias | X | **X** | **X** | X | shipped (consensus only) |
| Will Rogers phenomenon | X | X | X | X | shipped (consensus only) |
| Prosecutor's fallacy | X | X | X | X | shipped (not a medical exam topic) |
| Immortal time bias | X | **X** | T | X | **shipped** |
| Healthy worker / healthy user | X | X | T | X | partly inside indication |
| Hawthorne effect | X | X | **O** | X | **gap** |
| Neyman / prevalence-incidence | X | X | T | X | **gap** |
| Cognitive: anchoring, availability, framing | named as a category | **X** | O | postgrad | **gap, needs a new beat** |

## Built from this document

Three of the entries below have since shipped as puzzles, from exactly the
counts recorded here: **intention to treat versus per protocol** (STICH),
**recall bias** (Norwegian Women and Cancer) and **immortal time bias**
(Suissa). Two corrections came out of building them, and both are the kind this
document exists to catch.

- **The recall-bias odds ratios cannot be recomputed from the counts.** The
  paper prints 1.90 and 3.01; the crude two-by-two odds ratios of the four cells
  are 1.80 and 2.55. Both pairs move the same way by a similar factor, but they
  are not the same quantity, so the puzzle quotes only the derived ones and its
  provenance note says why. The direction of the lesson is unaffected.
- **The intention-to-treat puzzle gained a third panel** that was not in the
  plan: the 120 patients the per-protocol set excludes, at 15 of 65 and 30 of
  55. It is pure subtraction over printed integers, it closes three ways, and it
  is the mechanism made visible rather than asserted. Without it the reveal is
  "the number changed"; with it, the reveal is why.

Ready to build next, with counts verified this session and written up in full
under `scratchpad/research/`:

- **Nocebo / side effects on placebo.** StatinWISE, Herrett E et al, BMJ
  2021;372:n135, Table 2, p. 5, CC BY. Muscle symptoms reported in 248 of 397
  statin periods (62.5 percent) against 239 of 388 placebo periods (61.6
  percent). All eight integers printed. **Denominators are two-month treatment
  periods, not people**, and the puzzle must say so. ASCOT-LLA was checked and
  rejected: its denominators are person-time, and deriving crude proportions
  from its printed counts reverses the open-label finding.
- **Attrition, as post-randomisation exclusion.** X:BOT, Lee JD et al, Lancet
  2018;391(10118):309-318, free at PMC5806119, Table 2. Relapse among those who
  actually started the drug: **106/204** on extended-release naltrexone against
  **150/270** on buprenorphine-naloxone, which makes naltrexone look equal or
  better. Among everyone randomised: **185/283** against **163/287**, and the
  direction flips. The mechanism is unusually clean: only 204 of 283 could start
  naltrexone against 270 of 287 for buprenorphine, because naltrexone requires
  full detoxification first or it precipitates withdrawal, and **all 79 excluded
  patients relapsed**. Every printed percentage and odds ratio reproduces from
  the crude counts, and the denominators are independently confirmed by the
  ClinicalTrials.gov posting for NCT02032433. The survival rows are medians and
  hazard ratios and are not usable as counts. Word the lesson as
  post-randomisation exclusion rather than classical loss to follow-up.
- **Blinding, observer / detection bias.** The "same patients, two assessors"
  design, where one assessor knew the allocation and the other did not.
  Meta-analytic: Salazar J et al, J Clin Epidemiol 2025;183:111787, open access,
  43 trials and 7,055 patients, pooled ratio of odds ratios **0.71 (0.55 to
  0.92)**, so non-blinded assessors exaggerated by about 29 percent; the earlier
  binary study is Hrobjartsson A et al, BMJ 2012;344:e1119, ROR 0.64 (0.43 to
  0.96). **No per-trial raw counts exist** in either appendix, and the pooled
  integers have no per-arm denominators, so no rates are derivable from them.
  One constituent trial does print usable counts: Brandstrup B et al, Ann Surg
  2003;238:641-648, free in PMC, the same 172 patients assessed twice, 27/86
  against 47/86 unblinded and 28/86 against 44/86 blinded. Be honest that this
  attenuates rather than vanishes. Noseworthy 1994 could not be reached and is
  flagged do-not-ship.
- **Ecological fallacy.** Robinson WS, Am Soc Rev 1950;15(3):351-357, Table 3
  and Figure 3, p. 354, verified against two independent scans. **The sign
  convention in the earlier note here was wrong**: Robinson's outcome is
  ILLITERACY, not literacy, so the individual correlation is +.118 and the
  ecological one is -.619 across divisions and -.526 across states. Individual
  counts are printed (1,304 illiterate of 13,217 foreign born; 2,614 of 84,055
  native born, in thousands) and reproduce the printed .118 exactly. No
  per-state counts are printed, so the group-level view cannot be authored as
  integers from Robinson alone. Note also te Grotenhuis et al, Int J Epidemiol
  2011, which corrects the state-level figure to about -0.462 on weighting; the
  reversal survives.

## Sourced and ready to build

Verified counts, so the next session can author straight from here rather than
re-running the search.

**Immortal time bias.** Suissa S, Am J Epidemiol 2008;167(4):492-499, Table 1,
free full text. Multiple-event-based cohort row: on the drug 188 deaths of 388,
off it 357 of 500, so 48.5% against 71.4%. The reveal is the person-time:
276.3 counted years against **291.1 immortal years**, more immortal than counted,
during which nobody in the exposed group could die by construction. Hazard ratio
moves 0.48 to 0.91 once corrected. Needs the `timeline` shape extended with an
optional shaded stretch per track.

The Academy Award study is the better *story* and is verified end to end
(Redelmeier & Singh, Ann Intern Med 2001, claimed 3.9 extra years; Sylvestre et
al, 2006, corrected it to about 1.0 year, not significant; the original authors
then published their own null). But its crude death proportions are 42.1%
against 41.9%, essentially identical, so a rate chart shows nothing in the setup.
Use it as the deep-dive example, not the figure.

**Recall bias.** Parr CL et al, Am J Epidemiol 2009;169(3):257-266, Table 4,
p. 262. Same women asked the same question before diagnosis and again after.
Skin's tanning response, "light tan or no tan": cases 54/141 prospectively then
64/141 retrospectively; controls 281/1094 then 269/1094. So cases drift +7.1
points and controls drift -1.0. The odds ratio the drift manufactures is printed:
1.90 becomes 3.01. Eye colour in the same table is a built-in negative control,
drifting equally in both groups.

Disclose honestly: the reference standard is the woman's own pre-diagnosis
questionnaire, not an external record, and the authors' own conclusion is hedged,
since this was the only host factor whose shift was significant in cases and not
in controls. For a genuinely external record, Werler MM et al, Am J Epidemiol
1989;129(2):415-421, Table 3, compares interview against the obstetric chart: of
mothers whose chart documented a urinary or yeast infection, 12 of 19 case
mothers mentioned it against 7 of 30 controls. Two cells only, because
obstetricians rarely document non-exposure.

**Intention to treat versus per protocol.** Velazquez EJ et al, N Engl J Med
2011;364(17):1607-1616 (STICH), Supplementary Table 5, p. 9 of the appendix.
Death from any cause, median 56 months, bypass surgery against medical therapy:

- Intention to treat: 244/602 medical, 218/610 surgery. Hazard ratio 0.86,
  P = 0.123, **not significant**.
- Per protocol: 229/537 and 188/555. Hazard ratio 0.76, P = 0.005, **significant**.

So the two analyses give opposite verdicts on the same trial, which is exactly
the lesson. All four cells are printed integers, every rate sits between 33.9%
and 43.8%, and the arithmetic reconciles three ways: the excluded 65 and 55
patients reassemble the as-treated arms (537 + 55 = 592, 555 + 65 = 620), and
total deaths are conserved between the intention-to-treat and as-treated splits
(244 + 218 = 259 + 203 = 462).

The mechanism is the good part. The medical patients dropped from the
per-protocol set are the ones who **crossed over to surgery**, which required
surviving long enough to reach an operating table; the surgical patients dropped
are largely those who **died before their operation**. Restricting to
per-protocol therefore hands the surgical arm a survival requirement and strips
the medical arm of its healthiest members. Note in provenance that 65 and 55 are
implied by printed denominators rather than printed themselves, and that the
paper's P values come from Cox models, not from the 2x2.

Backup if a non-surgical example is wanted: REMoxTB (Gillespie SH et al, N Engl
J Med 2014;371(17):1577-1587, Table 2), where per-protocol analysis almost only
removes patients who had an unfavourable outcome, halving the control arm's
apparent failure rate from 16% to 8%. Be honest there that the verdict does not
flip; only the size of everything changes.

**A correction the deck should carry.** Klemetti & Saxén, Am J Public Health
1967;57(12):2071-2075, free, is cited everywhere as the origin of recall bias
and **does not demonstrate it**. Its own text reports no significant difference
in unidentical replies between the mothers of affected and healthy children. What
it does show, spectacularly, is *non-differential* misclassification: only about
a quarter of prospectively collected information reappeared identically at
re-interview, and roughly two thirds of retrospective positive replies had no
prospective history at all, **in both groups**. That is a puzzle in its own right
(retrospective interviews are unreliable even when nobody is biased) and an
excellent sound decoy for the Trap Hunt.

Similarly, Hall N et al (UKCCS), Int J Epidemiol 2023;52(4):1187-1196, open
access, is the largest study of this shape (1,624 cases, 2,524 controls against
GP records) and finds **essentially no differential recall at all**. Worth citing
so the deck does not teach that recall bias is universal.

### Three uncomfortable findings

1. **Four of our thirteen puzzles teach traps that no blueprint names**, and the
   fifth was rescued by looking at a real paper rather than a blueprint.
   Simpson's paradox, survivorship, spectrum bias and the Will Rogers phenomenon
   are consensus teaching, not required content, in every jurisdiction read so
   far. **Berkson's bias is the exception**: no blueprint names it, but Korea's
   released 2026 paper makes it a correct answer. That is a warning about
   method. Blueprints understate what is examined, sometimes badly, so a bias
   absent from every syllabus may still be asked. Where released papers exist
   (Japan, Korea) they are better evidence than the blueprint, and this table
   should be read as a floor rather than a ceiling.
2. **The gaps cluster in trial appraisal, not in exotic biases.** Blinding,
   allocation concealment, attrition, intention to treat, power, statistical
   versus clinical significance and placebo are all **rang A in France** and
   official in the US, and we teach none of them. That is a more serious hole
   than any individual named bias.
3. **The jurisdictions disagree sharply.** France requires lead-time, length-time
   and overdiagnosis of every doctor; Japan's blueprint names none of them. The
   US names regression to the mean and the ecological fallacy; France explicitly
   has neither anywhere in its 367 items. Any claim that a bias is "on the
   medical curriculum" needs a country attached to it.

## France: the legal programme names nothing, the knowledge objectives name plenty

Three layers, and only one of them matters here.

1. The **arrêté** (2 September 2020, annexe 1) is the legal programme, 367 items.
   It names **zero** biases and carries no rang markings at all. Note item 20 was
   renamed by R2C and is no longer "Interprétation d'une enquête
   épidémiologique" but **"La méthodologie de la recherche en santé"**.
2. The **intitulés de connaissance** (`OIC-<item>-<n>-<rang>`), published on
   LiSA by the collèges. The EDN cahier des charges states that questions bear
   on rang A or rang B intitulés, so **this is the operative programme**, and it
   is the only layer naming biases.
3. The collèges' referentiels and commercial books. Secondary.

**Rang A means every doctor must know it.** These are named at rang A:

- Item 20 (OIC-020-26): erreur aléatoire and erreur systématique, biais,
  **biais de sélection**, **biais de classement** (information), **biais de
  confusion** and facteur de confusion, and, flagged in the objective statement
  as special cases, **biais d'attrition** and **biais de mémorisation** (recall).
  Plus the controls: ajustement, appariement, stratification, restriction.
- Item 290, cancer screening (OIC-290-24): the three screening biases, all rang
  A. **Avance au diagnostic** (lead-time), **biais de progression** (length-time),
  **biais de surdiagnostic** (overdiagnosis). The fiche states outright that the
  endpoint must be mortality and that survival duration is the trap.
- Item 323 (OIC-323-15, -17, -25): biases avoided by blinding, hence
  **performance** and **detection** bias; bias from failed allocation
  concealment; and attrition through **intention to treat versus per protocole**.
- Publication bias appears at rang A but only in the fiche body (OIC-323-08),
  not in an objective statement.

At rang B: differential versus non-differential misclassification (OIC-020-27),
**interaction / modification d'effet, explicitly to be distinguished from
confounding** (OIC-020-28), **biais d'indication** (OIC-323-04), and
surdiagnostic/surtraitement under prévention quaternaire (OIC-003-05).

### What France explicitly does NOT contain

Checked individually against the full 367-item corpus, each returning zero hits:
**régression vers la moyenne, paradoxe de Simpson, sophisme écologique
(ecological fallacy), biais du temps immortel, healthy worker effect, biais de
Berkson, biais de Neyman, biais de survie, spectrum bias, biais de vérification,
effet Hawthorne**, and **every named cognitive bias** (ancrage, disponibilité,
confirmation, clôture prématurée, cadrage). The R2C programme contains no
cognitive-bias vocabulary whatsoever.

The LCA (lecture critique d'article) survives in the EDN and its questions carry
**double weight**, but it has no bias list of its own; its examinable content is
the rang A/B knowledge of items 3, 20 and 323. The historical CNCI LCA framework
named only two families, "biais d'information et de sélection", so the widely
repeated claim that LCA once had a long official bias list is not supported.

**Access caveat.** LiSA sits behind UNESS authentication and Légifrance refuses
scripted requests, so the structure, identifiers and rangs above come from a
complete public mirror of the LiSA sheets, whose prose has been
machine-translated to English. The French terms above are therefore standard
back-translations, not verbatim official wording.

## Japan: a blueprint that names almost nothing, and an exam that tests plenty

The 医師国家試験出題基準 令和6年版 (current, governing 第118回 onward) names
just seven error terms in total: バイアス (generic, no subtypes), 交絡因子,
認知バイアス, 医師による偏見・スティグマ, 偶然誤差, 誤差, and
ヒューマンエラー・システムエラー. Selection, information, recall, lead-time,
publication, survivorship, Berkson, regression to the mean and overdiagnosis
are **absent from the blueprint entirely**, as are all the individual cognitive
biases.

The 医学教育モデル・コア・カリキュラム behind it adds only 主なバイアスや交絡
("major biases and confounding", undifferentiated) and 二重過程理論 (dual
process theory), which is the sole named cognitive-science construct in either
document.

**But the exam outruns its own blueprint.** Reading the MHLW question papers
for 第118回 to 第120回 (six blocks each) shows:

- **Bayesian post-test probability is examined every single year** (118C63,
  119E, 120E14), always as pre-test probability to post-test probability, and
  **never using the word 的中度** (predictive value). Base-rate reasoning is
  the most reliably examined quantitative topic in the whole area, and it is
  examined under a name the blueprint does not use.
- **Publication bias is examined without being authorised by the blueprint**
  (118E2, 120C20, the latter with a funnel plot).
- Confounding appears as 未測定の交絡因子, unmeasured confounders (118B9).
- **Zero occurrences in three years** of 選択バイアス, 情報バイアス,
  リードタイムバイアス, or any named cognitive bias.

Two structural quirks worth knowing:

- **Cognitive bias is filed under 医原病 (iatrogenic disease)**, not clinical
  reasoning. Japan treats diagnostic error as a cause of patient harm.
- **Prevalence and pre-test probability sit in different chapters**, and the
  blueprint never states the link between them. The student has to supply it,
  which is precisely the reasoning step our base-rate puzzle teaches.

Emphasis is stated rather than inferred: 必修 §10 臨床判断の基本 is about 4% of
必修, which is 100 questions carrying an **80% pass threshold**, so roughly four
questions a year in the highest-stakes section of the exam. Hill's criteria are
named in full and constitute the blueprint's entire apparatus for "correlation
is not causation", a phrase that never appears. Relative and absolute risk are
defined in **two separate chapters**, which signals emphasis, though the fallacy
itself is never framed.

## USA: what the official outline names

From the USMLE Content Outline (2026 public release), in
*Biostatistics, Epidemiology/Population Health & Interpretation of the Medical
Literature* and in *Social Sciences*.

Bias and validity terms, printed:

- selection bias, sampling bias
- information bias, with the exemplars recall, ascertainment, ecologic fallacy,
  lack of blinding, loss to follow-up
- confounding variables, and methods to address them
- Hawthorne effect
- placebo effect
- lead-time bias
- length bias
- publication bias, funnel diagrams
- reverse causality
- regression to the mean
- intention-to-treat, loss to follow-up

Reasoning traps that are not called "bias" but are printed:

- sensitivity and specificity versus predictive values; pretest and posttest
  probability; likelihood ratios
- absolute risk, relative risk, odds ratio, hazard ratio, number needed to
  treat and to harm
- type I error and alpha; type II error, beta, power; multiple comparisons;
  a priori versus post hoc and subgroup analysis
- p-values, confidence intervals, statistical versus clinical significance
- clinical versus surrogate endpoints
- internal versus external validity, generalisability, efficacy versus
  effectiveness
- non-inferiority and equivalence designs
- causal criteria: temporality, dose-response

Cognitive bias, official enumeration, and note **where it sits**: Social
Sciences → systems-based practice and patient safety → causes of error →
physician factors. Only *cognitive bias, availability, heuristic, anchoring,
framing* are named. Step 1 carries no patient-safety competency at all, so this
is Step 2 CK and Step 3 material officially.

Weightings: biostatistics and epidemiology is 4-6% of Step 1, 3-5% of Step 2 CK
and **11-13% of Step 3**. The Step 3 figure is the one that matters for how
seriously the material is taken.

### Named in US teaching but NOT in the official outline

Worth recording because several are already in our deck, and we should not
claim official standing for them: Berkson's bias, Simpson's paradox,
survivorship bias, healthy worker effect, healthy user and healthy adherer
bias, volunteer and self-selection bias, non-response bias, observer and
Pygmalion effects, procedure bias, performance bias, surveillance and detection
bias, differential versus non-differential misclassification, prevalence-incidence
(Neyman) bias, immortal time bias, confounding by indication and channelling,
overdiagnosis, per-protocol analysis, composite endpoints, and **effect
modification / interaction**.

That last one is the most interesting gap: effect modification is absent from
the official outline entirely, yet it is the concept most often confused with
confounding in teaching. Under-specified officially and heavily tested in
practice is exactly the profile of a good puzzle.
