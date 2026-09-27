# Conferência pelo Código de Ética do Nutricionista — `emilia-kuwano`

- **Norma:** Res. CFN 599/2018 (Código de Ética e de Conduta do Nutricionista), arts. 21 e 53–63 —
  texto lido na fonte em 2026-09-27: `https://cfn.org.br/wp-content/uploads/resolucoes/Res_599_2018.html`.
  Telenutrição: Res. CFN 760/2023.
- **Quem conferiu:** techlead, em 2026-09-27, sobre o construído (`npm run rascunhos`). Não há skill do CFN
  (ADR-008, B-13).
- **Estado:** conferida em 2026-09-27, com o CRN-5 1575 e o layout escolhido (opção 3). As datas de
  `revisao` são preenchidas pelo dono (regra 4) — `crnConferidoEm` depois de conferir a inscrição no CRN-5.

## Achados na entrada

| # | Na entrada | Decisão | Artigo |
|---|---|---|---|
| F-01 | Seção "Atendimento Nutricional (planos e valores)": **R$ 400** presencial, **R$ 380** on-line | **Fora da página.** Virou "Duas formas de atendimento", com o que cada uma inclui, e a nota "Informações sobre agendamento e pagamento pelo WhatsApp" | art. 57 — vedado usar o valor dos honorários como publicidade |
| F-02 | Identificação: nome e "Nutricionista", **sem número do CRN** | Resolvido: o dono informou **CRN-5 1575** (2026-09-27); está sobre o retrato e no rodapé (`data-identificacao-crn`), conferido pelo `verificar` | art. 21 |
| F-03 | "Especialista em Clínica e Terapêutica Nutricional (UNIGUAÇU)" | Escrito como **"Especialização em…"** — o fato (o curso) sem transformar em título. Se ela tiver o título de especialista reconhecido, pode voltar a "Especialista" | art. 54 (divulgar qualificação) + regra 1 |
| F-04 | Consulta on-line | Permitida | Res. CFN 760/2023 |
| F-05 | "pagamento prévio para reserva do horário" | Mantido: é regra de agendamento, não valor | art. 57 não alcança |

## Frase a frase (o que a página afirma)

| Frase | Decisão |
|---|---|
| "Atendimento nutricional presencial e on-line, com acompanhamento semanal por e-mail entre as consultas." | ✓ descreve o serviço; da entrada §1 |
| Os 4 passos (reserva, anamnese e exames, consulta, acompanhamento) | ✓ reescrita fiel da entrada §3; nenhuma promessa |
| "Na consulta presencial, a composição corporal é avaliada por bioimpedância profissional." | ✓ entrada §3; não atribui superioridade ao aparelho |
| Preparo e observações da bioimpedância | ✓ orientação técnica, entrada §5 (art. 55: promoção da saúde, respaldo técnico) |
| "A bioimpedância mede a composição corporal — percentual de massa muscular, gordura e água. Para a medida sair fiel, siga estes cuidados:" | ✓ redação de apoio; o conteúdo vem da entrada §3 |
| Formação (3 itens) | ✓ entrada §2; ver F-03 |
| "Cada plano alimentar é individual, e os resultados podem não ocorrer da mesma forma para todas as pessoas." | ✓ **exigido** pelo art. 55, parágrafo único |
| "Esta página não usa cookies nem coleta dados." | ✓ verdadeiro (regra 5, 6) |

Não há: preço, desconto, sorteio, depoimento, antes e depois, imagem corporal, garantia, superlativo,
marca de produto ou suplemento (arts. 56–63).

## Piso automático

`npm run verificar:rascunhos` em 2026-09-27: nenhum termo de `termos-vedados-cfn.json` na página; **1 erro:
"PENDENTE"** (o CRN) — esperado.
