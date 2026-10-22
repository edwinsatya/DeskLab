import { Product } from "@/types";

interface MonitorProps {
  uid: string;
  product: Product;
  night: boolean;
}

interface Box {
  x: number;
  y: number;
  w: number;
  h: number;
}

const BEZEL = "#111114";
const STAND = "#2a2a2f";

/** Stylised app UI: an editor with a sidebar and syntax-coloured lines. */
const ScreenUI = ({ x, y, w, h, kind = "code" }: Box & { kind?: "code" | "design" }) => {
  const pad = Math.max(4, w * 0.035);
  const side = w * 0.2;
  const lines = Math.max(4, Math.floor((h - pad * 3 - 8) / 9));
  const palette = ["#2dd4bf", "#a78bfa", "#f9a8d4", "#94a3b8", "#fcd34d"];

  if (kind === "design") {
    return (
      <g>
        <rect x={x + pad} y={y + pad} width={w - pad * 2} height="6" rx="2" fill="#fff" opacity="0.08" />
        <rect x={x + pad} y={y + pad + 12} width={w * 0.62} height={h - pad * 2 - 12} rx="4" fill="#fff" opacity="0.05" />
        <circle cx={x + pad + w * 0.24} cy={y + h * 0.5} r={h * 0.18} fill="#f97316" opacity="0.75" />
        <rect x={x + pad + w * 0.32} y={y + h * 0.38} width={w * 0.22} height={h * 0.3} rx="4" fill="#2dd4bf" opacity="0.7" />
        {[0, 1, 2, 3].map((i) => (
          <rect key={i} x={x + w * 0.72} y={y + pad + 14 + i * 14} width={w * 0.2} height="7" rx="2" fill="#fff" opacity={0.12 - i * 0.02} />
        ))}
      </g>
    );
  }

  return (
    <g>
      <rect x={x + pad} y={y + pad} width={w - pad * 2} height="5" rx="2" fill="#fff" opacity="0.08" />
      <rect x={x + pad} y={y + pad + 10} width={side} height={h - pad * 2 - 10} rx="3" fill="#fff" opacity="0.04" />
      {Array.from({ length: lines }).map((_, i) => {
        const indent = [0, 10, 20, 20, 10, 0, 10, 20][i % 8];
        const width = (w - side - pad * 4 - indent) * [0.7, 0.5, 0.85, 0.4, 0.6, 0.75, 0.3, 0.55][i % 8];
        return (
          <rect
            key={i}
            x={x + side + pad * 2 + indent}
            y={y + pad + 14 + i * 9}
            width={Math.max(width, 8)}
            height="4"
            rx="2"
            fill={palette[i % palette.length]}
            opacity="0.55"
          />
        );
      })}
      <rect x={x + side + pad * 2 + 28} y={y + pad + 14 + Math.min(lines - 1, 3) * 9} width="2" height="6" fill="#e4e4e7">
        <animate attributeName="opacity" values="1;0;1" dur="1.1s" repeatCount="indefinite" />
      </rect>
    </g>
  );
};

const Stand = ({ top }: { top: number }) => (
  <g>
    <rect x="492" y={top} width="16" height={326 - top} rx="3" fill={STAND} />
    <rect x="492" y={top} width="4" height={326 - top} fill="#fff" opacity="0.06" />
    <ellipse cx="500" cy="327" rx="46" ry="6" fill="#1c1c20" />
    <ellipse cx="500" cy="325.5" rx="44" ry="4" fill="#2e2e34" />
  </g>
);

