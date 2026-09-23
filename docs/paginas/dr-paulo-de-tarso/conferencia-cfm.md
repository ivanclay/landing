# Conferência de publicidade médica — `dr-paulo-de-tarso` (DEMONSTRAÇÃO)

- Data: 2026-09-22 · Base: Res. CFM 2.336/2023 e o checklist em
  `.claude/skills/publicidade-medica-cfm-landing/references/checklist-cfm.md`
- Lido: **o construído** (`_site/dr-paulo-de-tarso/index.html`, `npm run verificar:rascunhos`), frase a frase.
- Conferido por: Claude Code (publicidade-medica-cfm-landing), por delegação do dono. Não é parecer
  jurídico; numa página real, as dúvidas abaixo vão ao médico.

## A. Identificação (arts. 4º e 6º)
- [x] Nome completo "Paulo de Tarso Lopes Pontes" (fictício), no rodapé (`data-identificacao-cfm`) e na abertura.
- [x] "Médico — CRM-SP 000000": a palavra MÉDICO junto do CRM, com UF.
- [x] Cardiologia — RQE 00001; Eletrofisiologia Clínica Invasiva — RQE 00002; Estimulação Cardíaca
      Eletrônica Implantável — RQE 00003; Ergometria — RQE 00004. Conferido pelo CI contra o `pagina.json`.
- [x] "Especialista" só onde há RQE: o título "Áreas com título de especialista" lista só as quatro com
      RQE; os interesses sem RQE estão em "Também atende".

## B. Conteúdo

| Frase / trecho | Decisão | Por quê |
|---|---|---|
| "Cardiologista. Atende adultos com palpitação, arritmia, fibrilação atrial e pressão alta, e faz a avaliação do coração antes de uma cirurgia ou de começar a treinar." | mantida | Fato do briefing, sem promessa nem adjetivo |
| Descrições das áreas ("O estudo do sistema elétrico do coração…") | mantidas | Educativas; descrevem a área, não o médico |
| "Serve para flagrar a palpitação que não aparece na consulta" (Holter) | mantida | Explica a finalidade do exame; não promete diagnóstico |
| "Isto não espera consulta… vá ao pronto-socorro… 192 (SAMU)" | mantida | Orientação de segurança, sem exclamação nem medo fabricado |
| "Quando procurar um cardiologista" (6 sinais) | mantida | Educativo, sem diagnóstico à distância |
| "O Dr. Paulo não atende crianças nem urgências" | mantida | Delimita o perfil (dor nº 4 do pedido) |
| "Muitos planos reembolsam parte da consulta feita fora da rede" | mantida | Informação geral, com "depende do seu contrato" |
| "No particular, esse retorno não é cobrado" | mantida | Condição de pagamento da consulta (art. 9º, VI); não é preço de procedimento nem desconto. **Numa página real: confirmar com o médico** |
| "…o relatório da consulta volta para quem encaminhou" | mantida | Fluxo do consultório (fictício), condicionado à autorização do paciente (sigilo) |
| Faixa "Onde atende e por quais planos" | mantida | Nomes em texto, sem logotipo; o título diz o fato, nada sugere endosso |

- [x] Nenhum superlativo, ranking, prêmio, "referência", "renomado".
- [x] Nenhuma técnica ou aparelho apresentado como superior.
- [x] Nenhum número sem fonte (não há anos de experiência nem contagem de pacientes).

## C. Imagens
- [x] **Exceção do ADR-004:** banco de imagem com licença livre no lugar do médico e do consultório, só
      porque a página é demonstração. Toda imagem com "Imagem ilustrativa"; créditos em
      `creditos-imagens.md` e no rodapé.
- [x] O retrato não está ligado a nenhuma frase em primeira pessoa; a página inteira fala em terceira pessoa.
- [x] Nenhum paciente, nenhuma foto de hospital citado, nenhum antes-e-depois.
- [x] Nenhum logotipo de hospital ou plano (sem autorização — `autorizacoes.md`).

## D. Comercial
- [x] Valor da consulta **não** aparece (D-05; pedido do dono).
- [x] Nenhum preço de procedimento, desconto, pacote ou sorteio.

## E. Depoimentos e terceiros
- [x] Nenhum depoimento (D-04).
- [x] O aviso do topo e o rodapé dizem que hospitais e planos não têm relação com a página.

## F. Avisos do CI
Nenhum aviso de termo. Um aviso de peso da **pasta** (≈1,3 MB): é a soma de todas as variações
(AVIF/WebP/JPEG × larguras); a primeira carga medida pelo Lighthouse é **161 KB**. Decidido: aceito
(ver `qa.md`).

## Perguntas que iriam ao médico (numa página real)
1. O retorno em até 30 dias é sem custo no particular?
2. O relatório volta ao médico que encaminhou — por qual meio?
3. Quais documentos a secretaria emite para reembolso (recibo, nota fiscal)?
4. A matriz plano × local, linha a linha.

## Reconferência do ajuste (2026-09-22)

| Frase nova | Decisão | Por quê |
|---|---|---|
| "Quatro títulos registrados no CRM-SP, cada um com o seu RQE… qualquer paciente pode conferi-lo na busca de médicos do portal do CFM." | mantida | Educativa e verificável; explica o que dá direito a "especialista" (art. 4º) sem se exaltar |
| "Avaliação cardiológica, inclusive antes de uma cirurgia e de começar a treinar." | mantida | O rascunho dizia "completa": adjetivo sobre o serviço, saiu |
| Exames sob cada área ("No consultório: Holter…", "Teste ergométrico…", "Avaliação de marca-passo…") | mantidas | Mesmo conteúdo da lista anterior, reagrupado; descrevem o exame, não prometem resultado |
| Faixa do consultório ("Imagem ilustrativa") | mantida | Banco de imagem só pela exceção do ADR-004; a vista não é de São Paulo e a legenda não diz que é |

`npm run verificar`: nenhum aviso de termo.
