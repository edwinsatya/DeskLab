"use client";

import { motion } from "framer-motion";
import { Box, CheckCircle2, MapPin, Truck } from "lucide-react";

interface DeliveryStatusProps {
  onReset: () => void;
}

export const DeliveryStatus = ({ onReset }: DeliveryStatusProps) => {
  const steps = [
    { title: "Order Confirmed", desc: "Your setup is reserved", status: "completed", icon: CheckCircle2 },
    { title: "Quality Check", desc: "Testing every hinge and cable", status: "current", icon: Box },
    { title: "Out for Delivery", desc: "Navigating Canggu traffic", status: "pending", icon: Truck },
    { title: "Delivered", desc: "Enjoy your Bali oasis!", status: "pending", icon: MapPin },
  ];

  return (
    <div className="min-h-screen bg-[#0F0F10] text-white flex items-center justify-center p-4 lg:p-8">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-xl w-full bg-zinc-900 border border-white/5 p-8 lg:p-10 rounded-[40px] shadow-2xl"
      >
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-2xl font-bold italic tracking-tight text-teal-500">Track Order</h1>
            <p className="text-zinc-500 text-xs font-bold uppercase tracking-widest mt-1">Order #DL-88291</p>
          </div>
          <div className="px-3 py-1 bg-teal-500/10 border border-teal-500/20 rounded-full">
            <span className="text-teal-500 text-[10px] font-bold uppercase tracking-wider">In Progress</span>
          </div>
        </div>

        <div className="space-y-8 relative">
          {/* Vertical line connecting steps */}
          <div className="absolute left-6 top-2 bottom-2 w-px bg-zinc-800" />

          {steps.map((step, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.2 }}
              className="flex gap-6 relative z-10"
            >
              <div className={`w-12 h-12 rounded-2xl flex items-center justify-center shrink-0 shadow-lg ${
                step.status === 'completed' ? 'bg-teal-500 text-black' : 
                step.status === 'current' ? 'bg-zinc-800 text-teal-500 border border-teal-500/30' : 
                'bg-zinc-900 text-zinc-700 border border-white/5'
              }`}>
                <step.icon size={20} />
              </div>
              <div className="flex flex-col justify-center">
                <h3 className={`font-bold text-base ${step.status === 'pending' ? 'text-zinc-600' : 'text-zinc-200'}`}>
                  {step.title}
                </h3>
                <p className="text-zinc-500 text-xs mt-0.5">{step.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="mt-12 p-6 bg-zinc-800/30 rounded-3xl border border-white/5 flex items-center justify-between">
          <div className="flex flex-col">
            <span className="text-[10px] text-zinc-500 uppercase font-bold tracking-widest">Est. Delivery</span>
            <span className="text-sm font-bold text-zinc-200">Today, 4:00 PM</span>
          </div>
          <button 
            onClick={onReset}
            className="cursor-pointer px-6 py-2.5 bg-zinc-800 hover:bg-zinc-700 text-white text-xs font-bold rounded-xl transition-all border border-white/5"
          >
            New Setup
          </button>
        </div>
      </motion.div>
    </div>
  );
};
