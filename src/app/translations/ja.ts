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
};
