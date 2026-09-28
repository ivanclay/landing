// Prova do ADR-006 (página de sociedade de advogados): identificação da OAB, piso de termos do
// Provimento 205/2021 e demonstração de escritório fictício, sobre o site descartável de apoio.mjs.
//
//   node --test ferramentas/testes/        (npm run testar)
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import path from 'node:path';
import { SLUG, comSite } from './apoio.mjs';

const AVISO = 'Página de demonstração. Escritório de Teste Advogados é um escritório fictício; advogados, inscrições na OAB '
  + 'e contatos são fictícios. Nenhuma pessoa ou empresa real está ligada a esta página.';

const paginaAdvocacia = (extra = {}) => ({
  slug: SLUG,
  tipo: 'advocacia',
  publicar: true,
  demonstracao: true,
  atualizadoEm: '2026-09-23',
  sociedade: {
    nome: 'Escritório de Teste Advogados',
    razaoSocial: 'Escritório de Teste Sociedade de Advogados',
    categoria: 'Advocacia empresarial',
    registros: [{ uf: 'SP', numero: '00.000' }],
    areas: ['Societário', 'Tributário'],
    escritorios: [{ cidade: 'São Paulo', uf: 'SP' }],
  },
  advogados: [
    { nome: 'Fulana de Teste', cargo: 'Sócia administradora', socioAdministrador: true, oab: [{ uf: 'SP', numero: '000.001' }] },
    { nome: 'Beltrano de Teste', cargo: 'Sócio', oab: [{ uf: 'RJ', numero: '000.002' }] },
  ],
  resumo: 'Demonstração: página de um escritório de advocacia fictício, para provar o contrato da OAB.',
  cidade: 'São Paulo',
  uf: 'SP',
  contato: { telefone: '+551130000000' },
  imagemSocial: 'imagens/social.jpg',
  revisao: { oabConferidaEm: '', conferenciaOabEm: '2026-09-23', aprovadoPeloEscritorioEm: '' },
  ...extra,
});

const htmlAdvocacia = ({ comAviso = true, identificacao = true, texto = '' } = {}) => `<!doctype html>
<html lang="pt-BR">
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>Demonstração — Escritório de Teste Advogados</title>
    <meta name="description" content="Demonstração: página de um escritório de advocacia fictício, para provar o contrato da OAB.">
    <!-- @gerado:cabecalho -->
  </head>
  <body>
    ${comAviso ? `<p data-aviso-demonstracao>${AVISO}</p>` : ''}
    <main>
      <h1>Escritório de Teste Advogados</h1>
      <p>Atua em direito societário e tributário, com contratos de garantia e execução de garantias. ${texto}</p>
      <p>Beltrano de Teste · OAB/RJ 000.002</p>
    </main>
    <footer>
      ${identificacao ? '<p data-identificacao-oab>Escritório de Teste Sociedade de Advogados · OAB/SP 00.000 · Sócia administradora: Fulana de Teste, OAB/SP 000.001</p>' : ''}
    </footer>
  </body>
</html>
`;

// O site de apoio sempre grava imagens/retrato-480.jpg; a demonstração exige a linha dela nos créditos (ADR-004).
const CREDITOS = '| Imagem | Autor |\n|---|---|\n| `retrato` | Autor de Teste |\n';

const comEscritorio = (opcoes, conferir) => comSite({ pagina: paginaAdvocacia(), html: htmlAdvocacia(), creditos: CREDITOS, ...opcoes }, conferir);

test('passa: demonstração de escritório — LegalService, noindex, etiqueta no índice; "garantia" como instituto não reprova', () => comEscritorio(
  {},
  async (resultado, raiz) => {
    assert.equal(resultado.status, 0, resultado.stderr);
    const pagina = await readFile(path.join(raiz, '_site', SLUG, 'index.html'), 'utf8');
    assert.match(pagina, /<meta name="robots" content="noindex, nofollow">/);
    assert.match(pagina, /"@type":"LegalService"/);
    assert.match(pagina, /"propertyID":"OAB\/SP","value":"00.000"/);
    // O título do índice ("Médicos") não vira o nome do site na prévia do link de um escritório (B-07).
    assert.doesNotMatch(pagina, /og:site_name/);
    assert.match(await readFile(path.join(raiz, '_site', 'index.html'), 'utf8'), /Escritório fictício/);
  },
));

