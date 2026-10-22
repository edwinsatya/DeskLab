import { create } from "zustand";
import { DEFAULT_SELECTIONS, RENTAL_TERMS } from "../constants";
import { Category, Product, SceneMode } from "../types";

type Selections = Record<Category, Product | null>;

interface WorkspaceState {
  selections: Selections;
  activeTab: Category;
  rentalMonths: number;
  sceneMode: SceneMode;
  isRented: boolean;
  isChatOpen: boolean;

  // Actions
  toggleProduct: (product: Product) => void;
  selectProduct: (product: Product) => void;
  applySetup: (products: Product[], mode?: SceneMode) => void;
  removeProduct: (category: Category) => void;
  setActiveTab: (tab: Category) => void;
  setRentalMonths: (months: number) => void;
  setSceneMode: (mode: SceneMode) => void;
  setIsRented: (isRented: boolean) => void;
  setChatOpen: (isChatOpen: boolean) => void;
  resetStore: () => void;
  getTotalPrice: () => number;
}

export interface Pricing {
  subtotal: number;
  discountRate: number;
  discount: number;
  monthly: number;
  months: number;
  total: number;
  itemCount: number;
}

export const getPricing = (selections: Selections, months: number): Pricing => {
  const items = Object.values(selections).filter((item): item is Product => item !== null);
  const subtotal = items.reduce((sum, item) => sum + item.price, 0);
  const discountRate = RENTAL_TERMS.find((term) => term.months === months)?.discount ?? 0;
  const monthly = Math.round(subtotal * (1 - discountRate) * 100) / 100;

  return {
    subtotal,
    discountRate,
    discount: Math.round((subtotal - monthly) * 100) / 100,
    monthly,
    months,
    total: Math.round(monthly * months * 100) / 100,
    itemCount: items.length,
  };
};

export const formatPrice = (value: number) =>
  `$${value.toLocaleString("en-US", { minimumFractionDigits: value % 1 ? 2 : 0, maximumFractionDigits: 2 })}`;

const initialState = {
  selections: DEFAULT_SELECTIONS,
  activeTab: "desk" as Category,
  rentalMonths: 3,
  sceneMode: "day" as SceneMode,
  isRented: false,
};

export const useStore = create<WorkspaceState>((set, get) => ({
  ...initialState,
  isChatOpen: false,

  toggleProduct: (product) => {
    set((state) => ({
      selections: {
        ...state.selections,
        [product.category]: state.selections[product.category]?.id === product.id ? null : product
      }
    }));
  },

  selectProduct: (product) =>
    set((state) => ({ selections: { ...state.selections, [product.category]: product } })),

  applySetup: (products, mode) =>
    set((state) => ({
      selections: { desk: null, chair: null, monitor: null, accessory: null, ...Object.fromEntries(products.map((p) => [p.category, p])) },
      sceneMode: mode ?? state.sceneMode,
      isRented: false,
    })),

  removeProduct: (category) =>
    set((state) => ({ selections: { ...state.selections, [category]: null } })),

  setActiveTab: (tab) => set({ activeTab: tab }),

  setRentalMonths: (rentalMonths) => set({ rentalMonths }),

  setSceneMode: (sceneMode) => set({ sceneMode }),

  setIsRented: (isRented) => set({ isRented }),

  setChatOpen: (isChatOpen) => set({ isChatOpen }),

  resetStore: () => set({ ...initialState, isChatOpen: get().isChatOpen }),

  getTotalPrice: () => {
    const { selections, rentalMonths } = get();
    return getPricing(selections, rentalMonths).monthly;
  },
}));

/** Opens a category in the product picker, scrolling to it on small screens. */
export const focusPicker = (category: Category) => {
  useStore.getState().setActiveTab(category);
  if (typeof window !== "undefined" && window.innerWidth < 1024) {
    document.getElementById("product-picker")?.scrollIntoView({ behavior: "smooth", block: "start" });
  }
};
