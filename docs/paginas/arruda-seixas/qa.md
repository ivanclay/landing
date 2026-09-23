# QA — Arruda Seixas Advogados (`arruda-seixas`) · DEMONSTRAÇÃO

- Data: 2026-09-23 · O construído (`npm run verificar` → `_site/`), servido em `http://localhost:4173`
  (`npx serve@14 _site -l 4173`).

## Verificação e testes
- `npm run verificar`: **aprovada**; nenhum aviso desta página (os 3 avisos são do Dr. Paulo e do hub, já
  decididos nas páginas deles).
- `npm run testar`: **17/17** (7 novos de advocacia, ADR-006).

## Lighthouse — celular, Lighthouse 12.8.2, 3 execuções

`npx lighthouse@12 http://localhost:4173/arruda-seixas/ --chrome-flags="--headless=new"` (×3)

| Execução | Performance | Acessibilidade | Boas práticas | SEO | LCP | CLS | Peso |
|---|---|---|---|---|---|---|---|
| 1 | 99 | 100 | 100 | 66 | 1,8 s | 0,001 | 144 KB |
| 2 | 99 | 100 | 100 | 66 | 1,8 s | 0,001 | 144 KB |
| 3 | 99 | 100 | 100 | 66 | 1,8 s | 0,001 | 144 KB |
| **Mediana** | **99** | **100** | **100** | **66** | **1,8 s** | **0,001** | **144 KB** |

- SEO 66: só `is-crawlable` — o `noindex` da demonstração. Decidido (como no Dr. Paulo e no hub).
- Antes da troca de fonte a mediana era Performance 96 e **LCP 2,6 s** (reprovava a regra 11): o
  parágrafo de apoio esperava 247 KB de Source Serif com eixo óptico. Com o eixo só de peso (103 KB),
  1,8 s — ver direcao-de-arte.md §3.

## Larguras e JavaScript (Playwright 1 + Chrome)
Sem rolagem lateral em 320 · 360 · 768 · 1024 · 1440 · 1920, **com e sem JS**. Todo conteúdo, as âncoras
do índice e os links de telefone e WhatsApp são HTML puro; o único JS é o comum (`assets/js/pagina.js`,
esconde a barra de contato enquanto o contato do topo está na tela).

## Alvos de toque
Todo link e botão ≥ 44 px em 360 px (medido com `getBoundingClientRect`). Achado e corrigido: os links
de área na lista de sócios tinham 40 px.

## Capturas
`capturas/360.png` · `capturas/1440.png` (página inteira).

## Não conferido (fica para o dono — B-10)
Leitor de tela, zoom 200% e Tab à mão; JSON-LD no validator.schema.org; os links `tel:` e WhatsApp num
celular (números **fictícios**: não ligue).
