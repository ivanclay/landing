# QA — `dr-paulo-de-tarso` (DEMONSTRAÇÃO)

- Data: 2026-09-22 · Conferido: o **construído** (`npm run rascunhos` → `_site/`), servido em
  `http://localhost:4173` (`npx serve@14 _site`).

## Lighthouse — celular (4G simulado), Lighthouse 12.8.2, 3 execuções

`npx lighthouse@12 http://localhost:4173/dr-paulo-de-tarso/ --chrome-flags="--headless=new"` (×3)

| Execução | Performance | Acessibilidade | Boas práticas | SEO | LCP | CLS | Peso |
|---|---|---|---|---|---|---|---|
| 1 | 99 | 100 | 100 | 69 | 1,89 s | 0,001 | 161 KB |
| 2 | 99 | 100 | 100 | 69 | 1,88 s | 0,001 | 161 KB |
| 3 | 99 | 100 | 100 | 69 | 1,89 s | 0,001 | 161 KB |
| **Mediana** | **99** | **100** | **100** | **69** | **1,89 s** | **0,001** | **161 KB** |
| Orçamento (regra 11) | ≥ 90 | = 100 | ≥ 95 | = 100 | ≤ 2,5 s | ≤ 0,05 | ≤ 900 KB |

**SEO 69 — decidido:** a única auditoria reprovada é `is-crawlable` ("Page is blocked from
indexing"), ou seja, o `noindex` que o ADR-004 impõe a toda demonstração. Numa página real, o
`noindex` sai e a meta é 100.
A primeira rodada deu Boas práticas 96 (404 do `/favicon.ico`); corrigido com o `favicon.svg` da página.

## Larguras sem rolagem lateral
Playwright + Chrome, `scrollWidth === innerWidth`: 320 ✔ · 360 ✔ · 768 ✔ · 1440 ✔ · 1920 ✔.
A tabela plano × local rola **dentro** do próprio contêiner (`role="region"`, `tabindex="0"`) no celular.

## Sem JavaScript (360 px)
Seletor de plano oculto (`.so-com-js`) ✔ · tabela plano × local visível e aberta ✔ · cada local com o
seu link de WhatsApp ✔ · perguntas em `<details>` ✔.

## Comportamento com JS (1440 px)
- "Amil" → "Com Amil: consultório do Jardim Paulista, Oswaldo Cruz e HCor." ✔
- Link do HCor: "Olá! Gostaria de marcar uma consulta com o Dr. Paulo de Tarso no HCor, pelo plano
  Amil." — plano e local, **nenhum sintoma** (regra 5) ✔
- Einstein e Sírio recuam (riscados, contraste 8:1 mantido) e perdem o botão de WhatsApp ✔

## Capturas
`capturas/360.png` · `capturas/1440.png` · `capturas/1440-seletor-amil.png` · `capturas/360-sem-js-planos.png`

## Não conferido nesta sessão (fica para o dono)
- Leitor de tela real (NVDA/VoiceOver). A auditoria automática deu 100, mas não substitui o teste.
- Zoom de 200% e a navegação por Tab do começo ao fim, feitos à mão.
- `wa.me` e `tel:` num celular real (os números são fictícios).
- JSON-LD no validator.schema.org (ver `seo.md`).
