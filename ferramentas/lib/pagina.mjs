// O contrato do pagina.json: o que toda página precisa declarar para ser construída e publicada.
// Cada mensagem cita a regra do CLAUDE.md (ou o ADR) que ela garante.
//
// Cinco tipos de página: "medico" (o padrão — identificação do CFM, regras 2 a 4), "negocio" (empresa ou
// consultoria de saúde, sem CRM — ADR-005), "advocacia" (sociedade de advogados: identificação da OAB e
// Provimento 205/2021 no lugar do CFM — ADR-006), "nutricao" (nutricionista: identificação do CRN e
// Código de Ética do Nutricionista, Res. CFN 599/2018, no lugar do CFM — ADR-008) e "imobiliario"
// (corretor(a) de imóveis: identificação do CRECI e Código de Ética do COFECI, Res. COFECI 326/1992, no
// lugar do CFM — ADR-009). Dois modos que só abrem por link direto: "demonstracao"
// (médico ou escritório fictício, ADR-004 e ADR-006) e "proposta" (site de um negócio, de uma sociedade de
// advogados, de uma nutricionista ou de uma corretora real ainda sem aprovação, ADR-005, ADR-006 (emenda
// 2026-09-28), ADR-008 e ADR-009).

import { normalizar } from './html.mjs';

export const FORMATO_SLUG = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;
const FORMATO_DATA = /^\d{4}-\d{2}-\d{2}$/;
const FORMATO_E164 = /^\+\d{10,15}$/;
const SO_DIGITOS = /^\d+$/;
// Inscrição na OAB como a página a mostra: "123.456", ou com a letra da inscrição suplementar ("12.345-S").
const FORMATO_OAB = /^\d{1,3}(?:\.\d{3})*(?:-[A-Z])?$/;
// Inscrição no CRN: só dígitos, com "/P" na inscrição provisória. A região é o número do Regional (1 a 11).
const FORMATO_CRN = /^\d+(?:\/P)?$/;
// Inscrição no CRECI como a página mostra ("36.265"), com "-F" (pessoa física) ou "-J" (pessoa jurídica).
const FORMATO_CRECI = /^\d{1,3}(?:\.\d{3})*(?:-[FJ])?$/;
// CNAI (Cadastro Nacional de Avaliadores Imobiliários): mesmo formato do CRECI, sem a letra.
const FORMATO_CNAI = /^\d{1,3}(?:\.\d{3})*$/;
const PENDENTE = 'PENDENTE';
export const UFS = ['AC', 'AL', 'AP', 'AM', 'BA', 'CE', 'DF', 'ES', 'GO', 'MA', 'MT', 'MS', 'MG', 'PA', 'PB',
  'PR', 'PE', 'PI', 'RJ', 'RN', 'RS', 'RO', 'RR', 'SC', 'SP', 'SE', 'TO'];

/**
 * Confere um pagina.json. Devolve a lista de erros (vazia = válido).
 * `pasta` é o nome da pasta em site/, que precisa ser igual ao slug (regra 7).
 */
