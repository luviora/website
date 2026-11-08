# Plano de implementação — Nuviora

**Atualizado:** guidelines system v3 (skills / specs / rules).

## Estado
- MVP demo funcional: landing, 4 cotadores, API preparada, testes.
- Copy centralizado em `src/content/site-copy.ts`.
- **Guidelines:** `docs/specs/*` + `.cursor/rules/*` + `.cursor/skills/nuviora*`.

## Entregas concluídas
1. Fundação Next 16 + tokens + testes
2. Landing reformulada (hero + cotador + Pier/Loovi patterns)
3. Jornadas `/cotar/[product]`
4. Documentação de referência Pier/Loovi
5. **Sistema de guidelines v3** (plano + specs + rules + skills)

## Em andamento / próximo
- [ ] Endurecer checklists de PR nas skills (fase 2 do `guidelines-system-plan.md`)
- [ ] Spec de testes E2E ampliada (4 produtos)
- [ ] Alinhar páginas internas e steps do `QUOTE_CONFIG` ao `productCopy` onde faltar
- [ ] Brand kit oficial
- [ ] Qualidade Lighthouse/axe
- [ ] Deploy Vercel estável (PostCSS Tailwind v4 já preparado — validar no dashboard)
- [ ] Feature flag `NUVIORA_SUBMISSION_MODE` + integração .NET

## Critérios de aceite contínuos
- Copy centralizado; zero “Home Equity”
- Cotador fora do hero visual; `#cotador` funcional
- Agents leem `nuviora-core` + specs da área
- Build e E2E verdes
