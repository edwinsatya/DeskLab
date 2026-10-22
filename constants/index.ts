import { Category, Product, RentalTerm, SceneMode } from "@/types";
import { Armchair, Box, CheckCircle2, LampDesk, LucideIcon, MapPin, Monitor, Table2, Truck } from "lucide-react";

export const PRODUCTS: Product[] = [
  {
    id: "desk-1",
    name: "The Bali Oak",
    price: 45,
    image: "https://images.unsplash.com/photo-1593062096033-9a26b09da705?auto=format&fit=crop&w=800&q=80",
    category: "desk",
    tagline: "Solid oak top · 140 × 70 cm",
    badge: "Best seller",
    color: "#D4A373",
    variant: "classic",
  },
  {
    id: "desk-2",
    name: "Midnight Pro",
    price: 65,
    image: "https://images.unsplash.com/photo-1493934558415-9d19f0b2b4d2?auto=format&fit=crop&w=800&q=80",
    category: "desk",
    tagline: "Electric sit-stand · 3 memory presets",
    color: "#1A1A1A",
    variant: "standing",
  },
  {
    id: "desk-3",
    name: "Nordic White",
    price: 55,
    image: "https://images.unsplash.com/photo-1516321497487-e288fb19713f?auto=format&fit=crop&w=800&q=80",
    category: "desk",
    tagline: "Matte white top · tapered oak legs",
    color: "#F3F4F6",
    variant: "scandi",
  },
  {
    id: "desk-4",
    name: "Jungle Teak",
    price: 75,
    image: "https://images.unsplash.com/photo-1499951360447-b19be8fe80f5?auto=format&fit=crop&w=800&q=80",
    category: "desk",
    tagline: "Reclaimed teak slab · waterfall sides",
    color: "#78350F",
    variant: "solid",
  },
  {
    id: "chair-1",
    name: "ErgoCloud",
    price: 30,
    image: "https://images.unsplash.com/photo-1598300042247-d088f8ab3a91?q=80&w=800",
    category: "chair",
    tagline: "Breathable mesh · adjustable headrest",
    badge: "Most rented",
    color: "#4A4A4A",
    variant: "ergo",
  },
  {
    id: "chair-2",
    name: "Nomad Throne",
    price: 40,
    image: "https://images.unsplash.com/photo-1580480055273-228ff5388ef8?auto=format&fit=crop&w=800&q=80",
    category: "chair",
    tagline: "High-back recliner · 4D armrests",
    color: "#1C1C1F",
    variant: "gaming",
  },
  {
    id: "chair-3",
    name: "Azure Breeze",
    price: 35,
    image: "https://images.unsplash.com/photo-1592078615290-033ee584e267?auto=format&fit=crop&w=800&q=80",
    category: "chair",
    tagline: "Compact task chair · lumbar curve",
    color: "#0D9488",
    variant: "task",
  },
  {
    id: "chair-4",
    name: "Sunset Ember",
    price: 45,
    image: "https://images.unsplash.com/photo-1506439773649-6e0eb8cfb237?auto=format&fit=crop&w=800&q=80",
    category: "chair",
    tagline: "Channel-tufted cushion · wide seat",
    color: "#B91C1C",
    variant: "lounge",
  },
  {
    id: "mon-1",
    name: "UltraWide 34\"",
    price: 50,
    image: "https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?auto=format&fit=crop&w=800&q=80",
    category: "monitor",
    tagline: "34\" curved QHD · 144 Hz",
    badge: "Staff pick",
    variant: "ultrawide",
  },
  {
    id: "mon-2",
    name: "Dual 4K Setup",
    price: 75,
    image: "https://images.unsplash.com/photo-1551645120-d70bfe84c826?auto=format&fit=crop&w=800&q=80",
    category: "monitor",
    tagline: "Two 27\" 4K panels · dual arm",
    variant: "dual",
  },
  {
    id: "mon-3",
    name: "Single Focus",
    price: 35,
    image: "https://images.unsplash.com/photo-1547119957-637f8679db1e?auto=format&fit=crop&w=800&q=80",
    category: "monitor",
    tagline: "27\" QHD IPS · height adjustable",
    variant: "single",
  },
  {
    id: "mon-4",
    name: "Vertical Stack",
    price: 60,
    image: "https://images.unsplash.com/photo-1586210579191-33b45e38fa2c?auto=format&fit=crop&w=800&q=80",
    category: "monitor",
    tagline: "27\" pivoted for code & docs",
    variant: "portrait",
  },
  {
    id: "acc-1",
    name: "Sunset Lamp",
    price: 10,
    image: "https://images.unsplash.com/photo-1513506003901-1e6a229e2d15?w=800&q=80",
    category: "accessory",
    tagline: "Warm dimmable task light",
    variant: "lamp",
  },
  {
    id: "acc-2",
    name: "Tropical Fern",
    price: 8,
    image: "https://images.unsplash.com/photo-1485955900006-10f4d324d411?auto=format&fit=crop&w=800&q=80",
    category: "accessory",
    tagline: "Low-care floor plant · ceramic pot",
    badge: "New",
    variant: "plant",
  },
  {
    id: "acc-3",
    name: "Studio Mic",
    price: 25,
    image: "https://images.unsplash.com/photo-1590602847861-f357a9332bbc?auto=format&fit=crop&w=800&q=80",
    category: "accessory",
    tagline: "Broadcast mic on a boom arm",
    variant: "mic",
  },
  {
    id: "acc-4",
    name: "Tech Mat",
    price: 12,
    image: "https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?auto=format&fit=crop&w=800&q=80",
    category: "accessory",
    tagline: "Felt desk mat · 90 × 40 cm",
    variant: "mat",
  },
];

