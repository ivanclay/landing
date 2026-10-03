# entrada/ — no repositório, fora do ar (ADR-010)

Os originais que o médico manda (foto, logotipo, documento) ficam aqui, numa pasta por cliente, com o
prefixo da área: `med-` (médico), `adv-` (advocacia), `nut-` (nutrição), `cor-` (corretor de imóveis),
`bus-` (negócio). Ex.: `entrada/med-dr-paulo-de-tarso/retrato.jpg`, `entrada/adv-rudolf-mateus/`. O nome
da pasta não precisa ser o slug (o slug é decidido no briefing). Esta pasta **está no repositório**, que é **público** (decisão do dono, ADR-010): tudo o que entra aqui
fica visível no GitHub e no histórico do git para sempre. Nada daqui vai **para o ar**: a versão publicada sai
de `npm run imagens` para `site/<slug>/imagens/`, sem metadados. Antes de commitar uma foto nova, confira que ela
não tem GPS (`seguranca-privacidade-landing`, item 4); documento pessoal (RG, diploma, contrato) não entra.
