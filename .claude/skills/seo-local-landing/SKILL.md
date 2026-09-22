---
name: seo-local-landing
description: 'Cuida de como a página de um médico aparece no Google, no WhatsApp e no Instagram: título e meta description, o resumo do pagina.json, a imagem social 1200×630, o JSON-LD Physician que a construção gera (e que se valida no validator.schema.org), o sitemap, e a coerência com o Perfil da Empresa no Google do médico (nome, endereço e telefone iguais). Sabe que num site de projeto do GitHub Pages o robots.txt não fica na raiz do domínio e que o sitemap se envia pelo Search Console. Use em toda página nova e em pedidos como "a página não aparece no Google", "o link no WhatsApp está sem imagem", "melhora o título", "o que colocar no Google Meu Negócio", "Search Console".'
---

# SEO local — ser achado por quem procura o médico certo na cidade certa

Quem procura médico no Google digita **especialidade + cidade** ("cardiologista Salvador"), **nome**
("dr joão almeida") ou **condição + cidade** ("arritmia tratamento salvador"). A página responde às
três com texto verdadeiro e específico — não com repetição de palavra-chave, que a norma do CFM e o
Google punem do mesmo jeito.

## Perfil (leia primeiro)

`CLAUDE.md` — regras **1**, **3**, **6** e **8**, e a **D-01** (domínio). A construção escreve o
canonical, o Open Graph e o JSON-LD a partir do `pagina.json` (`ferramentas/lib/seo.mjs`); esta skill
decide o **conteúdo** e confere o **resultado**.

## O que decidir por página (grave em `docs/paginas/<slug>/seo.md`)

| Peça | Regra | Exemplo |
|---|---|---|
| `<title>` | Nome — especialidade em cidade. ≤ 60 caracteres | `Dr. João Almeida — Cardiologista em Salvador` |
| `meta description` = `resumo` | 50–160; o que ele trata, onde, como marcar. Sem superlativo | `Cardiologista em Salvador. Atende adultos com arritmia e pressão alta no Hospital X e no Rio Vermelho, por convênio e particular.` |
| `og:title` / `og:description` | Iguais ou mais curtos; é o que aparece no WhatsApp | |
| `imagemSocial` | 1200×630 JPEG por `npm run imagens … --social`; foto real ou composição tipográfica da página | Sem imagem, o link no WhatsApp sai pelado |
| `h1` | A frase de abertura; nome e especialidade aparecem perto, no texto | |
| Texto | Condições e exames pelo **nome que o paciente usa**, com o termo técnico junto | "pressão alta (hipertensão)" |

## Conferir o que foi gerado (regra 13)

1. `npm run verificar:rascunhos` e abra `_site/<slug>/index.html`: canonical e `og:url` com a URL certa.
2. Copie o bloco `application/ld+json` e cole em `https://validator.schema.org` — **zero erro**. Anote
   no `seo.md`.
3. Depois de publicado: a URL no **Teste de pesquisa aprimorada (Rich Results Test)** do Google e no
   depurador de compartilhamento do Facebook/WhatsApp (pré-visualização do link).

## Site de projeto: o que muda

- `ivanclay.github.io/landing/robots.txt` **não é lido** pelo Google (robots só vale na raiz do
  domínio). A construção gera assim mesmo — passa a valer no dia do domínio próprio (D-01).
- O **sitemap** (`…/landing/sitemap.xml`) se envia no **Search Console**, numa propriedade de
  **prefixo de URL** `https://ivanclay.github.io/landing/`. A verificação é por **meta tag**: o código
  que o Search Console der vai em `site.config.json › verificacaoGoogle`, e a construção o escreve no
  `<head>` do índice. Não é segredo — é público por natureza.

## O Perfil da Empresa no Google do médico

Não é desta página, mas decide mais que ela na busca local. Recomende ao dono (e escreva no PR): o
link da página no perfil; **nome, endereço e telefone idênticos** aos da página; a mesma especialidade.
Divergência entre os dois confunde o Google e o paciente.

## O que não fazer

Texto escondido; lista de cidades vizinhas "para ranquear"; página duplicada por bairro; avaliação
falsa; palavra-chave repetida. Tudo isso é também publicidade enganosa (regra 3).

## Definição de pronto

- [ ] Título, descrição e resumo decididos e gravados no `seo.md`.
- [ ] JSON-LD sem erro no validator.schema.org, com a data.
- [ ] Imagem social 1200×630 no `pagina.json`, ou a ausência justificada.
- [ ] Recomendações do Perfil da Empresa no Google escritas no PR.
