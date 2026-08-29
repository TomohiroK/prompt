import type { Locale } from "./i18n";

/**
 * サイト全体で使う定数。
 * 名称・キャッチコピー・URL を変える場合はこのファイルだけを書き換える。
 * （仮説検証のたびにコンポーネントを書き換えない設計）
 */
export const site = {
  name: "CHAT GAME",
  nameJa: "チャットゲーム",
  tagline: "貼るだけで 対戦相手",
  description:
    "ChatGPT・Claude・Gemini にそのまま貼り付けて遊べる「ゲームになるプロンプト」を集めたサイト。ワンクリックでコピーして、AIとの対話をそのままゲームに変えられます。",
  url: "https://chat-game.vercel.app",
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
 * キービジュアルに敷くポスター画像（言語ごと）。
 *
 * 使い方:
 *   1. 画像を public/hero/ に置く（例: public/hero/poster-ja.png）
 *   2. 下の heroPoster に、その言語のエントリを追加する
 *
 * 追加した言語はポスター画像が敷かれ、追加していない言語は
 * 実装で組んだキービジュアルが表示される。混在しても版面は崩れない。
 *
 * 注意:
 * - 画像に焼き込まれた文字は検索エンジンにもスクリーンリーダーにも届かない。
 *   そのため同じ内容の見出しを、目に見えない形で必ず併置している。
 * - 画像の中のボタンは押せない。ポスター全体をゲーム一覧へのリンクにしたうえで、
 *   画像の下に実物のボタンを置いている。
 * - width / height は画像本来の画素数。CLS（読み込み時のがたつき）を防ぐために要る。
 */
export type HeroPoster = {
  src: string;
  alt: string;
  width: number;
  height: number;
};

export const heroPoster: Partial<Record<Locale, HeroPoster>> = {
  ja: {
    // 配信するのは WebP。入稿された PNG は 2.4MB あり、そのままでは重すぎる
    src: "/hero/poster-ja.webp",
    alt: "貼るだけで、対戦相手。AIチャットにルールを貼り付けると、AIがゲームの相手になります。",
    width: 1122,
    height: 1402,
  },
};
