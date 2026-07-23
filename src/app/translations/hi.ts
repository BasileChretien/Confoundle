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

  // ==== Will Rogers phenomenon (stage migration) ====
  "Better survival in every single stage. Did anyone actually live longer?":
    "हर एक चरण में बेहतर उत्तरजीविता। पर क्या सचमुच कोई ज़्यादा जिया?",
  "One group of 131 lung cancer patients, treated in 1977, sorted into stages twice. First using only the information older hospitals could gather, then again after new scans. Nobody was treated differently. Only the sorting changed.":
    "फेफड़ों के कैंसर के 131 मरीज़ों का एक ही समूह, जिनका इलाज 1977 में हुआ, दो बार चरणों में बाँटा गया। पहली बार केवल उस जानकारी से जो पुराने अस्पताल जुटा सकते थे, फिर दोबारा नई स्कैन जाँचों के बाद। किसी का इलाज अलग तरह से नहीं किया गया। बदला सिर्फ़ बँटवारा।",
  "Did these patients actually do better?":
    "क्या इन मरीज़ों का नतीजा सचमुच बेहतर रहा?",
  "Six-month survival": "छह महीने की उत्तरजीविता",
  "Sorted the old way": "पुराने तरीके से बाँटा गया",
  Old: "पुराना",
  "Sorted after the new scans": "नई स्कैन जाँचों के बाद बाँटा गया",
  New: "नया",
  "Stage I": "चरण I",
  "Stage II": "चरण II",
  "Stage III": "चरण III",
  "Yes, they did better": "हाँ, उनका नतीजा बेहतर रहा",
  "every stage improved": "हर चरण में सुधार हुआ",
  "There is no way to tell": "यह बताना नामुमकिन है",
  "too little to go on": "फैसले के लिए बहुत कम जानकारी",
  "No, nothing changed": "नहीं, कुछ नहीं बदला",
  "only the labels moved": "सिर्फ़ लेबल इधर उधर हुए",
  "Identical. Seventy two survivors either way.":
    "बिल्कुल एक जैसा। दोनों ही तरह से बहत्तर लोग बचे।",
  "The migration": "मरीज़ों का स्थानांतरण",
  "Patients moved between stages, and lifted both":
    "मरीज़ चरणों के बीच खिसके, और दोनों का औसत ऊपर उठा गए",
  "The new scans spotted spread that the old workup had missed, so patients were moved out of better stages into worse ones. Each of them was among the sickest in the stage they left, so that stage's average rose. Each was also among the healthiest in the stage they joined, so that average rose too. Every stage improved and not one person's outcome changed:":
    "नई स्कैन जाँचों ने कैंसर का वह फैलाव पकड़ लिया जो पुरानी जाँच से छूट गया था, इसलिए मरीज़ों को बेहतर चरणों से निकालकर बदतर चरणों में डाल दिया गया। उनमें से हर एक उस चरण के सबसे बीमार लोगों में था जिसे उसने छोड़ा, इसलिए उस चरण का औसत ऊपर उठ गया। वही हर एक उस चरण के सबसे स्वस्थ लोगों में भी था जिसमें वह पहुँचा, इसलिए उसका औसत भी ऊपर उठ गया। हर चरण में सुधार दिखा और किसी एक व्यक्ति का नतीजा नहीं बदला:",
  "The Will Rogers phenomenon": "विल रोजर्स परिघटना",
  "Move members from one group into another and you can lift the average of every group at once, while the overall picture stays exactly the same.":
    "सदस्यों को एक समूह से दूसरे में खिसका दीजिए और आप एक साथ हर समूह का औसत ऊपर उठा सकते हैं, जबकि कुल तस्वीर बिल्कुल वैसी की वैसी रहती है।",
  "Whenever a category's average improves, ask whether the category still holds the same kind of members. Better detection quietly reshuffles who counts as mild and who counts as severe, and a reshuffle on its own can make every column look better.":
    "जब भी किसी श्रेणी का औसत सुधरे, पूछिए कि क्या उस श्रेणी में अब भी उसी तरह के सदस्य हैं। बेहतर पहचान चुपचाप यह फेरबदल कर देती है कि कौन हल्का माना जाए और कौन गंभीर, और अकेला यह फेरबदल ही हर खाने को बेहतर दिखा सकता है।",
  "Picture two buckets, one of good outcomes and one of bad. Take the worst items out of the good bucket and drop them into the bad one, where they are the best of a bad lot. The good bucket's average rises because its weakest members left. The bad bucket's average rises because it gained members better than its own. Both averages improve and nothing about any individual has changed. In medicine the reshuffling is done by better scans, which find disease that was always there but previously invisible. That is why survival by stage can improve across the board in a period when the treatments themselves did not get better, and it is why comparing stages across eras of different technology is treacherous.":
    "दो बाल्टियों की कल्पना कीजिए, एक अच्छे नतीजों की और एक बुरे नतीजों की। अच्छी बाल्टी में से सबसे खराब चीज़ें निकालकर बुरी बाल्टी में डाल दीजिए, जहाँ वे बुरों में सबसे अच्छी हैं। अच्छी बाल्टी का औसत इसलिए बढ़ता है क्योंकि उसके सबसे कमज़ोर सदस्य निकल गए। बुरी बाल्टी का औसत इसलिए बढ़ता है क्योंकि उसे अपने मौजूदा सदस्यों से बेहतर सदस्य मिल गए। दोनों औसत सुधर जाते हैं और किसी भी व्यक्ति के बारे में कुछ नहीं बदला। चिकित्सा में यह फेरबदल बेहतर स्कैन जाँचें करती हैं, जो उस बीमारी को खोज लेती हैं जो हमेशा से मौजूद थी पर पहले दिखती नहीं थी। यही वजह है कि जिस दौर में इलाज खुद बेहतर नहीं हुए, उसमें भी चरण दर चरण उत्तरजीविता हर जगह सुधरती दिख सकती है, और यही वजह है कि अलग अलग तकनीक के दौरों के चरणों की आपस में तुलना करना खतरनाक है।",
  "The check that gave it away": "वह जाँच जिसने भेद खोल दिया",
  "The same researchers sorted both eras of patients by their symptoms instead, a yardstick no scanner can shift. Judged that way the two groups survived at much the same rate, around 77 and 78 percent for those without symptoms, and 26 against 22 percent for the sickest. What had really changed was the mix, because the newer group held twice the proportion of the mildest patients.":
    "उन्हीं शोधकर्ताओं ने दोनों दौर के मरीज़ों को इसके बजाय उनके लक्षणों के हिसाब से बाँटा, एक ऐसा पैमाना जिसे कोई स्कैनर हिला नहीं सकता। इस तरह आँकने पर दोनों समूहों की उत्तरजीविता लगभग एक जैसी थी, बिना लक्षण वालों के लिए करीब 77 और 78 प्रतिशत, और सबसे बीमार लोगों के लिए 26 बनाम 22 प्रतिशत। असल में जो बदला था वह था मिश्रण, क्योंकि नए समूह में सबसे हल्के मरीज़ों का अनुपात दोगुना था।",
  "It happened again with PET": "यही सब PET के साथ फिर हुआ",
  "As PET scanning spread through American hospitals, lung cancer patients were reclassified all over again. The share labelled most advanced grew, and survival within the stages duly ticked up, two year survival moving from 18 to 22 percent in one stage and 6 to 8 percent in another. The authors called their paper the phenomenon revisited.":
    "जैसे जैसे PET स्कैन अमेरिकी अस्पतालों में फैला, फेफड़ों के कैंसर के मरीज़ों को एक बार फिर नए सिरे से वर्गीकृत किया गया। सबसे उन्नत अवस्था वाले मरीज़ों का हिस्सा बढ़ा, और चरणों के भीतर उत्तरजीविता उसी हिसाब से ऊपर खिसक गई: एक चरण में दो साल की उत्तरजीविता 18 से 22 प्रतिशत हुई और दूसरे में 6 से 8 प्रतिशत। लेखकों ने अपने शोधपत्र का नाम रखा, वही परिघटना दोबारा।",
  "The Will Rogers phenomenon, a reasoning trap.":
    "विल रोजर्स परिघटना, तर्क का एक जाल।",
  "Take the worst members of a good group and move them into a bad group. The good group's average rises, because its weakest ones left. The bad group's average rises too, because the newcomers are better than what it already had. Every group improves and nothing real has happened. It is how sharper scans can make survival look better in every stage of a disease while exactly as many people live and die.":
    "किसी अच्छे समूह के सबसे खराब सदस्यों को उठाकर एक बुरे समूह में डाल दीजिए। अच्छे समूह का औसत बढ़ जाता है, क्योंकि उसके सबसे कमज़ोर लोग निकल गए। बुरे समूह का औसत भी बढ़ जाता है, क्योंकि नए आने वाले उसके पहले से मौजूद लोगों से बेहतर हैं। हर समूह सुधर जाता है और असल में कुछ भी नहीं हुआ। इसी तरह पैनी स्कैन जाँचें किसी बीमारी के हर चरण में उत्तरजीविता को बेहतर दिखा सकती हैं, जबकि ठीक उतने ही लोग जीते और मरते हैं।",
  "The counts are Table 4: the 1977 cohort of 131 patients staged twice, once on the data the older cohort had and once with the new imaging. Both stagings give 72 survivors, a six-month survival of 55 percent.":
    "ये आँकड़े तालिका 4 के हैं: 1977 के 131 मरीज़ों के समूह को दो बार चरणों में बाँटा गया, एक बार उन्हीं आँकड़ों पर जो पुराने समूह के पास थे और एक बार नई इमेजिंग के साथ। दोनों बँटवारों में 72 मरीज़ बचते हैं, यानी छह महीने की 55 प्रतिशत उत्तरजीविता।",

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
  "A hospital installs a more sensitive scanner. Over the next two years it reports that survival improved in every severity grade of the disease, from the mildest to the most advanced, and concludes that its care has got better.":
    "एक अस्पताल ज़्यादा संवेदनशील स्कैनर लगवाता है। अगले दो साल में वह बताता है कि बीमारी के हर गंभीरता स्तर में, सबसे हल्के से लेकर सबसे उन्नत तक, उत्तरजीविता सुधरी है, और निष्कर्ष निकालता है कि उसकी देखभाल बेहतर हो गई है।",
  "A sharper scanner regrades patients. Those moved out of a mild grade were its sickest, and they arrive in a severe grade as its healthiest, so both averages rise without anyone doing better.":
    "पैना स्कैनर मरीज़ों का दर्जा दोबारा तय कर देता है। जो हल्के स्तर से बाहर निकाले गए वे उसके सबसे बीमार मरीज़ थे, और गंभीर स्तर में वे उसके सबसे स्वस्थ मरीज़ बनकर पहुँचते हैं, इसलिए किसी का नतीजा बेहतर हुए बिना ही दोनों औसत बढ़ जाते हैं।",
  "A school adopts a placement test that is much better at identifying struggling pupils, and uses it to sort them into a top and a bottom stream. The next year, average results rise in both streams. The head teacher credits the new teaching methods.":
    "एक स्कूल ऐसा वर्गीकरण परीक्षण अपनाता है जो कमज़ोर विद्यार्थियों को पहचानने में कहीं बेहतर है, और उसी से उन्हें ऊपरी और निचली धारा में बाँटता है। अगले साल दोनों धाराओं में औसत परिणाम बढ़ जाते हैं। प्रधानाध्यापक इसका श्रेय नई शिक्षण पद्धतियों को देते हैं।",
  "The pupils reclassified out of the top stream were its weakest and become the strongest of the bottom stream, so both averages climb on reshuffling alone.":
    "जिन विद्यार्थियों को ऊपरी धारा से निकालकर दोबारा वर्गीकृत किया गया वे उसके सबसे कमज़ोर थे और निचली धारा के सबसे मज़बूत बन जाते हैं, इसलिए केवल फेरबदल से ही दोनों औसत चढ़ जाते हैं।",
  "A hospital reports that survival improved in every severity grade over five years. It also reports that the grading criteria did not change in that time, that no new diagnostic test was introduced, and that the number of patients in each grade stayed about the same.":
    "एक अस्पताल बताता है कि पाँच साल में हर गंभीरता स्तर में उत्तरजीविता सुधरी है। वह यह भी बताता है कि इस दौरान स्तर तय करने के मानदंड नहीं बदले, कोई नई नैदानिक जाँच शुरू नहीं की गई, और हर स्तर में मरीज़ों की संख्या लगभग वही रही।",
  "This is the case where the improvement is real. Nothing reclassified the patients, and the grades held the same share of people, so no reshuffling could have manufactured the gain.":
    "यह वह मामला है जहाँ सुधार असली है। किसी चीज़ ने मरीज़ों का वर्गीकरण नहीं बदला, और हर स्तर में लोगों का हिस्सा वही रहा, इसलिए कोई फेरबदल इस बढ़त को गढ़ नहीं सकता था।",

  // ---- Lead-time bias (puzzle #7) ----
  "Screened patients survive five years after diagnosis. Unscreened ones survive two.":
    "जिन मरीज़ों की स्क्रीनिंग हुई वे निदान के बाद पाँच साल जीते हैं। जिनकी नहीं हुई वे दो साल।",
  "The same cancer, growing at the same speed, treated the same way. One person had a scan that found it early. The other went to a doctor years later, when the first symptom appeared. Survival is counted from the day of diagnosis, which is how survival is almost always counted.":
    "वही कैंसर, उसी रफ़्तार से बढ़ता हुआ, उसी तरह इलाज किया गया। एक व्यक्ति ने स्कैन कराया जिसने उसे जल्दी पकड़ लिया। दूसरा कई साल बाद डॉक्टर के पास गया, जब पहला लक्षण उभरा। उत्तरजीविता निदान वाले दिन से गिनी जाती है, और उत्तरजीविता लगभग हमेशा इसी तरह गिनी जाती है।",
  "Did finding it early give this person more time alive?":
    "क्या जल्दी पता चल जाने से इस व्यक्ति को जीने के लिए ज़्यादा समय मिला?",
  "One life, two moments of diagnosis": "एक ज़िंदगी, निदान के दो पल",
  years: "साल",
  "cancer begins": "कैंसर शुरू",
  diagnosed: "निदान",
  died: "मृत्यु",
  "Survival counted from diagnosis": "निदान से गिनी गई उत्तरजीविता",
  "Found when symptoms appeared": "लक्षण आने पर पता चला",
  "Found early, by screening": "स्क्रीनिंग से जल्दी पता चला",
  "Yes, three extra years": "हाँ, तीन साल ज़्यादा",
  "five instead of two": "दो के बजाय पाँच",
  "No, not one extra day": "नहीं, एक दिन भी ज़्यादा नहीं",
  "only the clock moved": "सिर्फ़ घड़ी खिसकी",
  "Both died on exactly the same day.":
    "दोनों की मृत्यु ठीक एक ही दिन हुई।",
  "The clock started earlier, the life did not get longer":
    "घड़ी पहले चल पड़ी, ज़िंदगी लंबी नहीं हुई",
  "Screening did not postpone anything. It moved the diagnosis three years earlier, so this person spent three more years knowing they had cancer. Counted from diagnosis that reads as three extra years of survival. Put both lives on the same calendar and they end at the same instant:":
    "स्क्रीनिंग ने कुछ भी टाला नहीं। उसने निदान को तीन साल पहले खिसका दिया, इसलिए इस व्यक्ति ने तीन साल और यह जानते हुए बिताए कि उसे कैंसर है। निदान से गिनने पर यह तीन साल ज़्यादा उत्तरजीविता जैसा पढ़ा जाता है। दोनों ज़िंदगियों को एक ही कैलेंडर पर रखिए और वे ठीक एक ही पल पर खत्म होती हैं:",
  "The extra years": "वे अतिरिक्त साल",
  "Lead-time bias": "लीड टाइम पूर्वाग्रह",
  "Finding a disease earlier stretches survival measured from diagnosis even when it postpones death by not a single day.":
    "बीमारी का पहले पता चल जाना निदान से मापी गई उत्तरजीविता को खींचकर लंबा कर देता है, भले ही वह मृत्यु को एक दिन भी न टाले।",
  "This does not mean early detection is worthless. It means survival from diagnosis cannot tell you whether it worked. Whenever survival improves after a new test arrives, ask whether people are living longer or simply being told sooner. The measure that cannot be fooled this way is the death rate in the whole population, screened and unscreened alike.":
    "इसका मतलब यह नहीं कि जल्दी पता लगाना बेकार है। मतलब यह है कि निदान से गिनी गई उत्तरजीविता आपको यह नहीं बता सकती कि वह काम आया या नहीं। जब भी कोई नई जाँच आने के बाद उत्तरजीविता सुधरे, तो पूछिए कि लोग सचमुच ज़्यादा जी रहे हैं या उन्हें बस पहले बता दिया गया है। जिस पैमाने को इस तरह धोखा नहीं दिया जा सकता, वह है पूरी आबादी में मृत्यु दर, स्क्रीनिंग वालों और बिना स्क्रीनिंग वालों, दोनों को मिलाकर।",
  "Survival statistics start their clock on the day of diagnosis. That day is not a fact about the disease, it is a fact about when somebody looked. Move the looking earlier and you add time to the front of the measurement while changing nothing at the back. Everyone diagnosed early is guaranteed to clear the five-year mark more often, because they were handed a head start. Two other effects push the same way. A screening programme catches slow-growing disease far more often than fast-growing disease, simply because slow disease sits there longer waiting to be found, and slow disease has a better outlook anyway. And a sensitive enough test finds harmless abnormalities that would never have caused trouble, which are then counted as cured cancers. All three flatter survival without saving anyone. The only honest test is to take a whole population, invite half of it to be screened, and count deaths in everyone from the day of the invitation. Screening programmes that pass that test exist, which is exactly why the test is worth insisting on.":
    "उत्तरजीविता के आँकड़े अपनी घड़ी निदान वाले दिन से शुरू करते हैं। वह दिन बीमारी के बारे में कोई तथ्य नहीं है, वह इस बारे में तथ्य है कि किसी ने कब देखा। देखने का समय पहले खिसका दीजिए और आप माप के अगले सिरे पर समय जोड़ देते हैं, जबकि पिछले सिरे पर कुछ भी नहीं बदलता। जिनका निदान जल्दी हो जाता है वे पाँच साल का पड़ाव ज़्यादा बार पार करेंगे ही, क्योंकि उन्हें शुरुआती बढ़त थमा दी गई थी। दो और असर इसी दिशा में धकेलते हैं। स्क्रीनिंग कार्यक्रम धीमे बढ़ने वाली बीमारी को तेज़ बढ़ने वाली बीमारी के मुकाबले कहीं ज़्यादा बार पकड़ता है, सिर्फ़ इसलिए कि धीमी बीमारी पकड़ में आने के इंतज़ार में ज़्यादा देर तक पड़ी रहती है, और धीमी बीमारी का नतीजा वैसे भी बेहतर होता है। और पर्याप्त संवेदनशील जाँच ऐसी हानिरहित असामान्यताएँ भी खोज निकालती है जो कभी कोई परेशानी खड़ी ही नहीं करतीं, और फिर उन्हें ठीक हो चुके कैंसर के रूप में गिन लिया जाता है। तीनों ही उत्तरजीविता की छवि चमकाते हैं, बिना किसी को बचाए। एकमात्र ईमानदार कसौटी यह है कि पूरी आबादी लीजिए, उसके आधे हिस्से को स्क्रीनिंग के लिए बुलाइए, और बुलावे वाले दिन से सभी में मौतें गिनिए। ऐसे स्क्रीनिंग कार्यक्रम मौजूद हैं जो इस कसौटी पर खरे उतरते हैं, और ठीक इसीलिए इस कसौटी पर अड़े रहना सार्थक है।",
  "Survival rose for every cancer. Deaths did not follow.":
    "हर कैंसर में उत्तरजीविता बढ़ी। मौतें साथ नहीं चलीं।",
  "Between 1950 and 1995, five-year survival improved for all 20 of the most common solid tumours in the United States, by as little as 3 points for pancreatic cancer and as much as 50 for prostate. Over the same years the death rate fell for 12 of those cancers and rose for the other 8. Comparing tumour by tumour, the change in survival was unrelated to the change in mortality, and instead tracked the change in how many cancers were being found.":
    "1950 और 1995 के बीच, अमेरिका के सबसे आम 20 ठोस ट्यूमरों में से हर एक के लिए पाँच साल की उत्तरजीविता सुधरी, अग्न्याशय के कैंसर में महज़ 3 अंक और प्रोस्टेट में पूरे 50 अंक तक। उन्हीं वर्षों में उनमें से 12 कैंसरों की मृत्यु दर गिरी और बाकी 8 की बढ़ी। ट्यूमर दर ट्यूमर तुलना करने पर, उत्तरजीविता के बदलाव का मृत्यु दर के बदलाव से कोई नाता नहीं था; वह इसके बजाय इस बात के साथ चलता था कि कितने कैंसर खोजे जा रहे थे।",
  "Screening babies for a childhood tumour":
    "बचपन के एक ट्यूमर के लिए शिशुओं की स्क्रीनिंग",
  "Two large programmes tested screening infants for neuroblastoma. Quebec screened 476,654 children born over five years, with 92 percent taking part, and deaths from the tumour before the age of eight came to 4.78 per 100,000, no lower than in the comparison populations. Germany compared 1,475,773 screened children with 2,117,600 unscreened ones and found advanced disease in 3.7 against 3.8 per 100,000, and deaths in 1.3 against 1.2. More tumours were found. The same number of children died.":
    "दो बड़े कार्यक्रमों ने न्यूरोब्लास्टोमा के लिए शिशुओं की स्क्रीनिंग को परखा। क्यूबेक ने पाँच साल में जन्मे 476,654 बच्चों की स्क्रीनिंग की, जिसमें 92 प्रतिशत ने हिस्सा लिया, और आठ साल की उम्र से पहले इस ट्यूमर से हुई मौतें प्रति 100,000 पर 4.78 रहीं, यानी तुलना वाली आबादियों से कुछ भी कम नहीं। जर्मनी ने स्क्रीनिंग वाले 1,475,773 बच्चों की तुलना बिना स्क्रीनिंग वाले 2,117,600 बच्चों से की और उन्नत बीमारी प्रति 100,000 पर 3.7 बनाम 3.8 पाई, और मौतें 1.3 बनाम 1.2। ज़्यादा ट्यूमर मिले। मरने वाले बच्चों की संख्या वही रही।",
  "What a real benefit looks like": "असली फ़ायदा कैसा दिखता है",
  "Screening is not doomed to be an illusion, it just has to be measured properly. A trial put 46,551 people aged 50 to 80 into three groups: yearly stool testing for hidden blood, testing every two years, or none. Over 13 years, deaths from colorectal cancer came to 5.88 per 1,000 in the yearly group against 8.83 in the unscreened group, a third fewer. That is a count of deaths in everyone invited, not survival from diagnosis, so no head start could have produced it.":
    "स्क्रीनिंग का भ्रम बनकर रह जाना तय नहीं है, बस उसे सही ढंग से मापना होता है। एक परीक्षण ने 50 से 80 साल के 46,551 लोगों को तीन समूहों में बाँटा: हर साल मल में छिपे खून की जाँच, हर दो साल पर जाँच, या कोई जाँच नहीं। 13 साल में, कोलोरेक्टल कैंसर से हुई मौतें हर साल जाँच वाले समूह में प्रति 1,000 पर 5.88 रहीं, जबकि बिना स्क्रीनिंग वाले समूह में 8.83, यानी एक तिहाई कम। यह उन सभी लोगों में मौतों की गिनती है जिन्हें बुलाया गया था, निदान से गिनी गई उत्तरजीविता नहीं, इसलिए कोई शुरुआती बढ़त इसे पैदा नहीं कर सकती थी।",
  "Lead-time bias, a reasoning trap.":
    "लीड टाइम पूर्वाग्रह, तर्क का एक जाल।",
  "Survival is counted from the day you are diagnosed. So a test that finds a disease earlier automatically makes survival look longer, even if it changes nothing about when the disease kills you. You simply spend more of your life as a patient. That is why a screening programme can raise five-year survival dramatically while exactly the same number of people die. The number that cannot be gamed is deaths in the whole population, not survival among the diagnosed.":
    "उत्तरजीविता उस दिन से गिनी जाती है जिस दिन आपका निदान होता है। इसलिए जो जाँच बीमारी को पहले पकड़ लेती है, वह अपने आप उत्तरजीविता को लंबा दिखा देती है, भले ही वह इस बारे में कुछ न बदले कि बीमारी आपको कब मारेगी। बस आप अपनी ज़िंदगी का ज़्यादा हिस्सा मरीज़ बनकर बिताते हैं। यही वजह है कि कोई स्क्रीनिंग कार्यक्रम पाँच साल की उत्तरजीविता को नाटकीय ढंग से बढ़ा सकता है, जबकि मरने वालों की संख्या ठीक उतनी ही रहती है। जिस संख्या के साथ खिलवाड़ नहीं किया जा सकता वह है पूरी आबादी में मौतें, न कि जिनका निदान हुआ उनकी उत्तरजीविता।",
  "The timeline is a schematic illustration of one life, not measured data. The finding behind it is Welch and colleagues': across the 20 most common solid tumours between 1950 and 1995, five-year survival rose for every one, yet tumour by tumour the change in survival was uncorrelated with the change in mortality (Pearson r = 0.00) and instead tracked the change in incidence (Pearson r = 0.49).":
    "यह समयरेखा एक ज़िंदगी का योजनाबद्ध चित्रण है, मापे गए आँकड़े नहीं। इसके पीछे का निष्कर्ष Welch और सहयोगियों का है: 1950 और 1995 के बीच सबसे आम 20 ठोस ट्यूमरों में से हर एक के लिए पाँच साल की उत्तरजीविता बढ़ी, फिर भी ट्यूमर दर ट्यूमर देखने पर उत्तरजीविता के बदलाव का मृत्यु दर के बदलाव से कोई सहसंबंध नहीं था (Pearson r = 0.00), और वह इसके बजाय नए मामलों की दर के बदलाव के साथ चलता था (Pearson r = 0.49)।",
  // trap hunt items (lead-time bias)
  "A hospital introduces a blood test that picks up a cancer about two years before symptoms would have appeared. Among patients diagnosed there, five-year survival rises from 41% to 68%. The hospital announces that the test is saving lives.":
    "एक अस्पताल ऐसी रक्त जाँच शुरू करता है जो कैंसर को लक्षण उभरने से करीब दो साल पहले पकड़ लेती है। वहाँ जिन मरीज़ों का निदान होता है, उनमें पाँच साल की उत्तरजीविता 41% से बढ़कर 68% हो जाती है। अस्पताल घोषणा करता है कि यह जाँच जान बचा रही है।",
  "Survival is counted from diagnosis, and the diagnosis now happens two years sooner. Everyone gets a two-year head start towards the five-year mark, whether or not the test changed anyone's outcome.":
    "उत्तरजीविता निदान से गिनी जाती है, और अब निदान दो साल पहले हो जाता है। पाँच साल के पड़ाव की ओर सभी को दो साल की शुरुआती बढ़त मिल जाती है, चाहे उस जाँच ने किसी का नतीजा बदला हो या नहीं।",
  "A national registry reports that the average time between diagnosis and death for a disease has risen from three years to six since a new scan came into routine use. A minister says patients now live twice as long.":
    "एक राष्ट्रीय रजिस्ट्री बताती है कि जब से एक नई स्कैन जाँच नियमित इस्तेमाल में आई है, किसी बीमारी में निदान और मृत्यु के बीच का औसत समय तीन साल से बढ़कर छह साल हो गया है। एक मंत्री कहते हैं कि मरीज़ अब दोगुना जीते हैं।",
  "Time from diagnosis to death can double purely because the diagnosis moved earlier. To claim people live longer you have to show that death is arriving later, not that the label is arriving sooner.":
    "निदान से मृत्यु तक का समय महज़ इसलिए दोगुना हो सकता है क्योंकि निदान पहले खिसक गया। यह दावा करने के लिए कि लोग ज़्यादा जीते हैं, आपको दिखाना होगा कि मृत्यु देर से आ रही है, न कि यह कि लेबल जल्दी आ रहा है।",
  "A region invites half its residents, chosen at random, to be screened for a disease and leaves the other half uninvited. Ten years on it counts deaths from that disease among everyone in both halves, screened or not, attended or not. Deaths are 30% lower in the invited half.":
    "एक क्षेत्र अपने आधे निवासियों को, जिन्हें यादृच्छिक रूप से चुना गया है, किसी बीमारी की स्क्रीनिंग के लिए बुलाता है और बाकी आधे को नहीं बुलाता। दस साल बाद वह दोनों हिस्सों के सभी लोगों में उस बीमारी से हुई मौतें गिनता है, चाहे स्क्रीनिंग हुई हो या नहीं, चाहे वे आए हों या नहीं। बुलाए गए आधे हिस्से में मौतें 30% कम हैं।",
  "This is the design an earlier diagnosis cannot fool. The clock starts at the invitation rather than at diagnosis, and the count includes everyone invited, so no head start and no extra diagnoses can manufacture the difference.":
    "यह वह अध्ययन डिज़ाइन है जिसे पहले हुआ निदान धोखा नहीं दे सकता। घड़ी निदान से नहीं, बुलावे से शुरू होती है, और गिनती में हर बुलाया गया व्यक्ति शामिल है, इसलिए न कोई शुरुआती बढ़त और न कोई अतिरिक्त निदान इस फ़र्क को गढ़ सकता है।",

  // ---- Tag blurbs (browse screen) ----
  "Anyone can fall for it": "इसमें कोई भी फँस सकता है",
  "Bites at the bedside": "मरीज़ के सामने ही धोखा देता है",
  "Study design & evidence appraisal": "अध्ययन डिज़ाइन और साक्ष्य का आकलन",
  "Reading the numbers": "संख्याओं को पढ़ना",
  "Tests & diagnostic reasoning": "जाँचें और नैदानिक तर्क",
  "Screening programmes": "स्क्रीनिंग कार्यक्रम",
  "Populations, exposure & risk": "आबादी, संपर्क और जोखिम",
  "Drugs & drug safety": "दवाएँ और दवा सुरक्षा",
  "Mind & behaviour": "मन और व्यवहार",
  "Life & evolution": "जीवन और क्रमविकास",
  "Data, computing & AI": "डेटा, कंप्यूटिंग और AI",
  "Markets & incentives": "बाज़ार और प्रोत्साहन",
  "Elections & policy": "चुनाव और नीति",
  "Teaching & testing": "पढ़ाना और परखना",
  "Investing & returns": "निवेश और प्रतिफल",
  "Management & strategy": "प्रबंधन और रणनीति",
  "Courts & forensics": "अदालतें और फ़ोरेंसिक",
  "Performance & records": "प्रदर्शन और रिकॉर्ड",
  "The past & how we read it": "अतीत और उसे पढ़ने का तरीका",
  "News & the numbers in it": "खबरें और उनमें छिपी संख्याएँ",

  // ---- Leftovers (compact chart labels, scope tags) ----
  A: "A",
  B: "B",
  "From diagnosis": "निदान से",
  "The whole life": "पूरी ज़िंदगी",

  // ---- Spectrum bias (puzzle #8) ----
  "This urine test catches 92% of infections. Your patient's symptoms are vague. How good is it now?":
    "पेशाब की यह जाँच 92% संक्रमण पकड़ लेती है। आपके मरीज़ के लक्षण अस्पष्ट हैं। अब यह कितनी अच्छी है?",
  "A dipstick for urinary infection, checked against urine cultures in an emergency department and a walk-in clinic. Among patients whose doctor already thought an infection was likely, it caught 49 of the 53 who really had one. Sensitivity is normally quoted as a single number, as though it were a fixed property of the test.":
    "पेशाब के संक्रमण की एक डिपस्टिक जाँच, जिसे एक आपातकालीन विभाग और एक वॉक-इन क्लिनिक में पेशाब के कल्चर से मिलाकर परखा गया। जिन मरीज़ों के डॉक्टर पहले से मान रहे थे कि संक्रमण की संभावना है, उनमें जिन 53 को सचमुच संक्रमण था उनमें से 49 को इसने पकड़ लिया। संवेदनशीलता (sensitivity) आम तौर पर एक ही संख्या के रूप में बताई जाती है, मानो वह जाँच का कोई तय गुण हो।",
  "In patients the doctor thinks are unlikely to be infected, how often does it catch a real infection?":
    "जिन मरीज़ों के बारे में डॉक्टर को लगता है कि संक्रमण की संभावना कम है, उनमें यह असली संक्रमण को कितनी बार पकड़ती है?",
  "Times the dipstick was right": "जितनी बार डिपस्टिक सही निकली",
  "Doctor thought infection likely": "डॉक्टर को संक्रमण की संभावना लगी",
  Likely: "संभावित",
  "Doctor thought infection unlikely": "डॉक्टर को संक्रमण की संभावना कम लगी",
  Unlikely: "कम संभावित",
  "Patients who really had an infection": "जिन मरीज़ों को सचमुच संक्रमण था",
  "Patients who did not": "जिन्हें नहीं था",
  "The quoted figure": "बताया गया आँकड़ा",
  "About the same, 92%": "लगभग उतनी ही, 92%",
  "the test has not changed": "जाँच तो वही है",
  "A little lower, around 80%": "थोड़ी कम, करीब 80%",
  "some drop off": "कुछ गिरावट आती है",
  "Barely half, 56%": "मुश्किल से आधी, 56%",
  "it misses most of them": "वह ज़्यादातर को चूक जाती है",
  "Barely half. And the other column flips the other way.":
    "मुश्किल से आधी। और दूसरा स्तंभ उल्टी दिशा में पलट जाता है।",
  "The patients changed, not the test": "मरीज़ बदले, जाँच नहीं",
  "Patients their doctor already suspected had florid infections, the kind a dipstick spots easily. Patients thought unlikely to be infected had mild or early ones, and the test missed most of them. Now look at the second panel, the patients who had no infection at all: there the test was right 42% of the time in the first group and 78% in the second. Sensitivity and specificity are not properties of a test. They are properties of a test meeting a particular mix of people:":
    "जिन मरीज़ों पर उनके डॉक्टर को पहले से शक था, उन्हें भड़के हुए संक्रमण थे, वैसे जिन्हें डिपस्टिक आसानी से पकड़ लेती है। जिनके बारे में संक्रमण की संभावना कम मानी गई थी, उन्हें हल्के या शुरुआती संक्रमण थे, और जाँच उनमें से ज़्यादातर को चूक गई। अब दूसरा पैनल देखिए, वे मरीज़ जिन्हें संक्रमण था ही नहीं: वहाँ जाँच पहले समूह में 42% बार सही रही और दूसरे में 78% बार। संवेदनशीलता और विशिष्टता किसी जाँच के गुण नहीं हैं। वे इस बात के गुण हैं कि जाँच किन लोगों के किस मिश्रण से मिलती है:",
  "Both groups": "दोनों समूह",
  "The spectrum": "स्पेक्ट्रम",
  "How many in each group really had an infection":
    "हर समूह में कितनों को सचमुच संक्रमण था",
  "Spectrum bias": "स्पेक्ट्रम पूर्वाग्रह",
  "A test's accuracy is not fixed. It moves with how advanced, how typical and how obvious the disease is in the patients being tested.":
    "किसी जाँच की सटीकता तय नहीं होती। वह इस बात के साथ बदलती है कि जिन मरीज़ों की जाँच हो रही है उनमें बीमारी कितनी बढ़ी हुई, कितनी किताबी और कितनी ज़ाहिर है।",
  "Before trusting a quoted sensitivity, ask who it was measured on. A figure from patients with unmistakable disease will flatter the test in a clinic full of milder cases, and a study that recruits only textbook cases and healthy volunteers will flatter it most of all.":
    "बताई गई किसी संवेदनशीलता पर भरोसा करने से पहले पूछिए कि वह किन लोगों पर मापी गई थी। जिन मरीज़ों की बीमारी बिल्कुल साफ़ थी, उनसे निकला आँकड़ा हल्के मामलों से भरे किसी क्लिनिक में जाँच की छवि चमका देगा, और जो अध्ययन केवल किताबी मामले और स्वस्थ स्वयंसेवक शामिल करता है, वह उसकी छवि सबसे ज़्यादा चमकाएगा।",
  "Sensitivity is the share of truly ill people a test catches, and specificity is the share of healthy people it correctly clears. Both are quoted as though they belonged to the test, like its price. They do not. A test picks up a signal, and the signal is stronger in advanced disease than in early disease, so the sicker the ill people you test, the more of them it finds. The same logic runs the other way for the people without the disease: the more clearly healthy they are, the more easily the test clears them. That is why a test evaluated on obvious cases against obvious non-cases can look superb and then disappoint in a real clinic, where nearly everyone is somewhere in between. Two practical habits follow. Read the description of who was recruited before you read the accuracy figures. And be most suspicious of a study whose diseased and healthy groups were picked separately rather than being consecutive patients with the same presenting problem.":
    "संवेदनशीलता (sensitivity) उन सचमुच बीमार लोगों का हिस्सा है जिन्हें जाँच पकड़ लेती है, और विशिष्टता (specificity) उन स्वस्थ लोगों का हिस्सा है जिन्हें वह सही ढंग से नेगेटिव बता देती है। दोनों को यूँ बताया जाता है मानो वे जाँच की अपनी चीज़ हों, उसकी कीमत की तरह। पर वे ऐसी नहीं हैं। जाँच एक संकेत पकड़ती है, और यह संकेत शुरुआती बीमारी के मुकाबले बढ़ी हुई बीमारी में ज़्यादा मज़बूत होता है, इसलिए आप जितने ज़्यादा बीमार लोगों की जाँच करेंगे, उतने ही ज़्यादा वह खोज निकालेगी। जिन्हें बीमारी नहीं है, उनके लिए यही तर्क उल्टी दिशा में चलता है: वे जितने साफ़ तौर पर स्वस्थ होंगे, जाँच उतनी ही आसानी से उन्हें नेगेटिव बता देगी। यही वजह है कि साफ़ ज़ाहिर मामलों की साफ़ ज़ाहिर गैर मामलों से तुलना करके परखी गई जाँच शानदार लग सकती है और फिर किसी असली क्लिनिक में निराश कर सकती है, जहाँ लगभग हर कोई कहीं बीच में होता है। इससे दो व्यावहारिक आदतें निकलती हैं। सटीकता के आँकड़े पढ़ने से पहले यह विवरण पढ़िए कि अध्ययन में किन लोगों को शामिल किया गया था। और उस अध्ययन पर सबसे ज़्यादा शक कीजिए जिसमें बीमार और स्वस्थ समूह अलग अलग चुने गए हों, न कि एक ही शिकायत लेकर आए लगातार मरीज़ों में से बने हों।",
  "The same test, sorted a different way": "वही जाँच, एक अलग तरह से बाँटी गई",
  "The same study split its patients again, this time by how many white cells were visible in the urine under a microscope. Where none were visible the dipstick caught 5 of the 10 real infections. Where a few were visible it caught 15 of 22. Where there were many it caught all 34 of 34. One test, one afternoon's samples, and a sensitivity anywhere from 50 to 100 percent depending only on which patients you counted.":
    "उसी अध्ययन ने अपने मरीज़ों को एक बार फिर बाँटा, इस बार इस हिसाब से कि माइक्रोस्कोप के नीचे पेशाब में कितनी श्वेत रक्त कोशिकाएँ दिखीं। जहाँ एक भी नहीं दिखी, वहाँ डिपस्टिक ने 10 में से 5 असली संक्रमण पकड़े। जहाँ कुछ दिखीं, वहाँ उसने 22 में से 15 पकड़े। जहाँ बहुत सारी थीं, वहाँ उसने पूरे 34 में से 34 पकड़े। एक ही जाँच, एक ही दोपहर के नमूने, और संवेदनशीलता 50 से 100 प्रतिशत के बीच कहीं भी, सिर्फ़ इस बात पर निर्भर कि आपने किन मरीज़ों को गिना।",
  "Why promising tests keep disappointing":
    "उम्मीद जगाने वाली जाँचें बार बार निराश क्यों करती हैं",
  "The problem was named in 1978, after a pattern of new tests arriving with excellent published accuracy and then underwhelming the doctors who used them. Two of the era's examples were the carcinoembryonic antigen test and the nitro-blue tetrazolium test. The authors traced the letdown to two things: accuracy measured on a patient mix far narrower than real practice, and the test result and the true diagnosis not being judged independently of each other.":
    "इस समस्या को नाम 1978 में मिला, जब बार बार यह होने लगा कि नई जाँचें प्रकाशित रूप में बेहतरीन सटीकता के साथ आतीं और फिर उन्हें इस्तेमाल करने वाले डॉक्टरों को निराश कर देतीं। उस दौर के दो उदाहरण थे कार्सिनोएम्ब्रियोनिक एंटीजन जाँच और नाइट्रो-ब्लू टेट्राज़ोलियम जाँच। लेखकों ने इस निराशा की जड़ में दो बातें पाईं: सटीकता ऐसे मरीज़ों के मिश्रण पर मापी गई थी जो असली चिकित्सा व्यवहार से कहीं ज़्यादा संकरा था, और जाँच का नतीजा तथा असली निदान एक दूसरे से स्वतंत्र रूप से नहीं आँके गए थे।",
  "Spectrum bias, a reasoning trap.": "स्पेक्ट्रम पूर्वाग्रह, तर्क का एक जाल।",
  "Test accuracy sounds like a fact about the test, the way a car has a top speed. It is not. A test that catches 92% of infections in people who are obviously ill can catch barely half in people who are only slightly ill, because there is less to find. Whenever you are told a test is 95% accurate, the real question is who they measured that on, and whether those people look anything like you.":
    "जाँच की सटीकता जाँच के बारे में एक तथ्य जैसी लगती है, जैसे किसी कार की अधिकतम रफ़्तार होती है। पर वह ऐसी नहीं है। जो जाँच साफ़ तौर पर बीमार लोगों में 92% संक्रमण पकड़ लेती है, वह हल्के बीमार लोगों में मुश्किल से आधे ही पकड़ पाती है, क्योंकि वहाँ पकड़ने को कम है। जब भी आपसे कहा जाए कि कोई जाँच 95% सटीक है, असली सवाल यह है कि उन्होंने वह किन लोगों पर मापा, और क्या वे लोग ज़रा भी आप जैसे हैं।",
  "The counts are Table 3, page 137: 49 of 53 and 21 of 50 in the high prior-probability group, 10 of 18 and 188 of 241 in the low one. A positive dipstick meant leukocyte esterase or nitrite or both; a positive culture meant more than 100,000 colonies per millilitre. The correction notes that the high prior-probability group holds 103 patients, not the 107 still printed in the abstract, and that the rates were computed on 103 and stand. The printed abstract also gives the 0.56 confidence interval as 0.03 to 0.79; the paper's own table gives 0.31 to 0.79.":
    "ये आँकड़े तालिका 3, पृष्ठ 137 के हैं: जाँच से पहले ऊँची संभावना वाले समूह में 53 में से 49 और 50 में से 21, कम संभावना वाले समूह में 18 में से 10 और 241 में से 188। डिपस्टिक पॉज़िटिव का मतलब था ल्यूकोसाइट एस्टरेज़ या नाइट्राइट या दोनों; कल्चर पॉज़िटिव का मतलब था प्रति मिलीलिटर 100,000 से ज़्यादा कॉलोनियाँ। शुद्धिपत्र बताता है कि ऊँची संभावना वाले समूह में 103 मरीज़ हैं, न कि 107 जो सारांश में अब भी छपा है, और यह कि दरें 103 पर ही गिनी गई थीं और वही सही हैं। छपे हुए सारांश में 0.56 का विश्वास अंतराल 0.03 से 0.79 दिया गया है; शोधपत्र की अपनी तालिका 0.31 से 0.79 देती है।",

  // ---- Berkson's bias (puzzle #9) ----
  "Among hospital patients, lung trouble and joint trouble go together. Are the two diseases linked?":
    "अस्पताल के मरीज़ों में फेफड़ों की तकलीफ़ और जोड़ों की तकलीफ़ साथ साथ चलती हैं। क्या ये दोनों बीमारियाँ आपस में जुड़ी हैं?",
  "A survey knocked on doors and asked thousands of ordinary people what illnesses they had. Among those who had been in hospital in the previous six months, a quarter of the people with a respiratory disease also had a disease of the bones or joints, against well under a tenth of everyone else.":
    "एक सर्वेक्षण ने घर घर दस्तक देकर हज़ारों आम लोगों से पूछा कि उन्हें कौन कौन सी बीमारियाँ हैं। जो लोग पिछले छह महीनों में अस्पताल में भर्ती रहे थे, उनमें साँस की बीमारी वाले लोगों में से एक चौथाई को हड्डी या जोड़ की भी बीमारी थी, जबकि बाकी सब में यह अनुपात दसवें हिस्से से भी काफ़ी कम था।",
  "Are these two diseases actually related?":
    "क्या ये दोनों बीमारियाँ सचमुच आपस में जुड़ी हैं?",
  "Also had a bone or joint disease": "जिन्हें हड्डी या जोड़ की भी बीमारी थी",
  "Had a respiratory disease": "जिन्हें साँस की बीमारी थी",
  Lungs: "फेफड़े",
  "No respiratory disease": "जिन्हें साँस की बीमारी नहीं थी",
  "No lungs": "फेफड़े नहीं",
  "In hospital in the last 6 months": "पिछले 6 महीनों में अस्पताल में भर्ती",
  "Everyone the survey asked": "सर्वेक्षण में पूछे गए सभी लोग",
  "Hospital patients": "अस्पताल के मरीज़",
  "Yes, one brings on the other": "हाँ, एक दूसरी को पैदा करती है",
  "three times as common": "तीन गुना ज़्यादा आम",
  "Yes, but the other way round": "हाँ, पर उल्टी दिशा में",
  "the joint disease comes first": "जोड़ की बीमारी पहले आती है",
  "No, the hospital made the link": "नहीं, यह संबंध अस्पताल ने बनाया",
  "it is about who gets admitted": "बात यह है कि भर्ती कौन होता है",
  "Ask everyone, and the link disappears.":
    "सबसे पूछिए, और यह संबंध गायब हो जाता है।",
  "Two illnesses are two chances to be admitted":
    "दो बीमारियाँ यानी भर्ती होने के दो मौके",
  "Hospital and community": "अस्पताल और समुदाय",
  "The filter": "फ़िल्टर",
  "Berkson's bias": "बर्कसन का पूर्वाग्रह",
  "Studying only the people who made it through a filter can invent a relationship that does not exist outside it.":
    "केवल उन लोगों का अध्ययन करना जो किसी फ़िल्टर से छनकर आए हैं, एक ऐसा संबंध गढ़ सकता है जो उस फ़िल्टर के बाहर मौजूद ही नहीं है।",
  "Hospitals are the obvious filter, and the reason case-control studies built on hospital patients are treated warily. But any selected group does it: people who answered the survey, users who stayed subscribed, applicants who got an interview. Ask what it took to get into the sample, and whether both things you are comparing help you get in.":
    "अस्पताल सबसे ज़ाहिर फ़िल्टर हैं, और यही वजह है कि अस्पताल के मरीज़ों पर बने केस-कंट्रोल अध्ययनों को सावधानी से देखा जाता है। पर कोई भी चुना हुआ समूह यही करता है: जिन लोगों ने सर्वेक्षण का जवाब दिया, जो उपभोक्ता सदस्यता बनाए रखते हैं, जिन आवेदकों को इंटरव्यू मिला। पूछिए कि नमूने में पहुँचने के लिए क्या ज़रूरी था, और क्या आप जिन दो चीज़ों की तुलना कर रहे हैं वे दोनों वहाँ पहुँचने में मदद करती हैं।",
  "Suppose two illnesses are entirely unrelated, and either one on its own gives you some chance of being admitted to hospital. Someone unlucky enough to have both has two shots at admission, so they are much likelier to be in the ward than someone with only one. Now stand inside the ward and count. The people with the first illness are heavily enriched for also having the second, because that is what got many of them in. You have not discovered a link between the diseases. You have rediscovered the admission rule, and dressed it up as biology. The general shape of this is a collider: a thing that two causes both point into. Selecting on it, whether by studying only the admitted, only the tested, or only the successful, links the causes together in your data even when nothing links them in the world. The defence is a sample defined before the filter, which is exactly why population surveys and whole-population registries are worth their cost.":
    "मान लीजिए दो बीमारियों का आपस में कोई नाता नहीं है, और उनमें से हर एक अपने आप में अस्पताल में भर्ती होने की कुछ संभावना पैदा करती है। जिस बदकिस्मत को दोनों हैं, उसके पास भर्ती होने के दो मौके हैं, इसलिए जिसे केवल एक बीमारी है उसके मुकाबले उसके वार्ड में होने की संभावना कहीं ज़्यादा है। अब वार्ड के भीतर खड़े होकर गिनिए। पहली बीमारी वाले लोगों में दूसरी बीमारी वालों का अनुपात बहुत ऊँचा है, क्योंकि उनमें से कई को अंदर पहुँचाया ही इसी बात ने। आपने बीमारियों के बीच कोई संबंध नहीं खोजा है। आपने भर्ती के नियम को दोबारा खोजा है, और उसे जीव विज्ञान का जामा पहना दिया है। इसका आम रूप एक कोलाइडर (collider) है: एक ऐसी चीज़ जिसकी ओर दो कारण इशारा करते हैं। उसी के आधार पर चयन करना, चाहे केवल भर्ती हुए लोगों का अध्ययन करके, केवल जाँच कराए लोगों का, या केवल कामयाब लोगों का, आपके आँकड़ों में उन कारणों को आपस में जोड़ देता है, भले ही दुनिया में उन्हें कुछ भी न जोड़ता हो। इसका बचाव है ऐसा नमूना जो फ़िल्टर से पहले तय हुआ हो, और ठीक इसीलिए आबादी के सर्वेक्षण और पूरी आबादी की रजिस्ट्रियाँ अपनी लागत के लायक हैं।",
  "The bias that was theory for thirty years":
    "वह पूर्वाग्रह जो तीस साल तक सिर्फ़ सिद्धांत रहा",
  "Joseph Berkson warned in 1946 that hospital-based comparisons could manufacture associations, but his argument was mathematical and his numbers were invented to illustrate it. He noted that the same artefact would appear if you sampled shuffled cards rather than patients. It took until this survey, three decades later, for anyone to demonstrate the effect in real people.":
    "जोसेफ बर्कसन ने 1946 में चेताया था कि अस्पताल पर टिकी तुलनाएँ संबंध गढ़ सकती हैं, पर उनकी दलील गणितीय थी और उनके आँकड़े उसे समझाने के लिए गढ़े गए थे। उन्होंने कहा था कि यही कृत्रिम असर तब भी दिखेगा जब आप मरीज़ों के बजाय फेंटे हुए ताश के पत्तों का नमूना लें। असल लोगों में यह असर किसी ने तब जाकर दिखाया, तीन दशक बाद, इसी सर्वेक्षण में।",
  "Why early covid studies disagreed":
    "शुरुआती कोविड अध्ययन आपस में क्यों टकराते थे",
  "In 2020, studies of who caught covid and who fell severely ill could only recruit from people who had been tested or admitted, and early on those were mostly hospital staff, the already unwell and the elderly. Getting into the sample depended on the very things being studied. Analyses showed this alone could produce apparent risk factors, and even reverse the direction of a real one, without any biology behind it.":
    "2020 में, यह अध्ययन कि कोविड किसे हुआ और कौन गंभीर रूप से बीमार पड़ा, केवल उन्हीं लोगों को शामिल कर सकते थे जिनकी जाँच हुई थी या जो अस्पताल में भर्ती हुए थे, और शुरुआती दिनों में वे ज़्यादातर अस्पताल का स्टाफ़, पहले से बीमार लोग और बुज़ुर्ग थे। नमूने में पहुँचना ठीक उन्हीं चीज़ों पर निर्भर था जिनका अध्ययन हो रहा था। विश्लेषणों ने दिखाया कि अकेली यही बात, बिना किसी जीव विज्ञान के, दिखावटी जोखिम कारक पैदा कर सकती थी और किसी असली जोखिम कारक की दिशा तक उलट सकती थी।",
  "Berkson's bias, a reasoning trap.": "बर्कसन का पूर्वाग्रह, तर्क का एक जाल।",
  "Look only at hospital patients and two completely unrelated illnesses can appear to travel together. The reason is not biology, it is the door. Either illness can get you admitted, so people who happen to have both are over-represented inside, and from in there the two look linked. Any filtered group does this: the people who got tested, the applicants who got an interview, the customers who stayed. Before believing a pattern, ask what it took to get into the data.":
    "केवल अस्पताल के मरीज़ों को देखिए और दो बिल्कुल असंबंधित बीमारियाँ साथ साथ चलती दिख सकती हैं। इसकी वजह जीव विज्ञान नहीं है, दरवाज़ा है। दोनों में से कोई भी बीमारी आपको भर्ती करा सकती है, इसलिए जिन्हें संयोग से दोनों हैं वे अंदर कहीं ज़्यादा अनुपात में मौजूद होते हैं, और वहाँ से देखने पर दोनों जुड़ी हुई लगती हैं। कोई भी छाँटा हुआ समूह यही करता है: जिन लोगों की जाँच हुई, जिन आवेदकों को इंटरव्यू मिला, जो ग्राहक टिके रहे। किसी पैटर्न को मानने से पहले पूछिए कि आँकड़ों में पहुँचने के लिए क्या ज़रूरी था।",
  "The counts are Table 2: household interviews with 2,784 people, of whom 257 had been in hospital in the previous six months. The table's own relative odds are 1.06 in the general population and 4.06 among the hospitalised. The hospital figures rest on only 20 people with a respiratory disease, so this single table demonstrates the mechanism rather than measuring its size precisely.":
    "ये आँकड़े तालिका 2 के हैं: 2,784 लोगों से घरों में लिए गए साक्षात्कार, जिनमें से 257 पिछले छह महीनों में अस्पताल में भर्ती रहे थे। तालिका के अपने सापेक्ष ऑड्स आम आबादी में 1.06 और अस्पताल में भर्ती रहे लोगों में 4.06 हैं। अस्पताल वाले आँकड़े साँस की बीमारी वाले केवल 20 लोगों पर टिके हैं, इसलिए यह अकेली तालिका इस तंत्र को दिखाती भर है, उसका आकार ठीक ठीक मापती नहीं।",

  // trap hunt items (spectrum bias, Berkson's bias)
  "A rapid test is validated on patients admitted to hospital with severe disease and on healthy blood donors. It separates the two groups almost perfectly, and the maker reports 98% sensitivity. It is then sold to family doctors for patients with a mild cough.":
    "एक रैपिड जाँच को गंभीर बीमारी के साथ अस्पताल में भर्ती मरीज़ों पर और स्वस्थ रक्तदाताओं पर परखा जाता है। वह दोनों समूहों को लगभग पूरी तरह अलग कर देती है, और बनाने वाली कंपनी 98% संवेदनशीलता बताती है। फिर उसे हल्की खाँसी वाले मरीज़ों के लिए पारिवारिक डॉक्टरों को बेचा जाता है।",
  "Telling the obviously ill from the obviously well is the easiest task there is. A family doctor's patients are all somewhere in between, and that is precisely where the test has never been measured.":
    "साफ़ तौर पर बीमार लोगों को साफ़ तौर पर स्वस्थ लोगों से अलग करना सबसे आसान काम है। पारिवारिक डॉक्टर के मरीज़ सब कहीं बीच में होते हैं, और ठीक वहीं इस जाँच को कभी मापा ही नहीं गया।",
  "A textbook lists a scan as 90% sensitive. A clinic that sees mostly early, mild cases adopts it and finds it misses about a third of the cases later confirmed by specialists. The clinic concludes its machine must be faulty.":
    "एक पाठ्यपुस्तक किसी स्कैन को 90% संवेदनशील बताती है। जिस क्लिनिक में ज़्यादातर शुरुआती, हल्के मामले आते हैं वह उसे अपनाता है और पाता है कि वह ऐसे करीब एक तिहाई मामले चूक जाता है जिनकी पुष्टि बाद में विशेषज्ञ करते हैं। क्लिनिक नतीजा निकालता है कि उसकी मशीन में ज़रूर कोई खराबी है।",
  "A quoted sensitivity comes attached to the patients it was measured on. Earlier and milder disease gives a test less to find, so a lower catch rate is what you should expect, not evidence of a broken machine.":
    "बताई गई संवेदनशीलता उन मरीज़ों से चिपकी आती है जिन पर वह मापी गई थी। शुरुआती और हल्की बीमारी में जाँच के लिए पकड़ने को कम होता है, इसलिए कम पकड़ दर की उम्मीद ही करनी चाहिए, यह खराब मशीन का सबूत नहीं है।",
  "A study of one hospital's inpatients finds that those with a metabolic disease are far more likely to also have a gallbladder disease than the other inpatients. The authors conclude that the first disease brings on the second.":
    "एक अस्पताल के भर्ती मरीज़ों के अध्ययन में पाया जाता है कि चयापचय की बीमारी वालों को बाकी भर्ती मरीज़ों के मुकाबले पित्ताशय की बीमारी भी होने की संभावना कहीं ज़्यादा है। लेखक निष्कर्ष निकालते हैं कि पहली बीमारी दूसरी को पैदा करती है।",
  "Either illness on its own can put someone in a hospital bed, so patients with both are over-represented among inpatients. The link may exist only inside the building.":
    "दोनों में से कोई भी बीमारी अपने आप किसी को अस्पताल के बिस्तर तक पहुँचा सकती है, इसलिए जिन्हें दोनों हैं वे भर्ती मरीज़ों में ज़्यादा अनुपात में मौजूद होते हैं। यह संबंध शायद केवल इमारत के भीतर ही मौजूद हो।",
  "Someone notices that among the people they have dated, the better looking ones were consistently less pleasant company. They conclude that good looks spoil the character.":
    "किसी को लगता है कि जिन लोगों के साथ उसने डेट की, उनमें जो ज़्यादा सुंदर थे उनका साथ हर बार कम सुखद रहा। वह नतीजा निकालता है कि सुंदरता चरित्र बिगाड़ देती है।",
  "People generally agree to a date because someone is good looking or because they are pleasant company. Selecting on that forces a trade-off between the two inside the sample, whatever the relationship is outside it.":
    "लोग आम तौर पर डेट के लिए इसलिए हाँ कहते हैं कि सामने वाला या तो सुंदर है या उसका साथ सुखद है। इसी आधार पर चयन करने से नमूने के भीतर इन दोनों के बीच एक उलटा रिश्ता बन जाता है, चाहे नमूने के बाहर उनका रिश्ता जो भी हो।",
  "A diagnostic test is evaluated on every consecutive patient arriving at a clinic with the same presenting complaint, whatever their eventual diagnosis, and the paper reports its accuracy separately for mild and for advanced disease. Another clinic with a similar caseload adopts the figures.":
    "एक नैदानिक जाँच को उन सभी लगातार मरीज़ों पर परखा जाता है जो एक ही शिकायत लेकर क्लिनिक आते हैं, चाहे आगे चलकर उनका निदान कुछ भी निकले, और शोधपत्र उसकी सटीकता हल्की और बढ़ी हुई बीमारी के लिए अलग अलग बताता है। इसी तरह के मरीज़ों वाला दूसरा क्लिनिक उन आँकड़ों को अपना लेता है।",
  "This is how a diagnostic study should be built. Consecutive patients with one presenting problem, and accuracy broken down by severity, so a reader can find the subgroup that actually resembles their own patients.":
    "नैदानिक अध्ययन ऐसे ही बनाया जाना चाहिए। एक ही शिकायत लेकर आए लगातार मरीज़, और गंभीरता के हिसाब से बाँटी गई सटीकता, ताकि पढ़ने वाला वह उपसमूह ढूँढ सके जो सचमुच उसके अपने मरीज़ों जैसा है।",
  "A company asks whether two things about its users go together. It samples at random from everyone who ever opened an account, including those who never came back and those who cancelled, and finds no relationship between them.":
    "एक कंपनी यह जानना चाहती है कि उसके उपभोक्ताओं की दो बातें साथ साथ चलती हैं या नहीं। वह उन सभी लोगों में से यादृच्छिक रूप से नमूना लेती है जिन्होंने कभी खाता खोला था, उन लोगों समेत जो दोबारा कभी नहीं लौटे और जिन्होंने खाता बंद कर दिया, और उन दोनों बातों के बीच कोई संबंध नहीं पाती।",
  "The sample was drawn before any filter that either of the two things could have influenced. Nothing about staying, succeeding or being admitted decided who got counted, so a selection artefact cannot be hiding in it.":
    "नमूना किसी भी ऐसे फ़िल्टर से पहले लिया गया जिस पर इन दो बातों में से कोई भी असर डाल सकती थी। टिके रहने, कामयाब होने या भर्ती होने से यह तय नहीं हुआ कि किसे गिना जाएगा, इसलिए इसमें चयन का कोई कृत्रिम असर छिपा नहीं हो सकता।",

  // ---- Berkson's bias, corrected reveal (puzzle #9) ----
  "The same survey, the same people, the same two diseases. Across everyone it asked, people with a respiratory disease were barely any likelier to have a bone or joint disease than people without one, and the odds come out at 1.06 against 1, which is nothing. The hospital panel is not a finding about disease, it is a finding about admission. Either illness can put you in a hospital bed, so people with both turn up there far more often than people with one, and inside those walls the two look inseparable:":
    "वही सर्वेक्षण, वही लोग, वही दो बीमारियाँ। उसने जितने लोगों से पूछा, उन सब में साँस की बीमारी वालों को हड्डी या जोड़ की बीमारी होने की संभावना बिना साँस की बीमारी वालों से बमुश्किल ही ज़्यादा थी, और ऑड्स 1.06 बनाम 1 निकलते हैं, यानी कुछ भी नहीं। अस्पताल वाला पैनल बीमारी के बारे में कोई निष्कर्ष नहीं है, वह भर्ती के बारे में निष्कर्ष है। दोनों में से कोई भी बीमारी आपको अस्पताल के बिस्तर तक पहुँचा सकती है, इसलिए जिन्हें दोनों हैं वे वहाँ उनसे कहीं ज़्यादा बार मिलते हैं जिन्हें एक है, और उन दीवारों के भीतर दोनों अलग न होने वाली लगती हैं:",

  // ---- Relative versus absolute risk (puzzle #10) ----
  "A drug cuts your risk of a heart attack by about a third. How many people does that help?":
    "एक दवा दिल के दौरे का आपका जोखिम करीब एक तिहाई घटा देती है। इससे कितने लोगों को फ़ायदा होता है?",
  "A trial gave 6,595 middle-aged men with high cholesterol and no history of heart trouble either a statin or a dummy pill, and followed them for about five years. The drug cut heart attacks and coronary deaths by roughly a third. That is a real result, and it is how the finding was reported.":
    "एक परीक्षण ने ऊँचे कोलेस्ट्रॉल वाले और दिल की कोई पुरानी तकलीफ़ न रखने वाले, अधेड़ उम्र के 6,595 पुरुषों को या तो स्टैटिन दिया या नकली गोली, और करीब पाँच साल तक उन पर नज़र रखी। दवा ने दिल के दौरे और कोरोनरी मौतें करीब एक तिहाई घटा दीं। यह एक असली नतीजा है, और निष्कर्ष इसी तरह बताया भी गया था।",
  "Out of 1,000 men who took it for five years, how many were spared a heart attack or a coronary death?":
    "जिन 1,000 पुरुषों ने इसे पाँच साल तक लिया, उनमें से कितने दिल के दौरे या कोरोनरी मौत से बच गए?",
  "A five-year statin trial in 6,595 men":
    "6,595 पुरुषों में पाँच साल का स्टैटिन परीक्षण",
  "Heart attack or death from heart disease":
    "दिल का दौरा या हृदय रोग से मृत्यु",
  "Dummy pill": "नकली गोली",
  Statin: "स्टैटिन",
  "of the risk removed": "जोखिम का इतना हिस्सा हट गया",
  "spared, in every 1,000 men treated for five years":
    "पाँच साल इलाज पाने वाले हर 1,000 पुरुषों में से इतने बच गए",
  "men treated for five years to spare one":
    "इतने पुरुषों का पाँच साल इलाज, ताकि एक बच जाए",
  "About 300": "लगभग 300",
  "roughly a third of them": "उनमें से करीब एक तिहाई",
  "About 100": "लगभग 100",
  "one in ten": "दस में से एक",
  "About 23": "लगभग 23",
  "roughly 1 in 44": "करीब 44 में से 1",
  "Twenty three men in a thousand.": "एक हज़ार में तेईस पुरुष।",
  "A third of a risk that was small to begin with":
    "एक ऐसे जोखिम का एक तिहाई, जो शुरू से ही छोटा था",
  "Both numbers come from the same trial. Without the drug, about 75 men in 1,000 had a heart attack or died of heart disease over the five years. With it, about 53 did. That is a third of the risk gone, and it is also 23 men in 1,000. The first number is divided by the risk, the second by the people, which is the whole reason they feel so different. Put the other way round, 44 men had to take the drug for five years for one of them to be spared:":
    "दोनों संख्याएँ एक ही परीक्षण से आती हैं। दवा के बिना, 1,000 में से करीब 75 पुरुषों को इन पाँच सालों में दिल का दौरा पड़ा या वे हृदय रोग से मरे। दवा के साथ, करीब 53 को। यही जोखिम का एक तिहाई हट जाना है, और यही 1,000 में 23 पुरुष भी है। पहली संख्या जोखिम से भाग दी गई है, दूसरी लोगों से, और यही पूरी वजह है कि दोनों इतनी अलग लगती हैं। उल्टी तरफ़ से कहें तो, 44 पुरुषों को पाँच साल तक दवा लेनी पड़ी ताकि उनमें से एक बच सके:",
  "A third of what?": "किसका एक तिहाई?",
  "Relative versus absolute risk": "सापेक्ष बनाम निरपेक्ष जोखिम",
  "A percentage reduction tells you what share of a risk went away. It cannot tell you how big that risk was, and that is the part that decides whether it matters to you.":
    "प्रतिशत में बताई गई कमी यह बताती है कि जोखिम का कितना हिस्सा हट गया। वह यह नहीं बता सकती कि वह जोखिम कितना बड़ा था, और यही वह बात है जो तय करती है कि इससे आपको फ़र्क पड़ता है या नहीं।",
  "Whenever you meet a percentage change, ask what it is a percentage of. Halving a one-in-a-million risk and halving a one-in-two risk make the same headline and mean completely different things. The two figures worth asking for are the difference in plain numbers of people, and how many have to be treated for one of them to benefit.":
    "जब भी आपको प्रतिशत में कोई बदलाव मिले, पूछिए कि वह किसका प्रतिशत है। दस लाख में 1 वाले जोखिम को आधा करना और दो में 1 वाले जोखिम को आधा करना, दोनों की सुर्खी एक जैसी बनती है पर उनका मतलब बिल्कुल अलग होता है। दो आँकड़े माँगने लायक हैं: सीधे सादे लोगों की गिनती में फ़र्क कितना है, और कितने लोगों का इलाज करना पड़ता है ताकि उनमें से एक को फ़ायदा हो।",
  "Take a risk of 8 in 100 and drop it to 5 in 100. Divide the drop by the risk and you get a third, which sounds like a lot. Divide the same drop by the people and you get 3 in 100, which sounds like very little. Neither is wrong. They answer different questions: what fraction of the danger was removed, and what are the odds this helps me. Only the second one is about you. The gap between them grows as the risk shrinks, which is why the most impressive relative figures usually come from the rarest outcomes. This is not only a media problem. Relative figures make treatments look better to doctors too, and the same trial result draws more enthusiasm when it is described relatively than when it is described in whole people. It also cuts the other way with harms: a scare expressed as a doubling of risk sounds alarming whether the risk went from 1 in 10 to 2 in 10 or from 1 in 100,000 to 2 in 100,000. The habit that protects you in both directions is to insist on the numbers out of a fixed group of people, and on how many have to be treated, or exposed, for one to be affected.":
    "100 में से 8 का जोखिम लीजिए और उसे घटाकर 100 में से 5 कर दीजिए। इस गिरावट को जोखिम से भाग दीजिए तो एक तिहाई मिलता है, जो बहुत ज़्यादा सुनाई देता है। उसी गिरावट को लोगों से भाग दीजिए तो 100 में से 3 मिलता है, जो बहुत कम सुनाई देता है। दोनों में से कोई गलत नहीं है। वे अलग अलग सवालों के जवाब देते हैं: खतरे का कितना हिस्सा हटा, और इस बात की संभावना कितनी है कि इससे मुझे फ़ायदा होगा। इनमें से केवल दूसरा सवाल आपके बारे में है। जोखिम जितना छोटा होता जाता है, दोनों के बीच की खाई उतनी ही बढ़ती जाती है, और यही वजह है कि सबसे प्रभावशाली सापेक्ष आँकड़े आम तौर पर सबसे दुर्लभ नतीजों से आते हैं। यह सिर्फ़ मीडिया की समस्या नहीं है। सापेक्ष आँकड़े इलाज को डॉक्टरों की नज़र में भी बेहतर दिखाते हैं, और एक ही परीक्षण के नतीजे को सापेक्ष रूप में बताने पर उस पर ज़्यादा उत्साह जगता है, बजाय इसके कि उसे पूरे लोगों में गिनकर बताया जाए। नुकसान के मामले में यह उल्टी दिशा में भी काटता है: जोखिम के दोगुना होने के रूप में बताया गया डर डरावना ही लगता है, चाहे जोखिम 10 में से 1 से बढ़कर 10 में से 2 हुआ हो या 100,000 में से 1 से बढ़कर 100,000 में से 2। दोनों दिशाओं में आपको बचाने वाली आदत यह है कि लोगों के एक तय समूह में से गिनती माँगी जाए, और यह भी पूछा जाए कि एक व्यक्ति पर असर पड़ने के लिए कितने लोगों का इलाज करना, या कितने लोगों का उस चीज़ के संपर्क में आना, ज़रूरी है।",
  "The same kind of drug, in people at real risk":
    "वही तरह की दवा, असली जोखिम वाले लोगों में",
  "A second trial gave a statin to patients who had already had a heart attack or had angina. Major coronary events fell from 28 percent to 19 percent. As a relative figure that is about a third, almost the same headline as in the healthy men. But because the risk it was cutting into was nearly four times larger, the gain was about 9 patients in every 100 instead of 2. The identical headline, several times the benefit. This is why a percentage on its own cannot tell you whether a drug is worth taking, and why the answer differs from patient to patient.":
    "एक दूसरे परीक्षण ने उन मरीज़ों को स्टैटिन दिया जिन्हें पहले दिल का दौरा पड़ चुका था या जिन्हें एनजाइना था। बड़ी कोरोनरी घटनाएँ 28 प्रतिशत से घटकर 19 प्रतिशत रह गईं। सापेक्ष आँकड़े के रूप में यह करीब एक तिहाई है, यानी स्वस्थ पुरुषों वाली सुर्खी जैसी ही सुर्खी। पर चूँकि जिस जोखिम में यह कटौती हो रही थी वह करीब चार गुना बड़ा था, फ़ायदा हर 100 में 2 मरीज़ों के बजाय करीब 9 मरीज़ों का हुआ। सुर्खी बिल्कुल वही, फ़ायदा कई गुना। यही वजह है कि अकेला प्रतिशत आपको यह नहीं बता सकता कि कोई दवा लेने लायक है या नहीं, और यही वजह है कि इसका जवाब हर मरीज़ के लिए अलग होता है।",
  "When a relative figure did real damage":
    "जब एक सापेक्ष आँकड़े ने असली नुकसान किया",
  "In October 1995 a British safety committee warned that some contraceptive pills carried about twice the risk of a blood clot. The warning travelled as a doubling, with no sense of how small the risk was either way, and women stopped taking the pill. Among girls under 16, use fell from 40 percent to 27 percent within a year. The health service met roughly 21 million pounds in extra maternity costs and 46 million pounds in abortion provision. A relative figure with no absolute figure beside it is not a neutral way to describe a risk.":
    "अक्तूबर 1995 में ब्रिटेन की एक दवा सुरक्षा समिति ने चेताया कि कुछ गर्भनिरोधक गोलियों के साथ खून का थक्का बनने का जोखिम करीब दोगुना है। यह चेतावनी ‘दोगुना’ बनकर फैली, इस अहसास के बिना कि दोनों ही हालात में जोखिम कितना छोटा था, और महिलाओं ने गोली लेना बंद कर दिया। 16 साल से कम उम्र की लड़कियों में इसका इस्तेमाल एक साल के भीतर 40 प्रतिशत से गिरकर 27 प्रतिशत रह गया। स्वास्थ्य सेवा को प्रसूति का करीब 2.1 करोड़ पाउंड अतिरिक्त खर्च और गर्भपात सेवाओं का 4.6 करोड़ पाउंड खर्च उठाना पड़ा। जिस सापेक्ष आँकड़े के बगल में निरपेक्ष आँकड़ा न हो, वह जोखिम बताने का निष्पक्ष तरीका नहीं है।",
  "The fix is in the wording": "उपाय शब्दों के चुनाव में है",
  "Describe the same result in whole people, so many out of 1,000 against so many out of 1,000, and both patients and doctors judge it far more accurately than when it arrives as a percentage reduction. Relative risks belong to a small family of formats that reliably confuse, alongside single-event probabilities and conditional ones like a test's sensitivity. None of them is wrong. They are just easy to misread, and there is a clearer way to say the same thing.":
    "वही नतीजा पूरे लोगों में बताइए, 1,000 में से इतने बनाम 1,000 में से इतने, और मरीज़ तथा डॉक्टर, दोनों उसे प्रतिशत में बताई गई कमी के मुकाबले कहीं ज़्यादा सही ढंग से आँकते हैं। सापेक्ष जोखिम उन चंद प्रारूपों के परिवार का हिस्सा है जो लोगों को बार बार उलझाते हैं; इसी परिवार में एकल घटना की संभावनाएँ और सशर्त संभावनाएँ भी हैं, जैसे किसी जाँच की संवेदनशीलता। इनमें से कोई गलत नहीं है। बस इन्हें गलत पढ़ लेना आसान है, और वही बात कहने का एक साफ़ तरीका मौजूद है।",
  "Relative versus absolute risk, a reasoning trap.":
    "सापेक्ष बनाम निरपेक्ष जोखिम, तर्क का एक जाल।",
  '"Cuts your risk by a third" sounds enormous. But a third of what? If the risk was 75 in 1,000, a third of it is 23 people. If the risk was 3 in 1,000, a third of it is one. The percentage tells you how much of the risk went away and says nothing at all about how much risk there was, which is the part that decides whether it matters to you. Ask for the plain numbers: how many out of 1,000, and how many people have to take it for one of them to benefit.':
    "“जोखिम एक तिहाई घटा देती है” सुनने में बहुत बड़ी बात लगती है। पर किसका एक तिहाई? अगर जोखिम 1,000 में 75 था, तो उसका एक तिहाई 23 लोग हैं। अगर जोखिम 1,000 में 3 था, तो उसका एक तिहाई एक व्यक्ति है। प्रतिशत आपको बताता है कि जोखिम का कितना हिस्सा हट गया, और यह बिल्कुल नहीं बताता कि जोखिम था कितना, जबकि यही वह बात है जो तय करती है कि इससे आपको फ़र्क पड़ता है या नहीं। सीधी सादी संख्याएँ माँगिए: 1,000 में से कितने, और कितने लोगों को इसे लेना पड़ता है ताकि उनमें से एक को फ़ायदा हो।",
  "The counts are the trial's primary endpoint, a definite nonfatal heart attack or death from coronary heart disease: 248 events among the men on placebo and 174 among those on pravastatin, over an average of 4.9 years. The paper reports a 31 percent relative risk reduction, estimated from a proportional-hazards model; the crude counts give 30 percent. Every figure this puzzle shows is derived from the counts, so it quotes about a third rather than a number the chart would contradict.":
    "ये आँकड़े परीक्षण के प्राथमिक एंडपॉइंट के हैं, यानी एक निश्चित गैर घातक दिल का दौरा या कोरोनरी हृदय रोग से मृत्यु: प्लेसिबो लेने वाले पुरुषों में 248 घटनाएँ और प्रवास्टैटिन लेने वालों में 174, औसतन 4.9 साल में। शोधपत्र सापेक्ष जोखिम में 31 प्रतिशत की कमी बताता है, जो प्रोपोर्शनल हैज़र्ड्स मॉडल से आँकी गई है; सीधी गिनती 30 प्रतिशत देती है। यह पहेली जो भी आँकड़ा दिखाती है वह इन्हीं गिनतियों से निकला है, इसलिए यह ऐसी कोई संख्या बताने के बजाय ‘करीब एक तिहाई’ कहती है जिसे ग्राफ़ खुद झुठला दे।",

  // trap hunt items (relative versus absolute risk)
  "A press release says a new drug halves the risk of a rare complication. It does not say how common the complication is. A newspaper runs the story under the headline that the drug halves the danger.":
    "एक प्रेस विज्ञप्ति कहती है कि नई दवा एक दुर्लभ जटिलता का जोखिम आधा कर देती है। वह यह नहीं बताती कि वह जटिलता कितनी आम है। एक अख़बार यह खबर इस सुर्खी के साथ छापता है कि दवा खतरे को आधा कर देती है।",
  "Halving a risk means nothing until you know the risk. If the complication strikes 2 people in 10,000, halving it spares one of them.":
    "जब तक आपको जोखिम पता न हो, उसका आधा होना कोई मायने नहीं रखता। अगर वह जटिलता 10,000 में से 2 लोगों को होती है, तो उसे आधा करने पर उनमें से एक बचता है।",
  "A supplement is advertised as cutting the chance of a particular cancer by 40%. The trial it rests on found 7 cases among about 1,000 people taking the supplement and 12 among about 1,000 taking a dummy.":
    "एक सप्लीमेंट का विज्ञापन कहता है कि यह एक ख़ास कैंसर की संभावना 40% घटा देता है। जिस परीक्षण पर यह टिका है उसमें सप्लीमेंट लेने वाले करीब 1,000 लोगों में 7 मामले मिले और नकली गोली लेने वाले करीब 1,000 लोगों में 12।",
  "The 40% is arithmetically right and it amounts to 5 people in 1,000. Around 200 people would have to take the supplement for years for one of them to avoid a cancer.":
    "40% का आँकड़ा गणित के हिसाब से सही है और वह 1,000 में 5 लोगों के बराबर बैठता है। किसी एक व्यक्ति का कैंसर टलने के लिए करीब 200 लोगों को यह सप्लीमेंट सालों तक लेना पड़ेगा।",
  "A trial reports that the treatment reduced strokes from 12 in every 100 patients to 8 in every 100, calls that a reduction of a third, and adds that about 25 patients need to be treated for five years to prevent one stroke.":
    "एक परीक्षण बताता है कि उपचार ने स्ट्रोक हर 100 मरीज़ों में 12 से घटाकर हर 100 में 8 कर दिए, इसे एक तिहाई की कमी कहता है, और यह भी जोड़ता है कि एक स्ट्रोक रोकने के लिए करीब 25 मरीज़ों का पाँच साल तक इलाज करना पड़ता है।",
  "The relative figure, the plain numbers of people and the number needed to treat are all on the table, so nothing is hidden behind the percentage. This is how a result should be reported.":
    "सापेक्ष आँकड़ा, लोगों की सीधी सादी गिनती और उपचार के लिए आवश्यक संख्या (number needed to treat), तीनों सामने रखे गए हैं, इसलिए प्रतिशत के पीछे कुछ भी छिपा नहीं है। नतीजा इसी तरह बताया जाना चाहिए।",

  // scope tags (relative and absolute views)
  "Compared to the risk": "जोखिम के मुकाबले",
  "Compared to the people": "लोगों के मुकाबले",

  // ---- Confounding by indication (puzzle #11) ----
  "Patients taking this heart drug died more often than patients not taking it. Is the drug killing them?":
    "दिल की यह दवा लेने वाले मरीज़ न लेने वालों के मुकाबले ज़्यादा मरे। क्या दवा उन्हें मार रही है?",
  "6,800 people with heart failure. When they joined the trial, some were already on digoxin because a doctor had decided to prescribe it, and some were not. Over the following years, 40 percent of those already on it died, against 31 percent of the others.":
    "हृदय विफलता (heart failure) से पीड़ित 6,800 लोग। परीक्षण में शामिल होते समय कुछ लोग पहले से डिजॉक्सिन ले रहे थे, क्योंकि किसी डॉक्टर ने उसे लिखने का फ़ैसला किया था, और कुछ नहीं ले रहे थे। अगले सालों में, जो पहले से इसे ले रहे थे उनमें से 40 प्रतिशत की मृत्यु हुई, जबकि बाकी लोगों में 31 प्रतिशत की।",
  "Is digoxin causing those extra deaths?":
    "क्या ये अतिरिक्त मौतें डिजॉक्सिन की वजह से हो रही हैं?",
  "Died during the trial": "परीक्षण के दौरान मृत्यु",
  "On digoxin": "डिजॉक्सिन ले रहे थे",
  Digoxin: "डिजॉक्सिन",
  "Not on digoxin": "डिजॉक्सिन नहीं ले रहे थे",
  "Not on it": "बिना डिजॉक्सिन",
  "Sorted by what doctors prescribed":
    "डॉक्टरों ने जो लिखा उसके हिसाब से बाँटा गया",
  "Sorted by the trial's coin flip": "परीक्षण के सिक्के के उछाल से बाँटा गया",
  "As prescribed in practice": "जैसा असल व्यवहार में लिखा गया",
  "Yes, the drug is harming them": "हाँ, दवा उन्हें नुकसान पहुँचा रही है",
  "nine points worse": "नौ अंक ज़्यादा खराब",
  "No, and adjusting for severity will show that":
    "नहीं, और गंभीरता के लिए समायोजन यही दिखा देगा",
  "the statistics can correct it": "सांख्यिकी इसे सुधार सकती है",
  "No, and adjusting will not fix it either":
    "नहीं, और समायोजन से भी यह ठीक नहीं होगा",
  "the prescription marks the patient":
    "दवा लिखा जाना मरीज़ पर निशान लगा देता है",
  "The same 6,800 patients, sorted by a coin flip. No difference.":
    "वही 6,800 मरीज़, सिक्के के उछाल से बाँटे गए। कोई फ़र्क नहीं।",
  "The prescription marked how ill they already were":
    "दवा लिखा जाना बता रहा था कि वे पहले से कितने बीमार थे",
  "These are the same people in both panels, grouped two different ways. Sorted by what their doctors had decided, digoxin looks lethal. Sorted by the trial's random assignment, which no clinical judgement touched, the two groups die at the same rate. Doctors were reaching for digoxin in the patients who were already worse off, so the prescription carried information about the patient that nothing in the dataset had recorded:":
    "दोनों पैनलों में ये वही लोग हैं, बस दो अलग तरीकों से बाँटे गए। उनके डॉक्टरों ने जो तय किया था उसके हिसाब से बाँटने पर डिजॉक्सिन जानलेवा लगती है। परीक्षण के यादृच्छिक बँटवारे के हिसाब से बाँटने पर, जिसे किसी नैदानिक राय ने छुआ तक नहीं, दोनों समूह एक ही दर से मरते हैं। डॉक्टर डिजॉक्सिन उन्हीं मरीज़ों के लिए उठा रहे थे जिनकी हालत पहले से खराब थी, इसलिए दवा लिखे जाने में मरीज़ के बारे में वह जानकारी छिपी थी जो आँकड़ों में कहीं दर्ज ही नहीं थी:",
  "Both ways of sorting": "बाँटने के दोनों तरीके",
  "Adjusting for 27 recorded baseline characteristics barely moved it, from a 36 percent excess to 22 percent. And the same excess turned up among the patients the trial had randomised to placebo, people who took no digoxin at all during it. A drug cannot harm those who never received it, so the excess was never the drug.":
    "दर्ज की गई 27 आधारभूत विशेषताओं के लिए समायोजन करने पर यह मुश्किल से हिला, 36 प्रतिशत की अधिकता से घटकर 22 प्रतिशत। और वही अधिकता उन मरीज़ों में भी दिखी जिन्हें परीक्षण ने यादृच्छिक रूप से प्लेसिबो में डाला था, यानी उन लोगों में जिन्होंने उस दौरान डिजॉक्सिन ली ही नहीं। कोई दवा उन्हें नुकसान नहीं पहुँचा सकती जिन्हें वह मिली ही नहीं, इसलिए यह अधिकता कभी दवा की थी ही नहीं।",
  "The reason for the prescription": "दवा लिखने की वजह",
  "Confounding by indication":
    "इलाज चुनने की वजह से पैदा भ्रामकता (confounding by indication)",
  "When a doctor decides who gets a treatment, the treated differ from the untreated in ways the data never recorded, and the treatment takes the blame, or the credit, for the reason it was given.":
    "जब कोई डॉक्टर तय करता है कि इलाज किसे मिलेगा, तो इलाज पाने वाले न पाने वालों से ऐसे तरीकों में अलग होते हैं जो आँकड़ों में कभी दर्ज ही नहीं हुए, और जिस वजह से इलाज दिया गया था उसका दोष, या श्रेय, इलाज के सिर चढ़ जाता है।",
  'This is why observational comparisons between treated and untreated patients are read so warily, and why "we adjusted for that" does not end the argument. Adjustment can only remove what was written down. The judgement that led to the prescription usually was not.':
    "यही वजह है कि इलाज पाने वाले और न पाने वाले मरीज़ों की अवलोकन आधारित तुलनाओं को इतनी सावधानी से पढ़ा जाता है, और यही वजह है कि “हमने उसके लिए समायोजन कर लिया था” कह देने से बहस खत्म नहीं होती। समायोजन केवल वही हटा सकता है जो लिखकर दर्ज किया गया हो। जिस राय के चलते दवा लिखी गई, वह आम तौर पर दर्ज नहीं होती।",
  "Treatments are not handed out at random. A doctor prescribes because of something about the patient: they are sicker, or frailer, or their symptoms are worse. That something also affects how they were going to do anyway. So the treated group starts out different, and any comparison with the untreated measures both the drug and the reason it was chosen, tangled together. It runs both ways. A drug given to the sickest looks harmful; a drug given to the fittest, or one that only patients well enough to attend a clinic can receive, looks miraculous. The standard defence is to adjust for the differences, and it helps, but only for the differences someone thought to record. The clinician's impression that this particular patient was going downhill is real information, it is why the prescription happened, and it is almost never in the dataset. That is the whole reason randomised trials are worth their expense: a coin flip cannot know anything about the patient, so it cannot smuggle the reason into the comparison. When a trial and an observational study disagree about the same drug, this is usually why.":
    "इलाज यूँ ही यादृच्छिक रूप से नहीं बाँटे जाते। डॉक्टर दवा मरीज़ की किसी बात की वजह से लिखता है: वह ज़्यादा बीमार है, या ज़्यादा कमज़ोर, या उसके लक्षण ज़्यादा खराब हैं। वही बात इस पर भी असर डालती है कि उसका हाल वैसे भी कैसा रहने वाला था। इसलिए इलाज पाने वाला समूह शुरू से ही अलग होता है, और इलाज न पाने वालों से उसकी कोई भी तुलना दवा और उसे चुनने की वजह, दोनों को एक साथ उलझाकर मापती है। यह दोनों दिशाओं में चलता है। सबसे बीमार लोगों को दी गई दवा नुकसानदेह लगती है; सबसे तंदुरुस्त लोगों को दी गई दवा, या ऐसी दवा जो केवल वही मरीज़ पा सकते हैं जो क्लिनिक तक आने लायक हैं, चमत्कारी लगती है। आम बचाव यह है कि इन अंतरों के लिए समायोजन कर लिया जाए, और इससे मदद मिलती भी है, पर केवल उन्हीं अंतरों के लिए जिन्हें किसी ने दर्ज करने की सोची थी। डॉक्टर को यह जो लगा कि यह मरीज़ ढलान पर है, वह असली जानकारी है, वही दवा लिखे जाने की वजह है, और वह आँकड़ों में लगभग कभी नहीं होती। यादृच्छिक परीक्षण अपने खर्च के लायक इसीलिए हैं: सिक्के का उछाल मरीज़ के बारे में कुछ भी नहीं जान सकता, इसलिए वह उस वजह को चोरी छिपे तुलना में नहीं घुसा सकता। जब एक ही दवा के बारे में कोई परीक्षण और कोई अवलोकन आधारित अध्ययन आपस में टकराते हैं, तो वजह आम तौर पर यही होती है।",
  "Taking your pills predicts survival, even when they are dummies":
    "गोलियाँ नियम से लेना उत्तरजीविता बता देता है, तब भी जब वे नकली हों",
  "An earlier trial split its patients by how faithfully they had taken their tablets. Those who took at least 80 percent of them had 15.0 percent five-year mortality against 24.6 percent for the rest, which looks like proof that the drug works if you actually take it. Then the researchers ran the same split inside the placebo group, where the tablets contained nothing: 15.1 percent against 28.2 percent. Adjusting for 40 recorded characteristics narrowed that gap to 16.4 against 25.8 and left it overwhelming. Whatever adherence marks about a person, it was not the medicine.":
    "एक पुराने परीक्षण ने अपने मरीज़ों को इस हिसाब से बाँटा कि उन्होंने अपनी गोलियाँ कितने नियम से ली थीं। जिन्होंने उनमें से कम से कम 80 प्रतिशत गोलियाँ लीं, उनकी पाँच साल की मृत्यु दर 15.0 प्रतिशत रही, जबकि बाकी लोगों की 24.6 प्रतिशत, जो इस बात का सबूत लगता है कि दवा तभी काम करती है जब आप उसे सचमुच लें। फिर शोधकर्ताओं ने वही बँटवारा प्लेसिबो समूह के भीतर भी किया, जहाँ गोलियों में कुछ था ही नहीं: 15.1 प्रतिशत बनाम 28.2 प्रतिशत। दर्ज की गई 40 विशेषताओं के लिए समायोजन ने उस खाई को घटाकर 16.4 बनाम 25.8 किया, और वह फिर भी भारी बनी रही। गोलियाँ नियम से लेना किसी व्यक्ति के बारे में जो भी बताता हो, वह दवा नहीं थी।",
  "The same argument, about a procedure": "वही दलील, एक प्रक्रिया के बारे में",
  "In a study of 5,735 critically ill patients, those who had a catheter threaded into the right side of the heart died more often within 30 days than those who did not, 38.0 percent against 30.6 percent. The procedure was reserved for the patients in most trouble. When it was later tested by randomising who got one, mortality came out at 62 percent with the catheter and 60 percent without, in a trial whose patients were sicker still. The gap that had looked like harm was mostly a gap in who was chosen.":
    "गंभीर रूप से बीमार 5,735 मरीज़ों के एक अध्ययन में, जिनके दिल के दाहिने हिस्से तक कैथेटर डाला गया वे 30 दिनों के भीतर बाकी लोगों से ज़्यादा मरे, 38.0 प्रतिशत बनाम 30.6 प्रतिशत। यह प्रक्रिया सबसे ज़्यादा मुश्किल में फँसे मरीज़ों के लिए ही रखी जाती थी। बाद में जब यादृच्छिक रूप से तय करके इसे परखा गया कि कैथेटर किसे मिलेगा, तो मृत्यु दर कैथेटर के साथ 62 प्रतिशत और उसके बिना 60 प्रतिशत निकली, और उस परीक्षण के मरीज़ तो और भी ज़्यादा बीमार थे। जो खाई नुकसान जैसी दिख रही थी, वह ज़्यादातर इस बात की खाई थी कि चुना किसे गया।",
  "Confounding by indication, a reasoning trap.":
    "इलाज चुनने की वजह से पैदा भ्रामकता, तर्क का एक जाल।",
  "Nobody hands out medicines at random. Doctors prescribe because of something about the patient, and that something usually affects how the patient was going to do anyway. So people on a drug can die more often than people not on it while the drug does nothing at all: it was given to those who were already worse off. Adjusting for the differences helps, but only the differences somebody wrote down, and the reason for the prescription rarely is one. It is why a coin flip is worth so much.":
    "दवाएँ कोई यूँ ही यादृच्छिक रूप से नहीं बाँटता। डॉक्टर मरीज़ की किसी बात की वजह से दवा लिखते हैं, और वह बात आम तौर पर इस पर भी असर डालती है कि मरीज़ का हाल वैसे भी कैसा रहने वाला था। इसलिए कोई दवा लेने वाले लोग न लेने वालों से ज़्यादा मर सकते हैं, जबकि दवा कुछ भी नहीं कर रही होती: वह उन्हें दी गई थी जिनकी हालत पहले से खराब थी। अंतरों के लिए समायोजन मदद करता है, पर केवल उन अंतरों के लिए जिन्हें किसी ने लिखकर दर्ज किया, और दवा लिखने की वजह शायद ही कभी दर्ज होती है। सिक्के का उछाल इसीलिए इतना कीमती है।",
  "The four death counts are printed in the 2019 paper, and the randomised arm sizes in the 1997 trial report. The two prescribed-in-practice denominators are not printed anywhere: 3,017 is the sum of the supplement's two counts of prior digoxin use (1,498 and 1,519) and 3,783 is the rest of the 6,800. That is addition over published whole numbers rather than a figure worked backwards from a percentage, and it closes both ways: 1,207 plus 1,168 and 1,181 plus 1,194 both give 2,375 deaths, and both pairs of denominators give 6,800 patients.":
    "मौतों की चारों गिनतियाँ 2019 के शोधपत्र में छपी हैं, और यादृच्छिक रूप से बाँटे गए समूहों के आकार 1997 की परीक्षण रिपोर्ट में। असल व्यवहार में दवा लिखे जाने के हिसाब से बने दोनों समूहों के कुल आकार कहीं छपे ही नहीं हैं: 3,017 पूरक सामग्री में दी गई, पहले से डिजॉक्सिन लेने की दो गिनतियों (1,498 और 1,519) का जोड़ है, और 3,783 उन 6,800 में से बचा हुआ हिस्सा। यह किसी प्रतिशत से उलटा हिसाब लगाकर निकाला गया आँकड़ा नहीं, बल्कि प्रकाशित पूर्ण संख्याओं का जोड़ है, और यह दोनों तरफ़ से मिल जाता है: 1,207 और 1,168 का जोड़, तथा 1,181 और 1,194 का जोड़, दोनों 2,375 मौतें देते हैं, और कुल आकारों की दोनों जोड़ियाँ 6,800 मरीज़ देती हैं।",

  // trap hunt items (confounding by indication)
  "A hospital reviews its records and finds that patients who were given a particular breathing support died far more often than patients who were not. A committee recommends using it less.":
    "एक अस्पताल अपने रिकॉर्ड की समीक्षा करता है और पाता है कि जिन मरीज़ों को साँस लेने में मदद देने वाला एक ख़ास सहारा दिया गया, वे न पाने वालों के मुकाबले कहीं ज़्यादा मरे। एक समिति इसका इस्तेमाल कम करने की सिफ़ारिश करती है।",
  "The support was given to the patients who were struggling to breathe. It is standing in for how ill they already were, and the records cannot separate the treatment from the reason it was reached for.":
    "यह सहारा उन्हीं मरीज़ों को दिया गया था जिन्हें साँस लेने में तकलीफ़ हो रही थी। वह इस बात की निशानी बन जाता है कि वे पहले से कितने बीमार थे, और रिकॉर्ड इलाज को उस वजह से अलग नहीं कर सकते जिसके चलते वह इलाज उठाया गया।",
  "An observational study finds higher mortality among patients on a drug. The authors adjust for age, sex, blood pressure and twelve laboratory values, the excess shrinks a little but remains, and they conclude the drug is harmful.":
    "एक अवलोकन आधारित अध्ययन पाता है कि कोई दवा लेने वाले मरीज़ों में मृत्यु दर ज़्यादा है। लेखक उम्र, लिंग, रक्तचाप और बारह प्रयोगशाला मानों के लिए समायोजन करते हैं, यह अधिकता थोड़ी घटती है पर बनी रहती है, और वे निष्कर्ष निकालते हैं कि दवा नुकसानदेह है।",
  "Adjustment can only remove what was recorded. The clinician's sense that this patient was deteriorating is exactly why the drug was prescribed, and it is not among the twelve laboratory values.":
    "समायोजन केवल वही हटा सकता है जो दर्ज हुआ हो। डॉक्टर को यह जो लगा कि यह मरीज़ बिगड़ रहा है, ठीक इसी वजह से दवा लिखी गई थी, और वह उन बारह प्रयोगशाला मानों में शामिल नहीं है।",

  // trap hunt items (a second pass over the earlier skills)
  "A national audit finds that patients operated on at small local hospitals survive more often than those at large teaching hospitals. Broken down by how severe the case was, the teaching hospitals come out ahead in every category.":
    "एक राष्ट्रीय ऑडिट पाता है कि छोटे स्थानीय अस्पतालों में ऑपरेशन कराने वाले मरीज़ बड़े शिक्षण अस्पतालों के मरीज़ों के मुकाबले ज़्यादा बचते हैं। मामले की गंभीरता के हिसाब से बाँटने पर, हर श्रेणी में शिक्षण अस्पताल आगे निकलते हैं।",
  "Teaching hospitals take the difficult cases, so their pooled figure is dragged down by a case mix nobody chose at random. Better in every severity band and worse overall is the signature of that.":
    "शिक्षण अस्पताल मुश्किल मामले लेते हैं, इसलिए उनका मिलाजुला आँकड़ा मरीज़ों के ऐसे मिश्रण से नीचे खिंच जाता है जिसे किसी ने यादृच्छिक रूप से नहीं चुना। गंभीरता की हर पट्टी में बेहतर और कुल मिलाकर बदतर, यही इसकी पहचान है।",
  "A genetic test for a condition affecting about 1 in 5,000 people is 99.9% accurate. A clinic tells everyone who screens positive that the diagnosis is essentially confirmed.":
    "लगभग 5,000 में से 1 व्यक्ति को होने वाली एक बीमारी की आनुवंशिक जाँच 99.9% सटीक है। एक क्लिनिक हर उस व्यक्ति से कहता है जिसकी स्क्रीनिंग पॉज़िटिव आती है कि निदान लगभग पक्का हो चुका है।",
  "Even at 99.9%, errors outnumber real cases when the condition is this rare. Among 100,000 people about 20 have it, and about 100 healthy people also test positive, so a positive is right roughly one time in six.":
    "बीमारी इतनी दुर्लभ हो तो 99.9% सटीकता पर भी गलतियाँ असली मामलों से ज़्यादा हो जाती हैं। 100,000 लोगों में करीब 20 को यह बीमारी होती है, और करीब 100 स्वस्थ लोगों की जाँच भी पॉज़िटिव आती है, इसलिए पॉज़िटिव परिणाम करीब छह में से एक बार ही सही होता है।",
  "A surgeon reports excellent long-term results in the patients seen at the five-year follow-up clinic. Patients who moved away, stopped attending, or died before five years are not in the series.":
    "एक सर्जन पाँच साल की फ़ॉलो-अप क्लिनिक में आने वाले मरीज़ों में बेहतरीन दीर्घकालिक नतीजे बताता है। जो मरीज़ कहीं और चले गए, जिन्होंने आना बंद कर दिया, या जो पाँच साल से पहले चल बसे, वे इस शृंखला में हैं ही नहीं।",
  "The series was defined by who was still turning up. The patients who did worst are precisely the ones most likely to be missing from it, so the outcomes describe the survivors rather than the operation.":
    "यह शृंखला इस बात से तय हुई कि अब भी कौन आ रहा है। जिन मरीज़ों के नतीजे सबसे खराब रहे, ठीक उन्हीं के इसमें से गायब होने की संभावना सबसे ज़्यादा है, इसलिए ये नतीजे ऑपरेशन का नहीं, बचे हुए लोगों का वर्णन करते हैं।",
  "Hospitals that use more of a particular monitoring device have lower death rates. The manufacturer's brochure concludes that buying the device saves lives.":
    "जो अस्पताल एक ख़ास निगरानी उपकरण का ज़्यादा इस्तेमाल करते हैं वहाँ मृत्यु दर कम है। बनाने वाली कंपनी की पुस्तिका निष्कर्ष निकालती है कि यह उपकरण खरीदने से जानें बचती हैं।",
  "Hospitals that can afford more monitors can usually afford more of everything else too, including staff. The device may be a marker of a well resourced hospital rather than the cause of its results.":
    "जो अस्पताल ज़्यादा मॉनिटर खरीद सकते हैं वे आम तौर पर बाकी हर चीज़ भी ज़्यादा जुटा सकते हैं, स्टाफ़ समेत। हो सकता है यह उपकरण अपने नतीजों का कारण न हो, बल्कि इस बात की निशानी हो कि अस्पताल के पास संसाधन अच्छे हैं।",
  "A rare reaction occurs in about 1 in 50,000 people taking a drug. A patient develops it, and a report concludes there is only a 1 in 50,000 chance the drug was not responsible.":
    "कोई दवा लेने वाले लगभग 50,000 में से 1 व्यक्ति को एक दुर्लभ प्रतिक्रिया होती है। एक मरीज़ को यह प्रतिक्रिया हो जाती है, और एक रिपोर्ट निष्कर्ष निकालती है कि इसके लिए दवा ज़िम्मेदार न होने की संभावना केवल 50,000 में 1 है।",
  "That flips the question round. The 1 in 50,000 is how often the reaction appears among people taking the drug, not the chance the drug caused this case. Answering that needs to know how often the same thing happens in people who never took it.":
    "यह सवाल को उल्टा कर देना है। 50,000 में 1 का आँकड़ा बताता है कि दवा लेने वाले लोगों में यह प्रतिक्रिया कितनी बार दिखती है, न कि यह कि इस मामले में दवा ही इसका कारण होने की संभावना कितनी है। उसका जवाब देने के लिए यह जानना ज़रूरी है कि जिन लोगों ने कभी यह दवा नहीं ली उनमें यही चीज़ कितनी बार होती है।",

  // trap hunt items (genuinely sound reasoning)
  "A trial reports the outcome it registered in advance as its main one, states that it also measured eleven others, and says plainly that success was judged on the registered outcome alone.":
    "एक परीक्षण उसी नतीजे को अपना मुख्य नतीजा बताता है जिसे उसने पहले से पंजीकृत कराया था, यह भी बताता है कि उसने ग्यारह और नतीजे मापे थे, और साफ़ साफ़ कहता है कि सफलता केवल उसी पंजीकृत नतीजे के आधार पर आँकी गई।",
  "Naming the outcome before seeing the data, and then reporting all of them, is what stops a study quietly promoting whichever measure happened to come out well.":
    "आँकड़े देखने से पहले नतीजा तय कर देना, और फिर सभी नतीजे बता देना, यही किसी अध्ययन को उस माप को चुपचाप आगे बढ़ाने से रोकता है जो संयोग से अच्छी निकल आई हो।",
  "A cohort study links an exposure to a disease. It reports that the association survived adjustment for the confounders named in advance, that more exposure went with more disease, and that two independent cohorts elsewhere found the same pattern.":
    "एक कोहोर्ट अध्ययन किसी संपर्क को किसी बीमारी से जोड़ता है। वह बताता है कि पहले से तय किए गए भ्रामक कारकों के लिए समायोजन के बाद भी यह संबंध बना रहा, कि ज़्यादा संपर्क के साथ ज़्यादा बीमारी दिखी, और कि कहीं और के दो स्वतंत्र कोहोर्ट में भी वही पैटर्न मिला।",
  "No single one of these settles causation, but together they are the things that make an observational finding worth taking seriously: a prior plan, a dose-response pattern, and replication in populations that do not share the same quirks.":
    "इनमें से अकेली कोई बात कारणता तय नहीं करती, पर मिलकर ये वही चीज़ें हैं जो किसी अवलोकन आधारित निष्कर्ष को गंभीरता से लेने लायक बनाती हैं: पहले से बनी योजना, संपर्क बढ़ने के साथ बीमारी बढ़ने वाला पैटर्न, और ऐसी आबादियों में वही पैटर्न दोबारा मिलना जिनमें वही स्थानीय खासियतें मौजूद नहीं हैं।",
  "Patients are assigned by a computer to a drug or a dummy tablet, with neither they nor their doctor knowing which. Deaths are counted in everyone assigned, whatever they went on to take. The drug group does slightly better.":
    "मरीज़ों को कंप्यूटर दवा या नकली गोली में बाँट देता है, और न उन्हें और न उनके डॉक्टर को पता होता है कि किसे क्या मिला। मौतें हर उस व्यक्ति में गिनी जाती हैं जिसे बाँटा गया था, चाहे उसने आगे चलकर कुछ भी लिया हो। दवा वाले समूह का नतीजा थोड़ा बेहतर रहता है।",
  "A coin flip knows nothing about the patient, so it cannot smuggle the reason for treatment into the comparison. Counting everyone as assigned keeps that protection even when people stop taking their tablets.":
    "सिक्के का उछाल मरीज़ के बारे में कुछ नहीं जानता, इसलिए वह इलाज की वजह को चोरी छिपे तुलना में नहीं घुसा सकता। सबको उसी समूह में गिनना जिसमें उन्हें बाँटा गया था, यह सुरक्षा तब भी बनाए रखता है जब लोग गोलियाँ लेना बंद कर देते हैं।",
  "A clinic compares its results with a national benchmark, adjusts for how severe its patients' illness was, and publishes the crude and the adjusted figures side by side along with the case mix it adjusted for.":
    "एक क्लिनिक अपने नतीजों की तुलना एक राष्ट्रीय मानक से करता है, अपने मरीज़ों की बीमारी कितनी गंभीर थी इसके लिए समायोजन करता है, और कच्चे तथा समायोजित, दोनों आँकड़े साथ साथ छापता है, साथ में मरीज़ों का वह मिश्रण भी जिसके लिए समायोजन किया गया।",
  "Showing both figures and the mix behind them is the honest move. A reader can see how much of the difference was case mix and how much survived accounting for it, instead of being handed only the flattering one.":
    "दोनों आँकड़े और उनके पीछे का मिश्रण दिखाना ही ईमानदार तरीका है। पढ़ने वाला देख सकता है कि फ़र्क का कितना हिस्सा मरीज़ों के मिश्रण की वजह से था और कितना उसका हिसाब लगाने के बाद भी बचा रहा, बजाय इसके कि उसे केवल छवि चमकाने वाला आँकड़ा थमा दिया जाए।",

  // ---- Length-time bias (puzzle #12) ----
  "Screened men whose lung cancer was found died of it less often. Did the screening save them?":
    "जिन स्क्रीनिंग वाले पुरुषों का फेफड़ों का कैंसर पकड़ में आया, वे उससे कम बार मरे। क्या स्क्रीनिंग ने उन्हें बचाया?",
  "9,211 male smokers were randomly assigned either to chest x-rays and sputum tests every four months for six years, or to usual care, and followed for two decades. Among the men who were diagnosed with lung cancer, 65 percent of the intensively screened died of it, against 74 percent of the others.":
    "9,211 पुरुष धूम्रपान करने वालों को यादृच्छिक रूप से या तो छह साल तक हर चार महीने पर छाती के एक्स-रे और बलगम की जाँच में डाला गया, या सामान्य देखभाल में, और दो दशक तक उन पर नज़र रखी गई। जिन पुरुषों का फेफड़ों के कैंसर का निदान हुआ, उनमें से गहन स्क्रीनिंग वालों में 65 प्रतिशत उसी से मरे, जबकि बाकी लोगों में 74 प्रतिशत।",
  "Did the extra screening save lives?":
    "क्या उस अतिरिक्त स्क्रीनिंग ने जानें बचाईं?",
  "Died of lung cancer": "फेफड़ों के कैंसर से मृत्यु",
  "Screened every four months": "हर चार महीने पर स्क्रीनिंग",
  Screened: "स्क्रीनिंग वाले",
  "Usual care": "सामान्य देखभाल",
  "Among the men diagnosed with lung cancer":
    "जिन पुरुषों का फेफड़ों के कैंसर का निदान हुआ, उनमें",
  "Among everyone in the trial": "परीक्षण के सभी लोगों में",
  "Among the diagnosed": "जिनका निदान हुआ, उनमें",
  "Yes, fewer of them died of it": "हाँ, उनमें से कम लोग उससे मरे",
  "65% against 74%": "65% बनाम 74%",
  "Too early to say": "अभी कुछ कहना जल्दबाज़ी है",
  "the follow-up is too short": "फ़ॉलो-अप बहुत छोटा है",
  "No, count everyone and it vanishes":
    "नहीं, सबको गिनिए तो यह गायब हो जाता है",
  "the cases changed, not the deaths": "मामले बदले, मौतें नहीं",
  "Count everyone, and the screened arm did no better.":
    "सबको गिनिए, तो स्क्रीनिंग वाले समूह ने कुछ बेहतर नहीं किया।",
  "Screening changed who counted as having cancer":
    "स्क्रीनिंग ने बदल दिया कि कैंसर वाला किसे गिना गया",
  "The screened men were diagnosed far more often, 206 against 160, in a trial that split them evenly. The extra cancers were not a random sample of the disease. A test applied every few months catches the slow-growing tumours, because slow ones sit in the detectable stage for years waiting to be found, while fast ones surface between visits. Slow tumours also do better whatever you do, and some would never have surfaced at all. Those cases join the pool of people with lung cancer and survive it, so the share dying falls. Nobody was saved:":
    "स्क्रीनिंग वाले पुरुषों का निदान कहीं ज़्यादा बार हुआ, 206 बनाम 160, जबकि परीक्षण ने उन्हें बराबर बाँटा था। ये अतिरिक्त कैंसर बीमारी का कोई यादृच्छिक नमूना नहीं थे। हर कुछ महीनों पर की जाने वाली जाँच धीमे बढ़ने वाले ट्यूमर पकड़ती है, क्योंकि धीमे ट्यूमर सालों तक उस अवस्था में पड़े रहते हैं जहाँ वे पकड़ में आ सकते हैं, जबकि तेज़ ट्यूमर दो मुलाकातों के बीच ही उभर आते हैं। धीमे ट्यूमर का नतीजा वैसे भी बेहतर रहता है, चाहे आप कुछ भी करें, और कुछ तो कभी उभरते ही नहीं। वे मामले फेफड़ों के कैंसर वाले लोगों के समूह में जुड़ जाते हैं और उससे बच जाते हैं, इसलिए मरने वालों का हिस्सा गिर जाता है। बचाया किसी को नहीं गया:",
  "Both ways of counting": "गिनने के दोनों तरीके",
  "Three effects travel together here and this trial cannot separate them: the slow cases are caught preferentially (length-time), the clock starts earlier for those caught (lead-time), and some tumours found would never have caused harm (overdiagnosis). All three flatter the diagnosed group and none of them postpones a death. The number that stayed honest is deaths among everyone randomised, and it did not fall.":
    "यहाँ तीन असर साथ साथ चलते हैं और यह परीक्षण उन्हें एक दूसरे से अलग नहीं कर सकता: धीमे मामले वरीयता से पकड़े जाते हैं (अवधि पूर्वाग्रह), जो पकड़े जाते हैं उनकी घड़ी पहले चल पड़ती है (लीड टाइम पूर्वाग्रह), और जो ट्यूमर मिलते हैं उनमें से कुछ कभी कोई नुकसान करते ही नहीं (अति-निदान)। तीनों ही निदान वाले समूह की छवि चमकाते हैं और उनमें से कोई भी किसी मौत को टालता नहीं। जो संख्या ईमानदार बनी रही वह है यादृच्छिक रूप से बाँटे गए सभी लोगों में मौतें, और वह गिरी नहीं।",
  "Who became a case": "मामला कौन बना",
  "Length-time bias": "अवधि पूर्वाग्रह",
  "Screening does not sample disease fairly. It catches the slow-growing kind preferentially, and the slow kind was always going to do better, so screen-detected cases flatter the test.":
    "स्क्रीनिंग बीमारी का निष्पक्ष नमूना नहीं लेती। वह धीमे बढ़ने वाली किस्म को वरीयता से पकड़ती है, और धीमी किस्म का नतीजा वैसे भी हमेशा बेहतर रहने वाला था, इसलिए स्क्रीनिंग से पकड़े गए मामले जाँच की छवि चमका देते हैं।",
  "Whenever a screening programme is defended with how well its detected cases do, ask what kind of disease a periodic test can catch. A tumour that takes years to declare itself is available to be found on many visits; one that goes from nothing to symptoms in three months is available on almost none. The only fair question is whether deaths fall in everyone offered screening.":
    "जब भी किसी स्क्रीनिंग कार्यक्रम का बचाव इस बात से किया जाए कि उससे पकड़े गए मामलों का नतीजा कितना अच्छा रहा, तो पूछिए कि समय समय पर की जाने वाली जाँच किस तरह की बीमारी पकड़ सकती है। जो ट्यूमर खुद को ज़ाहिर करने में सालों लेता है, वह कई मुलाकातों पर पकड़ में आ सकता है; जो तीन महीने में शून्य से लक्षणों तक पहुँच जाता है, वह लगभग किसी मुलाकात पर नहीं। एकमात्र निष्पक्ष सवाल यह है कि जिन सबको स्क्रीनिंग की पेशकश की गई, उन सबमें मौतें घटीं या नहीं।",
  "Picture the same disease arriving in two speeds. Slow tumours spend years in the window where a test could find them but the patient feels nothing. Fast ones cross that window in weeks. Now sample the population every six months. You will find nearly all the slow ones and almost none of the fast ones, because the fast ones announce themselves between your visits. So the pile of screen-detected cases is loaded with indolent disease, and the pile of symptom-detected cases is loaded with aggressive disease, before treatment enters the story at all. Compare their outcomes and screening looks wonderful. At the extreme edge of this sits overdiagnosis: disease so slow it would never have troubled the person in their lifetime, which counts as a cancer found and cured while doing nothing but harm through the treatment. The defence is the same one that beats lead-time bias, and it is the reason screening programmes are judged the way they are: randomise who is invited, then count deaths in everyone invited, attended or not, diagnosed or not.":
    "एक ही बीमारी की कल्पना कीजिए, जो दो रफ़्तारों से आती है। धीमे ट्यूमर सालों तक उस खिड़की में रहते हैं जहाँ जाँच उन्हें पकड़ सकती है पर मरीज़ को कुछ महसूस नहीं होता। तेज़ ट्यूमर उस खिड़की को हफ़्तों में पार कर जाते हैं। अब हर छह महीने पर पूरी आबादी का नमूना लीजिए। आप लगभग सारे धीमे ट्यूमर पकड़ लेंगे और तेज़ ट्यूमर लगभग एक भी नहीं, क्योंकि तेज़ ट्यूमर आपकी दो मुलाकातों के बीच ही खुद को ज़ाहिर कर देते हैं। इसलिए स्क्रीनिंग से पकड़े गए मामलों का ढेर सुस्त बीमारी से भरा होता है और लक्षणों से पकड़े गए मामलों का ढेर आक्रामक बीमारी से, और यह सब तब है जब इलाज इस कहानी में दाखिल भी नहीं हुआ। उनके नतीजों की तुलना कीजिए और स्क्रीनिंग शानदार लगती है। इसके सबसे आख़िरी छोर पर अति-निदान बैठा है: इतनी धीमी बीमारी कि वह उस व्यक्ति को उसकी पूरी ज़िंदगी में कभी परेशान ही नहीं करती, फिर भी वह पकड़े गए और ठीक किए गए एक कैंसर के रूप में गिनी जाती है, जबकि इलाज के ज़रिए वह नुकसान के सिवा कुछ नहीं करती। बचाव वही है जो लीड टाइम पूर्वाग्रह को भी मात देता है, और यही वजह है कि स्क्रीनिंग कार्यक्रमों को जिस तरह परखा जाता है उसी तरह परखा जाता है: यादृच्छिक रूप से तय कीजिए कि किसे बुलाया जाएगा, फिर हर बुलाए गए व्यक्ति में मौतें गिनिए, चाहे वह आया हो या नहीं, चाहे उसका निदान हुआ हो या नहीं।",
  "The trial's own explanation": "खुद परीक्षण की अपनी व्याख्या",
  "The authors did not attribute the gap to better treatment. They noted that similar mortality alongside better survival points to lesions of limited clinical relevance being found in the screened arm. Twenty years of follow-up did not rescue the result: deaths from lung cancer were 337 among 4,607 screened men and 303 among 4,585 others, a difference in the wrong direction and not statistically significant.":
    "लेखकों ने इस फ़र्क का श्रेय बेहतर इलाज को नहीं दिया। उन्होंने कहा कि मृत्यु दर एक जैसी और उत्तरजीविता बेहतर होना इस ओर इशारा करता है कि स्क्रीनिंग वाले समूह में सीमित नैदानिक महत्व वाले घाव पकड़े जा रहे थे। बीस साल के फ़ॉलो-अप ने भी इस नतीजे को नहीं बचाया: फेफड़ों के कैंसर से मौतें स्क्रीनिंग वाले 4,607 पुरुषों में 337 रहीं और बाकी 4,585 में 303, यानी फ़र्क उल्टी दिशा में था और सांख्यिकीय रूप से सार्थक नहीं था।",
  "Why screening is judged on deaths, not survival":
    "स्क्रीनिंग को उत्तरजीविता से नहीं, मौतों से क्यों परखा जाता है",
  "This is not a historical curiosity. National screening programmes are assessed on whether they lower deaths from the disease in the whole invited population, precisely because survival among detected cases can be lifted by three separate artefacts without a single life being extended. A programme that raises five-year survival and leaves mortality untouched has, on the evidence, done nothing except give more people the label.":
    "यह इतिहास की कोई दिलचस्प बात भर नहीं है। राष्ट्रीय स्क्रीनिंग कार्यक्रमों को इस आधार पर परखा जाता है कि वे बुलाई गई पूरी आबादी में उस बीमारी से होने वाली मौतें घटाते हैं या नहीं, ठीक इसीलिए कि पकड़े गए मामलों की उत्तरजीविता तीन अलग अलग कृत्रिम असरों से ऊपर उठ सकती है, बिना किसी एक ज़िंदगी के लंबी हुए। जो कार्यक्रम पाँच साल की उत्तरजीविता बढ़ा दे और मृत्यु दर को जस का तस छोड़ दे, उसने साक्ष्य के हिसाब से इसके सिवा कुछ नहीं किया कि और ज़्यादा लोगों को यह लेबल थमा दिया।",
  "Length-time bias, a reasoning trap.": "अवधि पूर्वाग्रह, तर्क का एक जाल।",
  "A test you run every few months finds slow-growing disease far more easily than fast-growing disease, because slow disease sits there for years waiting to be found while fast disease erupts between visits. Slow disease also has a better outlook whatever anyone does. So the cases a screening programme catches are the gentle ones, and they do well, and the programme takes the credit. The only number that cannot be gamed this way is deaths in everyone offered screening, whether or not they attended.":
    "जो जाँच आप हर कुछ महीनों पर करते हैं वह धीमे बढ़ने वाली बीमारी को तेज़ बढ़ने वाली बीमारी के मुकाबले कहीं ज़्यादा आसानी से पकड़ लेती है, क्योंकि धीमी बीमारी सालों तक पकड़ में आने के इंतज़ार में पड़ी रहती है, जबकि तेज़ बीमारी दो मुलाकातों के बीच ही फूट पड़ती है। धीमी बीमारी का नतीजा वैसे भी बेहतर होता है, चाहे कोई कुछ भी करे। इसलिए स्क्रीनिंग कार्यक्रम जिन मामलों को पकड़ता है वे नरम किस्म के होते हैं, उनका हाल अच्छा रहता है, और श्रेय कार्यक्रम ले जाता है। इस तरह जिस इकलौती संख्या के साथ खिलवाड़ नहीं किया जा सकता वह है उन सब लोगों में मौतें जिन्हें स्क्रीनिंग की पेशकश की गई थी, चाहे वे आए हों या नहीं।",
  "Table 3 prints the usual-care case count as 106, which is a typographic error; the correct figure is 160, and this puzzle uses 160. The paper says so itself six times over: the body text on page 1310, the Figure 2 curve label, Table 3's own percentages (119 of 160 printed as 74 percent, 156 of 160 as 98 percent), and the totals of Tables 4 and 5. With 106 the lung-cancer deaths alone would outnumber the cohort. Note also that this trial compared two screening intensities rather than screening against none, and that it cannot separate length-time bias from lead-time bias and overdiagnosis, which is why the lesson names all three.":
    "तालिका 3 में सामान्य देखभाल वाले मामलों की गिनती 106 छपी है, जो छपाई की एक गलती है; सही आँकड़ा 160 है, और यह पहेली 160 का ही इस्तेमाल करती है। खुद शोधपत्र छह जगह यही कहता है: पृष्ठ 1310 का मुख्य पाठ, आकृति 2 के वक्र का लेबल, खुद तालिका 3 के प्रतिशत (160 में से 119 को 74 प्रतिशत और 160 में से 156 को 98 प्रतिशत छापा गया है), और तालिका 4 तथा तालिका 5 के कुल जोड़। 106 मान लें तो अकेली फेफड़ों के कैंसर से हुई मौतें ही पूरे समूह से ज़्यादा हो जाएँगी। यह भी ध्यान रहे कि इस परीक्षण ने स्क्रीनिंग की तुलना बिना स्क्रीनिंग से नहीं, बल्कि स्क्रीनिंग की दो तीव्रताओं की आपस में तुलना की, और यह कि यह अवधि पूर्वाग्रह को लीड टाइम पूर्वाग्रह और अति-निदान से अलग नहीं कर सकता, और इसीलिए सबक में तीनों का नाम लिया गया है।",

  // ---- Publication bias (puzzle #13) ----
  "Read the journals and almost every trial of these drugs worked. How many actually did?":
    "पत्रिकाएँ पढ़िए तो इन दवाओं का लगभग हर परीक्षण कामयाब रहा। असल में कितने कामयाब हुए?",
  "Twelve antidepressants, and every trial run to get them approved had to be registered with the American regulator before it began. That registry is the rare thing in medicine: a complete list, including the trials nobody ever wrote up. Go to the medical journals instead and you find 51 published trials, of which 48 read as positive.":
    "बारह अवसादरोधी दवाएँ, और उन्हें मंज़ूरी दिलाने के लिए चलाए गए हर परीक्षण को शुरू होने से पहले अमेरिकी नियामक के पास पंजीकृत कराना ज़रूरी था। वह रजिस्ट्री चिकित्सा में एक दुर्लभ चीज़ है: एक पूरी सूची, जिसमें वे परीक्षण भी शामिल हैं जिन्हें किसी ने कभी लिखा ही नहीं। इसके बजाय चिकित्सा पत्रिकाओं में जाइए तो आपको 51 प्रकाशित परीक्षण मिलते हैं, जिनमें से 48 सकारात्मक पढ़े जाते हैं।",
  "Out of all 74 trials that were actually run, how many did the regulator judge positive?":
    "असल में जो कुल 74 परीक्षण चलाए गए, उनमें से नियामक ने कितनों को सकारात्मक माना?",
  "Trials that read as positive": "सकारात्मक पढ़े जाने वाले परीक्षण",
  "As the journals tell it": "जैसा पत्रिकाएँ बताती हैं",
  Journals: "पत्रिकाएँ",
  "As the full registry tells it": "जैसा पूरी रजिस्ट्री बताती है",
  Registry: "रजिस्ट्री",
  "Trials of twelve antidepressants": "बारह अवसादरोधी दवाओं के परीक्षण",
  "The published literature": "प्रकाशित साहित्य",
  "Nearly all of them": "उनमें से लगभग सभी",
  "the journals are the evidence": "पत्रिकाएँ ही साक्ष्य हैं",
  "About two thirds": "करीब दो तिहाई",
  "some trials always fail": "कुछ परीक्षण हमेशा नाकाम रहते हैं",
  "38 of the 74": "74 में से 38",
  "Half. A coin flip, printed as a near-certainty.":
    "आधे। सिक्के के उछाल जैसी बात, जो लगभग पक्की बात बनकर छपी।",
  "The failures were filtered out on the way to the journals":
    "नाकामियाँ पत्रिकाओं तक पहुँचने के रास्ते में छँट गईं",
  "The regulator judged 38 of the 74 trials positive and 36 not. Of those 36, twenty two were never published at all. Eleven more did reach print, but reading as a positive result. So a doctor searching the literature finds 48 positive trials out of 51 and concludes the case is overwhelming, when the complete record says it was close to even:":
    "नियामक ने 74 में से 38 परीक्षणों को सकारात्मक माना और 36 को नहीं। उन 36 में से बाईस कभी प्रकाशित ही नहीं हुए। ग्यारह और छपे तो सही, पर सकारात्मक नतीजे के रूप में पढ़े जाते हुए। इसलिए साहित्य खंगालने वाले डॉक्टर को 51 में से 48 सकारात्मक परीक्षण मिलते हैं और वह नतीजा निकालता है कि मामला एकतरफ़ा है, जबकि पूरा रिकॉर्ड कहता है कि बात लगभग बराबरी की थी:",
  "Journals against the registry": "पत्रिकाएँ बनाम रजिस्ट्री",
  "Two of those judgements belong to different people, and it matters. Positive or negative was the regulator's own decision on the outcome each trial had promised to measure in advance. The reading that eleven publications conveyed a positive result was the study authors' assessment, not the regulator's, and they said so. What is not a matter of opinion is the twenty two that never appeared.":
    "इनमें से दो फ़ैसले अलग अलग लोगों के हैं, और यह मायने रखता है। सकारात्मक या नकारात्मक होना नियामक का अपना फ़ैसला था, उस नतीजे पर जिसे हर परीक्षण ने पहले से मापने का वादा किया था। यह पढ़ना कि ग्यारह प्रकाशनों ने सकारात्मक नतीजा पहुँचाया, अध्ययन के लेखकों का आकलन था, नियामक का नहीं, और उन्होंने खुद यह कहा भी। जो राय का मामला है ही नहीं, वे हैं वही बाईस परीक्षण जो कभी सामने आए ही नहीं।",
  "What never reached print": "जो कभी छपा ही नहीं",
  "Publication bias": "प्रकाशन पूर्वाग्रह",
  "The published literature is not a sample of the research done. It is the research that someone chose to submit and someone chose to print, and success survives that filter far better than failure.":
    "प्रकाशित साहित्य किए गए शोध का नमूना नहीं है। यह वह शोध है जिसे किसी ने भेजने के लिए चुना और किसी ने छापने के लिए चुना, और इस छलनी से कामयाबी नाकामी के मुकाबले कहीं बेहतर तरीके से पार निकल जाती है।",
  "This is why a registry matters more than it sounds. Requiring every trial to be declared before it starts creates the denominator, so the missing ones become countable instead of invisible. When you read a review, the question is not only what the studies found but whether you are looking at all of them.":
    "यही वजह है कि रजिस्ट्री सुनने में जितनी मामूली लगती है, मायने उससे कहीं ज़्यादा रखती है। हर परीक्षण को शुरू होने से पहले घोषित करना अनिवार्य कर देने से वह आधार संख्या (denominator) बन जाती है, इसलिए जो परीक्षण गायब हैं वे अदृश्य रहने के बजाय गिनने लायक हो जाते हैं। जब आप कोई समीक्षा पढ़ें, तो सवाल सिर्फ़ यह नहीं है कि अध्ययनों में क्या मिला, बल्कि यह भी है कि क्या आप उन सबको देख रहे हैं।",
  "Nothing here requires anyone to lie. A trial that finds nothing is duller to write up, harder to place, and commercially unwelcome, so it drifts to the bottom of the pile and quietly never gets finished. Repeat that across a field and the surviving literature is systematically sunnier than the research was. The effect compounds, because reviews and guidelines are built on what was published, so the gap is inherited by everything downstream and looks like accumulating evidence rather than a filter. Two things push back. The first is registration: declare the trial and its primary outcome before you start, and an unpublished result leaves a visible hole rather than no trace. The second is the funnel plot, which exploits the fact that small studies scatter widely and large ones cluster; if the small studies that should have landed on the disappointing side are missing, the scatter comes out lopsided. Neither fix works retrospectively on a literature that predates them, which is why the regulator's archive was the only way to answer this question at all.":
    "इसके लिए किसी को झूठ बोलने की ज़रूरत नहीं पड़ती। जिस परीक्षण में कुछ नहीं मिलता उसे लिखना ज़्यादा नीरस होता है, छपवाना ज़्यादा मुश्किल, और व्यावसायिक रूप से वह किसी को नहीं भाता, इसलिए वह ढेर के सबसे नीचे खिसकता जाता है और चुपचाप कभी पूरा ही नहीं होता। पूरे क्षेत्र में यही बात दोहराइए और जो साहित्य बचता है वह शोध की असलियत से व्यवस्थित रूप से ज़्यादा उजला होता है। असर बढ़ता चला जाता है, क्योंकि समीक्षाएँ और दिशानिर्देश उसी पर बनते हैं जो प्रकाशित हुआ, इसलिए यह खाई आगे की हर चीज़ को विरासत में मिल जाती है और किसी छलनी के बजाय जमा होते साक्ष्य जैसी दिखती है। दो चीज़ें इसका मुकाबला करती हैं। पहली है पंजीकरण: परीक्षण और उसका प्राथमिक नतीजा शुरू करने से पहले घोषित कर दीजिए, और तब अप्रकाशित नतीजा कोई निशान न छोड़ने के बजाय एक दिखता हुआ छेद छोड़ जाता है। दूसरी है फ़नल प्लॉट, जो इस बात का फ़ायदा उठाता है कि छोटे अध्ययन दूर दूर तक बिखरते हैं और बड़े अध्ययन एक जगह सिमटते हैं; अगर वे छोटे अध्ययन गायब हैं जिन्हें निराश करने वाली तरफ़ गिरना चाहिए था, तो बिखराव एकतरफ़ा निकलता है। इनमें से कोई भी उपाय ऐसे साहित्य पर पीछे लौटकर काम नहीं करता जो इन उपायों से पहले का है, और यही वजह है कि इस सवाल का जवाब देने का एकमात्र रास्ता नियामक का अभिलेखागार ही था।",
  "The drugs also looked stronger than they were":
    "दवाएँ अपनी असलियत से ज़्यादा ताकतवर भी दिखीं",
  "The same trials were pooled twice, once as the regulator held them and once as the journals reported them. Measured across the complete set the average benefit was 0.31 on a standardised scale; measured from the published literature alone it was 0.41, about a third larger. That is a standardised mean difference, not a share of patients helped, and the effect was not confined to one drug: every one of the twelve looked better in the journals, by between 11 and 69 percent.":
    "उन्हीं परीक्षणों को दो बार जोड़कर आँका गया, एक बार जैसे वे नियामक के पास दर्ज थे और एक बार जैसे पत्रिकाओं ने उन्हें बताया। पूरे समुच्चय पर मापने पर औसत फ़ायदा एक मानकीकृत पैमाने पर 0.31 था; अकेले प्रकाशित साहित्य से मापने पर वह 0.41 था, यानी करीब एक तिहाई ज़्यादा। यह एक मानकीकृत औसत अंतर (standardised mean difference) है, न कि उन मरीज़ों का हिस्सा जिन्हें फ़ायदा हुआ, और यह असर किसी एक दवा तक सीमित नहीं था: बारहों में से हर दवा पत्रिकाओं में बेहतर दिखी, 11 से 69 प्रतिशत तक बेहतर।",
  "It got better, which is the point": "हालात सुधरे, और असली बात यही है",
  "The same team repeated the audit on four antidepressants approved between 2008 and 2013, after trial registration had become the norm. This time all 15 positive trials were reported transparently, and of the 15 negative ones 6 went unpublished and 2 were reported as positive. Still imperfect, and still worth knowing about, but the inflation in apparent effect had roughly halved. Publication bias is not a law of nature; it responds to rules about declaring trials in advance.":
    "उसी टीम ने यही जाँच पड़ताल 2008 और 2013 के बीच मंज़ूर हुई चार अवसादरोधी दवाओं पर दोहराई, जब परीक्षणों का पंजीकरण चलन बन चुका था। इस बार सभी 15 सकारात्मक परीक्षण पारदर्शी ढंग से बताए गए, और 15 नकारात्मक परीक्षणों में से 6 अप्रकाशित रह गए और 2 सकारात्मक बताए गए। अब भी सब कुछ ठीक नहीं है, और यह अब भी जानने लायक है, पर दिखने वाले प्रभाव का बढ़ावा करीब आधा रह गया था। प्रकाशन पूर्वाग्रह कोई प्रकृति का नियम नहीं है; परीक्षणों को पहले से घोषित करने के नियमों का उस पर असर पड़ता है।",
  "Publication bias, a reasoning trap.": "प्रकाशन पूर्वाग्रह, तर्क का एक जाल।",
  "Search the medical literature on a drug and you are not seeing the research that was done. You are seeing the research that got written up and accepted, and studies that found something clear survive that filter much better than studies that found nothing. For one class of drugs the regulator's complete archive showed about half the trials were positive, while the journals showed nearly all of them. Nobody had to lie for that to happen. The disappointing ones simply never got finished.":
    "किसी दवा पर चिकित्सा साहित्य खंगालिए और आप वह शोध नहीं देख रहे होते जो किया गया था। आप वह शोध देख रहे होते हैं जो लिखा गया और स्वीकार किया गया, और जिन अध्ययनों में कुछ साफ़ मिला वे इस छलनी से उन अध्ययनों के मुकाबले कहीं बेहतर तरीके से पार निकलते हैं जिनमें कुछ नहीं मिला। दवाओं के एक वर्ग के लिए नियामक के पूरे अभिलेखागार ने दिखाया कि करीब आधे परीक्षण सकारात्मक थे, जबकि पत्रिकाओं में लगभग सभी सकारात्मक दिखे। ऐसा होने के लिए किसी को झूठ बोलने की ज़रूरत नहीं पड़ी। निराश करने वाले परीक्षण बस कभी पूरे ही नहीं हुए।",
  "Three points of care. The positive or negative verdict on each trial is the regulator's own, on the outcome the trial specified in advance; the label questionable, and the reading that eleven publications conveyed a positive result, are the study authors' judgements and the paper says so. The published-trial figure of 48 of 51 is the sum of two printed counts, 37 and 11, rather than a single printed number. And the authors note that they excluded articles covering several studies at once, so they probably counted a few trials as unpublished that were technically published, which makes 22 and 23 upper bounds.":
    "तीन बातों में सावधानी ज़रूरी है। हर परीक्षण पर सकारात्मक या नकारात्मक का फ़ैसला खुद नियामक का है, उस नतीजे पर जिसे परीक्षण ने पहले से तय किया था; ‘संदिग्ध’ का लेबल, और यह पढ़ना कि ग्यारह प्रकाशनों ने सकारात्मक नतीजा पहुँचाया, अध्ययन के लेखकों के अपने आकलन हैं, और शोधपत्र यह कहता भी है। प्रकाशित परीक्षणों का आँकड़ा, 51 में से 48, कोई एक छपी हुई संख्या नहीं बल्कि दो छपी हुई गिनतियों, 37 और 11, का जोड़ है। और लेखक बताते हैं कि उन्होंने ऐसे लेख छोड़ दिए जो एक साथ कई अध्ययनों को समेटते थे, इसलिए उन्होंने शायद कुछ ऐसे परीक्षणों को अप्रकाशित गिन लिया जो तकनीकी रूप से प्रकाशित थे, और इसी वजह से 22 और 23 ऊपरी सीमाएँ हैं।",

  // trap hunt items (publication bias)
  "A review gathers every published trial of a treatment it can find. Eleven of the thirteen are positive, and it concludes the treatment works. The review does not say how many trials of the treatment were ever started.":
    "एक समीक्षा किसी उपचार के वे सारे प्रकाशित परीक्षण जुटाती है जो उसे मिल सकते हैं। तेरह में से ग्यारह सकारात्मक हैं, और वह नतीजा निकालती है कि उपचार काम करता है। समीक्षा यह नहीं बताती कि उस उपचार के कुल कितने परीक्षण कभी शुरू किए गए थे।",
  "Searching the literature finds the studies that reached print, not the studies that were run. Without knowing how many were started, there is no way to tell whether two disappointing trials is the whole story or the visible corner of it.":
    "साहित्य खंगालने पर वे अध्ययन मिलते हैं जो छप गए, न कि वे जो चलाए गए थे। यह जाने बिना कि कुल कितने शुरू हुए थे, यह बताने का कोई तरीका नहीं है कि निराश करने वाले दो परीक्षण ही पूरी कहानी हैं या उसका बस दिखने वाला कोना।",
  "A researcher runs a study that finds nothing, decides it is not interesting enough to write up, and moves on to the next project. Several colleagues in the same field do the same thing that year.":
    "एक शोधकर्ता एक अध्ययन करता है जिसमें कुछ नहीं मिलता, तय करता है कि यह लिखने लायक दिलचस्प नहीं है, और अगली परियोजना पर चला जाता है। उसी क्षेत्र के कई साथी उसी साल यही करते हैं।",
  "Nobody here has done anything dishonest, and that is exactly the point. The filter is made of ordinary decisions about what is worth the effort, and it still leaves the published record systematically sunnier than the research was.":
    "यहाँ किसी ने कोई बेईमानी नहीं की, और असली बात ठीक यही है। यह छलनी इस बारे में लिए गए आम फ़ैसलों से बनी है कि किस चीज़ पर मेहनत करना सार्थक है, और फिर भी वह प्रकाशित रिकॉर्ड को शोध की असलियत से व्यवस्थित रूप से ज़्यादा उजला बना देती है।",

  // trap hunt items (length-time bias)
  "A clinic reports that men whose cancer was picked up by its regular screening programme are far more likely to still be alive ten years on than men who came in with symptoms. It concludes that screening works.":
    "एक क्लिनिक बताता है कि जिन पुरुषों का कैंसर उसके नियमित स्क्रीनिंग कार्यक्रम में पकड़ा गया, उनके दस साल बाद भी जीवित होने की संभावना उन पुरुषों से कहीं ज़्यादा है जो लक्षण लेकर आए थे। वह नतीजा निकालता है कि स्क्रीनिंग काम करती है।",
  "A test run at intervals catches slow tumours easily and fast ones hardly at all, because fast ones surface between visits. So the screen-detected group is loaded with the gentle kind of disease before treatment is even considered.":
    "समय समय पर की जाने वाली जाँच धीमे ट्यूमर आसानी से पकड़ लेती है और तेज़ ट्यूमर मुश्किल से ही, क्योंकि तेज़ ट्यूमर दो मुलाकातों के बीच ही उभर आते हैं। इसलिए स्क्रीनिंग से पकड़ा गया समूह नरम किस्म की बीमारी से भरा होता है, और यह इलाज पर विचार होने से भी पहले की बात है।",
  "A new scan finds three times as many cases of a cancer as were previously diagnosed in the same population, and the people it finds do very well. Deaths from that cancer in the population are unchanged.":
    "एक नई स्कैन जाँच उसी आबादी में किसी कैंसर के, पहले जितने मामलों का निदान होता था, उससे तीन गुना मामले खोज निकालती है, और जिन लोगों को वह खोजती है उनका हाल बहुत अच्छा रहता है। उस आबादी में उस कैंसर से होने वाली मौतें जस की तस हैं।",
  "More cases found, the same number of deaths, and excellent outcomes among the extra cases is the signature of finding disease that was never going to cause harm. The survival figures improve because the denominator filled up with people who were never in danger.":
    "ज़्यादा मामले मिलना, मौतों की संख्या वही रहना, और अतिरिक्त मामलों के नतीजे बेहतरीन होना, यही उस बीमारी को खोज निकालने की पहचान है जो कभी कोई नुकसान करने वाली थी ही नहीं। उत्तरजीविता के आँकड़े इसलिए सुधरते हैं क्योंकि आधार संख्या उन लोगों से भर गई जो कभी खतरे में थे ही नहीं।",

  // ---- intention to treat, recall bias, immortal time ----
  "Among the patients who actually got the treatment they were assigned, surgery saved lives. Is that the trial's answer?":
    "जिन मरीज़ों को वही इलाज मिला जो उन्हें सौंपा गया था, उनमें सर्जरी ने जानें बचाईं। क्या यही ट्रायल का उत्तर है?",
  "1,212 people with heart failure, randomly assigned to medicine alone or to medicine plus bypass surgery. Analysing the ones who received what they were assigned, 43 percent of the medicine group died against 34 percent of the surgery group. The difference is statistically significant.":
    "हार्ट फ़ेल्योर से पीड़ित 1,212 लोग, रैंडम तरीक़े से केवल दवा या दवा के साथ बायपास सर्जरी के लिए चुने गए। जिन्हें वही मिला जो उन्हें सौंपा गया था, उनका विश्लेषण करने पर दवा समूह के 43 प्रतिशत की मृत्यु हुई, जबकि सर्जरी समूह के 34 प्रतिशत की। यह अंतर सांख्यिकीय रूप से सार्थक है।",
  "Does this trial show that surgery cuts deaths?":
    "क्या यह ट्रायल दिखाता है कि सर्जरी मौतें घटाती है?",
  "Died during follow-up":
    "फ़ॉलो अप के दौरान मृत्यु",
  "Medicine alone":
    "केवल दवा",
  "Medicine":
    "दवा",
  "Surgery added":
    "साथ में सर्जरी",
  "Surgery":
    "सर्जरी",
  "Only those who got what they were assigned":
    "केवल वे जिन्हें सौंपा गया इलाज मिला",
  "Everyone, as the coin assigned them":
    "सभी, जैसा सिक्के ने तय किया",
  "The patients left out of the first panel":
    "पहले पैनल से छूटे मरीज़",
  "Those who followed the protocol":
    "जिन्होंने प्रोटोकॉल का पालन किया",
  "Yes, that is what surgery does":
    "हाँ, सर्जरी यही करती है",
  "nine points fewer deaths":
    "नौ अंक कम मौतें",
  "No, and it understates the benefit":
    "नहीं, और यह लाभ को कम आँकता है",
  "crossovers dilute a real effect":
    "क्रॉसओवर असली असर को हल्का करते हैं",
  "No, that comparison is no longer randomised":
    "नहीं, वह तुलना अब रैंडमाइज़्ड नहीं रही",
  "dying is why some were left out":
    "कुछ इसलिए छूटे क्योंकि उनकी मृत्यु हुई",
  "Counting everyone the coin assigned, the difference is not significant.":
    "सिक्के ने जिन्हें जिस समूह में रखा, सबको वहीं गिनें तो अंतर सार्थक नहीं रहता।",
  "The surgical patients who were dropped had mostly died first":
    "सर्जरी समूह से जो मरीज़ हटाए गए, उनमें से ज़्यादातर पहले ही मर चुके थे",
  "The 120 patients missing from the first panel are not a random sample. Of the 55 dropped from the surgery group, 30 died, and most of them died before they ever reached an operating table. Of the 65 dropped from the medicine group, only 15 died, because crossing over to surgery required living long enough to have it. So the surgical arm shed its worst outcomes and the medical arm lost its best, and the gap nearly doubled without one patient's fate changing:":
    "पहले पैनल से गायब 120 मरीज़ कोई रैंडम नमूना नहीं हैं। सर्जरी समूह से हटाए गए 55 में से 30 की मृत्यु हुई, और उनमें से ज़्यादातर ऑपरेशन टेबल तक पहुँचने से पहले ही मर गए। दवा समूह से हटाए गए 65 में से केवल 15 की मृत्यु हुई, क्योंकि सर्जरी में क्रॉसओवर करने के लिए इतना जीवित रहना ज़रूरी था कि सर्जरी हो सके। यानी सर्जरी आर्म ने अपने सबसे ख़राब परिणाम छोड़ दिए और दवा आर्म ने अपने सबसे अच्छे खो दिए, और किसी एक मरीज़ की नियति बदले बिना ही अंतर लगभग दोगुना हो गया:",
  "All three views of one trial":
    "एक ही ट्रायल के तीनों दृश्य",
  "A randomised comparison is only worth something while it is still random. The coin flip made the two groups alike; deciding afterwards who counts, on the basis of something that happened after the flip, undoes that. Here the deciding factor was survival itself, which is the outcome being measured. Counting everyone in the group they were assigned to, whatever happened next, is the analysis that keeps the coin flip intact.":
    "रैंडमाइज़्ड तुलना का मूल्य तभी तक है जब तक वह रैंडम बनी रहे। सिक्के ने दोनों समूहों को एक जैसा बनाया था; बाद में, सिक्का उछलने के बाद घटी किसी बात के आधार पर यह तय करना कि कौन गिना जाएगा, उसे नष्ट कर देता है। यहाँ तय करने वाला कारक स्वयं जीवित रहना था, जो कि मापा जा रहा परिणाम ही है। आगे जो भी हुआ हो, हर व्यक्ति को उसी समूह में गिनना जिसमें उसे सौंपा गया था, वही विश्लेषण है जो सिक्के की उछाल को बरकरार रखता है।",
  "Who the analysis dropped":
    "विश्लेषण ने किन्हें हटाया",
  "Intention to treat":
    "इंटेंशन टू ट्रीट",
  "Once you exclude people for what happened after they were randomised, you are no longer comparing the groups the coin made, and the exclusions usually favour one side.":
    "जैसे ही आप लोगों को रैंडमाइज़ेशन के बाद घटी किसी बात के कारण बाहर करते हैं, आप उन समूहों की तुलना नहीं कर रहे जो सिक्के ने बनाए थे, और ये बहिष्करण आमतौर पर किसी एक पक्ष का साथ देते हैं।",
  "This is not a rule that per-protocol analysis is dishonest. It answers a different question, and there are trials where it is the right one to ask. The rule is narrower and harder: any analysis that drops people for something that happened after randomisation has to explain why those people were not different, and when the reason for dropping is entangled with the outcome, no explanation will do.":
    "यह कोई नियम नहीं है कि पर प्रोटोकॉल विश्लेषण बेईमान होता है। वह एक अलग प्रश्न का उत्तर देता है, और कुछ ट्रायल ऐसे भी हैं जहाँ वही सही प्रश्न है। नियम इससे संकरा और कठिन है: जो भी विश्लेषण लोगों को रैंडमाइज़ेशन के बाद घटी किसी बात के कारण हटाता है, उसे यह समझाना होगा कि वे लोग अलग क्यों नहीं थे, और जब हटाने का कारण परिणाम से ही उलझा हो, तब कोई भी सफ़ाई काफ़ी नहीं होगी।",
  "Randomisation buys one thing: two groups that differ only by chance, including in all the ways nobody measured. Everything a trial claims rests on that. The trouble is that trials are run on people, who cross over, refuse the operation, stop the tablets or die before treatment starts, and it is tempting to set those people aside and look at the clean comparison underneath. But whether someone stayed on protocol is itself an outcome. Patients who cross from medicine to surgery must survive to be operated on. Patients assigned to surgery who never get it are often the ones too ill to be operated on, or already dead. Removing them is removing patients selected by prognosis, and prognosis is what the trial is measuring. Intention to treat keeps everyone in the arm the coin put them in, which sounds absurd when a patient never received the treatment, and is exactly the point: it measures the effect of the decision to treat, under real conditions, which is also the decision a doctor actually faces. It has a known cost. Crossovers pull the arms together, so intention to treat tends to shrink a real effect towards nothing. That is a conservative failure when you are trying to prove a drug works, and a dangerous one when you are trying to prove a drug is no worse than another, which is why non-inferiority trials report both analyses and are believed only when the two agree.":
    "रैंडमाइज़ेशन एक ही चीज़ ख़रीदता है: दो ऐसे समूह जिनमें अंतर केवल संयोग से हो, उन सब तरीक़ों में भी जिन्हें किसी ने मापा नहीं। ट्रायल का हर दावा इसी पर टिका है। दिक़्क़त यह है कि ट्रायल इंसानों पर चलते हैं, जो क्रॉसओवर करते हैं, ऑपरेशन से मना कर देते हैं, गोलियाँ बंद कर देते हैं या इलाज शुरू होने से पहले ही मर जाते हैं, और मन करता है कि इन लोगों को अलग रखकर नीचे छिपी साफ़ तुलना देख ली जाए। लेकिन कोई प्रोटोकॉल पर बना रहा या नहीं, यह स्वयं एक परिणाम है। जो मरीज़ दवा से सर्जरी की ओर जाते हैं, उन्हें ऑपरेशन होने तक जीवित रहना ही पड़ता है। सर्जरी के लिए चुने गए जिन मरीज़ों की सर्जरी कभी नहीं हुई, वे अक्सर वही होते हैं जो ऑपरेशन के लिए बहुत बीमार थे, या पहले ही मर चुके थे। उन्हें हटाना यानी उन मरीज़ों को हटाना जो प्रॉग्नोसिस के आधार पर छँटे हैं, और प्रॉग्नोसिस ही वह चीज़ है जिसे ट्रायल माप रहा है। इंटेंशन टू ट्रीट हर व्यक्ति को उसी आर्म में रखता है जिसमें सिक्के ने उसे डाला था, जो तब बेतुका लगता है जब मरीज़ को इलाज मिला ही नहीं, और यही तो बात है: यह इलाज करने के निर्णय का असर मापता है, असल परिस्थितियों में, और डॉक्टर के सामने असल में यही निर्णय होता है। इसकी एक ज्ञात क़ीमत भी है। क्रॉसओवर दोनों आर्म को पास खींच लाते हैं, इसलिए इंटेंशन टू ट्रीट किसी असली असर को शून्य की ओर सिकोड़ता है। जब आप यह साबित करना चाहते हैं कि दवा काम करती है, तब यह एक रूढ़िवादी चूक है, और जब आप यह साबित करना चाहते हैं कि दवा किसी दूसरी से बदतर नहीं है, तब यह ख़तरनाक है, इसीलिए नॉन इन्फ़ीरियोरिटी ट्रायल दोनों विश्लेषण बताते हैं और उन पर तभी भरोसा किया जाता है जब दोनों सहमत हों।",
  "The same trap, without the verdict flipping":
    "वही जाल, बिना निष्कर्ष पलटे",
  "A tuberculosis trial compared shorter regimens with the standard six-month one. In the group treated per protocol, the standard regimen appeared to fail in about 8 percent of patients. Counting everyone who was randomised and had an assessable outcome, it failed in about 16 percent. Almost everyone the per-protocol analysis removed had had an unfavourable outcome, because an unfavourable outcome was frequently the reason they left the protocol. Nothing about the trial's conclusion changed, and every failure rate in it halved.":
    "एक टीबी ट्रायल ने छोटी अवधि वाली रेजिमेन की तुलना मानक छह महीने वाली रेजिमेन से की। पर प्रोटोकॉल इलाज पाए समूह में मानक रेजिमेन लगभग 8 प्रतिशत मरीज़ों में विफल दिखी। जिन सबका रैंडमाइज़ेशन हुआ और जिनका परिणाम आँका जा सका, उन सबको गिनने पर यह लगभग 16 प्रतिशत में विफल रही। पर प्रोटोकॉल विश्लेषण ने जिन्हें हटाया, उनमें से लगभग सभी का परिणाम प्रतिकूल था, क्योंकि प्रतिकूल परिणाम ही अक्सर प्रोटोकॉल छोड़ने का कारण बनता था। ट्रायल के निष्कर्ष में कुछ नहीं बदला, और उसमें हर विफलता दर आधी हो गई।",
  "Intention to treat, a reasoning trap.":
    "इंटेंशन टू ट्रीट, तर्क का एक जाल।",
  "A trial flips a coin so its two groups start out alike. Then real life happens: people switch treatments, refuse the operation, or die before it. It seems only fair to compare the ones who actually got what they were assigned. It is not, because whether someone stuck to the plan depends on how they were doing, and often on whether they survived. Dropping them quietly sorts the groups by prognosis, which is the very thing the trial is trying to measure. Count everyone where the coin put them, and the flattering result can vanish.":
    "ट्रायल सिक्का उछालता है ताकि उसके दोनों समूह शुरुआत में एक जैसे हों। फिर असल ज़िंदगी दख़ल देती है: लोग इलाज बदल लेते हैं, ऑपरेशन से मना कर देते हैं, या उससे पहले ही मर जाते हैं। लगता है कि उन्हीं की तुलना करना न्यायसंगत है जिन्हें असल में वही मिला जो सौंपा गया था। ऐसा है नहीं, क्योंकि कोई योजना पर टिका रहा या नहीं, यह इस पर निर्भर करता है कि उसकी हालत कैसी थी, और अक्सर इस पर कि वह जीवित रहा या नहीं। उन्हें हटाना चुपचाप समूहों को प्रॉग्नोसिस के हिसाब से छाँट देता है, और यही वह चीज़ है जिसे ट्रायल मापना चाहता है। हर व्यक्ति को वहीं गिनिए जहाँ सिक्के ने उसे रखा था, और सुहावना नतीजा ग़ायब हो सकता है।",
  "The four counts in the first two panels are printed. The third panel is subtraction over those printed integers rather than figures of its own: 65 and 55 are 602 minus 537 and 610 minus 555, and 15 and 30 are 244 minus 229 and 218 minus 188. It closes three ways. The excluded patients reassemble the as-treated arms, 537 plus 55 and 555 plus 65 giving 592 and 620, which sum to the 1,212 randomised; and total deaths are conserved in every split, 244 plus 218 and 259 plus 203 both giving 462. Note also that the trial's P values, 0.12 as randomised and 0.005 per protocol, come from Cox proportional-hazards models over the whole follow-up, not from these four-cell tables, so they are quoted as the trial's own results and not recomputed here.":
    "पहले दो पैनलों की चारों गिनतियाँ प्रकाशित हैं। तीसरा पैनल अपने कोई नए आँकड़े नहीं देता, बल्कि उन्हीं प्रकाशित पूर्णांकों का घटाव है: 65 और 55 यानी 602 घटा 537 तथा 610 घटा 555, और 15 और 30 यानी 244 घटा 229 तथा 218 घटा 188। यह तीन तरह से मिलान करता है। बाहर किए गए मरीज़ों को जोड़ने पर ऐज़ ट्रीटेड आर्म फिर से बन जाते हैं, 537 जमा 55 और 555 जमा 65 से 592 और 620 मिलते हैं, जिनका योग रैंडमाइज़ किए गए 1,212 है; और हर विभाजन में कुल मौतें सुरक्षित रहती हैं, 244 जमा 218 तथा 259 जमा 203, दोनों से 462 मिलता है। यह भी ध्यान दें कि ट्रायल के P मान, रैंडमाइज़्ड आधार पर 0.12 और पर प्रोटोकॉल 0.005, पूरे फ़ॉलो अप पर लगाए गए Cox proportional-hazards मॉडल से आते हैं, इन चार खानों की तालिकाओं से नहीं, इसलिए इन्हें ट्रायल के अपने परिणामों के रूप में उद्धृत किया गया है और यहाँ दोबारा गणना नहीं की गई है।",
  "Women with melanoma report burning easily far more often than women without it. How much of that gap is their skin?":
    "मेलानोमा से पीड़ित महिलाएँ बिना मेलानोमा वाली महिलाओं की तुलना में कहीं अधिक बार कहती हैं कि उनकी त्वचा जल्दी जल जाती है। इस अंतर में कितना हिस्सा उनकी त्वचा का है?",
  "141 women who had been diagnosed with melanoma and 1,094 who had not, asked how their skin responds to the sun. 45 percent of the women with melanoma said they tan little or not at all, against 25 percent of the others. Pale, easily burned skin is a known risk factor, so the finding looks exactly as expected.":
    "141 महिलाएँ जिनमें मेलानोमा का निदान हुआ था और 1,094 जिनमें नहीं, सबसे पूछा गया कि उनकी त्वचा धूप पर कैसी प्रतिक्रिया करती है। मेलानोमा वाली 45 प्रतिशत महिलाओं ने कहा कि उनकी त्वचा बहुत कम या बिल्कुल नहीं टैन होती, जबकि बाक़ी में यह 25 प्रतिशत था। पीली, जल्दी जल जाने वाली त्वचा एक ज्ञात जोखिम कारक है, इसलिए यह निष्कर्ष ठीक वैसा ही लगता है जैसा अपेक्षित था।",
  "Is that twenty point gap what their skin was really like?":
    "क्या बीस अंक का यह अंतर सचमुच उनकी त्वचा का था?",
  "Said their skin tans little or not at all":
    "कहा कि त्वचा बहुत कम या बिल्कुल टैन नहीं होती",
  "Women who developed melanoma":
    "जिन महिलाओं को मेलानोमा हुआ",
  "Melanoma":
    "मेलानोमा",
  "Women who did not":
    "जिन्हें नहीं हुआ",
  "No melanoma":
    "मेलानोमा नहीं",
  "Asked after the diagnosis":
    "निदान के बाद पूछा गया",
  "Asked years before anyone knew":
    "किसी को पता चलने से वर्षों पहले पूछा गया",
  "Yes, pale skin is a real risk factor":
    "हाँ, पीली त्वचा असली जोखिम कारक है",
  "the gap is their skin":
    "अंतर उनकी त्वचा का है",
  "No, the whole association is an artefact":
    "नहीं, पूरा संबंध ही कृत्रिम है",
  "they are reinterpreting their past":
    "वे अपने अतीत को नए सिरे से पढ़ रही हैं",
  "Partly, and part of it appeared afterwards":
    "आंशिक रूप से, कुछ हिस्सा बाद में आया",
  "real, but not this large":
    "असली, पर इतना बड़ा नहीं",
  "These same women had already answered, years earlier.":
    "इन्हीं महिलाओं ने वर्षों पहले भी यही उत्तर दिया था।",
  "The question was answered by a different person, in a sense":
    "एक अर्थ में, इस प्रश्न का उत्तर किसी और ही व्यक्ति ने दिया",
  "Every one of these women filled in the same question before anyone knew who would get melanoma. Back then the gap was thirteen points, not twenty. The women who went on to be diagnosed shifted seven points towards saying they burn; the women who were not diagnosed, answering over the same years, shifted a point the other way. Nobody's skin changed in between. What changed was that some of them had since been asked to explain a cancer:":
    "इनमें से हर महिला ने यही प्रश्न तब भरा था जब किसी को पता नहीं था कि मेलानोमा किसे होगा। तब अंतर तेरह अंक का था, बीस का नहीं। जिन महिलाओं का बाद में निदान हुआ, वे सात अंक इस ओर खिसकीं कि उनकी त्वचा जल जाती है; जिनका निदान नहीं हुआ, उन्होंने उन्हीं वर्षों में उत्तर देते हुए एक अंक दूसरी दिशा में खिसकाया। बीच में किसी की त्वचा नहीं बदली। बदला यह कि उनमें से कुछ से इस बीच एक कैंसर की व्याख्या करने को कहा जा चुका था:",
  "The same women, asked twice":
    "वही महिलाएँ, दो बार पूछा गया",
  "So the risk factor is real and the study still overstates it: the crude odds ratio these counts give is about 1.8 before the diagnosis and about 2.5 after it, so roughly a third of what the later study measured was not there beforehand. That is the awkward shape of recall bias. It rarely conjures an association out of nothing. It takes a true one and inflates it, which is far harder to spot, because the result still agrees with everything you already believed.":
    "तो जोखिम कारक असली है और फिर भी अध्ययन उसे बढ़ा चढ़ाकर बताता है: इन गिनतियों से मिलने वाला क्रूड ऑड्स रेशियो निदान से पहले लगभग 1.8 है और उसके बाद लगभग 2.5, यानी बाद वाले अध्ययन ने जो मापा उसका मोटे तौर पर एक तिहाई हिस्सा पहले मौजूद ही नहीं था। रिकॉल बायस की बेढंगी शक्ल यही है। यह शून्य से कोई संबंध शायद ही गढ़ता हो। यह किसी सच्चे संबंध को लेकर उसे फुला देता है, जिसे पकड़ना कहीं कठिन है, क्योंकि नतीजा तब भी उन सब बातों से मेल खाता है जिन पर आप पहले से विश्वास करते थे।",
  "What the diagnosis changed":
    "निदान ने क्या बदला",
  "Recall bias":
    "रिकॉल बायस",
  "People who know how their story ended remember the beginning differently, so asking about the past after the outcome is known measures the outcome as well as the past.":
    "जिन लोगों को पता है कि उनकी कहानी का अंत कैसा हुआ, वे शुरुआत को अलग तरह से याद करते हैं, इसलिए परिणाम पता चलने के बाद अतीत के बारे में पूछना अतीत के साथ साथ परिणाम को भी मापता है।",
  "Nobody here is lying. Searching your memory harder because you have been given a reason to search it is an ordinary human thing to do, and the answers that come back are honestly meant. That is what makes it so hard to correct for: there is no dishonest group to exclude and no question you can ask that fixes it, because the more carefully someone thinks about it, the worse it gets.":
    "यहाँ कोई झूठ नहीं बोल रहा। जब आपको याद खंगालने की कोई वजह मिल जाए तो और ज़्यादा ज़ोर लगाकर याद करना एक सामान्य मानवीय बात है, और जो उत्तर आते हैं वे ईमानदारी से दिए जाते हैं। इसी वजह से इसे सुधारना इतना कठिन है: कोई बेईमान समूह नहीं है जिसे बाहर किया जाए, और कोई ऐसा प्रश्न भी नहीं जो इसे ठीक कर दे, क्योंकि व्यक्ति जितने ध्यान से सोचता है, बात उतनी ही बिगड़ती है।",
  "A case-control study starts from the outcome and works backwards, asking people who have a disease and people who do not what they were exposed to. It is fast, it is cheap, and for a rare disease it is often the only design that will ever be affordable. Its weakness is that one group has been given a reason to search their memory. A diagnosis prompts the question \"why me\", and the mind answers it, reaching for the sunburn, the chemical, the medicine, the difficult pregnancy. The other group has no such prompt and remembers no harder than anyone remembers anything. So the two groups are not just being compared on exposure, they are being compared on how hard they looked. The direction is usually predictable: it inflates whatever the person already suspects is to blame, which means it tends to confirm the hypothesis under test. The defences are all about not relying on memory. Take the exposure from a record written before the outcome, from a prescription database, a workplace log, a stored blood sample, a questionnaire filled in years earlier. Or build in a comparison the mechanism cannot touch, such as a second exposure question that nobody associates with the disease: if the groups drift equally on that one, the drift is not about the disease. What does not work is asking the question more carefully, and what does not work is telling people to be objective.":
    "केस कंट्रोल अध्ययन परिणाम से शुरू होकर पीछे की ओर चलता है, और जिन लोगों को कोई बीमारी है तथा जिन्हें नहीं है, दोनों से पूछता है कि वे किन चीज़ों के संपर्क में आए। यह तेज़ है, सस्ता है, और किसी दुर्लभ बीमारी के लिए अक्सर यही एकमात्र डिज़ाइन होता है जिसे वहन किया जा सकता है। इसकी कमज़ोरी यह है कि एक समूह को अपनी याददाश्त खंगालने की वजह दे दी गई है। निदान मन में यह प्रश्न उठाता है कि “मैं ही क्यों”, और मन उसका उत्तर ढूँढ़ता है, धूप की जलन, कोई रसायन, कोई दवा, कोई कठिन गर्भावस्था तक पहुँचता है। दूसरे समूह के सामने ऐसा कोई प्रश्न नहीं है और वह उतना ही याद करता है जितना कोई भी किसी बात को याद करता है। इसलिए दोनों समूहों की तुलना केवल एक्सपोज़र पर नहीं हो रही, बल्कि इस पर भी हो रही है कि किसने कितना ज़ोर लगाकर खोजा। दिशा आमतौर पर पहले से पता होती है: व्यक्ति जिसे पहले से दोषी मानता है, यह उसी को बढ़ा देता है, यानी यह जाँची जा रही परिकल्पना की पुष्टि करने की ओर झुकता है। बचाव के सारे उपाय यही हैं कि याददाश्त पर निर्भर न रहा जाए। एक्सपोज़र को ऐसे रिकॉर्ड से लें जो परिणाम से पहले लिखा गया हो, किसी प्रिस्क्रिप्शन डेटाबेस से, कार्यस्थल के रजिस्टर से, सुरक्षित रखे रक्त नमूने से, या वर्षों पहले भरी गई प्रश्नावली से। या फिर ऐसी तुलना बना लें जिसे यह प्रक्रिया छू ही न सके, जैसे एक दूसरा एक्सपोज़र प्रश्न जिसे कोई इस बीमारी से नहीं जोड़ता: यदि दोनों समूह उस पर बराबर खिसकते हैं, तो खिसकाव बीमारी की वजह से नहीं है। जो काम नहीं करता वह है प्रश्न को और सावधानी से पूछना, और जो काम नहीं करता वह है लोगों से कहना कि वे वस्तुनिष्ठ रहें।",
  "The study everyone credits for this does not show it":
    "जिस अध्ययन को इसका श्रेय दिया जाता है, वह इसे दिखाता ही नहीं",
  "A 1967 Finnish study is cited across the literature as the origin of recall bias. It re-interviewed mothers whose answers had been recorded during pregnancy, and its own text reports no significant difference between the mothers of affected and healthy children in how often the replies disagreed. What it does show, and spectacularly, is something else: only about a quarter of the information collected prospectively reappeared identically at re-interview, and roughly two thirds of the retrospective positive answers had no prospective record behind them, in both groups alike. That is not recall bias, it is a warning that retrospective interviews are unreliable even when nobody is biased at all.":
    "1967 के एक फ़िनिश अध्ययन को साहित्य भर में रिकॉल बायस का उद्गम बताया जाता है। उसमें उन माताओं का दोबारा साक्षात्कार लिया गया जिनके उत्तर गर्भावस्था के दौरान दर्ज हो चुके थे, और उसका अपना पाठ बताता है कि प्रभावित और स्वस्थ बच्चों की माताओं के बीच उत्तरों के आपस में न मिलने की दर में कोई सार्थक अंतर नहीं था। वह जो दिखाता है, और बहुत साफ़ तौर पर दिखाता है, वह कुछ और है: प्रॉस्पेक्टिव तरीक़े से जुटाई गई जानकारी का केवल लगभग एक चौथाई हिस्सा दोबारा साक्षात्कार में हूबहू फिर मिला, और रेट्रोस्पेक्टिव सकारात्मक उत्तरों में से मोटे तौर पर दो तिहाई के पीछे कोई प्रॉस्पेक्टिव रिकॉर्ड था ही नहीं, और यह दोनों समूहों में एक जैसा था। यह रिकॉल बायस नहीं है, यह चेतावनी है कि रेट्रोस्पेक्टिव साक्षात्कार तब भी अविश्वसनीय होते हैं जब कोई भी पक्षपात न कर रहा हो।",
  "And the largest test of it found almost none":
    "और इसकी सबसे बड़ी जाँच में यह लगभग मिला ही नहीं",
  "The biggest study of this design compared what parents said in interview against what their family doctor had already written down, for 1,624 children with cancer and 2,524 without. Agreement with the records was poor in places, but it was poor in much the same way in both groups. The authors found essentially no evidence that having a sick child changed how the past was reported. Recall bias is a real mechanism and a reason to prefer records over memory. It is not a law that memory always bends, and a study is not discredited by the mere fact that it asked people to remember.":
    "इस डिज़ाइन के सबसे बड़े अध्ययन ने कैंसर से पीड़ित 1,624 बच्चों और बिना कैंसर वाले 2,524 बच्चों के लिए यह तुलना की कि माता पिता ने साक्षात्कार में क्या कहा और उनके फ़ैमिली डॉक्टर ने पहले से क्या लिख रखा था। रिकॉर्ड से मेल कहीं कहीं कमज़ोर था, पर वह दोनों समूहों में लगभग एक ही तरह से कमज़ोर था। लेखकों को इसका मूलतः कोई प्रमाण नहीं मिला कि बीमार बच्चा होने से अतीत के बारे में बताने का तरीक़ा बदल गया हो। रिकॉल बायस एक वास्तविक प्रक्रिया है और याददाश्त के बजाय रिकॉर्ड को प्राथमिकता देने का कारण है। यह कोई नियम नहीं है कि याददाश्त हमेशा मुड़ ही जाती है, और कोई अध्ययन केवल इसलिए अविश्वसनीय नहीं हो जाता कि उसने लोगों से याद करने को कहा।",
  "Recall bias, a reasoning trap.":
    "रिकॉल बायस, तर्क का एक जाल।",
  "Ask someone what they were exposed to before they got ill and you are not only asking about the past, you are asking someone who has been given a reason to search it. A diagnosis makes people look harder, and looking harder turns up more. In one study the same women answered the same question about their skin years apart, once before anyone knew and once after a melanoma diagnosis, and the ones who had been diagnosed had shifted. Their skin had not. This rarely invents a finding from nothing. It takes a true one and makes it look bigger, which is much harder to catch, because the answer still agrees with what you expected.":
    "किसी से यह पूछना कि बीमार पड़ने से पहले वह किन चीज़ों के संपर्क में आया, केवल अतीत के बारे में पूछना नहीं है, बल्कि ऐसे व्यक्ति से पूछना है जिसे अतीत खंगालने की वजह दे दी गई है। निदान लोगों को और ज़ोर लगाकर खोजने पर मजबूर करता है, और ज़्यादा खोजने पर ज़्यादा मिलता है। एक अध्ययन में इन्हीं महिलाओं ने अपनी त्वचा के बारे में वही प्रश्न वर्षों के अंतर पर दो बार भरा, एक बार तब जब किसी को कुछ पता नहीं था और एक बार मेलानोमा के निदान के बाद, और जिनका निदान हुआ था उनके उत्तर खिसक गए थे। उनकी त्वचा नहीं बदली थी। यह शून्य से कोई निष्कर्ष शायद ही गढ़ता है। यह किसी सच्चे निष्कर्ष को बड़ा दिखा देता है, जिसे पकड़ना कहीं कठिन है, क्योंकि उत्तर तब भी आपकी अपेक्षा से मेल खाता है।",
  "Two things a careful reader should know. First, the reference standard is the woman's own questionnaire filled in before diagnosis, not an external record, so this shows that the answers moved rather than which of the two answers was correct, and the authors' own conclusion is appropriately hedged: tanning ability was the one host factor whose shift was significant in the cases and not in the controls. Second, the paper prints odds ratios of 1.90 and 3.01 for this comparison. Those are the authors' own estimates and are not the crude odds ratios of these four cells, which are 1.80 and 2.55. The two pairs move in the same direction by a similar factor but they are not the same quantity, so only the crude ones, which anyone can recompute from the counts shown, appear in the text above.":
    "एक सावधान पाठक को दो बातें जाननी चाहिए। पहली, यहाँ संदर्भ मानक स्वयं महिला की वह प्रश्नावली है जो निदान से पहले भरी गई थी, कोई बाहरी रिकॉर्ड नहीं, इसलिए यह इतना ही दिखाता है कि उत्तर खिसके, न कि यह कि दोनों में से कौन सा उत्तर सही था, और लेखकों का अपना निष्कर्ष उचित रूप से सावधान है: टैन होने की क्षमता ही वह एकमात्र होस्ट फ़ैक्टर थी जिसका खिसकाव केसों में सार्थक था और कंट्रोल में नहीं। दूसरी, पेपर इस तुलना के लिए 1.90 और 3.01 के ऑड्स रेशियो छापता है। वे लेखकों के अपने अनुमान हैं और इन चार खानों के क्रूड ऑड्स रेशियो नहीं हैं, जो 1.80 और 2.55 हैं। दोनों जोड़े एक ही दिशा में लगभग एक जैसे गुणक से बढ़ते हैं, पर वे एक ही राशि नहीं हैं, इसलिए ऊपर के पाठ में केवल क्रूड मान दिए गए हैं, जिन्हें दिखाई गई गिनतियों से कोई भी दोबारा निकाल सकता है।",
  "Patients who were dispensed this drug died far less often than those who were not. Is the drug working?":
    "जिन मरीज़ों को यह दवा दी गई, उनकी मृत्यु उन मरीज़ों से कहीं कम हुई जिन्हें नहीं दी गई। क्या दवा काम कर रही है?",
  "A cohort is followed from the day each patient enters it. Anyone who is dispensed the drug at any point during follow-up counts as treated; everyone else counts as untreated. 49 percent of the treated died against 71 percent of the untreated, and the drug appears to halve the death rate.":
    "एक कोहोर्ट का फ़ॉलो अप उस दिन से शुरू होता है जिस दिन हर मरीज़ उसमें शामिल होता है। जिस किसी को फ़ॉलो अप के दौरान कभी भी दवा मिल जाए, उसे इलाज पाया हुआ गिना जाता है; बाक़ी सबको बिना इलाज वाला। इलाज पाए हुओं में 49 प्रतिशत की मृत्यु हुई और बिना इलाज वालों में 71 प्रतिशत की, और ऐसा लगता है कि दवा मृत्यु दर आधी कर देती है।",
  "Is that gap the drug?":
    "क्या यह अंतर दवा का है?",
  "One patient from each group":
    "हर समूह से एक मरीज़",
  "months":
    "महीने",
  "entered the cohort":
    "कोहोर्ट में शामिल हुए",
  "first prescription dispensed":
    "पहला प्रिस्क्रिप्शन मिला",
  "follow-up credited to each group":
    "हर समूह के खाते में गया फ़ॉलो अप",
  "Counted, but death was impossible":
    "गिना गया, पर मृत्यु असंभव थी",
  "Follow-up credited to each group":
    "हर समूह के खाते में गया फ़ॉलो अप",
  "Counted as on the drug":
    "दवा पर गिना गया",
  "Counted as not on the drug":
    "दवा पर नहीं गिना गया",
  "As the study counted it":
    "जैसा अध्ययन ने गिना",
  "Yes, the drug is keeping them alive":
    "हाँ, दवा उन्हें जीवित रख रही है",
  "half the deaths":
    "आधी मौतें",
  "No, the untreated were sicker to begin with":
    "नहीं, बिना इलाज वाले शुरू से ही ज़्यादा बीमार थे",
  "they were never offered it":
    "उन्हें यह दवा दी ही नहीं गई",
  "No, some of that time could not contain a death":
    "नहीं, उस समय के कुछ हिस्से में मृत्यु हो ही नहीं सकती थी",
  "the clock was started too early":
    "घड़ी बहुत जल्दी शुरू कर दी गई",
  "Half the treated group's follow-up was time in which nobody could die.":
    "इलाज पाए समूह का आधा फ़ॉलो अप ऐसा समय था जिसमें किसी की मृत्यु हो ही नहीं सकती थी।",
  "Surviving is what put them in the treated group":
    "जीवित रहना ही उन्हें इलाज पाए समूह में ले आया",
  "This patient was counted as treated from the day they entered, but the prescription was not dispensed until month 11. Those eleven months are immortal: had the patient died in month 6, no prescription would ever have been written and they would have been counted in the other group instead. Death was not merely unlikely in that stretch, it was impossible by the way the groups were defined, and it is credited to the drug all the same:":
    "इस मरीज़ को शामिल होने के दिन से ही इलाज पाया हुआ गिना गया, पर प्रिस्क्रिप्शन महीने 11 तक मिला ही नहीं। वे ग्यारह महीने इम्मॉर्टल हैं: यदि मरीज़ की मृत्यु महीने 6 में हो जाती, तो कोई प्रिस्क्रिप्शन कभी लिखा ही नहीं जाता और उसे दूसरे समूह में गिना जाता। उस अवधि में मृत्यु केवल असंभावित नहीं थी, समूहों की परिभाषा के हिसाब से वह असंभव थी, और फिर भी वह अवधि दवा के खाते में जाती है:",
  "The same follow-up, marked":
    "वही फ़ॉलो अप, चिह्नित",
  "Nothing about the patients has to differ for this to work. Give both groups exactly the same drug, the same illness and the same luck, and the treated group will still come out ahead, because it has been handed a run of guaranteed survival that the other group cannot have. In the published example this is drawn from, the treated group was credited with 291.1 immortal person-years against 276.3 person-years in which it was genuinely at risk: more of its follow-up was impossible-to-die time than was real. Correcting only that moved the hazard ratio from 0.48 to 0.91.":
    "इसके काम करने के लिए मरीज़ों में किसी अंतर की ज़रूरत नहीं है। दोनों समूहों को बिल्कुल एक ही दवा, एक ही बीमारी और एक ही क़िस्मत दे दीजिए, फिर भी इलाज पाया समूह आगे निकलेगा, क्योंकि उसे ऐसी गारंटीशुदा उत्तरजीविता की अवधि सौंप दी गई है जो दूसरे समूह को मिल ही नहीं सकती। जिस प्रकाशित उदाहरण से यह लिया गया है, उसमें इलाज पाए समूह के खाते में 291.1 इम्मॉर्टल पर्सन इयर्स गए, जबकि केवल 276.3 पर्सन इयर्स ऐसे थे जिनमें वह सचमुच जोखिम में था: उसके फ़ॉलो अप में असली समय से ज़्यादा वह समय था जिसमें मरना असंभव था। केवल इतना सुधारने से हैज़र्ड रेशियो 0.48 से बदलकर 0.91 हो गया।",
  "The stretch before the prescription":
    "प्रिस्क्रिप्शन से पहले की अवधि",
  "Immortal time bias":
    "इम्मॉर्टल टाइम बायस",
  "If being in a group requires surviving until something happens, then the time before it happened cannot contain a death, and counting it towards that group manufactures survival out of bookkeeping.":
    "यदि किसी समूह में होने के लिए किसी घटना तक जीवित रहना ज़रूरी है, तो उस घटना से पहले के समय में मृत्यु हो ही नहीं सकती, और उस समय को उसी समूह के खाते में डालना हिसाब किताब से उत्तरजीविता गढ़ लेना है।",
  "The tell is a group defined by something that occurs after follow-up starts: filled the prescription, had the operation, responded to treatment, won the award, completed the course. Ask what happens to a person who dies the day before. If they land in the comparison group, the clock is wrong. The fix is not a cleverer adjustment: it is to count each person's time as unexposed until the moment they become exposed, and let them switch.":
    "पहचान यह है कि समूह की परिभाषा किसी ऐसी बात से बनी हो जो फ़ॉलो अप शुरू होने के बाद घटती है: दवा ली, ऑपरेशन हुआ, इलाज पर प्रतिक्रिया दी, पुरस्कार जीता, कोर्स पूरा किया। पूछिए कि जो व्यक्ति उससे एक दिन पहले मर जाता है, उसका क्या होता है। यदि वह तुलना समूह में जा गिरता है, तो घड़ी ग़लत है। इसका समाधान कोई और चतुर एडजस्टमेंट नहीं है: समाधान यह है कि हर व्यक्ति के समय को तब तक अनएक्सपोज़्ड गिना जाए जब तक वह एक्सपोज़्ड न हो जाए, और फिर उसे बदल जाने दिया जाए।",
  "Cohort studies compare rates, and a rate is deaths divided by time at risk. That denominator is where this hides. Suppose you want to know whether a drug helps, so you follow everyone admitted to hospital and sort them afterwards by whether they were ever dispensed it. The sorting looks innocent, but it uses information from the future: to be dispensed a drug in month 11, you must be alive in month 11. So every patient in the treated group is guaranteed to have survived to their own first prescription, and if you start their clock at admission you credit the treated group with all of that guaranteed survival. The untreated group gets no such gift, because it is where the early deaths necessarily land. The bias is large, it always points the same way, it makes useless drugs look protective, and it does not shrink with a bigger sample, because it is not noise. It also has nothing to do with confounding, which is why adjusting for how ill the patients were does not touch it: you can simulate the whole thing with identical patients and a drug that does nothing. The correct handling is standard and unglamorous. Treat exposure as time-varying: every patient contributes unexposed time from entry until their first prescription and exposed time after it, so nobody is credited to a group before they belong to it. The same trap sits under any claim built on people who finished something, from Academy Award winners living longer than nominees to patients who completed a rehabilitation programme, and in each case the first question is the same: what happens in these numbers to the person who died in the middle?":
    "कोहोर्ट अध्ययन दरों की तुलना करते हैं, और दर का अर्थ है मौतें बँटा जोखिम में बीता समय। यह चीज़ उसी हर में छिपी रहती है। मान लीजिए आप जानना चाहते हैं कि कोई दवा मदद करती है या नहीं, तो आप अस्पताल में भर्ती हुए हर व्यक्ति का फ़ॉलो अप करते हैं और बाद में उन्हें इस आधार पर छाँटते हैं कि उन्हें दवा कभी मिली या नहीं। यह छँटाई निर्दोष लगती है, पर यह भविष्य की जानकारी इस्तेमाल करती है: महीने 11 में दवा पाने के लिए आपका महीने 11 में जीवित होना ज़रूरी है। यानी इलाज पाए समूह का हर मरीज़ अपने पहले प्रिस्क्रिप्शन तक जीवित रहा ही होगा, और यदि आप उसकी घड़ी भर्ती के दिन से शुरू करते हैं तो वह पूरी गारंटीशुदा उत्तरजीविता आप इलाज पाए समूह के खाते में डाल देते हैं। बिना इलाज वाले समूह को ऐसा कोई उपहार नहीं मिलता, क्योंकि शुरुआती मौतें अनिवार्य रूप से वहीं जाती हैं। यह बायस बड़ा होता है, हमेशा एक ही दिशा में झुकता है, बेकार दवाओं को सुरक्षात्मक दिखाता है, और बड़े नमूने से घटता नहीं, क्योंकि यह शोर नहीं है। इसका कन्फाउंडिंग से भी कोई लेना देना नहीं है, इसीलिए मरीज़ कितने बीमार थे इसके लिए एडजस्ट करने से यह टलता नहीं: आप इस पूरी चीज़ का सिमुलेशन एक जैसे मरीज़ों और ऐसी दवा से कर सकते हैं जो कुछ करती ही नहीं। सही तरीक़ा मानक है और बिना किसी चमक दमक के। एक्सपोज़र को समय के साथ बदलने वाला मानिए: हर मरीज़ शामिल होने से अपने पहले प्रिस्क्रिप्शन तक अनएक्सपोज़्ड समय देता है और उसके बाद एक्सपोज़्ड समय, ताकि किसी को उस समूह के खाते में न डाला जाए जिसका वह अभी हिस्सा ही नहीं है। यही जाल हर उस दावे के नीचे बैठा है जो कुछ पूरा कर चुके लोगों पर बना हो, चाहे वह यह हो कि ऑस्कर विजेता नामांकित लोगों से ज़्यादा जिए, या यह कि मरीज़ों ने पुनर्वास कार्यक्रम पूरा किया, और हर बार पहला प्रश्न वही है: इन आँकड़ों में उस व्यक्ति का क्या होता है जिसकी मृत्यु बीच में हो गई?",
  "The Oscar winners who did not, after all, live longer":
    "वे ऑस्कर विजेता जो आख़िरकार ज़्यादा नहीं जिए",
  "A well-known study reported that Academy Award winners outlived the actors merely nominated alongside them by nearly four years, and it was widely read as evidence that status is good for your health. But an actor cannot win an award while dead, so every winner was credited with all the years before their win, whereas a nominee who died young could only ever be a nominee. Reanalysing the same data with the award treated as something that happens partway through a life, rather than a property of the whole life, cut the advantage to about a year and it was no longer statistically significant. The original authors later published a null result of their own.":
    "एक जाने माने अध्ययन ने बताया कि अकादमी अवॉर्ड जीतने वाले अभिनेता उनके साथ केवल नामांकित हुए अभिनेताओं से लगभग चार वर्ष अधिक जिए, और इसे व्यापक रूप से इस प्रमाण की तरह पढ़ा गया कि रुतबा सेहत के लिए अच्छा है। पर कोई अभिनेता मरने के बाद पुरस्कार नहीं जीत सकता, इसलिए हर विजेता के खाते में जीत से पहले के सारे वर्ष चले गए, जबकि कम उम्र में मरने वाला नामांकित व्यक्ति हमेशा नामांकित ही रह सकता था। उन्हीं आँकड़ों का दोबारा विश्लेषण करने पर, जिसमें पुरस्कार को पूरे जीवन का गुण मानने के बजाय जीवन के बीच में घटी घटना माना गया, यह बढ़त घटकर लगभग एक वर्ष रह गई और सांख्यिकीय रूप से सार्थक नहीं रही। मूल लेखकों ने बाद में स्वयं एक निष्फल परिणाम प्रकाशित किया।",
  "Immortal time bias, a reasoning trap.":
    "इम्मॉर्टल टाइम बायस, तर्क का एक जाल।",
  "Sort people into groups by something that happens later, and one of those groups gets a hidden head start. To be counted as having taken the drug, you have to live long enough to be given it. So everybody in the treated group is guaranteed to have survived up to their first prescription, and if you count that stretch towards the drug, the drug is credited with survival it had nothing to do with. Anyone who died early is automatically filed under untreated. It works even when the drug does nothing at all, it always points the same way, and a bigger study only makes it more convincing.":
    "लोगों को बाद में घटने वाली किसी बात के आधार पर समूहों में बाँटिए, और उनमें से एक समूह को छिपी हुई बढ़त मिल जाती है। दवा लेने वालों में गिने जाने के लिए आपका इतना जीवित रहना ज़रूरी है कि दवा आप तक पहुँच सके। यानी इलाज पाए समूह का हर व्यक्ति अपने पहले प्रिस्क्रिप्शन तक ज़रूर जीवित रहा, और यदि आप उस अवधि को दवा के खाते में गिनते हैं, तो दवा को ऐसी उत्तरजीविता का श्रेय मिल जाता है जिससे उसका कोई संबंध ही नहीं था। जो जल्दी मर गया, वह अपने आप बिना इलाज वालों में दर्ज हो जाता है। यह तब भी काम करता है जब दवा कुछ करती ही न हो, यह हमेशा एक ही दिशा में झुकता है, और बड़ा अध्ययन इसे और भरोसेमंद बना देता है।",
  "The figure above is schematic, like the bomber diagram: two illustrative patients rather than two rows of the dataset, with proportions chosen to echo the published ones (eleven immortal months out of twenty-two counted, against 291.1 immortal person-years out of 567.4 counted, which is 51.3 percent). The numbers that are claims about the world, the death counts and the two hazard ratios, are all in the citation above and none of them is recomputed here: the hazard ratios come from survival models rather than from any two-by-two table, and the paper is a methodological reanalysis in which several cohort definitions are applied to one dataset, so the row is named exactly.":
    "ऊपर का चित्र योजनाबद्ध है, बमवर्षक वाले आरेख की तरह: यह डेटासेट की दो पंक्तियाँ नहीं, बल्कि दो उदाहरणस्वरूप मरीज़ हैं, और अनुपात इस तरह चुने गए हैं कि प्रकाशित अनुपातों की झलक दें (गिने गए बाईस महीनों में से ग्यारह इम्मॉर्टल महीने, जबकि गिने गए 567.4 पर्सन इयर्स में से 291.1 इम्मॉर्टल पर्सन इयर्स, यानी 51.3 प्रतिशत)। जो संख्याएँ दुनिया के बारे में दावे हैं, यानी मृत्यु की गिनतियाँ और दोनों हैज़र्ड रेशियो, वे सब ऊपर दिए गए संदर्भ में हैं और उनमें से किसी की यहाँ दोबारा गणना नहीं की गई है: हैज़र्ड रेशियो किसी दो गुणा दो तालिका से नहीं, बल्कि सर्वाइवल मॉडल से आते हैं, और वह पेपर एक पद्धतिगत पुनर्विश्लेषण है जिसमें एक ही डेटासेट पर कई कोहोर्ट परिभाषाएँ लगाई गई हैं, इसलिए पंक्ति का नाम ठीक ठीक दिया गया है।",
  "A weight-loss trial randomly assigns 400 people to a programme or to usual care. It reports the average weight lost among the 180 programme participants who attended at least eight sessions, and among all 200 controls. The programme wins comfortably.":
    "वज़न घटाने का एक ट्रायल 400 लोगों को रैंडम तरीक़े से एक कार्यक्रम या सामान्य देखभाल में डालता है। यह उन 180 कार्यक्रम प्रतिभागियों में औसत वज़न घटाव बताता है जिन्होंने कम से कम आठ सत्रों में हिस्सा लिया, और सभी 200 कंट्रोल में। कार्यक्रम आराम से जीत जाता है।",
  "One arm has been filtered and the other has not. Attending eight sessions is something people who were doing well were more able to do, so the programme group has quietly been reduced to its successes while the control group keeps everybody.":
    "एक आर्म को छाना गया है और दूसरे को नहीं। आठ सत्रों में हिस्सा लेना उन्हीं लोगों के लिए ज़्यादा संभव था जिनकी प्रगति अच्छी थी, इसलिए कार्यक्रम समूह चुपचाप अपनी सफलताओं तक सिमट गया है, जबकि कंट्रोल समूह में सब बने हुए हैं।",
  "In a surgical trial, some patients assigned to medication deteriorate and are operated on anyway. The analysis counts each patient under the treatment they ended up receiving, and finds surgery ahead.":
    "एक सर्जिकल ट्रायल में दवा के लिए चुने गए कुछ मरीज़ों की हालत बिगड़ती है और उनका ऑपरेशन कर ही दिया जाता है। विश्लेषण हर मरीज़ को उसी इलाज में गिनता है जो उसे आख़िर में मिला, और सर्जरी को आगे पाता है।",
  "Switching happened after the coin flip and for a reason: those patients had to survive long enough to reach the operating table. Counting people by what they received rather than what they were assigned sorts them by how they were doing, which is the thing being measured.":
    "बदलाव सिक्का उछलने के बाद हुआ और एक वजह से हुआ: उन मरीज़ों को ऑपरेशन टेबल तक पहुँचने भर जीवित रहना पड़ा। लोगों को इस आधार पर गिनना कि उन्हें क्या मिला, न कि इस पर कि उन्हें क्या सौंपा गया था, उन्हें उनकी हालत के हिसाब से छाँट देता है, और वही चीज़ मापी जा रही है।",
  "A trial of a daily tablet excludes anyone who took less than 80 percent of their doses, on the grounds that the question is whether the drug works when actually taken. Both arms are filtered the same way.":
    "रोज़ ली जाने वाली एक गोली का ट्रायल हर उस व्यक्ति को बाहर कर देता है जिसने अपनी 80 प्रतिशत से कम ख़ुराकें लीं, इस आधार पर कि प्रश्न यह है कि दवा असल में ली जाए तो काम करती है या नहीं। दोनों आर्म को एक ही तरह छाना जाता है।",
  "Filtering both arms identically does not repair it. Who manages to take 80 percent of their tablets differs by how well they are and by much else besides, so each arm loses a different kind of patient and the groups the coin made no longer exist.":
    "दोनों आर्म को एक जैसा छानने से बात नहीं बनती। कौन अपनी 80 प्रतिशत गोलियाँ ले पाता है, यह उसकी सेहत पर और इसके अलावा और भी बहुत सी बातों पर निर्भर करता है, इसलिए हर आर्म एक अलग तरह के मरीज़ खोता है और सिक्के ने जो समूह बनाए थे, वे अब बचते ही नहीं।",
  "A trial reports that among patients who completed the full twelve months, the new drug halved relapses. A quarter of that arm withdrew before twelve months and are not counted.":
    "एक ट्रायल बताता है कि जिन मरीज़ों ने पूरे बारह महीने पूरे किए, उनमें नई दवा ने रिलैप्स आधे कर दिए। उस आर्म का एक चौथाई हिस्सा बारह महीने से पहले ही हट गया और उसे गिना नहीं गया।",
  "People usually withdraw for a reason, and relapsing is one of the commonest. An analysis of completers can turn the drug's failures into people who simply are not in the table.":
    "लोग आमतौर पर किसी वजह से हटते हैं, और रिलैप्स सबसे आम वजहों में से एक है। पूरा करने वालों का विश्लेषण दवा की विफलताओं को ऐसे लोगों में बदल देता है जो तालिका में हैं ही नहीं।",
  "Mothers of babies born with a heart defect are interviewed about what they took during pregnancy, alongside mothers of healthy babies. The mothers of affected babies report far more medicine use in the first trimester, and a report concludes the medicines are implicated.":
    "हृदय दोष के साथ जन्मे बच्चों की माताओं से पूछा जाता है कि उन्होंने गर्भावस्था के दौरान क्या लिया, और साथ में स्वस्थ बच्चों की माताओं से भी। प्रभावित बच्चों की माताएँ पहली तिमाही में कहीं अधिक दवा सेवन बताती हैं, और एक रिपोर्ट निष्कर्ष निकालती है कि इसमें दवाओं का हाथ है।",
  "One group has spent months being asked what went wrong and searching for it. The other has had no reason to think about the first trimester at all. The comparison is partly of what was taken and partly of how hard each group looked.":
    "एक समूह ने महीनों यह पूछे जाने और खोजने में बिताए हैं कि क्या ग़लत हुआ। दूसरे के पास पहली तिमाही के बारे में सोचने की कोई वजह ही नहीं रही। यह तुलना आंशिक रूप से इस बात की है कि क्या लिया गया और आंशिक रूप से इस बात की कि किस समूह ने कितना ज़ोर लगाकर खोजा।",
  "People with a brain tumour and people without are asked how many hours a week they used a mobile phone ten years ago, and on which side of the head. Those with a tumour report more hours, and more often on the side the tumour is on.":
    "ब्रेन ट्यूमर वाले और बिना ट्यूमर वाले लोगों से पूछा जाता है कि दस साल पहले वे हफ़्ते में कितने घंटे मोबाइल फ़ोन इस्तेमाल करते थे, और सिर के किस तरफ़। ट्यूमर वाले ज़्यादा घंटे बताते हैं, और अक्सर उसी तरफ़ जिस तरफ़ ट्यूमर है।",
  "Nobody can accurately recall a decade of phone habits, so the gap is filled in, and the tumour tells them which side to fill it in on. Billing records would settle it; memory cannot.":
    "एक दशक की फ़ोन आदतें कोई भी ठीक ठीक याद नहीं रख सकता, इसलिए खाली जगह भर दी जाती है, और ट्यूमर बता देता है कि किस तरफ़ भरनी है। बिलिंग रिकॉर्ड इसका फ़ैसला कर सकते हैं; याददाश्त नहीं कर सकती।",
  "After a bowel cancer diagnosis, patients are asked to describe their diet over the previous twenty years, and their answers are compared with those of healthy volunteers of the same age.":
    "आँत के कैंसर के निदान के बाद मरीज़ों से कहा जाता है कि वे पिछले बीस वर्षों के अपने खानपान का वर्णन करें, और उनके उत्तरों की तुलना उसी उम्र के स्वस्थ स्वयंसेवकों के उत्तरों से की जाती है।",
  "The patients have already been told which foods are suspected, and are reconstructing twenty years around a diagnosis. The volunteers are reconstructing twenty years around nothing in particular.":
    "मरीज़ों को पहले ही बताया जा चुका है कि किन खाद्य पदार्थों पर शक है, और वे बीस वर्षों को एक निदान के इर्द गिर्द दोबारा गढ़ रहे हैं। स्वयंसेवक बीस वर्षों को किसी ख़ास चीज़ के इर्द गिर्द नहीं गढ़ रहे।",
  "Workers making a compensation claim for back pain are asked how heavy their lifting used to be, and their answers are compared with those of colleagues who made no claim.":
    "कमर दर्द के लिए मुआवज़े का दावा करने वाले कामगारों से पूछा जाता है कि वे पहले कितना भारी वज़न उठाते थे, और उनके उत्तरों की तुलना उन सहकर्मियों के उत्तरों से की जाती है जिन्होंने कोई दावा नहीं किया।",
  "Both groups did the same job. Only one has spent months assembling an account of how demanding it was, and that account is what is being measured.":
    "दोनों समूहों ने वही काम किया। केवल एक ने महीनों यह ब्यौरा जोड़ने में बिताए हैं कि वह काम कितना कठिन था, और मापा वही ब्यौरा जा रहा है।",
  "A registry compares patients who received a transplant with those on the waiting list who did not, counting each patient's survival from the day they joined the list. The transplanted group lives far longer.":
    "एक रजिस्ट्री उन मरीज़ों की तुलना करती है जिनका ट्रांसप्लांट हुआ, उन मरीज़ों से जो प्रतीक्षा सूची में थे पर जिनका नहीं हुआ, और हर मरीज़ की उत्तरजीविता सूची में नाम आने के दिन से गिनी जाती है। ट्रांसप्लांट वाला समूह कहीं ज़्यादा जीता है।",
  "To be transplanted you must survive until an organ arrives, so everyone in that group is guaranteed to have lived from listing to surgery. Anyone who dies while waiting can only ever be in the other group.":
    "ट्रांसप्लांट पाने के लिए आपको अंग मिलने तक जीवित रहना ही पड़ता है, इसलिए उस समूह का हर व्यक्ति सूची में नाम आने से सर्जरी तक ज़रूर जीवित रहा। जो प्रतीक्षा करते हुए मर जाता है, वह हमेशा दूसरे समूह में ही रह सकता है।",
  "A hospital reports that patients who completed the full six-week rehabilitation course had better one-year survival than those who did not, measured from the day of admission.":
    "एक अस्पताल बताता है कि जिन मरीज़ों ने पूरा छह हफ़्ते का पुनर्वास कोर्स पूरा किया, उनकी एक वर्ष की उत्तरजीविता उनसे बेहतर थी जिन्होंने नहीं किया, और यह भर्ती के दिन से मापी गई।",
  "Completing six weeks requires being alive for six weeks. The comparison group collects everyone who died in the meantime, and the course is credited with those first six weeks of guaranteed survival.":
    "छह हफ़्ते पूरे करने के लिए छह हफ़्ते जीवित रहना ज़रूरी है। तुलना समूह में वे सब इकट्ठा हो जाते हैं जिनकी मृत्यु इस बीच हुई, और गारंटीशुदा उत्तरजीविता के वे पहले छह हफ़्ते कोर्स के खाते में चले जाते हैं।",
  "Using a prescription database, researchers classify each patient as a drug user if they were ever dispensed it during follow-up, and count follow-up from the date of their hospital discharge.":
    "प्रिस्क्रिप्शन डेटाबेस का उपयोग करते हुए शोधकर्ता हर मरीज़ को दवा का उपयोगकर्ता मानते हैं यदि उसे फ़ॉलो अप के दौरान कभी भी दवा मिली हो, और फ़ॉलो अप की गिनती अस्पताल से छुट्टी की तारीख़ से करते हैं।",
  "The classification uses the future. Time between discharge and the first dispensing cannot contain a death for anyone counted as a user, yet it is credited to the drug. Counting each patient as unexposed until their first prescription removes it.":
    "यह वर्गीकरण भविष्य की जानकारी इस्तेमाल करता है। उपयोगकर्ता गिने गए किसी भी व्यक्ति के लिए छुट्टी और पहली बार दवा मिलने के बीच के समय में मृत्यु हो ही नहीं सकती, फिर भी वह समय दवा के खाते में जाता है। हर मरीज़ को उसके पहले प्रिस्क्रिप्शन तक अनएक्सपोज़्ड गिनने से यह हट जाता है।",
  "An oncology paper reports that patients whose tumour responded to chemotherapy survived longer than non-responders, timing survival from the start of treatment. Response was assessed after three cycles.":
    "एक ऑन्कोलॉजी पेपर बताता है कि जिन मरीज़ों के ट्यूमर ने कीमोथेरेपी पर प्रतिक्रिया दी, वे प्रतिक्रिया न देने वालों से ज़्यादा जिए, और उत्तरजीविता इलाज शुरू होने से गिनी गई। प्रतिक्रिया का आकलन तीन साइकिल के बाद किया गया।",
  "You cannot be classed as a responder unless you live to the assessment after three cycles. Patients who die during the first two cycles are all non-responders by construction, so the responder group starts with survival built into it.":
    "आपको प्रतिक्रिया देने वालों में तभी गिना जा सकता है जब आप तीन साइकिल के बाद होने वाले आकलन तक जीवित रहें। पहले दो साइकिल के दौरान मरने वाले सभी मरीज़ बनावट से ही प्रतिक्रिया न देने वाले हो जाते हैं, इसलिए प्रतिक्रिया देने वाले समूह में उत्तरजीविता शुरू से ही जुड़ी होती है।",
  "A drug-safety study counts each patient as untreated from enrolment until the day of their first prescription, and as treated from that day onwards, so a patient can contribute time to both groups.":
    "एक दवा सुरक्षा अध्ययन हर मरीज़ को नामांकन से लेकर उसके पहले प्रिस्क्रिप्शन के दिन तक बिना इलाज वाला गिनता है, और उस दिन के बाद से इलाज पाया हुआ, इसलिए एक ही मरीज़ दोनों समूहों को समय दे सकता है।",
  "Nobody is credited to a group before they belong to it, so no stretch of guaranteed survival is handed to the treated group. This is the standard fix, correctly applied.":
    "किसी को उस समूह के खाते में तब तक नहीं डाला जाता जब तक वह उसका हिस्सा न बन जाए, इसलिए इलाज पाए समूह को गारंटीशुदा उत्तरजीविता की कोई अवधि नहीं सौंपी जाती। यही मानक समाधान है, और यहाँ इसे सही ढंग से लगाया गया है।",
  "A study of patients who completed a course of treatment starts everyone's clock at the end of the course, and excludes anyone who died before that point from both groups alike.":
    "इलाज का कोर्स पूरा करने वाले मरीज़ों का एक अध्ययन सबकी घड़ी कोर्स के अंत से शुरू करता है, और उस बिंदु से पहले मरने वाले हर व्यक्ति को दोनों समूहों से समान रूप से बाहर रखता है।",
  "Starting the clock after the point where group membership was settled means neither group can be credited with survival it was guaranteed. It costs some early data, and it removes the head start.":
    "घड़ी उस बिंदु के बाद शुरू करना जहाँ समूह की सदस्यता तय हो चुकी थी, इसका अर्थ है कि किसी भी समूह के खाते में वह उत्तरजीविता नहीं जा सकती जो उसे पहले से मिली हुई थी। इसमें शुरुआती कुछ आँकड़े गँवाने पड़ते हैं, और यह छिपी बढ़त हटा देता है।",
  "A study of a drug taken in pregnancy takes the exposure from the national prescription database rather than from interviews, then compares outcomes. Neither the mothers nor the researchers supplied the exposure data.":
    "गर्भावस्था में ली गई दवा का एक अध्ययन एक्सपोज़र साक्षात्कारों के बजाय राष्ट्रीय प्रिस्क्रिप्शन डेटाबेस से लेता है, फिर परिणामों की तुलना करता है। एक्सपोज़र का डेटा न माताओं ने दिया और न शोधकर्ताओं ने।",
  "The exposure was written down before anyone knew the outcome, by someone with no stake in it. That is the standard defence against memory bending, and here it was used.":
    "एक्सपोज़र परिणाम पता चलने से पहले ही दर्ज हो चुका था, और उसे दर्ज करने वाले का उसमें कोई हित नहीं था। याददाश्त के मुड़ जाने के विरुद्ध यही मानक बचाव है, और यहाँ इसका उपयोग किया गया।",
  "A case-control study asks about the suspected exposure and also about a second, unrelated one that nobody associates with the disease. Both groups report the second one at the same rate, and the authors say so before reporting the first.":
    "एक केस कंट्रोल अध्ययन संदिग्ध एक्सपोज़र के बारे में पूछता है और साथ ही एक दूसरे, असंबंधित एक्सपोज़र के बारे में भी, जिसे कोई इस बीमारी से नहीं जोड़ता। दोनों समूह दूसरे एक्सपोज़र को एक ही दर पर बताते हैं, और लेखक पहले वाले का परिणाम बताने से पहले यह बात कहते हैं।",
  "The second question is a control for the searching itself. If one group were simply remembering harder across the board, it would show up there too, and it did not.":
    "दूसरा प्रश्न स्वयं इस खोजने की प्रवृत्ति के लिए एक कंट्रोल है। यदि कोई एक समूह हर बात को ज़्यादा ज़ोर लगाकर याद कर रहा होता, तो वह वहाँ भी दिखता, और वहाँ नहीं दिखा।",
  "A trial's main result counts every patient in the group they were randomly assigned to, including the 40 who never started the treatment. A per-protocol analysis is reported alongside it, agrees with it, and is labelled as secondary.":
    "एक ट्रायल का मुख्य परिणाम हर मरीज़ को उसी समूह में गिनता है जिसमें उसे रैंडम तरीक़े से सौंपा गया था, उन 40 को भी जिन्होंने इलाज शुरू ही नहीं किया। साथ में एक पर प्रोटोकॉल विश्लेषण भी दिया गया है, जो उससे सहमत है और जिसे गौण बताया गया है।",
  "The randomised comparison is the one the conclusion rests on, the other is shown for completeness, and the two agree. That is how both analyses are supposed to be used.":
    "निष्कर्ष रैंडमाइज़्ड तुलना पर टिका है, दूसरा विश्लेषण पूर्णता के लिए दिखाया गया है, और दोनों सहमत हैं। दोनों विश्लेषणों का उपयोग इसी तरह किया जाना चाहिए।",
  "A trial testing whether a simpler regimen is no worse than the standard one reports both analyses, notes that counting non-adherent patients in their assigned group tends to make two treatments look alike, and declines to claim non-inferiority because only one of the two analyses supports it.":
    "एक ट्रायल यह जाँच रहा है कि क्या कोई सरल रेजिमेन मानक रेजिमेन से बदतर नहीं है; वह दोनों विश्लेषण बताता है, यह भी नोट करता है कि प्रोटोकॉल न मानने वाले मरीज़ों को उनके सौंपे गए समूह में गिनने से दोनों इलाज एक जैसे दिखने लगते हैं, और नॉन इन्फ़ीरियोरिटी का दावा करने से इनकार करता है क्योंकि दोनों में से केवल एक विश्लेषण उसका समर्थन करता है।",
  "Counting everyone as assigned is conservative when you are trying to show a difference and permissive when you are trying to show similarity, so a non-inferiority claim needs both analyses to agree. Refusing to claim it when they disagree is the careful move, not the trap.":
    "जब आप कोई अंतर दिखाना चाहते हैं तब सबको सौंपे गए समूह में गिनना रूढ़िवादी होता है, और जब आप समानता दिखाना चाहते हैं तब यह ढीला पड़ जाता है, इसलिए नॉन इन्फ़ीरियोरिटी के दावे के लिए दोनों विश्लेषणों का सहमत होना ज़रूरी है। जब वे असहमत हों तब दावा करने से इनकार कर देना सावधानी है, जाल नहीं।",
};
