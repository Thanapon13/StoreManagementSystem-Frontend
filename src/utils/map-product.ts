import type { ApiProduct } from "@/apis/product-api";
import type { Product } from "@/types/product";

export const toProduct = (apiProduct: ApiProduct): Product => ({
  id: String(apiProduct.id),
  seller_id: String(apiProduct.sellerId),
  title: apiProduct.title,
  description: apiProduct.description ?? "",
  unit_price: Number(apiProduct.unitPrice),
  quantity: apiProduct.quantity,
  image: apiProduct.images[0]?.url ?? "",
  created_at: apiProduct.createdAt,
  seller: apiProduct.seller,
});
