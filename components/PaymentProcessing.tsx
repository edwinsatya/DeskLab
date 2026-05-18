"use client";

import { PAYMENT_STEPS } from "@/constants";
import { motion } from "framer-motion";
import { CreditCard, ShieldCheck } from "lucide-react";
import { useEffect, useState } from "react";

interface PaymentProcessingProps {
  onSuccess: () => void;
}

export const PaymentProcessing = ({ onSuccess }: PaymentProcessingProps) => {
  const [step, setStep] = useState(0);

  const steps = PAYMENT_STEPS;

  useEffect(() => {
    const timer = setInterval(() => {
      setStep((prev) => {
        if (prev >= steps.length - 1) {
          clearInterval(timer);
          setTimeout(onSuccess, 800);
          return prev;
        }
        return prev + 1;
      });
    }, 1500);

    return () => clearInterval(timer);
  }, [onSuccess, steps.length]);

  return (
    <div className="fixed inset-0 bg-[#0F0F10] z-50 flex items-center justify-center p-4">
      <motion.div 
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="max-w-md w-full bg-zinc-900 border border-white/5 p-8 lg:p-12 rounded-[40px] text-center"
      >
        <div className="relative w-24 h-24 mx-auto mb-8">
          <motion.div 
            animate={{ rotate: 360 }}
            transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
            className="absolute inset-0 border-4 border-teal-500/20 border-t-teal-500 rounded-full"
          />
          <div className="absolute inset-0 flex items-center justify-center">
            <CreditCard size={32} className="text-teal-500" />
          </div>
        </div>

        <h2 className="text-2xl font-bold mb-2">Processing Payment</h2>
        <div className="flex flex-col gap-4">
          <p className="text-zinc-500 text-sm h-5">{steps[step]}</p>
          
          <div className="w-full bg-zinc-800 h-1.5 rounded-full overflow-hidden">
            <motion.div 
              initial={{ width: "0%" }}
              animate={{ width: `${((step + 1) / steps.length) * 100}%` }}
              className="h-full bg-teal-500"
            />
          </div>

          <div className="flex items-center justify-center gap-2 text-[10px] text-zinc-600 font-bold uppercase tracking-widest mt-4">
            <ShieldCheck size={14} />
            Secure SSL Encrypted
          </div>
        </div>
      </motion.div>
    </div>
  );
};
