# QA — `rudolf-specht`

## 2026-10-05 — opção 2 "Noturno" escolhida

- **Verificação:** `npm run verificar:rascunhos` — aprovada (os avisos restantes são de outras páginas).
- **Larguras (Playwright 1.x, Chromium, `_site/rudolf-specht/index.html`, `scrollWidth` = largura):**
  320 ✅ · 375 ✅ · 1440 ✅ · 1920 ✅ — capturas `capturas/pagina-375.png` e `capturas/pagina-1440.png`.
- **Visto:** no celular, o menu de seções rola na horizontal (comportamento da opção aprovada, "Contato" fica
  além da borda e aparece ao rolar); barra fixa com WhatsApp e e-mail, com ícone.
- **Pendente:** Lighthouse no celular (regra 11) e leitor de tela — antes de sair da proposta.
