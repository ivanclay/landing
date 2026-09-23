// A linha do agora (direcao-de-arte.md, o gesto): marca a hora de agora no fuso da clínica (E-06), como a
// linha vermelha de toda agenda. Sem JS ela fica parada às 08h00 e a página continua inteira (regra 9).
// Atualiza uma vez por minuto, sem animação.
const FUSO_DA_CLINICA = 'America/Bahia';
const linha = document.querySelector('[data-agora]');

function horaNoFuso() {
  const partes = new Intl.DateTimeFormat('pt-BR', {
    timeZone: FUSO_DA_CLINICA, hour: '2-digit', minute: '2-digit', hourCycle: 'h23',
  }).formatToParts(new Date());
  const valor = (tipo) => Number(partes.find((parte) => parte.type === tipo).value);
  return { hora: valor('hour'), minuto: valor('minute') };
}

const duasCasas = (numero) => String(numero).padStart(2, '0');

function marcarAgora() {
  const { hora, minuto } = horaNoFuso();
  linha.querySelector('[data-agora-hora]').textContent = `${duasCasas(hora)}h${duasCasas(minuto)}`;
  // A régua começa 4 horas antes; --fracao sobe a régua pela fração da hora já passada.
  linha.querySelectorAll('.agora__regua li').forEach((item, indice) => {
    item.textContent = `${duasCasas((hora - 4 + indice + 24) % 24)}h`;
  });
  linha.style.setProperty('--fracao', (minuto / 60).toFixed(3));
}

if (linha) {
  marcarAgora();
  setInterval(marcarAgora, 60 * 1000);
}
