# ADR-006 — Página de sociedade de advogados (tipo "advocacia") e a OAB no lugar do CFM

- **Data:** 2026-09-23 · **Estado:** aceito (o dono pediu "seguindo as mesmas regras uma landing page
  para um grande escritório de advocacia" e delegou as decisões — modo de trabalho de 2026-09-22)

## Contexto
1. O repositório nasceu para médicos: as regras 2 a 4 falam de CRM, RQE e Res. CFM 2.336/2023, e o
   contrato do `pagina.json` só conhecia `medico` e `negocio` (ADR-005).
2. Advocacia tem norma de publicidade própria, **mais restritiva** que a do CFM em pontos que importam
   para uma página: **Provimento 205/2021 do CFOAB** e **Código de Ética e Disciplina da OAB**
   (arts. 39 a 47). Publicidade "meramente informativa", "discreta e sóbria"; vedados valores de
   honorários, gratuidade e desconto (art. 3º, I), especialidade sem título (art. 3º, III), expressões
   persuasivas, de autoengrandecimento ou comparação (art. 3º, IV), promessa de resultado e casos
   concretos (art. 6º), pagar por ranking ou prêmio (art. 5º, § 1º), lista de clientes (CED, art. 42, IV).
   Quem responde pela publicidade da sociedade são os **sócios administradores** (art. 1º, § 1º).
3. O pedido não nomeou escritório: é uma **demonstração**, como a do Dr. Paulo (ADR-004).
4. "Negócio" (ADR-005) não serve: ele dispensa identificação profissional, e a OAB a exige (CED, art. 44:
   nome da sociedade e número de inscrição).

## Decisão
**`"tipo": "advocacia"`** no `pagina.json` (`lib/pagina.mjs`):
- Exige `sociedade.nome`, `sociedade.razaoSocial` (com "Advogados"), `sociedade.registros[]` (`uf`,
  `numero` no formato "12.345", com a letra da suplementar se houver: "12.345-S"), `advogados[]` com
  `nome` e `oab[]`, e **ao menos um** `socioAdministrador: true`. `cidade` e `uf` (a sede).
- Opcionais usados pelo JSON-LD: `sociedade.categoria`, `sociedade.areas[]`, `sociedade.escritorios[]`
  (endereço), `contato.email`, `redes{}`.
- Publicar exige `revisao.oabConferidaEm` (inscrições no Cadastro Nacional dos Advogados),
  `revisao.conferenciaOabEm` e `revisao.aprovadoPeloEscritorioEm` — a regra 4 com os nomes da OAB.
- `"demonstracao": true` vale também aqui: dispensa `oabConferidaEm` e `aprovadoPeloEscritorioEm`,
  **continua** exigindo `conferenciaOabEm`, e tem o próprio texto de aviso (`avisoDeDemonstracao()`):
  *"Página de demonstração. <nome> é um escritório fictício; advogados, inscrições na OAB e contatos são
  fictícios. Nenhuma pessoa ou empresa real está ligada a esta página."* O resto do ADR-004 (noindex,
  fora do sitemap, título, créditos de imagem) vale igual.

**Verificação (`verificar.mjs`):**
- `data-identificacao-oab` com a razão social, o registro da sociedade em cada seccional
  (`OAB/UF número`) e cada sócio administrador com a inscrição; todo advogado do `pagina.json` com a
  própria inscrição **em algum ponto** da página.
- O piso de termos é **`ferramentas/regras/termos-vedados-oab.json`**, com o artigo de cada termo; o
  `termos-vedados.json` (CFM) continua para as páginas de saúde, o índice e o 404. "Garantia" não é erro
  no piso da OAB — em advocacia é também nome de instituto; a promessa ("resultado garantido",
  "garantimos") é.

**Construção e SEO:** JSON-LD `LegalService` (`legalName`, `identifier` com `OAB/UF`, `knowsAbout` com as
áreas — nunca "especialidade" —, `address` por escritório, `employee` com a inscrição de cada advogado).
No índice, a etiqueta da demonstração diz "escritório fictício".

**Prova:** `ferramentas/testes/advocacia.test.mjs` — passa (demonstração com "garantia" como instituto);
reprova sem `data-identificacao-oab`, com advogado sem inscrição na página, sem sócio administrador, com
"resultado garantido" e "consulta gratuita", sem o aviso, e escritório real sem as datas de revisão. O
site descartável dos testes foi para `testes/apoio.mjs`, compartilhado com `demonstracao.test.mjs`.

## Consequências
- A regra 3 do `CLAUDE.md` lê-se, numa página de advocacia, com a OAB no lugar do CFM; a regra 2, com a
  inscrição na OAB no lugar do CRM. As regras 1 e 4 a 16 valem sem mudança.
- **Não existe skill da OAB.** A conferência frase a frase desta página foi feita pelo techlead contra o
  texto do Provimento (fonte citada na `conferencia-oab.md`). Um escritório **real** pede antes uma skill
  `publicidade-advocacia-oab-landing` (backlog B-09).
- O título do índice é "Médicos" (D-02) e a demonstração de advocacia aparece na seção "Demonstrações e
  propostas". Um escritório real publicado na lista principal torna a D-02 urgente.

## Alternativas
- **Reusar `negocio`**: sem identificação da OAB e sem o piso da OAB — a página poderia dizer "o maior
  escritório" e passar.
- **Repositório separado para advocacia**: duplica ferramentas, CI e método para uma página; revisitar se
  houver várias.
