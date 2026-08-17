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
    en: "You have just read this one's answer, so it can no longer catch you. Today's puzzle shows you the figures first and asks you to commit before the reveal.",
    fr: "Vous venez de lire la réponse de celle-ci : elle ne peut plus vous piéger. L'énigme du jour vous montre d'abord les chiffres et vous demande de vous engager avant la révélation.",
    es: "Acabas de leer la respuesta de este, así que ya no puede pillarte. El puzle de hoy te muestra primero las cifras y te pide que te decidas antes de la revelación.",
    pt: "Você acabou de ler a resposta deste, por isso ele já não consegue apanhá-lo. O desafio de hoje mostra primeiro os números e pede que você se decida antes da revelação.",
    ja: "この問題の答えはいま読んだばかりなので、もうあなたを引っかけられません。今日のパズルなら、数字を先に見せて、種明かしの前に答えを決めてもらいます。",
    zh: "你刚刚读过这一题的答案，它已经骗不到你了。今天的谜题会先给你看数字，并要求你在揭晓之前先作答。",
    ru: "Вы только что прочли ответ на эту, так что поймать вас она уже не может. Сегодняшняя головоломка сначала показывает цифры и просит выбрать ответ до разгадки.",
    hi: "आपने अभी इसका जवाब पढ़ लिया है, इसलिए अब यह आपको नहीं फँसा सकती। आज की पहेली पहले आंकड़े दिखाती है और खुलासे से पहले आपसे जवाब तय करने को कहती है।",
    bn: "আপনি এইমাত্র এটির উত্তর পড়ে ফেলেছেন, তাই এটি আর আপনাকে ধরতে পারবে না। আজকের ধাঁধা আগে সংখ্যাগুলো দেখায় এবং উন্মোচনের আগে আপনাকে উত্তরে স্থির হতে বলে।",
    ar: "لقد قرأت للتو إجابة هذا اللغز، فلم يعد بوسعه أن يوقعك. أما لغز اليوم فيعرض عليك الأرقام أولًا، ويطلب منك أن تلتزم بإجابة قبل الكشف.",
  },
  /** The button itself. */
  play: {
    en: "Play today's puzzle",
    fr: "Jouer l'énigme du jour",
    es: "Jugar el puzle de hoy",
    pt: "Jogar o desafio de hoje",
    ja: "今日のパズルに挑戦",
    zh: "来玩今天的谜题",
    ru: "Играть в сегодняшнюю головоломку",
    hi: "आज की पहेली खेलें",
    bn: "আজকের ধাঁধা খেলুন",
    ar: "العب لغز اليوم",
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
