import { siteCopy } from "@/content/site-copy";
import { Reveal } from "@/components/motion/reveal";
import { SectionHeader } from "@/components/marketing/section-header";
import { Container } from "@/components/layout/container";

export function UnderstandSection() {
  const { understand } = siteCopy;
  return (
    <section className="border-y border-border/60 bg-brand-cream/60 py-16 sm:py-20">
      <Container>
        <Reveal>
          <SectionHeader label="Transparência" title={understand.title} />
        </Reveal>

        <ul className="mt-10 max-w-3xl divide-y divide-border/80 border-y border-border/80">
          {understand.items.map((item, index) => (
            <Reveal key={item} as="li" delay={index * 70}>
              <p className="py-5 text-sm leading-relaxed text-muted-foreground sm:text-base">
                {item}
              </p>
            </Reveal>
          ))}
        </ul>
      </Container>
    </section>
  );
}
