# Checkpoint — `emilia-kuwano`

- **Data:** 2026-09-27 · **Estado:** layout escolhido pelo dono (opção 3, tela dividida escura); CRN-5 1575 aplicado;
  **esperando a aprovação da Emília** e as datas de `revisao` pelo dono. Nada foi publicado. Branch `pagina/emilia-kuwano`.

## Feito
- ADR-008 (tipo `nutricao`, CRN, piso do CFN, JSON-LD) com 8 testes; 25/25 passando.
- Briefing com a fonte de cada fato; conferência CFN (preços retirados — art. 57); plano de arte; página
  construída; SEO; QA (Lighthouse 97/100/100, 0 rolagem de 320 a 1920 px).
- Primeira versão recusada; três layouts novos montados; escolhida a opção 3. Ícones de WhatsApp e e-mail em
  todos os botões, inclusive a barra do celular (pedido do dono).

## Falta
1. ~~Escolha do layout~~ — feito: opção 3 (direcao-de-arte.md). O CRN **não está** em nenhum arquivo da
   entrada (texto, fotos, metadados); o `.md` cita um cartão digital em PDF que não veio na pasta.
2. ~~**CRN**~~ — feito: CRN-5 1575 (mensagem do dono). Era: (número e Regional) → `pagina.json › nutricionista.crn` + as linhas "CRN PENDENTE" do
   `index.html` (sobre o retrato e no rodapé).
3. Cidade/endereço do Centro Médico Aliança (opcional, mas melhora contato e SEO) → `locais[0].endereco`,
   link do mapa, título.
4. Logotipo, se ela quiser; Instagram, se houver.
5. Teclado, leitor de tela, zoom 200%, celular real (qa.md).
6. As três datas de `revisao` **pelo dono**, depois da aprovação por escrito da Emília → `publicar: true`.

## Próximo passo concreto
O dono confere a inscrição no CRN-5, a Emília aprova a página por escrito, e o dono preenche as três
datas de `revisao` + `publicar: true` → merge → no ar.
