---
name: seguranca-privacidade-landing
description: 'Revisa segurança e privacidade de um site estático de páginas médicas: nenhum recurso de terceiros (script, fonte, imagem, iframe, pixel, analytics), nenhum formulário ou coleta de dado de saúde, links externos com rel noopener e só https/tel/mailto, metadados EXIF (GPS) removidos das fotos, nada sensível no repositório (documento do médico, print de conversa, original de foto), o workflow do GitHub Actions com permissões mínimas, e o texto de privacidade do rodapé coerente com o que a página faz (LGPD). Classifica achados por severidade; Crítico e Alto bloqueiam o merge. Use antes de todo PR de página, ao mexer no workflow, ao cogitar analytics, pixel, formulário, chat ou embed, e em perguntas como "posso colocar o Google Analytics?", "posso pôr um formulário?", "isso é seguro?", "e a LGPD?".'
---

# Segurança e privacidade — o site que não sabe nada de ninguém

Um site estático sem servidor, sem formulário e sem terceiros tem uma superfície de ataque pequena e
uma política de privacidade de uma linha. Seu trabalho é **manter** assim — e dizer o custo real
quando alguém quiser mudar.

## Perfil (leia primeiro)

`CLAUDE.md` — regras **5** (não coleta), **6** (nada de terceiros), **12** (imagem) e a capacidade
`rastreamento = OFF`.

## Checagens

| # | O quê | Como | Severidade se falhar |
|---|---|---|---|
| 1 | Recurso de terceiros | `npm run verificar` (reprova `src`/`href` de fora) + leitura do CSS por `@import`/`url()` | Alta |
| 2 | Formulário, campo, embed | `verificar.mjs` reprova `form`, `iframe`, `embed`, `object` | Alta |
| 3 | Links externos | `rel="noopener"` em `_blank`; só `https:`, `tel:`, `mailto:` (verificado) | Média |
| 4 | EXIF/GPS nas fotos | `npx --yes exifr site/<slug>/imagens/*.jpg` ou `exiftool` — **nenhum** GPS; `npm run imagens` já remove | Alta |
| 5 | Arquivo sensível no git | `git ls-files` — nada de `entrada/`, RG, diploma, print de conversa, contrato, planilha de pacientes | Crítica |
| 6 | Mensagem pré-preenchida do WhatsApp | não pede sintoma, exame nem dado de saúde | Média |
| 7 | Workflow | `permissions` mínimas por job; ações oficiais `actions/*` fixadas em versão maior; nenhum segredo; nada de `pull_request_target` | Alta |
| 8 | Proteção do `main` | revisão obrigatória, status check `verificar`, sem push direto (conferir em Settings, com o dono) | Média |
| 9 | Texto de privacidade | o rodapé diz a verdade: sem cookies, sem coleta; o contato é pelo serviço que o paciente escolhe | Média |
| 10 | Dados do médico | só o que ele quer público: telefone do consultório, não o pessoal, se ele assim decidir; endereço de consultório, não residencial | Alta |

⌗ **GitHub Pages não permite cabeçalho HTTP** (CSP, HSTS…). CSP por `<meta http-equiv>` é possível,
mas a garantia real aqui é **não haver** terceiro — e isso o CI confere. Se um dia houver domínio
próprio atrás de um proxy (D-01), CSP por cabeçalho entra por ADR.

## Quando pedirem para ligar algo

| Pedido | Custo real | Caminho |
|---|---|---|
| Google Analytics / Meta Pixel | cookie e transferência de dado a terceiro → banner de consentimento, aviso de privacidade completo, e o Pixel em página de saúde pode inferir condição de saúde (dado sensível) | ADR; considere contagem sem cookie e sem dado pessoal (ex.: servidor próprio de estatística agregada) |
| Formulário de contato | precisa de terceiro (Formspree, Google Forms…); colhe dado, provavelmente de saúde; exige base legal, aviso, retenção | Não. WhatsApp e telefone resolvem (regra 5) |
| Mapa embutido | carrega Google, com cookie, na abertura da página | Link "Ver no mapa" |
| Vídeo do YouTube | idem | Link, ou vídeo local leve se o médico tiver os direitos |
| Chat/robô de atendimento | script de terceiro com acesso à página e à conversa | ADR, e em geral não |

## Registro

Achados `SEC-NNN` em `docs/paginas/<slug>/seguranca.md` (ou `docs/decisoes/` se for do repositório):
severidade, local, impacto, correção, status.

## Definição de pronto

- [ ] As dez checagens feitas; nenhuma Crítica ou Alta em aberto.
- [ ] Fotos sem GPS; nenhum arquivo sensível versionado.
- [ ] O que alguém quis ligar e não foi: registrado com o custo.
