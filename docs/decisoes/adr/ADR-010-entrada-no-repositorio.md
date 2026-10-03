# ADR-010 — A pasta `entrada/` entra no repositório

- **Data:** 2026-10-03 · **Estado:** aceito (pedido do dono: *"quero que entrada seja incluído no repo"*; avisado
  de que o repositório é público, escolheu *"tudo, inclusive as fotos"*)

## Contexto
`entrada/` guarda o que cada cliente manda (foto original, logotipo, texto, respostas do questionário, pendências).
Até aqui ficava fora do git (`.gitignore`), porque os originais são pesados e podem ter EXIF com GPS, e o
repositório `ivanclay/landing` é **público**.

## Decisão
`entrada/` passa a ser versionada inteira. Continua **fora do ar**: a construção só lê `site/`, e o que vai para
`_site/` sai de `npm run imagens`, sem metadados.

Conferido na entrada (2026-10-03): 217 arquivos, 92 MB, nenhum acima de 20 MB, 110 fotos com EXIF e **nenhuma**
com a marca GPS (leitura do EXIF com `sharp`).

## Consequências
- Tudo o que entra em `entrada/` fica **público e permanente** no histórico do git: apagar depois não tira do
  histórico. Telefones, e-mails e fotos originais dos clientes ficam visíveis no GitHub.
- Antes de commitar algo novo em `entrada/`: foto sem GPS; nada de RG, diploma, contrato, print de conversa ou
  dado de saúde (`seguranca-privacidade-landing`, item 5).
- O repositório cresce ~92 MB; foto nova acima de 50 MB recebe aviso do GitHub, acima de 100 MB é recusada.

## Alternativas
- **Só os textos (.md)**: menos exposição, recusada pelo dono.
- **Repositório privado à parte para `entrada/`**: separa o dado do cliente do código público, recusada pelo dono.