export const Monitor = ({ uid, product, night }: MonitorProps) => {
  const variant = product.variant ?? "single";
  const screenId = `${uid}-screen`;
  const glow = (cx: number, cy: number, rx: number, ry: number) => (
    <g>
      <ellipse cx={cx} cy={cy} rx={rx} ry={ry} fill="#2dd4bf" opacity={night ? 0.22 : 0.07} filter={`url(#${uid}-blur-xl)`} />
      {night && <ellipse cx="500" cy="332" rx={rx * 0.9} ry="12" fill="#5eead4" opacity="0.14" filter={`url(#${uid}-blur)`} />}
    </g>
  );

  if (variant === "ultrawide") {
    const outer = "M340,148 Q500,162 660,148 L660,290 Q500,278 340,290 Z";
    const inner = "M346,155 Q500,168 654,155 L654,283 Q500,272 346,283 Z";
    const clip = `${uid}-clip-uw`;
    return (
      <g>
        {glow(500, 215, 230, 110)}
        <Stand top={276} />
        <path d={outer} fill={BEZEL} stroke="#2a2a30" />
        <clipPath id={clip}><path d={inner} /></clipPath>
        <g clipPath={`url(#${clip})`}>
          <rect x="346" y="150" width="308" height="140" fill={`url(#${screenId})`} />
          <ScreenUI x={346} y={160} w={308} h={118} />
        </g>
      </g>
    );
  }

  if (variant === "dual") {
    const panels = [
      { outer: "292,158 494,168 494,282 292,292", inner: "298,165 488,174 488,276 298,285", box: { x: 298, y: 172, w: 190, h: 104 }, kind: "code" as const },
      { outer: "506,168 708,158 708,292 506,282", inner: "512,174 702,165 702,285 512,276", box: { x: 512, y: 172, w: 190, h: 104 }, kind: "design" as const },
    ];
    return (
      <g>
        {glow(500, 225, 260, 100)}
        <rect x="496" y="196" width="8" height="130" fill={STAND} />
        <ellipse cx="500" cy="327" rx="40" ry="6" fill="#1c1c20" />
        <ellipse cx="500" cy="325.5" rx="38" ry="4" fill="#2e2e34" />
        {panels.map((panel, i) => {
          const clip = `${uid}-clip-dual-${i}`;
          return (
            <g key={i}>
              <polygon points={panel.outer} fill={BEZEL} stroke="#2a2a30" />
              <clipPath id={clip}><polygon points={panel.inner} /></clipPath>
              <g clipPath={`url(#${clip})`}>
                <rect x={panel.box.x} y="160" width={panel.box.w} height="130" fill={`url(#${screenId})`} />
                <ScreenUI {...panel.box} kind={panel.kind} />
              </g>
            </g>
          );
        })}
      </g>
    );
  }

  const box: Box = variant === "portrait" ? { x: 436, y: 64, w: 128, h: 222 } : { x: 385, y: 150, w: 230, h: 134 };
  return (
    <g>
      {glow(500, box.y + box.h / 2, box.w * 0.8, box.h * 0.75)}
      <Stand top={box.y + box.h - 8} />
      <rect x={box.x} y={box.y} width={box.w} height={box.h} rx="7" fill={BEZEL} stroke="#2a2a30" />
      <rect x={box.x + 5} y={box.y + 5} width={box.w - 10} height={box.h - 10} rx="3" fill={`url(#${screenId})`} />
      <ScreenUI x={box.x + 5} y={box.y + 5} w={box.w - 10} h={box.h - 10} />
    </g>
  );
};

export const Keyboard = () => (
  <g>
    <polygon points="424,332 576,332 583,345 417,345" fill="#1c1c20" stroke="#2e2e34" />
    <g stroke="#fff" strokeOpacity="0.12">
      <line x1="428" y1="336.5" x2="572" y2="336.5" />
      <line x1="424" y1="340.5" x2="577" y2="340.5" />
    </g>
    <ellipse cx="612" cy="340" rx="9" ry="5" fill="#1c1c20" stroke="#2e2e34" />
  </g>
);

export const MonitorGhost = () => (
  <g fill="#fff" fillOpacity="0.02" stroke="#fff" strokeOpacity="0.22" strokeDasharray="8 6" strokeWidth="1.5">
    <rect x="385" y="150" width="230" height="134" rx="8" />
    <line x1="500" y1="284" x2="500" y2="324" />
    <line x1="460" y1="326" x2="540" y2="326" />
  </g>
);
