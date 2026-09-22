# SEO local — `dr-paulo-de-tarso` (DEMONSTRAÇÃO)

- Data: 2026-09-22. **A página é `noindex, nofollow` por construção (ADR-004)**: o SEO está completo
  para servir de **modelo**, não para ranquear.

| Peça | Valor | Onde |
|---|---|---|
| `<title>` | Demonstração — Dr. Paulo de Tarso, cardiologista em São Paulo | `index.html` |
| meta description / `og:description` | igual ao `resumo` (132 caracteres, com "Demonstração") | `pagina.json` |
| canonical / `og:url` | https://ivanclay.github.io/landing/dr-paulo-de-tarso/ | gerado (`seo.mjs`) |
| `og:image` (+ `secure_url`, `type`, `width` 1200, `height` 630, `alt`, `twitter:image`, `og:site_name`) | `imagens/social.jpg`: busto do retrato, 1200×630, 62 KB | gerado |
| robots | `noindex, nofollow` | gerado (demonstração) |
| sitemap e índice | **fora** | gerado (demonstração) |
| JSON-LD | `Physician` com CRM-SP, telefone, endereço do consultório, quatro `hospitalAffiliation` com endereço, `paymentAccepted` | gerado |

## JSON-LD
Conferido **estruturalmente** no construído (tipos e campos do schema.org). Nesta revisão, campo vazio
passou a ser omitido (`postalCode: ""` saía no consultório; corrigido em `ferramentas/lib/seo.mjs`).
**Não foi colado no validator.schema.org nesta sessão**; numa página real, isso é obrigatório antes do PR
(regra 13).

## Prévia no WhatsApp
A prévia mostra título, descrição e imagem. Título e descrição começam com "Demonstração", porque o
aviso do topo não aparece na prévia.

## Perfil da Empresa no Google
Numa página real: nome, endereço e telefone iguais aos do perfil. Numa demonstração, **não se cria
perfil**.
