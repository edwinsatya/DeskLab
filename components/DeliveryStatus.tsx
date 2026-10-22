"use client";

import { DELIVERY_STEPS } from "@/constants";
import { formatPrice, getPricing, useStore } from "@/store/useStore";
import { Product } from "@/types";
import { motion } from "framer-motion";
import { Check, Home, Plus } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

interface DeliveryStatusProps {
  onReset: () => void;
}

export const DeliveryStatus = ({ onReset }: DeliveryStatusProps) => {
  const steps = DELIVERY_STEPS;
  const selections = useStore((s) => s.selections);
  const rentalMonths = useStore((s) => s.rentalMonths);
  const pricing = getPricing(selections, rentalMonths);
  const items = Object.values(selections).filter((item): item is Product => item !== null);
  const currentIndex = steps.findIndex((step) => step.status === "current");

  return (
    <div className="min-h-screen bg-[#0F0F10] text-white flex items-center justify-center p-4 lg:p-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-xl w-full bg-zinc-900 border border-white/5 p-6 lg:p-10 rounded-[40px] shadow-2xl"
      >
        <div className="flex flex-col items-center text-center mb-8">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", stiffness: 260, damping: 16, delay: 0.1 }}
            className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-teal-500 shadow-[0_0_40px_rgba(20,184,166,0.35)]"
          >
            <Check size={30} strokeWidth={3} className="text-black" />
          </motion.div>
          <h1 className="text-3xl font-bold italic tracking-tight">Bali awaits.</h1>
          <p className="mt-2 text-sm text-zinc-400">Payment received. Your setup is being prepped for delivery.</p>
        </div>

        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-lg font-bold text-teal-400">Track order</h2>
            <p className="text-zinc-500 text-xs font-bold uppercase tracking-widest mt-0.5">Order #DL-88291</p>
          </div>
          <div className="px-3 py-1 bg-teal-500/10 border border-teal-500/20 rounded-full">
            <span className="text-teal-500 text-[10px] font-bold uppercase tracking-wider">In progress</span>
          </div>
        </div>

        <div className="relative flex flex-col gap-6">
          {/* Progress line connecting steps */}
          <div className="absolute left-6 top-6 bottom-6 w-px bg-zinc-800" />
          <motion.div
            initial={{ height: 0 }}
            // 48px icon + 24px gap per step
            animate={{ height: currentIndex * 72 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="absolute left-6 top-6 w-px bg-teal-500"
          />

          {steps.map((step, i) => (
            <motion.div
              key={step.title}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 + i * 0.15 }}
              className="flex gap-5 relative z-10"
            >
              <div className={`relative w-12 h-12 rounded-2xl flex items-center justify-center shrink-0 shadow-lg ${
                step.status === "completed" ? "bg-teal-500 text-black" :
                step.status === "current" ? "bg-zinc-800 text-teal-500 border border-teal-500/40" :
                "bg-zinc-900 text-zinc-700 border border-white/5"
              }`}>
                {step.status === "current" && <span className="absolute inset-0 rounded-2xl border border-teal-500/50 animate-ping" />}
                <step.icon size={20} />
              </div>
              <div className="flex flex-col justify-center">
                <h3 className={`font-bold text-base ${step.status === "pending" ? "text-zinc-600" : "text-zinc-200"}`}>
                  {step.title}
                </h3>
                <p className="text-zinc-500 text-xs mt-0.5">{step.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="mt-8 p-4 bg-zinc-800/30 rounded-3xl border border-white/5 flex items-center gap-4">
          <div className="flex -space-x-2">
            {items.map((item) => (
              <span key={item.id} className="relative h-9 w-9 overflow-hidden rounded-full border-2 border-zinc-900 bg-zinc-800">
                <Image src={item.image} alt={item.name} fill sizes="36px" className="object-cover" />
              </span>
            ))}
          </div>
          <div className="flex-1 min-w-0">
            <span className="block text-[10px] text-zinc-500 uppercase font-bold tracking-widest">Est. delivery</span>
            <span className="block text-sm font-bold text-zinc-200">Today, 4:00 PM</span>
          </div>
          <div className="text-right">
            <span className="block text-[10px] text-zinc-500 uppercase font-bold tracking-widest">{rentalMonths} mo plan</span>
            <span className="block text-sm font-bold text-teal-400 tabular-nums">{formatPrice(pricing.monthly)}/mo</span>
          </div>
        </div>

        <div className="mt-4 grid grid-cols-2 gap-3">
          <Link
            href="/"
            onClick={onReset}
            className="flex items-center justify-center gap-2 py-3 bg-zinc-800 hover:bg-zinc-700 text-white text-sm font-bold rounded-2xl transition-all border border-white/5"
          >
            <Home size={16} /> Home
          </Link>
          <button
            onClick={onReset}
            className="cursor-pointer flex items-center justify-center gap-2 py-3 bg-teal-500 hover:bg-teal-400 text-black text-sm font-bold rounded-2xl transition-all"
          >
            <Plus size={16} /> New setup
          </button>
        </div>
      </motion.div>
    </div>
  );
};
