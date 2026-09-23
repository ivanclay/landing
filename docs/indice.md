# Índice da documentação

- **Perfil e regras:** [`../CLAUDE.md`](../CLAUDE.md) — é ele que decide
- **Manuais:** [operador](manual/manual-operador.md) (pedir, aprovar e publicar uma página) ·
  [desenvolvedor](manual/manual-desenvolvedor.md) (ferramentas, contrato, workflows)
- **Decisões:** [ADRs](decisoes/adr/) · [backlog](decisoes/backlog.md)
- **Métricas:** [`metricas/implementacoes.csv`](metricas/implementacoes.csv)

## Estado do projeto

**Pausado em 2026-09-22.** Checkpoints: [dr-paulo-de-tarso](paginas/dr-paulo-de-tarso/checkpoint.md) · [hub-saude-negocios](paginas/hub-saude-negocios/checkpoint.md). Pendências do dono: trocar Settings › Pages › Source para "GitHub Actions"; respostas da Carla (B-06).

## Páginas

Estado: `rascunho` · `aguardando médico` · `publicada` · `redirecionada` · `fora do ar`.

| Slug | Médico | Especialidade | Cidade | Estado | Criada | Aprovada | Publicada | Atualizada |
|---|---|---|---|---|---|---|---|---|
| [`dr-paulo-de-tarso`](paginas/dr-paulo-de-tarso/briefing.md) | Dr. Paulo de Tarso Lopes Pontes (**fictício**) | Cardiologia | São Paulo | **demonstração** (ADR-004: noindex, fora do índice, só link direto) | 2026-09-22 | — (não há médico) | 2026-09-22 (merge) | 2026-09-22 |
| [`arruda-seixas`](paginas/arruda-seixas/briefing.md) | Arruda Seixas Advogados (**fictício**; escritório de advocacia, ADR-006) | Advocacia empresarial | São Paulo | **demonstração** (noindex, só link direto e na seção de demonstrações da raiz) | 2026-09-23 | — (não há escritório) | 2026-09-23 (merge) | 2026-09-23 |
| [`hub-saude-negocios`](paginas/hub-saude-negocios/briefing.md) | Hub Saúde Negócios (negócio real, Carla Rodrigues) | Consultoria em gestão e negócios de saúde | — | **proposta** (ADR-005: noindex, aguarda aprovação do Hub) | 2026-09-22 | — | 2026-09-22 (merge) | 2026-09-22 |

⌗ A tabela é atualizada pelo `documentador-landing` a cada página. Em caso de dúvida, o que vale é o
`site/<slug>/pagina.json` (campo `publicar`) e o que está no ar — e a divergência é achado.
