# Landing — Perfil e memória do projeto

> **Este arquivo é a FONTE DE VERDADE que governa todo o time de skills `*-landing`.** Todas as
> skills leem este perfil antes de agir e se adaptam a ele.
>
> Para **reconfigurar**, rode **`/iniciar-landing`**: ele revisa este arquivo.
>
> ⌗ O time nasceu do pack do S-Card/S-Auto (mesmo autor): o **método** veio de lá — perfil como fonte
> de verdade, regras numeradas, gates, checkpoint, registro de tempo e custo, "vá à fonte antes de
> afirmar". O **domínio** é outro: aqui não há app, banco nem loja; há **páginas estáticas de médicos**,
> e o risco que mais custa não é um bug, é **uma frase que o CFM não admite, publicada com o nome e o
> CRM de alguém**.

---

## 1. Perfil do projeto

| Campo | Valor |
|---|---|
| **Nome** | **Landing** · repositório `github.com/ivanclay/landing` |
| **O que é** | Landing pages de **alto nível** para médicos — uma página por médico em `/<slug>/` (`/drjoao/`, `/drapaula/`) e um **índice** na raiz com todas as publicadas. Cada página nasce de **um pedido em linguagem natural** ("crie uma landing page para cardiologista, especialista em X, que atende nos hospitais A, B, pelos planos C, D…") |
| **Modo** | `greenfield` |
| **Idioma dos artefatos e identificadores** | PT-BR — texto das páginas, código, nomes de arquivo, documentação |
| **Stack de destino** | **HTML + CSS + JavaScript puros**, sem framework e sem bundler. Node 22 só para as ferramentas de construção e verificação (`ferramentas/*.mjs`, **sem dependência**) |
| **Hospedagem** | **GitHub Pages**, publicado pelo **GitHub Actions** a cada push no `main` (`.github/workflows/publicar.yml`). Pull request roda `verificar.yml` — é o gate do merge |
| **Endereço público** | **`https://ivanclay.github.io/landing/<slug>/`** enquanto não houver domínio próprio (D-01). ⚠️ Por ser site **de projeto**, tudo mora sob `/landing/` — por isso **caminho relativo sempre** (regra 8) |
| **Modelo de persistência** | Nenhum. O "dado" de cada página é o `site/<slug>/pagina.json` (fatos do médico) + o `docs/paginas/<slug>/briefing.md` (a fonte de cada fato) |
| **Stack de verificação** | `ferramentas/verificar.mjs` (estrutura, separação, terceiros, links, identificação CFM, termos vedados, pendências, peso) no CI · **Lighthouse** e leitor de tela na mão (qa-landing) · capturas com Playwright quando disponível |
| **Referência de método** | S-Card (`C:\...\scard`) — o pack original. Nada de domínio de lá se aplica aqui |
| **Norma que governa o conteúdo** | **Resolução CFM nº 2.336/2023** (publicidade médica, em vigor desde 11/03/2024) e o **Manual de Publicidade Médica** do CFM — `https://sistemas.cfm.org.br/normas/arquivos/resolucoes/BR/2023/2336_2023.pdf` · `https://publicidademedica.cfm.org.br`. **LGPD** para o que a página não coleta (regra 5) |
| **Raiz dos artefatos** | `docs/` — uma pasta por página em **`docs/paginas/<slug>/`** (§6) |

---

## 2. Capacidades ativas

| Capacidade | Estado | Efeito |
|---|---|---|
| `publicidade_medica` | **ON** | Toda página e toda mudança de texto aciona **`publicidade-medica-cfm-landing`** antes do PR. Sem conferência registrada, `publicar` não vira `true` |
| `direcao_de_arte` | **ON** | Página nova ou redesenho aciona **`direcao-de-arte-landing`**: plano visual escrito **antes** do código, revisto contra o genérico |
| `seo_local` | **ON** | Página nova aciona **`seo-local-landing`** (título, descrição, JSON-LD revisado, imagem social) |
| `imagens_do_medico` | **ON** | Foto e logo passam por `npm run imagens` (sem EXIF, AVIF/WebP/JPEG). Sem foto real, a página é tipográfica |
| `rastreamento` | **OFF** | Sem analytics, pixel, tag manager ou cookie. Ligar exige ADR, banner de consentimento e aviso de privacidade (regra 6) |
| `dominio_proprio` | **OFF** | Até a D-01, `urlBase` é `https://ivanclay.github.io/landing/` |
| `engenharia_reversa`, `paridade_dois_bancos`, `migracao_de_dados` | **OFF** | Não se aplicam — ficaram no pack do S-Card |

---

