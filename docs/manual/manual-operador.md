# Manual do operador — pedir, aprovar e publicar uma página

> Para quem pede as páginas e fala com os médicos. Nada aqui exige saber programar.
> Última revisão: 2026-09-22.

## 0. Enviar o questionário ao cliente

Antes de pedir a página, mande um questionário curto para o cliente responder — evita ida e volta
depois (foto errada, cor recusada, número de registro faltando).

- Os textos prontos para colar no WhatsApp ou no e-mail estão em
  [`docs/questionario/enviar/`](../questionario/enviar/), um por profissão (médico, advocacia,
  nutrição, imóveis, negócio). O porquê de cada pergunta está no mestre,
  [`docs/questionario/questionario-cliente.md`](../questionario/questionario-cliente.md).
- Se o cliente **já mandou** parte da informação, **apague** do texto as perguntas já respondidas antes
  de enviar. Questionário que repete o que o cliente já disse irrita.
- Guarde as respostas em `entrada/<área>-<nome>/` (fora do git) do jeito que chegaram — mensagem, áudio
  transcrito, arquivo. O briefing cita cada fato como "questionário respondido em `<data>`".
- **Não use formulário on-line** (Google Forms, Typeform ou parecido) para colher as respostas: WhatsApp
  e e-mail já são o canal do cliente, e um formulário põe dado dele num terceiro sem necessidade.

## 1. Pedir a página

Abra o Claude Code na pasta do repositório e descreva o médico em uma frase, com tudo o que você já
souber:

> crie uma landing page para a Dra. Joana Ribeiro, dermatologista, CRM-BA 12345, RQE 6789, atende
> acne e queda de cabelo no consultório do Rio Vermelho e no Hospital X, pelos planos A e B e
> particular, WhatsApp (71) 99123-4567

Quanto mais completo o pedido, menos perguntas vêm depois. **O que o Claude nunca vai fazer:**
inventar CRM, RQE, hospital, convênio, formação ou número de pacientes. O que faltar, ele pergunta.

## 2. Responder as pendências

Ele devolve uma lista em dois grupos:

- **O que trava a página:** nome completo, CRM com a UF, RQE de cada especialidade, um contato.
- **O que melhora a página:** foto, endereços, horários, formação.

⌗ **Sobre o RQE:** sem o RQE de uma área, a página não pode chamar o médico de "especialista" nela.
Ela escreve "atende pacientes com…". Isso é regra do CFM, não escolha de estilo.

**Fotos e logotipo:** coloque os originais em `entrada/<área>-<nome>/` (prefixo da área: `med-`, `adv-`, `nut-`, `cor-`, `bus-`; ex.: `adv-rudolf-mateus`). Essa pasta não vai para o GitHub.
Use só foto real do médico, com autorização. Banco de imagem não serve.

## 3. Aprovar o visual

Antes de construir, ele mostra o plano: cores, fontes e como será a abertura. Aprove ou peça ajuste.
É bem mais barato mudar aqui do que depois.

## 4. Ver a página antes de ir ao ar

```sh
npm run servir
```

Abra `http://localhost:4173/<slug>/` no computador e no celular (na mesma rede). A página ainda não
está no ar: ela está com `publicar: false`.

## 5. A aprovação do médico — obrigatória

Mande ao médico o link local, capturas de tela, ou o PDF da página (Ctrl+P no navegador). Peça que ele
confira **por escrito**:

- nome, CRM e RQE;
- locais, endereços e convênios;
- telefone e WhatsApp (e que o número é o que ele quer público);
- **cada frase sobre ele**.

Guarde essa aprovação (mensagem ou e-mail) **fora do repositório**.

Confira também o CRM e o RQE na busca de médicos do portal do CFM.

## 6. Liberar a publicação

No arquivo `site/<slug>/pagina.json`, preencha as datas (formato `AAAA-MM-DD`):

```json
"publicar": true,
"atualizadoEm": "2026-09-25",
"revisao": {
  "crmConferidoEm": "2026-09-24",
  "conferenciaCfmEm": "2026-09-24",
  "aprovadoPeloMedicoEm": "2026-09-25"
}
```

Sem as três datas, a construção recusa. Isso é de propósito.

## 7. Publicar

