#!/usr/bin/env node
// Monta _site/ a partir de site/: copia os ativos e as páginas publicadas, escreve o cabeçalho gerado
// (canonical, Open Graph, JSON-LD), gera o índice, o 404, os redirecionamentos, o sitemap e o robots.
//
//   node ferramentas/construir.mjs              o que vai para o ar (é o que o CI roda)
//   node ferramentas/construir.mjs --rascunhos  inclui as páginas com publicar=false, com noindex,
//                                               para ver no navegador antes da aprovação do médico
import {
  RAIZ, PASTA_SITE, PASTA_SAIDA, PASTA_MODELOS, ehPastaDePagina, lerJson, listarPastas,
  readFile, writeFile, mkdir, cp, rm, existsSync, path,
} from './lib/arquivos.mjs';
import {
  validarPagina, nomeDeExibicao, ehNegocio, ehDemonstracao, ehProposta, soPorLinkDireto, FORMATO_SLUG,
} from './lib/pagina.mjs';
import { cabecalhoDaPagina, cabecalhoDoIndice, urlDaPagina } from './lib/seo.mjs';
import { escaparHtml } from './lib/html.mjs';
import { createHash } from 'node:crypto';

const MARCADOR_CABECALHO = '<!-- @gerado:cabecalho -->';
const MARCADOR_LISTA = '<!-- @gerado:lista -->';
const MARCADOR_EXEMPLOS = '<!-- @gerado:exemplos -->';
const incluirRascunhos = process.argv.includes('--rascunhos');

async function construir() {
  const config = await lerJson(path.join(RAIZ, 'site.config.json'));
  if (!config.urlBase?.endsWith('/')) throw new Error('site.config.json: urlBase precisa terminar em "/"');

  await rm(PASTA_SAIDA, { recursive: true, force: true });
  await mkdir(PASTA_SAIDA, { recursive: true });
  await cp(path.join(PASTA_SITE, 'assets'), path.join(PASTA_SAIDA, 'assets'), { recursive: true });

  const erros = [];
  const publicadas = [];
  for (const pasta of (await listarPastas(PASTA_SITE)).filter(ehPastaDePagina)) {
    const resultado = await construirPagina(pasta, config);
    if (resultado.erros.length) erros.push(...resultado.erros.map((erro) => `site/${pasta}: ${erro}`));
    else if (resultado.pagina) publicadas.push(resultado.pagina);
  }
  erros.push(...(await gerarRedirecionamentos(config, publicadas)));
  if (erros.length) return falhar(erros);

  // Demonstração e proposta ficam fora do sitemap e da lista principal (ADR-004, ADR-005). Com
  // indice.mostrarDemonstracoes, o índice as mostra numa seção à parte, etiquetadas — continuam noindex.
  const listaveis = publicadas.filter((p) => !soPorLinkDireto(p));
  const exemplos = config.indice.mostrarDemonstracoes ? publicadas.filter((p) => p.publicar && soPorLinkDireto(p)) : [];
  await gerarIndice(config, listaveis, exemplos);
  await copiarModelo('404.html', '404.html', config);
  await writeFile(path.join(PASTA_SAIDA, 'sitemap.xml'), sitemap(config, listaveis.filter((p) => p.publicar)));
  await writeFile(path.join(PASTA_SAIDA, 'robots.txt'),
    `User-agent: *\nAllow: /\n\nSitemap: ${new URL('sitemap.xml', config.urlBase).href}\n`);

  const rascunhos = publicadas.filter((p) => !p.publicar).length;
  const soPorLink = publicadas.filter((p) => p.publicar && soPorLinkDireto(p)).length;
  console.log(`_site/ pronto: ${publicadas.length - rascunhos} página(s) publicada(s)`
    + (soPorLink ? ` (${soPorLink} de demonstração ou proposta, com noindex)` : '')
    + (rascunhos ? ` e ${rascunhos} rascunho(s) com noindex — NÃO publique esta construção` : '') + '.');
}

async function construirPagina(pasta, config) {
  const origem = path.join(PASTA_SITE, pasta);
  const arquivoPagina = path.join(origem, 'pagina.json');
  if (!existsSync(arquivoPagina)) return { erros: ['sem pagina.json — toda página declara quem é o médico'] };
  const pagina = await lerJson(arquivoPagina);
  const erros = validarPagina(pagina, pasta);
  if (erros.length) return { erros };
  if (!pagina.publicar && !incluirRascunhos) {
    console.log(`site/${pasta}: rascunho (publicar=false), fora do ar.`);
    return { erros: [] };
  }

  const destino = path.join(PASTA_SAIDA, pasta);
  // pagina.json e arquivos que começam com _ são de trabalho: não vão para o ar.
  await cp(origem, destino, {
    recursive: true,
    filter: (arquivo) => {
      const nome = path.basename(arquivo);
      return nome !== 'pagina.json' && !nome.startsWith('_');
    },
  });
  const arquivoHtml = path.join(destino, 'index.html');
  if (!existsSync(arquivoHtml)) return { erros: ['sem index.html'] };
  const html = await readFile(arquivoHtml, 'utf8');
  if (!html.includes(MARCADOR_CABECALHO)) return { erros: [`index.html sem o marcador ${MARCADOR_CABECALHO} no <head>`] };
  const cabecalho = cabecalhoDaPagina(pagina, config, { rascunho: !pagina.publicar, versaoImagem: await versaoDoArquivo(path.join(origem, pagina.imagemSocial ?? '')) });
  await writeFile(arquivoHtml, html.replace(MARCADOR_CABECALHO, cabecalho));
  return { erros: [], pagina };
}

