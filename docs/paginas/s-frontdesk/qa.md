# QA: S-FrontDesk (`s-frontdesk`)

- **Data:** 2026-09-23 · **O que foi medido:** o **construído** numa cópia temporária do `ivanclay/landing` @ `de88cdc`,
  com a nossa pasta e o briefing dentro (`node ferramentas/entrega/provar.mjs --landing <clone> --simular-publicacao
  --manter`), servido em `http://localhost:4174/s-frontdesk/`.
- **Navegador:** Chrome instalado (headless), via `playwright-core` (`ferramentas/entrega/qa-navegador.mjs`) e
  Lighthouse 12.8.2 (`npx lighthouse@12`, perfil celular padrão: Moto G, 4G lento simulado).

## Parecer

**Aprovada no orçamento da regra 11.** Uma pendência não técnica bloqueia a publicação: o número de WhatsApp
fictício (P2).

## Lighthouse no celular (3 rodadas)

| Rodada | Performance | Acessibilidade | Boas práticas | SEO | LCP | CLS | TBT | FCP |
|---|---|---|---|---|---|---|---|---|
| 1 | 99 | 100 | 100 | 100 | 1,8 s | 0 | 0 ms | 1,2 s |
| 2 | 99 | 100 | 100 | 100 | 2,0 s | 0 | 0 ms | 1,2 s |
| 3 | 99 | 100 | 100 | 100 | 1,8 s | 0 | 0 ms | 1,2 s |
| **Orçamento** | ≥ 90 | = 100 | ≥ 95 | = 100 | ≤ 2,5 s | ≤ 0,05 | — | — |

Peso total da página: 134 KiB. Pasta construída: cerca de 189 KB (o teto de lá é 900 KB). Detalhe em
`metricas/lighthouse-celular-2026-09-23.json`.
⌗ Medido em servidor local, sem a CDN do GitHub Pages. Repetir no endereço real depois do deploy (nota de entrega).

## Conferências no navegador: 48 de 48 ✔

| Área | O que foi conferido |
|---|---|
| Larguras 320 · 360 · 768 · 1024 · 1440 · 1920 | sem rolagem lateral **e** nenhum elemento passando da borda direita (esta segunda conferência pegou um defeito real, corrigido: a linha do agora com `100vw` alargava a coluna da abertura) |
| Primeira tela, 360 × 640 | o `<h1>` e o botão "Quero ser clínica piloto" aparecem sem rolar |
| Sem JS, 360 e 1440 px | a fotografia da demo (2 tabelas + os passos) no lugar, o app escondido, o aviso de fictício visível, 4 links de WhatsApp visíveis |
| Demo, recepção | agendar por telefone; "Agendar" desabilitado sem serviço e paciente; horário ocupado sem "Agendar" e com "Horário ocupado" (E-07); confirmar; Esc fecha o painel e devolve o foco; `aria-live` anuncia |
| Demo, paciente | profissional no formato do CFM; só horários livres; "Consulta agendada"; lembrete dentro do limite da E-04; o agendamento **aparece na recepção** com o canal App; cancelar devolve o horário; "Recomeçar" zera |
| Rede | carga: 12 requisições, todas do próprio site. Demo em uso: **0 requisições**. **Modo avião**: a demo continua funcionando. Nada em `localStorage`/`sessionStorage`. Console sem erros |
| Teclado | primeiro Tab em "Ir para o conteúdo"; o teclado alcança o botão de contato, a demo (abas com setas), "Pular a demonstração" e as perguntas; anel de foco ≥ 2 px em tudo |
| `prefers-reduced-motion` | o traço do marca-texto aparece sem animar; rolagem `auto` |
| Fuso (E-06) | num aparelho em Tóquio, a linha do agora mostra a hora de `America/Bahia` |

## Capturas (`capturas/`)

`360-primeira-tela.png` · `360.png` · `360-sem-js.png` · `768.png` · `1440-primeira-tela.png` · `1440.png` ·
`1440-sem-js.png` · `1440-demo-recepcao.png` · `1440-demo-paciente.png`.
⌗ Nas capturas de página inteira (`360.png`, `768.png`), a **barra de contato fixa** aparece no meio da página, na
altura da viewport original. É efeito da captura. Na tela real, ela fica escondida enquanto o botão da abertura
está visível (`../assets/js/pagina.js` de lá) e aparece depois, presa ao rodapé.

## Crítica visual e o que mudou

- A régua cortava seco na base da abertura ("15h" pela metade): as pontas ganharam uma máscara em degradê.
- "Faltou" usava o vermelho da linha do agora, que o plano reserva só para ela. Passou a borda dupla em tinta, mais o
  risco no nome.
- Na aba do paciente, o celular ficava sozinho numa faixa larga. Ganhou ao lado a nota "Experimente: agende para
  hoje e depois abra a aba da recepção".
- `<title>` com 75 caracteres foi encurtado para 61.

## Não verificado nesta sessão (a fazer por gente)

- **Leitor de tela real** (NVDA ou TalkBack) percorrendo a demo. A árvore de acessibilidade e o axe do Lighthouse
  passaram, mas não substituem a escuta.
- **Zoom de 200%** conferido só pelas larguras equivalentes (320 px), não com zoom do navegador.
- **Links de WhatsApp num celular de verdade**, e só depois de o número real entrar.
- **Lighthouse no endereço publicado**, depois do deploy.

## Casos que reprovam (prova de que as checagens pegam o defeito)

Rodados na cópia temporária, com a pasta alterada **só lá**:

| Caso | `verificar` de lá | Checagem daqui |
|---|---|---|
| `fetch('dados.json')` no `demo.js` e aviso sem "com dados fictícios" | **aprova** (não é o papel dele) | ✗ `demo.js: usa fetch(` · ✗ `a moldura [data-demo] não tem o aviso` |
| `style=` no HTML e "CRM-BA 123456" no rodapé | ✗ `atributo style= — CSS mora em arquivo (regra 9)` | ✗ `"CRM-BA 123456": registro de profissional na demo só com 000000 (E-09)` |
| "Reduz faltas." no texto e um paciente renomeado só no `demo.js` | aprova | ✗ `"reduz" — resultado sem medição` · ✗ `a fotografia da demo está defasada do demo.js` |

O primeiro caso é a razão de a checagem daqui existir: o `verificar` de lá não conhece a demo.
