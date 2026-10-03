# Direção de arte — `monica-santos` (três opções para a cliente escolher)

- **Data:** 2026-10-03 · **Quem:** tech lead (Opus). Construção delegada a três agentes Sonnet em paralelo,
  um por opção, cada um só nos próprios arquivos.
- **Matéria-prima:** um retrato só (1024 × 1536): blazer **preto**, blusa **branca**, brinco de **pérola com
  aro dourado**, pulseira dourada; fundo de escritório claro com **planta verde** e ripado de madeira.
  Pose de mão no queixo, olhar direto, sorriso: retrato de confiança, não de catálogo.
- **O que "alto padrão" quer dizer para o dono** (memórias da `karoline-melo` e da `emilia-kuwano`): página
  **rica** — a foto usada com presença, blocos com variação de fundo, ícones nos botões, nada de "sóbrio e
  vazio". Uma única foto: as opções usam **o mesmo retrato em dois enquadramentos** (abertura e fechamento ou
  sobre mim) em vez de uma segunda imagem inventada (regra 12: sem banco de imagem, sem prédio genérico).
- **Distância das outras páginas:** `karoline-melo` (névoa azul + ardósia + champanhe, cartões arredondados),
  `emilia-kuwano` (tela dividida café/creme/salmão), `rudolf-specht` (papel/azul-noite/ocre; azul-noite
  escuro; sálvia/petróleo). Nenhuma opção aqui repete paleta nem gesto dessas.

## Clichês recusados (as três)
Chave dourada, casinha com telhado, ícone de prédio, skyline de Salvador em silhueta, Elevador Lacerda,
"sonho da casa própria" em letra cursiva, gradiente roxo-azul, foto de banco de casal recebendo chave,
selo "aprovado". O tema imobiliário aparece no **desenho** (linhas de planta, horizonte, grade), não em ícone.

---

## Opção 1 — "Pérola" (clara, joalheria editorial)
- **Ideia:** o brinco de pérola e o aro dourado do retrato viram a identidade. Elegância de joalheria:
  branco-pérola, preto do blazer, ouro fino.
- **Paleta:** pérola `#F6F3EE` (fundo) · branco `#FFFFFF` (superfície) · ônix `#141414` (texto e faixas
  escuras) · grafite `#4A4A4A` (texto suave) · ouro `#B08D57` (fios e ícones; **nunca texto sobre claro** se
  não passar 4,5:1 — medir) · ouro-claro `#D9C29A` (texto sobre ônix).
- **Tipos:** Instrument Serif (nome e títulos, grande, com itálico) · DM Sans (texto).
- **Layout:** abertura em duas colunas — à esquerda nome enorme em serifa, rubrica em versalete espaçado,
  apoio e botões; à direita o retrato alto num retângulo com **moldura dourada deslocada** (um fio de ouro
  a 16 px, atrás da foto). Atuação em três colunas numeradas em algarismos de serifa grandes ("i, ii, iii").
  "Sobre mim" numa **faixa ônix** com a citação em itálico ouro-claro e o retrato recortado em busto num
  círculo. Financiamento: três "fichas" brancas com fio de ouro no topo. Passos em linha horizontal com
  **pequenas pérolas** (círculos perolados com sombra suave) marcando cada etapa. Fechamento ônix.
- **Gesto memorável:** a pérola — o ponto perolado que marca passos, divisórias e o botão ativo.

## Opção 2 — "Orla" (escura, tela dividida com o mar de Salvador)
- **Ideia:** Salvador é mar. Tela dividida escura (o formato que o dono escolheu na `emilia-kuwano`), mas em
  **azul-petróleo profundo do mar** em vez de café — e um coral de fim de tarde.
- **Paleta:** maré `#0F2F36` (fundo escuro principal) · maré-funda `#0A2227` (blocos) · espuma `#F4F1EA`
  (texto claro e blocos claros) · bruma `#A9C4C4` (texto suave sobre escuro) · coral `#E9876B` (botão
  principal com texto maré; detalhes) · areia `#E8DCC8` só como fundo de bloco claro (nada que leia marrom).
- **Tipos:** Fraunces (títulos, peso leve, ótica alta) · Hanken Grotesk (texto).
- **Layout:** no desktop, o retrato ocupa **a metade esquerda, fixo** (sticky, altura da janela) com o nome
  sobre a foto na base, num degradê para maré; a metade direita rola com as seções. No celular, o retrato
  vira a abertura em largura total com o nome sobre ele. Seções separadas por uma **linha de horizonte** —
  um fio fino ondulado (SVG inline, cor bruma) que lembra a linha d'água. Atuação em lista grande com
  números em coral; financiamento num bloco **espuma** (claro) com as três modalidades em linhas;
  passos verticais com a linha d'água ligando os números.
