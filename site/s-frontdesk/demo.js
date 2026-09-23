// A demonstração do S-FrontDesk (docs/paginas/s-frontdesk/roteiro.md, versão prototipo-1): a agenda do dia
// da recepção e o agendamento pelo paciente, com dados fictícios embutidos aqui mesmo.
//
// ⌗ Nenhuma requisição de rede: sem fetch, XMLHttpRequest, WebSocket, sendBeacon nem import dinâmico, e nada
//   guardado no navegador — recarregar volta ao início (E-02, regra 3). A checagem da entrega confere.
// ⌗ Sem JS, a página mostra a "fotografia" da agenda, gerada destes mesmos dados por
//   ferramentas/entrega/foto-da-demo.mjs. Mudou DADOS? Rode o gerador de novo.

// @dados:inicio
const DADOS = {
  "clinica": { "nome": "Clínica Exemplo", "fuso": "America/Bahia" },
  "relogio": "09:40",
  "grade": ["08:00", "08:30", "09:00", "09:30", "10:00", "10:30", "11:00", "11:30"],
  "servicos": [
    { "id": "consulta", "nome": "Consulta", "minutos": 30 },
    { "id": "retorno", "nome": "Retorno", "minutos": 30 }
  ],
  "profissionais": [
    { "id": "helena", "nome": "Dra. Helena Exemplo", "palavra": "Médica", "crm": "CRM-BA 000000", "especialidade": "Clínica médica", "rqe": "RQE 000000" },
    { "id": "caio", "nome": "Dr. Caio Exemplo", "palavra": "Médico", "crm": "CRM-BA 000000", "especialidade": "Cardiologia", "rqe": "RQE 000000" }
  ],
  "pacientesParaAgendar": ["Paciente Exemplo 11", "Paciente Exemplo 12", "Paciente Exemplo 13"],
  "voceNoApp": "Paciente Exemplo 14",
  "agendaDeHoje": {
    "helena": {
      "08:00": { "estado": "Compareceu", "paciente": "Paciente Exemplo 1", "servico": "consulta", "canal": "Telefone" },
      "08:30": { "estado": "Compareceu", "paciente": "Paciente Exemplo 2", "servico": "retorno", "canal": "App" },
      "09:00": { "estado": "Faltou", "paciente": "Paciente Exemplo 3", "servico": "consulta", "canal": "Telefone" },
      "09:30": { "estado": "Compareceu", "paciente": "Paciente Exemplo 4", "servico": "consulta", "canal": "Balcão" },
      "10:00": { "estado": "Confirmado", "paciente": "Paciente Exemplo 5", "servico": "retorno", "canal": "App" },
      "11:00": { "estado": "Agendado", "paciente": "Paciente Exemplo 6", "servico": "consulta", "canal": "Telefone" }
    },
    "caio": {
      "08:00": { "estado": "Bloqueio", "motivo": "Reunião da equipe" },
      "08:30": { "estado": "Bloqueio", "motivo": "Reunião da equipe" },
      "09:00": { "estado": "Compareceu", "paciente": "Paciente Exemplo 7", "servico": "consulta", "canal": "App" },
      "09:30": { "estado": "Faltou", "paciente": "Paciente Exemplo 8", "servico": "retorno", "canal": "Telefone" },
      "10:30": { "estado": "Confirmado", "paciente": "Paciente Exemplo 9", "servico": "consulta", "canal": "App" },
      "11:30": { "estado": "Agendado", "paciente": "Paciente Exemplo 10", "servico": "retorno", "canal": "Telefone" }
    }
  }
};
// @dados:fim

const raiz = document.querySelector('[data-demo]');
if (raiz) iniciarDemonstracao(raiz);

