import axios from "../config/axios";

export type CreateProductResponse = {
  message: string;
  data: { id: number };
};

export type ApiProduct = {
  id: number;
  title: string;
  description: string | null;
  unitPrice: string;
  quantity: number;
  sellerId: number;
  createdAt: string;
  images: { id: number; url: string; sortOrder: number }[];
  // only present on GET /product (the public list) — GET /product/my omits it
  seller?: { id: number; email: string };
};

export type ProductAllResponse = {
  data: ApiProduct[];
  total: number;
};

export type ProductOneResponse = {
  data: ApiProduct;
};

export type ProductFilters = {
  search?: string;
  minPrice?: number;
  maxPrice?: number;
  page?: number;
  limit?: number;
};

export const createProduct = (input: FormData) =>
  axios.post<CreateProductResponse>("/product/seller", input);

export const myProducts = () =>
  axios.get<ProductAllResponse>("/product/seller/my");

export const productAll = (params?: ProductFilters) =>
  axios.get<ProductAllResponse>("/product/", { params });

export const getProduct = (id: number | string) =>
  axios.get<ProductOneResponse>(`/product/${id}`);

export const updateProduct = (id: number | string, input: FormData) =>
  axios.patch<{ message: string } & ProductOneResponse>(`/product/seller/${id}`, input);

export const deleteProduct = (id: number | string) =>
  axios.delete<{ message: string }>(`/product/seller/${id}`);
