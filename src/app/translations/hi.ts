/**
 * Hindi dictionary: English source string, Hindi (Devanagari) translation. Keys
 * must match the English text exactly. Correct in place.
 */
export const hi: Record<string, string> = {
  // ---- UI chrome (buttons, labels, section headers) ----
  "The skill": "यह कौशल",
  "Where this shows up": "यह कहाँ दिखता है",
  "See it in the wild": "इसे असल जीवन में देखें",
  "Why it happens": "ऐसा क्यों होता है",
  "Same trap, other places": "वही जाल, दूसरी जगहों पर",
  Source: "स्रोत",
  "Make my card →": "मेरा कार्ड बनाएँ →",
  "Go deeper on this idea →": "इस विचार में और गहराई से जाएँ →",
  "Commit to see the reveal. No peeking.":
    "उत्तर देखने के लिए चुनें। झाँकना मना है।",
  "Reveal the answer": "उत्तर दिखाएँ",
  "Name the skill →": "कौशल का नाम बताएँ →",
  "Play again": "फिर से खेलें",
  "The lurking variable": "छिपा हुआ चर",
  "Nicely done, you didn't take the number at face value.":
    "बढ़िया किया, आपने संख्या को यूँ ही सच नहीं मान लिया।",
  "So does almost everyone. That's exactly the trap.":
    "लगभग हर कोई ऐसा ही करता है। यही तो असली जाल है।",
  "You caught it": "आपने इसे पकड़ लिया",
  "Most people miss this": "ज़्यादातर लोग इसे नहीं पकड़ पाते",
  "You picked": "आपने चुना",
  Replay: "फिर से खेलें",
  "Who each treatment actually treated":
    "हर उपचार ने असल में किसका इलाज किया",
  "So what's the skill? →": "तो कौशल क्या है? →",
  // scope tags (right of the figure caption)
  Overall: "कुल मिलाकर",
  "By subgroup": "उपसमूह के अनुसार",
  "The facts": "तथ्य",
  "The reality": "हकीकत",
  Observed: "जो दिखा",
  Explained: "जिसकी व्याख्या हुई",
  Survivors: "बचे हुए",
  "The full picture": "पूरी तस्वीर",
  // category names (humanized)
  "Causal reasoning": "कारण संबंधी तर्क",
  "Statistical reasoning": "सांख्यिकीय तर्क",
  // tags
  Everyday: "रोज़मर्रा",
  Clinical: "नैदानिक",
  Research: "शोध",
  Statistics: "सांख्यिकी",
  Diagnosis: "निदान",
  Screening: "स्क्रीनिंग",
  Epidemiology: "महामारी विज्ञान",
  Pharmacology: "औषध विज्ञान",
  Psychology: "मनोविज्ञान",
  Biology: "जीव विज्ञान",
  Technology: "प्रौद्योगिकी",
  Economics: "अर्थशास्त्र",
  Politics: "राजनीति",
  Education: "शिक्षा",
  Finance: "वित्त",
  Business: "व्यवसाय",
  Law: "कानून",
  Sports: "खेल",
  History: "इतिहास",
  Media: "मीडिया",
  "Demo · try any puzzle": "डेमो · कोई भी पहेली आज़माएँ",
  // frequency view (base-rate puzzle)
  "1 in": "1 बटा",
  "How common it is": "यह कितना आम है",
  "Test catches it": "परीक्षण इसे पकड़ लेता है",
  Always: "हमेशा",
  "False-alarm rate": "झूठे अलार्म की दर",
  "Positive tests": "पॉज़िटिव परीक्षण",
  of: "बटा",
  actually: "असल में",
  chance: "संभावना",
  "false alarm": "झूठा अलार्म",
  // wager + stats
  "How sure are you?": "आप कितने निश्चित हैं?",
  Hunch: "अनुमान",
  "Fairly sure": "काफ़ी हद तक निश्चित",
  Certain: "पूरा यकीन",
  "Pick one, then stake how sure you are":
    "एक चुनें, फिर दाँव लगाएँ कि आप कितने निश्चित हैं",
  pts: "अंक",
  Today: "आज",
  Streak: "सिलसिला",
  Best: "सर्वश्रेष्ठ",
  Caught: "पकड़े गए",
  Calibration: "कैलिब्रेशन",
  "You beat {pct}% of players today":
    "आज आपने {pct}% खिलाड़ियों को पीछे छोड़ा",
  "A new puzzle every day. Keep the streak alive.":
    "हर दिन एक नई पहेली। सिलसिला बनाए रखें।",
  "Sharp eye, and you called it.":
    "पैनी नज़र, और आपने पहले ही भाँप लिया।",
  "Nicely spotted.": "बढ़िया पकड़ा।",
  "Good instinct.": "अच्छी सहज बुद्धि।",
  "Ouch. Confidently wrong, the classic trap.":
    "आह। पूरे यकीन के साथ गलत, वही चिरपरिचित जाल।",
  "So does almost everyone. That's the trap.":
    "लगभग हर कोई ऐसा ही करता है। यही तो जाल है।",
  "You sensed something was off, but went with it anyway.":
    "आपको लगा कि कुछ गड़बड़ है, फिर भी आप उसी के साथ चले गए।",
  // friends board
  "Friends board": "दोस्तों की रैंकिंग",
  "Your name": "आपका नाम",
  "Copy result": "नतीजा कॉपी करें",
  Copied: "कॉपी हो गया",
  Share: "साझा करें",
  "Paste your friends' results here":
    "अपने दोस्तों के नतीजे यहाँ चिपकाएँ",
  "Add to board": "रैंकिंग में जोड़ें",
  // trap hunt
  "Trap Hunt": "जाल की तलाश",
  "Some of these are sound. Some hide a trap.":
    "इनमें से कुछ तर्क सही हैं। कुछ में जाल छिपा है।",
  "Sound reasoning": "तर्क सही है",
  "There's a trap": "इसमें जाल है",
  "Which trap?": "कौन सा जाल?",
  Rank: "रैंक",
  Done: "पूरा हुआ",
  "Trap Hunt unlocked": "जाल की तलाश अनलॉक हुई",
  "Can you still spot the traps?":
    "क्या आप अब भी जाल पहचान सकते हैं?",
  Novice: "नौसिखिया",
  Sceptic: "संशयी",
  Detective: "जासूस",
  Analyst: "विश्लेषक",
  "Sharp eye": "पैनी नज़र",

  // ---- shared share-card captions ----
  "Caught it. Bet you can't.": "मैंने पकड़ लिया। देखें आप पकड़ पाते हैं क्या।",
  "I totally fell for this.": "मैं पूरी तरह इस झाँसे में आ गया।",

  // ==== Simpson's paradox (kidney stones) ====
  "Treatment B cures more patients overall. Which would you pick?":
    "उपचार B कुल मिलाकर ज़्यादा मरीज़ों को ठीक करता है। आप कौन सा चुनेंगे?",
  "Two kidney-stone treatments, 350 patients each. On overall success rate, Treatment B comes out ahead. Same illness, same goal, one number to go on.":
    "गुर्दे की पथरी के दो उपचार, हर एक में 350 मरीज़। कुल सफलता दर के आधार पर उपचार B आगे निकलता है। वही बीमारी, वही लक्ष्य, फैसले के लिए बस एक संख्या।",
  "Which treatment would you pick?": "आप कौन सा उपचार चुनेंगे?",
  "Success rate": "सफलता दर",
  "Treatment A, open surgery": "उपचार A, खुली सर्जरी",
  "Treatment B, keyhole (PCNL)": "उपचार B, कीहोल (PCNL)",
  "Small stones": "छोटी पथरी",
  "Large stones": "बड़ी पथरी",
  "Treatment B": "उपचार B",
  "83% overall": "कुल 83%",
  "Treatment A": "उपचार A",
  "78% overall": "कुल 78%",
  "Treatment A actually wins, for both stone sizes.":
    "असल में उपचार A जीतता है, दोनों आकार की पथरी के लिए।",
  "Stone size (case severity)":
    "पथरी का आकार (मामले की गंभीरता)",
  "A and B weren't treating the same patients. A got mostly the hard cases (large stones), while B got mostly the easy ones. Everyone does worse on hard cases, so A's overall average sinks even though A wins in each group:":
    "A और B एक ही तरह के मरीज़ों का इलाज नहीं कर रहे थे। A को ज़्यादातर मुश्किल मामले (बड़ी पथरी) मिले, जबकि B को ज़्यादातर आसान मामले। मुश्किल मामलों में सभी का प्रदर्शन गिरता है, इसलिए A का कुल औसत नीचे चला जाता है, भले ही A हर समूह में जीतता हो:",
  "Simpson's paradox": "सिम्पसन का विरोधाभास",
  "An overall trend can reverse once you account for a lurking variable that's split unevenly between the groups.":
    "कोई कुल प्रवृत्ति उलट सकती है जैसे ही आप किसी ऐसे छिपे हुए चर को ध्यान में लेते हैं जो समूहों के बीच असमान रूप से बँटा हो।",
  "Whenever two groups are compared with one pooled rate, ask what got mixed together to make that number, and whether the groups were even up against the same odds. Stone size is the clearest confounder here; it's rarely the only one.":
    "जब भी दो समूहों की तुलना किसी एक मिलीजुली दर से की जाए, तो पूछें कि वह संख्या बनाने के लिए किन चीज़ों को आपस में मिलाया गया, और क्या दोनों समूह सचमुच एक ही जैसी परिस्थितियों का सामना कर रहे थे। यहाँ पथरी का आकार सबसे स्पष्ट भ्रामक कारक है; यह शायद ही कभी अकेला होता है।",
  "The 'combined' score isn't a fresh measurement; it's the group scores blended together, and bigger groups count for more. When one side is packed with easy cases and the other with hard ones, that blend pulls their combined scores in opposite directions. So one option can lead in the easy group and in the hard group, yet still trail overall, because it handled most of the hard cases, and its blended score sits closer to that lower number. The cure is a fair split: give both sides the same mix of easy and hard cases (exactly what a randomised trial does), and the reversal can't happen.":
    "‘संयुक्त’ स्कोर कोई नया माप नहीं है; यह समूहों के स्कोर को आपस में मिलाकर बनता है, और बड़े समूहों का वज़न ज़्यादा होता है। जब एक तरफ़ आसान मामले भरे हों और दूसरी तरफ़ मुश्किल, तो यह मिश्रण उनके संयुक्त स्कोर को विपरीत दिशाओं में खींचता है। इसलिए कोई विकल्प आसान समूह में भी और मुश्किल समूह में भी आगे रह सकता है, फिर भी कुल मिलाकर पीछे रह जाता है, क्योंकि उसने ज़्यादातर मुश्किल मामले संभाले, और उसका मिलाजुला स्कोर उस कम संख्या के करीब बैठता है। इसका इलाज है एक निष्पक्ष बँटवारा: दोनों पक्षों को आसान और मुश्किल मामलों का एक ही मिश्रण दें (ठीक वही जो एक यादृच्छिक परीक्षण करता है), और तब यह उलटफेर हो ही नहीं सकता।",
  "University admissions": "विश्वविद्यालय में दाखिले",
  "In 1973, Berkeley's graduate schools admitted 44% of men but only 35% of women. It looked like plain bias. Yet department by department, women were admitted at about the same rate as men, or higher. Women simply applied more often to the most competitive departments, where almost everyone was turned away. The gap was about where people applied, not who was deciding.":
    "1973 में, बर्कले के स्नातकोत्तर विभागों ने 44% पुरुषों को दाखिला दिया लेकिन केवल 35% महिलाओं को। यह साफ़ पक्षपात जैसा लगा। फिर भी विभाग दर विभाग देखने पर, महिलाओं को लगभग पुरुषों जितनी ही या उससे ज़्यादा दर पर दाखिला मिला। दरअसल महिलाएँ ज़्यादातर सबसे प्रतिस्पर्धी विभागों में आवेदन करती थीं, जहाँ लगभग सभी को अस्वीकार कर दिया जाता था। फ़र्क इस बात का था कि लोग कहाँ आवेदन कर रहे थे, न कि कौन फ़ैसला ले रहा था।",
  "Baseball batting averages": "बेसबॉल में बैटिंग औसत",
  "David Justice out-hit Derek Jeter in 1995 (.253 to .250) and again in 1996 (.321 to .314). But over the two seasons combined, Jeter came out ahead, .310 to .270. Each single year said Justice; the two years together said Jeter, because the players had very different numbers of at-bats in their strong and weak seasons.":
    "डेविड जस्टिस ने 1995 में (.253 बनाम .250) और फिर 1996 में (.321 बनाम .314) डेरेक जीटर से बेहतर बल्लेबाज़ी की। लेकिन दोनों सीज़न मिलाकर जीटर आगे रहा, .310 बनाम .270। हर अकेला साल जस्टिस के पक्ष में था; दोनों साल मिलकर जीटर के पक्ष में, क्योंकि खिलाड़ियों के अपने अच्छे और खराब सीज़न में बल्लेबाज़ी के मौकों (at-bats) की संख्या बहुत अलग थी।",
  "COVID-19 death rates": "कोविड-19 मृत्यु दर",
  "Early in 2020, the reported death rate among COVID cases was higher in Italy than in China overall. But broken down by age, Italy's rate was lower in every age group. Italy simply had far more older patients, who are at higher risk, so pooling all ages together made Italy look worse than a fair, age-for-age comparison showed.":
    "2020 की शुरुआत में, कोविड मामलों में रिपोर्ट की गई मृत्यु दर कुल मिलाकर इटली में चीन से ज़्यादा थी। लेकिन उम्र के हिसाब से बाँटने पर, हर आयु वर्ग में इटली की दर कम थी। दरअसल इटली में कहीं ज़्यादा बुज़ुर्ग मरीज़ थे, जिनका जोखिम ज़्यादा होता है, इसलिए सभी उम्रों को एक साथ जोड़ देने से इटली, आयु दर आयु निष्पक्ष तुलना की अपेक्षा बदतर दिखने लगा।",
  "Simpson's paradox, a reasoning trap.":
    "सिम्पसन का विरोधाभास, तर्क का एक जाल।",
  "One choice can win in every single group, yet lose the moment you lump all the groups together. It sounds impossible, but it's real. It happens when the groups aren't a fair comparison: one side quietly got the easy cases, the other got the hard ones. So the big combined number says one thing while the group-by-group numbers say the opposite, and it's the big number that fools you.":
    "कोई एक विकल्प हर एक समूह में जीत सकता है, फिर भी उसी पल हार जाता है जब आप सभी समूहों को एक साथ जोड़ देते हैं। यह असंभव लगता है, पर यह सच है। ऐसा तब होता है जब समूह एक निष्पक्ष तुलना नहीं होते: एक पक्ष को चुपचाप आसान मामले मिल गए, दूसरे को मुश्किल। इसलिए बड़ा संयुक्त आँकड़ा एक बात कहता है जबकि समूह दर समूह आँकड़े उसके उलट कहते हैं, और यही बड़ा आँकड़ा आपको धोखा देता है।",
  "The 350/350 two-treatment table is as presented by Julious & Mullee (1994), drawn from the Charig et al. (1986) clinical series (which originally compared three modalities).":
    "350/350 वाली दो उपचारों की तालिका ठीक वैसी ही है जैसी Julious और Mullee (1994) ने प्रस्तुत की, जो Charig और सहयोगियों (1986) की नैदानिक शृंखला से ली गई है (जिसमें मूल रूप से तीन उपचार विधियों की तुलना की गई थी)।",

  // ==== Base-rate fallacy (medical test) ====
  "A near-perfect test says you're sick. How worried should you be?":
    "एक लगभग सटीक परीक्षण कहता है कि आप बीमार हैं। आपको कितना चिंतित होना चाहिए?",
  "This disease is rare, about 1 in 1,000 people have it. The test never misses it when it's really there, and it raises a false alarm on only about 1 in 20 healthy people. Your result just came back positive.":
    "यह बीमारी दुर्लभ है: लगभग 1,000 में से 1 व्यक्ति को होती है। जब बीमारी सचमुच मौजूद हो तो यह परीक्षण उसे कभी नहीं चूकता, और यह केवल लगभग 20 स्वस्थ लोगों में से 1 पर झूठा अलार्म देता है। आपका परिणाम अभी अभी पॉज़िटिव आया है।",
  "What's the chance you actually have the disease?":
    "इस बात की क्या संभावना है कि आपको सचमुच यह बीमारी है?",
  "In 1,000 people": "1,000 लोगों में",
  "have the disease": "रोगग्रस्त",
  "test positive": "जाँच पॉज़िटिव",
  "About 95%": "लगभग 95%",
  "the test is 95% accurate": "परीक्षण 95% सटीक है",
  "About half": "लगभग आधी",
  "50/50": "50/50",
  "About 2%": "लगभग 2%",
  "roughly 1 in 50": "लगभग 50 में से 1",
  "Positive, but almost certainly a false alarm.":
    "पॉज़िटिव, लेकिन लगभग निश्चित रूप से एक झूठा अलार्म।",
  "The base rate": "आधार दर",
  "A rare disease flips the odds":
    "एक दुर्लभ बीमारी संभावनाओं को पलट देती है",
  "Because almost nobody has the disease, the test's small error rate does the heavy lifting. In 1,000 people, only 1 is truly sick, but about 50 healthy people also get a positive. So among the ~51 positive results, just 1 is real. A positive barely nudges you from “very unlikely” to “still unlikely.”":
    "चूँकि लगभग किसी को भी यह बीमारी नहीं है, इसलिए परीक्षण की छोटी सी त्रुटि दर ही सारा असर डाल देती है। 1,000 लोगों में केवल 1 सचमुच बीमार है, पर लगभग 50 स्वस्थ लोग भी पॉज़िटिव आ जाते हैं। तो लगभग 51 पॉज़िटिव परिणामों में से केवल 1 ही असली है। एक पॉज़िटिव परिणाम आपको बमुश्किल “बहुत असंभव” से “अब भी असंभव” तक ही खिसकाता है।",
  "The base-rate fallacy": "आधार दर का भ्रम",
  "When something is rare, even a very accurate test throws up far more false alarms than real cases, so a positive result can still mean you're probably fine.":
    "जब कोई चीज़ दुर्लभ होती है, तो बहुत सटीक परीक्षण भी असली मामलों से कहीं ज़्यादा झूठे अलार्म पैदा करता है, इसलिए पॉज़िटिव परिणाम का मतलब अब भी यह हो सकता है कि आप शायद ठीक हैं।",
  "The fix is to think in whole people, not percentages: picture 1,000 of them, count the true positives and the false alarms, and compare. Always ask how common the thing is before you trust a positive.":
    "इसका हल है प्रतिशत में नहीं, बल्कि पूरे लोगों में सोचना: 1,000 लोगों की कल्पना करें, असली पॉज़िटिव और झूठे अलार्म गिनें, और तुलना करें। किसी पॉज़िटिव परिणाम पर भरोसा करने से पहले हमेशा पूछें कि वह चीज़ कितनी आम है।",
  "A test's accuracy and your actual odds are two different things. Accuracy is measured on people we already know are sick or healthy. But a positive result asks the reverse question (given this positive, am I sick?), and that depends on how many sick people there were to find in the first place. If only 1 in 1,000 has the disease, the huge healthy majority produces a flood of false alarms that swamps the single real case. Make the disease common and the same test looks excellent; make it rare and a positive means little on its own.":
    "किसी परीक्षण की सटीकता और आपकी असली संभावना दो अलग चीज़ें हैं। सटीकता उन लोगों पर मापी जाती है जिनके बारे में हम पहले से जानते हैं कि वे बीमार हैं या स्वस्थ। पर पॉज़िटिव परिणाम उल्टा सवाल पूछता है (यह पॉज़िटिव देखते हुए, क्या मैं बीमार हूँ?), और यह इस पर निर्भर करता है कि खोजने के लिए बीमार लोग शुरू में कितने थे। अगर 1,000 में से केवल 1 को ही बीमारी है, तो स्वस्थ लोगों का विशाल बहुमत झूठे अलार्म की बाढ़ पैदा करता है जो उस इकलौते असली मामले को दबा देती है। बीमारी को आम बना दें तो वही परीक्षण शानदार लगता है; उसे दुर्लभ बना दें तो पॉज़िटिव अपने आप में कोई खास मायने नहीं रखता।",
  "Even doctors slip": "यहाँ तक कि डॉक्टर भी चूक जाते हैं",
  "Researchers put this exact question to doctors and medical staff: a disease in 1 in 1,000, a test with a 5% false-alarm rate. The most common answer was 95%. The average was 56%. Only about 1 in 5 gave the correct answer of roughly 2%.":
    "शोधकर्ताओं ने ठीक यही सवाल डॉक्टरों और चिकित्सा कर्मचारियों से पूछा: 1,000 में से 1 को होने वाली एक बीमारी, और 5% झूठे अलार्म दर वाला एक परीक्षण। सबसे आम जवाब था 95%। औसत था 56%। केवल लगभग 5 में से 1 ने लगभग 2% का सही जवाब दिया।",
  "Think in people, not percentages":
    "प्रतिशत में नहीं, लोगों में सोचें",
  "The simplest cure is wording. Pose the same problem in natural frequencies (“1 in 1,000 people” and “about 50 false alarms” rather than “0.1%” and “5%”), and far more people, doctors included, get it right.":
    "सबसे आसान उपाय है शब्दों का चुनाव। वही समस्या प्राकृतिक आवृत्तियों में रखें (“1,000 लोगों में से 1” और “लगभग 50 झूठे अलार्म”, न कि “0.1%” और “5%”), और कहीं ज़्यादा लोग, डॉक्टरों समेत, सही जवाब देते हैं।",
  "The base-rate fallacy, a reasoning trap.":
    "आधार दर का भ्रम, तर्क का एक जाल।",
  "A test can be 95% accurate and a positive result can still mean you're almost certainly fine. The trick is how rare the thing is. If only 1 in 1,000 people have a disease, then among everyone who tests positive, the few real cases are buried under a pile of false alarms. Accuracy isn't the same as your actual odds; you have to ask how common it is first.":
    "एक परीक्षण 95% सटीक हो सकता है और फिर भी पॉज़िटिव परिणाम का मतलब यह हो सकता है कि आप लगभग निश्चित रूप से ठीक हैं। असली पेच यह है कि वह चीज़ कितनी दुर्लभ है। अगर 1,000 लोगों में से केवल 1 को ही कोई बीमारी है, तो पॉज़िटिव आने वाले सभी लोगों में से चंद असली मामले झूठे अलार्म के ढेर के नीचे दबे रहते हैं। सटीकता आपकी असली संभावना जैसी नहीं होती; पहले यह पूछना होगा कि वह कितनी आम है।",

  // ==== Correlation is not causation (chocolate / Nobel) ====
  "More chocolate, more Nobel Prizes. Should your country stock up?":
    "जितनी ज़्यादा चॉकलेट, उतने ज़्यादा नोबेल पुरस्कार। क्या आपके देश को इसका भंडार जमा कर लेना चाहिए?",
  "It's a real, published finding: across 23 countries, the more chocolate people eat, the more Nobel laureates the country has produced, a strong correlation (r ≈ 0.79). The trend is hard to argue with.":
    "यह एक असली, प्रकाशित निष्कर्ष है: 23 देशों में, लोग जितनी ज़्यादा चॉकलेट खाते हैं, उस देश ने उतने ही ज़्यादा नोबेल विजेता पैदा किए हैं, एक मज़बूत सहसंबंध (r ≈ 0.79)। इस प्रवृत्ति को नकारना मुश्किल है।",
  "So, does eating chocolate help win Nobel Prizes?":
    "तो, क्या चॉकलेट खाना नोबेल पुरस्कार जीतने में मदद करता है?",
  "Across 23 countries": "23 देशों में",
  "Chocolate eaten": "खाई गई चॉकलेट",
  "Nobel prizes": "नोबेल पुरस्कार",
  "A country's wealth": "देश की समृद्धि",
  "r ≈ 0.79": "r ≈ 0.79",
  "Yes, chocolate boosts brainpower":
    "हाँ, चॉकलेट दिमागी ताकत बढ़ाती है",
  "the trend is strong": "प्रवृत्ति मज़बूत है",
  "No, it's a pure fluke": "नहीं, यह महज़ इत्तेफ़ाक है",
  coincidence: "संयोग",
  "No, a third thing drives both":
    "नहीं, कोई तीसरी चीज़ दोनों को चलाती है",
  "a common cause": "एक साझा कारण",
  "The chocolate isn't doing anything.": "चॉकलेट का इसमें कोई हाथ नहीं है।",
  "The common cause": "साझा कारण",
  "A country's wealth pulls both up":
    "देश की समृद्धि दोनों को ऊपर खींचती है",
  "Wealthier countries can afford more chocolate AND fund more universities, labs and research, which is what actually wins Nobel Prizes. Wealth drives both, so chocolate and Nobels rise together without one causing the other. Hand out free chocolate and you'd get sweeter teeth, not more laureates.":
    "ज़्यादा समृद्ध देश ज़्यादा चॉकलेट भी खरीद सकते हैं और ज़्यादा विश्वविद्यालयों, प्रयोगशालाओं और शोध को भी पैसा दे सकते हैं, और असल में यही नोबेल पुरस्कार जिताता है। समृद्धि दोनों को चलाती है, इसलिए चॉकलेट और नोबेल साथ साथ बढ़ते हैं, बिना किसी एक के दूसरे का कारण बने। मुफ़्त चॉकलेट बाँट दें तो आपको ज़्यादा मीठे दाँत मिलेंगे, ज़्यादा विजेता नहीं।",
  "Correlation ≠ causation": "सहसंबंध ≠ कारणता",
  "Two things moving together doesn't mean one causes the other. Often a third thing is quietly driving both.":
    "दो चीज़ों का साथ चलना इसका मतलब नहीं कि एक दूसरे का कारण है। अक्सर कोई तीसरी चीज़ चुपचाप दोनों को चला रही होती है।",
  "When you see a strong link, run through the possibilities before believing X causes Y: maybe Y causes X, maybe a common cause drives both, or maybe it's chance. Usually only a controlled comparison can tell which.":
    "जब आपको कोई मज़बूत संबंध दिखे, तो यह मानने से पहले कि X, Y का कारण है, सभी संभावनाओं पर विचार करें: हो सकता है Y, X का कारण हो, हो सकता है कोई साझा कारण दोनों को चला रहा हो, या हो सकता है यह महज़ संयोग हो। आम तौर पर केवल एक नियंत्रित तुलना ही बता सकती है कि कौन सी बात सही है।",
  "A correlation only says two things tend to move together. That can happen for several reasons: one really does cause the other; the causation runs the other way; a hidden third factor drives both (a common cause, like hot weather driving both ice-cream sales and drownings); or it's a coincidence, which gets more likely the more data you sift through. Spotting a correlation is the easy part. Working out which of these is behind it is the real job, and usually needs an experiment, not just a chart.":
    "सहसंबंध केवल यह कहता है कि दो चीज़ें साथ साथ बदलने की प्रवृत्ति रखती हैं। ऐसा कई कारणों से हो सकता है: सचमुच एक दूसरे का कारण हो; कारणता उल्टी दिशा में चलती हो; कोई छिपा तीसरा कारक दोनों को चलाता हो (एक साझा कारण, जैसे गर्म मौसम, जो आइसक्रीम की बिक्री और डूबने की घटनाओं, दोनों को बढ़ाता है); या यह एक संयोग हो, जिसकी संभावना जितना ज़्यादा डेटा आप छानते हैं उतनी ही बढ़ती जाती है। सहसंबंध पहचान लेना आसान हिस्सा है। इनमें से कौन सा इसके पीछे है, यह पता लगाना ही असली काम है, और इसके लिए आम तौर पर केवल एक ग्राफ़ नहीं, बल्कि एक प्रयोग चाहिए।",
  "Storks and babies": "सारस और शिशु",
  "Across European countries, the ones with more storks really do have more human births, a statistically significant link. The legend isn't true: larger countries simply have room for both more storks and more people.":
    "यूरोपीय देशों में, जिनके पास ज़्यादा सारस हैं उनमें सचमुच ज़्यादा मानव जन्म होते हैं, एक सांख्यिकीय रूप से सार्थक संबंध। पर वह किंवदंती सच नहीं है: बड़े देशों में बस ज़्यादा सारस और ज़्यादा लोग, दोनों के लिए जगह होती है।",
  "Nicolas Cage and drownings": "निकोलस केज और डूबने की घटनाएँ",
  "The number of films Nicolas Cage releases in a year tracks the number of people who drown in swimming pools. Nobody thinks one causes the other; line up enough unrelated trends and some will match by pure chance.":
    "निकोलस केज एक साल में जितनी फ़िल्में रिलीज़ करते हैं, वह संख्या स्विमिंग पूल में डूबने वाले लोगों की संख्या के साथ मेल खाती है। कोई नहीं मानता कि एक दूसरे का कारण है; बिना संबंध वाली पर्याप्त प्रवृत्तियाँ कतार में लगा दें तो कुछ महज़ संयोग से मेल खा जाएँगी।",
  "Correlation ≠ causation, a reasoning trap.":
    "सहसंबंध ≠ कारणता, तर्क का एक जाल।",
  "Two things can rise and fall together perfectly and still have nothing to do with each other. Very often a hidden third thing is pulling both strings at once, so it looks like one causes the other when neither does. Before you believe a headline that “X is linked to Y,” ask what else could be driving both.":
    "दो चीज़ें पूरी तरह एक साथ बढ़ और घट सकती हैं और फिर भी उनका आपस में कोई लेना देना न हो। बहुत बार कोई छिपी तीसरी चीज़ एक साथ दोनों की डोर खींच रही होती है, जिससे लगता है कि एक दूसरे का कारण है, जबकि कोई भी नहीं होता। इससे पहले कि आप यह सुर्खी मान लें कि “X का Y से संबंध है,” पूछें कि और क्या दोनों को चला सकता है।",

  // ==== Survivorship bias (bombers) ====
  "Bombers come home riddled with bullet holes. Where do you add the armour?":
    "बमवर्षक विमान गोलियों के छेदों से भरे हुए घर लौटते हैं। आप कवच कहाँ लगाएँगे?",
  "In WWII, returning bombers were peppered with damage, heaviest on the wings and body, while the engines and cockpit came back almost untouched. Armour is heavy, so you can only reinforce a few areas.":
    "द्वितीय विश्व युद्ध में, लौटने वाले बमवर्षक क्षति से भरे होते थे, सबसे ज़्यादा पंखों और धड़ पर, जबकि इंजन और कॉकपिट लगभग अछूते लौटते थे। कवच भारी होता है, इसलिए आप केवल कुछ ही हिस्सों को मज़बूत कर सकते हैं।",
  "Where should the armour go?": "कवच कहाँ लगाना चाहिए?",
  "Returning bombers": "लौटते बमवर्षक",
  "hits on planes that came back": "लौटे विमानों पर लगे प्रहार",
  "armour here, the lost planes' hits":
    "यहाँ कवच, खोए विमानों के प्रहार",
  "The wings and body": "पंख और धड़",
  "where the holes are": "जहाँ छेद हैं",
  "Spread it evenly": "इसे समान रूप से फैलाएँ",
  "play it safe": "सुरक्षित रास्ता अपनाएँ",
  "The engines and cockpit": "इंजन और कॉकपिट",
  "where there are no holes": "जहाँ कोई छेद नहीं है",
  "Armour where the holes aren't.":
    "कवच वहाँ लगाएँ जहाँ छेद नहीं हैं।",
  "The missing planes": "गायब विमान",
  "You only see the survivors": "आप केवल बचे हुओं को देखते हैं",
  "These are the planes that made it home. The ones hit in the engine or cockpit didn't, so their damage never shows up in the data. The holes on the survivors map out exactly where a bomber can be shot and still fly. The clean spots are the fatal ones: armour those.":
    "ये वे विमान हैं जो घर लौट आए। जो इंजन या कॉकपिट पर लगे, वे नहीं लौटे, इसलिए उनकी क्षति आँकड़ों में कभी नहीं दिखती। बचे हुए विमानों पर मौजूद छेद ठीक ठीक बताते हैं कि बमवर्षक कहाँ लगने पर भी उड़ता रह सकता है। जो हिस्से साफ़ हैं, वही जानलेवा हैं: कवच वहीं लगाएँ।",
  "Survivorship bias": "उत्तरजीविता पूर्वाग्रह",
  "When you only look at the winners, the failures become invisible, and they often hold the real lesson.":
    "जब आप केवल जीतने वालों को देखते हैं, तो असफलताएँ अदृश्य हो जाती हैं, और असली सबक अक्सर उन्हीं में छिपा होता है।",
  "Before drawing a conclusion, ask who's missing from the data. The planes that didn't return, the funds that closed, the businesses that folded: they were quietly filtered out, and putting them back can flip the answer.":
    "कोई निष्कर्ष निकालने से पहले पूछें कि आँकड़ों से कौन गायब है। जो विमान नहीं लौटे, जो फंड बंद हो गए, जो व्यवसाय ठप हो गए: उन्हें चुपचाप छाँटकर हटा दिया गया, और उन्हें वापस जोड़ देने से जवाब पलट सकता है।",
  "Survivorship bias creeps in whenever your data has quietly been filtered to keep only the things that “made it”: returning planes, funds still trading, companies still around. You never see the ones that failed and dropped out, and because the survivors share whatever helped them survive, that trait looks far more common, or more effective, than it really is. The fix is to hunt for the missing group and ask what the full picture would show. (The real Wald did more than point at a diagram: he built a statistical method to estimate each part's vulnerability from the survivors' damage.)":
    "उत्तरजीविता पूर्वाग्रह तब घर कर जाता है जब आपके आँकड़ों को चुपचाप इस तरह छाँट दिया गया हो कि केवल वही चीज़ें बचें जो “कामयाब” रहीं: लौटे विमान, अब भी कारोबार में मौजूद फंड, अब भी टिकी हुई कंपनियाँ। जो नाकाम होकर बाहर हो गए, उन्हें आप कभी नहीं देखते, और चूँकि बचे हुओं में वह गुण साझा होता है जिसने उन्हें बचाया, वह गुण असल से कहीं ज़्यादा आम, या ज़्यादा कारगर, दिखता है। इसका हल है उस गायब समूह को खोजना और पूछना कि पूरी तस्वीर क्या दिखाएगी। (असली वाल्ड ने महज़ किसी आरेख की ओर इशारा करने से ज़्यादा किया: उन्होंने बचे हुओं की क्षति से हर हिस्से की कमज़ोरी का अनुमान लगाने की एक सांख्यिकीय विधि बनाई।)",
  "Falling cats": "गिरती हुई बिल्लियाँ",
  "Vets found that cats falling from higher floors often arrived with fewer injuries than those from lower floors. Part of the reason is grim survivorship: a cat that didn't survive the fall was never brought in, so the hospital's data only counts the ones that lived.":
    "पशु चिकित्सकों ने पाया कि ऊँची मंज़िलों से गिरने वाली बिल्लियाँ अक्सर नीची मंज़िलों वाली बिल्लियों की तुलना में कम चोटों के साथ पहुँचती थीं। इसका एक कारण एक भयावह उत्तरजीविता है: जो बिल्ली गिरने से नहीं बची, उसे कभी लाया ही नहीं गया, इसलिए अस्पताल के आँकड़े केवल उन्हीं को गिनते हैं जो जीवित रहीं।",
  "Star mutual funds": "सितारा म्यूचुअल फंड",
  "Look at the funds still on offer today and active management looks great. But funds that did badly get quietly closed and dropped from the records, so the survivors flatter the whole industry. Counting the dead funds cuts the average return by over a percentage point a year.":
    "आज भी उपलब्ध फंडों को देखें तो सक्रिय प्रबंधन शानदार लगता है। पर जो फंड खराब प्रदर्शन करते हैं उन्हें चुपचाप बंद कर दिया जाता है और रिकॉर्ड से हटा दिया जाता है, इसलिए बचे हुए फंड पूरे उद्योग की छवि चमका देते हैं। बंद हो चुके फंडों को भी गिन लें तो औसत प्रतिफल साल में एक प्रतिशत अंक से भी ज़्यादा घट जाता है।",
  "Survivorship bias, a reasoning trap.":
    "उत्तरजीविता पूर्वाग्रह, तर्क का एक जाल।",
  "It's easy to study the winners, the survivors, the successes, the things still standing, and copy what they have in common. But the failures are invisible: they dropped out of the data. Whatever helped the survivors survive looks far more powerful than it is, because you never see everyone it didn't save. Before copying the winners, ask who's missing.":
    "जीतने वालों, बचे हुओं, कामयाबियों और अब भी टिकी हुई चीज़ों का अध्ययन करना और उनमें जो समान है उसकी नकल करना आसान है। पर नाकामियाँ अदृश्य होती हैं: वे आँकड़ों से बाहर हो गईं। जिस चीज़ ने बचे हुओं को बचाया वह असल से कहीं ज़्यादा ताकतवर दिखती है, क्योंकि आप उन सबको कभी नहीं देखते जिन्हें उसने नहीं बचाया। जीतने वालों की नकल करने से पहले पूछें कि कौन गायब है।",

  // ==== Prosecutor's fallacy (People v. Collins) ====
  "A 1 in 12 million match. Case closed?":
    "1.2 करोड़ में से 1 जैसा मिलान। मामला खत्म?",
  "Los Angeles, 1964. A woman is knocked down and her purse is taken. Witnesses describe the pair who ran off: a blonde woman with a ponytail and a bearded Black man, in a partly yellow car. A couple who fit every detail are charged. At the trial an expert is asked to assume a frequency for each feature, multiplies them together, and gets 1 in 12 million. The prosecutor tells the jury that is the chance the two in the dock are innocent. Take the 1 in 12 million at face value, and picture the 12 million couples who could have been the ones.":
    "लॉस एंजेलिस, 1964। एक महिला को गिराकर उसका पर्स छीन लिया जाता है। गवाह भागने वाली जोड़ी का हुलिया बताते हैं: पोनीटेल वाली सुनहरे बालों वाली एक महिला और दाढ़ी वाला एक अश्वेत पुरुष, आंशिक रूप से पीली कार में। एक जोड़ा, जो हर ब्योरे पर खरा उतरता है, आरोपित किया जाता है। मुकदमे में एक विशेषज्ञ से कहा जाता है कि वह हर विशेषता के लिए एक आवृत्ति मान ले; वह उन सबको आपस में गुणा करता है और 1.2 करोड़ में 1 का आँकड़ा निकालता है। अभियोजक जूरी से कहता है कि कठघरे में खड़े उन दोनों के निर्दोष होने की संभावना इतनी ही है। 1.2 करोड़ में 1 को जस का तस मान लीजिए, और उन 1.2 करोड़ जोड़ों की कल्पना कीजिए जो वे लोग हो सकते थे।",
  "This couple fits the description. What are the odds they did it?":
    "यह जोड़ा हुलिये पर खरा उतरता है। इनके ही यह करने की संभावना कितनी है?",
  "In 12 million couples": "1.2 करोड़ जोड़ों में",
  "did it": "असली अपराधी",
  "fit the description": "हुलिये से मेल",
  "Virtually certain": "लगभग निश्चित",
  "12 million to one against them": "1.2 करोड़ बनाम 1, उनके खिलाफ़",
  "Around 99%": "लगभग 99%",
  "not quite proof, but close": "पूरा सबूत नहीं, पर उसके करीब",
  "About a coin flip": "लगभग सिक्का उछालने जैसी",
  "roughly 50/50": "करीब 50/50",
  "One in 12 million, and still a coin flip.":
    "1.2 करोड़ में 1, और फिर भी सिक्के का उछाल।",
  "The flipped question": "उलटा हुआ सवाल",
  "Rare evidence is common in a big crowd":
    "बड़ी भीड़ में दुर्लभ सबूत भी आम हो जाता है",
  "The 1 in 12 million answers one question: pick a couple at random, how likely are they to fit? The jury has to answer a different one: of all the couples who do fit, which pair did it? Line up 12 million couples. One pair are the robbers, and of course they fit. But at odds of 1 in 12 million, roughly one more couple in that crowd fits by pure chance. So a couple who fits is about as likely to be innocent as guilty.":
    "1.2 करोड़ में 1 का आँकड़ा एक सवाल का जवाब देता है: कोई एक जोड़ा यूँ ही चुन लीजिए, उसके हुलिये से मेल खाने की संभावना कितनी है? जूरी को एक अलग सवाल का जवाब देना है: जितने भी जोड़े हुलिये से मेल खाते हैं, उनमें से यह किसने किया? 1.2 करोड़ जोड़ों को कतार में खड़ा कीजिए। एक जोड़ा लुटेरों का है, और ज़ाहिर है वह मेल खाता है। लेकिन 1.2 करोड़ में 1 की संभावना पर, उस भीड़ में करीब एक और जोड़ा महज़ इत्तेफ़ाक से मेल खा जाता है। इसलिए जो जोड़ा हुलिये से मेल खाता है, उसके निर्दोष होने की संभावना लगभग उतनी ही है जितनी दोषी होने की।",
  "The California Supreme Court reversed the conviction in 1968. Working from the prosecution's own figures, it found a likelihood of over 40 percent that at least one other couple could have fitted the description just as well, and it warned that guilt cannot be settled by arithmetic like this.":
    "कैलिफ़ोर्निया के सर्वोच्च न्यायालय ने 1968 में यह सज़ा पलट दी। अभियोजन पक्ष के अपने ही आँकड़ों पर काम करते हुए उसने पाया कि 40 प्रतिशत से ज़्यादा संभावना है कि कम से कम एक और जोड़ा उस हुलिये पर उतनी ही अच्छी तरह खरा उतरता, और उसने चेताया कि इस तरह के गणित से अपराध तय नहीं किया जा सकता।",
  "The prosecutor's fallacy": "अभियोजक का भ्रम",
  "“If he were innocent, this evidence would be that unlikely” is not the same as “this evidence makes him that unlikely to be innocent.” Swap the two and a coin flip starts to sound like certainty.":
    "“अगर वह निर्दोष होता, तो यह सबूत इतना असंभव होता” कहना वही बात नहीं है जो “यह सबूत उसके निर्दोष होने को इतना असंभव बना देता है”। दोनों को आपस में बदल दीजिए और सिक्के का उछाल पक्के यकीन जैसा सुनाई देने लगता है।",
  "Before you accept a one in a million match, ask how big the pool was. One in a million odds across a city of ten million throw up about ten matches, and only one of those people did it. The number means nothing until you say who was in the crowd.":
    "दस लाख में 1 वाले किसी मिलान को मानने से पहले पूछिए कि पूल कितना बड़ा था। एक करोड़ की आबादी वाले शहर में दस लाख में 1 की संभावना करीब दस मिलान पैदा करती है, और उनमें से केवल एक व्यक्ति ने ही वह किया होता है। जब तक आप यह न बताएँ कि भीड़ में कौन कौन था, तब तक उस संख्या का कोई मतलब नहीं।",
  "Two questions sound identical and are not. The first: if this person had nothing to do with it, how likely is this evidence? That is what a lab or an expert can actually measure, and it is where figures like 1 in 12 million come from. The second: given this evidence, how likely is it that this person did it? That is what a jury has to decide, and it depends on something no lab measures, namely how many people could have done it. Push odds of 1 in 12 million through a crowd of 12 million and you expect about one innocent match, so the match on its own is worth roughly a coin flip. Shrink the crowd, or add independent evidence, and the same match becomes powerful. Grow the crowd, and it becomes weak. The trap also runs in reverse: a defence lawyer can say that 2,000 people in the city share that blood type, so the evidence proves nothing, which quietly ignores that the other 1,999 were nowhere near the crime.":
    "दो सवाल एक जैसे सुनाई देते हैं, पर हैं नहीं। पहला: अगर इस व्यक्ति का इससे कोई लेना देना न होता, तो यह सबूत मिलने की संभावना कितनी होती? यही वह चीज़ है जिसे कोई प्रयोगशाला या विशेषज्ञ सचमुच माप सकता है, और 1.2 करोड़ में 1 जैसे आँकड़े यहीं से आते हैं। दूसरा: यह सबूत देखते हुए, इस बात की संभावना कितनी है कि यह काम इसी व्यक्ति ने किया? यही वह चीज़ है जो जूरी को तय करनी होती है, और यह ऐसी बात पर निर्भर करती है जिसे कोई प्रयोगशाला नहीं मापती, यानी यह कि कितने लोग ऐसा कर सकते थे। 1.2 करोड़ में 1 की संभावना को 1.2 करोड़ की भीड़ में चलाइए और करीब एक निर्दोष मिलान की उम्मीद बनती है, इसलिए अकेला मिलान करीब सिक्के के उछाल जितना ही मूल्य रखता है। भीड़ छोटी कर दीजिए, या कोई स्वतंत्र सबूत जोड़ दीजिए, और वही मिलान ताकतवर हो जाता है। भीड़ बढ़ा दीजिए, और वह कमज़ोर पड़ जाता है। यह जाल उल्टी दिशा में भी चलता है: बचाव पक्ष का वकील कह सकता है कि शहर में 2,000 लोगों का खून का समूह वही है, इसलिए यह सबूत कुछ भी साबित नहीं करता, जो चुपचाप इस बात को नज़रअंदाज़ कर देता है कि बाकी 1,999 लोग अपराध के आसपास कहीं भी नहीं थे।",
  "Two cot deaths, and a number that became guilt":
    "पालने में दो मौतें, और एक संख्या जो अपराध बन गई",
  "An English murder trial heard that the chance of two cot deaths in a family like the defendant's was 1 in 73 million. Press reports turned that into the chance the deaths were natural. The Royal Statistical Society said publicly that the figure had no statistical basis, because it assumed the two deaths were independent, and that reading it as a chance of innocence is the prosecutor's fallacy. What the jury needed was a comparison: two cot deaths and two murders are both rare, so which is rarer here?":
    "इंग्लैंड के एक हत्या मुकदमे में कहा गया कि अभियुक्त जैसे परिवार में पालने में दो मौतों की संभावना 7.3 करोड़ में 1 है। अख़बारों की रिपोर्टों ने इसे यह संभावना बना दिया कि मौतें प्राकृतिक थीं। रॉयल स्टैटिस्टिकल सोसाइटी ने सार्वजनिक रूप से कहा कि इस आँकड़े का कोई सांख्यिकीय आधार नहीं है, क्योंकि इसमें मान लिया गया था कि दोनों मौतें एक दूसरे से स्वतंत्र थीं, और इसे निर्दोष होने की संभावना के रूप में पढ़ना ही अभियोजक का भ्रम है। जूरी को जिसकी ज़रूरत थी वह एक तुलना थी: पालने में दो मौतें और दो हत्याएँ, दोनों ही दुर्लभ हैं, तो यहाँ ज़्यादा दुर्लभ कौन सी है?",
  "Almost nobody spots the swap": "अदला बदली को लगभग कोई नहीं पकड़ पाता",
  "Researchers gave 73 students a murder case in which the killer's blood type is found in 1 person in 100, then showed them a prosecution argument built on the swapped question: only a 1 percent chance the blood came from someone else, so a 99 percent chance the suspect is guilty. 21 of the 73 rated that argument correct, and only 16 saw that it and the opposing defence argument were both wrong.":
    "शोधकर्ताओं ने 73 छात्रों को हत्या का एक मामला दिया जिसमें हत्यारे का खून का समूह 100 में से 1 व्यक्ति में पाया जाता है, फिर उन्हें अभियोजन पक्ष की एक दलील दिखाई जो उलटे सवाल पर टिकी थी: केवल 1 प्रतिशत संभावना कि खून किसी और का था, इसलिए 99 प्रतिशत संभावना कि संदिग्ध दोषी है। 73 में से 21 ने उस दलील को सही ठहराया, और केवल 16 ही यह देख पाए कि वह दलील और उसके विपरीत बचाव पक्ष की दलील, दोनों गलत थीं।",
  "The prosecutor's fallacy, a reasoning trap.":
    "अभियोजक का भ्रम, तर्क का एक जाल।",
  "When an expert says there is only a one in a million chance of a match by accident, that is a fact about the evidence, not about the person in the dock. Flip the two around and you get the prosecutor's fallacy. The cure is to ask how many people were in the pool: one in a million odds across a city of ten million produce about ten innocent matches, so on its own a match can be nowhere near proof.":
    "जब कोई विशेषज्ञ कहता है कि इत्तेफ़ाक से मिलान होने की संभावना दस लाख में केवल 1 है, तो यह सबूत के बारे में एक तथ्य है, कठघरे में खड़े व्यक्ति के बारे में नहीं। दोनों को आपस में पलट दीजिए और आपको अभियोजक का भ्रम मिल जाता है। इसका इलाज है यह पूछना कि पूल में कितने लोग थे: एक करोड़ की आबादी वाले शहर में दस लाख में 1 की संभावना करीब दस निर्दोष मिलान पैदा करती है, इसलिए अकेला मिलान सबूत के आसपास भी नहीं होता।",
  "Spotted the swap. Bet you don't.":
    "अदला बदली पकड़ ली। देखें आप पकड़ पाते हैं क्या।",
  "I'd have convicted on the spot.": "मैं तो वहीं के वहीं सज़ा सुना देता।",
  "The court's appendix showed that on those same figures, with a pool of about 12 million couples, the chance that at least one other couple fitted the description was roughly 41 percent.":
    "अदालत के परिशिष्ट ने दिखाया कि उन्हीं आँकड़ों पर, करीब 1.2 करोड़ जोड़ों के पूल के साथ, कम से कम एक और जोड़े के उस हुलिये से मेल खाने की संभावना करीब 41 प्रतिशत थी।",

  // ==== Trap Hunt items (scenarios + explanations) ====
  "Two schools publish exam results. School B has the higher pass rate overall, 75% against 70%. When results are split by student background, School A comes out ahead in every single group. The district praises School B.":
    "दो स्कूल परीक्षा परिणाम प्रकाशित करते हैं। कुल मिलाकर स्कूल B की उत्तीर्ण दर ज़्यादा है, 75% बनाम 70%। जब परिणामों को छात्रों की पृष्ठभूमि के हिसाब से बाँटा जाता है, तो हर एक समूह में स्कूल A आगे निकलता है। ज़िला प्रशासन स्कूल B की तारीफ़ करता है।",
  "A wins in every group but loses overall, which happens when the groups are mixed unevenly. The pooled number is the misleading one here.":
    "A हर समूह में जीतता है पर कुल मिलाकर हार जाता है, जो तब होता है जब समूहों का मिश्रण असमान हो। यहाँ भ्रामक संख्या मिलीजुली कुल संख्या ही है।",
  "A factory reports its new process has a lower defect rate than the old one, 3% against 4%. Looking at simple parts and complex parts separately, the old process had fewer defects in both.":
    "एक कारखाना बताता है कि उसकी नई प्रक्रिया में पुरानी के मुकाबले खराबी की दर कम है, 3% बनाम 4%। सरल पुर्ज़ों और जटिल पुर्ज़ों को अलग अलग देखने पर, दोनों में पुरानी प्रक्रिया में कम खराबियाँ थीं।",
  "Better in both categories yet worse overall means the two processes handled very different mixes of simple and complex parts.":
    "दोनों श्रेणियों में बेहतर होकर भी कुल मिलाकर बदतर होने का मतलब है कि दोनों प्रक्रियाओं ने सरल और जटिल पुर्ज़ों के बहुत अलग अलग मिश्रण संभाले।",
  "A condition affects about 1 in 2,000 people. A screening test is 99% accurate. A patient tests positive and is told they almost certainly have the condition.":
    "एक बीमारी लगभग 2,000 में से 1 व्यक्ति को होती है। एक स्क्रीनिंग परीक्षण 99% सटीक है। एक मरीज़ की जाँच पॉज़िटिव आती है और उससे कहा जाता है कि उसे लगभग निश्चित रूप से यह बीमारी है।",
  "With a condition this rare, the 1% error rate produces far more false positives than there are real cases, so a positive is still more likely to be a false alarm.":
    "इतनी दुर्लभ बीमारी के साथ, 1% की त्रुटि दर असली मामलों से कहीं ज़्यादा झूठे पॉज़िटिव पैदा करती है, इसलिए पॉज़िटिव परिणाम के झूठा अलार्म होने की संभावना अब भी ज़्यादा है।",
  "A system flags travellers as suspicious and is 95% accurate. About 1 in 1,000 travellers is actually a threat. An official states that a flagged traveller is 95% likely to be a threat.":
    "एक प्रणाली यात्रियों को संदिग्ध के रूप में चिह्नित करती है और 95% सटीक है। लगभग 1,000 में से 1 यात्री सचमुच खतरा होता है। एक अधिकारी कहता है कि चिह्नित किए गए यात्री के खतरा होने की संभावना 95% है।",
  "That confuses the test's accuracy with the odds after a flag. Because threats are rare, the overwhelming majority of flags are ordinary travellers.":
    "यह परीक्षण की सटीकता को चिह्नित हो जाने के बाद की संभावना समझ लेना है। चूँकि खतरे दुर्लभ हैं, इसलिए चिह्नित लोगों में भारी बहुमत आम यात्रियों का ही होता है।",
  "Neighbourhoods with more parks have lower obesity rates. A council report concludes that building parks will reduce obesity, and proposes a park-building programme.":
    "जिन मोहल्लों में ज़्यादा पार्क हैं वहाँ मोटापे की दर कम है। नगर परिषद की एक रिपोर्ट यह निष्कर्ष निकालती है कि पार्क बनाने से मोटापा घटेगा, और पार्क बनाने का एक कार्यक्रम प्रस्तावित करती है।",
  "Wealth and urban planning plausibly drive both park provision and health, so the link may not be the parks doing the work.":
    "समृद्धि और शहरी नियोजन, दोनों ही पार्कों की उपलब्धता और सेहत को चला सकते हैं, इसलिए हो सकता है कि इस संबंध के पीछे पार्कों का काम न हो।",
  "Students who visit the library more often get higher grades. A university announces mandatory weekly library visits to raise grades.":
    "जो छात्र पुस्तकालय ज़्यादा बार जाते हैं उन्हें बेहतर अंक मिलते हैं। एक विश्वविद्यालय अंक बढ़ाने के लिए हर हफ़्ते पुस्तकालय जाना अनिवार्य करने की घोषणा करता है।",
  "Motivated students both study more and visit the library. Forcing the visit does not import the motivation that produced the grades.":
    "प्रेरित छात्र ज़्यादा पढ़ते भी हैं और पुस्तकालय भी जाते हैं। जाना अनिवार्य कर देने से वह प्रेरणा नहीं आ जाती जिसने वे अंक दिलाए थे।",
  "A business book studies companies that have thrived for fifty years and finds nearly all had bold, risk-taking leaders. It concludes that bold leadership causes lasting success.":
    "एक व्यावसायिक किताब उन कंपनियों का अध्ययन करती है जो पचास साल से फल फूल रही हैं और पाती है कि लगभग सभी के नेता साहसी और जोखिम लेने वाले थे। वह निष्कर्ष निकालती है कि साहसी नेतृत्व ही टिकाऊ कामयाबी का कारण है।",
  "The bold companies that went under are not in the sample. Boldness may equally well cause spectacular failure, which the study cannot see.":
    "जो साहसी कंपनियाँ डूब गईं वे इस नमूने में हैं ही नहीं। हो सकता है कि साहस उतनी ही आसानी से शानदार नाकामी का कारण भी बनता हो, जिसे यह अध्ययन देख ही नहीं सकता।",
  "A clinic reviews patients who completed its demanding rehabilitation programme and finds excellent outcomes. It reports the programme as highly effective.":
    "एक क्लिनिक उन मरीज़ों की समीक्षा करता है जिन्होंने उसका कठिन पुनर्वास कार्यक्रम पूरा किया और उनके नतीजे बेहतरीन पाता है। वह कार्यक्रम को बहुत असरदार बताता है।",
  "Patients who dropped out are excluded, and they are likely the ones doing worst. Counting only finishers flatters the programme.":
    "जो मरीज़ बीच में छोड़ गए उन्हें शामिल ही नहीं किया गया, और संभवतः उन्हीं के नतीजे सबसे खराब हैं। केवल पूरा करने वालों को गिनना कार्यक्रम की छवि चमका देता है।",
  "A database search turns up one man whose DNA matches a crime-scene sample. The lab reports that the profile occurs in about 1 person in a million. The prosecutor tells the jury there is therefore about a one in a million chance that he is innocent.":
    "एक डेटाबेस खोज में एक ऐसा व्यक्ति मिलता है जिसका डीएनए अपराध स्थल के नमूने से मेल खाता है। प्रयोगशाला बताती है कि यह प्रोफ़ाइल लगभग दस लाख में से 1 व्यक्ति में पाई जाती है। अभियोजक जूरी से कहता है कि इसलिए उसके निर्दोष होने की संभावना करीब दस लाख में 1 है।",
  "The 1 in a million is the chance of a match if he is innocent, not the chance he is innocent given a match. In a large pool other people match too, so the two numbers are nowhere near the same.":
    "दस लाख में 1 का आँकड़ा यह संभावना है कि अगर वह निर्दोष है तो भी मिलान हो जाए, न कि यह संभावना कि मिलान होने पर वह निर्दोष है। बड़े पूल में दूसरे लोग भी मेल खाते हैं, इसलिए ये दोनों संख्याएँ एक जैसी होने के आसपास भी नहीं हैं।",
  "Fibres on a suspect's coat match the victim's carpet. An expert says only about 1 coat in 5,000 would carry such fibres. Counsel concludes the suspect is 4,999 times more likely to be guilty than innocent.":
    "एक संदिग्ध के कोट पर लगे रेशे पीड़ित के कालीन से मेल खाते हैं। एक विशेषज्ञ कहता है कि 5,000 में से केवल लगभग 1 कोट पर ही ऐसे रेशे होंगे। वकील निष्कर्ष निकालता है कि संदिग्ध के दोषी होने की संभावना निर्दोष होने से 4,999 गुना ज़्यादा है।",
  "A rarity figure describes the evidence, not the person. How many innocent people could have picked up those fibres depends on how many people were ever near that carpet.":
    "दुर्लभता का आँकड़ा सबूत का वर्णन करता है, व्यक्ति का नहीं। कितने निर्दोष लोगों पर वे रेशे लग सकते थे, यह इस पर निर्भर करता है कि कितने लोग कभी उस कालीन के पास आए थे।",
  "An expert testifies that the DNA profile occurs in roughly 1 person in a million, and adds that in a city of two million this means about two other people would be expected to match as well, so the match alone does not single out the defendant.":
    "एक विशेषज्ञ गवाही देता है कि यह डीएनए प्रोफ़ाइल करीब दस लाख में से 1 व्यक्ति में पाई जाती है, और यह भी जोड़ता है कि बीस लाख की आबादी वाले शहर में इसका मतलब है कि करीब दो और लोगों के भी मेल खाने की उम्मीद होगी, इसलिए अकेला मिलान अभियुक्त को अलग से चिह्नित नहीं करता।",
  "This is the rarity figure stated correctly. The expert converts it into expected matches in the population instead of flipping it into a probability of innocence.":
    "यह दुर्लभता के आँकड़े को सही ढंग से रखना है। विशेषज्ञ उसे निर्दोष होने की संभावना में पलटने के बजाय आबादी में अपेक्षित मिलानों की संख्या में बदल देता है।",
  "Patients are assigned at random to a drug or a placebo. The drug group has fewer strokes, and the difference holds within every age group. The researchers conclude the drug reduces strokes.":
    "मरीज़ों को यादृच्छिक रूप से दवा या प्लेसिबो में बाँटा जाता है। दवा वाले समूह में स्ट्रोक कम होते हैं, और यह अंतर हर आयु वर्ग के भीतर भी बना रहता है। शोधकर्ता निष्कर्ष निकालते हैं कि दवा स्ट्रोक घटाती है।",
  "Randomisation balances the hidden differences, and the effect survives splitting by age. This reasoning is sound.":
    "यादृच्छिकीकरण छिपे हुए अंतरों को संतुलित कर देता है, और उम्र के हिसाब से बाँटने पर भी असर बना रहता है। यह तर्क सही है।",
  "A test with a 1% false-positive rate is used in a clinic where about 40% of those tested genuinely have the condition. A doctor tells a patient that a positive result makes the condition much more likely.":
    "1% झूठे पॉज़िटिव दर वाला एक परीक्षण ऐसे क्लिनिक में इस्तेमाल होता है जहाँ जाँच कराने वालों में से लगभग 40% को सचमुच वह बीमारी है। एक डॉक्टर मरीज़ से कहता है कि पॉज़िटिव परिणाम से बीमारी की संभावना काफ़ी बढ़ जाती है।",
  "The base rate matters, and here it is high. With 40% prevalence a positive really is strong evidence, so applying the rare-disease lesson would be a mistake.":
    "आधार दर मायने रखती है, और यहाँ वह ऊँची है। 40% व्यापकता के साथ पॉज़िटिव परिणाम सचमुच मज़बूत सबूत है, इसलिए यहाँ दुर्लभ बीमारी वाला सबक लगाना गलती होगी।",
  "A city compares road deaths before and after lowering a speed limit, adjusts for traffic volume, and checks the national trend over the same years. The local drop is larger than the national trend.":
    "एक शहर गति सीमा घटाने से पहले और बाद की सड़क मौतों की तुलना करता है, यातायात की मात्रा के लिए समायोजन करता है, और उन्हीं वर्षों की राष्ट्रीय प्रवृत्ति भी जाँचता है। स्थानीय गिरावट राष्ट्रीय प्रवृत्ति से ज़्यादा है।",
  "They accounted for the obvious confounders and for the background trend, which is what makes a before-and-after comparison credible.":
    "उन्होंने स्पष्ट भ्रामक कारकों का और पृष्ठभूमि की प्रवृत्ति का, दोनों का हिसाब रखा, और यही किसी पहले और बाद की तुलना को भरोसेमंद बनाता है।",
  "A trial reports outcomes for everyone who was enrolled, including those who stopped treatment early, and states how many dropped out and why.":
    "एक परीक्षण उन सभी के नतीजे बताता है जिन्हें उसमें शामिल किया गया था, उन लोगों समेत जिन्होंने इलाज बीच में ही रोक दिया, और यह भी बताता है कि कितने लोग बीच में छोड़ गए और क्यों।",
  "Reporting the whole enrolled group, dropouts included, is exactly the defence against counting only the survivors.":
    "पूरे शामिल किए गए समूह के नतीजे बताना, बीच में छोड़ने वालों समेत, ठीक वही बचाव है जो केवल बचे हुओं को गिनने के खिलाफ़ काम करता है।",
};
