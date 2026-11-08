import { productCopy } from "@/content/site-copy";

export type ProductType = "auto" | "incendio" | "fianca" | "emprestimos";

export interface ProductDefinition {
  id: ProductType;
  title: string;
  description: string;
  icon: string;
  href: string;
  quoteHref: string;
}

export const PRODUCTS: ProductDefinition[] = [
  {
    id: "auto",
    title: "Seguro Auto",
    description: productCopy.auto.short,
    icon: "/products/auto.svg",
    href: "/seguros/auto",
    quoteHref: "/cotar/auto",
  },
  {
    id: "incendio",
    title: "Seguro Incêndio",
    description: productCopy.incendio.short,
    icon: "/products/incendio.svg",
    href: "/seguros/incendio",
    quoteHref: "/cotar/incendio",
  },
  {
    id: "fianca",
    title: "Seguro Fiança",
    description: productCopy.fianca.short,
    icon: "/products/fianca.svg",
    href: "/seguros/fianca",
    quoteHref: "/cotar/fianca",
  },
  {
    id: "emprestimos",
    title: "Empréstimos",
    description: productCopy.emprestimos.short,
    icon: "/products/emprestimos.svg",
    href: "/emprestimos",
    quoteHref: "/cotar/emprestimos",
  },
];

export function getProduct(id: string): ProductDefinition | undefined {
  return PRODUCTS.find((p) => p.id === id);
}

export function isProductType(id: string): id is ProductType {
  return PRODUCTS.some((p) => p.id === id);
}
