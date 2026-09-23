// Prova do ADR-004 (modo demonstração) e do ADR-005 (negócio e proposta), sobre o site descartável de apoio.mjs.
//
//   node --test ferramentas/testes/        (npm run testar)
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import path from 'node:path';
import { SLUG, comSite as comSiteDeTeste } from './apoio.mjs';

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

/** O site de teste da demonstração; cada opção desliga uma peça para provar que ela é exigida. */
const comSite = (opcoes, conferir) => comSiteDeTeste({ pagina: paginaJson(), html: indexHtml(), creditos: CREDITOS, ...opcoes }, conferir);

test('passa: demonstração publicada sem CRM conferido nem aprovação, com aviso e créditos', () => comSite({}, async (resultado, raiz) => {
  assert.equal(resultado.status, 0, resultado.stderr);
  const pagina = await readFile(path.join(raiz, '_site', SLUG, 'index.html'), 'utf8');
  assert.match(pagina, /<meta name="robots" content="noindex, nofollow">/);
  assert.match(pagina, /<meta property="og:image:width" content="1200">/);
  // A imagem social leva a versão do arquivo, para as redes buscarem de novo quando ela mudar.
  assert.match(pagina, /<meta property="og:image" content="[^"]*imagens\/social\.jpg\?v=[0-9a-f]{8}">/);
  assert.match(pagina, /<meta property="og:image:alt" content="Demonstração: /);
  assert.doesNotMatch(await readFile(path.join(raiz, '_site', 'sitemap.xml'), 'utf8'), new RegExp(SLUG));
  // No índice, só na coluna "Demonstrações", etiquetada — nunca em "Produtos dos clientes" (ADR-007).
  const indice = await readFile(path.join(raiz, '_site', 'index.html'), 'utf8');
  const [demonstracoes, clientes] = indice.split('id="titulo-clientes"');
  assert.match(demonstracoes, new RegExp(`href="${SLUG}/"`));
  assert.doesNotMatch(clientes, new RegExp(SLUG));
  assert.match(demonstracoes, /Demonstração · médico fictício/);
  // Quem assina o índice é a empresa; a página do cliente não leva o nome dela na prévia.
  assert.match(indice, /<meta property="og:site_name" content="[^"]+">/);
  // O índice tem prévia de link própria: imagem 1200 × 630 com versão, e a empresa nos dados estruturados.
  assert.match(indice, /<meta property="og:image" content="[^"]*assets\/imagens\/social-indice\.jpg\?v=[0-9a-f]{8}">/);
  assert.match(indice, /<meta name="twitter:card" content="summary_large_image">/);
  assert.match(indice, /"@type":"Organization"/);
  assert.doesNotMatch(pagina, /og:site_name/);
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

// ---------- ADR-005: página de negócio e modo proposta ----------

const AVISO_PROPOSTA = 'Proposta de novo site para Consultoria de Teste, em avaliação. Este não é o site oficial: '
  + 'o site oficial é consultoriadeteste.com.br.';

const paginaNegocio = (extra = {}) => ({
  slug: SLUG,
  tipo: 'negocio',
  proposta: true,
  publicar: true,
  atualizadoEm: '2026-09-22',
  organizacao: { nome: 'Consultoria de Teste', categoria: 'Consultoria em saúde' },
  siteOficial: 'https://www.consultoriadeteste.com.br/',
  resumo: 'Consultoria de teste em gestão de saúde, para provar o contrato de página de negócio.',
  contato: { whatsapp: '+5511900000000' },
  ...extra,
});

const htmlNegocio = ({ comAviso = true } = {}) => `<!doctype html>
<html lang="pt-BR">
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>Consultoria de Teste</title>
    <meta name="description" content="Consultoria de teste em gestão de saúde, para provar o contrato de página de negócio.">
    <!-- @gerado:cabecalho -->
  </head>
  <body>
    ${comAviso ? `<p data-aviso-proposta>${AVISO_PROPOSTA}</p>` : ''}
    <main><h1>Consultoria de Teste</h1></main>
  </body>
</html>
`;

test('passa: proposta de negócio sem CRM, com aviso — noindex e fora do sitemap', () => comSite(
  { pagina: paginaNegocio(), html: htmlNegocio(), creditos: null },
  async (resultado, raiz) => {
    assert.equal(resultado.status, 0, resultado.stderr);
    const pagina = await readFile(path.join(raiz, '_site', SLUG, 'index.html'), 'utf8');
    assert.match(pagina, /<meta name="robots" content="noindex, nofollow">/);
    assert.match(pagina, /"@type":"ProfessionalService"/);
    assert.doesNotMatch(await readFile(path.join(raiz, '_site', 'sitemap.xml'), 'utf8'), new RegExp(SLUG));
    // A proposta é de um cliente real: entra na coluna "Produtos dos clientes", etiquetada (ADR-007).
    const [demonstracoes, clientes] = (await readFile(path.join(raiz, '_site', 'index.html'), 'utf8')).split('id="titulo-clientes"');
    assert.doesNotMatch(demonstracoes, new RegExp(`href="${SLUG}/"`));
    assert.match(clientes, /Proposta · em avaliação/);
  },
));

test('reprova: proposta sem o aviso de que não é o site oficial', () => comSite(
  { pagina: paginaNegocio(), html: htmlNegocio({ comAviso: false }), creditos: null },
  (resultado) => {
    assert.notEqual(resultado.status, 0);
    assert.match(resultado.stderr, /sem o elemento data-aviso-proposta/);
  },
));

test('reprova: negócio publicado fora de proposta sem a aprovação do cliente', () => comSite(
  { pagina: paginaNegocio({ proposta: false }), html: htmlNegocio({ comAviso: false }), creditos: null },
  (resultado) => {
    assert.notEqual(resultado.status, 0);
    assert.match(resultado.stderr, /revisao\.aprovadoPeloClienteEm ausente/);
  },
));
