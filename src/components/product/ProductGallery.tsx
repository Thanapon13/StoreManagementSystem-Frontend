import { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { FreeMode, Navigation, Thumbs } from "swiper/modules";
import type { Swiper as SwiperType } from "swiper";
import { cn } from "@/lib/utils";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/free-mode";
import "swiper/css/thumbs";

type ProductGalleryProps = {
  images: string[];
  alt: string;
};

export default function ProductGallery({ images, alt }: ProductGalleryProps) {
  const [thumbsSwiper, setThumbsSwiper] = useState<SwiperType | null>(null);
  const gallery = images.length > 0 ? images : ["/placeholder.svg"];

  return (
    <div className="flex flex-col gap-3">
      <Swiper
        modules={[Navigation, Thumbs]}
        thumbs={{ swiper: thumbsSwiper }}
        navigation={gallery.length > 1}
        className="aspect-square w-full overflow-hidden rounded-3xl shadow-sm ring-1 ring-foreground/5"
      >
        {gallery.map((url, index) => (
          <SwiperSlide key={url + index}>
            <img
              src={url}
              alt={`${alt} — image ${index + 1}`}
              crossOrigin="anonymous"
              className="h-full w-full object-cover"
            />
          </SwiperSlide>
        ))}
      </Swiper>

      {gallery.length > 1 && (
        <Swiper
          modules={[FreeMode, Thumbs]}
          onSwiper={setThumbsSwiper}
          watchSlidesProgress
          freeMode
          spaceBetween={12}
          slidesPerView={Math.min(gallery.length, 6)}
          className="product-gallery-thumbs h-20"
        >
          {gallery.map((url, index) => (
            <SwiperSlide key={url + index} className="!h-full !w-auto">
              {({ isActive }) => (
                <button
                  type="button"
                  className={cn(
                    "aspect-square h-full overflow-hidden rounded-xl ring-2 transition-opacity",
                    isActive
                      ? "ring-primary opacity-100"
                      : "opacity-60 ring-transparent hover:opacity-100",
                  )}
                >
                  <img
                    src={url}
                    alt={`${alt} thumbnail ${index + 1}`}
                    crossOrigin="anonymous"
                    className="h-full w-full object-cover"
                  />
                </button>
              )}
            </SwiperSlide>
          ))}
        </Swiper>
      )}
    </div>
  );
}
