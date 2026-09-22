// O que só a construção escreve: endereço absoluto (canonical, og:url, og:image) e dados estruturados.
// A página nunca digita a URL base — ela muda no dia em que houver domínio próprio (D-01, regra 8).
import { escaparHtml } from './html.mjs';
import { nomeDeExibicao, ehDemonstracao } from './pagina.mjs';

export function urlDaPagina(config, slug) {
  return new URL(`${slug}/`, config.urlBase).href;
}

/** O bloco que substitui <!-- @gerado:cabecalho --> numa página de médico. */
export function cabecalhoDaPagina(pagina, config, { rascunho = false } = {}) {
  const url = urlDaPagina(config, pagina.slug);
  const linhas = [
    `<link rel="canonical" href="${escaparHtml(url)}">`,
    `<meta property="og:url" content="${escaparHtml(url)}">`,
    `<meta property="og:type" content="website">`,
    `<meta property="og:locale" content="pt_BR">`,
  ];
  if (config.indice?.titulo) linhas.push(`<meta property="og:site_name" content="${escaparHtml(config.indice.titulo)}">`);
  if (pagina.imagemSocial) {
    // WhatsApp, Facebook, LinkedIn e X leem estas tags. A imagem social sai sempre em 1200 × 630 JPEG
    // (otimizar-imagens.mjs --social); declarar o tamanho deixa a prévia aparecer já no primeiro compartilhamento.
    const imagem = escaparHtml(new URL(pagina.imagemSocial, url).href);
    linhas.push(`<meta property="og:image" content="${imagem}">`);
    linhas.push(`<meta property="og:image:secure_url" content="${imagem}">`);
    linhas.push('<meta property="og:image:type" content="image/jpeg">');
    linhas.push('<meta property="og:image:width" content="1200">');
    linhas.push('<meta property="og:image:height" content="630">');
    linhas.push(`<meta property="og:image:alt" content="${escaparHtml(textoDaImagemSocial(pagina))}">`);
    linhas.push('<meta name="twitter:card" content="summary_large_image">');
    linhas.push(`<meta name="twitter:image" content="${imagem}">`);
  }
  // Rascunho e demonstração nunca vão para o Google; a demonstração, nem publicada (ADR-004).
  if (rascunho || ehDemonstracao(pagina)) linhas.push('<meta name="robots" content="noindex, nofollow">');
  linhas.push(`<script type="application/ld+json">${JSON.stringify(dadosEstruturados(pagina, url))}</script>`);
  return linhas.join('\n    ');
}

/** O alt da imagem social: quem, o quê, onde — e, na demonstração, que é demonstração (ADR-004). */
function textoDaImagemSocial(pagina) {
  const especialidade = (pagina.medico.especialidades ?? [])[0]?.nome;
  const texto = [nomeDeExibicao(pagina), especialidade, `${pagina.cidade}/${pagina.uf}`].filter(Boolean).join(' — ');
  return ehDemonstracao(pagina) ? `Demonstração: ${texto}` : texto;
}

/**
 * schema.org Physician. Só o que o pagina.json afirma — nada é deduzido (regra 1).
 * Conferir o resultado em https://validator.schema.org (seo-local-landing).
 */
export function dadosEstruturados(pagina, url) {
  const { medico, contato = {}, locais = [], convenios = [] } = pagina;
  const principal = locais[0];
  const dados = {
    '@context': 'https://schema.org',
    '@type': 'Physician',
    name: nomeDeExibicao(pagina),
    url,
    description: pagina.resumo,
    medicalSpecialty: (medico.especialidades ?? []).map((item) => item.nome),
    identifier: medico.crm.map((crm) => ({
      '@type': 'PropertyValue', propertyID: `CRM-${crm.uf}`, value: crm.numero,
    })),
  };
  if (contato.telefone || contato.whatsapp) dados.telephone = contato.telefone ?? contato.whatsapp;
  if (pagina.imagemSocial) dados.image = new URL(pagina.imagemSocial, url).href;
  if (principal?.endereco) dados.address = endereco(principal.endereco);
  const hospitais = locais.filter((local) => local.tipo === 'hospital');
  if (hospitais.length) {
    dados.hospitalAffiliation = hospitais.map((local) => ({
      '@type': 'Hospital', name: local.nome, ...(local.endereco ? { address: endereco(local.endereco) } : {}),
    }));
  }
  if (convenios.length) dados.paymentAccepted = convenios.join(', ');
  const perfis = Object.values(pagina.redes ?? {}).filter((valor) => valor.startsWith('https://'));
  if (perfis.length) dados.sameAs = perfis;
  return dados;
}

/** O bloco do índice. */
export function cabecalhoDoIndice(config) {
  const linhas = [
    `<link rel="canonical" href="${escaparHtml(config.urlBase)}">`,
    `<meta property="og:url" content="${escaparHtml(config.urlBase)}">`,
    `<meta property="og:type" content="website">`,
    `<meta property="og:locale" content="pt_BR">`,
  ];
  if (!config.indice.indexavel) linhas.push('<meta name="robots" content="noindex, follow">');
  // Verificação do Search Console por meta tag na página inicial da propriedade (seo-local-landing).
  if (config.verificacaoGoogle) linhas.push(`<meta name="google-site-verification" content="${escaparHtml(config.verificacaoGoogle)}">`);
  return linhas.join('\n    ');
}

function endereco(dado) {
  const campos = {
    '@type': 'PostalAddress',
    streetAddress: dado.logradouro,
    addressLocality: dado.cidade,
    addressRegion: dado.uf,
    postalCode: dado.cep,
    addressCountry: 'BR',
  };
  // Campo sem valor sai: "postalCode": "" é pior que não dizer (o validador acusa).
  return Object.fromEntries(Object.entries(campos).filter(([, valor]) => valor));
}
