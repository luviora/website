import type { Metadata } from "next";
import { UtilityPage } from "@/components/marketing/utility-page";

export const metadata: Metadata = {
  title: "Abrir sinistro",
  description:
    "Abra um sinistro com orientação clara. Em demonstração, o fluxo está preparado para validação de produto.",
  alternates: { canonical: "/abrir-sinistro" },
  openGraph: {
    title: "Abrir sinistro | Nuviora",
    description:
      "Abra um sinistro com orientação clara. Em demonstração, o fluxo está preparado para validação de produto.",
    url: "/abrir-sinistro",
  },
};

export default function AbrirSinistroPage() {
  return (
    <UtilityPage
      eyebrow="Sinistros"
      title="Abrir sinistro"
      body="Organize o aviso de sinistro com passos claros. Quando a operação estiver integrada, o encaminhamento segue para os parceiros responsáveis pela apólice."
      primaryHref="/duvidas"
      primaryLabel="Ver dúvidas"
      secondaryHref="/#cotador"
      secondaryLabel="Simular proteção"
    />
  );
}
