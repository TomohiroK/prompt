import type { Locale } from "@/lib/i18n";

/** ゲームの分類。追加する場合は categoryLabels も併せて更新する。 */
export type GameCategory =
  | "reasoning"
  | "hidden-role"
  | "adventure"
  | "simulation"
  | "party";

/** 難易度 */
export type Difficulty = "easy" | "normal" | "hard";

export const categoryLabels: Record<Locale, Record<GameCategory, string>> = {
  ja: {
    reasoning: "推理",
    "hidden-role": "正体隠匿",
    adventure: "アドベンチャー",
    simulation: "シミュレーション",
    party: "パーティ",
  },
  en: {
    reasoning: "Deduction",
    "hidden-role": "Hidden role",
    adventure: "Adventure",
    simulation: "Simulation",
    party: "Party",
  },
  ko: {
    reasoning: "추리",
    "hidden-role": "정체 은닉",
    adventure: "어드벤처",
    simulation: "시뮬레이션",
    party: "파티",
  },
  zh: {
    reasoning: "推理",
    "hidden-role": "身份隐藏",
    adventure: "冒险",
    simulation: "模拟经营",
    party: "聚会",
  },
  es: {
    reasoning: "Deducción",
    "hidden-role": "Rol oculto",
    adventure: "Aventura",
    simulation: "Simulación",
    party: "Fiesta",
  },
  pt: {
    reasoning: "Dedução",
    "hidden-role": "Papel oculto",
    adventure: "Aventura",
    simulation: "Simulação",
    party: "Festa",
  },
};

export const difficultyLabels: Record<Locale, Record<Difficulty, string>> = {
  ja: { easy: "かんたん", normal: "ふつう", hard: "むずかしい" },
  en: { easy: "Easy", normal: "Normal", hard: "Hard" },
  ko: { easy: "쉬움", normal: "보통", hard: "어려움" },
  zh: { easy: "简单", normal: "普通", hard: "困难" },
  es: { easy: "Fácil", normal: "Normal", hard: "Difícil" },
  pt: { easy: "Fácil", normal: "Normal", hard: "Difícil" },
};

/** 1言語分のゲーム情報 */
export type GameContent = {
  title: string;
  /** カード等に出す1行キャッチ */
  tagline: string;
  /** 2〜3文の紹介 */
  description: string;
  /** 目安プレイ時間 */
  playtime: string;
  /** 想定人数 */
  players: string;
  /** 遊び方の手順 */
  howToPlay: string[];
  /** 攻略・楽しみ方のコツ */
  tips: string[];
  /** AI にそのまま貼り付けるプロンプト本文 */
  prompt: string;
};

export type Game = {
  /** URL に使う識別子。/{locale}/games/{slug} */
  slug: string;
  category: GameCategory;
  difficulty: Difficulty;
  /** 言語ごとの本文。全対応言語を必ず埋める */
  content: Record<Locale, GameContent>;
};
