# Tabela de projetos — Landing (páginas de profissionais no GitHub Pages)

> **Última atualização:** 2026-09-29 09:39 (UTC−03:00)
> **Atualizado por:** Claude Opus 5.5 · Ivan C M Moura
> **Referências:** perfil e regras em [`CLAUDE.md`](../CLAUDE.md) (§5 decisões abertas, §8 delegação e custo) · índice em [`indice.md`](indice.md) · registro por segmento em [`metricas/implementacoes.csv`](metricas/implementacoes.csv) · delegações em [`metricas/delegacoes.csv`](metricas/delegacoes.csv)

**Resumo:** 0 em andamento · 8 realizadas (ajuste do hub-saude-negocios: faixa de clientes) · 0 pendentes · 1 bloqueado (rudolf-specht: 3 opções publicadas como proposta, aguarda a escolha do cliente) · decisões abertas no `CLAUDE.md` §5 (D-01, D-03 a D-06)

---

## Como manter este documento (regras para pessoas e agentes de IA)

1. **Toda alteração atualiza o cabeçalho**: data e hora `AAAA-MM-DD HH:MM (UTC−03:00)` **lidas do `date` ou do `git log`, nunca escritas de cabeça**, quem atualizou (`<modelo> · <desenvolvedor>`) e o resumo de contagens.
2. **Toda alteração ganha uma linha no Histórico** (seção 8). O histórico só cresce; não se reescreve.
3. **Um projeto só existe em uma seção por vez.** Ciclo: *Pendentes* → *Em andamento* → *Realizadas*. Parado esperando o dono, o cliente ou um documento: *Bloqueados*, e volta quando destravar.
4. **Um projeto = uma página nova ou uma mudança com nome** (índice, ferramentas, tipo novo). Os artefatos ficam em `docs/paginas/<slug>/` (`CLAUDE.md` §6); esta tabela é o resumo. Um **ajuste** numa página já realizada entra como linha própria em *Realizadas* (`<slug> · ajuste`).
5. **Branch e merge** (`CLAUDE.md` regra 15 e a preferência do dono): branch `pagina/<slug>` ou `ajuste/<assunto>` a partir da `main`; ao entregar, merge `--ff-only` na `main`, push, branch apagada. Página de cliente real: **o dono vê antes de publicar**.
6. **Medido e estimado nunca na mesma tabela** (`CLAUDE.md` §8). Tempo e custo só entram em *Realizadas* se medidos pelo `registro-implementacao-landing` (`ccusage`, `implementacoes.csv`); senão `—`. Parcial de projeto em andamento vai na observação, dito como parcial.
7. **Quem atuou:**
   - **Modelo**: o coordenador seguido dos executores com o número de tarefas, ex. `Claude Opus 5.5 + Sonnet 5 ×7`. O modelo que conta é o que o `tokens-por-agente.mjs` mostra, não o apelido do agente. Não confirmável: `não confirmado`.
   - **Desenvolvedor**: em *Realizadas*, o autor dos commits (`git log --format='%an'`); em *Em andamento*, quem conduz a sessão (`git config user.name`).
   - **Modelo sugerido**: pela tabela do `CLAUDE.md` §8 (Opus orquestra e julga; Sonnet constrói e faz QA; Haiku faz o mecânico).
8. **Toda tarefa delegada tem uma linha em [`metricas/delegacoes.csv`](metricas/delegacoes.csv)** (projeto, tarefa, executor, modelo, resultado, tentativas). A seção 3 resume o projeto em andamento; os commits não levam atribuição de IA, então esta tabela e o CSV são o único registro de quem fez o quê.
9. **Pendências encontradas num projeto** (fato sem fonte, conferência no conselho, teste não feito) entram na seção 4 com o destino. Quando fecham, saem de lá e o Histórico diz onde fecharam.
10. **Esforço** é classificação, não medida (escala no `techlead-landing`): mora em coluna própria, rotulada, e não se soma.

**Legenda:** Dificuldade de ●○○○○ (ajuste) a ●●●●● (mudança transversal com QA de todas as páginas)

---

## 1. Em andamento

| Projeto | O que é | Início | Branch | Modelo | Desenvolvedor | Modelo sugerido | Observação |
|---|---|---|---|---|---|---|---|
| `rudolf-specht` | Escolha de uma das 3 opções e os ajustes do Rudolf; razão social e registro da sociedade na OAB/BA; `oabConferidaEm` (dono, no CNA). Parcial: 29 min, US$ 15,96 (1 segmento) | ADR-006 (emenda 2026-09-28), [checkpoint](paginas/rudolf-specht/checkpoint.md) | — | — | — | — | — |

