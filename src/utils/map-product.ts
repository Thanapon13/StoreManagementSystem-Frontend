import type { ApiProduct } from "@/apis/product-api";
import type { Product } from "@/types/product";

export const toProduct = (apiProduct: ApiProduct): Product => {
  const images = [...apiProduct.images]
    .sort((a, b) => a.sortOrder - b.sortOrder)
    .map(image => image.url);

  return {
    id: String(apiProduct.id),
    seller_id: String(apiProduct.sellerId),
    title: apiProduct.title,
    description: apiProduct.description ?? "",
    unit_price: Number(apiProduct.unitPrice),
    quantity: apiProduct.quantity,
    image: images[0] ?? "",
    images,
    created_at: apiProduct.createdAt,
    seller: apiProduct.seller,
  };
};
