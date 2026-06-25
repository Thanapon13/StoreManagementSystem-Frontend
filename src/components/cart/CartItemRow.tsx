import { Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import type { CartItemWithProduct } from "@/types";

interface CartItemRowProps {
  item: CartItemWithProduct;
  onUpdateQuantity: (cartItemId: string, quantity: number) => void;
  onRemove: (cartItemId: string) => void;
}

const CartItemRow = ({ item, onUpdateQuantity, onRemove }: CartItemRowProps) => {
  return (
    <div className="flex items-center gap-4 py-4">
      <img
        src={item.product.image}
        alt={item.product.title}
        className="size-16 rounded-xl object-cover shadow-sm"
      />
      <div className="flex-1">
        <p className="font-medium">{item.product.title}</p>
        <p className="text-sm text-muted-foreground">฿{item.product.unit_price.toLocaleString()}</p>
      </div>
      <Input
        type="number"
        min={1}
        max={item.product.quantity}
        value={item.quantity}
        onChange={(e) => onUpdateQuantity(item.id, Math.max(1, Number(e.target.value)))}
        className="w-16 rounded-full text-center"
      />
      <p className="w-20 text-right font-semibold text-primary">
        ฿{(item.product.unit_price * item.quantity).toLocaleString()}
      </p>
      <Button
        variant="ghost"
        size="icon"
        className="rounded-full text-muted-foreground hover:text-destructive"
        onClick={() => onRemove(item.id)}
        aria-label="Remove item"
      >
        <Trash2 />
      </Button>
    </div>
  );
};

export default CartItemRow;
