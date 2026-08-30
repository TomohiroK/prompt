import type { Locale } from "./i18n";

/**
 * サイト全体で使う定数。
 * 名称・キャッチコピー・URL を変える場合はこのファイルだけを書き換える。
 * （仮説検証のたびにコンポーネントを書き換えない設計）
 */
/**
 * 本番の URL。
 *
 * ここに固定値を書かない。
 * 過去に、実在を確認しないまま推測でドメインを書き込んだことがある。
 * そのアドレスは第三者の実在サイトで、canonical・OGP・sitemap の全 URL が
 * 無関係なサイトを指す状態になっていた。同じことを繰り返さないため、
 * ドメインは環境から受け取るだけにして、コードには一切書かない。
 *
 * Vercel は本番ドメインをビルド時に環境変数で渡すので、そこから取る。
 * 独自ドメインを使う場合のみ NEXT_PUBLIC_SITE_URL で上書きする。
 */
function resolveSiteUrl(): string {
  const explicit = process.env.NEXT_PUBLIC_SITE_URL;
  if (explicit) return explicit.replace(/\/$/, "");

  const vercel = process.env.VERCEL_PROJECT_PRODUCTION_URL;
  if (vercel) return `https://${vercel}`;

  return "http://localhost:3000";
}

export const site = {
  name: "CHAT GAME",
  nameJa: "チャットゲーム",
  tagline: "貼るだけで 対戦相手",
  description:
    "ChatGPT・Claude・Gemini にそのまま貼り付けて遊べる「ゲームになるプロンプト」を集めたサイト。ワンクリックでコピーして、AIとの対話をそのままゲームに変えられます。",
  url: resolveSiteUrl(),
  locale: "ja_JP",
  author: "TomohiroK",
} as const;

/** コピー後に貼り付ける先の候補。増減はこの配列だけで完結する。 */
/**
 * Google Analytics 4 の測定ID。
 *
 * 測定IDは HTML に出力される公開値であり、秘密情報ではない。
 * ただし環境ごとに差し替えられるよう、環境変数を優先する。
 */
export const gaMeasurementId =
  process.env.NEXT_PUBLIC_GA_ID ?? "G-NP1H3RYTS5";

/**
 * 訴求の版。コピー数を版ごとに分けて数えるために使う。
 *
 * 同時に2案を出し分ける仕組みはまだ無い。当面は期間を区切って版を入れ替える
 * 使い方を想定している（A週 → B週 → B週 → A週 のように戻しながら比べる）。
 * デプロイごとに NEXT_PUBLIC_COPY_VARIANT を変えると、その期間の数が
 * 別のキーに積まれる。未設定なら "base"。
 */
export const copyVariant = process.env.NEXT_PUBLIC_COPY_VARIANT ?? "base";

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
 * - 画像の中のボタンは押せない。画像の直下に実物のボタンを置いている。
 *   画像自体はリンクにしていない（ポスターの一部だけが押せるように見えるのを避ける）。
 * - width / height は画像本来の画素数。CLS（読み込み時のがたつき）を防ぐために要る。
 * - 幅違いを用意する。1枚だけだと、表示幅 560px の画面にも最大の画像を送ることになる。
 *   この画像はトップの LCP を決めるので、ここの転送量がそのまま表示速度に出る。
 */
export type HeroPoster = {
  /** srcset に並べる幅違い。幅の小さい順に書き、最後が最大 */
  sources: { width: number; src: string }[];
  alt: string;
  /** 最大の画像の画素数。width / height 属性に使う */
  width: number;
  height: number;
  /** CSS 上の表示幅の上限（px）。sizes 属性に使う */
  displayMaxWidth: number;
};

export const heroPoster: Partial<Record<Locale, HeroPoster>> = {
  ja: {
    // 配信するのは WebP。入稿された PNG は 2.4MB あり、そのままでは重すぎる
    sources: [
      { width: 560, src: "/hero/poster-ja-560.webp" },
      { width: 750, src: "/hero/poster-ja-750.webp" },
      { width: 1122, src: "/hero/poster-ja-1122.webp" },
    ],
    alt: "貼るだけで、対戦相手。AIチャットにルールを貼り付けると、AIがゲームの相手になります。",
    width: 1122,
    height: 1402,
    displayMaxWidth: 560,
  },
};
