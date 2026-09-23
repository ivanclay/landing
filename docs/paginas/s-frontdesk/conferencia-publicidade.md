# Conferência de publicidade: S-FrontDesk (`s-frontdesk`)

- **Data:** 2026-09-23 · **Sobre:** o **construído** (`_site/s-frontdesk/index.html` e o texto que o `demo.js` escreve),
  depois da última mudança de texto.
- **Régua:** regras 1, 2 e 3 do `CLAUDE.md`; CDC arts. 36 a 38 (clara, não enganosa, ônus da prova de quem anuncia);
  E-04, E-09 e E-10 do ecossistema. ⌗ Isto é uma conferência de redação, **não é parecer jurídico**.
- **Enquadramento:** pré-lançamento. Nenhuma fatia entregue, então todo recurso vem **no futuro de projeto**, com o
  aval do roadmap dado pelo dono no gate 1 (P3), e a página diz isso três vezes: no selo, na nota de "Um dia na
  recepção" e na primeira pergunta frequente.

## Frase a frase

| Frase no ar | O que afirma | Fonte (briefing) | Regra | Decisão |
|---|---|---|---|---|
| "**Pré-lançamento** · em desenvolvimento. Procuramos clínicas piloto." | estado do produto | A1 | regra 1; CDC art. 37 §1º (omissão) | ok: é o aviso que evita a leitura de "produto pronto" |
| "Agenda e atendimento para clínicas e consultórios médicos" | público | A12 (D-E05: só médicos) | regra 1 | ok |
| h1 "A agenda da clínica num lugar só: para a recepção e para o paciente." | proposta de valor | A2–A4 | regra 2 | ok: descreve o escopo, sem superlativo nem resultado |
| "O S-FrontDesk está sendo construído para organizar o dia da recepção e deixar o paciente marcar o próprio horário." | recurso futuro | A3, A4 | regra 1 | ok: futuro de projeto |
| 07h52 "…o paciente vai poder escolher um horário livre e marcar pelo aplicativo, sem ligar." | recurso futuro | A4 | regra 1 | ok. "Sem ligar" descreve o caminho, não promete "menos ligações" |
| 09h10 "A recepção vai ver o dia inteiro numa tela e agendar por telefone em poucos passos…" | recurso futuro | A3 | regra 1 e 2 | ok. "Poucos passos" é qualitativo e a demo mostra três |
| 11h30 "O paciente vai receber um lembrete antes da consulta e poder confirmar, remarcar ou cancelar pelo aplicativo." | recurso futuro | A4, A5 | regra 1 | ok. **Sem canal** (D-E07) e **sem** "menos faltas" |
| 14h00 "Profissionais, grade de horários e bloqueios… num lugar só." | recurso futuro | A2 | regra 1 | ok |
| 17h45 "…está sendo feito para não deixar: um horário, um paciente. É regra do projeto." | compromisso de projeto | A6 (E-07) | regra 1 | ok: marcado como regra de projeto |
| "Tudo nesta página está em desenvolvimento. É o que estamos construindo, não uma promessa de resultado." | ressalva | A1 | CDC art. 37 | ok |
| "Regras que o S-FrontDesk segue desde o projeto" + as cinco regras | compromissos | A6–A10 (E-03, E-04, E-06, E-07) | regra 2 | ok: diz **o que** faz, sem rótulo LGPD |
| "São regras de projeto de um produto em desenvolvimento, não certificações." | ressalva | — | regra 2 | ok. Aviso do piso `certificacao`: não disparou ("certificações" no plural); a frase **nega** o selo e fica |
| "As condições do piloto são combinadas na conversa." | oferta | A13 | regra 1; CDC art. 30 (oferta vincula) | ok: não oferece gratuidade, prazo ou preço |
| Perguntas: "Ainda não. Está em desenvolvimento…" · "O preço ainda não foi definido." · "…serão definidos antes do primeiro paciente real." | estado, preço, LGPD | A1, D-E12, D-E13 | regras 1 e 2 | ok: cada resposta diz o que **não** existe ainda |
| "Esta página não usa cookies nem coleta dados…" | fato da página | verificado (sem `<form>`, sem terceiros, sem armazenamento) | regra 5; E-04 | ok |
| Rodapé "Um produto da Fábrica de Apps e Soluções." | autoria | A16 | — | ok |
| Chamada "Quero ser clínica piloto" (5 vezes, sempre igual) | ação | — | — | ok |

## A demo

| Item | Regra | Decisão |
|---|---|---|
| Aviso "**Demonstração com dados fictícios.** Protótipo das telas: o produto final pode mudar." dentro da moldura, antes de tudo, também sem JS | regra 3; E-09 | ok, conferido pela checagem |
| "Dra. Helena Exemplo · Médica · CRM-BA 000000 · Clínica médica · RQE 000000" e "Dr. Caio Exemplo · Médico · CRM-BA 000000 · Cardiologia · RQE 000000" | E-10; `cfm-perfil-profissional.md` | ok: nome, a palavra Médico/Médica, CRM-UF, especialidade só com RQE, sem superlativo |
| "Clínica Exemplo (fictícia)", "Paciente Exemplo N" | E-09 | ok: nada que possa ser real |
| Prévia do lembrete: "Você tem uma consulta hoje às 10h na Clínica Exemplo." | E-04 | ok: sem profissional nem especialidade |
| Nenhum motivo de consulta, nenhum campo de digitação | E-04; regra 5 | ok |

## Avisos das checagens, lidos e decididos

| Aviso | Origem | Decisão |
|---|---|---|
| `WhatsApp +5571999999999 é o número FICTÍCIO provisório (gate 1, P2)` | checagem daqui | **Pendência do dono.** Aceito para a entrega por decisão dele em 2026-09-23. **Bloqueia `publicar: true`** até o número real entrar no `pagina.json`, nos 5 links e na mensagem |
| `hub-saude-negocios: "anos de experiencia"`, peso de outras pastas | `verificar` de lá | não é desta página; fica com o repositório de lá |
| Nenhum aviso do `verificar` de lá sobre `s-frontdesk` | — | — |

## Fora da página (o que foi pedido ou pensado e não entrou)

"Reduz faltas", números, clientes, depoimentos, logotipos, "LGPD", "seguro", "certificado", WhatsApp como canal de
lembrete ou de automação, automação de atendimento (P4), preço, outras profissões.


## Publicação (2026-09-23, repositório ivanclay/landing)

O dono decidiu publicar sem número real: o WhatsApp passou a ser `+5520999999999`, com o **DDD 20, que não é atribuído no Brasil** (Anatel), para que o número não possa ter dono. O botão não leva a ninguém até o número real entrar. Aprovação do dono: `revisao.aprovadoPeloClienteEm = 2026-09-23`, `publicar: true`. O texto não mudou. O rodapé foi reorganizado em colunas (marca · o produto · nesta página · contato; avisos na base), pedido do dono para seguir o modelo das outras páginas; as frases do rodapé original ficaram iguais, e os itens novos ("Agenda da recepção", "Agendamento pelo paciente", "Em pré-lançamento") saem do `resumo`. Agora são **6** links de WhatsApp (o 6º está no rodapé).
