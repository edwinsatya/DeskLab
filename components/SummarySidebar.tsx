"use client";

import { CATEGORIES, RENTAL_TERMS } from "@/constants";
import { focusPicker, formatPrice, getPricing, Pricing, useStore } from "@/store/useStore";
import { Product } from "@/types";
import { AnimatePresence, motion } from "framer-motion";
import { Check, ChevronDown, ChevronRight, Plus, ShieldCheck, X } from "lucide-react";
import Image from "next/image";
import { useState } from "react";

const usePricing = () => {
  const selections = useStore((s) => s.selections);
  const rentalMonths = useStore((s) => s.rentalMonths);
  return getPricing(selections, rentalMonths);
};

const SetupItemList = () => {
  const selections = useStore((s) => s.selections);
  const removeProduct = useStore((s) => s.removeProduct);

  return (
    <ul className="flex flex-col gap-1.5">
      {CATEGORIES.map(({ id, label, icon: Icon }) => {
        const item = selections[id];
        if (!item) {
          return (
            <li key={id}>
              <button
                onClick={() => focusPicker(id)}
                className="cursor-pointer w-full flex items-center gap-3 rounded-xl border border-dashed border-white/10 p-2 text-left text-zinc-500 hover:border-teal-500/40 hover:text-teal-300 transition-colors"
              >
                <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-white/[0.03]">
                  <Icon size={16} />
                </span>
                <span className="flex-1 text-xs font-semibold">Add a {label.toLowerCase()}</span>
                <Plus size={14} className="mr-1" />
              </button>
            </li>
          );
        }
        return (
          <motion.li
            key={id}
            initial={{ opacity: 0, x: 8 }}
            animate={{ opacity: 1, x: 0 }}
            className="group flex items-center gap-3 rounded-xl p-2 hover:bg-white/[0.03] transition-colors"
          >
            <button
              onClick={() => focusPicker(id)}
              aria-label={`Change ${label.toLowerCase()}`}
              className="cursor-pointer relative h-10 w-10 shrink-0 overflow-hidden rounded-lg bg-zinc-800"
            >
              <Image src={item.image} alt="" fill sizes="40px" className="object-cover" />
            </button>
            <div className="min-w-0 flex-1">
              <span className="block text-[9px] uppercase tracking-widest text-zinc-500 font-bold">{label}</span>
              <span className="block truncate text-sm font-semibold text-zinc-200">{item.name}</span>
            </div>
            <span className="text-sm text-zinc-400 font-medium tabular-nums">{formatPrice(item.price)}</span>
            <button
              onClick={() => removeProduct(id)}
              aria-label={`Remove ${item.name}`}
              className="cursor-pointer flex h-6 w-6 items-center justify-center rounded-full text-zinc-600 hover:bg-white/10 hover:text-white transition-colors"
            >
              <X size={12} />
            </button>
          </motion.li>
        );
      })}
    </ul>
  );
};

