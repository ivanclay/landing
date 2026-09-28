# ADR-008 — Página de nutricionista (tipo "nutricao") e o CFN no lugar do CFM

- **Data:** 2026-09-27 · **Estado:** aceito (o dono pediu a página da nutricionista Emília Kuwano, real, e
  delegou as decisões de estrutura — modo de trabalho de 2026-09-22)

## Contexto
1. O contrato conhecia `medico`, `negocio` (ADR-005) e `advocacia` (ADR-006). Nutricionista não tem CRM nem
   RQE: tem **inscrição no Conselho Regional de Nutricionistas** e responde ao **Código de Ética e de Conduta
   do Nutricionista** (Res. CFN 599/2018).
2. O código tem pontos que mudam a página (texto conferido na fonte,
   `https://cfn.org.br/wp-content/uploads/resolucoes/Res_599_2018.html`, em 2026-09-27):
   - **art. 21** — identificar-se com profissão, nome e número de inscrição no CRN da jurisdição;
   - **art. 55, parágrafo único** — ao divulgar orientação, informar que os resultados podem não ocorrer da
     mesma forma para todos;
   - **art. 56** — vedadas mensagens enganosas ou sensacionalistas, exclusividade e garantia de resultado;
   - **art. 57** — **vedado usar o valor dos honorários, promoções e sorteios como publicidade**. Aqui a
     norma é **mais restritiva que a do CFM** (que admite o preço da consulta, art. 9º, VI);
   - **art. 58** — vedada imagem corporal atribuindo resultado (antes e depois), mesmo autorizada.
3. Consulta on-line é permitida: a **Res. CFN 760/2023** regulamenta a telenutrição e suspende o art. 36 da
   599/2018 (que exigia avaliação presencial).
4. "Negócio" não serve: dispensa identificação profissional, e o art. 21 a exige. "Médico" seria falso.

## Decisão
**`"tipo": "nutricao"`** no `pagina.json` (`lib/pagina.mjs`):
- Exige `nutricionista.nome` e `nutricionista.crn` = `{ regiao: 1..11, numero: "12345" | "12345/P" }`.
  Opcionais: `nutricionista.areas[]`, `cidade`, `uf`, `locais[]`, `contato.email`, `redes{}`.
- **`crn: "PENDENTE"`** é aceito **só com `publicar: false`**: deixa construir o rascunho para ver no
  navegador. A página mostra "CRN PENDENTE", e o `verificar.mjs` reprova (regra 1) — a prévia existe, o
  merge não passa.
- `cidade` e `uf` não são obrigatórias: se nenhum documento diz a cidade, ela não entra (regra 1).
- Publicar exige `revisao.crnConferidoEm`, `revisao.conferenciaCfnEm` e
  `revisao.aprovadoPelaNutricionistaEm` — a regra 4 com os nomes do CFN.
- `demonstracao` e `proposta` não se aplicam (profissional real).

**Verificação (`verificar.mjs`):** `data-identificacao-crn` com o nome, a palavra "Nutricionista" e
`CRN-<região> <número>`. Piso de termos próprio, **`ferramentas/regras/termos-vedados-cfn.json`**: `R$`,
"valor da consulta", promoção, sorteio, desconto, grátis (art. 57), antes e depois (art. 58), garantia,
exclusividade, milagre, superlativos (art. 56). A borda de palavra da busca de termos passou a valer só onde
o termo começa ou termina em letra/dígito, para `R$` pegar também "R$400".

**SEO:** schema.org não tem tipo para nutricionista, e `Physician` seria falso. JSON-LD
`ProfessionalService` com `employee` = `Person` (`jobTitle: "Nutricionista"`, `identifier` com o CRN),
`knowsAbout` com as áreas, `address` por local com endereço.

**Prova:** `ferramentas/testes/nutricao.test.mjs` — passa (com o CRN no JSON-LD); reprova sem
`data-identificacao-crn`, sem a inscrição, com "R$ 400" e "R$380", com "antes e depois", publicada sem
`crnConferidoEm`, e com CRN PENDENTE publicada.

## Consequências
- Numa página de nutricionista, a regra 2 do `CLAUDE.md` lê-se com o CRN no lugar do CRM/RQE, e a regra 3
  com a Res. CFN 599/2018 no lugar da Res. CFM 2.336/2023 — **preço de consulta não entra**.
- **Não existe skill do CFN.** A conferência da primeira página foi feita pelo techlead contra o texto da
  resolução (`docs/paginas/emilia-kuwano/conferencia-cfn.md`). Backlog B-13.
- O esqueleto de `nova-pagina-medico-landing` continua de médico; a página de nutricionista parte dele e troca
  a identificação.

## Emenda — 2026-09-27: proposta de nutricionista
O dono decidiu publicar a `emilia-kuwano` **antes** da aprovação da nutricionista ("pode publicar, ela vai ver
publicado"), na mesma condição do Hub Saúde Negócios: **"Proposta · em avaliação"**.
- `"proposta": true` passa a valer para `nutricao` (antes, recusado). Publica com `noindex`, fora do sitemap,
  no índice com a etiqueta "Proposta · em avaliação" — o mesmo tratamento do ADR-005.
- Exige só `revisao.conferenciaCfnEm` (a norma continua conferida) e o CRN válido (identificação, art. 21);
  dispensa `crnConferidoEm` e `aprovadoPelaNutricionistaEm` enquanto for proposta.
- `siteOficial` é opcional; sem ele, o `data-aviso-proposta` diz exatamente: *"Proposta de página para
  <nome>, em avaliação pela nutricionista."* (`avisoDeProposta()`), antes do `<h1>`.
- **Saída da proposta:** com a aprovação dela, o dono preenche `crnConferidoEm` e `aprovadoPelaNutricionistaEm`,
  tira `"proposta": true` e o aviso do topo — a página vira indexável e entra no sitemap.
- Prova: 3 casos novos em `nutricao.test.mjs` (passa com aviso e noindex, fora do sitemap, com a etiqueta;
  reprova sem o aviso; reprova sem `conferenciaCfnEm`).

## Alternativas
- **`tipo` genérico "saude" com conselho parametrizado** (CRN, CRP, CREFITO…): mais geral, mas cada conselho
  tem vedação própria (o art. 57 não existe no CFM). Revisitar quando houver o segundo conselho.
- **Reusar `negocio`**: sem o CRN na página e sem o piso do CFN — a página poderia mostrar o preço e passar.

## Emenda — 2026-09-27 (2): sem aviso na página
O dono pediu para tirar da página o aviso "Proposta de página para…, em avaliação pela nutricionista": a
condição de proposta fica **só na etiqueta "Proposta · em avaliação" do índice** (a página continua com
`noindex` e fora do sitemap). Regra geral nova (`propostaAvisaNoTopo()` em `lib/pagina.mjs`): o
`data-aviso-proposta` só é exigido quando há `siteOficial` a apontar (o caso do ADR-005). Testes ajustados em
`nutricao.test.mjs`.
