"use client";

import { REVIEWS } from "@/constants";
import { motion } from "framer-motion";
import { Quote, Star } from "lucide-react";
import Image from "next/image";

export const Reviews = () => {
  return (
    <motion.section
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.6 }}
      className="mt-28 w-full max-w-6xl"
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
            className="p-8 rounded-4xl bg-zinc-900/40 border border-white/5 flex flex-col gap-6 relative group transition-colors hover:bg-zinc-900/60 text-left"
          >
            <Quote size={28} className="absolute right-7 top-7 text-white/5" />
            <div className="flex items-center gap-4">
              <div className="relative w-12 h-12 rounded-full overflow-hidden border border-teal-500/30">
                <Image
                  src={review.avatar}
                  alt={review.name}
                  fill
                  sizes="48px"
                  className="object-cover"
                />
              </div>
              <div>
                <h4 className="font-bold text-zinc-200">{review.name}</h4>
                <p className="text-[10px] text-teal-500 font-bold uppercase tracking-wider">{review.role} • {review.location}</p>
              </div>
            </div>
            <div className="flex gap-0.5" aria-label="5 out of 5 stars">
              {[1, 2, 3, 4, 5].map(star => (
                <Star key={star} size={14} className="fill-teal-500 text-teal-500" />
              ))}
            </div>
            <p className="text-zinc-300 text-sm leading-relaxed">&ldquo;{review.content}&rdquo;</p>
          </motion.div>
        ))}
      </div>
    </motion.section>
  );
};