export function validarPagina(pagina, pasta) {
  const erros = [];
  const exigir = (condicao, mensagem) => { if (!condicao) erros.push(mensagem); };

  exigir(typeof pagina.slug === 'string' && FORMATO_SLUG.test(pagina.slug),
    'slug ausente ou fora do formato (minúsculas, dígitos e hífen; sem acento) — regra 7');
  exigir(pagina.slug === pasta, `slug "${pagina.slug}" diferente da pasta "${pasta}" — regra 7`);
  exigir(typeof pagina.publicar === 'boolean', 'publicar precisa ser true ou false');
  exigir([undefined, 'medico', 'negocio', 'advocacia', 'nutricao', 'imobiliario'].includes(pagina.tipo),
    'tipo deve ser "medico" (padrão), "negocio" (ADR-005), "advocacia" (ADR-006), "nutricao" (ADR-008) ou "imobiliario" (ADR-009)');
  for (const [modo, adr] of [['demonstracao', 'ADR-004'], ['proposta', 'ADR-005']]) {
    exigir(pagina[modo] === undefined || typeof pagina[modo] === 'boolean', `${modo}, se existir, precisa ser true ou false — ${adr}`);
  }

  if (ehNegocio(pagina)) validarNegocio(pagina, exigir);
  else if (ehAdvocacia(pagina)) validarAdvocacia(pagina, exigir);
  else if (ehNutricao(pagina)) validarNutricao(pagina, exigir);
  else if (ehImobiliario(pagina)) validarImobiliario(pagina, exigir);
  else validarMedico(pagina, exigir);

  exigir(texto(pagina.resumo) && pagina.resumo.length >= 50 && pagina.resumo.length <= 160,
    'resumo precisa ter entre 50 e 160 caracteres (vira a meta description e o texto do índice)');

  const contato = pagina.contato ?? {};
  exigir(texto(contato.whatsapp) || texto(contato.telefone) || texto(contato.agendamento),
    'contato precisa de whatsapp, telefone ou agendamento — é o único caminho da página até quem a lê (regra 5)');
  for (const campo of ['whatsapp', 'telefone']) {
    // Como o CRECI e o CRN: o número que ainda não chegou deixa construir o rascunho (a página mostra PENDENTE e
    // o verificar.mjs reprova, regra 1), mas nunca publica.
    if (contato[campo] === PENDENTE) {
      exigir(pagina.publicar !== true, `contato.${campo} PENDENTE: sem o contato real a página não publica — regras 1 e 5`);
    } else if (texto(contato[campo])) {
      exigir(FORMATO_E164.test(contato[campo]), `contato.${campo} precisa estar em E.164 (+5571991234567)`);
    }
  }
  if (texto(contato.agendamento)) exigir(contato.agendamento.startsWith('https://'), 'contato.agendamento precisa ser https://');

  if (pagina.publicar === true) {
    exigir(FORMATO_DATA.test(pagina.atualizadoEm ?? ''), 'atualizadoEm ausente (vai para o sitemap)');
    if (ehNegocio(pagina)) exigirRevisaoDeNegocio(pagina, exigir);
    else if (ehAdvocacia(pagina)) exigirRevisaoDeAdvocacia(pagina, exigir);
    else if (ehNutricao(pagina)) exigirRevisaoDeNutricao(pagina, exigir);
    else if (ehImobiliario(pagina)) exigirRevisaoDeImobiliario(pagina, exigir);
    else exigirRevisaoDeMedico(pagina, exigir);
  }
  return erros;
}

/** Página de médico: identificação do CFM (regra 2). */
function validarMedico(pagina, exigir) {
  const medico = pagina.medico ?? {};
  exigir(texto(medico.nome), 'medico.nome ausente — regra 2');
  exigir(['Dr.', 'Dra.', ''].includes(medico.tratamento ?? ''), 'medico.tratamento deve ser "Dr.", "Dra." ou ""');
  exigir(['M', 'F'].includes(medico.generoGramatical), 'medico.generoGramatical deve ser "M" ou "F" (decide "Médico" ou "Médica")');
  exigir(Array.isArray(medico.crm) && medico.crm.length > 0, 'medico.crm precisa de ao menos um registro — regra 2');
  for (const [i, crm] of (medico.crm ?? []).entries()) {
    exigir(SO_DIGITOS.test(crm.numero ?? ''), `medico.crm[${i}].numero precisa ser só dígitos — regra 2`);
    exigir(UFS.includes(crm.uf), `medico.crm[${i}].uf inválida — regra 2`);
  }
  for (const campo of ['especialidades', 'areasDeAtuacao']) {
    for (const [i, item] of (medico[campo] ?? []).entries()) {
      exigir(texto(item.nome), `medico.${campo}[${i}].nome ausente`);
      exigir(SO_DIGITOS.test(item.rqe ?? ''),
        `medico.${campo}[${i}] "${item.nome}" sem RQE: sem RQE a página não anuncia especialidade — regra 2 (CFM 2.336/2023, art. 4º, II)`);
    }
  }
  exigir(texto(pagina.cidade), 'cidade ausente (aparece no índice)');
  exigir(UFS.includes(pagina.uf), 'uf ausente ou inválida (aparece no índice)');
  exigir(!ehProposta(pagina), 'proposta é modo de página de negócio (ADR-005); médico fictício usa demonstracao (ADR-004)');
  exigirResumoDeDemonstracao(pagina, exigir);
}

