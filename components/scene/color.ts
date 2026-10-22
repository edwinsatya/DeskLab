const toRgb = (hex: string) => {
  const raw = hex.replace("#", "");
  const full = raw.length === 3 ? raw.split("").map((c) => c + c).join("") : raw;
  return [0, 2, 4].map((i) => parseInt(full.slice(i, i + 2), 16));
};

/** Mix a hex color toward white (amount > 0) or black (amount < 0). */
export const shade = (hex: string, amount: number) => {
  const target = amount < 0 ? 0 : 255;
  const p = Math.min(Math.abs(amount), 1);
  const [r, g, b] = toRgb(hex).map((c) => Math.round((target - c) * p + c));
  return `rgb(${r}, ${g}, ${b})`;
};

/** Perceived brightness from 0 (black) to 1 (white). */
export const luminance = (hex: string) => {
  const [r, g, b] = toRgb(hex);
  return (0.299 * r + 0.587 * g + 0.114 * b) / 255;
};
