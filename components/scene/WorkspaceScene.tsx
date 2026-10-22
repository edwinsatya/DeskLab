"use client";

import { Category, Product, SceneMode } from "@/types";
import { AnimatePresence, motion, TargetAndTransition } from "framer-motion";
import { ReactNode, useId } from "react";
import { DeskMat, Lamp, LampLight, Mic, Plant } from "./Accessory";
import { Chair, ChairGhost } from "./Chair";
import { Desk, DeskGhost } from "./Desk";
import { SCENE_HEIGHT, SCENE_WIDTH } from "./layout";
import { Keyboard, Monitor, MonitorGhost } from "./Monitor";
import { Room } from "./Room";

interface WorkspaceSceneProps {
  selections: Record<Category, Product | null>;
  mode: SceneMode;
  /** Enables hover highlights, click-to-edit and empty-slot placeholders. */
  interactive?: boolean;
  hovered?: Category | null;
  onHover?: (category: Category | null) => void;
  onSelectCategory?: (category: Category) => void;
  className?: string;
}

interface ItemProps {
  uid: string;
  category: Category;
  from: TargetAndTransition;
  night: boolean;
  interactive: boolean;
  highlighted: boolean;
  dim?: boolean;
  onHover?: (category: Category | null) => void;
  onSelectCategory?: (category: Category) => void;
  children: ReactNode;
}

const SceneItem = ({
  uid,
  category,
  from,
  night,
  interactive,
  highlighted,
  dim = true,
  onHover,
  onSelectCategory,
  children,
}: ItemProps) => (
  <motion.g
    initial={{ opacity: 0, ...from }}
    animate={{ opacity: 1, x: 0, y: 0 }}
    exit={{ opacity: 0, ...from, transition: { duration: 0.18 } }}
    transition={{ type: "spring", stiffness: 260, damping: 24 }}
    onMouseEnter={interactive ? () => onHover?.(category) : undefined}
    onMouseLeave={interactive ? () => onHover?.(null) : undefined}
    onClick={interactive ? () => onSelectCategory?.(category) : undefined}
    style={{ cursor: interactive ? "pointer" : undefined }}
    filter={highlighted ? `url(#${uid}-hover)` : undefined}
  >
    <g filter={dim && night ? `url(#${uid}-dim)` : undefined}>{children}</g>
  </motion.g>
);