const RentalTermPicker = ({ pricing }: { pricing: Pricing }) => {
  const setRentalMonths = useStore((s) => s.setRentalMonths);

  return (
    <div className="flex flex-col gap-2">
      <div className="flex items-center justify-between">
        <span className="text-[10px] text-zinc-500 uppercase font-bold tracking-widest">Rental term</span>
        <span className="text-[10px] font-bold text-teal-400">
          {pricing.discountRate > 0 ? `Save ${Math.round(pricing.discountRate * 100)}%` : "Longer terms save up to 15%"}
        </span>
      </div>
      <div role="radiogroup" aria-label="Rental term" className="grid grid-cols-4 gap-1 rounded-xl bg-black/30 border border-white/5 p-1">
        {RENTAL_TERMS.map((term) => {
          const active = term.months === pricing.months;
          return (
            <button
              key={term.months}
              role="radio"
              aria-checked={active}
              onClick={() => setRentalMonths(term.months)}
              className={`cursor-pointer relative rounded-lg py-2 text-xs font-bold transition-colors ${
                active ? "text-black" : "text-zinc-400 hover:text-white"
              }`}
            >
              {active && (
                <motion.span layoutId="rental-term" className="absolute inset-0 rounded-lg bg-teal-400" transition={{ type: "spring", stiffness: 400, damping: 32 }} />
              )}
              <span className="relative">{term.label}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
};

const TotalBlock = ({ pricing }: { pricing: Pricing }) => (
  <div className="flex items-end justify-between gap-3">
    <div className="flex flex-col">
      <span className="text-[10px] text-zinc-500 uppercase font-bold tracking-widest">Monthly total</span>
      <div className="flex items-baseline gap-2">
        <motion.span
          key={pricing.monthly}
          initial={{ opacity: 0.4, y: -4 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-3xl font-bold text-teal-400 tabular-nums"
        >
          {formatPrice(pricing.monthly)}
        </motion.span>
        {pricing.discount > 0 && (
          <span className="text-sm text-zinc-600 line-through tabular-nums">{formatPrice(pricing.subtotal)}</span>
        )}
      </div>
    </div>
    <span className="text-[11px] text-zinc-500 mb-1.5 font-medium text-right leading-snug">
      {formatPrice(pricing.total)} for {pricing.months} {pricing.months === 1 ? "month" : "months"}
      {pricing.discount > 0 && (
        <span className="block text-teal-400/90">You save {formatPrice(pricing.discount * pricing.months)}</span>
      )}
    </span>
  </div>
);

const RentButton = ({ pricing }: { pricing: Pricing }) => {
  const setIsRented = useStore((s) => s.setIsRented);
  const empty = pricing.itemCount === 0;

  return (
    <button
      onClick={() => setIsRented(true)}
      disabled={empty}
      className="cursor-pointer w-full py-4 bg-teal-500 hover:bg-teal-400 text-black font-extrabold rounded-2xl flex items-center justify-center gap-2 transition-all active:scale-[0.98] group shadow-lg shadow-teal-500/10 disabled:cursor-not-allowed disabled:bg-zinc-800 disabled:text-zinc-500 disabled:shadow-none"
    >
      {empty ? "Add an item to continue" : "Review & rent"}
      {!empty && <ChevronRight size={18} className="group-hover:translate-x-1 transition-transform" />}
    </button>
  );
};

const Perks = () => (
  <div className="flex flex-wrap items-center justify-center gap-x-4 gap-y-1 text-zinc-500 text-[10px] font-bold uppercase tracking-wider">
    <span className="flex items-center gap-1 whitespace-nowrap"><Check size={10} strokeWidth={3} /> Free delivery</span>
    <span className="flex items-center gap-1 whitespace-nowrap"><ShieldCheck size={11} /> Insured</span>
    <span className="flex items-center gap-1 whitespace-nowrap"><Check size={10} strokeWidth={3} /> Cancel anytime</span>
  </div>
);

/** Full summary card for small screens. */
export const SummarySidebar = () => {
  const pricing = usePricing();

  return (
    <aside aria-label="Setup summary" className="flex flex-col gap-4">
      <div className="bg-zinc-900/50 rounded-3xl border border-white/5 p-5 flex flex-col gap-5 shadow-xl shadow-black/20">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-bold">Your setup</h2>
          <span className="text-[11px] font-semibold text-zinc-500 tabular-nums">{pricing.itemCount} of 4 picked</span>
        </div>
        <SetupItemList />
        <RentalTermPicker pricing={pricing} />
        <div className="h-px bg-white/5" />
        <TotalBlock pricing={pricing} />
        <RentButton pricing={pricing} />
        <Perks />
      </div>

      <div className="bg-linear-to-br from-teal-500/10 to-zinc-900/50 rounded-3xl border border-teal-500/10 p-5">
        <div className="flex items-center gap-3 mb-2">
          <div className="w-9 h-9 rounded-full bg-teal-500/10 flex items-center justify-center">
            <ShieldCheck className="text-teal-400" size={18} />
          </div>
          <h3 className="font-bold text-sm text-zinc-200">Shiny Insurance included</h3>
        </div>
        <p className="text-xs text-zinc-400 leading-relaxed">
          Every setup comes with full coverage against coffee spills and Canggu power surges.
        </p>
      </div>
    </aside>
  );
};

/** Compact checkout docked under the product list on large screens. */
export const CheckoutPanel = () => {
  const pricing = usePricing();
  const selections = useStore((s) => s.selections);
  const setIsRented = useStore((s) => s.setIsRented);
  const [open, setOpen] = useState(false);
  const picked = CATEGORIES.map(({ id }) => selections[id]).filter((p): p is Product => p !== null);

  return (
    <aside aria-label="Checkout" className="shrink-0 flex flex-col gap-3.5 rounded-3xl border border-white/5 bg-zinc-950/70 p-4 shadow-[0_-20px_40px_-20px_rgba(0,0,0,0.6)]">
      <button
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        className="cursor-pointer flex items-center gap-3 text-left"
      >
        <div className="flex -space-x-2">
          {picked.length === 0 && <span className="h-8 w-8 rounded-full border border-dashed border-white/20" />}
          {picked.map((item) => (
            <span key={item.id} className="relative h-8 w-8 overflow-hidden rounded-full border-2 border-zinc-950 bg-zinc-800">
              <Image src={item.image} alt="" fill sizes="32px" className="object-cover" />
            </span>
          ))}
        </div>
        <div className="flex-1">
          <span className="block text-sm font-semibold text-zinc-100">Your setup</span>
          <span className="block text-[11px] text-zinc-500">{pricing.itemCount} of 4 picked · {open ? "hide" : "view"} details</span>
        </div>
        <ChevronDown size={16} className={`text-zinc-500 transition-transform ${open ? "rotate-180" : ""}`} />
      </button>

      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="overflow-hidden -mx-2"
          >
            <SetupItemList />
          </motion.div>
        )}
      </AnimatePresence>

      <RentalTermPicker pricing={pricing} />

      <div className="flex items-center gap-3">
        <div className="min-w-0 flex-1">
          <div className="flex items-baseline gap-1.5">
            <motion.span
              key={pricing.monthly}
              initial={{ opacity: 0.4, y: -4 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-2xl font-bold text-teal-400 tabular-nums"
            >
              {formatPrice(pricing.monthly)}
            </motion.span>
            <span className="text-xs text-zinc-500">/mo</span>
          </div>
          <span className="block truncate text-[11px] text-zinc-500">
            {formatPrice(pricing.total)} for {pricing.months} {pricing.months === 1 ? "month" : "months"}
            {pricing.discount > 0 && <span className="text-teal-400/90"> · save {formatPrice(pricing.discount * pricing.months)}</span>}
          </span>
        </div>
        <button
          onClick={() => setIsRented(true)}
          disabled={pricing.itemCount === 0}
          className="cursor-pointer group shrink-0 flex items-center gap-1.5 rounded-xl bg-teal-500 hover:bg-teal-400 px-5 py-3.5 text-sm font-extrabold text-black transition-all active:scale-[0.98] shadow-lg shadow-teal-500/15 disabled:cursor-not-allowed disabled:bg-zinc-800 disabled:text-zinc-500 disabled:shadow-none"
        >
          Review & rent
          <ChevronRight size={16} className="group-enabled:group-hover:translate-x-0.5 transition-transform" />
        </button>
      </div>
      <div className="[@media(max-height:820px)]:hidden">
        <Perks />
      </div>
    </aside>
  );
};

export const MobileCheckoutBar = () => {
  const pricing = usePricing();
  const setIsRented = useStore((s) => s.setIsRented);

  return (
    <div className="lg:hidden fixed inset-x-0 bottom-0 z-40 border-t border-white/10 bg-[#0F0F10]/90 backdrop-blur-xl px-4 pt-3 pb-[max(0.75rem,env(safe-area-inset-bottom))]">
      <div className="mx-auto flex max-w-2xl items-center gap-4">
        <div className="flex-1">
          <span className="block text-[10px] font-bold uppercase tracking-widest text-zinc-500">
            {pricing.itemCount} items · {pricing.months} mo term
          </span>
          <span className="text-xl font-bold text-teal-400 tabular-nums">
            {formatPrice(pricing.monthly)}
            <span className="text-xs font-medium text-zinc-500">/mo</span>
          </span>
        </div>
        <button
          onClick={() => setIsRented(true)}
          disabled={pricing.itemCount === 0}
          className="cursor-pointer flex items-center gap-1.5 rounded-xl bg-teal-500 px-5 py-3 text-sm font-extrabold text-black active:scale-[0.98] disabled:bg-zinc-800 disabled:text-zinc-500"
        >
          Review <ChevronRight size={16} />
        </button>
      </div>
    </div>
  );
};
