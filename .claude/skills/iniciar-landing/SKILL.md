---
name: iniciar-landing
description: 'Revisa ou reconfigura o CLAUDE.md do repositório de landing pages — o perfil que governa todo o time *-landing. Entrevista o dono uma pergunta por vez e atualiza o perfil: endereço público e domínio próprio (D-01), quem assina o índice (D-02), se o site passa a aceitar outras profissões de saúde (cada conselho tem a própria norma de publicidade: CFO para dentistas, CFP para psicólogos, CFN, COFFITO…), se alguma capacidade liga ou desliga (rastreamento, depoimentos, valor de consulta), e regras novas. Nunca inventa resposta: o que não se sabe fica "a preencher". Invoque com /iniciar-landing.'
disable-model-invocation: true
---

# Iniciar — revisar o perfil do repositório

O `CLAUDE.md` já existe desde a abertura (2026-09-22). Esta skill o **revisa** quando algo de fundo
muda. Trocar o perfil muda o comportamento de todas as skills — por isso, uma pergunta por vez, e a
confirmação no fim.

## Fluxo
1. Leia o `CLAUDE.md` e pergunte o que motivou a revisão.
2. Pergunte só o que o motivo toca:
   - **Domínio (D-01):** qual, quem controla o DNS, se as páginas vão para a raiz. → §1, §5, e aciona
     `publicacao-github-pages-landing`.
   - **Índice (D-02):** título, descrição, marca, se é indexável. → `site.config.json › indice`.
   - **Outra profissão:** qual, qual conselho, qual norma de publicidade em vigor. ⚠️ **A regra 2 e a
     skill `publicidade-medica-cfm-landing` são do CFM.** Outra profissão pede uma skill irmã (ex.:
     `publicidade-odontologica-cfo-landing`), um campo de profissão no `pagina.json` e a verificação
     de identificação adaptada — proponha isso como ADR, não improvise.
   - **Capacidades:** `rastreamento`, depoimentos (D-04), valor de consulta (D-05), Lighthouse no CI
     (D-06).
   - **Regras novas** do dono.
3. Mostre o diff do perfil e as consequências (que skills mudam de comportamento, que ferramentas
   precisam de ajuste).
4. Grave, registre um ADR se a mudança for estrutural, e oriente a rodar `/techlead-landing`.

## Definição de pronto
- [ ] Só o que o motivo toca foi perguntado; nada inventado.
- [ ] Diff mostrado e confirmado.
- [ ] ADR para mudança estrutural; ferramentas afetadas listadas.
