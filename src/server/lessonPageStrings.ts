import type { LocalizedText } from "../puzzles/schema";

/**
 * The lesson page's own chrome, in the ten languages the app speaks.
 *
 * These used to be written inline at the call site as `t({ en: "The rule" })`,
 * which looks like every other localized string in the project and is not one.
 * The resolver those calls receive looks the English text up in that locale's
 * dictionary, and the dictionaries are populated only from puzzles, test items
 * and tags, so no heading on this page was ever in one. The result shipped
 * quietly for as long as the pages have existed: 342 pages whose prose was
 * correctly translated and whose headings said "The rule", "Why it works" and
 * "Source" in English above it. Nothing failed, because a dictionary miss falls
 * back to English by design, which is exactly what makes this class of bug
 * invisible.
 *
 * An inline locale key wins over the dictionary in both resolvers (`translate`
 * in app/i18n and the copy of its rules in prerender.ts), so filling every
 * locale in here fixes the pages without touching either one.
 *
 * Kept in its own module beside `lessonPage.ts` rather than in `app/ui.ts`, for
 * the same reason `reminderEmail.ts` keeps its own table: `lessonPath` is
 * imported by the app for the share control, so anything sitting in
 * `lessonPage.ts` is one careless import away from the client bundle, and
 * `app/ui.ts` is a thousand lines of strings this page does not use.
 *
 * `lessonPageStrings.test.ts` holds it to all ten locales. Do not add a key
 * without translating it, because English is what the failure looks like.
 */
