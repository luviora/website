import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getProduct, isProductType } from "@/features/products/catalog";
import { QuoteFlow } from "@/features/quotes/components/quote-flow";

type PageProps = {
  params: Promise<{ product: string }>;
};

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { product } = await params;
  const def = getProduct(product);
  return {
    title: def ? `Simular ${def.title}` : "Cotação",
    robots: { index: false, follow: true },
  };
}

export default async function CotarProductPage({ params }: PageProps) {
  const { product } = await params;
  if (!isProductType(product)) {
    notFound();
  }
  return <QuoteFlow product={product} />;
}
