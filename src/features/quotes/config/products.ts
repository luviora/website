import type { ProductType } from "@/features/products/catalog";
import type { QuoteProductConfig } from "@/features/quotes/domain/step";

export const QUOTE_CONFIG: Record<ProductType, QuoteProductConfig> = {
  auto: {
    productTitle: "Seguro Auto",
    disclosures: [
      "Marca, modelo e ano vêm da tabela FIPE para identificar o veículo.",
      "O valor de mercado FIPE não é prêmio de seguro nem proposta.",
      "Cotações reais dependem de integração com seguradoras parceiras.",
    ],
    steps: [
      {
        id: "vehicle",
        title: "Qual é o seu carro?",
        description:
          "Digite a marca e escolha o modelo. O ano vem só da lista FIPE, para não haver confusão.",
        fields: [
          { name: "brand", label: "Marca", type: "fipeBrand", required: true },
          {
            name: "brandCode",
            label: "Código da marca",
            type: "hidden",
            required: true,
          },
          { name: "model", label: "Modelo", type: "fipeModel", required: true },
          {
            name: "modelCode",
            label: "Código do modelo",
            type: "hidden",
            required: true,
          },
          {
            name: "year",
            label: "Ano e combustível",
            type: "fipeYear",
            required: true,
          },
          {
            name: "yearCode",
            label: "Código do ano",
            type: "hidden",
            required: true,
          },
          { name: "fipeCode", label: "Código FIPE", type: "hidden" },
        ],
      },
      {
        id: "usage",
        title: "Como você usa o carro?",
        description:
          "Conte o uso principal e onde ele passa a noite. O endereço sai do CEP automaticamente.",
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
            type: "cep",
            placeholder: "00000-000",
            required: true,
          },
          { name: "street", label: "Rua", type: "text", required: true },
          {
            name: "neighborhood",
            label: "Bairro",
            type: "text",
            required: true,
          },
          { name: "city", label: "Cidade", type: "text", required: true },
          { name: "state", label: "UF", type: "text", required: true },
        ],
      },
      {
        id: "coverage",
        title: "O que você quer proteger?",
        description:
          "Toque nas coberturas que fazem sentido. Se preferir, peça todas de uma vez.",
        fields: [
          {
            name: "coverages",
            label: "Coberturas",
            type: "coverageCards",
            required: true,
          },
        ],
      },
      {
        id: "contact",
        title: "Por onde falamos com você?",
        description:
          "Deixe um contato tranquilo. Usamos só para seguir com a simulação quando a operação estiver ativa.",
        fields: [
          { name: "name", label: "Seu nome", type: "text", required: true },
          {
            name: "cpf",
            label: "CPF",
            type: "cpf",
            placeholder: "000.000.000-00",
            required: true,
          },
          {
            name: "phone",
            label: "Telefone / WhatsApp",
            type: "phone",
            placeholder: "(00) 00000-0000",
            required: true,
          },
          { name: "email", label: "E-mail", type: "email", required: true },
          {
            name: "consent",
            label:
              "Autorizo o encaminhamento dos dados a parceiros quando a integração estiver ativa.",
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
        title: "Conte um pouco sobre o imóvel",
        description: "Residencial ou comercial? Você é dono ou mora de aluguel?",
        fields: [
          {
            name: "propertyType",
            label: "Tipo do imóvel",
            type: "select",
            options: [
              { value: "residential", label: "Residencial" },
              { value: "commercial", label: "Comercial" },
            ],
            required: true,
          },
          {
            name: "relation",
            label: "Sua relação com o imóvel",
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
        title: "Onde fica o imóvel?",
        description:
          "Informe o CEP. Preenchemos o endereço; se a rua não vier, você pode escrever.",
        fields: [
          {
            name: "cep",
            label: "CEP",
            type: "cep",
            placeholder: "00000-000",
            required: true,
          },
          { name: "street", label: "Rua", type: "text", required: true },
          {
            name: "neighborhood",
            label: "Bairro",
            type: "text",
            required: true,
          },
          { name: "city", label: "Cidade", type: "text", required: true },
          { name: "state", label: "UF", type: "text", required: true },
        ],
      },
      {
        id: "values",
        title: "Qual a referência de valor?",
        description:
          "Um valor aproximado ajuda os parceiros. Não é capital segurado automático.",
        fields: [
          {
            name: "estimatedValue",
            label: "Valor estimado do imóvel (R$)",
            type: "currency",
            placeholder: "R$ 0,00",
            helper: "Referência. Não é capital segurado automático.",
            required: true,
          },
        ],
      },
      {
        id: "contact",
        title: "Por onde falamos com você?",
        description: "Só precisamos de um jeito simples de retornar.",
        fields: [
          { name: "name", label: "Seu nome", type: "text", required: true },
          {
            name: "cpf",
            label: "CPF",
            type: "cpf",
            placeholder: "000.000.000-00",
            required: true,
          },
          {
            name: "phone",
            label: "Telefone / WhatsApp",
            type: "phone",
            placeholder: "(00) 00000-0000",
            required: true,
          },
          { name: "email", label: "E-mail", type: "email", required: true },
          {
            name: "consent",
            label:
              "Li e concordo com o uso dos dados conforme política de privacidade.",
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
        title: "Quem vai locar?",
        description: "Pessoa física ou empresa, e se o imóvel é para morar ou trabalhar.",
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
            label: "Finalidade da locação",
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
        title: "Como é o aluguel?",
        description: "Valores aproximados já ajudam na análise do parceiro.",
        fields: [
          {
            name: "rentAmount",
            label: "Valor mensal do aluguel (R$)",
            type: "currency",
            placeholder: "R$ 0,00",
            required: true,
          },
          {
            name: "charges",
            label: "Encargos mensais aproximados (R$)",
            type: "currency",
            placeholder: "R$ 0,00",
          },
        ],
      },
      {
        id: "location",
        title: "Onde fica o imóvel alugado?",
        description:
          "O CEP preenche o endereço. Se a rua não aparecer, você completa na mão.",
        fields: [
          {
            name: "cep",
            label: "CEP",
            type: "cep",
            placeholder: "00000-000",
            required: true,
          },
          { name: "street", label: "Rua", type: "text", required: true },
          {
            name: "neighborhood",
            label: "Bairro",
            type: "text",
            required: true,
          },
          { name: "city", label: "Cidade", type: "text", required: true },
          { name: "state", label: "UF", type: "text", required: true },
        ],
      },
      {
        id: "contact",
        title: "Por onde falamos com você?",
        description: "Guardamos o contato para seguir com a análise quando houver integração.",
        fields: [
          { name: "name", label: "Seu nome", type: "text", required: true },
          {
            name: "document",
            label: "CPF ou CNPJ",
            type: "document",
            placeholder: "000.000.000-00",
            required: true,
          },
          {
            name: "phone",
            label: "Telefone / WhatsApp",
            type: "phone",
            placeholder: "(00) 00000-0000",
            required: true,
          },
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
      "Se a garantia for veículo, a identificação usa a tabela FIPE (não é proposta de crédito).",
    ],
    steps: [
      {
        id: "profile",
        title: "Vamos entender o seu perfil",
        description: "Pessoa física ou empresa, e para que você busca o crédito.",
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
            label: "Para que é o crédito?",
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
        description: "Pode ser aproximado. Sem taxa ou CET inventados aqui.",
        fields: [
          {
            name: "amount",
            label: "Valor desejado (R$)",
            type: "currency",
            placeholder: "R$ 0,00",
            required: true,
          },
        ],
      },
      {
        id: "collateral",
        title: "Tem algum bem em garantia?",
        description:
          "Se for veículo, no próximo passo buscamos marca e modelo na FIPE.",
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
            type: "currency",
            placeholder: "R$ 0,00",
            helper: "Opcional nesta etapa.",
          },
        ],
      },
      {
        id: "vehicleFipe",
        title: "Qual veículo entra como garantia?",
        description:
          "Busque na FIPE. O ano vem só da lista oficial, sem digitar número solto.",
        fields: [
          { name: "brand", label: "Marca", type: "fipeBrand", required: true },
          {
            name: "brandCode",
            label: "Código da marca",
            type: "hidden",
            required: true,
          },
          { name: "model", label: "Modelo", type: "fipeModel", required: true },
          {
            name: "modelCode",
            label: "Código do modelo",
            type: "hidden",
            required: true,
          },
          {
            name: "year",
            label: "Ano e combustível",
            type: "fipeYear",
            required: true,
          },
          {
            name: "yearCode",
            label: "Código do ano",
            type: "hidden",
            required: true,
          },
          { name: "fipeCode", label: "Código FIPE", type: "hidden" },
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
          { name: "document", label: "CPF ou CNPJ", type: "document", placeholder: "000.000.000-00", required: true },
          { name: "phone", label: "Telefone", type: "phone", placeholder: "(00) 00000-0000", required: true },
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
