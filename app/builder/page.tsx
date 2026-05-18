"use client";

import { Footer } from "@/components/Footer";
import { Navbar } from "@/components/Navbar";
import { ProductSidebar } from "@/components/ProductSidebar";
import { SuccessView } from "@/components/SuccessView";
import { SummarySidebar } from "@/components/SummarySidebar";
import { Visualizer } from "@/components/Visualizer";
import { PRODUCTS } from "@/constants";
import { Category, Product } from "@/types";
import { useState } from "react";

export default function BuilderPage() {
  const [selections, setSelections] = useState<Record<Category, Product | null>>({
    desk: PRODUCTS[0],
    chair: PRODUCTS[4],
    monitor: null,
    accessory: null,
  });

  const [activeTab, setActiveTab] = useState<Category>("desk");
  const [isRented, setIsRented] = useState(false);

  const toggleProduct = (product: Product) => {
    setSelections(prev => ({
      ...prev,
      [product.category]: prev[product.category]?.id === product.id ? null : product
    }));
  };

  const totalPrice = Object.values(selections).reduce((sum, item) => sum + (item?.price || 0), 0);

  if (isRented) {
    return (
      <SuccessView 
        selections={selections} 
        totalPrice={totalPrice} 
        onBack={() => setIsRented(false)} 
      />
    );
  }

  return (
    <div className="min-h-screen bg-[#0F0F10] text-white font-sans selection:bg-teal-500/30 overflow-x-hidden">
      <Navbar />

      <main className="pt-24 pb-12 px-4 lg:px-8 flex flex-col lg:flex-row gap-8 max-w-400 mx-auto min-h-[calc(100vh-2rem)]">
        <ProductSidebar 
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          selections={selections}
          toggleProduct={toggleProduct}
        />

        <Visualizer selections={selections} />

        <SummarySidebar 
          selections={selections}
          totalPrice={totalPrice}
          onRent={() => setIsRented(true)}
        />
      </main>

      <Footer />
    </div>
  );
}
