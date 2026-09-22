---
name: briefing-medico-landing
description: 'Analista de requisitos das páginas de médico: lê o pedido em linguagem natural e separa o que é FATO sobre o médico (nome, CRM, UF, RQE, especialidade, área de atuação, hospitais, endereços, convênios, contato, formação) do que é REDAÇÃO (frases, explicações), anota a fonte de cada fato, marca PENDENTE o que falta, propõe o slug e grava o briefing.md e o pagina.json. Nunca completa lacuna com palpite plausível. Use no início de toda página nova, quando o médico mandar informação nova ("mudou de hospital", "aceita outro plano", "tem RQE novo"), e para conferir se uma página existente afirma algo sem fonte. Dispare também em "o que falta para a página do Dr. X?", "atualiza os convênios", "ele atende em outro lugar agora".'
---

# Briefing — o que é fato, de onde veio e o que falta

Você faz o levantamento de requisitos de uma página. A diferença para um levantamento comum é que aqui
**o erro é público e tem o CRM de alguém em cima**: um convênio que o médico não aceita gera ligação
irritada; uma especialidade sem RQE gera processo ético.

## Perfil (leia primeiro)

`CLAUDE.md` — regras **1**, **2**, **4** e **7**. O contrato do `pagina.json` é o código:
`ferramentas/lib/pagina.mjs`. O modelo do briefing está em `references/modelo-briefing.md`.

## Fato × redação

| É fato (precisa de fonte) | É redação (pode ser proposta) |
|---|---|
| Nome, tratamento, gênero gramatical | A frase de abertura |
| CRM e UF; RQE de cada especialidade e área | A explicação do que é uma arritmia |
| Especialidade e área de atuação **registradas** | "Como é a consulta" — **se o médico confirmar** o roteiro |
| Hospitais, clínicas, endereços, horários | As perguntas frequentes e as respostas **educativas** |
| Convênios; se atende particular; valor da consulta | O texto do botão |
| Formação, residência, títulos, sociedades | |
| Exames e procedimentos que **ele** faz | |
| Idiomas, teleconsulta, acessibilidade do local | |
| Qualquer número: anos, pacientes, cirurgias | |

⌗ **"Como é a consulta" parece redação e é fato.** "Levo 40 minutos na primeira consulta" é afirmação
sobre o médico. Proponha o texto, marque **a confirmar pelo médico**.

⌗ **A fonte tem nome.** `pedido do dono em 2026-09-22`, `mensagem do médico (WhatsApp, 2026-09-23)`,
`portal do CFM, busca de médicos, 2026-09-23`, `site do hospital X`. "Conhecimento geral" não é fonte
de fato sobre o médico.

## Fluxo

1. **Extraia** do pedido cada fato, com a fonte `pedido`.
2. **Separe** o que o pedido dá como especialidade em: especialidade (tem RQE?) e área de atuação (tem
   RQE?). Sem RQE informado → `PENDENTE`, e a nota "sem RQE, a página diz *atende*, não *especialista*".
3. **Proponha o slug** (regra 7): `dr`/`dra` + primeiro nome, ou + sobrenome se houver colisão ou
   pedido — `drjoao`, `drajoanaribeiro`. Minúsculas, sem acento, sem ponto. Confira que não existe em
   `site/` nem em `site.config.json › redirecionamentos`. **Pergunte antes de fixar**: depois de
   publicado, não muda.
4. **Liste as pendências** numa tabela única, agrupadas por "trava a página" (CRM, RQE, contato) e
   "melhora a página" (foto, horários, formação).
5. **Grave** `docs/paginas/<slug>/briefing.md` e `site/<slug>/pagina.json` (`publicar: false`,
   pendência como `PENDENTE`).
6. **Diga ao dono** que **CRM e RQE se conferem no portal do CFM** (busca de médicos) antes de publicar
   — é a data `revisao.crmConferidoEm`, e quem a preenche é ele.

## Atualização de página existente

Informação nova entra **primeiro no briefing** (com a fonte e a data), depois no `pagina.json`, depois
no HTML. Fato que sai (hospital que o médico deixou) sai **das três**, e o `atualizadoEm` muda. Rode
`npm run verificar` — a identificação CFM é conferida contra o `pagina.json`.

## Definição de pronto

- [ ] Todo fato do `pagina.json` e da página tem linha no briefing com fonte e data.
- [ ] Nenhuma especialidade ou área sem RQE anunciada como tal.
- [ ] Pendências listadas e perguntadas de uma vez; nada preenchido por palpite.
- [ ] Slug proposto, conferido contra colisão e confirmado pelo dono.
