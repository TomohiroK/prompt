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

/**
 * キービジュアルの人物写真。
 *
 * 写真を用意したら public/hero/ に置き、ここを埋めるだけで版面に反映される。
 * null のあいだは自作のイラストが同じ位置に立つため、
 * 差し替えでレイアウトは崩れない。
 *
 * 推奨する画像:
 * - 縦位置。上半身から全身が入るもの
 * - 背景を抜いた透過 PNG（抜けていない場合は矩形のまま表示される）
 * - 長辺 2000px 以上
 * - 商用利用可のライセンスとモデルリリースがあるもの
 */
export const heroPhoto: { src: string; alt: string } | null = null;
