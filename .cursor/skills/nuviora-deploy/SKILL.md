---
name: nuviora-deploy
description: >-
  Deploy e build Nuviora na Vercel: Tailwind v4 PostCSS, vercel.json, envs,
  scopes de team, troubleshooting de CSS/build. Use quando deploy falhar ou
  ao configurar CI/Vercel.
---

# Nuviora — deploy

## Quando aplicar
- Falha de build na Vercel
- Mudança em `postcss.config.mjs`, `vercel.json`, deps Tailwind
- Link/CLI `vercel`, env vars, Node version

## Ler primeiro
1. `docs/specs/deploy-vercel.md`
2. `docs/specs/architecture.md` (stack CSS)
3. `package.json`, `vercel.json`, `postcss.config.mjs`

## Procedimento
1. Reproduzir: `npm ci && npm run build` local
2. Confirmar deps: `tailwindcss`, `@tailwindcss/postcss`, `postcss` em **dependencies**
3. Confirmar `postcss.config.mjs` com `@tailwindcss/postcss`
4. **Não** restaurar `@tailwindcss/turbopack` loader custom sem validar na Vercel
5. CLI: conta multi-team → `--scope cubofordevs-votting` (projeto `website`)
6. Envs: `NEXT_PUBLIC_SITE_URL`; submission mode default demo
7. Se plugin Cursor Vercel sem tools: autenticar MCP / novo chat

## Aceite
- [ ] Build local idêntico ao comando Vercel
- [ ] Spec deploy seguida
- [ ] Sem omit=dev no install da Vercel
