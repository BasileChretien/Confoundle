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
};
