"use client";

import { Footer } from "@/components/Footer";
import { Navbar } from "@/components/Navbar";
import { motion } from "framer-motion";
import { Bot, CreditCard, LayoutPanelLeft, MousePointerClick, Truck } from "lucide-react";
import Link from "next/link";

export default function HowItWorks() {
  const steps = [
    {
      icon: LayoutPanelLeft,
      title: "Pick Your Base",
      description: "Start with a solid foundation. Choose from our premium Bali Oak, Teak, or minimalist desks designed for productivity.",
      color: "text-teal-500",
      bg: "bg-teal-500/10"
    },
    {
      icon: MousePointerClick,
      title: "Customize & Visualize",
      description: "Swap chairs, monitors, and accessories in real-time. Our 3D visualizer shows exactly how your setup will look in your space.",
      color: "text-purple-500",
      bg: "bg-purple-500/10"
    },
    {
      icon: Bot,
      title: "Consult DeskLab AI",
      description: "Not sure what you need? Chat with our AI assistant to get personalized recommendations based on your ergonomic needs.",
      color: "text-blue-500",
      bg: "bg-blue-500/10"
    },
    {
      icon: CreditCard,
      title: "Seamless Checkout",
      description: "Rent your entire setup with a few clicks. No huge upfront costs—just one simple monthly subscription.",
      color: "text-orange-500",
      bg: "bg-orange-500/10"
    },
    {
      icon: Truck,
      title: "Fast Bali Delivery",
      description: "We deliver and set everything up for you in Canggu, Seminyak, or Ubud within 24 hours. Just plug and play.",
      color: "text-green-500",
      bg: "bg-green-500/10"
    }
  ];

  return (
    <div className="min-h-screen bg-[#0F0F10] text-white font-sans selection:bg-teal-500/30 overflow-x-hidden">
      <Navbar />

      <main className="pt-32 pb-20 px-4 max-w-5xl mx-auto">
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

        <div className="space-y-12">
          {steps.map((step, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, x: i % 2 === 0 ? -20 : 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className={`flex flex-col lg:flex-row items-center gap-8 lg:gap-16 ${i % 2 !== 0 ? 'lg:flex-row-reverse' : ''}`}
            >
              <div className={`w-24 h-24 lg:w-32 lg:h-32 rounded-4xl ${step.bg} flex items-center justify-center shrink-0`}>
                <step.icon size={48} className={step.color} />
              </div>
              <div className={`flex-1 text-center lg:text-left ${i % 2 !== 0 ? 'lg:text-right' : ''}`}>
                <div className="flex items-center gap-3 mb-2 justify-center lg:justify-start">
                  <span className="text-teal-500 font-mono font-bold text-sm">STEP 0{i + 1}</span>
                </div>
                <h2 className="text-2xl lg:text-3xl font-bold mb-4">{step.title}</h2>
                <p className="text-zinc-400 text-base lg:text-lg leading-relaxed">
                  {step.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          className="mt-32 p-12 rounded-[40px] bg-linear-to-br from-teal-500/20 to-zinc-900 border border-teal-500/20 text-center"
        >
          <h2 className="text-3xl font-bold mb-6">Ready to build your oasis?</h2>
          <Link href="/builder">
            <button className="px-10 py-5 bg-teal-500 hover:bg-teal-400 text-black font-extrabold rounded-2xl transition-all active:scale-[0.98] shadow-xl shadow-teal-500/20 capitalize cursor-pointer tracking-wider">
              Go to Designer
            </button>
          </Link>
        </motion.div>
      </main>

      <Footer />
    </div>
  );
}
