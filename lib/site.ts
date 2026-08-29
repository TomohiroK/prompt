/**
 * サイト全体で使う定数。
 * 名称・キャッチコピー・URL を変える場合はこのファイルだけを書き換える。
 * （仮説検証のたびにコンポーネントを書き換えない設計）
 */
export const site = {
  name: "Prompt Arcade",
  nameJa: "プロンプトアーケード",
  tagline: "コピーして貼るだけ。AIとゲームで遊ぶ。",
  description:
    "ChatGPT・Claude・Gemini にそのまま貼り付けて遊べる「ゲームになるプロンプト」を集めたサイト。ワンクリックでコピーして、AIとの対話をそのままゲームに変えられます。",
  url: "https://prompt-arcade.vercel.app",
  locale: "ja_JP",
  author: "TomohiroK",
} as const;

/** コピー後に貼り付ける先の候補。増減はこの配列だけで完結する。 */
export const chatServices = [
  { name: "ChatGPT", url: "https://chatgpt.com/" },
  { name: "Claude", url: "https://claude.ai/new" },
  { name: "Gemini", url: "https://gemini.google.com/app" },
] as const;
