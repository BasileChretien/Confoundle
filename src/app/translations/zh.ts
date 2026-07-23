/**
 * Simplified Chinese dictionary: English source string, Chinese translation.
 * Keys must match the English text exactly. French (fr.ts) used as secondary
 * reference only.
 */
export const zh: Record<string, string> = {
  // ---- UI chrome (buttons, labels, section headers) ----
  "The skill": "这项技能",
  "Where this shows up": "它出现在哪里",
  "See it in the wild": "看看真实案例",
  "Why it happens": "为什么会这样",
  "Same trap, other places": "同样的陷阱，换个地方",
  Source: "来源",
  "Make my card →": "生成我的卡片 →",
  "Go deeper on this idea →": "深入了解这个概念 →",
  "Commit to see the reveal. No peeking.":
    "先做出选择才能看到答案。不许偷看。",
  "Reveal the answer": "揭晓答案",
  "Name the skill →": "说出这项技能 →",
  "Play again": "再玩一次",
  "The lurking variable": "潜在变量",
  "Nicely done, you didn't take the number at face value.":
    "干得漂亮，你没有轻信表面的数字。",
  "So does almost everyone. That's exactly the trap.":
    "几乎所有人都会这样。这正是陷阱所在。",
  "You caught it": "你识破了",
  "Most people miss this": "大多数人都没看出来",
  "You picked": "你选择了",
  Replay: "重玩",
  "Who each treatment actually treated":
    "每种治疗方案实际治的是谁",
  "So what's the skill? →": "那么，这是什么技能？ →",
  // scope tags (right of the figure caption)
  Overall: "总体",
  "By subgroup": "按子组",
  "The facts": "事实",
  "The reality": "真相",
  Observed: "观察到的",
  Explained: "解释之后",
  Survivors: "幸存者",
  "The full picture": "完整图景",
  // category names (humanized)
  "Causal reasoning": "因果推理",
  "Statistical reasoning": "统计推理",
  // tags
  Everyday: "日常",
  Clinical: "临床",
  Research: "研究",
  Statistics: "统计学",
  Diagnosis: "诊断",
  Screening: "筛查",
  Epidemiology: "流行病学",
  Pharmacology: "药理学",
  Psychology: "心理学",
  Biology: "生物学",
  Technology: "技术",
  Economics: "经济学",
  Politics: "政治",
  Education: "教育",
  Finance: "金融",
  Business: "商业",
  Law: "法律",
  Sports: "体育",
  History: "历史",
  Media: "媒体",
  "Demo · try any puzzle": "演示 · 试玩任意谜题",
  // frequency view (base-rate puzzle)
  "1 in": "1 /",
  "How common it is": "它有多常见",
  "Test catches it": "检测能否查出",
  Always: "总是",
  "False-alarm rate": "误报率",
  "Positive tests": "阳性检测",
  of: "/",
  actually: "确实",
  chance: "的概率",
  "false alarm": "误报",
  // wager + stats
  "How sure are you?": "你有多确定？",
  Hunch: "直觉",
  "Fairly sure": "比较确定",
  Certain: "十分确定",
  "Pick one, then stake how sure you are":
    "先选一个，再押上你的确定程度",
  pts: "分",
  Today: "今天",
  Streak: "连胜",
  Best: "最佳",
  Caught: "识破",
  Calibration: "校准",
  "You beat {pct}% of players today":
    "你今天击败了 {pct}% 的玩家",
  "A new puzzle every day. Keep the streak alive.":
    "每天一道新谜题。别让连胜中断。",
  "Sharp eye, and you called it.":
    "眼光敏锐，而且你早就料到了。",
  "Nicely spotted.": "发现得漂亮。",
  "Good instinct.": "直觉不错。",
  "Ouch. Confidently wrong, the classic trap.":
    "哎哟。自信满满却答错了，经典的陷阱。",
  "So does almost everyone. That's the trap.":
    "几乎所有人都一样。这就是陷阱。",
  "You sensed something was off, but went with it anyway.":
    "你察觉到有些不对劲，却还是照着选了。",
  // friends board
  "Friends board": "好友榜",
  "Your name": "你的名字",
  "Copy result": "复制结果",
  Copied: "已复制",
  Share: "分享",
  "Paste your friends' results here":
    "把好友的结果粘贴到这里",
  "Add to board": "加入榜单",
  // trap hunt
  "Trap Hunt": "陷阱狩猎",
  "Some of these are sound. Some hide a trap.":
    "其中有些推理是站得住脚的。有些则藏着陷阱。",
  "Sound reasoning": "推理成立",
  "There's a trap": "这里有陷阱",
  "Which trap?": "是哪种陷阱？",
  Rank: "段位",
  Done: "完成",
  "Trap Hunt unlocked": "陷阱狩猎已解锁",
  "Can you still spot the traps?":
    "你还能识破这些陷阱吗？",
  Novice: "新手",
  Sceptic: "怀疑者",
  Detective: "侦探",
  Analyst: "分析师",
  "Sharp eye": "火眼金睛",

  // ---- shared share-card captions ----
  "Caught it. Bet you can't.": "我识破了。你未必行。",
  "I totally fell for this.": "我彻底上当了。",

  // ==== Simpson's paradox (kidney stones) ====
  "Treatment B cures more patients overall. Which would you pick?":
    "总体来看，治疗方案 B 治愈了更多患者。你会选哪一个？",
  "Two kidney-stone treatments, 350 patients each. On overall success rate, Treatment B comes out ahead. Same illness, same goal, one number to go on.":
    "两种肾结石治疗方案，各 350 名患者。就总体成功率而言，治疗方案 B 更胜一筹。同样的疾病，同样的目标，只有一个数字可供判断。",
  "Which treatment would you pick?": "你会选择哪种治疗方案？",
  "Success rate": "成功率",
  "Treatment A, open surgery": "治疗方案 A，开放手术",
  "Treatment B, keyhole (PCNL)": "治疗方案 B，微创（经皮肾镜取石术 PCNL）",
  "Small stones": "小结石",
  "Large stones": "大结石",
  "Treatment B": "治疗方案 B",
  "83% overall": "总体 83%",
  "Treatment A": "治疗方案 A",
  "78% overall": "总体 78%",
  "Treatment A actually wins, for both stone sizes.":
    "实际上，无论结石大小，都是治疗方案 A 胜出。",
  "Stone size (case severity)":
    "结石大小（病例严重程度）",
  "A and B weren't treating the same patients. A got mostly the hard cases (large stones), while B got mostly the easy ones. Everyone does worse on hard cases, so A's overall average sinks even though A wins in each group:":
    "A 和 B 治疗的并不是同一批患者。A 主要接手了疑难病例（大结石），而 B 主要接手了容易的病例。所有人在疑难病例上的表现都更差，因此即便 A 在每个组里都胜出，它的总体平均值仍被拉低：",
  "Simpson's paradox": "辛普森悖论",
  "An overall trend can reverse once you account for a lurking variable that's split unevenly between the groups.":
    "一旦把在各组之间分布不均的潜在变量考虑进来，总体趋势就可能发生反转。",
  "Whenever two groups are compared with one pooled rate, ask what got mixed together to make that number, and whether the groups were even up against the same odds. Stone size is the clearest confounder here; it's rarely the only one.":
    "每当用一个合并后的比率来比较两个组时，都要问一问：这个数字是把哪些东西混在一起算出来的，以及两个组面对的胜算是否真的一样。结石大小是这里最明显的混杂因素，但它很少是唯一的。",
  "The 'combined' score isn't a fresh measurement; it's the group scores blended together, and bigger groups count for more. When one side is packed with easy cases and the other with hard ones, that blend pulls their combined scores in opposite directions. So one option can lead in the easy group and in the hard group, yet still trail overall, because it handled most of the hard cases, and its blended score sits closer to that lower number. The cure is a fair split: give both sides the same mix of easy and hard cases (exactly what a randomised trial does), and the reversal can't happen.":
    "“合并”得分并不是一次全新的测量，而是把各组的得分混合在一起，而且组越大权重越高。当一方全是容易的病例、另一方全是疑难的病例时，这种混合会把它们的合并得分拉向相反的方向。于是，一个方案可以在容易组和疑难组中都领先，却仍然在总体上落后，因为它处理了大部分疑难病例，其混合后的得分更接近那个较低的数字。解决办法是公平地划分：给双方相同比例的容易与疑难病例（这正是随机对照试验所做的事），反转就不可能发生。",
  "University admissions": "大学录取",
  "In 1973, Berkeley's graduate schools admitted 44% of men but only 35% of women. It looked like plain bias. Yet department by department, women were admitted at about the same rate as men, or higher. Women simply applied more often to the most competitive departments, where almost everyone was turned away. The gap was about where people applied, not who was deciding.":
    "1973 年，伯克利的研究生院录取了 44% 的男性申请者，却只录取了 35% 的女性申请者。这看起来就是赤裸裸的偏见。然而逐个院系来看，女性的录取率与男性大致相当，甚至更高。原因只是女性更多地申请了竞争最激烈的院系，而那些院系几乎人人被拒。差距在于人们申请了哪里，而不在于是谁在做决定。",
  "Baseball batting averages": "棒球打击率",
  "David Justice out-hit Derek Jeter in 1995 (.253 to .250) and again in 1996 (.321 to .314). But over the two seasons combined, Jeter came out ahead, .310 to .270. Each single year said Justice; the two years together said Jeter, because the players had very different numbers of at-bats in their strong and weak seasons.":
    "1995 年，大卫·贾斯蒂斯的打击率高于德里克·基特（0.253 对 0.250），1996 年再次领先（0.321 对 0.314）。但把两个赛季合起来看，反而是基特胜出，0.310 对 0.270。单看每一年都是贾斯蒂斯占优，两年合起来却是基特占优，因为两名球员在各自的强势赛季和低迷赛季里打数相差悬殊。",
  "COVID-19 death rates": "COVID-19 死亡率",
  "Early in 2020, the reported death rate among COVID cases was higher in Italy than in China overall. But broken down by age, Italy's rate was lower in every age group. Italy simply had far more older patients, who are at higher risk, so pooling all ages together made Italy look worse than a fair, age-for-age comparison showed.":
    "2020 年初，在 COVID 病例中，意大利报告的总体死亡率高于中国。但按年龄段拆分后，意大利在每一个年龄段的死亡率都更低。原因只是意大利的老年患者多得多，而老年人风险更高，因此把所有年龄段合在一起，就让意大利显得比按同龄对比更糟。",
  "Simpson's paradox, a reasoning trap.":
    "辛普森悖论，一个推理陷阱。",
  "One choice can win in every single group, yet lose the moment you lump all the groups together. It sounds impossible, but it's real. It happens when the groups aren't a fair comparison: one side quietly got the easy cases, the other got the hard ones. So the big combined number says one thing while the group-by-group numbers say the opposite, and it's the big number that fools you.":
    "一个选项可以在每一个单独的组里都获胜，却在你把所有组合并到一起的那一刻输掉。这听起来不可能，但确实存在。它出现在各组并非公平比较的时候：一方悄悄拿到了容易的病例，另一方拿到了疑难的病例。于是，那个庞大的合并数字说的是一回事，而逐组的数字说的却正好相反，真正骗到你的正是那个大数字。",
  "The 350/350 two-treatment table is as presented by Julious & Mullee (1994), drawn from the Charig et al. (1986) clinical series (which originally compared three modalities).":
    "这张 350/350 的双治疗方案表格取自 Julious 与 Mullee（1994）的呈现方式，数据来源于 Charig 等人（1986）的临床病例系列（该研究最初比较的是三种治疗方式）。",

  // ==== Base-rate fallacy (medical test) ====
  "A near-perfect test says you're sick. How worried should you be?":
    "一项近乎完美的检测说你病了。你到底该有多担心？",
  "This disease is rare, about 1 in 1,000 people have it. The test never misses it when it's really there, and it raises a false alarm on only about 1 in 20 healthy people. Your result just came back positive.":
    "这种疾病很罕见，大约每 1,000 人中只有 1 人患病。当疾病确实存在时，检测从不漏诊；而对健康人，它大约每 20 人才误报 1 次。你的结果刚刚显示为阳性。",
  "What's the chance you actually have the disease?":
    "你真正患病的概率有多大？",
  "In 1,000 people": "在 1,000 人中",
  "have the disease": "患病",
  "test positive": "检测呈阳性",
  "About 95%": "大约 95%",
  "the test is 95% accurate": "这项检测有 95% 的准确率",
  "About half": "大约一半",
  "50/50": "五五开",
  "About 2%": "大约 2%",
  "roughly 1 in 50": "大约每 50 人中 1 人",
  "Positive, but almost certainly a false alarm.":
    "阳性，但几乎可以肯定是一次误报。",
  "The base rate": "基础概率",
  "A rare disease flips the odds":
    "罕见的疾病会颠覆概率",
  "Because almost nobody has the disease, the test's small error rate does the heavy lifting. In 1,000 people, only 1 is truly sick, but about 50 healthy people also get a positive. So among the ~51 positive results, just 1 is real. A positive barely nudges you from “very unlikely” to “still unlikely.”":
    "因为几乎没有人真正患病，检测那一点点的错误率就起了决定性作用。在 1,000 人中，只有 1 人真正患病，但大约 50 名健康人也会得到阳性结果。所以在约 51 个阳性结果中，只有 1 个是真的。一个阳性结果只是把你从“极不可能”勉强推到“仍然不太可能”而已。",
  "The base-rate fallacy": "基础概率谬误",
  "When something is rare, even a very accurate test throws up far more false alarms than real cases, so a positive result can still mean you're probably fine.":
    "当一件事很罕见时，即便是非常准确的检测，产生的误报也远多于真正的病例，因此一个阳性结果仍然可能意味着你大概没事。",
  "The fix is to think in whole people, not percentages: picture 1,000 of them, count the true positives and the false alarms, and compare. Always ask how common the thing is before you trust a positive.":
    "解决办法是用具体的人数来思考，而不是用百分比：想象 1,000 个人，数一数真阳性和误报，然后作比较。在相信一个阳性结果之前，永远先问一问这件事有多常见。",
  "A test's accuracy and your actual odds are two different things. Accuracy is measured on people we already know are sick or healthy. But a positive result asks the reverse question (given this positive, am I sick?), and that depends on how many sick people there were to find in the first place. If only 1 in 1,000 has the disease, the huge healthy majority produces a flood of false alarms that swamps the single real case. Make the disease common and the same test looks excellent; make it rare and a positive means little on its own.":
    "检测的准确率和你的真实概率是两回事。准确率是在我们已经知道谁健康、谁患病的人群上测出来的。但一个阳性结果问的是反过来的问题（既然结果是阳性，我到底病了没有？），而这取决于一开始究竟有多少患者可供检出。如果每 1,000 人中只有 1 人患病，庞大的健康多数就会制造出大量误报，把那唯一的真实病例彻底淹没。让这种病变得常见，同一项检测就显得非常出色；让它变得罕见，单凭一个阳性结果就说明不了什么。",
  "Even doctors slip": "连医生也会出错",
  "Researchers put this exact question to doctors and medical staff: a disease in 1 in 1,000, a test with a 5% false-alarm rate. The most common answer was 95%. The average was 56%. Only about 1 in 5 gave the correct answer of roughly 2%.":
    "研究者把这个完全相同的问题拿去问医生和医护人员：一种每 1,000 人中有 1 人患病的疾病，一项误报率为 5% 的检测。最常见的回答是 95%。平均答案是 56%。只有大约五分之一的人给出了大约 2% 这个正确答案。",
  "Think in people, not percentages":
    "用人数思考，而不是百分比",
  "The simplest cure is wording. Pose the same problem in natural frequencies (“1 in 1,000 people” and “about 50 false alarms” rather than “0.1%” and “5%”), and far more people, doctors included, get it right.":
    "最简单的解药是换一种表述。用自然频率来提出同一个问题（说“每 1,000 人中有 1 人”和“大约 50 次误报”，而不是“0.1%”和“5%”），会有多得多的人，包括医生在内，答对它。",
  "The base-rate fallacy, a reasoning trap.":
    "基础概率谬误，一个推理陷阱。",
  "A test can be 95% accurate and a positive result can still mean you're almost certainly fine. The trick is how rare the thing is. If only 1 in 1,000 people have a disease, then among everyone who tests positive, the few real cases are buried under a pile of false alarms. Accuracy isn't the same as your actual odds; you have to ask how common it is first.":
    "一项检测可以有 95% 的准确率，而一个阳性结果仍然可能意味着你几乎肯定没事。关键在于这件事有多罕见。如果每 1,000 人中只有 1 人患病，那么在所有检测呈阳性的人当中，寥寥几个真实病例会被埋在一大堆误报之下。准确率并不等于你的真实概率，你得先问一问它到底有多常见。",

  // ==== Correlation is not causation (chocolate / Nobel) ====
  "More chocolate, more Nobel Prizes. Should your country stock up?":
    "巧克力越多，诺贝尔奖越多。你的国家该不该囤货？",
  "It's a real, published finding: across 23 countries, the more chocolate people eat, the more Nobel laureates the country has produced, a strong correlation (r ≈ 0.79). The trend is hard to argue with.":
    "这是一项真实而且已发表的发现：在 23 个国家里，人们吃的巧克力越多，这个国家产生的诺贝尔奖得主就越多，二者呈强相关（r ≈ 0.79）。这个趋势很难反驳。",
  "So, does eating chocolate help win Nobel Prizes?":
    "那么，吃巧克力有助于赢得诺贝尔奖吗？",
  "Across 23 countries": "在 23 个国家中",
  "Chocolate eaten": "巧克力消费量",
  "Nobel prizes": "诺贝尔奖",
  "A country's wealth": "国家的财富",
  "r ≈ 0.79": "r ≈ 0.79",
  "Yes, chocolate boosts brainpower":
    "是的，巧克力能提升脑力",
  "the trend is strong": "趋势很明显",
  "No, it's a pure fluke": "不，纯属侥幸巧合",
  coincidence: "巧合",
  "No, a third thing drives both":
    "不，有第三个因素同时驱动两者",
  "a common cause": "一个共同原因",
  "The chocolate isn't doing anything.": "巧克力其实什么作用都没有。",
  "The common cause": "共同原因",
  "A country's wealth pulls both up":
    "国家的财富把两者一同拉高",
  "Wealthier countries can afford more chocolate AND fund more universities, labs and research, which is what actually wins Nobel Prizes. Wealth drives both, so chocolate and Nobels rise together without one causing the other. Hand out free chocolate and you'd get sweeter teeth, not more laureates.":
    "更富裕的国家既买得起更多巧克力，也能资助更多大学、实验室和科研，而后者才是真正赢得诺贝尔奖的原因。财富同时驱动着两者，于是巧克力和诺贝尔奖一起上升，却并非谁导致了谁。免费发放巧克力，你只会收获更甜的牙齿，而不是更多的获奖者。",
  "Correlation ≠ causation": "相关性 ≠ 因果性",
  "Two things moving together doesn't mean one causes the other. Often a third thing is quietly driving both.":
    "两件事一起变化，并不意味着其中一个导致了另一个。往往是第三个因素在悄悄驱动着两者。",
  "When you see a strong link, run through the possibilities before believing X causes Y: maybe Y causes X, maybe a common cause drives both, or maybe it's chance. Usually only a controlled comparison can tell which.":
    "当你看到一个很强的关联时，先把各种可能性都过一遍，再去相信 X 导致了 Y：也许是 Y 导致了 X，也许有一个共同原因同时驱动着两者，也许只是偶然。通常只有一次对照比较才能分辨究竟是哪一种。",
  "A correlation only says two things tend to move together. That can happen for several reasons: one really does cause the other; the causation runs the other way; a hidden third factor drives both (a common cause, like hot weather driving both ice-cream sales and drownings); or it's a coincidence, which gets more likely the more data you sift through. Spotting a correlation is the easy part. Working out which of these is behind it is the real job, and usually needs an experiment, not just a chart.":
    "相关性只说明两件事倾向于一起变化。这可能有好几种原因：一个确实导致了另一个；因果方向恰好相反；一个隐藏的第三因素同时驱动着两者（一个共同原因，比如炎热的天气同时推高了冰淇淋销量和溺水人数）；或者纯属巧合，而你筛查的数据越多，出现巧合的可能性就越大。发现相关性是容易的部分。弄清楚背后究竟是哪一种，才是真正的工作，而这通常需要一次实验，而不只是一张图表。",
  "Storks and babies": "鹳鸟与婴儿",
  "Across European countries, the ones with more storks really do have more human births, a statistically significant link. The legend isn't true: larger countries simply have room for both more storks and more people.":
    "在欧洲各国里，鹳鸟越多的国家，人类新生儿确实也越多，二者的关联在统计上是显著的。但那个传说并不成立：面积更大的国家不过是既能容纳更多鹳鸟，也能容纳更多人口罢了。",
  "Nicolas Cage and drownings": "尼古拉斯·凯奇与溺水",
  "The number of films Nicolas Cage releases in a year tracks the number of people who drown in swimming pools. Nobody thinks one causes the other; line up enough unrelated trends and some will match by pure chance.":
    "尼古拉斯·凯奇一年里上映的电影数量，与在游泳池溺水的人数走势相吻合。没有人会认为其中一个导致了另一个；只要把足够多互不相关的趋势排在一起，总有一些会纯粹出于偶然而对上。",
  "Correlation ≠ causation, a reasoning trap.":
    "相关性 ≠ 因果性，一个推理陷阱。",
  "Two things can rise and fall together perfectly and still have nothing to do with each other. Very often a hidden third thing is pulling both strings at once, so it looks like one causes the other when neither does. Before you believe a headline that “X is linked to Y,” ask what else could be driving both.":
    "两件事可以完美地同涨同跌，却依然彼此毫无关系。很多时候，是一个隐藏的第三者在同时牵动着两根线，于是看起来像是一个导致了另一个，其实二者都没有。在你相信“X 与 Y 相关”这样的标题之前，先问一问还有什么可能在同时驱动着两者。",

  // ==== Survivorship bias (bombers) ====
  "Bombers come home riddled with bullet holes. Where do you add the armour?":
    "轰炸机满身弹孔地飞回来。你会把装甲加在哪里？",
  "In WWII, returning bombers were peppered with damage, heaviest on the wings and body, while the engines and cockpit came back almost untouched. Armour is heavy, so you can only reinforce a few areas.":
    "二战期间，返航的轰炸机布满了损伤，机翼和机身最为严重，而发动机和驾驶舱几乎毫发无损。装甲很重，所以你只能加固少数几个部位。",
  "Where should the armour go?": "装甲应该加在哪里？",
  "Returning bombers": "返航的轰炸机",
  "hits on planes that came back": "飞回来的飞机上的中弹处",
  "armour here, the lost planes' hits":
    "把装甲加在这里，即坠毁飞机的中弹处",
  "The wings and body": "机翼和机身",
  "where the holes are": "弹孔所在之处",
  "Spread it evenly": "均匀分布",
  "play it safe": "稳妥起见",
  "The engines and cockpit": "发动机和驾驶舱",
  "where there are no holes": "没有弹孔的地方",
  "Armour where the holes aren't.":
    "把装甲加在没有弹孔的地方。",
  "The missing planes": "那些没能返航的飞机",
  "You only see the survivors": "你只看到了幸存者",
  "These are the planes that made it home. The ones hit in the engine or cockpit didn't, so their damage never shows up in the data. The holes on the survivors map out exactly where a bomber can be shot and still fly. The clean spots are the fatal ones: armour those.":
    "这些是成功飞回家的飞机。那些在发动机或驾驶舱中弹的飞机没能回来，所以它们的损伤从未出现在数据里。幸存者身上的弹孔恰好标出了一架轰炸机在哪里中弹仍能继续飞行。那些干净、没有弹孔的部位才是致命的：要加固的正是它们。",
  "Survivorship bias": "幸存者偏差",
  "When you only look at the winners, the failures become invisible, and they often hold the real lesson.":
    "当你只盯着赢家看时，失败者就变得隐形了，而真正的教训往往就藏在他们身上。",
  "Before drawing a conclusion, ask who's missing from the data. The planes that didn't return, the funds that closed, the businesses that folded: they were quietly filtered out, and putting them back can flip the answer.":
    "在得出结论之前，先问一问数据里少了谁。那些没有返航的飞机、那些已经清盘的基金、那些倒闭的企业：它们被悄悄地筛掉了，而把它们放回来，答案可能就此翻转。",
  "Survivorship bias creeps in whenever your data has quietly been filtered to keep only the things that “made it”: returning planes, funds still trading, companies still around. You never see the ones that failed and dropped out, and because the survivors share whatever helped them survive, that trait looks far more common, or more effective, than it really is. The fix is to hunt for the missing group and ask what the full picture would show. (The real Wald did more than point at a diagram: he built a statistical method to estimate each part's vulnerability from the survivors' damage.)":
    "只要你的数据被悄悄筛选，只留下那些“挺过来的”东西，幸存者偏差就会悄然潜入：返航的飞机、仍在交易的基金、依然存续的公司。你从来看不到那些失败并出局的对象，而由于幸存者都共有着某种帮助它们存活下来的特质，这一特质就显得比实际上要普遍得多，或者有效得多。解决办法是去寻找那个缺失的群体，并追问完整的图景会呈现出什么。（真实的沃德所做的远不止指着一张图：他建立了一套统计方法，从幸存者的损伤反推出每个部位的脆弱程度。）",
  "Falling cats": "坠落的猫",
  "Vets found that cats falling from higher floors often arrived with fewer injuries than those from lower floors. Part of the reason is grim survivorship: a cat that didn't survive the fall was never brought in, so the hospital's data only counts the ones that lived.":
    "兽医发现，从更高楼层坠落的猫，送来时的伤情往往比从较低楼层坠落的猫更轻。原因之一是一种残酷的幸存者效应：没能从坠落中活下来的猫根本不会被送来，所以医院的数据只统计了那些活下来的。",
  "Star mutual funds": "明星共同基金",
  "Look at the funds still on offer today and active management looks great. But funds that did badly get quietly closed and dropped from the records, so the survivors flatter the whole industry. Counting the dead funds cuts the average return by over a percentage point a year.":
    "只看今天仍在发售的基金，主动管理看起来棒极了。但那些业绩糟糕的基金被悄悄清盘、从记录中剔除，于是幸存者美化了整个行业。把那些已经消失的基金也算进来，平均年回报率会下降一个百分点以上。",
  "Survivorship bias, a reasoning trap.":
    "幸存者偏差，一个推理陷阱。",
  "It's easy to study the winners, the survivors, the successes, the things still standing, and copy what they have in common. But the failures are invisible: they dropped out of the data. Whatever helped the survivors survive looks far more powerful than it is, because you never see everyone it didn't save. Before copying the winners, ask who's missing.":
    "研究赢家、幸存者、成功案例、那些依然屹立的事物，并去模仿它们的共同点，是很容易的。但失败者是隐形的：他们已经从数据里消失了。任何帮助幸存者存活下来的东西，看上去都比实际上强大得多，因为你从来看不到所有那些它没能拯救的对象。在模仿赢家之前，先问一问少了谁。",

  // ==== Prosecutor's fallacy (People v. Collins) ====
  "A 1 in 12 million match. Case closed?":
    "一千二百万分之一的吻合。案子可以结了吗？",
  "Los Angeles, 1964. A woman is knocked down and her purse is taken. Witnesses describe the pair who ran off: a blonde woman with a ponytail and a bearded Black man, in a partly yellow car. A couple who fit every detail are charged. At the trial an expert is asked to assume a frequency for each feature, multiplies them together, and gets 1 in 12 million. The prosecutor tells the jury that is the chance the two in the dock are innocent. Take the 1 in 12 million at face value, and picture the 12 million couples who could have been the ones.":
    "1964 年，洛杉矶。一名女子被撞倒，手袋被抢走。目击者描述了逃走的那一对人：一名扎马尾的金发女子和一名留胡须的黑人男子，开着一辆部分为黄色的汽车。一对每个细节都吻合的情侣被起诉。庭审中，一位专家被要求为每项特征假定一个出现频率，把它们相乘，得出一千二百万分之一。检察官告诉陪审团，这就是被告席上那两人清白的概率。姑且照单全收这个一千二百万分之一，然后想象一下可能作案的那一千二百万对情侣。",
  "This couple fits the description. What are the odds they did it?":
    "这对情侣符合描述。他们就是作案人的概率有多大？",
  "In 12 million couples": "在一千二百万对情侣中",
  "did it": "确实作案",
  "fit the description": "符合描述",
  "Virtually certain": "几乎可以肯定",
  "12 million to one against them": "一千二百万比一，对他们极为不利",
  "Around 99%": "大约 99%",
  "not quite proof, but close": "算不上铁证，但已经很接近",
  "About a coin flip": "大约相当于抛一次硬币",
  "roughly 50/50": "差不多五五开",
  "One in 12 million, and still a coin flip.":
    "一千二百万分之一，却依然只是五五开。",
  "The flipped question": "被调换的问题",
  "Rare evidence is common in a big crowd":
    "罕见的证据在庞大的人群里并不罕见",
  "The 1 in 12 million answers one question: pick a couple at random, how likely are they to fit? The jury has to answer a different one: of all the couples who do fit, which pair did it? Line up 12 million couples. One pair are the robbers, and of course they fit. But at odds of 1 in 12 million, roughly one more couple in that crowd fits by pure chance. So a couple who fits is about as likely to be innocent as guilty.":
    "一千二百万分之一回答的是这样一个问题：随机挑出一对情侣，他们符合描述的可能性有多大？而陪审团要回答的是另一个问题：在所有符合描述的情侣当中，究竟哪一对作了案？把一千二百万对情侣排成一列。其中一对是劫匪，他们当然符合描述。但按照一千二百万分之一的概率，这群人里大约还会有另外一对纯属偶然地符合描述。所以，一对符合描述的情侣，清白的可能性和有罪的可能性差不多。",
  "The California Supreme Court reversed the conviction in 1968. Working from the prosecution's own figures, it found a likelihood of over 40 percent that at least one other couple could have fitted the description just as well, and it warned that guilt cannot be settled by arithmetic like this.":
    "1968 年，加利福尼亚州最高法院撤销了这项有罪判决。法院依据控方自己给出的数字算出，至少还有另一对情侣同样完全符合描述的可能性超过 40%，并警告说，有罪与否不能靠这样的算术来定。",
  "The prosecutor's fallacy": "检察官谬误",
  "“If he were innocent, this evidence would be that unlikely” is not the same as “this evidence makes him that unlikely to be innocent.” Swap the two and a coin flip starts to sound like certainty.":
    "“如果他是清白的，这项证据出现的可能性就这么低”与“这项证据让他清白的可能性就这么低”并不是一回事。把两者调换，五五开的概率听起来就成了板上钉钉。",
  "Before you accept a one in a million match, ask how big the pool was. One in a million odds across a city of ten million throw up about ten matches, and only one of those people did it. The number means nothing until you say who was in the crowd.":
    "在你接受一个百万分之一的吻合之前，先问一问样本池有多大。百万分之一的概率放到一千万人的城市里，会冒出大约十个吻合的人，而其中只有一个人作了案。在你说清楚人群里都有谁之前，这个数字什么也说明不了。",
  "Two questions sound identical and are not. The first: if this person had nothing to do with it, how likely is this evidence? That is what a lab or an expert can actually measure, and it is where figures like 1 in 12 million come from. The second: given this evidence, how likely is it that this person did it? That is what a jury has to decide, and it depends on something no lab measures, namely how many people could have done it. Push odds of 1 in 12 million through a crowd of 12 million and you expect about one innocent match, so the match on its own is worth roughly a coin flip. Shrink the crowd, or add independent evidence, and the same match becomes powerful. Grow the crowd, and it becomes weak. The trap also runs in reverse: a defence lawyer can say that 2,000 people in the city share that blood type, so the evidence proves nothing, which quietly ignores that the other 1,999 were nowhere near the crime.":
    "有两个问题听上去一模一样，其实并不相同。第一个：如果这个人与此事毫无关系，出现这项证据的可能性有多大？这才是实验室或专家真正能够测量的东西，也是一千二百万分之一这类数字的来源。第二个：既然有了这项证据，这个人作案的可能性有多大？这是陪审团必须裁断的问题，而它取决于没有任何实验室能测量的东西，也就是有多少人可能作案。把一千二百万分之一的概率放进一千二百万人的人群，预计会出现大约一个清白的吻合者，所以单凭这一处吻合，价值大致相当于抛一次硬币。把人群缩小，或者加入独立的证据，同样的吻合就变得很有力。把人群扩大，它就变得很无力。这个陷阱也会反过来出现：辩护律师可以说，全城有 2,000 人是同一种血型，所以这项证据什么也证明不了，而这句话悄悄忽略了另外 1,999 人当时根本不在案发现场附近。",
  "Two cot deaths, and a number that became guilt":
    "两起婴儿猝死，和一个变成罪证的数字",
  "An English murder trial heard that the chance of two cot deaths in a family like the defendant's was 1 in 73 million. Press reports turned that into the chance the deaths were natural. The Royal Statistical Society said publicly that the figure had no statistical basis, because it assumed the two deaths were independent, and that reading it as a chance of innocence is the prosecutor's fallacy. What the jury needed was a comparison: two cot deaths and two murders are both rare, so which is rarer here?":
    "在英格兰的一场谋杀案审判中，陪审团听到，像被告这样的家庭出现两起婴儿猝死的概率是七千三百万分之一。媒体报道把它说成了这两起死亡属于自然死亡的概率。英国皇家统计学会公开表示，这个数字没有统计学依据，因为它假定两起死亡彼此独立，而把它读成清白的概率正是检察官谬误。陪审团真正需要的是一次比较：两起婴儿猝死和两起谋杀都很罕见，那么在这里究竟哪一个更罕见？",
  "Almost nobody spots the swap": "几乎没有人看出这个调换",
  "Researchers gave 73 students a murder case in which the killer's blood type is found in 1 person in 100, then showed them a prosecution argument built on the swapped question: only a 1 percent chance the blood came from someone else, so a 99 percent chance the suspect is guilty. 21 of the 73 rated that argument correct, and only 16 saw that it and the opposing defence argument were both wrong.":
    "研究者给 73 名学生看了一起谋杀案，凶手的血型每 100 人中有 1 人具备，然后向他们展示了一段建立在问题调换之上的控方论证：血迹来自他人的概率只有 1%，所以嫌疑人有罪的概率是 99%。73 人中有 21 人认为这段论证是正确的，只有 16 人看出它和与之相对的辩方论证同样都是错的。",
  "The prosecutor's fallacy, a reasoning trap.": "检察官谬误，一个推理陷阱。",
  "When an expert says there is only a one in a million chance of a match by accident, that is a fact about the evidence, not about the person in the dock. Flip the two around and you get the prosecutor's fallacy. The cure is to ask how many people were in the pool: one in a million odds across a city of ten million produce about ten innocent matches, so on its own a match can be nowhere near proof.":
    "当专家说偶然吻合的概率只有百万分之一时，这是关于证据的事实，而不是关于被告席上那个人的事实。把两者颠倒过来，就得到了检察官谬误。解药是追问样本池里有多少人：百万分之一的概率放到一千万人的城市里，会产生大约十个清白的吻合者，所以单凭一处吻合，离铁证还差得很远。",
  "Spotted the swap. Bet you don't.": "我看出了那个调换。你未必看得出。",
  "I'd have convicted on the spot.": "换作是我，当场就定罪了。",
  "The court's appendix showed that on those same figures, with a pool of about 12 million couples, the chance that at least one other couple fitted the description was roughly 41 percent.":
    "法院的附录显示，按照同样这些数字，在大约一千二百万对情侣的样本池中，至少还有另一对情侣符合描述的概率大约是 41%。",

  // ==== Will Rogers phenomenon (stage migration) ====
  "Better survival in every single stage. Did anyone actually live longer?":
    "每一个分期的生存率都提高了。真的有人因此活得更久吗？",
  "One group of 131 lung cancer patients, treated in 1977, sorted into stages twice. First using only the information older hospitals could gather, then again after new scans. Nobody was treated differently. Only the sorting changed.":
    "同一批 131 名肺癌患者，都在 1977 年接受治疗，却被分期了两次。第一次只使用早年医院能够收集到的信息，第二次是在做过新的扫描之后。没有任何人的治疗有所不同，改变的只是分期方式。",
  "Did these patients actually do better?": "这些患者的结局真的更好了吗？",
  "Six-month survival": "六个月生存率",
  "Sorted the old way": "按旧方式分期",
  Old: "旧分期",
  "Sorted after the new scans": "按新扫描结果分期",
  New: "新分期",
  "Stage I": "I 期",
  "Stage II": "II 期",
  "Stage III": "III 期",
  "Yes, they did better": "是的，他们的结局更好了",
  "every stage improved": "每个分期都改善了",
  "There is no way to tell": "无从判断",
  "too little to go on": "可依据的信息太少",
  "No, nothing changed": "没有，什么都没有改变",
  "only the labels moved": "移动的只是标签",
  "Identical. Seventy two survivors either way.":
    "完全一样。两种分期方式都是 72 名幸存者。",
  "The migration": "分期迁移",
  "Patients moved between stages, and lifted both":
    "患者在分期之间移动，把两边都抬高了",
  "The new scans spotted spread that the old workup had missed, so patients were moved out of better stages into worse ones. Each of them was among the sickest in the stage they left, so that stage's average rose. Each was also among the healthiest in the stage they joined, so that average rose too. Every stage improved and not one person's outcome changed:":
    "新的扫描查出了旧检查漏掉的扩散，于是一部分患者被从较好的分期移到了较差的分期。他们每个人在原来那个分期里都属于病情最重的，所以那个分期的平均值上升了；他们在新加入的分期里又都属于病情最轻的，所以那个分期的平均值也上升了。每个分期都改善了，却没有任何一个人的结局发生变化：",
  "The Will Rogers phenomenon": "威尔·罗杰斯现象",
  "Move members from one group into another and you can lift the average of every group at once, while the overall picture stays exactly the same.":
    "把成员从一个组挪到另一个组，你可以同时抬高每一个组的平均值，而整体的图景却分毫未变。",
  "Whenever a category's average improves, ask whether the category still holds the same kind of members. Better detection quietly reshuffles who counts as mild and who counts as severe, and a reshuffle on its own can make every column look better.":
    "每当某个类别的平均值改善时，都要问一问这个类别里装的还是不是同一类成员。更灵敏的检测会悄悄重新洗牌，改变谁算轻症、谁算重症，而仅仅这样一次重新洗牌本身，就足以让每一根柱子都显得更好看。",
  "Picture two buckets, one of good outcomes and one of bad. Take the worst items out of the good bucket and drop them into the bad one, where they are the best of a bad lot. The good bucket's average rises because its weakest members left. The bad bucket's average rises because it gained members better than its own. Both averages improve and nothing about any individual has changed. In medicine the reshuffling is done by better scans, which find disease that was always there but previously invisible. That is why survival by stage can improve across the board in a period when the treatments themselves did not get better, and it is why comparing stages across eras of different technology is treacherous.":
    "想象两个桶，一个装着好结局，一个装着坏结局。把好桶里最差的那些拿出来，扔进坏桶，它们在坏桶里成了矮子里的高个。好桶的平均值上升，因为最弱的成员离开了；坏桶的平均值也上升，因为它收进了比自己原有成员更好的对象。两个平均值都改善了，而任何一个个体身上其实什么都没有变。在医学里，负责这次重新洗牌的是更好的扫描，它们查出了本来就存在、只是从前看不见的病灶。这就是为什么在治疗手段本身并没有进步的年代，按分期统计的生存率却可能全线提高；也正因如此，跨越不同技术年代去比较各个分期是很危险的。",
  "The check that gave it away": "揭穿真相的那次核对",
  "The same researchers sorted both eras of patients by their symptoms instead, a yardstick no scanner can shift. Judged that way the two groups survived at much the same rate, around 77 and 78 percent for those without symptoms, and 26 against 22 percent for the sickest. What had really changed was the mix, because the newer group held twice the proportion of the mildest patients.":
    "同一批研究者改用症状来给两个年代的患者分组，而症状这把尺子是任何扫描仪都撼动不了的。这样判断下来，两组患者的生存率相差无几：无症状者大约是 77% 与 78%，病情最重者则是 26% 对 22%。真正改变的是人群构成，因为较新的那一组里最轻症患者的比例是另一组的两倍。",
  "It happened again with PET": "PET 出现后又上演了一次",
  "As PET scanning spread through American hospitals, lung cancer patients were reclassified all over again. The share labelled most advanced grew, and survival within the stages duly ticked up, two year survival moving from 18 to 22 percent in one stage and 6 to 8 percent in another. The authors called their paper the phenomenon revisited.":
    "随着 PET 扫描在美国各医院普及，肺癌患者又被重新分了一次期。被划入最晚期的比例变大了，各个分期内部的生存率也随之走高：某个分期的两年生存率从 18% 升到 22%，另一个分期从 6% 升到 8%。作者在论文标题里把它称作这一现象的重现。",
  "The Will Rogers phenomenon, a reasoning trap.":
    "威尔·罗杰斯现象，一个推理陷阱。",
  "Take the worst members of a good group and move them into a bad group. The good group's average rises, because its weakest ones left. The bad group's average rises too, because the newcomers are better than what it already had. Every group improves and nothing real has happened. It is how sharper scans can make survival look better in every stage of a disease while exactly as many people live and die.":
    "把一个好组里最差的成员挪到一个差组里去。好组的平均值上升，因为最弱的那些走了；差组的平均值也上升，因为新来的比它原有的成员更好。每个组都在改善，而现实中什么也没有发生。更清晰的扫描正是这样，让一种疾病的每一个分期看上去生存率都更好，而活下来和死去的人数却一个不差。",
  "The counts are Table 4: the 1977 cohort of 131 patients staged twice, once on the data the older cohort had and once with the new imaging. Both stagings give 72 survivors, a six-month survival of 55 percent.":
    "这些数字出自表 4：1977 年那一组 131 名患者被分期了两次，一次依据早年队列所能掌握的数据，一次依据新的影像检查。两种分期都得出 72 名幸存者，六个月生存率均为 55%。",

  // ==== Trap Hunt test items ====
  "Two schools publish exam results. School B has the higher pass rate overall, 75% against 70%. When results are split by student background, School A comes out ahead in every single group. The district praises School B.":
    "两所学校公布了考试成绩。总体及格率上 B 校更高，75% 对 70%。但把成绩按学生背景拆分后，A 校在每一个组里都领先。学区表扬了 B 校。",
  "A wins in every group but loses overall, which happens when the groups are mixed unevenly. The pooled number is the misleading one here.":
    "A 校在每个组里都赢，总体却输了，这在各组混合比例不均时就会发生。在这里，误导人的正是那个合并后的数字。",
  "A factory reports its new process has a lower defect rate than the old one, 3% against 4%. Looking at simple parts and complex parts separately, the old process had fewer defects in both.":
    "一家工厂报告说，新工艺的次品率低于旧工艺，3% 对 4%。但把简单零件和复杂零件分开来看，旧工艺在这两类零件上的次品都更少。",
  "Better in both categories yet worse overall means the two processes handled very different mixes of simple and complex parts.":
    "在两个类别里都更好，总体却更差，这说明两种工艺所处理的简单零件与复杂零件的比例相差很大。",
  "A condition affects about 1 in 2,000 people. A screening test is 99% accurate. A patient tests positive and is told they almost certainly have the condition.":
    "某种疾病大约每 2,000 人中有 1 人患上。一项筛查检测的准确率为 99%。一名患者检测呈阳性，被告知他几乎肯定患有这种病。",
  "With a condition this rare, the 1% error rate produces far more false positives than there are real cases, so a positive is still more likely to be a false alarm.":
    "疾病如此罕见，1% 的错误率所产生的假阳性远多于真实病例，所以一个阳性结果仍然更可能是一次误报。",
  "A system flags travellers as suspicious and is 95% accurate. About 1 in 1,000 travellers is actually a threat. An official states that a flagged traveller is 95% likely to be a threat.":
    "一套系统会把旅客标记为可疑，准确率为 95%。大约每 1,000 名旅客中真正构成威胁的有 1 人。一名官员表示，被标记的旅客有 95% 的可能性是威胁。",
  "That confuses the test's accuracy with the odds after a flag. Because threats are rare, the overwhelming majority of flags are ordinary travellers.":
    "这是把检测的准确率与被标记之后的概率混为一谈。由于威胁很罕见，绝大多数被标记出来的人都是普通旅客。",
  "Neighbourhoods with more parks have lower obesity rates. A council report concludes that building parks will reduce obesity, and proposes a park-building programme.":
    "公园更多的社区，肥胖率更低。一份市政报告据此得出结论：修建公园可以降低肥胖率，并提出了一项建园计划。",
  "Wealth and urban planning plausibly drive both park provision and health, so the link may not be the parks doing the work.":
    "财富和城市规划很可能同时影响着公园的配置与居民的健康，所以这种关联未必是公园在起作用。",
  "Students who visit the library more often get higher grades. A university announces mandatory weekly library visits to raise grades.":
    "更常去图书馆的学生成绩更好。一所大学宣布强制每周去一次图书馆，以提高成绩。",
  "Motivated students both study more and visit the library. Forcing the visit does not import the motivation that produced the grades.":
    "有学习动力的学生既学得更多，也更常去图书馆。强制去图书馆，并不能把带来好成绩的那份动力一并搬过来。",
  "A business book studies companies that have thrived for fifty years and finds nearly all had bold, risk-taking leaders. It concludes that bold leadership causes lasting success.":
    "一本商业书籍研究了那些兴盛了五十年的公司，发现它们几乎都拥有敢于冒险的大胆领导者。书中由此得出结论：大胆的领导力带来了持久的成功。",
  "The bold companies that went under are not in the sample. Boldness may equally well cause spectacular failure, which the study cannot see.":
    "那些同样大胆却已经倒闭的公司不在样本里。大胆同样可能导致惨烈的失败，而这项研究看不到这一面。",
  "A clinic reviews patients who completed its demanding rehabilitation programme and finds excellent outcomes. It reports the programme as highly effective.":
    "一家诊所回顾了那些完成了其高强度康复项目的患者，发现结果非常好。诊所据此宣称该项目效果显著。",
  "Patients who dropped out are excluded, and they are likely the ones doing worst. Counting only finishers flatters the programme.":
    "中途退出的患者被排除在外，而他们很可能正是情况最差的那些人。只统计完成者，会让这个项目显得比实际更好。",
  "A database search turns up one man whose DNA matches a crime-scene sample. The lab reports that the profile occurs in about 1 person in a million. The prosecutor tells the jury there is therefore about a one in a million chance that he is innocent.":
    "一次数据库检索找出了一名 DNA 与犯罪现场样本吻合的男子。实验室报告说，这种基因图谱大约每一百万人中出现 1 例。检察官因此告诉陪审团，他清白的概率大约是百万分之一。",
  "The 1 in a million is the chance of a match if he is innocent, not the chance he is innocent given a match. In a large pool other people match too, so the two numbers are nowhere near the same.":
    "百万分之一是他清白时出现吻合的概率，而不是在出现吻合时他清白的概率。在一个庞大的样本池里，还会有别人同样吻合，所以这两个数字相差甚远。",
  "Fibres on a suspect's coat match the victim's carpet. An expert says only about 1 coat in 5,000 would carry such fibres. Counsel concludes the suspect is 4,999 times more likely to be guilty than innocent.":
    "一名嫌疑人外套上的纤维与受害者家的地毯吻合。一位专家说，大约每 5,000 件外套中只有 1 件会沾上这样的纤维。律师据此得出结论：嫌疑人有罪的可能性是清白的 4,999 倍。",
  "A rarity figure describes the evidence, not the person. How many innocent people could have picked up those fibres depends on how many people were ever near that carpet.":
    "罕见程度的数字描述的是证据，而不是人。有多少清白的人可能沾上这些纤维，取决于曾经有多少人接近过那块地毯。",
  "An expert testifies that the DNA profile occurs in roughly 1 person in a million, and adds that in a city of two million this means about two other people would be expected to match as well, so the match alone does not single out the defendant.":
    "一位专家作证说，这种 DNA 图谱大约每一百万人中出现 1 例，并补充说，在一座两百万人口的城市里，这意味着预计还会有大约两个人同样吻合，因此单凭吻合并不能锁定被告。",
  "This is the rarity figure stated correctly. The expert converts it into expected matches in the population instead of flipping it into a probability of innocence.":
    "这是对罕见程度数字的正确表述。专家把它换算成了人群中预期的吻合人数，而不是把它翻转成清白的概率。",
  "Patients are assigned at random to a drug or a placebo. The drug group has fewer strokes, and the difference holds within every age group. The researchers conclude the drug reduces strokes.":
    "患者被随机分配到药物组或安慰剂组。药物组的卒中更少，而且这一差异在每一个年龄段中都成立。研究者由此得出结论：该药物可以减少卒中。",
  "Randomisation balances the hidden differences, and the effect survives splitting by age. This reasoning is sound.":
    "随机化平衡了那些看不见的差异，而且按年龄拆分之后效果依然存在。这个推理是站得住脚的。",
  "A test with a 1% false-positive rate is used in a clinic where about 40% of those tested genuinely have the condition. A doctor tells a patient that a positive result makes the condition much more likely.":
    "一项假阳性率为 1% 的检测被用在一家诊所，而在这里接受检测的人中约有 40% 确实患有该病。一位医生告诉患者，阳性结果让患病的可能性大大提高。",
  "The base rate matters, and here it is high. With 40% prevalence a positive really is strong evidence, so applying the rare-disease lesson would be a mistake.":
    "基础概率很重要，而这里的基础概率很高。在 40% 的患病率下，阳性结果确实是有力的证据，所以套用罕见病那条教训反而是错的。",
  "A city compares road deaths before and after lowering a speed limit, adjusts for traffic volume, and checks the national trend over the same years. The local drop is larger than the national trend.":
    "一座城市比较了限速下调前后的道路死亡人数，对交通流量做了校正，并核对了同期的全国趋势。当地的下降幅度大于全国趋势。",
  "They accounted for the obvious confounders and for the background trend, which is what makes a before-and-after comparison credible.":
    "他们把明显的混杂因素和背景趋势都考虑在内，而这正是前后对比之所以可信的原因。",
  "A trial reports outcomes for everyone who was enrolled, including those who stopped treatment early, and states how many dropped out and why.":
    "一项试验报告了所有入组者的结局，包括那些提前中止治疗的人，并说明了有多少人退出以及退出的原因。",
  "Reporting the whole enrolled group, dropouts included, is exactly the defence against counting only the survivors.":
    "报告整个入组人群，把退出者也包括在内，正是防止只统计幸存者的办法。",
  "A hospital installs a more sensitive scanner. Over the next two years it reports that survival improved in every severity grade of the disease, from the mildest to the most advanced, and concludes that its care has got better.":
    "一家医院装了一台更灵敏的扫描仪。在随后的两年里，它报告说这种疾病每一个严重程度分级的生存率都提高了，从最轻的一级到最重的一级无一例外，并据此得出结论：本院的诊疗水平变好了。",
  "A sharper scanner regrades patients. Those moved out of a mild grade were its sickest, and they arrive in a severe grade as its healthiest, so both averages rise without anyone doing better.":
    "更清晰的扫描仪会把患者重新分级。被移出轻度分级的那些人原本是该级中病情最重的，而他们进入重度分级后又成了该级中病情最轻的，于是两边的平均值都上升，却没有任何人的结局变好。",
  "A school adopts a placement test that is much better at identifying struggling pupils, and uses it to sort them into a top and a bottom stream. The next year, average results rise in both streams. The head teacher credits the new teaching methods.":
    "一所学校采用了一种更能识别出学习吃力学生的分班测验，并用它把学生分成快班和慢班。第二年，两个班的平均成绩都上升了。校长把功劳归于新的教学方法。",
  "The pupils reclassified out of the top stream were its weakest and become the strongest of the bottom stream, so both averages climb on reshuffling alone.":
    "被重新划出快班的学生原本是快班里最弱的，进入慢班后又成了慢班里最强的，所以仅凭这一次重新分班，两个班的平均分就都会上升。",
  "A hospital reports that survival improved in every severity grade over five years. It also reports that the grading criteria did not change in that time, that no new diagnostic test was introduced, and that the number of patients in each grade stayed about the same.":
    "一家医院报告说，五年间每一个严重程度分级的生存率都提高了。医院同时说明，这期间分级标准没有改动，没有引入新的诊断检查，各个分级中的患者人数也基本保持不变。",
  "This is the case where the improvement is real. Nothing reclassified the patients, and the grades held the same share of people, so no reshuffling could have manufactured the gain.":
    "这正是改善确有其事的情形。没有任何因素把患者重新分级，各个分级所占的人数比例也没有变化，所以不可能有什么重新洗牌制造出这份进步。",
};
