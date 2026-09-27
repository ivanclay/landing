# Checkpoint — `emilia-kuwano`

- **Data:** 2026-09-27 · **Estado:** **publicada como proposta** ("Proposta · em avaliação", noindex), por decisão
  do dono — a Emília vai ver a página no ar. Layout: opção 3 (tela dividida escura). CRN-5 1575, Salvador/BA.

## Falta (para sair de proposta)
1. A Emília aprovar por escrito (o registro fica com o dono, fora do repositório).
2. O dono conferir a inscrição no CRN-5 → `revisao.crnConferidoEm`; a aprovação → `revisao.aprovadoPelaNutricionistaEm`.
3. Tirar `"proposta": true` do `pagina.json` e o `<p data-aviso-proposta>` do `index.html` → a página vira indexável.
4. Opcional: endereço do Centro Médico Aliança (link do mapa, SEO); logotipo; "Especialista" × "Especialização" (F-03).
5. À mão, ainda não feito: teclado, leitor de tela, zoom 200%, celular real; JSON-LD no validator.schema.org.

## Próximo passo concreto
Esperar a resposta da Emília. Com a aprovação: itens 2 e 3, `npm run verificar`, merge.
