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
| Information / classification bias | X | A | O | X | **shipped** (via non-differential misclassification) |
| Recall bias | X | **A** | O | X | **shipped** |
| Attrition / loss to follow-up | X | **A** | O | X | inside intention to treat, deliberately; see below |
| Intention to treat vs per protocol | O | **A** | O | X | **shipped** |
| Lead-time bias | X | **A** | O | (once) | shipped |
| Length-time bias | X | **A** | O | X | **shipped**; also in Korea 2026 paper |
| Overdiagnosis | X | **A** | T | **A** | inside length-time |
| Publication bias | E | A(body) | O | X | **shipped this session** |
| Base rate / predictive value vs prevalence | **E every year** | A | O | X | shipped |
| Relative vs absolute risk, NNT | A (x2) | A | O | X | shipped |
| Blinding: performance + detection bias | X | **A** | O | X | **shipped** (detection; Brandstrup 2003) |
| Allocation concealment | X | **A** | O | X | **gap** |
| Effect modification vs confounding | X | B | X | X | **shipped** (Choi 2021) |
| Confounding by indication | X | B | T | X | shipped |
| Differential vs non-differential misclassification | X | B | T | X | **shipped** (non-differential; differential via recall bias) |
| Placebo / nocebo | X | **A** | O | X | **shipped** |
| Statistical vs clinical significance | X | **A** | O | X | **shipped** (oseltamivir) |
| Power, type I and type II error | X | **A** | O | X | **gap** |
| Sponsorship / conflict of interest | X | **A** | T | X | **gap** |
| Regression to the mean | X | **X** | O | X | **shipped** (Galton 1886) |
| Ecological fallacy | X | **X** | O | X | **shipped** (Robinson 1950) |
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

### Attrition is not a separate puzzle, and X:BOT is why

This was sourced as its own puzzle and then deliberately not built as one.

X:BOT (Lee JD et al, Lancet 2018;391(10118):309-318, Table 2) is as good as
this kind of evidence gets. Counting only those who started the drug they were
assigned, extended-release naltrexone looks slightly better than
buprenorphine-naloxone, 106 of 204 relapsing against 150 of 270, so 52.0
percent against 55.6. Counting everyone randomised it is clearly worse, 185 of
283 against 163 of 287, so 65.4 against 56.8. **The verdict flips.** And the
mechanism is unusually clean: naltrexone cannot be started without a full
detoxification first or it precipitates withdrawal, so 79 of its patients never
managed to begin, against 17 in the other arm, and **all 79 relapsed** (185
minus 106 is 79, which is the whole of the excluded group).

But that is post-randomisation exclusion, which is precisely the mechanism the
intention-to-treat puzzle already teaches, and `registry.test.ts` requires each
puzzle to teach a distinct `reasoningSkill`. Shipping it as "attrition bias"
would have put two names on one reasoning move and taught a distinction that
does not exist. It is now the lead deep-dive example on that puzzle, where a
flipped verdict does more work than a near-duplicate would have.

The lesson for the next pass: **check that a sourced topic is a distinct
reasoning move before authoring it**, not only that it has good numbers.
Classical loss to follow-up, where people vanish rather than being excluded by
rule, would be a genuinely different puzzle and is still unsourced.

Ready to build next, with counts verified this session and written up in full
under `scratchpad/research/`:

- ~~Nocebo / side effects on placebo~~ **shipped** as puzzle #17, from
  StatinWISE (Herrett E et al, BMJ 2021;372:n135, Table 2, p. 5, CC BY): muscle
  symptoms in 248 of 397 statin periods against 239 of 388 placebo periods, all
  eight integers printed. Two things the build had to get right. The
  denominators are two-month treatment **periods, not people** (152
  participants, up to six periods each), so the figure, the framing and the
  provenance all say so. And both rates round to 62 percent for display, so the
  prose quotes the paper's one-decimal 62.5 and 61.6 rather than integers, with
  a test forbidding the earlier draft's "63 percent". ASCOT-LLA was checked and
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
- **Blinding, observer / detection bias.** ~~Ready to build~~ **Shipped** as the
  `detection-bias` puzzle (`who-graded-it`), from Brandstrup 2003 below: the
  unblinded panel (27/86 vs 47/86, P = 0.002) as the setup, the blinded panel
  (28/86 vs 44/86, P = 0.013) beside it as the reveal, on the rates shape with
  the two assessments as separate-sample strata. Deep-dive is Hrobjartsson 2012
  (21 trials, 4,391 patients, ROR 0.64, 36 percent exaggeration). The "same
  patients, two assessors" design, where one assessor knew the allocation and
  the other did not.
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

