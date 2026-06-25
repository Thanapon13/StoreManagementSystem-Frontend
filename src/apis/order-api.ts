import axios from "../config/axios";
import type { ApiProduct } from "./product-api";
import type { OrderStatus } from "../types/order";

export type ApiOrderItem = {
  id: number;
  quantity: number;
  priceAtPurchase: string;
  orderId: number;
  productId: number;
  Product: ApiProduct;
};

export type ApiOrder = {
  id: number;
  totalPrice: string;
  status: OrderStatus;
  createdAt: string;
  buyerId: number;
  OrderItems: ApiOrderItem[];
};

export type OrderResponse = {
  data: ApiOrder;
};

export type OrderListResponse = {
  data: ApiOrder[];
};

export const checkout = () => axios.post<{ message: string } & OrderResponse>("/order/checkout");

export const myOrders = () => axios.get<OrderListResponse>("/order");

export const getOrder = (id: number | string) => axios.get<OrderResponse>(`/order/${id}`);

export const sellerOrders = () => axios.get<OrderListResponse>("/order/seller/my");

export const updateOrderStatus = (id: number | string, status: OrderStatus) =>
  axios.patch<{ message: string } & OrderResponse>(`/order/${id}/status`, { status });