export const REVIEWS = [
  {
    name: "Sarah Jenkins",
    role: "Freelance Designer",
    location: "Canggu",
    content: "DeskLab changed my life in Bali. I used to work from my kitchen table, but now I have a professional studio setup that was delivered in hours.",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop"
  },
  {
    name: "Lighthouse Tech",
    role: "Software Startup",
    location: "Ubud",
    content: "Setting up our first office in Bali was a breeze. We rented 10 complete workstations and everything was installed perfectly before we arrived.",
    avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop"
  },
  {
    name: "Marco Rossi",
    role: "Digital Nomad",
    location: "Uluwatu",
    content: "The quality of the standing desks is incredible. It's the only way to stay productive while enjoying the island life. Highly recommended!",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop"
  }
];

export const DELIVERY_STEPS = [
  { title: "Order Confirmed", desc: "Your setup is reserved", status: "completed", icon: CheckCircle2 },
  { title: "Quality Check", desc: "Testing every hinge and cable", status: "current", icon: Box },
  { title: "Out for Delivery", desc: "Navigating Canggu traffic", status: "pending", icon: Truck },
  { title: "Delivered", desc: "Enjoy your Bali oasis!", status: "pending", icon: MapPin },
];

export const PAYMENT_STEPS = [
  "Connecting to secure gateway...",
  "Validating digital workspace credentials...",
  "Processing payment...",
  "Finalizing order..."
];

export const CATEGORIES: { id: Category; label: string; icon: LucideIcon }[] = [
  { id: "desk", label: "Desk", icon: Table2 },
  { id: "chair", label: "Chair", icon: Armchair },
  { id: "monitor", label: "Monitor", icon: Monitor },
  { id: "accessory", label: "Accessory", icon: LampDesk },
];

export const RENTAL_TERMS: RentalTerm[] = [
  { months: 1, discount: 0, label: "1 mo" },
  { months: 3, discount: 0.05, label: "3 mo" },
  { months: 6, discount: 0.1, label: "6 mo" },
  { months: 12, discount: 0.15, label: "12 mo" },
];

export const DEFAULT_SELECTIONS: Record<Category, Product | null> = {
  desk: PRODUCTS.find((p) => p.id === "desk-1") ?? null,
  chair: PRODUCTS.find((p) => p.id === "chair-1") ?? null,
  monitor: null,
  accessory: null,
};

export const SHOWCASE_PRESETS: { name: string; vibe: string; mode: SceneMode; productIds: string[] }[] = [
  { name: "Canggu Creator", vibe: "Ultrawide + warm task light", mode: "day", productIds: ["desk-1", "chair-1", "mon-1", "acc-1"] },
  { name: "Ubud Deep Work", vibe: "Vertical code screen + jungle green", mode: "day", productIds: ["desk-3", "chair-3", "mon-4", "acc-2"] },
  { name: "Uluwatu Night Shift", vibe: "Dual 4K + standing desk", mode: "night", productIds: ["desk-2", "chair-2", "mon-2", "acc-1"] },
  { name: "Seminyak Studio", vibe: "Teak slab + podcast-ready mic", mode: "night", productIds: ["desk-4", "chair-4", "mon-3", "acc-3"] },
];
