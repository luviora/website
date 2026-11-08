# Nuviora

Plataforma B2C de simulação para **Seguro Auto**, **Seguro Incêndio**, **Seguro Fiança** e **Empréstimos** (PF/PJ), em **modo demonstração** — sem envio de PII, sem preços ou CET fictícios.

## Stack

- Next.js 16 (App Router), React 19, TypeScript strict
- Tailwind CSS v4, shadcn/ui (Base UI), Lucide
- React Hook Form + Zod
- Vitest, Playwright

## Comandos

```bash
npm install
npm run dev          # http://localhost:3000
npm run build
npm run start
npm run lint
npm run typecheck
npm run test
npm run test:e2e
```

## Variáveis

| Variável | Descrição |
|----------|-----------|
| `NEXT_PUBLIC_SITE_URL` | URL canônica (SEO, sitemap, OG) |
| `NUVIORA_SUBMISSION_MODE` | `demo` (padrão), `assisted` ou `integrated` |

## Arquitetura (resumo)

- `src/app/(marketing)` — landing e páginas institucionais
- `src/app/(quote)` — jornadas `/cotar/[product]` e status `/solicitacao/[id]`
- `src/features/products` — catálogo
- `src/features/quotes` — configuração de etapas, schemas e fluxo
- `src/app/api/quote-requests` — contrato BFF (envio desativado em `demo`)

## Limitações (MVP demo)

- Assets de marca são **placeholders** até importar `nuviora-brand-kit.zip`.
- API retorna **503** em modo demo.
- Textos jurídicos (privacidade/termos) são placeholders para revisão legal.

## Próximos passos

1. Substituir SVGs/ícones pelo brand kit oficial.
2. Entregar `/design-system` e polish de componentes.
3. Integrar backend .NET / parceiros com `NUVIORA_SUBMISSION_MODE=integrated`.
4. Lighthouse, axe e ampliação de E2E para os quatro produtos.

## Documentação
- [`docs/NUVIORA-GUIDELINES.md`](docs/NUVIORA-GUIDELINES.md) — diretrizes v2
- [`docs/reference-analysis-pier-loovi.md`](docs/reference-analysis-pier-loovi.md) — benchmark
- [`docs/reformulation-plan-v2.md`](docs/reformulation-plan-v2.md) — roadmap
- Copy: `src/content/site-copy.ts`
- Skill Cursor: `.cursor/skills/nuviora/SKILL.md`
