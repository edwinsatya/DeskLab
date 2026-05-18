"use client";

import { useStore } from "@/store/useStore";
import { motion } from "framer-motion";
import { Check } from "lucide-react";

export const SuccessView = () => {
  const { selections, getTotalPrice, setIsRented, resetStore } = useStore();
  const totalPrice = getTotalPrice();

  return (
    <div className="min-h-screen bg-[#0F0F10] text-white flex items-center justify-center p-4 lg:p-8">
      <motion.div 
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="max-w-md w-full bg-zinc-900 border border-teal-500/30 p-8 lg:p-12 rounded-4xl lg:rounded-[40px] text-center flex flex-col gap-6 shadow-2xl shadow-teal-500/10"
      >
        <div className="w-20 h-20 lg:w-24 lg:h-24 bg-teal-500 rounded-full flex items-center justify-center mx-auto mb-2 lg:mb-4">
          <Check size={40} className="text-black lg:w-12 lg:h-12" strokeWidth={3} />
        </div>
        <h1 className="text-3xl lg:text-4xl font-bold italic tracking-tight">Bali awaits.</h1>
        <p className="text-zinc-400 text-sm lg:text-base leading-relaxed">Your dream setup is being prepped. Our team will reach out to schedule your delivery in the next 24 hours.</p>
        
        <div className="bg-zinc-800/50 p-4 lg:p-5 rounded-2xl text-left border border-white/5">
          <p className="text-[10px] text-zinc-500 uppercase font-bold mb-3 tracking-widest">Order Summary</p>
          {Object.values(selections).map(item => item && (
            <div key={item.id} className="text-xs lg:text-sm py-1.5 flex justify-between">
              <span className="text-zinc-300">{item.name}</span>
              <span className="text-teal-500 font-medium">${item.price}</span>
            </div>
          ))}
          <div className="h-px bg-white/5 my-3" />
          <div className="flex justify-between font-bold text-sm lg:text-base">
            <span>Total / mo</span>
            <span className="text-teal-500">${totalPrice}</span>
          </div>
        </div>

        <div className="flex flex-col gap-3">
          <button 
            onClick={resetStore}
            className="cursor-pointer w-full py-4 bg-teal-500 hover:bg-teal-400 text-black font-extrabold rounded-2xl transition-all active:scale-[0.98] shadow-lg shadow-teal-500/10 text-sm lg:text-base capitalize tracking-wider"
          >
            Confirm & Start New Setup
          </button>
          
          <button 
            onClick={() => setIsRented(false)}
            className="cursor-pointer text-zinc-500 hover:text-white transition-colors text-xs lg:text-sm font-medium"
          >
            Go back to editor
          </button>
        </div>
      </motion.div>
    </div>
  );
};
