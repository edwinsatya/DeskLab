import { Product } from "@/types";
import { luminance, shade } from "./color";
import { DESK } from "./layout";

interface DeskProps {
  uid: string;
  product: Product;
}

const THICKNESS: Record<string, number> = { classic: 14, standing: 14, scandi: 9, solid: 22 };

const { backY, frontY, backLeft, backRight, frontLeft, frontRight, floorFront, floorBack } = DESK;

export const Desk = ({ uid, product }: DeskProps) => {
  const base = product.color ?? "#D4A373";
  const variant = product.variant ?? "classic";
  const t = THICKNESS[variant] ?? 14;
  const edgeY = frontY + t;
  const light = luminance(base) > 0.8;
  const gradId = `${uid}-desk-top-${product.id}`;

  return (
    <g>
      <defs>
        <linearGradient id={gradId} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor={shade(base, light ? -0.1 : -0.12)} />
          <stop offset="1" stopColor={shade(base, light ? 0 : 0.1)} />
        </linearGradient>
      </defs>

      {/* Shadow + under-desk depth */}
      <ellipse cx="500" cy={floorFront + 4} rx="300" ry="16" fill="#000" opacity="0.5" filter={`url(#${uid}-blur)`} />
      <rect x="280" y={edgeY + 10} width="440" height="170" fill="#000" opacity="0.18" filter={`url(#${uid}-blur-lg)`} />

      {variant === "standing" && <StandingFrame edgeY={edgeY} />}
      {variant === "scandi" && <ScandiLegs edgeY={edgeY} base={base} />}
      {variant === "solid" && <SolidBack base={base} edgeY={edgeY} />}
      {variant === "classic" && <ClassicBackLegs base={base} edgeY={edgeY} />}

      {/* Desk top */}
      <polygon
        points={`${backLeft},${backY} ${backRight},${backY} ${frontRight},${frontY} ${frontLeft},${frontY}`}
        fill={`url(#${gradId})`}
      />
      {(variant === "classic" || variant === "solid") && (
        <g fill="none" stroke={shade(base, -0.35)} strokeOpacity="0.28" strokeWidth="1.2">
          <path d="M282,314 C400,309 520,320 718,312" />
          <path d="M262,326 C420,322 560,334 744,325" />
          <path d="M246,340 C380,335 600,346 758,338" />
        </g>
      )}
      {variant === "standing" && (
        <polygon points="560,306 640,306 610,350 520,350" fill="#fff" opacity="0.04" />
      )}
      <line x1={backLeft} y1={backY} x2={backRight} y2={backY} stroke="#000" strokeOpacity="0.25" />
      <rect x={frontLeft} y={frontY} width={frontRight - frontLeft} height={t} fill={shade(base, light ? -0.18 : -0.3)} />
      <line x1={frontLeft} y1={frontY + 0.5} x2={frontRight} y2={frontY + 0.5} stroke="#fff" strokeOpacity={light ? 0.6 : 0.22} />

      {variant === "classic" && <ClassicFront base={base} edgeY={edgeY} />}
      {variant === "solid" && <SolidFront base={base} edgeY={edgeY} />}
      {variant === "standing" && (
        <g>
          <rect x="688" y={edgeY} width="42" height="9" rx="2" fill="#0d0d0f" />
          <circle cx="722" cy={edgeY + 4.5} r="1.8" fill="#2dd4bf" />
          <rect x="694" y={edgeY + 3} width="14" height="3" rx="1" fill="#3f3f46" />
        </g>
      )}
    </g>
  );
};

const ClassicBackLegs = ({ base, edgeY }: { base: string; edgeY: number }) => (
  <g fill={shade(base, -0.5)}>
    <rect x="282" y={edgeY} width="14" height={floorBack - edgeY} />
    <rect x="704" y={edgeY} width="14" height={floorBack - edgeY} />
  </g>
);

const ClassicFront = ({ base, edgeY }: { base: string; edgeY: number }) => {
  const leg = shade(base, -0.12);
  const side = shade(base, -0.32);
  return (
    <g>
      <rect x="250" y={edgeY} width="500" height="20" fill={shade(base, -0.38)} />
      <rect x="244" y={edgeY} width="18" height={floorFront - edgeY} fill={leg} />
      <rect x="257" y={edgeY} width="5" height={floorFront - edgeY} fill={side} />
      <rect x="738" y={edgeY} width="18" height={floorFront - edgeY} fill={leg} />
      <rect x="738" y={edgeY} width="5" height={floorFront - edgeY} fill={side} />
    </g>
  );
};

const StandingFrame = ({ edgeY }: { edgeY: number }) => (
  <g>
    <rect x="312" y={edgeY + 6} width="376" height="10" rx="2" fill="#1f1f23" />
    {[300, 700].map((cx) => (
      <g key={cx}>
        <rect x={cx - 12} y={edgeY} width="24" height="112" rx="2" fill="#2b2b30" />
        <rect x={cx - 12} y={edgeY} width="6" height="112" fill="#fff" opacity="0.05" />
        <rect x={cx - 9} y={edgeY + 112} width="18" height={floorFront - edgeY - 124} fill="#3a3a41" />
        <polygon
          points={`${cx - 30},${floorFront - 12} ${cx + 30},${floorFront - 12} ${cx + 40},${floorFront} ${cx - 40},${floorFront}`}
          fill="#26262b"
        />
      </g>
    ))}
  </g>
);

const ScandiLegs = ({ edgeY, base }: { edgeY: number; base: string }) => (
  <g>
    <polygon points={`290,${edgeY} 300,${edgeY} 286,${floorBack} 279,${floorBack}`} fill="#a5825f" />
    <polygon points={`700,${edgeY} 710,${edgeY} 721,${floorBack} 714,${floorBack}`} fill="#a5825f" />
    <rect x="270" y={edgeY} width="460" height="7" fill={shade(base, -0.14)} />
    <polygon points={`262,${edgeY - 1} 277,${edgeY - 1} 252,${floorFront} 242,${floorFront}`} fill="#c9a27e" />
    <polygon points={`723,${edgeY - 1} 738,${edgeY - 1} 758,${floorFront} 748,${floorFront}`} fill="#c9a27e" />
  </g>
);

const SolidBack = ({ base, edgeY }: { base: string; edgeY: number }) => (
  <g>
    <rect x="292" y={frontY - 10} width="416" height="150" fill={shade(base, -0.55)} />
    <polygon points={`262,${edgeY} 292,330 292,${floorBack} 262,${floorFront}`} fill={shade(base, -0.42)} />
    <polygon points={`738,${edgeY} 708,330 708,${floorBack} 738,${floorFront}`} fill={shade(base, -0.42)} />
  </g>
);

const SolidFront = ({ base, edgeY }: { base: string; edgeY: number }) => (
  <g fill={shade(base, -0.1)}>
    <rect x="232" y={edgeY} width="30" height={floorFront - edgeY} />
    <rect x="738" y={edgeY} width="30" height={floorFront - edgeY} />
  </g>
);

export const DeskGhost = () => (
  <g fill="#fff" fillOpacity="0.02" stroke="#fff" strokeOpacity="0.22" strokeDasharray="8 6" strokeWidth="1.5">
    <polygon points={`${backLeft},${backY} ${backRight},${backY} ${frontRight},${frontY} ${frontLeft},${frontY}`} />
    <rect x={frontLeft} y={frontY} width={frontRight - frontLeft} height="14" />
    <line x1="252" y1="364" x2="252" y2={floorFront} />
    <line x1="748" y1="364" x2="748" y2={floorFront} />
  </g>
);
