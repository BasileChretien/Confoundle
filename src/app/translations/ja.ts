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

  // ==== Spectrum bias (puzzle #8, urine dipstick) ====
  "This urine test catches 92% of infections. Your patient's symptoms are vague. How good is it now?":
    "この尿検査は感染症の92%を捉えます。あなたの患者の症状ははっきりしません。この検査は今どれほど当てになるでしょうか?",
  "A dipstick for urinary infection, checked against urine cultures in an emergency department and a walk-in clinic. Among patients whose doctor already thought an infection was likely, it caught 49 of the 53 who really had one. Sensitivity is normally quoted as a single number, as though it were a fixed property of the test.":
    "尿路感染症を調べる尿試験紙を、救急外来と予約なしで受診できる診療所で、尿培養と照らし合わせて検証しました。担当医がすでに感染症の可能性は高いと考えていた患者では、本当に感染していた53人のうち49人を捉えました。感度はふつう1つの数字として示され、まるで検査に固有の変わらない性質であるかのように扱われます。",
  "In patients the doctor thinks are unlikely to be infected, how often does it catch a real infection?":
    "医師が感染の可能性は低いと考えている患者では、本当の感染をどのくらいの割合で捉えるでしょうか?",
  "Times the dipstick was right": "尿試験紙が正しかった割合",
  "Doctor thought infection likely": "医師が感染を疑った",
  Likely: "疑いあり",
  "Doctor thought infection unlikely": "医師が感染を疑わなかった",
  Unlikely: "疑いなし",
  "Patients who really had an infection": "本当に感染していた患者",
  "Patients who did not": "感染していなかった患者",
  "The quoted figure": "引用される数字",
  "About the same, 92%": "ほぼ同じ、92%",
  "the test has not changed": "検査は変わっていない",
  "A little lower, around 80%": "少し下がって、約80%",
  "some drop off": "多少は落ちる",
  "Barely half, 56%": "かろうじて半分、56%",
  "it misses most of them": "大半を見逃す",
  "Barely half. And the other column flips the other way.":
    "かろうじて半分。しかも、もう一方の列は逆向きに動きます。",
  "The patients changed, not the test":
    "変わったのは患者であって、検査ではない",
  "Patients their doctor already suspected had florid infections, the kind a dipstick spots easily. Patients thought unlikely to be infected had mild or early ones, and the test missed most of them. Now look at the second panel, the patients who had no infection at all: there the test was right 42% of the time in the first group and 78% in the second. Sensitivity and specificity are not properties of a test. They are properties of a test meeting a particular mix of people:":
    "担当医がすでに疑っていた患者は、感染がはっきりと現れていました。尿試験紙が難なく見つけられる類のものです。感染の可能性は低いと考えられていた患者は、軽症または早期の感染で、検査はその大半を見逃しました。ここで2枚目のパネル、まったく感染していなかった患者を見てください。そこで検査が正しかった割合は、1つめの群で42%、2つめの群で78%でした。感度と特異度は、検査に固有の性質ではありません。それは、ある特定の顔ぶれの人々と出会った検査の性質なのです。",
  "Both groups": "両方の群",
  "The spectrum": "スペクトラム",
  "How many in each group really had an infection":
    "各群で本当に感染していた人の割合",
  "Spectrum bias": "スペクトラムバイアス",
  "A test's accuracy is not fixed. It moves with how advanced, how typical and how obvious the disease is in the patients being tested.":
    "検査の精度は決まった値ではありません。検査を受ける患者の病気がどれだけ進んでいるか、どれだけ典型的か、どれだけはっきりしているかによって動きます。",
  "Before trusting a quoted sensitivity, ask who it was measured on. A figure from patients with unmistakable disease will flatter the test in a clinic full of milder cases, and a study that recruits only textbook cases and healthy volunteers will flatter it most of all.":
    "示された感度を信じる前に、それが誰を対象に測られたのかを問いましょう。誰が見ても病気とわかる患者から得られた数字は、より軽い症例ばかりの診療所では検査を実際より良く見せます。そして、教科書どおりの症例と健康なボランティアだけを集めた研究は、最も良く見せてしまいます。",
  "Sensitivity is the share of truly ill people a test catches, and specificity is the share of healthy people it correctly clears. Both are quoted as though they belonged to the test, like its price. They do not. A test picks up a signal, and the signal is stronger in advanced disease than in early disease, so the sicker the ill people you test, the more of them it finds. The same logic runs the other way for the people without the disease: the more clearly healthy they are, the more easily the test clears them. That is why a test evaluated on obvious cases against obvious non-cases can look superb and then disappoint in a real clinic, where nearly everyone is somewhere in between. Two practical habits follow. Read the description of who was recruited before you read the accuracy figures. And be most suspicious of a study whose diseased and healthy groups were picked separately rather than being consecutive patients with the same presenting problem.":
    "感度とは、本当に病気である人のうち検査が捉える割合であり、特異度とは、健康な人のうち検査が正しく陰性と判定する割合です。どちらも、値段のように検査そのものに備わっているかのように語られます。しかし、そうではありません。検査はある信号を拾い上げますが、その信号は早期の病気より進行した病気のほうが強く出ます。だから、検査にかける病人が重いほど、検査はその多くを見つけ出します。病気でない人については、同じ理屈が逆向きに働きます。はっきり健康であるほど、検査はたやすくその人を陰性と判定します。だからこそ、明らかな症例と明らかな非症例を突き合わせて評価された検査は見事に映り、そのあと、ほぼ全員がその中間のどこかにいる現実の診療所で期待を裏切るのです。ここから実践的な習慣が2つ導かれます。精度の数字を読む前に、誰が集められたのかという記述を読むこと。そして、同じ主訴で連続して受診した患者ではなく、病気の群と健康な群を別々に選び出した研究を、最も強く疑うことです。",
  "The same test, sorted a different way": "同じ検査を、別のやり方で分けてみる",
  "The same study split its patients again, this time by how many white cells were visible in the urine under a microscope. Where none were visible the dipstick caught 5 of the 10 real infections. Where a few were visible it caught 15 of 22. Where there were many it caught all 34 of 34. One test, one afternoon's samples, and a sensitivity anywhere from 50 to 100 percent depending only on which patients you counted.":
    "同じ研究は、患者をもう一度分け直しました。今度は、顕微鏡で尿を見たときに白血球がどれだけ見えるかによってです。まったく見えない患者では、尿試験紙は本当の感染10件のうち5件を捉えました。少し見える患者では22件のうち15件、多く見える患者では34件のうち34件すべてを捉えました。検査は1つ、検体はある日の午後に集めた分。それなのに感度は、どの患者を数えたかだけで50から100パーセントまでのどこにでもなり得たのです。",
  "Why promising tests keep disappointing":
    "有望な検査が期待を裏切り続ける理由",
  "The problem was named in 1978, after a pattern of new tests arriving with excellent published accuracy and then underwhelming the doctors who used them. Two of the era's examples were the carcinoembryonic antigen test and the nitro-blue tetrazolium test. The authors traced the letdown to two things: accuracy measured on a patient mix far narrower than real practice, and the test result and the true diagnosis not being judged independently of each other.":
    "この問題は1978年に名前を与えられました。すぐれた精度が公表された新しい検査が次々と登場しては、実際に使った医師を失望させる、という繰り返しを受けてのことです。当時の例としては、癌胎児性抗原の検査とニトロブルーテトラゾリウム試験の2つがありました。著者らは、この期待外れの原因を2つに突き止めました。実際の診療よりはるかに狭い患者構成で精度が測られていたこと、そして検査の結果と本当の診断が互いに独立に判定されていなかったことです。",
  "Spectrum bias, a reasoning trap.": "スペクトラムバイアス、推論の罠です。",
  "Test accuracy sounds like a fact about the test, the way a car has a top speed. It is not. A test that catches 92% of infections in people who are obviously ill can catch barely half in people who are only slightly ill, because there is less to find. Whenever you are told a test is 95% accurate, the real question is who they measured that on, and whether those people look anything like you.":
    "検査の精度は、車に最高速度があるのと同じように、検査そのものについての事実であるかのように聞こえます。しかし、そうではありません。誰が見ても病気とわかる人で感染の92%を捉える検査でも、ごく軽い人ではかろうじて半分しか捉えられないことがあります。見つけるべきものが少ないからです。この検査は95%の精度がある、と言われたときに本当に問うべきなのは、それを誰で測ったのか、そしてその人たちがあなたに少しでも似ているのか、ということです。",
  "The counts are Table 3, page 137: 49 of 53 and 21 of 50 in the high prior-probability group, 10 of 18 and 188 of 241 in the low one. A positive dipstick meant leukocyte esterase or nitrite or both; a positive culture meant more than 100,000 colonies per millilitre. The correction notes that the high prior-probability group holds 103 patients, not the 107 still printed in the abstract, and that the rates were computed on 103 and stand. The printed abstract also gives the 0.56 confidence interval as 0.03 to 0.79; the paper's own table gives 0.31 to 0.79.":
    "この数値は表3、137ページのものです。事前確率が高い群では53人中49人と50人中21人、低い群では18人中10人と241人中188人です。尿試験紙の陽性とは、白血球エステラーゼか亜硝酸塩、またはその両方が陽性であることを指し、尿培養の陽性とは1ミリリットルあたり100,000コロニーを超えることを指します。訂正記事は、事前確率が高い群が、抄録にいまだ印刷されている107人ではなく103人であること、そして各割合はすでに103人をもとに計算されており、そのまま有効であることを記しています。印刷された抄録は0.56の信頼区間を0.03から0.79としていますが、論文本体の表では0.31から0.79となっています。",

  // ==== Berkson's bias (puzzle #9, hospital sample) ====
  "Among hospital patients, lung trouble and joint trouble go together. Are the two diseases linked?":
    "入院患者のあいだでは、肺の不調と関節の不調が一緒に現れます。この2つの病気には関連があるのでしょうか?",
  "A survey knocked on doors and asked thousands of ordinary people what illnesses they had. Among those who had been in hospital in the previous six months, a quarter of the people with a respiratory disease also had a disease of the bones or joints, against well under a tenth of everyone else.":
    "ある調査が一軒ずつ家を訪ね、数千人のふつうの人々に、どんな病気を持っているかを尋ねました。直前の6か月間に入院したことがある人のうち、呼吸器疾患を持つ人の4分の1が骨関節疾患も併せ持っていたのに対し、それ以外の人ではその割合は10分の1をかなり下回っていました。",
  "Are these two diseases actually related?":
    "この2つの病気は、実際に関連しているのでしょうか?",
  "Also had a bone or joint disease": "骨関節疾患も併せ持っていた割合",
  "Had a respiratory disease": "呼吸器疾患があった",
  Lungs: "呼吸器あり",
  "No respiratory disease": "呼吸器疾患がなかった",
  "No lungs": "呼吸器なし",
  "In hospital in the last 6 months": "直近6か月に入院した人",
  "Everyone the survey asked": "調査が尋ねた全員",
  "Hospital patients": "入院患者",
  "Yes, one brings on the other": "はい、一方がもう一方を引き起こします",
  "three times as common": "3倍も多い",
  "Yes, but the other way round": "はい、ただし向きは逆です",
  "the joint disease comes first": "関節の病気が先に来る",
  "No, the hospital made the link": "いいえ、関連を作ったのは病院です",
  "it is about who gets admitted": "問題は誰が入院するかだ",
  "Ask everyone, and the link disappears.": "全員に尋ねると、関連は消えます。",
  "Two illnesses are two chances to be admitted":
    "病気が2つあれば、入院する機会も2つある",
  "Hospital and community": "病院と地域",
  "The filter": "ふるい",
  "Berkson's bias": "バークソンバイアス",
  "Studying only the people who made it through a filter can invent a relationship that does not exist outside it.":
    "ふるいを通り抜けた人だけを調べると、その外には存在しない関連を作り出してしまうことがあります。",
  "Hospitals are the obvious filter, and the reason case-control studies built on hospital patients are treated warily. But any selected group does it: people who answered the survey, users who stayed subscribed, applicants who got an interview. Ask what it took to get into the sample, and whether both things you are comparing help you get in.":
    "病院は最もわかりやすいふるいであり、入院患者をもとに組み立てられた症例対照研究が慎重に扱われるのも、そのためです。しかし、選び出された集団であれば何でも同じことをします。調査に回答した人、契約を続けた利用者、面接に呼ばれた応募者などです。その標本に入るには何が必要だったのか、そして比べようとしている2つのものが、どちらも標本に入る助けになっていないかを問いましょう。",
  "Suppose two illnesses are entirely unrelated, and either one on its own gives you some chance of being admitted to hospital. Someone unlucky enough to have both has two shots at admission, so they are much likelier to be in the ward than someone with only one. Now stand inside the ward and count. The people with the first illness are heavily enriched for also having the second, because that is what got many of them in. You have not discovered a link between the diseases. You have rediscovered the admission rule, and dressed it up as biology. The general shape of this is a collider: a thing that two causes both point into. Selecting on it, whether by studying only the admitted, only the tested, or only the successful, links the causes together in your data even when nothing links them in the world. The defence is a sample defined before the filter, which is exactly why population surveys and whole-population registries are worth their cost.":
    "2つの病気がまったく無関係で、そのどちらか一方だけでも入院する可能性がいくらか生じるとしましょう。運悪く両方を持つ人には、入院の機会が2つあります。だからその人は、片方だけの人よりもはるかに病棟にいる可能性が高くなります。ここで病棟の中に立って数えてみてください。1つめの病気を持つ人は、2つめの病気も併せ持つ割合が大きく偏って高くなっています。まさにそれが、多くの人を病棟に入れた理由だからです。あなたは病気どうしの関連を発見したのではありません。入院の決まりを発見し直し、それを生物学の装いで包んだだけなのです。これを一般化した形が合流点(コライダー)です。2つの原因がともに矢印を向けている先にあるもののことです。合流点で選抜すること、つまり入院した人だけ、検査を受けた人だけ、成功した人だけを調べることは、現実には何ひとつ結び付いていない原因どうしを、あなたのデータの中で結び付けてしまいます。備えとなるのは、ふるいにかけられる前の段階で定義された標本です。人口を対象とする調査や全人口の登録データが、その費用に見合う価値を持つのは、まさにそのためです。",
  "The bias that was theory for thirty years":
    "30年ものあいだ理論にとどまっていたバイアス",
  "Joseph Berkson warned in 1946 that hospital-based comparisons could manufacture associations, but his argument was mathematical and his numbers were invented to illustrate it. He noted that the same artefact would appear if you sampled shuffled cards rather than patients. It took until this survey, three decades later, for anyone to demonstrate the effect in real people.":
    "Joseph Berksonは1946年、病院を基盤とした比較が関連を作り出しうると警告しました。しかし、その議論は数学的なもので、示された数字も説明のために作られたものでした。彼は、患者ではなく切り混ぜたトランプを標本にしても、同じみせかけの関連が現れると指摘しています。この効果を実際の人間で示す者が現れるまでには、それから30年後のこの調査を待たねばなりませんでした。",
  "Why early covid studies disagreed": "初期の新型コロナ研究が食い違った理由",
  "In 2020, studies of who caught covid and who fell severely ill could only recruit from people who had been tested or admitted, and early on those were mostly hospital staff, the already unwell and the elderly. Getting into the sample depended on the very things being studied. Analyses showed this alone could produce apparent risk factors, and even reverse the direction of a real one, without any biology behind it.":
    "2020年、誰が新型コロナに感染し、誰が重症化したのかを調べる研究は、検査を受けた人か入院した人からしか対象を集められませんでした。そして初期には、その大半が病院の職員、すでに体調を崩していた人、高齢者でした。標本に入れるかどうかが、まさに研究しようとしている当のものに左右されていたのです。解析によれば、これだけで、背後に生物学的な理由が何もないまま、見かけ上のリスク因子が生まれ、本物のリスク因子の向きさえ逆転しうることが示されました。",
  "Berkson's bias, a reasoning trap.": "バークソンバイアス、推論の罠です。",
  "Look only at hospital patients and two completely unrelated illnesses can appear to travel together. The reason is not biology, it is the door. Either illness can get you admitted, so people who happen to have both are over-represented inside, and from in there the two look linked. Any filtered group does this: the people who got tested, the applicants who got an interview, the customers who stayed. Before believing a pattern, ask what it took to get into the data.":
    "入院患者だけを見ていると、まったく無関係な2つの病気が、連れ立って動いているように見えることがあります。理由は生物学ではなく、入口です。どちらの病気でも入院しうるので、たまたま両方を持つ人が院内では実際より多く現れ、その中から見ると2つは関連しているように見えます。ふるいにかけられた集団なら何でも同じことをします。検査を受けた人、面接に呼ばれた応募者、契約を続けた顧客などです。あるパターンを信じる前に、そのデータに入るには何が必要だったのかを問いましょう。",
  "The counts are Table 2: household interviews with 2,784 people, of whom 257 had been in hospital in the previous six months. The table's own relative odds are 1.06 in the general population and 4.06 among the hospitalised. The hospital figures rest on only 20 people with a respiratory disease, so this single table demonstrates the mechanism rather than measuring its size precisely.":
    "この数値は表2のものです。2,784人への家庭訪問による聞き取り調査で、そのうち257人が直前の6か月間に入院していました。表に示された相対オッズは、一般集団で1.06、入院した人で4.06です。入院に関する数値は、呼吸器疾患を持つわずか20人に基づいています。したがってこの1つの表は、仕組みの大きさを正確に測るというより、その仕組みが実在することを示すものです。",

  // ---- Trap Hunt test items (spectrum bias, Berkson's bias) ----
  "A rapid test is validated on patients admitted to hospital with severe disease and on healthy blood donors. It separates the two groups almost perfectly, and the maker reports 98% sensitivity. It is then sold to family doctors for patients with a mild cough.":
    "ある迅速検査が、重症で入院した患者と、健康な献血者を対象に検証されました。この検査は2つの群をほぼ完璧に区別し、製造元は感度98%と報告しています。その後この検査は、軽いせきの患者に使うものとして家庭医に販売されました。",
  "Telling the obviously ill from the obviously well is the easiest task there is. A family doctor's patients are all somewhere in between, and that is precisely where the test has never been measured.":
    "明らかに病気の人と明らかに健康な人を見分けるのは、最もやさしい仕事です。家庭医の患者はみな、その中間のどこかにいます。そして、まさにその領域でこの検査は一度も測られていないのです。",
  "A textbook lists a scan as 90% sensitive. A clinic that sees mostly early, mild cases adopts it and finds it misses about a third of the cases later confirmed by specialists. The clinic concludes its machine must be faulty.":
    "ある教科書が、この画像検査の感度は90%だと記載しています。早期で軽い症例を主に診ている診療所がこれを導入したところ、後に専門医が確定した症例のおよそ3分の1を見逃していることがわかりました。診療所は、自院の装置が故障しているに違いないと結論づけました。",
  "A quoted sensitivity comes attached to the patients it was measured on. Earlier and milder disease gives a test less to find, so a lower catch rate is what you should expect, not evidence of a broken machine.":
    "示された感度は、それが測られた患者と切り離せません。より早期で、より軽い病気は、検査が見つけるべきものが少ないということです。だから捉える割合が下がるのは当然予想されることであって、装置の故障を示す証拠ではありません。",
  "A study of one hospital's inpatients finds that those with a metabolic disease are far more likely to also have a gallbladder disease than the other inpatients. The authors conclude that the first disease brings on the second.":
    "ある病院の入院患者を対象とした研究で、代謝疾患のある患者は、それ以外の入院患者に比べて胆嚢疾患も併せ持つ可能性がはるかに高いことがわかりました。著者らは、前者の病気が後者を引き起こすと結論づけました。",
  "Either illness on its own can put someone in a hospital bed, so patients with both are over-represented among inpatients. The link may exist only inside the building.":
    "どちらの病気も、それ単独で人を病院のベッドに送り込むことがあります。そのため両方を持つ患者は、入院患者のあいだで実際より多く現れます。この関連は、その建物の中にしか存在しないのかもしれません。",
  "Someone notices that among the people they have dated, the better looking ones were consistently less pleasant company. They conclude that good looks spoil the character.":
    "ある人が、これまで交際した相手を振り返り、見た目が良い人ほど決まって一緒にいて楽しくなかったことに気づきました。そしてこの人は、美貌は人柄を損なうと結論づけました。",
  "People generally agree to a date because someone is good looking or because they are pleasant company. Selecting on that forces a trade-off between the two inside the sample, whatever the relationship is outside it.":
    "人がデートに応じるのは、たいてい相手の見た目が良いからか、一緒にいて楽しいからです。そこで選抜が起こると、標本の外での関係がどうであれ、標本の中ではこの2つのあいだに必ず二律背反が生まれます。",
  "A diagnostic test is evaluated on every consecutive patient arriving at a clinic with the same presenting complaint, whatever their eventual diagnosis, and the paper reports its accuracy separately for mild and for advanced disease. Another clinic with a similar caseload adopts the figures.":
    "ある診断検査が、同じ主訴で診療所を訪れた連続する全患者を対象に、最終的な診断が何であれ評価され、論文は軽症の場合と進行例の場合とで精度を分けて報告しています。似た患者構成を持つ別の診療所が、この数値を採用しました。",
  "This is how a diagnostic study should be built. Consecutive patients with one presenting problem, and accuracy broken down by severity, so a reader can find the subgroup that actually resembles their own patients.":
    "これは、診断研究のあるべき組み立て方です。1つの主訴で連続して受診した患者を対象とし、精度を重症度別に分けて示しています。そうすれば読者は、自分の患者に実際に似たサブグループを見つけられます。",
  "A company asks whether two things about its users go together. It samples at random from everyone who ever opened an account, including those who never came back and those who cancelled, and finds no relationship between them.":
    "ある企業が、利用者に関する2つの事柄が一緒に現れるかどうかを調べました。二度と戻らなかった人も解約した人も含め、これまでに口座を開設したすべての人から無作為に標本を取ったところ、2つのあいだに関係は見られませんでした。",
  "The sample was drawn before any filter that either of the two things could have influenced. Nothing about staying, succeeding or being admitted decided who got counted, so a selection artefact cannot be hiding in it.":
    "この標本は、2つの事柄のどちらかが影響を及ぼしえたどんなふるいよりも前の段階で取られています。誰が数に入るかは、残ったかどうか、成功したかどうか、入院したかどうかでは決まっていません。したがって、選択バイアスによるみせかけの関連が、ここに潜んでいることはあり得ません。",

  // ==== Relative versus absolute risk (puzzle #10, statin trial) ====
  "A drug cuts your risk of a heart attack by about a third. How many people does that help?":
    "ある薬が心筋梗塞のリスクを約3分の1減らします。それで救われるのは何人でしょうか?",
  "A trial gave 6,595 middle-aged men with high cholesterol and no history of heart trouble either a statin or a dummy pill, and followed them for about five years. The drug cut heart attacks and coronary deaths by roughly a third. That is a real result, and it is how the finding was reported.":
    "ある試験は、コレステロール値が高く心臓病の既往のない中年男性6,595人を、スタチンか偽薬のどちらかに割り付け、約5年間追跡しました。この薬は心筋梗塞と冠動脈疾患による死亡を、およそ3分の1減らしました。これは本物の結果であり、実際にこう報じられました。",
  "Out of 1,000 men who took it for five years, how many were spared a heart attack or a coronary death?":
    "この薬を5年間飲んだ男性1,000人のうち、心筋梗塞や冠動脈疾患による死亡を免れたのは何人でしょうか?",
  "A five-year statin trial in 6,595 men": "男性6,595人を対象とした5年間のスタチン試験",
  "Heart attack or death from heart disease": "心筋梗塞または心臓病による死亡",
  "Dummy pill": "偽薬",
  Statin: "スタチン",
  "of the risk removed": "取り除かれたリスクの割合",
  "spared, in every 1,000 men treated for five years":
    "5年間治療した男性1,000人あたり、免れた人数",
  "men treated for five years to spare one": "1人を救うために5年間治療が必要な男性の数",
  "About 300": "約300人",
  "roughly a third of them": "そのおよそ3分の1",
  "About 100": "約100人",
  "one in ten": "10人に1人",
  "About 23": "約23人",
  "roughly 1 in 44": "おおよそ44人に1人",
  "Twenty three men in a thousand.": "1,000人のうち23人です。",
  "A third of a risk that was small to begin with": "もともと小さかったリスクの3分の1",
  "Both numbers come from the same trial. Without the drug, about 75 men in 1,000 had a heart attack or died of heart disease over the five years. With it, about 53 did. That is a third of the risk gone, and it is also 23 men in 1,000. The first number is divided by the risk, the second by the people, which is the whole reason they feel so different. Put the other way round, 44 men had to take the drug for five years for one of them to be spared:":
    "どちらの数字も同じ試験から出ています。薬を飲まない場合、5年間で心筋梗塞を起こすか心臓病で亡くなった人は、男性1,000人あたり約75人でした。薬を飲んだ場合は約53人です。これはリスクの3分の1が消えたということであり、同時に1,000人あたり23人ということでもあります。1つめの数字はリスクで割ったもの、2つめは人の数で割ったものです。2つがこれほど違って感じられる理由は、まさにそこにあります。逆から言えば、1人が免れるために、44人が5年間その薬を飲まなければならなかったということです。",
  "A third of what?": "3分の1とは、何の3分の1か?",
  "Relative versus absolute risk": "相対リスクと絶対リスク",
  "A percentage reduction tells you what share of a risk went away. It cannot tell you how big that risk was, and that is the part that decides whether it matters to you.":
    "パーセントで示された減少は、リスクのうちどれだけの割合が消えたかを教えてくれます。しかし、そのリスクがどれほど大きかったかは教えてくれません。そして、それがあなたにとって意味を持つかどうかを決めるのは、まさにその部分なのです。",
  "Whenever you meet a percentage change, ask what it is a percentage of. Halving a one-in-a-million risk and halving a one-in-two risk make the same headline and mean completely different things. The two figures worth asking for are the difference in plain numbers of people, and how many have to be treated for one of them to benefit.":
    "パーセントで表された変化に出会ったときはいつでも、それが何に対するパーセントなのかを問いましょう。100万分の1のリスクを半分にすることと、2分の1のリスクを半分にすることは、同じ見出しになりますが、意味はまったく違います。求める価値のある数字は2つです。人の数そのもので表した差と、1人が恩恵を受けるために何人を治療しなければならないか、です。",
  "Take a risk of 8 in 100 and drop it to 5 in 100. Divide the drop by the risk and you get a third, which sounds like a lot. Divide the same drop by the people and you get 3 in 100, which sounds like very little. Neither is wrong. They answer different questions: what fraction of the danger was removed, and what are the odds this helps me. Only the second one is about you. The gap between them grows as the risk shrinks, which is why the most impressive relative figures usually come from the rarest outcomes. This is not only a media problem. Relative figures make treatments look better to doctors too, and the same trial result draws more enthusiasm when it is described relatively than when it is described in whole people. It also cuts the other way with harms: a scare expressed as a doubling of risk sounds alarming whether the risk went from 1 in 10 to 2 in 10 or from 1 in 100,000 to 2 in 100,000. The habit that protects you in both directions is to insist on the numbers out of a fixed group of people, and on how many have to be treated, or exposed, for one to be affected.":
    "100人に8人というリスクを、100人に5人まで下げたとしましょう。その下がり幅をリスクで割れば3分の1となり、大きく聞こえます。同じ下がり幅を人の数で割れば100人あたり3人となり、ごくわずかに聞こえます。どちらも間違いではありません。両者は別々の問いに答えています。危険のうちどれだけの割合が取り除かれたのか、そして、これが自分の役に立つ見込みはどのくらいか、です。あなた自身に関わるのは2つめだけです。両者の開きはリスクが小さくなるほど大きくなります。だからこそ、最も見栄えのする相対的な数字は、たいてい最もまれな結果から生まれるのです。これはメディアだけの問題ではありません。相対的な数字は、医師に対しても治療をよく見せます。同じ試験の結果でも、人の数そのもので説明されたときより、相対的に説明されたときのほうが強い期待を集めます。害についても、同じことが逆向きに起こります。リスクが2倍になったという形で語られる警告は、リスクが10人に1人から10人に2人へ動いたときも、100,000人に1人から100,000人に2人へ動いたときも、同じように不安をかき立てます。どちらの向きからもあなたを守る習慣は、決まった人数の集団あたりの数字と、1人に影響が及ぶまでに何人を治療、あるいは曝露しなければならないかを、必ず求めることです。",
  "The same kind of drug, in people at real risk": "同じ種類の薬を、本当にリスクの高い人に使うと",
  "A second trial gave a statin to patients who had already had a heart attack or had angina. Major coronary events fell from 28 percent to 19 percent. As a relative figure that is about a third, almost the same headline as in the healthy men. But because the risk it was cutting into was nearly four times larger, the gain was about 9 patients in every 100 instead of 2. The identical headline, several times the benefit. This is why a percentage on its own cannot tell you whether a drug is worth taking, and why the answer differs from patient to patient.":
    "2つめの試験は、すでに心筋梗塞を起こした患者や狭心症のある患者にスタチンを投与しました。主要な冠動脈イベントは28パーセントから19パーセントへ減りました。相対的な数字にすればおよそ3分の1で、健康な男性のときとほとんど同じ見出しです。しかし、削り込む相手のリスクが4倍近く大きかったため、得られた効果は100人あたり2人ではなく約9人でした。見出しは同じで、効果は数倍です。だからこそ、パーセントだけでは、その薬を飲む価値があるかどうかは判断できません。そして、その答えが患者ごとに違ってくるのも、そのためです。",
  "When a relative figure did real damage": "相対的な数字が本当に害をもたらしたとき",
  "In October 1995 a British safety committee warned that some contraceptive pills carried about twice the risk of a blood clot. The warning travelled as a doubling, with no sense of how small the risk was either way, and women stopped taking the pill. Among girls under 16, use fell from 40 percent to 27 percent within a year. The health service met roughly 21 million pounds in extra maternity costs and 46 million pounds in abortion provision. A relative figure with no absolute figure beside it is not a neutral way to describe a risk.":
    "1995年10月、英国のある安全性委員会が、一部の経口避妊薬は血栓のリスクが約2倍になると警告しました。この警告は「2倍」という形だけで広まり、どちらにせよそのリスクがどれほど小さいのかは伝わらないまま、女性たちは服用をやめました。16歳未満の少女では、1年のうちに使用率が40パーセントから27パーセントへ下がりました。公的医療サービスは、出産に伴う追加費用としておよそ2,100万ポンド、人工妊娠中絶の提供に4,600万ポンドを負担しました。絶対的な数字を添えない相対的な数字は、リスクを中立に伝える言い方ではありません。",
  "The fix is in the wording": "処方箋は言い回しにある",
  "Describe the same result in whole people, so many out of 1,000 against so many out of 1,000, and both patients and doctors judge it far more accurately than when it arrives as a percentage reduction. Relative risks belong to a small family of formats that reliably confuse, alongside single-event probabilities and conditional ones like a test's sensitivity. None of them is wrong. They are just easy to misread, and there is a clearer way to say the same thing.":
    "同じ結果を人の数そのもので、1,000人あたり何人に対して1,000人あたり何人、という形で説明すると、患者も医師も、パーセントの減少として示されたときよりはるかに正確に判断できます。相対リスクは、決まって人を混乱させる少数の表示形式の一族に属していて、そこには単一の出来事の確率や、検査の感度のような条件付きの確率も並んでいます。どれも間違いではありません。ただ読み違えやすいだけであり、同じことをもっと明確に言う方法があるのです。",
  "Relative versus absolute risk, a reasoning trap.": "相対リスクと絶対リスク、推論の罠です。",
  "\"Cuts your risk by a third\" sounds enormous. But a third of what? If the risk was 75 in 1,000, a third of it is 23 people. If the risk was 3 in 1,000, a third of it is one. The percentage tells you how much of the risk went away and says nothing at all about how much risk there was, which is the part that decides whether it matters to you. Ask for the plain numbers: how many out of 1,000, and how many people have to take it for one of them to benefit.":
    "「リスクを3分の1減らす」と聞くと、とてつもなく大きく響きます。しかし、何の3分の1なのでしょうか。リスクが1,000人に75人だったなら、その3分の1は23人です。リスクが1,000人に3人だったなら、その3分の1は1人です。パーセントは、リスクのうちどれだけが消えたかを教えるだけで、そもそもリスクがどれだけあったのかについては何も語りません。そして、それがあなたにとって意味を持つかどうかを決めるのは、その部分なのです。人の数そのものを求めましょう。1,000人のうち何人か、そして1人が恩恵を受けるために何人が飲まなければならないか、です。",
  "The counts are the trial's primary endpoint, a definite nonfatal heart attack or death from coronary heart disease: 248 events among the men on placebo and 174 among those on pravastatin, over an average of 4.9 years. The paper reports a 31 percent relative risk reduction, estimated from a proportional-hazards model; the crude counts give 30 percent. Every figure this puzzle shows is derived from the counts, so it quotes about a third rather than a number the chart would contradict.":
    "この数値は、試験の主要エンドポイントである、確定した非致死性の心筋梗塞または冠動脈疾患による死亡の件数です。平均4.9年の追跡で、プラセボを飲んだ男性では248件、プラバスタチンを飲んだ男性では174件でした。論文は、比例ハザードモデルから推定した31パーセントの相対リスク減少を報告しており、単純な件数から計算すると30パーセントになります。このパズルが示す数字はすべてこの件数から導いているため、グラフと食い違う数字を挙げるのではなく、およそ3分の1という言い方をしています。",

  // ---- Trap Hunt test items (relative versus absolute risk) ----
  "A press release says a new drug halves the risk of a rare complication. It does not say how common the complication is. A newspaper runs the story under the headline that the drug halves the danger.":
    "あるプレスリリースが、新しい薬はまれな合併症のリスクを半分にすると伝えています。その合併症がどのくらいありふれているかは書かれていません。新聞は、この薬が危険を半分にするという見出しでこの話を報じました。",
  "Halving a risk means nothing until you know the risk. If the complication strikes 2 people in 10,000, halving it spares one of them.":
    "リスクを半分にすると言われても、そのリスクの大きさを知るまでは意味がありません。その合併症が10,000人のうち2人に起こるのなら、半分にして免れるのは1人です。",
  "A supplement is advertised as cutting the chance of a particular cancer by 40%. The trial it rests on found 7 cases among about 1,000 people taking the supplement and 12 among about 1,000 taking a dummy.":
    "あるサプリメントが、特定のがんにかかる可能性を40%減らすとうたわれています。その根拠となった試験では、サプリメントを飲んだ約1,000人のうち7人、偽薬を飲んだ約1,000人のうち12人に、がんが見つかりました。",
  "The 40% is arithmetically right and it amounts to 5 people in 1,000. Around 200 people would have to take the supplement for years for one of them to avoid a cancer.":
    "40%という計算そのものは正しく、それは1,000人あたり5人にあたります。1人ががんを免れるためには、約200人が何年もそのサプリメントを飲み続けなければならない計算です。",
  "A trial reports that the treatment reduced strokes from 12 in every 100 patients to 8 in every 100, calls that a reduction of a third, and adds that about 25 patients need to be treated for five years to prevent one stroke.":
    "ある試験が、この治療によって脳卒中が患者100人あたり12人から100人あたり8人へ減ったと報告し、それを3分の1の減少と呼び、さらに、脳卒中を1件防ぐには約25人を5年間治療する必要があると付け加えています。",
  "The relative figure, the plain numbers of people and the number needed to treat are all on the table, so nothing is hidden behind the percentage. This is how a result should be reported.":
    "相対的な数字も、人の数そのものも、治療必要数(NNT)も、すべて示されています。だからパーセントの陰に隠れているものは何もありません。結果はこのように報告されるべきです。",

  // ---- Risk-view scope tags ----
  "Compared to the risk": "リスクとの比較",
  "Compared to the people": "人の数との比較",

  // ---- Correction: Berkson's bias reveal (supersedes the wording above) ----
  "The same survey, the same people, the same two diseases. Across everyone it asked, people with a respiratory disease were barely any likelier to have a bone or joint disease than people without one, and the odds come out at 1.06 against 1, which is nothing. The hospital panel is not a finding about disease, it is a finding about admission. Either illness can put you in a hospital bed, so people with both turn up there far more often than people with one, and inside those walls the two look inseparable:":
    "同じ調査、同じ人々、同じ2つの病気です。尋ねた全員を通して見ると、呼吸器疾患がある人が骨関節疾患も併せ持つ可能性は、呼吸器疾患がない人とほとんど変わりませんでした。オッズにすると1に対して1.06で、差はないに等しい値です。入院患者のパネルは、病気についての知見ではなく、入院についての知見なのです。どちらの病気も、人を病院のベッドに送り込むことがあります。だから両方を持つ人は、片方だけの人よりもはるかに多くそこに現れ、その壁の内側では、2つの病気は切り離せないものに見えるのです。",

  // ==== Confounding by indication (puzzle #11, DIG trial) ====
  "Patients taking this heart drug died more often than patients not taking it. Is the drug killing them?":
    "この心臓の薬を飲んでいる患者は、飲んでいない患者より多く亡くなっていました。この薬が患者の命を奪っているのでしょうか?",
  "6,800 people with heart failure. When they joined the trial, some were already on digoxin because a doctor had decided to prescribe it, and some were not. Over the following years, 40 percent of those already on it died, against 31 percent of the others.":
    "心不全の患者6,800人。試験に参加した時点で、医師が処方すると判断したためにすでにジゴキシンを飲んでいた人もいれば、飲んでいなかった人もいました。その後の数年間で、すでに飲んでいた人の40パーセントが亡くなったのに対し、それ以外の人では31パーセントでした。",
  "Is digoxin causing those extra deaths?":
    "この過剰な死亡を引き起こしているのは、ジゴキシンなのでしょうか?",
  "Died during the trial": "試験中に死亡した割合",
  "On digoxin": "ジゴキシンを飲んでいた",
  Digoxin: "ジゴキシン",
  "Not on digoxin": "ジゴキシンを飲んでいなかった",
  "Not on it": "飲んでいなかった",
  "Sorted by what doctors prescribed": "医師の処方で分けた場合",
  "Sorted by the trial's coin flip": "試験のコイン投げで分けた場合",
  "As prescribed in practice": "実際の処方どおり",
  "Yes, the drug is harming them": "はい、この薬が害を与えています",
  "nine points worse": "9ポイント悪い",
  "No, and adjusting for severity will show that":
    "いいえ、重症度で調整すればそれがわかります",
  "the statistics can correct it": "統計で補正できる",
  "No, and adjusting will not fix it either": "いいえ、調整しても直りません",
  "the prescription marks the patient": "処方が患者の状態を映す",
  "The same 6,800 patients, sorted by a coin flip. No difference.":
    "同じ6,800人の患者を、コイン投げで分けた場合。差はありません。",
  "The prescription marked how ill they already were":
    "処方が、すでにどれだけ重かったかを映していた",
  "These are the same people in both panels, grouped two different ways. Sorted by what their doctors had decided, digoxin looks lethal. Sorted by the trial's random assignment, which no clinical judgement touched, the two groups die at the same rate. Doctors were reaching for digoxin in the patients who were already worse off, so the prescription carried information about the patient that nothing in the dataset had recorded:":
    "どちらのパネルも同じ人たちで、2通りのやり方でグループ分けしただけです。担当医が下した判断で分けると、ジゴキシンは命を奪うものに見えます。臨床的な判断がいっさい触れていない、試験の無作為割り付けで分けると、2つの群は同じ割合で亡くなっています。医師は、すでに状態が悪かった患者にこそジゴキシンを手に取っていました。だから処方は、データセットのどこにも記録されていなかった患者についての情報を運んでいたのです。",
  "Both ways of sorting": "両方の分け方",
  "Adjusting for 27 recorded baseline characteristics barely moved it, from a 36 percent excess to 22 percent. And the same excess turned up among the patients the trial had randomised to placebo, people who took no digoxin at all during it. A drug cannot harm those who never received it, so the excess was never the drug.":
    "記録されていた27項目のベースライン特性で調整しても、この差はほとんど動かず、36パーセントの過剰が22パーセントになっただけでした。しかも同じ過剰は、試験がプラセボに無作為化した患者、つまり試験の期間中ジゴキシンをまったく飲まなかった人たちのあいだにも現れました。薬は、一度も受け取っていない人に害を与えることはできません。だからこの過剰は、はじめから薬によるものではなかったのです。",
  "The reason for the prescription": "処方の理由",
  "Confounding by indication": "適応による交絡",
  "When a doctor decides who gets a treatment, the treated differ from the untreated in ways the data never recorded, and the treatment takes the blame, or the credit, for the reason it was given.":
    "誰が治療を受けるかを医師が決めるとき、治療を受けた人は、データがいっさい記録しなかった点で、受けなかった人と異なっています。そして治療は、それが与えられた理由の分まで、責めを負い、あるいは手柄を得ることになります。",
  "This is why observational comparisons between treated and untreated patients are read so warily, and why \"we adjusted for that\" does not end the argument. Adjustment can only remove what was written down. The judgement that led to the prescription usually was not.":
    "治療を受けた患者と受けなかった患者を比べる観察研究が、これほど慎重に読まれるのはこのためです。そして「その点は調整しました」の一言で議論が終わらないのも、同じ理由です。調整が取り除けるのは、書き留められたものだけです。処方に至った判断は、たいてい書き留められていません。",
  "Treatments are not handed out at random. A doctor prescribes because of something about the patient: they are sicker, or frailer, or their symptoms are worse. That something also affects how they were going to do anyway. So the treated group starts out different, and any comparison with the untreated measures both the drug and the reason it was chosen, tangled together. It runs both ways. A drug given to the sickest looks harmful; a drug given to the fittest, or one that only patients well enough to attend a clinic can receive, looks miraculous. The standard defence is to adjust for the differences, and it helps, but only for the differences someone thought to record. The clinician's impression that this particular patient was going downhill is real information, it is why the prescription happened, and it is almost never in the dataset. That is the whole reason randomised trials are worth their expense: a coin flip cannot know anything about the patient, so it cannot smuggle the reason into the comparison. When a trial and an observational study disagree about the same drug, this is usually why.":
    "治療は無作為に配られるものではありません。医師が処方するのは、患者について何かがあるからです。病状が重い、体が弱っている、症状が強い、といったことです。その何かは、その患者がもともとどうなるはずだったかにも影響します。だから治療を受けた群は、出発点からすでに違っています。そして治療を受けなかった群との比較はどれも、薬そのものと、それが選ばれた理由とを、絡み合ったまま同時に測っていることになります。これは両方向に働きます。最も重い患者に与えられた薬は有害に見え、最も元気な患者に与えられた薬や、通院できるほど元気な患者しか受けられない薬は、奇跡のように見えます。定石の対抗策は、その違いを調整することです。それは役に立ちますが、誰かが記録しておこうと考えた違いについてだけです。この患者は下り坂に入っている、という臨床医の感触は本物の情報であり、それこそが処方の起きた理由でありながら、データセットにはまず入っていません。無作為化試験がその費用に見合う理由は、まさにここにあります。コイン投げは患者について何ひとつ知りえないので、その理由を比較の中に忍び込ませることができないのです。同じ薬について試験と観察研究の結論が食い違うとき、たいていはこれが原因です。",
  "Taking your pills predicts survival, even when they are dummies":
    "薬をきちんと飲む人ほど長く生きる。その錠剤が偽薬であっても",
  "An earlier trial split its patients by how faithfully they had taken their tablets. Those who took at least 80 percent of them had 15.0 percent five-year mortality against 24.6 percent for the rest, which looks like proof that the drug works if you actually take it. Then the researchers ran the same split inside the placebo group, where the tablets contained nothing: 15.1 percent against 28.2 percent. Adjusting for 40 recorded characteristics narrowed that gap to 16.4 against 25.8 and left it overwhelming. Whatever adherence marks about a person, it was not the medicine.":
    "それ以前のある試験は、患者を、錠剤をどれだけ忠実に飲んでいたかで分けました。80パーセント以上を飲んだ人の5年死亡率は15.0パーセント、それ以外の人では24.6パーセントで、きちんと飲みさえすれば薬は効く、という証拠のように見えます。ところが研究者たちは、同じ分け方をプラセボ群の中でも行いました。中身が何も入っていない錠剤の群です。結果は15.1パーセント対28.2パーセントでした。記録されていた40項目の特性で調整しても、この差は16.4対25.8に縮まっただけで、依然として圧倒的なままでした。服薬アドヒアランスがその人について何を映しているにせよ、それは薬ではありませんでした。",
  "The same argument, about a procedure": "同じ論法を、ある手技について",
  "In a study of 5,735 critically ill patients, those who had a catheter threaded into the right side of the heart died more often within 30 days than those who did not, 38.0 percent against 30.6 percent. The procedure was reserved for the patients in most trouble. When it was later tested by randomising who got one, mortality came out at 62 percent with the catheter and 60 percent without, in a trial whose patients were sicker still. The gap that had looked like harm was mostly a gap in who was chosen.":
    "重症患者5,735人を対象としたある研究では、心臓の右側にカテーテルを通した患者は、通さなかった患者よりも30日以内に亡くなる割合が高く、38.0パーセント対30.6パーセントでした。この手技は、最も状態の悪い患者に限って行われていました。後に、誰にカテーテルを入れるかを無作為化して検証したところ、死亡率はカテーテルを入れた群で62パーセント、入れなかった群で60パーセントでした。しかもこの試験の患者は、さらに重症だったのです。害のように見えていたその差は、その大半が、誰が選ばれたかの差でした。",
  "Confounding by indication, a reasoning trap.":
    "適応による交絡、推論の罠です。",
  "Nobody hands out medicines at random. Doctors prescribe because of something about the patient, and that something usually affects how the patient was going to do anyway. So people on a drug can die more often than people not on it while the drug does nothing at all: it was given to those who were already worse off. Adjusting for the differences helps, but only the differences somebody wrote down, and the reason for the prescription rarely is one. It is why a coin flip is worth so much.":
    "薬を無作為に配る人はいません。医師が処方するのは患者について何かがあるからで、その何かはたいてい、その患者がもともとどうなるはずだったかにも影響します。だから、薬がまったく何もしていないのに、薬を飲んでいる人のほうが飲んでいない人より多く亡くなる、ということが起こり得ます。その薬は、すでに状態の悪かった人に与えられていたからです。違いを調整することは助けになりますが、それは誰かが書き留めた違いについてだけであり、処方の理由が書き留められていることはめったにありません。コイン投げにそれほどの価値があるのは、このためです。",
  "The four death counts are printed in the 2019 paper, and the randomised arm sizes in the 1997 trial report. The two prescribed-in-practice denominators are not printed anywhere: 3,017 is the sum of the supplement's two counts of prior digoxin use (1,498 and 1,519) and 3,783 is the rest of the 6,800. That is addition over published whole numbers rather than a figure worked backwards from a percentage, and it closes both ways: 1,207 plus 1,168 and 1,181 plus 1,194 both give 2,375 deaths, and both pairs of denominators give 6,800 patients.":
    "4つの死亡数は2019年の論文に、無作為化された各群の人数は1997年の試験報告に印刷されています。実際の処方で分けた場合の2つの分母は、どこにも印刷されていません。3,017は、補足資料にある過去のジゴキシン使用に関する2つの数(1,498と1,519)の合計であり、3,783は6,800人の残りです。これはパーセントから逆算した数字ではなく、公表された整数どうしの足し算であり、しかも計算はどちらの向きでも合います。1,207足す1,168も、1,181足す1,194も、ともに死亡2,375人になり、どちらの分母の組も患者6,800人になります。",

  // ---- Trap Hunt test items (confounding by indication, and five earlier skills) ----
  "A hospital reviews its records and finds that patients who were given a particular breathing support died far more often than patients who were not. A committee recommends using it less.":
    "ある病院が診療記録を見直したところ、ある呼吸補助を受けた患者は、受けなかった患者よりはるかに多く亡くなっていることがわかりました。委員会は、その使用を減らすよう勧告しました。",
  "The support was given to the patients who were struggling to breathe. It is standing in for how ill they already were, and the records cannot separate the treatment from the reason it was reached for.":
    "その補助は、呼吸が苦しくなっていた患者に対して行われたものです。それは、その患者がすでにどれだけ重かったかの代わりを務めているのであり、診療記録では、治療そのものと、それが手に取られた理由とを切り離せません。",
  "An observational study finds higher mortality among patients on a drug. The authors adjust for age, sex, blood pressure and twelve laboratory values, the excess shrinks a little but remains, and they conclude the drug is harmful.":
    "ある観察研究が、その薬を飲んでいる患者では死亡率が高いことを見いだしました。著者らは年齢、性別、血圧、および12項目の検査値で調整し、過剰は少し縮んだものの残ったため、この薬は有害だと結論づけました。",
  "Adjustment can only remove what was recorded. The clinician's sense that this patient was deteriorating is exactly why the drug was prescribed, and it is not among the twelve laboratory values.":
    "調整が取り除けるのは、記録されたものだけです。この患者は悪化しつつある、という臨床医の感触こそが薬を処方した理由であり、それは12項目の検査値の中にはありません。",
  "A national audit finds that patients operated on at small local hospitals survive more often than those at large teaching hospitals. Broken down by how severe the case was, the teaching hospitals come out ahead in every category.":
    "ある全国調査で、小規模な地域の病院で手術を受けた患者のほうが、大規模な教育病院で手術を受けた患者よりも生存する割合が高いことがわかりました。症例の重さで分けて見ると、どの区分でも教育病院が上回っています。",
  "Teaching hospitals take the difficult cases, so their pooled figure is dragged down by a case mix nobody chose at random. Better in every severity band and worse overall is the signature of that.":
    "教育病院は難しい症例を引き受けます。そのため、まとめた数字は、誰も無作為に選んだわけではない症例構成によって引き下げられます。どの重症度の区分でも優れているのに全体では劣る、というのが、まさにその特徴です。",
  "A genetic test for a condition affecting about 1 in 5,000 people is 99.9% accurate. A clinic tells everyone who screens positive that the diagnosis is essentially confirmed.":
    "およそ5,000人に1人がかかる疾患を調べる遺伝学的検査の精度は99.9%です。ある診療所は、スクリーニングで陽性となった人全員に、診断はほぼ確定したと伝えています。",
  "Even at 99.9%, errors outnumber real cases when the condition is this rare. Among 100,000 people about 20 have it, and about 100 healthy people also test positive, so a positive is right roughly one time in six.":
    "疾患がこれほどまれなときは、99.9%であっても、誤りの数が本物の症例の数を上回ります。100,000人のうち、その疾患を持つのは約20人ですが、健康な人も約100人が陽性になります。だから陽性が当たっているのは、おおよそ6回に1回です。",
  "A surgeon reports excellent long-term results in the patients seen at the five-year follow-up clinic. Patients who moved away, stopped attending, or died before five years are not in the series.":
    "ある外科医が、5年後の経過観察外来で診た患者について、長期の成績はきわめて良好だと報告しています。転居した患者、通院をやめた患者、5年たつ前に亡くなった患者は、この症例シリーズに入っていません。",
  "The series was defined by who was still turning up. The patients who did worst are precisely the ones most likely to be missing from it, so the outcomes describe the survivors rather than the operation.":
    "この症例シリーズを決めたのは、誰がまだ姿を見せていたかです。経過が最も悪かった患者こそ、そこから抜け落ちている可能性が最も高い人たちです。だからこの成績が語っているのは、手術ではなく生存者のほうなのです。",
  "Hospitals that use more of a particular monitoring device have lower death rates. The manufacturer's brochure concludes that buying the device saves lives.":
    "ある監視装置をより多く使っている病院ほど、死亡率が低くなっています。製造元のパンフレットは、この装置を買えば命が救われると結論づけています。",
  "Hospitals that can afford more monitors can usually afford more of everything else too, including staff. The device may be a marker of a well resourced hospital rather than the cause of its results.":
    "より多くの監視装置を買える病院は、たいていそれ以外のものも、人員を含めてより多くそろえられます。この装置は、その病院の成績の原因というより、資源に恵まれた病院であることの目印なのかもしれません。",
  "A rare reaction occurs in about 1 in 50,000 people taking a drug. A patient develops it, and a report concludes there is only a 1 in 50,000 chance the drug was not responsible.":
    "ある薬を飲んでいる人のおよそ50,000人に1人に、まれな副作用が起こります。ある患者にそれが現れ、報告書は、この薬が原因でなかった確率は50,000分の1しかないと結論づけました。",
  "That flips the question round. The 1 in 50,000 is how often the reaction appears among people taking the drug, not the chance the drug caused this case. Answering that needs to know how often the same thing happens in people who never took it.":
    "これは問いをひっくり返しています。50,000分の1は、その薬を飲んでいる人のあいだでその副作用が現れる頻度であって、この症例の原因がその薬である確率ではありません。後者に答えるには、その薬を一度も飲んだことのない人で同じことがどのくらいの頻度で起こるのかを知る必要があります。",
  "A trial reports the outcome it registered in advance as its main one, states that it also measured eleven others, and says plainly that success was judged on the registered outcome alone.":
    "ある試験が、主要評価項目として事前に登録しておいた結果を報告し、ほかに11項目も測定したことを明示したうえで、成功の判定は登録した評価項目だけで行ったと、はっきり述べています。",
  "Naming the outcome before seeing the data, and then reporting all of them, is what stops a study quietly promoting whichever measure happened to come out well.":
    "データを見る前に評価項目を名指ししておき、そのうえで測定したすべての項目を報告すること。それこそが、たまたま良い結果が出た指標をこっそり主役に押し上げることを防ぎます。",
  "A cohort study links an exposure to a disease. It reports that the association survived adjustment for the confounders named in advance, that more exposure went with more disease, and that two independent cohorts elsewhere found the same pattern.":
    "あるコホート研究が、ある曝露とある疾患を結び付けています。この研究は、あらかじめ名指ししておいた交絡因子で調整しても関連が残ったこと、曝露が多いほど疾患も多かったこと、そして別の場所にある2つの独立したコホートでも同じパターンが見られたことを報告しています。",
  "No single one of these settles causation, but together they are the things that make an observational finding worth taking seriously: a prior plan, a dose-response pattern, and replication in populations that do not share the same quirks.":
    "このうちのどれか1つで因果関係が決まるわけではありません。しかし、これらがそろっていることこそが、観察研究の知見を真剣に受け止めるに値するものにします。事前の計画、量反応の関係、そして同じ偏りを共有しない集団での再現です。",
  "Patients are assigned by a computer to a drug or a dummy tablet, with neither they nor their doctor knowing which. Deaths are counted in everyone assigned, whatever they went on to take. The drug group does slightly better.":
    "患者はコンピュータによって、薬か偽薬の錠剤かに割り付けられ、本人も担当医も、どちらなのかを知りません。死亡は、その後実際に何を飲んだかにかかわらず、割り付けられた全員について数えられます。薬の群のほうが、わずかに良い成績でした。",
  "A coin flip knows nothing about the patient, so it cannot smuggle the reason for treatment into the comparison. Counting everyone as assigned keeps that protection even when people stop taking their tablets.":
    "コイン投げは患者について何も知らないので、治療の理由を比較の中に忍び込ませることができません。割り付けどおりに全員を数えれば、途中で錠剤を飲むのをやめた人がいても、その守りは保たれます。",
  "A clinic compares its results with a national benchmark, adjusts for how severe its patients' illness was, and publishes the crude and the adjusted figures side by side along with the case mix it adjusted for.":
    "ある診療所が、自院の成績を全国の基準値と比較し、患者の病気の重さで調整したうえで、調整前の粗の数字と調整後の数字を、調整に用いた症例構成とあわせて並べて公表しています。",
  "Showing both figures and the mix behind them is the honest move. A reader can see how much of the difference was case mix and how much survived accounting for it, instead of being handed only the flattering one.":
    "両方の数字と、その背後にある構成を示すのが誠実なやり方です。読み手は、都合の良いほうだけを手渡されるのではなく、差のうちどれだけが症例構成によるもので、どれだけが考慮したあとも残ったのかを、自分で見て取れます。",

  // ==== Length-time bias (puzzle #12, Mayo Lung Project) ====
  "Screened men whose lung cancer was found died of it less often. Did the screening save them?":
    "検診を受けた男性のうち肺がんが見つかった人は、その肺がんで亡くなる割合が低くなっていました。検診が彼らを救ったのでしょうか?",
  "9,211 male smokers were randomly assigned either to chest x-rays and sputum tests every four months for six years, or to usual care, and followed for two decades. Among the men who were diagnosed with lung cancer, 65 percent of the intensively screened died of it, against 74 percent of the others.":
    "9,211人の男性喫煙者を、6年間にわたり4か月ごとに胸部エックス線検査と喀痰検査を受ける群と、通常の診療を受ける群とに無作為に割り付け、20年にわたって追跡しました。肺がんと診断された男性のうち、集中的に検診を受けた群では65パーセントがその肺がんで亡くなったのに対し、それ以外の群では74パーセントでした。",
  "Did the extra screening save lives?":
    "上乗せされた検診は、命を救ったのでしょうか?",
  "Died of lung cancer": "肺がんで死亡した割合",
  "Screened every four months": "4か月ごとに検診",
  Screened: "検診",
  "Usual care": "通常の診療",
  "Among the men diagnosed with lung cancer": "肺がんと診断された男性のうち",
  "Among everyone in the trial": "試験に参加した全員のうち",
  "Among the diagnosed": "診断された人のうち",
  "Yes, fewer of them died of it": "はい、亡くなった人が少なくなりました",
  "65% against 74%": "65%対74%",
  "Too early to say": "判断するにはまだ早い",
  "the follow-up is too short": "追跡期間が短すぎる",
  "No, count everyone and it vanishes": "いいえ、全員を数えると消えます",
  "the cases changed, not the deaths": "変わったのは症例であって、死亡ではない",
  "Count everyone, and the screened arm did no better.":
    "全員を数えると、検診群のほうが良かったわけではありませんでした。",
  "Screening changed who counted as having cancer":
    "検診は、誰ががんとして数えられるかを変えた",
  "The screened men were diagnosed far more often, 206 against 160, in a trial that split them evenly. The extra cancers were not a random sample of the disease. A test applied every few months catches the slow-growing tumours, because slow ones sit in the detectable stage for years waiting to be found, while fast ones surface between visits. Slow tumours also do better whatever you do, and some would never have surfaced at all. Those cases join the pool of people with lung cancer and survive it, so the share dying falls. Nobody was saved:":
    "人数を均等に分けた試験であるにもかかわらず、検診を受けた男性は206人対160人と、はるかに多く診断されていました。上乗せされたがんは、この病気から無作為に取り出した標本ではありません。数か月ごとに行われる検査は、進行の遅い腫瘍を捉えます。進行の遅いものは、見つけられるのを待ちながら発見可能な段階に何年もとどまるのに対し、進行の速いものは受診と受診のあいだに姿を現すからです。しかも進行の遅い腫瘍は、何をしようと経過が良く、なかには最後まで表に出ずに終わったはずのものもあります。そうした症例が肺がんを持つ人の集まりに加わり、そして生き延びるので、亡くなる人の割合は下がります。誰も救われてはいません。",
  "Both ways of counting": "両方の数え方",
  "Three effects travel together here and this trial cannot separate them: the slow cases are caught preferentially (length-time), the clock starts earlier for those caught (lead-time), and some tumours found would never have caused harm (overdiagnosis). All three flatter the diagnosed group and none of them postpones a death. The number that stayed honest is deaths among everyone randomised, and it did not fall.":
    "ここでは3つの効果が連れ立って働いており、この試験ではそれらを切り分けられません。進行の遅い症例が優先的に捉えられること(長さバイアス)、捉えられた人では時計が早く動き出すこと(リードタイムバイアス)、そして見つかった腫瘍のなかには害を及ぼすことのなかったものがあること(過剰診断)です。3つはいずれも診断された群を実際より良く見せますが、どれ一つとして死を先延ばしにはしません。誠実なままだった数字は、無作為に割り付けられた全員のうちの死亡数であり、それは下がりませんでした。",
  "Who became a case": "誰が症例になったのか",
  "Length-time bias": "長さバイアス",
  "Screening does not sample disease fairly. It catches the slow-growing kind preferentially, and the slow kind was always going to do better, so screen-detected cases flatter the test.":
    "検診は、病気を公平に標本抽出しません。進行の遅い種類を優先的に捉えますが、進行の遅い種類はもともと経過が良いものでした。だから検診で見つかった症例は、検査を実際より良く見せるのです。",
  "The trial's own explanation": "試験自身による説明",
  "The authors did not attribute the gap to better treatment. They noted that similar mortality alongside better survival points to lesions of limited clinical relevance being found in the screened arm. Twenty years of follow-up did not rescue the result: deaths from lung cancer were 337 among 4,607 screened men and 303 among 4,585 others, a difference in the wrong direction and not statistically significant.":
    "著者らは、この差を治療の良さによるものとは考えませんでした。死亡率がほぼ同じでありながら生存が良いという組み合わせは、検診を受けた群で臨床的な意味の乏しい病変が見つかっていることを示している、と指摘しています。20年の追跡でもこの結果は覆りませんでした。肺がんによる死亡は、検診を受けた男性4,607人のうち337人、それ以外の4,585人のうち303人で、差は望ましくない向きであり、統計的にも有意ではありませんでした。",
  "Why screening is judged on deaths, not survival":
    "検診が生存ではなく死亡で評価される理由",
  "This is not a historical curiosity. National screening programmes are assessed on whether they lower deaths from the disease in the whole invited population, precisely because survival among detected cases can be lifted by three separate artefacts without a single life being extended. A programme that raises five-year survival and leaves mortality untouched has, on the evidence, done nothing except give more people the label.":
    "これは歴史上の珍事ではありません。国の検診プログラムは、招かれた集団全体でその病気による死亡が減るかどうかで評価されます。見つかった症例のあいだの生存は、誰ひとり寿命が延びていなくても、3つの別々のみせかけの効果によって押し上げられうるからです。5年生存率を上げながら死亡率をまったく動かさないプログラムは、エビデンスに照らせば、より多くの人に病名を与えた以外に何もしていません。",
  "Length-time bias, a reasoning trap.": "長さバイアス、推論の罠です。",
  "Table 3 prints the usual-care case count as 106, which is a typographic error; the correct figure is 160, and this puzzle uses 160. The paper says so itself six times over: the body text on page 1310, the Figure 2 curve label, Table 3's own percentages (119 of 160 printed as 74 percent, 156 of 160 as 98 percent), and the totals of Tables 4 and 5. With 106 the lung-cancer deaths alone would outnumber the cohort. Note also that this trial compared two screening intensities rather than screening against none, and that it cannot separate length-time bias from lead-time bias and overdiagnosis, which is why the lesson names all three.":
    "表3は、通常の診療群の症例数を106と印刷していますが、これは誤植です。正しい数字は160であり、このパズルは160を用いています。論文自身が6か所でそう述べています。1310ページの本文、図2の曲線のラベル、表3自身のパーセント表示(160人中119人が74パーセント、160人中156人が98パーセントと印刷されています)、そして表4と表5の合計です。106であれば、肺がんによる死亡だけでコホートの人数を上回ってしまいます。また、この試験は検診と検診なしを比べたのではなく、2つの検診強度を比べたものであること、そして長さバイアスをリードタイムバイアスや過剰診断と切り分けられないことにも注意してください。レッスンが3つすべての名前を挙げているのは、そのためです。",

  // ==== Publication bias (puzzle #13, twelve antidepressants) ====
  "Read the journals and almost every trial of these drugs worked. How many actually did?":
    "医学雑誌を読むと、これらの薬の試験はほぼすべてが成功しています。実際に成功したのは何件だったのでしょうか?",
  "Twelve antidepressants, and every trial run to get them approved had to be registered with the American regulator before it began. That registry is the rare thing in medicine: a complete list, including the trials nobody ever wrote up. Go to the medical journals instead and you find 51 published trials, of which 48 read as positive.":
    "12種類の抗うつ薬。その承認を得るために行われた試験は、開始前にアメリカの規制当局へ登録することが義務づけられていました。このレジストリは、医学ではまれなものです。誰も論文にしなかった試験まで含んだ、完全な一覧なのです。代わりに医学雑誌をあたると、公表された試験は51件で、そのうち48件が肯定的な結果として読めます。",
  "Out of all 74 trials that were actually run, how many did the regulator judge positive?":
    "実際に行われた74件の試験すべてのうち、規制当局が肯定的と判断したのは何件だったのでしょうか?",
  "Trials that read as positive": "肯定的な結果として読める試験の割合",
  "As the journals tell it": "医学雑誌が語るところでは",
  Journals: "医学雑誌",
  "As the full registry tells it": "レジストリ全体が語るところでは",
  Registry: "レジストリ",
  "Trials of twelve antidepressants": "12種類の抗うつ薬の試験",
  "The published literature": "公表された文献",
  "Nearly all of them": "ほぼすべて",
  "the journals are the evidence": "医学雑誌こそがエビデンスだ",
  "About two thirds": "約3分の2",
  "some trials always fail": "失敗する試験は必ずいくらかある",
  "38 of the 74": "74件のうち38件",
  "Half. A coin flip, printed as a near-certainty.":
    "半分です。コイン投げと変わらないものが、ほぼ確実なこととして活字になっていました。",
  "The failures were filtered out on the way to the journals":
    "失敗は、医学雑誌にたどり着くまでにふるい落とされた",
  "The regulator judged 38 of the 74 trials positive and 36 not. Of those 36, twenty two were never published at all. Eleven more did reach print, but reading as a positive result. So a doctor searching the literature finds 48 positive trials out of 51 and concludes the case is overwhelming, when the complete record says it was close to even:":
    "規制当局は、74件の試験のうち38件を肯定的、36件をそうではないと判断しました。その36件のうち、22件はまったく公表されませんでした。さらに11件は活字にはなったものの、肯定的な結果として読める形になっていました。そのため、文献を検索した医師は51件中48件が肯定的な試験だと知り、証拠は圧倒的だと結論づけます。完全な記録は、それがほぼ互角だったと語っているのにです。",
  "Journals against the registry": "医学雑誌とレジストリの比較",
  "Two of those judgements belong to different people, and it matters. Positive or negative was the regulator's own decision on the outcome each trial had promised to measure in advance. The reading that eleven publications conveyed a positive result was the study authors' assessment, not the regulator's, and they said so. What is not a matter of opinion is the twenty two that never appeared.":
    "ここに出てくる判断のうち2つは、下した人が異なります。そしてその違いは重要です。肯定的か否定的かは、各試験が事前に測ると約束していた評価項目について、規制当局自身が下した判断でした。11件の公表論文が肯定的な結果を伝えているという読み取りは、規制当局ではなく研究の著者らによる評価であり、著者ら自身がそう明記しています。意見の分かれようがないのは、一度も現れなかった22件です。",
  "What never reached print": "活字にならなかったもの",
  "Publication bias": "出版バイアス",
  "The published literature is not a sample of the research done. It is the research that someone chose to submit and someone chose to print, and success survives that filter far better than failure.":
    "公表された文献は、行われた研究から取り出した標本ではありません。それは、誰かが投稿しようと選び、誰かが印刷しようと選んだ研究であり、そのふるいを生き延びる力は、失敗より成功のほうがはるかに強いのです。",
  "This is why a registry matters more than it sounds. Requiring every trial to be declared before it starts creates the denominator, so the missing ones become countable instead of invisible. When you read a review, the question is not only what the studies found but whether you are looking at all of them.":
    "レジストリが、聞こえ以上に重要なのはこのためです。すべての試験に開始前の届け出を義務づければ分母ができあがり、欠けているものは見えないままではなく、数えられるものになります。総説を読むときの問いは、研究が何を見いだしたかだけではありません。あなたがそのすべてを見ているのかどうか、でもあるのです。",
  "Nothing here requires anyone to lie. A trial that finds nothing is duller to write up, harder to place, and commercially unwelcome, so it drifts to the bottom of the pile and quietly never gets finished. Repeat that across a field and the surviving literature is systematically sunnier than the research was. The effect compounds, because reviews and guidelines are built on what was published, so the gap is inherited by everything downstream and looks like accumulating evidence rather than a filter. Two things push back. The first is registration: declare the trial and its primary outcome before you start, and an unpublished result leaves a visible hole rather than no trace. The second is the funnel plot, which exploits the fact that small studies scatter widely and large ones cluster; if the small studies that should have landed on the disappointing side are missing, the scatter comes out lopsided. Neither fix works retrospectively on a literature that predates them, which is why the regulator's archive was the only way to answer this question at all.":
    "ここでは、誰かが嘘をつく必要はまったくありません。何も見いだせなかった試験は、書くのが退屈で、載せてくれる雑誌を見つけるのが難しく、商業的にも歓迎されません。だから書類の山の底へ沈んでいき、ひっそりと最後まで仕上げられないまま終わります。それが一つの分野じゅうで繰り返されると、生き残った文献は、実際に行われた研究より体系的に明るいものになります。この効果は積み重なります。総説も診療ガイドラインも公表されたものの上に組み立てられるので、この隔たりは下流のすべてに受け継がれ、ふるいではなくエビデンスの蓄積のように見えてしまうからです。これに抗う手立てが2つあります。1つめは登録です。試験と、その主要評価項目を開始前に届け出ておけば、公表されなかった結果は、跡形もなく消えるのではなく、目に見える穴として残ります。2つめはファンネルプロットです。これは、小規模な研究は広くばらつき、大規模な研究は一点に集まるという性質を利用します。芳しくない側に落ちるはずだった小規模な研究が欠けていれば、ばらつきは左右非対称になって現れます。どちらの手立ても、それらより前に積み上がった文献にさかのぼって効くわけではありません。だからこそ、この問いに答える道は、規制当局の保管記録しかなかったのです。",
  "The drugs also looked stronger than they were":
    "薬は、実際より強く効くようにも見えていた",
  "The same trials were pooled twice, once as the regulator held them and once as the journals reported them. Measured across the complete set the average benefit was 0.31 on a standardised scale; measured from the published literature alone it was 0.41, about a third larger. That is a standardised mean difference, not a share of patients helped, and the effect was not confined to one drug: every one of the twelve looked better in the journals, by between 11 and 69 percent.":
    "同じ試験群を、2通りのやり方でメタ分析にかけました。1回は規制当局が保管していたとおりのデータで、もう1回は医学雑誌が報告したとおりのデータでです。完全なひとそろいで測ると、平均的な効果量は標準化された尺度で0.31でしたが、公表された文献だけから測ると0.41で、約3分の1大きくなりました。これは標準化平均差であって、効果があった患者の割合ではありません。しかもこの現象は1つの薬にとどまりませんでした。12種類のいずれもが医学雑誌のほうで良く見えており、その差は11から69パーセントに及びました。",
  "It got better, which is the point": "状況は良くなった。そこが肝心なところ",
  "The same team repeated the audit on four antidepressants approved between 2008 and 2013, after trial registration had become the norm. This time all 15 positive trials were reported transparently, and of the 15 negative ones 6 went unpublished and 2 were reported as positive. Still imperfect, and still worth knowing about, but the inflation in apparent effect had roughly halved. Publication bias is not a law of nature; it responds to rules about declaring trials in advance.":
    "同じ研究チームは、試験の登録が当たり前になったあとの2008年から2013年に承認された4種類の抗うつ薬について、同じ点検を繰り返しました。今回は、肯定的な15件の試験がすべて透明性のある形で報告され、否定的な15件のうち6件が未公表、2件が肯定的な結果として報告されていました。依然として完璧ではなく、依然として知っておく価値はありますが、見かけ上の効果の水増しはおよそ半分になっていました。出版バイアスは自然の法則ではありません。試験を事前に届け出るという決まりに、きちんと反応するのです。",
  "Publication bias, a reasoning trap.": "出版バイアス、推論の罠です。",
  "Search the medical literature on a drug and you are not seeing the research that was done. You are seeing the research that got written up and accepted, and studies that found something clear survive that filter much better than studies that found nothing. For one class of drugs the regulator's complete archive showed about half the trials were positive, while the journals showed nearly all of them. Nobody had to lie for that to happen. The disappointing ones simply never got finished.":
    "ある薬について医学文献を検索しても、あなたが見ているのは、行われた研究ではありません。論文にまとめられ、受理された研究です。そして、はっきりした結果が出た研究は、何も出なかった研究より、そのふるいをはるかによく生き延びます。ある薬効群では、規制当局の完全な保管記録は試験の約半分が肯定的だったと示していたのに、医学雑誌ではほぼすべてが肯定的に見えていました。そうなるために、誰も嘘をつく必要はありませんでした。芳しくない試験は、ただ最後まで仕上げられなかっただけなのです。",
  "Three points of care. The positive or negative verdict on each trial is the regulator's own, on the outcome the trial specified in advance; the label questionable, and the reading that eleven publications conveyed a positive result, are the study authors' judgements and the paper says so. The published-trial figure of 48 of 51 is the sum of two printed counts, 37 and 11, rather than a single printed number. And the authors note that they excluded articles covering several studies at once, so they probably counted a few trials as unpublished that were technically published, which makes 22 and 23 upper bounds.":
    "注意すべき点が3つあります。各試験が肯定的か否定的かという判定は、その試験が事前に定めた評価項目について、規制当局自身が下したものです。一方、「疑わしい」という区分と、11件の公表論文が肯定的な結果を伝えているという読み取りは、研究の著者らによる判断であり、論文にもそう書かれています。公表された試験の51件中48件という数字は、印刷されている2つの数、37と11の合計であって、1つの数として印刷されているものではありません。また著者らは、複数の研究を一度に扱った論文を除外したと述べており、そのため、技術的には公表されていた試験をいくつか未公表として数えた可能性があります。したがって22と23は上限値です。",

  // ---- Trap Hunt test items (publication bias, length-time bias) ----
  "A review gathers every published trial of a treatment it can find. Eleven of the thirteen are positive, and it concludes the treatment works. The review does not say how many trials of the treatment were ever started.":
    "ある総説が、その治療について見つけられる限りの公表された試験を集めました。13件のうち11件が肯定的で、総説はその治療は効くと結論づけています。この総説は、その治療の試験がこれまでに何件始められたのかについては述べていません。",
  "Searching the literature finds the studies that reached print, not the studies that were run. Without knowing how many were started, there is no way to tell whether two disappointing trials is the whole story or the visible corner of it.":
    "文献検索で見つかるのは活字になった研究であって、行われた研究ではありません。何件が始められたのかがわからなければ、芳しくない試験が2件というのが全体の姿なのか、それとも見えている一角にすぎないのかを、判断する術はありません。",
  "A researcher runs a study that finds nothing, decides it is not interesting enough to write up, and moves on to the next project. Several colleagues in the same field do the same thing that year.":
    "ある研究者が、何も見いだせなかった研究を行い、論文にするほど面白くはないと判断して、次の課題へ移りました。同じ分野の複数の同僚も、その年に同じことをしました。",
  "Nobody here has done anything dishonest, and that is exactly the point. The filter is made of ordinary decisions about what is worth the effort, and it still leaves the published record systematically sunnier than the research was.":
    "ここでは誰ひとり不誠実なことはしておらず、まさにそこが肝心なところです。このふるいは、何に手間をかける価値があるかという、ごく当たり前の判断でできています。それでもなお、公表された記録は、実際に行われた研究より体系的に明るいものになってしまうのです。",
  "A clinic reports that men whose cancer was picked up by its regular screening programme are far more likely to still be alive ten years on than men who came in with symptoms. It concludes that screening works.":
    "ある診療所が、自院の定期的な検診プログラムでがんを拾い上げられた男性は、症状があって受診した男性よりも、10年後になお生存している割合がはるかに高いと報告しています。そして、検診は効いていると結論づけました。",
  "A test run at intervals catches slow tumours easily and fast ones hardly at all, because fast ones surface between visits. So the screen-detected group is loaded with the gentle kind of disease before treatment is even considered.":
    "一定の間隔で行われる検査は、進行の遅い腫瘍をたやすく捉える一方、進行の速い腫瘍はほとんど捉えられません。速いものは受診と受診のあいだに姿を現すからです。だから検診で見つかった群には、治療を考えるより前の段階で、おとなしい種類の病気が詰まっているのです。",
  "A new scan finds three times as many cases of a cancer as were previously diagnosed in the same population, and the people it finds do very well. Deaths from that cancer in the population are unchanged.":
    "新しい画像検査が、同じ集団でこれまで診断されていたがんの3倍の症例を見つけ、見つかった人たちの経過はきわめて良好です。その集団におけるそのがんによる死亡は、変わっていません。",
  "More cases found, the same number of deaths, and excellent outcomes among the extra cases is the signature of finding disease that was never going to cause harm. The survival figures improve because the denominator filled up with people who were never in danger.":
    "見つかる症例は増え、死亡数は同じで、上乗せされた症例の経過がきわめて良い。これは、そもそも害を及ぼすことのなかった病気を見つけていることの特徴です。生存の数字が良くなるのは、はじめから危険のなかった人たちで分母が埋まったからです。",

  // ---- intention to treat, recall bias, immortal time ----
  "Among the patients who actually got the treatment they were assigned, surgery saved lives. Is that the trial's answer?":
    "割り付けどおりの治療を実際に受けた患者に限れば、手術は命を救っていました。それがこの試験の答えでしょうか。",
  "1,212 people with heart failure, randomly assigned to medicine alone or to medicine plus bypass surgery. Analysing the ones who received what they were assigned, 43 percent of the medicine group died against 34 percent of the surgery group. The difference is statistically significant.":
    "心不全の1,212人を、薬物療法単独か、薬物療法にバイパス手術を加える群にランダムに割り付けました。割り付けどおりの治療を受けた人だけを解析すると、薬物療法群の43パーセントが死亡したのに対し、手術群では34パーセントでした。この差は統計学的に有意です。",
  "Does this trial show that surgery cuts deaths?":
    "この試験は手術が死亡を減らすことを示しているでしょうか。",
  "Died during follow-up":
    "追跡期間中に死亡",
  "Medicine alone":
    "薬物療法単独",
  "Medicine":
    "薬物療法",
  "Surgery added":
    "手術を追加",
  "Surgery":
    "手術",
  "Only those who got what they were assigned":
    "割り付けどおりに治療された人だけ",
  "Everyone, as the coin assigned them":
    "コインが割り付けたとおりの全員",
  "The patients left out of the first panel":
    "最初の図から除かれた患者",
  "Those who followed the protocol":
    "プロトコールを守った人",
  "Yes, that is what surgery does":
    "はい、手術の効果です",
  "nine points fewer deaths":
    "死亡が9ポイント少ない",
  "No, and it understates the benefit":
    "いいえ、効果を過小評価しています",
  "crossovers dilute a real effect":
    "クロスオーバーが真の効果を薄めます",
  "No, that comparison is no longer randomised":
    "いいえ、その比較はもうランダム化されていません",
  "dying is why some were left out":
    "除外の理由が死亡だからです",
  "Counting everyone the coin assigned, the difference is not significant.":
    "コインが割り付けた全員を数えると、差は有意ではありません。",
  "The surgical patients who were dropped had mostly died first":
    "除外された手術群の患者は、その多くが先に亡くなっていました",
  "The 120 patients missing from the first panel are not a random sample. Of the 55 dropped from the surgery group, 30 died, and most of them died before they ever reached an operating table. Of the 65 dropped from the medicine group, only 15 died, because crossing over to surgery required living long enough to have it. So the surgical arm shed its worst outcomes and the medical arm lost its best, and the gap nearly doubled without one patient's fate changing:":
    "最初の図から抜けている120人は、ランダムな標本ではありません。手術群から外れた55人のうち30人が死亡し、その大半は手術台にたどり着く前に亡くなっています。薬物療法群から外れた65人のうち死亡したのは15人だけです。手術へクロスオーバーするには、それを受けられるだけ長く生きている必要があったからです。つまり手術群は最悪の転帰を切り捨て、薬物療法群は最良の転帰を失い、患者の運命は一人も変わらないまま差はほぼ倍になりました。",
  "All three views of one trial":
    "1つの試験の3つの見方",
  "A randomised comparison is only worth something while it is still random. The coin flip made the two groups alike; deciding afterwards who counts, on the basis of something that happened after the flip, undoes that. Here the deciding factor was survival itself, which is the outcome being measured. Counting everyone in the group they were assigned to, whatever happened next, is the analysis that keeps the coin flip intact.":
    "ランダム化比較に価値があるのは、それがランダムであり続けるあいだだけです。コイン投げが2つの群を似た者どうしにしたのに、投げたあとに起きたことを根拠に誰を数えるかを後から決めれば、その利点は失われます。ここで数えるかどうかを決めていたのは生存そのもの、つまり測定している転帰でした。その後に何が起きたかにかかわらず、割り付けられた群のまま全員を数える解析だけが、コイン投げをそのまま保ちます。",
  "Who the analysis dropped":
    "解析が誰を除いたか",
  "Intention to treat":
    "治療企図解析（ITT）",
  "Once you exclude people for what happened after they were randomised, you are no longer comparing the groups the coin made, and the exclusions usually favour one side.":
    "ランダム化されたあとに起きたことを理由に人を除外した時点で、コインが作った群どうしを比べてはいません。そして除外はたいてい一方に有利に働きます。",
  "This is not a rule that per-protocol analysis is dishonest. It answers a different question, and there are trials where it is the right one to ask. The rule is narrower and harder: any analysis that drops people for something that happened after randomisation has to explain why those people were not different, and when the reason for dropping is entangled with the outcome, no explanation will do.":
    "これは、per protocol解析が不誠実だという原則ではありません。それは別の問いに答えるものであり、その問いこそが適切な試験もあります。原則はもっと限定的で、もっと厳しいものです。ランダム化のあとに起きたことを理由に人を除く解析はすべて、除かれた人たちがなぜ違わなかったのかを説明しなければならず、除外の理由が転帰と絡み合っているときには、どんな説明も足りません。",
  "Randomisation buys one thing: two groups that differ only by chance, including in all the ways nobody measured. Everything a trial claims rests on that. The trouble is that trials are run on people, who cross over, refuse the operation, stop the tablets or die before treatment starts, and it is tempting to set those people aside and look at the clean comparison underneath. But whether someone stayed on protocol is itself an outcome. Patients who cross from medicine to surgery must survive to be operated on. Patients assigned to surgery who never get it are often the ones too ill to be operated on, or already dead. Removing them is removing patients selected by prognosis, and prognosis is what the trial is measuring. Intention to treat keeps everyone in the arm the coin put them in, which sounds absurd when a patient never received the treatment, and is exactly the point: it measures the effect of the decision to treat, under real conditions, which is also the decision a doctor actually faces. It has a known cost. Crossovers pull the arms together, so intention to treat tends to shrink a real effect towards nothing. That is a conservative failure when you are trying to prove a drug works, and a dangerous one when you are trying to prove a drug is no worse than another, which is why non-inferiority trials report both analyses and are believed only when the two agree.":
    "ランダム化が買えるものは1つだけです。偶然によってしか違わない2つの群、誰も測定しなかったあらゆる面についてもそうである2つの群です。試験の主張はすべてそこに乗っています。厄介なのは、試験の対象が人であることです。人はクロスオーバーし、手術を断り、錠剤をやめ、あるいは治療が始まる前に亡くなります。そうした人をわきに置いて、その下にあるきれいな比較を見たくなります。しかし、プロトコールを守れたかどうか自体が1つの転帰です。薬物療法から手術へ移る患者は、手術を受けるまで生きていなければなりません。手術に割り付けられながら受けなかった患者は、しばしば手術に耐えられないほど重症だった人か、すでに亡くなっていた人です。彼らを取り除くことは、予後によって選ばれた患者を取り除くことであり、その予後こそ試験が測っているものです。治療企図解析は、コインが入れた群に全員をとどめます。治療を一度も受けていない患者についてそうするのは不合理に聞こえますが、まさにそこが要点です。それは現実の条件のもとで治療するという決断の効果を測っており、それは医師が実際に直面する決断でもあります。代償も知られています。クロスオーバーは両群を近づけるため、治療企図解析は真の効果をゼロの方向へ縮める傾向があります。薬が効くことを示そうとしている場面では保守的な失敗ですが、ある薬が別の薬に劣らないことを示そうとしている場面では危険な失敗です。非劣性試験が両方の解析を報告し、2つが一致したときにだけ信用されるのはそのためです。",
  "The same trap, without the verdict flipping":
    "判定は覆らないまま、同じ罠",
  "A tuberculosis trial compared shorter regimens with the standard six-month one. In the group treated per protocol, the standard regimen appeared to fail in about 8 percent of patients. Counting everyone who was randomised and had an assessable outcome, it failed in about 16 percent. Almost everyone the per-protocol analysis removed had had an unfavourable outcome, because an unfavourable outcome was frequently the reason they left the protocol. Nothing about the trial's conclusion changed, and every failure rate in it halved.":
    "ある結核の試験は、より短い治療レジメンを標準の6か月レジメンと比較しました。per protocol解析の集団では、標準レジメンの失敗はおよそ8パーセントに見えました。ランダム化されて評価可能な転帰があった全員を数えると、失敗はおよそ16パーセントでした。per protocol解析が取り除いた人のほとんどは好ましくない転帰をたどっていました。好ましくない転帰こそ、プロトコールから外れる理由になることが多かったからです。試験の結論は何も変わりませんが、そこに書かれた失敗率はどれも半分になっていました。",
  "Intention to treat, a reasoning trap.":
    "治療企図解析、推論の罠。",
  "A trial flips a coin so its two groups start out alike. Then real life happens: people switch treatments, refuse the operation, or die before it. It seems only fair to compare the ones who actually got what they were assigned. It is not, because whether someone stuck to the plan depends on how they were doing, and often on whether they survived. Dropping them quietly sorts the groups by prognosis, which is the very thing the trial is trying to measure. Count everyone where the coin put them, and the flattering result can vanish.":
    "試験は2つの群が同じ状態から始まるようにコインを投げます。そのあとに現実が起こります。人は治療を切り替え、手術を断り、あるいはその前に亡くなります。実際に割り付けどおりの治療を受けた人だけを比べるのが公平に思えます。しかしそうではありません。計画を守れたかどうかは、その人の状態、そしてしばしば生き延びたかどうかに左右されるからです。彼らを外すことは、群を予後によって静かに仕分けることであり、その予後こそ試験が測ろうとしているものです。コインが入れた場所のまま全員を数えると、都合のよい結果は消えることがあります。",
  "The four counts in the first two panels are printed. The third panel is subtraction over those printed integers rather than figures of its own: 65 and 55 are 602 minus 537 and 610 minus 555, and 15 and 30 are 244 minus 229 and 218 minus 188. It closes three ways. The excluded patients reassemble the as-treated arms, 537 plus 55 and 555 plus 65 giving 592 and 620, which sum to the 1,212 randomised; and total deaths are conserved in every split, 244 plus 218 and 259 plus 203 both giving 462. Note also that the trial's P values, 0.12 as randomised and 0.005 per protocol, come from Cox proportional-hazards models over the whole follow-up, not from these four-cell tables, so they are quoted as the trial's own results and not recomputed here.":
    "最初の2つの図にある4つの実数は、論文に印刷されているものです。3つ目の図は独自の数値ではなく、それらの印刷された整数の引き算です。65と55は602引く537、610引く555であり、15と30は244引く229、218引く188です。整合は3通りで確かめられます。除外された患者を戻すとas-treatedの群が再構成され、537足す55と555足す65は592と620になり、その合計はランダム化された1,212人と一致します。また、どの分け方でも死亡の総数は保たれ、244足す218も259足す203も462になります。なお、試験のP値、ランダム化どおりで0.12、per protocolで0.005は、これら4セルの表からではなく、追跡期間全体を用いたCox比例ハザードモデルから得られたものです。したがって試験自身の結果として引用しており、ここで再計算はしていません。",
  "Women with melanoma report burning easily far more often than women without it. How much of that gap is their skin?":
    "メラノーマの女性は、そうでない女性よりも日焼けしやすいと答える割合がはるかに高くなります。その差のどれだけが本当に肌の性質でしょうか。",
  "141 women who had been diagnosed with melanoma and 1,094 who had not, asked how their skin responds to the sun. 45 percent of the women with melanoma said they tan little or not at all, against 25 percent of the others. Pale, easily burned skin is a known risk factor, so the finding looks exactly as expected.":
    "メラノーマと診断された女性141人と、診断されていない女性1,094人に、日光に対する肌の反応をたずねました。メラノーマの女性の45パーセントが、ほとんど、あるいはまったく黒くならないと答えたのに対し、そうでない女性では25パーセントでした。色白で日焼けしやすい肌は既知のリスク因子なので、この結果は予想どおりに見えます。",
  "Is that twenty point gap what their skin was really like?":
    "その20ポイントの差は、本当の肌の性質だったのでしょうか。",
  "Said their skin tans little or not at all":
    "ほとんど、またはまったく黒くならないと回答",
  "Women who developed melanoma":
    "メラノーマを発症した女性",
  "Melanoma":
    "メラノーマ",
  "Women who did not":
    "発症しなかった女性",
  "No melanoma":
    "メラノーマなし",
  "Asked after the diagnosis":
    "診断後にたずねた回答",
  "Asked years before anyone knew":
    "誰も知らない数年前の回答",
  "Yes, pale skin is a real risk factor":
    "はい、色白は本当のリスク因子です",
  "the gap is their skin":
    "差は肌の性質です",
  "No, the whole association is an artefact":
    "いいえ、関連はすべて見かけです",
  "they are reinterpreting their past":
    "過去を解釈し直しています",
  "Partly, and part of it appeared afterwards":
    "一部はそうで、一部は後から生じました",
  "real, but not this large":
    "本物ですが、ここまで大きくはありません",
  "These same women had already answered, years earlier.":
    "この同じ女性たちは、数年前にすでに答えていました。",
  "The question was answered by a different person, in a sense":
    "ある意味で、答えたのは別の人でした",
  "Every one of these women filled in the same question before anyone knew who would get melanoma. Back then the gap was thirteen points, not twenty. The women who went on to be diagnosed shifted seven points towards saying they burn; the women who were not diagnosed, answering over the same years, shifted a point the other way. Nobody's skin changed in between. What changed was that some of them had since been asked to explain a cancer:":
    "この女性たちは全員、誰がメラノーマになるか分からない時点で同じ質問に回答していました。当時の差は20ポイントではなく13ポイントでした。のちに診断された女性は、日焼けしやすいと答える方向へ7ポイント動きました。診断されなかった女性は、同じ年月のあいだに1ポイント逆へ動きました。そのあいだに肌が変わった人はいません。変わったのは、一部の人がその後、がんの理由を説明するよう求められたことです。",
  "The same women, asked twice":
    "同じ女性に、2度たずねた結果",
  "So the risk factor is real and the study still overstates it: the crude odds ratio these counts give is about 1.8 before the diagnosis and about 2.5 after it, so roughly a third of what the later study measured was not there beforehand. That is the awkward shape of recall bias. It rarely conjures an association out of nothing. It takes a true one and inflates it, which is far harder to spot, because the result still agrees with everything you already believed.":
    "つまりリスク因子は本物であり、それでもこの研究はそれを過大に見せています。これらの実数から計算される粗オッズ比は、診断前がおよそ1.8、診断後がおよそ2.5です。したがって後の研究が測ったもののおよそ3分の1は、あらかじめ存在していませんでした。これが思い出しバイアスの厄介な形です。何もないところから関連を作り出すことはまれです。本物の関連を取り上げて膨らませるので、見抜くのははるかに難しくなります。結果は、あなたがすでに信じていたことと変わらず一致するからです。",
  "What the diagnosis changed":
    "診断が変えたもの",
  "Recall bias":
    "思い出しバイアス",
  "People who know how their story ended remember the beginning differently, so asking about the past after the outcome is known measures the outcome as well as the past.":
    "自分の話がどう終わったかを知っている人は、その始まりを違うように思い出します。ですから転帰が分かったあとで過去をたずねると、過去だけでなく転帰も測ってしまいます。",
  "Nobody here is lying. Searching your memory harder because you have been given a reason to search it is an ordinary human thing to do, and the answers that come back are honestly meant. That is what makes it so hard to correct for: there is no dishonest group to exclude and no question you can ask that fixes it, because the more carefully someone thinks about it, the worse it gets.":
    "ここで嘘をついている人は誰もいません。探す理由を与えられたから記憶をより熱心に探す、というのはごく普通の人間のふるまいであり、返ってくる答えは正直なものです。だからこそ補正が難しいのです。除外すべき不誠実な集団は存在せず、これを直せる質問もありません。丁寧に考えるほど、事態は悪くなるからです。",
  "A case-control study starts from the outcome and works backwards, asking people who have a disease and people who do not what they were exposed to. It is fast, it is cheap, and for a rare disease it is often the only design that will ever be affordable. Its weakness is that one group has been given a reason to search their memory. A diagnosis prompts the question \"why me\", and the mind answers it, reaching for the sunburn, the chemical, the medicine, the difficult pregnancy. The other group has no such prompt and remembers no harder than anyone remembers anything. So the two groups are not just being compared on exposure, they are being compared on how hard they looked. The direction is usually predictable: it inflates whatever the person already suspects is to blame, which means it tends to confirm the hypothesis under test. The defences are all about not relying on memory. Take the exposure from a record written before the outcome, from a prescription database, a workplace log, a stored blood sample, a questionnaire filled in years earlier. Or build in a comparison the mechanism cannot touch, such as a second exposure question that nobody associates with the disease: if the groups drift equally on that one, the drift is not about the disease. What does not work is asking the question more carefully, and what does not work is telling people to be objective.":
    "症例対照研究は転帰から出発して過去へさかのぼり、病気のある人とない人に何に曝露したかをたずねます。速く、安く、まれな疾患では現実的に実施できる唯一の設計であることも少なくありません。弱点は、一方の群だけが記憶を探す理由を与えられていることです。診断は「なぜ自分が」という問いを呼び起こし、心はそれに答えようとして、日焼け、化学物質、薬、難しかった妊娠へと手を伸ばします。もう一方の群にはそのきっかけがなく、誰もが何かを思い出す程度にしか思い出しません。つまり2つの群は曝露だけでなく、どれだけ熱心に探したかでも比較されています。向きはたいてい予測できます。本人がすでに原因ではないかと疑っているものを膨らませるので、検証中の仮説を裏づける方向に働きがちです。対策はいずれも記憶に頼らないことに尽きます。転帰が分かる前に書かれた記録から曝露を取ること、すなわち処方データベース、職場の記録、保存された血液検体、数年前に記入された質問票です。あるいは、この機構が触れられない比較を組み込むこと、たとえば誰もその疾患と結びつけていない2つ目の曝露についての質問を加えることです。その質問で両群が同じだけずれるなら、そのずれは疾患のせいではありません。うまくいかないのは、質問をより丁寧にすることであり、客観的であるようにと人に頼むことです。",
  "The study everyone credits for this does not show it":
    "原典とされる研究は、実はそれを示していません",
  "A 1967 Finnish study is cited across the literature as the origin of recall bias. It re-interviewed mothers whose answers had been recorded during pregnancy, and its own text reports no significant difference between the mothers of affected and healthy children in how often the replies disagreed. What it does show, and spectacularly, is something else: only about a quarter of the information collected prospectively reappeared identically at re-interview, and roughly two thirds of the retrospective positive answers had no prospective record behind them, in both groups alike. That is not recall bias, it is a warning that retrospective interviews are unreliable even when nobody is biased at all.":
    "1967年のフィンランドの研究は、思い出しバイアスの起源として文献で広く引用されています。この研究は、妊娠中に回答が記録されていた母親に再度面接しました。しかし論文自身の記述では、回答が食い違う頻度に、疾患のある子の母親と健康な子の母親のあいだで有意差はありませんでした。代わりにこの研究が、しかも際立った形で示しているのは別のことです。前向きに収集された情報のうち再面接で同一の形で再現したのはおよそ4分の1にすぎず、後ろ向きの陽性回答のおよそ3分の2には対応する前向きの記録がなく、それは両群で同じでした。これは思い出しバイアスではなく、誰にもバイアスがなくても後ろ向きの面接は信頼できないという警告です。",
  "And the largest test of it found almost none":
    "そして最大の検証では、ほとんど見つかりませんでした",
  "The biggest study of this design compared what parents said in interview against what their family doctor had already written down, for 1,624 children with cancer and 2,524 without. Agreement with the records was poor in places, but it was poor in much the same way in both groups. The authors found essentially no evidence that having a sick child changed how the past was reported. Recall bias is a real mechanism and a reason to prefer records over memory. It is not a law that memory always bends, and a study is not discredited by the mere fact that it asked people to remember.":
    "この設計で最大の研究は、がんの子ども1,624人と、がんのない子ども2,524人について、親が面接で語った内容と、かかりつけ医がすでに書き残していた内容を比較しました。記録との一致は部分的に良くありませんでしたが、その悪さの様子は両群でほぼ同じでした。著者らは、子どもが病気であることが過去の報告のしかたを変えたという証拠は実質的に見いだしていません。思い出しバイアスは実在する機構であり、記憶より記録を選ぶ理由になります。しかし記憶が必ず曲がるという法則ではなく、人に思い出してもらったというだけで研究の信用が失われるわけでもありません。",
  "Recall bias, a reasoning trap.":
    "思い出しバイアス、推論の罠。",
  "Ask someone what they were exposed to before they got ill and you are not only asking about the past, you are asking someone who has been given a reason to search it. A diagnosis makes people look harder, and looking harder turns up more. In one study the same women answered the same question about their skin years apart, once before anyone knew and once after a melanoma diagnosis, and the ones who had been diagnosed had shifted. Their skin had not. This rarely invents a finding from nothing. It takes a true one and makes it look bigger, which is much harder to catch, because the answer still agrees with what you expected.":
    "病気になる前に何に曝露したかをたずねるとき、あなたは過去についてたずねているだけでなく、それを探す理由を与えられた人にたずねています。診断は人により熱心に探させ、熱心に探せばより多くが見つかります。ある研究では、同じ女性が自分の肌について同じ質問に数年の間隔をおいて答えました。1度目は誰も何も知らない時点、2度目はメラノーマの診断後です。診断された人の回答は動いていました。肌は動いていません。これが何もないところから所見を作り出すことはまれです。本物の所見を取り上げて大きく見せるので、はるかに気づきにくくなります。答えは、あなたが予想していたことと変わらず一致するからです。",
  "Two things a careful reader should know. First, the reference standard is the woman's own questionnaire filled in before diagnosis, not an external record, so this shows that the answers moved rather than which of the two answers was correct, and the authors' own conclusion is appropriately hedged: tanning ability was the one host factor whose shift was significant in the cases and not in the controls. Second, the paper prints odds ratios of 1.90 and 3.01 for this comparison. Those are the authors' own estimates and are not the crude odds ratios of these four cells, which are 1.80 and 2.55. The two pairs move in the same direction by a similar factor but they are not the same quantity, so only the crude ones, which anyone can recompute from the counts shown, appear in the text above.":
    "注意深い読者に知っておいてほしいことが2つあります。第一に、基準となるのは外部の記録ではなく、診断前に本人が記入した質問票です。したがってこれは回答が動いたことを示すのであって、2つの回答のどちらが正しかったかを示すものではありません。著者ら自身の結論も適切に留保されています。日焼けのしやすさは、症例で有意に動き、対照では動かなかった唯一の宿主因子でした。第二に、論文はこの比較についてオッズ比1.90と3.01を示しています。これらは著者ら自身の推定値であり、ここに示した4セルの粗オッズ比1.80と2.55とは別のものです。2組は同じ向きに、似た程度で動きますが、同じ量ではありません。そのため上の本文には、示された実数から誰でも計算し直せる粗オッズ比だけを載せています。",
  "Patients who were dispensed this drug died far less often than those who were not. Is the drug working?":
    "この薬を調剤された患者は、されなかった患者よりはるかに死亡が少なくなっていました。薬が効いているのでしょうか。",
  "A cohort is followed from the day each patient enters it. Anyone who is dispensed the drug at any point during follow-up counts as treated; everyone else counts as untreated. 49 percent of the treated died against 71 percent of the untreated, and the drug appears to halve the death rate.":
    "あるコホートを、各患者が組み入れられた日から追跡します。追跡期間中のいずれかの時点で薬を調剤された人は治療群、それ以外の人は非治療群として数えます。治療群の49パーセントが死亡したのに対し、非治療群では71パーセントで、薬は死亡率を半分にしているように見えます。",
  "Is that gap the drug?":
    "その差は薬によるものでしょうか。",
  "One patient from each group":
    "各群から1人ずつ",
  "months":
    "か月",
  "entered the cohort":
    "コホートに組み入れ",
  "first prescription dispensed":
    "最初の処方を調剤",
  "follow-up credited to each group":
    "各群に算入された追跡期間",
  "Counted, but death was impossible":
    "数えられたが死亡はあり得ない期間",
  "Follow-up credited to each group":
    "各群に算入された追跡期間",
  "Counted as on the drug":
    "服薬中として算入",
  "Counted as not on the drug":
    "非服薬として算入",
  "As the study counted it":
    "研究の数え方どおり",
  "Yes, the drug is keeping them alive":
    "はい、薬が生かしています",
  "half the deaths":
    "死亡が半分",
  "No, the untreated were sicker to begin with":
    "いいえ、非治療群がもともと重症でした",
  "they were never offered it":
    "そもそも投与されませんでした",
  "No, some of that time could not contain a death":
    "いいえ、死亡があり得ない期間が含まれます",
  "the clock was started too early":
    "時計を早く回し始めています",
  "Half the treated group's follow-up was time in which nobody could die.":
    "治療群の追跡期間の半分は、誰も死にようがない時間でした。",
  "Surviving is what put them in the treated group":
    "治療群に入れたのは、生き延びたからです",
  "This patient was counted as treated from the day they entered, but the prescription was not dispensed until month 11. Those eleven months are immortal: had the patient died in month 6, no prescription would ever have been written and they would have been counted in the other group instead. Death was not merely unlikely in that stretch, it was impossible by the way the groups were defined, and it is credited to the drug all the same:":
    "この患者は組み入れの日から治療群として数えられていますが、処方が調剤されたのは11か月目でした。この11か月は不死の期間です。もし6か月目に亡くなっていれば処方は一度も書かれず、この患者はもう一方の群に数えられていたはずです。この区間で死亡は起こりにくかったのではなく、群の定義のしかたによってあり得なかったのです。それでもこの期間は、同じように薬の側に算入されています。",
  "The same follow-up, marked":
    "同じ追跡期間に印をつけたもの",
  "Nothing about the patients has to differ for this to work. Give both groups exactly the same drug, the same illness and the same luck, and the treated group will still come out ahead, because it has been handed a run of guaranteed survival that the other group cannot have. In the published example this is drawn from, the treated group was credited with 291.1 immortal person-years against 276.3 person-years in which it was genuinely at risk: more of its follow-up was impossible-to-die time than was real. Correcting only that moved the hazard ratio from 0.48 to 0.91.":
    "これが働くために、患者どうしが違っている必要はまったくありません。両群にまったく同じ薬、同じ病気、同じ運を与えても、治療群はやはり優れて見えます。もう一方の群には持ちようのない、生存が保証された期間を渡されているからです。この例のもとになった論文では、治療群に不死の291.1人年が算入され、本当にリスクにさらされていたのは276.3人年でした。つまり追跡期間のうち、死にようがない時間のほうが実際の時間より長かったのです。そこだけを補正すると、ハザード比は0.48から0.91に動きました。",
  "The stretch before the prescription":
    "処方までの区間",
  "Immortal time bias":
    "不死時間バイアス",
  "If being in a group requires surviving until something happens, then the time before it happened cannot contain a death, and counting it towards that group manufactures survival out of bookkeeping.":
    "ある群に入る条件が、何かが起きるまで生きていることであるなら、それが起きる前の期間に死亡は含まれ得ません。その期間をその群に算入すれば、帳簿の付け方から生存が作り出されます。",
  "The tell is a group defined by something that occurs after follow-up starts: filled the prescription, had the operation, responded to treatment, won the award, completed the course. Ask what happens to a person who dies the day before. If they land in the comparison group, the clock is wrong. The fix is not a cleverer adjustment: it is to count each person's time as unexposed until the moment they become exposed, and let them switch.":
    "見分ける手がかりは、追跡開始後に起きる出来事で群が定義されていることです。処方を受け取った、手術を受けた、治療に反応した、賞を取った、コースを修了した、といった定義です。その前日に亡くなった人がどう扱われるかを問うてください。その人が比較群に入るなら、時計の始点が誤っています。解決はより巧妙な調整ではありません。各人の時間を、曝露になる瞬間までは非曝露として数え、その時点で移せるようにすることです。",
  "Cohort studies compare rates, and a rate is deaths divided by time at risk. That denominator is where this hides. Suppose you want to know whether a drug helps, so you follow everyone admitted to hospital and sort them afterwards by whether they were ever dispensed it. The sorting looks innocent, but it uses information from the future: to be dispensed a drug in month 11, you must be alive in month 11. So every patient in the treated group is guaranteed to have survived to their own first prescription, and if you start their clock at admission you credit the treated group with all of that guaranteed survival. The untreated group gets no such gift, because it is where the early deaths necessarily land. The bias is large, it always points the same way, it makes useless drugs look protective, and it does not shrink with a bigger sample, because it is not noise. It also has nothing to do with confounding, which is why adjusting for how ill the patients were does not touch it: you can simulate the whole thing with identical patients and a drug that does nothing. The correct handling is standard and unglamorous. Treat exposure as time-varying: every patient contributes unexposed time from entry until their first prescription and exposed time after it, so nobody is credited to a group before they belong to it. The same trap sits under any claim built on people who finished something, from Academy Award winners living longer than nominees to patients who completed a rehabilitation programme, and in each case the first question is the same: what happens in these numbers to the person who died in the middle?":
    "コホート研究は率を比較し、率とは死亡数をリスクにさらされた時間で割ったものです。この分母にこそ、この問題は隠れています。ある薬が役に立つかを知りたくて、入院した全員を追跡し、その後、薬を一度でも調剤されたかどうかで振り分けるとします。この振り分けは無害に見えますが、未来の情報を使っています。11か月目に薬を調剤されるには、11か月目に生きていなければなりません。したがって治療群の患者は全員、自分の最初の処方まで生き延びたことが保証されており、時計を入院日から回し始めれば、その保証された生存のすべてを治療群に算入することになります。非治療群にその贈り物はありません。早期の死亡は必ずそちらに落ちるからです。このバイアスは大きく、つねに同じ向きを指し、役に立たない薬を予防的に見せ、標本を大きくしても縮みません。雑音ではないからです。交絡とも関係がないので、患者がどれだけ重症だったかを調整しても手が届きません。まったく同じ患者と、何もしない薬でこの現象をそのままシミュレーションできます。正しい扱いは標準的で、地味です。曝露を時間依存として扱うのです。すべての患者は、組み入れから最初の処方までを非曝露の時間として、その後を曝露の時間として提供します。こうすれば、誰もその群に属する前からその群に算入されることはありません。同じ罠は、何かをやり遂げた人をもとに組み立てられたあらゆる主張の下にひそんでいます。アカデミー賞の受賞者がノミネートされただけの人より長生きするという話から、リハビリテーションのプログラムを完了した患者の話まで同じです。どの場合も最初の問いは同じです。途中で亡くなった人は、この数字のなかでどう扱われているのでしょうか。",
  "The Oscar winners who did not, after all, live longer":
    "結局は長生きしていなかったオスカー受賞者",
  "A well-known study reported that Academy Award winners outlived the actors merely nominated alongside them by nearly four years, and it was widely read as evidence that status is good for your health. But an actor cannot win an award while dead, so every winner was credited with all the years before their win, whereas a nominee who died young could only ever be a nominee. Reanalysing the same data with the award treated as something that happens partway through a life, rather than a property of the whole life, cut the advantage to about a year and it was no longer statistically significant. The original authors later published a null result of their own.":
    "よく知られた研究は、アカデミー賞の受賞者が、同じ年にノミネートされただけの俳優より4年近く長く生きたと報告し、地位が健康に良い証拠として広く読まれました。しかし俳優は亡くなった状態で受賞することはできません。ですから受賞者は受賞までのすべての年数を算入され、若くして亡くなったノミネート者は、どうやってもノミネート者のままです。同じデータを、受賞を人生全体の属性ではなく人生の途中で起きる出来事として扱って再解析すると、差はおよそ1年に縮み、統計学的に有意ではなくなりました。元の著者らも、のちに自ら差がないという結果を発表しています。",
  "Immortal time bias, a reasoning trap.":
    "不死時間バイアス、推論の罠。",
  "Sort people into groups by something that happens later, and one of those groups gets a hidden head start. To be counted as having taken the drug, you have to live long enough to be given it. So everybody in the treated group is guaranteed to have survived up to their first prescription, and if you count that stretch towards the drug, the drug is credited with survival it had nothing to do with. Anyone who died early is automatically filed under untreated. It works even when the drug does nothing at all, it always points the same way, and a bigger study only makes it more convincing.":
    "あとから起きる出来事で人を群に振り分けると、一方の群に隠れた先行が与えられます。薬を飲んだと数えられるには、それを渡されるまで生きていなければなりません。ですから治療群の全員は、最初の処方まで生き延びたことが保証されています。その区間を薬の側に数えれば、薬は自分と関係のない生存を手柄にすることになります。早く亡くなった人は自動的に非治療群に分類されます。これは薬がまったく何もしなくても働き、つねに同じ向きを指し、研究を大きくすればするほど説得力だけが増します。",
  "The figure above is schematic, like the bomber diagram: two illustrative patients rather than two rows of the dataset, with proportions chosen to echo the published ones (eleven immortal months out of twenty-two counted, against 291.1 immortal person-years out of 567.4 counted, which is 51.3 percent). The numbers that are claims about the world, the death counts and the two hazard ratios, are all in the citation above and none of them is recomputed here: the hazard ratios come from survival models rather than from any two-by-two table, and the paper is a methodological reanalysis in which several cohort definitions are applied to one dataset, so the row is named exactly.":
    "上の図は、爆撃機の図と同じく模式図です。データセットの2行ではなく、説明のための2人の患者であり、比率は公表値に対応するように選んでいます（算入された22か月のうち11か月が不死の期間であり、これは算入された567.4人年のうち291.1人年が不死の期間、すなわち51.3パーセントに対応します）。世界についての主張である数値、つまり死亡数と2つのハザード比は、いずれも上の出典に記載されており、ここで再計算したものは1つもありません。ハザード比は2×2の表からではなく生存モデルから得られたものであり、この論文は1つのデータセットに複数のコホート定義を当てはめた方法論的な再解析なので、どの行かを正確に示しています。",
  "A weight-loss trial randomly assigns 400 people to a programme or to usual care. It reports the average weight lost among the 180 programme participants who attended at least eight sessions, and among all 200 controls. The programme wins comfortably.":
    "ある減量試験が400人を、プログラム群か通常ケア群にランダムに割り付けます。報告されているのは、8回以上のセッションに参加したプログラム群180人の平均減量と、対照群200人全員の平均減量です。プログラムが余裕をもって上回ります。",
  "One arm has been filtered and the other has not. Attending eight sessions is something people who were doing well were more able to do, so the programme group has quietly been reduced to its successes while the control group keeps everybody.":
    "一方の群だけがふるいにかけられ、もう一方はそのままです。8回のセッションに参加できたのは、うまくいっていた人ほど可能だったことなので、プログラム群は静かに成功例だけに絞られ、対照群は全員を保っています。",
  "In a surgical trial, some patients assigned to medication deteriorate and are operated on anyway. The analysis counts each patient under the treatment they ended up receiving, and finds surgery ahead.":
    "ある手術の試験で、薬物療法に割り付けられた一部の患者が悪化し、結局手術を受けます。解析は各患者を最終的に受けた治療のもとで数え、手術が優れているという結果になります。",
  "Switching happened after the coin flip and for a reason: those patients had to survive long enough to reach the operating table. Counting people by what they received rather than what they were assigned sorts them by how they were doing, which is the thing being measured.":
    "切り替えはコイン投げのあとに、理由があって起きています。その患者たちは手術台にたどり着くまで生きていなければなりませんでした。割り付けではなく実際に受けた治療で人を数えることは、その人の状態によって仕分けることであり、その状態こそ測定しているものです。",
  "A trial of a daily tablet excludes anyone who took less than 80 percent of their doses, on the grounds that the question is whether the drug works when actually taken. Both arms are filtered the same way.":
    "1日1回の錠剤の試験が、処方量の80パーセント未満しか服用しなかった人を除外します。問うているのは実際に服用したときに薬が効くかどうかだから、という理由です。両群は同じ基準でふるいにかけられます。",
  "Filtering both arms identically does not repair it. Who manages to take 80 percent of their tablets differs by how well they are and by much else besides, so each arm loses a different kind of patient and the groups the coin made no longer exist.":
    "両群を同じようにふるいにかけても、これは直りません。錠剤の80パーセントを飲めるのがどんな人かは、体調によっても、ほかの多くの要因によっても変わります。そのため各群は違う種類の患者を失い、コインが作った群はもう存在しません。",
  "A trial reports that among patients who completed the full twelve months, the new drug halved relapses. A quarter of that arm withdrew before twelve months and are not counted.":
    "ある試験は、12か月を完了した患者のなかで新薬が再発を半減させたと報告します。その群の4分の1は12か月より前に脱落し、数えられていません。",
  "People usually withdraw for a reason, and relapsing is one of the commonest. An analysis of completers can turn the drug's failures into people who simply are not in the table.":
    "人が脱落するのはたいてい理由があり、再発はそのうち最も多いものの1つです。完了者だけの解析は、薬の失敗を、単に表に載っていない人へと変えてしまいます。",
  "Mothers of babies born with a heart defect are interviewed about what they took during pregnancy, alongside mothers of healthy babies. The mothers of affected babies report far more medicine use in the first trimester, and a report concludes the medicines are implicated.":
    "心奇形をもって生まれた赤ちゃんの母親と、健康な赤ちゃんの母親に、妊娠中に何を服用したかを面接でたずねます。心奇形の児の母親は妊娠初期の薬の使用をはるかに多く報告し、ある報告はその薬が関与していると結論します。",
  "One group has spent months being asked what went wrong and searching for it. The other has had no reason to think about the first trimester at all. The comparison is partly of what was taken and partly of how hard each group looked.":
    "一方の群は、何がいけなかったのかを何か月も問われ、探し続けてきました。もう一方には、妊娠初期について考える理由がまったくありませんでした。この比較は、一部は何を服用したかの比較であり、一部はどれだけ熱心に探したかの比較です。",
  "People with a brain tumour and people without are asked how many hours a week they used a mobile phone ten years ago, and on which side of the head. Those with a tumour report more hours, and more often on the side the tumour is on.":
    "脳腫瘍のある人とない人に、10年前に週何時間、頭のどちら側で携帯電話を使っていたかをたずねます。腫瘍のある人はより長い時間を報告し、腫瘍のある側だと答えることも多くなります。",
  "Nobody can accurately recall a decade of phone habits, so the gap is filled in, and the tumour tells them which side to fill it in on. Billing records would settle it; memory cannot.":
    "10年分の通話の習慣を正確に思い出せる人はいないので、隙間は埋められます。そしてどちら側で埋めるかは腫瘍が教えます。通話明細の記録なら決着がつきますが、記憶ではつきません。",
  "After a bowel cancer diagnosis, patients are asked to describe their diet over the previous twenty years, and their answers are compared with those of healthy volunteers of the same age.":
    "大腸がんの診断後、患者は過去20年間の食事を説明するよう求められ、その回答が同年代の健康なボランティアの回答と比較されます。",
  "The patients have already been told which foods are suspected, and are reconstructing twenty years around a diagnosis. The volunteers are reconstructing twenty years around nothing in particular.":
    "患者はどの食品が疑われているかをすでに聞かされており、診断を中心に20年を組み立て直しています。ボランティアは、特に何もない20年を組み立て直しています。",
  "Workers making a compensation claim for back pain are asked how heavy their lifting used to be, and their answers are compared with those of colleagues who made no claim.":
    "腰痛で補償を申請している労働者に、以前どれくらい重いものを持ち上げていたかをたずね、その回答を申請していない同僚の回答と比較します。",
  "Both groups did the same job. Only one has spent months assembling an account of how demanding it was, and that account is what is being measured.":
    "両群は同じ仕事をしていました。しかし一方だけが、その仕事がどれほどきつかったかの説明を何か月もかけて組み立ててきました。そして測られているのは、その説明です。",
  "A registry compares patients who received a transplant with those on the waiting list who did not, counting each patient's survival from the day they joined the list. The transplanted group lives far longer.":
    "ある登録データが、移植を受けた患者と、待機リストにいて受けなかった患者を比較し、各患者の生存をリストに登録された日から数えます。移植群のほうがはるかに長く生きています。",
  "To be transplanted you must survive until an organ arrives, so everyone in that group is guaranteed to have lived from listing to surgery. Anyone who dies while waiting can only ever be in the other group.":
    "移植を受けるには臓器が来るまで生きていなければならないので、その群の全員は登録から手術まで生きていたことが保証されます。待機中に亡くなった人は、どうやってももう一方の群にしか入りません。",
  "A hospital reports that patients who completed the full six-week rehabilitation course had better one-year survival than those who did not, measured from the day of admission.":
    "ある病院が、6週間のリハビリテーションコースを完了した患者は、完了しなかった患者より1年生存が良かったと報告します。生存は入院日から測っています。",
  "Completing six weeks requires being alive for six weeks. The comparison group collects everyone who died in the meantime, and the course is credited with those first six weeks of guaranteed survival.":
    "6週間を完了するには、6週間生きている必要があります。比較群にはそのあいだに亡くなった人が全員集まり、最初の6週間という保証された生存はコースの手柄になります。",
  "Using a prescription database, researchers classify each patient as a drug user if they were ever dispensed it during follow-up, and count follow-up from the date of their hospital discharge.":
    "処方データベースを用いて、研究者は追跡期間中に一度でも薬を調剤された患者を服薬者と分類し、追跡期間を退院日から数えます。",
  "The classification uses the future. Time between discharge and the first dispensing cannot contain a death for anyone counted as a user, yet it is credited to the drug. Counting each patient as unexposed until their first prescription removes it.":
    "この分類は未来の情報を使っています。服薬者と数えられた人にとって、退院から最初の調剤までの期間に死亡は含まれ得ませんが、その期間は薬の側に算入されています。各患者を最初の処方までは非曝露として数えれば、これは取り除けます。",
  "An oncology paper reports that patients whose tumour responded to chemotherapy survived longer than non-responders, timing survival from the start of treatment. Response was assessed after three cycles.":
    "ある腫瘍学の論文が、化学療法に腫瘍が反応した患者は非反応者より長く生存したと報告し、生存を治療開始時から測っています。反応の評価は3サイクル後に行われました。",
  "You cannot be classed as a responder unless you live to the assessment after three cycles. Patients who die during the first two cycles are all non-responders by construction, so the responder group starts with survival built into it.":
    "3サイクル後の評価まで生きていなければ、反応者に分類されることはありません。最初の2サイクルのあいだに亡くなった患者は、定義上すべて非反応者です。したがって反応者の群には、はじめから生存が組み込まれています。",
  "A drug-safety study counts each patient as untreated from enrolment until the day of their first prescription, and as treated from that day onwards, so a patient can contribute time to both groups.":
    "ある薬剤安全性研究は、各患者を組み入れから最初の処方の日までは非治療、その日以降は治療として数えます。したがって1人の患者が両方の群に時間を提供できます。",
  "Nobody is credited to a group before they belong to it, so no stretch of guaranteed survival is handed to the treated group. This is the standard fix, correctly applied.":
    "その群に属する前から算入される人はいないので、保証された生存の区間が治療群に渡されることもありません。これは標準的な解決法が正しく適用された例です。",
  "A study of patients who completed a course of treatment starts everyone's clock at the end of the course, and excludes anyone who died before that point from both groups alike.":
    "治療コースを完了した患者を対象とする研究が、全員の時計をコース終了時から回し始め、その時点より前に亡くなった人を両群から同じように除外します。",
  "Starting the clock after the point where group membership was settled means neither group can be credited with survival it was guaranteed. It costs some early data, and it removes the head start.":
    "群への所属が決まった時点より後から時計を回し始めれば、どちらの群も保証された生存を算入されません。初期のデータは失われますが、先行は取り除かれます。",
  "A study of a drug taken in pregnancy takes the exposure from the national prescription database rather than from interviews, then compares outcomes. Neither the mothers nor the researchers supplied the exposure data.":
    "妊娠中に服用した薬に関する研究が、曝露を面接ではなく全国の処方データベースから取り、その後に転帰を比較します。曝露データを提供したのは、母親でも研究者でもありません。",
  "The exposure was written down before anyone knew the outcome, by someone with no stake in it. That is the standard defence against memory bending, and here it was used.":
    "曝露は、転帰を誰も知らない時点で、利害のない人によって記録されていました。それが記憶の歪みに対する標準的な防御であり、ここではそれが用いられています。",
  "A case-control study asks about the suspected exposure and also about a second, unrelated one that nobody associates with the disease. Both groups report the second one at the same rate, and the authors say so before reporting the first.":
    "ある症例対照研究が、疑われている曝露に加えて、誰もその疾患と結びつけていない無関係な2つ目の曝露についてもたずねます。2つ目は両群で同じ割合で報告され、著者らは1つ目を報告する前にそのことを述べています。",
  "The second question is a control for the searching itself. If one group were simply remembering harder across the board, it would show up there too, and it did not.":
    "2つ目の質問は、記憶を探す行為そのものに対する対照です。一方の群が全般に熱心に思い出しているだけなら、その質問にも現れるはずですが、現れませんでした。",
  "A trial's main result counts every patient in the group they were randomly assigned to, including the 40 who never started the treatment. A per-protocol analysis is reported alongside it, agrees with it, and is labelled as secondary.":
    "ある試験の主要結果は、治療を一度も開始しなかった40人も含めて、全患者をランダムに割り付けられた群のまま数えています。per protocol解析も併せて報告され、結果は一致しており、副次的な解析と明示されています。",
  "The randomised comparison is the one the conclusion rests on, the other is shown for completeness, and the two agree. That is how both analyses are supposed to be used.":
    "結論が乗っているのはランダム化どおりの比較で、もう一方は補足として示され、2つは一致しています。これが両方の解析の本来の使い方です。",
  "A trial testing whether a simpler regimen is no worse than the standard one reports both analyses, notes that counting non-adherent patients in their assigned group tends to make two treatments look alike, and declines to claim non-inferiority because only one of the two analyses supports it.":
    "より簡便なレジメンが標準レジメンに劣らないかを検証する試験が、両方の解析を報告し、アドヒアランスの悪い患者を割り付けられた群のまま数えると2つの治療が似て見えやすくなることを指摘したうえで、2つの解析のうち1つしか支持していないため非劣性の主張を控えています。",
  "Counting everyone as assigned is conservative when you are trying to show a difference and permissive when you are trying to show similarity, so a non-inferiority claim needs both analyses to agree. Refusing to claim it when they disagree is the careful move, not the trap.":
    "割り付けどおりに全員を数えることは、差を示そうとするときには保守的に働き、同等性を示そうとするときには甘く働きます。ですから非劣性の主張には、両方の解析が一致することが必要です。一致しないときに主張を控えるのは慎重な判断であり、罠ではありません。",

  // ---- intention to treat, recall bias, immortal time ----
  "Two players are compared over a season. Player A made 35% of all shots and Player B made 65%, and the coach's report names B the more accurate shooter. Sorted into close shots and long shots, A had the higher percentage in both.":
    "1シーズンを通じて2人の選手を比較します。選手Aは全シュートの35%を決め、選手Bは65%を決めており、コーチの報告書はBをより正確なシューターとしています。近距離シュートとロングシュートに分けると、Aはどちらでも成功率が高くなっていました。",
  "Almost all of B's attempts were close range, where anyone scores often, while A shot mostly from distance, so the pooled percentages record where the shots were taken from rather than who shoots better.":
    "Bの試投はほぼすべてが近距離で、誰でもよく決まる位置でした。一方Aは大半を遠距離から打っていたため、合算した成功率は誰がうまいかではなく、どこから打ったかを記録しています。",
  "A company reviews last year's applications. Overall 70% of outside applicants were hired against 40% of internal ones, and a manager tells the board the process quietly favours outsiders. Team by team, internal applicants were hired at the higher rate in both the engineering team and the sales team.":
    "ある会社が昨年の応募を見直します。全体では社外応募者の70%が採用されたのに対し社内応募者は40%で、ある管理職は取締役会に、選考は密かに社外の人を優遇していると伝えます。チーム別に見ると、エンジニアリングチームでも営業チームでも社内応募者の採用率のほうが高くなっていました。",
  "Outside applicants went mainly to engineering, which was hiring heavily, while internal ones applied mainly to sales, where almost nobody was being taken on, so the pooled figures compare which team people applied to.":
    "社外応募者は大量採用中のエンジニアリングに集中し、社内応募者はほとんど採用のなかった営業に集中していたため、合算した数字はどのチームに応募したかを比べています。",
  "A team replaces its sign up page. The new page signs up 35% of visitors against the old page's 13%, and the product lead calls it a clear win. Looked at separately, the old page did better among desktop visitors and better among phone visitors.":
    "あるチームが登録ページを刷新します。新ページは訪問者の35%を登録に結びつけ、旧ページは13%で、プロダクト責任者は明確な勝利だとしています。分けて見ると、旧ページはパソコンからの訪問者でも、スマートフォンからの訪問者でも成績が上でした。",
  "The old page was seen mostly by phone visitors, who rarely sign up on either version, and the new one mostly by desktop visitors, who sign up often, so the overall gap tracks the audience mix.":
    "旧ページはどちらの版でもめったに登録しないスマートフォン訪問者が中心で、新ページはよく登録するパソコン訪問者が中心でした。したがって全体の差は訪問者の構成を反映しています。",
  "Two customer service centres are compared. One settles 85% of calls at the first attempt and the other 54%, so the bonus goes to the first. Broken into routine calls and complicated ones, the second centre settles the higher share of each.":
    "2つのカスタマーサービスセンターを比較します。一方は電話の85%を一度で解決し、もう一方は54%であるため、賞与は前者に出ます。定型的な電話と複雑な電話に分けると、後者のセンターがどちらでも高い割合で解決していました。",
  "Nearly all of the second centre's work is complicated calls, which are hard to settle at once, while the first handles mostly routine ones, so the combined rate compares workloads rather than skill.":
    "後者のセンターの業務はほぼすべてが一度では解決しにくい複雑な電話で、前者は大半が定型的な電話です。合算した解決率は技能ではなく業務内容を比べています。",
  "A chain compares two hotels on guest ratings. One averages 4.3 out of 5 and the other 3.3, and head office holds the second up as the weaker property. Among business guests the second scores higher, and among holiday guests it scores higher too.":
    "あるチェーンが2つのホテルを宿泊者評価で比較します。一方は5点満点で平均4.3、もう一方は3.3で、本社は後者を弱いホテルとして扱います。ビジネス客の間では後者の評価が高く、観光客の間でも後者が高くなっています。",
  "Almost all of the lower rated hotel's reviews come from business guests, who mark every hotel down, while the other's come mostly from holidaymakers, who mark everything up, so the averages compare who was reviewing.":
    "評価が低いホテルのレビューはほぼすべて、どのホテルにも辛い点をつけるビジネス客からのもので、もう一方は甘い点をつける観光客が中心です。平均点は誰が評価したかを比べています。",
  "A cooperative compares two seed varieties across its members' fields. One averaged 5.6 tonnes a hectare and the other 2.6, and the newsletter recommends the first. On clay ground the second variety yielded more, and on sandy ground it yielded more as well.":
    "ある協同組合が組合員の圃場で2つの品種を比較します。一方は1ヘクタール当たり平均5.6トン、もう一方は2.6トンで、会報は前者を推奨します。粘土質の土地では後者の品種の収量が多く、砂質の土地でも後者が多くなっていました。",
  "The lower yielding variety was sown almost entirely on sandy ground, which grows little of anything, and the other almost entirely on clay, so the averages mostly record where each seed was planted.":
    "収量の低い品種はほぼすべて何を植えても育ちにくい砂質の土地に播かれ、もう一方はほぼすべて粘土質に播かれていました。平均値は主にどこに播かれたかを記録しています。",
  "Two courier firms report on time delivery. One arrives on time for 92% of parcels and the other for 72%, so a retailer moves its contract to the first. Counting town deliveries and country deliveries separately, the second firm is on time more often in both.":
    "2つの宅配業者が定時配達を報告します。一方は荷物の92%、もう一方は72%が時間どおりに届くため、ある小売業者は契約を前者に移します。市街地配達と郊外配達を分けて数えると、後者の業者がどちらでも定時率が高くなっています。",
  "The firm with the worse headline figure carries nearly all the country parcels, which run late for everyone, while the other carries mostly short town runs, so the combined rate reflects the routes each was given.":
    "表向きの数字が悪い業者は、誰が運んでも遅れがちな郊外の荷物をほぼすべて担当し、もう一方は市街地の短い配達が中心です。合算した定時率は割り当てられた配送路を反映しています。",
  "A screening test at an amateur athletics meeting catches 99% of competitors who have used a banned substance and wrongly flags 1% of those who have not. About 1 competitor in 500 has used one. A commentator says a flagged athlete is 99% certain to be guilty.":
    "アマチュア陸上競技会のスクリーニング検査は、禁止物質を使用した競技者の99%を検出し、使用していない競技者の1%を誤って陽性とします。使用者はおよそ500人に1人です。ある解説者は、陽性となった選手は99%の確率で違反していると述べます。",
  "Clean competitors outnumber users 499 to 1, so flagging one percent of them yields roughly five wrong flags for every real one, and most flagged athletes have taken nothing.":
    "使用していない競技者は使用者の499倍いるため、その1%を陽性とすると、本当の1件につきおよそ5件の誤った陽性が出ます。陽性となった選手の大半は何も使っていません。",
  "A bank's monitoring catches essentially every fraudulent card payment and wrongly flags 1 legitimate payment in 200. About 1 payment in 10,000 is fraudulent. A manager proposes freezing the account of anyone whose payment is flagged, saying almost all of them are frauds.":
    "ある銀行の監視システムは不正なカード決済をほぼすべて検出し、正当な決済200件に1件を誤って検出します。不正な決済はおよそ10,000件に1件です。ある管理職は、検出された決済の口座はすべて凍結すべきだと提案し、そのほとんどは不正だと述べます。",
  "For each fraudulent payment there are about 10,000 legitimate ones, and half a percent of those is roughly 50 wrong flags per real fraud, so nearly every frozen account belongs to an ordinary customer.":
    "不正な決済1件につき正当な決済がおよそ10,000件あり、その0.5%は本当の不正1件につきおよそ50件の誤検出になります。凍結された口座のほぼすべては通常の顧客のものです。",
  "A university's text checking tool is 98% accurate in both directions. About 1 essay in 200 is genuinely copied. The disciplinary panel tells every student it flags that there is a 98% chance they copied.":
    "ある大学の文章照合ツールは、どちらの方向でも98%の精度です。実際に写しているレポートはおよそ200本に1本です。懲戒委員会は、検出されたすべての学生に写した確率は98%だと告げます。",
  "Honest essays outnumber copied ones 199 to 1, so two percent of them produces about four wrong flags for every real one, and a flagged student is more likely innocent than not.":
    "正直に書かれたレポートは写したものの199倍あるため、その2%は本当の1件につきおよそ4件の誤検出を生みます。検出された学生は潔白である可能性のほうが高くなります。",
  "A camera on a production line spots 95% of faulty units and wrongly rejects 3% of good ones. About 1 unit in 1,000 leaves the line faulty. The plant manager scraps every rejected unit, saying almost all of them must be defective.":
    "製造ラインのカメラは不良品の95%を発見し、良品の3%を誤って排除します。ラインから出る製品のうち不良はおよそ1,000個に1個です。工場長は排除された製品をすべて廃棄し、そのほとんどは不良に違いないと述べます。",
  "Good units outnumber faulty ones about 1,000 to 1, so rejecting three percent of them discards roughly thirty sound units for every faulty one caught.":
    "良品は不良品のおよそ1,000倍あるため、その3%を排除すると、捕らえた不良1個につきおよそ30個の良品を捨てることになります。",
  "A water company's sensors are right 95% of the time when they call a pipe section leaking or sound. About 1 section in 400 leaks in a given year. The operations plan assumes crews will find a leak at nearly every flagged section.":
    "ある水道会社のセンサーは、管路区間を漏水ありとも健全とも判定する際に95%の確率で正しい判定を出します。ある年に漏水する区間はおよそ400区間に1区間です。運用計画は、検出された区間のほぼすべてで作業班が漏水を見つけると想定しています。",
  "Sound sections outnumber leaking ones 399 to 1, so the five percent of them wrongly called leaking gives about twenty wasted excavations for every genuine leak.":
    "健全な区間は漏水区間の399倍あるため、その5%が誤って漏水ありとされると、本当の漏水1件につきおよそ20回の無駄な掘削が生じます。",
  "A retailer screens applicants with a questionnaire that correctly identifies 90% of people who would steal stock and wrongly flags 10% of those who would not. About 1 applicant in 100 would steal. The hiring team rejects everyone flagged, saying nine in ten of them are thieves.":
    "ある小売業者は、商品を盗む人の90%を正しく判別し、盗まない人の10%を誤って判別する質問票で応募者をスクリーニングします。盗む応募者はおよそ100人に1人です。採用チームは判別された応募者を全員不採用とし、その10人に9人は窃盗者だと述べます。",
  "Honest applicants outnumber the rest 99 to 1, so flagging a tenth of them turns away about eleven blameless people for every one who would have stolen.":
    "正直な応募者はそれ以外の99倍いるため、その10分の1を判別すると、盗んだであろう1人につきおよそ11人の罪のない人を退けることになります。",
  "A company's mail filter is 99% accurate at telling phishing from ordinary mail. About 1 arriving message in 3,000 is phishing. The security lead tells staff that anything the filter quarantines is almost certainly an attack.":
    "ある会社のメールフィルターは、フィッシングと通常のメールを99%の精度で見分けます。受信するメールのうちフィッシングはおよそ3,000通に1通です。セキュリティ責任者は社員に、フィルターが隔離したものはほぼ確実に攻撃だと伝えます。",
  "Ordinary messages outnumber phishing ones about 3,000 to 1, so the one percent of them wrongly quarantined outnumbers the real attacks by roughly thirty to one.":
    "通常のメールはフィッシングのおよそ3,000倍あるため、その1%が誤って隔離されると、本当の攻撃をおよそ30対1で上回ります。",
  "An insurer finds that drivers who have fitted a dashboard camera claim for accidents far less often than drivers who have not. Its marketing team announces that fitting a camera makes you a safer driver, and offers a discount to anyone who installs one.":
    "ある保険会社は、ドライブレコーダーを取り付けた運転者は取り付けていない運転者よりも事故の請求がはるかに少ないことを見つけます。マーケティング部門は、カメラを付ければ運転が安全になると発表し、設置した人に割引を提供します。",
  "Cautious drivers are the ones who buy the cameras in the first place, so the camera marks out a type of driver rather than changing how anyone drives.":
    "そもそもカメラを買うのは慎重な運転者であり、カメラは運転の仕方を変えるのではなく、ある種類の運転者を示しているだけです。",
  "A consultant surveys firms and reports that those with the largest customer support teams receive the most complaints. The write up advises keeping support teams small so that complaints stay down.":
    "あるコンサルタントが企業を調査し、カスタマーサポート部門が最も大きい企業ほど苦情が多いと報告します。報告書は、苦情を抑えるためにサポート部門を小さく保つよう助言します。",
  "Firms staff up because complaints are already arriving, so the arrow runs from complaints to headcount, and larger firms generate more of both anyway.":
    "企業はすでに苦情が来ているから人員を増やすのであり、矢印は苦情から人数へ向かいます。そもそも大きな企業ほどどちらも多くなります。",
  "An energy supplier reports that homes with a smart thermostat use a fifth less gas than homes without one. Its advertising says the thermostat cuts your gas use by a fifth.":
    "あるエネルギー供給会社は、スマートサーモスタットのある家庭はない家庭よりガス使用量が5分の1少ないと報告します。広告では、サーモスタットがガス使用量を5分の1減らすとしています。",
  "The households that install one tend to have newer, better insulated homes and an existing interest in trimming bills, so the comparison is between two kinds of household as much as two thermostats.":
    "設置する世帯は新しく断熱の良い住宅に住み、もともと光熱費を抑えることに関心がある傾向があります。この比較は2種類のサーモスタットの比較であると同時に、2種類の世帯の比較でもあります。",
  "A motoring column notes that stretches of road with fixed speed cameras record more crashes than stretches without them, and argues that the cameras distract drivers into crashing.":
    "ある自動車コラムは、固定式速度取締カメラのある区間は、ない区間より事故が多く記録されていると指摘し、カメラが運転者の注意をそらして事故を起こさせていると論じます。",
  "Cameras are installed on stretches that already had a bad crash record, so the crashes came first and chose the camera sites rather than the other way round.":
    "カメラはすでに事故の多い区間に設置されるため、事故が先にあり、それがカメラの設置場所を決めています。順序は逆です。",
  "A gym newsletter reports that members who use the sauna after training take fewer sick days than members who do not, and concludes that ten minutes in the sauna strengthens the immune system.":
    "あるジムの会報は、トレーニング後にサウナを使う会員は使わない会員より病欠が少ないと報告し、サウナに10分入ると免疫が強くなると結論づけます。",
  "Members with the time and habit to stay on for the sauna are the ones training regularly and in better health already, so sauna use is a marker of that group rather than a cause.":
    "サウナに残る時間と習慣がある会員は、もともと定期的に運動していて健康状態も良い人たちです。サウナの利用は原因ではなく、その集団の目印です。",
  "A trend piece points out that over eleven years national sales of houseplants and of noise cancelling headphones rose almost in step, and suggests the houseplant boom is what pushed people to buy headphones.":
    "ある流行記事は、11年間で観葉植物とノイズキャンセリングヘッドホンの全国売上がほぼ足並みをそろえて伸びたと指摘し、観葉植物の流行が人々にヘッドホンを買わせたと示唆します。",
  "Both climbed alongside the same rise in city renting and spending on home comfort, and any two quantities that drift steadily upward will track each other whatever is driving them.":
    "どちらも都市部の賃貸住まいと住空間への支出という同じ増加とともに伸びました。着実に上昇する2つの量は、何が動かしていようと互いに連動して見えます。",
  "A plant manager notices that shifts where the radio is playing turn out fewer defective units, and orders music to be played on every shift to bring the defect rate down.":
    "ある工場長は、ラジオが流れているシフトのほうが不良品が少ないことに気づき、不良率を下げるため全シフトで音楽を流すよう指示します。",
  "The radio happens to be on during day shifts, which are staffed by the longest serving operators working the easier product runs, so experience and workload are what separate the shifts.":
    "ラジオがついているのはたまたま日勤で、日勤には勤続年数の長い作業者が入り、扱いやすい製品を生産しています。シフトを分けているのは経験と作業内容です。",
  "An investment firm's brochure lists the twenty funds it offers today and reports that the average one has beaten the market over the past ten years. The sales team presents this as proof of the firm's stock-picking skill.":
    "ある投資会社のパンフレットは、現在扱っている20本のファンドを掲載し、平均すると過去10年で市場を上回ったと報告します。営業チームはこれを銘柄選択能力の証拠として示します。",
  "The table contains only funds still open today, so the ones that did badly enough to be closed or merged away during the decade have been dropped from the average before it was taken.":
    "表には現在も運用中のファンドしか含まれておらず、この10年の間に成績不振で償還されたり統合されたりしたものは、平均を取る前に除かれています。",
  "A magazine profiles thirty founders whose companies are now worth billions and finds that most left university early and ignored advice to take a safe job. Its careers columnist tells readers that leaving early is the surer path.":
    "ある雑誌が、いまや数十億ドル規模の企業を築いた創業者30人を取り上げ、その多くが大学を早期に去り、安定した職に就けという助言を無視していたことを見つけます。キャリア担当のコラムニストは読者に、早く辞めるほうが確実な道だと伝えます。",
  "The thirty were picked for having made it, so the far larger number who left early, failed and were never profiled are missing, and the failure rate of the strategy cannot be read off this group.":
    "30人は成功したことを理由に選ばれているため、同じく早く辞めて失敗し、記事にならなかったはるかに多くの人が抜けています。この集団からこの戦略の失敗率は読み取れません。",
  "A council engineer notes that the stone bridges built in the town two centuries ago all still carry traffic, while several concrete ones from the 1970s have had to be replaced. He writes that the older building methods were plainly more durable.":
    "ある自治体の技術者は、200年前に町に架けられた石橋がいまもすべて交通を支えている一方、1970年代のコンクリート橋はいくつも架け替えが必要になったと指摘します。彼は、昔の工法のほうが明らかに耐久性が高いと書きます。",
  "Only the two hundred year old bridges good enough to last are left to inspect, while the poorly built ones of that era collapsed or were demolished long ago and never enter the comparison.":
    "200年前の橋のうち、残るだけの出来だったものしか点検の対象になりません。当時の粗悪な橋はとうに崩落するか撤去されており、比較に入りません。",
  "A music magazine interviews twenty bands that reached the charts after years in small venues, and finds that every one of them refused to change their sound when a label asked. The writer concludes that refusing to compromise is what gets a band signed.":
    "ある音楽雑誌が、小さな会場での下積みを経てチャートに入った20組のバンドに取材し、全組がレーベルに求められても音楽性を変えなかったことを見つけます。筆者は、妥協を拒むことこそが契約につながると結論づけます。",
  "The sample was drawn from bands that charted, so the many acts that also refused and were dropped or never signed are absent, leaving the cost of the tactic invisible.":
    "標本はチャートに入ったバンドから取られているため、同じく拒んで契約を打ち切られたり契約に至らなかった多数のバンドが抜けており、この方針の代償が見えません。",
  "A car magazine surveys owners at an enthusiasts' rally for a model built thirty years ago. Almost all report low running costs and few breakdowns, and the magazine names it the most dependable car of its era.":
    "ある自動車雑誌が、30年前に作られた車種の愛好者イベントで所有者に調査します。ほぼ全員が維持費の安さと故障の少なさを挙げ、雑誌はこの車を同時代で最も信頼できる車と評します。",
  "Only cars sound enough to still be driven to a rally are in the sample; the ones that rusted or failed were scrapped years ago and their owners are not there to be asked.":
    "標本に入るのは、イベントまで走ってこられるだけ状態の良い車だけです。錆びたり壊れたりした車は何年も前に廃車になっており、その所有者はその場にいません。",
  "A museum label states that the region's ancient potters worked to a standard modern factories struggle to match. The claim rests on the jars in the case, all of them lifted whole from a buried settlement two thousand years later.":
    "ある博物館の解説板は、この地域の古代の陶工は現代の工場でも並ぶのが難しい水準で仕事をしていたと記します。この主張は展示ケースの壺に基づいており、いずれも2000年後に埋没した集落から完全な形で掘り出されたものです。",
  "The collection is filtered by what stayed intact underground for two millennia, so thin, flawed or badly fired pots are physically absent from the evidence used to judge the average standard.":
    "収蔵品は2000年間地中で無傷のまま残ったものに絞られており、薄いもの、欠陥のあるもの、焼成の悪いものは、平均的な水準を判断する証拠から物理的に欠けています。",
  "A rowing academy studies the athletes in its national squad and finds that nearly all of them trained through serious pain at eighteen. The head coach tells new recruits that pushing through injury is what separates those who make it.":
    "あるボート競技のアカデミーが代表候補の選手を調べ、そのほぼ全員が18歳の時点で強い痛みを押して練習していたことを見つけます。ヘッドコーチは新入生に、けがを押して続けることが成功する者を分けると伝えます。",
  "The squad consists of those whose bodies withstood it, while recruits whose injuries ended their careers left the sport and are no longer in the group being examined, hiding the risk of the advice.":
    "候補選手は体が持ちこたえた人たちで構成されています。けがで競技を離れた人はもう調査対象の集団にいないため、この助言の危険が隠れます。",
  "A partial print from a break-in is searched against a national database of six million people and returns one name. The examiner says about 1 person in 500,000 would match it. Counsel tells the jury there is therefore a 1 in 500,000 chance the man was not there.":
    "侵入事件で採取された部分指紋が600万人分の国のデータベースと照合され、1人の名前が返ります。鑑定人は、およそ500,000人に1人がこれに一致すると述べます。法廷で弁護士は陪審に、したがってこの男がその場にいなかった確率は500,000分の1だと伝えます。",
  "The 1 in 500,000 is how often an unconnected person matches, and searching six million people should turn up about a dozen such matches, so it is not the chance that this man was elsewhere.":
    "500,000分の1は無関係な人が一致する頻度であり、600万人を検索すればそうした一致がおよそ12件出るはずです。これはこの男が別の場所にいた確率ではありません。",
  "An auditor screens every branch of a retail chain for a rounding pattern that would arise by chance in about 1 honestly kept ledger in 10,000. One of the chain's 30,000 branches shows it, and the report states that the manager is almost certainly falsifying figures.":
    "ある監査人が小売チェーンの全支店を対象に、正しく記帳された帳簿でも偶然におよそ10,000冊に1冊は現れる端数のパターンを調べます。チェーンの30,000支店のうち1店にそれが現れ、報告書はその店長がほぼ確実に数字を改ざんしていると記します。",
  "The 1 in 10,000 describes how often honest books show the pattern, not how often books showing it are dishonest, and screening 30,000 branches should produce about three honest ones like it.":
    "10,000分の1は正直な帳簿がこのパターンを示す頻度であって、このパターンを示す帳簿が不正である頻度ではありません。30,000支店を調べれば、同様の正直な帳簿がおよそ3件出るはずです。",
  "A weekly prize draw has been won twice by the same person. An organiser calculates that the odds of a given player winning twice are about one in a million, and concludes the draw was rigged. The draw has run for twenty years with over three million regular players.":
    "毎週の抽選で同じ人が2回当選しました。主催者側のある担当者は、特定の参加者が2回当たる確率はおよそ100万分の1だと計算し、抽選に不正があったと結論づけます。この抽選は20年間続いており、常連の参加者は300万人を超えます。",
  "One in a million applies to one player named in advance, whereas the question asked afterwards is whether anyone at all among three million regular players would win twice, which is close to expected.":
    "100万分の1はあらかじめ名前を挙げた1人に当てはまる数字です。後から問われているのは、300万人の常連のうち誰か1人でも2回当たるかどうかであり、それは予想される範囲に近い出来事です。",
  "An internal auditor at a company of 700 staff reports that two employees who sign off each other's expense claims were born on the same day of the year. He puts the chance of that at 1 in 365 and states they are almost certainly working together.":
    "従業員700人の会社の内部監査人が、互いの経費精算を承認し合う2人の従業員の誕生日が同じ日であると報告します。彼はその確率を365分の1とし、2人はほぼ確実に共謀していると述べます。",
  "The 1 in 365 fits one pair chosen in advance, but he combed hundreds of pairs for any oddity, and how often innocent pairs share a birthday is not the probability of innocence given a shared birthday.":
    "365分の1はあらかじめ選んだ1組に当てはまります。ところが彼は数百組を洗って何か変わった点を探しました。潔白な組が誕生日を共有する頻度は、誕生日が同じであるときに潔白である確率ではありません。",
  "Four children on one street develop the same rare illness within a year. A campaigner calculates that this would happen by chance in about one street in a million, and tells a public meeting there is therefore a one in a million chance the nearby plant is blameless.":
    "ある通りで4人の子どもが1年のうちに同じ希少な病気を発症します。ある活動家は、これが偶然に起こるのはおよそ100万本の通りに1本だと計算し、公開集会で、したがって近くの工場に責任がない確率は100万分の1だと述べます。",
  "The figure is the chance of such a cluster on a street picked in advance with nothing causing it, and with millions of streets in the country a few clusters are expected somewhere regardless of the plant.":
    "この数字は、原因が何もない状態であらかじめ選んだ1本の通りにそうした集積が起こる確率です。国内には数百万本の通りがあるため、工場と関係なくどこかで数件の集積が起こると見込まれます。",
  "An anonymous threatening letter was printed in a distinctive typeface installed on roughly 1 printer in 20,000. A suspect's office printer carries it. The investigating officer writes that the odds against anyone else having produced the letter are 20,000 to 1.":
    "匿名の脅迫状は、およそ20,000台に1台のプリンターにしか入っていない特徴的な書体で印刷されていました。容疑者の職場のプリンターにその書体が入っています。捜査官は、他の誰かがこの手紙を作成した可能性は20,000対1で否定されると書きます。",
  "With millions of printers in the country, several hundred carry the same typeface, so the figure measures how rare the feature is rather than how likely this owner is to have written the letter.":
    "国内には数百万台のプリンターがあり、数百台が同じ書体を備えています。この数字はこの特徴の希少さを測るものであって、この所有者が手紙を書いた可能性を測るものではありません。",
  "A national programme screens about 60,000 samples a year. One athlete's sample shows a marker found in roughly 1 in 10,000 samples from clean competitors, and the panel chair states there is a 1 in 10,000 chance the athlete competed clean.":
    "ある全国的な計画では年間およそ60,000検体をスクリーニングします。ある選手の検体に、違反していない競技者の検体のおよそ10,000件に1件で見つかる指標が現れ、委員長は、この選手が違反なく競技した確率は10,000分の1だと述べます。",
  "1 in 10,000 is how often clean samples show the marker, so about six clean athletes a year would show it; turning that into the chance of being clean also requires knowing how few competitors dope.":
    "10,000分の1は違反のない検体がこの指標を示す頻度であり、年におよそ6人の違反していない選手に現れます。これを潔白である確率に変えるには、ドーピングをする競技者がどれほど少ないかも知る必要があります。",
  "A league moves its four lowest-ranked clubs down into the second tier. A ratings service recalculates the tier averages and finds the average club rating is now higher in both tiers than before the reshuffle. The commissioner calls it a sign that standards are rising everywhere.":
    "あるリーグが順位下位4クラブを2部に降格させます。格付け会社が各部の平均を再計算すると、クラブの平均格付けは入れ替え前よりどちらの部でも高くなっていました。コミッショナーは、どこでも水準が上がっている証拠だと述べます。",
  "Those four clubs rated below the top tier's average and above the second tier's, so taking them out lifts one figure and adding them lifts the other, while no club plays any better than before.":
    "この4クラブは1部の平均より下、2部の平均より上に位置していました。したがって除けば一方の数字が上がり、加えればもう一方も上がります。どのクラブも以前より強くなってはいません。",
  "An insurer moves the safest quarter of its high-risk motor policies into its standard pool. The next report shows the average claim cost has risen in the high-risk pool and in the standard pool, and the underwriting director warns that both books are deteriorating.":
    "ある保険会社が、高リスクの自動車契約のうち最も安全な4分の1を標準の区分に移します。次の報告では、平均請求額が高リスク区分でも標準区分でも上がっており、引受担当役員は両方の契約群が悪化していると警告します。",
  "The transferred policies cost less than the high-risk average and more than the standard average, so removing them raises one mean and adding them raises the other, with no driver's risk changed.":
    "移された契約は高リスクの平均より安く、標準の平均より高いものでした。したがって除けば一方の平均が上がり、加えればもう一方も上がります。どの運転者のリスクも変わっていません。",
  "An armed service brings in a medical screen that catches minor problems the old one missed, and moves the personnel it flags from fully deployable to restricted duties. Average fitness scores then come out higher in both categories, and a spokesman credits the new training programme.":
    "ある軍が、従来の検査では見逃していた軽微な問題を拾う健康診断を導入し、該当した隊員を完全派遣可能から制限勤務に移します。その後、平均体力評価はどちらの区分でも高くなり、報道官は新しい訓練計画の成果だとします。",
  "Those moved were the least fit of the deployable group and the fittest of the restricted group, so both averages rise on the reclassification alone, without anyone's fitness changing.":
    "移された隊員は派遣可能群で最も体力が低く、制限勤務群では最も体力が高い人たちでした。分類の変更だけで両方の平均が上がり、誰の体力も変わっていません。",
  "A bank tightens the test that puts a loan on its watch list, so a batch of loans previously counted as performing moves across. The next figures show a higher average credit score in the performing book and in the watch list, and the risk committee reports improvement on both.":
    "ある銀行が要注意先に分類する基準を厳しくし、これまで正常先とされていた一群の融資が移ります。次の数字では、正常先の平均信用スコアも要注意先の平均信用スコアも上がっており、リスク委員会は両方が改善したと報告します。",
  "The moved loans were the weakest of the performing book and the strongest of the watch list, so both averages rise the moment they change column, with no borrower's position altered.":
    "移った融資は正常先で最も弱く、要注意先では最も強いものでした。区分が変わった瞬間に両方の平均が上がり、どの借り手の状況も変わっていません。",
  "A depot fits a vibration sensor that picks up early wear, and engines it flags are shifted from the serviceable list to the overhaul list. The next report shows average hours between faults up on both lists, and the fleet manager credits a change of lubricant.":
    "ある車両基地が初期摩耗を捉える振動センサーを取り付け、検出されたエンジンを使用可能リストからオーバーホールリストに移します。次の報告では、故障間の平均稼働時間が両方のリストで伸びており、車両管理者は潤滑油の変更の成果だとします。",
  "The flagged engines were the worst on the serviceable list and the best on the overhaul list, so removing them lifts one average and adding them lifts the other, with no engine actually wearing less.":
    "検出されたエンジンは使用可能リストで最も状態が悪く、オーバーホールリストでは最も良いものでした。除けば一方の平均が上がり、加えればもう一方も上がります。実際に摩耗が減ったエンジンはありません。",
  "A sales director has a senior team averaging 50 sales a month and a junior team averaging 30. She moves two representatives who each average 40 from the senior team to the junior team. The next report shows both team averages have gone up, and she credits the reshuffle.":
    "ある営業部長のもとで、上位チームは月平均50件、下位チームは月平均30件を売っています。部長は、それぞれ平均40件の営業担当2人を上位チームから下位チームへ移します。次の報告では両チームの平均が上がっており、部長は配置換えの成果だとします。",
  "The two sell below the senior team's average and above the junior team's, so the senior mean climbs above 50 and the junior mean above 30 while nobody sells a single unit more.":
    "この2人は上位チームの平均より低く、下位チームの平均より高く売っています。したがって上位の平均は50を超え、下位の平均は30を超えますが、誰も1件も多く売ってはいません。",
  "An exporter grades boxes as premium, averaging 90 points, or standard, averaging 70. It changes the cut-off so that boxes scoring 82, until now premium, count as standard. The next quality report shows the average score up in both grades, and the manager says the growers have improved.":
    "ある輸出業者は、箱を平均90点の上級品と平均70点の標準品に等級分けしています。基準を変更し、これまで上級品だった82点の箱を標準品とします。次の品質報告では両方の等級で平均点が上がっており、担当者は生産者の質が上がったと述べます。",
  "Boxes at 82 sat below the premium average of 90 and above the standard average of 70, so shifting them lifts both figures without a single box of fruit being any better.":
    "82点の箱は上級品の平均90より下、標準品の平均70より上にありました。移すだけで両方の数字が上がり、果物の中身は1箱も良くなっていません。",
  "A conservatoire moves its five weakest cellists out of the advanced class and into the intermediate class. At the end of term the average examination mark is higher in the advanced class and higher in the intermediate class, and the principal praises the new teaching plan.":
    "ある音楽院が、最も実力の低いチェロ奏者5人を上級クラスから中級クラスへ移します。学期末には、試験の平均点が上級クラスでも中級クラスでも高くなっており、学長は新しい指導計画を称賛します。",
  "Those five scored below the advanced class average and above the intermediate class average, so taking them out raises one mean and adding them raises the other, whatever any student's playing does.":
    "この5人は上級クラスの平均より下、中級クラスの平均より上でした。除けば一方の平均が上がり、加えればもう一方も上がります。学生の演奏がどうであろうと同じです。",
  "A haulage firm fits vibration sensors that flag a failing gearbox about eight months before a driver would notice the noise. The log now shows an average of fourteen months from first fault report to breakdown, up from six. The firm's newsletter says the sensors are making gearboxes last far longer.":
    "ある運送会社が、運転手が異音に気づくよりおよそ8か月早く変速機の不調を検出する振動センサーを取り付けます。記録では、最初の故障報告から故障停止までが平均6か月から14か月に延びました。会社の社内報は、センサーによって変速機の寿命が大幅に延びたとしています。",
  "The breakdowns still happen when they always did; only the moment the fault entered the log moved earlier, so the measured gap from report to breakdown grew by exactly the warning the sensors bought.":
    "故障停止が起こる時期は以前と同じです。記録に故障が入る時点だけが早まったため、報告から故障までの測定される間隔は、センサーが稼いだ警告時間の分だけ延びました。",
  "A roads authority begins ultrasound surveys that reveal cracking in girders years before it becomes visible. Girders are still replaced at the same age as before, yet the average time from a crack being recorded to replacement has risen from four years to nine. The authority reports longer girder life.":
    "ある道路管理者が、目に見えるようになる何年も前に桁のひび割れを見つける超音波検査を始めます。桁の交換時期は以前と同じ年数のままですが、ひび割れの記録から交換までの平均期間は4年から9年に延びました。管理者は桁の寿命が延びたと報告します。",
  "Replacement happens at the same age it always did, so nothing about the girder changed. Recording the crack earlier simply lengthened the interval being measured.":
    "交換はこれまでと同じ年数で行われており、桁には何の変化もありません。ひび割れを早く記録したことが、測定される期間を延ばしただけです。",
  "A data centre switches on drive health alerts that fire well before a disk starts losing sectors. Disks are still retired at the same age, but the mean time from first alert to retirement has tripled. The operations page claims the alerts are extending disk life threefold.":
    "あるデータセンターが、ディスクがセクタを失い始めるよりかなり前に発報する健全性アラートを有効にします。ディスクの退役時期は同じままですが、最初のアラートから退役までの平均時間は3倍になりました。運用ページは、アラートがディスク寿命を3倍に延ばしていると主張します。",
  "The retirement date did not move. Starting the count at an earlier alert stretches the measured interval without a single disk lasting longer.":
    "退役日は動いていません。より早いアラートから数え始めれば測定される期間は延びますが、長持ちしたディスクは1台もありません。",
  "A phone maker adds a diagnostic that warns of battery decline far earlier than the old check did. Support records show the average time from first warning to replacement has doubled, and batteries are still replaced at the same age. Marketing says the diagnostic doubles battery life.":
    "ある携帯電話メーカーが、従来の点検よりはるかに早くバッテリーの劣化を警告する診断機能を追加します。サポート記録では、最初の警告から交換までの平均期間が2倍になっており、バッテリーの交換時期は同じままです。マーケティング部門は、この診断がバッテリー寿命を2倍にすると述べます。",
  "Batteries reach replacement at the same age as before; only the warning moved forward, so the interval from warning to replacement grew by the time gained in detecting decline.":
    "バッテリーが交換に至る時期は以前と同じで、警告だけが前倒しになりました。警告から交換までの期間は、劣化の検出が早まった分だけ延びています。",
  "A grower adopts a leaf assay that identifies infected trees months before wilting appears. Records now show infected trees standing fifteen months after detection rather than five, and trees are still felled at the same age. The assay supplier's leaflet claims it keeps infected trees productive three times as long.":
    "ある生産者が、萎れが出る数か月前に感染樹を特定する葉の検査を導入します。記録では、感染樹が検出後に立っている期間が5か月から15か月になり、伐採の時期は同じままです。検査の販売業者の資料は、感染樹の生産期間が3倍になると主張します。",
  "Felling happens at the same age, so no tree gained a day. The assay only started the clock earlier, which inflates the interval from detection to felling.":
    "伐採は同じ樹齢で行われており、1日も得た木はありません。検査は時計を早く動かし始めただけで、検出から伐採までの期間を水増しします。",
  "A water utility installs acoustic monitoring that finds leaks long before they surface. Pipes are still dug up only when a leak reaches the road, yet the average time from logging a leak to the dig has risen from two months to eleven. The utility reports that leaking pipes now last far longer.":
    "ある水道事業者が、漏水が地表に出るずっと前にそれを見つける音響監視を導入します。掘削は漏水が路面に達したときにしか行われませんが、漏水の記録から掘削までの平均期間は2か月から11か月に延びました。事業者は、漏水した管の寿命が大幅に延びたと報告します。",
  "The dig is still triggered by the same event at the same moment. Logging the leak nine months sooner adds nine months to the measured interval and nothing to the pipe.":
    "掘削は同じ出来事によって同じ時点で始まります。漏水を9か月早く記録すれば測定される期間に9か月が加わりますが、管には何も加わりません。",
  "A memory service introduces a test that identifies a degenerative condition several years earlier than before. Patients still move into full time care at about the same age, but the average interval from diagnosis to that move has risen from four years to seven. A leaflet says the test delays dependence.":
    "ある物忘れ外来が、変性疾患をこれまでより数年早く特定する検査を導入します。患者が常時介護に移る年齢はほぼ同じままですが、診断からその移行までの平均期間は4年から7年に延びました。ある資料は、この検査が要介護化を遅らせると述べます。",
  "The move into full time care happens at the same age as before, so nothing was delayed. Diagnosing sooner simply lengthened the stretch of time counted after diagnosis.":
    "常時介護への移行は以前と同じ年齢で起こっており、何も遅れていません。診断が早まったことで、診断後に数える期間が延びただけです。",
  "Before a new imaging protocol, a clinic's patients were identified at an average age of 62 and died at 66. Since the protocol, they are identified at 59 and still die at 66. The annual report states that average survival after diagnosis has risen from four years to seven.":
    "新しい画像検査手順の導入前、ある診療所の患者は平均62歳で発見され、66歳で亡くなっていました。導入後は59歳で発見され、亡くなるのは変わらず66歳です。年次報告は、診断後の平均生存期間が4年から7年に延びたと記しています。",
  "The age at death is unchanged, so no patient gained time. Moving the moment of identification three years earlier adds three years to every measured interval.":
    "死亡時の年齢は変わっておらず、時間を得た患者はいません。発見の時点を3年早めれば、測定されるすべての期間に3年が加わります。",
  "A detector is checked against obvious photocopied notes and crisp notes straight from the mint, and separates them almost perfectly. The maker advertises 99% accuracy. A bank buys it to sort well made counterfeits from worn, creased notes taken over the counter, and expects the same figure.":
    "ある識別機が、明らかなコピー紙幣と造幣局から出たばかりの真新しい紙幣で試験され、ほぼ完璧に見分けます。製造元は99%の精度をうたいます。ある銀行は、精巧な偽札と窓口で受け取った擦れて折り目のついた紙幣を仕分けるためにこれを購入し、同じ数字を期待します。",
  "The advertised figure came from the crudest fakes set against the cleanest genuine notes. Where the fakes are skilled and the genuine notes are battered, the two groups overlap on exactly the features the detector reads.":
    "宣伝された数字は、最も粗雑な偽札と最もきれいな真札を並べて得られたものです。偽札が精巧で真札が傷んでいる場面では、識別機が読む特徴のまさにその点で2つの集団が重なります。",
  "A filter is benchmarked on bulk advertising full of misspellings and on a folder of ordinary personal mail, and scores 99.6%. A firm deploys it against carefully written impersonation attempts and against unusual but genuine messages from new suppliers, quoting the same score to its board.":
    "あるフィルターが、綴りの誤りだらけの大量広告メールと通常の個人的なメールのフォルダで評価され、99.6%を記録します。ある会社は、丁寧に書かれたなりすましメールと、新しい取引先からの珍しいが正当なメールを相手にこれを導入し、取締役会に同じ数字を示します。",
  "The benchmark asked the filter to separate the most obvious junk from the most obviously legitimate mail. Polished impersonations and odd but genuine supplier mail sit in the middle, where the filter was never measured.":
    "評価では、最も明白な迷惑メールと最も明白に正当なメールを分けることが求められました。洗練されたなりすましと、風変わりだが正当な取引先のメールは中間にあり、そこでフィルターは一度も測定されていません。",
  "A placement test was validated on absolute beginners and on near native speakers, and told them apart almost every time. A school now uses it to sort intermediate learners into three levels and cites the original accuracy figure in its prospectus.":
    "あるクラス分けテストが、まったくの初心者と母語話者に近い人で検証され、ほぼ毎回両者を見分けました。ある学校はいま、中級学習者を3つのレベルに振り分けるためにこれを使い、募集要項に当初の精度の数字を載せています。",
  "The test was only ever asked to separate the two ends of the range, which almost any crude measure manages. Intermediate learners sit in the middle, where it was never shown to discriminate at all.":
    "このテストは範囲の両端を分けることしか求められておらず、それはどんな粗い指標でもほぼできます。中級学習者は中間にあり、そこで判別力が示されたことは一度もありません。",
  "An inspection system was tuned on deliberately ruined test welds and on flawless reference welds, and caught 97% of the bad ones. On the production line, where flaws are hairline and sound welds carry cosmetic spatter, it catches far fewer. The plant keeps quoting 97% to customers.":
    "ある検査装置が、意図的に劣化させた試験溶接と欠陥のない標準溶接で調整され、不良の97%を検出しました。欠陥が髪の毛ほどの細さで、健全な溶接にも見た目のスパッタが付く製造ラインでは、検出率ははるかに下がります。工場は顧客に97%を示し続けています。",
  "The 97% was measured on wrecked welds against pristine ones, a comparison with a wide gap. Real line output has faint flaws and untidy good welds, so the same thresholds separate much less.":
    "97%はひどく壊した溶接と完璧な溶接という差の大きい比較で測られました。実際のライン品はかすかな欠陥と見た目の悪い良品からなるため、同じしきい値では分離力がずっと落ちます。",
  "A tool that claims to tell machine written text from human writing was checked on raw machine output and on handwritten classroom essays, scoring 98%. A college applies it to lightly edited submissions and to careful work by students writing in a second language, and treats every flag as proof.":
    "機械が書いた文章と人間が書いた文章を見分けるとうたうツールが、加工していない機械の出力と教室で手書きされたレポートで試験され、98%を記録します。ある大学はこれを、軽く手直しされた提出物と、第二言語で書く学生の丁寧な文章に適用し、検出をすべて証拠として扱います。",
  "The 98% came from the most obvious machine output set against the most obviously human writing. Edited text and unusually careful second language prose sit between those extremes, where the tool's accuracy was never established.":
    "98%は、最も明白な機械の出力と最も明白に人間らしい文章を並べて得られたものです。手直しされた文章や、際立って丁寧な第二言語の文章はその両極の間にあり、そこでツールの精度は確かめられていません。",
  "A moisture meter was calibrated against soaking wet blocks and oven dried blocks, and told them apart every time. A surveyor now uses it on borderline walls where mild condensation and genuine structural damp look much alike, and reports the manufacturer's accuracy figure in his findings.":
    "ある水分計が、びしょ濡れのブロックと乾燥炉で乾かしたブロックで校正され、毎回両者を見分けました。ある建物調査士はいま、軽い結露と本当の構造的湿気がよく似て見える判断の難しい壁でこれを使い、所見にメーカーの精度の数字を記載しています。",
  "Calibration contrasted two extremes that any meter could tell apart. The walls the surveyor actually meets are neither soaked nor bone dry, so the readings that mattered in calibration barely differ here.":
    "校正では、どんな計測器でも見分けられる両極端が対比されました。調査士が実際に出会う壁はずぶ濡れでも完全な乾燥状態でもないため、校正で意味を持った測定値がここではほとんど違いません。",
  "An image classifier for a skin condition was built from textbook photographs of advanced lesions and clear photographs of normal skin, reporting 96% accuracy. A community clinic runs it on early lesions and on patients with eczema and insect bites, and quotes the same 96% to them.":
    "ある皮膚疾患の画像分類器が、進行した病変の教科書写真と正常な皮膚の鮮明な写真から作られ、96%の精度を報告します。ある地域の診療所は、早期の病変や湿疹、虫刺されの患者にこれを使い、同じ96%を患者に示します。",
  "The reported accuracy came from advanced textbook lesions against plainly normal skin. In the clinic the lesions are early and the comparison skin carries rashes and bites that mimic them, so the separation the figure rested on is gone.":
    "報告された精度は、進行した教科書的病変と明らかに正常な皮膚の対比から得られたものです。診療所では病変は早期で、比較対象の皮膚にはそれに似た発疹や虫刺されがあるため、この数字が拠って立っていた分離はありません。",
  "A sideline test for head injury was validated on players with unmistakable symptoms and on rested players at the start of the season, sorting them almost perfectly. A club now applies it late in matches, to subtle knocks in tired and dehydrated players, quoting the same numbers.":
    "頭部外傷を判定する競技場脇の検査が、症状の明らかな選手とシーズン開幕時の休養十分な選手で検証され、ほぼ完璧に振り分けました。あるクラブはいま、試合終盤に、疲労と脱水のある選手のわずかな接触に対してこれを使い、同じ数字を示しています。",
  "Validation contrasted obvious injury with fresh, unaffected controls. Late in a match the injuries are subtle and the uninjured are fatigued, so both groups score alike on the very things the test measures.":
    "検証では、明らかな外傷と、疲れのない無傷の対照が対比されました。試合終盤では外傷はわずかで、無傷の選手も疲労しているため、検査が測るまさにその項目で両群が似た値になります。",
  "A firm interviews any applicant who scores highly on either the coding test or the communication exercise. Among the applicants who reach interview, the two scores move in opposite directions. The hiring manager concludes that people who are good with code tend to be poor with people.":
    "ある会社は、コーディング試験かコミュニケーション課題のどちらかで高得点を取った応募者を面接します。面接に進んだ応募者の中では、2つの得点は逆方向に動きます。採用責任者は、コードが得意な人は人付き合いが苦手な傾向があると結論づけます。",
  "Reaching interview required a high score on one test or the other, so a weak communicator is there only because the coding score carried them, which produces the opposite pattern inside the interview pool while saying nothing about applicants in general.":
    "面接に進むにはどちらか一方で高得点が必要でした。コミュニケーションが弱い人がそこにいるのはコーディングの得点に支えられたからであり、これが面接者の集団の中で逆の関係を作ります。応募者全体については何も語りません。",
  "A conservatory offers places to musicians who are outstanding in either technical playing or expressive interpretation. Among those who take up a place, the strongest technicians consistently receive the lowest expression marks. A tutor writes that drilling technique appears to blunt musicality.":
    "ある音楽院は、技巧か表現の解釈のどちらかで傑出した音楽家に入学を許可します。入学した学生の中では、技巧が最も高い学生が一貫して表現の評価が最も低くなります。ある指導者は、技巧の反復練習が音楽性を鈍らせるようだと書きます。",
  "A place required excellence on at least one of the two measures, so a student who is flat on expression must have been outstanding technically to get in, and the tradeoff exists only among those offered places.":
    "入学には2つの尺度の少なくとも一方で卓越していることが必要でした。表現が平板な学生が入れたのは技巧が傑出していたからであり、この二律背反は入学を許可された人の中にしか存在しません。",
  "A repair shop sees a device only when the battery has failed or the screen has cracked. Its records show that devices with dead batteries have unusually intact screens. The owner writes a blog post arguing that battery wear somehow spares the glass.":
    "ある修理店には、バッテリーが寿命を迎えたか画面が割れた端末しか持ち込まれません。記録では、バッテリーが切れた端末は画面が異常なほど無傷です。店主は、バッテリーの劣化がなぜかガラスを守っているという記事をブログに書きます。",
  "A device reaches the shop if at least one of the two faults happened, so a battery failure gets a device in without any screen damage, leaving cracked screens rarer among battery cases than among devices as a whole.":
    "端末が店に来るのは2つの不具合の少なくとも一方が起きた場合です。バッテリーの故障だけで画面の損傷がなくても持ち込まれるため、バッテリー案件の中では画面割れが端末全体より少なくなります。",
  "A city guide lists a restaurant only if it is unusually cheap or unusually good. A blogger works through the listings and finds that the pricier ones nearly always have the better food. He tells readers that in this city you really do get what you pay for.":
    "ある街のガイドは、飛び抜けて安いか飛び抜けて質が高い店だけを掲載します。あるブロガーが掲載店を順に回り、値段の高い店ほどほぼ必ず料理が良いことを見つけます。彼は読者に、この街では本当に値段どおりの質が得られると伝えます。",
  "A restaurant earns a listing by being cheap or by being good, so any expensive one in the guide is there because the food is good, which links price to quality inside the guide even if the city's restaurants show no such link.":
    "店が掲載されるのは安いか質が高いかのどちらかによります。ガイドに載っている高い店は料理が良いから載っているのであり、街の飲食店全体にそうした関係がなくても、ガイドの中では値段と質が結びつきます。",
  "A national squad picks players who are either exceptionally quick or exceptionally good at reading the game. Within the squad, the fastest players score lowest on the tactical assessment. The coaching staff decide that sprint work must be dulling game intelligence.":
    "ある代表チームは、飛び抜けて速いか、試合の展開を読むのが飛び抜けてうまい選手を選びます。チーム内では、最も速い選手が戦術評価で最も低い点を取ります。コーチ陣は、スプリント練習が試合勘を鈍らせているに違いないと判断します。",
  "A place needed one outstanding quality or the other, so a very quick player did not also need tactical strength to be picked, and the inverse pattern appears only among the players who were picked.":
    "選出にはどちらか一方の傑出した資質が必要でした。非常に速い選手は戦術面の強さがなくても選ばれたため、この逆の関係は選ばれた選手の中にだけ現れます。",
  "A funding panel awards money to proposals that have either a strong past record or a genuinely novel idea. Reviewing the funded projects five years later, an analyst finds the most novel ones came from the weakest records, and reports that experience seems to kill originality.":
    "ある助成審査会は、過去の実績が強いか、着想が真に新しいかのどちらかの申請に資金を出します。5年後に採択課題を見直したある分析者は、最も新しい着想が最も実績の弱い申請から出ていることを見つけ、経験が独創性を殺すようだと報告します。",
  "Funding required strength on one criterion or the other, so a novel proposal did not also need a strong record to win money, and the tradeoff holds among funded projects rather than among everyone who applied.":
    "採択にはどちらか一方の基準での強さが必要でした。新しい申請は実績が強くなくても資金を得られたため、この二律背反は応募者全体ではなく採択課題の中で成り立ちます。",
  "An insurer studies its motor claim file, which holds a case only when the vehicle was badly damaged or someone was hurt. In the file, badly damaged vehicles are less often linked to injuries. A memo suggests that heavier crash damage somehow protects the occupants.":
    "ある保険会社が自動車の請求記録を調べます。この記録には、車両が大きく損傷したか誰かが負傷した場合しか事案が入りません。記録の中では、大きく損傷した車両ほど負傷と結びつくことが少なくなっています。ある社内文書は、衝突の損傷が大きいほどなぜか乗員が守られていると示唆します。",
  "A crash enters the file if it caused serious damage or an injury, so heavily damaged vehicles are recorded even with nobody hurt, while lightly damaged ones appear only when someone was injured.":
    "事故が記録に入るのは大きな損傷か負傷を生じた場合です。大きく損傷した車両は誰も負傷しなくても記録され、損傷の小さい事故は誰かが負傷したときにしか現れません。",
  "A conference accepts a talk when the research is strikingly new or the speaker is a superb presenter. An attendee notices that the most original talks are the worst delivered, and posts afterwards that the polished speakers must be doing the shallowest work.":
    "ある学会は、研究が際立って新しいか、発表者が非常に優れた話し手である場合に発表を採択します。ある参加者は、最も独創的な発表ほど話し方が拙いことに気づき、後から、洗練された話し手ほど中身が浅いに違いないと投稿します。",
  "Acceptance needed novelty or delivery, so an original talk got on the programme without a polished speaker, and the tradeoff exists among accepted talks rather than among everything submitted.":
    "採択には新規性か話し方のどちらかが必要でした。独創的な発表は話し方が洗練されていなくてもプログラムに載ったため、この二律背反は投稿全体ではなく採択された発表の中に存在します。",
  "A motoring magazine reports that one gearbox is 40 percent more likely to fail in its first three years than the alternative. The maker's own figures show 7 failures per 10,000 cars against 5 per 10,000. Readers are advised to avoid the model.":
    "ある自動車雑誌は、一方の変速機がもう一方より最初の3年で故障する可能性が40パーセント高いと報じます。メーカー自身の数字では、10,000台当たり7件に対して10,000台当たり5件です。読者にはこの車種を避けるよう助言されています。",
  "The gap is 2 extra failures per 10,000 cars, so 9,998 owners in 10,000 notice no difference at all, and the 40 percent describes a change to an already tiny number.":
    "差は10,000台当たり2件の増加であり、10,000人のうち9,998人の所有者は何の違いも感じません。40パーセントはもともと非常に小さい数字の変化を表しています。",
  "A lottery app tells users that buying a second ticket doubles their chance of taking the jackpot, and pushes a two ticket bundle at checkout. A single ticket wins the jackpot about once in 14 million draws.":
    "ある宝くじアプリは、2枚目を買えば1等が当たる確率が2倍になると利用者に伝え、決済画面で2枚組を勧めます。1枚で1等が当たるのはおよそ1,400万回に1回です。",
  "Doubling moves the chance from about 1 in 14 million to about 2 in 14 million, an increase of roughly one chance in 14 million, which is why the proportional wording sounds far larger than the actual change.":
    "2倍にすると確率はおよそ1,400万分の1から1,400万分の2になり、増加はおよそ1,400万分の1です。割合での言い方が実際の変化よりはるかに大きく聞こえるのはそのためです。",
  "An airline advertisement says its new fleet has cut a particular in flight fault by 60 percent. The maintenance log behind the claim shows the fault used to occur on about 5 flights per million and now occurs on about 2 per million.":
    "ある航空会社の広告は、新しい機材によって特定の飛行中の不具合が60パーセント減ったとしています。この主張の根拠となる整備記録では、この不具合は以前は100万便当たりおよそ5便、現在はおよそ2便で起きています。",
  "That is 3 fewer faults per million flights, so a passenger's chance was already about 1 in 200,000 before the new fleet arrived and the headline percentage sits on a very small starting number.":
    "これは100万便当たり3件の減少です。乗客が遭遇する確率は新機材の導入前でもすでにおよそ200,000分の1であり、見出しの割合は非常に小さい出発点の上に乗っています。",
  "A bank advertises that its new account pays 50 percent more interest than the old one. The old account paid 0.2 percent a year and the new one pays 0.3 percent. A saver moves a 2,000 dollar balance across, expecting a noticeable difference.":
    "ある銀行は、新しい口座が旧口座より50パーセント多い利息を付けると宣伝します。旧口座は年0.2パーセント、新口座は年0.3パーセントです。ある預金者は、目に見える違いを期待して2,000ドルの残高を移します。",
  "On 2,000 dollars the switch is worth 6 dollars a year instead of 4, a gain of 2 dollars, because 50 percent more of a very small rate is still a very small rate.":
    "2,000ドルでは年4ドルが年6ドルになるだけで、増える分は2ドルです。非常に小さい金利の50パーセント増しは、やはり非常に小さい金利です。",
  "A newspaper reports that eating a particular snack every day raises the chance of a rare bowel condition by 25 percent, and shoppers start avoiding it. The figures behind the story are 4 cases per 10,000 people over ten years among non eaters and 5 per 10,000 among daily eaters.":
    "ある新聞は、特定の菓子を毎日食べると希少な腸の病気になる可能性が25パーセント高まると報じ、買い物客はその菓子を避け始めます。記事の根拠となる数字は、食べない人では10年間で10,000人当たり4件、毎日食べる人では10,000人当たり5件です。",
  "The difference is 1 extra case per 10,000 people across a decade, so 9,999 in 10,000 are unaffected either way and the 25 percent applies to an outcome that was already rare.":
    "差は10年間で10,000人当たり1件の増加です。10,000人のうち9,999人はどちらでも影響を受けず、25パーセントはもともとまれな結果に当てはまっています。",
  "A clinic leaflet says a daily tablet cuts the chance of a particular event over five years from 4 in 1,000 to 3 in 1,000, a reduction of a quarter. The leaflet adds that this means about one patient in four will be spared the event.":
    "ある診療所の資料は、1日1錠の服用で5年間の特定の出来事の確率が1,000人中4人から1,000人中3人に、つまり4分の1減ると述べます。資料はさらに、これはおよそ4人に1人の患者がその出来事を免れることを意味すると付け加えます。",
  "Only 1 patient in 1,000 avoids the event, so about 1,000 people must take the tablet for five years for one to benefit; the quarter describes how much a small chance shrank, not the share of patients helped.":
    "その出来事を免れるのは1,000人に1人だけであり、1人が恩恵を受けるにはおよそ1,000人が5年間服用する必要があります。4分の1は小さい確率がどれだけ縮んだかを表すもので、恩恵を受ける患者の割合ではありません。",
  "A factory's internal report gives the risk ratio for injuries after a new floor marking scheme as 0.47. The staff newsletter announces that the scheme has cut injuries by 47 percent, and the plant manager repeats that figure to the board.":
    "ある工場の内部報告は、新しい床表示の導入後の負傷のリスク比を0.47としています。社内報は、この取り組みで負傷が47パーセント減ったと伝え、工場長は取締役会でその数字を繰り返します。",
  "A ratio of 0.47 means injuries fell to 47 percent of the old level, which is a fall of 53 percent, so the newsletter has reported the share that remains as though it were the share removed.":
    "0.47という比は、負傷が従来の47パーセントの水準まで下がったことを意味し、減少は53パーセントです。社内報は残った割合を、減った割合であるかのように報じています。",
  "A home insurer tells customers that fitting a certain type of wood stove triples the chance of a fire claim, and raises those premiums by a third. Its own data show 1 claim per 10,000 insured homes a year without the stove and 3 per 10,000 with it.":
    "ある住宅保険会社は、ある種類の薪ストーブを設置すると火災の請求が3倍になると顧客に伝え、その保険料を3分の1引き上げます。自社のデータでは、ストーブのない住宅では年に10,000戸当たり1件、ある住宅では10,000戸当たり3件です。",
  "The extra chance is 2 fire claims per 10,000 homes a year, so 9,997 homes in 10,000 with the stove make no claim, and tripling something rare leaves it rare.":
    "増える分は年に10,000戸当たり2件です。ストーブのある住宅10,000戸のうち9,997戸は請求をせず、まれな出来事を3倍にしてもやはりまれなままです。",
  "A school picks pupils for extra tutoring on the basis of which ones teachers judge most likely to fail. At the end of the year the tutored pupils score lower on average than the rest, and a governors' report calls the tutoring ineffective and recommends closing it.":
    "ある学校は、教員が最も落第しそうだと判断した生徒を補習の対象に選びます。年度末には補習を受けた生徒の平均点が他より低く、理事会の報告書は補習は効果がないとして廃止を勧めます。",
  "Teachers chose pupils for tutoring precisely because they were already heading for a poor result, so the tutored group started further behind and the tutoring is blamed for the reason it was offered.":
    "教員が補習に選んだのは、まさにその生徒たちがすでに悪い結果に向かっていたからです。補習を受けた集団はより後ろから出発しており、補習が提供された理由そのものが補習の責任にされています。",
  "A phone company calls customers its model flags as most likely to leave and offers them a discount. Over the next quarter those customers cancel more often than customers who got no call. The analysis concludes that retention calls push people out of the door.":
    "ある携帯電話会社は、解約しそうだとモデルが判定した顧客に電話し、割引を提案します。次の四半期には、その顧客は電話を受けなかった顧客より多く解約します。分析は、引き止めの電話が顧客を出て行かせていると結論づけます。",
  "The call went only to customers already judged most likely to cancel, so the flag that triggered the call, not the call itself, explains their higher cancellation rate.":
    "電話はすでに解約の可能性が最も高いと判断された顧客だけにかけられました。解約率の高さを説明するのは電話そのものではなく、電話のきっかけとなった判定です。",
  "A plant sends a machine for early servicing whenever an operator reports an unusual noise. An audit finds that machines serviced early broke down more often the following year than machines left alone, and recommends servicing less.":
    "ある工場は、作業者が異音を報告するたびに機械を早期整備に出します。監査では、早期整備を受けた機械は手を付けなかった機械より翌年の故障が多いことが分かり、整備を減らすよう勧告します。",
  "The noise that prompted early servicing was itself a sign of a machine on its way to failing, so the servicing takes the blame for the condition that selected it.":
    "早期整備のきっかけとなった異音は、故障に向かっている機械の兆候そのものでした。整備は、それを選び出した状態の責任を負わされています。",
  "Places on a prison workshop scheme are limited, so staff give them to the inmates they judge most motivated and least likely to offend again. Two years on, scheme graduates have far lower reoffending, and the governor presents this as proof the scheme works.":
    "刑務所の職業訓練の定員は限られているため、職員は最も意欲が高く再犯の可能性が最も低いと判断した受刑者に枠を与えます。2年後、修了者の再犯率ははるかに低く、所長はこれを訓練が有効である証拠として示します。",
  "Staff selected participants using their own judgement of who would reoffend, which is the very outcome being measured, so the places went to the men already likely to do best.":
    "職員は誰が再犯するかという自らの判断で参加者を選びましたが、それはまさに測定されている結果です。枠はもともと最も良い経過をたどりそうな人に渡りました。",
  "A bank rewrites the terms of a loan as soon as the account shows early signs of strain. A year later, rewritten loans have defaulted more often than the rest of the book, and the credit committee concludes that rewriting terms encourages default.":
    "ある銀行は、口座に苦しさの初期の兆候が現れるとすぐに融資条件を書き換えます。1年後、条件を書き換えた融資は他より多く債務不履行になっており、与信委員会は条件の書き換えが債務不履行を招くと結論づけます。",
  "The rewrite was triggered by warning signs that already predicted default, so the rewritten loans began from a worse position that the comparison never accounted for.":
    "書き換えのきっかけは、すでに債務不履行を予測させる警告の兆候でした。書き換えられた融資はより悪い状態から出発しており、比較はそれを考慮していません。",
  "An employer assigns a senior mentor to the graduate recruits its managers rate as highest potential. Three years later the mentored recruits have been promoted twice as often as the others, and the internal newsletter credits the mentoring scheme.":
    "ある雇用主は、管理職が最も将来性が高いと評価した新卒採用者に上級のメンターを付けます。3年後、メンターの付いた社員は他の2倍昇進しており、社内報はメンター制度の成果だとします。",
  "Managers picked mentees on a judgement of who would rise fastest, so the mentored group was already on the quicker track before any mentoring happened.":
    "管理職は誰が最も速く昇進するかという判断でメンティーを選びました。メンターが付く前から、その集団はすでに速い道筋に乗っていました。",
  "A care home moves residents to its specialist wing when staff judge that they are declining fastest. A quality review finds that residents in the specialist wing die sooner than those on ordinary floors, and questions whether the wing should stay open.":
    "ある介護施設は、職員が最も急速に衰えていると判断した入居者を専門棟に移します。品質評価では、専門棟の入居者は一般階の入居者より早く亡くなることが分かり、専門棟を存続させるべきかが問われます。",
  "The move was decided by how fast a resident was already declining, and that decline, not the wing, drives the difference in how long they lived.":
    "移動はその入居者がすでにどれだけ速く衰えているかで決まりました。生存期間の差を生んでいるのは専門棟ではなく、その衰えです。",
  "A clinic offers its intensive shoulder programme only to patients who can already raise the arm to shoulder height, since the exercises need it. Those patients regain full movement far more often than the rest, and the clinic advertises the programme as its most effective treatment.":
    "ある診療所は、運動に必要なため、すでに腕を肩の高さまで上げられる患者にだけ集中的な肩のプログラムを提供します。その患者は他よりはるかに高い割合で可動域を完全に取り戻し、診療所はこのプログラムを最も効果的な治療として宣伝します。",
  "The entry rule handed the programme the patients whose shoulders were least damaged to begin with, so the people most likely to recover anyway are the ones being counted.":
    "参加条件によって、もともと肩の損傷が最も軽い患者がプログラムに集まりました。放っておいても回復しやすい人が数えられています。",
  "A fleet inspects every van once a year. Vans whose brake faults were picked up at inspection go on to have far fewer roadside breakdowns than vans whose faults turned up in between. The workshop manager concludes that the annual inspection catches the dangerous faults.":
    "ある車両部門は全バンを年に1回点検します。点検でブレーキの不具合が見つかったバンは、点検の間に不具合が出たバンよりも路上故障がはるかに少なくなります。整備責任者は、年次点検が危険な不具合を捉えていると結論づけます。",
  "A yearly check can only find wear slow enough to still be half formed on the day the inspector calls; anything that goes from sound to broken inside a year declares itself between visits. The inspected group is therefore stacked with the gradual faults from the outset.":
    "年1回の点検で見つかるのは、点検の日にまだ途中の段階でとどまる程度に進行の遅い摩耗だけです。1年以内に健全から破損まで進むものは点検と点検の間に姿を現します。したがって点検で見つかる集団は、初めから進行の遅い不具合に偏っています。",
  "A card issuer reviews merchant accounts once a month. Accounts stopped by the review have cost the issuer far less on average than accounts reported by cardholders between reviews. The risk team reports that the monthly review is holding losses down.":
    "あるカード会社は加盟店の口座を月に1回審査します。審査で停止された口座は、審査の間にカード会員から通報された口座より平均して損失額がはるかに小さくなっています。リスク部門は、月次審査が損失を抑えていると報告します。",
  "A scheme that opens, drains and vanishes within days sits entirely between two reviews, so the review can only catch the slow, low value operations. Those were the cheaper ones before anyone intervened.":
    "数日のうちに開設し、資金を抜き、消える手口は完全に2回の審査の間に収まります。審査が捉えられるのは動きの遅い低額の手口だけです。それらは誰かが介入する前から損失の小さいものでした。",
  "A software team audits its codebase every quarter. Defects the audit finds are rated far less severe than those users report between audits. The engineering lead writes that auditing removes problems before they can turn serious.":
    "あるソフトウェアチームは四半期ごとにコードを監査します。監査で見つかる不具合は、監査の間に利用者から報告される不具合よりはるかに軽度と評価されます。開発責任者は、監査が問題を深刻になる前に取り除いていると書きます。",
  "A defect that crashes the app is reported by a user within hours of shipping, long before the next quarterly pass, leaving the audit only the quiet long lived ones. Those were the mild defects already, not defects the audit made mild.":
    "アプリを落とす不具合は出荷から数時間で利用者に報告され、次の四半期の監査よりずっと前に表面化します。監査に残るのは目立たず長く残る不具合だけです。それらはもともと軽度だったのであり、監査が軽度にしたわけではありません。",
  "A housing association surveys each block once every five years. Defects found by the survey are almost always cosmetic, while the serious ones, a collapsed ceiling or a burst tank, arrive as emergency calls. The association reports that its survey programme keeps defects minor.":
    "ある住宅組合は各棟を5年に1回調査します。調査で見つかる不具合はほぼ必ず見た目の問題で、天井の崩落やタンクの破裂といった重大なものは緊急通報として入ります。組合は、調査計画によって不具合が軽微に保たれていると報告します。",
  "A defect that takes years to develop is present, and still small, whichever year the surveyor happens to call. One that develops in a fortnight almost certainly falls between two surveys and comes in as an emergency instead.":
    "進行に何年もかかる不具合は、調査員が何年目に来ても存在していて、しかもまだ小さいままです。2週間で進む不具合はほぼ確実に2回の調査の間に起こり、代わりに緊急通報として入ります。",
  "A grid operator surveys its lines from the air twice a year. Faults seen on a survey are almost always minor, and the faults behind most outages had never appeared on one. The operator's report credits the surveys with keeping serious faults rare.":
    "ある送電事業者は年に2回、上空から送電線を調査します。調査で見つかる不具合はほぼ必ず軽微で、停電の大半の原因となった不具合は調査に一度も現れていませんでした。事業者の報告は、重大な不具合がまれなのは調査のおかげだとします。",
  "Only damage that creeps along for months is still sitting there to be photographed when the aircraft passes. Damage that goes from intact to failed in a fortnight becomes an outage before any survey can see it, so the surveyed set is minor by construction.":
    "航空機が通るときにまだそこにあって撮影されるのは、何か月もかけてじわじわ進む損傷だけです。2週間で健全から破損に至る損傷は、どの調査より先に停電になります。調査で見つかる集合は仕組み上、軽微なものになります。",
  "A dental practice recalls its patients every eighteen months. Problems found at recall are nearly always fixable with a filling, while most extractions come from patients who telephone in pain between appointments. The practice tells patients that regular recall prevents extractions.":
    "ある歯科医院は18か月ごとに患者を定期健診に呼びます。健診で見つかる問題はほぼ必ず詰め物で対応でき、抜歯の大半は健診の間に痛みで電話してくる患者から出ます。医院は患者に、定期健診が抜歯を防ぐと伝えます。",
  "Decay that creeps along for years is present, and still small, whenever the recall falls. A tooth that goes from sound to abscessed in three months announces itself before the next appointment, so the recall sees the slow problems and little else.":
    "何年もかけて進むむし歯は、健診がいつ来ても存在していて、まだ小さいままです。3か月で健全から膿瘍に至る歯は次の予約より前に姿を現すため、健診が見るのは進行の遅い問題ばかりです。",
  "A large employer offers a lung scan every two years. Employees whose disease is found at a scan need much less urgent treatment than those who arrive breathless at the clinic between rounds. Occupational health reports that scanning catches disease while it is still controllable.":
    "ある大企業は2年ごとに肺の画像検査を提供します。検査で病気が見つかった従業員は、検査と検査の間に息切れで受診した従業員よりも緊急の治療をはるかに必要としません。産業保健部門は、検査が病気をまだ制御できるうちに捉えていると報告します。",
  "Disease that progresses over many years is detectable at whichever round comes along, while disease that goes from nothing to breathless inside two years surfaces between rounds. The scanned group is loaded with the milder illness before any treatment starts.":
    "何年もかけて進行する病気は、どの回の検査でも見つかります。2年以内に無症状から息切れまで進む病気は検査と検査の間に表面化します。検査で見つかる集団は、治療が始まる前から軽い病気に偏っています。",
  "A clinic lengthens its check up interval from one year to three. The cases it now picks up look milder on average than the ones it used to find, and the clinical lead takes this as evidence that the longer interval suits patients better.":
    "ある診療所が健診の間隔を1年から3年に延ばします。いま見つかる症例は以前見つけていた症例より平均して軽く見え、診療責任者はこれを、長い間隔のほうが患者に合っている証拠と受け取ります。",
  "Stretching the gap gives fast moving disease more room to appear and declare itself between visits, so a larger share of what the check up still finds is the slow moving kind. The milder mix reflects what the interval now misses, not better care.":
    "間隔を延ばすと、進行の速い病気が受診と受診の間に現れて表面化する余地が広がります。健診がなお見つけるもののうち、進行の遅い種類の割合が増えます。軽い症例が増えたのは、その間隔が取りこぼすようになったものを映しているのであって、診療が良くなったからではありません。",
  "A company's product newsletter runs a write up whenever an experiment beats the current design. Teams whose tests showed no difference tend to move on without writing anything. A new joiner reads a year of newsletters and concludes that almost every idea here lifts sign ups.":
    "ある会社のプロダクト社内報は、実験が現行の設計を上回るたびに記事を掲載します。差が出なかったチームは何も書かずに次へ進む傾向があります。新入社員が1年分の社内報を読み、この会社ではほぼどの案でも登録が増えると結論づけます。",
  "Only the experiments that won were written up, so the newsletter records a small winning slice of the year's tests while the flat and losing ones never appeared anywhere the new joiner could read them.":
    "記事になったのは勝った実験だけです。社内報はその年の試験のうち勝った一部だけを記録し、差の出なかったものや負けたものは新入社員が読める場所に一度も現れていません。",
  "A training provider's homepage carries fifteen graduate stories, each describing a good job within months of finishing. The stories came from graduates who answered a request for success stories. A prospective student reads them and concludes the course almost always leads to work.":
    "ある職業訓練提供者のホームページには修了生の体験談が15件掲載され、いずれも修了から数か月で良い仕事に就いたと書かれています。これらは成功体験の募集に応じた修了生から寄せられたものです。入学を検討している人がこれを読み、この講座はほぼ必ず就職につながると結論づけます。",
  "The page gathers only graduates who had a success to report, so those who finished the course and found nothing are missing from the evidence the student is weighing.":
    "このページに集まっているのは報告できる成功があった修了生だけです。講座を終えても何も見つからなかった人は、検討中の人が見ている材料から抜けています。",
  "On a woodworking forum, members post photographs of finished cabinets, and the build threads run to hundreds of admiring replies. A newcomer reads twenty of them and decides the design is straightforward enough for a first project.":
    "ある木工の掲示板では、会員が完成した戸棚の写真を投稿し、製作の書き込みには数百件の称賛の返信が付きます。ある初心者が20件を読み、この設計は最初の作品として十分に取り組みやすいと判断します。",
  "Builds that were abandoned halfway never get a thread, so the forum shows the attempts that worked and gives no sign of how often the design defeated someone.":
    "途中で放棄された製作は書き込みになりません。掲示板に表れるのはうまくいった試みだけで、この設計がどれだけの人を挫折させたかは分かりません。",
  "A software vendor's website hosts twelve customer case studies, each with a chart of improved results. The vendor decides which pilots to turn into case studies after seeing how they went. A buyer reads all twelve and signs a three year contract.":
    "あるソフトウェア会社のサイトには12件の顧客事例が掲載され、いずれも成果が改善した図が付いています。会社はどの試験導入を事例にするかを、結果を見てから決めています。ある購入担当者が12件すべてを読み、3年契約を結びます。",
  "The vendor wrote up only the pilots that turned out well, so the twelve studies are the flattering end of a larger set of pilots whose disappointing results were never put on the site.":
    "会社が記事にしたのはうまくいった試験導入だけです。12件はより大きな集合のうち見栄えの良い端にあたり、期待外れの結果はサイトに載っていません。",
  "An allotment association's newsletter has carried enthusiastic reports of a plant feed for ten years. Members who noticed a big difference send in a report; members who noticed nothing rarely bother. The committee votes to buy the feed in bulk for every plot.":
    "ある市民農園組合の会報は、10年にわたってある肥料の好意的な報告を掲載してきました。大きな違いに気づいた会員は報告を送り、何も気づかなかった会員はめったに送りません。運営委員会は全区画分の肥料をまとめて購入することを議決します。",
  "Only growers who saw an effect wrote in, so a decade of newsletters preserves the striking results and leaves out every plot where the feed changed nothing.":
    "投稿したのは効果を見た人だけです。10年分の会報には目立つ結果だけが残り、肥料が何も変えなかった区画はすべて抜けています。",
  "A research group posts a blog each time a new network design beats the standard benchmark, and quietly shelves the runs that did not. A reader tallies such posts across several groups and writes that progress in the field is accelerating sharply.":
    "ある研究グループは、新しいネットワーク設計が標準の指標を上回るたびにブログを投稿し、上回らなかった実行は静かに棚上げします。ある読者が複数のグループの投稿を数え上げ、この分野の進歩が急速に加速していると書きます。",
  "Runs that failed to beat the benchmark were never posted, so the tally counts the successes drawn from far more attempts and reads a filtered record as though it were the rate of progress.":
    "指標を上回らなかった実行は投稿されていません。この集計ははるかに多い試行から取り出された成功だけを数えており、選別された記録を進歩の速度として読んでいます。",
  "Someone collects every published trial of a supplement and notices that the small trials report much larger benefits than the large ones. He averages all of them together and reports a clear overall benefit.":
    "ある人がサプリメントの公表された試験をすべて集め、小規模試験のほうが大規模試験よりはるかに大きな効果を報告していることに気づきます。彼はそれらをすべて平均し、全体として明確な効果があると報告します。",
  "A small trial that found nothing is easy to leave unwritten, while a small trial that happened to land a striking result gets submitted, so the small studies on show are the lucky ones and averaging them pushes the estimate up.":
    "何も見つからなかった小規模試験は書かずに済ませやすく、たまたま目立つ結果が出た小規模試験は投稿されます。目に見える小規模研究は運の良かったものであり、それらを平均すると推定値が押し上げられます。",
  "A journal's guidance for authors says it looks for findings that are surprising and change how readers think. A student reviews ten years of its issues and concludes that effects in this field are usually large.":
    "ある学術誌の投稿規定は、驚きがあり読者の考え方を変える知見を求めると述べています。ある学生が10年分の号を通読し、この分野の効果は通常大きいと結論づけます。",
  "The journal chose papers by how striking the result was, so modest and flat findings were turned away or never submitted, and the ten years the student read contain none of them.":
    "この学術誌は結果の目立ち方で論文を選んでいたため、控えめな知見や差のない知見は不採択になるか、そもそも投稿されませんでした。学生が読んだ10年分にはそれらが含まれていません。",
  "A bank randomly gives half of its new savers an automatic top up feature and the rest a standard account. Its year end report compares average balances among savers still paying in after twelve months, and finds the feature far ahead.":
    "ある銀行が、新規の預金者の半数に無作為で自動積み増し機能を付け、残りには通常の口座を提供します。年度末の報告は、12か月後もなお入金を続けている預金者の平均残高を比較し、この機能が大きく上回っていることを示します。",
  "Whether someone was still paying in at twelve months was settled after the random split, and the feature itself affects who keeps going, so the sets compared are no longer the groups the allocation created.":
    "12か月後も入金を続けているかどうかは無作為の割付の後に決まったことであり、機能そのものが誰が続けるかに影響します。比較されている集合はもはや割付が作った群ではありません。",
  "Classes are randomly allocated to a new reading scheme or to the usual lessons. Twelve allocated classes never got the scheme running, so the evaluators move them into the comparison group, saying the figures should reflect what actually happened in the classroom.":
    "学級が無作為に新しい読書指導か通常の授業に割り付けられます。割り付けられた12学級では指導が始まらなかったため、評価者はそれらを比較群に移し、数字は教室で実際に起きたことを反映すべきだと述べます。",
  "Which classes failed to start was determined after allocation, probably by the schools least able to run anything new, so shifting them loads the comparison group with the weakest classes.":
    "どの学級が始められなかったかは割付の後に決まったことで、おそらく新しいことを最も実施しにくい学校で起きています。それらを移すと、比較群に最も弱い学級が集まります。",
  "An employer randomly assigns supervisors to a management course or to nothing. Anyone who changed department during the year is then left out of the analysis, in both groups alike, because the evaluator says their results would not be comparable.":
    "ある雇用主が、監督者を無作為に管理職研修か何もなしに割り付けます。その後、年の途中で部署を異動した人は、どちらの群でも同様に分析から除外されます。評価者は、その結果は比較できないと述べています。",
  "Department moves happened after the assignment, and the course itself can prompt or prevent them, so the filter removes a different sort of person from each group.":
    "部署の異動は割付の後に起きており、研修そのものが異動を促すことも防ぐこともあります。この除外は、それぞれの群から異なる種類の人を取り除きます。",
  "A council randomly assigns smokers to a quit programme or to a leaflet. The final report covers only those who turned up to the four week check, since the rest could not be verified. Attendance was 70% in the programme arm and 90% in the leaflet arm.":
    "ある自治体が、喫煙者を無作為に禁煙プログラムかパンフレットに割り付けます。最終報告は4週後の確認に来た人だけを対象としています。残りは確認できなかったためです。出席率はプログラム群で70%、パンフレット群で90%でした。",
  "Turning up to the check happened after assignment and at very different rates in the two arms, and the people likeliest to be missing from the programme arm are those who went back to smoking.":
    "確認に来るかどうかは割付の後の出来事であり、2つの群で大きく異なる割合で起きました。プログラム群で欠けている可能性が最も高いのは、喫煙に戻った人です。",
  "Farms are randomly allocated a new pest control routine or their usual one. Farms that sprayed late or missed a spray are dropped, and so are farms in the other group whose records had gaps. The routine comes out strongly ahead.":
    "農場が無作為に新しい防除手順か従来の手順に割り付けられます。散布が遅れた農場や散布を飛ばした農場は除外され、もう一方の群でも記録に欠けのある農場は除外されます。新しい手順が大きく上回る結果になります。",
  "Whether a farm followed the routine was decided after allocation and reflects how well it is run, so the best run farms in one group are being set against a differently filtered set in the other.":
    "農場が手順を守ったかどうかは割付の後に決まったことで、その農場の運営の良さを反映します。一方の群で最もよく運営された農場が、もう一方では別の基準で選別された集合と比べられています。",
  "An insurer randomly fits a driving feedback device to half of its new policies. Drivers who unplugged the device are dropped from that group, and drivers in the other group who bought one privately are dropped from theirs. The remaining comparison shows far fewer claims with the device.":
    "ある保険会社が、新規契約の半数に無作為で運転フィードバック装置を取り付けます。装置を外した運転者はその群から除外され、もう一方の群で自費で装置を購入した運転者もその群から除外されます。残った比較では、装置がある場合の請求がはるかに少なくなります。",
  "Unplugging a device and buying one privately both happened after the random split and mark out very different drivers, so what is left is two self selected sets rather than the groups the allocation made.":
    "装置を外すことも自費で買うことも、どちらも無作為の割付の後に起きた出来事で、まったく異なる運転者を示します。残っているのは割付が作った群ではなく、自ら選んだ2つの集合です。",
  "Travellers whose holiday went badly are asked what the brochure promised about the hotel, and their answers are set against those of travellers who enjoyed the same trip. The operator's complaints team treats the gap as evidence of mis-selling.":
    "旅行がうまくいかなかった旅行者に、パンフレットがホテルについて何を約束していたかを尋ね、その回答を同じ旅行を楽しんだ旅行者の回答と並べます。旅行会社の苦情対応部門はその差を不適切な販売の証拠として扱います。",
  "People whose holiday disappointed them have already been back over what they were told looking for a broken promise, while the satisfied travellers have never revisited the brochure.":
    "期待外れの旅行になった人は、破られた約束を探して説明の内容をすでに何度も振り返っています。満足した旅行者はパンフレットを見直したことがありません。",
  "After a food company recalls a batch, buyers are phoned and asked whether anything seemed odd about the smell. Those who fell ill report an odd smell far more often, and the report concludes the smell was a reliable warning sign.":
    "ある食品会社が製品を回収した後、購入者に電話し、においに変わったところがなかったかを尋ねます。体調を崩した人はにおいの異常をはるかに多く報告し、報告書はにおいが信頼できる警告の兆候だったと結論づけます。",
  "Buyers who got ill have replayed the meal hunting for something wrong with it, while those who felt fine had no reason to think about the smell at all.":
    "体調を崩した購入者は、どこがおかしかったのかを探してその食事を何度も思い返しています。何ともなかった人はにおいについて考える理由がまったくありませんでした。",
  "A road safety survey asks drivers how fast they usually take a particular bend. Drivers who have crashed there give very different figures from drivers who have not, and the survey uses the gap to set a recommended limit.":
    "ある交通安全調査が、特定のカーブを普段どれくらいの速度で曲がるかを運転者に尋ねます。そこで事故を起こした運転者は起こしていない運転者とまったく異なる数字を答え、調査はその差をもとに推奨速度を定めます。",
  "A driver who crashed at that bend has gone over the moment repeatedly and knows how it ended, so the speed now reported is reconstructed from the crash rather than independent of it.":
    "そのカーブで事故を起こした運転者はその瞬間を何度も振り返り、結末を知っています。いま答える速度は事故から再構成されたものであって、事故と無関係ではありません。",
  "A regulator asks customers who lost money on an investment what the salesperson said about the risk, and compares their accounts with those of satisfied customers who bought the same product from the same team.":
    "ある規制当局が、投資で損失を出した顧客に、販売員がリスクについて何を言ったかを尋ね、その説明を同じ担当者から同じ商品を買って満足している顧客の説明と比較します。",
  "Customers sitting on a loss have gone back through the conversation looking for a reassurance that should never have been given, while satisfied customers have had no reason to replay it.":
    "損失を抱えた顧客は、与えられるべきでなかった安心の言葉を探して会話をたどり直しています。満足している顧客にはそれを思い返す理由がありません。",
  "Parents of pupils who failed their final exams are asked how much homework the school set three years earlier, alongside parents of pupils who passed. The parents of failing pupils report much less, and a campaign group blames the school.":
    "最終試験に落ちた生徒の保護者に、3年前に学校がどれだけ宿題を出していたかを、合格した生徒の保護者とあわせて尋ねます。落ちた生徒の保護者ははるかに少なかったと答え、ある市民団体は学校を非難します。",
  "Parents whose children failed have been searching for an explanation ever since the results came out, so their account of past homework is produced by the outcome rather than measured independently of it.":
    "子どもが落ちた保護者は、結果が出て以来ずっと理由を探しています。過去の宿題についての説明は結果によって作られたものであり、結果とは独立に測られたものではありません。",
  "After an outbreak of illness following a conference dinner, attendees are asked which dishes they ate. Those who fell ill much more often say they had the seafood, and the report names it as the source.":
    "学会の懇親会の後に発生した集団発症を受けて、参加者にどの料理を食べたかを尋ねます。体調を崩した人ははるかに多く魚介類を食べたと答え、報告書はそれを原因と特定します。",
  "Attendees who became ill have reconstructed the meal trying to work out what caused it, so they account for their plate far more thoroughly than guests who never thought about dinner again.":
    "体調を崩した参加者は、何が原因かを突き止めようとして食事を再構成しています。その後の食事を思い出しもしなかった参加者よりも、自分の皿をはるかに詳しく説明します。",
  "A company reports that staff who received its five year loyalty award go on to average eleven years with the firm, against three years for everyone else, counted from each person's start date. HR presents the award as proof that recognition keeps people.":
    "ある会社は、勤続5年の表彰を受けた社員はその後、入社日から数えて平均11年在籍し、それ以外の社員は3年だと報告します。人事は、この表彰を評価が定着につながる証拠として示します。",
  "Receiving the award required staying five years, so anyone who left sooner cannot be in that group at all, and those five guaranteed years are counted into its average.":
    "表彰を受けるには5年在籍する必要がありました。それより早く辞めた人はこの群に入りようがなく、確定した5年間がその平均に組み込まれています。",
  "A subscription service reports that customers who ever moved to its premium tier stay subscribed four times longer than customers who never did, measured from the day each one signed up. Marketing pushes the upgrade at new customers on the strength of it.":
    "ある定額サービスは、一度でも上位プランに移った顧客は、移らなかった顧客より4倍長く契約を続けると、それぞれの加入日から測って報告します。マーケティング部門はこれを根拠に新規顧客へのプラン変更を勧めます。",
  "A customer had to still be subscribed in order to upgrade, so everyone who left early lands automatically in the other group, and the months before the upgrade are credited to premium.":
    "プランを変更するには契約を続けている必要がありました。早く解約した人は自動的にもう一方の群に入り、変更前の月数まで上位プランの功績に数えられています。",
  "A sports channel reports that clubs reaching the cup final went an average of nine weeks unbeaten in the competition, far better than clubs knocked out early, and puts it down to the finalists' training methods.":
    "あるスポーツ専門局は、カップ戦の決勝に進んだクラブは大会で平均9週間無敗だったと報じ、早期に敗退したクラブよりはるかに良いとして、決勝進出クラブの練習方法によるものだとします。",
  "Reaching the final required winning every earlier round, so those weeks cannot contain a defeat for any club in that group; the unbeaten run is the entry condition rather than a result of training.":
    "決勝に進むには、それ以前のすべての回戦に勝つ必要がありました。その期間にこの群のどのクラブの敗戦も入りようがありません。無敗の連続は練習の成果ではなく、その群に入る条件です。",
  "A delivery firm refurbishes each van at five years old. It reports that refurbished vans last on average four years longer than the rest of the fleet, measuring every van's life from the day it was bought, and orders more refurbishments.":
    "ある配送会社は各バンを使用5年目に改修します。会社は、改修したバンは購入日から数えて他の車両より平均4年長く使えると報告し、改修をさらに増やすよう指示します。",
  "A van had to still be running at five years to be refurbished, so vans that failed before then can only be in the other group, and those first five years are credited to refurbishment.":
    "改修されるには5年目にまだ走っている必要がありました。それ以前に壊れたバンはもう一方の群にしか入れず、最初の5年間が改修の功績に数えられています。",
  "A college reports that students who submitted the optional final year dissertation were far less likely to have left before graduating than students who did not, counted from enrolment, and proposes making the dissertation compulsory.":
    "ある大学は、任意の最終学年の卒業論文を提出した学生は、提出しなかった学生より、入学時から数えて卒業前に退学する割合がはるかに低いと報告し、卒業論文の必修化を提案します。",
  "Submitting required still being enrolled in the final year, so every student who left earlier falls automatically into the other group and cannot count against the dissertation.":
    "提出するには最終学年まで在籍している必要がありました。それより早く退学した学生は自動的にもう一方の群に入り、卒業論文の不利には数えられません。",
  "An insurer reports that drivers who earned its five year no claims discount average far fewer claims per year of cover than other drivers, counted from the day each policy began, and advertises the discount as something that makes people drive better.":
    "ある保険会社は、5年間無事故の割引を得た運転者は、契約開始日から数えて補償1年当たりの請求件数が他の運転者よりはるかに少ないと報告し、この割引を運転を良くするものとして宣伝します。",
  "Earning the discount required five years without a claim, so those claim free years are built into the group by definition and any driver who crashed early could never appear in it.":
    "割引を得るには請求のない5年間が必要でした。その無請求の年数は定義上この群に組み込まれており、早く事故を起こした運転者はこの群に入りようがありません。",
  "A firm reports that offers made by its retrained recruiters were accepted 71% of the time against 62% for the rest. The appendix tables show the retrained group ahead in every role family and at every seniority level.":
    "ある会社は、再研修を受けた採用担当者が出した内定の承諾率が71%、それ以外は62%だったと報告します。付表では、再研修を受けた群がどの職種群でも、どの職位でも上回っています。",
  "The headline gap points the same way as every published subgroup, so no mix of roles can be producing it; a hasty player would accuse the aggregate of hiding a reversal it has already ruled out.":
    "全体の差は公表されたすべての部分集団と同じ向きを示しており、職種の構成がこの差を生んでいることはありえません。早合点した回答者は、すでに否定されている逆転を全体の数字が隠していると責めるでしょう。",
  "Two bus depots are compared on punctuality. Because one runs far more rural routes than the other, the report recalculates both depots using a single common mix of route types, and prints the mix it used.":
    "2つのバス営業所を定時運行で比較します。一方が他方よりはるかに多くの郊外路線を走っているため、報告書は共通の路線種別構成を用いて両営業所を再計算し、用いた構成も記載しています。",
  "Standardising both depots to one route mix removes the difference in case mix before comparing, which is exactly the correction a pooled figure needs; a hasty player would accuse it of lumping unlike routes together.":
    "両営業所を1つの路線構成に標準化することで、比較の前に構成の違いが取り除かれます。これはまさに合算した数字に必要な補正です。早合点した回答者は、性質の異なる路線を一緒くたにしていると責めるでしょう。",
  "An online store sends each visitor at random to one of two checkout designs, and design B converts better overall. The report notes that the share of new and returning visitors came out almost identical in the two arms.":
    "あるオンライン店舗が、訪問者を無作為に2つの決済画面のどちらかに振り分け、全体では設計Bのほうが成約率が高くなります。報告書は、新規訪問者と再訪問者の割合が2つの群でほぼ同じだったと記しています。",
  "With the visitor mix verified as the same in both arms, the pooled result is a weighted average using identical weights, so a reversal inside the segments is arithmetically impossible; a hasty player would demand the segments be split out.":
    "訪問者の構成が両群で同じだと確認されているため、合算した結果は同じ重みによる加重平均であり、区分内での逆転は算術的に起こりえません。早合点した回答者は、区分ごとに分けて出すよう求めるでしょう。",
  "A bank's model flags card transactions for review. Before quoting a figure to the fraud team, the analyst combines the flag rate with how often transactions in that category actually turn out to be fraudulent, and reports the share of flagged transactions that are genuine fraud.":
    "ある銀行のモデルがカード取引を審査対象として検出します。分析担当者は不正対策部門に数字を伝える前に、検出率とその区分の取引が実際に不正である頻度を組み合わせ、検出された取引のうち本当に不正である割合を報告します。",
  "The number quoted is the chance of fraud given a flag, worked out using how common fraud is, rather than the model's accuracy read backwards; a hasty player would accuse the team of confusing the two.":
    "示された数字は、不正の多さを用いて求めた、検出されたときに不正である確率であり、モデルの精度を逆向きに読んだものではありません。早合点した回答者は、2つを混同していると責めるでしょう。",
  "A vision system catches nearly every cracked casting and wrongly marks about one sound casting in twenty. On this line roughly a third of castings really are cracked. The supervisor tells the crew a marked casting is probably cracked and sends marked ones for rework.":
    "ある画像検査装置は、ひび割れた鋳物をほぼすべて検出し、健全な鋳物のおよそ20個に1個を誤って印付けします。このラインではおよそ3分の1の鋳物が実際にひび割れています。監督者は作業員に、印の付いた鋳物はおそらくひび割れていると伝え、印の付いたものを手直しに回します。",
  "With a third of castings genuinely cracked, marked parts are cracked around nine times in ten, so the condition needed for false alarms to swamp true ones is absent; a hasty player would object to accuracy being read as the chance of a crack.":
    "鋳物の3分の1が実際にひび割れているため、印の付いた部品はおよそ10個に9個がひび割れています。誤検出が真の検出を圧倒するのに必要な条件がありません。早合点した回答者は、精度をひび割れの確率として読んでいると異議を唱えるでしょう。",
  "A text checker flags about 3% of original essays and nearly all copied ones. On a module where past audits found roughly one submission in five was copied, the tutor treats a flag as good reason to open an investigation rather than as proof.":
    "ある文章照合ツールは、独自に書かれたレポートのおよそ3%と、写したレポートのほぼすべてを検出します。過去の監査で提出物のおよそ5本に1本が写しだと分かっている科目で、担当教員は検出を証拠ではなく調査を始める十分な理由として扱います。",
  "Copying is common enough here that a flag makes it much more likely than not, and the conclusion drawn is only to investigate; a hasty player would accuse the tutor of reading the checker's accuracy as the chance of copying.":
    "ここでは写しが十分に多いため、検出されればその可能性はかなり高くなります。しかも導かれた結論は調査するというだけです。早合点した回答者は、教員がツールの精度を写しの確率として読んでいると責めるでしょう。",
  "An online grocer picks half its customers at random to receive a free delivery voucher and holds the rest back. Over the next three months the voucher group spends more, and the company reports that the voucher raised spending.":
    "あるネットスーパーが、顧客の半数を無作為に選んで送料無料のクーポンを配り、残りには配りません。次の3か月間、クーポンを受け取った群のほうが多く支出し、会社はクーポンが支出を増やしたと報告します。",
  "Chance decided who got a voucher, so the difference cannot come from the sort of customer who would have sought one out; a hasty player would accuse the grocer of reading cause off an association.":
    "誰がクーポンを受け取るかは偶然が決めたため、この差が自分から探しに来るような顧客の性質から生じることはありえません。早合点した回答者は、関連から原因を読み取っていると責めるでしょう。",
  "A council can afford to relight only twelve of its forty districts this year and draws the twelve by lot. Night collisions then fall in the relit districts over the following year and hold steady in the rest, and the council credits the lighting.":
    "ある自治体は今年、40地区のうち12地区しか照明を更新できず、12地区をくじで選びます。その後1年間、夜間の衝突事故は更新した地区で減り、残りの地区では横ばいとなり、自治体は照明の成果だとします。",
  "The lot decided which districts were treated, so the untouched districts are a fair comparison over the same period; a hasty player would dismiss it as a before and after story with no control.":
    "どの地区が対象になるかはくじが決めたため、手を付けていない地区は同じ期間の公平な比較対象になります。早合点した回答者は、対照のない前後比較だと退けるでしょう。",
  "A district notes that schools running more after school clubs have better attendance. Its report says the two go together, adds that clubs are commoner in better funded schools, and asks for a small trial before any wider rollout.":
    "ある教育区は、放課後クラブを多く運営している学校ほど出席率が良いことに気づきます。報告書は両者に関連があると述べ、クラブは予算の多い学校ほど多いと付け加え、広く展開する前に小規模な試行を求めます。",
  "The report stops at an association, names the obvious alternative explanation, and calls for an experiment instead of acting; a hasty player would accuse it of proposing a rollout on the strength of a pattern.":
    "報告書は関連にとどめ、明らかな別の説明を挙げ、行動する代わりに実験を求めています。早合点した回答者は、傾向を根拠に展開を提案していると責めるでしょう。",
  "A fund publishes the average return across every company it backed in its first five years, including the fourteen that closed and the four sold at a loss, and states how each was valued.":
    "あるファンドが、最初の5年間に出資したすべての会社の平均収益率を、廃業した14社と損失を出して売却した4社を含めて公表し、それぞれの評価方法も明記します。",
  "The failures sit in the denominator beside the successes, so the average is not computed from the companies that lasted; a hasty player would assume only the winners were counted.":
    "失敗した会社も成功した会社と並んで分母に入っているため、平均は生き残った会社だけから計算されていません。早合点した回答者は、勝者しか数えられていないと思い込むでしょう。",
  "A flying school reports what share of trainees reach a licence. The figure counts everyone who enrolled in a given year, including those who left partway through and those who failed the final check.":
    "あるフライトスクールが、訓練生のうち免許に到達した割合を報告します。この数字はある年に入学した全員を数えており、途中でやめた人と最終審査に落ちた人も含みます。",
  "The denominator is the entry cohort rather than the group who finished, so leavers cannot inflate the pass rate; a hasty player would assume the number came only from trainees still flying.":
    "分母は修了した集団ではなく入学した集団であるため、脱落者が合格率を押し上げることはありません。早合点した回答者は、この数字がいまも飛んでいる訓練生だけから出ていると思い込むでしょう。",
  "A manufacturer reports pump faults per thousand units sold, taking faults from the warranty claim file and the denominator from the sales register rather than from the units brought into its workshops. This year's model comes out ahead of last year's on the same two sources.":
    "あるメーカーが、販売台数1,000台当たりのポンプの故障件数を報告します。故障は保証請求の記録から、分母は修理工場に持ち込まれた台数ではなく販売台帳から取っています。同じ2つの資料で、今年の機種が昨年の機種を上回っています。",
  "Every unit sold sits in the denominator, including those that never came back, so neither year's rate is computed only among the pumps that turned up for repair; a hasty player would assume the figures came from the workshop queue.":
    "一度も戻ってこなかったものも含め、販売した全台が分母に入っているため、どちらの年の率も修理に来たポンプだけから計算されてはいません。早合点した回答者は、この数字が修理待ちの列から出ていると思い込むでしょう。",
  "An examiner testifies that the tyre pattern from the scene appears on about one van in three hundred, and adds that with roughly nine hundred vans registered in the area, some three of them would carry the same pattern.":
    "鑑定人が、現場のタイヤ痕の模様はおよそ300台に1台のバンに見られると証言し、この地域には約900台のバンが登録されているため、そのうちおよそ3台が同じ模様を備えているはずだと付け加えます。",
  "The rarity figure is turned into how many other vehicles would match, presenting the mark as narrowing the field rather than as a chance of innocence; a hasty player would expect the small number to be flipped into a probability of guilt.":
    "希少性の数字は、他に何台が一致するかに換算されており、この痕跡は潔白の確率ではなく対象を絞る材料として示されています。早合点した回答者は、その小さい数字が有罪の確率に読み替えられていると考えるでしょう。",
  "An auditor finds that one clerk's rounding pattern would arise by chance in about one month in five hundred. Noting that two hundred clerks were reviewed across twelve months, the auditor asks for a routine check of that ledger rather than a referral.":
    "ある監査人は、1人の担当者の端数の付き方が偶然に生じるのはおよそ500か月に1か月だと突き止めます。監査人は、200人の担当者を12か月にわたって調べたことを踏まえ、告発ではなく通常の帳簿確認を求めます。",
  "Across 2,400 clerk months such a pattern is expected several times by chance, and the response is scaled to that; a hasty player would accuse the auditor of treating a rare coincidence as evidence of wrongdoing.":
    "担当者2,400か月分では、こうしたパターンは偶然に数回起こると見込まれ、対応もそれに見合っています。早合点した回答者は、監査人がまれな偶然を不正の証拠として扱っていると責めるでしょう。",
  "An investigator reports that this claim pattern is about forty times more likely when a claim is fraudulent than when it is honest. Since roughly one claim in a thousand is fraudulent, she puts the chance this one is fraudulent at about one in twenty five and opens a file.":
    "ある調査員は、この請求のパターンが現れる可能性は、請求が不正である場合のほうが正当な場合よりおよそ40倍高いと報告します。請求のおよそ1,000件に1件が不正であることから、彼女はこの請求が不正である確率をおよそ25分の1とし、案件を立ち上げます。",
  "The strength of the evidence is combined with how common fraud is, giving the chance of fraud given the pattern rather than the reverse; a hasty player would expect the forty fold figure itself to be quoted as the odds of guilt.":
    "証拠の強さが不正の多さと組み合わされ、このパターンが出たときに不正である確率が求められています。逆向きではありません。早合点した回答者は、40倍という数字そのものが有罪の確率として示されていると考えるでしょう。",
  "A youth league keeps the same clubs in the same two divisions for two seasons running, with no promotions or relegations in between. Average match attendance rose in both divisions in the second season.":
    "あるユースリーグは、2シーズン続けて同じクラブを同じ2つの部に置き、その間に昇格も降格もありません。2シーズン目には平均観客数が両方の部で増えました。",
  "No club moved between divisions, so a rise in both cannot come from shuffling teams from one group into the other; a hasty player would suspect the categories had been rearranged between the seasons.":
    "部の間を移ったクラブはないため、両方の上昇が一方の群から他方へチームを移したことによる可能性はありません。早合点した回答者は、シーズンの間に区分が組み替えられたのではないかと疑うでしょう。",
  "A council changed how it grades road defects in 2023. To compare repair times with 2019, it first re-graded every 2019 record under the current rules, then compared grade by grade.":
    "ある自治体は2023年に道路の損傷の等級付けを変更しました。2019年と補修時間を比較するため、まず2019年の記録をすべて現行の基準で付け直し、その上で等級ごとに比較しました。",
  "Both years are sorted by identical rules, so an improvement within a grade cannot be produced by defects sliding between grades; a hasty player would assume the new grading had quietly reshuffled the categories.":
    "両方の年が同一の基準で分類されているため、等級内の改善が損傷の等級間の移動によって生じることはありえません。早合点した回答者は、新しい等級付けが区分を密かに組み替えたと思い込むでしょう。",
  "A rail operator fits sensors that pick up bearing wear months before a bearing would fail in service. In the two years after fitting, in service bearing failures per million miles run fell by about a third.":
    "ある鉄道事業者が、軸受が運行中に故障する数か月前に摩耗を捉えるセンサーを取り付けます。取り付け後の2年間で、走行100万マイル当たりの運行中の軸受故障はおよそ3分の1減りました。",
  "The measure is how often failures occur per mile, not how long the operator knew about a fault beforehand, so spotting problems earlier cannot by itself move the number; a hasty player would assume earlier detection was doing the work.":
    "指標は走行距離当たりの故障の起こりやすさであって、事業者が事前にどれだけ長く不具合を知っていたかではありません。問題を早く見つけるだけではこの数字は動きません。早合点した回答者は、早期発見がこの数字を作っていると思い込むでしょう。",
  "A team installs monitoring that alerts it to outages far sooner. Its quarterly report measures the time from the first affected customer request, taken from server logs, to full recovery, and shows that this fell after the tool went in.":
    "あるチームが、障害をはるかに早く通知する監視の仕組みを導入します。四半期報告は、サーバーログから取った最初に影響を受けた顧客のリクエストから完全復旧までの時間を測り、導入後にこれが短くなったことを示します。",
  "The clock starts at the moment of impact rather than at detection, so learning of an outage earlier cannot stretch the measured interval; a hasty player would assume earlier alerts manufactured the improvement.":
    "時計は検知の時点ではなく影響が出た時点から動き出すため、障害を早く知っても測定される間隔は延びません。早合点した回答者は、早い通知が改善を作り出したと思い込むでしょう。",
  "A lender builds a repayment risk model and tests it on applicants from the same branches, income range and loan sizes where it will be used. Accuracy is reported separately for applicants with long credit histories and for those with almost none.":
    "ある貸し手が返済リスクのモデルを作り、実際に使う予定と同じ支店、同じ所得帯、同じ融資規模の申込者で検証します。精度は、信用履歴の長い申込者とほとんどない申込者に分けて報告されます。",
  "The test population matches the one the model will run on and performance is broken out by how hard the cases are, so a figure earned on an easier mix is not being carried across; a hasty player would assume it was validated on obvious cases.":
    "検証の対象がモデルを動かす対象と一致しており、性能は事例の難しさごとに分けて示されています。より易しい構成で得た数字が持ち込まれてはいません。早合点した回答者は、分かりやすい事例で検証されたと思い込むでしょう。",
  "A soil test's published accuracy came from severely degraded plots. Before recommending it, a co-op ran the test again on ordinary member farms and quotes those second figures, not the original ones, in its guidance.":
    "ある土壌検査の公表された精度は、著しく劣化した圃場から得られたものでした。ある協同組合は推奨する前に、通常の組合員の農場でこの検査を実施し直し、当初の数字ではなく2回目の数字を手引きに載せています。",
  "The test was measured again in the ordinary fields where it will actually be used, so the easy contrast of the original setting is not passed off as everyday performance; a hasty player would attack the original validation.":
    "検査は実際に使われる通常の圃場で改めて測定されており、当初の場面の易しい対比が日常の性能として通されてはいません。早合点した回答者は、当初の検証を攻撃するでしょう。",
  "An inspection rig's detection rate was measured on cracks longer than two millimetres. The report says so plainly, notes that shorter cracks were not tested, and the plant uses the rig only as a check on the longer class.":
    "ある検査装置の検出率は、長さ2ミリメートルを超えるひび割れで測定されました。報告書はそのことを明記し、それより短いひび割れは試験していないと記しています。工場はこの装置を長いひび割れの区分の確認にしか使いません。",
  "The stated accuracy stays tied to the crack sizes it was measured on and use is limited to that range, so it is never applied to a harder mix; a hasty player would accuse the plant of importing a number from an easy test set.":
    "示された精度は測定されたひび割れの大きさに結びついたままで、使用もその範囲に限られています。より難しい構成に適用されることはありません。早合点した回答者は、易しい試験集合から数字を持ち込んでいると責めるでしょう。",
  "A firm asks whether its coding test score and its interview rating agree. Both are recorded for every applicant before any shortlist is drawn, and across all applicants the two rise together mildly.":
    "ある会社が、コーディング試験の得点と面接評価が一致するかを調べます。どちらも候補者を絞る前にすべての応募者について記録されており、応募者全体では2つは緩やかに一緒に上がります。",
  "The pair is measured on everyone who applied rather than only on those who cleared a bar that both scores helped set, so selection cannot manufacture the relationship; a hasty player would assume the sample had been filtered on both.":
    "2つの指標は、両方の得点が関わる基準を通過した人だけでなく、応募した全員について測られているため、選抜がこの関係を作り出すことはありません。早合点した回答者は、標本が両方の得点で絞られていると思い込むでしょう。",
  "A county register covering every resident, not only those who were admitted somewhere, reports that two conditions occur together a little more often than chance alone would give.":
    "どこかに入院した人だけでなく全住民を対象とするある県の登録が、2つの疾患が偶然だけの場合よりわずかに多く併存すると報告します。",
  "The pattern comes from the whole resident population rather than from people filtered in by admission, so it is not an artefact of both conditions raising the odds of being in the sample; a hasty player would assume a hospital roster.":
    "このパターンは入院によって選ばれた人ではなく住民全体から得られているため、どちらの疾患も標本に入る確率を上げることによる見かけ上の関係ではありません。早合点した回答者は、病院の名簿だと思い込むでしょう。",
  "A safety body reports that the new helmet standard cut serious head injuries by about a quarter, and adds that in the riders studied this meant roughly 12 serious injuries per 10,000 a year falling to about 9.":
    "ある安全機関は、新しいヘルメット規格によって重度の頭部外傷がおよそ4分の1減ったと報告し、調査対象の運転者では年に10,000人当たりおよそ12件がおよそ9件に減ったことを意味すると付け加えます。",
  "The proportional figure is given with the counts it came from, so the size of the benefit cannot be inflated in the reader's head; a hasty player would object to the percentage before noticing the numbers behind it.":
    "割合の数字は、その元になった件数とともに示されているため、読み手の頭の中で効果の大きさが膨らむことはありません。早合点した回答者は、背後の数字に気づく前に割合に異議を唱えるでしょう。",
  "A vendor's brochure says its filter cuts successful phishing by about 60%, and states directly below that in the trial this was 12 staff in every 1,000 falling to about 5 over a year.":
    "ある販売会社のパンフレットは、このフィルターが成功するフィッシングをおよそ60%減らすとし、そのすぐ下に、試験では1年間で1,000人当たり12人がおよそ5人に減ったことだと記しています。",
  "The relative claim is anchored to absolute numbers in the same place, letting the reader see how large the change really is; a hasty player would reject the headline percentage as unanchored marketing.":
    "相対的な主張が同じ場所で実数に結びつけられており、読み手は変化の実際の大きさを見ることができます。早合点した回答者は、見出しの割合を根拠のない宣伝として退けるでしょう。",
  "A drink maker's label gives the trial counts behind its claim, 14 cases of a stomach complaint among 5,000 users of the new formula against 18 among 5,000 of the old, and calls the difference small and not certain.":
    "ある飲料メーカーの表示は、主張の根拠となる試験の件数を示し、新しい配合の利用者5,000人中14件の胃の不調に対し、従来の配合の5,000人中18件だとした上で、差は小さく確実ではないと述べています。",
  "The counts are shown and the conclusion is scaled down to match them rather than being dressed up as a 22% reduction; a hasty player would expect a percentage to be doing the persuading.":
    "件数が示され、結論は22%の減少として飾り立てられるのではなく、それに見合う大きさに抑えられています。早合点した回答者は、割合が説得の役割を担っていると考えるでしょう。",
  "Two painkillers are compared using patients who started one or the other for the same recorded complaint, at the same clinics, restricted to people who had taken neither before. Side effect rates come out similar.":
    "2つの鎮痛薬を、同じ診療所で同じ記録された症状のためにどちらかを開始した患者を用いて比較します。対象はどちらも以前に使ったことのない人に限られます。副作用の発現率は同程度になります。",
  "Comparing first time users of two drugs given for the same complaint means both groups were treated for the same reason, so the reason for prescribing is not what separates them; a hasty player would assume sicker patients got one of the drugs.":
    "同じ症状に対して出された2つの薬の初回使用者を比べるということは、どちらの群も同じ理由で治療されたということです。処方の理由が両群を分けているのではありません。早合点した回答者は、より重い患者が一方の薬を受け取ったと思い込むでしょう。",
  "More pupils apply for extra tutoring than a council can fund, so places are drawn by lot. The evaluation compares later grades between pupils who were drawn and pupils who applied but were not.":
    "補習の希望者が自治体の予算で賄える人数を上回るため、枠はくじで決められます。評価では、当選した生徒と、応募したが当選しなかった生徒のその後の成績を比較します。",
  "Everyone in both groups wanted the tutoring and only chance decided who received it, so the tutored pupils are not the ones judged to need it most; a hasty player would assume places went to those struggling hardest.":
    "どちらの群の生徒も補習を望んでおり、誰が受けるかは偶然だけが決めました。補習を受けた生徒は最も必要だと判断された生徒ではありません。早合点した回答者は、最も苦労している生徒に枠が回ったと思い込むでしょう。",
  "A haulier puts a new engine oil in every truck whose fleet number ends in an even digit and keeps the rest on the old oil. After a year it compares breakdown rates between the two halves.":
    "ある運送業者が、車両番号の末尾が偶数のトラックすべてに新しいエンジンオイルを入れ、残りは従来のオイルのままにします。1年後、2つの集団の故障率を比較します。",
  "The last digit is arbitrary and has nothing to do with a truck's age or condition, so the treated trucks are not the ones a mechanic thought needed help; a hasty player would assume the worst trucks were picked for the new oil.":
    "末尾の数字は任意であり、トラックの年式や状態とは無関係です。新しいオイルを入れたトラックは整備士が手当てが必要だと考えた車両ではありません。早合点した回答者は、状態の悪いトラックが新しいオイルに選ばれたと思い込むでしょう。",
  "A region that began offering a regular check reports how many residents per 100,000 are found with advanced disease each year. That figure falls over the following decade while neighbouring regions stay flat.":
    "定期的な検査の提供を始めたある地域が、進行した病気が見つかる住民の数を年ごとに100,000人当たりで報告します。その数字は続く10年間で減り、近隣の地域では横ばいのままです。",
  "Fewer advanced cases arising in the whole population cannot be produced by a check that merely finds slow growing cases sooner; a hasty player would expect survival among detected cases to be the number on offer.":
    "人口全体で進行した症例の発生が減ることは、進行の遅い症例を早く見つけるだけの検査では生じません。早合点した回答者は、示されているのは発見された症例の生存期間だと考えるでしょう。",
  "An analyst measuring how long support tickets stay open takes every ticket opened in a given month last year and follows each one to its closure, rather than looking at the tickets sitting in the queue today.":
    "サポートの問い合わせがどれだけ長く未解決のままかを測る分析者が、現在待ち行列にある問い合わせを見るのではなく、昨年のある月に受け付けた問い合わせをすべて取り、それぞれを解決まで追跡します。",
  "Sampling by opening date gives quick and slow tickets the same chance of entering the sample, while a snapshot of the queue would be crowded with the ones that linger; a hasty player would assume the long cases dominate.":
    "受付日で標本を取ると、早く終わる問い合わせも長引く問い合わせも同じ確率で標本に入ります。待ち行列のある時点の断面では長引くものが多くなります。早合点した回答者は、長い事例が支配していると思い込むでしょう。",
  "A national medicines agency reviews a treatment using every trial the maker was required to file with it, including three whose results were never written up anywhere, and pools them all.":
    "ある国の医薬品規制当局が、製造販売業者が提出を義務づけられていた試験をすべて用いて治療法を評価します。結果がどこにも発表されなかった3件を含め、すべてを統合します。",
  "The pool is defined by what had to be filed rather than by what reached a journal, so dull results are still in it; a hasty player would assume the review was built from the literature.":
    "統合の対象は学術誌に載ったものではなく提出が義務づけられたもので定義されているため、地味な結果も含まれています。早合点した回答者は、この評価が文献から組み立てられたと思い込むでしょう。",
  "A product team's quarterly memo lists the outcome of all forty tests it ran that quarter, including the twenty seven that moved nothing, alongside the four whose results it acted on.":
    "あるプロダクトチームの四半期報告は、その四半期に実施した40件の試験すべての結果を、何も動かなかった27件も含めて列挙し、結果を受けて対応した4件と並べて示します。",
  "Every experiment run is reported, so the ones that worked are read against the full set of attempts; a hasty player would assume only the wins were written up.":
    "実施した実験がすべて報告されているため、うまくいったものは試行の全体と照らして読むことができます。早合点した回答者は、勝った実験だけが記事にされたと思い込むでしょう。",
  "Before averaging fifteen field trials of a fertiliser, an analyst compares the small trials with the large ones and notes that the small ones landed below the overall average as often as above it.":
    "ある肥料の15件の圃場試験を平均する前に、分析者は小規模試験と大規模試験を比べ、小規模試験が全体平均を下回る頻度と上回る頻度が同じだったと記します。",
  "The check for missing unfavourable small studies was made and came out clean, which is the very thing that would otherwise tilt the average; a hasty player would assume the small trials were the ones cherry picked.":
    "不利な小規模研究が欠けていないかの確認が行われ、問題は見つかりませんでした。それこそが本来なら平均を傾けるものです。早合点した回答者は、小規模試験こそが都合よく選ばれたものだと思い込むでしょう。",
  "A city offers a free three month transit pass to a randomly chosen half of newly registered residents. The evaluation compares car trips between everyone offered a pass and everyone not offered, including the third who never collected theirs.":
    "ある市が、新たに転入した住民の半数を無作為に選び、3か月間無料の交通パスを提供します。評価では、パスを提供された全員と提供されなかった全員の自動車利用回数を比較し、パスを受け取らなかった3分の1も含めます。",
  "People are counted in the group they were offered, so those keen enough to collect a pass are not being measured against everybody else; a hasty player would want only the actual pass holders analysed.":
    "人々は提供された群のまま数えられているため、わざわざパスを受け取るほど熱心な人が他の全員と比べられているのではありません。早合点した回答者は、実際にパスを持っている人だけを分析すべきだと考えるでしょう。",
  "A jobs programme evaluation counts every applicant in the group chance assigned them to. For the twenty two who could not be traced at one year, it repeats the sums assuming first that all were unemployed and then that all were working, and the ranking holds either way.":
    "ある就労支援計画の評価は、応募者全員を偶然が割り当てた群のまま数えます。1年後に追跡できなかった22人については、まず全員が失業していたと仮定し、次に全員が就労していたと仮定して計算し直しますが、順位はどちらでも変わりません。",
  "Nobody is dropped for being untraceable, and the two extreme assumptions bracket anything the missing answers could have done; a hasty player would assume the untraced were quietly excluded.":
    "追跡できないことを理由に除外された人はおらず、2つの極端な仮定が、欠けた回答が及ぼしうるあらゆる影響を挟み込んでいます。早合点した回答者は、追跡できなかった人が黙って除外されたと思い込むでしょう。",
  "A haulage study compares trucks that were fitted with a driver alert system when they were bought against trucks bought without one, counting each truck's mileage from the day it entered service.":
    "ある運送業の研究が、購入時に運転者警報装置を取り付けたトラックと、装置なしで購入したトラックを比較し、各トラックの走行距離を運用開始日から数えます。",
  "Which group a truck belongs to was settled before its clock started, so no truck has to survive a waiting period in order to count as equipped; a hasty player would assume the fitted trucks were credited with time before fitting.":
    "どちらの群に属するかは時計が動き出す前に決まっているため、装備ありとして数えられるために待機期間を生き延びる必要があるトラックはありません。早合点した回答者は、装備したトラックに取り付け前の期間が加算されていると思い込むでしょう。",
  "An employer compares staff who passed a certification with those who did not. Each person who passed is matched, at the moment of passing, to a colleague still employed at that point with the same months of service, and both are followed from then on.":
    "ある雇用主が、資格に合格した社員と合格しなかった社員を比較します。合格した各人は、合格した時点で、その時点でなお在籍し勤続月数が同じ同僚と対応づけられ、両者はそこから追跡されます。",
  "Follow up starts when the certification is achieved and the matched colleague has already worked the same stretch, so the months spent studying are not credited to the certified group; a hasty player would assume that time was counted.":
    "追跡は資格取得の時点から始まり、対応づけられた同僚もすでに同じ期間働いています。学習に費やした月数が資格取得群の功績に数えられることはありません。早合点した回答者は、その期間が数えられていると思い込むでしょう。",
  "A study of whether long commutes wear people down uses travel diaries that staff filled in each week through the year, well before anyone knew who would later resign.":
    "長い通勤が人をすり減らすかを調べる研究が、誰が後に退職するか分かるずっと前に、社員が1年を通じて毎週記入した移動記録を用います。",
  "The exposure was written down as it happened rather than reconstructed afterwards, so knowing the outcome cannot have coloured the answers; a hasty player would assume leavers were asked to look back.":
    "曝露は後から再構成されたのではなく、起きたその時に書き留められています。結果を知っていることが回答に色を付けることはありえません。早合点した回答者は、退職者が振り返って尋ねられたと思い込むでしょう。",
  "To ask whether a safety course reduces injuries, an analyst takes attendance from the course register and injuries from the insurer's claim file, matching the two by employee number. Nobody is asked to remember anything.":
    "安全講習が負傷を減らすかを調べるため、分析者は受講記録から出席を、保険会社の請求記録から負傷を取り、社員番号で突き合わせます。誰も何かを思い出すよう求められません。",
  "Both the exposure and the outcome come from records written at the time, so no one's account of the course can be shaped by whether they were later hurt; a hasty player would assume the workers were interviewed.":
    "曝露も結果もその時に書かれた記録から取られているため、講習についての説明が後に負傷したかどうかで形づくられることはありません。早合点した回答者は、労働者に聞き取りをしたと思い込むでしょう。",
  "Owners of a failed appliance and owners of a working one are asked when they bought it and how often they ran it. Their answers are then compared with till receipts and app usage logs, and the two groups' errors turn out to be the same size and in the same direction.":
    "故障した家電の所有者と正常に動いている家電の所有者に、購入時期と使用頻度を尋ねます。その回答をレシートとアプリの利用記録と照合すると、2つの群の誤差は同じ大きさで同じ方向であることが分かります。",
  "The reported histories were checked against records and both groups misremembered equally, so the comparison is not driven by one group searching its memory harder; a hasty player would assume the aggrieved owners overstated their use.":
    "申告された履歴は記録と照合され、両群とも同じ程度に記憶違いをしていました。したがってこの比較は、一方の群がより熱心に記憶をたどったことによるものではありません。早合点した回答者は、不満を抱えた所有者が使用を誇張したと思い込むでしょう。",

  // ---- intention to treat, recall bias, immortal time ----
  "Where every excluded patient had already relapsed":
    "除外された患者が全員すでに再発していた試験",
  "A trial compared two treatments for opioid dependence in 570 people. Counting only those who actually started the drug they were assigned, the first treatment looked slightly better: 52 percent relapsed against 56 percent. Counting everyone the coin assigned, it was clearly worse, 65 percent against 57 percent. The reason is the cleanest you will find. That first drug can only be started after a full detoxification, or it triggers immediate withdrawal, so 79 of its patients never managed to begin it, against 17 in the other arm. Every single one of those 79 relapsed. Dropping them removed the whole of the treatment's failure.":
    "ある試験が、オピオイド依存に対する2つの治療を570人で比較しました。割り付けられた薬を実際に開始した人だけを数えると、1つ目の治療のほうがわずかに良く見え、再発は52パーセント対56パーセントでした。ランダム化で割り付けられた全員を数えると、明らかに悪く、65パーセント対57パーセントでした。理由はこれ以上ないほど明快です。1つ目の薬は完全な解毒を終えてからでないと開始できず、そうでなければ直ちに離脱症状を引き起こすため、79人が開始できませんでした（もう一方の群では17人）。その79人は全員が再発しました。この人たちを除外することで、治療の失敗がまるごと消えていたのです。",
  "Almost two thirds of the months people spent on this drug brought muscle pain. Is the drug doing it?":
    "この薬を飲んでいた期間の3分の2近くで筋肉の痛みが出ました。原因は薬でしょうか。",
  "152 people who had all had muscle trouble on a statin before took part. Each spent up to six two-month stretches on either atorvastatin or an identical dummy tablet, in a random order, without knowing which was which, and said at the end of each stretch whether they had muscle symptoms. Muscle symptoms were reported in 62.5 percent of the stretches on the drug.":
    "以前にスタチンで筋肉の不調を経験したことのある152人が参加しました。それぞれが、アトルバスタチンか見分けのつかない偽薬のどちらかを、ランダムな順序で、どちらかを知らされないまま2か月ずつ最大6期間服用し、各期間の終わりに筋症状があったかどうかを答えました。薬を飲んだ期間の62.5パーセントで筋症状が報告されました。",
  "Is the statin causing the pain?":
    "その痛みの原因はスタチンでしょうか。",
  "Two-month stretches with muscle symptoms":
    "筋症状のあった2か月の期間",
  "Stretches on the statin":
    "スタチンを飲んだ期間",
  "Stretches on the dummy tablet":
    "偽薬を飲んだ期間",
  "Dummy":
    "偽薬",
  "All stretches":
    "すべての期間",
  "On the drug":
    "薬を飲んだ期間",
  "Yes, the drug is causing it":
    "はい、原因は薬です",
  "two thirds of the time":
    "3分の2の期間で出ています",
  "No, the pain is not real":
    "いいえ、痛みは本物ではありません",
  "they are imagining it":
    "気のせいです",
  "The pain is real, and the drug is not causing it":
    "痛みは本物ですが、原因は薬ではありません",
  "compare it with something":
    "何かと比べる必要があります",
  "The dummy tablet did almost exactly the same thing.":
    "偽薬でもほとんど同じことが起きていました。",
  "There was nothing in the other tablet":
    "もう一方の錠剤には何も入っていませんでした",
  "The same people, in the same months, taking a tablet with no drug in it, reported muscle symptoms 61.6 percent of the time. Nobody knew which tablet they were on. So the pain was there either way, and the 62.5 percent on the statin is almost entirely a rate of muscle pain in people who ache, not a rate of pain caused by the drug:":
    "同じ人たちが、同じ時期に、薬の入っていない錠剤を飲んだ期間の61.6パーセントで筋症状を報告しました。どちらの錠剤かは誰も知りませんでした。つまり痛みはどちらでも同じように現れており、スタチンでの62.5パーセントは、そのほとんどが痛みを抱えやすい人たちに筋肉の痛みが起きる割合であって、薬が引き起こした痛みの割合ではありません。",
  "Both tablets":
    "両方の錠剤",
  "That is what a control group is for, and why a rate on its own can never answer the question. Muscle pain is common. It is commoner still in people who have had it before, who are watching for it, and who have been handed a leaflet listing it. The only way to find out what the drug adds is to run the same months without it, which is what this trial did.":
    "対照群があるのはそのためであり、割合だけを見ても問いに答えられないのもそのためです。筋肉の痛みはよくあるものです。以前に経験したことがあり、それに注意を向けており、症状として書かれた説明書を渡された人ではなおさらです。薬が何を上乗せしているのかを知る唯一の方法は、同じ期間を薬なしで過ごしてもらうことで、この試験はまさにそれを行いました。",
  "What the second bar is for":
    "2本目の棒があるわけ",
  "The nocebo effect":
    "ノセボ効果",
  "A symptom that appears after you start a drug is not evidence the drug caused it, until you know how often the same symptom appears in people taking nothing.":
    "薬を始めた後に現れた症状は、何も飲んでいない人に同じ症状がどれくらいの頻度で現れるのかを知らないかぎり、薬が原因だという証拠にはなりません。",
  "Note carefully what this does not say. The pain is real: these people hurt, and were not pretending. Rare genuine statin muscle injury exists and is a different thing, diagnosed differently. Everyone here had already had muscle trouble on a statin, so this is a selected group rather than the general population. And the trial says nothing at all about whether statins do their job. What it settles is narrower and more useful: for this common complaint, the tablet and the dummy behaved the same.":
    "これが述べていないことに注意してください。痛みは本物です。参加者は実際に痛みを感じており、演技をしていたわけではありません。まれではありますがスタチンによる本物の筋障害は存在し、それは別のもので、診断の仕方も異なります。ここでの参加者は全員が以前スタチンで筋肉の不調を経験しており、一般の人々ではなく選ばれた集団です。またこの試験は、スタチンが本来の役目を果たすかどうかについては何も語っていません。分かったのはもっと限定的で、その分だけ役に立つことです。このよくある訴えに関しては、実薬も偽薬も同じように振る舞ったということです。",
  "Expecting a side effect helps produce it, and being told to watch for one makes you notice sensations you would otherwise have let pass. That is the nocebo effect, the unhappy twin of the placebo effect, and it is not lying or weakness: attention genuinely changes what a body reports, and aches are ordinary enough that everyone has some to find. The reasoning trap around it is simpler than the psychology. Someone starts a drug, a symptom appears, and the two get joined up, because a story with a cause in it is easier to hold than a coincidence. The missing number is always the same one: how often does that symptom turn up in people who did not take the drug? Without it, a side-effect rate is not a measurement of the drug at all, it is a measurement of how common the symptom is in the kind of person who gets prescribed it. This is why blinding matters so much for anything a patient reports. Once someone knows they are on the drug, their symptom reports are partly about the drug and partly about knowing, and the two cannot be separated afterwards. The effect is large enough to reverse conclusions: in trials of the same drug, side-effect rates measured while nobody knew who was taking what are routinely far lower than the rates measured once everyone knows. None of which means a reported side effect should be waved away. It means the question of whether this is the drug gets answered by taking the drug away and putting it back, not by counting how many people on it have the symptom.":
    "副作用を予期することはその発生を後押しし、注意するように言われると、そうでなければ気に留めずに過ぎたはずの感覚にも気づくようになります。これがノセボ効果、つまりプラセボ効果の不幸な双子であり、うそでも弱さでもありません。注意を向けることは体が報告する内容を実際に変えますし、痛みや不調はありふれていて、探せば誰にでも何かしら見つかるものです。ここにある推論の落とし穴は、心理の仕組みよりも単純です。誰かが薬を始め、症状が現れ、その二つが結びつけられます。原因のある物語のほうが、偶然よりも受け止めやすいからです。抜けている数字はいつも同じです。その症状は、薬を飲まなかった人にどれくらいの頻度で現れるのか。それがなければ、副作用の発生率は薬を測ったものではまったくなく、その薬を処方されるような人にその症状がどれだけよくあるかを測ったものにすぎません。だからこそ、患者本人が報告するものについては盲検がこれほど重要になります。自分が薬を飲んでいると分かった時点から、症状の報告は薬によるものと、知っていることによるものが混ざり、後から二つを切り分けることはできません。その影響は結論をひっくり返すほど大きく、同じ薬の試験でも、誰が何を飲んでいるか誰も知らない状態で測った副作用の発生率は、全員が知った後で測った発生率よりはるかに低いのが常です。とはいえ、報告された副作用を軽く扱ってよいという話ではありません。これは薬のせいなのかという問いは、薬をいったんやめて、また戻してみることで答えが出るのであって、薬を飲んでいる人のうち何人に症状があるかを数えても答えは出ない、ということです。",
  "The months with no tablet at all":
    "錠剤をまったく飲まない期間",
  "A companion trial went one better and added a third condition: months on the statin, months on an identical dummy, and months taking nothing whatsoever, all in a random order, with participants rating their symptoms every day. The months on the dummy tablet were nearly as bad as the months on the statin. The months with no tablet were far better than either. Most of the symptom burden, in other words, came from the act of taking a tablet rather than from what was in it, and half the participants restarted a statin afterwards.":
    "関連する別の試験は、さらに一歩進んで3つ目の条件を加えました。スタチンを飲む期間、見分けのつかない偽薬を飲む期間、そして何も飲まない期間を、すべてランダムな順序で設け、参加者は毎日症状を評価しました。偽薬の期間は、スタチンの期間とほぼ同じくらいつらいものでした。何も飲まない期間は、そのどちらよりもはるかに軽く済みました。つまり症状の負担の大半は、錠剤に何が入っていたかではなく、錠剤を飲むという行為から生じていたことになり、この後、参加者の半数がスタチンを再開しました。",
  "The nocebo effect, a reasoning trap.":
    "ノセボ効果、推論の落とし穴。",
  "You start a new tablet, and a week later your legs ache. The tablet did it, obviously. Except that aches are common, and expecting one helps you find it. In one trial, people took a statin for some months and an identical tablet with nothing in it for others, without knowing which. They reported muscle pain in 62.5 percent of the months on the drug, and 61.6 percent of the months on the dummy. The pain was real. The drug was not what was causing it. A side-effect rate with nothing to compare it against tells you how common the symptom is, not what the drug does.":
    "新しい錠剤を飲み始め、1週間後に脚が痛みます。原因は錠剤だ、と思うのが自然です。ただ、痛みはありふれたもので、予期していると見つけやすくもなります。ある試験では、参加者がどちらか分からないまま、ある期間はスタチンを、別の期間は中身のない同じ見た目の錠剤を飲みました。筋肉の痛みが報告されたのは、薬の期間の62.5パーセント、偽薬の期間の61.6パーセントでした。痛みは本物でした。原因は薬ではありませんでした。比べる相手のない副作用の発生率が教えてくれるのは、その症状がどれくらいよくあるかであって、薬が何をしているかではありません。",
  "The denominators are two-month treatment periods, not people: 152 participants each completed up to six blinded periods, three of atorvastatin 20 mg and three of matching placebo, so 785 periods come from 152 individuals. The paper's own column heading says participants, which is loose wording on its part, and the figures are presented here as periods because that is what they are. For the same reason the paper's odds ratio cannot be recomputed from these four numbers, since one person contributes several periods, so it is not quoted. A person-level figure is also printed: 18 of 200 randomised participants withdrew because of intolerable muscle symptoms while on atorvastatin, against 13 of 200 while on placebo. Participants were recruited precisely because they had had muscle symptoms on a statin before, so this is a selected group and its rates should not be read as rates in the general population.":
    "分母は人数ではなく2か月の治療期間です。152人の参加者がそれぞれ最大6期間の盲検期間を完了し、そのうち3期間がアトルバスタチン20 mg、3期間が対応するプラセボであるため、785期間は152人から生じています。原論文の表の見出しは参加者となっていますが、これは論文側の緩い表現であり、ここでは実際のとおり期間として示しています。同じ理由で、1人が複数の期間に寄与するため、論文のオッズ比をこの4つの数値から再計算することはできず、引用していません。人単位の数値も報告されています。ランダム化された200人のうち、アトルバスタチン服用中に耐えがたい筋症状のために中止したのは18人、プラセボ服用中は200人のうち13人でした。参加者は以前にスタチンで筋症状を経験していたことを理由に募集されており、選ばれた集団であるため、その割合を一般集団での割合として読むべきではありません。",
  "Six months after a wind farm opened, a campaign group posted leaflets asking residents to report headaches and poor sleep. Ninety of the 400 households replied describing such symptoms. The group states that the turbines are making the village ill and wants them switched off.":
    "風力発電所が稼働して半年後、ある運動団体が、頭痛や睡眠の悪化を報告するよう住民に呼びかけるちらしを配りました。400世帯のうち90世帯が、そうした症状を訴える返答をしました。団体は、風車が村の住民を病気にしていると主張し、稼働の停止を求めています。",
  "Nobody counted headaches and poor sleep in comparable villages with no turbines, where both are common anyway. A leaflet asking people to watch for particular symptoms also changes how many get noticed and reported.":
    "風車のない同じような村で、頭痛や睡眠の悪化を数えた人はいません。そうした村でもどちらもよくあることです。特定の症状に注意するよう求めるちらしは、気づかれて報告される数そのものも変えます。",
  "An office replaced its ventilation system and emailed staff that the airflow would feel different. A survey the following month found 38% reporting afternoon tiredness and dry throats. Facilities management concluded the new system was at fault and had it re-engineered.":
    "あるオフィスが換気設備を入れ替え、空気の流れの感じが変わると社員にメールで知らせました。翌月の調査では、38%が午後の眠気とのどの乾燥を報告しました。施設管理部門は新しい設備に問題があると結論づけ、再設計させました。",
  "The same question was never asked before the change, nor on the floors still running the old system, so there is nothing to say whether 38% is unusual for that building.":
    "同じ質問は、入れ替えの前にも、古い設備のままのフロアでも行われていないため、38%がその建物にとって異常な値なのかを判断する材料がありません。",
  "A student unplugs his hall's new wireless router at night and records that he sleeps better on the nights it is off. He tells friends, who try it and agree. The residents' committee asks for the router to be taken out.":
    "ある学生が寮の新しい無線ルーターを夜間に抜き、切っている夜のほうがよく眠れると記録しました。友人たちに話すと、試した友人たちも同意しました。寮生委員会はルーターの撤去を求めています。",
  "He knew on every single night whether the router was on, so what he expected could shape both his sleep and how he rated it. The test needs nights where neither he nor whoever flipped the switch knew.":
    "彼は毎晩、ルーターが入っているかどうかを知っていたので、彼の予期が、眠りそのものにも、その評価の仕方にも影響しえます。この検証には、本人もスイッチを操作した人も分からない夜が必要です。",
  "A primary school was repainted over the holidays. In the first week back, 27 pupils were sent home feeling sick. A parents' meeting concluded that fumes from the paint were responsible and called for the classrooms to be stripped.":
    "ある小学校が休みの間に塗り替えられました。休み明けの最初の1週間で、27人の児童が気分が悪くなって早退しました。保護者会は塗料の臭気が原因だと結論づけ、教室の塗装をはがすよう求めました。",
  "No one checked how many pupils are sent home sick in a normal first week back, or whether nearby schools with no new paint saw the same thing that week.":
    "普段の休み明け最初の1週間に何人の児童が体調不良で早退するのかも、塗り替えのない近隣の学校でその週に同じことが起きていたかも、誰も確認していません。",
  "A retailer issued a new uniform. After a widely shared staff forum thread about the fabric being itchy, complaints of rashes went from a handful to several hundred in a fortnight. The retailer withdrew the uniform and apologised.":
    "ある小売業者が新しい制服を導入しました。生地がちくちくするという社内フォーラムの投稿が広く共有された後、発疹の訴えは2週間でわずか数件から数百件に増えました。会社は制服を回収し、謝罪しました。",
  "The itching is real, but the surge tracks the forum thread rather than the rollout, and rash rates were never compared with branches still wearing the old uniform, where skin complaints also occur.":
    "かゆみは本物ですが、急増の時期は制服の導入ではなくフォーラムの投稿と重なっています。また発疹の発生率は、旧制服のままの店舗と比較されたことがなく、そうした店舗でも皮膚の訴えは起こります。",
  "An app update's release notes warned that text might look slightly different. Tickets mentioning eye strain tripled that week. The team announced a rollback, tickets returned to normal, and the engineer wrote that the change had been straining users' eyes.":
    "あるアプリ更新のリリースノートに、文字の見え方が少し変わるかもしれないと書かれていました。その週、眼精疲労に触れる問い合わせが3倍になりました。チームは差し戻しを発表し、問い合わせは元の水準に戻り、担当エンジニアはこの変更がユーザーの目に負担をかけていたと書きました。",
  "Users told to expect a visual difference went looking for one, and the rollback was announced just as loudly, so both the rise and the fall follow what people were told rather than any measured change on screen.":
    "見た目が変わると伝えられたユーザーはその違いを探しに行きますし、差し戻しも同じくらい大きく告知されました。増加も減少も、画面上で測定された変化ではなく、人々が何を伝えられたかに沿って動いています。",
  "A taxi firm switched to electric cars and briefed drivers that the smooth one-pedal acceleration can make passengers queasy, asking them to note any complaints. Drivers logged sixty queasy passengers in a month. The firm concluded the cars cause travel sickness and reordered the old fleet.":
    "あるタクシー会社が電気自動車に切り替え、なめらかなワンペダルの加速で乗客が気分を悪くすることがあると運転手に説明し、苦情があれば記録するよう求めました。運転手は1か月で60人の気分が悪くなった乗客を記録しました。会社は車が乗り物酔いを起こすと結論づけ、以前の車両を再発注しました。",
  "Nobody ever logged queasy passengers in the old fleet, so sixty has nothing to be compared against, and drivers primed to expect complaints will hear and record more of them.":
    "以前の車両で気分が悪くなった乗客が記録されたことはなく、60という数字には比較する相手がありません。また苦情を予期するよう仕向けられた運転手は、それをより多く聞き取り、より多く記録します。",
  "A wellness programme tells participants that days two and three will bring headaches, irritability and aching as the body clears itself. Most report exactly that, then feel better. The organiser presents this as proof the programme is doing its work.":
    "ある健康プログラムは、体が自ら解毒される過程で、2日目と3日目に頭痛、いらだち、体の痛みが出ると参加者に伝えています。ほとんどの参加者がまさにそのとおりに報告し、その後は楽になります。主催者はこれをプログラムが効いている証拠として示しています。",
  "Participants were told precisely which sensations to expect and on which days, and no comparison group followed an ordinary diet or an inert version of the plan. The pattern matches the prediction they were given.":
    "参加者は、どの感覚がどの日に出るかを正確に伝えられており、普通の食事や中身のないプログラムを行う比較群はありませんでした。現れたパターンは、与えられた予告と一致しています。",
  "During a trial's blinded year, muscle aches were reported by 14% on the tablet and 13% on the dummy. Everyone was then told what they had taken and offered the tablet openly; that year one in five reported aches. A patients' group says the harm only shows in real use.":
    "ある試験の盲検だった1年間では、筋肉の痛みを報告したのは錠剤で14%、偽薬で13%でした。その後、全員に自分が何を飲んでいたかが伝えられ、その錠剤が非盲検で提供されました。その年は5人に1人が痛みを報告しました。ある患者団体は、害は実際の使用でのみ現れると述べています。",
  "The only thing that changed between the two years is that everyone now knew what they were taking. While nobody knew, the ache rate was the same with the drug and without it.":
    "2つの年の間で変わったのは、全員が自分の飲んでいるものを知るようになったという点だけです。誰も知らなかった間は、痛みの割合は薬があってもなくても同じでした。",
  "A pharmacy moved patients onto an equivalent tablet from a different maker, oval and yellow rather than round and white, sending a letter explaining the change. Reports of dizziness and nausea from those patients rose fivefold over two months, and a newsletter concluded the new version is poorly tolerated.":
    "ある薬局が、患者を別のメーカーの同等の錠剤に切り替えました。丸くて白い錠剤から、楕円形で黄色い錠剤への変更で、その説明の手紙を送りました。これらの患者からのめまいと吐き気の報告は2か月で5倍に増え、ある会報は新しい方の錠剤は忍容性が低いと結論づけました。",
  "The letter drew attention to the change and gave everyday dizziness something new to be attributed to, and no one measured the rate over the same two months in patients kept on the original tablet.":
    "手紙は変更に注意を向けさせ、日常的に起こるめまいに新たな原因の候補を与えました。また、元の錠剤のままの患者について、同じ2か月間の発生率を測った人はいません。",
  "A retailer had 200 volunteers wear a sleeve of the new cloth on one arm and the old cloth on the other for two weeks, without being told which was which. An assessor who did not know either graded photographs of both arms: visible redness on 31 new-cloth arms and 4 old-cloth arms.":
    "ある小売業者が、200人の協力者に、片腕に新しい生地の袖を、もう片方の腕に古い生地の袖を、どちらがどちらか知らされないまま2週間着けてもらいました。同じく知らされていない評価者が両腕の写真を判定したところ、目に見える赤みが認められたのは、新しい生地の腕が31、古い生地の腕が4でした。",
  "Every volunteer carried both fabrics at once without knowing which arm had which, and the redness was graded by someone equally unaware, so what anyone expected cannot account for the gap.":
    "どの協力者も、どちらの腕がどちらの生地か知らないまま両方の生地を同時に身につけており、赤みも同じく知らされていない人が判定しているため、誰かの予期でこの差を説明することはできません。",
  "A man's back pain began after a new mattress arrived. His partner swapped the old and new mattresses under identical covers on a schedule he never saw, three times across six weeks. His pain scores were high on every new-mattress stretch and low on every old-mattress stretch.":
    "ある男性の腰痛は、新しいマットレスが届いた後に始まりました。パートナーが、同じカバーをかけた古いマットレスと新しいマットレスを、本人が見ていない予定に沿って、6週間で3回入れ替えました。彼の痛みの点数は、新しいマットレスの期間はいずれも高く、古いマットレスの期間はいずれも低いままでした。",
  "The mattress was removed and returned repeatedly while he had no way of knowing which one he was lying on, so his expectations could not have followed the pattern his pain followed.":
    "本人がどちらのマットレスで寝ているのか知りようがない状態で、マットレスは繰り返し外され、また戻されました。ですから、彼の予期が、痛みの描いたパターンをなぞることはありえません。",
  "A housing committee reviewing a new communal heating system logged 46 residents reporting headaches and dry eyes. Its report states that no similar block without the system was surveyed, that nobody knows how common these complaints were beforehand, and that it therefore cannot say the system is the cause.":
    "新しい共同暖房設備を検討していた住宅委員会は、頭痛と目の乾きを訴える住民46人を記録しました。報告書には、この設備のない同じような集合住宅は調査されていないこと、これらの訴えが以前どれくらいよくあったかは誰も知らないこと、したがって設備が原因だとは言えないことが書かれています。",
  "The committee reports the count it actually has and stops there, because with no comparable block and no before figure a complaint total on its own supports no causal claim.":
    "委員会は、実際に手元にある件数を報告し、そこで止めています。比較できる集合住宅も、以前の数字もない以上、訴えの合計だけでは因果関係の主張を支えられないからです。",
  "In a trial where neither patients nor their doctors knew who was getting what, dry mouth was reported by 44% of those on the drug and 6% of those on the dummy tablet. The report lists dry mouth as a side effect of the drug.":
    "患者も担当医もどちらが何を受けているかを知らない試験で、口の渇きを報告したのは、薬を飲んでいた人の44%、偽薬を飲んでいた人の6%でした。報告書は口の渇きをその薬の副作用として挙げています。",
  "Both groups were equally unaware of what they were taking and equally primed to watch for side effects, so the gap between 44% and 6% is what the drug itself added.":
    "どちらの群も、自分が何を飲んでいるかを同じように知らされておらず、副作用に注意するよう同じように仕向けられていたため、44%と6%の差は薬そのものが上乗せした分です。",

  // ---- Non-differential misclassification (puzzle, review items, scope labels) ----
  "Mothers of babies born damaged recalled more drugs in pregnancy than their own records held. Is grief rewriting their memory?": "死亡または奇形のあった子の母親は、自分自身の記録に残っている以上に、妊娠中に服用した薬を回想していました。悲しみが記憶を書き換えているのでしょうか。",
  "Two matched groups of 203 Finnish mothers were asked after delivery which drugs they had taken in early pregnancy. Some named drugs that nothing in their pregnancy record supported.": "マッチさせた203人ずつのフィンランド人の母親2群に対し、出産後、妊娠初期にどの薬を服用していたかをたずねました。なかには、妊娠中の記録には何の裏づけもない薬を挙げた母親もいました。",
  "What is going on here?": "ここでは何が起きているのでしょうか。",
  "Drugs named after delivery with no earlier record": "以前の記録になく、出産後になって挙げられた薬",
  "Asked in month five, before anyone knew the outcome": "誰も転帰を知らない、妊娠5か月目の回答",
  "Asked again after delivery, same form, same midwife": "出産後、同じ様式・同じ助産師で尋ねた回答",
  "Repeated identically": "同一の内容で再現された",
  "Not repeated": "再現されなかった",
  "Named only afterwards": "後になって初めて挙げられた",
  "took a drug in early pregnancy": "妊娠初期に薬を服用した",
  "Healthy child": "健康な子",
  "Death or malformation": "死亡または奇形",
  "A mother searching for a reason digs harder and remembers more": "理由を探す母親は、より熱心に探り、より多くを思い出します",
  "The drugs really were taken more often": "実際に薬がより多く服用されていました",
  "The extra reports are true, and the records are incomplete": "追加の報告は事実であり、記録のほうが不完全です",
  "Memory is this bad in both groups": "両群とも、記憶はこれほど当てになりません",
  "Error in every direction, at roughly the same rate": "誤りはあらゆる方向に、ほぼ同じ割合で生じています",
  "Both groups had already forgotten most of what they told the same midwife months earlier.": "両群とも、数か月前に同じ助産師に話した内容の大半を、すでに忘れていました。",
  "Error that does not take sides": "どちらの側にも肩入れしない誤り",
  "Mothers of healthy babies repeated just 33 of their own 182 earlier reports. Mothers of damaged babies repeated 23 of 187. Both groups lost around 85 percent of what they themselves had said, and both added drugs that were never recorded. The authors tested it and found no significant difference between the groups in the share of replies that failed to match.": "健康な子の母親は、以前の182件の回答のうち、わずか33件しか再現できませんでした。死亡または奇形があった子の母親は、187件のうち23件でした。どちらの群も、自分自身が述べたことのおよそ85パーセントを失っており、どちらの群も記録にはなかった薬を付け加えていました。著者らはこれを検定し、回答が一致しなかった割合に群間の有意差は見られませんでした。",
  "So the extra reports in the second group are not memory bending toward an explanation. They are the same broken recall that both groups show, and the difference between 57 and 41 sits inside the noise that unreliability of this size produces. When error hits both groups alike, it does not manufacture an association. It smears the exposed and unexposed into each other, which drags any real difference toward no difference at all.": "つまり、2番目の群の追加の報告は、説明を求めて記憶が曲がった結果ではありません。両群に共通する、同じ壊れた想起であり、57と41の差は、これほどの不信頼性が生み出す雑音の範囲に収まっています。誤りが両群に等しく降りかかるとき、それは関連を作り出しません。曝露群と非曝露群を互いに紛れ込ませ、本物の差があっても、それを差がない方向へ引き寄せてしまいます。",
  "What the earlier answers show": "以前の回答が示すもの",
  "Non-differential misclassification": "非差異的誤分類",
  "When a measurement is equally wrong in every group, it does not invent an effect. It hides one. The usual result is a real association flattened toward nothing, so a null finding from a badly measured exposure is not evidence of no effect.": "測定がどの群でも等しく誤っているとき、それは効果を作り出しません。効果を隠すのです。よくある結果は、本物の関連が押しつぶされてほとんどゼロになることであり、測定の粗い曝露からの帰無の所見は、効果がないことの証拠にはなりません。",
  "Ask two questions of any measurement, not one. First, is the error different between the groups? That is the bias everyone is taught to look for. Second, and far more often the answer, is the error simply enormous in all of them? That one is rarely mentioned, is much more common, and pushes findings toward the null, which means it quietly protects wrong beliefs from being disproved.": "どんな測定に対しても、問いは1つではなく2つ立てましょう。第一に、誤りは群のあいだで異なっているか。これは誰もが探すよう教えられているバイアスです。第二に、そしてこちらのほうがはるかに多い答えなのですが、誤りはすべての群で単純に途方もなく大きいのではないか。こちらはめったに触れられませんが、ずっとありふれており、所見を帰無の方向へ押しやります。つまり、誤った思い込みが反証されるのを、静かに守っているのです。",
  "Picture an exposure that truly doubles risk. Now measure it with a method that gets it right only a fifth of the time, in exposed and unexposed alike. Many genuinely exposed people are filed as unexposed and the reverse, so the two groups you end up comparing are both mixtures of the real ones. Mixtures differ less than their ingredients, so the measured ratio slides toward 1. Push the error far enough and a real effect disappears entirely. That is why this paper's headline finding is not that mothers were biased, but that a retrospective interview about early pregnancy is close to unusable as a measurement, whoever is answering.": "本当にリスクを2倍にする曝露を思い描いてください。それを、曝露群でも非曝露群でも5回に1回しか正しく判定できない方法で測定するとします。本当は曝露していた人の多くが非曝露に分類され、その逆も起こるため、最終的に比較する2つの群は、どちらも本物の混ざり合ったものになります。混ざり合ったものどうしは、その材料そのものより差が小さくなるので、測定される比は1の方向へ近づきます。誤りを十分に大きくすれば、本物の効果は完全に消え去ります。だからこそ、この論文の一番の発見は、母親たちにバイアスがあったことではなく、妊娠初期についての後ろ向きの面接は、誰が答えようとも測定としてほとんど使い物にならない、ということなのです。",
  "The largest test of this, and it found no bias either": "これに関する最大の検証、そこでもバイアスは見つかりませんでした",
  "The United Kingdom Childhood Cancer Study compared what 1,624 case mothers and 2,524 control mothers reported against their own general-practice records. Differential recall, the effect everyone expects, was essentially absent. It is worth knowing that the bias people reach for first is often not the one present.": "英国小児がん研究（UKCCS）は、症例群の母親1,624人と対照群の母親2,524人がそれぞれ語った内容を、本人のかかりつけ医の記録と比較しました。誰もが予想する効果である差異的な想起は、実質的に見られませんでした。人が真っ先に持ち出すバイアスが、実際には存在しないことが多いというのは、知っておく価値があります。",
  "Non-differential misclassification, a reasoning trap.": "非差異的誤分類、推論の罠。",
  "If a measurement is wrong in the same way for everybody, it does not create a fake result. It buries a real one. Bad measurement makes things look like they do not matter.": "測定が誰に対しても同じように誤っているなら、それは偽の結果を作り出しません。本物の結果を埋もれさせるのです。悪い測定は、物事を、重要ではないかのように見せてしまいます。",
  "Everyone says recall bias. The real answer is worse.": "みんな思い出しバイアスだと言います。本当の答えは、もっと厄介です。",
  "I confidently diagnosed recall bias. It was not recall bias.": "自信満々に思い出しバイアスだと診断しました。思い出しバイアスではありませんでした。",
  "Every count is printed in Table 1 and reconciles three ways: the prospective rows sum to the totals the authors state in prose (34 + 43 = 77 diseases, 182 + 187 = 369 drugs), the two additional-information cells sum to 98, which Figure 1 prints separately, and 98 of the 154 positive retrospective drug replies lacking any prospective history is the approximately two thirds the authors report. Two honesty notes. The additional reports are numerically higher in the damaged-child group, 57 against 41; what the paper establishes is that the difference in the share of non-identical replies was not statistically significant on 203 mothers per group, not that the two groups were identical. And Figure 1 counts individual drug replies (420 of them) while Table 1 counts mothers (369), so the two sets of numbers are never mixed here. The reference standard for the earlier answers is the maternity welfare centre record and the mothers' own month-five interview, not an independent audit.": "すべての実数は表1に示されており、3通りの方法で辻褄が合います。前向きの行を合計すると、著者らが本文で述べている総数（疾患は34 + 43 = 77件、薬は182 + 187 = 369件）になり、追加情報にあたる2つのセルを合計すると98になって、これは図1に別途示されています。そして、前向きの記録が一切ない後ろ向きの陽性の服薬回答154件のうち98件という数字が、著者らが報告するおよそ3分の2に当たります。誠実さに関する注記が2つあります。追加の報告は死亡・奇形児群のほうが数のうえで多く、57対41です。しかし論文が確立しているのは、一致しなかった回答の割合の差が、1群あたり203人の母親では統計学的に有意ではなかったということであり、両群が同一だったということではありません。そして図1は個々の服薬回答（420件）を数えているのに対し、表1は母親（369人）を数えているため、この2種類の数字はここでは決して混同されていません。以前の回答についての基準となっているのは、母子保健センターの記録と、母親自身による妊娠5か月目の面接であり、独立した監査ではありません。",
  "A large study estimates each person's salt intake from a single question about how often they add table salt, then finds almost no link between salt and blood pressure. The authors conclude that salt does not affect blood pressure.": "ある大規模な研究が、食卓で塩をどのくらいの頻度で足すかという1つの質問から、各人の塩分摂取量を推定し、塩分と血圧のあいだにほとんど関連を見いだせませんでした。著者らは、塩分は血圧に影響しないと結論づけます。",
  "A one-question estimate gets almost everyone's real salt intake wrong, and wrong in every direction rather than by group. Blurring the heavy and light salters together makes them look alike, which pushes any true link toward zero and can bury it.": "1つの質問による推定は、ほぼ全員の実際の塩分摂取量を誤って見積もり、しかも群によってではなく、あらゆる方向に誤ります。塩分を多く摂る人と少なく摂る人を一緒くたにぼかしてしまうため、両者が似て見えるようになり、本物の関連をゼロの方向へ押しやり、埋もれさせることがあります。",
  "To study a factory solvent, researchers mark workers as exposed or not purely by job title, though people with the same title handle very different amounts. They find no excess disease in the exposed group and report the solvent as safe.": "工場の溶剤を調べるため、研究者は労働者を、もっぱら職名だけで曝露あり・なしに分けます。しかし同じ職名の人でも、扱う量は大きく異なります。曝露群に過剰な疾患は見られず、この溶剤は安全だと報告されます。",
  "Sorting by job title puts many truly exposed workers in the unexposed column and the reverse, roughly evenly. When each compared group is a mixture of the real ones, their disease rates move together, so a genuine hazard is watered down toward no difference.": "職名で仕分けると、本当は曝露していた労働者の多くが非曝露の欄に入り、その逆もほぼ同じくらい起こります。比較される群がそれぞれ本物の混ざり合ったものになると、両群の罹患率は連動して動くため、本物の危険性が薄まって差がない方向へ近づきます。",
  "A study tracks activity with a cheap clip-on counter that miscounts steps erratically for everyone, and finds no relationship between daily steps and weight change over a year. A columnist writes that step counts do not matter.": "ある研究が、誰に対しても不規則に歩数を誤カウントする安価なクリップ式の計測器で活動量を追跡し、1日の歩数と1年間の体重変化のあいだに関係を見いだせませんでした。あるコラムニストは、歩数など重要ではないと書きます。",
  "A counter unreliable for every wearer scrambles the active and the inactive together. Noise spread evenly across the whole sample drags a correlation toward zero, so the missing relationship may be the instrument rather than the activity.": "誰が着けても信頼できない計測器は、活動的な人と不活発な人を混ぜ合わせてしまいます。標本全体に均等に広がった雑音は、相関をゼロの方向へ引き寄せます。したがって関係が見えないのは、活動量そのものではなく、測定器のせいかもしれません。",
  "An asthma study assigns each child the average air pollution of their postcode, though levels vary sharply from street to street. The link with asthma comes out weak, and a summary says local air quality has little effect.": "ある喘息の研究が、各子どもに郵便番号地区の平均大気汚染度を割り当てます。しかし汚染度は通り一本ごとに大きく変わります。喘息との関連は弱く出て、要約は地域の大気の質にほとんど影響がないと述べます。",
  "A postcode average is wrong for most individual children, and wrong in both directions rather than by who is ill. Measuring exposure this bluntly blends the high and low together and flattens a real gradient toward nothing.": "郵便番号地区の平均値は、個々の子どものほとんどについて誤っており、しかも誰が病気かによってではなく、両方向に誤っています。曝露をこれほど大まかに測ると、高い値と低い値が混ざり合い、本物の勾配がほとんどゼロへと平らにされてしまいます。",
  "Two overworked assessors grade a tissue feature from slides, making frequent slips that are just as likely for patients with the disease as for those without. The feature turns out only weakly linked to the disease, and a report calls it unimportant.": "働きすぎの2人の評価者が、スライドから組織の所見を判定しますが、頻繁に見誤り、それは疾患のある患者でもない患者でも同じくらい起こります。この所見は疾患との関連が弱いという結果になり、報告書はそれを重要ではないとします。",
  "Errors falling equally on cases and controls are non-differential. They shuffle people between feature-present and feature-absent on both sides, so the two groups look more alike than they are and a real link is dragged toward the null.": "症例にも対照にも等しく降りかかる誤りは、非差異的です。両側で人を所見あり・なしのあいだで入れ替えてしまうため、2つの群は実際より似て見えるようになり、本物の関連が帰無の方向へ引き寄せられます。",
  "A health survey measures a habit with a confusingly worded question that people answer more or less at random. No link is found between the habit and an illness, and the survey concludes the habit is harmless.": "ある健康調査が、人がほぼ無作為に答えてしまうような、紛らわしい言い回しの質問である習慣を測定します。その習慣と病気のあいだに関連は見つからず、調査はその習慣を無害だと結論づけます。",
  "A question answered almost at random splits the true doers and non-doers evenly across both answers. That equal confusion mixes the groups and pulls any genuine link toward zero, so the null describes the question, not the habit.": "ほぼ無作為に答えられる質問は、本当にその習慣がある人とない人を、両方の答えに均等に振り分けてしまいます。この等しい混乱が両群を混ぜ合わせ、本物の関連をゼロの方向へ引っ張ります。ですから、この帰無の結果が語っているのは習慣ではなく、質問のほうです。",
  "A study compares two treatments using a hospital database in which the outcome is coded inconsistently, with the same sloppiness for both treatment groups. The treatments look equally effective, and the paper reports no difference.": "ある研究が、転帰の入力が一貫していない病院データベースを使って2つの治療を比較しますが、そのずさんさは両方の治療群で同程度です。2つの治療は同じくらい効果があるように見え、論文は差がないと報告します。",
  "When the outcome is recorded just as unreliably in both arms, the errors favour neither treatment. They blur any real gap between the arms, so no difference can be the coding rather than the treatments truly being alike.": "転帰が両群で同じくらい当てにならない形で記録されているとき、その誤りはどちらの治療にも肩入れしません。両群のあいだの本物の差をぼかしてしまうため、差がないという結果は、治療が本当に同等だからではなく、コーディングのせいかもしれません。",
  "A test for a blood marker misses about half of the true positives, at random and regardless of who is ill. Using it to classify people, a study finds the marker unrelated to the disease and drops it from further work.": "ある血液マーカーの検査は、無作為に、誰が病気かにかかわらず、真の陽性のおよそ半分を見逃します。これを使って人を分類したところ、ある研究はこのマーカーが疾患と無関係だと判定し、以後の検討から外します。",
  "A test that mislabels exposure the same way in the sick and the well is non-differential. Filing half of the truly positive people as negative on both sides makes the two groups resemble each other, biasing the marker's apparent effect toward none.": "病気の人にも健康な人にも同じように曝露を誤って分類する検査は、非差異的です。本当は陽性の人の半分をどちらの側でも陰性として記録すると、2つの群は互いに似てしまい、マーカーの見かけの効果は無に近づく方向へ偏ります。",
  "Researchers measure class attendance from a sign-in sheet that students fill in haphazardly, and find attendance unrelated to exam marks. The faculty concludes that turning up makes no difference.": "研究者は、学生がいい加減に記入する出席簿から授業の出席を測定し、出席は試験の点数と無関係だと分かります。教員たちは、出席しても差はないと結論づけます。",
  "A haphazard sheet mislabels regular and irregular attenders alike, in no particular direction. The noise is spread evenly across everyone, which mixes the groups and pushes any real effect of attending toward zero.": "いい加減な出席簿は、特にどちらの方向にもかたよらず、まじめに出席する人もそうでない人も同じように誤って記録します。この雑音は全員に均等に広がっており、両群を混ぜ合わせ、出席の本物の効果をゼロの方向へ押しやります。",
  "A study estimates how much people sleep from one vague question and looks for a link with next-day reaction time. Everyone's estimate is off by an hour or two either way, unrelated to how they performed. No link appears, and the write-up says sleep length does not affect alertness.": "ある研究が、1つの曖昧な質問から睡眠時間を推定し、翌日の反応時間との関連を調べます。誰の推定値も、その人の成績とは関係なく、1、2時間ほどどちらの方向にもずれています。関連は見つからず、論文は睡眠時間が覚醒度に影響しないと述べます。",
  "An estimate imprecise for everyone, and untied to performance, is non-differential error. It scrambles short and long sleepers together, and mixing them like this drags a real relationship toward nothing rather than inventing one.": "誰にとっても不正確で、しかも成績とは結びついていない推定は、非差異的な誤りです。睡眠が短い人と長い人を混ぜ合わせてしまい、このように混ぜることは、関係を作り出すのではなく、本物の関係をほとんどゼロへと引き寄せます。",
  "A study measures an exposure with a method carefully validated to be accurate for nearly everyone, finds no association with the disease, and concludes the exposure probably has little effect, noting that because the measurement was reliable the null is unlikely to be hiding a large one.": "ある研究が、ほぼ全員について正確であると入念に検証された方法で曝露を測定し、疾患との関連は見られず、その曝露にはおそらくほとんど効果がないと結論づけます。測定が信頼できたため、この帰無の結果が大きな効果を隠している可能性は低い、と付け加えます。",
  "A null is weak evidence only when the measurement is poor. Here the exposure was measured accurately, so blurring cannot explain the missing link, and reading the null as meaningful is the sound move.": "帰無の結果が弱い証拠にしかならないのは、測定が不十分なときだけです。ここでは曝露が正確に測定されていたため、ぼやけによって関連の欠如を説明することはできず、この帰無の結果を意味あるものとして受け取るのが、健全な判断です。",
  "A study measured diet with a rough questionnaire and found no link to an illness. Rather than declaring the diet safe, the authors write that their crude measurement could have hidden a real effect, and call for a study with better dietary records.": "ある研究が、大まかな質問票で食事を測定し、病気との関連は見つかりませんでした。著者らはその食事を安全だと言い切るのではなく、自分たちの粗い測定が本物の効果を隠していた可能性があると書き、より良い食事記録を用いた研究を求めます。",
  "They recognised that error spread across everyone tends to bury associations, so a null from a blunt instrument cannot prove there is nothing there. Declining to over-read it is the careful conclusion, not a trap.": "著者らは、全員に広がった誤りが関連を埋もれさせがちであることを認識しており、それゆえ粗い測定器から得られた帰無の結果は、そこに何もないことの証明にはなりません。それを過大に読み取らないのは、罠ではなく、慎重な結論です。",
  "Because a single blood-pressure reading is noisy, a study averages several readings taken on separate days for every participant before testing the link with the outcome, and reports the association from those averaged values.": "1回の血圧測定には雑音が多いため、ある研究は、転帰との関連を検定する前に、参加者ごとに別々の日に取った複数の測定値を平均し、その平均値から関連を報告します。",
  "Averaging repeated measurements cuts the random error that would otherwise blur participants together and weaken the association. Reducing non-differential error this way is exactly how to keep a real effect visible.": "繰り返し測定した値を平均することは、そうしなければ参加者どうしをぼかして関連を弱めてしまう無作為誤差を減らします。このようにして非差異的誤差を減らすことこそ、本物の効果を見える状態に保つ方法です。",
  "What they said afterwards": "後になって述べたこと",
  "Against what they said before": "以前に述べたこととの対比",
  "Measurement": "測定",

  // ---- Regression to the mean (Galton puzzle, review items, scope labels) ----
  "The tallest parents have tall children. So the tallest parents of all should have the tallest children of all, surely?": "背の高い親には背の高い子どもがいる。ならば、最も背の高い親には、最も背の高い子どもがいるはずではないか?",
  "In 1886 Francis Galton grouped 928 grown children by their parents' height. The tallest parents averaged about 72 inches, well above the roughly 68 inch average of the day; the shortest averaged about 65. Nobody did anything to the children. They grew up and were measured.": "1886年、フランシス・ゴルトンは、成人した子ども928人を親の身長でグループ分けしました。最も背の高い親たちの平均はおよそ72インチで、当時の平均であるおよそ68インチを大きく上回っていました。最も背の低い親たちの平均はおよそ65インチでした。子どもたちには何もされていません。彼らはただ育ち、身長を測られただけです。",
  "What became of the children of these extreme-height parents?": "この極端な身長の親たちの子どもには、何が起きたのでしょうか?",
  "Galton's 928 grown children, grouped by their parents' height": "ゴルトンの成人した子ども928人、親の身長によるグループ分け",
  "inches": "インチ",
  "Average height": "平均身長",
  "The parents": "親",
  "Their grown children": "成人した子どもたち",
  "The tallest parents": "最も背の高い親たち",
  "Tallest parents": "背の高い親",
  "The shortest parents": "最も背の低い親たち",
  "Shortest parents": "背の低い親",
  "Just as extreme as their parents": "親と同じくらい極端",
  "the tallest parents' children the tallest of all": "最も背の高い親の子どもが、誰よりも背が高くなる",
  "Some influence closed the gap": "何らかの影響で差が縮まった",
  "diet, mixing or the times narrowed the difference": "食生活や混血、時代の変化が差を縮めた",
  "Both landed nearer the average": "どちらも平均に近づいた",
  "less extreme than their parents, with nothing done to them": "何もしていないのに、親より極端でなくなった",
  "The tallest parents' children were shorter than them; the shortest parents' children were taller. Both landed nearer the average.": "最も背の高い親の子どもは、親より背が低くなりました。最も背の低い親の子どもは、親より背が高くなりました。どちらも平均に近づいたのです。",
  "Regression to the mean": "平均への回帰",
  "The tallest parents averaged 71.9 inches, about 3.6 above the 68.3 inch average. Their grown children averaged 70.8, only 2.5 above. The shortest parents averaged 65.1, about 3.2 below; their children 66.2, only 2.1 below. Roughly a third of each gap closed on its own, in both directions, and nobody touched the children. This is the pattern that gave regression its name.": "最も背の高い親たちの平均は71.9インチで、68.3インチという平均より約3.6インチ高い値でした。その子どもたちの平均は70.8インチで、平均を上回るのはわずか2.5インチでした。最も背の低い親たちの平均は65.1インチで、平均より約3.2インチ低い値でした。その子どもたちの平均は66.2インチで、平均を下回るのはわずか2.1インチでした。どちらの方向でも、差のおよそ3分の1が自然に縮まっており、子どもたちには誰も何もしていません。これが「回帰」という名前の由来になった現象です。",
  "An unusually tall pair of parents is unusual partly for solid, heritable reasons and partly by luck, the fortunate end of many small things. The heritable part passes on; the luck does not, because it was luck. So the children keep the real part and shed the fluke, and land closer to the middle, and the shortest parents' children rise for the mirror reason. No force reaches in to even people out. It is only that an extreme is hard to repeat.": "並外れて背の高い親のペアが並外れているのは、一部は確かな遺伝的理由によるものであり、また一部は運、つまり数多くの小さな要因が幸運にも重なった結果です。遺伝的な部分は子どもに受け継がれますが、運の部分は受け継がれません。それは運でしかなかったからです。だから子どもたちは本物の部分だけを受け継いでまぐれの部分を失い、平均に近づきます。最も背の低い親の子どもたちが背を伸ばすのも、鏡合わせの理由からです。誰かが人々をならそうと手を加えているわけではありません。ただ、極端な状態は繰り返しにくいというだけのことです。",
  "What pulls the extremes in": "極端な値を引き戻すもの",
  "Pick a group because it sits at an extreme and its next measurement will usually be less extreme, even if you do nothing. The worst cases tend to improve and the best tend to fade on their own, so a change in a hand-picked extreme group is not, by itself, evidence that anything worked.": "あるグループを、それが極端な位置にあるという理由で選ぶと、次に測定したときはたいてい、それほど極端ではなくなります。何もしなくても、です。最悪のケースは自然と改善し、最良のケースは自然と色あせていく傾向があるので、意図的に選んだ極端なグループに変化が見られても、それだけでは何かが効いた証拠にはなりません。",
  "Whenever a group was chosen for being at an extreme, the sickest patients, the worst-performing schools, the accident black spots, the record-breaking quarter, expect it to move toward the average next time by itself. To show that a treatment, a policy or a new coach did the work, you need a comparison group that was equally extreme and left alone. Without one you may be measuring the weather rather than the climate.": "あるグループが、最も重症の患者、最も成績の悪い学校、事故多発地点、記録的な四半期のように、極端であることを理由に選ばれたときはいつでも、それが次には自然と平均に近づいていくと予想しましょう。ある治療、政策、あるいは新しいコーチが本当に効果を上げたことを示すには、同じくらい極端でありながら手を加えられなかった比較グループが必要です。それがなければ、あなたが測っているのは気候ではなく、その日の天気にすぎないかもしれません。",
  "Any one measurement is part signal and part noise. Selecting the extremes selects the cases where the noise happened to pile up in the same direction as the signal. Measure again and the noise redraws itself, so the value falls back toward the average, and the noisier the measurement the further it falls. This quietly manufactures success stories wherever a decision follows a bad patch. Speed cameras go up after a cluster of crashes that was never going to repeat, so crashes fall and the camera takes the credit. A struggling team sacks its manager at its lowest point and recovers, as it would have anyway. A patient starts a remedy on their worst day and feels better by the next. Each improvement is real, and none of it shows the action caused anything, until you find the group that had the same bad patch and did nothing.": "どんな測定値も、一部はシグナルで、一部はノイズです。極端な値を選ぶということは、たまたまノイズがシグナルと同じ方向に積み重なったケースを選ぶことになります。もう一度測定すれば、ノイズはまた違う形で現れ、値は平均へと戻っていきます。測定のばらつきが大きいほど、その戻り幅も大きくなります。これは、悪い時期のあとに何らかの判断が下されるたびに、静かに成功物語を作り出します。事故が続発したあと、二度と繰り返されるはずのなかったその集中が終わるだけで速度カメラが設置され、事故は減り、カメラが手柄を得ます。不調に苦しむチームは最悪の時点で監督を解任し、いずれにせよ起こったはずの回復を遂げます。患者は症状が最も悪い日に治療を始め、翌日には良くなったと感じます。それぞれの改善は本物ですが、同じ悪い時期を経験しながら何もしなかったグループを見つけるまで、その行動が何かを引き起こしたことを示すものは何もありません。",
  "The same trap at the bedside": "病床でも同じ罠が",
  "Enrol patients because their blood pressure is high and it tends to fall by the next visit even on a dummy pill, because the reading that got them in was partly a high day. When home monitoring was repeated over a year, the group with the highest starting readings fell the most, from about 156 to 143, and the group with the lowest rose, from about 113 to 120, the movement driven by regression rather than by anything done to them. An uncontrolled before-and-after look would have credited a treatment for both.": "血圧が高いという理由で患者を登録すると、次の診察までにその値はたいてい下がります。偽薬を飲んでいてもです。登録のきっかけとなった測定値は、たまたま高かった日のものだったからです。在宅での血圧測定を1年間くり返したところ、最初の値が最も高かったグループでは平均がおよそ156から143へと最も大きく下がり、最も低かったグループでは、およそ113から120へと上がりました。この変化は、患者に何かをしたからではなく、回帰によって引き起こされたものです。対照群を置かない前後比較であれば、この両方の変化を治療の効果だと見なしてしまっていたでしょう。",
  "Regression to the mean, a reasoning trap.": "平均への回帰、推論の罠。",
  "Anything measured at its extreme, the sickest patients, the worst month, the record score, tends to look more ordinary next time, all on its own. The unusual value was partly a fluke, and flukes do not repeat. So when you act on a group precisely because it was extreme and it then improves, the improvement may be nothing more than the fluke fading. To know your action did anything, you need a group that was just as extreme and left alone.": "最も重症の患者、最悪の月、記録的なスコアなど、極端な状態で測定されたものは、次に測るときには自然と、より平凡に見えるようになる傾向があります。その並外れた値は、一部はまぐれだったからで、まぐれは繰り返しません。だから、あるグループがまさに極端だったという理由で行動を起こし、そのあとで改善が見られても、それはまぐれが薄れただけかもしれません。自分の行動が本当に何かをもたらしたと知るには、同じくらい極端でありながら手を加えなかったグループが必要です。",
  "Caught the fluke. Bet you can't.": "まぐれを見抜きました。あなたにできますか?",
  "I gave the credit to the wrong thing.": "見当違いのものに手柄をあげてしまいました。",
  "The figures are group means computed from Galton's 928 tabulated adult children, the standard digitization of his Table I (distributed as HistData::Galton), with female heights multiplied by 1.08 exactly as Galton did. The population average was about 68.3 inches. The tallest parents, those with a mid-parent height of 71 inches or more (66 children), averaged 71.9 inches and their children 70.8; the shortest, 65.5 inches or less (103 children), averaged 65.1 and their children 66.2. These are means of the tabulated data rather than verbatim printed cell values, and they are grouped because the single one-inch bins at the extremes hold only a handful of families and are noisy. Computed across all 928 pairs, the parent-to-child regression slope is about 0.65, which reproduces Galton's own finding that a child's deviation from the mean is roughly two-thirds of the mid-parent's, the result from which the word regression descends.": "これらの数値は、ゴルトンが表にまとめた928人の成人した子どものデータ(彼の表Iを標準的にデジタル化したもので、HistData::Galtonとして配布されている)から算出したグループ平均であり、ゴルトン自身が行ったとおり、女性の身長には1.08を掛けています。母集団の平均はおよそ68.3インチでした。最も背の高い親たち、つまり両親の平均身長が71インチ以上の家庭(子ども66人)は、平均71.9インチで、その子どもたちは70.8インチでした。最も背の低い親たち、65.5インチ以下の家庭(子ども103人)は、平均65.1インチで、その子どもたちは66.2インチでした。これらは表にまとめられたデータの平均値であり、印刷された表の数値をそのまま書き写したものではありません。また、両端の1インチ刻みの区分にはわずかな家庭しか含まれておらずばらつきが大きいため、グループとしてまとめています。928組すべてで計算すると、親から子への回帰の傾き(スロープ)はおよそ0.65であり、これはゴルトン自身が見出した、子どもの平均からのずれが両親の平均からのずれのおよそ3分の2になるという結果を再現しています。この結果こそが「回帰」という語の由来です。",
  "A council installs speed cameras at the twenty junctions with the most crashes last year. Over the next year crashes at those junctions fall, and the council reports the cameras as a clear success.": "ある自治体が、昨年最も事故が多かった20か所の交差点に速度取締カメラを設置しました。翌年、それらの交差点での事故は減少し、自治体はカメラの明白な成功だと報告しました。",
  "The junctions were picked for an exceptionally bad year, which is partly bad luck that does not repeat. Crashes would have fallen at the worst sites anyway, so crediting the cameras needs junctions that were equally bad and left uncovered.": "これらの交差点は、例外的に悪い1年だったという理由で選ばれており、それは繰り返さない不運の一部でもあります。最悪の地点では、いずれにせよ事故は減っていたはずなので、カメラの手柄だと言うには、同じくらい悪い状態でカメラを設置しなかった交差点が必要です。",
  "A ministry gives extra funding to the fifty lowest-scoring schools. The next year their average results rise, and the funding is declared to have worked.": "ある省庁が、成績最下位の50校に追加の予算を配分しました。翌年、これらの学校の平均成績は上がり、その予算配分は効果があったと宣言されました。",
  "Schools land at the very bottom partly through a bad year that will not recur, so the lowest scorers tend to climb on their own. Without a comparison of equally low-scoring schools that got nothing, the rise cannot be pinned on the money.": "学校が最下位に落ち込むのは、一部は繰り返さない不運な年のせいでもあるため、最下位の学校は自然と成績を上げる傾向があります。何ももらわなかった、同じくらい成績の低い学校との比較がなければ、この上昇を予算のおかげだと断定することはできません。",
  "A clinic enrols the patients with the highest cholesterol readings onto a new diet. At the recheck their readings have dropped, and the clinic recommends the diet to everyone.": "あるクリニックが、コレステロール値が最も高かった患者たちを新しい食事療法に登録しました。再検査では値が下がっており、クリニックはこの食事療法を全員に勧めました。",
  "People selected for the highest readings include many caught on an unusually high day, which the next test will not repeat. Their readings would fall without the diet, so only an equally high group left alone can show the diet did anything.": "最も高い数値で選ばれた人たちの中には、たまたま異常に高かった日に測定された人が多く含まれており、次の検査ではそれが繰り返されません。食事療法をしなくても値は下がっていたはずなので、同じくらい高い値のまま何もしなかったグループがなければ、この食事療法に効果があったとは言えません。",
  "A football club sacks its manager after the worst run of results in years. Under the caretaker the team climbs the table, and the board congratulates itself on the decision.": "あるサッカークラブが、ここ数年で最悪の連続不振のあと監督を解任しました。暫定監督のもとでチームは順位を上げ、役員会はその決断を自賛しました。",
  "Clubs sack managers at their lowest ebb, and a lowest ebb is partly a run of bad luck that tends to end. The recovery is what a bad patch usually does next, so it is no proof the sacking helped.": "クラブが監督を解任するのは最も調子が悪いときであり、その調子の悪さは、いずれ終わる不運の連続でもあります。不調のあとに回復するのはよくあることなので、この回復は解任が役に立った証拠にはなりません。",
  "People try a herbal remedy when their cold feels at its worst. Most feel much better within two days and recommend it to friends.": "人々は風邪の症状が最もひどいときにハーブの薬を試します。ほとんどの人は2日以内にかなり良くなったと感じ、友人に勧めます。",
  "A cold is usually taken on at its peak, and symptoms fade from a peak on their own. Feeling better after the worst day is what a cold does, with or without the remedy.": "風邪の薬を試すのはたいてい症状のピーク時であり、症状はピークを過ぎれば自然と和らいでいきます。最悪の日のあとに良くなるのは、薬があってもなくても風邪がたどる経過です。",
  "An athlete voted best newcomer of the season plays less brilliantly the year after. Pundits conclude the fame went to his head.": "あるシーズンの最優秀新人に選ばれた選手が、翌年は精彩を欠くプレーをしました。評論家たちは、名声が彼を天狗にさせたと結論づけました。",
  "A best-newcomer season is a peak, and peaks are partly luck that does not hold. A more ordinary second year is what regression predicts, and it needs no story about character.": "最優秀新人に選ばれるシーズンはピークであり、ピークの一部は長続きしない運によるものです。2年目がより平凡になるのは回帰が予測するとおりであり、そこに人格についての物語は必要ありません。",
  "A chain sends its consultants to the ten stores with the worst sales last quarter. Those stores do better the following quarter, and the consultancy is retained.": "あるチェーンが、前四半期の売上が最も悪かった10店舗にコンサルタントを派遣しました。これらの店舗は翌四半期に業績を上げ、コンサルティング契約は継続されました。",
  "The ten stores were chosen for an unusually bad quarter, which tends to be followed by a better one regardless. Judging the consultants fairly needs equally poor stores they never visited.": "この10店舗は、異常に悪かった四半期を理由に選ばれており、そのあとにはどのみちより良い四半期が続く傾向があります。コンサルタントを公平に評価するには、彼らが一度も訪れなかった、同じくらい業績の悪い店舗が必要です。",
  "A screening drive recalls everyone whose blood pressure read highest and gives them lifestyle advice. At the recall visit their pressure is lower, and the advice is judged effective.": "ある検診キャンペーンが、血圧の測定値が最も高かった人全員を呼び戻し、生活習慣に関する助言を行いました。再診時には血圧が下がっており、その助言は効果があったと判断されました。",
  "A single high reading is partly a bad moment, so the highest readers tend to read lower next time anyway. The fall is expected without any advice, and a comparison group is the only way to see the advice's own effect.": "一度の高い測定値は、たまたま悪いタイミングだったことも一因であり、最も高い値を出した人はどのみち次にはより低い値になる傾向があります。この低下は助言がなくても起こると予想されるものであり、助言そのものの効果を見るには比較グループが唯一の方法です。",
  "Drivers who collected the most penalty points in a year are required to attend a safety course. In the following year they collect far fewer points, and the course is expanded.": "1年間で最も多く違反点数を集めたドライバーたちは、安全講習の受講を義務づけられました。翌年、彼らの違反点数は大幅に減り、この講習は拡充されました。",
  "Drivers are picked at a peak year of offences, and a peak is partly chance that eases off. Fewer points the next year is what regression predicts, so the drop does not by itself show the course worked.": "ドライバーたちは違反が最も多かった年を理由に選ばれており、そのピークの一部は自然と収まっていく偶然によるものです。翌年に点数が減るのは回帰が予測するとおりであり、この減少だけでは講習が効果を上げた証拠にはなりません。",
  "Students who scored worst on a mock exam are enrolled in a revision workshop. On the real exam they improve markedly, and the school makes the workshop compulsory for low scorers.": "模擬試験で最も成績が悪かった生徒たちが、復習ワークショップに登録されました。本番の試験では成績が大きく向上し、学校は成績下位の生徒にこのワークショップを必修としました。",
  "The worst mock scores include students who simply had an off day, who tend to do better next time regardless. Only students who scored equally badly and skipped the workshop could show whether it added anything.": "模擬試験の最悪の成績には、単に調子の悪い日にあたっただけの生徒が含まれており、そうした生徒はどのみち次には成績が良くなる傾向があります。同じくらい悪い成績でありながらワークショップを受けなかった生徒だけが、それに効果があったかどうかを示すことができます。",
  "A charity funds the lowest-attaining schools and evaluates the programme against an equally low-attaining set of schools, chosen the same way but left unfunded. The funded schools improved more than the unfunded ones.": "ある慈善団体が、学力最下位の学校に資金を提供し、そのプログラムを、同じ方法で選ばれながら資金を提供されなかった、同じくらい学力の低い学校群と比較して評価しました。資金を受けた学校は、資金を受けなかった学校より大きく改善しました。",
  "Both sets were equally extreme, so both would drift upward by about the same amount on their own. Because the comparison schools absorb that drift, the extra improvement in the funded schools is a fair estimate of what the funding added.": "両方の学校群は同じくらい極端だったので、どちらも自然にほぼ同じだけ上向くはずでした。比較対象の学校群がその自然な上昇分を引き受けてくれるため、資金を受けた学校の上乗せ分の改善は、資金がもたらした効果の公正な見積もりになります。",
  "Patients with high blood pressure are randomly assigned to a drug or a dummy pill. Pressure falls in both groups, but it falls further on the drug, and the trial reports the difference between the two as the drug's effect.": "高血圧の患者が、無作為に薬または偽薬のいずれかに割り付けられました。血圧はどちらのグループでも下がりましたが、薬を投与されたグループのほうがより大きく下がり、この試験は両グループの差を薬の効果として報告しました。",
  "Both arms started high and both drift back toward the average, so the fall in the dummy-pill arm measures that drift. Subtracting it leaves the part that is the drug, which is exactly why the comparison arm is there.": "どちらの群も高い値から始まり、どちらも自然に平均へと戻っていくため、偽薬群での低下はその自然な変化を測っていることになります。そこから差し引けば、薬そのものによる部分だけが残ります。まさにそのために比較群が存在するのです。",
  "Where they started": "出発点",
  "Where they landed": "たどり着いた先",

  // ---- Effect modification versus confounding (Choi puzzle, review items, scope labels) ----
  "A gene variant carried by millions goes with about 2.5 times the odds of esophageal cancer, and adjusting for alcohol barely changes it. A modest risk gene, then?": "何百万人もが持つある遺伝子変異は、食道がんのオッズをおよそ2.5倍にし、飲酒で調整してもほとんど変わりません。では、ささやかなリスク遺伝子なのでしょうか。",
  "In South Korean men, researchers compared the ALDH2 gene variant between esophageal cancer patients and healthy controls. Carriers had roughly 2.5 times the odds of cancer, and adjusting for whether the men drank alcohol left that almost unchanged, which usually means a factor is standing on its own.": "韓国人男性を対象に、研究者たちは食道がん患者と健常対照者のあいだでALDH2遺伝子変異を比較しました。保有者はおよそ2.5倍のがんのオッズを示し、飲酒の有無で調整してもほとんど変わりませんでした。これは通常、その因子が単独で働いていることを意味します。",
  "What is the gene really doing?": "この遺伝子は実際には何をしているのでしょうか。",
  "The ALDH2 variant and esophageal cancer in Korean men": "韓国人男性におけるALDH2変異と食道がん",
  "Odds of esophageal cancer with the variant": "変異保有者における食道がんのオッズ",
  "alcohol drinking": "飲酒",
  "Ignoring drinking": "飲酒を無視した場合",
  "Adjusted for drinking": "飲酒で調整した場合",
  "no effect": "効果なし",
  "Current drinkers": "現在の飲酒者",
  "Drinkers": "飲酒者",
  "Non-drinkers": "非飲酒者",
  "A modest risk factor in its own right": "それ自体でささやかなリスク因子",
  "about 2.5 times the odds, with or without drinking": "飲酒があってもなくても、オッズはおよそ2.5倍",
  "An illusion, drinking is the real cause": "見せかけであり、本当の原因は飲酒",
  "adjust it away and nothing is left": "調整すれば消え去り、何も残らない",
  "It only matters in people who drink": "飲酒する人にしか関係しない",
  "the effect depends on the drinking": "効果は飲酒しだいで変わる",
  "In men who do not drink the variant does almost nothing (1.25). In men who drink it quadruples the odds (4.39). The 2.5 was the average of two different worlds.": "飲酒しない男性では、この変異はほとんど何もしません(1.25)。飲酒する男性では、オッズを4倍にします(4.39)。2.5という数字は、まったく異なる2つの世界を平均したものでした。",
  "Effect modification": "効果修飾",
  "Split by drinking, the odds ratio is 1.25 in non-drinkers, its confidence interval crossing 1, and 4.39 in drinkers. The crude 2.6, and the drinking-adjusted 2.4, sit between the two and describe neither group. The variant slows the clearance of acetaldehyde, a carcinogen the body makes from alcohol, so it can only do harm when there is alcohol to process. Adjusting for drinking treats it as a nuisance to subtract, but here drinking is the very thing that switches the gene's danger on.": "飲酒で分けると、オッズ比は非飲酒者で1.25(信頼区間は1をまたぐ)、飲酒者で4.39です。粗の2.6と、飲酒で調整した2.4は、この2つのあいだに位置し、どちらの群も言い表していません。この変異は、体がアルコールから作る発がん物質であるアセトアルデヒドの分解を遅らせるため、処理すべきアルコールがあるときにしか害を及ぼせません。飲酒で調整するのは、それを差し引くべき厄介者として扱うことですが、ここでは飲酒こそが、この遺伝子の危険性のスイッチを入れているものなのです。",
  "This is the line between a confounder and an effect modifier. A confounder is a rival explanation you remove by adjustment, and once it is removed the single adjusted number is your answer. An effect modifier is not a nuisance, it is the finding, and the right move is not to average the strata but to report them apart. \"The variant quadruples the odds in drinkers and does nothing otherwise\" is true and useful. \"The variant raises the odds about 2.5-fold\" is true of no one.": "これが交絡因子と効果修飾因子の境界線です。交絡因子とは、調整によって取り除くべき対抗する説明であり、いったん取り除けば、その1つの調整済みの数字が答えになります。効果修飾因子は厄介者ではなく、それ自体が知見であり、正しいやり方は層を平均することではなく、別々に報告することです。「この変異は飲酒者でオッズを4倍にし、それ以外では何もしない」は真実であり、有用です。「この変異はオッズをおよそ2.5倍に上げる」は、誰にも当てはまりません。",
  "Confounder, or modifier?": "交絡因子か、修飾因子か。",
  "Effect modification versus confounding": "効果修飾対交絡",
  "When a factor's effect differs sharply between subgroups, do not adjust it into a single number. Adjustment answers the confounding question, what is the effect once we account for the other variable. It cannot answer the modification question, does the effect depend on that variable. An average can be true of the whole and describe no one in it.": "ある因子の効果がサブグループ間で大きく異なるときは、それを1つの数字に調整してはいけません。調整が答えるのは交絡についての問い、すなわちもう1つの変数を考慮に入れると効果はどうなるか、です。それでは修飾についての問い、すなわち効果はその変数しだいで変わるか、には答えられません。平均は全体については真実でも、そのなかの誰についても言い表していないことがあります。",
  "Faced with a third variable, two different moves are possible. If it distorts the comparison but the effect is really the same in everyone, it is a confounder: adjust for it and report one number. If the effect genuinely differs across its levels, it is an effect modifier: report each level on its own. The tell is in the stratified table. If the stratum-specific effects are close to each other but differ from the crude, you had confounding. If they differ from each other, you have modification, and the crude or adjusted figure is an average that can mislead about everybody.": "第三の変数に直面したとき、取り得る対応は2通りあります。それが比較をゆがめているだけで、効果自体は実際には誰にとっても同じであれば、それは交絡因子です。調整して、1つの数字を報告してください。効果がその水準ごとに本当に異なっているなら、それは効果修飾因子です。それぞれの水準を別々に報告してください。見分ける手がかりは層別の表にあります。層ごとの効果が互いに近く、粗の値とだけ異なっているなら、交絡があったことになります。層どうしが互いに異なっているなら、修飾があったことになり、粗の値や調整済みの値は、誰についても誤解を招きかねない平均になります。",
  "Adjustment and stratification begin the same way, by splitting the data on the third variable, and then they part. Adjustment recombines the strata into one weighted number, which is exactly right when they agree and exactly wrong when they do not, because it buries the disagreement inside an average. So look at the strata before you pool them. When they tell the same story, one number is a fair summary. When they tell different stories, that number is a fiction of the middle, and the honest report is the split. Effect modification is not a bias to scrub out, it is often the most useful thing a study finds, the map of who is affected and who is not. It is also why a treatment can be worthless on average and life-saving in a subgroup, and why \"no overall effect\" and \"no effect\" are not the same sentence.": "調整と層別化は、データを第三の変数で分けるところまでは同じやり方で始まり、そこから枝分かれします。調整は各層を1つの加重した数字に組み直します。これは各層が一致しているときにはまったく正しく、一致していないときにはまったく誤りです。不一致を平均のなかに埋めてしまうからです。だからプールする前に、まず層を見てください。同じ物語を語っているなら、1つの数字は公正な要約です。違う物語を語っているなら、その数字は中間に作られた架空の値であり、正直な報告は分割することです。効果修飾は取り除くべきバイアスではなく、しばしば研究が見いだす最も有用なもの、すなわち誰が影響を受け、誰が受けないかの見取り図です。だからこそ、ある治療は平均では無価値でありながら、あるサブグループでは命を救うことがあり得ますし、「全体としての効果なし」と「効果なし」は同じ文ではないのです。",
  "A drug that works only for some tumours": "一部の腫瘍にしか効かない薬",
  "Trastuzumab, added to chemotherapy, improved survival in metastatic breast cancer that overexpresses the HER2 protein. It is given only to patients whose tumour is HER2-positive, because that marker is what its benefit depends on. Averaging its effect across all breast cancers would understate it for the women it helps and invent a benefit for those it does not. So the tumour marker is tested for before the drug is prescribed, which is effect modification turned into routine practice rather than adjusted away.": "化学療法に加えたトラスツズマブは、HER2タンパク質を過剰発現する転移性乳がんで生存を改善しました。この薬が投与されるのは腫瘍がHER2陽性の患者だけです。その恩恵がこのマーカーしだいだからです。すべての乳がんにわたって効果を平均すれば、恩恵を受ける女性についてはそれを過小に見せ、恩恵を受けない女性については存在しない恩恵を作り出してしまいます。そのため、薬が処方される前に腫瘍マーカーの検査が行われます。これは効果修飾を、調整して消し去るのではなく、日常診療に組み込んだものです。",
  "Effect modification versus confounding, a reasoning trap.": "効果修飾対交絡、推論の罠。",
  "A single adjusted number assumes a factor works the same for everyone. Often it does not. A gene, a drug or a policy can do a great deal in one group and nothing in another, and averaging the two gives a figure that is true of no one. When the effect differs across groups, the groups are the answer, not a nuisance to average away.": "1つの調整済みの数字は、ある因子が誰にとっても同じように働くと仮定しています。しかし、しばしばそうではありません。遺伝子、薬、政策は、あるグループでは大きな働きをし、別のグループでは何もしないことがあり、その2つを平均すれば、誰にも当てはまらない数字ができあがります。効果がグループによって異なるときは、そのグループこそが答えであり、平均して消し去るべき厄介者ではありません。",
  "Caught the average that fooled everyone.": "誰もをだました平均を見抜きました。",
  "I adjusted away the whole point.": "肝心な点を調整して消してしまいました。",
  "The four cells of each stratum are read from Table 3, men's panel. Among current drinkers, 219 of 640 variant carriers were cancer patients against 211 of 1,993 non-carriers; among non-drinkers, 198 of 916 carriers against 123 of 679 non-carriers. The stratum odds ratios reproduce the paper's printed 4.39 and 1.25 exactly, the pooled cells give a crude 2.56, and the Mantel-Haenszel adjustment gives 2.44, consistent with the paper's finding that the association differs by drinking (interaction P < 0.001). Two honesty notes. The men's panel is used because the women's odds ratios in the same table are age-adjusted and do not reconcile from the raw cells. And the exposure is framed as the paper frames it, the genotype, with drinking as the modifier; framing alcohol as the exposure on these same cells would give a misleading apparently protective odds ratio, an artefact of non-drinkers who abstain because of ill health and of not adjusting for tobacco.": "各層の4つのセルは、表3の男性のパネルから読み取っています。現在飲酒している人のうち、変異保有者640人中219人ががん患者だったのに対し、非保有者は1,993人中211人でした。非飲酒者のうち、保有者916人中198人に対し、非保有者は679人中123人でした。層ごとのオッズ比は、論文に印刷された4.39と1.25を正確に再現しており、プールしたセルからは粗の2.56が、Mantel-Haenszel(マンテル・ヘンツェル)調整からは2.44が得られます。これは、この関連が飲酒によって異なるという論文の知見(交互作用のP値は0.001未満)と整合しています。正直に述べておくべき点が2つあります。第一に、男性のパネルを用いたのは、同じ表にある女性のオッズ比が年齢調整済みであり、生の数値からは再現できないためです。第二に、曝露は論文がそう組み立てているとおりに、遺伝子型を曝露、飲酒を修飾因子として扱っています。これと同じセルでアルコールを曝露として組み立て直すと、見かけ上保護的に見える、誤解を招くオッズ比になります。これは、体調不良のために飲酒をやめた非飲酒者がいることと、喫煙で調整していないことによる、人為的な結果です。",
  "A study reports that regular sunscreen use cuts skin cancer risk by about a fifth on average, adjusting for skin type. The benefit is large in fair-skinned people and negligible in the darkest-skinned. The health message quotes only the one-fifth figure.": "ある研究は、日焼け止めを定期的に使うと、肌のタイプで調整したうえで平均して皮膚がんのリスクがおよそ5分の1減ると報告しています。恩恵は色白の人では大きく、最も色黒の人ではごくわずかです。健康メッセージは、この5分の1という数字だけを引用しています。",
  "The effect genuinely differs by skin type, so a single averaged number describes neither group. Skin type here is not a nuisance to adjust away but the thing that decides how much sunscreen helps, and it should be reported separately.": "効果は肌のタイプによって本当に異なっているため、1つの平均値ではどちらの群も言い表せません。ここでの肌のタイプは、調整して消し去るべき厄介者ではなく、日焼け止めがどれだけ役立つかを決めているものであり、別々に報告するべきです。",
  "A blood pressure drug is licensed with the claim that it lowers pressure by 8 mmHg. Split by age, it barely moves pressure under 50 and lowers it markedly over 70. Only the single average appears on the label.": "ある降圧薬は、血圧を8mmHg下げるという主張で承認されています。年齢で分けると、50歳未満ではほとんど血圧を動かさず、70歳を超えると大きく下げます。ラベルにはその1つの平均値しか記載されていません。",
  "Age changes the size of the effect, so the 8 mmHg is an average that fits no age group well. When an effect differs across subgroups it should be reported by subgroup, not collapsed into one figure.": "年齢が効果の大きさを変えているため、8mmHgという数字は、どの年齢層にもうまく当てはまらない平均です。効果がサブグループ間で異なるときは、1つの数字にまとめるのではなく、サブグループ別に報告するべきです。",
  "A painkiller relieves pain strongly in people with one liver-enzyme genotype and hardly at all in those with another. A review pools every patient and reports a modest average benefit.": "ある鎮痛薬は、ある肝酵素の遺伝子型を持つ人では痛みを強く和らげ、別の遺伝子型を持つ人ではほとんど和らげません。あるレビューは全患者をプールし、ささやかな平均的な恩恵を報告しています。",
  "The genotype decides whether the drug works, so pooling produces a number that overstates it for one group and invents it for the other. The genotype is the finding, not a variable to average over.": "この遺伝子型が、薬が効くかどうかを決めているため、プールすると、一方の群については過大に、もう一方については存在しない効果を作り出す数字になります。遺伝子型こそが知見であり、平均してならすべき変数ではありません。",
  "Researchers find a treatment helps men and harms women by about the same amount. To account for sex, they adjust for it and report a single near-zero effect, concluding the treatment does nothing.": "研究者たちは、ある治療が男性には効き、女性にはほぼ同じ程度の害を及ぼすことを見いだします。性別を考慮するために調整を行い、ほぼゼロの単一の効果を報告して、この治療は何もしないと結論づけます。",
  "Adjusting for sex has buried two real and opposite effects under an average of nearly zero. Sex is modifying the effect, not confounding it, so the honest report is the two subgroups apart, not one number that hides both.": "性別で調整したことで、本物で正反対の2つの効果が、ほぼゼロの平均のなかに埋もれてしまいました。性別はこの効果を交絡させているのではなく修飾しているため、正直な報告は2つのサブグループを別々に示すことであり、両方を隠す1つの数字ではありません。",
  "A fertiliser trial across many fields finds it raises yield on sandy soil and does nothing on clay. The report gives the average increase and recommends the fertiliser for all fields.": "多くの畑で行われた肥料の試験は、砂質の土壌では収量を上げ、粘土質の土壌では何もしないことを見いだします。報告書は平均の増加量を示し、すべての畑にこの肥料を勧めています。",
  "Soil type changes whether the fertiliser works at all, so an average across soils recommends it where it is useless. The effect should be reported by soil, which is the practical answer a farmer needs.": "土壌のタイプが、この肥料がそもそも効くかどうかを決めているため、土壌をまたいだ平均は、役に立たない場所にまでこの肥料を勧めてしまいます。効果は土壌別に報告するべきであり、それこそ農家が必要とする実践的な答えです。",
  "A vaccine is highly protective in younger adults and only weakly protective in the elderly. A briefing note gives a single overall efficacy figure for the whole population.": "あるワクチンは若い成人には高い予防効果を示し、高齢者には弱い予防効果しか示しません。ある概況報告は、全人口についての単一の全体有効率を示しています。",
  "Age modifies how well the vaccine works, so one figure overstates the protection the elderly can expect. A modifier like this belongs in the results split out, because the subgroups need different advice.": "年齢がこのワクチンの効き方を修飾しているため、1つの数字は高齢者が期待できる予防効果を過大に見せます。このような修飾因子は、結果を分けて示すべき対象です。サブグループごとに異なる助言が必要だからです。",
  "A tutoring programme raises test scores sharply for pupils who started behind and not at all for those already ahead. The evaluation reports one average gain and rolls the programme out to everyone.": "ある個別指導プログラムは、遅れていた生徒の試験の点数を大きく上げ、すでに進んでいた生徒にはまったく効果がありません。評価は1つの平均的な伸びを報告し、このプログラムを全員に展開します。",
  "Starting level decides who benefits, so an average gain misdescribes both the pupils it helps and those it does not. This is an effect that differs by subgroup, to be reported by subgroup rather than averaged.": "出発点の水準が、誰が恩恵を受けるかを決めているため、平均の伸びは、恩恵を受ける生徒についても受けない生徒についても正しく言い表していません。これはサブグループによって異なる効果であり、平均するのではなくサブグループ別に報告するべきものです。",
  "An occupational study finds a workplace solvent raises lung cancer risk steeply in smokers and not detectably in non-smokers. The authors adjust for smoking and present a single modest risk for the solvent.": "ある職業研究は、職場の溶剤が喫煙者では肺がんリスクを大きく上げ、非喫煙者では検出できるほどには上げないことを見いだします。著者らは喫煙で調整し、この溶剤について1つのささやかなリスクを示します。",
  "Smoking is not just a confounder here, it decides whether the solvent does harm, so adjusting it into one number hides that the danger is concentrated in smokers. The two groups should be reported separately.": "ここでの喫煙は単なる交絡因子ではなく、この溶剤が害を及ぼすかどうかを決めているものです。それを1つの数字に調整することは、危険が喫煙者に集中しているという事実を隠してしまいます。2つの群は別々に報告するべきです。",
  "A dietary change lowers heart attacks in people with diabetes and has no effect in people without it. A meta-analysis pools all participants and concludes the diet has a small, marginal benefit.": "ある食事の変更は、糖尿病を持つ人では心臓発作を減らし、持たない人には効果がありません。あるメタ分析は全参加者をプールし、この食事にはささやかで限定的な恩恵しかないと結論づけます。",
  "The diet's effect depends on diabetes status, so pooling dilutes a real benefit for one group into a marginal-looking average for everyone. Diabetes is the modifier, and the strata carry the real message.": "この食事の効果は糖尿病の有無しだいであるため、プールすると、一方の群にとっての本物の恩恵が、全員についての限定的に見える平均へと薄まってしまいます。糖尿病が修飾因子であり、本当のメッセージは層のなかにあります。",
  "A feature raises spending a lot among brand-new users and not at all among long-standing ones. The product team reports the average uplift across all users and ships the feature to everybody.": "ある機能は、新規のユーザーのあいだでは支出を大きく増やし、長年のユーザーのあいだではまったく増やしません。製品チームは全ユーザーにわたる平均の増加分を報告し、この機能を全員に展開します。",
  "How long someone has used the product decides whether the feature does anything, so the average uplift misleads about both groups. When an effect differs by subgroup, the subgroups are the result, not a detail to average over.": "その人が製品をどれくらい長く使っているかが、この機能が何かをするかどうかを決めているため、平均の増加分はどちらの群についても誤った印象を与えます。効果がサブグループによって異なるときは、サブグループこそが結果であり、平均してならすべき細部ではありません。",
  "Coffee drinkers have more heart disease, but they also smoke more. After adjusting for smoking the association disappears, and the same near-zero link holds within smokers and within non-smokers alike. The authors report that coffee is not associated once smoking is accounted for.": "コーヒーを飲む人は心臓病が多いのですが、喫煙も多くしています。喫煙で調整すると、この関連は消え去り、喫煙者のなかでも非喫煙者のなかでも、同じようにほぼゼロの関連が保たれます。著者らは、喫煙を考慮に入れると、コーヒーには関連がないと報告しています。",
  "Because the link is the same small thing in both smoking groups, smoking was a genuine confounder and adjusting for it is the right move. A single adjusted number is a fair summary precisely because the strata agree.": "この関連が、喫煙の両方の群で同じくらい小さいため、喫煙は本物の交絡因子であり、それで調整するのは正しいやり方です。1つの調整済みの数字が公正な要約であるのは、まさに層どうしが一致しているからです。",
  "A trial finds a drug clearly helps patients with a particular marker and does nothing for those without it. Rather than quoting one overall effect, the report gives the two groups separately and recommends the drug only for the marker-positive patients.": "ある試験は、特定のマーカーを持つ患者にはある薬が明らかに効き、持たない患者にはまったく効かないことを見いだします。報告は1つの全体効果を引用するのではなく、2つの群を別々に示し、マーカー陽性の患者にのみこの薬を勧めています。",
  "When an effect differs by subgroup, reporting the subgroups apart is exactly right, and pooling them into one average would have been the error. Prespecifying the marker and acting on it is careful practice, not a trap.": "効果がサブグループによって異なるときは、サブグループを別々に報告することこそが正しく、それらを1つの平均にプールすることのほうが誤りだったでしょう。マーカーをあらかじめ指定し、それにもとづいて行動することは、慎重な実践であり、罠ではありません。",
  "As one number": "1つの数字として",
  "Split by the third factor": "第三の因子で分割",

  // ---- Detection (observer) bias puzzle + review items ----
  "Give surgical patients far less IV fluid and complications seem to plummet. A clear win for less fluid?": "手術を受ける患者への静脈輸液量を大幅に減らすと、合併症が急減するように見えます。輸液を減らせば明らかに勝ちなのでしょうか。",
  "In a trial, an assessor recorded which patients had a postoperative complication. In the restrictive-fluid group 31 percent did, against 55 percent on the standard regimen, and the difference was highly significant (P = 0.002).": "ある試験では、評価者がどの患者に術後合併症が生じたかを記録しました。制限輸液群では31%に生じたのに対し、標準輸液群では55%で、その差は高度に有意でした（P = 0.002）。",
  "How much should you trust the size of that benefit?": "その効果の大きさを、どれくらい信じてよいのでしょうか。",
  "Had a postoperative complication": "術後合併症が生じた",
  "Restrictive fluid": "制限輸液",
  "Restrictive": "制限",
  "Standard fluid": "標準輸液",
  "Standard": "標準",
  "Graded by an assessor who knew the regimen": "投与法を知っている評価者による判定",
  "Graded by an assessor kept unaware": "投与法を知らされていない評価者による判定",
  "As the unblinded assessor graded them": "非盲検の評価者が判定した通り",
  "A big, solid benefit": "大きく確かな効果",
  "complications nearly halved": "合併症はほぼ半減",
  "The groups must have differed to begin with": "そもそも群が異なっていたに違いない",
  "something other than the fluid": "輸液以外の何か",
  "The grader knew the assignment": "判定者は割り付けを知っていた",
  "grade it blind and it shrinks": "盲検で判定すると縮小する",
  "Grade the same patients blind, and the gap narrows.": "同じ患者を盲検で判定し直すと、差は縮まります。",
  "What the grader knew": "判定者が知っていたこと",
  "The same 172 patients, judged again by an assessor kept unaware of who got which regimen: 28 of 86 with a complication on restrictive fluid (33 percent) against 44 of 86 on standard (51 percent). Restrictive fluid still helped, but the gap is 18 points rather than the 24 the unblinded grader recorded, and the p-value slips from 0.002 to 0.013.": "同じ172人の患者を、どちらの投与法かを知らされていない評価者が改めて判定しました。制限輸液群では86人中28人（33%）に合併症が生じ、標準輸液群では86人中44人（51%）でした。制限輸液は依然として有効でしたが、その差は非盲検の判定者が記録した24ポイントではなく18ポイントで、P値も0.002から0.013へと後退します。",
  "Unblinded, then blinded": "非盲検、そして盲検",
  "The randomisation was fine and the groups were comparable. What changed is who held the pen. When the person deciding whether an ambiguous case counts as a complication knows which arm the patient was in, the borderline calls drift toward the expected answer. That drift did not invent the benefit, restrictive fluid genuinely did better, but it stretched it and made it look more certain than the blinded record supports.": "無作為化には問題がなく、両群は比較可能でした。変わったのは、誰がペンを握っていたかです。ある症例が合併症に当たるかどうかを判断する人が、患者がどちらの群かを知っていると、境界線上の判定は期待される答えのほうへ寄っていきます。この偏りが効果を生み出したわけではなく、制限輸液は本当に良い結果を出しました。しかしその偏りは効果を誇張し、盲検の記録が裏付ける以上に確実であるかのように見せてしまいました。",
  "Blinded against not": "盲検か非盲検か",
  "Detection bias": "検出バイアス",
  "When whoever judges the outcome knows who got the treatment, their judgement drifts toward the expected result. It rarely conjures an effect from nothing; it exaggerates a real one and lends it false certainty. The defence is to blind the assessor, which is separate from blinding patients and clinicians.": "結果を判定する人が、誰がどの治療を受けたかを知っていると、その判断は期待される結果のほうへ寄っていきます。何もないところから効果を作り出すことはめったになく、実在する効果を誇張し、実際以上の確かさを与えてしまいます。これを防ぐには評価者を盲検化することが必要で、これは患者や臨床医を盲検化することとは別の話です。",
  "Detection bias bites hardest on outcomes that take judgement: a wound called infected or not, a scan read as progression or not, a symptom scored on a scale. It barely touches a hard endpoint like death, taken from a registry. So the question to ask of an impressive result is not only whether the patients were blinded, but whether the person recording the outcome was.": "検出バイアスは、判断を要する結果指標にもっとも強く現れます。創が感染しているかどうか、画像を増悪と読むかどうか、症状を尺度でどう採点するか、といったものです。登録から得られる死亡のような硬いエンドポイントには、ほとんど影響しません。ですから、印象的な結果を見たときに問うべきは、患者が盲検化されていたかどうかだけでなく、結果を記録した人が盲検化されていたかどうかです。",
  "Blinding is not one thing. Patients can be blinded so their own reports are not swayed by knowing they got the real treatment; clinicians can be blinded so the care they give does not differ; and the outcome assessor can be blinded so their reading of who improved is not coloured by which arm they are grading. A trial can manage the first two and still leak bias through the third, because most outcomes worth measuring need a human to interpret them. That is why assessor-blinding is its own line in a methods section, and why an open-label trial with a subjective endpoint should have the size of its effect discounted, not just its direction doubted.": "盲検化は一様なものではありません。患者を盲検化すれば、実薬を受けたと知ることで自己申告が歪むのを防げます。臨床医を盲検化すれば、提供するケアに差が出るのを防げます。そして結果評価者を盲検化すれば、どちらの群を判定しているかによって、誰が改善したかの読み取りが色付けられるのを防げます。試験が最初の2つはうまく管理できていても、3つ目からバイアスが漏れ出ることがあります。測定する価値のある結果指標の多くは、人による解釈を必要とするからです。だからこそ評価者の盲検化は方法論の項目の中で独立した1行を占めるべきであり、主観的なエンドポイントを用いたオープンラベル試験では、単にその方向性を疑うだけでなく、効果の大きさそのものを割り引いて考えるべきなのです。",
  "Not one unlucky trial": "運の悪い試験が1つだけではない",
  "A review paired blinded and non-blinded judgements of the same yes-or-no outcome across 21 trials and 4,391 patients. On average the non-blinded assessors exaggerated the odds ratio by 36 percent (ratio of odds ratios 0.64, 95 percent confidence interval 0.43 to 0.96). The fluid trial here was one of the 21.": "あるレビューは、21件の試験、4,391人の患者にわたって、同じ有無二値の結果に対する盲検の判定と非盲検の判定を対にして比較しました。平均すると、非盲検の評価者はオッズ比を36%誇張していました（オッズ比の比は0.64、95%信頼区間0.43から0.96）。ここで取り上げた輸液の試験も、その21件のうちの1つです。",
  "Detection bias, a reasoning trap.": "検出バイアス、推論の罠。",
  "When the person scoring the result knows who got the treatment, the borderline calls slide toward the hoped-for answer. Grade the same patients blind and the effect shrinks and loses certainty. It rarely conjures a result from nothing, but it inflates one. Before believing the size of a benefit, ask who measured the outcome, and whether they knew which group they were looking at.": "結果を採点する人が、誰がどの治療を受けたかを知っていると、境界線上の判定は望ましい答えのほうへ滑っていきます。同じ患者を盲検で判定し直すと、効果は縮小し、確かさも失われます。何もないところから結果を作り出すことはめったになく、既にある結果を膨らませるのです。効果の大きさを信じる前に、誰が結果を測定したのか、そしてその人がどちらの群を見ているかを知っていたかどうかを問いましょう。",
  "Everyone trusts the number. Fewer ask who measured it.": "誰もがその数字を信じます。それを測定したのが誰かを問う人は、もっと少ないのです。",
  "I trusted the number. Nobody had blinded the grader.": "私はその数字を信じました。判定者は誰も盲検化されていませんでした。",
  "In an open trial of a new dressing, the surgeon who chose which patients got it also reviewed their wound photos and decided which counted as infected. The new dressing came out with far fewer infections.": "新しい創傷被覆材のオープン試験では、どの患者にそれを使うかを選んだ外科医が、創部の写真も確認し、どれを感染とみなすかを決めていました。新しい被覆材は、感染がはるかに少ないという結果になりました。",
  "Whether a borderline wound is called infected is a judgement, and the person making it knew which dressing each patient had. Have someone blinded to the dressing grade the same photos before believing the size of the gap.": "境界線上の創を感染と呼ぶかどうかは判断であり、それを下した人は各患者がどちらの被覆材を使っていたかを知っていました。差の大きさを信じる前に、被覆材を知らされていない人に同じ写真を判定してもらう必要があります。",
  "A physiotherapist testing her own new programme also scored each patient's mobility at the end. Her scores showed the new programme clearly beating usual care.": "自らが考案した新しいプログラムを検証していた理学療法士は、最後に各患者の可動性も自分で採点しました。彼女の採点では、新しいプログラムが通常のケアを明らかに上回っていました。",
  "The person hoping the programme works is the one rating the outcome, so ambiguous movements get scored generously for her group. A blinded assessor rating the same patients is what would settle it.": "プログラムがうまくいってほしいと願う本人が結果を採点しているため、あいまいな動きは自分の群に有利に甘く採点されがちです。同じ患者を盲検の評価者が採点することが、決着をつける方法です。",
  "A radiologist was told which patients were on the new cancer drug before reading their follow-up scans. He marked the drug group as 'stable or improved' far more often than the comparison group.": "ある放射線科医は、経過観察の画像を読む前に、どの患者が新しいがん治療薬を使っているかを知らされていました。彼は「安定または改善」という判定を、対照群よりも治療薬群でずっと多くつけました。",
  "Reading a scan as progression or not takes interpretation, and knowing the arm tilts the close calls. Scans read blind, in a random order, are the only version worth trusting.": "画像を増悪と読むかどうかには解釈が伴い、群を知っていると際どい判定が偏ります。信頼できるのは、群を知らされずランダムな順序で読影された画像だけです。",
  "A teacher graded her pupils' essays knowing which of them had used a new writing app she had championed. The app users scored noticeably higher, and she reported the app as a success.": "ある教師は、自分が推していた新しい作文アプリをどの生徒が使ったかを知った上で、生徒たちの作文を採点しました。アプリを使った生徒は明らかに高い得点となり、彼女はそのアプリを成功例として報告しました。",
  "Essay marks are a judgement, and the grader both knew the groups and wanted the app to work. Marking the essays blind, with names and app-use hidden, is what would show whether the gap is real.": "作文の点数は判断であり、採点者は群を知っていた上に、アプリがうまくいってほしいと願ってもいました。名前とアプリ使用の有無を伏せて盲検で採点することが、その差が本物かどうかを示す方法です。",
  "At a gymnastics meet the judges could see which athletes came from a famous academy. Those athletes received higher marks for routines that, on video review by judges who could not tell where they trained, scored about the same as everyone else's.": "ある体操の大会で、審判たちはどの選手が有名な強豪クラブの出身かを見て分かる状態でした。その選手たちの演技は高い得点を得ましたが、どこで練習してきたか分からない審判による映像審査では、他の選手とほぼ同じ得点でした。",
  "Scoring a routine is a judgement call, and knowing the prestigious academy nudged it upward. The blinded video review of the same routines is the unbiased measurement.": "演技の採点は判断であり、名門クラブの出身だと知っていることが得点を押し上げました。同じ演技を対象にした盲検の映像審査こそが、偏りのない測定です。",
  "A vet assessing whether horses were still lame knew which ones had been given a new joint supplement. She rated the supplement group as sounder, and the makers advertised the result.": "馬がまだ跛行しているかどうかを評価する獣医師は、どの馬に新しい関節サプリメントが与えられたかを知っていました。彼女はサプリメント群をより健全だと採点し、メーカーはその結果を宣伝に使いました。",
  "Grading lameness is a judgement, and the assessor knew which horses were supposed to improve. A vet blinded to which horses got the supplement, watching the same gaits, is what the claim needs.": "跛行の判定は判断であり、評価者はどの馬が改善するはずかを知っていました。この主張に必要なのは、どの馬がサプリメントを与えられたかを知らされていない獣医師が、同じ歩様を観察することです。",
  "A researcher read patients' free-text symptom diaries and coded each week as better or worse, with the treatment arm visible at the top of every page. Ambiguous weeks were coded 'better' more often for the treated patients.": "ある研究者は患者の自由記述式の症状日誌を読み、各週を「良い」か「悪い」かに分類しましたが、どのページの上部にも治療群がはっきりと書かれていました。あいまいな週は、治療を受けた患者のほうがより多く「良い」と分類されました。",
  "Turning a vague diary entry into better-or-worse is interpretation, and the arm label steered the doubtful ones. Coding the diaries with the arm hidden removes the tilt.": "あいまいな日誌の記述を「良い」か「悪い」かに変換するのは解釈であり、群のラベルが疑わしい記述の判定を左右しました。群を伏せて日誌を分類すれば、その偏りは取り除かれます。",
  "Observers scored children's classroom behaviour for a study of a new diet. They were told which children were on the diet, and recorded fewer disruptive episodes for that group.": "新しい食事療法の研究のために、観察者が子どもたちの教室での行動を採点しました。観察者はどの子どもがその食事療法を受けているかを知らされており、その群では問題行動のエピソードを少なめに記録しました。",
  "Whether a fidget counts as a disruptive episode is a judgement, and knowing who was on the diet shaded it. Observers blinded to the diet, scoring the same footage, are what a real test requires.": "そわそわした動きを問題行動と数えるかどうかは判断であり、誰が食事療法を受けているかを知っていることがそれに影を落としました。本当の検証に必要なのは、食事療法を知らされていない観察者が、同じ映像を採点することです。",
  "An endoscopist assessing whether ulcers had healed could see, on each patient's chart, which drug they had received. He judged more ulcers 'healed' in the new-drug group.": "潰瘍が治癒したかどうかを評価する内視鏡医は、各患者のカルテでどの薬を投与されたかを見ることができました。彼は新薬群のほうで、より多くの潰瘍を「治癒」と判定しました。",
  "Calling an ulcer healed or not is an interpretation, and the visible drug name nudged the borderline ones. The images should be read by someone who cannot tell which drug the patient took.": "潰瘍が治癒したかどうかを言い切るのは解釈であり、目に見える薬剤名が境界線上の判定を後押ししました。画像は、患者がどの薬を服用したか分からない人が読むべきです。",
  "A dermatologist rated the severity of patients' rashes on a ten-point scale, aware of which cream each had been given. The trial cream's patients were scored two points milder on average.": "ある皮膚科医は、どの患者がどのクリームを使ったかを知った上で、患者の発疹の重症度を10点満点で採点しました。試験用クリームを使った患者は、平均して2点軽く採点されました。",
  "A severity score is a judgement, and knowing the cream drew the ratings toward the hoped-for answer. A rater blinded to the cream, scoring the same rashes, is what would show the true difference.": "重症度スコアは判断であり、どのクリームかを知っていることが評価を望ましい答えのほうへ引き寄せました。クリームを知らされていない評価者が同じ発疹を採点することが、真の差を示す方法です。",
  "In a heart-drug trial, every suspected heart attack was judged by an independent committee working from anonymised records that never revealed which drug the patient had taken. The drug group had fewer confirmed heart attacks.": "ある心臓病治療薬の試験では、心筋梗塞が疑われた症例はすべて、患者がどの薬を服用したかが分からないよう匿名化された記録をもとに、独立した委員会が判定しました。治療薬群では確定した心筋梗塞が少ないという結果でした。",
  "The people deciding the outcome could not tell the groups apart, so their judgement cannot have been swayed by expectation. This is exactly how a subjective outcome should be assessed.": "結果を判定する人たちは、どちらの群かを見分けることができなかったため、その判断が期待によって左右された可能性はありません。主観的な結果指標は、まさにこのように評価されるべきです。",
  "An open-label trial could not blind patients or doctors, but its only outcome was death from any cause, taken from the national death registry. The treated group had fewer deaths.": "あるオープンラベル試験は、患者や医師を盲検化することができませんでしたが、唯一の結果指標は全死因死亡であり、国の死亡登録から得たものでした。治療群では死亡が少ないという結果でした。",
  "Death recorded by a registry needs no interpretation, so it does not matter that everyone knew the assignment. For a hard endpoint like this, an unblinded assessor cannot bend the result.": "登録によって記録される死亡には解釈の余地がなく、全員が割り付けを知っていたことは問題になりません。このような硬いエンドポイントでは、非盲検の評価者であっても結果を歪めることはできません。",
  "A blood-pressure study used a validated monitor that recorded each reading and uploaded it automatically, with no clinician deciding or transcribing the number, even though staff knew who was on the drug.": "ある血圧の研究では、検証済みの測定機器が各測定値を記録し、自動的にアップロードしており、臨床医が数値を判断したり書き写したりすることはありませんでした。スタッフはどの患者が薬を服用しているかを知っていました。",
  "No human judged the outcome, so knowing the group could not colour it. Automating the measurement removes the room for an assessor's expectation to creep in.": "結果を判断する人間がいなかったため、群を知っていてもそれに色をつけることはできませんでした。測定を自動化することで、評価者の期待が入り込む余地がなくなります。",
  "The same 172 patients (86 per arm) had their postoperative complications judged both by an assessor blinded to the fluid regimen and, unblinded, by the local investigators. The intention-to-treat Results print both: unblinded, 27 of 86 (31 percent) on restrictive fluid versus 47 of 86 (55 percent) on standard, P = 0.002; blinded, 28 (33 percent) versus 44 (51 percent), P = 0.013. Every count matches its printed percentage, at 86 patients per arm. Blinding narrows the difference from 24 to 18 percentage points and widens the p-value: it right-sizes a real effect rather than erasing it. The 36 percent figure in the deep-dive is Hrobjartsson 2012, which included this trial among its 21.": "同じ172人の患者（各群86人）について、術後合併症を、輸液の投与法を知らされていない評価者と、非盲検の現地治験責任医師の両方が判定しました。治療企図解析の結果にはその両方が示されています。非盲検では、制限輸液群86人中27人（31%）、標準輸液群86人中47人（55%）で、P = 0.002。盲検では、28人（33%）対44人（51%）で、P = 0.013。それぞれの件数は記載された割合と一致しており、母数は各群86人です。盲検化によって差は24ポイントから18ポイントへ狭まり、P値は大きくなります。これは実在する効果を消し去るのではなく、その大きさを適正化するものです。詳説にある36%という数値はHrobjartsson 2012によるもので、この試験もその21件に含まれています。",

  // ---- Statistical versus clinical significance puzzle + review items ----
  "A flu drug beats placebo with P < 0.001, from every trial ever run on it. Governments stockpiled billions. Convinced?": "あるインフルエンザ治療薬は、これまでに行われたすべての試験でプラセボに勝り、P < 0.001でした。各国政府はこれを数十億単位で備蓄しました。納得できますか?",
  "Reviewers obtained the full clinical study reports, not just the published papers, and pooled them. Adults given the drug got better sooner than adults given placebo, and the whole confidence interval sits clear of no difference.": "レビュー担当者は、公表された論文だけでなく完全な臨床試験報告書を入手し、それらを統合しました。薬を投与された成人は、プラセボを投与された成人よりも早く回復し、信頼区間全体が差なしの範囲から明確に外れています。",
  "How much should this change what you do?": "この結果は、あなたの行動をどれだけ変えるべきでしょうか?",
  "Time to first relief of flu symptoms, hours saved": "インフルエンザ症状が最初に和らぐまでの時間、短縮した時間数",
  "hours": "時間",
  "P < 0.001": "P < 0.001",
  "From the full trial reports, adults": "完全な試験報告書による、成人",
  "No difference": "差なし",
  "Flu without the drug": "薬を使わない場合のインフルエンザ",
  "Flu with the drug": "薬を使った場合のインフルエンザ",
  "of the illness": "病気の期間のうち",
  "It works, so take it": "効くのだから、飲むべきです",
  "the evidence is overwhelming": "証拠は圧倒的です",
  "The result must be an artefact": "この結果は見せかけに違いありません",
  "no real effect at all": "本当の効果はまったくありません",
  "Real, and far too small to matter": "本物ですが、取るに足らないほど小さいです",
  "certain is not the same as useful": "確実であることと役立つことは違います",
  "It is certainly real. It is also about sixteen hours.": "確かに本物です。そしてそれは、およそ16時間のことでもあります。",
  "Significant answers a different question": "有意が答えているのは、別の問いです。",
  "Flu runs about seven days. The drug takes it to six and a bit: 16.8 hours off 168, which is a tenth of the illness. The reviewers put it plainly, that the drug modestly shortens symptoms, and in the same breath that it causes nausea and vomiting. One extra person vomits for every 22 treated.": "インフルエンザはおよそ7日続きます。この薬はそれを6日と少しに縮めます。168時間のうち16.8時間、つまり病気の期間の10分の1です。レビュー担当者は、この薬が症状をわずかに短縮すること、そして同時に吐き気と嘔吐を引き起こすことを、率直に述べています。22人治療するごとに1人が余分に嘔吐します。",
  "Nothing was recalculated between these two pictures. The estimate, the interval and the p-value are identical; only what they are measured against changed. A p-value answers whether a difference could plausibly be chance, and with enough patients even a trivial difference cannot be. It never answers whether the difference is worth having. That question needs a size and a yardstick, and the yardstick has to come from outside the statistics.": "この2つの図の間で、計算し直されたものは何もありません。推定値も信頼区間もP値も同じであり、変わったのは何と比べているかだけです。P値が答えるのは、この差が偶然で説明できるかどうかという問いであり、十分な数の患者がいれば、取るに足らない差でさえ偶然では説明できなくなります。P値は、その差が得る価値のあるものかどうかには決して答えません。その問いには大きさとものさしが必要であり、そのものさしは統計そのものの外から持ってこなければなりません。",
  "The same number, other ruler": "同じ数字、別のものさし",
  "Statistical versus clinical significance": "統計的有意と臨床的意義",
  "A small p-value means an effect is probably not chance. It says nothing about whether the effect is big enough to care about. Sample size buys certainty, never importance, so always ask for the size of the difference and what would count as a difference worth having.": "小さいP値は、効果がおそらく偶然ではないことを意味します。しかし、その効果が気にかけるほど大きいかどうかについては何も語りません。サンプルサイズが買えるのは確実性であって、重要性ではありません。だから常に、差の大きさと、どれくらいの差なら得る価値があるといえるのかを問いましょう。",
  "The two questions get answered by different numbers. Could this be chance is answered by the p-value and the confidence interval. Is this worth having is answered by the effect size, set against something that matters: how long the illness lasts, how bad the symptoms are, what the treatment costs you in side effects. A result can be emphatic on the first and pitiful on the second, and press releases have every incentive to quote only the first.": "この2つの問いには、それぞれ別の数字が答えます。「これは偶然か」にはP値と信頼区間が答えます。「これは得る価値があるか」には効果量が、病気がどれくらい続くか、症状がどれほどひどいか、治療の副作用としてどれだけの代償を払うかといった、意味のある何かと比べることで答えます。ある結果は、前者では雄弁でも後者では貧弱なことがあり、プレスリリースには前者だけを引用する動機がいくらでもあります。",
  "A p-value is a statement about how easily chance could produce the difference you saw, and it depends on the size of the study as much as on the size of the effect. Quadruple the patients and the same trivial difference has a p-value four times more impressive, because the estimate is that much more precisely pinned down. Push the numbers far enough and any difference at all, however meaningless, becomes highly significant. That is not a flaw in the arithmetic, it is what the arithmetic was built to do: separate signal from noise, and nothing more. The consequence is a habit worth keeping for life. When you meet a significant result, do not ask how significant. Ask how big, in units you can picture, and against what. If nobody has told you what size of difference would have been worth the trouble, the significance on its own has not told you anything you can act on.": "P値とは、あなたが見た差を偶然がどれほど容易に生み出せたかについての言明であり、効果の大きさと同じくらい、研究の規模にも左右されます。患者数を4倍にすれば、同じ取るに足らない差でも、P値は4倍印象的になります。推定値がそれだけ精密に絞り込まれるからです。数字を十分に押し進めれば、どれほど無意味な差であっても高度に有意になります。これは計算の欠陥ではなく、計算がそもそも作られた目的、すなわち信号を雑音から切り分けること、それ以上でもそれ以下でもないことの表れです。ここから得られるのは、一生役立つ習慣です。有意な結果に出会ったら、「どれくらい有意か」を問うてはいけません。「どれくらい大きいか」を、思い描ける単位で、そして何と比べてかを問いましょう。どれくらいの差なら苦労する価値があったのかを誰も教えてくれていないなら、有意性そのものは、あなたが行動に移せることを何一つ教えてくれていません。",
  "The bar the field set, and the result that missed it": "その分野が定めた基準と、それに届かなかった結果",
  "A meta-analysis of every antidepressant trial submitted to the American regulator found the drugs beat placebo with high confidence, by 1.80 points on a depression scale. The guideline body's own threshold for a difference that matters clinically was three points, so the authors reported an effect that was statistically certain and below the bar its own field had set. Two questions, two answers, and only one of them was in the headline.": "アメリカの規制当局に提出されたすべての抗うつ薬試験のメタ分析は、これらの薬がうつ病評価尺度で1.80点、高い確実性をもってプラセボに勝ることを見いだしました。臨床的に意味のある差についてガイドライン団体自身が定めていた基準は3点であり、著者らは、統計的には確実でありながら、その分野自身が定めた基準に届かない効果を報告したことになります。2つの問いに2つの答えがあり、見出しになったのはそのうちの一方だけでした。",
  "Statistical versus clinical significance, a reasoning trap.": "統計的有意と臨床的意義、推論の罠です。",
  "A tiny p-value means a difference is probably not a fluke. It does not mean the difference is big enough to bother with. Study enough people and even a pointless difference becomes highly significant, because certainty is what sample size buys. Before believing a result matters, ask how large it is in units you can picture, and what size would have been worth having.": "極めて小さいP値は、その差がおそらくまぐれではないことを意味します。しかし、その差がわざわざ気にかけるほど大きいことは意味しません。十分な数の人を調べれば、無意味な差でさえ高度に有意になります。サンプルサイズが買うのは確実性だからです。ある結果が重要だと信じる前に、それが思い描ける単位でどれくらい大きいのか、そしてどれくらいの大きさなら得る価値があったのかを問いましょう。",
  "Everyone reads the p-value. Almost nobody asks how big.": "誰もがP値を読みます。しかし、どれくらい大きいのかを問う人はほとんどいません。",
  "P less than 0.001, I said. It was sixteen hours.": "「P値は0.001未満」と、私は言いました。実際は16時間のことでした。",
  "The BMJ abstract prints the treatment effect in adults as a reduction in time to first alleviation of symptoms of 16.8 hours (95 percent confidence interval 8.4 to 25.1), P < 0.001, and the harms as nausea (risk difference 3.66 percent, number needed to harm 28) and vomiting (4.56 percent, number needed to harm 22). The Cochrane review of the same dataset expresses the same benefit as a fall from 7 days to 6.3 days, which is where the 168-hour illness in the figure comes from; 168 minus 16.8 is 151.2 hours, or 6.3 days, and 16.8 is exactly a tenth of 168. Two honesty notes. The 7-day figure is the review's own description of the untreated illness rather than a separately measured mean with its own interval, so the second panel is drawn to the review's stated baseline. And the reviewers' conclusion is that the drug modestly shortens symptoms while causing nausea and vomiting, not that it does nothing: the lesson here is about the size of a real effect, not about denying it.": "BMJの抄録は、成人における治療効果を、症状が最初に和らぐまでの時間の16.8時間の短縮（95パーセント信頼区間、8.4から25.1）、P < 0.001と記載し、害については吐き気（リスク差3.66パーセント、有害必要数28）と嘔吐（4.56パーセント、有害必要数22）としています。同じデータセットについてのコクランレビューは、同じ効果を7日から6.3日への短縮として表現しており、これが図の168時間の病気の出どころです。168引く16.8は151.2時間、つまり6.3日であり、16.8は168のちょうど10分の1です。誠実さに関わる注記が2つあります。7日という数値は、独自の区間を持つ別途測定された平均ではなく、レビュー自身による無治療時の病気の説明であり、そのため2枚目の図はレビューが述べる基準値に合わせて描かれています。そしてレビュー担当者の結論は、この薬が吐き気と嘔吐を引き起こしながらも症状をわずかに短縮するというものであり、何もしないというものではありません。ここでの教訓は、本物の効果の大きさについてであり、それを否定することについてではありません。",
  "A company tested a redesign on 4 million users and reported that it loaded significantly faster, p < 0.0001. The press release calls it a major speed improvement. The measured difference is 3 milliseconds.": "ある企業は、リデザインを400万人のユーザーで試験し、読み込みが有意に速くなったと報告しました。p < 0.0001です。プレスリリースはこれを大きな速度改善と呼んでいます。測定された差は3ミリ秒でした。",
  "With 4 million users even a 3 millisecond difference is far too consistent to be chance, so the tiny p-value is guaranteed. Nobody can perceive 3 milliseconds, so the result is certain and worthless.": "400万人のユーザーがいれば、3ミリ秒の差であっても偶然にしてはあまりに一貫しすぎており、極めて小さいP値が出ることは保証されています。3ミリ秒を知覚できる人は誰もいないため、この結果は確実であり、同時に無価値です。",
  "A weight-loss programme trialled in 30,000 people reports that participants lost significantly more than controls, p < 0.001, and markets itself on that result. Over a year the difference averaged 400 grams.": "ある減量プログラムは30,000人を対象に試験され、参加者は対照群より有意に多く体重を減らしたと報告し、p < 0.001です。このプログラムはこの結果を売りにしています。1年間の差は平均400グラムでした。",
  "A 400 gram difference over a year is of no health consequence, but with 30,000 people it is measured precisely enough to be highly significant. The p-value confirms the difference is real, not that it is worth the effort.": "1年間で400グラムの差は健康上の帰結を何も持ちませんが、30,000人がいれば、高度に有意といえるほど精密に測定できます。P値が確認しているのは差が本物であることであり、その労力に見合う価値があることではありません。",
  "A supplement lowered blood pressure by 0.6 mmHg more than placebo in a trial of 50,000 adults, p < 0.001. An advert says it is clinically proven to lower blood pressure, without naming the number.": "あるサプリメントは、50,000人の成人を対象とした試験で、プラセボより血圧を0.6 mmHg多く下げました。p < 0.001です。広告は、血圧を下げることが臨床的に証明されていると述べていますが、数字は示していません。",
  "Guidelines treat blood pressure changes of a few mmHg as the smallest worth acting on, so 0.6 is negligible, but 50,000 people make it statistically certain. The claim leans entirely on significance and hides the size.": "ガイドラインは、数mmHg程度の血圧の変化を、対応する価値のある最小の変化として扱っており、0.6はごくわずかです。しかし50,000人がいれば統計的に確実になります。この主張は有意性だけに寄りかかり、大きさを隠しています。",
  "An education study of 100,000 pupils found that an online tutoring add-on raised exam marks by a statistically significant amount, p < 0.001, and a minister cites it as proof the programme works. The gain was 0.3 marks out of 100.": "100,000人の児童生徒を対象とした教育研究は、オンライン個別指導の追加によって試験の点数が統計的に有意な量だけ上がったことを見いだし、p < 0.001です。大臣はこれをこのプログラムが効果的である証拠として引用しています。伸びは100点満点中0.3点でした。",
  "A third of a mark out of a hundred changes nothing for any pupil, yet 100,000 of them pin the estimate down tightly enough to be highly significant. Significance is being used as a stand-in for a benefit nobody has shown.": "100点満点中0.3点は、どの生徒にとっても何も変えません。それでも100,000人がいれば、高度に有意といえるほど推定値をきつく絞り込めます。有意性が、誰も示せていない便益の代わりに使われているのです。",
  "Researchers report a significant association between a food and a blood marker in 500,000 people, with a vanishingly small p-value. A news story says the food strongly affects the marker. The correlation is 0.01.": "研究者たちは、500,000人においてある食品と血液マーカーとのあいだに有意な関連があると報告し、P値は消え入るほど小さいものでした。ニュース記事は、この食品がそのマーカーに強く影響すると伝えています。相関は0.01です。",
  "A correlation of 0.01 explains essentially none of the variation, but half a million people make even that distinguishable from zero many times over. The extreme p-value reflects the sample size, not the strength of the link.": "0.01という相関は、ばらつきをほぼまったく説明しません。しかし50万人がいれば、それでもゼロとは何倍にも区別できるようになります。極端に小さいP値が反映しているのはサンプルサイズであって、関連の強さではありません。",
  "A mattress company's study of 80,000 sleepers found their model gave significantly more sleep than a standard one, p < 0.001, and the packaging says so. The extra sleep averaged 90 seconds a night.": "あるマットレス会社の80,000人の睡眠者を対象とした研究は、自社のモデルが標準的なモデルより有意に多くの睡眠を与えることを見いだし、p < 0.001です。パッケージにもそう書かれています。増えた睡眠は一晩平均90秒でした。",
  "Ninety seconds is well below any amount a sleeper would notice or benefit from, yet 80,000 people make it a highly significant difference. The claim rests on the p-value and never mentions the size.": "90秒は、眠る人が気づいたり恩恵を感じたりする量をはるかに下回ります。それでも80,000人がいれば、高度に有意な差になります。この主張はP値に寄りかかっており、大きさには一切触れていません。",
  "A fuel additive tested across 200,000 journeys significantly improved fuel economy, p < 0.001. The manufacturer advertises proven savings. The improvement was 0.1 percent, and the additive costs more than that.": "ある燃料添加剤は200,000回の走行にわたって試験され、燃費を有意に改善しました。p < 0.001です。製造元は実証された節約効果を宣伝しています。改善は0.1パーセントで、この添加剤の費用はそれを上回ります。",
  "The improvement is real and precisely measured, which is what the p-value shows, but at 0.1 percent it costs more than it saves. Statistical significance says the effect exists, not that it is worth buying.": "この改善は本物であり、精密に測定されています。それがP値の示すことです。しかし0.1パーセントでは、節約できる額より費用のほうが高くつきます。統計的有意は効果が存在することを述べているのであって、買う価値があることを述べているのではありません。",
  "A hospital reports that a new triage system significantly reduced waiting times across 300,000 attendances, p < 0.001, and the board declares the rollout a success. Average waits fell from 247 minutes to 245.": "ある病院は、新しいトリアージシステムが300,000件の受診にわたって待ち時間を有意に減らしたと報告し、p < 0.001です。理事会はこの導入を成功だと宣言しています。平均の待ち時間は247分から245分に短縮しました。",
  "Two minutes off a four-hour wait is nothing to a patient, but 300,000 attendances make it statistically unmistakable. The board has read certainty as importance.": "4時間の待ち時間から2分短くなっても、患者にとっては何の意味もありません。しかし300,000件の受診があれば、統計的には紛れもない差になります。理事会は確実性を重要性と読み違えています。",
  "A painkiller beat placebo on a 0 to 100 pain scale in 25,000 patients, p < 0.001, and is promoted on that basis. The difference was 1.5 points, and researchers in the field treat about 10 points as the smallest change patients notice.": "ある鎮痛薬は、0から100の痛みの尺度において25,000人の患者でプラセボに勝り、p < 0.001です。これを根拠に宣伝されています。差は1.5点で、この分野の研究者たちは、患者が気づく最小の変化をおよそ10点として扱っています。",
  "The field already has a yardstick, roughly 10 points, and 1.5 falls far below it. The large trial makes that small difference statistically certain without making it perceptible to anyone.": "この分野にはすでにものさしがあり、およそ10点です。1.5はそれをはるかに下回ります。大規模な試験は、この小さな差を統計的に確実にしますが、誰にとっても知覚できるものにはしません。",
  "A phone maker tested a software update on 2 million handsets and reported significantly longer battery life, p < 0.0001, headlining the update. Screen-on time rose by 40 seconds.": "ある携帯電話メーカーは、ソフトウェアの更新を200万台の端末で試験し、バッテリー持続時間が有意に延びたと報告しました。p < 0.0001です。この更新は見出しを飾りました。画面点灯時間は40秒延びました。",
  "Forty seconds of screen time is imperceptible over a day, yet two million handsets make the measurement precise enough for an extreme p-value. The headline reports how sure they are, not how much it helps.": "1日を通して見れば、40秒の画面点灯時間は知覚できません。それでも200万台の端末があれば、極端に小さいP値が出るほど測定は精密になります。見出しが伝えているのは、どれほど確信しているかであって、どれほど役に立つかではありません。",
  "A trial reports that its drug improved walking distance by 68 metres, states that researchers in the field regard 30 metres as the smallest improvement patients notice, and concludes the benefit is both statistically and clinically meaningful.": "ある試験は、その薬が歩行距離を68メートル改善したと報告し、この分野の研究者たちが患者の気づく最小の改善を30メートルとみなしていることを述べたうえで、その便益は統計的にも臨床的にも意味があると結論づけています。",
  "The report gives the size of the effect, names an external yardstick, and shows the effect clears it. That is exactly the pair of questions a result should answer, so nothing is being smuggled past the reader.": "この報告書は効果の大きさを示し、外部のものさしを名指しし、その効果がものさしを上回ることを示しています。これはまさに、ある結果が答えるべき2つの問いそのものであり、読み手の目をかすめて何かを紛れ込ませてはいません。",
  "A very large study finds a statistically significant difference and its authors write that, although the p-value is small, the difference is too slight to change practice, and recommend against acting on it.": "ある非常に大規模な研究は統計的に有意な差を見いだしましたが、著者らは、P値は小さいものの、その差は診療を変えるにはあまりにわずかであると記し、それに基づいて行動しないよう勧めています。",
  "The authors separate the two questions properly: the effect is real, and it is not worth acting on. Declining to convert a small p-value into a recommendation is the careful move, not the trap.": "著者らは2つの問いを正しく切り分けています。効果は本物であり、それに基づいて行動する価値はない、というものです。小さいP値をそのまま推奨に変えることを控えるのは、慎重な判断であり、罠ではありません。",
  "A small trial finds a promising-looking improvement that does not reach statistical significance, and the authors report the estimate with a wide confidence interval, saying the study cannot rule out either a useful benefit or no benefit at all.": "ある小規模な試験は、有望に見えるものの統計的有意には届かない改善を見いだし、著者らは広い信頼区間とともに推定値を報告し、この研究では有用な便益がある可能性も、まったく効果がない可能性も、どちらも否定できないと述べています。",
  "A non-significant result from a small study means the question is unsettled, not that the treatment fails. Reporting the wide interval instead of claiming no effect is the honest reading.": "小規模な研究から得られた有意でない結果が意味するのは、問いがまだ決着していないということであり、治療が効かないということではありません。効果がないと主張する代わりに広い区間を報告するのが、誠実な読み方です。",
  "Against no difference": "差なしと比べた場合",
  "Against what it should fix": "治すはずのものと比べた場合",

  // ---- Simpson paradox: the third, cautious-sounding choice ----
  "Neither yet": "まだ決められない",
  "ask how the patients were split first": "まず患者の内訳を尋ねる",

  // ---- Ecological fallacy puzzle + review items ----
  "In 1930, American states with more immigrants had less illiteracy. So immigrants could read better than the locals?": "1930年、移民が多いアメリカの州ほど、非識字率は低くなっていました。では、移民は地元の人々よりも読み書きが得意だったのでしょうか。",
  "One census, 48 states. For each state, the share of people born abroad and the share who could not read. The more foreign born a state was, the lower its illiteracy, and the pattern is strong enough that people have been quoting it ever since.": "1回の国勢調査、48州。各州について、国外生まれの人の割合と、読み書きができない人の割合を見ます。国外生まれが多い州ほど非識字率は低く、そのパターンはあまりに明確なので、人々は今日までこれを引き合いに出し続けています。",
  "What does that tell you about immigrants?": "それは移民について何を物語っているでしょうか。",
  "Born abroad and unable to read, 1930 census": "国外生まれと読み書き不能、1930年国勢調査",
  "Could not read or write": "読み書きができない",
  "One dot would be one state": "1つの点が1つの州",
  "Share of the state born abroad": "州における国外生まれの割合",
  "Illiteracy": "非識字率",
  "The slope is drawn from the published correlation. Robinson printed the coefficient, never the figures for each state, so plotting dots here would be inventing them.": "この傾き線は、発表された相関係数から描かれています。ロビンソンが示したのは係数だけで、各州ごとの数値を公表したことは一度もないため、ここに点を打てば、その数値を捏造することになってしまいます。",
  "Counts in thousands of people, from the paper's own table.": "人数は千人単位で、論文自体の表によるものです。",
  "People born abroad": "国外生まれの人々",
  "Born abroad": "国外生まれ",
  "People born in the country": "国内生まれの人々",
  "Born here": "国内生まれ",
  "Immigrants read better": "移民のほうが読み書きが得意",
  "the states full of them read better": "移民の多い州のほうが読み書きが得意",
  "Nothing, the pattern is noise": "何も。そのパターンはただのノイズです",
  "a coincidence across 48 states": "48州にわたる偶然の一致",
  "Nothing about any person": "個人については何も",
  "this compares places, not people": "これは場所同士を比べているのであって、人同士ではありません",
  "Count people instead of states and it turns the other way.": "州ではなく人を数えると、結果は逆転します。",
  "Places are not people": "場所は人ではありません",
  "In the same census, 1,304 of every 13,217 people born abroad could not read, against 2,614 of every 84,055 born in the country. That is about 10 per cent against 3, so immigrants were around three times as likely to be illiterate, not less. Across states the correlation is -.53; across people it is +.12.": "同じ国勢調査で、国外生まれの13,217人のうち1,304人が読み書きできなかったのに対し、国内生まれでは84,055人のうち2,614人でした。約10パーセント対3パーセントで、移民が非識字である可能性は、低いどころかおよそ3倍高かったのです。州単位で見た相関は-.53、人単位で見た相関は+.12です。",
  "Both numbers are right, and they are answers to different questions. Immigrants settled where the work was, and those states also had the money and the schools that kept everyone else's illiteracy low. So a state's immigrant share tracked its wealth, and its wealth tracked its literacy, while inside every state the immigrants themselves were the ones more likely to be unable to read. Nothing about the state-level line was ever a claim about a person.": "どちらの数値も正しく、それぞれ別の問いに対する答えです。移民は仕事のある場所に住み着き、そうした州には、ほかの人々の非識字率も低く抑えるだけの資金と学校がありました。つまり、州の移民の割合はその州の豊かさと連動し、豊かさは識字率と連動していた一方で、どの州の内部でも、読み書きができない可能性が高かったのは移民自身だったのです。州単位の線は、個人についての主張だったことなど一度もありません。",
  "Same census, other unit": "同じ国勢調査、別の単位",
  "The ecological fallacy": "生態学的誤謬",
  "A relationship measured between groups need not hold, and can run backwards, inside them. If the rows in your table are places, schools or countries, the finding is about places, schools or countries, and carrying it down to a person is a separate claim that needs its own evidence.": "グループ間で測定された関係は、そのグループの内部でも成り立つとは限らず、逆向きに働くことさえあります。表の行が場所、学校、国であるなら、その知見は場所、学校、国についてのものであり、それを個人にまで引き下ろすのは別の主張であって、それ自体の根拠が必要です。",
  "The tell is the unit of analysis: ask what one row of the data actually is. Averages per country, per region, per hospital or per school are convenient because they are published, but a pattern among averages can be produced entirely by which people ended up where. The same trap runs the other way too, so a pattern among individuals need not reappear when they are grouped.": "見分ける手がかりは分析単位です。データの1行が実際には何なのかを問いましょう。国別、地域別、病院別、学校別の平均は、公表されているため使いやすいものですが、平均どうしのパターンは、誰がどこに落ち着いたかだけで丸ごと作り出されている場合があります。同じ罠は逆方向にも働くので、個人どうしのパターンが、まとめてグループ化したときに再び現れるとは限りません。",
  "Picture two states. One is rich, with good schools, and attracts most of the immigrants; almost everyone there can read, immigrants slightly less often than the rest. The other is poor, has few immigrants, and much of its population never finished school. Plot the two states and you get a clean downward line: more immigrants, less illiteracy. Now pool the people and count them one by one, and the immigrants come out worse, because within each state they always were. The state-level line was never measuring immigrants at all. It was measuring the difference between a rich state and a poor one, with the immigrant share acting as a marker for which was which. This is why the fallacy is so easy to commit with published statistics: aggregated tables are what governments release, so the temptation is to answer a question about people using the only data on the shelf.": "2つの州を思い浮かべてください。一方は豊かで学校もよく、移民の大半を引き寄せています。そこではほぼ全員が読み書きでき、移民はほかの人々よりわずかに読み書きできない割合が高い程度です。もう一方は貧しく、移民はほとんどおらず、住民の多くは学校を修了していません。この2つの州をグラフに描くと、移民が多いほど非識字率が低い、というきれいな右下がりの線が得られます。ところが、人々を1つにまとめて1人ずつ数えると、移民のほうが成績が悪く出ます。なぜなら、どちらの州の内部でも、移民は常にそうだったからです。州単位の線は、そもそも移民を測っていたわけではありませんでした。それが測っていたのは、豊かな州と貧しい州の違いであり、移民の割合はどちらがどちらかを示す目印として働いていたにすぎません。だからこそ、公表された統計でこの誤謬を犯すのはとても簡単なのです。政府が公開するのは集計された表であり、そのため、棚にある唯一のデータを使って個人についての問いに答えたくなる誘惑が生まれます。",
  "The correction that left the lesson standing": "訂正されても揺るがなかった教訓",
  "In 2011 a re-analysis found Robinson had used the wrong state-level figures, and that the correlation across states is nearer -0.46 than the -0.53 he printed. The number moved, the reversal did not: across states the relationship still runs one way and across people the other. A textbook case is more useful when its arithmetic has been checked than when it is merely repeated.": "2011年の再分析により、ロビンソンが誤った州単位の数値を使っていたことが判明し、州単位の相関は、彼が示した-.53よりも-0.46に近いことがわかりました。数値は動きましたが、逆転そのものは動きませんでした。州単位ではいまも関係は一方向に働き、人単位では逆方向に働きます。教科書的な事例は、ただ繰り返されるよりも、算出過程が検証されているほうが役に立ちます。",
  "The ecological fallacy, a reasoning trap.": "生態学的誤謬、推論の罠です。",
  "A pattern found by comparing places can reverse completely when you count people instead. Areas with more immigrants had less illiteracy, yet immigrants themselves were three times likelier to be unable to read, because they settled where the schools were good. Before believing a statistic about people, check whether the rows in the table were people at all.": "場所同士を比較して見つかったパターンは、代わりに人を数えると、完全に逆転することがあります。移民が多い地域ほど非識字率は低かったにもかかわらず、移民自身は読み書きができない可能性が3倍高かったのです。学校の良い場所に住み着いたからです。人についての統計を信じる前に、表の行がそもそも人だったのかを確かめましょう。",
  "Same census, opposite answer. Depends what you count.": "同じ国勢調査、正反対の答え。何を数えるかで変わります。",
  "I read a fact about states as a fact about people.": "私は州についての事実を、人についての事実として読んでしまいました。",
  "The person-level counts are Robinson's own, in thousands: 1,304 illiterate of 13,217 born abroad and 2,614 of 84,055 born in the country, which give 9.9 per cent against 3.1 and reproduce the +.118 he prints. The outcome is illiteracy, not literacy, which is why the individual figure is positive. Robinson prints -.526 across the 48 states and -.619 across the nine census divisions. Two honesty notes. The state-level figure is authored here as the coefficient rather than as points, because he published the correlation and never the per-state figures, so the setup draws a slope and says so on the figure rather than inventing a scatter. And te Grotenhuis and colleagues showed in 2011 that his state-level data were wrong and the correlation is nearer -0.46; the reversal between the two levels survives the correction, which is the only thing this puzzle claims.": "人単位の数値はロビンソン自身のもので、千人単位です。国外生まれ13,217人のうち非識字が1,304人、国内生まれ84,055人のうち2,614人で、9.9パーセント対3.1パーセントとなり、彼が示す+.118を再現します。結果として測っているのは識字率ではなく非識字率であり、それが個人単位の数値が正の符号を持つ理由です。ロビンソンは48州にわたって-.526を、9つの国勢調査区分にわたって-.619を示しています。ここで2つ、誠実さについての注記があります。州単位の数値は、ここでは点としてではなく係数として作成しています。彼が公表したのは相関係数のみで、州ごとの数値を公表したことは一度もないため、この設定では散布図を捏造するのではなく、傾き線を描いてその旨を図に明記しています。そして、te Grotenhuisらは2011年に、彼の州単位のデータが誤っており、相関は-0.46に近いことを示しました。この2つの水準のあいだの逆転は、その訂正を経ても残っており、それこそがこのパズルが主張する唯一の点です。",
  "Countries that eat more sugar have higher rates of a disease. A columnist tells readers that eating sugar raises their personal risk, citing the country comparison as the evidence.": "砂糖の消費が多い国ほど、ある病気の発生率が高くなっています。あるコラムニストは、この国同士の比較を根拠として挙げ、砂糖を食べると個人のリスクが上がると読者に伝えます。",
  "The rows in that table are countries, not people. Rich countries differ from poor ones in dozens of ways at once, so the line across them may not hold for any individual. A claim about a person needs data measured on people.": "その表の行は国であって、人ではありません。豊かな国と貧しい国は、一度に何十もの点で異なっているため、国同士に引かれた線が、どの個人にも当てはまるとは限りません。個人についての主張には、人を対象に測定されたデータが必要です。",
  "Schools with more spending per pupil get better average exam results, so a council concludes that spending more on any given child will raise that child's marks.": "生徒1人当たりの支出が多い学校ほど、平均の試験結果が良くなっています。そこである教育委員会は、特定の子どもへの支出を増やせば、その子の成績が上がると結論づけます。",
  "The comparison is between schools, and schools differ in intake as well as budget. Well-funded schools often sit in wealthier areas, so the pattern can be about which children attend rather than about what an extra pound does for one of them.": "比較されているのは学校同士であり、学校は予算だけでなく、入学してくる生徒の層でも異なります。潤沢な予算の学校はしばしば裕福な地域にあるため、このパターンは、追加の1ポンドが1人の子どもに何をもたらすかではなく、どんな子どもが通っているかを表しているのかもしれません。",
  "Richer regions vote for one party more often, so an analyst writes that richer voters back that party. No individual-level survey is cited.": "豊かな地域ほど、ある政党によく投票します。そこであるアナリストは、豊かな有権者がその政党を支持していると書きます。個人単位の調査は一切引用されていません。",
  "A region's average income and an individual's income are different variables. The regional pattern can run one way while richer individuals inside those regions vote the other way, which is exactly what has been found in some countries.": "地域の平均所得と、個人の所得は、別の変数です。地域単位のパターンが一方向に働く一方で、その地域の内部にいる裕福な個人は逆方向に投票することがあり、実際にいくつかの国ではまさにそれが見つかっています。",
  "Hospitals with more nurses per bed have lower average death rates, and a manager concludes that any individual patient given more nursing attention is less likely to die.": "病床当たりの看護師数が多い病院ほど、平均の死亡率が低くなっています。そこであるマネージャーは、看護の手をより多くかけられた個々の患者は、死亡する可能性が低いと結論づけます。",
  "The unit here is the hospital. Better staffed hospitals also tend to be better funded and to treat different case mixes, so the between-hospital pattern is not by itself a statement about what happens to one patient.": "ここでの単位は病院です。人員の充実した病院は、資金も充実し、扱う症例の構成も異なる傾向があります。そのため、病院間のパターンだけでは、1人の患者に何が起こるかについての主張にはなりません。",
  "Towns with cleaner air have longer average life expectancy, so a report states that breathing cleaner air will add years to a reader's life, using only the town-level figures.": "空気のきれいな町ほど、平均寿命が長くなっています。そこであるレポートは、町単位の数値だけを使って、きれいな空気を吸えば読者の寿命が延びると述べます。",
  "Towns with clean air differ from others in wealth, occupation and smoking as well. The town-level association can be produced by who lives where, so it cannot on its own quantify what cleaner air does for one person.": "空気のきれいな町は、豊かさ、職業、喫煙の点でもほかの町と異なります。町単位の関連は、誰がどこに住んでいるかだけで生じ得るため、それだけでは、きれいな空気が1人の人に何をもたらすかを定量化することはできません。",
  "Across 30 countries, average height rises with average dairy consumption, and a magazine advises readers that drinking more milk will make them taller, citing that country chart.": "30か国を通じて、平均身長は平均乳製品消費量とともに上がっており、ある雑誌は、その国別グラフを引用して、牛乳をもっと飲めば背が高くなると読者に勧めます。",
  "Each point is a whole country, so the chart compares national averages shaped by genetics, wealth and childhood nutrition together. Turning it into personal advice treats a fact about countries as a fact about a body.": "点の1つひとつが1つの国全体であり、このグラフは、遺伝、豊かさ、幼少期の栄養がまとめて形作った国レベルの平均を比較しています。それを個人向けの助言に変えることは、国についての事実を、身体についての事実として扱うことになります。",
  "Neighbourhoods with more young men have more recorded crime, and a report concludes that a given young man is more likely to be an offender than a given older resident, using only the neighbourhood totals.": "若い男性の多い地区ほど、記録される犯罪が多くなっています。そこであるレポートは、地区の合計値だけを使って、特定の若い男性は特定の年配の住民より犯罪者である可能性が高いと結論づけます。",
  "The data counts neighbourhoods, so it cannot say who committed the crimes. Areas with young populations also tend to differ in income and housing, and the individual claim needs individual records.": "このデータが数えているのは地区であり、誰が犯罪を犯したかを語ることはできません。若い人口を抱える地域は、所得や住宅事情の点でも異なる傾向があり、個人についての主張には個人単位の記録が必要です。",
  "Teams with more experienced staff ship fewer bugs on average, so a director tells one junior engineer that their individual bug rate must be the reason their team struggles.": "経験豊富なスタッフの多いチームほど、平均してバグの出荷が少なくなっています。そこであるディレクターは、ある新人エンジニアに、そのチームが苦戦しているのはあなた個人のバグ率が原因に違いないと告げます。",
  "The pattern is measured across teams, which differ in the difficulty of what they build as well as in experience. Nothing in a team-level average identifies which person produced which defect.": "このパターンはチーム間で測定されたものであり、チームは経験だけでなく、作っているものの難易度でも異なります。チーム単位の平均のどこにも、誰がどの欠陥を生んだかを特定する情報はありません。",
  "Countries with more television sets per household report higher literacy, and an editorial argues that watching television makes an individual more literate.": "世帯当たりのテレビ台数が多い国ほど、識字率が高いと報告されています。ある社説は、テレビを見ると個人の識字能力が上がると論じます。",
  "Television ownership marks how wealthy a country is, and wealth brings schools. The country-level link is about national development, so it licenses no claim about what watching television does to one viewer.": "テレビの所有台数は、その国がどれほど豊かかを示す目印であり、豊かさは学校をもたらします。国単位の関連は国の発展についてのものであり、テレビを見ることが1人の視聴者に何をもたらすかについての主張を正当化するものではありません。",
  "Clinics with longer average waiting times report higher patient satisfaction, and a board concludes that making an individual patient wait longer will make that patient happier.": "平均待ち時間の長いクリニックほど、患者満足度が高いと報告されています。そこである理事会は、1人の患者をより長く待たせれば、その患者はより満足すると結論づけます。",
  "Comparing clinics is not comparing patients. Busy, popular clinics can have both long queues and good care, so a clinic-level correlation cannot be read as what waiting does to one person, and here it is plainly implausible.": "クリニック同士を比べることは、患者同士を比べることではありません。繁盛している人気のクリニックは、長い行列と質の高い診療の両方を抱えていることがあり得るため、クリニック単位の相関を、待つことが1人の人に何をもたらすかとして読むことはできません。しかも、ここではその解釈は明らかにありそうにありません。",
  "Researchers wanted to know whether a diet affects one person's risk, so rather than comparing country averages they followed 40,000 individuals, recording each person's own diet and their own outcome, and reported the association among those people.": "ある食事法が1人の人のリスクに影響するかどうかを知りたかった研究者たちは、国別の平均を比較する代わりに、40,000人の個人を追跡し、1人ひとりの食事内容とその人自身の転帰を記録して、その人々のあいだの関連を報告しました。",
  "The question was about individuals and the data was measured on individuals, so the unit of analysis matches the claim. That is precisely the step the ecological fallacy skips.": "問いは個人についてのものであり、データも個人を対象に測定されていたため、分析単位は主張と一致しています。これこそ、生態学的誤謬が飛ばしてしまう、まさにその段階です。",
  "A study finds that countries with stricter seatbelt laws have fewer road deaths per head, and concludes that such laws are associated with lower national death rates, explicitly declining to say what any individual driver's risk would be.": "ある研究は、シートベルト法がより厳しい国ほど、人口当たりの交通死者数が少ないことを見いだし、そうした法律は国の死亡率の低さと関連していると結論づけますが、個々のドライバーのリスクがどうなるかについては、意図的に述べません。",
  "The data is national and the conclusion is kept national. Policy questions are legitimately asked at the level of populations, and the authors do not smuggle the finding down to a person.": "データは国単位であり、結論も国単位にとどめられています。政策上の問いは、集団の水準で問うことが正当であり、著者たちはその知見をこっそり個人にまで引き下ろしたりはしません。",
  "Analysts studying whether neighbourhood poverty affects individual health use records that hold both each person's own income and their neighbourhood's, and report the neighbourhood effect after accounting for the person's own circumstances.": "地区の貧困が個人の健康に影響するかどうかを調べているアナリストたちは、1人ひとりの所得とその人が住む地区の所得の両方を含む記録を使い、その人自身の状況を考慮したうえで、地区の効果を報告します。",
  "Holding both levels in the same model is the standard way to separate what an area does from what a person's own situation does, so the group-level claim is not resting on individual-level guesswork.": "両方の水準を同じモデルの中に保持することは、地域が及ぼす影響と、個人自身の状況が及ぼす影響を切り分ける標準的な方法であり、そのためグループ単位の主張は、個人単位の当て推量に頼っていません。",
  "Counting places": "場所を数える",
  "Counting people": "人を数える",

  // ---- Framing effect puzzle + review items ----
  "Asked to choose a plan against an outbreak, most people took the certain option. A sensible, cautious public?": "感染症の流行への対策を選ぶよう求められたところ、大多数の人が確実な選択肢を選びました。分別があり、慎重な人々なのでしょうか。",
  "An unusual disease is expected to kill 600 people. Two programmes are proposed, and the exact consequences of each are given. People were asked which they would favour.": "ある異例の病気により600人が死亡すると見込まれています。2つの対策案が提示され、それぞれの結果が正確に示されました。人々はどちらを支持するかをたずねられました。",
  "What does this tell you about what people want?": "これは、人々が何を望んでいるかについて何を教えてくれるでしょうか。",
  "Which programme people favoured": "人々が支持した対策",
  "An outbreak expected to kill 600 people, with the consequences of each programme stated exactly.": "600人が死亡すると見込まれる流行で、各対策の結果が正確に示されています。",
  "The majority took the certain option": "大多数が確実な選択肢を選んだ",
  "The majority took the gamble": "大多数が賭けを選んだ",
  "Shares as the paper printed them. It reports percentages and the number asked, never the raw counts.": "論文に印刷されたとおりの割合です。パーセントと尋ねられた人数は報告されていますが、実数は一度も報告されていません。",
  "Outcomes described as lives saved": "救われる命として述べられた結果",
  "Lives saved": "救われる命",
  "200 people will be saved": "200人が救われます",
  "A one in three chance that all 600 are saved, and two in three that nobody is": "3分の1の確率で600人全員が救われ、3分の2の確率で誰も救われません",
  "Outcomes described as lives lost": "失われる命として述べられた結果",
  "Lives lost": "失われる命",
  "400 people will die": "400人が死亡します",
  "A one in three chance that nobody dies, and two in three that all 600 do": "3分の1の確率で誰も死なず、3分の2の確率で600人全員が死にます",
  "People prefer certainty": "人々は確実性を好む",
  "a settled preference, nearly three to one": "ほぼ3対1の、揺るぎない選好",
  "They cannot do the arithmetic": "人々は算数ができない",
  "the odds were beyond them": "確率の計算が手に負えなかった",
  "It depends how it was worded": "どう言葉にされたかで変わる",
  "ask again in other words and it moves": "別の言葉で聞き直すと変わる",
  "The same choice, reworded, and the majority swaps sides.": "同じ選択を言い換えると、大多数の側が入れ替わります。",
  "Saved and lost are the same thing": "救われることと失われることは同じ",
  "Of 600 people, saving 200 is the same as 400 dying. Nothing about the outcomes changed between these two versions, only whether they were counted in lives saved or lives lost. Put as saving, 72 per cent took the certain option; put as dying, 22 per cent did. The authors call the two problems effectively identical.": "600人のうち200人が救われることは、400人が死ぬことと同じです。この2つの版のあいだで結果そのものは何も変わっておらず、変わったのは救われる命として数えるか失われる命として数えるかだけです。救われると述べると72パーセントが確実な選択肢を選び、死ぬと述べると22パーセントがそうしました。著者らは、この2つの問題を実質的に同一だと呼んでいます。",
  "So there was no settled public preference to discover. A gain that is described as a gain invites caution, because a sure win feels worth keeping; the identical outcome described as a loss invites a gamble, because a sure loss feels worth escaping. The researchers saw the same reversal in university faculty and in physicians, so this is not a failure of arithmetic by people unused to numbers. It is what the question does to the answer.": "つまり、発見すべき揺るぎない世論の選好など存在しませんでした。利得として述べられた利得は、確実な勝ちを手放したくないという感覚から慎重さを誘い、同一の結果を損失として述べると、確実な負けから逃れたいという感覚から賭けを誘います。研究者たちは大学教員や医師のあいだでも同じ逆転を確認しており、これは数字に不慣れな人々による算数の失敗ではありません。問いが答えに対して行うことなのです。",
  "One decision, two wordings": "1つの決定、2つの言い回し",
  "The framing effect": "フレーミング効果",
  "How a choice is worded changes which option people take, even when the outcomes are identical. A survey, a label or a headline that reports what people prefer is partly reporting how they were asked, so the wording is part of the finding and belongs in the report.": "結果が同一であっても、選択肢がどう言葉にされるかによって、人々が選ぶ選択肢は変わります。人々が何を好むかを報告する調査やラベル、見出しは、その一部として、どうたずねられたかを報告しているにすぎないため、言い回しは調査結果の一部であり、報告に含まれるべきものです。",
  "The practical test is to restate the same fact the other way round and see whether you still feel the same. Ninety per cent survival and ten per cent mortality are one number; a treatment that saves nine in ten and one that kills one in ten are one treatment. If your preference moves, it was following the wording rather than the outcome, and that is worth knowing before you decide.": "実用的な検証法は、同じ事実を逆の言い方で述べ直し、それでも同じように感じるかを確かめることです。90パーセントの生存と10パーセントの死亡はひとつの数字であり、10人中9人を救う治療と10人中1人を死なせる治療はひとつの治療です。あなたの選好が動くなら、それは結果ではなく言い回しに従っていたのであり、決める前に知っておく価値があります。",
  "People do not judge outcomes from a blank slate. They judge them as gains or losses against whatever the question treats as normal, and losses weigh heavier than equivalent gains. Describe the outcome as lives saved and the reference point becomes everybody dying, so 200 saved is a gain worth locking in, and gambling with it feels reckless. Describe the identical outcome as 400 dying and the reference point becomes everybody living, so those deaths are a loss, and a chance of avoiding them entirely feels worth taking. Nothing about the world moved; the question moved the baseline people measured from. This is why the framing is not a presentational detail that a careful reader can ignore. Whoever chooses the wording chooses the baseline, and the baseline does much of the deciding, which is exactly why advertising, campaigning and even consent conversations are fought over adjectives.": "人々は白紙の状態から結果を判断するわけではありません。その問いが標準として扱うものを基準に、利得か損失かとして判断し、損失は同等の利得より重く感じられます。結果を救われる命として述べると、基準点は全員が死ぬことになるため、200人が救われることは手放したくない利得となり、それを賭けに出すのは無謀に感じられます。同一の結果を400人が死ぬこととして述べると、基準点は全員が助かることになるため、その死は損失となり、それを完全に避けられる可能性は賭ける価値があるように感じられます。世界の何かが変わったわけではなく、問いが人々の測る基準を動かしたのです。だからこそフレーミングは、注意深い読み手なら無視できるような、表現上の些末事ではありません。言い回しを選ぶ者が基準を選び、その基準が決定の大部分を左右するのであり、まさにそれゆえに、広告やキャンペーン、さらには同意の会話までもが、形容詞をめぐって争われるのです。",
  "The same trick, thirty years on and in the clinic": "同じ手口が、30年後、臨床の場で",
  "Doctors, patients and students were told about lung cancer treatments described either by survival rates or by the mortality rates that say the identical thing. Surgery looked far more attractive when its outcomes were given as survival. The effect held among the physicians, so training in the numbers was not protection against the wording.": "医師、患者、学生は、肺がんの治療について、生存率で述べたものか、同じことを言う死亡率で述べたもののいずれかを知らされました。手術は、結果が生存率として示されたときのほうがはるかに魅力的に見えました。この効果は医師のあいだでも変わらなかったため、数字についての訓練は言い回しに対する防御にはなりませんでした。",
  "The framing effect, a reasoning trap.": "フレーミング効果、推論の罠です。",
  "Ask people to choose between the same two outcomes twice, once worded as lives saved and once as lives lost, and the majority swaps sides. Nothing about the outcomes changes, only the words. Whoever writes the question is quietly choosing the answer, which is why it is worth restating any claim the other way round before you decide what you think.": "同じ2つの結果のあいだで、一度は救われる命として、一度は失われる命として、2回選ぶよう人々に求めると、大多数の側が入れ替わります。結果は何も変わらず、変わるのは言葉だけです。問いを書く者が、静かに答えを選んでいるのであり、だからこそ、どんな主張も決める前に逆の言い方で述べ直してみる価値があります。",
  "Same choice, other words. Watch the majority swap sides.": "同じ選択、違う言葉。大多数の側が入れ替わるのを見てください。",
  "I had a firm opinion. It was about the wording.": "私には確固たる意見がありました。それは言い回しについてのものでした。",
  "Read from the paper itself. Problem 1, put to 152 people, offered 200 saved for certain against a one in three chance of saving all 600: 72 per cent took the certain option and 28 per cent the gamble. Problem 2, put to 155 people, reworded the identical outcomes as 400 dying against a one in three chance that nobody dies: 22 per cent took the certain option and 78 per cent the gamble. The authors write that the two problems are effectively identical and that the only difference is whether outcomes are given as lives saved or lives lost, and they report having seen the reversal in several groups including university faculty and physicians. One honesty note that shapes the figure. The paper prints percentages and the number asked, never the raw counts, and 72 per cent of 152 is not a whole number, so no integer numerator exists. The shares here are therefore the published ones rather than counts, and the chart says so, because rounding to a plausible count would have invented data the source never reported.": "論文そのものから読み取ります。問題1は152人に出され、確実に200人を救う案と、3分の1の確率で600人全員を救える賭けを提示しました。72パーセントが確実な選択肢を、28パーセントが賭けを選びました。問題2は155人に出され、同一の結果を、400人が死ぬ案と、3分の1の確率で誰も死なない賭けとして言い換えました。22パーセントが確実な選択肢を、78パーセントが賭けを選びました。著者らは、この2つの問題は実質的に同一であり、唯一の違いは結果を救われる命として示すか失われる命として示すかだけだと書いており、大学教員や医師を含む複数の集団で同じ逆転を確認したと報告しています。この図の形を決めている、誠実さに関わる注記が1つあります。論文はパーセントと尋ねられた人数を印刷していますが実数は一度も印刷しておらず、152人の72パーセントは整数にならないため、整数の分子は存在しません。したがってここでの割合は実数ではなく公表された値そのものであり、それらしい実数に丸めることは出典が一度も報告していないデータを作り出すことになるため、グラフにもその旨が示されています。",
  "A surgeon tells patients the operation has a 90 percent survival rate, and most agree to it. A colleague who tells the identical patients it has a 10 percent death rate finds far fewer agree. The hospital concludes the first surgeon is better at reassuring people.": "ある外科医が患者に、この手術の生存率は90パーセントだと伝えると、大多数が同意します。同じ患者たちに死亡率は10パーセントだと伝えた同僚は、同意する人がはるかに少ないことに気づきます。病院は、最初の外科医のほうが人を安心させるのが上手だと結論づけます。",
  "Ninety percent survival and ten percent mortality are the same number said two ways, so nothing about the operation differed. What differed was the wording, and it moved the decision.": "90パーセントの生存と10パーセントの死亡は、同じ数字を2通りに言ったものであり、手術について何も違いはありませんでした。違っていたのは言い回しであり、それが決定を動かしたのです。",
  "A yoghurt sells far better labelled 90 percent fat free than the identical product labelled 10 percent fat. The company reports that shoppers are choosing the healthier option.": "あるヨーグルトは、90パーセント脂肪ゼロと表示されたときのほうが、同一の製品を10パーセント脂肪と表示したときよりはるかによく売れます。会社は、買い物客がより健康的な選択肢を選んでいると報告します。",
  "It is one product with one fat content, described two ways. The shoppers did not choose a healthier yoghurt, they responded to a label written to sound like a gain.": "それは脂肪含有量がひとつだけの、ひとつの製品を2通りに述べたものです。買い物客はより健康的なヨーグルトを選んだのではなく、利得のように聞こえるよう書かれたラベルに反応しただけです。",
  "A policy polls well when described as keeping money in your pocket and badly when the identical policy is described as reducing what is collected for services. The pollster reports the public is broadly in favour.": "ある政策は、あなたの財布にお金を残すと表現されると世論調査での評価が良く、同一の政策がサービスのために徴収される額を減らすと表現されると評価が悪くなります。世論調査員は、世論はおおむね賛成だと報告します。",
  "Two descriptions of the same policy produced two verdicts, so the poll measured the wording as much as the opinion. A finding like this has to report how the question was put.": "同じ政策の2つの説明が2つの評価を生んだのですから、この調査は世論と同じくらい言い回しを測っていたことになります。このような調査結果は、問いがどう出されたかを報告しなければなりません。",
  "A government announces that 94 percent of people are in work. The opposition announces that 6 percent are out of work. A commentator says the two sides cannot agree on the figures.": "政府は、人々の94パーセントが職に就いていると発表します。野党は、6パーセントが失業していると発表します。ある評論家は、両陣営は数字について合意できないと言います。",
  "They agree completely on the figure, which is one number stated from two ends. The disagreement is over which end to say out loud, and that choice does the persuading.": "両者はその数字について完全に合意しており、それは両端のどちらから述べるかというひとつの数字にすぎません。意見が分かれているのはどちらの端を声に出すかであり、その選択が説得を行っているのです。",
  "A leaflet says a vaccine lets 99 in 100 get through the season without the illness. A rival leaflet says 1 in 100 still catch it despite the vaccine. A survey finds people who read the first are much likelier to take it, and concludes the first leaflet is more accurate.": "あるリーフレットは、ワクチンにより100人中99人がその病気にかからずシーズンを乗り切れると述べます。対抗するリーフレットは、ワクチンを受けても100人中1人はなお感染すると述べます。調査によれば、最初のリーフレットを読んだ人のほうがワクチンを受ける可能性がはるかに高く、最初のリーフレットのほうが正確だと結論づけられます。",
  "Both leaflets state the identical result, one as a gain and one as a residual loss. Being more persuasive is not the same as being more accurate, and here neither is wrong.": "どちらのリーフレットも同一の結果を述べており、一方は利得として、もう一方は残る損失として述べているだけです。より説得力があることは、より正確であることと同じではなく、ここではどちらも間違ってはいません。",
  "A shop charges less for cash than for card. Customers barely object when it is called a cash discount and complain loudly when the identical price gap is called a card surcharge. The owner concludes customers dislike card fees.": "ある店は、カードよりも現金のほうが安く済むようにしています。それを現金割引と呼ぶと客はほとんど文句を言わず、同一の価格差をカード上乗せ料金と呼ぶと大きな苦情が出ます。店主は、客はカード手数料を嫌っていると結論づけます。",
  "The two prices are the same either way. Calling the gap a discount makes the lower price the bonus, calling it a surcharge makes the higher price a penalty, and the objection follows the word.": "2つの価格はどちらの言い方でも同じです。差額を割引と呼べば安いほうの価格がお得分になり、上乗せ料金と呼べば高いほうの価格が罰則になり、苦情はその言葉に従います。",
  "One newspaper reports that crime fell by 5 percent. Another reports that 95 percent of last year's crime is still happening. Readers of the second are far gloomier, and an editor concludes the public mood has shifted.": "ある新聞は、犯罪が5パーセント減少したと報じます。別の新聞は、昨年の犯罪の95パーセントが今も起きていると報じます。後者の読者のほうがはるかに暗い気分になり、編集者は世論の空気が変わったと結論づけます。",
  "Both sentences describe the same change. The mood tracked which sentence a reader met, so it is evidence about the two write-ups rather than about the public.": "どちらの文も同じ変化を述べています。気分は読者が出会った文のほうに沿って動いたのであり、これは世間についてではなく、2つの書き方についての証拠です。",
  "An app tells one group of users their battery is at 20 percent and another group that 80 percent is used. The second group plugs in sooner, and the designer reports that users respond better to usage information.": "あるアプリは、一方のユーザー群にはバッテリーが20パーセントだと伝え、もう一方の群には80パーセントを使用済みだと伝えます。後者の群のほうが早く充電し、設計者は利用者は使用量の情報のほうによく反応すると報告します。",
  "The two readouts carry identical information about the battery. The behaviour changed with the wording, which tells you about the framing rather than about what users understand.": "2つの表示は、バッテリーについて同一の情報を伝えています。行動が変わったのは言い回しによってであり、これは利用者の理解ではなくフレーミングについて教えてくれます。",
  "A charity asks one group to give 2 pounds and tells another that 2 pounds is all it takes to stop a child going without. The second group gives far more often, and the charity concludes those donors care more.": "ある慈善団体は、一方の群には2ポンドの寄付を求め、もう一方の群には2ポンドあれば1人の子どもが困窮せずに済むと伝えます。後者の群のほうがはるかに頻繁に寄付をし、慈善団体はその寄付者たちのほうが思いやりがあると結論づけます。",
  "The sum asked for is identical, and the donors were not selected for anything. The difference is entirely in how the ask was worded, so it says nothing about who cares more.": "求められた金額は同一であり、寄付者は何かによって選び分けられていたわけでもありません。違いはひとえに依頼の言い回しにあるのであり、誰がより思いやりがあるかについては何も語っていません。",
  "A school reports that 7 in 10 pupils passed. A local paper reports that 3 in 10 failed. Parents surveyed after reading the paper rate the school much worse, and a governor concludes the paper uncovered a real decline.": "ある学校は、生徒の10人中7人が合格したと報告します。地元紙は、10人中3人が不合格だったと報じます。その記事を読んだあとに調査された保護者は、学校をはるかに悪く評価し、ある理事は新聞が実際の悪化を暴いたと結論づけます。",
  "Nothing was uncovered, because the two reports carry one result. The parents were reacting to whether the number was given as passes or as failures.": "何も暴かれてはいません。2つの報告はひとつの結果を伝えているにすぎないからです。保護者たちは、その数字が合格として示されたか不合格として示されたかに反応していたのです。",
  "A consent leaflet states that the operation has a 90 percent survival rate and, in the same paragraph, that 10 percent of patients die, so that the reader meets the result stated both ways before deciding.": "ある同意説明のリーフレットは、この手術の生存率は90パーセントだと述べ、同じ段落で、患者の10パーセントが死亡するとも述べており、読み手は決める前にその結果を両方の言い方で目にすることになります。",
  "Giving both statements of the identical figure is the standard defence against framing, since the reader cannot be steered by whichever end was chosen for them.": "同一の数字を両方の言い方で示すことは、フレーミングに対する標準的な防御策です。読み手が、自分のために選ばれた側の言い方だけに誘導されずに済むからです。",
  "Two treatments were described to patients in the same words, using the same survival framing for both, and patients still chose one far more often. The report concludes patients prefer that treatment.": "2つの治療は、どちらも同じ生存率という枠組みを用いた同じ言葉で患者に説明されましたが、それでも患者は一方をはるかに多く選びました。報告書は、患者はその治療を好むと結論づけます。",
  "The wording was held constant across the two options, so the difference in choices cannot be an artefact of framing. The preference is about the treatments.": "2つの選択肢のあいだで言い回しは一定に保たれていたため、選択の違いはフレーミングによる見かけ上のものではありえません。この選好は治療そのものについてのものです。",
  "A polling company publishes the exact question wording alongside its result, and notes that an alternative wording tested at the same time produced a different level of support, so readers can see how sensitive the finding is.": "ある世論調査会社は、結果とともに問いの正確な文言を公表し、同時に検証した別の文言では支持の水準が異なったことも書き添えており、読み手はその調査結果がどれほど言い回しに敏感かを見て取れます。",
  "Publishing the wording, and what a different wording produced, treats the framing as part of the finding. That is the honest way to report an opinion measurement.": "言い回しと、別の言い回しが生んだ結果をともに公表することは、フレーミングを調査結果の一部として扱うことです。それが意見の測定を報告する誠実なやり方です。",
  "As it was put to them": "彼らに実際に出された形で",
  "Both wordings": "両方の言い回し",

  // ---- Misleading chart axes ----
  "Only 7 of the 38 people shown this chart read its trend correctly.": "このグラフを見せられた38人のうち、傾向を正しく読み取れたのはわずか7人でした。",
  "Researchers drew a chart of one quantity rising steadily over time, then redrew it with the vertical axis upside down, so that larger values sat lower on the page. The numbers themselves were untouched. They showed the upside-down version to 38 people recruited at random online, asked what the quantity had done over the period, and let them answer that it had improved, that it had declined, or that they could not tell. Seven of the 38 answered correctly.": "研究者たちは、ある量が時間とともに着実に増えていく様子をグラフにし、次に縦軸を上下逆にして描き直しました。大きい値ほどページの下に来るようにしたのです。数値そのものには一切手を加えていません。この逆さ版を、オンラインで無作為に集めた38人に見せ、その期間にこの量がどう変化したかを尋ね、「改善した」「悪化した」「判断できない」のいずれかで答えてもらいました。38人のうち正解したのは7人でした。",
  "What does a score that low tell you about the chart?": "これほど低い正答率は、このグラフについて何を物語っているでしょうか。",
  "Read the trend correctly": "傾向を正しく読み取った",
  "Shown the chart with the axis upside down": "縦軸が上下逆のグラフを見た",
  "Upside down": "上下逆",
  "Shown the same numbers, axis the normal way up": "同じ数値を、軸は通常の向きで見た",
  "Normal": "通常",
  "People shown a chart": "グラフを見せられた人",
  "The upside-down version": "上下逆の版",
  "It was a hard chart, and most people struggled with it": "読み取りにくいグラフで、多くの人が苦戦した",
  "too fiddly to read": "読むのが面倒すぎる",
  "The rise in the data was too slight to call": "データの増加はわずかすぎて判断できなかった",
  "an honest near-tie": "正直な引き分け",
  "It read clearly, and what it said was backwards": "はっきり読めたうえで、その内容が逆だった",
  "legible, and wrong": "読めて、しかも誤り",
  "Drawn the normal way up, the same numbers were read correctly by 39 of 40.": "通常の向きで描くと、同じ数値を40人中39人が正しく読み取りました。",
  "Nothing was wrong with the readers, or with the data": "読み手にも、データにも問題はなかった",
  "Forty other people, recruited the same way and shown the identical numbers with the vertical axis the usual way up, read the trend correctly 39 times out of 40. So the rise was not slight and the readers were not weak. Look too at how the other 38 got it wrong: just one of them said they could not tell, and 30 stated flatly that the quantity had declined:": "同じ方法で集められた別の40人に、まったく同じ数値を縦軸が通常の向きのグラフで見せたところ、40人中39人が傾向を正しく読み取りました。つまり増加はわずかではなく、読み手も不出来ではなかったのです。もう一方の38人の誤り方にも注目してください。「判断できない」と答えたのはたった1人で、30人はこの量が減少したときっぱり答えました。",
  "Both versions of the same numbers": "同じ数値の二つの版",
  "That is the tell, and it is worth keeping. A chart that is merely hard makes people hesitate. They hedge, they split, they say they are not sure, and enough of them land on the right answer by accident that the score stays near what guessing would give. Scoring well below guessing is a different thing altogether, and it happens when a chart is perfectly legible and pointing the wrong way. Difficulty scatters answers. Steering lines them up.": "これこそが手がかりであり、覚えておく価値があります。単に読みにくいだけのグラフは、人を迷わせます。人は言葉を濁し、答えが割れ、確信がないと言い、それでもまぐれで正解する人が十分に出るので、正答率はあてずっぽうと同じくらいに落ち着きます。あてずっぽうを大きく下回るのはまったく別の話で、それはグラフが完全に読み取り可能でありながら、誤った方向を指しているときに起こります。難しさは答えをばらけさせます。誘導は答えを一方向にそろえます。",
  "What the other 40 saw": "もう一方の40人が見たもの",
  "Misleading chart axes": "誤解を招くグラフの軸",
  "An axis is a claim, not a container. Change how it runs and you do not make the chart harder to read, you change what a careful reader confidently concludes from it. Read the axis before you read the shape.": "軸は単なる入れ物ではなく、一つの主張です。向きを変えれば、グラフが読みにくくなるのではありません。注意深い読み手がそこから自信をもって導く結論そのものが変わるのです。形を読む前に、軸を読んでください。",
  "Note what this does and does not establish. It is one chart, one distortion and 78 paid online workers, not a representative public, and the chart was built for the experiment rather than lifted from a newspaper. What it does settle is the part people find hardest to believe: the effect is enormous, and it does not depend on the reader being careless or innumerate. The same readers, given the same numbers drawn honestly, were right almost every time.": "これが示していることと、示していないことを区別しておきましょう。対象は一つのグラフ、一つの歪め方、そして報酬を受け取った78人のオンライン作業者であり、代表性のある一般市民ではありません。グラフも新聞から取ってきたものではなく、実験のために作られたものです。それでもはっきりしたのは、いちばん信じがたい部分です。効果は極めて大きく、しかも読み手が不注意だからでも数字に弱いからでもない、ということです。同じ読み手が、同じ数値を誠実に描いたグラフで見れば、ほぼ毎回正解したのですから。",
  "Up means more. That mapping is fixed long before anyone reads a label, and it is doing the work of understanding a chart at a speed conscious checking cannot match: you take in the shape of a line in a single glance and the axis text a beat later, if at all. Invert the axis and the two disagree, and the glance wins. This is why the failure is so lopsided. It is not that people find the chart confusing and give up; it is that they read it fluently and arrive somewhere false, with no sense that anything needed checking. That is also why the effect survives expertise. Knowing about the trick does not stop the glance from happening, it only gives you a reason to go back and check afterwards. Axis distortions come in more than one flavour and they fail differently, which is worth keeping straight. Inverting an axis reverses the message: the reader concludes the opposite of the truth. Cutting the bottom off an axis, so bars start at some value well above zero instead of at zero, does not reverse anything, it exaggerates: a small real difference fills most of the frame and reads as a large one. The same study measured that second effect separately and found it substantial but milder, which fits, because an exaggerated gap is still a gap in the right direction. Stretching or squashing the shape of a line chart does the same kind of thing to a rate of change, making a gentle climb look like a spike or a spike look gentle. The defence is a habit rather than a skill, and it takes about two seconds. Before you look at the shape, look at the axis: find which way it runs, find where it starts, and check whether the starting point is zero. If the chart has no axis labels at all, that is the finding. And be most careful with the charts that confirm what you already think, because those are the ones you will read at a glance and never go back to.": "上は多いを意味します。この対応づけは誰かがラベルを読むよりずっと前に固まっていて、意識的な確認では追いつかない速さでグラフの理解を進めます。線の形は一目で入ってきますが、軸の文字はその一拍あと、読まれるとしても、です。軸を逆にすると両者は食い違い、そして一目のほうが勝ちます。失敗がこれほど一方に偏るのはそのためです。人がグラフを分かりにくいと感じてあきらめるのではありません。すらすら読んだうえで誤ったところにたどり着き、しかも確認が必要だという感覚をまったく持たないのです。この効果が専門知識をもってしても消えないのも同じ理由です。仕掛けを知っていても一目の読み取りは止まりません。あとから戻って確かめる理由ができるだけです。軸の歪め方には何種類かあり、失敗の仕方も違うので、区別しておく価値があります。軸を反転させると、メッセージが逆転します。読み手は真実の反対を結論づけます。軸の下側を切り落とし、棒がゼロではなくかなり上の値から始まるようにした場合は、何も逆転しません。誇張されるのです。小さな実際の差が枠のほとんどを埋め、大きな差として読まれます。同じ研究はこの二つ目の効果を別に測定し、無視できないが反転よりは穏やかだと報告しました。誇張された差も向き自体は正しいのですから、それは筋が通ります。折れ線グラフの形を縦や横に引き伸ばしたり押しつぶしたりすると、変化の速さに同じことが起きます。ゆるやかな上昇が急騰に見え、急騰がゆるやかに見えるのです。防ぎ方は技能というより習慣で、二秒ほどで済みます。形を見る前に軸を見てください。どちら向きに走っているか、どこから始まっているか、その始点はゼロかを確かめるのです。軸のラベルがまったくない場合は、それ自体が結論です。そして、自分がすでに思っていることを裏づけてくれるグラフにこそ、いちばん用心してください。そういうグラフこそ一目で読んで二度と見返さないものだからです。",
  "The gentler trick in the same experiment": "同じ実験の、より穏やかな仕掛け",
  "The same researchers tested cutting the bottom off an axis rather than flipping it. Readers saw a bar chart comparing two places, either with the axis starting at zero or with it starting high enough that a small real difference filled the frame, and rated how much bigger one was than the other on a scale of 1 to 5. The group given the truncated axis averaged 2.77; the group given the honest one averaged 1.45. The gap held up statistically, but notice how it differs from the inverted axis: nobody was led to the opposite conclusion, only to a wildly inflated sense of how big the difference was. Reversal and exaggeration are two distinct failures, and the second is far more common in the wild because it can happen entirely by accident.": "同じ研究者たちは、軸を反転させるのではなく下側を切り落とす手法も試しました。読み手は二つの場所を比べる棒グラフを見せられます。軸がゼロから始まる版か、小さな実際の差が枠いっぱいに広がるほど高い値から始まる版のどちらかです。そして一方が他方よりどれだけ大きいかを1から5で評価しました。軸を切り詰めた版を見た群の平均は2.77、誠実な版を見た群は1.45でした。この差は統計的にも保たれますが、反転した軸との違いに注目してください。誰も反対の結論に導かれてはおらず、差の大きさをとんでもなく過大に受け取っただけなのです。反転と誇張は別々の失敗であり、実際の世界では後者のほうがはるかに多く見られます。まったくの偶然で起きうるからです。",
  "Misleading chart axes, a reasoning trap.": "誤解を招くグラフの軸、という思考の罠。",
  "You do not really read a chart, you glance at it. Up means more, and that lands before the axis labels do. So when researchers took a chart of something steadily improving and simply turned the vertical axis upside down, the people who saw it did not get confused and did not give up: 30 of 38 confidently reported the opposite of what the numbers said, and exactly one admitted to being unsure. Shown the same numbers drawn the normal way up, 39 of 40 got it right. Nothing about the data changed, and nothing about the readers changed. Before you read the shape of a chart, spend two seconds on the axis: which way does it run, and where does it start?": "人はグラフを読んでいるのではなく、ちらりと見ているだけです。上は多いという感覚が、軸のラベルより先に届きます。だから研究者が、着実に改善している何かのグラフの縦軸をただ上下逆にしただけで、それを見た人たちは混乱もせず、あきらめもしませんでした。38人中30人が、数値が語る内容とは正反対のことを自信をもって報告し、自信がないと認めたのはちょうど1人でした。同じ数値を通常の向きで描いたグラフでは、40人中39人が正解しました。データは何も変わらず、読み手も何も変わっていません。グラフの形を読む前に、軸に二秒かけてください。どちら向きに走っていて、どこから始まっているでしょうか。",
  "A between-subjects experiment run on Amazon Mechanical Turk with workers who reported a United States location and had a prior task approval rate of 99 percent or better. Eighty people were recruited for this arm and 78 passed the attention check, leaving groups of 40 and 38. The chart plotted access to safe drinking water over time in invented places, so the stimulus carries no real country, party or contested science; the true trend was an improvement, and the inverted axis gave the impression of a decline. The difference was tested with the Freeman-Halton extension of Fisher's exact test, which is the version for a table with more than two response categories, at p < 0.0001. Two slips in the paper are worth flagging, because both trip a quick reader. Table 3 prints the single uncertain response in the inverted-axis group as 0.02 percent, where 1 of 38 is 2.63 percent, which is also what makes that row sum to 100. And the discussion section restates the result with the two conditions swapped and the correct percentages labelled as incorrect. The table and the results text agree with each other, and this puzzle follows them.": "Amazon Mechanical Turk で行われた被験者間実験で、参加者は米国在住と申告し、過去の作業承認率が99パーセント以上の作業者でした。この部分には80人が集められ、78人が注意チェックを通過して、40人と38人の二群になりました。グラフは架空の地名における安全な飲み水へのアクセスの推移を示したもので、実在の国も政党も、論争のある科学も含みません。実際の傾向は改善であり、反転した軸がそれを悪化のように見せていました。差の検定にはフィッシャーの正確確率検定のフリーマン・ハルトン拡張、すなわち回答区分が三つ以上ある表に対応した版が用いられ、p < 0.0001 でした。論文には注意すべき誤りが二つあり、どちらも急いで読む人をつまずかせます。表3は、反転群でただ1人が選んだ「判断できない」を0.02パーセントと印字していますが、38分の1は2.63パーセントであり、そうしてはじめてその行が100になります。また考察の節では、二つの条件を取り違えたうえ、正答率を誤答率として述べ直しています。表と結果本文は互いに一致しており、このパズルはそちらに従っています。",
  "A safety report charts workplace injuries by year, with the vertical axis running from 0 at the top down to 500 at the bottom. The plotted line climbs steadily up the page across five years. A local paper reports that injuries have risen sharply.": "ある安全報告書が労働災害の件数を年ごとにグラフにしており、縦軸は上端が0、下端が500になっています。描かれた線は5年間にわたってページの上へと着実に伸びています。地元紙は、労働災害が急増したと報じました。",
  "With zero at the top, a line climbing the page is a count falling towards zero. The paper read the shape of the line and not the direction of the axis, and printed the opposite of what the chart shows.": "ゼロが上端にあるので、ページの上へ伸びる線は件数がゼロへ向かって減っていることを表します。この新聞は線の形だけを読み、軸の向きを読まなかったため、グラフが示す内容の正反対を印刷したのです。",
  "Two schools' average exam marks are drawn as bars on a vertical axis running from 68 to 72. One bar is more than twice the height of the other, and a campaign leaflet says the first school performs twice as well.": "二つの学校の試験の平均点が、68から72までの縦軸に棒グラフとして描かれています。一方の棒は他方の2倍以上の高さがあり、ある運動団体のちらしは、最初の学校は2倍の成績を上げていると述べています。",
  "The two averages differ by about two marks out of a hundred. Starting the axis at 68 cuts away everything the schools have in common, so the remaining sliver fills the frame. Bar heights are only ratios when the axis starts at zero.": "二つの平均点の差は100点満点で約2点です。軸を68から始めることで、二校に共通する部分がすべて切り落とされ、残ったわずかな差が枠いっぱいに広がります。棒の高さが比を表すのは、軸がゼロから始まっているときだけです。",
  "A company plots monthly revenue on a chart four times taller than it is wide. The line looks close to vertical and the annual report describes explosive growth. Drawn on a square chart, the identical figures rise gently.": "ある企業が月次の売上を、幅の4倍の高さのグラフに描いています。線はほぼ垂直に見え、年次報告書は爆発的な成長と表現しています。同じ数値を正方形のグラフに描くと、ゆるやかに上がるだけです。",
  "The same numbers cannot be both explosive and gentle. Steepness is a property of the frame a line is drawn in as much as of the data, so a rate of change read off the slope alone is not a measurement.": "同じ数値が爆発的であると同時にゆるやかであることはありえません。傾きはデータと同じくらい、線を描く枠の形にも左右されます。したがって傾きだけから読み取った変化の速さは、測定ではありません。",
  "An infographic shows two bars, one clearly taller than the other, above a caption stating that the difference is dramatic. The vertical axis carries no numbers and no label.": "あるインフォグラフィックが、明らかに高さの違う二本の棒を示し、その下に差は劇的だと記しています。縦軸には数値もラベルもありません。",
  "With no scale the bars say nothing about size: the gap could be one percent or a hundredfold. An unlabelled axis turns an assertion into something drawn to look like evidence.": "目盛りがなければ、棒は大きさについて何も語りません。差は1パーセントかもしれず、100倍かもしれないのです。ラベルのない軸は、主張を証拠らしく見えるものに変えてしまいます。",
  "A chart plots ice cream sales against a left-hand axis and library visits against a right-hand one, each scaled so the two lines sit almost on top of each other. The commentary says the two track each other almost perfectly.": "あるグラフが、アイスクリームの売上を左の軸に、図書館の来館者数を右の軸にとり、二本の線がほぼ重なるようにそれぞれ目盛りを調整しています。解説は、両者はほぼ完全に連動していると述べています。",
  "Two independent axes can be scaled to make almost any pair of series overlap, and rescaling either one pulls the lines apart again. How closely they sit is a choice made by whoever drew the chart, not a finding.": "二本の独立した軸は、ほとんどどんな二つの系列でも重なるように目盛りを調整できますし、どちらかを取り直せば線はまた離れます。二本がどれだけ近く見えるかは、グラフを描いた人の選択であって、発見ではありません。",
  "A chart of cases over time uses a vertical axis where each gridline is ten times the one below it. The curve rises as a straight line, and a summary describes growth as steady.": "時間ごとの症例数のグラフが、目盛り線が一つ上がるごとに10倍になる縦軸を使っています。曲線はまっすぐな直線として上昇しており、要約は成長が一定だと述べています。",
  "On a scale where each step multiplies by ten, a straight line means the count is multiplying at a constant rate, so it is doubling again and again. That is the fastest kind of growth there is, and the summary read the shape as if the axis were an ordinary one.": "一目盛りごとに10倍になる尺度では、直線は件数が一定の率で倍々に増えていることを意味します。つまり何度も倍増しているのです。それはこの世でもっとも速い増え方であり、要約は軸をふつうの軸と思って形を読んでしまったのです。",
  "A regulator draws two regions' contamination readings as bars on an axis running from 0 to 10,000, although both regions sit between 40 and 90. The bars are indistinguishable, and the report concludes there is no meaningful difference between them.": "ある規制当局が、二つの地域の汚染測定値を0から10,000までの軸に棒グラフとして描いています。実際には両地域とも40から90の範囲にあります。棒は見分けがつかず、報告書は両地域に意味のある差はないと結論づけています。",
  "One region reads about twice the other, and the chart has flattened that into invisibility by running the axis far past anything in the data. An axis can bury a real difference as easily as it can manufacture a fake one.": "一方の地域はもう一方の約2倍を示しているのに、グラフはデータに存在するどの値よりもはるかに遠くまで軸を伸ばすことで、その差を見えなくしてしまいました。軸は、偽の差を作り出すのと同じくらい簡単に、本物の差を葬ることができます。",
  "A customer satisfaction tracker is charted on a vertical axis running from 44 to 48 percent. The line zigzags violently from the top of the frame to the bottom and back, and a commentary describes wild swings in how customers feel.": "顧客満足度の推移が、44から48パーセントまでの縦軸に描かれています。線は枠の上端から下端へ、また上へと激しくジグザグしており、解説は顧客の受け止め方が大きく揺れていると述べています。",
  "The whole chart is four points tall, so a movement of a point or so, which is inside the noise of most surveys, crosses the entire frame. The violence is in the axis rather than in the customers.": "グラフ全体の高さがわずか4ポイントなので、ほとんどの調査の誤差の範囲内である1ポイント程度の動きでも、枠全体を横切ってしまいます。激しさは軸にあるのであって、顧客にあるのではありません。",
  "A hospital dashboard shows average waiting times with the vertical axis running from 120 minutes at the top down to 0 at the bottom. The bars for the newest quarter are the tallest on the chart, and the newsletter reports the longest waits on record.": "ある病院のダッシュボードが平均待ち時間を示しており、縦軸は上端が120分、下端が0分です。直近の四半期の棒はグラフの中でもっとも高く、院内報はこれまでで最長の待ち時間だと報じています。",
  "The axis is upside down, so the tallest bar is the shortest wait. The newsletter took height to mean magnitude, which is exactly the reflex this layout defeats.": "軸が上下逆なので、もっとも高い棒はもっとも短い待ち時間を表します。院内報は高さを大きさと受け取ったのであり、それこそがこのレイアウトが突いてくる反射なのです。",
  "A chart of quarterly sales has a zigzag break drawn low on the vertical axis, marking a stretch of the scale that has been left out. A slide deck reproduces the chart with the break cropped off the bottom and presents the remaining bars as showing sales tripling.": "四半期売上のグラフの縦軸の下部に、目盛りの一部を省いたことを示すジグザグの断裂記号が描かれています。あるスライド資料は、この断裂記号を下端ごと切り取ったうえでグラフを転載し、残った棒を売上が3倍になった証拠として提示しています。",
  "The break was the chart's own warning that its heights are not proportional to its numbers. Cropping it away leaves bars that look like a ratio and are not one.": "その断裂記号は、棒の高さが数値に比例していないというグラフ自身の警告でした。それを切り取ってしまうと、比のように見えて比ではない棒だけが残ります。",
  "A league table is charted with position 1 at the top of the vertical axis and position 20 at the bottom, the axis labelled Position, so a line climbing the page is a team climbing the table.": "あるリーグ順位表が、縦軸の上端を1位、下端を20位としてグラフ化されており、軸には「順位」とラベルが付いています。したがって、ページの上へ伸びる線は順位を上げているチームを表します。",
  "The axis runs downwards because that is what the quantity means: first place is the top. The direction is labelled and agrees with the reader's intuition rather than fighting it, so nothing is being reversed.": "軸が下向きに進むのは、この量の意味がそうだからです。1位が最上位なのです。向きはラベルで示されており、読み手の直感に逆らうのではなく、それに沿っています。ですから何も反転させてはいません。",
  "A chart of body temperature through a day starts its vertical axis at 36 degrees rather than zero, prints the range on the axis, and the text reports the change in degrees rather than describing how tall the line got.": "一日の体温のグラフが、縦軸をゼロではなく36度から始め、その範囲を軸に明記し、本文は線がどれだけ高くなったかではなく変化を度数で報告しています。",
  "A zero baseline would be meaningless for a quantity that never goes near zero, and the claim is made in units rather than read off the height. The axis is doing its job and saying what it did.": "ゼロに近づくことのない量に対してゼロを基準にしても意味がありませんし、主張は高さから読み取るのではなく単位で述べられています。この軸は役目を果たし、しかも自分が何をしたかを明示しています。",
  "An epidemic curve is drawn on a scale where each gridline is ten times the last, the axis says so in its label, and the accompanying text states that cases are doubling every nine days.": "流行曲線が、目盛り線一つごとに10倍になる尺度で描かれ、軸のラベルにその旨が記されており、添えられた本文は症例が9日ごとに倍増していると述べています。",
  "The scale is declared and the finding is given as a doubling time, a number the reader can check, rather than inferred from how steep the line looks. That is the right way to use a multiplying axis.": "尺度は明示されており、結果は線の傾きの見た目から推し量るのではなく、読み手が確かめられる数値である倍加時間として示されています。それが倍々の軸の正しい使い方です。",
  "A report prints the same figures twice, once on an axis starting at zero and once zoomed in on the range the data actually occupies, and says which question each version is there to answer.": "ある報告書が同じ数値を二度示しています。一度はゼロから始まる軸で、もう一度はデータが実際に占める範囲に拡大した軸で、そしてそれぞれの版がどの問いに答えるためのものかを明記しています。",
  "Both framings are true and they answer different questions, one about the size of the difference and one about its shape. Showing both means the reader is not depending on someone else's choice of scale.": "二つの見せ方はどちらも正しく、答える問いが違います。一方は差の大きさについて、もう一方はその形についてです。両方を示すことで、読み手は誰か他人の目盛りの選び方に頼らずに済みます。",

  // ---- Mean versus median ----
  "Survival is counted from the day you are diagnosed. So a test that finds a disease earlier automatically makes survival look longer, even if it changes nothing about when the disease kills you. You simply spend more of your life as a patient. That is why a screening programme can raise five-year survival dramatically while exactly the same number of people die. None of which means screening is useless: some programmes genuinely do cut deaths, and this is exactly how you tell which ones. Count deaths in everyone invited, not survival among the diagnosed.": "生存期間は診断された日から数え始めます。ですから病気をより早く見つける検査は、その病気がいつ命を奪うかを何ひとつ変えなくても、生存期間を自動的に長く見せます。単に人生のうち患者として過ごす時間が長くなるだけです。だからこそ検診プログラムは、亡くなる人数がまったく同じままでも、5年生存率を劇的に押し上げることができます。とはいえ、これは検診が無意味だという意味ではまったくありません。実際に死亡を減らすプログラムは存在しますし、どれがそうなのかを見分ける方法こそがこれなのです。診断された人の生存期間ではなく、検診に招待された人全員の死亡数を数えてください。",
  "A journal's impact factor is just the average citations its papers got. Science scored 34.7.": "学術誌のインパクトファクターとは、その掲載論文が得た引用数の平均にすぎません。Science は34.7でした。",
  "The impact factor is an arithmetic mean and nothing more: take every paper a journal published in two years, count the citations each one picked up the following year, and average them. For Science that came to 34.7. Two things are worth holding on to before you answer. A paper cannot be cited fewer than zero times, so there is a floor. And the citations run over two to three orders of magnitude, so a handful of papers are cited hundreds or thousands of times while most are cited a few.": "インパクトファクターは算術平均以外の何ものでもありません。ある雑誌が2年間に載せた論文をすべて取り、それぞれが翌年に得た引用数を数え、平均する。それだけです。Science ではそれが34.7になりました。答える前に頭に留めておきたいことが二つあります。論文の被引用数がゼロを下回ることはありえないので、下限があります。そして引用数は2桁から3桁にわたって広がっており、ひと握りの論文が数百回から数千回引用される一方で、大半は数回しか引用されません。",
  "What share of Science papers actually reached that average of 34.7?": "Science の論文のうち、実際にこの34.7という平均に届いたのはどれくらいの割合でしょうか。",
  "Citations per paper against the journal's own average": "論文あたりの引用数と、その雑誌自身の平均",
  "papers published in 2013 and 2014": "2013年と2014年に発表された論文",
  "The average is citations received during 2015 by papers published in 2013 and 2014.": "平均とは、2013年と2014年に発表された論文が2015年中に受けた引用数のことです。",
  "Average citations per paper, as published": "公表された、論文あたりの平均引用数",
  "below their own journal's average": "自分の雑誌の平均を下回った",
  "reached it": "平均に届いた",
  "These are the percentages the source printed, not counts. The share reaching the average is derived from the share below it, so the two always account for every paper.": "これらは出典が印字した百分率であり、実数ではありません。平均に届いた側の割合は下回った側の割合から導いているので、二つは常に全論文を過不足なく説明します。",
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
  "The number everyone quotes": "誰もが引き合いに出す数字",
  "More than half of them": "半分より多い",
  "it is a strong journal": "有力誌なのだから",
  "About half, which is what an average means": "およそ半分、平均とはそういうものだから",
  "half above, half below": "半分が上、半分が下",
  "Well under half": "半分をかなり下回る",
  "the floor and the tail": "下限と長い裾",
  "About a quarter. Three papers in four never reached their own journal's average.": "およそ4分の1です。4本に3本は、自分の雑誌の平均に一度も届いていませんでした。",
  "A long tail drags the average above almost everything it summarises": "長い裾が、平均を、それが要約するはずのほとんどすべてより上へ引き上げる",
  "75.5 per cent of the papers Science published in those two years were cited fewer than 34.7 times, so under a quarter reached the number the journal is ranked by. And this is not a quirk of one journal: across all eleven examined, between 65.3 and 75.5 per cent of papers fell below their own average. The bars below are the same published figures, with each journal's average now shown in its place:": "この2年間に Science が載せた論文の75.5パーセントは引用が34.7回未満でした。つまりこの雑誌が格付けされる数字に届いたのは4分の1にも満たなかったのです。しかもこれは一誌だけの特異な現象ではありません。調べた11誌すべてで、論文の65.3から75.5パーセントが自分の雑誌の平均を下回っていました。下の帯は同じ公表数値を、各誌の平均が実際にどこに位置するかとともに示したものです。",
  "All eleven journals": "11誌すべて",
  "Notice what follows for free. Since more than half the papers sit below the average, the median paper does too, whatever its exact value happens to be. That is the general shape of the problem: when a quantity has a floor it cannot go under and no ceiling to stop it, a few enormous values haul the mean upward while the median stays down among the ordinary cases. The mean is still a perfectly correct number. It is just not a typical one, and quoting it as though it described a normal paper, salary or waiting time describes almost nobody.": "ここからただで導けることに注目してください。論文の半分を超える数が平均を下回っているのですから、中央値の論文もまた平均を下回ります。その正確な値が何であろうと関係ありません。これが問題の一般的な形です。ある量に、それより下へは行けない下限があり、止める上限がないとき、いくつかの巨大な値が平均を引き上げる一方、中央値はありふれた事例のあいだに留まります。平均は依然として完全に正しい数字です。ただ典型的な数字ではないというだけで、それがふつうの論文や給与や待ち時間を表しているかのように引用しても、ほとんど誰のことも表していないのです。",
  "Where the average actually sits": "その平均が実際に位置する場所",
  "Mean versus median": "平均と中央値",
  "An average is a number, not a typical case. Whenever a quantity has a floor and a long tail, the average is dragged above most of what it summarises, and the median is the honest summary to ask for.": "平均とは一つの数字であって、典型的な事例ではありません。ある量に下限と長い裾があるときはいつでも、平均はそれが要約するものの大半より上へ引き上げられます。求めるべき誠実な要約は中央値のほうです。",
  "Be careful what this does and does not say. It does not say the impact factor is miscalculated: 34.7 really is the mean, and the arithmetic is not in dispute. It says the mean answers a different question from the one people use it for. Ranking journals by it is one thing; inferring anything about a particular paper from it is another, and the overlap between journals is so large that a paper in a journal with a mean of 5 is routinely cited more than a paper in one with a mean of 35.": "これが何を言っていて何を言っていないかに注意してください。インパクトファクターの計算が間違っているとは言っていません。34.7はまさしく平均であり、算術に異論はありません。言っているのは、平均は人々がそれを使う目的とは別の問いに答えている、ということです。雑誌を並べるのに使うのは一つのこと、個々の論文について何かを推し量るのは別のことです。しかも雑誌どうしの重なりは非常に大きく、平均5の雑誌に載った論文が平均35の雑誌に載った論文より多く引用されることは日常茶飯事です。",
  "The mean and the median answer different questions, and on a symmetric distribution they happen to give the same answer, which is why the difference is so easy to forget. The mean is the balancing point: every value pulls on it in proportion to how far away it is, so a single value a thousand times bigger than the rest moves it a long way. The median is the middle person in the queue, and it does not care how rich the richest is, only how many people there are. So the gap between them is a direct measure of how lopsided the data is. Any quantity that cannot go below zero and has no upper bound tends to come out lopsided in the same direction: incomes, wealth, house prices, citations, hospital length of stay, time spent waiting on hold, downloads, deaths per outbreak, followers per account. In every one of those, the mean sits above the median, and the more extreme the tail the wider the gap. Which one gets quoted is therefore a choice, and it is not always an innocent one. If you want a figure to sound generous, use the mean of something with a long tail. If you want the same data to sound modest, use the median. Neither is a lie. The practical habit is short. When you meet an average of anything that could have a long tail, ask three things: what is the median, how big is the biggest value, and how many of the cases actually sit near the average? If nobody can tell you the median, that is itself informative. And if you are the one reporting the number, give both, because the pair takes one extra clause and removes the whole ambiguity.": "平均と中央値は別々の問いに答えており、左右対称な分布では同じ答えになります。だからこそ違いがこれほど忘れられやすいのです。平均は釣り合いの点です。どの値も、遠く離れているほど強く平均を引っぱるので、他より千倍大きい値が一つあるだけで平均は大きく動きます。中央値は行列のまん中の人であり、いちばんの金持ちがどれほど裕福かには関心がなく、人が何人いるかだけを見ます。ですから両者の差は、データの偏りをそのまま測る物差しになります。ゼロを下回れず上限もない量は、どれも同じ向きに偏りがちです。所得、資産、住宅価格、引用数、入院日数、電話口で待たされる時間、ダウンロード数、流行ごとの死者数、アカウントごとのフォロワー数。そのすべてで平均は中央値より上に来ますし、裾が極端であるほど差は開きます。したがってどちらを引用するかは選択であり、いつも無邪気な選択とはかぎりません。数字を気前よく響かせたければ、裾の長い量の平均を使えばよい。同じデータを控えめに響かせたければ中央値を使えばよい。どちらも嘘ではありません。実践的な習慣は短いものです。裾が長そうなものの平均に出会ったら、三つ尋ねてください。中央値はいくつか、いちばん大きな値はどれくらいか、そして実際に平均の近くにある事例はどれだけあるのか。誰も中央値を答えられないなら、それ自体が情報です。そして自分が数字を報告する側なら両方を出してください。二つ並べるのに要するのは一節だけで、曖昧さはまるごと消えます。",
  "The same finding, peer reviewed, twenty years earlier": "同じ知見が、20年前に、査読を経て",
  "This is not a new or contested observation. Two decades before the citation-distribution work, a study in the BMJ argued that journal impact factors should not be used to evaluate research, on exactly this ground: citations within a journal are so unevenly spread that the journal's average says very little about any particular paper in it. It reported that roughly the most cited 15 per cent of articles collect half of all a journal's citations, and that the articles actually earning a high impact factor are a small minority. The later work, using a much larger and more recent dataset, put a precise share on it for eleven named journals and found the same picture.": "これは新しい主張でも、論争のある主張でもありません。引用分布の研究より20年前に、BMJ に載った研究がまさにこの理由でインパクトファクターを研究評価に使うべきでないと論じています。一つの雑誌の中でも引用はきわめて不均等に散らばっているので、雑誌の平均は個々の論文についてほとんど何も語らない、というのです。その研究は、最も引用された上位およそ15パーセントの論文が雑誌の全引用の半分を集めており、高いインパクトファクターを実際に生み出している論文はごく少数派だと報告しました。のちの研究ははるかに大規模で新しいデータを用い、名指しした11誌についてその割合を正確な数字で示し、同じ姿を見いだしました。",
  "Mean versus median, a reasoning trap.": "平均と中央値、という思考の罠。",
  "An average sounds like it describes a typical case. Often it describes almost nobody. Scientific journals are ranked by their impact factor, which is simply the average number of citations their papers get. When someone actually checked, three quarters of the papers in Science and in Nature had fewer citations than their own journal's average, and the same held for all eleven journals examined. Nothing was miscalculated. It is just what an average does to any quantity that has a floor and a long tail, which includes incomes, house prices and waiting times. Ask for the median.": "平均は、いかにも典型的な事例を表しているように聞こえます。しかし実際にはほとんど誰のことも表していないことがよくあります。学術誌はインパクトファクターで格付けされますが、それは掲載論文が受ける引用数の平均にすぎません。誰かが実際に確かめてみると、Science と Nature の論文の4分の3は、自分の雑誌の平均より引用が少なかったのです。調べた11誌すべてで同じでした。計算が間違っていたわけではありません。下限と長い裾を持つ量に対して平均がすることが、ただそれだけのことなのです。所得も住宅価格も待ち時間もそこに含まれます。中央値を尋ねましょう。",
  "Stated plainly because it matters: this source is a preprint and was not peer reviewed. It is used anyway, for three reasons given here so the reader can weigh them. Its authors are the editors of Nature, Science, PLOS, EMBO, eLife and the Royal Society, working from Thomson Reuters citation data, and it is published under CC BY. Its own prose independently restates the table, saying that typically 65 to 75 per cent of articles have fewer citations than the impact factor indicates, so the figures have a second reading inside the same document. And the underlying finding is older and peer reviewed, which is what the deep-dive example is for. Two limits on the numbers themselves. They cover citable items only, meaning research and review articles as classified by Thomson Reuters, because journals publish very different amounts of editorial and news material. And the counts come from a window matched to the impact factor, citations received during 2015 by papers published in 2013 and 2014, so they will not match a journal's published impact factor to the decimal. The paper prints no medians, so this puzzle states none; that the median lies below the mean is a deduction from more than half the papers doing so, not a figure taken from the source.": "重要なのではっきり書いておきます。この出典はプレプリントであり、査読を受けていません。それでも用いているのには三つの理由があり、読み手が判断できるようここに挙げます。著者は Nature、Science、PLOS、EMBO、eLife、そして Royal Society の編集責任者たちで、Thomson Reuters の引用データに基づいており、CC BY で公開されています。またその本文が表とは独立に同じ内容を述べており、典型的には論文の65から75パーセントがインパクトファクターの示すより引用が少ないと記しています。つまり数字は同じ文書の中に二度目の読みを持っています。さらに根底にある知見はより古く、査読を経ています。それが深掘りの例の役割です。数字そのものには二つの限界があります。対象は citable items のみ、すなわち Thomson Reuters の分類でいう研究論文と総説にかぎられます。雑誌によって社説やニュース記事の量が大きく違うためです。また集計はインパクトファクターに合わせた期間、つまり2013年と2014年に発表された論文が2015年中に受けた引用によるので、各誌が公表するインパクトファクターと小数点以下まで一致するわけではありません。この論文は中央値をいっさい印字していないので、このパズルも中央値を示しません。中央値が平均を下回るというのは、半分を超える論文がそうであることからの導出であって、出典から取った数字ではありません。",
  "A startup with 30 staff advertises an average salary of 95,000. The founder and two executives take home over a million between them. A candidate is told they can expect to earn about the average.": "従業員30人の新興企業が平均給与95,000と掲げています。創業者と役員2人で100万を超える額を得ています。ある応募者は、だいたい平均くらいは稼げると説明されました。",
  "Three very large salaries pull the average far above what the other 27 people earn. The candidate should ask what the middle employee is paid, because that is the figure their own offer will sit near.": "非常に高い3人分の給与が、残る27人の稼ぎよりはるかに上へ平均を引っぱっています。応募者が尋ねるべきはまん中の従業員の給与です。自分への提示額が近づくのはそちらの数字だからです。",
  "A clinic reports a mean waiting time of 40 minutes. Most patients are seen within 15 minutes, but a handful wait several hours when an emergency comes in. A manager tells patients to expect a 40 minute wait.": "ある診療所が平均待ち時間40分と公表しています。大半の患者は15分以内に呼ばれますが、救急が入ると数時間待つ人が少数出ます。責任者は患者に40分の待ち時間を見込むよう伝えています。",
  "Waiting time has a floor of zero and no ceiling, so the rare multi-hour waits drag the mean well above the typical experience. The median wait describes what a patient should actually expect.": "待ち時間はゼロという下限があり上限はないので、まれな数時間待ちが平均をふだんの体感よりはるかに上へ引き上げます。患者が実際に見込むべき時間を表すのは中央値のほうです。",
  "A district reports that the average house sold last year went for 780,000. Reporting notes that a small number of large estates changed hands. A council paper uses the 780,000 figure to argue ordinary families can afford to buy there.": "ある地区で、昨年売れた住宅は平均780,000だったと報じられました。報道は大きな屋敷が数件取引されたことにも触れています。自治体の文書はこの780,000という数字を使い、ふつうの家庭でもそこで家を買えると論じています。",
  "A few very expensive sales lift the mean without changing what an ordinary house costs. Housing affordability is normally reported as a median precisely because sale prices have such a long upper tail.": "ごく少数の高額取引が平均を押し上げても、ふつうの家の値段は何も変わりません。住宅の買いやすさが通常は中央値で報じられるのは、まさに売却価格の上側の裾が非常に長いからです。",
  "A charity announces that its supporters give an average of 240 a year and asks members whether they are giving their fair share. One donor that year gave several million.": "ある慈善団体が、支援者は年に平均240を寄付していると発表し、会員に自分は応分の負担をしているか問いかけました。その年、ある寄付者が数百万を寄せていました。",
  "A single enormous gift can lift the mean of a large group on its own. Asking ordinary members to measure themselves against that figure compares them with a number no ordinary member produced.": "たった一件の巨額の寄付が、大きな集団の平均をそれだけで押し上げることがあります。ふつうの会員にその数字を基準に自分を測らせるのは、ふつうの会員が誰一人生み出していない数字と比べさせることです。",
  "A ward reports a mean length of stay of 6.2 days and plans its bed numbers on the assumption that a typical patient occupies a bed for about six days. Most patients go home on day two or three; a few stay for months.": "ある病棟が平均在院日数6.2日と報告し、典型的な患者はベッドを6日ほど占めるという前提で病床数を計画しています。大半の患者は2日目か3日目に帰宅し、少数が何か月も入院しています。",
  "The long-stay patients pull the mean upward while the typical patient leaves far sooner. Planning around the mean will misjudge both how fast beds turn over and how many are locked up long term.": "長期入院の患者が平均を引き上げる一方、典型的な患者ははるかに早く退院します。平均を基準に計画すると、ベッドの回転の速さと、長期にふさがる床数の両方を読み違えます。",
  "A marketplace tells prospective sellers that the average shop on the platform earns 3,400 a month. A handful of very large shops account for most of the platform's sales volume.": "あるマーケットプレイスが出店希望者に、プラットフォーム上の平均的な店舗は月に3,400稼いでいると伝えています。ごく少数の非常に大きな店舗が売上高の大半を占めています。",
  "With a few dominant shops, the mean describes almost none of the sellers. A prospective seller wants the middle shop's earnings, and would also want to know how many shops earn nothing at all.": "少数の巨大店舗があると、平均はほとんどどの出品者のことも表しません。出店希望者が知りたいのはまん中の店舗の売上であり、さらに、まったく稼げていない店舗がどれだけあるかも知りたいはずです。",
  "A tutor reports that students improved by an average of 18 points. Of the 20 students, 17 gained about 4 points and 3 gained more than 90 each after starting from almost zero.": "ある講師が、受講生は平均18点伸びたと報告しました。20人のうち17人はおよそ4点の伸びで、3人はほぼゼロから始めてそれぞれ90点以上伸びていました。",
  "The three large gains carry the average. Reporting 18 points as the typical improvement describes none of the 17 students who actually make up the bulk of the class.": "平均を支えているのは大きく伸びた3人です。18点を典型的な伸びとして示しても、クラスの大半を占める17人の誰のことも表していません。",
  "A support team advertises a mean first-response time of 2 hours. Almost all tickets are answered within 20 minutes, while a small number sit unanswered for days. The team treats the 2 hour figure as its service standard.": "あるサポート窓口が、初回応答までの平均時間は2時間だと掲げています。ほぼすべての問い合わせには20分以内に返答していますが、少数は何日も未応答のまま残ります。窓口はこの2時間という数字をサービス水準として扱っています。",
  "The stalled tickets are what produce the 2 hour mean, and they are exactly the cases the standard should be about. A median plus a worst-case percentile would describe both the usual case and the failures.": "その2時間という平均を生んでいるのは滞留した問い合わせであり、それこそサービス水準が扱うべき事例です。中央値に加えて上位の百分位を示せば、ふだんの状況と失敗の両方を表せます。",
  "A report states that average household wealth in a country is 480,000 and concludes that most households have substantial savings to fall back on in a downturn.": "ある報告書が、その国の世帯の平均資産は480,000であるとし、大半の世帯は景気後退時に頼れるまとまった蓄えを持っていると結論づけています。",
  "Wealth is among the most lopsided quantities there is, with a floor at zero and an extremely long tail, so the mean sits far above the middle household. Nothing about typical savings follows from it.": "資産は存在するかぎり最も偏った量の一つで、ゼロという下限と極端に長い裾を持つため、平均は中央値の世帯よりはるかに上に来ます。そこから典型的な蓄えについて言えることは何もありません。",
  "A department evaluates researchers by the average citations of the journals they publish in, treating a paper in a high-average journal as a stronger paper than one in a low-average journal.": "ある部局が、研究者を、その人が発表した雑誌の平均引用数で評価し、平均の高い雑誌に載った論文を平均の低い雑誌に載った論文より優れているとみなしています。",
  "A journal's average is dragged up by a small number of very heavily cited papers, so most of its papers fall below it. The average of the container says remarkably little about any individual item in it.": "雑誌の平均は、ごく少数のきわめて多く引用された論文によって押し上げられるので、その雑誌の論文の大半は平均を下回ります。入れ物の平均は、そこに入っている個々の中身についておどろくほど何も語りません。",
  "A statistics agency reports median household income and states the mean alongside it, noting that the gap between the two reflects how unevenly income is spread.": "ある統計機関が世帯所得の中央値を公表し、平均もあわせて示したうえで、両者の差は所得の散らばりの不均等さを表していると注記しています。",
  "Both figures are given and the gap between them is explained rather than hidden. That is the standard honest way to report a quantity with a long tail.": "二つの数字がともに示され、その差は隠されるのではなく説明されています。裾の長い量を報告する、標準的で誠実なやり方です。",
  "A factory reports the mean diameter of a machined part as 20.00 mm, with measurements clustered tightly and symmetrically either side of that value.": "ある工場が、機械加工した部品の平均直径を20.00 mm と報告しています。測定値はその値の両側に狭く左右対称に集まっています。",
  "For a symmetric, tightly clustered quantity the mean and the median coincide, and the mean is the right summary. The problem only arises when the distribution is lopsided.": "左右対称で狭く集まった量では平均と中央値は一致し、平均が正しい要約になります。問題が生じるのは分布が偏っているときだけです。",
  "A utility multiplies the mean household consumption by the number of households to work out how much electricity it must generate in total.": "ある電力会社が、世帯あたりの平均消費量に世帯数を掛けて、発電すべき総量を算出しています。",
  "The mean is exactly the right tool here, because a total is what it is built from. It would be the wrong tool for describing a typical household, which is a different question.": "ここでは平均こそまさに正しい道具です。総量とは、そもそも平均がそこから作られているものだからです。典型的な世帯を表すには誤った道具であり、それは別の問いです。",
  "The average on its own": "平均だけ",
  "Where that average sits": "その平均の位置",

  // ---- Length-time bias, reworded ----
  "Whenever a screening programme is defended with how well its detected cases do, ask what kind of disease a periodic test can catch. A tumour that takes years to declare itself is available to be found on many visits; one that goes from nothing to symptoms in three months is available on almost none. The only fair question is whether deaths fall in everyone offered screening. None of which says screening cannot work. Where disease caught earlier is genuinely more treatable, so that the stage it is found at changes what treatment can achieve, finding it early does save lives, and randomised trials have shown exactly that for several cancers. What this bias says is narrower: you cannot demonstrate that benefit by comparing how screen-detected cases fare against symptom-detected ones, because those two groups were never the same kind of disease to begin with.": "検診プログラムが、見つけた症例の経過の良さを根拠に擁護されているときはいつでも、定期的な検査がどんな種類の病気を捕まえられるのかを考えてみてください。何年もかけて姿を現す腫瘍は、多くの受診機会で見つけられる状態にあります。何もない状態から3か月で症状に至る腫瘍は、ほとんどどの機会にもその状態にありません。公正な問いはただ一つ、検診を提案された人全員で死亡が減るかどうかです。とはいえ、以上のどれも検診が機能しえないと言っているわけではありません。より早く見つけた病気が本当により治しやすく、見つかった段階が治療にできることを変えるのであれば、早く見つけることは実際に命を救いますし、いくつかのがんについては無作為化試験がまさにそれを示しています。この偏りが言っているのはもっと狭いことです。検診で見つかった症例の経過を、症状で見つかった症例の経過と比べても、その利益を示すことはできません。その二つの群はそもそも同じ種類の病気ではなかったからです。",
  "Picture the same disease arriving in two speeds. Slow tumours spend years in the window where a test could find them but the patient feels nothing. Fast ones cross that window in weeks. Now sample the population every six months. You will find nearly all the slow ones and almost none of the fast ones, because the fast ones announce themselves between your visits. So the pile of screen-detected cases is loaded with indolent disease, and the pile of symptom-detected cases is loaded with aggressive disease, before treatment enters the story at all. Compare their outcomes and screening looks wonderful. At the extreme edge of this sits overdiagnosis: disease so slow it would never have troubled the person in their lifetime, which counts as a cancer found and cured while doing nothing but harm through the treatment. The defence is the same one that beats lead-time bias, and it is the reason screening programmes are judged the way they are: randomise who is invited, then count deaths in everyone invited, attended or not, diagnosed or not. Programmes that pass that test exist, which is the other half of the point. Where catching disease at an earlier stage genuinely changes what treatment can do, the benefit is real and it shows up as fewer deaths in the invited group; the test is simply what tells you which programmes those are.": "同じ病気が二つの速さでやって来ると考えてみてください。進行の遅い腫瘍は、検査なら見つけられるのに患者は何も感じない、その窓の中で何年も過ごします。速い腫瘍は数週間でその窓を通り抜けます。ここで半年ごとに集団を調べるとしましょう。遅いものはほぼすべて見つかり、速いものはほとんど見つかりません。速いものは受診と受診のあいだに自ら姿を現すからです。ですから検診で見つかった症例の山にはおとなしい病気が詰まり、症状で見つかった症例の山には侵襲的な病気が詰まります。治療が話に登場する前の段階でそうなっているのです。両者の結果を比べれば、検診はすばらしく見えます。この現象の極端な端にあるのが過剰診断です。あまりに進行が遅く、その人の生涯で一度も問題を起こさなかったはずの病気が、見つかって治ったがんとして数えられ、治療によって害をもたらすだけになります。防ぎ方はリードタイム・バイアスを破るのと同じであり、検診プログラムがあのように評価される理由でもあります。すなわち、誰を招待するかを無作為に決め、そのうえで招待された人全員について死亡数を数える。受診したかどうか、診断されたかどうかを問わずに、です。その試験に合格するプログラムは実在します。それがこの話のもう半分です。より早い段階で病気を捕まえることが治療にできることを本当に変えるのであれば、その利益は本物であり、招待群の死亡が少ないという形で現れます。試験は、どのプログラムがそれに当たるのかを教えてくれるだけのものです。",
  "A test you run every few months finds slow-growing disease far more easily than fast-growing disease, because slow disease sits there for years waiting to be found while fast disease erupts between visits. Slow disease also has a better outlook whatever anyone does. So the cases a screening programme catches are the gentle ones, and they do well, and the programme takes the credit. None of this means screening cannot work: where disease caught earlier is genuinely more treatable, catching it early does save lives, and randomised trials have shown it. It means you cannot prove it by comparing the cases the screen caught against the cases that walked in. The only number that cannot be gamed this way is deaths in everyone offered screening, whether or not they attended.": "数か月おきに行う検査は、進行の速い病気よりも進行の遅い病気をはるかに簡単に見つけます。遅い病気は見つけられるのを待って何年もそこにあり続けるのに対し、速い病気は受診と受診のあいだに噴き出すからです。しかも遅い病気は、誰が何をしようと見通しが良いのです。ですから検診プログラムが捕まえる症例はおとなしいものばかりで、その人たちの経過は良く、プログラムが手柄を得ます。とはいえ、これは検診が機能しえないという意味ではありません。より早く見つけた病気が本当により治しやすいのであれば、早く見つけることは実際に命を救いますし、無作為化試験がそれを示しています。意味しているのは、検診が捕まえた症例と自分から受診した症例を比べても、それを証明することはできないということです。この方法で細工できない唯一の数字は、検診を提案された人全員における死亡数であり、その人が受診したかどうかは関係ありません。",

  // ---- The illusory truth effect ----
  "Seeing a claim once, a week ago, already made it feel truer. What does seeing it 27 times do?": "一週間前に一度見ただけで、その主張はすでに本当らしく感じられていました。では27回見るとどうなるでしょうか。",
  "Fifty-seven people were shown trivia statements, the sort nobody can check off the top of their head, like which country invented the zipper. A week later they rated how true each one seemed, from 1 to 6. Statements they had never seen scored 3.64. Statements they had seen exactly once, seven days earlier, scored 4.26. Nothing about the statements changed in between, and no evidence for any of them was ever offered. The only difference was having met them before.": "57人に、その場で確かめようのない雑学的な文、たとえばファスナーはどの国で発明されたかといった文が示されました。一週間後、参加者はそれぞれがどれくらい本当らしいかを1から6で評価しました。一度も見ていない文は3.64でした。ちょうど一度だけ、七日前に見た文は4.26でした。その間に文の中身は何ひとつ変わっておらず、どの文についても根拠は一切示されていません。違いは以前に出会ったことがあるかどうかだけでした。",
  "Some statements had been shown 27 times. Where did those land?": "27回示された文もありました。それはどのあたりに落ち着いたでしょうか。",
  "How true a statement seemed, by how often it had been seen": "見た回数ごとに、その文がどれくらい本当らしく感じられたか",
  "times seen, a week earlier": "一週間前に見た回数",
  "Average rating that the statement is true, from 1 to 6": "その文が本当だという評価の平均値、1から6",
  "57 people, rating trivia statements a week after seeing them.": "57人が、見てから一週間後に雑学的な文を評価しました。",
  "These are the average ratings the source printed, on its 1 to 6 scale, not counts of people. The share of the climb bought by the first showing is derived from them rather than authored.": "これは出典が印字した平均評価であり、その1から6の尺度によるもので、人数の集計ではありません。最初の一回が稼いだ上昇分の割合は、これらから導かれたものであって手で書き込んだ数字ではありません。",
  "Never seen": "一度も見ていない",
  "Never": "未見",
  "Seen once": "一度見た",
  "Once": "1回",
  "Seen 9 times": "9回見た",
  "9 times": "9回",
  "Seen 18 times": "18回見た",
  "18 times": "18回",
  "Seen 27 times": "27回見た",
  "27 times": "27回",
  "Never seen, against seen once": "未見と、一度見たものの比較",
  "Far higher, roughly in proportion to the repetitions": "はるかに高い。回数にほぼ比例して",
  "27 times is a different order of thing": "27回はまったく桁が違う",
  "Lower, because hearing it over and over breeds suspicion": "低くなる。何度も聞かされると疑いたくなるから",
  "people resent being drummed at": "人は繰り返し叩き込まれるのを嫌う",
  "Barely higher than seeing it once": "一度見た場合とほとんど変わらない",
  "check what the scale allows": "尺度が何を許すかを確かめてください",
  "4.87. Twenty-six further showings did about what the first one did.": "4.87。あと26回見せても、最初の一回とほぼ同じだけの効果しかありませんでした。",
  "Repetition buys almost all of its effect on the very first repeat": "繰り返しは、その効果のほとんどを最初の一回で買ってしまう",
  "One showing lifted the rating by 0.62, from 3.64 to 4.26. Going on to twenty-seven showings lifted it by 0.61 more, to 4.87. So the entire climb is 1.23 points and the single first showing bought half of it, with the other half spread across twenty-six more. Drawn against the number of showings rather than as a tidy row, the curve is almost all cliff and then almost all plateau:": "一度見せただけで評価は0.62上がり、3.64から4.26になりました。そこから27回まで増やして上がったのはさらに0.61、4.87までです。つまり上昇の全体は1.23ポイントで、その半分をたった一度の提示が買い、残りの半分を26回分が分け合ったことになります。きれいに横並びにするのではなく提示回数に対して描くと、この曲線はほとんどが崖で、あとはほとんどが平地です。",
  "Every number of showings they tested": "検討されたすべての提示回数",
  "Be careful what this does and does not say, because the flat-looking tail is easy to overstate. The later showings were not doing nothing: in this experiment, nine, eighteen and twenty-seven showings all scored reliably above one showing. What the data says is about proportion, not about nothing, and it is quite strong enough. If you wanted to make a false statement feel true, the expensive part of the campaign, the twenty-six extra repetitions, bought you roughly what the very first cheap repeat did.": "ここで何が言えて何が言えないかには注意が必要です。この平らに見える尾は誇張しやすいからです。あとの提示が何もしていなかったわけではありません。この実験では9回、18回、27回のいずれも、1回だけの場合を確実に上回っていました。データが語っているのは割合の話であって、効果がないという話ではなく、それでも十分に強い主張です。もし偽りの文を本当らしく見せたいなら、キャンペーンのうち費用のかかる部分、つまり追加の26回は、いちばん安上がりな最初の一回とほぼ同じものしか買ってくれなかったということです。",
  "The rest of the curve": "曲線の残りの部分",
  "The illusory truth effect": "真実性の錯覚",
  "Familiarity feels like truth. A claim you have met before is rated truer than one you have not, with no new evidence and no argument, and most of that lift arrives the second time you meet it.": "見覚えは真実のように感じられます。以前に出会った主張は、出会っていない主張よりも本当らしいと評価されます。新しい証拠も議論も一切ないのにです。そしてその上積みの大半は、二度目に出会った時点で届いてしまいます。",
  "The practical consequence is uncomfortable and worth sitting with. It means your sense that a claim is plausible is partly a memory of having encountered it, and you cannot tell those two feelings apart from the inside. It also means the defence is not scepticism in the moment, since the feeling arrives before any thinking does. The defence is asking where you first met a claim, and noticing when the honest answer is that you cannot remember, only that it sounds familiar.": "実際的な帰結は居心地が悪く、腰を据えて考える価値があります。ある主張がもっともらしいというあなたの感覚は、以前それに出会ったという記憶の一部でできており、しかもその二つの感覚を内側から区別することはできない、ということだからです。またそれは、その場での懐疑が防御にならないことも意味します。感覚のほうが思考より先に到着するからです。防御になるのは、その主張に最初にどこで出会ったかを問うこと、そして正直な答えが「思い出せない、ただ聞き覚えがあるだけだ」であるときにそれに気づくことです。",
  "The mechanism is processing fluency. Something you have seen before is easier for your brain to take in the second time, and that ease registers as a small, wordless signal of rightness. Your mind then has to explain the signal, and truth is the readiest explanation available, since true things do tend to be the ones you hear repeated. So the feeling is not stupid, it is a decent heuristic being fed the wrong input. What makes it dangerous is that it does not require you to believe anything on first contact. You can hear a claim, dismiss it as nonsense, forget where you heard it, and still find it slightly more plausible a week later, because what survives is the fluency and not the dismissal. That is also why the effect is largely immune to knowing about it, and why it works even on people who could state the correct answer if asked directly. Three things follow. Repetition is a persuasion technique in its own right, independent of evidence, which is why propaganda has always been repetitive and why advertising repeats rather than argues. Correcting a falsehood by restating it, as fact checks must, carries a real cost, since the restatement is itself another exposure. And the front-loading matters for how you read a flood of identical claims: the flood is not what convinced people, it convinced them early and then mostly wasted its own ammunition. If you want a habit out of this, it is to separate two questions that feel like one. Does this sound right, and what is the evidence for it? The first question is answered partly by how many times you have heard it, which is not evidence about the world at all.": "仕組みは処理の流暢さです。以前に見たものは二度目には脳に取り込みやすくなり、その手軽さが「正しさ」の小さな、言葉にならない信号として記録されます。次に心はその信号を説明しなければならず、いちばん手近な説明が「本当だから」です。実際、本当のことは繰り返し耳にする傾向があるからです。ですからこの感覚は愚かなのではなく、まともな経験則が誤った入力を与えられているだけです。厄介なのは、最初の接触で何かを信じる必要がまったくない点です。ある主張を聞き、ばかげていると退け、どこで聞いたかを忘れても、一週間後にはわずかにもっともらしく感じられます。生き残るのは流暢さであって、退けたという判断のほうではないからです。この効果が、それを知っていてもほとんど防げない理由も、直接尋ねれば正しい答えを言える人にさえ働く理由も、そこにあります。ここから三つのことが導かれます。繰り返しは証拠とは独立した、それ自体で完結した説得の技術です。だからこそプロパガンダは常に反復的であり、広告は論証ではなく反復をするのです。誤りを正すためにそれを言い直すこと、ファクトチェックがどうしてもそうせざるをえないことには、実際のコストがあります。言い直し自体がもう一回の露出だからです。そして効果が前倒しであることは、同じ主張の氾濫をどう読むかを変えます。人々を納得させたのは氾濫ではありません。早い段階で納得させ、そのあとは自分の弾薬をほとんど無駄撃ちしていたのです。ここから習慣をひとつ取り出すなら、一つに見えて実は別の二つの問いを分けることです。これは正しそうに聞こえるか、そしてその証拠は何か。前者への答えは、あなたがそれを何回聞いたかによって部分的に決まっており、それは世界についての証拠ではまったくありません。",
  "The same effect, forty-four years earlier": "同じ効果が、44年前にも",
  "This is one of the older findings in the field and it has replicated steadily. In the original study, people rated plausible statements for truth on three occasions two weeks apart. Some statements were repeated across the sessions and some appeared only once. Ratings for the repeated statements climbed each time, while ratings for the ones seen only once did not move, and the climb happened for false statements exactly as it did for true ones. The authors concluded that how often something has been encountered is used as a criterion for whether it is true.": "これはこの分野でも古い部類の知見で、着実に再現されてきました。最初の研究では、参加者がもっともらしい文の真偽を、二週間おきに三回評価しました。一部の文は各回で繰り返され、一部は一度しか現れませんでした。繰り返された文の評価は回を追うごとに上がり、一度しか見ていない文の評価は動きませんでした。しかもその上昇は、偽の文についても真の文とまったく同じように起きました。著者らは、何かにどれだけ頻繁に出会ったかが、それが本当かどうかを判断する基準として使われていると結論づけました。",
  "The illusory truth effect, a reasoning trap.": "真実性の錯覚、という思考の罠。",
  "A claim you have met before feels truer than one you have not, even with no evidence attached and even if you dismissed it the first time. In one experiment people rated trivia statements from 1 to 6 a week after seeing them. Never seen: 3.64. Seen once: 4.26. Seen twenty-seven times: 4.87. So a single repeat bought half the total effect and the other twenty-six bought the rest between them. That is worth knowing about propaganda, which has always been repetitive, and about your own sense of plausibility, which is partly just a memory of having heard something before. Ask where you first met a claim. If the answer is that it merely sounds familiar, that is not evidence.": "以前に出会った主張は、出会っていない主張より本当らしく感じられます。証拠が何も添えられていなくても、最初に一度は退けていたとしてもです。ある実験では、参加者が雑学的な文を見てから一週間後に、1から6で評価しました。未見は3.64。一度見たものは4.26。27回見たものは4.87。つまり一度の繰り返しが効果全体の半分を買い、残りの26回が残り半分を分け合ったのです。常に反復的であり続けてきたプロパガンダについても、また、部分的には「以前聞いた」という記憶にすぎないあなた自身のもっともらしさの感覚についても、知っておく価値があります。その主張に最初にどこで出会ったかを問うてください。答えが「ただ聞き覚えがある」であれば、それは証拠ではありません。",
  "The stimuli are neutral trivia statements of ambiguous plausibility, of the gestation-period-of-a-giraffe kind, which is why this paper was chosen over the better known illusory-truth work that runs on political headlines: the evidence stays non-partisan even though the applications are not. Three limits are worth stating. The outcome is a published mean on a 1 to 6 rating scale rather than a count of people, so no number of individuals can be recovered from it, and the figure says so. The plateau is real but must not be overstated: in this experiment nine, eighteen and twenty-seven showings each still scored reliably above a single showing, with effect sizes of 0.62, 0.49 and 0.80, so the honest claim is about the share of the climb the first showing carries and not about later showings doing nothing. The paper's Experiment 1, which ran only to nine showings, is the one in which every later step between adjacent counts was non-significant. And the samples are modest, 51 and 57 people, though the overall effect of repetition was large in both, at d = 1.00 and d = 1.09.": "用いられた材料は、もっともらしさが曖昧な中立的な雑学の文、たとえばキリンの妊娠期間といった類のものです。政治的な見出しを使う、より有名な真実性の錯覚の研究ではなくこの論文を選んだのはそのためで、応用は政治的であっても証拠のほうは党派性を持ちません。三つの限界を述べておきます。測定されているのは1から6の評価尺度上で公表された平均であって人数の集計ではないため、そこから個人の人数を復元することはできず、図にもその旨が書かれています。平らな部分は実在しますが誇張してはなりません。この実験では9回、18回、27回のいずれもが一度だけの場合を確実に上回っており、効果量はそれぞれ0.62、0.49、0.80でした。ですから誠実な主張は、最初の一回が担う上昇分の割合についてであって、あとの提示が何もしないということではありません。隣り合う回数の差がすべて有意でなかったのは、9回までしか行かなかったこの論文の実験1のほうです。また標本は51人と57人と小規模ですが、繰り返しの全体的な効果はどちらも大きく、d = 1.00 および d = 1.09 でした。",
  "A campaign repeats one unsupported claim in every advert for six weeks. Polling afterwards finds more people rate the claim plausible than before, and the campaign concludes that the public examined the argument and found it convincing.": "あるキャンペーンが、根拠のない一つの主張を六週間すべての広告で繰り返します。その後の世論調査で、以前よりも多くの人がその主張をもっともらしいと評価し、キャンペーン側は世間が論拠を検討して説得力があると判断したのだと結論づけます。",
  "No argument was ever offered, so nothing was examined. Repetition on its own raises how true a claim feels, which means the poll measured exposure rather than persuasion by evidence.": "論拠は一度も示されていないのですから、検討されたものは何もありません。繰り返しだけで主張の本当らしさは上がるので、この調査が測ったのは露出であって、証拠による説得ではありません。",
  "A rumour circulates in an office for a month. Asked about it, staff say it must have something to it because they have heard it from several directions, though nobody can name an original source.": "ある噂が職場で一か月出回ります。尋ねられた職員は、いろいろな方面から聞いたのだから何かあるはずだと言いますが、誰も元の出所を挙げられません。",
  "Hearing something from several directions feels like corroboration and is often just the same claim going round. Without an original source, the sense that it must have something to it is a memory of exposure, not evidence.": "いろいろな方面から聞くことは裏づけのように感じられますが、多くの場合は同じ主張が回っているだけです。元の出所がないのなら、「何かあるはずだ」という感覚は露出の記憶であって、証拠ではありません。",
  "A newspaper runs a weekly column that restates a popular false claim in its headline and debunks it underneath. A survey a month later finds readers of the column more likely to believe the claim than non-readers.": "ある新聞が、広まっている誤った主張を見出しに掲げ、その下で否定する週刊コラムを連載しています。一か月後の調査で、そのコラムの読者は読まない人よりその主張を信じやすくなっていました。",
  "Every restatement is another exposure, and the familiarity outlasts the correction attached to it. Leading with the falsehood is the risky format; leading with the true version and never headlining the false one avoids it.": "言い直すたびにもう一回の露出になり、見覚えのほうが添えられた訂正より長く残ります。誤りを見出しに置くのが危険な形式であり、正しいほうを先に置き、誤ったほうを決して見出しにしないことがそれを避けます。",
  "A brand runs the same claim about its product 40 times a week rather than 4, and reports that the higher frequency is what made audiences believe it, since belief was higher than in an unexposed region.": "あるブランドが、自社製品についての同じ主張を週に4回ではなく40回流し、露出のなかった地域より信じる人が多かったことを根拠に、この高い頻度こそが人々に信じさせたのだと報告します。",
  "Comparing 40 exposures against zero cannot tell you what the extra 36 bought. Most of the shift in believability arrives on the first repeat, so the comparison the claim needs is 40 against 4, not 40 against none.": "40回の露出をゼロと比べても、残りの36回が何をもたらしたのかは分かりません。信じやすさの変化のほとんどは最初の繰り返しで到着するので、必要な比較は40回対4回であって、40回対ゼロではありません。",
  "A teaching myth is repeated in induction sessions year after year. Staff who first heard it as a caution, and were told at the time it was unproven, now cite it as established practice.": "ある教育上の俗説が、毎年の新任研修で繰り返されています。最初は注意喚起として聞き、その時点では実証されていないと伝えられていた職員が、今ではそれを確立した実践として引用しています。",
  "What survives repetition is the claim, not the caveat attached to it. People can dismiss something on first contact, forget where they met it, and later find it plausible purely because it feels familiar.": "繰り返しを生き延びるのは主張のほうであって、それに添えられていた留保ではありません。人は最初の接触でそれを退け、どこで出会ったかを忘れ、そのあと単に見覚えがあるという理由だけでもっともらしいと感じるようになります。",
  "A reader scrolls past the same unverified headline on four platforms without opening any of them. Weeks later they repeat it in conversation as something they are fairly sure is true, and cannot say where they read it.": "ある読者が、検証されていない同じ見出しを四つのプラットフォームで、どれも開かないまま通り過ぎます。数週間後、その人はそれを会話の中で、かなり確からしいことだと思うと語り、どこで読んだかは言えません。",
  "Not being able to name the source while feeling fairly sure is the signature of the effect. The confidence is built out of fluency from repeated exposure rather than out of anything anyone actually checked.": "出所を言えないのに、かなり確からしいと感じている。これがこの効果の特徴です。その確信は、繰り返しの露出から生まれた流暢さでできていて、誰かが実際に確かめた何かでできてはいません。",
  "A team assumes its specialists are immune to a repeated falsehood about their own field, on the grounds that they know the correct answer and would simply notice.": "あるチームが、自分たちの専門家は自分の分野に関する繰り返された誤りには影響されないと考えています。正しい答えを知っているのだから当然気づくはずだ、というのが理由です。",
  "Knowing the right answer does not prevent the feeling of familiarity, which arrives before any deliberate checking. People who can state the correct fact when asked directly still rate the repeated falsehood as more plausible.": "正しい答えを知っていても、見覚えの感覚は防げません。それは意識的な確認より先に到着するからです。直接尋ねれば正しい事実を言える人でも、繰り返された誤りのほうをよりもっともらしいと評価します。",
  "A product claim is quoted in a dozen blog posts, all of which trace back to a single press release. A buyer says the claim is well supported because it appears in so many places.": "ある製品についての主張が十数本のブログ記事に引用されており、そのすべてが一本のプレスリリースにさかのぼります。ある購入者は、これほど多くの場所に出ているのだからその主張はよく裏づけられていると言います。",
  "A dozen copies of one source is one source. Counting appearances measures how widely something was repeated, which is a fact about distribution and not about whether it is true.": "一つの出所の十数個の複製は、出所一つです。出現回数を数えることは、それがどれだけ広く繰り返されたかを測るものであり、拡散についての事実であって、真偽についての事実ではありません。",
  "An organisation decides that a rival's occasional, low-volume repetition of a false claim is harmless, because it is nothing like a saturation campaign and so cannot move anyone.": "ある組織が、競合による誤った主張の散発的で低頻度の繰り返しは無害だと判断します。飽和的なキャンペーンとはまるで違うのだから誰も動かせない、というのが理由です。",
  "The dose response is heavily front-loaded, so the first repeat does most of the work and a low-volume drip is not proportionally harmless. Volume is not what makes repetition effective.": "用量反応は大きく前倒しになっており、最初の繰り返しが仕事のほとんどをします。ですから低頻度の点滴のような繰り返しは、頻度に比例して無害というわけではありません。繰り返しを効果的にしているのは量ではないのです。",
  "Sorting claims to investigate, a team puts the ones that sound plausible at the bottom of the list, reasoning that plausible-sounding claims are less likely to be worth checking.": "調べるべき主張を並べ替えるとき、あるチームはもっともらしく聞こえるものをリストの下に置きます。もっともらしく聞こえる主張は確かめる価値が低いだろう、という理屈です。",
  "Sounding plausible is partly just having been encountered before, so this rule deprioritises exactly the claims that have already circulated most. Familiarity and truth feel identical from the inside.": "もっともらしく聞こえるということは、部分的には以前に出会ったことがあるというだけのことなので、この規則はまさに最も広く出回った主張を後回しにします。見覚えと真実は、内側からはまったく同じに感じられます。",
  "A public health body repeats one message consistently for a year, and the message states a finding along with the trial it comes from, so that each repetition carries the evidence with it.": "ある公衆衛生機関が、一つのメッセージを一年間一貫して繰り返します。そのメッセージは、ある知見とその出典となる試験を併せて述べており、繰り返しのたびに証拠も一緒に運ばれます。",
  "Repetition is a delivery choice and not a flaw in itself. What matters is whether the claim is supported, and here the support travels with it rather than being replaced by familiarity.": "繰り返しは伝え方の選択であって、それ自体が欠陥なのではありません。重要なのは主張が裏づけられているかどうかであり、ここでは裏づけが見覚えに置き換わるのではなく、主張とともに運ばれています。",
  "A claim is reported by three outlets that each did their own reporting, naming different primary documents and interviewing different people, and an editor treats the agreement as genuine corroboration.": "ある主張が三つの報道機関によって報じられ、それぞれが独自に取材し、異なる一次資料を挙げ、異なる人物に取材しています。編集者はその一致を本物の裏づけとして扱います。",
  "These are independent lines of evidence rather than one claim echoing, so their agreement really is corroboration. The problem arises only when repeated appearances all trace back to a single source.": "これらは同じ主張が反響しているのではなく独立した証拠の系統ですから、その一致はまさしく裏づけです。問題が生じるのは、繰り返し現れたものがすべて単一の出所にさかのぼる場合だけです。",
  "A broadcaster corrects a false claim by leading with the accurate version, describing the false one briefly and only once, and closing on the accurate version again.": "ある放送局が、正しい版を先に述べ、誤った版は短く一度だけ紹介し、最後にもう一度正しい版で締めることによって、誤った主張を訂正します。",
  "This is the format designed around the problem: the true statement gets the repetitions and the false one gets as few as possible. Correcting is not the risk; headlining the falsehood repeatedly is.": "これはこの問題を念頭に設計された形式です。真の文が繰り返しを受け取り、偽の文は可能なかぎり少なくします。危険なのは訂正することではなく、誤りを繰り返し見出しに掲げることです。",
  "As far as it goes": "見えているところまで",
  "The whole curve": "曲線の全体",

  // ---- Anchoring ----
  "Five seconds to estimate 1 x 2 x 3 x 4 x 5 x 6 x 7 x 8. This group's typical answer was 512.": "1 x 2 x 3 x 4 x 5 x 6 x 7 x 8 を5秒で見積もる。このグループの典型的な答えは512でした。",
  "High school students were shown a multiplication on a blackboard and given five seconds to estimate the answer. Five seconds is nowhere near enough to actually multiply eight numbers, so what people do is work through the first two or three steps and then guess upward from where they have got to. The typical answer from this group was 512. A second group of students, given the same five seconds, saw the identical eight numbers written in the opposite order: 8 x 7 x 6 x 5 x 4 x 3 x 2 x 1.": "高校生に黒板の掛け算を見せ、5秒で答えを見積もってもらいました。5秒では八つの数を実際に掛け合わせるにはまるで足りないので、人がすることは最初の二、三段階だけ計算し、そこから上に向かって当てずっぽうに伸ばすことです。このグループの典型的な答えは512でした。もう一つのグループは、同じ5秒で、まったく同じ八つの数が逆順に書かれたものを見ました。8 x 7 x 6 x 5 x 4 x 3 x 2 x 1 です。",
  "The second group was estimating exactly the same product. What was their typical answer?": "二つ目のグループが見積もっていたのはまったく同じ積です。その典型的な答えはいくつだったでしょうか。",
  "Estimating the same product, written two ways": "同じ積を、二通りの書き方で見積もる",
  "The actual product": "実際の積",
  "These are the median estimates the source printed. It gives no group sizes, no spread around either median and no test statistic for this demonstration, so nothing else is drawn here.": "これは出典が印字した中央値の見積もりです。この実演について、出典はグループの人数も、どちらの中央値のばらつきも、検定統計量も示していません。ですからここにはそれ以外は何も描いていません。",
  "Shown the numbers ascending": "数が昇順で示された",
  "Ascending": "昇順",
  "1 x 2 x 3 x 4 x 5 x 6 x 7 x 8": "1 x 2 x 3 x 4 x 5 x 6 x 7 x 8",
  "Shown the numbers descending": "数が降順で示された",
  "Descending": "降順",
  "8 x 7 x 6 x 5 x 4 x 3 x 2 x 1": "8 x 7 x 6 x 5 x 4 x 3 x 2 x 1",
  "The ascending group only": "昇順のグループだけ",
  "About the same, since it is the same product": "だいたい同じ。同じ積なのだから",
  "the order cannot matter": "順序で変わるはずがない",
  "Lower, because starting at 8 is intimidating": "もっと低い。8から始まるのは気後れするから",
  "big numbers make people cautious": "大きな数は人を慎重にさせる",
  "Higher, and by a lot": "もっと高い。しかも大幅に",
  "look at where each one starts": "それぞれ何から始まるかを見てください",
  "2,250. The same eight numbers, backwards, and the typical guess more than quadrupled.": "2,250。同じ八つの数を逆に並べただけで、典型的な答えは4倍以上になりました。",
  "You anchor on the first few steps and adjust far too little from there": "人は最初の数段階に錨を下ろし、そこからの調整があまりにも足りない",
  "Nobody multiplied anything. In five seconds you get through 1 x 2 x 3, which is 6, or through 8 x 7 x 6, which is 336, and then you scale up from whatever number you are holding. That starting point is the anchor, the adjustment upward is never anywhere near enough, and the order of the digits is the only thing that differed. Now put the real answer on the same axis:": "誰も掛け算などしていません。5秒でたどり着けるのは 1 x 2 x 3 で6、あるいは 8 x 7 x 6 で336までで、あとは手元にあるその数から上へ引き伸ばすだけです。この出発点が錨であり、上への調整は決して十分ではなく、違っていたのは数字の並び順だけでした。ではここで、本当の答えを同じ軸に置いてみましょう。",
  "Both guesses, and the answer": "二つの見積もりと、答え",
  "The second thing the chart does is more sobering than the first. The two groups look far apart from each other, 512 against 2,250, but against 40,320 they are both rounding errors: 1.3 and 5.6 per cent of the answer. Even the group that guessed higher was out by a factor of eighteen. So the anchor did not just tilt the estimate, it set the entire scale of the answer, and the adjustment afterwards never had a chance of escaping it.": "このグラフが示す二つ目のことは、一つ目より考えさせられます。二つのグループは互いに遠く離れて見えます。512に対して2,250です。しかし40,320に対しては、どちらも誤差の域です。答えの1.3パーセントと5.6パーセントにすぎません。高めに見積もったグループでさえ18分の1しか当たっていませんでした。つまり錨は見積もりを傾けただけではなく、答えの尺度そのものを決めてしまい、その後の調整にそこから抜け出す見込みは初めからなかったのです。",
  "What five seconds actually buys": "5秒で実際に買えるもの",
  "Anchoring": "アンカリング",
  "The first number in the room sets the scale for every number that follows it, including numbers that have nothing to do with it. Adjustment away from an anchor is almost always too small.": "最初に口に出された数字が、その後に続くすべての数字の尺度を決めます。まったく関係のない数字であってもです。錨からの調整は、ほとんどいつも小さすぎます。",
  "The uncomfortable part is that the anchor does not have to be relevant, or credible, or even offered in good faith. In the same paper, an anchor generated by spinning a wheel of fortune in front of the participants, who could see it was random, still moved their estimates: median guesses of the percentage of African countries in the United Nations were 25 and 45 for groups that had watched the wheel land on 10 and 65. The authors add that paying people for accuracy did not reduce the effect.": "やっかいなのは、錨が適切である必要も、信頼できる必要も、善意で示される必要さえないことです。同じ論文では、参加者の目の前でルーレットを回して出した錨が、それが無作為だと本人たちに見えていたにもかかわらず、見積もりを動かしました。国連加盟国に占めるアフリカの国の割合について、ルーレットが10と65で止まるのを見たグループの中央値の見積もりは、それぞれ25と45でした。著者らは、正確さに報酬を出してもこの効果は減らなかったと付け加えています。",
  "Anchoring works because estimating is expensive and comparing is cheap. Faced with a quantity you do not know, the mind does not build an answer from nothing; it grabs whatever number is nearby and asks whether the true value is bigger or smaller than that. This is a sensible strategy when the nearby number is informative. The trouble is that the grabbing happens whether or not it is informative, and the adjustment that follows is throttled by the effort it takes: you move away from the anchor until the answer stops feeling obviously wrong, and stopping there is almost always stopping too early. Three consequences are worth carrying around. First, whoever speaks first in a negotiation is not merely stating a position, they are setting the scale on which every later number will be judged, which is why an opening offer that seems absurd is often working exactly as intended. Second, an anchor does not need to be a number: the first proposal, the first draft, the first estimate anyone says out loud in a meeting does the same job to everything said afterwards. Third, and this is what the political version of the idea trades on, repeatedly voicing a position far outside what is currently normal shifts where the middle appears to be, without a single argument being made for it. The defences are unglamorous and they work. Make your own estimate before you hear anyone else's, and write it down, because an unstated estimate quietly rewrites itself. Ask what the answer would be if the anchor were doubled or halved, which is a way of testing whether you are reasoning or just decorating a number you were handed. And when you catch yourself adjusting from a figure, adjust further than feels right, because the pull is always toward stopping too soon.": "アンカリングが働くのは、見積もることは高くつき、比べることは安く済むからです。知らない量を前にしたとき、心はゼロから答えを組み立てたりしません。近くにある数をつかみ、本当の値はそれより大きいか小さいかと問うのです。近くにある数が有益なものであれば、これは筋の通った戦略です。困るのは、有益かどうかに関わらずそのつかみ取りが起きること、そしてそれに続く調整が、要する労力によって抑えつけられることです。答えが明らかにおかしいと感じなくなるところまで錨から離れて、そこで止まる。そしてそこで止まることは、ほとんどいつも早すぎるのです。持ち帰る価値のある帰結が三つあります。第一に、交渉で最初に口を開く人は、単に立場を述べているのではなく、その後のあらゆる数字が判断される尺度を設定しています。ばかげて見える最初の提示額が、しばしば意図どおりに機能しているのはそのためです。第二に、錨は数字である必要すらありません。最初の提案、最初の草稿、会議で最初に声に出された見積もりは、その後に来るすべてに同じことをします。第三に、そしてこの考えの政治版が食い物にしているのがここですが、いま普通とされているものからかけ離れた立場を繰り返し口にすると、中間がどこにあるように見えるかが動きます。そのために何ひとつ議論が示されなくてもです。防ぎ方は地味で、しかも効きます。他人の見積もりを聞く前に自分の見積もりを立て、書き留めてください。書かれていない見積もりは、いつのまにか自分で書き換わります。錨が倍だったら、あるいは半分だったら答えはどうなるかと問うてください。それは、自分が推論しているのか、手渡された数字を飾り付けているだけなのかを確かめる方法です。そしてある数字から調整している自分に気づいたら、しっくりくる以上に調整してください。引っぱる力は、いつも早く止まる方向に働くからです。",
  "It holds up, and it is not confined to students in a hurry": "これは持ちこたえるし、急いでいる学生に限った話でもない",
  "The effect has been examined many times since 1974 across very different tasks and populations, and a meta-analysis pooling that literature found it robust, with a large average effect size. That matters here because the blackboard demonstration on its own is a single result from 1974 on school students under time pressure, with no sample sizes or spread printed. The general phenomenon does not rest on it. What the blackboard version supplies that most later studies do not is a case where the right answer is exactly knowable, so the size of the error can be seen rather than inferred.": "この効果は1974年以来、まったく異なる課題と対象で何度も検討されてきており、その文献をまとめたメタ分析はこれを頑健で、平均効果量も大きいと報告しています。ここでそれが重要なのは、黒板の実演それ自体は、時間に追われた高校生を対象とした1974年の単一の結果にすぎず、標本規模もばらつきも印字されていないからです。一般的な現象はこの実演に依存していません。この版が持っていて、後年の研究の多くが持たないのは、正解が厳密に分かるという点です。おかげで誤差の大きさを推し量るのではなく、見ることができます。",
  "Anchoring, a reasoning trap.": "アンカリング、という思考の罠。",
  "Two groups of students got five seconds to estimate a product on a blackboard. One saw 1 x 2 x 3 x 4 x 5 x 6 x 7 x 8 and typically guessed 512. The other saw the identical eight numbers written backwards, 8 x 7 x 6 x 5 x 4 x 3 x 2 x 1, and typically guessed 2,250. Same numbers, same answer, more than four times the guess. And both were nowhere close: the real answer is 40,320. Nobody had time to multiply, so everyone anchored on the first few steps and adjusted up far too little. Whoever says a number first is not stating a position, they are setting the scale. Make your own estimate before you hear theirs.": "二つの学生グループが、黒板に書かれた積を5秒で見積もりました。一方は 1 x 2 x 3 x 4 x 5 x 6 x 7 x 8 を見て、典型的な答えは512でした。もう一方はまったく同じ八つの数が逆順に書かれた 8 x 7 x 6 x 5 x 4 x 3 x 2 x 1 を見て、典型的な答えは2,250でした。同じ数、同じ答え、それでも見積もりは4倍以上。しかもどちらも遠く及びません。本当の答えは40,320です。誰も掛け算をする時間などなかったので、全員が最初の数段階に錨を下ろし、上への調整があまりにも足りなかったのです。最初に数字を口にする人は、立場を述べているのではなく、尺度を決めています。相手の見積もりを聞く前に、自分の見積もりを立ててください。",
  "Three limits, stated because the figure would otherwise imply more than the source contains. The paper prints no group sizes, no spread around either median and no test statistic for this demonstration, so the chart draws two medians and the true value and nothing else. The participants were high school students working under a five-second deadline, which is a deliberately extreme version of the ordinary condition of estimating without time to compute, so the size of the error here should not be read as typical of unhurried judgement. And it is a single 1974 result, which is why the deep-dive example points at the later replication literature rather than leaving this one demonstration to carry the general claim. What this version has that better-powered later studies mostly lack is an exactly knowable right answer: 8 factorial is 40,320, so the shortfall can be measured rather than estimated. The same page carries the better-known wheel-of-fortune demonstration, quoted in the lesson, whose target quantity is a historical fact that has since changed, which is why it is not what the puzzle is scored on.": "三つの限界を述べておきます。そうしないと、この図が出典の内容以上のことを示唆してしまうからです。論文はこの実演について、グループの人数も、どちらの中央値のばらつきも、検定統計量も印字していません。ですからグラフは二つの中央値と真の値だけを描き、それ以外は描きません。参加者は5秒という制限のもとにいた高校生であり、これは計算する時間がないまま見積もるという日常的な状況を意図的に極端にした版です。ですからここでの誤差の大きさを、急いでいない判断の典型と読んではいけません。またこれは1974年の単一の結果であり、だからこそ深掘りの例は後年の追試の文献を指し示しており、この一つの実演に一般的な主張を背負わせてはいません。この版が持っていて、統計的により整った後年の研究の多くに欠けているのは、厳密に知りうる正解です。8の階乗は40,320なので、そのずれは推定ではなく測定できます。同じページには、レッスンで引用したより有名なルーレットの実演も載っていますが、その対象となる量はその後変化した歴史的事実であり、だからこそこのパズルの採点はそちらでは行っていません。",
  "A recruiter opens by naming a figure far above anything the role has ever paid. The final agreed salary lands well above the usual range, and the employer concludes the candidate negotiated unusually well.": "採用担当者が、その職がこれまで払ったどの額よりもはるかに高い数字を最初に口にします。最終的に合意された給与は通常の幅をかなり上回り、雇用主はこの候補者が並外れて交渉上手だったと結論づけます。",
  "The opening figure set the scale on which every later number was judged, so the settlement drifted toward it. That is a fact about who spoke first, not about anyone's negotiating skill.": "最初に出された数字が、その後のあらゆる数字を判断する尺度を決めたので、合意はその方向へ流れました。それは誰が先に話したかについての事実であって、誰かの交渉力についての事実ではありません。",
  "A donation page offers preset amounts starting at 500. Average gifts rise compared with the previous page, which started at 20, and the charity reports that supporters have become more generous.": "ある寄付ページが500から始まる金額の候補を並べています。20から始まっていた以前のページと比べて平均寄付額が上がり、その団体は支援者がより気前よくなったと報告します。",
  "The same supporters met a different first number. Presets are anchors, so the shift measures the design of the page rather than any change in generosity.": "同じ支援者が、違う最初の数字に出会っただけです。あらかじめ用意された金額は錨なので、この変化はページの設計を測っているのであって、気前のよさの変化を測ってはいません。",
  "A shop labels an item as reduced from 200 to 90. Shoppers rate it better value than the identical item labelled simply as 90, and the shop concludes they prefer the discounted version.": "ある店が商品に200から90への値下げと表示します。買い物客は、単に90と表示された同じ商品よりもこちらのほうが割安だと評価し、店は客が値下げ版を好むのだと結論づけます。",
  "The struck-through 200 is a reference point rather than information about the item, and value judgements are made relative to it. The product and the price paid are the same in both cases.": "取り消し線の引かれた200は商品についての情報ではなく参照点であり、価値の判断はそれとの相対で行われます。商品も支払う価格も、どちらの場合もまったく同じです。",
  "In a planning meeting the most senior person says a task will take about two weeks before anyone else speaks. The team's estimates cluster near two weeks, and the manager treats the agreement as independent confirmation.": "ある計画会議で、誰かが口を開く前に最も上位の人がその作業には二週間ほどかかると言います。チームの見積もりは二週間付近に集まり、責任者はその一致を独立した裏づけとして扱います。",
  "Once a number is in the room, later estimates adjust from it rather than being formed independently. Agreement reached this way is not corroboration; the estimates should be written down before anyone speaks.": "いったん数字が部屋の中に出てしまうと、その後の見積もりは独立に形成されるのではなく、その数字から調整されます。こうして得られた一致は裏づけではありません。見積もりは誰かが話す前に書き留めておくべきです。",
  "Two groups of appraisers tour the same house with identical information packs, except that the listed asking price differs. Their valuations differ in the same direction, and the agency concludes one group was better at spotting the property's potential.": "二組の不動産鑑定士が、まったく同じ資料一式を持って同じ家を見て回ります。違うのは提示されている売り出し価格だけです。二組の評価額は同じ方向にずれ、業者は一方の組のほうが物件の潜在価値をよく見抜いたと結論づけます。",
  "The house was identical, so the difference tracks the listing price and nothing about the property. Expertise does not remove the pull; it mostly makes people more confident that it did not apply to them.": "家は同一だったのですから、差は売り出し価格を追っているのであって、物件については何も語っていません。専門性はこの引っぱりを取り除きはしません。むしろ自分には効かなかったという確信を強めるだけです。",
  "A department builds next year's budget by starting from last year's figure and adjusting. When challenged, the finance lead says the process is evidence-based because every adjustment was justified line by line.": "ある部署が翌年度の予算を、前年度の数字から出発して調整することで作ります。問われると、財務責任者は、すべての調整を項目ごとに正当化したのだから根拠に基づく手続きだと答えます。",
  "Justifying each step away from a starting point does not test the starting point itself, and adjustments from an anchor are systematically too small. A zero-based estimate would answer a different and better question.": "出発点からの一歩ずつを正当化しても、その出発点そのものは検証されませんし、錨からの調整は決まって小さすぎます。ゼロから積み上げる見積もりなら、別の、そしてより良い問いに答えることになります。",
  "Before estimating an unfamiliar quantity, participants are asked to write down the last two digits of their phone number. Estimates correlate with those digits, and the researcher concludes the sample must be unrepresentative.": "よく知らない量を見積もる前に、参加者は自分の電話番号の下二桁を書くよう求められます。見積もりはその数字と相関し、研究者はこの標本は代表性を欠くに違いないと結論づけます。",
  "An anchor does not have to be relevant or even plausible to work, and participants can know it is arbitrary and still be moved by it. The correlation is the expected result, not a sign of a bad sample.": "錨は、効果を持つために適切である必要も、もっともらしい必要すらありません。参加者はそれが恣意的だと知っていてもなお動かされます。この相関は予想どおりの結果であって、標本が悪いしるしではありません。",
  "Two panels assess the same case file, given different suggested figures for the penalty by a party with no expertise. Their recommendations track the suggestions, and a reviewer concludes the panels disagreed about the facts.": "二つの委員会が同じ事件記録を検討します。専門知識のない当事者から、処分についてそれぞれ異なる数字を示唆されています。両者の勧告はその示唆に追随し、ある査読者は二つの委員会が事実について見解を異にしていたと結論づけます。",
  "The file was identical, so there was nothing factual to disagree about. What differed was the number each panel was handed before it started, which set the range their adjustments moved within.": "記録は同一だったのですから、事実について見解が分かれる余地はありませんでした。違ったのは、審議を始める前に各委員会が手渡された数字であり、それが調整の動く範囲を決めたのです。",
  "A group repeatedly voices a position far outside anything previously considered normal. Over time, positions that once looked extreme are described as moderate, and commentators say public opinion has genuinely moved to meet them.": "あるグループが、それまで普通とされてきたものからかけ離れた立場を繰り返し表明します。時とともに、かつて極端に見えた立場が穏健と評されるようになり、論者たちは世論が本当にそちらへ動いたのだと語ります。",
  "Where the middle appears to be depends on what the endpoints are, and repeating a distant position moves the endpoints without any argument being made. That is a change in the frame rather than demonstrated movement in what people believe.": "中間がどこにあるように見えるかは、両端がどこにあるかで決まります。遠い立場を繰り返せば両端が動き、そのために議論は何ひとつ示されていません。それは枠組みの変化であって、人々の信念が動いたことの証明ではありません。",
  "A buyer collects three quotes for a job and judges the second and third as cheap or expensive relative to the first, which happened to arrive first for no particular reason.": "ある買い手が工事の見積もりを三社から取り、二社目と三社目を、たまたま特に理由もなく最初に届いた一社目と比べて高い安いと判断します。",
  "The first quote arrived first by accident, yet it is doing the work of a benchmark. Cheap and expensive should be measured against what the job is worth, which none of the three quotes establishes on its own.": "最初の見積もりが最初に届いたのはたまたまなのに、それが基準の役割を果たしています。高い安いは、その工事にいくらの価値があるかに照らして測られるべきであり、三つの見積もりのどれ一つ、それを単独で定めてはいません。",
  "A team asks every member to write down their estimate privately before any figure is spoken aloud, then reveals all of them at once and discusses the spread.": "あるチームは、誰かが数字を口に出す前に全員に自分の見積もりを各自で書き留めさせ、その後すべてを一斉に開示して、ばらつきについて議論します。",
  "This is the standard defence: estimates formed before anyone hears a number are genuinely independent, so their spread carries information and their agreement is real corroboration.": "これが定石の防御です。どんな数字も聞かないうちに形成された見積もりは本当に独立しているので、そのばらつきには情報があり、その一致は本物の裏づけになります。",
  "An engineer estimates the cost of a new bridge by starting from the recorded cost of three comparable bridges and adjusting for size and materials, stating the comparators used.": "ある技術者が新しい橋の費用を、比較可能な三つの橋の実績費用から出発し、規模と材料に合わせて調整することで見積もり、用いた比較対象を明示します。",
  "Here the starting point is relevant evidence rather than an arbitrary number, and it is declared so the reader can judge it. Adjusting from an informative baseline is estimation working as intended.": "ここでの出発点は恣意的な数字ではなく関連する証拠であり、しかも読み手が判断できるよう明示されています。有益な基準から調整することは、見積もりが本来の働きをしている姿です。",
  "Before accepting a forecast, an analyst redoes it from a starting figure twice as large and again from one half as large, and reports that the conclusion holds in all three cases.": "ある予測を受け入れる前に、アナリストが出発点を二倍にして、さらに半分にしてやり直し、三通りとも結論が変わらないことを報告します。",
  "Testing whether the answer survives a different starting point is exactly how you find out whether you were reasoning or decorating an anchor. The conclusion here does not depend on where it began.": "別の出発点でも答えが生き残るかを試すことは、自分が推論していたのか錨を飾り付けていたのかを知る、まさにその方法です。ここでは結論はどこから始めたかに依存していません。",
  "What one group said": "一方のグループが答えたこと",
  "Both, against the answer": "両方を、答えと並べて",

  // ---- Gerrymandering ----
  "In this election one party won more votes than the other. Just barely, but it won them.": "この選挙では、一方の政党がもう一方より多くの票を得ました。わずかな差ですが、確かに上回っていました。",
  "Massachusetts, 1812, electing the forty members of the state senate. Months before the vote, the legislature had redrawn the senate districts and the governor had signed the new map into law. Both the legislature and the governor belonged to one of the two parties, and that party drew the boundaries. When the votes were counted, 101,930 had been cast for senators, and the OTHER party, the one that had not drawn the map, came out narrowly ahead.": "1812年のマサチューセッツ、州上院の議員四十人を選ぶ選挙です。投票の数か月前、州議会が上院の選挙区を引き直し、知事がその新しい区割りを法として署名していました。州議会も知事も二つの政党のうちの一方に属しており、区割りを引いたのはその政党でした。開票の結果、上院議員選に投じられた票は101,930票で、区割りを引かなかった「もう一方」の政党がわずかに上回っていました。",
  "How many of the 40 senate seats did the party with more votes win?": "票で上回った政党は、上院の40議席のうちいくつを獲得したでしょうか。",
  "Share won": "獲得した割合",
  "Federalists, who did not draw the map": "連邦党。区割りを引いていない側",
  "Federalists": "連邦党",
  "Democratic-Republicans, who drew the map": "民主共和党。区割りを引いた側",
  "Democratic-Republicans": "民主共和党",
  "Votes cast for senators": "上院議員選に投じられた票",
  "Senate seats won": "獲得した上院議席",
  "The votes, and nothing else yet": "票だけ。まだそれ以外は見せません",
  "About half, close to their share of the vote": "およそ半分。得票率とほぼ同じくらい",
  "seats should follow votes": "議席は票に従うはず",
  "A majority, since they won the most votes": "過半数。いちばん多く票を得たのだから",
  "they did win, after all": "実際に勝ったのだから",
  "Far fewer than half": "半分をはるかに下回る",
  "consider who drew the districts": "誰が選挙区を引いたかを考えてください",
  "Eleven of forty. The party with fewer votes took twenty-nine seats.": "四十のうち十一。票の少なかった政党が二十九議席を取りました。",
  "The same votes, sorted into different boxes, give a different parliament": "同じ票を別の箱に振り分けると、別の議会ができあがる",
  "Not one voter changed their mind, and not one ballot was miscounted. The Federalists received 51,766 votes and the Democratic-Republicans 50,164, so the Federalists genuinely won the election by about 1,600 votes out of 101,930. They then received eleven of the forty seats. The party that had drawn the districts took the other twenty-nine, which is nearly three quarters of the chamber on slightly under half the vote:": "有権者は誰ひとり考えを変えておらず、票の数え間違いもありません。連邦党が51,766票、民主共和党が50,164票ですから、連邦党は101,930票のうち約1,600票差で本当に選挙に勝っています。そのうえで得た議席は四十のうち十一。区割りを引いた政党が残る二十九議席を取りました。半分をわずかに下回る得票で、議場のほぼ四分の三です。",
  "Votes, and the seats they produced": "票と、そこから生まれた議席",
  "The trick is in how the lines gather people up. Pack as many of your opponent's voters as possible into a handful of districts they win overwhelmingly, so those votes pile up far beyond what is needed, and spread the rest thinly across many districts they lose narrowly. Their votes are then either wasted on enormous majorities or wasted on near misses, and yours are spent efficiently. One of the new Massachusetts districts was drawn in such a contorted shape that a newspaper cartoon added wings and claws and called it a salamander, after the governor who signed it: Elbridge Gerry. That is where the word comes from, and the word has outlived both of the parties involved.": "仕掛けは、線が人々をどうまとめるかにあります。相手の支持者をできるだけ少数の選挙区に詰め込み、そこでは圧勝させる。すると必要をはるかに超えて票が積み上がります。残りは多数の選挙区に薄く広げ、そこではわずかな差で負けさせる。こうして相手の票は、巨大な多数として無駄になるか、惜敗として無駄になるかのどちらかになり、自分の票だけが効率よく使われます。マサチューセッツの新しい選挙区のひとつはあまりに入り組んだ形をしていたため、新聞の風刺画が翼と爪を描き足し、これに署名した知事エルブリッジ・ゲリーの名を取ってサラマンダーと呼びました。この語の由来はそこにあり、その語は当事者だった二つの政党より長生きしました。",
  "What the boundaries did": "区割りがしたこと",
  "Gerrymandering": "ゲリマンダー",
  "When votes are counted inside districts, whoever draws the districts is choosing part of the answer before anyone votes. A result can be arithmetically correct at every step and still not reflect what people chose.": "票が選挙区の内側で数えられるとき、選挙区を引く者は、誰かが投票するより前に答えの一部を選んでいます。どの段階の計算も正確でありながら、なお人々が選んだものを映していない結果というものがありうるのです。",
  "Note what this is not. It is not a claim about any living party: this practice has been used by whichever side happened to hold the pen, in many countries and in every century since, and the two parties in this example both ceased to exist long ago. It is also not an argument that districts are a mistake. Drawing boundaries is unavoidable in any system with local representation, and someone has to do it. What the example shows is narrower and harder to argue with: the drawing is not a neutral technical step, and asking who did it is a reasonable question about any districted result.": "これが何でないかに注意してください。これは現存するどの政党への非難でもありません。この手法は、そのとき筆を握っていた側が使ってきたものであり、多くの国で、以後どの世紀にも見られます。しかもこの例に出てくる二つの政党はとうの昔に消滅しています。また、選挙区という仕組みが誤りだという主張でもありません。地域代表制をとる以上、境界を引くことは避けられず、誰かがやらなければなりません。この例が示すのはもっと狭く、そして反論しにくいことです。その線引きは中立な技術的作業ではなく、誰が引いたのかと問うのは、選挙区に基づくどんな結果に対しても妥当な問いだということです。",
  "The mechanism has a name in the modern literature: wasted votes. Every vote cast for a losing candidate is wasted, and so is every vote for a winner beyond the number needed to win. A map maker who wants a particular result arranges the boundaries so that the other side wastes as many votes as possible, and there are exactly two ways to do it. Packing puts their supporters into a small number of districts where they win by enormous margins, so tens of thousands of their votes elect one representative. Cracking splits the rest across many districts where they lose by a little, so those votes elect nobody at all. Both are legal, both leave every individual count accurate, and together they let a minority of voters elect a majority of seats. Two consequences are worth carrying. First, the shape of a district is a weak clue, not proof, and this cuts both ways: a bizarre outline can be the innocent result of a river or a city boundary, while a tidy rectangle can be carefully drawn to split a community in half. That is why the serious modern work does not look at shapes at all. Instead it generates many thousands of alternative maps by computer under the state's own stated rules, retallies the same real votes on each one, and asks where the enacted map falls in that distribution. A map that produces a result almost no neutral map produces is the finding, and this method has caught maps drawn by more than one party. Second, and more transferable, the same reasoning applies far outside politics. Whenever performance is measured inside units that somebody chose, whether those are sales regions, school catchments, hospital trusts or department boundaries, the choice of unit is part of the result. Ask who drew the boundary and when, and whether the answer would survive being drawn differently.": "この仕組みには現代の研究で名前がついています。死票です。落選した候補に投じられた票はすべて死票であり、当選に必要な数を超えて当選者に投じられた票もまた死票です。特定の結果を狙う区割り作成者は、相手側の票ができるだけ多く死票になるように境界を配置します。その方法はちょうど二通りしかありません。パッキングは相手の支持者を少数の選挙区に集め、そこで圧倒的な差で勝たせます。すると何万票もが代表一人しか生みません。クラッキングは残りを多数の選挙区に分散させ、そこではわずかな差で負けさせます。するとその票は誰も当選させません。どちらも合法で、どちらも個々の集計は正確なままであり、二つが合わさると少数派の有権者が多数の議席を選ぶことが可能になります。持ち帰る価値のある帰結が二つあります。第一に、選挙区の形は弱い手がかりであって証拠ではなく、これは両方向に効きます。奇怪な輪郭は川や市境の結果として無邪気に生じることがあり、整った長方形が地域社会を二分するために丁寧に引かれていることもあります。だからこそ真面目な現代の研究は形をまったく見ません。かわりに、その州自身が定めた規則に従って何千もの代替区割りをコンピューターで生成し、同じ実際の票をそれぞれで数え直し、実際に採用された区割りがその分布のどこに位置するかを問います。中立な区割りではほとんど生じない結果を生む区割りがある、それが所見であり、この手法は複数の政党が引いた区割りを言い当ててきました。第二に、そしてより応用が利くこととして、同じ推論は政治のはるか外側にも当てはまります。成果が誰かの選んだ単位の内側で測られるときはいつでも、それが営業地域であれ通学区であれ病院グループであれ部門の区分であれ、単位の選び方は結果の一部です。誰がその境界をいつ引いたのか、そして別の引き方をしてもその答えは生き残るのかを問うてください。",
  "How the same question is answered today": "同じ問いに今日どう答えるか",
  "Modern work replaces argument about shapes with a distribution. One study generated 24,518 alternative district maps for a US state by computer, following that state's own stated redistricting rules, then retallied the same real votes on every one of them. The enacted maps produced a seat split that appeared in less than one per cent of those alternatives, while a map drawn separately by a bipartisan panel of retired judges behaved like a typical map from the pile. That second finding is the useful one for this lesson: a drawing process without a stake in the outcome produced an unremarkable outcome, which is what makes the question about the enacted map a question about who drew it rather than about which party they belonged to.": "現代の研究は、形をめぐる議論を分布に置き換えます。ある研究は、アメリカのある州について、その州自身が定めた区割り規則に従い、24,518通りの代替区割りをコンピューターで生成し、そのすべてで同じ実際の票を数え直しました。実際に採用された区割りが生む議席配分は、それら代替案の1パーセント未満でしか現れませんでした。一方、退職判事からなる超党派の委員会が別に引いた区割りは、山の中の典型的な一枚と同じようにふるまいました。この二つ目の所見こそがこの授業にとって有用です。結果に利害を持たない線引きの過程は、ごく平凡な結果を生んだのです。だからこそ、採用された区割りについての問いは、それを引いたのが誰かという問いであって、その人たちがどの政党に属していたかという問いではなくなります。",
  "Gerrymandering, a reasoning trap.": "ゲリマンダー、という思考の罠。",
  "Massachusetts, 1812. One party won the popular vote for the state senate, 51,766 against 50,164. It received eleven of the forty seats. The other party, which had redrawn the district boundaries a few months earlier, took twenty-nine. Nobody miscounted anything: when votes are tallied inside districts, whoever draws the districts has already chosen part of the answer. A newspaper thought one of the new districts looked like a salamander and named it after the governor who signed it, Elbridge Gerry. Both those parties are long gone and the practice is not. Whenever a result is measured inside units that someone chose, ask who chose them.": "1812年のマサチューセッツ。ある政党が州上院選の総得票で勝ちました。51,766票対50,164票です。その党が得た議席は四十のうち十一。数か月前に選挙区の境界を引き直していたもう一方の政党が、二十九議席を取りました。誰も数え間違いなどしていません。票が選挙区の内側で集計されるとき、選挙区を引く者はすでに答えの一部を選んでいるのです。新しい選挙区のひとつがサンショウウオに似ていると考えた新聞が、それに署名した知事エルブリッジ・ゲリーの名を付けました。その二つの政党はとうに消え、この手法は消えていません。何かの結果が誰かの選んだ単位の内側で測られているときはいつでも、誰が選んだのかを問うてください。",
  "The four figures are printed together on one page and reconcile two ways: 51,766 plus 50,164 is exactly the 101,930 total the same sentence gives, and 11 plus 29 is the 40 seats of the chamber, so the party numbers are confirmed by a total stated independently of them. This case was chosen over far better modern evidence for one reason. The rigorous contemporary work analyses maps drawn by a named living party and concludes they were extreme, which would make one side look uniquely foolish; here both parties have been extinct for two centuries, so the same mathematics carries no partisan charge. Three limits. The party Griffith calls the Democrats is the Democratic-Republican party of Jefferson and Madison, which is not the ancestor of any single modern party and should not be read as one. Griffith is a 1907 secondary work on 1812 sources, which is the standard scholarly account of the episode's origin but is not a modern reanalysis of the returns. And a single election cannot show that the map caused the gap rather than the geography, which is precisely the question the modern ensemble method exists to answer, and why it is the deep-dive example rather than a footnote.": "四つの数字は同じ一ページに一緒に印字されており、二通りに整合します。51,766に50,164を足すと、同じ文が示す合計101,930にちょうど一致し、11に29を足すと議場の40議席になります。つまり政党ごとの数字は、それらとは独立に述べられた合計によって裏づけられています。この事例を、はるかに優れた現代の証拠より優先したのには理由がひとつあります。厳密な現代の研究は、名前のある現存政党が引いた区割りを分析し、それが極端だったと結論します。それでは一方の側だけが愚かに見えてしまいます。ここでは二つの政党とも二世紀前に消滅しているので、同じ算数がいかなる党派的な帯電も伴いません。限界が三つあります。グリフィスが民主党と呼ぶ政党は、ジェファソンとマディソンの民主共和党であり、現代のどの単一政党の祖先でもなく、そのように読んではいけません。グリフィスは1812年の資料に基づく1907年の二次文献で、この出来事の起源についての標準的な学術的記述ではありますが、開票結果の現代的な再分析ではありません。そして単一の選挙では、格差を生んだのが地理ではなく区割りであることを示せません。それこそ現代のアンサンブル手法が答えるために存在する問いであり、だからこそそれが脚注ではなく深掘りの例になっています。",
  "A party wins 48 percent of the votes cast across a region and takes 70 percent of the seats. The party's chairman says the result shows the public clearly preferred them.": "ある政党が地域全体で投じられた票の48パーセントを得て、議席の70パーセントを獲得します。党首は、この結果は有権者が明らかに自党を選んだことを示していると述べます。",
  "Fewer than half the voters chose them, so the seat count is a fact about how the boundaries gathered votes rather than about what the public preferred. Seats and votes are two different countings.": "その党を選んだのは有権者の半分未満ですから、議席数は境界が票をどうまとめたかについての事実であって、有権者が何を選んだかについての事実ではありません。議席と票は別々の二つの数え方です。",
  "Boundaries for the next election are drawn by a committee controlled by one of the parties contesting it. That party then outperforms its vote share, and a spokesman calls the outcome a neutral consequence of geography.": "次の選挙の境界を、その選挙を争う政党の一つが支配する委員会が引きます。その後その党は得票率を上回る成績を収め、報道官はこの結果を地理がもたらした中立な帰結だと呼びます。",
  "Geography may well matter, but it cannot be assumed when the people who drew the lines had a stake in the result. The way to separate the two is to compare the enacted map against many maps drawn without a stake.": "地理は確かに効きうるのですが、線を引いた人々が結果に利害を持っていた場合、それを前提にはできません。両者を切り分ける方法は、採用された区割りを、利害なしに引かれた多数の区割りと比べることです。",
  "A commentator points to a district with a strange snaking outline and says its shape proves the map was manipulated.": "ある論者が、奇妙に蛇行した輪郭の選挙区を指し、その形こそ区割りが操作された証拠だと述べます。",
  "Shape is a weak clue in both directions: an odd outline can follow a river or a coastline, and a tidy rectangle can split a community deliberately. What settles it is how the map performs against alternatives, not how it looks.": "形は両方向に弱い手がかりです。奇妙な輪郭は川や海岸線に沿っているだけかもしれず、整った長方形が意図的に地域社会を分断していることもあります。決め手になるのは、その区割りが代替案と比べてどうふるまうかであって、見た目ではありません。",
  "A manager redraws the sales regions, then reports that his own team now leads on the share of regions hitting target, even though total sales per person are unchanged.": "ある管理職が営業地域を引き直し、その後、目標を達成した地域の割合で自分のチームが首位になったと報告します。一人あたりの売上は変わっていません。",
  "The underlying performance did not move; only the boundaries the performance is counted inside did. Whenever results are measured within units somebody chose, the choice of unit is part of the result.": "根底の成績は動いておらず、動いたのはそれを数える境界だけです。成果が誰かの選んだ単位の内側で測られるときはいつでも、単位の選び方は結果の一部です。",
  "One district returns a candidate with 91 percent of its vote while six neighbouring districts are lost by two or three points each. A report describes the 91 percent as a stronghold and evidence of deep support.": "ある選挙区が91パーセントの得票で候補者を当選させる一方、隣接する六つの選挙区はいずれも二、三ポイント差で落としています。ある報告はこの91パーセントを牙城と呼び、支持の厚さの証拠だとします。",
  "A 91 percent result means tens of thousands of votes elected exactly one representative, while the narrow losses next door elected none. That pattern is the signature of packing, and it converts real support into very few seats.": "91パーセントという結果は、何万票もがちょうど一人の代表しか当選させなかったことを意味し、隣の惜敗はひとりも当選させませんでした。この型はパッキングの署名であり、実在する支持をごくわずかな議席に変えてしまいます。",
  "A council redraws school catchment boundaries and afterwards reports that the proportion of schools meeting the intake target has improved, with no change in the number of pupils or places.": "ある自治体が通学区の境界を引き直し、その後、定員目標を満たす学校の割合が改善したと報告します。児童数も定員数も変わっていません。",
  "Nothing about the pupils or the schools changed, so the improvement is entirely in where the lines were put. This is the same move as an electoral gerrymander, applied to catchments.": "児童についても学校についても何ひとつ変わっていないので、改善はすべて線をどこに置いたかにあります。これは選挙のゲリマンダーとまったく同じ手を、通学区に適用したものです。",
  "A researcher finds that in the states where one party controlled redistricting, its seat share exceeded its vote share, and concludes that this party is uniquely willing to manipulate boundaries.": "ある研究者が、一方の政党が区割りを支配していた州ではその党の議席率が得票率を上回っていたことを見いだし、この政党だけが境界を操作しようとするのだと結論づけます。",
  "The comparison needed is against states where the other party controlled the process, not against nothing. Without it, the finding is about who held the pen in the sample examined rather than about any party's character.": "必要な比較は、もう一方の政党が過程を支配していた州との比較であって、何とも比べないことではありません。それがなければ、この所見は調べた標本の中で誰が筆を握っていたかについての話であり、どの政党の性質についての話でもありません。",
  "Asked whether a new map is fair, an official replies that every district contains almost exactly the same number of people, so the map cannot favour anyone.": "新しい区割りは公正かと問われ、ある担当者は、どの選挙区もほぼ正確に同じ人口を含んでいるのだから、この区割りが誰かを有利にすることはありえないと答えます。",
  "Equal population is necessary and nowhere near sufficient. Maps with perfectly equal districts can produce almost any seat outcome, because what matters is which voters are grouped together, not how many.": "人口の均等は必要条件であり、十分条件からはほど遠いものです。完全に人口の等しい選挙区からなる区割りでも、ほぼどんな議席配分でも生み出せます。重要なのはどの有権者が一緒にまとめられるかであって、何人いるかではないからです。",
  "A regulator reorganises hospitals into new trusts and then reports that fewer trusts are now failing its standard, using the same underlying hospital-level data as before.": "ある規制当局が病院を新しいグループに再編し、その後、自らの基準を満たさないグループが減ったと報告します。用いているのは以前とまったく同じ病院単位のデータです。",
  "The hospitals performed the same before and after; only the groupings they are judged in changed. Counting failures at the level of a boundary somebody redrew measures the redrawing as much as the performance.": "病院の成績は前も後も同じで、変わったのはそれを判定するまとまりだけです。誰かが引き直した境界の水準で不合格を数えることは、成績と同じくらい引き直しのほうを測っています。",
  "A single election produces a large gap between one party's vote share and its seat share, and an analyst treats this as proof that the map was drawn to produce that gap.": "一回の選挙で、ある政党の得票率と議席率のあいだに大きな差が生じ、ある分析者はこれを、その差を生むように区割りが引かれた証拠だとみなします。",
  "One election cannot separate the map from the geography, since supporters of a party may genuinely be concentrated in cities whoever draws the lines. Establishing intent needs the same votes retallied on many alternative maps.": "一回の選挙では区割りと地理を切り分けられません。誰が線を引こうと、ある政党の支持者が実際に都市部に集中していることはありうるからです。意図を立証するには、同じ票を多数の代替区割りで数え直す必要があります。",
  "Before judging a district map, a team generates thousands of alternative maps by computer under the jurisdiction's own stated rules, retallies the same real votes on each, and reports where the enacted map falls in that distribution.": "ある区割りを評価する前に、あるチームがその管轄自身の定めた規則に従って何千もの代替区割りをコンピューターで生成し、それぞれで同じ実際の票を数え直し、採用された区割りがその分布のどこに位置するかを報告します。",
  "This is the method designed for the question: it holds the votes and the rules fixed and varies only the boundaries, so an unusual result cannot be explained away by geography. It is also blind to which party drew the map.": "これはこの問いのために設計された手法です。票と規則を固定し、境界だけを変えるので、異例の結果を地理のせいにすることができません。しかも誰がその区割りを引いたかについては目隠しされています。",
  "Boundaries are drawn by a commission whose members are barred from standing in the elections concerned and who are given the population and geography data without party registration or past results.": "境界を引くのは、当該選挙に立候補することを禁じられた委員からなる委員会であり、彼らには政党登録も過去の選挙結果も伏せたまま、人口と地理のデータだけが渡されます。",
  "The people drawing the lines have no stake in the outcome and lack the information needed to favour anyone even if they wished to. That is a process designed against the problem rather than a claim of good intentions.": "線を引く人々は結果に利害を持たず、仮に誰かを有利にしたいと思ったとしてもそのための情報を持っていません。これは善意の表明ではなく、問題に対抗するよう設計された過程です。",
  "An election report gives both the seat totals and the vote totals for each party side by side, and notes the size of the gap between them without asserting a cause.": "ある選挙報道が、各党の議席総数と得票総数を並べて示し、両者の差の大きさを指摘したうえで、その原因については断定しません。",
  "Publishing both countings and declining to explain the gap without evidence is exactly right. The gap is real and worth showing; attributing it to the map would need the comparison this report does not claim to have made.": "二つの数え方をともに公表し、証拠なしに差を説明することを控えるのは、まったく正しい態度です。差は実在し、示す価値があります。それを区割りのせいだとするには、この報道が行ったと主張していない比較が必要になります。",
};
