# QA — Hub Saúde Negócios (`hub-saude-negocios`) · PROPOSTA

- Data: 2026-09-22 · O construído (`npm run verificar` → `_site/`), em `http://localhost:4173`.

## Lighthouse — celular, Lighthouse 12.8.2, 3 execuções

`npx lighthouse@12 http://localhost:4173/hub-saude-negocios/ --chrome-flags="--headless=new"` (×3)

| Execução | Performance | Acessibilidade | Boas práticas | SEO | LCP | CLS | Peso |
|---|---|---|---|---|---|---|---|
| 1 | 99 | 100 | 100 | 69 | 2,03 s | 0,002 | 170 KB |
| 2 | 99 | 100 | 100 | 69 | 2,03 s | 0,002 | 170 KB |
| 3 | 99 | 100 | 100 | 69 | 2,11 s | 0,002 | 170 KB |
| **Mediana** | **99** | **100** | **100** | **69** | **2,03 s** | **0,002** | **170 KB** |

SEO 69: só `is-crawlable` — o `noindex` da proposta (ADR-005). Decidido.

## Larguras sem rolagem lateral (Playwright + Chrome)
320 ✔ · 360 ✔ · 768 ✔ · 1440 ✔ · 1920 ✔

## Sem JavaScript
A página não tem JS próprio; todo conteúdo e os links de WhatsApp funcionam sem script.

## Capturas
`capturas/360.png` · `capturas/1440.png` · `capturas/indice-1440.png` (a raiz com "Demonstrações e propostas")

## Não conferido (fica para o dono)
Leitor de tela, zoom 200% e Tab à mão; JSON-LD no validator.schema.org; o link do WhatsApp num celular —
é o número **real** do Hub, cuidado ao testar.
