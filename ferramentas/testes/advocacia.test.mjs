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
