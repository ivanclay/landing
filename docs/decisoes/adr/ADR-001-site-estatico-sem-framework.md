# ADR-001 — Site estático em HTML, CSS e JS puros, sem gerador

- **Data:** 2026-09-22 · **Estado:** aceito

## Contexto
Cada página é desenhada para um médico, com identidade própria (regra 10). O que se repete entre as
páginas é pouco: o cabeçalho de SEO, o índice, o sitemap e as conferências.

## Decisão
HTML, CSS e JS escritos à mão por página, sobre um `base.css` e um `componentes.css` compartilhados
sem cor. O que se repete fica em duas ferramentas Node **sem dependência**: `construir.mjs` e
`verificar.mjs`.

## Consequências
- O CI roda sem `npm ci`: rápido, sem pacote de terceiro no caminho da publicação.
- Nenhum gerador impõe estrutura igual às páginas. O preço é que a consistência entre páginas depende
  do esqueleto, das skills e da verificação.
- `npm install` só é preciso localmente, para fontes (Fontsource) e imagens (sharp).

## Alternativas
Astro, Eleventy, Jekyll. Todas ótimas para repetir estrutura, que é justamente o que não se quer aqui.
Nenhuma dispensaria as verificações próprias (CFM, terceiros, identificação).
