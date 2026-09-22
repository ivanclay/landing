---
name: frontend-landing
description: 'Constrói as páginas estáticas do repositório em HTML, CSS e JavaScript puros, sem framework: HTML semântico e acessível, CSS em arquivo com os tokens do tema da página, JS só como melhoria (a página funciona inteira sem ele), caminhos sempre relativos, nenhum recurso de terceiros, imagens responsivas com width/height, fontes locais, e o orçamento de performance da regra 11. Conhece o contrato do repositório — marcador @gerado:cabecalho, data-identificacao-cfm, data-contato-topo, barra de contato, componentes compartilhados — e os links certos para WhatsApp, telefone, mapa e agendamento. Use para montar ou ajustar a página de um médico, o índice ou os componentes compartilhados, e em pedidos como "monta a página", "o botão não aparece no celular", "a página está lenta", "a foto está pulando", "ajusta o layout", "o menu não abre sem JS".'
---

# Frontend — a página como artesanato

Você transforma o plano de arte e o texto aprovado numa página que abre rápido num celular barato
com 4G, que um leitor de tela percorre sem tropeçar, e que continua de pé se o JavaScript falhar. Cada
coisa no seu arquivo; nada de fora.

## Perfil (leia primeiro)

`CLAUDE.md` — regras **6** (nada de terceiros), **8** (caminho relativo), **9** (separação e JS como
melhoria), **10** (identidade da página), **11** (orçamento), **12** (imagem real), **16** (nomes). O
plano em `docs/paginas/<slug>/direcao-de-arte.md` e o texto no `briefing.md`. Estrutura, padrões de
marcação e armadilhas em `references/estrutura-frontend.md`.

## As regras da casa

1. **HTML só estrutura.** Semântico: `header`, `nav`, `main`, `section` com `aria-labelledby`,
   `address`, `details`. Um `h1`. Títulos em ordem, sem pular nível.
2. **Cor e fonte só no `tema.css`** da página, pelos nomes do contrato (`base.css`). Layout no
   `pagina.css`. Espaço de `--espaco-*`, tipo de `--texto-*` — número mágico é achado.
3. **JS em arquivo, como melhoria.** Nada que esconda conteúdo esperando script. Comportamento comum
   em `assets/js/pagina.js`; próprio da página em `site/<slug>/pagina.js`.
4. **Nada de fora.** Fonte local (`npm run fontes <id>`), mapa por link, vídeo por link, ícone em SVG
   inline ou arquivo local.
5. **Caminho relativo** (`../assets/…`, `imagens/…`). Nunca `/…`.
6. **Imagem sempre com `alt`, `width` e `height`**; a primeira (LCP) com `fetchpriority="high"` e sem
   `loading="lazy"`; as outras com `loading="lazy"` e `decoding="async"`. Sempre por `npm run imagens`.
7. **Mobile primeiro.** Base para 360 px; `min-width` para crescer. Nada de rolagem lateral de 320 a
   1920 px.
8. **O contato é a coisa mais fácil de achar.** Na abertura (`data-contato-topo`), no fecho e na barra
   de contato do celular — com **o mesmo nome de ação** nos três.

## As peças que a verificação exige

| Peça | Onde | Quem confere |
|---|---|---|
| `<!-- @gerado:cabecalho -->` | no `<head>`, antes das folhas de estilo | construir.mjs (canonical, OG, JSON-LD) |
| `data-identificacao-cfm` | no rodapé, com nome, Médico/Médica, CRM-UF número, especialidade + RQE | verificar.mjs contra o pagina.json |
| `lang="pt-BR"`, `title`, `meta description`, `viewport`, um `h1` | `<head>` / corpo | verificar.mjs |
| `rel="noopener"` em todo `target="_blank"` | links | verificar.mjs |
| Esquemas `https:`, `tel:`, `mailto:` | links | verificar.mjs |

## Fluxo

1. Copie o esqueleto (`nova-pagina-medico-landing/assets/esqueleto/`) para `site/<slug>/`.
2. Traga as fontes do plano (`npm i -D @fontsource-variable/<id>` + `npm run fontes <id>`).
3. Otimize as imagens de `entrada/<slug>/` (`npm run imagens …`), incluindo a social (`--social`).
4. Escreva o `tema.css` (do plano), o HTML (do texto aprovado), o `pagina.css` (do layout).
5. `npm run verificar:rascunhos` até verde; `npm run servir` e **olhe** em 360, 768 e 1440 px, com
   teclado (Tab do começo ao fim) e com zoom de 200%.
6. Entregue ao `qa-landing` e ao `direcao-de-arte-landing` para a crítica.

## Quando mexer em `site/assets/`

É mudança em **todas** as páginas publicadas. Reconstrua, abra cada uma e registre no PR quais foram
conferidas. Componente novo só entra em `componentes.css` se **duas** páginas precisarem dele; senão,
mora no `pagina.css` de quem precisa.

## Definição de pronto

- [ ] `npm run verificar:rascunhos` verde.
- [ ] Zero `style=`, `<style>`, `on…=`, `<script>` sem `src`; zero recurso de fora; zero caminho absoluto.
- [ ] Cor e fonte só no `tema.css`; nenhum número mágico no `pagina.css`.
- [ ] Sem JS: todo conteúdo visível e todo contato funcionando.
- [ ] 320–1920 px sem rolagem lateral; Tab percorre tudo com foco visível; zoom 200% legível.
- [ ] Imagens otimizadas, com dimensões; LCP com prioridade.
