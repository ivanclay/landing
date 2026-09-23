# ADR-007 — O índice é a vitrine da Fábrica de Apps e Soluções, em duas colunas

- **Data:** 2026-09-23 · **Estado:** aceito (pedido do dono) · fecha a **D-02** · emenda o ADR-005 (seção
  "Demonstrações e propostas" do índice)

## Contexto
O índice na raiz se chamava "Médicos", sem marca (D-02 aberta). O repositório já tem médico, negócio de
saúde e escritório de advocacia; o dono quer a raiz como vitrine da empresa dele, a **Fábrica de Apps e
Soluções**, com a lista de produtos como a coisa mais importante da página.

## Decisão
- `site.config.json › indice` ganha `empresa` (obrigatório — a construção para sem ele), `lema`, `marca`
  (o símbolo do logo) e `imagemSocial`. Título: **"Soluções"**.
- Cabeçalho curto: símbolo + nome da empresa em texto (legível e acessível; o nome dentro da imagem sairia
  minúsculo) + título e descrição numa faixa só. A lista começa na primeira tela.
- **Duas colunas**, cada uma uma `<table>` suave (só fios horizontais): **Demonstrações** (páginas com
  `demonstracao`) e **Produtos dos clientes** (páginas publicadas de clientes + as propostas, etiquetadas
  "Proposta · em avaliação" — o cliente é real). A busca filtra as duas; cada coluna diz quando ficou vazia.
- **Identidade do índice** (regra 10) tirada do logo: azul-marinho, petróleo, laranja só decorativo;
  Montserrat (família geométrica do logo) nos títulos, Atkinson Hyperlegible Next no texto.
- **Prévia de link:** o índice tem `og:site_name` (a empresa), imagem social 1200×630 com versão no endereço,
  `twitter:card` e JSON-LD `Organization`. As **páginas de cliente não levam `og:site_name`** — a prévia do
  link de um médico não deve anunciar a Fábrica nem "Soluções" (fecha o B-07).
- O original do logo (JPEG gerado por IA, 439 KB, com EXIF) mora em `entrada/indice/`, fora do git; no ar só
  vão os recortes sem metadados (`marca-fabrica.png/.webp`, `social-indice.jpg`).

- **Revisão de 2026-09-23 (crítica do dono à 1ª versão):** a marca é assinatura, não protagonista — barra
  fina com o logo de 40 px à esquerda e o lema ao lado; título "Soluções" curto com a busca na mesma faixa;
  as duas listas em **painéis lado a lado** (≥ 60rem), cada linha com monograma, etiqueta e a linha inteira
  clicável. A tabela vira bloco pela largura **do painel** (`@container`), não da tela.
- **CSS e JS com versão:** a construção põe `?v=<hash>` em todo CSS/JS local de todas as páginas. O Pages manda
  guardar por 10 min; sem a versão, quem abriu logo depois do push viu o HTML novo com o CSS velho — foi o que
  fez a 1ª versão parecer sem estilo na tela do dono.

## Consequências
- `indice.mostrarDemonstracoes: false` tira demonstrações e propostas do índice (só link direto).
- Os testes provam: demonstração só na coluna de demonstrações, proposta só na de clientes, prévia de link do
  índice completa e página de cliente sem `og:site_name`.
