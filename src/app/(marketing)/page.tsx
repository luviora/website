import { HeroSection } from "@/components/marketing/hero-section";
import { QuoteEntrySection } from "@/components/marketing/quote-entry-section";
import { TrustBenefits } from "@/components/marketing/trust-benefits";
import { ProductsSection } from "@/components/marketing/products-section";
import { HowItWorksSection } from "@/components/marketing/how-it-works";
import { UnderstandSection } from "@/components/marketing/understand-section";
import { FaqSection } from "@/components/marketing/faq-section";
import { PreFooterSection } from "@/components/marketing/pre-footer-section";

export default function HomePage() {
  return (
    <>
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
