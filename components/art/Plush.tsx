/**
 * ぬいぐるみのマスコット（オリジナル）。
 * 面と丸だけで作り、輪郭線は持たせない。
 * ハイライトを1枚重ねることで、平面のベクターでも起毛の丸みが出るようにしている。
 */
export function Plush({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 300 320"
      role="img"
      aria-label="クイズのマスコットキャラクター"
      className={className}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <radialGradient id="plush-body" cx="38%" cy="30%" r="78%">
          <stop offset="0%" stopColor="#d9c2ff" />
          <stop offset="62%" stopColor="#b98cf5" />
          <stop offset="100%" stopColor="#9163e0" />
        </radialGradient>
        <radialGradient id="plush-face" cx="42%" cy="34%" r="70%">
          <stop offset="0%" stopColor="#fffdff" />
          <stop offset="100%" stopColor="#f0e3ff" />
        </radialGradient>
      </defs>

      {/* 触角 */}
      <path
        d="M104 74C92 44 96 20 112 12"
        stroke="#9163e0"
        strokeWidth="11"
        strokeLinecap="round"
      />
      <circle cx="114" cy="12" r="14" fill="#c9a8fb" />
      <path
        d="M196 74c12-30 8-54-8-62"
        stroke="#9163e0"
        strokeWidth="11"
        strokeLinecap="round"
      />
      <circle cx="186" cy="12" r="14" fill="#c9a8fb" />

      {/* 耳 */}
      <ellipse cx="76" cy="128" rx="30" ry="38" fill="#a279ec" />
      <ellipse cx="224" cy="128" rx="30" ry="38" fill="#a279ec" />

      {/* 胴体 */}
      <ellipse cx="150" cy="180" rx="112" ry="112" fill="url(#plush-body)" />

      {/* 足 */}
      <ellipse cx="98" cy="286" rx="42" ry="28" fill="#a279ec" />
      <ellipse cx="202" cy="286" rx="42" ry="28" fill="#a279ec" />
      <ellipse cx="98" cy="288" rx="24" ry="14" fill="#ffd3ea" />
      <ellipse cx="202" cy="288" rx="24" ry="14" fill="#ffd3ea" />

      {/* 顔 */}
      <ellipse cx="150" cy="172" rx="88" ry="82" fill="url(#plush-face)" />

      {/* 目 —— 片方はウインク */}
      <ellipse cx="116" cy="166" rx="16" ry="19" fill="#3b1465" />
      <circle cx="121" cy="159" r="6" fill="#ffffff" />
      <circle cx="111" cy="173" r="3.4" fill="#ffffff" opacity="0.8" />
      <path
        d="M166 168q16-16 32 0"
        stroke="#3b1465"
        strokeWidth="9"
        strokeLinecap="round"
      />

      {/* 頬 */}
      <ellipse cx="92" cy="196" rx="17" ry="11" fill="#ff9ecb" opacity="0.85" />
      <ellipse cx="208" cy="196" rx="17" ry="11" fill="#ff9ecb" opacity="0.85" />

      {/* 口 */}
      <path
        d="M132 196q18 22 36 0"
        stroke="#3b1465"
        strokeWidth="8"
        strokeLinecap="round"
      />
      <path d="M138 202q12 14 24 0z" fill="#ff6fa8" />

      {/* 胸のタグ */}
      <g transform="rotate(-8 150 268)">
        <rect x="122" y="244" width="56" height="46" rx="12" fill="#ff2e93" />
        <rect x="130" y="252" width="40" height="30" rx="8" fill="#ffffff" />
        <text
          x="150"
          y="275"
          textAnchor="middle"
          fontSize="22"
          fontWeight="900"
          fill="#6a2cc0"
          fontFamily="ui-sans-serif, system-ui, sans-serif"
        >
          Q!
        </text>
      </g>

      {/* ハイライト */}
      <ellipse
        cx="104"
        cy="108"
        rx="34"
        ry="20"
        fill="#ffffff"
        opacity="0.5"
        transform="rotate(-24 104 108)"
      />
    </svg>
  );
}
