import type { ReactNode } from "react";

/** 章の見出しに添える小さなラベル */
export function Kicker({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <span
      className={`text-[11px] font-bold tracking-[0.16em] text-magenta uppercase ${className}`}
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
    <div className={className}>
      <Kicker>{latin}</Kicker>
      <h2 className="track-tight mt-1.5 text-2xl font-bold sm:text-3xl">
        {title}
      </h2>
    </div>
  );
}

/** ゲームの諸元。罫線だけで区切る */
export function MetaRow({
  items,
  className = "",
}: {
  items: { label: string; value: string }[];
  className?: string;
}) {
  return (
    <dl className={`flex flex-wrap gap-x-5 gap-y-1 ${className}`}>
      {items.map((item) => (
        <div key={item.label} className="flex items-baseline gap-1.5">
          <dt className="text-xs text-ink-2">{item.label}</dt>
          <dd className="text-sm font-bold">{item.value}</dd>
        </div>
      ))}
    </dl>
  );
}
