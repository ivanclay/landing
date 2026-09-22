// Prova do ADR-004 (modo demonstração): monta um site descartável numa pasta temporária e roda a
// construção e a verificação de verdade, apontadas para ele por LANDING_RAIZ.
//
//   node --test ferramentas/testes/        (npm run testar)
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { spawnSync } from 'node:child_process';
import { mkdtemp, mkdir, writeFile, readFile, cp, rm } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const RAIZ_DO_CODIGO = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..', '..');
const SLUG = 'demo-teste';
const AVISO = 'Página de demonstração. Dr. Fulano de Teste é um médico fictício; CRM, RQE e contatos são fictícios. '
  + 'Os hospitais e planos citados não têm relação com esta página.';

const paginaJson = (extra = {}) => ({
  slug: SLUG,
  publicar: true,
  demonstracao: true,
  atualizadoEm: '2026-09-22',
  medico: {
    tratamento: 'Dr.', nome: 'Fulano de Teste', generoGramatical: 'M',
    crm: [{ numero: '000000', uf: 'SP' }],
    especialidades: [{ nome: 'Cardiologia', rqe: '00001' }],
  },
  resumo: 'Demonstração: página de um cardiologista fictício, para mostrar o modelo de página.',
  cidade: 'São Paulo',
  uf: 'SP',
  contato: { telefone: '+551130000000' },
  imagemSocial: 'imagens/social.jpg',
  revisao: { crmConferidoEm: '', conferenciaCfmEm: '2026-09-22', aprovadoPeloMedicoEm: '' },
  ...extra,
});

const indexHtml = ({ comAviso = true, legenda = 'Imagem ilustrativa' } = {}) => `<!doctype html>
<html lang="pt-BR">
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>Demonstração — Dr. Fulano de Teste</title>
    <meta name="description" content="Demonstração: página de um cardiologista fictício, para mostrar o modelo de página.">
    <!-- @gerado:cabecalho -->
  </head>
  <body>
    ${comAviso ? `<p data-aviso-demonstracao>${AVISO}</p>` : ''}
    <main>
      <h1>Cardiologia em São Paulo</h1>
      <figure>
        <img src="imagens/retrato-480.jpg" alt="Homem de jaleco no consultório" width="480" height="600">
        <figcaption>${legenda}</figcaption>
      </figure>
    </main>
    <footer>
      <p data-identificacao-cfm>Fulano de Teste — Médico — CRM-SP 000000 · Cardiologia — RQE 00001</p>
    </footer>
  </body>
</html>
`;

const CREDITOS = `| Imagem | Autor | Banco | Licença |
|---|---|---|---|
| \`retrato\` | Autor de Teste | Unsplash | Unsplash License |
`;

/** Monta o site de teste e devolve a raiz. Cada opção desliga uma peça para provar que ela é exigida. */
async function montarSite({ pagina = paginaJson(), html = indexHtml(), creditos = CREDITOS } = {}) {
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

async function comSite(opcoes, conferir) {
  const raiz = await montarSite(opcoes);
  try {
    await conferir(rodar(raiz), raiz);
  } finally {
    await rm(raiz, { recursive: true, force: true });
  }
}

test('passa: demonstração publicada sem CRM conferido nem aprovação, com aviso e créditos', () => comSite({}, async (resultado, raiz) => {
  assert.equal(resultado.status, 0, resultado.stderr);
  const pagina = await readFile(path.join(raiz, '_site', SLUG, 'index.html'), 'utf8');
  assert.match(pagina, /<meta name="robots" content="noindex, nofollow">/);
  assert.doesNotMatch(await readFile(path.join(raiz, '_site', 'sitemap.xml'), 'utf8'), new RegExp(SLUG));
  assert.doesNotMatch(await readFile(path.join(raiz, '_site', 'index.html'), 'utf8'), new RegExp(SLUG));
}));

test('reprova: demonstração sem o aviso no topo', () => comSite({ html: indexHtml({ comAviso: false }) }, (resultado) => {
  assert.notEqual(resultado.status, 0);
  assert.match(resultado.stderr, /sem o elemento data-aviso-demonstracao/);
}));

test('reprova: demonstração sem creditos-imagens.md', () => comSite({ creditos: null }, (resultado) => {
  assert.notEqual(resultado.status, 0);
  assert.match(resultado.stderr, /sem docs\/paginas\/demo-teste\/creditos-imagens\.md/);
}));

test('reprova: imagem sem linha nos créditos', () => comSite({ creditos: '| Imagem |\n|---|\n| `outra` |\n' }, (resultado) => {
  assert.notEqual(resultado.status, 0);
  assert.match(resultado.stderr, /a imagem "retrato"/);
}));

test('reprova: imagem ilustrativa sem a legenda', () => comSite({ html: indexHtml({ legenda: 'Consultório' }) }, (resultado) => {
  assert.notEqual(resultado.status, 0);
  assert.match(resultado.stderr, /sem <figure> com <figcaption> "Imagem ilustrativa"/);
}));

test('reprova: demonstração publicada sem conferenciaCfmEm', () => comSite(
  { pagina: paginaJson({ revisao: { conferenciaCfmEm: '' } }) },
  (resultado) => {
    assert.notEqual(resultado.status, 0);
    assert.match(resultado.stderr, /revisao\.conferenciaCfmEm ausente/);
  },
));

test('reprova: página real com créditos de banco de imagem', () => comSite(
  { pagina: paginaJson({ demonstracao: false, revisao: { crmConferidoEm: '2026-09-22', conferenciaCfmEm: '2026-09-22', aprovadoPeloMedicoEm: '2026-09-22' } }) },
  (resultado) => {
    assert.notEqual(resultado.status, 0);
    assert.match(resultado.stderr, /creditos-imagens\.md numa página real/);
  },
));
