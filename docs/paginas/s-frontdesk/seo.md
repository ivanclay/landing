# SEO e prévia social: S-FrontDesk (`s-frontdesk`)

- **Data:** 2026-09-23 · conferido **no construído** (cópia temporária do `ivanclay/landing` @ `de88cdc`, construção
  com publicação simulada) por `ferramentas/entrega/checar-entrega.mjs`.
- **Endereço:** `https://ivanclay.github.io/landing/s-frontdesk/` (D-L01, pasta decidida no gate 1).
- **Indexação:** `negocio` comum (gate 1, P8). Enquanto `publicar: false`, a construção de lá põe `noindex, nofollow`
  (rascunho). Publicada, fica **indexável** e entra no sitemap. Não existe modo "prévia com noindex" para página
  de produto próprio no formato de lá (ver `docs/entrega/contrato-landing.md`).

| Peça | Valor | Quem escreve |
|---|---|---|
| `<title>` | S-FrontDesk — agenda para clínicas médicas, em pré-lançamento (61 caracteres) | página |
| `meta description` = `og:description` = `resumo` | "S-FrontDesk, em pré-lançamento: agenda da recepção e agendamento pelo paciente num só lugar. Veja a demonstração e seja clínica piloto." (135) | página / `pagina.json` |
| `og:title` | igual ao `<title>` | página |
| `theme-color` | `#f5f5ef` (papel) | página |
| `link rel=icon` | `favicon.svg` (a pauta, o marca-texto e a linha do agora) | página |
| `canonical` · `og:url` | `https://ivanclay.github.io/landing/s-frontdesk/` | construção de lá |
| `og:type` · `og:locale` | `website` · `pt_BR` | construção de lá |
| `og:image` · `og:image:secure_url` · `twitter:image` | `…/s-frontdesk/imagens/social.jpg?v=<hash de 8>` (absoluta, com versão) | construção de lá |
| `og:image:type` · `width` · `height` | `image/jpeg` · 1200 · 630 | construção de lá |
| `og:image:alt` | "S-FrontDesk — Agenda e atendimento para clínicas" (nome — `categoria`) | construção de lá |
| `twitter:card` | `summary_large_image` | construção de lá |
| `og:site_name` | **não sai**: por decisão de lá (ADR-007), página de cliente não anuncia a Fábrica | — |
| JSON-LD | `ProfessionalService`: nome, url, descrição, telefone, imagem, `areaServed` Brasil | construção de lá |
| `robots` | `noindex, nofollow` como rascunho; nenhum depois de publicada | construção de lá |

## A imagem social

- `imagens/social.jpg`: **1200 × 630, 48 KB, JPEG sem metadados**, gerada por `ferramentas/entrega/imagem-social.mjs`
  (Chrome headless + sharp) a partir do `tema.css` e da fonte da página.
- Composição **tipográfica**: o nome em 168 px estreito, "Agenda e atendimento para clínicas e consultórios
  médicos", a régua de horários, a linha do agora às 09h40, o selo "Pré-lançamento" e "Veja a demonstração · seja
  clínica piloto". Nenhuma pessoa, nenhuma tela que finja ser real. Legível na miniatura do WhatsApp (o nome fica
  com cerca de 40 px numa prévia de 300 px).

## Limites do formato de lá (anotados, não resolvidos aqui)

- **JSON-LD `ProfessionalService`** descreve um serviço profissional, não um software. O ideal para o produto
  seria `SoftwareApplication` + `Organization` (perfil §5). Mudar isso é ADR **no `ivanclay/landing`**.
  O pedido está na nota de entrega, como sugestão.
- **Telefone no JSON-LD:** sai o WhatsApp do `pagina.json`, hoje o **fictício** `+5571999999999` (P2). Trocar o
  número antes de publicar corrige os dois.

## Checagem pós-deploy (na nota de entrega)

1. Abrir `https://ivanclay.github.io/landing/s-frontdesk/` e o índice: a linha "S-FrontDesk · Agenda e atendimento para
   clínicas · —" no painel "Produtos dos clientes".
2. **Facebook Sharing Debugger** (`https://developers.facebook.com/tools/debug/`): colar o endereço e clicar em
   "Extrair novamente" até aparecer a imagem 1200 × 630. O WhatsApp usa o mesmo cache do Facebook.
3. **LinkedIn Post Inspector** (`https://www.linkedin.com/post-inspector/`): inspecionar o endereço para renovar a
   prévia.
4. Mandar o link para si mesmo no WhatsApp: título, descrição e imagem.
5. Se a imagem mudar depois, a construção muda o `?v=`, e os passos 2 e 3 renovam a prévia.


## Publicação (2026-09-23, repositório ivanclay/landing)

O dono decidiu publicar sem número real: o WhatsApp passou a ser `+5520999999999`, com o **DDD 20, que não é atribuído no Brasil** (Anatel), para que o número não possa ter dono. O botão não leva a ninguém até o número real entrar. Aprovação do dono: `revisao.aprovadoPeloClienteEm = 2026-09-23`, `publicar: true`. O JSON-LD pega esse número. Trocar pelo real no `pagina.json` e nos 6 links do `index.html`.


## Imagem social (2026-09-23)

Refeita com o celular do app do paciente à direita. Depois do deploy: Facebook Sharing Debugger → "Extrair novamente" e LinkedIn Post Inspector, para o WhatsApp e o LinkedIn trocarem a prévia.
