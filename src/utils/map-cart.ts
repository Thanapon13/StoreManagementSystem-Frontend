import type { ApiCart } from "@/apis/cart-api";
import type { CartItemWithProduct } from "@/types/cart";
import { toProduct } from "@/utils/map-product";

export const toCartItems = (apiCart: ApiCart): CartItemWithProduct[] =>
  apiCart.CartItems.map(item => ({
    id: String(item.id),
    cart_id: String(item.cartId),
    product_id: String(item.productId),
    quantity: item.quantity,
    product: toProduct(item.Product),
  }));
