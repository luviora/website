import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import type { ProductDefinition } from "@/features/products/catalog";
import { PRODUCT_VISUALS } from "@/content/product-visuals";
import { ProductIcon } from "@/components/brand/product-icon";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

/** Quadrantes humanizados com BG + overlay (versão anterior). */
export function ProductQuadrantCard({ product }: { product: ProductDefinition }) {
  const visual = PRODUCT_VISUALS[product.id];

  return (
    <article className="group relative min-h-[min(340px,52vw)] overflow-hidden rounded-3xl border border-white/10 shadow-[0_12px_40px_rgb(16_45_48/0.12)] transition-[transform,box-shadow] duration-500 ease-[var(--ease-standard)] hover:-translate-y-1 hover:shadow-[var(--shadow-card-hover)] sm:min-h-[320px]">
      <Image
        src={visual.image}
        alt={visual.imageAlt}
        fill
        sizes="(max-width: 640px) 100vw, 50vw"
        className="object-cover transition-transform duration-700 ease-[var(--ease-standard)] group-hover:scale-[1.04]"
        style={{ objectPosition: visual.objectPosition }}
      />
      <div
        className="absolute inset-0"
        style={{ background: visual.gradient }}
        aria-hidden
      />
      <div
        className={cn(
          "pointer-events-none absolute -right-8 top-0 h-40 w-40 rounded-full bg-gradient-to-bl opacity-80 blur-2xl",
          visual.accent,
        )}
        aria-hidden
      />

      <div className="relative flex h-full min-h-[inherit] flex-col justify-between p-6 text-white sm:p-7">
        <div className="flex items-start justify-between gap-3">
          <ProductIcon product={product.id} size="lg" variant="onPhoto" />
          <ArrowUpRight
            className="size-5 text-brand-mint opacity-0 transition-all duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:opacity-100"
            aria-hidden
          />
        </div>

        <div>
          <h3 className="font-display text-xl font-bold tracking-tight sm:text-[1.35rem]">
            {product.title}
          </h3>
          <p className="mt-2 max-w-[18rem] text-sm leading-relaxed text-white/88 sm:text-[0.9375rem]">
            {product.description}
          </p>
          <div className="mt-5 flex flex-wrap gap-2">
            <Link
              href={product.quoteHref}
              className={cn(
                buttonVariants(),
                "min-h-11 bg-brand-mint text-brand-navy hover:bg-brand-mint/92",
              )}
            >
              Simular agora
            </Link>
            <Link
              href={product.href}
              className={cn(
                buttonVariants({ variant: "outline" }),
                "min-h-11 border-white/35 bg-white/10 text-white hover:bg-white/20 hover:text-white",
              )}
            >
              Saiba mais
            </Link>
          </div>
        </div>
      </div>
    </article>
  );
}
