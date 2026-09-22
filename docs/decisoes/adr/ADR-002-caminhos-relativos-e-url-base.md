# ADR-002 — Caminhos relativos nas páginas; URL absoluta só na construção

- **Data:** 2026-09-22 · **Estado:** aceito

## Contexto
O repositório é site **de projeto** no GitHub Pages: tudo mora sob `/landing/`. A D-01 pode mover o
site para a raiz de um domínio próprio.

## Decisão
As páginas usam só caminhos relativos (`../assets/…`, `imagens/…`). Canonical, `og:url`, `og:image`,
JSON-LD e sitemap são escritos pela construção a partir de `site.config.json › urlBase`, no marcador
`<!-- @gerado:cabecalho -->`. O `404.html` é a única exceção: é gerado com a URL base absoluta, porque
o Pages o serve em qualquer profundidade de caminho.

## Consequências
- Mudar de domínio muda uma linha do `site.config.json`, e nenhuma página.
- `verificar.mjs` reprova caminho absoluto (`/…`) em página, link e CSS.
