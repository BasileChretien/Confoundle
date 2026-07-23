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

  // ==== Will Rogers phenomenon (stage migration) ====
  "Better survival in every single stage. Did anyone actually live longer?":
    "بقاء أفضل على قيد الحياة في كل مرحلة على حدة. فهل عاش أحد فعلاً مدة أطول؟",
  "One group of 131 lung cancer patients, treated in 1977, sorted into stages twice. First using only the information older hospitals could gather, then again after new scans. Nobody was treated differently. Only the sorting changed.":
    "مجموعة واحدة من 131 مريضاً بسرطان الرئة، عولجوا عام 1977، صُنِّفوا إلى مراحل مرتين. أولاً باستخدام المعلومات التي كان بوسع المستشفيات الأقدم جمعها وحدها، ثم مرة أخرى بعد تصوير جديد. لم يُعالَج أحد بطريقة مختلفة. التصنيف وحده هو ما تغيّر.",
  "Did these patients actually do better?":
    "هل كانت حال هؤلاء المرضى أفضل فعلاً؟",
  "Six-month survival": "البقاء على قيد الحياة بعد ستة أشهر",
  "Sorted the old way": "مصنَّفون بالطريقة القديمة",
  Old: "القديمة",
  "Sorted after the new scans": "مصنَّفون بعد التصوير الجديد",
  New: "الجديدة",
  "Stage I": "المرحلة الأولى",
  "Stage II": "المرحلة الثانية",
  "Stage III": "المرحلة الثالثة",
  "Yes, they did better": "نعم، كانت حالهم أفضل",
  "every stage improved": "تحسّنت كل مرحلة",
  "There is no way to tell": "لا سبيل إلى معرفة ذلك",
  "too little to go on": "معطيات أقل من أن يُبنى عليها",
  "No, nothing changed": "لا، لم يتغير شيء",
  "only the labels moved": "التسميات وحدها هي التي تحركت",
  "Identical. Seventy two survivors either way.":
    "متطابقان. اثنان وسبعون ناجياً في الحالتين.",
  "The migration": "الهجرة بين المراحل",
  "Patients moved between stages, and lifted both":
    "انتقل مرضى بين المراحل، فرفعوا متوسط الاثنتين",
  "The new scans spotted spread that the old workup had missed, so patients were moved out of better stages into worse ones. Each of them was among the sickest in the stage they left, so that stage's average rose. Each was also among the healthiest in the stage they joined, so that average rose too. Every stage improved and not one person's outcome changed:":
    "كشف التصوير الجديد انتشاراً للمرض كانت الفحوص القديمة قد أغفلته، فنُقل مرضى من مراحل أفضل إلى مراحل أسوأ. وكان كل منهم من بين الأشد مرضاً في المرحلة التي غادرها، فارتفع متوسط تلك المرحلة. وكان كل منهم أيضاً من بين الأوفر صحة في المرحلة التي انضم إليها، فارتفع ذلك المتوسط أيضاً. تحسّنت كل مرحلة ولم تتغير نتيجة أي شخص واحد:",
  "The Will Rogers phenomenon": "ظاهرة ويل روجرز",
  "Move members from one group into another and you can lift the average of every group at once, while the overall picture stays exactly the same.":
    "انقل أفراداً من مجموعة إلى أخرى، فيمكنك أن ترفع متوسط كل مجموعة في آن واحد، بينما تبقى الصورة الإجمالية كما هي تماماً.",
  "Whenever a category's average improves, ask whether the category still holds the same kind of members. Better detection quietly reshuffles who counts as mild and who counts as severe, and a reshuffle on its own can make every column look better.":
    "كلما تحسّن متوسط فئة ما، اسأل عمّا إذا كانت الفئة ما زالت تضم النوع نفسه من الأفراد. فالكشف الأدق يعيد بهدوء خلط من يُعدّ حالته خفيفة ومن يُعدّ حالته شديدة، وإعادة الخلط وحدها كفيلة بأن تجعل كل عمود يبدو أفضل.",
  "Picture two buckets, one of good outcomes and one of bad. Take the worst items out of the good bucket and drop them into the bad one, where they are the best of a bad lot. The good bucket's average rises because its weakest members left. The bad bucket's average rises because it gained members better than its own. Both averages improve and nothing about any individual has changed. In medicine the reshuffling is done by better scans, which find disease that was always there but previously invisible. That is why survival by stage can improve across the board in a period when the treatments themselves did not get better, and it is why comparing stages across eras of different technology is treacherous.":
    "تخيّل سطلين، أحدهما للنتائج الجيدة والآخر للنتائج السيئة. أخرِج أسوأ العناصر من السطل الجيد وألقِ بها في السطل السيئ، حيث تكون هي الأفضل بين مجموعة رديئة. يرتفع متوسط السطل الجيد لأن أضعف عناصره قد غادرته. ويرتفع متوسط السطل السيئ لأنه كسب عناصر أفضل من عناصره. يتحسن المتوسطان ولم يتغير شيء يخص أي فرد. وفي الطب، تتولى إعادةَ الخلط أجهزةُ تصوير أفضل، تكشف مرضاً كان موجوداً دائماً لكنه كان غير مرئي من قبل. لهذا يمكن أن يتحسن البقاء على قيد الحياة في كل المراحل خلال فترة لم تتحسن فيها العلاجات نفسها، ولهذا فإن مقارنة المراحل عبر حقب ذات تقنيات مختلفة أمر غادر.",
  "The check that gave it away": "التحقق الذي كشف الأمر",
  "The same researchers sorted both eras of patients by their symptoms instead, a yardstick no scanner can shift. Judged that way the two groups survived at much the same rate, around 77 and 78 percent for those without symptoms, and 26 against 22 percent for the sickest. What had really changed was the mix, because the newer group held twice the proportion of the mildest patients.":
    "صنّف الباحثون أنفسهم مرضى الحقبتين حسب أعراضهم بدلاً من ذلك، وهو مقياس لا يستطيع أي جهاز تصوير أن يزحزحه. وبهذا الحكم، نجت المجموعتان بمعدل متقارب إلى حد بعيد، نحو 77 و78 بالمئة لمن لا أعراض لديهم، و26 مقابل 22 بالمئة للأشد مرضاً. أما ما تغيّر فعلاً فهو تركيبة المجموعة، إذ ضمّت المجموعة الأحدث ضعف نسبة المرضى الأخف حالاً.",
  "It happened again with PET":
    "تكرر الأمر مع التصوير بالإصدار البوزيتروني (PET)",
  "As PET scanning spread through American hospitals, lung cancer patients were reclassified all over again. The share labelled most advanced grew, and survival within the stages duly ticked up, two year survival moving from 18 to 22 percent in one stage and 6 to 8 percent in another. The authors called their paper the phenomenon revisited.":
    "مع انتشار التصوير بالإصدار البوزيتروني في المستشفيات الأمريكية، أُعيد تصنيف مرضى سرطان الرئة من جديد. فزادت نسبة من صُنِّفوا في أكثر المراحل تقدماً، وارتفع البقاء على قيد الحياة داخل المراحل كما هو متوقع، إذ انتقل البقاء لسنتين من 18 إلى 22 بالمئة في إحدى المراحل، ومن 6 إلى 8 بالمئة في مرحلة أخرى. وقد سمّى المؤلفون بحثهم «عودة إلى الظاهرة».",
  "The Will Rogers phenomenon, a reasoning trap.":
    "ظاهرة ويل روجرز، فخ في الاستدلال.",
  "Take the worst members of a good group and move them into a bad group. The good group's average rises, because its weakest ones left. The bad group's average rises too, because the newcomers are better than what it already had. Every group improves and nothing real has happened. It is how sharper scans can make survival look better in every stage of a disease while exactly as many people live and die.":
    "خذ أسوأ أفراد مجموعة جيدة وانقلهم إلى مجموعة سيئة. يرتفع متوسط المجموعة الجيدة لأن أضعف أفرادها قد غادروها. ويرتفع متوسط المجموعة السيئة أيضاً لأن الوافدين إليها أفضل ممن كانوا فيها. تتحسن كل مجموعة ولم يحدث شيء حقيقي. وهكذا تستطيع أجهزة تصوير أدق أن تجعل البقاء على قيد الحياة يبدو أفضل في كل مرحلة من مراحل المرض، بينما يعيش ويموت العدد نفسه من الناس تماماً.",
  "The counts are Table 4: the 1977 cohort of 131 patients staged twice, once on the data the older cohort had and once with the new imaging. Both stagings give 72 survivors, a six-month survival of 55 percent.":
    "الأعداد مأخوذة من الجدول 4: فوج عام 1977 المؤلف من 131 مريضاً، صُنِّف إلى مراحل مرتين، مرة اعتماداً على البيانات التي كانت متاحة للفوج الأقدم، ومرة بالتصوير الجديد. ويعطي التصنيفان كلاهما 72 ناجياً، أي بقاءً على قيد الحياة بعد ستة أشهر بنسبة 55 بالمئة.",

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
  "A hospital installs a more sensitive scanner. Over the next two years it reports that survival improved in every severity grade of the disease, from the mildest to the most advanced, and concludes that its care has got better.":
    "يركّب مستشفى جهاز تصوير أعلى حساسية. وعلى مدى العامين التاليين يُبلغ عن تحسن البقاء على قيد الحياة في كل درجة من درجات شدة المرض، من الأخف إلى الأكثر تقدماً، ويخلص إلى أن رعايته قد تحسنت.",
  "A sharper scanner regrades patients. Those moved out of a mild grade were its sickest, and they arrive in a severe grade as its healthiest, so both averages rise without anyone doing better.":
    "جهاز التصوير الأدق يعيد تدريج المرضى. فمن نُقلوا خارج درجة خفيفة كانوا الأشد مرضاً فيها، ويصلون إلى درجة شديدة بوصفهم الأوفر صحة فيها، فيرتفع المتوسطان دون أن تتحسن حال أحد.",
  "A school adopts a placement test that is much better at identifying struggling pupils, and uses it to sort them into a top and a bottom stream. The next year, average results rise in both streams. The head teacher credits the new teaching methods.":
    "تعتمد مدرسة اختبار تصنيف أفضل بكثير في تحديد التلاميذ المتعثرين، وتستخدمه لتوزيعهم على مسار علوي ومسار سفلي. وفي العام التالي، ترتفع النتائج المتوسطة في المسارين معاً. فيعزو مدير المدرسة ذلك إلى أساليب التدريس الجديدة.",
  "The pupils reclassified out of the top stream were its weakest and become the strongest of the bottom stream, so both averages climb on reshuffling alone.":
    "التلاميذ الذين أُعيد تصنيفهم خارج المسار العلوي كانوا أضعف من فيه، ويصبحون الأقوى في المسار السفلي، فيصعد المتوسطان بفعل إعادة التوزيع وحدها.",
  "A hospital reports that survival improved in every severity grade over five years. It also reports that the grading criteria did not change in that time, that no new diagnostic test was introduced, and that the number of patients in each grade stayed about the same.":
    "يُبلغ مستشفى عن تحسن البقاء على قيد الحياة في كل درجة من درجات الشدة على مدى خمس سنوات. ويُبلغ أيضاً بأن معايير التدريج لم تتغير في تلك المدة، وأنه لم يُستحدث أي اختبار تشخيصي جديد، وأن عدد المرضى في كل درجة ظل على حاله تقريباً.",
  "This is the case where the improvement is real. Nothing reclassified the patients, and the grades held the same share of people, so no reshuffling could have manufactured the gain.":
    "هذه هي الحالة التي يكون فيها التحسن حقيقياً. فلا شيء أعاد تصنيف المرضى، وحافظت الدرجات على النسبة نفسها من الناس، لذا ما كان لإعادة توزيع أن تصنع هذا المكسب.",

  // ---- Lead-time bias (puzzle #7) ----
  "Screened patients survive five years after diagnosis. Unscreened ones survive two.":
    "المرضى الذين خضعوا للفحص الاستقصائي يبقون على قيد الحياة خمس سنوات بعد التشخيص. أما من لم يخضعوا له فيبقون سنتين.",
  "The same cancer, growing at the same speed, treated the same way. One person had a scan that found it early. The other went to a doctor years later, when the first symptom appeared. Survival is counted from the day of diagnosis, which is how survival is almost always counted.":
    "السرطان نفسه، ينمو بالسرعة نفسها، ويُعالَج بالطريقة نفسها. أحدهما خضع لتصوير كشفه مبكراً. والآخر ذهب إلى الطبيب بعد سنوات، حين ظهر أول عَرَض. ويُحسب البقاء على قيد الحياة من يوم التشخيص، وهي الطريقة التي يُحسب بها البقاء دائماً تقريباً.",
  "Did finding it early give this person more time alive?":
    "هل منح اكتشافه مبكراً هذا الشخص وقتاً أطول على قيد الحياة؟",
  "One life, two moments of diagnosis": "حياة واحدة، لحظتا تشخيص",
  years: "سنوات",
  "cancer begins": "بداية السرطان",
  diagnosed: "التشخيص",
  died: "الوفاة",
  "Survival counted from diagnosis": "البقاء محسوباً من التشخيص",
  "Found when symptoms appeared": "اكتُشف عند ظهور الأعراض",
  "Found early, by screening": "اكتُشف مبكراً بالفحص الاستقصائي",
  "Yes, three extra years": "نعم، ثلاث سنوات إضافية",
  "five instead of two": "خمس بدل سنتين",
  "No, not one extra day": "لا، ولا يوم واحد إضافي",
  "only the clock moved": "الساعة وحدها هي التي تحركت",
  "Both died on exactly the same day.": "كلاهما توفي في اليوم نفسه تماماً.",
  "The clock started earlier, the life did not get longer":
    "بدأت الساعة أبكر، لكن الحياة لم تَطُل",
  "Screening did not postpone anything. It moved the diagnosis three years earlier, so this person spent three more years knowing they had cancer. Counted from diagnosis that reads as three extra years of survival. Put both lives on the same calendar and they end at the same instant:":
    "لم يؤجّل الفحص الاستقصائي شيئاً. لقد قدّم التشخيص ثلاث سنوات، فقضى هذا الشخص ثلاث سنوات إضافية وهو يعلم أنه مصاب بالسرطان. ومحسوباً من التشخيص، يبدو ذلك ثلاث سنوات إضافية من البقاء على قيد الحياة. ضع الحياتين على التقويم نفسه، فتنتهيان في اللحظة نفسها:",
  "The extra years": "السنوات الإضافية",
  "Lead-time bias": "تحيز زمن السبق",
  "Finding a disease earlier stretches survival measured from diagnosis even when it postpones death by not a single day.":
    "اكتشاف المرض مبكراً يُطيل البقاء على قيد الحياة مقيساً من التشخيص، حتى حين لا يؤجّل الوفاة يوماً واحداً.",
  "This does not mean early detection is worthless. It means survival from diagnosis cannot tell you whether it worked. Whenever survival improves after a new test arrives, ask whether people are living longer or simply being told sooner. The measure that cannot be fooled this way is the death rate in the whole population, screened and unscreened alike.":
    "هذا لا يعني أن الكشف المبكر بلا قيمة. بل يعني أن البقاء على قيد الحياة محسوباً من التشخيص لا يخبرك إن كان قد نجح. فكلما تحسّن البقاء بعد وصول اختبار جديد، اسأل: هل يعيش الناس مدة أطول، أم أنهم يُبلَّغون في وقت أبكر فحسب؟ المقياس الذي لا يمكن خداعه بهذه الطريقة هو معدل الوفيات في عموم السكان، من خضعوا للفحص الاستقصائي ومن لم يخضعوا على حد سواء.",
  "Survival statistics start their clock on the day of diagnosis. That day is not a fact about the disease, it is a fact about when somebody looked. Move the looking earlier and you add time to the front of the measurement while changing nothing at the back. Everyone diagnosed early is guaranteed to clear the five-year mark more often, because they were handed a head start. Two other effects push the same way. A screening programme catches slow-growing disease far more often than fast-growing disease, simply because slow disease sits there longer waiting to be found, and slow disease has a better outlook anyway. And a sensitive enough test finds harmless abnormalities that would never have caused trouble, which are then counted as cured cancers. All three flatter survival without saving anyone. The only honest test is to take a whole population, invite half of it to be screened, and count deaths in everyone from the day of the invitation. Screening programmes that pass that test exist, which is exactly why the test is worth insisting on.":
    "إحصاءات البقاء على قيد الحياة تبدأ ساعتها يوم التشخيص. وذلك اليوم ليس حقيقة عن المرض، بل حقيقة عن اللحظة التي نظر فيها أحدهم. قدِّم النظر إلى وقت أبكر، فتضيف زمناً إلى مقدمة القياس دون أن تغيّر شيئاً في مؤخرته. وكل من يُشخَّص مبكراً مضمون له أن يتجاوز حاجز الخمس سنوات أكثر، لأنه مُنح سبقاً زمنياً. وهناك أثران آخران يدفعان في الاتجاه نفسه. فبرنامج الفحص الاستقصائي يلتقط المرض بطيء النمو أكثر بكثير من المرض سريع النمو، لمجرد أن المرض البطيء يمكث مدة أطول في انتظار من يكتشفه، والمرض البطيء أفضل مآلاً أصلاً. كما أن اختباراً شديد الحساسية يعثر على شذوذات غير مؤذية ما كانت لتسبب أي متاعب، فتُحتسب سرطانات شُفيت. الثلاثة جميعاً تجمّل البقاء دون أن تنقذ أحداً. الاختبار النزيه الوحيد هو أن تأخذ مجتمعاً سكانياً بأكمله، وتدعو نصفه إلى الفحص الاستقصائي، وتَعُدّ الوفيات لدى الجميع بدءاً من يوم الدعوة. وهناك برامج فحص استقصائي تجتاز هذا الاختبار، ولهذا بالضبط يستحق الأمر أن نصرّ عليه.",
  "Survival rose for every cancer. Deaths did not follow.":
    "ارتفع البقاء على قيد الحياة في كل سرطان. أما الوفيات فلم تتبعه.",
  "Between 1950 and 1995, five-year survival improved for all 20 of the most common solid tumours in the United States, by as little as 3 points for pancreatic cancer and as much as 50 for prostate. Over the same years the death rate fell for 12 of those cancers and rose for the other 8. Comparing tumour by tumour, the change in survival was unrelated to the change in mortality, and instead tracked the change in how many cancers were being found.":
    "بين عامي 1950 و1995، تحسّن البقاء على قيد الحياة لخمس سنوات في جميع الأورام الصلبة العشرين الأكثر شيوعاً في الولايات المتحدة، بما لا يزيد على 3 نقاط في سرطان البنكرياس وبما يبلغ 50 نقطة في سرطان البروستاتا. وخلال السنوات نفسها، انخفض معدل الوفيات في 12 من تلك السرطانات وارتفع في الثمانية الباقية. وبالمقارنة ورماً بورم، لم تكن للتغير في البقاء صلة بالتغير في الوفيات، بل واكب التغير في عدد السرطانات التي كانت تُكتشف.",
  "Screening babies for a childhood tumour":
    "فحص استقصائي للرُّضّع بحثاً عن ورم طفولي",
  "Two large programmes tested screening infants for neuroblastoma. Quebec screened 476,654 children born over five years, with 92 percent taking part, and deaths from the tumour before the age of eight came to 4.78 per 100,000, no lower than in the comparison populations. Germany compared 1,475,773 screened children with 2,117,600 unscreened ones and found advanced disease in 3.7 against 3.8 per 100,000, and deaths in 1.3 against 1.2. More tumours were found. The same number of children died.":
    "اختبر برنامجان كبيران الفحص الاستقصائي للرُّضّع بحثاً عن الورم الأرومي العصبي. فحصت كيبيك 476,654 طفلاً وُلدوا على مدى خمس سنوات، بمشاركة 92 بالمئة منهم، وبلغت الوفيات بهذا الورم قبل سن الثامنة 4.78 لكل 100,000، أي ليست أقل مما في مجموعات المقارنة. وقارنت ألمانيا 1,475,773 طفلاً خضعوا للفحص بـ 2,117,600 لم يخضعوا له، فوجدت مرضاً متقدماً لدى 3.7 مقابل 3.8 لكل 100,000، ووفيات 1.3 مقابل 1.2. اكتُشفت أورام أكثر. ومات العدد نفسه من الأطفال.",
  "What a real benefit looks like": "كيف تبدو الفائدة الحقيقية",
  "Screening is not doomed to be an illusion, it just has to be measured properly. A trial put 46,551 people aged 50 to 80 into three groups: yearly stool testing for hidden blood, testing every two years, or none. Over 13 years, deaths from colorectal cancer came to 5.88 per 1,000 in the yearly group against 8.83 in the unscreened group, a third fewer. That is a count of deaths in everyone invited, not survival from diagnosis, so no head start could have produced it.":
    "ليس محتوماً على الفحص الاستقصائي أن يكون وهماً، عليه فقط أن يُقاس قياساً سليماً. وزّعت تجربة 46,551 شخصاً تتراوح أعمارهم بين 50 و80 عاماً على ثلاث مجموعات: فحص سنوي للبراز بحثاً عن دم خفي، أو فحص كل سنتين، أو لا فحص. وعلى مدى 13 سنة، بلغت الوفيات بسرطان القولون والمستقيم 5.88 لكل 1000 في المجموعة السنوية مقابل 8.83 في المجموعة التي لم تخضع للفحص، أي أقل بالثلث. وهذا عدٌّ للوفيات لدى كل من دُعي، لا بقاءً على قيد الحياة محسوباً من التشخيص، فما كان لسبق زمني أن ينتجه.",
  "Lead-time bias, a reasoning trap.": "تحيز زمن السبق، فخ في الاستدلال.",
  "Survival is counted from the day you are diagnosed. So a test that finds a disease earlier automatically makes survival look longer, even if it changes nothing about when the disease kills you. You simply spend more of your life as a patient. That is why a screening programme can raise five-year survival dramatically while exactly the same number of people die. The number that cannot be gamed is deaths in the whole population, not survival among the diagnosed.":
    "يُحسب البقاء على قيد الحياة من يوم تشخيصك. لذا فإن اختباراً يكتشف المرض مبكراً يجعل البقاء يبدو أطول تلقائياً، حتى لو لم يغيّر شيئاً في موعد وفاتك بذلك المرض. أنت فقط تقضي جزءاً أكبر من حياتك مريضاً. لهذا يستطيع برنامج فحص استقصائي أن يرفع البقاء لخمس سنوات ارتفاعاً هائلاً بينما يموت العدد نفسه من الناس تماماً. الرقم الذي لا يمكن التلاعب به هو الوفيات في عموم السكان، لا البقاء بين المشخَّصين.",
  "The timeline is a schematic illustration of one life, not measured data. The finding behind it is Welch and colleagues': across the 20 most common solid tumours between 1950 and 1995, five-year survival rose for every one, yet tumour by tumour the change in survival was uncorrelated with the change in mortality (Pearson r = 0.00) and instead tracked the change in incidence (Pearson r = 0.49).":
    "الخط الزمني رسم تخطيطي يوضح حياة واحدة، وليس بيانات مقيسة. أما النتيجة التي يستند إليها فهي لويلش وزملائه: عبر الأورام الصلبة العشرين الأكثر شيوعاً بين عامي 1950 و1995، ارتفع البقاء على قيد الحياة لخمس سنوات في كل منها، ومع ذلك، ورماً بورم، لم يكن التغير في البقاء مرتبطاً بالتغير في الوفيات (معامل بيرسون r = 0.00) بل واكب التغير في معدل الحدوث (معامل بيرسون r = 0.49).",
  "A hospital introduces a blood test that picks up a cancer about two years before symptoms would have appeared. Among patients diagnosed there, five-year survival rises from 41% to 68%. The hospital announces that the test is saving lives.":
    "يستحدث مستشفى اختبار دم يكشف سرطاناً قبل نحو سنتين من ظهور الأعراض. وبين المرضى المشخَّصين فيه، يرتفع البقاء على قيد الحياة لخمس سنوات من 41% إلى 68%. فيعلن المستشفى أن الاختبار ينقذ الأرواح.",
  "Survival is counted from diagnosis, and the diagnosis now happens two years sooner. Everyone gets a two-year head start towards the five-year mark, whether or not the test changed anyone's outcome.":
    "البقاء على قيد الحياة يُحسب من التشخيص، والتشخيص صار يحدث قبل سنتين. فيحصل الجميع على سبق زمني قدره سنتان نحو حاجز الخمس سنوات، سواء غيّر الاختبار نتيجة أحد أم لم يغيّرها.",
  "A national registry reports that the average time between diagnosis and death for a disease has risen from three years to six since a new scan came into routine use. A minister says patients now live twice as long.":
    "يُفيد سجل وطني بأن متوسط المدة بين التشخيص والوفاة في أحد الأمراض ارتفع من ثلاث سنوات إلى ست منذ دخول تصوير جديد في الاستخدام الروتيني. فيقول وزير إن المرضى صاروا يعيشون ضعف ما كانوا يعيشون.",
  "Time from diagnosis to death can double purely because the diagnosis moved earlier. To claim people live longer you have to show that death is arriving later, not that the label is arriving sooner.":
    "قد تتضاعف المدة من التشخيص إلى الوفاة لمجرد أن التشخيص تقدّم إلى وقت أبكر. ولكي تدّعي أن الناس يعيشون مدة أطول، عليك أن تبيّن أن الوفاة تأتي متأخرة، لا أن التسمية تأتي مبكرة.",
  "A region invites half its residents, chosen at random, to be screened for a disease and leaves the other half uninvited. Ten years on it counts deaths from that disease among everyone in both halves, screened or not, attended or not. Deaths are 30% lower in the invited half.":
    "تدعو منطقة نصف سكانها، مختارين عشوائياً، إلى فحص استقصائي لمرض ما، وتترك النصف الآخر دون دعوة. وبعد عشر سنوات، تَعُدّ الوفيات بذلك المرض لدى الجميع في النصفين، من خضع للفحص ومن لم يخضع، ومن لبّى الدعوة ومن لم يلبِّها. فتكون الوفيات أقل بنسبة 30% في النصف المدعو.",
  "This is the design an earlier diagnosis cannot fool. The clock starts at the invitation rather than at diagnosis, and the count includes everyone invited, so no head start and no extra diagnoses can manufacture the difference.":
    "هذا هو التصميم الذي لا يستطيع تشخيص أبكر أن يخدعه. فالساعة تبدأ عند الدعوة لا عند التشخيص، والعدّ يشمل كل من دُعي، لذا لا يستطيع سبق زمني ولا تشخيصات إضافية أن تصنع هذا الفارق.",

  // ---- Tag blurbs (browse screen) ----
  "Anyone can fall for it": "يقع فيه أي أحد",
  "Bites at the bedside": "يلدغ عند سرير المريض",
  "Study design & evidence appraisal": "تصميم الدراسات وتقييم الأدلة",
  "Reading the numbers": "قراءة الأرقام",
  "Tests & diagnostic reasoning": "الاختبارات والاستدلال التشخيصي",
  "Screening programmes": "برامج الفحص الاستقصائي",
  "Populations, exposure & risk": "السكان والتعرض والخطر",
  "Drugs & drug safety": "الأدوية وسلامتها",
  "Mind & behaviour": "العقل والسلوك",
  "Life & evolution": "الحياة والتطور",
  "Data, computing & AI": "البيانات والحوسبة والذكاء الاصطناعي",
  "Markets & incentives": "الأسواق والحوافز",
  "Elections & policy": "الانتخابات والسياسات",
  "Teaching & testing": "التدريس والاختبارات",
  "Investing & returns": "الاستثمار والعوائد",
  "Management & strategy": "الإدارة والاستراتيجية",
  "Courts & forensics": "المحاكم والأدلة الجنائية",
  "Performance & records": "الأداء والأرقام القياسية",
  "The past & how we read it": "الماضي وكيف نقرؤه",
  "News & the numbers in it": "الأخبار والأرقام التي فيها",

  // ---- Odds and ends (chart short labels, timeline scope tags) ----
  A: "A",
  B: "B",
  "From diagnosis": "من التشخيص",
  "The whole life": "الحياة كاملة",

  // ==== Spectrum bias (puzzle #8) ====
  "This urine test catches 92% of infections. Your patient's symptoms are vague. How good is it now?":
    "اختبار البول هذا يكتشف 92% من حالات العدوى. أعراض مريضك غامضة. فما مدى جودته الآن؟",
  "A dipstick for urinary infection, checked against urine cultures in an emergency department and a walk-in clinic. Among patients whose doctor already thought an infection was likely, it caught 49 of the 53 who really had one. Sensitivity is normally quoted as a single number, as though it were a fixed property of the test.":
    "شريط فحص البول للكشف عن العدوى البولية، جرى التحقق منه بمقارنته بزرع البول في قسم للطوارئ وعيادة تستقبل المرضى بلا موعد. فمن بين المرضى الذين كان طبيبهم يرجّح إصابتهم بالعدوى أصلاً، التقط 49 من أصل 53 مريضاً كانوا مصابين بها فعلاً. وعادةً ما تُذكر الحساسية كرقم واحد، كأنها خاصية ثابتة في الاختبار.",
  "In patients the doctor thinks are unlikely to be infected, how often does it catch a real infection?":
    "لدى المرضى الذين يرى الطبيب أن إصابتهم بالعدوى مستبعدة، كم مرة يلتقط عدوى حقيقية؟",
  "Times the dipstick was right": "المرات التي أصاب فيها الشريط",
  "Doctor thought infection likely": "الطبيب رجّح وجود عدوى",
  Likely: "مرجَّحة",
  "Doctor thought infection unlikely": "الطبيب استبعد وجود عدوى",
  Unlikely: "مستبعَدة",
  "Patients who really had an infection": "المرضى المصابون بعدوى فعلاً",
  "Patients who did not": "المرضى غير المصابين",
  "The quoted figure": "الرقم المذكور",
  "About the same, 92%": "نحو الرقم نفسه، 92%",
  "the test has not changed": "الاختبار لم يتغير",
  "A little lower, around 80%": "أقل قليلاً، نحو 80%",
  "some drop off": "بعض التراجع",
  "Barely half, 56%": "النصف بالكاد، 56%",
  "it misses most of them": "يفوته معظمهم",
  "Barely half. And the other column flips the other way.":
    "النصف بالكاد. والعمود الآخر ينقلب في الاتجاه المعاكس.",
  "The patients changed, not the test": "المرضى هم من تغيّروا، لا الاختبار",
  "Patients their doctor already suspected had florid infections, the kind a dipstick spots easily. Patients thought unlikely to be infected had mild or early ones, and the test missed most of them. Now look at the second panel, the patients who had no infection at all: there the test was right 42% of the time in the first group and 78% in the second. Sensitivity and specificity are not properties of a test. They are properties of a test meeting a particular mix of people:":
    "المرضى الذين اشتبه بهم طبيبهم أصلاً كانت لديهم عداوى صارخة، من النوع الذي يرصده شريط الفحص بسهولة. أما من رُئي أن إصابتهم مستبعدة فكانت لديهم عداوى خفيفة أو مبكرة، وقد فات الاختبارَ معظمُها. انظر الآن إلى اللوحة الثانية، أي المرضى الذين لم تكن لديهم أي عدوى: هناك كان الاختبار مصيباً في 42% من الحالات في المجموعة الأولى وفي 78% منها في المجموعة الثانية. الحساسية والنوعية ليستا خاصيتين في الاختبار. إنهما خاصيتان لاختبار يلتقي بمزيج معيّن من الناس:",
  "Both groups": "المجموعتان معاً",
  "The spectrum": "الطيف",
  "How many in each group really had an infection":
    "كم من كل مجموعة كان مصاباً بعدوى فعلاً",
  "Spectrum bias": "تحيز الطيف",
  "A test's accuracy is not fixed. It moves with how advanced, how typical and how obvious the disease is in the patients being tested.":
    "دقة الاختبار ليست ثابتة. فهي تتغير بحسب مدى تقدّم المرض ومدى نمطيته ومدى وضوحه لدى المرضى الخاضعين للاختبار.",
  "Before trusting a quoted sensitivity, ask who it was measured on. A figure from patients with unmistakable disease will flatter the test in a clinic full of milder cases, and a study that recruits only textbook cases and healthy volunteers will flatter it most of all.":
    "قبل أن تثق بحساسية مذكورة، اسأل على من قِيست. فالرقم المأخوذ من مرضى مرضهم لا تخطئه العين سيجمّل الاختبار في عيادة مليئة بحالات أخف، أما الدراسة التي لا تجنّد سوى حالات نموذجية ومتطوعين أصحاء فتجمّله أكثر من الجميع.",
  "Sensitivity is the share of truly ill people a test catches, and specificity is the share of healthy people it correctly clears. Both are quoted as though they belonged to the test, like its price. They do not. A test picks up a signal, and the signal is stronger in advanced disease than in early disease, so the sicker the ill people you test, the more of them it finds. The same logic runs the other way for the people without the disease: the more clearly healthy they are, the more easily the test clears them. That is why a test evaluated on obvious cases against obvious non-cases can look superb and then disappoint in a real clinic, where nearly everyone is somewhere in between. Two practical habits follow. Read the description of who was recruited before you read the accuracy figures. And be most suspicious of a study whose diseased and healthy groups were picked separately rather than being consecutive patients with the same presenting problem.":
    "الحساسية هي نسبة المرضى الحقيقيين الذين يلتقطهم الاختبار، والنوعية هي نسبة الأصحاء الذين ينفي عنهم الاختبار المرض عن حق. وتُذكر النسبتان كأنهما ملك للاختبار، مثل سعره. وهما ليستا كذلك. فالاختبار يلتقط إشارة، والإشارة أقوى في المرض المتقدم منها في المرض المبكر، لذا كلما كان المرضى الذين تختبرهم أشد مرضاً، عثر الاختبار على عدد أكبر منهم. والمنطق نفسه يسري في الاتجاه المقابل على من لا مرض لديهم: كلما كانت صحتهم أوضح، كان نفي المرض عنهم أسهل على الاختبار. لهذا يمكن لاختبار قُيّم على حالات واضحة مقابل أشخاص أصحاء واضحي الصحة أن يبدو ممتازاً ثم يخيّب الأمل في عيادة حقيقية، حيث يقع الجميع تقريباً في مكان ما بين الطرفين. ومن هنا تنشأ عادتان عمليتان. اقرأ وصف من جرى تجنيدهم قبل أن تقرأ أرقام الدقة. وكن أشد ارتياباً بدراسة اختيرت فيها مجموعة المرضى ومجموعة الأصحاء كلٌّ على حدة، بدلاً من أن تكونا مرضى متعاقبين يشكون المشكلة نفسها.",
  "The same test, sorted a different way":
    "الاختبار نفسه، مصنَّفاً بطريقة أخرى",
  "The same study split its patients again, this time by how many white cells were visible in the urine under a microscope. Where none were visible the dipstick caught 5 of the 10 real infections. Where a few were visible it caught 15 of 22. Where there were many it caught all 34 of 34. One test, one afternoon's samples, and a sensitivity anywhere from 50 to 100 percent depending only on which patients you counted.":
    "قسّمت الدراسة نفسها مرضاها مرة أخرى، هذه المرة بحسب عدد الكريات البيض المرئية في البول تحت المجهر. فحيث لم تكن هناك أي كريات مرئية، التقط الشريط 5 من 10 حالات عدوى حقيقية. وحيث كانت قليلة، التقط 15 من 22. وحيث كانت كثيرة، التقطها كلها، 34 من 34. اختبار واحد، وعيّنات ظهيرة واحدة، وحساسية تتراوح من 50 إلى 100 بالمئة، ولا يتوقف ذلك إلا على من عددتَهم من المرضى.",
  "Why promising tests keep disappointing":
    "لماذا تظل الاختبارات الواعدة تخيّب الأمل",
  "The problem was named in 1978, after a pattern of new tests arriving with excellent published accuracy and then underwhelming the doctors who used them. Two of the era's examples were the carcinoembryonic antigen test and the nitro-blue tetrazolium test. The authors traced the letdown to two things: accuracy measured on a patient mix far narrower than real practice, and the test result and the true diagnosis not being judged independently of each other.":
    "سُمّيت المشكلة عام 1978، بعد نمط متكرر من اختبارات جديدة تصل بدقة منشورة ممتازة ثم تخيّب أمل الأطباء الذين يستخدمونها. ومن أمثلة تلك الحقبة اختبار المستضد السرطاني المضغي واختبار النيتروبلو تترازوليوم. وقد أرجع الباحثون خيبة الأمل إلى أمرين: دقة قِيست على مزيج من المرضى أضيق بكثير من الممارسة الواقعية، وعدم الحكم على نتيجة الاختبار والتشخيص الحقيقي كلٍّ باستقلال عن الآخر.",
  "Spectrum bias, a reasoning trap.": "تحيز الطيف، فخ في الاستدلال.",
  "Test accuracy sounds like a fact about the test, the way a car has a top speed. It is not. A test that catches 92% of infections in people who are obviously ill can catch barely half in people who are only slightly ill, because there is less to find. Whenever you are told a test is 95% accurate, the real question is who they measured that on, and whether those people look anything like you.":
    "تبدو دقة الاختبار وكأنها حقيقة عن الاختبار نفسه، مثلما أن للسيارة سرعة قصوى. وهي ليست كذلك. فالاختبار الذي يلتقط 92% من حالات العدوى لدى من يبدو مرضهم واضحاً قد لا يلتقط سوى النصف بالكاد لدى من مرضهم خفيف، لأن ما يمكن العثور عليه أقل. وكلما قيل لك إن دقة اختبار ما 95%، فالسؤال الحقيقي هو: على من قاسوا ذلك، وهل يشبهك أولئك الناس في شيء.",
  "The counts are Table 3, page 137: 49 of 53 and 21 of 50 in the high prior-probability group, 10 of 18 and 188 of 241 in the low one. A positive dipstick meant leukocyte esterase or nitrite or both; a positive culture meant more than 100,000 colonies per millilitre. The correction notes that the high prior-probability group holds 103 patients, not the 107 still printed in the abstract, and that the rates were computed on 103 and stand. The printed abstract also gives the 0.56 confidence interval as 0.03 to 0.79; the paper's own table gives 0.31 to 0.79.":
    "الأعداد مأخوذة من الجدول 3، صفحة 137: 49 من 53 و21 من 50 في مجموعة الاحتمال المسبق المرتفع، و10 من 18 و188 من 241 في المجموعة المنخفضة. وكان الشريط يُعدّ إيجابياً عند وجود إستراز الكريات البيض أو النتريت أو كليهما، ويُعدّ الزرع إيجابياً عند أكثر من 100,000 مستعمرة لكل مليلتر. ويشير التصويب المنشور إلى أن مجموعة الاحتمال المسبق المرتفع تضم 103 مرضى، لا 107 كما لا يزال مطبوعاً في الملخص، وأن المعدلات حُسبت على 103 وتبقى صحيحة. كما يعطي الملخص المطبوع مجال الثقة للقيمة 0.56 على أنه من 0.03 إلى 0.79، بينما يعطي جدول البحث نفسه من 0.31 إلى 0.79.",

  // ==== Berkson's bias (puzzle #9) ====
  "Among hospital patients, lung trouble and joint trouble go together. Are the two diseases linked?":
    "بين مرضى المستشفى، تسير متاعب الرئة ومتاعب المفاصل معاً. فهل المرضان مرتبطان؟",
  "A survey knocked on doors and asked thousands of ordinary people what illnesses they had. Among those who had been in hospital in the previous six months, a quarter of the people with a respiratory disease also had a disease of the bones or joints, against well under a tenth of everyone else.":
    "طرق مسحٌ ميداني الأبواب وسأل آلاف الناس العاديين عن الأمراض التي لديهم. فمن بين من دخلوا المستشفى في الأشهر الستة السابقة، كان لدى ربع المصابين بمرض تنفسي مرضٌ في العظام أو المفاصل أيضاً، مقابل أقل بكثير من العُشر لدى سائر الناس.",
  "Are these two diseases actually related?":
    "هل هذان المرضان مرتبطان فعلاً؟",
  "Also had a bone or joint disease":
    "لديهم أيضاً مرض في العظام أو المفاصل",
  "Had a respiratory disease": "لديهم مرض تنفسي",
  Lungs: "مرض رئوي",
  "No respiratory disease": "لا مرض تنفسي",
  "No lungs": "لا مرض رئوي",
  "In hospital in the last 6 months": "دخلوا المستشفى في آخر 6 أشهر",
  "Everyone the survey asked": "كل من سألهم المسح",
  "Hospital patients": "مرضى المستشفى",
  "Yes, one brings on the other": "نعم، أحدهما يجلب الآخر",
  "three times as common": "الشيوع ثلاثة أضعاف",
  "Yes, but the other way round": "نعم، لكن بالاتجاه المعاكس",
  "the joint disease comes first": "مرض المفاصل يأتي أولاً",
  "No, the hospital made the link": "لا، المستشفى هو من صنع الصلة",
  "it is about who gets admitted": "المسألة في من يدخل المستشفى",
  "Ask everyone, and the link disappears.": "اسأل الجميع، فتختفي الصلة.",
  "Two illnesses are two chances to be admitted":
    "مرضان يعنيان فرصتين لدخول المستشفى",
  "Hospital and community": "المستشفى والمجتمع",
  "The filter": "المِصفاة",
  "Berkson's bias": "تحيز بيركسون",
  "Studying only the people who made it through a filter can invent a relationship that does not exist outside it.":
    "دراسة من عبروا مِصفاةً ما وحدهم قد تخترع علاقة لا وجود لها خارجها.",
  "Hospitals are the obvious filter, and the reason case-control studies built on hospital patients are treated warily. But any selected group does it: people who answered the survey, users who stayed subscribed, applicants who got an interview. Ask what it took to get into the sample, and whether both things you are comparing help you get in.":
    "المستشفيات هي المِصفاة الواضحة، وهي سبب التعامل بحذر مع دراسات الحالات والشواهد المبنية على مرضى المستشفيات. لكن أي مجموعة منتقاة تفعل الشيء نفسه: من أجابوا عن المسح، والمستخدمون الذين ظلوا مشتركين، والمتقدمون الذين حصلوا على مقابلة. اسأل عمّا يلزم للدخول إلى العينة، وعمّا إذا كان الأمران اللذان تقارن بينهما يساعدان كلاهما على الدخول.",
  "Suppose two illnesses are entirely unrelated, and either one on its own gives you some chance of being admitted to hospital. Someone unlucky enough to have both has two shots at admission, so they are much likelier to be in the ward than someone with only one. Now stand inside the ward and count. The people with the first illness are heavily enriched for also having the second, because that is what got many of them in. You have not discovered a link between the diseases. You have rediscovered the admission rule, and dressed it up as biology. The general shape of this is a collider: a thing that two causes both point into. Selecting on it, whether by studying only the admitted, only the tested, or only the successful, links the causes together in your data even when nothing links them in the world. The defence is a sample defined before the filter, which is exactly why population surveys and whole-population registries are worth their cost.":
    "افترض أن مرضين لا علاقة بينهما البتة، وأن كلاً منهما وحده يمنحك بعض احتمال الدخول إلى المستشفى. فمن يسوء حظه ويصاب بهما معاً تكون له فرصتان للدخول، لذا يكون وجوده في الجناح أرجح بكثير من وجود صاحب مرض واحد. قف الآن داخل الجناح وعُدّ. ستجد أن المصابين بالمرض الأول مشحونون بشدة بمن لديهم المرض الثاني أيضاً، لأن ذلك هو ما أدخل كثيراً منهم. أنت لم تكتشف صلة بين المرضين. لقد أعدت اكتشاف قاعدة الإدخال إلى المستشفى، وألبستها ثوب علم الأحياء. والشكل العام لهذا هو ما يسمى المُصادِم: أمر يشير إليه سببان معاً. والانتقاء بناءً عليه، سواء بدراسة من أُدخلوا وحدهم، أو من خضعوا للاختبار وحدهم، أو من نجحوا وحدهم، يربط السببين معاً في بياناتك حتى حين لا يربط بينهما شيء في الواقع. والحصانة هي عينة تُحدَّد قبل المِصفاة، وهذا بالضبط ما يجعل المسوح السكانية والسجلات الشاملة لكل السكان تستحق كلفتها.",
  "The bias that was theory for thirty years":
    "التحيز الذي ظل نظرياً ثلاثين عاماً",
  "Joseph Berkson warned in 1946 that hospital-based comparisons could manufacture associations, but his argument was mathematical and his numbers were invented to illustrate it. He noted that the same artefact would appear if you sampled shuffled cards rather than patients. It took until this survey, three decades later, for anyone to demonstrate the effect in real people.":
    "حذّر جوزيف بيركسون عام 1946 من أن المقارنات المبنية على مرضى المستشفيات قد تصنع ارتباطات مصطنعة، لكن حجته كانت رياضية وأرقامه موضوعة للتوضيح لا مقيسة. ولاحظ أن الأثر المصطنع نفسه سيظهر لو أخذت عينتك من أوراق لعب مخلوطة بدل المرضى. وقد لزم الانتظار حتى هذا المسح، بعد ثلاثة عقود، ليبرهن أحد على الأثر لدى بشر حقيقيين.",
  "Why early covid studies disagreed": "لماذا تناقضت دراسات كوفيد المبكرة",
  "In 2020, studies of who caught covid and who fell severely ill could only recruit from people who had been tested or admitted, and early on those were mostly hospital staff, the already unwell and the elderly. Getting into the sample depended on the very things being studied. Analyses showed this alone could produce apparent risk factors, and even reverse the direction of a real one, without any biology behind it.":
    "في عام 2020، لم يكن بوسع الدراسات التي بحثت في من أصيب بكوفيد ومن اشتد مرضه أن تجنّد إلا من خضعوا للاختبار أو أُدخلوا المستشفى، وكان هؤلاء في البداية في معظمهم من العاملين في المستشفيات ومن المرضى أصلاً وكبار السن. فقد كان الدخول إلى العينة يتوقف على الأمور نفسها التي تجري دراستها. وأظهرت تحليلات أن هذا وحده قادر على إنتاج عوامل خطر ظاهرية، بل وعلى قلب اتجاه عامل خطر حقيقي، دون أي أساس بيولوجي وراء ذلك.",
  "Berkson's bias, a reasoning trap.": "تحيز بيركسون، فخ في الاستدلال.",
  "Look only at hospital patients and two completely unrelated illnesses can appear to travel together. The reason is not biology, it is the door. Either illness can get you admitted, so people who happen to have both are over-represented inside, and from in there the two look linked. Any filtered group does this: the people who got tested, the applicants who got an interview, the customers who stayed. Before believing a pattern, ask what it took to get into the data.":
    "انظر إلى مرضى المستشفى وحدهم، فقد يبدو مرضان لا علاقة بينهما البتة وكأنهما يسيران معاً. والسبب ليس علم الأحياء، بل الباب. فأيٌّ من المرضين قد يُدخلك المستشفى، لذا يكون أصحاب المرضين معاً ممثَّلين تمثيلاً زائداً في الداخل، ومن هناك يبدو المرضان مرتبطين. وأي مجموعة مُصفّاة تفعل ذلك: من خضعوا للاختبار، والمتقدمون الذين حصلوا على مقابلة، والزبائن الذين بقوا. قبل أن تصدّق نمطاً ما، اسأل عمّا لزم للدخول إلى البيانات.",
  "The counts are Table 2: household interviews with 2,784 people, of whom 257 had been in hospital in the previous six months. The table's own relative odds are 1.06 in the general population and 4.06 among the hospitalised. The hospital figures rest on only 20 people with a respiratory disease, so this single table demonstrates the mechanism rather than measuring its size precisely.":
    "الأعداد مأخوذة من الجدول 2: مقابلات منزلية مع 2,784 شخصاً، منهم 257 دخلوا المستشفى في الأشهر الستة السابقة. والأرجحية النسبية في الجدول نفسه هي 1.06 في عموم السكان و4.06 بين من دخلوا المستشفى. وترتكز أرقام المستشفى على 20 شخصاً فقط لديهم مرض تنفسي، لذا فإن هذا الجدول الواحد يبرهن على الآلية أكثر مما يقيس حجمها بدقة.",

  // ==== Trap Hunt test items (spectrum and Berkson) ====
  "A rapid test is validated on patients admitted to hospital with severe disease and on healthy blood donors. It separates the two groups almost perfectly, and the maker reports 98% sensitivity. It is then sold to family doctors for patients with a mild cough.":
    "يُتحقق من اختبار سريع على مرضى أُدخلوا المستشفى بمرض شديد وعلى متبرعين بالدم أصحاء. فيفصل بين المجموعتين فصلاً شبه تام، وتعلن الشركة الصانعة حساسية 98%. ثم يُباع لأطباء الأسرة من أجل مرضى يشكون سعالاً خفيفاً.",
  "Telling the obviously ill from the obviously well is the easiest task there is. A family doctor's patients are all somewhere in between, and that is precisely where the test has never been measured.":
    "تمييز المريض الواضح من السليم الواضح هو أسهل مهمة على الإطلاق. أما مرضى طبيب الأسرة فجميعهم في مكان ما بين الطرفين، وهذا بالضبط هو الموضع الذي لم يُقَس فيه الاختبار قط.",
  "A textbook lists a scan as 90% sensitive. A clinic that sees mostly early, mild cases adopts it and finds it misses about a third of the cases later confirmed by specialists. The clinic concludes its machine must be faulty.":
    "يذكر كتاب مرجعي أن حساسية تصوير ما 90%. فتعتمده عيادة تستقبل في معظمها حالات مبكرة خفيفة، فتجد أنه يفوته نحو ثلث الحالات التي يؤكدها الاختصاصيون لاحقاً. فتخلص العيادة إلى أن جهازها لا بد أن يكون معطلاً.",
  "A quoted sensitivity comes attached to the patients it was measured on. Earlier and milder disease gives a test less to find, so a lower catch rate is what you should expect, not evidence of a broken machine.":
    "الحساسية المذكورة تأتي مرتبطة بالمرضى الذين قِيست عليهم. والمرض الأبكر والأخف يترك للاختبار ما هو أقل ليجده، لذا فإن معدل التقاط أدنى هو ما ينبغي أن تتوقعه، لا دليلاً على جهاز معطل.",
  "A study of one hospital's inpatients finds that those with a metabolic disease are far more likely to also have a gallbladder disease than the other inpatients. The authors conclude that the first disease brings on the second.":
    "تجد دراسة على المرضى المقيمين في مستشفى واحد أن المصابين بمرض استقلابي أرجح بكثير أن يكون لديهم أيضاً مرض في المرارة مقارنة ببقية المرضى المقيمين. فيخلص الباحثون إلى أن المرض الأول يجلب الثاني.",
  "Either illness on its own can put someone in a hospital bed, so patients with both are over-represented among inpatients. The link may exist only inside the building.":
    "كلٌّ من المرضين وحده قد يضع صاحبه في سرير مستشفى، لذا يكون المرضى المصابون بهما معاً ممثَّلين تمثيلاً زائداً بين المرضى المقيمين. وقد لا تكون الصلة موجودة إلا داخل المبنى.",
  "Someone notices that among the people they have dated, the better looking ones were consistently less pleasant company. They conclude that good looks spoil the character.":
    "يلاحظ شخص أن الأجمل مظهراً بين من واعدهم كانوا دائماً أقل لطفاً في الصحبة. فيخلص إلى أن حسن المظهر يفسد الطباع.",
  "People generally agree to a date because someone is good looking or because they are pleasant company. Selecting on that forces a trade-off between the two inside the sample, whatever the relationship is outside it.":
    "يوافق الناس عادةً على موعد غرامي إما لأن الطرف الآخر حسن المظهر وإما لأنه لطيف الصحبة. والانتقاء على هذا الأساس يفرض مقايضة بين الأمرين داخل العينة، مهما كانت العلاقة بينهما خارجها.",
  "A diagnostic test is evaluated on every consecutive patient arriving at a clinic with the same presenting complaint, whatever their eventual diagnosis, and the paper reports its accuracy separately for mild and for advanced disease. Another clinic with a similar caseload adopts the figures.":
    "يُقيَّم اختبار تشخيصي على كل مريض متعاقب يصل إلى عيادة بالشكوى نفسها، أياً كان تشخيصه في النهاية، ويعرض البحث دقته منفصلةً للمرض الخفيف وللمرض المتقدم. وتعتمد تلك الأرقامَ عيادةٌ أخرى ذات حالات مشابهة.",
  "This is how a diagnostic study should be built. Consecutive patients with one presenting problem, and accuracy broken down by severity, so a reader can find the subgroup that actually resembles their own patients.":
    "هكذا ينبغي أن تُبنى الدراسة التشخيصية. مرضى متعاقبون يشكون مشكلة واحدة، ودقة مفصَّلة حسب الشدة، حتى يجد القارئ المجموعة الفرعية التي تشبه مرضاه فعلاً.",
  "A company asks whether two things about its users go together. It samples at random from everyone who ever opened an account, including those who never came back and those who cancelled, and finds no relationship between them.":
    "تسأل شركة عمّا إذا كان أمران يخصان مستخدميها يسيران معاً. فتأخذ عينة عشوائية من كل من فتح حساباً يوماً، بمن فيهم من لم يعودوا قط ومن ألغوا حساباتهم، فلا تجد أي علاقة بين الأمرين.",
  "The sample was drawn before any filter that either of the two things could have influenced. Nothing about staying, succeeding or being admitted decided who got counted, so a selection artefact cannot be hiding in it.":
    "سُحبت العينة قبل أي مِصفاة كان يمكن لأيٍّ من الأمرين أن يؤثر فيها. فلم يكن البقاء ولا النجاح ولا الدخول إلى المستشفى هو ما قرر من يُحتسب، لذا لا يمكن أن يختبئ فيها أثر انتقاء مصطنع.",

  // ---- Berkson's bias, corrected wording ----
  "The same survey, the same people, the same two diseases. Across everyone it asked, people with a respiratory disease were barely any likelier to have a bone or joint disease than people without one, and the odds come out at 1.06 against 1, which is nothing. The hospital panel is not a finding about disease, it is a finding about admission. Either illness can put you in a hospital bed, so people with both turn up there far more often than people with one, and inside those walls the two look inseparable:":
    "المسح نفسه، والناس أنفسهم، والمرضان نفساهما. فعبر كل من سألهم المسح، لم يكن المصابون بمرض تنفسي أرجح إلا بالكاد أن يكون لديهم مرض في العظام أو المفاصل مقارنة بغير المصابين، والأرجحية تبلغ 1.06 مقابل 1، وهو ما لا يعني شيئاً. لوحة المستشفى ليست نتيجة عن المرض، بل نتيجة عن دخول المستشفى. فأيٌّ من المرضين قد يضعك في سرير مستشفى، لذا يظهر أصحاب المرضين معاً هناك أكثر بكثير من أصحاب مرض واحد، وداخل تلك الجدران يبدو المرضان لا ينفصلان:",

  // ==== Relative versus absolute risk (puzzle #10) ====
  "A drug cuts your risk of a heart attack by about a third. How many people does that help?":
    "دواء يخفض خطر إصابتك بنوبة قلبية بنحو الثلث. فكم شخصاً يساعد ذلك؟",
  "A trial gave 6,595 middle-aged men with high cholesterol and no history of heart trouble either a statin or a dummy pill, and followed them for about five years. The drug cut heart attacks and coronary deaths by roughly a third. That is a real result, and it is how the finding was reported.":
    "أعطت تجربة 6,595 رجلاً في منتصف العمر لديهم كوليسترول مرتفع ولا تاريخ لهم مع متاعب القلب إما ستاتين وإما دواءً وهمياً، وتابعتهم نحو خمس سنوات. وقد خفض الدواء النوبات القلبية والوفيات التاجية بنحو الثلث. تلك نتيجة حقيقية، وهكذا جرى الإبلاغ عنها.",
  "Out of 1,000 men who took it for five years, how many were spared a heart attack or a coronary death?":
    "من كل 1,000 رجل تناولوه خمس سنوات، كم واحداً جرى تجنيبه نوبة قلبية أو وفاة تاجية؟",
  "A five-year statin trial in 6,595 men":
    "تجربة ستاتين على مدى خمس سنوات في 6,595 رجلاً",
  "Heart attack or death from heart disease": "نوبة قلبية أو وفاة بمرض قلبي",
  "Dummy pill": "دواء وهمي",
  Statin: "ستاتين",
  "of the risk removed": "من الخطر أُزيل",
  "spared, in every 1,000 men treated for five years":
    "جُنِّبوا الإصابة، من كل 1,000 رجل عولجوا خمس سنوات",
  "men treated for five years to spare one":
    "رجلاً يجب علاجهم خمس سنوات لتجنيب واحد منهم",
  "About 300": "نحو 300",
  "roughly a third of them": "تقريباً ثلثهم",
  "About 100": "نحو 100",
  "one in ten": "واحد من كل عشرة",
  "About 23": "نحو 23",
  "roughly 1 in 44": "تقريباً 1 من كل 44",
  "Twenty three men in a thousand.": "ثلاثة وعشرون رجلاً من كل ألف.",
  "A third of a risk that was small to begin with": "ثلث خطر كان صغيراً أصلاً",
  "Both numbers come from the same trial. Without the drug, about 75 men in 1,000 had a heart attack or died of heart disease over the five years. With it, about 53 did. That is a third of the risk gone, and it is also 23 men in 1,000. The first number is divided by the risk, the second by the people, which is the whole reason they feel so different. Put the other way round, 44 men had to take the drug for five years for one of them to be spared:":
    "الرقمان كلاهما من التجربة نفسها. فمن دون الدواء، أصيب نحو 75 رجلاً من كل 1,000 بنوبة قلبية أو توفوا بمرض قلبي خلال السنوات الخمس. ومعه، أصيب نحو 53. ذلك ثلث الخطر قد زال، وهو أيضاً 23 رجلاً من كل 1,000. الرقم الأول مقسوم على الخطر، والثاني مقسوم على الناس، وهذا وحده سبب اختلاف وقعهما إلى هذا الحد. وبالمقلوب، كان على 44 رجلاً أن يتناولوا الدواء خمس سنوات كي يُجنَّب واحد منهم:",
  "A third of what?": "ثلث ماذا؟",
  "Relative versus absolute risk": "الخطر النسبي مقابل الخطر المطلق",
  "A percentage reduction tells you what share of a risk went away. It cannot tell you how big that risk was, and that is the part that decides whether it matters to you.":
    "الخفض بالنسبة المئوية يخبرك ما حصة الخطر التي زالت. لكنه لا يستطيع أن يخبرك كم كان ذلك الخطر كبيراً، وهذا هو الجزء الذي يقرر إن كان الأمر يعنيك.",
  "Whenever you meet a percentage change, ask what it is a percentage of. Halving a one-in-a-million risk and halving a one-in-two risk make the same headline and mean completely different things. The two figures worth asking for are the difference in plain numbers of people, and how many have to be treated for one of them to benefit.":
    "كلما صادفت تغيراً بنسبة مئوية، اسأل: نسبة مئوية من ماذا؟ فتنصيف خطر مقداره واحد في المليون وتنصيف خطر مقداره واحد من اثنين ينتجان العنوان نفسه ويعنيان أمرين مختلفين تماماً. والرقمان اللذان يستحقان السؤال عنهما هما الفارق بأعداد الناس الصريحة، وكم شخصاً يجب علاجهم كي يستفيد واحد منهم.",
  "Take a risk of 8 in 100 and drop it to 5 in 100. Divide the drop by the risk and you get a third, which sounds like a lot. Divide the same drop by the people and you get 3 in 100, which sounds like very little. Neither is wrong. They answer different questions: what fraction of the danger was removed, and what are the odds this helps me. Only the second one is about you. The gap between them grows as the risk shrinks, which is why the most impressive relative figures usually come from the rarest outcomes. This is not only a media problem. Relative figures make treatments look better to doctors too, and the same trial result draws more enthusiasm when it is described relatively than when it is described in whole people. It also cuts the other way with harms: a scare expressed as a doubling of risk sounds alarming whether the risk went from 1 in 10 to 2 in 10 or from 1 in 100,000 to 2 in 100,000. The habit that protects you in both directions is to insist on the numbers out of a fixed group of people, and on how many have to be treated, or exposed, for one to be affected.":
    "خذ خطراً مقداره 8 من كل 100 وأنزله إلى 5 من كل 100. اقسم الانخفاض على الخطر فتحصل على الثلث، وهو ما يبدو كثيراً. واقسم الانخفاض نفسه على الناس فتحصل على 3 من كل 100، وهو ما يبدو قليلاً جداً. ولا أحد الرقمين خاطئ. إنهما يجيبان عن سؤالين مختلفين: ما الحصة التي أُزيلت من الخطر، وما احتمال أن يفيدني هذا أنا. والثاني وحده هو الذي يخصك. والفجوة بينهما تتسع كلما صغر الخطر، ولهذا تأتي أكثر الأرقام النسبية إبهاراً عادةً من أندر النتائج. وهذه ليست مشكلة إعلامية فحسب. فالأرقام النسبية تجعل العلاجات تبدو أفضل في عيون الأطباء أيضاً، ونتيجة التجربة الواحدة تثير حماسة أكبر حين تُوصف نسبياً مما تثيره حين تُوصف بأعداد أشخاص كاملين. والأمر ينقلب كذلك في جانب الأضرار: فتحذير يُصاغ على أنه مضاعفة للخطر يبدو مخيفاً سواء انتقل الخطر من 1 من كل 10 إلى 2 من كل 10 أو من 1 من كل 100,000 إلى 2 من كل 100,000. والعادة التي تحميك في الاتجاهين هي أن تصرّ على الأرقام منسوبة إلى مجموعة ثابتة من الناس، وعلى عدد من يجب علاجهم، أو تعريضهم، كي يتأثر واحد منهم.",
  "The same kind of drug, in people at real risk":
    "النوع نفسه من الدواء، لدى أشخاص معرَّضين لخطر حقيقي",
  "A second trial gave a statin to patients who had already had a heart attack or had angina. Major coronary events fell from 28 percent to 19 percent. As a relative figure that is about a third, almost the same headline as in the healthy men. But because the risk it was cutting into was nearly four times larger, the gain was about 9 patients in every 100 instead of 2. The identical headline, several times the benefit. This is why a percentage on its own cannot tell you whether a drug is worth taking, and why the answer differs from patient to patient.":
    "أعطت تجربة ثانية ستاتين لمرضى سبق أن أصيبوا بنوبة قلبية أو لديهم ذبحة صدرية. فانخفضت الأحداث التاجية الكبرى من 28 بالمئة إلى 19 بالمئة. وكرقم نسبي، هذا نحو الثلث، أي العنوان نفسه تقريباً كما في الرجال الأصحاء. لكن لأن الخطر الذي كان يقتطع منه أكبر بنحو أربعة أضعاف، بلغ المكسب نحو 9 مرضى من كل 100 بدلاً من 2. العنوان ذاته، والفائدة أضعاف مضاعفة. ولهذا لا تستطيع نسبة مئوية وحدها أن تخبرك إن كان دواء يستحق التناول، ولهذا تختلف الإجابة من مريض إلى آخر.",
  "When a relative figure did real damage": "حين ألحق رقم نسبي ضرراً حقيقياً",
  "In October 1995 a British safety committee warned that some contraceptive pills carried about twice the risk of a blood clot. The warning travelled as a doubling, with no sense of how small the risk was either way, and women stopped taking the pill. Among girls under 16, use fell from 40 percent to 27 percent within a year. The health service met roughly 21 million pounds in extra maternity costs and 46 million pounds in abortion provision. A relative figure with no absolute figure beside it is not a neutral way to describe a risk.":
    "في أكتوبر 1995، حذّرت لجنة سلامة بريطانية من أن بعض حبوب منع الحمل تحمل نحو ضعف خطر الجلطة. وانتقل التحذير بوصفه مضاعفة، دون أي تصور لمدى صغر الخطر في الحالتين، فتوقفت النساء عن تناول الحبوب. وبين الفتيات دون سن 16، هبط الاستعمال من 40 بالمئة إلى 27 بالمئة خلال سنة. وتحمّلت الخدمة الصحية نحو 21 مليون جنيه إسترليني تكاليف ولادة إضافية و46 مليون جنيه إسترليني لتوفير خدمات الإجهاض. والرقم النسبي دون رقم مطلق إلى جانبه ليس طريقة محايدة لوصف خطر.",
  "The fix is in the wording": "الحل في الصياغة",
  "Describe the same result in whole people, so many out of 1,000 against so many out of 1,000, and both patients and doctors judge it far more accurately than when it arrives as a percentage reduction. Relative risks belong to a small family of formats that reliably confuse, alongside single-event probabilities and conditional ones like a test's sensitivity. None of them is wrong. They are just easy to misread, and there is a clearer way to say the same thing.":
    "صِف النتيجة نفسها بأشخاص كاملين، كذا من كل 1,000 مقابل كذا من كل 1,000، فيحكم عليها المرضى والأطباء على السواء بدقة أكبر بكثير مما يفعلون حين تصلهم على شكل خفض بنسبة مئوية. والأخطار النسبية تنتمي إلى أسرة صغيرة من الصيغ التي تربك الناس على نحو موثوق، إلى جانب احتمالات الحدث المفرد والاحتمالات الشرطية مثل حساسية اختبار ما. ولا واحدة منها خاطئة. إنها فقط سهلة على سوء القراءة، وثمة طريقة أوضح لقول الشيء نفسه.",
  "Relative versus absolute risk, a reasoning trap.":
    "الخطر النسبي مقابل الخطر المطلق، فخ في الاستدلال.",
  "\"Cuts your risk by a third\" sounds enormous. But a third of what? If the risk was 75 in 1,000, a third of it is 23 people. If the risk was 3 in 1,000, a third of it is one. The percentage tells you how much of the risk went away and says nothing at all about how much risk there was, which is the part that decides whether it matters to you. Ask for the plain numbers: how many out of 1,000, and how many people have to take it for one of them to benefit.":
    "«يخفض خطرك بمقدار الثلث» عبارة تبدو هائلة. لكن ثلث ماذا؟ إذا كان الخطر 75 من كل 1,000، فثلثه 23 شخصاً. وإذا كان الخطر 3 من كل 1,000، فثلثه شخص واحد. النسبة المئوية تخبرك كم زال من الخطر ولا تقول شيئاً على الإطلاق عن حجم الخطر الذي كان موجوداً، وهذا هو الجزء الذي يقرر إن كان الأمر يعنيك. اطلب الأرقام الصريحة: كم من كل 1,000، وكم شخصاً يجب أن يتناولوه كي يستفيد واحد منهم.",
  "The counts are the trial's primary endpoint, a definite nonfatal heart attack or death from coronary heart disease: 248 events among the men on placebo and 174 among those on pravastatin, over an average of 4.9 years. The paper reports a 31 percent relative risk reduction, estimated from a proportional-hazards model; the crude counts give 30 percent. Every figure this puzzle shows is derived from the counts, so it quotes about a third rather than a number the chart would contradict.":
    "الأعداد هي نقطة النهاية الأولية للتجربة، أي نوبة قلبية غير مميتة مؤكدة أو وفاة بمرض القلب التاجي: 248 حدثاً بين الرجال على الدواء الوهمي و174 بين من تناولوا برافاستاتين، على مدى 4.9 سنوات وسطياً. ويذكر البحث خفضاً نسبياً للخطر بنسبة 31 بالمئة، مقدَّراً من نموذج المخاطر التناسبية، بينما تعطي الأعداد الخام 30 بالمئة. وكل رقم تعرضه هذه الأحجية مشتق من الأعداد، لذا تذكر «نحو الثلث» بدلاً من رقم يناقضه الرسم البياني.",

  // ==== Trap Hunt test items (relative versus absolute risk) ====
  "A press release says a new drug halves the risk of a rare complication. It does not say how common the complication is. A newspaper runs the story under the headline that the drug halves the danger.":
    "بيان صحفي يقول إن دواءً جديداً ينصّف خطر مضاعفة نادرة. ولا يذكر مدى شيوع تلك المضاعفة. فتنشر صحيفة الخبر تحت عنوان يقول إن الدواء ينصّف الخطر.",
  "Halving a risk means nothing until you know the risk. If the complication strikes 2 people in 10,000, halving it spares one of them.":
    "تنصيف خطر لا يعني شيئاً حتى تعرف حجم ذلك الخطر. فإذا كانت المضاعفة تصيب 2 من كل 10,000 شخص، فإن تنصيفها يجنّب واحداً منهما.",
  "A supplement is advertised as cutting the chance of a particular cancer by 40%. The trial it rests on found 7 cases among about 1,000 people taking the supplement and 12 among about 1,000 taking a dummy.":
    "يُروَّج لمكمّل غذائي على أنه يخفض احتمال سرطان معيّن بنسبة 40%. والتجربة التي يستند إليها وجدت 7 حالات بين نحو 1,000 شخص يتناولون المكمّل و12 حالة بين نحو 1,000 يتناولون دواءً وهمياً.",
  "The 40% is arithmetically right and it amounts to 5 people in 1,000. Around 200 people would have to take the supplement for years for one of them to avoid a cancer.":
    "رقم 40% صحيح حسابياً وهو يساوي 5 أشخاص من كل 1,000. وسيتعين على نحو 200 شخص أن يتناولوا المكمّل سنوات كي يتفادى واحد منهم سرطاناً.",
  "A trial reports that the treatment reduced strokes from 12 in every 100 patients to 8 in every 100, calls that a reduction of a third, and adds that about 25 patients need to be treated for five years to prevent one stroke.":
    "تُبلغ تجربة أن العلاج خفض السكتات الدماغية من 12 من كل 100 مريض إلى 8 من كل 100، وتسمّي ذلك خفضاً بمقدار الثلث، وتضيف أن نحو 25 مريضاً يحتاجون إلى العلاج خمس سنوات لمنع سكتة واحدة.",
  "The relative figure, the plain numbers of people and the number needed to treat are all on the table, so nothing is hidden behind the percentage. This is how a result should be reported.":
    "الرقم النسبي وأعداد الناس الصريحة وعدد المرضى اللازم علاجهم كلها معروضة، فلا شيء مختبئ خلف النسبة المئوية. هكذا ينبغي أن يُبلَّغ عن نتيجة.",

  // ---- Scope tags (risk chart) ----
  "Compared to the risk": "قياساً إلى الخطر",
  "Compared to the people": "قياساً إلى الناس",

  // ==== Confounding by indication (puzzle #11) ====
  "Patients taking this heart drug died more often than patients not taking it. Is the drug killing them?":
    "المرضى الذين يتناولون دواء القلب هذا ماتوا أكثر من الذين لا يتناولونه. فهل الدواء هو الذي يقتلهم؟",
  "6,800 people with heart failure. When they joined the trial, some were already on digoxin because a doctor had decided to prescribe it, and some were not. Over the following years, 40 percent of those already on it died, against 31 percent of the others.":
    "6,800 شخص مصاب بقصور القلب. عند انضمامهم إلى التجربة، كان بعضهم يتناول الديجوكسين أصلاً لأن طبيباً قرر وصفه له، وبعضهم لا يتناوله. وعلى مدى السنوات التالية، توفي 40 بالمئة ممن كانوا يتناولونه أصلاً، مقابل 31 بالمئة من الآخرين.",
  "Is digoxin causing those extra deaths?":
    "هل الديجوكسين هو سبب تلك الوفيات الزائدة؟",
  "Died during the trial": "توفوا أثناء التجربة",
  "On digoxin": "يتناولون الديجوكسين",
  Digoxin: "ديجوكسين",
  "Not on digoxin": "لا يتناولون الديجوكسين",
  "Not on it": "لا يتناولونه",
  "Sorted by what doctors prescribed": "مصنَّفون حسب ما وصفه الأطباء",
  "Sorted by the trial's coin flip": "مصنَّفون حسب رمي العملة في التجربة",
  "As prescribed in practice": "كما وُصف في الممارسة",
  "Yes, the drug is harming them": "نعم، الدواء يضرّهم",
  "nine points worse": "أسوأ بتسع نقاط",
  "No, and adjusting for severity will show that":
    "لا، والتعديل الإحصائي لشدة الحالة سيبيّن ذلك",
  "the statistics can correct it": "الإحصاء قادر على تصحيحه",
  "No, and adjusting will not fix it either":
    "لا، والتعديل الإحصائي لن يصلحه أيضاً",
  "the prescription marks the patient": "الوصفة الطبية تشي بحال المريض",
  "The same 6,800 patients, sorted by a coin flip. No difference.":
    "المرضى الـ 6,800 أنفسهم، مصنَّفين حسب رمي عملة. لا فرق.",
  "The prescription marked how ill they already were":
    "الوصفة الطبية كانت علامة على شدة مرضهم أصلاً",
  "These are the same people in both panels, grouped two different ways. Sorted by what their doctors had decided, digoxin looks lethal. Sorted by the trial's random assignment, which no clinical judgement touched, the two groups die at the same rate. Doctors were reaching for digoxin in the patients who were already worse off, so the prescription carried information about the patient that nothing in the dataset had recorded:":
    "هؤلاء هم الأشخاص أنفسهم في اللوحتين، مجموعين بطريقتين مختلفتين. فحسب ما قرره أطباؤهم، يبدو الديجوكسين قاتلاً. وحسب التوزيع العشوائي في التجربة، الذي لم يمسسه أي حكم سريري، تموت المجموعتان بالمعدل نفسه. كان الأطباء يلجأون إلى الديجوكسين لدى المرضى الأسوأ حالاً أصلاً، فحملت الوصفة الطبية معلومة عن المريض لم يسجلها أي شيء في مجموعة البيانات:",
  "Both ways of sorting": "طريقتا التصنيف معاً",
  "Adjusting for 27 recorded baseline characteristics barely moved it, from a 36 percent excess to 22 percent. And the same excess turned up among the patients the trial had randomised to placebo, people who took no digoxin at all during it. A drug cannot harm those who never received it, so the excess was never the drug.":
    "لم يُحرّك التعديل الإحصائي لـ 27 من الخصائص الأولية المسجَّلة الأمرَ إلا بالكاد، من زيادة قدرها 36 بالمئة إلى 22 بالمئة. ثم ظهرت الزيادة نفسها بين المرضى الذين وزعتهم التجربة عشوائياً على الدواء الوهمي، وهم أشخاص لم يتناولوا الديجوكسين أثناءها إطلاقاً. والدواء لا يستطيع أن يضر من لم يتلقوه قط، لذا لم تكن الزيادة يوماً من الدواء.",
  "The reason for the prescription": "سبب الوصفة الطبية",
  "Confounding by indication": "الخلط حسب دواعي الاستعمال",
  "When a doctor decides who gets a treatment, the treated differ from the untreated in ways the data never recorded, and the treatment takes the blame, or the credit, for the reason it was given.":
    "حين يقرر الطبيب من يتلقى العلاج، يختلف من عولجوا عمّن لم يعالَجوا بطرق لم تسجلها البيانات قط، فيتحمل العلاجُ اللومَ، أو ينال الفضلَ، عن السبب الذي أُعطي من أجله.",
  "This is why observational comparisons between treated and untreated patients are read so warily, and why \"we adjusted for that\" does not end the argument. Adjustment can only remove what was written down. The judgement that led to the prescription usually was not.":
    "لهذا تُقرأ المقارنات الرصدية بين المرضى المعالَجين وغير المعالَجين بحذر شديد، ولهذا لا تُنهي عبارة «لقد عدّلنا إحصائياً لذلك» النقاش. فالتعديل الإحصائي لا يستطيع أن يزيل إلا ما كُتب. أما الحكم الذي أدى إلى الوصفة الطبية فلم يكن مكتوباً في العادة.",
  "Treatments are not handed out at random. A doctor prescribes because of something about the patient: they are sicker, or frailer, or their symptoms are worse. That something also affects how they were going to do anyway. So the treated group starts out different, and any comparison with the untreated measures both the drug and the reason it was chosen, tangled together. It runs both ways. A drug given to the sickest looks harmful; a drug given to the fittest, or one that only patients well enough to attend a clinic can receive, looks miraculous. The standard defence is to adjust for the differences, and it helps, but only for the differences someone thought to record. The clinician's impression that this particular patient was going downhill is real information, it is why the prescription happened, and it is almost never in the dataset. That is the whole reason randomised trials are worth their expense: a coin flip cannot know anything about the patient, so it cannot smuggle the reason into the comparison. When a trial and an observational study disagree about the same drug, this is usually why.":
    "العلاجات لا تُوزَّع عشوائياً. فالطبيب يصف الدواء بسبب شيء ما في المريض: هو أشد مرضاً، أو أوهن، أو أعراضه أسوأ. وذلك الشيء نفسه يؤثر أيضاً في مآله على أي حال. لذا تبدأ المجموعة المعالَجة مختلفة، وأي مقارنة مع غير المعالَجين تقيس الدواء وسبب اختياره معاً، متشابكين. والأمر يجري في الاتجاهين. فالدواء الذي يُعطى للأشد مرضاً يبدو ضاراً، والدواء الذي يُعطى للأوفر صحة، أو الذي لا يتلقاه إلا مرضى في حال تسمح لهم بالحضور إلى العيادة، يبدو معجزة. والدفاع المعتاد هو التعديل الإحصائي للفروق، وهو يفيد، لكن للفروق التي خطر لأحدهم أن يسجلها فقط. أما انطباع الطبيب بأن هذا المريض بالذات كان يتدهور فهو معلومة حقيقية، وهو سبب حدوث الوصفة الطبية، ولا يكاد يوجد قط في مجموعة البيانات. وهذا وحده سبب استحقاق التجارب العشوائية لكلفتها: فرمي العملة لا يمكن أن يعرف شيئاً عن المريض، لذا لا يستطيع أن يهرّب السبب إلى داخل المقارنة. وحين تختلف تجربة سريرية ودراسة رصدية بشأن الدواء نفسه، فهذا هو السبب عادةً.",
  "Taking your pills predicts survival, even when they are dummies":
    "الالتزام بتناول الأقراص يتنبأ بالبقاء على قيد الحياة، حتى حين تكون الأقراص وهمية",
  "An earlier trial split its patients by how faithfully they had taken their tablets. Those who took at least 80 percent of them had 15.0 percent five-year mortality against 24.6 percent for the rest, which looks like proof that the drug works if you actually take it. Then the researchers ran the same split inside the placebo group, where the tablets contained nothing: 15.1 percent against 28.2 percent. Adjusting for 40 recorded characteristics narrowed that gap to 16.4 against 25.8 and left it overwhelming. Whatever adherence marks about a person, it was not the medicine.":
    "قسّمت تجربة أسبق مرضاها حسب مدى التزامهم بتناول أقراصهم. فمن تناولوا 80 بالمئة منها على الأقل بلغ معدل الوفيات لديهم بعد خمس سنوات 15.0 بالمئة مقابل 24.6 بالمئة لدى الباقين، وهو ما يبدو دليلاً على أن الدواء ينفع إن تناولته فعلاً. ثم أجرى الباحثون التقسيم نفسه داخل مجموعة الدواء الوهمي، حيث لم تكن الأقراص تحتوي على شيء: 15.1 بالمئة مقابل 28.2 بالمئة. وضيّق التعديل الإحصائي لـ 40 خاصية مسجَّلة تلك الفجوة إلى 16.4 مقابل 25.8 وتركها ساحقة. ومهما يكن ما يدل عليه الالتزام بالعلاج في الشخص، فهو لم يكن الدواء.",
  "The same argument, about a procedure": "الحجة نفسها، بشأن إجراء طبي",
  "In a study of 5,735 critically ill patients, those who had a catheter threaded into the right side of the heart died more often within 30 days than those who did not, 38.0 percent against 30.6 percent. The procedure was reserved for the patients in most trouble. When it was later tested by randomising who got one, mortality came out at 62 percent with the catheter and 60 percent without, in a trial whose patients were sicker still. The gap that had looked like harm was mostly a gap in who was chosen.":
    "في دراسة شملت 5,735 مريضاً في حالة حرجة، مات من أُدخلت لهم قسطرة إلى الجانب الأيمن من القلب خلال 30 يوماً أكثر ممن لم تُدخل لهم، 38.0 بالمئة مقابل 30.6 بالمئة. وكان هذا الإجراء مقصوراً على المرضى الأشد تعثراً. وحين اختُبر لاحقاً بتوزيع من يتلقاه عشوائياً، جاء معدل الوفيات 62 بالمئة مع القسطرة و60 بالمئة من دونها، في تجربة كان مرضاها أشد مرضاً بعدُ. فالفجوة التي بدت ضرراً كانت في معظمها فجوة في من جرى اختياره.",
  "Confounding by indication, a reasoning trap.":
    "الخلط حسب دواعي الاستعمال، فخ في الاستدلال.",
  "Nobody hands out medicines at random. Doctors prescribe because of something about the patient, and that something usually affects how the patient was going to do anyway. So people on a drug can die more often than people not on it while the drug does nothing at all: it was given to those who were already worse off. Adjusting for the differences helps, but only the differences somebody wrote down, and the reason for the prescription rarely is one. It is why a coin flip is worth so much.":
    "لا أحد يوزّع الأدوية عشوائياً. فالأطباء يصفون الدواء بسبب شيء ما في المريض، وذلك الشيء يؤثر عادةً في مآل المريض على أي حال. لذا يمكن أن يموت متناولو دواء ما أكثر من غير متناوليه بينما لا يفعل الدواء شيئاً البتة: فقد أُعطي لمن كانوا أسوأ حالاً أصلاً. والتعديل الإحصائي للفروق يفيد، لكن للفروق التي كتبها أحدهم فقط، ونادراً ما يكون سبب الوصفة الطبية واحداً منها. لهذا يساوي رمي العملة كل هذا القدر.",
  "The four death counts are printed in the 2019 paper, and the randomised arm sizes in the 1997 trial report. The two prescribed-in-practice denominators are not printed anywhere: 3,017 is the sum of the supplement's two counts of prior digoxin use (1,498 and 1,519) and 3,783 is the rest of the 6,800. That is addition over published whole numbers rather than a figure worked backwards from a percentage, and it closes both ways: 1,207 plus 1,168 and 1,181 plus 1,194 both give 2,375 deaths, and both pairs of denominators give 6,800 patients.":
    "أعداد الوفيات الأربعة مطبوعة في بحث عام 2019، وأحجام الذراعين العشوائيتين في تقرير تجربة عام 1997. أما مقاما المجموعتين المصنَّفتين حسب الوصف في الممارسة فغير مطبوعين في أي مكان: فالعدد 3,017 هو مجموع عدَدَي الاستعمال السابق للديجوكسين في الملحق (1,498 و1,519)، والعدد 3,783 هو بقية الـ 6,800. وهذه عملية جمع لأعداد صحيحة منشورة، لا رقم استُخرج عكسياً من نسبة مئوية، وهي تُغلق الحساب في الاتجاهين: فـ 1,207 زائد 1,168، و1,181 زائد 1,194، كلاهما يعطي 2,375 وفاة، وكلا زوجَي المقامات يعطي 6,800 مريض.",

  // ==== Trap Hunt test items (confounding by indication) ====
  "A hospital reviews its records and finds that patients who were given a particular breathing support died far more often than patients who were not. A committee recommends using it less.":
    "يراجع مستشفى سجلاته فيجد أن المرضى الذين تلقوا نوعاً معيناً من دعم التنفس ماتوا أكثر بكثير من المرضى الذين لم يتلقوه. فتوصي لجنة باستعماله بدرجة أقل.",
  "The support was given to the patients who were struggling to breathe. It is standing in for how ill they already were, and the records cannot separate the treatment from the reason it was reached for.":
    "أُعطي الدعم للمرضى الذين كانوا يعانون في التنفس. فهو يقوم مقام مؤشر على شدة مرضهم أصلاً، والسجلات لا تستطيع فصل العلاج عن السبب الذي دعا إليه.",
  "An observational study finds higher mortality among patients on a drug. The authors adjust for age, sex, blood pressure and twelve laboratory values, the excess shrinks a little but remains, and they conclude the drug is harmful.":
    "تجد دراسة رصدية معدل وفيات أعلى بين المرضى الذين يتناولون دواءً ما. ويجري المؤلفون تعديلاً إحصائياً للعمر والجنس وضغط الدم واثنتي عشرة قيمة مخبرية، فتتقلص الزيادة قليلاً لكنها تبقى، فيخلصون إلى أن الدواء ضار.",
  "Adjustment can only remove what was recorded. The clinician's sense that this patient was deteriorating is exactly why the drug was prescribed, and it is not among the twelve laboratory values.":
    "التعديل الإحصائي لا يزيل إلا ما جرى تسجيله. وإحساس الطبيب بأن هذا المريض كان يتدهور هو بالضبط سبب وصف الدواء، وهو ليس بين القيم المخبرية الاثنتي عشرة.",

  // ==== Trap Hunt test items (earlier skills, and sound reasoning) ====
  "A national audit finds that patients operated on at small local hospitals survive more often than those at large teaching hospitals. Broken down by how severe the case was, the teaching hospitals come out ahead in every category.":
    "يجد تدقيق وطني أن المرضى الذين تُجرى لهم الجراحة في المستشفيات المحلية الصغيرة يبقون على قيد الحياة أكثر من المرضى في المستشفيات التعليمية الكبيرة. وعند التفصيل حسب شدة الحالة، تتقدم المستشفيات التعليمية في كل فئة.",
  "Teaching hospitals take the difficult cases, so their pooled figure is dragged down by a case mix nobody chose at random. Better in every severity band and worse overall is the signature of that.":
    "المستشفيات التعليمية تستقبل الحالات الصعبة، لذا يجرّ مزيجُ حالاتٍ لم يخترْه أحد عشوائياً رقمَها المجمَّع إلى الأسفل. وأن تكون أفضل في كل نطاق شدة وأسوأ إجمالاً هو بصمة ذلك.",
  "A genetic test for a condition affecting about 1 in 5,000 people is 99.9% accurate. A clinic tells everyone who screens positive that the diagnosis is essentially confirmed.":
    "اختبار وراثي لحالة تصيب نحو 1 من كل 5,000 شخص دقته 99.9%. وتقول عيادة لكل من تأتي نتيجة فحصه إيجابية إن التشخيص مؤكد في جوهره.",
  "Even at 99.9%, errors outnumber real cases when the condition is this rare. Among 100,000 people about 20 have it, and about 100 healthy people also test positive, so a positive is right roughly one time in six.":
    "حتى عند 99.9%، تفوق الأخطاء عددَ الحالات الحقيقية حين تكون الحالة بهذه الندرة. فمن بين 100,000 شخص يُصاب بها نحو 20، وتأتي نتيجة نحو 100 شخص سليم إيجابية أيضاً، لذا تكون النتيجة الإيجابية صحيحة مرة واحدة تقريباً من كل ست.",
  "A surgeon reports excellent long-term results in the patients seen at the five-year follow-up clinic. Patients who moved away, stopped attending, or died before five years are not in the series.":
    "يُبلغ جرّاح عن نتائج بعيدة المدى ممتازة لدى المرضى الذين عاينهم في عيادة المتابعة بعد خمس سنوات. أما المرضى الذين انتقلوا إلى مكان آخر، أو توقفوا عن الحضور، أو توفوا قبل خمس سنوات، فليسوا ضمن السلسلة.",
  "The series was defined by who was still turning up. The patients who did worst are precisely the ones most likely to be missing from it, so the outcomes describe the survivors rather than the operation.":
    "تحددت السلسلة بمن ظل يحضر. والمرضى الأسوأ حالاً هم بالضبط الأرجح أن يكونوا غائبين عنها، لذا تصف النتائج الناجين لا العملية الجراحية.",
  "Hospitals that use more of a particular monitoring device have lower death rates. The manufacturer's brochure concludes that buying the device saves lives.":
    "المستشفيات التي تستخدم جهاز مراقبة معيناً أكثر لديها معدلات وفيات أقل. ويخلص كتيب الشركة الصانعة إلى أن شراء الجهاز ينقذ الأرواح.",
  "Hospitals that can afford more monitors can usually afford more of everything else too, including staff. The device may be a marker of a well resourced hospital rather than the cause of its results.":
    "المستشفيات القادرة على شراء أجهزة مراقبة أكثر قادرة عادةً على شراء المزيد من كل شيء آخر أيضاً، بما في ذلك الكوادر. فقد يكون الجهاز علامة على مستشفى وفير الموارد لا سبباً لنتائجه.",
  "A rare reaction occurs in about 1 in 50,000 people taking a drug. A patient develops it, and a report concludes there is only a 1 in 50,000 chance the drug was not responsible.":
    "يحدث تفاعل نادر لدى نحو 1 من كل 50,000 شخص يتناولون دواءً ما. ويصاب به مريض، فيخلص تقرير إلى أن احتمال ألا يكون الدواء مسؤولاً عنه هو 1 من كل 50,000 فقط.",
  "That flips the question round. The 1 in 50,000 is how often the reaction appears among people taking the drug, not the chance the drug caused this case. Answering that needs to know how often the same thing happens in people who never took it.":
    "هذا يقلب السؤال رأساً على عقب. فرقم 1 من كل 50,000 هو مدى تكرار ظهور التفاعل بين متناولي الدواء، لا احتمال أن يكون الدواء قد سبب هذه الحالة. والإجابة عن ذلك تحتاج إلى معرفة مدى تكرار حدوث الشيء نفسه لدى من لم يتناولوه قط.",
  "A trial reports the outcome it registered in advance as its main one, states that it also measured eleven others, and says plainly that success was judged on the registered outcome alone.":
    "تُبلغ تجربة سريرية عن النتيجة التي سجّلتها مسبقاً بوصفها نتيجتها الرئيسية، وتذكر أنها قاست إحدى عشرة نتيجة أخرى أيضاً، وتقول صراحةً إن الحكم على النجاح استند إلى النتيجة المسجَّلة وحدها.",
  "Naming the outcome before seeing the data, and then reporting all of them, is what stops a study quietly promoting whichever measure happened to come out well.":
    "تسمية النتيجة قبل رؤية البيانات، ثم الإبلاغ عنها جميعاً، هو ما يمنع دراسةً من أن ترفع بهدوء شأن أي مقياس صادف أن جاء جيداً.",
  "A cohort study links an exposure to a disease. It reports that the association survived adjustment for the confounders named in advance, that more exposure went with more disease, and that two independent cohorts elsewhere found the same pattern.":
    "تربط دراسة حشد بين تعرض ومرض. وتُبلغ بأن الارتباط صمد أمام التعديل الإحصائي للعوامل المربِكة المسماة مسبقاً، وأن التعرض الأكبر رافقه مرض أكثر، وأن حشدين مستقلين في مكان آخر وجدا النمط نفسه.",
  "No single one of these settles causation, but together they are the things that make an observational finding worth taking seriously: a prior plan, a dose-response pattern, and replication in populations that do not share the same quirks.":
    "لا يحسم أيٌّ من هذه وحده مسألة السببية، لكنها مجتمعة هي ما يجعل نتيجة رصدية جديرة بأن تؤخذ على محمل الجد: خطة مسبقة، ونمط استجابة للجرعة، وتكرار في مجتمعات سكانية لا تشترك في الخصوصيات نفسها.",
  "Patients are assigned by a computer to a drug or a dummy tablet, with neither they nor their doctor knowing which. Deaths are counted in everyone assigned, whatever they went on to take. The drug group does slightly better.":
    "يوزّع حاسوب المرضى على دواء أو قرص وهمي، دون أن يعرف المرضى ولا أطباؤهم أيهما تلقوا. وتُحصى الوفيات لدى كل من جرى توزيعهم، أياً كان ما تناولوه بعد ذلك. وتأتي حال مجموعة الدواء أفضل قليلاً.",
  "A coin flip knows nothing about the patient, so it cannot smuggle the reason for treatment into the comparison. Counting everyone as assigned keeps that protection even when people stop taking their tablets.":
    "رمي العملة لا يعرف شيئاً عن المريض، لذا لا يستطيع أن يهرّب سبب العلاج إلى داخل المقارنة. واحتساب الجميع حسب ما خُصص لهم يحفظ تلك الحماية حتى حين يتوقف الناس عن تناول أقراصهم.",
  "A clinic compares its results with a national benchmark, adjusts for how severe its patients' illness was, and publishes the crude and the adjusted figures side by side along with the case mix it adjusted for.":
    "تقارن عيادة نتائجها بمعيار مرجعي وطني، وتجري تعديلاً إحصائياً لشدة مرض مرضاها، وتنشر الأرقام الخام والأرقام المعدَّلة جنباً إلى جنب مع مزيج الحالات الذي عدّلت له.",
  "Showing both figures and the mix behind them is the honest move. A reader can see how much of the difference was case mix and how much survived accounting for it, instead of being handed only the flattering one.":
    "عرض الرقمين معاً والمزيج الذي وراءهما هو التصرف النزيه. فيستطيع القارئ أن يرى كم من الفارق كان مزيج الحالات وكم منه صمد بعد أخذه في الحسبان، بدلاً من أن يُسلَّم الرقم المجمِّل وحده.",

  // ==== Length-time bias (puzzle #12) ====
  "Screened men whose lung cancer was found died of it less often. Did the screening save them?":
    "الرجال الذين خضعوا للفحص الاستقصائي واكتُشف لديهم سرطان الرئة ماتوا به بنسبة أقل. فهل أنقذهم الفحص الاستقصائي؟",
  "9,211 male smokers were randomly assigned either to chest x-rays and sputum tests every four months for six years, or to usual care, and followed for two decades. Among the men who were diagnosed with lung cancer, 65 percent of the intensively screened died of it, against 74 percent of the others.":
    "وُزّع 9,211 مدخناً من الرجال عشوائياً إما على تصوير الصدر بالأشعة السينية وفحوص القشع كل أربعة أشهر لمدة ست سنوات، وإما على الرعاية المعتادة، وجرت متابعتهم عقدين من الزمن. ومن بين الرجال الذين شُخّص لديهم سرطان الرئة، توفي به 65 بالمئة ممن خضعوا للفحص المكثف، مقابل 74 بالمئة من الآخرين.",
  "Did the extra screening save lives?":
    "هل أنقذ الفحص الاستقصائي الإضافي أرواحاً؟",
  "Died of lung cancer": "توفوا بسرطان الرئة",
  "Screened every four months": "خضعوا للفحص كل أربعة أشهر",
  Screened: "خضعوا للفحص",
  "Usual care": "الرعاية المعتادة",
  "Among the men diagnosed with lung cancer":
    "بين الرجال المشخَّصين بسرطان الرئة",
  "Among everyone in the trial": "بين كل من شارك في التجربة",
  "Among the diagnosed": "بين المشخَّصين",
  "Yes, fewer of them died of it": "نعم، مات به عدد أقل منهم",
  "65% against 74%": "65% مقابل 74%",
  "Too early to say": "من المبكر الحكم",
  "the follow-up is too short": "المتابعة أقصر من اللازم",
  "No, count everyone and it vanishes": "لا، عُدّ الجميع فيتلاشى الفارق",
  "the cases changed, not the deaths": "الحالات هي التي تغيّرت، لا الوفيات",
  "Count everyone, and the screened arm did no better.":
    "عُدّ الجميع، فلم تكن ذراع الفحص الاستقصائي أفضل حالاً.",
  "Screening changed who counted as having cancer":
    "الفحص الاستقصائي غيّر من يُحتسب مصاباً بالسرطان",
  "The screened men were diagnosed far more often, 206 against 160, in a trial that split them evenly. The extra cancers were not a random sample of the disease. A test applied every few months catches the slow-growing tumours, because slow ones sit in the detectable stage for years waiting to be found, while fast ones surface between visits. Slow tumours also do better whatever you do, and some would never have surfaced at all. Those cases join the pool of people with lung cancer and survive it, so the share dying falls. Nobody was saved:":
    "شُخّص الرجال الذين خضعوا للفحص الاستقصائي أكثر بكثير، 206 مقابل 160، في تجربة قسمتهم بالتساوي. ولم تكن السرطانات الإضافية عينة عشوائية من المرض. فالاختبار الذي يُجرى كل بضعة أشهر يلتقط الأورام بطيئة النمو، لأن البطيئة تمكث في المرحلة القابلة للكشف سنوات في انتظار من يجدها، بينما تطفو السريعة على السطح بين الزيارات. كما أن الأورام البطيئة أفضل مآلاً مهما فعلت، وبعضها ما كان ليظهر إطلاقاً. وتنضم تلك الحالات إلى مجموع المصابين بسرطان الرئة وتنجو منه، فتنخفض حصة من يموتون. ولم يُنقَذ أحد:",
  "Both ways of counting": "طريقتا العدّ معاً",
  "Three effects travel together here and this trial cannot separate them: the slow cases are caught preferentially (length-time), the clock starts earlier for those caught (lead-time), and some tumours found would never have caused harm (overdiagnosis). All three flatter the diagnosed group and none of them postpones a death. The number that stayed honest is deaths among everyone randomised, and it did not fall.":
    "تسير هنا ثلاثة آثار معاً ولا تستطيع هذه التجربة الفصل بينها: التقاط الحالات البطيئة تفضيلياً (تحيز مدة المرض)، وبدء الساعة أبكر لدى من التُقطوا (تحيز زمن السبق)، وأن بعض الأورام المكتشفة ما كانت لتسبب أي ضرر (الإفراط في التشخيص). والثلاثة جميعاً تجمّل حال المجموعة المشخَّصة، ولا واحد منها يؤجّل وفاة. أما الرقم الذي ظل نزيهاً فهو الوفيات بين كل من وُزّعوا عشوائياً، وهو لم ينخفض.",
  "Who became a case": "من صار حالة",
  "Length-time bias": "تحيز مدة المرض",
  "Screening does not sample disease fairly. It catches the slow-growing kind preferentially, and the slow kind was always going to do better, so screen-detected cases flatter the test.":
    "الفحص الاستقصائي لا يأخذ عينة عادلة من المرض. فهو يلتقط النوع بطيء النمو تفضيلياً، والنوع البطيء كان مآله أفضل على أي حال، لذا تجمّل الحالات المكتشفة بالفحص صورة الاختبار.",
  "Whenever a screening programme is defended with how well its detected cases do, ask what kind of disease a periodic test can catch. A tumour that takes years to declare itself is available to be found on many visits; one that goes from nothing to symptoms in three months is available on almost none. The only fair question is whether deaths fall in everyone offered screening.":
    "كلما دُوفع عن برنامج فحص استقصائي بحُسن مآل الحالات التي يكتشفها، اسأل: أي نوع من المرض يستطيع اختبار دوري أن يلتقطه؟ فالورم الذي يستغرق سنوات ليعلن عن نفسه متاح ليُكتشف في زيارات كثيرة، أما الذي ينتقل من لا شيء إلى أعراض في ثلاثة أشهر فلا يكاد يتاح في أي منها. والسؤال العادل الوحيد هو: هل تنخفض الوفيات لدى كل من عُرض عليه الفحص الاستقصائي؟",
  "Picture the same disease arriving in two speeds. Slow tumours spend years in the window where a test could find them but the patient feels nothing. Fast ones cross that window in weeks. Now sample the population every six months. You will find nearly all the slow ones and almost none of the fast ones, because the fast ones announce themselves between your visits. So the pile of screen-detected cases is loaded with indolent disease, and the pile of symptom-detected cases is loaded with aggressive disease, before treatment enters the story at all. Compare their outcomes and screening looks wonderful. At the extreme edge of this sits overdiagnosis: disease so slow it would never have troubled the person in their lifetime, which counts as a cancer found and cured while doing nothing but harm through the treatment. The defence is the same one that beats lead-time bias, and it is the reason screening programmes are judged the way they are: randomise who is invited, then count deaths in everyone invited, attended or not, diagnosed or not.":
    "تخيّل المرض نفسه وهو يأتي بسرعتين. فالأورام البطيئة تقضي سنوات في النافذة التي يستطيع اختبار أن يجدها فيها بينما لا يشعر المريض بشيء. أما السريعة فتعبر تلك النافذة في أسابيع. والآن خذ عينة من السكان كل ستة أشهر. ستجد البطيئة كلها تقريباً ولن تجد من السريعة شيئاً يُذكر، لأن السريعة تعلن عن نفسها بين زياراتك. لذا تكون كومة الحالات المكتشفة بالفحص محمّلة بالمرض الخامل، وكومة الحالات المكتشفة بالأعراض محمّلة بالمرض العدواني، قبل أن يدخل العلاج في القصة أصلاً. قارن مآلاتهما فيبدو الفحص الاستقصائي رائعاً. وعند الطرف الأقصى من هذا يقع الإفراط في التشخيص: مرض من البطء بحيث ما كان ليزعج صاحبه طوال حياته، ومع ذلك يُحتسب سرطاناً اكتُشف وشُفي، بينما لا يفعل شيئاً سوى الإضرار عبر العلاج. والدفاع هو نفسه الذي يهزم تحيز زمن السبق، وهو سبب الحكم على برامج الفحص الاستقصائي بالطريقة التي يُحكم بها عليها: وزّع الدعوة عشوائياً، ثم عُدّ الوفيات لدى كل من دُعي، لبّى أو لم يلبِّ، شُخّص أو لم يُشخّص.",
  "The trial's own explanation": "تفسير التجربة نفسها",
  "The authors did not attribute the gap to better treatment. They noted that similar mortality alongside better survival points to lesions of limited clinical relevance being found in the screened arm. Twenty years of follow-up did not rescue the result: deaths from lung cancer were 337 among 4,607 screened men and 303 among 4,585 others, a difference in the wrong direction and not statistically significant.":
    "لم يعزُ الباحثون الفارق إلى علاج أفضل. بل لاحظوا أن تشابه معدل الوفيات مع بقاء أفضل يشير إلى اكتشاف آفات محدودة الأهمية السريرية في ذراع الفحص الاستقصائي. ولم تنقذ عشرون سنة من المتابعة النتيجة: فقد كانت الوفيات بسرطان الرئة 337 من أصل 4,607 رجال خضعوا للفحص الاستقصائي، و303 من أصل 4,585 من غيرهم، وهو فارق في الاتجاه الخاطئ وغير دال إحصائياً.",
  "Why screening is judged on deaths, not survival":
    "لماذا يُحكم على الفحص الاستقصائي بالوفيات لا بالبقاء",
  "This is not a historical curiosity. National screening programmes are assessed on whether they lower deaths from the disease in the whole invited population, precisely because survival among detected cases can be lifted by three separate artefacts without a single life being extended. A programme that raises five-year survival and leaves mortality untouched has, on the evidence, done nothing except give more people the label.":
    "هذه ليست طُرفة تاريخية. فبرامج الفحص الاستقصائي الوطنية تُقيَّم بما إذا كانت تخفض الوفيات بالمرض في عموم السكان المدعوين، وذلك بالضبط لأن البقاء بين الحالات المكتشفة يمكن أن ترفعه ثلاثة آثار مصطنعة منفصلة دون أن تطول حياة واحدة. والبرنامج الذي يرفع البقاء لخمس سنوات ويترك معدل الوفيات على حاله لم يفعل، بحسب الأدلة، شيئاً سوى إعطاء التسمية لعدد أكبر من الناس.",
  "Length-time bias, a reasoning trap.": "تحيز مدة المرض، فخ في الاستدلال.",
  "A test you run every few months finds slow-growing disease far more easily than fast-growing disease, because slow disease sits there for years waiting to be found while fast disease erupts between visits. Slow disease also has a better outlook whatever anyone does. So the cases a screening programme catches are the gentle ones, and they do well, and the programme takes the credit. The only number that cannot be gamed this way is deaths in everyone offered screening, whether or not they attended.":
    "الاختبار الذي تجريه كل بضعة أشهر يجد المرض بطيء النمو أسهل بكثير مما يجد المرض سريع النمو، لأن المرض البطيء يمكث سنوات في انتظار من يكتشفه بينما ينفجر المرض السريع بين الزيارات. كما أن المرض البطيء أفضل مآلاً مهما فعل أحد. لذا فإن الحالات التي يلتقطها برنامج الفحص الاستقصائي هي الحالات الوديعة، وهي تبلي حسناً، وينال البرنامج الفضل. والرقم الوحيد الذي لا يمكن التلاعب به بهذه الطريقة هو الوفيات لدى كل من عُرض عليه الفحص الاستقصائي، سواء لبّى الدعوة أو لم يلبِّها.",
  "Table 3 prints the usual-care case count as 106, which is a typographic error; the correct figure is 160, and this puzzle uses 160. The paper says so itself six times over: the body text on page 1310, the Figure 2 curve label, Table 3's own percentages (119 of 160 printed as 74 percent, 156 of 160 as 98 percent), and the totals of Tables 4 and 5. With 106 the lung-cancer deaths alone would outnumber the cohort. Note also that this trial compared two screening intensities rather than screening against none, and that it cannot separate length-time bias from lead-time bias and overdiagnosis, which is why the lesson names all three.":
    "يطبع الجدول 3 عدد حالات الرعاية المعتادة على أنه 106، وهو خطأ مطبعي، والرقم الصحيح 160، وهو ما تستعمله هذه الأحجية. والبحث نفسه يقول ذلك ست مرات: في متن الصفحة 1310، وفي عنوان منحنى الشكل 2، وفي النسب المئوية للجدول 3 ذاته (119 من 160 مطبوعة على أنها 74 بالمئة، و156 من 160 على أنها 98 بالمئة)، وفي مجموعَي الجدولين 4 و5. فلو كان العدد 106 لتجاوزت الوفيات بسرطان الرئة وحدها حجم الحشد. ويُلاحظ أيضاً أن هذه التجربة قارنت شدتين من الفحص الاستقصائي لا الفحص مقابل عدمه، وأنها لا تستطيع فصل تحيز مدة المرض عن تحيز زمن السبق والإفراط في التشخيص، ولهذا يذكر الدرس الثلاثة جميعاً.",

  // ==== Publication bias (puzzle #13) ====
  "Read the journals and almost every trial of these drugs worked. How many actually did?":
    "اقرأ المجلات العلمية فتجد أن كل تجربة لهذه الأدوية تقريباً قد نجحت. فكم واحدة نجحت فعلاً؟",
  "Twelve antidepressants, and every trial run to get them approved had to be registered with the American regulator before it began. That registry is the rare thing in medicine: a complete list, including the trials nobody ever wrote up. Go to the medical journals instead and you find 51 published trials, of which 48 read as positive.":
    "اثنا عشر دواءً مضاداً للاكتئاب، وكل تجربة أُجريت لإجازتها كان لا بد من تسجيلها لدى الجهة التنظيمية الأمريكية قبل أن تبدأ. وذلك السجل هو الشيء النادر في الطب: قائمة كاملة، تشمل التجارب التي لم يكتبها أحد قط. أما إذا ذهبت إلى المجلات الطبية بدلاً من ذلك فتجد 51 تجربة منشورة، منها 48 تُقرأ على أنها إيجابية.",
  "Out of all 74 trials that were actually run, how many did the regulator judge positive?":
    "من بين التجارب الـ 74 كلها التي أُجريت فعلاً، كم واحدة عدّتها الجهة التنظيمية إيجابية؟",
  "Trials that read as positive": "التجارب التي تُقرأ على أنها إيجابية",
  "As the journals tell it": "كما ترويها المجلات",
  Journals: "المجلات",
  "As the full registry tells it": "كما يرويها السجل الكامل",
  Registry: "السجل",
  "Trials of twelve antidepressants": "تجارب اثني عشر مضاداً للاكتئاب",
  "The published literature": "الأدبيات المنشورة",
  "Nearly all of them": "كلها تقريباً",
  "the journals are the evidence": "المجلات هي الدليل",
  "About two thirds": "نحو الثلثين",
  "some trials always fail": "بعض التجارب تفشل دائماً",
  "38 of the 74": "38 من الـ 74",
  "Half. A coin flip, printed as a near-certainty.":
    "النصف. رمية عملة، طُبعت على أنها شبه يقين.",
  "The failures were filtered out on the way to the journals":
    "الإخفاقات جرت تصفيتها في الطريق إلى المجلات",
  "The regulator judged 38 of the 74 trials positive and 36 not. Of those 36, twenty two were never published at all. Eleven more did reach print, but reading as a positive result. So a doctor searching the literature finds 48 positive trials out of 51 and concludes the case is overwhelming, when the complete record says it was close to even:":
    "عدّت الجهة التنظيمية 38 من التجارب الـ 74 إيجابية و36 غير إيجابية. ومن تلك الـ 36، لم تُنشر اثنتان وعشرون إطلاقاً. وبلغت إحدى عشرة أخرى المطبوع، لكنها تُقرأ على أنها نتيجة إيجابية. لذا يجد طبيب يبحث في الأدبيات 48 تجربة إيجابية من أصل 51 فيخلص إلى أن الحجة ساحقة، بينما يقول السجل الكامل إن الأمر كان قريباً من التعادل:",
  "Journals against the registry": "المجلات مقابل السجل",
  "Two of those judgements belong to different people, and it matters. Positive or negative was the regulator's own decision on the outcome each trial had promised to measure in advance. The reading that eleven publications conveyed a positive result was the study authors' assessment, not the regulator's, and they said so. What is not a matter of opinion is the twenty two that never appeared.":
    "حكمان من تلك الأحكام يخصان جهتين مختلفتين، وهذا مهم. فتصنيف التجربة إيجابية أو سلبية كان قرار الجهة التنظيمية نفسها بشأن النتيجة التي تعهدت كل تجربة بقياسها مسبقاً. أما قراءة أن إحدى عشرة مطبوعة قد نقلت نتيجة إيجابية فكانت تقدير مؤلفي الدراسة، لا الجهة التنظيمية، وقد صرّحوا بذلك. وما ليس مسألة رأي هو الاثنتان والعشرون التي لم تظهر قط.",
  "What never reached print": "ما لم يصل إلى المطبوع قط",
  "Publication bias": "تحيز النشر",
  "The published literature is not a sample of the research done. It is the research that someone chose to submit and someone chose to print, and success survives that filter far better than failure.":
    "الأدبيات المنشورة ليست عينة من البحث الذي أُجري. إنها البحث الذي اختار أحدهم تقديمه واختار أحدهم طباعته، والنجاح ينجو من تلك المِصفاة أفضل بكثير من الإخفاق.",
  "This is why a registry matters more than it sounds. Requiring every trial to be declared before it starts creates the denominator, so the missing ones become countable instead of invisible. When you read a review, the question is not only what the studies found but whether you are looking at all of them.":
    "لهذا يهم السجل أكثر مما يبدو. فاشتراط الإعلان عن كل تجربة قبل أن تبدأ يخلق المقام، فتصبح التجارب الغائبة قابلة للعدّ بدل أن تكون غير مرئية. وحين تقرأ مراجعة، فالسؤال ليس فقط ماذا وجدت الدراسات، بل هل تنظر إليها جميعاً.",
  "Nothing here requires anyone to lie. A trial that finds nothing is duller to write up, harder to place, and commercially unwelcome, so it drifts to the bottom of the pile and quietly never gets finished. Repeat that across a field and the surviving literature is systematically sunnier than the research was. The effect compounds, because reviews and guidelines are built on what was published, so the gap is inherited by everything downstream and looks like accumulating evidence rather than a filter. Two things push back. The first is registration: declare the trial and its primary outcome before you start, and an unpublished result leaves a visible hole rather than no trace. The second is the funnel plot, which exploits the fact that small studies scatter widely and large ones cluster; if the small studies that should have landed on the disappointing side are missing, the scatter comes out lopsided. Neither fix works retrospectively on a literature that predates them, which is why the regulator's archive was the only way to answer this question at all.":
    "لا شيء هنا يستلزم أن يكذب أحد. فالتجربة التي لا تجد شيئاً أكثر مللاً في الكتابة، وأصعب في إيجاد مجلة تنشرها، وغير مرحَّب بها تجارياً، لذا تنزلق إلى قاع الكومة ولا تُستكمل أبداً بهدوء. كرّر ذلك عبر حقل بأكمله، فتصبح الأدبيات الباقية أكثر إشراقاً على نحو منهجي مما كان عليه البحث. والأثر يتراكم، لأن المراجعات والإرشادات تُبنى على ما نُشر، فترث الفجوةَ كلُّ ما يأتي بعدها، وتبدو وكأنها أدلة متراكمة لا مِصفاة. وهناك أمران يقاومان ذلك. الأول هو التسجيل: أعلن التجربة ونتيجتها الأولية قبل أن تبدأ، فتترك النتيجة غير المنشورة ثقباً مرئياً بدل ألا تترك أثراً. والثاني هو مخطط القمع، الذي يستغل كون الدراسات الصغيرة تتبعثر على نطاق واسع بينما تتجمع الكبيرة، فإذا غابت الدراسات الصغيرة التي كان ينبغي أن تحط في الجانب المخيّب، جاء التبعثر مائلاً إلى جهة واحدة. ولا يعمل أي من العلاجين بأثر رجعي على أدبيات سبقتهما، ولهذا كان أرشيف الجهة التنظيمية هو السبيل الوحيد للإجابة عن هذا السؤال أصلاً.",
  "The drugs also looked stronger than they were":
    "وقد بدت الأدوية أيضاً أقوى مما كانت عليه",
  "The same trials were pooled twice, once as the regulator held them and once as the journals reported them. Measured across the complete set the average benefit was 0.31 on a standardised scale; measured from the published literature alone it was 0.41, about a third larger. That is a standardised mean difference, not a share of patients helped, and the effect was not confined to one drug: every one of the twelve looked better in the journals, by between 11 and 69 percent.":
    "خضعت التجارب نفسها للتحليل التلوي مرتين، مرة كما كانت لدى الجهة التنظيمية ومرة كما أبلغت عنها المجلات. فمقيساً عبر المجموعة الكاملة، بلغ متوسط الفائدة 0.31 على مقياس معياري، ومقيساً من الأدبيات المنشورة وحدها بلغ 0.41، أي أكبر بنحو الثلث. وهذا فارق متوسطات معياري، لا حصة من المرضى الذين استفادوا، ولم يقتصر الأثر على دواء واحد: فكل واحد من الاثني عشر بدا أفضل في المجلات، بنسبة تتراوح بين 11 و69 بالمئة.",
  "It got better, which is the point": "وقد تحسّن الوضع، وهذا هو بيت القصيد",
  "The same team repeated the audit on four antidepressants approved between 2008 and 2013, after trial registration had become the norm. This time all 15 positive trials were reported transparently, and of the 15 negative ones 6 went unpublished and 2 were reported as positive. Still imperfect, and still worth knowing about, but the inflation in apparent effect had roughly halved. Publication bias is not a law of nature; it responds to rules about declaring trials in advance.":
    "أعاد الفريق نفسه التدقيق على أربعة من مضادات الاكتئاب أُجيزت بين عامي 2008 و2013، بعد أن صار تسجيل التجارب هو القاعدة. وهذه المرة أُبلغ بشفافية عن التجارب الإيجابية الـ 15 كلها، ومن التجارب السلبية الـ 15 بقيت 6 غير منشورة وأُبلغ عن 2 على أنهما إيجابيتان. لا يزال الأمر ناقصاً، ولا يزال جديراً بأن يُعرف، لكن تضخم حجم الأثر الظاهري كان قد انخفض إلى النصف تقريباً. تحيز النشر ليس قانوناً من قوانين الطبيعة، بل يستجيب لقواعد الإعلان عن التجارب مسبقاً.",
  "Publication bias, a reasoning trap.": "تحيز النشر، فخ في الاستدلال.",
  "Search the medical literature on a drug and you are not seeing the research that was done. You are seeing the research that got written up and accepted, and studies that found something clear survive that filter much better than studies that found nothing. For one class of drugs the regulator's complete archive showed about half the trials were positive, while the journals showed nearly all of them. Nobody had to lie for that to happen. The disappointing ones simply never got finished.":
    "ابحث في الأدبيات الطبية عن دواء ما، فلن ترى البحث الذي أُجري. بل سترى البحث الذي كُتب وقُبل، والدراسات التي وجدت شيئاً واضحاً تنجو من تلك المِصفاة أفضل بكثير من الدراسات التي لم تجد شيئاً. ففي فئة واحدة من الأدوية، أظهر أرشيف الجهة التنظيمية الكامل أن نحو نصف التجارب كانت إيجابية، بينما أظهرت المجلات أنها كلها تقريباً كذلك. ولم يكن على أحد أن يكذب كي يحدث ذلك. فالتجارب المخيّبة ببساطة لم تُستكمل قط.",
  "Three points of care. The positive or negative verdict on each trial is the regulator's own, on the outcome the trial specified in advance; the label questionable, and the reading that eleven publications conveyed a positive result, are the study authors' judgements and the paper says so. The published-trial figure of 48 of 51 is the sum of two printed counts, 37 and 11, rather than a single printed number. And the authors note that they excluded articles covering several studies at once, so they probably counted a few trials as unpublished that were technically published, which makes 22 and 23 upper bounds.":
    "ثلاث نقاط تستدعي الانتباه. الحكم بأن التجربة إيجابية أو سلبية هو حكم الجهة التنظيمية نفسها، على النتيجة التي حددتها التجربة مسبقاً، أما وصف «مشكوك فيه»، وقراءة أن إحدى عشرة مطبوعة قد نقلت نتيجة إيجابية، فهما من تقدير مؤلفي الدراسة، والبحث يقول ذلك. ورقم التجارب المنشورة، 48 من 51، هو مجموع عددين مطبوعين، 37 و11، لا رقم واحد مطبوع. ويشير المؤلفون إلى أنهم استبعدوا مقالات تغطي عدة دراسات دفعة واحدة، فلعلهم عدّوا بضع تجارب على أنها غير منشورة وهي منشورة تقنياً، مما يجعل 22 و23 حدين أعليين.",

  // ==== Trap Hunt test items (publication bias) ====
  "A review gathers every published trial of a treatment it can find. Eleven of the thirteen are positive, and it concludes the treatment works. The review does not say how many trials of the treatment were ever started.":
    "تجمع مراجعة كل تجربة منشورة عن علاج ما تستطيع العثور عليها. فتكون إحدى عشرة من الثلاث عشرة إيجابية، فتخلص إلى أن العلاج ينفع. ولا تذكر المراجعة كم تجربة عن العلاج بُدئت أصلاً.",
  "Searching the literature finds the studies that reached print, not the studies that were run. Without knowing how many were started, there is no way to tell whether two disappointing trials is the whole story or the visible corner of it.":
    "البحث في الأدبيات يجد الدراسات التي بلغت المطبوع، لا الدراسات التي أُجريت. ومن دون معرفة كم دراسة بُدئت، لا سبيل إلى معرفة ما إذا كانت تجربتان مخيّبتان هما القصة كلها أم الركن المرئي منها.",
  "A researcher runs a study that finds nothing, decides it is not interesting enough to write up, and moves on to the next project. Several colleagues in the same field do the same thing that year.":
    "يجري باحث دراسة لا تجد شيئاً، فيقرر أنها ليست مثيرة بما يكفي لكتابتها، وينتقل إلى المشروع التالي. ويفعل عدة زملاء في الحقل نفسه الشيء ذاته في تلك السنة.",
  "Nobody here has done anything dishonest, and that is exactly the point. The filter is made of ordinary decisions about what is worth the effort, and it still leaves the published record systematically sunnier than the research was.":
    "لم يفعل أحد هنا شيئاً غير نزيه، وهذا بالضبط هو المقصود. فالمِصفاة مصنوعة من قرارات عادية بشأن ما يستحق الجهد، ومع ذلك تترك السجل المنشور أكثر إشراقاً على نحو منهجي مما كان عليه البحث.",

  // ==== Trap Hunt test items (length-time bias) ====
  "A clinic reports that men whose cancer was picked up by its regular screening programme are far more likely to still be alive ten years on than men who came in with symptoms. It concludes that screening works.":
    "تُبلغ عيادة أن الرجال الذين التقط برنامجها الدوري للفحص الاستقصائي سرطانهم أرجح بكثير أن يكونوا أحياء بعد عشر سنوات من الرجال الذين جاؤوا وهم يشكون أعراضاً. فتخلص إلى أن الفحص الاستقصائي ينفع.",
  "A test run at intervals catches slow tumours easily and fast ones hardly at all, because fast ones surface between visits. So the screen-detected group is loaded with the gentle kind of disease before treatment is even considered.":
    "الاختبار الذي يُجرى على فترات يلتقط الأورام البطيئة بسهولة ولا يكاد يلتقط السريعة، لأن السريعة تطفو على السطح بين الزيارات. لذا تكون المجموعة المكتشفة بالفحص محمّلة بالنوع الوديع من المرض قبل أن يُنظر في العلاج أصلاً.",
  "A new scan finds three times as many cases of a cancer as were previously diagnosed in the same population, and the people it finds do very well. Deaths from that cancer in the population are unchanged.":
    "يجد تصوير جديد من حالات سرطان ما ثلاثة أضعاف ما كان يُشخَّص سابقاً في السكان أنفسهم، ومن يجدهم تكون مآلاتهم ممتازة. أما الوفيات بذلك السرطان بين السكان فلم تتغير.",
  "More cases found, the same number of deaths, and excellent outcomes among the extra cases is the signature of finding disease that was never going to cause harm. The survival figures improve because the denominator filled up with people who were never in danger.":
    "اكتشاف حالات أكثر، مع العدد نفسه من الوفيات، ومآلات ممتازة بين الحالات الإضافية، هو بصمة اكتشاف مرض لم يكن ليسبب أي ضرر أصلاً. فأرقام البقاء تتحسن لأن المقام امتلأ بأشخاص لم يكونوا في خطر قط.",

  // ---- intention to treat, recall bias, immortal time ----
  "Among the patients who actually got the treatment they were assigned, surgery saved lives. Is that the trial's answer?":
    "بين المرضى الذين تلقوا فعلاً العلاج المخصص لهم، أنقذت الجراحة أرواحاً. فهل هذه هي إجابة التجربة؟",
  "1,212 people with heart failure, randomly assigned to medicine alone or to medicine plus bypass surgery. Analysing the ones who received what they were assigned, 43 percent of the medicine group died against 34 percent of the surgery group. The difference is statistically significant.":
    "1,212 شخصاً مصاباً بقصور القلب، وُزّعوا عشوائياً إلى الدواء وحده أو إلى الدواء مع جراحة المجازة. وبتحليل من تلقّوا ما خُصّص لهم، تُوفي 43 بالمئة من مجموعة الدواء مقابل 34 بالمئة من مجموعة الجراحة. والفرق دال إحصائياً.",
  "Does this trial show that surgery cuts deaths?":
    "هل تُظهر هذه التجربة أن الجراحة تخفض الوفيات؟",
  "Died during follow-up":
    "تُوفّوا خلال المتابعة",
  "Medicine alone":
    "الدواء وحده",
  "Medicine":
    "الدواء",
  "Surgery added":
    "بإضافة الجراحة",
  "Surgery":
    "الجراحة",
  "Only those who got what they were assigned":
    "فقط من تلقّوا ما خُصّص لهم",
  "Everyone, as the coin assigned them":
    "الجميع، كما وزّعتهم القرعة",
  "The patients left out of the first panel":
    "المرضى المستبعدون من اللوحة الأولى",
  "Those who followed the protocol":
    "من التزموا بالبروتوكول",
  "Yes, that is what surgery does":
    "نعم، هذا ما تفعله الجراحة",
  "nine points fewer deaths":
    "تسع نقاط أقل في الوفيات",
  "No, and it understates the benefit":
    "لا، وهي تقلّل من شأن الفائدة",
  "crossovers dilute a real effect":
    "الانتقالات تُخفّف أثراً حقيقياً",
  "No, that comparison is no longer randomised":
    "لا، تلك المقارنة لم تعد معشّاة",
  "dying is why some were left out":
    "الوفاة هي سبب استبعاد بعضهم",
  "Counting everyone the coin assigned, the difference is not significant.":
    "بحساب كل من وزّعتهم القرعة، الفرق غير دال.",
  "The surgical patients who were dropped had mostly died first":
    "مرضى الجراحة المستبعدون كانوا في معظمهم قد ماتوا أولاً",
  "The 120 patients missing from the first panel are not a random sample. Of the 55 dropped from the surgery group, 30 died, and most of them died before they ever reached an operating table. Of the 65 dropped from the medicine group, only 15 died, because crossing over to surgery required living long enough to have it. So the surgical arm shed its worst outcomes and the medical arm lost its best, and the gap nearly doubled without one patient's fate changing:":
    "المرضى الـ 120 الغائبون عن اللوحة الأولى ليسوا عينة عشوائية. فمن بين 55 مستبعداً من مجموعة الجراحة، تُوفي 30، ومات معظمهم قبل أن يصلوا إلى طاولة العمليات أصلاً. ومن بين 65 مستبعداً من مجموعة الدواء، تُوفي 15 فقط، لأن الانتقال إلى الجراحة كان يتطلب البقاء حياً مدة تكفي لإجرائها. وهكذا تخلّص ذراع الجراحة من أسوأ نتائجه وفقد ذراع الدواء أفضل نتائجه، فتضاعفت الفجوة تقريباً دون أن يتغير مصير مريض واحد:",
  "All three views of one trial":
    "المشاهد الثلاثة لتجربة واحدة",
  "A randomised comparison is only worth something while it is still random. The coin flip made the two groups alike; deciding afterwards who counts, on the basis of something that happened after the flip, undoes that. Here the deciding factor was survival itself, which is the outcome being measured. Counting everyone in the group they were assigned to, whatever happened next, is the analysis that keeps the coin flip intact.":
    "المقارنة المعشّاة لا قيمة لها إلا ما دامت عشوائية. رمية القرعة جعلت المجموعتين متشابهتين، وتقرير من يُحتسب لاحقاً، بناءً على شيء حدث بعد الرمية، يُبطل ذلك. وهنا كان العامل الحاسم هو البقاء على قيد الحياة نفسه، وهو النتيجة المقاسة. أما احتساب كل شخص في المجموعة التي خُصّص لها، مهما حدث بعد ذلك، فهو التحليل الذي يُبقي رمية القرعة سليمة.",
  "Who the analysis dropped":
    "من استبعده التحليل",
  "Intention to treat":
    "تحليل قصد المعالجة",
  "Once you exclude people for what happened after they were randomised, you are no longer comparing the groups the coin made, and the exclusions usually favour one side.":
    "ما إن تستبعد أشخاصاً بسبب ما حدث بعد تعشيتهم، حتى تتوقف عن مقارنة المجموعتين اللتين صنعتهما القرعة، والاستبعادات عادةً ما تصبّ في مصلحة طرف واحد.",
  "This is not a rule that per-protocol analysis is dishonest. It answers a different question, and there are trials where it is the right one to ask. The rule is narrower and harder: any analysis that drops people for something that happened after randomisation has to explain why those people were not different, and when the reason for dropping is entangled with the outcome, no explanation will do.":
    "ليست هذه قاعدة تقول إن تحليل الالتزام بالبروتوكول غير نزيه. فهو يجيب عن سؤال مختلف، وثمة تجارب يكون فيها هو السؤال الصحيح. القاعدة أضيق وأصعب: أي تحليل يستبعد أشخاصاً بسبب شيء حدث بعد التعشية عليه أن يفسّر لماذا لم يكن هؤلاء مختلفين، وحين يتشابك سبب الاستبعاد مع النتيجة، لن يكفي أي تفسير.",
  "Randomisation buys one thing: two groups that differ only by chance, including in all the ways nobody measured. Everything a trial claims rests on that. The trouble is that trials are run on people, who cross over, refuse the operation, stop the tablets or die before treatment starts, and it is tempting to set those people aside and look at the clean comparison underneath. But whether someone stayed on protocol is itself an outcome. Patients who cross from medicine to surgery must survive to be operated on. Patients assigned to surgery who never get it are often the ones too ill to be operated on, or already dead. Removing them is removing patients selected by prognosis, and prognosis is what the trial is measuring. Intention to treat keeps everyone in the arm the coin put them in, which sounds absurd when a patient never received the treatment, and is exactly the point: it measures the effect of the decision to treat, under real conditions, which is also the decision a doctor actually faces. It has a known cost. Crossovers pull the arms together, so intention to treat tends to shrink a real effect towards nothing. That is a conservative failure when you are trying to prove a drug works, and a dangerous one when you are trying to prove a drug is no worse than another, which is why non-inferiority trials report both analyses and are believed only when the two agree.":
    "التعشية تشتري شيئاً واحداً: مجموعتين لا تختلفان إلا بالصدفة، بما في ذلك كل الوجوه التي لم يقسها أحد. وكل ما تدّعيه التجربة يقوم على ذلك. المشكلة أن التجارب تُجرى على بشر، ينتقلون بين الذراعين، ويرفضون العملية، ويتوقفون عن الأقراص، أو يموتون قبل بدء العلاج، ومن المغري أن تنحّي هؤلاء جانباً وتنظر إلى المقارنة النظيفة تحتهم. لكن بقاء الشخص ملتزماً بالبروتوكول هو نفسه نتيجة. فالمرضى الذين ينتقلون من الدواء إلى الجراحة عليهم أن يبقوا أحياء حتى تُجرى لهم. والمرضى المخصصون للجراحة الذين لا يخضعون لها هم غالباً الأشد مرضاً من أن يُجرى لهم عمل جراحي، أو الذين ماتوا بالفعل. وإزالتهم هي إزالة مرضى مُنتقين حسب الإنذار، والإنذار هو ما تقيسه التجربة. تحليل قصد المعالجة يُبقي كل شخص في الذراع الذي وضعته فيه القرعة، وهو ما يبدو سخيفاً حين لا يتلقى مريض العلاج إطلاقاً، وهذا بالضبط هو المقصود: فهو يقيس أثر قرار المعالجة، في ظروف واقعية، وهو أيضاً القرار الذي يواجهه الطبيب فعلاً. ولهذا كلفة معروفة. فالانتقالات تقرّب الذراعين من بعضهما، ولذلك يميل تحليل قصد المعالجة إلى تقليص أثر حقيقي نحو الصفر. وهذا إخفاق محافظ حين تحاول إثبات أن دواءً يعمل، وإخفاق خطر حين تحاول إثبات أن دواءً ليس أسوأ من آخر، ولهذا تُبلّغ تجارب عدم الدونية عن التحليلين معاً ولا تُصدَّق إلا حين يتفقان.",
  "The same trap, without the verdict flipping":
    "الفخّ نفسه، دون أن ينقلب الحكم",
  "A tuberculosis trial compared shorter regimens with the standard six-month one. In the group treated per protocol, the standard regimen appeared to fail in about 8 percent of patients. Counting everyone who was randomised and had an assessable outcome, it failed in about 16 percent. Almost everyone the per-protocol analysis removed had had an unfavourable outcome, because an unfavourable outcome was frequently the reason they left the protocol. Nothing about the trial's conclusion changed, and every failure rate in it halved.":
    "قارنت تجربة للسل أنظمة علاجية أقصر بالنظام المعياري ذي الستة أشهر. وفي المجموعة المعالجة وفق الالتزام بالبروتوكول، بدا أن النظام المعياري يفشل لدى نحو 8 بالمئة من المرضى. وباحتساب كل من عُشّي وكانت نتيجته قابلة للتقييم، فشل لدى نحو 16 بالمئة. فكل من أزالهم تحليل الالتزام بالبروتوكول تقريباً كانت نتيجتهم غير مواتية، لأن النتيجة غير المواتية كانت في كثير من الأحيان سبب خروجهم من البروتوكول. لم يتغير شيء في استنتاج التجربة، وانخفض كل معدل فشل فيها إلى النصف.",
  "Intention to treat, a reasoning trap.":
    "تحليل قصد المعالجة، فخّ في الاستدلال.",
  "A trial flips a coin so its two groups start out alike. Then real life happens: people switch treatments, refuse the operation, or die before it. It seems only fair to compare the ones who actually got what they were assigned. It is not, because whether someone stuck to the plan depends on how they were doing, and often on whether they survived. Dropping them quietly sorts the groups by prognosis, which is the very thing the trial is trying to measure. Count everyone where the coin put them, and the flattering result can vanish.":
    "ترمي التجربة قرعة كي تبدأ مجموعتاها متشابهتين. ثم تحدث الحياة الواقعية: يبدّل الناس علاجاتهم، أو يرفضون العملية، أو يموتون قبلها. ويبدو من الإنصاف أن تقارن من تلقّوا فعلاً ما خُصّص لهم. لكنه ليس إنصافاً، لأن التزام الشخص بالخطة يعتمد على حاله، وغالباً على بقائه حياً. واستبعادهم يفرز المجموعتين بهدوء حسب الإنذار، وهو عين ما تحاول التجربة قياسه. احسب الجميع حيث وضعتهم القرعة، وقد تتبخر النتيجة المُرضية.",
  "The four counts in the first two panels are printed. The third panel is subtraction over those printed integers rather than figures of its own: 65 and 55 are 602 minus 537 and 610 minus 555, and 15 and 30 are 244 minus 229 and 218 minus 188. It closes three ways. The excluded patients reassemble the as-treated arms, 537 plus 55 and 555 plus 65 giving 592 and 620, which sum to the 1,212 randomised; and total deaths are conserved in every split, 244 plus 218 and 259 plus 203 both giving 462. Note also that the trial's P values, 0.12 as randomised and 0.005 per protocol, come from Cox proportional-hazards models over the whole follow-up, not from these four-cell tables, so they are quoted as the trial's own results and not recomputed here.":
    "الأعداد الأربعة في اللوحتين الأوليين منشورة. أما اللوحة الثالثة فهي طرح على تلك الأعداد الصحيحة المنشورة لا أرقام خاصة بها: 65 و 55 هما 602 ناقص 537 و 610 ناقص 555، و 15 و 30 هما 244 ناقص 229 و 218 ناقص 188. وهي تُغلق من ثلاث جهات. فالمرضى المستبعدون يعيدون تكوين ذراعي التحليل حسب العلاج المتلقى، إذ 537 زائد 55 و 555 زائد 65 يعطيان 592 و 620، ومجموعهما 1,212 وهو عدد من عُشّوا؛ ومجموع الوفيات محفوظ في كل تقسيم، إذ 244 زائد 218 و 259 زائد 203 يعطيان 462 في الحالتين. ولاحظ أيضاً أن قيم P في التجربة، 0.12 حسب التعشية و 0.005 حسب الالتزام بالبروتوكول، مصدرها نماذج كوكس للمخاطر التناسبية على كامل مدة المتابعة، لا هذه الجداول ذات الخلايا الأربع، ولذلك تُنقل بوصفها نتائج التجربة نفسها ولا يُعاد حسابها هنا.",
  "Women with melanoma report burning easily far more often than women without it. How much of that gap is their skin?":
    "النساء المصابات بالميلانوما يقلن إن بشرتهن تحترق بسهولة أكثر بكثير مما تقوله غير المصابات. فكم من هذه الفجوة يعود إلى بشرتهن؟",
  "141 women who had been diagnosed with melanoma and 1,094 who had not, asked how their skin responds to the sun. 45 percent of the women with melanoma said they tan little or not at all, against 25 percent of the others. Pale, easily burned skin is a known risk factor, so the finding looks exactly as expected.":
    "141 امرأة شُخّصت لديهن الميلانوما و 1,094 لم تُشخّص لديهن، سُئلن كيف تستجيب بشرتهن للشمس. قالت 45 بالمئة من المصابات بالميلانوما إن بشرتهن تسمرّ قليلاً أو لا تسمرّ إطلاقاً، مقابل 25 بالمئة من الأخريات. والبشرة الفاتحة سريعة الاحتراق عامل خطر معروف، فتبدو النتيجة تماماً كما هو متوقع.",
  "Is that twenty point gap what their skin was really like?":
    "هل فجوة العشرين نقطة هذه تعكس حقيقة بشرتهن؟",
  "Said their skin tans little or not at all":
    "قلن إن بشرتهن تسمرّ قليلاً أو لا تسمرّ إطلاقاً",
  "Women who developed melanoma":
    "النساء اللواتي أصبن بالميلانوما",
  "Melanoma":
    "ميلانوما",
  "Women who did not":
    "النساء اللواتي لم يُصبن",
  "No melanoma":
    "دون ميلانوما",
  "Asked after the diagnosis":
    "سُئلن بعد التشخيص",
  "Asked years before anyone knew":
    "سُئلن قبل سنوات من علم أحد",
  "Yes, pale skin is a real risk factor":
    "نعم، البشرة الفاتحة عامل خطر حقيقي",
  "the gap is their skin":
    "الفجوة هي بشرتهن",
  "No, the whole association is an artefact":
    "لا، الارتباط كله مصطنع",
  "they are reinterpreting their past":
    "إنهن يعدن تفسير ماضيهن",
  "Partly, and part of it appeared afterwards":
    "جزئياً، وجزء منها ظهر لاحقاً",
  "real, but not this large":
    "حقيقي، لكن ليس بهذا الحجم",
  "These same women had already answered, years earlier.":
    "هؤلاء النساء أنفسهن كنّ قد أجبن من قبل، قبل سنوات.",
  "The question was answered by a different person, in a sense":
    "أجاب عن السؤال شخص مختلف، بمعنى ما",
  "Every one of these women filled in the same question before anyone knew who would get melanoma. Back then the gap was thirteen points, not twenty. The women who went on to be diagnosed shifted seven points towards saying they burn; the women who were not diagnosed, answering over the same years, shifted a point the other way. Nobody's skin changed in between. What changed was that some of them had since been asked to explain a cancer:":
    "كل واحدة من هؤلاء النساء أجابت عن السؤال نفسه قبل أن يعرف أحد من ستصاب بالميلانوما. وكانت الفجوة حينها ثلاث عشرة نقطة لا عشرين. النساء اللواتي شُخّصن لاحقاً انزحن سبع نقاط نحو القول إنهن يحترقن، أما اللواتي لم يُشخّصن، وقد أجبن خلال السنوات نفسها، فانزحن نقطة واحدة في الاتجاه الآخر. لم تتغير بشرة أي منهن في الأثناء. ما تغير أن بعضهن طُلب منهن منذ ذلك الحين تفسير سرطان:",
  "The same women, asked twice":
    "النساء أنفسهن، سُئلن مرتين",
  "So the risk factor is real and the study still overstates it: the crude odds ratio these counts give is about 1.8 before the diagnosis and about 2.5 after it, so roughly a third of what the later study measured was not there beforehand. That is the awkward shape of recall bias. It rarely conjures an association out of nothing. It takes a true one and inflates it, which is far harder to spot, because the result still agrees with everything you already believed.":
    "إذن عامل الخطر حقيقي ومع ذلك تبالغ فيه الدراسة: نسبة الأرجحية الخام التي تعطيها هذه الأعداد نحو 1.8 قبل التشخيص ونحو 2.5 بعده، أي أن نحو ثلث ما قاسته الدراسة اللاحقة لم يكن موجوداً قبلها. تلك هي الهيئة المُربكة لتحيز التذكر. فهو نادراً ما يخلق ارتباطاً من العدم. بل يأخذ ارتباطاً حقيقياً ويضخّمه، وهذا أصعب بكثير في الكشف، لأن النتيجة تظل متوافقة مع كل ما كنت تعتقده أصلاً.",
  "What the diagnosis changed":
    "ما غيّره التشخيص",
  "Recall bias":
    "تحيز التذكر",
  "People who know how their story ended remember the beginning differently, so asking about the past after the outcome is known measures the outcome as well as the past.":
    "من يعرفون كيف انتهت قصتهم يتذكرون البداية على نحو مختلف، فالسؤال عن الماضي بعد معرفة النتيجة يقيس النتيجة كما يقيس الماضي.",
  "Nobody here is lying. Searching your memory harder because you have been given a reason to search it is an ordinary human thing to do, and the answers that come back are honestly meant. That is what makes it so hard to correct for: there is no dishonest group to exclude and no question you can ask that fixes it, because the more carefully someone thinks about it, the worse it gets.":
    "لا أحد هنا يكذب. فأن تنقّب في ذاكرتك بجهد أكبر لأن سبباً للتنقيب أُعطي لك أمر إنساني عادي، والأجوبة العائدة صادقة القصد. وهذا ما يجعل تصحيحه بالغ الصعوبة: لا توجد مجموعة غير صادقة تُستبعد، ولا سؤال يمكنك طرحه فيُصلح الأمر، لأنه كلما فكّر المرء بعناية أكبر ازداد الأمر سوءاً.",
  "A case-control study starts from the outcome and works backwards, asking people who have a disease and people who do not what they were exposed to. It is fast, it is cheap, and for a rare disease it is often the only design that will ever be affordable. Its weakness is that one group has been given a reason to search their memory. A diagnosis prompts the question \"why me\", and the mind answers it, reaching for the sunburn, the chemical, the medicine, the difficult pregnancy. The other group has no such prompt and remembers no harder than anyone remembers anything. So the two groups are not just being compared on exposure, they are being compared on how hard they looked. The direction is usually predictable: it inflates whatever the person already suspects is to blame, which means it tends to confirm the hypothesis under test. The defences are all about not relying on memory. Take the exposure from a record written before the outcome, from a prescription database, a workplace log, a stored blood sample, a questionnaire filled in years earlier. Or build in a comparison the mechanism cannot touch, such as a second exposure question that nobody associates with the disease: if the groups drift equally on that one, the drift is not about the disease. What does not work is asking the question more carefully, and what does not work is telling people to be objective.":
    "تبدأ دراسة الحالات والشواهد من النتيجة وتعمل رجوعاً، فتسأل المصابين بمرض وغير المصابين به عمّا تعرضوا له. وهي سريعة وزهيدة، وبالنسبة لمرض نادر كثيراً ما تكون التصميم الوحيد الذي يبقى في متناول اليد. ونقطة ضعفها أن إحدى المجموعتين أُعطيت سبباً للتنقيب في ذاكرتها. فالتشخيص يستدعي سؤال «لماذا أنا»، والعقل يجيب عنه، متناولاً حروق الشمس، والمادة الكيميائية، والدواء، والحمل العسير. أما المجموعة الأخرى فلا حافز لديها ولا تتذكر بجهد أكبر مما يتذكر به أي أحد أي شيء. فالمجموعتان إذن لا تُقارنان على التعرض وحده، بل تُقارنان على مقدار الجهد الذي بذلتاه في البحث. والاتجاه عادةً متوقع: فهو يضخّم ما يشتبه الشخص أصلاً في أنه المسؤول، ما يعني أنه يميل إلى تأكيد الفرضية قيد الاختبار. والدفاعات كلها تدور حول عدم الاعتماد على الذاكرة. خذ التعرض من سجل كُتب قبل النتيجة، من قاعدة بيانات وصفات، أو سجل مكان عمل، أو عينة دم مخزّنة، أو استبيان مُلئ قبل سنوات. أو ضمّن مقارنة لا تستطيع الآلية أن تمسّها، مثل سؤال تعرض ثانٍ لا يربطه أحد بالمرض: فإذا انزاحت المجموعتان بالقدر نفسه فيه، فالانزياح ليس متعلقاً بالمرض. وما لا ينفع هو طرح السؤال بعناية أكبر، وما لا ينفع هو مطالبة الناس بأن يكونوا موضوعيين.",
  "The study everyone credits for this does not show it":
    "الدراسة التي ينسب إليها الجميع هذا لا تُظهره",
  "A 1967 Finnish study is cited across the literature as the origin of recall bias. It re-interviewed mothers whose answers had been recorded during pregnancy, and its own text reports no significant difference between the mothers of affected and healthy children in how often the replies disagreed. What it does show, and spectacularly, is something else: only about a quarter of the information collected prospectively reappeared identically at re-interview, and roughly two thirds of the retrospective positive answers had no prospective record behind them, in both groups alike. That is not recall bias, it is a warning that retrospective interviews are unreliable even when nobody is biased at all.":
    "تُستشهد دراسة فنلندية من عام 1967 عبر الأدبيات بوصفها أصل تحيز التذكر. أعادت مقابلة أمهات كانت أجوبتهن قد سُجّلت أثناء الحمل، ويذكر نصها نفسه أنه لا فرق دال بين أمهات الأطفال المصابين وأمهات الأطفال الأصحاء في عدد مرات تعارض الأجوبة. وما تُظهره فعلاً، وبصورة لافتة، شيء آخر: نحو ربع المعلومات التي جُمعت استباقياً فقط عاد ظهوره مطابقاً في إعادة المقابلة، ونحو ثلثي الأجوبة الإيجابية الاسترجاعية لم يكن خلفها سجل استباقي، في المجموعتين على السواء. هذا ليس تحيز التذكر، بل تحذير من أن المقابلات الاسترجاعية غير موثوقة حتى حين لا يكون أحد متحيزاً إطلاقاً.",
  "And the largest test of it found almost none":
    "وأكبر اختبار له لم يجد منه شيئاً يُذكر",
  "The biggest study of this design compared what parents said in interview against what their family doctor had already written down, for 1,624 children with cancer and 2,524 without. Agreement with the records was poor in places, but it was poor in much the same way in both groups. The authors found essentially no evidence that having a sick child changed how the past was reported. Recall bias is a real mechanism and a reason to prefer records over memory. It is not a law that memory always bends, and a study is not discredited by the mere fact that it asked people to remember.":
    "قارنت أكبر دراسة بهذا التصميم ما قاله الآباء في المقابلة بما كان طبيب الأسرة قد دوّنه من قبل، لدى 1,624 طفلاً مصاباً بالسرطان و 2,524 غير مصاب. وكان التوافق مع السجلات ضعيفاً في مواضع، لكنه كان ضعيفاً بالطريقة نفسها تقريباً في المجموعتين. ولم يجد الباحثون في الجوهر أي دليل على أن وجود طفل مريض غيّر طريقة الإبلاغ عن الماضي. تحيز التذكر آلية حقيقية وسبب لتفضيل السجلات على الذاكرة. لكنه ليس قانوناً يقضي بأن الذاكرة تنحني دائماً، ولا تفقد دراسة مصداقيتها لمجرد أنها طلبت من الناس أن يتذكروا.",
  "Recall bias, a reasoning trap.":
    "تحيز التذكر، فخّ في الاستدلال.",
  "Ask someone what they were exposed to before they got ill and you are not only asking about the past, you are asking someone who has been given a reason to search it. A diagnosis makes people look harder, and looking harder turns up more. In one study the same women answered the same question about their skin years apart, once before anyone knew and once after a melanoma diagnosis, and the ones who had been diagnosed had shifted. Their skin had not. This rarely invents a finding from nothing. It takes a true one and makes it look bigger, which is much harder to catch, because the answer still agrees with what you expected.":
    "اسأل شخصاً عمّا تعرض له قبل أن يمرض، فأنت لا تسأل عن الماضي فحسب، بل تسأل شخصاً أُعطي سبباً للتنقيب فيه. فالتشخيص يجعل الناس يبحثون بجهد أكبر، والبحث بجهد أكبر يُخرج المزيد. في إحدى الدراسات أجابت النساء أنفسهن عن السؤال نفسه عن بشرتهن بفارق سنوات، مرة قبل أن يعرف أحد ومرة بعد تشخيص ميلانوما، وكانت المشخّصات قد انزحن. أما بشرتهن فلم تتغير. وهذا نادراً ما يخترع نتيجة من العدم. بل يأخذ نتيجة حقيقية ويجعلها تبدو أكبر، وهو أصعب بكثير في الالتقاط، لأن الجواب يظل متوافقاً مع ما توقعته.",
  "Two things a careful reader should know. First, the reference standard is the woman's own questionnaire filled in before diagnosis, not an external record, so this shows that the answers moved rather than which of the two answers was correct, and the authors' own conclusion is appropriately hedged: tanning ability was the one host factor whose shift was significant in the cases and not in the controls. Second, the paper prints odds ratios of 1.90 and 3.01 for this comparison. Those are the authors' own estimates and are not the crude odds ratios of these four cells, which are 1.80 and 2.55. The two pairs move in the same direction by a similar factor but they are not the same quantity, so only the crude ones, which anyone can recompute from the counts shown, appear in the text above.":
    "أمران ينبغي أن يعرفهما القارئ المدقق. أولاً، المعيار المرجعي هو استبيان المرأة نفسها المُلئ قبل التشخيص، لا سجل خارجي، فهذا يُظهر أن الأجوبة تحركت لا أيّ الجوابين كان صحيحاً، واستنتاج الباحثين نفسه مُقيَّد بتحفظ مناسب: قابلية الاسمرار كانت العامل المضيفي الوحيد الذي كان انزياحه دالاً لدى الحالات وغير دال لدى الشواهد. ثانياً، تنشر الورقة نسب أرجحية قدرها 1.90 و 3.01 لهذه المقارنة. وهي تقديرات الباحثين أنفسهم وليست نسب الأرجحية الخام لهذه الخلايا الأربع، وهي 1.80 و 2.55. ويتحرك الزوجان في الاتجاه نفسه بعامل متقارب لكنهما ليسا الكمية نفسها، ولذلك لا يظهر في النص أعلاه إلا الخام، الذي يستطيع أي شخص إعادة حسابه من الأعداد المعروضة.",
  "Patients who were dispensed this drug died far less often than those who were not. Is the drug working?":
    "المرضى الذين صُرف لهم هذا الدواء ماتوا أقل بكثير ممن لم يُصرف لهم. فهل الدواء ناجع؟",
  "A cohort is followed from the day each patient enters it. Anyone who is dispensed the drug at any point during follow-up counts as treated; everyone else counts as untreated. 49 percent of the treated died against 71 percent of the untreated, and the drug appears to halve the death rate.":
    "تُتابَع مجموعة أترابية من اليوم الذي يدخلها فيه كل مريض. وكل من صُرف له الدواء في أي وقت خلال المتابعة يُحتسب معالجاً، وكل من عداه يُحتسب غير معالج. تُوفي 49 بالمئة من المعالجين مقابل 71 بالمئة من غير المعالجين، ويبدو أن الدواء يخفض معدل الوفاة إلى النصف.",
  "Is that gap the drug?":
    "هل تلك الفجوة هي الدواء؟",
  "One patient from each group":
    "مريض واحد من كل مجموعة",
  "months":
    "أشهر",
  "entered the cohort":
    "دخل المجموعة الأترابية",
  "first prescription dispensed":
    "صُرفت أول وصفة",
  "follow-up credited to each group":
    "المتابعة المنسوبة إلى كل مجموعة",
  "Counted, but death was impossible":
    "محتسبة، لكن الوفاة كانت مستحيلة",
  "Follow-up credited to each group":
    "المتابعة المنسوبة إلى كل مجموعة",
  "Counted as on the drug":
    "محتسب على أنه على الدواء",
  "Counted as not on the drug":
    "محتسب على أنه ليس على الدواء",
  "As the study counted it":
    "كما احتسبتها الدراسة",
  "Yes, the drug is keeping them alive":
    "نعم، الدواء يبقيهم أحياء",
  "half the deaths":
    "نصف الوفيات",
  "No, the untreated were sicker to begin with":
    "لا، غير المعالجين كانوا أشد مرضاً من البداية",
  "they were never offered it":
    "لم يُعرض عليهم قط",
  "No, some of that time could not contain a death":
    "لا، بعض ذلك الزمن لم يكن ليحتوي وفاة",
  "the clock was started too early":
    "بدأت الساعة مبكراً أكثر من اللازم",
  "Half the treated group's follow-up was time in which nobody could die.":
    "نصف متابعة المجموعة المعالجة كان زمناً لا يستطيع فيه أحد أن يموت.",
  "Surviving is what put them in the treated group":
    "البقاء حياً هو ما وضعهم في المجموعة المعالجة",
  "This patient was counted as treated from the day they entered, but the prescription was not dispensed until month 11. Those eleven months are immortal: had the patient died in month 6, no prescription would ever have been written and they would have been counted in the other group instead. Death was not merely unlikely in that stretch, it was impossible by the way the groups were defined, and it is credited to the drug all the same:":
    "احتُسب هذا المريض معالجاً من يوم دخوله، لكن الوصفة لم تُصرف حتى الشهر 11. تلك الأشهر الأحد عشر خالدة: فلو مات المريض في الشهر 6 لما كُتبت وصفة قط ولاحتُسب في المجموعة الأخرى بدلاً من ذلك. لم تكن الوفاة في تلك الفترة غير مرجحة فحسب، بل كانت مستحيلة بحكم طريقة تعريف المجموعتين، ومع ذلك تُنسب إلى الدواء:",
  "The same follow-up, marked":
    "المتابعة نفسها، معلَّمة",
  "Nothing about the patients has to differ for this to work. Give both groups exactly the same drug, the same illness and the same luck, and the treated group will still come out ahead, because it has been handed a run of guaranteed survival that the other group cannot have. In the published example this is drawn from, the treated group was credited with 291.1 immortal person-years against 276.3 person-years in which it was genuinely at risk: more of its follow-up was impossible-to-die time than was real. Correcting only that moved the hazard ratio from 0.48 to 0.91.":
    "لا يلزم أن يختلف شيء في المرضى كي ينجح هذا. أعطِ المجموعتين الدواء نفسه تماماً والمرض نفسه والحظ نفسه، وستخرج المجموعة المعالجة متقدمة رغم ذلك، لأنها مُنحت مدة من البقاء المضمون لا تستطيع المجموعة الأخرى الحصول عليها. وفي المثال المنشور الذي أُخذ منه هذا، نُسب إلى المجموعة المعالجة 291.1 شخص سنة خالدة مقابل 276.3 شخص سنة كانت فيها معرضة للخطر حقاً: أي أن ما كان من متابعتها زمناً يستحيل فيه الموت أكثر مما كان حقيقياً. وتصحيح ذلك وحده نقل نسبة الخطورة من 0.48 إلى 0.91.",
  "The stretch before the prescription":
    "الفترة السابقة للوصفة",
  "Immortal time bias":
    "تحيز الزمن الخالد",
  "If being in a group requires surviving until something happens, then the time before it happened cannot contain a death, and counting it towards that group manufactures survival out of bookkeeping.":
    "إذا كان الانتماء إلى مجموعة يستلزم البقاء حياً حتى يقع شيء ما، فالزمن السابق لوقوعه لا يمكن أن يحتوي وفاة، واحتسابه لصالح تلك المجموعة يصنع بقاءً على قيد الحياة من مجرد مسك الدفاتر.",
  "The tell is a group defined by something that occurs after follow-up starts: filled the prescription, had the operation, responded to treatment, won the award, completed the course. Ask what happens to a person who dies the day before. If they land in the comparison group, the clock is wrong. The fix is not a cleverer adjustment: it is to count each person's time as unexposed until the moment they become exposed, and let them switch.":
    "العلامة الفارقة هي مجموعة معرَّفة بشيء يقع بعد بدء المتابعة: صرف الوصفة، أو إجراء العملية، أو الاستجابة للعلاج، أو الفوز بالجائزة، أو إتمام الدورة. اسأل ماذا يحدث لشخص يموت في اليوم السابق. فإذا وقع في مجموعة المقارنة، فالساعة خاطئة. والحل ليس تعديلاً أذكى: بل احتساب زمن كل شخص غير معرَّض حتى اللحظة التي يصبح فيها معرَّضاً، والسماح له بالانتقال.",
  "Cohort studies compare rates, and a rate is deaths divided by time at risk. That denominator is where this hides. Suppose you want to know whether a drug helps, so you follow everyone admitted to hospital and sort them afterwards by whether they were ever dispensed it. The sorting looks innocent, but it uses information from the future: to be dispensed a drug in month 11, you must be alive in month 11. So every patient in the treated group is guaranteed to have survived to their own first prescription, and if you start their clock at admission you credit the treated group with all of that guaranteed survival. The untreated group gets no such gift, because it is where the early deaths necessarily land. The bias is large, it always points the same way, it makes useless drugs look protective, and it does not shrink with a bigger sample, because it is not noise. It also has nothing to do with confounding, which is why adjusting for how ill the patients were does not touch it: you can simulate the whole thing with identical patients and a drug that does nothing. The correct handling is standard and unglamorous. Treat exposure as time-varying: every patient contributes unexposed time from entry until their first prescription and exposed time after it, so nobody is credited to a group before they belong to it. The same trap sits under any claim built on people who finished something, from Academy Award winners living longer than nominees to patients who completed a rehabilitation programme, and in each case the first question is the same: what happens in these numbers to the person who died in the middle?":
    "تقارن الدراسات الأترابية معدلات، والمعدل هو الوفيات مقسومة على الزمن المعرَّض للخطر. وفي ذلك المقام يختبئ الأمر. لنفترض أنك تريد معرفة ما إذا كان دواء يفيد، فتتابع كل من أُدخل المستشفى ثم تفرزهم لاحقاً بحسب ما إذا كان قد صُرف لهم يوماً. يبدو الفرز بريئاً، لكنه يستخدم معلومة من المستقبل: فلكي يُصرف لك دواء في الشهر 11، عليك أن تكون حياً في الشهر 11. وهكذا فإن كل مريض في المجموعة المعالجة مضمون أنه بقي حياً حتى وصفته الأولى، وإذا بدأت ساعته عند الإدخال فأنت تنسب إلى المجموعة المعالجة كل ذلك البقاء المضمون. أما المجموعة غير المعالجة فلا تنال هذه الهدية، لأنها المكان الذي تقع فيه الوفيات المبكرة بالضرورة. والتحيز كبير، ويشير دائماً في الاتجاه نفسه، ويجعل أدوية عديمة الجدوى تبدو واقية، ولا يتقلص بعينة أكبر، لأنه ليس ضجيجاً. كما أنه لا علاقة له بالخلط، ولهذا فإن التعديل لدرجة مرض المرضى لا يمسّه: إذ يمكنك محاكاة الأمر كله بمرضى متطابقين ودواء لا يفعل شيئاً. أما المعالجة الصحيحة فقياسية وغير براقة. عامِل التعرض بوصفه متغيراً بالزمن: فكل مريض يسهم بزمن غير معرَّض من الدخول حتى وصفته الأولى وبزمن معرَّض بعدها، فلا يُنسب أحد إلى مجموعة قبل أن ينتمي إليها. والفخّ نفسه يقبع تحت أي ادعاء مبني على أشخاص أتموا شيئاً، من الفائزين بجائزة الأوسكار الذين يعيشون أطول من المرشحين إلى المرضى الذين أكملوا برنامج تأهيل، وفي كل حالة يكون السؤال الأول واحداً: ماذا يحدث في هذه الأرقام للشخص الذي مات في المنتصف؟",
  "The Oscar winners who did not, after all, live longer":
    "الفائزون بالأوسكار الذين لم يعيشوا أطول في نهاية المطاف",
  "A well-known study reported that Academy Award winners outlived the actors merely nominated alongside them by nearly four years, and it was widely read as evidence that status is good for your health. But an actor cannot win an award while dead, so every winner was credited with all the years before their win, whereas a nominee who died young could only ever be a nominee. Reanalysing the same data with the award treated as something that happens partway through a life, rather than a property of the whole life, cut the advantage to about a year and it was no longer statistically significant. The original authors later published a null result of their own.":
    "أفادت دراسة معروفة بأن الفائزين بجائزة الأوسكار عاشوا أطول من الممثلين المرشحين معهم فحسب بنحو أربع سنوات، وقُرئت على نطاق واسع بوصفها دليلاً على أن المكانة مفيدة للصحة. لكن الممثل لا يستطيع الفوز بجائزة وهو ميت، فنُسبت إلى كل فائز كل السنوات السابقة لفوزه، بينما المرشح الذي مات شاباً لا يمكن أن يكون إلا مرشحاً. وإعادة تحليل البيانات نفسها مع معاملة الجائزة بوصفها شيئاً يقع في منتصف الحياة، لا صفةً للحياة كلها، قلّصت الأفضلية إلى نحو سنة واحدة ولم تعد دالة إحصائياً. ونشر الباحثون الأصليون لاحقاً نتيجة صفرية خاصة بهم.",
  "Immortal time bias, a reasoning trap.":
    "تحيز الزمن الخالد، فخّ في الاستدلال.",
  "Sort people into groups by something that happens later, and one of those groups gets a hidden head start. To be counted as having taken the drug, you have to live long enough to be given it. So everybody in the treated group is guaranteed to have survived up to their first prescription, and if you count that stretch towards the drug, the drug is credited with survival it had nothing to do with. Anyone who died early is automatically filed under untreated. It works even when the drug does nothing at all, it always points the same way, and a bigger study only makes it more convincing.":
    "افرز الناس إلى مجموعات بحسب شيء يحدث لاحقاً، وستحصل إحدى تلك المجموعات على بداية سبق خفية. فلكي تُحتسب ممن تناولوا الدواء، عليك أن تعيش مدة تكفي لأن يُعطى لك. وهكذا فكل من في المجموعة المعالجة مضمون أنه بقي حياً حتى وصفته الأولى، وإذا احتسبت تلك الفترة لصالح الدواء، نُسب إلى الدواء بقاء لا علاقة له به. وكل من مات مبكراً يُصنَّف تلقائياً ضمن غير المعالجين. وهذا يعمل حتى حين لا يفعل الدواء شيئاً على الإطلاق، ويشير دائماً في الاتجاه نفسه، ودراسة أكبر لا تزيده إلا إقناعاً.",
  "The figure above is schematic, like the bomber diagram: two illustrative patients rather than two rows of the dataset, with proportions chosen to echo the published ones (eleven immortal months out of twenty-two counted, against 291.1 immortal person-years out of 567.4 counted, which is 51.3 percent). The numbers that are claims about the world, the death counts and the two hazard ratios, are all in the citation above and none of them is recomputed here: the hazard ratios come from survival models rather than from any two-by-two table, and the paper is a methodological reanalysis in which several cohort definitions are applied to one dataset, so the row is named exactly.":
    "الشكل أعلاه تخطيطي، مثل مخطط القاذفة: مريضان توضيحيان لا صفّان من مجموعة البيانات، بنسب اختيرت لتحاكي المنشورة (أحد عشر شهراً خالداً من أصل اثنين وعشرين محتسبة، مقابل 291.1 شخص سنة خالدة من أصل 567.4 محتسبة، أي 51.3 بالمئة). أما الأرقام التي هي ادعاءات عن العالم، أي أعداد الوفيات ونسبتا الخطورة، فكلها في الاستشهاد أعلاه ولا يُعاد حساب أي منها هنا: فنسب الخطورة تأتي من نماذج البقيا لا من أي جدول ثنائي، والورقة إعادة تحليل منهجية تُطبَّق فيها عدة تعريفات للأتراب على مجموعة بيانات واحدة، ولذلك يُسمّى الصف بدقة.",
  "A weight-loss trial randomly assigns 400 people to a programme or to usual care. It reports the average weight lost among the 180 programme participants who attended at least eight sessions, and among all 200 controls. The programme wins comfortably.":
    "تجربة لإنقاص الوزن تخصص عشوائياً 400 شخص لبرنامج أو للرعاية المعتادة. وتُبلّغ عن متوسط الوزن المفقود بين 180 مشاركاً في البرنامج حضروا ثماني جلسات على الأقل، وبين جميع الشواهد البالغ عددهم 200. ويفوز البرنامج بأريحية.",
  "One arm has been filtered and the other has not. Attending eight sessions is something people who were doing well were more able to do, so the programme group has quietly been reduced to its successes while the control group keeps everybody.":
    "ذراع واحدة رُشّحت والأخرى لا. وحضور ثماني جلسات أمر كان الأشخاص الذين يبلون حسناً أقدر عليه، فاختُزلت مجموعة البرنامج بهدوء إلى نجاحاتها بينما تحتفظ مجموعة الشواهد بالجميع.",
  "In a surgical trial, some patients assigned to medication deteriorate and are operated on anyway. The analysis counts each patient under the treatment they ended up receiving, and finds surgery ahead.":
    "في تجربة جراحية، تتدهور حال بعض المرضى المخصصين للدواء فتُجرى لهم العملية رغم ذلك. ويحتسب التحليل كل مريض تحت العلاج الذي تلقاه في النهاية، فيجد الجراحة متقدمة.",
  "Switching happened after the coin flip and for a reason: those patients had to survive long enough to reach the operating table. Counting people by what they received rather than what they were assigned sorts them by how they were doing, which is the thing being measured.":
    "حدث التبديل بعد رمية القرعة ولسبب: فقد كان على هؤلاء المرضى البقاء أحياء مدة تكفي للوصول إلى طاولة العمليات. واحتساب الناس بحسب ما تلقوه لا بحسب ما خُصّص لهم يفرزهم بحسب حالهم، وهو الشيء المقاس.",
  "A trial of a daily tablet excludes anyone who took less than 80 percent of their doses, on the grounds that the question is whether the drug works when actually taken. Both arms are filtered the same way.":
    "تجربة لقرص يومي تستبعد كل من تناول أقل من 80 بالمئة من جرعاته، بحجة أن السؤال هو ما إذا كان الدواء ينفع حين يُتناول فعلاً. وتُرشَّح الذراعان بالطريقة نفسها.",
  "Filtering both arms identically does not repair it. Who manages to take 80 percent of their tablets differs by how well they are and by much else besides, so each arm loses a different kind of patient and the groups the coin made no longer exist.":
    "ترشيح الذراعين بالطريقة نفسها لا يصلح الأمر. فمن ينجح في تناول 80 بالمئة من أقراصه يختلف بحسب حاله الصحية وبحسب أمور كثيرة غيرها، فتفقد كل ذراع نوعاً مختلفاً من المرضى ولا تعود المجموعتان اللتان صنعتهما القرعة موجودتين.",
  "A trial reports that among patients who completed the full twelve months, the new drug halved relapses. A quarter of that arm withdrew before twelve months and are not counted.":
    "تُبلّغ تجربة بأنه بين المرضى الذين أكملوا الاثني عشر شهراً كاملة، خفض الدواء الجديد الانتكاسات إلى النصف. وقد انسحب ربع تلك الذراع قبل اثني عشر شهراً ولم يُحتسبوا.",
  "People usually withdraw for a reason, and relapsing is one of the commonest. An analysis of completers can turn the drug's failures into people who simply are not in the table.":
    "ينسحب الناس عادةً لسبب، والانتكاس من أكثر الأسباب شيوعاً. وتحليل المُكملين قد يحوّل إخفاقات الدواء إلى أشخاص غير موجودين في الجدول ببساطة.",
  "Mothers of babies born with a heart defect are interviewed about what they took during pregnancy, alongside mothers of healthy babies. The mothers of affected babies report far more medicine use in the first trimester, and a report concludes the medicines are implicated.":
    "تُقابَل أمهات أطفال وُلدوا بعيب قلبي بشأن ما تناولنه أثناء الحمل، إلى جانب أمهات أطفال أصحاء. وتُبلّغ أمهات الأطفال المصابين عن استخدام أدوية أكثر بكثير في الثلث الأول من الحمل، ويستنتج تقرير أن الأدوية متورطة.",
  "One group has spent months being asked what went wrong and searching for it. The other has had no reason to think about the first trimester at all. The comparison is partly of what was taken and partly of how hard each group looked.":
    "قضت إحدى المجموعتين شهوراً وهي تُسأل عمّا حدث من خطأ وتبحث عنه. أما الأخرى فلم يكن لديها سبب للتفكير في الثلث الأول من الحمل إطلاقاً. والمقارنة هي جزئياً لما تم تناوله وجزئياً لمقدار الجهد الذي بذلته كل مجموعة في البحث.",
  "People with a brain tumour and people without are asked how many hours a week they used a mobile phone ten years ago, and on which side of the head. Those with a tumour report more hours, and more often on the side the tumour is on.":
    "يُسأل المصابون بورم دماغي وغير المصابين عن عدد الساعات أسبوعياً التي استخدموا فيها الهاتف المحمول قبل عشر سنوات، وعلى أي جانب من الرأس. ويُبلّغ المصابون بورم عن ساعات أكثر، وفي أغلب الأحيان على الجانب الذي يوجد فيه الورم.",
  "Nobody can accurately recall a decade of phone habits, so the gap is filled in, and the tumour tells them which side to fill it in on. Billing records would settle it; memory cannot.":
    "لا أحد يستطيع أن يتذكر بدقة عقداً من عادات الهاتف، فتُملأ الفجوة، والورم يخبرهم بأي جانب يملؤونها. سجلات الفوترة كفيلة بحسم الأمر، أما الذاكرة فلا.",
  "After a bowel cancer diagnosis, patients are asked to describe their diet over the previous twenty years, and their answers are compared with those of healthy volunteers of the same age.":
    "بعد تشخيص سرطان الأمعاء، يُطلب من المرضى وصف نظامهم الغذائي على مدى العشرين سنة الماضية، وتُقارن أجوبتهم بأجوبة متطوعين أصحاء في العمر نفسه.",
  "The patients have already been told which foods are suspected, and are reconstructing twenty years around a diagnosis. The volunteers are reconstructing twenty years around nothing in particular.":
    "قيل للمرضى بالفعل أي الأطعمة مشتبه بها، وهم يعيدون بناء عشرين سنة حول تشخيص. أما المتطوعون فيعيدون بناء عشرين سنة حول لا شيء بعينه.",
  "Workers making a compensation claim for back pain are asked how heavy their lifting used to be, and their answers are compared with those of colleagues who made no claim.":
    "يُسأل عمال يقدّمون مطالبة تعويض عن ألم الظهر عن مقدار ثقل ما كانوا يرفعونه، وتُقارن أجوبتهم بأجوبة زملاء لم يقدّموا مطالبة.",
  "Both groups did the same job. Only one has spent months assembling an account of how demanding it was, and that account is what is being measured.":
    "أدّت المجموعتان العمل نفسه. لكن واحدة منهما فقط قضت شهوراً في تركيب سرد عن مدى إرهاق ذلك العمل، وهذا السرد هو ما يُقاس.",
  "A registry compares patients who received a transplant with those on the waiting list who did not, counting each patient's survival from the day they joined the list. The transplanted group lives far longer.":
    "يقارن سجل مرضى تلقّوا زرعاً بمن كانوا على قائمة الانتظار ولم يتلقوه، محتسباً بقيا كل مريض من يوم انضمامه إلى القائمة. وتعيش مجموعة المزروعين أطول بكثير.",
  "To be transplanted you must survive until an organ arrives, so everyone in that group is guaranteed to have lived from listing to surgery. Anyone who dies while waiting can only ever be in the other group.":
    "لكي تتلقى زرعاً عليك أن تبقى حياً حتى يصل عضو، فكل من في تلك المجموعة مضمون أنه عاش من الإدراج في القائمة حتى الجراحة. وكل من يموت أثناء الانتظار لا يمكن أن يكون إلا في المجموعة الأخرى.",
  "A hospital reports that patients who completed the full six-week rehabilitation course had better one-year survival than those who did not, measured from the day of admission.":
    "يُبلّغ مستشفى بأن المرضى الذين أكملوا دورة التأهيل الكاملة ذات الستة أسابيع كانت بقياهم لسنة واحدة أفضل ممن لم يكملوها، مقيسةً من يوم الإدخال.",
  "Completing six weeks requires being alive for six weeks. The comparison group collects everyone who died in the meantime, and the course is credited with those first six weeks of guaranteed survival.":
    "إتمام ستة أسابيع يستلزم البقاء حياً ستة أسابيع. ومجموعة المقارنة تجمع كل من مات في الأثناء، وتُنسب إلى الدورة تلك الأسابيع الستة الأولى من البقاء المضمون.",
  "Using a prescription database, researchers classify each patient as a drug user if they were ever dispensed it during follow-up, and count follow-up from the date of their hospital discharge.":
    "باستخدام قاعدة بيانات وصفات، يصنّف الباحثون كل مريض مستخدماً للدواء إذا كان قد صُرف له يوماً خلال المتابعة، ويحتسبون المتابعة من تاريخ خروجه من المستشفى.",
  "The classification uses the future. Time between discharge and the first dispensing cannot contain a death for anyone counted as a user, yet it is credited to the drug. Counting each patient as unexposed until their first prescription removes it.":
    "التصنيف يستخدم المستقبل. فالزمن بين الخروج وأول صرف لا يمكن أن يحتوي وفاة لأي شخص يُحتسب مستخدماً، ومع ذلك يُنسب إلى الدواء. واحتساب كل مريض غير معرَّض حتى وصفته الأولى يزيله.",
  "An oncology paper reports that patients whose tumour responded to chemotherapy survived longer than non-responders, timing survival from the start of treatment. Response was assessed after three cycles.":
    "تُبلّغ ورقة في علم الأورام بأن المرضى الذين استجاب ورمهم للعلاج الكيميائي عاشوا أطول من غير المستجيبين، مع توقيت البقيا من بدء العلاج. وقُيّمت الاستجابة بعد ثلاث دورات.",
  "You cannot be classed as a responder unless you live to the assessment after three cycles. Patients who die during the first two cycles are all non-responders by construction, so the responder group starts with survival built into it.":
    "لا يمكن تصنيفك مستجيباً إلا إذا عشت حتى التقييم بعد ثلاث دورات. والمرضى الذين يموتون خلال الدورتين الأوليين كلهم غير مستجيبين بحكم البناء، فتبدأ مجموعة المستجيبين وقد بُني البقاء في داخلها.",
  "A drug-safety study counts each patient as untreated from enrolment until the day of their first prescription, and as treated from that day onwards, so a patient can contribute time to both groups.":
    "دراسة لسلامة الأدوية تحتسب كل مريض غير معالج من التسجيل حتى يوم وصفته الأولى، ومعالجاً من ذلك اليوم فصاعداً، فيستطيع المريض أن يسهم بزمن في المجموعتين معاً.",
  "Nobody is credited to a group before they belong to it, so no stretch of guaranteed survival is handed to the treated group. This is the standard fix, correctly applied.":
    "لا يُنسب أحد إلى مجموعة قبل أن ينتمي إليها، فلا تُمنح المجموعة المعالجة أي فترة من البقاء المضمون. هذا هو الحل القياسي، مطبَّقاً على نحو صحيح.",
  "A study of patients who completed a course of treatment starts everyone's clock at the end of the course, and excludes anyone who died before that point from both groups alike.":
    "دراسة لمرضى أكملوا دورة علاج تبدأ ساعة الجميع عند نهاية الدورة، وتستبعد كل من مات قبل تلك النقطة من المجموعتين على السواء.",
  "Starting the clock after the point where group membership was settled means neither group can be credited with survival it was guaranteed. It costs some early data, and it removes the head start.":
    "بدء الساعة بعد النقطة التي استقر عندها الانتماء إلى المجموعة يعني أنه لا يمكن أن يُنسب إلى أي من المجموعتين بقاء كان مضموناً لها. وهذا يكلّف بعض البيانات المبكرة، ويزيل بداية السبق.",
  "A study of a drug taken in pregnancy takes the exposure from the national prescription database rather than from interviews, then compares outcomes. Neither the mothers nor the researchers supplied the exposure data.":
    "دراسة لدواء يُتناول أثناء الحمل تأخذ التعرض من قاعدة بيانات الوصفات الوطنية لا من المقابلات، ثم تقارن النتائج. ولم تُقدَّم بيانات التعرض من الأمهات ولا من الباحثين.",
  "The exposure was written down before anyone knew the outcome, by someone with no stake in it. That is the standard defence against memory bending, and here it was used.":
    "دُوّن التعرض قبل أن يعرف أحد النتيجة، بيد شخص لا مصلحة له فيها. وهذا هو الدفاع القياسي ضد انحناء الذاكرة، وقد استُخدم هنا.",
  "A case-control study asks about the suspected exposure and also about a second, unrelated one that nobody associates with the disease. Both groups report the second one at the same rate, and the authors say so before reporting the first.":
    "دراسة حالات وشواهد تسأل عن التعرض المشتبه به وأيضاً عن تعرض ثانٍ غير ذي صلة لا يربطه أحد بالمرض. وتُبلّغ المجموعتان عن الثاني بالمعدل نفسه، ويذكر الباحثون ذلك قبل الإبلاغ عن الأول.",
  "The second question is a control for the searching itself. If one group were simply remembering harder across the board, it would show up there too, and it did not.":
    "السؤال الثاني ضابط للتنقيب نفسه. فلو كانت إحدى المجموعتين تتذكر بجهد أكبر على طول الخط، لظهر ذلك هناك أيضاً، ولم يظهر.",
  "A trial's main result counts every patient in the group they were randomly assigned to, including the 40 who never started the treatment. A per-protocol analysis is reported alongside it, agrees with it, and is labelled as secondary.":
    "النتيجة الرئيسية لتجربة تحتسب كل مريض في المجموعة التي خُصّص لها عشوائياً، بمن فيهم الـ 40 الذين لم يبدأوا العلاج قط. ويُبلَّغ عن تحليل الالتزام بالبروتوكول إلى جانبها، ويتفق معها، ويوسَم بأنه ثانوي.",
  "The randomised comparison is the one the conclusion rests on, the other is shown for completeness, and the two agree. That is how both analyses are supposed to be used.":
    "المقارنة المعشّاة هي التي يستند إليها الاستنتاج، والأخرى تُعرض للاكتمال، وهما متفقتان. وهكذا يُفترض أن يُستخدم التحليلان.",
  "A trial testing whether a simpler regimen is no worse than the standard one reports both analyses, notes that counting non-adherent patients in their assigned group tends to make two treatments look alike, and declines to claim non-inferiority because only one of the two analyses supports it.":
    "تجربة تختبر ما إذا كان نظام أبسط ليس أسوأ من النظام المعياري تُبلّغ عن التحليلين معاً، وتشير إلى أن احتساب المرضى غير الملتزمين في مجموعتهم المخصصة يميل إلى جعل علاجين يبدوان متشابهين، وتمتنع عن ادعاء عدم الدونية لأن واحداً فقط من التحليلين يدعمه.",
  "Counting everyone as assigned is conservative when you are trying to show a difference and permissive when you are trying to show similarity, so a non-inferiority claim needs both analyses to agree. Refusing to claim it when they disagree is the careful move, not the trap.":
    "احتساب الجميع حسب التخصيص محافظ حين تحاول إظهار فرق ومتساهل حين تحاول إظهار تشابه، فادعاء عدم الدونية يحتاج إلى اتفاق التحليلين. والامتناع عن ادعائه حين يختلفان هو التصرف المدقق، لا الفخّ.",

  // ---- intention to treat, recall bias, immortal time ----
  "Two players are compared over a season. Player A made 35% of all shots and Player B made 65%, and the coach's report names B the more accurate shooter. Sorted into close shots and long shots, A had the higher percentage in both.":
    "تجري مقارنة بين لاعبين خلال موسم كامل. سجل اللاعب A نسبة 35% من مجموع تسديداته وسجل اللاعب B نسبة 65%، ويصف تقرير المدرب اللاعب B بأنه الأدق تسديدًا. وعند الفصل بين التسديدات القريبة والتسديدات البعيدة، كانت نسبة A أعلى في الحالتين.",
  "Almost all of B's attempts were close range, where anyone scores often, while A shot mostly from distance, so the pooled percentages record where the shots were taken from rather than who shoots better.":
    "كانت جميع محاولات B تقريبًا من مسافة قريبة حيث يسجل أي لاعب كثيرًا، بينما سدد A من مسافة بعيدة في معظم الأحيان، لذا فإن النسب المجمعة تسجل موضع التسديد لا من يسدد بدقة أكبر.",
  "A company reviews last year's applications. Overall 70% of outside applicants were hired against 40% of internal ones, and a manager tells the board the process quietly favours outsiders. Team by team, internal applicants were hired at the higher rate in both the engineering team and the sales team.":
    "تراجع شركة طلبات التوظيف للعام الماضي. إجمالًا جرى توظيف 70% من المتقدمين الخارجيين مقابل 40% من المتقدمين الداخليين، ويقول أحد المديرين لمجلس الإدارة إن العملية تحابي الخارجيين في صمت. وعلى مستوى كل فريق، جرى توظيف المتقدمين الداخليين بنسبة أعلى في فريق الهندسة وفريق المبيعات معًا.",
  "Outside applicants went mainly to engineering, which was hiring heavily, while internal ones applied mainly to sales, where almost nobody was being taken on, so the pooled figures compare which team people applied to.":
    "توجه المتقدمون الخارجيون في الأغلب إلى الهندسة التي كانت توظف بكثافة، بينما تقدم الداخليون في الأغلب إلى المبيعات التي لم تكن توظف أحدًا تقريبًا، لذا فإن الأرقام المجمعة تقارن بين الفرق التي تقدم إليها الناس.",
  "A team replaces its sign up page. The new page signs up 35% of visitors against the old page's 13%, and the product lead calls it a clear win. Looked at separately, the old page did better among desktop visitors and better among phone visitors.":
    "يستبدل فريق صفحة التسجيل لديه. تسجل الصفحة الجديدة 35% من الزوار مقابل 13% للصفحة القديمة، ويصف مسؤول المنتج ذلك بأنه مكسب واضح. وعند النظر إلى كل فئة على حدة، كان أداء الصفحة القديمة أفضل بين زوار الحاسوب المكتبي وأفضل بين زوار الهاتف.",
  "The old page was seen mostly by phone visitors, who rarely sign up on either version, and the new one mostly by desktop visitors, who sign up often, so the overall gap tracks the audience mix.":
    "شاهد الصفحة القديمة في الأغلب زوار الهاتف الذين نادرًا ما يسجلون في أي من النسختين، وشاهد الجديدة في الأغلب زوار الحاسوب المكتبي الذين يسجلون كثيرًا، لذا فإن الفارق الإجمالي يتتبع تركيبة الجمهور.",
  "Two customer service centres are compared. One settles 85% of calls at the first attempt and the other 54%, so the bonus goes to the first. Broken into routine calls and complicated ones, the second centre settles the higher share of each.":
    "تجري مقارنة بين مركزي خدمة عملاء. يحسم أحدهما 85% من المكالمات من المحاولة الأولى ويحسم الآخر 54%، فتذهب المكافأة إلى الأول. وعند التقسيم إلى مكالمات روتينية وأخرى معقدة، يحسم المركز الثاني النسبة الأعلى في كل منهما.",
  "Nearly all of the second centre's work is complicated calls, which are hard to settle at once, while the first handles mostly routine ones, so the combined rate compares workloads rather than skill.":
    "معظم عمل المركز الثاني تقريبًا مكالمات معقدة يصعب حسمها من مرة واحدة، بينما يتعامل الأول في الأغلب مع مكالمات روتينية، لذا فإن المعدل المجمع يقارن أعباء العمل لا المهارة.",
  "A chain compares two hotels on guest ratings. One averages 4.3 out of 5 and the other 3.3, and head office holds the second up as the weaker property. Among business guests the second scores higher, and among holiday guests it scores higher too.":
    "تقارن سلسلة فندقية بين فندقين بحسب تقييمات النزلاء. يبلغ متوسط أحدهما 4.3 من 5 والآخر 3.3، وتعتبر الإدارة المركزية الثاني هو المنشأة الأضعف. وبين نزلاء الأعمال يحصل الثاني على تقييم أعلى، وبين نزلاء العطلات يحصل على تقييم أعلى كذلك.",
  "Almost all of the lower rated hotel's reviews come from business guests, who mark every hotel down, while the other's come mostly from holidaymakers, who mark everything up, so the averages compare who was reviewing.":
    "تأتي جميع تقييمات الفندق الأدنى تقريبًا من نزلاء الأعمال الذين يخفضون تقييم كل فندق، بينما تأتي تقييمات الآخر في الأغلب من قاصدي العطلات الذين يرفعون تقييم كل شيء، لذا فإن المتوسطات تقارن بين من كتب التقييم.",
  "A cooperative compares two seed varieties across its members' fields. One averaged 5.6 tonnes a hectare and the other 2.6, and the newsletter recommends the first. On clay ground the second variety yielded more, and on sandy ground it yielded more as well.":
    "تقارن جمعية تعاونية بين صنفين من البذور في حقول أعضائها. بلغ متوسط أحدهما 5.6 طن للهكتار والآخر 2.6، وتوصي النشرة بالأول. وفي الأرض الطينية أعطى الصنف الثاني محصولًا أكبر، وفي الأرض الرملية أعطى محصولًا أكبر كذلك.",
  "The lower yielding variety was sown almost entirely on sandy ground, which grows little of anything, and the other almost entirely on clay, so the averages mostly record where each seed was planted.":
    "زرع الصنف الأقل إنتاجًا بالكامل تقريبًا في أرض رملية لا تنبت إلا القليل من أي شيء، وزرع الآخر بالكامل تقريبًا في أرض طينية، لذا فإن المتوسطات تسجل في الأغلب مكان زراعة كل صنف.",
  "Two courier firms report on time delivery. One arrives on time for 92% of parcels and the other for 72%, so a retailer moves its contract to the first. Counting town deliveries and country deliveries separately, the second firm is on time more often in both.":
    "تعلن شركتا شحن عن نسب التسليم في الموعد. تصل إحداهما في الموعد في 92% من الطرود والأخرى في 72%، فينقل أحد تجار التجزئة عقده إلى الأولى. وعند حساب التسليمات داخل المدن وتسليمات الأرياف كلٍّ على حدة، تلتزم الشركة الثانية بالموعد أكثر في الحالتين.",
  "The firm with the worse headline figure carries nearly all the country parcels, which run late for everyone, while the other carries mostly short town runs, so the combined rate reflects the routes each was given.":
    "تنقل الشركة صاحبة الرقم الإجمالي الأسوأ معظم طرود الأرياف تقريبًا، وهي طرود تتأخر لدى الجميع، بينما تنقل الأخرى في الأغلب رحلات قصيرة داخل المدن، لذا فإن المعدل المجمع يعكس المسارات التي أسندت إلى كل منهما.",
  "A screening test at an amateur athletics meeting catches 99% of competitors who have used a banned substance and wrongly flags 1% of those who have not. About 1 competitor in 500 has used one. A commentator says a flagged athlete is 99% certain to be guilty.":
    "يكشف فحص استباقي في ملتقى لألعاب القوى للهواة 99% من المتنافسين الذين تعاطوا مادة محظورة، ويشير خطأً إلى 1% ممن لم يتعاطوا. ويتعاطى نحو 1 من كل 500 متنافس مادة محظورة. ويقول أحد المعلقين إن الرياضي الذي يشار إليه مذنب بنسبة يقين 99%.",
  "Clean competitors outnumber users 499 to 1, so flagging one percent of them yields roughly five wrong flags for every real one, and most flagged athletes have taken nothing.":
    "يفوق عدد المتنافسين النظيفين عدد المتعاطين بنسبة 499 إلى 1، لذا فإن الإشارة إلى واحد في المئة منهم تعطي نحو خمس إشارات خاطئة مقابل كل إشارة صحيحة، ومعظم الرياضيين المشار إليهم لم يتعاطوا شيئًا.",
  "A bank's monitoring catches essentially every fraudulent card payment and wrongly flags 1 legitimate payment in 200. About 1 payment in 10,000 is fraudulent. A manager proposes freezing the account of anyone whose payment is flagged, saying almost all of them are frauds.":
    "يرصد نظام المراقبة في أحد البنوك كل عملية دفع احتيالية بالبطاقة تقريبًا، ويشير خطأً إلى 1 من كل 200 عملية مشروعة. ونحو 1 من كل 10,000 عملية احتيالية. ويقترح أحد المديرين تجميد حساب كل من يشار إلى عمليته، قائلًا إن جميعها تقريبًا عمليات احتيال.",
  "For each fraudulent payment there are about 10,000 legitimate ones, and half a percent of those is roughly 50 wrong flags per real fraud, so nearly every frozen account belongs to an ordinary customer.":
    "مقابل كل عملية احتيالية هناك نحو 10,000 عملية مشروعة، ونصف في المئة منها يساوي نحو 50 إشارة خاطئة مقابل كل احتيال حقيقي، لذا فإن كل حساب مجمد تقريبًا يعود إلى عميل عادي.",
  "A university's text checking tool is 98% accurate in both directions. About 1 essay in 200 is genuinely copied. The disciplinary panel tells every student it flags that there is a 98% chance they copied.":
    "أداة فحص النصوص في إحدى الجامعات دقيقة بنسبة 98% في الاتجاهين. ونحو 1 من كل 200 مقال منقول فعلًا. وتبلغ لجنة التأديب كل طالب تشير إليه الأداة بأن احتمال نقله 98%.",
  "Honest essays outnumber copied ones 199 to 1, so two percent of them produces about four wrong flags for every real one, and a flagged student is more likely innocent than not.":
    "يفوق عدد المقالات النزيهة عدد المنقولة بنسبة 199 إلى 1، لذا فإن اثنين في المئة منها ينتج نحو أربع إشارات خاطئة مقابل كل إشارة صحيحة، والطالب المشار إليه أقرب إلى البراءة منه إلى الإدانة.",
  "A camera on a production line spots 95% of faulty units and wrongly rejects 3% of good ones. About 1 unit in 1,000 leaves the line faulty. The plant manager scraps every rejected unit, saying almost all of them must be defective.":
    "ترصد كاميرا على خط إنتاج 95% من الوحدات المعيبة وترفض خطأً 3% من الوحدات السليمة. ونحو 1 من كل 1,000 وحدة تخرج من الخط معيبة. ويتلف مدير المصنع كل وحدة مرفوضة، قائلًا إن جميعها تقريبًا لا بد أن تكون معيبة.",
  "Good units outnumber faulty ones about 1,000 to 1, so rejecting three percent of them discards roughly thirty sound units for every faulty one caught.":
    "يفوق عدد الوحدات السليمة عدد المعيبة بنحو 1,000 إلى 1، لذا فإن رفض ثلاثة في المئة منها يهدر نحو ثلاثين وحدة سليمة مقابل كل وحدة معيبة يجري ضبطها.",
  "A water company's sensors are right 95% of the time when they call a pipe section leaking or sound. About 1 section in 400 leaks in a given year. The operations plan assumes crews will find a leak at nearly every flagged section.":
    "أجهزة استشعار شركة مياه مصيبة في 95% من الحالات حين تصف مقطع أنبوب بأنه مسرب أو سليم. ونحو 1 من كل 400 مقطع يسرب خلال سنة معينة. وتفترض خطة التشغيل أن الفرق ستجد تسريبًا عند كل مقطع مشار إليه تقريبًا.",
  "Sound sections outnumber leaking ones 399 to 1, so the five percent of them wrongly called leaking gives about twenty wasted excavations for every genuine leak.":
    "يفوق عدد المقاطع السليمة عدد المسربة بنسبة 399 إلى 1، لذا فإن الخمسة في المئة منها التي توصف خطأً بأنها مسربة تعطي نحو عشرين حفرًا مهدورًا مقابل كل تسريب حقيقي.",
  "A retailer screens applicants with a questionnaire that correctly identifies 90% of people who would steal stock and wrongly flags 10% of those who would not. About 1 applicant in 100 would steal. The hiring team rejects everyone flagged, saying nine in ten of them are thieves.":
    "يفحص أحد تجار التجزئة المتقدمين باستبيان يحدد بشكل صحيح 90% ممن قد يسرقون البضاعة ويشير خطأً إلى 10% ممن لن يسرقوا. ونحو 1 من كل 100 متقدم قد يسرق. ويرفض فريق التوظيف كل من يشار إليه، قائلًا إن تسعة من كل عشرة منهم لصوص.",
  "Honest applicants outnumber the rest 99 to 1, so flagging a tenth of them turns away about eleven blameless people for every one who would have stolen.":
    "يفوق عدد المتقدمين النزيهين عدد غيرهم بنسبة 99 إلى 1، لذا فإن الإشارة إلى عُشرهم ترفض نحو أحد عشر شخصًا بريئًا مقابل كل شخص كان سيسرق.",
  "A company's mail filter is 99% accurate at telling phishing from ordinary mail. About 1 arriving message in 3,000 is phishing. The security lead tells staff that anything the filter quarantines is almost certainly an attack.":
    "مرشح البريد في إحدى الشركات دقيق بنسبة 99% في التمييز بين رسائل التصيد والبريد العادي. ونحو 1 من كل 3,000 رسالة واردة هي تصيد. ويبلغ مسؤول الأمن الموظفين بأن كل ما يعزله المرشح هو هجوم شبه مؤكد.",
  "Ordinary messages outnumber phishing ones about 3,000 to 1, so the one percent of them wrongly quarantined outnumbers the real attacks by roughly thirty to one.":
    "يفوق عدد الرسائل العادية عدد رسائل التصيد بنحو 3,000 إلى 1، لذا فإن الواحد في المئة منها الذي يعزل خطأً يفوق عدد الهجمات الحقيقية بنحو ثلاثين إلى واحد.",
  "An insurer finds that drivers who have fitted a dashboard camera claim for accidents far less often than drivers who have not. Its marketing team announces that fitting a camera makes you a safer driver, and offers a discount to anyone who installs one.":
    "تجد إحدى شركات التأمين أن السائقين الذين ركبوا كاميرا لوحة قيادة يطالبون بتعويضات الحوادث أقل بكثير من السائقين الذين لم يركبوها. ويعلن فريق التسويق لديها أن تركيب كاميرا يجعلك سائقًا أكثر أمانًا، ويعرض خصمًا على كل من يركب واحدة.",
  "Cautious drivers are the ones who buy the cameras in the first place, so the camera marks out a type of driver rather than changing how anyone drives.":
    "السائقون الحذرون هم من يشترون الكاميرات أصلًا، فالكاميرا تميز نوعًا من السائقين أكثر مما تغير طريقة قيادة أحد.",
  "A consultant surveys firms and reports that those with the largest customer support teams receive the most complaints. The write up advises keeping support teams small so that complaints stay down.":
    "يستطلع مستشار آراء شركات ويفيد بأن الشركات صاحبة أكبر فرق دعم العملاء تتلقى أكبر عدد من الشكاوى. ويوصي التقرير بإبقاء فرق الدعم صغيرة كي تظل الشكاوى منخفضة.",
  "Firms staff up because complaints are already arriving, so the arrow runs from complaints to headcount, and larger firms generate more of both anyway.":
    "توظف الشركات المزيد لأن الشكاوى تصل بالفعل، فالسهم يتجه من الشكاوى إلى عدد الموظفين، كما أن الشركات الأكبر تولد قدرًا أكبر من الاثنين على أي حال.",
  "An energy supplier reports that homes with a smart thermostat use a fifth less gas than homes without one. Its advertising says the thermostat cuts your gas use by a fifth.":
    "يفيد أحد موردي الطاقة بأن المنازل المزودة بمنظم حرارة ذكي تستهلك غازًا أقل بمقدار الخمس من المنازل التي لا تملك واحدًا. وتقول إعلاناته إن المنظم يخفض استهلاكك من الغاز بمقدار الخمس.",
  "The households that install one tend to have newer, better insulated homes and an existing interest in trimming bills, so the comparison is between two kinds of household as much as two thermostats.":
    "تميل الأسر التي تركب واحدًا إلى امتلاك منازل أحدث وأفضل عزلًا واهتمام قائم بتقليص الفواتير، فالمقارنة بين نوعين من الأسر بقدر ما هي بين نوعين من المنظمات.",
  "A motoring column notes that stretches of road with fixed speed cameras record more crashes than stretches without them, and argues that the cameras distract drivers into crashing.":
    "يلاحظ عمود عن السيارات أن مقاطع الطرق المزودة بكاميرات سرعة ثابتة تسجل حوادث أكثر من المقاطع الخالية منها، ويرى أن الكاميرات تشتت انتباه السائقين فتوقعهم في الحوادث.",
  "Cameras are installed on stretches that already had a bad crash record, so the crashes came first and chose the camera sites rather than the other way round.":
    "تركب الكاميرات في المقاطع التي كان سجل حوادثها سيئًا بالفعل، فالحوادث جاءت أولًا واختارت مواقع الكاميرات لا العكس.",
  "A gym newsletter reports that members who use the sauna after training take fewer sick days than members who do not, and concludes that ten minutes in the sauna strengthens the immune system.":
    "تفيد نشرة نادٍ رياضي بأن الأعضاء الذين يستخدمون الساونا بعد التمرين يأخذون أيام مرضية أقل من غيرهم، وتخلص إلى أن عشر دقائق في الساونا تقوي جهاز المناعة.",
  "Members with the time and habit to stay on for the sauna are the ones training regularly and in better health already, so sauna use is a marker of that group rather than a cause.":
    "الأعضاء الذين يملكون الوقت والعادة للبقاء من أجل الساونا هم من يتمرنون بانتظام ويتمتعون بصحة أفضل أصلًا، فاستخدام الساونا علامة على تلك الفئة لا سبب.",
  "A trend piece points out that over eleven years national sales of houseplants and of noise cancelling headphones rose almost in step, and suggests the houseplant boom is what pushed people to buy headphones.":
    "يشير مقال عن الاتجاهات إلى أن مبيعات نباتات الزينة المنزلية وسماعات إلغاء الضجيج على المستوى الوطني ارتفعت بالتوازي تقريبًا على مدى أحد عشر عامًا، ويرى أن طفرة نباتات الزينة هي ما دفع الناس إلى شراء السماعات.",
  "Both climbed alongside the same rise in city renting and spending on home comfort, and any two quantities that drift steadily upward will track each other whatever is driving them.":
    "ارتفع الاثنان مع الارتفاع نفسه في الإيجار داخل المدن والإنفاق على راحة المنزل، وأي كميتين تتصاعدان باطراد ستتتبع إحداهما الأخرى مهما كان الدافع.",
  "A plant manager notices that shifts where the radio is playing turn out fewer defective units, and orders music to be played on every shift to bring the defect rate down.":
    "يلاحظ مدير مصنع أن الورديات التي يعمل فيها الراديو تنتج وحدات معيبة أقل، فيأمر بتشغيل الموسيقى في كل وردية لخفض معدل العيوب.",
  "The radio happens to be on during day shifts, which are staffed by the longest serving operators working the easier product runs, so experience and workload are what separate the shifts.":
    "يصادف أن الراديو يعمل خلال الورديات النهارية التي يشغلها أقدم المشغلين خبرة على دفعات الإنتاج الأسهل، فالخبرة وعبء العمل هما ما يفرق بين الورديات.",
  "An investment firm's brochure lists the twenty funds it offers today and reports that the average one has beaten the market over the past ten years. The sales team presents this as proof of the firm's stock-picking skill.":
    "يسرد كتيب إحدى شركات الاستثمار الصناديق العشرين التي تعرضها اليوم، ويفيد بأن متوسط الصندوق تفوق على السوق خلال السنوات العشر الماضية. ويقدم فريق المبيعات ذلك دليلًا على مهارة الشركة في اختيار الأسهم.",
  "The table contains only funds still open today, so the ones that did badly enough to be closed or merged away during the decade have been dropped from the average before it was taken.":
    "لا يضم الجدول سوى الصناديق التي ما زالت مفتوحة اليوم، فالصناديق التي بلغ أداؤها من السوء حدًّا أدى إلى إغلاقها أو دمجها خلال العقد حذفت من المتوسط قبل احتسابه.",
  "A magazine profiles thirty founders whose companies are now worth billions and finds that most left university early and ignored advice to take a safe job. Its careers columnist tells readers that leaving early is the surer path.":
    "تعرض مجلة ملفًا عن ثلاثين مؤسسًا تبلغ قيمة شركاتهم اليوم المليارات، وتجد أن معظمهم تركوا الجامعة مبكرًا وتجاهلوا نصيحة الالتحاق بوظيفة آمنة. ويقول كاتب الوظائف فيها للقراء إن الترك المبكر هو المسار الأضمن.",
  "The thirty were picked for having made it, so the far larger number who left early, failed and were never profiled are missing, and the failure rate of the strategy cannot be read off this group.":
    "اختير الثلاثون لأنهم نجحوا، فالعدد الأكبر بكثير ممن تركوا مبكرًا وفشلوا ولم يكتب عنهم أحد غائبون، ولا يمكن قراءة معدل فشل هذه الاستراتيجية من هذه المجموعة.",
  "A council engineer notes that the stone bridges built in the town two centuries ago all still carry traffic, while several concrete ones from the 1970s have had to be replaced. He writes that the older building methods were plainly more durable.":
    "يلاحظ مهندس في البلدية أن الجسور الحجرية التي بنيت في المدينة قبل قرنين ما زالت جميعها تحمل حركة المرور، بينما استبدلت عدة جسور خرسانية من عقد 1970. ويكتب أن أساليب البناء القديمة كانت أمتن بوضوح.",
  "Only the two hundred year old bridges good enough to last are left to inspect, while the poorly built ones of that era collapsed or were demolished long ago and never enter the comparison.":
    "لم يبق للمعاينة سوى الجسور التي عمرها مئتا عام والتي كانت جيدة بما يكفي للبقاء، أما رديئة البناء من تلك الحقبة فانهارت أو هدمت منذ زمن بعيد ولا تدخل المقارنة أصلًا.",
  "A music magazine interviews twenty bands that reached the charts after years in small venues, and finds that every one of them refused to change their sound when a label asked. The writer concludes that refusing to compromise is what gets a band signed.":
    "تجري مجلة موسيقية مقابلات مع عشرين فرقة وصلت إلى قوائم الأكثر مبيعًا بعد سنوات في القاعات الصغيرة، فتجد أن كل واحدة منها رفضت تغيير أسلوبها حين طلبت منها شركة إنتاج ذلك. ويخلص الكاتب إلى أن رفض التنازل هو ما يجلب للفرقة عقدًا.",
  "The sample was drawn from bands that charted, so the many acts that also refused and were dropped or never signed are absent, leaving the cost of the tactic invisible.":
    "سحبت العينة من فرق وصلت إلى القوائم، فالفرق الكثيرة التي رفضت أيضًا واستغني عنها أو لم توقع لها عقود غائبة، مما يبقي كلفة هذا الأسلوب غير مرئية.",
  "A car magazine surveys owners at an enthusiasts' rally for a model built thirty years ago. Almost all report low running costs and few breakdowns, and the magazine names it the most dependable car of its era.":
    "تستطلع مجلة سيارات آراء المالكين في تجمع للهواة لطراز صنع قبل ثلاثين عامًا. ويفيد جميعهم تقريبًا بانخفاض تكاليف التشغيل وقلة الأعطال، فتسمي المجلة الطراز أكثر سيارات عصره اعتمادية.",
  "Only cars sound enough to still be driven to a rally are in the sample; the ones that rusted or failed were scrapped years ago and their owners are not there to be asked.":
    "لا تضم العينة سوى السيارات السليمة بما يكفي لقيادتها إلى تجمع، أما التي صدئت أو تعطلت فخردت منذ سنوات وأصحابها ليسوا هناك ليسألوا.",
  "A museum label states that the region's ancient potters worked to a standard modern factories struggle to match. The claim rests on the jars in the case, all of them lifted whole from a buried settlement two thousand years later.":
    "تذكر لافتة في متحف أن خزافي المنطقة القدماء عملوا وفق مستوى تجد المصانع الحديثة صعوبة في مجاراته. ويستند الادعاء إلى الجرار الموجودة في الفاترينة، وقد انتشلت كلها سليمة من مستوطنة مدفونة بعد ألفي عام.",
  "The collection is filtered by what stayed intact underground for two millennia, so thin, flawed or badly fired pots are physically absent from the evidence used to judge the average standard.":
    "المجموعة مصفاة بحسب ما ظل سليمًا تحت الأرض ألفي سنة، فالأواني الرقيقة أو المعيبة أو رديئة الحرق غائبة ماديًا عن الأدلة المستخدمة في الحكم على المستوى المتوسط.",
  "A rowing academy studies the athletes in its national squad and finds that nearly all of them trained through serious pain at eighteen. The head coach tells new recruits that pushing through injury is what separates those who make it.":
    "تدرس أكاديمية تجديف رياضيي منتخبها الوطني فتجد أن جميعهم تقريبًا تمرنوا رغم ألم شديد في سن الثامنة عشرة. ويقول المدرب الرئيسي للملتحقين الجدد إن مواصلة التمرين رغم الإصابة هي ما يميز من ينجحون.",
  "The squad consists of those whose bodies withstood it, while recruits whose injuries ended their careers left the sport and are no longer in the group being examined, hiding the risk of the advice.":
    "يتكون المنتخب ممن تحملت أجسادهم ذلك، أما الملتحقون الذين أنهت الإصابات مسيرتهم فتركوا الرياضة ولم يعودوا ضمن المجموعة قيد الفحص، وهو ما يخفي مخاطر هذه النصيحة.",
  "A partial print from a break-in is searched against a national database of six million people and returns one name. The examiner says about 1 person in 500,000 would match it. Counsel tells the jury there is therefore a 1 in 500,000 chance the man was not there.":
    "تجري مطابقة بصمة جزئية من عملية سطو على قاعدة بيانات وطنية تضم ستة ملايين شخص، فتعطي اسمًا واحدًا. ويقول الخبير إن نحو 1 من كل 500,000 شخص يطابقها. ويقول محامي الادعاء لهيئة المحلفين إن احتمال ألا يكون الرجل هناك هو بالتالي 1 من 500,000.",
  "The 1 in 500,000 is how often an unconnected person matches, and searching six million people should turn up about a dozen such matches, so it is not the chance that this man was elsewhere.":
    "الرقم 1 من 500,000 هو معدل مطابقة شخص لا علاقة له بالأمر، ومطابقة ستة ملايين شخص ينبغي أن تسفر عن نحو اثنتي عشرة مطابقة كهذه، فهو ليس احتمال أن يكون هذا الرجل في مكان آخر.",
  "An auditor screens every branch of a retail chain for a rounding pattern that would arise by chance in about 1 honestly kept ledger in 10,000. One of the chain's 30,000 branches shows it, and the report states that the manager is almost certainly falsifying figures.":
    "يفحص مدقق حسابات كل فرع من فروع سلسلة تجزئة بحثًا عن نمط تقريب يظهر بالصدفة في نحو 1 من كل 10,000 دفتر ممسوك بأمانة. ويظهر النمط في أحد فروع السلسلة البالغ عددها 30,000 فرع، وينص التقرير على أن المدير يزور الأرقام شبه المؤكد.",
  "The 1 in 10,000 describes how often honest books show the pattern, not how often books showing it are dishonest, and screening 30,000 branches should produce about three honest ones like it.":
    "الرقم 1 من 10,000 يصف معدل ظهور النمط في الدفاتر الأمينة، لا معدل كون الدفاتر التي تظهره غير أمينة، وفحص 30,000 فرع ينبغي أن ينتج نحو ثلاثة فروع أمينة مثله.",
  "A weekly prize draw has been won twice by the same person. An organiser calculates that the odds of a given player winning twice are about one in a million, and concludes the draw was rigged. The draw has run for twenty years with over three million regular players.":
    "فاز الشخص نفسه مرتين في سحب أسبوعي على جائزة. ويحسب أحد المنظمين أن احتمال فوز لاعب بعينه مرتين نحو واحد في المليون، فيخلص إلى أن السحب مزور. وقد أجري السحب على مدى عشرين عامًا بمشاركة أكثر من ثلاثة ملايين لاعب منتظم.",
  "One in a million applies to one player named in advance, whereas the question asked afterwards is whether anyone at all among three million regular players would win twice, which is close to expected.":
    "واحد في المليون ينطبق على لاعب واحد يسمى مسبقًا، أما السؤال المطروح بعد وقوع الأمر فهو ما إذا كان أي شخص على الإطلاق بين ثلاثة ملايين لاعب منتظم سيفوز مرتين، وهو أمر قريب من المتوقع.",
  "An internal auditor at a company of 700 staff reports that two employees who sign off each other's expense claims were born on the same day of the year. He puts the chance of that at 1 in 365 and states they are almost certainly working together.":
    "يفيد مدقق داخلي في شركة تضم 700 موظف بأن موظفَين يصادق كل منهما على مطالبات نفقات الآخر ولدا في اليوم نفسه من السنة. ويقدر احتمال ذلك بـ 1 من 365 وينص على أنهما يعملان معًا شبه المؤكد.",
  "The 1 in 365 fits one pair chosen in advance, but he combed hundreds of pairs for any oddity, and how often innocent pairs share a birthday is not the probability of innocence given a shared birthday.":
    "الرقم 1 من 365 يناسب زوجًا واحدًا يختار مسبقًا، لكنه مشط مئات الأزواج بحثًا عن أي غرابة، ومعدل تشارك الأزواج البريئة تاريخ ميلاد ليس احتمال البراءة عند وجود تاريخ ميلاد مشترك.",
  "Four children on one street develop the same rare illness within a year. A campaigner calculates that this would happen by chance in about one street in a million, and tells a public meeting there is therefore a one in a million chance the nearby plant is blameless.":
    "أصيب أربعة أطفال في شارع واحد بالمرض النادر نفسه خلال عام. ويحسب أحد الناشطين أن هذا يحدث بالصدفة في نحو شارع واحد من كل مليون، فيقول في اجتماع عام إن احتمال براءة المصنع القريب هو بالتالي واحد في المليون.",
  "The figure is the chance of such a cluster on a street picked in advance with nothing causing it, and with millions of streets in the country a few clusters are expected somewhere regardless of the plant.":
    "الرقم هو احتمال ظهور تجمع كهذا في شارع يختار مسبقًا دون وجود مسبب، ومع وجود ملايين الشوارع في البلد فمن المتوقع ظهور بضعة تجمعات في مكان ما بصرف النظر عن المصنع.",
  "An anonymous threatening letter was printed in a distinctive typeface installed on roughly 1 printer in 20,000. A suspect's office printer carries it. The investigating officer writes that the odds against anyone else having produced the letter are 20,000 to 1.":
    "طبعت رسالة تهديد مجهولة بخط طباعي مميز مثبت على نحو 1 من كل 20,000 طابعة. وتحمل طابعة مكتب أحد المشتبه بهم هذا الخط. ويكتب ضابط التحقيق أن احتمال أن يكون شخص آخر قد أنتج الرسالة هي 20,000 مقابل 1.",
  "With millions of printers in the country, several hundred carry the same typeface, so the figure measures how rare the feature is rather than how likely this owner is to have written the letter.":
    "مع وجود ملايين الطابعات في البلد، تحمل عدة مئات منها الخط نفسه، فالرقم يقيس ندرة هذه الخاصية لا احتمال أن يكون هذا المالك قد كتب الرسالة.",
  "A national programme screens about 60,000 samples a year. One athlete's sample shows a marker found in roughly 1 in 10,000 samples from clean competitors, and the panel chair states there is a 1 in 10,000 chance the athlete competed clean.":
    "يفحص برنامج وطني نحو 60,000 عينة سنويًا. وتظهر عينة أحد الرياضيين علامة توجد في نحو 1 من كل 10,000 عينة من متنافسين نظيفين، وينص رئيس اللجنة على أن احتمال أن يكون الرياضي قد نافس نظيفًا هو 1 من 10,000.",
  "1 in 10,000 is how often clean samples show the marker, so about six clean athletes a year would show it; turning that into the chance of being clean also requires knowing how few competitors dope.":
    "الرقم 1 من 10,000 هو معدل ظهور العلامة في العينات النظيفة، أي أن نحو ستة رياضيين نظيفين سنويًا ستظهر لديهم؛ وتحويل ذلك إلى احتمال النظافة يتطلب أيضًا معرفة مدى قلة المتنافسين الذين يتعاطون المنشطات.",
  "A league moves its four lowest-ranked clubs down into the second tier. A ratings service recalculates the tier averages and finds the average club rating is now higher in both tiers than before the reshuffle. The commissioner calls it a sign that standards are rising everywhere.":
    "ينزل دوري أربعة أندية هي الأدنى ترتيبًا إلى الدرجة الثانية. وتعيد جهة تصنيف حساب متوسطات الدرجتين فتجد أن متوسط تصنيف الأندية صار أعلى في الدرجتين معًا مما كان قبل إعادة التوزيع. ويصف رئيس الدوري ذلك بأنه دليل على ارتفاع المستوى في كل مكان.",
  "Those four clubs rated below the top tier's average and above the second tier's, so taking them out lifts one figure and adding them lifts the other, while no club plays any better than before.":
    "كان تصنيف تلك الأندية الأربعة أدنى من متوسط الدرجة الأولى وأعلى من متوسط الدرجة الثانية، فإخراجها يرفع رقمًا وإضافتها يرفع الآخر، دون أن يلعب أي نادٍ أفضل مما كان.",
  "An insurer moves the safest quarter of its high-risk motor policies into its standard pool. The next report shows the average claim cost has risen in the high-risk pool and in the standard pool, and the underwriting director warns that both books are deteriorating.":
    "تنقل شركة تأمين الربع الأكثر أمانًا من وثائق سياراتها عالية الخطورة إلى مجموعتها القياسية. ويظهر التقرير التالي أن متوسط تكلفة المطالبة ارتفع في المجموعة عالية الخطورة وفي المجموعة القياسية، ويحذر مدير الاكتتاب من تدهور المحفظتين.",
  "The transferred policies cost less than the high-risk average and more than the standard average, so removing them raises one mean and adding them raises the other, with no driver's risk changed.":
    "كانت الوثائق المنقولة أقل تكلفة من متوسط المجموعة عالية الخطورة وأعلى من متوسط المجموعة القياسية، فإخراجها يرفع أحد المتوسطين وإضافتها ترفع الآخر، دون تغير خطورة أي سائق.",
  "An armed service brings in a medical screen that catches minor problems the old one missed, and moves the personnel it flags from fully deployable to restricted duties. Average fitness scores then come out higher in both categories, and a spokesman credits the new training programme.":
    "تعتمد إحدى القوات المسلحة فحصًا طبيًا يكشف مشكلات طفيفة كان الفحص القديم يغفلها، وتنقل الأفراد الذين يشير إليهم من فئة الصالحين للانتشار الكامل إلى فئة المهام المقيدة. ثم تخرج متوسطات درجات اللياقة أعلى في الفئتين، وينسب متحدث الفضل إلى برنامج التدريب الجديد.",
  "Those moved were the least fit of the deployable group and the fittest of the restricted group, so both averages rise on the reclassification alone, without anyone's fitness changing.":
    "كان المنقولون هم الأقل لياقة في مجموعة الانتشار والأعلى لياقة في مجموعة المهام المقيدة، فيرتفع المتوسطان بمجرد إعادة التصنيف دون تغير لياقة أحد.",
  "A bank tightens the test that puts a loan on its watch list, so a batch of loans previously counted as performing moves across. The next figures show a higher average credit score in the performing book and in the watch list, and the risk committee reports improvement on both.":
    "يشدد بنك الاختبار الذي يضع القرض على قائمة المراقبة، فتنتقل دفعة من القروض كانت تحسب سابقًا ضمن المنتظمة. وتظهر الأرقام التالية متوسط تصنيف ائتماني أعلى في محفظة القروض المنتظمة وفي قائمة المراقبة، وتفيد لجنة المخاطر بتحسن الاثنتين.",
  "The moved loans were the weakest of the performing book and the strongest of the watch list, so both averages rise the moment they change column, with no borrower's position altered.":
    "كانت القروض المنقولة هي الأضعف في المحفظة المنتظمة والأقوى في قائمة المراقبة، فيرتفع المتوسطان لحظة تغيير الخانة دون أن يتغير وضع أي مقترض.",
  "A depot fits a vibration sensor that picks up early wear, and engines it flags are shifted from the serviceable list to the overhaul list. The next report shows average hours between faults up on both lists, and the fleet manager credits a change of lubricant.":
    "يركب مستودع حساس اهتزاز يلتقط التآكل المبكر، وتنقل المحركات التي يشير إليها من قائمة الصالحة للخدمة إلى قائمة العمرة. ويظهر التقرير التالي ارتفاع متوسط ساعات التشغيل بين الأعطال في القائمتين، وينسب مدير الأسطول الفضل إلى تغيير زيت التشحيم.",
  "The flagged engines were the worst on the serviceable list and the best on the overhaul list, so removing them lifts one average and adding them lifts the other, with no engine actually wearing less.":
    "كانت المحركات المشار إليها الأسوأ في قائمة الصالحة للخدمة والأفضل في قائمة العمرة، فإخراجها يرفع أحد المتوسطين وإضافتها ترفع الآخر، دون أن يتآكل أي محرك فعليًا بقدر أقل.",
  "A sales director has a senior team averaging 50 sales a month and a junior team averaging 30. She moves two representatives who each average 40 from the senior team to the junior team. The next report shows both team averages have gone up, and she credits the reshuffle.":
    "لدى مديرة مبيعات فريق أول يبيع 50 وحدة شهريًا في المتوسط وفريق مبتدئ يبيع 30. وتنقل مندوبَين يبيع كل منهما 40 في المتوسط من الفريق الأول إلى الفريق المبتدئ. ويظهر التقرير التالي ارتفاع متوسطي الفريقين، فتنسب الفضل إلى إعادة التوزيع.",
  "The two sell below the senior team's average and above the junior team's, so the senior mean climbs above 50 and the junior mean above 30 while nobody sells a single unit more.":
    "يبيع الاثنان أقل من متوسط الفريق الأول وأكثر من متوسط الفريق المبتدئ، فيصعد متوسط الأول فوق 50 ومتوسط المبتدئ فوق 30 دون أن يبيع أحد وحدة واحدة إضافية.",
  "An exporter grades boxes as premium, averaging 90 points, or standard, averaging 70. It changes the cut-off so that boxes scoring 82, until now premium, count as standard. The next quality report shows the average score up in both grades, and the manager says the growers have improved.":
    "يصنف مصدر الصناديق إلى ممتازة بمتوسط 90 نقطة أو عادية بمتوسط 70. ثم يغير حد الفصل بحيث تحسب الصناديق الحاصلة على 82، وكانت ممتازة حتى الآن، ضمن العادية. ويظهر تقرير الجودة التالي ارتفاع متوسط النقاط في الدرجتين، ويقول المدير إن المزارعين تحسنوا.",
  "Boxes at 82 sat below the premium average of 90 and above the standard average of 70, so shifting them lifts both figures without a single box of fruit being any better.":
    "كانت الصناديق عند 82 أدنى من متوسط الممتازة البالغ 90 وأعلى من متوسط العادية البالغ 70، فنقلها يرفع الرقمين دون أن يتحسن صندوق فاكهة واحد.",
  "A conservatoire moves its five weakest cellists out of the advanced class and into the intermediate class. At the end of term the average examination mark is higher in the advanced class and higher in the intermediate class, and the principal praises the new teaching plan.":
    "ينقل معهد موسيقي أضعف خمسة عازفي تشيلو لديه من الصف المتقدم إلى الصف المتوسط. وفي نهاية الفصل يكون متوسط درجة الامتحان أعلى في الصف المتقدم وأعلى في الصف المتوسط، ويشيد العميد بالخطة التدريسية الجديدة.",
  "Those five scored below the advanced class average and above the intermediate class average, so taking them out raises one mean and adding them raises the other, whatever any student's playing does.":
    "حصل هؤلاء الخمسة على درجات أدنى من متوسط الصف المتقدم وأعلى من متوسط الصف المتوسط، فإخراجهم يرفع أحد المتوسطين وإضافتهم ترفع الآخر، مهما كان أداء أي طالب على آلته.",
  "A haulage firm fits vibration sensors that flag a failing gearbox about eight months before a driver would notice the noise. The log now shows an average of fourteen months from first fault report to breakdown, up from six. The firm's newsletter says the sensors are making gearboxes last far longer.":
    "تركب شركة نقل بري حساسات اهتزاز تشير إلى صندوق تروس متهالك قبل نحو ثمانية أشهر من ملاحظة السائق للصوت. ويظهر السجل الآن متوسطًا قدره أربعة عشر شهرًا من أول بلاغ عن العطل حتى التوقف، مقارنة بستة أشهر من قبل. وتقول نشرة الشركة إن الحساسات تطيل عمر صناديق التروس كثيرًا.",
  "The breakdowns still happen when they always did; only the moment the fault entered the log moved earlier, so the measured gap from report to breakdown grew by exactly the warning the sensors bought.":
    "ما زالت الأعطال تقع في موعدها المعتاد؛ اللحظة الوحيدة التي تقدمت هي دخول العطل إلى السجل، فاتسعت الفجوة المقاسة بين البلاغ والتوقف بمقدار الإنذار الذي وفرته الحساسات بالضبط.",
  "A roads authority begins ultrasound surveys that reveal cracking in girders years before it becomes visible. Girders are still replaced at the same age as before, yet the average time from a crack being recorded to replacement has risen from four years to nine. The authority reports longer girder life.":
    "تبدأ هيئة طرق مسوحًا بالموجات فوق الصوتية تكشف تشققات في عوارض الجسور قبل سنوات من ظهورها للعين. وما زالت العوارض تستبدل عند العمر نفسه كما في السابق، ومع ذلك ارتفع متوسط المدة من تسجيل الشق حتى الاستبدال من أربع سنوات إلى تسع. وتفيد الهيئة بأن عمر العوارض صار أطول.",
  "Replacement happens at the same age it always did, so nothing about the girder changed. Recording the crack earlier simply lengthened the interval being measured.":
    "يجري الاستبدال عند العمر نفسه كما كان دائمًا، فلم يتغير شيء في العارضة. تسجيل الشق مبكرًا أطال المدة المقاسة ليس إلا.",
  "A data centre switches on drive health alerts that fire well before a disk starts losing sectors. Disks are still retired at the same age, but the mean time from first alert to retirement has tripled. The operations page claims the alerts are extending disk life threefold.":
    "يشغل مركز بيانات تنبيهات لصحة الأقراص تنطلق قبل وقت طويل من بدء القرص في فقد قطاعات. وما زالت الأقراص تسحب من الخدمة عند العمر نفسه، لكن متوسط المدة من أول تنبيه حتى السحب تضاعف ثلاث مرات. وتزعم صفحة التشغيل أن التنبيهات تطيل عمر الأقراص ثلاثة أضعاف.",
  "The retirement date did not move. Starting the count at an earlier alert stretches the measured interval without a single disk lasting longer.":
    "لم يتحرك موعد السحب من الخدمة. بدء العد من تنبيه أبكر يمدد المدة المقاسة دون أن يعمر قرص واحد أطول.",
  "A phone maker adds a diagnostic that warns of battery decline far earlier than the old check did. Support records show the average time from first warning to replacement has doubled, and batteries are still replaced at the same age. Marketing says the diagnostic doubles battery life.":
    "تضيف شركة هواتف أداة تشخيص تحذر من تدهور البطارية أبكر بكثير من الفحص القديم. وتظهر سجلات الدعم أن متوسط المدة من أول تحذير حتى الاستبدال تضاعف، وما زالت البطاريات تستبدل عند العمر نفسه. ويقول التسويق إن أداة التشخيص تضاعف عمر البطارية.",
  "Batteries reach replacement at the same age as before; only the warning moved forward, so the interval from warning to replacement grew by the time gained in detecting decline.":
    "تصل البطاريات إلى الاستبدال عند العمر نفسه كما في السابق؛ التحذير وحده هو ما تقدم، فنمت المدة من التحذير إلى الاستبدال بمقدار الوقت المكتسب في كشف التدهور.",
  "A grower adopts a leaf assay that identifies infected trees months before wilting appears. Records now show infected trees standing fifteen months after detection rather than five, and trees are still felled at the same age. The assay supplier's leaflet claims it keeps infected trees productive three times as long.":
    "يعتمد مزارع فحصًا للأوراق يحدد الأشجار المصابة قبل شهور من ظهور الذبول. وتظهر السجلات الآن بقاء الأشجار المصابة قائمة خمسة عشر شهرًا بعد الكشف بدل خمسة أشهر، وما زالت الأشجار تقطع عند العمر نفسه. ويزعم كتيب مورد الفحص أنه يبقي الأشجار المصابة منتجة ثلاثة أضعاف المدة.",
  "Felling happens at the same age, so no tree gained a day. The assay only started the clock earlier, which inflates the interval from detection to felling.":
    "يجري القطع عند العمر نفسه، فلم تكسب أي شجرة يومًا واحدًا. الفحص بدأ العد أبكر فحسب، وهو ما يضخم المدة من الكشف إلى القطع.",
  "A water utility installs acoustic monitoring that finds leaks long before they surface. Pipes are still dug up only when a leak reaches the road, yet the average time from logging a leak to the dig has risen from two months to eleven. The utility reports that leaking pipes now last far longer.":
    "تركب شركة مياه مراقبة صوتية تجد التسريبات قبل وقت طويل من ظهورها على السطح. وما زالت الأنابيب لا تحفر إلا حين يصل التسريب إلى الطريق، ومع ذلك ارتفع متوسط المدة من تسجيل التسريب حتى الحفر من شهرين إلى أحد عشر شهرًا. وتفيد الشركة بأن الأنابيب المسربة صارت تعمر أطول بكثير.",
  "The dig is still triggered by the same event at the same moment. Logging the leak nine months sooner adds nine months to the measured interval and nothing to the pipe.":
    "ما زال الحفر يبدأ بالحدث نفسه في اللحظة نفسها. تسجيل التسريب قبل تسعة أشهر يضيف تسعة أشهر إلى المدة المقاسة ولا يضيف شيئًا إلى الأنبوب.",
  "A memory service introduces a test that identifies a degenerative condition several years earlier than before. Patients still move into full time care at about the same age, but the average interval from diagnosis to that move has risen from four years to seven. A leaflet says the test delays dependence.":
    "تدخل عيادة للذاكرة اختبارًا يحدد حالة تنكسية قبل سنوات عدة مما كان عليه الحال. وما زال المرضى ينتقلون إلى الرعاية بدوام كامل عند العمر نفسه تقريبًا، لكن متوسط المدة من التشخيص حتى ذلك الانتقال ارتفع من أربع سنوات إلى سبع. ويقول كتيب إن الاختبار يؤخر الاعتماد على الغير.",
  "The move into full time care happens at the same age as before, so nothing was delayed. Diagnosing sooner simply lengthened the stretch of time counted after diagnosis.":
    "يقع الانتقال إلى الرعاية بدوام كامل عند العمر نفسه كما في السابق، فلم يتأخر شيء. التشخيص المبكر أطال ببساطة المدة المحسوبة بعد التشخيص.",
  "Before a new imaging protocol, a clinic's patients were identified at an average age of 62 and died at 66. Since the protocol, they are identified at 59 and still die at 66. The annual report states that average survival after diagnosis has risen from four years to seven.":
    "قبل اعتماد بروتوكول تصوير جديد، كان مرضى إحدى العيادات يشخصون عند متوسط عمر 62 ويتوفون عند 66. ومنذ اعتماد البروتوكول يشخصون عند 59 وما زالوا يتوفون عند 66. وينص التقرير السنوي على أن متوسط البقيا بعد التشخيص ارتفع من أربع سنوات إلى سبع.",
  "The age at death is unchanged, so no patient gained time. Moving the moment of identification three years earlier adds three years to every measured interval.":
    "العمر عند الوفاة لم يتغير، فلم يكسب أي مريض وقتًا. تقديم لحظة التشخيص ثلاث سنوات يضيف ثلاث سنوات إلى كل مدة مقاسة.",
  "A detector is checked against obvious photocopied notes and crisp notes straight from the mint, and separates them almost perfectly. The maker advertises 99% accuracy. A bank buys it to sort well made counterfeits from worn, creased notes taken over the counter, and expects the same figure.":
    "يختبر كاشف على أوراق نقدية مصورة بوضوح وأخرى نظيفة خارجة توًا من دار السك، فيفصل بينها بشكل شبه تام. ويعلن الصانع دقة 99%. ويشتريه بنك لفرز التزييف المتقن من الأوراق البالية المجعدة الواردة من الشباك، ويتوقع الرقم نفسه.",
  "The advertised figure came from the crudest fakes set against the cleanest genuine notes. Where the fakes are skilled and the genuine notes are battered, the two groups overlap on exactly the features the detector reads.":
    "جاء الرقم المعلن من أفظّ عمليات التزييف مقابل أنظف الأوراق الأصلية. وحين يكون التزييف متقنًا والأوراق الأصلية بالية، تتداخل المجموعتان في الخصائص ذاتها التي يقرأها الكاشف.",
  "A filter is benchmarked on bulk advertising full of misspellings and on a folder of ordinary personal mail, and scores 99.6%. A firm deploys it against carefully written impersonation attempts and against unusual but genuine messages from new suppliers, quoting the same score to its board.":
    "يقاس أداء مرشح على إعلانات جماعية مليئة بالأخطاء الإملائية وعلى ملف من البريد الشخصي العادي، فيحرز 99.6%. وتنشره شركة في مواجهة محاولات انتحال مكتوبة بعناية ورسائل غير معتادة لكنها أصلية من موردين جدد، وتذكر الدرجة نفسها لمجلس إدارتها.",
  "The benchmark asked the filter to separate the most obvious junk from the most obviously legitimate mail. Polished impersonations and odd but genuine supplier mail sit in the middle, where the filter was never measured.":
    "طلب القياس من المرشح أن يفصل أوضح البريد التافه عن أوضح البريد المشروع. أما الانتحالات المصقولة وبريد الموردين الغريب لكن الأصلي فيقعان في المنتصف حيث لم يقس المرشح قط.",
  "A placement test was validated on absolute beginners and on near native speakers, and told them apart almost every time. A school now uses it to sort intermediate learners into three levels and cites the original accuracy figure in its prospectus.":
    "جرى التحقق من اختبار تحديد المستوى على مبتدئين تمامًا وعلى ناطقين شبه أصليين، فميز بينهم في كل مرة تقريبًا. وتستخدمه مدرسة الآن لفرز المتعلمين المتوسطين إلى ثلاثة مستويات وتذكر رقم الدقة الأصلي في كتيبها.",
  "The test was only ever asked to separate the two ends of the range, which almost any crude measure manages. Intermediate learners sit in the middle, where it was never shown to discriminate at all.":
    "لم يطلب من الاختبار قط سوى الفصل بين طرفي المدى، وهو ما يفلح فيه أي مقياس فج تقريبًا. أما المتعلمون المتوسطون فيقعون في المنتصف حيث لم يثبت له أي قدرة على التمييز.",
  "An inspection system was tuned on deliberately ruined test welds and on flawless reference welds, and caught 97% of the bad ones. On the production line, where flaws are hairline and sound welds carry cosmetic spatter, it catches far fewer. The plant keeps quoting 97% to customers.":
    "ضبط نظام فحص على لحامات اختبارية أفسدت عمدًا وعلى لحامات مرجعية خالية من العيوب، فالتقط 97% من الرديئة. وعلى خط الإنتاج، حيث تكون العيوب شعرية وتحمل اللحامات السليمة رذاذًا شكليًا، يلتقط أقل من ذلك بكثير. وما زال المصنع يذكر 97% لعملائه.",
  "The 97% was measured on wrecked welds against pristine ones, a comparison with a wide gap. Real line output has faint flaws and untidy good welds, so the same thresholds separate much less.":
    "قيست نسبة 97% على لحامات محطمة مقابل لحامات لا تشوبها شائبة، وهي مقارنة بفارق واسع. أما إنتاج الخط الحقيقي فعيوبه باهتة ولحاماته السليمة غير مرتبة، فتفصل العتبات نفسها بقدر أقل بكثير.",
  "A tool that claims to tell machine written text from human writing was checked on raw machine output and on handwritten classroom essays, scoring 98%. A college applies it to lightly edited submissions and to careful work by students writing in a second language, and treats every flag as proof.":
    "اختبرت أداة تزعم التمييز بين النص المكتوب آليًا والكتابة البشرية على مخرجات آلية خام وعلى مقالات صفية مكتوبة بخط اليد، فأحرزت 98%. وتطبقها كلية على أعمال حررت تحريرًا خفيفًا وعلى أعمال متقنة لطلاب يكتبون بلغة ثانية، وتعامل كل إشارة على أنها دليل.",
  "The 98% came from the most obvious machine output set against the most obviously human writing. Edited text and unusually careful second language prose sit between those extremes, where the tool's accuracy was never established.":
    "جاءت نسبة 98% من أوضح المخرجات الآلية مقابل أوضح الكتابة البشرية. أما النص المحرر والنثر المتقن على غير المعتاد بلغة ثانية فيقعان بين هذين الطرفين حيث لم تثبت دقة الأداة قط.",
  "A moisture meter was calibrated against soaking wet blocks and oven dried blocks, and told them apart every time. A surveyor now uses it on borderline walls where mild condensation and genuine structural damp look much alike, and reports the manufacturer's accuracy figure in his findings.":
    "جرت معايرة مقياس رطوبة على كتل مشبعة بالماء وأخرى مجففة في فرن، فميز بينها في كل مرة. ويستخدمه مساح الآن على جدران حدية يتشابه فيها التكاثف الخفيف والرطوبة الإنشائية الحقيقية كثيرًا، ويورد رقم دقة الصانع في تقريره.",
  "Calibration contrasted two extremes that any meter could tell apart. The walls the surveyor actually meets are neither soaked nor bone dry, so the readings that mattered in calibration barely differ here.":
    "قابلت المعايرة طرفين متباعدين يستطيع أي مقياس التمييز بينهما. أما الجدران التي يصادفها المساح فعليًا فليست مشبعة ولا شديدة الجفاف، فالقراءات التي كانت حاسمة في المعايرة تكاد لا تختلف هنا.",
  "An image classifier for a skin condition was built from textbook photographs of advanced lesions and clear photographs of normal skin, reporting 96% accuracy. A community clinic runs it on early lesions and on patients with eczema and insect bites, and quotes the same 96% to them.":
    "بني مصنف صور لحالة جلدية من صور كتب دراسية لآفات متقدمة ومن صور واضحة لجلد طبيعي، وأعلن دقة 96%. وتشغله عيادة مجتمعية على آفات مبكرة وعلى مرضى لديهم إكزيما ولدغات حشرات، وتذكر لهم نسبة 96% نفسها.",
  "The reported accuracy came from advanced textbook lesions against plainly normal skin. In the clinic the lesions are early and the comparison skin carries rashes and bites that mimic them, so the separation the figure rested on is gone.":
    "جاءت الدقة المعلنة من آفات متقدمة في كتب دراسية مقابل جلد طبيعي بيّن. أما في العيادة فالآفات مبكرة وجلد المقارنة يحمل طفحًا ولدغات تحاكيها، فالفصل الذي قام عليه الرقم لم يعد قائمًا.",
  "A sideline test for head injury was validated on players with unmistakable symptoms and on rested players at the start of the season, sorting them almost perfectly. A club now applies it late in matches, to subtle knocks in tired and dehydrated players, quoting the same numbers.":
    "جرى التحقق من اختبار جانبي لإصابات الرأس على لاعبين تظهر عليهم أعراض لا لبس فيها وعلى لاعبين مرتاحين في بداية الموسم، ففرز بينهم بشكل شبه تام. ويطبقه نادٍ الآن في أواخر المباريات على ضربات خفيفة لدى لاعبين متعبين ومصابين بالجفاف، ويذكر الأرقام نفسها.",
  "Validation contrasted obvious injury with fresh, unaffected controls. Late in a match the injuries are subtle and the uninjured are fatigued, so both groups score alike on the very things the test measures.":
    "قابل التحقق إصابة واضحة بمجموعة ضابطة مرتاحة وسليمة. أما في أواخر المباراة فالإصابات دقيقة وغير المصابين منهكون، فتتشابه درجات المجموعتين في الأمور نفسها التي يقيسها الاختبار.",
  "A firm interviews any applicant who scores highly on either the coding test or the communication exercise. Among the applicants who reach interview, the two scores move in opposite directions. The hiring manager concludes that people who are good with code tend to be poor with people.":
    "تقابل شركة أي متقدم يحرز درجة عالية في اختبار البرمجة أو في تمرين التواصل. وبين المتقدمين الذين يبلغون المقابلة، تتحرك الدرجتان في اتجاهين متعاكسين. ويخلص مدير التوظيف إلى أن البارعين في البرمجة يميلون إلى الضعف في التعامل مع الناس.",
  "Reaching interview required a high score on one test or the other, so a weak communicator is there only because the coding score carried them, which produces the opposite pattern inside the interview pool while saying nothing about applicants in general.":
    "تطلب بلوغ المقابلة درجة عالية في أحد الاختبارين، فالمتواصل الضعيف موجود هناك فقط لأن درجة البرمجة حملته، وهو ما ينتج النمط المعاكس داخل مجموعة المقابلات دون أن يقول شيئًا عن المتقدمين عمومًا.",
  "A conservatory offers places to musicians who are outstanding in either technical playing or expressive interpretation. Among those who take up a place, the strongest technicians consistently receive the lowest expression marks. A tutor writes that drilling technique appears to blunt musicality.":
    "يمنح معهد موسيقي مقاعد للموسيقيين المتميزين إما في الأداء التقني أو في التفسير التعبيري. وبين من يلتحقون بالمقاعد، يحصل أقوى العازفين تقنيًا باستمرار على أدنى درجات التعبير. ويكتب أحد المدرسين أن التدريب المكثف على التقنية يبدو أنه يبلد الحس الموسيقي.",
  "A place required excellence on at least one of the two measures, so a student who is flat on expression must have been outstanding technically to get in, and the tradeoff exists only among those offered places.":
    "تطلب المقعد تفوقًا في واحد على الأقل من المقياسين، فالطالب الضعيف في التعبير لا بد أنه كان متميزًا تقنيًا كي يقبل، والمفاضلة قائمة فقط بين من عرضت عليهم مقاعد.",
  "A repair shop sees a device only when the battery has failed or the screen has cracked. Its records show that devices with dead batteries have unusually intact screens. The owner writes a blog post arguing that battery wear somehow spares the glass.":
    "لا يصل جهاز إلى ورشة تصليح إلا حين تتعطل البطارية أو تتشقق الشاشة. وتظهر سجلاتها أن الأجهزة ذات البطاريات الميتة شاشاتها سليمة على غير المعتاد. ويكتب المالك تدوينة يرى فيها أن تآكل البطارية يقي الزجاج بطريقة ما.",
  "A device reaches the shop if at least one of the two faults happened, so a battery failure gets a device in without any screen damage, leaving cracked screens rarer among battery cases than among devices as a whole.":
    "يصل الجهاز إلى الورشة إذا وقع أحد العطلين على الأقل، فعطل البطارية يدخل الجهاز دون أي ضرر في الشاشة، مما يجعل الشاشات المتشققة أندر بين حالات البطارية منها بين الأجهزة ككل.",
  "A city guide lists a restaurant only if it is unusually cheap or unusually good. A blogger works through the listings and finds that the pricier ones nearly always have the better food. He tells readers that in this city you really do get what you pay for.":
    "لا يدرج دليل مدينة مطعمًا إلا إذا كان رخيصًا على غير المعتاد أو جيدًا على غير المعتاد. ويطالع مدون القوائم فيجد أن الأغلى ثمنًا يقدم الطعام الأفضل دائمًا تقريبًا. ويقول للقراء إنك في هذه المدينة تحصل فعلًا على ما تدفع مقابله.",
  "A restaurant earns a listing by being cheap or by being good, so any expensive one in the guide is there because the food is good, which links price to quality inside the guide even if the city's restaurants show no such link.":
    "ينال المطعم مكانًا في الدليل بكونه رخيصًا أو بكونه جيدًا، فأي مطعم غالٍ في الدليل موجود لأن طعامه جيد، وهو ما يربط السعر بالجودة داخل الدليل ولو لم تظهر مطاعم المدينة أي رابط كهذا.",
  "A national squad picks players who are either exceptionally quick or exceptionally good at reading the game. Within the squad, the fastest players score lowest on the tactical assessment. The coaching staff decide that sprint work must be dulling game intelligence.":
    "ينتقي منتخب وطني لاعبين إما سريعين على نحو استثنائي أو بارعين على نحو استثنائي في قراءة اللعب. وداخل المنتخب، يحصل أسرع اللاعبين على أدنى الدرجات في التقييم التكتيكي. ويقرر الجهاز الفني أن تدريبات السرعة لا بد أنها تبلد الذكاء التكتيكي.",
  "A place needed one outstanding quality or the other, so a very quick player did not also need tactical strength to be picked, and the inverse pattern appears only among the players who were picked.":
    "تطلب المقعد صفة متميزة واحدة أو الأخرى، فاللاعب البالغ السرعة لم يكن بحاجة أيضًا إلى قوة تكتيكية كي يختار، والنمط العكسي يظهر فقط بين اللاعبين الذين اختيروا.",
  "A funding panel awards money to proposals that have either a strong past record or a genuinely novel idea. Reviewing the funded projects five years later, an analyst finds the most novel ones came from the weakest records, and reports that experience seems to kill originality.":
    "تمنح لجنة تمويل المال للمقترحات التي لها إما سجل سابق قوي أو فكرة مبتكرة فعلًا. وبمراجعة المشاريع الممولة بعد خمس سنوات، يجد محلل أن أكثرها ابتكارًا جاء من أضعف السجلات، فيفيد بأن الخبرة تبدو قاتلة للأصالة.",
  "Funding required strength on one criterion or the other, so a novel proposal did not also need a strong record to win money, and the tradeoff holds among funded projects rather than among everyone who applied.":
    "تطلب التمويل قوة في أحد المعيارين أو الآخر، فالمقترح المبتكر لم يكن بحاجة أيضًا إلى سجل قوي كي يفوز بالمال، والمفاضلة قائمة بين المشاريع الممولة لا بين كل من تقدم.",
  "An insurer studies its motor claim file, which holds a case only when the vehicle was badly damaged or someone was hurt. In the file, badly damaged vehicles are less often linked to injuries. A memo suggests that heavier crash damage somehow protects the occupants.":
    "تدرس شركة تأمين ملف مطالبات السيارات لديها، وهو لا يضم حالة إلا حين تتضرر المركبة بشدة أو يصاب شخص. وفي الملف، ترتبط المركبات الشديدة التضرر بالإصابات بمعدل أقل. وتشير مذكرة داخلية إلى أن أضرار التصادم الأشد تحمي الركاب بطريقة ما.",
  "A crash enters the file if it caused serious damage or an injury, so heavily damaged vehicles are recorded even with nobody hurt, while lightly damaged ones appear only when someone was injured.":
    "يدخل التصادم الملف إذا سبب ضررًا جسيمًا أو إصابة، فالمركبات الشديدة التضرر تسجل حتى دون إصابة أحد، بينما لا تظهر خفيفة التضرر إلا حين يصاب شخص.",
  "A conference accepts a talk when the research is strikingly new or the speaker is a superb presenter. An attendee notices that the most original talks are the worst delivered, and posts afterwards that the polished speakers must be doing the shallowest work.":
    "يقبل مؤتمر مداخلة حين يكون البحث جديدًا على نحو لافت أو يكون المتحدث بارعًا في العرض. ويلاحظ أحد الحضور أن أكثر المداخلات أصالة هي الأسوأ إلقاءً، فينشر بعدها أن المتحدثين المصقولين لا بد أنهم يقدمون أضحل الأعمال.",
  "Acceptance needed novelty or delivery, so an original talk got on the programme without a polished speaker, and the tradeoff exists among accepted talks rather than among everything submitted.":
    "تطلب القبول جدة أو براعة في الإلقاء، فالمداخلة الأصيلة دخلت البرنامج دون متحدث مصقول، والمفاضلة قائمة بين المداخلات المقبولة لا بين كل ما قدم.",
  "A motoring magazine reports that one gearbox is 40 percent more likely to fail in its first three years than the alternative. The maker's own figures show 7 failures per 10,000 cars against 5 per 10,000. Readers are advised to avoid the model.":
    "تفيد مجلة سيارات بأن احتمال عطل أحد صناديق التروس في سنواته الثلاث الأولى أعلى بنسبة 40 في المئة من البديل. وتظهر أرقام الصانع نفسه 7 أعطال لكل 10,000 سيارة مقابل 5 لكل 10,000. وينصح القراء بتجنب الطراز.",
  "The gap is 2 extra failures per 10,000 cars, so 9,998 owners in 10,000 notice no difference at all, and the 40 percent describes a change to an already tiny number.":
    "الفارق 2 من الأعطال الإضافية لكل 10,000 سيارة، أي أن 9,998 مالكًا من كل 10,000 لن يلاحظوا أي فرق على الإطلاق، ونسبة 40 في المئة تصف تغيرًا في رقم ضئيل أصلًا.",
  "A lottery app tells users that buying a second ticket doubles their chance of taking the jackpot, and pushes a two ticket bundle at checkout. A single ticket wins the jackpot about once in 14 million draws.":
    "يبلغ تطبيق يانصيب مستخدميه بأن شراء تذكرة ثانية يضاعف فرصتهم في الفوز بالجائزة الكبرى، ويعرض حزمة من تذكرتين عند الدفع. وتفوز التذكرة الواحدة بالجائزة الكبرى نحو مرة واحدة كل 14 مليون سحب.",
  "Doubling moves the chance from about 1 in 14 million to about 2 in 14 million, an increase of roughly one chance in 14 million, which is why the proportional wording sounds far larger than the actual change.":
    "المضاعفة تنقل الفرصة من نحو 1 من 14 مليونًا إلى نحو 2 من 14 مليونًا، أي زيادة بنحو فرصة واحدة في 14 مليونًا، ولهذا تبدو الصياغة النسبية أكبر بكثير من التغير الفعلي.",
  "An airline advertisement says its new fleet has cut a particular in flight fault by 60 percent. The maintenance log behind the claim shows the fault used to occur on about 5 flights per million and now occurs on about 2 per million.":
    "يقول إعلان لشركة طيران إن أسطولها الجديد خفض عطلًا معينًا أثناء الرحلة بنسبة 60 في المئة. ويظهر سجل الصيانة وراء هذا الادعاء أن العطل كان يقع في نحو 5 رحلات لكل مليون وصار يقع في نحو 2 لكل مليون.",
  "That is 3 fewer faults per million flights, so a passenger's chance was already about 1 in 200,000 before the new fleet arrived and the headline percentage sits on a very small starting number.":
    "هذا يعني 3 أعطال أقل لكل مليون رحلة، أي أن فرصة الراكب كانت نحو 1 من 200,000 قبل وصول الأسطول الجديد، والنسبة المئوية في العنوان قائمة على رقم بداية صغير جدًا.",
  "A bank advertises that its new account pays 50 percent more interest than the old one. The old account paid 0.2 percent a year and the new one pays 0.3 percent. A saver moves a 2,000 dollar balance across, expecting a noticeable difference.":
    "يعلن بنك أن حسابه الجديد يدفع فائدة أعلى بنسبة 50 في المئة من الحساب القديم. كان الحساب القديم يدفع 0.2 في المئة سنويًا والجديد يدفع 0.3 في المئة. وينقل مدخر رصيدًا قدره 2,000 دولار متوقعًا فرقًا ملموسًا.",
  "On 2,000 dollars the switch is worth 6 dollars a year instead of 4, a gain of 2 dollars, because 50 percent more of a very small rate is still a very small rate.":
    "على 2,000 دولار يساوي التحويل 6 دولارات سنويًا بدل 4، أي مكسب قدره 2 دولار، لأن زيادة 50 في المئة على معدل ضئيل جدًا تبقى معدلًا ضئيلًا جدًا.",
  "A newspaper reports that eating a particular snack every day raises the chance of a rare bowel condition by 25 percent, and shoppers start avoiding it. The figures behind the story are 4 cases per 10,000 people over ten years among non eaters and 5 per 10,000 among daily eaters.":
    "تفيد صحيفة بأن تناول وجبة خفيفة معينة يوميًا يرفع احتمال الإصابة بحالة معوية نادرة بنسبة 25 في المئة، فيبدأ المتسوقون بتجنبها. والأرقام وراء الخبر هي 4 حالات لكل 10,000 شخص على مدى عشر سنوات بين غير المتناولين و5 لكل 10,000 بين المتناولين يوميًا.",
  "The difference is 1 extra case per 10,000 people across a decade, so 9,999 in 10,000 are unaffected either way and the 25 percent applies to an outcome that was already rare.":
    "الفارق 1 من الحالات الإضافية لكل 10,000 شخص على مدى عقد، أي أن 9,999 من كل 10,000 لا يتأثرون في الحالتين، ونسبة 25 في المئة تنطبق على نتيجة كانت نادرة أصلًا.",
  "A clinic leaflet says a daily tablet cuts the chance of a particular event over five years from 4 in 1,000 to 3 in 1,000, a reduction of a quarter. The leaflet adds that this means about one patient in four will be spared the event.":
    "يقول كتيب عيادة إن قرصًا يوميًا يخفض احتمال حدث معين خلال خمس سنوات من 4 لكل 1,000 إلى 3 لكل 1,000، أي انخفاض بمقدار الربع. ويضيف الكتيب أن هذا يعني أن نحو مريض واحد من كل أربعة سينجو من الحدث.",
  "Only 1 patient in 1,000 avoids the event, so about 1,000 people must take the tablet for five years for one to benefit; the quarter describes how much a small chance shrank, not the share of patients helped.":
    "1 فقط من كل 1,000 مريض يتجنب الحدث، أي أن نحو 1,000 شخص يجب أن يتناولوا القرص خمس سنوات كي يستفيد واحد؛ والربع يصف مقدار تقلص فرصة ضئيلة لا نسبة المرضى المستفيدين.",
  "A factory's internal report gives the risk ratio for injuries after a new floor marking scheme as 0.47. The staff newsletter announces that the scheme has cut injuries by 47 percent, and the plant manager repeats that figure to the board.":
    "يورد تقرير داخلي في مصنع نسبة الخطورة للإصابات بعد اعتماد نظام جديد لعلامات الأرضية عند 0.47. وتعلن نشرة الموظفين أن النظام خفض الإصابات بنسبة 47 في المئة، ويكرر مدير المصنع هذا الرقم أمام مجلس الإدارة.",
  "A ratio of 0.47 means injuries fell to 47 percent of the old level, which is a fall of 53 percent, so the newsletter has reported the share that remains as though it were the share removed.":
    "نسبة 0.47 تعني أن الإصابات انخفضت إلى 47 في المئة من مستواها السابق، وهو انخفاض بنسبة 53 في المئة، فالنشرة أوردت النسبة المتبقية وكأنها النسبة التي أزيلت.",
  "A home insurer tells customers that fitting a certain type of wood stove triples the chance of a fire claim, and raises those premiums by a third. Its own data show 1 claim per 10,000 insured homes a year without the stove and 3 per 10,000 with it.":
    "تبلغ شركة تأمين منازل عملاءها بأن تركيب نوع معين من مواقد الحطب يضاعف احتمال مطالبة حريق ثلاث مرات، وترفع أقساط هؤلاء بمقدار الثلث. وتظهر بياناتها 1 من مطالبات الحريق لكل 10,000 منزل مؤمن سنويًا بدون الموقد و3 لكل 10,000 معه.",
  "The extra chance is 2 fire claims per 10,000 homes a year, so 9,997 homes in 10,000 with the stove make no claim, and tripling something rare leaves it rare.":
    "الفرصة الإضافية 2 من مطالبات الحريق لكل 10,000 منزل سنويًا، أي أن 9,997 منزلًا من كل 10,000 فيها الموقد لا تقدم أي مطالبة، ومضاعفة أمر نادر ثلاث مرات تبقيه نادرًا.",
  "A school picks pupils for extra tutoring on the basis of which ones teachers judge most likely to fail. At the end of the year the tutored pupils score lower on average than the rest, and a governors' report calls the tutoring ineffective and recommends closing it.":
    "تختار مدرسة تلاميذ للدروس الإضافية على أساس من يرجح المعلمون رسوبهم أكثر من غيرهم. وفي نهاية العام تكون درجات التلاميذ المدروسين أدنى في المتوسط من البقية، ويصف تقرير مجلس الأمناء الدروس بأنها غير مجدية ويوصي بإيقافها.",
  "Teachers chose pupils for tutoring precisely because they were already heading for a poor result, so the tutored group started further behind and the tutoring is blamed for the reason it was offered.":
    "اختار المعلمون التلاميذ للدروس تحديدًا لأنهم كانوا متجهين أصلًا إلى نتيجة سيئة، فالمجموعة المدروسة بدأت من موقع أكثر تأخرًا، وتلام الدروس على السبب نفسه الذي قدمت من أجله.",
  "A phone company calls customers its model flags as most likely to leave and offers them a discount. Over the next quarter those customers cancel more often than customers who got no call. The analysis concludes that retention calls push people out of the door.":
    "تتصل شركة هاتف بالعملاء الذين يشير نموذجها إلى أنهم الأكثر ترجيحًا للمغادرة وتعرض عليهم خصمًا. وخلال الربع التالي يلغي هؤلاء اشتراكاتهم أكثر من العملاء الذين لم يتلقوا اتصالًا. ويخلص التحليل إلى أن اتصالات الاحتفاظ تدفع الناس إلى الخروج.",
  "The call went only to customers already judged most likely to cancel, so the flag that triggered the call, not the call itself, explains their higher cancellation rate.":
    "لم يذهب الاتصال إلا إلى العملاء الذين حكم أصلًا بأنهم الأكثر ترجيحًا للإلغاء، فالإشارة التي أطلقت الاتصال، لا الاتصال نفسه، هي ما يفسر ارتفاع معدل إلغائهم.",
  "A plant sends a machine for early servicing whenever an operator reports an unusual noise. An audit finds that machines serviced early broke down more often the following year than machines left alone, and recommends servicing less.":
    "يرسل مصنع آلة لصيانة مبكرة كلما أبلغ مشغل عن صوت غير معتاد. ويجد تدقيق أن الآلات التي صينت مبكرًا تعطلت في العام التالي أكثر من الآلات التي تركت وشأنها، فيوصي بتقليل الصيانة.",
  "The noise that prompted early servicing was itself a sign of a machine on its way to failing, so the servicing takes the blame for the condition that selected it.":
    "الصوت الذي استدعى الصيانة المبكرة كان في ذاته علامة على آلة في طريقها إلى العطل، فتتحمل الصيانة اللوم عن الحالة التي اختارتها أصلًا.",
  "Places on a prison workshop scheme are limited, so staff give them to the inmates they judge most motivated and least likely to offend again. Two years on, scheme graduates have far lower reoffending, and the governor presents this as proof the scheme works.":
    "مقاعد برنامج ورشة العمل في السجن محدودة، فيمنحها الموظفون للنزلاء الذين يرون أنهم الأكثر دافعية والأقل ترجيحًا لمعاودة الجريمة. وبعد عامين، تنخفض معاودة الجريمة كثيرًا بين خريجي البرنامج، ويقدم مدير السجن ذلك دليلًا على نجاح البرنامج.",
  "Staff selected participants using their own judgement of who would reoffend, which is the very outcome being measured, so the places went to the men already likely to do best.":
    "اختار الموظفون المشاركين بناء على حكمهم الشخصي على من سيعاود الجريمة، وهي النتيجة ذاتها التي تقاس، فذهبت المقاعد إلى الرجال المرشحين أصلًا لأفضل أداء.",
  "A bank rewrites the terms of a loan as soon as the account shows early signs of strain. A year later, rewritten loans have defaulted more often than the rest of the book, and the credit committee concludes that rewriting terms encourages default.":
    "يعيد بنك صياغة شروط القرض بمجرد أن يظهر الحساب علامات تعثر مبكرة. وبعد عام، تكون القروض المعاد صياغتها قد تعثرت أكثر من بقية المحفظة، وتخلص لجنة الائتمان إلى أن إعادة الصياغة تشجع على التعثر.",
  "The rewrite was triggered by warning signs that already predicted default, so the rewritten loans began from a worse position that the comparison never accounted for.":
    "أطلقت إعادة الصياغة علامات إنذار كانت تتنبأ بالتعثر أصلًا، فالقروض المعاد صياغتها بدأت من موقع أسوأ لم تأخذه المقارنة في الحسبان.",
  "An employer assigns a senior mentor to the graduate recruits its managers rate as highest potential. Three years later the mentored recruits have been promoted twice as often as the others, and the internal newsletter credits the mentoring scheme.":
    "يعين صاحب عمل مرشدًا كبيرًا لخريجي التوظيف الجدد الذين يصنفهم مديروه على أنهم الأعلى إمكانية. وبعد ثلاث سنوات تكون ترقية المشمولين بالإرشاد قد جرت بضعف معدل غيرهم، وتنسب النشرة الداخلية الفضل إلى برنامج الإرشاد.",
  "Managers picked mentees on a judgement of who would rise fastest, so the mentored group was already on the quicker track before any mentoring happened.":
    "اختار المديرون المشمولين بناء على حكم على من سيصعد أسرع، فمجموعة الإرشاد كانت أصلًا على المسار الأسرع قبل أي إرشاد.",
  "A care home moves residents to its specialist wing when staff judge that they are declining fastest. A quality review finds that residents in the specialist wing die sooner than those on ordinary floors, and questions whether the wing should stay open.":
    "تنقل دار رعاية النزلاء إلى جناحها المتخصص حين يرى الموظفون أنهم الأسرع تدهورًا. وتجد مراجعة للجودة أن نزلاء الجناح المتخصص يتوفون أبكر من نزلاء الطوابق العادية، وتتساءل عما إذا كان ينبغي إبقاء الجناح مفتوحًا.",
  "The move was decided by how fast a resident was already declining, and that decline, not the wing, drives the difference in how long they lived.":
    "تقرر النقل بناء على سرعة التدهور القائمة لدى النزيل، وذلك التدهور، لا الجناح، هو ما يقود الفارق في مدة بقائهم على قيد الحياة.",
  "A clinic offers its intensive shoulder programme only to patients who can already raise the arm to shoulder height, since the exercises need it. Those patients regain full movement far more often than the rest, and the clinic advertises the programme as its most effective treatment.":
    "لا تعرض عيادة برنامجها المكثف للكتف إلا على المرضى القادرين أصلًا على رفع الذراع إلى مستوى الكتف، لأن التمارين تتطلب ذلك. ويستعيد هؤلاء المرضى الحركة الكاملة أكثر بكثير من غيرهم، وتعلن العيادة أن البرنامج أنجع علاجاتها.",
  "The entry rule handed the programme the patients whose shoulders were least damaged to begin with, so the people most likely to recover anyway are the ones being counted.":
    "سلمت قاعدة الالتحاق البرنامج المرضى الأقل تضررًا في أكتافهم منذ البداية، فالأشخاص الأكثر ترجيحًا للتعافي على أي حال هم من يجري إحصاؤهم.",
  "A fleet inspects every van once a year. Vans whose brake faults were picked up at inspection go on to have far fewer roadside breakdowns than vans whose faults turned up in between. The workshop manager concludes that the annual inspection catches the dangerous faults.":
    "يفحص أسطول كل شاحنة صغيرة مرة في السنة. والشاحنات التي رصدت عيوب مكابحها في الفحص تتعرض لأعطال على الطريق أقل بكثير من الشاحنات التي ظهرت عيوبها بين الفحوص. ويخلص مدير الورشة إلى أن الفحص السنوي يلتقط الأعطال الخطرة.",
  "A yearly check can only find wear slow enough to still be half formed on the day the inspector calls; anything that goes from sound to broken inside a year declares itself between visits. The inspected group is therefore stacked with the gradual faults from the outset.":
    "لا يستطيع فحص سنوي أن يجد سوى التآكل البطيء بما يكفي ليكون نصف مكتمل يوم زيارة الفاحص؛ أما ما ينتقل من السلامة إلى العطب خلال سنة فيعلن عن نفسه بين الزيارات. لذا فإن المجموعة المفحوصة محشوة بالأعطال التدريجية من البداية.",
  "A card issuer reviews merchant accounts once a month. Accounts stopped by the review have cost the issuer far less on average than accounts reported by cardholders between reviews. The risk team reports that the monthly review is holding losses down.":
    "تراجع جهة إصدار بطاقات حسابات التجار مرة في الشهر. والحسابات التي أوقفتها المراجعة كلفت الجهة في المتوسط أقل بكثير من الحسابات التي أبلغ عنها حاملو البطاقات بين المراجعات. ويفيد فريق المخاطر بأن المراجعة الشهرية تكبح الخسائر.",
  "A scheme that opens, drains and vanishes within days sits entirely between two reviews, so the review can only catch the slow, low value operations. Those were the cheaper ones before anyone intervened.":
    "المخطط الذي يفتح ويستنزف ويختفي خلال أيام يقع بأكمله بين مراجعتين، فلا تستطيع المراجعة أن تلتقط سوى العمليات البطيئة منخفضة القيمة. وتلك كانت الأقل كلفة قبل تدخل أحد.",
  "A software team audits its codebase every quarter. Defects the audit finds are rated far less severe than those users report between audits. The engineering lead writes that auditing removes problems before they can turn serious.":
    "يدقق فريق برمجيات قاعدة أكواده كل ربع سنة. والعيوب التي يجدها التدقيق تصنف أقل خطورة بكثير من تلك التي يبلغ عنها المستخدمون بين عمليات التدقيق. ويكتب قائد الهندسة أن التدقيق يزيل المشكلات قبل أن تستفحل.",
  "A defect that crashes the app is reported by a user within hours of shipping, long before the next quarterly pass, leaving the audit only the quiet long lived ones. Those were the mild defects already, not defects the audit made mild.":
    "العيب الذي يعطل التطبيق يبلغ عنه مستخدم خلال ساعات من الإطلاق، أي قبل التدقيق الربع سنوي التالي بوقت طويل، فلا يبقى للتدقيق سوى العيوب الهادئة الطويلة الأمد. وتلك كانت عيوبًا خفيفة أصلًا لا عيوبًا خففها التدقيق.",
  "A housing association surveys each block once every five years. Defects found by the survey are almost always cosmetic, while the serious ones, a collapsed ceiling or a burst tank, arrive as emergency calls. The association reports that its survey programme keeps defects minor.":
    "تمسح جمعية إسكان كل مجمع مرة كل خمس سنوات. والعيوب التي يجدها المسح شكلية دائمًا تقريبًا، أما الخطيرة منها، كسقف منهار أو خزان منفجر، فتصل عبر مكالمات طوارئ. وتفيد الجمعية بأن برنامج المسح لديها يبقي العيوب طفيفة.",
  "A defect that takes years to develop is present, and still small, whichever year the surveyor happens to call. One that develops in a fortnight almost certainly falls between two surveys and comes in as an emergency instead.":
    "العيب الذي يستغرق تكونه سنوات موجود، وما زال صغيرًا، في أي سنة يصادف أن يمر فيها المساح. أما ما يتكون خلال أسبوعين فيقع شبه المؤكد بين مسحين ويصل بوصفه حالة طوارئ.",
  "A grid operator surveys its lines from the air twice a year. Faults seen on a survey are almost always minor, and the faults behind most outages had never appeared on one. The operator's report credits the surveys with keeping serious faults rare.":
    "يمسح مشغل شبكة كهرباء خطوطه جوًا مرتين في السنة. والأعطال التي ترصد في المسح طفيفة دائمًا تقريبًا، أما الأعطال التي تقف وراء معظم الانقطاعات فلم تظهر في مسح قط. وينسب تقرير المشغل الفضل إلى المسوح في إبقاء الأعطال الخطيرة نادرة.",
  "Only damage that creeps along for months is still sitting there to be photographed when the aircraft passes. Damage that goes from intact to failed in a fortnight becomes an outage before any survey can see it, so the surveyed set is minor by construction.":
    "لا يبقى قائمًا ليصور حين تمر الطائرة سوى الضرر الذي يزحف على مدى شهور. أما الضرر الذي ينتقل من السلامة إلى العطب خلال أسبوعين فيصبح انقطاعًا قبل أن يراه أي مسح، فالمجموعة الممسوحة طفيفة بحكم التكوين.",
  "A dental practice recalls its patients every eighteen months. Problems found at recall are nearly always fixable with a filling, while most extractions come from patients who telephone in pain between appointments. The practice tells patients that regular recall prevents extractions.":
    "تستدعي عيادة أسنان مرضاها كل ثمانية عشر شهرًا. والمشكلات التي تكتشف عند الاستدعاء يمكن إصلاحها بحشوة دائمًا تقريبًا، بينما تأتي معظم عمليات الخلع من مرضى يتصلون متألمين بين المواعيد. وتقول العيادة لمرضاها إن الاستدعاء المنتظم يمنع الخلع.",
  "Decay that creeps along for years is present, and still small, whenever the recall falls. A tooth that goes from sound to abscessed in three months announces itself before the next appointment, so the recall sees the slow problems and little else.":
    "التسوس الذي يزحف على مدى سنوات موجود، وما زال صغيرًا، متى وقع موعد الاستدعاء. أما السن التي تنتقل من السلامة إلى الخراج خلال ثلاثة أشهر فتعلن عن نفسها قبل الموعد التالي، فالاستدعاء يرى المشكلات البطيئة ولا يكاد يرى غيرها.",
  "A large employer offers a lung scan every two years. Employees whose disease is found at a scan need much less urgent treatment than those who arrive breathless at the clinic between rounds. Occupational health reports that scanning catches disease while it is still controllable.":
    "يعرض صاحب عمل كبير مسحًا للرئة كل سنتين. والموظفون الذين يكتشف مرضهم في المسح يحتاجون إلى علاج عاجل أقل بكثير ممن يصلون إلى العيادة يلهثون بين الجولات. وتفيد الصحة المهنية بأن المسح يلتقط المرض وهو ما يزال قابلًا للسيطرة.",
  "Disease that progresses over many years is detectable at whichever round comes along, while disease that goes from nothing to breathless inside two years surfaces between rounds. The scanned group is loaded with the milder illness before any treatment starts.":
    "المرض الذي يتقدم على مدى سنوات عديدة قابل للكشف في أي جولة تأتي، بينما المرض الذي ينتقل من لا شيء إلى ضيق النفس خلال سنتين يظهر بين الجولات. فالمجموعة الممسوحة محملة بالمرض الأخف قبل بدء أي علاج.",
  "A clinic lengthens its check up interval from one year to three. The cases it now picks up look milder on average than the ones it used to find, and the clinical lead takes this as evidence that the longer interval suits patients better.":
    "تمدد عيادة الفاصل بين الفحوص الدورية من سنة إلى ثلاث. والحالات التي تلتقطها الآن تبدو أخف في المتوسط من التي كانت تجدها، ويعتبر المسؤول السريري ذلك دليلًا على أن الفاصل الأطول أنسب للمرضى.",
  "Stretching the gap gives fast moving disease more room to appear and declare itself between visits, so a larger share of what the check up still finds is the slow moving kind. The milder mix reflects what the interval now misses, not better care.":
    "توسيع الفاصل يعطي المرض السريع مجالًا أكبر ليظهر ويعلن عن نفسه بين الزيارات، فتصبح حصة أكبر مما يجده الفحص من النوع البطيء. والخليط الأخف يعكس ما صار الفاصل يغفله لا رعاية أفضل.",
  "A company's product newsletter runs a write up whenever an experiment beats the current design. Teams whose tests showed no difference tend to move on without writing anything. A new joiner reads a year of newsletters and concludes that almost every idea here lifts sign ups.":
    "تنشر نشرة منتجات إحدى الشركات تقريرًا كلما تفوقت تجربة على التصميم الحالي. أما الفرق التي أظهرت اختباراتها عدم وجود فرق فتميل إلى المضي دون كتابة شيء. ويقرأ موظف جديد نشرات سنة كاملة فيخلص إلى أن كل فكرة هنا تقريبًا ترفع التسجيلات.",
  "Only the experiments that won were written up, so the newsletter records a small winning slice of the year's tests while the flat and losing ones never appeared anywhere the new joiner could read them.":
    "لم تكتب سوى التجارب التي فازت، فالنشرة تسجل شريحة فائزة صغيرة من اختبارات السنة بينما لم تظهر المتعادلة والخاسرة في أي مكان يستطيع الموظف الجديد قراءته.",
  "A training provider's homepage carries fifteen graduate stories, each describing a good job within months of finishing. The stories came from graduates who answered a request for success stories. A prospective student reads them and concludes the course almost always leads to work.":
    "تحمل الصفحة الرئيسية لمزود تدريب خمس عشرة قصة لخريجين، تصف كل واحدة وظيفة جيدة خلال شهور من التخرج. وقد جاءت القصص من خريجين استجابوا لطلب قصص نجاح. ويقرؤها طالب محتمل فيخلص إلى أن الدورة تقود إلى عمل دائمًا تقريبًا.",
  "The page gathers only graduates who had a success to report, so those who finished the course and found nothing are missing from the evidence the student is weighing.":
    "لا تجمع الصفحة سوى الخريجين الذين لديهم نجاح يروونه، فمن أنهوا الدورة ولم يجدوا شيئًا غائبون عن الأدلة التي يزنها الطالب.",
  "On a woodworking forum, members post photographs of finished cabinets, and the build threads run to hundreds of admiring replies. A newcomer reads twenty of them and decides the design is straightforward enough for a first project.":
    "في منتدى للنجارة، ينشر الأعضاء صورًا لخزائن منجزة، وتمتد سلاسل البناء إلى مئات الردود المعجبة. ويقرأ وافد جديد عشرين منها فيقرر أن التصميم بسيط بما يكفي لمشروع أول.",
  "Builds that were abandoned halfway never get a thread, so the forum shows the attempts that worked and gives no sign of how often the design defeated someone.":
    "الأعمال التي هجرت في منتصفها لا يفتح لها سلسلة أصلًا، فالمنتدى يعرض المحاولات التي نجحت ولا يعطي أي مؤشر على عدد المرات التي هزم فيها التصميم أحدًا.",
  "A software vendor's website hosts twelve customer case studies, each with a chart of improved results. The vendor decides which pilots to turn into case studies after seeing how they went. A buyer reads all twelve and signs a three year contract.":
    "يستضيف موقع مورد برمجيات اثنتي عشرة دراسة حالة لعملاء، مع رسم بياني للنتائج المحسنة في كل منها. ويقرر المورد أي التجارب التمهيدية يحولها إلى دراسات حالة بعد أن يرى كيف سارت. ويقرأ مشترٍ الاثنتي عشرة كلها ويوقع عقدًا لثلاث سنوات.",
  "The vendor wrote up only the pilots that turned out well, so the twelve studies are the flattering end of a larger set of pilots whose disappointing results were never put on the site.":
    "لم يكتب المورد سوى التجارب التي انتهت نهاية جيدة، فالدراسات الاثنتا عشرة هي الطرف المجمل من مجموعة أكبر من التجارب لم توضع نتائجها المخيبة على الموقع قط.",
  "An allotment association's newsletter has carried enthusiastic reports of a plant feed for ten years. Members who noticed a big difference send in a report; members who noticed nothing rarely bother. The committee votes to buy the feed in bulk for every plot.":
    "حملت نشرة جمعية حدائق منزلية تقارير متحمسة عن سماد نباتي طوال عشر سنوات. فالأعضاء الذين لاحظوا فرقًا كبيرًا يرسلون تقريرًا، أما من لم يلاحظوا شيئًا فنادرًا ما يكلفون أنفسهم عناء ذلك. وتصوت اللجنة على شراء السماد بالجملة لكل قطعة.",
  "Only growers who saw an effect wrote in, so a decade of newsletters preserves the striking results and leaves out every plot where the feed changed nothing.":
    "لم يكتب سوى المزارعين الذين رأوا أثرًا، فعقد من النشرات يحفظ النتائج اللافتة ويغفل كل قطعة لم يغير فيها السماد شيئًا.",
  "A research group posts a blog each time a new network design beats the standard benchmark, and quietly shelves the runs that did not. A reader tallies such posts across several groups and writes that progress in the field is accelerating sharply.":
    "تنشر مجموعة بحثية تدوينة كلما تفوق تصميم شبكة جديد على المعيار القياسي، وتنحي بهدوء التجارب التي لم تتفوق. ويحصي قارئ هذه التدوينات عبر عدة مجموعات ويكتب أن التقدم في هذا المجال يتسارع بحدة.",
  "Runs that failed to beat the benchmark were never posted, so the tally counts the successes drawn from far more attempts and reads a filtered record as though it were the rate of progress.":
    "التجارب التي أخفقت في تجاوز المعيار لم تنشر قط، فالإحصاء يعد النجاحات المستخلصة من محاولات أكثر بكثير ويقرأ سجلًا مصفى وكأنه معدل التقدم.",
  "Someone collects every published trial of a supplement and notices that the small trials report much larger benefits than the large ones. He averages all of them together and reports a clear overall benefit.":
    "يجمع شخص كل تجربة منشورة عن مكمل غذائي فيلاحظ أن التجارب الصغيرة تفيد بفوائد أكبر بكثير من التجارب الكبيرة. فيحسب متوسطها جميعًا معًا ويفيد بوجود فائدة إجمالية واضحة.",
  "A small trial that found nothing is easy to leave unwritten, while a small trial that happened to land a striking result gets submitted, so the small studies on show are the lucky ones and averaging them pushes the estimate up.":
    "التجربة الصغيرة التي لم تجد شيئًا يسهل تركها دون كتابة، بينما التجربة الصغيرة التي صادف أن أعطت نتيجة لافتة تقدم للنشر، فالدراسات الصغيرة المعروضة هي المحظوظة ومتوسطها يدفع التقدير إلى أعلى.",
  "A journal's guidance for authors says it looks for findings that are surprising and change how readers think. A student reviews ten years of its issues and concludes that effects in this field are usually large.":
    "تقول إرشادات إحدى المجلات للمؤلفين إنها تبحث عن نتائج مفاجئة تغير طريقة تفكير القراء. ويراجع طالب أعداد عشر سنوات منها فيخلص إلى أن التأثيرات في هذا المجال كبيرة عادة.",
  "The journal chose papers by how striking the result was, so modest and flat findings were turned away or never submitted, and the ten years the student read contain none of them.":
    "اختارت المجلة الأوراق بحسب مدى لفت النتيجة للنظر، فالنتائج المتواضعة والمتعادلة ردت أو لم تقدم أصلًا، والسنوات العشر التي قرأها الطالب لا تحتوي على أي منها.",
  "A bank randomly gives half of its new savers an automatic top up feature and the rest a standard account. Its year end report compares average balances among savers still paying in after twelve months, and finds the feature far ahead.":
    "يمنح بنك بالتعشية نصف مدخريه الجدد خاصية إيداع تلقائي ويترك البقية على حساب عادي. ويقارن تقريره في نهاية السنة متوسط الأرصدة بين المدخرين الذين ما زالوا يودعون بعد اثني عشر شهرًا، فيجد الخاصية متقدمة بفارق كبير.",
  "Whether someone was still paying in at twelve months was settled after the random split, and the feature itself affects who keeps going, so the sets compared are no longer the groups the allocation created.":
    "تحدد بقاء الشخص مودعًا عند اثني عشر شهرًا بعد التقسيم العشوائي، والخاصية نفسها تؤثر في من يستمر، فالمجموعتان المقارنتان لم تعودا المجموعتين اللتين أنشأهما التوزيع.",
  "Classes are randomly allocated to a new reading scheme or to the usual lessons. Twelve allocated classes never got the scheme running, so the evaluators move them into the comparison group, saying the figures should reflect what actually happened in the classroom.":
    "توزع الصفوف بالتعشية على برنامج قراءة جديد أو على الدروس المعتادة. ولم يشغل اثنا عشر صفًا موزعًا البرنامج قط، فينقلهم المقيمون إلى مجموعة المقارنة، قائلين إن الأرقام ينبغي أن تعكس ما حدث فعلًا داخل الصف.",
  "Which classes failed to start was determined after allocation, probably by the schools least able to run anything new, so shifting them loads the comparison group with the weakest classes.":
    "تحدد أي الصفوف أخفقت في البدء بعد التوزيع، وعلى الأرجح في المدارس الأقل قدرة على تشغيل أي شيء جديد، فنقلها يحمل مجموعة المقارنة بأضعف الصفوف.",
  "An employer randomly assigns supervisors to a management course or to nothing. Anyone who changed department during the year is then left out of the analysis, in both groups alike, because the evaluator says their results would not be comparable.":
    "يوزع صاحب عمل المشرفين بالتعشية على دورة إدارية أو على لا شيء. ثم يستبعد من التحليل كل من غير قسمه خلال السنة، في المجموعتين على السواء، لأن المقيم يقول إن نتائجهم لن تكون قابلة للمقارنة.",
  "Department moves happened after the assignment, and the course itself can prompt or prevent them, so the filter removes a different sort of person from each group.":
    "وقعت تنقلات الأقسام بعد التوزيع، والدورة نفسها قد تحفزها أو تمنعها، فالمرشح يزيل نوعًا مختلفًا من الأشخاص من كل مجموعة.",
  "A council randomly assigns smokers to a quit programme or to a leaflet. The final report covers only those who turned up to the four week check, since the rest could not be verified. Attendance was 70% in the programme arm and 90% in the leaflet arm.":
    "توزع بلدية المدخنين بالتعشية على برنامج إقلاع أو على منشور. ولا يغطي التقرير النهائي سوى من حضروا فحص الأسابيع الأربعة، لأن البقية تعذر التحقق منهم. وبلغ الحضور 70% في ذراع البرنامج و90% في ذراع المنشور.",
  "Turning up to the check happened after assignment and at very different rates in the two arms, and the people likeliest to be missing from the programme arm are those who went back to smoking.":
    "وقع الحضور إلى الفحص بعد التوزيع وبمعدلين شديدي الاختلاف بين الذراعين، والأشخاص الأكثر ترجيحًا للغياب من ذراع البرنامج هم من عادوا إلى التدخين.",
  "Farms are randomly allocated a new pest control routine or their usual one. Farms that sprayed late or missed a spray are dropped, and so are farms in the other group whose records had gaps. The routine comes out strongly ahead.":
    "توزع المزارع بالتعشية على روتين جديد لمكافحة الآفات أو على روتينها المعتاد. وتستبعد المزارع التي رشت متأخرة أو فوتت رشة، وتستبعد كذلك مزارع المجموعة الأخرى التي كانت سجلاتها ناقصة. ويخرج الروتين متقدمًا بفارق كبير.",
  "Whether a farm followed the routine was decided after allocation and reflects how well it is run, so the best run farms in one group are being set against a differently filtered set in the other.":
    "تحدد التزام المزرعة بالروتين بعد التوزيع وهو يعكس جودة إدارتها، فأفضل المزارع إدارة في مجموعة توضع في مواجهة مجموعة مصفاة بطريقة مختلفة في الأخرى.",
  "An insurer randomly fits a driving feedback device to half of its new policies. Drivers who unplugged the device are dropped from that group, and drivers in the other group who bought one privately are dropped from theirs. The remaining comparison shows far fewer claims with the device.":
    "تركب شركة تأمين بالتعشية جهاز تغذية راجعة للقيادة في نصف وثائقها الجديدة. وتستبعد من تلك المجموعة السائقين الذين فصلوا الجهاز، وتستبعد من المجموعة الأخرى السائقين الذين اشتروا واحدًا على نفقتهم. وتظهر المقارنة المتبقية مطالبات أقل بكثير مع الجهاز.",
  "Unplugging a device and buying one privately both happened after the random split and mark out very different drivers, so what is left is two self selected sets rather than the groups the allocation made.":
    "فصل الجهاز وشراؤه على النفقة الخاصة وقعا كلاهما بعد التقسيم العشوائي ويميزان سائقين مختلفين تمامًا، فما تبقى مجموعتان منتقاتان ذاتيًا لا المجموعتان اللتان صنعهما التوزيع.",
  "Travellers whose holiday went badly are asked what the brochure promised about the hotel, and their answers are set against those of travellers who enjoyed the same trip. The operator's complaints team treats the gap as evidence of mis-selling.":
    "يسأل المسافرون الذين ساءت عطلتهم عما وعدت به النشرة الدعائية بخصوص الفندق، وتوضع إجاباتهم مقابل إجابات مسافرين استمتعوا بالرحلة نفسها. ويعتبر فريق الشكاوى لدى منظم الرحلات الفارق دليلًا على البيع المضلل.",
  "People whose holiday disappointed them have already been back over what they were told looking for a broken promise, while the satisfied travellers have never revisited the brochure.":
    "من خابت عطلتهم عادوا بالفعل إلى ما قيل لهم بحثًا عن وعد مخلوف، بينما لم يعد المسافرون الراضون إلى النشرة الدعائية قط.",
  "After a food company recalls a batch, buyers are phoned and asked whether anything seemed odd about the smell. Those who fell ill report an odd smell far more often, and the report concludes the smell was a reliable warning sign.":
    "بعد سحب شركة أغذية دفعة من السوق، يتصل بالمشترين ويسألون عما إذا كان هناك شيء غريب في الرائحة. ويفيد من مرضوا برائحة غريبة أكثر بكثير، ويخلص التقرير إلى أن الرائحة كانت علامة إنذار موثوقة.",
  "Buyers who got ill have replayed the meal hunting for something wrong with it, while those who felt fine had no reason to think about the smell at all.":
    "المشترون الذين مرضوا أعادوا استحضار الوجبة بحثًا عن خطب ما فيها، بينما لم يكن لدى من شعروا بأنهم بخير أي سبب للتفكير في الرائحة أصلًا.",
  "A road safety survey asks drivers how fast they usually take a particular bend. Drivers who have crashed there give very different figures from drivers who have not, and the survey uses the gap to set a recommended limit.":
    "يسأل مسح للسلامة المرورية السائقين عن السرعة التي يأخذون بها منعطفًا معينًا عادة. ويعطي السائقون الذين اصطدموا هناك أرقامًا شديدة الاختلاف عن أرقام من لم يصطدموا، ويستخدم المسح الفارق لتحديد سرعة موصى بها.",
  "A driver who crashed at that bend has gone over the moment repeatedly and knows how it ended, so the speed now reported is reconstructed from the crash rather than independent of it.":
    "السائق الذي اصطدم عند ذلك المنعطف استعاد اللحظة مرارًا ويعرف كيف انتهت، فالسرعة التي يذكرها الآن معاد بناؤها انطلاقًا من الحادث لا مستقلة عنه.",
  "A regulator asks customers who lost money on an investment what the salesperson said about the risk, and compares their accounts with those of satisfied customers who bought the same product from the same team.":
    "تسأل جهة تنظيمية العملاء الذين خسروا أموالًا في استثمار عما قاله البائع بشأن المخاطرة، وتقارن روايتهم برواية عملاء راضين اشتروا المنتج نفسه من الفريق نفسه.",
  "Customers sitting on a loss have gone back through the conversation looking for a reassurance that should never have been given, while satisfied customers have had no reason to replay it.":
    "العملاء الجالسون على خسارة عادوا إلى المحادثة بحثًا عن طمأنة ما كان ينبغي أن تعطى، بينما لم يكن لدى العملاء الراضين سبب لاستعادتها.",
  "Parents of pupils who failed their final exams are asked how much homework the school set three years earlier, alongside parents of pupils who passed. The parents of failing pupils report much less, and a campaign group blames the school.":
    "يسأل أهالي التلاميذ الذين رسبوا في امتحاناتهم النهائية عن حجم الواجبات المنزلية التي كانت المدرسة تعطيها قبل ثلاث سنوات، إلى جانب أهالي التلاميذ الناجحين. ويفيد أهالي الراسبين بحجم أقل بكثير، فتلقي جماعة ضغط اللوم على المدرسة.",
  "Parents whose children failed have been searching for an explanation ever since the results came out, so their account of past homework is produced by the outcome rather than measured independently of it.":
    "الأهالي الذين رسب أبناؤهم يبحثون عن تفسير منذ صدور النتائج، فروايتهم عن الواجبات السابقة أنتجتها النتيجة لا قياس مستقل عنها.",
  "After an outbreak of illness following a conference dinner, attendees are asked which dishes they ate. Those who fell ill much more often say they had the seafood, and the report names it as the source.":
    "بعد تفشي مرض عقب عشاء مؤتمر، يسأل الحاضرون عن الأطباق التي تناولوها. ويقول من مرضوا إنهم تناولوا المأكولات البحرية بمعدل أعلى بكثير، فيسمي التقرير المأكولات البحرية مصدرًا.",
  "Attendees who became ill have reconstructed the meal trying to work out what caused it, so they account for their plate far more thoroughly than guests who never thought about dinner again.":
    "الحاضرون الذين مرضوا أعادوا بناء الوجبة محاولين معرفة سبب المرض، فهم يصفون ما في أطباقهم بدقة أكبر بكثير من ضيوف لم يفكروا في العشاء مرة أخرى.",
  "A company reports that staff who received its five year loyalty award go on to average eleven years with the firm, against three years for everyone else, counted from each person's start date. HR presents the award as proof that recognition keeps people.":
    "تفيد شركة بأن الموظفين الذين نالوا جائزة الولاء لخمس سنوات يمضون بعدها أحد عشر عامًا في المتوسط مع الشركة، مقابل ثلاث سنوات لسائر الموظفين، محسوبة من تاريخ التحاق كل شخص. وتقدم الموارد البشرية الجائزة دليلًا على أن التقدير يبقي الناس.",
  "Receiving the award required staying five years, so anyone who left sooner cannot be in that group at all, and those five guaranteed years are counted into its average.":
    "تطلب نيل الجائزة البقاء خمس سنوات، فمن غادر قبل ذلك لا يمكن أن يكون في تلك المجموعة أصلًا، وتلك السنوات الخمس المضمونة تحسب ضمن متوسطها.",
  "A subscription service reports that customers who ever moved to its premium tier stay subscribed four times longer than customers who never did, measured from the day each one signed up. Marketing pushes the upgrade at new customers on the strength of it.":
    "تفيد خدمة اشتراكات بأن العملاء الذين انتقلوا في أي وقت إلى فئتها المميزة يبقون مشتركين أربعة أضعاف مدة العملاء الذين لم ينتقلوا، مقاسة من يوم تسجيل كل واحد. ويدفع التسويق العملاء الجدد إلى الترقية استنادًا إلى ذلك.",
  "A customer had to still be subscribed in order to upgrade, so everyone who left early lands automatically in the other group, and the months before the upgrade are credited to premium.":
    "كان على العميل أن يظل مشتركًا كي يرقي، فكل من غادر مبكرًا يقع تلقائيًا في المجموعة الأخرى، والشهور السابقة للترقية تحسب لصالح الفئة المميزة.",
  "A sports channel reports that clubs reaching the cup final went an average of nine weeks unbeaten in the competition, far better than clubs knocked out early, and puts it down to the finalists' training methods.":
    "تفيد قناة رياضية بأن الأندية التي بلغت نهائي الكأس أمضت تسعة أسابيع في المتوسط دون هزيمة في المسابقة، وهو أفضل بكثير من الأندية التي خرجت مبكرًا، وتعزو ذلك إلى أساليب التدريب لدى المتأهلين للنهائي.",
  "Reaching the final required winning every earlier round, so those weeks cannot contain a defeat for any club in that group; the unbeaten run is the entry condition rather than a result of training.":
    "تطلب بلوغ النهائي الفوز في كل دور سابق، فتلك الأسابيع لا يمكن أن تتضمن هزيمة لأي نادٍ في تلك المجموعة؛ فسلسلة اللاهزيمة شرط دخول لا نتيجة تدريب.",
  "A delivery firm refurbishes each van at five years old. It reports that refurbished vans last on average four years longer than the rest of the fleet, measuring every van's life from the day it was bought, and orders more refurbishments.":
    "تجدد شركة توصيل كل شاحنة صغيرة عند بلوغها خمس سنوات. وتفيد بأن الشاحنات المجددة تعمر أربع سنوات أطول في المتوسط من بقية الأسطول، مع قياس عمر كل شاحنة من يوم شرائها، فتطلب مزيدًا من عمليات التجديد.",
  "A van had to still be running at five years to be refurbished, so vans that failed before then can only be in the other group, and those first five years are credited to refurbishment.":
    "كان على الشاحنة أن تظل عاملة عند خمس سنوات كي تجدد، فالشاحنات التي تعطلت قبل ذلك لا يمكن أن تكون إلا في المجموعة الأخرى، وتلك السنوات الخمس الأولى تحسب لصالح التجديد.",
  "A college reports that students who submitted the optional final year dissertation were far less likely to have left before graduating than students who did not, counted from enrolment, and proposes making the dissertation compulsory.":
    "تفيد كلية بأن الطلاب الذين قدموا أطروحة السنة النهائية الاختيارية كانوا أقل ترجيحًا بكثير للانقطاع قبل التخرج من الطلاب الذين لم يقدموها، محسوبة من التسجيل، فتقترح جعل الأطروحة إلزامية.",
  "Submitting required still being enrolled in the final year, so every student who left earlier falls automatically into the other group and cannot count against the dissertation.":
    "تطلب التقديم أن يكون الطالب ما زال مسجلًا في السنة النهائية، فكل طالب انقطع قبل ذلك يقع تلقائيًا في المجموعة الأخرى ولا يمكن أن يحسب ضد الأطروحة.",
  "An insurer reports that drivers who earned its five year no claims discount average far fewer claims per year of cover than other drivers, counted from the day each policy began, and advertises the discount as something that makes people drive better.":
    "تفيد شركة تأمين بأن السائقين الذين نالوا خصم عدم المطالبة لخمس سنوات لديهم مطالبات أقل بكثير في السنة الواحدة من التغطية مقارنة بغيرهم، محسوبة من يوم بدء كل وثيقة، وتعلن الخصم بوصفه شيئًا يجعل الناس يقودون بشكل أفضل.",
  "Earning the discount required five years without a claim, so those claim free years are built into the group by definition and any driver who crashed early could never appear in it.":
    "تطلب نيل الخصم خمس سنوات بلا مطالبة، فتلك السنوات الخالية من المطالبات مدمجة في المجموعة بحكم التعريف، وأي سائق اصطدم مبكرًا لا يمكن أن يظهر فيها أبدًا.",
  "A firm reports that offers made by its retrained recruiters were accepted 71% of the time against 62% for the rest. The appendix tables show the retrained group ahead in every role family and at every seniority level.":
    "تفيد شركة بأن العروض التي قدمها موظفو التوظيف المعاد تدريبهم قبلت في 71% من الحالات مقابل 62% لسائرهم. وتظهر جداول الملحق المجموعة المعاد تدريبها متقدمة في كل عائلة وظيفية وعند كل مستوى أقدمية.",
  "The headline gap points the same way as every published subgroup, so no mix of roles can be producing it; a hasty player would accuse the aggregate of hiding a reversal it has already ruled out.":
    "الفارق الإجمالي يشير إلى الاتجاه نفسه الذي تشير إليه كل فئة فرعية منشورة، فلا يمكن لأي تركيبة وظائف أن تنتجه؛ واللاعب المتسرع سيتهم الرقم المجمع بإخفاء انقلاب استبعده أصلًا.",
  "Two bus depots are compared on punctuality. Because one runs far more rural routes than the other, the report recalculates both depots using a single common mix of route types, and prints the mix it used.":
    "تجري مقارنة بين مستودعي حافلات على أساس الانضباط في المواعيد. ولأن أحدهما يشغل خطوطًا ريفية أكثر بكثير من الآخر، يعيد التقرير حساب المستودعين باستخدام تركيبة واحدة مشتركة لأنواع الخطوط، ويطبع التركيبة التي استخدمها.",
  "Standardising both depots to one route mix removes the difference in case mix before comparing, which is exactly the correction a pooled figure needs; a hasty player would accuse it of lumping unlike routes together.":
    "توحيد المستودعين على تركيبة خطوط واحدة يزيل الفارق في تركيبة الحالات قبل المقارنة، وهو تحديدًا التصحيح الذي يحتاجه الرقم المجمع؛ واللاعب المتسرع سيتهمه بخلط خطوط غير متجانسة.",
  "An online store sends each visitor at random to one of two checkout designs, and design B converts better overall. The report notes that the share of new and returning visitors came out almost identical in the two arms.":
    "يرسل متجر إلكتروني كل زائر بالتعشية إلى أحد تصميمي صفحة الدفع، ويحقق التصميم B تحويلًا أفضل إجمالًا. ويشير التقرير إلى أن حصة الزوار الجدد والعائدين خرجت متطابقة تقريبًا في الذراعين.",
  "With the visitor mix verified as the same in both arms, the pooled result is a weighted average using identical weights, so a reversal inside the segments is arithmetically impossible; a hasty player would demand the segments be split out.":
    "مع التحقق من تطابق تركيبة الزوار في الذراعين، تكون النتيجة المجمعة متوسطًا مرجحًا بأوزان متطابقة، فالانقلاب داخل الشرائح مستحيل حسابيًا؛ واللاعب المتسرع سيطالب بفصل الشرائح.",
  "A bank's model flags card transactions for review. Before quoting a figure to the fraud team, the analyst combines the flag rate with how often transactions in that category actually turn out to be fraudulent, and reports the share of flagged transactions that are genuine fraud.":
    "يشير نموذج أحد البنوك إلى معاملات بطاقات للمراجعة. وقبل أن يذكر المحلل رقمًا لفريق الاحتيال، يدمج معدل الإشارة مع معدل كون معاملات تلك الفئة احتيالية فعلًا، ويفيد بحصة المعاملات المشار إليها التي هي احتيال حقيقي.",
  "The number quoted is the chance of fraud given a flag, worked out using how common fraud is, rather than the model's accuracy read backwards; a hasty player would accuse the team of confusing the two.":
    "الرقم المذكور هو احتمال الاحتيال بمعلومية الإشارة، محسوبًا باستخدام مدى شيوع الاحتيال، لا دقة النموذج مقروءة بالمقلوب؛ واللاعب المتسرع سيتهم الفريق بالخلط بين الاثنين.",
  "A vision system catches nearly every cracked casting and wrongly marks about one sound casting in twenty. On this line roughly a third of castings really are cracked. The supervisor tells the crew a marked casting is probably cracked and sends marked ones for rework.":
    "يلتقط نظام رؤية كل مصبوبة متشققة تقريبًا ويصم خطأً نحو مصبوبة سليمة واحدة من كل عشرين. وعلى هذا الخط، نحو ثلث المصبوبات متشقق فعلًا. ويقول المشرف للعمال إن المصبوبة الموسومة متشققة على الأرجح ويرسل الموسومة لإعادة التشغيل.",
  "With a third of castings genuinely cracked, marked parts are cracked around nine times in ten, so the condition needed for false alarms to swamp true ones is absent; a hasty player would object to accuracy being read as the chance of a crack.":
    "مع كون ثلث المصبوبات متشققًا فعلًا، تكون القطع الموسومة متشققة في نحو تسع مرات من كل عشر، فالشرط اللازم كي تطغى الإنذارات الكاذبة على الصحيحة غائب؛ واللاعب المتسرع سيعترض على قراءة الدقة بوصفها احتمال وجود شق.",
  "A text checker flags about 3% of original essays and nearly all copied ones. On a module where past audits found roughly one submission in five was copied, the tutor treats a flag as good reason to open an investigation rather than as proof.":
    "يشير فاحص نصوص إلى نحو 3% من المقالات الأصلية وإلى جميع المنقولة تقريبًا. وفي مقرر وجدت تدقيقات سابقة أن نحو مادة واحدة من كل خمس مقدمة فيه منقولة، يعامل المدرس الإشارة سببًا وجيهًا لفتح تحقيق لا دليلًا قاطعًا.",
  "Copying is common enough here that a flag makes it much more likely than not, and the conclusion drawn is only to investigate; a hasty player would accuse the tutor of reading the checker's accuracy as the chance of copying.":
    "النقل شائع هنا بما يكفي ليجعل الإشارة أرجح من نقيضها، والاستنتاج المستخلص هو التحقيق فحسب؛ واللاعب المتسرع سيتهم المدرس بقراءة دقة الفاحص بوصفها احتمال النقل.",
  "An online grocer picks half its customers at random to receive a free delivery voucher and holds the rest back. Over the next three months the voucher group spends more, and the company reports that the voucher raised spending.":
    "يختار متجر بقالة إلكتروني نصف عملائه بالتعشية لتلقي قسيمة توصيل مجاني ويحتفظ بالبقية دون قسيمة. وخلال الأشهر الثلاثة التالية تنفق مجموعة القسيمة أكثر، وتفيد الشركة بأن القسيمة رفعت الإنفاق.",
  "Chance decided who got a voucher, so the difference cannot come from the sort of customer who would have sought one out; a hasty player would accuse the grocer of reading cause off an association.":
    "الصدفة هي التي قررت من يحصل على قسيمة، فلا يمكن أن يأتي الفارق من نوع العميل الذي كان سيسعى إليها؛ واللاعب المتسرع سيتهم المتجر بقراءة سببية من ارتباط.",
  "A council can afford to relight only twelve of its forty districts this year and draws the twelve by lot. Night collisions then fall in the relit districts over the following year and hold steady in the rest, and the council credits the lighting.":
    "لا تستطيع بلدية تحمل إعادة إنارة سوى اثنتي عشرة من أحيائها الأربعين هذا العام، فتسحب الاثنتي عشرة بالقرعة. ثم تنخفض حوادث الليل في الأحياء المعاد إنارتها خلال السنة التالية وتبقى ثابتة في البقية، وتنسب البلدية الفضل إلى الإنارة.",
  "The lot decided which districts were treated, so the untouched districts are a fair comparison over the same period; a hasty player would dismiss it as a before and after story with no control.":
    "القرعة هي التي حددت أي الأحياء عولجت، فالأحياء التي لم تمس مقارنة عادلة على المدة نفسها؛ واللاعب المتسرع سيصرفها بوصفها حكاية قبل وبعد بلا مجموعة ضابطة.",
  "A district notes that schools running more after school clubs have better attendance. Its report says the two go together, adds that clubs are commoner in better funded schools, and asks for a small trial before any wider rollout.":
    "تلاحظ منطقة تعليمية أن المدارس التي تدير أنشطة لا صفية أكثر لديها حضور أفضل. ويقول تقريرها إن الأمرين يترافقان، ويضيف أن الأنشطة أشيع في المدارس الأفضل تمويلًا، ويطلب تجربة صغيرة قبل أي توسع.",
  "The report stops at an association, names the obvious alternative explanation, and calls for an experiment instead of acting; a hasty player would accuse it of proposing a rollout on the strength of a pattern.":
    "يتوقف التقرير عند الارتباط ويسمي التفسير البديل الواضح ويدعو إلى تجربة بدل التصرف؛ واللاعب المتسرع سيتهمه باقتراح توسع استنادًا إلى نمط.",
  "A fund publishes the average return across every company it backed in its first five years, including the fourteen that closed and the four sold at a loss, and states how each was valued.":
    "ينشر صندوق متوسط العائد عبر كل شركة موّلها في سنواته الخمس الأولى، بما في ذلك الأربع عشرة التي أغلقت والأربع التي بيعت بخسارة، ويوضح كيف قُيِّمت كل واحدة.",
  "The failures sit in the denominator beside the successes, so the average is not computed from the companies that lasted; a hasty player would assume only the winners were counted.":
    "الإخفاقات موجودة في المقام إلى جانب النجاحات، فالمتوسط ليس محسوبًا من الشركات التي بقيت؛ واللاعب المتسرع سيفترض أن الرابحين وحدهم أُحصوا.",
  "A flying school reports what share of trainees reach a licence. The figure counts everyone who enrolled in a given year, including those who left partway through and those who failed the final check.":
    "تفيد مدرسة طيران بحصة المتدربين الذين يبلغون الرخصة. ويحسب الرقم كل من التحق في سنة معينة، بمن فيهم من انسحبوا في منتصف الطريق ومن رسبوا في الفحص النهائي.",
  "The denominator is the entry cohort rather than the group who finished, so leavers cannot inflate the pass rate; a hasty player would assume the number came only from trainees still flying.":
    "المقام هو دفعة الالتحاق لا مجموعة من أنهوا، فالمنسحبون لا يمكن أن يضخموا معدل النجاح؛ واللاعب المتسرع سيفترض أن الرقم جاء من المتدربين الذين ما زالوا يطيرون فقط.",
  "A manufacturer reports pump faults per thousand units sold, taking faults from the warranty claim file and the denominator from the sales register rather than from the units brought into its workshops. This year's model comes out ahead of last year's on the same two sources.":
    "تفيد جهة تصنيع بأعطال المضخات لكل ألف وحدة مباعة، مأخوذة الأعطال من ملف مطالبات الضمان والمقام من سجل المبيعات لا من الوحدات التي جلبت إلى ورشها. ويخرج طراز هذا العام متقدمًا على طراز العام الماضي بناء على المصدرين نفسيهما.",
  "Every unit sold sits in the denominator, including those that never came back, so neither year's rate is computed only among the pumps that turned up for repair; a hasty player would assume the figures came from the workshop queue.":
    "كل وحدة مباعة موجودة في المقام، بما فيها التي لم تعد قط، فلا يحسب معدل أي من العامين بين المضخات التي وصلت للتصليح فقط؛ واللاعب المتسرع سيفترض أن الأرقام جاءت من طابور الورشة.",
  "An examiner testifies that the tyre pattern from the scene appears on about one van in three hundred, and adds that with roughly nine hundred vans registered in the area, some three of them would carry the same pattern.":
    "يشهد خبير بأن نقش الإطار المأخوذ من موقع الحادث يوجد في نحو شاحنة صغيرة واحدة من كل ثلاثمئة، ويضيف أنه مع وجود نحو تسعمئة شاحنة صغيرة مسجلة في المنطقة، فإن ثلاثًا منها تقريبًا تحمل النقش نفسه.",
  "The rarity figure is turned into how many other vehicles would match, presenting the mark as narrowing the field rather than as a chance of innocence; a hasty player would expect the small number to be flipped into a probability of guilt.":
    "رقم الندرة يحول إلى عدد المركبات الأخرى التي ستطابق، فيقدم الأثر بوصفه تضييقًا للدائرة لا احتمالًا للبراءة؛ واللاعب المتسرع سيتوقع قلب الرقم الصغير إلى احتمال إدانة.",
  "An auditor finds that one clerk's rounding pattern would arise by chance in about one month in five hundred. Noting that two hundred clerks were reviewed across twelve months, the auditor asks for a routine check of that ledger rather than a referral.":
    "يجد مدقق حسابات أن نمط التقريب لدى أحد الكتبة يظهر بالصدفة في نحو شهر واحد من كل خمسمئة. وإذ يلاحظ أن مئتي كاتب روجعوا على مدى اثني عشر شهرًا، يطلب المدقق فحصًا روتينيًا لذلك الدفتر بدل الإحالة.",
  "Across 2,400 clerk months such a pattern is expected several times by chance, and the response is scaled to that; a hasty player would accuse the auditor of treating a rare coincidence as evidence of wrongdoing.":
    "عبر 2,400 شهر كاتب، يتوقع ظهور نمط كهذا عدة مرات بالصدفة، والاستجابة متناسبة مع ذلك؛ واللاعب المتسرع سيتهم المدقق بمعاملة مصادفة نادرة على أنها دليل مخالفة.",
  "An investigator reports that this claim pattern is about forty times more likely when a claim is fraudulent than when it is honest. Since roughly one claim in a thousand is fraudulent, she puts the chance this one is fraudulent at about one in twenty five and opens a file.":
    "تفيد محققة بأن نمط المطالبة هذا أرجح بنحو أربعين مرة حين تكون المطالبة احتيالية منه حين تكون نزيهة. وبما أن نحو مطالبة واحدة من كل ألف احتيالية، فإنها تقدر احتمال كون هذه المطالبة احتيالية بنحو واحد من خمسة وعشرين وتفتح ملفًا.",
  "The strength of the evidence is combined with how common fraud is, giving the chance of fraud given the pattern rather than the reverse; a hasty player would expect the forty fold figure itself to be quoted as the odds of guilt.":
    "قوة الدليل تدمج مع مدى شيوع الاحتيال، فتعطي احتمال الاحتيال بمعلومية النمط لا العكس؛ واللاعب المتسرع سيتوقع أن يذكر رقم الأربعين ضعفًا نفسه بوصفه أرجحية الإدانة.",
  "A youth league keeps the same clubs in the same two divisions for two seasons running, with no promotions or relegations in between. Average match attendance rose in both divisions in the second season.":
    "يبقي دوري للناشئين الأندية نفسها في الدرجتين نفسيهما لموسمين متتاليين، دون أي صعود أو هبوط بينهما. وارتفع متوسط حضور المباريات في الدرجتين في الموسم الثاني.",
  "No club moved between divisions, so a rise in both cannot come from shuffling teams from one group into the other; a hasty player would suspect the categories had been rearranged between the seasons.":
    "لم ينتقل أي نادٍ بين الدرجتين، فلا يمكن أن يأتي الارتفاع في الاثنتين من نقل فرق من مجموعة إلى أخرى؛ واللاعب المتسرع سيشك في أن الفئات أعيد ترتيبها بين الموسمين.",
  "A council changed how it grades road defects in 2023. To compare repair times with 2019, it first re-graded every 2019 record under the current rules, then compared grade by grade.":
    "غيرت بلدية طريقة تصنيفها لعيوب الطرق في 2023. ولمقارنة أزمنة الإصلاح مع 2019، أعادت أولًا تصنيف كل سجل من 2019 وفق القواعد الحالية، ثم قارنت درجة بدرجة.",
  "Both years are sorted by identical rules, so an improvement within a grade cannot be produced by defects sliding between grades; a hasty player would assume the new grading had quietly reshuffled the categories.":
    "السنتان مفروزتان بقواعد متطابقة، فلا يمكن أن ينتج تحسن داخل درجة عن انزلاق العيوب بين الدرجات؛ واللاعب المتسرع سيفترض أن التصنيف الجديد أعاد خلط الفئات في صمت.",
  "A rail operator fits sensors that pick up bearing wear months before a bearing would fail in service. In the two years after fitting, in service bearing failures per million miles run fell by about a third.":
    "يركب مشغل سكك حديدية حساسات تلتقط تآكل المحامل قبل شهور من عطبها في الخدمة. وخلال السنتين التاليتين للتركيب، انخفضت أعطال المحامل في الخدمة لكل مليون ميل مقطوع بنحو الثلث.",
  "The measure is how often failures occur per mile, not how long the operator knew about a fault beforehand, so spotting problems earlier cannot by itself move the number; a hasty player would assume earlier detection was doing the work.":
    "المقياس هو معدل وقوع الأعطال لكل ميل، لا المدة التي عرف فيها المشغل بالعطل مسبقًا، فرصد المشكلات مبكرًا لا يستطيع وحده أن يحرك الرقم؛ واللاعب المتسرع سيفترض أن الكشف المبكر هو ما يقوم بالعمل.",
  "A team installs monitoring that alerts it to outages far sooner. Its quarterly report measures the time from the first affected customer request, taken from server logs, to full recovery, and shows that this fell after the tool went in.":
    "يركب فريق نظام مراقبة ينبهه إلى الانقطاعات أبكر بكثير. ويقيس تقريره الفصلي المدة من أول طلب عميل متأثر، مأخوذًا من سجلات الخادم، حتى التعافي الكامل، ويظهر أن هذه المدة انخفضت بعد تشغيل الأداة.",
  "The clock starts at the moment of impact rather than at detection, so learning of an outage earlier cannot stretch the measured interval; a hasty player would assume earlier alerts manufactured the improvement.":
    "تبدأ الساعة عند لحظة التأثر لا عند الكشف، فمعرفة الانقطاع مبكرًا لا تستطيع أن تمدد المدة المقاسة؛ واللاعب المتسرع سيفترض أن التنبيهات المبكرة صنعت التحسن.",
  "A lender builds a repayment risk model and tests it on applicants from the same branches, income range and loan sizes where it will be used. Accuracy is reported separately for applicants with long credit histories and for those with almost none.":
    "يبني مقرض نموذجًا لمخاطر السداد ويختبره على متقدمين من الفروع ومدى الدخل وأحجام القروض نفسها التي سيستخدم فيها. وتذكر الدقة على حدة للمتقدمين ذوي التاريخ الائتماني الطويل ولمن لا تاريخ لهم يذكر.",
  "The test population matches the one the model will run on and performance is broken out by how hard the cases are, so a figure earned on an easier mix is not being carried across; a hasty player would assume it was validated on obvious cases.":
    "مجتمع الاختبار يطابق المجتمع الذي سيعمل عليه النموذج والأداء مفصل بحسب صعوبة الحالات، فلا ينقل رقم اكتسب على خليط أسهل؛ واللاعب المتسرع سيفترض أن التحقق جرى على حالات بديهية.",
  "A soil test's published accuracy came from severely degraded plots. Before recommending it, a co-op ran the test again on ordinary member farms and quotes those second figures, not the original ones, in its guidance.":
    "جاءت الدقة المنشورة لفحص التربة من قطع أرض شديدة التدهور. وقبل التوصية به، أعادت جمعية تعاونية إجراء الفحص على مزارع أعضاء عادية وتذكر تلك الأرقام الثانية، لا الأصلية، في إرشاداتها.",
  "The test was measured again in the ordinary fields where it will actually be used, so the easy contrast of the original setting is not passed off as everyday performance; a hasty player would attack the original validation.":
    "أعيد قياس الفحص في الحقول العادية التي سيستخدم فيها فعلًا، فلا يمرر التباين السهل في السياق الأصلي على أنه الأداء اليومي؛ واللاعب المتسرع سيهاجم التحقق الأصلي.",
  "An inspection rig's detection rate was measured on cracks longer than two millimetres. The report says so plainly, notes that shorter cracks were not tested, and the plant uses the rig only as a check on the longer class.":
    "قيس معدل الكشف لمنصة فحص على شقوق يزيد طولها على ملليمترين. ويقول التقرير ذلك صراحة ويشير إلى أن الشقوق الأقصر لم تختبر، ولا يستخدم المصنع المنصة إلا للتحقق من الفئة الأطول.",
  "The stated accuracy stays tied to the crack sizes it was measured on and use is limited to that range, so it is never applied to a harder mix; a hasty player would accuse the plant of importing a number from an easy test set.":
    "تبقى الدقة المعلنة مرتبطة بأحجام الشقوق التي قيست عليها والاستخدام محصور في ذلك المدى، فلا تطبق قط على خليط أصعب؛ واللاعب المتسرع سيتهم المصنع باستيراد رقم من مجموعة اختبار سهلة.",
  "A firm asks whether its coding test score and its interview rating agree. Both are recorded for every applicant before any shortlist is drawn, and across all applicants the two rise together mildly.":
    "تسأل شركة عما إذا كانت درجة اختبار البرمجة لديها وتقييم المقابلة متوافقين. وتسجل الدرجتان لكل متقدم قبل وضع أي قائمة مختصرة، وعبر جميع المتقدمين ترتفع الدرجتان معًا ارتفاعًا طفيفًا.",
  "The pair is measured on everyone who applied rather than only on those who cleared a bar that both scores helped set, so selection cannot manufacture the relationship; a hasty player would assume the sample had been filtered on both.":
    "يقاس الزوج على كل من تقدم لا على من تجاوزوا عتبة ساهمت الدرجتان في وضعها، فلا يستطيع الانتقاء أن يصنع العلاقة؛ واللاعب المتسرع سيفترض أن العينة صفيت على الاثنتين.",
  "A county register covering every resident, not only those who were admitted somewhere, reports that two conditions occur together a little more often than chance alone would give.":
    "يفيد سجل إقليمي يغطي كل المقيمين، لا من أدخلوا مستشفى فحسب، بأن حالتين تقعان معًا بمعدل أعلى قليلًا مما تعطيه الصدفة وحدها.",
  "The pattern comes from the whole resident population rather than from people filtered in by admission, so it is not an artefact of both conditions raising the odds of being in the sample; a hasty player would assume a hospital roster.":
    "النمط مستمد من مجموع السكان المقيمين لا من أشخاص صفاهم الإدخال إلى المستشفى، فهو ليس أثرًا مصطنعًا لكون كل من الحالتين ترفع أرجحية الوجود في العينة؛ واللاعب المتسرع سيفترض قائمة مستشفى.",
  "A safety body reports that the new helmet standard cut serious head injuries by about a quarter, and adds that in the riders studied this meant roughly 12 serious injuries per 10,000 a year falling to about 9.":
    "تفيد هيئة سلامة بأن معيار الخوذ الجديد خفض إصابات الرأس الخطيرة بنحو الربع، وتضيف أن هذا يعني لدى السائقين المدروسين انخفاضًا من نحو 12 إصابة خطيرة لكل 10,000 سنويًا إلى نحو 9.",
  "The proportional figure is given with the counts it came from, so the size of the benefit cannot be inflated in the reader's head; a hasty player would object to the percentage before noticing the numbers behind it.":
    "الرقم النسبي معطى مع الأعداد التي جاء منها، فلا يمكن تضخيم حجم الفائدة في ذهن القارئ؛ واللاعب المتسرع سيعترض على النسبة المئوية قبل أن يلاحظ الأرقام وراءها.",
  "A vendor's brochure says its filter cuts successful phishing by about 60%, and states directly below that in the trial this was 12 staff in every 1,000 falling to about 5 over a year.":
    "يقول كتيب أحد الموردين إن مرشحه يخفض عمليات التصيد الناجحة بنحو 60%، وينص مباشرة تحت ذلك على أن هذا كان في التجربة انخفاضًا من 12 موظفًا من كل 1,000 إلى نحو 5 خلال سنة.",
  "The relative claim is anchored to absolute numbers in the same place, letting the reader see how large the change really is; a hasty player would reject the headline percentage as unanchored marketing.":
    "الادعاء النسبي مثبت بأرقام مطلقة في الموضع نفسه، مما يتيح للقارئ رؤية حجم التغير الحقيقي؛ واللاعب المتسرع سيرفض النسبة المئوية في العنوان بوصفها تسويقًا بلا مرجع.",
  "A drink maker's label gives the trial counts behind its claim, 14 cases of a stomach complaint among 5,000 users of the new formula against 18 among 5,000 of the old, and calls the difference small and not certain.":
    "تورد ملصقة أحد صانعي المشروبات أعداد التجربة وراء ادعائها، 14 حالة اضطراب معدي بين 5,000 مستخدم للتركيبة الجديدة مقابل 18 بين 5,000 مستخدم للقديمة، وتصف الفارق بأنه صغير وغير مؤكد.",
  "The counts are shown and the conclusion is scaled down to match them rather than being dressed up as a 22% reduction; a hasty player would expect a percentage to be doing the persuading.":
    "الأعداد معروضة والاستنتاج مصغر بما يناسبها بدل تزيينه بوصفه انخفاضًا قدره 22%؛ واللاعب المتسرع سيتوقع أن تكون نسبة مئوية هي أداة الإقناع.",
  "Two painkillers are compared using patients who started one or the other for the same recorded complaint, at the same clinics, restricted to people who had taken neither before. Side effect rates come out similar.":
    "تجري مقارنة بين مسكنين للألم باستخدام مرضى بدؤوا أحدهما أو الآخر للشكوى المسجلة نفسها، في العيادات نفسها، مع الاقتصار على من لم يتناولوا أيًا منهما من قبل. وتخرج معدلات الآثار الجانبية متقاربة.",
  "Comparing first time users of two drugs given for the same complaint means both groups were treated for the same reason, so the reason for prescribing is not what separates them; a hasty player would assume sicker patients got one of the drugs.":
    "مقارنة المستخدمين لأول مرة لدوائين يعطيان للشكوى نفسها تعني أن المجموعتين عولجتا للسبب نفسه، فسبب الوصف ليس ما يفرق بينهما؛ واللاعب المتسرع سيفترض أن المرضى الأكثر اعتلالًا حصلوا على أحد الدواءين.",
  "More pupils apply for extra tutoring than a council can fund, so places are drawn by lot. The evaluation compares later grades between pupils who were drawn and pupils who applied but were not.":
    "يتقدم للدروس الإضافية عدد من التلاميذ أكبر مما تستطيع البلدية تمويله، فتوزع المقاعد بالقرعة. ويقارن التقييم الدرجات اللاحقة بين التلاميذ الذين سحبوا والتلاميذ الذين تقدموا ولم يسحبوا.",
  "Everyone in both groups wanted the tutoring and only chance decided who received it, so the tutored pupils are not the ones judged to need it most; a hasty player would assume places went to those struggling hardest.":
    "الجميع في المجموعتين أرادوا الدروس والصدفة وحدها قررت من يتلقاها، فالتلاميذ المدروسون ليسوا من حكم بأنهم الأشد حاجة؛ واللاعب المتسرع سيفترض أن المقاعد ذهبت إلى الأكثر تعثرًا.",
  "A haulier puts a new engine oil in every truck whose fleet number ends in an even digit and keeps the rest on the old oil. After a year it compares breakdown rates between the two halves.":
    "يضع ناقل بري زيت محرك جديدًا في كل شاحنة ينتهي رقمها في الأسطول برقم زوجي ويبقي البقية على الزيت القديم. وبعد سنة يقارن معدلات الأعطال بين النصفين.",
  "The last digit is arbitrary and has nothing to do with a truck's age or condition, so the treated trucks are not the ones a mechanic thought needed help; a hasty player would assume the worst trucks were picked for the new oil.":
    "الرقم الأخير اعتباطي ولا علاقة له بعمر الشاحنة أو حالتها، فالشاحنات المعالجة ليست تلك التي رأى ميكانيكي أنها بحاجة إلى مساعدة؛ واللاعب المتسرع سيفترض أن أسوأ الشاحنات اختيرت للزيت الجديد.",
  "A region that began offering a regular check reports how many residents per 100,000 are found with advanced disease each year. That figure falls over the following decade while neighbouring regions stay flat.":
    "تفيد منطقة بدأت تقديم فحص دوري بعدد المقيمين لكل 100,000 الذين يكتشف لديهم مرض متقدم كل سنة. وينخفض ذلك الرقم على مدى العقد التالي بينما يبقى ثابتًا في المناطق المجاورة.",
  "Fewer advanced cases arising in the whole population cannot be produced by a check that merely finds slow growing cases sooner; a hasty player would expect survival among detected cases to be the number on offer.":
    "انخفاض عدد الحالات المتقدمة الناشئة في مجموع السكان لا يمكن أن ينتج عن فحص يكتفي بإيجاد الحالات البطيئة النمو أبكر؛ واللاعب المتسرع سيتوقع أن يكون الرقم المعروض هو البقيا بين الحالات المكتشفة.",
  "An analyst measuring how long support tickets stay open takes every ticket opened in a given month last year and follows each one to its closure, rather than looking at the tickets sitting in the queue today.":
    "يأخذ محلل يقيس مدة بقاء تذاكر الدعم مفتوحة كل تذكرة فتحت في شهر معين من العام الماضي ويتابع كل واحدة حتى إغلاقها، بدل النظر إلى التذاكر القابعة في الطابور اليوم.",
  "Sampling by opening date gives quick and slow tickets the same chance of entering the sample, while a snapshot of the queue would be crowded with the ones that linger; a hasty player would assume the long cases dominate.":
    "أخذ العينة بحسب تاريخ الفتح يعطي التذاكر السريعة والبطيئة الفرصة نفسها لدخول العينة، بينما ستكون لقطة الطابور مزدحمة بالتذاكر التي تتلكأ؛ واللاعب المتسرع سيفترض أن الحالات الطويلة هي الغالبة.",
  "A national medicines agency reviews a treatment using every trial the maker was required to file with it, including three whose results were never written up anywhere, and pools them all.":
    "تراجع وكالة أدوية وطنية علاجًا مستخدمة كل تجربة كان الصانع ملزمًا بإيداعها لديها، بما في ذلك ثلاث لم تكتب نتائجها في أي مكان، وتجمعها كلها.",
  "The pool is defined by what had to be filed rather than by what reached a journal, so dull results are still in it; a hasty player would assume the review was built from the literature.":
    "المجموعة محددة بما وجب إيداعه لا بما بلغ مجلة، فالنتائج الباهتة ما زالت فيها؛ واللاعب المتسرع سيفترض أن المراجعة بنيت من الأدبيات المنشورة.",
  "A product team's quarterly memo lists the outcome of all forty tests it ran that quarter, including the twenty seven that moved nothing, alongside the four whose results it acted on.":
    "تسرد المذكرة الفصلية لفريق منتج نتيجة الاختبارات الأربعين كلها التي أجراها ذلك الربع، بما في ذلك السبعة والعشرون التي لم تحرك شيئًا، إلى جانب الأربعة التي تصرف بناء على نتائجها.",
  "Every experiment run is reported, so the ones that worked are read against the full set of attempts; a hasty player would assume only the wins were written up.":
    "كل تجربة أجريت مذكورة، فتقرأ التي نجحت في مقابل مجموع المحاولات؛ واللاعب المتسرع سيفترض أن الانتصارات وحدها كتبت.",
  "Before averaging fifteen field trials of a fertiliser, an analyst compares the small trials with the large ones and notes that the small ones landed below the overall average as often as above it.":
    "قبل حساب متوسط خمس عشرة تجربة حقلية لسماد، يقارن محلل التجارب الصغيرة بالكبيرة ويشير إلى أن الصغيرة وقعت تحت المتوسط العام بقدر ما وقعت فوقه.",
  "The check for missing unfavourable small studies was made and came out clean, which is the very thing that would otherwise tilt the average; a hasty player would assume the small trials were the ones cherry picked.":
    "أجري الفحص بحثًا عن دراسات صغيرة غير مواتية مفقودة وخرج سليمًا، وهو تحديدًا ما كان سيميل بالمتوسط لولا ذلك؛ واللاعب المتسرع سيفترض أن التجارب الصغيرة هي التي انتقيت انتقاء.",
  "A city offers a free three month transit pass to a randomly chosen half of newly registered residents. The evaluation compares car trips between everyone offered a pass and everyone not offered, including the third who never collected theirs.":
    "تعرض مدينة تصريح نقل عام مجانيًا لثلاثة أشهر على نصف المقيمين المسجلين حديثًا يختار بالتعشية. ويقارن التقييم رحلات السيارة بين كل من عرض عليه تصريح وكل من لم يعرض عليه، بمن فيهم الثلث الذين لم يستلموا تصريحهم قط.",
  "People are counted in the group they were offered, so those keen enough to collect a pass are not being measured against everybody else; a hasty player would want only the actual pass holders analysed.":
    "يحسب الأشخاص في المجموعة التي عرض عليهم فيها، فلا يقاس المتحمسون بما يكفي لاستلام تصريح في مواجهة الجميع؛ واللاعب المتسرع سيرغب في تحليل حاملي التصاريح الفعليين وحدهم.",
  "A jobs programme evaluation counts every applicant in the group chance assigned them to. For the twenty two who could not be traced at one year, it repeats the sums assuming first that all were unemployed and then that all were working, and the ranking holds either way.":
    "يحسب تقييم برنامج توظيف كل متقدم في المجموعة التي وضعته فيها الصدفة. وبالنسبة إلى الاثنين والعشرين الذين تعذر تتبعهم بعد سنة، يعيد الحسابات مفترضًا أولًا أنهم جميعًا عاطلون ثم أنهم جميعًا يعملون، ويبقى الترتيب كما هو في الحالتين.",
  "Nobody is dropped for being untraceable, and the two extreme assumptions bracket anything the missing answers could have done; a hasty player would assume the untraced were quietly excluded.":
    "لا يستبعد أحد لتعذر تتبعه، والافتراضان المتطرفان يحصران أي أثر كان يمكن للإجابات المفقودة أن تحدثه؛ واللاعب المتسرع سيفترض أن غير المتتبعين استبعدوا في صمت.",
  "A haulage study compares trucks that were fitted with a driver alert system when they were bought against trucks bought without one, counting each truck's mileage from the day it entered service.":
    "تقارن دراسة نقل بري بين شاحنات ركب فيها نظام تنبيه للسائق عند شرائها وشاحنات اشتريت بدونه، مع حساب مسافة كل شاحنة من يوم دخولها الخدمة.",
  "Which group a truck belongs to was settled before its clock started, so no truck has to survive a waiting period in order to count as equipped; a hasty player would assume the fitted trucks were credited with time before fitting.":
    "تحدد المجموعة التي تنتمي إليها الشاحنة قبل أن تبدأ ساعتها، فلا تحتاج أي شاحنة إلى تجاوز فترة انتظار كي تحسب مجهزة؛ واللاعب المتسرع سيفترض أن الشاحنات المجهزة نسبت إليها مدة سابقة على التركيب.",
  "An employer compares staff who passed a certification with those who did not. Each person who passed is matched, at the moment of passing, to a colleague still employed at that point with the same months of service, and both are followed from then on.":
    "يقارن صاحب عمل بين الموظفين الذين اجتازوا شهادة مهنية ومن لم يجتازوها. ويقابل كل من اجتاز، لحظة الاجتياز، بزميل ما زال على رأس عمله عند تلك النقطة وله عدد الشهور نفسه في الخدمة، ويتابع الاثنان من تلك اللحظة.",
  "Follow up starts when the certification is achieved and the matched colleague has already worked the same stretch, so the months spent studying are not credited to the certified group; a hasty player would assume that time was counted.":
    "تبدأ المتابعة عند نيل الشهادة ويكون الزميل المقابل قد عمل المدة نفسها بالفعل، فشهور الدراسة لا تنسب إلى مجموعة الحاصلين على الشهادة؛ واللاعب المتسرع سيفترض أن تلك المدة حسبت.",
  "A study of whether long commutes wear people down uses travel diaries that staff filled in each week through the year, well before anyone knew who would later resign.":
    "تستخدم دراسة عما إذا كان التنقل الطويل إلى العمل يستنزف الناس مفكرات سفر ملأها الموظفون كل أسبوع على مدى السنة، قبل أن يعرف أحد من سيستقيل لاحقًا بوقت طويل.",
  "The exposure was written down as it happened rather than reconstructed afterwards, so knowing the outcome cannot have coloured the answers; a hasty player would assume leavers were asked to look back.":
    "دون التعرض وقت حدوثه بدل إعادة بنائه لاحقًا، فلا يمكن أن تكون معرفة النتيجة قد لونت الإجابات؛ واللاعب المتسرع سيفترض أن المغادرين طلب منهم النظر إلى الوراء.",
  "To ask whether a safety course reduces injuries, an analyst takes attendance from the course register and injuries from the insurer's claim file, matching the two by employee number. Nobody is asked to remember anything.":
    "لبحث ما إذا كانت دورة سلامة تقلل الإصابات، يأخذ محلل الحضور من سجل الدورة والإصابات من ملف مطالبات شركة التأمين، ويطابق الاثنين برقم الموظف. ولا يطلب من أحد أن يتذكر شيئًا.",
  "Both the exposure and the outcome come from records written at the time, so no one's account of the course can be shaped by whether they were later hurt; a hasty player would assume the workers were interviewed.":
    "التعرض والنتيجة كلاهما من سجلات كتبت وقتها، فلا يمكن أن تتشكل رواية أحد عن الدورة بحسب إصابته لاحقًا؛ واللاعب المتسرع سيفترض أن العمال قوبلوا.",
  "Owners of a failed appliance and owners of a working one are asked when they bought it and how often they ran it. Their answers are then compared with till receipts and app usage logs, and the two groups' errors turn out to be the same size and in the same direction.":
    "يسأل مالكو جهاز تعطل ومالكو جهاز يعمل عن موعد شرائه وعدد مرات تشغيله. ثم تقارن إجاباتهم بإيصالات الشراء وسجلات استخدام التطبيق، فيتبين أن أخطاء المجموعتين متساوية في الحجم ومتجهة في الاتجاه نفسه.",
  "The reported histories were checked against records and both groups misremembered equally, so the comparison is not driven by one group searching its memory harder; a hasty player would assume the aggrieved owners overstated their use.":
    "قوبلت التواريخ المذكورة بالسجلات وأخطأت المجموعتان في التذكر بالقدر نفسه، فالمقارنة ليست مدفوعة بمجموعة تنقب في ذاكرتها أكثر؛ واللاعب المتسرع سيفترض أن المالكين المتضررين بالغوا في تقدير استخدامهم.",

  // ---- intention to treat, recall bias, immortal time ----
  "Where every excluded patient had already relapsed":
    "حيث كان كل مريض مستبعَد قد انتكس بالفعل",
  "A trial compared two treatments for opioid dependence in 570 people. Counting only those who actually started the drug they were assigned, the first treatment looked slightly better: 52 percent relapsed against 56 percent. Counting everyone the coin assigned, it was clearly worse, 65 percent against 57 percent. The reason is the cleanest you will find. That first drug can only be started after a full detoxification, or it triggers immediate withdrawal, so 79 of its patients never managed to begin it, against 17 in the other arm. Every single one of those 79 relapsed. Dropping them removed the whole of the treatment's failure.":
    "قارنت تجربة بين علاجين للاعتماد على المواد الأفيونية لدى 570 شخصًا. وباحتساب من بدأوا فعليًا الدواء المخصص لهم فقط، بدا العلاج الأول أفضل قليلًا: انتكس 52 بالمئة مقابل 56 بالمئة. وباحتساب كل من خصصته القرعة، بدا أسوأ بوضوح: 65 بالمئة مقابل 57 بالمئة. والسبب من أوضح ما يكون. فذلك الدواء الأول لا يمكن البدء به إلا بعد إزالة السموم كاملةً، وإلا أحدث أعراض انسحاب فورية، لذلك لم يتمكن 79 من مرضاه من الشروع فيه إطلاقًا، مقابل 17 في الذراع الأخرى. وقد انتكس أولئك الـ 79 جميعًا دون استثناء. وإسقاطهم أزال فشل العلاج بأكمله.",
  "Almost two thirds of the months people spent on this drug brought muscle pain. Is the drug doing it?":
    "قرابة ثلثي الأشهر التي قضاها الناس على هذا الدواء صاحبها ألم عضلي. فهل الدواء هو السبب؟",
  "152 people who had all had muscle trouble on a statin before took part. Each spent up to six two-month stretches on either atorvastatin or an identical dummy tablet, in a random order, without knowing which was which, and said at the end of each stretch whether they had muscle symptoms. Muscle symptoms were reported in 62.5 percent of the stretches on the drug.":
    "شارك 152 شخصًا سبق أن عانوا جميعًا متاعب عضلية مع ستاتين. قضى كل منهم ما يصل إلى ست فترات مدة كل منها شهران، إما على أتورفاستاتين وإما على قرص غُفل مطابق في مظهره، بترتيب عشوائي، دون معرفة أيهما تناول، وأفاد في نهاية كل فترة بما إذا كانت لديه أعراض عضلية. وأُبلغ عن أعراض عضلية في 62.5 بالمئة من الفترات على الدواء.",
  "Is the statin causing the pain?":
    "هل الستاتين هو سبب الألم؟",
  "Two-month stretches with muscle symptoms":
    "فترات الشهرين ذات الأعراض العضلية",
  "Stretches on the statin":
    "الفترات على الستاتين",
  "Stretches on the dummy tablet":
    "الفترات على القرص الغُفل",
  "Dummy":
    "الغُفل",
  "All stretches":
    "كل الفترات",
  "On the drug":
    "على الدواء",
  "Yes, the drug is causing it":
    "نعم، الدواء هو السبب",
  "two thirds of the time":
    "في ثلثي الفترات",
  "No, the pain is not real":
    "لا، الألم غير حقيقي",
  "they are imagining it":
    "إنهم يتوهمونه",
  "The pain is real, and the drug is not causing it":
    "الألم حقيقي، والدواء ليس سببه",
  "compare it with something":
    "قارِنه بشيء آخر",
  "The dummy tablet did almost exactly the same thing.":
    "القرص الغُفل فعل الشيء نفسه تقريبًا.",
  "There was nothing in the other tablet":
    "لم يكن في القرص الآخر أي دواء",
  "The same people, in the same months, taking a tablet with no drug in it, reported muscle symptoms 61.6 percent of the time. Nobody knew which tablet they were on. So the pain was there either way, and the 62.5 percent on the statin is almost entirely a rate of muscle pain in people who ache, not a rate of pain caused by the drug:":
    "الأشخاص أنفسهم، في الأشهر نفسها، حين تناولوا قرصًا لا دواء فيه، أبلغوا عن أعراض عضلية في 61.6 بالمئة من الأوقات. ولم يكن أحد يعرف أي قرص يتناول. فالألم كان موجودًا في الحالتين، ونسبة 62.5 بالمئة على الستاتين هي في مجملها تقريبًا معدل ألم عضلي لدى أشخاص يتألمون، لا معدل ألم يسببه الدواء:",
  "Both tablets":
    "كلا القرصين",
  "That is what a control group is for, and why a rate on its own can never answer the question. Muscle pain is common. It is commoner still in people who have had it before, who are watching for it, and who have been handed a leaflet listing it. The only way to find out what the drug adds is to run the same months without it, which is what this trial did.":
    "لهذا توجد مجموعة الضبط، ولهذا لا يمكن لمعدل بمفرده أن يجيب عن السؤال أبدًا. فالألم العضلي شائع، وهو أشيع لدى من سبق أن أصابهم، ومن يترقبونه، ومن سُلّمت إليهم نشرة تذكره ضمن الأعراض. والسبيل الوحيد لمعرفة ما يضيفه الدواء هو تكرار الأشهر نفسها من دونه، وهو ما فعلته هذه التجربة.",
  "What the second bar is for":
    "ما فائدة العمود الثاني",
  "The nocebo effect":
    "تأثير النوسيبو",
  "A symptom that appears after you start a drug is not evidence the drug caused it, until you know how often the same symptom appears in people taking nothing.":
    "ظهور عَرَض بعد بدء دواء ليس دليلًا على أن الدواء سببه، ما لم تعرف كم مرة يظهر العَرَض نفسه لدى من لا يتناولون شيئًا.",
  "Note carefully what this does not say. The pain is real: these people hurt, and were not pretending. Rare genuine statin muscle injury exists and is a different thing, diagnosed differently. Everyone here had already had muscle trouble on a statin, so this is a selected group rather than the general population. And the trial says nothing at all about whether statins do their job. What it settles is narrower and more useful: for this common complaint, the tablet and the dummy behaved the same.":
    "انتبه جيدًا لما لا تقوله هذه النتيجة. الألم حقيقي: هؤلاء الأشخاص يتألمون فعلًا، ولم يكونوا يتظاهرون. والإصابة العضلية الحقيقية النادرة بسبب الستاتينات موجودة، وهي أمر مختلف يُشخَّص بطريقة أخرى. وجميع من هنا سبق أن عانوا متاعب عضلية مع ستاتين، فهذه مجموعة منتقاة لا عموم الناس. كما أن التجربة لا تقول شيئًا البتة عن كون الستاتينات تؤدي وظيفتها أم لا. وما تحسمه أضيق وأنفع: في هذه الشكوى الشائعة، تصرّف القرص والغُفل بالطريقة نفسها.",
  "Expecting a side effect helps produce it, and being told to watch for one makes you notice sensations you would otherwise have let pass. That is the nocebo effect, the unhappy twin of the placebo effect, and it is not lying or weakness: attention genuinely changes what a body reports, and aches are ordinary enough that everyone has some to find. The reasoning trap around it is simpler than the psychology. Someone starts a drug, a symptom appears, and the two get joined up, because a story with a cause in it is easier to hold than a coincidence. The missing number is always the same one: how often does that symptom turn up in people who did not take the drug? Without it, a side-effect rate is not a measurement of the drug at all, it is a measurement of how common the symptom is in the kind of person who gets prescribed it. This is why blinding matters so much for anything a patient reports. Once someone knows they are on the drug, their symptom reports are partly about the drug and partly about knowing, and the two cannot be separated afterwards. The effect is large enough to reverse conclusions: in trials of the same drug, side-effect rates measured while nobody knew who was taking what are routinely far lower than the rates measured once everyone knows. None of which means a reported side effect should be waved away. It means the question of whether this is the drug gets answered by taking the drug away and putting it back, not by counting how many people on it have the symptom.":
    "توقّع الأثر الجانبي يسهم في حدوثه، وإخبارك بأن تترقبه يجعلك تنتبه إلى أحاسيس كنت ستدعها تمر لولا ذلك. هذا هو تأثير النوسيبو، التوأم التعيس لتأثير الغُفل، وهو ليس كذبًا ولا ضعفًا: فالانتباه يغيّر فعلًا ما يبلّغ عنه الجسد، والأوجاع من العادية بحيث يجد كل إنسان لديه شيئًا منها. أما مصيدة الاستدلال المحيطة به فأبسط من علم النفس. يبدأ شخص دواءً، فيظهر عَرَض، فيُربط الأمران معًا، لأن حكاية فيها سبب أسهل على الذهن من مصادفة. والرقم الغائب هو الرقم نفسه دائمًا: كم مرة يظهر ذلك العَرَض لدى من لم يتناولوا الدواء؟ من دونه لا يكون معدل الآثار الجانبية قياسًا للدواء إطلاقًا، بل قياسًا لمدى شيوع العَرَض لدى نوع الأشخاص الذين يوصف لهم. ولهذا تبلغ التعمية كل هذه الأهمية في أي شيء يبلّغ عنه المريض. فما إن يعرف الشخص أنه على الدواء، حتى تصبح بلاغاته عن الأعراض متعلقة جزئيًا بالدواء وجزئيًا بمعرفته، ولا سبيل للفصل بينهما بعد ذلك. والأثر كبير بما يكفي لقلب الاستنتاجات: ففي تجارب الدواء الواحد، تكون معدلات الآثار الجانبية المقيسة بينما لا يعرف أحد من يتناول ماذا أدنى بكثير، على نحو معتاد، من المعدلات المقيسة بعد أن يعرف الجميع. ولا يعني ذلك كله أن أثرًا جانبيًا مُبلَّغًا عنه ينبغي التغاضي عنه. بل يعني أن سؤال هل هذا هو الدواء يُجاب عنه برفع الدواء ثم إعادته، لا بعدّ كم من متناوليه لديهم العَرَض.",
  "The months with no tablet at all":
    "الأشهر بلا أي قرص إطلاقًا",
  "A companion trial went one better and added a third condition: months on the statin, months on an identical dummy, and months taking nothing whatsoever, all in a random order, with participants rating their symptoms every day. The months on the dummy tablet were nearly as bad as the months on the statin. The months with no tablet were far better than either. Most of the symptom burden, in other words, came from the act of taking a tablet rather than from what was in it, and half the participants restarted a statin afterwards.":
    "ذهبت تجربة مرافقة خطوة أبعد فأضافت حالة ثالثة: أشهر على الستاتين، وأشهر على غُفل مطابق، وأشهر بلا تناول أي شيء البتة، جميعها بترتيب عشوائي، مع تقييم المشاركين لأعراضهم كل يوم. وكانت الأشهر على القرص الغُفل سيئة تقريبًا كالأشهر على الستاتين، بينما كانت الأشهر بلا قرص أفضل بكثير من كلتيهما. أي أن معظم عبء الأعراض جاء من فعل تناول قرص لا مما فيه، وقد عاد نصف المشاركين إلى الستاتين بعد ذلك.",
  "The nocebo effect, a reasoning trap.":
    "تأثير النوسيبو، مصيدة استدلال.",
  "You start a new tablet, and a week later your legs ache. The tablet did it, obviously. Except that aches are common, and expecting one helps you find it. In one trial, people took a statin for some months and an identical tablet with nothing in it for others, without knowing which. They reported muscle pain in 62.5 percent of the months on the drug, and 61.6 percent of the months on the dummy. The pain was real. The drug was not what was causing it. A side-effect rate with nothing to compare it against tells you how common the symptom is, not what the drug does.":
    "تبدأ قرصًا جديدًا، وبعد أسبوع تؤلمك ساقاك. القرص هو السبب، بداهةً. غير أن الأوجاع شائعة، وتوقّعها يعينك على العثور عليها. في إحدى التجارب، تناول أشخاص ستاتينًا في بعض الأشهر وقرصًا مطابقًا لا شيء فيه في أشهر أخرى، دون معرفة أيهما. وأبلغوا عن ألم عضلي في 62.5 بالمئة من الأشهر على الدواء، و61.6 بالمئة من الأشهر على الغُفل. كان الألم حقيقيًا. ولم يكن الدواء هو ما يسببه. معدل أثر جانبي لا شيء يقارَن به يخبرك بمدى شيوع العَرَض، لا بما يفعله الدواء.",
  "The denominators are two-month treatment periods, not people: 152 participants each completed up to six blinded periods, three of atorvastatin 20 mg and three of matching placebo, so 785 periods come from 152 individuals. The paper's own column heading says participants, which is loose wording on its part, and the figures are presented here as periods because that is what they are. For the same reason the paper's odds ratio cannot be recomputed from these four numbers, since one person contributes several periods, so it is not quoted. A person-level figure is also printed: 18 of 200 randomised participants withdrew because of intolerable muscle symptoms while on atorvastatin, against 13 of 200 while on placebo. Participants were recruited precisely because they had had muscle symptoms on a statin before, so this is a selected group and its rates should not be read as rates in the general population.":
    "المقامات هي فترات علاجية مدتها شهران، لا أشخاص: أكمل 152 مشاركًا كل منهم ما يصل إلى ست فترات معمّاة، ثلاث منها بأتورفاستاتين 20 ملغ وثلاث بغُفل مطابق، فجاءت 785 فترة من 152 فردًا. وعنوان العمود في الورقة نفسها يقول مشاركين، وهي صياغة فضفاضة منها، والأرقام معروضة هنا بوصفها فترات لأنها كذلك فعلًا. وللسبب نفسه لا يمكن إعادة حساب نسبة الأرجحية الواردة في الورقة من هذه الأرقام الأربعة، لأن الشخص الواحد يسهم بعدة فترات، ولذلك لم تُقتبس. وهناك أيضًا رقم على مستوى الأشخاص: انسحب 18 من 200 مشارك مُعشّى بسبب أعراض عضلية لا تُحتمل أثناء تناول أتورفاستاتين، مقابل 13 من 200 أثناء تناول الغُفل. وقد جُنّد المشاركون تحديدًا لأنهم عانوا أعراضًا عضلية مع ستاتين من قبل، فهذه مجموعة منتقاة ولا ينبغي قراءة معدلاتها بوصفها معدلات في عموم السكان.",
  "Six months after a wind farm opened, a campaign group posted leaflets asking residents to report headaches and poor sleep. Ninety of the 400 households replied describing such symptoms. The group states that the turbines are making the village ill and wants them switched off.":
    "بعد ستة أشهر من افتتاح مزرعة رياح، وزّعت مجموعة حملات نشرات تطلب من السكان الإبلاغ عن الصداع وسوء النوم. وردّت تسعون من أصل 400 أسرة تصف مثل هذه الأعراض. وتقول المجموعة إن التوربينات تمرض القرية وتريد إيقافها.",
  "Nobody counted headaches and poor sleep in comparable villages with no turbines, where both are common anyway. A leaflet asking people to watch for particular symptoms also changes how many get noticed and reported.":
    "لم يُحصِ أحد الصداع وسوء النوم في قرى مماثلة بلا توربينات، وكلاهما شائع فيها على أي حال. كما أن نشرة تطلب من الناس ترقّب أعراض بعينها تغيّر عدد ما يُلاحَظ منها ويُبلَّغ عنه.",
  "An office replaced its ventilation system and emailed staff that the airflow would feel different. A survey the following month found 38% reporting afternoon tiredness and dry throats. Facilities management concluded the new system was at fault and had it re-engineered.":
    "استبدل مكتب نظام التهوية لديه وأرسل بريدًا إلكترونيًا للموظفين يفيد بأن تدفق الهواء سيبدو مختلفًا. ووجد استطلاع في الشهر التالي أن 38% يبلّغون عن تعب بعد الظهر وجفاف في الحلق. واستنتجت إدارة المرافق أن النظام الجديد هو المسؤول فأعادت هندسته.",
  "The same question was never asked before the change, nor on the floors still running the old system, so there is nothing to say whether 38% is unusual for that building.":
    "لم يُطرح السؤال نفسه قط قبل التغيير، ولا في الطوابق التي ما زالت تعمل بالنظام القديم، فلا شيء يبيّن ما إذا كانت 38% نسبة غير معتادة في ذلك المبنى.",
  "A student unplugs his hall's new wireless router at night and records that he sleeps better on the nights it is off. He tells friends, who try it and agree. The residents' committee asks for the router to be taken out.":
    "يفصل طالب موجّه الشبكة اللاسلكية الجديد في سكنه ليلًا ويسجّل أنه ينام أفضل في الليالي التي يكون فيها مطفأً. ويخبر أصدقاءه، فيجربون ذلك ويوافقونه. وتطلب لجنة السكان إزالة الموجّه.",
  "He knew on every single night whether the router was on, so what he expected could shape both his sleep and how he rated it. The test needs nights where neither he nor whoever flipped the switch knew.":
    "كان يعرف في كل ليلة على حدة ما إذا كان الموجّه يعمل، فما توقّعه قد يشكّل نومه وتقييمه له معًا. والاختبار يحتاج إلى ليالٍ لا يعرف فيها لا هو ولا من يدير المفتاح.",
  "A primary school was repainted over the holidays. In the first week back, 27 pupils were sent home feeling sick. A parents' meeting concluded that fumes from the paint were responsible and called for the classrooms to be stripped.":
    "أُعيد طلاء مدرسة ابتدائية خلال العطلة. وفي الأسبوع الأول بعد العودة، أُرسل 27 تلميذًا إلى منازلهم وهم يشعرون بالتوعك. واستنتج اجتماع لأولياء الأمور أن أبخرة الطلاء هي المسؤولة وطالب بتجريد الفصول منه.",
  "No one checked how many pupils are sent home sick in a normal first week back, or whether nearby schools with no new paint saw the same thing that week.":
    "لم يتحقق أحد من عدد التلاميذ الذين يُرسلون إلى منازلهم مرضى في أسبوع عودة عادي، ولا مما إذا كانت مدارس قريبة بلا طلاء جديد قد شهدت الأمر نفسه ذلك الأسبوع.",
  "A retailer issued a new uniform. After a widely shared staff forum thread about the fabric being itchy, complaints of rashes went from a handful to several hundred in a fortnight. The retailer withdrew the uniform and apologised.":
    "أصدر متجر تجزئة زيًا موحدًا جديدًا. وبعد موضوع في منتدى الموظفين انتشر على نطاق واسع عن كون القماش يسبب الحكة، ارتفعت شكاوى الطفح من حفنة إلى عدة مئات في أسبوعين. وسحب المتجر الزي واعتذر.",
  "The itching is real, but the surge tracks the forum thread rather than the rollout, and rash rates were never compared with branches still wearing the old uniform, where skin complaints also occur.":
    "الحكة حقيقية، لكن الارتفاع يواكب موضوع المنتدى لا إطلاق الزي، ولم تُقارَن معدلات الطفح قط بفروع ما زالت ترتدي الزي القديم، حيث تحدث شكاوى جلدية أيضًا.",
  "An app update's release notes warned that text might look slightly different. Tickets mentioning eye strain tripled that week. The team announced a rollback, tickets returned to normal, and the engineer wrote that the change had been straining users' eyes.":
    "حذّرت ملاحظات إصدار تحديث لتطبيق من أن النص قد يبدو مختلفًا قليلًا. وتضاعفت التذاكر التي تذكر إجهاد العين ثلاث مرات ذلك الأسبوع. وأعلن الفريق التراجع عن التحديث، فعادت التذاكر إلى معدلها المعتاد، وكتب المهندس أن التغيير كان يجهد أعين المستخدمين.",
  "Users told to expect a visual difference went looking for one, and the rollback was announced just as loudly, so both the rise and the fall follow what people were told rather than any measured change on screen.":
    "المستخدمون الذين أُخبروا بتوقّع فرق بصري راحوا يبحثون عنه، وأُعلن التراجع بالقدر نفسه من الصخب، فالارتفاع والانخفاض كلاهما يتبع ما قيل للناس لا أي تغير مقيس على الشاشة.",
  "A taxi firm switched to electric cars and briefed drivers that the smooth one-pedal acceleration can make passengers queasy, asking them to note any complaints. Drivers logged sixty queasy passengers in a month. The firm concluded the cars cause travel sickness and reordered the old fleet.":
    "انتقلت شركة سيارات أجرة إلى سيارات كهربائية وأبلغت السائقين أن التسارع السلس بدواسة واحدة قد يصيب الركاب بالغثيان، وطلبت منهم تسجيل أي شكاوى. وسجّل السائقون ستين راكبًا شعروا بالغثيان في شهر واحد. واستنتجت الشركة أن السيارات تسبب دوار السفر وأعادت طلب الأسطول القديم.",
  "Nobody ever logged queasy passengers in the old fleet, so sixty has nothing to be compared against, and drivers primed to expect complaints will hear and record more of them.":
    "لم يسجّل أحد قط ركابًا يشعرون بالغثيان في الأسطول القديم، فليس لدى الستين ما يقارَن به، والسائقون المهيّؤون لتوقّع الشكاوى سيسمعون منها ويسجّلون أكثر.",
  "A wellness programme tells participants that days two and three will bring headaches, irritability and aching as the body clears itself. Most report exactly that, then feel better. The organiser presents this as proof the programme is doing its work.":
    "يخبر برنامج عافية المشاركين بأن اليومين الثاني والثالث سيجلبان صداعًا وتهيجًا وأوجاعًا بينما يتخلص الجسم من السموم. ويبلّغ معظمهم عن ذلك تمامًا، ثم يتحسنون. ويقدّم المنظّم هذا دليلًا على أن البرنامج يؤدي عمله.",
  "Participants were told precisely which sensations to expect and on which days, and no comparison group followed an ordinary diet or an inert version of the plan. The pattern matches the prediction they were given.":
    "أُخبر المشاركون بدقة بأي الأحاسيس يتوقعون وفي أي الأيام، ولم تتبع أي مجموعة مقارنة نظامًا غذائيًا عاديًا أو نسخة خاملة من الخطة. والنمط يطابق التنبؤ الذي أُعطي لهم.",
  "During a trial's blinded year, muscle aches were reported by 14% on the tablet and 13% on the dummy. Everyone was then told what they had taken and offered the tablet openly; that year one in five reported aches. A patients' group says the harm only shows in real use.":
    "خلال السنة المعمّاة من تجربة، أبلغ عن أوجاع عضلية 14% ممن على القرص و13% ممن على الغُفل. ثم أُخبر الجميع بما تناولوه وعُرض عليهم القرص بشكل مكشوف؛ وفي تلك السنة أبلغ واحد من كل خمسة عن أوجاع. وتقول مجموعة مرضى إن الضرر لا يظهر إلا في الاستعمال الواقعي.",
  "The only thing that changed between the two years is that everyone now knew what they were taking. While nobody knew, the ache rate was the same with the drug and without it.":
    "الشيء الوحيد الذي تغيّر بين السنتين هو أن الجميع صاروا يعرفون ما يتناولون. وحين لم يكن أحد يعرف، كان معدل الأوجاع واحدًا مع الدواء ومن دونه.",
  "A pharmacy moved patients onto an equivalent tablet from a different maker, oval and yellow rather than round and white, sending a letter explaining the change. Reports of dizziness and nausea from those patients rose fivefold over two months, and a newsletter concluded the new version is poorly tolerated.":
    "نقلت صيدلية مرضى إلى قرص مكافئ من صانع مختلف، بيضوي وأصفر بدل مستدير وأبيض، مع إرسال رسالة تشرح التغيير. وارتفعت بلاغات الدوخة والغثيان من أولئك المرضى خمسة أضعاف خلال شهرين، واستنتجت نشرة إخبارية أن النسخة الجديدة سيئة التحمل.",
  "The letter drew attention to the change and gave everyday dizziness something new to be attributed to, and no one measured the rate over the same two months in patients kept on the original tablet.":
    "الرسالة لفتت الانتباه إلى التغيير وأعطت الدوخة اليومية شيئًا جديدًا تُنسب إليه، ولم يقس أحد المعدل خلال الشهرين نفسيهما لدى مرضى أُبقوا على القرص الأصلي.",
  "A retailer had 200 volunteers wear a sleeve of the new cloth on one arm and the old cloth on the other for two weeks, without being told which was which. An assessor who did not know either graded photographs of both arms: visible redness on 31 new-cloth arms and 4 old-cloth arms.":
    "جعل متجر تجزئة 200 متطوع يرتدون كمًّا من القماش الجديد على ذراع والقماش القديم على الأخرى لمدة أسبوعين، دون إخبارهم بأيهما أي. وصنّف مقيّم لا يعرف هو الآخر صورًا للذراعين: احمرار ظاهر على 31 ذراعًا بالقماش الجديد و4 أذرع بالقماش القديم.",
  "Every volunteer carried both fabrics at once without knowing which arm had which, and the redness was graded by someone equally unaware, so what anyone expected cannot account for the gap.":
    "كل متطوع حمل القماشين معًا دون معرفة أي ذراع بأيهما، وصُنّف الاحمرار على يد شخص لا يعرف كذلك، فما توقعه أي أحد لا يفسّر الفارق.",
  "A man's back pain began after a new mattress arrived. His partner swapped the old and new mattresses under identical covers on a schedule he never saw, three times across six weeks. His pain scores were high on every new-mattress stretch and low on every old-mattress stretch.":
    "بدأ ألم ظهر رجل بعد وصول مرتبة جديدة. وبدّل شريكه بين المرتبة القديمة والجديدة تحت أغطية متطابقة وفق جدول لم يره قط، ثلاث مرات على مدى ستة أسابيع. وكانت درجات ألمه مرتفعة في كل فترة بالمرتبة الجديدة ومنخفضة في كل فترة بالمرتبة القديمة.",
  "The mattress was removed and returned repeatedly while he had no way of knowing which one he was lying on, so his expectations could not have followed the pattern his pain followed.":
    "أُزيلت المرتبة وأُعيدت مرارًا بينما لم يكن لديه سبيل لمعرفة أيهما ينام عليها، فلم يكن بوسع توقعاته أن تتبع النمط الذي تبعه ألمه.",
  "A housing committee reviewing a new communal heating system logged 46 residents reporting headaches and dry eyes. Its report states that no similar block without the system was surveyed, that nobody knows how common these complaints were beforehand, and that it therefore cannot say the system is the cause.":
    "سجّلت لجنة إسكان تدرس نظام تدفئة مشتركًا جديدًا 46 ساكنًا يبلّغون عن صداع وجفاف في العينين. ويذكر تقريرها أنه لم يُستطلع أي مجمع مماثل بلا هذا النظام، وأن أحدًا لا يعرف مدى شيوع هذه الشكاوى قبل ذلك، وأنها لذلك لا تستطيع القول إن النظام هو السبب.",
  "The committee reports the count it actually has and stops there, because with no comparable block and no before figure a complaint total on its own supports no causal claim.":
    "تُبلغ اللجنة بالعدد الذي لديها فعلًا وتقف عند ذلك، لأنه بلا مجمع مماثل وبلا رقم سابق لا يدعم إجمالي الشكاوى وحده أي ادعاء سببي.",
  "In a trial where neither patients nor their doctors knew who was getting what, dry mouth was reported by 44% of those on the drug and 6% of those on the dummy tablet. The report lists dry mouth as a side effect of the drug.":
    "في تجربة لم يكن فيها المرضى ولا أطباؤهم يعرفون من يتلقى ماذا، أبلغ عن جفاف الفم 44% ممن على الدواء و6% ممن على القرص الغُفل. ويدرج التقرير جفاف الفم أثرًا جانبيًا للدواء.",
  "Both groups were equally unaware of what they were taking and equally primed to watch for side effects, so the gap between 44% and 6% is what the drug itself added.":
    "كانت المجموعتان جاهلتين بالتساوي بما تتناولانه ومهيّأتين بالتساوي لترقّب الآثار الجانبية، فالفارق بين 44% و6% هو ما أضافه الدواء نفسه.",
};
