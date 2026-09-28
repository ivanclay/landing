# Checkpoint — `karoline-melo`

- **Estado:** rascunho pronto (`publicar: false`), **esperando a aprovação do dono** para publicar.
- **Feito:** ADR-009 (tipo `imobiliario`, CRECI, piso do COFECI, `RealEstateAgent`, 12 testes); briefing;
  conferência COFECI; plano de arte "prancha da consultora"; página, imagem social, favicon; QA (Lighthouse
  98–99/100/100/69, LCP 2,1 s).
- **Falta:** (1) o "aprovado" do dono; (2) decidir como sai: **proposta** (`"proposta": true` +
  `conferenciaCofeciEm` + aviso no topo, como a emilia-kuwano) ou definitiva (precisa de `creciConferidoEm`
  e `aprovadoPelaCorretoraEm`); (3) conferir nome completo, região e CNAI na consulta do CRECI-BA
  (bloqueou acesso automatizado); (4) NVDA e teste dos links num celular.
- **Próximo passo concreto:** com o "aprovado", preencher `revisao.conferenciaCofeciEm: "2026-09-27"`,
  `publicar: true` e o modo escolhido; `npm run verificar`; commit; ff no `main`; push; apagar a branch.
