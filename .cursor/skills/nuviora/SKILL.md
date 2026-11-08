---
name: nuviora
description: >-
  Hub Nuviora B2C (seguros + empréstimos PF/PJ). Use em qualquer tarefa do site:
  UI, copy, cotador, tokens, deploy, compliance. Encaminha para skills e specs
  especializadas. Pier/Loovi só como referência de clareza — sem copiar identidade.
---

# Nuviora — skill hub

## Quando aplicar
Qualquer mudança neste repositório `website` / Nuviora.

## Ler nesta ordem
1. `docs/specs/00-index.md`
2. Spec da área (brand / copy / ux-ui / cotador / compliance / architecture / deploy-vercel)
3. Skill especializada (abaixo)
4. Código canônico da área

## Skills especializadas
| Tarefa | Skill |
|--------|-------|
| Textos, CTAs, FAQ | `.cursor/skills/nuviora-copy/SKILL.md` |
| Hero, seções, landings, motion | `.cursor/skills/nuviora-ui/SKILL.md` |
| Entry + `/cotar` + QUOTE_CONFIG | `.cursor/skills/nuviora-quote/SKILL.md` |
| Vercel, PostCSS, build CI | `.cursor/skills/nuviora-deploy/SKILL.md` |

## Hard rules (resumo)
- **Empréstimos** ≠ Home Equity
- Sem preço/CET/aprovação/stats fictícios
- Logo cores originais (sem invert)
- Demo nomeado junto a dados
- Copy em `src/content/site-copy.ts`
- Tokens em `src/styles/tokens.css`
- Rules automáticas: `.cursor/rules/nuviora-core.mdc`

## Plano do sistema
`docs/guidelines-system-plan.md` — arquitetura rules/skills/specs.

## Aceite mínimo
- [ ] Spec da área consultada
- [ ] Hard rules respeitadas
- [ ] `npm run build` verde
- [ ] Testes/E2E se a área exigir
