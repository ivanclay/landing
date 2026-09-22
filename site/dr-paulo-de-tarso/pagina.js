// O seletor "Qual é o seu plano?" (o gesto da página). Sem JS, a tabela plano × local fica aberta e
// cada local tem o seu link de WhatsApp — nada depende deste arquivo (regra 9).
const NUMERO_WHATSAPP = '5511900000000';
const PLANOS = {
  bradesco: 'Bradesco Saúde', sulamerica: 'SulAmérica', amil: 'Amil', porto: 'Porto Saúde',
  omint: 'Omint', careplus: 'Care Plus', particular: 'Particular',
};
const NOMES_CURTOS = {
  consultorio: 'consultório do Jardim Paulista', einstein: 'Einstein', sirio: 'Sírio-Libanês',
  oswaldo: 'Oswaldo Cruz', hcor: 'HCor',
};

const secao = document.querySelector('#planos');
const opcoes = [...secao.querySelectorAll('[data-plano]')];
const lugares = [...secao.querySelectorAll('[data-local]')];
const resposta = secao.querySelector('[data-resposta]');
secao.querySelector('[data-matriz]')?.removeAttribute('open');

function linkDoWhatsapp(plano, local) {
  const comoPaga = plano === 'particular' ? 'como particular' : `pelo plano ${PLANOS[plano]}`;
  // A mensagem diz plano e local, e nunca pede sintoma (regra 5).
  const texto = `Olá! Gostaria de marcar uma consulta com o Dr. Paulo de Tarso ${local}, ${comoPaga}.`;
  return `https://wa.me/${NUMERO_WHATSAPP}?text=${encodeURIComponent(texto)}`;
}

function listar(nomes) {
  return nomes.length > 1 ? `${nomes.slice(0, -1).join(', ')} e ${nomes.at(-1)}` : nomes[0];
}

function escolher(plano) {
  secao.dataset.planoEscolhido = plano;
  for (const opcao of opcoes) opcao.setAttribute('aria-pressed', String(opcao.dataset.plano === plano));
  const aceitos = [];
  for (const lugar of lugares) {
    const vale = lugar.dataset.planos.split(' ').includes(plano);
    lugar.toggleAttribute('data-vale', vale);
    lugar.toggleAttribute('data-nao-vale', !vale);
    lugar.querySelector('.lugar__marcador').textContent = vale
      ? 'Atende pelo seu plano'
      : `${PLANOS[plano]} não vale aqui`;
    const link = lugar.querySelector('[data-whatsapp-local]');
    if (vale) {
      aceitos.push(NOMES_CURTOS[lugar.dataset.local]);
      link.href = linkDoWhatsapp(plano, link.dataset.whatsappLocal);
    }
  }
  resposta.textContent = plano === 'particular'
    ? `Particular: em todos os locais — ${listar(aceitos)}. Com recibo para reembolso.`
    : `Com ${PLANOS[plano]}: ${listar(aceitos)}.`;
}

for (const opcao of opcoes) opcao.addEventListener('click', () => escolher(opcao.dataset.plano));

document.querySelector('[data-imprimir]')?.addEventListener('click', () => window.print());
