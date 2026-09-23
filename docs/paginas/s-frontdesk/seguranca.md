# Segurança e privacidade: S-FrontDesk (`s-frontdesk`)

- **Data:** 2026-09-23 · sobre o construído (`checar-entrega.mjs`, `qa-navegador.mjs`) e a pasta `entrega/s-frontdesk/`.

| # | Item | Resultado | Severidade |
|---|---|---|---|
| S1 | Recurso de terceiros (script, CSS, fonte, imagem, iframe) | nenhum: `verificar` de lá e as 12 requisições da carga, todas do próprio site | — |
| S2 | Formulário ou campo | nenhum `<form>`, `<input>`, `<select>` nem `<textarea>`, nem na página nem no que o `demo.js` desenha | — |
| S3 | Rede na demo | nenhuma API de rede no código (checagem) e 0 requisições em uso (navegador); funciona em modo avião | — |
| S4 | Armazenamento | nenhum `localStorage`, `sessionStorage` ou `indexedDB`; recarregar zera | — |
| S5 | Links externos | só `https://wa.me/…`, com `target=_blank` e `rel="noopener"` | — |
| S6 | Mensagem pré-preenchida do WhatsApp | "Olá! Vi a página do S-FrontDesk e quero saber como ser clínica piloto." Nenhum dado de saúde (E-04) | — |
| S7 | Metadados de imagem | `social.jpg` sai do sharp sem EXIF; `favicon.svg` é texto nosso | — |
| S8 | Dados reais na demo | nenhum: clínica, profissionais (000000), pacientes "Exemplo N" | — |
| S9 | Afirmações de privacidade | só o que as regras E-03, E-04, E-06 e E-07 dizem, marcadas como "regras de projeto… não certificações"; a página não diz "LGPD" | — |
| S10 | **Número de WhatsApp fictício** `+5571999999999` | pode pertencer a alguém real: publicada assim, a página mandaria interessados a um desconhecido | **Alto: bloqueia `publicar: true`**, não a entrega (decisão do dono, gate 1) |
| S11 | `innerHTML` na demo | todo texto passa por `esc()`; os dados são constantes nossas, nada vem da pessoa nem da URL | — |
| S12 | Licença da fonte | Instrument Sans, OFL-1.1; a licença vai em `fontes/_LICENCA-instrument-sans.txt` (o `_` a mantém fora do ar, como os arquivos de trabalho de lá) | — |


## Publicação (2026-09-23, repositório ivanclay/landing)

O dono decidiu publicar sem número real: o WhatsApp passou a ser `+5520999999999`, com o **DDD 20, que não é atribuído no Brasil** (Anatel), para que o número não possa ter dono. O botão não leva a ninguém até o número real entrar. Aprovação do dono: `revisao.aprovadoPeloClienteEm = 2026-09-23`, `publicar: true`. S10 resolvido: o número não pertence a ninguém.
