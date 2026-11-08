import type { Metadata } from "next";
import { Container } from "@/components/layout/container";

export const metadata: Metadata = {
  title: "Termos de uso",
};

export default function TermosPage() {
  return (
    <section className="py-14">
      <Container className="max-w-3xl">
        <h1 className="font-display text-3xl font-bold text-brand-navy">
          Termos de uso
        </h1>
        <p className="mt-4 text-muted-foreground">
          Termos placeholder para ambiente de demonstração. Não constituem
          contrato de produto financeiro ou de seguros.
        </p>
      </Container>
    </section>
  );
}
