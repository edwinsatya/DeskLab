"use client";

import { motion } from "framer-motion";
import { Layout, Shield, Zap } from "lucide-react";

const FEATURES = [
  {
    icon: Layout,
    title: "Visual Designer",
    description: "See your workspace come to life in our live room preview before you commit.",
    color: "text-teal-500",
    bg: "bg-teal-500/10",
  },
  {
    icon: Zap,
    title: "Fast Delivery",
    description: "Landed in Bali today? Get your fully equipped office delivered and assembled within 24 hours.",
    color: "text-purple-500",
    bg: "bg-purple-500/10",
  },
  {
    icon: Shield,
    title: "Full Insurance",
    description: "Coffee spills or power surges—we've got you covered with Shiny insurance.",
    color: "text-blue-500",
    bg: "bg-blue-500/10",
  },
];

export const Features = () => {
  return (
    <section className="mt-28 w-full text-left">
      <div className="text-center mb-12">
        <p className="text-xs font-bold uppercase tracking-widest text-teal-500">Why DeskLab</p>
        <h2 className="mt-2 text-3xl lg:text-4xl font-bold tracking-tight">Everything you need to work from paradise.</h2>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {FEATURES.map((feature, i) => (
          <motion.div
            key={feature.title}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.5, delay: i * 0.1 }}
            className="p-8 rounded-4xl bg-zinc-900/30 border border-white/5 flex flex-col gap-4 transition-colors hover:border-white/10 hover:bg-zinc-900/50"
          >
            <div className={`w-12 h-12 rounded-2xl ${feature.bg} flex items-center justify-center ${feature.color}`}>
              <feature.icon size={24} />
            </div>
            <h3 className="text-xl font-bold">{feature.title}</h3>
            <p className="text-zinc-500 text-sm leading-relaxed">{feature.description}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
};
