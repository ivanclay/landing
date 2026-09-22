# Índice da documentação

- **Perfil e regras:** [`../CLAUDE.md`](../CLAUDE.md) — é ele que decide
- **Manuais:** [operador](manual/manual-operador.md) (pedir, aprovar e publicar uma página) ·
  [desenvolvedor](manual/manual-desenvolvedor.md) (ferramentas, contrato, workflows)
- **Decisões:** [ADRs](decisoes/adr/) · [backlog](decisoes/backlog.md)
- **Métricas:** [`metricas/implementacoes.csv`](metricas/implementacoes.csv)

## Páginas

Estado: `rascunho` · `aguardando médico` · `publicada` · `redirecionada` · `fora do ar`.

| Slug | Médico | Especialidade | Cidade | Estado | Criada | Aprovada | Publicada | Atualizada |
|---|---|---|---|---|---|---|---|---|
| [`dr-paulo-de-tarso`](paginas/dr-paulo-de-tarso/briefing.md) | Dr. Paulo de Tarso Lopes Pontes (**fictício**) | Cardiologia | São Paulo | **demonstração** (ADR-004: noindex, fora do índice, só link direto) | 2026-09-22 | — (não há médico) | 2026-09-22 (merge) | 2026-09-22 |

⌗ A tabela é atualizada pelo `documentador-landing` a cada página. Em caso de dúvida, o que vale é o
`site/<slug>/pagina.json` (campo `publicar`) e o que está no ar — e a divergência é achado.