export const LESSON_PAGE = {
  /** The eyebrow, which reads "Confoundle · a reasoning trap". */
  eyebrow: {
    en: "a reasoning trap",
    fr: "un piège de raisonnement",
    es: "una trampa de razonamiento",
    pt: "uma armadilha de raciocínio",
    ja: "推論の罠",
    zh: "一个推理陷阱",
    ru: "ловушка мышления",
    hi: "तर्क का एक जाल",
    bn: "যুক্তির একটি ফাঁদ",
    ar: "فخ في التفكير",
  },
  /** Over the takeaway, which is the one line worth carrying away. */
  rule: {
    en: "The rule",
    fr: "La règle",
    es: "La regla",
    pt: "A regra",
    ja: "原則",
    zh: "规则",
    ru: "Правило",
    hi: "नियम",
    bn: "নিয়ম",
    ar: "القاعدة",
  },
  /** Over the pair of claims: how it was put, then what was actually there. */
  looksLike: {
    en: "What it looks like",
    fr: "À quoi ça ressemble",
    es: "Qué aspecto tiene",
    pt: "Com o que se parece",
    ja: "実際の見え方",
    zh: "它是什么样子",
    ru: "Как это выглядит",
    hi: "यह कैसा दिखता है",
    bn: "এটা দেখতে কেমন",
    ar: "كيف يبدو ذلك",
  },
  /** Over the mechanism, on the puzzles that explain one. */
  whyItWorks: {
    en: "Why it works",
    fr: "Pourquoi ça marche",
    es: "Por qué funciona",
    pt: "Por que funciona",
    ja: "なぜ効くのか",
    zh: "它为什么奏效",
    ru: "Почему это работает",
    hi: "यह क्यों काम करता है",
    bn: "কেন এটা কাজ করে",
    ar: "لماذا تنجح الخدعة",
  },
  /**
   * The provenance heading. This one string does have a dictionary entry in all
   * nine languages, added by hand for the lesson screen, so it was the only
   * heading on the page rendering correctly. It is repeated here anyway: an
   * entry no test walks is a translation that survives by luck, and the words
   * are the ones the dictionaries already use so nothing changes on screen.
   */
  source: {
    en: "Source",
    fr: "Source",
    es: "Fuente",
    pt: "Fonte",
    ja: "出典",
    zh: "来源",
    ru: "Источник",
    hi: "स्रोत",
    bn: "উৎস",
    ar: "المصدر",
  },
  /** Over the way back into the game, for a reader who arrived from a debate. */
  tryIt: {
    en: "See if it fools you",
    fr: "Voyez si ça vous piège",
    es: "Comprueba si te engaña",
    pt: "Veja se isto o engana",
    ja: "あなたも騙されるか試す",
    zh: "看看它能不能骗到你",
    ru: "Проверьте, обманет ли вас",
    hi: "देखें कि यह आपको धोखा देता है या नहीं",
    bn: "দেখুন এটা আপনাকে ঠকাতে পারে কি না",
    ar: "جرّب إن كانت ستخدعك",
  },
  /**
   * The warning. The page opens on the answer on purpose, and somebody who
   * would rather have been tested deserves to be told before they click.
   */
  spoiler: {
    en: "This page gives the answer away. The puzzle version shows you the same figures first and asks you to commit before the reveal.",
    fr: "Cette page donne la réponse. La version énigme vous montre d'abord les mêmes chiffres et vous demande de vous engager avant la révélation.",
    es: "Esta página revela la respuesta. La versión en puzle te muestra primero las mismas cifras y te pide que te decidas antes de la revelación.",
    pt: "Esta página entrega a resposta. A versão em desafio mostra primeiro os mesmos números e pede que você se decida antes da revelação.",
    ja: "このページは答えを明かしています。パズル版では、同じ数字を先に見せて、種明かしの前に答えを決めてもらいます。",
    zh: "本页直接给出了答案。谜题版会先给你看同样的数字，并要求你在揭晓之前先作答。",
    ru: "Эта страница сразу даёт ответ. В версии-головоломке те же цифры показывают сначала и просят выбрать ответ до разгадки.",
    hi: "यह पेज जवाब पहले ही बता देता है। पहेली वाला रूप पहले वही आंकड़े दिखाता है और खुलासे से पहले आपसे जवाब तय करने को कहता है।",
    bn: "এই পাতাটি উত্তর আগেই বলে দেয়। ধাঁধার সংস্করণে একই সংখ্যাগুলো আগে দেখানো হয় এবং উন্মোচনের আগে আপনাকে উত্তরে স্থির হতে বলা হয়।",
    ar: "هذه الصفحة تكشف الإجابة. أما نسخة اللغز فتعرض عليك الأرقام نفسها أولًا، وتطلب منك أن تلتزم بإجابة قبل الكشف.",
  },
  /** The button itself. */
  play: {
    en: "Play this one",
    fr: "Jouer cette énigme",
    es: "Jugar este puzle",
    pt: "Jogar este desafio",
    ja: "この問題に挑戦",
    zh: "来玩这一题",
    ru: "Играть в эту головоломку",
    hi: "यह पहेली खेलें",
    bn: "এই ধাঁধাটি খেলুন",
    ar: "العب هذا اللغز",
  },
  /**
   * The footer promise. Worded to match `UI.footer` in app/ui.ts, which was
   * rewritten twice to stop promising more than the code delivers: no ads and
   * no profiles is the part that has stayed true throughout.
   */
  free: {
    en: "Confoundle is free. No ads, no profiles.",
    fr: "Confoundle est gratuit. Pas de publicité, pas de profilage.",
    es: "Confoundle es gratis. Sin anuncios, sin perfiles.",
    pt: "O Confoundle é gratuito. Sem anúncios, sem perfis.",
    ja: "Confoundle は無料です。広告なし、プロファイリングなし。",
    zh: "Confoundle 是免费的。无广告，无用户画像。",
    ru: "Confoundle бесплатен. Без рекламы и профилирования.",
    hi: "Confoundle मुफ़्त है। कोई विज्ञापन नहीं, कोई प्रोफ़ाइल नहीं।",
    bn: "Confoundle বিনামূল্যের। কোনো বিজ্ঞাপন নেই, কোনো প্রোফাইল নেই।",
    ar: "Confoundle مجاني. بلا إعلانات ولا ملفات تعريف.",
  },
  /** The footer's link home. */
  everyDay: {
    en: "A new puzzle every day",
    fr: "Une nouvelle énigme chaque jour",
    es: "Un puzle nuevo cada día",
    pt: "Um novo desafio todos os dias",
    ja: "毎日、新しいパズルを",
    zh: "每天一道新谜题",
    ru: "Новая головоломка каждый день",
    hi: "हर दिन एक नई पहेली",
    bn: "প্রতিদিন একটি নতুন ধাঁধা",
    ar: "لغز جديد كل يوم",
  },
} satisfies Record<string, LocalizedText>;
