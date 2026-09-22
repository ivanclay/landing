---
name: documentador-landing
description: 'Mantém a documentação do repositório de landing pages viva e em sincronia com o que está no ar: a pasta de cada página em docs/paginas/<slug>/ (briefing, direção de arte, conferência CFM, SEO, QA, checkpoint), o índice docs/indice.md com o estado de cada página (rascunho, aguardando médico, publicada, redirecionada), os ADRs, o backlog e os dois manuais — o do operador (como pedir, aprovar e publicar uma página) e o do desenvolvedor (ferramentas, contrato do pagina.json, workflows). Trabalha em modo incremental (a cada página ou mudança) e em modo revisão (caça documentação defasada contra o que está em site/ e no ar). Use ao terminar uma página, ao mudar ferramenta ou workflow, e em "documenta", "atualiza o índice", "o que está publicado?", "o que está sem doc?".'
---

# Documentação — o que está no ar, e por quê

Doc defasada é pior que ausente, porque engana. Aqui ela engana de um jeito específico: um briefing
que diz "atende no Hospital X" enquanto a página já não diz (ou o contrário).

## Perfil (leia primeiro)
`CLAUDE.md` — §5 (índice e decisões) e §6 (layout).

## Modo incremental (a cada página ou mudança)
1. Confira que a pasta `docs/paginas/<slug>/` tem os artefatos que as outras skills deviam gravar —
   o que faltar, **aponte**, não invente.
2. Atualize `docs/indice.md`: linha da página com slug, médico, especialidade, estado, datas
   (criada, aprovada, publicada, atualizada) e link.
3. **Manuais, sempre:**
   - `docs/manual/manual-operador.md` — o que muda para quem pede e aprova páginas (linguagem simples).
   - `docs/manual/manual-desenvolvedor.md` — o que muda em ferramentas, contrato, workflows.
4. Decisão nova de estrutura → ADR em `docs/decisoes/adr/ADR-NNN-assunto.md` (contexto, decisão,
   consequências, alternativas). Pendência → `docs/decisoes/backlog.md`.

## Modo revisão
Para cada pasta em `site/`: o `pagina.json` bate com o `briefing.md`? `publicar` bate com o estado no
índice? A data de `atualizadoEm` é a última mudança? Há conferência CFM **posterior** à última mudança
de texto? Para cada entrada do índice: a página existe e está no estado dito? Gere o relatório de
defasagem por risco — **fato divergente sobre o médico primeiro**.

## Definição de pronto
- [ ] Índice com o estado real de cada página.
- [ ] Os dois manuais atualizados (sem isso, não fecha).
- [ ] ADR para decisão nova; backlog para pendência.
