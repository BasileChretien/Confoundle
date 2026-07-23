/**
 * Japanese dictionary: English source string, Japanese translation. Keys must
 * match the English text exactly. French is used only as a secondary reference.
 * Native review pending; correct in place.
 */
export const ja: Record<string, string> = {
  // ---- UI chrome (buttons, labels, section headers) ----
  "The skill": "スキル",
  "Where this shows up": "どこで現れるか",
  "See it in the wild": "実例で見る",
  "Why it happens": "なぜ起こるのか",
  "Same trap, other places": "同じ罠、別の場面で",
  Source: "出典",
  "Make my card →": "カードを作る →",
  "Go deeper on this idea →": "この考えをさらに掘り下げる →",
  "Commit to see the reveal. No peeking.":
    "答えを見るには、まず選んでください。のぞき見は禁止。",
  "Reveal the answer": "答えを明かす",
  "Name the skill →": "スキルの名前を当てる →",
  "Play again": "もう一度プレイ",
  "The lurking variable": "潜んでいる変数",
  "Nicely done, you didn't take the number at face value.":
    "お見事。あなたは数字をうのみにしませんでした。",
  "So does almost everyone. That's exactly the trap.":
    "ほとんどの人も同じです。それこそが罠なのです。",
  "You caught it": "見抜きました",
  "Most people miss this": "多くの人はこれを見落とします",
  "You picked": "あなたが選んだのは",
  Replay: "もう一度",
  "Who each treatment actually treated":
    "それぞれの治療が実際に診たのは誰か",
  "So what's the skill? →": "では、そのスキルとは? →",
  // scope tags (right of the figure caption)
  Overall: "全体",
  "By subgroup": "サブグループ別",
  "The facts": "事実",
  "The reality": "実際のところ",
  Observed: "観察された値",
  Explained: "その説明",
  Survivors: "生存者",
  "The full picture": "全体像",
  // category names (humanized)
  "Causal reasoning": "因果推論",
  "Statistical reasoning": "統計的推論",
  // tags
  Everyday: "日常",
  Clinical: "臨床",
  Research: "研究",
  Statistics: "統計",
  Diagnosis: "診断",
  Screening: "スクリーニング",
  Epidemiology: "疫学",
  Pharmacology: "薬理学",
  Psychology: "心理学",
  Biology: "生物学",
  Technology: "テクノロジー",
  Economics: "経済学",
  Politics: "政治",
  Education: "教育",
  Finance: "金融",
  Business: "経営",
  Law: "法律",
  Sports: "スポーツ",
  History: "歴史",
  Media: "メディア",
  "Demo · try any puzzle": "デモ · どのパズルでも試せます",
  // frequency view (base-rate puzzle)
  "1 in": "1 /",
  "How common it is": "どのくらいありふれているか",
  "Test catches it": "検査が見つける確率",
  Always: "常に",
  "False-alarm rate": "偽陽性の割合",
  "Positive tests": "陽性判定",
  of: "/",
  actually: "実際に",
  chance: "の確率",
  "false alarm": "偽陽性",
  // wager + stats
  "How sure are you?": "どのくらい自信がありますか?",
  Hunch: "勘",
  "Fairly sure": "まあまあ自信あり",
  Certain: "確信あり",
  "Pick one, then stake how sure you are":
    "1つ選び、そのうえで自信の度合いを賭けましょう",
  pts: "点",
  Today: "今日",
  Streak: "連続",
  Best: "最高",
  Caught: "見抜き",
  Calibration: "キャリブレーション",
  "You beat {pct}% of players today":
    "今日のプレイヤーの{pct}%を上回りました",
  "A new puzzle every day. Keep the streak alive.":
    "毎日新しいパズルを。連続記録を絶やさないように。",
  "Sharp eye, and you called it.":
    "鋭い目、しかも自分で言い当てました。",
  "Nicely spotted.": "お見事、見抜きました。",
  "Good instinct.": "いい勘です。",
  "Ouch. Confidently wrong, the classic trap.":
    "痛いところ。自信満々で間違える、典型的な罠です。",
  "So does almost everyone. That's the trap.":
    "ほとんどの人も同じです。それが罠なのです。",
  "You sensed something was off, but went with it anyway.":
    "何かおかしいと感じつつ、それでも進んでしまいましたね。",
  // friends board
  "Friends board": "友だちランキング",
  "Your name": "あなたの名前",
  "Copy result": "結果をコピー",
  Copied: "コピーしました",
  Share: "共有",
  "Paste your friends' results here":
    "友だちの結果をここに貼り付け",
  "Add to board": "ランキングに追加",
  // trap hunt
  "Trap Hunt": "罠ハント",
  "Some of these are sound. Some hide a trap.":
    "この中には妥当な推論もあれば、罠が隠れているものもあります。",
  "Sound reasoning": "妥当な推論",
  "There's a trap": "罠がある",
  "Which trap?": "どの罠?",
  Rank: "ランク",
  Done: "完了",
  "Trap Hunt unlocked": "罠ハント解禁",
  "Can you still spot the traps?":
    "まだ罠を見抜けますか?",
  Novice: "見習い",
  Sceptic: "懐疑派",
  Detective: "探偵",
  Analyst: "分析官",
  "Sharp eye": "鋭い目",

  // ---- shared share-card captions ----
  "Caught it. Bet you can't.": "見抜きました。あなたにできますか?",
  "I totally fell for this.": "まんまと引っかかりました。",

  // ==== Simpson's paradox (kidney stones) ====
  "Treatment B cures more patients overall. Which would you pick?":
    "治療Bのほうが全体では多くの患者を治しています。あなたならどちらを選びますか?",
  "Two kidney-stone treatments, 350 patients each. On overall success rate, Treatment B comes out ahead. Same illness, same goal, one number to go on.":
    "腎結石に対する2つの治療、それぞれ350人ずつ。全体の成功率では治療Bが上回ります。同じ病気、同じ目標、判断材料はたった1つの数字だけ。",
  "Which treatment would you pick?": "あなたならどちらの治療を選びますか?",
  "Success rate": "成功率",
  "Treatment A, open surgery": "治療A、開放手術",
  "Treatment B, keyhole (PCNL)": "治療B、経皮的手術(PCNL)",
  "Small stones": "小さい結石",
  "Large stones": "大きい結石",
  "Treatment B": "治療B",
  "83% overall": "全体で83%",
  "Treatment A": "治療A",
  "78% overall": "全体で78%",
  "Treatment A actually wins, for both stone sizes.":
    "実際には治療Aが勝っています。結石の大小どちらでもです。",
  "Stone size (case severity)":
    "結石の大きさ(症例の重さ)",
  "A and B weren't treating the same patients. A got mostly the hard cases (large stones), while B got mostly the easy ones. Everyone does worse on hard cases, so A's overall average sinks even though A wins in each group:":
    "AとBは同じ患者を治療していませんでした。Aは難しい症例(大きい結石)を多く受け持ち、Bは易しい症例を多く受け持ちました。誰でも難しい症例では成績が落ちるため、Aは各グループで勝っているのに、全体の平均は沈んでしまうのです。",
  "Simpson's paradox": "シンプソンのパラドックス",
  "An overall trend can reverse once you account for a lurking variable that's split unevenly between the groups.":
    "全体の傾向は、グループ間で偏って分かれている潜んだ変数を考慮に入れると逆転することがあります。",
  "Whenever two groups are compared with one pooled rate, ask what got mixed together to make that number, and whether the groups were even up against the same odds. Stone size is the clearest confounder here; it's rarely the only one.":
    "2つのグループを1つのまとめた割合で比較するときはいつでも、その数字を作るために何が混ぜ合わされたのか、そして両グループが本当に同じ条件で戦っていたのかを問いましょう。ここでは結石の大きさが最もわかりやすい交絡因子ですが、それが唯一であることはめったにありません。",
  "The 'combined' score isn't a fresh measurement; it's the group scores blended together, and bigger groups count for more. When one side is packed with easy cases and the other with hard ones, that blend pulls their combined scores in opposite directions. So one option can lead in the easy group and in the hard group, yet still trail overall, because it handled most of the hard cases, and its blended score sits closer to that lower number. The cure is a fair split: give both sides the same mix of easy and hard cases (exactly what a randomised trial does), and the reversal can't happen.":
    "「全体」のスコアは、新しく測り直した値ではありません。それは各グループのスコアを混ぜ合わせたもので、大きいグループほど重く効いてきます。一方が易しい症例ばかり、もう一方が難しい症例ばかりだと、その混ぜ合わせは両者の全体スコアを反対方向へ引っ張ります。だから、ある選択肢が易しいグループでも難しいグループでも上回っているのに、全体では下回ることが起こり得ます。難しい症例の大半を引き受けたため、その混合スコアが低いほうの数字に近づくからです。処方箋は公平な振り分けです。両者に易しい症例と難しい症例を同じ割合で割り当てれば(まさにランダム化試験が行うことです)、この逆転は起こり得ません。",
  "University admissions": "大学の入学選考",
  "In 1973, Berkeley's graduate schools admitted 44% of men but only 35% of women. It looked like plain bias. Yet department by department, women were admitted at about the same rate as men, or higher. Women simply applied more often to the most competitive departments, where almost everyone was turned away. The gap was about where people applied, not who was deciding.":
    "1973年、バークレーの大学院は男性の44%を合格させた一方で、女性は35%しか合格させませんでした。あからさまな差別に見えました。ところが学科ごとに見ると、女性は男性とほぼ同じか、それ以上の割合で合格していました。女性は単に、ほとんど全員が不合格になる最も競争の激しい学科に、より多く出願していただけでした。この差は、誰が選考していたかではなく、どこに出願したかによるものだったのです。",
  "Baseball batting averages": "野球の打率",
  "David Justice out-hit Derek Jeter in 1995 (.253 to .250) and again in 1996 (.321 to .314). But over the two seasons combined, Jeter came out ahead, .310 to .270. Each single year said Justice; the two years together said Jeter, because the players had very different numbers of at-bats in their strong and weak seasons.":
    "デービッド・ジャスティスは1995年(.253対.250)も1996年(.321対.314)もデレク・ジーターを打率で上回りました。ところが2シーズンを合わせると、.310対.270でジーターが上回りました。単年で見ればどちらの年もジャスティス、2年を合わせるとジーター。2人の打席数が、好調な年と不調な年とで大きく違っていたからです。",
  "COVID-19 death rates": "新型コロナウイルス感染症の致死率",
  "Early in 2020, the reported death rate among COVID cases was higher in Italy than in China overall. But broken down by age, Italy's rate was lower in every age group. Italy simply had far more older patients, who are at higher risk, so pooling all ages together made Italy look worse than a fair, age-for-age comparison showed.":
    "2020年の初め、新型コロナの症例における報告された致死率は、全体ではイタリアのほうが中国より高くなっていました。ところが年齢別に分けると、イタリアの致死率はどの年齢層でも低かったのです。イタリアには単に、リスクの高い高齢の患者がはるかに多かっただけでした。そのため全年齢をひとまとめにすると、年齢をそろえた公平な比較が示すよりも、イタリアが悪く見えてしまったのです。",
  "Simpson's paradox, a reasoning trap.":
    "シンプソンのパラドックス、推論の罠です。",
  "One choice can win in every single group, yet lose the moment you lump all the groups together. It sounds impossible, but it's real. It happens when the groups aren't a fair comparison: one side quietly got the easy cases, the other got the hard ones. So the big combined number says one thing while the group-by-group numbers say the opposite, and it's the big number that fools you.":
    "ある選択肢が、どのグループでも1つ残らず勝っているのに、すべてのグループをひとまとめにした途端に負けることがあります。あり得ないように聞こえますが、本当に起こります。これはグループどうしが公平な比較になっていないときに生じます。一方はこっそり易しい症例を、もう一方は難しい症例を受け持っていたのです。だから、大きなまとめの数字は一つのことを語り、グループごとの数字は正反対のことを語ります。そして、あなたをだますのはその大きな数字なのです。",
  "The 350/350 two-treatment table is as presented by Julious & Mullee (1994), drawn from the Charig et al. (1986) clinical series (which originally compared three modalities).":
    "350/350の2治療の表は、Julious & Mullee(1994)が提示したもので、Charig et al.(1986)の臨床シリーズ(元々は3つの治療法を比較していた)に基づいています。",

  // ==== Base-rate fallacy (medical test) ====
  "A near-perfect test says you're sick. How worried should you be?":
    "ほぼ完璧な検査が、あなたは病気だと告げています。どれほど心配すべきでしょうか?",
  "This disease is rare, about 1 in 1,000 people have it. The test never misses it when it's really there, and it raises a false alarm on only about 1 in 20 healthy people. Your result just came back positive.":
    "この病気はまれで、およそ1,000人に1人がかかっています。検査は、病気が本当にある場合には決して見逃さず、健康な人では約20人に1人にしか偽陽性を出しません。あなたの結果は、たった今、陽性で返ってきました。",
  "What's the chance you actually have the disease?":
    "あなたが実際にその病気である確率は、どのくらいでしょうか?",
  "In 1,000 people": "1,000人のうち",
  "have the disease": "病気にかかっている",
  "test positive": "検査が陽性",
  "About 95%": "約95%",
  "the test is 95% accurate": "検査は95%の精度がある",
  "About half": "約半分",
  "50/50": "五分五分",
  "About 2%": "約2%",
  "roughly 1 in 50": "おおよそ50人に1人",
  "Positive, but almost certainly a false alarm.":
    "陽性、しかしほぼ間違いなく偽陽性です。",
  "The base rate": "基準率",
  "A rare disease flips the odds":
    "まれな病気が確率をひっくり返す",
  "Because almost nobody has the disease, the test's small error rate does the heavy lifting. In 1,000 people, only 1 is truly sick, but about 50 healthy people also get a positive. So among the ~51 positive results, just 1 is real. A positive barely nudges you from “very unlikely” to “still unlikely.”":
    "ほとんど誰も病気ではないため、検査のわずかな誤り率が大きな役割を果たします。1,000人のうち、本当に病気なのは1人だけですが、健康な人も約50人が陽性になります。だから、約51件の陽性結果のうち、本物はたった1件です。陽性であっても、あなたは「ほぼあり得ない」から「やはり考えにくい」へとわずかに動くだけなのです。",
  "The base-rate fallacy": "基準率の誤謬",
  "When something is rare, even a very accurate test throws up far more false alarms than real cases, so a positive result can still mean you're probably fine.":
    "何かがまれなときは、非常に精度の高い検査でさえ、本物の症例よりもはるかに多くの偽陽性を出します。だから陽性という結果でも、あなたはおそらく大丈夫、という意味であり得るのです。",
  "The fix is to think in whole people, not percentages: picture 1,000 of them, count the true positives and the false alarms, and compare. Always ask how common the thing is before you trust a positive.":
    "対処法は、パーセントではなく人の数で考えることです。1,000人を思い描き、本物の陽性と偽陽性を数えて、比べてみましょう。陽性を信じる前に、その対象がどのくらいありふれているかを必ず問いましょう。",
  "A test's accuracy and your actual odds are two different things. Accuracy is measured on people we already know are sick or healthy. But a positive result asks the reverse question (given this positive, am I sick?), and that depends on how many sick people there were to find in the first place. If only 1 in 1,000 has the disease, the huge healthy majority produces a flood of false alarms that swamps the single real case. Make the disease common and the same test looks excellent; make it rare and a positive means little on its own.":
    "検査の精度と、あなたの実際の確率は、別々のものです。精度は、すでに病気か健康かがわかっている人を対象に測られます。しかし陽性という結果は逆の問い(この陽性を踏まえて、私は病気なのか?)を投げかけ、それはそもそも見つけるべき病人が何人いたかによります。1,000人に1人しか病気でなければ、健康な圧倒的多数が偽陽性の洪水を生み出し、たった1件の本物の症例をのみ込みます。病気をありふれたものにすれば同じ検査は見事に映り、まれなものにすれば陽性はそれだけではほとんど意味を持ちません。",
  "Even doctors slip": "医師でさえつまずく",
  "Researchers put this exact question to doctors and medical staff: a disease in 1 in 1,000, a test with a 5% false-alarm rate. The most common answer was 95%. The average was 56%. Only about 1 in 5 gave the correct answer of roughly 2%.":
    "研究者たちは、まさにこの問いを医師や医療従事者に出しました。1,000人に1人の病気、偽陽性率5%の検査です。最も多かった答えは95%でした。平均は56%でした。約2%という正しい答えを出したのは、およそ5人に1人だけでした。",
  "Think in people, not percentages":
    "パーセントではなく、人の数で考える",
  "The simplest cure is wording. Pose the same problem in natural frequencies (“1 in 1,000 people” and “about 50 false alarms” rather than “0.1%” and “5%”), and far more people, doctors included, get it right.":
    "最も簡単な処方箋は、言い回しです。同じ問題を自然頻度で提示すると(「0.1%」や「5%」ではなく「1,000人に1人」や「約50件の偽陽性」というように)、医師を含めてはるかに多くの人が正解します。",
  "The base-rate fallacy, a reasoning trap.":
    "基準率の誤謬、推論の罠です。",
  "A test can be 95% accurate and a positive result can still mean you're almost certainly fine. The trick is how rare the thing is. If only 1 in 1,000 people have a disease, then among everyone who tests positive, the few real cases are buried under a pile of false alarms. Accuracy isn't the same as your actual odds; you have to ask how common it is first.":
    "検査は95%の精度があっても、陽性という結果が、あなたはほぼ確実に大丈夫、という意味であり得ます。カギは、その対象がどれほどまれかです。1,000人に1人しか病気でないなら、陽性になった全員のうち、わずかな本物の症例は偽陽性の山の下に埋もれます。精度は、あなたの実際の確率と同じではありません。まず、それがどのくらいありふれているかを問う必要があります。",

  // ==== Correlation is not causation (chocolate / Nobel) ====
  "More chocolate, more Nobel Prizes. Should your country stock up?":
    "チョコレートが多いほど、ノーベル賞も多い。あなたの国も買いだめすべき?",
  "It's a real, published finding: across 23 countries, the more chocolate people eat, the more Nobel laureates the country has produced, a strong correlation (r ≈ 0.79). The trend is hard to argue with.":
    "これは実際に発表された知見です。23か国を通じて、人々がチョコレートを多く食べる国ほど、その国が輩出したノーベル賞受賞者も多い、という強い相関(r ≈ 0.79)があります。この傾向に反論するのは難しいでしょう。",
  "So, does eating chocolate help win Nobel Prizes?":
    "では、チョコレートを食べるとノーベル賞を取りやすくなるのでしょうか?",
  "Across 23 countries": "23か国を通じて",
  "Chocolate eaten": "消費されたチョコレート",
  "Nobel prizes": "ノーベル賞",
  "A country's wealth": "国の豊かさ",
  "r ≈ 0.79": "r ≈ 0.79",
  "Yes, chocolate boosts brainpower":
    "はい、チョコレートが頭脳を高めます",
  "the trend is strong": "傾向は強い",
  "No, it's a pure fluke": "いいえ、まったくの偶然です",
  coincidence: "偶然の一致",
  "No, a third thing drives both":
    "いいえ、第3の要因が両方を動かしています",
  "a common cause": "共通の原因",
  "The chocolate isn't doing anything.": "チョコレートは何もしていません。",
  "The common cause": "共通の原因",
  "A country's wealth pulls both up":
    "国の豊かさが両方を押し上げる",
  "Wealthier countries can afford more chocolate AND fund more universities, labs and research, which is what actually wins Nobel Prizes. Wealth drives both, so chocolate and Nobels rise together without one causing the other. Hand out free chocolate and you'd get sweeter teeth, not more laureates.":
    "豊かな国は、より多くのチョコレートを買える一方で、より多くの大学、研究室、研究に資金を出せます。実際にノーベル賞をもたらすのはそちらです。豊かさが両方を動かすので、どちらか一方がもう一方の原因になることなく、チョコレートとノーベル賞はそろって増えます。無料のチョコレートを配っても、得られるのは虫歯であって、受賞者の増加ではありません。",
  "Correlation ≠ causation": "相関 ≠ 因果",
  "Two things moving together doesn't mean one causes the other. Often a third thing is quietly driving both.":
    "2つのものが一緒に動くからといって、一方がもう一方の原因だとは限りません。多くの場合、第3のものが陰で両方を動かしています。",
  "When you see a strong link, run through the possibilities before believing X causes Y: maybe Y causes X, maybe a common cause drives both, or maybe it's chance. Usually only a controlled comparison can tell which.":
    "強い関連を見つけたら、XがYの原因だと信じる前に可能性を一通り検討しましょう。YがXの原因かもしれない、共通の原因が両方を動かしているかもしれない、あるいは単なる偶然かもしれません。どれなのかは、たいてい対照比較でしか見分けられません。",
  "A correlation only says two things tend to move together. That can happen for several reasons: one really does cause the other; the causation runs the other way; a hidden third factor drives both (a common cause, like hot weather driving both ice-cream sales and drownings); or it's a coincidence, which gets more likely the more data you sift through. Spotting a correlation is the easy part. Working out which of these is behind it is the real job, and usually needs an experiment, not just a chart.":
    "相関は、2つのものが一緒に動く傾向がある、と言っているにすぎません。それにはいくつかの理由があり得ます。一方が本当にもう一方の原因である、因果が逆向きに働いている、隠れた第3の要因が両方を動かしている(共通の原因。たとえば暑さがアイスクリームの売上と水死の両方を増やす、といったもの)、あるいは偶然の一致で、これはふるいにかけるデータが多いほど起こりやすくなります。相関に気づくのは簡単な部分です。そのどれが背後にあるのかを突き止めることこそ本当の仕事で、たいていは1枚のグラフではなく実験が必要になります。",
  "Storks and babies": "コウノトリと赤ちゃん",
  "Across European countries, the ones with more storks really do have more human births, a statistically significant link. The legend isn't true: larger countries simply have room for both more storks and more people.":
    "ヨーロッパの国々を見ると、コウノトリが多い国ほど実際に人間の出生数も多く、統計的に有意な関連があります。あの言い伝えは本当ではありません。大きな国は単に、より多くのコウノトリとより多くの人の、両方を収める余地があるだけです。",
  "Nicolas Cage and drownings": "ニコラス・ケイジと水死",
  "The number of films Nicolas Cage releases in a year tracks the number of people who drown in swimming pools. Nobody thinks one causes the other; line up enough unrelated trends and some will match by pure chance.":
    "ニコラス・ケイジが1年間に公開する映画の本数は、プールで溺れて亡くなる人の数と連動しています。どちらかが一方の原因だと考える人はいません。無関係な傾向を十分な数だけ並べれば、いくつかは純粋な偶然で一致するのです。",
  "Correlation ≠ causation, a reasoning trap.":
    "相関 ≠ 因果、推論の罠です。",
  "Two things can rise and fall together perfectly and still have nothing to do with each other. Very often a hidden third thing is pulling both strings at once, so it looks like one causes the other when neither does. Before you believe a headline that “X is linked to Y,” ask what else could be driving both.":
    "2つのものが完璧に一緒に上下していても、互いにまったく関係がないことがあります。ごく頻繁に、隠れた第3のものが同時に両方の糸を引いていて、そのせいで、どちらも原因ではないのに一方が原因のように見えるのです。「XはYと関連している」という見出しを信じる前に、ほかに何が両方を動かしているのかを問いましょう。",

  // ==== Survivorship bias (bombers) ====
  "Bombers come home riddled with bullet holes. Where do you add the armour?":
    "爆撃機が銃弾の穴だらけで帰還します。あなたはどこに装甲を足しますか?",
  "In WWII, returning bombers were peppered with damage, heaviest on the wings and body, while the engines and cockpit came back almost untouched. Armour is heavy, so you can only reinforce a few areas.":
    "第二次世界大戦で、帰還した爆撃機は損傷だらけで、翼と機体が最もひどく、一方でエンジンとコックピットはほとんど無傷で戻ってきました。装甲は重いので、補強できるのはわずかな箇所だけです。",
  "Where should the armour go?": "装甲はどこに置くべきでしょうか?",
  "Returning bombers": "帰還した爆撃機",
  "hits on planes that came back": "戻ってきた機体への被弾",
  "armour here, the lost planes' hits":
    "ここに装甲を、失われた機体の被弾",
  "The wings and body": "翼と機体",
  "where the holes are": "穴があるところ",
  "Spread it evenly": "均等に分散させる",
  "play it safe": "安全策をとる",
  "The engines and cockpit": "エンジンとコックピット",
  "where there are no holes": "穴がないところ",
  "Armour where the holes aren't.":
    "穴がないところに装甲を。",
  "The missing planes": "帰ってこなかった機体",
  "You only see the survivors": "見えているのは生存者だけ",
  "These are the planes that made it home. The ones hit in the engine or cockpit didn't, so their damage never shows up in the data. The holes on the survivors map out exactly where a bomber can be shot and still fly. The clean spots are the fatal ones: armour those.":
    "これらは無事に帰還できた機体です。エンジンやコックピットを撃たれた機体は帰れなかったので、その損傷はデータにいっさい現れません。生存機の穴は、爆撃機がどこを撃たれてもなお飛べるかを、ちょうど示しています。傷のない場所こそ致命的な場所です。そこを装甲するのです。",
  "Survivorship bias": "生存者バイアス",
  "When you only look at the winners, the failures become invisible, and they often hold the real lesson.":
    "勝者だけを見ていると、失敗は見えなくなります。そして、失敗こそが本当の教訓を握っていることが多いのです。",
  "Before drawing a conclusion, ask who's missing from the data. The planes that didn't return, the funds that closed, the businesses that folded: they were quietly filtered out, and putting them back can flip the answer.":
    "結論を出す前に、データから誰が抜け落ちているかを問いましょう。帰らなかった機体、閉鎖したファンド、たたんだ事業。それらはひっそりとふるい落とされており、彼らを戻すと答えがひっくり返ることがあります。",
  "Survivorship bias creeps in whenever your data has quietly been filtered to keep only the things that “made it”: returning planes, funds still trading, companies still around. You never see the ones that failed and dropped out, and because the survivors share whatever helped them survive, that trait looks far more common, or more effective, than it really is. The fix is to hunt for the missing group and ask what the full picture would show. (The real Wald did more than point at a diagram: he built a statistical method to estimate each part's vulnerability from the survivors' damage.)":
    "生存者バイアスは、データがひそかにふるいにかけられ、「うまくいった」ものだけが残されているときにいつでも忍び込みます。帰還した機体、まだ取引されているファンド、まだ存続している会社などです。失敗して脱落したものは決して目に入りません。そして、生存者は生き延びる助けになった特徴を共有しているため、その特徴は実際よりもはるかにありふれて、あるいは効果的に見えてしまいます。処方箋は、抜け落ちたグループを探し出し、全体像なら何を示すかを問うことです。(実在のウォルドは、図を指し示す以上のことをしました。生存機の損傷から各部位の脆弱性を推定する統計的手法を、作り上げたのです。)",
  "Falling cats": "落ちる猫",
  "Vets found that cats falling from higher floors often arrived with fewer injuries than those from lower floors. Part of the reason is grim survivorship: a cat that didn't survive the fall was never brought in, so the hospital's data only counts the ones that lived.":
    "獣医たちは、高い階から落ちた猫のほうが、低い階から落ちた猫よりも、けがが少ない状態で運ばれてくることが多いと気づきました。理由の一つは、痛ましい生存者効果です。落下を生き延びられなかった猫は、そもそも運び込まれないので、病院のデータは生き延びた猫だけを数えているのです。",
  "Star mutual funds": "花形の投資信託",
  "Look at the funds still on offer today and active management looks great. But funds that did badly get quietly closed and dropped from the records, so the survivors flatter the whole industry. Counting the dead funds cuts the average return by over a percentage point a year.":
    "今日なお販売されているファンドだけを見れば、アクティブ運用は見事に映ります。しかし、成績の悪かったファンドはひっそりと閉鎖され、記録から外されるので、生存者が業界全体をよく見せてしまいます。消えたファンドも数に入れると、平均リターンは年に1パーセントポイント以上下がります。",
  "Survivorship bias, a reasoning trap.":
    "生存者バイアス、推論の罠です。",
  "It's easy to study the winners, the survivors, the successes, the things still standing, and copy what they have in common. But the failures are invisible: they dropped out of the data. Whatever helped the survivors survive looks far more powerful than it is, because you never see everyone it didn't save. Before copying the winners, ask who's missing.":
    "勝者、生存者、成功例、いまも立っているものを研究し、それらの共通点をまねするのは簡単です。しかし、失敗は目に見えません。データから脱落しているからです。生存者が生き延びる助けになったものは何であれ、実際よりはるかに強力に見えます。それが救えなかったすべての存在を、私たちは決して目にしないからです。勝者をまねる前に、誰が抜けているのかを問いましょう。",

  // ==== Prosecutor's fallacy (People v. Collins) ====
  "A 1 in 12 million match. Case closed?": "1,200万分の1の一致。これで事件は解決?",
  "Los Angeles, 1964. A woman is knocked down and her purse is taken. Witnesses describe the pair who ran off: a blonde woman with a ponytail and a bearded Black man, in a partly yellow car. A couple who fit every detail are charged. At the trial an expert is asked to assume a frequency for each feature, multiplies them together, and gets 1 in 12 million. The prosecutor tells the jury that is the chance the two in the dock are innocent. Take the 1 in 12 million at face value, and picture the 12 million couples who could have been the ones.":
    "1964年、ロサンゼルス。ある女性が突き倒され、ハンドバッグを奪われます。目撃者が語る逃げた2人組は、ポニーテールの金髪の女性と、あごひげを生やした黒人の男性で、一部が黄色の車に乗っていました。細部までことごとく一致する1組のカップルが起訴されます。裁判で専門家は、特徴ごとに出現頻度を仮定するよう求められ、それらを掛け合わせて1,200万分の1という数字を出します。検察官は陪審に、それこそが被告席の2人が無実である確率だと告げます。この1,200万分の1をそのまま額面どおりに受け取ったうえで、犯人であり得た1,200万組のカップルを思い描いてください。",
  "This couple fits the description. What are the odds they did it?":
    "このカップルは特徴が一致しています。2人が犯人である確率はどのくらいでしょうか?",
  "In 12 million couples": "1,200万組のカップルのうち",
  "did it": "犯人である",
  "fit the description": "特徴が一致する",
  "Virtually certain": "ほぼ確実",
  "12 million to one against them": "1,200万対1で彼らに不利",
  "Around 99%": "約99%",
  "not quite proof, but close": "証明とまではいかないが、かなり近い",
  "About a coin flip": "コイン投げと同じくらい",
  "roughly 50/50": "おおよそ五分五分",
  "One in 12 million, and still a coin flip.": "1,200万分の1、それでもなお五分五分です。",
  "The flipped question": "ひっくり返された問い",
  "Rare evidence is common in a big crowd": "まれな証拠も、大きな集団の中ではありふれている",
  "The 1 in 12 million answers one question: pick a couple at random, how likely are they to fit? The jury has to answer a different one: of all the couples who do fit, which pair did it? Line up 12 million couples. One pair are the robbers, and of course they fit. But at odds of 1 in 12 million, roughly one more couple in that crowd fits by pure chance. So a couple who fits is about as likely to be innocent as guilty.":
    "1,200万分の1が答えているのは、1つの問いです。カップルを無作為に1組選んだとき、特徴が一致する見込みはどのくらいか。しかし陪審が答えなければならないのは、別の問いです。特徴が一致するすべてのカップルのうち、犯人はどの組か。1,200万組のカップルを並べてみましょう。1組は強盗犯であり、もちろん特徴は一致します。しかし1,200万分の1という確率なら、その集団の中でもう1組ほどが、まったくの偶然によって一致します。つまり、特徴が一致するカップルは、有罪であるのと同じくらい無実でもあり得るのです。",
  "The California Supreme Court reversed the conviction in 1968. Working from the prosecution's own figures, it found a likelihood of over 40 percent that at least one other couple could have fitted the description just as well, and it warned that guilt cannot be settled by arithmetic like this.":
    "カリフォルニア州最高裁判所は1968年、この有罪判決を破棄しました。検察側自身の数字をもとに計算すると、少なくとももう1組のカップルが同じように特徴と一致していた可能性は40パーセントを超えると認定し、有罪かどうかをこのような計算で決めることはできないと戒めました。",
  "The prosecutor's fallacy": "検察官の誤謬",
  "“If he were innocent, this evidence would be that unlikely” is not the same as “this evidence makes him that unlikely to be innocent.” Swap the two and a coin flip starts to sound like certainty.":
    "「彼が無実なら、この証拠が現れることはそれほど起こりにくい」と、「この証拠によって、彼が無実である見込みはそれほど低くなる」は、同じではありません。この2つを取り違えると、五分五分が確実であるかのように聞こえ始めます。",
  "Before you accept a one in a million match, ask how big the pool was. One in a million odds across a city of ten million throw up about ten matches, and only one of those people did it. The number means nothing until you say who was in the crowd.":
    "100万分の1の一致を受け入れる前に、母集団がどれだけ大きかったかを問いましょう。100万分の1という確率は、1,000万人の都市では約10件の一致を生み出し、そのうち犯人はたった1人です。その集団に誰がいたのかを言うまで、この数字には何の意味もありません。",
  "Two questions sound identical and are not. The first: if this person had nothing to do with it, how likely is this evidence? That is what a lab or an expert can actually measure, and it is where figures like 1 in 12 million come from. The second: given this evidence, how likely is it that this person did it? That is what a jury has to decide, and it depends on something no lab measures, namely how many people could have done it. Push odds of 1 in 12 million through a crowd of 12 million and you expect about one innocent match, so the match on its own is worth roughly a coin flip. Shrink the crowd, or add independent evidence, and the same match becomes powerful. Grow the crowd, and it becomes weak. The trap also runs in reverse: a defence lawyer can say that 2,000 people in the city share that blood type, so the evidence proves nothing, which quietly ignores that the other 1,999 were nowhere near the crime.":
    "そっくり同じに聞こえて、まったく別物である2つの問いがあります。1つめ。この人物が事件と無関係だったとしたら、この証拠が現れる見込みはどのくらいか。これは検査機関や専門家が実際に測定できるもので、1,200万分の1のような数字はここから出てきます。2つめ。この証拠を踏まえたとき、この人物が犯人である見込みはどのくらいか。これは陪審が判断しなければならないもので、どの検査機関も測らないもの、すなわち犯行が可能だった人が何人いたかに左右されます。1,200万分の1という確率を1,200万人の集団に当てはめれば、無実の一致が約1件出ると見込まれます。だから一致それ自体の価値は、おおよそ五分五分にすぎません。集団を小さくするか、独立した別の証拠を加えれば、同じ一致が強力になります。集団を大きくすれば、弱くなります。この罠は逆向きにも働きます。弁護人が、この街には同じ血液型の人が2,000人いるのだから証拠は何も証明しない、と言うこともできるのです。これは、残る1,999人が犯行現場の近くにすらいなかったことを、そっと無視しています。",
  "Two cot deaths, and a number that became guilt": "2件の乳幼児突然死と、有罪に変わった数字",
  "An English murder trial heard that the chance of two cot deaths in a family like the defendant's was 1 in 73 million. Press reports turned that into the chance the deaths were natural. The Royal Statistical Society said publicly that the figure had no statistical basis, because it assumed the two deaths were independent, and that reading it as a chance of innocence is the prosecutor's fallacy. What the jury needed was a comparison: two cot deaths and two murders are both rare, so which is rarer here?":
    "イングランドのある殺人事件の裁判で、被告のような家庭で乳幼児突然死が2件起こる確率は7,300万分の1だ、という証言がなされました。報道はそれを、2人の死が自然死である確率へとすり替えました。王立統計学会は、この数字は2件の死が互いに独立だと仮定しており統計的な根拠がないこと、そしてそれを無実の確率として読むのは検察官の誤謬であることを、公に表明しました。陪審に必要だったのは比較でした。乳幼児突然死が2件起こることも、殺人が2件起こることも、どちらもまれです。では、この事件ではどちらがよりまれなのでしょうか?",
  "Almost nobody spots the swap": "入れ替わりに気づく人は、ほとんどいない",
  "Researchers gave 73 students a murder case in which the killer's blood type is found in 1 person in 100, then showed them a prosecution argument built on the swapped question: only a 1 percent chance the blood came from someone else, so a 99 percent chance the suspect is guilty. 21 of the 73 rated that argument correct, and only 16 saw that it and the opposing defence argument were both wrong.":
    "研究者たちは73人の学生に、犯人の血液型が100人に1人に見られるという殺人事件を示し、続いて問いを入れ替えたうえで組み立てられた検察側の主張を見せました。その血液が別の誰かのものである確率は1パーセントしかないのだから、容疑者が有罪である確率は99パーセントだ、という主張です。73人のうち21人がこの主張を正しいと評価し、この主張と、それに対立する弁護側の主張の両方が誤りだと見抜いたのは、わずか16人でした。",
  "The prosecutor's fallacy, a reasoning trap.": "検察官の誤謬、推論の罠です。",
  "When an expert says there is only a one in a million chance of a match by accident, that is a fact about the evidence, not about the person in the dock. Flip the two around and you get the prosecutor's fallacy. The cure is to ask how many people were in the pool: one in a million odds across a city of ten million produce about ten innocent matches, so on its own a match can be nowhere near proof.":
    "専門家が、偶然に一致する確率は100万分の1しかない、と言うとき、それは証拠についての事実であって、被告席にいる人物についての事実ではありません。この2つをひっくり返すと、検察官の誤謬になります。処方箋は、母集団に何人いたのかを問うことです。100万分の1という確率は、1,000万人の都市では無実の一致を約10件生み出します。だから一致それ自体は、証明にはほど遠いことがあるのです。",
  "Spotted the swap. Bet you don't.": "入れ替わりを見抜きました。あなたにできますか?",
  "I'd have convicted on the spot.": "私ならその場で有罪にしていました。",
  "The court's appendix showed that on those same figures, with a pool of about 12 million couples, the chance that at least one other couple fitted the description was roughly 41 percent.":
    "判決の付録は、同じ数字を用い、約1,200万組のカップルからなる母集団を想定すると、少なくとももう1組のカップルが特徴と一致する確率はおよそ41パーセントになることを示していました。",

  // ==== Will Rogers phenomenon (stage migration) ====
  "Better survival in every single stage. Did anyone actually live longer?":
    "どのステージでも生存率が向上。実際に長く生きた人はいたのでしょうか?",
  "One group of 131 lung cancer patients, treated in 1977, sorted into stages twice. First using only the information older hospitals could gather, then again after new scans. Nobody was treated differently. Only the sorting changed.":
    "1977年に治療を受けた131人の肺がん患者という1つの集団を、2回にわたってステージ分けしました。1回目は昔の病院に集められた情報だけを使い、2回目は新しい画像検査の後に行いました。誰ひとり治療の内容は変わっていません。変わったのは分け方だけです。",
  "Did these patients actually do better?":
    "この患者たちは、実際に良い経過をたどったのでしょうか?",
  "Six-month survival": "6か月生存率",
  "Sorted the old way": "古いやり方で分けた場合",
  Old: "旧",
  "Sorted after the new scans": "新しい画像検査の後で分けた場合",
  New: "新",
  "Stage I": "ステージI",
  "Stage II": "ステージII",
  "Stage III": "ステージIII",
  "Yes, they did better": "はい、経過は良くなりました",
  "every stage improved": "どのステージも改善した",
  "There is no way to tell": "判断のしようがありません",
  "too little to go on": "手がかりが少なすぎる",
  "No, nothing changed": "いいえ、何も変わっていません",
  "only the labels moved": "動いたのはラベルだけ",
  "Identical. Seventy two survivors either way.":
    "まったく同じです。どちらで分けても生存者は72人。",
  "The migration": "ステージの移動",
  "Patients moved between stages, and lifted both":
    "患者がステージ間を移り、その両方を押し上げた",
  "The new scans spotted spread that the old workup had missed, so patients were moved out of better stages into worse ones. Each of them was among the sickest in the stage they left, so that stage's average rose. Each was also among the healthiest in the stage they joined, so that average rose too. Every stage improved and not one person's outcome changed:":
    "新しい画像検査は、古い検査では見逃されていた広がりを見つけました。そのため患者は、より良いステージからより悪いステージへと移されました。移った患者はいずれも、離れたステージの中では最も重い部類だったので、そのステージの平均は上がりました。同時に、加わったステージの中では最も軽い部類だったので、そちらの平均も上がりました。どのステージも改善したのに、1人として結果は変わっていません。",
  "The Will Rogers phenomenon": "ウィル・ロジャース現象",
  "Move members from one group into another and you can lift the average of every group at once, while the overall picture stays exactly the same.":
    "あるグループから別のグループへメンバーを移すだけで、全体像はまったく変わらないまま、すべてのグループの平均を一度に押し上げることができます。",
  "Whenever a category's average improves, ask whether the category still holds the same kind of members. Better detection quietly reshuffles who counts as mild and who counts as severe, and a reshuffle on its own can make every column look better.":
    "ある区分の平均が良くなったときはいつでも、その区分が以前と同じ顔ぶれを抱えているのかを問いましょう。検出の精度が上がると、誰が軽症で誰が重症に数えられるかが、ひそかに並べ替えられます。そして、並べ替えただけで、どの棒も良く見えるようになり得るのです。",
  "Picture two buckets, one of good outcomes and one of bad. Take the worst items out of the good bucket and drop them into the bad one, where they are the best of a bad lot. The good bucket's average rises because its weakest members left. The bad bucket's average rises because it gained members better than its own. Both averages improve and nothing about any individual has changed. In medicine the reshuffling is done by better scans, which find disease that was always there but previously invisible. That is why survival by stage can improve across the board in a period when the treatments themselves did not get better, and it is why comparing stages across eras of different technology is treacherous.":
    "バケツを2つ思い浮かべてください。1つは良い結果のバケツ、もう1つは悪い結果のバケツです。良いバケツから最も悪いものを取り出し、悪いバケツへ落とし込みます。そこではそれが、悪い顔ぶれの中で最も良いものになります。良いバケツの平均は、最も弱いメンバーが抜けたので上がります。悪いバケツの平均は、元からいたものより良いメンバーを迎え入れたので上がります。両方の平均が改善するのに、どの個人についても何ひとつ変わっていません。医療では、この並べ替えを行うのは性能の上がった画像検査です。それは、ずっとそこにあったのに、これまで見えていなかった病変を見つけ出します。だからこそ、治療そのものが良くなっていない時期にも、ステージごとの生存率が軒並み改善することがあり得るのです。そして、技術水準の異なる時代どうしでステージを比べることが危ういのも、そのためです。",
  "The check that gave it away": "からくりを暴いた検証",
  "The same researchers sorted both eras of patients by their symptoms instead, a yardstick no scanner can shift. Judged that way the two groups survived at much the same rate, around 77 and 78 percent for those without symptoms, and 26 against 22 percent for the sickest. What had really changed was the mix, because the newer group held twice the proportion of the mildest patients.":
    "同じ研究者たちは、両方の時代の患者を、代わりに症状によって分けてみました。症状は、どんな画像検査でも動かせないものさしです。そのように判定すると、2つの集団の生存率はほぼ同じで、症状のない人ではおよそ77パーセントと78パーセント、最も重い人では26パーセント対22パーセントでした。本当に変わっていたのは顔ぶれの構成でした。新しいほうの集団は、最も軽い患者の割合が2倍だったのです。",
  "It happened again with PET": "PETでも同じことが起きた",
  "As PET scanning spread through American hospitals, lung cancer patients were reclassified all over again. The share labelled most advanced grew, and survival within the stages duly ticked up, two year survival moving from 18 to 22 percent in one stage and 6 to 8 percent in another. The authors called their paper the phenomenon revisited.":
    "PET検査がアメリカの病院に広まるにつれて、肺がん患者は改めて分類し直されました。最も進行していると分類される割合が増え、それに応じて各ステージの生存率も上がりました。2年生存率は、あるステージでは18パーセントから22パーセントへ、別のステージでは6パーセントから8パーセントへと動いています。著者たちは自分たちの論文に、この現象への再訪という題を付けました。",
  "The Will Rogers phenomenon, a reasoning trap.":
    "ウィル・ロジャース現象、推論の罠です。",
  "Take the worst members of a good group and move them into a bad group. The good group's average rises, because its weakest ones left. The bad group's average rises too, because the newcomers are better than what it already had. Every group improves and nothing real has happened. It is how sharper scans can make survival look better in every stage of a disease while exactly as many people live and die.":
    "良いグループの中で最も悪いメンバーを取り出し、悪いグループへ移してみましょう。良いグループの平均は、最も弱いものが抜けたので上がります。悪いグループの平均も、新入りが元からいたものより良いので上がります。どのグループも改善するのに、現実には何も起きていません。生きる人と死ぬ人の数がまったく同じままなのに、性能の上がった画像検査によって、病気のどのステージでも生存率が良く見えるようになるのは、こういう仕組みです。",
  "The counts are Table 4: the 1977 cohort of 131 patients staged twice, once on the data the older cohort had and once with the new imaging. Both stagings give 72 survivors, a six-month survival of 55 percent.":
    "この数値は表4のものです。1977年コホートの131人の患者を2回ステージ分けしたもので、1回目は古いコホートが持っていたデータにより、2回目は新しい画像検査を用いています。どちらのステージ分けでも生存者は72人で、6か月生存率は55パーセントです。",

  // ==== Trap Hunt test items ====
  "Two schools publish exam results. School B has the higher pass rate overall, 75% against 70%. When results are split by student background, School A comes out ahead in every single group. The district praises School B.":
    "2つの学校が試験の結果を公表しました。全体の合格率はB校のほうが高く、75%対70%です。生徒の出身背景で分けて見ると、どのグループでも例外なくA校が上回っています。教育委員会はB校をたたえました。",
  "A wins in every group but loses overall, which happens when the groups are mixed unevenly. The pooled number is the misleading one here.":
    "Aはどのグループでも勝っているのに全体では負けています。これはグループの混ざり方が偏っているときに起こります。ここで誤解を招いているのは、まとめた数字のほうです。",
  "A factory reports its new process has a lower defect rate than the old one, 3% against 4%. Looking at simple parts and complex parts separately, the old process had fewer defects in both.":
    "ある工場が、新しい工程は旧工程より不良率が低く、3%対4%だと報告しました。単純な部品と複雑な部品に分けて見ると、どちらでも旧工程のほうが不良が少なくなっていました。",
  "Better in both categories yet worse overall means the two processes handled very different mixes of simple and complex parts.":
    "どちらの区分でも優れているのに全体では劣るということは、2つの工程が扱った単純な部品と複雑な部品の割合が、大きく異なっていたということです。",
  "A condition affects about 1 in 2,000 people. A screening test is 99% accurate. A patient tests positive and is told they almost certainly have the condition.":
    "ある疾患は、およそ2,000人に1人がかかっています。スクリーニング検査の精度は99%です。ある患者が陽性となり、ほぼ確実にその疾患だと告げられました。",
  "With a condition this rare, the 1% error rate produces far more false positives than there are real cases, so a positive is still more likely to be a false alarm.":
    "これほどまれな疾患では、1%の誤り率が、本物の症例よりはるかに多くの偽陽性を生み出します。そのため陽性であっても、偽陽性である可能性のほうが依然として高いのです。",
  "A system flags travellers as suspicious and is 95% accurate. About 1 in 1,000 travellers is actually a threat. An official states that a flagged traveller is 95% likely to be a threat.":
    "あるシステムが旅行者を要注意として検知し、その精度は95%です。実際に脅威である旅行者は、およそ1,000人に1人です。当局者は、検知された旅行者が脅威である確率は95%だと述べました。",
  "That confuses the test's accuracy with the odds after a flag. Because threats are rare, the overwhelming majority of flags are ordinary travellers.":
    "これは検査の精度と、検知された後の確率を混同しています。脅威はまれなので、検知された人の圧倒的多数はごく普通の旅行者です。",
  "Neighbourhoods with more parks have lower obesity rates. A council report concludes that building parks will reduce obesity, and proposes a park-building programme.":
    "公園が多い地区ほど肥満率が低くなっています。自治体の報告書は、公園を作れば肥満が減ると結論づけ、公園整備計画を提案しました。",
  "Wealth and urban planning plausibly drive both park provision and health, so the link may not be the parks doing the work.":
    "豊かさや都市計画が、公園の整備と住民の健康の両方を動かしている可能性は十分にあります。そうであれば、この関連を生んでいるのは公園そのものではないかもしれません。",
  "Students who visit the library more often get higher grades. A university announces mandatory weekly library visits to raise grades.":
    "図書館をよく利用する学生ほど成績が良くなっています。ある大学は、成績を上げるために週1回の図書館利用を義務化すると発表しました。",
  "Motivated students both study more and visit the library. Forcing the visit does not import the motivation that produced the grades.":
    "意欲の高い学生は、より多く勉強し、なおかつ図書館にも通います。利用を強制しても、その成績を生み出した意欲まで持ち込めるわけではありません。",
  "A business book studies companies that have thrived for fifty years and finds nearly all had bold, risk-taking leaders. It concludes that bold leadership causes lasting success.":
    "あるビジネス書が、50年にわたって栄えてきた企業を調べ、そのほとんどすべてが大胆でリスクを取る経営者を擁していたことを見いだしました。そして、大胆なリーダーシップが長続きする成功をもたらすと結論づけています。",
  "The bold companies that went under are not in the sample. Boldness may equally well cause spectacular failure, which the study cannot see.":
    "大胆でありながら倒れていった企業は、標本に入っていません。大胆さは同じくらい派手な失敗ももたらしうるのに、この調査にはそれが見えていません。",
  "A clinic reviews patients who completed its demanding rehabilitation programme and finds excellent outcomes. It reports the programme as highly effective.":
    "ある診療所が、要求の厳しいリハビリテーション・プログラムを最後までやり遂げた患者を調べたところ、非常に良好な結果が得られました。診療所はこのプログラムを、きわめて効果的だと報告しています。",
  "Patients who dropped out are excluded, and they are likely the ones doing worst. Counting only finishers flatters the programme.":
    "途中でやめた患者は除外されていますが、経過が最も悪いのはおそらくその人たちです。最後までやり遂げた人だけを数えれば、プログラムは実際より良く見えます。",
  "A database search turns up one man whose DNA matches a crime-scene sample. The lab reports that the profile occurs in about 1 person in a million. The prosecutor tells the jury there is therefore about a one in a million chance that he is innocent.":
    "データベース検索によって、犯行現場の試料とDNAが一致する男性が1人見つかりました。検査機関は、この型が現れるのはおよそ100万人に1人だと報告しています。検察官は陪審に、したがって彼が無実である確率はおよそ100万分の1だと告げました。",
  "The 1 in a million is the chance of a match if he is innocent, not the chance he is innocent given a match. In a large pool other people match too, so the two numbers are nowhere near the same.":
    "100万分の1は、彼が無実だとした場合に一致が起こる確率であって、一致が出たときに彼が無実である確率ではありません。母集団が大きければ他の人も一致するので、この2つの数字はまったく別物です。",
  "Fibres on a suspect's coat match the victim's carpet. An expert says only about 1 coat in 5,000 would carry such fibres. Counsel concludes the suspect is 4,999 times more likely to be guilty than innocent.":
    "容疑者のコートに付いていた繊維が、被害者宅のカーペットと一致しました。専門家は、そのような繊維が付着しているコートは約5,000着に1着しかないと述べています。弁護人はここから、容疑者が有罪である可能性は無実である可能性の4,999倍だと結論づけました。",
  "A rarity figure describes the evidence, not the person. How many innocent people could have picked up those fibres depends on how many people were ever near that carpet.":
    "まれさを表す数字は、証拠を説明するものであって、人物を説明するものではありません。その繊維が付着しうる無実の人が何人いたかは、そのカーペットの近くにこれまで何人が居合わせたかによって決まります。",
  "A hospital installs a more sensitive scanner. Over the next two years it reports that survival improved in every severity grade of the disease, from the mildest to the most advanced, and concludes that its care has got better.":
    "ある病院が、より感度の高い画像診断装置を導入しました。その後の2年間で、最も軽い段階から最も進行した段階まで、この病気のどの重症度でも生存率が改善したと報告し、自院の診療が良くなったと結論づけました。",
  "A sharper scanner regrades patients. Those moved out of a mild grade were its sickest, and they arrive in a severe grade as its healthiest, so both averages rise without anyone doing better.":
    "性能の高い装置は、患者の重症度を付け直します。軽い段階から移された患者は、その段階では最も重い部類であり、重い段階に着けばそこで最も軽い部類になります。そのため、誰の経過も良くなっていないのに、両方の平均が上がるのです。",
  "A school adopts a placement test that is much better at identifying struggling pupils, and uses it to sort them into a top and a bottom stream. The next year, average results rise in both streams. The head teacher credits the new teaching methods.":
    "ある学校が、学習につまずいている児童をずっと的確に見つけられる組分けテストを導入し、それを使って児童を上位クラスと下位クラスに振り分けました。翌年、どちらのクラスでも平均成績が上がりました。校長は、新しい指導法のおかげだとたたえました。",
  "The pupils reclassified out of the top stream were its weakest and become the strongest of the bottom stream, so both averages climb on reshuffling alone.":
    "上位クラスから移された児童は、そのクラスでは最も成績が低く、下位クラスでは最も成績が高い存在になります。そのため、振り分け直しただけで、どちらの平均も上がるのです。",
  "A hospital reports that survival improved in every severity grade over five years. It also reports that the grading criteria did not change in that time, that no new diagnostic test was introduced, and that the number of patients in each grade stayed about the same.":
    "ある病院が、5年間でどの重症度でも生存率が改善したと報告しています。あわせて、その間に重症度の判定基準は変わっておらず、新しい検査も導入されておらず、各重症度の患者数もほぼ同じままだったと報告しています。",
  "This is the case where the improvement is real. Nothing reclassified the patients, and the grades held the same share of people, so no reshuffling could have manufactured the gain.":
    "これは、改善が本物である場合です。患者を分類し直したものは何もなく、各重症度が占める人の割合も同じままでした。したがって、振り分け直しがこの改善を作り出したということはあり得ません。",
  "An expert testifies that the DNA profile occurs in roughly 1 person in a million, and adds that in a city of two million this means about two other people would be expected to match as well, so the match alone does not single out the defendant.":
    "専門家が、そのDNA型が現れるのはおよそ100万人に1人だと証言し、さらに、人口200万人の都市ではこれは他にも約2人が一致すると見込まれるという意味であり、一致だけでは被告を特定できないと付け加えました。",
  "This is the rarity figure stated correctly. The expert converts it into expected matches in the population instead of flipping it into a probability of innocence.":
    "これは、まれさを表す数字を正しく述べた例です。専門家はそれを無実の確率にひっくり返すのではなく、母集団の中で見込まれる一致件数に置き換えています。",
  "Patients are assigned at random to a drug or a placebo. The drug group has fewer strokes, and the difference holds within every age group. The researchers conclude the drug reduces strokes.":
    "患者は無作為に、薬またはプラセボへ割り付けられます。薬の群では脳卒中が少なく、その差はどの年齢層の中でも保たれています。研究者たちは、この薬が脳卒中を減らすと結論づけました。",
  "Randomisation balances the hidden differences, and the effect survives splitting by age. This reasoning is sound.":
    "無作為化が隠れた違いを釣り合わせており、しかもその効果は年齢で分けても消えません。この推論は妥当です。",
  "A test with a 1% false-positive rate is used in a clinic where about 40% of those tested genuinely have the condition. A doctor tells a patient that a positive result makes the condition much more likely.":
    "偽陽性率1%の検査が、受検者のおよそ40%が実際にその疾患を持つ診療所で使われています。医師は患者に、陽性という結果によってその疾患である可能性はずっと高くなる、と伝えました。",
  "The base rate matters, and here it is high. With 40% prevalence a positive really is strong evidence, so applying the rare-disease lesson would be a mistake.":
    "基準率は重要ですが、ここではその基準率が高いのです。有病率が40%なら陽性は本当に強い証拠であり、まれな病気の教訓をそのまま当てはめるのは誤りでしょう。",
  "A city compares road deaths before and after lowering a speed limit, adjusts for traffic volume, and checks the national trend over the same years. The local drop is larger than the national trend.":
    "ある市が、制限速度を引き下げる前と後の交通事故死者数を比較し、交通量で調整したうえで、同じ年の全国的な傾向も確認しました。その市の減少幅は、全国の傾向よりも大きくなっています。",
  "They accounted for the obvious confounders and for the background trend, which is what makes a before-and-after comparison credible.":
    "明らかな交絡因子と、背景にある傾向の両方を考慮に入れています。前後比較を信頼できるものにするのは、まさにこれです。",
  "A trial reports outcomes for everyone who was enrolled, including those who stopped treatment early, and states how many dropped out and why.":
    "ある試験は、治療を途中でやめた人も含めて、組み入れられた全員の結果を報告し、何人が脱落したのか、その理由は何かも示しています。",
  "Reporting the whole enrolled group, dropouts included, is exactly the defence against counting only the survivors.":
    "脱落者も含めて組み入れ集団全体を報告することこそが、生存者だけを数えてしまうことへの備えです。",

  // ==== Lead-time bias (puzzle #7) ====
  "Screened patients survive five years after diagnosis. Unscreened ones survive two.":
    "検診を受けた患者は診断から5年生存します。受けていない患者は2年です。",
  "The same cancer, growing at the same speed, treated the same way. One person had a scan that found it early. The other went to a doctor years later, when the first symptom appeared. Survival is counted from the day of diagnosis, which is how survival is almost always counted.":
    "同じがんが、同じ速さで進み、同じ治療を受けています。一方の人は画像検査を受けて早くに見つかりました。もう一方は数年後、最初の症状が出てから医師にかかりました。生存期間は診断の日から数えます。生存は、ほとんどの場合この数え方をされています。",
  "Did finding it early give this person more time alive?":
    "早く見つけたことで、この人が生きられる時間は増えたのでしょうか?",
  "One life, two moments of diagnosis": "1つの人生、2つの診断の瞬間",
  years: "年",
  "cancer begins": "がん発生",
  diagnosed: "診断",
  died: "死亡",
  "Survival counted from diagnosis": "診断から数えた生存期間",
  "Found when symptoms appeared": "症状が出てから発見",
  "Found early, by screening": "検診で早期に発見",
  "Yes, three extra years": "はい、3年増えました",
  "five instead of two": "2年ではなく5年",
  "No, not one extra day": "いいえ、1日も増えていません",
  "only the clock moved": "動いたのは時計だけ",
  "Both died on exactly the same day.": "2人はまったく同じ日に亡くなりました。",
  "The clock started earlier, the life did not get longer":
    "時計が早く動き出しただけで、人生は長くなっていない",
  "Screening did not postpone anything. It moved the diagnosis three years earlier, so this person spent three more years knowing they had cancer. Counted from diagnosis that reads as three extra years of survival. Put both lives on the same calendar and they end at the same instant:":
    "検診は何ひとつ先延ばしにしていません。診断を3年早めただけです。そのためこの人は、自分ががんだと知って過ごす年月が3年増えました。診断から数えると、それは3年長く生存したように読めます。2つの人生を同じカレンダーの上に並べれば、どちらもまったく同じ瞬間に終わります。",
  "The extra years": "延びた年数",
  "Lead-time bias": "リードタイムバイアス",
  "Finding a disease earlier stretches survival measured from diagnosis even when it postpones death by not a single day.":
    "病気を早く見つけると、死を1日も先延ばしにしていなくても、診断から測った生存期間は引き伸ばされます。",
  "This does not mean early detection is worthless. It means survival from diagnosis cannot tell you whether it worked. Whenever survival improves after a new test arrives, ask whether people are living longer or simply being told sooner. The measure that cannot be fooled this way is the death rate in the whole population, screened and unscreened alike.":
    "これは、早期発見に価値がないという意味ではありません。診断からの生存期間では、それが効いたのかどうかを判断できない、という意味です。新しい検査が登場したあとに生存期間が改善したときはいつでも、人々が長く生きているのか、それとも単に早く告げられているだけなのかを問いましょう。この手では欺けない指標は、検診を受けた人も受けていない人も含めた、集団全体の死亡率です。",
  "Survival statistics start their clock on the day of diagnosis. That day is not a fact about the disease, it is a fact about when somebody looked. Move the looking earlier and you add time to the front of the measurement while changing nothing at the back. Everyone diagnosed early is guaranteed to clear the five-year mark more often, because they were handed a head start. Two other effects push the same way. A screening programme catches slow-growing disease far more often than fast-growing disease, simply because slow disease sits there longer waiting to be found, and slow disease has a better outlook anyway. And a sensitive enough test finds harmless abnormalities that would never have caused trouble, which are then counted as cured cancers. All three flatter survival without saving anyone. The only honest test is to take a whole population, invite half of it to be screened, and count deaths in everyone from the day of the invitation. Screening programmes that pass that test exist, which is exactly why the test is worth insisting on.":
    "生存の統計は、診断の日に時計を動かし始めます。その日は病気についての事実ではなく、誰かがいつ見に行ったかについての事実です。見に行く時期を早めれば、測定の後ろ側は何も変えないまま、前側に時間が足されます。早く診断された人は誰でも、5年の節目を越える回数が必ず増えます。測定のスタートを前倒しにしてもらったからです。同じ向きに働く効果が、ほかに2つあります。検診は、進行の速い病気よりも進行の遅い病気を、はるかに多く拾い上げます。進行の遅い病気ほど、見つけられるのを待ちながら長くそこに留まっているからです。しかも進行の遅い病気は、そもそも見通しが良いのです。さらに、十分に感度の高い検査は、放っておいても何の害もなかったはずの異常を見つけ出し、それが治ったがんとして数えられます。この3つはいずれも、誰ひとり救わないまま生存率を良く見せます。唯一誠実な検証は、集団全体を対象に、その半分を検診に招き、招いた日から全員の死亡を数えることです。この検証に合格した検診プログラムは実在します。だからこそ、この検証を求め続ける価値があるのです。",
  "Survival rose for every cancer. Deaths did not follow.":
    "どのがんでも生存率は上がった。死亡はそれに追随しなかった。",
  "Between 1950 and 1995, five-year survival improved for all 20 of the most common solid tumours in the United States, by as little as 3 points for pancreatic cancer and as much as 50 for prostate. Over the same years the death rate fell for 12 of those cancers and rose for the other 8. Comparing tumour by tumour, the change in survival was unrelated to the change in mortality, and instead tracked the change in how many cancers were being found.":
    "1950年から1995年にかけて、アメリカで最も多い固形腫瘍20種のすべてで、5年生存率が改善しました。膵臓がんではわずか3ポイント、前立腺がんでは50ポイントもの上昇です。同じ年月のあいだに、死亡率はそのうち12種で下がり、残る8種では上がりました。腫瘍ごとに比べると、生存率の変化は死亡率の変化とは無関係で、代わりに、見つかるがんの数の変化と連動していました。",
  "Screening babies for a childhood tumour": "乳児を小児腫瘍の検診にかける",
  "Two large programmes tested screening infants for neuroblastoma. Quebec screened 476,654 children born over five years, with 92 percent taking part, and deaths from the tumour before the age of eight came to 4.78 per 100,000, no lower than in the comparison populations. Germany compared 1,475,773 screened children with 2,117,600 unscreened ones and found advanced disease in 3.7 against 3.8 per 100,000, and deaths in 1.3 against 1.2. More tumours were found. The same number of children died.":
    "2つの大規模なプログラムが、乳児に対する神経芽腫の検診を検証しました。ケベックでは5年間に生まれた476,654人の子どもを検診し、92パーセントが参加しましたが、8歳になる前にこの腫瘍で亡くなった数は10万人あたり4.78人で、比較対象の集団より低くはありませんでした。ドイツは検診を受けた1,475,773人の子どもと、受けていない2,117,600人を比較し、進行した病変は10万人あたり3.7人対3.8人、死亡は1.3人対1.2人でした。腫瘍はより多く見つかりました。亡くなった子どもの数は同じでした。",
  "What a real benefit looks like": "本物の効果とはどういうものか",
  "Screening is not doomed to be an illusion, it just has to be measured properly. A trial put 46,551 people aged 50 to 80 into three groups: yearly stool testing for hidden blood, testing every two years, or none. Over 13 years, deaths from colorectal cancer came to 5.88 per 1,000 in the yearly group against 8.83 in the unscreened group, a third fewer. That is a count of deaths in everyone invited, not survival from diagnosis, so no head start could have produced it.":
    "検診が幻に終わると決まっているわけではありません。きちんと測りさえすればよいのです。ある試験は、50歳から80歳の46,551人を3つの群に分けました。便潜血検査を毎年受ける群、2年ごとに受ける群、受けない群です。13年間で、大腸がんによる死亡は、毎年受ける群では1,000人あたり5.88人、検診を受けない群では8.83人となり、3分の1少なくなりました。これは招かれた全員の死亡を数えたものであって、診断からの生存期間ではありません。だからスタートの前倒しでは、この差は生み出せなかったはずです。",
  "Lead-time bias, a reasoning trap.": "リードタイムバイアス、推論の罠です。",
  "Survival is counted from the day you are diagnosed. So a test that finds a disease earlier automatically makes survival look longer, even if it changes nothing about when the disease kills you. You simply spend more of your life as a patient. That is why a screening programme can raise five-year survival dramatically while exactly the same number of people die. The number that cannot be gamed is deaths in the whole population, not survival among the diagnosed.":
    "生存期間は、あなたが診断された日から数えられます。だから、病気を早く見つける検査は、その病気がいつあなたの命を奪うかを何ひとつ変えていなくても、自動的に生存期間を長く見せます。あなたはただ、人生のうち患者として過ごす時間が増えるだけです。だからこそ、亡くなる人の数はまったく同じままなのに、検診が5年生存率を劇的に押し上げることがあり得るのです。ごまかしの効かない数字は、診断された人のあいだでの生存期間ではなく、集団全体での死亡数です。",
  "The timeline is a schematic illustration of one life, not measured data. The finding behind it is Welch and colleagues': across the 20 most common solid tumours between 1950 and 1995, five-year survival rose for every one, yet tumour by tumour the change in survival was uncorrelated with the change in mortality (Pearson r = 0.00) and instead tracked the change in incidence (Pearson r = 0.49).":
    "このタイムラインは1つの人生を示す模式図であり、測定されたデータではありません。その背景にある知見はWelchらのものです。1950年から1995年にかけて、最も多い固形腫瘍20種のすべてで5年生存率は上がりましたが、腫瘍ごとに見ると、生存率の変化は死亡率の変化と相関がなく(Pearson r = 0.00)、代わりに罹患率の変化と連動していました(Pearson r = 0.49)。",

  // ---- Trap Hunt test items (lead-time bias) ----
  "A hospital introduces a blood test that picks up a cancer about two years before symptoms would have appeared. Among patients diagnosed there, five-year survival rises from 41% to 68%. The hospital announces that the test is saving lives.":
    "ある病院が、症状が出るよりおよそ2年早くがんを拾い上げる血液検査を導入しました。その病院で診断された患者の5年生存率は、41%から68%へ上がりました。病院は、この検査が命を救っていると発表しました。",
  "Survival is counted from diagnosis, and the diagnosis now happens two years sooner. Everyone gets a two-year head start towards the five-year mark, whether or not the test changed anyone's outcome.":
    "生存期間は診断から数えられ、その診断が2年早くなりました。検査が誰かの結果を変えたかどうかにかかわらず、誰もが5年の節目に向けて、2年分スタートを前倒しにしてもらえます。",
  "A national registry reports that the average time between diagnosis and death for a disease has risen from three years to six since a new scan came into routine use. A minister says patients now live twice as long.":
    "ある国の登録データが、新しい画像検査が日常的に使われるようになって以来、この病気の診断から死亡までの平均期間が3年から6年へ延びたと報告しました。大臣は、患者は今や2倍長く生きていると述べました。",
  "Time from diagnosis to death can double purely because the diagnosis moved earlier. To claim people live longer you have to show that death is arriving later, not that the label is arriving sooner.":
    "診断から死亡までの時間は、診断が早まっただけで2倍になり得ます。人々が長く生きていると主張するには、診断名が早く届いていることではなく、死が遅く訪れていることを示さなければなりません。",
  "A region invites half its residents, chosen at random, to be screened for a disease and leaves the other half uninvited. Ten years on it counts deaths from that disease among everyone in both halves, screened or not, attended or not. Deaths are 30% lower in the invited half.":
    "ある地域が、住民の半分を無作為に選んでこの病気の検診に招き、残る半分は招きませんでした。10年後、検診を受けたかどうか、実際に足を運んだかどうかにかかわらず、両方の半分に属する全員について、この病気による死亡を数えました。死亡は、招かれた側で30%少なくなっていました。",
  "This is the design an earlier diagnosis cannot fool. The clock starts at the invitation rather than at diagnosis, and the count includes everyone invited, so no head start and no extra diagnoses can manufacture the difference.":
    "これは、診断の前倒しでは欺けない設計です。時計は診断ではなく招待の時点から動き始め、数える対象は招かれた全員です。だから、スタートの前倒しでも、診断の上乗せでも、この差を作り出すことはできません。",

  // ---- Tag blurbs (one line each, for the browse screen) ----
  "Anyone can fall for it": "誰でも引っかかる",
  "Bites at the bedside": "ベッドサイドで牙をむく",
  "Study design & evidence appraisal": "研究デザインとエビデンスの吟味",
  "Reading the numbers": "数字を読み解く",
  "Tests & diagnostic reasoning": "検査と診断推論",
  "Screening programmes": "検診プログラム",
  "Populations, exposure & risk": "集団、曝露、リスク",
  "Drugs & drug safety": "薬と薬の安全性",
  "Mind & behaviour": "心と行動",
  "Life & evolution": "生命と進化",
  "Data, computing & AI": "データ、コンピュータ、AI",
  "Markets & incentives": "市場とインセンティブ",
  "Elections & policy": "選挙と政策",
  "Teaching & testing": "教育と試験",
  "Investing & returns": "投資とリターン",
  "Management & strategy": "経営と戦略",
  "Courts & forensics": "法廷と法科学",
  "Performance & records": "成績と記録",
  "The past & how we read it": "過去と、その読み方",
  "News & the numbers in it": "ニュースと、その中の数字",

  // ---- Leftovers: chart short labels, timeline scope tags ----
  A: "A",
  B: "B",
  "From diagnosis": "診断から",
  "The whole life": "人生全体",
};
