# ADR-003 — Publicação pelo GitHub Actions, com o PR como gate

- **Data:** 2026-09-22 · **Estado:** aceito

## Decisão
- `verificar.yml` roda em todo PR para o `main`. É o status check obrigatório.
- `publicar.yml` roda a cada push no `main` (merge) e por `workflow_dispatch`. Ele constrói e
  verifica **de novo**, e publica `_site/` com `upload-pages-artifact@v4` e `deploy-pages@v4`.
- Deploys não se cancelam entre si (`concurrency: pages`, `cancel-in-progress: false`).
- Página com `publicar: false` pode entrar no `main`: fica versionada e fora do ar.

## Consequências
- `_site/` nunca é versionado; o que está no ar é sempre reconstruível a partir do `main`.
- Exige a configuração única: Pages com fonte "GitHub Actions" e proteção do `main`.
