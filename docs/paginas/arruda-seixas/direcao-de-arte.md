# Direção de arte — Arruda Seixas Advogados (`arruda-seixas`) · "Rubrica"

## 1. Assunto, público, trabalho

- **Assunto:** advocacia empresarial de porte — consultivo e contencioso, dez áreas, três cidades.
- **Público:** diretor(a) jurídico(a), CFO, sócio de empresa. Lê rápido, desconfia de adjetivo, quer
  saber *"eles fazem isto?"* e *"com quem eu falo?"*.
- **Trabalho da página:** em uma rolagem, a pessoa acha a matéria dela e o sócio que responde por ela, e
  liga. A norma (Provimento 205/2021) pede sobriedade: a página convence por **precisão**, não por brilho.

## 2. Paleta — papel frio, grafite e o vermelho das rubricas

A matéria da advocacia é o texto. Nos códigos e nos livros de direito antigos, os títulos saíam em
vermelho — *rubrica* vem de *ruber*. A página usa o vermelho só onde o livro usaria: letras do índice,
marcas de seção, o sinal §.

| Token | Hex | Papel | Contraste medido |
|---|---|---|---|
| `--cor-fundo` | `#f2f2ee` | papel frio | — |
| `--cor-superficie` | `#e5e6e1` | faixas e blocos | — |
| `--cor-texto` | `#17191c` | grafite | 15,69:1 no fundo · 14,04:1 na superfície |
| `--cor-texto-suave` | `#51565d` | metadados, inscrições | 6,59:1 · 5,90:1 |
| `--cor-linha` | `#c7c9c3` | fios (decorativos) | — |
| `--cor-marca` | `#a3241b` | a rubrica | 6,62:1 no fundo · 5,92:1 na superfície (serve como texto) |
| `--cor-sobre-marca` | `#ffffff` | texto no botão | 7,43:1 |
| `--cor-foco` | `#1d4fbf` | foco (tinta azul, distinto da rubrica) | 6,40:1 · 5,73:1 |
| `--cor-noite` | `#16181b` | faixa do contato | — |
| `--cor-noite-texto` / `-suave` / `-rubrica` / `-foco` | `#ecebe6` / `#a7abb1` / `#f0907f` / `#9ab8ff` | texto e rubrica no escuro | 14,90 · 7,71 · 7,62 · 9,04 :1 |

Medido com a fórmula WCAG (luminância relativa) em 2026-09-23, script em linha no registro da sessão.

## 3. Tipos

- **Source Serif 4** (variável, eixo de peso) — títulos **e** texto. Uma família só, como num livro
  jurídico. Itálico para as notas de margem e para "Advogados" no título.
  ⌗ O plano pedia o eixo de tamanho óptico (`opsz`). Medido: 120 KB + 127 KB de fonte e **LCP 2,6 s**
  (orçamento 2,5 s, regra 11). Só com o eixo de peso: 51 KB + 52 KB e **LCP 1,8 s**. Ficou o de peso; o
  título perde um pouco do contraste de traço do corte *display*, e a página ganha o orçamento.
- **Public Sans** (variável) — só interface: botões, telefones, inscrições OAB, navegação. Sóbria, de
  origem institucional, com algarismos claros para número de inscrição e telefone.
- Nenhuma das páginas existentes usa estas famílias (Dr. Paulo: Instrument Serif + Hanken; Hub:
  Bricolage + DM Sans).

## 4. Layout — a página como um livro de direito bem composto

Coluna de texto com **margem de notas** à esquerda no desktop: o título de cada seção mora na margem,
em vermelho e itálico, como a nota marginal de um código; o corpo na coluna larga. No celular a margem
vira uma linha acima do corpo.

```
celular (360)                         desktop (1440)
┌────────────────────────┐            ┌──────────────────────────────────────────────────┐
│ aviso de demonstração  │            │ aviso de demonstração                            │
│ Arruda Seixas   [Ligar]│            │ Arruda Seixas      Áreas Índice Sócios …  [Ligar]│
│                        │            │                                                  │
│ Arruda                 │            │  §    Arruda                                     │
│ Seixas                 │            │       Seixas          Advocacia empresarial em   │
│ Advogados              │            │       Advogados       São Paulo, Rio e Brasília. │
│ Advocacia empresarial… │            │                       [Ligar SP] [WhatsApp]      │
│ [Ligar] [WhatsApp]     │            │ ──────────────────────────────────────────────── │
│ ────────────────────── │            │ Áreas     │ Societário e F&A ……  Helena Arruda   │
│ Áreas                  │            │ (margem)  │ Contencioso …        Otávio Seixas   │
│ Societário …           │            │ ──────────────────────────────────────────────── │
│ …                      │            │ Índice de │ A  Acordo de acionistas … Societário │
│ Índice de matérias     │            │ matérias  │    Arbitragem …… Contencioso         │
│ A · B · C (saltos)     │            │           │ B  …   (3 colunas, como um índice)   │
│ …                      │            │ ──────────────────────────────────────────────── │
└────────────────────────┘            └──────────────────────────────────────────────────┘
```

