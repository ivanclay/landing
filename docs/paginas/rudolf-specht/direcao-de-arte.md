# Direção de arte — `rudolf-specht` · três opções para o cliente escolher

- Data: 2026-09-28 · Coordenador (Opus). Cada opção é construída por um agente, nos próprios arquivos
  (`opcao-N.html`, `opcao-N-tema.css`, `opcao-N.css`)
- O cliente **não disse** cores nem gosto (pergunta no questionário). Por isso as três direções são
  **bem diferentes entre si**: uma clara editorial, uma escura em tela dividida e uma clara em cartões.
  Assim a escolha diz o gosto dele (memória do dono: comparar páginas prontas decide rápido)
- Mesmo texto nas três (`briefing.md › Texto`), mesma foto, mesmos contatos, **ícone em todo botão de
  contato**, inclusive na barra fixa do celular

## O que se sabe e vale para as três

- **A foto:** um retrato real, de terno azul-cobalto, camisa branca e gravata marinho, no escritório, com
  luz quente de janela à esquerda e mesa de madeira. É a única imagem: ela manda na paleta, e nenhuma
  opção pode brigar com o azul do terno.
- **O público** são consumidores, pacientes e trabalhadores, pessoas que estão num problema (banco, plano
  de saúde, demissão). O tom é **sóbrio e próximo**, sem a frieza do "grande escritório". A
  `arruda-seixas` é o contrário (corporativo, dez sócios), e nenhuma opção se parece com ela.
- **Clichês proibidos:** balança, martelo, coluna grega, pilha de livros, estátua da Justiça, dourado de
  "ostentação" (Provimento 205/2021, art. 6º, parágrafo único), azul-marinho com dourado genérico de
  escritório, textura de mármore, e o símbolo ou as cores da OAB.
- **O que é distinto aqui:** o título já nomeia **três públicos**. Cada opção faz disso o seu gesto, de um
  jeito diferente.
- **Diferenças com o repositório:** não repetir o vermelho sobre papel da `arruda-seixas`, o azul-névoa da
  `karoline-melo`, o café e salmão da `emilia-kuwano` nem o verde-garrafa do `dr-paulo-de-tarso`.

## Opção 1 — "Tinta" · clara, editorial

- **Paleta:** papel `#fbfaf6` · superfície `#f1eee6` · tinta `#15203a` (texto, contraste 15:1) · texto
  suave `#4a5266` · linha `#d9d4c7` · acento ocre `#9a6414` (numerais e texto grande; 4,78:1 no papel, **4,31:1 na superfície**: ali, `#855510`, 5,48:1)
  · foco `#1f4fd1`
- **Tipos:** Source Serif 4 nos títulos (grandes, peso 600, entrelinha justa) · Public Sans no texto
- **Abertura:** grade assimétrica. À esquerda, o título em três versos, e cada público num verso
  próprio com o numeral ocre (`01 consumidores`, `02 pacientes`, `03 trabalhadores`). À direita, o
  retrato em **preto e branco** (filtro no CSS), recorte alto, com uma legenda fina embaixo: nome e
  OAB/BA 77.991
- **Áreas:** índice editorial. Cada área é uma linha com o nome em serifa e o texto em duas colunas no
  desktop, separadas por filete. Nada de cartões
- **Como funciona:** 4 passos numa régua horizontal com números em ocre (vertical no celular)
- **Gesto:** os três públicos em versos numerados na abertura, retomados nas áreas
- **Revisto contra o genérico:** o P&B no retrato poderia ler "frio". A legenda e o ocre aquecem, e o P&B
  foi o que o dono aprovou na advocacia

## Opção 2 — "Noturno" · escura, tela dividida

- **Paleta:** azul-noite `#0d1624` · superfície `#152136` · texto marfim `#f2ede3` · suave `#b9c0cc` ·
  linha `#26344d` · acento areia `#e4c79a` (botão e numerais; texto escuro `#0d1624` sobre ele) · foco
  `#f2ede3`
- **Tipos:** Instrument Serif nos títulos (grande, itálico só nos três públicos) · Hanken Grotesk no texto
- **Abertura e página:** no desktop (≥ 60rem), **tela dividida**. O retrato **colorido** ocupa a metade
  esquerda, fixo (`position: sticky`, altura da janela, `object-fit: cover` com foco no rosto), e o
  conteúdo rola na metade direita. No celular, o retrato abre a página em 70vh, com degradê para o
  azul-noite embaixo e o nome sobre ele
- **Áreas:** lista numerada com filetes finos, o nome em serifa grande e o texto logo abaixo
- **Como funciona:** 4 passos em coluna, com o número em areia
- **Gesto:** a foto quente, sempre presente ao lado do texto frio e escuro. O cliente fala com uma pessoa
  o tempo todo
- **Revisto contra o genérico:** escuro com areia pode escorregar para o "marinho e dourado". Por isso a
  areia é pálida e fosca, sem dourado metálico, gradiente ou brilho. É a família de layout que o dono
  escolheu na `emilia-kuwano`, com outra paleta

## Opção 3 — "Trilha" · clara, cartões

- **Paleta:** fundo `#eef2f0` (branco-sálvia) · superfície `#ffffff` · texto `#18211f` · suave
  `#4b5854` · linha `#cfd9d5` · marca petróleo `#0f5560` (botão, títulos de cartão; contraste 7,9:1) ·
  destaque claro `#dcebe8` (fundo das etiquetas) · foco `#0f5560`
- **Tipos:** Bricolage Grotesque nos títulos · Atkinson Hyperlegible Next no texto (a mais legível:
  público de todas as idades)
- **Abertura:** o título, com os três públicos como **três etiquetas** (pílulas petróleo claro) logo
  abaixo, e o retrato colorido num cartão de cantos arredondados à direita, com a identificação num
  selo branco sobreposto no canto inferior
- **Áreas:** cinco cartões brancos em grade (1, 2 ou 3 colunas). Em cada um, as **situações** do texto
  viram etiquetas curtas ("empréstimos não reconhecidos", "negativas de exames", "horas extras"…). Quem
  procura acha o próprio problema de relance. As etiquetas são o texto do cliente em pedaços; nada novo
- **Como funciona:** a **trilha**, 4 passos ligados por uma linha contínua (vertical no celular,
  horizontal no desktop), com círculos numerados
- **Gesto:** as etiquetas de situações e a trilha, que fazem da página um guia prático
- **Revisto contra o genérico:** cartões e pílulas são o layout mais comum de template. O que o salva é
  o conteúdo das etiquetas (as situações reais dele) e a trilha, que é o método dele. O petróleo foi
  escolhido para não repetir o azul do terno e fazer par com ele

## Critérios de aceite (as três)

- Regra 11 no construído: contraste ≥ 4,5:1, alvo ≥ 44 px, foco visível, 320 a 1920 px sem rolagem
  lateral, `prefers-reduced-motion`
- Sem JS obrigatório. O menu, se houver, funciona sem JS
- `data-identificacao-oab` no rodapé com o texto do briefing; nenhum `style=`, `<style>` ou `on…=`
- Barra de contato fixa no celular (WhatsApp e e-mail, com ícones)
