---
name: revisor-codigo-landing
description: 'Revisor(a) de código focado em artesania e manutenibilidade do HTML, CSS e JavaScript das páginas e das ferramentas Node do repositório — não em segurança, CFM ou Lighthouse (isso é de outras skills). Faz uma passada independente: HTML semântico e enxuto, CSS com especificidade plana e sem número mágico, cor só no tema.css, componente compartilhado só quando dois precisam, JS mínimo e em arquivo, nomes com intenção em PT-BR, arquivo com o nome do que contém, código morto e comentário-ruído, e nas ferramentas: função curta, erro com mensagem que diz a regra, nada de dependência nova sem razão. Use antes de fechar uma página ou uma mudança em site/assets/ ou ferramentas/, e em "revisa esse código", "está limpo?", "dá para simplificar?".'
---

# Revisão de código — como quem não escreveu

Você lê procurando o que o autor racionalizou. Seu escopo é **legibilidade, manutenção e
padronização**. Quando topar com algo de outra área, **aponte e delegue**: frase de publicidade →
`publicidade-medica-cfm-landing`; terceiro ou dado → `seguranca-privacidade-landing`; número de
Lighthouse → `qa-landing`; "está genérico" → `direcao-de-arte-landing`.

## Perfil (leia primeiro)

`CLAUDE.md` — regras **9**, **10** e **16**; a referência de padrões em
`frontend-landing/references/estrutura-frontend.md`.

## HTML
- Semântica certa (`nav`, `address`, `details`, listas de verdade); `div` só para layout.
- Nada repetido que devia ser estrutura única; nenhum atributo `aria` que duplica o que o HTML já diz.
- Títulos em ordem; um `h1`; `section` com `aria-labelledby`.
- Comentário de guia do esqueleto apagado.

## CSS
- Cor e família **só** no `tema.css` (regra 10). Espaço e tipo pelos tokens do `base.css`.
- Especificidade plana; nada de `!important` fora do `base.css` (reduced-motion e utilitários).
- Nenhuma regra que se cancela com outra (o clássico `.secao` × `.fecho` brigando por padding).
- Mobile primeiro com `min-width`; breakpoints que coincidem com o conteúdo, não com aparelhos.
- Nada morto: seletor que não casa com nada no HTML é achado (procure com grep).

## JS
- Existe? Precisa existir? CSS ou HTML resolveria (`details`, `:has`, `scroll-snap`)?
- Sem biblioteca; `defer`; nada que esconda conteúdo sem JS.

## Ferramentas (`ferramentas/*.mjs`)
- Sem dependência (o CI roda sem `npm ci`) — dependência nova quebra esse acordo e pede ADR.
- Função curta; nome com intenção; a mensagem de erro **diz a regra** e onde corrigir.
- Mudou uma verificação? Há um caso que reprova e um que passa, rodados e descritos no PR.

## Achado (`REV-NNN`)

```markdown
# REV-004 — Cor digitada no pagina.css (drjoao)
Severidade: Alta
Local: site/drjoao/pagina.css:42
Problema: `color: #1d3b4a` fora do tema.css (regra 10).
Sugestão: usar --cor-texto ou criar o token no tema.css.
Delegado? não
```
Severidades: **Bloqueante** (quebra regra verificável que o CI não pegou) · Alta · Média · Baixa.

## Definição de pronto
- [ ] Nenhum Bloqueante ou Alto em aberto.
- [ ] O que era de outra área foi delegado.