function exigirResumoDeDemonstracao(pagina, exigir) {
  if (!ehDemonstracao(pagina)) return;
  exigir(texto(pagina.resumo) && normalizar(pagina.resumo).includes('demonstracao'),
    'resumo de página de demonstração precisa dizer "demonstração": é o que aparece na prévia do link, onde o aviso da página não aparece — ADR-004');
}

/**
 * Sociedade de advogados (ADR-006): nome, razão social e registro na seccional; cada advogado com a
 * inscrição; ao menos um sócio administrador, que responde pela publicidade (Provimento 205/2021, art. 1º, § 1º).
 */
function validarAdvocacia(pagina, exigir) {
  const sociedade = pagina.sociedade ?? {};
  exigir(texto(sociedade.nome), 'sociedade.nome ausente — ADR-006');
  if (ehProposta(pagina)) {
    // O nome do contrato social ainda está a confirmar com o cliente (emenda 2026-09-28): a razão social
    // provisória só precisa indicar que é sociedade de advocacia (Lei 8.906/1994, art. 16, § 4º).
    exigir(texto(sociedade.razaoSocial) && normalizar(sociedade.razaoSocial).includes('advocacia'),
      'sociedade.razaoSocial ausente ou sem "Advocacia": na proposta, o nome exato ainda está a confirmar, mas a razão '
      + 'social precisa ao menos indicar que é sociedade de advocacia (Lei 8.906/1994, art. 16, § 4º) — ADR-006, emenda 2026-09-28');
  } else {
    exigir(texto(sociedade.razaoSocial) && ['advogados', 'sociedade individual de advocacia']
      .some((termo) => normalizar(sociedade.razaoSocial).includes(termo)),
      'sociedade.razaoSocial ausente ou sem "Advogados" nem "Sociedade Individual de Advocacia": é a razão social '
      + 'registrada na OAB (Lei 8.906/1994, art. 16, § 4º, incluído pela Lei 13.247/2016) — ADR-006');
  }
  // Fora da proposta, o registro da sociedade na seccional é obrigatório; na proposta, pode faltar enquanto o
  // número não chega da OAB — o verificar.mjs confere o que já existe (razão social, sócios) sem exigi-lo
  // (ADR-006, emenda 2026-09-28). Se houver registro, o formato continua conferido nos dois casos.
  if (ehProposta(pagina)) {
    exigir(Array.isArray(sociedade.registros),
      'sociedade.registros precisa ser uma lista (pode ficar vazia na proposta, enquanto o registro na OAB não chega) — ADR-006');
  } else {
    exigir(Array.isArray(sociedade.registros) && sociedade.registros.length > 0,
      'sociedade.registros precisa do registro na seccional da OAB (Código de Ética e Disciplina da OAB, art. 44) — ADR-006');
  }
  for (const [i, registro] of (sociedade.registros ?? []).entries()) {
    exigir(UFS.includes(registro.uf), `sociedade.registros[${i}].uf inválida`);
    exigir(FORMATO_OAB.test(registro.numero ?? ''), `sociedade.registros[${i}].numero fora do formato ("12.345")`);
  }
  const advogados = pagina.advogados ?? [];
  exigir(advogados.some((advogado) => advogado.socioAdministrador === true),
    'advogados precisa de ao menos um sócio administrador: é quem responde pela publicidade (Provimento 205/2021, art. 1º, § 1º)');
  for (const [i, advogado] of advogados.entries()) {
    exigir(texto(advogado.nome), `advogados[${i}].nome ausente`);
    exigir(Array.isArray(advogado.oab) && advogado.oab.length > 0,
      `advogados[${i}] "${advogado.nome}" sem inscrição na OAB (CED da OAB, art. 44) — ADR-006`);
    for (const [j, inscricao] of (advogado.oab ?? []).entries()) {
      exigir(UFS.includes(inscricao.uf), `advogados[${i}].oab[${j}].uf inválida`);
      exigir(FORMATO_OAB.test(inscricao.numero ?? ''), `advogados[${i}].oab[${j}].numero fora do formato ("123.456")`);
    }
  }
  exigir(texto(pagina.cidade), 'cidade ausente (a sede; aparece no índice)');
  exigir(UFS.includes(pagina.uf), 'uf ausente ou inválida (aparece no índice)');
  exigirResumoDeDemonstracao(pagina, exigir);
}

