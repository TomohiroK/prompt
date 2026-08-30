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
  /** 画面の見出しに出す名前 */
  title: string;
  /**
   * 検索結果に出すタイトル。省略時は title を使う。
   *
   * ゲーム名が、その言語では別のものを指してしまう場合にだけ書く。
   * 例: 日本語の「数字当てゲーム」はヒット&ブロー／ヌメロンの語で、
   * このゲームの中身とは別物。上位に来ても検索者の期待と食い違う。
   * 名前を変えずに、検索向けの見出しだけ実態に寄せる。
   */
  seoTitle?: string;
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
  /**
   * 目安プレイ時間（分）。構造化データの timeRequired に使う。
   *
   * 各言語の content.playtime は、この数値を言語ごとの書き方で表示したもの
   * （「20〜40分」「20-40 min」「20~40분」…）。数値は言語に依らないので
   * ここに1つだけ持ち、表示用の文字列と二重に管理しない。
   * 両者がずれていないことはブラウザ検証で確認している。
   */
  playtimeMinutes: { min: number; max: number };
  /**
   * 本文の更新日（YYYY-MM-DD）。sitemap.xml の lastModified に使う。
   *
   * 「読み手にとって中身が変わった日」を書く。型の追加やリファクタでは変えない。
   * ビルド時刻を入れると、デプロイのたびに全URLが更新されたことになり、
   * 更新の合図として意味を失う。
   */
  updatedAt: string;
  /** 言語ごとの本文。全対応言語を必ず埋める */
  content: Record<Locale, GameContent>;
};
