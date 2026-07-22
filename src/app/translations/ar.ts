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
};