Faça o merge do pull request no GitHub. Em cerca de um minuto, a página está em
`https://ivanclay.github.io/landing/<slug>/` e aparece no índice. Abra o endereço e confira.

## Mudanças depois de publicada

"Mudou de hospital", "aceita outro plano", "trocou o telefone": peça ao Claude pelo mesmo caminho. A
mudança passa pelo mesmo cuidado, e o médico confere de novo o que mudou.

**Nunca troque o endereço (slug) de uma página publicada.** Ele pode estar impresso em cartão, placa
ou QR. Se precisar mudar, o endereço antigo passa a levar ao novo.

## Tirar uma página do ar

Peça "tirar a página do Dr. X do ar". O endereço antigo passa a levar ao índice, ou à página que a
substitui.

## Página de demonstração (para mostrar a clientes)

Uma demonstração é a página de um **médico fictício**, feita para mostrar o que entregamos
([ADR-004](../decisoes/adr/ADR-004-modo-demonstracao.md)). Hoje existe uma:
`https://ivanclay.github.io/landing/dr-paulo-de-tarso/`.

- **Como mostrar:** mande o **link direto**, ou a raiz (`https://ivanclay.github.io/landing/`): o índice
  "Soluções" da Fábrica lista as demonstrações numa coluna e os produtos dos clientes na outra. Ela não aparece no sitemap nem no Google
  (`noindex`), de propósito.
- **O que ela sempre tem:** o aviso no topo ("Página de demonstração… médico fictício…"), "Demonstração"
  no título e na prévia do WhatsApp, e "Imagem ilustrativa" em cada foto. Não tire nada disso: a
  verificação reprova.
- **Para publicar uma demo** não é preciso CRM conferido nem aprovação de médico (não há médico), mas a
  **conferência CFM** continua obrigatória: preencha `revisao.conferenciaCfmEm` só depois de ler a
  `conferencia-cfm.md`.

### Transformar a demo numa página real
1. Crie a página **nova** no slug do médico real (`/drjoao/`), com o fluxo normal. Não reaproveite o
   slug da demo.
2. Troque **todas** as imagens pelas fotos reais do médico e do consultório (com autorização) e **não**
   copie o `creditos-imagens.md` (a verificação reprova banco de imagem em página real).
3. Tire `"demonstracao": true`, o aviso do topo e as legendas "Imagem ilustrativa".
4. Refaça o briefing com os fatos do médico: CRM, RQE, formação, locais, a matriz real plano × local,
   contatos, retorno, documentos de reembolso.
5. As três datas de `revisao`, com a aprovação do médico por escrito (regra 4).

## Demonstração de escritório de advocacia

Existe também uma demonstração de **escritório de advocacia fictício**
([ADR-006](../decisoes/adr/ADR-006-pagina-de-advocacia.md)): `https://ivanclay.github.io/landing/arruda-seixas/`.
Mostre pelo link direto, como a do Dr. Paulo.

- **A norma é outra:** no lugar do CFM, o **Provimento 205/2021 da OAB** e o Código de Ética da OAB. Na
  prática: nada de "um dos maiores", "referência", número de advogados, ranking, prêmio, clientes, casos,
  resultados, honorários ou "primeira reunião sem custo"; "atua em", nunca "especialista" sem título.
- **Identificação obrigatória:** razão social com o registro da sociedade em cada seccional
  (`OAB/SP 12.345`) e os sócios administradores com a inscrição, no rodapé; cada advogado citado com a
  própria inscrição. A verificação confere.
- **Para um escritório real:** página nova no slug do escritório; fatos com fonte no briefing; as três
  datas de `revisao` — inscrições conferidas no Cadastro Nacional dos Advogados (`oabConferidaEm`),
  conferência OAB (`conferenciaOabEm`) e a aprovação de um sócio administrador por escrito
  (`aprovadoPeloEscritorioEm`). Antes do primeiro, falta a skill de conferência da OAB (B-09).

## Página de nutricionista

Nutricionista não tem CRM: tem **CRN**, e a norma é o **Código de Ética do Nutricionista** (Res. CFN
599/2018) — [ADR-008](../decisoes/adr/ADR-008-pagina-de-nutricionista.md). Primeira: `emilia-kuwano`.