/** 8 caracteres do SHA-256 do arquivo; vazio se não houver arquivo. Muda sempre que o conteúdo muda. */
async function versaoDoArquivo(caminho) {
  if (!existsSync(caminho) || !path.extname(caminho)) return '';
  return createHash('sha256').update(await readFile(caminho)).digest('hex').slice(0, 8);
}

async function gerarIndice(config, paginas, exemplos = []) {
  const emOrdem = (lista) => [...lista].sort((a, b) => nomeDeExibicao(a).localeCompare(nomeDeExibicao(b), 'pt-BR'));
  const lista = emOrdem(paginas).map((pagina) => itemDoIndice(pagina)).join('') || `
        <li class="indice__vazio">Nenhuma página de cliente publicada ainda.</li>`;
  const secaoExemplos = exemplos.length ? `
      <section class="exemplos" aria-labelledby="titulo-exemplos">
        <h2 id="titulo-exemplos" class="exemplos__titulo">Demonstrações e propostas</h2>
        <p class="exemplos__nota">Modelos do nosso trabalho, fora do Google. A demonstração apresenta um médico fictício; a proposta é o novo site de um negócio real, ainda em avaliação pelo dono.</p>
        <ol class="indice" role="list">${emOrdem(exemplos).map((pagina) => itemDoIndice(pagina)).join('')}
        </ol>
      </section>` : '';
  const modelo = await readFile(path.join(PASTA_MODELOS, 'indice.html'), 'utf8');
  await writeFile(path.join(PASTA_SAIDA, 'index.html'), modelo
    .replace(MARCADOR_CABECALHO, cabecalhoDoIndice(config))
    .replace(MARCADOR_LISTA, lista)
    .replace(MARCADOR_EXEMPLOS, secaoExemplos)
    .replaceAll('{{TITULO}}', escaparHtml(config.indice.titulo))
    .replaceAll('{{DESCRICAO}}', escaparHtml(config.indice.descricao))
    .replaceAll('{{QUANTIDADE}}', String(paginas.length)));
}

/** Um item do índice; demonstração e proposta levam etiqueta. */
function itemDoIndice(pagina) {
  const assunto = ehNegocio(pagina)
    ? (pagina.organizacao.categoria ?? '')
    : (pagina.medico.especialidades ?? []).map((e) => e.nome).join(', ');
  const lugar = [pagina.cidade, pagina.uf].filter(Boolean).join(', ');
  const etiqueta = ehDemonstracao(pagina) ? 'Demonstração · médico fictício' : ehProposta(pagina) ? 'Proposta · em avaliação' : '';
  const busca = [nomeDeExibicao(pagina), assunto, lugar, etiqueta].join(' ');
  return `
        <li class="indice__item" data-busca="${escaparHtml(busca)}">
          <a class="indice__link" href="${escaparHtml(pagina.slug)}/">
            <span class="indice__nome">${escaparHtml(nomeDeExibicao(pagina))}</span>
            <span class="indice__especialidade">${escaparHtml(assunto || 'Clínica')}</span>
            <span class="indice__cidade">${escaparHtml(lugar)}</span>${etiqueta ? `
            <span class="indice__etiqueta">${escaparHtml(etiqueta)}</span>` : ''}
          </a>
        </li>`;
}

/** Slug é permanente (regra 7): o antigo vira uma página que leva ao novo. */
async function gerarRedirecionamentos(config, paginas) {
  const erros = [];
  const slugs = new Set(paginas.map((p) => p.slug));
  const modelo = await readFile(path.join(PASTA_MODELOS, 'redirecionamento.html'), 'utf8');
  for (const [antigo, novo] of Object.entries(config.redirecionamentos ?? {})) {
    if (!FORMATO_SLUG.test(antigo)) { erros.push(`redirecionamento "${antigo}": slug fora do formato`); continue; }
    if (existsSync(path.join(PASTA_SITE, antigo))) { erros.push(`redirecionamento "${antigo}": já existe uma página com esse slug`); continue; }
    // Destino vazio = o índice (página que saiu do ar sem substituta).
    if (novo !== '' && !slugs.has(novo)) { erros.push(`redirecionamento "${antigo}" → "${novo}": o destino não está publicado`); continue; }
    await mkdir(path.join(PASTA_SAIDA, antigo), { recursive: true });
    await writeFile(path.join(PASTA_SAIDA, antigo, 'index.html'), modelo
      .replaceAll('{{DESTINO_RELATIVO}}', novo ? `../${novo}/` : '../')
      .replaceAll('{{DESTINO_ABSOLUTO}}', escaparHtml(novo ? urlDaPagina(config, novo) : config.urlBase)));
  }
  return erros;
}

async function copiarModelo(origem, destino, config) {
  const modelo = await readFile(path.join(PASTA_MODELOS, origem), 'utf8');
  await writeFile(path.join(PASTA_SAIDA, destino), modelo.replaceAll('{{URL_BASE}}', escaparHtml(config.urlBase)));
}

function sitemap(config, paginas) {
  const urls = [`  <url><loc>${escaparHtml(config.urlBase)}</loc></url>`]
    .concat(paginas.map((p) => `  <url><loc>${escaparHtml(urlDaPagina(config, p.slug))}</loc><lastmod>${p.atualizadoEm}</lastmod></url>`));
  return `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls.join('\n')}\n</urlset>\n`;
}

function falhar(erros) {
  console.error(`\nA construção parou — ${erros.length} erro(s):\n`);
  for (const erro of erros) console.error(`  ✗ ${erro}`);
  console.error('');
  process.exit(1);
}

construir().catch((erro) => falhar([erro.message]));
