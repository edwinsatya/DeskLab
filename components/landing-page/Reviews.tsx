"use client";

import { REVIEWS } from "@/constants";
import { motion } from "framer-motion";
import { Sparkles } from "lucide-react";
import Image from "next/image";

export const Reviews = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay: 0.4 }}
      className="mt-20 w-full max-w-6xl"
    >
      <div className="text-center mb-12">
        <h2 className="text-2xl lg:text-3xl font-bold italic mb-2">Trusted by the Bali nomad community.</h2>
        <p className="text-zinc-500 text-sm font-medium uppercase tracking-widest">Join 500+ professionals working in paradise</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {REVIEWS.map((review, i) => (
          <motion.div
            key={i}
            whileHover={{ y: -5 }}
            className="p-8 rounded-4xl bg-zinc-900/40 border border-white/5 flex flex-col gap-6 relative group transition-all hover:bg-zinc-900/60"
          >
            <div className="flex items-center gap-4">
              <div className="relative w-12 h-12 rounded-full overflow-hidden border border-teal-500/30">
                <Image 
                  src={review.avatar} 
                  alt={review.name} 
                  fill
                  className="object-cover"
                />
              </div>
              <div>
                <h4 className="font-bold text-zinc-200">{review.name}</h4>
                <p className="text-[10px] text-teal-500 font-bold uppercase tracking-wider">{review.role} • {review.location}</p>
              </div>
            </div>
            <p className="text-zinc-400 text-sm leading-relaxed italic">&quot;{review.content}&quot;</p>
            <div className="flex gap-1">
              {[1, 2, 3, 4, 5].map(star => (
                <Sparkles key={star} size={12} className="text-teal-500" />
              ))}
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
};
