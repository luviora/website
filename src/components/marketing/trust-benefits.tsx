import { siteCopy } from "@/content/site-copy";
import { Reveal } from "@/components/motion/reveal";
import { ClarityPipeline } from "@/components/marketing/clarity-pipeline";
import { SectionHeader } from "@/components/marketing/section-header";
import { Container } from "@/components/layout/container";

export function TrustBenefits() {
  const { trust } = siteCopy;
  return (
    <section className="bg-white py-16 sm:py-20">
      <Container>
        <Reveal variant="blur">
          <SectionHeader
            label={trust.label}
            title={trust.title}
            description={trust.description}
          />
        </Reveal>
        <Reveal delay={140} variant="scale">
          <ClarityPipeline />
        </Reveal>
      </Container>
    </section>
  );
}
