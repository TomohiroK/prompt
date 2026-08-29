import type { Locale } from "@/lib/i18n";

/**
 * 誌面としての文言。UI文言（content/ui.ts）とは役割が違うため分けている。
 * rail は縦組みの柱に流す短い一行、pickLine は一覧の入口に置く一行。
 * いずれも「説明」ではなく「呼びかけ」として書く。
 */
export type EditorialStrings = { rail: string; pickLine: string };

export const editorial: Record<Locale, EditorialStrings> = {
  ja: {
    rail: "貼るだけで、はじまる。",
    pickLine: "今日の一本を選ぶ。",
  },
  en: {
    rail: "Paste it. Play it.",
    pickLine: "Pick tonight's one.",
  },
  ko: {
    rail: "붙여넣으면, 시작된다.",
    pickLine: "오늘의 한 편을 고르다.",
  },
  zh: {
    rail: "贴上去，就开始。",
    pickLine: "挑一款，今晚就玩。",
  },
  es: {
    rail: "Pégalo. Y empieza.",
    pickLine: "Elige la de hoy.",
  },
  pt: {
    rail: "Cole. E comece.",
    pickLine: "Escolha a de hoje.",
  },
};

/**
 * 欧文の小見出し。誌面の柱として全言語共通で使う。
 * 翻訳せず記号として扱うことで、どの言語でも同じ版面の骨格になる。
 */
export const latinLabels = {
  issue: "ISSUE 01",
  howTo: "HOW TO PLAY",
  games: "GAME INDEX",
  prompt: "THE PROMPT",
  steps: "THE RULES",
  tips: "FIELD NOTES",
  others: "ALSO IN THIS ISSUE",
  ticker: "COPY / PASTE / PLAY",
  credit: "PROMPT ARCADE — PRINTED FOR SCREENS",
} as const;
