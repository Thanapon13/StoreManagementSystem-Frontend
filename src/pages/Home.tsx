import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { productAll } from "@/apis/product-api";
import { toProduct } from "@/utils/map-product";
import type { Product } from "@/types";
import ProductList from "@/components/home/ProductList";

const HomePage = () => {
  const [featuredProducts, setFeaturedProducts] = useState<Product[]>([]);

  useEffect(() => {
    const fetchFeaturedProducts = async () => {
      try {
        const { data } = await productAll();
        setFeaturedProducts(data.data.slice(0, 4).map(toProduct));
      } catch {
        setFeaturedProducts([]);
      }
    };

    fetchFeaturedProducts();
  }, []);

  return (
    <div className="flex flex-col gap-16">
      <section className="relative flex flex-col items-center gap-5 overflow-hidden rounded-3xl bg-card px-6 py-16 text-center shadow-sm ring-1 ring-foreground/5 sm:py-20">
        <div className="pointer-events-none absolute inset-0 -z-10 bg-gradient-to-br from-primary/10 via-transparent to-accent/10" />
        <span className="inline-flex items-center gap-1.5 rounded-full bg-secondary px-3 py-1 text-xs font-medium text-secondary-foreground">
          <Sparkles className="size-3.5" /> Curated picks, every day
        </span>
        <h1 className="max-w-2xl text-4xl font-semibold tracking-tight sm:text-5xl">
          Welcome to <span className="text-primary">StoreFront</span>
        </h1>
        <p className="max-w-md text-muted-foreground">
          A marketplace connecting buyers and sellers. Browse beautifully
          crafted products or start selling today.
        </p>
      </section>

      <section className="flex flex-col gap-6">
        <div className="flex items-end justify-between">
          <div>
            <h2 className="text-2xl font-semibold tracking-tight">
              Featured Products
            </h2>
            <p className="text-sm text-muted-foreground">
              Hand-picked items you might like.
            </p>
          </div>
          <Button asChild variant="ghost" className="rounded-full">
            <Link to="/products">
              View all <ArrowRight className="size-4" />
            </Link>
          </Button>
        </div>

        <ProductList products={featuredProducts} />
      </section>
    </div>
  );
};

export default HomePage;
