/**
 * meta description の組み立て。
 *
 * 検索結果では長い説明文はどのみち省略される。それは検索エンジン側の話で、
 * こちらから文の途中で切ってよい理由にはならない。
 * 「…て手がかりを組み立てる必要があります。ご都合主義でアイテ」のように
 * 途中で終わる文字列を配信しない。
 */

/** 全角を2、半角を1として数える。検索結果での見え方に近い */
function width(text: string): number {
  let total = 0;
  for (const char of text) {
    const code = char.codePointAt(0) ?? 0;
    // CJK・ハングル・全角記号を2とみなす
    total +=
      (code >= 0x1100 && code <= 0x115f) ||
      (code >= 0x2e80 && code <= 0xa4cf) ||
      (code >= 0xac00 && code <= 0xd7a3) ||
      (code >= 0xf900 && code <= 0xfaff) ||
      (code >= 0xfe30 && code <= 0xfe6f) ||
      (code >= 0xff00 && code <= 0xff60) ||
      (code >= 0xffe0 && code <= 0xffe6)
        ? 2
        : 1;
  }
  return total;
}

/** 文末で区切る。対応6言語の句点・ピリオド・感嘆符・疑問符 */
const SENTENCE_END = /(?<=[。．.!?！？])\s*/;

/**
 * 文を単位に、目安の長さに収まるところまで連ねて返す。
 *
 * @param parts 前から順に重要な文字列。タグライン → 説明文 の順に渡す
 * @param budget 全角換算の目安。1文目がこれを超える場合は、切らずにその1文を返す
 */
export function buildMetaDescription(parts: string[], budget = 220): string {
  const sentences = parts
    .map((part) => part.trim())
    .filter(Boolean)
    .join(" ")
    .split(SENTENCE_END)
    .map((sentence) => sentence.trim())
    .filter(Boolean);

  if (sentences.length === 0) return "";

  let result = sentences[0];
  for (const sentence of sentences.slice(1)) {
    const next = `${result} ${sentence}`;
    if (width(next) > budget) break;
    result = next;
  }
  return result;
}
