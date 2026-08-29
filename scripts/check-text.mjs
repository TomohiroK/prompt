/**
 * 意図しない文字体系の混入を検出する。
 *
 * このサイトが扱う言語は 日本語 / 英語 / 韓国語 / 中国語 / スペイン語 / ポルトガル語。
 * キリル文字などは本来どこにも現れないので、1文字でもあれば混入とみなして落とす。
 *
 * 実際に、執筆中のプロンプト本文にロシア語の単語が紛れ込んだことがある。
 * 目視では見落とすため、機械的に検査する。
 *
 * 使い方: npm run check:text
 */
import { globSync, readFileSync } from "node:fs";

/** 検出対象。Unicode のブロック単位で指定する */
const PATTERNS = [
  ["キリル文字", "\\u0400-\\u04FF"],
  ["アラビア文字", "\\u0600-\\u06FF"],
  ["ヘブライ文字", "\\u0590-\\u05FF"],
  ["タイ文字", "\\u0E00-\\u0E7F"],
  ["デーヴァナーガリー", "\\u0900-\\u097F"],
  ["置換文字(文字化け)", "\\uFFFD"],
];

// 検査パターンそのものが該当文字を含みうるため、このファイルは対象から外す
const SELF = "scripts/check-text.mjs";

const files = globSync("**/*.{ts,tsx,css,txt,md,mjs,json}")
  .filter(
    (file) =>
      !file.includes("node_modules") &&
      !file.startsWith(".next") &&
      file !== SELF,
  )
  .sort();

let found = 0;

for (const file of files) {
  const text = readFileSync(file, "utf8");
  const lines = text.split("\n");

  for (const [name, range] of PATTERNS) {
    const pattern = new RegExp(`[${range}]`, "gu");
    let match;
    while ((match = pattern.exec(text)) !== null) {
      const line = text.slice(0, match.index).split("\n").length;
      console.error(
        `[${name}] ${file}:${line}: ${lines[line - 1].trim().slice(0, 90)}`,
      );
      found += 1;
    }
  }
}

if (found > 0) {
  console.error(`\n${found} 件の混入を検出しました`);
  process.exit(1);
}

console.log(`${files.length} ファイルを検査。混入なし`);