### Statistical versus clinical significance: shipped, and why on this source

Shipped as the `statistical-vs-clinical-significance` puzzle (`certainly-tiny`) from
Jefferson T, et al, BMJ 2014;348:g2545 (PMID 24811411), the review built on the full
clinical study reports rather than the published papers. The abstract prints the
adult treatment effect as **16.8 hours** saved (95% CI 8.4 to 25.1), **P < 0.001**,
and the harms as nausea (risk difference 3.66%, NNTH 28) and vomiting (4.56%,
NNTH 22). The Cochrane review of the same dataset states the benefit as a fall
**from 7 days to 6.3 days**, which supplies the 168-hour illness the reveal is
drawn against: 168 - 16.8 = 151.2 hours = 6.3 days, and 16.8 is exactly a tenth
of 168. Needed a new `effect` shape (one estimate, its interval, and the quantity
it is a slice of) with `significance` and `magnitude` views.

**A source that was rejected, and the reason is worth keeping.** Kirsch I, et al,
PLoS Med 2008;5(2):e45 is the cleaner teaching example on paper: a 1.80-point
drug-placebo difference on the Hamilton scale against NICE's own 3-point
threshold, with the authors stating outright that it falls short. It was rejected
as the *puzzle* because antidepressant efficacy is contested rather than settled
(Cipriani A, et al, Lancet 2018 found all 21 drugs beat placebo), and a puzzle
that reads as "antidepressants do not work" could do real harm to a reader who
takes them. It is used instead as the deep-dive example, where the point being
made is about the threshold, not about the drugs. **Rule to carry forward: when a
lesson can be taught on either of two sources, prefer the one where being
misread does no damage.**

### Ecological fallacy: SHIPPED, and how the group level was handled

The gap recorded above (Robinson prints the individual-level counts but no
per-state figures) **closes through the census underneath him**, not through the
2011 re-analysis, which is paywalled and was not readable.

- Individual level: Robinson WS, Am Soc Rev 1950;15(3):351-357, Table 3. Foreign
  born 1,304 illiterate of 13,217; native born 2,614 of 84,055 (thousands),
  reproducing his printed +.118.
- Group level: *Fifteenth Census of the United States: 1930, Population, Vol. II*,
  ch. 13, **Table 10** (p. 1229), free on census.gov, printing population and
  illiterate counts per state and per census division.

