/**
 * キービジュアルの人物イラスト（オリジナル）。
 *
 * 写真ではなくベクターで組む前提で、面と輪郭だけで成立する
 * ポスター向けのシルエットにしている。
 * 衣装の色は画面のアクセントカラーと同じ値を使い、
 * 人物が背景・タイポと同じ色設計の中に置かれるようにしている。
 */
export function Mascot({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 420 620"
      role="img"
      aria-label="スマートフォンを掲げた人物のイラスト"
      className={className}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* 影は落とさず、足元に色面だけを敷く */}
      <ellipse cx="212" cy="586" rx="120" ry="16" fill="var(--color-ink)" opacity="0.1" />

      {/* 脚 —— ワイドなクロップドパンツ */}
      <path
        d="M150 322h60v128q0 12-4 24l-14 46h-46l6-72z"
        fill="var(--color-ink)"
      />
      <path
        d="M214 322h62l6 128 8 70h-46l-16-46q-4-12-4-24z"
        fill="var(--color-ink)"
      />

      {/* ソックス —— 蛍光イエロー */}
      <path d="M152 520h46l-3 34h-46z" fill="var(--color-sun)" />
      <path d="M244 520h46l4 34h-46z" fill="var(--color-sun)" />

      {/* スニーカー —— 厚みのあるソール */}
      <path
        d="M147 550h48q6 18 24 24 10 3 10 12t-11 9h-76q-8 0-8-9z"
        fill="#ffffff"
      />
      <path d="M134 578h94v9q0 8-8 8h-78q-8 0-8-8z" fill="var(--color-ink)" />
      <path
        d="M248 550h48l3 12q3 14 22 24 9 5 9 12t-11 9h-76q-8 0-8-9z"
        fill="#ffffff"
      />
      <path d="M239 578h95v9q0 8-8 8h-79q-8 0-8-8z" fill="var(--color-ink)" />

      {/* インナー —— ターコイズ */}
      <path d="M168 186h92v148h-92z" fill="var(--color-mint)" />

      {/* ジャケット —— ショッキングピンクのオーバーサイズ */}
      <path
        d="M156 192q0-14 14-18l30-8 12 26 12-26 30 8q14 4 14 18v128q0 14-14 14H170q-14 0-14-14z"
        fill="var(--color-magenta)"
      />
      {/* 前立ての合わせ */}
      <path d="M209 192h6v142h-6z" fill="var(--color-ink)" opacity="0.25" />
      {/* 襟 */}
      <path d="M200 166l12 26 12-26-12-8z" fill="#ffffff" />

      {/* 左腕 —— 下ろした袖 */}
      <path
        d="M156 196q-18 6-22 24l-14 76q-2 12 9 15l14 4q11 3 14-9l16-72z"
        fill="var(--color-magenta)"
      />
      <path d="M143 305l30 8-6 26q-2 9-11 7l-14-4q-9-3-6-12z" fill="var(--color-skin)" />

      {/* 右腕 —— 掲げた腕。画面右上へ視線を送る */}
      <path
        d="M268 196q20 4 27 22l30 74q5 12-6 17l-13 6q-11 5-16-6l-32-68z"
        fill="var(--color-magenta)"
      />
      <path
        d="M292 296l30-13 12 26q4 9-5 13l-13 6q-9 4-13-5z"
        fill="var(--color-skin)"
      />

      {/* スマートフォン —— 画面は蛍光イエロー */}
      <g transform="rotate(-16 322 246)">
        <rect x="294" y="196" width="56" height="94" rx="10" fill="var(--color-ink)" />
        <rect x="301" y="204" width="42" height="78" rx="5" fill="var(--color-sun)" />
        <rect x="308" y="216" width="28" height="6" rx="3" fill="var(--color-ink)" />
        <rect x="308" y="230" width="20" height="6" rx="3" fill="var(--color-ink)" />
        <rect x="308" y="252" width="28" height="18" rx="6" fill="var(--color-magenta)" />
      </g>

      {/* 首 */}
      <path d="M198 140h28v34h-28z" fill="var(--color-skin)" />
      <path d="M198 140h28v18q-14 8-28 0z" fill="var(--color-ink)" opacity="0.15" />

      {/* 頭部 */}
      <ellipse cx="212" cy="106" rx="54" ry="58" fill="var(--color-skin)" />

      {/* 髪 —— 前髪の重いボブ。
          左右の毛先を頭頂と1本の輪郭でつなぎ、髪として読めるようにしている
          （分離させるとヘッドホンに見える） */}
      <path
        d="M212 44C178 44 154 70 154 104v68a10 10 0 0 0 20 0V98c16 10 60 10 76 0v74a10 10 0 0 0 20 0v-68c0-34-24-60-58-60z"
        fill="var(--color-ink)"
      />

      {/* サングラス —— 頭上に上げた蛍光フレーム */}
      <g>
        <rect x="166" y="58" width="34" height="24" rx="11" fill="var(--color-sun)" />
        <rect x="224" y="58" width="34" height="24" rx="11" fill="var(--color-sun)" />
        <path d="M200 68h24v6h-24z" fill="var(--color-sun)" />
        <path d="M160 66h8v6h-8z" fill="var(--color-sun)" />
        <path d="M256 66h8v6h-8z" fill="var(--color-sun)" />
      </g>

      {/* 目・口 —— 点と線だけで表情を作る */}
      <circle cx="192" cy="112" r="5.5" fill="var(--color-ink)" />
      <circle cx="234" cy="112" r="5.5" fill="var(--color-ink)" />
      <path
        d="M203 132q9 8 18 0"
        stroke="var(--color-ink)"
        strokeWidth="4"
        strokeLinecap="round"
      />
      <ellipse cx="176" cy="126" rx="9" ry="6" fill="var(--color-magenta)" opacity="0.5" />
      <ellipse cx="250" cy="126" rx="9" ry="6" fill="var(--color-magenta)" opacity="0.5" />

      {/* イヤリング —— 小さな差し色 */}
      <circle cx="160" cy="122" r="9" stroke="var(--color-sun)" strokeWidth="5" />
    </svg>
  );
}
