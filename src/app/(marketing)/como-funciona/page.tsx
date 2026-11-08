import type { Metadata } from "next";
import { siteCopy } from "@/content/site-copy";
import { Container } from "@/components/layout/container";
import { HowItWorksSection } from "@/components/marketing/how-it-works";
import { UnderstandSection } from "@/components/marketing/understand-section";

export const metadata: Metadata = {
  title: siteCopy.comoFuncionaPage.title,
  description: siteCopy.comoFuncionaPage.intro,
};

export default function ComoFuncionaPage() {
  const { comoFuncionaPage } = siteCopy;
  return (
    <>
      <section className="py-12">
        <Container>
          <h1 className="font-display text-3xl font-bold text-brand-navy">
            {comoFuncionaPage.title}
          </h1>
          <p className="mt-3 max-w-2xl text-muted-foreground">{comoFuncionaPage.intro}</p>
        </Container>
      </section>
      <HowItWorksSection />
      <UnderstandSection />
    </>
  );
}