- **Preço de consulta não entra** (art. 57), ao contrário da página de médico. O valor é informado pelo
  WhatsApp. Também fora: promoção, sorteio, desconto, antes e depois (art. 58), garantia de resultado.
- **Identificação obrigatória:** nome, "Nutricionista" e a inscrição (`CRN-5 12345`). Sem o número, a
  página constrói para a prévia mas não passa na verificação.
- O rodapé diz que os resultados podem não ocorrer da mesma forma para todos (art. 55).
- **Para publicar:** inscrição conferida no CRN (`crnConferidoEm`), conferência CFN (`conferenciaCfnEm`) e a
  aprovação da nutricionista por escrito (`aprovadoPelaNutricionistaEm`).
- **Para mostrar a ela antes de aprovar:** publique como **proposta** (`"proposta": true` + o aviso no topo).
  Fica fora do Google e do sitemap, e no índice aparece com a etiqueta "Proposta · em avaliação". Quando ela
  aprovar: preencha as duas datas que faltam, tire `proposta` e o aviso — a página passa a ser indexada.

## Página de corretor(a) de imóveis

Corretor(a) de imóveis não tem CRM: tem **CRECI**, e a norma é a **Lei 6.530/1978** e o **Código de Ética
dos Corretores de Imóveis** (Res. COFECI 326/1992), com a Res. COFECI 458/1995 sobre o que o anúncio precisa
trazer — [ADR-009](../decisoes/adr/ADR-009-pagina-de-corretor-de-imoveis.md). Primeira: `karoline-melo`.

- **O que pedir:** nome completo, **CRECI com a UF** (e a letra "F" ou "J", se for o caso), o **CNAI**
  (Cadastro Nacional de Avaliadores Imobiliários) se ela tiver, e se atua por conta própria ou por uma
  **imobiliária** — nesse caso, o CRECI-J da imobiliária também pode precisar aparecer no anúncio.
- **A página anuncia a profissional, não imóveis.** Nada de foto, preço ou endereço de imóvel à venda ou
  para alugar: isso exige contrato escrito de intermediação com o proprietário (e, em loteamento ou
  incorporação, o número do registro) — é um pedido à parte, com ADR próprio.
- **Identificação obrigatória:** nome, "Corretor de Imóveis" ou "Corretora de Imóveis" e a inscrição
  (`CRECI-BA 36.265`). Sem o número, a página constrói para a prévia mas não passa na verificação.
- **Fora, sempre:** garantia de aprovação de crédito, de retorno ou de valorização do imóvel; "nome sujo",
  "sem consulta ao SPC/Serasa"; superlativo ("a melhor corretora", "nº 1"); pressão de urgência ("últimas
  unidades", "ainda hoje", "imperdível").
- **Para publicar:** inscrição conferida no CRECI da jurisdição (`creciConferidoEm`), conferência COFECI
  (`conferenciaCofeciEm`) e a aprovação da corretora ou do corretor por escrito (`aprovadoPelaCorretoraEm`).
- **Para mostrar antes de aprovar:** publique como **proposta** (`"proposta": true` + o aviso no topo,
  desde o início — diferente da nutricionista, não é preciso esperar um segundo pedido). Fica fora do
  Google e do sitemap, e no índice aparece com a etiqueta "Proposta · em avaliação". Quando ela aprovar:
  preencha as duas datas que faltam, tire `proposta` e o aviso.
- Ainda não há skill de conferência do COFECI: a conferência é feita pelo tech lead contra os textos das
  normas (backlog B-13).

## Proposta de site para um negócio (não médico)

Para refazer o site de uma empresa de saúde (consultoria, hub) antes da aprovação do dono
([ADR-005](../decisoes/adr/ADR-005-pagina-de-negocio-e-proposta.md)): `"tipo": "negocio"` e
`"proposta": true`. Ela vai ao ar com `noindex`, aviso no topo ("Proposta de novo site… Este não é o
site oficial…") e aparece na raiz em "Demonstrações e propostas". Hoje: `/hub-saude-negocios/`.

**Quando o cliente aprovar:** tire `"proposta"` e o aviso, preencha `revisao.aprovadoPeloClienteEm` e
decida o endereço (ficar aqui, indexável, ou ir para o domínio do cliente).
