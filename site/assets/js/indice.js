// Busca do índice. Sem JS a lista aparece inteira e a página continua útil (regra 9).
document.documentElement.classList.add('js');

const campo = document.querySelector('[data-busca-campo]');
const contagem = document.querySelector('[data-busca-contagem]');
const itens = [...document.querySelectorAll('.indice__item')];
const nenhum = document.querySelector('[data-busca-nenhum]');

const normalizar = (texto) => texto.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase().trim();

function filtrar() {
  const termo = normalizar(campo.value);
  let visiveis = 0;
  for (const item of itens) {
    const combina = normalizar(item.dataset.busca).includes(termo);
    item.hidden = !combina;
    if (combina) visiveis += 1;
  }
  nenhum.hidden = visiveis > 0;
  contagem.textContent = termo
    ? `${visiveis} de ${itens.length} ${itens.length === 1 ? 'página' : 'páginas'}`
    : '';
}

if (campo && itens.length) campo.addEventListener('input', filtrar);

// Sem página publicada, a busca não tem o que procurar.
if (!itens.length) document.querySelector('.busca')?.setAttribute('hidden', '');
