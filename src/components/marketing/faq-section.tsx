import { ChevronDown } from "lucide-react";
import { siteCopy } from "@/content/site-copy";
import { Reveal } from "@/components/motion/reveal";
import { SectionHeader } from "@/components/marketing/section-header";
import { Container } from "@/components/layout/container";

export function FaqSection() {
  const { faq } = siteCopy;
  return (
    <section className="bg-white py-16 sm:py-20">
      <Container>
        <Reveal variant="blur">
          <SectionHeader label={faq.label} title={faq.sectionTitle} />
        </Reveal>

        <div className="mt-10 max-w-2xl">
          {faq.items.map((item, index) => (
            <Reveal key={item.q} delay={index * 70} variant="up">
              <details className="faq-details group border-b border-border/80">
                <summary className="flex cursor-pointer list-none items-center justify-between gap-4 py-5 font-medium text-brand-ink marker:hidden transition-colors hover:text-brand-green [&::-webkit-details-marker]:hidden">
                  <span>{item.q}</span>
                  <ChevronDown
                    className="size-4 shrink-0 text-muted-foreground transition-transform duration-300 group-open:rotate-180"
                    aria-hidden
                  />
                </summary>
                <p className="faq-answer pb-5 pr-8 text-sm leading-relaxed text-muted-foreground">
                  {item.a}
                </p>
              </details>
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}
