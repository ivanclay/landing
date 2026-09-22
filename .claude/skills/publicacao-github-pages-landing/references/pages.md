# Os workflows, peça por peça

## `verificar.yml` — em todo PR para o `main`
- `permissions: contents: read` — só lê.
- `setup-node` 22 e **sem `npm ci`**: `construir.mjs` e `verificar.mjs` usam só a biblioteca padrão do
  Node. Menos tempo, nenhuma dependência de terceiro no caminho da publicação.
- É o **status check** que a proteção do `main` exige.

## `publicar.yml` — em todo push no `main` (= merge) e por `workflow_dispatch`
- `permissions: pages: write, id-token: write` — o mínimo que o `deploy-pages` pede.
- `concurrency: pages` sem cancelar: dois merges seguidos publicam em ordem, nenhum deploy é cortado
  no meio.
- Job `construir`: checkout → Node → `configure-pages` → construir + verificar (de novo: o que publica
  é o que passou) → `upload-pages-artifact@v4` com `_site`.
  ⌗ A v4 **não inclui arquivos que começam com ponto**. Não precisamos de `.nojekyll`: com deploy por
  Actions, o Jekyll não roda.
- Job `publicar`: `deploy-pages@v4`, no ambiente `github-pages`, com a URL no resumo.

## Versões
`actions/checkout@v4`, `actions/setup-node@v4`, `actions/configure-pages@v5`,
`actions/upload-pages-artifact@v4`, `actions/deploy-pages@v4`. Atualizar versão maior é PR próprio,
com o changelog lido — o `deploy-pages` só aceita artefatos de `upload-pages-artifact@v3` ou mais novo.

## Site de projeto × site de usuário
`ivanclay/landing` é **site de projeto**: `https://ivanclay.github.io/landing/`. O site de usuário é o
repositório `ivanclay/ivanclay.github.io` (se existir) — é por ele que `/privacidade/` pode estar em
outro repositório. Para `/<slug>` sem o `/landing/`, só com domínio próprio neste repositório (D-01).
