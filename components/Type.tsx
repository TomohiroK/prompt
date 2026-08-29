import type { ReactNode } from "react";

/**
 * 見出しの一行。文字をそのまま流し込まず、必ず版として組む。
 *
 * - misprint: 蛍光イエローの版を微妙にずらして刷り重ねる。読めるが、ただの文字ではなくなる
 * - blockFirst: 先頭の1文字だけ色面で反転させ、行の入口に視線の停留点を作る
 * - どの言語でも成立するよう、文字単位ではなく「先頭」「全体」という相対指定にしている
 */
export function DisplayLine({
  text,
  misprint = false,
  blockFirst = false,
  blockColor = "bg-shock",
  outlined = false,
  className = "",
}: {
  text: string;
  misprint?: boolean;
  blockFirst?: boolean;
  blockColor?: string;
  outlined?: boolean;
  className?: string;
}) {
  const chars = Array.from(text);

  return (
    <span className={`relative inline-block ${className}`}>
      {misprint ? (
        <span aria-hidden="true" className="misprint-layer">
          {text}
        </span>
      ) : null}

      <span className={`misprint-top ${outlined ? "outlined" : ""}`}>
        {chars.map((char, index) =>
          blockFirst && index === 0 ? (
            <span key={index} className="relative inline-block px-[0.08em]">
              <span
                aria-hidden="true"
                className={`absolute inset-x-0 -top-[0.04em] -bottom-[0.02em] ${blockColor}`}
              />
              <span className="relative text-paper">{char}</span>
            </span>
          ) : (
            <span key={index}>{char}</span>
          ),
        )}
      </span>
    </span>
  );
}

/** 縦組みの柱。CJKは正立、欧文は回転で流す */
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
    <span
      className={`${latin ? "tate-latin" : "tate"} select-none ${className}`}
    >
      {text}
    </span>
  );
}

/** 小さな欧文の見出し札。字間を広く取り、記号として置く */
export function Kicker({
  children,
  tone = "ink",
  className = "",
}: {
  children: ReactNode;
  tone?: "ink" | "flare" | "paper";
  className?: string;
}) {
  const tones = {
    ink: "bg-ink text-paper",
    flare: "bg-flare text-ink",
    paper: "bg-paper-3 text-ink",
  } as const;

  return (
    <span
      className={`inline-flex items-center px-2.5 py-1 text-[10px] font-black tracking-[0.28em] uppercase ${tones[tone]} ${className}`}
    >
      {children}
    </span>
  );
}

/** 章の見出し。巨大なアウトライン数字と罫線で誌面の構造を作る */
export function SectionHead({
  index,
  latin,
  title,
  className = "",
}: {
  index: string;
  latin: string;
  title: string;
  className?: string;
}) {
  return (
    <div className={`border-t-2 border-ink pt-3 ${className}`}>
      <div className="flex items-start gap-3 sm:gap-5">
        <span
          aria-hidden="true"
          className="outlined shrink-0 text-4xl leading-none font-black italic sm:text-6xl"
        >
          {index}
        </span>
        <div className="min-w-0 flex-1 pt-1">
          <span className="block text-[10px] font-black tracking-[0.3em] text-ink-2 uppercase">
            {latin}
          </span>
          <h2 className="track-tight mt-1 text-2xl leading-[1.05] font-black sm:text-4xl">
            {title}
          </h2>
        </div>
      </div>
    </div>
  );
}

/** 罫線つきの小見出し。メタ情報を誌面のキャプションとして扱う */
export function MetaRow({
  items,
  className = "",
}: {
  items: { label: string; value: string }[];
  className?: string;
}) {
  return (
    <dl className={`grid grid-cols-3 border-y border-current/25 ${className}`}>
      {items.map((item, index) => (
        <div
          key={item.label}
          className={`px-2 py-2 ${index > 0 ? "border-l border-current/25" : ""}`}
        >
          <dt className="text-[9px] font-black tracking-[0.18em] uppercase opacity-60">
            {item.label}
          </dt>
          <dd className="mt-0.5 text-xs font-bold">{item.value}</dd>
        </div>
      ))}
    </dl>
  );
}
