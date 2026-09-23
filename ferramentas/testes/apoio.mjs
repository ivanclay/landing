// O site descartável dos testes: monta uma página numa pasta temporária e roda a construção e a
// verificação de verdade, apontadas para ela por LANDING_RAIZ. Os *.test.mjs dizem o que a página tem.
import { spawnSync } from 'node:child_process';
import { mkdtemp, mkdir, writeFile, cp, rm } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const RAIZ_DO_CODIGO = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..', '..');
export const SLUG = 'demo-teste';

/** Monta o site de teste e devolve a raiz. `creditos: null` não grava o creditos-imagens.md. */
async function montarSite({ pagina, html, creditos = null }) {
  const raiz = await mkdtemp(path.join(tmpdir(), 'landing-teste-'));
  await cp(path.join(RAIZ_DO_CODIGO, 'site', 'assets'), path.join(raiz, 'site', 'assets'), { recursive: true });
  await cp(path.join(RAIZ_DO_CODIGO, 'site.config.json'), path.join(raiz, 'site.config.json'));
  const pasta = path.join(raiz, 'site', SLUG);
  await mkdir(path.join(pasta, 'imagens'), { recursive: true });
  await writeFile(path.join(pasta, 'pagina.json'), JSON.stringify(pagina));
  await writeFile(path.join(pasta, 'index.html'), html);
  await writeFile(path.join(pasta, 'imagens', 'retrato-480.jpg'), 'jpeg de teste');
  await writeFile(path.join(pasta, 'imagens', 'social.jpg'), 'jpeg de teste');
  const docs = path.join(raiz, 'docs', 'paginas', SLUG);
  await mkdir(docs, { recursive: true });
  await writeFile(path.join(docs, 'briefing.md'), '# Briefing de teste\n');
  if (creditos !== null) await writeFile(path.join(docs, 'creditos-imagens.md'), creditos);
  return raiz;
}

function rodar(raiz) {
  const opcoes = { cwd: raiz, env: { ...process.env, LANDING_RAIZ: raiz }, encoding: 'utf8' };
  const construcao = spawnSync(process.execPath, [path.join(RAIZ_DO_CODIGO, 'ferramentas', 'construir.mjs')], opcoes);
  if (construcao.status !== 0) return construcao;
  return spawnSync(process.execPath, [path.join(RAIZ_DO_CODIGO, 'ferramentas', 'verificar.mjs')], opcoes);
}

/** Monta, constrói, verifica, entrega o resultado e a raiz a `conferir`, e apaga o site. */
export async function comSite(opcoes, conferir) {
  const raiz = await montarSite(opcoes);
  try {
    await conferir(rodar(raiz), raiz);
  } finally {
    await rm(raiz, { recursive: true, force: true });
  }
}
