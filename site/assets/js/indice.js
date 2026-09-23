// Busca do índice: filtra as duas tabelas (demonstrações e produtos dos clientes) ao mesmo tempo.
// Sem JS as tabelas aparecem inteiras e a página continua útil (regra 9).
document.documentElement.classList.add('js');

const campo = document.querySelector('[data-busca-campo]');
const contagem = document.querySelector('[data-busca-contagem]');
const grupos = [...document.querySelectorAll('[data-busca-grupo]')].map((grupo) => ({
  linhas: [...grupo.querySelectorAll('[data-busca]')],
  nenhum: grupo.querySelector('[data-busca-nenhum]'),
}));
const total = grupos.reduce((soma, grupo) => soma + grupo.linhas.length, 0);

const normalizar = (texto) => texto.normalize('NFD').replace(/[̀-ͯ]/g, '').toLowerCase().trim();

function filtrar() {
  const termo = normalizar(campo.value);
  let visiveis = 0;
  for (const { linhas, nenhum } of grupos) {
    let visiveisNoGrupo = 0;
    for (const linha of linhas) {
      const combina = normalizar(linha.dataset.busca).includes(termo);
      linha.hidden = !combina;
      if (combina) visiveisNoGrupo += 1;
    }
    // O aviso de "nenhum" só aparece quando a busca esvaziou um grupo que tinha linhas.
    if (nenhum) nenhum.hidden = visiveisNoGrupo > 0 || !linhas.length || !termo;
    visiveis += visiveisNoGrupo;
  }
  contagem.textContent = termo ? `${visiveis} de ${total} ${total === 1 ? 'página' : 'páginas'}` : '';
}

if (campo && total) campo.addEventListener('input', filtrar);

// Sem página publicada, a busca não tem o que procurar.
if (!total) document.querySelector('.busca')?.setAttribute('hidden', '');
