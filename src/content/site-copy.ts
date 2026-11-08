/**
 * Microcopy canônico Nuviora — única fonte para marketing e cotador (PT-BR).
 *
 * Copy comercial (vendedora) + compliance:
 * - Benefício primeiro, prova depois; verbos de ação nos CTAs.
 * - Sem preço, CET, taxa, aprovação ou tempo inventados.
 * - Sem “mais barato”, “garantido”, “aprovação imediata”.
 * - Demo sempre nomeado quando houver captura de dados.
 * - Empréstimos ≠ Home Equity.
 */

export const siteCopy = {
  hero: {
    title: "Proteção e crédito que cabem na sua vida.",
    titleAccent: "Simule em minutos. Entenda cada passo.",
    body: "Escolha o produto, responda perguntas claras e revise tudo antes de seguir — sem pressão e sem preço inventado.",
    ctaPrimary: "Começar simulação",
    ctaSecondary: "Ver como funciona",
  },
  quoteEntry: {
    title: "O que você quer resolver hoje?",
    subtitle: "Escolha um caminho e comece a simulação.",
    demoNote: "Demonstração — sem envio a parceiros.",
  },
  trust: {
    pipelineHint: "Explore a jornada: toque em cada etapa",
    items: [
      {
        title: "Poucos passos",
        body: "Só o essencial. Cada pergunta tem um motivo.",
        pipelineDetail:
          "Blocos curtos por produto — veículo, imóvel, locação ou crédito — para você avançar sem formulário infinito.",
      },
      {
        title: "Linguagem clara",
        body: "Franquia, garantia e riscos em português direto.",
        pipelineDetail:
          "Traduzimos o juridiquês: o que significa, por que pedimos e o que muda na sua simulação.",
      },
      {
        title: "Você no controle",
        body: "Revise o resumo e só então decida seguir.",
        pipelineDetail:
          "Antes de qualquer envio, o resumo é seu. No demo, os dados ficam só na sessão.",
      },
    ],
    photoCaption: "Decisões do dia a dia, no seu tempo.",
  },
  products: {
    sectionTitle: "Escolha por intenção",
    sectionBody:
      "Quatro caminhos. Uma experiência fluida. Comece pelo que você precisa agora.",
  },
  comoFuncionaPage: {
    title: "Como funciona",
    intro:
      "Você escolhe o produto, responde com clareza e revisa um resumo. No demo, nenhuma proposta financeira é gerada — o fluxo é o mesmo da operação real.",
  },
  understand: {
    title: "Entenda antes de contratar",
    items: [
      "CET e custos totais só aparecem quando um parceiro real retornar proposta.",
      "Seguros podem ter franquia, carência e exclusões — leia as condições da oferta.",
      "Empréstimos com garantia envolvem avaliação do bem e risco sobre o patrimônio.",
      "Aprovações dependem de análise e política do parceiro — não prometemos resultado.",
    ],
  },
  footer: {
    channelsTitle: "Canais de atendimento",
    channelsHours: ["Segunda a sexta: 8h às 18h", "Sábado: 8h às 12h"],
    channelsNote:
      "Horários referenciais — atualize quando a operação assistida estiver ativa.",
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
      "Comparação e encaminhamento de seguros e crédito — com linguagem clara e revisão antes do envio.",
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
    title: "Sua simulação começa agora.",
    body: "Escolha o produto, avance no seu ritmo e revise com tranquilidade. No demo você percorre a jornada completa — sem preço inventado e sem envio a parceiros.",
    ctaPrimary: "Simular agora",
    ctaSecondary: "Ainda tenho dúvidas",
  },
  faq: {
    pageTitle: "Dúvidas frequentes",
    sectionTitle: "Perguntas frequentes",
    items: [
      {
        q: "A Nuviora vende seguro ou empréstimo diretamente?",
        a: "Não. Somos uma plataforma de comparação e encaminhamento. O produto final depende de parceiros integrados — seguradoras ou instituições financeiras.",
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
        a: "O fluxo é semelhante, mas campos e elegibilidade mudam conforme o tipo de pessoa e a garantia. Sempre falamos em Empréstimos — nunca Home Equity.",
      },
      {
        q: "Vale a pena começar pela simulação?",
        a: "Sim. Em poucos passos você organiza o que precisa e chega a um resumo claro — a melhor forma de decidir o próximo passo com segurança.",
      },
    ],
  },
  quoteFlow: {
    shellSubtitle: "Simulação guiada · sem compromisso",
    demoBadge: "Modo demonstração — nenhum dado será enviado",
    reviewTitle: "Revise sua simulação",
    reviewBody: "Confira as informações. Não há proposta vinculante nesta etapa.",
    finishCta: "Concluir demonstração",
  },
  howItWorks: {
    title: "Do clique à revisão — sem mistério",
    steps: [
      {
        title: "Escolha o produto",
        body: "Auto, incêndio, fiança ou empréstimo — PF ou PJ quando fizer sentido.",
      },
      {
        title: "Responda com contexto",
        body: "Cada campo tem um motivo. Você pode voltar sem perder o que já preencheu.",
      },
      {
        title: "Revise e conclua",
        body: "No demo, você vê o fluxo completo. Com parceiros, propostas reais entram no jogo.",
      },
    ],
  },
} as const;

export const productPages = {
  auto: {
    title: "Seguro Auto",
    body: "Proteja o carro do jeito que você usa. Conte sobre o veículo e preferências de cobertura — sem consulta automática a FIPE ou placa nesta demonstração.",
    cta: "Simular seguro auto",
  },
  incendio: {
    title: "Seguro Incêndio",
    body: "Residencial ou comercial, com clareza do início ao fim. Valor de mercado e capital segurado são conceitos distintos — explicamos na jornada.",
    cta: "Simular seguro incêndio",
  },
  fianca: {
    title: "Seguro Fiança",
    body: "Facilite a locação com análise conforme a política da seguradora. Não garantimos aprovação — e deixamos isso claro desde o primeiro passo.",
    cta: "Simular seguro fiança",
  },
  emprestimos: {
    title: "Empréstimos",
    lede: "Crédito para PF e PJ, com garantia quando fizer sentido — sempre com análise.",
    body: "Não usamos o termo Home Equity. Elegibilidade, taxas e CET dependem de parceiros. No demo, você percorre o fluxo completo sem condições fictícias.",
    cta: "Simular empréstimo",
  },
} as const;

export const productCopy = {
  auto: {
    short: "Proteja o carro do jeito que você usa.",
    cotadorHint: "Vamos conhecer seu carro",
  },
  incendio: {
    short: "Imóvel residencial ou comercial, com clareza.",
    cotadorHint: "Conte sobre o imóvel",
  },
  fianca: {
    short: "Locação mais simples, sujeita à análise.",
    cotadorHint: "Informe o aluguel e o perfil",
  },
  emprestimos: {
    short: "PF e PJ, com garantia quando fizer sentido.",
    cotadorHint: "Qual valor você procura?",
  },
} as const;
