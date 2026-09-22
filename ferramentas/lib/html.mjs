// Leitura de HTML por expressão regular. Serve porque o HTML deste repositório é nosso e segue o
// frontend-landing; não serve para HTML arbitrário da internet.

export function escaparHtml(valor) {
  return String(valor)
    .replaceAll('&', '&amp;').replaceAll('<', '&lt;').replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;').replaceAll("'", '&#39;');
}

/** Todas as tags de um nome, com os atributos já lidos. */
export function tags(html, nome) {
  const expressao = new RegExp(`<${nome}\\b([^>]*)>`, 'gi');
  return [...semComentarios(html).matchAll(expressao)]
    .map((achado) => ({ bruto: achado[0], atributos: lerAtributos(achado[1]) }));
}

export function lerAtributos(trecho) {
  const atributos = {};
  const expressao = /([:@\w-]+)(?:\s*=\s*(?:"([^"]*)"|'([^']*)'|([^\s"'>]+)))?/g;
  for (const achado of trecho.matchAll(expressao)) {
    atributos[achado[1].toLowerCase()] = achado[2] ?? achado[3] ?? achado[4] ?? '';
  }
  return atributos;
}

/** O conteúdo do elemento que tem o atributo dado, respeitando o aninhamento de tags de mesmo nome. */
export function conteudoDoElementoCom(html, atributo) {
  const limpo = semComentarios(html);
  const abertura = new RegExp(`<([a-z][a-z0-9]*)\\b[^>]*\\s${atributo}(?=[\\s=>])[^>]*>`, 'i').exec(limpo);
  if (!abertura) return null;
  const nome = abertura[1];
  const expressao = new RegExp(`<(/?)${nome}\\b[^>]*>`, 'gi');
  expressao.lastIndex = abertura.index + abertura[0].length;
  let profundidade = 1;
  for (let achado = expressao.exec(limpo); achado; achado = expressao.exec(limpo)) {
    profundidade += achado[1] === '/' ? -1 : 1;
    if (profundidade === 0) return limpo.slice(abertura.index + abertura[0].length, achado.index);
  }
  return null;
}

/** O texto que a pessoa lê: sem script, style, comentário e tag. */
export function textoVisivel(html) {
  return semComentarios(html)
    .replace(/<script\b[\s\S]*?<\/script>/gi, ' ')
    .replace(/<style\b[\s\S]*?<\/style>/gi, ' ')
    .replace(/<[^>]+>/g, ' ')
    .replace(/&nbsp;/g, ' ').replace(/&amp;/g, '&').replace(/&[a-z#0-9]+;/gi, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

export function semComentarios(html) {
  return html.replace(/<!--[\s\S]*?-->/g, ' ');
}

/** Minúsculas e sem acento, para comparar texto sem depender de como foi digitado. */
export function normalizar(texto) {
  return texto.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase();
}