## 2. Pendentes — **estimativa**

Nenhum projeto pedido e não começado.

| Ordem | Projeto | O que entrega | Branch | Dificuldade | Esforço est. | Custo est. | Modelo sugerido | Observação |
|---|---|---|---|---|---|---|---|---|
| — | — | — | — | — | — | — | — | — |

---

## 3. Delegações do último projeto ([`delegacoes.csv`](metricas/delegacoes.csv))

`questionario-cliente` (e o ajuste da `karoline-melo`, feito em paralelo na mesma sessão): 2 tarefas, 0 devolvidas, 0 escaladas.

| Tarefa | Executor | Modelo | Resultado |
|---|---|---|---|
| Blocos de nutrição, imobiliário e negócio + textos de envio + manual do operador + índice | agente | Sonnet 5 | aceita; frase sobre a Res. CFN 760/2023 corrigida pelo coordenador para bater com o ADR-008 |
| Karoline: "Fotógrafa, Corretora e Avaliadora de Imóveis" + CRECI/CNAI na abertura e no rodapé | agente (worktree) | Sonnet 5 | aceita; manteve "CRECI-BA" (o `verificar` exige a UF); publicada |

As delegações dos projetos anteriores: `karoline-melo` 7 tarefas (Sonnet 5; 1 devolvida pelo dono), no [relatório](paginas/karoline-melo/metricas/relatorio.md); `emilia-kuwano` 3 tarefas (3 layouts, Opus 5.5 — pela regra de hoje seriam Sonnet), no [relatório](paginas/emilia-kuwano/metricas/relatorio.md); `dr-paulo-de-tarso` e `hub-saude-negocios` tiveram agentes de coleta **não registrados** (antes da regra "o custo conta todos os agentes").

## 4. Pendências e lacunas encontradas

| # | Encontrado em | Pendência ou lacuna | Destino |
|---|---|---|---|
| 2 | karoline-melo, norma | Lei 6.530/1978 e CDC lidos de espelhos (planalto.gov.br recusou conexão) | Revalidar na fonte oficial (B-16) |
| 3 | karoline-melo, conferência | Se ela atua por uma imobiliária, o CRECI-J pode ter de aparecer | Perguntar à corretora |
| 4 | karoline-melo, QA | Leitor de tela (NVDA) e links de WhatsApp/Instagram num celular real não feitos | Antes de sair da proposta |
| 5 | karoline-melo, dono | Gravar leads (formulário + banco): esbarra nas regras 5 e 6 e na LGPD | ADR se o dono quiser (Cloudflare Worker + D1 proposto) |
| 6 | emilia-kuwano | CRN e aprovação da nutricionista pendentes (`crnConferidoEm`, `aprovadoPelaNutricionistaEm`) | Saída da proposta |
| 7 | geral | Não existe skill do CFN nem do COFECI; a conferência é do coordenador | B-13 |

---

## 5. Realizadas — **medido**

