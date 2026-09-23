# Direção de arte: S-FrontDesk (`s-frontdesk`)

- **Data:** 2026-09-23 · **Estado:** aprovado no gate 2 e construído (crítica no §8)

## 1. Assunto, público, trabalho

- **Assunto:** agenda e atendimento para clínicas médicas, **em pré-lançamento**, sem nenhuma tela entregue.
- **Público:** dono ou gestor de clínica pequena ou média, e a recepção ("vou conseguir usar isso às 7h com a sala cheia?").
- **Trabalho da página:** fazer quem lê **usar a demonstração** e **chamar no WhatsApp para ser clínica piloto**.

## 2. A ideia: a página é um dia da clínica

A matéria do produto é **tempo**: o compasso de 30 minutos da agenda, o dia da recepção entre 7h e 19h. Esse
compasso vira **princípio de composição**, não enfeite:

- **A régua do dia.** No desktop, uma coluna estreita à esquerda com os horários (07h00 … 19h00) e os fios finos
  de meia hora, como a margem de uma agenda. Cada seção se ancora num horário. No celular, a régua vira o
  **horário em cima de cada bloco**, em algarismos tabulares.
- **As dores são horários.** "07h52: o telefone toca antes de a porta abrir." A seção de dores é literalmente um
  trecho de agenda: horário à esquerda, dor em destaque, resposta embaixo.
- **O gesto memorável: a linha do agora.** A linha vermelha fina que toda agenda digital usa para marcar a hora
  atual atravessa a **abertura**, com a etiqueta do horário **real** no fuso da clínica (`America/Bahia`,
  E-06), calculado pelo JS. Sem JS, ela fica parada às 08h00, com a etiqueta "08h00". É a **única coisa vermelha
  da página**; todo o resto é tinta e papel.

## 3. Paleta: papel de agenda, caneta azul e marca-texto

Âncora: a **agenda de papel** que o S-FrontDesk quer substituir. Papel levemente frio, a tinta da caneta azul da
recepção e o amarelo do marca-texto que ela passa no horário confirmado. Não é o azul-hospital (claro, ciano,
com branco e verde-água): é o azul **escuro e saturado** da esferográfica.

| Token (`tema.css`) | Cor | Papel |
|---|---|---|
| `--cor-fundo` | `#f5f5ef` | papel |
| `--cor-superficie` | `#e9e9e0` | folha de baixo (painéis, demo) |
| `--cor-texto` | `#151a2e` | tinta quase preta, puxada para o azul |
| `--cor-texto-suave` | `#4a5068` | texto secundário, horários da régua |
| `--cor-linha` | `#c9cabd` | pauta (decorativa) |
| `--cor-marca` | `#2438b0` | caneta azul: **botão de contato**, links |
| `--cor-sobre-marca` | `#ffffff` | texto no botão |
| `--cor-foco` | `#c2410c` | anel de foco |
| `--cor-marcatexto` | `#ffe45e` | **só fundo**: horário marcado na demo, grifo de uma palavra por seção, no máximo |
| `--cor-agora` | `#d11f3a` | a linha do agora; nada mais |
| `--cor-noite` | `#151a2e` | a faixa do fecho (a agenda fechada: fim do dia) |

**Contraste medido** (WCAG, fórmula de luminância relativa, 2026-09-23):

| Par | Razão | Mínimo |
|---|---|---|
| texto / fundo | 15,74 | 4,5 |
| texto / superfície | 14,11 | 4,5 |
| texto suave / fundo | 7,27 | 4,5 |
| texto suave / superfície | 6,52 | 4,5 |
| branco / marca (botão) | 9,26 | 4,5 |
| marca / fundo (link) | 8,46 | 4,5 |
| texto / marca-texto | 13,54 | 4,5 |
| agora / fundo (etiqueta do horário) | 4,84 | 4,5 |
| foco / fundo | 4,73 | 3 |
| foco / superfície | 4,24 | 3 |
| papel / noite (fecho) | 15,74 | 4,5 |
| pauta / fundo | 1,52 | decorativa: não delimita nenhum controle |

