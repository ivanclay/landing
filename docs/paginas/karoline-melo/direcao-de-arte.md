# Direção de arte — `karoline-melo`

## Ponto de partida

Karoline Melo é **corretora de imóveis em Salvador** (CRECI 36.265 · CNAI 58.909) e se apresenta como
*"Consultora imobiliária"*. O texto dela não vende imóvel: vende **orientação antes da escolha**:
*"Primeiro, eu entendo você. Depois, encontramos as possibilidades."* A página tem de ler como a sala de
uma consultora de alto padrão, e não como um portal de anúncios.

**A foto manda na paleta.** O retrato de estúdio (perfil, sorrindo, olhando para a esquerda, fundo
cinza-névoa, vestido ameixa, brinco de flor em ouro escovado) já traz a identidade: ameixa, ouro fosco,
névoa. A outra foto (sentada na poltrona) **fica de fora**: o ring light e o tripé do celular aparecem no
quadro e passam por cima do braço dela, e não há recorte que os tire sem cortá-la (regra 14: dito aqui, não
escondido).

**Clichês recusados** (imobiliária e IA): chave, casinha, silhueta de prédio ou *skyline*, azul-marinho com
dourado brilhante, foto de banco de sala decorada, "família feliz na frente da casa", cartões com ícone
redondo em grade de três, degradê roxo, emoji do texto original (📈 👨‍👩‍👧 📲 📸) como ícone.

**Diferente das outras páginas:** verde-floresta (dr-paulo, hub), vermelho sobre cinza (arruda-seixas),
azul-cobalto (s-frontdesk), café escuro com salmão (emilia-kuwano). Nenhuma é clara com ameixa.

## Conceito: "a prancha da consultora"

Papel marfim, tipo de revista, e **fios finos de desenho técnico**: cotas, linhas de chamada e
numeração de prancha, que lembram uma planta de arquitetura **sem desenhar uma casa**. O gesto é a
**linha de cota**: um fio ouro com dois traços nas pontas que "mede" os títulos de seção e liga as etapas do
atendimento como se fossem a legenda de uma planta.

## Paleta (tokens em `site/karoline-melo/tema.css`; contraste medido com a fórmula WCAG)

| Token | Cor | Papel | Contraste |
|---|---|---|---|
| `--cor-fundo` | `#F5F0E8` marfim | fundo | — |
| `--cor-superficie` | `#EAE0D3` areia | blocos, ficha da simulação | — |
| `--cor-texto` | `#2B2024` tinta | texto | 13,9:1 no marfim · 12,1:1 na areia |
| `--cor-texto-suave` | `#62534F` | apoio, legendas | 6,5:1 no marfim · 5,6:1 na areia |
| `--cor-marca` | `#5A2F3B` ameixa (o vestido) | botão principal, h1 em itálico, links | marfim sobre ela 9,7:1 |
| `--cor-noite` | `#3D1F28` ameixa escura | fechamento e rodapé | marfim 13,0:1 · areia 11,3:1 · ouro claro 6,4:1 |
| `--cor-ouro` | `#9A7440` ouro fosco (o brinco) | fios de cota, numerais **grandes** (≥ 24 px) | 3,7:1 no marfim: nunca texto pequeno |
| `--cor-ouro-claro` | `#C9A66B` | numerais e rubricas sobre a ameixa escura | 6,4:1 |
| `--cor-nevoa` | `#DDE2E3` (o fundo da foto) | moldura do retrato | tinta 12,0:1 |
| foco | contorno `--cor-marca` 2 px + afastamento; marfim no bloco escuro | foco visível | — |

## Tipos (locais, `npm run fontes`)

- **Newsreader** (variável, eixo óptico, com itálico): títulos. Serifa editorial de jornal, séria e
  calorosa; o itálico ameixa marca a palavra que importa ("*com segurança*", "*com informação*").
  Nenhuma página usa.
- **Jost** (variável): texto, botões e rubricas em versalete espaçado (a letra de prancha técnica, a
  herança Futura). Nenhuma página usa.

## Layout

```
DESKTOP ≥ 60rem
┌────────────────────────────────────────────────────────────────┐
│ KAROLINE MELO · consultora imobiliária      Atendimento  Simulação  Contato │
├──────────────────────────────────┬─────────────────────────────┤
│ CONSULTORA IMOBILIÁRIA · SALVADOR │                             │
│                                   │    ┌───────────────────┐    │
│ Encontre o seu imóvel             │    │  retrato (névoa)  │    │ ← ela olha
│ *com segurança.*                  │    │  moldura fina ouro│    │   para o texto
│                                   │    │  deslocada 12px   │    │
│ Seu próximo capítulo deve começar │    └───────────────────┘    │
│ com a escolha certa.              │  ├── PRANCHA 01 · KM ──┤    │ ← cota
│ [◎ Quero falar com Karoline] [ig] │                             │
│ Karoline Melo · Corretora de Imóveis · CRECI-BA 36.265 · CNAI 58.909 │
├──────────────────────────────────┴─────────────────────────────┤
│ 01 ├──── O imóvel certo começa com uma boa orientação ────┤     │
│   Talvez você já…  / Talvez ainda… / Ou talvez…  (3 linhas grandes, recuo escalonado)
│   Meu trabalho é…            “Conhecimento e planejamento…” (citação itálica) │
├────────────────────────────────────────────────────────────────┤
│ 02  Por onde você começa?   3 caminhos em colunas separadas por fio vertical  │
│   Sair do aluguel │ Investir │ Imóvel para a família — cada um com o botão (WhatsApp) │
├────────────────────────────────────────────────────────────────┤
│ 03  Antes de escolher, entenda o que você pode comprar  (bloco areia)      │
│   texto + [Quero fazer minha simulação]  │  FICHA: 8 itens em lista com fio pontilhado │
│   nota: a simulação é uma estimativa; a aprovação é da instituição financeira │
├────────────────────────────────────────────────────────────────┤
│ 04  Não escolha apenas um imóvel. *Escolha com informação.*                 │
│   localização · planta · valores · condições · financiamento · documentação · momento de vida │
├────────────────────────────────────────────────────────────────┤
│ 05  Como funciona meu atendimento   01 ─ 02 ─ 03 ─ 04 ─ 05 ligados pela cota │
├────────────────────────────────────────────────────────────────┤
│ FECHAMENTO (ameixa escura): Seu imóvel pode estar mais perto…  [botões]   │
│ identificação completa · Instagram · rodapé                                │
└────────────────────────────────────────────────────────────────┘
```

**Celular:** retrato primeiro (4:5, recorte no rosto), nome e título embaixo; seções em uma coluna; as
cinco etapas viram lista vertical com a cota em pé; **barra fixa de contato** com ícone de WhatsApp (e o
Instagram como segundo botão com ícone). Todo botão de contato tem ícone (pedido do dono, 2026-09-27).

## Contato

WhatsApp com a mensagem já escrita **por caminho** (falar com ela, sair do aluguel, investir, família,
simulação): a pessoa chega à conversa dizendo o que quer, sem formulário (regra 5). Instagram como link
(regra 6: nada embutido).

## Revisto contra o genérico

- "Seria igual a qualquer corretor?" Não: não há imóvel, chave nem prédio; o que a página mostra é a
  pessoa e o método (a ficha da simulação, as cinco etapas).
- "O ouro vira cafona?" Só em fio de 1 px e em numeral grande; nada de degradê metálico.
- "Três cartões com ícone?" Os caminhos são colunas de texto separadas por fio, sem ícone e sem caixa.
- Movimento: só a entrada suave do retrato e das cotas; `prefers-reduced-motion` desliga.