## 3. Regras não-negociáveis

As regras **1 a 8** são o que faz uma página de médico poder ir ao ar. As **9 a 16** são de
construção e de método.

### O que a página pode dizer

1. **Nada é inventado sobre o médico.** CRM, RQE, formação, hospital, convênio, horário, número de
   pacientes, anos de experiência, prêmio, técnica, aparelho, depoimento — **todo fato** vem do pedido
   ou do médico, e o `docs/paginas/<slug>/briefing.md` diz **de onde veio cada um**. O que falta vira
   **`PENDENTE`** no arquivo, e `PENDENTE` **trava a construção** (verificado).
   ⌗ É a regra 21 do S-Card com outra roupa: *"toda frase que a página afirma precisa saber de onde
   veio"*. Um texto bonito com um hospital errado é pior que um texto sem hospital.
   ⌗ O que se **escreve** (a frase de abertura, a explicação de uma doença) é redação, e pode ser
   proposta; o que se **afirma sobre o médico** é fato, e não pode.

2. **A identificação do CFM está em toda página.** Nome, **CRM com a UF acompanhado da palavra
   MÉDICO/MÉDICA**, e cada especialidade ou área de atuação **seguida do RQE** (Res. 2.336/2023, arts.
   4º e 6º). Mora no elemento `data-identificacao-cfm` e é **conferida pelo `verificar.mjs`** contra o
   `pagina.json`.
   ⌗ **Sem RQE não há especialidade.** O médico sem RQE numa área não é anunciado como especialista
   nela — a página diz *"atende"*, *"dedica-se a"*; o `pagina.json` recusa especialidade sem RQE.

3. **A publicidade fica dentro da Res. CFM 2.336/2023.** Sem promessa, garantia ou insinuação de
   resultado; sem superlativo e sem classificação promocional ("o melhor", "nº 1", "médico do ano");
   sem sensacionalismo; sem atribuir superioridade a técnica ou aparelho; antes-e-depois **nunca
   isolado** (art. 14 — só com ADR da página); sem preço de **procedimento**. **Preço de consulta** e
   formas de pagamento **podem** (art. 9º, VI), se o médico pedir (D-05). **Depoimento** fica fora por
   padrão (D-04).
   ⌗ A lista `ferramentas/regras/termos-vedados.json` é um **piso** que o CI confere, não a regra. A
   regra é a resolução, e quem a aplica frase a frase é **`publicidade-medica-cfm-landing`**, que grava
   `docs/paginas/<slug>/conferencia-cfm.md`.

4. **Nada vai ao ar sem o médico.** `publicar: true` exige, no `pagina.json`, as três datas de
   `revisao`: **`crmConferidoEm`** (CRM e RQE conferidos no portal do CFM), **`conferenciaCfmEm`** e
   **`aprovadoPeloMedicoEm`** (o médico viu a página inteira e aprovou por escrito). A construção
   recusa sem elas.
   ⌗ A responsabilidade ética é **do médico**, e a resolução diz que contratar quem faz a página não a
   transfere. A aprovação protege os dois lados; o registro dela (mensagem, e-mail) fica com o dono,
   **fora do repositório**.

5. **A página não coleta dado.** Sem `<form>`, sem campo, sem "descreva seus sintomas". O caminho até o
   paciente é **WhatsApp, telefone ou o link de agendamento do próprio médico** — e o dado de saúde, se
   houver, trafega no serviço que o paciente escolheu, não aqui.
   ⌗ GitHub Pages não tem servidor; um formulário precisaria de terceiro (regra 6) e colheria **dado
   sensível** (LGPD, art. 11). Os dois custos são altos demais para o ganho.

6. **Nada de terceiros por padrão.** Nenhum script, folha de estilo, fonte, imagem ou `iframe` de fora
   — fonte é **local** (`npm run fontes`), mapa é **link** (não embed), vídeo é **link**. Sem
   analytics, pixel, tag manager, cookie. **Verificado** (qualquer `src`/`href` de recurso fora do site
   reprova).
   ⌗ Ligar `rastreamento` é **ADR**, com banner de consentimento e aviso de privacidade na página.
   Toda dependência nova passa pela pergunta *"isto chama um servidor que não é o nosso?"*.

7. **O endereço é permanente.** O slug (`drjoao`) vai para a bio do Instagram, o cartão impresso, o QR
   do consultório. **Não se renomeia**: mudar é criar a página nova e pôr o slug antigo em
   `site.config.json › redirecionamentos` (a construção gera a página que leva à nova). Slug só com
   minúsculas, dígitos e hífen, sem acento; igual ao nome da pasta (verificado).
   ⌗ Apagar a página de um médico que saiu também é redirecionar — para o índice, se não houver outra.
   Um QR impresso que dá 404 é o defeito que ninguém vê até o paciente reclamar.

