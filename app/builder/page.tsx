"use client";

import { Footer } from "@/components/Footer";
import { Navbar } from "@/components/Navbar";
import { ProductSidebar } from "@/components/ProductSidebar";
import { SuccessView } from "@/components/SuccessView";
import { SummarySidebar } from "@/components/SummarySidebar";
import { Visualizer } from "@/components/Visualizer";
import { useStore } from "@/store/useStore";

export default function BuilderPage() {
  const { isRented } = useStore();

  if (isRented) {
    return <SuccessView />;
  }

  return (
    <div className="min-h-screen bg-[#0F0F10] text-white font-sans selection:bg-teal-500/30 overflow-x-hidden">
      <Navbar />

      <main className="pt-24 pb-12 px-4 lg:px-8 flex flex-col lg:flex-row gap-8 max-w-400 mx-auto min-h-[calc(100vh-2rem)]">
        <ProductSidebar />

        <Visualizer />

        <SummarySidebar />
      </main>

      <Footer />
    </div>
  );
}
