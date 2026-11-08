# Spec — Copy comercial e microcopy

## Fonte única
Todo texto de marketing/cotador editável: **`src/content/site-copy.ts`**.

Não espalhar strings de produto em JSX salvo labels técnicos de form gerados por `QUOTE_CONFIG`.

## Tom
- Humano, direto, **vendedor sem pressão ilegal**
- PT-BR; você/tu consistente (preferir **você**)
- Uma promessa por bloco

## Fórmula de dobra
1. **H1**: benefício emocional ou prático (≤ ~20 palavras)
2. **Suporte**: prova de simplicidade (passos, clareza, revisão)
3. **CTA primário**: verbo + objeto (`Começar simulação`, `Simular agora`)
4. **CTA secundário** (opcional): alívio (`Ver como funciona`, `Ainda tenho dúvidas`)

## Léxico canônico

| Usar | Evitar |
|------|--------|
| Empréstimos | Home Equity |
| Simulação / simular | Cotação com preço inventado |
| Demonstração / demo | “Proposta aprovada” |
| Franquia, CET (conceitos) | Valores de CET/taxa sem parceiro |
| Parceiros / plataforma | “Somos a seguradora” |
| Revisar / Continuar / Avançar | “Garantir agora” |

Verbos de progresso no cotador: **Continuar** / **Avançar** / **Revisar** / **Concluir** (alinhar ao shell Loovi: **Avançar** no primário).

## Permitido
- Urgência suave (“comece agora”, “próximo passo”)
- Benefícios: poucos passos, linguagem clara, você revisa
- FAQ na voz do usuário
- Explicar franquia/CET/garantia **conceitualmente**

## Proibido (hard)
- Preço, CET numérico, taxa, tempo de aprovação **sem medição real**
- “Aprovação garantida”, “menor do Brasil”, “mais barato”
- Stats/depoimentos fictícios
- “Home Equity”
- Confundir Nuviora com seguradora
- Referências visíveis a Pier/Loovi no UI

## Demo
Sempre nomear perto de captura de dados:
- Ex.: `Demonstração. Sem envio a parceiros.`
- Evitar travessão (`—`): preferir ponto, vírgula ou dois-pontos para ritmo fluido.
- Campos de contato + consentimento: disclosure do `QUOTE_CONFIG` + nota demo

## Seções obrigatórias no `siteCopy`
Manter chaves estáveis (não renomear sem migrar componentes):
- `hero`, `quoteEntry`, `trust`, `products`, `comoFuncionaPage`, `understand`, `footer`, `faq`, `productPages`, `productCopy`, legal placeholders

## Checklist pós-edição
- [ ] Nenhuma string “Home Equity”
- [ ] CTA primário = verbo + objeto
- [ ] Demo note onde há form
- [ ] `npm run build`
- [ ] E2E se H1/CTA da home mudou (`tests/e2e/home-quote.spec.ts`)
