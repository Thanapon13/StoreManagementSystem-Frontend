type ProductPriceTagProps = {
  unitPrice: number;
};

const ProductPriceTag = ({ unitPrice }: ProductPriceTagProps) => (
  <div className="absolute bottom-3 right-3 flex items-center gap-1 rounded-full bg-background/90 px-3 py-1.5 text-sm font-semibold text-foreground shadow-md ring-1 ring-border/50 backdrop-blur-md">
    <span className="text-primary">฿</span>
    {unitPrice.toLocaleString()}
  </div>
);

export default ProductPriceTag;
