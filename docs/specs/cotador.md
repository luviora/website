# Spec — Cotador (entry + jornada)

## Dois momentos

| Momento | Rota | UI |
|---------|------|-----|
| Entry (intenção) | Home `#cotador` | 4 tiles → link `/cotar/[product]` |
| Jornada | `/cotar/[product]?step=[id]` | Shell estilo Loovi, sem nav marketing |

`product` ∈ `auto` | `incendio` | `fianca` | `emprestimos` (`catalog.ts`).

Query `step`: id da etapa (`vehicle`, `usage`, `coverage`, `contact`, …) ou `review` na revisão. Avançar/voltar e history do browser sincronizam a URL.

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

## CEP (ViaCEP)
- Proxy `/api/cep/[cep]` → ViaCEP
- Preenche rua, bairro, cidade e UF
- Rua **somente editável** se o ViaCEP não retornar `logradouro`
- Bairro/cidade/UF ficam somente leitura após o retorno

## Coberturas Auto
- Cards ilustrados (`coverageCards`) com opção **Todas as coberturas**
- Preferência do usuário; não é proposta nem preço

## Fonte de dados de veículo (FIPE)
- API pública Parallelum, proxied em `/api/fipe/*` (`src/lib/fipe/`)
- Seguro Auto: marca → modelo → ano/combustível com autocomplete
- Empréstimos: etapa FIPE só quando garantia = veículo (`vehicleFipe`)
- Persistir `brandCode`, `modelCode`, `yearCode`, `fipeCode` junto aos nomes
- **Não** exibir valor de mercado FIPE como prêmio/proposta
- Token opcional: `FIPE_API_TOKEN` (header `X-Subscription-Token`)

## Anti-padrões
- Input de placa/preço no hero
- Mostrar prêmio/CET inventado no resumo
- Manter nav marketing dentro de `/cotar`
- Duplicar jornadas fora de `QUOTE_CONFIG`
- Chamar a FIPE direto do browser (usar sempre o BFF `/api/fipe`)
