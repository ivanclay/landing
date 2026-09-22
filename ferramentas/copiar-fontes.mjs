#!/usr/bin/env node
// Traz uma família do Fontsource (npm) para site/assets/fontes/<id>/, só o subconjunto latin (cobre o
// português inteiro), e escreve o fonte.css com os @font-face. Nenhuma fonte é carregada de fora (regra 6).
//
//   npm i -D @fontsource-variable/<id>      (ou @fontsource/<id> se não houver versão variável)
//   node ferramentas/copiar-fontes.mjs <id> [--italico] [--opsz] [--pesos=400,700]
//   --opsz: eixo de tamanho óptico (bonito em título grande, ~2× mais pesado); sem ele, só wght
//   --pesos: só para família estática (sem versão variável); padrão 400
//
// A página usa:  <link rel="stylesheet" href="../assets/fontes/<id>/fonte.css">
// e, para a fonte do título, o preload que o script imprime no fim.
import { RAIZ, readFile, writeFile, mkdir, cp, existsSync, path } from './lib/arquivos.mjs';

const [id] = process.argv.slice(2).filter((arg) => !arg.startsWith('--'));
const comItalico = process.argv.includes('--italico');
if (!id) {
  console.error('uso: node ferramentas/copiar-fontes.mjs <id-do-fontsource> [--italico]');
  process.exit(1);
}

const candidatos = [`@fontsource-variable/${id}`, `@fontsource/${id}`];
const pacote = candidatos.map((nome) => path.join(RAIZ, 'node_modules', nome)).find(existsSync);
if (!pacote) {
  console.error(`Não achei ${candidatos.join(' nem ')} em node_modules. Rode: npm i -D ${candidatos[0]}`);
  process.exit(1);
}

// Variável: um arquivo com o eixo (wght, ou opsz se pedido). Estática: um arquivo por peso (--pesos=400,700).
const ehVariavel = pacote.includes('fontsource-variable');
const pesos = (process.argv.find((arg) => arg.startsWith('--pesos='))?.split('=')[1] ?? '400').split(',');
const bases = ehVariavel
  ? [(process.argv.includes('--opsz') ? ['opsz', 'wght'] : ['wght', 'opsz']).find((eixo) => existsSync(path.join(pacote, `${eixo}.css`))) ?? 'index']
  : pesos;
const escolhidas = bases
  .flatMap((base) => (comItalico ? [`${base}.css`, `${base}-italic.css`] : [`${base}.css`]))
  .filter((nome) => existsSync(path.join(pacote, nome)));

const destino = path.join(RAIZ, 'site', 'assets', 'fontes', id);
await mkdir(destino, { recursive: true });
const blocos = [];
const arquivos = [];
for (const folha of escolhidas) {
  const css = await readFile(path.join(pacote, folha), 'utf8');
  for (const bloco of css.split('@font-face').slice(1)) {
    const arquivo = /url\(\.\/files\/([^)]+\.woff2)\)/.exec(bloco)?.[1];
    if (!arquivo || !/-latin-/.test(arquivo) || /-latin-ext-/.test(arquivo)) continue;
    await cp(path.join(pacote, 'files', arquivo), path.join(destino, arquivo));
    arquivos.push(arquivo);
    // Só woff2 (todo navegador atual lê); o fallback .woff do pacote não é copiado e sai do src.
    const ajustado = bloco
      .replace(`./files/${arquivo}`, `./${arquivo}`)
      .replace(/,\s*url\(\.\/files\/[^)]+\.woff\)\s*format\('woff'\)/g, '')
      .replace(/\/\*[^*]*\*\/\s*$/, '')
      .trimEnd();
    blocos.push(`@font-face${ajustado}`);
  }
}
if (!blocos.length) {
  console.error('Nenhum arquivo latin encontrado no pacote.');
  process.exit(1);
}
const metadados = JSON.parse(await readFile(path.join(pacote, 'metadata.json'), 'utf8'));
const cabecalho = `/* ${metadados.family} — ${metadados.license?.type ?? 'licença no pacote'} — copiado de ${path.basename(path.dirname(pacote))}/${id} por ferramentas/copiar-fontes.mjs. Não editar à mão. */\n`;
await writeFile(path.join(destino, 'fonte.css'), `${cabecalho}${blocos.join('\n\n')}\n`);

const familia = /font-family:\s*'([^']+)'/.exec(blocos[0])[1];
console.log(`site/assets/fontes/${id}/: ${arquivos.length} arquivo(s). Família no CSS: '${familia}'.`);
console.log(`Preload (só a fonte do título):\n  <link rel="preload" href="../assets/fontes/${id}/${arquivos[0]}" as="font" type="font/woff2" crossorigin>`);
