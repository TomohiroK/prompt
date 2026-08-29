/**
 * ゲームごとの小さなキャラクター記号（オリジナル）。
 *
 * カード上では索引記号として機能させたいので、どれも同じ枠に収め、
 * モチーフだけを差し替えている。
 * 使う色は3値だけ（本体=currentColor / 差し色=accent / 地色=ground）。
 * ground で抜くことで、地色が濃い面でも輪郭が潰れないようにしている。
 */
type Props = {
  slug: string;
  accent: string;
  /** 置かれる面の地色。目や口を「抜き」で表現するために使う */
  ground: string;
  className?: string;
};

export function GameEmblem({ slug, accent, ground, className = "" }: Props) {
  return (
    <svg
      viewBox="0 0 120 120"
      aria-hidden="true"
      className={className}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      {renderMotif(slug, accent, ground)}
    </svg>
  );
}

function renderMotif(slug: string, accent: string, ground: string) {
  switch (slug) {
    // 数字当て —— 2人のNPC。片方を差し色にして「別々の数字」を示す
    case "number-guess":
      return (
        <>
          <circle cx="40" cy="56" r="26" fill="currentColor" />
          <circle cx="32" cy="52" r="4.5" fill={ground} />
          <circle cx="48" cy="52" r="4.5" fill={ground} />
          <path d="M31 64q9 8 18 0" stroke={ground} strokeWidth="4" strokeLinecap="round" />
          <circle cx="82" cy="70" r="21" fill={accent} />
          <circle cx="76" cy="67" r="3.8" fill={ground} />
          <circle cx="89" cy="67" r="3.8" fill={ground} />
          <path d="M76 77q6.5 6 13 0" stroke={ground} strokeWidth="3.4" strokeLinecap="round" />
          <path
            d="M58 26q0-11 11-11t11 10q0 7-8 9v5"
            stroke="currentColor"
            strokeWidth="6"
            strokeLinecap="round"
          />
          <circle cx="69" cy="47" r="4" fill="currentColor" />
        </>
      );

    // 犯人当て —— 顔を捉えた虫眼鏡。レンズの中だけ地色で抜く
    case "whodunit":
      return (
        <>
          <circle cx="48" cy="58" r="27" fill="currentColor" />
          <circle cx="39" cy="54" r="4.5" fill={ground} />
          <circle cx="56" cy="54" r="4.5" fill={ground} />
          <path d="M39 68q9 7 18 0" stroke={ground} strokeWidth="4" strokeLinecap="round" />
          <circle cx="72" cy="54" r="27" fill={accent} opacity="0.28" />
          <circle cx="72" cy="54" r="27" stroke={accent} strokeWidth="8" />
          <path d="M91 76l15 17" stroke={accent} strokeWidth="10" strokeLinecap="round" />
        </>
      );

    // ワードウルフ —— 尖った耳と目隠し。1人だけ違うことを非対称で示す
    case "word-wolf":
      return (
        <>
          <path d="M28 42l3-24 21 16z" fill="currentColor" />
          <path d="M92 42l-3-24-21 16z" fill="currentColor" />
          <circle cx="60" cy="64" r="30" fill="currentColor" />
          {/* 目隠しの帯。地色で抜いて輪郭を立てる */}
          <path d="M31 54h58v15H31z" fill={ground} />
          <path d="M35 57h50v9H35z" fill={accent} />
          <circle cx="49" cy="61.5" r="3" fill={ground} />
          <circle cx="71" cy="61.5" r="3" fill={ground} />
          {/* 口元。牙を1本だけ出す */}
          <path d="M50 78h20l-6 7z" fill={ground} />
          <path d="M66 78l3 9 3-9z" fill={ground} />
        </>
      );

    // 密室脱出 —— 少しだけ開いた扉と鍵穴
    case "escape-room":
      return (
        <>
          <rect x="24" y="16" width="54" height="88" rx="3" fill="currentColor" />
          <rect x="31" y="23" width="40" height="74" rx="2" fill={ground} opacity="0.25" />
          <circle cx="63" cy="60" r="6.5" fill={ground} />
          <path d="M60.5 64.5h5l2.5 13h-10z" fill={ground} />
          <path d="M84 22l18 11v58l-18 9z" fill={accent} />
          <circle cx="90" cy="62" r="4" fill="currentColor" />
        </>
      );

    // 価格交渉 —— 値札と、まけろの合図
    case "negotiation":
      return (
        <>
          <path d="M20 42h44l34 34-40 40-38-38z" fill="currentColor" />
          <circle cx="42" cy="64" r="9" fill={ground} />
          <circle cx="42" cy="64" r="4" fill={accent} />
          <path
            d="M60 96q12-18 27-11"
            stroke={accent}
            strokeWidth="7"
            strokeLinecap="round"
          />
          <path
            d="M80 18v18M96 24l-11 14M64 24l11 14"
            stroke={accent}
            strokeWidth="7"
            strokeLinecap="round"
          />
        </>
      );

    // 20の質問 —— 考える頭と、吹き出しの中の問い
    case "twenty-questions":
      return (
        <>
          <circle cx="46" cy="70" r="27" fill="currentColor" />
          <circle cx="38" cy="66" r="4.5" fill={ground} />
          <circle cx="54" cy="66" r="4.5" fill={ground} />
          <path d="M38 80q8 6 16 0" stroke={ground} strokeWidth="4" strokeLinecap="round" />
          <path d="M60 12h48v36H84l-13 13V48h-11z" fill={accent} />
          <path
            d="M76 25q0-9 9-9t9 8q0 6-7 8v4"
            stroke="currentColor"
            strokeWidth="5"
            strokeLinecap="round"
          />
          <circle cx="86" cy="41" r="3.4" fill="currentColor" />
        </>
      );

    default:
      return <circle cx="60" cy="60" r="30" fill="currentColor" />;
  }
}
