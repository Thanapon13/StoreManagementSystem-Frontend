import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { PackageSearch } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Skeleton } from "@/components/ui/skeleton";
import ProductCard from "@/components/product/ProductCard";
import EmptyState from "@/components/common/EmptyState";
import { productAll } from "@/apis/product-api";
import { toProduct } from "@/utils/map-product";
import type { Product } from "@/types/product";

const ProductListPage = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [search, setSearch] = useState(searchParams.get("search") ?? "");
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const handle = setTimeout(() => {
      setSearchParams(search ? { search } : {});
    }, 300);
    return () => clearTimeout(handle);
  }, [search, setSearchParams]);

  useEffect(() => {
    const currentSearch = searchParams.get("search") ?? "";

    const fetchProducts = async () => {
      setLoading(true);
      try {
        const { data } = await productAll({ search: currentSearch || undefined });
        setProducts(data.data.map(toProduct));
      } catch {
        setProducts([]);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [searchParams]);

  return (
    <div className="flex flex-col gap-7">
      <div className="flex flex-col gap-1">
        <h1 className="text-2xl font-semibold tracking-tight">Products</h1>
        <p className="text-sm text-muted-foreground">Browse items from all sellers.</p>
      </div>

      <Input
        placeholder="Search products..."
        value={search}
        className="max-w-sm rounded-full bg-card px-4 shadow-sm"
        onChange={(e) => setSearch(e.target.value)}
      />

      {loading ? (
        <div className="grid grid-cols-2 gap-5 sm:grid-cols-3 lg:grid-cols-4">
          {Array.from({ length: 8 }).map((_, i) => (
            <Skeleton key={i} className="aspect-square rounded-[1.5rem]" />
          ))}
        </div>
      ) : products.length === 0 ? (
        <EmptyState icon={PackageSearch} title="No products found" description="Try a different search term." />
      ) : (
        <div className="grid grid-cols-2 gap-5 sm:grid-cols-3 lg:grid-cols-4">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}
    </div>
  );
};

export default ProductListPage;
