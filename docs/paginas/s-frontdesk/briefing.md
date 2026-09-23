# Briefing: S-FrontDesk (`s-frontdesk`)

**Objetivo:** apresentar o S-FrontDesk **antes do lançamento**: o que ele vai resolver na clínica, uma
demonstração interativa marcada como protótipo com dados fictícios, e o convite para a clínica ser **piloto**
pelo WhatsApp.
**Público:** donos e gestores de clínicas, e a recepção. **Não** o paciente.
**Pedido original:** 2026-09-23, pelo dono, via `/techlead-landing`.
**Destino:** uma página do `ivanclay/landing` (ADR-004), no formato lido em `docs/entrega/contrato-landing.md`.

## Estado do produto em 2026-09-23 (a fonte de tudo abaixo)

- **Nenhuma fatia entregue** em `sfrontdesk-api`, `sfrontdesk-gestao` nem `sfrontdesk-app`. Os três perfis dizem
  "Nenhuma fatia aberta".
- Os três roadmaps estão como **"proposto (vale depois do aval do dono)"**:
  - API: F1 clínica e configuração · F2 grade e bloqueios · F3 agendamento (sem dupla marcação) · F4 paciente ·
    F5 lembretes · F6 automação de atendimento · F7 plataforma e cobrança.
  - Gestão: F1 configurações · F2 grade e bloqueios · **F3 agenda do dia da recepção** · F4 pacientes · F5 lembretes ·
    F6 automação · F7 relatórios.
  - App: F2 encontrar horário · F3 agendar e confirmar · F4 minhas consultas (cancelar, remarcar) · F5 lembretes.
- Regras do ecossistema **já escritas** (`../sfrontdesk-api/docs/ecossistema/regras.md`): E-03 (uma clínica
  nunca vê o dado de outra), E-04 (mínimo necessário; nada de profissional, especialidade ou motivo em
  notificação), E-06 (horário no fuso da clínica), E-07 (não existe dupla marcação).
- Decisões **abertas** que tocam o texto: D-E05 (quais profissões; até decidir, **só médicos**), D-E07 (canal do
  lembrete e da automação: **nenhum decidido**, nem WhatsApp), D-E12 (preço), D-E13 (LGPD, papéis), D-E14
  (entrada de clínicas; proposta "pela plataforma no início").

⌗ Por isso a página inteira fala no **futuro de projeto** ("o S-FrontDesk está sendo construído para…"), e o
selo "pré-lançamento" fica visível no topo. **Regra 1:** o roadmap só vira texto com o **aval do dono**
(pendência P3).

## Afirmações sobre o produto

| # | Frase (como iria ao ar) | Tipo | Fonte | Estado |
|---|---|---|---|---|
| A1 | "O S-FrontDesk está em desenvolvimento; ainda não há clínica usando." | estado | os três perfis (nenhuma fatia) | ok |
| A2 | "Organiza a agenda da clínica: profissionais, grade de horários e bloqueios (férias, feriados)." | recurso futuro | API F1–F2, gestão F1–F2 (propostos) | ok: aval do dono (P3, 2026-09-23), dito no futuro |
| A3 | "A recepção vê a agenda do dia e agenda por telefone, confirma, remarca, cancela e marca presença ou falta." | recurso futuro | gestão F3, API F3 (propostos) | ok: aval do dono (P3, 2026-09-23), dito no futuro |
| A4 | "O paciente escolhe o horário e agenda pelo aplicativo; depois pode remarcar ou cancelar." | recurso futuro | app F2–F4, API F3 (propostos) | ok: aval do dono (P3, 2026-09-23), dito no futuro |
| A5 | "Lembrete ao paciente antes da consulta." (sem dizer o canal) | recurso futuro | API/app/gestão F5 (propostos); **canal em aberto (D-E07)** | ok (P3). O canal **não** entra |
| A6 | "Dois pacientes no mesmo horário do mesmo profissional: o sistema não deixa." | compromisso de projeto | **E-07** (regra escrita) | ok, marcado como compromisso de projeto |
| A7 | "Cada clínica só vê os próprios dados." | compromisso de projeto | **E-03** | ok, marcado como compromisso de projeto |
| A8 | "O agendamento guarda só o necessário: nada de motivo da consulta." | compromisso de projeto | **E-04** + D-E06 (proposta: não entra no núcleo) | ok, marcado como compromisso. **Não** usar "LGPD" como rótulo |
| A9 | "O lembrete não diz o nome do profissional nem a especialidade." | compromisso de projeto | **E-04** | ok, marcado como compromisso |
| A10 | "Horários sempre no fuso da clínica." | compromisso de projeto | **E-06** | ok (entra só se couber; é detalhe) |
| A11 | "Automação de atendimento (conversa com o paciente e agenda)." | recurso futuro distante | API F6 · gestão F6; canal em aberto (D-E07) | **fora da página** (P4, 2026-09-23) |
| A12 | "Para clínicas médicas / consultórios." | público | **D-E05**: só médicos até decidir | ok: "clínicas e consultórios médicos" (P5) |
| A13 | "Clínica piloto: [o que ela recebe e o que dá em troca]." | oferta | nenhuma | ok: sem custo, prazo ou preço anunciados; "as condições são combinadas na conversa" (P6) |
| A14 | "Como começar: 1. conversa pelo WhatsApp → 2. … → 3. …" | processo | D-E14 (proposta: "pela plataforma") | ok: os 3 passos propostos (P6) |
| A15 | Contato: WhatsApp comercial `+55…` | contato | — | **provisório (P2)**: número **fictício** `+5571999999999`, por decisão do dono em 2026-09-23. **Trocar antes de `publicar: true`**; a checagem daqui avisa |
| A16 | "Um produto da Fábrica de Apps e Soluções." | autoria | `site.config.json` de lá (empresa do índice) | ok (P7): rodapé; sem `og:site_name` |

