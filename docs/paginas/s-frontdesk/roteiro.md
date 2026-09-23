# Roteiro da demonstração: S-FrontDesk (`s-frontdesk`)

- **Data:** 2026-09-23 · **Estado:** aprovado no gate 2 e construído · **D-L03:** as duas visões, em abas (decidido no gate 1)
- **Kits imitados: nenhum, porque ainda não existem.** `../sfrontdesk-gestao/docs/mockups/html/` e
  `../sfrontdesk-app/docs/mockups/html/` **não existem** (conferido em 2026-09-23; F0 dos dois não aberta). **Esta demo é o protótipo das
  telas.** Quando os kits nascerem, eles **partem desta demo** (as telas abaixo viram `gestao-agenda-dia` e
  `app-agendar-*`), ou a demo é atualizada para bater com eles. A partir daí, qualquer diferença entre kit e demo é
  pendência no backlog (regra 1).
- **Versão desta demo:** `prototipo-1` (2026-09-23).

## O que a demo prova

- **Como a recepção vê:** *"a recepção vê o dia inteiro e agenda por telefone em poucos passos, sem conseguir
  marcar dois pacientes no mesmo horário."*
- **Como o paciente vê:** *"o paciente escolhe um horário livre e agenda sozinho, e a consulta aparece na agenda da
  recepção."*

## Telas e passos

### Aba 1 — Como a recepção vê (futuro gestão F3: agenda do dia)

| # | Tela | O que muda |
|---|---|---|
| R1 | **Agenda do dia**: data de hoje no fuso da clínica exemplo; duas colunas de profissionais; linhas de 30 min das 08h00 às 12h00 | Estados visíveis por **texto e forma**, não só por cor: `Agendado`, `Confirmado`, `Compareceu`, `Faltou`, `Livre`, `Bloqueio` |
| R2 | Toque num horário **Livre** → painel **Agendar por telefone**: serviço (Consulta 30 min · Retorno 30 min), paciente escolhido numa **lista fictícia** (sem campo de digitação — regra 5) | O botão "Agendar" só habilita com serviço e paciente escolhidos |
| R3 | **Agendar** → o horário vira `Agendado`, canal **Telefone**, e recebe o marca-texto | `aria-live` anuncia "Consulta agendada às 09h30 com Dra. Helena Exemplo" |
| R4 | Toque num horário ocupado → ações **Confirmar · Chegou · Faltou · Cancelar** | Cancelar devolve o horário para `Livre` |
| R5 | Tentativa de agendar em horário ocupado | Não há como: horário ocupado não oferece "Agendar" e diz **"Horário ocupado"** (E-07) |

### Aba 2 — Como o paciente vê (futuro app F2–F4)

Moldura de celular **reta**, do mesmo papel da página, sem sombra flutuante.

| # | Tela | O que muda |
|---|---|---|
| P1 | **Serviço**: Consulta · Retorno | — |
| P2 | **Profissional**: cartões no formato do CFM (E-10) | "Dra. Helena Exemplo · Médica · CRM-BA 000000 · Clínica médica · RQE 000000" |
| P3 | **Dia**: os próximos 5 dias úteis | — |
| P4 | **Horário**: só os livres daquele dia e profissional | Horário que a recepção acabou de ocupar **some** daqui (o estado é um só) |
| P5 | **Confirmar** → "Consulta agendada" com **Remarcar** e **Cancelar** | A consulta **aparece na aba da recepção**, canal **App** |
| P6 | **Prévia do lembrete** (tela bloqueada): "Você tem uma consulta amanhã às 9h na Clínica Exemplo." | Mostra o teto da E-04: sem profissional, sem especialidade |

Um botão **Recomeçar a demonstração** devolve tudo ao estado inicial. Recarregar a página faz o mesmo: não há
`localStorage` com dado.

## Dados fictícios (embutidos em `demo.js`, sem nenhum arquivo buscado pela rede)

- **Clínica:** "Clínica Exemplo (fictícia)" · fuso `America/Bahia`.
- **Profissionais:** Dra. Helena Exemplo, Médica, CRM-BA 000000, Clínica médica, RQE 000000 · Dr. Caio Exemplo,
  Médico, CRM-BA 000000, Cardiologia, RQE 000000.
- **Pacientes:** Paciente Exemplo 1 … Paciente Exemplo 6. Nenhum telefone é exibido; onde houver, `(71) 90000-000X`
  (intervalo reservado a exemplo, E-09).
- **Serviços:** Consulta (30 min) · Retorno (30 min). **Sem motivo da consulta** (E-04).
- **Horários relativos a hoje**, calculados no fuso da clínica, para a agenda nunca parecer velha.

## Sem JS (regra 9, a exceção da demo)

**Proposta:** no lugar de capturas em imagem, o HTML traz uma **"fotografia" em HTML** da agenda do dia: uma
tabela com os mesmos horários, estados e profissionais, além da lista dos passos de cada aba em texto. O JS a
substitui pela versão interativa. **Por quê:** é mais leve que as imagens (a pasta tem teto de 900 KB), legível no
zoom e no leitor de tela, e não pode ficar defasada da demo, porque sai dos mesmos dados. É o espírito da regra 9
("capturas estáticas das telas e o texto que explica o fluxo") com a captura feita em HTML. **Precisa do seu aval
no gate 2.**

## Acessibilidade

- Link **"Pular a demonstração"** antes da moldura.
- Abas no padrão ARIA (`tablist`/`tab`/`tabpanel`, setas entre abas); horários são `<button>`; o painel de
  agendamento recebe o foco ao abrir e o devolve ao horário ao fechar (Esc fecha).
- Estados com texto sempre visível; `aria-live="polite"` para o resultado de cada ação.

## O que a demo não mostra, e por quê

- Automação de atendimento e qualquer canal de mensagem (P4, D-E07).
- Canal do lembrete (D-E07): a prévia mostra o **texto**, não o aplicativo que o entrega.
- Preço, planos, relatórios de faltas: D-E12, gestão F7.
- Cadastro de paciente e pedidos LGPD (F4): fora do fluxo de agendar.

## Verificações (script daqui, sobre a cópia construída)

`demo.js` sem `fetch`, `XMLHttpRequest`, `WebSocket`, `EventSource`, `sendBeacon`, `import()` nem `localStorage`;
aviso "Demonstração com dados fictícios" dentro da moldura; fotografia sem JS presente; `CRM-` sempre seguido de
`000000`.

## Construído (2026-09-23)

- **Aval do gate 2:** roteiro e fotografia em HTML aprovados ("siga até o fim").
- Dados em `entrega/s-frontdesk/demo.js`, entre `// @dados:inicio` e `// @dados:fim`. A fotografia sem JS é gerada
  deles por `npm run entrega:foto`, e a checagem da entrega **reprova** se as duas divergirem.
- Relógio da demo fixo em **09h40** ("Na demonstração, são 09h40 no fuso da clínica"), para os estados passados
  (Compareceu, Faltou) fazerem sentido a qualquer hora. A linha do agora da abertura, essa sim, é a hora real.
- A aba do paciente oferece **hoje** e os 4 próximos dias úteis. Hoje só mostra horários depois das 09h40 e
  compartilha o estado com a recepção. Os outros dias têm ocupação fictícia fixa.
- "Faltou" só é oferecido para horários que já começaram.
- Conferido no navegador: 48 de 48 (`qa.md`).
