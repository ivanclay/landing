# Conferência COFECI — `karoline-melo`

- **Data:** 2026-09-27 · **Quem:** tech lead (Opus), contra o texto das normas; não existe skill do COFECI
  (como no CFN, backlog B-13).
- **Normas lidas na fonte** (PDFs oficiais do COFECI, `intranet.cofeci.gov.br/arquivos/legislacao/`, lidos
  em 2026-09-27 por agente de pesquisa, com citação literal):
  - **Res. COFECI 458/1995**, art. 1º (só anuncia quem tem contrato escrito de intermediação) e **art. 2º**:
    *"Dos anúncios e impressos constará o número da inscrição de que fala o Artigo 4º da Lei nº 6.530/78,
    precedido da sigla CRECI, acrescido da letra 'J' quando se tratar de pessoa jurídica."* Vigente: a
    Res. 1.504/2023 trata de outro assunto e não a revoga.
  - **Res. COFECI 326/1992** (Código de Ética): art. 4º, II (*"dados rigorosamente certos, nunca omitindo
    detalhes que o depreciem"*); art. 6º, VI, VII, X (concorrência desleal) e **XVII** (*"anunciar
    capciosamente"*).
  - **Res. COFECI 1.066/2007** (CNAI): inscrição opcional; quem é inscrito pode se apresentar como avaliador.
  - **Lei 6.530/1978, art. 20, IV** (anúncio sem o número de inscrição é vedado) e **CDC, arts. 30 e 37**
    (publicidade vincula; enganosa, inclusive por omissão). ⚠️ Esses dois vieram de espelhos
    (planalto.gov.br recusou a conexão); o texto é o conhecido, mas revalidar na fonte oficial.

## Identificação (Lei 6.530/1978, art. 20, IV · Res. 458/1995, art. 2º)

| Onde | Texto | Parecer |
|---|---|---|
| Abertura e rodapé (`data-identificacao-creci`) | Karoline Melo · Corretora de Imóveis · CRECI-BA 36.265 · CNAI 58.909 | ✅ número precedido de "CRECI"; pessoa física, sem "J". A UF "BA" é **inferida** do DDD 71 (briefing); conferir |
| Rubrica "Consultora imobiliária" | título que ela usa [T 103] | ✅ como qualificador; a profissão da inscrição aparece ao lado |
| CNAI 58.909 | só o número, sem "avaliadora" | ✅ (Res. 1.066/2007); a página não oferece avaliação. Conferir a inscrição com o CRECI |

## Frase a frase (as que pedem atenção)

| # | Frase | Risco | Decisão |
|---|---|---|---|
| C-01 | "Encontre o seu imóvel com segurança." | promessa? | ✅ convite, não garantia; fala da decisão informada, que é o método dela |
| C-02 | original: "simulação de análise de crédito gratuitamente para você **ainda hoje**, sem burocracia" | prazo que a página não controla; vincula (CDC, art. 30) | ✏️ **"ainda hoje" sai**. "Gratuitamente" e "sem burocracia" ficam: são dela e descrevem o serviço dela (a simulação), não o crédito |
| C-03 | ficha "A análise pode considerar…" | parecer promessa de aprovação | ✏️ **nota nova ao lado:** *"A simulação é uma estimativa. A aprovação do crédito e as condições do financiamento são definidas pela instituição financeira."* (CDC, art. 37, § 3º, omissão; Cód. de Ética, art. 4º, II) |
| C-04 | "Seu imóvel pode estar mais perto do que você imagina." | sensacionalismo? | ✅ aspiracional, sem número nem prazo |
| C-05 | "Transforme o valor que hoje vai para o aluguel em um planejamento…" | promessa de que aluguel = parcela? | ✅ fala em **planejamento**, não em trocar aluguel por parcela |
| C-06 | "Conheça oportunidades imobiliárias…" (investir) | promessa de rentabilidade | ✅ nenhuma menção a retorno ou valorização. Qualquer frase com "valoriza", "retorno" ou "rentabilidade" fica vetada (piso) |
| C-07 | "Não deixe que dúvidas sobre financiamento, entrada ou valores façam você adiar seus planos." | pressão/urgência | ✅ leve; sem "últimas unidades", sem prazo |
| C-08 | original: "Compromisso é com o seu futuro e ele começa hoje" | — | ✏️ só a gramática: "O compromisso é com o seu futuro, e ele começa hoje." |
| C-09 | nenhum imóvel anunciado | Res. 458/1995, art. 1º; Lei 6.530, art. 20, III e V | ✅ a página anuncia a **profissional**, não um imóvel. Anunciar imóvel exige contrato escrito (e, em loteamento/incorporação, o registro): **não entra sem ADR** |
| C-10 | concorrência | Cód. de Ética, art. 6º, X | ✅ nenhuma comparação com outros corretores; sem superlativo |

## Piso automático
`ferramentas/regras/termos-vedados-cofeci.json` (ADR-009): garantia de aprovação/crédito/retorno, "nome
sujo", "sem consulta ao SPC/Serasa", superlativos, "imperdível", "últimas unidades", "ainda hoje". Aviso
do CI: nenhum na versão conferida (ver `qa.md`).

## Perguntas para a corretora (antes de sair da proposta)
1. Nome completo e região do CRECI (`CRECI-BA`?), para `creciConferidoEm`.
2. Atua por uma imobiliária? Se sim, o CRECI-J dela pode precisar aparecer.
3. A inscrição no CNAI está ativa?

## Ajustes da cliente — 2026-09-27 22:10

| # | Frase | Risco | Decisão |
|---|---|---|---|
| C-11 | "Corretora e Avaliadora de Imóveis" (identificação, título, descrição) | título de avaliador sem inscrição (Res. COFECI 1.066/2007) | ✅ com o CNAI 58.909 ao lado, que ela informou. O contrato exige `cnai` para `avaliador: true` (teste). **Conferir o CNAI ativo** junto com o CRECI |
| C-12 | botão "Fazer simulação" (antes "Quero falar com Karoline") | promessa? | ✅ convite para a simulação que a página já descreve, com a nota de estimativa no bloco 03 |
| C-13 | foto com tripé e ring light | — | ✅ imagem real dela, escolha dela; nenhuma afirmação |
