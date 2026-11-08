# Specs Nuviora — índice

Contratos canônicos do produto. Skills e rules **apontam para cá**; não inventar tokens, copy ou fluxos fora destes arquivos + código.

## Ordem de leitura

| Prioridade | Spec | Quando |
|------------|------|--------|
| 1 | [brand.md](./brand.md) | Visual, logo, tokens |
| 2 | [copy.md](./copy.md) | Qualquer texto de UI |
| 3 | [ux-ui.md](./ux-ui.md) | Home, landings, motion |
| 4 | [cotador.md](./cotador.md) | Entry + `/cotar/*` |
| 5 | [compliance-demo.md](./compliance-demo.md) | Claims, PII, SUSEP |
| 6 | [architecture.md](./architecture.md) | Pastas, RSC, API |
| 7 | [deploy-vercel.md](./deploy-vercel.md) | Build/CI/Vercel |

## Código canônico (não duplicar conteúdo)

| Domínio | Path |
|---------|------|
| Copy PT-BR | `src/content/site-copy.ts` |
| Visuais de produto | `src/content/product-visuals.ts` |
| Tokens CSS | `src/styles/tokens.css` |
| Catálogo | `src/features/products/catalog.ts` |
| Steps cotador | `src/features/quotes/config/products.ts` |
| Partners | `src/content/partners.ts` |

## Ownership

| Mudança | Editar | Atualizar também |
|---------|--------|------------------|
| CTA / H1 | `site-copy.ts` | `copy.md` se regra mudar |
| Cor / radius | `tokens.css` | `brand.md` |
| Nova etapa cotador | `QUOTE_CONFIG` | `cotador.md` |
| Nova seção home | componente + copy | `ux-ui.md` anatomia |

## Documentos históricos (não canônicos)

Usar só como contexto; se conflitar, **vence a spec**:

- `docs/design-plan.md`, `docs/design-audit.md`, `docs/home-sections-audit.md`
- `docs/reformulation-plan-v2.md` (roadmap, não contrato)
- `docs/reference-analysis-pier-loovi.md` (benchmark — princípios OK)
