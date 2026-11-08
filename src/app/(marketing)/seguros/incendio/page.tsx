import type { Metadata } from "next";
import { productPages } from "@/content/site-copy";
import { ProductLanding } from "@/components/marketing/product-landing";

export const metadata: Metadata = {
  title: productPages.incendio.title,
};

export default function SeguroIncendioPage() {
  return <ProductLanding product="incendio" />;
}