| Projeto | O que entregou | Concluído em | Commit | Modelo | Desenvolvedor | Modelo sugerido | Tempo | Custo |
|---|---|---|---|---|---|---|---|---|
| `fundacao` | Ferramentas, CI, time de skills, documentação (ADR-001 a 003) | 2026-09-22 20:40 | `dc6d1c8` | não confirmado | Ivan C M Moura | — | — | — |
| `dr-paulo-de-tarso` | Demonstração de cardiologista + modo demonstração nas ferramentas (ADR-004) | 2026-09-22 21:48 | `67d26b9` | Claude Opus 5.5 + agentes não registrados | Ivan C M Moura | Claude Opus 5.5 | 24 min | US$ 9,07 |
| `hub-saude-negocios` | Proposta de novo site de negócio (ADR-005) | 2026-09-22 21:16 | `dcdb5c8` | Claude Opus 5.5 + agente não registrado | Ivan C M Moura | Claude Opus 5.5 | 19 min | US$ 9,81 |
| `arruda-seixas` | Demonstração de escritório de advocacia (ADR-006), 2 ajustes de abertura | 2026-09-23 07:15 | `dc5a40c` | Claude Opus 5.5 | Ivan C M Moura | Claude Opus 5.5 | 45 min (3 segmentos) | US$ 14,36 |
| `indice` | Vitrine "Soluções" da Fábrica em duas colunas (ADR-007) | 2026-09-23 11:26 | `72ff346` | Claude Opus 5.5 | Ivan C M Moura | Claude Sonnet 5 | 13 min (só o 1º segmento medido) | US$ 5,76 |
| `s-frontdesk` · publicação | Página de pré-lançamento entregue pronta + rodapés em colunas | 2026-09-23 11:05 | `c28f4c8` | não confirmado | Ivan C M Moura | Claude Sonnet 5 | 5 min | — (só tempo) |
| `emilia-kuwano` | Nutricionista real (ADR-008), 3 layouts, publicada como proposta | 2026-09-27 16:38 | `badba5b` | Claude Opus 5.5 + Opus 5.5 ×3 | Ivan C M Moura | Claude Opus 5.5 | 52 min (3 segmentos) | US$ 15,83 |
| `emilia-kuwano` · ajuste | Aviso de proposta tirado da página (só a etiqueta do índice) | 2026-09-27 21:15 | `62d71e5` | Claude Opus 5.5 | Ivan C M Moura | Claude Sonnet 5 | — (dentro da sessão da karoline-melo) | — |
| `karoline-melo` | Corretora de imóveis real (ADR-009, tipo `imobiliario`), 3 layouts, opção 3 escolhida e **aprovada** pela cliente, com 4 ajustes; publicada fora da proposta | 2026-09-27 22:20 | `af8a67a` | Claude Opus 5.5 + Sonnet 5 ×7 | Ivan C M Moura | Claude Opus 5.5 | 89 min (3 segmentos) | US$ 30,74 |
| `questionario-cliente` | Questionário do cliente enviado antes da página: mestre com o porquê de cada pergunta + textos de envio por profissão (médico, advocacia, nutrição, imóveis, negócio); passo 0 no manual do operador e nas skills de briefing e página nova | 2026-09-28 09:33 | (este) | Claude Opus 5.5 + Sonnet 5 ×2 | Ivan C M Moura | Claude Opus 5.5 | 10 min | US$ 3,06 (inclui o agente do ajuste abaixo) |
| `karoline-melo` · ajuste | "Fotógrafa, Corretora e Avaliadora de Imóveis" e "CRECI-BA 36.265 | CNAI 58.909" na abertura e no rodapé | 2026-09-28 09:31 | `3068151` | Sonnet 5 | Ivan C M Moura | Claude Sonnet 5 | — (dentro da sessão do questionario-cliente) | — |
| `hub-saude-negocios` · ajuste | Seção de clientes: opção 3 (faixa de logotipos em movimento) na página principal; páginas de escolha apagadas | 2026-09-29 09:39 | (este) | Claude Opus 5.5 | Ivan C M Moura | Claude Sonnet 5 | 3 min | — (ccusage sem preço para Opus 5.5) |
| **Total** | **8 projetos + 3 ajustes** | | | | | | **260 min** | **US$ 88,63** (sem o ajuste de 29/09) |

Reproduzir: somar por `slug` as colunas `duracao_min` e `custo_usd` de `metricas/implementacoes.csv`.

### Esforço — **classificação**, não medida

| Projeto | Dificuldade | Por quê |
|---|---|---|
| `dr-paulo-de-tarso` | ●●●○○ | primeira página + modo demonstração |
| `hub-saude-negocios` | ●●●○○ | tipo negócio e modo proposta |
| `arruda-seixas` | ●●●●○ | tipo advocacia + 4 opções de abertura |
| `indice` | ●●●○○ | índice novo |
| `s-frontdesk` · publicação | ●○○○○ | página entregue pronta |
| `emilia-kuwano` | ●●●●○ | tipo nutrição + 3 layouts inteiros |
| `karoline-melo` | ●●●●○ | tipo imobiliário, norma do COFECI do zero, 3 layouts depois da recusa |
| `questionario-cliente` | ●●○○○ | só documentação e processo; blocos de norma de cinco profissões a partir das conferências existentes |
| `karoline-melo` · ajuste | ●○○○○ | uma linha de identificação em dois lugares |
| `hub-saude-negocios` · ajuste | ●○○○○ | opção já construída e escolhida, levada para a página principal |

---

## 6. Bloqueados — decisão do dono ou do cliente

| Projeto | O que falta | Ref. |
|---|---|---|
| — | nenhum agora | — |

