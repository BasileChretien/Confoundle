/**
 * The reminder email's words, in the ten languages the app speaks.
 *
 * Carried here as a small inline table rather than read from the app's
 * dictionaries, for a hard reason: this text is rendered by a scheduled Worker,
 * and importing `translations/all.ts` would pull roughly 900 KB of puzzle prose
 * into a bundle with a 1 MiB ceiling, to render seven short lines. The same
 * argument that moved the lesson pages out of a Pages Function applies here.
 *
 * Plain text, like the sign-in code email. It renders everywhere, it cannot
 * carry a tracking pixel, and there is nothing here that wants styling.
 *
 * Every line is written to survive any value of `count`, so no sentence may
 * depend on singular or plural agreement. "Reviews ready: 1" is fine in all ten
 * languages; "You have 1 reviews" is not, and getting that right in Russian and
 * Arabic is not worth the machinery when the colon form reads perfectly well.
 */

export type ReminderStrings = {
  subject: string;
  ready: string;
  why: string;
  open: string;
  patient: string;
  cadence: string;
  stop: string;
  /** The three below belong to the unsubscribe page the link opens. */
  stopTitle: string;
  stopConfirm: string;
  stopDone: string;
};

export const REMINDER_TEXT: Record<string, ReminderStrings> = {
  en: {
    subject: "Your Confoundle reviews are waiting",
    ready: "Reviews ready",
    why: "You asked to be told when your reviews fall behind. These ones have.",
    open: "Pick them up here:",
    patient:
      "Being late costs you nothing. A skill only moves when you actually answer, so the schedule waits for you rather than punishing you.",
    cadence: "One email a day at most, and only when something is overdue.",
    stop: "Stop these emails:",
    stopTitle: "Stop the reminder emails",
    stopConfirm: "Yes, stop these emails",
    stopDone:
      "Done. No more reminder emails will be sent. Your account and your reviews are untouched.",
  },
  fr: {
    subject: "Vos révisions Confoundle vous attendent",
    ready: "Révisions prêtes",
    why: "Vous avez demandé à être prévenu quand vos révisions prennent du retard. C'est le cas.",
    open: "Reprenez-les ici :",
    patient:
      "Le retard ne vous coûte rien. Une compétence ne bouge que lorsque vous répondez vraiment, donc le calendrier vous attend au lieu de vous pénaliser.",
    cadence:
      "Un e-mail par jour au maximum, et uniquement en cas de retard.",
    stop: "Ne plus recevoir ces e-mails :",
    stopTitle: "Arrêter les e-mails de rappel",
    stopConfirm: "Oui, arrêter ces e-mails",
    stopDone:
      "C'est fait. Plus aucun e-mail de rappel ne sera envoyé. Votre compte et vos révisions ne sont pas modifiés.",
  },
  es: {
    subject: "Tus repasos de Confoundle te esperan",
    ready: "Repasos listos",
    why: "Pediste que te avisáramos cuando tus repasos se retrasaran. Se han retrasado.",
    open: "Retómalos aquí:",
    patient:
      "Llegar tarde no te cuesta nada. Una habilidad solo se mueve cuando respondes de verdad, así que el calendario te espera en lugar de penalizarte.",
    cadence: "Un correo al día como máximo, y solo si hay algo atrasado.",
    stop: "Dejar de recibir estos correos:",
    stopTitle: "Dejar de recibir los recordatorios",
    stopConfirm: "Sí, dejar de recibirlos",
    stopDone:
      "Hecho. No se enviarán más correos de recordatorio. Tu cuenta y tus repasos quedan intactos.",
  },
  pt: {
    subject: "As suas revisões do Confoundle estão à espera",
    ready: "Revisões prontas",
    why: "Pediu para ser avisado quando as suas revisões ficassem atrasadas. Ficaram.",
    open: "Retome-as aqui:",
    patient:
      "O atraso não lhe custa nada. Uma competência só se move quando responde de facto, por isso o calendário espera por si em vez de o penalizar.",
    cadence: "No máximo um e-mail por dia, e só quando houver atraso.",
    stop: "Deixar de receber estes e-mails:",
    stopTitle: "Parar os e-mails de lembrete",
    stopConfirm: "Sim, parar estes e-mails",
    stopDone:
      "Feito. Não serão enviados mais e-mails de lembrete. A sua conta e as suas revisões ficam intactas.",
  },
  ja: {
    subject: "Confoundle の復習が待っています",
    ready: "復習の件数",
    why: "復習が遅れたら知らせてほしい、というご希望でした。遅れています。",
    open: "ここから再開できます:",
    patient:
      "遅れても失うものはありません。実際に答えたときにだけ習熟度は動くので、スケジュールは罰を与えるのではなく待っています。",
    cadence: "メールは1日1通まで、遅れているときだけお送りします。",
    stop: "配信を停止する:",
    stopTitle: "リマインダーメールを停止する",
    stopConfirm: "はい、停止します",
    stopDone:
      "完了しました。今後リマインダーメールは送信されません。アカウントと復習データはそのままです。",
  },
  zh: {
    subject: "你的 Confoundle 复习正在等你",
    ready: "待复习数量",
    why: "你要求在复习落后时收到提醒。现在落后了。",
    open: "从这里继续:",
    patient:
      "迟到不会让你损失什么。只有真正作答时技能等级才会变化，所以计划表只是在等你，而不是惩罚你。",
    cadence: "每天最多一封邮件，且仅在有逾期内容时发送。",
    stop: "停止接收这些邮件:",
    stopTitle: "停止提醒邮件",
    stopConfirm: "是的，停止发送",
    stopDone:
      "已完成。今后不会再发送提醒邮件。你的账户和复习进度不受影响。",
  },
  ru: {
    subject: "Ваши повторения в Confoundle ждут",
    ready: "Готово к повторению",
    why: "Вы просили сообщать, когда повторения начнут отставать. Это произошло.",
    open: "Продолжить здесь:",
    patient:
      "Опоздание ничего вам не стоит. Уровень навыка меняется только тогда, когда вы действительно отвечаете, поэтому расписание ждёт вас, а не наказывает.",
    cadence:
      "Не более одного письма в день и только при наличии просроченного.",
    stop: "Отписаться от этих писем:",
    stopTitle: "Отключить письма-напоминания",
    stopConfirm: "Да, отключить эти письма",
    stopDone:
      "Готово. Письма-напоминания больше не будут приходить. Ваш аккаунт и повторения не затронуты.",
  },
  hi: {
    subject: "आपके Confoundle रिवीज़न इंतज़ार कर रहे हैं",
    ready: "रिवीज़न तैयार",
    why: "आपने कहा था कि रिवीज़न पिछड़ने पर आपको बताया जाए। वे पिछड़ गए हैं।",
    open: "यहाँ से जारी रखें:",
    patient:
      "देर होने से आपका कुछ नहीं जाता। कौशल तभी बदलता है जब आप वास्तव में उत्तर देते हैं, इसलिए समय-सारणी आपको दंड नहीं देती, आपका इंतज़ार करती है।",
    cadence: "दिन में अधिकतम एक ई-मेल, और केवल तभी जब कुछ बकाया हो।",
    stop: "ये ई-मेल बंद करें:",
    stopTitle: "रिमाइंडर ई-मेल बंद करें",
    stopConfirm: "हाँ, ये ई-मेल बंद करें",
    stopDone:
      "हो गया। अब कोई रिमाइंडर ई-मेल नहीं भेजा जाएगा। आपका खाता और रिवीज़न अछूते हैं।",
  },
  bn: {
    subject: "আপনার Confoundle পুনরাবৃত্তি অপেক্ষা করছে",
    ready: "পুনরাবৃত্তি প্রস্তুত",
    why: "পুনরাবৃত্তি পিছিয়ে পড়লে জানাতে বলেছিলেন। সেগুলি পিছিয়ে পড়েছে।",
    open: "এখান থেকে চালিয়ে যান:",
    patient:
      "দেরি হলে আপনার কিছুই হারায় না। আপনি সত্যিই উত্তর দিলে তবেই দক্ষতার স্তর বদলায়, তাই সময়সূচি শাস্তি না দিয়ে আপনার জন্য অপেক্ষা করে।",
    cadence: "দিনে সর্বোচ্চ একটি ই-মেল, এবং কেবল কিছু বকেয়া থাকলেই।",
    stop: "এই ই-মেলগুলি বন্ধ করুন:",
    stopTitle: "অনুস্মারক ই-মেল বন্ধ করুন",
    stopConfirm: "হ্যাঁ, এই ই-মেলগুলি বন্ধ করুন",
    stopDone:
      "সম্পন্ন। আর কোনো অনুস্মারক ই-মেল পাঠানো হবে না। আপনার অ্যাকাউন্ট ও পুনরাবৃত্তি অপরিবর্তিত থাকবে।",
  },
  ar: {
    subject: "مراجعاتك في Confoundle في انتظارك",
    ready: "مراجعات جاهزة",
    why: "طلبت أن نخبرك عندما تتأخر مراجعاتك. وقد تأخرت.",
    open: "تابع من هنا:",
    patient:
      "التأخر لا يكلفك شيئًا. لا تتغير درجة المهارة إلا عندما تجيب فعلًا، لذا فالجدول ينتظرك ولا يعاقبك.",
    cadence: "رسالة واحدة يوميًا على الأكثر، وفقط عند وجود متأخرات.",
    stop: "إيقاف هذه الرسائل:",
    stopTitle: "إيقاف رسائل التذكير",
    stopConfirm: "نعم، أوقف هذه الرسائل",
    stopDone:
      "تم. لن تُرسل أي رسائل تذكير بعد الآن. حسابك ومراجعاتك لم تتغيّر.",
  },
};

/**
 * Falls back to English for anything unrecognised, which is the same rule the
 * app's own `translate()` uses. A stored locale can outlive the language it
 * names if LOCALES ever changes, so this must never throw.
 */
export function reminderStrings(locale: string): ReminderStrings {
  return REMINDER_TEXT[locale] ?? REMINDER_TEXT.en;
}

export interface ReminderEmailInput {
  locale: string;
  /** How many skills are overdue. Never rendered into a plural-sensitive phrase. */
  count: number;
  /** Absolute origin, no trailing slash. */
  origin: string;
  /** The full unsubscribe URL, token included. */
  unsubscribeUrl: string;
}

export function reminderEmail(input: ReminderEmailInput): {
  subject: string;
  text: string;
} {
  const t = reminderStrings(input.locale);
  return {
    subject: t.subject,
    text: [
      `${t.ready}: ${input.count}`,
      "",
      t.why,
      "",
      `${t.open} ${input.origin}/?review=1`,
      "",
      t.patient,
      "",
      "---",
      t.cadence,
      `${t.stop} ${input.unsubscribeUrl}`,
    ].join("\n"),
  };
}
