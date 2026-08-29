import type { CSSProperties, ReactNode } from "react";

/**
 * 押し出し文字。
 * 面・縁・影を3枚のレイヤーに分けて刷り重ねる。
 * 縁と影のレイヤーにだけ太い text-stroke をかけ、面は輪郭を持たせないことで、
 * 白い面がにじまずに残る。
 */
type Tone = "white" | "purple" | "magenta" | "sun";

/**
 * 面 / 縁 / 押し出しの3色。
 * face に "grad" を指定した場合は、単色ではなく面のグラデーションを使う。
 */
const tones: Record<
  Tone,
  { face: string; edge: string; extrude: string; grad: boolean }
> = {
  white: {
    face: "#ffffff",
    edge: "var(--color-magenta)",
    extrude: "var(--color-purple-deep)",
    grad: true,
  },
  purple: {
    face: "var(--color-purple)",
    edge: "#ffffff",
    extrude: "var(--color-magenta)",
    grad: false,
  },
  magenta: {
    face: "var(--color-magenta)",
    edge: "#ffffff",
    extrude: "var(--color-purple)",
    grad: false,
  },
  sun: {
    face: "var(--color-sun)",
    edge: "var(--color-purple)",
    extrude: "var(--color-magenta)",
    grad: false,
  },
};

/** 文字単位に少しだけ角度と高さを振り、機械的な行に見えないようにする */
function Glyphs({ text, wave }: { text: string; wave: boolean }) {
  if (!wave) return <>{text}</>;

  return (
    <>
      {Array.from(text).map((char, index) =>
        char === " " ? (
          " "
        ) : (
          <span
            key={index}
            className="inline-block"
            style={{
              transform: `rotate(${((index % 3) - 1) * 1.7}deg) translateY(${
                index % 2 === 0 ? -0.02 : 0.018
              }em)`,
            }}
          >
            {char}
          </span>
        ),
      )}
    </>
  );
}

export function PopTitle({
  text,
  tone = "white",
  wave = true,
  className = "",
}: {
  text: string;
  tone?: Tone;
  wave?: boolean;
  className?: string;
}) {
  const { face, edge, extrude, grad } = tones[tone];

  return (
    <span className={`relative inline-block ${className}`}>
      {/* 押し出しの側面。縁と同じ太さで抜いてから段を積む */}
      <span
        aria-hidden="true"
        className="pop-stroke extrude absolute inset-0"
        style={
          {
            color: extrude,
            "--extrude-color": extrude,
          } as CSSProperties
        }
      >
        <Glyphs text={text} wave={wave} />
      </span>

      {/* 縁 */}
      <span
        aria-hidden="true"
        className="pop-stroke absolute inset-0"
        style={{ color: edge }}
      >
        <Glyphs text={text} wave={wave} />
      </span>

      {/* 面 */}
      <span
        className={`relative ${grad ? "face-grad" : ""}`}
        style={grad ? undefined : { color: face }}
      >
        <Glyphs text={text} wave={wave} />
      </span>
    </span>
  );
}

/** 小さめの押し出し文字。見出し以外の強調に使う */
export function PopText({
  text,
  tone = "white",
  className = "",
}: {
  text: string;
  tone?: Tone;
  className?: string;
}) {
  const { face, edge } = tones[tone];
  return (
    <span className={`relative inline-block ${className}`}>
      <span
        aria-hidden="true"
        className="pop-stroke-sm absolute inset-0"
        style={{ color: edge }}
      >
        {text}
      </span>
      <span className="relative" style={{ color: face }}>
        {text}
      </span>
    </span>
  );
}

/** 丸い札。欧文の小見出しや機能ラベルに使う */
export function Kicker({
  children,
  tone = "magenta",
  className = "",
}: {
  children: ReactNode;
  tone?: "magenta" | "purple" | "white" | "sun";
  className?: string;
}) {
  const styles = {
    magenta: "bg-magenta text-white",
    purple: "bg-purple text-white",
    white: "bg-white text-purple",
    sun: "bg-sun text-purple",
  } as const;

  return (
    <span
      className={`inline-flex items-center rounded-full px-3 py-1 text-[10px] font-black tracking-[0.2em] uppercase ${styles[tone]} ${className}`}
    >
      {children}
    </span>
  );
}

/** 章の見出し */
export function SectionHead({
  latin,
  title,
  className = "",
}: {
  latin: string;
  title: string;
  className?: string;
}) {
  return (
    <div className={`text-center ${className}`}>
      <Kicker tone="purple">{latin}</Kicker>
      <h2 className="track-tight mt-3 text-3xl leading-[1.06] font-black sm:text-5xl">
        <PopTitle text={title} tone="white" />
      </h2>
    </div>
  );
}

/** メタ情報。カード内の小さな表として使う */
export function MetaRow({
  items,
  className = "",
}: {
  items: { label: string; value: string }[];
  className?: string;
}) {
  return (
    <dl
      className={`grid grid-cols-3 overflow-hidden rounded-xl bg-pink-soft ${className}`}
    >
      {items.map((item, index) => (
        <div
          key={item.label}
          className={`px-2 py-2 text-center ${index > 0 ? "border-l-2 border-white" : ""}`}
        >
          <dt className="text-[9px] font-black tracking-[0.12em] text-magenta uppercase">
            {item.label}
          </dt>
          <dd className="mt-0.5 text-xs font-black text-purple">
            {item.value}
          </dd>
        </div>
      ))}
    </dl>
  );
}

/** 縦組みの柱 */
export function Rail({
  text,
  latin = false,
  className = "",
}: {
  text: string;
  latin?: boolean;
  className?: string;
}) {
  return (
    <span className={`${latin ? "tate-latin" : "tate"} select-none ${className}`}>
      {text}
    </span>
  );
}
