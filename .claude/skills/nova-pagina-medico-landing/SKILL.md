---
name: nova-pagina-medico-landing
description: 'Transforma um pedido em linguagem natural — "crie uma landing page para médico cardiologista, especialista em arritmia, que atende nos hospitais X, Y e Z pelos planos A, B e C" — numa página de alto nível publicada em /<slug>/ no GitHub Pages, conduzindo o fluxo inteiro com gates: briefing com a fonte de cada fato e as pendências, conferência de publicidade médica pela Resolução CFM 2.336/2023, plano de direção de arte revisto contra o genérico, HTML/CSS/JS construídos sobre o esqueleto do repositório, SEO local, verificação automática, QA com Lighthouse e o pull request. Nunca inventa CRM, RQE, hospital, convênio ou formação, e nunca marca a página para publicar sem a aprovação do médico. Use sempre que alguém pedir uma página, landing page, site ou "presença online" para um médico, médica, clínica de um médico ou consultório — mesmo sem a palavra landing — e também para refazer do zero a página de um médico que já existe.'
---

# Página nova de médico — do pedido ao pull request

Você recebe uma frase e entrega uma página que um médico teria orgulho de pôr na bio do Instagram — e
que o CRM dele não questionaria. As duas metades valem o mesmo: a página linda com uma frase vedada
expõe o médico; a página correta e genérica não converte e não justifica existir.

## Passo 0 — Leia o perfil

Leia `CLAUDE.md`. Governam aqui sobretudo as regras **1** (nada inventado), **2** (identificação CFM),
**3** (publicidade), **4** (nada vai ao ar sem o médico), **6** (nada de terceiros), **7** (slug
permanente), **10** (identidade é da página) e **11** (orçamento medido). Confira a **D-01**: se ainda
estiver aberta e esta for a primeira página, **avise** que o endereço vai ficar sob `/landing/` e que
trocar depois custa redirecionar.

## O fluxo (cada linha é uma skill; ◆ é gate — pare e espere o "segue")

| # | Etapa | Skill | Sai |
|---|---|---|---|
| 1 | Briefing: fatos, fontes, pendências, slug | `briefing-medico-landing` | `docs/paginas/<slug>/briefing.md` · `site/<slug>/pagina.json` com `publicar: false` |
| ◆ | **Gate 1 — pendências.** Mostre o que falta e pergunte **tudo de uma vez** | — | respostas do dono |
| 2 | Texto: estrutura de seções e redação dentro da norma | `publicidade-medica-cfm-landing` | rascunho do texto no `briefing.md` (seção Texto) |
| 3 | Plano de arte, revisto contra o genérico | `direcao-de-arte-landing` | `docs/paginas/<slug>/direcao-de-arte.md` |
| ◆ | **Gate 2 — plano.** Mostre a paleta, os tipos, o esboço da abertura e o gesto | — | aval ou ajuste |
| 4 | Construção | `frontend-landing` | `site/<slug>/index.html`, `tema.css`, `pagina.css`, `imagens/` |
| 5 | SEO local | `seo-local-landing` | `docs/paginas/<slug>/seo.md` |
| 6 | Conferência CFM do **construído** | `publicidade-medica-cfm-landing` | `docs/paginas/<slug>/conferencia-cfm.md` |
| 7 | Verificação + QA | `qa-landing` | `npm run verificar:rascunhos` verde · `docs/paginas/<slug>/qa.md` |
| 8 | Revisão de código e segurança | `revisor-codigo-landing` · `seguranca-privacidade-landing` | achados resolvidos |
| ◆ | **Gate 3 — antes do PR.** Mostre capturas (360 px e 1440 px), os números do Lighthouse e a conferência | — | aval |
| 9 | Branch `pagina/<slug>`, commit, PR com a lista do que o **médico** precisa aprovar | `publicacao-github-pages-landing` | PR aberto, CI verde |
| 10 | Documentação | `documentador-landing` | manuais e índice |

Envolva tudo com `registro-implementacao-landing` (início no passo 1, fim no passo 10), como o
techlead faria.

⌗ **A página entra no PR com `publicar: false`.** Ela é construída e vista com `npm run rascunhos`
(com `noindex`). Quem vira para `true` é o **dono**, depois que o médico aprovar — preenchendo as três
datas de `revisao` (regra 4). Pode ser no mesmo PR, antes do merge, ou num PR seguinte. Diga isso no
fim; não faça por ele.

## O pedido típico e o que ele não diz

Do pedido *"landing page para cardiologista, especialista em arritmia, atende nos hospitais X, Y, Z,
pelos planos A, B, C"* saem: especialidade, área, locais, convênios. **Não saem** e quase sempre faltam:

- **Nome completo, gênero gramatical, CRM e UF** — sem eles não há página (regra 2).
- **RQE de cada especialidade e área citada** — "especialista em arritmia" pede o RQE de
  Cardiologia **e** o da área de atuação (Eletrofisiologia/Arritmologia), ou vira "atende pacientes
  com arritmia" (regra 2).
- **Contato:** WhatsApp, telefone ou link de agendamento — é o único caminho da página ao paciente.
- **Endereço de cada local** e se atende em todos pelos mesmos convênios.
- **Foto real** e autorização de uso; logotipo do consultório, se houver.
- **Slug** desejado (proponha a partir do nome: `drjoao`, `drajoanaribeiro`).
- **Tom e público** (adultos? idosos? atletas? criança?) — muda o texto e a arte.

Pergunte **no gate 1, numa lista só**, e siga com o que já dá para fazer (texto educativo, plano de
arte) enquanto a resposta não vem. **Não preencha lacuna com palpite plausível** — um CRM de exemplo
que escapa para o ar é o pior defeito possível deste repositório.

## O esqueleto

`assets/esqueleto/` tem o `index.html` com a ordem das seções e o que cada uma precisa provar, o
`tema.css` com o contrato de tokens, o `pagina.css` vazio e o `pagina.json` modelo. Copie para
`site/<slug>/` e **substitua tudo** — todo `PENDENTE` trava a construção de propósito.

⌗ **O esqueleto é ordem, não desenho.** Seções podem sair (sem FAQ real, sem FAQ), mudar de ordem se o
plano de arte justificar, ou ganhar uma própria (um exame que o médico faz e que merece explicação).
Duas páginas do repositório com a mesma cara é achado do `direcao-de-arte-landing`.

## Definição de pronto

- [ ] `briefing.md` com a fonte de cada fato; nenhum `PENDENTE` na página.
- [ ] `pagina.json` válido, `publicar: false` até a aprovação do médico.
- [ ] Plano de arte aprovado no gate 2 e seguido — ou a divergência escrita.
- [ ] `npm run verificar:rascunhos` verde; avisos decididos na `conferencia-cfm.md`.
- [ ] Lighthouse no celular dentro do orçamento da regra 11, registrado no `qa.md`.
- [ ] PR aberto com o CI verde e, na descrição, **o que o médico precisa conferir** (nome, CRM, RQE,
      locais, convênios, contato, cada frase sobre ele).
- [ ] Registro fechado com o relatório.
