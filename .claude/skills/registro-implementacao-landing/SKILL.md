---
name: registro-implementacao-landing
description: 'Registra o tempo (relógio de parede) e os tokens/custo REAIS gastos em cada implementação ou fix, lendo os números que o Claude Code já grava (via ccusage ou /cost) em vez de estimar. Tem quatro modos: inicio, pausar, retomar e fim — conta só o tempo e os tokens ATIVOS (as pausas não são somadas), acumulando os segmentos. No fim, anexa uma linha num CSV e gera um relatório legível. Normalmente é acionada pelo techlead-landing ou pela nova-pagina-medico-landing, mas pode ser usada direto ("pausa a página", "retoma a página"). Não inventa números: sem fonte real de tokens, registra só o tempo.'
---

# Registro de Implementação — tempo e tokens (dados reais)

Registra, por página ou mudança, **quanto tempo** levou e **quantos tokens/custo** consumiu — com números **reais**, nunca estimados. Costuma ser acionada pelo `techlead-landing` (início e fim do fluxo), mas funciona sozinha.

## Limite que esta skill respeita (leia)

De dentro da conversa, o modelo **não consegue contar com precisão os próprios tokens**. Por isso esta skill **não estima tokens**: lê o consumo real que o Claude Code grava (`~/.claude/projects/*.jsonl`), via `ccusage`, ou os números que você obtém com `/cost`. Sem fonte real, registra **só o tempo** (origem `so-tempo`) — nunca inventa. Tempo é relógio de parede entre o início e o fim marcados.

## Modos

O snapshot `docs/paginas/<slug>/metricas/.registro-snapshot.json` (ou `docs/metricas/<assunto>/` para trabalho que não é de uma página) acumula **só o tempo e os tokens ativos** (fora das pausas). Campos: `slug`, `tipo`, `estado` (rodando|pausado), `tempo_ativo_seg`, `inicio_segmento`, `tokens_ativos` (entrada/saida/cache/custo acumulados), `tokens_inicio_segmento` (total ccusage no início do segmento atual), `sessao_id`, `multi_sessao` (bool).

### inicio  (`slug` ou assunto + `tipo`: pagina | ajuste | assets | ferramentas | publicacao)
1. `date -Iseconds` → `inicio_segmento`. `estado=rodando`, `tempo_ativo_seg=0`, `tokens_ativos=0`.
2. `npx ccusage@latest session --json` → `tokens_inicio_segmento` e `sessao_id` (se não houver, segue sem tokens).
3. Grava o snapshot. Confirma que o cronômetro começou.

### pausar
1. Fecha o segmento ativo: `tempo_ativo_seg += (agora − inicio_segmento)`.
2. `tokens_ativos += (ccusage agora − tokens_inicio_segmento)`.
3. `estado=pausado`. Confirma: "pausado em Xh Ymin ativos; nada é contado até retomar."
   > Pausar congela **só o tempo/tokens**. Para não perder o **estado do trabalho** ao trocar de janela, garanta que existe um checkpoint em `docs/paginas/<slug>/checkpoint.md` (o techlead grava isso ao pausar; se você invocou só o registro, peça o checkpoint antes de trocar de janela).

### retomar
1. `estado=rodando`; `inicio_segmento=agora`; `tokens_inicio_segmento=ccusage agora`.
2. Se a `sessao_id` atual for diferente da registrada, marca `multi_sessao=true` (o total de tokens passa a ser aproximação — ver Regras).
3. Confirma que a contagem voltou de onde parou.

### fim
1. Se `estado=rodando`, fecha o segmento ativo (como no `pausar`).
2. Resultado: `tempo_ativo` total (soma dos segmentos, sem pausas) e `tokens_ativos` total. Custo idem.
3. Sem ccusage em algum segmento: pede `/cost` colado (origem `cost-manual`) ou registra `so-tempo`.
4. Anexa uma linha em `docs/metricas/implementacoes.csv` e **gera o relatório** em `docs/paginas/<slug>/metricas/relatorio.md`.
5. Remove o snapshot.

## CSV (`docs/metricas/implementacoes.csv`)
Cabeçalho (cria na primeira vez):
```
inicio,fim,duracao_min,slug,tipo,tokens_entrada,tokens_saida,tokens_cache,custo_usd,origem,observacao
```
`origem`: `ccusage` | `cost-manual` | `so-tempo`. Campos de token vazios quando `so-tempo`.

## Relatório (saída do modo fim)
```markdown
# Relatório de implementação — <página>
- Data: 2025-06-15 (início) → 2025-06-16 (fim)
- Tempo ativo: 1h 35min  (pausas: 18h 40min, não contadas)
- Segmentos: 3 (2 pausas)
- Tokens (ativos) — entrada: 128.430 · saída: 9.812 · cache: 410.220
- Custo estimado: US$ 0,74
- Origem dos números: ccusage
- Atribuição: 1 sessão (exata)   # ou: "2 sessões — tokens aproximados"
- Observação: <opcional>
```
- **Tempo** é sempre o tempo **ativo** (soma dos segmentos rodando; pausas excluídas).
- Se a origem for `so-tempo`, mostre tempo e marque tokens/custo como "não disponível".
- Se `multi_sessao=true`, marque os tokens como **aproximados** e diga quantas sessões.

## Regras
- **Nunca inventar** tokens/custo. Sem fonte real → só tempo.
- 🔴 **Antes de escrever "sem fonte real", confira o `PATH`.** `command not found` para `npx` diz
  *"não está no `PATH`"*, não *"não existe"*. No Windows (Git Bash), o Node costuma morar em
  `C:\Program Files\nodejs`: `export PATH="/c/Program Files/nodejs:$PATH"` e
  `npx --yes ccusage@latest session --json`. (O S-Card passou onze entregas registrando só tempo por
  não conferir isso.)
- 🔴 **Ler tokens do `jsonl` exige DEDUPLICAR por `(requestId, message.id)`.** Cada registro de uso
  aparece várias vezes (parciais de streaming); somar tudo infla os tokens.
- ⚠️ **Um campo de registro vazio pela terceira vez seguida com a mesma razão:** o que se mede de
  novo é a **razão**, não o campo.
- **Pausa não conta:** entre `pausar` e `retomar`, nem tempo nem tokens são somados.
- **Atribuição por sessão:** `ccusage`/`/cost` medem por sessão.
  - Pausar/retomar **na mesma sessão** → tokens **exatos** (descontados pela diferença dos snapshots).
  - Pausar, fechar e retomar **em outra sessão** → tempo continua exato; tokens viram **aproximação** (`multi_sessao=true`), exata só se cada sessão foi **dedicada** a esta página. Para manter exato, use uma página por sessão e evite trabalho não relacionado.
- Idioma PT-BR.

## Referência rápida
- `/cost` (ou `/usage`, `/stats`) — tokens e custo da sessão atual, com duração.
- `/context` — quanto do contexto está cheio.
- `npx ccusage session` — por sessão; `npx ccusage daily` — por dia.
