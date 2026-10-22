"use client";

import { motion } from "framer-motion";
import { ChevronRight } from "lucide-react";
import Link from "next/link";

interface CallToActionProps {
  title?: string;
  subtitle?: string;
  label?: string;
}

export const CallToAction = ({
  title = "Ready to build your oasis?",
  subtitle = "Design it in two minutes. We'll have it set up before your next sunset session.",
  label = "Start Designing",
}: CallToActionProps) => (
  <motion.section
    initial={{ opacity: 0, y: 24 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: "-60px" }}
    transition={{ duration: 0.5 }}
    className="relative mt-28 w-full max-w-5xl overflow-hidden rounded-[40px] border border-teal-500/20 bg-linear-to-br from-teal-500/20 via-zinc-900 to-zinc-900 p-10 lg:p-14 text-center"
  >
    <div className="pointer-events-none absolute -top-24 left-1/2 h-48 w-2/3 -translate-x-1/2 rounded-full bg-teal-500/20 blur-[80px]" />
    <h2 className="relative text-3xl lg:text-4xl font-bold tracking-tight">{title}</h2>
    <p className="relative mx-auto mt-3 max-w-xl text-zinc-400">{subtitle}</p>
    <Link
      href="/builder"
      className="relative mt-8 inline-flex items-center gap-2 px-10 py-4 bg-teal-500 hover:bg-teal-400 text-black font-extrabold rounded-2xl transition-all active:scale-[0.98] shadow-xl shadow-teal-500/20"
    >
      {label}
      <ChevronRight size={20} />
    </Link>
  </motion.section>
);
