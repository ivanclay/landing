# Landing

> Páginas da **Fábrica de Apps e Soluções** — médicos, escritórios de advocacia, empresas —, uma por endereço
> (`/drjoao/`, `/arruda-seixas/`), com o índice "Soluções" na raiz.
> **Estáticas, sem terceiros, sem coleta de dado** — e nenhuma vai ao ar sem a aprovação do cliente.

| Campo | Valor |
|---|---|
| **Endereço** | `https://ivanclay.github.io/landing/` (domínio próprio: D-01, em aberto) |
| **Stack** | HTML + CSS + JavaScript puros · Node 22 só nas ferramentas (sem dependência) |
| **Publicação** | GitHub Pages pelo Actions, a cada merge no `main` |
| **Norma do conteúdo** | Resolução CFM nº 2.336/2023 (publicidade médica) · LGPD |
| **Estado** | Fundação pronta em 2026-09-22. Nenhuma página publicada |
| **Idioma** | PT-BR em tudo |

## Como nasce uma página

Num terminal com o Claude Code, na raiz do repositório:

> crie uma landing page para médico cardiologista, que atende arritmia, nos hospitais X, Y e Z,
> pelos planos A, B e C

A skill `nova-pagina-medico-landing` conduz o resto, parando em três pontos para você:

1. **Pendências** — o que o pedido não disse e a página não pode inventar: nome completo, CRM, RQE,
   contato, endereços, foto.
2. **Plano de arte** — paleta, fontes, o esboço da abertura.
3. **Antes do PR** — capturas, números do Lighthouse, conferência do CFM.

A página entra no PR com `publicar: false`. Ela vai ao ar quando **você** preencher as três datas de
`revisao` no `pagina.json`, depois que o médico aprovar. O passo a passo está em
[`docs/manual/manual-operador.md`](docs/manual/manual-operador.md).

## Comandos

```sh
npm install                     # só para fontes e imagens; construir e verificar não precisam
npm run verificar               # o que o CI roda: constrói _site/ e confere
npm run verificar:rascunhos     # idem, incluindo as páginas com publicar=false
npm run servir                  # abre em http://localhost:4173 (com rascunhos)
npm run fontes <id>             # fonte do Fontsource para site/assets/fontes/
npm run imagens <original> <saida> [larguras]   # AVIF/WebP/JPEG sem EXIF
```

## Configuração única no GitHub

1. **Settings › Pages › Source: GitHub Actions.**
2. **Settings › Branches › `main`**: exigir pull request e o status check **`verificar`**; bloquear
   push direto.
3. **Actions › publicar › Run workflow** para o primeiro deploy.

## O time de skills

O pack veio do S-Card (mesmo autor), com o sufixo `-landing`. O **método** é o mesmo: perfil como
fonte de verdade, gates, checkpoint e registro de custo. O **domínio** é novo.

| Skill | Existe porque |
|---|---|
| `nova-pagina-medico-landing` | **Nova.** Um pedido em linguagem natural vira uma página, com os gates |
| `briefing-medico-landing` | **Nova.** Todo fato sobre o médico tem fonte; o que falta trava a página |
| `publicidade-medica-cfm-landing` | **Nova.** Uma frase vedada publicada tem o CRM de alguém em cima |
| `direcao-de-arte-landing` | **Nova.** "Alto nível" é identidade própria por médico, não template |
| `seo-local-landing` | **Nova.** Especialidade + cidade é como o paciente procura |
| `seguranca-privacidade-landing` | **Nova.** Site de saúde sem coleta e sem rastreador |
| `publicacao-github-pages-landing` | **Adaptada** do `deploy`: o ar é o `main` |
| `techlead-landing`, `iniciar-landing` | **Adaptadas.** Fluxos de página, não de fatia |
| `frontend-landing`, `qa-landing`, `revisor-codigo-landing` | **Adaptadas** para HTML/CSS/JS estático e Lighthouse |
| `documentador-landing`, `registro-implementacao-landing` | **Adaptadas.** Uma pasta de docs por página |

Ficaram no S-Card, sem uso aqui: arquiteto, desenvolvedor, testes unitários, migrador de dados,
auditor de paridade e as skills de domínio do app.

## Licença e uso

**© 2026 Ivan C M Moura. Todos os direitos reservados.** O conteúdo de cada página pertence ao médico
que ela apresenta. As fontes em `site/assets/fontes/` seguem as licenças delas (OFL-1.1, indicada no
cabeçalho de cada `fonte.css`).
