// O que só a construção escreve: endereço absoluto (canonical, og:url, og:image) e dados estruturados.
// A página nunca digita a URL base — ela muda no dia em que houver domínio próprio (D-01, regra 8).
import { escaparHtml } from './html.mjs';
import {
  nomeDeExibicao, assuntoDaPagina, ehAdvocacia, ehDemonstracao, ehImobiliario, ehNegocio, ehNutricao, ehProposta,
  soPorLinkDireto, inscricaoCreci, profissaoCorretor,
} from './pagina.mjs';

export function urlDaPagina(config, slug) {
  return new URL(`${slug}/`, config.urlBase).href;
}

/**
 * O bloco que substitui <!-- @gerado:cabecalho --> numa página. `arquivo`: outra página HTML da mesma pasta
 * (ex. as opções de layout de uma proposta, "opcao-1.html"), que ganha canonical, og:url e prévia com o
 * próprio endereço, sem JSON-LD: a ficha da pessoa ou do negócio já está no index.html.
 */
export function cabecalhoDaPagina(pagina, config, { rascunho = false, versaoImagem = '', arquivo = '' } = {}) {
  const url = new URL(arquivo, urlDaPagina(config, pagina.slug)).href;
  const linhas = [
    `<link rel="canonical" href="${escaparHtml(url)}">`,
    `<meta property="og:url" content="${escaparHtml(url)}">`,
    `<meta property="og:type" content="website">`,
    `<meta property="og:locale" content="pt_BR">`,
  ];
  // Sem og:site_name: a página é do cliente, não da empresa que assina o índice (B-07, ADR-007).
  if (pagina.imagemSocial) {
    linhas.push(...tagsDaImagemSocial(enderecoDaImagemSocial(pagina.imagemSocial, url, versaoImagem), textoDaImagemSocial(pagina)));
  }
  // Rascunho, demonstração e proposta nunca vão para o Google — as duas últimas nem publicadas (ADR-004, ADR-005).
  if (rascunho || soPorLinkDireto(pagina)) linhas.push('<meta name="robots" content="noindex, nofollow">');
  if (!arquivo) linhas.push(`<script type="application/ld+json">${JSON.stringify(dadosEstruturados(pagina, url, versaoImagem))}</script>`);
  return linhas.join('\n    ');
}

/**
 * As tags que WhatsApp, Facebook, LinkedIn e X leem para a prévia do link. A imagem social sai sempre em
 * 1200 × 630 JPEG (otimizar-imagens.mjs --social); declarar o tamanho deixa a prévia aparecer já no primeiro
 * compartilhamento. `endereco` já vem com a versão (hash do arquivo): WhatsApp e Facebook guardam a prévia
 * pelo endereço da imagem e não buscam de novo um endereço que já conhecem.
 */
function tagsDaImagemSocial(endereco, alt) {
  const imagem = escaparHtml(endereco);
  return [
    `<meta property="og:image" content="${imagem}">`,
    `<meta property="og:image:secure_url" content="${imagem}">`,
    '<meta property="og:image:type" content="image/jpeg">',
    '<meta property="og:image:width" content="1200">',
    '<meta property="og:image:height" content="630">',
    `<meta property="og:image:alt" content="${escaparHtml(alt)}">`,
    '<meta name="twitter:card" content="summary_large_image">',
    `<meta name="twitter:image" content="${imagem}">`,
  ];
}

/** URL absoluta da imagem social, com ?v=<hash> quando a construção sabe a versão do arquivo. */
function enderecoDaImagemSocial(caminho, url, versaoImagem) {
  const endereco = new URL(caminho, url);
  if (versaoImagem) endereco.searchParams.set('v', versaoImagem);
  return endereco.href;
}

/** O alt da imagem social: quem, o quê, onde — e, na demonstração, que é demonstração (ADR-004). */
function textoDaImagemSocial(pagina) {
  const assunto = ehNegocio(pagina) || ehAdvocacia(pagina) || ehNutricao(pagina) || ehImobiliario(pagina)
    ? assuntoDaPagina(pagina)
    : (pagina.medico.especialidades ?? [])[0]?.nome;
  const lugar = [pagina.cidade, pagina.uf].filter(Boolean).join('/');
  const texto = [nomeDeExibicao(pagina), assunto, lugar].filter(Boolean).join(' — ');
  if (ehDemonstracao(pagina)) return `Demonstração: ${texto}`;
  return ehProposta(pagina) ? `Proposta de site: ${texto}` : texto;
}

/**
 * schema.org Physician. Só o que o pagina.json afirma — nada é deduzido (regra 1).
 * Conferir o resultado em https://validator.schema.org (seo-local-landing).
 */
