# Checkpoint — `monica-santos`

- **Estado (2026-10-03 18:12):** 3 opções construídas (**Pérola**, **Orla**, **Planta**) e a página de escolha
  (`index.html`), como proposta (`proposta: true`) e **rascunho** (`publicar: false`): o WhatsApp é `PENDENTE`
  (o contrato aceita só em rascunho; teste novo em `imobiliario.test.mjs`). Branch `pagina/monica-santos`,
  commitada, **não publicada** — o CI reprovaria pelo `PENDENTE`, de propósito.
- **Atualização (2026-10-03):** por decisão do dono, WhatsApp **fictício** +55 20 90000-0000 (DDD inexistente) e
  `publicar: true`, ainda como proposta. `npm run verificar` aprovado. Commitado na branch; o merge no `main` e o push
  foram barrados pela permissão automática (é deploy) e ficaram com o dono.
- **Próximo passo concreto:** publicar (merge no `main`, push, apagar a branch). Quando o número real chegar:
  trocar em `pagina.json` e `sed -i 's#wa.me/5520900000000#wa.me/55DDDNUMERO#g' site/monica-santos/opcao-*.html`;
  Instagram/e-mail se vierem; `npm run verificar`; publicar de novo.
- **Depois da escolha:** a opção vira `index.html`, `tema.css`, `pagina.css`; saem as outras, as miniaturas e
  `capturas/topo-*`. Ajustes da cliente; `creciConferidoEm` (dono, no CRECI-BA); `aprovadoPelaCorretoraEm`;
  Lighthouse e NVDA (`qa.md`).
