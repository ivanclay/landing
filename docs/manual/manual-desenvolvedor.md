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
| Termos de `ferramentas/regras/termos-vedados.json` | erro ou aviso, conforme o termo |
| `PENDENTE`, `DESCREVA A IMAGEM`, `{{`, `TODO`, `XXX`, lorem ipsum | erro |
| `data-identificacao-cfm` com nome, Médico/Médica, `CRM-UF` e número, cada especialidade e `RQE n` | erro |
| `docs/paginas/<slug>/briefing.md` existe (página publicada) | erro |
| Imagem > 250 KB; pasta > 900 KB | aviso |

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

**Campos opcionais, usados pelo JSON-LD:** `locais[]` (`nome`, `tipo`, `endereco`), `convenios[]`,
`redes{}`, `imagemSocial`.

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