Triangulated rather than taken on trust. An independent transcription of the same
census volume (the CRAN `stevedata` package's `illiteracy30`, 48 states plus DC)
sums to foreign-born white 13,216,928 with 1,304,084 illiterate, matching
Robinson's thousands digit for digit. Recomputing from those integers gives a
**state-level r of -0.524 unweighted (-0.535 excluding DC)** against Robinson's
printed **-.526**, and the same table reproduces Robinson's *other* worked example
(race) at r = 0.771 state level against his .773.

Two honesty constraints for whoever builds it. The **division-level** recompute
came out at about -0.69 against Robinson's **-.619**, a real discrepancy most
likely in the state-to-division mapping used, so either use the state level (which
matches) or resolve the mapping before quoting a division figure. And the per-state
rows were read from a scan: **re-verify the specific states the puzzle names**
against a clean copy of p. 1229 before locking copy. Shape note: this wants an
individual-level view and a group-level scatter of the same census, so it likely
needs a new shape rather than an existing one.


**Built, with one design decision worth recording.** Shipped as the
`ecological-fallacy` puzzle (`states-and-people`) on a new `ecological` shape
(`byplace` and `byperson` views). The person level uses Robinson's printed
Table 3 counts, so its rates are derived and testable: 1,304 of 13,217 born
abroad against 2,614 of 84,055 native born, which is 9.9 per cent against 3.1
and reproduces the +.118 he prints. The state level is authored as the
**coefficient** (-.526) and drawn as a slope, **not** as a scatter, because
Robinson published the correlation and never the per-state figures. Plotting
invented dots would have been inventing observations, so the figure says on
its face that the slope is drawn rather than plotted. That sidesteps the census
transcription entirely, and with it the unresolved division-level discrepancy
noted above. The 2011 correction is the deep-dive example, since the reversal
survives it.

## Sourced and ready to build

Nothing currently sits here. The one entry that did, misleading chart axes, was
verified and shipped; it is recorded below. The two gaps named at the end of
this document (manufactured doubt, cherry-picked baselines) still have no usable
source and need a dedicated search.

**Misleading chart axes. VERIFIED AT SOURCE AND SHIPPED** as the
`misleading-axis` puzzle (`which-way-is-up`), on the existing `rates` shape, as
the deck's second persuasion lesson after the framing effect.

Pandey AV, Rall K, Satterthwaite ML, Nov O, Bertini E. How deceptive are
deceptive visualizations?: an empirical analysis of common distortion
techniques. CHI '15. 2015:1469-1478. doi 10.1145/2702123.2702608.

**How the earlier dead ends were cleared.** The two hosts that failed before (an
arXiv id that was a physics paper, an RPI mirror with a broken TLS
configuration) were not needed. The last author's own page links an author copy,
and the ACM DL record is marked FREE ACCESS, so both the preprint and the
published version were read. The preprint (NYU School of Law Public Law & Legal
Theory Research Paper No. 15-03, February 2015, SSRN 2566968) was diffed against
the published PDF: **the body text is identical**, the only differences being
ACM's copyright boilerplate. So there is no preprint-versus-final discrepancy to
worry about, and either copy can be cited as the paper.

**Every figure in the old entry was confirmed, from the tables.**

- Inverted axis, message reversal (Table 3, p. 1476). Of **40** shown a normal
  axis, **39** read the trend correctly and 1 did not. Of **38** shown the same
  data with the axis inverted, **7** read it correctly and **30** concluded the
  opposite. Confirmed.
- **The 38th response, which the old entry flagged as unreconciled: one
  participant chose "I do not know".** 7 + 30 + 1 = 38 exactly, and 39 + 1 + 0 =
  40 for the control. Not a loose end but the crux of the lesson, since it says
  the inverted chart did not confuse people, it converted them.
- Truncated axis, message exaggeration (Tables 1 and 2, p. 1475). Deceptive
  **2.77** [95% CI 2.26 to 3.28] against control **1.45** [1.27 to 1.62], on a
  scale the caption pins as minimum 1, maximum 5. **U = 1144, p = 0.0003**, with
  Z = 3.36 and r = 0.37. Two details the old entry lacked: the test was
  **one-tailed**, and the groups were unequal at **43 deceptive against 37
  control**.
- Design: **between-subjects**, confirmed in the paper's own words. Crowdsourced
  on Amazon Mechanical Turk, United States workers with a prior approval rate of
  99 per cent or better. 250 participants for the exaggeration study and 80 for
  the reversal study, which is the 330 the Procedure section states.
- Invented place names: **confirmed**. The stimuli are set in Silvatown and
  Willowtown, and the inverted-axis chart plotted access to safe drinking water
  over time. No real country, party or contested science.

**One correction to the old entry.** It said "Fisher's exact p < 0.0001". The
paper used the **Freeman-Halton extension** of Fisher's exact test, which is the
generalisation for a table with more than two response categories, and needed it
precisely because of the third answer option. The p value is as stated.

**Reconciled more than one way, as required.**

1. Both rows of Table 3 sum exactly to their group totals.
2. Mann-Whitney rank sums: 37 x 31.08 + 43 x 48.60 = 3239.76 against the exact
   total rank sum N(N+1)/2 = 3240.
3. U recomputed from the printed mean ranks: 2089.80 - 43x44/2 = 1143.8, which
   is the printed 1144; and U1 + U2 = 1590.76 against n1 x n2 = 1591.
4. Effect size: r = Z/sqrt(N) = 3.36/sqrt(80) = 0.376, the printed 0.37.
5. The Discussion's "between 58.5% and 129.5% bigger than the control condition"
   independently pins Table 2's pairings: (3.19-1.39)/1.39 = 129.5% for the line
   chart and (2.71-1.71)/1.71 = 58.5% for the bubble, with the bar pair sitting
   between at 91.0%. This matters because pdftotext shifts that table's technique
   column by one row, so the pairing needed a check that did not depend on layout.
6. The same three checks reproduce the other two techniques' printed U values
   (1409 for aspect ratio, 1121 for area as quantity), which validates the
   reading of the tables rather than just of one row.

**TWO ERRATA IN THE PAPER, and the second one is a trap.**

- Table 3 prints the single uncertain response in the inverted-axis group as
  **"1 (0.02%)"**. 1 of 38 is 2.63 per cent, which is also the only value that
  makes that row sum to 100 (18.42 + 78.95 + 2.63). A typo. Authoring from the
  counts sidesteps it, which this project does anyway.
- **The Discussion (p. 1477) states the result backwards.** It says "the
  deceptive condition led to 97.5% incorrect responses whereas the control
  condition led to only 18.4% incorrect responses". Those are the two *correct*
  percentages, with the conditions swapped and relabelled as errors. Table 3 and
  the Results prose agree with each other independently, so they are right and
  that sentence is garbled. **Anyone sourcing this paper from its Discussion
  gets the lesson exactly inverted**, which is a pleasing hazard for a paper
  about misreading, and the reason the puzzle's provenance note says so on the
  record.

**The winnability decision, written down because it is a judgement call.** The
setup shows one arm only, which in this deck usually makes the hedge correct
(publication-bias is the precedent). Here it is **wrong**, and deliberately so.
Participants could answer improved, declined, or "I could not tell". A chart
that is merely hard produces hedging or a coin flip, so somewhere between a
third and a half of readers land on the truth by accident. 7 of 38 is far
*below* chance, and below chance is not what difficulty looks like: it is the
signature of a chart that is legible and pointing the wrong way. That inference
is available from the setup alone, so long as the framing names the three
options, which it does and which a puzzle test now enforces. The reveal still
does real work rather than restating the setup, because it kills the two rival
explanations the setup cannot: that the rise was slight, and that these
particular readers were weak.

Shape note, confirmed in the build: **no new shape needed**. Two groups, one
outcome, one stratum, `strataAreSeparateSamples` unset, setup filtered to the
inverted arm with `groupIds` and the reveal showing both. The truncated-axis
result from the same paper became the lesson's deep-dive example, which is what
lets the puzzle keep reversal and exaggeration apart as two distinct failures.

### Two techniques that turned out NOT to be separate lessons

Recorded so nobody sources them twice. **Question wording** effects (Rugg's
1941 forbid versus allow, "welfare" versus "assistance to the poor") are the
framing effect again: same thing, other words. Building them as their own
puzzles would put two names on one reasoning move, which is the mistake this
document already records being avoided once, for attrition against intention
to treat. They belong in the framing puzzle's review bank or as its deep-dive
examples, not as lessons.

**Rejected on partisanship.** Boykoff and Boykoff 2004 on balanced climate
coverage has clean printed counts and was rejected anyway: its subject makes one
side look uniquely foolish, which the project's plan forbids as architecture
rather than as taste. Correll et al 2020 on truncated axes is well sourced and
open, but its per-condition means are graphical rather than printed, and its
worked example is a partisan chart. Correll is also now moot as a truncated-axis
source: truncation is covered as the deep-dive example of the misleading-axis
puzzle, from Pandey's own second result.

### Manufactured doubt: sourced and non-partisan, but the effect is too small

Searched properly on 2026-07-29. **Koehler DJ. Can journalistic "false balance"
distort public perception of consensus in expert opinion? J Exp Psychol Appl.
2016;22(1):24-38. doi 10.1037/xap0000073.** Read in full from the open copy on
Zenodo (record 889605).

**Why it looked ideal.** Study 1 (a, b and c) uses **anonymised film reviews**:
2013 releases from Metacritic, with titles, actors, directors and writers
stripped out and replaced by placeholders. No country, no party, no contested
science, which is the property that rules out almost everything else in this
literature. Participants see how many positive, mixed and negative reviews a film
actually received and estimate its aggregate score out of 100. The **balance**
condition additionally sees the single most positive and single most negative
excerpt. Crucially, a **typical** condition sees two MODERATE excerpts and shows
no effect, which isolates the mechanism exactly: it is not that quotes distract,
it is that two EXTREME quotes manufacture the appearance of disagreement over
counts the reader can already see. That is manufactured doubt in miniature.

**Why it should not be built as it stands.** Table 1 (p. 6) prints means and
standard deviations, never counts, so the `rates` shape is out:

- Study 1a, good films: balance **88.4** (7.7) against control **90.0** (6.4).
- Study 1b, good films: balance **87.1** (9.4), control **89.6** (8.0), typical
  **89.8** (6.7).
- Study 1c, good films: balance **84.0** (8.4), control **88.9** (12.1), typical
  **87.1** (7.0). Mediocre films barely move in any study.

The raw effect on the headline number is **1.6 points in 1a and 4.9 in 1c, on a
0 to 100 scale**. Drawn as two bars that is a dead heat, which is the opposite of
a reveal. The dramatic result lives in a **standardised discrimination score
(z-diff)** that cannot be drawn honestly without inventing a picture, and 1a's
test on it is p = .048, which is fragile. If it is ever built, the only honest
framing is the narrowing of the good-minus-mediocre GAP (1c: 35.1 points in
control against 30.5 in balance), that needs a new shape, and the copy must not
dress a 13 per cent narrowing as a reversal.

Study 2 has the stronger design but is out on partisanship: its four issues come
from the IGM Economic Experts Panel and include a carbon tax and the minimum
wage.

**Verdict: sourced, verified, non-partisan, parked.** Do not build it until
either a better source turns up or the deck gains a shape that can carry a small
effect honestly. It is recorded here so nobody searches for it a third time.

### Anchoring: sourced from the canonical paper, and the better demonstration is the second one

Searched on 2026-07-29, as the measurable mechanism underneath the **Overton
window**, which was requested by name. The Overton window is a political-theory
metaphor with thin empirical grounding of its own; anchoring is the thing that
has actually been measured, and naming the mechanism rather than the label is
the call this document keeps making.

**Tversky A, Kahneman D. Judgment under uncertainty: heuristics and biases.
Science. 1974;185(4157):1124-1131**, section "Adjustment and Anchoring", p. 1128.
Read directly from the page. Note for whoever repeats this: the freely available
copies are JSTOR scans with no OCR layer, so `pdftotext` returns only the cover
sheet and the page has to be read as an image.

The page carries **two** demonstrations, and the famous one is not the better one.

**The wheel of fortune.** Subjects saw a number between 0 and 100 generated by
spinning a wheel of fortune in front of them, said whether the target quantity
was higher or lower, then estimated it. For the percentage of African countries
in the United Nations, **the median estimates were 25 and 45 for groups given 10
and 65** as starting points. The paper adds, in its own words, that payoffs for
accuracy did not reduce the effect. Non-partisan and canonical, but the true
value is a moving historical fact, which makes it awkward to score.

**The eight-number product, which is the one to build.** Two groups of high
school students had five seconds to estimate a product written on a blackboard.
One saw `1 x 2 x 3 x 4 x 5 x 6 x 7 x 8` and the other saw
`8 x 7 x 6 x 5 x 4 x 3 x 2 x 1`. **The median estimate for the ascending
sequence was 512 and for the descending sequence 2,250. The correct answer is
40,320.**

Why that is the stronger puzzle:

- **The two groups saw literally the same data.** Identical eight numbers,
  identical product, reversed order. Nothing else differs, which is the deck's
  core design tenet in its purest form.
- **The ground truth is checkable**, unlike a UN membership percentage that
  changes with history. 8 factorial is 40,320, and a test can assert it.
- The effect is **enormous and doubly so**: the descending median is 4.39 times
  the ascending one, and both are catastrophically low, at 1.3 and 5.6 per cent
  of the true value. So the reveal lands twice, first on the order effect and
  then on the fact that everybody was out by more than an order of magnitude.
- Completely non-partisan, and the mechanism, extrapolating from the first few
  steps of a computation, is visible in the stimulus itself.

**Constraints.** The outcomes are **medians, not counts**, so `rates` is out;
this is the same wall recorded above, but unlike Koehler the effect size is not
in doubt. The paper prints no sample sizes for either demonstration, no spread
around the medians and no test statistic, so the puzzle must not imply
precision it does not have: two medians and a true value are all that can
honestly be drawn. And it is a 1974 result on high school students under time
pressure; the modern replication literature should be cited alongside rather
than the 1974 paper carrying the claim alone.

Shape note: needs a small new one, or possibly an extension. Two estimates set
against a known true value is not something any current shape holds, since every
existing one either compares groups to each other or a single estimate to a
benchmark, and here both are needed at once, on a scale where 512, 2,250 and
40,320 have to be legible together.

Winnability sketch, to be decided deliberately rather than stumbled into. Show
the ascending problem and its median of 512, state that the other group saw the
identical numbers in reverse and had the same five seconds, and ask what they
said. "Higher" is deducible, because with only a few seconds you get through the
first two or three multiplications and extrapolate, and the descending sequence
starts 8 x 7 while the ascending starts 1 x 2. The hedge would therefore be
wrong. The size of the gap, and the fact that both groups were wildly under, is
what the reveal supplies.

### Cherry-picked baselines: still unsourced

Two new leads checked on 2026-07-29, both failing the rules:

- **Nadib KA, Kogan M, Lex A, Lisnic M. Guardrail selection in line charts to
  contextualize persuasive visualizations. Computer Graphics Forum (EuroVis)
  2026;45(3). arXiv:2605.19017.** Open access and squarely on the problem, but
  its scenarios are **COVID, elections and stocks**. Two of the three are exactly
  the contested-science and partisan ground the project excludes, and the
  outcomes are convincingness ratings and investment amounts rather than counts.
- **Visualization guardrails: designing interventions against cherry-picking in
  interactive data explorers. CHI 2025. doi 10.1145/3706598.3713385.** Could not
  be read here: unlike Pandey, this one is not free access and ACM returned 403
  to an unauthenticated fetch. 160 participants, four scenarios, outcomes again
  convincingness and investment amounts. Worth one look through institutional
  access, but the outcome type already points at the same wall.

### Illusory truth: sourced, verified, non-partisan, and worth building

Searched on 2026-07-29, as the measurable mechanism underneath two techniques
that were requested by name: the Big Lie and the firehose of falsehood. Neither
is a lesson in itself. Both are applications of one effect that has been
measured cleanly for fifty years, and naming the mechanism rather than the
political label is the same call this document already made when question
wording collapsed into the framing effect.

**Hassan A, Barber SJ. The effects of repetition frequency on the illusory truth
effect. Cognitive Research: Principles and Implications. 2021;6:38.**
doi 10.1186/s41235-021-00301-5. Open access. Read in full from the publisher PDF,
and both tables checked against it directly.

**Stimuli are neutral trivia** of ambiguous plausibility, of the "gestation
period of a giraffe" kind. No country, no party, no contested science. That is
the property that rules out most of this literature, and it is the reason this
paper beats the better-known illusory-truth work on political headlines.

Truth ratings on a 1 to 6 scale, by how many times the statement had been seen a
week earlier:

- **Experiment 1** (n = 51), Table 1: 0 (new) **3.76**, then 4.27, 4.51, 4.49,
  4.49, **4.69** at nine repetitions. Repeated against new overall, d = **1.00**.
- **Experiment 2** (n = 57), Table 2: 0 (new) **3.64**, then 4.26, 4.78, 4.72,
  **4.87** at twenty-seven repetitions. Repeated against new overall, d = **1.09**.

**Why this is the reveal.** The whole 0 to 9 gain in Experiment 1 is 0.93 points,
and the single first repetition is 0.51 of it, or **55 per cent**. In Experiment
2 the whole 0 to 27 gain is 1.23 points and the first repetition is 0.62, or
**50 per cent**. So hearing a thing once more does about as much as hearing it
another twenty-six times. That is genuinely counterintuitive, and it is the
opposite of what the firehose metaphor implies: the danger is not the volume, it
is that the very first repeat has already done half the work.

**Two honesty constraints for whoever builds it.** In Experiment 1 the only
significant step between ADJACENT repetition counts is 0 to 1 (d = 0.59), and
every later adjacent step is non-significant, which makes the plateau look total.
Experiment 2 is weaker on that point: 1 against 9, 18 and 27 all remain
significant (d = 0.62, 0.49, 0.80). So the defensible claim is the share of the
effect that the first repetition carries, **not** that later repetitions do
nothing. And the outcome is a rating mean rather than a count, so `rates` is out.

Shape note: this needs a new one, and for the right reason. The lesson is the
SHAPE of a dose-response curve, not the size of a gap. The setup can show only
the endpoints, 0 and 27 repetitions, which reads as a tidy steady climb; the
reveal adds the intermediate points and the climb turns out to be over almost
immediately. That is two views of the same published data. Note that the
endpoints alone do not let a player deduce the shape, so unless the framing
supplies more, the hedge would be CORRECT here, which is a deliberate decision to
make rather than to stumble into.

**The structural obstacle, worth stating once because it should shape every
future search.** This whole literature reports **rating means, not counts**.
Confoundle's preferred form (raw integers, rates derived) only appears where the
dependent variable is a *judgement that can be right or wrong*, as in Pandey's
inverted-axis arm. So a search for the next persuasion technique should target
studies whose outcome is accuracy, not agreement on a Likert scale, and should
treat "what percentage rated it higher" as a warning sign rather than a finding.


**Framing effect. SHIPPED** as the `framing-effect` puzzle (`same-choice-other-words`)
on a new `framing` shape, and it is the deck's first lesson outside medicine.
It carries the `psychology` and `media` tags, which is what opened those two
interests in the chooser: the chooser only offers tags a lesson actually
carries, so the guard test that asserted media was NOT offered had to be
updated, exactly as it was written to be. Verified from the primary source, and
it opens a new area. Tversky A, Kahneman D. The framing of decisions and the
psychology of choice. Science 1981;211(4481):453-458. Read directly from the
paper (p. 453), not from a summary.

Problem 1 [N = 152], the "Asian disease" expected to kill 600 people:
"If Program A is adopted, 200 people will be saved. [72 percent]" against
"If Program B is adopted, there is 1/3 probability that 600 people will be
saved, and 2/3 probability that no people will be saved. [28 percent]".

Problem 2 [N = 155], same cover story, outcomes reworded:
"If Program C is adopted 400 people will die. [22 percent]" against
"If Program D is adopted there is 1/3 probability that nobody will die, and 2/3
probability that 600 people will die. [78 percent]".

The two are arithmetically the same choice: of 600, saving 200 is 400 dying.
The authors say so outright, that "the two problems are effectively identical.
The only difference between them is that the outcomes are described in problem
1 by the number of lives saved and in problem 2 by the number of lives lost",
and that the shift runs "from risk aversion to risk taking". They also record
having "observed this reversal in several groups of respondents, including
university faculty and physicians", which is what makes it land for a clinical
audience rather than reading as a student-lab curiosity.

Three constraints for whoever builds it.

**The paper prints percentages and N, never counts.** 72 per cent of 152 is
109.44, so no integer numerator exists and the `rates` shape cannot take this
honestly. Either author the published percentages in a shape that accepts them
(the precedent is `effect` and `ecological`, which author printed coefficients),
or do not build it. Rounding to a plausible count would be inventing data, which
is the one thing this project does not do.

**The setup and reveal are two framings of one choice**, which is a clean fit
for the design tenet: show Problem 1's split, then Problem 2's split beside it,
with the note that 200 saved of 600 IS 400 dying.

**Non-partisan by construction**, which matters because this is the first
lesson outside medicine and the direction of travel is media and politics. The
open study on truncated y-axes (Correll et al 2020) was checked and rejected for
now: it is verified and open access, but its worked example is a Fox News tax
chart, and the project's non-partisanship rule wants a neutral chart substituted
before that one can ship.


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

**Differential versus non-differential misclassification.** Klemetti A, Saxen L,
Am J Public Health 1967;57(12):2071-2075, free full text on PMC (PMC1227998, page
scans only, so the tables were read from the images rather than from text).

Table 1, p. 2074, counts mothers. Two groups of 203, matched, all of whom had
already been interviewed prospectively in the fifth month of pregnancy and were
re-interviewed after delivery by the same midwife.

| | Normal child (203) | Deaths and malformations (203) |
|---|---|---|
| Drug consumption reported prospectively | 182 | 187 |
| Identical reply at re-interview | 33 | 23 |
| Additional retrospective information ("false-positive?") | 41 | 57 |
| Diseases reported prospectively | 34 | 43 |
| Identical reply at re-interview | 1 | 7 |
| Additional retrospective information | 11 | 15 |

The arithmetic reconciles three independent ways. The prospective rows sum to the
totals the prose states on p. 2072 (34 + 43 = 77 diseases, 182 + 187 = 369 drugs).
The two false-positive cells sum to 98, which is exactly the "retrospective
history only" figure printed in Figure 1 on p. 2073. And 98 of the 154 positive
retrospective drug replies (98 + 33 + 23) had no identical prospective history,
which is the "approximately two-thirds" the authors state on p. 2074.

The puzzle this supports. The setup is what a retrospective study would see: 57
drug exposures "remembered" by mothers of malformed or dead babies that their own
pregnancy records never held, against 41 among mothers of healthy babies. That
reads as textbook recall bias, grief manufacturing an explanation. The reveal is
the same women's answers from before they knew the outcome: the malformation
group repeated only 23 of their own 187 earlier reports (12.3 per cent) and the
normal group only 33 of 182 (18.1 per cent). Both groups had forgotten the large
majority of what they themselves had reported months earlier, and both invented
new exposures. The authors' own analysis found no significant difference in the
percentage of unidentical replies between the groups.

So this is not memory bent by outcome. It is memory that barely works, roughly
equally in everyone, which is non-differential misclassification, and its
consequence is the opposite of the one people fear: it does not manufacture an
association, it drags a real one toward the null.

Three honesty constraints for whoever authors it. The false-positive counts are
numerically higher in the case group (57 against 41) and the puzzle must not
claim they are identical; what the paper establishes is that the difference in
unidentical replies was not significant, on 203 per group. Figure 1 counts
drug-replies (420 of them) while Table 1 counts mothers (369), so the two must
never be mixed in one chart. And the correction already noted below stands: this
paper is cited across the literature as the origin of recall bias and explicitly
does not demonstrate it, which is itself worth saying in the lesson.

Shape note: this wants the setup and reveal to be two views of one dataset, which
they are, provided the authored observations are the full breakdown per group
(identical, not-identical, additional) and the setup view shows only the
additional slice. Whether that is a new `PuzzleData` member or an extension of
the rates shape is an open decision, not a settled one.

**Shipped.** Built on a new `agreement` `PuzzleData` member: each group carries
`reportedBefore`, `repeated` (a subset of it) and `invented`, the setup view
draws only the invented slice, and the reveal adds the repeated and forgotten
parts, so both beats are one dataset. Registered with ten `nm-*` review items and
three sound measurement decoys, and translated into all nine locales.

## Regression to the mean, shipped this session (Galton 1886)

Sourced to the paper that named the phenomenon. Galton F. Regression towards
mediocrity in hereditary stature. J Anthropol Inst 1886;15:246-263, Table I; DOI
10.2307/2841583. The counts were taken from the standard digitization of Table I
(928 adult children, distributed as HistData::Galton, female heights times 1.08 as
Galton did) and reconciled two ways: the per-group means below, and the overall
parent-to-child regression slope of 0.65 computed across all 928 pairs, which
reproduces Galton's own two-thirds finding.

Grouped rather than taken from single one-inch bins, because the extreme bins hold
only a handful of families and are noisy. Against a population average of about
68.3 inches:

- Tallest parents (mid-parent height 71 in or more, n = 66): parents averaged
  71.9 in, their grown children 70.8 (from 3.6 above the mean to 2.5 above).
- Shortest parents (65.5 in or less, n = 103): parents averaged 65.1 in, their
  children 66.2 (from 3.2 below to 2.1 below).

About a third of each gap closed on its own, in both directions, with nothing done
to the children. Needed a new `regression` `PuzzleData` member (group means at two
measurements against a fixed mean line, an `extremes` setup view and a `reversion`
reveal view), a pure derivation module with a test, a renderer, a share-card
glyph, and ten `rm-*` review items plus two sound decoys, all translated into the
nine non-English locales. Clinical deep-dive example: Wang N et al, home BP
regression, J Clin Hypertens 2020;22(7):1184-1191, DOI 10.1111/jch.13933.

## Effect modification versus confounding: shipped this session (Choi 2021)

Built on a new `interaction` `PuzzleData` member (a 2x2 of exposure against
outcome per stratum of a modifier), with a forest-plot renderer on a log
odds-ratio scale, a `crude` setup view and a `bystratum` reveal view, a pure
derivation module with a test, a share-card glyph, ten `em-*` review items plus
two sound decoys, and all ten locales.

The first pass assumed this could not be told with printed head-counts, because
the canonical alcohol x tobacco and asbestos x smoking sets use person-time. A
deeper search found one that can, open access and arithmetically exact.

Choi CK, Yang J, Kweon S-S, et al. Association between ALDH2 polymorphism and
esophageal cancer risk in South Koreans: a case-control study. BMC Cancer
2021;21:254; DOI 10.1186/s12885-021-07993-4; PMC7941978. Table 3, men's panel,
integer cell counts (cases / controls), genotype GA+AA versus GG as the exposure,
drinking status as the modifier:

- Current drinkers: GG 211 / 1782, GA+AA 219 / 421. OR = (219 x 1782) / (211 x
  421) = 4.39, matching the printed value.
- Nondrinkers: GG 123 / 556, GA+AA 198 / 718. OR = (198 x 556) / (123 x 718) =
  1.25, matching the printed value.
- Pool the two and the crude OR is (417 x 2338) / (334 x 1139) = 2.56; the
  Mantel-Haenszel adjusted OR is 2.44.

So the single number you get by pooling, or by "adjusting drinking away", is about
2.5 and reads as a moderate risk factor. The reveal is that the genotype does
almost nothing in nondrinkers (1.25, its confidence interval crossing 1) and
quadruples the odds in drinkers (4.39): a real subgroup effect that adjustment
hides, which is exactly effect modification rather than confounding, and must be
reported stratum by stratum, not averaged into one number. Interaction P < 0.001.

Two honesty constraints for whoever authors it. Frame the genotype as the exposure
and drinking as the modifier, as the paper does; framing alcohol as the exposure
on these cells gives an implausible protective crude OR (an artefact of the
sick-quitter nondrinkers and of not adjusting for smoking). And use the men's
panel: the women's ORs are age-adjusted and do not reconcile from the raw cells.

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
