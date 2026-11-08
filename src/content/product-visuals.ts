import type { ProductType } from "@/features/products/catalog";

export type ProductVisual = {
  image: string;
  imageAlt: string;
  objectPosition: string;
  gradient: string;
  accent: string;
};

/** Fotos temáticas por linha — `public/image/products/*.jpg` (Unsplash, uso editorial). */
export const PRODUCT_VISUALS: Record<ProductType, ProductVisual> = {
  auto: {
    image: "/image/products/auto.jpg",
    imageAlt: "Carro em estrada, contexto de proteção veicular",
    objectPosition: "55% 45%",
    gradient:
      "linear-gradient(152deg, rgb(10 36 38 / 0.88) 0%, rgb(16 45 48 / 0.72) 42%, rgb(33 134 108 / 0.5) 100%)",
    accent: "from-brand-green/30 to-transparent",
  },
  incendio: {
    image: "/image/products/incendio.jpg",
    imageAlt: "Fachada de casa residencial",
    objectPosition: "50% 40%",
    gradient:
      "linear-gradient(158deg, rgb(16 45 48 / 0.9) 0%, rgb(23 59 58 / 0.72) 48%, rgb(180 90 40 / 0.38) 100%)",
    accent: "from-amber-400/25 to-transparent",
  },
  fianca: {
    image: "/image/products/fianca.jpg",
    imageAlt: "Ambiente interno acolhedor de imóvel para locação",
    objectPosition: "50% 55%",
    gradient:
      "linear-gradient(155deg, rgb(12 32 48 / 0.9) 0%, rgb(16 45 48 / 0.75) 50%, rgb(56 120 160 / 0.4) 100%)",
    accent: "from-sky-300/20 to-transparent",
  },
  emprestimos: {
    image: "/image/products/emprestimos.jpg",
    imageAlt: "Planejamento financeiro e documentos",
    objectPosition: "48% 42%",
    gradient:
      "linear-gradient(148deg, rgb(10 36 38 / 0.92) 0%, rgb(30 70 65 / 0.75) 45%, rgb(184 245 213 / 0.35) 100%)",
    accent: "from-brand-mint/40 to-transparent",
  },
};
