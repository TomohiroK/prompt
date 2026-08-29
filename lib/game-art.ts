/**
 * ゲームごとの版面設計。
 * どれも明るい高彩度の面にし、暗い地色は使わない。
 * 一覧を並べたときに、色そのものが索引として働くよう1本ずつ変えている。
 */
export type GameArt = {
  /** 表紙の地色 */
  ground: string;
  /** 地色の上に乗る文字色 */
  onGround: string;
  /** 差し色（記号・星・帯） */
  accent: string;
  /** 通し番号 */
  index: string;
};

export const gameArt: Record<string, GameArt> = {
  "number-guess": {
    ground: "var(--color-magenta)",
    onGround: "#ffffff",
    accent: "var(--color-sun)",
    index: "01",
  },
  whodunit: {
    ground: "var(--color-purple-2)",
    onGround: "#ffffff",
    accent: "var(--color-mint)",
    index: "02",
  },
  "word-wolf": {
    ground: "var(--color-violet)",
    onGround: "#ffffff",
    accent: "var(--color-sun)",
    index: "03",
  },
  "escape-room": {
    ground: "var(--color-mint)",
    onGround: "var(--color-purple)",
    accent: "var(--color-magenta)",
    index: "04",
  },
  negotiation: {
    ground: "var(--color-sun)",
    onGround: "var(--color-purple)",
    accent: "var(--color-magenta)",
    index: "05",
  },
  "twenty-questions": {
    ground: "var(--color-pink)",
    onGround: "#ffffff",
    accent: "var(--color-purple)",
    index: "06",
  },
};

export function getGameArt(slug: string): GameArt {
  return (
    gameArt[slug] ?? {
      ground: "var(--color-violet)",
      onGround: "#ffffff",
      accent: "var(--color-sun)",
      index: "00",
    }
  );
}
