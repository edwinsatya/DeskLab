"use client";

import { Navbar } from "@/components/Navbar";
import { motion } from "framer-motion";
import { ChevronRight, Layout, Shield, Sparkles, Zap } from "lucide-react";
import Link from "next/link";

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-[#0F0F10] text-white font-sans selection:bg-teal-500/30 overflow-x-hidden">
      <Navbar />

      {/* Hero Section */}
      <main className="pt-32 pb-20 px-4 lg:px-8 max-w-7xl mx-auto flex flex-col items-center text-center gap-8">
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
          className="flex flex-col sm:flex-row gap-4 mt-4"
        >
          <Link href="/builder">
            <button className="px-8 py-4 bg-teal-500 hover:bg-teal-400 text-black font-extrabold rounded-2xl flex items-center justify-center gap-2 transition-all active:scale-[0.98] shadow-xl shadow-teal-500/20">
              Start Designing
              <ChevronRight size={20} />
            </button>
          </Link>
          <button className="px-8 py-4 bg-zinc-900 hover:bg-zinc-800 text-white font-extrabold rounded-2xl border border-white/5 transition-all">
            How it works
          </button>
        </motion.div>

        {/* Mockup Preview / Visual hint */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="mt-16 relative w-full aspect-video max-w-5xl rounded-[40px] overflow-hidden border border-white/5 bg-zinc-900/50 shadow-2xl group"
        >
          <div className="absolute inset-0 bg-linear-to-t from-[#0F0F10] via-transparent to-transparent z-10" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,var(--tw-gradient-stops))] from-teal-500/10 via-transparent to-transparent opacity-50" />
          
          {/* Stylized visual of the builder */}
          <div className="absolute inset-0 flex items-center justify-center p-12 opacity-40 group-hover:opacity-60 transition-opacity">
            <div className="w-[60%] h-4 bg-zinc-800 rounded-sm relative transform-[rotateX(10deg)]">
              <div className="absolute -top-32 left-1/2 -translate-x-1/2 w-48 h-32 bg-zinc-900 rounded-lg border border-white/10" />
            </div>
          </div>

          <div className="absolute bottom-12 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-4">
            <p className="text-zinc-500 text-sm font-medium">Interactive 3D Workspace Builder</p>
            <div className="flex gap-2">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="w-2 h-2 rounded-full bg-zinc-800" />
              ))}
            </div>
          </div>
        </motion.div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-24 text-left w-full">
          <div className="p-8 rounded-4xl bg-zinc-900/30 border border-white/5 flex flex-col gap-4">
            <div className="w-12 h-12 rounded-2xl bg-teal-500/10 flex items-center justify-center text-teal-500">
              <Layout size={24} />
            </div>
            <h3 className="text-xl font-bold">Visual Designer</h3>
            <p className="text-zinc-500 text-sm leading-relaxed">See your workspace come to life in our 3D mockup tool before you commit.</p>
          </div>
          <div className="p-8 rounded-4xl bg-zinc-900/30 border border-white/5 flex flex-col gap-4">
            <div className="w-12 h-12 rounded-2xl bg-purple-500/10 flex items-center justify-center text-purple-500">
              <Zap size={24} />
            </div>
            <h3 className="text-xl font-bold">Fast Delivery</h3>
            <p className="text-zinc-500 text-sm leading-relaxed">Landed in Bali today? Get your fully equipped office delivered by next week.</p>
          </div>
          <div className="p-8 rounded-4xl bg-zinc-900/30 border border-white/5 flex flex-col gap-4">
            <div className="w-12 h-12 rounded-2xl bg-blue-500/10 flex items-center justify-center text-blue-500">
              <Shield size={24} />
            </div>
            <h3 className="text-xl font-bold">Full Insurance</h3>
            <p className="text-zinc-500 text-sm leading-relaxed">Coffee spills or power surges—we&apos;ve got you covered with Auto insurance.</p>
          </div>
        </div>
      </main>

      <footer className="py-12 border-t border-white/5 text-center">
        <p className="text-zinc-600 text-xs font-medium tracking-widest uppercase">© 2026 DeskLab Bali. All rights reserved.</p>
      </footer>
    </div>
  );
}
