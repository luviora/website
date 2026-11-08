import type { Metadata } from "next";
import { productPages } from "@/content/site-copy";
import { ProductLanding } from "@/components/marketing/product-landing";

export const metadata: Metadata = {
  title: productPages.emprestimos.title,
  description: productPages.emprestimos.lede,
};

export default function EmprestimosPage() {
  return <ProductLanding product="emprestimos" />;
}
