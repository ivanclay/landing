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
