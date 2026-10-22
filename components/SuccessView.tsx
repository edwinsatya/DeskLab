"use client";

import { CATEGORIES, RENTAL_TERMS } from "@/constants";
import { formatPrice, getPricing, useStore } from "@/store/useStore";
import { motion } from "framer-motion";
import { ArrowLeft, CalendarDays, ShieldCheck, Truck } from "lucide-react";
import Image from "next/image";
import { useCallback, useEffect, useState } from "react";
import { DeliveryStatus } from "./DeliveryStatus";
import { PaymentProcessing } from "./PaymentProcessing";
import { WorkspaceScene } from "./scene/WorkspaceScene";

export const SuccessView = () => {
  const selections = useStore((s) => s.selections);
  const rentalMonths = useStore((s) => s.rentalMonths);
  const sceneMode = useStore((s) => s.sceneMode);
  const setRentalMonths = useStore((s) => s.setRentalMonths);
  const setIsRented = useStore((s) => s.setIsRented);
  const resetStore = useStore((s) => s.resetStore);
  const pricing = getPricing(selections, rentalMonths);
  const [view, setView] = useState<"summary" | "payment" | "delivery">("summary");
  const handlePaid = useCallback(() => setView("delivery"), []);

  useEffect(() => {
    window.scrollTo({ top: 0 });
  }, [view]);

  if (view === "payment") {
    return <PaymentProcessing onSuccess={handlePaid} />;
  }

  if (view === "delivery") {
    return <DeliveryStatus onReset={resetStore} />;
  }

  return (
    <div className="min-h-screen bg-[#0F0F10] text-white flex items-center justify-center p-4 lg:p-8">
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-5xl grid md:grid-cols-[1.15fr_1fr] overflow-hidden rounded-4xl border border-white/10 bg-zinc-900 shadow-2xl shadow-black/50"
      >
        {/* Preview */}
        <div className="relative min-h-56 md:min-h-full overflow-hidden bg-[#101013] flex items-center">
          <div className="scene-stage relative md:scale-[1.2] lg:scale-[1.25]">
            <WorkspaceScene selections={selections} mode={sceneMode} className="absolute inset-0 h-full w-full" />
          </div>
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_50%,rgba(0,0,0,0.6)_100%)]" />
          <button
            onClick={() => setIsRented(false)}
            className="cursor-pointer absolute left-4 top-4 flex items-center gap-1.5 rounded-full border border-white/10 bg-black/50 px-3 py-1.5 text-xs font-semibold text-zinc-200 backdrop-blur-md hover:text-white transition-colors"
          >
            <ArrowLeft size={14} /> Edit setup
          </button>
        </div>

        {/* Order summary */}
        <div className="p-6 lg:p-8 flex flex-col gap-6">
          <div>
            <p className="text-[11px] font-bold uppercase tracking-widest text-teal-400">Almost there</p>
            <h1 className="mt-1 text-3xl font-bold italic tracking-tight">Review your setup.</h1>
            <p className="mt-2 text-sm text-zinc-400 leading-relaxed">
              Delivered, assembled and insured anywhere from Canggu to Ubud within 24 hours.
            </p>
          </div>

          <ul className="flex flex-col gap-2">
            {CATEGORIES.map(({ id, label }) => {
              const item = selections[id];
              if (!item) return null;
              return (
                <li key={id} className="flex items-center gap-3">
                  <span className="relative h-11 w-11 shrink-0 overflow-hidden rounded-xl bg-zinc-800">
                    <Image src={item.image} alt="" fill sizes="44px" className="object-cover" />
                  </span>
                  <span className="min-w-0 flex-1">
                    <span className="block text-[9px] font-bold uppercase tracking-widest text-zinc-500">{label}</span>
                    <span className="block truncate text-sm font-semibold text-zinc-200">{item.name}</span>
                  </span>
                  <span className="text-sm font-medium text-zinc-400 tabular-nums">{formatPrice(item.price)}/mo</span>
                </li>
              );
            })}
          </ul>

          <div className="flex flex-col gap-2">
            <span className="flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-widest text-zinc-500">
              <CalendarDays size={12} /> Rental term
            </span>
            <div className="grid grid-cols-4 gap-1 rounded-xl border border-white/5 bg-black/30 p-1">
              {RENTAL_TERMS.map((term) => (
                <button
                  key={term.months}
                  onClick={() => setRentalMonths(term.months)}
                  className={`cursor-pointer rounded-lg py-1.5 text-xs font-bold transition-colors ${
                    term.months === rentalMonths ? "bg-teal-400 text-black" : "text-zinc-400 hover:text-white"
                  }`}
                >
                  {term.label}
                </button>
              ))}
            </div>
          </div>

          <div className="rounded-2xl border border-white/5 bg-zinc-800/40 p-4 flex flex-col gap-2 text-sm">
            <div className="flex justify-between text-zinc-400">
              <span>Subtotal</span>
              <span className="tabular-nums">{formatPrice(pricing.subtotal)}/mo</span>
            </div>
            {pricing.discount > 0 && (
              <div className="flex justify-between text-teal-400">
                <span>{rentalMonths}-month discount</span>
                <span className="tabular-nums">−{formatPrice(pricing.discount)}/mo</span>
              </div>
            )}
            <div className="flex justify-between text-zinc-400">
              <span>Delivery & assembly</span>
              <span>Free</span>
            </div>
            <div className="h-px bg-white/5 my-1" />
            <div className="flex items-end justify-between">
              <span className="font-semibold">Monthly total</span>
              <span className="text-2xl font-bold text-teal-400 tabular-nums">{formatPrice(pricing.monthly)}</span>
            </div>
            <p className="text-right text-[11px] text-zinc-500">
              {formatPrice(pricing.total)} billed over {rentalMonths} {rentalMonths === 1 ? "month" : "months"}
            </p>
          </div>

          <div className="flex flex-col gap-3">
            <button
              onClick={() => setView("payment")}
              className="w-full py-4 bg-teal-500 hover:bg-teal-400 text-black font-extrabold rounded-2xl transition-all active:scale-[0.98] shadow-lg shadow-teal-500/10 cursor-pointer"
            >
              Confirm & pay {formatPrice(pricing.monthly)}
            </button>
            <div className="flex items-center justify-center gap-4 text-[10px] font-bold uppercase tracking-wider text-zinc-500">
              <span className="flex items-center gap-1"><Truck size={12} /> Free delivery</span>
              <span className="flex items-center gap-1"><ShieldCheck size={12} /> Shiny insurance</span>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};
