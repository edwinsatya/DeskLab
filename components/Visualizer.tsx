"use client";

import { useStore } from "@/store/useStore";
import { AnimatePresence, motion } from "framer-motion";
import { Accessibility, Armchair, Monitor, Table } from "lucide-react";

export const Visualizer = () => {
  const { selections } = useStore();

  return (
    <div className="hidden md:flex flex-1 relative bg-[#0a0a0b] rounded-[40px] border border-white/5 overflow-hidden group min-h-125 lg:min-h-0 perspective-distant transform-3d">
      {/* Background Scene - Room Mockup */}
      <div className="absolute inset-0 bg-linear-to-b from-zinc-800/10 to-black/60" />
      {/* Floor Grid with Perspective */}
      <div className="absolute bottom-0 left-0 right-0 h-[40%] bg-zinc-900/20 border-t border-white/5 transform-[rotateX(60deg)] origin-bottom overflow-hidden">
        <div className="absolute inset-0 opacity-[0.05]" 
          style={{ backgroundImage: 'linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)', backgroundSize: '40px 40px' }} />
      </div>

      {/* Lighting effects */}
      <div className="absolute top-0 left-1/4 w-1/2 h-full bg-teal-500/5 blur-[120px] pointer-events-none" />
      
      {/* Mockup Composition */}
      <div className="absolute inset-0 flex items-center justify-center p-8 lg:p-12">
        <div className="relative w-full h-full max-w-5xl flex items-center justify-center transform-3d">
          
          <AnimatePresence mode="popLayout">
            {/* Desk - CSS Version */}
            {selections.desk && (
              <motion.div
                key={selections.desk.id}
                initial={{ opacity: 0, scale: 0.8, y: 100 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.8, y: 50 }}
                className="absolute bottom-[20%] w-[70%] h-4 z-10 transform-3d"
              >
                {/* Desk Surface */}
                <div 
                  className="absolute inset-0 rounded-sm shadow-2xl transition-colors duration-500"
                  style={{ backgroundColor: selections.desk.color, transform: 'rotateX(10deg)' }}
                >
                  {/* Depth effect */}
                  <div className="absolute -bottom-2 inset-x-0 h-2 bg-black/40 rounded-b-sm origin-top transform-[rotateX(-90deg)]" />
                  {/* Highlight */}
                  <div className="absolute top-0 inset-x-0 h-px bg-white/20" />
                </div>

                {/* Desk Legs */}
                <div className="absolute top-full left-[10%] w-1.5 h-48 bg-zinc-800 origin-top transform-[rotateX(-10deg)]" />
                <div className="absolute top-full right-[10%] w-1.5 h-48 bg-zinc-800 origin-top transform-[rotateX(-10deg)]" />
                <div className="absolute top-full left-[15%] w-1.5 h-48 bg-zinc-900/50 origin-top transform-[translateZ(-20px)_rotateX(-10deg)]" />
                <div className="absolute top-full right-[15%] w-1.5 h-48 bg-zinc-900/50 origin-top transform-[translateZ(-20px)_rotateX(-10deg)]" />
                {/* Content ON Desk */}
                <div className="absolute -top-1 inset-0 transform-3d">
                  {/* Monitor - CSS Version */}
                  {selections.monitor && (
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: -140 }}
                      className={`absolute left-1/2 -translate-x-1/2 flex flex-col items-center ${
                        selections.monitor.variant === 'ultrawide' ? 'w-80 h-48' : 
                        selections.monitor.variant === 'portrait' ? 'w-32 h-64' : 'w-64 h-48'
                      }`}
                    >
                      {/* Monitor Frame */}
                      <div className={`relative w-full h-full bg-zinc-900 rounded-xl p-1.5 shadow-2xl border border-white/5 overflow-hidden ${
                        selections.monitor.variant === 'dual' ? 'flex gap-1 bg-transparent border-0 p-0' : ''
                      }`}>
                        {selections.monitor.variant === 'dual' ? (
                          <>
                            <div className="flex-1 bg-zinc-900 rounded-lg p-1 border border-white/5 relative overflow-hidden">
                              <div className="w-full h-full rounded-md bg-zinc-950 flex items-center justify-center relative overflow-hidden">
                                <div className="absolute inset-0 bg-linear-to-br from-teal-500/10 to-transparent opacity-30" />
                                <div className="text-[8px] font-mono text-teal-500/30">01</div>
                              </div>
                            </div>
                            <div className="flex-1 bg-zinc-900 rounded-lg p-1 border border-white/5 relative overflow-hidden">
                              <div className="w-full h-full rounded-md bg-zinc-950 flex items-center justify-center relative overflow-hidden">
                                <div className="absolute inset-0 bg-linear-to-br from-purple-500/10 to-transparent opacity-30" />
                                <div className="text-[8px] font-mono text-teal-500/30">02</div>
                              </div>
                            </div>
                          </>
                        ) : (
                          <div className="w-full h-full rounded-lg bg-zinc-950 flex items-center justify-center overflow-hidden relative group/screen">
                            <div className="absolute inset-0 bg-linear-to-br from-teal-500/20 via-transparent to-purple-500/20 opacity-50" />
                            <div className="text-[10px] font-mono text-teal-500/40 select-none uppercase">
                              {selections.monitor.variant === 'ultrawide' ? '<ULTRAWIDE_OS />' : selections.monitor.variant === 'portrait' ? '<PORTRAIT />' : '<SINGLE_DISPLAY />'}
                            </div>
                            {/* Scanline effect */}
                            <div className="absolute inset-0 bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.1)_50%),linear-gradient(90deg,rgba(255,0,0,0.03),rgba(0,255,0,0.01),rgba(0,0,255,0.03))] bg-size-[100%_2px,3px_100%] pointer-events-none" />
                          </div>
                        )}
                      </div>
                      {/* Monitor Stand */}
                      <div className="w-4 h-12 bg-zinc-800" />
                      <div className="w-24 h-1 bg-zinc-900 rounded-full" />
                    </motion.div>
                  )}

                  {/* Accessory - CSS Version */}
                  {selections.accessory && (
                    <motion.div
                      initial={{ opacity: 0, scale: 0 }}
                      animate={{ opacity: 1, scale: 1, x: 180, y: -40 }}
                      className="absolute left-1/2"
                    >
                      {selections.accessory.variant === 'lamp' ? (
                        <div className="relative">
                          <div className="w-1.5 h-20 bg-zinc-700 -rotate-12 origin-bottom" />
                          <div className="absolute -top-4 -left-4 w-12 h-8 bg-zinc-800 rounded-full rotate-45 border border-white/10 shadow-[0_0_40px_rgba(20,184,166,0.3)]">
                            <div className="absolute inset-0 bg-teal-500/20 rounded-full blur-md" />
                          </div>
                        </div>
                      ) : selections.accessory.variant === 'plant' ? (
                        <div className="relative">
                          <div className="w-12 h-14 bg-zinc-800 rounded-b-xl rounded-t-sm" />
                          <div className="absolute -top-8 left-1/2 -translate-x-1/2 flex gap-1">
                            <div className="w-1 h-12 bg-green-500/40 rounded-full rotate-12 origin-bottom blur-[1px]" />
                            <div className="w-1.5 h-14 bg-green-600/40 rounded-full -rotate-6 origin-bottom blur-[1px]" />
                            <div className="w-1 h-10 bg-green-500/40 rounded-full rotate-45 origin-bottom blur-[1px]" />
                          </div>
                        </div>
                      ) : selections.accessory.variant === 'mic' ? (
                        <div className="relative">
                          <div className="w-1 h-16 bg-zinc-700" />
                          <div className="absolute -top-6 -left-3 w-8 h-10 bg-zinc-800 rounded-full border border-white/10" />
                          <div className="absolute -top-2 left-1/2 -translate-x-1/2 w-4 h-1 bg-red-500 animate-pulse" />
                        </div>
                      ) : (
                        /* Tech Mat */
                        <div className="absolute top-10 -left-64 w-[320px] h-32 bg-zinc-800/40 rounded-md border border-white/5 -z-10" />
                      )}
                    </motion.div>
                  )}
                </div>
              </motion.div>
            )}

            {/* Chair - CSS Version */}
            {selections.chair && (
              <motion.div
                key={selections.chair.id}
                initial={{ opacity: 0, x: -100, z: 200 }}
                animate={{ opacity: 1, x: -140, y: 100, z: 300, rotateY: 20 }}
                exit={{ opacity: 0, x: -50 }}
                className="absolute bottom-[5%] left-1/2 w-48 h-64 z-30 transform-3d"
              >
                {/* Backrest */}
                <div 
                  className="top-0 inset-x-4 h-40 rounded-t-3xl border border-white/5 shadow-2xl relative overflow-hidden transition-colors duration-500"
                  style={{ backgroundColor: selections.chair.color }}
                >
                  <div className="absolute inset-x-2 top-4 bottom-2 bg-black/20 rounded-xl" />
                </div>
                {/* Seat */}
                <div 
                  className="absolute top-40 inset-x-0 h-8 rounded-xl shadow-2xl border-b border-white/10 transition-colors duration-500"
                  style={{ backgroundColor: selections.chair.color }}
                />
                {/* Stand */}
                <div className="absolute top-48 left-1/2 -translate-x-1/2 w-4 h-16 bg-zinc-800" />
                {/* Base */}
                <div className="absolute bottom-0 left-1/2 -translate-x-1/2 flex gap-4">
                  <div className="w-12 h-1.5 bg-zinc-900 rounded-full rotate-12" />
                  <div className="w-12 h-1.5 bg-zinc-900 rounded-full -rotate-12" />
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex items-center gap-3 px-6 py-3 bg-black/60 backdrop-blur-xl rounded-full border border-white/10 text-sm text-zinc-300 shadow-2xl z-50">
        <span className="flex items-center gap-1.5 whitespace-nowrap"><Table size={14}/> {selections.desk?.name || "No desk"}</span>
        <div className="w-px h-4 bg-white/10" />
        <span className="flex items-center gap-1.5 whitespace-nowrap"><Armchair size={14}/> {selections.chair?.name || "No chair"}</span>
        <div className="w-px h-4 bg-white/10" />
        <span className="flex items-center gap-1.5 whitespace-nowrap"><Monitor size={14}/> {selections.monitor?.name || "No monitor"}</span>
        <div className="w-px h-4 bg-white/10" />
        <span className="flex items-center gap-1.5 whitespace-nowrap"><Accessibility size={14}/> {selections.accessory?.name || "No accessory"}</span>
      </div>
    </div>
  );
};
