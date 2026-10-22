import { FLOOR_Y } from "./layout";

interface RoomProps {
  uid: string;
  night: boolean;
}

const STARS = [
  [92, 88], [128, 112], [156, 80], [212, 96], [248, 132], [274, 84], [108, 146], [196, 150], [236, 176], [140, 190],
];

// Floor boards converge toward a vanishing point above the desk.
const VANISH = { x: 500, y: 120 };
const BOARD_LINES = Array.from({ length: 23 }, (_, i) => -720 + i * 110).map((x) => ({
  x1: x,
  x2: VANISH.x + (x - VANISH.x) * ((1300 - VANISH.y) / (FLOOR_Y - VANISH.y)),
}));

export const Room = ({ uid, night }: RoomProps) => {
  const id = (name: string) => `${uid}-${name}`;

  return (
    <g>
      <defs>
        <linearGradient id={id("wall")} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor={night ? "#0b0c13" : "#1b1b20"} />
          <stop offset="1" stopColor={night ? "#12131b" : "#26262c"} />
        </linearGradient>
        <linearGradient id={id("floor")} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor={night ? "#0e0f16" : "#1d1c1f"} />
          <stop offset="0.35" stopColor={night ? "#11121a" : "#232226"} />
          <stop offset="1" stopColor={night ? "#08090e" : "#151517"} />
        </linearGradient>
        <linearGradient id={id("sky")} x1="0" y1="0" x2="0" y2="1">
          {night ? (
            <>
              <stop offset="0" stopColor="#040716" />
              <stop offset="0.6" stopColor="#101a3d" />
              <stop offset="1" stopColor="#1f2c5c" />
            </>
          ) : (
            <>
              <stop offset="0" stopColor="#24456a" />
              <stop offset="0.45" stopColor="#c66b6e" />
              <stop offset="0.8" stopColor="#f2a65a" />
              <stop offset="1" stopColor="#fcd581" />
            </>
          )}
        </linearGradient>
        <linearGradient id={id("sea")} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor={night ? "#0c1738" : "#16697a"} />
          <stop offset="1" stopColor={night ? "#050a1c" : "#0c3b47"} />
        </linearGradient>
        <radialGradient id={id("sun")}>
          <stop offset="0" stopColor={night ? "#e0e7ff" : "#fff1b8"} stopOpacity="0.9" />
          <stop offset="1" stopColor={night ? "#e0e7ff" : "#fde68a"} stopOpacity="0" />
        </radialGradient>
        <radialGradient id={id("window-wash")}>
          <stop offset="0" stopColor={night ? "#6b7fd7" : "#f6b26b"} stopOpacity={night ? 0.08 : 0.16} />
          <stop offset="1" stopColor={night ? "#6b7fd7" : "#f6b26b"} stopOpacity="0" />
        </radialGradient>
        <clipPath id={id("window-clip")}>
          <rect x="70" y="70" width="220" height="250" rx="4" />
        </clipPath>
      </defs>

      {/* Wall + floor extend past the viewBox so letterboxed space keeps the room going */}
      <rect x="-1200" y="-800" width="3400" height={FLOOR_Y + 800} fill={`url(#${id("wall")})`} />
      <ellipse cx="180" cy="240" rx="320" ry="260" fill={`url(#${id("window-wash")})`} />
      <rect x="-1200" y={FLOOR_Y} width="3400" height="900" fill={`url(#${id("floor")})`} />
      <g stroke="#fff" strokeOpacity={night ? 0.025 : 0.035} strokeWidth="1.2">
        {BOARD_LINES.map((line) => (
          <line key={line.x1} x1={line.x1} y1={FLOOR_Y} x2={line.x2} y2="1300" />
        ))}
        <line x1="-1200" y1="500" x2="2200" y2="500" />
        <line x1="-1200" y1="545" x2="2200" y2="545" />
        <line x1="-1200" y1="610" x2="2200" y2="610" />
      </g>
      <rect x="-1200" y={FLOOR_Y - 8} width="3400" height="8" fill={night ? "#16171f" : "#2c2c33"} />

      {/* Window with a Bali view */}
      <g clipPath={`url(#${id("window-clip")})`}>
        <rect x="70" y="70" width="220" height="250" fill={`url(#${id("sky")})`} />
        {night ? (
          <>
            {STARS.map(([x, y], i) => (
              <circle key={i} cx={x} cy={y} r={i % 3 === 0 ? 1.4 : 0.9} fill="#e0e7ff" opacity={0.5 + (i % 4) * 0.12} />
            ))}
            <circle cx="232" cy="118" r="34" fill={`url(#${id("sun")})`} />
            <circle cx="232" cy="118" r="13" fill="#e5e9ff" />
            <circle cx="238" cy="113" r="11" fill="#13204a" />
          </>
        ) : (
          <>
            <circle cx="188" cy="238" r="64" fill={`url(#${id("sun")})`} />
            <circle cx="188" cy="240" r="22" fill="#fff4c2" />
          </>
        )}
        <path d="M70,252 C110,240 140,244 168,250 L70,250 Z" fill={night ? "#0a1028" : "#5a3a55"} opacity="0.8" />
        <rect x="70" y="250" width="220" height="70" fill={`url(#${id("sea")})`} />
        <g fill={night ? "#c7d2fe" : "#ffe7a3"} opacity={night ? 0.35 : 0.7}>
          <rect x={night ? 220 : 170} y="258" width="36" height="2" rx="1" />
          <rect x={night ? 224 : 176} y="268" width="26" height="2" rx="1" />
          <rect x={night ? 216 : 166} y="280" width="42" height="2" rx="1" />
          <rect x={night ? 226 : 180} y="296" width="18" height="2" rx="1" />
        </g>
        {/* Palms */}
        <g stroke={night ? "#02030a" : "#22141f"} strokeLinecap="round" fill="none">
          <path d="M104,324 C114,286 108,226 128,172" strokeWidth="6" />
          <path d="M128,172 q-28,-10 -50,16 M128,172 q-22,4 -36,32 M128,172 q26,-14 54,6 M128,172 q22,4 36,32 M128,172 q-4,-22 -20,-30 M128,172 q12,-20 32,-22" strokeWidth="5" />
          <path d="M270,324 C264,292 272,252 260,218" strokeWidth="5" />
          <path d="M260,218 q-24,-8 -42,12 M260,218 q-16,4 -28,26 M260,218 q22,-10 44,6 M260,218 q16,6 26,26 M260,218 q4,-18 20,-22" strokeWidth="4" />
        </g>
      </g>
      <rect x="70" y="70" width="220" height="250" rx="4" fill="none" stroke={night ? "#23232b" : "#3a3a42"} strokeWidth="8" />
      <line x1="180" y1="70" x2="180" y2="320" stroke={night ? "#23232b" : "#3a3a42"} strokeWidth="5" />
      <rect x="58" y="320" width="244" height="11" rx="2" fill={night ? "#1d1d24" : "#34343b"} />

      {/* Light falling through the window */}
      <polygon
        points="96,470 300,470 470,660 150,660"
        fill={night ? "#93a4ff" : "#fbbf24"}
        opacity={night ? 0.035 : 0.06}
        filter={`url(#${id("blur-lg")})`}
      />

      {/* Framed print */}
      <g opacity={night ? 0.55 : 1}>
        <rect x="796" y="84" width="112" height="140" rx="3" fill="#2a2a30" />
        <rect x="804" y="92" width="96" height="124" fill="#e9dfcc" />
        <circle cx="852" cy="140" r="24" fill="#e07a5f" />
        <path d="M804,176 C824,164 842,184 862,172 C878,163 890,170 900,166 L900,216 L804,216 Z" fill="#2a9d8f" />
        <path d="M804,192 C826,182 846,200 868,190 C882,184 892,190 900,188 L900,216 L804,216 Z" fill="#1f6f66" />
      </g>
    </g>
  );
};