/**
 * Nutricionista (ADR-008): nome, a palavra "Nutricionista" e a inscrição no CRN da jurisdição (Res. CFN
 * 599/2018, art. 21). Enquanto o número não chega, `crn: "PENDENTE"` deixa construir o rascunho para ver
 * no navegador — a página mostra "PENDENTE" e o verificar.mjs reprova (regra 1); publicar recusa.
 */
function validarNutricao(pagina, exigir) {
  const nutricionista = pagina.nutricionista ?? {};
  exigir(texto(nutricionista.nome), 'nutricionista.nome ausente — regra 2 (Res. CFN 599/2018, art. 21)');
  const { crn } = nutricionista;
  if (crn === PENDENTE) {
    exigir(pagina.publicar !== true, 'nutricionista.crn PENDENTE: sem a inscrição no CRN a página não publica — regra 2 (ADR-008)');
  } else {
    exigir(Number.isInteger(crn?.regiao) && crn.regiao >= 1 && crn.regiao <= 11,
      'nutricionista.crn.regiao precisa ser o número do Regional (1 a 11) — regra 2 (ADR-008)');
    exigir(FORMATO_CRN.test(crn?.numero ?? ''), 'nutricionista.crn.numero precisa ser só dígitos (com "/P" se provisória) — regra 2 (ADR-008)');
  }
  for (const [i, area] of (nutricionista.areas ?? []).entries()) exigir(texto(area), `nutricionista.areas[${i}] vazia`);
  // A sede aparece no índice; sem fonte, fica de fora (regra 1) — por isso não é obrigatória aqui.
  if (pagina.uf !== undefined) exigir(UFS.includes(pagina.uf), 'uf inválida');
  exigir(!ehDemonstracao(pagina), 'demonstracao não se aplica a nutricionista: a página é de uma profissional real (ADR-008)');
  if (pagina.siteOficial !== undefined) {
    exigir(texto(pagina.siteOficial) && pagina.siteOficial.startsWith('https://'), 'siteOficial, se existir, precisa ser https://');
  }
}

/** "CRN-5 12345": como a inscrição aparece na página e no JSON-LD (ADR-008). */
export function inscricaoCrn(pagina) {
  const { crn } = pagina.nutricionista;
  return crn === PENDENTE ? `CRN ${PENDENTE}` : `CRN-${crn.regiao} ${crn.numero}`;
}

/**
 * Corretor(a) de imóveis (ADR-009): nome, o gênero gramatical (decide "Corretor de Imóveis" ou "Corretora
 * de Imóveis") e a inscrição no CRECI da jurisdição (Lei 6.530/1978, art. 3º; Res. COFECI 326/1992). Enquanto
 * o número não chega, `creci: "PENDENTE"` deixa construir o rascunho para ver no navegador — a página mostra
 * "CRECI PENDENTE" e o verificar.mjs reprova (regra 1); publicar recusa.
 */
function validarImobiliario(pagina, exigir) {
  const corretor = pagina.corretor ?? {};
  exigir(texto(corretor.nome), 'corretor.nome ausente — regra 2 (ADR-009)');
  exigir(['M', 'F'].includes(corretor.generoGramatical),
    'corretor.generoGramatical deve ser "M" ou "F" (decide "Corretor de Imóveis" ou "Corretora de Imóveis") — ADR-009');
  if (corretor.titulo !== undefined) exigir(texto(corretor.titulo), 'corretor.titulo, se existir, precisa ser texto');
  const { creci } = corretor;
  if (creci === PENDENTE) {
    exigir(pagina.publicar !== true, 'corretor.creci PENDENTE: sem a inscrição no CRECI a página não publica — regra 2 (ADR-009)');
  } else {
    exigir(UFS.includes(creci?.uf), 'corretor.creci.uf inválida — regra 2 (ADR-009)');
    exigir(FORMATO_CRECI.test(creci?.numero ?? ''),
      'corretor.creci.numero fora do formato ("36.265" ou "36.265-F") — regra 2 (ADR-009)');
  }
  if (corretor.cnai !== undefined) {
    exigir(FORMATO_CNAI.test(corretor.cnai ?? ''), 'corretor.cnai fora do formato ("58.909") — ADR-009');
  }
  // "Avaliador(a)" só com inscrição no CNAI (Res. COFECI 1.066/2007): o número vai junto na identificação.
  if (corretor.avaliador !== undefined) {
    exigir(corretor.avaliador === true && texto(corretor.cnai),
      'corretor.avaliador só aceita true, e exige corretor.cnai: sem inscrição no CNAI não há avaliador (Res. COFECI 1.066/2007) — ADR-009');
  }
  // A cidade aparece no índice; sem fonte, fica de fora (regra 1) — por isso não é obrigatória aqui.
  if (pagina.uf !== undefined) exigir(UFS.includes(pagina.uf), 'uf inválida');
  if (pagina.redes?.instagram !== undefined) {
    exigir(texto(pagina.redes.instagram) && pagina.redes.instagram.startsWith('https://www.instagram.com/'),
      'redes.instagram, se existir, precisa começar com https://www.instagram.com/');
  }
  exigir(!ehDemonstracao(pagina), 'demonstracao não se aplica a corretor de imóveis: a página é de uma profissional real (ADR-009)');
}

