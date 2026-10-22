"use client";

import { Footer } from "@/components/Footer";
import { Navbar } from "@/components/Navbar";
import { CallToAction } from "@/components/landing-page/CallToAction";
import { AnimatePresence, motion } from "framer-motion";
import { Bot, ChevronDown, CreditCard, LayoutPanelLeft, MousePointerClick, Truck } from "lucide-react";
import { useState } from "react";

const steps = [
  {
    icon: LayoutPanelLeft,
    title: "Pick Your Base",
    description: "Start with a solid foundation. Choose from our premium Bali Oak, Teak, or minimalist desks designed for productivity.",
    color: "text-teal-500",
    bg: "bg-teal-500/10",
  },
  {
    icon: MousePointerClick,
    title: "Customize & Visualize",
    description: "Swap chairs, monitors, and accessories in real-time. Our live room preview shows exactly how your setup will look, day or night.",
    color: "text-purple-500",
    bg: "bg-purple-500/10",
  },
  {
    icon: Bot,
    title: "Consult DeskLab AI",
    description: "Not sure what you need? Chat with our AI assistant for recommendations, then add them to your setup in one tap.",
    color: "text-blue-500",
    bg: "bg-blue-500/10",
  },
  {
    icon: CreditCard,
    title: "Seamless Checkout",
    description: "Rent your entire setup with a few clicks. No huge upfront costs—one simple monthly price, with up to 15% off longer terms.",
    color: "text-orange-500",
    bg: "bg-orange-500/10",
  },
  {
    icon: Truck,
    title: "Fast Bali Delivery",
    description: "We deliver and set everything up for you in Canggu, Seminyak, or Ubud within 24 hours. Just plug and play.",
    color: "text-green-500",
    bg: "bg-green-500/10",
  },
];

const faqs = [
  {
    question: "Where do you deliver?",
    answer: "Anywhere between Canggu, Seminyak, Ubud and Uluwatu. Villas, coworking spaces and guesthouses all work—we just need a door and a power socket.",
  },
  {
    question: "What's the minimum rental term?",
    answer: "One month. Longer terms are cheaper: 5% off for 3 months, 10% off for 6 months and 15% off for a full year.",
  },
  {
    question: "Can I swap items mid-rental?",
    answer: "Yes. Change your chair, monitor or accessories anytime and we'll swap them on our next delivery run at no extra cost.",
  },
  {
    question: "What if something breaks?",
    answer: "Every setup includes Shiny Insurance—coffee spills, humidity and Canggu power surges are all covered.",
  },
];

const FaqItem = ({ question, answer }: { question: string; answer: string }) => {
  const [open, setOpen] = useState(false);
  return (
    <div className="rounded-2xl border border-white/5 bg-zinc-900/40">
      <button
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        className="cursor-pointer flex w-full items-center justify-between gap-4 px-6 py-5 text-left font-semibold"
      >
        {question}
        <ChevronDown size={18} className={`shrink-0 text-zinc-500 transition-transform ${open ? "rotate-180" : ""}`} />
      </button>
      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="overflow-hidden"
          >
            <p className="px-6 pb-5 text-sm leading-relaxed text-zinc-400">{answer}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default function HowItWorks() {
  return (
    <div className="min-h-screen bg-[#0F0F10] text-white font-sans selection:bg-teal-500/30 overflow-x-hidden">
      <Navbar />

      <main className="pt-32 pb-20 px-4 max-w-5xl mx-auto flex flex-col items-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-20"
        >
          <h1 className="text-4xl lg:text-6xl font-bold italic tracking-tight mb-6">
            Your journey to a <span className="text-teal-500">perfect setup.</span>
          </h1>
          <p className="text-zinc-500 text-lg max-w-2xl mx-auto">
            We&apos;ve simplified the process of building a professional workspace in Bali.
            From design to delivery, we handle everything.
          </p>
        </motion.div>

        <ol className="relative w-full">
          {/* Timeline spine */}
          <div className="absolute left-12 lg:left-1/2 top-12 bottom-12 w-px bg-linear-to-b from-teal-500/40 via-white/10 to-green-500/40" />

          {steps.map((step, i) => (
            <motion.li
              key={step.title}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.5 }}
              className={`relative flex items-start lg:items-center gap-6 lg:gap-16 py-6 lg:py-8 ${i % 2 !== 0 ? "lg:flex-row-reverse" : ""}`}
            >
              <div className="relative z-10 w-24 h-24 rounded-4xl bg-[#0F0F10] ring-8 ring-[#0F0F10] shrink-0 lg:absolute lg:left-1/2 lg:-translate-x-1/2">
                <div className={`flex h-full w-full items-center justify-center rounded-4xl ${step.bg}`}>
                  <step.icon size={40} className={step.color} />
                </div>
              </div>
              <div className={`flex-1 lg:w-[calc(50%-5rem)] lg:flex-none ${i % 2 !== 0 ? "lg:text-left lg:ml-auto" : "lg:text-right lg:mr-auto"}`}>
                <span className={`font-mono font-bold text-sm ${step.color}`}>STEP 0{i + 1}</span>
                <h2 className="text-2xl lg:text-3xl font-bold mt-1 mb-3">{step.title}</h2>
                <p className="text-zinc-400 text-base lg:text-lg leading-relaxed">{step.description}</p>
              </div>
            </motion.li>
          ))}
        </ol>

        <section className="mt-28 w-full max-w-3xl">
          <h2 className="text-center text-3xl font-bold tracking-tight mb-8">Questions, answered.</h2>
          <div className="flex flex-col gap-3">
            {faqs.map((faq) => (
              <FaqItem key={faq.question} {...faq} />
            ))}
          </div>
        </section>

        <CallToAction title="Ready to build your oasis?" subtitle="Jump into the builder and see your setup come to life." label="Go to Designer" />
      </main>

      <Footer />
    </div>
  );
}
