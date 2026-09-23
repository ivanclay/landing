# Direção de arte — Dr. Paulo de Tarso Lopes Pontes (`dr-paulo-de-tarso`) · DEMONSTRAÇÃO

- Data: 2026-09-22 · Estado: aplicado (o dono delegou os gates: "siga até o final, no final eu critico")

## 1. Assunto, público, trabalho

- **Assunto:** cardiologia com foco em ritmo (eletrofisiologia, marca-passo, ergometria) — a matéria é
  **tempo e cadência**.
- **Público:** adultos de 40 a 75 anos, muitos executivos com plano premium. Querem clareza, rapidez,
  seriedade. Leem no celular entre reuniões; decidem por "meu plano vale onde?".
- **Trabalho da página:** o paciente certo descobre **onde** pode ser atendido **pelo plano dele** e marca
  pelo WhatsApp com a mensagem já dizendo local e plano.

## 2. Paleta — "calcário e verde-garrafa"

Âncora: o Jardim Paulista — calçada de pedra portuguesa, copa de árvore, fachada de pedra clara dos
prédios dos anos 60. Nada de azul-hospital nem verde-água: o verde aqui é o **escuro das copas**, quase
tinta.

| Token | Hex | Papel | Contraste medido |
|---|---|---|---|
| `--cor-fundo` | `#F2F0EB` | calcário — fundo da página | — |
| `--cor-superficie` | `#E7E4DC` | pedra — faixas e cartões | — |
| `--cor-texto` | `#15201D` | tinta verde-grafite | 14,68:1 no fundo · 13,16:1 na superfície |
| `--cor-texto-suave` | `#4B5752` | texto de apoio | 6,62:1 no fundo · 5,94:1 na superfície |
| `--cor-linha` | `#C8C3B7` | fios (decorativo, sem texto) | 1,54:1 — não carrega informação |
| `--cor-marca` | `#1D4A3D` | verde-garrafa — botão de contato | 8,78:1 no fundo |
| `--cor-sobre-marca` | `#F5F2EA` | texto do botão | 8,94:1 na marca |
| `--cor-foco` | `#A8651A` | âmbar — anel de foco | 4,06:1 no fundo · 3,64:1 na superfície · 3,60:1 na noite (≥ 3:1, WCAG 1.4.11) |
| `--cor-noite` | `#12211C` | faixa escura do seletor de planos | fundo sobre ela: 14,63:1 |
| `--cor-noite-suave` | `#A9B7B0` | texto de apoio na noite | 8,01:1 |
| `--cor-latao` | `#C9A45C` | latão — o marcador "atende pelo seu plano" na noite | 7,10:1 |

Medido com a fórmula de luminância relativa da WCAG 2.x (script em node, 2026-09-22).

## 3. Tipos

- **Título:** *Instrument Serif* 400 (Fontsource, local) — serifa editorial condensada, elegante sem ser
  ornamental; alto contraste só em corpo grande. Só tem 400: nunca em texto.
- **Texto:** *Hanken Grotesk* variável (wght) — grotesca calma, boa em tela pequena, números tabulares.
- Não usa Newsreader nem Atkinson (índice). Nenhuma outra página do repositório usa esta dupla.
- Escala do `base.css`; o nome do médico usa `--texto-vitrine`.

## 4. Layout

**Ideia:** a página é um *compasso* — uma grade de 12 colunas onde os blocos entram em tempos regulares
(texto sempre começando na coluna 1 ou na 5), com os títulos das seções numa **régua lateral** estreita no
desktop. O ritmo é da composição, não de um ícone.

Celular (360 px):
```
┌──────────────────────────────┐
│ Página de demonstração. …    │  aviso (faixa de pedra, texto pequeno, sempre visível)
├──────────────────────────────┤
│ Dr. Paulo de Tarso    [Whats]│
├──────────────────────────────┤
│ Cardiologia · São Paulo      │
│ Paulo de                     │  nome em Instrument Serif, vitrine
│ Tarso Lopes                  │
│ Pontes                       │
│ Atende adultos com palpita-  │
│ ção, arritmia, pressão alta… │
│ [Marcar pelo WhatsApp][Ligar]│
│ Médico · CRM-SP 000000 · …   │
│ ┌──────────────────────────┐ │
│ │        retrato           │ │  4:5, com legenda "Imagem ilustrativa"
│ └──────────────────────────┘ │
```
Desktop (1440 px):
```
┌─────────────────────────────────────────────────────────────┐
│ Página de demonstração. …                                    │
│ Dr. Paulo de Tarso   Antes de marcar  Planos  Locais  [Whats]│
├─────────────────────────────────────────────────────────────┤
│ Cardiologia · São Paulo              ┌───────────────────┐   │
│ Paulo de Tarso                       │                   │   │
│ Lopes Pontes                         │     retrato 4:5   │   │
│ Atende adultos com…                  │                   │   │
│ [Marcar pelo WhatsApp] [Ligar]       └───────────────────┘   │
│ Médico · CRM-SP 000000 · …           Imagem ilustrativa      │
├─────────────────────────────────────────────────────────────┤
│ faixa de marcas: 4 hospitais + 6 planos, em tipo, mesma grade│
```

