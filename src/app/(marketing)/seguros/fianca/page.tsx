import type { Metadata } from "next";
import { productPages } from "@/content/site-copy";
import { ProductLanding } from "@/components/marketing/product-landing";

export const metadata: Metadata = {
  title: productPages.fianca.title,
};

export default function SeguroFiancaPage() {
  return <ProductLanding product="fianca" />;
}