/** "CRECI-BA 36.265": como a inscrição aparece na página e no JSON-LD (ADR-009). */
export function inscricaoCreci(pagina) {
  const { creci } = pagina.corretor;
  return creci === PENDENTE ? `CRECI ${PENDENTE}` : `CRECI-${creci.uf} ${creci.numero}`;
}

/** "Corretora de Imóveis" ou "Corretor de Imóveis" (Lei 6.530/1978, art. 3º) — ADR-009. */
export function profissaoCorretor(pagina) {
  const feminino = pagina.corretor.generoGramatical === 'F';
  const corretor = feminino ? 'Corretora' : 'Corretor';
  // Com a inscrição no CNAI, "Corretora e Avaliadora de Imóveis" (Res. COFECI 1.066/2007).
  if (pagina.corretor.avaliador === true) return `${corretor} e ${feminino ? 'Avaliadora' : 'Avaliador'} de Imóveis`;
  return `${corretor} de Imóveis`;
}

/** Página de negócio (empresa, consultoria): sem CRM; o nome e, na proposta, o site oficial (ADR-005). */
function validarNegocio(pagina, exigir) {
  exigir(texto(pagina.organizacao?.nome), 'organizacao.nome ausente — ADR-005');
  if (pagina.uf !== undefined) exigir(UFS.includes(pagina.uf), 'uf inválida');
  exigir(!ehDemonstracao(pagina), 'demonstracao é modo de página de médico fictício (ADR-004); negócio real usa proposta (ADR-005)');
  if (ehProposta(pagina)) {
    exigir(texto(pagina.siteOficial) && pagina.siteOficial.startsWith('https://'),
      'siteOficial (https://) é obrigatório na proposta: o aviso diz qual é o site oficial — ADR-005');
  }
  // Produto próprio ainda em avaliação: só muda a etiqueta do índice. Não é modo de publicação.
  if (pagina.preLancamento !== undefined) {
    exigir(pagina.preLancamento === true && !ehProposta(pagina),
      'preLancamento só aceita true, e não se soma a proposta: é a etiqueta do produto em pré-lançamento no índice');
  }
}

function exigirRevisaoDeMedico(pagina, exigir) {
  const revisao = pagina.revisao ?? {};
  // Na demonstração não há médico para conferir CRM nem aprovar; a conferência CFM continua (ADR-004).
  if (!ehDemonstracao(pagina)) {
    exigir(FORMATO_DATA.test(revisao.crmConferidoEm ?? ''),
      'revisao.crmConferidoEm ausente: CRM e RQE conferidos no portal do CFM antes de publicar — regra 4');
    exigir(FORMATO_DATA.test(revisao.aprovadoPeloMedicoEm ?? ''),
      'revisao.aprovadoPeloMedicoEm ausente: a página só publica com a aprovação do médico — regra 4');
  }
  exigir(FORMATO_DATA.test(revisao.conferenciaCfmEm ?? ''),
    'revisao.conferenciaCfmEm ausente: a conferência da publicidade médica não foi feita — regra 3');
}

