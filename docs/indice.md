# Índice da documentação

- **Perfil e regras:** [`../CLAUDE.md`](../CLAUDE.md) — é ele que decide
- **Manuais:** [operador](manual/manual-operador.md) (pedir, aprovar e publicar uma página) ·
  [desenvolvedor](manual/manual-desenvolvedor.md) (ferramentas, contrato, workflows)
- **Decisões:** [ADRs](decisoes/adr/) · [backlog](decisoes/backlog.md)
- **Métricas:** [`metricas/implementacoes.csv`](metricas/implementacoes.csv) · [`tabela-projetos.md`](tabela-projetos.md) (projetos: em andamento, realizadas, agentes, tempo, custo, esforço) · [`metricas/delegacoes.csv`](metricas/delegacoes.csv)
- **Questionário do cliente:** [mestre](questionario/questionario-cliente.md) · textos para enviar em [`questionario/enviar/`](questionario/enviar/)

## Estado do projeto

**Pausado em 2026-09-22.** Checkpoints: [dr-paulo-de-tarso](paginas/dr-paulo-de-tarso/checkpoint.md) · [hub-saude-negocios](paginas/hub-saude-negocios/checkpoint.md). Pendências do dono: trocar Settings › Pages › Source para "GitHub Actions"; respostas da Carla (B-06).

## Índice na raiz

"Soluções", da **Fábrica de Apps e Soluções** ([ADR-007](decisoes/adr/ADR-007-indice-da-fabrica.md)): duas colunas —
demonstrações e produtos dos clientes — com busca nas duas e prévia de link própria.

## Páginas

Estado: `rascunho` · `aguardando médico` · `publicada` · `redirecionada` · `fora do ar`.

| Slug | Médico | Especialidade | Cidade | Estado | Criada | Aprovada | Publicada | Atualizada |
|---|---|---|---|---|---|---|---|---|
| [`dr-paulo-de-tarso`](paginas/dr-paulo-de-tarso/briefing.md) | Dr. Paulo de Tarso Lopes Pontes (**fictício**) | Cardiologia | São Paulo | **demonstração** (ADR-004: noindex, fora do índice, só link direto) | 2026-09-22 | — (não há médico) | 2026-09-22 (merge) | 2026-09-23 (rodapé em colunas) |
| [`arruda-seixas`](paginas/arruda-seixas/briefing.md) | Arruda Seixas Advogados (**fictício**; escritório de advocacia, ADR-006) | Advocacia empresarial | São Paulo | **demonstração** (noindex, só link direto e na seção de demonstrações da raiz) | 2026-09-23 | — (não há escritório) | 2026-09-23 (merge) | 2026-09-23 |
| [`hub-saude-negocios`](paginas/hub-saude-negocios/briefing.md) | Hub Saúde Negócios (negócio real, Carla Rodrigues) | Consultoria em gestão e negócios de saúde | — | **proposta** (ADR-005: noindex, aguarda aprovação do Hub) | 2026-09-22 | — | 2026-09-22 (merge) | 2026-09-23 (rodapé em colunas) |
| [`emilia-kuwano`](paginas/emilia-kuwano/briefing.md) | Emília Alves Kuwano (nutricionista **real**, CRN-5 1575, `nutricao`, ADR-008) | Nutrição Clínica e Funcional | Salvador, BA | **proposta** (publicada antes da aprovação dela, por decisão do dono: noindex, etiqueta "Proposta · em avaliação") | 2026-09-27 | — (aguarda a Emília) | 2026-09-27 (merge) | 2026-09-27 |
| [`karoline-melo`](paginas/karoline-melo/briefing.md) | Karoline Melo (corretora de imóveis **real**, CRECI-BA 36.265, CNAI 58.909, `imobiliario`, ADR-009) | Corretora de Imóveis · Consultora imobiliária | Salvador, BA (inferida do DDD; conferir) | **rascunho** — aguardando a aprovação do dono ([checkpoint](paginas/karoline-melo/checkpoint.md)) | 2026-09-27 | — | — | 2026-09-27 |
| [`monica-santos`](paginas/monica-santos/briefing.md) | Mônica Santos (corretora de imóveis **real**, CRECI-BA 37.685, `imobiliario`, ADR-009) | Corretora de Imóveis · Crédito e financiamento habitacional | Salvador e Região Metropolitana, BA | **proposta no ar** — versão final **Pérola** com WhatsApp, Instagram e e-mail reais; aguarda `creciConferidoEm` (dono) e a aprovação final da cliente ([checkpoint](paginas/monica-santos/checkpoint.md)) | 2026-10-03 | — | — | 2026-10-05 |
| [`s-frontdesk`](paginas/s-frontdesk/briefing.md) | S-FrontDesk (produto da Fábrica de Apps e Soluções, `negocio`) | Agenda e atendimento para clínicas | São Paulo | **publicada** (indexável, painel "Produtos dos clientes", etiqueta "Pré-lançamento · em avaliação"; WhatsApp provisório com DDD 20 inexistente) | 2026-09-23 (entregue pelo repositório `sfrontdesk-landing`) | 2026-09-23 (dono) | 2026-09-23 (merge) | 2026-09-23 |

⌗ A tabela é atualizada pelo `documentador-landing` a cada página. Em caso de dúvida, o que vale é o
`site/<slug>/pagina.json` (campo `publicar`) e o que está no ar — e a divergência é achado.
