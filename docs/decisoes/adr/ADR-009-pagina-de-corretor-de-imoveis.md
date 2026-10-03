# ADR-009 — Página de corretor(a) de imóveis (tipo "imobiliario") e o COFECI no lugar do CFM

- **Data:** 2026-09-27 · **Estado:** aceito (o dono pediu a página da corretora Karoline Melo, real, e
  delegou as decisões de estrutura — modo de trabalho de 2026-09-22)

## Contexto
1. O contrato conhecia `medico`, `negocio` (ADR-005), `advocacia` (ADR-006) e `nutricao` (ADR-008).
   Corretor de imóveis não é profissional de saúde: tem **inscrição no CRECI** da região e responde à
   **Lei 6.530/1978** e às resoluções do **COFECI**.
2. O que muda a página (PDFs oficiais do COFECI, lidos em 2026-09-27; citações em
   `docs/paginas/karoline-melo/conferencia-cofeci.md`):
   - **Lei 6.530/1978, art. 20, IV** e **Res. COFECI 458/1995, art. 2º**: todo anúncio traz o número da
     inscrição **precedido da sigla CRECI** ("J" para pessoa jurídica);
   - **Res. 458/1995, art. 1º**: só se anuncia **imóvel** com contrato escrito de intermediação;
   - **Código de Ética (Res. COFECI 326/1992)**: art. 4º, II (dados rigorosamente certos) e art. 6º, X e
     XVII (concorrência desleal; anunciar capciosamente);
   - **Res. COFECI 1.066/2007**: o CNAI é opcional; o número só se mostra se a inscrição existir;
   - **CDC, arts. 30 e 37**: a oferta vincula; publicidade enganosa inclusive por omissão (simulação de
     crédito não é aprovação).
3. "Negócio" não serve: dispensa a identificação, e a lei a exige em todo anúncio.

## Decisão
**`"tipo": "imobiliario"`** no `pagina.json` (`lib/pagina.mjs`):
- `corretor.nome`, `corretor.generoGramatical` ("Corretor/Corretora de Imóveis"), `corretor.creci` =
  `{ uf, numero: "36.265" | "36.265-F" }` (ou `"PENDENTE"`, só com `publicar: false`), `corretor.cnai` e
  `corretor.titulo` opcionais; `cidade`, `uf`, `redes.instagram` opcionais.
- Publicar exige `revisao.conferenciaCofeciEm`; fora da proposta, também `creciConferidoEm` e
  `aprovadoPelaCorretoraEm` (a regra 4 com os nomes do COFECI).
- **`proposta: true` vale desde o início** (o mesmo tratamento da emenda do ADR-008): noindex, fora do
  sitemap, etiqueta no índice, `data-aviso-proposta` = *"Proposta de página para <nome>, em avaliação
  pela corretora."*
- `demonstracao` recusado (profissional real).

**Verificação (`verificar.mjs`):** `data-identificacao-creci` com o nome, a profissão, `CRECI-<UF> <número>`
e, se houver, `CNAI <número>`. Piso de termos **`ferramentas/regras/termos-vedados-cofeci.json`**: garantia
de aprovação, de crédito, de retorno ou valorização; "nome sujo", "sem consulta ao SPC/Serasa";
superlativos e "nº 1"; "imperdível", "últimas unidades"; "ainda hoje".

**SEO:** JSON-LD `RealEstateAgent` (tipo próprio do schema.org), com `employee` = `Person` e o CRECI (e o
CNAI) em `identifier`.

**Prova:** `ferramentas/testes/imobiliario.test.mjs`.

## Consequências
- Numa página de corretor, a regra 2 do `CLAUDE.md` lê-se com o CRECI no lugar do CRM/RQE, e a regra 3
  com a Lei 6.530/1978 e o Código de Ética do COFECI no lugar da Res. CFM 2.336/2023.
- **A página anuncia a profissional, não imóveis.** Anunciar um imóvel (foto, preço, endereço) exige o
  contrato escrito de intermediação e, em loteamento ou incorporação, o número do registro (Lei 6.530,
  art. 20, V): é um ADR próprio, quando pedido.
- Não existe skill do COFECI; a conferência é feita pelo tech lead (backlog B-13 vale também aqui).

## Alternativas
- **`tipo` genérico "profissional" com conselho parametrizado**: com o quarto conselho (CFM, OAB, CFN,
  COFECI), a repetição já pesa. Revisitar: B-15.
- **Reusar `negocio`**: sem o CRECI na página, contra o art. 20, IV da Lei 6.530/1978.

## Emenda — 2026-09-27: proposta sem aviso na página
Por decisão do dono, a `karoline-melo` sai como **"Proposta · em avaliação" só no índice**, sem aviso na
landing (mesma regra aplicada à emilia-kuwano, emenda 2 do ADR-008): sem `siteOficial`, a proposta não leva
`data-aviso-proposta`; com `siteOficial`, o aviso continua obrigatório. Continua `noindex` e fora do sitemap
até a aprovação da corretora. Testes em `imobiliario.test.mjs`.

## Emenda — 2026-10-03: contato PENDENTE em rascunho
Na `monica-santos`, o texto da corretora veio sem nenhum contato e o dono pediu para construir com as pendências. O contrato (`lib/pagina.mjs`, vale para todos os tipos) passa a aceitar `contato.whatsapp` ou `contato.telefone` igual a `"PENDENTE"` **só com `publicar` diferente de `true`**, como já era com o CRECI e o CRN; o JSON-LD do corretor omite o telefone pendente, e o `verificar.mjs` reprova a página que mostra `PENDENTE` (regra 1). Testes em `imobiliario.test.mjs`.
