"use client";

import { PAYMENT_STEPS } from "@/constants";
import { motion } from "framer-motion";
import { Check, CreditCard, Loader2, ShieldCheck } from "lucide-react";
import { useEffect, useState } from "react";

interface PaymentProcessingProps {
  onSuccess: () => void;
}

export const PaymentProcessing = ({ onSuccess }: PaymentProcessingProps) => {
  const [step, setStep] = useState(0);

  const steps = PAYMENT_STEPS;

  useEffect(() => {
    const isLast = step >= steps.length - 1;
    const timer = setTimeout(isLast ? onSuccess : () => setStep(step + 1), isLast ? 900 : 1300);
    return () => clearTimeout(timer);
  }, [step, onSuccess, steps.length]);

  return (
    <div className="fixed inset-0 bg-[#0F0F10] z-50 flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="max-w-md w-full bg-zinc-900 border border-white/5 p-8 lg:p-10 rounded-[40px] text-center"
      >
        <div className="relative w-24 h-24 mx-auto mb-8">
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 2.5, repeat: Infinity, ease: "linear" }}
            className="absolute inset-0 border-4 border-teal-500/20 border-t-teal-500 rounded-full"
          />
          <div className="absolute inset-0 flex items-center justify-center">
            <CreditCard size={32} className="text-teal-500" />
          </div>
        </div>

        <h2 className="text-2xl font-bold mb-1">Processing payment</h2>
        <p className="text-zinc-500 text-sm mb-6">Please keep this window open.</p>

        <ol className="flex flex-col gap-3 text-left mb-6">
          {steps.map((label, i) => {
            const done = i < step;
            const current = i === step;
            return (
              <li key={label} className={`flex items-center gap-3 text-sm transition-colors ${done ? "text-zinc-300" : current ? "text-white" : "text-zinc-600"}`}>
                <span
                  className={`flex h-6 w-6 shrink-0 items-center justify-center rounded-full border ${
                    done ? "border-teal-500 bg-teal-500 text-black" : current ? "border-teal-500/50 text-teal-400" : "border-white/10"
                  }`}
                >
                  {done ? <Check size={12} strokeWidth={3} /> : current ? <Loader2 size={12} className="animate-spin" /> : null}
                </span>
                {label}
              </li>
            );
          })}
        </ol>

        <div className="w-full bg-zinc-800 h-1.5 rounded-full overflow-hidden">
          <motion.div
            initial={{ width: "0%" }}
            animate={{ width: `${((step + 1) / steps.length) * 100}%` }}
            className="h-full bg-teal-500"
          />
        </div>

        <div className="flex items-center justify-center gap-2 text-[10px] text-zinc-600 font-bold uppercase tracking-widest mt-6">
          <ShieldCheck size={14} />
          Secure SSL Encrypted · Demo only
        </div>
      </motion.div>
    </div>
  );
};
