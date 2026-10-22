"use client";

import { PRODUCTS, SHOWCASE_PRESETS } from "@/constants";
import { formatPrice, getPricing, useStore } from "@/store/useStore";
import { Category, Product } from "@/types";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { WorkspaceScene } from "../scene/WorkspaceScene";

const presets = SHOWCASE_PRESETS.map((preset) => {
  const products = preset.productIds
    .map((id) => PRODUCTS.find((p) => p.id === id))
    .filter((p): p is Product => Boolean(p));
  const selections = { desk: null, chair: null, monitor: null, accessory: null, ...Object.fromEntries(products.map((p) => [p.category, p])) } as Record<Category, Product | null>;
  return { ...preset, products, selections, monthly: getPricing(selections, 1).monthly };
});

export const Showcase = () => {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const applySetup = useStore((s) => s.applySetup);
  const router = useRouter();
  const preset = presets[index];

  useEffect(() => {
    if (paused) return;
    const timer = setTimeout(() => setIndex((i) => (i + 1) % presets.length), 4200);
    return () => clearTimeout(timer);
  }, [index, paused]);

  const customize = () => {
    applySetup(preset.products, preset.mode);
    router.push("/builder");
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay: 0.35 }}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      className="relative mt-12 w-full max-w-5xl"
    >
      <div className="absolute -inset-x-10 -top-10 h-2/3 bg-teal-500/10 blur-[100px] pointer-events-none" />
      <div className="relative overflow-hidden rounded-[32px] lg:rounded-[40px] border border-white/10 bg-[#101013] shadow-2xl shadow-black/60">
        <div className="scene-stage relative overflow-hidden">
          <WorkspaceScene selections={preset.selections} mode={preset.mode} className="absolute inset-0 h-full w-full" />
        </div>
        <div className="pointer-events-none absolute inset-x-0 top-0 aspect-[1000/640] bg-[radial-gradient(ellipse_at_center,transparent_55%,rgba(0,0,0,0.55)_100%)]" />
        {/* Caption */}
        <div className="relative flex flex-col sm:flex-row sm:items-center gap-3 border-t border-white/10 bg-zinc-950/80 px-4 py-3.5 sm:px-6 sm:py-4 text-left">
          <motion.div key={preset.name} initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.25 }} className="min-w-0 flex-1">
            <p className="text-sm sm:text-base font-bold text-white">{preset.name}</p>
            <p className="text-xs text-zinc-400">
              {preset.vibe} · from <span className="text-teal-400 font-semibold">{formatPrice(preset.monthly)}/mo</span>
            </p>
          </motion.div>
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-1.5" role="tablist" aria-label="Example setups">
              {presets.map((p, i) => (
                <button
                  key={p.name}
                  role="tab"
                  aria-selected={i === index}
                  aria-label={p.name}
                  onClick={() => setIndex(i)}
                  className="cursor-pointer relative h-1.5 w-6 overflow-hidden rounded-full bg-white/15"
                >
                  {i === index && (
                    <motion.span
                      key={`${index}-${paused}`}
                      className="absolute inset-y-0 left-0 rounded-full bg-teal-400"
                      initial={{ width: paused ? "100%" : "0%" }}
                      animate={{ width: "100%" }}
                      transition={{ duration: paused ? 0 : 4.2, ease: "linear" }}
                    />
                  )}
                </button>
              ))}
            </div>
            <button
              onClick={customize}
              className="cursor-pointer ml-auto flex items-center gap-1.5 whitespace-nowrap rounded-xl bg-white px-3.5 py-2 text-xs font-bold text-black hover:bg-teal-400 transition-colors"
            >
              Customize this <ArrowRight size={14} />
            </button>
          </div>
        </div>
        <div className="absolute left-3 top-3 sm:left-5 sm:top-5 flex items-center gap-2 rounded-full border border-white/10 bg-black/50 px-3 py-1.5 backdrop-blur-md">
          <span className="h-1.5 w-1.5 rounded-full bg-teal-400" />
          <span className="text-[10px] sm:text-[11px] font-semibold text-zinc-200">Built in the DeskLab builder</span>
        </div>
      </div>
    </motion.div>
  );
};