test('reprova: escritório sem o data-identificacao-oab', () => comEscritorio(
  { html: htmlAdvocacia({ identificacao: false }) },
  (resultado) => {
    assert.notEqual(resultado.status, 0);
    assert.match(resultado.stderr, /sem o elemento data-identificacao-oab/);
  },
));

test('reprova: advogado do pagina.json sem a inscrição na página', () => comEscritorio(
  { pagina: paginaAdvocacia({ advogados: [...paginaAdvocacia().advogados, { nome: 'Ciclano de Teste', oab: [{ uf: 'DF', numero: '000.003' }] }] }) },
  (resultado) => {
    assert.notEqual(resultado.status, 0);
    assert.match(resultado.stderr, /a inscrição de Ciclano de Teste \("OAB\/DF 000\.003"\)/);
  },
));

test('reprova: escritório sem sócio administrador', () => comEscritorio(
  { pagina: paginaAdvocacia({ advogados: [{ nome: 'Beltrano de Teste', oab: [{ uf: 'RJ', numero: '000.002' }] }] }) },
  (resultado) => {
    assert.notEqual(resultado.status, 0);
    assert.match(resultado.stderr, /ao menos um sócio administrador/);
  },
));

test('reprova: promessa de resultado e gratuidade pelo piso da OAB', () => comEscritorio(
  { html: htmlAdvocacia({ texto: 'Resultado garantido. Consulta gratuita.' }) },
  (resultado) => {
    assert.notEqual(resultado.status, 0);
    assert.match(resultado.stderr, /"resultado garantido" — promessa de resultado \(Provimento 205\/2021/);
    assert.match(resultado.stderr, /"consulta gratuita"/);
  },
));

test('reprova: demonstração de escritório sem o aviso no topo', () => comEscritorio(
  { html: htmlAdvocacia({ comAviso: false }) },
  (resultado) => {
    assert.notEqual(resultado.status, 0);
    assert.match(resultado.stderr, /sem o elemento data-aviso-demonstracao/);
  },
));

test('reprova: escritório real publicado sem inscrições conferidas nem aprovação', () => comEscritorio(
  { pagina: paginaAdvocacia({ demonstracao: false }), html: htmlAdvocacia({ comAviso: false }) },
  (resultado) => {
    assert.notEqual(resultado.status, 0);
    assert.match(resultado.stderr, /revisao\.oabConferidaEm ausente/);
    assert.match(resultado.stderr, /revisao\.aprovadoPeloEscritorioEm ausente/);
  },
));

// Emenda 2026-09-28 (ADR-006): proposta de escritório real, como a Specht Sociedade de Advocacia — publicada
// antes do registro da sociedade chegar da OAB e da aprovação do sócio administrador, espelhando a emenda do
// ADR-008 e o tratamento do ADR-009. O nome exato da razão social ainda está a confirmar com o cliente.
const paginaPropostaAdvocacia = (extra = {}) => paginaAdvocacia({
  demonstracao: false,
  proposta: true,
  sociedade: {
    nome: 'Specht Sociedade de Advocacia',
    razaoSocial: 'Specht Sociedade de Advocacia',
    categoria: 'Advocacia',
    registros: [],
    areas: ['Cível', 'Empresarial'],
    escritorios: [{ cidade: 'Salvador', uf: 'BA' }],
  },
  advogados: [
    { nome: 'Rudolf Mateus de Jesus Specht', cargo: 'Advogado responsável', socioAdministrador: true, oab: [{ uf: 'BA', numero: '77.991' }] },
  ],
  resumo: 'Proposta de página para a Specht Sociedade de Advocacia, escritório de advocacia em Salvador (BA).',
  revisao: { conferenciaOabEm: '2026-09-28' },
  ...extra,
});

const htmlPropostaAdvocacia = ({ identificacao = true, texto = '' } = {}) => `<!doctype html>
<html lang="pt-BR">
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>Specht Sociedade de Advocacia</title>
    <meta name="description" content="Proposta de página para a Specht Sociedade de Advocacia, escritório de advocacia em Salvador (BA).">
    <!-- @gerado:cabecalho -->
  </head>
  <body>
    <main>
      <h1>Specht Sociedade de Advocacia</h1>
      <p>Atua em direito cível e empresarial. ${texto}</p>
    </main>
    <footer>
      ${identificacao ? '<p data-identificacao-oab>Specht Sociedade de Advocacia · Advogado responsável: Rudolf Mateus de Jesus Specht, OAB/BA 77.991</p>' : ''}
    </footer>
  </body>
</html>
`;

test('passa: proposta de escritório real sem o registro da sociedade — noindex, fora do sitemap, etiqueta no índice', () => comSite(
  { pagina: paginaPropostaAdvocacia(), html: htmlPropostaAdvocacia() },
  async (resultado, raiz) => {
    assert.equal(resultado.status, 0, resultado.stderr + resultado.stdout);
    const html = await readFile(path.join(raiz, '_site', SLUG, 'index.html'), 'utf8');
    assert.match(html, /<meta name="robots" content="noindex, nofollow">/);
    const sitemap = await readFile(path.join(raiz, '_site', 'sitemap.xml'), 'utf8');
    assert.doesNotMatch(sitemap, new RegExp(SLUG));
    const indice = await readFile(path.join(raiz, '_site', 'index.html'), 'utf8');
    assert.match(indice, /Proposta · em avaliação/);
  },
));

test('reprova: proposta de escritório sem a conferência da OAB', () => comSite(
  { pagina: paginaPropostaAdvocacia({ revisao: {} }), html: htmlPropostaAdvocacia() },
  (resultado) => {
    assert.notEqual(resultado.status, 0);
    assert.match(resultado.stderr, /revisao\.conferenciaOabEm ausente/);
  },
));

test('reprova: publicação normal (fora da proposta) sem o registro da sociedade', () => comSite(
  {
    pagina: paginaAdvocacia({ demonstracao: false, sociedade: { ...paginaAdvocacia().sociedade, registros: [] },
      revisao: { oabConferidaEm: '2026-09-28', conferenciaOabEm: '2026-09-28', aprovadoPeloEscritorioEm: '2026-09-28' } }),
    html: htmlAdvocacia({ comAviso: false }),
  },
  (resultado) => {
    assert.notEqual(resultado.status, 0);
    assert.match(resultado.stderr, /sociedade\.registros precisa do registro na seccional da OAB/);
  },
));

test('reprova: publicação normal com razão social só "Sociedade de Advocacia" (sem "Advogados" nem "Sociedade Individual de Advocacia")', () => comSite(
  {
    pagina: paginaAdvocacia({ demonstracao: false, sociedade: { ...paginaAdvocacia().sociedade, razaoSocial: 'Specht Sociedade de Advocacia' },
      revisao: { oabConferidaEm: '2026-09-28', conferenciaOabEm: '2026-09-28', aprovadoPeloEscritorioEm: '2026-09-28' } }),
    html: htmlAdvocacia({ comAviso: false }),
  },
  (resultado) => {
    assert.notEqual(resultado.status, 0);
    assert.match(resultado.stderr, /sociedade\.razaoSocial ausente ou sem "Advogados" nem "Sociedade Individual de Advocacia"/);
  },
));

const htmlAdvocaciaIndividual = () => `<!doctype html>
<html lang="pt-BR">
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>Rudolf Specht Sociedade Individual de Advocacia</title>
    <meta name="description" content="Escritório de advocacia individual de teste, para provar a razão social do art. 16, § 4º.">
    <!-- @gerado:cabecalho -->
  </head>
  <body>
    <main>
      <h1>Rudolf Specht Sociedade Individual de Advocacia</h1>
      <p>Atua em direito societário e tributário.</p>
    </main>
    <footer>
      <p data-identificacao-oab>Rudolf Specht Sociedade Individual de Advocacia · OAB/SP 00.000 · Sócia administradora: Fulana de Teste, OAB/SP 000.001</p>
    </footer>
  </body>
</html>
`;

test('passa: publicação normal com "Sociedade Individual de Advocacia" na razão social (Lei 8.906/1994, art. 16, § 4º)', () => comSite(
  {
    pagina: paginaAdvocacia({
      demonstracao: false,
      sociedade: { ...paginaAdvocacia().sociedade, razaoSocial: 'Rudolf Specht Sociedade Individual de Advocacia' },
      // Sociedade individual: um único advogado, sócio administrador — não há "Beltrano" a citar na página.
      advogados: [{ nome: 'Fulana de Teste', cargo: 'Sócia administradora', socioAdministrador: true, oab: [{ uf: 'SP', numero: '000.001' }] }],
      revisao: { oabConferidaEm: '2026-09-28', conferenciaOabEm: '2026-09-28', aprovadoPeloEscritorioEm: '2026-09-28' },
    }),
    html: htmlAdvocaciaIndividual(),
  },
  (resultado) => {
    assert.equal(resultado.status, 0, resultado.stderr + resultado.stdout);
  },
));
