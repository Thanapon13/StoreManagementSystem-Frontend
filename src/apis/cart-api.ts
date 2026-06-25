import axios from "../config/axios";
import type { ApiProduct } from "./product-api";

export type ApiCartItem = {
  id: number;
  quantity: number;
  cartId: number;
  productId: number;
  Product: ApiProduct;
};

export type ApiCart = {
  id: number;
  createdAt: string;
  buyerId: number;
  CartItems: ApiCartItem[];
};

export type CartResponse = {
  data: ApiCart;
};

export const getCart = () => axios.get<CartResponse>("/cart");

export const addCartItem = (productId: number, quantity: number) =>
  axios.post<{ message: string; data: ApiCart }>("/cart/items", {
    productId,
    quantity,
  });

export const updateCartItem = (cartItemId: number | string, quantity: number) =>
  axios.patch<{ message: string; data: ApiCart }>(`/cart/items/${cartItemId}`, {
    quantity,
  });

export const removeCartItem = (cartItemId: number | string) =>
  axios.delete<{ message: string; data: ApiCart }>(`/cart/items/${cartItemId}`);
