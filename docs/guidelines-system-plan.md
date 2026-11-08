# Plano do sistema de guidelines — Nuviora

**Objetivo:** tornar skills, specs e rules a fonte de verdade operacional do projeto — detalhadas o suficiente para qualquer agente ou humano entregar UI, copy, cotador e deploy sem reinventar regras.

**Status:** implantação fase 1 em andamento (este documento + árvore abaixo).

---

## 1. Problema

Hoje o conhecimento está fragmentado:

| Artefato | Estado anterior | Risco |
|----------|-----------------|-------|
| `.cursor/skills/nuviora/SKILL.md` | Skill única, curta | Agente perde detalhes de copy/UI/cotador |
| `docs/NUVIORA-GUIDELINES.md` | Índice fino | Não especifica contratos de página/API |
| Sem `.cursor/rules/` | Só `AGENTS.md` (Next.js) | Regras de marca/compliance não entram no contexto automático |
| Docs soltos (`design-plan`, audits) | Históricos | Conflito com decisões atuais (ex.: sem carrossel) |

## 2. Arquitetura alvo (3 camadas)

```
┌─────────────────────────────────────────────────────────────┐
│  RULES (.cursor/rules/*.mdc)                                 │
│  Contexto automático · curto · enforce hard rules            │
├─────────────────────────────────────────────────────────────┤
│  SKILLS (.cursor/skills/*/SKILL.md)                          │
│  Workflows sob demanda · “como fazer” + checklists           │
├─────────────────────────────────────────────────────────────┤
│  SPECS (docs/specs/*.md)                                     │
│  Contratos detalhados · tokens · copy · UX · API · deploy    │
└─────────────────────────────────────────────────────────────┘
         ▲
         │ index
docs/NUVIORA-GUIDELINES.md  +  README  +  skill nuviora (hub)
```

### Princípios
1. **Rules** ≤ ~80 linhas: hard rules + ponteiros para specs.
2. **Skills** = procedimento: quando aplicar, o que ler, checklist de aceite.
3. **Specs** = verdade canônica: números, rotas, proibições, anatomia de seção.
4. Uma decisão = um lugar. Skills/rules **não duplicam** prosa longa — linkam a specs.
5. Código canônico de copy continua em `src/content/site-copy.ts`.

## 3. Inventário a implantar

### 3.1 Specs (`docs/specs/`)

| Arquivo | Conteúdo |
|---------|----------|
| `00-index.md` | Mapa, ordem de leitura, ownership |
| `brand.md` | Logo, cores, tipografia, tokens CSS, anti-filtros |
| `copy.md` | Tom, fórmulas CTA, léxico, proibições, FAQ |
| `ux-ui.md` | Home por dobra, landings, motion, anti-IA, a11y |
| `cotador.md` | Entry 4 cols, `/cotar/*` shell Loovi, steps, demo |
| `architecture.md` | Pastas, RSC vs client, forms, API BFF |
| `compliance-demo.md` | Modo demo, PII, SUSEP, claims |
| `deploy-vercel.md` | PostCSS/Tailwind v4, Node, vercel.json, envs |

### 3.2 Rules (`.cursor/rules/`)

| Arquivo | Escopo |
|---------|--------|
| `nuviora-core.mdc` | `alwaysApply: true` — marca, compliance, fontes de verdade |
| `copy.mdc` | globs `site-copy.ts`, marketing content |
| `marketing-ui.mdc` | globs `components/marketing/**`, layouts marketing |
| `quote-flow.mdc` | globs `features/quotes/**`, `(quote)/**` |
| `stack-next.mdc` | globs `*.tsx`, `*.ts`, configs Next/Tailwind |

### 3.3 Skills (`.cursor/skills/`)

| Skill | Trigger |
|-------|---------|
| `nuviora` | Hub geral — sempre ler primeiro em tarefas Nuviora |
| `nuviora-copy` | Microcopy, CTAs, FAQ, site-copy |
| `nuviora-ui` | Hero, seções, landings, motion, tokens |
| `nuviora-quote` | Cotador entry + fluxo `/cotar` |
| `nuviora-deploy` | Vercel, PostCSS, build CI |

## 4. Fases de implantação

### Fase 1 — Fundação (esta entrega)
- [x] Este plano
- [ ] Specs 00–deploy
- [ ] Rules core + 4 scoped
- [ ] Skills hub + 4 especializadas
- [ ] Atualizar `NUVIORA-GUIDELINES.md`, README, skill hub

### Fase 2 — Endurecimento
- [ ] Checklists de PR em cada skill (`Acceptance`)
- [ ] Espelhar decisões recentes (overlap cotador 80%/30%, quadrantes escuros, footer Loovi sem logos)
- [ ] Spec de testes (Vitest + Playwright rotas)

### Fase 3 — Operação
- [ ] Revisar specs quando brand kit oficial chegar
- [ ] Spec de integração `.NET` / `NUVIORA_SUBMISSION_MODE`
- [ ] Plugin Vercel autenticado no Cursor (MCP)

## 5. Critérios de aceite do sistema

1. Agente novo encontra hard rules sem perguntar (rule `alwaysApply`).
2. Mudança de copy aponta só para `site-copy.ts` + spec `copy.md`.
3. Mudança de hero/landing aponta `ux-ui.md` + skill `nuviora-ui`.
4. Mudança de cotador aponta `cotador.md` + skill `nuviora-quote`.
5. Deploy falho aponta `deploy-vercel.md` + skill `nuviora-deploy`.
6. Zero menção a “Home Equity”; demo sempre explícito nas specs de copy/compliance.
7. `npm run build` continua verde após docs (sem impacto de runtime).

## 6. O que NÃO entra nesta fase

- Reescrita visual do site (só documentação + enforcement agent).
- Brand kit oficial (ícones) — só placeholders na spec brand.
- Integração backend real.

## 7. Ordem de leitura (humanos e agentes)

1. `.cursor/rules/nuviora-core.mdc` (automático)
2. `docs/specs/00-index.md`
3. Spec da área tocada
4. Skill da área tocada
5. Código canônico (`site-copy.ts`, tokens, catalog)
