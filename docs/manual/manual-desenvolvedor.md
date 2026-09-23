# Manual do desenvolvedor

> Ferramentas, contrato do `pagina.json`, verificação e workflows. As regras que tudo isto garante
> estão no [`CLAUDE.md`](../../CLAUDE.md). Última revisão: 2026-09-22.

## Ambiente

Node 22+. Para construir e verificar, não precisa de `npm install`. Para fontes e imagens, precisa.

## A construção — `ferramentas/construir.mjs`

`site/` → `_site/`:

1. Copia `site/assets/`.
2. Para cada pasta de `site/` que não seja `assets` e não comece com `_` ou `.`:
   - lê e valida o `pagina.json` (`ferramentas/lib/pagina.mjs`);
   - pula a página se `publicar: false`, exceto com `--rascunhos`, que a inclui com `noindex`;
   - copia a pasta sem o `pagina.json` e sem arquivos que começam com `_`;
   - troca `<!-- @gerado:cabecalho -->` por canonical, Open Graph e JSON-LD (`ferramentas/lib/seo.mjs`).
   - a imagem social sai com `?v=<8 caracteres do SHA-256 do arquivo>` no `og:image`, `twitter:image` e no JSON-LD: quando a imagem muda, o endereço muda, e WhatsApp/Facebook/LinkedIn buscam a nova (eles guardam a prévia pelo endereço).
   - todo `href`/`src` local de `.css` e `.js` sai com `?v=<hash>` (`versionarRecursos`): o navegador nunca junta HTML novo com CSS velho do cache do Pages (10 min).
3. Gera os redirecionamentos de `site.config.json › redirecionamentos`: `{ "antigo": "novo" }`, onde
   `""` significa o índice.
4. Gera `index.html` (de `ferramentas/modelos/indice.html`), `404.html`, `sitemap.xml` e `robots.txt`.

## A verificação — `ferramentas/verificar.mjs`

Confere o que está em `_site/`. **Erro** reprova (exit 1); **aviso** é impresso para alguém decidir.

| Checagem | Nível |
|---|---|
| `lang="pt-BR"`, `<title>`, viewport, meta description, um `h1` | erro (tamanho da descrição: aviso) |
| `img` com `alt`, `width`, `height` | erro |
| `form`, `iframe`, `embed`, `object` | erro |
| `<style>`, `style=`, `on…=`, `<script>` sem `src` (exceto JSON-LD) | erro |
| Recurso de fora (`http…`, `//…`, `data:`) ou caminho absoluto `/…` | erro (exceto `404.html` com a URL base) |
| Arquivo referenciado inexistente (HTML e `url()` do CSS) | erro |
| Links: só `https:`, `tel:`, `mailto:`; `_blank` com `noopener` | erro |
| Termos de `ferramentas/regras/termos-vedados.json` (CFM; em página de advocacia, `termos-vedados-oab.json`) | erro ou aviso, conforme o termo |
| `PENDENTE`, `DESCREVA A IMAGEM`, `{{`, `TODO`, `XXX`, lorem ipsum | erro |
| `data-identificacao-cfm` com nome, Médico/Médica, `CRM-UF` e número, cada especialidade e `RQE n` | erro |
| Advocacia: `data-identificacao-oab` com a razão social, `OAB/UF número` de cada registro da sociedade e cada sócio administrador com a inscrição; todo advogado do `pagina.json` com a inscrição em algum ponto da página | erro |
| `docs/paginas/<slug>/briefing.md` existe (página publicada) | erro |
| Imagem > 250 KB; pasta > 900 KB | aviso |

**Em página com `"demonstracao": true`** ([ADR-004](../decisoes/adr/ADR-004-modo-demonstracao.md)):

| Checagem | Nível |
|---|---|
| `data-aviso-demonstracao` antes do `h1`, sem `hidden`/`aria-hidden`, com o texto exato de `avisoDeDemonstracao()` (`lib/pagina.mjs`) | erro |
| `<title>` com "Demonstração" | erro |
| Toda `<img>` de `imagens/` (menos `imagens/marcas/`) dentro de `<figure>` com `<figcaption>` "Imagem ilustrativa" | erro |
| `docs/paginas/<slug>/creditos-imagens.md` com uma linha de tabela citando cada prefixo de `site/<slug>/imagens/` (`retrato` cobre `retrato-480.avif`…; a `imagemSocial` é dispensada) | erro |

**Em página real:** `creditos-imagens.md` na pasta da página, ou "Imagem ilustrativa" no texto, reprova
(regra 12 — banco de imagem só na demonstração).

⌗ A leitura de HTML é por expressão regular (`ferramentas/lib/html.mjs`). Serve para o HTML deste
repositório, não para qualquer HTML (B-02). Mudou uma checagem? Prove com um caso que reprova e um
que passa, e descreva os dois no PR.

## Contrato do `pagina.json`

O código é o contrato: `ferramentas/lib/pagina.mjs`. O modelo está em
`.claude/skills/nova-pagina-medico-landing/assets/esqueleto/pagina.json`.

**Campos obrigatórios:**
- `slug`, igual à pasta;
- `publicar`;
- `medico.nome`, `medico.tratamento` e `medico.generoGramatical`;
- `medico.crm[]`, com número e UF;
- `resumo`, com 50 a 160 caracteres;
- `cidade` e `uf`;
- `contato`: ao menos um entre `whatsapp` (E.164), `telefone` (E.164) e `agendamento` (https).

