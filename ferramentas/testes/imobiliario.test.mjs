// Prova do ADR-009 (página de corretor(a) de imóveis): identificação do CRECI, piso de termos do Código de
// Ética do COFECI (Res. COFECI 326/1992) e as revisões (regra 4), sobre o site descartável de apoio.mjs.
//
//   node --test ferramentas/testes/        (npm run testar)
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import path from 'node:path';
import { SLUG, comSite } from './apoio.mjs';

const paginaImobiliario = (extra = {}) => ({
  slug: SLUG,
  tipo: 'imobiliario',
  publicar: true,
  atualizadoEm: '2026-09-27',
  corretor: {
    nome: 'Fulana de Teste',
    generoGramatical: 'F',
    creci: { uf: 'BA', numero: '12.345' },
  },
  resumo: 'Corretora de imóveis de teste: página que prova o contrato do CRECI e do Código de Ética do COFECI.',
  contato: { whatsapp: '+5571900000000' },
  imagemSocial: 'imagens/social.jpg',
  revisao: { creciConferidoEm: '2026-09-27', conferenciaCofeciEm: '2026-09-27', aprovadoPelaCorretoraEm: '2026-09-27' },
  ...extra,
});

const htmlImobiliario = ({ identificacao = 'Fulana de Teste · Corretora de Imóveis · CRECI-BA 12.345', texto = '' } = {}) => `<!doctype html>
<html lang="pt-BR">
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>Fulana de Teste — Corretora de Imóveis</title>
    <meta name="description" content="Corretora de imóveis de teste: página que prova o contrato do CRECI e do Código de Ética do COFECI.">
    <!-- @gerado:cabecalho -->
  </head>
  <body>
    <main>
      <h1>Fulana de Teste</h1>
      <p>Consultoria imobiliária com segurança, possibilidades de financiamento e avaliação gratuita. ${texto}</p>
    </main>
    <footer>
      ${identificacao === null ? '' : `<p data-identificacao-creci>${identificacao}</p>`}
    </footer>
  </body>
</html>
`;

test('corretora com CRECI, texto dentro do código e as três datas passa — e o JSON-LD leva o CRECI', async () => {
  await comSite({ pagina: paginaImobiliario(), html: htmlImobiliario() }, async (resultado, raiz) => {
    assert.equal(resultado.status, 0, resultado.stderr + resultado.stdout);
    const html = await readFile(path.join(raiz, '_site', SLUG, 'index.html'), 'utf8');
    const dados = JSON.parse(/<script type="application\/ld\+json">([^<]+)<\/script>/.exec(html)[1]);
    assert.equal(dados['@type'], 'RealEstateAgent');
    assert.equal(dados.employee.jobTitle, 'Corretora de Imóveis');
    assert.deepEqual(dados.employee.identifier, [{ '@type': 'PropertyValue', propertyID: 'CRECI-BA', value: '12.345' }]);
  });
});

test('sem o elemento data-identificacao-creci reprova (Lei 6.530/1978, art. 3º)', async () => {
  await comSite({ pagina: paginaImobiliario(), html: htmlImobiliario({ identificacao: null }) }, (resultado) => {
    assert.notEqual(resultado.status, 0);
    assert.match(resultado.stderr, /sem o elemento data-identificacao-creci/);
  });
});

test('identificação sem a inscrição no CRECI reprova', async () => {
  await comSite({ pagina: paginaImobiliario(), html: htmlImobiliario({ identificacao: 'Fulana de Teste · Corretora de Imóveis' }) }, (resultado) => {
    assert.notEqual(resultado.status, 0);
    assert.match(resultado.stderr, /não mostra a inscrição no CRECI \("CRECI-BA 12.345"\)/);
  });
});

