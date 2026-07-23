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
};
