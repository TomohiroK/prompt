/**
 * OGP画像（1200×630）を6言語ぶん public/og/ に書き出す。
 *
 *   node --experimental-strip-types scripts/make-og.mjs
 *
 * 文言は content/ui.ts から直接読む。画像用に別途コピーを持たない。
 * ヒーローのコピーを変えたらこれを流し直す。
 *
 * next/og による実行時生成は採らなかった。日本語・韓国語・中国語を描くには
 * 実行時にフォントを持つ必要があり、サーバーレス環境に不確実性を持ち込む。
 * 静的PNGなら実行時のコストも失敗もない。
 *
 * 必要なもの:
 *   - playwright-core と Chromium
 *     PLAYWRIGHT_CORE     playwright-core の入口ファイルへの絶対パス
 *     PLAYWRIGHT_CHROMIUM Chromium の実行ファイルへの絶対パス
 *     本番ビルドに不要な依存を package.json に足さないため、実行時に渡す形にしている。
 *   - Noto Sans JP / KR / SC。無い場合は端末の既定フォントで描かれ、
 *     文字が豆腐（□）になることがある。書き出し後に必ず目視すること。
 */
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

import { ui } from "../content/ui.ts";
import { locales } from "../lib/i18n.ts";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");

/**
 * 掲載ゲーム数。
 * content/games/index.ts は相対 import に拡張子を書かないため Node から直接
 * 読めない。1ファイル1ゲームの構成なので、ファイル数を数える。
 */
const gameCount = fs
  .readdirSync(path.join(root, "content", "games"))
  .filter((f) => f.endsWith(".ts") && f !== "index.ts").length;
const outDir = path.join(root, "public", "og");
const executablePath =
  process.env.PLAYWRIGHT_CHROMIUM ?? "/opt/pw-browsers/chromium/chrome-linux/chrome";

const WIDTH = 1200;
const HEIGHT = 630;

/** サイトの色。app/globals.css のトークンと合わせている */
const COLOR = {
  bg: "#f7f2fd",
  ink: "#241238",
  ink2: "#6b5b85",
  magenta: "#e5187f",
  line: "#e6dcf5",
};

/** ロケールごとに先頭へ置くフォント。Noto Sans JP は欧文も持つ */
const fontStack = {
  ja: '"Noto Sans JP"',
  ko: '"Noto Sans KR"',
  zh: '"Noto Sans SC"',
  en: '"Noto Sans JP"',
  es: '"Noto Sans JP"',
  pt: '"Noto Sans JP"',
};

const mark = fs.readFileSync(path.join(root, "public", "icon.svg"), "utf8");

function escapeHtml(s) {
  return s.replace(/[&<>"]/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" })[c]);
}

function page(locale) {
  const s = ui[locale];
  const font = `${fontStack[locale]}, "Noto Sans KR", "Noto Sans SC", sans-serif`;

  return `<!doctype html><html lang="${locale}"><head><meta charset="utf-8"><style>
  * { margin: 0; padding: 0; box-sizing: border-box; }
  html, body { width: ${WIDTH}px; height: ${HEIGHT}px; }
  body {
    background: ${COLOR.bg};
    color: ${COLOR.ink};
    font-family: ${font};
    display: flex;
    flex-direction: column;
    border-top: 14px solid ${COLOR.magenta};
  }
  .inner { flex: 1; display: flex; flex-direction: column; justify-content: space-between; padding: 56px 72px 60px; }
  .brand { display: flex; align-items: center; gap: 20px; }
  .brand svg { width: 64px; height: 64px; display: block; }
  .wordmark { font-size: 34px; font-weight: 700; letter-spacing: 0.08em; }
  .badge { font-size: 24px; font-weight: 700; color: ${COLOR.magenta}; letter-spacing: 0.02em; }
  h1 { font-size: 104px; font-weight: 700; line-height: 1.16; letter-spacing: -0.01em; }
  h1 span { display: block; }
  .foot { display: flex; align-items: flex-end; justify-content: space-between; gap: 32px; border-top: 2px solid ${COLOR.line}; padding-top: 26px; }
  .targets { font-size: 28px; font-weight: 700; color: ${COLOR.ink2}; }
  .count { font-size: 28px; font-weight: 700; color: ${COLOR.magenta}; white-space: nowrap; }
</style></head><body>
  <div class="inner">
    <div>
      <div class="brand">${mark.replace(/<!--[\s\S]*?-->/g, "")}<div class="wordmark">CHAT GAME</div></div>
      <div class="badge" style="margin-top:26px">${escapeHtml(s.hero.badge)}</div>
    </div>
    <h1 id="headline"><span>${escapeHtml(s.hero.title1)}</span><span>${escapeHtml(s.hero.title2)}</span></h1>
    <div class="foot">
      <div class="targets">ChatGPT &middot; Claude &middot; Gemini</div>
      <div class="count">${gameCount} GAMES</div>
    </div>
  </div>
</body></html>`;
}

const playwrightEntry = process.env.PLAYWRIGHT_CORE;
if (!playwrightEntry) {
  throw new Error("PLAYWRIGHT_CORE に playwright-core の入口ファイルの絶対パスを指定してください");
}
const { chromium } = await import(playwrightEntry);

const browser = await chromium.launch({ executablePath });
const page_ = await browser.newPage({ viewport: { width: WIDTH, height: HEIGHT } });

fs.mkdirSync(outDir, { recursive: true });

for (const locale of locales) {
  await page_.setContent(page(locale), { waitUntil: "load" });
  await page_.evaluate(() => document.fonts.ready);

  // 言語で文の長さが大きく違う。枠に収まるまで見出しを縮める
  const size = await page_.evaluate(() => {
    const h = document.getElementById("headline");
    const limit = 1200 - 72 * 2;
    let px = 104;
    h.style.fontSize = px + "px";
    while (px > 44 && h.scrollWidth > limit) {
      px -= 2;
      h.style.fontSize = px + "px";
    }
    return px;
  });

  const file = path.join(outDir, `${locale}.png`);
  await page_.screenshot({ path: file });
  const kb = (fs.statSync(file).size / 1024).toFixed(0);
  console.log(`${locale}  ${kb}KB  見出し ${size}px`);
}

await browser.close();
