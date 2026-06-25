import { createContext, useEffect, useState, type ReactNode } from "react";
import { getCart } from "@/apis/cart-api";
import useAuth from "@/hooks/useAuth";

type CartContextValue = {
  cartCount: number;
  refreshCart: () => Promise<void>;
};

export const CartContext = createContext<CartContextValue | null>(null);

export default function CartContextProvider({
  children,
}: {
  children: ReactNode;
}) {
  const { user } = useAuth();
  const [cartCount, setCartCount] = useState(0);

  const refreshCart = async () => {
    if (!user || user.role !== "buyer") {
      setCartCount(0);
      return;
    }

    try {
      const { data } = await getCart();
      setCartCount(data.data.CartItems.reduce((sum, item) => sum + item.quantity, 0));
    } catch {
      setCartCount(0);
    }
  };

  useEffect(() => {
    refreshCart();
  }, [user]);

  return (
    <CartContext.Provider value={{ cartCount, refreshCart }}>
      {children}
    </CartContext.Provider>
  );
}
