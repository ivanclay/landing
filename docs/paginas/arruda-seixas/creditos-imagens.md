# Créditos das imagens — `arruda-seixas` (DEMONSTRAÇÃO, ADR-004 e ADR-006)

Imagens de banco com licença livre (Pexels), **só porque a página é de demonstração** (exceção da regra 12).
As pessoas das fotos **não** são os sócios fictícios: são modelos de banco, e cada foto sai na página com a
legenda "Imagem ilustrativa". Licença conferida na página de cada imagem em 2026-09-23 ("Free to use" —
[Pexels License](https://www.pexels.com/license/), que permite editar). Originais em `entrada/arruda-seixas/`
(fora do git). O autor é o da página da foto (em dois casos a listagem da busca mostrava outro nome).

| Imagem | Arquivos | Página da imagem | Autor | Onde foi usada |
|---|---|---|---|---|
| `predio` | `predio-480/800/1000` (.avif, .webp, .jpg) | https://www.pexels.com/photo/low-angle-shot-of-a-building-perspective-with-white-and-black-exterior-3137040/ | Adrien Olichon | Abertura (4:5 no desktop, 3:2 no celular) |
| `socio-helena` | `socio-helena-320/640` | https://www.pexels.com/photo/woman-in-black-dress-shirt-8871934/ | Mikhail Nilov | Sócios — Helena Arruda |
| `socio-otavio` | `socio-otavio-320/640` | https://www.pexels.com/photo/professional-portrait-of-mature-businessman-29598497/ | Alican | Sócios — Otávio Seixas |
| `socio-marina` | `socio-marina-320/640` | https://www.pexels.com/photo/professional-woman-in-black-suit-portrait-34381971/ | Zoe Galarza | Sócios — Marina Kfouri Lage |
| `socio-caio` | `socio-caio-320/640` | https://www.pexels.com/photo/a-man-in-a-suit-wearing-an-eyeglasses-10657877/ | Ahmed Elwakel_ph | Sócios — Caio Bettencourt Nunes |
| `socio-beatriz` | `socio-beatriz-320/640` | https://www.pexels.com/photo/brunette-woman-in-suit-posing-with-pen-in-hands-27015641/ | Eric Moura | Sócios — Beatriz Farah Ondina |
| `socio-rafael` | `socio-rafael-320/640` | https://www.pexels.com/photo/a-man-in-a-suit-and-tie-standing-in-front-of-a-bar-23496902/ | Vitaly Gariev | Sócios — Rafael Tessitore |
| `socio-livia` | `socio-livia-320/640` | https://www.pexels.com/photo/professional-woman-smiling-in-smart-suit-36819484/ | Speak Media Uganda | Sócios — Lívia Guaraciaba Mendes |
| `socio-tomas` | `socio-tomas-320/640` | https://www.pexels.com/photo/a-portrait-of-a-businessman-8428101/ | Kampus Production | Sócios — Tomás Albernaz Vieira |
| `socio-juliana` | `socio-juliana-320/640` | https://www.pexels.com/photo/a-woman-in-a-business-suit-smiling-27086922/ | Helena Lopes | Sócios — Juliana Pacheco Sá |
| `socio-eduardo` | `socio-eduardo-320/640` | https://www.pexels.com/photo/man-in-suit-17582358/ | Sandro Tavares | Sócios — Eduardo Mafra Lins |

A imagem social (`social.jpg`) é tipográfica, sem foto.

## Tratamento (o mesmo em todas)

Recorte 4:5 no busto (parâmetros `cx`, `top`, `wf` por foto: centro horizontal, topo e largura, em fração
do original), 800×1000, **preto e branco** (`grayscale()`), contraste `linear(1.08, -8)`; o prédio, 1440×1800
com `linear(1.1, -10)`.
Recortes usados (`cx`/`top`/`wf`): helena .50/.05/.80 · otavio .55/.10/.85 · marina .50/.05/.80 · caio .50/.03/.85 ·
beatriz .55/.05/.80 · rafael .52/.00/.45 · livia .45/.10/.60 · tomas .50/.00/.52 · juliana .45/.12/.70 · eduardo .50/.04/.80. O P&B põe dez fotógrafos diferentes na mesma luz — é o que faz a grade ler como um
escritório só. Depois, `npm run imagens` (sem EXIF).

## Descartadas

- Tomás, 1ª escolha (Pavel Danilyuk, 7519019): relógio grande em primeiro plano — **ostentação de bem**
  (Provimento 205/2021, art. 6º, parágrafo único).
- Eduardo, 1ª escolha (28426646): o recorte de busto deixava o rosto pequeno no pé do quadro.
- Da prancha de ~60 candidatas: fotos de moda (pose de passarela, smoking, gravata-borboleta), com
  símbolos de justiça (estátua, balança, martelo — clichê do plano de arte), com logotipo ou placa legível
  ("Law Offices"), e fachadas azuis de vidro (brigam com a paleta).
