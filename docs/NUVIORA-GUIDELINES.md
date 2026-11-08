# Nuviora — Diretrizes consolidadas (v3)

Documento **índice**. Contratos detalhados vivem em `docs/specs/`. Enforcement no Cursor: `.cursor/rules/` + `.cursor/skills/`.

## Sistema (ler primeiro)
1. [Plano do sistema](./guidelines-system-plan.md) — rules / skills / specs
2. [Specs índice](./specs/00-index.md)
3. Skill hub: `.cursor/skills/nuviora/SKILL.md`
4. Rule always-on: `.cursor/rules/nuviora-core.mdc`

## Specs por domínio
| Spec | Conteúdo |
|------|----------|
| [brand](./specs/brand.md) | Logo, cores, tipografia, imagens |
| [copy](./specs/copy.md) | Tom, CTAs, léxico, proibições |
| [ux-ui](./specs/ux-ui.md) | Home, landings, motion, a11y |
| [cotador](./specs/cotador.md) | Entry + `/cotar` + QUOTE_CONFIG |
| [compliance-demo](./specs/compliance-demo.md) | Demo, claims, SUSEP |
| [architecture](./specs/architecture.md) | Pastas, RSC, API, testes |
| [deploy-vercel](./specs/deploy-vercel.md) | PostCSS, Vercel, envs |

## Skills Cursor
| Skill | Uso |
|-------|-----|
| `nuviora` | Hub |
| `nuviora-copy` | Textos |
| `nuviora-ui` | Visual marketing |
| `nuviora-quote` | Cotador |
| `nuviora-deploy` | Vercel/build |

## Código canônico
- Copy: `src/content/site-copy.ts`
- Tokens: `src/styles/tokens.css`
- Catálogo: `src/features/products/catalog.ts`
- Steps: `src/features/quotes/config/products.ts`

## Hard rules (resumo)
- **Empréstimos** — nunca Home Equity
- Sem preço/CET/aprovação/stats fictícios
- Logo cores originais
- Demo nomeado junto a dados
- Pier/Loovi = estrutura, não identidade

## Benchmark
- [reference-analysis-pier-loovi.md](./reference-analysis-pier-loovi.md)

## Roadmap
- [reformulation-plan-v2.md](./reformulation-plan-v2.md)
- [implementation-plan.md](./implementation-plan.md)
