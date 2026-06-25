import { ArrowUpRight } from "lucide-react";
import { Link } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import ProductStatusBadge from "@/components/product/ProductStatusBadge";
import ProductPriceTag from "@/components/product/ProductPriceTag";
import ProductSellerInfo from "@/components/product/ProductSellerInfo";
import ProductStockStatus from "@/components/product/ProductStockStatus";
import type { Product } from "@/types/product";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  const outOfStock = product.quantity <= 0;
  const lowStock = !outOfStock && product.quantity <= 5;
  const images = product.images.length > 0 ? product.images : ["/placeholder.svg"];

  return (
    <Link
      to={`/products/${product.id}`}
      className="group relative block focus:outline-none"
      aria-label={product.title}
    >
      {/* Soft ambient glow on hover */}
      <div className="pointer-events-none absolute -inset-px rounded-[1.7rem] bg-gradient-to-b from-primary/10 to-transparent opacity-0 blur-md transition-opacity duration-500 group-hover:opacity-100" />

      <article className="relative flex h-full flex-col overflow-hidden rounded-[1.5rem] border border-border/60 bg-card shadow-sm ring-1 ring-white/[0.04] transition-all duration-300 group-hover:-translate-y-1.5 group-hover:border-border group-hover:shadow-xl group-hover:shadow-primary/5 group-focus-visible:ring-2 group-focus-visible:ring-primary/40">
        {/* Media */}
        <div
          className="product-card-swiper relative aspect-square overflow-hidden"
          onClick={e => {
            // Let image taps navigate as usual, but keep nav-arrow/dot taps inside the card.
            const target = e.target as HTMLElement;
            if (target.closest(".swiper-button-next, .swiper-button-prev, .swiper-pagination-bullet")) {
              e.preventDefault();
            }
          }}
        >
          <Swiper
            modules={[Navigation, Pagination]}
            navigation={images.length > 1}
            pagination={images.length > 1 ? { clickable: true } : false}
            preventClicks={false}
            preventClicksPropagation={false}
            className="h-full w-full"
          >
            {images.map((url, index) => (
              <SwiperSlide key={url + index}>
                <img
                  src={url}
                  alt={`${product.title} — image ${index + 1}`}
                  crossOrigin="anonymous"
                  className="h-full w-full object-cover transition-transform duration-500 ease-out group-hover:scale-[1.06]"
                />
              </SwiperSlide>
            ))}
          </Swiper>

          {/* Gradient veil for legibility of overlays */}
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/25 via-transparent to-black/5" />

          {/* Shine sweep on hover */}
          <div className="pointer-events-none absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/25 to-transparent transition-transform duration-700 ease-out group-hover:translate-x-full" />

          <ProductStatusBadge
            outOfStock={outOfStock}
            lowStock={lowStock}
            quantity={product.quantity}
          />

          <ProductPriceTag unitPrice={product.unit_price} />

          {/* Hover arrow */}
          <div className="absolute right-3 top-3 flex size-8 translate-y-1 items-center justify-center rounded-full bg-background/90 text-foreground opacity-0 shadow-md ring-1 ring-border/50 backdrop-blur-md transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100">
            <ArrowUpRight className="size-4" />
          </div>
        </div>

        {/* Body */}
        <div className="flex flex-1 flex-col gap-3 p-5">
          <h3 className="line-clamp-1 text-base font-semibold tracking-tight text-foreground">
            {product.title}
          </h3>

          {product.description && (
            <p className="line-clamp-2 text-sm leading-relaxed text-muted-foreground">
              {product.description}
            </p>
          )}

          {/* Footer */}
          <div className="mt-auto flex items-center justify-between gap-2 border-t border-border/60 pt-3.5">
            <ProductSellerInfo email={product.seller?.email} />
            <ProductStockStatus outOfStock={outOfStock} />
          </div>
        </div>
      </article>
    </Link>
  );
}
