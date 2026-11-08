import type { ProductType } from "@/features/products/catalog";
import type { QuoteProductConfig } from "@/features/quotes/domain/step";

export const QUOTE_CONFIG: Record<ProductType, QuoteProductConfig> = {
  auto: {
    productTitle: "Seguro Auto",
    disclosures: [
      "Simulação sem consulta a bases externas neste ambiente.",
      "Cotações reais dependem de integração com seguradoras parceiras.",
    ],
    steps: [
      {
        id: "vehicle",
        title: "Vamos conhecer seu carro",
        fields: [
          { name: "brand", label: "Marca", type: "text", required: true },
          { name: "model", label: "Modelo", type: "text", required: true },
          { name: "year", label: "Ano", type: "number", required: true },
        ],
      },
      {
        id: "usage",
        title: "Uso e localização",
        fields: [
          {
            name: "usage",
            label: "Uso principal",
            type: "select",
            required: true,
            options: [
              { value: "particular", label: "Particular" },
              { value: "app", label: "Aplicativo / trabalho" },
            ],
          },
          {
            name: "cep",
            label: "CEP de pernoite",
            type: "text",
            placeholder: "00000-000",
            required: true,
          },
        ],
      },
      {
        id: "coverage",
        title: "Preferências de cobertura",
        fields: [
          {
            name: "coverageLevel",
            label: "Nível desejado",
            type: "select",
            options: [
              { value: "basic", label: "Essencial" },
              { value: "balanced", label: "Equilibrado" },
              { value: "full", label: "Mais completo" },
            ],
            required: true,
          },
        ],
      },
      {
        id: "contact",
        title: "Contato e consentimento",
        fields: [
          { name: "name", label: "Nome", type: "text", required: true },
          { name: "email", label: "E-mail", type: "email", required: true },
          {
            name: "consent",
            label: "Autorizo o encaminhamento dos dados a parceiros quando a integração estiver ativa.",
            type: "checkbox",
            required: true,
          },
        ],
      },
    ],
  },
  incendio: {
    productTitle: "Seguro Incêndio",
    disclosures: [
      "Valor do imóvel não é o mesmo que capital segurado.",
    ],
    steps: [
      {
        id: "property",
        title: "Conte sobre o imóvel",
        fields: [
          {
            name: "propertyType",
            label: "Tipo",
            type: "select",
            options: [
              { value: "residential", label: "Residencial" },
              { value: "commercial", label: "Comercial" },
            ],
            required: true,
          },
          {
            name: "relation",
            label: "Sua relação",
            type: "select",
            options: [
              { value: "owner", label: "Proprietário" },
              { value: "tenant", label: "Inquilino" },
            ],
            required: true,
          },
        ],
      },
      {
        id: "location",
        title: "Localização",
        fields: [
          { name: "city", label: "Cidade", type: "text", required: true },
          { name: "cep", label: "CEP", type: "text", required: true },
        ],
      },
      {
        id: "values",
        title: "Valores e coberturas",
        fields: [
          {
            name: "estimatedValue",
            label: "Valor estimado do imóvel (R$)",
            type: "number",
            helper: "Referência — não é capital segurado automático.",
            required: true,
          },
        ],
      },
      {
        id: "contact",
        title: "Contato",
        fields: [
          { name: "name", label: "Nome", type: "text", required: true },
          { name: "email", label: "E-mail", type: "email", required: true },
          {
            name: "consent",
            label: "Li e concordo com o uso dos dados conforme política de privacidade.",
            type: "checkbox",
            required: true,
          },
        ],
      },
    ],
  },
  fianca: {
    productTitle: "Seguro Fiança",
    disclosures: [
      "Sujeito à análise de crédito e política da seguradora.",
      "Não garantimos aprovação.",
    ],
    steps: [
      {
        id: "profile",
        title: "Perfil do locatário",
        fields: [
          {
            name: "customerType",
            label: "Tipo",
            type: "select",
            options: [
              { value: "PF", label: "Pessoa física" },
              { value: "PJ", label: "Pessoa jurídica" },
            ],
            required: true,
          },
          {
            name: "purpose",
            label: "Finalidade",
            type: "select",
            options: [
              { value: "residential", label: "Residencial" },
              { value: "commercial", label: "Comercial" },
            ],
            required: true,
          },
        ],
      },
      {
        id: "rent",
        title: "Aluguel e encargos",
        fields: [
          {
            name: "rentAmount",
            label: "Valor mensal do aluguel (R$)",
            type: "number",
            required: true,
          },
          {
            name: "charges",
            label: "Encargos mensais aproximados (R$)",
            type: "number",
          },
        ],
      },
      {
        id: "location",
        title: "Localização do imóvel",
        fields: [
          { name: "cep", label: "CEP", type: "text", required: true },
        ],
      },
      {
        id: "contact",
        title: "Contato e revisão",
        fields: [
          { name: "name", label: "Nome", type: "text", required: true },
          { name: "email", label: "E-mail", type: "email", required: true },
          {
            name: "consent",
            label: "Entendo que o seguro fiança depende de análise.",
            type: "checkbox",
            required: true,
          },
        ],
      },
    ],
  },
  emprestimos: {
    productTitle: "Empréstimos",
    disclosures: [
      "Não exibimos taxas, parcelas ou CET sem retorno de parceiro.",
      "Garantia pode envolver alienação fiduciária e risco sobre o bem.",
    ],
    steps: [
      {
        id: "profile",
        title: "Perfil",
        fields: [
          {
            name: "customerType",
            label: "Você é",
            type: "select",
            options: [
              { value: "PF", label: "Pessoa física" },
              { value: "PJ", label: "Pessoa jurídica" },
            ],
            required: true,
          },
          {
            name: "purpose",
            label: "Finalidade",
            type: "select",
            options: [
              { value: "debts", label: "Quitar dívidas" },
              { value: "working-capital", label: "Capital de giro" },
              { value: "invest", label: "Investir" },
              { value: "renovation", label: "Reformar" },
              { value: "other", label: "Outro" },
            ],
            required: true,
          },
        ],
      },
      {
        id: "amount",
        title: "Qual valor você procura?",
        fields: [
          {
            name: "amount",
            label: "Valor desejado (R$)",
            type: "number",
            required: true,
          },
        ],
      },
      {
        id: "collateral",
        title: "Garantia",
        fields: [
          {
            name: "collateral",
            label: "Bem em garantia",
            type: "select",
            options: [
              { value: "property", label: "Imóvel" },
              { value: "vehicle", label: "Veículo" },
              { value: "other", label: "Outros bens" },
              { value: "unknown", label: "Ainda não sei" },
            ],
            required: true,
          },
          {
            name: "collateralValue",
            label: "Valor aproximado do bem (R$)",
            type: "number",
            helper: "Opcional nesta etapa.",
          },
        ],
      },
      {
        id: "risks",
        title: "Condições e riscos",
        description:
          "Empréstimos com garantia passam por avaliação do bem. O não pagamento pode levar à perda do patrimônio oferecido em garantia, conforme contrato com o parceiro.",
        fields: [
          {
            name: "risksAck",
            label: "Li e entendo os riscos descritos acima.",
            type: "checkbox",
            required: true,
          },
        ],
      },
      {
        id: "contact",
        title: "Contato",
        fields: [
          { name: "name", label: "Nome", type: "text", required: true },
          { name: "email", label: "E-mail", type: "email", required: true },
          {
            name: "consent",
            label: "Autorizo contato para encaminhamento quando houver integração.",
            type: "checkbox",
            required: true,
          },
        ],
      },
    ],
  },
};
