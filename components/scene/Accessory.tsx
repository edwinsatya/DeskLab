interface AccessoryProps {
  uid: string;
  night: boolean;
}

/** Drawn behind the monitor so screens stay crisp while the desk still gets lit. */
export const LampLight = ({ uid, night }: AccessoryProps) => (
  <g>
    <polygon points="386,226 410,222 492,346 330,346" fill={`url(#${uid}-lamp-light)`} opacity={night ? 0.85 : 0.45} />
    <ellipse cx="412" cy="338" rx="100" ry="11" fill="#fbbf24" opacity={night ? 0.38 : 0.14} filter={`url(#${uid}-blur)`} />
  </g>
);

export const Lamp = ({ uid, night }: AccessoryProps) => (
  <g>
    <circle cx="398" cy="224" r="20" fill="#fbbf24" opacity={night ? 0.4 : 0.15} filter={`url(#${uid}-blur-lg)`} />
    <ellipse cx="300" cy="327" rx="22" ry="5.5" fill="#1d1d21" />
    <ellipse cx="300" cy="325" rx="18" ry="3.5" fill="#34343b" />
    <g stroke="#3a3a42" strokeLinecap="round" fill="none">
      <line x1="300" y1="323" x2="324" y2="232" strokeWidth="5" />
      <line x1="324" y1="232" x2="388" y2="204" strokeWidth="4.5" />
    </g>
    <circle cx="324" cy="232" r="5" fill="#52525b" />
    <g transform="translate(396 212) rotate(28)">
      <path d="M-11,-12 L11,-12 L20,12 L-20,12 Z" fill="#d97706" />
      <path d="M-11,-12 L-4,-12 L-12,12 L-20,12 Z" fill="#fff" opacity="0.15" />
      <ellipse cx="0" cy="12" rx="20" ry="4" fill="#fef3c7" />
    </g>
  </g>
);

export const Mic = () => (
  <g>
    <rect x="276" y="304" width="15" height="18" rx="2" fill="#3f3f46" />
    <g stroke="#5b5b66" strokeLinecap="round" fill="none">
      <line x1="283" y1="306" x2="283" y2="214" strokeWidth="5" />
      <line x1="283" y1="214" x2="392" y2="184" strokeWidth="4" />
      <line x1="290" y1="222" x2="388" y2="194" strokeWidth="1.5" strokeOpacity="0.8" />
      <line x1="392" y1="184" x2="398" y2="200" strokeWidth="3" />
    </g>
    <circle cx="283" cy="214" r="5" fill="#71717a" />
    <ellipse cx="400" cy="228" rx="17" ry="23" fill="none" stroke="#71717a" strokeWidth="2" />
    <rect x="389" y="198" width="22" height="62" rx="11" fill="#202024" stroke="#52525b" />
    <g stroke="#fff" strokeOpacity="0.18">
      {[206, 211, 216, 221].map((y) => (
        <line key={y} x1="392" y1={y} x2="408" y2={y} />
      ))}
    </g>
    <circle cx="400" cy="248" r="2" fill="#ef4444">
      <animate attributeName="opacity" values="1;0.25;1" dur="1.8s" repeatCount="indefinite" />
    </circle>
  </g>
);

export const DeskMat = () => (
  <g>
    <polygon points="352,322 648,322 664,348 336,348" fill="#173b38" />
    <polygon
      points="358,325 642,325 655,345 345,345"
      fill="none"
      stroke="#2dd4bf"
      strokeOpacity="0.3"
      strokeDasharray="3 3"
    />
  </g>
);

const LEAVES: [number, number, number, string][] = [
  // angle, length, half-width, colour
  [-64, 128, 15, "#24603d"],
  [-46, 168, 19, "#2f7d4f"],
  [-28, 150, 18, "#3a9a5f"],
  [-12, 190, 21, "#2f7d4f"],
  [4, 172, 20, "#4cae6e"],
  [20, 186, 21, "#24603d"],
  [36, 152, 18, "#3a9a5f"],
  [52, 160, 18, "#2f7d4f"],
  [68, 118, 14, "#4cae6e"],
];

export const Plant = ({ uid }: Pick<AccessoryProps, "uid">) => (
  <g>
    <ellipse cx="142" cy="604" rx="56" ry="8" fill="#000" opacity="0.5" filter={`url(#${uid}-blur)`} />
    {LEAVES.map(([angle, length, w, color], i) => (
      <g key={i} transform={`translate(142 524) rotate(${angle})`}>
        <path
          d={`M0,0 C${w},${-length * 0.3} ${w},${-length * 0.75} 0,${-length} C${-w},${-length * 0.75} ${-w},${-length * 0.3} 0,0 Z`}
          fill={color}
        />
        <path d={`M0,0 Q2,${-length * 0.5} 0,${-length * 0.95}`} fill="none" stroke="#fff" strokeOpacity="0.15" />
        <animateTransform
          attributeName="transform"
          type="rotate"
          additive="sum"
          values={`0;${i % 2 ? 1.6 : -1.6};0`}
          dur={`${5 + (i % 3)}s`}
          repeatCount="indefinite"
        />
      </g>
    ))}
    <polygon points="98,526 186,526 176,602 108,602" fill={`url(#${uid}-pot)`} />
    <rect x="93" y="518" width="98" height="11" rx="3" fill="#f2efea" />
  </g>
);
