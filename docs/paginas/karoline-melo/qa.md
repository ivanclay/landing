# QA — `karoline-melo`

- **Data:** 2026-09-27 · construído com `npm run rascunhos` (a página está com `publicar: false`), servido de
  `_site/` com `npx serve@14 _site -l 4173`.
- `npm run verificar:rascunhos`: **aprovado**, nenhum aviso da página (os 4 avisos são de outras páginas, já
  conhecidos). `npm run testar`: 40/40 (12 novos do tipo `imobiliario`).

## Lighthouse — celular (4G simulado), `npx lighthouse@12 http://localhost:4173/karoline-melo/`, 3 rodadas

| Performance | Acessibilidade | Boas práticas | SEO | LCP | CLS | TBT | Peso |
|---|---|---|---|---|---|---|---|
| 99 · 98 · 98 | 100 | 100 | 69 | 2,1 s | 0 | 0 ms | 188 KiB |

- **SEO 69 = o `noindex`** do rascunho (igual às outras páginas em rascunho/proposta); sai com a publicação.
- **Primeira medida reprovou o LCP (3,0 s):** a Newsreader com eixo óptico (129 + 144 KB) competia com o
  retrato. Trocada pela variável só de peso (58 + 65 KB): LCP 2,1 s, peso 341 → 188 KiB. Base de comparação na
  mesma máquina: `emilia-kuwano` 97, LCP 2,4 s.

## Na mão
- Larguras 320, 360, 800, 1440 e 1920 px sem rolagem lateral (capturas em `capturas/`; 800/320/1920 vistas
  e não guardadas).
- Celular: a navegação sai abaixo de 36rem (a barra fixa leva ao WhatsApp e ao Instagram); o retrato fica
  quadrado para o título caber na primeira tela.
- Contraste: pares da paleta medidos (ver `direcao-de-arte.md`); o ouro só em fio e numeral ≥ 24 px (três
  rubricas pequenas em ouro foram trocadas para ameixa na construção).
- HTML: um `h1`, h2/h3 em ordem; zero `style=`, `<style>`, `on…=`, script inline, recurso de fora ou caminho
  absoluto; todo `target="_blank"` com `rel="noopener"` e aviso "(abre em nova aba)".
- **Não feito:** leitor de tela (NVDA) e os links de WhatsApp/Instagram num celular real. Fazer antes de
  sair da proposta.
