#!/usr/bin/env node
// Confere _site/ — o que vai para o ar, não o que está em site/ (regra 14). Roda depois de construir.
// Erro trava o merge e a publicação; aviso é impresso para alguém ler e decidir.
//
//   node ferramentas/verificar.mjs
import {
  RAIZ, PASTA_SITE, PASTA_SAIDA, PASTA_REGRAS, PASTA_DOCS_PAGINAS, lerJson, listarPastas,
  listarArquivosRecursivo, tamanhoEmBytes, readFile, existsSync, path,
} from './lib/arquivos.mjs';
import { tags, conteudoDoElementoCom, textoVisivel, normalizar, semComentarios } from './lib/html.mjs';
import { palavraMedico } from './lib/pagina.mjs';

const LIMITE_IMAGEM_BYTES = 250 * 1024;
const LIMITE_PAGINA_BYTES = 900 * 1024;
const ESQUEMAS_DE_LINK = ['https:', 'tel:', 'mailto:'];

const erros = [];
const avisos = [];

async function verificar() {
  if (!existsSync(PASTA_SAIDA)) throw new Error('_site/ não existe — rode "npm run construir" antes');
  const config = await lerJson(path.join(RAIZ, 'site.config.json'));
  const { termos } = await lerJson(path.join(PASTA_REGRAS, 'termos-vedados.json'));

  const arquivosHtml = (await listarArquivosRecursivo(PASTA_SAIDA)).filter((a) => a.endsWith('.html'));
  for (const arquivo of arquivosHtml) {
    const html = await readFile(arquivo, 'utf8');
    const relativo = path.relative(PASTA_SAIDA, arquivo);
    const ehRedirecionamento = html.includes('data-redirecionamento');
    verificarEstrutura(html, relativo);
    verificarSeparacao(html, relativo);
    verificarRecursos(html, arquivo, relativo, config, { permitirUrlBase: relativo === '404.html' });
    verificarLinks(html, relativo);
    if (!ehRedirecionamento) verificarTermos(html, relativo, termos);
    verificarPendencias(html, relativo);
  }

  for (const pasta of await listarPastas(PASTA_SAIDA)) {
    if (pasta === 'assets') continue;
    const fonte = path.join(PASTA_SITE, pasta, 'pagina.json');
    if (!existsSync(fonte)) continue; // redirecionamento
    const pagina = await lerJson(fonte);
    const html = await readFile(path.join(PASTA_SAIDA, pasta, 'index.html'), 'utf8');
    verificarIdentificacaoCfm(html, pagina, `${pasta}/index.html`);
    if (pagina.publicar && !existsSync(path.join(PASTA_DOCS_PAGINAS, pasta, 'briefing.md'))) {
      erros.push(`${pasta}: sem docs/paginas/${pasta}/briefing.md — todo fato da página precisa de fonte (regra 1)`);
    }
    await verificarPeso(pasta);
  }

  for (const arquivo of (await listarArquivosRecursivo(PASTA_SAIDA)).filter((a) => a.endsWith('.css'))) {
    await verificarCss(arquivo);
  }

  relatar();
}

function verificarEstrutura(html, relativo) {
  const raiz = tags(html, 'html')[0];
  if (raiz?.atributos.lang !== 'pt-BR') erros.push(`${relativo}: <html lang="pt-BR"> ausente`);
  if (!/<title>[^<]+<\/title>/i.test(html)) erros.push(`${relativo}: <title> ausente ou vazio`);
  if (!tags(html, 'meta').some((t) => t.atributos.name === 'viewport')) erros.push(`${relativo}: meta viewport ausente`);
  if (html.includes('data-redirecionamento')) return;
  const descricao = tags(html, 'meta').find((t) => t.atributos.name === 'description')?.atributos.content ?? '';
  if (!descricao) erros.push(`${relativo}: meta description ausente`);
  else if (descricao.length < 50 || descricao.length > 160) avisos.push(`${relativo}: meta description com ${descricao.length} caracteres (50–160)`);
  const quantidadeH1 = tags(html, 'h1').length;
  if (quantidadeH1 !== 1) erros.push(`${relativo}: ${quantidadeH1} <h1> — a página tem exatamente um`);
  for (const imagem of tags(html, 'img')) {
    const { alt, width, height, src } = imagem.atributos;
    if (alt === undefined) erros.push(`${relativo}: <img src="${src}"> sem alt (decorativa leva alt="")`);
    if (!width || !height) erros.push(`${relativo}: <img src="${src}"> sem width/height — a página pula ao carregar`);
  }
  for (const proibida of ['form', 'iframe', 'embed', 'object']) {
    if (tags(html, proibida).length) erros.push(`${relativo}: <${proibida}> — ${proibida === 'form' ? 'a página não coleta dado (regra 5)' : 'nada de terceiros embutido (regra 6)'}`);
  }
}

