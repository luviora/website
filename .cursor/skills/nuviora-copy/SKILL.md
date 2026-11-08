---
name: nuviora-copy
description: >-
  Escrever ou revisar microcopy Nuviora (hero, CTAs, FAQ, landings, demo notes).
  Use quando o usuário pedir textos, tom comercial, ou mudanças em site-copy.ts.
---

# Nuviora — copy

## Quando aplicar
- Editar `src/content/site-copy.ts`
- Novos CTAs, FAQ, títulos de seção, productPages
- Revisar tom “vendedor sem pressão ilegal”

## Ler primeiro
1. `docs/specs/copy.md`
2. `docs/specs/compliance-demo.md`
3. Arquivo atual `src/content/site-copy.ts`

## Procedimento
1. Identificar seção (`hero`, `quoteEntry`, `faq`, etc.)
2. Aplicar fórmula: benefício → prova → CTA verbo+objeto
3. Rodar checklist proibido (Home Equity, preço, CET, garantia de aprovação)
4. Garantir demo note se houver captura de dados na UI ligada ao texto
5. Manter chaves TypeScript estáveis; se renomear, atualizar imports nos componentes
6. `npm run build`; E2E se H1/CTA home mudou

## Output
- Diff só em `site-copy.ts` (+ componentes se chave nova)
- Não “melhorar” copy de outras seções sem pedido

## Aceite
- [ ] Spec copy + compliance
- [ ] ≤ ~20 palavras em títulos de dobra
- [ ] Um CTA primário claro por bloco
- [ ] Zero claims fictícios / Home Equity
