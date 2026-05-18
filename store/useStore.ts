import { create } from "zustand";
import { PRODUCTS } from "../constants";
import { Category, Product } from "../types";

interface WorkspaceState {
  selections: Record<Category, Product | null>;
  activeTab: Category;
  isRented: boolean;
  
  // Actions
  toggleProduct: (product: Product) => void;
  setActiveTab: (tab: Category) => void;
  setIsRented: (isRented: boolean) => void;
  getTotalPrice: () => number;
}

export const useStore = create<WorkspaceState>((set, get) => ({
  selections: {
    desk: PRODUCTS[0],
    chair: PRODUCTS[4],
    monitor: null,
    accessory: null,
  },
  activeTab: "desk",
  isRented: false,

  toggleProduct: (product) => {
    set((state) => ({
      selections: {
        ...state.selections,
        [product.category]: state.selections[product.category]?.id === product.id ? null : product
      }
    }));
  },

  setActiveTab: (tab) => set({ activeTab: tab }),
  
  setIsRented: (isRented) => set({ isRented }),

  getTotalPrice: () => {
    const { selections } = get();
    return Object.values(selections).reduce((sum, item) => sum + (item?.price || 0), 0);
  },
}));