function verificarSeparacao(html, relativo) {
  const limpo = semComentarios(html);
  if (/<style\b/i.test(limpo)) erros.push(`${relativo}: <style> no HTML — CSS mora em arquivo (regra 9)`);
  if (/\sstyle\s*=/i.test(limpo)) erros.push(`${relativo}: atributo style= — CSS mora em arquivo (regra 9)`);
  if (/<[^>]+\son[a-z]+\s*=/i.test(limpo)) erros.push(`${relativo}: handler on...= no HTML — JS mora em arquivo (regra 9)`);
  for (const script of tags(html, 'script')) {
    const { src, type } = script.atributos;
    if (type === 'application/ld+json') continue;
    if (!src) erros.push(`${relativo}: <script> sem src — JS mora em arquivo (regra 9)`);
  }
}

function verificarRecursos(html, arquivo, relativo, config, { permitirUrlBase }) {
  const referencias = [];
  for (const nome of ['img', 'source', 'script', 'link', 'video', 'audio']) {
    for (const tag of tags(html, nome)) {
      const { src, href, srcset, rel } = tag.atributos;
      if (nome === 'link' && ['canonical'].includes(rel)) continue;
      if (src) referencias.push(src);
      if (href && nome === 'link') referencias.push(href);
      if (srcset) referencias.push(...srcset.split(',').map((parte) => parte.trim().split(/\s+/)[0]));
    }
  }
  for (const referencia of referencias) {
    if (permitirUrlBase && referencia.startsWith(config.urlBase)) continue;
    if (/^([a-z]+:)?\/\//i.test(referencia) || referencia.startsWith('data:')) {
      erros.push(`${relativo}: recurso de fora "${referencia}" — nada de terceiros (regra 6)`);
      continue;
    }
    if (referencia.startsWith('/')) {
      erros.push(`${relativo}: caminho absoluto "${referencia}" — quebra sob /landing/ (regra 8)`);
      continue;
    }
    const alvo = path.resolve(path.dirname(arquivo), referencia.split(/[?#]/)[0]);
    if (!existsSync(alvo)) erros.push(`${relativo}: "${referencia}" não existe em _site/`);
  }
}

function verificarLinks(html, relativo) {
  for (const ancora of tags(html, 'a')) {
    const { href = '', target, rel = '' } = ancora.atributos;
    if (!href) { erros.push(`${relativo}: <a> sem href — use <button> para ação`); continue; }
    if (href.startsWith('#') || !/^[a-z]+:/i.test(href)) {
      if (href.startsWith('/')) erros.push(`${relativo}: link absoluto "${href}" — quebra sob /landing/ (regra 8)`);
      continue;
    }
    const esquema = href.slice(0, href.indexOf(':') + 1).toLowerCase();
    if (!ESQUEMAS_DE_LINK.includes(esquema)) erros.push(`${relativo}: link "${href}" com esquema ${esquema} — só https, tel e mailto`);
    if (target === '_blank' && !rel.includes('noopener')) erros.push(`${relativo}: target=_blank sem rel="noopener" em "${href}"`);
  }
}

function verificarTermos(html, relativo, termos) {
  const texto = ` ${normalizar(textoVisivel(html))} `;
  for (const { termo, nivel, razao, fonte } of termos) {
    const alvo = normalizar(termo).replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    if (new RegExp(`(?<![\\p{L}\\p{N}])${alvo}(?![\\p{L}\\p{N}])`, 'u').test(texto)) {
      const mensagem = `${relativo}: "${termo}" — ${razao} (${fonte})`;
      (nivel === 'erro' ? erros : avisos).push(mensagem);
    }
  }
}

function verificarPendencias(html, relativo) {
  // Maiúsculas de propósito: "todo" é palavra do português; "TODO" é pendência.
  for (const marca of ['PENDENTE', 'DESCREVA A IMAGEM', '{{', 'TODO', 'XXX']) {
    if (html.includes(marca)) erros.push(`${relativo}: "${marca}" na página — pendência não resolvida (regra 1)`);
  }
  if (/lorem ipsum/i.test(html)) erros.push(`${relativo}: "lorem ipsum" na página — texto de enchimento (regra 1)`);
}

/** Art. 4º e 6º da Res. CFM 2.336/2023: nome, CRM/UF com a palavra MÉDICO e cada especialidade com o RQE. */
function verificarIdentificacaoCfm(html, pagina, relativo) {
  const bloco = conteudoDoElementoCom(html, 'data-identificacao-cfm');
  if (bloco === null) {
    erros.push(`${relativo}: sem o elemento data-identificacao-cfm (regra 2)`);
    return;
  }
  const texto = normalizar(textoVisivel(bloco));
  const exigir = (trecho, oQue) => {
    if (!texto.includes(normalizar(trecho))) erros.push(`${relativo}: a identificação CFM não mostra ${oQue} ("${trecho}") — regra 2`);
  };
  exigir(pagina.medico.nome, 'o nome');
  exigir(palavraMedico(pagina), `a palavra ${palavraMedico(pagina).toUpperCase()}`);
  for (const crm of pagina.medico.crm) {
    exigir(`CRM-${crm.uf}`, 'o CRM com a UF');
    exigir(crm.numero, 'o número do CRM');
  }
  for (const item of [...(pagina.medico.especialidades ?? []), ...(pagina.medico.areasDeAtuacao ?? [])]) {
    exigir(item.nome, 'a especialidade');
    exigir(`RQE ${item.rqe}`, 'o RQE');
  }
}

async function verificarPeso(pasta) {
  let total = 0;
  for (const arquivo of await listarArquivosRecursivo(path.join(PASTA_SAIDA, pasta))) {
    const bytes = await tamanhoEmBytes(arquivo);
    total += bytes;
    if (/\.(jpe?g|png|webp|avif|gif)$/i.test(arquivo) && bytes > LIMITE_IMAGEM_BYTES) {
      avisos.push(`${path.relative(PASTA_SAIDA, arquivo)}: ${Math.round(bytes / 1024)} KB — passe por "npm run imagens" (limite ${LIMITE_IMAGEM_BYTES / 1024} KB)`);
    }
  }
  if (total > LIMITE_PAGINA_BYTES) {
    avisos.push(`${pasta}/: ${Math.round(total / 1024)} KB na pasta — confira o peso da primeira carga no Lighthouse (regra 11)`);
  }
}

async function verificarCss(arquivo) {
  const css = await readFile(arquivo, 'utf8');
  const relativo = path.relative(PASTA_SAIDA, arquivo);
  for (const achado of css.matchAll(/url\(\s*['"]?([^'")]+)['"]?\s*\)/g)) {
    const referencia = achado[1];
    if (referencia.startsWith('data:') || referencia.startsWith('#')) continue;
    if (/^([a-z]+:)?\/\//i.test(referencia)) { erros.push(`${relativo}: url() de fora "${referencia}" (regra 6)`); continue; }
    if (referencia.startsWith('/')) { erros.push(`${relativo}: url() absoluta "${referencia}" (regra 8)`); continue; }
    if (!existsSync(path.resolve(path.dirname(arquivo), referencia))) erros.push(`${relativo}: "${referencia}" não existe em _site/`);
  }
  if (/@import\s+url\(\s*['"]?https?:/i.test(css)) erros.push(`${relativo}: @import de fora (regra 6)`);
}

function relatar() {
  for (const aviso of avisos) console.warn(`  ⚠ ${aviso}`);
  if (erros.length) {
    console.error(`\nA verificação reprovou — ${erros.length} erro(s):\n`);
    for (const erro of erros) console.error(`  ✗ ${erro}`);
    console.error('');
    process.exit(1);
  }
  console.log(`Verificação aprovada${avisos.length ? ` com ${avisos.length} aviso(s) para ler` : ''}.`);
}

verificar().catch((erro) => {
  console.error(`✗ ${erro.message}`);
  process.exit(1);
});
