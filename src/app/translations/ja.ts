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
  "Whenever a screening programme is defended with how well its detected cases do, ask what kind of disease a periodic test can catch. A tumour that takes years to declare itself is available to be found on many visits; one that goes from nothing to symptoms in three months is available on almost none. The only fair question is whether deaths fall in everyone offered screening.":
    "検診プログラムが、見つけた症例の経過の良さをもって擁護されているときはいつでも、定期的な検査がどんな種類の病気を捉えられるのかを問いましょう。自らを現すまでに何年もかかる腫瘍には、見つけてもらえる受診機会が何度もあります。何もない状態から3か月で症状に至る腫瘍には、その機会がほとんどありません。公平な問いはただ1つ、検診を提供された全員のなかで死亡が減るかどうかです。",
  "Picture the same disease arriving in two speeds. Slow tumours spend years in the window where a test could find them but the patient feels nothing. Fast ones cross that window in weeks. Now sample the population every six months. You will find nearly all the slow ones and almost none of the fast ones, because the fast ones announce themselves between your visits. So the pile of screen-detected cases is loaded with indolent disease, and the pile of symptom-detected cases is loaded with aggressive disease, before treatment enters the story at all. Compare their outcomes and screening looks wonderful. At the extreme edge of this sits overdiagnosis: disease so slow it would never have troubled the person in their lifetime, which counts as a cancer found and cured while doing nothing but harm through the treatment. The defence is the same one that beats lead-time bias, and it is the reason screening programmes are judged the way they are: randomise who is invited, then count deaths in everyone invited, attended or not, diagnosed or not.":
    "同じ病気が2つの速さで訪れるところを思い描いてください。進行の遅い腫瘍は、検査なら見つけられるのに患者本人は何も感じない、という窓のなかに何年もとどまります。進行の速い腫瘍は、その窓を数週間で通り抜けます。ここで、集団を6か月ごとに調べてみましょう。あなたは進行の遅いものをほぼすべて見つけ、進行の速いものはほとんど見つけられません。速いものは、受診と受診のあいだに自ら名乗り出るからです。だから検診で見つかった症例の山にはおとなしい病気が詰まり、症状で見つかった症例の山には勢いの強い病気が詰まります。治療がまだ物語に登場すらしていない段階で、そうなっているのです。両者の経過を比べれば、検診は見事なものに映ります。この延長線上の極端な端にあるのが過剰診断です。あまりに進行が遅く、その人の生涯を通じて一度も困らせることのなかったはずの病気であり、それが見つかって治ったがんとして数えられる一方で、治療を通じて害を及ぼす以外には何もしません。備えとなるのは、リードタイムバイアスを打ち破るのと同じものです。そして、検診プログラムがあのようなやり方で評価されるのも、そのためです。誰を招くかを無作為に決め、そのうえで、招かれた全員について死亡を数えるのです。実際に足を運んだかどうかも、診断されたかどうかも問わずに。",
  "The trial's own explanation": "試験自身による説明",
  "The authors did not attribute the gap to better treatment. They noted that similar mortality alongside better survival points to lesions of limited clinical relevance being found in the screened arm. Twenty years of follow-up did not rescue the result: deaths from lung cancer were 337 among 4,607 screened men and 303 among 4,585 others, a difference in the wrong direction and not statistically significant.":
    "著者らは、この差を治療の良さによるものとは考えませんでした。死亡率がほぼ同じでありながら生存が良いという組み合わせは、検診を受けた群で臨床的な意味の乏しい病変が見つかっていることを示している、と指摘しています。20年の追跡でもこの結果は覆りませんでした。肺がんによる死亡は、検診を受けた男性4,607人のうち337人、それ以外の4,585人のうち303人で、差は望ましくない向きであり、統計的にも有意ではありませんでした。",
  "Why screening is judged on deaths, not survival":
    "検診が生存ではなく死亡で評価される理由",
  "This is not a historical curiosity. National screening programmes are assessed on whether they lower deaths from the disease in the whole invited population, precisely because survival among detected cases can be lifted by three separate artefacts without a single life being extended. A programme that raises five-year survival and leaves mortality untouched has, on the evidence, done nothing except give more people the label.":
    "これは歴史上の珍事ではありません。国の検診プログラムは、招かれた集団全体でその病気による死亡が減るかどうかで評価されます。見つかった症例のあいだの生存は、誰ひとり寿命が延びていなくても、3つの別々のみせかけの効果によって押し上げられうるからです。5年生存率を上げながら死亡率をまったく動かさないプログラムは、エビデンスに照らせば、より多くの人に病名を与えた以外に何もしていません。",
  "Length-time bias, a reasoning trap.": "長さバイアス、推論の罠です。",
  "A test you run every few months finds slow-growing disease far more easily than fast-growing disease, because slow disease sits there for years waiting to be found while fast disease erupts between visits. Slow disease also has a better outlook whatever anyone does. So the cases a screening programme catches are the gentle ones, and they do well, and the programme takes the credit. The only number that cannot be gamed this way is deaths in everyone offered screening, whether or not they attended.":
    "数か月ごとに行う検査は、進行の速い病気より進行の遅い病気のほうを、はるかにたやすく見つけます。進行の遅い病気は見つけられるのを待ちながら何年もそこにとどまり、進行の速い病気は受診と受診のあいだに噴き出すからです。しかも進行の遅い病気は、誰が何をしようと見通しが良いのです。だから検診プログラムが捉える症例はおとなしいものばかりで、その人たちは経過が良く、手柄はプログラムのものになります。この手でごまかせない唯一の数字は、実際に足を運んだかどうかにかかわらず、検診を提供された全員のうちの死亡数です。",
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
};
