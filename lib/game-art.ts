/**
 * ゲームごとの色。
 * カード上端の細い罫1本にしか使わない。一覧を並べたときに、
 * 色が索引として働く程度の役割に留めている。
 */
const accents: Record<string, string> = {
  "number-guess": "#e5187f",
  whodunit: "#6a2cc0",
  "find-the-liar": "#be123c",
  "word-wolf": "#9333ea",
  "escape-room": "#0d9488",
  negotiation: "#d97706",
  "twenty-questions": "#2563eb",
};

export function getGameAccent(slug: string): string {
  return accents[slug] ?? "#6a2cc0";
}
