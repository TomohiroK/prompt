import type { Locale } from "@/lib/i18n";

/**
 * 章見出しに添える欧文ラベル。翻訳せず記号として全言語で共通に使う。
 */
export const latinLabels = {
  howTo: "HOW TO USE",
  games: "GAMES",
} as const;

/**
 * キービジュアルの補足1行。
 * このサイトが何をするものかを、装飾なしで言い切る。
 */
export const heroSub: Record<Locale, string> = {
  ja: "AIチャットに貼るだけで、AIがゲーム相手になります。",
  en: "Paste it into an AI chat and the AI becomes your opponent.",
  ko: "AI 채팅에 붙여넣기만 하면, AI가 게임 상대가 됩니다.",
  zh: "粘贴到 AI 聊天，AI 就成了你的对手。",
  es: "Pégalo en un chat de IA y la IA se convierte en tu rival.",
  pt: "Cole num chat de IA e a IA vira seu adversário.",
};
