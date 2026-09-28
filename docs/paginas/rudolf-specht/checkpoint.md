# Checkpoint — `rudolf-specht`

- **Estado (2026-09-28):** 3 opções construídas (Tinta, Noturno, Trilha) e a página de escolha (`index.html`),
  como proposta (`"proposta": true`, noindex, etiqueta "Proposta · em avaliação" no índice). Cada opção tem
  cabeçalho gerado e prévia de link própria (`imagens/social-opcao-N.jpg`). Conferência OAB feita
  (`conferencia-oab.md`); ferramentas estendidas (ADR-006, emenda de 2026-09-28; 50 testes verdes).
  Branch `pagina/rudolf-specht`, **commitada e não publicada**: o dono pediu para ver antes.
- **Verificação:** `npm run verificar:rascunhos` aprovado. Aviso de peso da pasta (1264 KB): é a soma das 3
  opções, das miniaturas e das prévias; cada página carrega só o que é dela. Decidido: aceito enquanto for
  proposta; o que sobrar depois da escolha sai da pasta.
- **Próximo passo concreto:** com o aval do dono, ff no `main`, push, apagar a branch e mandar ao Rudolf o
  link `https://ivanclay.github.io/landing/rudolf-specht/` junto do questionário
  (`entrada/adv-rudolf-mateus/questionario-enviar.md`).
- **Depois da escolha:** a opção escolhida vira `index.html`, `tema.css` e `pagina.css`; saem as outras
  opções, as miniaturas e as prévias. Ajustes do cliente; razão social e registro da sociedade na OAB/BA;
  `oabConferidaEm` (dono, no CNA); `aprovadoPeloEscritorioEm`; Lighthouse e NVDA (`qa.md`).
- **Não feito ainda:** Lighthouse das opções (fica para a escolhida) e leitor de tela.
