# Créditos das imagens — `dr-paulo-de-tarso` (DEMONSTRAÇÃO, ADR-004)

Imagens de banco com licença livre, **só porque a página é de demonstração** (exceção da regra 12).
Originais em `entrada/dr-paulo-de-tarso/` (fora do git). Licença conferida na página de cada imagem
antes do download ("Free to use" — Pexels License). A verificação cobra uma linha por imagem de
`site/dr-paulo-de-tarso/imagens/`.

| Imagem | Arquivos | Original | Página da imagem | Autor | Banco | Licença | Baixada em | Onde foi usada |
|---|---|---|---|---|---|---|---|---|
| `retrato` | `retrato-480/720/1000` (.avif, .webp, .jpg) | `candidato-a1.jpg` (8167×5444), recorte 4:5 centrado no homem | https://www.pexels.com/photo/bearded-man-in-black-suit-jacket-4345160/ | Edmond Dantès | Pexels | [Pexels License](https://www.pexels.com/license/) | 2026-09-22 | Abertura. A imagem social `social.jpg` deriva desta: busto (cabeça e ombros) recortado do quadro horizontal tratado, 1200×630 |
| `consultorio` | `consultorio-400/640/900` | `candidato-b1.jpg` (4787×3191), recorte 4:5 na mesa (sai a TV da parede) | https://www.pexels.com/photo/wooden-table-with-chair-near-cupboard-in-study-room-6934240/ | Max Vakhtbovych | Pexels | [Pexels License](https://www.pexels.com/license/) | 2026-09-22 | Seção "Áreas com título de especialista" |
| `cidade` | `cidade-640/1100` | `candidato-d2.jpg` (3328×4160), faixa 16:9 do alto (sai a placa de rua) | https://www.pexels.com/photo/urban-landscape-with-trees-in-sao-paulo-38245331/ | Washington Gama | Pexels | [Pexels License](https://www.pexels.com/license/) | 2026-09-22 | Fecho |

## Tratamento de cor (o mesmo nas três)

Na preparação, antes do `npm run imagens` (script `sharp` pontual; parâmetros aqui para refazer):
saturação a 85% (`modulate({ saturation: 0.85 })`) e um véu `#1d4a3d` (o `--cor-marca`) a 14% em
`soft-light`. Deixa as três na mesma temperatura, puxando as sombras para o verde-garrafa da paleta.
Depois, `npm run imagens` tirou todo metadado (EXIF conferido: ausente).

## Candidatas descartadas (não publicadas)

Retratos a2 e a3 (a3 com estetoscópio e fora da faixa de idade), consultório b2 (HDR saturado),
exames c1–c3 (nenhum Holter ou ergométrico sem rosto; ecocardiograma sugeriria exame que o médico
fictício não faz), cidade d1 (torres de transmissão em primeiro plano). Autoria e licença de todas foram
conferidas na coleta; nenhuma é Unsplash+ nem Getty.

## Crédito na página

Rodapé: "Imagens: Edmond Dantès / Pexels · Max Vakhtbovych / Pexels · Washington Gama / Pexels." — a
Pexels License não exige crédito; a demonstração dá o exemplo.
