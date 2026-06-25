type ProductStatusBadgeProps = {
  outOfStock: boolean;
  lowStock: boolean;
  quantity: number;
};

const ProductStatusBadge = ({
  outOfStock,
  lowStock,
  quantity,
}: ProductStatusBadgeProps) => {
  if (outOfStock) {
    return (
      <span className="absolute left-3 top-3 rounded-full bg-destructive/90 px-2.5 py-1 text-[11px] font-semibold uppercase tracking-wide text-white shadow-sm backdrop-blur">
        Sold out
      </span>
    );
  }

  if (lowStock) {
    return (
      <span className="absolute left-3 top-3 rounded-full bg-background/85 px-2.5 py-1 text-[11px] font-semibold uppercase tracking-wide text-foreground shadow-sm ring-1 ring-border/60 backdrop-blur">
        Only {quantity} left
      </span>
    );
  }

  return null;
};

export default ProductStatusBadge;
