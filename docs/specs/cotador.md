# Spec — Cotador (entry + jornada)

## Dois momentos

| Momento | Rota | UI |
|---------|------|-----|
| Entry (intenção) | Home `#cotador` | 4 tiles → link `/cotar/[product]` |
| Jornada | `/cotar/[product]` | Shell estilo Loovi, sem nav marketing |

`product` ∈ `auto` | `incendio` | `fianca` | `emprestimos` (`catalog.ts`).

## Entry — regras
- Título: `siteCopy.quoteEntry.title` (“O que você quer resolver hoje?”)
- Demo note visível
- Tiles: imagem BG + número + **nome** (tipografia grande); sem parágrafos no tile
- Desktop 4 cols; mobile stack / 2 cols conforme componente atual
- Overlap hero: ver `ux-ui.md`

## Shell `/cotar` (Loovi-like)
Arquivos: `src/app/(quote)/layout.tsx`, `quote-flow.tsx`, `quote-step-form.tsx`, `quote-step-nav.tsx`, `form-controls.tsx`

### Anatomia
1. Logo Nuviora (cores originais)
2. Título do produto + disclosures
3. Progresso / nav de etapas
4. Campos com **floating labels** (`FloatingField`)
5. CTA primário mint **Avançar** / concluir
6. Sem SiteHeader / SiteFooter

### Configuração de steps
- Fonte: `src/features/quotes/config/products.ts` → `QUOTE_CONFIG`
- Schema por step: `build-step-schema.ts` + Zod
- Form: React Hook Form + `QuoteStepForm`
- Inputs nativos / controles do design system — não inventar libs de form

### Etapas típicas (padrão)
1. Dados do bem / contexto
2. Uso / localização / perfil
3. Preferências
4. Contato + consentimento

Ajustes por produto são esperados; manter disclosures honestos.

## Pós-envio
- Demo: não enviar PII a parceiros; API pode responder 503 / modo demo
- Status: `/solicitacao/[id]`
- Variável: `NUVIORA_SUBMISSION_MODE` = `demo` | `assisted` | `integrated`

## Copy do cotador
- Hints de cabeçalho/etapa 1: `siteCopy.productCopy`
- Labels de campo: `QUOTE_CONFIG` (exceção à regra “só site-copy” — OK para forms)

## Testes
- Unit: `tests/unit/catalog.test.ts`
- E2E: `tests/e2e/home-quote.spec.ts` — Continuar/Avançar, entry → fluxo
- Ao mudar labels de CTA primário do quote, atualizar E2E

## Anti-padrões
- Input de placa/preço no hero
- Mostrar prêmio/CET inventado no resumo
- Manter nav marketing dentro de `/cotar`
- Duplicar jornadas fora de `QUOTE_CONFIG`
