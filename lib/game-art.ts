/**
 * ゲームごとの版面設計。
 * 色は「紙・墨・蛍光」の共通パレットから、1本ずつ別の組み合わせを割り当てる。
 * 一覧を並べたときに、色そのものが索引として機能することを狙っている。
 */
export type GameArt = {
  /** カードの地色 */
  ground: string;
  /** 地色の上に乗る文字色 */
  onGround: string;
  /** 差し色（丸・帯・記号に使う） */
  accent: string;
  /** 通し番号。誌面の索引として大きく出す */
  index: string;
};

export const gameArt: Record<string, GameArt> = {
  "number-guess": {
    ground: "var(--color-flare)",
    onGround: "var(--color-ink)",
    accent: "var(--color-shock)",
    index: "01",
  },
  whodunit: {
    ground: "var(--color-shock)",
    onGround: "var(--color-paper-3)",
    accent: "var(--color-flare)",
    index: "02",
  },
  "word-wolf": {
    ground: "var(--color-ink)",
    onGround: "var(--color-paper-3)",
    accent: "var(--color-flare)",
    index: "03",
  },
  "escape-room": {
    ground: "var(--color-aqua)",
    onGround: "var(--color-ink)",
    accent: "var(--color-paper-3)",
    index: "04",
  },
  negotiation: {
    ground: "var(--color-ultra)",
    onGround: "var(--color-paper-3)",
    accent: "var(--color-flare)",
    index: "05",
  },
  "twenty-questions": {
    ground: "var(--color-paper-2)",
    onGround: "var(--color-ink)",
    accent: "var(--color-ultra)",
    index: "06",
  },
};

export function getGameArt(slug: string): GameArt {
  return (
    gameArt[slug] ?? {
      ground: "var(--color-paper-2)",
      onGround: "var(--color-ink)",
      accent: "var(--color-shock)",
      index: "00",
    }
  );
}
