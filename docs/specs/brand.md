# Spec — Marca e tokens

## Identidade
- Nome do produto/plataforma: **Nuviora**
- Posicionamento: B2C de simulação (seguros + empréstimos PF/PJ), não seguradora.
- Benchmark estrutural: Pier / Loovi — **nunca** copiar identidade visual, claims ou prices.

## Logo
- Arquivo: `/public/image/logo.png` (componente `src/components/brand/logo.tsx`)
- **Obrigatório:** cores originais do PNG
- **Proibido:** `invert`, `brightness-0`, `grayscale`, overlays que alterem a marca
- Navbar home: fundo cream translúcido; logo sem filtro
- Fluxo `/cotar`: logo no topo do shell (sem SiteHeader)

## Paleta canônica

| Token | Hex | Uso |
|-------|-----|-----|
| Navy | `#102D30` | Texto principal, primary, hero base |
| Ink | `#173B3A` | Variante navy |
| Green | `#21866C` | Accent, ring, sucesso |
| Mint | `#B8F5D5` | Secondary, CTAs mint no quote, highlights |
| Cream | `#F8F8F4` | Background de página |
| Surface | `#FFFFFF` | Cards |
| Border | `#DFE8E3` | Divisores sutis |
| Muted text | `#6E827C` | Corpo secundário |
| Destructive | `#B42318` | Erros |

Fonte CSS: `src/styles/tokens.css` — **editar tokens lá**, não hardcodar hex em componentes salvo exceção documentada.

## Tipografia
- Display / H1–H2: **Manrope**
- Corpo / UI: **DM Sans**
- Evitar Inter, Roboto, Arial, system-ui como face principal de marketing

## Raios e sombra
- `--radius-sm` 8 · `md` 12 · `lg` 16 · `xl` 24 · `2xl` 28
- Elevação: `--shadow-elevated`, hover `--shadow-card-hover`
- Inputs: `--shadow-input` / `--shadow-input-focus`

## Imagens humanas
| Asset | Uso |
|-------|-----|
| `/image/persons/person-1.png` | Hero home — PNG transparente, `object-contain`, alinhamento vertical centro/base conforme layout atual |
| `/image/persons/person-2.png` | Prefooter / human moment — alinhada à **base** |
| `/image/products/*.jpg` | Fundos dos tiles do cotador entry e quadrantes |

## Anti-padrões visuais (IA look)
- Mesh gradients + orbs + glow roxo
- Glassmorphism em massa
- Badges flutuantes / sparkles / stickers no hero
- Carrossel de logos de seguradoras no footer
- Cards no hero; stats strips; pill clusters

## Brand kit (pendente)
- Ícones oficiais substituirão Lucide em produtos quando o zip oficial chegar.
- Até lá: Lucide + `ProductIcon` — documentar qualquer novo ícone.
