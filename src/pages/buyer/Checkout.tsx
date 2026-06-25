import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Skeleton } from "@/components/ui/skeleton";
import { getCart } from "@/apis/cart-api";
import { checkout } from "@/apis/order-api";
import { toCartItems } from "@/utils/map-cart";
import useCart from "@/hooks/useCart";
import type { CartItemWithProduct } from "@/types";

const CheckoutPage = () => {
  const [items, setItems] = useState<CartItemWithProduct[]>([]);
  const [loading, setLoading] = useState(true);
  const [isPlacingOrder, setIsPlacingOrder] = useState(false);
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

  const handlePlaceOrder = async () => {
    setIsPlacingOrder(true);
    try {
      await checkout();
      await refreshCart();
      toast.success("Order placed successfully!");
      navigate("/orders");
    } catch (err) {
      const message =
        (axios.isAxiosError(err) && err.response?.data?.message) || "Failed to place order.";
      toast.error(message);
      fetchCart();
    } finally {
      setIsPlacingOrder(false);
    }
  };

  if (loading) {
    return (
      <div className="mx-auto flex max-w-xl flex-col gap-6 py-10">
        <Skeleton className="h-8 w-32" />
        <Skeleton className="h-48 w-full rounded-3xl" />
      </div>
    );
  }

  return (
    <div className="mx-auto flex max-w-xl flex-col gap-6 py-10">
      <h1 className="text-2xl font-semibold tracking-tight">Checkout</h1>

      <Card className="rounded-3xl shadow-lg shadow-primary/5">
        <CardHeader>
          <CardTitle>Order summary</CardTitle>
        </CardHeader>
        <CardContent className="flex flex-col gap-3">
          {items.map((item) => (
            <div key={item.id} className="flex items-center justify-between text-sm">
              <span>
                {item.product.title} x {item.quantity}
              </span>
              <span className="font-medium">฿{(item.product.unit_price * item.quantity).toLocaleString()}</span>
            </div>
          ))}
          <Separator />
          <div className="flex items-center justify-between text-lg font-semibold">
            <span>Total</span>
            <span className="text-primary">฿{subtotal.toLocaleString()}</span>
          </div>
        </CardContent>
      </Card>

      <Button
        onClick={handlePlaceOrder}
        disabled={isPlacingOrder || items.length === 0}
        size="lg"
        className="rounded-full shadow-sm"
      >
        {isPlacingOrder ? "Placing order..." : "Place order"}
      </Button>
    </div>
  );
};

export default CheckoutPage;
