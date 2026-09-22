// Comportamento comum às páginas de médico. Tudo aqui é melhoria: sem JS a página funciona inteira
// (regra 9). Comportamento próprio de uma página mora em site/<slug>/pagina.js.
document.documentElement.classList.add('js');

// A barra de contato do celular some enquanto o contato do topo está na tela: dois botões iguais
// visíveis ao mesmo tempo é ruído.
const barra = document.querySelector('.barra-contato');
const contatoDoTopo = document.querySelector('[data-contato-topo]');
if (barra && contatoDoTopo && 'IntersectionObserver' in window) {
  new IntersectionObserver(([entrada]) => {
    barra.toggleAttribute('data-oculta', entrada.isIntersecting);
  }).observe(contatoDoTopo);
}
