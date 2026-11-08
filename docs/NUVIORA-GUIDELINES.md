# Nuviora — Diretrizes consolidadas (v2)

Documento mestre do projeto. Complementa `NUVIORA-CURSOR-GUIDELINES.md` (v1 anexo) com decisões de reformulação 2026.

## Stack e entregas
- Next.js 16 App Router, TypeScript strict, Tailwind v4, shadcn/ui, RHF + Zod.
- Modo **demo** até integração; `POST /api/quote-requests` preparado.

## Marca
- Logo: `/public/image/logo.png` — **cores originais**, sem filtro no hero.
- Cores: navy `#102D30`, green `#21866C`, mint `#B8F5D5`, cream `#F8F8F4`.
- Tipografia: Manrope (H1/H2), DM Sans (corpo).

## UX (benchmark Pier/Loovi, identidade própria)
1. Hero: mensagem emocional + foto humana à direita; gradiente navy.
2. Cotador: bloco separado, título **“O que você quer resolver hoje?”**
3. Benefícios: 3 pilares curtos + ícone.
4. Produtos: quadrantes editoriais (foto limpa + texto branco) — sem overlay escuro genérico.
5. Como funciona: linha do tempo (sequência real).
6. FAQ: `<details>`, perguntas em voz do usuário.

## Copy
- Fonte única: `src/content/site-copy.ts`.
- Comercial: benefício → prova de simplicidade → CTA verbo + objeto.
- Proibido: preço/CET/aprovação inventados; “Home Equity”; confusão com seguradora.
- Regras: `docs/reference-analysis-pier-loovi.md` + skill `.cursor/skills/nuviora`.

## Motion
- Apenas: troca de etapa no cotador, FAQ, hover em tiles, barra de progresso.
- `prefers-reduced-motion` obrigatório.

## Imagens
- **person-1.png** no hero; **person-2.png** em benefícios e landings de produto — PNG transparente, `object-contain` + `object-bottom` no hero.
- Sem depoimentos nomeados ou notas falsas.

## Testes
- `npm run build`, `lint`, `typecheck`, `test`, `test:e2e`.

## Referências
- Análise: `docs/reference-analysis-pier-loovi.md`
- Plano: `docs/reformulation-plan-v2.md`
- Skill Cursor: `.cursor/skills/nuviora/SKILL.md`
