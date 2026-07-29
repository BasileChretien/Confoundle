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
  "The trial's own explanation": "试验自己的解释",
  "The authors did not attribute the gap to better treatment. They noted that similar mortality alongside better survival points to lesions of limited clinical relevance being found in the screened arm. Twenty years of follow-up did not rescue the result: deaths from lung cancer were 337 among 4,607 screened men and 303 among 4,585 others, a difference in the wrong direction and not statistically significant.":
    "作者并没有把这道差距归功于更好的治疗。他们指出，死亡率相近而生存率更好，说明筛查组查出了一些临床意义有限的病灶。二十年的随访也没能挽救这个结果：肺癌死亡在 4,607 名接受筛查的男性中为 337 例，在另外 4,585 人中为 303 例，差异的方向是反的，而且没有统计学意义。",
  "Why screening is judged on deaths, not survival": "为什么筛查要看死亡，而不是生存",
  "This is not a historical curiosity. National screening programmes are assessed on whether they lower deaths from the disease in the whole invited population, precisely because survival among detected cases can be lifted by three separate artefacts without a single life being extended. A programme that raises five-year survival and leaves mortality untouched has, on the evidence, done nothing except give more people the label.":
    "这不是一桩历史趣闻。全国性的筛查项目要看的是它能否降低整个受邀人群中死于该病的人数，原因恰恰在于：被查出的病例的生存率可以被三种各自独立的假象抬高，而没有一条生命因此延长。一个提高了五年生存率、却让死亡率纹丝不动的项目，从证据上看，除了给更多人贴上标签之外什么也没做。",
  "Length-time bias, a reasoning trap.": "病程长短偏倚，一个推理陷阱。",
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

  // ---- intention to treat, recall bias, immortal time ----
  "Two players are compared over a season. Player A made 35% of all shots and Player B made 65%, and the coach's report names B the more accurate shooter. Sorted into close shots and long shots, A had the higher percentage in both.":
    "对两名球员进行整个赛季的比较。A 球员的总命中率为 35%，B 球员为 65%，教练组的报告认定 B 出手更准。按近距离出手和远距离出手分开看，A 在两类中的命中率都更高。",
  "Almost all of B's attempts were close range, where anyone scores often, while A shot mostly from distance, so the pooled percentages record where the shots were taken from rather than who shoots better.":
    "B 的出手几乎全部来自近距离，而近距离谁都容易命中；A 则大多从远处出手，因此合并后的百分比记录的是在哪里出手，而不是谁投得更准。",
  "A company reviews last year's applications. Overall 70% of outside applicants were hired against 40% of internal ones, and a manager tells the board the process quietly favours outsiders. Team by team, internal applicants were hired at the higher rate in both the engineering team and the sales team.":
    "一家公司复盘去年的求职申请。总体上外部申请者的录用率为 70%，内部申请者为 40%，一位经理向董事会表示流程暗中偏向外部人选。分团队看，在工程团队和销售团队中，内部申请者的录用率都更高。",
  "Outside applicants went mainly to engineering, which was hiring heavily, while internal ones applied mainly to sales, where almost nobody was being taken on, so the pooled figures compare which team people applied to.":
    "外部申请者主要投向正在大量招人的工程团队，内部申请者主要投向几乎不招人的销售团队，因此合并后的数字比较的是人们申请了哪个团队。",
  "A team replaces its sign up page. The new page signs up 35% of visitors against the old page's 13%, and the product lead calls it a clear win. Looked at separately, the old page did better among desktop visitors and better among phone visitors.":
    "一个团队更换了注册页面。新页面的访客注册率为 35%，旧页面为 13%，产品负责人称这是明显的胜利。分开来看，旧页面在电脑访客中表现更好，在手机访客中也更好。",
  "The old page was seen mostly by phone visitors, who rarely sign up on either version, and the new one mostly by desktop visitors, who sign up often, so the overall gap tracks the audience mix.":
    "旧页面主要被手机访客看到，这类访客在两个版本上都很少注册；新页面主要被电脑访客看到，这类访客经常注册，所以总体差距反映的是受众构成。",
  "Two customer service centres are compared. One settles 85% of calls at the first attempt and the other 54%, so the bonus goes to the first. Broken into routine calls and complicated ones, the second centre settles the higher share of each.":
    "对两个客服中心进行比较。一个中心 85% 的来电一次解决，另一个为 54%，奖金因此发给了前者。拆成常规来电和复杂来电后，第二个中心在两类中的一次解决比例都更高。",
  "Nearly all of the second centre's work is complicated calls, which are hard to settle at once, while the first handles mostly routine ones, so the combined rate compares workloads rather than skill.":
    "第二个中心的工作几乎全是复杂来电，这类来电很难一次解决，而第一个中心处理的大多是常规来电，所以合并后的比率比较的是工作量而不是能力。",
  "A chain compares two hotels on guest ratings. One averages 4.3 out of 5 and the other 3.3, and head office holds the second up as the weaker property. Among business guests the second scores higher, and among holiday guests it scores higher too.":
    "一家连锁集团比较两家酒店的客人评分。一家平均 4.3 分（满分 5 分），另一家 3.3 分，总部把第二家列为较差的物业。在商务客人中第二家得分更高，在度假客人中它的得分也更高。",
  "Almost all of the lower rated hotel's reviews come from business guests, who mark every hotel down, while the other's come mostly from holidaymakers, who mark everything up, so the averages compare who was reviewing.":
    "评分较低那家酒店的点评几乎全部来自商务客人，这类客人给每家酒店打分都偏低；另一家的点评大多来自度假客人，这类客人给什么都打分偏高，所以平均分比较的是谁在点评。",
  "A cooperative compares two seed varieties across its members' fields. One averaged 5.6 tonnes a hectare and the other 2.6, and the newsletter recommends the first. On clay ground the second variety yielded more, and on sandy ground it yielded more as well.":
    "一家合作社在社员的田地上比较两个种子品种。一个平均每公顷 5.6 吨，另一个 2.6 吨，社刊推荐第一个。在黏土地上第二个品种产量更高，在沙土地上它的产量也更高。",
  "The lower yielding variety was sown almost entirely on sandy ground, which grows little of anything, and the other almost entirely on clay, so the averages mostly record where each seed was planted.":
    "产量较低的品种几乎全部播在沙土地上，而沙土地种什么都长不好；另一个几乎全部播在黏土地上，所以平均值主要记录的是每种种子播在了哪里。",
  "Two courier firms report on time delivery. One arrives on time for 92% of parcels and the other for 72%, so a retailer moves its contract to the first. Counting town deliveries and country deliveries separately, the second firm is on time more often in both.":
    "两家快递公司报告准时送达情况。一家 92% 的包裹准时到达，另一家为 72%，一家零售商因此把合同转给了前者。把城区配送和乡村配送分开统计，第二家公司在两类中的准时比例都更高。",
  "The firm with the worse headline figure carries nearly all the country parcels, which run late for everyone, while the other carries mostly short town runs, so the combined rate reflects the routes each was given.":
    "总体数字较差的那家承运了几乎全部乡村包裹，这类包裹对谁来说都容易延误；另一家承运的大多是城区短途，所以合并后的比率反映的是各自分到的线路。",
  "A screening test at an amateur athletics meeting catches 99% of competitors who have used a banned substance and wrongly flags 1% of those who have not. About 1 competitor in 500 has used one. A commentator says a flagged athlete is 99% certain to be guilty.":
    "业余田径运动会上的一项筛检能查出 99% 使用过违禁物质的参赛者，并把 1% 未使用者错误标记。约每 500 名参赛者中有 1 人使用过。一位评论员说被标记的运动员有 99% 的把握是有问题的。",
  "Clean competitors outnumber users 499 to 1, so flagging one percent of them yields roughly five wrong flags for every real one, and most flagged athletes have taken nothing.":
    "干净的参赛者与使用者的比例是 499 比 1，把其中百分之一标记出来，每有一个真阳性就大约有五个错误标记，被标记的运动员大多什么都没用过。",
  "A bank's monitoring catches essentially every fraudulent card payment and wrongly flags 1 legitimate payment in 200. About 1 payment in 10,000 is fraudulent. A manager proposes freezing the account of anyone whose payment is flagged, saying almost all of them are frauds.":
    "一家银行的监控几乎能查出每一笔欺诈性刷卡支付，并把每 200 笔正常支付中的 1 笔错误标记。约每 10,000 笔支付中有 1 笔属于欺诈。一位经理提议冻结所有被标记支付的账户，称其中几乎都是欺诈。",
  "For each fraudulent payment there are about 10,000 legitimate ones, and half a percent of those is roughly 50 wrong flags per real fraud, so nearly every frozen account belongs to an ordinary customer.":
    "每一笔欺诈支付对应约 10,000 笔正常支付，其中的百分之零点五意味着每一笔真欺诈约有 50 个错误标记，所以被冻结的账户几乎都属于普通客户。",
  "A university's text checking tool is 98% accurate in both directions. About 1 essay in 200 is genuinely copied. The disciplinary panel tells every student it flags that there is a 98% chance they copied.":
    "一所大学的文本查重工具在两个方向上的准确率都是 98%。约每 200 篇论文中有 1 篇确实是抄袭的。纪律委员会告诉每一位被标记的学生，他们抄袭的可能性是 98%。",
  "Honest essays outnumber copied ones 199 to 1, so two percent of them produces about four wrong flags for every real one, and a flagged student is more likely innocent than not.":
    "诚实完成的论文与抄袭论文的比例是 199 比 1，其中百分之二意味着每有一个真抄袭就约有四个错误标记，被标记的学生更可能是清白的。",
  "A camera on a production line spots 95% of faulty units and wrongly rejects 3% of good ones. About 1 unit in 1,000 leaves the line faulty. The plant manager scraps every rejected unit, saying almost all of them must be defective.":
    "生产线上的一台相机能识别 95% 的次品，并错误剔除 3% 的合格品。约每 1,000 件下线产品中有 1 件是次品。厂长把所有被剔除的产品报废，称其中几乎都有缺陷。",
  "Good units outnumber faulty ones about 1,000 to 1, so rejecting three percent of them discards roughly thirty sound units for every faulty one caught.":
    "合格品与次品的比例约为 1,000 比 1，剔除其中百分之三意味着每抓出一件次品就丢掉约三十件好产品。",
  "A water company's sensors are right 95% of the time when they call a pipe section leaking or sound. About 1 section in 400 leaks in a given year. The operations plan assumes crews will find a leak at nearly every flagged section.":
    "一家自来水公司的传感器在判断管段漏水或完好时，有 95% 的时候是正确的。某一年里约每 400 段管道中有 1 段漏水。运营计划假定作业队在几乎每一个被标记的管段都会找到漏点。",
  "Sound sections outnumber leaking ones 399 to 1, so the five percent of them wrongly called leaking gives about twenty wasted excavations for every genuine leak.":
    "完好管段与漏水管段的比例是 399 比 1，被误判为漏水的那百分之五意味着每一个真漏点对应约二十次白挖。",
  "A retailer screens applicants with a questionnaire that correctly identifies 90% of people who would steal stock and wrongly flags 10% of those who would not. About 1 applicant in 100 would steal. The hiring team rejects everyone flagged, saying nine in ten of them are thieves.":
    "一家零售商用问卷筛检求职者，问卷能正确识别 90% 会偷货的人，并错误标记 10% 不会偷货的人。约每 100 名求职者中有 1 人会偷货。招聘团队拒绝所有被标记的人，称其中十之有九是小偷。",
  "Honest applicants outnumber the rest 99 to 1, so flagging a tenth of them turns away about eleven blameless people for every one who would have stolen.":
    "诚实的求职者与其余的人的比例是 99 比 1，把其中十分之一标记出来，每挡下一个会偷货的人就同时拒掉约十一个无辜的人。",
  "A company's mail filter is 99% accurate at telling phishing from ordinary mail. About 1 arriving message in 3,000 is phishing. The security lead tells staff that anything the filter quarantines is almost certainly an attack.":
    "一家公司的邮件过滤器在区分钓鱼邮件和普通邮件时准确率为 99%。约每 3,000 封收到的邮件中有 1 封是钓鱼邮件。安全负责人告诉员工，凡是被过滤器隔离的几乎肯定是攻击。",
  "Ordinary messages outnumber phishing ones about 3,000 to 1, so the one percent of them wrongly quarantined outnumbers the real attacks by roughly thirty to one.":
    "普通邮件与钓鱼邮件的比例约为 3,000 比 1，被错误隔离的那百分之一在数量上以约三十比一压倒真正的攻击。",
  "An insurer finds that drivers who have fitted a dashboard camera claim for accidents far less often than drivers who have not. Its marketing team announces that fitting a camera makes you a safer driver, and offers a discount to anyone who installs one.":
    "一家保险公司发现，装了行车记录仪的司机出险索赔的频率远低于没装的司机。其市场部宣布装记录仪会让你开车更安全，并对安装者提供折扣。",
  "Cautious drivers are the ones who buy the cameras in the first place, so the camera marks out a type of driver rather than changing how anyone drives.":
    "本来就谨慎的司机才会去买记录仪，所以记录仪标记出的是一类司机，而不是改变了任何人的驾驶方式。",
  "A consultant surveys firms and reports that those with the largest customer support teams receive the most complaints. The write up advises keeping support teams small so that complaints stay down.":
    "一位顾问调查了多家企业，报告称客服团队最大的企业收到的投诉最多。报告建议把客服团队保持精简，以便压低投诉。",
  "Firms staff up because complaints are already arriving, so the arrow runs from complaints to headcount, and larger firms generate more of both anyway.":
    "企业增加人手是因为投诉已经涌来，所以箭头是从投诉指向人数的，而且更大的公司本来两者都更多。",
  "An energy supplier reports that homes with a smart thermostat use a fifth less gas than homes without one. Its advertising says the thermostat cuts your gas use by a fifth.":
    "一家能源供应商报告称，装了智能温控器的家庭比没装的家庭少用五分之一的燃气。其广告称温控器能把你的燃气用量减少五分之一。",
  "The households that install one tend to have newer, better insulated homes and an existing interest in trimming bills, so the comparison is between two kinds of household as much as two thermostats.":
    "安装温控器的家庭往往住在更新、保温更好的房子里，本来就在意压低账单，所以这个比较既是在比两种温控器，也是在比两类家庭。",
  "A motoring column notes that stretches of road with fixed speed cameras record more crashes than stretches without them, and argues that the cameras distract drivers into crashing.":
    "一个汽车专栏指出，装有固定测速摄像头的路段记录的事故比没装的路段更多，并主张摄像头分散了司机注意力从而导致事故。",
  "Cameras are installed on stretches that already had a bad crash record, so the crashes came first and chose the camera sites rather than the other way round.":
    "摄像头装在本来事故记录就很差的路段上，所以是事故在先并决定了摄像头的位置，而不是反过来。",
  "A gym newsletter reports that members who use the sauna after training take fewer sick days than members who do not, and concludes that ten minutes in the sauna strengthens the immune system.":
    "一家健身房的通讯报告称，训练后使用桑拿的会员请病假的天数少于不用的会员，并得出结论说十分钟桑拿能增强免疫系统。",
  "Members with the time and habit to stay on for the sauna are the ones training regularly and in better health already, so sauna use is a marker of that group rather than a cause.":
    "有时间也有习惯留下来蒸桑拿的会员，本来就是规律训练、身体更好的那批人，所以使用桑拿是这个群体的标志而不是原因。",
  "A trend piece points out that over eleven years national sales of houseplants and of noise cancelling headphones rose almost in step, and suggests the houseplant boom is what pushed people to buy headphones.":
    "一篇趋势报道指出，十一年间全国室内绿植和降噪耳机的销量几乎同步上升，并提出室内绿植热潮推动了人们购买耳机。",
  "Both climbed alongside the same rise in city renting and spending on home comfort, and any two quantities that drift steadily upward will track each other whatever is driving them.":
    "两者都是随着同一波城市租房增长和居家舒适支出上升而攀升的，而任何两个持续走高的量都会彼此同步，无论背后的推手是什么。",
  "A plant manager notices that shifts where the radio is playing turn out fewer defective units, and orders music to be played on every shift to bring the defect rate down.":
    "一位厂长注意到放收音机的班次次品更少，于是下令每个班次都放音乐以降低次品率。",
  "The radio happens to be on during day shifts, which are staffed by the longest serving operators working the easier product runs, so experience and workload are what separate the shifts.":
    "收音机恰好是在白班开着的，白班由工龄最长的操作工负责，做的也是较容易的产品批次，所以真正区分这些班次的是经验和工作难度。",
  "An investment firm's brochure lists the twenty funds it offers today and reports that the average one has beaten the market over the past ten years. The sales team presents this as proof of the firm's stock-picking skill.":
    "一家投资公司的宣传册列出了它今天在售的二十只基金，并报告平均而言这些基金在过去十年跑赢了大盘。销售团队把这当作公司选股能力的证明。",
  "The table contains only funds still open today, so the ones that did badly enough to be closed or merged away during the decade have been dropped from the average before it was taken.":
    "表格里只有今天仍在运作的基金，那些十年间因业绩太差而清盘或被合并掉的基金，在计算平均值之前就已经被剔除了。",
  "A magazine profiles thirty founders whose companies are now worth billions and finds that most left university early and ignored advice to take a safe job. Its careers columnist tells readers that leaving early is the surer path.":
    "一本杂志采访了三十位公司现值数十亿的创始人，发现其中多数人提前从大学退学，并且没听从找一份稳定工作的建议。其职业专栏作者告诉读者，提前退学是更稳妥的路。",
  "The thirty were picked for having made it, so the far larger number who left early, failed and were never profiled are missing, and the failure rate of the strategy cannot be read off this group.":
    "这三十人是因为成功了才被选中的，那些同样提前退学、失败了、从未被采访的更大多数人并不在其中，这个群体读不出这条策略的失败率。",
  "A council engineer notes that the stone bridges built in the town two centuries ago all still carry traffic, while several concrete ones from the 1970s have had to be replaced. He writes that the older building methods were plainly more durable.":
    "一位市政工程师注意到，镇上两百年前建的石桥至今仍在通车，而 1970 年代的几座混凝土桥已不得不重建。他写道，旧的建造方法显然更耐久。",
  "Only the two hundred year old bridges good enough to last are left to inspect, while the poorly built ones of that era collapsed or were demolished long ago and never enter the comparison.":
    "留下来供人查看的只有那些质量足以撑过两百年的桥，那个年代建得差的桥早已垮塌或被拆除，根本没有进入这个比较。",
  "A music magazine interviews twenty bands that reached the charts after years in small venues, and finds that every one of them refused to change their sound when a label asked. The writer concludes that refusing to compromise is what gets a band signed.":
    "一本音乐杂志采访了二十支在小场地演了多年后打进排行榜的乐队，发现每一支在唱片公司提出要求时都拒绝改变自己的曲风。作者的结论是，拒绝妥协才能让乐队签约。",
  "The sample was drawn from bands that charted, so the many acts that also refused and were dropped or never signed are absent, leaving the cost of the tactic invisible.":
    "样本取自打进排行榜的乐队，那些同样拒绝妥协却被弃约或从未签约的众多乐队并不在内，这条做法的代价因此看不见。",
  "A car magazine surveys owners at an enthusiasts' rally for a model built thirty years ago. Almost all report low running costs and few breakdowns, and the magazine names it the most dependable car of its era.":
    "一本汽车杂志在一场车迷聚会上调查了一款三十年前生产车型的车主。几乎所有人都反映使用成本低、故障少，杂志因此把它评为那个年代最可靠的车。",
  "Only cars sound enough to still be driven to a rally are in the sample; the ones that rusted or failed were scrapped years ago and their owners are not there to be asked.":
    "样本里只有状况好到还能开去聚会的车；那些锈掉或坏掉的车多年前就已报废，它们的车主不在现场，也就无从问起。",
  "A museum label states that the region's ancient potters worked to a standard modern factories struggle to match. The claim rests on the jars in the case, all of them lifted whole from a buried settlement two thousand years later.":
    "一块博物馆展签写道，该地区的古代陶工达到的水准是现代工厂难以企及的。这一说法依据的是展柜里的陶罐，它们全都是两千年后从一处埋藏的聚落中完整取出的。",
  "The collection is filtered by what stayed intact underground for two millennia, so thin, flawed or badly fired pots are physically absent from the evidence used to judge the average standard.":
    "这批藏品被在地下完整保存两千年这一条件筛选过，所以壁薄的、有瑕疵的或烧制不佳的陶器，在用来判断平均水准的证据里根本不存在。",
  "A rowing academy studies the athletes in its national squad and finds that nearly all of them trained through serious pain at eighteen. The head coach tells new recruits that pushing through injury is what separates those who make it.":
    "一所赛艇学院研究了国家队的运动员，发现几乎所有人在十八岁时都曾忍着剧痛训练。主教练告诉新学员，带伤硬撑正是能否出头的分水岭。",
  "The squad consists of those whose bodies withstood it, while recruits whose injuries ended their careers left the sport and are no longer in the group being examined, hiding the risk of the advice.":
    "国家队由身体扛住了的人组成，而那些因伤结束生涯的学员已经离开了这项运动，不再属于被考察的群体，这条建议的风险因此被掩盖。",
  "A partial print from a break-in is searched against a national database of six million people and returns one name. The examiner says about 1 person in 500,000 would match it. Counsel tells the jury there is therefore a 1 in 500,000 chance the man was not there.":
    "一起入室案现场的残缺指纹在一个含六百万人的全国数据库中检索，返回了一个名字。鉴定人说约每 500,000 人中有 1 人会与之匹配。律师告诉陪审团，因此此人不在现场的可能性是 500,000 分之 1。",
  "The 1 in 500,000 is how often an unconnected person matches, and searching six million people should turn up about a dozen such matches, so it is not the chance that this man was elsewhere.":
    "500,000 分之 1 说的是一个毫无关联的人发生匹配的频率，在六百万人中检索应当出现约十几个这样的匹配，所以它不是此人当时身在别处的概率。",
  "An auditor screens every branch of a retail chain for a rounding pattern that would arise by chance in about 1 honestly kept ledger in 10,000. One of the chain's 30,000 branches shows it, and the report states that the manager is almost certainly falsifying figures.":
    "一名审计员对一家连锁零售的每个门店筛检一种取整模式，这种模式在如实记账的账簿中偶然出现的概率约为 10,000 分之 1。该连锁 30,000 家门店中有一家出现了这种模式，报告称该店经理几乎肯定在做假账。",
  "The 1 in 10,000 describes how often honest books show the pattern, not how often books showing it are dishonest, and screening 30,000 branches should produce about three honest ones like it.":
    "10,000 分之 1 描述的是诚实账簿出现这种模式的频率，而不是出现这种模式的账簿有多大比例不诚实，筛检 30,000 家门店本就应当出现约三家这样的诚实账簿。",
  "A weekly prize draw has been won twice by the same person. An organiser calculates that the odds of a given player winning twice are about one in a million, and concludes the draw was rigged. The draw has run for twenty years with over three million regular players.":
    "一项每周抽奖被同一个人中了两次。一位主办方人员算出某位指定玩家中两次的几率约为百万分之一，据此认定抽奖被做了手脚。该抽奖已办了二十年，固定参与者超过三百万人。",
  "One in a million applies to one player named in advance, whereas the question asked afterwards is whether anyone at all among three million regular players would win twice, which is close to expected.":
    "百万分之一适用于事先指定的某一位玩家，而事后提出的问题是三百万固定玩家中是否有任何一人会中两次，这接近于本来就该发生的情况。",
  "An internal auditor at a company of 700 staff reports that two employees who sign off each other's expense claims were born on the same day of the year. He puts the chance of that at 1 in 365 and states they are almost certainly working together.":
    "一家有 700 名员工的公司的内部审计员报告称，两名互相签批报销单的员工在一年中的同一天出生。他把这种情况的概率定为 365 分之 1，并称两人几乎肯定在串通。",
  "The 1 in 365 fits one pair chosen in advance, but he combed hundreds of pairs for any oddity, and how often innocent pairs share a birthday is not the probability of innocence given a shared birthday.":
    "365 分之 1 适用于事先选定的一对人，但他是在数百对人中搜寻任何异常，而清白的一对人生日相同的频率，并不等于生日相同条件下清白的概率。",
  "Four children on one street develop the same rare illness within a year. A campaigner calculates that this would happen by chance in about one street in a million, and tells a public meeting there is therefore a one in a million chance the nearby plant is blameless.":
    "同一条街上有四名儿童在一年内患上同一种罕见疾病。一位活动人士算出这种情况偶然发生的概率约为百万条街中有一条，并在一场公开会议上说，因此附近那家工厂无责的可能性是百万分之一。",
  "The figure is the chance of such a cluster on a street picked in advance with nothing causing it, and with millions of streets in the country a few clusters are expected somewhere regardless of the plant.":
    "这个数字是在没有任何致因的情况下，事先指定的一条街出现这种聚集的概率，而全国有数百万条街，不管有没有那家工厂，某些地方本来就应当出现几处聚集。",
  "An anonymous threatening letter was printed in a distinctive typeface installed on roughly 1 printer in 20,000. A suspect's office printer carries it. The investigating officer writes that the odds against anyone else having produced the letter are 20,000 to 1.":
    "一封匿名恐吓信使用了一种特殊字体打印，约每 20,000 台打印机中有 1 台装有该字体。一名嫌疑人办公室的打印机装有它。办案人员写道，这封信出自他人之手的几率是 20,000 比 1。",
  "With millions of printers in the country, several hundred carry the same typeface, so the figure measures how rare the feature is rather than how likely this owner is to have written the letter.":
    "全国有数百万台打印机，其中数百台装有同样的字体，所以这个数字衡量的是该特征有多罕见，而不是这台机器的主人写了这封信的可能性有多大。",
  "A national programme screens about 60,000 samples a year. One athlete's sample shows a marker found in roughly 1 in 10,000 samples from clean competitors, and the panel chair states there is a 1 in 10,000 chance the athlete competed clean.":
    "一个全国性项目每年筛检约 60,000 份样本。某位运动员的样本出现了一种标志物，该标志物在干净参赛者的样本中约每 10,000 份出现 1 次，评审组主席表示这名运动员干净参赛的可能性是 10,000 分之 1。",
  "1 in 10,000 is how often clean samples show the marker, so about six clean athletes a year would show it; turning that into the chance of being clean also requires knowing how few competitors dope.":
    "10,000 分之 1 说的是干净样本出现该标志物的频率，所以每年约有六名干净运动员会出现它；要把它转成清白的概率，还需要知道有多少参赛者使用兴奋剂。",
  "A league moves its four lowest-ranked clubs down into the second tier. A ratings service recalculates the tier averages and finds the average club rating is now higher in both tiers than before the reshuffle. The commissioner calls it a sign that standards are rising everywhere.":
    "一个联赛把排名最低的四家俱乐部降入乙级。一家评级机构重算了两级的平均分，发现两级的俱乐部平均评分都比调整前更高。联盟主席称这说明整体水平都在提升。",
  "Those four clubs rated below the top tier's average and above the second tier's, so taking them out lifts one figure and adding them lifts the other, while no club plays any better than before.":
    "这四家俱乐部的评分低于甲级的平均值、高于乙级的平均值，所以把它们移出抬高了一个数字，把它们加入抬高了另一个，而没有哪家俱乐部踢得比以前更好。",
  "An insurer moves the safest quarter of its high-risk motor policies into its standard pool. The next report shows the average claim cost has risen in the high-risk pool and in the standard pool, and the underwriting director warns that both books are deteriorating.":
    "一家保险公司把高风险车险保单中最安全的四分之一转入标准保单池。下一期报告显示高风险池和标准池的平均赔付成本都上升了，核保总监警告说两本账都在恶化。",
  "The transferred policies cost less than the high-risk average and more than the standard average, so removing them raises one mean and adding them raises the other, with no driver's risk changed.":
    "被转出的保单成本低于高风险池的均值、高于标准池的均值，所以移出抬高了一个均值，加入抬高了另一个，而没有任何一位司机的风险发生变化。",
  "An armed service brings in a medical screen that catches minor problems the old one missed, and moves the personnel it flags from fully deployable to restricted duties. Average fitness scores then come out higher in both categories, and a spokesman credits the new training programme.":
    "某军种引入了一项能查出旧方法漏掉的轻微问题的体检筛检，并把被标记的人员从完全可派遣调整为限制勤务。随后两个类别的平均体能分都更高了，一位发言人把功劳归于新的训练计划。",
  "Those moved were the least fit of the deployable group and the fittest of the restricted group, so both averages rise on the reclassification alone, without anyone's fitness changing.":
    "被调整的人是可派遣组中体能最差的，也是限制勤务组中体能最好的，所以仅凭重新归类两个平均值就都上升了，而没有任何人的体能发生变化。",
  "A bank tightens the test that puts a loan on its watch list, so a batch of loans previously counted as performing moves across. The next figures show a higher average credit score in the performing book and in the watch list, and the risk committee reports improvement on both.":
    "一家银行收紧了把贷款列入观察名单的标准，于是一批原本算作正常的贷款被划了过去。下一期数据显示正常贷款账和观察名单的平均信用分都更高了，风险委员会报告两边都有改善。",
  "The moved loans were the weakest of the performing book and the strongest of the watch list, so both averages rise the moment they change column, with no borrower's position altered.":
    "被划过去的贷款是正常账中最弱的，也是观察名单中最强的，所以它们一换列两个平均值就都上升了，而没有任何借款人的处境发生变化。",
  "A depot fits a vibration sensor that picks up early wear, and engines it flags are shifted from the serviceable list to the overhaul list. The next report shows average hours between faults up on both lists, and the fleet manager credits a change of lubricant.":
    "一处车场装了能捕捉早期磨损的振动传感器，被标记的发动机从可用清单转入大修清单。下一期报告显示两份清单的平均故障间隔小时数都上升了，车队经理把功劳归于更换了润滑油。",
  "The flagged engines were the worst on the serviceable list and the best on the overhaul list, so removing them lifts one average and adding them lifts the other, with no engine actually wearing less.":
    "被标记的发动机是可用清单上最差的，也是大修清单上最好的，所以移出抬高了一个平均值，加入抬高了另一个，而没有哪台发动机实际上磨损更少。",
  "A sales director has a senior team averaging 50 sales a month and a junior team averaging 30. She moves two representatives who each average 40 from the senior team to the junior team. The next report shows both team averages have gone up, and she credits the reshuffle.":
    "一位销售总监手下的资深团队月均成交 50 单，初级团队月均 30 单。她把两名月均各 40 单的代表从资深团队调到初级团队。下一期报告显示两个团队的平均值都上升了，她把功劳归于这次调整。",
  "The two sell below the senior team's average and above the junior team's, so the senior mean climbs above 50 and the junior mean above 30 while nobody sells a single unit more.":
    "这两人的成交量低于资深团队的均值、高于初级团队的均值，所以资深团队的均值升到 50 以上，初级团队的均值升到 30 以上，而没有任何人多卖出一单。",
  "An exporter grades boxes as premium, averaging 90 points, or standard, averaging 70. It changes the cut-off so that boxes scoring 82, until now premium, count as standard. The next quality report shows the average score up in both grades, and the manager says the growers have improved.":
    "一家出口商把箱装货分为特级（平均 90 分）和普通级（平均 70 分）。它调整了分界线，使得原本算特级的 82 分箱子改算普通级。下一期质量报告显示两个等级的平均分都上升了，经理说种植户进步了。",
  "Boxes at 82 sat below the premium average of 90 and above the standard average of 70, so shifting them lifts both figures without a single box of fruit being any better.":
    "82 分的箱子低于特级的平均 90 分、高于普通级的平均 70 分，所以把它们挪过去抬高了两个数字，而没有任何一箱水果变得更好。",
  "A conservatoire moves its five weakest cellists out of the advanced class and into the intermediate class. At the end of term the average examination mark is higher in the advanced class and higher in the intermediate class, and the principal praises the new teaching plan.":
    "一所音乐学院把最弱的五名大提琴学生从高级班调入中级班。学期末高级班的平均考试分数更高了，中级班的平均分也更高了，院长称赞了新的教学方案。",
  "Those five scored below the advanced class average and above the intermediate class average, so taking them out raises one mean and adding them raises the other, whatever any student's playing does.":
    "这五人的分数低于高级班的均值、高于中级班的均值，所以把他们移出抬高了一个均值，加入抬高了另一个，与任何学生的演奏水平无关。",
  "A haulage firm fits vibration sensors that flag a failing gearbox about eight months before a driver would notice the noise. The log now shows an average of fourteen months from first fault report to breakdown, up from six. The firm's newsletter says the sensors are making gearboxes last far longer.":
    "一家货运公司装了振动传感器，能在司机听出异响前约八个月标记出即将损坏的变速箱。台账现在显示从首次故障报告到损坏平均为十四个月，此前是六个月。公司通讯称传感器让变速箱的寿命延长了许多。",
  "The breakdowns still happen when they always did; only the moment the fault entered the log moved earlier, so the measured gap from report to breakdown grew by exactly the warning the sensors bought.":
    "损坏发生的时间和以前一样；提前的只是故障进入台账的时刻，所以从报告到损坏的测量间隔，正好增加了传感器争取到的预警时间。",
  "A roads authority begins ultrasound surveys that reveal cracking in girders years before it becomes visible. Girders are still replaced at the same age as before, yet the average time from a crack being recorded to replacement has risen from four years to nine. The authority reports longer girder life.":
    "一家公路管理机构开始进行超声检测，能在裂纹肉眼可见前数年发现梁体开裂。梁体更换的年限和以前一样，但从记录到裂纹至更换的平均时间从四年升到了九年。该机构报告梁体寿命延长。",
  "Replacement happens at the same age it always did, so nothing about the girder changed. Recording the crack earlier simply lengthened the interval being measured.":
    "更换发生在和以往相同的年限上，所以梁体本身没有任何变化。更早记录裂纹只是拉长了被测量的那段间隔。",
  "A data centre switches on drive health alerts that fire well before a disk starts losing sectors. Disks are still retired at the same age, but the mean time from first alert to retirement has tripled. The operations page claims the alerts are extending disk life threefold.":
    "一家数据中心启用了硬盘健康告警，能在磁盘开始出现坏扇区之前很久就触发。磁盘退役的年限没变，但从首次告警到退役的平均时间增加到了原来的三倍。运维页面声称告警把磁盘寿命延长到了三倍。",
  "The retirement date did not move. Starting the count at an earlier alert stretches the measured interval without a single disk lasting longer.":
    "退役日期没有移动。把计时起点提前到更早的告警拉长了被测量的间隔，而没有任何一块磁盘用得更久。",
  "A phone maker adds a diagnostic that warns of battery decline far earlier than the old check did. Support records show the average time from first warning to replacement has doubled, and batteries are still replaced at the same age. Marketing says the diagnostic doubles battery life.":
    "一家手机厂商加入了一项诊断功能，比旧的检查早得多地对电池衰减发出警告。售后记录显示从首次警告到更换的平均时间翻了一倍，而电池仍在相同的使用年限被更换。市场部称该诊断把电池寿命延长了一倍。",
  "Batteries reach replacement at the same age as before; only the warning moved forward, so the interval from warning to replacement grew by the time gained in detecting decline.":
    "电池被更换的使用年限和以前一样；提前的只有警告，所以从警告到更换的间隔增加的正是提前发现衰减所争取到的时间。",
  "A grower adopts a leaf assay that identifies infected trees months before wilting appears. Records now show infected trees standing fifteen months after detection rather than five, and trees are still felled at the same age. The assay supplier's leaflet claims it keeps infected trees productive three times as long.":
    "一位种植户采用了一种叶片检测，能在枯萎出现前数月识别出染病的树。记录现在显示染病的树在检出后可存留十五个月而非五个月，而树木仍在相同的树龄被砍伐。检测供应商的宣传页声称它能让染病的树保持产出的时间延长到三倍。",
  "Felling happens at the same age, so no tree gained a day. The assay only started the clock earlier, which inflates the interval from detection to felling.":
    "砍伐发生在相同的树龄上，所以没有哪棵树多活一天。检测只是把计时起点提前了，这抬高了从检出到砍伐的间隔。",
  "A water utility installs acoustic monitoring that finds leaks long before they surface. Pipes are still dug up only when a leak reaches the road, yet the average time from logging a leak to the dig has risen from two months to eleven. The utility reports that leaking pipes now last far longer.":
    "一家自来水公司安装了声学监测，能在漏水冒出地面之前很久就发现它。只有当漏水渗到路面时才会开挖管道，但从记录漏点到开挖的平均时间已从两个月升到十一个月。该公司报告称漏水管道现在的使用寿命长了许多。",
  "The dig is still triggered by the same event at the same moment. Logging the leak nine months sooner adds nine months to the measured interval and nothing to the pipe.":
    "开挖仍由同一事件在同一时刻触发。把漏点提前九个月记录，给被测量的间隔加上了九个月，而给管道什么也没加。",
  "A memory service introduces a test that identifies a degenerative condition several years earlier than before. Patients still move into full time care at about the same age, but the average interval from diagnosis to that move has risen from four years to seven. A leaflet says the test delays dependence.":
    "一家记忆门诊引入了一项检查，能比以前提前数年识别出一种退行性疾病。患者转入全日照护的年龄大致不变，但从诊断到转入的平均间隔已从四年升到七年。一份宣传页称该检查推迟了失能。",
  "The move into full time care happens at the same age as before, so nothing was delayed. Diagnosing sooner simply lengthened the stretch of time counted after diagnosis.":
    "转入全日照护发生在和以前相同的年龄上，所以什么都没有被推迟。更早诊断只是拉长了诊断之后被计入的那段时间。",
  "Before a new imaging protocol, a clinic's patients were identified at an average age of 62 and died at 66. Since the protocol, they are identified at 59 and still die at 66. The annual report states that average survival after diagnosis has risen from four years to seven.":
    "在采用新的影像方案之前，某诊所的患者平均在 62 岁被发现，在 66 岁去世。采用方案之后，他们在 59 岁被发现，仍在 66 岁去世。年报称诊断后的平均生存期已从四年升到七年。",
  "The age at death is unchanged, so no patient gained time. Moving the moment of identification three years earlier adds three years to every measured interval.":
    "去世年龄没有变化，所以没有患者多获得时间。把发现的时刻提前三年，就给每一段被测量的间隔加上了三年。",
  "A detector is checked against obvious photocopied notes and crisp notes straight from the mint, and separates them almost perfectly. The maker advertises 99% accuracy. A bank buys it to sort well made counterfeits from worn, creased notes taken over the counter, and expects the same figure.":
    "一台验钞机用明显的复印假钞和刚从印钞厂出来的崭新钞票做测试，几乎完美地把两者分开。厂家宣传准确率为 99%。一家银行买来它，用于把做工精良的假钞与柜面收进的磨损起皱钞票区分开，并期待同样的数字。",
  "The advertised figure came from the crudest fakes set against the cleanest genuine notes. Where the fakes are skilled and the genuine notes are battered, the two groups overlap on exactly the features the detector reads.":
    "宣传的数字来自最粗劣的假钞与最干净的真钞的对比。当假钞做工精良而真钞破旧时，两组恰好在验钞机所读取的那些特征上相互重叠。",
  "A filter is benchmarked on bulk advertising full of misspellings and on a folder of ordinary personal mail, and scores 99.6%. A firm deploys it against carefully written impersonation attempts and against unusual but genuine messages from new suppliers, quoting the same score to its board.":
    "一款过滤器在满是拼写错误的群发广告和一批普通私人邮件上做基准测试，得分 99.6%。一家公司把它用于识别精心撰写的冒充邮件以及来自新供应商的少见但真实的邮件，并向董事会援引同样的分数。",
  "The benchmark asked the filter to separate the most obvious junk from the most obviously legitimate mail. Polished impersonations and odd but genuine supplier mail sit in the middle, where the filter was never measured.":
    "基准测试要求过滤器把最明显的垃圾邮件与最明显的正常邮件分开。打磨过的冒充邮件和少见但真实的供应商邮件位于中间地带，而过滤器从未在那里被测量过。",
  "A placement test was validated on absolute beginners and on near native speakers, and told them apart almost every time. A school now uses it to sort intermediate learners into three levels and cites the original accuracy figure in its prospectus.":
    "一项分班测试是在零基础学员和接近母语水平的人身上验证的，几乎每次都能把两者分开。一所学校现在用它把中级学员分成三个级别，并在招生简章中引用最初的准确率数字。",
  "The test was only ever asked to separate the two ends of the range, which almost any crude measure manages. Intermediate learners sit in the middle, where it was never shown to discriminate at all.":
    "这项测试被要求区分的只是两个极端，几乎任何粗糙的量度都能做到。中级学员位于中间，而它从未被证明在那里具有任何区分力。",
  "An inspection system was tuned on deliberately ruined test welds and on flawless reference welds, and caught 97% of the bad ones. On the production line, where flaws are hairline and sound welds carry cosmetic spatter, it catches far fewer. The plant keeps quoting 97% to customers.":
    "一套检测系统是在人为破坏的试验焊缝和完美的参照焊缝上调校的，查出了 97% 的不合格焊缝。在生产线上，缺陷是发丝般的细纹，合格焊缝带有影响外观的飞溅，它查出的要少得多。工厂仍继续向客户援引 97%。",
  "The 97% was measured on wrecked welds against pristine ones, a comparison with a wide gap. Real line output has faint flaws and untidy good welds, so the same thresholds separate much less.":
    "97% 是在破坏性焊缝与完好焊缝之间测得的，这是一个差距很大的对比。真实产线产出的是细微缺陷和外观不整洁的合格焊缝，所以同样的阈值区分力差得多。",
  "A tool that claims to tell machine written text from human writing was checked on raw machine output and on handwritten classroom essays, scoring 98%. A college applies it to lightly edited submissions and to careful work by students writing in a second language, and treats every flag as proof.":
    "一款声称能区分机器生成文本与人类写作的工具，在未经修改的机器输出和课堂手写作文上做了检验，得分 98%。一所学院把它用于经过轻微编辑的作业以及用第二语言认真写作的学生作品，并把每一次标记都当作证据。",
  "The 98% came from the most obvious machine output set against the most obviously human writing. Edited text and unusually careful second language prose sit between those extremes, where the tool's accuracy was never established.":
    "98% 来自最明显的机器输出与最明显的人类写作的对比。经过编辑的文本和格外工整的第二语言文章位于这两个极端之间，而该工具的准确率在那里从未被确立。",
  "A moisture meter was calibrated against soaking wet blocks and oven dried blocks, and told them apart every time. A surveyor now uses it on borderline walls where mild condensation and genuine structural damp look much alike, and reports the manufacturer's accuracy figure in his findings.":
    "一台水分仪是用浸透的砌块和烘干的砌块校准的，每次都能把两者分开。一位验房师现在把它用在难以判断的墙面上，那里轻微冷凝和真正的结构性受潮看起来很相似，他在报告中援引厂家的准确率数字。",
  "Calibration contrasted two extremes that any meter could tell apart. The walls the surveyor actually meets are neither soaked nor bone dry, so the readings that mattered in calibration barely differ here.":
    "校准对比的是任何仪器都能分开的两个极端。验房师实际遇到的墙面既不是浸透的也不是干透的，所以在校准中起决定作用的读数在这里几乎没有差别。",
  "An image classifier for a skin condition was built from textbook photographs of advanced lesions and clear photographs of normal skin, reporting 96% accuracy. A community clinic runs it on early lesions and on patients with eczema and insect bites, and quotes the same 96% to them.":
    "一款皮肤病图像分类器是用教科书上的晚期皮损照片和清晰的正常皮肤照片建立的，报告准确率为 96%。一家社区诊所把它用于早期皮损以及患有湿疹和蚊虫叮咬的患者，并向他们援引同样的 96%。",
  "The reported accuracy came from advanced textbook lesions against plainly normal skin. In the clinic the lesions are early and the comparison skin carries rashes and bites that mimic them, so the separation the figure rested on is gone.":
    "报告的准确率来自教科书上的晚期皮损与明显正常的皮肤的对比。在诊所里皮损是早期的，作为对照的皮肤带有与之相似的皮疹和叮咬痕迹，所以这个数字所依赖的区分度已经不复存在。",
  "A sideline test for head injury was validated on players with unmistakable symptoms and on rested players at the start of the season, sorting them almost perfectly. A club now applies it late in matches, to subtle knocks in tired and dehydrated players, quoting the same numbers.":
    "一项场边头部损伤测试是在症状明确的球员和赛季初休息充分的球员身上验证的，几乎完美地把两者分开。一家俱乐部现在把它用在比赛后段，用于疲劳脱水球员身上不明显的撞击，并援引同样的数字。",
  "Validation contrasted obvious injury with fresh, unaffected controls. Late in a match the injuries are subtle and the uninjured are fatigued, so both groups score alike on the very things the test measures.":
    "验证对比的是明显的损伤与状态良好、未受影响的对照。比赛后段损伤并不明显，未受伤者也已疲劳，所以两组在该测试所衡量的那些指标上得分相近。",
  "A firm interviews any applicant who scores highly on either the coding test or the communication exercise. Among the applicants who reach interview, the two scores move in opposite directions. The hiring manager concludes that people who are good with code tend to be poor with people.":
    "一家公司只要求职者在编程测试或沟通演练中任一项得分很高，就给予面试。在进入面试的求职者中，两项分数呈相反方向变动。招聘经理由此认为，代码好的人往往不擅长与人打交道。",
  "Reaching interview required a high score on one test or the other, so a weak communicator is there only because the coding score carried them, which produces the opposite pattern inside the interview pool while saying nothing about applicants in general.":
    "进入面试需要在两项测试中的一项拿到高分，所以沟通较弱的人能出现在这里，只是因为编程分数把他们带了进来，这在面试池内部产生了相反的模式，却说明不了求职者整体的情况。",
  "A conservatory offers places to musicians who are outstanding in either technical playing or expressive interpretation. Among those who take up a place, the strongest technicians consistently receive the lowest expression marks. A tutor writes that drilling technique appears to blunt musicality.":
    "一所音乐学院把名额给予在演奏技术或表现力诠释中任一项特别出色的音乐学生。在接受名额的学生中，技术最强的人在表现力上的分数始终最低。一位导师写道，苦练技术似乎会削弱乐感。",
  "A place required excellence on at least one of the two measures, so a student who is flat on expression must have been outstanding technically to get in, and the tradeoff exists only among those offered places.":
    "获得名额需要在两项标准中至少一项上表现优异，所以表现力平淡的学生必然是靠技术出众才进来的，这种此消彼长只存在于拿到名额的人当中。",
  "A repair shop sees a device only when the battery has failed or the screen has cracked. Its records show that devices with dead batteries have unusually intact screens. The owner writes a blog post arguing that battery wear somehow spares the glass.":
    "一家维修店只有在电池报废或屏幕破裂时才会见到设备。它的记录显示，电池报废的设备屏幕格外完好。店主写了一篇博客，主张电池损耗以某种方式保护了玻璃。",
  "A device reaches the shop if at least one of the two faults happened, so a battery failure gets a device in without any screen damage, leaving cracked screens rarer among battery cases than among devices as a whole.":
    "设备只要发生两种故障中的至少一种就会送到店里，所以电池故障能让一台屏幕毫发无损的设备进来，于是碎屏在电池故障的设备中比在全部设备中更少见。",
  "A city guide lists a restaurant only if it is unusually cheap or unusually good. A blogger works through the listings and finds that the pricier ones nearly always have the better food. He tells readers that in this city you really do get what you pay for.":
    "一本城市指南只收录特别便宜或特别好吃的餐厅。一位博主逐一试过收录名单，发现价格较贵的几乎都菜品更好。他告诉读者，在这座城市里确实是一分钱一分货。",
  "A restaurant earns a listing by being cheap or by being good, so any expensive one in the guide is there because the food is good, which links price to quality inside the guide even if the city's restaurants show no such link.":
    "一家餐厅靠便宜或靠好吃获得收录，所以指南里任何一家贵的餐厅都是因为菜品好才在其中，这在指南内部把价格和品质联系了起来，即便这座城市的餐厅整体上并无这种联系。",
  "A national squad picks players who are either exceptionally quick or exceptionally good at reading the game. Within the squad, the fastest players score lowest on the tactical assessment. The coaching staff decide that sprint work must be dulling game intelligence.":
    "一支国家队挑选的球员要么速度极快，要么对比赛的阅读能力极强。在队内，速度最快的球员在战术评估中得分最低。教练组认定，冲刺训练一定是削弱了比赛智商。",
  "A place needed one outstanding quality or the other, so a very quick player did not also need tactical strength to be picked, and the inverse pattern appears only among the players who were picked.":
    "入选需要具备其中一项突出素质，所以速度很快的球员不必同时具备战术能力也能被选上，这种反向模式只出现在被选上的球员当中。",
  "A funding panel awards money to proposals that have either a strong past record or a genuinely novel idea. Reviewing the funded projects five years later, an analyst finds the most novel ones came from the weakest records, and reports that experience seems to kill originality.":
    "一个资助评审组把经费给予要么以往成果扎实、要么想法确实新颖的申请。五年后回顾获资助的项目时，一位分析人员发现最新颖的项目来自以往成果最弱的申请人，并报告称经验似乎会扼杀原创性。",
  "Funding required strength on one criterion or the other, so a novel proposal did not also need a strong record to win money, and the tradeoff holds among funded projects rather than among everyone who applied.":
    "获得资助需要在两条标准中的一条上表现突出，所以新颖的申请不必同时有扎实的成果记录也能拿到钱，这种此消彼长成立于获资助的项目之中，而不是所有申请人之中。",
  "An insurer studies its motor claim file, which holds a case only when the vehicle was badly damaged or someone was hurt. In the file, badly damaged vehicles are less often linked to injuries. A memo suggests that heavier crash damage somehow protects the occupants.":
    "一家保险公司研究了它的车险理赔档案，档案只在车辆严重受损或有人受伤时才收录案件。在档案中，严重受损的车辆与人员受伤相关联的情况较少。一份备忘录提出，更重的碰撞损坏以某种方式保护了车内人员。",
  "A crash enters the file if it caused serious damage or an injury, so heavily damaged vehicles are recorded even with nobody hurt, while lightly damaged ones appear only when someone was injured.":
    "一起事故只要造成严重损坏或人员受伤就会进入档案，所以严重受损的车辆即使无人受伤也会被记录，而轻微受损的车辆只有在有人受伤时才会出现。",
  "A conference accepts a talk when the research is strikingly new or the speaker is a superb presenter. An attendee notices that the most original talks are the worst delivered, and posts afterwards that the polished speakers must be doing the shallowest work.":
    "一场会议在研究非常新颖或演讲者表达极佳时接受报告。一位与会者注意到最有原创性的报告讲得最差，会后发帖称表达娴熟的演讲者做的一定是最浅的研究。",
  "Acceptance needed novelty or delivery, so an original talk got on the programme without a polished speaker, and the tradeoff exists among accepted talks rather than among everything submitted.":
    "被接受需要新颖性或表达能力，所以有原创性的报告不必配上娴熟的演讲者也能进入日程，这种此消彼长存在于被接受的报告之中，而不是全部投稿之中。",
  "A motoring magazine reports that one gearbox is 40 percent more likely to fail in its first three years than the alternative. The maker's own figures show 7 failures per 10,000 cars against 5 per 10,000. Readers are advised to avoid the model.":
    "一本汽车杂志报道称，某款变速箱在前三年内损坏的可能性比另一款高 40%。厂家自己的数字是每 10,000 辆车 7 次损坏对每 10,000 辆 5 次。文章建议读者避开这款车。",
  "The gap is 2 extra failures per 10,000 cars, so 9,998 owners in 10,000 notice no difference at all, and the 40 percent describes a change to an already tiny number.":
    "差距是每 10,000 辆车多 2 次损坏，所以 10,000 名车主中有 9,998 名根本感觉不到差别，那 40% 描述的是一个本来就极小的数字的变化。",
  "A lottery app tells users that buying a second ticket doubles their chance of taking the jackpot, and pushes a two ticket bundle at checkout. A single ticket wins the jackpot about once in 14 million draws.":
    "一款彩票应用告诉用户，买第二张票会让中头奖的机会翻倍，并在结算时推销两张票的套餐。单张票中头奖的概率约为 1400 万分之一。",
  "Doubling moves the chance from about 1 in 14 million to about 2 in 14 million, an increase of roughly one chance in 14 million, which is why the proportional wording sounds far larger than the actual change.":
    "翻倍是把机会从约 1400 万分之 1 变成约 1400 万分之 2，增加了大约 1400 万分之一的机会，这就是为什么按比例的说法听起来远大于实际变化。",
  "An airline advertisement says its new fleet has cut a particular in flight fault by 60 percent. The maintenance log behind the claim shows the fault used to occur on about 5 flights per million and now occurs on about 2 per million.":
    "一则航空公司广告称，其新机队把某种飞行中的故障减少了 60%。这一说法背后的维修记录显示，该故障过去约每百万架次发生 5 次，现在约每百万架次 2 次。",
  "That is 3 fewer faults per million flights, so a passenger's chance was already about 1 in 200,000 before the new fleet arrived and the headline percentage sits on a very small starting number.":
    "这是每百万架次少 3 次故障，所以在新机队到来之前乘客遇到的概率就已经约为 200,000 分之 1，那个醒目的百分比建立在一个非常小的基数上。",
  "A bank advertises that its new account pays 50 percent more interest than the old one. The old account paid 0.2 percent a year and the new one pays 0.3 percent. A saver moves a 2,000 dollar balance across, expecting a noticeable difference.":
    "一家银行宣传其新账户的利息比旧账户高 50%。旧账户年利率 0.2%，新账户 0.3%。一位储户把 2,000 美元余额转了过去，期待有明显的差别。",
  "On 2,000 dollars the switch is worth 6 dollars a year instead of 4, a gain of 2 dollars, because 50 percent more of a very small rate is still a very small rate.":
    "在 2,000 美元上，这次转移意味着一年 6 美元而不是 4 美元，多了 2 美元，因为一个很小的利率再高 50% 仍然是一个很小的利率。",
  "A newspaper reports that eating a particular snack every day raises the chance of a rare bowel condition by 25 percent, and shoppers start avoiding it. The figures behind the story are 4 cases per 10,000 people over ten years among non eaters and 5 per 10,000 among daily eaters.":
    "一家报纸报道称，每天吃某种零食会使一种罕见肠道疾病的概率上升 25%，购物者开始避开它。报道背后的数字是：十年间不吃的人每 10,000 人有 4 例，每天吃的人每 10,000 人有 5 例。",
  "The difference is 1 extra case per 10,000 people across a decade, so 9,999 in 10,000 are unaffected either way and the 25 percent applies to an outcome that was already rare.":
    "差别是十年间每 10,000 人多 1 例，所以 10,000 人中有 9,999 人无论如何都不受影响，那 25% 针对的是一个本来就罕见的结局。",
  "A clinic leaflet says a daily tablet cuts the chance of a particular event over five years from 4 in 1,000 to 3 in 1,000, a reduction of a quarter. The leaflet adds that this means about one patient in four will be spared the event.":
    "一份诊所宣传页称，每天服一片药可把五年内发生某种事件的概率从 1,000 分之 4 降到 1,000 分之 3，降幅为四分之一。宣传页还写道，这意味着约每四名患者中就有一人免于该事件。",
  "Only 1 patient in 1,000 avoids the event, so about 1,000 people must take the tablet for five years for one to benefit; the quarter describes how much a small chance shrank, not the share of patients helped.":
    "只有 1,000 名患者中的 1 名避免了该事件，所以约需 1,000 人服药五年才有一人获益；四分之一描述的是一个很小的概率缩小了多少，而不是获益患者的比例。",
  "A factory's internal report gives the risk ratio for injuries after a new floor marking scheme as 0.47. The staff newsletter announces that the scheme has cut injuries by 47 percent, and the plant manager repeats that figure to the board.":
    "一家工厂的内部报告给出新地面标线方案实施后工伤的风险比为 0.47。员工通讯宣布该方案把工伤减少了 47%，厂长又把这个数字复述给董事会。",
  "A ratio of 0.47 means injuries fell to 47 percent of the old level, which is a fall of 53 percent, so the newsletter has reported the share that remains as though it were the share removed.":
    "0.47 的比值意味着工伤降到了原来水平的 47%，也就是下降了 53%，所以通讯把剩下的那部分当成了减少的那部分来报告。",
  "A home insurer tells customers that fitting a certain type of wood stove triples the chance of a fire claim, and raises those premiums by a third. Its own data show 1 claim per 10,000 insured homes a year without the stove and 3 per 10,000 with it.":
    "一家家庭财险公司告诉客户，安装某种柴炉会使火灾理赔的概率变为三倍，并把这些保单的保费提高三分之一。它自己的数据显示，没有柴炉的家庭每年每 10,000 户有 1 次理赔，有柴炉的每 10,000 户有 3 次。",
  "The extra chance is 2 fire claims per 10,000 homes a year, so 9,997 homes in 10,000 with the stove make no claim, and tripling something rare leaves it rare.":
    "多出来的概率是每年每 10,000 户多 2 次火灾理赔，所以装了柴炉的 10,000 户中有 9,997 户不会理赔，把罕见的事变为三倍后它仍然罕见。",
  "A school picks pupils for extra tutoring on the basis of which ones teachers judge most likely to fail. At the end of the year the tutored pupils score lower on average than the rest, and a governors' report calls the tutoring ineffective and recommends closing it.":
    "一所学校根据教师判断谁最可能不及格来挑选学生参加课外辅导。年末接受辅导的学生平均分低于其他学生，一份校董报告称辅导无效并建议停办。",
  "Teachers chose pupils for tutoring precisely because they were already heading for a poor result, so the tutored group started further behind and the tutoring is blamed for the reason it was offered.":
    "教师挑选学生参加辅导，正是因为他们本来就要考砸，所以受辅导组的起点更落后，辅导被怪罪的恰恰是它被提供的原因。",
  "A phone company calls customers its model flags as most likely to leave and offers them a discount. Over the next quarter those customers cancel more often than customers who got no call. The analysis concludes that retention calls push people out of the door.":
    "一家电话公司致电模型标记为最可能流失的客户并提供折扣。在接下来的一个季度里，这些客户的销号率高于没有接到电话的客户。分析得出结论说挽留电话把人推出了门。",
  "The call went only to customers already judged most likely to cancel, so the flag that triggered the call, not the call itself, explains their higher cancellation rate.":
    "电话只打给了已被判定最可能销号的客户，所以解释他们更高销号率的是触发这通电话的标记，而不是电话本身。",
  "A plant sends a machine for early servicing whenever an operator reports an unusual noise. An audit finds that machines serviced early broke down more often the following year than machines left alone, and recommends servicing less.":
    "只要操作工报告异响，工厂就把机器送去提前保养。一次审计发现，提前保养的机器在第二年的故障率高于未动过的机器，于是建议减少保养。",
  "The noise that prompted early servicing was itself a sign of a machine on its way to failing, so the servicing takes the blame for the condition that selected it.":
    "促成提前保养的异响本身就是机器正走向故障的迹象，所以保养替那个把它挑出来的状况背了锅。",
  "Places on a prison workshop scheme are limited, so staff give them to the inmates they judge most motivated and least likely to offend again. Two years on, scheme graduates have far lower reoffending, and the governor presents this as proof the scheme works.":
    "监狱作业培训项目名额有限，所以管教人员把名额给了他们认为最有动力、最不可能再犯的服刑人员。两年后，结业者的再犯率低得多，监狱长把这当作项目有效的证明。",
  "Staff selected participants using their own judgement of who would reoffend, which is the very outcome being measured, so the places went to the men already likely to do best.":
    "管教人员是凭自己对谁会再犯的判断来挑选参加者的，而再犯正是被测量的那个结局，所以名额给了本来就最可能表现最好的人。",
  "A bank rewrites the terms of a loan as soon as the account shows early signs of strain. A year later, rewritten loans have defaulted more often than the rest of the book, and the credit committee concludes that rewriting terms encourages default.":
    "只要账户出现早期紧张迹象，银行就重新约定贷款条款。一年后，重新约定条款的贷款违约率高于账上其余贷款，信贷委员会得出结论说重新约定条款会助长违约。",
  "The rewrite was triggered by warning signs that already predicted default, so the rewritten loans began from a worse position that the comparison never accounted for.":
    "重新约定是由已经预示违约的预警信号触发的，所以这些贷款的起点更差，而这个比较从未把这一点考虑进去。",
  "An employer assigns a senior mentor to the graduate recruits its managers rate as highest potential. Three years later the mentored recruits have been promoted twice as often as the others, and the internal newsletter credits the mentoring scheme.":
    "一家雇主为经理们评为潜力最高的应届录用者配备资深导师。三年后，有导师的录用者晋升的频率是其他人的两倍，内部通讯把功劳归于导师计划。",
  "Managers picked mentees on a judgement of who would rise fastest, so the mentored group was already on the quicker track before any mentoring happened.":
    "经理们是凭对谁会升得最快的判断来挑选学员的，所以在任何辅导发生之前，有导师的这组人就已经在更快的轨道上了。",
  "A care home moves residents to its specialist wing when staff judge that they are declining fastest. A quality review finds that residents in the specialist wing die sooner than those on ordinary floors, and questions whether the wing should stay open.":
    "当工作人员判断某些住户衰退最快时，养老院就把他们转到专护区。一次质量评审发现，专护区住户的去世时间早于普通楼层的住户，并质疑该区是否应继续开办。",
  "The move was decided by how fast a resident was already declining, and that decline, not the wing, drives the difference in how long they lived.":
    "转区是由住户已经衰退的速度决定的，造成生存时间差异的是这种衰退，而不是专护区。",
  "A clinic offers its intensive shoulder programme only to patients who can already raise the arm to shoulder height, since the exercises need it. Those patients regain full movement far more often than the rest, and the clinic advertises the programme as its most effective treatment.":
    "一家诊所只把强化肩部康复项目提供给已经能把手臂抬到肩高的患者，因为训练需要这个前提。这些患者恢复全部活动度的比例远高于其他人，诊所把该项目宣传为最有效的治疗。",
  "The entry rule handed the programme the patients whose shoulders were least damaged to begin with, so the people most likely to recover anyway are the ones being counted.":
    "准入规则把肩部损伤本来最轻的患者交给了这个项目，所以被计入的正是那些无论如何都最可能恢复的人。",
  "A fleet inspects every van once a year. Vans whose brake faults were picked up at inspection go on to have far fewer roadside breakdowns than vans whose faults turned up in between. The workshop manager concludes that the annual inspection catches the dangerous faults.":
    "一支车队每年对每辆厢式货车检验一次。在检验中查出刹车故障的车，此后路边抛锚的次数远少于在两次检验之间才暴露故障的车。车间主管由此认为年度检验抓住了危险故障。",
  "A yearly check can only find wear slow enough to still be half formed on the day the inspector calls; anything that goes from sound to broken inside a year declares itself between visits. The inspected group is therefore stacked with the gradual faults from the outset.":
    "一年一次的检查只能发现那些慢到在检验员上门那天还处于半成形状态的磨损；任何在一年之内从完好变为损坏的问题都会在两次检验之间自行暴露。因此被检出的那一组从一开始就堆满了渐进型故障。",
  "A card issuer reviews merchant accounts once a month. Accounts stopped by the review have cost the issuer far less on average than accounts reported by cardholders between reviews. The risk team reports that the monthly review is holding losses down.":
    "一家发卡机构每月审查一次商户账户。被审查叫停的账户给发卡机构造成的平均损失，远低于在两次审查之间由持卡人举报的账户。风险团队报告称月度审查把损失压了下去。",
  "A scheme that opens, drains and vanishes within days sits entirely between two reviews, so the review can only catch the slow, low value operations. Those were the cheaper ones before anyone intervened.":
    "一个几天之内开户、掏空、消失的骗局完全落在两次审查之间，所以审查只能抓到那些缓慢、金额较小的操作。这些操作在任何人介入之前就已经是损失较小的那类。",
  "A software team audits its codebase every quarter. Defects the audit finds are rated far less severe than those users report between audits. The engineering lead writes that auditing removes problems before they can turn serious.":
    "一个软件团队每季度审计一次代码库。审计发现的缺陷被评定的严重程度远低于用户在两次审计之间报告的缺陷。工程负责人写道，审计在问题变严重之前就把它们清除了。",
  "A defect that crashes the app is reported by a user within hours of shipping, long before the next quarterly pass, leaving the audit only the quiet long lived ones. Those were the mild defects already, not defects the audit made mild.":
    "会让应用崩溃的缺陷在发版后几小时内就被用户报告，远早于下一次季度审计，留给审计的只有那些不出声、长期存在的缺陷。这些本来就是轻微缺陷，而不是被审计变轻的缺陷。",
  "A housing association surveys each block once every five years. Defects found by the survey are almost always cosmetic, while the serious ones, a collapsed ceiling or a burst tank, arrive as emergency calls. The association reports that its survey programme keeps defects minor.":
    "一家住房协会每五年对每栋楼查勘一次。查勘发现的缺陷几乎都是外观问题，而严重的问题，比如天花板塌落或水箱爆裂，则以紧急报修的形式出现。协会报告称查勘计划使缺陷保持在轻微水平。",
  "A defect that takes years to develop is present, and still small, whichever year the surveyor happens to call. One that develops in a fortnight almost certainly falls between two surveys and comes in as an emergency instead.":
    "需要数年才形成的缺陷，无论查勘员哪一年上门都已存在且仍然很小。两周内就形成的缺陷几乎肯定落在两次查勘之间，转而以紧急报修的形式出现。",
  "A grid operator surveys its lines from the air twice a year. Faults seen on a survey are almost always minor, and the faults behind most outages had never appeared on one. The operator's report credits the surveys with keeping serious faults rare.":
    "一家电网运营商每年两次从空中巡查线路。巡查中看到的故障几乎都是轻微的，而造成多数停电的故障从未在巡查中出现过。运营商的报告把严重故障的稀少归功于巡查。",
  "Only damage that creeps along for months is still sitting there to be photographed when the aircraft passes. Damage that goes from intact to failed in a fortnight becomes an outage before any survey can see it, so the surveyed set is minor by construction.":
    "只有持续数月缓慢发展的损伤才会在飞机飞过时仍留在那里被拍到。两周内从完好变为失效的损伤在任何巡查看到它之前就已变成停电，所以被巡查到的那一组从构成上就是轻微的。",
  "A dental practice recalls its patients every eighteen months. Problems found at recall are nearly always fixable with a filling, while most extractions come from patients who telephone in pain between appointments. The practice tells patients that regular recall prevents extractions.":
    "一家牙科诊所每十八个月召回患者复查一次。复查发现的问题几乎都能靠补牙解决，而多数拔牙来自在两次预约之间因疼痛致电的患者。诊所告诉患者定期复查可以避免拔牙。",
  "Decay that creeps along for years is present, and still small, whenever the recall falls. A tooth that goes from sound to abscessed in three months announces itself before the next appointment, so the recall sees the slow problems and little else.":
    "持续数年缓慢发展的龋坏，无论复查落在什么时候都已存在且仍然很小。三个月内从完好变成脓肿的牙齿会在下次预约之前自行暴露，所以复查看到的几乎只有发展缓慢的问题。",
  "A large employer offers a lung scan every two years. Employees whose disease is found at a scan need much less urgent treatment than those who arrive breathless at the clinic between rounds. Occupational health reports that scanning catches disease while it is still controllable.":
    "一家大型雇主每两年提供一次肺部检查。在检查中被发现患病的员工，所需的紧急治疗远少于在两轮检查之间气促就诊的员工。职业健康部门报告称检查在疾病仍可控时就抓住了它。",
  "Disease that progresses over many years is detectable at whichever round comes along, while disease that goes from nothing to breathless inside two years surfaces between rounds. The scanned group is loaded with the milder illness before any treatment starts.":
    "历经多年进展的疾病在任何一轮检查中都能被检出，而两年之内从无到气促的疾病则在两轮之间浮现。在任何治疗开始之前，被检出的那一组就已装满了较轻的病例。",
  "A clinic lengthens its check up interval from one year to three. The cases it now picks up look milder on average than the ones it used to find, and the clinical lead takes this as evidence that the longer interval suits patients better.":
    "一家诊所把复查间隔从一年拉长到三年。它现在查出的病例平均看起来比以前查出的更轻，临床负责人把这当作更长的间隔更适合患者的证据。",
  "Stretching the gap gives fast moving disease more room to appear and declare itself between visits, so a larger share of what the check up still finds is the slow moving kind. The milder mix reflects what the interval now misses, not better care.":
    "拉长间隔给了进展快的疾病更多在两次就诊之间出现并暴露的余地，所以复查仍能查出的病例中，进展慢的那类占比更大。更轻的构成反映的是这个间隔现在漏掉了什么，而不是照护更好了。",
  "A company's product newsletter runs a write up whenever an experiment beats the current design. Teams whose tests showed no difference tend to move on without writing anything. A new joiner reads a year of newsletters and concludes that almost every idea here lifts sign ups.":
    "一家公司的产品通讯只要有实验胜过现行设计就会发一篇总结。测试没有差异的团队往往不写任何东西就转向下一件事。一位新入职者读了一年的通讯，得出结论说这里几乎每个想法都能提升注册量。",
  "Only the experiments that won were written up, so the newsletter records a small winning slice of the year's tests while the flat and losing ones never appeared anywhere the new joiner could read them.":
    "只有胜出的实验被写了出来，所以通讯记录的是这一年测试中胜出的一小部分，而持平和落败的那些从未出现在新入职者能读到的任何地方。",
  "A training provider's homepage carries fifteen graduate stories, each describing a good job within months of finishing. The stories came from graduates who answered a request for success stories. A prospective student reads them and concludes the course almost always leads to work.":
    "一家培训机构的主页上有十五则毕业生故事，每则都讲述结业后几个月内找到了好工作。这些故事来自响应征集成功案例的毕业生。一位准学员读完后得出结论说这门课程几乎总能带来工作。",
  "The page gathers only graduates who had a success to report, so those who finished the course and found nothing are missing from the evidence the student is weighing.":
    "这个页面只收集了有成功可讲的毕业生，所以那些读完课程却一无所获的人不在这位学员所权衡的证据之中。",
  "On a woodworking forum, members post photographs of finished cabinets, and the build threads run to hundreds of admiring replies. A newcomer reads twenty of them and decides the design is straightforward enough for a first project.":
    "在一个木工论坛上，会员们发布完工柜子的照片，制作帖下有数百条赞叹的回复。一位新人读了其中二十个帖子，认定这个设计足够简单，适合做第一个项目。",
  "Builds that were abandoned halfway never get a thread, so the forum shows the attempts that worked and gives no sign of how often the design defeated someone.":
    "半途放弃的制作根本不会有帖子，所以论坛展示的是成功的尝试，完全看不出这个设计有多少次让人做不下去。",
  "A software vendor's website hosts twelve customer case studies, each with a chart of improved results. The vendor decides which pilots to turn into case studies after seeing how they went. A buyer reads all twelve and signs a three year contract.":
    "一家软件供应商的网站上有十二个客户案例研究，每个都配有结果改善的图表。供应商是在看到试点进展如何之后，才决定把哪些试点做成案例研究的。一位采购读完全部十二个后签下了三年合同。",
  "The vendor wrote up only the pilots that turned out well, so the twelve studies are the flattering end of a larger set of pilots whose disappointing results were never put on the site.":
    "供应商只写了结果好的试点，所以这十二个案例是一批更大试点中好看的那一端，其中结果令人失望的从未放上网站。",
  "An allotment association's newsletter has carried enthusiastic reports of a plant feed for ten years. Members who noticed a big difference send in a report; members who noticed nothing rarely bother. The committee votes to buy the feed in bulk for every plot.":
    "一个市民农园协会的通讯十年来一直刊登关于某种植物肥的热情报告。注意到明显差别的会员会投稿；什么也没注意到的会员很少费这个事。委员会投票决定为每块地批量采购这种肥料。",
  "Only growers who saw an effect wrote in, so a decade of newsletters preserves the striking results and leaves out every plot where the feed changed nothing.":
    "只有看到效果的种植者投了稿，所以十年的通讯保存下来的是那些显眼的结果，而漏掉了每一块肥料毫无作用的地。",
  "A research group posts a blog each time a new network design beats the standard benchmark, and quietly shelves the runs that did not. A reader tallies such posts across several groups and writes that progress in the field is accelerating sharply.":
    "一个研究组每当有新的网络设计胜过标准基准就发一篇博客，没胜过的运行则悄悄搁置。一位读者统计了几个研究组的这类博客，写道该领域的进展正在急剧加速。",
  "Runs that failed to beat the benchmark were never posted, so the tally counts the successes drawn from far more attempts and reads a filtered record as though it were the rate of progress.":
    "没能胜过基准的运行从未被发出，所以这个统计数的是从多得多的尝试中挑出来的成功，把一份经过筛选的记录当成了进展的速度来读。",
  "Someone collects every published trial of a supplement and notices that the small trials report much larger benefits than the large ones. He averages all of them together and reports a clear overall benefit.":
    "有人收集了某种补充剂的全部已发表试验，注意到小型试验报告的获益远大于大型试验。他把所有试验平均在一起，报告了明确的总体获益。",
  "A small trial that found nothing is easy to leave unwritten, while a small trial that happened to land a striking result gets submitted, so the small studies on show are the lucky ones and averaging them pushes the estimate up.":
    "一项什么也没发现的小型试验很容易就不写了，而一项碰巧得出惊人结果的小型试验则会投稿，所以能看到的小型研究是走运的那些，把它们平均进去会把估计值往上推。",
  "A journal's guidance for authors says it looks for findings that are surprising and change how readers think. A student reviews ten years of its issues and concludes that effects in this field are usually large.":
    "一本期刊的作者须知写明它寻求令人意外、能改变读者想法的发现。一位学生梳理了它十年的各期，得出结论说这个领域的效应通常很大。",
  "The journal chose papers by how striking the result was, so modest and flat findings were turned away or never submitted, and the ten years the student read contain none of them.":
    "该期刊是按结果有多惊人来挑选论文的，所以温和的和无差异的发现被退稿或从未投稿，学生读的这十年里一篇也没有。",
  "A bank randomly gives half of its new savers an automatic top up feature and the rest a standard account. Its year end report compares average balances among savers still paying in after twelve months, and finds the feature far ahead.":
    "一家银行随机给一半新储户开通自动存入功能，其余人使用标准账户。年终报告比较了十二个月后仍在持续存钱的储户的平均余额，发现该功能遥遥领先。",
  "Whether someone was still paying in at twelve months was settled after the random split, and the feature itself affects who keeps going, so the sets compared are no longer the groups the allocation created.":
    "一个人在十二个月时是否仍在存钱，是在随机分组之后才定下来的，而这项功能本身会影响谁能坚持，所以被比较的集合已不再是分配所形成的那两组。",
  "Classes are randomly allocated to a new reading scheme or to the usual lessons. Twelve allocated classes never got the scheme running, so the evaluators move them into the comparison group, saying the figures should reflect what actually happened in the classroom.":
    "各班级被随机分配到新的阅读方案或常规课程。有十二个被分配的班级始终没有把方案开展起来，于是评估者把它们移入对照组，理由是数字应当反映课堂上实际发生的情况。",
  "Which classes failed to start was determined after allocation, probably by the schools least able to run anything new, so shifting them loads the comparison group with the weakest classes.":
    "哪些班级没能开展是在分配之后才决定的，很可能出在最没有能力开展新事物的学校，所以把它们挪过去让对照组装满了最弱的班级。",
  "An employer randomly assigns supervisors to a management course or to nothing. Anyone who changed department during the year is then left out of the analysis, in both groups alike, because the evaluator says their results would not be comparable.":
    "一家雇主把主管随机分配去上管理课程或不做任何安排。随后凡是在这一年中调换过部门的人都被排除在分析之外，两组一视同仁，理由是评估者认为他们的结果不可比。",
  "Department moves happened after the assignment, and the course itself can prompt or prevent them, so the filter removes a different sort of person from each group.":
    "调换部门发生在分配之后，而课程本身可能促成或阻止这种调动，所以这道筛选从两组中剔除的是不同类型的人。",
  "A council randomly assigns smokers to a quit programme or to a leaflet. The final report covers only those who turned up to the four week check, since the rest could not be verified. Attendance was 70% in the programme arm and 90% in the leaflet arm.":
    "一个市政机构把吸烟者随机分配到戒烟项目或一份宣传页。最终报告只覆盖了到场参加四周复查的人，因为其余人无法核实。项目组的到场率为 70%，宣传页组为 90%。",
  "Turning up to the check happened after assignment and at very different rates in the two arms, and the people likeliest to be missing from the programme arm are those who went back to smoking.":
    "到场复查发生在分配之后，两组的到场率差别很大，而项目组中最可能缺席的正是那些又抽起烟来的人。",
  "Farms are randomly allocated a new pest control routine or their usual one. Farms that sprayed late or missed a spray are dropped, and so are farms in the other group whose records had gaps. The routine comes out strongly ahead.":
    "各农场被随机分配采用新的病虫害防治方案或原有方案。喷药迟了或漏喷的农场被剔除，另一组中记录有缺口的农场也被剔除。新方案的结果大幅领先。",
  "Whether a farm followed the routine was decided after allocation and reflects how well it is run, so the best run farms in one group are being set against a differently filtered set in the other.":
    "一家农场是否遵守方案是在分配之后决定的，反映的是它经营得好不好，所以一组中经营最好的农场被拿去对比另一组中以不同方式筛选出的农场。",
  "An insurer randomly fits a driving feedback device to half of its new policies. Drivers who unplugged the device are dropped from that group, and drivers in the other group who bought one privately are dropped from theirs. The remaining comparison shows far fewer claims with the device.":
    "一家保险公司随机为一半新保单安装驾驶反馈设备。拔掉设备的司机被从该组剔除，另一组中自行购买了设备的司机也被从其组内剔除。余下的比较显示装了设备的理赔少得多。",
  "Unplugging a device and buying one privately both happened after the random split and mark out very different drivers, so what is left is two self selected sets rather than the groups the allocation made.":
    "拔掉设备和自行购买设备都发生在随机分组之后，且标记出的是非常不同的司机，所以剩下的是两个自我选择的集合，而不是分配所形成的两组。",
  "Travellers whose holiday went badly are asked what the brochure promised about the hotel, and their answers are set against those of travellers who enjoyed the same trip. The operator's complaints team treats the gap as evidence of mis-selling.":
    "度假体验糟糕的旅客被问及宣传册对酒店作了什么承诺，他们的回答与同一行程中玩得开心的旅客的回答作对比。旅行社的投诉团队把这个差距当作不当销售的证据。",
  "People whose holiday disappointed them have already been back over what they were told looking for a broken promise, while the satisfied travellers have never revisited the brochure.":
    "度假不如意的人已经把当初被告知的内容反复回想过，寻找哪里的承诺没有兑现，而满意的旅客从未重新翻看过宣传册。",
  "After a food company recalls a batch, buyers are phoned and asked whether anything seemed odd about the smell. Those who fell ill report an odd smell far more often, and the report concludes the smell was a reliable warning sign.":
    "一家食品公司召回某批次产品后，购买者接到电话，被问及气味是否有异样。生病的人报告气味异常的比例高得多，报告由此认定气味是可靠的预警信号。",
  "Buyers who got ill have replayed the meal hunting for something wrong with it, while those who felt fine had no reason to think about the smell at all.":
    "生病的购买者已经把那顿饭反复回想，搜寻哪里不对劲，而没事的人根本没有理由去想气味的事。",
  "A road safety survey asks drivers how fast they usually take a particular bend. Drivers who have crashed there give very different figures from drivers who have not, and the survey uses the gap to set a recommended limit.":
    "一项道路安全调查询问司机通常以多快的速度通过某个弯道。在那里出过事故的司机给出的数字与没出过事故的司机差别很大，调查用这个差距来设定建议限速。",
  "A driver who crashed at that bend has gone over the moment repeatedly and knows how it ended, so the speed now reported is reconstructed from the crash rather than independent of it.":
    "在那个弯道出过事故的司机已经反复回想过那一刻，并且知道结果如何，所以现在报告的速度是从事故重构出来的，而不是独立于事故的。",
  "A regulator asks customers who lost money on an investment what the salesperson said about the risk, and compares their accounts with those of satisfied customers who bought the same product from the same team.":
    "一家监管机构询问投资亏钱的客户，销售人员当时是怎么说风险的，并把他们的说法与从同一团队买了同一产品的满意客户的说法作比较。",
  "Customers sitting on a loss have gone back through the conversation looking for a reassurance that should never have been given, while satisfied customers have had no reason to replay it.":
    "手上有亏损的客户已经把那次谈话重新过了一遍，寻找当初本不该给出的保证，而满意的客户没有理由去重放它。",
  "Parents of pupils who failed their final exams are asked how much homework the school set three years earlier, alongside parents of pupils who passed. The parents of failing pupils report much less, and a campaign group blames the school.":
    "结业考试不及格学生的家长被问及三年前学校布置了多少作业，及格学生的家长也被问了同样的问题。不及格学生的家长报告的作业量少得多，一个维权团体因此指责学校。",
  "Parents whose children failed have been searching for an explanation ever since the results came out, so their account of past homework is produced by the outcome rather than measured independently of it.":
    "孩子不及格的家长自成绩公布起就一直在寻找解释，所以他们对过去作业量的说法是由结果产生的，而不是独立于结果测得的。",
  "After an outbreak of illness following a conference dinner, attendees are asked which dishes they ate. Those who fell ill much more often say they had the seafood, and the report names it as the source.":
    "一场会议晚宴后暴发疾病，与会者被问及吃了哪些菜。生病的人说自己吃了海鲜的比例高得多，报告因此认定海鲜是源头。",
  "Attendees who became ill have reconstructed the meal trying to work out what caused it, so they account for their plate far more thoroughly than guests who never thought about dinner again.":
    "生病的与会者已经把那顿饭重构了一遍，试图弄清是什么引起的，所以他们对自己盘中之物的交代远比那些再也没想过这顿晚宴的客人详尽。",
  "A company reports that staff who received its five year loyalty award go on to average eleven years with the firm, against three years for everyone else, counted from each person's start date. HR presents the award as proof that recognition keeps people.":
    "一家公司报告称，获得五年忠诚奖的员工此后在公司平均待满十一年，其他所有人为三年，均从每个人的入职日起算。人力资源部把这个奖项当作认可能留住人的证明。",
  "Receiving the award required staying five years, so anyone who left sooner cannot be in that group at all, and those five guaranteed years are counted into its average.":
    "获得该奖项需要待满五年，所以更早离职的人根本不可能出现在那一组里，而这五年是必然存在的，也被计入了它的平均值。",
  "A subscription service reports that customers who ever moved to its premium tier stay subscribed four times longer than customers who never did, measured from the day each one signed up. Marketing pushes the upgrade at new customers on the strength of it.":
    "一家订阅服务报告称，曾升级到高级档的客户的订阅时长是从未升级客户的四倍，均从各自注册当天起算。市场部据此向新客户力推升级。",
  "A customer had to still be subscribed in order to upgrade, so everyone who left early lands automatically in the other group, and the months before the upgrade are credited to premium.":
    "客户必须仍在订阅才能升级，所以每一个早早离开的人都自动落入另一组，而升级之前的那些月份被记在了高级档头上。",
  "A sports channel reports that clubs reaching the cup final went an average of nine weeks unbeaten in the competition, far better than clubs knocked out early, and puts it down to the finalists' training methods.":
    "一家体育频道报道称，打进杯赛决赛的俱乐部在该项赛事中平均保持九周不败，远好于早早出局的俱乐部，并把这归因于决赛队伍的训练方法。",
  "Reaching the final required winning every earlier round, so those weeks cannot contain a defeat for any club in that group; the unbeaten run is the entry condition rather than a result of training.":
    "进入决赛需要赢下此前的每一轮，所以对那一组中的任何俱乐部来说，那些周里都不可能有一场败仗；不败纪录是入选条件，而不是训练的结果。",
  "A delivery firm refurbishes each van at five years old. It reports that refurbished vans last on average four years longer than the rest of the fleet, measuring every van's life from the day it was bought, and orders more refurbishments.":
    "一家配送公司在每辆厢式货车满五年时进行翻新。它报告称翻新过的车比车队其余车辆平均多用四年，每辆车的寿命均从购车当天起算，并据此加订更多翻新。",
  "A van had to still be running at five years to be refurbished, so vans that failed before then can only be in the other group, and those first five years are credited to refurbishment.":
    "一辆车必须在五年时仍能运行才能被翻新，所以在那之前就报废的车只能落在另一组，而最初那五年被记在了翻新头上。",
  "A college reports that students who submitted the optional final year dissertation were far less likely to have left before graduating than students who did not, counted from enrolment, and proposes making the dissertation compulsory.":
    "一所学院报告称，提交了毕业年选修论文的学生在毕业前退学的可能性远低于未提交的学生，均从入学起算，并提议把论文改为必修。",
  "Submitting required still being enrolled in the final year, so every student who left earlier falls automatically into the other group and cannot count against the dissertation.":
    "提交论文需要在毕业年仍在学籍上，所以每一个更早退学的学生都自动落入另一组，不可能算在论文的账上。",
  "An insurer reports that drivers who earned its five year no claims discount average far fewer claims per year of cover than other drivers, counted from the day each policy began, and advertises the discount as something that makes people drive better.":
    "一家保险公司报告称，拿到五年无理赔折扣的司机每承保年的平均理赔次数远少于其他司机，均从各自保单生效当天起算，并把这项折扣宣传为能让人开车更好的东西。",
  "Earning the discount required five years without a claim, so those claim free years are built into the group by definition and any driver who crashed early could never appear in it.":
    "拿到该折扣需要五年无理赔，所以这些无理赔的年份按定义就内建在这一组里，任何早期出过事故的司机都不可能出现在其中。",
  "A firm reports that offers made by its retrained recruiters were accepted 71% of the time against 62% for the rest. The appendix tables show the retrained group ahead in every role family and at every seniority level.":
    "一家公司报告称，经过再培训的招聘人员发出的录用通知有 71% 被接受，其余人为 62%。附录表格显示，在每个岗位族和每个职级上，再培训组都领先。",
  "The headline gap points the same way as every published subgroup, so no mix of roles can be producing it; a hasty player would accuse the aggregate of hiding a reversal it has already ruled out.":
    "总体差距与公布的每一个亚组指向同一方向，所以不可能是岗位构成造出来的；性急的玩家会指责这个合计值掩盖了一处逆转，而它其实已经排除了这种可能。",
  "Two bus depots are compared on punctuality. Because one runs far more rural routes than the other, the report recalculates both depots using a single common mix of route types, and prints the mix it used.":
    "对两个公交车场的准点率进行比较。由于其中一个运营的乡村线路远多于另一个，报告用一套共同的线路类型构成对两个车场重新计算，并列出了所用的构成。",
  "Standardising both depots to one route mix removes the difference in case mix before comparing, which is exactly the correction a pooled figure needs; a hasty player would accuse it of lumping unlike routes together.":
    "把两个车场标准化到同一线路构成，在比较之前消除了构成上的差异，这正是合并数字所需要的校正；性急的玩家会指责它把不同的线路混为一谈。",
  "An online store sends each visitor at random to one of two checkout designs, and design B converts better overall. The report notes that the share of new and returning visitors came out almost identical in the two arms.":
    "一家网店把每位访客随机导向两种结算页设计之一，设计 B 的总体转化更好。报告指出，两组中新访客和回访者的占比几乎完全一致。",
  "With the visitor mix verified as the same in both arms, the pooled result is a weighted average using identical weights, so a reversal inside the segments is arithmetically impossible; a hasty player would demand the segments be split out.":
    "既然已核实两组的访客构成相同，合并结果就是用相同权重得到的加权平均，所以分段内部出现逆转在算术上不可能；性急的玩家会要求把分段拆开来看。",
  "A bank's model flags card transactions for review. Before quoting a figure to the fraud team, the analyst combines the flag rate with how often transactions in that category actually turn out to be fraudulent, and reports the share of flagged transactions that are genuine fraud.":
    "一家银行的模型标记出需要复核的刷卡交易。在向反欺诈团队给出数字之前，分析师把标记率与该类别交易实际为欺诈的频率结合起来，报告了被标记交易中真正属于欺诈的比例。",
  "The number quoted is the chance of fraud given a flag, worked out using how common fraud is, rather than the model's accuracy read backwards; a hasty player would accuse the team of confusing the two.":
    "给出的数字是被标记条件下属于欺诈的概率，是结合欺诈有多常见算出来的，而不是把模型准确率反过来读；性急的玩家会指责这个团队混淆了两者。",
  "A vision system catches nearly every cracked casting and wrongly marks about one sound casting in twenty. On this line roughly a third of castings really are cracked. The supervisor tells the crew a marked casting is probably cracked and sends marked ones for rework.":
    "一套视觉系统几乎能查出每一件有裂纹的铸件，并把约每二十件完好铸件中的一件错误标记。在这条产线上约三分之一的铸件确实有裂纹。班长告诉工人被标记的铸件很可能有裂纹，并把被标记的送去返工。",
  "With a third of castings genuinely cracked, marked parts are cracked around nine times in ten, so the condition needed for false alarms to swamp true ones is absent; a hasty player would object to accuracy being read as the chance of a crack.":
    "在三分之一的铸件确实有裂纹的情况下，被标记的零件约有十之有九确有裂纹，所以让误报压倒真阳性所需的条件并不存在；性急的玩家会反对把准确率读成有裂纹的概率。",
  "A text checker flags about 3% of original essays and nearly all copied ones. On a module where past audits found roughly one submission in five was copied, the tutor treats a flag as good reason to open an investigation rather than as proof.":
    "一款查重工具会标记约 3% 的原创论文和几乎全部抄袭论文。在一门以往审查发现约五分之一提交为抄袭的课程中，导师把标记当作展开调查的充分理由，而不是当作证据。",
  "Copying is common enough here that a flag makes it much more likely than not, and the conclusion drawn is only to investigate; a hasty player would accuse the tutor of reading the checker's accuracy as the chance of copying.":
    "抄袭在这里足够常见，因此一次标记让抄袭的可能性大大超过一半，而得出的结论只是去调查；性急的玩家会指责这位导师把查重工具的准确率读成了抄袭的概率。",
  "An online grocer picks half its customers at random to receive a free delivery voucher and holds the rest back. Over the next three months the voucher group spends more, and the company reports that the voucher raised spending.":
    "一家生鲜电商随机挑选一半客户发放免运费券，其余人不发。在接下来的三个月里，收到券的一组消费更多，公司报告称券提高了消费。",
  "Chance decided who got a voucher, so the difference cannot come from the sort of customer who would have sought one out; a hasty player would accuse the grocer of reading cause off an association.":
    "谁拿到券是由随机决定的，所以差异不可能来自那种会主动去找券的客户；性急的玩家会指责这家电商从关联中读出了因果。",
  "A council can afford to relight only twelve of its forty districts this year and draws the twelve by lot. Night collisions then fall in the relit districts over the following year and hold steady in the rest, and the council credits the lighting.":
    "一个市政机构今年只有能力为四十个片区中的十二个更换路灯，并以抽签方式选出这十二个。接下来的一年里，换灯片区的夜间碰撞事故下降，其余片区保持不变，市政机构把功劳归于照明。",
  "The lot decided which districts were treated, so the untouched districts are a fair comparison over the same period; a hasty player would dismiss it as a before and after story with no control.":
    "抽签决定了哪些片区被处理，所以未动过的片区在同一时期构成了公平的对照；性急的玩家会把它斥为一个没有对照的前后对比故事。",
  "A district notes that schools running more after school clubs have better attendance. Its report says the two go together, adds that clubs are commoner in better funded schools, and asks for a small trial before any wider rollout.":
    "一个学区注意到开设更多课后社团的学校出勤率更好。报告说两者同时出现，并补充说社团在经费更充足的学校更常见，同时要求在大范围推广之前先做一次小规模试验。",
  "The report stops at an association, names the obvious alternative explanation, and calls for an experiment instead of acting; a hasty player would accuse it of proposing a rollout on the strength of a pattern.":
    "报告止步于关联，点出了明显的替代解释，并呼吁做实验而不是直接行动；性急的玩家会指责它凭一个模式就提议推广。",
  "A fund publishes the average return across every company it backed in its first five years, including the fourteen that closed and the four sold at a loss, and states how each was valued.":
    "一只基金公布了它头五年投资的每一家公司的平均回报，包括倒闭的十四家和亏损出售的四家，并说明了每一家的估值方法。",
  "The failures sit in the denominator beside the successes, so the average is not computed from the companies that lasted; a hasty player would assume only the winners were counted.":
    "失败的项目与成功的项目一同位于分母之中，所以这个平均值不是从存活下来的公司算出来的；性急的玩家会以为只统计了赢家。",
  "A flying school reports what share of trainees reach a licence. The figure counts everyone who enrolled in a given year, including those who left partway through and those who failed the final check.":
    "一所飞行学校报告了学员中拿到执照的比例。这个数字统计了某一年入学的所有人，包括中途退出的和最终考核未通过的。",
  "The denominator is the entry cohort rather than the group who finished, so leavers cannot inflate the pass rate; a hasty player would assume the number came only from trainees still flying.":
    "分母是入学队列而不是完成学业的那一组，所以退出者无法抬高通过率；性急的玩家会以为这个数字只来自仍在飞的学员。",
  "A manufacturer reports pump faults per thousand units sold, taking faults from the warranty claim file and the denominator from the sales register rather than from the units brought into its workshops. This year's model comes out ahead of last year's on the same two sources.":
    "一家制造商报告每千台售出水泵的故障数，故障取自保修索赔档案，分母取自销售登记而不是送进其维修车间的台数。用同样这两个来源计算，今年的型号优于去年的。",
  "Every unit sold sits in the denominator, including those that never came back, so neither year's rate is computed only among the pumps that turned up for repair; a hasty player would assume the figures came from the workshop queue.":
    "每一台售出的水泵都在分母之中，包括那些从未返修的，所以两年的比率都不是只在送修的水泵中算出来的；性急的玩家会以为这些数字来自车间的排队记录。",
  "An examiner testifies that the tyre pattern from the scene appears on about one van in three hundred, and adds that with roughly nine hundred vans registered in the area, some three of them would carry the same pattern.":
    "一名鉴定人出庭作证说，现场的轮胎花纹约每三百辆厢式货车中出现在一辆上，并补充说该地区登记的厢式货车约有九百辆，其中约有三辆会带有同样的花纹。",
  "The rarity figure is turned into how many other vehicles would match, presenting the mark as narrowing the field rather than as a chance of innocence; a hasty player would expect the small number to be flipped into a probability of guilt.":
    "这个稀有度数字被换算成还有多少辆车会匹配，把痕迹呈现为缩小范围的线索而不是清白的概率；性急的玩家会预期这个小数字被翻转成有罪的概率。",
  "An auditor finds that one clerk's rounding pattern would arise by chance in about one month in five hundred. Noting that two hundred clerks were reviewed across twelve months, the auditor asks for a routine check of that ledger rather than a referral.":
    "一名审计员发现某位记账员的取整模式偶然出现的概率约为每五百个月一次。注意到共审查了两百名记账员十二个月的记录，该审计员要求对那本账簿做例行检查，而不是移送。",
  "Across 2,400 clerk months such a pattern is expected several times by chance, and the response is scaled to that; a hasty player would accuse the auditor of treating a rare coincidence as evidence of wrongdoing.":
    "在 2,400 个记账员月中，这种模式本就应当偶然出现好几次，应对措施的力度与此相称；性急的玩家会指责这位审计员把罕见的巧合当成了违规的证据。",
  "An investigator reports that this claim pattern is about forty times more likely when a claim is fraudulent than when it is honest. Since roughly one claim in a thousand is fraudulent, she puts the chance this one is fraudulent at about one in twenty five and opens a file.":
    "一名调查员报告称，这种索赔模式在欺诈索赔中出现的可能性约为在诚实索赔中的四十倍。由于约每一千件索赔中有一件属于欺诈，她把这一件属于欺诈的概率定为约二十五分之一，并立了案。",
  "The strength of the evidence is combined with how common fraud is, giving the chance of fraud given the pattern rather than the reverse; a hasty player would expect the forty fold figure itself to be quoted as the odds of guilt.":
    "证据的强度与欺诈有多常见结合在一起，给出的是出现该模式条件下属于欺诈的概率，而不是反过来；性急的玩家会预期那个四十倍的数字本身被当作有罪的几率来引用。",
  "A youth league keeps the same clubs in the same two divisions for two seasons running, with no promotions or relegations in between. Average match attendance rose in both divisions in the second season.":
    "一个青少年联赛连续两个赛季把同样的俱乐部留在同样的两个级别中，其间没有升降级。第二个赛季两个级别的场均观众人数都上升了。",
  "No club moved between divisions, so a rise in both cannot come from shuffling teams from one group into the other; a hasty player would suspect the categories had been rearranged between the seasons.":
    "没有俱乐部在级别之间移动，所以两边同时上升不可能来自把球队从一组挪到另一组；性急的玩家会怀疑两个赛季之间分类被重新排过。",
  "A council changed how it grades road defects in 2023. To compare repair times with 2019, it first re-graded every 2019 record under the current rules, then compared grade by grade.":
    "一个市政机构在 2023 年改变了道路缺陷的分级方式。为了与 2019 年的维修时长作比较，它先按现行规则对每一条 2019 年的记录重新分级，然后逐级比较。",
  "Both years are sorted by identical rules, so an improvement within a grade cannot be produced by defects sliding between grades; a hasty player would assume the new grading had quietly reshuffled the categories.":
    "两年都按相同的规则归类，所以某一等级内部的改善不可能由缺陷在等级之间滑动造成；性急的玩家会以为新的分级方式悄悄重排了类别。",
  "A rail operator fits sensors that pick up bearing wear months before a bearing would fail in service. In the two years after fitting, in service bearing failures per million miles run fell by about a third.":
    "一家铁路运营商加装了传感器，能在轴承运营中损坏之前数月捕捉到磨损。加装后的两年里，每百万运行英里的运营中轴承故障数下降了约三分之一。",
  "The measure is how often failures occur per mile, not how long the operator knew about a fault beforehand, so spotting problems earlier cannot by itself move the number; a hasty player would assume earlier detection was doing the work.":
    "这个指标衡量的是每英里发生故障的频率，而不是运营商事先知道故障多久，所以更早发现问题本身不能改变这个数字；性急的玩家会以为是更早检出在起作用。",
  "A team installs monitoring that alerts it to outages far sooner. Its quarterly report measures the time from the first affected customer request, taken from server logs, to full recovery, and shows that this fell after the tool went in.":
    "一个团队安装了能更早通知它服务中断的监控。其季度报告测量的是从服务器日志中取到的第一个受影响客户请求到完全恢复的时间，并显示这个时间在工具上线后下降了。",
  "The clock starts at the moment of impact rather than at detection, so learning of an outage earlier cannot stretch the measured interval; a hasty player would assume earlier alerts manufactured the improvement.":
    "计时从受影响的那一刻开始，而不是从发现开始，所以更早得知中断不会拉长被测量的间隔；性急的玩家会以为是更早的告警制造了这次改善。",
  "A lender builds a repayment risk model and tests it on applicants from the same branches, income range and loan sizes where it will be used. Accuracy is reported separately for applicants with long credit histories and for those with almost none.":
    "一家放贷机构建立了还款风险模型，并在它将被使用的同样网点、收入区间和贷款额度的申请人身上进行测试。准确率分别针对信用记录长的申请人和几乎没有信用记录的申请人报告。",
  "The test population matches the one the model will run on and performance is broken out by how hard the cases are, so a figure earned on an easier mix is not being carried across; a hasty player would assume it was validated on obvious cases.":
    "测试人群与模型将要运行的人群一致，性能还按案例难易程度分开列出，所以并没有把在较容易构成上得到的数字挪用过来；性急的玩家会以为它是在明显的案例上验证的。",
  "A soil test's published accuracy came from severely degraded plots. Before recommending it, a co-op ran the test again on ordinary member farms and quotes those second figures, not the original ones, in its guidance.":
    "一项土壤检测公布的准确率来自严重退化的地块。在推荐它之前，一家合作社在普通社员农场上重新做了这项检测，并在其指南中引用了第二次的数字，而不是最初的数字。",
  "The test was measured again in the ordinary fields where it will actually be used, so the easy contrast of the original setting is not passed off as everyday performance; a hasty player would attack the original validation.":
    "这项检测在它实际将被使用的普通田地里重新测量过，所以最初场景中那种容易的对比没有被冒充为日常表现；性急的玩家会攻击最初的验证。",
  "An inspection rig's detection rate was measured on cracks longer than two millimetres. The report says so plainly, notes that shorter cracks were not tested, and the plant uses the rig only as a check on the longer class.":
    "一台检测设备的检出率是在长度超过两毫米的裂纹上测得的。报告明确写明了这一点，并指出更短的裂纹未做测试，工厂只把该设备用于对较长那一类的检查。",
  "The stated accuracy stays tied to the crack sizes it was measured on and use is limited to that range, so it is never applied to a harder mix; a hasty player would accuse the plant of importing a number from an easy test set.":
    "所声明的准确率始终与测得它的裂纹尺寸绑定，使用也限于该范围，所以它从未被用到更难的构成上；性急的玩家会指责工厂从一个容易的测试集上搬来了一个数字。",
  "A firm asks whether its coding test score and its interview rating agree. Both are recorded for every applicant before any shortlist is drawn, and across all applicants the two rise together mildly.":
    "一家公司想知道它的编程测试分数和面试评分是否一致。在拟定任何入围名单之前，两项都对每位求职者作了记录，在全体求职者中两者呈轻度同向上升。",
  "The pair is measured on everyone who applied rather than only on those who cleared a bar that both scores helped set, so selection cannot manufacture the relationship; a hasty player would assume the sample had been filtered on both.":
    "这一对指标是在所有申请者身上测量的，而不是只在跨过了由两项分数共同决定的门槛的人身上，所以选择无法制造出这种关系；性急的玩家会以为样本是按两项指标筛选过的。",
  "A county register covering every resident, not only those who were admitted somewhere, reports that two conditions occur together a little more often than chance alone would give.":
    "一份覆盖全体居民而不仅是住过院的人的县级登记册报告称，两种疾病同时出现的频率略高于仅凭偶然应有的水平。",
  "The pattern comes from the whole resident population rather than from people filtered in by admission, so it is not an artefact of both conditions raising the odds of being in the sample; a hasty player would assume a hospital roster.":
    "这个模式来自全体居民人口，而不是经住院筛入的人群，所以它不是两种疾病都提高入样几率所造成的假象；性急的玩家会以为用的是医院名册。",
  "A safety body reports that the new helmet standard cut serious head injuries by about a quarter, and adds that in the riders studied this meant roughly 12 serious injuries per 10,000 a year falling to about 9.":
    "一家安全机构报告称，新的头盔标准把严重头部损伤减少了约四分之一，并补充说在所研究的骑手中，这意味着每年每 10,000 人约 12 例严重损伤降到约 9 例。",
  "The proportional figure is given with the counts it came from, so the size of the benefit cannot be inflated in the reader's head; a hasty player would object to the percentage before noticing the numbers behind it.":
    "比例数字与它所依据的计数一同给出，所以获益的大小不会在读者脑中被放大；性急的玩家会在注意到背后的数字之前就反对这个百分比。",
  "A vendor's brochure says its filter cuts successful phishing by about 60%, and states directly below that in the trial this was 12 staff in every 1,000 falling to about 5 over a year.":
    "一家供应商的宣传册称其过滤器把成功的钓鱼攻击减少了约 60%，并紧接着在下方写明，在试验中这相当于一年内每 1,000 名员工中受害人数从 12 名降到约 5 名。",
  "The relative claim is anchored to absolute numbers in the same place, letting the reader see how large the change really is; a hasty player would reject the headline percentage as unanchored marketing.":
    "相对说法在同一处被锚定到绝对数字上，让读者看清这个变化究竟有多大；性急的玩家会把这个醒目的百分比当作没有依托的营销话术加以否定。",
  "A drink maker's label gives the trial counts behind its claim, 14 cases of a stomach complaint among 5,000 users of the new formula against 18 among 5,000 of the old, and calls the difference small and not certain.":
    "一家饮料厂商在标签上给出了其说法背后的试验计数：新配方的 5,000 名使用者中出现 14 例胃部不适，旧配方的 5,000 名使用者中出现 18 例，并称这个差异很小且不确定。",
  "The counts are shown and the conclusion is scaled down to match them rather than being dressed up as a 22% reduction; a hasty player would expect a percentage to be doing the persuading.":
    "计数被展示了出来，结论也被调整到与之相称，而不是被包装成 22% 的降幅；性急的玩家会预期是某个百分比在做说服工作。",
  "Two painkillers are compared using patients who started one or the other for the same recorded complaint, at the same clinics, restricted to people who had taken neither before. Side effect rates come out similar.":
    "两种止痛药的比较使用的是在同样的诊所、因同样记录在案的症状开始服用其中一种的患者，并限定为此前两种都没用过的人。不良反应发生率结果相近。",
  "Comparing first time users of two drugs given for the same complaint means both groups were treated for the same reason, so the reason for prescribing is not what separates them; a hasty player would assume sicker patients got one of the drugs.":
    "比较因同一症状而首次使用两种药物的人，意味着两组接受治疗的理由相同，所以区分他们的不是开药的理由；性急的玩家会以为病情更重的患者拿到了其中一种药。",
  "More pupils apply for extra tutoring than a council can fund, so places are drawn by lot. The evaluation compares later grades between pupils who were drawn and pupils who applied but were not.":
    "申请课外辅导的学生多于市政机构能够资助的人数，所以名额以抽签决定。评估比较了抽中的学生与申请了但未抽中的学生此后的成绩。",
  "Everyone in both groups wanted the tutoring and only chance decided who received it, so the tutored pupils are not the ones judged to need it most; a hasty player would assume places went to those struggling hardest.":
    "两组中的每个人都想要辅导，谁得到辅导只由随机决定，所以受辅导的学生并不是被判定最需要辅导的那些；性急的玩家会以为名额给了最吃力的学生。",
  "A haulier puts a new engine oil in every truck whose fleet number ends in an even digit and keeps the rest on the old oil. After a year it compares breakdown rates between the two halves.":
    "一家货运公司给车队编号以偶数结尾的每一辆卡车换用新的发动机油，其余仍用旧油。一年后它比较了两半车辆的故障率。",
  "The last digit is arbitrary and has nothing to do with a truck's age or condition, so the treated trucks are not the ones a mechanic thought needed help; a hasty player would assume the worst trucks were picked for the new oil.":
    "末位数字是任意的，与卡车的车龄或状况无关，所以换油的卡车并不是修理工认为需要帮助的那些；性急的玩家会以为最差的卡车被挑去用新油。",
  "A region that began offering a regular check reports how many residents per 100,000 are found with advanced disease each year. That figure falls over the following decade while neighbouring regions stay flat.":
    "一个开始提供定期检查的地区报告了每年每 100,000 名居民中查出晚期疾病的人数。在随后的十年里这个数字下降，而邻近地区保持平稳。",
  "Fewer advanced cases arising in the whole population cannot be produced by a check that merely finds slow growing cases sooner; a hasty player would expect survival among detected cases to be the number on offer.":
    "整个人群中出现的晚期病例减少，不可能由一项仅仅更早发现进展缓慢病例的检查造成；性急的玩家会预期拿出来的数字是被检出病例的生存期。",
  "An analyst measuring how long support tickets stay open takes every ticket opened in a given month last year and follows each one to its closure, rather than looking at the tickets sitting in the queue today.":
    "一位分析师在测量支持工单保持开启的时长时，取的是去年某一个月开出的每一张工单，并跟踪每一张直到关闭，而不是查看今天积压在队列中的工单。",
  "Sampling by opening date gives quick and slow tickets the same chance of entering the sample, while a snapshot of the queue would be crowded with the ones that linger; a hasty player would assume the long cases dominate.":
    "按开单日期抽样让处理快的和处理慢的工单进入样本的机会相同，而队列快照会挤满那些迟迟不结的工单；性急的玩家会以为长期未结的案例占了主导。",
  "A national medicines agency reviews a treatment using every trial the maker was required to file with it, including three whose results were never written up anywhere, and pools them all.":
    "一家国家药品监管机构在评审一种治疗时，使用了厂商依规必须向其报送的每一项试验，包括三项结果从未在任何地方发表过的试验，并把它们全部合并。",
  "The pool is defined by what had to be filed rather than by what reached a journal, so dull results are still in it; a hasty player would assume the review was built from the literature.":
    "这个合并集合由必须报送的内容界定，而不是由发表到期刊上的内容界定，所以平淡的结果仍在其中；性急的玩家会以为这次评审是基于文献建立的。",
  "A product team's quarterly memo lists the outcome of all forty tests it ran that quarter, including the twenty seven that moved nothing, alongside the four whose results it acted on.":
    "一个产品团队的季度备忘录列出了它在该季度所做全部四十项测试的结果，既包括毫无变化的二十七项，也包括它据以采取行动的四项。",
  "Every experiment run is reported, so the ones that worked are read against the full set of attempts; a hasty player would assume only the wins were written up.":
    "每一项做过的实验都被报告了出来，所以奏效的那些是放在全部尝试的背景下来读的；性急的玩家会以为只有胜出的被写了出来。",
  "Before averaging fifteen field trials of a fertiliser, an analyst compares the small trials with the large ones and notes that the small ones landed below the overall average as often as above it.":
    "在把一种肥料的十五项田间试验平均之前，一位分析师把小型试验与大型试验作了比较，并指出小型试验落在总体平均值以下的次数与以上的次数一样多。",
  "The check for missing unfavourable small studies was made and came out clean, which is the very thing that would otherwise tilt the average; a hasty player would assume the small trials were the ones cherry picked.":
    "对是否缺失了不利的小型研究做了检查，结果没有问题，而这恰恰是原本会让平均值发生倾斜的因素；性急的玩家会以为小型试验是被挑拣出来的那些。",
  "A city offers a free three month transit pass to a randomly chosen half of newly registered residents. The evaluation compares car trips between everyone offered a pass and everyone not offered, including the third who never collected theirs.":
    "一座城市向随机选出的一半新登记居民提供三个月免费公交卡。评估比较了所有获赠公交卡的人与所有未获赠的人的开车出行次数，其中包括从未去领卡的那三分之一人。",
  "People are counted in the group they were offered, so those keen enough to collect a pass are not being measured against everybody else; a hasty player would want only the actual pass holders analysed.":
    "人们被计入他们被提供的那一组，所以并不是拿积极到会去领卡的人去和其他所有人比较；性急的玩家会希望只分析真正持卡的人。",
  "A jobs programme evaluation counts every applicant in the group chance assigned them to. For the twenty two who could not be traced at one year, it repeats the sums assuming first that all were unemployed and then that all were working, and the ranking holds either way.":
    "一项就业项目评估把每位申请人计入随机把他们分到的那一组。对于一年时无法联系上的二十二人，评估先假定他们全部失业、再假定他们全部在业各算了一遍，两种情况下排序都不变。",
  "Nobody is dropped for being untraceable, and the two extreme assumptions bracket anything the missing answers could have done; a hasty player would assume the untraced were quietly excluded.":
    "没有人因为联系不上而被剔除，两个极端假设把缺失回答可能造成的任何结果都框在了中间；性急的玩家会以为联系不上的人被悄悄排除了。",
  "A haulage study compares trucks that were fitted with a driver alert system when they were bought against trucks bought without one, counting each truck's mileage from the day it entered service.":
    "一项货运研究把购车时就装有驾驶员警示系统的卡车与购车时未装的卡车作比较，每辆卡车的里程均从投入运营当天起算。",
  "Which group a truck belongs to was settled before its clock started, so no truck has to survive a waiting period in order to count as equipped; a hasty player would assume the fitted trucks were credited with time before fitting.":
    "一辆卡车属于哪一组是在它开始计时之前就定下的，所以没有哪辆卡车必须熬过一段等待期才能算作装有系统；性急的玩家会以为装了系统的卡车被记上了安装前的时间。",
  "An employer compares staff who passed a certification with those who did not. Each person who passed is matched, at the moment of passing, to a colleague still employed at that point with the same months of service, and both are followed from then on.":
    "一家雇主把通过某项认证的员工与未通过的员工作比较。每一位通过者都在通过的那一刻，与一位当时仍在职、工龄月数相同的同事配对，两人从那时起被同步随访。",
  "Follow up starts when the certification is achieved and the matched colleague has already worked the same stretch, so the months spent studying are not credited to the certified group; a hasty player would assume that time was counted.":
    "随访从取得认证时开始，配对的同事也已经工作了同样长的一段时间，所以备考的那些月份没有被记在获证组头上；性急的玩家会以为那段时间被算了进去。",
  "A study of whether long commutes wear people down uses travel diaries that staff filled in each week through the year, well before anyone knew who would later resign.":
    "一项关于长通勤是否消耗人的研究，使用的是员工全年每周填写的出行日志，远早于任何人知道后来谁会辞职。",
  "The exposure was written down as it happened rather than reconstructed afterwards, so knowing the outcome cannot have coloured the answers; a hasty player would assume leavers were asked to look back.":
    "暴露是在发生时记录下来的，而不是事后重构的，所以知道结局不可能给回答染上颜色；性急的玩家会以为是让离职者回头追忆的。",
  "To ask whether a safety course reduces injuries, an analyst takes attendance from the course register and injuries from the insurer's claim file, matching the two by employee number. Nobody is asked to remember anything.":
    "为了考察安全课程是否减少工伤，一位分析师从课程签到册中取出勤记录，从保险公司的理赔档案中取工伤记录，按员工编号把两者匹配。没有人被要求回忆任何事情。",
  "Both the exposure and the outcome come from records written at the time, so no one's account of the course can be shaped by whether they were later hurt; a hasty player would assume the workers were interviewed.":
    "暴露和结局都来自当时写下的记录，所以没有人对课程的说法会被后来是否受伤所塑造；性急的玩家会以为是对工人做了访谈。",
  "Owners of a failed appliance and owners of a working one are asked when they bought it and how often they ran it. Their answers are then compared with till receipts and app usage logs, and the two groups' errors turn out to be the same size and in the same direction.":
    "家电已损坏的用户和家电仍正常的用户都被问及何时购买以及使用频率。随后他们的回答与收银小票和应用使用日志作了比对，两组的误差大小相同、方向也相同。",
  "The reported histories were checked against records and both groups misremembered equally, so the comparison is not driven by one group searching its memory harder; a hasty player would assume the aggrieved owners overstated their use.":
    "所报告的历史与记录作了核对，两组的记忆偏差相同，所以这个比较并非由某一组更用力地搜寻记忆所驱动；性急的玩家会以为受损失的用户夸大了自己的使用量。",

  // ---- intention to treat, recall bias, immortal time ----
  "Where every excluded patient had already relapsed":
    "被排除的患者，每一个都已经复发",
  "A trial compared two treatments for opioid dependence in 570 people. Counting only those who actually started the drug they were assigned, the first treatment looked slightly better: 52 percent relapsed against 56 percent. Counting everyone the coin assigned, it was clearly worse, 65 percent against 57 percent. The reason is the cleanest you will find. That first drug can only be started after a full detoxification, or it triggers immediate withdrawal, so 79 of its patients never managed to begin it, against 17 in the other arm. Every single one of those 79 relapsed. Dropping them removed the whole of the treatment's failure.":
    "一项试验在570人中比较了两种治疗阿片类药物依赖的方法。只统计真正开始服用所分配药物的人时，第一种治疗看起来略好一些：复发率52%对56%。统计所有被随机分配到的人时，它明显更差，65%对57%。原因再干净不过。第一种药只能在完成脱毒之后开始服用，否则会立即引发戒断，因此有79名患者始终没能开始服药，另一组则是17名。这79人无一例外全部复发。把他们剔除，等于把这种治疗的失败整个剔除了。",
  "Almost two thirds of the months people spent on this drug brought muscle pain. Is the drug doing it?":
    "人们服用这种药的月份里，将近三分之二出现了肌肉疼痛。是这种药造成的吗？",
  "152 people who had all had muscle trouble on a statin before took part. Each spent up to six two-month stretches on either atorvastatin or an identical dummy tablet, in a random order, without knowing which was which, and said at the end of each stretch whether they had muscle symptoms. Muscle symptoms were reported in 62.5 percent of the stretches on the drug.":
    "152名此前都曾在服用他汀时出现肌肉不适的人参加了试验。每人以随机顺序，最多经历六个为期两个月的阶段，分别服用阿托伐他汀或外观完全相同的安慰剂药片，本人并不知道是哪一种，并在每个阶段结束时说明自己有没有肌肉症状。在服药的阶段中，62.5%报告了肌肉症状。",
  "Is the statin causing the pain?":
    "是他汀造成了这些疼痛吗？",
  "Two-month stretches with muscle symptoms":
    "出现肌肉症状的两个月阶段",
  "Stretches on the statin":
    "服用他汀的阶段",
  "Stretches on the dummy tablet":
    "服用安慰剂药片的阶段",
  "Dummy":
    "安慰剂",
  "All stretches":
    "全部阶段",
  "On the drug":
    "服药期间",
  "Yes, the drug is causing it":
    "是的，就是这种药造成的",
  "two thirds of the time":
    "三分之二的阶段都如此",
  "No, the pain is not real":
    "不，这些疼痛不是真的",
  "they are imagining it":
    "是他们想象出来的",
  "The pain is real, and the drug is not causing it":
    "疼痛是真的，而造成它的不是这种药",
  "compare it with something":
    "需要一个对照来比较",
  "The dummy tablet did almost exactly the same thing.":
    "安慰剂药片的结果几乎一模一样。",
  "There was nothing in the other tablet":
    "另一种药片里什么都没有",
  "The same people, in the same months, taking a tablet with no drug in it, reported muscle symptoms 61.6 percent of the time. Nobody knew which tablet they were on. So the pain was there either way, and the 62.5 percent on the statin is almost entirely a rate of muscle pain in people who ache, not a rate of pain caused by the drug:":
    "同样这些人，在同样的月份里，服用不含药的片剂时，61.6%的阶段报告了肌肉症状。没有人知道自己吃的是哪一种。也就是说，两种情况下疼痛都在，而他汀的那个62.5%几乎完全是一群本就容易疼痛的人身上的肌肉疼痛发生率，不是这种药造成的疼痛的发生率：",
  "Both tablets":
    "两种药片",
  "That is what a control group is for, and why a rate on its own can never answer the question. Muscle pain is common. It is commoner still in people who have had it before, who are watching for it, and who have been handed a leaflet listing it. The only way to find out what the drug adds is to run the same months without it, which is what this trial did.":
    "对照组的用处正在于此，这也是单独一个发生率永远无法回答问题的原因。肌肉疼痛本来就常见。在那些以前有过、正在留意它、又拿到了列有这一条的说明书的人身上，就更常见。要弄清这种药本身增加了多少，唯一的办法是让同样的月份在没有它的情况下再走一遍，这项试验做的正是这件事。",
  "What the second bar is for":
    "第二根柱子的用处",
  "The nocebo effect":
    "反安慰剂效应",
  "A symptom that appears after you start a drug is not evidence the drug caused it, until you know how often the same symptom appears in people taking nothing.":
    "开始服药之后出现的症状，并不能证明是这种药造成的，除非你知道同样的症状在什么都没吃的人当中出现得有多频繁。",
  "Note carefully what this does not say. The pain is real: these people hurt, and were not pretending. Rare genuine statin muscle injury exists and is a different thing, diagnosed differently. Everyone here had already had muscle trouble on a statin, so this is a selected group rather than the general population. And the trial says nothing at all about whether statins do their job. What it settles is narrower and more useful: for this common complaint, the tablet and the dummy behaved the same.":
    "请仔细看清这里没有说什么。疼痛是真实的：这些人确实在痛，并没有假装。他汀确实存在罕见的真正肌肉损伤，那是另一回事，诊断方式也不同。这里的每个人此前都曾在服用他汀时出现肌肉不适，所以这是一个经过筛选的人群，而不是普通人群。而且这项试验完全没有说他汀是否有效。它确定下来的结论更窄，也更有用：对于这种常见的不适，药片和安慰剂表现相同。",
  "Expecting a side effect helps produce it, and being told to watch for one makes you notice sensations you would otherwise have let pass. That is the nocebo effect, the unhappy twin of the placebo effect, and it is not lying or weakness: attention genuinely changes what a body reports, and aches are ordinary enough that everyone has some to find. The reasoning trap around it is simpler than the psychology. Someone starts a drug, a symptom appears, and the two get joined up, because a story with a cause in it is easier to hold than a coincidence. The missing number is always the same one: how often does that symptom turn up in people who did not take the drug? Without it, a side-effect rate is not a measurement of the drug at all, it is a measurement of how common the symptom is in the kind of person who gets prescribed it. This is why blinding matters so much for anything a patient reports. Once someone knows they are on the drug, their symptom reports are partly about the drug and partly about knowing, and the two cannot be separated afterwards. The effect is large enough to reverse conclusions: in trials of the same drug, side-effect rates measured while nobody knew who was taking what are routinely far lower than the rates measured once everyone knows. None of which means a reported side effect should be waved away. It means the question of whether this is the drug gets answered by taking the drug away and putting it back, not by counting how many people on it have the symptom.":
    "预期会有某种副作用，本身就有助于让它出现；被叮嘱要留意某种感觉，你就会注意到那些原本会被放过去的感觉。这就是反安慰剂效应，安慰剂效应不讨喜的孪生兄弟，它既不是撒谎也不是软弱：注意力确实会改变身体所报告的内容，而酸痛又足够平常，人人身上都能找出一些。围绕它的推理陷阱比其中的心理机制简单。有人开始服药，一个症状出现了，两者就被连到了一起，因为一个带原因的故事比一次巧合更容易被记住。缺的那个数字永远是同一个：这种症状在没有服药的人当中出现得有多频繁？没有它，副作用发生率根本不是对这种药的测量，而是对这种症状在被开这类药的人群里有多常见的测量。这就是为什么对任何由患者自己报告的内容，盲法都如此重要。一旦有人知道自己在服药，他的症状报告就一部分来自药，一部分来自知道，事后再也分不开。这种影响大到足以颠倒结论：在同一种药的试验里，无人知晓谁服了什么时测得的副作用发生率，通常远低于所有人都知道之后测得的发生率。这一切都不意味着患者报告的副作用可以被随手打发掉。它的意思是，要回答这到底是不是药的问题，靠的是把药停掉再加回来，而不是数一数服药的人里有多少人有这个症状。",
  "The months with no tablet at all":
    "完全不吃药片的那些月份",
  "A companion trial went one better and added a third condition: months on the statin, months on an identical dummy, and months taking nothing whatsoever, all in a random order, with participants rating their symptoms every day. The months on the dummy tablet were nearly as bad as the months on the statin. The months with no tablet were far better than either. Most of the symptom burden, in other words, came from the act of taking a tablet rather than from what was in it, and half the participants restarted a statin afterwards.":
    "一项配套试验更进一步，加上了第三种情况：服他汀的月份、服外观相同的安慰剂药片的月份，以及什么都不吃的月份，全部随机排序，参与者每天为自己的症状打分。服安慰剂药片的月份几乎和服他汀的月份一样难受。什么都不吃的月份则比这两者都好得多。换句话说，大部分症状负担来自吃药片这个动作，而不是药片里的东西，事后有一半参与者重新开始服用他汀。",
  "The nocebo effect, a reasoning trap.":
    "反安慰剂效应，一个推理陷阱。",
  "You start a new tablet, and a week later your legs ache. The tablet did it, obviously. Except that aches are common, and expecting one helps you find it. In one trial, people took a statin for some months and an identical tablet with nothing in it for others, without knowing which. They reported muscle pain in 62.5 percent of the months on the drug, and 61.6 percent of the months on the dummy. The pain was real. The drug was not what was causing it. A side-effect rate with nothing to compare it against tells you how common the symptom is, not what the drug does.":
    "你开始吃一种新药片，一周后腿开始酸痛。显然是这药片干的。只是酸痛本来就常见，而预期它会来，本身就帮你把它找出来。在一项试验里，人们有些月份服他汀，有些月份服外观相同、里面什么都没有的药片，自己并不知道哪个是哪个。他们在服药的月份里62.5%报告了肌肉疼痛，在服安慰剂的月份里是61.6%。疼痛是真实的。造成它的不是这种药。一个没有对照可比的副作用发生率，告诉你的是这种症状有多常见，而不是这种药做了什么。",
  "The denominators are two-month treatment periods, not people: 152 participants each completed up to six blinded periods, three of atorvastatin 20 mg and three of matching placebo, so 785 periods come from 152 individuals. The paper's own column heading says participants, which is loose wording on its part, and the figures are presented here as periods because that is what they are. For the same reason the paper's odds ratio cannot be recomputed from these four numbers, since one person contributes several periods, so it is not quoted. A person-level figure is also printed: 18 of 200 randomised participants withdrew because of intolerable muscle symptoms while on atorvastatin, against 13 of 200 while on placebo. Participants were recruited precisely because they had had muscle symptoms on a statin before, so this is a selected group and its rates should not be read as rates in the general population.":
    "分母是为期两个月的治疗期，不是人：152名参与者每人最多完成六个盲法治疗期，其中三个服阿托伐他汀20 mg，三个服相匹配的安慰剂，所以785个治疗期来自152个人。原文自己的表头写的是参与者，那是原文用词不严谨，这里按治疗期呈现，因为它们本来就是治疗期。出于同样的原因，原文的比值比无法用这四个数字重新算出，因为一个人贡献了好几个治疗期，所以未予引用。文中也给出了以人为单位的数字：200名随机分组的参与者中，有18人因无法忍受的肌肉症状在服用阿托伐他汀期间退出，服用安慰剂期间则是200人中的13人。参与者正是因为此前服他汀时出现过肌肉症状才被招募，所以这是一个经过筛选的人群，其发生率不应当作普通人群的发生率来读。",
  "Six months after a wind farm opened, a campaign group posted leaflets asking residents to report headaches and poor sleep. Ninety of the 400 households replied describing such symptoms. The group states that the turbines are making the village ill and wants them switched off.":
    "一座风电场投运半年后，一个活动团体投放传单，请居民报告头痛和睡眠不佳。400户人家中有90户回复，描述了这类症状。该团体表示，涡轮机正在让这个村子生病，要求把它们关停。",
  "Nobody counted headaches and poor sleep in comparable villages with no turbines, where both are common anyway. A leaflet asking people to watch for particular symptoms also changes how many get noticed and reported.":
    "没有人在没有涡轮机的可比村庄里统计过头痛和睡眠不佳，而这两者在那里本来也很常见。一份请人们留意特定症状的传单，也会改变有多少症状被注意到、被报告。",
  "An office replaced its ventilation system and emailed staff that the airflow would feel different. A survey the following month found 38% reporting afternoon tiredness and dry throats. Facilities management concluded the new system was at fault and had it re-engineered.":
    "一间办公楼更换了通风系统，并发邮件告诉员工，气流的感觉会有所不同。第二个月的一项调查发现，38%的人报告下午犯困和喉咙发干。后勤管理部门认定新系统有问题，把它重新改造了一遍。",
  "The same question was never asked before the change, nor on the floors still running the old system, so there is nothing to say whether 38% is unusual for that building.":
    "改造之前从来没有问过同样的问题，仍在使用旧系统的楼层也没有问过，所以无从判断38%对这栋楼来说是不是反常。",
  "A student unplugs his hall's new wireless router at night and records that he sleeps better on the nights it is off. He tells friends, who try it and agree. The residents' committee asks for the router to be taken out.":
    "一名学生每晚拔掉宿舍楼新装的无线路由器，并记录到关掉它的那些夜里自己睡得更好。他告诉了朋友，朋友试过之后也同意。住户委员会要求把路由器拆走。",
  "He knew on every single night whether the router was on, so what he expected could shape both his sleep and how he rated it. The test needs nights where neither he nor whoever flipped the switch knew.":
    "每一个夜里他都知道路由器是开还是关，所以他所预期的东西既可能影响他的睡眠，也可能影响他给睡眠打的分。这个测试需要一些他和按开关的人都不知道的夜晚。",
  "A primary school was repainted over the holidays. In the first week back, 27 pupils were sent home feeling sick. A parents' meeting concluded that fumes from the paint were responsible and called for the classrooms to be stripped.":
    "一所小学在假期里重新刷了漆。开学第一周，有27名学生因为不舒服被送回家。一次家长会认定是油漆气味所致，要求把教室的漆全部铲掉。",
  "No one checked how many pupils are sent home sick in a normal first week back, or whether nearby schools with no new paint saw the same thing that week.":
    "没有人查过在平常的开学第一周有多少学生因不适被送回家，也没有查过那一周附近没有重新刷漆的学校是不是也这样。",
  "A retailer issued a new uniform. After a widely shared staff forum thread about the fabric being itchy, complaints of rashes went from a handful to several hundred in a fortnight. The retailer withdrew the uniform and apologised.":
    "一家零售商发放了新制服。一个说面料扎人的员工论坛帖被广泛转发之后，两周内皮疹投诉从零星几例增加到几百例。这家零售商撤回了制服并致歉。",
  "The itching is real, but the surge tracks the forum thread rather than the rollout, and rash rates were never compared with branches still wearing the old uniform, where skin complaints also occur.":
    "发痒是真实的，但投诉激增跟随的是那个论坛帖，而不是制服的发放，而且皮疹发生率从未与仍穿旧制服的门店比较过，那里同样会有皮肤方面的投诉。",
  "An app update's release notes warned that text might look slightly different. Tickets mentioning eye strain tripled that week. The team announced a rollback, tickets returned to normal, and the engineer wrote that the change had been straining users' eyes.":
    "某次应用更新的发布说明提醒，文字看起来可能会略有不同。那一周提到眼睛疲劳的工单增加到三倍。团队宣布回滚，工单回到正常水平，工程师写道，这次改动一直在让用户的眼睛疲劳。",
  "Users told to expect a visual difference went looking for one, and the rollback was announced just as loudly, so both the rise and the fall follow what people were told rather than any measured change on screen.":
    "被告知会看到视觉差异的用户就去找差异，而回滚也宣布得同样响亮，所以上升和回落跟随的都是别人告诉他们的话，而不是屏幕上任何测量到的变化。",
  "A taxi firm switched to electric cars and briefed drivers that the smooth one-pedal acceleration can make passengers queasy, asking them to note any complaints. Drivers logged sixty queasy passengers in a month. The firm concluded the cars cause travel sickness and reordered the old fleet.":
    "一家出租车公司换用电动车，并向司机说明，单踏板加速很平顺，可能让乘客反胃，请他们记下任何投诉。一个月里司机记录了60名反胃的乘客。公司认定这些车会引起晕车，重新订购了旧车队。",
  "Nobody ever logged queasy passengers in the old fleet, so sixty has nothing to be compared against, and drivers primed to expect complaints will hear and record more of them.":
    "旧车队里从来没有人记录过反胃的乘客，所以60这个数字没有任何可比对象，而被提前告知会有投诉的司机，会听到并记下更多投诉。",
  "A wellness programme tells participants that days two and three will bring headaches, irritability and aching as the body clears itself. Most report exactly that, then feel better. The organiser presents this as proof the programme is doing its work.":
    "一个养生项目告诉参与者，第二天和第三天身体在自我清理，会带来头痛、烦躁和酸痛。多数人报告的正是这些，之后感觉好转。主办方把这当作项目正在起作用的证明。",
  "Participants were told precisely which sensations to expect and on which days, and no comparison group followed an ordinary diet or an inert version of the plan. The pattern matches the prediction they were given.":
    "参与者被准确告知了会有哪些感觉、出现在哪几天，而且没有对照组按普通饮食或该方案的无效版本执行。出现的规律与他们收到的预告相符。",
  "During a trial's blinded year, muscle aches were reported by 14% on the tablet and 13% on the dummy. Everyone was then told what they had taken and offered the tablet openly; that year one in five reported aches. A patients' group says the harm only shows in real use.":
    "在一项试验设盲的那一年，服药片的人中14%报告肌肉酸痛，服安慰剂的人中是13%。随后所有人都被告知自己此前服的是什么，并可以公开服用该药片；那一年有五分之一的人报告酸痛。一个患者团体说，危害只有在真实使用中才显现。",
  "The only thing that changed between the two years is that everyone now knew what they were taking. While nobody knew, the ache rate was the same with the drug and without it.":
    "两年之间唯一变了的，是所有人现在都知道自己吃的是什么。在无人知晓的时候，服药和不服药的酸痛发生率是一样的。",
  "A pharmacy moved patients onto an equivalent tablet from a different maker, oval and yellow rather than round and white, sending a letter explaining the change. Reports of dizziness and nausea from those patients rose fivefold over two months, and a newsletter concluded the new version is poorly tolerated.":
    "一家药房把患者换成了另一家厂商的等效药片，椭圆的黄色而不是圆的白色，并寄信说明这次更换。两个月里这些患者报告的头晕和恶心增加到五倍，一份通讯得出结论说，新版本耐受性差。",
  "The letter drew attention to the change and gave everyday dizziness something new to be attributed to, and no one measured the rate over the same two months in patients kept on the original tablet.":
    "这封信把注意力引向了这次更换，也让日常的头晕有了一个新的可归因对象，而且没有人测量同样这两个月里继续服用原来药片的患者的发生率。",
  "A retailer had 200 volunteers wear a sleeve of the new cloth on one arm and the old cloth on the other for two weeks, without being told which was which. An assessor who did not know either graded photographs of both arms: visible redness on 31 new-cloth arms and 4 old-cloth arms.":
    "一家零售商让200名志愿者一只手臂戴新面料的袖套、另一只戴旧面料的袖套，持续两周，并且不告诉他们哪只是哪种。一名同样不知情的评估者为两只手臂的照片评级：31条戴新面料的手臂和4条戴旧面料的手臂出现可见发红。",
  "Every volunteer carried both fabrics at once without knowing which arm had which, and the redness was graded by someone equally unaware, so what anyone expected cannot account for the gap.":
    "每名志愿者同时带着两种面料，且不知道哪只手臂是哪一种，发红由同样不知情的人评级，所以任何人的预期都无法解释这个差距。",
  "A man's back pain began after a new mattress arrived. His partner swapped the old and new mattresses under identical covers on a schedule he never saw, three times across six weeks. His pain scores were high on every new-mattress stretch and low on every old-mattress stretch.":
    "一名男子的背痛在新床垫送到之后开始。他的伴侣按一份他从未见过的时间表，在相同的床罩下把新旧床垫互换，六周里换了三次。他在每一段新床垫的时期评分都高，在每一段旧床垫的时期评分都低。",
  "The mattress was removed and returned repeatedly while he had no way of knowing which one he was lying on, so his expectations could not have followed the pattern his pain followed.":
    "床垫被反复撤走又换回，而他无从知道自己躺的是哪一张，所以他的预期不可能跟着他的疼痛所走的规律走。",
  "A housing committee reviewing a new communal heating system logged 46 residents reporting headaches and dry eyes. Its report states that no similar block without the system was surveyed, that nobody knows how common these complaints were beforehand, and that it therefore cannot say the system is the cause.":
    "一个住户委员会在评估新的公共供暖系统时，记录了46名住户报告头痛和眼睛发干。它的报告写明：没有调查过没有该系统的类似楼栋，也没有人知道这些不适此前有多常见，因此无法断定该系统就是原因。",
  "The committee reports the count it actually has and stops there, because with no comparable block and no before figure a complaint total on its own supports no causal claim.":
    "委员会只报告了它实际掌握的计数，到此为止，因为在没有可比楼栋、也没有此前数字的情况下，单独一个投诉总数支撑不了任何因果结论。",
  "In a trial where neither patients nor their doctors knew who was getting what, dry mouth was reported by 44% of those on the drug and 6% of those on the dummy tablet. The report lists dry mouth as a side effect of the drug.":
    "在一项患者和医生都不知道谁拿到什么的试验中，服药的人里44%报告口干，服安慰剂药片的人里是6%。报告把口干列为这种药的副作用。",
  "Both groups were equally unaware of what they were taking and equally primed to watch for side effects, so the gap between 44% and 6% is what the drug itself added.":
    "两组同样不知道自己服的是什么，也同样被提示要留意副作用，所以44%和6%之间的差距，就是这种药本身增加的部分。",

  // ---- Non-differential misclassification (puzzle, review items, scope labels) ----
  "Mothers of babies born damaged recalled more drugs in pregnancy than their own records held. Is grief rewriting their memory?": "孩子出生时夭折或畸形的母亲，回忆起孕期服用的药物比自己当时的记录还多。是悲伤在改写她们的记忆吗？",
  "Two matched groups of 203 Finnish mothers were asked after delivery which drugs they had taken in early pregnancy. Some named drugs that nothing in their pregnancy record supported.": "两组经过匹配、各有203名芬兰母亲的样本，在分娩后被问及孕早期服用过哪些药物。有些人提到的药物，在她们的孕期记录里完全没有依据。",
  "What is going on here?": "这里到底是怎么回事？",
  "Drugs named after delivery with no earlier record": "分娩后才提到、此前并无记录的药物",
  "Asked in month five, before anyone knew the outcome": "第五个月时的询问，那时结局还未知",
  "Asked again after delivery, same form, same midwife": "分娩后的再次询问，同样的表格，同样的助产士",
  "Repeated identically": "原样复述",
  "Not repeated": "未获复述",
  "Named only afterwards": "仅事后提及",
  "took a drug in early pregnancy": "孕早期服用过药物",
  "Healthy child": "健康婴儿",
  "Death or malformation": "夭折或畸形",
  "A mother searching for a reason digs harder and remembers more": "急于寻找原因的母亲，回忆得更用力，也就记起了更多",
  "The drugs really were taken more often": "这些药物确实被服用得更频繁",
  "The extra reports are true, and the records are incomplete": "这些额外的报告是真的，是记录不完整",
  "Memory is this bad in both groups": "两组的记忆都同样糟糕",
  "Error in every direction, at roughly the same rate": "误差各个方向都有，两组的比例也大致相同",
  "Both groups had already forgotten most of what they told the same midwife months earlier.": "两组母亲都已经忘记了她们几个月前告诉同一位助产士的大部分内容。",
  "Error that does not take sides": "不偏不倚的误差",
  "Mothers of healthy babies repeated just 33 of their own 182 earlier reports. Mothers of damaged babies repeated 23 of 187. Both groups lost around 85 percent of what they themselves had said, and both added drugs that were never recorded. The authors tested it and found no significant difference between the groups in the share of replies that failed to match.": "健康婴儿的母亲，在自己此前182条报告里，只有33条被原样复述。患儿的母亲则是187条里复述了23条。两组都丢失了自己此前所说内容中大约85%的部分，也都添加了从未被记录过的药物。作者做了检验，发现两组之间在“回答不吻合”的比例上并无显著差异。",
  "So the extra reports in the second group are not memory bending toward an explanation. They are the same broken recall that both groups show, and the difference between 57 and 41 sits inside the noise that unreliability of this size produces. When error hits both groups alike, it does not manufacture an association. It smears the exposed and unexposed into each other, which drags any real difference toward no difference at all.": "所以第二组里那些额外的报告，并不是记忆为了凑出一个解释而发生的扭曲。它们只是两组共有的那种失灵的回忆，57和41之间的差距，就落在这种规模的不可靠性所产生的噪音范围之内。当误差同等地落在两组身上时，它不会制造出关联。它会把暴露组和非暴露组彼此混同，把任何真实的差异都拉向毫无差异。",
  "What the earlier answers show": "早先的回答说明了什么",
  "Non-differential misclassification": "无差异性错误分类",
  "When a measurement is equally wrong in every group, it does not invent an effect. It hides one. The usual result is a real association flattened toward nothing, so a null finding from a badly measured exposure is not evidence of no effect.": "当一项测量在各组中都同等程度地出错时，它不会凭空造出一种效应，而是会把真实的效应藏起来。通常的结果是：一个真实的关联被拉平、趋向于零，所以一次因暴露测量拙劣而得出的无效结果，并不能证明真的没有效应。",
  "Ask two questions of any measurement, not one. First, is the error different between the groups? That is the bias everyone is taught to look for. Second, and far more often the answer, is the error simply enormous in all of them? That one is rarely mentioned, is much more common, and pushes findings toward the null, which means it quietly protects wrong beliefs from being disproved.": "对任何一项测量，都要问两个问题，而不是一个。第一，误差在各组之间是否不同？这是人人都被教导要提防的那种偏倚。第二，而且答案往往更常是这一个：误差是不是在所有组里都同样巨大？这一种很少被人提起，却远比第一种常见，它会把结果推向无效，也就悄悄地保护了错误的信念不被推翻。",
  "Picture an exposure that truly doubles risk. Now measure it with a method that gets it right only a fifth of the time, in exposed and unexposed alike. Many genuinely exposed people are filed as unexposed and the reverse, so the two groups you end up comparing are both mixtures of the real ones. Mixtures differ less than their ingredients, so the measured ratio slides toward 1. Push the error far enough and a real effect disappears entirely. That is why this paper's headline finding is not that mothers were biased, but that a retrospective interview about early pregnancy is close to unusable as a measurement, whoever is answering.": "设想一种暴露真的会让风险加倍。现在用一种方法去测量它，这种方法在暴露组和非暴露组里都只有五分之一的机会测对。许多真正暴露的人被归入了非暴露一栏，反过来也一样，于是你最终比较的两组，其实都是真实两组的混合物。混合物之间的差异，总是小于各自成分之间的差异，所以测得的比值会滑向1。把误差推得足够大，一个真实的效应就会彻底消失。这正是这篇论文最重要的发现：不是母亲们存在偏倚，而是关于孕早期的回顾性访谈，无论由谁来回答，作为一种测量手段都几乎不堪使用。",
  "The largest test of this, and it found no bias either": "对此规模最大的一次检验，同样没有发现偏倚",
  "The United Kingdom Childhood Cancer Study compared what 1,624 case mothers and 2,524 control mothers reported against their own general-practice records. Differential recall, the effect everyone expects, was essentially absent. It is worth knowing that the bias people reach for first is often not the one present.": "英国儿童癌症研究将1,624名病例组母亲和2,524名对照组母亲的回答，与她们各自的全科医生记录作了比较。差异性回忆，也就是人人都预期会出现的那种效应，基本上并不存在。值得记住的是：人们第一个想到的偏倚，往往并不是实际存在的那一个。",
  "Non-differential misclassification, a reasoning trap.": "无差异性错误分类，一个推理陷阱。",
  "If a measurement is wrong in the same way for everybody, it does not create a fake result. It buries a real one. Bad measurement makes things look like they do not matter.": "如果一项测量对每个人都以同样的方式出错，它不会制造出一个虚假的结果，而是会把一个真实的结果埋起来。糟糕的测量，会让本来重要的东西看起来毫不相干。",
  "Everyone says recall bias. The real answer is worse.": "人人都说是回忆偏倚。真正的答案更糟。",
  "I confidently diagnosed recall bias. It was not recall bias.": "我信心满满地诊断为回忆偏倚。结果并不是回忆偏倚。",
  "Every count is printed in Table 1 and reconciles three ways: the prospective rows sum to the totals the authors state in prose (34 + 43 = 77 diseases, 182 + 187 = 369 drugs), the two additional-information cells sum to 98, which Figure 1 prints separately, and 98 of the 154 positive retrospective drug replies lacking any prospective history is the approximately two thirds the authors report. Two honesty notes. The additional reports are numerically higher in the damaged-child group, 57 against 41; what the paper establishes is that the difference in the share of non-identical replies was not statistically significant on 203 mothers per group, not that the two groups were identical. And Figure 1 counts individual drug replies (420 of them) while Table 1 counts mothers (369), so the two sets of numbers are never mixed here. The reference standard for the earlier answers is the maternity welfare centre record and the mothers' own month-five interview, not an independent audit.": "每一个数字都印在表1中，并以三种方式相互印证：前瞻性各行相加，等于作者在正文中所说的总数（34 + 43 = 77种疾病，182 + 187 = 369种药物）；两个“额外信息”单元格相加为98，这一数字图1中单独印出；而在154条缺乏任何前瞻性记录支持的阳性回顾性用药回答中，98条约合作者所说的三分之二。这里有两点诚实说明。额外报告在患儿组的数量上确实更高，57对41；但论文确立的是：在每组203名母亲的样本下，“回答不一致”比例上的这一差异并未达到统计学显著性，而不是说两组完全相同。另外，图1统计的是单条药物回答（共420条），表1统计的是母亲人数（369人），本文从未把这两套数字混用。早先回答所对照的基准，是产科福利中心的记录和母亲们自己在第五个月所做的访谈，而不是一次独立的核查。",
  "A large study estimates each person's salt intake from a single question about how often they add table salt, then finds almost no link between salt and blood pressure. The authors conclude that salt does not affect blood pressure.": "一项大型研究通过一个单一问题，也就是询问加餐桌盐的频率，来估计每个人的盐摄入量，结果发现盐与血压之间几乎没有关联。作者据此得出结论：盐并不影响血压。",
  "A one-question estimate gets almost everyone's real salt intake wrong, and wrong in every direction rather than by group. Blurring the heavy and light salters together makes them look alike, which pushes any true link toward zero and can bury it.": "一个问题得出的估计，几乎让每个人的真实盐摄入量都出了错，而且各个方向都有偏差，并不按组别偏向哪一边。把重口味和轻口味的人混在一起，会让他们看起来彼此相似，从而把任何真实的关联都推向零，并可能将其掩盖。",
  "To study a factory solvent, researchers mark workers as exposed or not purely by job title, though people with the same title handle very different amounts. They find no excess disease in the exposed group and report the solvent as safe.": "为了研究一种工厂溶剂，研究者仅凭职位名称把工人标记为暴露或非暴露，尽管职位相同的人接触的量可能相差很大。他们发现暴露组并没有额外的疾病，于是报告称这种溶剂是安全的。",
  "Sorting by job title puts many truly exposed workers in the unexposed column and the reverse, roughly evenly. When each compared group is a mixture of the real ones, their disease rates move together, so a genuine hazard is watered down toward no difference.": "按职位名称分类，会把许多真正暴露的工人归入非暴露一栏，反过来也一样，而且大致均衡。当被比较的每一组都是真实两组的混合体时，它们的患病率就会趋于一致，于是一个真实存在的危害就被稀释到看不出差异。",
  "A study tracks activity with a cheap clip-on counter that miscounts steps erratically for everyone, and finds no relationship between daily steps and weight change over a year. A columnist writes that step counts do not matter.": "一项研究用一款廉价的夹式计步器来追踪活动量，这款计步器对每个人的步数都计错，且错得毫无规律，结果发现每日步数与一年内的体重变化之间没有关系。一位专栏作者写道，步数并不重要。",
  "A counter unreliable for every wearer scrambles the active and the inactive together. Noise spread evenly across the whole sample drags a correlation toward zero, so the missing relationship may be the instrument rather than the activity.": "一款对每个佩戴者都不可靠的计步器，会把活跃的人和不活跃的人搅在一起。均匀分布在整个样本中的噪音，会把相关性拉向零，所以缺失的关系，可能出在仪器身上，而不是出在活动本身。",
  "An asthma study assigns each child the average air pollution of their postcode, though levels vary sharply from street to street. The link with asthma comes out weak, and a summary says local air quality has little effect.": "一项哮喘研究把每个孩子所在邮政编码区域的平均空气污染水平分配给该儿童，尽管污染程度在街与街之间差异很大。得出的与哮喘的关联很弱，一份总结称本地空气质量影响不大。",
  "A postcode average is wrong for most individual children, and wrong in both directions rather than by who is ill. Measuring exposure this bluntly blends the high and low together and flattens a real gradient toward nothing.": "邮政编码区域的平均值，对大多数个体儿童来说都是错的，而且两个方向上都会出错，并不按谁患病来偏向哪一边。用这么粗糙的方式测量暴露，会把高暴露和低暴露混在一起，把一个真实的梯度拉平到几乎消失。",
  "Two overworked assessors grade a tissue feature from slides, making frequent slips that are just as likely for patients with the disease as for those without. The feature turns out only weakly linked to the disease, and a report calls it unimportant.": "两位超负荷工作的评估者根据切片给一项组织特征打分，经常出现失误，而这些失误对患病者和未患病者同样可能发生。这项特征最终只与疾病表现出微弱的关联，一份报告称它并不重要。",
  "Errors falling equally on cases and controls are non-differential. They shuffle people between feature-present and feature-absent on both sides, so the two groups look more alike than they are and a real link is dragged toward the null.": "同等地落在病例和对照身上的误差，是无差异性的。它们会在两侧都把人在“有该特征”和“无该特征”之间打乱，使两组看起来比实际更相似，把一个真实的关联拉向无效。",
  "A health survey measures a habit with a confusingly worded question that people answer more or less at random. No link is found between the habit and an illness, and the survey concludes the habit is harmless.": "一项健康调查用一个措辞令人困惑的问题来衡量某种习惯，人们的回答或多或少近乎随机。调查没有发现这种习惯与某种疾病之间存在关联，于是得出结论：这种习惯无害。",
  "A question answered almost at random splits the true doers and non-doers evenly across both answers. That equal confusion mixes the groups and pulls any genuine link toward zero, so the null describes the question, not the habit.": "一个几乎被随机作答的问题，会把真正有这种习惯和没有这种习惯的人，均匀地分散到两种答案里。这种同等程度的混淆，把两组混在了一起，把任何真实的关联都拉向零，所以这个无效结果描述的是这个问题本身，而不是这种习惯。",
  "A study compares two treatments using a hospital database in which the outcome is coded inconsistently, with the same sloppiness for both treatment groups. The treatments look equally effective, and the paper reports no difference.": "一项研究利用一个医院数据库比较两种治疗方法，该数据库对结局的编码并不一致，但两个治疗组的这种草率程度是一样的。两种治疗看起来同样有效，论文报告两者没有差异。",
  "When the outcome is recorded just as unreliably in both arms, the errors favour neither treatment. They blur any real gap between the arms, so no difference can be the coding rather than the treatments truly being alike.": "当两个组的结局记录同样不可靠时，这些误差不会偏向任何一种治疗。它们会模糊两组之间任何真实的差距，所以“没有差异”这个结果，可能出在编码上，而不是两种治疗真的一样。",
  "A test for a blood marker misses about half of the true positives, at random and regardless of who is ill. Using it to classify people, a study finds the marker unrelated to the disease and drops it from further work.": "一项血液标志物检测漏掉了大约一半的真阳性，出错是随机的，与谁患病无关。用它来给人分类，一项研究发现该标志物与疾病无关，于是不再对其做进一步研究。",
  "A test that mislabels exposure the same way in the sick and the well is non-differential. Filing half of the truly positive people as negative on both sides makes the two groups resemble each other, biasing the marker's apparent effect toward none.": "一项在病人和健康人身上以同样方式误判暴露的检测，是无差异性的。把两侧真正阳性的人各有一半都归为阴性，会让两组彼此更相似，使该标志物看起来的效应被拉向无效。",
  "Researchers measure class attendance from a sign-in sheet that students fill in haphazardly, and find attendance unrelated to exam marks. The faculty concludes that turning up makes no difference.": "研究者通过一张学生随意填写的签到表来衡量出勤率，发现出勤与考试成绩无关。院系由此得出结论：来不来上课并无影响。",
  "A haphazard sheet mislabels regular and irregular attenders alike, in no particular direction. The noise is spread evenly across everyone, which mixes the groups and pushes any real effect of attending toward zero.": "一张随意填写的签到表，会以没有特定方向的方式，把经常出勤和不常出勤的人都记错。这种噪音均匀分布在所有人身上，把两组混在了一起，把出勤的任何真实效应都推向零。",
  "A study estimates how much people sleep from one vague question and looks for a link with next-day reaction time. Everyone's estimate is off by an hour or two either way, unrelated to how they performed. No link appears, and the write-up says sleep length does not affect alertness.": "一项研究通过一个含糊的问题来估计人们的睡眠时长，并寻找它与次日反应时间之间的关系。每个人的估计都可能相差一两个小时，方向不定，也与他们的表现无关。结果没有发现关联，报告称睡眠时长不影响警觉性。",
  "An estimate imprecise for everyone, and untied to performance, is non-differential error. It scrambles short and long sleepers together, and mixing them like this drags a real relationship toward nothing rather than inventing one.": "一个对每个人都不精确、又与表现无关的估计，属于无差异性误差。它把睡得少和睡得多的人搅在一起，这样的混合会把一段真实的关系拉向消失，而不是凭空造出一段关系。",
  "A study measures an exposure with a method carefully validated to be accurate for nearly everyone, finds no association with the disease, and concludes the exposure probably has little effect, noting that because the measurement was reliable the null is unlikely to be hiding a large one.": "一项研究用一种经过仔细验证、对几乎所有人都准确的方法来测量某种暴露，没有发现它与疾病存在关联，于是得出结论：该暴露的影响可能很小，并指出正因为测量可靠，这个无效结果不太可能是在掩盖一个很大的真实效应。",
  "A null is weak evidence only when the measurement is poor. Here the exposure was measured accurately, so blurring cannot explain the missing link, and reading the null as meaningful is the sound move.": "只有当测量很差时，一个无效结果才是薄弱的证据。这里的暴露被准确地测量了，所以模糊化解释不了这个缺失的关联，把这个无效结果当真，才是稳妥的判断。",
  "A study measured diet with a rough questionnaire and found no link to an illness. Rather than declaring the diet safe, the authors write that their crude measurement could have hidden a real effect, and call for a study with better dietary records.": "一项研究用一份粗略的问卷来测量饮食，没有发现它与某种疾病有关联。作者并没有宣称这种饮食是安全的，而是写道：他们粗糙的测量方式可能掩盖了一个真实的效应，并呼吁开展一项饮食记录更完善的研究。",
  "They recognised that error spread across everyone tends to bury associations, so a null from a blunt instrument cannot prove there is nothing there. Declining to over-read it is the careful conclusion, not a trap.": "他们意识到，均匀分布在所有人身上的误差往往会掩盖关联，所以一个来自粗钝工具的无效结果，不能证明什么都不存在。不去过度解读它，才是审慎的结论，而不是一个陷阱。",
  "Because a single blood-pressure reading is noisy, a study averages several readings taken on separate days for every participant before testing the link with the outcome, and reports the association from those averaged values.": "由于单次血压读数存在噪音，一项研究在检验其与结局的关联之前，先对每位参与者在不同日子测得的多次读数取平均，并根据这些平均值来报告关联。",
  "Averaging repeated measurements cuts the random error that would otherwise blur participants together and weaken the association. Reducing non-differential error this way is exactly how to keep a real effect visible.": "对重复测量取平均，能减少本来会把参与者混在一起、削弱关联的随机误差。用这种方式减少无差异性误差，正是让真实效应保持可见的正确做法。",
  "What they said afterwards": "他们事后所说的",
  "Against what they said before": "对照他们事前所说的",
  "Measurement": "测量",

  // ---- Regression to the mean (Galton puzzle, review items, scope labels) ----
  "The tallest parents have tall children. So the tallest parents of all should have the tallest children of all, surely?": "最高的父母生出高个子的孩子。那么，最高的那些父母，理应生出最高的孩子，不是吗？",
  "In 1886 Francis Galton grouped 928 grown children by their parents' height. The tallest parents averaged about 72 inches, well above the roughly 68 inch average of the day; the shortest averaged about 65. Nobody did anything to the children. They grew up and were measured.": "1886年，弗朗西斯·高尔顿（Francis Galton）将928名成年子女按父母身高分组。最高的一组父母平均身高约72英寸，远高于当时约68英寸的平均水平；最矮的一组父母平均约65英寸。没有人对这些孩子做过任何事，他们只是长大，然后被测量。",
  "What became of the children of these extreme-height parents?": "这些身高极端的父母，他们的孩子后来怎么样了？",
  "Galton's 928 grown children, grouped by their parents' height": "高尔顿的928名成年子女，按父母身高分组",
  "inches": "英寸",
  "Average height": "平均身高",
  "The parents": "父母",
  "Their grown children": "他们的成年子女",
  "The tallest parents": "最高的父母",
  "Tallest parents": "最高父母组",
  "The shortest parents": "最矮的父母",
  "Shortest parents": "最矮父母组",
  "Just as extreme as their parents": "和父母一样极端",
  "the tallest parents' children the tallest of all": "最高父母的孩子仍是所有人中最高的",
  "Some influence closed the gap": "某种影响缩小了差距",
  "diet, mixing or the times narrowed the difference": "饮食、通婚或时代变化缩小了差异",
  "Both landed nearer the average": "两者都更接近平均值",
  "less extreme than their parents, with nothing done to them": "比父母更不极端，而没有人对他们做过什么",
  "The tallest parents' children were shorter than them; the shortest parents' children were taller. Both landed nearer the average.": "最高父母的孩子比父母矮；最矮父母的孩子比父母高。两者都更接近平均值。",
  "Regression to the mean": "向均值回归",
  "The tallest parents averaged 71.9 inches, about 3.6 above the 68.3 inch average. Their grown children averaged 70.8, only 2.5 above. The shortest parents averaged 65.1, about 3.2 below; their children 66.2, only 2.1 below. Roughly a third of each gap closed on its own, in both directions, and nobody touched the children. This is the pattern that gave regression its name.": "最高的父母平均身高为71.9英寸，比68.3英寸的平均值高出约3.6；他们的成年子女平均70.8，只高出2.5。最矮的父母平均65.1，比平均值低约3.2；他们的子女66.2，只低2.1。两个方向上，每个差距都自行缩小了大约三分之一，而没有人碰过这些孩子。正是这种模式，让“回归”这个词由此得名。",
  "An unusually tall pair of parents is unusual partly for solid, heritable reasons and partly by luck, the fortunate end of many small things. The heritable part passes on; the luck does not, because it was luck. So the children keep the real part and shed the fluke, and land closer to the middle, and the shortest parents' children rise for the mirror reason. No force reaches in to even people out. It is only that an extreme is hard to repeat.": "一对异常高的父母之所以异常，一部分出于扎实的、可遗传的原因，一部分只是运气，是许多细小因素凑巧都往同一个方向走的幸运结果。可遗传的部分会传下去；运气不会，因为它本来就是运气。于是孩子保留了真实的那部分，甩掉了侥幸的那部分，落到了更接近中间的位置；最矮父母的孩子出于镜像的原因而上升。没有任何力量伸手把人拉平。只是极端本身很难重复罢了。",
  "What pulls the extremes in": "把极端值拉回来的力量",
  "Pick a group because it sits at an extreme and its next measurement will usually be less extreme, even if you do nothing. The worst cases tend to improve and the best tend to fade on their own, so a change in a hand-picked extreme group is not, by itself, evidence that anything worked.": "因为一个群体处于极端而挑选它，它下一次的测量结果通常会不那么极端，即便你什么都不做。最差的案例往往会自行好转，最好的案例往往会自行回落，所以一个被挑出来的极端群体发生了变化，本身并不能证明有什么起了作用。",
  "Whenever a group was chosen for being at an extreme, the sickest patients, the worst-performing schools, the accident black spots, the record-breaking quarter, expect it to move toward the average next time by itself. To show that a treatment, a policy or a new coach did the work, you need a comparison group that was equally extreme and left alone. Without one you may be measuring the weather rather than the climate.": "每当一个群体因为处于极端而被挑中，无论是病情最重的患者、成绩最差的学校、事故黑点，还是创纪录的一个季度，都可以预期它下一次会自行朝平均值靠拢。要证明是某种治疗、某项政策或一位新教练起了作用，你需要一个同样极端、却未被干预的对照组。没有它，你测量的可能只是天气，而不是气候。",
  "Any one measurement is part signal and part noise. Selecting the extremes selects the cases where the noise happened to pile up in the same direction as the signal. Measure again and the noise redraws itself, so the value falls back toward the average, and the noisier the measurement the further it falls. This quietly manufactures success stories wherever a decision follows a bad patch. Speed cameras go up after a cluster of crashes that was never going to repeat, so crashes fall and the camera takes the credit. A struggling team sacks its manager at its lowest point and recovers, as it would have anyway. A patient starts a remedy on their worst day and feels better by the next. Each improvement is real, and none of it shows the action caused anything, until you find the group that had the same bad patch and did nothing.": "任何一次测量，都一部分是信号，一部分是噪音。挑选极端值，挑的正是噪音恰好与信号叠加在同一方向上的那些情况。再测一次，噪音会重新洗牌，数值就会回落向平均值，而测量越嘈杂，回落得就越多。这就悄悄制造出了成功故事，只要某个决策紧跟在一段糟糕时期之后。测速摄像头在一连串本就不会重演的事故之后架起，于是事故减少，摄像头得了功劳。一支挣扎中的球队在最低谷解雇了经理，随后回暖，而这本来就会发生。一位患者在病情最重的那天开始服用某种偏方，第二天就感觉好些了。每一次好转都是真实的，但没有一次能证明是那个行动导致的，除非你找到了那个经历了同样糟糕时期、却什么都没做的群体。",
  "The same trap at the bedside": "病床边同样的陷阱",
  "Enrol patients because their blood pressure is high and it tends to fall by the next visit even on a dummy pill, because the reading that got them in was partly a high day. When home monitoring was repeated over a year, the group with the highest starting readings fell the most, from about 156 to 143, and the group with the lowest rose, from about 113 to 120, the movement driven by regression rather than by anything done to them. An uncontrolled before-and-after look would have credited a treatment for both.": "因为血压高而把患者纳入研究，即便只服用安慰剂，血压到下次就诊时也往往会下降，因为让他们入选的那个读数，本身就有几分是撞上了偏高的一天。当居家监测在一年里重复进行时，起始读数最高的一组下降最多，从约156降到143；起始读数最低的一组则上升，从约113升到120，这一变化由回归驱动，而不是由任何针对他们的干预造成的。一个未设对照的前后对比研究，会把这两种变化都归功于某种治疗。",
  "Regression to the mean, a reasoning trap.": "向均值回归，一个推理陷阱。",
  "Anything measured at its extreme, the sickest patients, the worst month, the record score, tends to look more ordinary next time, all on its own. The unusual value was partly a fluke, and flukes do not repeat. So when you act on a group precisely because it was extreme and it then improves, the improvement may be nothing more than the fluke fading. To know your action did anything, you need a group that was just as extreme and left alone.": "任何在极端时刻被测量的事物，无论是病情最重的患者、最差的一个月，还是创纪录的分数，下一次往往会自行显得更普通一些。那个异常值一部分是巧合，而巧合不会重演。所以，当你正因为一个群体处于极端而对它采取行动，随后它有所改善时，这种改善可能只是巧合褪去而已。要知道你的行动是否真的起了作用，你需要一个同样极端、却未被干预的群体。",
  "Caught the fluke. Bet you can't.": "我识破了这个巧合。你未必行。",
  "I gave the credit to the wrong thing.": "我把功劳归错了对象。",
  "The figures are group means computed from Galton's 928 tabulated adult children, the standard digitization of his Table I (distributed as HistData::Galton), with female heights multiplied by 1.08 exactly as Galton did. The population average was about 68.3 inches. The tallest parents, those with a mid-parent height of 71 inches or more (66 children), averaged 71.9 inches and their children 70.8; the shortest, 65.5 inches or less (103 children), averaged 65.1 and their children 66.2. These are means of the tabulated data rather than verbatim printed cell values, and they are grouped because the single one-inch bins at the extremes hold only a handful of families and are noisy. Computed across all 928 pairs, the parent-to-child regression slope is about 0.65, which reproduces Galton's own finding that a child's deviation from the mean is roughly two-thirds of the mid-parent's, the result from which the word regression descends.": "这些数字是根据高尔顿928名列表中的成年子女计算出的组均值，采用的是他“表一”的标准数字化版本（以 HistData::Galton 的形式发布），并按高尔顿本人的做法，把女性身高乘以1.08。总体平均身高约为68.3英寸。最高的父母，即中亲身高（mid-parent height）达到71英寸及以上的那组（66名子女），平均身高71.9英寸，其子女平均70.8；最矮的一组，中亲身高65.5英寸及以下（103名子女），平均65.1，其子女66.2。这些是表列数据的均值，而非逐格照抄的印刷数值；之所以分组呈现，是因为极端处单独一英寸宽的区间里只有寥寥数个家庭，噪音很大。以全部928对数据计算，父母与子女之间的回归斜率约为0.65，这与高尔顿本人的发现一致：子女偏离均值的幅度，大约是中亲偏离幅度的三分之二，“回归”一词正是由此而来。",
  "A council installs speed cameras at the twenty junctions with the most crashes last year. Over the next year crashes at those junctions fall, and the council reports the cameras as a clear success.": "市议会在去年事故最多的二十个路口安装了测速摄像头。接下来一年里，这些路口的事故减少了，议会将摄像头报告为明显的成功。",
  "The junctions were picked for an exceptionally bad year, which is partly bad luck that does not repeat. Crashes would have fallen at the worst sites anyway, so crediting the cameras needs junctions that were equally bad and left uncovered.": "这些路口是因为有异常糟糕的一年而被挑中的，而这在一定程度上是不会重演的坏运气。即便没有摄像头，事故最多的地点也会自行减少，所以要把功劳归给摄像头，需要找到同样糟糕、却没有安装摄像头的路口。",
  "A ministry gives extra funding to the fifty lowest-scoring schools. The next year their average results rise, and the funding is declared to have worked.": "教育部向成绩最差的五十所学校提供额外资金。第二年，这些学校的平均成绩上升了，该资金被宣布为奏效。",
  "Schools land at the very bottom partly through a bad year that will not recur, so the lowest scorers tend to climb on their own. Without a comparison of equally low-scoring schools that got nothing, the rise cannot be pinned on the money.": "学校落到垫底，一部分是因为一个不会重演的糟糕年份，所以成绩最差的学校往往会自行回升。如果没有一组成绩同样垫底、却什么都没得到的学校作对照，这次回升就无法归功于这笔资金。",
  "A clinic enrols the patients with the highest cholesterol readings onto a new diet. At the recheck their readings have dropped, and the clinic recommends the diet to everyone.": "一家诊所把胆固醇读数最高的患者纳入一种新饮食方案。复查时，他们的读数下降了，诊所向所有人推荐这种饮食。",
  "People selected for the highest readings include many caught on an unusually high day, which the next test will not repeat. Their readings would fall without the diet, so only an equally high group left alone can show the diet did anything.": "被挑中的高读数人群里，有不少人只是恰好撞上了异常偏高的一天，下一次检测不会重演这一点。即便没有这种饮食，他们的读数也会下降，所以只有一个同样偏高、却未采用该饮食的对照组，才能说明这种饮食是否真的起了作用。",
  "A football club sacks its manager after the worst run of results in years. Under the caretaker the team climbs the table, and the board congratulates itself on the decision.": "一家足球俱乐部在多年来最差的一段战绩后解雇了主教练。在临时教练带领下，球队排名回升，董事会为这一决定沾沾自喜。",
  "Clubs sack managers at their lowest ebb, and a lowest ebb is partly a run of bad luck that tends to end. The recovery is what a bad patch usually does next, so it is no proof the sacking helped.": "俱乐部往往在状态最低谷时解雇教练，而这个低谷本身部分源于一段终将结束的坏运气。回暖正是一段低谷期接下来通常会发生的事，所以它并不能证明解雇起了作用。",
  "People try a herbal remedy when their cold feels at its worst. Most feel much better within two days and recommend it to friends.": "人们通常在感冒最严重的时候尝试一种草药偏方。大多数人在两天内感觉明显好转，并推荐给朋友。",
  "A cold is usually taken on at its peak, and symptoms fade from a peak on their own. Feeling better after the worst day is what a cold does, with or without the remedy.": "感冒通常是在症状最重的时候才被人注意到的，而症状会从这个峰值自行消退。最难受的那天过后感觉好转，是感冒本身的规律，无论有没有那种偏方。",
  "An athlete voted best newcomer of the season plays less brilliantly the year after. Pundits conclude the fame went to his head.": "一名被评为本赛季最佳新秀的运动员，第二年表现不再那么出色。评论员认为是名气冲昏了他的头脑。",
  "A best-newcomer season is a peak, and peaks are partly luck that does not hold. A more ordinary second year is what regression predicts, and it needs no story about character.": "最佳新秀赛季本身就是一个高峰，而高峰的一部分是不会持续的运气。第二年表现更普通，正是回归所预测的结果，无需借助任何关于性格的说法。",
  "A chain sends its consultants to the ten stores with the worst sales last quarter. Those stores do better the following quarter, and the consultancy is retained.": "一家连锁企业把顾问派到上季度销售最差的十家门店。下一季度，这些门店表现更好，该咨询公司因此被续约。",
  "The ten stores were chosen for an unusually bad quarter, which tends to be followed by a better one regardless. Judging the consultants fairly needs equally poor stores they never visited.": "这十家门店是因为一个异常糟糕的季度而被挑中的，而这样的季度之后往往会迎来好转，无论如何都会如此。要公正地评判顾问的作用，需要一组同样糟糕、他们从未到访过的门店作对照。",
  "A screening drive recalls everyone whose blood pressure read highest and gives them lifestyle advice. At the recall visit their pressure is lower, and the advice is judged effective.": "一项筛查活动把血压读数最高的人全部召回，并给予生活方式建议。复诊时，他们的血压降低了，这条建议被判定为有效。",
  "A single high reading is partly a bad moment, so the highest readers tend to read lower next time anyway. The fall is expected without any advice, and a comparison group is the only way to see the advice's own effect.": "单次偏高的读数，一部分只是当时状态不好，所以读数最高的人下一次的读数往往会自行降低。即便没有任何建议，这种下降也在预料之中；只有一个对照组，才能看清这条建议本身的效果。",
  "Drivers who collected the most penalty points in a year are required to attend a safety course. In the following year they collect far fewer points, and the course is expanded.": "一年中累计违章记分最多的司机被要求参加安全课程。第二年，他们的记分大幅减少，该课程因此被推广。",
  "Drivers are picked at a peak year of offences, and a peak is partly chance that eases off. Fewer points the next year is what regression predicts, so the drop does not by itself show the course worked.": "司机是在违章行为达到高峰的那一年被挑中的，而这个高峰一部分是终将回落的偶然。第二年记分减少，正是回归所预测的结果，所以这一下降本身并不能证明课程起了作用。",
  "Students who scored worst on a mock exam are enrolled in a revision workshop. On the real exam they improve markedly, and the school makes the workshop compulsory for low scorers.": "模拟考试中成绩最差的学生被安排参加复习工作坊。在正式考试中，他们的成绩明显提高，学校因此将该工作坊定为低分学生的必修项目。",
  "The worst mock scores include students who simply had an off day, who tend to do better next time regardless. Only students who scored equally badly and skipped the workshop could show whether it added anything.": "模拟考最差的成绩里，包含了一些只是当天状态不佳的学生，他们无论如何下一次都往往会考得更好。只有找到一组成绩同样差、却没有参加工作坊的学生，才能说明这个工作坊到底有没有额外作用。",
  "A charity funds the lowest-attaining schools and evaluates the programme against an equally low-attaining set of schools, chosen the same way but left unfunded. The funded schools improved more than the unfunded ones.": "一家慈善机构资助了成绩最差的一批学校，并用另一批以同样方式挑选、但未获资助的成绩同样最差的学校作为对照来评估该项目。获得资助的学校，进步幅度超过了未获资助的学校。",
  "Both sets were equally extreme, so both would drift upward by about the same amount on their own. Because the comparison schools absorb that drift, the extra improvement in the funded schools is a fair estimate of what the funding added.": "两组学校同样极端，所以都会自行上升大致相同的幅度。由于对照学校吸收了这部分自然回升，获得资助的学校多出来的那部分进步，才是对这笔资金实际贡献的公正估计。",
  "Patients with high blood pressure are randomly assigned to a drug or a dummy pill. Pressure falls in both groups, but it falls further on the drug, and the trial reports the difference between the two as the drug's effect.": "高血压患者被随机分配到药物组或安慰剂组。两组的血压都下降了，但药物组下降得更多，试验将两组之间的差异报告为该药物的效果。",
  "Both arms started high and both drift back toward the average, so the fall in the dummy-pill arm measures that drift. Subtracting it leaves the part that is the drug, which is exactly why the comparison arm is there.": "两组一开始的读数都偏高，也都会自行回落向平均值，所以安慰剂组的下降幅度，衡量的正是这种自然回落。减去它之后剩下的部分，才是药物本身的效果，而这正是设立对照组的意义所在。",
  "Where they started": "起点",
  "Where they landed": "落点",

  // ---- Effect modification versus confounding (Choi puzzle, review items, scope labels) ----
  "A gene variant carried by millions goes with about 2.5 times the odds of esophageal cancer, and adjusting for alcohol barely changes it. A modest risk gene, then?": "一种数百万人携带的基因变异，与约2.5倍的食管癌几率相关，而对饮酒进行校正后这一数值几乎不变。难道这只是个温和的风险基因？",
  "In South Korean men, researchers compared the ALDH2 gene variant between esophageal cancer patients and healthy controls. Carriers had roughly 2.5 times the odds of cancer, and adjusting for whether the men drank alcohol left that almost unchanged, which usually means a factor is standing on its own.": "在韩国男性中，研究者比较了食管癌患者与健康对照者携带ALDH2基因变异的情况。携带者患癌的几率约为2.5倍，而按这些男性是否饮酒做校正后，这一数值几乎不变，这通常意味着某个因素是独立起作用的。",
  "What is the gene really doing?": "这个基因到底在做什么？",
  "The ALDH2 variant and esophageal cancer in Korean men": "ALDH2变异与韩国男性食管癌",
  "Odds of esophageal cancer with the variant": "携带该变异者的食管癌几率",
  "alcohol drinking": "饮酒",
  "Ignoring drinking": "忽略饮酒",
  "Adjusted for drinking": "校正饮酒后",
  "no effect": "无效应",
  "Current drinkers": "目前饮酒者",
  "Drinkers": "饮酒者",
  "Non-drinkers": "不饮酒者",
  "A modest risk factor in its own right": "本身就是一个温和的风险因素",
  "about 2.5 times the odds, with or without drinking": "无论是否饮酒，几率都约为2.5倍",
  "An illusion, drinking is the real cause": "这是一种假象，饮酒才是真正的原因",
  "adjust it away and nothing is left": "一经校正，它就荡然无存",
  "It only matters in people who drink": "只在饮酒者身上才起作用",
  "the effect depends on the drinking": "效应的大小取决于是否饮酒",
  "In men who do not drink the variant does almost nothing (1.25). In men who drink it quadruples the odds (4.39). The 2.5 was the average of two different worlds.": "在不饮酒的男性中，该变异几乎没有作用（1.25）。在饮酒的男性中，它使几率增至约四倍（4.39）。2.5这个数字，只是两个截然不同世界的平均值。",
  "Effect modification": "效应修饰",
  "Split by drinking, the odds ratio is 1.25 in non-drinkers, its confidence interval crossing 1, and 4.39 in drinkers. The crude 2.6, and the drinking-adjusted 2.4, sit between the two and describe neither group. The variant slows the clearance of acetaldehyde, a carcinogen the body makes from alcohol, so it can only do harm when there is alcohol to process. Adjusting for drinking treats it as a nuisance to subtract, but here drinking is the very thing that switches the gene's danger on.": "按饮酒与否分层后，比值比在不饮酒者中为1.25（其置信区间跨过1），在饮酒者中为4.39。未校正的粗比值比2.6，以及按饮酒校正后的2.4，都介于两者之间，对哪一组的描述都不准确。该变异会减慢乙醛的清除，而乙醛正是身体代谢酒精所产生的一种致癌物，因此只有在需要处理酒精时，它才会造成伤害。把饮酒当作需要剔除的干扰因素来校正，恰恰忽略了饮酒正是打开这个基因危险性的开关。",
  "This is the line between a confounder and an effect modifier. A confounder is a rival explanation you remove by adjustment, and once it is removed the single adjusted number is your answer. An effect modifier is not a nuisance, it is the finding, and the right move is not to average the strata but to report them apart. \"The variant quadruples the odds in drinkers and does nothing otherwise\" is true and useful. \"The variant raises the odds about 2.5-fold\" is true of no one.": "这就是混杂因素与效应修饰因素之间的分界线。混杂因素是一个可以通过校正来消除的竞争性解释，一旦被消除，那个单一的校正后数字就是答案。效应修饰因素不是需要剔除的干扰，它本身就是发现，正确的做法不是把各分层平均起来，而是把它们分开报告。“该变异使饮酒者的几率增至四倍，对其他人则毫无作用”，这句话既真实又有用。“该变异使几率提高约2.5倍”，这句话对谁都不成立。",
  "Confounder, or modifier?": "混杂因素，还是效应修饰因素？",
  "Effect modification versus confounding": "效应修饰与混杂",
  "When a factor's effect differs sharply between subgroups, do not adjust it into a single number. Adjustment answers the confounding question, what is the effect once we account for the other variable. It cannot answer the modification question, does the effect depend on that variable. An average can be true of the whole and describe no one in it.": "当一个因素的效应在各亚组之间差异悬殊时，不要把它校正成一个单一数字。校正回答的是混杂问题，即在考虑另一个变量之后，效应是多少。它回答不了修饰问题，即效应是否取决于那个变量。一个平均值可以对整体成立，却对其中任何一个个体都不成立。",
  "Faced with a third variable, two different moves are possible. If it distorts the comparison but the effect is really the same in everyone, it is a confounder: adjust for it and report one number. If the effect genuinely differs across its levels, it is an effect modifier: report each level on its own. The tell is in the stratified table. If the stratum-specific effects are close to each other but differ from the crude, you had confounding. If they differ from each other, you have modification, and the crude or adjusted figure is an average that can mislead about everybody.": "面对第三变量，有两种不同的应对方式。如果它扭曲了比较，而效应在每个人身上其实是一样的，那它就是混杂因素：对它做校正，并报告一个数字。如果效应在它的各个水平上确实存在差异，那它就是效应修饰因素：把每个水平分开报告。破绽就在分层表里。如果各分层特有的效应彼此接近，却都与粗效应不同，那就是混杂。如果各分层的效应彼此不同，那就是修饰，而粗值或校正值只是一个可能误导所有人的平均数。",
  "Adjustment and stratification begin the same way, by splitting the data on the third variable, and then they part. Adjustment recombines the strata into one weighted number, which is exactly right when they agree and exactly wrong when they do not, because it buries the disagreement inside an average. So look at the strata before you pool them. When they tell the same story, one number is a fair summary. When they tell different stories, that number is a fiction of the middle, and the honest report is the split. Effect modification is not a bias to scrub out, it is often the most useful thing a study finds, the map of who is affected and who is not. It is also why a treatment can be worthless on average and life-saving in a subgroup, and why \"no overall effect\" and \"no effect\" are not the same sentence.": "校正与分层的起点是一样的，都是按第三变量拆分数据，随后二者才分道扬镳。校正把各分层重新合并成一个加权数字，当各分层意见一致时这完全正确，当它们不一致时这就完全错误，因为它把分歧掩埋进了一个平均值里。所以，在合并分层之前先看看它们。当它们讲的是同一个故事时，一个数字就是公正的概括。当它们讲的是不同的故事时，那个数字就是中间地带虚构出来的产物，诚实的报告应当是分开呈现。效应修饰不是需要清除的偏倚，它往往是一项研究能给出的最有用的东西，一张标明谁受影响、谁不受影响的地图。这也是为什么一种治疗可以在平均意义上毫无价值，却能在某个亚组里救命，也是为什么“总体无效应”和“无效应”并不是同一句话。",
  "A drug that works only for some tumours": "一种只对部分肿瘤起作用的药物",
  "Trastuzumab, added to chemotherapy, improved survival in metastatic breast cancer that overexpresses the HER2 protein. It is given only to patients whose tumour is HER2-positive, because that marker is what its benefit depends on. Averaging its effect across all breast cancers would understate it for the women it helps and invent a benefit for those it does not. So the tumour marker is tested for before the drug is prescribed, which is effect modification turned into routine practice rather than adjusted away.": "曲妥珠单抗联合化疗，改善了HER2蛋白过表达的转移性乳腺癌患者的生存。它只用于肿瘤HER2阳性的患者，因为这项标志物正是其疗效所依赖的东西。如果把它的效应平均到所有乳腺癌患者身上，就会低估它对能从中获益的女性的作用，又为那些不能获益的人凭空造出一份疗效。因此，在开具这种药物之前会先检测肿瘤标志物，这是把效应修饰变成常规做法，而不是把它校正掉。",
  "Effect modification versus confounding, a reasoning trap.": "效应修饰与混杂，一个推理陷阱。",
  "A single adjusted number assumes a factor works the same for everyone. Often it does not. A gene, a drug or a policy can do a great deal in one group and nothing in another, and averaging the two gives a figure that is true of no one. When the effect differs across groups, the groups are the answer, not a nuisance to average away.": "一个单一的校正后数字，假定某个因素对每个人的作用都一样。但情况往往并非如此。一个基因、一种药物或一项政策，可以在一个群体里发挥巨大作用，在另一个群体里却毫无作用，把两者平均起来得到的数字，对谁都不成立。当效应在各群体之间存在差异时，答案就是这些群体本身，而不是需要平均掉的干扰。",
  "Caught the average that fooled everyone.": "识破了那个骗过所有人的平均值。",
  "I adjusted away the whole point.": "我把关键所在校正掉了。",
  "The four cells of each stratum are read from Table 3, men's panel. Among current drinkers, 219 of 640 variant carriers were cancer patients against 211 of 1,993 non-carriers; among non-drinkers, 198 of 916 carriers against 123 of 679 non-carriers. The stratum odds ratios reproduce the paper's printed 4.39 and 1.25 exactly, the pooled cells give a crude 2.56, and the Mantel-Haenszel adjustment gives 2.44, consistent with the paper's finding that the association differs by drinking (interaction P < 0.001). Two honesty notes. The men's panel is used because the women's odds ratios in the same table are age-adjusted and do not reconcile from the raw cells. And the exposure is framed as the paper frames it, the genotype, with drinking as the modifier; framing alcohol as the exposure on these same cells would give a misleading apparently protective odds ratio, an artefact of non-drinkers who abstain because of ill health and of not adjusting for tobacco.": "每个分层的四格数据均取自原文表3的男性部分。在目前饮酒者中，640名携带变异者里有219人是癌症患者，而1993名未携带者中有211人；在不饮酒者中，916名携带者里有198人，679名未携带者里有123人。各分层的比值比与原文印出的4.39和1.25完全一致，合并后的粗比值比为2.56，Mantel-Haenszel（曼特尔-亨塞尔）校正后为2.44，与原文关于该关联因饮酒而异（交互作用P<0.001）的结论相符。这里有两点诚实说明。之所以采用男性部分，是因为同一张表中女性的比值比经过了年龄校正，无法用原始格数据还原。此外，暴露按原文的框架处理，即以基因型为暴露、饮酒为修饰因素；若用同样这些格子把饮酒当作暴露，会得出一个看似保护性的、具有误导性的比值比，那不过是因病戒酒的不饮酒者，加上未对吸烟做校正所造成的假象。",
  "A study reports that regular sunscreen use cuts skin cancer risk by about a fifth on average, adjusting for skin type. The benefit is large in fair-skinned people and negligible in the darkest-skinned. The health message quotes only the one-fifth figure.": "一项研究报告称，在对肤色类型做校正后，经常使用防晒霜平均可将皮肤癌风险降低约五分之一。这一益处在肤色较浅的人群中很大，在肤色最深的人群中则微乎其微。健康宣传只引用了这五分之一的数字。",
  "The effect genuinely differs by skin type, so a single averaged number describes neither group. Skin type here is not a nuisance to adjust away but the thing that decides how much sunscreen helps, and it should be reported separately.": "效应确实因肤色类型而异，因此一个平均后的单一数字对哪个群体都描述不准。这里的肤色类型不是需要校正掉的干扰因素，而是决定防晒霜能帮上多少忙的关键，应当分开报告。",
  "A blood pressure drug is licensed with the claim that it lowers pressure by 8 mmHg. Split by age, it barely moves pressure under 50 and lowers it markedly over 70. Only the single average appears on the label.": "一种降压药获批时的宣称是能把血压降低8 mmHg。按年龄分层后可见，它在50岁以下人群中几乎不改变血压，在70岁以上人群中则显著降低血压。标签上只标出了那一个平均数。",
  "Age changes the size of the effect, so the 8 mmHg is an average that fits no age group well. When an effect differs across subgroups it should be reported by subgroup, not collapsed into one figure.": "年龄改变了效应的大小，因此这8 mmHg是一个对任何年龄组都不太贴切的平均值。当效应在各亚组之间存在差异时，应当按亚组报告，而不是压缩成一个数字。",
  "A painkiller relieves pain strongly in people with one liver-enzyme genotype and hardly at all in those with another. A review pools every patient and reports a modest average benefit.": "一种止痛药对某种肝酶基因型的人镇痛效果很强，对另一种基因型的人则几乎没有效果。一篇综述把所有患者合并在一起，报告了一个中等程度的平均获益。",
  "The genotype decides whether the drug works, so pooling produces a number that overstates it for one group and invents it for the other. The genotype is the finding, not a variable to average over.": "基因型决定了这种药是否有效，因此合并数据得出的数字，对一组人高估了疗效，对另一组人则凭空造出了疗效。基因型本身就是发现，而不是一个应当被平均掉的变量。",
  "Researchers find a treatment helps men and harms women by about the same amount. To account for sex, they adjust for it and report a single near-zero effect, concluding the treatment does nothing.": "研究者发现，一种治疗对男性有帮助，对女性则造成大致相同程度的伤害。为了考虑性别的影响，他们对其做了校正，报告了一个接近于零的单一效应，并得出该治疗毫无作用的结论。",
  "Adjusting for sex has buried two real and opposite effects under an average of nearly zero. Sex is modifying the effect, not confounding it, so the honest report is the two subgroups apart, not one number that hides both.": "对性别做校正，把两个真实而方向相反的效应，掩埋进了一个接近于零的平均值里。性别是在修饰这个效应，而不是在混杂它，因此诚实的报告应当是把两个亚组分开呈现，而不是用一个数字把两者都藏起来。",
  "A fertiliser trial across many fields finds it raises yield on sandy soil and does nothing on clay. The report gives the average increase and recommends the fertiliser for all fields.": "一项在多块田地开展的肥料试验发现，它在沙质土壤上能提高产量，在黏土上则毫无作用。报告给出的是平均增产幅度，并建议所有田地都使用这种肥料。",
  "Soil type changes whether the fertiliser works at all, so an average across soils recommends it where it is useless. The effect should be reported by soil, which is the practical answer a farmer needs.": "土壤类型决定了这种肥料是否管用，因此跨土壤类型的平均值，会在它毫无用处的地方也推荐使用它。效应应当按土壤类型报告，这才是农户真正需要的实用答案。",
  "A vaccine is highly protective in younger adults and only weakly protective in the elderly. A briefing note gives a single overall efficacy figure for the whole population.": "一种疫苗对年轻成年人保护力很强，对老年人保护力则很弱。一份简报只给出了针对整个人群的单一总体有效率数字。",
  "Age modifies how well the vaccine works, so one figure overstates the protection the elderly can expect. A modifier like this belongs in the results split out, because the subgroups need different advice.": "年龄修饰了这种疫苗的效力，因此单一数字高估了老年人能获得的保护。像这样的修饰因素，应当在结果中被拆分呈现，因为不同亚组需要不同的建议。",
  "A tutoring programme raises test scores sharply for pupils who started behind and not at all for those already ahead. The evaluation reports one average gain and rolls the programme out to everyone.": "一项课外辅导项目，使起点落后的学生成绩大幅提高，对本就领先的学生则毫无作用。评估报告给出了一个平均提升幅度，并将该项目推广到所有学生。",
  "Starting level decides who benefits, so an average gain misdescribes both the pupils it helps and those it does not. This is an effect that differs by subgroup, to be reported by subgroup rather than averaged.": "起点水平决定了谁能从中受益，因此平均提升幅度，对它帮到的学生和没帮到的学生都描述不准。这是一种因亚组而异的效应，应当按亚组报告，而不是平均掉。",
  "An occupational study finds a workplace solvent raises lung cancer risk steeply in smokers and not detectably in non-smokers. The authors adjust for smoking and present a single modest risk for the solvent.": "一项职业研究发现，某种工作场所使用的溶剂，在吸烟者中会大幅提高肺癌风险，在非吸烟者中则检测不到明显影响。作者对吸烟做了校正，给出了该溶剂一个中等程度的单一风险数字。",
  "Smoking is not just a confounder here, it decides whether the solvent does harm, so adjusting it into one number hides that the danger is concentrated in smokers. The two groups should be reported separately.": "在这里，吸烟不只是一个混杂因素，它决定了这种溶剂是否会造成伤害，因此把它校正进一个数字里，掩盖了危险其实集中在吸烟者身上这一事实。这两个群体应当分开报告。",
  "A dietary change lowers heart attacks in people with diabetes and has no effect in people without it. A meta-analysis pools all participants and concludes the diet has a small, marginal benefit.": "一项饮食改变，能降低糖尿病患者的心脏病发作风险，对没有糖尿病的人则毫无作用。一项荟萃分析合并了所有参与者，得出该饮食有一个微小、边际性获益的结论。",
  "The diet's effect depends on diabetes status, so pooling dilutes a real benefit for one group into a marginal-looking average for everyone. Diabetes is the modifier, and the strata carry the real message.": "这种饮食的效应取决于是否患有糖尿病，因此合并数据会把对一个群体真实存在的获益，稀释成看起来对所有人都只是边际性的平均值。糖尿病是修饰因素，而各分层才承载着真正的信息。",
  "A feature raises spending a lot among brand-new users and not at all among long-standing ones. The product team reports the average uplift across all users and ships the feature to everybody.": "某项功能大幅提高了全新用户的消费，对老用户则毫无影响。产品团队报告的是全体用户的平均提升幅度，并将该功能推送给所有人。",
  "How long someone has used the product decides whether the feature does anything, so the average uplift misleads about both groups. When an effect differs by subgroup, the subgroups are the result, not a detail to average over.": "使用产品的时长决定了这项功能是否有作用，因此平均提升幅度对两个群体都具有误导性。当效应因亚组而异时，这些亚组本身才是结果，而不是一个可以被平均掉的细节。",
  "Coffee drinkers have more heart disease, but they also smoke more. After adjusting for smoking the association disappears, and the same near-zero link holds within smokers and within non-smokers alike. The authors report that coffee is not associated once smoking is accounted for.": "喝咖啡的人心脏病更多，但他们吸烟也更多。对吸烟做校正后，这种关联消失了，在吸烟者和非吸烟者内部，都同样呈现出接近于零的关联。作者报告说，一旦考虑了吸烟，咖啡与心脏病就不再相关。",
  "Because the link is the same small thing in both smoking groups, smoking was a genuine confounder and adjusting for it is the right move. A single adjusted number is a fair summary precisely because the strata agree.": "因为这种关联在两个吸烟分组里都同样微小，吸烟在这里是真正的混杂因素，对它做校正是正确的做法。一个单一的校正后数字之所以是公正的概括，恰恰是因为各分层的结果是一致的。",
  "A trial finds a drug clearly helps patients with a particular marker and does nothing for those without it. Rather than quoting one overall effect, the report gives the two groups separately and recommends the drug only for the marker-positive patients.": "一项试验发现，某种药物对携带特定标志物的患者明显有效，对不携带该标志物的患者则毫无作用。报告没有引用一个总体效应，而是把两个群体分开呈现，并建议只对标志物阳性的患者使用该药物。",
  "When an effect differs by subgroup, reporting the subgroups apart is exactly right, and pooling them into one average would have been the error. Prespecifying the marker and acting on it is careful practice, not a trap.": "当效应因亚组而异时，把各亚组分开报告正是正确做法，而把它们合并成一个平均值才是错误。事先设定好标志物并据此行动，是审慎的做法，而不是一个陷阱。",
  "As one number": "作为一个数字",
  "Split by the third factor": "按第三个因素拆分",

  // ---- Detection (observer) bias puzzle + review items ----
  "Give surgical patients far less IV fluid and complications seem to plummet. A clear win for less fluid?": "给外科患者输液量大幅减少后，并发症似乎骤减。这是否明确证明少输液更好？",
  "In a trial, an assessor recorded which patients had a postoperative complication. In the restrictive-fluid group 31 percent did, against 55 percent on the standard regimen, and the difference was highly significant (P = 0.002).": "在一项试验中，一名评估者记录了哪些患者出现了术后并发症。限制性输液组中 31% 的患者出现并发症，而标准输液组为 55%，差异高度显著（P = 0.002）。",
  "How much should you trust the size of that benefit?": "你应该在多大程度上相信这一获益的大小？",
  "Had a postoperative complication": "出现术后并发症",
  "Restrictive fluid": "限制性输液",
  "Restrictive": "限制性",
  "Standard fluid": "标准输液",
  "Standard": "标准",
  "Graded by an assessor who knew the regimen": "由知晓治疗方案的评估者评定",
  "Graded by an assessor kept unaware": "由不知情的评估者评定",
  "As the unblinded assessor graded them": "按非盲评估者的评定结果",
  "A big, solid benefit": "一个巨大而可靠的获益",
  "complications nearly halved": "并发症几乎减半",
  "The groups must have differed to begin with": "两组从一开始就必定存在差异",
  "something other than the fluid": "输液量之外的其他因素",
  "The grader knew the assignment": "评定者知道分组情况",
  "grade it blind and it shrinks": "以盲法评定，差距就会缩小",
  "Grade the same patients blind, and the gap narrows.": "对同一批患者做盲法评定，差距就会缩小。",
  "What the grader knew": "评定者知道什么",
  "The same 172 patients, judged again by an assessor kept unaware of who got which regimen: 28 of 86 with a complication on restrictive fluid (33 percent) against 44 of 86 on standard (51 percent). Restrictive fluid still helped, but the gap is 18 points rather than the 24 the unblinded grader recorded, and the p-value slips from 0.002 to 0.013.": "同样的 172 名患者，再次由一名不知道谁分到哪种方案的评估者进行评定：限制性输液组 86 人中 28 人出现并发症（33%），标准组 86 人中 44 人（51%）。限制性输液仍然显示出获益，但差距是 18 个百分点，而不是非盲评定者记录的 24 个百分点，P 值也从 0.002 升到 0.013。",
  "Unblinded, then blinded": "先非盲，后盲法",
  "The randomisation was fine and the groups were comparable. What changed is who held the pen. When the person deciding whether an ambiguous case counts as a complication knows which arm the patient was in, the borderline calls drift toward the expected answer. That drift did not invent the benefit, restrictive fluid genuinely did better, but it stretched it and made it look more certain than the blinded record supports.": "随机化没有问题，两组也具有可比性。改变的是谁拿着笔做判断。当决定一个模糊病例是否算作并发症的人知道患者属于哪个组时，边界情况的判断就会向预期的答案倾斜。这种倾斜并没有凭空制造出这一获益，限制性输液确实效果更好，但它把获益夸大了，让它看起来比盲法记录所支持的更加确定。",
  "Blinded against not": "盲法对非盲",
  "Detection bias": "检测偏倚",
  "When whoever judges the outcome knows who got the treatment, their judgement drifts toward the expected result. It rarely conjures an effect from nothing; it exaggerates a real one and lends it false certainty. The defence is to blind the assessor, which is separate from blinding patients and clinicians.": "当判断结局的人知道谁接受了治疗时，他们的判断就会向预期结果倾斜。这种偏倚很少凭空制造出一个效应，而是会夸大一个真实存在的效应，并赋予它虚假的确定性。防范的办法是对评估者实行盲法，这与对患者和临床医生实行盲法是两回事。",
  "Detection bias bites hardest on outcomes that take judgement: a wound called infected or not, a scan read as progression or not, a symptom scored on a scale. It barely touches a hard endpoint like death, taken from a registry. So the question to ask of an impressive result is not only whether the patients were blinded, but whether the person recording the outcome was.": "检测偏倚在需要判断的结局上影响最大：一处伤口算不算感染，一次扫描算不算病情进展，一个症状在量表上打多少分。它几乎影响不到死亡这类硬终点，因为死亡直接取自登记系统。所以面对一个亮眼的结果，该问的不只是患者是否接受了盲法，还要问记录结局的人是否也接受了盲法。",
  "Blinding is not one thing. Patients can be blinded so their own reports are not swayed by knowing they got the real treatment; clinicians can be blinded so the care they give does not differ; and the outcome assessor can be blinded so their reading of who improved is not coloured by which arm they are grading. A trial can manage the first two and still leak bias through the third, because most outcomes worth measuring need a human to interpret them. That is why assessor-blinding is its own line in a methods section, and why an open-label trial with a subjective endpoint should have the size of its effect discounted, not just its direction doubted.": "“盲法”并不是单一的一件事。可以对患者实行盲法，使他们自己的报告不会因为知道自己接受的是真实治疗而受到影响；可以对临床医生实行盲法，使他们提供的护理不会因此而不同；也可以对结局评估者实行盲法，使他们对谁有所改善的判断不会因所评定的是哪个组而染上色彩。一项试验可以做到前两点，却仍然可能在第三点上漏出偏倚，因为大多数值得测量的结局都需要人来解读。这正是为什么“评估者盲法”要在方法学部分单独成行，也是为什么一项采用主观终点的开放标签试验，其效应的大小应当被打折扣，而不只是对其方向表示怀疑。",
  "Not one unlucky trial": "不只是一次运气不好的试验",
  "A review paired blinded and non-blinded judgements of the same yes-or-no outcome across 21 trials and 4,391 patients. On average the non-blinded assessors exaggerated the odds ratio by 36 percent (ratio of odds ratios 0.64, 95 percent confidence interval 0.43 to 0.96). The fluid trial here was one of the 21.": "一项系统综述在 21 项试验、4,391 名患者中，将同一个是非结局的盲法判断与非盲判断两两配对比较。平均而言，非盲评估者把比值比夸大了 36%（比值比之比为 0.64，95% 置信区间 0.43 至 0.96）。这里的这项输液试验正是这 21 项试验之一。",
  "Detection bias, a reasoning trap.": "检测偏倚，一个推理陷阱。",
  "When the person scoring the result knows who got the treatment, the borderline calls slide toward the hoped-for answer. Grade the same patients blind and the effect shrinks and loses certainty. It rarely conjures a result from nothing, but it inflates one. Before believing the size of a benefit, ask who measured the outcome, and whether they knew which group they were looking at.": "当给结果打分的人知道谁接受了治疗时，边界情况的判断就会滑向他们所希望的答案。对同一批患者做盲法评定，效应就会缩小，确定性也随之下降。它很少凭空制造出一个结果，但会把一个真实的结果放大。在相信某个获益的大小之前，先问一问是谁测量了这个结局，以及他知不知道自己看的是哪一组。",
  "Everyone trusts the number. Fewer ask who measured it.": "所有人都相信这个数字。很少有人问是谁测量出来的。",
  "I trusted the number. Nobody had blinded the grader.": "我相信了这个数字。却没有人对评定者实行盲法。",
  "In an open trial of a new dressing, the surgeon who chose which patients got it also reviewed their wound photos and decided which counted as infected. The new dressing came out with far fewer infections.": "在一项关于新型敷料的开放试验中，决定哪些患者使用该敷料的外科医生，同时也负责查看他们的伤口照片，并判定哪些算作感染。新型敷料组的感染例数明显更少。",
  "Whether a borderline wound is called infected is a judgement, and the person making it knew which dressing each patient had. Have someone blinded to the dressing grade the same photos before believing the size of the gap.": "一处边界情况的伤口算不算感染是一种判断，而做这个判断的人知道每位患者用的是哪种敷料。在相信这一差距的大小之前，应该让一个不知道所用敷料的人来评定同样的照片。",
  "A physiotherapist testing her own new programme also scored each patient's mobility at the end. Her scores showed the new programme clearly beating usual care.": "一名物理治疗师在测试自己设计的新方案时，也在最后为每位患者的活动能力打分。她打出的分数显示，新方案明显优于常规护理。",
  "The person hoping the programme works is the one rating the outcome, so ambiguous movements get scored generously for her group. A blinded assessor rating the same patients is what would settle it.": "希望这个方案奏效的人，正是给结局打分的人，所以模棱两可的动作会被对她那一组更宽松地打分。让一名盲法评估者给同一批患者打分，才能解决这个问题。",
  "A radiologist was told which patients were on the new cancer drug before reading their follow-up scans. He marked the drug group as 'stable or improved' far more often than the comparison group.": "一名放射科医生在读取随访扫描之前，被告知了哪些患者在使用新的抗癌药物。他把用药组标记为“稳定或好转”的次数，远多于对照组。",
  "Reading a scan as progression or not takes interpretation, and knowing the arm tilts the close calls. Scans read blind, in a random order, are the only version worth trusting.": "判断一次扫描算不算病情进展需要解读，而知道分组情况会让接近临界的判断产生倾斜。只有以盲法、按随机顺序读取的扫描结果才值得信赖。",
  "A teacher graded her pupils' essays knowing which of them had used a new writing app she had championed. The app users scored noticeably higher, and she reported the app as a success.": "一名教师在批改学生作文时，知道其中哪些人使用了她大力推荐的新写作应用。使用该应用的学生分数明显更高，她因此把这款应用报告为成功案例。",
  "Essay marks are a judgement, and the grader both knew the groups and wanted the app to work. Marking the essays blind, with names and app-use hidden, is what would show whether the gap is real.": "作文分数是一种判断，而评分者既知道分组情况，又希望这款应用能奏效。以盲法批改作文，隐去姓名和是否使用应用的信息，才能看出这一差距是否真实。",
  "At a gymnastics meet the judges could see which athletes came from a famous academy. Those athletes received higher marks for routines that, on video review by judges who could not tell where they trained, scored about the same as everyone else's.": "在一场体操比赛中，裁判能看出哪些运动员来自一所知名训练学校。这些运动员的动作得分更高，但由分不清运动员训练来源的裁判通过录像回看评分时，这些动作的得分与其他人大致相当。",
  "Scoring a routine is a judgement call, and knowing the prestigious academy nudged it upward. The blinded video review of the same routines is the unbiased measurement.": "给一套动作打分是一种判断，而知道对方来自名校会把分数往上推。对同一套动作进行盲法录像回看评分，才是无偏的测量方式。",
  "A vet assessing whether horses were still lame knew which ones had been given a new joint supplement. She rated the supplement group as sounder, and the makers advertised the result.": "一名兽医在评估马匹是否仍然跛行时，知道哪些马服用了新的关节补充剂。她把补充剂组评为步态更健全，制造商随后拿这一结果做了广告。",
  "Grading lameness is a judgement, and the assessor knew which horses were supposed to improve. A vet blinded to which horses got the supplement, watching the same gaits, is what the claim needs.": "判断跛行程度是一种判断，而评估者知道哪些马“应该”会好转。要验证这一说法，需要一名不知道哪些马服用了补充剂的兽医，来观察同样的步态。",
  "A researcher read patients' free-text symptom diaries and coded each week as better or worse, with the treatment arm visible at the top of every page. Ambiguous weeks were coded 'better' more often for the treated patients.": "一名研究者阅读患者以自由文本记录的症状日记，并把每一周标记为好转或恶化，而每一页顶部都清楚标着治疗分组。对于接受治疗的患者，含糊不清的那些周更常被标记为“好转”。",
  "Turning a vague diary entry into better-or-worse is interpretation, and the arm label steered the doubtful ones. Coding the diaries with the arm hidden removes the tilt.": "把一条含糊的日记内容变成“好转”或“恶化”需要解读，而分组标签左右了那些拿不准的判断。隐去分组信息再对日记编码，就能消除这种倾斜。",
  "Observers scored children's classroom behaviour for a study of a new diet. They were told which children were on the diet, and recorded fewer disruptive episodes for that group.": "在一项关于新饮食方案的研究中，观察员为儿童的课堂行为打分。他们被告知了哪些孩子在采用这种饮食，并为这一组记录了更少的扰乱课堂事件。",
  "Whether a fidget counts as a disruptive episode is a judgement, and knowing who was on the diet shaded it. Observers blinded to the diet, scoring the same footage, are what a real test requires.": "一个小动作算不算扰乱课堂事件是一种判断，而知道谁在采用这种饮食会给这个判断蒙上一层色彩。真正的检验需要不知道饮食分组的观察员，来给同样的录像打分。",
  "An endoscopist assessing whether ulcers had healed could see, on each patient's chart, which drug they had received. He judged more ulcers 'healed' in the new-drug group.": "一名内镜医生在评估溃疡是否已经愈合时，能在每位患者的病历上看到他们用的是哪种药物。他判定新药组“已愈合”的溃疡例数更多。",
  "Calling an ulcer healed or not is an interpretation, and the visible drug name nudged the borderline ones. The images should be read by someone who cannot tell which drug the patient took.": "判断一处溃疡是否已经愈合是一种解读，而看得见的药物名称会把边界情况的判断往一个方向推。这些图像应当由分不清患者用了哪种药物的人来阅读。",
  "A dermatologist rated the severity of patients' rashes on a ten-point scale, aware of which cream each had been given. The trial cream's patients were scored two points milder on average.": "一名皮肤科医生在十分制量表上为患者的皮疹严重程度打分，同时知道每位患者用的是哪种药膏。试验药膏组患者的平均得分低两分。",
  "A severity score is a judgement, and knowing the cream drew the ratings toward the hoped-for answer. A rater blinded to the cream, scoring the same rashes, is what would show the true difference.": "严重程度评分是一种判断，而知道用的是哪种药膏会把评分拉向人们所希望的答案。让一名不知道药膏分组的评分者对同样的皮疹打分，才能显示出真正的差异。",
  "In a heart-drug trial, every suspected heart attack was judged by an independent committee working from anonymised records that never revealed which drug the patient had taken. The drug group had fewer confirmed heart attacks.": "在一项心脏病药物试验中，每一例疑似心脏病发作都由一个独立委员会根据匿名化的病历进行判断，这些病历从未透露患者用的是哪种药物。用药组确诊的心脏病发作例数更少。",
  "The people deciding the outcome could not tell the groups apart, so their judgement cannot have been swayed by expectation. This is exactly how a subjective outcome should be assessed.": "决定这一结局的人无法分辨两组，因此他们的判断不可能受到预期的左右。这正是主观结局应有的评估方式。",
  "An open-label trial could not blind patients or doctors, but its only outcome was death from any cause, taken from the national death registry. The treated group had fewer deaths.": "一项开放标签试验无法对患者或医生实行盲法，但它唯一的结局是全因死亡，数据取自全国死亡登记系统。治疗组的死亡人数更少。",
  "Death recorded by a registry needs no interpretation, so it does not matter that everyone knew the assignment. For a hard endpoint like this, an unblinded assessor cannot bend the result.": "登记系统记录的死亡不需要任何解读，所以每个人都知道分组情况其实并不要紧。对于这样一个硬终点，非盲评估者也无法扭曲结果。",
  "A blood-pressure study used a validated monitor that recorded each reading and uploaded it automatically, with no clinician deciding or transcribing the number, even though staff knew who was on the drug.": "一项血压研究使用了一台经过验证的监测仪，它会自动记录并上传每一次读数，不需要任何临床医生来判断或誊写这个数字，尽管工作人员知道谁在用药。",
  "No human judged the outcome, so knowing the group could not colour it. Automating the measurement removes the room for an assessor's expectation to creep in.": "没有人来判断这一结局，所以知道分组情况也无法给它染色。把测量过程自动化，就消除了评估者的预期渗入其中的空间。",
  "The same 172 patients (86 per arm) had their postoperative complications judged both by an assessor blinded to the fluid regimen and, unblinded, by the local investigators. The intention-to-treat Results print both: unblinded, 27 of 86 (31 percent) on restrictive fluid versus 47 of 86 (55 percent) on standard, P = 0.002; blinded, 28 (33 percent) versus 44 (51 percent), P = 0.013. Every count matches its printed percentage, at 86 patients per arm. Blinding narrows the difference from 24 to 18 percentage points and widens the p-value: it right-sizes a real effect rather than erasing it. The 36 percent figure in the deep-dive is Hrobjartsson 2012, which included this trial among its 21.": "同样的 172 名患者（每组 86 人），他们的术后并发症分别由一名对输液方案实行盲法的评估者，和非盲的本地研究者进行了判断。意向性治疗结果部分把两者都列了出来：非盲情况下，限制性输液组 86 人中 27 人（31%），标准组 86 人中 47 人（55%），P = 0.002；盲法情况下，28 人（33%）比 44 人（51%），P = 0.013。每一个计数都与所印出的百分比相符，每组86例。盲法把差距从 24 个百分点收窄到 18 个百分点，并使 P 值增大：这是把一个真实的效应调整到应有的大小，而不是把它抹去。深度解析里提到的 36% 这个数字来自 Hrobjartsson 2012 年的研究，该研究纳入的 21 项试验中就包括这一项。",

  // ---- Statistical versus clinical significance puzzle + review items ----
  "A flu drug beats placebo with P < 0.001, from every trial ever run on it. Governments stockpiled billions. Convinced?": "一种流感药物，在为它做过的每一项试验中都以 P < 0.001 击败了安慰剂。各国政府因此囤积了数十亿剂。你被说服了吗？",
  "Reviewers obtained the full clinical study reports, not just the published papers, and pooled them. Adults given the drug got better sooner than adults given placebo, and the whole confidence interval sits clear of no difference.": "审阅者拿到的是完整的临床研究报告，而不只是已发表的论文，并把它们合并在一起分析。服药的成年人比服用安慰剂的成年人更快好转，而且整个置信区间都完全落在“无差异”之外。",
  "How much should this change what you do?": "这应该在多大程度上改变你的做法？",
  "Time to first relief of flu symptoms, hours saved": "流感症状首次缓解所需时间，节省的小时数",
  "hours": "小时",
  "P < 0.001": "P < 0.001",
  "From the full trial reports, adults": "根据完整的试验报告，成年人",
  "No difference": "无差异",
  "Flu without the drug": "不用药的流感",
  "Flu with the drug": "用药的流感",
  "of the illness": "占病程的比例",
  "It works, so take it": "有效，那就该用它",
  "the evidence is overwhelming": "证据压倒性地充分",
  "The result must be an artefact": "这个结果一定是假象",
  "no real effect at all": "根本没有真实效应",
  "Real, and far too small to matter": "真实存在，但小到无关紧要",
  "certain is not the same as useful": "确定不等于有用",
  "It is certainly real. It is also about sixteen hours.": "它确实是真实的。也不过大约十六个小时。",
  "Significant answers a different question": "显著回答的是另一个问题",
  "Flu runs about seven days. The drug takes it to six and a bit: 16.8 hours off 168, which is a tenth of the illness. The reviewers put it plainly, that the drug modestly shortens symptoms, and in the same breath that it causes nausea and vomiting. One extra person vomits for every 22 treated.": "流感大约持续七天。这种药把病程缩短到六天多一点：从 168 小时中减去 16.8 小时，正好是病程的十分之一。审阅者说得很直白，这种药能适度缩短症状，但同一句话里也说它会引起恶心和呕吐。每治疗 22 人，就多出 1 人呕吐。",
  "Nothing was recalculated between these two pictures. The estimate, the interval and the p-value are identical; only what they are measured against changed. A p-value answers whether a difference could plausibly be chance, and with enough patients even a trivial difference cannot be. It never answers whether the difference is worth having. That question needs a size and a yardstick, and the yardstick has to come from outside the statistics.": "这两幅图之间没有重新计算过任何东西。估计值、区间和 P 值完全相同，变化的只是它们所对照的对象。P 值回答的是这个差异是否有可能只是巧合，而只要患者足够多，哪怕微不足道的差异也不可能只是巧合。它从来回答不了这个差异是否值得拥有。那个问题需要一个大小，还需要一把尺子，而这把尺子必须来自统计学之外。",
  "The same number, other ruler": "同一个数字，另一把尺子",
  "Statistical versus clinical significance": "统计学显著性与临床意义",
  "A small p-value means an effect is probably not chance. It says nothing about whether the effect is big enough to care about. Sample size buys certainty, never importance, so always ask for the size of the difference and what would count as a difference worth having.": "一个很小的 P 值意味着某种效应大概不是巧合。它丝毫说明不了这个效应是否大到值得在意。样本量买来的是确定性，从来买不来重要性，所以永远都要追问差异的大小，以及多大的差异才算得上值得拥有。",
  "The two questions get answered by different numbers. Could this be chance is answered by the p-value and the confidence interval. Is this worth having is answered by the effect size, set against something that matters: how long the illness lasts, how bad the symptoms are, what the treatment costs you in side effects. A result can be emphatic on the first and pitiful on the second, and press releases have every incentive to quote only the first.": "这两个问题由不同的数字来回答。“这会不会只是巧合”由 P 值和置信区间来回答。“这值不值得拥有”则由效应量来回答，而且要拿它去对照某个真正重要的东西：病程有多长、症状有多严重、治疗带来的副作用要付出什么代价。一个结果可能在第一个问题上斩钉截铁，在第二个问题上却乏善可陈，而新闻通稿有充分的动机只引用第一个。",
  "A p-value is a statement about how easily chance could produce the difference you saw, and it depends on the size of the study as much as on the size of the effect. Quadruple the patients and the same trivial difference has a p-value four times more impressive, because the estimate is that much more precisely pinned down. Push the numbers far enough and any difference at all, however meaningless, becomes highly significant. That is not a flaw in the arithmetic, it is what the arithmetic was built to do: separate signal from noise, and nothing more. The consequence is a habit worth keeping for life. When you meet a significant result, do not ask how significant. Ask how big, in units you can picture, and against what. If nobody has told you what size of difference would have been worth the trouble, the significance on its own has not told you anything you can act on.": "P 值说明的是巧合有多容易产生你看到的这个差异，它既取决于效应的大小，也同样取决于研究的规模。把患者人数翻两番，同样微不足道的差异，P 值会显得漂亮四倍，因为估计值被固定得精确了那么多。把数字推得足够远，任何差异，不管多么没有意义，都会变得高度显著。这不是算术上的缺陷，而正是这套算术被设计出来要做的事：把信号从噪声中分离出来，仅此而已。由此得到的一个终身受用的习惯是：遇到一个显著的结果时，不要问它有多显著。要问它有多大，用你能想象出来的单位来衡量，并且对照着什么。如果没有人告诉过你多大的差异才算值得费这个劲，那么单凭“显著”本身，并没有告诉你任何可以据以行动的东西。",
  "The bar the field set, and the result that missed it": "这个领域自己定下的门槛，以及没能达到它的结果",
  "A meta-analysis of every antidepressant trial submitted to the American regulator found the drugs beat placebo with high confidence, by 1.80 points on a depression scale. The guideline body's own threshold for a difference that matters clinically was three points, so the authors reported an effect that was statistically certain and below the bar its own field had set. Two questions, two answers, and only one of them was in the headline.": "一项针对提交给美国监管机构的每一项抗抑郁药试验所做的荟萃分析发现，这些药物以很高的置信度胜过安慰剂，在一个抑郁量表上高出 1.80 分。而指南制定机构自己定下的、具有临床意义的差异门槛是 3 分，所以作者报告的效应在统计上确定无疑，却低于这个领域自己设下的门槛。两个问题，两个答案，而标题里只出现了其中一个。",
  "Statistical versus clinical significance, a reasoning trap.": "统计学显著性与临床意义，一个推理陷阱。",
  "A tiny p-value means a difference is probably not a fluke. It does not mean the difference is big enough to bother with. Study enough people and even a pointless difference becomes highly significant, because certainty is what sample size buys. Before believing a result matters, ask how large it is in units you can picture, and what size would have been worth having.": "一个极小的 P 值意味着某个差异大概不是侥幸。它并不意味着这个差异大到值得费心。研究的人数足够多，哪怕毫无意义的差异也会变得高度显著，因为样本量买来的正是确定性。在相信一个结果真的重要之前，先问一问它用你能想象的单位衡量有多大，以及多大的差异才算得上值得拥有。",
  "Everyone reads the p-value. Almost nobody asks how big.": "所有人都会去看 P 值。几乎没有人会问它有多大。",
  "P less than 0.001, I said. It was sixteen hours.": "我说过，P 小于 0.001。它是十六个小时。",
  "The BMJ abstract prints the treatment effect in adults as a reduction in time to first alleviation of symptoms of 16.8 hours (95 percent confidence interval 8.4 to 25.1), P < 0.001, and the harms as nausea (risk difference 3.66 percent, number needed to harm 28) and vomiting (4.56 percent, number needed to harm 22). The Cochrane review of the same dataset expresses the same benefit as a fall from 7 days to 6.3 days, which is where the 168-hour illness in the figure comes from; 168 minus 16.8 is 151.2 hours, or 6.3 days, and 16.8 is exactly a tenth of 168. Two honesty notes. The 7-day figure is the review's own description of the untreated illness rather than a separately measured mean with its own interval, so the second panel is drawn to the review's stated baseline. And the reviewers' conclusion is that the drug modestly shortens symptoms while causing nausea and vomiting, not that it does nothing: the lesson here is about the size of a real effect, not about denying it.": "《英国医学杂志》（BMJ）的摘要把成年人身上的治疗效果记为：症状首次缓解时间缩短 16.8 小时（95% 置信区间 8.4 至 25.1），P < 0.001；危害则为恶心（风险差 3.66%，需要伤害的人数为 28）和呕吐（4.56%，需要伤害的人数为 22）。Cochrane 对同一数据集的综述，把同样的获益表述为病程从 7 天缩短到 6.3 天，图中那个 168 小时的病程正是由此而来：168 减去 16.8 等于 151.2 小时，也就是 6.3 天，而 16.8 恰好是 168 的十分之一。这里有两点需要坦白说明。7 天这个数字是该综述对未治疗病程的自述，而不是另有一个带着自己置信区间的实测均值，所以第二幅图是按综述所给的基线画出来的。而且审阅者的结论是这种药能适度缩短症状，同时引起恶心和呕吐，而不是它毫无作用：这里的教训是关于一个真实效应的大小，而不是要否认它。",
  "A company tested a redesign on 4 million users and reported that it loaded significantly faster, p < 0.0001. The press release calls it a major speed improvement. The measured difference is 3 milliseconds.": "一家公司在400万名用户身上测试了一次改版，报告称页面加载速度显著更快，p < 0.0001。新闻稿称其为一次重大的速度提升。而实测的差异是3毫秒。",
  "With 4 million users even a 3 millisecond difference is far too consistent to be chance, so the tiny p-value is guaranteed. Nobody can perceive 3 milliseconds, so the result is certain and worthless.": "在400万用户的规模下，哪怕是3毫秒的差异也太过一致，不可能是巧合，所以那个微小的 P 值是必然的。没有人能感知到3毫秒，所以这个结果确定无疑，却毫无价值。",
  "A weight-loss programme trialled in 30,000 people reports that participants lost significantly more than controls, p < 0.001, and markets itself on that result. Over a year the difference averaged 400 grams.": "一项在 30,000 人中试验的减重项目报告说，参与者比对照组减重显著更多，p < 0.001，并以此作为营销卖点。一年下来，平均差异是400克。",
  "A 400 gram difference over a year is of no health consequence, but with 30,000 people it is measured precisely enough to be highly significant. The p-value confirms the difference is real, not that it is worth the effort.": "一年下来400克的差异对健康毫无影响，但在 30,000 人的规模下，它被测量得足够精确，从而变得高度显著。P 值证实的是这个差异确实存在，而不是它值得为此付出努力。",
  "A supplement lowered blood pressure by 0.6 mmHg more than placebo in a trial of 50,000 adults, p < 0.001. An advert says it is clinically proven to lower blood pressure, without naming the number.": "一项针对 50,000 名成年人的试验发现，一种保健品比安慰剂多降低了0.6 mmHg的血压，p < 0.001。广告称其“经临床证实可以降低血压”，却没有说出这个数字。",
  "Guidelines treat blood pressure changes of a few mmHg as the smallest worth acting on, so 0.6 is negligible, but 50,000 people make it statistically certain. The claim leans entirely on significance and hides the size.": "指南把几个 mmHg 的血压变化视为值得采取行动的最小幅度，所以0.6可以忽略不计，但 50,000 人的规模让它在统计上确定无疑。这个宣传完全依赖“显著性”，却把大小藏了起来。",
  "An education study of 100,000 pupils found that an online tutoring add-on raised exam marks by a statistically significant amount, p < 0.001, and a minister cites it as proof the programme works. The gain was 0.3 marks out of 100.": "一项涵盖 100,000 名学生的教育研究发现，一项在线辅导附加课程把考试分数提高了具有统计学意义的幅度，p < 0.001，一位部长以此作为该项目有效的证据。而这个提升是 100 分中的 0.3 分。",
  "A third of a mark out of a hundred changes nothing for any pupil, yet 100,000 of them pin the estimate down tightly enough to be highly significant. Significance is being used as a stand-in for a benefit nobody has shown.": "满分 100 分中 0.3 分的提升，对任何一名学生来说都不会有什么改变，但 100,000 人的规模，让这项估计被钉得足够精确，使其变得高度显著。“显著”被用来冒充一个从未被真正证明过的好处。",
  "Researchers report a significant association between a food and a blood marker in 500,000 people, with a vanishingly small p-value. A news story says the food strongly affects the marker. The correlation is 0.01.": "研究者在 500,000 人中报告了一种食物与某项血液指标之间存在显著关联，P 值小到近乎消失。一则新闻报道说这种食物会强烈影响该指标。而相关系数是0.01。",
  "A correlation of 0.01 explains essentially none of the variation, but half a million people make even that distinguishable from zero many times over. The extreme p-value reflects the sample size, not the strength of the link.": "0.01的相关系数几乎解释不了任何变异，但五十万人的规模，能把这么小的一个数字与零区分开来，而且能反复区分很多次。这个极端的 P 值反映的是样本量，而不是这种关联的强弱。",
  "A mattress company's study of 80,000 sleepers found their model gave significantly more sleep than a standard one, p < 0.001, and the packaging says so. The extra sleep averaged 90 seconds a night.": "一家床垫公司对 80,000 名睡眠者做的研究发现，他们的床垫型号比标准型号能显著增加睡眠时间，p < 0.001，包装上也这么写着。平均每晚多睡90秒。",
  "Ninety seconds is well below any amount a sleeper would notice or benefit from, yet 80,000 people make it a highly significant difference. The claim rests on the p-value and never mentions the size.": "90秒远远低于任何睡眠者能察觉或受益的量，但 80,000 人的规模，让它变成了一个高度显著的差异。这个宣传全靠 P 值撑腰，却始终没有提到差异的大小。",
  "A fuel additive tested across 200,000 journeys significantly improved fuel economy, p < 0.001. The manufacturer advertises proven savings. The improvement was 0.1 percent, and the additive costs more than that.": "一种燃油添加剂在 200,000 次行程中做了测试，显著改善了燃油经济性，p < 0.001。制造商宣传这是经过验证的省油效果。而这个改善幅度是0.1%，添加剂本身的成本却比省下来的还要高。",
  "The improvement is real and precisely measured, which is what the p-value shows, but at 0.1 percent it costs more than it saves. Statistical significance says the effect exists, not that it is worth buying.": "这个改善是真实的，而且测量得很精确，这正是 P 值所显示的，但按0.1%来算，它花掉的钱比省下来的还多。统计学显著性说明的是这种效应存在，而不是它值得购买。",
  "A hospital reports that a new triage system significantly reduced waiting times across 300,000 attendances, p < 0.001, and the board declares the rollout a success. Average waits fell from 247 minutes to 245.": "一家医院报告说，一套新的分诊系统在 300,000 人次就诊中显著缩短了等待时间，p < 0.001，董事会宣布此次推行取得成功。平均等待时间从247分钟降到245分钟。",
  "Two minutes off a four-hour wait is nothing to a patient, but 300,000 attendances make it statistically unmistakable. The board has read certainty as importance.": "从近四小时的等待中减去两分钟，对患者来说什么都不算，但 300,000 人次的规模，让它在统计上明白无误。董事会把“确定”误读成了“重要”。",
  "A painkiller beat placebo on a 0 to 100 pain scale in 25,000 patients, p < 0.001, and is promoted on that basis. The difference was 1.5 points, and researchers in the field treat about 10 points as the smallest change patients notice.": "一种止痛药在 25,000 名患者中，于一个 0 到 100 的疼痛量表上胜过了安慰剂，p < 0.001，并以此作为宣传依据。差异是 1.5 分，而该领域的研究者认为大约 10 分才是患者能察觉的最小变化。",
  "The field already has a yardstick, roughly 10 points, and 1.5 falls far below it. The large trial makes that small difference statistically certain without making it perceptible to anyone.": "这个领域早已有了一把尺子，大约 10 分，而 1.5 分远远达不到这个门槛。这项大型试验让这个微小的差异在统计上确定无疑，却没有让它变得任何人都能察觉。",
  "A phone maker tested a software update on 2 million handsets and reported significantly longer battery life, p < 0.0001, headlining the update. Screen-on time rose by 40 seconds.": "一家手机厂商在200万部手机上测试了一次软件更新，报告称电池续航显著延长，p < 0.0001，并把它作为这次更新的头条卖点。屏幕点亮时间增加了40秒。",
  "Forty seconds of screen time is imperceptible over a day, yet two million handsets make the measurement precise enough for an extreme p-value. The headline reports how sure they are, not how much it helps.": "40秒的屏幕点亮时间，摊到一整天里根本感觉不出来，但200万部手机的规模，让这次测量精确得足以产生一个极端的 P 值。这条头条讲的是他们有多确定，而不是这能带来多大帮助。",
  "A trial reports that its drug improved walking distance by 68 metres, states that researchers in the field regard 30 metres as the smallest improvement patients notice, and concludes the benefit is both statistically and clinically meaningful.": "一项试验报告说，它的药物把步行距离提高了68米，并说明该领域的研究者认为30米是患者能察觉的最小改善，由此得出结论：这个获益在统计学上和临床上都有意义。",
  "The report gives the size of the effect, names an external yardstick, and shows the effect clears it. That is exactly the pair of questions a result should answer, so nothing is being smuggled past the reader.": "这份报告给出了效应的大小，指明了一把外部的尺子，并证明这个效应越过了它。这正是一个结果应该回答的那一对问题，所以没有任何东西被偷偷绕过了读者。",
  "A very large study finds a statistically significant difference and its authors write that, although the p-value is small, the difference is too slight to change practice, and recommend against acting on it.": "一项规模很大的研究发现了一个具有统计学意义的差异，作者写道，虽然 P 值很小，但这个差异太过微小，不足以改变临床实践，因此不建议据此采取行动。",
  "The authors separate the two questions properly: the effect is real, and it is not worth acting on. Declining to convert a small p-value into a recommendation is the careful move, not the trap.": "作者把这两个问题恰当地分开了：这个效应是真实的，但不值得据此采取行动。拒绝把一个很小的 P 值直接换算成一条建议，这才是谨慎的做法，而不是陷阱。",
  "A small trial finds a promising-looking improvement that does not reach statistical significance, and the authors report the estimate with a wide confidence interval, saying the study cannot rule out either a useful benefit or no benefit at all.": "一项小型试验发现了一个看起来很有希望的改善，但没有达到统计学意义，作者用一个很宽的置信区间报告了这个估计值，并说明这项研究既不能排除存在有用的获益，也不能排除完全没有获益。",
  "A non-significant result from a small study means the question is unsettled, not that the treatment fails. Reporting the wide interval instead of claiming no effect is the honest reading.": "一项小型研究得出的不显著结果，意味着这个问题尚无定论，而不是说这种治疗无效。报告那个宽区间，而不是宣称没有效果，才是诚实的解读。",
  "Against no difference": "对照“无差异”",
  "Against what it should fix": "对照它本该解决的问题",

  // ---- Simpson paradox: the third, cautious-sounding choice ----
  "Neither yet": "现在还不能选",
  "ask how the patients were split first": "先问患者是怎么分配的",

  // ---- Ecological fallacy puzzle + review items ----
  "In 1930, American states with more immigrants had less illiteracy. So immigrants could read better than the locals?": "1930 年，美国移民较多的州文盲率更低。难道移民比本地人更识字？",
  "One census, 48 states. For each state, the share of people born abroad and the share who could not read. The more foreign born a state was, the lower its illiteracy, and the pattern is strong enough that people have been quoting it ever since.": "同一次人口普查，48 个州。对每个州，分别统计在外国出生者的比例与不识字者的比例。一个州的外国出生者比例越高，文盲率就越低，这一模式强到人们至今仍在引用它。",
  "What does that tell you about immigrants?": "这告诉了你关于移民的什么？",
  "Born abroad and unable to read, 1930 census": "在外国出生与不识字，1930 年人口普查",
  "Could not read or write": "不会读也不会写",
  "One dot would be one state": "每个点代表一个州",
  "Share of the state born abroad": "该州在外国出生者的比例",
  "Illiteracy": "文盲率",
  "The slope is drawn from the published correlation. Robinson printed the coefficient, never the figures for each state, so plotting dots here would be inventing them.": "这条斜线是依据已发表的相关系数画出的。罗宾逊只公布了这个系数，从未公布各州的具体数字，因此在这里画出散点等于是在凭空捏造它们。",
  "Counts in thousands of people, from the paper's own table.": "人数以千人为单位，数据取自论文本身的表格。",
  "People born abroad": "在外国出生的人",
  "Born abroad": "在外国出生",
  "People born in the country": "在本国出生的人",
  "Born here": "在本地出生",
  "Immigrants read better": "移民更识字",
  "the states full of them read better": "移民聚集的那些州更识字",
  "Nothing, the pattern is noise": "什么也说明不了，这个模式只是噪音",
  "a coincidence across 48 states": "只是 48 个州之间的巧合",
  "Nothing about any person": "对任何个人都说明不了什么",
  "this compares places, not people": "这比较的是地方，不是人",
  "Count people instead of states and it turns the other way.": "换成按人计数而不是按州计数，结果就反过来了。",
  "Places are not people": "地方不是人",
  "In the same census, 1,304 of every 13,217 people born abroad could not read, against 2,614 of every 84,055 born in the country. That is about 10 per cent against 3, so immigrants were around three times as likely to be illiterate, not less. Across states the correlation is -.53; across people it is +.12.": "在同一次人口普查中，每 13,217 名在外国出生的人里有 1,304 人不识字，而每 84,055 名在本国出生的人里只有 2,614 人不识字。那大约是 10% 对 3，所以移民不识字的可能性大约是本地人的三倍，而不是更低。按州计算，相关系数是 -.53；按人计算，则是 +.12。",
  "Both numbers are right, and they are answers to different questions. Immigrants settled where the work was, and those states also had the money and the schools that kept everyone else's illiteracy low. So a state's immigrant share tracked its wealth, and its wealth tracked its literacy, while inside every state the immigrants themselves were the ones more likely to be unable to read. Nothing about the state-level line was ever a claim about a person.": "两个数字都没有错，它们只是在回答不同的问题。移民定居在有工作机会的地方，而这些州恰好也有更多的钱和学校，使其他所有人的文盲率保持在低水平。于是一个州的移民比例与它的财富同步，它的财富又与它的识字率同步，而在每一个州内部，移民自己恰恰是更可能不识字的那一群人。州一级的那条线，从来都不是在对某个人下结论。",
  "Same census, other unit": "同一次人口普查，另一种单位",
  "The ecological fallacy": "生态学谬误",
  "A relationship measured between groups need not hold, and can run backwards, inside them. If the rows in your table are places, schools or countries, the finding is about places, schools or countries, and carrying it down to a person is a separate claim that needs its own evidence.": "在群体之间测得的一种关系，未必在群体内部依然成立，甚至可能方向相反。如果表格中的每一行是地方、学校或国家，那么这个发现说的就是地方、学校或国家，把它套用到某个人身上是另一个独立的主张，需要自己的证据。",
  "The tell is the unit of analysis: ask what one row of the data actually is. Averages per country, per region, per hospital or per school are convenient because they are published, but a pattern among averages can be produced entirely by which people ended up where. The same trap runs the other way too, so a pattern among individuals need not reappear when they are grouped.": "识破它的关键是分析单位：问一问数据里的每一行到底是什么。按国家、按地区、按医院或按学校计算的平均值之所以方便，是因为它们是公开发表的，但平均值之间的模式完全可能只是由哪些人恰好落在了哪里所造成的。同样的陷阱反过来也成立，个体之间的模式，在被分组之后也未必会重新出现。",
  "Picture two states. One is rich, with good schools, and attracts most of the immigrants; almost everyone there can read, immigrants slightly less often than the rest. The other is poor, has few immigrants, and much of its population never finished school. Plot the two states and you get a clean downward line: more immigrants, less illiteracy. Now pool the people and count them one by one, and the immigrants come out worse, because within each state they always were. The state-level line was never measuring immigrants at all. It was measuring the difference between a rich state and a poor one, with the immigrant share acting as a marker for which was which. This is why the fallacy is so easy to commit with published statistics: aggregated tables are what governments release, so the temptation is to answer a question about people using the only data on the shelf.": "设想两个州。一个富裕，学校办得好，吸引了大部分移民；那里几乎人人识字，移民识字率只比其他人略低一点。另一个贫穷，移民很少，很大一部分人口从未读完学业。把这两个州画出来，你会得到一条干净的下降线：移民越多，文盲率越低。现在把人合并起来一个一个地数，移民反而表现更差，因为在每一个州内部，他们一直都是更差的那一群。州一级的那条线，从来都不是在衡量移民本身，它衡量的是一个富州和一个穷州之间的差异，移民比例只是标记哪个州是哪个州的一个记号。这正是为什么用已发表的统计数据很容易犯下这种谬误：汇总表格正是政府发布的东西，于是人们很容易忍不住，用手头唯一的数据去回答一个关于人的问题。",
  "The correction that left the lesson standing": "更正了数字，却没有推翻这堂课",
  "In 2011 a re-analysis found Robinson had used the wrong state-level figures, and that the correlation across states is nearer -0.46 than the -0.53 he printed. The number moved, the reversal did not: across states the relationship still runs one way and across people the other. A textbook case is more useful when its arithmetic has been checked than when it is merely repeated.": "2011 年一项重新分析发现，罗宾逊当年使用的州一级数字有误，各州之间的相关系数更接近 -0.46，而不是他公布的 -0.53。数字变了，反转没有变：按州计算，这种关系仍朝一个方向走；按人计算，则朝另一个方向走。一个教科书式的案例，在算术被核实过之后，比仅仅被反复引用更有价值。",
  "The ecological fallacy, a reasoning trap.": "生态学谬误，一个推理陷阱。",
  "A pattern found by comparing places can reverse completely when you count people instead. Areas with more immigrants had less illiteracy, yet immigrants themselves were three times likelier to be unable to read, because they settled where the schools were good. Before believing a statistic about people, check whether the rows in the table were people at all.": "通过比较地方而找到的一种模式，一旦换成按人计数，可能会完全反转。移民更多的地区文盲率更低，然而移民自己不识字的可能性却是别人的三倍，因为他们定居在学校办得好的地方。在相信一个关于人的统计数字之前，先查一查表格里的每一行是不是真的是人。",
  "Same census, opposite answer. Depends what you count.": "同一次人口普查，答案却相反。取决于你数的是什么。",
  "I read a fact about states as a fact about people.": "我把一个关于州的事实，当成了一个关于人的事实。",
  "The person-level counts are Robinson's own, in thousands: 1,304 illiterate of 13,217 born abroad and 2,614 of 84,055 born in the country, which give 9.9 per cent against 3.1 and reproduce the +.118 he prints. The outcome is illiteracy, not literacy, which is why the individual figure is positive. Robinson prints -.526 across the 48 states and -.619 across the nine census divisions. Two honesty notes. The state-level figure is authored here as the coefficient rather than as points, because he published the correlation and never the per-state figures, so the setup draws a slope and says so on the figure rather than inventing a scatter. And te Grotenhuis and colleagues showed in 2011 that his state-level data were wrong and the correlation is nearer -0.46; the reversal between the two levels survives the correction, which is the only thing this puzzle claims.": "个体层面的数字是罗宾逊本人给出的，以千人为单位：在外国出生的 13,217 人中有 1,304 人不识字，在本国出生的 84,055 人中有 2,614 人不识字，得出 9.9% 对 3.1，重现了他公布的 +.118。结局变量是文盲率而不是识字率，这就是为什么个体层面的数字是正的。罗宾逊公布的相关系数，在 48 个州之间是 -.526，在九个人口普查分区之间是 -.619。这里有两点诚实说明。州一级的数字，在这里是以系数的形式呈现，而不是以散点的形式，因为他公布的是相关系数，从未公布各州的具体数字，所以本设置画出的是一条斜线，并在图上明确说明这一点，而不是凭空编造一组散点。另外，te Grotenhuis 及其同事在 2011 年指出，他的州一级数据有误，相关系数更接近 -0.46；这一反转经过更正后，在两个层面之间依然成立，而这正是本谜题唯一要证明的事。",
  "Countries that eat more sugar have higher rates of a disease. A columnist tells readers that eating sugar raises their personal risk, citing the country comparison as the evidence.": "吃糖更多的国家，某种疾病的发病率更高。一位专栏作者告诉读者，吃糖会提高他们的个人患病风险，并把国家间的比较作为证据。",
  "The rows in that table are countries, not people. Rich countries differ from poor ones in dozens of ways at once, so the line across them may not hold for any individual. A claim about a person needs data measured on people.": "那张表格里的每一行是国家，不是人。富国和穷国同时在几十个方面存在差异，所以国家之间的这条线未必对任何一个人成立。一个关于人的主张，需要以人为单位测得的数据。",
  "Schools with more spending per pupil get better average exam results, so a council concludes that spending more on any given child will raise that child's marks.": "生均经费更高的学校，平均考试成绩更好，于是一个教育委员会得出结论：给任何一个孩子多花钱，都会提高这个孩子的分数。",
  "The comparison is between schools, and schools differ in intake as well as budget. Well-funded schools often sit in wealthier areas, so the pattern can be about which children attend rather than about what an extra pound does for one of them.": "这里比较的是学校，而学校之间的差异不只在预算，也在生源。经费充足的学校往往位于更富裕的地区，所以这个模式可能反映的是哪些孩子在这所学校就读，而不是多花一英镑对其中某个孩子的作用。",
  "Richer regions vote for one party more often, so an analyst writes that richer voters back that party. No individual-level survey is cited.": "更富裕的地区更常投票给某一个政党，于是一位分析师写道，更富裕的选民支持这个政党。文中没有引用任何个体层面的调查。",
  "A region's average income and an individual's income are different variables. The regional pattern can run one way while richer individuals inside those regions vote the other way, which is exactly what has been found in some countries.": "一个地区的平均收入和一个人的收入，是两个不同的变量。地区层面的模式可以朝一个方向走，而这些地区内部更富裕的个人投票却朝另一个方向走，这正是一些国家已经发现的情况。",
  "Hospitals with more nurses per bed have lower average death rates, and a manager concludes that any individual patient given more nursing attention is less likely to die.": "每张病床配备护士更多的医院，平均死亡率更低，一位管理者据此得出结论：给任何一个病人更多的护理关注，都会降低这个病人的死亡风险。",
  "The unit here is the hospital. Better staffed hospitals also tend to be better funded and to treat different case mixes, so the between-hospital pattern is not by itself a statement about what happens to one patient.": "这里的分析单位是医院。人手更充足的医院往往也资金更充裕，收治的病例构成也不同，所以医院之间的这个模式，本身并不能说明发生在某一个病人身上的事。",
  "Towns with cleaner air have longer average life expectancy, so a report states that breathing cleaner air will add years to a reader's life, using only the town-level figures.": "空气更清洁的城镇，平均预期寿命更长，一份报告仅凭镇一级的数字就宣称，呼吸更清洁的空气会为读者的寿命多添几年。",
  "Towns with clean air differ from others in wealth, occupation and smoking as well. The town-level association can be produced by who lives where, so it cannot on its own quantify what cleaner air does for one person.": "空气清洁的城镇，在财富、职业和吸烟状况上也与其他城镇不同。镇一级的这种关联，可能只是由谁住在哪里造成的，因此它本身无法量化更清洁的空气对某一个人到底有什么作用。",
  "Across 30 countries, average height rises with average dairy consumption, and a magazine advises readers that drinking more milk will make them taller, citing that country chart.": "在 30 个国家之间，平均身高随人均乳制品消费量上升而升高，一本杂志援引这张国家图表，建议读者多喝牛奶会让他们长得更高。",
  "Each point is a whole country, so the chart compares national averages shaped by genetics, wealth and childhood nutrition together. Turning it into personal advice treats a fact about countries as a fact about a body.": "图上的每一个点都是一整个国家，所以这张图比较的是由基因、财富和童年营养共同塑造出来的国家平均值。把它变成个人建议，就是把一个关于国家的事实，当成了一个关于某个身体的事实。",
  "Neighbourhoods with more young men have more recorded crime, and a report concludes that a given young man is more likely to be an offender than a given older resident, using only the neighbourhood totals.": "年轻男性更多的社区，记录在案的犯罪也更多，一份报告仅凭社区总量数据就得出结论：一个特定的年轻男性，比一个特定的年长居民更可能是罪犯。",
  "The data counts neighbourhoods, so it cannot say who committed the crimes. Areas with young populations also tend to differ in income and housing, and the individual claim needs individual records.": "这些数据统计的是社区，因此说不出是谁犯下了这些罪行。年轻人口较多的地区，在收入和住房上往往也存在差异，个体层面的主张需要个体层面的记录。",
  "Teams with more experienced staff ship fewer bugs on average, so a director tells one junior engineer that their individual bug rate must be the reason their team struggles.": "员工经验更丰富的团队，平均发布的缺陷更少，一位总监告诉一名初级工程师，他个人的缺陷率一定就是他所在团队表现不佳的原因。",
  "The pattern is measured across teams, which differ in the difficulty of what they build as well as in experience. Nothing in a team-level average identifies which person produced which defect.": "这个模式是在团队之间测得的，而团队之间不仅经验不同，所做工作的难度也不同。团队层面的平均值里，没有任何信息能指出是哪个人产生了哪个缺陷。",
  "Countries with more television sets per household report higher literacy, and an editorial argues that watching television makes an individual more literate.": "户均电视机数量更多的国家，报告的识字率更高，一篇社论主张，看电视会让一个人变得更识字。",
  "Television ownership marks how wealthy a country is, and wealth brings schools. The country-level link is about national development, so it licenses no claim about what watching television does to one viewer.": "电视机的拥有量标志着一个国家有多富裕，而财富带来学校。国家层面的这种关联说的是国家发展水平，它不能为看电视对某一个观众的作用提供任何依据。",
  "Clinics with longer average waiting times report higher patient satisfaction, and a board concludes that making an individual patient wait longer will make that patient happier.": "平均等待时间更长的诊所，报告的患者满意度更高，一个董事会据此得出结论：让某一个病人等得更久，会让这个病人更满意。",
  "Comparing clinics is not comparing patients. Busy, popular clinics can have both long queues and good care, so a clinic-level correlation cannot be read as what waiting does to one person, and here it is plainly implausible.": "比较诊所不等于比较病人。繁忙、受欢迎的诊所可以同时拥有长队和优质的照护，所以诊所层面的这种相关性不能被解读为等待对某一个人的作用，而在这里，这种解读明显站不住脚。",
  "Researchers wanted to know whether a diet affects one person's risk, so rather than comparing country averages they followed 40,000 individuals, recording each person's own diet and their own outcome, and reported the association among those people.": "研究者想知道一种饮食是否会影响某一个人的风险，因此他们没有比较国家平均值，而是追踪了 40,000 个人，记录每个人自己的饮食和自己的结局，并报告了这些人之间的关联。",
  "The question was about individuals and the data was measured on individuals, so the unit of analysis matches the claim. That is precisely the step the ecological fallacy skips.": "这里的问题问的是个体，数据也是在个体身上测得的，所以分析单位与结论相匹配。而这正是生态学谬误所跳过的那一步。",
  "A study finds that countries with stricter seatbelt laws have fewer road deaths per head, and concludes that such laws are associated with lower national death rates, explicitly declining to say what any individual driver's risk would be.": "一项研究发现，安全带法规更严格的国家，人均道路死亡人数更少，并得出结论：这类法规与更低的全国死亡率相关，同时明确表示不对任何一名个体驾驶员的风险作出判断。",
  "The data is national and the conclusion is kept national. Policy questions are legitimately asked at the level of populations, and the authors do not smuggle the finding down to a person.": "这里的数据是全国层面的，结论也保持在全国层面。政策问题本来就可以合理地在人群层面提出，作者也没有把这个发现偷偷下放到某一个人身上。",
  "Analysts studying whether neighbourhood poverty affects individual health use records that hold both each person's own income and their neighbourhood's, and report the neighbourhood effect after accounting for the person's own circumstances.": "研究社区贫困是否影响个体健康的分析师，使用的记录既包含每个人自己的收入，也包含其所在社区的收入，并在校正了个人自身状况之后，报告了社区层面的效应。",
  "Holding both levels in the same model is the standard way to separate what an area does from what a person's own situation does, so the group-level claim is not resting on individual-level guesswork.": "在同一个模型里同时纳入这两个层面，是区分一个地区的作用与一个人自身处境的作用的标准做法，因此群体层面的结论并不建立在对个体层面的臆测之上。",
  "Counting places": "按地方计数",
  "Counting people": "按人计数",

  // ---- Framing effect puzzle + review items ----
  "Asked to choose a plan against an outbreak, most people took the certain option. A sensible, cautious public?": "面对一场疫情爆发，要在两套方案中选择，大多数人选择了确定的那一个。这是一个理性又谨慎的公众吗？",
  "An unusual disease is expected to kill 600 people. Two programmes are proposed, and the exact consequences of each are given. People were asked which they would favour.": "一种不寻常的疾病预计将造成600人死亡。现提出两套应对方案，并给出了每套方案的确切后果。人们被问及会倾向于哪一套。",
  "What does this tell you about what people want?": "这能说明人们想要什么吗？",
  "Which programme people favoured": "人们倾向于哪套方案",
  "An outbreak expected to kill 600 people, with the consequences of each programme stated exactly.": "一场预计造成600人死亡的疫情，每套方案的后果都被确切给出。",
  "The majority took the certain option": "多数人选择了确定的选项",
  "The majority took the gamble": "多数人选择了赌一把的选项",
  "Shares as the paper printed them. It reports percentages and the number asked, never the raw counts.": "占比按论文原始刊出的数字给出。论文只报告了百分比和受访人数，从未给出原始人数。",
  "Outcomes described as lives saved": "以“挽救的生命”描述的结果",
  "Lives saved": "挽救的生命",
  "200 people will be saved": "200人将获救",
  "A one in three chance that all 600 are saved, and two in three that nobody is": "3分之1的概率是600人全部获救，3分之2的概率是无人获救",
  "Outcomes described as lives lost": "以“失去的生命”描述的结果",
  "Lives lost": "失去的生命",
  "400 people will die": "400人将死亡",
  "A one in three chance that nobody dies, and two in three that all 600 do": "3分之1的概率是无人死亡，3分之2的概率是600人全部死亡",
  "People prefer certainty": "人们偏好确定性",
  "a settled preference, nearly three to one": "一种稳定的偏好，比例接近3比1",
  "They cannot do the arithmetic": "他们不会算术",
  "the odds were beyond them": "概率超出了他们的理解能力",
  "It depends how it was worded": "这取决于问题是怎么问的",
  "ask again in other words and it moves": "换一种说法再问一次，答案就变了",
  "The same choice, reworded, and the majority swaps sides.": "同一个选择，换一种措辞，多数人就换边站队。",
  "Saved and lost are the same thing": "“获救”与“死亡”是同一回事",
  "Of 600 people, saving 200 is the same as 400 dying. Nothing about the outcomes changed between these two versions, only whether they were counted in lives saved or lives lost. Put as saving, 72 per cent took the certain option; put as dying, 22 per cent did. The authors call the two problems effectively identical.": "在600人中，救活200人和400人死亡是同一回事。这两个版本之间，结果本身没有任何变化，变的只是这些人是被算作挽救的生命还是失去的生命。表述为“救活”时，72%的人选择了确定的选项；表述为“死亡”时，这一比例是22%。作者称这两个问题实际上是等价的。",
  "So there was no settled public preference to discover. A gain that is described as a gain invites caution, because a sure win feels worth keeping; the identical outcome described as a loss invites a gamble, because a sure loss feels worth escaping. The researchers saw the same reversal in university faculty and in physicians, so this is not a failure of arithmetic by people unused to numbers. It is what the question does to the answer.": "所以，并不存在什么需要被发现的、稳定的公众偏好。被描述为收益的收益会招来谨慎，因为确定到手的胜利让人觉得值得保住；而同样的结果一旦被描述为损失，就会招来冒险，因为确定的损失让人觉得值得去规避。研究者在大学教员和医生身上都看到了同样的逆转，所以这不是不熟悉数字的人在算术上出了错，而是问题本身在左右答案。",
  "One decision, two wordings": "同一个决定，两种措辞",
  "The framing effect": "框架效应",
  "How a choice is worded changes which option people take, even when the outcomes are identical. A survey, a label or a headline that reports what people prefer is partly reporting how they were asked, so the wording is part of the finding and belongs in the report.": "一个选择如何被措辞，会改变人们选取哪个选项，即便结果完全相同。一份调查、一个标签或一条标题在报告人们的偏好时，其实也在部分地报告他们是被如何提问的，所以措辞本身就是发现的一部分，理应写进报告。",
  "The practical test is to restate the same fact the other way round and see whether you still feel the same. Ninety per cent survival and ten per cent mortality are one number; a treatment that saves nine in ten and one that kills one in ten are one treatment. If your preference moves, it was following the wording rather than the outcome, and that is worth knowing before you decide.": "实用的检验方法是把同一个事实反过来说一遍，看看自己的感受是否还一样。90%的生存率和10%的死亡率是同一个数字；能救活10人中9人的治疗，和会害死10人中1人的治疗，是同一种治疗。如果你的偏好因此变了，那说明它跟随的是措辞而不是结果，而这一点值得在你做决定之前弄清楚。",
  "People do not judge outcomes from a blank slate. They judge them as gains or losses against whatever the question treats as normal, and losses weigh heavier than equivalent gains. Describe the outcome as lives saved and the reference point becomes everybody dying, so 200 saved is a gain worth locking in, and gambling with it feels reckless. Describe the identical outcome as 400 dying and the reference point becomes everybody living, so those deaths are a loss, and a chance of avoiding them entirely feels worth taking. Nothing about the world moved; the question moved the baseline people measured from. This is why the framing is not a presentational detail that a careful reader can ignore. Whoever chooses the wording chooses the baseline, and the baseline does much of the deciding, which is exactly why advertising, campaigning and even consent conversations are fought over adjectives.": "人们并不是从一张白纸出发去判断结果的。他们是把结果当作收益或损失，去衡量问题所设定的“正常状态”，而损失在心理上比等量的收益更重。把结果描述为“挽救的生命”，参照点就变成了所有人都会死，于是获救的200人就成了一份值得锁定的收益，拿它去冒险显得鲁莽。把同样的结果描述为“400人死亡”，参照点就变成了所有人都能活下来，于是这些死亡就成了一份损失，而彻底避开它的机会显得值得一试。世界本身什么都没变，变的是问题为人们设定的衡量基线。这正是为什么框架不是一个细心的读者可以忽略的表述细节。谁选择了措辞，谁就选择了基线，而基线在很大程度上决定了结论，这也正是广告、竞选宣传乃至知情同意的谈话都要在形容词上争夺的原因。",
  "The same trick, thirty years on and in the clinic": "同样的把戏，三十年后出现在了诊室里",
  "Doctors, patients and students were told about lung cancer treatments described either by survival rates or by the mortality rates that say the identical thing. Surgery looked far more attractive when its outcomes were given as survival. The effect held among the physicians, so training in the numbers was not protection against the wording.": "医生、患者和学生被告知肺癌治疗方案的结果，一种表述用生存率，另一种表述用意思完全相同的死亡率。当手术的结果以生存率给出时，它看起来要吸引人得多。这一效应在医生群体中同样存在，说明受过数字训练也无法防住措辞的影响。",
  "The framing effect, a reasoning trap.": "框架效应，一个推理陷阱。",
  "Ask people to choose between the same two outcomes twice, once worded as lives saved and once as lives lost, and the majority swaps sides. Nothing about the outcomes changes, only the words. Whoever writes the question is quietly choosing the answer, which is why it is worth restating any claim the other way round before you decide what you think.": "让人们在同样两个结果之间选择两次，一次表述为“挽救的生命”，一次表述为“失去的生命”，多数人就会换边站队。结果本身没有任何变化，变的只是措辞。写问题的人其实在悄悄地选择答案，这就是为什么在你下判断之前，值得把任何一个说法反过来再说一遍。",
  "Same choice, other words. Watch the majority swap sides.": "同一个选择，换一种说法。看着多数人换边站队。",
  "I had a firm opinion. It was about the wording.": "我曾有一个坚定的看法。而它其实是关于措辞的。",
  "Read from the paper itself. Problem 1, put to 152 people, offered 200 saved for certain against a one in three chance of saving all 600: 72 per cent took the certain option and 28 per cent the gamble. Problem 2, put to 155 people, reworded the identical outcomes as 400 dying against a one in three chance that nobody dies: 22 per cent took the certain option and 78 per cent the gamble. The authors write that the two problems are effectively identical and that the only difference is whether outcomes are given as lives saved or lives lost, and they report having seen the reversal in several groups including university faculty and physicians. One honesty note that shapes the figure. The paper prints percentages and the number asked, never the raw counts, and 72 per cent of 152 is not a whole number, so no integer numerator exists. The shares here are therefore the published ones rather than counts, and the chart says so, because rounding to a plausible count would have invented data the source never reported.": "数据直接引自论文本身。问题一被提给152人，选项是确定救活200人，对上3分之1的概率救活600人全部：72%选择了确定的选项，28%选择了赌一把。问题二被提给155人，把完全相同的结果改写为确定400人死亡，对上3分之1的概率无人死亡：22%选择了确定的选项，78%选择了赌一把。作者写道，这两个问题实际上是等价的，唯一的区别在于结果是以“挽救的生命”还是“失去的生命”给出，而且他们报告说在包括大学教员和医生在内的多个群体中都看到了同样的逆转。有一点诚实的说明会影响这张图。论文只印出了百分比和受访人数，从未给出原始人数，而152人的72%并不是一个整数，所以并不存在一个整数分子。因此这里的占比是论文发表时的原始比例，而不是换算出的人数，图表也如实说明了这一点，因为把它凑整成一个看似合理的人数，等于是编造了原始资料从未报告过的数据。",
  "A surgeon tells patients the operation has a 90 percent survival rate, and most agree to it. A colleague who tells the identical patients it has a 10 percent death rate finds far fewer agree. The hospital concludes the first surgeon is better at reassuring people.": "一位外科医生告诉患者，这台手术的生存率是90%，大多数人同意接受手术。另一位同事把同样的手术告诉同样的患者，说它的死亡率是10%，结果同意的人少了很多。医院据此得出结论：第一位医生更擅长安抚患者。",
  "Ninety percent survival and ten percent mortality are the same number said two ways, so nothing about the operation differed. What differed was the wording, and it moved the decision.": "90%的生存率和10%的死亡率是同一个数字的两种说法，手术本身没有任何不同。不同的是措辞，而正是措辞左右了决定。",
  "A yoghurt sells far better labelled 90 percent fat free than the identical product labelled 10 percent fat. The company reports that shoppers are choosing the healthier option.": "一款酸奶标注“90%脱脂”时卖得远比标注“含10%脂肪”的同一款产品好。公司报告说，购物者正在选择更健康的那个选项。",
  "It is one product with one fat content, described two ways. The shoppers did not choose a healthier yoghurt, they responded to a label written to sound like a gain.": "这是同一款产品、同一个脂肪含量，只是被描述成了两种说法。购物者并没有选中一款更健康的酸奶，他们只是对一个被写得像是收益的标签做出了反应。",
  "A policy polls well when described as keeping money in your pocket and badly when the identical policy is described as reducing what is collected for services. The pollster reports the public is broadly in favour.": "一项政策在被描述为“让钱留在你自己口袋里”时民调支持率很高，而在同一项政策被描述为“减少用于公共服务的征收款”时支持率很低。民调机构报告说，公众普遍表示支持。",
  "Two descriptions of the same policy produced two verdicts, so the poll measured the wording as much as the opinion. A finding like this has to report how the question was put.": "同一项政策的两种描述得出了两种结论，所以这份民调衡量的既是意见，也同样是措辞。这样的发现必须说明问题当初是怎么问的。",
  "A government announces that 94 percent of people are in work. The opposition announces that 6 percent are out of work. A commentator says the two sides cannot agree on the figures.": "政府宣布94%的人有工作。反对党宣布6%的人失业。一位评论员说，双方在数字上无法达成一致。",
  "They agree completely on the figure, which is one number stated from two ends. The disagreement is over which end to say out loud, and that choice does the persuading.": "双方在数字上其实完全一致，这只是同一个数字从两端说出来而已。分歧在于该大声说出哪一端，而正是这个选择在起说服作用。",
  "A leaflet says a vaccine lets 99 in 100 get through the season without the illness. A rival leaflet says 1 in 100 still catch it despite the vaccine. A survey finds people who read the first are much likelier to take it, and concludes the first leaflet is more accurate.": "一份传单说，接种疫苗后每100人中有99人能安然度过流行季而不患病。另一份对立的传单说，即便接种了疫苗，每100人中仍有1人会染病。一项调查发现，读到第一份传单的人接种意愿明显更高，并据此得出结论：第一份传单更准确。",
  "Both leaflets state the identical result, one as a gain and one as a residual loss. Being more persuasive is not the same as being more accurate, and here neither is wrong.": "两份传单陈述的是完全相同的结果，一份表述为收益，一份表述为剩余的损失。更有说服力并不等于更准确，而这里两者都没有说错。",
  "A shop charges less for cash than for card. Customers barely object when it is called a cash discount and complain loudly when the identical price gap is called a card surcharge. The owner concludes customers dislike card fees.": "一家商店对现金支付收费更低，对刷卡支付收费更高。当这个价差被称为“现金折扣”时，顾客几乎没有异议；而当完全相同的价差被称为“刷卡附加费”时，顾客却大声抱怨。店主据此得出结论：顾客不喜欢刷卡手续费。",
  "The two prices are the same either way. Calling the gap a discount makes the lower price the bonus, calling it a surcharge makes the higher price a penalty, and the objection follows the word.": "无论怎么称呼，两个价格都是一样的。把价差叫作折扣，会让较低的那个价格显得是额外的优惠；把它叫作附加费，会让较高的那个价格显得是一种惩罚，而抱怨正是跟着这个词走的。",
  "One newspaper reports that crime fell by 5 percent. Another reports that 95 percent of last year's crime is still happening. Readers of the second are far gloomier, and an editor concludes the public mood has shifted.": "一家报纸报道犯罪率下降了5%。另一家报道去年95%的犯罪仍在发生。读到第二篇报道的人情绪要低落得多，一位编辑据此得出结论：公众情绪发生了变化。",
  "Both sentences describe the same change. The mood tracked which sentence a reader met, so it is evidence about the two write-ups rather than about the public.": "两句话描述的是同一个变化。情绪的变化跟随的是读者读到了哪一句话，所以这是关于这两篇报道的证据，而不是关于公众的证据。",
  "An app tells one group of users their battery is at 20 percent and another group that 80 percent is used. The second group plugs in sooner, and the designer reports that users respond better to usage information.": "一款应用告诉一组用户，电池还剩20%；告诉另一组用户，电池已用掉80%。第二组用户更早去充电，设计师据此报告说，用户对“已用量”信息反应更好。",
  "The two readouts carry identical information about the battery. The behaviour changed with the wording, which tells you about the framing rather than about what users understand.": "这两种读数所携带的电池信息是完全相同的。行为随措辞而改变，这说明的是框架的作用，而不是用户理解了什么。",
  "A charity asks one group to give 2 pounds and tells another that 2 pounds is all it takes to stop a child going without. The second group gives far more often, and the charity concludes those donors care more.": "一家慈善机构请一组捐赠者捐2英镑，告诉另一组：只要2英镑，就能让一个孩子不再匮乏。第二组的捐赠频率高得多，慈善机构据此得出结论：这些捐赠者更有爱心。",
  "The sum asked for is identical, and the donors were not selected for anything. The difference is entirely in how the ask was worded, so it says nothing about who cares more.": "所求的金额完全相同，两组捐赠者也没有经过任何特别的筛选。差异完全在于请求是怎么措辞的，所以这说明不了谁更有爱心。",
  "A school reports that 7 in 10 pupils passed. A local paper reports that 3 in 10 failed. Parents surveyed after reading the paper rate the school much worse, and a governor concludes the paper uncovered a real decline.": "一所学校报告说，10名学生中有7人通过了考试。当地一家报纸报道说，10人中有3人不及格。读过这篇报道后接受调查的家长对学校的评价明显更差，一位校董据此得出结论：报纸揭露了一次真实的滑坡。",
  "Nothing was uncovered, because the two reports carry one result. The parents were reacting to whether the number was given as passes or as failures.": "什么也没被揭露，因为这两份报道说的是同一个结果。家长的反应，取决于这个数字是以“及格”还是以“不及格”的方式给出的。",
  "A consent leaflet states that the operation has a 90 percent survival rate and, in the same paragraph, that 10 percent of patients die, so that the reader meets the result stated both ways before deciding.": "一份知情同意书说明这台手术的生存率是90%，并在同一段落里说明10%的患者会死亡，让读者在做决定之前，同时看到这个结果的两种说法。",
  "Giving both statements of the identical figure is the standard defence against framing, since the reader cannot be steered by whichever end was chosen for them.": "把同一个数字的两种说法都给出来，是抵御框架效应的标准做法，因为这样一来，读者就不会被别人替他选定的那一端牵着走。",
  "Two treatments were described to patients in the same words, using the same survival framing for both, and patients still chose one far more often. The report concludes patients prefer that treatment.": "两种治疗方案被用完全相同的措辞介绍给患者，两者都采用相同的生存框架，而患者仍然更频繁地选择其中一种。报告据此得出结论：患者更偏好那种治疗方案。",
  "The wording was held constant across the two options, so the difference in choices cannot be an artefact of framing. The preference is about the treatments.": "两个选项的措辞保持不变，所以选择上的差异不可能是框架造成的假象。这份偏好说的是治疗方案本身。",
  "A polling company publishes the exact question wording alongside its result, and notes that an alternative wording tested at the same time produced a different level of support, so readers can see how sensitive the finding is.": "一家民调公司在公布结果的同时，一并公布了问题的确切措辞，并说明同一时间测试的另一种措辞产生了不同的支持率，好让读者看清这个结果对措辞有多敏感。",
  "Publishing the wording, and what a different wording produced, treats the framing as part of the finding. That is the honest way to report an opinion measurement.": "把措辞连同不同措辞所产生的结果一并公布，是把框架当作发现的一部分来对待。这才是报告一次民意测量的诚实方式。",
  "As it was put to them": "原始措辞",
  "Both wordings": "两种措辞",

  // ---- Misleading chart axes ----
  "Only 7 of the 38 people shown this chart read its trend correctly.": "在看过这张图表的38人中，只有7人正确读出了它的趋势。",
  "Researchers drew a chart of one quantity rising steadily over time, then redrew it with the vertical axis upside down, so that larger values sat lower on the page. The numbers themselves were untouched. They showed the upside-down version to 38 people recruited at random online, asked what the quantity had done over the period, and let them answer that it had improved, that it had declined, or that they could not tell. Seven of the 38 answered correctly.": "研究者先画了一张图，显示某个数量随时间稳步上升，然后把纵轴上下颠倒重画了一遍，让数值越大的位置反而越靠近页面下方。数字本身丝毫未改。他们把颠倒版拿给网上随机招募的38个人看，问这个数量在这段时期里发生了什么变化，并让他们从「上升了」「下降了」「说不准」中作答。38人里有7人答对。",
  "What does a score that low tell you about the chart?": "这么低的正确率，说明了这张图表的什么问题？",
  "Read the trend correctly": "正确读出趋势",
  "Shown the chart with the axis upside down": "看到纵轴上下颠倒的图表",
  "Upside down": "上下颠倒",
  "Shown the same numbers, axis the normal way up": "看到同样的数字，纵轴方向正常",
  "Normal": "正常",
  "People shown a chart": "看过图表的人",
  "The upside-down version": "上下颠倒的版本",
  "It was a hard chart, and most people struggled with it": "这是一张难读的图表，多数人都读得很吃力",
  "too fiddly to read": "读起来太费劲",
  "The rise in the data was too slight to call": "数据里的上升幅度太小，无法下结论",
  "an honest near-tie": "一次诚实的平局",
  "It read clearly, and what it said was backwards": "它读起来很清楚，只是说反了",
  "legible, and wrong": "看得懂，却是错的",
  "Drawn the normal way up, the same numbers were read correctly by 39 of 40.": "以正常方向绘制时，同样的数字有40人中的39人读对了。",
  "Nothing was wrong with the readers, or with the data": "读图的人没问题，数据也没问题",
  "Forty other people, recruited the same way and shown the identical numbers with the vertical axis the usual way up, read the trend correctly 39 times out of 40. So the rise was not slight and the readers were not weak. Look too at how the other 38 got it wrong: just one of them said they could not tell, and 30 stated flatly that the quantity had declined:": "另外四十个人以同样方式招募，看到的是完全相同的数字，只是纵轴方向正常，结果40人中有39人正确读出了趋势。可见上升幅度并不小，读图的人也不差。再看看另外38人是怎么错的：只有一个人说自己说不准，30个人斩钉截铁地说这个数量下降了。",
  "Both versions of the same numbers": "同一组数字的两个版本",
  "That is the tell, and it is worth keeping. A chart that is merely hard makes people hesitate. They hedge, they split, they say they are not sure, and enough of them land on the right answer by accident that the score stays near what guessing would give. Scoring well below guessing is a different thing altogether, and it happens when a chart is perfectly legible and pointing the wrong way. Difficulty scatters answers. Steering lines them up.": "这正是关键的线索，值得记住。一张仅仅是难读的图表会让人犹豫。人们会含糊其辞，会出现分歧，会说自己拿不准，而且总有足够多的人蒙对，使正确率停留在瞎猜的水平附近。得分远低于瞎猜则完全是另一回事，它只会发生在图表清晰可读却指向错误方向的时候。难度会让答案分散，诱导则会让答案整齐地指向同一边。",
  "What the other 40 saw": "另外40人看到的是什么",
  "Misleading chart axes": "具有误导性的图表坐标轴",
  "An axis is a claim, not a container. Change how it runs and you do not make the chart harder to read, you change what a careful reader confidently concludes from it. Read the axis before you read the shape.": "坐标轴是一种主张，而不只是一个容器。改变它的方向，并不会让图表更难读，而是会改变一个细心的读者从中自信得出的结论。先读坐标轴，再读图形。",
  "Note what this does and does not establish. It is one chart, one distortion and 78 paid online workers, not a representative public, and the chart was built for the experiment rather than lifted from a newspaper. What it does settle is the part people find hardest to believe: the effect is enormous, and it does not depend on the reader being careless or innumerate. The same readers, given the same numbers drawn honestly, were right almost every time.": "要分清这项研究确立了什么，又没有确立什么。它只涉及一张图表、一种扭曲手法和78名有偿的线上作业者，而不是具有代表性的公众，而且这张图是为实验专门制作的，并非取自报纸。但它确实说清了最难让人相信的那一点：这种效应极其巨大，而且并不取决于读者是否粗心或不擅长数字。同样这些读者，面对同样的数字诚实绘制的图表时，几乎每次都答对了。",
  "Up means more. That mapping is fixed long before anyone reads a label, and it is doing the work of understanding a chart at a speed conscious checking cannot match: you take in the shape of a line in a single glance and the axis text a beat later, if at all. Invert the axis and the two disagree, and the glance wins. This is why the failure is so lopsided. It is not that people find the chart confusing and give up; it is that they read it fluently and arrive somewhere false, with no sense that anything needed checking. That is also why the effect survives expertise. Knowing about the trick does not stop the glance from happening, it only gives you a reason to go back and check afterwards. Axis distortions come in more than one flavour and they fail differently, which is worth keeping straight. Inverting an axis reverses the message: the reader concludes the opposite of the truth. Cutting the bottom off an axis, so bars start at some value well above zero instead of at zero, does not reverse anything, it exaggerates: a small real difference fills most of the frame and reads as a large one. The same study measured that second effect separately and found it substantial but milder, which fits, because an exaggerated gap is still a gap in the right direction. Stretching or squashing the shape of a line chart does the same kind of thing to a rate of change, making a gentle climb look like a spike or a spike look gentle. The defence is a habit rather than a skill, and it takes about two seconds. Before you look at the shape, look at the axis: find which way it runs, find where it starts, and check whether the starting point is zero. If the chart has no axis labels at all, that is the finding. And be most careful with the charts that confirm what you already think, because those are the ones you will read at a glance and never go back to.": "向上代表更多。这种对应关系在任何人读到标签之前就已经固定下来，并且以有意识的核对根本追不上的速度完成对图表的理解：你一眼就吸收了线条的形状，坐标轴上的文字要慢一拍才进来，甚至根本不会被读到。把坐标轴反转，两者就互相矛盾，而胜出的是那一眼。这正是失败为何如此一边倒的原因。并不是人们觉得图表看不懂而放弃，而是他们读得非常顺畅，却抵达了一个错误的地方，而且丝毫不觉得有什么需要核对。这也是这种效应为何能在专业训练面前存活。知道这个把戏并不能阻止那一眼发生，只是给了你事后回头核对的理由。坐标轴的扭曲不止一种，失败的方式也各不相同，值得分清楚。反转坐标轴会让信息颠倒：读者得出与事实相反的结论。把坐标轴的下端截掉，让柱子从远高于零的某个值开始而不是从零开始，则不会颠倒任何东西，而是夸大：一个微小的真实差异会填满画面的大部分，读起来就像一个巨大的差异。同一项研究单独测量了第二种效应，发现它相当可观但比反转温和，这说得通，因为被夸大的差距方向毕竟还是对的。把折线图的画面拉长或压扁，对变化速率会造成同样的事情，让平缓的上升看起来像暴涨，或者让暴涨看起来平缓。防范之道与其说是一项技能，不如说是一个习惯，只需大约两秒钟。在看图形之前先看坐标轴：看清它朝哪个方向走，从哪里开始，起点是不是零。如果这张图连坐标轴标签都没有，那本身就是结论。而且，对那些印证了你既有想法的图表要格外小心，因为你恰恰会一眼扫过它们，再也不回头看。",
  "The gentler trick in the same experiment": "同一实验中更温和的那个把戏",
  "The same researchers tested cutting the bottom off an axis rather than flipping it. Readers saw a bar chart comparing two places, either with the axis starting at zero or with it starting high enough that a small real difference filled the frame, and rated how much bigger one was than the other on a scale of 1 to 5. The group given the truncated axis averaged 2.77; the group given the honest one averaged 1.45. The gap held up statistically, but notice how it differs from the inverted axis: nobody was led to the opposite conclusion, only to a wildly inflated sense of how big the difference was. Reversal and exaggeration are two distinct failures, and the second is far more common in the wild because it can happen entirely by accident.": "同一批研究者还测试了截掉坐标轴下端、而不是把它翻转的做法。读者看到的是比较两个地方的柱状图，纵轴要么从零开始，要么从足够高的位置开始，使一个微小的真实差异填满整个画面，然后请他们在1到5的量表上评价一个比另一个大多少。看到截断坐标轴的那一组平均给出2.77分，看到诚实版本的那一组平均给出1.45分。这个差距在统计上是站得住的，但请注意它与反转坐标轴的不同：没有人被引向相反的结论，只是对差异有多大产生了严重夸张的印象。反转和夸大是两种不同的失败，而后者在现实中常见得多，因为它完全可能是无心之失。",
  "Misleading chart axes, a reasoning trap.": "具有误导性的图表坐标轴，一种推理陷阱。",
  "You do not really read a chart, you glance at it. Up means more, and that lands before the axis labels do. So when researchers took a chart of something steadily improving and simply turned the vertical axis upside down, the people who saw it did not get confused and did not give up: 30 of 38 confidently reported the opposite of what the numbers said, and exactly one admitted to being unsure. Shown the same numbers drawn the normal way up, 39 of 40 got it right. Nothing about the data changed, and nothing about the readers changed. Before you read the shape of a chart, spend two seconds on the axis: which way does it run, and where does it start?": "你其实并没有在读图表，你只是扫了一眼。向上代表更多，这个感觉比坐标轴标签先一步到达。所以，当研究者把一张显示某事物稳步改善的图表的纵轴单纯上下颠倒之后，看到它的人既没有困惑，也没有放弃：38人中有30人自信地报告了与数字所说完全相反的内容，而承认自己拿不准的恰好只有一个人。面对以正常方向绘制的同样数字，40人中有39人答对了。数据没有任何变化，读图的人也没有任何变化。在读一张图的形状之前，请花两秒钟看看坐标轴：它朝哪个方向走，又从哪里开始？",
  "A between-subjects experiment run on Amazon Mechanical Turk with workers who reported a United States location and had a prior task approval rate of 99 percent or better. Eighty people were recruited for this arm and 78 passed the attention check, leaving groups of 40 and 38. The chart plotted access to safe drinking water over time in invented places, so the stimulus carries no real country, party or contested science; the true trend was an improvement, and the inverted axis gave the impression of a decline. The difference was tested with the Freeman-Halton extension of Fisher's exact test, which is the version for a table with more than two response categories, at p < 0.0001. Two slips in the paper are worth flagging, because both trip a quick reader. Table 3 prints the single uncertain response in the inverted-axis group as 0.02 percent, where 1 of 38 is 2.63 percent, which is also what makes that row sum to 100. And the discussion section restates the result with the two conditions swapped and the correct percentages labelled as incorrect. The table and the results text agree with each other, and this puzzle follows them.": "这是一项在 Amazon Mechanical Turk 上开展的组间实验，参与者自报身处美国，且以往任务通过率不低于99%。这一部分共招募了80人，其中78人通过了注意力检验，形成40人和38人两组。图表呈现的是虚构地名中安全饮用水普及率随时间的变化，因此实验材料不涉及任何真实国家、任何政党或任何有争议的科学；真实的趋势是改善，而反转的坐标轴给人以下降的印象。差异检验使用了费希尔精确检验的弗里曼-哈尔顿扩展，即适用于回答类别多于两类的列联表的版本，p < 0.0001。论文中有两处疏漏值得指出，因为两处都会让读得快的人栽跟头。表3把反转组中唯一一个「说不准」的回答印成了0.02%，而38分之1是2.63%，也只有这样那一行才能加总到100。此外，讨论部分在复述结果时把两个条件对调了，还把正确率标注成了错误率。表格与结果正文彼此一致，本谜题依据的正是它们。",
  "A safety report charts workplace injuries by year, with the vertical axis running from 0 at the top down to 500 at the bottom. The plotted line climbs steadily up the page across five years. A local paper reports that injuries have risen sharply.": "一份安全报告按年份绘制工伤事故数量，纵轴从顶端的0一直到底端的500。所绘的线在五年间稳步向页面上方攀升。一家地方报纸报道说工伤事故大幅上升。",
  "With zero at the top, a line climbing the page is a count falling towards zero. The paper read the shape of the line and not the direction of the axis, and printed the opposite of what the chart shows.": "零在顶端，因此向页面上方攀升的线代表数量正在向零下降。这家报纸只读了线条的形状，没有读坐标轴的方向，于是印出了与图表所示完全相反的结论。",
  "Two schools' average exam marks are drawn as bars on a vertical axis running from 68 to 72. One bar is more than twice the height of the other, and a campaign leaflet says the first school performs twice as well.": "两所学校的考试平均分被画成柱子，纵轴从68到72。其中一根柱子的高度是另一根的两倍多，一份宣传单据此声称第一所学校的成绩好一倍。",
  "The two averages differ by about two marks out of a hundred. Starting the axis at 68 cuts away everything the schools have in common, so the remaining sliver fills the frame. Bar heights are only ratios when the axis starts at zero.": "两个平均分在百分制下相差约两分。让坐标轴从68开始，就把两所学校共有的部分全部切掉了，剩下的那一小条便填满了整个画面。只有当坐标轴从零开始时，柱子的高度才代表比例。",
  "A company plots monthly revenue on a chart four times taller than it is wide. The line looks close to vertical and the annual report describes explosive growth. Drawn on a square chart, the identical figures rise gently.": "某公司把月度营收画在一张高是宽四倍的图上。线条看起来近乎垂直，年报称之为爆发式增长。同样的数字画在正方形的图上，只是平缓上升。",
  "The same numbers cannot be both explosive and gentle. Steepness is a property of the frame a line is drawn in as much as of the data, so a rate of change read off the slope alone is not a measurement.": "同样的数字不可能既是爆发式的又是平缓的。陡峭程度既取决于数据，也同样取决于线条被画进的那个画框，因此仅凭斜率读出的变化速率并不是一项测量。",
  "An infographic shows two bars, one clearly taller than the other, above a caption stating that the difference is dramatic. The vertical axis carries no numbers and no label.": "一张信息图展示了两根柱子，其中一根明显比另一根高，下方的说明文字称这一差异极为惊人。纵轴上既没有数字，也没有标签。",
  "With no scale the bars say nothing about size: the gap could be one percent or a hundredfold. An unlabelled axis turns an assertion into something drawn to look like evidence.": "没有刻度，柱子就完全说明不了大小：这个差距可能是百分之一，也可能是一百倍。没有标签的坐标轴，会把一个主张变成看起来像证据的东西。",
  "A chart plots ice cream sales against a left-hand axis and library visits against a right-hand one, each scaled so the two lines sit almost on top of each other. The commentary says the two track each other almost perfectly.": "一张图把冰淇淋销量画在左侧坐标轴上，把图书馆到访人次画在右侧坐标轴上，两轴的刻度各自调整到让两条线几乎重合。评论称两者的走势几乎完全一致。",
  "Two independent axes can be scaled to make almost any pair of series overlap, and rescaling either one pulls the lines apart again. How closely they sit is a choice made by whoever drew the chart, not a finding.": "两条互相独立的坐标轴，几乎总能通过调整刻度让任意一对数据序列重合，而只要重新调整其中任何一条，两条线就又会分开。它们靠得有多近，是画图者的选择，而不是一项发现。",
  "A chart of cases over time uses a vertical axis where each gridline is ten times the one below it. The curve rises as a straight line, and a summary describes growth as steady.": "一张病例随时间变化的图，其纵轴上每一条网格线都是下面一条的十倍。曲线呈一条直线上升，而摘要把这种增长描述为平稳。",
  "On a scale where each step multiplies by ten, a straight line means the count is multiplying at a constant rate, so it is doubling again and again. That is the fastest kind of growth there is, and the summary read the shape as if the axis were an ordinary one.": "在每一格都乘以十的刻度上，一条直线意味着数量正在以恒定的倍率增长，也就是一次又一次地翻倍。这是世上最快的增长方式，而这份摘要把坐标轴当成普通坐标轴来读形状了。",
  "A regulator draws two regions' contamination readings as bars on an axis running from 0 to 10,000, although both regions sit between 40 and 90. The bars are indistinguishable, and the report concludes there is no meaningful difference between them.": "某监管机构把两个地区的污染读数画成柱子，坐标轴从0到10,000，而两个地区的读数其实都在40到90之间。柱子看不出区别，报告因此得出结论说两地之间没有实质差异。",
  "One region reads about twice the other, and the chart has flattened that into invisibility by running the axis far past anything in the data. An axis can bury a real difference as easily as it can manufacture a fake one.": "一个地区的读数约为另一个的两倍，而这张图把坐标轴一路拉到远超数据中任何数值的地方，硬是把这个差异压平到看不见。坐标轴既能凭空制造一个假的差异，也同样容易把一个真实的差异埋掉。",
  "A customer satisfaction tracker is charted on a vertical axis running from 44 to 48 percent. The line zigzags violently from the top of the frame to the bottom and back, and a commentary describes wild swings in how customers feel.": "一份客户满意度追踪数据被画在从44%到48%的纵轴上。线条从画面顶端到底端剧烈地来回锯齿状波动，一段评论据此描述客户感受出现了剧烈起伏。",
  "The whole chart is four points tall, so a movement of a point or so, which is inside the noise of most surveys, crosses the entire frame. The violence is in the axis rather than in the customers.": "整张图只有四个百分点高，因此哪怕只有一个百分点左右的变动，也就是大多数调查的噪声范围之内的变动，都会横穿整个画面。剧烈的是坐标轴，而不是客户。",
  "A hospital dashboard shows average waiting times with the vertical axis running from 120 minutes at the top down to 0 at the bottom. The bars for the newest quarter are the tallest on the chart, and the newsletter reports the longest waits on record.": "某医院的仪表板显示平均候诊时间，纵轴从顶端的120分钟到底端的0分钟。最近一个季度的柱子是全图最高的，院刊据此报道候诊时间创下历史最长纪录。",
  "The axis is upside down, so the tallest bar is the shortest wait. The newsletter took height to mean magnitude, which is exactly the reflex this layout defeats.": "坐标轴是上下颠倒的，所以最高的柱子恰恰是最短的候诊时间。院刊把高度当成了大小，而这正是这种版式所利用的下意识反应。",
  "A chart of quarterly sales has a zigzag break drawn low on the vertical axis, marking a stretch of the scale that has been left out. A slide deck reproduces the chart with the break cropped off the bottom and presents the remaining bars as showing sales tripling.": "一张季度销售额图表的纵轴下方画有一个锯齿状的断裂符号，标示出被略去的一段刻度。某份幻灯片转载这张图时把底部的断裂符号裁掉了，并把剩下的柱子当作销售额翻了三倍的证据。",
  "The break was the chart's own warning that its heights are not proportional to its numbers. Cropping it away leaves bars that look like a ratio and are not one.": "那个断裂符号正是图表对自己发出的警告：柱高与数字并不成比例。把它裁掉之后，剩下的柱子看起来像一个比例，实际上却不是。",
  "A league table is charted with position 1 at the top of the vertical axis and position 20 at the bottom, the axis labelled Position, so a line climbing the page is a team climbing the table.": "一张联赛积分榜以纵轴顶端为第1名、底端为第20名绘制，坐标轴标注为「名次」，因此一条向页面上方攀升的线代表某支球队排名正在上升。",
  "The axis runs downwards because that is what the quantity means: first place is the top. The direction is labelled and agrees with the reader's intuition rather than fighting it, so nothing is being reversed.": "坐标轴向下延伸，是因为这个量本身就是这个意思：第一名就是最高。方向已经标注出来，而且顺应读者的直觉而非与之作对，所以并没有什么被反转。",
  "A chart of body temperature through a day starts its vertical axis at 36 degrees rather than zero, prints the range on the axis, and the text reports the change in degrees rather than describing how tall the line got.": "一张一整天体温变化的图，纵轴从36度而不是零开始，并在轴上标明了范围，正文以度数报告变化幅度，而不是描述线条升到了多高。",
  "A zero baseline would be meaningless for a quantity that never goes near zero, and the claim is made in units rather than read off the height. The axis is doing its job and saying what it did.": "对于一个从不接近零的量来说，以零为基准毫无意义，而且结论是以单位表述的，不是从高度上读出来的。这条坐标轴既尽了本分，也说清了自己做了什么。",
  "An epidemic curve is drawn on a scale where each gridline is ten times the last, the axis says so in its label, and the accompanying text states that cases are doubling every nine days.": "一条流行病曲线画在每一条网格线都是前一条十倍的刻度上，坐标轴的标签对此作了说明，随附的正文指出病例数每九天翻一番。",
  "The scale is declared and the finding is given as a doubling time, a number the reader can check, rather than inferred from how steep the line looks. That is the right way to use a multiplying axis.": "刻度已经声明，而结论是以翻倍时间这个读者可以核对的数字给出的，而不是从线条看起来有多陡推断出来的。这才是使用倍增坐标轴的正确方式。",
  "A report prints the same figures twice, once on an axis starting at zero and once zoomed in on the range the data actually occupies, and says which question each version is there to answer.": "一份报告把同一组数字印了两遍，一遍用从零开始的坐标轴，一遍聚焦在数据实际所处的区间上，并说明每个版本各自是为了回答什么问题。",
  "Both framings are true and they answer different questions, one about the size of the difference and one about its shape. Showing both means the reader is not depending on someone else's choice of scale.": "两种呈现方式都是真实的，只是回答的问题不同，一个关于差异有多大，一个关于差异的形状。两个都给出来，读者就不必依赖别人替他挑好的刻度了。",

  // ---- Mean versus median ----
  "Survival is counted from the day you are diagnosed. So a test that finds a disease earlier automatically makes survival look longer, even if it changes nothing about when the disease kills you. You simply spend more of your life as a patient. That is why a screening programme can raise five-year survival dramatically while exactly the same number of people die. None of which means screening is useless: some programmes genuinely do cut deaths, and this is exactly how you tell which ones. Count deaths in everyone invited, not survival among the diagnosed.": "生存期是从确诊那天开始计算的。因此，一项能更早发现疾病的检查会自动让生存期看起来更长，哪怕它完全没有改变疾病夺走生命的时间。你只是把人生中更长的一段时间过成了病人而已。这就是为什么一个筛查项目可以让五年生存率大幅上升，而死亡的人数分毫未变。但这绝不意味着筛查毫无用处：确实有一些项目真正降低了死亡，而分辨哪些项目做到了，靠的正是这个方法。去数所有被邀请者中的死亡人数，而不是已确诊者中的生存期。",
  "A journal's impact factor is just the average citations its papers got. Science scored 34.7.": "一本期刊的影响因子，不过是它所刊论文获得引用次数的平均值。Science 是34.7。",
  "The impact factor is an arithmetic mean and nothing more: take every paper a journal published in two years, count the citations each one picked up the following year, and average them. For Science that came to 34.7. Two things are worth holding on to before you answer. A paper cannot be cited fewer than zero times, so there is a floor. And the citations run over two to three orders of magnitude, so a handful of papers are cited hundreds or thousands of times while most are cited a few.": "影响因子无非就是一个算术平均：把一本期刊两年内发表的全部论文拿来，数一数每篇在次年获得了多少引用，然后求平均。对 Science 来说，这个数是34.7。回答之前有两件事值得记住。一篇论文的被引次数不可能少于零，所以存在一个下限。而引用次数的跨度有两到三个数量级，因此少数论文被引用几百甚至几千次，而多数只被引用几次。",
  "What share of Science papers actually reached that average of 34.7?": "Science 的论文中，真正达到34.7这个平均值的占多大比例？",
  "Citations per paper against the journal's own average": "每篇论文的引用数，对照期刊自身的平均值",
  "papers published in 2013 and 2014": "2013年和2014年发表的论文",
  "The average is citations received during 2015 by papers published in 2013 and 2014.": "这个平均值指的是2013年和2014年发表的论文在2015年内获得的引用次数。",
  "Average citations per paper, as published": "每篇论文的平均引用数，按已发表的数据",
  "below their own journal's average": "低于自己所在期刊的平均值",
  "reached it": "达到了平均值",
  "These are the percentages the source printed, not counts. The share reaching the average is derived from the share below it, so the two always account for every paper.": "这些是原始文献印出的百分比，不是计数。达到平均值的那部分比例是由低于平均值的比例推导出来的，因此两者始终能把所有论文交代完整。",
  "Science": "Science",
  "Nature": "Nature",
  "Nature Communications": "Nature Communications",
  "Nature Comm.": "Nature Comm.",
  "Scientific Reports": "Scientific Reports",
  "Sci. Rep.": "Sci. Rep.",
  "PLOS ONE": "PLOS ONE",
  "eLife": "eLife",
  "Journal of Informetrics": "Journal of Informetrics",
  "J. Informetrics": "J. Informetrics",
  "The EMBO Journal": "The EMBO Journal",
  "EMBO J.": "EMBO J.",
  "PLOS Biology": "PLOS Biology",
  "PLOS Biol.": "PLOS Biol.",
  "Proceedings of the Royal Society B": "Proceedings of the Royal Society B",
  "Proc. R. Soc. B": "Proc. R. Soc. B",
  "PLOS Genetics": "PLOS Genetics",
  "PLOS Genet.": "PLOS Genet.",
  "The number everyone quotes": "人人都在引用的那个数字",
  "More than half of them": "超过一半",
  "it is a strong journal": "这是一本顶尖期刊",
  "About half, which is what an average means": "大约一半，平均值不就是这个意思吗",
  "half above, half below": "一半在上，一半在下",
  "Well under half": "远低于一半",
  "the floor and the tail": "下限加长尾",
  "About a quarter. Three papers in four never reached their own journal's average.": "大约四分之一。四篇里有三篇从未达到过自己所在期刊的平均值。",
  "A long tail drags the average above almost everything it summarises": "一条长尾把平均值拽到了它本应概括的几乎所有内容之上",
  "75.5 per cent of the papers Science published in those two years were cited fewer than 34.7 times, so under a quarter reached the number the journal is ranked by. And this is not a quirk of one journal: across all eleven examined, between 65.3 and 75.5 per cent of papers fell below their own average. The bars below are the same published figures, with each journal's average now shown in its place:": "Science 在那两年发表的论文中，有75.5%的引用次数不足34.7次，也就是说，达到这本期刊赖以排名的那个数字的论文还不到四分之一。而且这并非某一本期刊的怪现象：在考察的全部十一本期刊中，都有65.3%到75.5%的论文低于自己所在期刊的平均值。下面这些条形用的是同一批已发表的数据，只是这次把每本期刊的平均值放到了它真正所在的位置：",
  "All eleven journals": "全部十一本期刊",
  "Notice what follows for free. Since more than half the papers sit below the average, the median paper does too, whatever its exact value happens to be. That is the general shape of the problem: when a quantity has a floor it cannot go under and no ceiling to stop it, a few enormous values haul the mean upward while the median stays down among the ordinary cases. The mean is still a perfectly correct number. It is just not a typical one, and quoting it as though it described a normal paper, salary or waiting time describes almost nobody.": "请注意这里可以白得的一个推论。既然超过一半的论文低于平均值，那么处于中位的那篇论文也必然低于平均值，无论它的具体数值是多少。这就是问题的一般形态：当一个量有一个无法跌破的下限，却没有任何上限来拦住它时，少数极大的数值会把平均值往上拽，而中位数仍然留在下面，处在那些普通的个案之中。平均值依然是一个完全正确的数字。它只是不是一个典型的数字，把它当作在描述一篇普通论文、一份普通薪水或一次普通等待来引用，几乎描述不到任何人。",
  "Where the average actually sits": "平均值实际落在哪里",
  "Mean versus median": "平均数与中位数",
  "An average is a number, not a typical case. Whenever a quantity has a floor and a long tail, the average is dragged above most of what it summarises, and the median is the honest summary to ask for.": "平均值是一个数字，不是一个典型个案。只要一个量既有下限又有长尾，平均值就会被拽到它所概括的大部分内容之上，而中位数才是应该去索取的那个诚实的概括。",
  "Be careful what this does and does not say. It does not say the impact factor is miscalculated: 34.7 really is the mean, and the arithmetic is not in dispute. It says the mean answers a different question from the one people use it for. Ranking journals by it is one thing; inferring anything about a particular paper from it is another, and the overlap between journals is so large that a paper in a journal with a mean of 5 is routinely cited more than a paper in one with a mean of 35.": "要留意这说了什么、又没说什么。它没有说影响因子算错了：34.7确实就是平均值，算术上并无争议。它说的是，平均值回答的问题与人们拿它来回答的问题并不是同一个。用它给期刊排序是一回事；由它推断某一篇具体论文如何，则是另一回事，而且期刊之间的重叠如此之大，以致于一本平均值为5的期刊上的论文，被引用得比一本平均值为35的期刊上的论文更多，是家常便饭。",
  "The mean and the median answer different questions, and on a symmetric distribution they happen to give the same answer, which is why the difference is so easy to forget. The mean is the balancing point: every value pulls on it in proportion to how far away it is, so a single value a thousand times bigger than the rest moves it a long way. The median is the middle person in the queue, and it does not care how rich the richest is, only how many people there are. So the gap between them is a direct measure of how lopsided the data is. Any quantity that cannot go below zero and has no upper bound tends to come out lopsided in the same direction: incomes, wealth, house prices, citations, hospital length of stay, time spent waiting on hold, downloads, deaths per outbreak, followers per account. In every one of those, the mean sits above the median, and the more extreme the tail the wider the gap. Which one gets quoted is therefore a choice, and it is not always an innocent one. If you want a figure to sound generous, use the mean of something with a long tail. If you want the same data to sound modest, use the median. Neither is a lie. The practical habit is short. When you meet an average of anything that could have a long tail, ask three things: what is the median, how big is the biggest value, and how many of the cases actually sit near the average? If nobody can tell you the median, that is itself informative. And if you are the one reporting the number, give both, because the pair takes one extra clause and removes the whole ambiguity.": "平均数和中位数回答的是不同的问题，而在对称分布上它们恰好给出相同的答案，这正是这个区别如此容易被遗忘的原因。平均数是平衡点：每一个数值都按照自己离得多远的比例去拉它，因此只要有一个数值比其余的大上一千倍，就能把它拉出很远。中位数则是队伍正中间的那个人，它并不在乎最富的人有多富，只在乎一共有多少人。所以两者之间的差距，直接度量了数据有多偏斜。任何不能低于零又没有上限的量，都倾向于朝同一个方向偏斜：收入、财富、房价、引用次数、住院天数、电话等待时长、下载量、每次疫情的死亡人数、每个账号的粉丝数。在所有这些里，平均数都高于中位数，而且尾巴越极端，差距越大。因此引用哪一个是一种选择，而且这种选择并不总是无辜的。想让一个数字听起来慷慨，就用长尾事物的平均数。想让同一批数据听起来朴素，就用中位数。两者都不算撒谎。实用的习惯很简短。当你遇到任何可能有长尾之物的平均值时，问三件事：中位数是多少，最大的那个值有多大，以及真正落在平均值附近的个案有多少。如果没有人能告诉你中位数，这本身就是信息。而如果报数字的人是你，那就两个都给出来，因为这一对只多花一个从句，却把全部含糊一扫而空。",
  "The same finding, peer reviewed, twenty years earlier": "同一个发现，二十年前就已通过同行评议",
  "This is not a new or contested observation. Two decades before the citation-distribution work, a study in the BMJ argued that journal impact factors should not be used to evaluate research, on exactly this ground: citations within a journal are so unevenly spread that the journal's average says very little about any particular paper in it. It reported that roughly the most cited 15 per cent of articles collect half of all a journal's citations, and that the articles actually earning a high impact factor are a small minority. The later work, using a much larger and more recent dataset, put a precise share on it for eleven named journals and found the same picture.": "这既不是新的观察，也不是有争议的观察。在引用分布的研究之前二十年，BMJ 上的一项研究就主张影响因子不应被用来评价研究，理由恰恰在此：一本期刊内部的引用分布极不均匀，以致期刊的平均值几乎说明不了其中任何一篇具体论文。该研究报告说，被引用最多的大约15%的论文汇集了一本期刊全部引用的一半，而真正撑起高影响因子的论文只是极少数。后来的工作使用了大得多也新得多的数据集，为十一本点名的期刊给出了这一比例的精确数值，看到的是同一幅图景。",
  "Mean versus median, a reasoning trap.": "平均数与中位数，一种推理陷阱。",
  "An average sounds like it describes a typical case. Often it describes almost nobody. Scientific journals are ranked by their impact factor, which is simply the average number of citations their papers get. When someone actually checked, three quarters of the papers in Science and in Nature had fewer citations than their own journal's average, and the same held for all eleven journals examined. Nothing was miscalculated. It is just what an average does to any quantity that has a floor and a long tail, which includes incomes, house prices and waiting times. Ask for the median.": "平均值听上去像是在描述一个典型个案。它往往几乎描述不到任何人。科学期刊按影响因子排名，而影响因子不过是其论文获得引用次数的平均数。当真的有人去核对时，Science 和 Nature 中有四分之三的论文，引用次数都低于自己所在期刊的平均值，考察的全部十一本期刊都是如此。没有任何东西算错了。这只不过是平均值对任何一个既有下限又有长尾的量所做的事，而收入、房价和等待时间都属于此列。去要中位数。",
  "Stated plainly because it matters: this source is a preprint and was not peer reviewed. It is used anyway, for three reasons given here so the reader can weigh them. Its authors are the editors of Nature, Science, PLOS, EMBO, eLife and the Royal Society, working from Thomson Reuters citation data, and it is published under CC BY. Its own prose independently restates the table, saying that typically 65 to 75 per cent of articles have fewer citations than the impact factor indicates, so the figures have a second reading inside the same document. And the underlying finding is older and peer reviewed, which is what the deep-dive example is for. Two limits on the numbers themselves. They cover citable items only, meaning research and review articles as classified by Thomson Reuters, because journals publish very different amounts of editorial and news material. And the counts come from a window matched to the impact factor, citations received during 2015 by papers published in 2013 and 2014, so they will not match a journal's published impact factor to the decimal. The paper prints no medians, so this puzzle states none; that the median lies below the mean is a deduction from more than half the papers doing so, not a figure taken from the source.": "这一点必须说清楚：本文献是预印本，未经过同行评议。之所以仍然采用，有三个理由，列在这里供读者自行掂量。其作者是 Nature、Science、PLOS、EMBO、eLife 和 Royal Society 的编辑负责人，所用的是 Thomson Reuters 的引用数据，并以 CC BY 许可发表。其正文又独立地复述了该表格，指出通常有65%到75%的论文获得的引用少于影响因子所显示的数值，因此这些数字在同一份文件里有第二次呈现。而且这一底层发现更为久远，并且经过同行评议，深度阅读的例子正是为此而设。数字本身还有两处限制。它们只覆盖 citable items，即 Thomson Reuters 分类下的研究论文与综述，因为各期刊刊登的社论与新闻类内容数量差异极大。而且计数取自与影响因子相匹配的时间窗，即2013年和2014年发表的论文在2015年内获得的引用，因此不会与某期刊公布的影响因子小数位完全吻合。该文没有印出任何中位数，所以本谜题也不给出中位数；说中位数低于平均值，是从超过一半的论文低于平均值这一点推导出来的，而不是取自原始文献。",
  "A startup with 30 staff advertises an average salary of 95,000. The founder and two executives take home over a million between them. A candidate is told they can expect to earn about the average.": "一家有30名员工的初创公司宣称平均薪资为95,000。创始人和两名高管三人合计拿走了超过一百万。有人告诉一位应聘者，她大致可以拿到平均水平的薪资。",
  "Three very large salaries pull the average far above what the other 27 people earn. The candidate should ask what the middle employee is paid, because that is the figure their own offer will sit near.": "三份极高的薪资把平均值拽到了远高于另外27人所得的位置。这位应聘者该问的是排在中间的那名员工拿多少，因为她自己拿到的报价会靠近那个数字。",
  "A clinic reports a mean waiting time of 40 minutes. Most patients are seen within 15 minutes, but a handful wait several hours when an emergency comes in. A manager tells patients to expect a 40 minute wait.": "某门诊报告平均候诊时间为40分钟。多数患者在15分钟内就诊，但遇到急诊时会有少数人等上好几个小时。一位管理者告诉患者，预计要等40分钟。",
  "Waiting time has a floor of zero and no ceiling, so the rare multi-hour waits drag the mean well above the typical experience. The median wait describes what a patient should actually expect.": "候诊时间下限为零而没有上限，因此那些罕见的数小时等待把平均值拽到远高于通常体验的位置。真正描述患者应当预期什么的，是候诊时间的中位数。",
  "A district reports that the average house sold last year went for 780,000. Reporting notes that a small number of large estates changed hands. A council paper uses the 780,000 figure to argue ordinary families can afford to buy there.": "某地区报告说去年售出的住宅平均成交价为780,000。报道提到有少数几处大庄园易主。一份市政文件用780,000这个数字论证普通家庭在那里也买得起房。",
  "A few very expensive sales lift the mean without changing what an ordinary house costs. Housing affordability is normally reported as a median precisely because sale prices have such a long upper tail.": "少数几笔极其昂贵的成交抬高了平均值，却丝毫没有改变一套普通住宅的价格。住房可负担性通常以中位数报告，原因恰恰在于成交价有一条很长的上尾。",
  "A charity announces that its supporters give an average of 240 a year and asks members whether they are giving their fair share. One donor that year gave several million.": "某慈善机构宣布其支持者平均每年捐赠240，并询问会员是否尽到了应尽的一份。那一年有一位捐赠者捐了数百万。",
  "A single enormous gift can lift the mean of a large group on its own. Asking ordinary members to measure themselves against that figure compares them with a number no ordinary member produced.": "仅仅一笔巨额捐赠就足以抬高一个大群体的平均值。让普通会员拿这个数字衡量自己，等于是拿一个没有任何普通会员产生过的数字去比。",
  "A ward reports a mean length of stay of 6.2 days and plans its bed numbers on the assumption that a typical patient occupies a bed for about six days. Most patients go home on day two or three; a few stay for months.": "某病区报告平均住院日为6.2天，并据此按典型患者约占用病床六天来规划床位数。多数患者第二或第三天就回家了，少数患者住了好几个月。",
  "The long-stay patients pull the mean upward while the typical patient leaves far sooner. Planning around the mean will misjudge both how fast beds turn over and how many are locked up long term.": "长期住院的患者把平均值往上拽，而典型患者离开的时间要早得多。按平均值规划，会同时误判病床周转的速度和被长期占用的床位数量。",
  "A marketplace tells prospective sellers that the average shop on the platform earns 3,400 a month. A handful of very large shops account for most of the platform's sales volume.": "某电商平台告诉潜在卖家，平台上平均每家店铺月入3,400。少数几家非常大的店铺占据了平台绝大部分销售额。",
  "With a few dominant shops, the mean describes almost none of the sellers. A prospective seller wants the middle shop's earnings, and would also want to know how many shops earn nothing at all.": "当存在少数几家主导性店铺时，平均值几乎描述不了任何一位卖家。潜在卖家想知道的是排在中间那家店铺的收入，并且还会想知道有多少家店铺根本没有任何收入。",
  "A tutor reports that students improved by an average of 18 points. Of the 20 students, 17 gained about 4 points and 3 gained more than 90 each after starting from almost zero.": "某位教师报告说学生平均提高了18分。20名学生中，有17人提高了大约4分，另外3人从接近零分起步，各自提高了90分以上。",
  "The three large gains carry the average. Reporting 18 points as the typical improvement describes none of the 17 students who actually make up the bulk of the class.": "撑起这个平均值的是那三次大幅提高。把18分说成典型的提高幅度，描述不了构成班级主体的那17名学生中的任何一个。",
  "A support team advertises a mean first-response time of 2 hours. Almost all tickets are answered within 20 minutes, while a small number sit unanswered for days. The team treats the 2 hour figure as its service standard.": "某客服团队宣称首次响应的平均时间为2小时。几乎所有工单都在20分钟内得到答复，而少数工单会连着好几天无人处理。团队把2小时这个数字当作自己的服务标准。",
  "The stalled tickets are what produce the 2 hour mean, and they are exactly the cases the standard should be about. A median plus a worst-case percentile would describe both the usual case and the failures.": "产生这个2小时平均值的正是那些积压的工单，而它们恰恰是服务标准本该管的情形。中位数再配上一个极端百分位，才能把通常情况和失败情况都描述清楚。",
  "A report states that average household wealth in a country is 480,000 and concludes that most households have substantial savings to fall back on in a downturn.": "某报告称一国家庭的平均财富为480,000，并据此断定多数家庭在经济下行时都有相当可观的储蓄可供依靠。",
  "Wealth is among the most lopsided quantities there is, with a floor at zero and an extremely long tail, so the mean sits far above the middle household. Nothing about typical savings follows from it.": "财富是现存最偏斜的量之一，下限为零而尾巴极长，因此平均值远高于处在中位的那个家庭。由它推不出任何关于典型储蓄的结论。",
  "A department evaluates researchers by the average citations of the journals they publish in, treating a paper in a high-average journal as a stronger paper than one in a low-average journal.": "某院系以研究者所发表期刊的平均引用数来评价他们，认为发在高平均值期刊上的论文优于发在低平均值期刊上的论文。",
  "A journal's average is dragged up by a small number of very heavily cited papers, so most of its papers fall below it. The average of the container says remarkably little about any individual item in it.": "一本期刊的平均值是被少数几篇被引极多的论文抬上去的，因此它的多数论文都低于这个平均值。容器的平均值，对于其中任何一件具体内容所能说明的，少得惊人。",
  "A statistics agency reports median household income and states the mean alongside it, noting that the gap between the two reflects how unevenly income is spread.": "某统计机构公布家庭收入的中位数，并在旁边一并给出平均数，同时注明两者之间的差距反映了收入分布有多不均。",
  "Both figures are given and the gap between them is explained rather than hidden. That is the standard honest way to report a quantity with a long tail.": "两个数字都给了出来，而两者的差距是被解释而不是被隐藏。这正是报告一个长尾量的标准而诚实的做法。",
  "A factory reports the mean diameter of a machined part as 20.00 mm, with measurements clustered tightly and symmetrically either side of that value.": "某工厂报告一个机加工零件的平均直径为20.00 mm，测量值紧密且对称地分布在该值两侧。",
  "For a symmetric, tightly clustered quantity the mean and the median coincide, and the mean is the right summary. The problem only arises when the distribution is lopsided.": "对于对称且紧密聚集的量，平均数与中位数重合，平均数就是恰当的概括。只有当分布偏斜时问题才会出现。",
  "A utility multiplies the mean household consumption by the number of households to work out how much electricity it must generate in total.": "某电力公司用每户的平均用电量乘以户数，算出自己总共需要发多少电。",
  "The mean is exactly the right tool here, because a total is what it is built from. It would be the wrong tool for describing a typical household, which is a different question.": "在这里平均数恰恰是正确的工具，因为总量本来就是平均数据以构成的东西。用它来描述一个典型家庭则是错的工具，那是另一个问题。",
  "The average on its own": "只看平均值",
  "Where that average sits": "这个平均值落在哪里",

  // ---- Length-time bias, reworded ----
  "Whenever a screening programme is defended with how well its detected cases do, ask what kind of disease a periodic test can catch. A tumour that takes years to declare itself is available to be found on many visits; one that goes from nothing to symptoms in three months is available on almost none. The only fair question is whether deaths fall in everyone offered screening. None of which says screening cannot work. Where disease caught earlier is genuinely more treatable, so that the stage it is found at changes what treatment can achieve, finding it early does save lives, and randomised trials have shown exactly that for several cancers. What this bias says is narrower: you cannot demonstrate that benefit by comparing how screen-detected cases fare against symptom-detected ones, because those two groups were never the same kind of disease to begin with.": "每当有人用筛查项目所检出病例的良好结局来为它辩护时，请先问一问：一项定期检查究竟能抓到哪一类疾病。一个要花好几年才显露出来的肿瘤，在许多次就诊中都处于可被发现的状态；而一个从毫无迹象到出现症状只用三个月的肿瘤，几乎在任何一次就诊中都不处于那种状态。唯一公平的问题是：在所有被提供筛查的人当中，死亡是否减少了。但这一切都没有说筛查不可能起作用。凡是更早发现的疾病确实更易治疗，以致于发现时所处的分期改变了治疗所能达到的效果，那么早发现确实能挽救生命，而随机试验对若干种癌症正好证明了这一点。这一偏倚所说的要窄得多：你无法通过比较筛查检出病例与症状检出病例的结局来证明那种获益，因为这两组从一开始就根本不是同一类疾病。",
  "Picture the same disease arriving in two speeds. Slow tumours spend years in the window where a test could find them but the patient feels nothing. Fast ones cross that window in weeks. Now sample the population every six months. You will find nearly all the slow ones and almost none of the fast ones, because the fast ones announce themselves between your visits. So the pile of screen-detected cases is loaded with indolent disease, and the pile of symptom-detected cases is loaded with aggressive disease, before treatment enters the story at all. Compare their outcomes and screening looks wonderful. At the extreme edge of this sits overdiagnosis: disease so slow it would never have troubled the person in their lifetime, which counts as a cancer found and cured while doing nothing but harm through the treatment. The defence is the same one that beats lead-time bias, and it is the reason screening programmes are judged the way they are: randomise who is invited, then count deaths in everyone invited, attended or not, diagnosed or not. Programmes that pass that test exist, which is the other half of the point. Where catching disease at an earlier stage genuinely changes what treatment can do, the benefit is real and it shows up as fewer deaths in the invited group; the test is simply what tells you which programmes those are.": "设想同一种疾病以两种速度到来。生长缓慢的肿瘤会在那个检查本可发现、而患者毫无感觉的窗口里停留数年。生长快速的则在数周内穿过那个窗口。现在每六个月对人群筛查一次。你会找到几乎全部缓慢的，却几乎找不到快速的，因为快速的那些会在两次就诊之间自己宣告存在。于是筛查检出的那一堆病例塞满了惰性疾病，症状检出的那一堆塞满了侵袭性疾病，而这一切在治疗登场之前就已经发生了。比较两者的结局，筛查看起来棒极了。这一现象的极端处坐落着过度诊断：疾病缓慢到在此人一生中根本不会带来任何麻烦，却被算作一例被发现并治愈的癌症，而治疗除了造成伤害之外什么也没做。应对之道与击破前置时间偏倚的方法相同，这也正是筛查项目为何要那样评判的原因：随机决定邀请谁，然后统计所有被邀请者中的死亡人数，无论其是否前来、是否被诊断。确实存在通过这一检验的项目，而这正是问题的另一半。凡是在更早分期发现疾病真正改变了治疗所能做到的事情，获益就是真实的，并且会以被邀请组死亡更少的形式显现出来；这项检验不过是告诉你哪些项目属于此类。",
  "A test you run every few months finds slow-growing disease far more easily than fast-growing disease, because slow disease sits there for years waiting to be found while fast disease erupts between visits. Slow disease also has a better outlook whatever anyone does. So the cases a screening programme catches are the gentle ones, and they do well, and the programme takes the credit. None of this means screening cannot work: where disease caught earlier is genuinely more treatable, catching it early does save lives, and randomised trials have shown it. It means you cannot prove it by comparing the cases the screen caught against the cases that walked in. The only number that cannot be gamed this way is deaths in everyone offered screening, whether or not they attended.": "一项每隔几个月做一次的检查，找到生长缓慢的疾病要比找到生长快速的疾病容易得多，因为缓慢的疾病会在那里等上好几年等着被发现，而快速的疾病则在两次就诊之间突然爆发。而且无论谁做什么，缓慢的疾病本来预后就更好。所以筛查项目抓到的病例都是温和的那些，他们结局良好，于是项目把功劳揽了过去。但这并不意味着筛查不可能起作用：凡是更早发现的疾病确实更易治疗，早发现确实能挽救生命，随机试验也已经证明了这一点。它的意思是，你无法通过把筛查抓到的病例和自己走进门来的病例相比较来证明这一点。唯一无法用这种方式做手脚的数字，是所有被提供筛查的人当中的死亡人数，无论他们是否真的来过。",

  // ---- The illusory truth effect ----
  "Seeing a claim once, a week ago, already made it feel truer. What does seeing it 27 times do?": "一周前只看过一次，这个说法就已经让人觉得更可信了。那么看27次会怎样？",
  "Fifty-seven people were shown trivia statements, the sort nobody can check off the top of their head, like which country invented the zipper. A week later they rated how true each one seemed, from 1 to 6. Statements they had never seen scored 3.64. Statements they had seen exactly once, seven days earlier, scored 4.26. Nothing about the statements changed in between, and no evidence for any of them was ever offered. The only difference was having met them before.": "五十七个人被展示了一些常识性说法，就是那种谁也没法当场核实的，比如拉链是哪个国家发明的。一周之后，他们按1到6给每一条打分，表示它看起来有多真。从没见过的说法得了3.64分。七天前恰好见过一次的说法得了4.26分。这期间说法本身没有任何变化，也从未为其中任何一条提供过证据。唯一的差别，就是此前是否遇到过。",
  "Some statements had been shown 27 times. Where did those land?": "有些说法被展示了27次。那些落在了哪里？",
  "How true a statement seemed, by how often it had been seen": "一个说法看起来有多真，取决于它被看过多少次",
  "times seen, a week earlier": "一周前看过的次数",
  "Average rating that the statement is true, from 1 to 6": "该说法为真的平均评分，1到6",
  "57 people, rating trivia statements a week after seeing them.": "57人，在看过一周之后为常识性说法打分。",
  "These are the average ratings the source printed, on its 1 to 6 scale, not counts of people. The share of the climb bought by the first showing is derived from them rather than authored.": "这些是原始文献印出的平均评分，用的是它自己的1到6量表，而不是人数统计。第一次重复所买下的上升幅度占比，是由这些数值推导出来的，而不是手写上去的。",
  "Never seen": "从未见过",
  "Never": "从未",
  "Seen once": "见过一次",
  "Once": "一次",
  "Seen 9 times": "见过9次",
  "9 times": "9次",
  "Seen 18 times": "见过18次",
  "18 times": "18次",
  "Seen 27 times": "见过27次",
  "27 times": "27次",
  "Never seen, against seen once": "从未见过，对比见过一次",
  "Far higher, roughly in proportion to the repetitions": "高得多，大致与重复次数成正比",
  "27 times is a different order of thing": "27次完全是另一个量级",
  "Lower, because hearing it over and over breeds suspicion": "更低，因为反复听会让人起疑",
  "people resent being drummed at": "人们讨厌被反复灌输",
  "Barely higher than seeing it once": "只比看过一次略高一点点",
  "check what the scale allows": "看看这个量表允许什么",
  "4.87. Twenty-six further showings did about what the first one did.": "4.87。之后那二十六次展示，所起的作用大致等于第一次。",
  "Repetition buys almost all of its effect on the very first repeat": "重复几乎在第一次重复时就买下了它的全部效果",
  "One showing lifted the rating by 0.62, from 3.64 to 4.26. Going on to twenty-seven showings lifted it by 0.61 more, to 4.87. So the entire climb is 1.23 points and the single first showing bought half of it, with the other half spread across twenty-six more. Drawn against the number of showings rather than as a tidy row, the curve is almost all cliff and then almost all plateau:": "仅仅展示一次，评分就上升了0.62，从3.64升到4.26。一路增加到二十七次，也只再上升了0.61，达到4.87。也就是说，整段上升是1.23分，而仅仅第一次展示就买下了其中一半，另一半由另外二十六次分摊。若按展示次数来作图，而不是排成整齐的一行，这条曲线几乎全是悬崖，然后几乎全是平台：",
  "Every number of showings they tested": "他们测试过的每一个展示次数",
  "Be careful what this does and does not say, because the flat-looking tail is easy to overstate. The later showings were not doing nothing: in this experiment, nine, eighteen and twenty-seven showings all scored reliably above one showing. What the data says is about proportion, not about nothing, and it is quite strong enough. If you wanted to make a false statement feel true, the expensive part of the campaign, the twenty-six extra repetitions, bought you roughly what the very first cheap repeat did.": "要留意这说了什么、又没说什么，因为这条看似平坦的尾巴很容易被夸大。后面那些展示并非什么都没做：在这项实验中，九次、十八次和二十七次的评分都可靠地高于仅仅一次。数据讲的是比例，不是毫无作用，而这已经足够有分量了。如果你想让一个虚假的说法显得为真，那么这场宣传中昂贵的部分，也就是额外那二十六次重复，给你带来的大致相当于最初那一次廉价的重复。",
  "The rest of the curve": "曲线的其余部分",
  "The illusory truth effect": "真相错觉效应",
  "Familiarity feels like truth. A claim you have met before is rated truer than one you have not, with no new evidence and no argument, and most of that lift arrives the second time you meet it.": "熟悉感尝起来就像真相。一个你此前遇到过的说法，会比没遇到过的被评为更真，哪怕没有任何新证据、没有任何论证。而且这份提升的绝大部分，在你第二次遇到它时就已经到位了。",
  "The practical consequence is uncomfortable and worth sitting with. It means your sense that a claim is plausible is partly a memory of having encountered it, and you cannot tell those two feelings apart from the inside. It also means the defence is not scepticism in the moment, since the feeling arrives before any thinking does. The defence is asking where you first met a claim, and noticing when the honest answer is that you cannot remember, only that it sounds familiar.": "实际后果令人不安，值得停下来想一想。它意味着，你觉得某个说法可信这一感受，有一部分只是你曾经遇到过它的记忆，而你无法从内部把这两种感觉区分开。它还意味着，当场的怀疑并不构成防线，因为那份感觉在任何思考之前就已抵达。真正的防线，是去问自己第一次是在哪里遇到这个说法的，并在诚实的答案是「记不得了，只是听着耳熟」时察觉到这一点。",
  "The mechanism is processing fluency. Something you have seen before is easier for your brain to take in the second time, and that ease registers as a small, wordless signal of rightness. Your mind then has to explain the signal, and truth is the readiest explanation available, since true things do tend to be the ones you hear repeated. So the feeling is not stupid, it is a decent heuristic being fed the wrong input. What makes it dangerous is that it does not require you to believe anything on first contact. You can hear a claim, dismiss it as nonsense, forget where you heard it, and still find it slightly more plausible a week later, because what survives is the fluency and not the dismissal. That is also why the effect is largely immune to knowing about it, and why it works even on people who could state the correct answer if asked directly. Three things follow. Repetition is a persuasion technique in its own right, independent of evidence, which is why propaganda has always been repetitive and why advertising repeats rather than argues. Correcting a falsehood by restating it, as fact checks must, carries a real cost, since the restatement is itself another exposure. And the front-loading matters for how you read a flood of identical claims: the flood is not what convinced people, it convinced them early and then mostly wasted its own ammunition. If you want a habit out of this, it is to separate two questions that feel like one. Does this sound right, and what is the evidence for it? The first question is answered partly by how many times you have heard it, which is not evidence about the world at all.": "其机制是加工流畅性。你此前见过的东西，第二次更容易被大脑接收，而这份轻松会被登记为一个微小的、无言的「对劲」信号。你的心智接着必须解释这个信号，而最顺手的解释就是「因为它是真的」，毕竟真的事情确实往往是你反复听到的那些。所以这种感觉并不愚蠢，它是一条不错的经验法则被喂了错误的输入。真正危险之处在于，它并不要求你在第一次接触时相信任何东西。你可以听到一个说法，把它当成胡说而否定，忘记自己在哪儿听过，然后在一周后仍然觉得它稍微更可信一些，因为存活下来的是那份流畅性，而不是那次否定。这也是为什么知道有这种效应几乎无法免疫，为什么它对那些被直接询问时能说出正确答案的人同样奏效。由此有三点推论。重复本身就是一种独立于证据的说服技术，这正是宣传历来反复、而广告靠重复而非论证的原因。通过复述来纠正谬误，而事实核查又不得不复述，是有真实代价的，因为复述本身就是又一次曝光。而效果的前置，改变了我们该如何看待同一说法的洪流：让人们信服的并不是那场洪流，它很早就完成了说服，之后大体上只是在浪费自己的弹药。如果要从中提炼一个习惯，那就是把两个看似同一的问题分开。这听上去对吗，以及它的证据是什么？前一个问题的答案，有一部分取决于你听过它多少次，而那根本不是关于世界的证据。",
  "The same effect, forty-four years earlier": "同样的效应，四十四年前就有",
  "This is one of the older findings in the field and it has replicated steadily. In the original study, people rated plausible statements for truth on three occasions two weeks apart. Some statements were repeated across the sessions and some appeared only once. Ratings for the repeated statements climbed each time, while ratings for the ones seen only once did not move, and the climb happened for false statements exactly as it did for true ones. The authors concluded that how often something has been encountered is used as a criterion for whether it is true.": "这是该领域较早的发现之一，并且一直稳定地被重复验证。在最初的研究中，人们分三次、每次相隔两周，对一些看似合理的说法评估真伪。有些说法在各次之间重复出现，有些只出现一次。重复出现的说法评分每次都上升，而只见过一次的评分纹丝不动，并且这种上升在虚假说法上与在真实说法上完全一样。作者由此得出结论：一个人遇到某事的频率，被用作判断它是否为真的一条标准。",
  "The illusory truth effect, a reasoning trap.": "真相错觉效应，一种推理陷阱。",
  "A claim you have met before feels truer than one you have not, even with no evidence attached and even if you dismissed it the first time. In one experiment people rated trivia statements from 1 to 6 a week after seeing them. Never seen: 3.64. Seen once: 4.26. Seen twenty-seven times: 4.87. So a single repeat bought half the total effect and the other twenty-six bought the rest between them. That is worth knowing about propaganda, which has always been repetitive, and about your own sense of plausibility, which is partly just a memory of having heard something before. Ask where you first met a claim. If the answer is that it merely sounds familiar, that is not evidence.": "一个你此前遇到过的说法，会比没遇到过的显得更真，哪怕没有附带任何证据，哪怕你第一次就否定过它。在一项实验中，人们在看过一些常识性说法一周后按1到6打分。从未见过：3.64。见过一次：4.26。见过二十七次：4.87。也就是说，仅仅一次重复就买下了总效果的一半，另外二十六次一起分掉了剩下的一半。这一点值得用来理解宣传，它历来就是反复的；也值得用来理解你自己的「可信感」，它有一部分不过是曾经听过某件事的记忆。去问问自己第一次在哪里遇到这个说法。如果答案只是「听着耳熟」，那不是证据。",
  "The stimuli are neutral trivia statements of ambiguous plausibility, of the gestation-period-of-a-giraffe kind, which is why this paper was chosen over the better known illusory-truth work that runs on political headlines: the evidence stays non-partisan even though the applications are not. Three limits are worth stating. The outcome is a published mean on a 1 to 6 rating scale rather than a count of people, so no number of individuals can be recovered from it, and the figure says so. The plateau is real but must not be overstated: in this experiment nine, eighteen and twenty-seven showings each still scored reliably above a single showing, with effect sizes of 0.62, 0.49 and 0.80, so the honest claim is about the share of the climb the first showing carries and not about later showings doing nothing. The paper's Experiment 1, which ran only to nine showings, is the one in which every later step between adjacent counts was non-significant. And the samples are modest, 51 and 57 people, though the overall effect of repetition was large in both, at d = 1.00 and d = 1.09.": "实验材料是可信度模糊的中性常识性说法，属于「长颈鹿的妊娠期」这一类，这也正是选择本文而非那些以政治性标题为材料的、更为人熟知的真相错觉研究的原因：即便应用是政治性的，证据本身仍保持非党派。有三点限制值得说明。所测的是在1到6评分量表上公布的平均值，而不是人数统计，因此无法从中还原出任何个体数目，图上也写明了这一点。那段平台是真实的，但绝不可夸大：在这项实验中，九次、十八次和二十七次的评分各自都可靠地高于仅仅一次，效应量分别为0.62、0.49和0.80，所以诚实的说法是关于第一次展示所占的上升比例，而不是说后面的展示毫无作用。相邻次数之间每一步都不显著的，是该文只做到九次的实验1。此外样本规模不大，分别为51人和57人，尽管两项实验中重复的总体效应都很大，d = 1.00 和 d = 1.09。",
  "A campaign repeats one unsupported claim in every advert for six weeks. Polling afterwards finds more people rate the claim plausible than before, and the campaign concludes that the public examined the argument and found it convincing.": "某宣传活动连续六周在每一条广告中重复同一个没有依据的说法。事后的民调发现，认为该说法可信的人比以前更多，宣传方由此断定公众审视了论据并觉得有说服力。",
  "No argument was ever offered, so nothing was examined. Repetition on its own raises how true a claim feels, which means the poll measured exposure rather than persuasion by evidence.": "从头到尾没有提出过任何论据，所以并没有什么被审视。仅仅重复本身就会提高一个说法给人的真实感，这意味着这次民调测到的是曝光，而不是被证据说服。",
  "A rumour circulates in an office for a month. Asked about it, staff say it must have something to it because they have heard it from several directions, though nobody can name an original source.": "某个传言在一间办公室里流传了一个月。被问到时，员工说这事总该有点根据吧，因为他们从好几个方向都听说了，可是没有人能说出最初的出处。",
  "Hearing something from several directions feels like corroboration and is often just the same claim going round. Without an original source, the sense that it must have something to it is a memory of exposure, not evidence.": "从好几个方向听到某件事，感觉像是相互印证，而往往只是同一个说法在打转。没有最初出处，那种「总该有点根据」的感觉是曝光留下的记忆，而不是证据。",
  "A newspaper runs a weekly column that restates a popular false claim in its headline and debunks it underneath. A survey a month later finds readers of the column more likely to believe the claim than non-readers.": "某报开设每周专栏，把一个流行的虚假说法放在标题里，然后在下面加以驳斥。一个月后的调查发现，该专栏的读者比不读的人更相信那个说法。",
  "Every restatement is another exposure, and the familiarity outlasts the correction attached to it. Leading with the falsehood is the risky format; leading with the true version and never headlining the false one avoids it.": "每一次复述都是又一次曝光，而熟悉感比随附的更正活得更久。把谬误放在标题里是危险的格式；把正确的版本放在前面、绝不为虚假版本做标题，才能避开它。",
  "A brand runs the same claim about its product 40 times a week rather than 4, and reports that the higher frequency is what made audiences believe it, since belief was higher than in an unexposed region.": "某品牌把关于自家产品的同一说法从每周4次改为每周40次投放，并报告说正是这种更高的频率让受众相信了它，因为相信的人比未投放地区更多。",
  "Comparing 40 exposures against zero cannot tell you what the extra 36 bought. Most of the shift in believability arrives on the first repeat, so the comparison the claim needs is 40 against 4, not 40 against none.": "拿40次曝光和零次相比，说不出多出来的那36次买到了什么。可信度的变化大部分在第一次重复时就已到位，所以真正需要的比较是40次对4次，而不是40次对没有。",
  "A teaching myth is repeated in induction sessions year after year. Staff who first heard it as a caution, and were told at the time it was unproven, now cite it as established practice.": "某个教学上的迷思年复一年在入职培训中被重复。当年第一次听到时它是作为一条提醒讲的，而且当时就被告知未经证实，如今这些员工却把它当作既定做法来引用。",
  "What survives repetition is the claim, not the caveat attached to it. People can dismiss something on first contact, forget where they met it, and later find it plausible purely because it feels familiar.": "在重复中存活下来的是那个说法，而不是随附的保留意见。人可以在第一次接触时就否定某事，忘记自己在哪儿遇到过它，之后仅仅因为它显得耳熟而觉得它可信。",
  "A reader scrolls past the same unverified headline on four platforms without opening any of them. Weeks later they repeat it in conversation as something they are fairly sure is true, and cannot say where they read it.": "某位读者在四个平台上刷过同一条未经核实的标题，一条都没点开。几周之后，他在聊天中把它当作自己相当有把握的事情说了出来，却说不上在哪儿读到的。",
  "Not being able to name the source while feeling fairly sure is the signature of the effect. The confidence is built out of fluency from repeated exposure rather than out of anything anyone actually checked.": "说不出出处却又觉得相当有把握，这正是该效应的标志。这份笃定是由重复曝光带来的流畅感搭起来的，而不是由任何人真正核实过的东西搭起来的。",
  "A team assumes its specialists are immune to a repeated falsehood about their own field, on the grounds that they know the correct answer and would simply notice.": "某团队认定，自家专家对本领域内一个被反复重复的谬误是免疫的，理由是他们知道正确答案，自然会察觉。",
  "Knowing the right answer does not prevent the feeling of familiarity, which arrives before any deliberate checking. People who can state the correct fact when asked directly still rate the repeated falsehood as more plausible.": "知道正确答案并不能阻止熟悉感的产生，而熟悉感先于任何有意的核查抵达。那些被直接询问时能说出正确事实的人，依然会把重复过的谬误评为更可信。",
  "A product claim is quoted in a dozen blog posts, all of which trace back to a single press release. A buyer says the claim is well supported because it appears in so many places.": "关于某产品的一个说法被十几篇博客文章引用，而这些文章全都可以追溯到同一份新闻稿。一位买家说这个说法很有依据，因为它出现在那么多地方。",
  "A dozen copies of one source is one source. Counting appearances measures how widely something was repeated, which is a fact about distribution and not about whether it is true.": "同一个出处的十几份复制，仍然只是一个出处。清点出现次数衡量的是某事被重复得多广，这是关于传播的事实，而不是关于它是否为真的事实。",
  "An organisation decides that a rival's occasional, low-volume repetition of a false claim is harmless, because it is nothing like a saturation campaign and so cannot move anyone.": "某组织认为，竞争对手偶尔、低强度地重复一个虚假说法是无害的，因为这完全不像饱和式宣传，因而打动不了任何人。",
  "The dose response is heavily front-loaded, so the first repeat does most of the work and a low-volume drip is not proportionally harmless. Volume is not what makes repetition effective.": "剂量反应严重前置，第一次重复就完成了大部分工作，所以低强度的涓滴式重复并不会按强度比例地无害。让重复奏效的并不是量。",
  "Sorting claims to investigate, a team puts the ones that sound plausible at the bottom of the list, reasoning that plausible-sounding claims are less likely to be worth checking.": "在排序该核查哪些说法时，某团队把听上去可信的放在名单末尾，理由是听上去可信的说法大概不太值得核查。",
  "Sounding plausible is partly just having been encountered before, so this rule deprioritises exactly the claims that have already circulated most. Familiarity and truth feel identical from the inside.": "听上去可信，有一部分不过是此前遇到过而已，所以这条规则恰恰把流传最广的那些说法排到了最后。熟悉与真实，从内部感觉起来一模一样。",
  "A public health body repeats one message consistently for a year, and the message states a finding along with the trial it comes from, so that each repetition carries the evidence with it.": "某公共卫生机构在一年里始终如一地重复同一条讯息，而这条讯息在陈述一项发现的同时也给出它所依据的试验，因此每一次重复都把证据一并带上。",
  "Repetition is a delivery choice and not a flaw in itself. What matters is whether the claim is supported, and here the support travels with it rather than being replaced by familiarity.": "重复是一种传播上的选择，本身并不是缺陷。要紧的是这个说法有没有依据，而这里依据是随它一起传播的，而不是被熟悉感取代了。",
  "A claim is reported by three outlets that each did their own reporting, naming different primary documents and interviewing different people, and an editor treats the agreement as genuine corroboration.": "某个说法被三家媒体报道，它们各自独立采访，援引了不同的原始文件，采访了不同的人，一位编辑把这种一致视为真正的相互印证。",
  "These are independent lines of evidence rather than one claim echoing, so their agreement really is corroboration. The problem arises only when repeated appearances all trace back to a single source.": "这是彼此独立的证据线，而不是同一个说法在回响，所以它们的一致确实构成印证。问题只在于重复出现的内容全都追溯到同一个出处时才会产生。",
  "A broadcaster corrects a false claim by leading with the accurate version, describing the false one briefly and only once, and closing on the accurate version again.": "某电视台在纠正一个虚假说法时，先讲正确的版本，只简短地提一次虚假版本，最后再以正确版本收尾。",
  "This is the format designed around the problem: the true statement gets the repetitions and the false one gets as few as possible. Correcting is not the risk; headlining the falsehood repeatedly is.": "这正是围绕这个问题设计出来的格式：真实的陈述拿到重复，虚假的那个尽可能少出现。风险不在于纠正，而在于反复把谬误放进标题。",
  "As far as it goes": "目前画到哪里",
  "The whole curve": "完整的曲线",

  // ---- Anchoring ----
  "Five seconds to estimate 1 x 2 x 3 x 4 x 5 x 6 x 7 x 8. This group's typical answer was 512.": "五秒钟估算 1 x 2 x 3 x 4 x 5 x 6 x 7 x 8。这组人给出的典型答案是512。",
  "High school students were shown a multiplication on a blackboard and given five seconds to estimate the answer. Five seconds is nowhere near enough to actually multiply eight numbers, so what people do is work through the first two or three steps and then guess upward from where they have got to. The typical answer from this group was 512. A second group of students, given the same five seconds, saw the identical eight numbers written in the opposite order: 8 x 7 x 6 x 5 x 4 x 3 x 2 x 1.": "研究者在黑板上给中学生看一道乘法题，给他们五秒钟估算结果。五秒远远不够真正把八个数乘出来，所以人们实际会做的是算出前两三步，然后从算到的地方往上外推。这组人给出的典型答案是512。另一组学生，同样只有五秒，看到的是完全相同的八个数字，只是顺序反过来写：8 x 7 x 6 x 5 x 4 x 3 x 2 x 1。",
  "The second group was estimating exactly the same product. What was their typical answer?": "第二组估算的是完全相同的乘积。他们给出的典型答案是多少？",
  "Estimating the same product, written two ways": "估算同一个乘积，写成两种样子",
  "The actual product": "实际的乘积",
  "These are the median estimates the source printed. It gives no group sizes, no spread around either median and no test statistic for this demonstration, so nothing else is drawn here.": "这些是原始文献印出的中位数估计。对于这项演示，它没有给出各组人数，没有给出任何一个中位数的离散程度，也没有给出检验统计量，所以这里不再画别的东西。",
  "Shown the numbers ascending": "看到的数字是升序排列",
  "Ascending": "升序",
  "1 x 2 x 3 x 4 x 5 x 6 x 7 x 8": "1 x 2 x 3 x 4 x 5 x 6 x 7 x 8",
  "Shown the numbers descending": "看到的数字是降序排列",
  "Descending": "降序",
  "8 x 7 x 6 x 5 x 4 x 3 x 2 x 1": "8 x 7 x 6 x 5 x 4 x 3 x 2 x 1",
  "The ascending group only": "只看升序那一组",
  "About the same, since it is the same product": "差不多一样，因为本来就是同一个乘积",
  "the order cannot matter": "顺序不可能有影响",
  "Lower, because starting at 8 is intimidating": "更低，因为从8开始让人发怵",
  "big numbers make people cautious": "大数字让人变得保守",
  "Higher, and by a lot": "更高，而且高很多",
  "look at where each one starts": "看看每一个是从什么开始的",
  "2,250. The same eight numbers, backwards, and the typical guess more than quadrupled.": "2,250。同样的八个数字倒过来写，典型答案就翻了四倍还多。",
  "You anchor on the first few steps and adjust far too little from there": "人会锚在最初几步上，然后从那里调整得远远不够",
  "Nobody multiplied anything. In five seconds you get through 1 x 2 x 3, which is 6, or through 8 x 7 x 6, which is 336, and then you scale up from whatever number you are holding. That starting point is the anchor, the adjustment upward is never anywhere near enough, and the order of the digits is the only thing that differed. Now put the real answer on the same axis:": "没有人真的做了乘法。五秒钟里你能算到 1 x 2 x 3，也就是6，或者算到 8 x 7 x 6，也就是336，然后就从手上这个数往上放大。那个起点就是锚，向上的调整从来都远远不够，而唯一不同的只是数字的排列顺序。现在把真正的答案放到同一根轴上：",
  "Both guesses, and the answer": "两个估计，和答案",
  "The second thing the chart does is more sobering than the first. The two groups look far apart from each other, 512 against 2,250, but against 40,320 they are both rounding errors: 1.3 and 5.6 per cent of the answer. Even the group that guessed higher was out by a factor of eighteen. So the anchor did not just tilt the estimate, it set the entire scale of the answer, and the adjustment afterwards never had a chance of escaping it.": "这张图做的第二件事比第一件更让人清醒。两组人看起来相距甚远，512对2,250，但放到40,320面前，两者都只是舍入误差：分别是答案的1.3%和5.6%。就连估得更高的那一组也差了十八倍。所以锚不只是让估计偏了一点，它直接定下了整个答案的量级，而之后的调整从一开始就没有机会挣脱出来。",
  "What five seconds actually buys": "五秒钟真正能买到什么",
  "Anchoring": "锚定效应",
  "The first number in the room sets the scale for every number that follows it, including numbers that have nothing to do with it. Adjustment away from an anchor is almost always too small.": "最先说出口的那个数字，会为其后所有数字定下量级，哪怕那些数字与它毫无关系。从锚出发的调整，几乎总是太小。",
  "The uncomfortable part is that the anchor does not have to be relevant, or credible, or even offered in good faith. In the same paper, an anchor generated by spinning a wheel of fortune in front of the participants, who could see it was random, still moved their estimates: median guesses of the percentage of African countries in the United Nations were 25 and 45 for groups that had watched the wheel land on 10 and 65. The authors add that paying people for accuracy did not reduce the effect.": "令人不安的地方在于，锚不需要相关，不需要可信，甚至不需要出于善意。在同一篇论文里，研究者当着参与者的面转动幸运轮盘产生一个锚，参与者明明看得出那是随机的，估计值仍然被它带偏：看到轮盘停在10和65的两组人，对非洲国家占联合国成员比例的中位数估计分别是25和45。作者还补充说，为准确性付钱并不能减弱这一效应。",
  "Anchoring works because estimating is expensive and comparing is cheap. Faced with a quantity you do not know, the mind does not build an answer from nothing; it grabs whatever number is nearby and asks whether the true value is bigger or smaller than that. This is a sensible strategy when the nearby number is informative. The trouble is that the grabbing happens whether or not it is informative, and the adjustment that follows is throttled by the effort it takes: you move away from the anchor until the answer stops feeling obviously wrong, and stopping there is almost always stopping too early. Three consequences are worth carrying around. First, whoever speaks first in a negotiation is not merely stating a position, they are setting the scale on which every later number will be judged, which is why an opening offer that seems absurd is often working exactly as intended. Second, an anchor does not need to be a number: the first proposal, the first draft, the first estimate anyone says out loud in a meeting does the same job to everything said afterwards. Third, and this is what the political version of the idea trades on, repeatedly voicing a position far outside what is currently normal shifts where the middle appears to be, without a single argument being made for it. The defences are unglamorous and they work. Make your own estimate before you hear anyone else's, and write it down, because an unstated estimate quietly rewrites itself. Ask what the answer would be if the anchor were doubled or halved, which is a way of testing whether you are reasoning or just decorating a number you were handed. And when you catch yourself adjusting from a figure, adjust further than feels right, because the pull is always toward stopping too soon.": "锚定之所以奏效，是因为估算代价高昂而比较代价低廉。面对一个你并不知道的量，大脑不会从零开始搭出一个答案，它会抓住手边现成的那个数，然后问真值比它大还是小。当手边那个数确实有信息时，这是个明智的策略。麻烦在于，无论它有没有信息，这一抓都会发生，而随后的调整又被所需的努力卡住：你从锚往外挪，挪到答案不再明显离谱就停下，而停在那里几乎总是停得太早。有三点后果值得随身带着。第一，在谈判中先开口的人不只是在陈述立场，他是在设定此后所有数字被评判的量级，这就是为什么一个看似荒唐的开价往往正按其意图在起作用。第二，锚不必是个数字：第一份提案、第一稿、会议上第一个被说出口的估计，对之后的一切起的是同样的作用。第三，这个想法的政治版本靠的正是这一点：反复表达一个远离当下常态的立场，会挪动中间看起来所在的位置，而其间可以一个论据都没提出。防范之道并不花哨，而且有效。在听到任何人的估计之前先做出你自己的估计，并且写下来，因为没写下来的估计会悄悄自我改写。问一句：如果锚翻倍或者减半，答案会是什么？这是检验你到底是在推理，还是只是在给别人递来的数字做装饰。而当你发现自己正从某个数字往外调整时，调得比感觉上应该的更多一些，因为那股拉力永远把人往过早停下的方向拽。",
  "It holds up, and it is not confined to students in a hurry": "它站得住，而且不限于赶时间的学生",
  "The effect has been examined many times since 1974 across very different tasks and populations, and a meta-analysis pooling that literature found it robust, with a large average effect size. That matters here because the blackboard demonstration on its own is a single result from 1974 on school students under time pressure, with no sample sizes or spread printed. The general phenomenon does not rest on it. What the blackboard version supplies that most later studies do not is a case where the right answer is exactly knowable, so the size of the error can be seen rather than inferred.": "自1974年以来，这一效应在差异极大的任务和人群中被反复检验过，一项汇总该文献的元分析发现它相当稳健，平均效应量很大。这在这里很重要，因为黑板演示本身只是1974年在时间压力下对中学生做的一个单一结果，既没印出样本量也没印出离散程度。这个普遍现象并不靠它撑着。这个版本拥有而后来大多数研究所没有的，是一个正确答案完全可知的情形，因而误差有多大是看得见的，而不是推断出来的。",
  "Anchoring, a reasoning trap.": "锚定效应，一种推理陷阱。",
  "Two groups of students got five seconds to estimate a product on a blackboard. One saw 1 x 2 x 3 x 4 x 5 x 6 x 7 x 8 and typically guessed 512. The other saw the identical eight numbers written backwards, 8 x 7 x 6 x 5 x 4 x 3 x 2 x 1, and typically guessed 2,250. Same numbers, same answer, more than four times the guess. And both were nowhere close: the real answer is 40,320. Nobody had time to multiply, so everyone anchored on the first few steps and adjusted up far too little. Whoever says a number first is not stating a position, they are setting the scale. Make your own estimate before you hear theirs.": "两组学生有五秒钟估算黑板上的一个乘积。一组看到 1 x 2 x 3 x 4 x 5 x 6 x 7 x 8，典型答案是512。另一组看到完全相同的八个数字倒着写，8 x 7 x 6 x 5 x 4 x 3 x 2 x 1，典型答案是2,250。同样的数字，同样的答案，估计值却差了四倍多。而且两者都离得远得离谱：真正的答案是40,320。没有人来得及做乘法，于是所有人都锚在了最初几步上，向上调整得远远不够。先说出数字的人不是在表达立场，而是在设定量级。在听到对方的估计之前，先做出你自己的。",
  "Three limits, stated because the figure would otherwise imply more than the source contains. The paper prints no group sizes, no spread around either median and no test statistic for this demonstration, so the chart draws two medians and the true value and nothing else. The participants were high school students working under a five-second deadline, which is a deliberately extreme version of the ordinary condition of estimating without time to compute, so the size of the error here should not be read as typical of unhurried judgement. And it is a single 1974 result, which is why the deep-dive example points at the later replication literature rather than leaving this one demonstration to carry the general claim. What this version has that better-powered later studies mostly lack is an exactly knowable right answer: 8 factorial is 40,320, so the shortfall can be measured rather than estimated. The same page carries the better-known wheel-of-fortune demonstration, quoted in the lesson, whose target quantity is a historical fact that has since changed, which is why it is not what the puzzle is scored on.": "要说明三点限制，否则这张图会让人以为原始文献包含了更多东西。该论文对这项演示没有印出各组人数，没有印出任何一个中位数的离散程度，也没有印出检验统计量，所以图上只画了两个中位数和真值，别无其他。参与者是受五秒限制的中学生，这是「来不及计算就得估算」这一寻常处境的一个刻意极端的版本，因此这里误差的大小不应被读作从容判断时的典型情形。而且这是1974年的单一结果，正因如此，深度阅读的例子指向的是后来的重复验证文献，而不是让这一个演示独自承担普遍性主张。这个版本拥有而后来大多数样本更充分的研究所缺少的，是一个可以精确知道的正确答案：8的阶乘是40,320，因而差距可以被测量而不是被估计。同一页上还有更为人熟知的幸运轮盘演示，课程中有所引用，但它针对的量是一个此后已经变化的历史事实，所以本谜题并不以它计分。",
  "A recruiter opens by naming a figure far above anything the role has ever paid. The final agreed salary lands well above the usual range, and the employer concludes the candidate negotiated unusually well.": "一位招聘者一开口就报出一个远高于这个岗位历来薪资的数字。最终谈定的薪资明显高于通常区间，雇主由此断定这位候选人谈判能力特别强。",
  "The opening figure set the scale on which every later number was judged, so the settlement drifted toward it. That is a fact about who spoke first, not about anyone's negotiating skill.": "开场那个数字设定了此后每一个数字被评判的量级，于是最终结果朝它漂移。这是关于谁先开口的事实，而不是关于任何人谈判本事的事实。",
  "A donation page offers preset amounts starting at 500. Average gifts rise compared with the previous page, which started at 20, and the charity reports that supporters have become more generous.": "某捐款页面提供的预设金额从500起。与之前从20起的页面相比，平均捐款额上升，该机构据此报告说支持者变得更慷慨了。",
  "The same supporters met a different first number. Presets are anchors, so the shift measures the design of the page rather than any change in generosity.": "还是同一批支持者，只是遇到了不同的第一个数字。预设金额就是锚，所以这个变化衡量的是页面的设计，而不是慷慨程度的变化。",
  "A shop labels an item as reduced from 200 to 90. Shoppers rate it better value than the identical item labelled simply as 90, and the shop concludes they prefer the discounted version.": "某商店把一件商品标为由200降到90。相比只标90的同一件商品，顾客认为前者更划算，商店据此断定顾客更喜欢打折版本。",
  "The struck-through 200 is a reference point rather than information about the item, and value judgements are made relative to it. The product and the price paid are the same in both cases.": "划掉的那个200是一个参照点，而不是关于这件商品的信息，而价值判断正是相对于它做出的。两种情况下商品和实付价格完全相同。",
  "In a planning meeting the most senior person says a task will take about two weeks before anyone else speaks. The team's estimates cluster near two weeks, and the manager treats the agreement as independent confirmation.": "在一次规划会议上，职级最高的人在别人开口之前说这项任务大约要两周。团队的估计都聚在两周附近，主管把这种一致当作独立的印证。",
  "Once a number is in the room, later estimates adjust from it rather than being formed independently. Agreement reached this way is not corroboration; the estimates should be written down before anyone speaks.": "一旦房间里出现了一个数字，之后的估计就会从它出发做调整，而不是独立形成。这样得来的一致不是印证；估计应当在任何人开口之前先写下来。",
  "Two groups of appraisers tour the same house with identical information packs, except that the listed asking price differs. Their valuations differ in the same direction, and the agency concludes one group was better at spotting the property's potential.": "两组估价师带着完全相同的资料包看同一栋房子，唯一的差别是标示的挂牌价不同。他们的估值朝同一方向出现差异，中介据此断定其中一组更能看出这处物业的潜力。",
  "The house was identical, so the difference tracks the listing price and nothing about the property. Expertise does not remove the pull; it mostly makes people more confident that it did not apply to them.": "房子是同一栋，所以差异跟着挂牌价走，与物业本身无关。专业经验并不能消除这股拉力，它主要让人更确信这拉力对自己不起作用。",
  "A department builds next year's budget by starting from last year's figure and adjusting. When challenged, the finance lead says the process is evidence-based because every adjustment was justified line by line.": "某部门以去年的数字为起点做调整，编制明年的预算。被质疑时，财务负责人说这个流程是有依据的，因为每一处调整都逐条做了论证。",
  "Justifying each step away from a starting point does not test the starting point itself, and adjustments from an anchor are systematically too small. A zero-based estimate would answer a different and better question.": "为偏离起点的每一步做论证，并不能检验那个起点本身，而从锚出发的调整系统性地偏小。一份零基预算所回答的是另一个、也是更好的问题。",
  "Before estimating an unfamiliar quantity, participants are asked to write down the last two digits of their phone number. Estimates correlate with those digits, and the researcher concludes the sample must be unrepresentative.": "在估算一个不熟悉的量之前，参与者被要求先写下自己电话号码的最后两位。估计值与这些数字相关，研究者由此断定这个样本一定不具代表性。",
  "An anchor does not have to be relevant or even plausible to work, and participants can know it is arbitrary and still be moved by it. The correlation is the expected result, not a sign of a bad sample.": "锚并不需要相关，甚至不需要看起来合理就能起作用，参与者可以明知它是随意的却仍被它带动。这个相关正是预期中的结果，而不是样本不好的迹象。",
  "Two panels assess the same case file, given different suggested figures for the penalty by a party with no expertise. Their recommendations track the suggestions, and a reviewer concludes the panels disagreed about the facts.": "两个专家小组评估同一份案卷，由一个毫无专业背景的一方分别向它们提示了不同的处罚数额。两组的建议都跟着各自收到的提示走，一位复核者据此断定两组对事实有分歧。",
  "The file was identical, so there was nothing factual to disagree about. What differed was the number each panel was handed before it started, which set the range their adjustments moved within.": "案卷是同一份，所以本就没有事实层面可以分歧的东西。不同的是各组在开始之前拿到的那个数字，是它划定了各自调整所能移动的范围。",
  "A group repeatedly voices a position far outside anything previously considered normal. Over time, positions that once looked extreme are described as moderate, and commentators say public opinion has genuinely moved to meet them.": "某个群体反复表达一个远离此前一切常态的立场。随着时间推移，曾经显得极端的立场被描述为温和，评论者说公众舆论真的朝他们靠拢了。",
  "Where the middle appears to be depends on what the endpoints are, and repeating a distant position moves the endpoints without any argument being made. That is a change in the frame rather than demonstrated movement in what people believe.": "中间看起来在哪里，取决于两端在哪里，而反复重复一个遥远的立场会挪动两端，其间并不需要提出任何论据。这是框架的变化，而不是人们信念确实发生位移的证据。",
  "A buyer collects three quotes for a job and judges the second and third as cheap or expensive relative to the first, which happened to arrive first for no particular reason.": "一位买家为一项工程收了三份报价，并以碰巧最先送到、并无特别缘由的第一份为参照，判断第二份和第三份是贵还是便宜。",
  "The first quote arrived first by accident, yet it is doing the work of a benchmark. Cheap and expensive should be measured against what the job is worth, which none of the three quotes establishes on its own.": "第一份报价最先送到纯属偶然，可它却在充当基准。贵与便宜应当相对于这项工程本身值多少来衡量，而三份报价中没有任何一份能单独确立这一点。",
  "A team asks every member to write down their estimate privately before any figure is spoken aloud, then reveals all of them at once and discusses the spread.": "某团队要求每位成员在任何数字被说出口之前，先私下写下自己的估计，然后一次性全部揭晓并讨论其离散程度。",
  "This is the standard defence: estimates formed before anyone hears a number are genuinely independent, so their spread carries information and their agreement is real corroboration.": "这正是标准的防御手段：在听到任何数字之前形成的估计是真正独立的，因而它们的离散程度带有信息，它们的一致也是真正的印证。",
  "An engineer estimates the cost of a new bridge by starting from the recorded cost of three comparable bridges and adjusting for size and materials, stating the comparators used.": "一位工程师以三座可比桥梁的实际造价为起点，按规模和材料加以调整，来估算一座新桥的造价，并写明所用的比较对象。",
  "Here the starting point is relevant evidence rather than an arbitrary number, and it is declared so the reader can judge it. Adjusting from an informative baseline is estimation working as intended.": "这里的起点是相关证据而不是随意的数字，而且被明确说出以便读者判断。从有信息的基准出发做调整，正是估算本该有的样子。",
  "Before accepting a forecast, an analyst redoes it from a starting figure twice as large and again from one half as large, and reports that the conclusion holds in all three cases.": "在采纳一份预测之前，分析师分别以两倍大和一半大的初始数字重做了一遍，并报告说三种情况下结论都成立。",
  "Testing whether the answer survives a different starting point is exactly how you find out whether you were reasoning or decorating an anchor. The conclusion here does not depend on where it began.": "检验答案能否在不同的起点下存活，正是弄清自己究竟是在推理还是在给锚做装饰的办法。这里的结论并不取决于它从哪里开始。",
  "What one group said": "其中一组的回答",
  "Both, against the answer": "两者，对照答案",

  // ---- Gerrymandering ----
  "In this election one party won more votes than the other. Just barely, but it won them.": "这场选举中，一个政党得到的票数多于另一个。差距很小，但确实更多。",
  "Massachusetts, 1812, electing the forty members of the state senate. Months before the vote, the legislature had redrawn the senate districts and the governor had signed the new map into law. Both the legislature and the governor belonged to one of the two parties, and that party drew the boundaries. When the votes were counted, 101,930 had been cast for senators, and the OTHER party, the one that had not drawn the map, came out narrowly ahead.": "1812年的马萨诸塞州，要选出州参议院的四十名议员。投票前几个月，州议会重新划定了参议院的选区，州长签署了这份新地图使其成为法律。议会和州长都属于两党中的一方，地图正是由这一方划定的。计票结束后，投给参议员候选人的选票共101,930张，而票数略多的是没有划地图的另一方。",
  "How many of the 40 senate seats did the party with more votes win?": "票数较多的那个政党，在参议院的40个席位中赢得了多少席？",
  "Share won": "所占比例",
  "Federalists, who did not draw the map": "联邦党，没有划定地图的一方",
  "Federalists": "联邦党",
  "Democratic-Republicans, who drew the map": "民主共和党，划定地图的一方",
  "Democratic-Republicans": "民主共和党",
  "Votes cast for senators": "投给参议员候选人的选票",
  "Senate seats won": "赢得的参议院席位",
  "The votes, and nothing else yet": "只有选票，其他暂时还不给你看",
  "About half, close to their share of the vote": "大约一半，与他们的得票比例相近",
  "seats should follow votes": "席位应当跟着选票走",
  "A majority, since they won the most votes": "多数席位，毕竟他们票数最多",
  "they did win, after all": "他们确实赢了选举",
  "Far fewer than half": "远远不到一半",
  "consider who drew the districts": "想一想是谁划的选区",
  "Eleven of forty. The party with fewer votes took twenty-nine seats.": "四十席中的十一席。票数较少的政党拿下了二十九席。",
  "The same votes, sorted into different boxes, give a different parliament": "同样的选票，分进不同的箱子，就产生了不同的议会",
  "Not one voter changed their mind, and not one ballot was miscounted. The Federalists received 51,766 votes and the Democratic-Republicans 50,164, so the Federalists genuinely won the election by about 1,600 votes out of 101,930. They then received eleven of the forty seats. The party that had drawn the districts took the other twenty-nine, which is nearly three quarters of the chamber on slightly under half the vote:": "没有一个选民改变主意，也没有一张选票被算错。联邦党得51,766票，民主共和党得50,164票，所以在这101,930张票中联邦党确实赢了选举，领先约1,600票。他们由此获得了四十席中的十一席。划定地图的政党拿走了另外二十九席，用略少于一半的选票占据了议场近四分之三。",
  "Votes, and the seats they produced": "选票，以及它们产生的席位",
  "The trick is in how the lines gather people up. Pack as many of your opponent's voters as possible into a handful of districts they win overwhelmingly, so those votes pile up far beyond what is needed, and spread the rest thinly across many districts they lose narrowly. Their votes are then either wasted on enormous majorities or wasted on near misses, and yours are spent efficiently. One of the new Massachusetts districts was drawn in such a contorted shape that a newspaper cartoon added wings and claws and called it a salamander, after the governor who signed it: Elbridge Gerry. That is where the word comes from, and the word has outlived both of the parties involved.": "诀窍在于这些线条如何把人们归拢在一起。把对方的支持者尽量塞进少数几个选区，让他们在那里以压倒性优势获胜，于是堆积起远超所需的选票。剩下的人则摊薄进许多选区，让他们在那里以微弱差距落败。这样一来，对方的选票要么浪费在巨大的多数上，要么浪费在惜败上，而你自己的选票每一张都用在了刀刃上。马萨诸塞的一个新选区形状极其扭曲，一幅报纸漫画给它添上翅膀和利爪，称之为蝾螈，并冠以签署这份地图的州长埃尔布里奇·格里的姓氏。这个词就是这样来的，它比创造它的那两个政党活得都久。",
  "What the boundaries did": "这些边界做了什么",
  "Gerrymandering": "选区划分操纵",
  "When votes are counted inside districts, whoever draws the districts is choosing part of the answer before anyone votes. A result can be arithmetically correct at every step and still not reflect what people chose.": "当选票是在选区内部计数时，划定选区的人在任何人投票之前就已经选好了一部分答案。一个结果可以在每一步计算上都准确无误，却依然没有反映人们的选择。",
  "Note what this is not. It is not a claim about any living party: this practice has been used by whichever side happened to hold the pen, in many countries and in every century since, and the two parties in this example both ceased to exist long ago. It is also not an argument that districts are a mistake. Drawing boundaries is unavoidable in any system with local representation, and someone has to do it. What the example shows is narrower and harder to argue with: the drawing is not a neutral technical step, and asking who did it is a reasonable question about any districted result.": "请注意这不是什么。这不是在指控任何现存的政党：这套手法凡是当时握笔的一方都用过，在许多国家、此后的每一个世纪里都能见到，而本例中的两个政党早已不复存在。这也不是在说选区本身是个错误：只要按地域产生代表，边界就必须存在，而且总得有人来划。这个例子说明的是更窄、也更难反驳的一点，就是划线不是中立的技术工作，因此对任何基于选区的结果，追问是谁划的都是合理的。",
  "The mechanism has a name in the modern literature: wasted votes. Every vote cast for a losing candidate is wasted, and so is every vote for a winner beyond the number needed to win. A map maker who wants a particular result arranges the boundaries so that the other side wastes as many votes as possible, and there are exactly two ways to do it. Packing puts their supporters into a small number of districts where they win by enormous margins, so tens of thousands of their votes elect one representative. Cracking splits the rest across many districts where they lose by a little, so those votes elect nobody at all. Both are legal, both leave every individual count accurate, and together they let a minority of voters elect a majority of seats. Two consequences are worth carrying. First, the shape of a district is a weak clue, not proof, and this cuts both ways: a bizarre outline can be the innocent result of a river or a city boundary, while a tidy rectangle can be carefully drawn to split a community in half. That is why the serious modern work does not look at shapes at all. Instead it generates many thousands of alternative maps by computer under the state's own stated rules, retallies the same real votes on each one, and asks where the enacted map falls in that distribution. A map that produces a result almost no neutral map produces is the finding, and this method has caught maps drawn by more than one party. Second, and more transferable, the same reasoning applies far outside politics. Whenever performance is measured inside units that somebody chose, whether those are sales regions, school catchments, hospital trusts or department boundaries, the choice of unit is part of the result. Ask who drew the boundary and when, and whether the answer would survive being drawn differently.": "这套机制在现代文献里有一个名字：废票。投给落选者的每一张票都是废票，投给当选者但超出当选所需数量的每一张票同样是废票。想要某种结果的制图者会这样安排边界，使对方尽可能多的选票变成废票，而做到这一点的方法恰好只有两种。集中，是把对方的支持者堆进少数几个选区，让他们在那里以巨大优势获胜，于是数万张票只换来一名代表。分散，是把其余的人摊进许多选区，让他们在那里以微弱差距落败，于是这些票一个人也选不出来。两者都合法，两者都保持每一次计票本身准确无误，而合在一起就能让少数选民选出多数席位。有两点值得带走。第一，选区的形状是微弱的线索而非证据，而且这在两个方向上都成立：怪异的轮廓可能只是无辜地跟随河流或市界，而规整的矩形也可能是被精心划来把一个社区一分为二。正因如此，严肃的现代研究根本不看形状，而是让计算机按照该州自己的规则生成成千上万份替代地图，在每一份上重新计算同一批真实选票，然后追问实际采用的那份落在这个分布的什么位置。研究发现，有些地图产生的结果是中立划法几乎不会产生的，而这套方法已经指认出由不止一个政党划定的地图。第二，也是更可迁移的一点，同样的推理在政治之外同样成立。只要一项成绩是在别人选定的单位内部被衡量的，无论那是销售区域、学区、医院集团还是部门划分，单位的选择就是结果的一部分。请追问是谁划的这些边界、什么时候划的，以及换一种划法这个答案是否还站得住。",
  "How the same question is answered today": "今天如何回答同一个问题",
  "Modern work replaces argument about shapes with a distribution. One study generated 24,518 alternative district maps for a US state by computer, following that state's own stated redistricting rules, then retallied the same real votes on every one of them. The enacted maps produced a seat split that appeared in less than one per cent of those alternatives, while a map drawn separately by a bipartisan panel of retired judges behaved like a typical map from the pile. That second finding is the useful one for this lesson: a drawing process without a stake in the outcome produced an unremarkable outcome, which is what makes the question about the enacted map a question about who drew it rather than about which party they belonged to.": "现代研究用一个分布取代了关于形状的争论。一项研究针对美国的一个州，按照该州自己的选区规则用计算机生成了24,518份替代地图，并在每一份上重新计算同一批真实选票。实际采用的那份地图所产生的席位分配，在这些替代方案中出现的比例低于百分之一。与此同时，一个由退休法官组成的跨党派委员会另外划出的一份地图，其表现与这堆方案中的典型一份并无二致。第二个发现才是这一课真正有用的部分：一个对结果没有利害关系的划线过程，产出了一个完全平常的结果。这也正是为什么关于那份采用地图的问题是谁划的它，而不是划它的人属于哪个政党。",
  "Gerrymandering, a reasoning trap.": "选区划分操纵，一个推理陷阱。",
  "Massachusetts, 1812. One party won the popular vote for the state senate, 51,766 against 50,164. It received eleven of the forty seats. The other party, which had redrawn the district boundaries a few months earlier, took twenty-nine. Nobody miscounted anything: when votes are tallied inside districts, whoever draws the districts has already chosen part of the answer. A newspaper thought one of the new districts looked like a salamander and named it after the governor who signed it, Elbridge Gerry. Both those parties are long gone and the practice is not. Whenever a result is measured inside units that someone chose, ask who chose them.": "1812年的马萨诸塞州。一个政党赢得了州参议院选举的普选票，51,766票对50,164票。它拿到了四十席中的十一席。几个月前重新划定选区边界的另一方拿走了二十九席。没有人算错任何一张票。当选票是在选区内部汇总时，划定选区的人已经选好了一部分答案。一家报纸觉得其中一个新选区像一只蝾螈，就用签署它的州长埃尔布里奇·格里的姓氏来称呼它。那两个政党早已消失，这套手法没有。凡是看到某项成绩是在别人选定的单位内部被衡量时，请追问是谁选的。",
  "The four figures are printed together on one page and reconcile two ways: 51,766 plus 50,164 is exactly the 101,930 total the same sentence gives, and 11 plus 29 is the 40 seats of the chamber, so the party numbers are confirmed by a total stated independently of them. This case was chosen over far better modern evidence for one reason. The rigorous contemporary work analyses maps drawn by a named living party and concludes they were extreme, which would make one side look uniquely foolish; here both parties have been extinct for two centuries, so the same mathematics carries no partisan charge. Three limits. The party Griffith calls the Democrats is the Democratic-Republican party of Jefferson and Madison, which is not the ancestor of any single modern party and should not be read as one. Griffith is a 1907 secondary work on 1812 sources, which is the standard scholarly account of the episode's origin but is not a modern reanalysis of the returns. And a single election cannot show that the map caused the gap rather than the geography, which is precisely the question the modern ensemble method exists to answer, and why it is the deep-dive example rather than a footnote.": "这四个数字印在同一页上，并且能以两种方式对上。51,766加50,164正好等于同一句话给出的总数101,930，而11加29等于议场的40个席位。也就是说，分党派的数字有一个独立陈述的总数为其背书。选用这个案例而非好得多的现代证据，只有一个理由：严谨的现代研究分析的是由具名且仍然存在的政党划定的地图，并断定它极端，那会让其中一方显得愚蠢。而这里的两个政党都在两个世纪前消亡了，同样的算术因此不带任何党派电荷。有三点局限。格里菲斯所称的民主党，是杰斐逊和麦迪逊的民主共和党，不是今天任何单一政党的前身，不应被这样解读。格里菲斯是1907年基于1812年材料写成的二手记述，它是关于这一事件起源的标准学术叙述，但不是对选举结果的现代重新分析。而单独一次选举无法证明造成这一落差的是地图而非地理，那正是现代集合方法存在的意义，也正是为什么它出现在深入阅读的例子里，而不是一条脚注。",
  "A party wins 48 percent of the votes cast across a region and takes 70 percent of the seats. The party's chairman says the result shows the public clearly preferred them.": "一个政党在某地区赢得了所投选票的48%，并拿下70%的席位。其领袖表示，这一结果显示选民明确地选择了该党。",
  "Fewer than half the voters chose them, so the seat count is a fact about how the boundaries gathered votes rather than about what the public preferred. Seats and votes are two different countings.": "选择他们的选民不到一半，所以席位数说明的是边界如何把选票归拢起来，而不是选民选择了什么。席位和选票是两种不同的计数方式。",
  "Boundaries for the next election are drawn by a committee controlled by one of the parties contesting it. That party then outperforms its vote share, and a spokesman calls the outcome a neutral consequence of geography.": "下一次选举的边界由一个委员会划定，而该委员会由参加这场选举的政党之一控制。此后该党的席位表现优于其得票比例，其发言人称这一结果是地理造成的中性后果。",
  "Geography may well matter, but it cannot be assumed when the people who drew the lines had a stake in the result. The way to separate the two is to compare the enacted map against many maps drawn without a stake.": "地理确实可能起作用，但当划线的人对结果有利害关系时就不能想当然。要把两者分开，办法是把采用的地图和许多在没有利害关系的情况下划出的地图做比较。",
  "A commentator points to a district with a strange snaking outline and says its shape proves the map was manipulated.": "一位评论者指着一个轮廓蜿蜒古怪的选区，说这个形状就是地图被操纵的证据。",
  "Shape is a weak clue in both directions: an odd outline can follow a river or a coastline, and a tidy rectangle can split a community deliberately. What settles it is how the map performs against alternatives, not how it looks.": "形状在两个方向上都是微弱线索：古怪的轮廓可能只是沿着一条河或一段海岸线，而规整的矩形也可能是刻意把一个社区分开。起决定作用的是这份地图相对于替代方案的表现，而不是它看起来什么样。",
  "A manager redraws the sales regions, then reports that his own team now leads on the share of regions hitting target, even though total sales per person are unchanged.": "一位经理重新划分了销售区域，随后报告说按达标区域的比例计算，他的团队现在排名第一。人均销售额并没有变化。",
  "The underlying performance did not move; only the boundaries the performance is counted inside did. Whenever results are measured within units somebody chose, the choice of unit is part of the result.": "底层的业绩没有变动，变动的只是衡量业绩的边界。凡是成绩在别人选定的单位内部被衡量的时候，单位的选择就是结果的一部分。",
  "One district returns a candidate with 91 percent of its vote while six neighbouring districts are lost by two or three points each. A report describes the 91 percent as a stronghold and evidence of deep support.": "一个选区以91%的得票率选出候选人，而相邻的六个选区都以两三个百分点的差距落败。一份报告称这个91%是铁票仓，是支持度深厚的证据。",
  "A 91 percent result means tens of thousands of votes elected exactly one representative, while the narrow losses next door elected none. That pattern is the signature of packing, and it converts real support into very few seats.": "91%这个结果意味着数万张票只选出了恰好一名代表，而旁边那些惜败一个人也没选出来。这种模式是集中手法的签名，它把真实存在的支持变成了极少的席位。",
  "A council redraws school catchment boundaries and afterwards reports that the proportion of schools meeting the intake target has improved, with no change in the number of pupils or places.": "某市议会重新划定了学区边界，随后报告说达到招生目标的学校比例有所改善。学生人数和学位数都没有变化。",
  "Nothing about the pupils or the schools changed, so the improvement is entirely in where the lines were put. This is the same move as an electoral gerrymander, applied to catchments.": "关于学生和学校的一切都没有改变，所以这份改善完全在于线画在了哪里。这就是选举中的选区操纵那一手，原样搬到了学区上。",
  "A researcher finds that in the states where one party controlled redistricting, its seat share exceeded its vote share, and concludes that this party is uniquely willing to manipulate boundaries.": "一位研究者发现，在由某个政党控制选区重划的那些州里，该党的席位比例高于其得票比例，于是断定只有这个政党会试图操纵边界。",
  "The comparison needed is against states where the other party controlled the process, not against nothing. Without it, the finding is about who held the pen in the sample examined rather than about any party's character.": "需要的比较对象是由另一个政党控制这一过程的那些州，而不是不作任何比较。缺了这一步，这个发现说的是在所考察的样本里谁握着笔，而不是任何一个政党的本性。",
  "Asked whether a new map is fair, an official replies that every district contains almost exactly the same number of people, so the map cannot favour anyone.": "被问及一份新地图是否公平时，一位官员回答说每个选区所含人口几乎完全相同，因此这份地图不可能偏袒任何人。",
  "Equal population is necessary and nowhere near sufficient. Maps with perfectly equal districts can produce almost any seat outcome, because what matters is which voters are grouped together, not how many.": "人口相等是必要条件，但远远不够。由人口完全相等的选区构成的地图几乎可以产出任何一种席位分配，因为关键在于哪些选民被归拢在一起，而不是有多少人。",
  "A regulator reorganises hospitals into new trusts and then reports that fewer trusts are now failing its standard, using the same underlying hospital-level data as before.": "一家监管机构把医院重组进新的集团，随后报告说未达其标准的集团数量减少了。它用的是与之前完全相同的医院层面的数据。",
  "The hospitals performed the same before and after; only the groupings they are judged in changed. Counting failures at the level of a boundary somebody redrew measures the redrawing as much as the performance.": "这些医院前后的表现完全一样，改变的只是评判它们的分组。在某人重新划定的边界这一层面上统计不达标，衡量的是这次重划，其程度不亚于衡量表现。",
  "A single election produces a large gap between one party's vote share and its seat share, and an analyst treats this as proof that the map was drawn to produce that gap.": "一次选举在某党的得票比例和席位比例之间产生了很大落差，一位分析者把这当作地图正是为制造这一落差而划的证据。",
  "One election cannot separate the map from the geography, since supporters of a party may genuinely be concentrated in cities whoever draws the lines. Establishing intent needs the same votes retallied on many alternative maps.": "一次选举无法把地图和地理分开，因为某个政党的支持者确实可能真的集中在城市里。要证明意图，必须在许多份替代地图上重新计算同一批选票。",
  "Before judging a district map, a team generates thousands of alternative maps by computer under the jurisdiction's own stated rules, retallies the same real votes on each, and reports where the enacted map falls in that distribution.": "在评判一份选区地图之前，某团队按照该辖区自己的规则用计算机生成了成千上万份替代地图，在每一份上重新计算同一批真实选票，然后报告采用的那份落在这个分布的什么位置。",
  "This is the method designed for the question: it holds the votes and the rules fixed and varies only the boundaries, so an unusual result cannot be explained away by geography. It is also blind to which party drew the map.": "这正是为这个问题而设计的方法：它固定住选票和规则，只改变边界，因此无法把异常结果推给地理，而且它对地图由谁划定是盲的。",
  "Boundaries are drawn by a commission whose members are barred from standing in the elections concerned and who are given the population and geography data without party registration or past results.": "边界由一个委员会划定，其成员被禁止参选相关席位，他们拿到的是人口和地理数据，但看不到政党登记和以往的选举结果。",
  "The people drawing the lines have no stake in the outcome and lack the information needed to favour anyone even if they wished to. That is a process designed against the problem rather than a claim of good intentions.": "划线的人对结果没有利害关系，而且即便想偏袒某一方也缺少所需的信息。这不是一份良好意愿的声明，而是一套针对这个问题设计出来的程序。",
  "An election report gives both the seat totals and the vote totals for each party side by side, and notes the size of the gap between them without asserting a cause.": "一份选举报道同时给出各党的席位总数和得票总数，指出两者之间落差的大小，但没有断言其成因。",
  "Publishing both countings and declining to explain the gap without evidence is exactly right. The gap is real and worth showing; attributing it to the map would need the comparison this report does not claim to have made.": "公布两种计数、并在没有证据时拒绝解释落差，这完全正确。落差是真实的，值得展示。要把它归因于地图，需要做一项这份报道并未声称自己做过的比较。",
};
