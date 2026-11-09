# Spec — UX / UI (marketing)

## Princípios
1. **Uma composição por dobra** — não dashboard
2. **Brand first** — marca/logo como sinal hero-level; H1 não ofusca a marca
3. **Uma job por seção** — 1 headline + 1 suporte curto
4. **Cards:** default = sem card; cards só para interação (cotador, tiles clicáveis)
5. Pier-like: muito branco/cream, tipografia forte, foto limpa; pouco chrome

## Home — anatomia (ordem)

| # | Seção | Componente típico | Job |
|---|-------|-------------------|-----|
| 1 | Hero | `hero-section` | Brand + H1 + suporte + CTAs + person-1 (full-bleed visual) |
| 2 | Cotador entry | `quote-entry-section` + `entry-quote-selector` | Intenção → `/cotar/[product]` |
| 3 | Trust / pipeline | `trust-benefits` + `clarity-pipeline` | 3 pilares interativos |
| 4 | Produtos (quadrantes) | `products-section` + `product-quadrant-card` | Intenção editorial escura |
| 5 | Como funciona | `how-it-works` | Sequência |
| 6 | Entenda | `understand-section` | Educação compliance |
| 7 | FAQ | `faq-section` | Objeções |
| 8 | Prefooter | `pre-footer-section` / `human-moment` | person-2 + CTA |
| 9 | Footer | `site-footer` | Loovi-like escuro + SUSEP + legal |

### Hero (viewport 1)
- Contém **apenas:** brand, 1 H1, 1 suporte, grupo de CTAs, imagem dominante
- **Sem:** stats, agenda, endereço, promos, chips flutuantes sobre a foto
- Fundo: gradiente navy / atmosfera — não flat único
- person-1 centrada; PNG transparente

### Cotador entry (sobreposição)
- Card/área branca id `#cotador`
- Largura alvo ~**80%** do container
- Sobreposição no hero: translate negativo ~**30%** da altura do card (ajuste fino permitido; documentar no PR)
- **4 colunas** desktop: tiles com imagem de produto, número 01–04, **nome do produto grande** (sem body longo no tile)
- Aspect ratio tiles ~5/4 desktop, ~4/3 mobile
- Título canônico: **“O que você quer resolver hoje?”**

### Quadrantes de produto
- Estética **escura** editorial (foto + texto claro)
- Sem overlay genérico pesado tipo “AI gradient”
- CTA para landing ou cotador conforme copy

### Footer
- Fundo escuro (navy)
- Canais, links, bloco legal denso, menção SUSEP quando aplicável
- **Sem** carrossel de logos de seguradoras

## Landings de produto (`ProductLanding`)
- Rotas: `/seguros/auto`, `/seguros/incendio`, `/seguros/fianca`, `/emprestimos`
- Mesma linguagem visual Nuviora; CTA para `/cotar/[product]`
- Copy em `siteCopy.productPages`

## Motion
- Preferir `Reveal`: fade + blur + rise / left / scale
- Hover lift sutil em tiles
- Pipeline: pulse na etapa ativa
- FAQ: chevron
- Cotador: transição de etapa
- Respeitar `prefers-reduced-motion`
- **Não** motion decorativo sem hierarquia

## A11y
- Contraste: mint em navy; navy em cream
- Touch targets ≥ 44px
- `focus-visible` em CTAs e tiles
- FAQ: preferir accordion acessível / details nativo

## Mobile iOS / Android
- `viewport-fit=cover` + `env(safe-area-inset-*)` no header/footer/body
- `overflow-x: clip` + `overscroll-behavior-x: none` (sem pan horizontal)
- Inputs/select/textarea ≥ 16px (evita zoom iOS no foco)
- `touch-action: manipulation` em controles
- Preferir `dvh` no hero em vez de `vh` puro
- Não desativar zoom do usuário (`user-scalable`)

## Layout shell
- `(marketing)`: `SiteHeader` + `SiteFooter`
- `(quote)`: **sem** header/footer de marketing — shell próprio do cotador
- Header marketing: **fundo sólido** (`bg-background`); taxonomia em dropdowns (`src/content/nav.ts`)
  - Seguros → Auto / Incêndio / Fiança
  - Empréstimos (link)
  - Serviços → Sinistro / Minhas cotações / Corretores
  - Ajuda → Como funciona / Dúvidas
