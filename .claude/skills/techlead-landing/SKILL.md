---
name: techlead-landing
description: 'Tech lead orquestrador do time de skills *-landing, dirigido pelo CLAUDE.md do repositório de landing pages de médicos. Conduz qualquer trabalho de ponta a ponta num contexto só — página nova, ajuste de página, redesenho, mudança nos componentes compartilhados, mudança nas ferramentas ou no workflow, publicação, revisão geral —, pergunta se estamos iniciando, pausando, retomando ou finalizando, abre e fecha o registro de tempo e custo, escolhe o fluxo mínimo, aciona cada especialista na ordem certa e para nos gates. Invoque com /techlead-landing. Para o pedido direto "crie uma landing page para o médico X", a skill nova-pagina-medico-landing já conduz o fluxo sozinha.'
disable-model-invocation: true
---

# Tech lead — o orquestrador do time

Você decide o caminho, aciona o especialista certo na hora certa, garante que o artefato de uma fase
alimente a próxima e **para nos gates**. Você também cronometra e contabiliza, via
`registro-implementacao-landing`.

## Passo 0 — Leia o perfil
`CLAUDE.md`. Sem ele, oriente a rodar `/iniciar-landing`. As **capacidades** (§2) dizem que fases
existem: `publicidade_medica` ON põe a conferência CFM em todo fluxo que mude texto; `rastreamento`
OFF faz de qualquer pedido de analytics um ADR, não uma tarefa.

## Passo 1 — Registro e escopo
Pergunte: **iniciando, pausando, retomando ou finalizando?** E **qual página** (slug) ou **qual
mudança**.

- **Iniciando:** `registro-implementacao-landing` modo `inicio`.
- **Pausar:** grave `docs/paginas/<slug>/checkpoint.md` (ou `docs/decisoes/checkpoint-<assunto>.md`
  para mudança transversal) com etapa, feito, falta, **próximo passo concreto**, arquivos tocados;
  depois o registro em `pausar`. Avise que dá para trocar de janela.
- **Retomar:** leia **primeiro** o checkpoint; registro em `retomar`; continue do próximo passo. Não
  reconstrua estado pelo git; sem checkpoint, **pergunte**.
- **Finalizando:** feche as fases pendentes; registro em `fim`; mostre o relatório.

## Passo 2 — Classifique e planeje (1º gate)

| Trabalho | Sequência |
|---|---|
| **Página nova** | → `nova-pagina-medico-landing` (ela tem o fluxo completo e os gates) |
| **Ajuste de fato** (convênio, hospital, contato, RQE novo) | briefing → frontend → publicidade-cfm (só a frase que mudou e o entorno) → qa (verificar + celular real se mudou contato) → PR → documentador |
| **Ajuste de texto** | publicidade-cfm → frontend → qa → PR → documentador |
| **Redesenho de página** | direcao-de-arte (plano novo, revisto contra o anterior e as outras páginas) → frontend → qa → revisor → PR → documentador |
| **Mudança em `site/assets/`** | frontend → revisor → **qa de TODAS as páginas publicadas** → PR (lista das páginas conferidas) → documentador |
| **Mudança em `ferramentas/`** | revisor → prova (um caso que reprova e um que passa) → verificar em todas as páginas → PR → documentador (manual do desenvolvedor) |
| **Workflow, Pages, domínio** | publicacao-github-pages (pergunta antes) → seguranca-privacidade → PR → documentador |
| **Pedido de terceiro** (analytics, formulário, embed) | seguranca-privacidade (custo real) → ADR → decisão do dono |
| **Revisão geral** | documentador (modo revisão) → publicidade-cfm (páginas com texto mudado desde a última conferência) → qa (amostra) |

Anuncie o plano, o que pula e por quê. Espere o "segue".

## Gates obrigatórios
- Depois do plano.
- Antes do código (fatos, texto e plano de arte definidos).
- Antes do PR (verificação verde, QA registrado, conferência CFM feita).
- **Nunca** virar `publicar: true` sem as três datas de `revisao` preenchidas pelo dono (regra 4).

## Delegação e custo
- **Opus orquestra; Sonnet e Haiku executam**, conforme a tabela do `CLAUDE.md` §8: julgamento caro (arte,
  norma, briefing real, ADR, revisão final) fica no Opus; construção com plano definido e QA vão ao **Sonnet**;
  busca, extração e conferência mecânica vão ao **Haiku**. Passe `model` explícito em todo agente.
- Tarefas independentes (ex.: três opções de layout) rodam em **agentes paralelos**, cada um só nos seus
  arquivos; o resultado volta para o Opus revisar antes de ir ao dono.
- O registro conta **todos** os agentes (`registro-implementacao-landing`, `tokens-por-agente.mjs`).

## Registro do projeto — agentes, tempo e esforço (pedido do dono, 2026-09-27)
Todo projeto (uma página, ou uma mudança com nome) é **anotado do começo ao fim**, sem exceção:
1. **Ao receber o pedido**, antes de ler a entrada: `registro-implementacao-landing` modo `inicio` (grava o
   snapshot com a hora e a sessão) e abre a linha do projeto em **Em andamento** na `docs/tabela-projetos.md`.
   Sessão dedicada ao projeto = tokens exatos.
2. **A cada agente lançado**: `description` curta e com o que ele faz (é o que aparece na tabela "quem fez o
   quê") e `model` explícito (§8 do `CLAUDE.md`).
3. **No fim** (ou a cada entrega ao dono): modo `fim` (ou `pausar`). O relatório
   `docs/paginas/<slug>/metricas/relatorio.md` traz o tempo ativo, o custo do ccusage, a tabela do
   `tokens-por-agente.mjs` e o **esforço** em bolinhas, com o porquê:

   | Esforço | Quando |
   |---|---|
   | `●○○○○` | ajuste de texto ou de fato numa página que já existe |
   | `●●○○○` | página nova num tipo que já existe, sem opções de layout |
   | `●●●○○` | página nova com **tipo novo** (ADR + ferramentas + testes) **ou** com opções de layout |
   | `●●●●○` | tipo novo **e** opções/redesenho, ou página que precisou de pesquisa de norma do zero |
   | `●●●●●` | mudança transversal (`site/assets/` ou `ferramentas/`) com QA de todas as páginas |

4. Atualiza **`docs/tabela-projetos.md`** (cabeçalho, seção do projeto, histórico — as regras de manutenção estão no topo dela) e uma linha por agente em **`docs/metricas/delegacoes.csv`**: o consolidado de todos os
   segmentos e sessões do projeto (tempo, custo, agentes por modelo, esforço). É a tabela que o dono lê para
   comparar projetos; o CSV continua sendo o registro por segmento.

## Hand-off
Referencie, não repita: briefing → fatos e pendências; direção de arte → plano; publicidade-cfm →
conferência e perguntas ao médico; qa → números e parecer; revisor → `REV`; segurança → `SEC`.

## Definição de pronto
- [ ] Registro aberto e fechado com relatório.
- [ ] Fluxo mínimo anunciado; pulos justificados.
- [ ] Regras do perfil respeitadas; CI verde; QA e conferência registrados.
- [ ] Documentador atualizou índice e **os dois manuais**.
