import type { ApiOrder } from "@/apis/order-api";
import type { OrderWithItems } from "@/types/order";
import { toProduct } from "@/utils/map-product";

export const toOrder = (apiOrder: ApiOrder): OrderWithItems => ({
  id: String(apiOrder.id),
  buyer_id: String(apiOrder.buyerId),
  total_price: Number(apiOrder.totalPrice),
  status: apiOrder.status,
  created_at: apiOrder.createdAt,
  items: apiOrder.OrderItems.map(item => ({
    id: String(item.id),
    order_id: String(item.orderId),
    product_id: String(item.productId),
    quantity: item.quantity,
    price_at_purchase: Number(item.priceAtPurchase),
    product: toProduct(item.Product),
  })),
});
