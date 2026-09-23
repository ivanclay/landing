// O contrato do pagina.json: o que toda página precisa declarar para ser construída e publicada.
// Cada mensagem cita a regra do CLAUDE.md (ou o ADR) que ela garante.
//
// Dois tipos de página: "medico" (o padrão — identificação do CFM, regras 2 a 4) e "negocio" (empresa ou
// consultoria de saúde, sem CRM — ADR-005). Dois modos que só abrem por link direto: "demonstracao"
// (médico fictício, ADR-004) e "proposta" (site de um negócio real ainda sem aprovação, ADR-005).

import { normalizar } from './html.mjs';

export const FORMATO_SLUG = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;
const FORMATO_DATA = /^\d{4}-\d{2}-\d{2}$/;
const FORMATO_E164 = /^\+\d{10,15}$/;
const SO_DIGITOS = /^\d+$/;
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
  exigir([undefined, 'medico', 'negocio'].includes(pagina.tipo), 'tipo deve ser "medico" (padrão) ou "negocio" — ADR-005');
  for (const [modo, adr] of [['demonstracao', 'ADR-004'], ['proposta', 'ADR-005']]) {
    exigir(pagina[modo] === undefined || typeof pagina[modo] === 'boolean', `${modo}, se existir, precisa ser true ou false — ${adr}`);
  }

  if (ehNegocio(pagina)) validarNegocio(pagina, exigir);
  else validarMedico(pagina, exigir);

  exigir(texto(pagina.resumo) && pagina.resumo.length >= 50 && pagina.resumo.length <= 160,
    'resumo precisa ter entre 50 e 160 caracteres (vira a meta description e o texto do índice)');

  const contato = pagina.contato ?? {};
  exigir(texto(contato.whatsapp) || texto(contato.telefone) || texto(contato.agendamento),
    'contato precisa de whatsapp, telefone ou agendamento — é o único caminho da página até quem a lê (regra 5)');
  for (const campo of ['whatsapp', 'telefone']) {
    if (texto(contato[campo])) exigir(FORMATO_E164.test(contato[campo]), `contato.${campo} precisa estar em E.164 (+5571991234567)`);
  }
  if (texto(contato.agendamento)) exigir(contato.agendamento.startsWith('https://'), 'contato.agendamento precisa ser https://');

  if (pagina.publicar === true) {
    exigir(FORMATO_DATA.test(pagina.atualizadoEm ?? ''), 'atualizadoEm ausente (vai para o sitemap)');
    if (ehNegocio(pagina)) exigirRevisaoDeNegocio(pagina, exigir);
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
  if (ehDemonstracao(pagina)) {
    exigir(texto(pagina.resumo) && normalizar(pagina.resumo).includes('demonstracao'),
      'resumo de página de demonstração precisa dizer "demonstração": é o que aparece na prévia do link, onde o aviso da página não aparece — ADR-004');
  }
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

function exigirRevisaoDeNegocio(pagina, exigir) {
  // A proposta, por definição, ainda não foi aprovada: vai ao ar só por link, com o aviso (ADR-005).
  if (ehProposta(pagina)) return;
  exigir(FORMATO_DATA.test(pagina.revisao?.aprovadoPeloClienteEm ?? ''),
    'revisao.aprovadoPeloClienteEm ausente: o site de um negócio só publica com a aprovação do dono do negócio — ADR-005');
}

export function nomeDeExibicao(pagina) {
  if (ehNegocio(pagina)) return pagina.organizacao.nome;
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

/** Página de médico fictício, só por link direto: noindex, fora do índice e do sitemap (ADR-004). */
export function ehDemonstracao(pagina) {
  return pagina.demonstracao === true;
}

/** Proposta de site de um negócio real, ainda sem aprovação: noindex, fora do índice e do sitemap (ADR-005). */
export function ehProposta(pagina) {
  return pagina.proposta === true;
}

/** Página que só abre por link direto: nunca no Google, no índice nem no sitemap (ADR-004, ADR-005). */
export function soPorLinkDireto(pagina) {
  return ehDemonstracao(pagina) || ehProposta(pagina);
}

/** O texto exato que o elemento data-aviso-demonstracao mostra no topo da página (ADR-004). */
export function avisoDeDemonstracao(pagina) {
  const ficticio = pagina.medico.generoGramatical === 'F' ? 'uma médica fictícia' : 'um médico fictício';
  return `Página de demonstração. ${nomeDeExibicao(pagina)} é ${ficticio}; CRM, RQE e contatos são fictícios. `
    + 'Os hospitais e planos citados não têm relação com esta página.';
}

/** O texto exato que o elemento data-aviso-proposta mostra no topo da página (ADR-005). */
export function avisoDeProposta(pagina) {
  const oficial = new URL(pagina.siteOficial).hostname.replace(/^www\./, '');
  return `Proposta de novo site para ${nomeDeExibicao(pagina)}, em avaliação. Este não é o site oficial: `
    + `o site oficial é ${oficial}.`;
}

function texto(valor) {
  return typeof valor === 'string' && valor.trim().length > 0;
}
