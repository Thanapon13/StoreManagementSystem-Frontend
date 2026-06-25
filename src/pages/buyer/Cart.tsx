import { useEffect, useMemo, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { ShoppingCart } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Skeleton } from "@/components/ui/skeleton";
import CartItemRow from "@/components/cart/CartItemRow";
import EmptyState from "@/components/common/EmptyState";
import { getCart, updateCartItem, removeCartItem } from "@/apis/cart-api";
import { toCartItems } from "@/utils/map-cart";
import { validateCartQuantity } from "@/validators/validate-cart";
import useCart from "@/hooks/useCart";
import type { CartItemWithProduct } from "@/types";

const CartPage = () => {
  const [items, setItems] = useState<CartItemWithProduct[]>([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const { refreshCart } = useCart();

  const fetchCart = async () => {
    try {
      const { data } = await getCart();
      setItems(toCartItems(data.data));
    } catch {
      toast.error("Failed to load cart.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCart();
  }, []);

  const subtotal = useMemo(
    () => items.reduce((sum, item) => sum + item.product.unit_price * item.quantity, 0),
    [items]
  );

  const handleUpdateQuantity = async (cartItemId: string, quantity: number) => {
    const result = validateCartQuantity(quantity);
    if (!result.ok) {
      toast.error(result.error);
      return;
    }

    const validQuantity = result.data;
    setItems((prev) => prev.map((item) => (item.id === cartItemId ? { ...item, quantity: validQuantity } : item)));

    try {
      await updateCartItem(cartItemId, validQuantity);
      await refreshCart();
    } catch (err) {
      const message =
        (axios.isAxiosError(err) && err.response?.data?.message) || "Failed to update quantity.";
      toast.error(message);
      fetchCart();
    }
  };

  const handleRemove = async (cartItemId: string) => {
    try {
      await removeCartItem(cartItemId);
      setItems((prev) => prev.filter((item) => item.id !== cartItemId));
      await refreshCart();
      toast.success("Item removed from cart.");
    } catch {
      toast.error("Failed to remove item.");
    }
  };

  if (loading) {
    return (
      <div className="flex flex-col gap-4">
        <Skeleton className="h-8 w-40" />
        <Skeleton className="h-24 w-full rounded-2xl" />
        <Skeleton className="h-24 w-full rounded-2xl" />
      </div>
    );
  }

  if (items.length === 0) {
    return (
      <EmptyState
        icon={ShoppingCart}
        title="Your cart is empty"
        description="Browse products and add something you like."
        action={
          <Button asChild>
            <Link to="/products">Browse products</Link>
          </Button>
        }
      />
    );
  }

  return (
    <div className="flex flex-col gap-6">
      <h1 className="text-2xl font-semibold tracking-tight">Your Cart</h1>

      <div className="divide-y rounded-2xl bg-card px-5 shadow-sm ring-1 ring-foreground/5">
        {items.map((item) => (
          <CartItemRow
            key={item.id}
            item={item}
            onUpdateQuantity={handleUpdateQuantity}
            onRemove={handleRemove}
          />
        ))}
      </div>

      <Separator />

      <div className="flex flex-col items-end gap-3">
        <p className="text-lg font-semibold">
          Subtotal: <span className="text-primary">฿{subtotal.toLocaleString()}</span>
        </p>
        <Button onClick={() => navigate("/checkout")} size="lg" className="rounded-full shadow-sm">
          Proceed to checkout
        </Button>
      </div>
    </div>
  );
};

export default CartPage;
