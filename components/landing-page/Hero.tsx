"use client";

import { motion } from "framer-motion";
import { ChevronRight, Sparkles } from "lucide-react";
import Link from "next/link";

export const Hero = () => {
  return (
    <div className="flex flex-col items-center text-center gap-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-teal-500/10 border border-teal-500/20 text-teal-500 text-xs font-bold uppercase tracking-widest"
      >
        <Sparkles size={14} />
        Now available in Bali
      </motion.div>

      <motion.h1
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
        className="text-5xl lg:text-7xl font-bold tracking-tight max-w-4xl"
      >
        Your dream workspace, <br />
        <span className="text-teal-500 italic">delivered.</span>
      </motion.h1>

      <motion.p
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="text-zinc-400 text-lg lg:text-xl max-w-2xl leading-relaxed"
      >
        Don&apos;t just buy furniture. Build your perfect Bali office setup visually and rent it for as long as you need. No commitment, total comfort.
      </motion.p>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.3 }}
        className="flex flex-col sm:flex-row gap-4 mt-4 w-full sm:w-auto"
      >
        <Link href="/builder" className="w-full sm:w-56">
          <button className="cursor-pointer w-full px-8 py-4 bg-teal-500 hover:bg-teal-400 text-black font-extrabold rounded-2xl flex items-center justify-center gap-2 transition-all active:scale-[0.98] shadow-xl shadow-teal-500/20">
            Start Designing
            <ChevronRight size={20} />
          </button>
        </Link>
        <Link href="/how-it-works" className="w-full sm:w-56">
          <button className="cursor-pointer w-full px-8 py-4 bg-zinc-900 hover:bg-zinc-800 text-white font-extrabold rounded-2xl border border-white/5 transition-all">
            How it works
          </button>
        </Link>
      </motion.div>
    </div>
  );
};
