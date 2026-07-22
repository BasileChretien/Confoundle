import type { LocalizedText } from "../puzzles/schema";

/**
 * Static UI-frame strings (chrome that isn't owned by a puzzle), keyed by locale
 * like every other string. Drafted for the launch language set; unverified
 * locales are corrected on feedback. Anything missing falls back to English.
 */
export const UI: Record<string, LocalizedText> = {
  footer: {
    en: "No accounts, no tracking, just the reasoning",
    fr: "Pas de compte, pas de suivi, juste le raisonnement",
    es: "Sin cuentas, sin rastreo, solo el razonamiento",
    pt: "Sem contas, sem rastreamento, apenas o raciocínio",
    ja: "アカウントなし、追跡なし、ただ推論だけ",
    zh: "无需账户，无追踪，只讲推理",
    ru: "Без аккаунтов, без слежки, только рассуждение",
    hi: "कोई खाता नहीं, कोई ट्रैकिंग नहीं, बस तर्क",
    bn: "কোনো অ্যাকাউন্ট নেই, কোনো ট্র্যাকিং নেই, শুধুই যুক্তি",
    ar: "بلا حسابات، بلا تتبّع، مجرّد تفكير منطقي",
  },
  daily: {
    en: "Daily",
    fr: "Quotidien",
    es: "Diario",
    pt: "Diário",
    ja: "毎日",
    zh: "每日",
    ru: "Ежедневно",
    hi: "रोज़ाना",
    bn: "প্রতিদিন",
    ar: "يومي",
  },
  reasoning: {
    en: "reasoning",
    fr: "raisonnement",
    es: "razonamiento",
    pt: "raciocínio",
    ja: "推論",
    zh: "推理",
    ru: "рассуждение",
    hi: "तर्क",
    bn: "যুক্তি",
    ar: "تفكير منطقي",
  },
  playedToday: {
    en: "Played today",
    fr: "Joué aujourd'hui",
    es: "Jugado hoy",
    pt: "Jogado hoje",
    ja: "本日プレイ済み",
    zh: "今天已玩",
    ru: "Сыграно сегодня",
    hi: "आज खेला",
    bn: "আজ খেলা হয়েছে",
    ar: "لعبت اليوم",
  },
  language: {
    en: "Language",
    fr: "Langue",
    es: "Idioma",
    pt: "Idioma",
    ja: "言語",
    zh: "语言",
    ru: "Язык",
    hi: "भाषा",
    bn: "ভাষা",
    ar: "اللغة",
  },
};
