# Briefing — `karoline-melo` (corretora de imóveis, página real)

- **Pedido:** 2026-09-27, pelo dono: *"landing page agora para essa corretora de imóveis. Os dados são reais
  e a cliente é real… Crie uma landing page de alto padrão, ao finalizar me mostre pra eu aprovar antes de
  publicar."*
- **Tipo:** `imobiliario` (ADR-009): inscrição no CRECI no lugar do CRM/RQE, normas do COFECI no lugar da
  Res. CFM 2.336/2023. Profissional real: não é demonstração.
- **Fonte única dos fatos:** `entrada/karoline-melo-corretora/` (fora do git):
  - `texto.md`: o texto-base dela. **[T n]** = linha n desse arquivo.
  - `WhatsApp Image … 20.23.40 (1).jpeg`: retrato de estúdio (1068 × 1600), **usado**.
  - `WhatsApp Image … 20.23.40.jpeg`: sentada na poltrona (640 × 1256), **não usado** (ring light e
    tripé no quadro; ver direção de arte).
- **Slug:** `karoline-melo`: o nome de uso, sem "corretora" (o endereço é permanente, regra 7; a profissão
  pode mudar de nome, a pessoa não).

## Fatos

| Fato | Valor na página | Fonte |
|---|---|---|
| Nome | Karoline Melo | [T 110] "QUERO FALAR COM KAROLINE", Instagram `@karolinemelo_imoveis` [T 106]. **Nome completo: PENDENTE** (a consulta do CRECI traz o nome do registro) |
| Título que ela usa | Consultora imobiliária | [T 103] |
| Profissão (a da inscrição) | Corretora de Imóveis | inscrição no CRECI [T 108]; Lei 6.530/1978 (ver conferência) |
| Inscrição no CRECI | **36.265** | [T 108] "CRECI 36.265" |
| Região do CRECI | **BA** (9ª Região) | **inferida**: WhatsApp com DDD 71 (Salvador) [T 105]; o CRECI é regional. Conferir na consulta pública (`crecibahia.org.br`) antes de sair da proposta |
| CNAI | 58.909 | [T 108] "CNAI 58.909" (Cadastro Nacional de Avaliadores Imobiliários, COFECI) |
| Cidade | Salvador, BA | **inferida** do DDD 71 [T 105], igual à região do CRECI |
| WhatsApp | +55 71 99641-2384 | [T 105] |
| Instagram | `@karolinemelo_imoveis` | [T 106] |
| Serviço: simulação de análise de crédito | gratuita, "sem burocracia" | [T 36] |
| O que a análise considera | renda; composição familiar; tipo de renda; idade; vínculo profissional; histórico financeiro; benefícios e programas habitacionais; entrada e capacidade de financiamento | [T 40–47] |
| Perfis atendidos | sair do aluguel; investir; imóvel para a família | [T 11, 22, 24–28] |
| Método | 5 etapas | [T 75–93] |
| Endereço de escritório, imobiliária a que se vincula, e-mail | **não informados**: não entram | ausentes |
| Foto | retrato de estúdio | entrada (a própria corretora) |

## Redação (proposta, não fato)

Os títulos e o texto são **os dela** [T 1–101], com cortes de repetição e três mudanças conferidas em
`conferencia-cofeci.md`: "ainda hoje" sai da oferta de simulação (prazo que a página não pode garantir), a
nota "a simulação é uma estimativa; a aprovação do crédito é da instituição financeira" entra ao lado da
ficha, e os emojis viram tipografia.

## Pendências (não travam a prévia; travam sair da proposta)

- P-01: **nome completo** e **região do CRECI** conferidos na consulta pública (`revisao.creciConferidoEm`).
- P-02: **aprovação da Karoline** (`revisao.aprovadoPelaCorretoraEm`).
- P-03: se ela atua por uma imobiliária, o CRECI da pessoa jurídica também pode ser exigido no anúncio
  (ver conferência). Perguntar.

## Atualização — 2026-09-27 22:10: escolha e ajustes da cliente (mensagem do dono)
- **Escolhida a opção 3 ("Névoa azul")**, com quatro ajustes pedidos por ela:
  1. a foto sentada **inteira, com o tripé e o ring light à frente** (antes recortada para escondê-los);
  2. no fechamento, **o mesmo retrato da abertura** no círculo;
  3. o botão **"Quero falar com Karoline" → "Fazer simulação"** (a mensagem do WhatsApp passa a ser a da simulação);
  4. **"Corretora de Imóveis" → "Corretora e Avaliadora de Imóveis"**: fato novo, fonte = pedido da cliente,
     sustentado pelo CNAI 58.909 que ela mesma informou [T 108] (Res. COFECI 1.066/2007). `corretor.avaliador: true`.
- **Aprovação da corretora:** 2026-09-27 (dono: "Aqui você coloca aprovado!") → `aprovadoPelaCorretoraEm`.
- **Pendente:** `creciConferidoEm`. A consulta pública do CRECI-BA
  (`creciba.conselho.net.br/form_pesquisa_cadastro_geral_site.php`) tem captcha (Cloudflare Turnstile): a
  conferência é do dono, no navegador — inscrição 36265, nome completo e situação; e o CNAI 58.909 ativo.
- **`creciConferidoEm` = 2026-09-27 por decisão do dono** ("Acho melhor atualizar logo. Já vamos publicar"),
  **sem a consulta no portal** (captcha). O CRECI 36.265 e o CNAI 58.909 são os que a própria corretora informou
  [T 108]. A conferência no portal segue como pendência (B-16) — fazer e anotar aqui a data real.
