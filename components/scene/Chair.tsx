import { Product } from "@/types";
import { shade } from "./color";

interface ChairProps {
  uid: string;
  product: Product;
}

const CX = 800;
const FRAME = "#232327";

const Base = ({ uid, chrome }: { uid: string; chrome: boolean }) => {
  const leg = chrome ? "#6b6b74" : "#1d1d21";
  const feet: [number, number][] = [[712, 616], [888, 616], [750, 632], [850, 632]];
  return (
    <g>
      <ellipse cx={CX} cy="630" rx="108" ry="12" fill="#000" opacity="0.55" filter={`url(#${uid}-blur)`} />
      <rect x="793" y="520" width="14" height="80" fill={`url(#${uid}-chrome)`} />
      <rect x="790" y="562" width="20" height="38" rx="4" fill="#1b1b1f" />
      <g stroke={leg} strokeWidth="9" strokeLinecap="round">
        {feet.map(([x, y]) => (
          <line key={x} x1={CX} y1="600" x2={x} y2={y - 6} />
        ))}
      </g>
      <g stroke="#fff" strokeOpacity={chrome ? 0.35 : 0.1} strokeWidth="2" strokeLinecap="round">
        {feet.map(([x, y]) => (
          <line key={x} x1={CX} y1="597" x2={x} y2={y - 9} />
        ))}
      </g>
      <ellipse cx={CX} cy="599" rx="15" ry="6" fill="#2a2a2f" />
      {feet.map(([x, y]) => (
        <circle key={x} cx={x} cy={y} r="7" fill="#0f0f12" stroke="#2a2a2f" />
      ))}
    </g>
  );
};

const Seat = ({ color, x = 712, w = 176 }: { color: string; x?: number; w?: number }) => (
  <g>
    <rect x="760" y="512" width="80" height="14" rx="4" fill="#1b1b1f" />
    <rect x={x} y="486" width={w} height="34" rx="15" fill={shade(color, -0.28)} />
    <rect x={x + 8} y="487" width={w - 16} height="4" rx="2" fill="#fff" opacity="0.08" />
  </g>
);

const Armrests = ({ color = "#1d1d21", chunky = false }: { color?: string; chunky?: boolean }) => (
  <g>
    {[714, 876].map((x) => (
      <g key={x}>
        <rect x={x} y="448" width={chunky ? 12 : 9} height="46" fill={FRAME} />
        <rect x={x - (chunky ? 12 : 10)} y="440" width={chunky ? 36 : 30} height={chunky ? 12 : 10} rx="5" fill={color} />
      </g>
    ))}
  </g>
);

export const Chair = ({ uid, product }: ChairProps) => {
  const color = product.color ?? "#4A4A4A";
  const rim = shade(color, 0.3);
  const variant = product.variant ?? "ergo";

  if (variant === "gaming") {
    const back =
      "M748,505 C742,470 752,430 748,410 C740,380 732,350 736,316 C738,290 756,276 770,272 L770,248 Q770,236 782,236 L818,236 Q830,236 830,248 L830,272 C844,276 862,290 864,316 C868,350 860,380 852,410 C848,430 858,470 852,505 Q850,514 840,514 L760,514 Q750,514 748,505 Z";
    return (
      <g>
        <Base uid={uid} chrome={false} />
        <Seat color={color} />
        <Armrests chunky />
        <path d={back} fill={color} stroke={rim} strokeOpacity="0.6" strokeWidth="1.5" />
        <g fill="none" stroke="#14b8a6" strokeWidth="3" strokeLinecap="round" opacity="0.9">
          <path d="M757,500 C752,470 760,430 756,410 C749,382 742,352 746,318" />
          <path d="M843,500 C848,470 840,430 844,410 C851,382 858,352 854,318" />
        </g>
        <g stroke={shade(color, 0.18)} strokeOpacity="0.6">
          {[330, 365, 400].map((y) => (
            <line key={y} x1="772" y1={y} x2="828" y2={y} />
          ))}
        </g>
        <rect x="772" y="430" width="56" height="26" rx="11" fill={shade(color, 0.12)} />
        <rect x="783" y="252" width="11" height="22" rx="5" fill="#0c0c0f" />
        <rect x="806" y="252" width="11" height="22" rx="5" fill="#0c0c0f" />
      </g>
    );
  }

  if (variant === "task") {
    return (
      <g>
        <Base uid={uid} chrome={false} />
        <Seat color={color} x={722} w={156} />
        <rect x="794" y="470" width="12" height="44" fill={FRAME} />
        <rect x="748" y="352" width="104" height="128" rx="36" fill={color} stroke={rim} strokeOpacity="0.5" strokeWidth="1.5" />
        <rect x="758" y="362" width="84" height="108" rx="28" fill={shade(color, -0.14)} />
        <path d="M762,430 Q800,446 838,430" fill="none" stroke={shade(color, 0.2)} strokeWidth="3" strokeLinecap="round" opacity="0.7" />
        <rect x="758" y="362" width="84" height="8" rx="4" fill="#fff" opacity="0.08" />
      </g>
    );
  }

  if (variant === "lounge") {
    return (
      <g>
        <Base uid={uid} chrome />
        <Seat color={color} x={706} w={188} />
        {[702, 872].map((x) => (
          <rect key={x} x={x} y="436" width="26" height="78" rx="12" fill={shade(color, -0.18)} />
        ))}
        <path
          d="M720,500 L720,384 Q720,330 800,330 Q880,330 880,384 L880,500 Q880,512 868,512 L732,512 Q720,512 720,500 Z"
          fill={color}
          stroke={rim}
          strokeOpacity="0.5"
          strokeWidth="1.5"
        />
        <g stroke={shade(color, -0.3)} strokeWidth="2.5" strokeLinecap="round">
          {[750, 775, 800, 825, 850].map((x) => (
            <line key={x} x1={x} y1={x === 800 ? 340 : 350} x2={x} y2="502" />
          ))}
        </g>
        <path d="M728,384 Q728,338 800,338 Q872,338 872,384" fill="none" stroke="#fff" strokeOpacity="0.12" strokeWidth="3" />
      </g>
    );
  }

  // ergo (mesh with headrest)
  return (
    <g>
      <Base uid={uid} chrome={false} />
      <Seat color={color} />
      <Armrests />
      <rect x="792" y="484" width="16" height="32" fill={FRAME} />
      <rect x="795" y="268" width="10" height="36" fill={FRAME} />
      <rect x="764" y="242" width="72" height="32" rx="14" fill={shade(color, -0.1)} stroke={rim} strokeOpacity="0.5" />
      <rect x="738" y="300" width="124" height="192" rx="32" fill={shade(color, -0.32)} stroke={rim} strokeOpacity="0.5" strokeWidth="1.5" />
      <rect x="745" y="307" width="110" height="178" rx="26" fill={color} />
      <rect x="745" y="307" width="110" height="178" rx="26" fill={`url(#${uid}-mesh)`} />
      <rect x="745" y="420" width="110" height="16" rx="8" fill={shade(color, -0.2)} />
    </g>
  );
};

export const ChairGhost = () => (
  <g fill="#fff" fillOpacity="0.02" stroke="#fff" strokeOpacity="0.22" strokeDasharray="8 6" strokeWidth="1.5">
    <rect x="738" y="300" width="124" height="192" rx="32" />
    <rect x="712" y="492" width="176" height="28" rx="14" />
    <line x1="800" y1="522" x2="800" y2="600" />
    <line x1="720" y1="612" x2="880" y2="612" />
  </g>
);
