# Briefing — `monica-santos` (corretora de imóveis, página real)

- **Pedido:** 2026-10-03, pelo dono: *"quero que crie a landing page da monica santos. Me entregue 1 página
  principal com 3 opções para a cliente escolher."* Sobre o contato que falta: *"construa com as pendências e
  me dê no final um texto solicitando os dados faltantes."*
- **Tipo:** `imobiliario` (ADR-009), como proposta (`proposta: true`). Profissional real: não é demonstração.
- **Fonte única dos fatos:** `entrada/cor-monica-santos/` (fora do git):
  - `text.md`: o texto "Sobre mim" dela. **[T n]** = parágrafo n (1 = "Sou Mônica Santos…").
  - `img/image.png`: retrato (1024 × 1536), blazer preto, blusa branca, brincos de pérola; fundo de
    escritório com ripado de madeira e planta. **Usado** nas três opções.
- **Slug:** `monica-santos` (nome de uso; o endereço é permanente, regra 7).

## Fatos

| Fato | Valor na página | Fonte |
|---|---|---|
| Nome | Mônica Santos | [T 1] e assinatura. **Nome completo: PENDENTE** (o do registro no CRECI) |
| Profissão | Corretora de Imóveis | [T 1] e assinatura |
| Inscrição no CRECI | **37.685** | [T 1] "CRECI 37685" (pontuado como no padrão do contrato) |
| Região do CRECI | **BA** (9ª Região) | **inferida** da atuação em Salvador [T 1]; conferir na consulta pública do CRECI-BA |
| Área de atuação | Salvador e Região Metropolitana | [T 1] |
| O que comercializa | imóveis avulsos, imóveis na planta, lançamentos imobiliários | [T 1] |
| Para quê | morar, investir, conquistar o primeiro patrimônio | [T 2] |
| Crédito | crédito e financiamento habitacional, **como correspondente bancária** | [T 3] e assinatura. **Instituição: PENDENTE** (não entra até ela dizer) |
| Modalidades | Minha Casa, Minha Vida (MCMV), SBPE, uso do FGTS | [T 3] |
| Propósito | acompanhar de forma transparente, da escolha do imóvel às etapas de crédito e financiamento | [T 4] |
| **WhatsApp** | **PENDENTE** | ausente. Trava a publicação (`contato.whatsapp: "PENDENTE"` só vale em rascunho) |
| Instagram, e-mail, telefone fixo | não informados: **não entram** | ausentes |
| Endereço, imobiliária, CRECI-J | não informados: não entram | ausentes |
| Foto | o retrato da entrada | a própria corretora |

## Redação (proposta, não fato)
Texto em `texto.md`, construído sobre as frases dela, conferido em `conferencia-cofeci.md`. As explicações
curtas de MCMV, SBPE e FGTS são redação de caráter geral, sem condição, taxa ou prazo.

## Pendências
- P-01 **WhatsApp** (obrigatório): trava publicar. Nas três opções o botão aponta para `wa.me/PENDENTE`.
- P-02 **Instagram** e **e-mail** (opcionais): entram se ela quiser.
- P-03 **Nome completo** e **região do CRECI** conferidos na consulta pública (`revisao.creciConferidoEm`, dono).
- P-04 **Instituição** de que é correspondente bancária (opcional na página; se entrar, com o nome exato).
- P-05 Se atua por uma imobiliária, o CRECI-J dela também pode ser exigido no anúncio (Res. 458/1995, art. 2º).
- P-06 **Escolha da opção** e **aprovação da Mônica** (`revisao.aprovadoPelaCorretoraEm`).
