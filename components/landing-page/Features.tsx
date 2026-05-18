"use client";

import { Layout, Shield, Zap } from "lucide-react";

export const Features = () => {
  return (
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
        <p className="text-zinc-500 text-sm leading-relaxed">Coffee spills or power surges—we&apos;ve got you covered with Shiny insurance.</p>
      </div>
    </div>
  );
};