function iniciarDemonstracao(raiz) {
  const app = raiz.querySelector('[data-demo-app]');
  const hoje = dataNoFuso(DADOS.clinica.fuso);
  const dias = proximosDiasUteis(hoje, 5);
  let estado = estadoInicial();

  function estadoInicial() {
    return {
      aba: 'recepcao',
      agenda: structuredClone(DADOS.agendaDeHoje),
      outrosDias: {},
      selecionado: null,
      rascunho: { servico: null, paciente: null },
      novo: null,
      paciente: { passo: 'servico', servico: null, profissional: null, dia: null, hora: null, marcado: null, remarcando: null },
    };
  }

  app.innerHTML = `
    <div class="demo__topo">
      <div class="demo__abas" role="tablist" aria-label="Visões da demonstração">
        <button type="button" role="tab" id="aba-recepcao" aria-controls="painel-recepcao" data-aba="recepcao">Como a recepção vê</button>
        <button type="button" role="tab" id="aba-paciente" aria-controls="painel-paciente" data-aba="paciente">Como o paciente vê</button>
      </div>
      <button type="button" class="demo__recomecar" data-recomecar>Recomeçar a demonstração</button>
    </div>
    <div role="tabpanel" id="painel-recepcao" aria-labelledby="aba-recepcao" class="demo__painel" data-painel="recepcao"></div>
    <div role="tabpanel" id="painel-paciente" aria-labelledby="aba-paciente" class="demo__painel" data-painel="paciente"></div>
    <p class="demo__anuncio" role="status" aria-live="polite" data-anuncio></p>`;

  const anuncio = app.querySelector('[data-anuncio]');
  const anunciar = (texto) => { anuncio.textContent = ''; requestAnimationFrame(() => { anuncio.textContent = texto; }); };

  // ── Abas (padrão ARIA: setas trocam de aba, só a aba ativa entra no Tab) ──
  const abas = [...app.querySelectorAll('[role="tab"]')];
  abas.forEach((aba, indice) => {
    aba.addEventListener('click', () => trocarAba(aba.dataset.aba));
    aba.addEventListener('keydown', (evento) => {
      const passo = { ArrowRight: 1, ArrowLeft: -1 }[evento.key];
      if (!passo) return;
      evento.preventDefault();
      const proxima = abas[(indice + passo + abas.length) % abas.length];
      trocarAba(proxima.dataset.aba);
      proxima.focus();
    });
  });
  function trocarAba(aba) {
    estado.aba = aba;
    desenhar();
  }

  app.querySelector('[data-recomecar]').addEventListener('click', () => {
    estado = estadoInicial();
    desenhar();
    app.querySelector('#aba-recepcao').focus();
    anunciar('A demonstração voltou ao início.');
  });

  function desenhar() {
    for (const aba of abas) {
      const ativa = aba.dataset.aba === estado.aba;
      aba.setAttribute('aria-selected', String(ativa));
      aba.tabIndex = ativa ? 0 : -1;
    }
    for (const painel of app.querySelectorAll('[data-painel]')) painel.hidden = painel.dataset.painel !== estado.aba;
    desenharRecepcao(app.querySelector('[data-painel="recepcao"]'));
    desenharPaciente(app.querySelector('[data-painel="paciente"]'));
  }

  // ── Recepção: a agenda do dia ──────────────────────────────────────────────────────────────────
  function desenharRecepcao(painel) {
    const colunas = DADOS.profissionais.map((profissional) => `
      <section class="agenda__coluna" aria-label="Agenda de ${esc(profissional.nome)}">
        <h4 class="agenda__profissional">${identificacao(profissional)}</h4>
        <ol class="agenda__horarios" role="list">
          ${DADOS.grade.map((hora) => botaoDeHorario(profissional, hora)).join('')}
        </ol>
      </section>`).join('');
    painel.innerHTML = `
      <div class="agenda__cabeca">
        <h3 class="agenda__titulo">Agenda do dia · ${esc(formatarDia(hoje, true))}</h3>
        <p class="agenda__relogio">${esc(DADOS.clinica.nome)} (fictícia). Na demonstração, são <strong>${hhmm(DADOS.relogio)}</strong> no fuso da clínica.</p>
      </div>
      <div class="agenda">
        <div class="agenda__colunas">${colunas}</div>
        <div class="agenda__detalhe" data-detalhe>${detalheDoHorario()}</div>
      </div>`;
    painel.querySelectorAll('[data-horario]').forEach((botao) => botao.addEventListener('click', () => {
      const [profissional, hora] = botao.dataset.horario.split('|');
      estado.selecionado = { profissional, hora };
      estado.rascunho = { servico: null, paciente: null };
      desenhar();
      app.querySelector('[data-detalhe] h4')?.focus();
    }));
    ligarDetalhe(painel);
  }

  function botaoDeHorario(profissional, hora) {
    const item = estado.agenda[profissional.id][hora];
    const situacao = item?.estado ?? 'Livre';
    const selecionado = estado.selecionado?.profissional === profissional.id && estado.selecionado.hora === hora;
    const novo = estado.novo === `${profissional.id}|${hora}`;
    const quem = item?.paciente ? `${item.paciente} · ${nomeDoServico(item.servico)} · ${item.canal}` : item?.motivo ?? '';
    return `
      <li>
        <button type="button" class="horario horario--${classe(situacao)}${novo ? ' horario--novo' : ''}" data-horario="${profissional.id}|${hora}" aria-pressed="${selecionado}">
          <span class="horario__hora">${hhmm(hora)}</span>
          <span class="horario__situacao">${esc(situacao)}</span>
          <span class="horario__quem">${esc(quem)}</span>
        </button>
      </li>`;
  }

  function detalheDoHorario() {
    const selecao = estado.selecionado;
    if (!selecao) {
      return '<p class="detalhe__vazio">Escolha um horário da agenda. Um horário <strong>Livre</strong> abre o agendamento por telefone.</p>';
    }
    const profissional = DADOS.profissionais.find((p) => p.id === selecao.profissional);
    const item = estado.agenda[selecao.profissional][selecao.hora];
    const titulo = `${hhmm(selecao.hora)} · ${esc(profissional.nome)}`;
    if (!item) {
      if (selecao.hora < DADOS.relogio) {
        return `<h4 tabindex="-1">${titulo}</h4><p>Este horário já passou.</p>${botaoFechar()}`;
      }
      const { servico, paciente } = estado.rascunho;
      return `
        <h4 tabindex="-1">Agendar por telefone · ${titulo}</h4>
        <div class="detalhe__grupo" role="group" aria-label="Serviço">
          <p class="detalhe__rotulo">Serviço</p>
          ${DADOS.servicos.map((s) => `<button type="button" class="opcao" data-servico="${s.id}" aria-pressed="${servico === s.id}">${esc(s.nome)} · ${s.minutos} min</button>`).join('')}
        </div>
        <div class="detalhe__grupo" role="group" aria-label="Paciente">
          <p class="detalhe__rotulo">Paciente <span class="detalhe__nota">(lista fictícia)</span></p>
          ${DADOS.pacientesParaAgendar.map((nome) => `<button type="button" class="opcao" data-paciente="${esc(nome)}" aria-pressed="${paciente === nome}">${esc(nome)}</button>`).join('')}
        </div>
        <p class="detalhe__acoes">
          <button type="button" class="acao acao--principal" data-agendar ${servico && paciente ? '' : 'disabled'}>Agendar</button>
          ${botaoFechar()}
        </p>`;
    }
    if (item.estado === 'Bloqueio') {
      return `<h4 tabindex="-1">${titulo}</h4><p><strong>Bloqueio:</strong> ${esc(item.motivo)}. O horário está fechado na grade.</p>${botaoFechar()}`;
    }
    const resumo = `<p>${esc(item.paciente)} · ${nomeDoServico(item.servico)} · marcado por ${esc(item.canal)}</p>`;
    if (item.estado === 'Compareceu' || item.estado === 'Faltou') {
      return `<h4 tabindex="-1">${titulo}</h4>${resumo}<p>Atendimento registrado: <strong>${item.estado}</strong>.</p>${botaoFechar()}`;
    }
    const jaPassou = selecao.hora <= DADOS.relogio;
    return `
      <h4 tabindex="-1">${titulo} · ${item.estado}</h4>
      ${resumo}
      <p class="detalhe__ocupado">Horário ocupado: não aceita outro paciente.</p>
      <p class="detalhe__acoes">
        ${item.estado === 'Agendado' ? '<button type="button" class="acao" data-mudar="Confirmado">Confirmar</button>' : ''}
        <button type="button" class="acao" data-mudar="Compareceu">Chegou</button>
        ${jaPassou ? '<button type="button" class="acao" data-mudar="Faltou">Faltou</button>' : ''}
        <button type="button" class="acao" data-cancelar>Cancelar</button>
        ${botaoFechar()}
      </p>`;
  }

  const botaoFechar = () => '<button type="button" class="acao acao--leve" data-fechar>Fechar</button>';

  function ligarDetalhe(painel) {
    const detalhe = painel.querySelector('[data-detalhe]');
    const selecao = estado.selecionado;
    const voltarAoHorario = () => {
      const chave = selecao && `${selecao.profissional}|${selecao.hora}`;
      estado.selecionado = null;
      desenhar();
      if (chave) app.querySelector(`[data-horario="${chave}"]`)?.focus();
    };
    detalhe.querySelectorAll('[data-servico]').forEach((b) => b.addEventListener('click', () => {
      estado.rascunho.servico = b.dataset.servico; redesenharDetalhe(`[data-servico="${b.dataset.servico}"]`);
    }));
    detalhe.querySelectorAll('[data-paciente]').forEach((b) => b.addEventListener('click', () => {
      estado.rascunho.paciente = b.dataset.paciente; redesenharDetalhe(`[data-paciente="${b.dataset.paciente}"]`);
    }));
    detalhe.querySelector('[data-agendar]')?.addEventListener('click', () => {
      const { servico, paciente } = estado.rascunho;
      const profissional = DADOS.profissionais.find((p) => p.id === selecao.profissional);
      // Um horário, um paciente (E-07): quem chega aqui já viu o horário livre, mas a regra confere de novo.
      if (estado.agenda[selecao.profissional][selecao.hora]) { anunciar('Horário ocupado: escolha outro.'); return; }
      estado.agenda[selecao.profissional][selecao.hora] = { estado: 'Agendado', paciente, servico, canal: 'Telefone' };
      estado.novo = `${selecao.profissional}|${selecao.hora}`;
      anunciar(`Consulta agendada às ${hhmm(selecao.hora)} com ${profissional.nome}.`);
      voltarAoHorario();
    });
    detalhe.querySelectorAll('[data-mudar]').forEach((b) => b.addEventListener('click', () => {
      estado.agenda[selecao.profissional][selecao.hora].estado = b.dataset.mudar;
      anunciar(`${hhmm(selecao.hora)}: ${b.dataset.mudar}.`);
      voltarAoHorario();
    }));
    detalhe.querySelector('[data-cancelar]')?.addEventListener('click', () => {
      delete estado.agenda[selecao.profissional][selecao.hora];
      if (estado.paciente.marcado?.chave === `hoje|${selecao.profissional}|${selecao.hora}`) {
        estado.paciente = { ...estado.paciente, passo: 'cancelado', marcado: null };
      }
      anunciar(`Consulta das ${hhmm(selecao.hora)} cancelada. O horário voltou a ficar livre.`);
      voltarAoHorario();
    });
    detalhe.querySelector('[data-fechar]')?.addEventListener('click', voltarAoHorario);
    detalhe.addEventListener('keydown', (evento) => { if (evento.key === 'Escape') voltarAoHorario(); });
  }

  function redesenharDetalhe(foco) {
    desenhar();
    app.querySelector(`[data-detalhe] ${foco}`)?.focus();
  }

  // ── Paciente: agendar pelo aplicativo ──────────────────────────────────────────────────────────
  function horariosLivres(profissionalId, dia) {
    if (dia === hoje.chave) {
      return DADOS.grade.filter((hora) => hora > DADOS.relogio && !estado.agenda[profissionalId][hora]);
    }
    const indiceDoDia = dias.findIndex((d) => d.chave === dia);
    const indiceDoProfissional = DADOS.profissionais.findIndex((p) => p.id === profissionalId);
    // Os outros dias têm ocupação fictícia fixa, para a lista não vir sempre cheia nem sempre vazia.
    return DADOS.grade.filter((hora, indice) => (indiceDoDia * 7 + indice * 3 + indiceDoProfissional) % 4 !== 0
      && !estado.outrosDias[`${dia}|${profissionalId}|${hora}`]);
  }

  function desenharPaciente(painel) {
    const p = estado.paciente;
    const profissional = DADOS.profissionais.find((x) => x.id === p.profissional);
    const voltar = (passo) => `<button type="button" class="celular__voltar" data-ir="${passo}">Voltar</button>`;
    let tela = '';
    if (p.passo === 'servico') {
      tela = `<h3 tabindex="-1" class="celular__titulo">${p.remarcando ? 'Remarcar consulta' : 'Agendar consulta'}</h3>
        <p class="celular__apoio">Qual atendimento?</p>
        ${DADOS.servicos.map((s) => `<button type="button" class="escolha" data-escolher-servico="${s.id}">${esc(s.nome)}<span>${s.minutos} min</span></button>`).join('')}`;
    } else if (p.passo === 'profissional') {
      tela = `${voltar('servico')}<h3 tabindex="-1" class="celular__titulo">Com quem?</h3>
        ${DADOS.profissionais.map((x) => `<button type="button" class="escolha escolha--profissional" data-escolher-profissional="${x.id}">${identificacao(x)}</button>`).join('')}`;
    } else if (p.passo === 'dia') {
      tela = `${voltar('profissional')}<h3 tabindex="-1" class="celular__titulo">Qual dia?</h3>
        <p class="celular__apoio">${esc(profissional.nome)}</p>
        <div class="celular__grade">${dias.map((d) => `<button type="button" class="escolha escolha--dia" data-escolher-dia="${d.chave}">${esc(formatarDia(d, false))}</button>`).join('')}</div>`;
    } else if (p.passo === 'horario') {
      const livres = horariosLivres(p.profissional, p.dia);
      const dia = dias.find((d) => d.chave === p.dia);
      tela = `${voltar('dia')}<h3 tabindex="-1" class="celular__titulo">Qual horário?</h3>
        <p class="celular__apoio">${esc(formatarDia(dia, false))} · ${esc(profissional.nome)}</p>
        ${livres.length
          ? `<div class="celular__grade celular__grade--horas">${livres.map((h) => `<button type="button" class="escolha escolha--hora" data-escolher-hora="${h}">${hhmm(h)}</button>`).join('')}</div>`
          : '<p>Nenhum horário livre neste dia.</p>'}
        <p class="celular__nota">Só aparecem horários livres, no fuso da clínica.</p>`;
    } else if (p.passo === 'confirmar') {
      const dia = dias.find((d) => d.chave === p.dia);
      tela = `${voltar('horario')}<h3 tabindex="-1" class="celular__titulo">Confirme</h3>
        <dl class="celular__resumo">
          <div><dt>Atendimento</dt><dd>${nomeDoServico(p.servico)}</dd></div>
          <div><dt>Com</dt><dd>${identificacao(profissional)}</dd></div>
          <div><dt>Quando</dt><dd>${esc(formatarDia(dia, false))}, ${hhmm(p.hora)}</dd></div>
          <div><dt>Onde</dt><dd>${esc(DADOS.clinica.nome)}</dd></div>
        </dl>
        <button type="button" class="acao acao--principal acao--larga" data-confirmar>Confirmar agendamento</button>`;
    } else if (p.passo === 'agendado') {
      const m = p.marcado;
      const dia = dias.find((d) => d.chave === m.dia);
      tela = `<h3 tabindex="-1" class="celular__titulo">Consulta agendada</h3>
        <p class="celular__apoio">${nomeDoServico(m.servico)} com ${esc(DADOS.profissionais.find((x) => x.id === m.profissional).nome)}, ${esc(formatarDia(dia, false))} às ${hhmm(m.hora)}.</p>
        <p class="celular__nota">${m.dia === hoje.chave
          ? 'Ela já aparece na agenda da recepção: veja na aba “Como a recepção vê”, com o canal App.'
          : 'Ela entra na agenda da recepção desse dia, com o canal App.'}</p>
        <button type="button" class="acao acao--larga" data-ver-lembrete>Ver o lembrete</button>
        <button type="button" class="acao acao--larga" data-remarcar>Remarcar</button>
        <button type="button" class="acao acao--larga" data-cancelar-app>Cancelar</button>`;
    } else if (p.passo === 'lembrete') {
      const m = p.marcado;
      tela = `${voltar('agendado')}<div class="bloqueio">
          <p class="bloqueio__hora" aria-hidden="true">${esc(horaDoLembrete(m))}</p>
          <p class="bloqueio__notificacao"><strong>S-FrontDesk</strong> Você tem uma consulta ${esc(quandoNoLembrete(m))} na ${esc(DADOS.clinica.nome)}.</p>
        </div>
        <p class="celular__nota">A tela bloqueada não mostra o profissional nem a especialidade: só a consulta, a hora e a clínica.</p>`;
    } else if (p.passo === 'cancelado') {
      tela = `<h3 tabindex="-1" class="celular__titulo">Consulta cancelada</h3>
        <p class="celular__apoio">O horário voltou para a agenda da clínica.</p>
        <button type="button" class="acao acao--principal acao--larga" data-ir="servico">Agendar outra consulta</button>`;
    }
    painel.innerHTML = `
      <div class="paciente">
      <p class="paciente__nota"><strong>Experimente:</strong> agende para hoje e depois abra a aba “Como a recepção vê”. A consulta aparece lá, com o canal App.</p>
      <div class="celular">
        <p class="celular__barra"><span>${esc(DADOS.clinica.nome)}</span><span>${esc(DADOS.voceNoApp)} (você)</span></p>
        <div class="celular__tela" data-tela>${tela}</div>
      </div>
      </div>`;
    ligarPaciente(painel);
  }

  function ligarPaciente(painel) {
    const p = estado.paciente;
    const ir = (passo, mudancas = {}) => {
      estado.paciente = { ...estado.paciente, ...mudancas, passo };
      desenhar();
      painel.querySelector('[data-tela] h3')?.focus();
    };
    const em = (seletor, acao) => painel.querySelectorAll(seletor).forEach((b) => b.addEventListener('click', () => acao(b)));
    em('[data-ir]', (b) => ir(b.dataset.ir, b.dataset.ir === 'servico' && p.passo === 'cancelado' ? { remarcando: null } : {}));
    em('[data-escolher-servico]', (b) => ir('profissional', { servico: b.dataset.escolherServico }));
    em('[data-escolher-profissional]', (b) => ir('dia', { profissional: b.dataset.escolherProfissional }));
    em('[data-escolher-dia]', (b) => ir('horario', { dia: b.dataset.escolherDia }));
    em('[data-escolher-hora]', (b) => ir('confirmar', { hora: b.dataset.escolherHora }));
    em('[data-confirmar]', () => {
      const livres = horariosLivres(p.profissional, p.dia);
      if (!livres.includes(p.hora)) { anunciar('Esse horário acabou de ser ocupado. Escolha outro.'); ir('horario'); return; }
      if (p.remarcando) liberar(p.remarcando);
      const marcado = { servico: p.servico, profissional: p.profissional, dia: p.dia, hora: p.hora, chave: `${p.dia === hoje.chave ? 'hoje' : p.dia}|${p.profissional}|${p.hora}` };
      if (p.dia === hoje.chave) {
        estado.agenda[p.profissional][p.hora] = { estado: 'Agendado', paciente: DADOS.voceNoApp, servico: p.servico, canal: 'App' };
        estado.novo = `${p.profissional}|${p.hora}`;
      } else {
        estado.outrosDias[`${p.dia}|${p.profissional}|${p.hora}`] = true;
      }
      anunciar(p.remarcando ? 'Consulta remarcada.' : 'Consulta agendada.');
      ir('agendado', { marcado, remarcando: null });
    });
    em('[data-ver-lembrete]', () => ir('lembrete'));
    em('[data-remarcar]', () => ir('dia', { remarcando: p.marcado }));
    em('[data-cancelar-app]', () => {
      liberar(p.marcado);
      anunciar('Consulta cancelada. O horário voltou para a agenda.');
      ir('cancelado', { marcado: null });
    });
  }

  function liberar(marcado) {
    if (marcado.dia === hoje.chave) delete estado.agenda[marcado.profissional][marcado.hora];
    else delete estado.outrosDias[`${marcado.dia}|${marcado.profissional}|${marcado.hora}`];
  }

  // O lembrete (E-04): no máximo "Você tem uma consulta amanhã às 9h na Clínica X". Chega na véspera, ou
  // uma hora antes quando a consulta é hoje.
  function quandoNoLembrete(m) {
    const hora = horaFalada(m.hora);
    if (m.dia === hoje.chave) return `hoje às ${hora}`;
    const dia = dias.find((d) => d.chave === m.dia);
    return dia.indice === hoje.indice + 1 ? `amanhã às ${hora}` : `no dia ${dia.rotuloCurto} às ${hora}`;
  }
  function horaDoLembrete(m) {
    if (m.dia !== hoje.chave) return '18h00';
    const [h, min] = m.hora.split(':').map(Number);
    return `${String(h - 1).padStart(2, '0')}h${String(min).padStart(2, '0')}`;
  }

  // ── Utilidades ─────────────────────────────────────────────────────────────────────────────────
  function identificacao(p) {
    return `<span class="id-profissional"><span class="id-profissional__nome">${esc(p.nome)}</span>
      <span class="id-profissional__registro">${esc(p.palavra)} · ${esc(p.crm)}</span>
      <span class="id-profissional__registro">${esc(p.especialidade)} · ${esc(p.rqe)}</span></span>`;
  }
  function nomeDoServico(id) { return esc(DADOS.servicos.find((s) => s.id === id)?.nome ?? ''); }

  desenhar();
  app.hidden = false;
  raiz.classList.add('demo--pronta');
}

