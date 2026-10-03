# Checkpoint — `monica-santos`

- **Estado (2026-10-03 18:12):** 3 opções construídas (**Pérola**, **Orla**, **Planta**) e a página de escolha
  (`index.html`), como proposta (`proposta: true`) e **rascunho** (`publicar: false`): o WhatsApp é `PENDENTE`
  (o contrato aceita só em rascunho; teste novo em `imobiliario.test.mjs`). Branch `pagina/monica-santos`,
  commitada, **não publicada** — o CI reprovaria pelo `PENDENTE`, de propósito.
- **Próximo passo concreto:** com o WhatsApp da Mônica, trocar `PENDENTE` em `pagina.json` (`contato.whatsapp`,
  E.164) e os `wa.me/PENDENTE` das três opções (`sed -i 's#wa.me/PENDENTE#wa.me/55DDDNUMERO#g' site/monica-santos/opcao-*.html`);
  Instagram/e-mail se vierem; `publicar: true`; `npm run verificar:rascunhos` verde; ff no `main`, push, apagar a
  branch; mandar o link `https://ivanclay.github.io/landing/monica-santos/` para a escolha.
- **Depois da escolha:** a opção vira `index.html`, `tema.css`, `pagina.css`; saem as outras, as miniaturas e
  `capturas/topo-*`. Ajustes da cliente; `creciConferidoEm` (dono, no CRECI-BA); `aprovadoPelaCorretoraEm`;
  Lighthouse e NVDA (`qa.md`).