**Regras dos campos:**
- Cada item de `especialidades[]` e de `areasDeAtuacao[]` exige `rqe`.
- Com `publicar: true`, também são obrigatórios `atualizadoEm` e as três datas de `revisao`.

**Modo demonstração** (`"demonstracao": true`, ADR-004): `publicar: true` dispensa `crmConferidoEm` e
`aprovadoPeloMedicoEm`, mas continua exigindo `conferenciaCfmEm` e `atualizadoEm`; o `resumo` precisa
conter "demonstração". A construção põe `noindex, nofollow` e deixa a página fora do índice e do sitemap:
ela só abre pelo link direto.

**Página de negócio** (`"tipo": "negocio"`, [ADR-005](../decisoes/adr/ADR-005-pagina-de-negocio-e-proposta.md)):
exige `organizacao.nome` em vez de `medico`; sem CRM, sem identificação CFM; publicar exige
`revisao.aprovadoPeloClienteEm`. Com `"proposta": true`, publica sem aprovação, com `noindex`, fora do
sitemap, exigindo `siteOficial` e o `data-aviso-proposta` (texto de `avisoDeProposta()`). JSON-LD
`ProfessionalService`. `"preLancamento": true` (produto próprio em avaliação, como o `s-frontdesk`) só põe a
etiqueta "Pré-lançamento · em avaliação" no índice: não muda publicação, sitemap nem `noindex`, e não se soma a
`proposta`.

**Página de advocacia** (`"tipo": "advocacia"`, [ADR-006](../decisoes/adr/ADR-006-pagina-de-advocacia.md)):
exige `sociedade.nome`, `sociedade.razaoSocial` (com "Advogados"), `sociedade.registros[]` (`uf`,
`numero` como "12.345" ou "12.345-S"), `advogados[]` (`nome`, `oab[]`) com ao menos um
`socioAdministrador: true`, `cidade` e `uf`. Opcionais: `sociedade.categoria`, `areas[]`, `escritorios[]`,
`contato.email`. Publicar exige `revisao.oabConferidaEm`, `conferenciaOabEm` e `aprovadoPeloEscritorioEm`;
com `"demonstracao": true`, só `conferenciaOabEm`, e o aviso tem texto próprio. JSON-LD `LegalService`;
sem `og:site_name` (nenhuma página de cliente leva — ADR-007). O piso de termos é `termos-vedados-oab.json`.

**Índice** ([ADR-007](../decisoes/adr/ADR-007-indice-da-fabrica.md)): `ferramentas/modelos/indice.html`, com os
marcadores `<!-- @gerado:demonstracoes -->` e `<!-- @gerado:clientes -->` (uma linha de `<table>` por página,
`linhaDoIndice()` em `construir.mjs`). `site.config.json › indice`: `titulo`, `descricao`, `empresa`
(obrigatório), `lema`, `marca`, `imagemSocial` (1200×630, `npm run imagens … --social`), `indexavel`,
`mostrarDemonstracoes` (false tira demonstrações e propostas do índice). A busca (`assets/js/indice.js`) filtra
todo `[data-busca]` dentro de cada `[data-busca-grupo]`. Lado a lado, os dois painéis são `subgrid` da
`.colunas` (cabeçalhos com a mesma altura) e as linhas têm altura fixa (6,5rem) e as mesmas larguras de coluna:
só desalinham se o número de itens for diferente. O container da consulta `@container` é o `.painel__lista`,
não o `.painel`: um container isola o layout, e o `subgrid` deixaria de valer. O cabeçalho do índice (`cabecalhoDoIndice()`) tem
`og:site_name`, a imagem social com versão, `twitter:card` e JSON-LD `Organization`.

**Campos opcionais, usados pelo JSON-LD:** `locais[]` (`nome`, `tipo`, `endereco`), `convenios[]`,
`redes{}`, `imagemSocial`.

## Testes — `ferramentas/testes/`

`npm run testar` (`node --test`, embutido no Node, sem dependência). Cada teste monta um site
descartável numa pasta temporária e roda `construir.mjs` e `verificar.mjs` de verdade, apontados para ele
pela variável `LANDING_RAIZ` (`lib/arquivos.mjs`; sem ela, a raiz é o repositório). O site descartável
mora em `testes/apoio.mjs` (`comSite({ pagina, html, creditos }, conferir)`); cada `*.test.mjs` diz o que
a página tem: `demonstracao.test.mjs` (ADR-004 e ADR-005), `advocacia.test.mjs` (ADR-006). O `verificar.yml`
roda os testes antes da verificação. Checagem nova entra com um caso que reprova e um que passa.

## Fontes e imagens

```sh
npm i -D @fontsource-variable/<id>          # ou @fontsource/<id> se não houver versão variável
npm run fontes <id> [--italico] [--opsz]    # variável
npm run fontes <id> --pesos=400,700         # estática
npm run imagens entrada/<slug>/foto.jpg site/<slug>/imagens/retrato 480,800,1200
npm run imagens entrada/<slug>/foto.jpg site/<slug>/imagens/social --social
```

`copiar-fontes` traz só o subconjunto latin, que cobre o português inteiro, e só woff2.
`otimizar-imagens` remove os metadados (EXIF, GPS) e imprime o `<picture>` pronto.

## Workflows

Veja o [ADR-003](../decisoes/adr/ADR-003-publicacao-pelo-actions.md) e
`.claude/skills/publicacao-github-pages-landing/references/pages.md`.
