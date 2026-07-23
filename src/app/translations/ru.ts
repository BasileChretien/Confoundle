/**
 * Russian dictionary: English source string, Russian translation. Keys must match
 * the English text exactly. Native review pending; correct in place.
 */
export const ru: Record<string, string> = {
  // ---- UI chrome (buttons, labels, section headers) ----
  "The skill": "Навык",
  "Where this shows up": "Где это встречается",
  "See it in the wild": "Пример из жизни",
  "Why it happens": "Почему так происходит",
  "Same trap, other places": "Та же ловушка в других местах",
  Source: "Источник",
  "Make my card →": "Создать мою карточку →",
  "Go deeper on this idea →": "Углубиться в эту идею →",
  "Commit to see the reveal. No peeking.":
    "Сделайте выбор, чтобы увидеть ответ. Без подглядывания.",
  "Reveal the answer": "Показать ответ",
  "Name the skill →": "Назвать навык →",
  "Play again": "Играть снова",
  "The lurking variable": "Скрытая переменная",
  "Nicely done, you didn't take the number at face value.":
    "Отлично, вы не приняли число за чистую монету.",
  "So does almost everyone. That's exactly the trap.":
    "Как и почти все остальные. Именно в этом и ловушка.",
  "You caught it": "Вы это заметили",
  "Most people miss this": "Большинство этого не замечают",
  "You picked": "Вы выбрали",
  Replay: "Повторить",
  "Who each treatment actually treated":
    "Кого на самом деле лечил каждый метод",
  "So what's the skill? →": "Так в чём же навык? →",
  // scope tags (right of the figure caption)
  Overall: "В целом",
  "By subgroup": "По подгруппам",
  "The facts": "Факты",
  "The reality": "Реальность",
  Observed: "Наблюдаемое",
  Explained: "Объяснение",
  Survivors: "Выжившие",
  "The full picture": "Полная картина",
  // category names (humanized)
  "Causal reasoning": "Причинно-следственное мышление",
  "Statistical reasoning": "Статистическое мышление",
  // tags
  Everyday: "Повседневное",
  Clinical: "Клиника",
  Research: "Исследования",
  Statistics: "Статистика",
  Diagnosis: "Диагностика",
  Screening: "Скрининг",
  Epidemiology: "Эпидемиология",
  Pharmacology: "Фармакология",
  Psychology: "Психология",
  Biology: "Биология",
  Technology: "Технологии",
  Economics: "Экономика",
  Politics: "Политика",
  Education: "Образование",
  Finance: "Финансы",
  Business: "Бизнес",
  Law: "Право",
  Sports: "Спорт",
  History: "История",
  Media: "Медиа",
  "Demo · try any puzzle": "Демо · попробуйте любую головоломку",
  // frequency view (base-rate puzzle)
  "1 in": "1 из",
  "How common it is": "Насколько это распространено",
  "Test catches it": "Тест это выявляет",
  Always: "Всегда",
  "False-alarm rate": "Частота ложных тревог",
  "Positive tests": "Положительные тесты",
  of: "из",
  actually: "на самом деле",
  chance: "вероятность",
  "false alarm": "ложная тревога",
  // wager + stats
  "How sure are you?": "Насколько вы уверены?",
  Hunch: "Догадка",
  "Fairly sure": "Довольно уверен",
  Certain: "Уверен полностью",
  "Pick one, then stake how sure you are":
    "Выберите один, затем поставьте на кон свою уверенность",
  pts: "очк.",
  Today: "Сегодня",
  Streak: "Серия",
  Best: "Рекорд",
  Caught: "Замечено",
  Calibration: "Калибровка",
  "You beat {pct}% of players today":
    "Сегодня вы обошли {pct} % игроков",
  "A new puzzle every day. Keep the streak alive.":
    "Новая головоломка каждый день. Не прерывайте серию.",
  "Sharp eye, and you called it.":
    "Острый глаз, и вы это предсказали.",
  "Nicely spotted.": "Хорошо подмечено.",
  "Good instinct.": "Хорошая интуиция.",
  "Ouch. Confidently wrong, the classic trap.":
    "Ай. Уверенно ошиблись, классическая ловушка.",
  "So does almost everyone. That's the trap.":
    "Как и почти все. В этом и ловушка.",
  "You sensed something was off, but went with it anyway.":
    "Вы чувствовали, что что-то не так, но всё равно на это пошли.",
  // friends board
  "Friends board": "Рейтинг друзей",
  "Your name": "Ваше имя",
  "Copy result": "Скопировать результат",
  Copied: "Скопировано",
  Share: "Поделиться",
  "Paste your friends' results here":
    "Вставьте сюда результаты друзей",
  "Add to board": "Добавить в рейтинг",
  // trap hunt
  "Trap Hunt": "Охота на ловушки",
  "Some of these are sound. Some hide a trap.":
    "Некоторые рассуждения верны. В других спрятана ловушка.",
  "Sound reasoning": "Рассуждение верное",
  "There's a trap": "Здесь ловушка",
  "Which trap?": "Какая ловушка?",
  Rank: "Ранг",
  Done: "Готово",
  "Trap Hunt unlocked": "Охота на ловушки открыта",
  "Can you still spot the traps?":
    "Сможете ли вы и дальше замечать ловушки?",
  Novice: "Новичок",
  Sceptic: "Скептик",
  Detective: "Детектив",
  Analyst: "Аналитик",
  "Sharp eye": "Острый глаз",

  // ---- shared share-card captions ----
  "Caught it. Bet you can't.": "Я это раскусил. Спорим, у вас не получится.",
  "I totally fell for this.": "Я полностью попался на это.",

  // ==== Simpson's paradox (kidney stones) ====
  "Treatment B cures more patients overall. Which would you pick?":
    "Метод B в целом излечивает больше пациентов. Что бы вы выбрали?",
  "Two kidney-stone treatments, 350 patients each. On overall success rate, Treatment B comes out ahead. Same illness, same goal, one number to go on.":
    "Два метода лечения камней в почках, по 350 пациентов каждый. По общей доле успеха впереди метод B. Одна и та же болезнь, одна и та же цель, одно число, на которое можно опереться.",
  "Which treatment would you pick?": "Какой метод лечения вы бы выбрали?",
  "Success rate": "Доля успеха",
  "Treatment A, open surgery": "Метод A, открытая операция",
  "Treatment B, keyhole (PCNL)": "Метод B, чрескожный доступ (ЧНЛ)",
  "Small stones": "Мелкие камни",
  "Large stones": "Крупные камни",
  "Treatment B": "Метод B",
  "83% overall": "83 % в целом",
  "Treatment A": "Метод A",
  "78% overall": "78 % в целом",
  "Treatment A actually wins, for both stone sizes.":
    "На самом деле выигрывает метод A, для камней обоих размеров.",
  "Stone size (case severity)":
    "Размер камней (тяжесть случая)",
  "A and B weren't treating the same patients. A got mostly the hard cases (large stones), while B got mostly the easy ones. Everyone does worse on hard cases, so A's overall average sinks even though A wins in each group:":
    "A и B лечили не одних и тех же пациентов. A достались в основном тяжёлые случаи (крупные камни), а B, в основном лёгкие. На тяжёлых случаях все справляются хуже, поэтому общий средний показатель A проседает, хотя A выигрывает в каждой группе:",
  "Simpson's paradox": "Парадокс Симпсона",
  "An overall trend can reverse once you account for a lurking variable that's split unevenly between the groups.":
    "Общая тенденция может развернуться, как только вы учтёте скрытую переменную, неравномерно распределённую между группами.",
  "Whenever two groups are compared with one pooled rate, ask what got mixed together to make that number, and whether the groups were even up against the same odds. Stone size is the clearest confounder here; it's rarely the only one.":
    "Всякий раз, когда две группы сравнивают по одному объединённому показателю, спросите, что смешали, чтобы получить это число, и были ли у групп вообще одинаковые шансы. Размер камней здесь самый очевидный искажающий фактор; он редко бывает единственным.",
  "The 'combined' score isn't a fresh measurement; it's the group scores blended together, and bigger groups count for more. When one side is packed with easy cases and the other with hard ones, that blend pulls their combined scores in opposite directions. So one option can lead in the easy group and in the hard group, yet still trail overall, because it handled most of the hard cases, and its blended score sits closer to that lower number. The cure is a fair split: give both sides the same mix of easy and hard cases (exactly what a randomised trial does), and the reversal can't happen.":
    "«Общий» показатель, это не новое измерение; это смесь показателей по группам, и более крупные группы весят больше. Когда одна сторона забита лёгкими случаями, а другая тяжёлыми, эта смесь тянет их общие показатели в противоположные стороны. Поэтому один вариант может лидировать и в лёгкой группе, и в тяжёлой, но всё равно отставать в целом, потому что на него пришлось большинство тяжёлых случаев, и его смешанный показатель оказывается ближе к этому более низкому числу. Лекарство, это честное распределение: дайте обеим сторонам одинаковую смесь лёгких и тяжёлых случаев (именно так делает рандомизированное исследование), и разворот станет невозможен.",
  "University admissions": "Приём в университет",
  "In 1973, Berkeley's graduate schools admitted 44% of men but only 35% of women. It looked like plain bias. Yet department by department, women were admitted at about the same rate as men, or higher. Women simply applied more often to the most competitive departments, where almost everyone was turned away. The gap was about where people applied, not who was deciding.":
    "В 1973 году аспирантура Беркли приняла 44 % мужчин, но лишь 35 % женщин. Это выглядело как явная дискриминация. Однако факультет за факультетом женщин принимали примерно с той же долей, что и мужчин, а то и выше. Женщины просто чаще подавали документы на самые конкурсные факультеты, где отказывали почти всем. Разрыв объяснялся тем, куда подавали документы, а не тем, кто принимал решение.",
  "Baseball batting averages": "Средние показатели отбивания в бейсболе",
  "David Justice out-hit Derek Jeter in 1995 (.253 to .250) and again in 1996 (.321 to .314). But over the two seasons combined, Jeter came out ahead, .310 to .270. Each single year said Justice; the two years together said Jeter, because the players had very different numbers of at-bats in their strong and weak seasons.":
    "Дэвид Джастис отбивал лучше Дерека Джитера в 1995 году (0,253 против 0,250) и снова в 1996 году (0,321 против 0,314). Но за два сезона вместе впереди оказался Джитер, 0,310 против 0,270. Каждый отдельный год указывал на Джастиса; два года вместе указывали на Джитера, потому что у игроков было очень разное число выходов на биту в их сильных и слабых сезонах.",
  "COVID-19 death rates": "Показатели смертности от COVID-19",
  "Early in 2020, the reported death rate among COVID cases was higher in Italy than in China overall. But broken down by age, Italy's rate was lower in every age group. Italy simply had far more older patients, who are at higher risk, so pooling all ages together made Italy look worse than a fair, age-for-age comparison showed.":
    "В начале 2020 года зарегистрированная смертность среди случаев COVID в целом была выше в Италии, чем в Китае. Но в разбивке по возрасту итальянский показатель был ниже в каждой возрастной группе. В Италии просто было гораздо больше пожилых пациентов, а они в группе повышенного риска; поэтому объединение всех возрастов делало Италию хуже, чем показывало честное сравнение по одинаковому возрасту.",
  "Simpson's paradox, a reasoning trap.":
    "Парадокс Симпсона, ловушка мышления.",
  "One choice can win in every single group, yet lose the moment you lump all the groups together. It sounds impossible, but it's real. It happens when the groups aren't a fair comparison: one side quietly got the easy cases, the other got the hard ones. So the big combined number says one thing while the group-by-group numbers say the opposite, and it's the big number that fools you.":
    "Один вариант может побеждать в каждой отдельной группе и всё же проиграть, стоит лишь свести все группы вместе. Звучит невозможно, но это правда. Так происходит, когда группы не образуют честного сравнения: одной стороне незаметно достались лёгкие случаи, другой, тяжёлые. И вот большое объединённое число говорит одно, а числа по группам говорят обратное, и обманывает вас именно большое число.",
  "The 350/350 two-treatment table is as presented by Julious & Mullee (1994), drawn from the Charig et al. (1986) clinical series (which originally compared three modalities).":
    "Таблица с двумя методами по 350/350 приводится так, как её представили Джулиус и Малли (1994), на основе клинической серии Чарига и соавт. (1986) (в которой изначально сравнивались три метода).",

  // ==== Base-rate fallacy (medical test) ====
  "A near-perfect test says you're sick. How worried should you be?":
    "Почти идеальный тест говорит, что вы больны. Насколько стоит волноваться?",
  "This disease is rare, about 1 in 1,000 people have it. The test never misses it when it's really there, and it raises a false alarm on only about 1 in 20 healthy people. Your result just came back positive.":
    "Эта болезнь редкая: она есть примерно у 1 человека из 1000. Тест никогда не пропускает её, когда она действительно есть, и даёт ложную тревогу лишь примерно у 1 из 20 здоровых людей. Ваш результат только что оказался положительным.",
  "What's the chance you actually have the disease?":
    "Какова вероятность, что у вас действительно есть эта болезнь?",
  "In 1,000 people": "Среди 1000 человек",
  "have the disease": "больны этой болезнью",
  "test positive": "дают положительный тест",
  "About 95%": "Около 95 %",
  "the test is 95% accurate": "тест точен на 95 %",
  "About half": "Около половины",
  "50/50": "50/50",
  "About 2%": "Около 2 %",
  "roughly 1 in 50": "примерно 1 из 50",
  "Positive, but almost certainly a false alarm.":
    "Положительный, но почти наверняка ложная тревога.",
  "The base rate": "Базовая частота",
  "A rare disease flips the odds":
    "Редкая болезнь переворачивает шансы",
  "Because almost nobody has the disease, the test's small error rate does the heavy lifting. In 1,000 people, only 1 is truly sick, but about 50 healthy people also get a positive. So among the ~51 positive results, just 1 is real. A positive barely nudges you from “very unlikely” to “still unlikely.”":
    "Поскольку болезнь есть почти ни у кого, основную работу делает небольшая доля ошибок теста. Среди 1000 человек по-настоящему болен только 1, но примерно 50 здоровых тоже получают положительный результат. Значит, среди ~51 положительного результата настоящий лишь 1. Положительный тест едва сдвигает вас от «очень маловероятно» к «всё ещё маловероятно».",
  "The base-rate fallacy": "Ошибка базовой частоты",
  "When something is rare, even a very accurate test throws up far more false alarms than real cases, so a positive result can still mean you're probably fine.":
    "Когда что-то встречается редко, даже очень точный тест выдаёт куда больше ложных тревог, чем настоящих случаев, поэтому положительный результат всё равно может означать, что с вами, скорее всего, всё в порядке.",
  "The fix is to think in whole people, not percentages: picture 1,000 of them, count the true positives and the false alarms, and compare. Always ask how common the thing is before you trust a positive.":
    "Решение, это мыслить целыми людьми, а не процентами: представьте 1000 человек, посчитайте истинно положительные и ложные тревоги и сравните. Всегда спрашивайте, насколько распространено явление, прежде чем доверять положительному результату.",
  "A test's accuracy and your actual odds are two different things. Accuracy is measured on people we already know are sick or healthy. But a positive result asks the reverse question (given this positive, am I sick?), and that depends on how many sick people there were to find in the first place. If only 1 in 1,000 has the disease, the huge healthy majority produces a flood of false alarms that swamps the single real case. Make the disease common and the same test looks excellent; make it rare and a positive means little on its own.":
    "Точность теста и ваши реальные шансы, это две разные вещи. Точность измеряют на людях, о которых уже известно, больны они или здоровы. Но положительный результат задаёт обратный вопрос (учитывая этот положительный результат, болен ли я?), и это зависит от того, сколько больных вообще можно было найти. Если болезнь есть лишь у 1 из 1000, огромное здоровое большинство порождает поток ложных тревог, который захлёстывает единственный настоящий случай. Сделайте болезнь распространённой, и тот же тест выглядит превосходно; сделайте её редкой, и положительный результат сам по себе значит мало.",
  "Even doctors slip": "Даже врачи ошибаются",
  "Researchers put this exact question to doctors and medical staff: a disease in 1 in 1,000, a test with a 5% false-alarm rate. The most common answer was 95%. The average was 56%. Only about 1 in 5 gave the correct answer of roughly 2%.":
    "Исследователи задали именно этот вопрос врачам и медицинскому персоналу: болезнь у 1 из 1000, тест с 5 % ложных тревог. Самым частым ответом было 95 %. Среднее составило 56 %. Лишь примерно 1 из 5 дал верный ответ, около 2 %.",
  "Think in people, not percentages":
    "Мыслите людьми, а не процентами",
  "The simplest cure is wording. Pose the same problem in natural frequencies (“1 in 1,000 people” and “about 50 false alarms” rather than “0.1%” and “5%”), and far more people, doctors included, get it right.":
    "Самое простое лекарство, это формулировка. Изложите ту же задачу в естественных частотах («1 человек из 1000» и «около 50 ложных тревог» вместо «0,1 %» и «5 %»), и гораздо больше людей, включая врачей, ответят правильно.",
  "The base-rate fallacy, a reasoning trap.":
    "Ошибка базовой частоты, ловушка мышления.",
  "A test can be 95% accurate and a positive result can still mean you're almost certainly fine. The trick is how rare the thing is. If only 1 in 1,000 people have a disease, then among everyone who tests positive, the few real cases are buried under a pile of false alarms. Accuracy isn't the same as your actual odds; you have to ask how common it is first.":
    "Тест может быть точен на 95 %, и всё же положительный результат может означать, что вы почти наверняка здоровы. Вся хитрость в том, насколько редко встречается явление. Если болезнь есть лишь у 1 человека из 1000, то среди всех, у кого тест положительный, немногие настоящие случаи погребены под грудой ложных тревог. Точность, это не то же самое, что ваши реальные шансы; сначала нужно спросить, насколько это распространено.",

  // ==== Correlation is not causation (chocolate / Nobel) ====
  "More chocolate, more Nobel Prizes. Should your country stock up?":
    "Больше шоколада, больше Нобелевских премий. Стоит ли вашей стране запасаться?",
  "It's a real, published finding: across 23 countries, the more chocolate people eat, the more Nobel laureates the country has produced, a strong correlation (r ≈ 0.79). The trend is hard to argue with.":
    "Это реальный опубликованный результат: в 23 странах чем больше люди едят шоколада, тем больше нобелевских лауреатов дала страна, сильная корреляция (r ≈ 0,79). С этой тенденцией трудно спорить.",
  "So, does eating chocolate help win Nobel Prizes?":
    "Итак, помогает ли поедание шоколада выигрывать Нобелевские премии?",
  "Across 23 countries": "В 23 странах",
  "Chocolate eaten": "Съедено шоколада",
  "Nobel prizes": "Нобелевские премии",
  "A country's wealth": "Богатство страны",
  "r ≈ 0.79": "r ≈ 0,79",
  "Yes, chocolate boosts brainpower":
    "Да, шоколад развивает умственные способности",
  "the trend is strong": "тенденция сильная",
  "No, it's a pure fluke": "Нет, это чистая случайность",
  coincidence: "совпадение",
  "No, a third thing drives both":
    "Нет, на обе величины влияет нечто третье",
  "a common cause": "общая причина",
  "The chocolate isn't doing anything.": "Шоколад тут ни при чём.",
  "The common cause": "Общая причина",
  "A country's wealth pulls both up":
    "Богатство страны поднимает обе величины",
  "Wealthier countries can afford more chocolate AND fund more universities, labs and research, which is what actually wins Nobel Prizes. Wealth drives both, so chocolate and Nobels rise together without one causing the other. Hand out free chocolate and you'd get sweeter teeth, not more laureates.":
    "Более богатые страны могут позволить себе больше шоколада И финансировать больше университетов, лабораторий и исследований, а именно это и приносит Нобелевские премии. Богатство влияет на обе величины, поэтому шоколад и премии растут вместе, но одно не является причиной другого. Раздайте бесплатный шоколад, и вы получите больше сладкоежек, а не больше лауреатов.",
  "Correlation ≠ causation": "Корреляция ≠ причинность",
  "Two things moving together doesn't mean one causes the other. Often a third thing is quietly driving both.":
    "Если две величины меняются вместе, это не значит, что одна вызывает другую. Часто на обе незаметно влияет нечто третье.",
  "When you see a strong link, run through the possibilities before believing X causes Y: maybe Y causes X, maybe a common cause drives both, or maybe it's chance. Usually only a controlled comparison can tell which.":
    "Увидев сильную связь, переберите возможности, прежде чем поверить, что X вызывает Y: может быть, Y вызывает X, может быть, на обе величины влияет общая причина, а может быть, это случайность. Обычно только контролируемое сравнение позволяет понять, что именно.",
  "A correlation only says two things tend to move together. That can happen for several reasons: one really does cause the other; the causation runs the other way; a hidden third factor drives both (a common cause, like hot weather driving both ice-cream sales and drownings); or it's a coincidence, which gets more likely the more data you sift through. Spotting a correlation is the easy part. Working out which of these is behind it is the real job, and usually needs an experiment, not just a chart.":
    "Корреляция говорит лишь о том, что две величины склонны меняться вместе. Такое может происходить по нескольким причинам: одно действительно вызывает другое; причинность идёт в обратную сторону; на обе величины влияет скрытый третий фактор (общая причина, например жаркая погода, которая повышает и продажи мороженого, и число утоплений); или это совпадение, которое тем вероятнее, чем больше данных вы просеиваете. Заметить корреляцию, это лёгкая часть. Понять, что из перечисленного за ней стоит, вот настоящая работа, и обычно для неё нужен эксперимент, а не просто график.",
  "Storks and babies": "Аисты и младенцы",
  "Across European countries, the ones with more storks really do have more human births, a statistically significant link. The legend isn't true: larger countries simply have room for both more storks and more people.":
    "По европейским странам в тех, где больше аистов, действительно больше рождений людей, статистически значимая связь. Легенда неверна: в больших странах просто есть место и для большего числа аистов, и для большего числа людей.",
  "Nicolas Cage and drownings": "Николас Кейдж и утопления",
  "The number of films Nicolas Cage releases in a year tracks the number of people who drown in swimming pools. Nobody thinks one causes the other; line up enough unrelated trends and some will match by pure chance.":
    "Число фильмов, которые Николас Кейдж выпускает за год, следует за числом людей, утонувших в бассейнах. Никто не думает, что одно вызывает другое; выстройте в ряд достаточно не связанных между собой тенденций, и некоторые совпадут по чистой случайности.",
  "Correlation ≠ causation, a reasoning trap.":
    "Корреляция ≠ причинность, ловушка мышления.",
  "Two things can rise and fall together perfectly and still have nothing to do with each other. Very often a hidden third thing is pulling both strings at once, so it looks like one causes the other when neither does. Before you believe a headline that “X is linked to Y,” ask what else could be driving both.":
    "Две величины могут идеально расти и падать вместе и при этом не иметь друг к другу никакого отношения. Очень часто скрытое третье дёргает сразу за обе ниточки, поэтому кажется, будто одно вызывает другое, хотя ни одно из них не вызывает. Прежде чем поверить заголовку о том, что «X связан с Y», спросите, что ещё могло бы влиять на обе величины.",

  // ==== Survivorship bias (bombers) ====
  "Bombers come home riddled with bullet holes. Where do you add the armour?":
    "Бомбардировщики возвращаются изрешечённые пробоинами. Куда добавить броню?",
  "In WWII, returning bombers were peppered with damage, heaviest on the wings and body, while the engines and cockpit came back almost untouched. Armour is heavy, so you can only reinforce a few areas.":
    "Во время Второй мировой войны возвращавшиеся бомбардировщики были усеяны повреждениями, сильнее всего на крыльях и фюзеляже, тогда как двигатели и кабина возвращались почти нетронутыми. Броня тяжёлая, поэтому усилить можно лишь несколько участков.",
  "Where should the armour go?": "Куда следует поставить броню?",
  "Returning bombers": "Возвращающиеся бомбардировщики",
  "hits on planes that came back": "попадания в самолёты, которые вернулись",
  "armour here, the lost planes' hits":
    "броня здесь, попадания в потерянные самолёты",
  "The wings and body": "Крылья и фюзеляж",
  "where the holes are": "там, где пробоины",
  "Spread it evenly": "Распределить равномерно",
  "play it safe": "перестраховаться",
  "The engines and cockpit": "Двигатели и кабина",
  "where there are no holes": "там, где нет пробоин",
  "Armour where the holes aren't.":
    "Броня там, где пробоин нет.",
  "The missing planes": "Пропавшие самолёты",
  "You only see the survivors": "Вы видите только выживших",
  "These are the planes that made it home. The ones hit in the engine or cockpit didn't, so their damage never shows up in the data. The holes on the survivors map out exactly where a bomber can be shot and still fly. The clean spots are the fatal ones: armour those.":
    "Это самолёты, которые добрались домой. Те, кому попали в двигатель или кабину, не вернулись, поэтому их повреждения вообще не попадают в данные. Пробоины на выживших в точности показывают, куда бомбардировщик можно поразить и всё же лететь дальше. Чистые участки, вот они смертельные: их и нужно бронировать.",
  "Survivorship bias": "Ошибка выжившего",
  "When you only look at the winners, the failures become invisible, and they often hold the real lesson.":
    "Когда вы смотрите только на победителей, неудачи становятся невидимыми, а ведь именно в них часто и заключён настоящий урок.",
  "Before drawing a conclusion, ask who's missing from the data. The planes that didn't return, the funds that closed, the businesses that folded: they were quietly filtered out, and putting them back can flip the answer.":
    "Прежде чем делать вывод, спросите, кого не хватает в данных. Самолёты, которые не вернулись, фонды, которые закрылись, компании, которые разорились: их незаметно отсеяли, и если вернуть их на место, ответ может перевернуться.",
  "Survivorship bias creeps in whenever your data has quietly been filtered to keep only the things that “made it”: returning planes, funds still trading, companies still around. You never see the ones that failed and dropped out, and because the survivors share whatever helped them survive, that trait looks far more common, or more effective, than it really is. The fix is to hunt for the missing group and ask what the full picture would show. (The real Wald did more than point at a diagram: he built a statistical method to estimate each part's vulnerability from the survivors' damage.)":
    "Ошибка выжившего закрадывается всякий раз, когда ваши данные незаметно отфильтрованы так, что в них остаётся лишь то, что «уцелело»: вернувшиеся самолёты, фонды, всё ещё торгующиеся на бирже, компании, всё ещё существующие. Вы никогда не видите тех, кто провалился и выбыл, а поскольку у выживших есть общее то, что помогло им уцелеть, этот признак кажется куда более распространённым или более эффективным, чем он есть на самом деле. Решение, это выискивать недостающую группу и спрашивать, что показала бы полная картина. (Настоящий Вальд сделал больше, чем просто указал на схему: он построил статистический метод, позволяющий оценить уязвимость каждой части по повреждениям выживших.)",
  "Falling cats": "Падающие кошки",
  "Vets found that cats falling from higher floors often arrived with fewer injuries than those from lower floors. Part of the reason is grim survivorship: a cat that didn't survive the fall was never brought in, so the hospital's data only counts the ones that lived.":
    "Ветеринары обнаружили, что кошки, падавшие с более высоких этажей, часто поступали с меньшим числом травм, чем те, что падали с более низких. Отчасти причина в мрачной ошибке выжившего: кошку, которая не пережила падение, просто не приносили, так что в данных клиники учтены только те, что остались живы.",
  "Star mutual funds": "Звёздные инвестиционные фонды",
  "Look at the funds still on offer today and active management looks great. But funds that did badly get quietly closed and dropped from the records, so the survivors flatter the whole industry. Counting the dead funds cuts the average return by over a percentage point a year.":
    "Посмотрите на фонды, которые предлагаются сегодня, и активное управление выглядит прекрасно. Но фонды, показавшие плохие результаты, незаметно закрывают и убирают из отчётности, поэтому выжившие приукрашивают всю отрасль. Если учесть исчезнувшие фонды, средняя доходность падает более чем на процентный пункт в год.",
  "Survivorship bias, a reasoning trap.":
    "Ошибка выжившего, ловушка мышления.",
  "It's easy to study the winners, the survivors, the successes, the things still standing, and copy what they have in common. But the failures are invisible: they dropped out of the data. Whatever helped the survivors survive looks far more powerful than it is, because you never see everyone it didn't save. Before copying the winners, ask who's missing.":
    "Легко изучать победителей, выживших, успехи, то, что всё ещё держится, и копировать то, что у них общего. Но неудачи невидимы: они выбыли из данных. Всё, что помогло выжившим уцелеть, выглядит куда более действенным, чем оно есть, потому что вы никогда не видите всех тех, кого оно не спасло. Прежде чем копировать победителей, спросите, кого не хватает.",
};
