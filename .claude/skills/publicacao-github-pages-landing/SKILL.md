---
name: publicacao-github-pages-landing
description: 'Cuida de como o repositório ivanclay/landing vai para o ar no GitHub Pages: o fluxo branch → pull request → CI verificar → merge no main → workflow publicar (upload-pages-artifact + deploy-pages), a configuração única do repositório (Pages com fonte GitHub Actions, proteção do main com o status check), o endereço de site de projeto (/landing/<slug>/), o domínio próprio quando a D-01 for decidida (CNAME, DNS, HTTPS, urlBase), os redirecionamentos de slug, e o que fazer quando o deploy falha ou uma página precisa sair do ar. Pergunta antes de decidir infraestrutura. Use em "publica a página", "o deploy falhou", "quero domínio próprio", "tirar a página do Dr. X do ar", "mudar o endereço", "configurar o GitHub Pages".'
---

# Publicação no GitHub Pages

O ar é o `main`. Tudo que entra no `main` passou pelo `verificar` no PR e passa de novo no
`publicar` antes do upload — a mesma construção, a mesma verificação, sem `npm ci` (as ferramentas não
têm dependência).

## Perfil (leia primeiro)

`CLAUDE.md` — regras **4**, **7**, **8** e **15**; a **D-01**. Os workflows estão em
`.github/workflows/`; o que eles fazem e por quê, em `references/pages.md`.

## O fluxo de uma página

1. Branch `pagina/<slug>` a partir do `main` atualizado.
2. Commits `tipo(slug): frase -- referencias` (sem acento, sem atribuição de IA).
3. `npm run verificar` local — o mesmo do CI. Com página em rascunho: `npm run verificar:rascunhos`.
4. PR para o `main`. Na descrição: o que a página é, capturas, números do QA, **a lista do que o médico
   precisa conferir**, e se `publicar` está `false` (vai para o `main` sem ir ao ar) ou `true`.
5. CI `verificar` verde → merge (o dono decide o tipo; squash mantém o histórico limpo).
6. `publicar` roda sozinho; a URL sai no resumo do job (`environment: github-pages`). Abra e confira.

⌗ **Página em rascunho pode entrar no `main`**: a construção do CI ignora `publicar: false`, então ela
fica versionada e fora do ar até o dono virar a chave num PR seguinte.

## Configuração única (o dono faz, uma vez)

- [ ] **Settings › Pages › Source: GitHub Actions.**
- [ ] **Settings › Branches › main**: exigir PR, exigir o status check **`verificar`**, bloquear push
      direto e force push.
- [ ] **Settings › Actions › General**: permissões padrão do `GITHUB_TOKEN` só leitura (o workflow pede
      o que precisa).
- [ ] Primeiro deploy: rodar `publicar` pelo **workflow_dispatch** e conferir `https://ivanclay.github.io/landing/`.

## Tirar uma página do ar

O slug não fica órfão (regra 7). Num PR: `publicar: false` no `pagina.json` (a página continua
versionada) e o slug em `site.config.json › redirecionamentos` — apontando para a página que a
substitui, ou para `""` (o índice). Mas a pasta com o mesmo slug não pode existir junto do
redirecionamento: **mova** `site/<slug>/` para `site/_arquivo-<slug>/` (o `_` a tira da construção).

⌗ Se houver QR impresso com o endereço, pergunte se não é melhor uma página mínima, aprovada pelo
médico, com o aviso e o contato atual. Decisão do dono, registrada no `briefing.md`.

## Domínio próprio (D-01)

Pergunte antes: qual domínio, quem controla o DNS, se as páginas vão para a raiz (`/drjoao/`) do
domínio. Então: arquivo `CNAME` na saída (a construção precisa copiá-lo — mudança em `construir.mjs`,
com ADR), DNS (`CNAME` para `ivanclay.github.io` ou os `A`/`AAAA` do Pages no apex), "Enforce HTTPS", e
`site.config.json › urlBase` para o novo endereço. **Os endereços antigos** (`ivanclay.github.io/landing/<slug>/`)
continuam no ar? O GitHub redireciona site de projeto para o domínio próprio configurado — **confira
na hora**, com um QR antigo, antes de dar por feito (regra 13).

## Quando o deploy falha

Leia o log do job. `construir`/`verificar` falharam → é o mesmo erro do PR (alguém fez push direto?
a proteção do `main` está ligada?). `deploy-pages` falhou → Pages não está com fonte "GitHub Actions",
ou o ambiente `github-pages` tem regra de proteção de branch que exclui o `main`. Registre a causa em
`docs/decisoes/backlog.md` se for nova.

## Definição de pronto
- [ ] PR com CI verde e descrição completa; merge feito pelo dono.
- [ ] Deploy verde e a página aberta no endereço público, conferida.
- [ ] Configuração única conferida na primeira vez.