Decisões que valem para **todos** os projetos: **D-01** (domínio próprio, antes do primeiro QR impresso), D-03 a D-06 (`CLAUDE.md` §5).

---

## 7. Ritmo

| Medida | Valor |
|---|---|
| Projetos realizados e medidos | 5 com custo (dr-paulo-de-tarso, hub-saude-negocios, arruda-seixas, indice, emilia-kuwano) |
| Média por página nova com tipo novo | 3 páginas (hub, arruda, emilia): 116 min · US$ 40,00 → ~39 min e ~US$ 13,33 cada |
| emilia-kuwano | 52 min · US$ 15,83 — os 3 agentes de layout em Opus (hoje seriam Sonnet) |
| karoline-melo (1º segmento) | 78 min · US$ 26,90 — Sonnet 5 US$ 16,94 (7 agentes) · Opus 5.5 US$ 9,97 (`npx ccusage@latest session --json`, sessão `4a17a855…`) |

---

## 8. Histórico de atualizações

| Data e hora | Modelo | Desenvolvedor | O que mudou |
|---|---|---|---|
| 2026-09-27 21:20 | Claude Opus 5.5 | Ivan C M Moura | Primeira versão da tabela de projetos da Landing, a pedido do dono: um projeto por página ou mudança com nome, tempo e custo do `ccusage` com a quebra por agente do `tokens-por-agente.mjs`, esforço em tabela separada, `delegacoes.csv` novo. Substitui o `metricas/projetos.md` (apagado). Realizadas reconstruídas do `implementacoes.csv` e do `git log`; `karoline-melo` em andamento. |
| 2026-09-27 21:49 | Claude Opus 5.5 + Sonnet 5 ×7 | Ivan C M Moura | `karoline-melo`: 3 opções publicadas como proposta para a cliente escolher, com página de escolha e prévia (OG) própria por opção — a construção passou a gerar cabeçalho para outras páginas da pasta (1 teste). 1º segmento fechado: 78 min, US$ 26,90. Pendência 4 (QA) segue; Lighthouse das opções depois da escolha. |
| 2026-09-27 22:16 | Claude Opus 5.5 | Ivan C M Moura | `karoline-melo`: a cliente escolheu a opção 3 e **aprovou**; 4 ajustes dela; `avaliador` no contrato; etiqueta "Aprovado" no índice. 2º segmento: 7 min, US$ 2,83 (total 85 min, US$ 29,73). Publicação travada até o dono conferir o CRECI-BA (captcha). |
| 2026-09-27 22:20 | Claude Opus 5.5 | Ivan C M Moura | **`karoline-melo` realizada**: publicada aprovada (opção 3), CRECI conferido pelo dono no portal; B-16 fechada na parte do CRECI. Total 89 min, US$ 30,74. |
| 2026-09-28 09:33 | Claude Opus 5.5 + Sonnet 5 ×2 | Ivan C M Moura | **`questionario-cliente` realizado**, a pedido do dono antes da página do Rudolf: `docs/questionario/` (mestre + `enviar/` por profissão), passo 0 no manual do operador e nas skills `briefing-medico-landing` e `nova-pagina-medico-landing`. Em paralelo, **ajuste da `karoline-melo`** (fotógrafa + CRECI/CNAI em duas linhas) publicado. 10 min, US$ 3,06 (os dois juntos). `adv-rudolf-mateus` entra em Pendentes. |
| 2026-09-28 10:07 | Claude Opus 5.5 + Sonnet 5 ×4 | Ivan C M Moura | `rudolf-specht` (Specht Sociedade de Advocacia, OAB/BA 77.991): 3 opções (Tinta, Noturno, Trilha) e a página de escolha **publicadas como proposta**. A advocacia passa a aceitar proposta (ADR-006, emenda; 6 testes). Vai para Bloqueados, aguardando a escolha do cliente. 1º segmento: 29 min, US$ 15,96. |
| 2026-09-29 09:39 | Claude Opus 5.5 | Ivan C M Moura | **`hub-saude-negocios` · ajuste realizado**: o dono escolheu a opção 3 (faixa em movimento) para a seção de clientes; levada ao `index.html`/`pagina.css`, rodapé com "nomes e logotipos pertencem aos titulares", `clientes*.html`, `clientes.css` e miniaturas apagados; o dono viu as capturas antes de publicar. 3 min; custo não disponível (ccusage devolve US$ 0 para `claude-opus-5-5`), tokens no relatório. |
