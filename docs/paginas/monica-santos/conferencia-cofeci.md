# Conferência COFECI — `monica-santos`

- **Data:** 2026-10-03 · **Quem:** tech lead (Opus), contra as normas já lidas na fonte para a
  `karoline-melo` (ver `docs/paginas/karoline-melo/conferencia-cofeci.md`: Lei 6.530/1978, art. 20, IV;
  Res. COFECI 458/1995, arts. 1º e 2º; Res. COFECI 326/1992, arts. 4º e 6º; CDC, arts. 30 e 37).
- **Texto conferido:** `texto.md` (comum às três opções).

## Identificação
| Onde | Texto | Parecer |
|---|---|---|
| Abertura e rodapé (`data-identificacao-creci`) | Mônica Santos · Corretora de Imóveis · CRECI-BA 37.685 | ✅ número precedido de "CRECI", pessoa física (sem "J"). UF "BA" **inferida** da atuação em Salvador (briefing P-03) |

## Frase a frase (as que pedem atenção)
| # | Frase | Risco | Decisão |
|---|---|---|---|
| C-01 | "imóveis avulsos, na planta e lançamentos" | anúncio de imóvel exige contrato de intermediação (Res. 458/1995, art. 1º) | ✅ são as **frentes** de atuação; nenhum imóvel, preço, endereço ou empreendimento é anunciado |
| C-02 | "Imóveis na planta — planejar a compra enquanto o empreendimento é construído" | promessa de valorização | ✅ nenhuma menção a valorização, rentabilidade ou desconto |
| C-03 | "Investir — imóveis escolhidos de acordo com o seu objetivo" | promessa de retorno (piso do COFECI) | ✅ sem retorno, renda ou valorização prometidos |
| C-04 | "ajudar na escolha do imóvel **ideal**" | superlativo? | ✅ frase dela [T 2]; qualifica a escolha do cliente, não a corretora. Não é autopromoção (art. 6º) |
| C-05 | "correspondente bancária" | a instituição não é dita | ✅ fato dela [T 3]; o nome do banco só entra quando ela informar (P-04) |
| C-06 | "buscando tornar o processo mais claro, organizado e **seguro**" | garantia? | ✅ frase dela, como esforço ("buscando"), não resultado |
| C-07 | MCMV, SBPE, FGTS com explicação | dado errado; condição implícita (CDC, art. 30) | ✅ descrição geral, sem taxa, prazo, subsídio ou elegibilidade |
| C-08 | Nota "A análise de crédito e as condições do financiamento são definidas pela instituição financeira." | omissão (CDC, art. 37, § 3º) | ✏️ **acrescentada**: orientação não se confunde com aprovação |
| C-09 | "transparência do começo ao fim" | promessa? | ✅ descreve o método dela [T 4] |
| C-10 | "Vamos conversar sobre o seu próximo imóvel?" | — | ✅ convite |

Sem superlativo, "nº 1", "imperdível", "últimas unidades", "aprovação garantida", "nome sujo" ou prazo.
O piso `termos-vedados-cofeci.json` roda no `verificar.mjs`.

## Avisos do CI
- `PENDENTE` nas páginas (WhatsApp): **reprova de propósito** até o número chegar (regra 1). Decidido: a
  prévia fica local, na branch; não publica.
- `"garantia"` (aviso do piso, nas três opções): vem de "Fundo de **Garantia**" (FGTS), nome próprio do fundo. Decidido: legítimo, fica.
- Peso da pasta (1119 KB): soma das três opções, miniaturas e prévia; cada página carrega só o que é dela. Decidido: aceito enquanto for proposta; o que sobrar depois da escolha sai da pasta.

## Revisão — 2026-10-05 (versão final, Pérola, com a resposta da cliente)
| # | Frase nova ou mudada | Parecer |
|---|---|---|
| C-11 | Rubrica: "Corretora de Imóveis · Crédito e financiamento habitacional" | ✅ descreve a atuação [R]; sem qualificação promocional |
| C-12 | "Imóveis avulsos e lançamentos em Salvador e Região Metropolitana — com acompanhamento no crédito e no financiamento habitacional, pelo Minha Casa, Minha Vida e pelo SBPE." | ✅ "acompanhamento" é método, não aprovação; a nota "a análise de crédito e as condições… são definidas pela instituição financeira" continua na seção, e a seção sobe para logo depois da atuação |
| C-13 | Atuação "em duas frentes" (sai "imóveis na planta") | ✅ fato [R 6] |
| C-14 | Instagram e e-mail no fechamento; rodapé "O contato acontece pelo WhatsApp, pelo Instagram ou por e-mail." | ✅ contato; e-mail é `mailto:`, nada é coletado |
| C-15 | Meta description / resumo: "…avulsos e lançamentos, com crédito habitacional pelo MCMV e pelo SBPE." | ✅ |

Avisos do CI: só `"garantia"` (Fundo de Garantia — decidido acima). O aviso de peso sumiu com as opções.
