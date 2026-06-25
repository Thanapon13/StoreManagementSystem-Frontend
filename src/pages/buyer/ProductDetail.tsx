import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Skeleton } from "@/components/ui/skeleton";
import useAuth from "@/hooks/useAuth";
import useCart from "@/hooks/useCart";
import { getProduct } from "@/apis/product-api";
import { addCartItem } from "@/apis/cart-api";
import { validateCartQuantity } from "@/validators/validate-cart";
import { toProduct } from "@/utils/map-product";
import type { Product } from "@/types/product";

const ProductDetailPage = () => {
  const { id } = useParams<{ id: string }>();
  const { user, initialLoading } = useAuth();
  const { refreshCart } = useCart();
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [quantity, setQuantity] = useState(1);
  const [adding, setAdding] = useState(false);

  useEffect(() => {
    if (!id) return;

    const fetchProduct = async () => {
      setLoading(true);
      try {
        const { data } = await getProduct(id);
        setProduct(toProduct(data.data));
      } catch {
        setProduct(null);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  if (loading) {
    return (
      <div className="grid grid-cols-1 gap-10 md:grid-cols-2">
        <Skeleton className="aspect-square w-full rounded-3xl" />
        <div className="flex flex-col gap-4">
          <Skeleton className="h-8 w-2/3" />
          <Skeleton className="h-24 w-full" />
        </div>
      </div>
    );
  }

  if (!product) {
    return <p className="text-muted-foreground">Product not found.</p>;
  }

  const outOfStock = product.quantity <= 0;

  const handleAddToCart = async () => {
    const result = validateCartQuantity(quantity);
    if (!result.ok) {
      toast.error(result.error);
      return;
    }

    setAdding(true);
    try {
      await addCartItem(Number(product.id), result.data);
      await refreshCart();
      toast.success(`Added "${product.title}" to your cart.`);
    } catch (err) {
      const message =
        (axios.isAxiosError(err) && err.response?.data?.message) ||
        "Failed to add item to cart.";
      toast.error(message);
    } finally {
      setAdding(false);
    }
  };

  return (
    <div className="grid grid-cols-1 gap-10 md:grid-cols-2">
      <img
        src={product.image}
        alt={product.title}
        className="aspect-square w-full rounded-3xl object-cover shadow-sm ring-1 ring-foreground/5"
      />

      <div className="flex flex-col gap-5">
        <div>
          <h1 className="text-3xl font-semibold tracking-tight">{product.title}</h1>
          <p className="mt-2 text-2xl font-semibold text-primary">฿{product.unit_price.toLocaleString()}</p>
        </div>

        <p className="text-muted-foreground">{product.description}</p>

        <p className="text-sm">
          {outOfStock ? (
            <span className="font-medium text-destructive">Out of stock</span>
          ) : (
            <span className="text-muted-foreground">{product.quantity} unit(s) available</span>
          )}
        </p>

        {!initialLoading && user?.role === "seller" ? null : !initialLoading && !user ? (
          <Button asChild size="lg" className="w-fit rounded-full shadow-sm">
            <Link to="/login">Log in to buy</Link>
          </Button>
        ) : (
          <div className="flex items-center gap-3">
            <Input
              type="number"
              min={1}
              max={product.quantity}
              value={quantity}
              disabled={outOfStock || adding}
              onChange={(e) => setQuantity(Math.max(1, Number(e.target.value)))}
              className="w-20 rounded-full text-center"
            />
            <Button onClick={handleAddToCart} disabled={outOfStock || adding} size="lg" className="rounded-full shadow-sm">
              {adding ? "Adding..." : "Add to cart"}
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductDetailPage;