## Redação proposta (não é fato; pode mudar sem fonte)

- As dores, na voz da clínica: o telefone que não para enquanto há paciente no balcão; o horário vago que
  ninguém avisou; a agenda no caderno, na planilha ou no WhatsApp pessoal da recepcionista; a remarcação que
  vira três ligações.
- A resposta de cada dor **sem número e sem promessa de resultado**: "o paciente pode marcar sem ligar", e
  **não** "menos ligações"; "o paciente recebe lembrete", e **não** "menos faltas".
- A chamada, com o mesmo nome em toda a página: **"Quero ser clínica piloto"** (proposta).
- A demo: "Protótipo das telas, com dados fictícios. O produto final pode mudar."

## Pendências para o dono (responder de uma vez, no gate 1)

**Respondidas em 2026-09-23** ("sigo suas recomendações"): P1 pasta `s-frontdesk` · P2 número **fictício** provisório
`+5571999999999` (única pendência aberta: o número real antes de publicar) · P3 núcleo do roadmap, no futuro, com selo
"pré-lançamento" · P4 automação fora · P5 clínicas e consultórios médicos · P6 três passos, sem prazo nem preço ·
P7 "Um produto da Fábrica de Apps e Soluções" no rodapé · P8 `negocio` comum, painel "Produtos dos clientes",
indexável quando aprovado · P9 área "Agenda e atendimento para clínicas", sem cidade.

## Fora da página

- Qualquer número ("reduz faltas em X%", "N clínicas") — não há medição nem cliente (regra 1).
- Depoimento, logotipo de clínica, "clientes": não há clientes.
- "LGPD", "certificado", "seguro", "100%": selo ou rótulo sem D-E13 (regra 2); o piso de lá também reprova "100%".
- "WhatsApp" como canal de **lembrete** ou de **automação**: D-E07 aberta. O WhatsApp aparece **só** como o canal
  para falar com a equipe.
- Preço e planos: D-E12 aberta.
- Outras profissões (dentista, psicólogo…): D-E05.
- `og:site_name`: o formato de lá **não** o gera em página de cliente (ADR-007 de lá).

## Texto (publicidade-produto-landing; aprovado no gate 2, conferido no construído em `conferencia-publicidade.md`)

Regras de redação desta página: **futuro de projeto** em toda frase sobre o que o produto faz; nenhum número;
nenhum resultado ("menos faltas", "mais produtividade"); uma ideia por seção; a chamada é sempre
**"Quero ser clínica piloto"**. Entre colchetes, a afirmação do briefing que sustenta a frase.

**Selo (antes do `<h1>`):** Pré-lançamento · em desenvolvimento. Procuramos clínicas piloto. [A1]

**Abertura**
- Sobretítulo: Agenda e atendimento para clínicas e consultórios médicos [A12]
- `<h1>`: A agenda da clínica num lugar só: para a recepção e para o paciente.
- Apoio: O S-FrontDesk está sendo construído para organizar o dia da recepção e deixar o paciente marcar o próprio
  horário. Veja o protótipo e ajude a construí-lo como clínica piloto. [A1, A3, A4]
- Ações: **Quero ser clínica piloto** (WhatsApp) · Ver a demonstração (âncora)

**Um dia na recepção** (as dores, cada uma num horário do dia)
- 07h52 — *O telefone toca antes de a porta abrir.* → Com o S-FrontDesk, o paciente vai poder escolher um horário
  livre e marcar pelo aplicativo, sem ligar. [A4]
