import type { Metadata } from "next";
import { siteCopy } from "@/content/site-copy";
import { Container } from "@/components/layout/container";
import { FaqSection } from "@/components/marketing/faq-section";
import { getSiteUrl } from "@/lib/site";

export const metadata: Metadata = {
  title: siteCopy.faq.pageTitle,
};

export default function DuvidasPage() {
  const siteUrl = getSiteUrl();
  const faqLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "@id": `${siteUrl}/duvidas#faq`,
    url: `${siteUrl}/duvidas`,
    mainEntity: siteCopy.faq.items.map((item) => ({
      "@type": "Question",
      name: item.q,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.a,
      },
    })),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqLd) }}
      />
      <section className="py-12">
        <Container>
          <h1 className="font-display text-3xl font-bold text-brand-navy">
            {siteCopy.faq.pageTitle}
          </h1>
        </Container>
      </section>
      <FaqSection />
    </>
  );
}
