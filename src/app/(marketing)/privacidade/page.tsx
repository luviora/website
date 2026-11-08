import type { Metadata } from "next";
import { Container } from "@/components/layout/container";

export const metadata: Metadata = {
  title: "Privacidade",
  robots: { index: true },
};

export default function PrivacidadePage() {
  return (
    <section className="py-14">
      <Container className="max-w-3xl prose prose-neutral">
        <h1 className="font-display text-3xl font-bold text-brand-navy">
          Política de privacidade
        </h1>
        <p className="mt-4 text-muted-foreground">
          Documento placeholder para o MVP demonstração. Antes da captação real
          de dados, publique texto revisado juridicamente em conformidade com a
          LGPD.
        </p>
      </Container>
    </section>
  );
}