- 09h10 — *Paciente no balcão e outro na linha.* → A recepção vai ver o dia inteiro numa tela e agendar por telefone
  em poucos passos, com os horários livres de cada profissional à vista. [A3]
- 11h30 — *O horário das 11h ficou vazio, e ninguém avisou.* → O paciente vai receber um lembrete antes da consulta e
  poder confirmar, remarcar ou cancelar pelo aplicativo; o horário cancelado volta para a agenda. [A4, A5]
- 14h00 — *A agenda está no caderno, na planilha e no celular da recepção.* → Profissionais, grade de horários e
  bloqueios (férias, feriados) num lugar só. [A2]
- 17h45 — *Dois pacientes marcados para o mesmo horário.* → O S-FrontDesk está sendo feito para não deixar: um
  horário, um paciente. É regra do projeto. [A6]
- Nota da seção: Tudo nesta página está em desenvolvimento. É o que estamos construindo, não uma promessa de resultado.

**Demonstração** — `<h2>` Veja como vai funcionar
- Aviso fixo na moldura: **Demonstração com dados fictícios.** Protótipo das telas: o produto final pode mudar.
- Abas: **Como a recepção vê** · **Como o paciente vê** (roteiro em `roteiro.md`)

**Compromissos de projeto** — `<h2>` Regras que o S-FrontDesk segue desde o projeto
- Cada clínica só vê os próprios dados. [A7]
- O agendamento não pede o motivo da consulta. [A8]
- O lembrete não diz o nome do profissional nem a especialidade: "Você tem uma consulta amanhã às 9h na Clínica
  Exemplo" é o máximo que ele mostra. [A9]
- Horários sempre no fuso da clínica. [A10]
- Um horário, um paciente. [A6]
- Rodapé da seção: São regras de projeto de um produto em desenvolvimento, não certificações.

**Como começar** — `<h2>` Como ser clínica piloto [A14]
1. **Chame a equipe no WhatsApp.** Conte como é a agenda da sua clínica hoje.
2. **Configuramos juntos.** Profissionais, horários e bloqueios da sua clínica, com vocês.
3. **A recepção usa e conta o que falta.** Vocês usam no dia a dia; nós ajustamos.
- As condições do piloto são combinadas na conversa. [A13]

**Perguntas frequentes** (`<details>`)
- *O S-FrontDesk já está pronto?* Ainda não. Está em desenvolvimento, e a demonstração desta página é um protótipo
  com dados fictícios. [A1]
- *Para quais clínicas?* Clínicas e consultórios médicos. Outras profissões seguem regras próprias de cada
  conselho e ainda não estão no escopo. [A12]
- *O paciente precisa instalar alguma coisa?* Para marcar sozinho, vai usar o aplicativo do S-FrontDesk. Quem
  preferir continua marcando por telefone ou no balcão, com a recepção. [A3, A4]
- *Quanto custa?* O preço ainda não foi definido. [D-E12]
- *E os dados dos pacientes?* O projeto segue as regras acima desde o começo. O contrato e a política de
  privacidade do produto serão definidos antes do primeiro paciente real. [A7–A9, D-E13]
- *O que a clínica piloto faz?* Usa o S-FrontDesk na rotina e conta o que falta. As condições são combinadas na
  conversa. [A13]
- *Esta página coleta os meus dados?* Não. Não tem formulário nem cookies; o contato é pelo WhatsApp.

**Fecho** — `<h2>` Quer ajudar a construir a agenda da sua clínica? → **Quero ser clínica piloto**

**Rodapé**
- S-FrontDesk: em desenvolvimento. Um produto da Fábrica de Apps e Soluções. [A16]
- A demonstração usa dados fictícios: clínica, profissionais (CRM e RQE 000000), pacientes e telefones são inventados.
- Esta página não usa cookies nem coleta dados. O contato acontece pelo WhatsApp, nos termos desse serviço.
- © 2026 Fábrica de Apps e Soluções.

**Mensagem pré-preenchida do WhatsApp:** "Olá! Vi a página do S-FrontDesk e quero saber como ser clínica piloto."
(sem dado de saúde — E-04)


## Publicação (2026-09-23, repositório ivanclay/landing)

O dono decidiu publicar sem número real: o WhatsApp passou a ser `+5520999999999`, com o **DDD 20, que não é atribuído no Brasil** (Anatel), para que o número não possa ter dono. O botão não leva a ninguém até o número real entrar. Aprovação do dono: `revisao.aprovadoPeloClienteEm = 2026-09-23`, `publicar: true`. A15 continua **provisório** até o número real.