## 5. O gesto — "o seu plano, o seu lugar"

A seção **Qual é o seu plano?** é uma faixa escura (noite) de largura total. No alto, os seis planos e
"Particular" como uma fileira de palavras em Instrument Serif grande (botões). Abaixo, os **cinco
locais** em tipografia monumental, um por linha. Ao escolher o plano, os locais onde ele não vale
**recuam** (opacidade e um fio riscado discreto) e os que valem ganham o marcador em latão "atende pelo
seu plano" — e uma frase responde por escrito (`aria-live`): *"Com Amil: consultório, Oswaldo Cruz e
HCor."* Cada linha que vale oferece "Marcar aqui pelo WhatsApp", com a mensagem já dizendo plano e local.

Sem JS, a mesma faixa mostra a **tabela** plano × local, legível, com rolagem própria no celular.

É a peça que resolve a dor nº 2 do médico e é a que o visitante lembra. Todo o resto é quieto.

## 6. Movimento

Só a transição do gesto (opacidade 200 ms ao trocar de plano). `prefers-reduced-motion` zera
(`base.css`). Nenhuma seção entra com fade.

## 7. Imagens

Banco de imagem de licença livre (exceção do ADR-004), tratadas juntas na otimização para conversar
entre si: leve dessaturação e sombras puxadas para o verde da paleta (tratamento registrado em
`creditos-imagens.md`). Retrato 4:5 recortado com intenção — nunca círculo de avatar. Toda imagem com a
legenda "Imagem ilustrativa". Nenhuma foto de hospital citado.

## 8. Revisão contra o genérico

| O primeiro rascunho tinha | Por que era padrão | O que ficou |
|---|---|---|
| Fundo creme + serifa + acento terracota | Clichê de página gerada | Calcário frio-neutro + verde-garrafa; a serifa só nos títulos, e condensada |
| Azul-marinho "confiança" | É o azul-hospital de terno | Verde das copas do Jardim Paulista |
| Linha de ECG no fundo da abertura | Proibido no pedido; é o ícone da cardiologia | O ritmo mora na grade (entradas nas colunas 1 e 5) e na cadência dos locais |
| Cards de "serviços" com ícone | Kit de clínica | Lista tipográfica: área com RQE → uma frase de paciente |
| Carrossel de logotipos de convênio | Clichê e marca sem autorização | Faixa de nomes em tipo, na grade, pronta para logo autorizado |
| Rótulo em caixa alta acima de cada título | Clichê de página gerada | Títulos sem sobretítulo; só a abertura tem "Cardiologia · São Paulo" |
| Setas → nos botões | Clichê | Botões com o verbo e o destino ("Marcar pelo WhatsApp") |

Teste da capa: cobrindo o nome, a página continua sendo *a do cardiologista do Jardim Paulista que
responde "meu plano vale onde?"* — nenhuma outra página do repositório tem o seletor como gesto.

## 9. Ajuste pedido pelo dono (2026-09-22)

- **"A foto do consultório está muito simples — ele atende nos melhores hospitais de São Paulo."** A sala clara de madeira de pinus saiu. Entrou uma sala em andar alto, madeira escura, latão e cimento queimado, com a cidade ao fim da tarde (Unsplash, David Kristianto), com o mesmo tratamento de cor. Ela deixou de ser miniatura no canto e virou **faixa de ponta a ponta** (21:9 no desktop, 4:5 no celular) entre as credenciais e o seletor de planos — a transição do "quem é" para o "onde e por qual plano".
- **"A seção precisa melhorar."** "Áreas com título de especialista" virou **credenciais**: título grande com a explicação do RQE ao lado (e como o paciente confere), quatro colunas com o RQE em destaque, o nome da área em Instrument Serif e, embaixo, o exame ou a consulta ligada a ela. As linhas se alinham entre colunas (subgrid). A lista separada de exames saiu — cada exame mora na área que o justifica.
- **Imagem social** no modelo do hub: painel verde-garrafa com nome, especialidade e "Página de demonstração · médico fictício", e o busto à direita.