test('identificação sem a profissão reprova', async () => {
  await comSite({ pagina: paginaImobiliario(), html: htmlImobiliario({ identificacao: 'Fulana de Teste · CRECI-BA 12.345' }) }, (resultado) => {
    assert.notEqual(resultado.status, 0);
    assert.match(resultado.stderr, /não mostra a profissão \("Corretora de Imóveis"\)/);
  });
});

test('"aprovação garantida" reprova (piso do COFECI)', async () => {
  await comSite({ pagina: paginaImobiliario(), html: htmlImobiliario({ texto: 'Aprovação garantida em 24 horas.' }) }, (resultado) => {
    assert.notEqual(resultado.status, 0);
    assert.match(resultado.stderr, /"aprovacao garantida" — promessa de resultado de crédito ou financiamento/);
  });
});

test('o texto legítimo da página (segurança, possibilidades, financiamento, gratuita) não reprova', async () => {
  await comSite({ pagina: paginaImobiliario(), html: htmlImobiliario() }, (resultado) => {
    assert.equal(resultado.status, 0, resultado.stderr + resultado.stdout);
  });
});

test('publicada sem a conferência do COFECI reprova (regra 3)', async () => {
  const pagina = paginaImobiliario({ revisao: { creciConferidoEm: '2026-09-27', aprovadoPelaCorretoraEm: '2026-09-27' } });
  await comSite({ pagina, html: htmlImobiliario() }, (resultado) => {
    assert.notEqual(resultado.status, 0);
    assert.match(resultado.stderr, /revisao\.conferenciaCofeciEm ausente/);
  });
});

test('publicada (não proposta) sem a inscrição conferida no CRECI reprova (regra 4)', async () => {
  const pagina = paginaImobiliario({ revisao: { conferenciaCofeciEm: '2026-09-27', aprovadoPelaCorretoraEm: '2026-09-27' } });
  await comSite({ pagina, html: htmlImobiliario() }, (resultado) => {
    assert.notEqual(resultado.status, 0);
    assert.match(resultado.stderr, /revisao\.creciConferidoEm ausente/);
  });
});

test('CRECI PENDENTE publicada não constrói', async () => {
  const pagina = paginaImobiliario({ corretor: { nome: 'Fulana de Teste', generoGramatical: 'F', creci: 'PENDENTE' } });
  await comSite({ pagina, html: htmlImobiliario({ identificacao: 'Fulana de Teste · Corretora de Imóveis · CRECI PENDENTE' }) }, (resultado) => {
    assert.notEqual(resultado.status, 0);
    assert.match(resultado.stderr, /corretor\.creci PENDENTE/);
  });
});

// Proposta (ADR-009, espelha a emenda do ADR-008): publica antes da aprovação da corretora, só por link.
const AVISO_PROPOSTA = 'Proposta de página para Fulana de Teste, em avaliação pela corretora.';
const paginaProposta = () => paginaImobiliario({ proposta: true, revisao: { conferenciaCofeciEm: '2026-09-27' } });
const htmlProposta = (comAviso = true) => htmlImobiliario().replace('<body>',
  `<body>\n    ${comAviso ? `<p data-aviso-proposta>${AVISO_PROPOSTA}</p>` : ''}`);

test('proposta de corretora passa sem a aprovação dela — noindex, fora do sitemap, etiqueta no índice', async () => {
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

test('proposta de corretora sem o aviso no topo reprova', async () => {
  await comSite({ pagina: paginaProposta(), html: htmlProposta(false) }, (resultado) => {
    assert.notEqual(resultado.status, 0);
    assert.match(resultado.stderr, /sem o elemento data-aviso-proposta/);
  });
});

test('demonstracao não se aplica a corretor de imóveis — reprova', async () => {
  const pagina = paginaImobiliario({ demonstracao: true });
  await comSite({ pagina, html: htmlImobiliario() }, (resultado) => {
    assert.notEqual(resultado.status, 0);
    assert.match(resultado.stderr, /demonstracao não se aplica a corretor de imóveis/);
  });
});
