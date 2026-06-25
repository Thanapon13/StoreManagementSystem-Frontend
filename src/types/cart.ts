import type { Product } from "@/types/product";

export interface Cart {
  id: string;
  buyer_id: string;
  created_at: string;
}

export interface CartItem {
  id: string;
  cart_id: string;
  product_id: string;
  quantity: number;
}

export interface CartItemWithProduct extends CartItem {
  product: Product;
}
