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

  // ---- Lead-time bias (puzzle #7) ----
  A: "A",
  B: "B",
  "Screened patients survive five years after diagnosis. Unscreened ones survive two.":
    "接受筛查的患者确诊后存活五年。未接受筛查的只有两年。",
  "The same cancer, growing at the same speed, treated the same way. One person had a scan that found it early. The other went to a doctor years later, when the first symptom appeared. Survival is counted from the day of diagnosis, which is how survival is almost always counted.":
    "同样的癌症，以同样的速度生长，接受同样的治疗。一个人做了扫描，早早就查了出来。另一个人几年后才去看医生，那时第一个症状刚刚出现。生存期从确诊那一天算起，而生存期几乎从来都是这样算的。",
  "Did finding it early give this person more time alive?":
    "早点发现，有没有让这个人多活一些时间？",
  "One life, two moments of diagnosis": "一段人生，两个确诊时刻",
  years: "年",
  "cancer begins": "癌症开始",
  diagnosed: "确诊",
  died: "死亡",
  "Survival counted from diagnosis": "从确诊起算的生存期",
  "Found when symptoms appeared": "出现症状后发现",
  "Found early, by screening": "经筛查早期发现",
  "Yes, three extra years": "是的，多了三年",
  "five instead of two": "五年而不是两年",
  "No, not one extra day": "没有，一天也没多",
  "only the clock moved": "移动的只是时钟",
  "Both died on exactly the same day.": "两个人死在完全相同的一天。",
  "The clock started earlier, the life did not get longer":
    "时钟提前开始，生命并没有变长",
  "Screening did not postpone anything. It moved the diagnosis three years earlier, so this person spent three more years knowing they had cancer. Counted from diagnosis that reads as three extra years of survival. Put both lives on the same calendar and they end at the same instant:":
    "筛查没有推迟任何事情。它把确诊提前了三年，所以这个人多出三年是在知道自己患癌的情况下度过的。从确诊起算，这看上去就是多了三年生存期。把两段人生放到同一条日历上，它们在同一瞬间结束：",
  "The extra years": "多出来的那几年",
  "Lead-time bias": "领先时间偏倚",
  "Finding a disease earlier stretches survival measured from diagnosis even when it postpones death by not a single day.":
    "更早发现疾病，会拉长从确诊起算的生存期，哪怕它一天也没能把死亡推迟。",
  "This does not mean early detection is worthless. It means survival from diagnosis cannot tell you whether it worked. Whenever survival improves after a new test arrives, ask whether people are living longer or simply being told sooner. The measure that cannot be fooled this way is the death rate in the whole population, screened and unscreened alike.":
    "这并不意味着早期发现毫无价值。它意味着从确诊起算的生存期无法告诉你早期发现是否奏效。每当一项新检测出现之后生存数字变好了，都要问一问：人们是真的活得更久，还是只是被更早地告知。唯一骗不了的指标是整个人群的死亡率，接受筛查的和没接受筛查的一起算。",
  "Survival statistics start their clock on the day of diagnosis. That day is not a fact about the disease, it is a fact about when somebody looked. Move the looking earlier and you add time to the front of the measurement while changing nothing at the back. Everyone diagnosed early is guaranteed to clear the five-year mark more often, because they were handed a head start. Two other effects push the same way. A screening programme catches slow-growing disease far more often than fast-growing disease, simply because slow disease sits there longer waiting to be found, and slow disease has a better outlook anyway. And a sensitive enough test finds harmless abnormalities that would never have caused trouble, which are then counted as cured cancers. All three flatter survival without saving anyone. The only honest test is to take a whole population, invite half of it to be screened, and count deaths in everyone from the day of the invitation. Screening programmes that pass that test exist, which is exactly why the test is worth insisting on.":
    "生存统计的计时起点是确诊那一天。这一天说明的不是疾病本身，而是有人在什么时候去看了这一眼。把这一眼提前，你就在测量的前端加上了一段时间，而后端什么也没变。所有被提早确诊的人，跨过五年那道线的比例必然更高，因为他们凭空得到了一段起跑优势。还有另外两种效应把结果推向同一个方向。筛查项目查出生长缓慢的疾病的机会，远高于查出生长迅速的疾病，只因为长得慢的病会在那里停留更久，等着被发现，而长得慢的病本来预后就更好。另外，一项足够灵敏的检测会查出一些永远不会惹麻烦的无害异常，它们随后被算作治愈的癌症。这三者都在美化生存数字，却没有救下任何人。唯一诚实的检验办法是：取整个人群，邀请其中一半去接受筛查，然后从发出邀请那天起统计所有人的死亡。确实存在能通过这项检验的筛查项目，这恰恰说明这项检验值得坚持。",
  "Survival rose for every cancer. Deaths did not follow.":
    "每一种癌症的生存率都上升了。死亡人数却没有跟上。",
  "Between 1950 and 1995, five-year survival improved for all 20 of the most common solid tumours in the United States, by as little as 3 points for pancreatic cancer and as much as 50 for prostate. Over the same years the death rate fell for 12 of those cancers and rose for the other 8. Comparing tumour by tumour, the change in survival was unrelated to the change in mortality, and instead tracked the change in how many cancers were being found.":
    "1950 年至 1995 年间，美国最常见的 20 种实体瘤的五年生存率全部提高，胰腺癌只提高了 3 个百分点，前列腺癌则提高了多达 50 个百分点。在同样这些年里，其中 12 种癌症的死亡率下降，另外 8 种上升。逐个肿瘤对照来看，生存率的变化与死亡率的变化毫无关系，反而与被查出的癌症数量的变化同步。",
  "Screening babies for a childhood tumour": "给婴儿筛查一种儿童肿瘤",
  "Two large programmes tested screening infants for neuroblastoma. Quebec screened 476,654 children born over five years, with 92 percent taking part, and deaths from the tumour before the age of eight came to 4.78 per 100,000, no lower than in the comparison populations. Germany compared 1,475,773 screened children with 2,117,600 unscreened ones and found advanced disease in 3.7 against 3.8 per 100,000, and deaths in 1.3 against 1.2. More tumours were found. The same number of children died.":
    "两个大型项目检验了对婴儿进行神经母细胞瘤筛查的效果。魁北克对五年间出生的 476,654 名儿童做了筛查，参与率为 92%，八岁前死于该肿瘤的人数为每 100,000 人 4.78 例，并不低于对照人群。德国把 1,475,773 名接受筛查的儿童与 2,117,600 名未筛查的儿童作了比较，晚期病例为每 100,000 人 3.7 例对 3.8 例，死亡为 1.3 例对 1.2 例。查出的肿瘤更多了。死去的孩子却一个不少。",
  "What a real benefit looks like": "真正的获益长什么样",
  "Screening is not doomed to be an illusion, it just has to be measured properly. A trial put 46,551 people aged 50 to 80 into three groups: yearly stool testing for hidden blood, testing every two years, or none. Over 13 years, deaths from colorectal cancer came to 5.88 per 1,000 in the yearly group against 8.83 in the unscreened group, a third fewer. That is a count of deaths in everyone invited, not survival from diagnosis, so no head start could have produced it.":
    "筛查并非注定只是一种幻觉，它只是必须被正确地测量。一项试验把 46,551 名 50 至 80 岁的人分成三组：每年做一次粪便隐血检测、每两年做一次，或者不做。13 年间，结直肠癌死亡在每年检测组为每 1,000 人 5.88 例，在未筛查组为 8.83 例，少了三分之一。这统计的是所有受邀者当中的死亡人数，而不是从确诊起算的生存期，所以任何起跑优势都造不出这个结果。",
  "Lead-time bias, a reasoning trap.": "领先时间偏倚，一个推理陷阱。",
  "Survival is counted from the day you are diagnosed. So a test that finds a disease earlier automatically makes survival look longer, even if it changes nothing about when the disease kills you. You simply spend more of your life as a patient. That is why a screening programme can raise five-year survival dramatically while exactly the same number of people die. The number that cannot be gamed is deaths in the whole population, not survival among the diagnosed.":
    "生存期是从你被确诊那天开始算的。所以一项能更早发现疾病的检测，会自动让生存期看上去更长，哪怕它完全没有改变疾病夺走你生命的时间。你只不过是把人生中更长的一段过成了病人。这就是为什么一个筛查项目可以大幅提高五年生存率，而死去的人数却一个不差。唯一无法被操弄的数字是整个人群中的死亡人数，而不是确诊者当中的生存率。",
  "The timeline is a schematic illustration of one life, not measured data. The finding behind it is Welch and colleagues': across the 20 most common solid tumours between 1950 and 1995, five-year survival rose for every one, yet tumour by tumour the change in survival was uncorrelated with the change in mortality (Pearson r = 0.00) and instead tracked the change in incidence (Pearson r = 0.49).":
    "这条时间轴是对一段人生的示意性图解，而不是实测数据。它背后的发现来自 Welch 及其同事：在 1950 年至 1995 年间最常见的 20 种实体瘤中，每一种的五年生存率都上升了，但逐个肿瘤来看，生存率的变化与死亡率的变化并不相关（Pearson r = 0.00），反而与发病率的变化同步（Pearson r = 0.49）。",
  // Trap Hunt items for lead-time bias
  "A hospital introduces a blood test that picks up a cancer about two years before symptoms would have appeared. Among patients diagnosed there, five-year survival rises from 41% to 68%. The hospital announces that the test is saving lives.":
    "一家医院引入了一项血液检测，能在症状出现前大约两年查出某种癌症。在该院确诊的患者中，五年生存率从 41% 升到了 68%。医院宣布这项检测正在挽救生命。",
  "Survival is counted from diagnosis, and the diagnosis now happens two years sooner. Everyone gets a two-year head start towards the five-year mark, whether or not the test changed anyone's outcome.":
    "生存期从确诊起算，而现在确诊提前了两年。每个人在冲向五年那道线时都白得了两年的起跑优势，不论这项检测有没有改变任何人的结局。",
  "A national registry reports that the average time between diagnosis and death for a disease has risen from three years to six since a new scan came into routine use. A minister says patients now live twice as long.":
    "一个全国登记系统报告说，自从一项新的扫描进入常规使用，某种疾病从确诊到死亡的平均时间已经从三年升到六年。一位部长表示，患者现在活得是过去的两倍长。",
  "Time from diagnosis to death can double purely because the diagnosis moved earlier. To claim people live longer you have to show that death is arriving later, not that the label is arriving sooner.":
    "从确诊到死亡的时间，可以仅仅因为确诊提前而翻倍。要说人们活得更久，你必须证明死亡来得更晚，而不是标签贴得更早。",
  "A region invites half its residents, chosen at random, to be screened for a disease and leaves the other half uninvited. Ten years on it counts deaths from that disease among everyone in both halves, screened or not, attended or not. Deaths are 30% lower in the invited half.":
    "一个地区随机抽出一半居民，邀请他们接受某种疾病的筛查，另一半不发邀请。十年后，它统计两半人群中所有人死于该病的人数，无论是否筛查、是否应邀前往。受邀的那一半死亡人数低了 30%。",
  "This is the design an earlier diagnosis cannot fool. The clock starts at the invitation rather than at diagnosis, and the count includes everyone invited, so no head start and no extra diagnoses can manufacture the difference.":
    "这正是提前确诊骗不了的设计。计时从发出邀请开始，而不是从确诊开始，统计也涵盖了所有受邀者，所以无论是起跑优势还是多出来的确诊，都造不出这个差异。",

  // ---- Scope tags for the timeline figure ----
  "From diagnosis": "从确诊起算",
  "The whole life": "整段人生",

  // ---- Tag blurbs (browse screen) ----
  "Anyone can fall for it": "谁都可能中招",
  "Bites at the bedside": "在病床边咬人",
  "Study design & evidence appraisal": "研究设计与证据评价",
  "Reading the numbers": "读懂数字",
  "Tests & diagnostic reasoning": "检测与诊断推理",
  "Screening programmes": "筛查项目",
  "Populations, exposure & risk": "人群、暴露与风险",
  "Drugs & drug safety": "药物与用药安全",
  "Mind & behaviour": "心智与行为",
  "Life & evolution": "生命与演化",
  "Data, computing & AI": "数据、计算与人工智能",
  "Markets & incentives": "市场与激励",
  "Elections & policy": "选举与政策",
  "Teaching & testing": "教学与考试",
  "Investing & returns": "投资与回报",
  "Management & strategy": "管理与战略",
  "Courts & forensics": "法庭与法医鉴定",
  "Performance & records": "表现与纪录",
  "The past & how we read it": "过去，以及我们如何解读它",
  "News & the numbers in it": "新闻，以及其中的数字",

  // ==== Spectrum bias (puzzle #8, urine dipstick) ====
  "This urine test catches 92% of infections. Your patient's symptoms are vague. How good is it now?":
    "这项尿液检测能查出 92% 的感染。你的患者症状含糊不清。现在它还有多准？",
  "A dipstick for urinary infection, checked against urine cultures in an emergency department and a walk-in clinic. Among patients whose doctor already thought an infection was likely, it caught 49 of the 53 who really had one. Sensitivity is normally quoted as a single number, as though it were a fixed property of the test.":
    "一种用于尿路感染的尿试纸，在一家急诊科和一家免预约门诊里与尿培养结果作了对照。在医生本来就认为很可能有感染的患者中，真正有感染的 53 人里它查出了 49 人。敏感度通常被引用为一个单一的数字，仿佛它是这项检测固定不变的属性。",
  "In patients the doctor thinks are unlikely to be infected, how often does it catch a real infection?":
    "在医生认为不太可能有感染的患者中，它查出真正感染的比例是多少？",
  "Times the dipstick was right": "尿试纸判断正确的次数",
  "Doctor thought infection likely": "医生认为很可能有感染",
  Likely: "可能性高",
  "Doctor thought infection unlikely": "医生认为不太可能有感染",
  Unlikely: "可能性低",
  "Patients who really had an infection": "真正有感染的患者",
  "Patients who did not": "没有感染的患者",
  "The quoted figure": "被引用的数字",
  "About the same, 92%": "差不多，还是 92%",
  "the test has not changed": "检测本身没有变",
  "A little lower, around 80%": "略低一些，大约 80%",
  "some drop off": "会掉下来一点",
  "Barely half, 56%": "勉强过半，56%",
  "it misses most of them": "它漏掉了其中大部分",
  "Barely half. And the other column flips the other way.":
    "勉强过半。而另一栏则朝相反的方向翻转。",
  "The patients changed, not the test": "变的是患者，不是检测",
  "Patients their doctor already suspected had florid infections, the kind a dipstick spots easily. Patients thought unlikely to be infected had mild or early ones, and the test missed most of them. Now look at the second panel, the patients who had no infection at all: there the test was right 42% of the time in the first group and 78% in the second. Sensitivity and specificity are not properties of a test. They are properties of a test meeting a particular mix of people:":
    "医生本来就怀疑有感染的患者，得的是症状明显的感染，正是尿试纸容易查出的那一类。被认为不太可能有感染的患者，得的是轻微或早期的感染，检测漏掉了其中大部分。再看第二组图，那些完全没有感染的患者：检测在第一组中判断正确的比例是 42%，在第二组中是 78%。敏感度和特异度并不是检测的属性，而是一项检测遇上某一特定人群构成时才呈现出来的属性：",
  "Both groups": "两组合计",
  "The spectrum": "疾病谱",
  "How many in each group really had an infection": "每组中真正有感染的人数",
  "Spectrum bias": "疾病谱偏倚",
  "A test's accuracy is not fixed. It moves with how advanced, how typical and how obvious the disease is in the patients being tested.":
    "一项检测的准确性并不是固定的。它会随着受检患者病情的进展程度、典型程度和明显程度而变化。",
  "Before trusting a quoted sensitivity, ask who it was measured on. A figure from patients with unmistakable disease will flatter the test in a clinic full of milder cases, and a study that recruits only textbook cases and healthy volunteers will flatter it most of all.":
    "在相信一个被引用的敏感度之前，先问一问它是在谁身上测出来的。来自病情一目了然的患者的数字，放到满是轻症的门诊里就会美化这项检测；而只招募教科书式病例和健康志愿者的研究，美化得最厉害。",
  "Sensitivity is the share of truly ill people a test catches, and specificity is the share of healthy people it correctly clears. Both are quoted as though they belonged to the test, like its price. They do not. A test picks up a signal, and the signal is stronger in advanced disease than in early disease, so the sicker the ill people you test, the more of them it finds. The same logic runs the other way for the people without the disease: the more clearly healthy they are, the more easily the test clears them. That is why a test evaluated on obvious cases against obvious non-cases can look superb and then disappoint in a real clinic, where nearly everyone is somewhere in between. Two practical habits follow. Read the description of who was recruited before you read the accuracy figures. And be most suspicious of a study whose diseased and healthy groups were picked separately rather than being consecutive patients with the same presenting problem.":
    "敏感度是一项检测能查出的真正患病者的比例，特异度是它能正确排除的健康人的比例。两者常常被说得好像属于这项检测本身，就像它的价格一样。其实并非如此。检测捕捉的是一个信号，而晚期病变的信号比早期病变更强，所以你检测的病人病得越重，被查出来的就越多。对于没有病的人，同样的逻辑反过来成立：他们越是明显健康，检测就越容易把他们排除掉。这就是为什么一项在典型病例与典型非病例之间做评价的检测可以看起来出色至极，到了真实门诊里却令人失望，因为那里几乎每个人都处在两者之间。由此可以养成两个实用习惯。在看准确性数字之前，先读一读研究究竟招募了哪些人。以及，对那种把患病组和健康组分别挑选、而不是连续纳入同一主诉患者的研究，要格外警惕。",
  "The same test, sorted a different way": "同一项检测，换一种分组方式",
  "The same study split its patients again, this time by how many white cells were visible in the urine under a microscope. Where none were visible the dipstick caught 5 of the 10 real infections. Where a few were visible it caught 15 of 22. Where there were many it caught all 34 of 34. One test, one afternoon's samples, and a sensitivity anywhere from 50 to 100 percent depending only on which patients you counted.":
    "同一项研究又把患者重新分了一次组，这次按显微镜下尿液中可见的白细胞数量来分。看不到白细胞时，尿试纸在 10 例真实感染中查出 5 例。能看到少量白细胞时，查出 22 例中的 15 例。白细胞很多时，34 例全部查出。同一项检测，同一个下午的样本，敏感度却可以在 50% 到 100% 之间任意游走，差别只在于你统计的是哪些患者。",
  "Why promising tests keep disappointing": "为什么被看好的检测总是让人失望",
  "The problem was named in 1978, after a pattern of new tests arriving with excellent published accuracy and then underwhelming the doctors who used them. Two of the era's examples were the carcinoembryonic antigen test and the nitro-blue tetrazolium test. The authors traced the letdown to two things: accuracy measured on a patient mix far narrower than real practice, and the test result and the true diagnosis not being judged independently of each other.":
    "这个问题在 1978 年被正式命名，起因是当时反复出现这样一种情形：新检测带着漂亮的已发表准确性登场，用起来却让医生大失所望。那个年代的两个例子是癌胚抗原检测和硝基蓝四氮唑检测。作者把这种落差追溯到两件事：准确性是在比真实临床窄得多的患者构成上测出来的，以及检测结果与真实诊断并没有彼此独立地判定。",
  "Spectrum bias, a reasoning trap.": "疾病谱偏倚，一个推理陷阱。",
  "Test accuracy sounds like a fact about the test, the way a car has a top speed. It is not. A test that catches 92% of infections in people who are obviously ill can catch barely half in people who are only slightly ill, because there is less to find. Whenever you are told a test is 95% accurate, the real question is who they measured that on, and whether those people look anything like you.":
    "检测的准确性听上去像是关于这项检测本身的事实，就像一辆车有它的最高时速。其实不是。一项在明显病重的人身上能查出 92% 感染的检测，在只是轻微不适的人身上可能勉强查出一半，因为可供发现的东西更少了。每当有人告诉你某项检测有 95% 的准确率，真正该问的是：这是在谁身上测出来的，那些人和你像不像。",
  "The counts are Table 3, page 137: 49 of 53 and 21 of 50 in the high prior-probability group, 10 of 18 and 188 of 241 in the low one. A positive dipstick meant leukocyte esterase or nitrite or both; a positive culture meant more than 100,000 colonies per millilitre. The correction notes that the high prior-probability group holds 103 patients, not the 107 still printed in the abstract, and that the rates were computed on 103 and stand. The printed abstract also gives the 0.56 confidence interval as 0.03 to 0.79; the paper's own table gives 0.31 to 0.79.":
    "这些数字出自表 3，第 137 页：验前概率高的一组为 53 例中的 49 例和 50 例中的 21 例，验前概率低的一组为 18 例中的 10 例和 241 例中的 188 例。尿试纸阳性指白细胞酯酶或亚硝酸盐阳性，或两者皆阳性；尿培养阳性指每毫升菌落数超过 100,000。更正说明指出，验前概率高的一组共 103 例患者，而不是摘要中至今仍印着的 107 例，并说明这些比率是按 103 例算出的，结论不变。已印出的摘要还把 0.56 的置信区间写成 0.03 至 0.79；论文自己的表格给出的是 0.31 至 0.79。",

  // ==== Berkson's bias (puzzle #9, hospital admission) ====
  "Among hospital patients, lung trouble and joint trouble go together. Are the two diseases linked?":
    "在住院患者中，肺部的毛病和关节的毛病总是结伴出现。这两种病之间有关联吗？",
  "A survey knocked on doors and asked thousands of ordinary people what illnesses they had. Among those who had been in hospital in the previous six months, a quarter of the people with a respiratory disease also had a disease of the bones or joints, against well under a tenth of everyone else.":
    "一项调查挨家挨户敲门，询问了数千名普通人患有哪些疾病。在过去六个月里住过院的人当中，患有呼吸系统疾病的人里有四分之一同时患有骨关节疾病，而其他人中这个比例远不到十分之一。",
  "Are these two diseases actually related?": "这两种疾病之间真的有关系吗？",
  "Also had a bone or joint disease": "同时患有骨关节疾病",
  "Had a respiratory disease": "患有呼吸系统疾病",
  Lungs: "有肺病",
  "No respiratory disease": "没有呼吸系统疾病",
  "No lungs": "无肺病",
  "In hospital in the last 6 months": "过去 6 个月住过院",
  "Everyone the survey asked": "调查问到的所有人",
  "Hospital patients": "住院患者",
  "Yes, one brings on the other": "是的，一个引发了另一个",
  "three times as common": "常见程度是三倍",
  "Yes, but the other way round": "是的，但方向反过来",
  "the joint disease comes first": "先有的是关节病",
  "No, the hospital made the link": "不，是医院造出了这种关联",
  "it is about who gets admitted": "关键在于谁会住院",
  "Ask everyone, and the link disappears.": "问遍所有人，这种关联就消失了。",
  "Two illnesses are two chances to be admitted": "两种病，就是两次住院的机会",
  "Hospital and community": "医院与社区",
  "The filter": "筛选机制",
  "Berkson's bias": "伯克森偏倚",
  "Studying only the people who made it through a filter can invent a relationship that does not exist outside it.":
    "只研究那些通过了某道筛选的人，会凭空造出一种在筛选之外并不存在的关系。",
  "Hospitals are the obvious filter, and the reason case-control studies built on hospital patients are treated warily. But any selected group does it: people who answered the survey, users who stayed subscribed, applicants who got an interview. Ask what it took to get into the sample, and whether both things you are comparing help you get in.":
    "医院是最明显的那道筛选，这也是以住院患者为基础的病例对照研究总被谨慎对待的原因。但任何经过挑选的群体都会这样：应答了调查的人、一直没有退订的用户、拿到了面试机会的申请者。要问一问：进入这个样本需要什么条件，以及你正在比较的两样东西是不是都有助于进入。",
  "Suppose two illnesses are entirely unrelated, and either one on its own gives you some chance of being admitted to hospital. Someone unlucky enough to have both has two shots at admission, so they are much likelier to be in the ward than someone with only one. Now stand inside the ward and count. The people with the first illness are heavily enriched for also having the second, because that is what got many of them in. You have not discovered a link between the diseases. You have rediscovered the admission rule, and dressed it up as biology. The general shape of this is a collider: a thing that two causes both point into. Selecting on it, whether by studying only the admitted, only the tested, or only the successful, links the causes together in your data even when nothing links them in the world. The defence is a sample defined before the filter, which is exactly why population surveys and whole-population registries are worth their cost.":
    "假设有两种疾病完全无关，而其中任何一种单独存在都会让你有一定概率住院。倒霉到两种病都有的人，就有了两次住院的机会，所以他们出现在病房里的可能性远高于只有一种病的人。现在站在病房里数一数。患有第一种病的人当中，同时患有第二种病的比例被大大抬高了，因为正是这一点把他们中的许多人送了进来。你并没有发现两种疾病之间的关联。你只是重新发现了住院的规则，并把它打扮成了生物学。这件事的一般形态叫作对撞因子：两个原因共同指向的那个变量。按它来挑选样本，无论是只研究住院的人、只研究做过检测的人，还是只研究成功的人，都会在你的数据里把这两个原因绑在一起，哪怕在真实世界里它们毫无关系。防身之道是使用在筛选之前就已界定好的样本，而这正是人群调查和全人群登记系统值得付出成本的原因。",
  "The bias that was theory for thirty years": "整整三十年只停留在理论上的偏倚",
  "Joseph Berkson warned in 1946 that hospital-based comparisons could manufacture associations, but his argument was mathematical and his numbers were invented to illustrate it. He noted that the same artefact would appear if you sampled shuffled cards rather than patients. It took until this survey, three decades later, for anyone to demonstrate the effect in real people.":
    "1946 年，Joseph Berkson 就警告说，以医院为基础的比较可能制造出关联，但他的论证是数学式的，用的数字也是为了举例而虚构的。他指出，如果你抽样的是洗过的扑克牌而不是患者，同样的假象照样会出现。直到三十年后这项调查出现，才有人在真实的人群中证实了这一效应。",
  "Why early covid studies disagreed": "为什么 COVID 早期的研究彼此矛盾",
  "In 2020, studies of who caught covid and who fell severely ill could only recruit from people who had been tested or admitted, and early on those were mostly hospital staff, the already unwell and the elderly. Getting into the sample depended on the very things being studied. Analyses showed this alone could produce apparent risk factors, and even reverse the direction of a real one, without any biology behind it.":
    "2020 年，研究谁感染了 COVID、谁发展成重症时，只能从做过检测或住过院的人当中招募，而在早期，这些人大多是医院工作人员、本来就有病的人和老年人。能不能进入样本，恰恰取决于研究正在考察的那些因素。有分析表明，仅凭这一点就能制造出看似成立的危险因素，甚至把一个真实因素的方向反转过来，背后并没有任何生物学机制。",
  "Berkson's bias, a reasoning trap.": "伯克森偏倚，一个推理陷阱。",
  "Look only at hospital patients and two completely unrelated illnesses can appear to travel together. The reason is not biology, it is the door. Either illness can get you admitted, so people who happen to have both are over-represented inside, and from in there the two look linked. Any filtered group does this: the people who got tested, the applicants who got an interview, the customers who stayed. Before believing a pattern, ask what it took to get into the data.":
    "只看住院患者，两种毫不相干的疾病就可能显得形影不离。原因不在生物学，而在那道门。这两种病中的任何一种都可能让你住院，于是两病兼有的人在院内的比例被大大抬高，站在里面看，两者就像有关联。任何经过筛选的群体都会这样：做过检测的人、拿到面试机会的申请者、留下来没走的客户。在相信一个模式之前，先问一问进入这份数据需要什么条件。",
  "The counts are Table 2: household interviews with 2,784 people, of whom 257 had been in hospital in the previous six months. The table's own relative odds are 1.06 in the general population and 4.06 among the hospitalised. The hospital figures rest on only 20 people with a respiratory disease, so this single table demonstrates the mechanism rather than measuring its size precisely.":
    "这些数字出自表 2：入户访谈了 2,784 人，其中 257 人在过去六个月里住过院。表中自己算出的比值比在一般人群中为 1.06，在住院人群中为 4.06。住院那部分数字只建立在 20 名呼吸系统疾病患者之上，所以这张表展示的是这一机制，而不是对其大小的精确测量。",

  // Trap Hunt items for spectrum bias and Berkson's bias
  "A rapid test is validated on patients admitted to hospital with severe disease and on healthy blood donors. It separates the two groups almost perfectly, and the maker reports 98% sensitivity. It is then sold to family doctors for patients with a mild cough.":
    "一项快速检测在因重症住院的患者和健康献血者身上完成了验证。它几乎完美地把这两组人区分开，厂家报告的敏感度为 98%。随后它被卖给全科医生，用于只是轻微咳嗽的患者。",
  "Telling the obviously ill from the obviously well is the easiest task there is. A family doctor's patients are all somewhere in between, and that is precisely where the test has never been measured.":
    "把明显有病的人和明显健康的人区分开，是最容易的任务。全科医生的患者全都处在两者之间，而这项检测恰恰从未在这个区间里测量过。",
  "A textbook lists a scan as 90% sensitive. A clinic that sees mostly early, mild cases adopts it and finds it misses about a third of the cases later confirmed by specialists. The clinic concludes its machine must be faulty.":
    "一本教科书写着某项扫描的敏感度为 90%。一家主要接诊早期轻症的门诊采用了它，却发现它漏掉了后来经专科确诊的病例中的约三分之一。门诊由此断定自己的机器一定有毛病。",
  "A quoted sensitivity comes attached to the patients it was measured on. Earlier and milder disease gives a test less to find, so a lower catch rate is what you should expect, not evidence of a broken machine.":
    "一个被引用的敏感度，总是连着它当初测量所用的那批患者。更早期、更轻的病情留给检测可查的东西更少，所以查出率下降本来就在意料之中，并不能证明机器坏了。",
  "A study of one hospital's inpatients finds that those with a metabolic disease are far more likely to also have a gallbladder disease than the other inpatients. The authors conclude that the first disease brings on the second.":
    "一项针对某家医院住院患者的研究发现，患有代谢性疾病的人同时患有胆囊疾病的可能性远高于其他住院患者。作者由此得出结论：前一种病引发了后一种病。",
  "Either illness on its own can put someone in a hospital bed, so patients with both are over-represented among inpatients. The link may exist only inside the building.":
    "这两种病中的任何一种单独存在都可能把人送上病床，所以两病兼有的患者在住院人群中的比例被抬高了。这种关联可能只存在于这栋楼里。",
  "Someone notices that among the people they have dated, the better looking ones were consistently less pleasant company. They conclude that good looks spoil the character.":
    "有人注意到，在自己约会过的人里，长得越好看的，相处起来越不讨人喜欢。他由此断定，好看会毁掉一个人的性情。",
  "People generally agree to a date because someone is good looking or because they are pleasant company. Selecting on that forces a trade-off between the two inside the sample, whatever the relationship is outside it.":
    "人们答应约会，通常是因为对方好看，或者因为对方相处起来舒服。按这一点来挑选，就会在样本内部强行造出两者之间的此消彼长，而不论在样本之外二者究竟是什么关系。",
  "A diagnostic test is evaluated on every consecutive patient arriving at a clinic with the same presenting complaint, whatever their eventual diagnosis, and the paper reports its accuracy separately for mild and for advanced disease. Another clinic with a similar caseload adopts the figures.":
    "一项诊断检测在某家门诊以同一主诉就诊的每一位连续患者身上接受评价，无论他们最终诊断如何；论文还分别报告了轻症和晚期病情下的准确性。另一家病例构成相似的门诊采用了这些数字。",
  "This is how a diagnostic study should be built. Consecutive patients with one presenting problem, and accuracy broken down by severity, so a reader can find the subgroup that actually resembles their own patients.":
    "诊断研究本来就该这样设计。以同一主诉连续纳入患者，并按严重程度拆分准确性，读者就能找到真正与自己患者相像的那个亚组。",
  "A company asks whether two things about its users go together. It samples at random from everyone who ever opened an account, including those who never came back and those who cancelled, and finds no relationship between them.":
    "一家公司想知道用户身上的两个特征是不是相伴出现。它从所有开过账户的人中随机抽样，包括那些再也没回来的人和已经注销的人，结果发现两者之间没有关系。",
  "The sample was drawn before any filter that either of the two things could have influenced. Nothing about staying, succeeding or being admitted decided who got counted, so a selection artefact cannot be hiding in it.":
    "样本是在任何可能受这两个特征影响的筛选之前抽取的。是否留下、是否成功、是否被收治，都没有决定谁会被统计进来，所以里面藏不住选择偏倚造成的假象。",

  // ==== Relative versus absolute risk (puzzle #10, statin trial) ====
  "A drug cuts your risk of a heart attack by about a third. How many people does that help?":
    "一种药物把你心脏病发作的风险降低了约三分之一。这到底帮到了多少人？",
  "A trial gave 6,595 middle-aged men with high cholesterol and no history of heart trouble either a statin or a dummy pill, and followed them for about five years. The drug cut heart attacks and coronary deaths by roughly a third. That is a real result, and it is how the finding was reported.":
    "一项试验让 6,595 名胆固醇偏高、且没有心脏病史的中年男性分别服用他汀或安慰剂，随访了大约五年。药物把心脏病发作和冠心病死亡减少了大约三分之一。这是一个真实的结果，当初的报道也正是这么说的。",
  "Out of 1,000 men who took it for five years, how many were spared a heart attack or a coronary death?":
    "在服用了五年的 1,000 名男性中，有多少人因此免于心脏病发作或冠心病死亡？",
  "A five-year statin trial in 6,595 men": "6,595 名男性参加的五年他汀试验",
  "Heart attack or death from heart disease": "心脏病发作或死于心脏病",
  "Dummy pill": "安慰剂",
  Statin: "他汀",
  "of the risk removed": "的风险被消除",
  "spared, in every 1,000 men treated for five years":
    "人免于这一结局（每 1,000 名接受五年治疗的男性中）",
  "men treated for five years to spare one":
    "名男性接受五年治疗，才能让其中 1 人免于这一结局",
  "About 300": "大约 300 人",
  "roughly a third of them": "大约是其中的三分之一",
  "About 100": "大约 100 人",
  "one in ten": "十分之一",
  "About 23": "大约 23 人",
  "roughly 1 in 44": "大约每 44 人中 1 人",
  "Twenty three men in a thousand.": "一千人中，二十三人。",
  "A third of a risk that was small to begin with":
    "本来就很小的风险，去掉了三分之一",
  "Both numbers come from the same trial. Without the drug, about 75 men in 1,000 had a heart attack or died of heart disease over the five years. With it, about 53 did. That is a third of the risk gone, and it is also 23 men in 1,000. The first number is divided by the risk, the second by the people, which is the whole reason they feel so different. Put the other way round, 44 men had to take the drug for five years for one of them to be spared:":
    "这两个数字来自同一项试验。不吃药的话，五年里每 1,000 名男性中约有 75 人心脏病发作或死于心脏病。吃了药，这个数字约为 53 人。这既是风险少了三分之一，也是每 1,000 人中少了 23 人。第一个数字是拿来除以风险的，第二个是拿来除以人数的，这正是两者感觉如此不同的全部原因。反过来说，要让 1 个人幸免，就得有 44 名男性连吃五年药：",
  "A third of what?": "是什么的三分之一？",
  "Relative versus absolute risk": "相对风险与绝对风险",
  "A percentage reduction tells you what share of a risk went away. It cannot tell you how big that risk was, and that is the part that decides whether it matters to you.":
    "百分比的下降只告诉你风险中有多大一部分消失了。它无法告诉你这个风险原本有多大，而后者才决定这件事对你是否重要。",
  "Whenever you meet a percentage change, ask what it is a percentage of. Halving a one-in-a-million risk and halving a one-in-two risk make the same headline and mean completely different things. The two figures worth asking for are the difference in plain numbers of people, and how many have to be treated for one of them to benefit.":
    "每当你遇到一个百分比变化，都要问一问它是谁的百分比。把百万分之一的风险减半，和把二分之一的风险减半，标题一模一样，含义却天差地别。值得追问的两个数字是：用具体人数表示的差值，以及要治疗多少人才能让其中 1 人获益。",
  "Take a risk of 8 in 100 and drop it to 5 in 100. Divide the drop by the risk and you get a third, which sounds like a lot. Divide the same drop by the people and you get 3 in 100, which sounds like very little. Neither is wrong. They answer different questions: what fraction of the danger was removed, and what are the odds this helps me. Only the second one is about you. The gap between them grows as the risk shrinks, which is why the most impressive relative figures usually come from the rarest outcomes. This is not only a media problem. Relative figures make treatments look better to doctors too, and the same trial result draws more enthusiasm when it is described relatively than when it is described in whole people. It also cuts the other way with harms: a scare expressed as a doubling of risk sounds alarming whether the risk went from 1 in 10 to 2 in 10 or from 1 in 100,000 to 2 in 100,000. The habit that protects you in both directions is to insist on the numbers out of a fixed group of people, and on how many have to be treated, or exposed, for one to be affected.":
    "把每 100 人中 8 人的风险降到每 100 人中 5 人。用下降的幅度去除以风险，你得到三分之一，听起来很多。用同样的下降幅度去除以人数，你得到每 100 人中 3 人，听起来微不足道。两者都没有错。它们回答的是不同的问题：危险中有多大一部分被消除了，以及这件事帮到我的概率有多大。只有第二个问题是关于你的。风险越小，两者的差距就越大，这也是为什么最惊人的相对数字往往出自最罕见的结局。这不只是媒体的问题。相对数字也会让治疗在医生眼里显得更好，同一项试验结果，用相对方式描述时引来的热情，比用具体人数描述时更高。在危害那一侧，它同样起作用：一则说风险翻倍的警告听起来都很吓人，不论风险是从每 10 人中 1 人升到 2 人，还是从每 100,000 人中 1 人升到 2 人。在两个方向上都能保护你的习惯是：坚持要一个固定人群里的具体人数，以及要治疗多少人、或者暴露多少人，才会有 1 个人受到影响。",
  "The same kind of drug, in people at real risk":
    "同一类药物，用在真正有风险的人身上",
  "A second trial gave a statin to patients who had already had a heart attack or had angina. Major coronary events fell from 28 percent to 19 percent. As a relative figure that is about a third, almost the same headline as in the healthy men. But because the risk it was cutting into was nearly four times larger, the gain was about 9 patients in every 100 instead of 2. The identical headline, several times the benefit. This is why a percentage on its own cannot tell you whether a drug is worth taking, and why the answer differs from patient to patient.":
    "第二项试验把他汀用在已经发生过心脏病发作或患有心绞痛的患者身上。主要冠心病事件从 28% 降到 19%。换成相对数字，这大约是三分之一，和那些健康男性中的标题几乎一样。但因为它所削减的那个风险大了将近四倍，获益是每 100 名患者中约 9 人，而不是 2 人。标题完全相同，获益却是好几倍。这就是为什么单凭一个百分比无法告诉你一种药值不值得吃，也是为什么答案因人而异。",
  "When a relative figure did real damage": "一个相对数字造成的真实伤害",
  "In October 1995 a British safety committee warned that some contraceptive pills carried about twice the risk of a blood clot. The warning travelled as a doubling, with no sense of how small the risk was either way, and women stopped taking the pill. Among girls under 16, use fell from 40 percent to 27 percent within a year. The health service met roughly 21 million pounds in extra maternity costs and 46 million pounds in abortion provision. A relative figure with no absolute figure beside it is not a neutral way to describe a risk.":
    "1995 年 10 月，英国一个安全委员会警告说，某些口服避孕药的血栓风险约为原来的两倍。这条警告以“翻倍”的形式传开，完全没有交代无论哪一边风险其实都很小，于是女性纷纷停药。在 16 岁以下的女孩中，使用率一年之内从 40% 降到 27%。医疗服务体系为此承担了大约两千一百万英镑的额外产科费用，以及四千六百万英镑的人工流产费用。一个旁边没有绝对数字的相对数字，并不是一种中立的风险表述方式。",
  "The fix is in the wording": "解决办法在于表述",
  "Describe the same result in whole people, so many out of 1,000 against so many out of 1,000, and both patients and doctors judge it far more accurately than when it arrives as a percentage reduction. Relative risks belong to a small family of formats that reliably confuse, alongside single-event probabilities and conditional ones like a test's sensitivity. None of them is wrong. They are just easy to misread, and there is a clearer way to say the same thing.":
    "把同一个结果用具体人数说出来，每 1,000 人中多少人对每 1,000 人中多少人，患者和医生对它的判断都会比听到一个百分比下降时准确得多。相对风险属于一小类总能把人绕晕的表述方式，同类的还有单次事件概率，以及像检测敏感度这样的条件概率。它们都没有错。只是容易被误读，而同样的意思有更清楚的说法。",
  "Relative versus absolute risk, a reasoning trap.":
    "相对风险与绝对风险，一个推理陷阱。",
  "\"Cuts your risk by a third\" sounds enormous. But a third of what? If the risk was 75 in 1,000, a third of it is 23 people. If the risk was 3 in 1,000, a third of it is one. The percentage tells you how much of the risk went away and says nothing at all about how much risk there was, which is the part that decides whether it matters to you. Ask for the plain numbers: how many out of 1,000, and how many people have to take it for one of them to benefit.":
    "“把你的风险降低三分之一”听上去大得惊人。但是什么的三分之一？如果风险是每 1,000 人中 75 人，它的三分之一就是 23 个人。如果风险是每 1,000 人中 3 人，它的三分之一就是 1 个人。百分比告诉你风险消失了多少，却完全没有说原本有多少风险，而后者才决定这件事对你是否重要。去要那些朴素的数字：每 1,000 人中有多少，以及要多少人服药才能让其中 1 人获益。",
  "The counts are the trial's primary endpoint, a definite nonfatal heart attack or death from coronary heart disease: 248 events among the men on placebo and 174 among those on pravastatin, over an average of 4.9 years. The paper reports a 31 percent relative risk reduction, estimated from a proportional-hazards model; the crude counts give 30 percent. Every figure this puzzle shows is derived from the counts, so it quotes about a third rather than a number the chart would contradict.":
    "这些数字是该试验的主要终点，即确定的非致死性心脏病发作或冠心病死亡：安慰剂组的男性中有 248 例事件，普伐他汀组中有 174 例，平均随访 4.9 年。论文报告的相对风险降低为 31%，是用比例风险模型估计出来的；按粗计数计算则为 30%。这道谜题展示的每一个数字都由这些计数推导而来，所以它引用的是“大约三分之一”，而不是一个会与图表相矛盾的数字。",

  // ---- Scope tags for the risk figure ----
  "Compared to the risk": "相对于风险",
  "Compared to the people": "相对于人数",

  // Trap Hunt items for relative versus absolute risk
  "A press release says a new drug halves the risk of a rare complication. It does not say how common the complication is. A newspaper runs the story under the headline that the drug halves the danger.":
    "一份新闻稿说，一种新药把某种罕见并发症的风险减半。它没有说这种并发症有多常见。一家报纸以“该药把危险减半”为标题报道了这件事。",
  "Halving a risk means nothing until you know the risk. If the complication strikes 2 people in 10,000, halving it spares one of them.":
    "在你知道风险有多大之前，风险减半什么也说明不了。如果这种并发症每 10,000 人中发生 2 例，减半就是让其中 1 人幸免。",
  "A supplement is advertised as cutting the chance of a particular cancer by 40%. The trial it rests on found 7 cases among about 1,000 people taking the supplement and 12 among about 1,000 taking a dummy.":
    "一种膳食补充剂的广告说，它能把某种癌症的发生概率降低 40%。它所依据的试验，在约 1,000 名服用补充剂的人中发现 7 例，在约 1,000 名服用安慰剂的人中发现 12 例。",
  "The 40% is arithmetically right and it amounts to 5 people in 1,000. Around 200 people would have to take the supplement for years for one of them to avoid a cancer.":
    "40% 在算术上是对的，而它相当于每 1,000 人中 5 人。大约需要 200 个人连年服用这种补充剂，才能让其中 1 人免于一次癌症。",
  "A trial reports that the treatment reduced strokes from 12 in every 100 patients to 8 in every 100, calls that a reduction of a third, and adds that about 25 patients need to be treated for five years to prevent one stroke.":
    "一项试验报告说，治疗把卒中从每 100 名患者中 12 例减少到每 100 名中 8 例，称之为减少了三分之一，并补充说大约需要治疗 25 名患者五年，才能预防 1 次卒中。",
  "The relative figure, the plain numbers of people and the number needed to treat are all on the table, so nothing is hidden behind the percentage. This is how a result should be reported.":
    "相对数字、具体人数和需治疗人数都摆在桌面上，所以百分比背后没有藏着任何东西。结果本来就该这样报告。",

  // ---- Berkson's bias, corrected community wording ----
  "The same survey, the same people, the same two diseases. Across everyone it asked, people with a respiratory disease were barely any likelier to have a bone or joint disease than people without one, and the odds come out at 1.06 against 1, which is nothing. The hospital panel is not a finding about disease, it is a finding about admission. Either illness can put you in a hospital bed, so people with both turn up there far more often than people with one, and inside those walls the two look inseparable:":
    "同一项调查，同一批人，同样这两种疾病。在它问到的所有人当中，患有呼吸系统疾病的人，患骨关节疾病的可能性只比没有呼吸系统疾病的人高出一点点，比值比算出来是 1.06 比 1，等于什么也没有。住院那一组图讲的不是疾病，而是住院。这两种病中的任何一种都可能让你躺上病床，所以两病兼有的人出现在那里的机会远高于只有一种病的人，而在医院的墙内，这两者看上去密不可分：",

  // ==== Confounding by indication (puzzle #11, DIG trial) ====
  "Patients taking this heart drug died more often than patients not taking it. Is the drug killing them?":
    "服用这种心脏药的患者，比不服用的患者死得更多。是这种药在害死他们吗？",
  "6,800 people with heart failure. When they joined the trial, some were already on digoxin because a doctor had decided to prescribe it, and some were not. Over the following years, 40 percent of those already on it died, against 31 percent of the others.":
    "6,800 名心力衰竭患者。入组这项试验时，有些人已经在服用地高辛，因为此前有医生决定给他们开这种药；另一些人没有。在随后的几年里，本来就在服药的人有 40% 死亡，其他人是 31%。",
  "Is digoxin causing those extra deaths?":
    "这些多出来的死亡是地高辛造成的吗？",
  "Died during the trial": "试验期间死亡",
  "On digoxin": "在服地高辛",
  Digoxin: "地高辛",
  "Not on digoxin": "未服地高辛",
  "Not on it": "未服药",
  "Sorted by what doctors prescribed": "按医生开出的处方分组",
  "Sorted by the trial's coin flip": "按试验的抛硬币分组",
  "As prescribed in practice": "按临床实际的处方",
  "Yes, the drug is harming them": "是的，这种药在伤害他们",
  "nine points worse": "高出 9 个百分点",
  "No, and adjusting for severity will show that":
    "不，按病情严重程度校正就能说明这一点",
  "the statistics can correct it": "统计方法可以纠正它",
  "No, and adjusting will not fix it either": "不，而且校正也解决不了",
  "the prescription marks the patient": "处方本身就标记了患者",
  "The same 6,800 patients, sorted by a coin flip. No difference.":
    "同样这 6,800 名患者，按抛硬币分组。没有差别。",
  "The prescription marked how ill they already were":
    "处方标记出他们本来病得有多重",
  "These are the same people in both panels, grouped two different ways. Sorted by what their doctors had decided, digoxin looks lethal. Sorted by the trial's random assignment, which no clinical judgement touched, the two groups die at the same rate. Doctors were reaching for digoxin in the patients who were already worse off, so the prescription carried information about the patient that nothing in the dataset had recorded:":
    "两组图里是同一批人，只是分组方式不同。按医生此前的决定来分，地高辛看上去是致命的。按试验的随机分配来分，而随机分配不受任何临床判断影响，两组的死亡率完全一样。医生正是在那些本来就更糟的患者身上伸手去用地高辛，所以处方携带了关于患者的信息，而数据集里没有任何东西记录下这些信息：",
  "Both ways of sorting": "两种分组方式",
  "Adjusting for 27 recorded baseline characteristics barely moved it, from a 36 percent excess to 22 percent. And the same excess turned up among the patients the trial had randomised to placebo, people who took no digoxin at all during it. A drug cannot harm those who never received it, so the excess was never the drug.":
    "对 27 项记录在案的基线特征做校正，几乎没有撼动它：多出来的死亡风险只从 36% 降到 22%。而且同样多出来的死亡也出现在被试验随机分到安慰剂的患者身上，这些人在试验期间根本没有服用过地高辛。一种药不可能伤害从未用过它的人，所以这份多出来的死亡从来都不是药造成的。",
  "The reason for the prescription": "开出处方的理由",
  "Confounding by indication": "适应证混杂",
  "When a doctor decides who gets a treatment, the treated differ from the untreated in ways the data never recorded, and the treatment takes the blame, or the credit, for the reason it was given.":
    "当由医生来决定谁接受治疗时，接受治疗的人与没接受的人，在数据从未记录下来的方面本来就已经不同，于是治疗替它被开出的理由背了黑锅，或者领了功劳。",
  "This is why observational comparisons between treated and untreated patients are read so warily, and why \"we adjusted for that\" does not end the argument. Adjustment can only remove what was written down. The judgement that led to the prescription usually was not.":
    "这就是为什么在观察性研究里，治疗组与未治疗组之间的比较总被谨慎对待，也是为什么“我们已经对此做了校正”并不能终结争论。校正只能去掉写下来的东西。而促成那张处方的判断，通常没有被写下来。",
  "Treatments are not handed out at random. A doctor prescribes because of something about the patient: they are sicker, or frailer, or their symptoms are worse. That something also affects how they were going to do anyway. So the treated group starts out different, and any comparison with the untreated measures both the drug and the reason it was chosen, tangled together. It runs both ways. A drug given to the sickest looks harmful; a drug given to the fittest, or one that only patients well enough to attend a clinic can receive, looks miraculous. The standard defence is to adjust for the differences, and it helps, but only for the differences someone thought to record. The clinician's impression that this particular patient was going downhill is real information, it is why the prescription happened, and it is almost never in the dataset. That is the whole reason randomised trials are worth their expense: a coin flip cannot know anything about the patient, so it cannot smuggle the reason into the comparison. When a trial and an observational study disagree about the same drug, this is usually why.":
    "治疗不是随机发放的。医生开药，是因为患者身上的某些情况：病得更重，或者更虚弱，或者症状更糟。而这些情况本来也会影响他们的结局。于是接受治疗的那一组从一开始就与众不同，任何与未治疗组的比较，测到的都是药物和选择用药的理由，两者纠缠在一起。它朝两个方向都会起作用。给病得最重的人用的药看上去有害；给身体最好的人用的药，或者只有健康到能来门诊的患者才拿得到的药，看上去神效非凡。标准的应对办法是对这些差异做校正，这确实有帮助，但只对那些有人想到要记录下来的差异有效。临床医生觉得这个患者正在走下坡路，这是真实的信息，正是它促成了那张处方，而它几乎从不出现在数据集里。这就是随机对照试验值得花那么多钱的全部理由：抛硬币不可能知道患者的任何情况，所以它无法把用药的理由偷偷带进比较之中。当一项试验和一项观察性研究对同一种药得出相反的结论时，原因通常就在这里。",
  "Taking your pills predicts survival, even when they are dummies":
    "按时吃药能预示活得更久，哪怕吃的只是安慰剂",
  "An earlier trial split its patients by how faithfully they had taken their tablets. Those who took at least 80 percent of them had 15.0 percent five-year mortality against 24.6 percent for the rest, which looks like proof that the drug works if you actually take it. Then the researchers ran the same split inside the placebo group, where the tablets contained nothing: 15.1 percent against 28.2 percent. Adjusting for 40 recorded characteristics narrowed that gap to 16.4 against 25.8 and left it overwhelming. Whatever adherence marks about a person, it was not the medicine.":
    "一项更早的试验按服药依从性把患者分成两组。至少服下了 80% 药片的人，五年死亡率为 15.0%，其余的人为 24.6%，这看起来正好证明只要你真的按时吃，药就有效。随后研究者在安慰剂组里做了同样的划分，而那里的药片什么成分都没有：15.1% 对 28.2%。对 40 项记录在案的特征做校正，只把这个差距缩小到 16.4% 对 25.8%，差距依然悬殊。服药依从性标记出的无论是这个人身上的什么，都不是药。",
  "The same argument, about a procedure": "同样的道理，换成一项操作",
  "In a study of 5,735 critically ill patients, those who had a catheter threaded into the right side of the heart died more often within 30 days than those who did not, 38.0 percent against 30.6 percent. The procedure was reserved for the patients in most trouble. When it was later tested by randomising who got one, mortality came out at 62 percent with the catheter and 60 percent without, in a trial whose patients were sicker still. The gap that had looked like harm was mostly a gap in who was chosen.":
    "在一项纳入 5,735 名危重患者的研究中，把导管置入心脏右侧的患者，30 天内死亡的比例高于没有置管的患者，38.0% 对 30.6%。这项操作只留给病情最棘手的患者。后来有人改用随机分配谁来置管的方式检验它，置管组的死亡率是 62%，未置管组是 60%，而那项试验的患者病得还要更重。原本看上去像是危害的那道差距，大部分只是谁被挑中的差距。",
  "Confounding by indication, a reasoning trap.": "适应证混杂，一个推理陷阱。",
  "Nobody hands out medicines at random. Doctors prescribe because of something about the patient, and that something usually affects how the patient was going to do anyway. So people on a drug can die more often than people not on it while the drug does nothing at all: it was given to those who were already worse off. Adjusting for the differences helps, but only the differences somebody wrote down, and the reason for the prescription rarely is one. It is why a coin flip is worth so much.":
    "没有人会随机地把药发出去。医生开药，是因为患者身上的某些情况，而这些情况通常本来就会影响患者的结局。于是，服药的人可以比不服药的人死得更多，而药其实什么也没做：它被给了那些本来就更糟的人。对差异做校正是有帮助的，但只限于有人写下来的差异，而开处方的理由很少是其中之一。这正是抛一次硬币如此值钱的原因。",
  "The four death counts are printed in the 2019 paper, and the randomised arm sizes in the 1997 trial report. The two prescribed-in-practice denominators are not printed anywhere: 3,017 is the sum of the supplement's two counts of prior digoxin use (1,498 and 1,519) and 3,783 is the rest of the 6,800. That is addition over published whole numbers rather than a figure worked backwards from a percentage, and it closes both ways: 1,207 plus 1,168 and 1,181 plus 1,194 both give 2,375 deaths, and both pairs of denominators give 6,800 patients.":
    "四个死亡人数印在 2019 年那篇论文里，随机分组各组的人数印在 1997 年的试验报告里。实际处方那两组的分母哪里都没有印出来：3,017 是补充材料中两项既往地高辛使用人数之和（1,498 和 1,519），3,783 是 6,800 中剩下的部分。这是对已发表的整数做加法，而不是从百分比倒推出来的数字，而且两个方向都对得上：1,207 加 1,168、1,181 加 1,194 都得到 2,375 例死亡，两对分母也都得到 6,800 名患者。",

  // Trap Hunt items for confounding by indication
  "A hospital reviews its records and finds that patients who were given a particular breathing support died far more often than patients who were not. A committee recommends using it less.":
    "一家医院查阅自己的病历记录，发现用过某种呼吸支持的患者，死亡比没有用过的患者多得多。一个委员会建议少用这种支持。",
  "The support was given to the patients who were struggling to breathe. It is standing in for how ill they already were, and the records cannot separate the treatment from the reason it was reached for.":
    "这种支持是给那些呼吸困难的患者用的。它代表的其实是这些人本来病得有多重，而病历记录无法把治疗和动用治疗的理由分开。",
  "An observational study finds higher mortality among patients on a drug. The authors adjust for age, sex, blood pressure and twelve laboratory values, the excess shrinks a little but remains, and they conclude the drug is harmful.":
    "一项观察性研究发现，服用某种药的患者死亡率更高。作者对年龄、性别、血压和 12 项实验室指标做了校正，多出来的部分缩小了一点，但依然存在，他们由此得出结论：这种药有害。",
  "Adjustment can only remove what was recorded. The clinician's sense that this patient was deteriorating is exactly why the drug was prescribed, and it is not among the twelve laboratory values.":
    "校正只能去掉被记录下来的东西。临床医生觉得这个患者正在恶化，这恰恰是当初开出这种药的理由，而它不在那 12 项实验室指标之中。",

  // Trap Hunt items, a clinical pass over the earlier skills
  "A national audit finds that patients operated on at small local hospitals survive more often than those at large teaching hospitals. Broken down by how severe the case was, the teaching hospitals come out ahead in every category.":
    "一项全国审计发现，在小型地方医院接受手术的患者，存活的比例高于在大型教学医院接受手术的患者。但按病例的严重程度拆分后，教学医院在每一个类别里都领先。",
  "Teaching hospitals take the difficult cases, so their pooled figure is dragged down by a case mix nobody chose at random. Better in every severity band and worse overall is the signature of that.":
    "教学医院接的是疑难病例，所以它们合并后的数字被一份并非随机形成的病例构成拖了下来。每一个严重程度分层都更好、总体却更差，正是这件事的标志。",
  "A genetic test for a condition affecting about 1 in 5,000 people is 99.9% accurate. A clinic tells everyone who screens positive that the diagnosis is essentially confirmed.":
    "某种疾病大约每 5,000 人中有 1 人患上，针对它的基因检测准确率为 99.9%。一家诊所告诉所有筛查呈阳性的人，诊断基本可以确定。",
  "Even at 99.9%, errors outnumber real cases when the condition is this rare. Among 100,000 people about 20 have it, and about 100 healthy people also test positive, so a positive is right roughly one time in six.":
    "疾病罕见到这个程度时，即便准确率有 99.9%，出错的次数也多于真实病例。在 100,000 人中大约有 20 人患病，同时还有大约 100 名健康人也会检测呈阳性，所以一个阳性结果大约每 6 次才对 1 次。",
  "A surgeon reports excellent long-term results in the patients seen at the five-year follow-up clinic. Patients who moved away, stopped attending, or died before five years are not in the series.":
    "一位外科医生报告说，在五年随访门诊见到的患者中，长期结果非常好。搬走的、不再来复诊的，以及五年内已经去世的患者，都不在这组病例里。",
  "The series was defined by who was still turning up. The patients who did worst are precisely the ones most likely to be missing from it, so the outcomes describe the survivors rather than the operation.":
    "这组病例是由谁还会来复诊决定的。结局最差的患者，恰恰最可能不在其中，所以这些结果描述的是幸存者，而不是这台手术。",
  "Hospitals that use more of a particular monitoring device have lower death rates. The manufacturer's brochure concludes that buying the device saves lives.":
    "某种监护设备用得更多的医院，死亡率更低。厂家的宣传册由此得出结论：买下这台设备就能挽救生命。",
  "Hospitals that can afford more monitors can usually afford more of everything else too, including staff. The device may be a marker of a well resourced hospital rather than the cause of its results.":
    "买得起更多监护仪的医院，通常别的东西也买得起更多，包括人手。这台设备可能只是一家资源充裕的医院的标志，而不是它成绩的原因。",
  "A rare reaction occurs in about 1 in 50,000 people taking a drug. A patient develops it, and a report concludes there is only a 1 in 50,000 chance the drug was not responsible.":
    "服用某种药的人当中，大约每 50,000 人有 1 人出现一种罕见反应。一名患者出现了这种反应，一份报告由此得出结论：这种药不是元凶的概率只有 50,000 分之一。",
  "That flips the question round. The 1 in 50,000 is how often the reaction appears among people taking the drug, not the chance the drug caused this case. Answering that needs to know how often the same thing happens in people who never took it.":
    "这是把问题倒了过来。50,000 分之一说的是这种反应在服药人群中出现的频率，而不是这种药导致了这一例的概率。要回答后者，还得知道同样的情况在从未服过药的人当中有多常发生。",

  // Trap Hunt items where the reasoning is sound
  "A trial reports the outcome it registered in advance as its main one, states that it also measured eleven others, and says plainly that success was judged on the registered outcome alone.":
    "一项试验报告了它事先登记为主要结局的那个指标，说明自己另外还测量了 11 个指标，并明确表示成败只按已登记的那个结局来判断。",
  "Naming the outcome before seeing the data, and then reporting all of them, is what stops a study quietly promoting whichever measure happened to come out well.":
    "在看到数据之前就定下结局指标，事后又把所有指标都报出来，正是这样才能阻止一项研究悄悄把碰巧好看的那个指标扶上主位。",
  "A cohort study links an exposure to a disease. It reports that the association survived adjustment for the confounders named in advance, that more exposure went with more disease, and that two independent cohorts elsewhere found the same pattern.":
    "一项队列研究发现某种暴露与某种疾病相关联。研究报告说，对事先指明的混杂因素做校正后关联依然存在，暴露越多疾病越多，而且其他地方的两个独立队列也发现了同样的模式。",
  "No single one of these settles causation, but together they are the things that make an observational finding worth taking seriously: a prior plan, a dose-response pattern, and replication in populations that do not share the same quirks.":
    "这几点中的任何一点单独拿出来都不足以确立因果，但合在一起，它们正是让一项观察性发现值得认真对待的东西：事先定好的计划、剂量反应关系，以及在没有同样怪癖的人群中得到重复。",
  "Patients are assigned by a computer to a drug or a dummy tablet, with neither they nor their doctor knowing which. Deaths are counted in everyone assigned, whatever they went on to take. The drug group does slightly better.":
    "患者由计算机分配到药物或安慰剂，他们本人和医生都不知道分到的是哪一种。死亡的统计涵盖所有被分配的人，不论他们后来实际服用了什么。药物组的结局略好一些。",
  "A coin flip knows nothing about the patient, so it cannot smuggle the reason for treatment into the comparison. Counting everyone as assigned keeps that protection even when people stop taking their tablets.":
    "抛硬币对患者一无所知，所以它无法把用药的理由偷偷带进比较之中。按分配情况统计所有人，能在有人中途停药时仍然保住这层保护。",
  "A clinic compares its results with a national benchmark, adjusts for how severe its patients' illness was, and publishes the crude and the adjusted figures side by side along with the case mix it adjusted for.":
    "一家诊所把自己的结果与全国基准作比较，按患者病情的严重程度做了校正，并把粗数字和校正后的数字并排公布，同时公布了它据以校正的病例构成。",
  "Showing both figures and the mix behind them is the honest move. A reader can see how much of the difference was case mix and how much survived accounting for it, instead of being handed only the flattering one.":
    "把两个数字以及它们背后的病例构成都摆出来，才是诚实的做法。读者能看出差异中有多少来自病例构成，又有多少在把病例构成考虑进去之后依然存在，而不是只拿到那个好看的数字。",

  // ==== Length-time bias (puzzle #12, Mayo Lung Project) ====
  "Screened men whose lung cancer was found died of it less often. Did the screening save them?":
    "接受筛查的男性中，被查出肺癌的人死于肺癌的比例更低。是筛查救了他们吗？",
  "9,211 male smokers were randomly assigned either to chest x-rays and sputum tests every four months for six years, or to usual care, and followed for two decades. Among the men who were diagnosed with lung cancer, 65 percent of the intensively screened died of it, against 74 percent of the others.":
    "9,211 名男性吸烟者被随机分配到两组：一组在六年里每四个月做一次胸部 X 光和痰液检查，另一组接受常规照护，两组都随访了二十年。在被诊断出肺癌的男性中，接受高强度筛查的人有 65% 死于肺癌，另一组是 74%。",
  "Did the extra screening save lives?": "这些额外的筛查挽救了生命吗？",
  "Died of lung cancer": "死于肺癌",
  "Screened every four months": "每四个月筛查一次",
  Screened: "筛查组",
  "Usual care": "常规照护",
  "Among the men diagnosed with lung cancer": "在被诊断出肺癌的男性中",
  "Among everyone in the trial": "在试验中的所有人当中",
  "Among the diagnosed": "确诊者当中",
  "Yes, fewer of them died of it": "是的，他们当中死于肺癌的人更少",
  "65% against 74%": "65% 对 74%",
  "Too early to say": "现在下结论还太早",
  "the follow-up is too short": "随访时间太短",
  "No, count everyone and it vanishes": "不，把所有人都算进来，它就消失了",
  "the cases changed, not the deaths": "变的是病例，不是死亡",
  "Count everyone, and the screened arm did no better.":
    "把所有人都算进来，筛查组并没有更好。",
  "Screening changed who counted as having cancer": "筛查改变了谁被算作癌症患者",
  "The screened men were diagnosed far more often, 206 against 160, in a trial that split them evenly. The extra cancers were not a random sample of the disease. A test applied every few months catches the slow-growing tumours, because slow ones sit in the detectable stage for years waiting to be found, while fast ones surface between visits. Slow tumours also do better whatever you do, and some would never have surfaced at all. Those cases join the pool of people with lung cancer and survive it, so the share dying falls. Nobody was saved:":
    "接受筛查的男性被诊断出肺癌的人数多得多，206 例对 160 例，而这项试验把人数平均分成了两组。多出来的那些癌症并不是这种疾病的随机样本。每隔几个月做一次的检查，查出的是生长缓慢的肿瘤，因为长得慢的病灶会在可被查出的阶段停留数年，等着被发现，而长得快的则在两次检查之间冒出来。生长缓慢的肿瘤无论你做什么，预后本来就更好，其中有些甚至永远不会显露出来。这些病例加入了肺癌患者的行列，并且活了下来，于是死亡的比例下降了。没有任何人因此获救：",
  "Both ways of counting": "两种统计方式",
  "Three effects travel together here and this trial cannot separate them: the slow cases are caught preferentially (length-time), the clock starts earlier for those caught (lead-time), and some tumours found would never have caused harm (overdiagnosis). All three flatter the diagnosed group and none of them postpones a death. The number that stayed honest is deaths among everyone randomised, and it did not fall.":
    "这里有三种效应同时起作用，而这项试验无法把它们分开：生长缓慢的病例被优先查出（病程长短），被查出的人计时起点提前（领先时间），还有一些查出的肿瘤本来永远不会造成危害（过度诊断）。这三者都美化了确诊人群，却没有一个能把死亡推迟。始终诚实的那个数字，是所有随机分组者当中的死亡人数，而它并没有下降。",
  "Who became a case": "谁成了病例",
  "Length-time bias": "病程长短偏倚",
  "Screening does not sample disease fairly. It catches the slow-growing kind preferentially, and the slow kind was always going to do better, so screen-detected cases flatter the test.":
    "筛查并不是对疾病的公平抽样。它优先查出生长缓慢的那一类，而长得慢的那一类本来预后就更好，于是经筛查发现的病例美化了这项检查。",
  "Whenever a screening programme is defended with how well its detected cases do, ask what kind of disease a periodic test can catch. A tumour that takes years to declare itself is available to be found on many visits; one that goes from nothing to symptoms in three months is available on almost none. The only fair question is whether deaths fall in everyone offered screening.":
    "每当有人用被查出的病例结局有多好来为一个筛查项目辩护时，都要问一问：定期做的检查究竟能查到什么样的疾病。一个要花好几年才显露出来的肿瘤，在很多次检查中都有被发现的机会；而一个三个月内就从无到有、直接出现症状的肿瘤，几乎在任何一次检查中都碰不上。唯一公平的问题是：在所有被提供筛查的人当中，死亡人数有没有下降。",
  "Picture the same disease arriving in two speeds. Slow tumours spend years in the window where a test could find them but the patient feels nothing. Fast ones cross that window in weeks. Now sample the population every six months. You will find nearly all the slow ones and almost none of the fast ones, because the fast ones announce themselves between your visits. So the pile of screen-detected cases is loaded with indolent disease, and the pile of symptom-detected cases is loaded with aggressive disease, before treatment enters the story at all. Compare their outcomes and screening looks wonderful. At the extreme edge of this sits overdiagnosis: disease so slow it would never have troubled the person in their lifetime, which counts as a cancer found and cured while doing nothing but harm through the treatment. The defence is the same one that beats lead-time bias, and it is the reason screening programmes are judged the way they are: randomise who is invited, then count deaths in everyone invited, attended or not, diagnosed or not.":
    "想象同一种疾病以两种速度到来。生长缓慢的肿瘤会有好几年停留在这样一个窗口里：检查已经能查出它，患者却毫无感觉。生长迅速的肿瘤几周之内就穿过了这个窗口。现在每六个月对人群抽查一次。你几乎会查出所有长得慢的，却几乎一个长得快的都查不到，因为长得快的会在两次检查之间自己冒出来。于是，经筛查发现的那一堆病例装满了惰性疾病，因症状发现的那一堆装满了侵袭性疾病，而这一切发生在治疗登场之前。比较两者的结局，筛查看上去妙极了。这条路的极端一端坐着过度诊断：疾病慢到在这个人有生之年从不会给他添麻烦，却被算作一例查出并治愈的癌症，而治疗除了带来伤害什么也没做。防身之道与击败领先时间偏倚的那一条相同，这也是筛查项目为什么要按现在这种方式来评判：随机决定邀请谁，然后统计所有受邀者当中的死亡，无论他们有没有应邀前往，有没有被确诊。",
  "The trial's own explanation": "试验自己的解释",
  "The authors did not attribute the gap to better treatment. They noted that similar mortality alongside better survival points to lesions of limited clinical relevance being found in the screened arm. Twenty years of follow-up did not rescue the result: deaths from lung cancer were 337 among 4,607 screened men and 303 among 4,585 others, a difference in the wrong direction and not statistically significant.":
    "作者并没有把这道差距归功于更好的治疗。他们指出，死亡率相近而生存率更好，说明筛查组查出了一些临床意义有限的病灶。二十年的随访也没能挽救这个结果：肺癌死亡在 4,607 名接受筛查的男性中为 337 例，在另外 4,585 人中为 303 例，差异的方向是反的，而且没有统计学意义。",
  "Why screening is judged on deaths, not survival": "为什么筛查要看死亡，而不是生存",
  "This is not a historical curiosity. National screening programmes are assessed on whether they lower deaths from the disease in the whole invited population, precisely because survival among detected cases can be lifted by three separate artefacts without a single life being extended. A programme that raises five-year survival and leaves mortality untouched has, on the evidence, done nothing except give more people the label.":
    "这不是一桩历史趣闻。全国性的筛查项目要看的是它能否降低整个受邀人群中死于该病的人数，原因恰恰在于：被查出的病例的生存率可以被三种各自独立的假象抬高，而没有一条生命因此延长。一个提高了五年生存率、却让死亡率纹丝不动的项目，从证据上看，除了给更多人贴上标签之外什么也没做。",
  "Length-time bias, a reasoning trap.": "病程长短偏倚，一个推理陷阱。",
  "A test you run every few months finds slow-growing disease far more easily than fast-growing disease, because slow disease sits there for years waiting to be found while fast disease erupts between visits. Slow disease also has a better outlook whatever anyone does. So the cases a screening programme catches are the gentle ones, and they do well, and the programme takes the credit. The only number that cannot be gamed this way is deaths in everyone offered screening, whether or not they attended.":
    "每隔几个月做一次的检查，查出生长缓慢的疾病要比查出生长迅速的疾病容易得多，因为长得慢的病会在那里停留数年等着被发现，而长得快的病在两次检查之间就爆发了。长得慢的病无论谁做什么，预后本来也更好。所以筛查项目抓到的都是温和的那一类病例，它们结局良好，功劳却记在了项目头上。唯一无法被这样操弄的数字，是所有被提供筛查的人当中的死亡人数，不论他们有没有真的去做。",
  "Table 3 prints the usual-care case count as 106, which is a typographic error; the correct figure is 160, and this puzzle uses 160. The paper says so itself six times over: the body text on page 1310, the Figure 2 curve label, Table 3's own percentages (119 of 160 printed as 74 percent, 156 of 160 as 98 percent), and the totals of Tables 4 and 5. With 106 the lung-cancer deaths alone would outnumber the cohort. Note also that this trial compared two screening intensities rather than screening against none, and that it cannot separate length-time bias from lead-time bias and overdiagnosis, which is why the lesson names all three.":
    "表 3 把常规照护组的病例数印成了 106，这是一处排印错误；正确的数字是 160，本谜题采用 160。论文自己就有六处佐证：第 1310 页的正文、图 2 的曲线标签、表 3 自己算出的百分比（160 例中的 119 例印为 74%，160 例中的 156 例印为 98%），以及表 4 和表 5 的合计。若按 106 计算，仅肺癌死亡人数就会超过整个队列。另外要注意，这项试验比较的是两种筛查强度，而不是筛查与完全不筛查；而且它无法把病程长短偏倚与领先时间偏倚和过度诊断分开，这正是这一课把三者一并点名的原因。",

  // ==== Publication bias (puzzle #13, antidepressant trials) ====
  "Read the journals and almost every trial of these drugs worked. How many actually did?":
    "翻看期刊，这些药几乎每一项试验都成功了。真正成功的到底有多少项？",
  "Twelve antidepressants, and every trial run to get them approved had to be registered with the American regulator before it began. That registry is the rare thing in medicine: a complete list, including the trials nobody ever wrote up. Go to the medical journals instead and you find 51 published trials, of which 48 read as positive.":
    "十二种抗抑郁药，为让它们获批而做的每一项试验，都必须在开始之前向美国的监管机构注册。那个注册库是医学中难得一见的东西：一份完整的清单，连没有任何人写成论文的试验也在其中。改去翻医学期刊，你会看到 51 项已发表的试验，其中 48 项读起来是阳性结果。",
  "Out of all 74 trials that were actually run, how many did the regulator judge positive?":
    "在实际做过的全部 74 项试验中，监管机构判定为阳性的有多少项？",
  "Trials that read as positive": "读起来是阳性的试验",
  "As the journals tell it": "按期刊的说法",
  Journals: "期刊",
  "As the full registry tells it": "按完整注册库的说法",
  Registry: "注册库",
  "Trials of twelve antidepressants": "十二种抗抑郁药的试验",
  "The published literature": "已发表的文献",
  "Nearly all of them": "几乎全部",
  "the journals are the evidence": "期刊就是证据",
  "About two thirds": "大约三分之二",
  "some trials always fail": "总有一些试验会失败",
  "38 of the 74": "74 项中的 38 项",
  "Half. A coin flip, printed as a near-certainty.":
    "一半。一次抛硬币，却被印成了几乎板上钉钉。",
  "The failures were filtered out on the way to the journals":
    "失败的试验在通往期刊的路上被筛掉了",
  "The regulator judged 38 of the 74 trials positive and 36 not. Of those 36, twenty two were never published at all. Eleven more did reach print, but reading as a positive result. So a doctor searching the literature finds 48 positive trials out of 51 and concludes the case is overwhelming, when the complete record says it was close to even:":
    "监管机构判定 74 项试验中有 38 项为阳性，36 项不是。那 36 项里，有 22 项根本没有发表。另有 11 项确实印了出来，但读起来是阳性结果。于是，一位检索文献的医生看到的是 51 项试验里有 48 项阳性，从而断定证据压倒性地充分，而完整的记录说的却是双方几乎势均力敌：",
  "Journals against the registry": "期刊对注册库",
  "Two of those judgements belong to different people, and it matters. Positive or negative was the regulator's own decision on the outcome each trial had promised to measure in advance. The reading that eleven publications conveyed a positive result was the study authors' assessment, not the regulator's, and they said so. What is not a matter of opinion is the twenty two that never appeared.":
    "这里有两处判断出自不同的人，而这一点很重要。阳性还是阴性，是监管机构自己就每项试验事先承诺要测量的那个结局作出的裁定。而 11 篇发表的论文读起来传达了阳性结果，这是研究作者的评估，不是监管机构的，他们自己也这样说明了。不属于见仁见智的，是那 22 项从未出现过的试验。",
  "What never reached print": "从未印出来的那些",
  "Publication bias": "发表偏倚",
  "The published literature is not a sample of the research done. It is the research that someone chose to submit and someone chose to print, and success survives that filter far better than failure.":
    "已发表的文献并不是已完成研究的一份样本。它是有人选择投出、又有人选择刊印的那部分研究，而在这道筛选面前，成功活下来的机会远大于失败。",
  "This is why a registry matters more than it sounds. Requiring every trial to be declared before it starts creates the denominator, so the missing ones become countable instead of invisible. When you read a review, the question is not only what the studies found but whether you are looking at all of them.":
    "这就是为什么注册库的分量比听上去更重。要求每一项试验在开始之前都申报，等于造出了分母，于是缺失的那些从隐形变成了可数。当你读一篇综述时，要问的不只是这些研究发现了什么，还有你看到的是不是它们的全部。",
  "Nothing here requires anyone to lie. A trial that finds nothing is duller to write up, harder to place, and commercially unwelcome, so it drifts to the bottom of the pile and quietly never gets finished. Repeat that across a field and the surviving literature is systematically sunnier than the research was. The effect compounds, because reviews and guidelines are built on what was published, so the gap is inherited by everything downstream and looks like accumulating evidence rather than a filter. Two things push back. The first is registration: declare the trial and its primary outcome before you start, and an unpublished result leaves a visible hole rather than no trace. The second is the funnel plot, which exploits the fact that small studies scatter widely and large ones cluster; if the small studies that should have landed on the disappointing side are missing, the scatter comes out lopsided. Neither fix works retrospectively on a literature that predates them, which is why the regulator's archive was the only way to answer this question at all.":
    "这里没有哪一步需要谁去撒谎。一项什么也没发现的试验，写起来更乏味，更难找到地方发表，商业上也不受欢迎，于是它慢慢沉到那摞纸的最底下，悄无声息地永远没有写完。把这件事在一个领域里重复许多遍，存活下来的文献就系统性地比真实的研究更明亮。这种效应还会叠加，因为综述和指南都建立在已发表的东西之上，于是这道缺口被下游的一切继承下来，看上去像是不断积累的证据，而不是一道筛选。有两样东西可以对抗它。第一样是注册：在开始之前就申报试验及其主要结局，未发表的结果就会留下一个看得见的窟窿，而不是不留痕迹。第二样是漏斗图，它利用了这样一个事实：小型研究散得很开，大型研究则聚在一起；如果本该落在令人失望那一侧的小型研究不见了，散点就会偏向一边。这两种办法对早于它们出现的文献都无法追溯生效，这正是为什么监管机构的档案是回答这个问题的唯一途径。",
  "The drugs also looked stronger than they were": "这些药看上去也比实际更有效",
  "The same trials were pooled twice, once as the regulator held them and once as the journals reported them. Measured across the complete set the average benefit was 0.31 on a standardised scale; measured from the published literature alone it was 0.41, about a third larger. That is a standardised mean difference, not a share of patients helped, and the effect was not confined to one drug: every one of the twelve looked better in the journals, by between 11 and 69 percent.":
    "同样这些试验被做了两次荟萃分析，一次用监管机构掌握的数据，一次用期刊报道的数据。按完整的一整套试验来算，平均获益在标准化量尺上是 0.31；只按已发表的文献来算则是 0.41，大了约三分之一。这是一个标准化均数差，而不是获益患者所占的比例；而且这种效应不限于某一种药：十二种药在期刊里全都显得更好，幅度在 11% 到 69% 之间。",
  "It got better, which is the point": "情况后来变好了，而这正是重点",
  "The same team repeated the audit on four antidepressants approved between 2008 and 2013, after trial registration had become the norm. This time all 15 positive trials were reported transparently, and of the 15 negative ones 6 went unpublished and 2 were reported as positive. Still imperfect, and still worth knowing about, but the inflation in apparent effect had roughly halved. Publication bias is not a law of nature; it responds to rules about declaring trials in advance.":
    "同一个团队又对 2008 年至 2013 年间获批的四种抗抑郁药做了同样的核查，那时试验注册已经成为惯例。这一次，15 项阳性试验全部得到了透明的报告；15 项阴性试验中，有 6 项未发表，2 项被报告为阳性。仍不完美，也仍然值得留意，但表观效应量的膨胀大约减半了。发表偏倚不是一条自然法则，它会随着事先申报试验的规则而改变。",
  "Publication bias, a reasoning trap.": "发表偏倚，一个推理陷阱。",
  "Search the medical literature on a drug and you are not seeing the research that was done. You are seeing the research that got written up and accepted, and studies that found something clear survive that filter much better than studies that found nothing. For one class of drugs the regulator's complete archive showed about half the trials were positive, while the journals showed nearly all of them. Nobody had to lie for that to happen. The disappointing ones simply never got finished.":
    "检索一种药的医学文献，你看到的并不是已经做过的研究。你看到的是被写成论文并被接收的那部分研究，而发现了明确结果的研究，比什么也没发现的研究更容易通过这道筛选。对某一类药来说，监管机构完整的档案显示大约一半的试验是阳性的，期刊里却几乎全是阳性。这一切发生并不需要任何人撒谎。那些令人失望的试验，只是从来没有被写完。",
  "Three points of care. The positive or negative verdict on each trial is the regulator's own, on the outcome the trial specified in advance; the label questionable, and the reading that eleven publications conveyed a positive result, are the study authors' judgements and the paper says so. The published-trial figure of 48 of 51 is the sum of two printed counts, 37 and 11, rather than a single printed number. And the authors note that they excluded articles covering several studies at once, so they probably counted a few trials as unpublished that were technically published, which makes 22 and 23 upper bounds.":
    "有三点需要留意。每项试验阳性还是阴性的裁定，是监管机构自己就该试验事先指定的结局作出的；而“存疑”这个标签，以及 11 篇发表的论文读起来传达了阳性结果这一判读，都是研究作者的判断，论文自己也这样说明了。已发表试验 51 项中 48 项这个数字，是两个印出来的计数 37 和 11 相加得到的，而不是某个单独印出来的数字。另外，作者说明他们排除了一次涵盖多项研究的文章，所以他们大概把少数几项技术上已经发表的试验算成了未发表，这使得 22 和 23 都是上限。",

  // Trap Hunt items for publication bias
  "A review gathers every published trial of a treatment it can find. Eleven of the thirteen are positive, and it concludes the treatment works. The review does not say how many trials of the treatment were ever started.":
    "一篇综述收集了它能找到的、关于某种治疗的全部已发表试验。13 项中有 11 项是阳性的，综述据此得出结论：这种治疗有效。综述没有说这种治疗一共启动过多少项试验。",
  "Searching the literature finds the studies that reached print, not the studies that were run. Without knowing how many were started, there is no way to tell whether two disappointing trials is the whole story or the visible corner of it.":
    "检索文献找到的是印出来的研究，而不是做过的研究。不知道一共启动了多少项，就没法判断两项令人失望的试验是故事的全部，还是它露出来的一角。",
  "A researcher runs a study that finds nothing, decides it is not interesting enough to write up, and moves on to the next project. Several colleagues in the same field do the same thing that year.":
    "一位研究者做了一项研究，什么也没发现，觉得不够有意思，不值得写成论文，就转去做下一个课题。同一年里，这个领域的好几位同行也做了同样的事。",
  "Nobody here has done anything dishonest, and that is exactly the point. The filter is made of ordinary decisions about what is worth the effort, and it still leaves the published record systematically sunnier than the research was.":
    "这里没有任何人做了不诚实的事，而这恰恰是重点。这道筛选是由一个个关于什么值得花力气的普通决定构成的，它却仍然让已发表的记录系统性地比真实的研究更明亮。",

  // Trap Hunt items for length-time bias and overdiagnosis
  "A clinic reports that men whose cancer was picked up by its regular screening programme are far more likely to still be alive ten years on than men who came in with symptoms. It concludes that screening works.":
    "一家诊所报告说，癌症是通过它的定期筛查项目查出来的男性，十年后仍然在世的比例远高于因症状前来就诊的男性。诊所据此得出结论：筛查是有效的。",
  "A test run at intervals catches slow tumours easily and fast ones hardly at all, because fast ones surface between visits. So the screen-detected group is loaded with the gentle kind of disease before treatment is even considered.":
    "定期做的检查很容易查出生长缓慢的肿瘤，却几乎查不到生长迅速的，因为长得快的会在两次检查之间冒出来。所以在还没考虑治疗之前，经筛查发现的那一组就已经装满了温和的那一类疾病。",
  "A new scan finds three times as many cases of a cancer as were previously diagnosed in the same population, and the people it finds do very well. Deaths from that cancer in the population are unchanged.":
    "一项新的扫描在同一人群中查出的某种癌症病例数，是过去确诊数的三倍，而被它查出的人结局非常好。该人群中死于这种癌症的人数没有变化。",
  "More cases found, the same number of deaths, and excellent outcomes among the extra cases is the signature of finding disease that was never going to cause harm. The survival figures improve because the denominator filled up with people who were never in danger.":
    "查出的病例更多、死亡人数不变、多出来的那些病例结局又极好，这正是查出了本来就不会造成危害的疾病的标志。生存数字之所以变好，是因为分母里填满了从来就没有危险的人。",

  // ---- intention to treat, recall bias, immortal time ----
  "Among the patients who actually got the treatment they were assigned, surgery saved lives. Is that the trial's answer?":
    "在真正接受了所分配治疗的患者中，手术挽救了生命。这就是这项试验的答案吗？",
  "1,212 people with heart failure, randomly assigned to medicine alone or to medicine plus bypass surgery. Analysing the ones who received what they were assigned, 43 percent of the medicine group died against 34 percent of the surgery group. The difference is statistically significant.":
    "1,212 名心力衰竭患者，随机分配到单纯药物治疗组或药物加搭桥手术组。只分析那些实际接受了所分配治疗的人，药物组 43% 死亡，手术组 34% 死亡。差异有统计学意义。",
  "Does this trial show that surgery cuts deaths?":
    "这项试验能说明手术降低了死亡吗？",
  "Died during follow-up":
    "随访期间死亡",
  "Medicine alone":
    "单纯药物",
  "Medicine":
    "药物",
  "Surgery added":
    "加做手术",
  "Surgery":
    "手术",
  "Only those who got what they were assigned":
    "仅限实际接受所分配治疗者",
  "Everyone, as the coin assigned them":
    "全部，按随机分配归组",
  "The patients left out of the first panel":
    "第一张图中被排除的患者",
  "Those who followed the protocol":
    "遵守方案的人",
  "Yes, that is what surgery does":
    "是，手术就是有这个效果",
  "nine points fewer deaths":
    "死亡少九个百分点",
  "No, and it understates the benefit":
    "不，而且它低估了获益",
  "crossovers dilute a real effect":
    "交叉治疗稀释了真实效应",
  "No, that comparison is no longer randomised":
    "不，这个比较已不再是随机的",
  "dying is why some were left out":
    "有些人被排除正是因为死亡",
  "Counting everyone the coin assigned, the difference is not significant.":
    "把随机分配的所有人都计入，差异没有统计学意义。",
  "The surgical patients who were dropped had mostly died first":
    "被剔除的手术组患者多数是先死亡了",
  "The 120 patients missing from the first panel are not a random sample. Of the 55 dropped from the surgery group, 30 died, and most of them died before they ever reached an operating table. Of the 65 dropped from the medicine group, only 15 died, because crossing over to surgery required living long enough to have it. So the surgical arm shed its worst outcomes and the medical arm lost its best, and the gap nearly doubled without one patient's fate changing:":
    "第一张图中缺失的 120 名患者不是随机样本。手术组被剔除的 55 人中有 30 人死亡，其中多数在上手术台之前就已死亡。药物组被剔除的 65 人中只有 15 人死亡，因为交叉去做手术的前提是活得足够久。于是手术组甩掉了它最差的结局，药物组失去了它最好的结局，差距几乎翻倍，而没有任何一名患者的命运发生改变：",
  "All three views of one trial":
    "同一项试验的三种看法",
  "A randomised comparison is only worth something while it is still random. The coin flip made the two groups alike; deciding afterwards who counts, on the basis of something that happened after the flip, undoes that. Here the deciding factor was survival itself, which is the outcome being measured. Counting everyone in the group they were assigned to, whatever happened next, is the analysis that keeps the coin flip intact.":
    "随机比较只有在仍然随机的时候才有价值。随机分配让两组变得相似；事后再根据分配之后发生的事情来决定谁算数，就把这一点抹掉了。这里的决定因素正是生存本身，而生存就是被测量的结局。无论之后发生什么，都把每个人计入他被分配到的组，这样的分析才能保住随机分配。",
  "Who the analysis dropped":
    "分析剔除了谁",
  "Intention to treat":
    "意向性治疗分析",
  "Once you exclude people for what happened after they were randomised, you are no longer comparing the groups the coin made, and the exclusions usually favour one side.":
    "一旦你因为随机化之后发生的事情而排除某些人，你比较的就不再是随机分出来的两组，而且这些排除通常偏向其中一方。",
  "This is not a rule that per-protocol analysis is dishonest. It answers a different question, and there are trials where it is the right one to ask. The rule is narrower and harder: any analysis that drops people for something that happened after randomisation has to explain why those people were not different, and when the reason for dropping is entangled with the outcome, no explanation will do.":
    "这并不是说符合方案分析不诚实。它回答的是另一个问题，有些试验里那正是该问的问题。规则更窄也更难：任何因随机化之后发生的事情而剔除人群的分析，都必须解释为什么被剔除的这些人没有不同；而当剔除的理由与结局纠缠在一起时，任何解释都无济于事。",
  "Randomisation buys one thing: two groups that differ only by chance, including in all the ways nobody measured. Everything a trial claims rests on that. The trouble is that trials are run on people, who cross over, refuse the operation, stop the tablets or die before treatment starts, and it is tempting to set those people aside and look at the clean comparison underneath. But whether someone stayed on protocol is itself an outcome. Patients who cross from medicine to surgery must survive to be operated on. Patients assigned to surgery who never get it are often the ones too ill to be operated on, or already dead. Removing them is removing patients selected by prognosis, and prognosis is what the trial is measuring. Intention to treat keeps everyone in the arm the coin put them in, which sounds absurd when a patient never received the treatment, and is exactly the point: it measures the effect of the decision to treat, under real conditions, which is also the decision a doctor actually faces. It has a known cost. Crossovers pull the arms together, so intention to treat tends to shrink a real effect towards nothing. That is a conservative failure when you are trying to prove a drug works, and a dangerous one when you are trying to prove a drug is no worse than another, which is why non-inferiority trials report both analyses and are believed only when the two agree.":
    "随机化只买到一样东西：两组之间只因偶然而不同，包括在所有没人测量过的方面。试验的一切主张都建立在这一点上。麻烦在于试验做在人身上，人会交叉换组、拒绝手术、停药，或在治疗开始前死亡，于是人们很容易把这些人搁在一边，去看底下那个干净的比较。但一个人是否留在方案内本身就是一种结局。从药物交叉到手术的患者，必须活到能被开刀。被分配到手术却始终没做的患者，往往是病重到无法手术，或者已经死亡。把他们移走，就是按预后来挑选患者，而预后正是试验要测量的东西。意向性治疗分析把每个人留在随机分配给他的组里，当患者根本没接受过该治疗时这听起来很荒谬，而这恰恰是重点：它测量的是决定去治疗这一决策在真实条件下的效应，而这也正是医生实际面对的决定。它有已知的代价。交叉会把两组拉近，所以意向性治疗分析倾向于把真实效应缩小、趋向于零。当你想证明一种药有效时，这是一种保守的失败；当你想证明一种药不劣于另一种时，这就是危险的失败，这也是为什么非劣效性试验会同时报告两种分析，并且只有在两者一致时才被采信。",
  "The same trap, without the verdict flipping":
    "同样的陷阱，只是结论没有反转",
  "A tuberculosis trial compared shorter regimens with the standard six-month one. In the group treated per protocol, the standard regimen appeared to fail in about 8 percent of patients. Counting everyone who was randomised and had an assessable outcome, it failed in about 16 percent. Almost everyone the per-protocol analysis removed had had an unfavourable outcome, because an unfavourable outcome was frequently the reason they left the protocol. Nothing about the trial's conclusion changed, and every failure rate in it halved.":
    "一项结核病试验把更短的方案与标准的六个月方案作比较。在符合方案分析的人群中，标准方案约有 8% 的患者治疗失败。把所有随机化且结局可评估的人都计入，失败率约为 16%。符合方案分析剔除的人几乎都出现了不良结局，因为不良结局常常正是他们脱离方案的原因。试验的结论没有任何改变，而其中每一个失败率都减半了。",
  "Intention to treat, a reasoning trap.":
    "意向性治疗分析，一个推理陷阱。",
  "A trial flips a coin so its two groups start out alike. Then real life happens: people switch treatments, refuse the operation, or die before it. It seems only fair to compare the ones who actually got what they were assigned. It is not, because whether someone stuck to the plan depends on how they were doing, and often on whether they survived. Dropping them quietly sorts the groups by prognosis, which is the very thing the trial is trying to measure. Count everyone where the coin put them, and the flattering result can vanish.":
    "试验靠随机分配让两组一开始就相似。然后现实发生了：有人换治疗，有人拒绝手术，有人在手术前死亡。只比较那些真正接受了所分配治疗的人，看起来才公平。其实不然，因为一个人是否坚持了计划，取决于他当时的状况，往往还取决于他是否活了下来。把这些人剔除，等于悄悄按预后给两组分了类，而预后正是试验要测量的东西。把每个人都计入随机分配给他的组，那个漂亮的结果就可能消失。",
  "The four counts in the first two panels are printed. The third panel is subtraction over those printed integers rather than figures of its own: 65 and 55 are 602 minus 537 and 610 minus 555, and 15 and 30 are 244 minus 229 and 218 minus 188. It closes three ways. The excluded patients reassemble the as-treated arms, 537 plus 55 and 555 plus 65 giving 592 and 620, which sum to the 1,212 randomised; and total deaths are conserved in every split, 244 plus 218 and 259 plus 203 both giving 462. Note also that the trial's P values, 0.12 as randomised and 0.005 per protocol, come from Cox proportional-hazards models over the whole follow-up, not from these four-cell tables, so they are quoted as the trial's own results and not recomputed here.":
    "前两张图中的四个计数是原文印出的。第三张图是对这些印出的整数做减法，而不是另有一套数字：65 和 55 分别是 602 减 537 和 610 减 555，15 和 30 分别是 244 减 229 和 218 减 188。它在三个方向上都能对上。被排除的患者可以把实际接受治疗的两组重新拼回去，537 加 55 和 555 加 65 得到 592 和 620，两者相加正是随机化的 1,212 人；而在每一种拆分方式下死亡总数都守恒，244 加 218 与 259 加 203 都等于 462。另外要注意，试验的 P 值，按随机分组为 0.12、按符合方案为 0.005，来自覆盖整个随访期的 Cox 比例风险模型，而不是来自这些四格表，所以它们是作为试验自身的结果引用的，本文并未重新计算。",
  "Women with melanoma report burning easily far more often than women without it. How much of that gap is their skin?":
    "患黑色素瘤的女性报告皮肤容易晒伤的比例，远高于未患病的女性。这个差距有多少是来自她们的皮肤？",
  "141 women who had been diagnosed with melanoma and 1,094 who had not, asked how their skin responds to the sun. 45 percent of the women with melanoma said they tan little or not at all, against 25 percent of the others. Pale, easily burned skin is a known risk factor, so the finding looks exactly as expected.":
    "141 名已确诊黑色素瘤的女性和 1,094 名未确诊的女性，被问及皮肤对日晒的反应。患黑色素瘤的女性中 45% 说自己几乎不晒黑或完全不晒黑，其他人中这一比例为 25%。皮肤白皙、容易晒伤是已知的危险因素，所以这个结果看起来完全符合预期。",
  "Is that twenty point gap what their skin was really like?":
    "这二十个百分点的差距，真是她们皮肤本来的样子吗？",
  "Said their skin tans little or not at all":
    "自述皮肤几乎不晒黑或完全不晒黑",
  "Women who developed melanoma":
    "后来患黑色素瘤的女性",
  "Melanoma":
    "黑色素瘤",
  "Women who did not":
    "未患病的女性",
  "No melanoma":
    "无黑色素瘤",
  "Asked after the diagnosis":
    "确诊之后询问",
  "Asked years before anyone knew":
    "无人知情前数年询问",
  "Yes, pale skin is a real risk factor":
    "是，白皙皮肤确是危险因素",
  "the gap is their skin":
    "差距就是她们的皮肤",
  "No, the whole association is an artefact":
    "不，整个关联都是假象",
  "they are reinterpreting their past":
    "她们在重新解读自己的过去",
  "Partly, and part of it appeared afterwards":
    "部分是，另一部分是事后才出现的",
  "real, but not this large":
    "真实，但没有这么大",
  "These same women had already answered, years earlier.":
    "这些女性在数年前就已经回答过同一个问题。",
  "The question was answered by a different person, in a sense":
    "从某种意义上说，回答问题的已是另一个人",
  "Every one of these women filled in the same question before anyone knew who would get melanoma. Back then the gap was thirteen points, not twenty. The women who went on to be diagnosed shifted seven points towards saying they burn; the women who were not diagnosed, answering over the same years, shifted a point the other way. Nobody's skin changed in between. What changed was that some of them had since been asked to explain a cancer:":
    "在还没有人知道谁会患黑色素瘤之前，这些女性每一位都填过同样的问题。那时差距是十三个百分点，而不是二十。后来被确诊的女性向容易晒伤那一侧移动了七个百分点；同一段年份里作答、未被确诊的女性则向相反方向移动了一个百分点。这期间没有人的皮肤发生变化。变化的是，其中一些人此后被要求解释一场癌症：",
  "The same women, asked twice":
    "同一批女性，被问了两次",
  "So the risk factor is real and the study still overstates it: the crude odds ratio these counts give is about 1.8 before the diagnosis and about 2.5 after it, so roughly a third of what the later study measured was not there beforehand. That is the awkward shape of recall bias. It rarely conjures an association out of nothing. It takes a true one and inflates it, which is far harder to spot, because the result still agrees with everything you already believed.":
    "所以这个危险因素是真实的，而研究仍然高估了它：这些计数给出的粗比值比，确诊前约为 1.8，确诊后约为 2.5，因此后一次研究测到的东西里，大约三分之一在此之前并不存在。这就是回忆偏倚令人为难的形态。它很少凭空造出一个关联。它是把一个真实的关联放大，而这要难察觉得多，因为结果仍然与你原本相信的一切相符。",
  "What the diagnosis changed":
    "确诊改变了什么",
  "Recall bias":
    "回忆偏倚",
  "People who know how their story ended remember the beginning differently, so asking about the past after the outcome is known measures the outcome as well as the past.":
    "知道自己故事结局的人，会以不同的方式回忆开头，所以在结局已知之后询问过去，测到的既是过去，也是结局。",
  "Nobody here is lying. Searching your memory harder because you have been given a reason to search it is an ordinary human thing to do, and the answers that come back are honestly meant. That is what makes it so hard to correct for: there is no dishonest group to exclude and no question you can ask that fixes it, because the more carefully someone thinks about it, the worse it gets.":
    "这里没有人在说谎。因为有了搜寻的理由而更用力地搜寻记忆，是再普通不过的人之常情，回想出来的答案也是诚实的。这正是它难以校正的原因：没有一个不诚实的群体可以排除，也没有哪个问题问出来就能解决，因为一个人想得越仔细，情况反而越糟。",
  "A case-control study starts from the outcome and works backwards, asking people who have a disease and people who do not what they were exposed to. It is fast, it is cheap, and for a rare disease it is often the only design that will ever be affordable. Its weakness is that one group has been given a reason to search their memory. A diagnosis prompts the question \"why me\", and the mind answers it, reaching for the sunburn, the chemical, the medicine, the difficult pregnancy. The other group has no such prompt and remembers no harder than anyone remembers anything. So the two groups are not just being compared on exposure, they are being compared on how hard they looked. The direction is usually predictable: it inflates whatever the person already suspects is to blame, which means it tends to confirm the hypothesis under test. The defences are all about not relying on memory. Take the exposure from a record written before the outcome, from a prescription database, a workplace log, a stored blood sample, a questionnaire filled in years earlier. Or build in a comparison the mechanism cannot touch, such as a second exposure question that nobody associates with the disease: if the groups drift equally on that one, the drift is not about the disease. What does not work is asking the question more carefully, and what does not work is telling people to be objective.":
    "病例对照研究从结局出发向前回溯，询问患病的人和未患病的人各自暴露于什么。它快，它便宜，对罕见病来说往往是唯一负担得起的设计。它的弱点在于其中一组被给了搜寻记忆的理由。一次确诊会引出“为什么是我”这个问题，而大脑会去回答它，抓住那次晒伤、那种化学品、那种药、那次艰难的妊娠。另一组没有这样的提示，回忆得并不比人们平时回忆任何事情更用力。所以这两组被比较的不只是暴露，还有他们各自找得有多用力。方向通常可以预料：它会放大当事人本来就怀疑该负责的那个因素，也就意味着它倾向于确证正在被检验的假设。防御手段都围绕着不依赖记忆。从结局发生之前写下的记录中获取暴露信息：处方数据库、工作场所记录、留存的血样、数年前填写的问卷。或者设置一个该机制触及不到的比较，比如再问一个没有人会把它与该疾病联系起来的暴露问题：如果两组在这个问题上的漂移一样，那么漂移就与疾病无关。不起作用的做法是把问题问得更仔细，同样不起作用的是叮嘱人们要客观。",
  "The study everyone credits for this does not show it":
    "人人引用为源头的那项研究，其实并没有证明它",
  "A 1967 Finnish study is cited across the literature as the origin of recall bias. It re-interviewed mothers whose answers had been recorded during pregnancy, and its own text reports no significant difference between the mothers of affected and healthy children in how often the replies disagreed. What it does show, and spectacularly, is something else: only about a quarter of the information collected prospectively reappeared identically at re-interview, and roughly two thirds of the retrospective positive answers had no prospective record behind them, in both groups alike. That is not recall bias, it is a warning that retrospective interviews are unreliable even when nobody is biased at all.":
    "1967 年一项芬兰研究在文献中被广泛引作回忆偏倚的起源。该研究对妊娠期已记录过答案的母亲进行了再访谈，其正文报告：患病儿童的母亲与健康儿童的母亲在前后回答不一致的频率上没有显著差异。它确实显示出来的，而且相当惊人的，是另一件事：前瞻性收集的信息中只有约四分之一在再访谈时原样重现，而回顾性的阳性回答里大约三分之二背后没有任何前瞻性记录，两组都是如此。这不是回忆偏倚，而是一个警告：即使没有任何人存在偏倚，回顾性访谈也是不可靠的。",
  "And the largest test of it found almost none":
    "而对它最大规模的检验几乎没有发现它",
  "The biggest study of this design compared what parents said in interview against what their family doctor had already written down, for 1,624 children with cancer and 2,524 without. Agreement with the records was poor in places, but it was poor in much the same way in both groups. The authors found essentially no evidence that having a sick child changed how the past was reported. Recall bias is a real mechanism and a reason to prefer records over memory. It is not a law that memory always bends, and a study is not discredited by the mere fact that it asked people to remember.":
    "这一设计中规模最大的研究，把父母在访谈中的说法与家庭医生此前已经记录的内容作了比较，涉及 1,624 名患癌儿童和 2,524 名未患癌儿童。与记录的一致性在某些方面很差，但两组差得方式大致相同。作者基本上没有发现证据表明孩子患病会改变父母对过去的报告。回忆偏倚是一个真实存在的机制，也是优先采用记录而非记忆的理由。它并不是一条说记忆总会弯曲的定律，一项研究也不会仅仅因为要求人们回忆就被否定。",
  "Recall bias, a reasoning trap.":
    "回忆偏倚，一个推理陷阱。",
  "Ask someone what they were exposed to before they got ill and you are not only asking about the past, you are asking someone who has been given a reason to search it. A diagnosis makes people look harder, and looking harder turns up more. In one study the same women answered the same question about their skin years apart, once before anyone knew and once after a melanoma diagnosis, and the ones who had been diagnosed had shifted. Their skin had not. This rarely invents a finding from nothing. It takes a true one and makes it look bigger, which is much harder to catch, because the answer still agrees with what you expected.":
    "问一个人在患病之前暴露于什么，你问的不只是过去，你问的是一个已经被给了理由去搜寻过去的人。确诊会让人找得更用力，而找得更用力就会翻出更多东西。在一项研究中，同一批女性相隔数年回答了关于自己皮肤的同一个问题，一次在无人知情之前，一次在黑色素瘤确诊之后，被确诊的那些人的答案发生了移动。她们的皮肤没有。这很少会凭空造出一个发现。它是把一个真实的发现放大，而这要难察觉得多，因为答案仍然与你的预期相符。",
  "Two things a careful reader should know. First, the reference standard is the woman's own questionnaire filled in before diagnosis, not an external record, so this shows that the answers moved rather than which of the two answers was correct, and the authors' own conclusion is appropriately hedged: tanning ability was the one host factor whose shift was significant in the cases and not in the controls. Second, the paper prints odds ratios of 1.90 and 3.01 for this comparison. Those are the authors' own estimates and are not the crude odds ratios of these four cells, which are 1.80 and 2.55. The two pairs move in the same direction by a similar factor but they are not the same quantity, so only the crude ones, which anyone can recompute from the counts shown, appear in the text above.":
    "细心的读者需要知道两件事。第一，参照标准是这些女性自己在确诊前填写的问卷，而不是外部记录，所以这只能说明答案发生了移动，而不能说明两次答案中哪一次是正确的；作者自己的结论也做了恰当的保留：晒黑能力是唯一一个在病例组中移动显著、而在对照组中不显著的宿主因素。第二，论文对这一比较印出的比值比是 1.90 和 3.01。那是作者自己的估计值，并不是这四个格子的粗比值比，后者是 1.80 和 2.55。两组数值移动的方向相同、幅度相近，但它们不是同一个量，所以上文只采用了粗比值比，任何人都可以从所示计数中重新算出来。",
  "Patients who were dispensed this drug died far less often than those who were not. Is the drug working?":
    "配发过这种药的患者，死亡率远低于没有配发过的患者。是药起了作用吗？",
  "A cohort is followed from the day each patient enters it. Anyone who is dispensed the drug at any point during follow-up counts as treated; everyone else counts as untreated. 49 percent of the treated died against 71 percent of the untreated, and the drug appears to halve the death rate.":
    "一个队列从每位患者进入的那天开始随访。随访期间任何时点被配发过该药的人都算作用药组，其余人算作未用药组。用药组 49% 死亡，未用药组 71% 死亡，该药看上去把死亡率减半了。",
  "Is that gap the drug?":
    "这个差距是药造成的吗？",
  "One patient from each group":
    "每组各一名患者",
  "months":
    "月",
  "entered the cohort":
    "进入队列",
  "first prescription dispensed":
    "首次配药",
  "follow-up credited to each group":
    "计入各组的随访时间",
  "Counted, but death was impossible":
    "被计入，但死亡不可能发生",
  "Follow-up credited to each group":
    "计入各组的随访时间",
  "Counted as on the drug":
    "算作用药",
  "Counted as not on the drug":
    "算作未用药",
  "As the study counted it":
    "按研究的计法",
  "Yes, the drug is keeping them alive":
    "是，药物让他们活了下来",
  "half the deaths":
    "死亡少了一半",
  "No, the untreated were sicker to begin with":
    "不，未用药者本来就病得更重",
  "they were never offered it":
    "他们从未获得用药机会",
  "No, some of that time could not contain a death":
    "不，有些时间里不可能出现死亡",
  "the clock was started too early":
    "计时开始得太早",
  "Half the treated group's follow-up was time in which nobody could die.":
    "用药组一半的随访时间里，没有人可能死亡。",
  "Surviving is what put them in the treated group":
    "是活下来才让他们进了用药组",
  "This patient was counted as treated from the day they entered, but the prescription was not dispensed until month 11. Those eleven months are immortal: had the patient died in month 6, no prescription would ever have been written and they would have been counted in the other group instead. Death was not merely unlikely in that stretch, it was impossible by the way the groups were defined, and it is credited to the drug all the same:":
    "这位患者从进入队列那天起就被算作用药，但直到第 11 个月才配到药。这十一个月是永生的：如果该患者在第 6 个月死亡，就不会有任何处方开出，他会被算进另一组。在这段时间里死亡不只是不太可能，而是按分组定义根本不可能，可它仍然被算在了药物名下：",
  "The same follow-up, marked":
    "同一段随访，标注出来",
  "Nothing about the patients has to differ for this to work. Give both groups exactly the same drug, the same illness and the same luck, and the treated group will still come out ahead, because it has been handed a run of guaranteed survival that the other group cannot have. In the published example this is drawn from, the treated group was credited with 291.1 immortal person-years against 276.3 person-years in which it was genuinely at risk: more of its follow-up was impossible-to-die time than was real. Correcting only that moved the hazard ratio from 0.48 to 0.91.":
    "要产生这种效果，患者之间不需要有任何差异。给两组完全相同的药、相同的疾病和相同的运气，用药组仍然会占优，因为它被送了一段另一组不可能拥有的、必然存活的时间。在本例所依据的已发表研究中，用药组被计入 291.1 个永生人年，而真正处于风险中的只有 276.3 人年：它的随访里，不可能死亡的时间比真实的时间还多。仅仅纠正这一点，就把风险比从 0.48 变成了 0.91。",
  "The stretch before the prescription":
    "开药之前的那一段",
  "Immortal time bias":
    "永生时间偏倚",
  "If being in a group requires surviving until something happens, then the time before it happened cannot contain a death, and counting it towards that group manufactures survival out of bookkeeping.":
    "如果进入某一组的前提是活到某件事发生，那么这件事发生之前的时间里就不可能有死亡；把这段时间算给该组，等于用记账方式凭空造出生存。",
  "The tell is a group defined by something that occurs after follow-up starts: filled the prescription, had the operation, responded to treatment, won the award, completed the course. Ask what happens to a person who dies the day before. If they land in the comparison group, the clock is wrong. The fix is not a cleverer adjustment: it is to count each person's time as unexposed until the moment they become exposed, and let them switch.":
    "破绽在于：分组依据的是随访开始之后才发生的事情，比如取到药、做了手术、对治疗有反应、获了奖、完成了疗程。问一问，前一天死去的人会怎么样。如果他落进了对照组，那计时就错了。补救办法不是更聪明的校正，而是把每个人在暴露发生之前的时间都算作未暴露，并允许他在中途换组。",
  "Cohort studies compare rates, and a rate is deaths divided by time at risk. That denominator is where this hides. Suppose you want to know whether a drug helps, so you follow everyone admitted to hospital and sort them afterwards by whether they were ever dispensed it. The sorting looks innocent, but it uses information from the future: to be dispensed a drug in month 11, you must be alive in month 11. So every patient in the treated group is guaranteed to have survived to their own first prescription, and if you start their clock at admission you credit the treated group with all of that guaranteed survival. The untreated group gets no such gift, because it is where the early deaths necessarily land. The bias is large, it always points the same way, it makes useless drugs look protective, and it does not shrink with a bigger sample, because it is not noise. It also has nothing to do with confounding, which is why adjusting for how ill the patients were does not touch it: you can simulate the whole thing with identical patients and a drug that does nothing. The correct handling is standard and unglamorous. Treat exposure as time-varying: every patient contributes unexposed time from entry until their first prescription and exposed time after it, so nobody is credited to a group before they belong to it. The same trap sits under any claim built on people who finished something, from Academy Award winners living longer than nominees to patients who completed a rehabilitation programme, and in each case the first question is the same: what happens in these numbers to the person who died in the middle?":
    "队列研究比较的是率，而率是死亡数除以危险时间。这个分母就是它藏身之处。假设你想知道一种药是否有效，于是随访所有住院患者，事后按他们是否曾被配发过该药来分组。这种分组看起来无害，但它用到了来自未来的信息：要在第 11 个月拿到药，你必须在第 11 个月还活着。所以用药组里的每一位患者都必然活到了自己的首次处方，而如果你从入院开始给他们计时，就把这段必然存活的时间全都算给了用药组。未用药组得不到这份馈赠，因为早期死亡必然都落在那里。这个偏倚很大，方向始终一致，它让无用的药看起来有保护作用，而且不会因为样本更大而缩小，因为它不是随机误差。它也与混杂无关，这就是为什么校正患者病情轻重对它毫无作用：你可以用完全相同的患者和一种什么也不做的药，把整件事模拟出来。正确的处理方法是标准而不起眼的。把暴露当作时依变量：每位患者从进入队列到首次处方之间贡献未暴露时间，之后贡献暴露时间，这样就没有人会在归属某一组之前被算进该组。同样的陷阱潜伏在任何以完成了某件事的人为基础的说法之下，从奥斯卡获奖者比提名者更长寿，到完成了康复疗程的患者，而每一次要问的第一个问题都一样：在这些数字里，中途死去的那个人去哪儿了？",
  "The Oscar winners who did not, after all, live longer":
    "奥斯卡获奖者其实并没有更长寿",
  "A well-known study reported that Academy Award winners outlived the actors merely nominated alongside them by nearly four years, and it was widely read as evidence that status is good for your health. But an actor cannot win an award while dead, so every winner was credited with all the years before their win, whereas a nominee who died young could only ever be a nominee. Reanalysing the same data with the award treated as something that happens partway through a life, rather than a property of the whole life, cut the advantage to about a year and it was no longer statistically significant. The original authors later published a null result of their own.":
    "一项著名研究报告说，奥斯卡获奖者比与其一同获得提名的演员多活了将近四年，它被广泛解读为地位有益健康的证据。但演员不可能在死后获奖，所以每位获奖者获奖之前的全部年份都被算在获奖名下，而早逝的被提名者就只能永远是被提名者。把同一批数据重新分析，把获奖当作人生中途发生的一件事，而不是整段人生的一个属性，优势就降到约一年，并且不再有统计学意义。原作者后来自己发表了一个无差异的结果。",
  "Immortal time bias, a reasoning trap.":
    "永生时间偏倚，一个推理陷阱。",
  "Sort people into groups by something that happens later, and one of those groups gets a hidden head start. To be counted as having taken the drug, you have to live long enough to be given it. So everybody in the treated group is guaranteed to have survived up to their first prescription, and if you count that stretch towards the drug, the drug is credited with survival it had nothing to do with. Anyone who died early is automatically filed under untreated. It works even when the drug does nothing at all, it always points the same way, and a bigger study only makes it more convincing.":
    "按后来才发生的事情给人分组，其中一组就会得到一段隐藏的领先。要被算作用过药，你得活到有人给你开药。所以用药组里的每个人都必然活到了首次处方，而如果把这一段算给药物，药物就被记上了与它无关的生存。任何早期死亡的人都会自动被归入未用药组。哪怕这药什么作用也没有，它照样奏效；方向始终一致；研究规模越大，只会让它看起来越有说服力。",
  "The figure above is schematic, like the bomber diagram: two illustrative patients rather than two rows of the dataset, with proportions chosen to echo the published ones (eleven immortal months out of twenty-two counted, against 291.1 immortal person-years out of 567.4 counted, which is 51.3 percent). The numbers that are claims about the world, the death counts and the two hazard ratios, are all in the citation above and none of them is recomputed here: the hazard ratios come from survival models rather than from any two-by-two table, and the paper is a methodological reanalysis in which several cohort definitions are applied to one dataset, so the row is named exactly.":
    "上图是示意图，就像那张轰炸机图一样：画的是两名示例患者，而不是数据集中的两行，比例的选取是为了呼应已发表的数值（计入的二十二个月中有十一个月是永生时间，对应计入的 567.4 人年中有 291.1 人年是永生时间，即 51.3%）。那些对现实世界作出断言的数字，即死亡人数和两个风险比，都出自上面的引文，本文没有重新计算其中任何一个：风险比来自生存模型，而不是来自任何四格表；该论文是一项方法学再分析，对同一个数据集应用了若干种队列定义，因此这一行被精确指明。",
  "A weight-loss trial randomly assigns 400 people to a programme or to usual care. It reports the average weight lost among the 180 programme participants who attended at least eight sessions, and among all 200 controls. The programme wins comfortably.":
    "一项减重试验把 400 人随机分配到某项目组或常规照护组。它报告的是至少参加了八次课程的 180 名项目参与者的平均减重，以及全部 200 名对照者的平均减重。项目轻松胜出。",
  "One arm has been filtered and the other has not. Attending eight sessions is something people who were doing well were more able to do, so the programme group has quietly been reduced to its successes while the control group keeps everybody.":
    "一组被筛过，另一组没有。能参加八次课程的，更多是本来就进展顺利的人，所以项目组悄悄被缩减成了它的成功者，而对照组保留了所有人。",
  "In a surgical trial, some patients assigned to medication deteriorate and are operated on anyway. The analysis counts each patient under the treatment they ended up receiving, and finds surgery ahead.":
    "在一项外科试验中，部分被分配到药物治疗的患者病情恶化，最终还是做了手术。分析按每位患者最终接受的治疗来归组，发现手术占优。",
  "Switching happened after the coin flip and for a reason: those patients had to survive long enough to reach the operating table. Counting people by what they received rather than what they were assigned sorts them by how they were doing, which is the thing being measured.":
    "换组发生在随机分配之后，而且事出有因：那些患者必须活得足够久才能上手术台。按实际接受的治疗而不是按分配结果来归组，等于按患者当时的状况给他们分类，而这正是被测量的东西。",
  "A trial of a daily tablet excludes anyone who took less than 80 percent of their doses, on the grounds that the question is whether the drug works when actually taken. Both arms are filtered the same way.":
    "一项每日一片的药物试验排除了服药量不足 80% 的所有人，理由是问题在于这药在真正服用时是否有效。两组都用同样的方式筛过。",
  "Filtering both arms identically does not repair it. Who manages to take 80 percent of their tablets differs by how well they are and by much else besides, so each arm loses a different kind of patient and the groups the coin made no longer exist.":
    "对两组做同样的筛选并不能补救。谁能吃够 80% 的药片，取决于他的状况以及其他许多因素，所以两组各自失去的是不同类型的患者，随机分出来的两组已不复存在。",
  "A trial reports that among patients who completed the full twelve months, the new drug halved relapses. A quarter of that arm withdrew before twelve months and are not counted.":
    "一项试验报告说，在完成全部十二个月的患者中，新药把复发减少了一半。该组有四分之一的人在十二个月前退出，未被计入。",
  "People usually withdraw for a reason, and relapsing is one of the commonest. An analysis of completers can turn the drug's failures into people who simply are not in the table.":
    "人们退出通常是有原因的，复发就是最常见的原因之一。只分析完成者，会把药物的失败者变成根本不出现在表里的人。",
  "Mothers of babies born with a heart defect are interviewed about what they took during pregnancy, alongside mothers of healthy babies. The mothers of affected babies report far more medicine use in the first trimester, and a report concludes the medicines are implicated.":
    "出生时患有心脏缺陷的婴儿的母亲，与健康婴儿的母亲一起接受访谈，被问及孕期服用过什么。患病婴儿的母亲报告的孕早期用药明显更多，一份报告据此断定这些药物与之有关。",
  "One group has spent months being asked what went wrong and searching for it. The other has had no reason to think about the first trimester at all. The comparison is partly of what was taken and partly of how hard each group looked.":
    "一组已经花了好几个月被问哪里出了问题，并且一直在寻找答案。另一组则完全没有理由去回想孕早期。这个比较一部分比的是服用了什么，一部分比的是各组找得有多用力。",
  "People with a brain tumour and people without are asked how many hours a week they used a mobile phone ten years ago, and on which side of the head. Those with a tumour report more hours, and more often on the side the tumour is on.":
    "患脑肿瘤的人和未患病的人被问及十年前每周用手机多少小时，以及贴在头的哪一侧。患肿瘤的人报告的小时数更多，而且更常报告在肿瘤所在的那一侧。",
  "Nobody can accurately recall a decade of phone habits, so the gap is filled in, and the tumour tells them which side to fill it in on. Billing records would settle it; memory cannot.":
    "没有人能准确回忆十年的用手机习惯，于是空白被填补起来，而肿瘤告诉他们该往哪一侧填。话费记录能解决这个问题，记忆不能。",
  "After a bowel cancer diagnosis, patients are asked to describe their diet over the previous twenty years, and their answers are compared with those of healthy volunteers of the same age.":
    "在确诊肠癌之后，患者被要求描述此前二十年的饮食，他们的回答与同龄健康志愿者的回答作比较。",
  "The patients have already been told which foods are suspected, and are reconstructing twenty years around a diagnosis. The volunteers are reconstructing twenty years around nothing in particular.":
    "患者已经被告知哪些食物有嫌疑，他们是围绕一次确诊在重建这二十年。志愿者则是在没有任何特定线索的情况下重建这二十年。",
  "Workers making a compensation claim for back pain are asked how heavy their lifting used to be, and their answers are compared with those of colleagues who made no claim.":
    "因腰背痛提出工伤赔偿申请的工人被问及他们以前搬举的重量有多大，其回答与未提出申请的同事作比较。",
  "Both groups did the same job. Only one has spent months assembling an account of how demanding it was, and that account is what is being measured.":
    "两组做的是同样的工作。只有一组花了几个月整理出一套关于这份工作有多繁重的说法，而被测量的正是这套说法。",
  "A registry compares patients who received a transplant with those on the waiting list who did not, counting each patient's survival from the day they joined the list. The transplanted group lives far longer.":
    "一个登记系统把接受了移植的患者与仍在等待名单上未接受移植的患者作比较，每位患者的生存时间从他登记入列那天算起。移植组的生存时间长得多。",
  "To be transplanted you must survive until an organ arrives, so everyone in that group is guaranteed to have lived from listing to surgery. Anyone who dies while waiting can only ever be in the other group.":
    "要接受移植，你必须活到有器官可用，所以那一组里的每个人都必然从登记活到了手术。任何在等待中死亡的人，都只能落在另一组。",
  "A hospital reports that patients who completed the full six-week rehabilitation course had better one-year survival than those who did not, measured from the day of admission.":
    "一家医院报告说，完成了全部六周康复疗程的患者，一年生存率优于未完成者，生存时间从入院当天算起。",
  "Completing six weeks requires being alive for six weeks. The comparison group collects everyone who died in the meantime, and the course is credited with those first six weeks of guaranteed survival.":
    "完成六周的前提是活满六周。对照组收纳了这期间死亡的所有人，而这最初六周必然存活的时间被算在了疗程名下。",
  "Using a prescription database, researchers classify each patient as a drug user if they were ever dispensed it during follow-up, and count follow-up from the date of their hospital discharge.":
    "研究者利用处方数据库，把随访期间曾被配发过该药的患者归为用药者，并从其出院日期开始计算随访时间。",
  "The classification uses the future. Time between discharge and the first dispensing cannot contain a death for anyone counted as a user, yet it is credited to the drug. Counting each patient as unexposed until their first prescription removes it.":
    "这种分类用到了未来的信息。对任何被算作用药者的人来说，出院到首次配药之间的这段时间不可能出现死亡，却被算在了药物名下。把每位患者在首次处方之前都算作未暴露，就能消除它。",
  "An oncology paper reports that patients whose tumour responded to chemotherapy survived longer than non-responders, timing survival from the start of treatment. Response was assessed after three cycles.":
    "一篇肿瘤学论文报告说，肿瘤对化疗有反应的患者比无反应者生存更久，生存时间从治疗开始计算。疗效是在三个周期之后评估的。",
  "You cannot be classed as a responder unless you live to the assessment after three cycles. Patients who die during the first two cycles are all non-responders by construction, so the responder group starts with survival built into it.":
    "除非你活到三个周期后的评估，否则不可能被归为有反应者。在前两个周期中死亡的患者，按定义全都是无反应者，所以有反应组从一开始就把生存内置在里面了。",
  "A drug-safety study counts each patient as untreated from enrolment until the day of their first prescription, and as treated from that day onwards, so a patient can contribute time to both groups.":
    "一项药物安全性研究把每位患者从入组到首次处方当天之前的时间算作未用药，从那天起算作用药，因此一位患者可以同时向两组贡献时间。",
  "Nobody is credited to a group before they belong to it, so no stretch of guaranteed survival is handed to the treated group. This is the standard fix, correctly applied.":
    "没有人在归属某一组之前被算进该组，所以用药组不会被送上一段必然存活的时间。这是标准的补救办法，而且用得正确。",
  "A study of patients who completed a course of treatment starts everyone's clock at the end of the course, and excludes anyone who died before that point from both groups alike.":
    "一项针对完成疗程患者的研究，把所有人的计时起点都放在疗程结束时，并且对两组一视同仁地排除在此之前死亡的人。",
  "Starting the clock after the point where group membership was settled means neither group can be credited with survival it was guaranteed. It costs some early data, and it removes the head start.":
    "把计时起点放在分组已经确定之后，意味着两组都不会被记上必然获得的生存时间。这会损失一些早期数据，但消除了那段领先。",
  "A study of a drug taken in pregnancy takes the exposure from the national prescription database rather than from interviews, then compares outcomes. Neither the mothers nor the researchers supplied the exposure data.":
    "一项关于孕期用药的研究，从全国处方数据库而不是从访谈中获取暴露信息，然后比较结局。暴露数据既不是由母亲提供的，也不是由研究者提供的。",
  "The exposure was written down before anyone knew the outcome, by someone with no stake in it. That is the standard defence against memory bending, and here it was used.":
    "暴露是在任何人知道结局之前，由与此事无利害关系的人记录下来的。这是防止记忆变形的标准做法，这里用上了。",
  "A case-control study asks about the suspected exposure and also about a second, unrelated one that nobody associates with the disease. Both groups report the second one at the same rate, and the authors say so before reporting the first.":
    "一项病例对照研究既询问了可疑暴露，也询问了第二个无关的、没人会把它与该疾病联系起来的暴露。两组报告第二个暴露的比例相同，作者在报告第一个暴露之前先说明了这一点。",
  "The second question is a control for the searching itself. If one group were simply remembering harder across the board, it would show up there too, and it did not.":
    "第二个问题是对搜寻行为本身的对照。如果某一组只是整体上回忆得更用力，那在这个问题上也会显现出来，而事实并没有。",
  "A trial's main result counts every patient in the group they were randomly assigned to, including the 40 who never started the treatment. A per-protocol analysis is reported alongside it, agrees with it, and is labelled as secondary.":
    "一项试验的主要结果把每位患者都计入他被随机分配到的组，包括从未开始治疗的 40 人。符合方案分析与之并列报告，结果一致，并被标注为次要分析。",
  "The randomised comparison is the one the conclusion rests on, the other is shown for completeness, and the two agree. That is how both analyses are supposed to be used.":
    "结论依据的是随机比较，另一个只是为完整起见列出，两者一致。这正是两种分析本该被使用的方式。",
  "A trial testing whether a simpler regimen is no worse than the standard one reports both analyses, notes that counting non-adherent patients in their assigned group tends to make two treatments look alike, and declines to claim non-inferiority because only one of the two analyses supports it.":
    "一项检验更简单的方案是否不劣于标准方案的试验同时报告了两种分析，指出把依从性差的患者仍计入其分配组会倾向于让两种治疗看起来相似，并且因为两种分析中只有一种支持，而未宣称非劣效。",
  "Counting everyone as assigned is conservative when you are trying to show a difference and permissive when you are trying to show similarity, so a non-inferiority claim needs both analyses to agree. Refusing to claim it when they disagree is the careful move, not the trap.":
    "按分配计入所有人，在你想证明存在差异时是保守的，在你想证明相似时则是宽松的，所以非劣效的结论需要两种分析一致。当两者不一致时拒绝下这个结论，是审慎之举，而不是陷阱。",
};
