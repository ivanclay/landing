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

test('WhatsApp PENDENTE publicado não constrói (regras 1 e 5)', async () => {
  const pagina = paginaImobiliario({ contato: { whatsapp: 'PENDENTE' } });
  await comSite({ pagina, html: htmlImobiliario() }, (resultado) => {
    assert.notEqual(resultado.status, 0);
    assert.match(resultado.stderr, /contato\.whatsapp PENDENTE/);
  });
});

test('WhatsApp PENDENTE em rascunho constrói, mas a página que mostra PENDENTE reprova e o JSON-LD fica sem telefone', async () => {
  const pagina = paginaImobiliario({ publicar: false, contato: { whatsapp: 'PENDENTE' } });
  await comSite({ pagina, html: htmlImobiliario({ texto: 'WhatsApp PENDENTE' }), rascunhos: true }, async (resultado, raiz) => {
    assert.notEqual(resultado.status, 0);
    assert.doesNotMatch(resultado.stderr, /contato\.whatsapp/);
    assert.match(resultado.stdout + resultado.stderr, /PENDENTE/);
    const html = await readFile(path.join(raiz, '_site', SLUG, 'index.html'), 'utf8');
    const dados = JSON.parse(/<script type="application\/ld\+json">([^<]+)<\/script>/.exec(html)[1]);
    assert.equal(dados.telephone, undefined);
  });
});

// Proposta (ADR-009, espelha a emenda do ADR-008): publica antes da aprovação da corretora, só por link.
// Sem site oficial, a proposta não leva aviso na página: só a etiqueta do índice (decisão do dono, 2026-09-27).
const paginaProposta = () => paginaImobiliario({ proposta: true, revisao: { conferenciaCofeciEm: '2026-09-27' } });

test('proposta de corretora passa sem a aprovação dela — noindex, fora do sitemap, etiqueta no índice', async () => {
  await comSite({ pagina: paginaProposta(), html: htmlImobiliario() }, async (resultado, raiz) => {
    assert.equal(resultado.status, 0, resultado.stderr + resultado.stdout);
    const html = await readFile(path.join(raiz, '_site', SLUG, 'index.html'), 'utf8');
    assert.match(html, /<meta name="robots" content="noindex, nofollow">/);
    const sitemap = await readFile(path.join(raiz, '_site', 'sitemap.xml'), 'utf8');
    assert.doesNotMatch(sitemap, new RegExp(SLUG));
    const indice = await readFile(path.join(raiz, '_site', 'index.html'), 'utf8');
    assert.match(indice, /Proposta · em avaliação/);
  });
});

test('proposta de corretora dispensa o aviso no topo', async () => {
  await comSite({ pagina: paginaProposta(), html: htmlImobiliario() }, async (resultado, raiz) => {
    assert.equal(resultado.status, 0, resultado.stderr + resultado.stdout);
    const html = await readFile(path.join(raiz, '_site', SLUG, 'index.html'), 'utf8');
    assert.doesNotMatch(html, /data-aviso-proposta/);
  });
});

test('proposta com site oficial ainda exige o aviso no topo', async () => {
  const pagina = paginaImobiliario({ proposta: true, siteOficial: 'https://exemplo.com.br', revisao: { conferenciaCofeciEm: '2026-09-27' } });
  await comSite({ pagina, html: htmlImobiliario() }, (resultado) => {
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

// Opções de layout da proposta (opcao-N.html): cada uma com cabeçalho gerado próprio, para a prévia do link.
test('outra página da pasta com o marcador ganha canonical e prévia próprios, sem JSON-LD', async () => {
  const extras = { 'opcao-1.html': htmlImobiliario(), 'imagens/social-opcao-1.jpg': 'jpeg de teste' };
  await comSite({ pagina: paginaProposta(), html: htmlImobiliario(), extras }, async (resultado, raiz) => {
    assert.equal(resultado.status, 0, resultado.stderr + resultado.stdout);
    const html = await readFile(path.join(raiz, '_site', SLUG, 'opcao-1.html'), 'utf8');
    assert.match(html, new RegExp(`<link rel="canonical" href="[^"]*/${SLUG}/opcao-1\.html">`));
    assert.match(html, /<meta property="og:image" content="[^"]*\/imagens\/social-opcao-1\.jpg/);
    assert.match(html, /<meta name="robots" content="noindex, nofollow">/);
    assert.doesNotMatch(html, /application\/ld\+json/);
  });
});

// "Corretora e Avaliadora de Imóveis": só com a inscrição no CNAI (Res. COFECI 1.066/2007).
test('avaliadora com CNAI passa, com a profissão completa na identificação', async () => {
  const pagina = paginaImobiliario({ proposta: true, revisao: { conferenciaCofeciEm: '2026-09-27' },
    corretor: { nome: 'Fulana de Teste', generoGramatical: 'F', creci: { uf: 'BA', numero: '12.345' }, cnai: '1.234', avaliador: true } });
  const html = htmlImobiliario({ identificacao: 'Fulana de Teste · Corretora e Avaliadora de Imóveis · CRECI-BA 12.345 · CNAI 1.234' });
  await comSite({ pagina, html }, (resultado) => {
    assert.equal(resultado.status, 0, resultado.stderr + resultado.stdout);
  });
});

test('avaliadora sem CNAI reprova', async () => {
  const pagina = paginaImobiliario({ corretor: { nome: 'Fulana de Teste', generoGramatical: 'F', creci: { uf: 'BA', numero: '12.345' }, avaliador: true } });
  await comSite({ pagina, html: htmlImobiliario() }, (resultado) => {
    assert.notEqual(resultado.status, 0);
    assert.match(resultado.stderr, /sem inscrição no CNAI não há avaliador/);
  });
});

// Saiu da proposta com as três datas: o índice mostra "Aprovado" (pedido do dono, 2026-09-27).
test('página aprovada (fora da proposta) leva a etiqueta "Aprovado" no índice', async () => {
  await comSite({ pagina: paginaImobiliario(), html: htmlImobiliario() }, async (resultado, raiz) => {
    assert.equal(resultado.status, 0, resultado.stderr + resultado.stdout);
    const indice = await readFile(path.join(raiz, '_site', 'index.html'), 'utf8');
    assert.match(indice, /tabela__etiqueta--aprovado">Aprovado</);
    assert.doesNotMatch(indice, /Proposta · em avaliação/);
  });
});
