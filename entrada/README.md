# entrada/ — fora do git

Os originais que o médico manda (foto, logotipo, documento) ficam aqui, numa pasta por cliente, com o
prefixo da área: `med-` (médico), `adv-` (advocacia), `nut-` (nutrição), `cor-` (corretor de imóveis),
`bus-` (negócio). Ex.: `entrada/med-dr-paulo-de-tarso/retrato.jpg`, `entrada/adv-rudolf-mateus/`. O nome
da pasta não precisa ser o slug (o slug é decidido no briefing). Nada daqui vai para o repositório nem para o ar: a versão publicada sai
de `npm run imagens` para `site/<slug>/imagens/`, sem metadados.
