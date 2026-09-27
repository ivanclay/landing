# QA — `emilia-kuwano`

- **Data:** 2026-09-27 · branch `pagina/emilia-kuwano` · construído com `npm run rascunhos`, servido com
  `npx serve@14 _site -l 4173`.
- **Ambiente:** Windows 11, Chrome (canal estável) via Playwright; Lighthouse 13.5.0.

## Lighthouse — celular (mediana de 3)

`npx --yes lighthouse http://localhost:4173/emilia-kuwano/ --form-factor=mobile --screenEmulation.mobile --throttling-method=simulate --only-categories=performance,accessibility,best-practices,seo --output=json --chrome-flags="--headless"`

| Performance | Acessibilidade | Boas práticas | SEO | LCP | CLS | TBT | Peso |
|---|---|---|---|---|---|---|---|
| **97** | **100** | **100** | 69 ⚠ | 2,3 s | 0 | 0 ms | 211 KB |

- SEO 69: única falha é `is-crawlable` — o `noindex` do **rascunho**, de propósito. Refazer depois de
  `publicar: true` (espera-se 100).
- Primeira rodada deu Acessibilidade 96: quatro textos pequenos a 4,0–4,1:1 (rosado sobre terracota,
  terracota sobre superfície e rosa). Corrigido com branco puro na terracota e `--cor-marca-texto` `#944a30`
  (≥ 5,0:1). As três rodadas acima são depois da correção.

## Larguras (Playwright, `scrollWidth − clientWidth`)

320 · 360 · 768 · 1440 · 1920 px → **0** de rolagem lateral em todas. Capturas: `capturas/360.png`,
`capturas/1440.png`, e as aberturas A/B (`capturas/abertura-{a,b}-{390,1440}.png`).

## Verificação

`npm run verificar:rascunhos` → **1 erro, esperado:** "PENDENTE" na página (o CRN). Nenhum termo do piso do
CFN. `npm run testar` → 25/25.

## Não verificado ainda (antes do merge)

- Teclado (Tab em toda a página), leitor de tela, zoom 200%, página sem JS — à mão.
- Links de WhatsApp e e-mail num celular real.
- Lighthouse com a página publicável (SEO 100).
