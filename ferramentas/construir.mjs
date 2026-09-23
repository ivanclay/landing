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
  validarPagina, nomeDeExibicao, assuntoDaPagina, ehAdvocacia, ehNegocio, ehDemonstracao, ehProposta,
  soPorLinkDireto, FORMATO_SLUG,
} from './lib/pagina.mjs';
import { cabecalhoDaPagina, cabecalhoDoIndice, urlDaPagina } from './lib/seo.mjs';
import { escaparHtml } from './lib/html.mjs';
import { createHash } from 'node:crypto';

const MARCADOR_CABECALHO = '<!-- @gerado:cabecalho -->';
const MARCADOR_DEMONSTRACOES = '<!-- @gerado:demonstracoes -->';
const MARCADOR_CLIENTES = '<!-- @gerado:clientes -->';
const incluirRascunhos = process.argv.includes('--rascunhos');

async function construir() {
  const config = await lerJson(path.join(RAIZ, 'site.config.json'));
  if (!config.urlBase?.endsWith('/')) throw new Error('site.config.json: urlBase precisa terminar em "/"');
  if (!config.indice?.empresa) throw new Error('site.config.json: indice.empresa ausente — quem assina o índice (D-02, ADR-007)');

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

  // Demonstração e proposta ficam fora do sitemap (ADR-004, ADR-005). O índice tem duas colunas (ADR-007):
  // demonstrações, e produtos dos clientes — onde a proposta entra etiquetada, porque o cliente é real. Com
  // indice.mostrarDemonstracoes false, demonstração e proposta só abrem pelo link direto.
  const listaveis = publicadas.filter((p) => !soPorLinkDireto(p));
  const exemplos = config.indice.mostrarDemonstracoes ? publicadas.filter((p) => p.publicar && soPorLinkDireto(p)) : [];
  await gerarIndice(config, {
    demonstracoes: exemplos.filter(ehDemonstracao),
    clientes: [...listaveis, ...exemplos.filter(ehProposta)],
  });
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
  await writeFile(arquivoHtml, await versionarRecursos(html.replace(MARCADOR_CABECALHO, cabecalho), origem));
  return { erros: [], pagina };
}

/**
 * Põe ?v=<hash> em cada CSS e JS local. O Pages manda o navegador guardar o arquivo por 10 min: sem a
 * versão, quem abre logo depois de um push vê o HTML novo com o CSS velho — a página parece quebrada.
 */
async function versionarRecursos(html, pastaDeOrigem) {
  const trocas = [];
  for (const [, atributo, caminho] of html.matchAll(/\b(href|src)="((?![a-z]+:|\/|#)[^"?#]+\.(?:css|js))"/gi)) {
    const versao = await versaoDoArquivo(path.join(pastaDeOrigem, caminho));
    if (versao) trocas.push([`${atributo}="${caminho}"`, `${atributo}="${caminho}?v=${versao}"`]);
  }
  return trocas.reduce((texto, [de, para]) => texto.replaceAll(de, para), html);
}

/** 8 caracteres do SHA-256 do arquivo; vazio se não houver arquivo. Muda sempre que o conteúdo muda. */
async function versaoDoArquivo(caminho) {
  if (!existsSync(caminho) || !path.extname(caminho)) return '';
  return createHash('sha256').update(await readFile(caminho)).digest('hex').slice(0, 8);
}

async function gerarIndice(config, { demonstracoes, clientes }) {
  const emOrdem = (lista) => [...lista].sort((a, b) => nomeDeExibicao(a).localeCompare(nomeDeExibicao(b), 'pt-BR'));
  const linhas = (lista, vazio) => emOrdem(lista).map(linhaDoIndice).join('') || `
              <tr class="tabela__vazio"><td colspan="3">${vazio}</td></tr>`;
  const { indice } = config;
  const modelo = await readFile(path.join(PASTA_MODELOS, 'indice.html'), 'utf8');
  await writeFile(path.join(PASTA_SAIDA, 'index.html'), await versionarRecursos(modelo
    .replace(MARCADOR_CABECALHO, cabecalhoDoIndice(config, {
      versaoImagem: await versaoDoArquivo(path.join(PASTA_SITE, indice.imagemSocial ?? '')),
    }))
    .replace(MARCADOR_DEMONSTRACOES, linhas(demonstracoes, 'Nenhuma demonstração publicada.'))
    .replace(MARCADOR_CLIENTES, linhas(clientes, 'Nenhum produto de cliente publicado ainda.'))
    .replaceAll('{{TITULO}}', escaparHtml(indice.titulo))
    .replaceAll('{{DESCRICAO}}', escaparHtml(indice.descricao))
    .replaceAll('{{EMPRESA}}', escaparHtml(indice.empresa))
    .replaceAll('{{LEMA}}', escaparHtml(indice.lema ?? ''))
    .replaceAll('{{TOTAL_DEMONSTRACOES}}', contagem(demonstracoes.length, 'página', 'páginas'))
    .replaceAll('{{TOTAL_CLIENTES}}', contagem(clientes.length, 'produto', 'produtos')), PASTA_SITE));
}

const contagem = (numero, um, varios) => `${numero} ${numero === 1 ? um : varios}`;

/** Monograma da linha: as iniciais do nome, sem o "Dr."/"Dra." (decorativo, aria-hidden). */
function iniciais(nome) {
  const palavras = nome.replace(/^Dra?\.\s+/, '').split(/\s+/).filter((p) => /^\p{Lu}/u.test(p));
  return (palavras[0]?.[0] ?? '') + (palavras.length > 1 ? palavras[1][0] : '');
}

/** Uma linha de tabela do índice; demonstração e proposta levam etiqueta sob o nome. */
function linhaDoIndice(pagina) {
  const assunto = assuntoDaPagina(pagina);
  const lugar = [pagina.cidade, pagina.uf].filter(Boolean).join(', ');
  // No painel de demonstrações a etiqueta só diz o que é fictício; a palavra "demonstração" já está no título.
  const ficticio = ehAdvocacia(pagina) ? 'Escritório fictício' : ehNegocio(pagina) ? 'Empresa fictícia' : 'Médico fictício';
  const etiqueta = ehDemonstracao(pagina) ? ficticio : ehProposta(pagina) ? 'Proposta · em avaliação' : '';
  const busca = [nomeDeExibicao(pagina), assunto, lugar, etiqueta, ehDemonstracao(pagina) ? 'demonstração' : ''].join(' ');
  return `
              <tr class="tabela__linha" data-busca="${escaparHtml(busca)}">
                <th scope="row"><span class="tabela__celula-nome"><span class="tabela__monograma" aria-hidden="true">${escaparHtml(iniciais(nomeDeExibicao(pagina)))}</span><span class="tabela__identidade"><a class="tabela__nome" href="${escaparHtml(pagina.slug)}/">${escaparHtml(nomeDeExibicao(pagina))}</a>${etiqueta ? `
                  <span class="tabela__etiqueta${ehProposta(pagina) ? ' tabela__etiqueta--proposta' : ''}">${escaparHtml(etiqueta)}</span>` : ''}</span></span></th>
                <td>${escaparHtml(assunto || '—')}</td>
                <td>${escaparHtml(lugar || '—')}</td>
              </tr>`;
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
