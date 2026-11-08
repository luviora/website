# Auditoria visual — iconografia, motion, impacto

## Iconografia (antes → depois)

| Área | Antes | Depois |
|------|--------|--------|
| Produtos | SVGs placeholder heterogêneos | `ProductIcon` Lucide 1.75px, caixa 12px radius, verde/navy |
| Benefícios | Só texto | Ícones `Route`, `FileCheck2`, `MessageCircle` |
| Logo | PNG oficial | Mantido |
| UI geral | Mix SVG + Lucide | Lucide para ações; marca em PNG |

**Pendência:** substituir `ProductIcon` por vetores do brand kit quando `products/*.svg` oficiais existirem.

## Transições (regra)

- **Sim:** troca de etapa (cotação), abrir FAQ, hover/foco em tile do cotador, largura da barra de progresso.
- **Não:** parallax, entrada em todas as seções, lift em todos os cards.

Tokens: `--ease-standard`, `--duration-ui`, `--duration-step` em `tokens.css`.

## Impacto

- Faixa **mint** no topo do cotador (assinatura visual).
- Cotador primeiro no mobile; tipografia H1 em duas linhas.
- Listas com divisórias (produtos/FAQ) em vez de grade de cards iguais.

## Checklist rápido

- [x] Ícones de produto consistentes
- [x] Motion com `prefers-reduced-motion`
- [x] Contraste ícones sobre fundos claros
- [x] Fotos em `/image/persons` no hero (colagem) e benefícios (destaque)
- [ ] OG / ícones PWA além do favicon (brand kit)
