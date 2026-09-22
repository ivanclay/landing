# Autorizações de marca — `dr-paulo-de-tarso`

Logotipo de hospital ou de plano é **marca**, não imagem livre (regra 12). Nesta demonstração **não há
nenhuma autorização**, e por isso a faixa "Onde atende e por quais planos" mostra os **nomes em
tipografia**. Nenhum logotipo foi baixado nem reproduzido.

| Marca | `data-marca` | Autorização | De quem, por qual meio | Data | Arquivo |
|---|---|---|---|---|---|
| Einstein | `einstein` | não há | — | — | — |
| Sírio-Libanês | `sirio-libanes` | não há | — | — | — |
| Oswaldo Cruz | `oswaldo-cruz` | não há | — | — | — |
| HCor | `hcor` | não há | — | — | — |
| Bradesco Saúde | `bradesco-saude` | não há | — | — | — |
| SulAmérica | `sulamerica` | não há | — | — | — |
| Amil | `amil` | não há | — | — | — |
| Porto Saúde | `porto-saude` | não há | — | — | — |
| Omint | `omint` | não há | — | — | — |
| Care Plus | `care-plus` | não há | — | — | — |

## Como trocar o nome pelo logotipo, quando houver autorização

1. Registre a autorização **escrita** nesta tabela (quem autorizou, cargo, meio, data). O documento
   fica com o dono, fora do repositório.
2. Salve o logotipo como **SVG monocromático na cor `--cor-texto` do tema** (`#15201d`), sem texto
   extra, em `site/<slug>/imagens/marcas/<data-marca>.svg`. Nada de PNG colorido: a faixa é uma grade
   silenciosa, e as marcas entram todas no mesmo peso visual.
3. No `index.html`, troque o `<span class="marca__nome">` do item pelo logotipo, mantendo o nome
   acessível:
   ```html
   <li class="marca" data-marca="hcor"><img class="marca__logo" src="imagens/marcas/hcor.svg" alt="HCor" width="120" height="28"></li>
   ```
   O `.marca__logo` já tem a mesma altura para todos (1,75 rem) na mesma grade.
4. Os logotipos em `imagens/marcas/` ficam fora da checagem de créditos e da legenda "Imagem
   ilustrativa" (ADR-004): marca não é ilustração.
5. `npm run verificar:rascunhos` e conferência CFM da faixa (nada que sugira endosso do hospital).
