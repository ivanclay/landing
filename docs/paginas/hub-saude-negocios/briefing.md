# Briefing — Hub Saúde Negócios (`hub-saude-negocios`) · PROPOSTA

- Pedido original: "você vai refazer o site desse hub de negócios da área de saúde. Como a regra do nosso
  site, ele será uma subrota /hub-saude-negocios — https://hubsaudenegocios.com.br/ … com as mesmas
  premissas" — dono, 2026-09-22.
- Estado: **proposta** (ADR-005) — no ar só com `noindex`, aviso no topo, fora do sitemap; na raiz, na
  seção "Demonstrações e propostas". Aguarda a aprovação do Hub (`revisao.aprovadoPeloClienteEm`).
- Tipo: **negócio** (consultoria em gestão e negócios de saúde). Não é página de médico: o site não
  informa CRM nem outro registro profissional, e a página não afirma nenhum.

## Fonte de todos os fatos
O **site oficial**, lido em 2026-09-22 (home vigente, página id 108, modificada em 27/02/2026):
`https://hubsaudenegocios.com.br/` — abreviado [H]. Onde a página antiga diverge, vale [H].
Página antiga (id 13): `https://hubsaudenegocios.com.br/landing-page-hubsaudenegocios/` — [A].

## Fatos

| Campo | Valor na página | Fonte |
|---|---|---|
| Nome | Hub Saúde Negócios | [H] (título e rodapé) |
| Sede | São Paulo, SP (só no índice) | dono, 2026-09-23: "A consultoria, a sede é em SP" |
| Slogan | Soluções especializadas em saúde | [H] |
| Título | "Elevamos o padrão do seu negócio em saúde." (sem "com melhores resultados": comparativo vago) | [H], editado |
| Proposta | concepção à escalabilidade de soluções em saúde | [H] |
| Experiência | **+20 anos**, saúde pública e privada | [H] (a [A] e o app Lovable dizem 21; ficou o número vigente) |
| Números | +20 anos · +3 mil profissionais impactados · +100 projetos realizados | [H] (contadores `data-to-value`); **alegações do site, sem fonte externa** |
| Serviços | Consultoria, Mentorias, Assessoria, Escalabilidade de negócios, Projetos — textos | [H], corrigidos ("Iniciativas organizadas") |
| Mentorias — público | gestores de saúde | [H] ([A] dizia "empreendedores de healthtechs") |
| Como funciona | 4 passos (necessidade, análise, produção sob medida, entrega) | [H], texto enxugado |
| Diferenciais | 4 (personalizado, integrado, comunicação, vivência) | [H]; "de 2 décadas" → "Duas décadas" |
| Com quem já trabalhou | 26 organizações, **só os nomes** | [H] ("Alguns Cases de sucesso") |
| Responsável | Carla Rodrigues; texto "Sobre" e as duas citações (1ª pessoa, dela) | [H] |
| Profissão / registro | **não informado** — a página não diz | [H] |
| WhatsApp | +55 11 93021-6938 | [H] |
| Resposta | "em até 24 horas" | [H] (alegação do site) |
| Endereço, e-mail, CNPJ, redes | **não há** no site — a página não inventa | [H] |

## Decisões de redação e de estrutura
- **Agrupamento das 26 organizações por setor** (ensino e pesquisa, hospitais e diagnóstico, gestão
  pública, organizações sociais e associações, empresas e tecnologia) é **proposta de redação** — o site
  lista sem grupos. A confirmar com o Hub, em especial:
  - **ICESP**: o logotipo do site é o do Centro Universitário ICESP (Brasília); o nome também é o do
    Instituto do Câncer do Estado de SP. Ficou em "Ensino e pesquisa" — **confirmar**.
  - **MV**: o arquivo do logotipo no site se chama `sigma` — **confirmar** que é a MV.
  - **FIDI**, **L2D**, **TL2**, **IQG**: classificados pelo nome — **confirmar**.
- O site não diz **o que** foi feito com cada organização nem **quando**: a página diz "com quem já
  trabalhamos", sem "case de sucesso" (não há case descrito).
- Logotipos das organizações: **fora** (regra 12, sem autorização) — `autorizacoes.md`.
- O texto "Sobre" é da Carla, em primeira pessoa, mantido quase literal.

## Perguntas para o Hub (antes de aprovar)
1. As 26 organizações: o agrupamento e os casos ICESP, MV, FIDI, L2D, TL2, IQG.
2. Há autorização para mostrar logotipos? De quais?
3. Carla quer a profissão/formação na página? (Se for profissional com conselho, o registro entra.)
4. Endereço, e-mail, CNPJ, Instagram, LinkedIn — algum deve aparecer?
5. Os números (+3 mil profissionais, +100 projetos) têm uma base que possa ser citada?
6. O site vai para o domínio próprio (hubsaudenegocios.com.br) ou fica aqui?

## Histórico
| Data | Mudança | Fonte |
|---|---|---|
| 2026-09-22 | Briefing aberto a partir do site oficial | [H], [A] |
