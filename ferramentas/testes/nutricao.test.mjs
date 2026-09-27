// Prova do ADR-008 (página de nutricionista): identificação do CRN, piso de termos do Código de Ética do
// Nutricionista (Res. CFN 599/2018) e as três datas de revisão, sobre o site descartável de apoio.mjs.
//
//   node --test ferramentas/testes/        (npm run testar)
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import path from 'node:path';
import { SLUG, comSite } from './apoio.mjs';

const paginaNutricao = (extra = {}) => ({
  slug: SLUG,
  tipo: 'nutricao',
  publicar: true,
  atualizadoEm: '2026-09-27',
  nutricionista: {
    nome: 'Fulana de Teste',
    crn: { regiao: 5, numero: '00001' },
    areas: ['Nutrição Clínica'],
  },
  resumo: 'Nutricionista de teste: página que prova o contrato do CRN e do Código de Ética do Nutricionista.',
  contato: { whatsapp: '+5571900000000', email: 'teste@example.com' },
  imagemSocial: 'imagens/social.jpg',
  revisao: { crnConferidoEm: '2026-09-27', conferenciaCfnEm: '2026-09-27', aprovadoPelaNutricionistaEm: '2026-09-27' },
  ...extra,
});

const htmlNutricao = ({ identificacao = 'Fulana de Teste · Nutricionista · CRN-5 00001', texto = '' } = {}) => `<!doctype html>
<html lang="pt-BR">
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>Fulana de Teste — Nutricionista</title>
    <meta name="description" content="Nutricionista de teste: página que prova o contrato do CRN e do Código de Ética do Nutricionista.">
    <!-- @gerado:cabecalho -->
  </head>
  <body>
    <main>
      <h1>Fulana de Teste</h1>
      <p>Atendimento nutricional presencial e on-line. ${texto}</p>
    </main>
    <footer>
      ${identificacao === null ? '' : `<p data-identificacao-crn>${identificacao}</p>`}
    </footer>
  </body>
</html>
`;

test('nutricionista com CRN, texto dentro do código e as três datas passa — e o JSON-LD leva o CRN', async () => {
  await comSite({ pagina: paginaNutricao(), html: htmlNutricao() }, async (resultado, raiz) => {
    assert.equal(resultado.status, 0, resultado.stderr + resultado.stdout);
    const html = await readFile(path.join(raiz, '_site', SLUG, 'index.html'), 'utf8');
    const dados = JSON.parse(/<script type="application\/ld\+json">([^<]+)<\/script>/.exec(html)[1]);
    assert.equal(dados['@type'], 'ProfessionalService');
    assert.equal(dados.employee.jobTitle, 'Nutricionista');
    assert.deepEqual(dados.employee.identifier, { '@type': 'PropertyValue', propertyID: 'CRN-5', value: '00001' });
  });
});

test('sem o elemento data-identificacao-crn reprova (art. 21)', async () => {
  await comSite({ pagina: paginaNutricao(), html: htmlNutricao({ identificacao: null }) }, (resultado) => {
    assert.notEqual(resultado.status, 0);
    assert.match(resultado.stderr, /sem o elemento data-identificacao-crn/);
  });
});

test('identificação sem a inscrição no CRN reprova', async () => {
  await comSite({ pagina: paginaNutricao(), html: htmlNutricao({ identificacao: 'Fulana de Teste · Nutricionista' }) }, (resultado) => {
    assert.notEqual(resultado.status, 0);
    assert.match(resultado.stderr, /não mostra a inscrição no CRN \("CRN-5 00001"\)/);
  });
});

for (const preco of ['Consulta presencial: R$ 400', 'Consulta on-line por R$380']) {
  test(`preço de consulta reprova (art. 57): "${preco}"`, async () => {
    await comSite({ pagina: paginaNutricao(), html: htmlNutricao({ texto: preco }) }, (resultado) => {
      assert.notEqual(resultado.status, 0);
      assert.match(resultado.stderr, /"r\$" — valor de honorários usado como publicidade \(Res\. CFN 599\/2018, art\. 57\)/);
    });
  });
}

test('antes e depois reprova (art. 58)', async () => {
  await comSite({ pagina: paginaNutricao(), html: htmlNutricao({ texto: 'Veja o antes e depois.' }) }, (resultado) => {
    assert.notEqual(resultado.status, 0);
    assert.match(resultado.stderr, /art\. 58/);
  });
});

test('publicar sem a inscrição conferida no CRN reprova (regra 4)', async () => {
  const pagina = paginaNutricao({ revisao: { conferenciaCfnEm: '2026-09-27', aprovadoPelaNutricionistaEm: '2026-09-27' } });
  await comSite({ pagina, html: htmlNutricao() }, (resultado) => {
    assert.notEqual(resultado.status, 0);
    assert.match(resultado.stderr, /revisao\.crnConferidoEm ausente/);
  });
});

test('CRN PENDENTE não publica', async () => {
  const pagina = paginaNutricao({ nutricionista: { nome: 'Fulana de Teste', crn: 'PENDENTE' } });
  await comSite({ pagina, html: htmlNutricao({ identificacao: 'Fulana de Teste · Nutricionista · CRN PENDENTE' }) }, (resultado) => {
    assert.notEqual(resultado.status, 0);
    assert.match(resultado.stderr, /nutricionista\.crn PENDENTE/);
  });
});

// Emenda de 2026-09-27: proposta de nutricionista — publicada antes da aprovação dela, por decisão do dono.
const AVISO_PROPOSTA = 'Proposta de página para Fulana de Teste, em avaliação pela nutricionista.';
const paginaProposta = () => paginaNutricao({ proposta: true, revisao: { conferenciaCfnEm: '2026-09-27' } });
const htmlProposta = (comAviso = true) => htmlNutricao().replace('<body>',
  `<body>\n    ${comAviso ? `<p data-aviso-proposta>${AVISO_PROPOSTA}</p>` : ''}`);

test('proposta de nutricionista passa sem a aprovação dela — noindex, fora do sitemap, etiqueta no índice', async () => {
  await comSite({ pagina: paginaProposta(), html: htmlProposta() }, async (resultado, raiz) => {
    assert.equal(resultado.status, 0, resultado.stderr + resultado.stdout);
    const html = await readFile(path.join(raiz, '_site', SLUG, 'index.html'), 'utf8');
    assert.match(html, /<meta name="robots" content="noindex, nofollow">/);
    const sitemap = await readFile(path.join(raiz, '_site', 'sitemap.xml'), 'utf8');
    assert.doesNotMatch(sitemap, new RegExp(SLUG));
    const indice = await readFile(path.join(raiz, '_site', 'index.html'), 'utf8');
    assert.match(indice, /Proposta · em avaliação/);
  });
});

test('proposta de nutricionista sem o aviso no topo reprova', async () => {
  await comSite({ pagina: paginaProposta(), html: htmlProposta(false) }, (resultado) => {
    assert.notEqual(resultado.status, 0);
    assert.match(resultado.stderr, /sem o elemento data-aviso-proposta/);
  });
});

test('proposta de nutricionista sem a conferência do CFN reprova', async () => {
  const pagina = paginaNutricao({ proposta: true, revisao: {} });
  await comSite({ pagina, html: htmlProposta() }, (resultado) => {
    assert.notEqual(resultado.status, 0);
    assert.match(resultado.stderr, /revisao\.conferenciaCfnEm ausente/);
  });
});
