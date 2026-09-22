---
name: qa-landing
description: 'QA das páginas estáticas de médico: prova, com número e evidência, que a página cumpre o orçamento da regra 11 — Lighthouse no celular (performance, acessibilidade, boas práticas, SEO, LCP, CLS), WCAG 2.2 AA na mão (teclado, foco, leitor de tela, zoom 200%, contraste), larguras de 320 a 1920 px, a página sem JavaScript, os links de contato abrindo o app certo no celular, e o índice listando a página. Confere o CONSTRUÍDO em _site/, não o fonte. Registra tudo em docs/paginas/<slug>/qa.md com data e comando, e reprova com pendência clara quando não conseguiu verificar. Use antes de todo PR de página, depois de mudança em site/assets/, e em pedidos como "testa a página", "passa no Lighthouse?", "está acessível?", "funciona no celular?".'
---

# QA — a página, medida

Você não confia em "deve estar bom". Você constrói, abre, mede e anota. Quando uma verificação não
pôde ser feita (sem navegador, sem celular), a página **não** é aprovada nela — a pendência vai
escrita para o dono.

## Perfil (leia primeiro)

`CLAUDE.md` — regras **9**, **11** e **13**. O orçamento está na regra 11; aqui está o como.

## Roteiro (tudo em `_site/`, construído com `npm run rascunhos` ou `npm run construir`)

### 1. Automático
- `npm run verificar:rascunhos` — **verde**. Avisos lidos e passados para a conferência CFM ou
  resolvidos.
- **Lighthouse, celular**, na página servida (`npm run servir`):
  `npx --yes lighthouse http://localhost:4173/<slug>/ --form-factor=mobile --screenEmulation.mobile --throttling-method=simulate --only-categories=performance,accessibility,best-practices,seo --output=json --output-path=docs/paginas/<slug>/lighthouse.json --chrome-flags="--headless"`
  Anote as quatro notas, LCP, CLS e TBT. **Três execuções**, vale a mediana (Lighthouse varia).
  ⌗ Não comite o JSON se passar de 500 KB; anote os números no `qa.md` e descarte.

### 2. Larguras
360, 390, 768, 1024, 1440, 1920 px — e **320 px**, o limite. Nenhuma rolagem lateral, nenhum texto
cortado, o botão de contato visível sem rolar no celular. Capturas com Playwright, se houver.

### 3. Teclado e foco
Tab do começo ao fim: o "Ir para o conteúdo" aparece primeiro; o foco é **sempre** visível; a ordem
segue a leitura; nada de armadilha; `details` abre com Enter/Espaço.

### 4. Leitor de tela
NVDA (Windows) ou TalkBack (Android): o `h1` faz sentido sozinho; a lista de títulos (`H`) conta a
página; links dizem para onde vão ("Marcar pelo WhatsApp", não "clique aqui"); imagem com `alt` útil;
a identificação CFM é lida inteira.

### 5. Zoom e preferência
Zoom 200% sem perda; texto aumentado no sistema; **modo escuro do sistema** não quebra nada (a página
tem o próprio tema — confirme que nenhum componente herda cor do sistema); `prefers-reduced-motion`
desliga o movimento.

### 6. Sem JavaScript
Desligue JS: todo conteúdo aparece, todo contato funciona, nada fica em branco.

### 7. No celular de verdade
WhatsApp abre com a mensagem certa **para o número certo**; `tel:` abre o discador com o número
certo; mapa abre o lugar certo. Declare o aparelho.

### 8. Índice e endereço
A página aparece no índice (quando `publicar: true`), com nome, especialidade e cidade corretos; a
busca a encontra por nome, especialidade e cidade, **com e sem acento**. Redirecionamentos, se
houver, levam ao destino.

## Registro — `docs/paginas/<slug>/qa.md`

Data · commit · ambiente (navegador, versão, aparelho) · os números do Lighthouse (mediana de 3) · o
resultado de cada item acima · o que **não** foi verificado e por quê · parecer: **aprovado** ou
**reprovado com pendências**.

## Definição de pronto

- [ ] Verificação automática verde.
- [ ] Lighthouse no orçamento da regra 11, mediana de 3, com o comando anotado.
- [ ] Larguras, teclado, leitor de tela, zoom, sem-JS e celular real registrados — ou a pendência
      escrita.
- [ ] Parecer explícito.
