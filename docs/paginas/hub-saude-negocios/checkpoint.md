# Checkpoint — `hub-saude-negocios` · PAUSADO em 2026-09-22

## Estado
**Proposta no ar** (ADR-005): https://ivanclay.github.io/landing/hub-saude-negocios/ — `noindex`, aviso
"não é o site oficial", listada na raiz em "Demonstrações e propostas". Imagem de prévia (Open Graph) no
modelo painel verde + foto, validada pelo dono no WhatsApp.

## Feito
- Levantamento do site oficial (fonte de todos os fatos) → `briefing.md`.
- Tipo de página `negocio` e modo `proposta` nas ferramentas, com testes (ADR-005).
- Página, direção de arte, conferência de conteúdo, SEO, QA (Lighthouse 99/100/100/69 — o 69 é o
  `noindex`), origem das imagens, autorizações (nenhuma).

## Falta
1. **Respostas da Carla** às 6 perguntas (B-06 no backlog; a mensagem pronta foi entregue ao dono em
   2026-09-22): agrupamento e identidade de ICESP, MV, FIDI, L2D, TL2, IQG; autorização de logotipos;
   profissão/registro; contatos (e-mail, redes, CNPJ); base dos números; domínio.
2. Com a aprovação: tirar `"proposta"` e o aviso, preencher `revisao.aprovadoPeloClienteEm`, decidir o
   endereço (domínio próprio → D-01 / `urlBase`, ou ficar aqui indexável).
3. Conferências à mão (B-04): leitor de tela, zoom 200%, Tab, JSON-LD no validator.schema.org.

## Próximo passo concreto
Quando o dono trouxer as respostas: atualizar `briefing.md` (fonte = mensagem da Carla, com data) →
`index.html` (grupos, nomes, contatos) → `pagina.json` → `npm run verificar` → commit, ff no `main`, push.

## Arquivos
`site/hub-saude-negocios/` · `docs/paginas/hub-saude-negocios/` · originais em `entrada/hub-saude-negocios/` (fora do git).
