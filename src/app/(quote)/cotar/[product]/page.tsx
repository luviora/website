import type { Metadata } from "next";
import { Suspense } from "react";
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
  return (
    <Suspense
      fallback={
        <div className="flex flex-1 items-center justify-center px-4 py-16 text-sm text-muted-foreground">
          Carregando simulação…
        </div>
      }
    >
      <QuoteFlow product={product} />
    </Suspense>
  );
}
