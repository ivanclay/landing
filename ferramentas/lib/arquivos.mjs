// Utilidades de arquivo usadas pela construção e pela verificação. Só Node, sem dependência.
import { readFile, writeFile, mkdir, readdir, stat, cp, rm } from 'node:fs/promises';
import { existsSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

// O código mora sempre aqui; o site pode morar em outra raiz (LANDING_RAIZ), que é como os testes montam
// um site descartável numa pasta temporária sem tocar no repositório.
const RAIZ_DO_CODIGO = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..', '..');
export const RAIZ = process.env.LANDING_RAIZ ? path.resolve(process.env.LANDING_RAIZ) : RAIZ_DO_CODIGO;
export const PASTA_SITE = path.join(RAIZ, 'site');
export const PASTA_SAIDA = path.join(RAIZ, '_site');
export const PASTA_MODELOS = path.join(RAIZ_DO_CODIGO, 'ferramentas', 'modelos');
export const PASTA_REGRAS = path.join(RAIZ_DO_CODIGO, 'ferramentas', 'regras');
export const PASTA_DOCS_PAGINAS = path.join(RAIZ, 'docs', 'paginas');

/** Pastas de site/ que não são páginas: os ativos compartilhados e tudo que começa com _ ou . */
export function ehPastaDePagina(nome) {
  return nome !== 'assets' && !nome.startsWith('_') && !nome.startsWith('.');
}

export async function lerJson(caminho) {
  const texto = await readFile(caminho, 'utf8');
  try {
    return JSON.parse(texto);
  } catch (erro) {
    throw new Error(`JSON inválido em ${path.relative(RAIZ, caminho)}: ${erro.message}`);
  }
}

export async function listarPastas(caminho) {
  if (!existsSync(caminho)) return [];
  const itens = await readdir(caminho, { withFileTypes: true });
  return itens.filter((item) => item.isDirectory()).map((item) => item.name).sort();
}

export async function listarArquivosRecursivo(caminho) {
  const saida = [];
  for (const item of await readdir(caminho, { withFileTypes: true })) {
    const completo = path.join(caminho, item.name);
    if (item.isDirectory()) saida.push(...(await listarArquivosRecursivo(completo)));
    else saida.push(completo);
  }
  return saida;
}

export async function tamanhoEmBytes(caminho) {
  return (await stat(caminho)).size;
}

export { readFile, writeFile, mkdir, cp, rm, existsSync, path };