8. **Caminho relativo, sempre.** Hoje o site mora em `/landing/`; amanhã, talvez, na raiz de um domínio
   próprio. `../assets/...`, `imagens/...`, nunca `/assets/...`. **Só a construção** escreve URL
   absoluta (canonical, `og:url`, `og:image`, sitemap), a partir de `site.config.json › urlBase`. A
   única exceção é o `404.html`, gerado pela construção (servido em qualquer profundidade).

### Como a página é feita

9. **HTML, CSS e JS separados; a página funciona sem JS.** Zero `style=`, zero `<style>`, zero
   `on…=`, zero `<script>` sem `src` (o JSON-LD é a exceção, e quem escreve é a construção). JS é
   **melhoria**: sem ele, todo conteúdo aparece e todo contato funciona. **Verificado.**

10. **A identidade da página é dela.** Cor e família de fonte moram **só** no `site/<slug>/tema.css`;
    o `site/assets/css/base.css` e o `componentes.css` têm escala, espaço e estrutura, **nunca cor**. O
    índice tem a própria (`indice.css`).
    ⌗ É a regra 13 do S-Card invertida para cá: lá, cor do cartão era dado da pessoa e não podia virar
    token do app; aqui, cor da página é dado do médico e não pode vazar do índice nem de outra página.
    Mexer em `componentes.css` muda **todas** as páginas — o qa confere cada uma.

11. **Alto nível é orçamento medido, não adjetivo.** Toda página, no celular (Lighthouse, 4G
    simulado): **Performance ≥ 90, Acessibilidade = 100, Boas práticas ≥ 95, SEO = 100**; **LCP ≤ 2,5 s**,
    **CLS ≤ 0,05**; **WCAG 2.2 AA** (contraste ≥ 4,5:1 no texto, foco visível, alvo ≥ 44 px, ordem de
    leitura); de **320 px a 1920 px** sem rolagem lateral; `prefers-reduced-motion` respeitado. Imagem
    ≤ 250 KB, primeira carga ≤ 900 KB (aviso no CI). O número vai para `docs/paginas/<slug>/qa.md` com a
    data e o comando.

12. **Imagem real ou nenhuma.** Nenhuma pessoa em foto que não seja o próprio médico ou a equipe real,
    com autorização. **Nada de banco de imagem de "médico sorrindo"**, nem de "paciente feliz". Sem foto,
    a abertura é **tipográfica** — decisão de direção de arte, não buraco. **Logotipo de hospital ou
    convênio só com autorização escrita**; por padrão, o nome em texto. Imagem gerada por IA não
    representa pessoa, consultório nem procedimento.
    ⌗ **Única exceção:** página com `"demonstracao": true` (médico fictício, ADR-004) pode usar banco de
    imagem com licença livre, com a legenda "Imagem ilustrativa" e o `creditos-imagens.md` — verificado.

### Método (herdadas do S-Card, reescritas para cá)

13. **Antes de afirmar, vá à fonte.** O que vai para o ar é `_site/`, não `site/`: confira **o
    construído** (`npm run verificar`, e a página aberta no navegador). *"O JSON-LD está certo"* só se
    diz depois de colar no `validator.schema.org`; *"passa no Lighthouse"*, depois de rodar.

14. **Nenhuma degradação silenciosa.** Página sem foto diz isso no plano de arte; convênio que o médico
    não confirmou não entra "por enquanto"; aviso do CI é lido e **decidido** por escrito, não ignorado.

15. **Um PR por página (ou por mudança coesa); o `main` é o ar.** Branch `pagina/<slug>` ou
    `ajuste/<assunto>` → PR → CI verde → merge → publicado. **Nunca push direto no `main`.** Commits no
    formato `tipo(slug): frase -- referencias`, **sem acento** e **sem atribuição de IA** (imposto em
    `.claude/settings.json`).

16. **Arquivo com nome do que contém.** Uma pasta por página; `tema.css` (identidade), `pagina.css`
    (layout), `pagina.js` (se houver comportamento próprio), `imagens/`. `estilos2.css`, `novo.css`,
    `final-final.css` são achado de revisão.

---

## 4. Estrutura