## 5. O gesto — o índice remissivo

Uma seção **"Índice de matérias"**: 47 assuntos em ordem alfabética, compostos como o índice
de um código — letra capitular em vermelho, entradas em corpo pequeno, a área à direita depois de uma
linha pontilhada, cada entrada um link para a área. É o que o público faz na cabeça ("recuperação
judicial — quem cuida?") posto no papel. Funciona sem JS (âncoras). Nenhuma outra página do repositório
tem esse gesto.

## 6. Movimento

Nenhum. Rolagem suave só por âncora, e `prefers-reduced-motion` a desliga (base.css).

## 7. Revisão contra o genérico

| Primeiro impulso | Por que é padrão | O que ficou |
|---|---|---|
| Azul-marinho e dourado | é a paleta de nove em cada dez escritórios; lê "banco" | grafite e papel com **uma** cor, a da rubrica, justificada pela história do livro jurídico |
| Balança, martelo, coluna grega, estante de livros de couro | clichê do tema, como o estetoscópio da clínica | nenhum ícone; o único símbolo é o **§**, que é tipografia, não ilustração |
| Foto de banco de "advogados de terno na sala de reunião" | regra 12 e cara de template | 1ª versão tipográfica; na 2ª (pedido do dono), **retratos individuais em P&B**, mesmo recorte de busto, e o prédio em P&B — nada de grupo posado, estátua da justiça ou sala com livros de couro |
| Números grandes ("200 advogados, 30 anos, 5.000 casos") | é o padrão do setor e, aqui, fere o Provimento 205/2021 (arts. 3º, IV, e 6º) | o porte aparece pela amplitude (áreas, cidades, sócios), sem número de vaidade |
| Cartões de "Nossas áreas" com ícone | kit SaaS | lista corrida com fio, o sócio responsável ao lado — a informação que o cliente quer |
| Rótulo em CAIXA ALTA espaçada acima de cada título | clichê de página gerada | título na margem, em itálico e na cor da rubrica |

⌗ Cubra o nome: a página ainda é deste escritório? O índice remissivo em vermelho e a margem de notas
não aparecem em nenhuma das outras duas páginas, nem no padrão do setor.

## 8. Crítica do construído (2026-09-23, capturas em `capturas/`)

- **1ª versão, 1440 px:** nome e apoio empilhados numa coluna estreita; metade direita da primeira tela
  vazia — lia como *hero* de modelo. **Mudou:** apoio e contatos ao lado do nome, alinhados pela base, e
  um **sumário** das dez áreas (links) logo abaixo, em três colunas com o § da rubrica. A amplitude do
  escritório aparece sem rolar, sem nenhum número de vaidade.
- **360 px:** nome, apoio e os dois contatos na primeira tela; barra de contato fixa depois disso.
- Teste de Chanel: o § aparece em três lugares (margem da abertura, sumário, rodapé) — é a assinatura, e
  fica; nenhum outro enfeite.

## 9. Segunda versão — imagens e rodapé (pedido do dono, 2026-09-23)

O dono aprovou a direção ("ficou bom, mas precisa melhorar") e pediu: imagens (abertura e sócios, "de forma
sofisticada") e um rodapé que não pareça "um montão de texto jogado à toa".

- **Imagens de banco** (Pexels), permitidas só porque é demonstração (ADR-004), com a legenda "Imagem
  ilustrativa" num canto da foto, sobre fundo sólido. Créditos e recortes em `creditos-imagens.md`.
- **Preto e branco em tudo.** Dez fotógrafos diferentes só viram um escritório com a mesma luz; o P&B
  também deixa o vermelho da rubrica como a única cor da página, o que mantém o plano.
- **Abertura:** o prédio de lajes escalonadas em pé ao lado do nome (4:5); no celular, faixa 3:2 depois
  dos contatos, para o nome e o botão continuarem na primeira tela.
- **Sócios:** grade de retratos 4:5 — 5 por linha no desktop (a grade sai da coluna de texto e toma a folha
  inteira), 3 no tablet, 2 no celular; nome, cargo, área (link) e inscrição em linhas próprias.
- **Rodapé:** marca à esquerda; três colunas com título em itálico vermelho sobre fio — *Registro na OAB*,
  *Sócios administradores*, *Escritórios* —; embaixo, uma linha legal curta. A identificação exigida pela OAB
  continua inteira (o `data-identificacao-oab` envolve as colunas), só que organizada.
- Descartado na escolha: pose de moda, símbolos de justiça, placa "Law Offices", fachada azul de vidro, e um
  retrato com relógio em primeiro plano (ostentação, Provimento 205/2021, art. 6º, parágrafo único).
