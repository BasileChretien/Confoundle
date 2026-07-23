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

  // ==== Prosecutor's fallacy (People v. Collins) ====
  "A 1 in 12 million match. Case closed?":
    "Совпадение один к 12 миллионам. Дело закрыто?",
  "Los Angeles, 1964. A woman is knocked down and her purse is taken. Witnesses describe the pair who ran off: a blonde woman with a ponytail and a bearded Black man, in a partly yellow car. A couple who fit every detail are charged. At the trial an expert is asked to assume a frequency for each feature, multiplies them together, and gets 1 in 12 million. The prosecutor tells the jury that is the chance the two in the dock are innocent. Take the 1 in 12 million at face value, and picture the 12 million couples who could have been the ones.":
    "Лос-Анджелес, 1964 год. Женщину сбивают с ног и отнимают у неё сумочку. Свидетели описывают убежавшую пару: блондинка с хвостом и чернокожий мужчина с бородой, в машине, частично окрашенной в жёлтый. Обвинение предъявляют паре, которая подходит по каждой примете. На суде эксперта просят принять некоторую частоту для каждой приметы; он перемножает их и получает 1 к 12 миллионам. Прокурор говорит присяжным, что это и есть вероятность того, что двое на скамье подсудимых невиновны. Примите 1 к 12 миллионам за чистую монету и представьте себе 12 миллионов пар, которые могли бы оказаться теми самыми.",
  "This couple fits the description. What are the odds they did it?":
    "Эта пара подходит под описание. Каковы шансы, что это сделали именно они?",
  "In 12 million couples": "Среди 12 миллионов пар",
  "did it": "сделали это",
  "fit the description": "подходят под описание",
  "Virtually certain": "Практически наверняка",
  "12 million to one against them": "12 миллионов к одному против них",
  "Around 99%": "Около 99 %",
  "not quite proof, but close": "не совсем доказательство, но близко",
  "About a coin flip": "Примерно как бросок монетки",
  "roughly 50/50": "примерно 50/50",
  "One in 12 million, and still a coin flip.":
    "Один шанс из 12 миллионов, и всё равно бросок монетки.",
  "The flipped question": "Перевёрнутый вопрос",
  "Rare evidence is common in a big crowd":
    "Редкая улика становится обычной в большой толпе",
  "The 1 in 12 million answers one question: pick a couple at random, how likely are they to fit? The jury has to answer a different one: of all the couples who do fit, which pair did it? Line up 12 million couples. One pair are the robbers, and of course they fit. But at odds of 1 in 12 million, roughly one more couple in that crowd fits by pure chance. So a couple who fits is about as likely to be innocent as guilty.":
    "1 к 12 миллионам отвечает на один вопрос: если взять пару наугад, насколько вероятно, что она подойдёт под описание? Присяжным же нужно ответить на другой: из всех пар, которые подходят, какая именно это сделала? Выстройте в ряд 12 миллионов пар. Одна пара, это грабители, и они, конечно, подходят. Но при шансах 1 к 12 миллионам примерно ещё одна пара в этой толпе подходит по чистой случайности. Значит, подходящая под описание пара примерно с равной вероятностью невиновна и виновна.",
  "The California Supreme Court reversed the conviction in 1968. Working from the prosecution's own figures, it found a likelihood of over 40 percent that at least one other couple could have fitted the description just as well, and it warned that guilt cannot be settled by arithmetic like this.":
    "В 1968 году Верховный суд Калифорнии отменил обвинительный приговор. Исходя из цифр самого обвинения, он нашёл вероятность более 40 процентов того, что как минимум ещё одна пара подошла бы под описание ничуть не хуже, и предупредил, что виновность нельзя устанавливать подобной арифметикой.",
  "The prosecutor's fallacy": "Ошибка прокурора",
  "“If he were innocent, this evidence would be that unlikely” is not the same as “this evidence makes him that unlikely to be innocent.” Swap the two and a coin flip starts to sound like certainty.":
    "«Если бы он был невиновен, такая улика была бы настолько маловероятна», это не то же самое, что «эта улика делает его невиновность настолько маловероятной». Поменяйте их местами, и бросок монетки начинает звучать как полная уверенность.",
  "Before you accept a one in a million match, ask how big the pool was. One in a million odds across a city of ten million throw up about ten matches, and only one of those people did it. The number means nothing until you say who was in the crowd.":
    "Прежде чем принять совпадение один на миллион, спросите, насколько велика была рассматриваемая совокупность. Шансы один на миллион в городе с десятью миллионами жителей дают около десяти совпадений, и лишь один из этих людей это сделал. Число ничего не значит, пока вы не скажете, кто был в толпе.",
  "Two questions sound identical and are not. The first: if this person had nothing to do with it, how likely is this evidence? That is what a lab or an expert can actually measure, and it is where figures like 1 in 12 million come from. The second: given this evidence, how likely is it that this person did it? That is what a jury has to decide, and it depends on something no lab measures, namely how many people could have done it. Push odds of 1 in 12 million through a crowd of 12 million and you expect about one innocent match, so the match on its own is worth roughly a coin flip. Shrink the crowd, or add independent evidence, and the same match becomes powerful. Grow the crowd, and it becomes weak. The trap also runs in reverse: a defence lawyer can say that 2,000 people in the city share that blood type, so the evidence proves nothing, which quietly ignores that the other 1,999 were nowhere near the crime.":
    "Два вопроса звучат одинаково, но это разные вопросы. Первый: если этот человек не имеет к делу никакого отношения, насколько вероятна такая улика? Именно это лаборатория или эксперт действительно могут измерить, и отсюда берутся цифры вроде 1 к 12 миллионам. Второй: с учётом этой улики, насколько вероятно, что это сделал именно он? Именно это предстоит решить присяжным, и это зависит от того, чего не измеряет ни одна лаборатория, а именно от того, сколько людей вообще могли это сделать. Пропустите шансы 1 к 12 миллионам через толпу в 12 миллионов, и вы ожидаете примерно одно совпадение с невиновным, так что само по себе совпадение стоит примерно броска монетки. Уменьшите толпу или добавьте независимые улики, и то же самое совпадение станет мощным. Увеличьте толпу, и оно ослабнет. Ловушка работает и в обратную сторону: адвокат защиты может сказать, что такая же группа крови есть у 2000 жителей города, а значит, улика ничего не доказывает, тихо умалчивая о том, что остальные 1999 человек и близко не были у места преступления.",
  "Two cot deaths, and a number that became guilt":
    "Две внезапные детские смерти и число, ставшее виновностью",
  "An English murder trial heard that the chance of two cot deaths in a family like the defendant's was 1 in 73 million. Press reports turned that into the chance the deaths were natural. The Royal Statistical Society said publicly that the figure had no statistical basis, because it assumed the two deaths were independent, and that reading it as a chance of innocence is the prosecutor's fallacy. What the jury needed was a comparison: two cot deaths and two murders are both rare, so which is rarer here?":
    "На процессе об убийстве в Англии прозвучало, что вероятность двух внезапных детских смертей в семье, подобной семье обвиняемой, составляет 1 к 73 миллионам. В прессе это превратили в вероятность того, что смерти были естественными. Королевское статистическое общество публично заявило, что у этой цифры нет статистических оснований, поскольку она предполагала независимость двух смертей, и что читать её как вероятность невиновности, значит совершать ошибку прокурора. Присяжным нужно было сравнение: две внезапные детские смерти и два убийства редки и то, и другое, так что же здесь реже?",
  "Almost nobody spots the swap": "Почти никто не замечает подмену",
  "Researchers gave 73 students a murder case in which the killer's blood type is found in 1 person in 100, then showed them a prosecution argument built on the swapped question: only a 1 percent chance the blood came from someone else, so a 99 percent chance the suspect is guilty. 21 of the 73 rated that argument correct, and only 16 saw that it and the opposing defence argument were both wrong.":
    "Исследователи дали 73 студентам дело об убийстве, в котором группа крови убийцы встречается у 1 человека из 100, а затем показали им довод обвинения, построенный на подменённом вопросе: вероятность того, что кровь принадлежит кому-то другому, всего 1 процент, значит, вероятность вины подозреваемого 99 процентов. 21 студент из 73 счёл этот довод верным, и лишь 16 увидели, что и он, и противоположный довод защиты одинаково ошибочны.",
  "The prosecutor's fallacy, a reasoning trap.":
    "Ошибка прокурора, ловушка мышления.",
  "When an expert says there is only a one in a million chance of a match by accident, that is a fact about the evidence, not about the person in the dock. Flip the two around and you get the prosecutor's fallacy. The cure is to ask how many people were in the pool: one in a million odds across a city of ten million produce about ten innocent matches, so on its own a match can be nowhere near proof.":
    "Когда эксперт говорит, что случайное совпадение возможно лишь с вероятностью один на миллион, это факт об улике, а не о человеке на скамье подсудимых. Поменяйте их местами, и вы получите ошибку прокурора. Лекарство, это спросить, сколько людей было в рассматриваемой совокупности: шансы один на миллион в городе с десятью миллионами жителей дают около десяти совпадений с невиновными, так что само по себе совпадение может быть очень далеко от доказательства.",
  "Spotted the swap. Bet you don't.":
    "Я заметил подмену. Спорим, вы не заметите.",
  "I'd have convicted on the spot.":
    "Я бы вынес обвинительный приговор на месте.",
  "The court's appendix showed that on those same figures, with a pool of about 12 million couples, the chance that at least one other couple fitted the description was roughly 41 percent.":
    "Приложение к решению суда показало, что при тех же цифрах и совокупности примерно в 12 миллионов пар вероятность того, что под описание подходила хотя бы ещё одна пара, составляла около 41 процента.",

  // ==== Trap Hunt items ====
  "Two schools publish exam results. School B has the higher pass rate overall, 75% against 70%. When results are split by student background, School A comes out ahead in every single group. The district praises School B.":
    "Две школы публикуют результаты экзаменов. У школы B выше общая доля сдавших, 75 % против 70 %. Когда результаты разбивают по социальному происхождению учеников, школа A оказывается впереди в каждой без исключения группе. Округ хвалит школу B.",
  "A wins in every group but loses overall, which happens when the groups are mixed unevenly. The pooled number is the misleading one here.":
    "A выигрывает в каждой группе, но проигрывает в целом, а так бывает, когда группы смешаны неравномерно. Вводит в заблуждение здесь именно объединённое число.",
  "A factory reports its new process has a lower defect rate than the old one, 3% against 4%. Looking at simple parts and complex parts separately, the old process had fewer defects in both.":
    "Завод сообщает, что у нового процесса доля брака ниже, чем у старого, 3 % против 4 %. Если посмотреть отдельно на простые и на сложные детали, у старого процесса брака было меньше и там, и там.",
  "Better in both categories yet worse overall means the two processes handled very different mixes of simple and complex parts.":
    "Лучше в обеих категориях и всё же хуже в целом, это значит, что через два процесса прошли очень разные наборы простых и сложных деталей.",
  "A condition affects about 1 in 2,000 people. A screening test is 99% accurate. A patient tests positive and is told they almost certainly have the condition.":
    "Заболевание встречается примерно у 1 человека из 2000. Скрининговый тест точен на 99 %. У пациента положительный результат, и ему говорят, что он почти наверняка болен.",
  "With a condition this rare, the 1% error rate produces far more false positives than there are real cases, so a positive is still more likely to be a false alarm.":
    "При такой редкости заболевания 1 % ошибок даёт куда больше ложноположительных результатов, чем есть настоящих случаев, поэтому положительный результат всё равно скорее ложная тревога.",
  "A system flags travellers as suspicious and is 95% accurate. About 1 in 1,000 travellers is actually a threat. An official states that a flagged traveller is 95% likely to be a threat.":
    "Система помечает пассажиров как подозрительных и точна на 95 %. На самом деле угрозу представляет примерно 1 пассажир из 1000. Чиновник заявляет, что помеченный пассажир с вероятностью 95 % является угрозой.",
  "That confuses the test's accuracy with the odds after a flag. Because threats are rare, the overwhelming majority of flags are ordinary travellers.":
    "Это путает точность системы с шансами уже после срабатывания метки. Поскольку угрозы редки, подавляющее большинство помеченных, это обычные пассажиры.",
  "Neighbourhoods with more parks have lower obesity rates. A council report concludes that building parks will reduce obesity, and proposes a park-building programme.":
    "В районах, где больше парков, ниже уровень ожирения. В докладе городского совета делается вывод, что строительство парков снизит ожирение, и предлагается программа создания парков.",
  "Wealth and urban planning plausibly drive both park provision and health, so the link may not be the parks doing the work.":
    "Достаток и градостроительная политика вполне правдоподобно влияют и на количество парков, и на здоровье, так что дело может быть вовсе не в парках.",
  "Students who visit the library more often get higher grades. A university announces mandatory weekly library visits to raise grades.":
    "Студенты, которые чаще ходят в библиотеку, получают более высокие оценки. Университет объявляет обязательные еженедельные посещения библиотеки, чтобы поднять оценки.",
  "Motivated students both study more and visit the library. Forcing the visit does not import the motivation that produced the grades.":
    "Мотивированные студенты и больше занимаются, и чаще ходят в библиотеку. Принудительное посещение не приносит с собой ту мотивацию, которая и дала эти оценки.",
  "A business book studies companies that have thrived for fifty years and finds nearly all had bold, risk-taking leaders. It concludes that bold leadership causes lasting success.":
    "Книга по бизнесу изучает компании, процветающие уже пятьдесят лет, и обнаруживает, что почти у всех были смелые, склонные к риску руководители. Из этого делается вывод, что смелое руководство ведёт к долгому успеху.",
  "The bold companies that went under are not in the sample. Boldness may equally well cause spectacular failure, which the study cannot see.":
    "Смелых компаний, которые разорились, в выборке нет. Смелость с тем же успехом может приводить к громкому провалу, но этого исследование увидеть не может.",
  "A clinic reviews patients who completed its demanding rehabilitation programme and finds excellent outcomes. It reports the programme as highly effective.":
    "Клиника анализирует пациентов, прошедших её тяжёлую программу реабилитации до конца, и получает отличные исходы. Она сообщает, что программа очень эффективна.",
  "Patients who dropped out are excluded, and they are likely the ones doing worst. Counting only finishers flatters the programme.":
    "Пациенты, бросившие программу, исключены, а именно у них дела, скорее всего, хуже всего. Подсчёт одних лишь дошедших до конца приукрашивает программу.",
  "A database search turns up one man whose DNA matches a crime-scene sample. The lab reports that the profile occurs in about 1 person in a million. The prosecutor tells the jury there is therefore about a one in a million chance that he is innocent.":
    "Поиск по базе данных находит одного мужчину, чья ДНК совпадает с образцом с места преступления. Лаборатория сообщает, что такой профиль встречается примерно у 1 человека из миллиона. Прокурор говорит присяжным, что, следовательно, вероятность его невиновности примерно один на миллион.",
  "The 1 in a million is the chance of a match if he is innocent, not the chance he is innocent given a match. In a large pool other people match too, so the two numbers are nowhere near the same.":
    "Один на миллион, это вероятность совпадения при условии, что он невиновен, а не вероятность его невиновности при условии совпадения. В большой совокупности совпадения находятся и у других людей, так что эти два числа совсем не одно и то же.",
  "Fibres on a suspect's coat match the victim's carpet. An expert says only about 1 coat in 5,000 would carry such fibres. Counsel concludes the suspect is 4,999 times more likely to be guilty than innocent.":
    "Волокна на пальто подозреваемого совпадают с ковром жертвы. Эксперт говорит, что такие волокна нашлись бы лишь примерно на 1 пальто из 5000. Адвокат заключает, что подозреваемый в 4999 раз вероятнее виновен, чем невиновен.",
  "A rarity figure describes the evidence, not the person. How many innocent people could have picked up those fibres depends on how many people were ever near that carpet.":
    "Цифра редкости описывает улику, а не человека. Сколько невиновных людей могли подцепить такие волокна, зависит от того, сколько людей вообще бывало рядом с этим ковром.",
  "An expert testifies that the DNA profile occurs in roughly 1 person in a million, and adds that in a city of two million this means about two other people would be expected to match as well, so the match alone does not single out the defendant.":
    "Эксперт свидетельствует, что профиль ДНК встречается примерно у 1 человека из миллиона, и добавляет, что в городе с двумя миллионами жителей это означает ожидаемое совпадение ещё примерно у двух человек, поэтому одно лишь совпадение не выделяет обвиняемого.",
  "This is the rarity figure stated correctly. The expert converts it into expected matches in the population instead of flipping it into a probability of innocence.":
    "Здесь цифра редкости изложена правильно. Эксперт переводит её в ожидаемое число совпадений в населении, а не переворачивает в вероятность невиновности.",
  "Patients are assigned at random to a drug or a placebo. The drug group has fewer strokes, and the difference holds within every age group. The researchers conclude the drug reduces strokes.":
    "Пациентов случайным образом распределяют на препарат или плацебо. В группе препарата меньше инсультов, и разница сохраняется в каждой возрастной группе. Исследователи заключают, что препарат снижает число инсультов.",
  "Randomisation balances the hidden differences, and the effect survives splitting by age. This reasoning is sound.":
    "Рандомизация уравновешивает скрытые различия, и эффект сохраняется при разбивке по возрасту. Это рассуждение верное.",
  "A test with a 1% false-positive rate is used in a clinic where about 40% of those tested genuinely have the condition. A doctor tells a patient that a positive result makes the condition much more likely.":
    "Тест с 1 % ложноположительных результатов применяют в клинике, где примерно у 40 % обследуемых заболевание действительно есть. Врач говорит пациенту, что положительный результат делает заболевание намного более вероятным.",
  "The base rate matters, and here it is high. With 40% prevalence a positive really is strong evidence, so applying the rare-disease lesson would be a mistake.":
    "Базовая частота важна, и здесь она высокая. При распространённости 40 % положительный результат действительно является сильным свидетельством, поэтому применять здесь урок о редких болезнях было бы ошибкой.",
  "A city compares road deaths before and after lowering a speed limit, adjusts for traffic volume, and checks the national trend over the same years. The local drop is larger than the national trend.":
    "Город сравнивает смертность на дорогах до и после снижения ограничения скорости, вносит поправку на интенсивность движения и проверяет общенациональную тенденцию за те же годы. Местное снижение оказывается больше общенациональной тенденции.",
  "They accounted for the obvious confounders and for the background trend, which is what makes a before-and-after comparison credible.":
    "Здесь учли очевидные искажающие факторы и фоновую тенденцию, а именно это и делает сравнение до и после заслуживающим доверия.",
  "A trial reports outcomes for everyone who was enrolled, including those who stopped treatment early, and states how many dropped out and why.":
    "Исследование сообщает исходы для всех включённых участников, в том числе для тех, кто прекратил лечение досрочно, и указывает, сколько человек выбыло и почему.",
  "Reporting the whole enrolled group, dropouts included, is exactly the defence against counting only the survivors.":
    "Отчёт по всей включённой группе, вместе с выбывшими, это и есть защита от подсчёта одних лишь выживших.",

  // ==== Will Rogers phenomenon (stage migration) ====
  "Better survival in every single stage. Did anyone actually live longer?":
    "Выживаемость выше в каждой без исключения стадии. Но прожил ли кто-нибудь дольше?",
  "One group of 131 lung cancer patients, treated in 1977, sorted into stages twice. First using only the information older hospitals could gather, then again after new scans. Nobody was treated differently. Only the sorting changed.":
    "Одна группа из 131 пациента с раком лёгкого, лечившихся в 1977 году, была разнесена по стадиям дважды. Сначала только по тем сведениям, которые могли собрать больницы прежних лет, затем заново, после новых снимков. Никого не лечили иначе. Изменилось только распределение по стадиям.",
  "Did these patients actually do better?":
    "Действительно ли у этих пациентов дела пошли лучше?",
  "Six-month survival": "Шестимесячная выживаемость",
  "Sorted the old way": "Разнесены по стадиям по-старому",
  Old: "По-старому",
  "Sorted after the new scans": "Разнесены по стадиям после новых снимков",
  New: "По-новому",
  "Stage I": "Стадия I",
  "Stage II": "Стадия II",
  "Stage III": "Стадия III",
  "Yes, they did better": "Да, у них дела пошли лучше",
  "every stage improved": "улучшение в каждой стадии",
  "There is no way to tell": "Понять невозможно",
  "too little to go on": "слишком мало данных",
  "No, nothing changed": "Нет, ничего не изменилось",
  "only the labels moved": "сдвинулись только ярлыки",
  "Identical. Seventy two survivors either way.":
    "Одинаково. Семьдесят два выживших и так, и так.",
  "The migration": "Миграция",
  "Patients moved between stages, and lifted both":
    "Пациенты перешли между стадиями и подняли обе",
  "The new scans spotted spread that the old workup had missed, so patients were moved out of better stages into worse ones. Each of them was among the sickest in the stage they left, so that stage's average rose. Each was also among the healthiest in the stage they joined, so that average rose too. Every stage improved and not one person's outcome changed:":
    "Новые снимки выявили распространение опухоли, которое прежнее обследование пропускало, поэтому пациентов переводили из более благоприятных стадий в менее благоприятные. Каждый из них был среди самых тяжёлых в той стадии, которую покидал, поэтому средний показатель этой стадии вырос. Каждый был также среди самых благополучных в той стадии, куда он попадал, поэтому и там средний показатель вырос. Улучшилась каждая стадия, и при этом ни у одного человека исход не изменился:",
  "The Will Rogers phenomenon": "Феномен Уилла Роджерса",
  "Move members from one group into another and you can lift the average of every group at once, while the overall picture stays exactly the same.":
    "Переведите часть участников из одной группы в другую, и вы можете поднять средний показатель сразу всех групп, тогда как общая картина останется в точности прежней.",
  "Whenever a category's average improves, ask whether the category still holds the same kind of members. Better detection quietly reshuffles who counts as mild and who counts as severe, and a reshuffle on its own can make every column look better.":
    "Всякий раз, когда средний показатель категории улучшается, спросите, те же ли люди в ней остались. Более чувствительная диагностика незаметно перетасовывает, кто считается лёгким случаем, а кто тяжёлым, и одна лишь перетасовка способна сделать красивее каждый столбец.",
  "Picture two buckets, one of good outcomes and one of bad. Take the worst items out of the good bucket and drop them into the bad one, where they are the best of a bad lot. The good bucket's average rises because its weakest members left. The bad bucket's average rises because it gained members better than its own. Both averages improve and nothing about any individual has changed. In medicine the reshuffling is done by better scans, which find disease that was always there but previously invisible. That is why survival by stage can improve across the board in a period when the treatments themselves did not get better, and it is why comparing stages across eras of different technology is treacherous.":
    "Представьте два ведра, одно с хорошими исходами, другое с плохими. Возьмите худшее из хорошего ведра и переложите в плохое, где оно окажется лучшим из плохого. Средний показатель хорошего ведра вырастет, потому что из него ушли самые слабые. Средний показатель плохого ведра вырастет, потому что в нём прибавились те, кто лучше его собственных. Оба средних улучшились, и при этом ни с кем в отдельности ничего не произошло. В медицине такую перетасовку выполняют более чувствительные снимки, которые находят болезнь, всегда там бывшую, но прежде невидимую. Вот почему выживаемость по стадиям может расти повсеместно в тот период, когда сами методы лечения лучше не стали, и вот почему сравнивать стадии между эпохами с разной техникой опасно.",
  "The check that gave it away": "Проверка, которая всё выдала",
  "The same researchers sorted both eras of patients by their symptoms instead, a yardstick no scanner can shift. Judged that way the two groups survived at much the same rate, around 77 and 78 percent for those without symptoms, and 26 against 22 percent for the sickest. What had really changed was the mix, because the newer group held twice the proportion of the mildest patients.":
    "Те же исследователи разнесли пациентов обеих эпох иначе, по симптомам, то есть по мерке, которую не сдвинет ни один томограф. При таком подходе обе группы выживали примерно одинаково: около 77 и 78 процентов у тех, кто был без симптомов, и 26 против 22 процентов у самых тяжёлых. По-настоящему изменился состав: в более поздней группе доля самых лёгких пациентов была вдвое выше.",
  "It happened again with PET": "То же самое повторилось с ПЭТ",
  "As PET scanning spread through American hospitals, lung cancer patients were reclassified all over again. The share labelled most advanced grew, and survival within the stages duly ticked up, two year survival moving from 18 to 22 percent in one stage and 6 to 8 percent in another. The authors called their paper the phenomenon revisited.":
    "По мере того как ПЭТ распространялась по американским больницам, пациентов с раком лёгкого переклассифицировали заново. Доля тех, кому ставили самую запущенную стадию, выросла, и выживаемость внутри стадий закономерно подросла: двухлетняя выживаемость поднялась с 18 до 22 процентов в одной стадии и с 6 до 8 процентов в другой. Свою статью авторы назвали возвращением к этому феномену.",
  "The Will Rogers phenomenon, a reasoning trap.":
    "Феномен Уилла Роджерса, ловушка мышления.",
  "Take the worst members of a good group and move them into a bad group. The good group's average rises, because its weakest ones left. The bad group's average rises too, because the newcomers are better than what it already had. Every group improves and nothing real has happened. It is how sharper scans can make survival look better in every stage of a disease while exactly as many people live and die.":
    "Возьмите худших из хорошей группы и переведите их в плохую. Средний показатель хорошей группы вырастет, потому что из неё ушли самые слабые. Средний показатель плохой группы тоже вырастет, потому что новички лучше тех, кто в ней уже был. Улучшается каждая группа, а на деле не произошло ничего. Именно так более чувствительные снимки могут сделать выживаемость лучше на каждой стадии болезни, тогда как живут и умирают ровно столько же людей.",
  "The counts are Table 4: the 1977 cohort of 131 patients staged twice, once on the data the older cohort had and once with the new imaging. Both stagings give 72 survivors, a six-month survival of 55 percent.":
    "Числа взяты из таблицы 4: когорта 1977 года из 131 пациента, распределённая по стадиям дважды, один раз по тем данным, что были у более ранней когорты, и один раз с новой визуализацией. Оба распределения дают 72 выживших, то есть шестимесячную выживаемость 55 процентов.",

  // ==== Trap Hunt items (Will Rogers, plus a sound decoy) ====
  "A hospital installs a more sensitive scanner. Over the next two years it reports that survival improved in every severity grade of the disease, from the mildest to the most advanced, and concludes that its care has got better.":
    "Больница устанавливает более чувствительный томограф. В следующие два года она сообщает, что выживаемость выросла в каждой степени тяжести болезни, от самой лёгкой до самой запущенной, и делает вывод, что её помощь стала лучше.",
  "A sharper scanner regrades patients. Those moved out of a mild grade were its sickest, and they arrive in a severe grade as its healthiest, so both averages rise without anyone doing better.":
    "Более чувствительный томограф переводит пациентов в другие степени тяжести. Те, кого вывели из лёгкой степени, были в ней самыми тяжёлыми, а в тяжёлую степень они приходят как самые благополучные, поэтому оба средних показателя растут, хотя ни у кого дела не пошли лучше.",
  "A school adopts a placement test that is much better at identifying struggling pupils, and uses it to sort them into a top and a bottom stream. The next year, average results rise in both streams. The head teacher credits the new teaching methods.":
    "Школа вводит распределительный тест, который гораздо лучше выявляет отстающих учеников, и по нему делит их на сильный и слабый потоки. На следующий год средние результаты растут в обоих потоках. Директор ставит это в заслугу новым методам преподавания.",
  "The pupils reclassified out of the top stream were its weakest and become the strongest of the bottom stream, so both averages climb on reshuffling alone.":
    "Ученики, переведённые из сильного потока, были в нём самыми слабыми, а в слабом потоке становятся самыми сильными, поэтому оба средних показателя растут от одной лишь перетасовки.",
  "A hospital reports that survival improved in every severity grade over five years. It also reports that the grading criteria did not change in that time, that no new diagnostic test was introduced, and that the number of patients in each grade stayed about the same.":
    "Больница сообщает, что за пять лет выживаемость выросла в каждой степени тяжести. Она также сообщает, что критерии определения тяжести за это время не менялись, что новых диагностических тестов не вводили и что число пациентов в каждой степени осталось примерно прежним.",
  "This is the case where the improvement is real. Nothing reclassified the patients, and the grades held the same share of people, so no reshuffling could have manufactured the gain.":
    "Это тот случай, когда улучшение настоящее. Пациентов ничто не переклассифицировало, и в степенях тяжести осталась та же доля людей, так что никакая перетасовка не могла создать этот прирост.",

  // ---- Lead-time bias (puzzle #7) ----
  A: "A",
  B: "B",
  "Screened patients survive five years after diagnosis. Unscreened ones survive two.":
    "Пациенты, прошедшие скрининг, живут после постановки диагноза пять лет. Не проходившие скрининг, два года.",
  "The same cancer, growing at the same speed, treated the same way. One person had a scan that found it early. The other went to a doctor years later, when the first symptom appeared. Survival is counted from the day of diagnosis, which is how survival is almost always counted.":
    "Один и тот же рак, растущий с одинаковой скоростью, и одинаковое лечение. Одному человеку сделали снимок, который выявил опухоль рано. Другой пришёл к врачу спустя годы, когда появился первый симптом. Выживаемость считают со дня постановки диагноза, именно так её и считают почти всегда.",
  "Did finding it early give this person more time alive?":
    "Дало ли раннее выявление этому человеку больше времени жизни?",
  "One life, two moments of diagnosis":
    "Одна жизнь, два момента постановки диагноза",
  years: "лет",
  "cancer begins": "начало рака",
  diagnosed: "диагноз",
  died: "смерть",
  "Survival counted from diagnosis": "Выживаемость от даты диагноза",
  "Found when symptoms appeared": "Выявлен по симптомам",
  "Found early, by screening": "Выявлен рано, на скрининге",
  "Yes, three extra years": "Да, три дополнительных года",
  "five instead of two": "пять вместо двух",
  "No, not one extra day": "Нет, ни одного лишнего дня",
  "only the clock moved": "сдвинулся только отсчёт",
  "Both died on exactly the same day.":
    "Оба умерли ровно в один и тот же день.",
  "The clock started earlier, the life did not get longer":
    "Отсчёт начался раньше, а жизнь длиннее не стала",
  "Screening did not postpone anything. It moved the diagnosis three years earlier, so this person spent three more years knowing they had cancer. Counted from diagnosis that reads as three extra years of survival. Put both lives on the same calendar and they end at the same instant:":
    "Скрининг ничего не отсрочил. Он сдвинул диагноз на три года раньше, поэтому человек прожил на три года больше, зная о своём раке. В отсчёте от диагноза это выглядит как три дополнительных года выживаемости. Положите обе жизни на один календарь, и они заканчиваются в один и тот же миг:",
  "The extra years": "Дополнительные годы",
  "Lead-time bias": "Ошибка опережения диагноза",
  "Finding a disease earlier stretches survival measured from diagnosis even when it postpones death by not a single day.":
    "Более раннее выявление болезни растягивает выживаемость, измеренную от диагноза, даже если смерть не отодвигается ни на один день.",
  "This does not mean early detection is worthless. It means survival from diagnosis cannot tell you whether it worked. Whenever survival improves after a new test arrives, ask whether people are living longer or simply being told sooner. The measure that cannot be fooled this way is the death rate in the whole population, screened and unscreened alike.":
    "Это не значит, что раннее выявление бесполезно. Это значит, что выживаемость от диагноза не может сказать, сработало ли оно. Всякий раз, когда выживаемость растёт после появления нового теста, спрашивайте, дольше ли живут люди или им просто раньше об этом сообщают. Показатель, который так не обманешь, это смертность во всём населении, и среди прошедших скрининг, и среди не проходивших его.",
  "Survival statistics start their clock on the day of diagnosis. That day is not a fact about the disease, it is a fact about when somebody looked. Move the looking earlier and you add time to the front of the measurement while changing nothing at the back. Everyone diagnosed early is guaranteed to clear the five-year mark more often, because they were handed a head start. Two other effects push the same way. A screening programme catches slow-growing disease far more often than fast-growing disease, simply because slow disease sits there longer waiting to be found, and slow disease has a better outlook anyway. And a sensitive enough test finds harmless abnormalities that would never have caused trouble, which are then counted as cured cancers. All three flatter survival without saving anyone. The only honest test is to take a whole population, invite half of it to be screened, and count deaths in everyone from the day of the invitation. Screening programmes that pass that test exist, which is exactly why the test is worth insisting on.":
    "Статистика выживаемости начинает отсчёт в день постановки диагноза. Этот день говорит не о болезни, а о том, когда кто-то посмотрел. Сдвиньте момент поиска раньше, и вы добавите время в начало измерения, ничего не изменив в его конце. Те, кому диагноз поставили рано, гарантированно чаще переступают пятилетний рубеж, потому что им дали фору. В ту же сторону работают ещё два эффекта. Программа скрининга гораздо чаще ловит медленно растущую болезнь, чем быстро растущую, просто потому что медленная болезнь дольше ждёт, пока её найдут, а прогноз при ней и так лучше. А достаточно чувствительный тест находит безобидные отклонения, которые никогда не доставили бы неприятностей, и их потом засчитывают как излеченные случаи рака. Все три эффекта приукрашивают выживаемость, никого не спасая. Единственная честная проверка, это взять целое население, пригласить половину на скрининг и считать смерти у всех со дня приглашения. Программы скрининга, которые такую проверку проходят, существуют, и именно поэтому на ней стоит настаивать.",
  "Survival rose for every cancer. Deaths did not follow.":
    "Выживаемость выросла при каждом виде рака. Смертность за ней не последовала.",
  "Between 1950 and 1995, five-year survival improved for all 20 of the most common solid tumours in the United States, by as little as 3 points for pancreatic cancer and as much as 50 for prostate. Over the same years the death rate fell for 12 of those cancers and rose for the other 8. Comparing tumour by tumour, the change in survival was unrelated to the change in mortality, and instead tracked the change in how many cancers were being found.":
    "С 1950 по 1995 год пятилетняя выживаемость выросла при всех 20 самых частых солидных опухолях в США: всего на 3 пункта при раке поджелудочной железы и на целых 50 при раке простаты. За те же годы смертность снизилась при 12 из этих видов рака и выросла при остальных 8. При сравнении опухоль за опухолью изменение выживаемости не было связано с изменением смертности, зато следовало за изменением того, как много случаев рака выявляли.",
  "Screening babies for a childhood tumour":
    "Скрининг младенцев на детскую опухоль",
  "Two large programmes tested screening infants for neuroblastoma. Quebec screened 476,654 children born over five years, with 92 percent taking part, and deaths from the tumour before the age of eight came to 4.78 per 100,000, no lower than in the comparison populations. Germany compared 1,475,773 screened children with 2,117,600 unscreened ones and found advanced disease in 3.7 against 3.8 per 100,000, and deaths in 1.3 against 1.2. More tumours were found. The same number of children died.":
    "Две крупные программы проверяли скрининг младенцев на нейробластому. В Квебеке обследовали 476 654 ребёнка, родившихся за пять лет, участие приняли 92 процента, и смертность от этой опухоли до восьми лет составила 4,78 на 100 000, не ниже, чем в популяциях сравнения. В Германии сравнили 1 475 773 обследованных ребёнка и 2 117 600 необследованных: запущенная болезнь встречалась с частотой 3,7 против 3,8 на 100 000, а смерти 1,3 против 1,2. Опухолей нашли больше. Детей умерло столько же.",
  "What a real benefit looks like": "Как выглядит настоящая польза",
  "Screening is not doomed to be an illusion, it just has to be measured properly. A trial put 46,551 people aged 50 to 80 into three groups: yearly stool testing for hidden blood, testing every two years, or none. Over 13 years, deaths from colorectal cancer came to 5.88 per 1,000 in the yearly group against 8.83 in the unscreened group, a third fewer. That is a count of deaths in everyone invited, not survival from diagnosis, so no head start could have produced it.":
    "Скрининг не обречён быть иллюзией, его просто нужно правильно измерять. В исследовании 46 551 человека в возрасте от 50 до 80 лет разделили на три группы: ежегодный анализ кала на скрытую кровь, такой же анализ раз в два года или ничего. За 13 лет смертность от колоректального рака составила 5,88 на 1000 в группе ежегодного анализа против 8,83 в группе без скрининга, на треть меньше. Это подсчёт смертей среди всех приглашённых, а не выживаемость от диагноза, поэтому никакая фора его дать не могла.",
  "Lead-time bias, a reasoning trap.":
    "Ошибка опережения диагноза, ловушка мышления.",
  "Survival is counted from the day you are diagnosed. So a test that finds a disease earlier automatically makes survival look longer, even if it changes nothing about when the disease kills you. You simply spend more of your life as a patient. That is why a screening programme can raise five-year survival dramatically while exactly the same number of people die. The number that cannot be gamed is deaths in the whole population, not survival among the diagnosed.":
    "Выживаемость считают со дня, когда вам поставили диагноз. Поэтому тест, который находит болезнь раньше, автоматически делает выживаемость длиннее, даже если он ничего не меняет в том, когда болезнь вас убьёт. Вы просто дольше живёте в статусе пациента. Вот почему программа скрининга может резко поднять пятилетнюю выживаемость, тогда как умирает ровно столько же людей. Число, которое не подделать, это смерти во всём населении, а не выживаемость среди тех, кому поставили диагноз.",
  "The timeline is a schematic illustration of one life, not measured data. The finding behind it is Welch and colleagues': across the 20 most common solid tumours between 1950 and 1995, five-year survival rose for every one, yet tumour by tumour the change in survival was uncorrelated with the change in mortality (Pearson r = 0.00) and instead tracked the change in incidence (Pearson r = 0.49).":
    "Шкала времени, это схематичная иллюстрация одной жизни, а не измеренные данные. За ней стоит результат Уэлча и соавт.: при 20 самых частых солидных опухолях с 1950 по 1995 год пятилетняя выживаемость выросла у каждой, однако опухоль за опухолью изменение выживаемости не коррелировало с изменением смертности (корреляция Пирсона r = 0,00) и вместо этого следовало за изменением заболеваемости (корреляция Пирсона r = 0,49).",
  "A hospital introduces a blood test that picks up a cancer about two years before symptoms would have appeared. Among patients diagnosed there, five-year survival rises from 41% to 68%. The hospital announces that the test is saving lives.":
    "Больница вводит анализ крови, который выявляет рак примерно за два года до того, как появились бы симптомы. Среди пациентов, которым там поставили диагноз, пятилетняя выживаемость растёт с 41 % до 68 %. Больница объявляет, что тест спасает жизни.",
  "Survival is counted from diagnosis, and the diagnosis now happens two years sooner. Everyone gets a two-year head start towards the five-year mark, whether or not the test changed anyone's outcome.":
    "Выживаемость считают от диагноза, а диагноз теперь ставят на два года раньше. Все получают двухлетнюю фору на пути к пятилетнему рубежу, независимо от того, изменил ли тест чей-нибудь исход.",
  "A national registry reports that the average time between diagnosis and death for a disease has risen from three years to six since a new scan came into routine use. A minister says patients now live twice as long.":
    "Национальный регистр сообщает, что среднее время между диагнозом и смертью при одной болезни выросло с трёх лет до шести с тех пор, как новый метод визуализации вошёл в рутинную практику. Министр заявляет, что пациенты теперь живут вдвое дольше.",
  "Time from diagnosis to death can double purely because the diagnosis moved earlier. To claim people live longer you have to show that death is arriving later, not that the label is arriving sooner.":
    "Время от диагноза до смерти может удвоиться просто оттого, что диагноз сдвинулся раньше. Чтобы утверждать, что люди живут дольше, нужно показать, что позже наступает смерть, а не что раньше появляется ярлык.",
  "A region invites half its residents, chosen at random, to be screened for a disease and leaves the other half uninvited. Ten years on it counts deaths from that disease among everyone in both halves, screened or not, attended or not. Deaths are 30% lower in the invited half.":
    "Регион приглашает половину своих жителей, выбранных случайным образом, на скрининг по поводу одной болезни, а вторую половину не приглашает. Через десять лет он считает смерти от этой болезни у всех в обеих половинах, прошли они скрининг или нет, явились или нет. В приглашённой половине смертей на 30 % меньше.",
  "This is the design an earlier diagnosis cannot fool. The clock starts at the invitation rather than at diagnosis, and the count includes everyone invited, so no head start and no extra diagnoses can manufacture the difference.":
    "Это тот дизайн, который более ранний диагноз обмануть не может. Отсчёт начинается с приглашения, а не с диагноза, и в подсчёт входят все приглашённые, так что ни фора, ни лишние диагнозы не могут создать эту разницу.",

  // ---- Tag blurbs (browse screen) and timeline scope tags ----
  "Anyone can fall for it": "На это попадаются все",
  "Bites at the bedside": "Подводит у постели больного",
  "Study design & evidence appraisal":
    "Дизайн исследований и оценка доказательств",
  "Reading the numbers": "Как читать числа",
  "Tests & diagnostic reasoning": "Тесты и диагностическое мышление",
  "Screening programmes": "Программы скрининга",
  "Populations, exposure & risk": "Популяции, воздействие и риск",
  "Drugs & drug safety": "Лекарства и их безопасность",
  "Mind & behaviour": "Психика и поведение",
  "Life & evolution": "Жизнь и эволюция",
  "Data, computing & AI": "Данные, вычисления и ИИ",
  "Markets & incentives": "Рынки и стимулы",
  "Elections & policy": "Выборы и политика",
  "Teaching & testing": "Обучение и проверка знаний",
  "Investing & returns": "Инвестиции и доходность",
  "Management & strategy": "Управление и стратегия",
  "Courts & forensics": "Суды и криминалистика",
  "Performance & records": "Результаты и рекорды",
  "The past & how we read it": "Прошлое и как мы его читаем",
  "News & the numbers in it": "Новости и числа в них",
  "From diagnosis": "От диагноза",
  "The whole life": "Вся жизнь",

  // ==== Spectrum bias (dipstick) ====
  "This urine test catches 92% of infections. Your patient's symptoms are vague. How good is it now?":
    "Этот анализ мочи выявляет 92 % инфекций. Симптомы у вашего пациента неопределённые. Насколько он хорош теперь?",
  "A dipstick for urinary infection, checked against urine cultures in an emergency department and a walk-in clinic. Among patients whose doctor already thought an infection was likely, it caught 49 of the 53 who really had one. Sensitivity is normally quoted as a single number, as though it were a fixed property of the test.":
    "Тест-полоска на инфекцию мочевых путей, сверенная с посевом мочи в приёмном отделении и в поликлинике, куда приходят без записи. Среди пациентов, у которых врач и так считал инфекцию вероятной, она выявила 49 из 53 тех, у кого инфекция действительно была. Чувствительность обычно приводят одним числом, как будто это неизменное свойство теста.",
  "In patients the doctor thinks are unlikely to be infected, how often does it catch a real infection?":
    "У пациентов, у которых врач считает инфекцию маловероятной, как часто она выявляет настоящую инфекцию?",
  "Times the dipstick was right": "Сколько раз тест-полоска была права",
  "Doctor thought infection likely": "Врач считал инфекцию вероятной",
  Likely: "Вероятна",
  "Doctor thought infection unlikely": "Врач считал инфекцию маловероятной",
  Unlikely: "Маловероятна",
  "Patients who really had an infection":
    "Пациенты, у которых инфекция действительно была",
  "Patients who did not": "Пациенты, у которых её не было",
  "The quoted figure": "Приводимая цифра",
  "About the same, 92%": "Примерно та же, 92 %",
  "the test has not changed": "тест не изменился",
  "A little lower, around 80%": "Немного ниже, около 80 %",
  "some drop off": "небольшое снижение",
  "Barely half, 56%": "Едва половина, 56 %",
  "it misses most of them": "она пропускает большинство из них",
  "Barely half. And the other column flips the other way.":
    "Едва половина. А второй столбец переворачивается в другую сторону.",
  "The patients changed, not the test": "Изменились пациенты, а не тест",
  "Patients their doctor already suspected had florid infections, the kind a dipstick spots easily. Patients thought unlikely to be infected had mild or early ones, and the test missed most of them. Now look at the second panel, the patients who had no infection at all: there the test was right 42% of the time in the first group and 78% in the second. Sensitivity and specificity are not properties of a test. They are properties of a test meeting a particular mix of people:":
    "У пациентов, которых врач и так подозревал, инфекции были яркими, из тех, что тест-полоска замечает легко. У пациентов, которых считали маловероятно инфицированными, инфекции были лёгкими или ранними, и тест пропустил большинство из них. Теперь посмотрите на вторую панель, на пациентов, у которых инфекции не было вовсе: там тест был прав в 42 % случаев в первой группе и в 78 % во второй. Чувствительность и специфичность, это не свойства теста. Это свойства теста, встретившегося с определённым составом людей:",
  "Both groups": "Обе группы",
  "The spectrum": "Спектр",
  "How many in each group really had an infection":
    "У скольких в каждой группе инфекция действительно была",
  "Spectrum bias": "Ошибка спектра",
  "A test's accuracy is not fixed. It moves with how advanced, how typical and how obvious the disease is in the patients being tested.":
    "Точность теста не постоянна. Она меняется вместе с тем, насколько запущена, насколько типична и насколько очевидна болезнь у обследуемых пациентов.",
  "Before trusting a quoted sensitivity, ask who it was measured on. A figure from patients with unmistakable disease will flatter the test in a clinic full of milder cases, and a study that recruits only textbook cases and healthy volunteers will flatter it most of all.":
    "Прежде чем доверять приведённой чувствительности, спросите, на ком её измеряли. Цифра, полученная на пациентах с несомненной болезнью, приукрасит тест в клинике, полной более лёгких случаев, а исследование, набравшее только хрестоматийные случаи и здоровых добровольцев, приукрасит его сильнее всего.",
  "Sensitivity is the share of truly ill people a test catches, and specificity is the share of healthy people it correctly clears. Both are quoted as though they belonged to the test, like its price. They do not. A test picks up a signal, and the signal is stronger in advanced disease than in early disease, so the sicker the ill people you test, the more of them it finds. The same logic runs the other way for the people without the disease: the more clearly healthy they are, the more easily the test clears them. That is why a test evaluated on obvious cases against obvious non-cases can look superb and then disappoint in a real clinic, where nearly everyone is somewhere in between. Two practical habits follow. Read the description of who was recruited before you read the accuracy figures. And be most suspicious of a study whose diseased and healthy groups were picked separately rather than being consecutive patients with the same presenting problem.":
    "Чувствительность, это доля по-настоящему больных людей, которых тест выявляет, а специфичность, это доля здоровых людей, которых он верно признаёт здоровыми. И то и другое приводят так, будто это принадлежит тесту, как его цена. Это не так. Тест улавливает сигнал, а сигнал при запущенной болезни сильнее, чем при ранней, поэтому чем тяжелее больные, которых вы обследуете, тем больше их тест находит. Для людей без болезни та же логика работает в обратную сторону: чем очевиднее они здоровы, тем легче тест признаёт их здоровыми. Вот почему тест, оценённый на явных случаях против явно здоровых людей, может выглядеть превосходно, а затем разочаровать в настоящей клинике, где почти все находятся где-то посередине. Отсюда две практические привычки. Прочитайте описание того, кого набирали, прежде чем читать цифры точности. И относитесь с наибольшим подозрением к исследованию, в котором больную и здоровую группы подбирали по отдельности, а не брали подряд идущих пациентов с одной и той же жалобой.",
  "The same test, sorted a different way":
    "Тот же тест, разбитый по другому признаку",
  "The same study split its patients again, this time by how many white cells were visible in the urine under a microscope. Where none were visible the dipstick caught 5 of the 10 real infections. Where a few were visible it caught 15 of 22. Where there were many it caught all 34 of 34. One test, one afternoon's samples, and a sensitivity anywhere from 50 to 100 percent depending only on which patients you counted.":
    "То же исследование снова разделило своих пациентов, на этот раз по тому, сколько лейкоцитов было видно в моче под микроскопом. Там, где не было видно ни одного, тест-полоска выявила 5 настоящих инфекций из 10. Там, где было видно немного, она выявила 15 из 22. Там, где их было много, она выявила все 34 из 34. Один тест, образцы одного и того же дня, и чувствительность где угодно от 50 до 100 процентов только в зависимости от того, каких пациентов вы посчитали.",
  "Why promising tests keep disappointing":
    "Почему многообещающие тесты раз за разом разочаровывают",
  "The problem was named in 1978, after a pattern of new tests arriving with excellent published accuracy and then underwhelming the doctors who used them. Two of the era's examples were the carcinoembryonic antigen test and the nitro-blue tetrazolium test. The authors traced the letdown to two things: accuracy measured on a patient mix far narrower than real practice, and the test result and the true diagnosis not being judged independently of each other.":
    "Проблему назвали по имени в 1978 году, после того как раз за разом появлялись новые тесты с прекрасной опубликованной точностью, которые затем не оправдывали ожиданий применявших их врачей. Два примера той эпохи, это тест на раково-эмбриональный антиген и тест с нитросиним тетразолием. Авторы связали разочарование с двумя вещами: точность измеряли на составе пациентов, куда более узком, чем в реальной практике, а результат теста и истинный диагноз оценивали не независимо друг от друга.",
  "Spectrum bias, a reasoning trap.": "Ошибка спектра, ловушка мышления.",
  "Test accuracy sounds like a fact about the test, the way a car has a top speed. It is not. A test that catches 92% of infections in people who are obviously ill can catch barely half in people who are only slightly ill, because there is less to find. Whenever you are told a test is 95% accurate, the real question is who they measured that on, and whether those people look anything like you.":
    "Точность теста звучит как факт о самом тесте, как максимальная скорость у автомобиля. Это не так. Тест, который выявляет 92 % инфекций у явно больных людей, может выявить едва половину у людей, больных лишь слегка, потому что находить там нечего. Всякий раз, когда вам говорят, что тест точен на 95 %, настоящий вопрос в том, на ком это измеряли и похожи ли те люди на вас хоть чем-то.",
  "The counts are Table 3, page 137: 49 of 53 and 21 of 50 in the high prior-probability group, 10 of 18 and 188 of 241 in the low one. A positive dipstick meant leukocyte esterase or nitrite or both; a positive culture meant more than 100,000 colonies per millilitre. The correction notes that the high prior-probability group holds 103 patients, not the 107 still printed in the abstract, and that the rates were computed on 103 and stand. The printed abstract also gives the 0.56 confidence interval as 0.03 to 0.79; the paper's own table gives 0.31 to 0.79.":
    "Числа взяты из таблицы 3 на странице 137: 49 из 53 и 21 из 50 в группе с высокой дотестовой вероятностью, 10 из 18 и 188 из 241 в группе с низкой. Положительная тест-полоска означала лейкоцитарную эстеразу, или нитриты, или и то и другое; положительный посев мочи означал более 100 000 колоний в миллилитре. В опубликованном исправлении отмечено, что в группе с высокой дотестовой вероятностью 103 пациента, а не 107, которые до сих пор напечатаны в резюме статьи, и что доли считали на 103 и они остаются в силе. В напечатанном резюме доверительный интервал для 0,56 указан как от 0,03 до 0,79; в самой таблице статьи он от 0,31 до 0,79.",

  // ==== Berkson's bias (hospital sample) ====
  "Among hospital patients, lung trouble and joint trouble go together. Are the two diseases linked?":
    "Среди пациентов больницы проблемы с лёгкими и проблемы с суставами идут вместе. Связаны ли эти две болезни?",
  "A survey knocked on doors and asked thousands of ordinary people what illnesses they had. Among those who had been in hospital in the previous six months, a quarter of the people with a respiratory disease also had a disease of the bones or joints, against well under a tenth of everyone else.":
    "Опрос обходил дома и спрашивал тысячи обычных людей, какие у них есть болезни. Среди тех, кто за предыдущие полгода лежал в больнице, у четверти людей с болезнью органов дыхания была ещё и болезнь костей или суставов, против заметно менее одной десятой у всех остальных.",
  "Are these two diseases actually related?":
    "Действительно ли эти две болезни связаны между собой?",
  "Also had a bone or joint disease": "Была ещё и болезнь костей или суставов",
  "Had a respiratory disease": "Была болезнь органов дыхания",
  Lungs: "Лёгкие",
  "No respiratory disease": "Не было болезни органов дыхания",
  "No lungs": "Без лёгких",
  "In hospital in the last 6 months":
    "Лежали в больнице за последние 6 месяцев",
  "Everyone the survey asked": "Все опрошенные",
  "Hospital patients": "Пациенты больницы",
  "Yes, one brings on the other": "Да, одна вызывает другую",
  "three times as common": "втрое чаще",
  "Yes, but the other way round": "Да, но наоборот",
  "the joint disease comes first": "сначала болезнь суставов",
  "No, the hospital made the link": "Нет, связь создала больница",
  "it is about who gets admitted": "дело в том, кого госпитализируют",
  "Ask everyone, and the link disappears.": "Спросите всех, и связь исчезает.",
  "Two illnesses are two chances to be admitted":
    "Две болезни, это два шанса попасть в больницу",
  "Hospital and community": "Больница и население",
  "The filter": "Фильтр",
  "Berkson's bias": "Ошибка Берксона",
  "Studying only the people who made it through a filter can invent a relationship that does not exist outside it.":
    "Изучая только тех людей, кто прошёл через фильтр, можно выдумать связь, которой за его пределами не существует.",
  "Hospitals are the obvious filter, and the reason case-control studies built on hospital patients are treated warily. But any selected group does it: people who answered the survey, users who stayed subscribed, applicants who got an interview. Ask what it took to get into the sample, and whether both things you are comparing help you get in.":
    "Больницы, это очевидный фильтр, и именно поэтому к исследованиям случай-контроль, построенным на больничных пациентах, относятся с осторожностью. Но так делает любая отобранная группа: те, кто ответил на опрос, пользователи, оставшиеся с подпиской, кандидаты, которых позвали на собеседование. Спросите, что требовалось, чтобы попасть в выборку, и помогают ли туда попасть обе величины, которые вы сравниваете.",
  "Suppose two illnesses are entirely unrelated, and either one on its own gives you some chance of being admitted to hospital. Someone unlucky enough to have both has two shots at admission, so they are much likelier to be in the ward than someone with only one. Now stand inside the ward and count. The people with the first illness are heavily enriched for also having the second, because that is what got many of them in. You have not discovered a link between the diseases. You have rediscovered the admission rule, and dressed it up as biology. The general shape of this is a collider: a thing that two causes both point into. Selecting on it, whether by studying only the admitted, only the tested, or only the successful, links the causes together in your data even when nothing links them in the world. The defence is a sample defined before the filter, which is exactly why population surveys and whole-population registries are worth their cost.":
    "Допустим, две болезни совершенно не связаны между собой и каждая сама по себе даёт некоторый шанс попасть в больницу. У того, кому не повезло иметь обе, две попытки на госпитализацию, поэтому он окажется в палате гораздо вероятнее, чем человек с одной болезнью. Теперь встаньте внутри палаты и посчитайте. Среди людей с первой болезнью резко обогащена доля тех, у кого есть и вторая, потому что именно она многих из них сюда и привела. Вы не открыли связь между болезнями. Вы заново открыли правило госпитализации и выдали его за биологию. Общая форма этого, это коллайдер: то, во что упираются сразу две причины. Отбор по нему, будь то изучение одних лишь госпитализированных, одних лишь обследованных или одних лишь успешных, связывает причины между собой в ваших данных, даже когда в мире их не связывает ничто. Защита, это выборка, определённая до фильтра, и именно поэтому популяционные опросы и сплошные регистры населения стоят своих денег.",
  "The bias that was theory for thirty years":
    "Ошибка, которая тридцать лет оставалась теорией",
  "Joseph Berkson warned in 1946 that hospital-based comparisons could manufacture associations, but his argument was mathematical and his numbers were invented to illustrate it. He noted that the same artefact would appear if you sampled shuffled cards rather than patients. It took until this survey, three decades later, for anyone to demonstrate the effect in real people.":
    "Джозеф Берксон предупредил в 1946 году, что сравнения на больничном материале способны порождать связи, но его довод был математическим, а числа он придумал для иллюстрации. Он заметил, что тот же артефакт появится, если брать выборку из перетасованных карт, а не из пациентов. Только этот опрос, три десятилетия спустя, впервые показал такой эффект на настоящих людях.",
  "Why early covid studies disagreed":
    "Почему ранние исследования по ковиду противоречили друг другу",
  "In 2020, studies of who caught covid and who fell severely ill could only recruit from people who had been tested or admitted, and early on those were mostly hospital staff, the already unwell and the elderly. Getting into the sample depended on the very things being studied. Analyses showed this alone could produce apparent risk factors, and even reverse the direction of a real one, without any biology behind it.":
    "В 2020 году исследования того, кто заражался ковидом и кто тяжело заболевал, могли набирать людей только среди обследованных или госпитализированных, а поначалу это были в основном сотрудники больниц, уже нездоровые люди и пожилые. Попадание в выборку зависело как раз от того, что и изучали. Анализы показали, что одно это способно породить кажущиеся факторы риска и даже развернуть направление настоящего фактора, без всякой биологии за этим.",
  "Berkson's bias, a reasoning trap.": "Ошибка Берксона, ловушка мышления.",
  "Look only at hospital patients and two completely unrelated illnesses can appear to travel together. The reason is not biology, it is the door. Either illness can get you admitted, so people who happen to have both are over-represented inside, and from in there the two look linked. Any filtered group does this: the people who got tested, the applicants who got an interview, the customers who stayed. Before believing a pattern, ask what it took to get into the data.":
    "Смотрите только на больничных пациентов, и две совершенно не связанные между собой болезни могут показаться идущими вместе. Причина не в биологии, а в двери. Любая из двух болезней может привести к госпитализации, поэтому люди, у которых оказались обе, представлены внутри избыточно, и изнутри эти две болезни выглядят связанными. Так делает любая отфильтрованная группа: те, кого обследовали, кандидаты, которых позвали на собеседование, клиенты, которые остались. Прежде чем поверить закономерности, спросите, что требовалось, чтобы попасть в данные.",
  "The counts are Table 2: household interviews with 2,784 people, of whom 257 had been in hospital in the previous six months. The table's own relative odds are 1.06 in the general population and 4.06 among the hospitalised. The hospital figures rest on only 20 people with a respiratory disease, so this single table demonstrates the mechanism rather than measuring its size precisely.":
    "Числа взяты из таблицы 2: опросы на дому 2784 человек, из которых 257 за предыдущие полгода лежали в больнице. Приведённое в самой таблице отношение шансов составляет 1,06 в общей популяции и 4,06 среди госпитализированных. Больничные цифры опираются всего на 20 человек с болезнью органов дыхания, поэтому эта единственная таблица показывает механизм, а не точно измеряет его величину.",

  // ==== Trap Hunt items (spectrum bias, Berkson's bias, sound decoys) ====
  "A rapid test is validated on patients admitted to hospital with severe disease and on healthy blood donors. It separates the two groups almost perfectly, and the maker reports 98% sensitivity. It is then sold to family doctors for patients with a mild cough.":
    "Экспресс-тест проверяют на пациентах, госпитализированных с тяжёлой болезнью, и на здоровых донорах крови. Он разделяет эти две группы почти безупречно, и производитель заявляет чувствительность 98 %. Затем его продают семейным врачам для пациентов с лёгким кашлем.",
  "Telling the obviously ill from the obviously well is the easiest task there is. A family doctor's patients are all somewhere in between, and that is precisely where the test has never been measured.":
    "Отличить явно больного от явно здорового, это самая лёгкая задача, какая бывает. Пациенты семейного врача все находятся где-то посередине, а именно там тест никогда и не измеряли.",
  "A textbook lists a scan as 90% sensitive. A clinic that sees mostly early, mild cases adopts it and finds it misses about a third of the cases later confirmed by specialists. The clinic concludes its machine must be faulty.":
    "В учебнике для одного метода визуализации указана чувствительность 90 %. Клиника, где преобладают ранние, лёгкие случаи, начинает его применять и обнаруживает, что он пропускает около трети случаев, позже подтверждённых специалистами. Клиника заключает, что дело в неисправности её аппарата.",
  "A quoted sensitivity comes attached to the patients it was measured on. Earlier and milder disease gives a test less to find, so a lower catch rate is what you should expect, not evidence of a broken machine.":
    "Приводимая чувствительность неотделима от тех пациентов, на которых её измеряли. При более ранней и более лёгкой болезни тесту меньше что находить, поэтому более низкая доля выявления, это то, чего и следует ожидать, а не признак сломанного аппарата.",
  "A study of one hospital's inpatients finds that those with a metabolic disease are far more likely to also have a gallbladder disease than the other inpatients. The authors conclude that the first disease brings on the second.":
    "Исследование стационарных пациентов одной больницы обнаруживает, что у пациентов с метаболическим заболеванием болезнь желчного пузыря встречается гораздо чаще, чем у остальных стационарных пациентов. Авторы заключают, что первая болезнь вызывает вторую.",
  "Either illness on its own can put someone in a hospital bed, so patients with both are over-represented among inpatients. The link may exist only inside the building.":
    "Любая из двух болезней сама по себе может уложить человека на больничную койку, поэтому пациенты с обеими избыточно представлены среди стационарных больных. Связь может существовать только внутри этого здания.",
  "Someone notices that among the people they have dated, the better looking ones were consistently less pleasant company. They conclude that good looks spoil the character.":
    "Человек замечает, что среди тех, с кем он встречался, те, кто красивее, неизменно оказывались менее приятными в общении. Он заключает, что красота портит характер.",
  "People generally agree to a date because someone is good looking or because they are pleasant company. Selecting on that forces a trade-off between the two inside the sample, whatever the relationship is outside it.":
    "На свидание обычно соглашаются либо потому, что человек красив, либо потому, что с ним приятно общаться. Отбор по этому признаку навязывает внутри выборки размен между двумя качествами, каким бы ни было их соотношение за её пределами.",
  "A diagnostic test is evaluated on every consecutive patient arriving at a clinic with the same presenting complaint, whatever their eventual diagnosis, and the paper reports its accuracy separately for mild and for advanced disease. Another clinic with a similar caseload adopts the figures.":
    "Диагностический тест оценивают на всех подряд идущих пациентах, приходящих в клинику с одной и той же жалобой, каким бы ни оказался их окончательный диагноз, и статья приводит его точность отдельно для лёгкой и для запущенной болезни. Другая клиника с похожим потоком пациентов берёт эти цифры на вооружение.",
  "This is how a diagnostic study should be built. Consecutive patients with one presenting problem, and accuracy broken down by severity, so a reader can find the subgroup that actually resembles their own patients.":
    "Именно так и должно быть построено диагностическое исследование. Подряд идущие пациенты с одной жалобой и точность в разбивке по тяжести, чтобы читатель мог найти подгруппу, действительно похожую на его собственных пациентов.",
  "A company asks whether two things about its users go together. It samples at random from everyone who ever opened an account, including those who never came back and those who cancelled, and finds no relationship between them.":
    "Компания выясняет, связаны ли между собой две характеристики её пользователей. Она случайным образом отбирает людей из всех, кто когда-либо завёл учётную запись, включая тех, кто больше не вернулся, и тех, кто её закрыл, и никакой связи не находит.",
  "The sample was drawn before any filter that either of the two things could have influenced. Nothing about staying, succeeding or being admitted decided who got counted, so a selection artefact cannot be hiding in it.":
    "Выборку взяли до всякого фильтра, на который могла бы повлиять любая из двух характеристик. Кого посчитали, не зависело ни от того, остался ли человек, ни от его успеха, ни от госпитализации, поэтому артефакт отбора спрятаться в ней не может.",

  // ==== Berkson's bias, corrected reveal wording ====
  "The same survey, the same people, the same two diseases. Across everyone it asked, people with a respiratory disease were barely any likelier to have a bone or joint disease than people without one, and the odds come out at 1.06 against 1, which is nothing. The hospital panel is not a finding about disease, it is a finding about admission. Either illness can put you in a hospital bed, so people with both turn up there far more often than people with one, and inside those walls the two look inseparable:":
    "Тот же опрос, те же люди, те же две болезни. У всех, кого он спросил, болезнь костей или суставов встречалась у людей с болезнью органов дыхания едва ли чаще, чем у людей без неё, и отношение шансов выходит 1,06 против 1, то есть ничего. Больничная панель, это факт не о болезни, а о госпитализации. Любая из двух болезней может уложить вас на больничную койку, поэтому люди с обеими попадают туда гораздо чаще, чем люди с одной, и внутри этих стен две болезни выглядят неразлучными:",

  // ==== Relative versus absolute risk (statin trial) ====
  "A drug cuts your risk of a heart attack by about a third. How many people does that help?":
    "Препарат снижает ваш риск инфаркта примерно на треть. Скольким людям это помогает?",
  "A trial gave 6,595 middle-aged men with high cholesterol and no history of heart trouble either a statin or a dummy pill, and followed them for about five years. The drug cut heart attacks and coronary deaths by roughly a third. That is a real result, and it is how the finding was reported.":
    "В исследовании 6595 мужчин среднего возраста с повышенным холестерином и без проблем с сердцем в прошлом получали либо статин, либо пустышку, и за ними наблюдали около пяти лет. Препарат снизил число инфарктов и коронарных смертей примерно на треть. Это настоящий результат, и именно так о нём и сообщали.",
  "Out of 1,000 men who took it for five years, how many were spared a heart attack or a coronary death?":
    "Из 1000 мужчин, принимавших его пять лет, скольким удалось избежать инфаркта или коронарной смерти?",
  "A five-year statin trial in 6,595 men":
    "Пятилетнее исследование статина у 6595 мужчин",
  "Heart attack or death from heart disease":
    "Инфаркт или смерть от болезни сердца",
  "Dummy pill": "Пустышка",
  Statin: "Статин",
  // captions under the big numbers
  "of the risk removed": "риска устранено",
  "spared, in every 1,000 men treated for five years":
    "мужчины из каждой 1000 избежали события за пять лет лечения",
  "men treated for five years to spare one":
    "мужчины должны лечиться пять лет, чтобы уберечь одного",
  // scope tags (right of the figure caption)
  "Compared to the risk": "В сравнении с риском",
  "Compared to the people": "В сравнении с людьми",
  // choices, reveal, lesson, share, provenance
  "About 300": "Около 300",
  "roughly a third of them": "примерно треть из них",
  "About 100": "Около 100",
  "one in ten": "один из десяти",
  "About 23": "Около 23",
  "roughly 1 in 44": "примерно 1 из 44",
  "Twenty three men in a thousand.": "Двадцать три мужчины из тысячи.",
  "A third of a risk that was small to begin with":
    "Треть риска, который и так был невелик",
  "Both numbers come from the same trial. Without the drug, about 75 men in 1,000 had a heart attack or died of heart disease over the five years. With it, about 53 did. That is a third of the risk gone, and it is also 23 men in 1,000. The first number is divided by the risk, the second by the people, which is the whole reason they feel so different. Put the other way round, 44 men had to take the drug for five years for one of them to be spared:":
    "Оба числа взяты из одного и того же исследования. Без препарата примерно у 75 мужчин из 1000 за эти пять лет случился инфаркт или наступила смерть от болезни сердца. С препаратом таких было около 53. Это исчезнувшая треть риска, и это же самое, 23 мужчины из 1000. Первое число делят на риск, второе на людей, и именно поэтому они ощущаются так по-разному. Если посмотреть с другой стороны, 44 мужчинам надо было принимать препарат пять лет, чтобы уберечь одного из них:",
  "A third of what?": "Треть от чего?",
  "Relative versus absolute risk": "Относительный риск против абсолютного",
  "A percentage reduction tells you what share of a risk went away. It cannot tell you how big that risk was, and that is the part that decides whether it matters to you.":
    "Снижение в процентах говорит, какая доля риска исчезла. Оно не говорит, насколько велик был сам риск, а именно это и решает, важно ли это для вас.",
  "Whenever you meet a percentage change, ask what it is a percentage of. Halving a one-in-a-million risk and halving a one-in-two risk make the same headline and mean completely different things. The two figures worth asking for are the difference in plain numbers of people, and how many have to be treated for one of them to benefit.":
    "Всякий раз, встречая изменение в процентах, спрашивайте, процент от чего это. Уменьшить вдвое риск один на миллион и уменьшить вдвое риск один из двух, это один и тот же заголовок и совершенно разные вещи. Две цифры, которые стоит спросить, это разница в обычных числах людей и то, скольких нужно пролечить, чтобы польза досталась одному.",
  "Take a risk of 8 in 100 and drop it to 5 in 100. Divide the drop by the risk and you get a third, which sounds like a lot. Divide the same drop by the people and you get 3 in 100, which sounds like very little. Neither is wrong. They answer different questions: what fraction of the danger was removed, and what are the odds this helps me. Only the second one is about you. The gap between them grows as the risk shrinks, which is why the most impressive relative figures usually come from the rarest outcomes. This is not only a media problem. Relative figures make treatments look better to doctors too, and the same trial result draws more enthusiasm when it is described relatively than when it is described in whole people. It also cuts the other way with harms: a scare expressed as a doubling of risk sounds alarming whether the risk went from 1 in 10 to 2 in 10 or from 1 in 100,000 to 2 in 100,000. The habit that protects you in both directions is to insist on the numbers out of a fixed group of people, and on how many have to be treated, or exposed, for one to be affected.":
    "Возьмите риск 8 из 100 и снизьте его до 5 из 100. Разделите это снижение на риск, и получится треть, что звучит внушительно. Разделите то же снижение на людей, и получится 3 из 100, что звучит совсем мало. Ни то ни другое не ошибочно. Они отвечают на разные вопросы: какая доля опасности устранена и каковы шансы, что это поможет лично мне. Только второй вопрос о вас. Разрыв между ними растёт по мере того, как риск уменьшается, и поэтому самые впечатляющие относительные цифры обычно получаются при самых редких исходах. Это проблема не только прессы. Относительные цифры делают лечение привлекательнее и в глазах врачей: один и тот же результат исследования вызывает больше энтузиазма, когда его описывают в относительных величинах, а не в целых людях. С вредом это работает и в обратную сторону: испуг, выраженный как удвоение риска, звучит тревожно и когда риск вырос с 1 из 10 до 2 из 10, и когда он вырос с 1 из 100 000 до 2 из 100 000. Привычка, которая защищает вас в обе стороны, это требовать числа из фиксированной группы людей и то, скольких нужно пролечить или подвергнуть воздействию, чтобы это коснулось одного.",
  "The same kind of drug, in people at real risk":
    "Тот же препарат, но у людей с настоящим риском",
  "A second trial gave a statin to patients who had already had a heart attack or had angina. Major coronary events fell from 28 percent to 19 percent. As a relative figure that is about a third, almost the same headline as in the healthy men. But because the risk it was cutting into was nearly four times larger, the gain was about 9 patients in every 100 instead of 2. The identical headline, several times the benefit. This is why a percentage on its own cannot tell you whether a drug is worth taking, and why the answer differs from patient to patient.":
    "Во втором исследовании статин давали пациентам, которые уже перенесли инфаркт или страдали стенокардией. Серьёзные коронарные события сократились с 28 процентов до 19. В относительном выражении это примерно треть, почти тот же заголовок, что и у здоровых мужчин. Но поскольку риск, который препарат урезал, был почти вчетверо больше, выигрыш составил около 9 пациентов на каждые 100 вместо 2. Заголовок тот же, польза в несколько раз больше. Вот почему процент сам по себе не может сказать, стоит ли принимать препарат, и почему ответ у разных пациентов разный.",
  "When a relative figure did real damage":
    "Когда относительная цифра нанесла настоящий вред",
  "In October 1995 a British safety committee warned that some contraceptive pills carried about twice the risk of a blood clot. The warning travelled as a doubling, with no sense of how small the risk was either way, and women stopped taking the pill. Among girls under 16, use fell from 40 percent to 27 percent within a year. The health service met roughly 21 million pounds in extra maternity costs and 46 million pounds in abortion provision. A relative figure with no absolute figure beside it is not a neutral way to describe a risk.":
    "В октябре 1995 года британский комитет по безопасности лекарств предупредил, что при приёме некоторых оральных контрацептивов риск тромба примерно вдвое выше. Предупреждение разошлось именно как удвоение, без всякого представления о том, насколько мал этот риск в обоих случаях, и женщины перестали принимать таблетки. Среди девушек младше 16 лет их применение за год упало с 40 процентов до 27. Здравоохранению это обошлось примерно в 21 миллион фунтов дополнительных расходов на роды и 46 миллионов фунтов на аборты. Относительная цифра, рядом с которой нет абсолютной, это не нейтральный способ описать риск.",
  "The fix is in the wording": "Решение в формулировке",
  "Describe the same result in whole people, so many out of 1,000 against so many out of 1,000, and both patients and doctors judge it far more accurately than when it arrives as a percentage reduction. Relative risks belong to a small family of formats that reliably confuse, alongside single-event probabilities and conditional ones like a test's sensitivity. None of them is wrong. They are just easy to misread, and there is a clearer way to say the same thing.":
    "Опишите тот же результат в целых людях, столько-то из 1000 против столько-то из 1000, и пациенты, и врачи оценят его гораздо точнее, чем когда он подаётся как снижение в процентах. Относительные риски принадлежат к небольшому семейству форматов, которые надёжно сбивают с толку, вместе с вероятностями единичного события и условными вероятностями вроде чувствительности теста. Ни один из них не ошибочен. Их просто легко неверно прочитать, а сказать то же самое можно яснее.",
  "Relative versus absolute risk, a reasoning trap.":
    "Относительный риск против абсолютного, ловушка мышления.",
  "\"Cuts your risk by a third\" sounds enormous. But a third of what? If the risk was 75 in 1,000, a third of it is 23 people. If the risk was 3 in 1,000, a third of it is one. The percentage tells you how much of the risk went away and says nothing at all about how much risk there was, which is the part that decides whether it matters to you. Ask for the plain numbers: how many out of 1,000, and how many people have to take it for one of them to benefit.":
    "«Снижает ваш риск на треть» звучит колоссально. Но треть от чего? Если риск был 75 из 1000, то треть от него, это 23 человека. Если риск был 3 из 1000, то треть от него, это один человек. Процент говорит, сколько риска исчезло, и совсем ничего не говорит о том, сколько риска было, а именно это и решает, важно ли это для вас. Спрашивайте обычные числа: сколько человек из 1000 и скольким нужно это принимать, чтобы польза досталась одному из них.",
  "The counts are the trial's primary endpoint, a definite nonfatal heart attack or death from coronary heart disease: 248 events among the men on placebo and 174 among those on pravastatin, over an average of 4.9 years. The paper reports a 31 percent relative risk reduction, estimated from a proportional-hazards model; the crude counts give 30 percent. Every figure this puzzle shows is derived from the counts, so it quotes about a third rather than a number the chart would contradict.":
    "Числа, это первичная конечная точка исследования, достоверный нефатальный инфаркт миокарда или смерть от ишемической болезни сердца: 248 событий у мужчин на плацебо и 174 у тех, кто получал правастатин, в среднем за 4,9 года. В статье приводится снижение относительного риска на 31 процент, оценённое по модели пропорциональных рисков; по грубым подсчётам событий выходит 30 процентов. Каждая цифра, которую показывает эта головоломка, выведена из этих подсчётов, поэтому здесь говорится примерно о трети, а не приводится число, которому график противоречил бы.",

  // ==== Trap Hunt items (relative versus absolute risk, plus a sound decoy) ====
  "A press release says a new drug halves the risk of a rare complication. It does not say how common the complication is. A newspaper runs the story under the headline that the drug halves the danger.":
    "В пресс-релизе говорится, что новый препарат вдвое снижает риск редкого осложнения. О том, насколько это осложнение распространено, там не сказано. Газета публикует материал под заголовком о том, что препарат вдвое снижает опасность.",
  "Halving a risk means nothing until you know the risk. If the complication strikes 2 people in 10,000, halving it spares one of them.":
    "Уменьшение риска вдвое ничего не значит, пока вы не знаете самого риска. Если осложнение случается у 2 человек из 10 000, то уменьшение вдвое убережёт одного из них.",
  "A supplement is advertised as cutting the chance of a particular cancer by 40%. The trial it rests on found 7 cases among about 1,000 people taking the supplement and 12 among about 1,000 taking a dummy.":
    "Биодобавку рекламируют как снижающую вероятность одного вида рака на 40 %. В исследовании, на которое она опирается, нашли 7 случаев среди примерно 1000 человек, принимавших добавку, и 12 среди примерно 1000 принимавших пустышку.",
  "The 40% is arithmetically right and it amounts to 5 people in 1,000. Around 200 people would have to take the supplement for years for one of them to avoid a cancer.":
    "40 % арифметически верны, и это составляет 5 человек на 1000. Около 200 человек должны были бы годами принимать добавку, чтобы один из них избежал рака.",
  "A trial reports that the treatment reduced strokes from 12 in every 100 patients to 8 in every 100, calls that a reduction of a third, and adds that about 25 patients need to be treated for five years to prevent one stroke.":
    "Исследование сообщает, что лечение снизило число инсультов с 12 на каждые 100 пациентов до 8 на каждые 100, называет это снижением на треть и добавляет, что примерно 25 пациентов нужно лечить пять лет, чтобы предотвратить один инсульт.",
  "The relative figure, the plain numbers of people and the number needed to treat are all on the table, so nothing is hidden behind the percentage. This is how a result should be reported.":
    "Относительная цифра, обычные числа людей и число больных, которых нужно пролечить, все они выложены на стол, так что за процентом ничего не спрятано. Именно так и следует сообщать результат.",
};
