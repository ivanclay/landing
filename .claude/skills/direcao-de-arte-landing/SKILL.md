---
name: direcao-de-arte-landing
description: 'Diretor(a) de arte das páginas de médico: dá a cada página uma identidade própria, específica do médico e da especialidade, que não se confunde com template nem com as outras páginas do repositório. Escreve o plano ANTES do código — paleta de 4 a 6 cores com contraste conferido, uma ou duas famílias locais com papel definido, esboço de layout em ASCII, o gesto memorável e os princípios —, revisa o plano contra os clichês (visuais de IA e visuais de clínica: azul-hospital, estetoscópio, linha de ECG, foto de banco) e depois critica a página construída por captura de tela. Use em toda página nova, em todo redesenho, e em pedidos como "está com cara de template", "deixa mais sofisticado", "quero algo premium", "muda a cor", "a página do Dr. X parece a do Dr. Y", "ideias de visual para uma dermatologista".'
---

# Direção de arte — uma identidade por médico

"Alto nível" não é mais sombra, mais gradiente e mais animação. É **decisão**: cada cor, cada fonte e
cada espaço escolhidos para *este* médico, e o resto em silêncio. A régua é simples — cubra o nome do
médico na captura de tela: se a página pudesse ser de qualquer outro, ela ainda não tem direção.

## Perfil (leia primeiro)

`CLAUDE.md` — regras **10** (identidade é da página), **11** (orçamento), **12** (imagem real ou
nenhuma). O briefing da página (`docs/paginas/<slug>/briefing.md`) — público, tom, especialidade,
cidade, se há foto. **E os planos das páginas que já existem** (`docs/paginas/*/direcao-de-arte.md`):
a página nova não repete a combinação de paleta e família de nenhuma delas.

## De onde vem a identidade

Do **assunto**, não de um estilo da moda. Pergunte ao briefing:

- **Quem é o paciente?** Idoso com pressão alta pede tipo grande, contraste alto, calma. Atleta com
  lesão pede energia e precisão. Mãe de criança com alergia pede acolhimento e clareza. Paciente de
  dermatologia estética pede refinamento.
- **Qual é a matéria da especialidade?** A dermatologia trabalha com pele, luz, textura; a
  ortopedia, com estrutura, eixo, movimento; a pediatria, com crescimento e escala; a cardiologia, com
  ritmo e tempo. **Use a matéria como princípio de composição, não como ícone.** Ritmo pode ser o
  compasso da grade e a cadência dos títulos; nunca uma linha de eletrocardiograma no fundo.
- **Qual é o lugar?** Salvador não é Curitiba. Luz, materiais e cor da cidade podem entrar — com
  medida.
- **Qual é a pessoa?** O médico de 35 anos que atende pela rede social e a médica de 60 com cátedra
  pedem registros diferentes. A foto real, se houver, dita a paleta mais do que qualquer teoria.

## O plano (grave em `docs/paginas/<slug>/direcao-de-arte.md`, antes de qualquer CSS)

1. **Assunto, público e o trabalho principal da página** em três linhas (o trabalho é quase sempre:
   *fazer a pessoa certa marcar a consulta*).
2. **Paleta:** 4 a 6 cores com nome e hex, cada uma com papel (`--cor-fundo`, `--cor-texto`,
   `--cor-marca`…). **Contraste medido**, não suposto: texto e texto suave ≥ 4,5:1 sobre fundo e
   superfície; `--cor-sobre-marca` ≥ 4,5:1 sobre `--cor-marca`; foco visível sobre tudo.
3. **Tipos:** uma família, ou duas claramente distintas, **locais** (Fontsource, `npm run fontes`),
   com papel: título, texto. Peso, largura e espaçamento escolhidos. Escala do `base.css` ou justificativa.
4. **Layout:** a ideia em uma frase, a abertura em ASCII (celular **e** desktop), o alinhamento.
5. **O gesto:** **uma** coisa memorável — onde a ousadia mora. Todo o resto, disciplinado.
6. **Movimento:** nenhum, ou um momento orquestrado, com `prefers-reduced-motion` respeitado.
7. **Revisão contra o genérico** (abaixo): o que o primeiro rascunho tinha de padrão, o que mudou e por quê.

## Revisão contra o genérico — faça de verdade

Pergunte: *"se eu recebesse o pedido de outro médico da mesma especialidade, chegaria no mesmo
plano?"* Se sim, a parte que se repetiria é padrão, não escolha — troque-a e escreva o porquê.

**Clichês de página gerada** (valem para qualquer assunto; use só se o briefing pedir):
creme quente com serifa de alto contraste e acento terracota; fundo quase preto com um acento
ácido; jornal com fios finos e zero raio; o kit SaaS de cartões idênticos arredondados com a mesma
sombra cinza e gradiente de enfeite; rótulo em CAIXA ALTA espaçada acima de todo título; metadados com
ponto no meio (`A · B · C`); seta `→` no fim de todo botão; uma palavra do título em itálico ou em cor;
números `01 / 02 / 03` em conteúdo que não é sequência; cada seção entrando com fade-e-sobe.

**Clichês de clínica:** azul-hospital com branco e verde-água; estetoscópio, cruz, coração de
emoji, linha de ECG, dente sorridente, molécula; foto de banco de médico de braços cruzados;
"Agende já!" em vermelho; carrossel de convênios em logotipo; ícone genérico em cada card de
"Nossos serviços".

⌗ Nenhum desses é proibido em si — são **padrões**, e aparecem em qualquer página. Se o briefing
pedir ("ela quer azul"), o briefing vence: faça o **melhor** azul para ela, não o azul-hospital.

## Tipografia

- O tipo é a personalidade. Título grande e bem desenhado vale mais que qualquer ilustração.
- Medida de 45 a 75 caracteres; serifa no corpo pede entrelinha um pouco maior.
- Escolha deliberadamente — o repertório em `references/repertorio.md` é ponto de partida, não
  cardápio. **Nunca a mesma dupla em duas páginas.**
- Português tem acento: confira `ã`, `ç`, `é` maiúsculos no peso do título antes de decidir.

## Sem foto real

A página é **tipográfica** e isso é uma direção, não uma falta: nome em corpo grande, composição
forte, cor com personalidade. Nunca silhueta, avatar genérico ou banco de imagem (regra 12). Ilustração
abstrata em SVG só se servir ao assunto e não representar pessoa, consultório ou procedimento.

## Crítica do construído

Depois do `frontend-landing`, **olhe**: captura em 360, 768 e 1440 px (Playwright, se houver; senão,
o dono). Faça o teste de Chanel — tire um acessório. Confira: a abertura diz quem, o quê, onde e como
marcar sem rolar no celular? O botão de contato é a coisa mais fácil de achar? A página ainda é
distinta se cobrir o nome? Registre o que mudou no plano.

## Definição de pronto

- [ ] Plano gravado antes do código, com a revisão contra o genérico escrita.
- [ ] Paleta com contraste medido; fontes locais; nenhuma combinação repetida de outra página.
- [ ] Um gesto; o resto quieto.
- [ ] Capturas em 360 / 768 / 1440 px conferidas; a crítica registrada.
