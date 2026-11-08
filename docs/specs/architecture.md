# Spec — Arquitetura

## Stack
- Next.js **16** App Router (ler `node_modules/next/dist/docs/` antes de APIs novas)
- React 19, TypeScript strict
- Tailwind CSS **v4** via `@tailwindcss/postcss` + `postcss.config.mjs`
- shadcn/Base UI, Lucide
- RHF + Zod
- Vitest + Playwright

## Árvore relevante

```
src/
  app/
    (marketing)/     # landing + institucionais + SiteHeader/Footer
    (quote)/         # /cotar/[product], /solicitacao/[id] — shell limpo
    api/quote-requests/
  components/
    marketing/       # seções da home e landings
    quotes/          # nav/steps UI compartilhados
    layout/ brand/ motion/ ui/
  content/           # site-copy, product-visuals, partners
  features/
    products/        # catalog
    quotes/          # config, schemas, QuoteFlow
  styles/tokens.css
  lib/               # utils, api types, analytics
```

## RSC vs Client
- Default: **Server Components**
- Client apenas quando necessário: cotador, header mobile, forms, pipeline interativo, motion observer
- Não marcar `"use client"` em páginas inteiras sem motivo

## Dados e formulários
- Catálogo: `features/products/catalog.ts`
- Steps: `QUOTE_CONFIG` → schema Zod por step → `QuoteStepForm`
- Tipos API: `lib/api/quote-types.ts`
- Copy: `content/site-copy.ts`

## Rotas públicas

| Rota | Tipo |
|------|------|
| `/` | Marketing |
| `/seguros/auto\|incendio\|fianca` | Landing |
| `/emprestimos` | Landing |
| `/como-funciona`, `/duvidas` | Institucional |
| `/cotar/[product]` | Quote flow |
| `/solicitacao/[id]` | Status |
| `/privacidade`, `/termos` | Legal |
| `POST /api/quote-requests` | BFF |

## Qualidade
Comandos obrigatórios após mudanças relevantes:
```bash
npm run build
npm run lint
npm run typecheck
npm run test
npm run test:e2e   # se H1/CTA/cotador mudarem
```

## Convenções de código
- Imports via alias `@/`
- Componentes pequenos, uma seção = um arquivo em `marketing/`
- Não criar docs markdown extras sem pedido (exceto specs/rules/skills deste sistema)
- Não commitar secrets; `.env*` local

## Next.js agent note
`AGENTS.md` na raiz é gerenciado em parte pelo `next dev`. Regras Nuviora vivem em `.cursor/rules/` + specs — não depender só de `AGENTS.md`.
