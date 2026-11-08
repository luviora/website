---
name: nuviora-ui
description: >-
  UI/UX marketing Nuviora: hero, cotador entry visual, quadrantes, footer,
  landings, motion Reveal, tokens. Use para layout, polish visual e anti-IA look.
---

# Nuviora — UI

## Quando aplicar
- Componentes em `src/components/marketing/**`, layout, motion
- Ajustes de hero, overlap do cotador, prefooter, footer
- Landings `ProductLanding`

## Ler primeiro
1. `docs/specs/ux-ui.md`
2. `docs/specs/brand.md`
3. `src/styles/tokens.css`

## Procedimento
1. Confirmar **job único** da seção
2. Respeitar anatomia da home (spec ux-ui) — não meter stats no hero
3. Usar tokens CSS; logo sem filtros
4. person-1 hero / person-2 prefooter base
5. Cotador entry: ~80% width, overlap ~30%, 4 tiles nome+número+BG
6. Quadrantes escuros; footer escuro sem carrossel de logos
7. Motion via `Reveal`; respeitar reduced-motion
8. Evitar mesh/orbs/glow/glass/badges no hero
9. `npm run build`; checar mobile + desktop mentalmente (ou browser)

## Anti-padrões
- Cards no hero; dashboard no first viewport
- Inverter logo; flat background sem atmosfera no hero
- Copiar rosa Pier / amarelo Loovi

## Aceite
- [ ] Specs brand + ux-ui
- [ ] Brand test: viewport 1 ainda “é Nuviora” sem nav
- [ ] Touch ≥ 44px / focus-visible
- [ ] Build verde
