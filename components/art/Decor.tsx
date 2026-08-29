/**
 * 版面の装飾。数を絞り、意味のある形だけを使う。
 * いずれも装飾なので pointer-events は殺す（.deco）。
 */

/** トンボ（印刷の見当合わせ記号）。誌面であることの記号として四隅に置く */
export function RegistrationMark({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 40 40"
      aria-hidden="true"
      className={`deco ${className}`}
      fill="none"
    >
      <circle cx="20" cy="20" r="11" stroke="currentColor" strokeWidth="1.5" />
      <path d="M20 0v40M0 20h40" stroke="currentColor" strokeWidth="1.5" />
    </svg>
  );
}

/** 星形の色面。視線の停留点を作るための小さな衝突 */
export function Burst({
  className = "",
  style,
}: {
  className?: string;
  style?: React.CSSProperties;
}) {
  return (
    <svg
      viewBox="0 0 100 100"
      aria-hidden="true"
      className={`deco ${className}`}
      style={style}
    >
      <path
        d="M50 0l9 30 26-17-17 26 32 11-32 11 17 26-26-17-9 30-9-30-26 17 17-26L0 50l32-11L15 13l26 17z"
        fill="currentColor"
      />
    </svg>
  );
}

/** 半円のアーチ。色面として画面外へ抜けさせる */
export function Arch({
  className = "",
  style,
}: {
  className?: string;
  style?: React.CSSProperties;
}) {
  return (
    <svg
      viewBox="0 0 200 100"
      aria-hidden="true"
      className={`deco ${className}`}
      style={style}
    >
      <path d="M0 100a100 100 0 0 1 200 0z" fill="currentColor" />
    </svg>
  );
}

/** 横に流れる欧文の帯。誌面の余白を埋めず、リズムだけを作る */
export function Ticker({ text, className = "" }: { text: string; className?: string }) {
  const line = `${text}   ✦   `;
  return (
    <div className={`overflow-hidden ${className}`} aria-hidden="true">
      <div className="ticker-track flex w-max whitespace-nowrap">
        {[0, 1].map((copy) => (
          <span key={copy} className="flex">
            {Array.from({ length: 8 }, (_, i) => (
              <span key={i} className="px-1 text-xs font-bold tracking-[0.3em]">
                {line}
              </span>
            ))}
          </span>
        ))}
      </div>
    </div>
  );
}
