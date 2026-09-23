# ADR-005 — Página de negócio e modo proposta; demonstrações visíveis no índice

- **Data:** 2026-09-22 · **Estado:** aceito (o dono pediu o hub em `/hub-saude-negocios/` "com as mesmas
  premissas" e delegou as decisões)

## Contexto
1. O dono pediu para refazer o site do **Hub Saúde Negócios** (hubsaudenegocios.com.br), uma
   **consultoria em gestão e negócios de saúde**. Não é página de médico: não há CRM, RQE, especialidade
   nem paciente. O contrato do `pagina.json` e a verificação exigiam tudo isso.
2. É o site de um **negócio real**, com fotos e textos reais, que ainda **não aprovou** o redesenho. Ir
   ao ar indexável em `ivanclay.github.io/landing/…` competiria com o domínio oficial no Google
   (conteúdo duplicado) e poderia ser tomado pelo site oficial.
3. Com a demonstração fora do índice (ADR-004), a raiz do site ficou "vazia" — o dono quer a raiz como
   vitrine do que existe.

## Decisão
**`"tipo": "negocio"`** no `pagina.json`:
- Exige `organizacao.nome`; aceita `organizacao.categoria`, `slogan`, `logo`, `areaAtendida`, `temas[]`,
  `servicos[]` (`nome`, `descricao`), `responsavel` (`nome`, `cargo`). Cidade e UF são opcionais.
- **Não** exige médico, CRM, RQE nem `data-identificacao-cfm`, nem conferência CFM (não é publicidade
  médica). A régua de redação continua a do repositório: nada inventado, número só com fonte.
- Publicar exige `revisao.aprovadoPeloClienteEm` — a regra 4 com outro nome.
- JSON-LD `ProfessionalService` (serviços como `OfferCatalog`, fundadora como `Person`, `sameAs` com o
  site oficial).

**`"proposta": true`** (só em negócio): o redesenho de um site real em avaliação.
- `noindex, nofollow`, fora do sitemap e da lista principal — como a demonstração.
- Publica sem `aprovadoPeloClienteEm` (a proposta existe justamente para ser aprovada).
- Exige `siteOficial` (https) e um `data-aviso-proposta` antes do `<h1>` com o texto exato:
  *"Proposta de novo site para <nome>, em avaliação. Este não é o site oficial: o site oficial é <domínio>."*

**Índice:** com `site.config.json › indice.mostrarDemonstracoes: true`, a raiz mostra, abaixo da lista
principal, a seção **"Demonstrações e propostas"**, cada item com etiqueta ("Demonstração · médico
fictício", "Proposta · em avaliação"). As páginas continuam `noindex` e fora do sitemap; o índice só as
linka. `false` volta ao comportamento original do ADR-004 (só link direto).

## Consequências
- Quando o cliente aprovar: tirar `"proposta"`, preencher `aprovadoPeloClienteEm` — a página passa a ser
  indexável. Se o site for para o domínio do cliente, o canonical muda com a `urlBase` (D-01) ou a
  página sai daqui.
- `verificar.mjs` passa a separar as checagens por tipo; os testes cobrem proposta que passa, proposta
  sem aviso e negócio sem aprovação.
- Este ADR **emenda o ADR-004** no ponto "fora do índice": a demonstração segue fora do Google e do
  sitemap, mas aparece na raiz, etiquetada.
