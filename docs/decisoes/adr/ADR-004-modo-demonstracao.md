# ADR-004 — Modo demonstração: página de médico fictício que nunca passa por real

- **Data:** 2026-09-22 · **Estado:** aceito (o dono delegou a decisão em 2026-09-22: "siga até o final")

## Contexto
O dono precisa mostrar a médicos o que o repositório entrega. A página de demonstração usa um médico
**fictício** (nome, CRM, RQE, contatos, formação, matriz de convênios) ao lado de **hospitais e planos
reais**, e **banco de imagem** no lugar do médico e do consultório. Três riscos:

1. **O Google** indexar um "Dr. Fulano" que não existe, com hospital real — e um paciente achá-lo.
2. **O paciente** que abrir o link (ou vê-lo compartilhado no WhatsApp) tomar a página por real, ligar
   para o número ou achar que o plano dele cobre naquele hospital.
3. **O precedente**: a exceção à regra 12 (banco de imagem) vazar para página de médico real.

As regras 1 e 4 não resolvem sozinhas: aqui **não há médico** para conferir CRM nem aprovar, e o
`publicar: true` precisa existir para o link direto funcionar.

## Decisão
`"demonstracao": true` no `pagina.json` liga o modo. Ele relaxa **só** o que depende de um médico
existir, e endurece o que evita que a página passe por real.

**Construção (`construir.mjs`, `lib/pagina.mjs`, `lib/seo.mjs`)**
- Força `<meta name="robots" content="noindex, nofollow">`, mesmo com `publicar: true`.
- Tira a página do **sitemap** e do **índice**. Ela só abre pelo link direto.
- Aceita `publicar: true` **sem** `crmConferidoEm` e **sem** `aprovadoPeloMedicoEm`.
- **Continua exigindo** `conferenciaCfmEm` e `atualizadoEm`: a demonstração é também o modelo de
  conformidade.
- Exige que o `resumo` (meta description, `og:description`, JSON-LD) contenha "demonstração": é o que
  aparece na prévia do link no WhatsApp, onde o aviso da página não aparece.

**Verificação (`verificar.mjs`) — em página com `"demonstracao": true`**
- Exige um elemento `data-aviso-demonstracao` **antes do `<h1>`**, sem `hidden`/`aria-hidden`, com o
  texto exato: *"Página de demonstração. Dr. Paulo de Tarso Lopes Pontes é um médico fictício; CRM, RQE e
  contatos são fictícios. Os hospitais e planos citados não têm relação com esta página."* — o nome vem
  do `pagina.json`, então o texto serve para qualquer demonstração futura.
- Exige `<title>` com "Demonstração".
- Toda `<img>` servida de `imagens/` (menos `imagens/marcas/`) fica dentro de um `<figure>` com
  `<figcaption>` contendo "Imagem ilustrativa" — decorativa ou não: o critério é a origem, não o `alt`.
- Exige `docs/paginas/<slug>/creditos-imagens.md` com **uma linha por imagem** de `site/<slug>/imagens/`:
  a linha cita o prefixo (`retrato`) que cobre as variações que o `npm run imagens` gera
  (`retrato-480.avif`, `retrato-800.webp`…). A social, se derivada de outra, fica dispensada
  (a linha da original diz que a social deriva dela). Logotipos em `imagens/marcas/` ficam fora (vão
  para `autorizacoes.md`).

**Página real (sem `demonstracao`)** — a regra 12 fica como está, e a verificação reprova os dois sinais
de banco de imagem que ela consegue ver: um `creditos-imagens.md` na pasta da página e a legenda
"Imagem ilustrativa". O resto continua com a conferência CFM (checklist, item C).

**Prova** — `ferramentas/testes/` com `node:test` (embutido no Node, sem dependência): monta um site de
teste numa pasta temporária e roda a construção e a verificação de verdade. Casos: passa; reprova sem o aviso;
reprova sem os créditos; reprova com imagem sem linha nos créditos; reprova com imagem sem a legenda;
reprova sem `conferenciaCfmEm`; e a página real com créditos reprova. `npm run testar`, e o
`verificar.yml` roda os testes. Para isso, `lib/arquivos.mjs` aceita a raiz por variável de ambiente
(`LANDING_RAIZ`); sem ela, nada muda.

## Consequências
- Uma página pode ir ao ar sem médico — **só** com o aviso no topo, `noindex`, fora do índice e do
  sitemap, e a prévia de link dizendo "demonstração".
- O endereço da demonstração é permanente como qualquer outro (regra 7): quem recebeu o link espera que
  ele continue abrindo.
- A exceção da regra 12 existe só com `demonstracao: true`. Transformar a demo em página real exige
  trocar **todas** as imagens, apagar o `creditos-imagens.md` e tirar a flag — e a verificação cobra os
  dois primeiros.
- `noindex` não impede alguém de achar a página por link. O aviso no topo é o que protege nesse caso.

## Alternativas
- **Médico real emprestado** (com autorização): mais convincente, mas a demo muda quando o médico muda,
  e expõe um médico em material comercial de terceiro.
- **Hospitais e planos fictícios**: zero risco de vínculo sugerido, mas a demo perde o que ela quer
  provar — a matriz convênio × local com nomes que o paciente de São Paulo reconhece.
- **Só `publicar: false` e mostrar pelo `npm run servir`**: não gera link para enviar ao médico.
