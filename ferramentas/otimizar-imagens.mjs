#!/usr/bin/env node
// Gera as versões responsivas de uma imagem (AVIF, WebP e JPEG em várias larguras), sem metadados
// (o EXIF de foto de celular leva GPS — regra 6), e imprime o <picture> pronto com width/height.
// O original fica em entrada/ (fora do git); só o resultado entra em site/<slug>/imagens/.
//
//   node ferramentas/otimizar-imagens.mjs entrada/drjoao/retrato.jpg site/drjoao/imagens/retrato 480,800,1200
//   node ferramentas/otimizar-imagens.mjs entrada/drjoao/retrato.jpg site/drjoao/imagens/social --social
//     (--social: 1200 × 630 em JPEG, para o og:image)
import sharp from 'sharp';
import { mkdir, path } from './lib/arquivos.mjs';

const [origem, prefixo, larguraTexto = '480,800,1200'] = process.argv.slice(2).filter((a) => !a.startsWith('--'));
if (!origem || !prefixo) {
  console.error('uso: node ferramentas/otimizar-imagens.mjs <original> <prefixo-de-saida> [larguras] [--social]');
  process.exit(1);
}
await mkdir(path.dirname(prefixo), { recursive: true });

if (process.argv.includes('--social')) {
  await sharp(origem).rotate().resize(1200, 630, { fit: 'cover', position: 'attention' })
    .jpeg({ quality: 82, mozjpeg: true }).toFile(`${prefixo}.jpg`);
  console.log(`${prefixo}.jpg (1200 × 630). No pagina.json: "imagemSocial": "imagens/${path.basename(prefixo)}.jpg"`);
  process.exit(0);
}

const metadados = await sharp(origem).rotate().metadata();
const proporcao = metadados.height / metadados.width;
const larguras = larguraTexto.split(',').map(Number).filter((largura) => largura <= metadados.width);
if (!larguras.length) larguras.push(metadados.width);

for (const largura of larguras) {
  const base = sharp(origem).rotate().resize({ width: largura });
  await base.clone().avif({ quality: 55 }).toFile(`${prefixo}-${largura}.avif`);
  await base.clone().webp({ quality: 78 }).toFile(`${prefixo}-${largura}.webp`);
  await base.clone().jpeg({ quality: 80, mozjpeg: true }).toFile(`${prefixo}-${largura}.jpg`);
}

const nome = path.basename(prefixo);
const conjunto = (extensao) => larguras.map((l) => `imagens/${nome}-${l}.${extensao} ${l}w`).join(', ');
const maior = larguras.at(-1);
console.log(`<picture>
  <source type="image/avif" srcset="${conjunto('avif')}" sizes="(min-width: 60rem) 40vw, 100vw">
  <source type="image/webp" srcset="${conjunto('webp')}" sizes="(min-width: 60rem) 40vw, 100vw">
  <img src="imagens/${nome}-${maior}.jpg" srcset="${conjunto('jpg')}" sizes="(min-width: 60rem) 40vw, 100vw"
       width="${maior}" height="${Math.round(maior * proporcao)}" alt="DESCREVA A IMAGEM" decoding="async">
</picture>
Ajuste "sizes" ao layout real, escreva o alt, e use loading="lazy" em toda imagem abaixo da primeira dobra.`);
