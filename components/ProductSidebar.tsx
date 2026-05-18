"use client";

import { PRODUCTS } from "@/constants";
import { useStore } from "@/store/useStore";
import { Category } from "@/types";
import { motion } from "framer-motion";
import { Check, Plus } from "lucide-react";
import Image from "next/image";

export const ProductSidebar = () => {
  const { activeTab, setActiveTab, selections, toggleProduct } = useStore();

  return (
    <div className="w-full lg:w-96 flex flex-col gap-4 lg:gap-6 shrink-0">
      <div className="flex flex-col gap-1 lg:gap-2">
        <h1 className="text-3xl lg:text-4xl font-bold tracking-tight">Design your <span className="text-teal-500 italic">oasis.</span></h1>
        <p className="text-zinc-500 text-xs lg:text-sm">Pick your essentials, we handle the rest in Bali.</p>
      </div>

      {/* Category Tabs */}
      <div className="flex gap-1 p-1 bg-zinc-900/50 rounded-xl border border-white/5 overflow-x-auto no-scrollbar">
        {(["desk", "chair", "monitor", "accessory"] as Category[]).map((cat) => (
          <button
            key={cat}
            onClick={() => setActiveTab(cat)}
            className={`flex-1 min-w-20 py-2 rounded-lg text-[10px] font-extrabold uppercase tracking-widest transition-all ${
              activeTab === cat ? "bg-zinc-800 text-teal-500 shadow-lg shadow-black/20" : "text-zinc-500 hover:text-zinc-300"
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Product List */}
      <div className="flex-1 lg:overflow-y-auto pr-0 lg:pr-2 custom-scrollbar">
        <div className="grid grid-cols-1 gap-3 lg:gap-4 pb-4">
          {PRODUCTS.filter(p => p.category === activeTab).map((product) => (
            <motion.div
              key={product.id}
              layout
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              onClick={() => toggleProduct(product)}
              className={`group relative overflow-hidden rounded-2xl border transition-all cursor-pointer ${
                selections[product.category]?.id === product.id 
                  ? "border-teal-500 bg-teal-500/5 shadow-[0_0_20px_rgba(20,184,166,0.1)]" 
                  : "border-white/5 bg-zinc-900/30 hover:border-white/20"
              }`}
            >
              <div className="flex gap-3 lg:gap-4 p-3 lg:p-4">
                <div className="relative w-20 h-20 lg:w-24 lg:h-24 rounded-xl overflow-hidden bg-zinc-800 shrink-0">
                  <Image 
                    src={product.image} 
                    alt={product.name} 
                    fill
                    sizes="(max-width: 1024px) 80px, 96px"
                    className="object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                </div>
                <div className="flex flex-col justify-between py-1 flex-1">
                  <div>
                    <h3 className="font-bold text-base lg:text-lg leading-tight">{product.name}</h3>
                    <p className="text-zinc-500 text-xs lg:text-sm font-medium mt-0.5">${product.price}/mo</p>
                  </div>
                  <div className="flex justify-end">
                    <div className={`w-7 h-7 lg:w-8 lg:h-8 rounded-full flex items-center justify-center transition-all ${
                      selections[product.category]?.id === product.id 
                        ? "bg-teal-500 text-black" 
                        : "bg-white/5 text-white/40 group-hover:bg-white/10"
                    }`}>
                      {selections[product.category]?.id === product.id ? <Check size={14} strokeWidth={3} /> : <Plus size={14} />}
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};
