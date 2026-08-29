import type { CSSProperties, ReactNode } from "react";

/**
 * 版面の装飾。
 * いずれも意味のある形だけを使い、余白埋めには使わない。
 * すべて .deco でクリックを透過させる。
 */

/** 集中線。position: relative な親の中に敷く */
export function Rays({ className = "" }: { className?: string }) {
  return (
    <div aria-hidden="true" className={`deco rays absolute inset-0 overflow-hidden ${className}`} />
  );
}

/** 網点の面 */
export function Halftone({
  className = "",
  style,
}: {
  className?: string;
  style?: CSSProperties;
}) {
  return (
    <div
      aria-hidden="true"
      className={`deco halftone halftone-fade absolute ${className}`}
      style={style}
    />
  );
}

/** 4条のきらめき */
export function Sparkle({
  className = "",
  style,
}: {
  className?: string;
  style?: CSSProperties;
}) {
  return (
    <svg
      viewBox="0 0 100 100"
      aria-hidden="true"
      className={`deco ${className}`}
      style={style}
    >
      <path
        d="M50 0c4 28 18 42 50 50-32 8-46 22-50 50-4-28-18-42-50-50 32-8 46-22 50-50z"
        fill="currentColor"
      />
    </svg>
  );
}

/** ギザギザの爆発形。CTA や強い札の下敷きに使う */
const burstPoints = Array.from({ length: 44 }, (_, index) => {
  const angle = (Math.PI * 2 * index) / 44 - Math.PI / 2;
  const radius = index % 2 === 0 ? 50 : 41;
  return `${(50 + radius * Math.cos(angle)).toFixed(2)}% ${(
    50 +
    radius * Math.sin(angle)
  ).toFixed(2)}%`;
}).join(", ");

export function BurstShape({
  children,
  className = "",
  style,
  ...rest
}: {
  children: ReactNode;
  className?: string;
  style?: CSSProperties;
} & Record<`data-${string}`, string | undefined>) {
  return (
    <span
      {...rest}
      className={`grid place-items-center text-center ${className}`}
      style={{ clipPath: `polygon(${burstPoints})`, ...style }}
    >
      {children}
    </span>
  );
}

/** 星形。小さな停留点として散らす */
export function Star({
  className = "",
  style,
}: {
  className?: string;
  style?: CSSProperties;
}) {
  return (
    <svg
      viewBox="0 0 100 100"
      aria-hidden="true"
      className={`deco ${className}`}
      style={style}
    >
      <path
        d="M50 2l14 30 33 5-24 23 6 33-29-16-29 16 6-33L3 37l33-5z"
        fill="currentColor"
      />
    </svg>
  );
}

/** 稲妻。視線を斜めに動かす */
export function Bolt({
  className = "",
  style,
}: {
  className?: string;
  style?: CSSProperties;
}) {
  return (
    <svg
      viewBox="0 0 60 100"
      aria-hidden="true"
      className={`deco ${className}`}
      style={style}
    >
      <path d="M34 0L0 58h20L14 100 60 36H36z" fill="currentColor" />
    </svg>
  );
}

/** ふきだし */
export function Bubble({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    // position は呼び出し側が指定する。base に relative を持たせると
    // Tailwind の出力順によっては absolute が効かず、配置が流し込みに戻る
    <span
      className={`inline-block rounded-2xl bg-white px-3 py-2 text-center text-purple ${className}`}
    >
      {children}
      <span
        aria-hidden="true"
        className="absolute -bottom-2 left-6 size-4 rotate-45 bg-white"
      />
    </span>
  );
}

/** 王冠つきの丸い札。右上のキャンペーン告知に使う */
export function CrownBadge({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <span className={`relative inline-grid place-items-center ${className}`}>
      <svg
        viewBox="0 0 100 60"
        aria-hidden="true"
        className="deco absolute -top-4 left-1/2 w-12 -translate-x-1/2 text-sun sm:-top-5 sm:w-14"
      >
        <path
          d="M6 54L0 8l26 20L50 0l24 28L100 8l-6 46z"
          fill="currentColor"
          stroke="#fff"
          strokeWidth="5"
          strokeLinejoin="round"
        />
      </svg>
      <span className="grid aspect-square place-items-center rounded-full bg-purple px-4 text-center text-[10px] leading-tight font-black text-white ring-4 ring-white sm:text-xs">
        {children}
      </span>
    </span>
  );
}

/** 横に流れる欧文の帯 */
export function Ticker({
  text,
  className = "",
}: {
  text: string;
  className?: string;
}) {
  const line = `${text}   ★   `;
  return (
    <div className={`overflow-hidden ${className}`} aria-hidden="true">
      <div className="ticker-track flex w-max whitespace-nowrap">
        {[0, 1].map((copy) => (
          <span key={copy} className="flex">
            {Array.from({ length: 8 }, (_, index) => (
              <span
                key={index}
                className="px-1 text-xs font-black tracking-[0.24em]"
              >
                {line}
              </span>
            ))}
          </span>
        ))}
      </div>
    </div>
  );
}

/** 背景に散らす紙吹雪。位置は決め打ちで、毎回同じ画面になるようにする */
export function Confetti({ className = "" }: { className?: string }) {
  return (
    <div aria-hidden="true" className={`deco absolute inset-0 overflow-hidden ${className}`}>
      <Star className="absolute top-[8%] left-[6%] size-6 text-white/80" />
      <Star className="absolute top-[62%] left-[3%] size-4 text-sun" />
      <Sparkle className="absolute top-[18%] right-[8%] size-8 text-white" />
      <Sparkle className="absolute bottom-[12%] left-[14%] size-5 text-white/80" />
      <Bolt className="absolute top-[40%] right-[4%] h-8 text-sun" />
      <span className="absolute top-[30%] left-[10%] size-3 rounded-full bg-white/70" />
      <span className="absolute top-[72%] right-[12%] size-4 rounded-full bg-white/60" />
      <span className="absolute top-[52%] left-[46%] size-2.5 rounded-full bg-white/50" />
    </div>
  );
}

/** マウスカーソル。ブラウザで遊べることの記号として散らす */
export function Cursor({
  className = "",
  style,
}: {
  className?: string;
  style?: CSSProperties;
}) {
  return (
    <svg
      viewBox="0 0 40 48"
      aria-hidden="true"
      className={`deco ${className}`}
      style={style}
    >
      <path
        d="M4 2l30 22-13 3 7 15-7 3-7-15-10 8z"
        fill="#ffffff"
        stroke="var(--color-purple)"
        strokeWidth="3.5"
        strokeLinejoin="round"
      />
    </svg>
  );
}

/** 手貼りのシール。傾けて貼り込む */
export function Sticker({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <span
      className={`inline-block -rotate-6 rounded-lg bg-sun px-3 py-1.5 text-[10px] font-black tracking-[0.1em] text-purple ring-[3px] ring-purple shadow-[3px_4px_0_0_var(--color-purple)] sm:text-xs ${className}`}
    >
      {children}
    </span>
  );
}
