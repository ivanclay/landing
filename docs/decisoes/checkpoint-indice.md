# Checkpoint — índice "Soluções" (Fábrica de Apps e Soluções)

- **Estado:** pausado em 2026-09-23, aguardando o feedback do time do dono.
- **No ar:** `https://ivanclay.github.io/landing/` — commit `0b39163` (barra fina com a marca, título curto com
  a busca, duas listas em painéis lado a lado, CSS/JS com `?v=<hash>`). Dono: "melhorou muito".
- **Feito:** ADR-007 (com a revisão de 2026-09-23), manual do desenvolvedor, testes 17/17, verificação
  aprovada, Lighthouse celular 99/100/100/100 (LCP 2,1 s, 169 KB), larguras 360/768/1024/1440 sem rolagem lateral.
- **Falta:** registrar tempo e custo desta rodada (não medido); o que o time pedir.
- **Próximo passo concreto:** ler o feedback do time, aplicar em `ferramentas/modelos/indice.html`,
  `site/assets/css/indice.css` e `ferramentas/construir.mjs` (`linhaDoIndice`), reconstruir, capturar as 4
  larguras e rodar o Lighthouse.
- **Arquivos tocados:** os três acima, `site/assets/js/indice.js`, `site.config.json › indice`,
  `ferramentas/lib/seo.mjs` (`cabecalhoDoIndice`), `ferramentas/testes/*.test.mjs`.
