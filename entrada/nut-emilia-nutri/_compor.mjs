import sharp from 'sharp';
const [,, entrada, saida] = process.argv;
const recorte = `${entrada}/emilia-foto-sem-fundo.png`;
// A: recorte achatado sobre o salmão da marca (JPEG/AVIF/WebP sem transparência, iguais entre si).
await sharp(recorte).flatten({ background: '#E5997A' }).jpeg({ quality: 95 }).toFile(`${saida}/retrato-a.jpg`);
// Social: terracota, arco salmão à direita, recorte dentro; sem texto (o título vem do og:title).
const arco = Buffer.from(`<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630">
  <rect width="1200" height="630" fill="#AB5639"/>
  <path d="M700 630 V300 A230 230 0 0 1 1160 300 V630 Z" fill="#E5997A"/>
  <path d="M684 630 V300 A246 246 0 0 1 1176 300 V630" fill="none" stroke="#fff" stroke-width="2.5"/>
  <text x="80" y="300" font-family="Georgia, serif" font-size="88" fill="#fff">Emília</text>
  <text x="80" y="400" font-family="Georgia, serif" font-size="88" fill="#fff">Kuwano</text>
  <text x="84" y="470" font-family="Arial, sans-serif" font-size="26" letter-spacing="3" fill="#FBE3D9">NUTRIÇÃO CLÍNICA E FUNCIONAL</text>
</svg>`);
const pessoa = await sharp(recorte).resize({ height: 560 }).toBuffer();
const meta = await sharp(pessoa).metadata();
const mascara = Buffer.from(`<svg xmlns="http://www.w3.org/2000/svg" width="${meta.width}" height="560">
  <path d="M${meta.width/2-230} 560 V${300-70} A230 230 0 0 1 ${meta.width/2+230} ${300-70} V560 Z" fill="#fff"/></svg>`);
const pessoaNoArco = await sharp(pessoa).composite([{ input: mascara, blend: 'dest-in' }]).png().toBuffer();
await sharp(arco).composite([{ input: pessoaNoArco, left: Math.round(930 - meta.width / 2), top: 70 }])
  .jpeg({ quality: 84, mozjpeg: true }).toFile(`${saida}/social.jpg`);