function exigirRevisaoDeAdvocacia(pagina, exigir) {
  const revisao = pagina.revisao ?? {};
  // Na demonstração não há escritório para conferir inscrições nem aprovar (ADR-006); na proposta, o
  // escritório real ainda não aprovou (ADR-006, emenda 2026-09-28, espelha ADR-008 e ADR-009). Nos dois
  // casos a conferência pelo Provimento 205/2021 continua obrigatória.
  if (!ehDemonstracao(pagina) && !ehProposta(pagina)) {
    exigir(FORMATO_DATA.test(revisao.oabConferidaEm ?? ''),
      'revisao.oabConferidaEm ausente: inscrições conferidas no Cadastro Nacional dos Advogados antes de publicar — regra 4 (ADR-006)');
    exigir(FORMATO_DATA.test(revisao.aprovadoPeloEscritorioEm ?? ''),
      'revisao.aprovadoPeloEscritorioEm ausente: a página só publica com a aprovação do sócio administrador — regra 4 (ADR-006)');
  }
  exigir(FORMATO_DATA.test(revisao.conferenciaOabEm ?? ''),
    'revisao.conferenciaOabEm ausente: a conferência pelo Provimento 205/2021 da OAB não foi feita — regra 3 (ADR-006)');
}

function exigirRevisaoDeNutricao(pagina, exigir) {
  const revisao = pagina.revisao ?? {};
  // A proposta vai ao ar antes da aprovação da nutricionista, por decisão do dono: só por link, com noindex,
  // etiqueta no índice e o aviso no topo (ADR-008, emenda de 2026-09-27). A norma continua conferida.
  exigir(FORMATO_DATA.test(revisao.conferenciaCfnEm ?? ''),
    'revisao.conferenciaCfnEm ausente: a conferência pelo Código de Ética do Nutricionista não foi feita — regra 3 (ADR-008)');
  if (ehProposta(pagina)) return;
  exigir(FORMATO_DATA.test(revisao.crnConferidoEm ?? ''),
    'revisao.crnConferidoEm ausente: inscrição conferida no CRN da jurisdição antes de publicar — regra 4 (ADR-008)');
  exigir(FORMATO_DATA.test(revisao.aprovadoPelaNutricionistaEm ?? ''),
    'revisao.aprovadoPelaNutricionistaEm ausente: a página só publica com a aprovação da nutricionista — regra 4 (ADR-008)');
}

function exigirRevisaoDeImobiliario(pagina, exigir) {
  const revisao = pagina.revisao ?? {};
  // A proposta vai ao ar antes da aprovação da corretora, como na nutricionista (ADR-009, espelha a
  // emenda do ADR-008). A norma continua conferida.
  exigir(FORMATO_DATA.test(revisao.conferenciaCofeciEm ?? ''),
    'revisao.conferenciaCofeciEm ausente: a conferência pelo Código de Ética do COFECI não foi feita — regra 3 (ADR-009)');
  if (ehProposta(pagina)) return;
  exigir(FORMATO_DATA.test(revisao.creciConferidoEm ?? ''),
    'revisao.creciConferidoEm ausente: inscrição conferida no CRECI da jurisdição antes de publicar — regra 4 (ADR-009)');
  exigir(FORMATO_DATA.test(revisao.aprovadoPelaCorretoraEm ?? ''),
    'revisao.aprovadoPelaCorretoraEm ausente: a página só publica com a aprovação da corretora ou do corretor — regra 4 (ADR-009)');
}

function exigirRevisaoDeNegocio(pagina, exigir) {
  // A proposta, por definição, ainda não foi aprovada: vai ao ar só por link, com o aviso (ADR-005).
  if (ehProposta(pagina)) return;
  exigir(FORMATO_DATA.test(pagina.revisao?.aprovadoPeloClienteEm ?? ''),
    'revisao.aprovadoPeloClienteEm ausente: o site de um negócio só publica com a aprovação do dono do negócio — ADR-005');
}

export function nomeDeExibicao(pagina) {
  if (ehNegocio(pagina)) return pagina.organizacao.nome;
  if (ehAdvocacia(pagina)) return pagina.sociedade.nome;
  if (ehNutricao(pagina)) return pagina.nutricionista.nome;
  if (ehImobiliario(pagina)) return pagina.corretor.nome;
  const { tratamento, nome } = pagina.medico;
  return tratamento ? `${tratamento} ${nome}` : nome;
}

/** "Médico" ou "Médica" — a palavra que o art. 4º, I da Res. CFM 2.336/2023 exige junto do CRM. */
export function palavraMedico(pagina) {
  return pagina.medico.generoGramatical === 'F' ? 'Médica' : 'Médico';
}

