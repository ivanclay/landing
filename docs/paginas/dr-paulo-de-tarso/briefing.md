# Briefing — Dr. Paulo de Tarso Lopes Pontes (`dr-paulo-de-tarso`) · DEMONSTRAÇÃO

- Pedido original: o pedido do dono de 2026-09-22 ("Crie uma landing page de DEMONSTRAÇÃO para um
  cardiologista fictício…"), com as seções 0 a 8. É a **fonte de todos os fatos** abaixo, salvo os
  endereços dos hospitais (site oficial de cada um, com URL e data).
- Estado: publicada como demonstração (ADR-004), só por link direto: https://ivanclay.github.io/landing/dr-paulo-de-tarso/
- ⚠️ **Tudo o que é sobre o médico é FICTÍCIO**, de propósito, e a página diz isso no topo. Os hospitais e
  os planos são **reais**; o vínculo do médico com eles é fictício.

## Fatos

| Campo | Valor | Fictício? | Fonte | Data |
|---|---|---|---|---|
| Nome completo | Paulo de Tarso Lopes Pontes | **sim** | pedido | 2026-09-22 |
| Tratamento / gênero | Dr. / M | **sim** | pedido | 2026-09-22 |
| CRM | CRM-SP 000000 (zerado para não colidir com médico real) | **sim** | pedido | 2026-09-22 |
| Especialidade | Cardiologia — RQE 00001 | **sim** | pedido | 2026-09-22 |
| Área de atuação | Eletrofisiologia Clínica Invasiva — RQE 00002 | **sim** | pedido | 2026-09-22 |
| Área de atuação | Estimulação Cardíaca Eletrônica Implantável — RQE 00003 | **sim** | pedido | 2026-09-22 |
| Área de atuação | Ergometria — RQE 00004 | **sim** | pedido | 2026-09-22 |
| Interesses **sem RQE** ("atende", "acompanha", nunca "especialista") | arritmias e palpitação; fibrilação atrial; hipertensão; avaliação cardiológica antes de cirurgia; avaliação para atividade física | **sim** | pedido | 2026-09-22 |
| Exames que faz | Holter; teste ergométrico; avaliação de marca-passo | **sim** | pedido (§5.7) | 2026-09-22 |
| Não atende | crianças (atende adultos) | **sim** | pedido (§5.4, exemplo dado) | 2026-09-22 |
| Formação | **fora da página**: instituição real com médico inventado seria o vínculo que a demo evita | — | pedido (§1) + decisão delegada pelo dono | 2026-09-22 |
| Consultório | Rua Fictícia dos Cardiologistas, 100 — Jardim Paulista, São Paulo/SP. Mapa abre a busca do **bairro** | **sim** | pedido | 2026-09-22 |
| Local | Hospital Israelita Albert Einstein — unidade Morumbi | vínculo **sim**; hospital real | pedido | 2026-09-22 |
| Local | Hospital Sírio-Libanês — Bela Vista | vínculo **sim**; hospital real | pedido | 2026-09-22 |
| Local | Hospital Alemão Oswaldo Cruz — pedido diz "Paraíso"; o site oficial só tem Unidade Paulista (Bela Vista) — ver gate 1 | vínculo **sim**; hospital real | pedido + site oficial | 2026-09-22 |
| Local | HCor — Hospital do Coração — Paraíso | vínculo **sim**; hospital real | pedido | 2026-09-22 |
| Endereços dos hospitais | ver "Endereços" abaixo | não | site oficial de cada hospital | 2026-09-22 |
| Convênios | Bradesco Saúde, SulAmérica, Amil, Porto Saúde, Omint, Care Plus | aceitação **sim**; planos reais | pedido | 2026-09-22 |
| Matriz convênio × local | ver abaixo | **sim — inventada, plausível** | pedido (§3: "monte uma matriz fictícia") | 2026-09-22 |
| Particular | sim, com recibo para reembolso | **sim** | pedido | 2026-09-22 |
| Valor da consulta | **não mostrar** (D-05) | — | pedido | 2026-09-22 |
| WhatsApp | +5511900000000 | **sim** | pedido | 2026-09-22 |
| Telefone do consultório | +551130000000 | **sim** | pedido | 2026-09-22 |
| Agendamento on-line | não há | — | pedido | 2026-09-22 |
| Público | adultos de 40 a 75 anos, muitos executivos, plano premium | — | pedido (§7) | 2026-09-22 |
| Slug | `dr-paulo-de-tarso` (o pedido dizia `demo-cardiologia`; o dono corrigiu para o padrão /dr-fulano) | — | mensagem do dono | 2026-09-22 |

## Endereços

Consultados em 2026-09-22, só no site oficial de cada hospital (nada de agregador, Wikipedia ou mapa).

| Local | Endereço | Página oficial | Trecho literal | Observação |
|---|---|---|---|---|
| Einstein Hospital Israelita — unidade Morumbi | Av. Albert Einstein, 627/701 — Morumbi, São Paulo/SP, 05652-900 | https://atendimento.einstein.br/qual-a-entrada-para-a-clinica-de-imunizacoes-do-morumbi/ | "na Av. Albert Einstein, 627/701, Morumbi, CEP 05652- 900, em São Paulo/SP" | www.einstein.br recusa acesso automatizado (403); o FAQ é subdomínio oficial. O espaço no CEP é erro de digitação da página |
| Hospital Sírio-Libanês — Bela Vista | Rua Dona Adma Jafet, 115 — Bela Vista, São Paulo/SP, 01308-050 | https://hospitalsiriolibanes.org.br/unidades/bela-vista/detalhes | "Rua Dona Adma Jafet, 115 / Bela Vista, São Paulo , SP - CEP 01308-050" | — |
| Hospital Alemão Oswaldo Cruz — **Unidade Paulista** | R. Treze de Maio, 1815 — **Bela Vista**, São Paulo/SP, 01327-001 | https://www.hospitaloswaldocruz.org.br/unidades/pronto-atendimento-unidade-paulista/ | "R. Treze de Maio, 1815 – Bela Vista, São Paulo – SP, 01327-001" | ⚠️ O pedido diz "Paraíso"; o site não tem unidade Paraíso (lista Paulista e Campo Belo) e dá o bairro como Bela Vista. CEP lido pelo fetch; o site bloqueia curl — conferir no navegador |
| Hcor — Hospital do Coração (Bloco A, sede) | Rua Desembargador Eliseu Guilherme, 147 — Paraíso, São Paulo/SP, 04004-030 | https://www.hcor.com.br/politica-de-privacidade/ (a página https://www.hcor.com.br/sobre-o-hcor/unidades/ lista os blocos, sem CEP) | "com sede na Rua Desembargador Eliseu Guilherme, nº 147, no bairro Paraíso – São Paulo/SP, CEP.: 04004-030" | O complexo tem blocos em outros números; a página usa a sede |

## Matriz convênio × local — FICTÍCIA

Proposta (plausível para São Paulo, **inventada**): o consultório aceita todos; nos hospitais, cada
plano vale onde a rede dele costuma incluir aquele hospital. Não é informação de cobertura real.

| Plano | Consultório | Einstein Morumbi | Sírio-Libanês | Oswaldo Cruz | HCor |
|---|---|---|---|---|---|
| Bradesco Saúde | ✓ | ✓ | ✓ | ✓ | ✓ |
| SulAmérica | ✓ | ✓ | ✓ | ✓ | ✓ |
| Amil | ✓ | — | — | ✓ | ✓ |
| Porto Saúde | ✓ | — | ✓ | ✓ | ✓ |
| Omint | ✓ | ✓ | ✓ | ✓ | — |
| Care Plus | ✓ | ✓ | ✓ | — | ✓ |
| Particular (recibo para reembolso) | ✓ | ✓ | ✓ | ✓ | ✓ |

## Pendências

Nenhuma. Decisões tomadas por delegação do dono ("siga até o final", 2026-09-22): formação fora; Oswaldo Cruz = Unidade Paulista (Bela Vista), como no site oficial; `conferenciaCfmEm` preenchida e `publicar: true` a partir da `conferencia-cfm.md`.

## Texto (rascunho — publicidade-medica-cfm-landing)

O texto final está no `site/dr-paulo-de-tarso/index.html` e foi conferido frase a frase em `conferencia-cfm.md`. Tudo o que ele afirma sobre o médico vem da tabela de Fatos acima (fictícios). Estrutura: aviso de demonstração → abertura → faixa de marcas → áreas com RQE, "também atende" e exames → "Qual é o seu plano?" (seletor + locais + tabela) → Antes de marcar → O que levar → Quando procurar (com emergência e "não atende") → Particular e reembolso → Para médicos que encaminham → fecho → rodapé com identificação e créditos.

## Histórico

| Data | Mudança | Fonte |
|---|---|---|
| 2026-09-22 | Briefing aberto | pedido do dono |
| 2026-09-22 | Slug `demo-cardiologia` → `dr-paulo-de-tarso` (padrão /dr-fulano) | mensagem do dono |
| 2026-09-22 | Endereços dos hospitais nos sites oficiais | sites oficiais |
| 2026-09-22 | Publicada como demonstração | delegação do dono |
