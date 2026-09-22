# Estrutura e padrões de marcação

## Links de contato — os formatos certos

| Ação | Marcação | Armadilha |
|---|---|---|
| WhatsApp | `<a href="https://wa.me/5571991234567?text=Ol%C3%A1%2C%20gostaria%20de%20marcar%20uma%20consulta." target="_blank" rel="noopener">` | Número **sem** `+`, espaço ou traço (deriva do E.164 do `pagina.json`). Texto com `encodeURIComponent`. A mensagem **não** pede sintoma (regra 5) |
| Telefone | `<a href="tel:+557133334444">(71) 3333-4444</a>` | `tel:` com E.164; o texto visível formatado |
| Mapa | `<a href="https://www.google.com/maps/search/?api=1&amp;query=Hospital%20X%2C%20Salvador%20BA" target="_blank" rel="noopener">Ver no mapa</a>` | Nunca `iframe` (regra 6). `&` vira `&amp;` no HTML |
| Agendamento | `<a href="https://..." target="_blank" rel="noopener">Agendar online</a>` | Só o link que o médico deu; o sistema dele é terceiro, e o paciente sai da página ao clicar — é aceitável porque é comando dele |
| E-mail | `<a href="mailto:...">` | Só se o médico pedir; atrai spam |

## A abertura (LCP)

```html
<picture>
  <source type="image/avif" srcset="imagens/retrato-480.avif 480w, imagens/retrato-800.avif 800w" sizes="(min-width: 60rem) 40vw, 100vw">
  <source type="image/webp" srcset="imagens/retrato-480.webp 480w, imagens/retrato-800.webp 800w" sizes="(min-width: 60rem) 40vw, 100vw">
  <img src="imagens/retrato-800.jpg" srcset="imagens/retrato-480.jpg 480w, imagens/retrato-800.jpg 800w"
       sizes="(min-width: 60rem) 40vw, 100vw" width="800" height="1000"
       alt="Dr. João Almeida no consultório" fetchpriority="high" decoding="async">
</picture>
```
- `alt` descreve a pessoa e o contexto; não repete o `h1` inteiro.
- Preload só da **fonte do título**; a imagem já tem `fetchpriority`.

## Perguntas frequentes sem JS

```html
<details>
  <summary>Preciso de encaminhamento para marcar?</summary>
  <p>…</p>
</details>
```
Estilize `summary` com alvo ≥ 44 px e um marcador próprio (`summary::marker` ou `list-style: none` +
pseudo-elemento), mantendo o foco visível.

## Convenção de CSS

- Classes em PT-BR, bloco__elemento--variante: `.abertura__apoio`, `.local__nome`, `.botao--principal`.
- Especificidade baixa e plana; cuidado com seletor de atributo do `base.css`
  (`ul[role='list']` zera padding com especificidade 0,1,1 — use margin ou suba a especificidade de
  propósito, com comentário).
- `:where()` para estilos de base que devem ser fáceis de sobrescrever.
- Nenhuma cor fora do `tema.css`; `color-mix()` a partir dos tokens para variações.

## JavaScript

- `defer` sempre; nenhum `async` de terceiro (não há terceiro).
- Adicione `.js` no `<html>` (o `pagina.js` já faz) e use `.so-com-js` para o que só faz sentido com
  script.
- Sem biblioteca. `IntersectionObserver`, `details`, `dialog`, `scroll-snap` e CSS resolvem quase tudo.
- Animação ligada a rolagem: uma, no máximo, e desligada com `prefers-reduced-motion`.

## Orçamento (regra 11) — o que costuma estourar

| Sintoma | Causa comum | Correção |
|---|---|---|
| LCP alto | foto sem AVIF, sem `sizes`, ou com `loading="lazy"` | `npm run imagens`, `sizes` real, `fetchpriority="high"` |
| CLS | imagem sem `width`/`height`; fonte sem fallback parecido | dimensões; `size-adjust` no fallback se preciso |
| Peso | fonte com todos os eixos (`--opsz`) e itálico sem uso | só o eixo e o estilo usados |
| Acessibilidade < 100 | contraste de `--cor-texto-suave`; link sem nome; ordem de títulos | medir e corrigir no `tema.css`; `aria-label` só quando o texto não basta |