- **Gesto memorável:** a linha do horizonte ondulada que costura as seções, e o retrato fixo ao lado.

## Opção 3 — "Planta" (clara, arquitetônica)
- **Ideia:** ela vende imóvel **na planta**. A página é desenhada como uma planta baixa: grade técnica
  finíssima no fundo, cotas e marcações de canto, e o verde da planta do retrato.
- **Paleta:** papel `#FBFBF8` · branco `#FFFFFF` · verde-folha `#1E4D3B` (marca, títulos, bloco escuro) ·
  verde-claro `#DCE9E1` (fundo de bloco) · grafite `#2B2F2C` (texto) · cinza-técnico `#5D6661` (texto
  suave) · linha `#D5DDD7` (grade e cotas) · lima `#C8E06B` só como detalhe sobre o verde-folha.
- **Tipos:** Bricolage Grotesque (títulos, condensada pela largura) · Public Sans (texto). Números e
  rótulos técnicos em versalete espaçado ("01 — CONVERSA").
- **Layout:** fundo com **grade de planta** (linear-gradient em CSS, 24 px, quase invisível). Abertura: retrato
  à direita num retângulo com **marcas de canto** (os "L" de recorte de prancha) e uma **cota** ao lado
  ("1:1 · Salvador e RMS"), nome grande à esquerda. Atuação em três "cômodos" — cartões com borda fina
  e rótulo técnico. Financiamento num bloco verde-folha com as modalidades em cartões claros. Passos como
  uma **linha do tempo "da planta às chaves"** horizontal no desktop (vertical no celular) com marcos.
  Fechamento com o retrato em busto e a grade em verde.
- **Gesto memorável:** a prancha técnica — grade, marcas de canto e cotas — sem nenhum ícone de casa.

---

## Comum às três (contrato)
- Texto: **`texto.md`**, palavra por palavra. Contato: `wa.me/PENDENTE` (pendência P-01) com ícone do
  WhatsApp (SVG inline) em todo botão, inclusive a barra fixa do celular (`.barra-contato`).
- `data-identificacao-creci` na abertura e no rodapé; `data-contato-topo` nos botões da abertura.
- Fontes locais (`../assets/fontes/<id>/fonte.css`), retrato em `<picture>` AVIF/WebP/JPEG com
  `width`/`height`, `fetchpriority="high"` na abertura e `loading="lazy"` depois.
- Contraste de cada par de texto medido (≥ 4,5:1; ≥ 3:1 só em texto grande) e anotado no cabeçalho do tema.
- 320 a 1920 px sem rolagem lateral; `prefers-reduced-motion`; foco visível; alvo ≥ 44 px.
- Arquivos: `opcao-N.html`, `opcao-N-tema.css` (cor e fonte, regra 10), `opcao-N.css` (layout).
- A página de escolha (`index.html`, `tema.css`, `pagina.css`) e as miniaturas são do tech lead.

## Crítica (depois da construção)
Capturas em `capturas/` (página inteira em 375 e 1440 px; primeira tela em 1440 px; a escolha). Revisto pelo tech lead em 2026-10-03:
- **Pérola:** fiel ao plano; a moldura dourada deslocada e as pérolas marcando os passos funcionam. O retrato oval no "Sobre mim" sobre ônix é o ponto alto. Rubricas em versalete acrescentadas (sem fato novo).
- **Orla:** a mais forte na primeira tela — retrato fixo à esquerda com o nome sobre o degradê, coral no botão, onda entre seções. Fundos alternados (maré, areia, espuma) dão riqueza. Retrato do fechamento só no celular (no desktop ele já está fixo à vista).
- **Planta:** a mais diferente das outras páginas do repositório: grade de prancha, marcas de canto, cota "1:1 · Salvador e RMS", trilha 01–04 com o último marco em verde. O título da trilha ficou o do texto, sem "da planta às chaves" (frase fora do texto conferido).
- **Corrigido pelo coordenador:** "CRECI-BA" partia no hífen no celular; a inscrição ganhou `.inscricao { white-space: nowrap }` nas quatro páginas.
- **Contra o genérico:** nenhuma das três tem chave, casa, prédio, skyline ou foto de banco; nenhuma repete a paleta da `karoline-melo`, da `emilia-kuwano` ou do `rudolf-specht`.
