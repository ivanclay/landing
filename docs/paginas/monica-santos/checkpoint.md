# Checkpoint — `monica-santos`

- **Estado (2026-10-03 18:55) — PAUSADO aguardando a resposta da cliente.**
  No ar como **proposta** (noindex, fora do sitemap, só por link): `https://ivanclay.github.io/landing/monica-santos/`
  — a página de escolha e as 3 opções (**Pérola**, **Orla**, **Planta**). WhatsApp **fictício** +55 20 90000-0000
  (DDD inexistente), por decisão do dono. Commits `994fcb2`, `edb27b1` no `main`; branch apagada.
- **Mensagem enviada/a enviar à cliente:** `entrada/cor-monica-santos/pencencias.md` (WhatsApp, Instagram, e-mail,
  nome completo do CRECI, UF do CRECI, instituição da correspondência bancária, imobiliária/CRECI-J, opção escolhida).
- **Próximo passo concreto (quando ela responder):** guardar a resposta em `entrada/cor-monica-santos/`; trocar o
  número em `site/monica-santos/pagina.json` e `sed -i 's#wa.me/5520900000000#wa.me/55DDDNUMERO#g' site/monica-santos/opcao-*.html`;
  Instagram/e-mail se vierem (`redes.instagram`, `contato.email`); briefing atualizado com a fonte;
  a opção escolhida vira `index.html`, `tema.css`, `pagina.css` (saem as outras, as miniaturas e `capturas/topo-*`);
  ajustes dela; `npm run verificar`; commit, merge, push (Claude publica).
- **Depois:** `creciConferidoEm` (dono, no CRECI-BA, tem captcha); `aprovadoPelaCorretoraEm`; Lighthouse e NVDA (`qa.md`).
- **Registro:** pausado (`metricas/.registro-snapshot.json`); retomar com `registro-implementacao-landing` modo `retomar`.
