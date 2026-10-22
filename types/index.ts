export type Category = "desk" | "chair" | "monitor" | "accessory";

export interface Product {
  id: string;
  name: string;
  price: number;
  image: string;
  category: Category;
  tagline: string;
  badge?: string;
  color?: string;
  variant?: string;
}

export type SceneMode = "day" | "night";

export interface RentalTerm {
  months: number;
  discount: number;
  label: string;
}
