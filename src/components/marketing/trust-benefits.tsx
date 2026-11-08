import { Reveal } from "@/components/motion/reveal";
import { ClarityPipeline } from "@/components/marketing/clarity-pipeline";
import { SectionHeader } from "@/components/marketing/section-header";
import { Container } from "@/components/layout/container";

export function TrustBenefits() {
  return (
    <section className="bg-white py-16 sm:py-20">
      <Container>
        <Reveal>
          <SectionHeader
            label="Por que a Nuviora"
            title="Clareza em cada etapa"
            description="Três movimentos simples — no estilo das melhores jornadas digitais de seguro."
          />
        </Reveal>
        <Reveal delay={100}>
          <ClarityPipeline />
        </Reveal>
      </Container>
    </section>
  );
}