export const WorkspaceScene = ({
  selections,
  mode,
  interactive = false,
  hovered = null,
  onHover,
  onSelectCategory,
  className,
}: WorkspaceSceneProps) => {
  const uid = `scene${useId().replace(/[^a-zA-Z0-9]/g, "")}`;
  const night = mode === "night";
  const { desk, chair, monitor, accessory } = selections;
  const accessoryVariant = accessory?.variant;

  const itemProps = (category: Category) => ({
    uid,
    category,
    night,
    interactive,
    highlighted: interactive && hovered === category,
    onHover,
    onSelectCategory,
  });

  const label = [desk, chair, monitor, accessory]
    .filter(Boolean)
    .map((p) => p!.name)
    .join(", ");

  return (
    <svg
      viewBox={`0 0 ${SCENE_WIDTH} ${SCENE_HEIGHT}`}
      overflow="visible"
      preserveAspectRatio="xMidYMid meet"
      role="img"
      aria-label={label ? `Workspace preview with ${label}` : "Empty workspace preview"}
      className={className}
    >
      <defs>
        {[["blur", 6], ["blur-lg", 14], ["blur-xl", 30]].map(([name, dev]) => (
          <filter key={name} id={`${uid}-${name}`} x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation={dev} />
          </filter>
        ))}
        <filter id={`${uid}-hover`} x="-20%" y="-20%" width="140%" height="140%">
          <feDropShadow dx="0" dy="0" stdDeviation="5" floodColor="#2dd4bf" floodOpacity="0.8" />
        </filter>
        <filter id={`${uid}-dim`} colorInterpolationFilters="sRGB">
          <feColorMatrix type="matrix" values="0.55 0 0 0 0  0 0.58 0 0 0  0 0 0.74 0 0.01  0 0 0 1 0" />
        </filter>
        <linearGradient id={`${uid}-chrome`} x1="0" y1="0" x2="1" y2="0">
          <stop offset="0" stopColor="#3f3f46" />
          <stop offset="0.45" stopColor="#a1a1aa" />
          <stop offset="1" stopColor="#3f3f46" />
        </linearGradient>
        <linearGradient id={`${uid}-lamp-light`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#fde68a" stopOpacity="0.4" />
          <stop offset="1" stopColor="#fbbf24" stopOpacity="0" />
        </linearGradient>
        <linearGradient id={`${uid}-screen`} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#0b1220" />
          <stop offset="0.55" stopColor="#0d2a2d" />
          <stop offset="1" stopColor="#1f1a3d" />
        </linearGradient>
        <linearGradient id={`${uid}-pot`} x1="0" y1="0" x2="1" y2="0">
          <stop offset="0" stopColor="#f4f1ec" />
          <stop offset="1" stopColor="#c9c1b6" />
        </linearGradient>
        <pattern id={`${uid}-mesh`} width="5" height="5" patternUnits="userSpaceOnUse" patternTransform="rotate(45)">
          <line x1="0" y1="0" x2="0" y2="5" stroke="#000" strokeOpacity="0.3" strokeWidth="1.6" />
          <line x1="0" y1="0" x2="5" y2="0" stroke="#000" strokeOpacity="0.2" strokeWidth="1" />
        </pattern>
      </defs>

      <Room uid={uid} night={night} />

      <AnimatePresence>
        {desk ? (
          <SceneItem key={desk.id} {...itemProps("desk")} from={{ y: 24 }}>
            <Desk uid={uid} product={desk} />
          </SceneItem>
        ) : (
          interactive && (
            <SceneItem key="ghost-desk" {...itemProps("desk")} from={{}} dim={false}>
              <DeskGhost />
            </SceneItem>
          )
        )}
      </AnimatePresence>

      <AnimatePresence>
        {accessory && accessoryVariant === "mat" && (
          <SceneItem key={accessory.id} {...itemProps("accessory")} from={{ y: -10 }}>
            <DeskMat />
          </SceneItem>
        )}
        {accessory && accessoryVariant === "lamp" && (
          <motion.g key={`${accessory.id}-light`} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} pointerEvents="none">
            <LampLight uid={uid} night={night} />
          </motion.g>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {monitor ? (
          <SceneItem key={monitor.id} {...itemProps("monitor")} from={{ y: -28 }} dim={false}>
            <Monitor uid={uid} product={monitor} night={night} />
            <Keyboard />
          </SceneItem>
        ) : (
          interactive && (
            <SceneItem key="ghost-monitor" {...itemProps("monitor")} from={{}} dim={false}>
              <MonitorGhost />
            </SceneItem>
          )
        )}
      </AnimatePresence>

      <AnimatePresence>
        {accessory && (accessoryVariant === "lamp" || accessoryVariant === "mic") && (
          <SceneItem key={accessory.id} {...itemProps("accessory")} from={{ y: -24 }} dim={false}>
            {accessoryVariant === "lamp" ? <Lamp uid={uid} night={night} /> : <Mic />}
          </SceneItem>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {accessory && accessoryVariant === "plant" && (
          <SceneItem key={accessory.id} {...itemProps("accessory")} from={{ y: 20 }}>
            <Plant uid={uid} />
          </SceneItem>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {chair ? (
          <SceneItem key={chair.id} {...itemProps("chair")} from={{ x: 48 }}>
            <Chair uid={uid} product={chair} />
          </SceneItem>
        ) : (
          interactive && (
            <SceneItem key="ghost-chair" {...itemProps("chair")} from={{}} dim={false}>
              <ChairGhost />
            </SceneItem>
          )
        )}
      </AnimatePresence>
    </svg>
  );
};
