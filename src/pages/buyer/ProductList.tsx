import { useCallback, useEffect, useRef, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { PackageSearch } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Skeleton } from "@/components/ui/skeleton";
import ProductCard from "@/components/product/ProductCard";
import ProductCardSkeleton from "@/components/product/ProductCardSkeleton";
import EmptyState from "@/components/common/EmptyState";
import { productAll } from "@/apis/product-api";
import { toProduct } from "@/utils/map-product";
import type { Product } from "@/types/product";

const PAGE_SIZE = 20;

const ProductListPage = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [search, setSearch] = useState(searchParams.get("search") ?? "");
  const [products, setProducts] = useState<Product[]>([]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);

  const sentinelRef = useRef<HTMLDivElement>(null);
  const hasMore = products.length < total;

  useEffect(() => {
    const handle = setTimeout(() => {
      setSearchParams(search ? { search } : {});
    }, 300);
    return () => clearTimeout(handle);
  }, [search, setSearchParams]);

  // Search (or initial load) — replaces the list and resets pagination.
  useEffect(() => {
    const currentSearch = searchParams.get("search") ?? "";

    const fetchProducts = async () => {
      setLoading(true);
      try {
        const { data } = await productAll({
          search: currentSearch || undefined,
          page: 1,
          limit: PAGE_SIZE,
        });
        setProducts(data.data.map(toProduct));
        setTotal(data.total);
        setPage(1);
      } catch {
        setProducts([]);
        setTotal(0);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [searchParams]);

  const loadMore = useCallback(async () => {
    if (loading || loadingMore || products.length >= total) return;

    const currentSearch = searchParams.get("search") ?? "";
    const nextPage = page + 1;

    setLoadingMore(true);
    try {
      const { data } = await productAll({
        search: currentSearch || undefined,
        page: nextPage,
        limit: PAGE_SIZE,
      });
      setProducts(prev => [...prev, ...data.data.map(toProduct)]);
      setTotal(data.total);
      setPage(nextPage);
    } finally {
      setLoadingMore(false);
    }
  }, [loading, loadingMore, products.length, total, page, searchParams]);

  // Infinite scroll — fetch the next page once the sentinel scrolls into view.
  useEffect(() => {
    const sentinel = sentinelRef.current;
    if (!sentinel) return;

    const observer = new IntersectionObserver(
      entries => {
        if (entries[0]?.isIntersecting) loadMore();
      },
      { rootMargin: "200px" },
    );

    observer.observe(sentinel);
    return () => observer.disconnect();
  }, [loadMore]);

  return (
    <div className="flex flex-col gap-7">
      <div className="flex flex-col gap-1">
        <h1 className="text-2xl font-semibold tracking-tight">Products</h1>
        <p className="text-sm text-muted-foreground">
          Browse items from all sellers.
        </p>
      </div>

      <Input
        placeholder="Search products..."
        value={search}
        className="max-w-sm rounded-full bg-card px-4 shadow-sm"
        onChange={e => setSearch(e.target.value)}
      />

      {loading ? (
        <div className="grid grid-cols-2 gap-5 sm:grid-cols-3 lg:grid-cols-4">
          {Array.from({ length: 8 }).map((_, i) => (
            <Skeleton key={i} className="aspect-square rounded-[1.5rem]" />
          ))}
        </div>
      ) : products.length === 0 ? (
        <EmptyState
          icon={PackageSearch}
          title="No products found"
          description="Try a different search term."
        />
      ) : (
        <>
          <div className="grid grid-cols-2 gap-5 sm:grid-cols-3 lg:grid-cols-4">
            {products.map(product => (
              <ProductCard key={product.id} product={product} />
            ))}
            {loadingMore &&
              Array.from({ length: 4 }).map((_, i) => <ProductCardSkeleton key={`more-${i}`} />)}
          </div>

          {hasMore && <div ref={sentinelRef} className="h-1" aria-hidden />}
        </>
      )}
    </div>
  );
};

export default ProductListPage;
