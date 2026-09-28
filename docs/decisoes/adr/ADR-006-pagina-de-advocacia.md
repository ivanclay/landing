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

## Emenda — 2026-09-28: proposta de escritório real (Specht Sociedade de Advocacia)
O dono pediu a página do primeiro escritório **real**: **Specht Sociedade de Advocacia**, advogado
responsável **Rudolf Mateus de Jesus Specht, OAB/BA 77.991**. Dois fatos ainda não chegaram: o **número de
registro da sociedade na OAB/BA** (perguntado ao cliente) e o **nome exato da razão social** no contrato
social (a confirmar). Em vez de travar a construção até os dois chegarem, o dono decidiu publicar como
**proposta**, com 3 opções de layout para o escritório escolher — o mesmo tratamento dado à nutricionista
(ADR-008) e à corretora (ADR-009), na mesma condição: **"Proposta · em avaliação"** só no índice.

- **`"proposta": true` passa a valer para `advocacia`** (antes, `validarAdvocacia` recusava com
  `exigir(!ehProposta(pagina), …)`; a demonstração de escritório fictício, ADR-006 original, continua com
  `demonstracao`, que é outra coisa). Publica com `noindex`, fora do sitemap, no índice com a etiqueta
  "Proposta · em avaliação" (ADR-005) — sem aviso na própria página: a proposta de advocacia nasce direto no
  regime da emenda 2 do ADR-008 (sem `siteOficial`, `propostaAvisaNoTopo()` é falso).
- **Razão social:** fora da proposta, continua exigindo "Advogados" **ou**, agora, "**Sociedade Individual
  de Advocacia**" (Lei 8.906/1994, art. 16, § 4º, incluído pela Lei 13.247/2016 — a sociedade unipessoal de
  advocacia). **Na proposta**, com o nome exato do contrato social ainda a confirmar, basta a razão social
  conter "**Advocacia**" — mensagem de erro cita a regra e diz que o nome está a confirmar.
- **Registro da sociedade:** fora da proposta, `sociedade.registros[]` continua obrigatório e não-vazio
  (Código de Ética e Disciplina da OAB, art. 44). **Na proposta**, pode ser uma lista vazia — o registro na
  OAB/BA da Specht ainda não chegou. O `verificar.mjs` não muda: `data-identificacao-oab` continua conferido
  contra o que existe no `pagina.json` (razão social, sócio administrador com a inscrição pessoal); com
  `registros` vazio, simplesmente não há registro de sociedade a conferir na identificação.
- **Revisão (regra 4):** `exigirRevisaoDeAdvocacia` passou a dispensar `revisao.oabConferidaEm` e
  `revisao.aprovadoPeloEscritorioEm` também na proposta (antes só dispensava na demonstração), mas continua
  exigindo `revisao.conferenciaOabEm` — a conferência pelo Provimento 205/2021 não espera a razão social
  final.
- **JSON-LD:** `dadosDaAdvocacia()` (`lib/seo.mjs`) só escreve `identifier` no `LegalService` quando
  `sociedade.registros` tem ao menos um item — `"identifier": []` é pior que omitir o campo (o validador do
  schema.org acusa um array vazio).
- **Saída da proposta:** quando o número de registro e o nome final da razão social chegarem e Rudolf
  aprovar a página, o dono preenche `sociedade.registros`, ajusta `sociedade.razaoSocial` para o nome
  definitivo (com "Advogados" ou "Sociedade Individual de Advocacia"), grava `oabConferidaEm` e
  `aprovadoPeloEscritorioEm`, e tira `"proposta": true` — a página vira indexável e entra no sitemap.
- Prova: `ferramentas/testes/advocacia.test.mjs` — passa (proposta real sem registros e sem
  `oabConferidaEm`/`aprovadoPeloEscritorioEm`, com "Sociedade de Advocacia" na razão social provisória,
  `noindex`, fora do sitemap, etiqueta no índice; publicação normal com "Sociedade Individual de Advocacia");
  reprova (proposta sem `conferenciaOabEm`; publicação normal sem registros; publicação normal com razão
  social só "Sociedade de Advocacia", sem "Advogados" nem "Sociedade Individual de Advocacia").

### Consequências da emenda
- O texto da regra 2 do `CLAUDE.md`, para uma proposta de advocacia, lê-se como na nutricionista e na
  corretora: a identificação mostra o que já existe (sócio administrador com a inscrição pessoal), e o que
  falta (registro da sociedade) fica pendente fora da página, não inventado nela.
- A Specht é a prova de que o tratamento de proposta (ADR-005/ADR-008/ADR-009) generaliza para advocacia sem
  um quinto campo especial — só os dois pontos (razão social e registro) que a norma da OAB torna mais
  rígidos que a de negócio, nutrição ou imóveis precisavam de regra própria.
