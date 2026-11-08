# Spec — Deploy Vercel

## Projeto conhecido
- Repo: `github.com/luviora/website`
- Projeto Vercel (team `cubofordevs-votting`): **website**
- URL prod recente: `https://nuviora-sec.vercel.app`
- Conta CLI observada: `mrdouglasmorais`
- Scope obrigatório em CLI não-interativa: `--scope cubofordevs-votting`

## Pipeline CSS (crítico)
Tailwind v4 **não** usa `tailwind.config` clássico neste repo.

Obrigatório:
- Dependências: `tailwindcss`, `@tailwindcss/postcss`, `postcss` (em **dependencies**)
- Arquivo: `postcss.config.mjs` com plugin `@tailwindcss/postcss`
- `globals.css`: `@import "tailwindcss";`
- **Não** depender de `@tailwindcss/turbopack` loaders custom no `next.config` (foi removido por instabilidade no build Vercel)

## Config
- `vercel.json`: framework `nextjs`, `npm ci`, `npm run build`
- `package.json` → `engines.node`: `24.15.0` (pin)
- `.npmrc`: `engine-strict=true`
- `.nvmrc` / `.node-version`: `24.15.0`
- No dashboard Vercel, alinhar Node a **24.x** (evitar 26.x se houver regressão)

## Env vars
| Var | Obrigatória prod? | Notas |
|-----|-------------------|-------|
| `NEXT_PUBLIC_SITE_URL` | Sim (SEO) | URL canônica |
| `NUVIORA_SUBMISSION_MODE` | Não | default `demo` |

## Checklist deploy
1. `npm ci && npm run build` local verde
2. Commit + push `main` (ou preview branch)
3. Se CLI: `vercel link --scope cubofordevs-votting` depois `vercel --prod --scope cubofordevs-votting`
4. Conferir logs se CSS/PostCSS falhar — quase sempre dependência ou config PostCSS
5. Plugin Cursor Vercel: autenticar MCP no Cursor Settings se for usar ferramentas do plugin

## Falhas comuns
| Sintoma | Causa provável | Fix |
|---------|----------------|-----|
| Build não acha `@tailwindcss/postcss` | Dep só em dev omitida / ausente | Garantir em `dependencies` + `postcss.config.mjs` |
| CSS vazio / classes sumindo | Import Tailwind errado | `@import "tailwindcss"` no globals |
| CLI pede scope | Multi-team account | Passar `--scope cubofordevs-votting` |
| Plugin `/add-plugin vercel` sem tools | MCP não autenticado na sessão | Auth no Cursor + novo chat |

## O que não fazer
- `npm install --omit=dev` no Install Command da Vercel
- Reintroduzir turbopack CSS loader custom sem validar build na Vercel
- Commitar `.vercel` com tokens se a política do time proibir