/** Página de empresa ou consultoria, não de médico (ADR-005). */
export function ehNegocio(pagina) {
  return pagina.tipo === 'negocio';
}

/** Página de sociedade de advogados: OAB e Provimento 205/2021 no lugar do CFM (ADR-006). */
export function ehAdvocacia(pagina) {
  return pagina.tipo === 'advocacia';
}

/** Página de nutricionista: CRN e Código de Ética do Nutricionista no lugar do CFM (ADR-008). */
export function ehNutricao(pagina) {
  return pagina.tipo === 'nutricao';
}

/** Página de corretor(a) de imóveis: CRECI e Código de Ética do COFECI no lugar do CFM (ADR-009). */
export function ehImobiliario(pagina) {
  return pagina.tipo === 'imobiliario';
}

/** O que a página anuncia, numa linha: as especialidades do médico, a categoria do negócio ou do escritório. */
export function assuntoDaPagina(pagina) {
  if (ehNegocio(pagina)) return pagina.organizacao.categoria ?? '';
  if (ehAdvocacia(pagina)) return pagina.sociedade.categoria ?? 'Advocacia';
  if (ehNutricao(pagina)) return (pagina.nutricionista.areas ?? []).join(', ') || 'Nutrição';
  if (ehImobiliario(pagina)) return pagina.corretor.titulo ?? profissaoCorretor(pagina);
  return (pagina.medico.especialidades ?? []).map((e) => e.nome).join(', ');
}

/** Página de médico ou escritório fictício, só por link direto: noindex, fora do índice e do sitemap (ADR-004). */
export function ehDemonstracao(pagina) {
  return pagina.demonstracao === true;
}

/**
 * Proposta: página de um negócio (ADR-005), de uma sociedade de advogados (ADR-006, emenda 2026-09-28), de
 * uma nutricionista (ADR-008) ou de uma corretora de imóveis (ADR-009) real, ainda sem aprovação — noindex,
 * fora do sitemap, no índice com a etiqueta "Proposta · em avaliação".
 */
export function ehProposta(pagina) {
  return pagina.proposta === true;
}

/**
 * A proposta sem site oficial não leva aviso na página, só a etiqueta "Proposta · em avaliação" no índice
 * (decisão do dono, 2026-09-27: emenda do ADR-008 e do ADR-009). Com site oficial, o aviso diz qual é o verdadeiro.
 */
export function propostaAvisaNoTopo(pagina) {
  return ehProposta(pagina) && Boolean(pagina.siteOficial);
}

/** Página que só abre por link direto: nunca no Google, no índice nem no sitemap (ADR-004, ADR-005). */
export function soPorLinkDireto(pagina) {
  return ehDemonstracao(pagina) || ehProposta(pagina);
}

/** O texto exato que o elemento data-aviso-demonstracao mostra no topo da página (ADR-004, ADR-006). */
export function avisoDeDemonstracao(pagina) {
  if (ehAdvocacia(pagina)) {
    return `Página de demonstração. ${nomeDeExibicao(pagina)} é um escritório fictício; advogados, inscrições na OAB `
      + 'e contatos são fictícios. Nenhuma pessoa ou empresa real está ligada a esta página.';
  }
  const ficticio = pagina.medico.generoGramatical === 'F' ? 'uma médica fictícia' : 'um médico fictício';
  return `Página de demonstração. ${nomeDeExibicao(pagina)} é ${ficticio}; CRM, RQE e contatos são fictícios. `
    + 'Os hospitais e planos citados não têm relação com esta página.';
}

/**
 * O texto exato que o elemento data-aviso-proposta mostra no topo da página (ADR-005). Só existe quando há um
 * site oficial a apontar; a proposta sem site oficial (nutricionista, corretor) fica só na etiqueta do índice.
 */
export function avisoDeProposta(pagina) {
  const oficial = new URL(pagina.siteOficial).hostname.replace(/^www\./, '');
  return `Proposta de novo site para ${nomeDeExibicao(pagina)}, em avaliação. Este não é o site oficial: `
    + `o site oficial é ${oficial}.`;
}

function texto(valor) {
  return typeof valor === 'string' && valor.trim().length > 0;
}
