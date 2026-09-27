# Briefing — `emilia-kuwano` (nutricionista, página real)

- **Pedido:** 2026-09-27, pelo dono: *"landing page bem sofisticada para Emília nutricionista… Essa landing
  não é fictícia, então as informações só devem ser obtidas dos documentos na pasta de entrada. Antes de
  publicar quero ver e fazer a curadoria."*
- **Tipo:** `nutricao` (ADR-008) — CRN e Código de Ética do Nutricionista (Res. CFN 599/2018) no lugar do
  CFM. Não é demonstração nem proposta: é uma profissional real.
- **Fonte única dos fatos:** `entrada/emilia-nutri/` (fora do git):
  - `emilia-kuwano-landing-page.md` — texto-base, que diz ter sido *"extraído do cartão digital (PDF) e
    das 3 artes de divulgação"*. O PDF e as artes **não estão na pasta**. Abaixo, **[MD §n]** = seção n
    desse arquivo.
  - `emilia-foto.jpg` e `emilia-foto-sem-fundo.png` — retrato da própria nutricionista (1496 × 1792).
- **Nada foi deduzido.** O DDD 71 e a UFBA sugerem Salvador/BA, e o Centro Médico Aliança é conhecido, mas
  nenhum documento diz a cidade nem o endereço: **não entram** (regra 1).

## Fatos

| Fato | Valor na página | Fonte |
|---|---|---|
| Nome completo | Emília Alves Kuwano | [MD §1, §2] |
| Nome de uso / marca | Emília Kuwano · Nutrição Clínica e Funcional | [MD §1, Rodapé] |
| Profissão | Nutricionista | [MD §1] |
| Inscrição no CRN | **CRN-5 1575** | mensagem do dono, 2026-09-27: "Nutricionista CRN5- 1575" (ausente de toda a entrada: texto, fotos e metadados). Formato da página: `CRN-5 1575` |
| Graduação | Nutrição — Universidade Federal da Bahia | [MD §2] "Nutricionista graduada pela Universidade Federal da Bahia" |
| Especialização | Clínica e Terapêutica Nutricional — Faculdade de Ciências Biológicas e da Saúde (UNIGUAÇU) | [MD §2] "Especialista em…" — ver conferência, item F-03 |
| Pós-graduação | Nutrição Clínica Funcional — VP · Faculdade de Ciências Médicas da Santa Casa de São Paulo | [MD §2] |
| Modalidades | Consulta presencial ou on-line | [MD §1, §3, §4] |
| Acompanhamento | Semanal, por e-mail, entre as consultas | [MD §1, §3, §4] |
| Avaliação presencial | Composição corporal (massa muscular, gordura, água) por bioimpedância profissional | [MD §3, §4] |
| Marcação | Pagamento prévio para reservar o horário; questionário de anamnese por e-mail, devolvido com exames laboratoriais e de imagem; pré-avaliação antes da consulta | [MD §3] |
| Preparo da bioimpedância | 5 itens + 2 observações (menstruação; gestantes e marca-passo/implante eletrônico) | [MD §5] |
| Local | Núcleo de Endometriose e Fertilidade – Clínica NEF · Centro Médico Aliança – sala 311 | [MD §6] |
| Cidade, UF, endereço, CEP | **PENDENTE** — não entram na página | ausente |
| WhatsApp | +55 71 99964-3504 | [MD §1, §4, §6] |
| E-mail | emilia.nutri10@gmail.com | [MD §1, §6] |
| Valores (R$ 400 presencial, R$ 380 on-line) | **Não entram** — vedados (Res. CFN 599/2018, art. 57) | [MD §4] · conferência F-01 |
| Paleta da marca | terracota `#AB5639`, salmão `#E5997A`, rosa `#F2B8A6`, malva `#9E8A91` | [MD, Referência visual] |
| Logotipo (maçã + monograma "EK") | **Ausente** — descrito, mas o arquivo não veio. A página usa o nome em texto | [MD, Referência visual] |

## Pendências (perguntas ao dono — gate 1)

1. ~~**Número de inscrição no CRN e o Regional**~~ — **respondido em 2026-09-27: CRN-5 1575.** (ex.: "CRN-5 12345"). **Trava a publicação**: sem ele a
   página não cumpre o art. 21 da Res. CFN 599/2018. Hoje a prévia mostra "CRN PENDENTE" e o `verificar`
   reprova de propósito.
2. **Cidade e endereço do Centro Médico Aliança** (rua, número, bairro, CEP) — para o paciente chegar, para
   o link do mapa e para o Google. Sem eles, a página diz só o que a entrada diz.
3. **Preços:** a entrada traz R$ 400 e R$ 380. O art. 57 do Código de Ética do Nutricionista **veda** usar o
   valor dos honorários como publicidade — ficaram fora. O valor segue sendo informado pelo WhatsApp.
4. **Logotipo** (maçã + "EK") em arquivo vetorial ou PNG grande, se ela quiser a marca na página.
5. **Autorização:** a foto é dela e veio para a página — confirmar que ela autoriza o uso; e que pode citar
   a **Clínica NEF** e o **Centro Médico Aliança** pelo nome.
6. **Instagram** ou outro perfil, se quiser o link.

## Slug

`emilia-kuwano` — nome de uso, sem acento, permanente depois de publicado (regra 7). A pasta de entrada
(`emilia-nutri`) não vira endereço.
