import type { Metadata } from "next";
import { siteCopy } from "@/content/site-copy";
import { Container } from "@/components/layout/container";
import { FaqSection } from "@/components/marketing/faq-section";

export const metadata: Metadata = {
  title: siteCopy.faq.pageTitle,
};

export default function DuvidasPage() {
  return (
    <>
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
