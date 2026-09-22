# Repertório — ponto de partida, não cardápio

> Tudo aqui existe no Fontsource (`npm i -D @fontsource-variable/<id>` ou `@fontsource/<id>`) e entra
> por `npm run fontes <id>`. Anote no plano qual página usou o quê — a próxima escolhe outra coisa.

## Famílias por registro

| Registro | Título | Texto | Observação |
|---|---|---|---|
| Clássico sóbrio | `newsreader`, `literata`, `source-serif-4`, `spectral` | `public-sans`, `source-sans-3` | Newsreader está no índice — não use em página |
| Editorial refinado | `fraunces` (use o eixo SOFT/WONK com parcimônia), `instrument-serif`, `young-serif` | `hanken-grotesk`, `schibsted-grotesk` | Instrument Serif só tem peso 400: título, nunca texto |
| Contemporâneo preciso | `bricolage-grotesque`, `space-grotesk`, `sora` | `inter-tight`, `figtree` | Space Grotesk tem cara de tecnologia — cuidado |
| Acolhedor | `nunito`, `quicksand`, `baloo-2` (pediatria) | `nunito-sans`, `lexend` | Arredondado demais infantiliza o adulto |
| Legibilidade máxima (público idoso, baixa visão) | `atkinson-hyperlegible-next`, `lexend` | idem | Atkinson está no índice — não use em página |
| Firme e estrutural (ortopedia, esporte) | `archivo` (eixo de largura), `barlow-condensed`, `anybody` | `archivo`, `barlow` | Largura variável é um gesto por si só |

## Aberturas que não são o padrão

- **Nome como arquitetura:** o nome do médico em corpo de cartaz, quebrado em linhas, ocupando a
  primeira tela; especialidade e contato ancorados num canto.
- **Pergunta do paciente:** a abertura é a dúvida que traz a pessoa ("Palpitação que vem e vai?"),
  respondida pela página — educativa, dentro da norma.
- **Retrato com respiro:** foto real grande, recortada com intenção (não o círculo de avatar), texto ao
  lado em coluna estreita.
- **Mapa de onde atende:** para quem atende em vários hospitais, a abertura é a lista dos lugares,
  tipograficamente, com o convênio de cada um — é o que o paciente de convênio procura primeiro.
- **Índice próprio:** a página se apresenta como um sumário das condições que o médico trata, cada uma
  levando à sua explicação.

## Montando a paleta

1. Parta de **uma** âncora com razão: a cor da foto real (roupa, parede, pele), a luz da cidade, a
   matéria da especialidade, a preferência do médico.
2. Fundo raramente é branco puro nem preto puro; escolha a temperatura (quente/fria) pela âncora.
3. Texto: a cor mais escura da família da âncora, não `#000`.
4. Marca: a cor que carrega o botão de contato — é a única que precisa gritar.
5. Meça o contraste (ex.: `npx --yes wcag-contrast` ou a ferramenta do navegador) e anote os valores.
6. Declare tudo no `tema.css` com os nomes do contrato (`base.css`).

## Um gesto, alguns exemplos

Uma grade que "respira" no ritmo da especialidade · o nome em largura variável que se estreita ao
rolar (um só momento, respeitando reduced-motion) · uma cor de marca inesperada e bem justificada ·
a lista de hospitais como tipografia monumental · uma textura sutil derivada da matéria (papel, linho,
pedra) em SVG leve · uma foto real tratada com duotone da paleta.
