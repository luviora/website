/**
 * Microcopy canônico Nuviora. Única fonte para marketing e cotador (PT-BR).
 *
 * Narrativa da home: proteção e crédito → simule em minutos →
 * melhores propostas dos parceiros → clareza, revisão e demo honesto.
 */

export const siteCopy = {
  hero: {
    title: "Proteção e crédito que cabem no seu momento de vida.",
    titleAccent: "Simule em minutos e tenha as melhores propostas.",
    body: "No momento em que você precisa, escolha o produto, responda com clareza e revise o resumo. As propostas vêm dos parceiros. Aqui você simula sem pressão e sem preço inventado.",
    ctaPrimary: "Começar simulação",
    ctaSecondary: "Ver como funciona",
  },
  quoteEntry: {
    title: "O que você quer resolver hoje?",
    subtitle:
      "Escolha um caminho, simule em minutos e avance rumo às melhores propostas.",
    demoNote: "Demonstração. Sem envio a parceiros.",
  },
  trust: {
    label: "Por que a Nuviora",
    title: "Clareza do início às propostas",
    description:
      "Três movimentos simples para simular com confiança e chegar às melhores opções dos parceiros.",
    pipelineHint: "Explore a jornada: toque em cada etapa",
    items: [
      {
        title: "Poucos passos",
        body: "Só o essencial. Cada pergunta aproxima você da proposta certa.",
        pipelineDetail:
          "Blocos curtos por produto: veículo, imóvel, locação ou crédito. Você avança sem formulário infinito.",
      },
      {
        title: "Linguagem clara",
        body: "Franquia, garantia e riscos em português direto.",
        pipelineDetail:
          "Traduzimos o juridiquês: o que significa, por que pedimos e o que muda na sua simulação.",
      },
      {
        title: "Você no controle",
        body: "Revise o resumo e só então decida seguir para as propostas.",
        pipelineDetail:
          "Antes de qualquer envio, o resumo é seu. No demo, os dados ficam só na sessão.",
      },
    ],
    photoCaption: "Decisões do dia a dia, no seu tempo.",
  },
  products: {
    label: "Comece por aqui",
    sectionTitle: "Escolha por intenção",
    sectionBody:
      "Quatro caminhos de proteção e crédito. Comece pelo que você precisa agora e siga até as propostas.",
  },
  comoFuncionaPage: {
    title: "Como funciona",
    intro:
      "Você escolhe o produto, responde com clareza e revisa um resumo. No demo não geramos proposta financeira. O fluxo é o mesmo da operação real, quando os parceiros entram com as melhores opções.",
  },
  understand: {
    label: "Transparência",
    title: "Entenda antes de contratar",
    items: [
      "CET e custos totais só aparecem quando um parceiro real retornar proposta.",
      "Seguros podem ter franquia, carência e exclusões. Leia as condições da oferta.",
      "Empréstimos com garantia envolvem avaliação do bem e risco sobre o patrimônio.",
      "Aprovações dependem de análise e política do parceiro. Não prometemos resultado.",
    ],
  },
  footer: {
    channelsTitle: "Canais de atendimento",
    channelsHours: ["Segunda a sexta: 8h às 18h", "Sábado: 8h às 12h"],
    channelsNote:
      "Horários referenciais. Atualize quando a operação assistida estiver ativa.",
    channels: [
      {
        label: "Central de atendimento",
        display: "Fale conosco",
        href: "/duvidas",
      },
      {
        label: "Dúvidas e suporte",
        display: "Perguntas frequentes",
        href: "/duvidas",
      },
    ],
    linksTitle: "Links úteis",
    usefulLinks: [
      { label: "Como funciona", href: "/como-funciona" },
      { label: "Perguntas frequentes", href: "/duvidas" },
      { label: "Política de privacidade", href: "/privacidade" },
      { label: "Termos de uso", href: "/termos" },
    ],
    productsTitle: "Produtos",
    tagline:
      "Simule proteção e crédito com clareza. As melhores propostas vêm dos parceiros, com revisão antes do envio.",
    partnersLead:
      "Na operação com parceiros, os seguros são ofertados por seguradoras autorizadas a operar pela SUSEP.",
    partnersNote:
      "Marcas de referência do mercado. Use somente logos com autorização formal de marca.",
    legal: {
      cnpj: process.env.NEXT_PUBLIC_NUVIORA_CNPJ ?? "CNPJ em cadastramento",
      susepProcess:
        process.env.NEXT_PUBLIC_SUSEP_PROCESS ??
        "Registro SUSEP (quando aplicável): a publicar",
      address:
        process.env.NEXT_PUBLIC_NUVIORA_ADDRESS ??
        "Endereço corporativo: a publicar",
    },
    susepLink: {
      label: "https://www.gov.br/susep/pt-br",
      href: "https://www.gov.br/susep/pt-br",
    },
    legalIntro:
      "A Nuviora não é seguradora, corretora de seguros nem instituição financeira. Atua como plataforma de comparação e encaminhamento. Nesta demonstração, não há venda, intermediação contratada ou persistência de dados em parceiros.",
    legalBody:
      "Quando a integração estiver ativa, produtos de seguro serão de responsabilidade das seguradoras escolhidas, autorizadas e supervisionadas pela Superintendência de Seguros Privados (SUSEP). Empréstimos dependem de instituições financeiras parceiras, análise de crédito e divulgação de CET quando houver proposta.",
  },
  prefooter: {
    eyebrow: "Próximo passo",
    title: "Comece agora e avance até as propostas.",
    body: "Escolha o produto, simule no seu ritmo e revise com tranquilidade. No demo você percorre a jornada completa, sem preço inventado e sem envio a parceiros.",
    ctaPrimary: "Simular agora",
    ctaSecondary: "Ainda tenho dúvidas",
  },
  faq: {
    label: "FAQ",
    pageTitle: "Dúvidas frequentes",
    sectionTitle: "Perguntas frequentes",
    items: [
      {
        q: "A Nuviora vende seguro ou empréstimo diretamente?",
        a: "Não. Somos uma plataforma de comparação e encaminhamento. As propostas vêm de parceiros: seguradoras ou instituições financeiras.",
      },
      {
        q: "O que significa ter as melhores propostas?",
        a: "Significa organizar sua simulação com clareza para receber opções dos parceiros integrados. No demo não exibimos preços. Na operação real, as propostas chegam com as condições de cada parceiro.",
      },
      {
        q: "Os valores da simulação são reais?",
        a: "No modo demonstração não exibimos preços, taxas ou CET. Valores reais só aparecem com retorno de parceiro na operação integrada.",
      },
      {
        q: "Meus dados são enviados agora?",
        a: "Neste demo, as informações ficam na sua sessão. Não são persistidas nem enviadas a terceiros.",
      },
      {
        q: "Empréstimos para PF e PJ são iguais?",
        a: "O fluxo é semelhante, mas campos e elegibilidade mudam conforme o tipo de pessoa e a garantia. Sempre falamos em Empréstimos, nunca Home Equity.",
      },
      {
        q: "Vale a pena começar pela simulação?",
        a: "Sim. Em poucos minutos você organiza o que precisa, revisa um resumo claro e fica pronto para as melhores propostas dos parceiros.",
      },
    ],
  },
  quoteFlow: {
    shellSubtitle: "Simulação guiada · sem compromisso",
    demoBadge: "Modo demonstração. Nenhum dado será enviado.",
    reviewTitle: "Revise sua simulação",
    reviewBody:
      "Confira as informações. Nesta etapa não há proposta vinculante. Com a integração ativa, os parceiros entram com as opções.",
    finishCta: "Concluir demonstração",
  },
  howItWorks: {
    label: "Como funciona",
    title: "Três passos simples até a sua simulação",
    steps: [
      {
        title: "Escolha o que precisa",
        body: "Seguro auto, incêndio, fiança ou empréstimos. Pessoa física ou jurídica, conforme o seu caso.",
      },
      {
        title: "Responda com tranquilidade",
        body: "Perguntas objetivas, no seu ritmo. Se quiser mudar algo, é só voltar. Nada se perde pelo caminho.",
      },
      {
        title: "Revise e siga em frente",
        body: "Confira o resumo antes de continuar. No demo você treina o fluxo. Depois, os parceiros trazem as propostas.",
      },
    ],
  },
} as const;

