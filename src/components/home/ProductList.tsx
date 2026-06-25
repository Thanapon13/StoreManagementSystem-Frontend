import ProductCard from "../product/ProductCard";
import ProductCardSkeleton from "../product/ProductCardSkeleton";
import type { Product } from "@/types/product";

type ProductListProps = {
  products: Product[];
  isLoading?: boolean;
  skeletonCount?: number;
};

const ProductList = ({
  products,
  isLoading = false,
  skeletonCount = 4,
}: ProductListProps) => {
  return (
    <div className="grid grid-cols-2 gap-5 sm:grid-cols-4">
      {isLoading
        ? Array.from({ length: skeletonCount }).map((_, index) => (
            <ProductCardSkeleton key={index} />
          ))
        : products.map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
    </div>
  );
};

export default ProductList;
