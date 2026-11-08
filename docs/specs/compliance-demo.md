# Spec — Compliance e modo demo

## Modo demo (padrão)
- `NUVIORA_SUBMISSION_MODE=demo` (ou unset)
- Sem envio de PII a parceiros / seguradoras
- Sem geração de proposta financeira real
- UI deve **nomear** demonstração perto de captura de dados
- `POST /api/quote-requests` preparado; em demo pode retornar **503** / não integrar

## Modos futuros
| Valor | Comportamento esperado |
|-------|------------------------|
| `demo` | Local/sessão; disclosures fortes |
| `assisted` | Encaminhamento humano / operação assistida |
| `integrated` | BFF → .NET / parceiros |

Não ativar `integrated` sem contrato de API e revisão legal.

## Claims comerciais
Proibido sem evidência auditável:
- Preço, “a partir de”, desconto %, CET, taxa
- Tempo de aprovação (“em 5 minutos aprovado”)
- “Garantido”, “menor do Brasil”, rankings
- Depoimentos/notas/estrelas inventados
- Volume de clientes/cidades inventado

Permitido:
- Explicar **conceitos** (franquia, CET, garantia, exclusões)
- Dizer que proposta real vem do parceiro
- SUSEP / institucional genérico sem número falso de registro se não confirmado

## Regulatório / institucional
- Footer: espaço para SUSEP e textos legais
- `/privacidade` e `/termos`: placeholders até revisão jurídica — marcar como tal
- Não apresentar Nuviora como seguradora

## Produto “Empréstimos”
- Nome de produto **sempre** Empréstimos
- Nunca “Home Equity” em UI, meta, docs de produto voltadas a usuário
- Deixar claro risco sobre patrimônio quando copy falar de garantia

## Analytics
- Eventos em `src/lib/analytics/events.ts` — sem PII em payloads
- Não logar formulários completos em analytics de marketing

## Checklist de página (release)
- [ ] CTA descreve ação real
- [ ] Demo visível se há form
- [ ] Sem preço/CET fictício
- [ ] Logo oficial sem filtro
- [ ] Sem referência Pier/Loovi no UI
- [ ] Empréstimos ≠ Home Equity
