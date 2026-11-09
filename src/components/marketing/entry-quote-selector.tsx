"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { siteCopy } from "@/content/site-copy";
import { PRODUCTS } from "@/features/products/catalog";
import { PRODUCT_VISUALS } from "@/content/product-visuals";
import { trackEvent } from "@/lib/analytics/events";
import { cn } from "@/lib/utils";

export function EntryQuoteSelector() {
  const { quoteEntry } = siteCopy;
  return (
    <aside
      id="cotador"
      className="scroll-mt-28 overflow-hidden rounded-none bg-white shadow-[0_24px_64px_rgb(16_45_48/0.16)] ring-1 ring-black/[0.05] sm:rounded-2xl"
      aria-labelledby="cotador-title"
    >
      <div
        className="h-1.5 w-full bg-gradient-to-r from-brand-green via-brand-mint to-brand-green/50"
        aria-hidden
      />
      <div className="p-5 sm:p-6 lg:p-7">
        <h2
          id="cotador-title"
          className="font-display text-xl font-bold tracking-tight text-brand-navy sm:text-2xl"
        >
          {quoteEntry.title}
        </h2>
        <p className="mt-1.5 text-sm text-muted-foreground sm:text-base">
          {quoteEntry.subtitle}
        </p>

        <ul className="mt-6 grid grid-cols-2 gap-3 lg:grid-cols-4 lg:gap-3.5">
          {PRODUCTS.map((product, index) => {
            const visual = PRODUCT_VISUALS[product.id];
            const num = String(index + 1).padStart(2, "0");
            return (
              <li key={product.id}>
                <Link
                  href={product.quoteHref}
                  className={cn(
                    "group relative flex aspect-[5/4] flex-col justify-between overflow-hidden rounded-2xl sm:aspect-[4/3]",
                    "shadow-[0_8px_28px_rgb(16_45_48/0.1)]",
                    "transition-[transform,box-shadow] duration-500 ease-[var(--ease-standard)]",
                    "hover:-translate-y-2 hover:shadow-[0_22px_52px_rgb(16_45_48/0.22)]",
                    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-green/50 focus-visible:ring-offset-2",
                  )}
                  onClick={() =>
                    trackEvent("product_selected", { product: product.id })
                  }
                >
                  <Image
                    src={visual.image}
                    alt={visual.imageAlt}
                    fill
                    sizes="(max-width: 640px) 160px, (max-width: 1024px) 200px, 180px"
                    quality={55}
                    loading="lazy"
                    fetchPriority="low"
                    className="object-cover transition-transform duration-[900ms] ease-[var(--ease-standard)] group-hover:scale-110"
                    style={{ objectPosition: visual.objectPosition }}
                  />
                  <div
                    className="absolute inset-0"
                    style={{ background: visual.gradient }}
                    aria-hidden
                  />
                  <div
                    className="absolute inset-x-0 bottom-0 h-3/5 bg-gradient-to-t from-brand-navy/92 via-brand-navy/40 to-transparent"
                    aria-hidden
                  />

                  <div className="relative z-10 flex items-start justify-between p-3 sm:p-3.5">
                    <span className="font-display text-xl font-extrabold tabular-nums tracking-tight text-white/90 sm:text-2xl">
                      {num}
                      <span className="text-brand-mint">.</span>
                    </span>
                    <ArrowUpRight
                      className="size-4 text-brand-mint opacity-70 transition-all duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:opacity-100"
                      aria-hidden
                    />
                  </div>

                  <div className="relative z-10 p-3 pt-0 sm:p-3.5 sm:pt-0">
                    <span className="block font-display text-lg font-bold leading-tight tracking-tight text-white sm:text-xl lg:text-[1.35rem]">
                      {product.title}
                    </span>
                  </div>
                </Link>
              </li>
            );
          })}
        </ul>

        <p className="mt-4 text-xs text-muted-foreground sm:text-sm">
          {quoteEntry.demoNote}
        </p>
      </div>
    </aside>
  );
}
