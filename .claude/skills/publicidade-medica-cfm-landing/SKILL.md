---
name: publicidade-medica-cfm-landing
description: 'Especialista em publicidade médica pela Resolução CFM 2.336/2023 e em redação de página de médico que converte sem ferir a norma. Escreve e confere cada frase: identificação obrigatória (nome, CRM/UF com a palavra MÉDICO, RQE de cada especialidade), promessa ou insinuação de resultado, superlativo e autopromoção, sensacionalismo, técnica ou aparelho apresentado como superior, antes-e-depois, preço de consulta e de procedimento, desconto, depoimento, premiação, e o que um médico sem RQE pode dizer. Grava a conferência frase a frase com o artigo e decide os avisos do CI. Use ao escrever o texto de uma página, antes de todo PR que mude texto, e em perguntas como "posso escrever que ele é referência?", "pode colocar o preço?", "pode antes e depois?", "pode depoimento?", "isso fere o CFM?", "está muito vendedor?".'
---

# Publicidade médica — escrever para o paciente dentro da norma

A norma não proíbe vender; proíbe **enganar, prometer e se exaltar**. Desde a Res. CFM 2.336/2023 (em
vigor desde 11/03/2024), o médico pode fazer publicidade para formar clientela no próprio site, mostrar
consultório, divulgar valor de consulta. O que continua fora é o que trata o paciente como alguém a ser
impressionado em vez de informado. Um texto bom para o paciente quase sempre já está dentro da norma.

## Perfil (leia primeiro)

`CLAUDE.md` — regras **1**, **2**, **3** e **4**, e as decisões **D-04** (depoimento) e **D-05**
(valor). A lista do CI está em `ferramentas/regras/termos-vedados.json`. O checklist com os artigos
está em `references/checklist-cfm.md`.

⌗ **A fonte é a resolução, não este resumo.** Na dúvida, leia o texto:
`https://sistemas.cfm.org.br/normas/arquivos/resolucoes/BR/2023/2336_2023.pdf` e o manual em
`https://publicidademedica.cfm.org.br`. Se a dúvida persistir, a frase **sai** e a pergunta vai para o
dono — que a leva ao médico ou à assessoria jurídica dele. Você não é a assessoria jurídica e diz isso.

## O que a página TEM que ter (verificado pelo CI)

Nome · **CRM-UF número** · a palavra **Médico/Médica** · cada especialidade e área **com o RQE**
(arts. 4º e 6º). No `data-identificacao-cfm` do rodapé e, curto, junto da abertura.

## Como escrever

| Em vez de | Escreva | Por quê |
|---|---|---|
| "O melhor cardiologista de Salvador" | "Cardiologista em Salvador" | superlativo e comparação |
| "Especialista em arritmia" (sem RQE da área) | "Atende pacientes com arritmia" | especialista só com RQE |
| "Tratamento definitivo para a enxaqueca" | "Tratamento da enxaqueca, com acompanhamento" | promessa de resultado |
| "Cirurgia a laser, sem dor e sem cortes" | "Cirurgia a laser. Na consulta, explico como é a anestesia e a recuperação" | promessa; "sem dor" é desfecho |
| "Tecnologia de ponta, a mais moderna do Brasil" | "O consultório tem ecocardiograma; o exame é feito na mesma visita, quando indicado" | superioridade de aparelho; o fato útil é o que ele faz pelo paciente |
| "Mais de 10.000 pacientes satisfeitos" | (sai, ou: "Atende em Salvador desde 2012", se o briefing tiver a fonte) | número sem fonte; satisfação é promessa |
| "Recupere sua qualidade de vida!" | "Falta de ar ao subir escada, palpitação, pressão que não baixa: são motivos para procurar um cardiologista." | sensacionalismo × informação |

⌗ **O melhor texto de página médica é específico.** "Cuidado integral e humanizado" cabe em qualquer
médico do país e não diz nada; "atende adultos com palpitação, pressão alta e check-up antes de
cirurgia, no Hospital X e no consultório do Rio Vermelho" é informação — e converte mais.

⌗ **Educar é permitido e é o que vende.** Uma seção que explica um sintoma, um exame ou quando procurar
o especialista é conteúdo educativo, com espaço amplo na norma — desde que não diagnostique à distância
nem prometa.

## Os casos que sempre voltam

- **Preço:** valor da **consulta** e formas de pagamento podem (art. 9º, VI), se o médico pedir
  (D-05) — com "valor vigente em <mês/ano>". **Preço de procedimento, não**: depende de avaliação, e a
  divulgação é tratada como sensacionalismo. Desconto em campanha pode (art. 9º, VIII), sem sorteio,
  pacote ou venda casada.
- **Antes e depois:** nunca isolado. Só com o roteiro completo do art. 14 (texto educativo, indicação,
  fatores que influenciam, complicações, evoluções diferentes, paciente não identificado, consentimento)
  — e com **ADR da página**. Por padrão, fora; o CI reprova a expressão.
- **Depoimento:** fora por padrão (D-04). Publicado pelo médico, é publicidade dele.
- **Prêmios, rankings, "top doctor":** fora.
- **Selo de sociedade** (SBC, SBD…): o **título** pode ("Título de Especialista em Cardiologia pela
  SBC/AMB"), se estiver no briefing com fonte; o **logotipo** da sociedade, só com autorização (regra 12).
- **Hospital e convênio:** o nome, em texto, pode; o logotipo, só com autorização (regra 12). "Atende
  no Hospital X" não diz que o hospital o recomenda — cuidado com frases que sugiram isso.
- **Foto:** do médico, real. Paciente, nunca identificável (regra 12).

## Fluxo

1. **Escreva** o texto por seção no `briefing.md` (seção Texto), marcando o que afirma fato sobre o
   médico.
2. **Depois de construída**, leia a página **em `_site/`** (regra 13), frase a frase, com
   `references/checklist-cfm.md`.
3. Rode `npm run verificar:rascunhos` e **decida cada aviso** por escrito.
4. **Grave** `docs/paginas/<slug>/conferencia-cfm.md`: data, versão (commit), cada item do checklist,
   cada aviso decidido, frases que mudaram e por quê, e as perguntas que ficaram para o médico.
5. A data em `revisao.conferenciaCfmEm` é preenchida **pelo dono** a partir dessa conferência.

## Definição de pronto

- [ ] Identificação completa e conferida pelo CI.
- [ ] Nenhuma frase de promessa, superlativo, sensacionalismo ou superioridade técnica.
- [ ] "Especialista" só onde há RQE.
- [ ] Todo aviso do CI decidido na conferência, com o artigo.
- [ ] Dúvidas que dependem do médico listadas para o PR, não resolvidas por palpite.
