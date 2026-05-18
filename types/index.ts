export type Category = "desk" | "chair" | "monitor" | "accessory";

export interface Product {
  id: string;
  name: string;
  price: number;
  image: string;
  category: Category;
  color?: string;
  variant?: string;
}