import dynamic from "next/dynamic";
import { HeroSection } from "@/components/marketing/hero-section";
import { QuoteEntrySection } from "@/components/marketing/quote-entry-section";

const TrustBenefits = dynamic(() =>
  import("@/components/marketing/trust-benefits").then((m) => m.TrustBenefits),
);
const ProductsSection = dynamic(() =>
  import("@/components/marketing/products-section").then(
    (m) => m.ProductsSection,
  ),
);
const HowItWorksSection = dynamic(() =>
  import("@/components/marketing/how-it-works").then((m) => m.HowItWorksSection),
);
const UnderstandSection = dynamic(() =>
  import("@/components/marketing/understand-section").then(
    (m) => m.UnderstandSection,
  ),
);
const FaqSection = dynamic(() =>
  import("@/components/marketing/faq-section").then((m) => m.FaqSection),
);
const PreFooterSection = dynamic(() =>
  import("@/components/marketing/pre-footer-section").then(
    (m) => m.PreFooterSection,
  ),
);

const HERO_PRELOAD_SRCSET = [
  "/image/persons/person-1-hero-640.webp 640w",
  "/image/persons/person-1-hero-828.webp 828w",
  "/image/persons/person-1-hero-1080.webp 1080w",
  "/image/persons/person-1-hero.webp 1262w",
].join(", ");

export default function HomePage() {
  return (
    <>
      <link
        rel="preload"
        as="image"
        href="/image/persons/person-1-hero-828.webp"
        imageSrcSet={HERO_PRELOAD_SRCSET}
        imageSizes="(max-width: 640px) 85vw, (max-width: 1024px) 70vw, 48vw"
        fetchPriority="high"
      />
      <HeroSection />
      <QuoteEntrySection />
      <TrustBenefits />
      <ProductsSection />
      <HowItWorksSection />
      <UnderstandSection />
      <FaqSection />
      <PreFooterSection />
    </>
  );
}
