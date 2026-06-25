type ProductStockStatusProps = {
  outOfStock: boolean;
};

const ProductStockStatus = ({ outOfStock }: ProductStockStatusProps) => {
  if (outOfStock) return null;

  return (
    <span className="flex shrink-0 items-center gap-1.5 text-xs font-medium text-muted-foreground">
      <span className="size-1.5 rounded-full bg-emerald-500" />
      In stock
    </span>
  );
};

export default ProductStockStatus;
