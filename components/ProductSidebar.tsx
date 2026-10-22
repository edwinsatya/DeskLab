"use client";

import { CATEGORIES, PRODUCTS } from "@/constants";
import { formatPrice, useStore } from "@/store/useStore";
import { Product } from "@/types";
import { motion } from "framer-motion";
import { Check, Plus, X } from "lucide-react";
import Image from "next/image";

export const ProductSidebar = () => {
  const activeTab = useStore((s) => s.activeTab);
  const setActiveTab = useStore((s) => s.setActiveTab);
  const selections = useStore((s) => s.selections);
  const toggleProduct = useStore((s) => s.toggleProduct);
  const activeLabel = CATEGORIES.find((c) => c.id === activeTab)?.label ?? "";

  return (
    <section id="product-picker" aria-label="Choose products" className="flex flex-col gap-3 min-h-0 lg:flex-1 scroll-mt-80 sm:scroll-mt-24">
      {/* Category Tabs */}
      <div role="tablist" aria-label="Product categories" className="grid grid-cols-4 gap-1 p-1 bg-zinc-900/60 rounded-2xl border border-white/5">
        {CATEGORIES.map(({ id, label, icon: Icon }) => {
          const active = activeTab === id;
          return (
            <button
              key={id}
              role="tab"
              aria-selected={active}
              onClick={() => setActiveTab(id)}
              className={`cursor-pointer relative flex flex-col items-center gap-1 rounded-xl py-2.5 lg:[@media(max-height:820px)]:py-2 text-[10px] font-bold uppercase tracking-wider transition-colors ${
                active ? "text-teal-400" : "text-zinc-500 hover:text-zinc-300"
              }`}
            >
              {active && (
                <motion.span
                  layoutId="category-tab"
                  className="absolute inset-0 rounded-xl bg-zinc-800 shadow-lg shadow-black/30"
                  transition={{ type: "spring", stiffness: 400, damping: 32 }}
                />
              )}
              <Icon size={16} className="relative" />
              <span className="relative">{label}</span>
              {selections[id] && <span className="absolute top-1.5 right-2 h-1.5 w-1.5 rounded-full bg-teal-400" aria-label="picked" />}
            </button>
          );
        })}
      </div>

      <div className="flex items-baseline justify-between px-1 lg:[@media(max-height:820px)]:hidden">
        <p className="text-xs text-zinc-500">
          Pick one {activeLabel.toLowerCase()} · <span className="text-zinc-400">tap again to remove</span>
        </p>
      </div>

      {/* Product List */}
      <div className="flex-1 min-h-0 lg:overflow-y-auto lg:-mr-2 lg:pr-2 custom-scrollbar">
        <motion.div
          key={activeTab}
          role="tabpanel"
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.2 }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-3 pb-2"
        >
          {PRODUCTS.filter((p) => p.category === activeTab).map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              selected={selections[product.category]?.id === product.id}
              onToggle={() => toggleProduct(product)}
            />
          ))}
        </motion.div>
      </div>
    </section>
  );
};

interface ProductCardProps {
  product: Product;
  selected: boolean;
  onToggle: () => void;
}

const ProductCard = ({ product, selected, onToggle }: ProductCardProps) => (
  <button
    onClick={onToggle}
    aria-pressed={selected}
    className={`group relative w-full text-left overflow-hidden rounded-2xl border p-3 flex gap-3.5 transition-all cursor-pointer active:scale-[0.99] ${
      selected
        ? "border-teal-500/70 bg-teal-500/[0.07] shadow-[0_0_0_1px_rgba(20,184,166,0.15),0_8px_30px_-10px_rgba(20,184,166,0.35)]"
        : "border-white/5 bg-zinc-900/40 hover:border-white/15 hover:bg-zinc-900/70"
    }`}
  >
    <div className="relative w-20 h-20 rounded-xl overflow-hidden bg-zinc-800 shrink-0">
      <Image
        src={product.image}
        alt=""
        fill
        sizes="80px"
        className="object-cover group-hover:scale-110 transition-transform duration-500"
      />
      {product.badge && (
        <span className="absolute left-1 top-1 rounded-md bg-black/70 backdrop-blur px-1.5 py-0.5 text-[8px] font-bold uppercase tracking-wider text-teal-300">
          {product.badge}
        </span>
      )}
    </div>

    <div className="flex min-w-0 flex-1 flex-col justify-between py-0.5">
      <div>
        <div className="flex items-start justify-between gap-2">
          <h3 className="font-semibold text-[15px] leading-tight text-zinc-100">{product.name}</h3>
          <span className="shrink-0 text-sm font-semibold text-zinc-200 tabular-nums">
            {formatPrice(product.price)}
            <span className="text-[11px] font-medium text-zinc-500">/mo</span>
          </span>
        </div>
        <p className="mt-1 text-xs text-zinc-500 leading-snug line-clamp-2">{product.tagline}</p>
      </div>

      <div className="mt-2 flex items-center justify-between gap-2">
        {product.color ? (
          <span className="flex items-center gap-1.5 text-[10px] text-zinc-500">
            <span className="h-3 w-3 rounded-full border border-white/20" style={{ backgroundColor: product.color }} />
            Finish
          </span>
        ) : (
          <span />
        )}
        <span
          className={`flex items-center gap-1 rounded-full px-2.5 py-1 text-[10px] font-bold transition-colors ${
            selected
              ? "bg-teal-500 text-black group-hover:bg-zinc-800 group-hover:text-zinc-200"
              : "bg-white/5 text-zinc-400 group-hover:bg-white/10 group-hover:text-white"
          }`}
        >
          {selected ? (
            <>
              <Check size={11} strokeWidth={3} className="group-hover:hidden" />
              <X size={11} strokeWidth={3} className="hidden group-hover:block" />
              <span className="group-hover:hidden">In setup</span>
              <span className="hidden group-hover:inline">Remove</span>
            </>
          ) : (
            <>
              <Plus size={11} strokeWidth={3} /> Add
            </>
          )}
        </span>
      </div>
    </div>
  </button>
);