export function dadosEstruturados(pagina, url, versaoImagem = '') {
  if (ehNegocio(pagina)) return dadosDoNegocio(pagina, url, versaoImagem);
  if (ehAdvocacia(pagina)) return dadosDaAdvocacia(pagina, url, versaoImagem);
  if (ehNutricao(pagina)) return dadosDaNutricao(pagina, url, versaoImagem);
  if (ehImobiliario(pagina)) return dadosDoImobiliario(pagina, url, versaoImagem);
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
  if (pagina.imagemSocial) dados.image = enderecoDaImagemSocial(pagina.imagemSocial, url, versaoImagem);
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

/** schema.org ProfessionalService para página de negócio (ADR-005). Só o que o pagina.json afirma. */
function dadosDoNegocio(pagina, url, versaoImagem) {
  const { organizacao, contato = {} } = pagina;
  const dados = {
    '@context': 'https://schema.org',
    '@type': 'ProfessionalService',
    name: organizacao.nome,
    url,
    description: pagina.resumo,
  };
  if (organizacao.slogan) dados.slogan = organizacao.slogan;
  if (contato.telefone || contato.whatsapp) dados.telephone = contato.telefone ?? contato.whatsapp;
  if (pagina.imagemSocial) dados.image = enderecoDaImagemSocial(pagina.imagemSocial, url, versaoImagem);
  if (organizacao.logo) dados.logo = new URL(organizacao.logo, url).href;
  if (organizacao.areaAtendida) dados.areaServed = organizacao.areaAtendida;
  if (organizacao.temas?.length) dados.knowsAbout = organizacao.temas;
  if (organizacao.responsavel) {
    dados.founder = { '@type': 'Person', name: organizacao.responsavel.nome, ...(organizacao.responsavel.cargo ? { jobTitle: organizacao.responsavel.cargo } : {}) };
  }
  if (organizacao.servicos?.length) {
    dados.hasOfferCatalog = {
      '@type': 'OfferCatalog',
      name: 'Serviços',
      itemListElement: organizacao.servicos.map((servico) => ({
        '@type': 'Offer', itemOffered: { '@type': 'Service', name: servico.nome, description: servico.descricao },
      })),
    };
  }
  const perfis = [pagina.siteOficial, ...Object.values(pagina.redes ?? {})].filter((valor) => valor?.startsWith('https://'));
  if (perfis.length) dados.sameAs = perfis;
  return dados;
}

/**
 * schema.org LegalService para sociedade de advogados (ADR-006). Só o que o pagina.json afirma: as áreas
 * viram knowsAbout (não "especialidade" — Provimento 205/2021, art. 3º, III), cada escritório um endereço,
 * cada advogado um Person com a inscrição na OAB.
 */
function dadosDaAdvocacia(pagina, url, versaoImagem) {
  const { sociedade, contato = {}, advogados = [] } = pagina;
  const dados = {
    '@context': 'https://schema.org',
    '@type': 'LegalService',
    name: sociedade.nome,
    legalName: sociedade.razaoSocial,
    url,
    description: pagina.resumo,
  };
  // Na proposta (ADR-006, emenda 2026-09-28) o registro na OAB pode ainda não ter chegado: "identifier": []
  // é pior que não dizer (o validador acusa), então só entra quando há ao menos um registro.
  if (sociedade.registros?.length) {
    dados.identifier = sociedade.registros.map((registro) => ({
      '@type': 'PropertyValue', propertyID: `OAB/${registro.uf}`, value: registro.numero,
    }));
  }
  if (contato.telefone || contato.whatsapp) dados.telephone = contato.telefone ?? contato.whatsapp;
  if (contato.email) dados.email = contato.email;
  if (pagina.imagemSocial) dados.image = enderecoDaImagemSocial(pagina.imagemSocial, url, versaoImagem);
  if (sociedade.areas?.length) dados.knowsAbout = sociedade.areas;
  const escritorios = (sociedade.escritorios ?? []).map((escritorio) => endereco(escritorio));
  if (escritorios.length) dados.address = escritorios.length === 1 ? escritorios[0] : escritorios;
  if (advogados.length) {
    dados.employee = advogados.map((advogado) => ({
      '@type': 'Person',
      name: advogado.nome,
      ...(advogado.cargo ? { jobTitle: advogado.cargo } : {}),
      identifier: advogado.oab.map((inscricao) => ({
        '@type': 'PropertyValue', propertyID: `OAB/${inscricao.uf}`, value: inscricao.numero,
      })),
    }));
  }
  const perfis = Object.values(pagina.redes ?? {}).filter((valor) => valor.startsWith('https://'));
  if (perfis.length) dados.sameAs = perfis;
  return dados;
}

/**
 * Nutricionista (ADR-008): schema.org não tem tipo para nutricionista, e Physician seria falso. O
 * atendimento é um ProfessionalService; a profissional, o Person que o presta, com a inscrição no CRN.
 * As áreas viram knowsAbout; cada local, um endereço — só o que o pagina.json afirma.
 */
function dadosDaNutricao(pagina, url, versaoImagem) {
  const { nutricionista, contato = {}, locais = [] } = pagina;
  const pessoa = { '@type': 'Person', name: nutricionista.nome, jobTitle: 'Nutricionista' };
  if (nutricionista.crn !== 'PENDENTE') {
    pessoa.identifier = { '@type': 'PropertyValue', propertyID: `CRN-${nutricionista.crn.regiao}`, value: nutricionista.crn.numero };
  }
  const dados = {
    '@context': 'https://schema.org',
    '@type': 'ProfessionalService',
    name: nutricionista.nome,
    url,
    description: pagina.resumo,
    employee: pessoa,
  };
  if (nutricionista.areas?.length) dados.knowsAbout = nutricionista.areas;
  if (contato.telefone || contato.whatsapp) dados.telephone = contato.telefone ?? contato.whatsapp;
  if (contato.email) dados.email = contato.email;
  if (pagina.imagemSocial) dados.image = enderecoDaImagemSocial(pagina.imagemSocial, url, versaoImagem);
  const enderecos = locais.filter((local) => local.endereco).map((local) => endereco(local.endereco));
  if (enderecos.length) dados.address = enderecos.length === 1 ? enderecos[0] : enderecos;
  const perfis = Object.values(pagina.redes ?? {}).filter((valor) => valor.startsWith('https://'));
  if (perfis.length) dados.sameAs = perfis;
  return dados;
}

/**
 * Corretor(a) de imóveis (ADR-009): schema.org tem RealEstateAgent para quem intermedia imóveis. `name` e
 * `url` são da página; quem atende vira `employee` (Person), com a inscrição no CRECI (e o CNAI, se houver)
 * — só o que o pagina.json afirma (regra 1).
 */
function dadosDoImobiliario(pagina, url, versaoImagem) {
  const { corretor, contato = {} } = pagina;
  const pessoa = { '@type': 'Person', name: corretor.nome, jobTitle: profissaoCorretor(pagina) };
  if (corretor.creci !== 'PENDENTE') {
    pessoa.identifier = [{ '@type': 'PropertyValue', propertyID: `CRECI-${corretor.creci.uf}`, value: corretor.creci.numero }];
    if (corretor.cnai) pessoa.identifier.push({ '@type': 'PropertyValue', propertyID: 'CNAI', value: corretor.cnai });
  }
  const dados = {
    '@context': 'https://schema.org',
    '@type': 'RealEstateAgent',
    name: corretor.nome,
    url,
    description: pagina.resumo,
    employee: pessoa,
  };
  if (contato.telefone || contato.whatsapp) dados.telephone = contato.telefone ?? contato.whatsapp;
  if (pagina.imagemSocial) dados.image = enderecoDaImagemSocial(pagina.imagemSocial, url, versaoImagem);
  if (pagina.cidade) {
    dados.areaServed = pagina.cidade;
    dados.address = endereco({ cidade: pagina.cidade, uf: pagina.uf });
  }
  const perfis = [pagina.siteOficial, ...Object.values(pagina.redes ?? {})].filter((valor) => valor?.startsWith('https://'));
  if (perfis.length) dados.sameAs = perfis;
  return dados;
}

/** O bloco do índice: a prévia de link da empresa que assina o índice (ADR-007). */
export function cabecalhoDoIndice(config, { versaoImagem = '' } = {}) {
  const { indice, urlBase } = config;
  const linhas = [
    `<link rel="canonical" href="${escaparHtml(config.urlBase)}">`,
    `<meta property="og:url" content="${escaparHtml(config.urlBase)}">`,
    `<meta property="og:type" content="website">`,
    `<meta property="og:locale" content="pt_BR">`,
    `<meta property="og:site_name" content="${escaparHtml(indice.empresa)}">`,
  ];
  if (indice.imagemSocial) {
    const imagem = enderecoDaImagemSocial(indice.imagemSocial, urlBase, versaoImagem);
    linhas.push(...tagsDaImagemSocial(imagem, `${indice.empresa} — ${indice.titulo}`));
  }
  const empresa = { '@context': 'https://schema.org', '@type': 'Organization', name: indice.empresa, url: urlBase };
  if (indice.lema) empresa.slogan = indice.lema;
  if (indice.marca) empresa.logo = new URL(indice.marca, urlBase).href;
  linhas.push(`<script type="application/ld+json">${JSON.stringify(empresa)}</script>`);
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
