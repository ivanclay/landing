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

## Hand-off
Referencie, não repita: briefing → fatos e pendências; direção de arte → plano; publicidade-cfm →
conferência e perguntas ao médico; qa → números e parecer; revisor → `REV`; segurança → `SEC`.

## Definição de pronto
- [ ] Registro aberto e fechado com relatório.
- [ ] Fluxo mínimo anunciado; pulos justificados.
- [ ] Regras do perfil respeitadas; CI verde; QA e conferência registrados.
- [ ] Documentador atualizou índice e **os dois manuais**.
