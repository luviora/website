# Plano de design — Nuviora (skill frontend-design)

## Sujeito
B2C brasileiro: seguros e crédito com tom humano, sem pressão comercial. Protagonista: **início da simulação**.

## Tokens
| Nome | HEX | Papel |
|------|-----|--------|
| navy | `#102D30` | Texto, CTA |
| ink | `#173B3A` | Títulos secundários |
| green | `#21866C` | Foco, progresso, acento estrutural |
| mint | `#B8F5D5` | Destaque pontual (trilho do cotador) |
| cream | `#F8F8F4` | Fundo |
| white | `#FFFFFF` | Superfícies de formulário |

## Tipografia
- **Manrope** — apenas H1/H2 de impacto.
- **DM Sans** — corpo, UI, navegação.
- Escala: H1 clamp, corpo 1rem / 1.65 line-height, blocos ≤ 38rem.

## Layout (hero)
```
[ Nav                                                    Simular ]
------------------------------------------------------------------
|  Headline + 2 frases          |  | Cotador (trilho mint 4px)  |
|  CTAs                         |  | grid 2x2 produtos          |
------------------------------------------------------------------
```
Mobile: cotador imediatamente abaixo do título (order).

## Princípios aplicados
1. Um gesto memorável: **trilho vertical mint** no card do cotador.
2. Sem blobs, sem fade em todas as seções, sem setas em todo link.
3. Movimento só em **mudança de etapa** na cotação.
4. “Como funciona” como **trilha conectada**, não três cards idênticos.

## Anti-padrões evitados
Eyebrow pill, SaaS-card kit uniforme, hover lift em massa, terracota/cream genérico.
