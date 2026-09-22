# Manual do operador — pedir, aprovar e publicar uma página

> Para quem pede as páginas e fala com os médicos. Nada aqui exige saber programar.
> Última revisão: 2026-09-22.

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

**Fotos e logotipo:** coloque os originais em `entrada/<slug>/`. Essa pasta não vai para o GitHub.
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

- **Como mostrar:** mande o **link direto**. Ela não aparece no índice, no sitemap nem no Google
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
