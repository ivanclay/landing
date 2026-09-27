#!/usr/bin/env node
// Quem fez o quê, com os tokens REAIS de cada um: a conversa principal (<sessão>.jsonl) e cada agente
// delegado (<sessão>/subagents/agent-*.jsonl), com a tarefa (a "description" com que foi lançado, lida da
// conversa principal) e o modelo. O ccusage soma tudo sob o mesmo número de sessão; este script mostra de
// quem é cada parte e o TOTAL, que tem de bater com ele.
//
//   node .claude/skills/registro-implementacao-landing/scripts/tokens-por-agente.mjs <id-da-sessão> [pasta-do-projeto]
//
// Cada resposta aparece várias vezes no jsonl (parciais de streaming): agrupa por (requestId, message.id)
// e fica com o MAIOR valor de cada campo — somar tudo infla; ficar com o primeiro parcial subconta.
import { readFileSync, readdirSync, existsSync } from 'node:fs';
import { homedir } from 'node:os';
import path from 'node:path';

const [sessao, pastaInformada] = process.argv.slice(2);
if (!sessao) {
  console.error('uso: tokens-por-agente.mjs <id-da-sessão> [pasta ~/.claude/projects/<projeto>]');
  process.exit(1);
}
const pastaProjeto = pastaInformada
  ?? path.join(homedir(), '.claude', 'projects', 'c--repos-novos-projetos-landing');

const CAMPOS = ['entrada', 'saida', 'cacheCriacao', 'cacheLeitura'];

function lerUso(arquivo) {
  const porResposta = new Map();
  for (const linha of readFileSync(arquivo, 'utf8').split('\n')) {
    if (!linha) continue;
    let registro;
    try { registro = JSON.parse(linha); } catch { continue; }
    const uso = registro.message?.usage;
    if (!uso) continue;
    const chave = `${registro.requestId ?? ''}|${registro.message.id ?? ''}`;
    const atual = {
      modelo: registro.message.model ?? '?',
      entrada: uso.input_tokens ?? 0,
      saida: uso.output_tokens ?? 0,
      cacheCriacao: uso.cache_creation_input_tokens ?? 0,
      cacheLeitura: uso.cache_read_input_tokens ?? 0,
    };
    const anterior = porResposta.get(chave);
    if (!anterior) porResposta.set(chave, atual);
    else for (const campo of CAMPOS) anterior[campo] = Math.max(anterior[campo], atual[campo]);
  }
  const porModelo = {};
  for (const resposta of porResposta.values()) {
    porModelo[resposta.modelo] ??= Object.fromEntries(CAMPOS.map((campo) => [campo, 0]));
    for (const campo of CAMPOS) porModelo[resposta.modelo][campo] += resposta[campo];
  }
  return porModelo;
}

/** agentId → tarefa: a description de cada chamada Agent, casada com o agentId que o resultado devolve. */
function tarefasDosAgentes(arquivo) {
  const chamadas = {};
  const tarefas = {};
  for (const linha of readFileSync(arquivo, 'utf8').split('\n')) {
    if (!linha) continue;
    let registro;
    try { registro = JSON.parse(linha); } catch { continue; }
    const blocos = Array.isArray(registro.message?.content) ? registro.message.content : [];
    for (const bloco of blocos) {
      if (bloco.type === 'tool_use' && bloco.name === 'Agent') chamadas[bloco.id] = bloco.input?.description ?? '';
      if (bloco.type === 'tool_result' && chamadas[bloco.tool_use_id] !== undefined) {
        const id = /agentId: (a[0-9a-f]+)/.exec(JSON.stringify(bloco.content))?.[1];
        if (id) tarefas[id] = chamadas[bloco.tool_use_id];
      }
    }
  }
  return tarefas;
}

const principal = path.join(pastaProjeto, `${sessao}.jsonl`);
const tarefas = tarefasDosAgentes(principal);
const fontes = [['principal', principal]];
const pastaAgentes = path.join(pastaProjeto, sessao, 'subagents');
if (existsSync(pastaAgentes)) {
  for (const arquivo of readdirSync(pastaAgentes).filter((nome) => nome.endsWith('.jsonl'))) {
    fontes.push([arquivo.replace(/^agent-|\.jsonl$/g, ''), path.join(pastaAgentes, arquivo)]);
  }
}

const total = Object.fromEntries(CAMPOS.map((campo) => [campo, 0]));
const formatar = (numero) => numero.toLocaleString('pt-BR');
// Sai em tabela Markdown, pronta para colar no relatório (docs/paginas/<slug>/metricas/relatorio.md).
console.log('| Quem | Tarefa | Modelo | Entrada | Saída | Cache criação | Cache leitura |');
console.log('|---|---|---|---|---|---|---|');
for (const [quem, arquivo] of fontes) {
  const ehPrincipal = quem === 'principal';
  const rotulo = ehPrincipal ? 'principal' : `agente ${quem.slice(0, 8)}`;
  const tarefa = ehPrincipal ? 'conversa com o dono, decisões, revisão' : (tarefas[quem] ?? '(sem descrição)');
  for (const [modelo, uso] of Object.entries(lerUso(arquivo))) {
    console.log(`| ${rotulo} | ${tarefa} | ${modelo} | ${CAMPOS.map((campo) => formatar(uso[campo])).join(' | ')} |`);
    for (const campo of CAMPOS) total[campo] += uso[campo];
  }
}
console.log(`| **Total** | | | ${CAMPOS.map((campo) => `**${formatar(total[campo])}**`).join(' | ')} |`);
console.log('\nConfira: o TOTAL tem de bater com `npx ccusage@latest session --json` desta sessão. Custo em US$: o do ccusage.');
