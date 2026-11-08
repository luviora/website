---
name: nuviora-quote
description: >-
  Cotador Nuviora: tiles de intenção na home, jornada /cotar/[product],
  QUOTE_CONFIG, Zod/RHF, shell Loovi-like, modo demo. Use para forms e fluxo.
---

# Nuviora — cotador

## Quando aplicar
- `entry-quote-selector`, `quote-entry-section`
- `features/quotes/**`, `app/(quote)/**`
- Novos campos/etapas, CTA Avançar, API quote-requests

## Ler primeiro
1. `docs/specs/cotador.md`
2. `docs/specs/compliance-demo.md`
3. `src/features/quotes/config/products.ts`

## Procedimento
1. Entry: só intenção → link produto; copy em `siteCopy.quoteEntry`
2. Nova etapa/campo: editar `QUOTE_CONFIG` + garantir schema Zod
3. UI step: `QuoteStepForm` + floating labels; não criar form paralelo
4. Shell quote: sem SiteHeader/Footer; logo + progresso + Avançar mint
5. Disclosures honestos; sem prêmio/CET no resumo demo
6. Respeitar `NUVIORA_SUBMISSION_MODE`
7. Atualizar E2E se seletores/CTAs mudarem
8. `npm run build` + `npm run test` (+ e2e se crítico)

## Produtos
`auto` | `incendio` | `fianca` | `emprestimos` — IDs do `catalog.ts`.

## Aceite
- [ ] Spec cotador + compliance
- [ ] Demo nomeado
- [ ] Schemas alinhados aos fields
- [ ] Build + testes
