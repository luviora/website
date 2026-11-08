import {
  Building2,
  Car,
  Flame,
  HandCoins,
  type LucideIcon,
} from "lucide-react";
import type { ProductType } from "@/features/products/catalog";
import { cn } from "@/lib/utils";

const PRODUCT_ICONS: Record<ProductType, LucideIcon> = {
  auto: Car,
  incendio: Flame,
  fianca: Building2,
  emprestimos: HandCoins,
};

const SIZE = {
  sm: { box: "size-10", icon: "size-[1.15rem]" },
  md: { box: "size-12", icon: "size-6" },
  lg: { box: "size-14", icon: "size-7" },
} as const;

export function ProductIcon({
  product,
  size = "md",
  className,
  emphasized = false,
  variant = "default",
}: {
  product: ProductType;
  size?: keyof typeof SIZE;
  className?: string;
  emphasized?: boolean;
  variant?: "default" | "onPhoto";
}) {
  const Icon = PRODUCT_ICONS[product];
  const dim = SIZE[size];

  return (
    <span
      className={cn(
        "inline-flex shrink-0 items-center justify-center rounded-xl",
        "transition-[background-color,color,transform,box-shadow] duration-300 ease-[var(--ease-standard)]",
        variant === "onPhoto"
          ? "bg-white/95 text-brand-green ring-1 ring-white/25 shadow-lg group-hover:scale-105 group-hover:bg-brand-mint group-hover:text-brand-navy"
          : [
              "bg-gradient-to-br from-white via-brand-cream/80 to-brand-mint/25",
              "text-brand-green ring-1 ring-brand-green/15",
              "shadow-[inset_0_1px_0_rgb(255_255_255/0.9),0_4px_14px_rgb(16_45_48/0.06)]",
              emphasized &&
                "group-hover:scale-105 group-hover:bg-brand-green group-hover:text-white group-hover:ring-brand-green/40 group-hover:shadow-[0_8px_20px_rgb(33_134_108/0.25)]",
            ],
        dim.box,
        className,
      )}
      aria-hidden
    >
      <Icon className={dim.icon} strokeWidth={1.65} />
    </span>
  );
}