```
landing/
├── CLAUDE.md · README.md · package.json · site.config.json · .gitignore
├── .claude/                 settings.json + skills/*-landing
├── .github/workflows/       verificar.yml (PR) · publicar.yml (push no main → Pages)
├── site/                    a FONTE do que vai para o ar
│   ├── assets/
│   │   ├── css/             base.css (escala, espaço, foco — sem cor) · componentes.css · indice.css
│   │   ├── js/              pagina.js (comum às páginas) · indice.js (busca do índice)
│   │   ├── fontes/<id>/     woff2 locais + fonte.css — `npm run fontes <id>`
│   │   └── imagens/         só o que é do índice
│   └── <slug>/              uma página por médico
│       ├── index.html       com <!-- @gerado:cabecalho --> no <head>
│       ├── tema.css         cor e fonte desta página (regra 10)
│       ├── pagina.css       layout e o gesto desta página
│       ├── pagina.js        (opcional)
│       ├── imagens/         saída de `npm run imagens`
│       └── pagina.json      os fatos do médico — NÃO vai para o ar
├── ferramentas/
│   ├── construir.mjs        site/ → _site/ (+ índice, 404, sitemap, robots, redirecionamentos, JSON-LD)
│   ├── verificar.mjs        confere _site/ (é o gate do CI)
│   ├── copiar-fontes.mjs    Fontsource (npm) → site/assets/fontes/
│   ├── otimizar-imagens.mjs original → AVIF/WebP/JPEG sem EXIF + <picture> pronto
│   ├── lib/                 pagina.mjs (contrato do pagina.json) · seo.mjs · html.mjs · arquivos.mjs
│   ├── modelos/             indice.html · 404.html · redirecionamento.html
│   └── regras/              termos-vedados.json
├── entrada/                 FORA DO GIT — originais de foto e logo, por slug
├── docs/                    §6
└── _site/                   FORA DO GIT — o construído
```

**Comandos:** `npm run verificar` (o que o CI roda) · `npm run rascunhos` + `npm run verificar:rascunhos`
(inclui páginas com `publicar: false`, com `noindex`) · `npm run servir` (abre em `localhost:4173`) ·
`npm run fontes <id>` · `npm run imagens <original> <saída> [larguras]`.

⌗ **Por que não Astro, Eleventy ou Jekyll:** cada página é desenhada à mão para um médico — o ganho de
um gerador é repetir estrutura, e aqui o que se quer é **não** repetir. O que se repete (cabeçalho
gerado, índice, sitemap, conferências) cabe em duas ferramentas sem dependência, que o CI roda sem
`npm ci` (ADR-001).

---

## 5. Índice / mapa

- **Índice da documentação:** `docs/indice.md`
- **Uma pasta por página:** `docs/paginas/<slug>/` — `briefing.md` (fatos e fontes), `direcao-de-arte.md`,
  `conferencia-cfm.md`, `seo.md`, `qa.md`, `checkpoint.md`, `metricas/`
- **ADRs:** `docs/decisoes/adr/` · **Pendências e riscos:** `docs/decisoes/backlog.md`
- **Manuais:** `docs/manual/manual-operador.md` (como pedir, aprovar e publicar uma página) ·
  `docs/manual/manual-desenvolvedor.md`
- **Métricas:** `docs/metricas/implementacoes.csv`
- **Contrato do `pagina.json`:** `ferramentas/lib/pagina.mjs` (o código é o contrato; o esqueleto está
  em `.claude/skills/nova-pagina-medico-landing/assets/esqueleto/`)

**Estado:** repositório aberto em 2026-09-22 com a fundação: ferramentas, CI, índice vazio, time de
skills. Nenhuma página publicada.

### Decisões abertas

| ID | Decisão | Quando precisa estar fechada |
|---|---|---|
| D-01 | **Domínio.** Hoje `ivanclay.github.io/landing/<slug>/`. Para `/<slug>` na raiz (como no pedido: "/drjoao"), é preciso **domínio próprio** (`CNAME` no Pages) — ou mover para o repositório `ivanclay.github.io`, que é o site **de usuário** e já serve `/privacidade/`. ⚠️ Decidir **antes do primeiro QR impresso**: o endereço vira permanente (regra 7). Trocar depois exige redirecionar cada página | Antes da primeira página publicada |
| D-02 | **Quem assina o índice** e se ele é público/indexável (`site.config.json › indice`). Hoje: "Médicos", indexável, sem marca | Antes da primeira página publicada |
| D-03 | **Aviso de privacidade**: basta a frase do rodapé ("não usa cookies nem coleta dados") enquanto `rastreamento = OFF`? Proposta: sim; página própria só se a regra 6 mudar | Com a D-01 |
| D-04 | **Depoimentos de pacientes**: fora por padrão. Entrar exige autorização escrita do paciente, nenhum dado de saúde identificável, nenhuma promessa implícita e a conferência CFM da frase | Quando um médico pedir |
| D-05 | **Valor da consulta** na página: permitido (art. 9º, VI); entra só se o médico pedir, com "valor vigente em <data>" | Quando um médico pedir |
| D-06 | **Lighthouse no CI** (`@lhci/cli`, orçamento da regra 11 como gate). Hoje é conferência manual | Depois da 3ª página |

