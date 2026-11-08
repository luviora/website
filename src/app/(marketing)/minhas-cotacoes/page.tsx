import type { Metadata } from "next";
import { UtilityPage } from "@/components/marketing/utility-page";

export const metadata: Metadata = {
  title: "Minhas cotações",
  description:
    "Acompanhe simulações e cotações em andamento. Em demonstração, use para validação de produto.",
  alternates: { canonical: "/minhas-cotacoes" },
  openGraph: {
    title: "Minhas cotações | Nuviora",
    description:
      "Acompanhe simulações e cotações em andamento. Em demonstração, use para validação de produto.",
    url: "/minhas-cotacoes",
  },
};

export default function MinhasCotacoesPage() {
  return (
    <UtilityPage
      eyebrow="Área do cliente"
      title="Minhas cotações"
      body="Consulte o andamento das suas simulações em um só lugar. Nesta demonstração, a tela existe para validar a jornada de produto sem persistência em parceiros."
      primaryHref="/#cotador"
      primaryLabel="Nova simulação"
      secondaryHref="/para-corretores"
      secondaryLabel="Área do corretor"
    />
  );
}
