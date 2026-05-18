"use client";

import { Footer } from "@/components/Footer";
import { Navbar } from "@/components/Navbar";
import { Features } from "@/components/landing-page/Features";
import { Hero } from "@/components/landing-page/Hero";
import { Reviews } from "@/components/landing-page/Reviews";

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-[#0F0F10] text-white font-sans selection:bg-teal-500/30 overflow-x-hidden">
      <Navbar />

      <main className="pt-32 pb-20 px-4 lg:px-8 max-w-7xl mx-auto flex flex-col items-center text-center gap-8">
        <Hero />
        <Reviews />
        <Features />
      </main>

      <Footer />
    </div>
  );
}