export const productPages = {
  auto: {
    title: "Seguro Auto",
    body: "Proteja o carro do jeito que você usa. Conte sobre o veículo e suas preferências de cobertura. Nesta demonstração não consultamos FIPE nem placa. Na operação real, as propostas vêm dos parceiros.",
    cta: "Simular seguro auto",
  },
  incendio: {
    title: "Seguro Incêndio",
    body: "Residencial ou comercial, com clareza do início às propostas. Valor de mercado e capital segurado são conceitos distintos. Explicamos na jornada.",
    cta: "Simular seguro incêndio",
  },
  fianca: {
    title: "Seguro Fiança",
    body: "Facilite a locação com análise conforme a política da seguradora. Não garantimos aprovação. Deixamos isso claro desde o primeiro passo da simulação.",
    cta: "Simular seguro fiança",
  },
  emprestimos: {
    title: "Empréstimos",
    lede: "Crédito para PF e PJ, com garantia quando fizer sentido e sempre com análise.",
    body: "Não usamos o termo Home Equity. Elegibilidade, taxas e CET dependem dos parceiros. No demo você percorre o fluxo completo, sem condições fictícias, pronto para as propostas reais.",
    cta: "Simular empréstimo",
  },
} as const;

export const productCopy = {
  auto: {
    short: "Proteja o carro e avance até as melhores propostas.",
    cotadorHint: "Vamos conhecer seu carro",
  },
  incendio: {
    short: "Imóvel residencial ou comercial, com clareza até a proposta.",
    cotadorHint: "Conte sobre o imóvel",
  },
  fianca: {
    short: "Locação mais simples, com análise e propostas dos parceiros.",
    cotadorHint: "Informe o aluguel e o perfil",
  },
  emprestimos: {
    short: "Crédito PF e PJ, com garantia quando fizer sentido.",
    cotadorHint: "Qual valor você procura?",
  },
} as const;
