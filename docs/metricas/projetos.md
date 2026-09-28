# Projetos: tempo, custo, agentes e esforço

Consolidado por projeto (uma página ou uma mudança com nome). O registro por segmento está em
`implementacoes.csv`; o detalhe de cada projeto, em `docs/paginas/<slug>/metricas/relatorio.md`. Quem mantém:
`registro-implementacao-landing` (modo `fim`), a pedido do `techlead-landing`.

## Medido

Tempo ativo (relógio de parede, sem pausas) e custo do `ccusage` (inclui todos os agentes da sessão).

| Projeto | Tipo | Segmentos | Tempo ativo | Custo (US$) | Agentes (modelo) | Origem |
|---|---|---|---|---|---|---|
| dr-paulo-de-tarso | médico (demonstração) | 1 | 24 min | 9,07 | coleta (não registrado) | ccusage |
| hub-saude-negocios | negócio (proposta) | 1 | 19 min | 9,81 | levantamento (não registrado) | ccusage |
| arruda-seixas | advocacia (demonstração) | 3 | 45 min | 14,36 | — | ccusage |
| indice | índice (assets) | 1 | 13 min | 5,76 | — | ccusage |
| s-frontdesk + rodapés | publicação | 1 | 5 min | — | — | só tempo |
| emilia-kuwano | nutrição (proposta) | 3 | 52 min | 15,83 | 3 × Opus (layouts) | ccusage |
| **Total** | | **10** | **2 h 38 min** | **54,83** | | |

Reproduzir: somar por `slug` as colunas `duracao_min` e `custo_usd` de `docs/metricas/implementacoes.csv`.

## Esforço (classificação, não medida)

Escala do `techlead-landing` (`●○○○○` ajuste · `●●○○○` página em tipo existente · `●●●○○` tipo novo **ou**
opções de layout · `●●●●○` tipo novo **e** opções, ou norma pesquisada do zero · `●●●●●` mudança transversal).

| Projeto | Esforço | Por quê |
|---|---|---|
| dr-paulo-de-tarso | `●●●○○` | primeira página + modo demonstração nas ferramentas (ADR-004) |
| hub-saude-negocios | `●●●○○` | tipo negócio e proposta (ADR-005) |
| arruda-seixas | `●●●●○` | tipo advocacia (ADR-006) + 4 opções de abertura |
| indice | `●●●○○` | índice novo (ADR-007) |
| s-frontdesk + rodapés | `●○○○○` | publicação e rodapés |
| emilia-kuwano | `●●●●○` | tipo nutrição (ADR-008) + 3 layouts inteiros |