⌗ **Tokens da marca:** a marca do S-FrontDesk ainda não existe (`../sfrontdesk-api/docs/ecossistema/marca/` diz "a
preencher na F0"). Esta paleta é a **proposta**. Aprovada, ela vai por PR para a `tokens-marca.css` do ecossistema,
e o `tema.css` desta pasta passa a ser **derivado** de lá.

## 4. Tipos: uma família, dois registros

**Instrument Sans** (variável, eixos de peso e **largura**, OFL), local, **dentro da pasta** (`fontes/`, cerca de 57 KB),
porque não existe em `../assets/fontes/`, e adicioná-la lá seria mudar o repositório de lá.
- **Títulos e horários:** largura estreita (`wdth` 75–85), peso 600–700. É o registro das colunas de agenda:
  compacto, numérico, preciso.
- **Texto:** largura normal, peso 400–500.
- **Horários:** `font-variant-numeric: tabular-nums`, para os algarismos alinharem na régua como numa grade.
- Por que não as famílias de lá: Bricolage e DM Sans são da hub; Instrument Serif e Hanken, do médico; Source
  Serif e Public Sans, do escritório; Montserrat e Atkinson, do índice. Uma família nova com eixo de largura
  dá dois registros com um arquivo só.
- Acentos (`Ã`, `Ç`, `É`) conferidos no peso do título na construção, **antes** de fechar.

## 5. Abertura em ASCII

**Celular (360 px), sem rolar:**
```
┌────────────────────────────────────┐
│ Pré-lançamento · em desenvolvimento│ ← selo (papel/tinta, fio embaixo)
├────────────────────────────────────┤
│ S-FrontDesk             [piloto ▸] │ ← marca em texto + botão compacto
│                                    │
│ AGENDA E ATENDIMENTO PARA CLÍNICAS │ ← sobretítulo, estreito, suave
│ E CONSULTÓRIOS MÉDICOS             │
│                                    │
│ A agenda da clínica                │ ← h1 estreito, 2,6rem
│ num lugar só: para a               │
│ recepção e para                    │
│ o paciente.                        │
│ ──────────────────────── 09h41 ●── │ ← A LINHA DO AGORA atravessa o h1
│ O S-FrontDesk está sendo           │
│ construído para organizar…         │
│ [   Quero ser clínica piloto    ]  │ ← marca, largura total
│  Ver a demonstração ↓              │
└────────────────────────────────────┘
```

**Desktop (1440 px):**
```
┌──────┬───────────────────────────────────────────────────────────────┐
│      │ Pré-lançamento · em desenvolvimento. Procuramos clínicas piloto│
├──────┼───────────────────────────────────────────────────────────────┤
│      │ S-FrontDesk          Um dia · Demonstração · Começar · Perguntas [Quero ser clínica piloto] │
│ 07h  │───────────────────────────────────────────────────────────────│
│ ·    │ AGENDA E ATENDIMENTO PARA CLÍNICAS…      ┌── amostra da agenda ──┐│
│ 08h  │                                          │ 08h00  Consulta ▒▒▒▒  ││
│ ·    │ A agenda da clínica                      │ 08h30  Livre          ││
│ 09h ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ 09h41 ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┥│ ← linha do agora
│ ·    │ num lugar só: para a recepção            │ 10h00  Retorno        ││
│ 10h  │ e para o paciente.                       │ 10h30  Bloqueio       ││
│ ·    │ O S-FrontDesk está sendo construído…     └───────────────────────┘│
│ 11h  │ [Quero ser clínica piloto]  Ver a demonstração                    │
└──────┴───────────────────────────────────────────────────────────────┘
  régua do dia (horários tabulares, fios de meia hora) continua pela página
```
A amostra da agenda na abertura é **HTML**, não imagem: tipos de atendimento e estados, **sem nome de pessoa**;
é decorativa (`aria-hidden`), porque o `<h1>` e o apoio já dizem tudo. O LCP é o texto do `<h1>`.

## 6. Movimento

Um só: na demonstração, o horário recém-agendado recebe o **marca-texto** num traço de 300 ms. Com
`prefers-reduced-motion`, ele aparece já pintado. A linha do agora **não** se mexe: o JS a posiciona uma vez e a
atualiza a cada minuto, sem animação.

## 7. Revisão contra o genérico

| O primeiro rascunho tinha | Por que é padrão | O que ficou |
|---|---|---|
| Três cartões de "benefícios" com ícone | kit SaaS | As dores como **horários de um dia**: um trecho de agenda, sem cartão |
| Celular flutuando inclinado com a tela do app | clichê de app | A visão do paciente dentro da demo, **reta**, na mesma moldura da recepção |
| Azul-claro com verde-água "de saúde" | azul-hospital | Caneta azul-escura, papel e marca-texto: a agenda de papel |
| Rótulo em caixa alta acima de **todo** título | tique de página gerada | Caixa alta só no sobretítulo da abertura; nas seções, **o horário** faz esse papel |
| Números 01/02/03 enfeitando seções | falsa sequência | Números só em "Como ser clínica piloto", que **é** uma sequência (`<ol>`) |
| Faixa de "clínicas que confiam" | logotipo sem cliente | Nada: não há clientes (regra 1) |
| Seções entrando com fade-e-sobe | movimento genérico | Nenhuma animação de entrada |

**Teste do logotipo coberto:** a régua do dia e a linha do agora só fazem sentido para um produto de **agenda**, e a
paleta de caneta e marca-texto só faz sentido para quem vive a **agenda de papel**. Não serve a outro SaaS.

## 8. Crítica do construído (2026-09-23, capturas em `capturas/`)

- **Aprovado pelo dono no gate 2** ("siga até o fim"), inclusive a fotografia em HTML no lugar das capturas.
- **A abertura diz o que é, para quem e o próximo passo sem rolar** a 360 × 640 (conferido por medida, não a olho).
- **Teste do logotipo coberto:** a régua e a linha do agora continuam dizendo "agenda". Passa.
- **Mudou em relação ao plano:**
  - A régua do dia aparece **na abertura** (na margem, alinhada à linha do agora) e **em "Um dia na recepção"**
    (a coluna de horários), e não como um fio contínuo pela página inteira. Pela página toda, virava ruído atrás
    da demo e das perguntas.
  - As pontas da régua ganharam máscara em degradê, em vez de cortar seco no fim da abertura.
  - "Faltou" deixou de usar o vermelho, que ficou **exclusivo** da linha do agora: agora é borda dupla em tinta e
    nome riscado.
  - A aba do paciente ganhou a nota "Experimente…" ao lado do celular, que sozinho numa faixa larga parecia vazio.
  - O selo, no celular, mostra só "Pré-lançamento · em desenvolvimento." (o convite ao piloto está no botão logo
    abaixo), para caber numa linha e trazer o botão para a primeira tela.
- **Teste de Chanel:** a amostra da agenda na abertura só aparece a partir de 60rem. No celular, ela empurraria o
  contato para baixo da dobra.