---

## 6. Layout de artefatos por página

```
docs/
├── indice.md
├── paginas/<slug>/
│   ├── briefing.md          cada fato com a fonte (pedido, mensagem do médico, portal do CFM) e o que está PENDENTE
│   ├── direcao-de-arte.md   o plano: paleta, tipos, layout, o gesto — e o que foi revisto contra o genérico
│   ├── conferencia-cfm.md   frase a frase, com o artigo; os avisos do CI decididos
│   ├── seo.md               título, descrição, JSON-LD validado, imagem social
│   ├── qa.md                Lighthouse (números, data, comando), larguras, teclado, leitor de tela, zoom 200%
│   ├── seguranca.md         terceiros, links, metadados de imagem (quando houver algo a registrar)
│   ├── checkpoint.md        estado, feito, falta, próximo passo concreto
│   └── metricas/            relatorio.md
├── decisoes/                adr/ · backlog.md
├── manual/                  manual-operador.md · manual-desenvolvedor.md
└── metricas/                implementacoes.csv
```

---

## 7. Como acionar o time

- **Pedido de página nova em linguagem natural** ("crie uma landing page para…") →
  **`nova-pagina-medico-landing`** (dispara sozinha; conduz o fluxo inteiro com os gates)
- Conduzir qualquer trabalho de ponta a ponta com registro → **`/techlead-landing`**
- (Re)configurar o projeto → **`/iniciar-landing`**
- Transformar o pedido em fatos com fonte e pendências → **`briefing-medico-landing`**
- Conferir texto contra o CFM, escrever sem ferir a norma → **`publicidade-medica-cfm-landing`**
- Identidade visual, plano de arte, "está com cara de template?" → **`direcao-de-arte-landing`**
- HTML, CSS, JS, componentes, acessibilidade, performance → **`frontend-landing`**
- Título, descrição, JSON-LD, imagem social, Google → **`seo-local-landing`**
- Lighthouse, larguras, teclado, leitor de tela → **`qa-landing`**
- Terceiros, privacidade, LGPD, links, EXIF → **`seguranca-privacidade-landing`**
- Revisão de artesania do código → **`revisor-codigo-landing`**
- Workflow, Pages, domínio, redirecionamento → **`publicacao-github-pages-landing`**
- Documentar, manuais, índice → **`documentador-landing`**
- Tempo e custo → **`registro-implementacao-landing`**

**Não existem aqui** (ficaram no S-Card): arquiteto, desenvolvedor de backend, testes unitários,
migrador de dados, auditor de paridade, e as skills de domínio do app. Decisão de estrutura vira ADR
pelo techlead.

---

## 8. Comportamento ao ativar

- **Commits e PRs sem atribuição de IA.** Nada de `Co-Authored-By` de modelo, `Generated with` ou menção
  a assistente. Formato `tipo(slug): frase -- referencias`, sem acentos.
- **Antes de escrever um fato sobre o médico, ache a fonte** no briefing. Sem fonte: `PENDENTE` e
  pergunta ao dono (regra 1).
- **Antes de escrever o primeiro pixel, escreva o plano de arte** e revise-o contra o genérico
  (direcao-de-arte-landing).
- **Antes de abrir o PR:** `npm run verificar:rascunhos` verde, conferência CFM gravada, página vista no
  navegador em 360 px e 1440 px.
- **Nunca** marcar `publicar: true` por conta própria: as três datas de `revisao` são preenchidas **pelo
  dono**, depois do médico aprovar (regra 4).
- **Nunca** trazer script, fonte, imagem ou embed de fora (regra 6); **nunca** caminho absoluto
  (regra 8); **nunca** renomear slug publicado (regra 7).
- Mexeu em `site/assets/`? Muda todas as páginas: **reconstrua e olhe cada uma**.
- **Pausar:** checkpoint em `docs/paginas/<slug>/checkpoint.md`. **Retomar:** o checkpoint é a fonte de
  verdade; sem ele, pergunte.
- **Ao listar um levantamento** (páginas, pendências, custo): número medido e estimado **nunca** na
  mesma tabela; dificuldade em bolinhas (`●●●○○`); linha de total; a origem do número com o comando que
  a reproduz — o formato do §9 do S-Card.
