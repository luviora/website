import { siteCopy } from "@/content/site-copy";
import { Reveal } from "@/components/motion/reveal";
import { SectionHeader } from "@/components/marketing/section-header";
import { Container } from "@/components/layout/container";

export function HowItWorksSection() {
  const { howItWorks } = siteCopy;
  const steps = howItWorks.steps;
  return (
    <section className="bg-white py-16 sm:py-20">
      <Container>
        <Reveal>
          <SectionHeader label="Jornada" title={howItWorks.title} />
        </Reveal>

        <ol className="mt-14 grid gap-8 md:grid-cols-3 md:gap-6">
          {steps.map((step, index) => (
            <Reveal key={step.title} as="li" delay={index * 110} variant="left">
              <div className="relative h-full border-t-2 border-brand-mint pt-6">
                <span className="font-display text-4xl font-extrabold tracking-tight text-brand-navy/15">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <h3 className="mt-3 font-display text-lg font-bold text-brand-navy">
                  {step.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground sm:text-[0.9375rem]">
                  {step.body}
                </p>
              </div>
            </Reveal>
          ))}
        </ol>
      </Container>
    </section>
  );
}