// Datas no fuso da clínica (E-06): "hoje" é o hoje de lá, não o do aparelho.
function dataNoFuso(fuso) {
  const partes = new Intl.DateTimeFormat('en-CA', { timeZone: fuso, year: 'numeric', month: '2-digit', day: '2-digit' }).format(new Date());
  return diaDe(new Date(`${partes}T12:00:00Z`), 0);
}
function diaDe(data, indice) {
  const chave = data.toISOString().slice(0, 10);
  const rotuloCurto = new Intl.DateTimeFormat('pt-BR', { timeZone: 'UTC', day: '2-digit', month: '2-digit' }).format(data);
  return { data, chave, indice, rotuloCurto };
}
function proximosDiasUteis(hoje, quantos) {
  const lista = [hoje];
  for (let passo = 1; lista.length < quantos; passo += 1) {
    const data = new Date(hoje.data.getTime() + passo * 86400000);
    if (data.getUTCDay() !== 0 && data.getUTCDay() !== 6) lista.push(diaDe(data, passo));
  }
  return lista;
}
function formatarDia(dia, longo) {
  const texto = new Intl.DateTimeFormat('pt-BR', {
    timeZone: 'UTC', weekday: longo ? 'long' : 'short', day: '2-digit', month: longo ? 'long' : '2-digit',
  }).format(dia.data).replace('.', '');
  return dia.indice === 0 && !longo ? `Hoje, ${texto}` : texto;
}
function hhmm(hora) { return hora.replace(':', 'h'); }
function horaFalada(hora) {
  const [h, min] = hora.split(':');
  return min === '00' ? `${Number(h)}h` : `${Number(h)}h${min}`;
}
function classe(situacao) {
  return situacao.normalize('NFD').replace(/[̀-ͯ]/g, '').toLowerCase();
}
function esc(valor) {
  return String(valor).replaceAll('&', '&amp;').replaceAll('<', '&lt;').replaceAll('>', '&gt;').replaceAll('"', '&quot;');
}
