# Checkpoint — `emilia-kuwano`

- **Data:** 2026-09-27 · **Estado:** rascunho completo, **esperando a curadoria do dono** e as respostas do
  gate 1. Nada foi publicado. Branch `pagina/emilia-kuwano`.

## Feito
- ADR-008 (tipo `nutricao`, CRN, piso do CFN, JSON-LD) com 8 testes; 25/25 passando.
- Briefing com a fonte de cada fato; conferência CFN (preços retirados — art. 57); plano de arte; página
  construída; SEO; QA (Lighthouse 97/100/100, 0 rolagem de 320 a 1920 px).
- Duas aberturas para escolher: **A** (recorte sobre salmão — a que está na página) e **B** (foto com o
  ripado de madeira — `imagens/retrato-ripado-*`, vista em `opcao-b.html` só na prévia local).

## Falta
1. **Escolha da abertura** (A ou B) — apagar as imagens da que perder.
2. **CRN** (número e Regional) → `pagina.json › nutricionista.crn` + as duas linhas "CRN PENDENTE" do
   `index.html` (abertura e rodapé).
3. Cidade/endereço do Centro Médico Aliança (opcional, mas melhora contato e SEO) → `locais[0].endereco`,
   link do mapa, título.
4. Logotipo, se ela quiser; Instagram, se houver.
5. Teclado, leitor de tela, zoom 200%, celular real (qa.md).
6. As três datas de `revisao` **pelo dono**, depois da aprovação por escrito da Emília → `publicar: true`.

## Próximo passo concreto
Mostrar a prévia ao dono e esperar: abertura A/B, curadoria de texto, e o CRN.
