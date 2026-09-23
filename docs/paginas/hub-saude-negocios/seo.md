# SEO — Hub Saúde Negócios (`hub-saude-negocios`) · PROPOSTA

- Data: 2026-09-22. `noindex, nofollow` enquanto for proposta (ADR-005): não compete com o domínio
  oficial. Aprovada, a flag sai e a página fica indexável — ou vai para o domínio próprio.

| Peça | Valor |
|---|---|
| `<title>` | Hub Saúde Negócios — consultoria em gestão, inovação e negócios de saúde |
| description / `og:description` | igual ao `resumo` (141 caracteres) |
| `og:image` + `secure_url`, `type`, 1200×630, `alt`, `twitter:image` | `imagens/social.jpg`: painel verde com o nome + busto da Carla (foto do site oficial) |
| `og:site_name` | "Médicos" (título do índice — B-07, com a D-02) |
| canonical | https://ivanclay.github.io/landing/hub-saude-negocios/ |
| JSON-LD | `ProfessionalService`: nome, slogan, descrição, telefone, logo, imagem, `areaServed` Brasil, `knowsAbout` (6 temas), `founder` Carla Rodrigues, `hasOfferCatalog` com os 5 serviços, `sameAs` site oficial |

## Para ranquear, depois da aprovação
- Domínio próprio: o `hubsaudenegocios.com.br` apontando para esta página (ou esta página substituindo o
  WordPress).
- Perfil da Empresa no Google; Instagram e LinkedIn em `redes` (entram no `sameAs`).
- Tirar do ar a página antiga duplicada e o "Hello world" do WordPress, que hoje competem no Google.

JSON-LD conferido estruturalmente; **não** colado no validator.schema.org nesta sessão.
