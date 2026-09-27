# Direção de arte — `emilia-kuwano`

## Ponto de partida

A marca já existe: as artes dela usam **terracota**, salmão, rosa claro e malva, ornamentos florais
simétricos, "padrão orgânico de linhas curvas" e **divisores em linha branca fina** (entrada, Referência
visual). A página não inventa outra identidade — traduz essa para a tela, com mais silêncio e mais tipo.

Nenhuma página do repositório usa terracota: as outras são verde-floresta (dr-paulo-de-tarso,
hub-saude-negocios), vermelho-institucional sobre cinza (arruda-seixas) e azul-cobalto (s-frontdesk).

## Paleta (contraste medido, WCAG AA)

| Token | Cor | Papel | Contraste |
|---|---|---|---|
| `--cor-fundo` | `#F7F1EC` linho | fundo | — |
| `--cor-superficie` | `#EFE4DC` | blocos | — |
| `--cor-texto` | `#2B1A14` café | texto | 14,9:1 no fundo |
| `--cor-texto-suave` | `#6A4B40` | apoio | 7,0:1 no fundo · 6,2:1 na superfície |
| `--cor-marca` | `#AB5639` terracota (a dela) | abertura, botão | branco 5,1:1 |
| `--cor-salmao` | `#E5997A` | fundo do retrato, numerais | café 7,3:1 |
| `--cor-rosa` | `#F2B8A6` | ornamento, bloco do preparo | café 9,7:1 |
| `--cor-malva` | `#9E8A91` | só ornamento (branco nela: 3,2:1 — nunca texto) | — |
| `--cor-noite` | `#4A2419` | rodapé | linho 11,7:1 · rosa 7,8:1 |
| `--cor-foco` | `#2B1A14` / `#FFF8F3` na terracota | foco visível | — |

## Tipos

- **Fraunces** (variável, eixo óptico, com itálico) — títulos e numerais. Serifa de contraste suave, com
  terminais arredondados: conversa com os ornamentos curvos da marca sem cair no "script" de salão de
  beleza. Nova no repositório.
- **DM Sans** — texto. Neutra, legível em 16 px no celular.

## Abertura (esboço)

```
┌───────────────────────────── terracota #AB5639 ─────────────────────────────┐
│ Emília Kuwano                                  Atendimento  Preparo  [WhatsApp] │
│                                                                              │
│ NUTRIÇÃO CLÍNICA E FUNCIONAL                 ╭──────────╮  ← linha branca fina │
│                                             ╱            ╲   que contorna o arco│
│ Emília                                     │   retrato    │                   │
│ Kuwano   (Fraunces, 2 linhas, branco)      │  (arco,      │                   │
│                                            │   salmão)    │                   │
│ Atendimento nutricional presencial e       │              │                   │
│ on-line, com acompanhamento semanal        └──────────────┘                   │
│ por e-mail entre as consultas.                                                │
│ [Agendar pelo WhatsApp]  [Enviar e-mail]                                      │
│ Emília Alves Kuwano · Nutricionista · CRN …                                   │
└──────────────────────────────────────────────────────────────────────────────┘
```

No celular: nome, retrato em arco (menor), texto, botões.

## O gesto

**A linha branca fina** das artes dela: um traço orgânico contínuo (SVG, `stroke` de 1,25 px) que
contorna o arco do retrato na abertura e reaparece como divisor entre seções — sempre a mesma linha, nunca
um ícone. E **numerais grandes em Fraunces itálico** no passo a passo do atendimento e no preparo da
bioimpedância, que são as duas coisas que só esta página tem.

## Seções

1. Abertura (terracota).
2. **Como funciona** — 4 passos numerados (reserva → anamnese e exames por e-mail → consulta →
   acompanhamento semanal). É sequência de verdade.
3. **Duas formas de atendimento** — presencial (com bioimpedância) e on-line, cada uma com o botão de
   agendar. **Sem preço** (art. 57).
4. **Antes da bioimpedância** — o preparo em 5 itens, sobre rosa claro, e as observações em destaque.
5. **Formação** — as três formações, em lista editorial.
6. **Onde atender e contato** — Clínica NEF, sala 311; WhatsApp e e-mail.
7. Rodapé café com a identificação do CRN, a frase de privacidade e a do art. 55.

## Imagem — duas aberturas para a curadoria

- **A — recorte sobre salmão:** o PNG sem fundo, achatado sobre o salmão da marca, no arco. Limpo,
  editorial, a cor da marca em volta dela.
- **B — foto com o ripado de madeira:** o JPG original, no mesmo arco. Mostra o ambiente real de
  trabalho (o painel ripado), mais quente, menos "estúdio".

A página nasce com a **A**; a **B** vai nas capturas para o dono escolher (memória: opções antes de
publicar).

## Revisto contra o genérico

- ✗ Verde-folha, folhinha, prato colorido, fita métrica, balança, "vida saudável" — clichês de
  nutrição: **fora**. A cor é a da marca dela, não a da categoria.
- ✗ Foto de banco de comida ou de "paciente feliz" (regra 12): **fora**. A única pessoa é ela.
- ✗ Logotipo imitado: o "EK" com maçã não veio em arquivo; a página **não** redesenha a marca dela —
  usa o nome em Fraunces.
- ✗ Tabela de preços em cards ("planos"): era o miolo da arte original e é vedada — virou "duas formas
  de atendimento", que diz o que cada uma inclui.
- ✓ O que é só dela: acompanhamento semanal por e-mail, bioimpedância com preparo, pré-avaliação antes
  da consulta.
