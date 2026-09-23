# Pendências e riscos

| ID | Assunto | Risco se ficar | Quando |
|---|---|---|---|
| D-01 | Domínio: `/landing/<slug>/` ou domínio próprio com `/<slug>/` na raiz | Endereço impresso em QR vira permanente; trocar depois exige redirecionar cada página | Antes da 1ª página publicada |
| D-02 | Quem assina o índice; se é indexável | Índice genérico, sem dono aparente | Antes da 1ª página publicada |
| D-03 | Aviso de privacidade: basta a frase do rodapé? | Baixo enquanto `rastreamento = OFF` | Com a D-01 |
| D-04 | Depoimentos | Publicidade vedada se feito sem critério | Quando um médico pedir |
| D-05 | Valor da consulta | Nenhum, se com data de vigência | Quando um médico pedir |
| D-06 | Lighthouse no CI (`@lhci/cli`) | Orçamento da regra 11 depende de conferência manual | Depois da 3ª página |
| B-01 | `robots.txt` não vale em site de projeto (só na raiz do domínio) | Nenhum hoje; passa a valer com domínio próprio | Com a D-01 |
| B-02 | `verificar.mjs` lê HTML por expressão regular | HTML fora do padrão do repositório pode escapar de uma checagem | Rever se aparecer falso negativo |
| B-03 | A lista `termos-vedados.json` é um piso | Frase vedada sem termo da lista passa no CI | Sempre: a conferência CFM é humana |
| B-04 | Demonstração `dr-paulo-de-tarso`: JSON-LD não colado no validator.schema.org; leitor de tela, zoom 200% e Tab não conferidos à mão | Baixo (noindex) — mas é o modelo das próximas | Antes de mostrar a um cliente |
| B-05 | O `publicar.yml` não roda `npm run testar` (o `verificar.yml` roda) | Nenhum enquanto todo merge passa pelo PR | Com a D-06 |
| B-06 | Hub: perguntas ao cliente (agrupamento e identidade de ICESP, MV, FIDI, L2D, TL2, IQG; logotipos; profissão da Carla; contatos; base dos números; domínio) | A proposta afirma só o que o site oficial afirma | Antes da aprovação do Hub |
| B-07 | `og:site_name` sai "Médicos" (título do índice) também no hub | Prévia do link com o nome do índice | **Feito em 2026-09-23** para negócio e advocacia (ADR-006: só página de médico leva `og:site_name`); a D-02 continua aberta para o índice |
| B-08 | Dr. Paulo (demo): a foto do consultório está simples demais para o padrão "atende nos principais hospitais de SP"; a seção "Áreas com título de especialista" precisa de mais presença (pedido do dono, 2026-09-22) | A demo vende menos do que entregamos | **Feito em 2026-09-22** (credenciais + consultório premium + social no modelo do hub) |
| B-09 | Não há skill de publicidade da **OAB** (`publicidade-advocacia-oab-landing`): a conferência da demonstração `arruda-seixas` foi feita pelo techlead contra o Provimento 205/2021 | Um escritório real sem conferência especializada | Antes do primeiro escritório real (ADR-006) |
| B-10 | Demonstração `arruda-seixas`: JSON-LD `LegalService` não colado no validator.schema.org; leitor de tela, zoom 200% e Tab não conferidos à mão | Baixo (noindex) | Antes de mostrar a um escritório |
