import type { Metadata } from "next";
import { productPages } from "@/content/site-copy";
import { ProductLanding } from "@/components/marketing/product-landing";

export const metadata: Metadata = {
  title: productPages.auto.title,
};

export default function SeguroAutoPage() {
  return <ProductLanding product="auto" />;
}
