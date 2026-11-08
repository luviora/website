import type { Metadata } from "next";
import { UtilityPage } from "@/components/marketing/utility-page";

export const metadata: Metadata = {
  title: "Para corretores",
  description:
    "Espaço para corretores acompanharem jornadas e validações de produto na Nuviora.",
  alternates: { canonical: "/para-corretores" },
  openGraph: {
    title: "Para corretores | Nuviora",
    description:
      "Espaço para corretores acompanharem jornadas e validações de produto na Nuviora.",
    url: "/para-corretores",
  },
};

export default function ParaCorretoresPage() {
  return (
    <UtilityPage
      eyebrow="Parceiros"
      title="Para corretores"
      body="Área preparada para corretores acompanharem simulações, status e encaminhamentos. Nesta demonstração, o acesso serve para validação de produto e usabilidade."
      primaryHref="/minhas-cotacoes"
      primaryLabel="Ver minhas cotações"
      secondaryHref="/duvidas"
      secondaryLabel="Falar com a Nuviora"
    />
  );
}
