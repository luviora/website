---
name: nuviora
description: >-
  Build and refine the Nuviora B2C website (seguros + empréstimos PF/PJ).
  Use for UI, copy, cotador flows, brand tokens, Pier/Loovi-inspired simplicity
  without copying identity. Enforces demo mode and regulatory-safe sales copy.
---

# Nuviora project skill

## When to apply
- Any change to marketing, cotador, copy, tokens, or product journeys.
- Reviews comparing UX to Pier/Loovi.
- Copywriting / CTAs / microcopy comercial.

## Read first
1. `docs/NUVIORA-GUIDELINES.md`
2. `docs/reference-analysis-pier-loovi.md`
3. `src/content/site-copy.ts` — **edit copy here**, not scattered in components.

## Hard rules
- Product name: **Empréstimos** (never Home Equity).
- No fake prices, CET, approval rates, testimonials, or “mais barato”.
- Logo `/image/logo.png` — **cores originais** (nunca `invert` / `brightness-0`).
- Simulation vs proposta: label demo explicitly.
- Pier/Loovi: borrow **structure and clarity**, not visuals or claims.

## Copy comercial (obrigatório)
Tom: humano, direto, **vendedores sem pressão ilegal**.

### Fórmula
1. Benefício emocional ou prático no H1.
2. Prova de simplicidade no subtítulo (passos, clareza, revisão).
3. CTA primário = verbo de ação + objeto (`Começar simulação`, `Simular agora`).
4. CTA secundário = alívio de objeção (`Ver como funciona`, `Ainda tenho dúvidas`).

### Permitido
- Urgência suave (“comece agora”, “próximo passo”).
- Benefícios: poucos passos, linguagem clara, você revisa.
- Perguntas na voz do usuário (FAQ, cotador).

### Proibido
- Preço/CET/taxa/tempo sem medição.
- “Aprovação garantida”, “menor do Brasil”, stats fictícios.
- Home Equity; confusão seguradora × plataforma.

### Qualidade 100%
- Frases ≤ ~20 palavras em títulos e subtítulos de dobra.
- Um CTA primário por seção; secundário opcional.
- Demo nomeado perto de qualquer captura de dado.
- Após editar copy: `npm run build` + E2E se o H1 mudou.

## UI / UX (especialista)
- Uma composição por dobra; sem dashboard no hero.
- Hero: brand + 1 H1 + 1 suporte + CTAs + person-1 (centro vertical).
- Cotador: card branco, id `cotador`, fora do hero visual.
- Prefooter: person-2 alinhada à **base**.
- Footer estilo Loovi: fundo escuro, canais, links, legal denso — **sem** carrossel de logos.
- Estética Pier: muito branco, tipografia forte, cards editoriais (foto limpa + texto), pouco “chrome”.
- Anti-IA: sem mesh overlays, orbs excessivos, glassmorphism em massa, badges/sparkles.
- Motion: `Reveal` (fade+blur+rise / left / scale), hover lift sutil, pipeline pulse, FAQ chevron.
- Contraste: mint em navy; navy em cream.
- Touch targets ≥ 44px; focus-visible em todos os CTAs.

## Implementation
- Server Components default; client only for cotador, header mobile, forms, pipeline.
- Forms: `QuoteStepForm` + Zod; native inputs for RHF.
- After edits: `npm run build`, `npm run test`, E2E quando H1/CTA mudarem.

## Files map
- Marketing: `src/components/marketing/*`
- Copy: `src/content/site-copy.ts`
- Products: `src/features/products/catalog.ts` + `product-visuals.ts`
- Quotes: `src/features/quotes/**`
- Partners: `src/content/partners.ts` + `/public/partners/`
