import { siteCopy } from "@/content/site-copy";
import { PRODUCTS } from "@/features/products/catalog";
import { Reveal } from "@/components/motion/reveal";
import { ProductQuadrantCard } from "@/components/marketing/product-quadrant-card";
import { SectionHeader } from "@/components/marketing/section-header";
import { Container } from "@/components/layout/container";

export function ProductsSection() {
  const { products } = siteCopy;
  return (
    <section
      id="produtos"
      className="scroll-mt-24 bg-gradient-to-b from-white to-brand-cream/40 py-14 sm:py-16"
    >
      <Container>
        <Reveal>
          <SectionHeader
            label="Comece por aqui"
            title={products.sectionTitle}
            description={products.sectionBody}
          />
        </Reveal>

        <ul className="mt-10 grid gap-4 sm:grid-cols-2 sm:gap-5 lg:gap-6">
          {PRODUCTS.map((product, index) => (
            <Reveal key={product.id} as="li" delay={index * 80} variant="scale">
              <ProductQuadrantCard product={product} />
            </Reveal>
          ))}
        </ul>
      </Container>
    </section>
  );
}
