# SEO — Arruda Seixas Advogados (`arruda-seixas`) · DEMONSTRAÇÃO

- Data: 2026-09-23 · Conferido no construído (`_site/arruda-seixas/index.html`).
- **Fora do Google de propósito** (ADR-004/ADR-006): `noindex, nofollow`, fora do sitemap; na raiz só em
  "Demonstrações e propostas", com a etiqueta "Demonstração · escritório fictício".

| Item | Valor |
|---|---|
| `<title>` | Demonstração — Arruda Seixas Advogados, advocacia empresarial |
| Descrição (= `resumo`, 131 caracteres) | Demonstração: página de um escritório de advocacia empresarial fictício, com dez áreas, índice de matérias e sócios em SP, RJ e DF. |
| `og:image` | `imagens/social.jpg?v=<hash>` — 1200×630, 38 KB, tipográfica (§ + nome + faixa "Demonstração · escritório fictício"), gerada no Chrome local com as fontes do repositório |
| `og:site_name` | **não sai** — o título do índice é "Médicos" (D-02); ADR-006 o restringe a página de médico |
| JSON-LD | `LegalService`: `name`, `legalName`, `identifier` (OAB/SP, OAB/RJ, OAB/DF), `telephone`, `image`, `knowsAbout` (10 áreas), `address` (3 escritórios: cidade e UF, sem logradouro), `employee` (10 sócios com `jobTitle` e a inscrição) |

Não conferido: o JSON-LD **não** foi colado no validator.schema.org (B-10). O JSON foi lido de volta e
é válido (`JSON.parse`), e os tipos e propriedades são os do schema.org para `LegalService`/`Organization`.
