import { Category, Product } from "@/types";

// All scene geometry lives in a fixed 1000 × 640 coordinate space.
export const SCENE_WIDTH = 1000;
export const SCENE_HEIGHT = 640;
export const FLOOR_Y = 470;

export const DESK = {
  backY: 306,
  frontY: 350,
  backLeft: 262,
  backRight: 738,
  frontLeft: 230,
  frontRight: 770,
  floorFront: 590,
  floorBack: 548,
};

const ACCESSORY_ANCHORS: Record<string, [number, number]> = {
  lamp: [372, 178],
  plant: [142, 330],
  mic: [400, 170],
  mat: [500, 318],
};

const MONITOR_ANCHORS: Record<string, [number, number]> = {
  ultrawide: [500, 140],
  dual: [500, 146],
  single: [500, 140],
  portrait: [500, 54],
};

/** Where floating labels attach for each category, in scene coordinates. */
export const getAnchor = (category: Category, product: Product | null): [number, number] => {
  switch (category) {
    case "desk":
      return [500, 300];
    case "chair":
      return [800, product?.variant === "task" ? 340 : product?.variant === "lounge" ? 318 : 230];
    case "monitor":
      return MONITOR_ANCHORS[product?.variant ?? "single"] ?? MONITOR_ANCHORS.single;
    case "accessory":
      return ACCESSORY_ANCHORS[product?.variant ?? ""] ?? [318, 286];
  }
};

/** Converts scene coordinates to CSS percentages for HTML overlays. */
export const toPercent = ([x, y]: [number, number]) => ({
  left: `${(x / SCENE_WIDTH) * 100}%`,
  top: `${(y / SCENE_HEIGHT) * 100}%`,
});
