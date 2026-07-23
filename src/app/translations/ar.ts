/**
 * Arabic dictionary (Modern Standard Arabic): English source string, Arabic
 * translation. Keys must match the English text exactly. The app renders RTL for
 * Arabic. French was used only as a secondary reference.
 */
export const ar: Record<string, string> = {
  // ---- UI chrome (buttons, labels, section headers) ----
  "The skill": "المهارة",
  "Where this shows up": "أين يظهر هذا",
  "See it in the wild": "شاهده في الواقع",
  "Why it happens": "لماذا يحدث",
  "Same trap, other places": "الفخ نفسه، في أماكن أخرى",
  Source: "المصدر",
  "Make my card →": "أنشئ بطاقتي ←",
  "Go deeper on this idea →": "تعمّق أكثر في هذه الفكرة ←",
  "Commit to see the reveal. No peeking.":
    "اختر إجابتك لتكشف الحل. لا استراق للنظر.",
  "Reveal the answer": "اكشف الإجابة",
  "Name the skill →": "سمِّ المهارة ←",
  "Play again": "العب مرة أخرى",
  "The lurking variable": "المتغير الكامن",
  "Nicely done, you didn't take the number at face value.":
    "أحسنت، لم تأخذ الرقم على علّاته.",
  "So does almost everyone. That's exactly the trap.":
    "وكذلك يفعل الجميع تقريباً. هذا هو الفخ بالضبط.",
  "You caught it": "لقد التقطته",
  "Most people miss this": "معظم الناس يفوتهم هذا",
  "You picked": "لقد اخترت",
  Replay: "أعد اللعب",
  "Who each treatment actually treated":
    "مَن عالج كل علاج منهما فعلياً",
  "So what's the skill? →": "إذن، ما المهارة؟ ←",
  // scope tags (right of the figure caption)
  Overall: "إجمالاً",
  "By subgroup": "حسب المجموعة الفرعية",
  "The facts": "الحقائق",
  "The reality": "الحقيقة",
  Observed: "المُلاحَظ",
  Explained: "المُفسَّر",
  Survivors: "الناجون",
  "The full picture": "الصورة الكاملة",
  // category names (humanized)
  "Causal reasoning": "الاستدلال السببي",
  "Statistical reasoning": "الاستدلال الإحصائي",
  // tags
  Everyday: "الحياة اليومية",
  Clinical: "سريري",
  Research: "بحثي",
  Statistics: "إحصاء",
  Diagnosis: "تشخيص",
  Screening: "فحص استقصائي",
  Epidemiology: "علم الأوبئة",
  Pharmacology: "علم الأدوية",
  Psychology: "علم النفس",
  Biology: "علم الأحياء",
  Technology: "التكنولوجيا",
  Economics: "الاقتصاد",
  Politics: "السياسة",
  Education: "التعليم",
  Finance: "المالية",
  Business: "الأعمال",
  Law: "القانون",
  Sports: "الرياضة",
  History: "التاريخ",
  Media: "الإعلام",
  "Demo · try any puzzle": "عرض تجريبي · جرّب أي أحجية",
  // frequency view (base-rate puzzle)
  "1 in": "1 من",
  "How common it is": "مدى شيوعها",
  "Test catches it": "الاختبار يكتشفها",
  Always: "دائماً",
  "False-alarm rate": "معدل الإنذارات الكاذبة",
  "Positive tests": "الاختبارات الإيجابية",
  of: "من",
  actually: "فعلياً",
  chance: "احتمال",
  "false alarm": "إنذار كاذب",
  // wager + stats
  "How sure are you?": "ما مدى تأكدك؟",
  Hunch: "حدس",
  "Fairly sure": "متأكد إلى حد ما",
  Certain: "متيقن",
  "Pick one, then stake how sure you are":
    "اختر واحداً، ثم راهن بمدى تأكدك",
  pts: "نقطة",
  Today: "اليوم",
  Streak: "سلسلة",
  Best: "الأفضل",
  Caught: "المُلتقَطة",
  Calibration: "المعايرة",
  "You beat {pct}% of players today":
    "تفوّقت على {pct}% من اللاعبين اليوم",
  "A new puzzle every day. Keep the streak alive.":
    "أحجية جديدة كل يوم. حافظ على استمرار السلسلة.",
  "Sharp eye, and you called it.":
    "عين ثاقبة، وقد توقعتها.",
  "Nicely spotted.": "التقاط جميل.",
  "Good instinct.": "حدس جيد.",
  "Ouch. Confidently wrong, the classic trap.":
    "آخ. مخطئ بثقة، الفخ الكلاسيكي.",
  "So does almost everyone. That's the trap.":
    "وكذلك يفعل الجميع تقريباً. هذا هو الفخ.",
  "You sensed something was off, but went with it anyway.":
    "شعرت أن شيئاً ما ليس على ما يرام، لكنك مضيت فيه رغم ذلك.",
  // friends board
  "Friends board": "لوحة الأصدقاء",
  "Your name": "اسمك",
  "Copy result": "انسخ النتيجة",
  Copied: "تم النسخ",
  Share: "شارك",
  "Paste your friends' results here":
    "الصق نتائج أصدقائك هنا",
  "Add to board": "أضف إلى اللوحة",
  // trap hunt
  "Trap Hunt": "صيد الفخاخ",
  "Some of these are sound. Some hide a trap.":
    "بعض هذه الاستدلالات سليم، وبعضها يخفي فخاً.",
  "Sound reasoning": "استدلال سليم",
  "There's a trap": "هناك فخ",
  "Which trap?": "أي فخ؟",
  Rank: "الرتبة",
  Done: "تم",
  "Trap Hunt unlocked": "تم فتح صيد الفخاخ",
  "Can you still spot the traps?":
    "هل ما زلت تستطيع رصد الفخاخ؟",
  Novice: "مبتدئ",
  Sceptic: "متشكّك",
  Detective: "محقّق",
  Analyst: "محلّل",
  "Sharp eye": "عين ثاقبة",

  // ---- shared share-card captions ----
  "Caught it. Bet you can't.": "التقطته. أراهن أنك لن تستطيع.",
  "I totally fell for this.": "وقعت في الفخ تماماً.",

  // ==== Simpson's paradox (kidney stones) ====
  "Treatment B cures more patients overall. Which would you pick?":
    "العلاج B يشفي مرضى أكثر إجمالاً. أيهما تختار؟",
  "Two kidney-stone treatments, 350 patients each. On overall success rate, Treatment B comes out ahead. Same illness, same goal, one number to go on.":
    "علاجان لحصوات الكلى، 350 مريضاً لكل منهما. من حيث معدل النجاح الإجمالي، يتقدم العلاج B. المرض نفسه، والهدف نفسه، ورقم واحد للاعتماد عليه.",
  "Which treatment would you pick?": "أي علاج تختار؟",
  "Success rate": "معدل النجاح",
  "Treatment A, open surgery": "العلاج A، جراحة مفتوحة",
  "Treatment B, keyhole (PCNL)": "العلاج B، عبر الجلد بالمنظار (PCNL)",
  "Small stones": "حصوات صغيرة",
  "Large stones": "حصوات كبيرة",
  "Treatment B": "العلاج B",
  "83% overall": "83% إجمالاً",
  "Treatment A": "العلاج A",
  "78% overall": "78% إجمالاً",
  "Treatment A actually wins, for both stone sizes.":
    "في الواقع، العلاج A هو الفائز، لكلا حجمي الحصوات.",
  "Stone size (case severity)":
    "حجم الحصوة (شدة الحالة)",
  "A and B weren't treating the same patients. A got mostly the hard cases (large stones), while B got mostly the easy ones. Everyone does worse on hard cases, so A's overall average sinks even though A wins in each group:":
    "لم يكن A وB يعالجان المرضى أنفسهم. فقد تلقى A غالبية الحالات الصعبة (الحصوات الكبيرة)، بينما تلقى B غالبية الحالات السهلة. الجميع يحقق نتائج أسوأ في الحالات الصعبة، لذا ينخفض المتوسط الإجمالي لـ A رغم أن A يفوز في كل مجموعة:",
  "Simpson's paradox": "مفارقة سيمبسون",
  "An overall trend can reverse once you account for a lurking variable that's split unevenly between the groups.":
    "قد ينعكس الاتجاه الإجمالي بمجرد أن تأخذ في الحسبان متغيراً كامناً موزَّعاً بشكل غير متساوٍ بين المجموعات.",
  "Whenever two groups are compared with one pooled rate, ask what got mixed together to make that number, and whether the groups were even up against the same odds. Stone size is the clearest confounder here; it's rarely the only one.":
    "كلما قُورنت مجموعتان بمعدل مجمَّع واحد، اسأل عمّا جرى خلطه معاً لإنتاج ذلك الرقم، وعمّا إذا كانت المجموعتان تواجهان الاحتمالات نفسها أصلاً. حجم الحصوة هو أوضح عامل مربِك هنا، ونادراً ما يكون الوحيد.",
  "The 'combined' score isn't a fresh measurement; it's the group scores blended together, and bigger groups count for more. When one side is packed with easy cases and the other with hard ones, that blend pulls their combined scores in opposite directions. So one option can lead in the easy group and in the hard group, yet still trail overall, because it handled most of the hard cases, and its blended score sits closer to that lower number. The cure is a fair split: give both sides the same mix of easy and hard cases (exactly what a randomised trial does), and the reversal can't happen.":
    "الدرجة «المجمَّعة» ليست قياساً جديداً، بل هي مزيج من درجات كل مجموعة، والمجموعات الأكبر لها وزن أكبر. عندما يكون أحد الطرفين مكتظاً بالحالات السهلة والآخر بالحالات الصعبة، فإن هذا المزج يجذب درجاتهما المجمَّعة في اتجاهين متعاكسين. لذا يمكن لخيار أن يتصدر في المجموعة السهلة وفي المجموعة الصعبة، ومع ذلك يظل متأخراً إجمالاً، لأنه تولى معظم الحالات الصعبة، فتقترب درجته المجمَّعة من ذلك الرقم الأدنى. العلاج هو التوزيع العادل: امنح الطرفين المزيج نفسه من الحالات السهلة والصعبة (وهو بالضبط ما تفعله التجربة العشوائية)، عندئذٍ يستحيل حدوث الانعكاس.",
  "University admissions": "القبول الجامعي",
  "In 1973, Berkeley's graduate schools admitted 44% of men but only 35% of women. It looked like plain bias. Yet department by department, women were admitted at about the same rate as men, or higher. Women simply applied more often to the most competitive departments, where almost everyone was turned away. The gap was about where people applied, not who was deciding.":
    "في عام 1973، قبلت كليات الدراسات العليا في بيركلي 44% من الرجال مقابل 35% فقط من النساء. بدا الأمر تمييزاً صريحاً. ومع ذلك، قسماً بعد قسم، كانت النساء يُقبَلن بمعدل يقارب معدل الرجال أو أعلى منه. ببساطة، كانت النساء يتقدمن أكثر إلى أكثر الأقسام تنافسية، حيث يُرفض الجميع تقريباً. كانت الفجوة تتعلق بالمكان الذي يتقدم إليه الناس، لا بمن يتخذ القرار.",
  "Baseball batting averages": "معدلات الضرب في البيسبول",
  "David Justice out-hit Derek Jeter in 1995 (.253 to .250) and again in 1996 (.321 to .314). But over the two seasons combined, Jeter came out ahead, .310 to .270. Each single year said Justice; the two years together said Jeter, because the players had very different numbers of at-bats in their strong and weak seasons.":
    "تفوق ديفيد جاستِس على ديريك جيتر في الضرب عام 1995 (0.253 مقابل 0.250) ثم مجدداً عام 1996 (0.321 مقابل 0.314). لكن على مدى الموسمين مجتمعين، تقدم جيتر، 0.310 مقابل 0.270. كل عام على حدة كان يشير إلى جاستِس، بينما العامان معاً كانا يشيران إلى جيتر، لأن اللاعبَين كان لهما أعداد مختلفة جداً من محاولات الضرب في مواسمهما القوية والضعيفة.",
  "COVID-19 death rates": "معدلات الوفيات بكوفيد-19",
  "Early in 2020, the reported death rate among COVID cases was higher in Italy than in China overall. But broken down by age, Italy's rate was lower in every age group. Italy simply had far more older patients, who are at higher risk, so pooling all ages together made Italy look worse than a fair, age-for-age comparison showed.":
    "في أوائل عام 2020، كان معدل الوفيات المُبلَّغ عنه بين حالات كوفيد أعلى في إيطاليا منه في الصين إجمالاً. لكن عند التفصيل حسب العمر، كان معدل إيطاليا أقل في كل فئة عمرية. ببساطة، كان لدى إيطاليا عدد أكبر بكثير من المرضى المسنين، وهم الأكثر عرضة للخطر، لذا فإن تجميع كل الأعمار معاً جعل إيطاليا تبدو أسوأ مما تُظهره مقارنة عادلة، عمراً بعمر.",
  "Simpson's paradox, a reasoning trap.":
    "مفارقة سيمبسون، فخ في الاستدلال.",
  "One choice can win in every single group, yet lose the moment you lump all the groups together. It sounds impossible, but it's real. It happens when the groups aren't a fair comparison: one side quietly got the easy cases, the other got the hard ones. So the big combined number says one thing while the group-by-group numbers say the opposite, and it's the big number that fools you.":
    "يمكن لخيار أن يفوز في كل مجموعة على حدة، ومع ذلك يخسر لحظة أن تجمع كل المجموعات معاً. يبدو الأمر مستحيلاً، لكنه حقيقي. يحدث ذلك عندما لا تشكل المجموعات مقارنة عادلة: فأحد الطرفين حصل بهدوء على الحالات السهلة، والآخر على الحالات الصعبة. فيقول الرقم الإجمالي الكبير شيئاً بينما تقول الأرقام مجموعةً مجموعةً عكسه، والرقم الكبير هو الذي يخدعك.",
  "The 350/350 two-treatment table is as presented by Julious & Mullee (1994), drawn from the Charig et al. (1986) clinical series (which originally compared three modalities).":
    "جدول العلاجين 350/350 معروض كما قدمه جوليوس ومولي (1994)، مستمد من السلسلة السريرية لتشاريغ وزملائه (1986) (التي قارنت في الأصل ثلاث طرائق).",

  // ==== Base-rate fallacy (medical test) ====
  "A near-perfect test says you're sick. How worried should you be?":
    "اختبار شبه مثالي يقول إنك مريض. إلى أي مدى ينبغي أن تقلق؟",
  "This disease is rare, about 1 in 1,000 people have it. The test never misses it when it's really there, and it raises a false alarm on only about 1 in 20 healthy people. Your result just came back positive.":
    "هذا المرض نادر، إذ يصيب نحو 1 من كل 1000 شخص. لا يفوت الاختبار المرض أبداً عندما يكون موجوداً فعلاً، ولا يطلق إنذاراً كاذباً إلا لدى نحو 1 من كل 20 شخصاً سليماً. وقد جاءت نتيجتك إيجابية للتو.",
  "What's the chance you actually have the disease?":
    "ما احتمال أن تكون مصاباً بالمرض فعلاً؟",
  "In 1,000 people": "من كل 1000 شخص",
  "have the disease": "مصابون بالمرض",
  "test positive": "نتيجتهم إيجابية",
  "About 95%": "نحو 95%",
  "the test is 95% accurate": "دقة الاختبار 95%",
  "About half": "نحو النصف",
  "50/50": "50/50",
  "About 2%": "نحو 2%",
  "roughly 1 in 50": "تقريباً 1 من كل 50",
  "Positive, but almost certainly a false alarm.":
    "إيجابية، لكنها شبه مؤكدة أنها إنذار كاذب.",
  "The base rate": "المعدل الأساسي",
  "A rare disease flips the odds":
    "مرض نادر يقلب الاحتمالات",
  "Because almost nobody has the disease, the test's small error rate does the heavy lifting. In 1,000 people, only 1 is truly sick, but about 50 healthy people also get a positive. So among the ~51 positive results, just 1 is real. A positive barely nudges you from “very unlikely” to “still unlikely.”":
    "لأن المرض لا يصيب أحداً تقريباً، فإن معدل الخطأ الصغير للاختبار هو ما يقوم بالعبء الأكبر. من بين 1000 شخص، شخص واحد فقط مريض حقاً، لكن نحو 50 شخصاً سليماً يحصلون أيضاً على نتيجة إيجابية. لذا فمن بين نحو 51 نتيجة إيجابية، واحدة فقط حقيقية. النتيجة الإيجابية لا تنقلك إلا بالكاد من «مستبعد جداً» إلى «ما زال مستبعداً».",
  "The base-rate fallacy": "مغالطة المعدل الأساسي",
  "When something is rare, even a very accurate test throws up far more false alarms than real cases, so a positive result can still mean you're probably fine.":
    "عندما يكون الشيء نادراً، حتى الاختبار الدقيق جداً يطلق إنذارات كاذبة أكثر بكثير من الحالات الحقيقية، لذا قد تظل النتيجة الإيجابية تعني أنك على الأرجح بخير.",
  "The fix is to think in whole people, not percentages: picture 1,000 of them, count the true positives and the false alarms, and compare. Always ask how common the thing is before you trust a positive.":
    "الحل هو التفكير بأشخاص كاملين، لا بنسب مئوية: تخيّل 1000 منهم، عُدّ الإيجابيات الحقيقية والإنذارات الكاذبة، ثم قارن. اسأل دائماً عن مدى شيوع الشيء قبل أن تثق بنتيجة إيجابية.",
  "A test's accuracy and your actual odds are two different things. Accuracy is measured on people we already know are sick or healthy. But a positive result asks the reverse question (given this positive, am I sick?), and that depends on how many sick people there were to find in the first place. If only 1 in 1,000 has the disease, the huge healthy majority produces a flood of false alarms that swamps the single real case. Make the disease common and the same test looks excellent; make it rare and a positive means little on its own.":
    "دقة الاختبار واحتمالاتك الفعلية شيئان مختلفان. تُقاس الدقة على أشخاص نعرف مسبقاً أنهم مرضى أو أصحاء. لكن النتيجة الإيجابية تطرح السؤال المعاكس (بالنظر إلى هذه النتيجة الإيجابية، هل أنا مريض؟)، وهذا يتوقف على عدد المرضى الذين كان يمكن العثور عليهم أصلاً. فإذا كان 1 فقط من كل 1000 مصاباً بالمرض، فإن الأغلبية السليمة الهائلة تنتج سيلاً من الإنذارات الكاذبة يغرق الحالة الحقيقية الوحيدة. اجعل المرض شائعاً فيبدو الاختبار نفسه ممتازاً، واجعله نادراً فلا تعني النتيجة الإيجابية وحدها إلا القليل.",
  "Even doctors slip": "حتى الأطباء يزلّون",
  "Researchers put this exact question to doctors and medical staff: a disease in 1 in 1,000, a test with a 5% false-alarm rate. The most common answer was 95%. The average was 56%. Only about 1 in 5 gave the correct answer of roughly 2%.":
    "طرح الباحثون هذا السؤال بالضبط على أطباء وطواقم طبية: مرض يصيب 1 من كل 1000، واختبار بمعدل إنذارات كاذبة 5%. كانت الإجابة الأكثر شيوعاً 95%. وكان المتوسط 56%. ونحو 1 فقط من كل 5 أعطى الإجابة الصحيحة، أي نحو 2%.",
  "Think in people, not percentages":
    "فكّر بأشخاص، لا بنسب مئوية",
  "The simplest cure is wording. Pose the same problem in natural frequencies (“1 in 1,000 people” and “about 50 false alarms” rather than “0.1%” and “5%”), and far more people, doctors included, get it right.":
    "أبسط علاج هو الصياغة. اطرح المشكلة نفسها بتكرارات طبيعية («1 من كل 1000 شخص» و«نحو 50 إنذاراً كاذباً» بدلاً من «0.1%» و«5%»)، وعندها يصيبها عدد أكبر بكثير من الناس، ومن بينهم الأطباء.",
  "The base-rate fallacy, a reasoning trap.":
    "مغالطة المعدل الأساسي، فخ في الاستدلال.",
  "A test can be 95% accurate and a positive result can still mean you're almost certainly fine. The trick is how rare the thing is. If only 1 in 1,000 people have a disease, then among everyone who tests positive, the few real cases are buried under a pile of false alarms. Accuracy isn't the same as your actual odds; you have to ask how common it is first.":
    "قد يكون الاختبار دقيقاً بنسبة 95% ومع ذلك قد تعني النتيجة الإيجابية أنك بخير شبه مؤكد. الخدعة تكمن في مدى ندرة الشيء. فإذا كان 1 فقط من كل 1000 شخص مصاباً بمرض، فإن من بين كل من تأتي نتيجتهم إيجابية، تكون الحالات الحقيقية القليلة مدفونة تحت كومة من الإنذارات الكاذبة. الدقة ليست هي احتمالاتك الفعلية، عليك أولاً أن تسأل عن مدى شيوعه.",

  // ==== Correlation is not causation (chocolate / Nobel) ====
  "More chocolate, more Nobel Prizes. Should your country stock up?":
    "شوكولاتة أكثر، جوائز نوبل أكثر. هل ينبغي لبلدك أن يخزّن منها؟",
  "It's a real, published finding: across 23 countries, the more chocolate people eat, the more Nobel laureates the country has produced, a strong correlation (r ≈ 0.79). The trend is hard to argue with.":
    "إنها نتيجة حقيقية ومنشورة: عبر 23 دولة، كلما أكل الناس شوكولاتة أكثر، زاد عدد الحائزين على نوبل الذين أنجبهم البلد، ارتباط قوي (r ≈ 0.79). ويصعب الجدال في هذا الاتجاه.",
  "So, does eating chocolate help win Nobel Prizes?":
    "إذن، هل يساعد أكل الشوكولاتة على الفوز بجوائز نوبل؟",
  "Across 23 countries": "عبر 23 دولة",
  "Chocolate eaten": "الشوكولاتة المستهلَكة",
  "Nobel prizes": "جوائز نوبل",
  "A country's wealth": "ثروة البلد",
  "r ≈ 0.79": "r ≈ 0.79",
  "Yes, chocolate boosts brainpower":
    "نعم، الشوكولاتة تعزّز قوة الدماغ",
  "the trend is strong": "الاتجاه قوي",
  "No, it's a pure fluke": "لا، إنها مجرد مصادفة محضة",
  coincidence: "مصادفة",
  "No, a third thing drives both":
    "لا، شيء ثالث يحرّك كليهما",
  "a common cause": "سبب مشترك",
  "The chocolate isn't doing anything.": "الشوكولاتة لا تفعل شيئاً.",
  "The common cause": "السبب المشترك",
  "A country's wealth pulls both up":
    "ثروة البلد ترفع كليهما",
  "Wealthier countries can afford more chocolate AND fund more universities, labs and research, which is what actually wins Nobel Prizes. Wealth drives both, so chocolate and Nobels rise together without one causing the other. Hand out free chocolate and you'd get sweeter teeth, not more laureates.":
    "تستطيع البلدان الأغنى شراء شوكولاتة أكثر وتمويل مزيد من الجامعات والمختبرات والأبحاث، وهو ما يفوز فعلاً بجوائز نوبل. الثروة تحرّك كليهما، لذا ترتفع الشوكولاتة وجوائز نوبل معاً دون أن يسبب أحدهما الآخر. وزّع شوكولاتة مجانية وستحصل على أسنان أكثر تسوّساً، لا على مزيد من الفائزين.",
  "Correlation ≠ causation": "الارتباط ≠ السببية",
  "Two things moving together doesn't mean one causes the other. Often a third thing is quietly driving both.":
    "تحرّك شيئين معاً لا يعني أن أحدهما يسبب الآخر. وكثيراً ما يكون شيء ثالث يحرّك كليهما بهدوء.",
  "When you see a strong link, run through the possibilities before believing X causes Y: maybe Y causes X, maybe a common cause drives both, or maybe it's chance. Usually only a controlled comparison can tell which.":
    "عندما ترى صلة قوية، استعرض الاحتمالات قبل أن تصدق أن X يسبب Y: ربما Y يسبب X، وربما سبب مشترك يحرّك كليهما، وربما هي مجرد صدفة. وعادة لا يمكن الحسم إلا بمقارنة مضبوطة.",
  "A correlation only says two things tend to move together. That can happen for several reasons: one really does cause the other; the causation runs the other way; a hidden third factor drives both (a common cause, like hot weather driving both ice-cream sales and drownings); or it's a coincidence, which gets more likely the more data you sift through. Spotting a correlation is the easy part. Working out which of these is behind it is the real job, and usually needs an experiment, not just a chart.":
    "الارتباط يقول فقط إن شيئين يميلان إلى التحرك معاً. ويمكن أن يحدث ذلك لأسباب عدة: أحدهما يسبب الآخر فعلاً، أو أن السببية تسير في الاتجاه المعاكس، أو أن عاملاً ثالثاً خفياً يحرّك كليهما (سبب مشترك، مثل الطقس الحار الذي يرفع مبيعات المثلجات وحالات الغرق معاً)، أو أنها مصادفة تزداد احتمالاً كلما نخّلت مزيداً من البيانات. رصد الارتباط هو الجزء السهل. أما معرفة أيٍّ من هذه يقف خلفه فهو العمل الحقيقي، وهو يحتاج عادة إلى تجربة، لا إلى مجرد رسم بياني.",
  "Storks and babies": "اللقالق والأطفال",
  "Across European countries, the ones with more storks really do have more human births, a statistically significant link. The legend isn't true: larger countries simply have room for both more storks and more people.":
    "عبر الدول الأوروبية، فإن تلك التي فيها لقالق أكثر لديها فعلاً مواليد بشرية أكثر، صلة ذات دلالة إحصائية. الأسطورة ليست صحيحة: ببساطة، لدى البلدان الأكبر متسع للقالق أكثر وللبشر أكثر على حد سواء.",
  "Nicolas Cage and drownings": "نيكولاس كيج وحالات الغرق",
  "The number of films Nicolas Cage releases in a year tracks the number of people who drown in swimming pools. Nobody thinks one causes the other; line up enough unrelated trends and some will match by pure chance.":
    "عدد الأفلام التي يطرحها نيكولاس كيج في السنة يواكب عدد الأشخاص الذين يغرقون في حمامات السباحة. لا أحد يظن أن أحدهما يسبب الآخر، فإذا صفَفت ما يكفي من الاتجاهات غير المترابطة سيتطابق بعضها بمحض المصادفة.",
  "Correlation ≠ causation, a reasoning trap.":
    "الارتباط ≠ السببية، فخ في الاستدلال.",
  "Two things can rise and fall together perfectly and still have nothing to do with each other. Very often a hidden third thing is pulling both strings at once, so it looks like one causes the other when neither does. Before you believe a headline that “X is linked to Y,” ask what else could be driving both.":
    "قد يصعد شيئان ويهبطان معاً بتطابق تام ومع ذلك لا علاقة لأحدهما بالآخر. وكثيراً جداً ما يكون شيء ثالث خفي يحرّك الخيطين في آن واحد، فيبدو أن أحدهما يسبب الآخر بينما لا يفعل أيٌّ منهما ذلك. قبل أن تصدق عنواناً يقول إن «X مرتبط بـ Y»، اسأل عمّا قد يحرّك كليهما.",

  // ==== Survivorship bias (bombers) ====
  "Bombers come home riddled with bullet holes. Where do you add the armour?":
    "القاذفات تعود إلى الديار مثقوبة بالرصاص. أين تضيف الدرع؟",
  "In WWII, returning bombers were peppered with damage, heaviest on the wings and body, while the engines and cockpit came back almost untouched. Armour is heavy, so you can only reinforce a few areas.":
    "في الحرب العالمية الثانية، كانت القاذفات العائدة مرصّعة بالأضرار، أشدها على الأجنحة والهيكل، بينما عادت المحركات وقمرة القيادة سليمة تقريباً. الدرع ثقيل، لذا لا يمكنك تعزيز سوى بضع مناطق.",
  "Where should the armour go?": "أين ينبغي وضع الدرع؟",
  "Returning bombers": "القاذفات العائدة",
  "hits on planes that came back": "الإصابات على الطائرات التي عادت",
  "armour here, the lost planes' hits":
    "درّع هنا، إصابات الطائرات المفقودة",
  "The wings and body": "الأجنحة والهيكل",
  "where the holes are": "حيث توجد الثقوب",
  "Spread it evenly": "وزّعه بالتساوي",
  "play it safe": "اسلك الطريق الآمن",
  "The engines and cockpit": "المحركات وقمرة القيادة",
  "where there are no holes": "حيث لا توجد ثقوب",
  "Armour where the holes aren't.":
    "درّع حيث لا توجد الثقوب.",
  "The missing planes": "الطائرات المفقودة",
  "You only see the survivors": "أنت لا ترى سوى الناجين",
  "These are the planes that made it home. The ones hit in the engine or cockpit didn't, so their damage never shows up in the data. The holes on the survivors map out exactly where a bomber can be shot and still fly. The clean spots are the fatal ones: armour those.":
    "هذه هي الطائرات التي بلغت الديار. أما تلك التي أُصيبت في المحرك أو قمرة القيادة فلم تعد، لذا لا تظهر أضرارها في البيانات أبداً. تحدد ثقوب الناجين بالضبط أين يمكن أن تُصاب القاذفة وتظل تطير. المناطق النظيفة هي القاتلة: درّع تلك المناطق.",
  "Survivorship bias": "تحيز الناجين",
  "When you only look at the winners, the failures become invisible, and they often hold the real lesson.":
    "عندما تنظر إلى الفائزين فقط، يصبح الفاشلون غير مرئيين، وهم غالباً من يحملون الدرس الحقيقي.",
  "Before drawing a conclusion, ask who's missing from the data. The planes that didn't return, the funds that closed, the businesses that folded: they were quietly filtered out, and putting them back can flip the answer.":
    "قبل استخلاص أي نتيجة، اسأل من الغائب عن البيانات. الطائرات التي لم تعد، والصناديق التي أُغلقت، والشركات التي طوت أبوابها: جرت تصفيتها بهدوء، وإعادتها إلى الحسبان قد يقلب الإجابة.",
  "Survivorship bias creeps in whenever your data has quietly been filtered to keep only the things that “made it”: returning planes, funds still trading, companies still around. You never see the ones that failed and dropped out, and because the survivors share whatever helped them survive, that trait looks far more common, or more effective, than it really is. The fix is to hunt for the missing group and ask what the full picture would show. (The real Wald did more than point at a diagram: he built a statistical method to estimate each part's vulnerability from the survivors' damage.)":
    "يتسلل تحيز الناجين كلما جرت تصفية بياناتك بهدوء للإبقاء فقط على الأشياء التي «نجحت»: الطائرات العائدة، والصناديق التي ما زالت متداولة، والشركات التي ما زالت قائمة. أنت لا ترى أبداً تلك التي فشلت وسقطت، ولأن الناجين يتشاركون كل ما ساعدهم على النجاة، تبدو تلك السمة أكثر شيوعاً، أو أكثر فعالية، مما هي عليه حقاً. الحل هو البحث عن المجموعة الغائبة والتساؤل عمّا ستظهره الصورة الكاملة. (فعل فالد الحقيقي أكثر من الإشارة إلى مخطط: فقد ابتكر طريقة إحصائية لتقدير هشاشة كل جزء انطلاقاً من أضرار الناجين.)",
  "Falling cats": "القطط الساقطة",
  "Vets found that cats falling from higher floors often arrived with fewer injuries than those from lower floors. Part of the reason is grim survivorship: a cat that didn't survive the fall was never brought in, so the hospital's data only counts the ones that lived.":
    "وجد الأطباء البيطريون أن القطط الساقطة من الطوابق الأعلى كثيراً ما تصل بإصابات أقل من تلك الساقطة من طوابق أدنى. جزء من السبب هو تحيز ناجين قاتم: القطة التي لم تنجُ من السقوط لم تُحضَر قط، لذا لا تحصي بيانات المستشفى سوى تلك التي بقيت على قيد الحياة.",
  "Star mutual funds": "الصناديق الاستثمارية النجمة",
  "Look at the funds still on offer today and active management looks great. But funds that did badly get quietly closed and dropped from the records, so the survivors flatter the whole industry. Counting the dead funds cuts the average return by over a percentage point a year.":
    "انظر إلى الصناديق المعروضة اليوم فتبدو الإدارة النشطة رائعة. لكن الصناديق التي حققت أداءً سيئاً تُغلَق بهدوء وتُحذف من السجلات، فيجمّل الناجون القطاع كله. واحتساب الصناديق المندثرة يخفض متوسط العائد بأكثر من نقطة مئوية سنوياً.",
  "Survivorship bias, a reasoning trap.":
    "تحيز الناجين، فخ في الاستدلال.",
  "It's easy to study the winners, the survivors, the successes, the things still standing, and copy what they have in common. But the failures are invisible: they dropped out of the data. Whatever helped the survivors survive looks far more powerful than it is, because you never see everyone it didn't save. Before copying the winners, ask who's missing.":
    "من السهل دراسة الفائزين، والناجين، والنجاحات، والأشياء التي ما زالت قائمة، ونسخ ما يشتركون فيه. لكن حالات الفشل غير مرئية: لقد سقطت من البيانات. وأياً كان ما ساعد الناجين على النجاة يبدو أقوى بكثير مما هو عليه، لأنك لا ترى قط كل من لم ينقذهم. قبل أن تنسخ الفائزين، اسأل من الغائب.",

  // ==== Prosecutor's fallacy (People v. Collins) ====
  "A 1 in 12 million match. Case closed?":
    "تطابق باحتمال 1 من 12 مليون. هل أُغلقت القضية؟",
  "Los Angeles, 1964. A woman is knocked down and her purse is taken. Witnesses describe the pair who ran off: a blonde woman with a ponytail and a bearded Black man, in a partly yellow car. A couple who fit every detail are charged. At the trial an expert is asked to assume a frequency for each feature, multiplies them together, and gets 1 in 12 million. The prosecutor tells the jury that is the chance the two in the dock are innocent. Take the 1 in 12 million at face value, and picture the 12 million couples who could have been the ones.":
    "لوس أنجلوس، 1964. امرأة تُطرح أرضاً وتُسلب حقيبتها. يصف الشهود الثنائي الذي فرّ: امرأة شقراء بذيل حصان، ورجل أسود ملتحٍ، في سيارة صفراء جزئياً. ويُتهم ثنائي تنطبق عليه كل التفاصيل. في المحاكمة، يُطلب من خبير أن يفترض نسبة شيوع لكل صفة، فيضرب النسب بعضها ببعض ليحصل على 1 من 12 مليون. ويقول المدعي العام لهيئة المحلفين إن هذا هو احتمال أن يكون المتهمان بريئين. خذ رقم 1 من 12 مليون على ظاهره، وتخيّل الـ 12 مليون ثنائي الذين كان يمكن أن يكون الفاعل من بينهم.",
  "This couple fits the description. What are the odds they did it?":
    "هذا الثنائي تنطبق عليه الأوصاف. ما احتمال أن يكون هو الفاعل؟",
  "In 12 million couples": "من كل 12 مليون ثنائي",
  "did it": "ارتكبوا الجريمة",
  "fit the description": "تنطبق عليهم الأوصاف",
  "Virtually certain": "شبه مؤكد",
  "12 million to one against them":
    "الاحتمالات ضدهم 12 مليوناً إلى واحد",
  "Around 99%": "نحو 99%",
  "not quite proof, but close": "ليس دليلاً قاطعاً، لكنه قريب",
  "About a coin flip": "أشبه برمية عملة",
  "roughly 50/50": "تقريباً 50/50",
  "One in 12 million, and still a coin flip.":
    "واحد من 12 مليون، ومع ذلك يظل الأمر أشبه برمية عملة.",
  "The flipped question": "السؤال المقلوب",
  "Rare evidence is common in a big crowd":
    "الدليل النادر يصبح شائعاً في حشد كبير",
  "The 1 in 12 million answers one question: pick a couple at random, how likely are they to fit? The jury has to answer a different one: of all the couples who do fit, which pair did it? Line up 12 million couples. One pair are the robbers, and of course they fit. But at odds of 1 in 12 million, roughly one more couple in that crowd fits by pure chance. So a couple who fits is about as likely to be innocent as guilty.":
    "رقم 1 من 12 مليون يجيب عن سؤال واحد: لو اخترت ثنائياً عشوائياً، فما احتمال أن تنطبق عليه الأوصاف؟ أما هيئة المحلفين فعليها أن تجيب عن سؤال آخر: من بين كل الثنائيات التي تنطبق عليها الأوصاف، أيها هو الفاعل؟ اصطفّ 12 مليون ثنائي. ثنائي واحد منها هو السارق، وتنطبق عليه الأوصاف بالطبع. لكن باحتمال 1 من 12 مليون، هناك تقريباً ثنائي آخر في ذلك الحشد تنطبق عليه الأوصاف بمحض المصادفة. لذا فإن ثنائياً تنطبق عليه الأوصاف يكون احتمال براءته قريباً من احتمال إدانته.",
  "The California Supreme Court reversed the conviction in 1968. Working from the prosecution's own figures, it found a likelihood of over 40 percent that at least one other couple could have fitted the description just as well, and it warned that guilt cannot be settled by arithmetic like this.":
    "نقضت المحكمة العليا في كاليفورنيا حكم الإدانة عام 1968. وانطلاقاً من أرقام النيابة نفسها، وجدت احتمالاً يتجاوز 40 بالمئة بأن ثنائياً آخر واحداً على الأقل كان يمكن أن تنطبق عليه الأوصاف بالقدر نفسه، وحذّرت من أن الإدانة لا يمكن أن تُحسم بحساب كهذا.",
  "The prosecutor's fallacy": "مغالطة المدعي العام",
  "“If he were innocent, this evidence would be that unlikely” is not the same as “this evidence makes him that unlikely to be innocent.” Swap the two and a coin flip starts to sound like certainty.":
    "«لو كان بريئاً لكان هذا الدليل بهذه الندرة» ليست هي نفسها «هذا الدليل يجعل براءته بهذه الندرة». بدّل بين العبارتين، فتبدأ رمية العملة في أن تبدو يقيناً.",
  "Before you accept a one in a million match, ask how big the pool was. One in a million odds across a city of ten million throw up about ten matches, and only one of those people did it. The number means nothing until you say who was in the crowd.":
    "قبل أن تقبل تطابقاً باحتمال واحد في المليون، اسأل عن حجم المجموعة التي جرى البحث فيها. فاحتمال واحد في المليون في مدينة عدد سكانها عشرة ملايين ينتج نحو عشرة تطابقات، وواحد فقط من هؤلاء هو الفاعل. الرقم لا يعني شيئاً حتى تحدد من كان في ذلك الحشد.",
  "Two questions sound identical and are not. The first: if this person had nothing to do with it, how likely is this evidence? That is what a lab or an expert can actually measure, and it is where figures like 1 in 12 million come from. The second: given this evidence, how likely is it that this person did it? That is what a jury has to decide, and it depends on something no lab measures, namely how many people could have done it. Push odds of 1 in 12 million through a crowd of 12 million and you expect about one innocent match, so the match on its own is worth roughly a coin flip. Shrink the crowd, or add independent evidence, and the same match becomes powerful. Grow the crowd, and it becomes weak. The trap also runs in reverse: a defence lawyer can say that 2,000 people in the city share that blood type, so the evidence proves nothing, which quietly ignores that the other 1,999 were nowhere near the crime.":
    "سؤالان يبدوان متطابقين وهما ليسا كذلك. الأول: لو لم تكن لهذا الشخص أي صلة بالجريمة، فما احتمال ظهور هذا الدليل؟ هذا ما يستطيع مختبر أو خبير قياسه فعلاً، ومن هنا تأتي أرقام مثل 1 من 12 مليون. والثاني: بالنظر إلى هذا الدليل، ما احتمال أن يكون هذا الشخص هو الفاعل؟ هذا ما يتعين على هيئة المحلفين أن تبتّ فيه، وهو يتوقف على أمر لا يقيسه أي مختبر، ألا وهو عدد الأشخاص الذين كان يمكن أن يرتكبوا الجريمة. مرّر احتمال 1 من 12 مليون عبر حشد قوامه 12 مليوناً، فتتوقع تطابقاً واحداً تقريباً لشخص بريء، لذا فإن التطابق وحده لا يساوي أكثر من رمية عملة. صغّر الحشد، أو أضف دليلاً مستقلاً، فيصبح التطابق نفسه قوياً. ووسّع الحشد، فيصبح ضعيفاً. والفخ يعمل في الاتجاه المعاكس أيضاً: يمكن لمحامي دفاع أن يقول إن 2000 شخص في المدينة يتشاركون فصيلة الدم تلك، وبالتالي فإن الدليل لا يثبت شيئاً، وهو ما يتجاهل بهدوء أن الـ 1999 الآخرين لم يكونوا قريبين من مسرح الجريمة أصلاً.",
  "Two cot deaths, and a number that became guilt":
    "وفاتا مهد، ورقم تحوّل إلى إدانة",
  "An English murder trial heard that the chance of two cot deaths in a family like the defendant's was 1 in 73 million. Press reports turned that into the chance the deaths were natural. The Royal Statistical Society said publicly that the figure had no statistical basis, because it assumed the two deaths were independent, and that reading it as a chance of innocence is the prosecutor's fallacy. What the jury needed was a comparison: two cot deaths and two murders are both rare, so which is rarer here?":
    "سمعت محاكمة قتل في إنجلترا أن احتمال حدوث وفاتَي مهد في أسرة كأسرة المتهمة هو 1 من 73 مليون. وحوّلت التقارير الصحفية ذلك إلى احتمال أن تكون الوفاتان طبيعيتين. وأعلنت الجمعية الملكية للإحصاء علناً أن الرقم لا أساس إحصائياً له، لأنه افترض أن الوفاتين مستقلتان، وأن قراءته على أنه احتمال البراءة هي مغالطة المدعي العام. وما كانت هيئة المحلفين بحاجة إليه هو مقارنة: وفاتا المهد وجريمتا القتل كلتاهما نادرتان، فأيهما أندر هنا؟",
  "Almost nobody spots the swap": "لا أحد تقريباً يلحظ التبديل",
  "Researchers gave 73 students a murder case in which the killer's blood type is found in 1 person in 100, then showed them a prosecution argument built on the swapped question: only a 1 percent chance the blood came from someone else, so a 99 percent chance the suspect is guilty. 21 of the 73 rated that argument correct, and only 16 saw that it and the opposing defence argument were both wrong.":
    "عرض باحثون على 73 طالباً قضية قتل توجد فيها فصيلة دم القاتل لدى شخص واحد من كل 100، ثم أطلعوهم على حجة للنيابة مبنية على السؤال المُبدَّل: هناك احتمال 1 بالمئة فقط أن يكون الدم قد جاء من شخص آخر، إذن هناك احتمال 99 بالمئة أن يكون المشتبه به مذنباً. اعتبر 21 من الـ 73 تلك الحجة صحيحة، ولم يدرك سوى 16 منهم أنها وحجة الدفاع المقابلة كلتيهما خاطئتان.",
  "The prosecutor's fallacy, a reasoning trap.":
    "مغالطة المدعي العام، فخ في الاستدلال.",
  "When an expert says there is only a one in a million chance of a match by accident, that is a fact about the evidence, not about the person in the dock. Flip the two around and you get the prosecutor's fallacy. The cure is to ask how many people were in the pool: one in a million odds across a city of ten million produce about ten innocent matches, so on its own a match can be nowhere near proof.":
    "عندما يقول خبير إن احتمال حدوث تطابق بالمصادفة هو واحد في المليون فقط، فتلك حقيقة عن الدليل، لا عن الشخص في قفص الاتهام. اقلب الاثنين، تحصل على مغالطة المدعي العام. والعلاج هو أن تسأل كم شخصاً كان في المجموعة المدروسة: احتمال واحد في المليون في مدينة عدد سكانها عشرة ملايين ينتج نحو عشرة تطابقات لأبرياء، لذا فإن التطابق وحده قد يكون أبعد ما يكون عن الدليل القاطع.",
  "Spotted the swap. Bet you don't.":
    "لحظتُ التبديل. أراهن أنك لن تلحظه.",
  "I'd have convicted on the spot.":
    "كنت سأصدر حكم الإدانة على الفور.",
  "The court's appendix showed that on those same figures, with a pool of about 12 million couples, the chance that at least one other couple fitted the description was roughly 41 percent.":
    "أظهر ملحق حكم المحكمة أنه بالأرقام نفسها، ومع مجموعة قوامها نحو 12 مليون ثنائي، كان احتمال أن تنطبق الأوصاف على ثنائي آخر واحد على الأقل نحو 41 بالمئة.",

  // ==== Trap Hunt test items ====
  "Two schools publish exam results. School B has the higher pass rate overall, 75% against 70%. When results are split by student background, School A comes out ahead in every single group. The district praises School B.":
    "مدرستان تنشران نتائج الامتحانات. المدرسة B لديها معدل النجاح الأعلى إجمالاً، 75% مقابل 70%. وعند تقسيم النتائج حسب خلفية الطلاب، تتقدم المدرسة A في كل مجموعة على حدة. وتشيد إدارة المنطقة التعليمية بالمدرسة B.",
  "A wins in every group but loses overall, which happens when the groups are mixed unevenly. The pooled number is the misleading one here.":
    "تفوز A في كل مجموعة لكنها تخسر إجمالاً، وهو ما يحدث عندما تُمزج المجموعات بشكل غير متساوٍ. الرقم المجمَّع هو المضلِّل هنا.",
  "A factory reports its new process has a lower defect rate than the old one, 3% against 4%. Looking at simple parts and complex parts separately, the old process had fewer defects in both.":
    "يفيد مصنع بأن عمليته الجديدة لديها معدل عيوب أقل من القديمة، 3% مقابل 4%. وعند النظر إلى القطع البسيطة والقطع المعقدة كلٍّ على حدة، كانت عيوب العملية القديمة أقل في كلتيهما.",
  "Better in both categories yet worse overall means the two processes handled very different mixes of simple and complex parts.":
    "أن تكون أفضل في الفئتين ومع ذلك أسوأ إجمالاً يعني أن العمليتين تعاملتا مع مزيجين مختلفين جداً من القطع البسيطة والمعقدة.",
  "A condition affects about 1 in 2,000 people. A screening test is 99% accurate. A patient tests positive and is told they almost certainly have the condition.":
    "حالة مرضية تصيب نحو 1 من كل 2000 شخص. واختبار استقصائي دقته 99%. تأتي نتيجة مريض إيجابية، فيُقال له إنه مصاب بالحالة شبه مؤكد.",
  "With a condition this rare, the 1% error rate produces far more false positives than there are real cases, so a positive is still more likely to be a false alarm.":
    "مع حالة بهذه الندرة، ينتج معدل الخطأ البالغ 1% إيجابيات كاذبة أكثر بكثير من عدد الحالات الحقيقية، لذا تظل النتيجة الإيجابية أرجح أن تكون إنذاراً كاذباً.",
  "A system flags travellers as suspicious and is 95% accurate. About 1 in 1,000 travellers is actually a threat. An official states that a flagged traveller is 95% likely to be a threat.":
    "نظام يضع علامة اشتباه على المسافرين ودقته 95%. ونحو 1 من كل 1000 مسافر يشكّل تهديداً فعلياً. يصرّح مسؤول بأن احتمال أن يكون المسافر المُعلَّم تهديداً هو 95%.",
  "That confuses the test's accuracy with the odds after a flag. Because threats are rare, the overwhelming majority of flags are ordinary travellers.":
    "هذا يخلط بين دقة الاختبار وبين الاحتمال بعد وضع العلامة. ولأن التهديدات نادرة، فإن الغالبية الساحقة من العلامات تقع على مسافرين عاديين.",
  "Neighbourhoods with more parks have lower obesity rates. A council report concludes that building parks will reduce obesity, and proposes a park-building programme.":
    "الأحياء التي فيها حدائق أكثر لديها معدلات سمنة أقل. يخلص تقرير للمجلس البلدي إلى أن بناء الحدائق سيقلل السمنة، ويقترح برنامجاً لبناء الحدائق.",
  "Wealth and urban planning plausibly drive both park provision and health, so the link may not be the parks doing the work.":
    "من المعقول أن الثروة والتخطيط العمراني يحرّكان توفير الحدائق والصحة معاً، لذا قد لا تكون الحدائق هي التي تقوم بالعمل وراء هذه الصلة.",
  "Students who visit the library more often get higher grades. A university announces mandatory weekly library visits to raise grades.":
    "الطلاب الذين يزورون المكتبة أكثر يحصلون على درجات أعلى. تعلن جامعة عن زيارات أسبوعية إلزامية للمكتبة لرفع الدرجات.",
  "Motivated students both study more and visit the library. Forcing the visit does not import the motivation that produced the grades.":
    "الطلاب المتحفزون يدرسون أكثر ويزورون المكتبة أكثر في آن واحد. وفرض الزيارة لا يجلب معه الحافز الذي أنتج تلك الدرجات.",
  "A business book studies companies that have thrived for fifty years and finds nearly all had bold, risk-taking leaders. It concludes that bold leadership causes lasting success.":
    "كتاب في الأعمال يدرس شركات ازدهرت طوال خمسين عاماً فيجد أن قادتها جميعاً تقريباً كانوا جريئين ومُقدِمين على المخاطرة. ويخلص إلى أن القيادة الجريئة تُنتج نجاحاً دائماً.",
  "The bold companies that went under are not in the sample. Boldness may equally well cause spectacular failure, which the study cannot see.":
    "الشركات الجريئة التي انهارت ليست ضمن العينة. وقد تؤدي الجرأة بالقدر نفسه إلى فشل مدوٍّ، وهو ما لا تستطيع الدراسة رؤيته.",
  "A clinic reviews patients who completed its demanding rehabilitation programme and finds excellent outcomes. It reports the programme as highly effective.":
    "عيادة تراجع المرضى الذين أتموا برنامجها التأهيلي الشاق فتجد نتائج ممتازة. وتُبلغ عن البرنامج بوصفه شديد الفعالية.",
  "Patients who dropped out are excluded, and they are likely the ones doing worst. Counting only finishers flatters the programme.":
    "المرضى الذين انسحبوا مستبعَدون، وهم على الأرجح الأسوأ حالاً. واحتساب من أتموا البرنامج وحدهم يجمّل صورته.",
  "A database search turns up one man whose DNA matches a crime-scene sample. The lab reports that the profile occurs in about 1 person in a million. The prosecutor tells the jury there is therefore about a one in a million chance that he is innocent.":
    "بحث في قاعدة بيانات يكشف عن رجل يتطابق حمضه النووي مع عينة من مسرح الجريمة. ويفيد المختبر بأن هذه البصمة الوراثية توجد لدى شخص واحد تقريباً من كل مليون. فيقول المدعي العام لهيئة المحلفين إن احتمال براءته هو بالتالي نحو واحد في المليون.",
  "The 1 in a million is the chance of a match if he is innocent, not the chance he is innocent given a match. In a large pool other people match too, so the two numbers are nowhere near the same.":
    "رقم 1 في المليون هو احتمال حدوث تطابق لو كان بريئاً، لا احتمال أن يكون بريئاً بعد حدوث التطابق. ففي مجموعة كبيرة يتطابق أشخاص آخرون أيضاً، لذا فإن الرقمين أبعد ما يكونان عن التساوي.",
  "Fibres on a suspect's coat match the victim's carpet. An expert says only about 1 coat in 5,000 would carry such fibres. Counsel concludes the suspect is 4,999 times more likely to be guilty than innocent.":
    "ألياف على معطف مشتبه به تتطابق مع سجادة الضحية. يقول خبير إن نحو معطف واحد فقط من كل 5000 يحمل مثل هذه الألياف. فيخلص المحامي إلى أن احتمال إدانة المشتبه به يفوق احتمال براءته بـ 4999 مرة.",
  "A rarity figure describes the evidence, not the person. How many innocent people could have picked up those fibres depends on how many people were ever near that carpet.":
    "رقم الندرة يصف الدليل، لا الشخص. فعدد الأبرياء الذين كان يمكن أن تعلق بهم تلك الألياف يتوقف على عدد الأشخاص الذين اقتربوا يوماً من تلك السجادة.",
  "An expert testifies that the DNA profile occurs in roughly 1 person in a million, and adds that in a city of two million this means about two other people would be expected to match as well, so the match alone does not single out the defendant.":
    "يشهد خبير بأن البصمة الوراثية توجد لدى شخص واحد تقريباً من كل مليون، ويضيف أن هذا يعني في مدينة عدد سكانها مليونان أنه يُتوقع تطابق شخصين آخرين أيضاً، لذا فإن التطابق وحده لا يخص المتهم دون سواه.",
  "This is the rarity figure stated correctly. The expert converts it into expected matches in the population instead of flipping it into a probability of innocence.":
    "هذا هو رقم الندرة معروضاً على وجهه الصحيح. فقد حوّله الخبير إلى عدد متوقع من التطابقات بين السكان بدلاً من قلبه إلى احتمال براءة.",
  "Patients are assigned at random to a drug or a placebo. The drug group has fewer strokes, and the difference holds within every age group. The researchers conclude the drug reduces strokes.":
    "يوزَّع المرضى عشوائياً على دواء أو دواء وهمي. تسجل مجموعة الدواء سكتات دماغية أقل، ويصمد الفارق داخل كل فئة عمرية. يخلص الباحثون إلى أن الدواء يقلل السكتات الدماغية.",
  "Randomisation balances the hidden differences, and the effect survives splitting by age. This reasoning is sound.":
    "العشوائية توازن الفروق الخفية، والأثر يصمد عند التقسيم حسب العمر. هذا استدلال سليم.",
  "A test with a 1% false-positive rate is used in a clinic where about 40% of those tested genuinely have the condition. A doctor tells a patient that a positive result makes the condition much more likely.":
    "اختبار معدل إيجابياته الكاذبة 1% يُستخدم في عيادة يكون فيها نحو 40% ممن يخضعون للاختبار مصابين بالحالة فعلاً. يقول طبيب لمريض إن النتيجة الإيجابية تجعل الإصابة أرجح بكثير.",
  "The base rate matters, and here it is high. With 40% prevalence a positive really is strong evidence, so applying the rare-disease lesson would be a mistake.":
    "المعدل الأساسي مهم، وهو هنا مرتفع. فمع انتشار بنسبة 40% تكون النتيجة الإيجابية دليلاً قوياً فعلاً، لذا فإن تطبيق درس المرض النادر هنا سيكون خطأ.",
  "A city compares road deaths before and after lowering a speed limit, adjusts for traffic volume, and checks the national trend over the same years. The local drop is larger than the national trend.":
    "مدينة تقارن وفيات الطرق قبل خفض حد السرعة وبعده، وتصحّح لحجم حركة المرور، وتتحقق من الاتجاه الوطني خلال السنوات نفسها. الانخفاض المحلي أكبر من الاتجاه الوطني.",
  "They accounted for the obvious confounders and for the background trend, which is what makes a before-and-after comparison credible.":
    "لقد أخذوا في الحسبان العوامل المربِكة الواضحة والاتجاه العام في الخلفية، وهذا ما يجعل مقارنة ما قبل وما بعد جديرة بالثقة.",
  "A trial reports outcomes for everyone who was enrolled, including those who stopped treatment early, and states how many dropped out and why.":
    "تجربة سريرية تُبلغ عن نتائج كل من جرى تسجيلهم فيها، بمن فيهم من أوقفوا العلاج مبكراً، وتذكر عدد المنسحبين وأسباب انسحابهم.",
  "Reporting the whole enrolled group, dropouts included, is exactly the defence against counting only the survivors.":
    "الإبلاغ عن مجموعة المسجَّلين كاملة، بمن فيهم المنسحبون، هو بالضبط الحصانة ضد احتساب الناجين وحدهم.",
};
