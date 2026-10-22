"use client";

import { Footer } from "@/components/Footer";
import { Navbar } from "@/components/Navbar";
import { ProductSidebar } from "@/components/ProductSidebar";
import { SuccessView } from "@/components/SuccessView";
import { CheckoutPanel, MobileCheckoutBar, SummarySidebar } from "@/components/SummarySidebar";
import { Visualizer } from "@/components/Visualizer";
import { useStore } from "@/store/useStore";

const BuilderHeading = ({ className = "" }: { className?: string }) => (
  <header className={`flex flex-col gap-1 ${className}`}>
    <h1 className="text-3xl lg:text-[28px] xl:text-3xl font-bold tracking-tight">
      Design your <span className="text-teal-500 italic">oasis.</span>
    </h1>
    <p className="text-zinc-500 text-sm lg:[@media(max-height:820px)]:hidden">Pick your essentials and watch the room update live.</p>
  </header>
);

export default function BuilderPage() {
  const isRented = useStore((s) => s.isRented);

  if (isRented) {
    return <SuccessView />;
  }

  return (
    <div className="min-h-screen bg-[#0F0F10] text-white font-sans selection:bg-teal-500/30 overflow-x-clip max-lg:pb-20">
      <Navbar />

      <main className="mx-auto max-w-400 px-4 lg:px-8 pt-20 lg:pt-24 pb-8 lg:pb-6 flex flex-col gap-5 lg:grid lg:h-dvh lg:min-h-170 lg:grid-cols-[minmax(0,1fr)_21rem] xl:grid-cols-[minmax(0,1fr)_24rem] 2xl:grid-cols-[minmax(0,1fr)_26rem] lg:gap-6">
        <BuilderHeading className="lg:hidden" />

        <div className="max-sm:sticky max-sm:top-16 z-30 max-sm:-mx-4 max-sm:px-4 max-sm:pb-2 max-sm:bg-linear-to-b max-sm:from-[#0F0F10] max-sm:from-80% max-sm:to-transparent lg:flex lg:flex-col lg:min-h-0">
          <Visualizer />
        </div>

        <div className="flex flex-col gap-5 lg:min-h-0 lg:rounded-4xl lg:border lg:border-white/5 lg:bg-zinc-900/30 lg:p-5 lg:pb-4 lg:[@media(max-height:820px)]:gap-3 lg:[@media(max-height:820px)]:p-4">
          <BuilderHeading className="hidden lg:flex" />
          <ProductSidebar />
          <div className="hidden lg:block">
            <CheckoutPanel />
          </div>
        </div>

        <div className="lg:hidden">
          <SummarySidebar />
        </div>
      </main>

      <MobileCheckoutBar />
      <Footer />
    </div>
  );
}
