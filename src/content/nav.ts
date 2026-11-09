/** Taxonomia canônica do header (desktop dropdowns + drawer mobile). */

export type NavLeaf = {
  label: string;
  href: string;
  description?: string;
};

export type NavItem =
  | { type: "link"; label: string; href: string }
  | { type: "dropdown"; id: string; label: string; children: readonly NavLeaf[] };

export const primaryNav = [
  {
    type: "dropdown",
    id: "seguros",
    label: "Seguros",
    children: [
      {
        label: "Seguro Auto",
        href: "/seguros/auto",
        description: "Proteção para o seu carro",
      },
      {
        label: "Seguro Incêndio",
        href: "/seguros/incendio",
        description: "Residencial ou comercial",
      },
      {
        label: "Seguro Fiança",
        href: "/seguros/fianca",
        description: "Para locação com análise",
      },
    ],
  },
  {
    type: "link",
    label: "Empréstimos",
    href: "/emprestimos",
  },
  {
    type: "dropdown",
    id: "servicos",
    label: "Serviços",
    children: [
      {
        label: "Abrir sinistro",
        href: "/abrir-sinistro",
        description: "Aviso e orientação",
      },
      {
        label: "Minhas cotações",
        href: "/minhas-cotacoes",
        description: "Acompanhar simulações",
      },
      {
        label: "Para corretores",
        href: "/para-corretores",
        description: "Área do parceiro",
      },
    ],
  },
  {
    type: "dropdown",
    id: "ajuda",
    label: "Ajuda",
    children: [
      {
        label: "Como funciona",
        href: "/como-funciona",
        description: "Passo a passo da simulação",
      },
      {
        label: "Dúvidas",
        href: "/duvidas",
        description: "Perguntas frequentes",
      },
    ],
  },
] as const satisfies readonly NavItem[];
