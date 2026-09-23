# Conferência OAB — Arruda Seixas Advogados (`arruda-seixas`) · DEMONSTRAÇÃO

- Data: 2026-09-23 · Conferida pelo techlead (não há skill da OAB — B-09), contra o texto do
  **Provimento 205/2021 do CFOAB**, lido na íntegra na cópia da OAB/SP
  (`https://www.oabsp.org.br/upload/526840268.pdf`, arts. 1º a 13; o Anexo Único não saiu na extração de
  texto) e o resumo oficial em `https://www.oab.org.br/leisnormas/legislacao/provimentos/205-2021`. Os
  artigos do Código de Ética e Disciplina (CED) citados são o 42, IV (listas de clientes) e o 44
  (nome da sociedade e inscrição).
- A página é **publicidade passiva** (art. 2º, VII: atinge quem buscou o escritório) — mesmo assim, as
  vedações de "qualquer publicidade" (art. 6º, parágrafo único) e as do art. 3º valem, e foram aplicadas.
- Resultado: `revisao.conferenciaOabEm = 2026-09-23`. O CI (piso `termos-vedados-oab.json`) não deu
  nenhum aviso nesta página.

## Frase a frase

| Trecho | Onde | Norma | Decisão |
|---|---|---|---|
| "Arruda Seixas Advogados" / "Arruda Seixas Sociedade de Advogados · OAB/SP 00.000 · OAB/RJ 00.000 · OAB/DF 00.000" | cabeça, abertura, rodapé | CED, art. 44 (nome da sociedade e inscrição) | **Obrigatório — presente**, e conferido pelo CI (`data-identificacao-oab`) |
| "Sócios administradores, responsáveis por esta página: Helena Arruda, OAB/SP 000.001; Otávio Seixas, OAB/SP 000.002 · OAB/RJ 000.002-S" | rodapé | Provimento, art. 1º, § 1º | Mantido: diz quem responde pela publicidade |
| "Advocacia empresarial, consultiva e contenciosa, em São Paulo, no Rio de Janeiro e em Brasília." | abertura | art. 3º, § 1º (perfil e informações do exercício profissional) | Informativo — mantido |
| "Dez áreas de atuação, cada uma conduzida por um sócio que responde pelo trabalho." | abertura | art. 3º, IV | Descreve organização, não qualidade; sem comparação — mantido |
| Sumário e títulos das dez áreas | abertura, Áreas | art. 3º, III (especialidade só com título) | Escrito **"áreas de atuação"**, nunca "especialidades" nem "especialista"; JSON-LD usa `knowsAbout`, não especialidade |
| Textos das áreas (ex.: "Recuperação judicial e extrajudicial, renegociação de dívidas…") | Áreas | art. 3º, IV; art. 6º | Só a matéria; nenhum resultado, caso, cliente ou número — mantidos |
| "Cada área tem um sócio responsável: é quem recebe o assunto, forma a equipe e assina o trabalho." | Áreas | art. 3º, IV | Informativo sobre o método — mantido |
| "Execução de garantias", "garantias e operações estruturadas" | índice, Mercado de Capitais | art. 6º (promessa) | "Garantia" aqui é **instituto jurídico**, não promessa — mantido (por isso "garantia" não é erro no piso da OAB) |
| "Atos de concentração (CADE)", "agências reguladoras" | índice, Regulatório | art. 8º (vínculo com outras atividades) | Nome do órgão como **matéria**, sem sugerir vínculo — mantido |
| Índice de matérias (47 entradas) | gesto | art. 3º, V (distribuição indiscriminada) e § 1º | Não é material distribuído; é navegação da própria página — mantido |
| Nomes, cargos e inscrições dos dez sócios | Sócios | art. 4º, § 1º (identificação com qualificação verdadeira) | Mantido; **formação fora** (instituição real com pessoa fictícia — briefing) |
| "Para uma primeira conversa, ligue para o escritório da sua cidade ou escreva pelo WhatsApp com o assunto e o nome da empresa." | Escritórios | art. 3º, § 1º (sem incitar diretamente à contratação); art. 4º, § 3º (dados de contato e WhatsApp permitidos) | Indica o **canal**, não induz a contratar nem ao litígio; sem "ligue já", sem urgência — mantido |
| "Documentos e detalhes do caso ficam para a reunião com o sócio da área, sob sigilo profissional." | Escritórios | LGPD (regra 5); sigilo profissional | Mantido: protege o cliente e o escritório |
| Botões "Ligar (11) 3000-0000", "Escrever pelo WhatsApp" | abertura, barra, faixa | art. 4º, § 3º | Permitido — mantido |
| "Página de caráter informativo, nos termos do Provimento 205/2021… Não usa cookies nem coleta dados." | rodapé | art. 3º (caráter informativo); regra 6 | Mantido |
| Retratos dos sócios e foto do prédio (2ª versão) | abertura, Sócios | art. 5º, § 2º (fotos dos advogados e do escritório permitidas); art. 6º, parágrafo único (sem ostentação) | Permitido. Na demonstração são **de banco**, com "Imagem ilustrativa" (ADR-004); numa página real, só fotos dos próprios sócios, com autorização (regra 12). O prédio não é apresentado como sede — não afirma dimensão nem estrutura |

## O que ficou fora, e por quê

| Tentação comum no setor | Norma | Decisão |
|---|---|---|
| "Um dos maiores escritórios do país", "líder", "referência" | art. 3º, IV | fora; o porte aparece pela amplitude (áreas, cidades, sócios) |
| "Mais de 200 advogados", metros quadrados, andares | art. 3º, IV; art. 6º | fora |
| Rankings (Chambers, Legal 500, Análise) e prêmios | art. 5º, § 1º | fora (numa página real, só o verificável e sóbrio, se o escritório pedir) |
| Clientes atendidos, logotipos de clientes, operações ("assessoramos a aquisição da X") | CED, art. 42, IV; art. 6º | fora |
| Honorários, "primeira reunião sem custo" | art. 3º, I | fora |
| Foto que ostente bens (carro, relógio, viagem) | art. 6º, parágrafo único | fora — um retrato candidato com relógio em destaque foi descartado |
| Símbolo ou logotipo da OAB | art. 5º, § 2º | fora (o § não é símbolo da OAB) |
