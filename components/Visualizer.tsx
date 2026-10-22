"use client";

import { CATEGORIES } from "@/constants";
import { focusPicker, formatPrice, useStore } from "@/store/useStore";
import { Category, Product } from "@/types";
import { AnimatePresence, motion } from "framer-motion";
import { Moon, MousePointerClick, Plus, RotateCcw, Sparkles, Sun } from "lucide-react";
import { useEffect, useState } from "react";
import { getAnchor, toPercent } from "./scene/layout";
import { WorkspaceScene } from "./scene/WorkspaceScene";

interface Flash {
  key: number;
  category: Category;
  product: Product;
}

export const Visualizer = () => {
  const selections = useStore((s) => s.selections);
  const activeTab = useStore((s) => s.activeTab);
  const sceneMode = useStore((s) => s.sceneMode);
  const setSceneMode = useStore((s) => s.setSceneMode);
  const resetStore = useStore((s) => s.resetStore);
  const isChatOpen = useStore((s) => s.isChatOpen);
  const setChatOpen = useStore((s) => s.setChatOpen);
  const [hovered, setHovered] = useState<Category | null>(null);
  const [flash, setFlash] = useState<Flash | null>(null);

  // Pop a short label over whatever was just added or swapped.
  useEffect(
    () =>
      useStore.subscribe((state, prev) => {
        for (const { id } of CATEGORIES) {
          const next = state.selections[id];
          if (next && next.id !== prev.selections[id]?.id) {
            setFlash({ key: Date.now(), category: id, product: next });
          }
        }
      }),
    []
  );

  useEffect(() => {
    if (!flash) return;
    const timer = setTimeout(() => setFlash(null), 1800);
    return () => clearTimeout(timer);
  }, [flash]);

  const filled = CATEGORIES.filter(({ id }) => selections[id]).length;
  const hoveredProduct = hovered ? selections[hovered] : null;
  const emptySlots = CATEGORIES.filter(({ id }) => !selections[id]);

  return (
    <section
      aria-label="Workspace preview"
      className="relative flex flex-col rounded-4xl border border-white/5 bg-[#101013] overflow-hidden lg:flex-1 lg:min-h-0 shadow-2xl shadow-black/40"
    >
      {/* Toolbar */}
      <div className="relative z-20 flex items-center justify-between gap-3 px-4 pt-4 lg:px-5 lg:pt-5">
        <div className="flex items-center gap-2 rounded-full bg-black/40 backdrop-blur-md border border-white/10 pl-2.5 pr-3 py-1.5">
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-teal-400 opacity-60" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-teal-400" />
          </span>
          <span className="text-[11px] font-semibold text-zinc-200">Live preview</span>
          <span className="text-[11px] text-zinc-500 tabular-nums">· {filled}/4 pieces</span>
        </div>

        <div className="flex items-center gap-2">
          <div role="radiogroup" aria-label="Lighting" className="flex items-center rounded-full bg-black/40 backdrop-blur-md border border-white/10 p-1">
            {(["day", "night"] as const).map((mode) => {
              const Icon = mode === "day" ? Sun : Moon;
              const active = sceneMode === mode;
              return (
                <button
                  key={mode}
                  role="radio"
                  aria-checked={active}
                  aria-label={mode === "day" ? "Golden hour lighting" : "Night lighting"}
                  title={mode === "day" ? "Golden hour" : "Night"}
                  onClick={() => setSceneMode(mode)}
                  className={`cursor-pointer relative flex h-7 w-7 items-center justify-center rounded-full transition-colors ${
                    active ? "text-black" : "text-zinc-400 hover:text-white"
                  }`}
                >
                  {active && (
                    <motion.span layoutId="scene-mode" className="absolute inset-0 rounded-full bg-teal-400" transition={{ type: "spring", stiffness: 400, damping: 30 }} />
                  )}
                  <Icon size={14} className="relative" />
                </button>
              );
            })}
          </div>
          <button
            onClick={() => setChatOpen(!isChatOpen)}
            aria-expanded={isChatOpen}
            className={`cursor-pointer hidden lg:flex h-9 items-center gap-1.5 rounded-full border px-3.5 text-xs font-bold transition-colors ${
              isChatOpen ? "border-teal-400 bg-teal-400 text-black" : "border-teal-500/30 bg-teal-500/10 text-teal-300 hover:bg-teal-500/20"
            }`}
          >
            <Sparkles size={14} /> Ask AI
          </button>
          <button
            onClick={resetStore}
            title="Reset to starter setup"
            aria-label="Reset to starter setup"
            className="cursor-pointer flex h-9 w-9 items-center justify-center rounded-full bg-black/40 backdrop-blur-md border border-white/10 text-zinc-400 hover:text-white hover:border-white/20 transition-colors"
          >
            <RotateCcw size={14} />
          </button>
        </div>
      </div>

      {/* Scene */}
      <div className="scene-frame relative flex-1 min-h-0 flex items-center justify-center pb-3 sm:pb-0 lg:-mt-14">
        <div className="scene-stage scene-stage-fit relative">
          <WorkspaceScene
            selections={selections}
            mode={sceneMode}
            interactive
            hovered={hovered}
            onHover={setHovered}
            onSelectCategory={focusPicker}
            className="absolute inset-0 h-full w-full"
          />

          {/* Add buttons for empty slots */}
          {emptySlots.map(({ id, label }) => (
            <button
              key={id}
              onClick={() => focusPicker(id)}
              onMouseEnter={() => setHovered(id)}
              onMouseLeave={() => setHovered(null)}
              style={toPercent(getAnchor(id, null))}
              className={`cursor-pointer absolute -translate-x-1/2 -translate-y-1/2 z-10 flex items-center gap-1 whitespace-nowrap rounded-full border border-dashed px-2.5 py-1 text-[10px] sm:text-[11px] font-semibold backdrop-blur-md transition-colors ${
                activeTab === id
                  ? "border-teal-400/70 bg-teal-500/15 text-teal-300"
                  : "border-white/25 bg-black/50 text-zinc-300 hover:border-teal-400/60 hover:text-teal-300"
              }`}
            >
              <Plus size={12} />
              <span className="hidden sm:inline">Add {label.toLowerCase()}</span>
              <span className="sm:hidden">{label}</span>
            </button>
          ))}

          {/* Hover tooltip */}
          <AnimatePresence>
            {hoveredProduct && hovered && flash?.category !== hovered && (
              <motion.div
                key={hovered}
                initial={{ opacity: 0, y: 4 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 4 }}
                transition={{ duration: 0.12 }}
                style={toPercent(getAnchor(hovered, hoveredProduct))}
                className="pointer-events-none absolute z-20 -translate-x-1/2 -translate-y-full"
              >
                <div className="mb-2 flex items-center gap-2 whitespace-nowrap rounded-xl border border-white/10 bg-zinc-950/90 px-3 py-1.5 shadow-xl backdrop-blur-md">
                  <span className="text-[11px] font-semibold text-white">{hoveredProduct.name}</span>
                  <span className="text-[11px] text-zinc-500">{formatPrice(hoveredProduct.price)}/mo</span>
                  <span className="hidden sm:flex items-center gap-1 text-[10px] text-teal-400">
                    <MousePointerClick size={11} /> Swap
                  </span>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* "Just added" label */}
          <AnimatePresence>
            {flash && (
              <motion.div
                key={flash.key}
                initial={{ opacity: 0, y: 10, scale: 0.9 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ type: "spring", stiffness: 380, damping: 26 }}
                style={toPercent(getAnchor(flash.category, flash.product))}
                className="pointer-events-none absolute z-30 -translate-x-1/2 -translate-y-full"
              >
                <div className="mb-2 flex items-center gap-1.5 whitespace-nowrap rounded-full bg-teal-400 px-3 py-1.5 text-[11px] font-bold text-black shadow-lg shadow-teal-500/30">
                  <Plus size={12} strokeWidth={3} />
                  {flash.product.name}
                  <span className="font-semibold text-black/60">{formatPrice(flash.product.price)}/mo</span>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_55%,rgba(0,0,0,0.55)_100%)]" />
      </div>

      {/* Legend */}
      <div className="relative z-20 hidden sm:block px-3 pb-3 lg:px-5 lg:pb-5">
        <div className="flex gap-1.5 overflow-x-auto no-scrollbar rounded-2xl border border-white/10 bg-black/50 backdrop-blur-xl p-1.5">
          {CATEGORIES.map(({ id, label, icon: Icon }) => {
            const item = selections[id];
            const active = activeTab === id;
            return (
              <button
                key={id}
                onClick={() => focusPicker(id)}
                onMouseEnter={() => setHovered(id)}
                onMouseLeave={() => setHovered(null)}
                className={`cursor-pointer flex min-w-0 flex-1 basis-0 items-center gap-2 rounded-xl px-2.5 py-2 text-left transition-colors ${
                  active ? "bg-white/10" : "hover:bg-white/5"
                }`}
              >
                <span
                  className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-lg ${
                    item ? "bg-teal-500/15 text-teal-400" : "border border-dashed border-white/15 text-zinc-500"
                  }`}
                >
                  <Icon size={14} />
                </span>
                <span className="min-w-0 hidden sm:block">
                  <span className="block text-[9px] font-bold uppercase tracking-widest text-zinc-500">{label}</span>
                  <span className={`block truncate text-xs font-medium ${item ? "text-zinc-100" : "text-zinc-500"}`}>
                    {item?.name ?? "Not picked"}
                  </span>
                </span>
              </button>
            );
          })}
        </div>
      </div>
    </section>
  );
};
