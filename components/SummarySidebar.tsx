"use client";

import { Check, ChevronRight, CreditCard, ShoppingCart } from "lucide-react";
import { Category, Product } from "../types";

interface SummarySidebarProps {
  selections: Record<Category, Product | null>;
  totalPrice: number;
  onRent: () => void;
}

export const SummarySidebar = ({ selections, totalPrice, onRent }: SummarySidebarProps) => {
  return (
    <div className="w-full lg:w-80 flex flex-col gap-4 lg:gap-6">
      <div className="bg-zinc-900/50 rounded-3xl border border-white/5 p-4 lg:p-6 flex flex-col gap-4 lg:gap-6 shadow-xl shadow-black/20">
        <h2 className="text-lg lg:text-xl font-bold flex items-center gap-2">
          <ShoppingCart size={20} className="text-teal-500" />
          Summary
        </h2>
        
        <div className="flex flex-col gap-3 lg:gap-4">
          {Object.entries(selections).map(([key, item]) => item && (
            <div key={key} className="flex items-center justify-between group">
              <div className="flex flex-col">
                <span className="text-[9px] lg:text-[10px] uppercase tracking-widest text-zinc-500 font-extrabold">{key}</span>
                <span className="text-sm font-semibold text-zinc-200">{item.name}</span>
              </div>
              <span className="text-sm text-zinc-400 font-medium">${item.price}</span>
            </div>
          ))}
        </div>

        <div className="h-px bg-white/5 my-1 lg:my-2" />

        <div className="flex items-end justify-between">
          <div className="flex flex-col">
            <span className="text-[10px] text-zinc-500 uppercase font-bold tracking-widest">Monthly Total</span>
            <span className="text-2xl lg:text-3xl font-bold text-teal-500">${totalPrice}</span>
          </div>
          <span className="text-[9px] lg:text-[10px] text-zinc-500 mb-1 font-bold uppercase tracking-widest">USD / Month</span>
        </div>

        <button 
          onClick={onRent}
          className="w-full py-3.5 lg:py-4 bg-teal-500 hover:bg-teal-400 text-black font-extrabold rounded-2xl flex items-center justify-center gap-2 transition-all active:scale-[0.98] group shadow-lg shadow-teal-500/10 text-sm lg:text-base"
        >
          Rent Setup Now
          <ChevronRight size={18} className="group-hover:translate-x-1 transition-transform" />
        </button>
        
        <div className="flex items-center justify-center gap-4 text-zinc-500 text-[9px] lg:text-[10px] font-bold uppercase tracking-widest">
          <span className="flex items-center gap-1"><Check size={10} strokeWidth={3}/> Free Delivery</span>
          <span className="flex items-center gap-1"><Check size={10} strokeWidth={3}/> Cancel Anytime</span>
        </div>
      </div>

      <div className="bg-linear-to-br from-teal-500/10 to-zinc-900/50 rounded-3xl border border-teal-500/10 p-4 lg:p-6 shadow-xl shadow-black/20">
        <div className="flex items-center gap-3 mb-2 lg:mb-3">
          <div className="w-8 h-8 lg:w-10 lg:h-10 rounded-full bg-teal-500/10 flex items-center justify-center">
            <CreditCard className="text-teal-500" size={18} />
          </div>
          <h3 className="font-bold text-sm lg:text-base text-zinc-200">Nomad Insurance</h3>
        </div>
        <p className="text-[11px] lg:text-xs text-zinc-400 leading-relaxed font-medium">
          Every setup comes with full coverage against coffee spills and Canggu power surges.
        </p>
      </div>
    </div>
  );
};
