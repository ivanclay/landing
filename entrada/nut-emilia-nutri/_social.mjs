import sharp from 'sharp';
// Social 1200×630 da página (tela dividida): retrato com o ripado à esquerda, café à direita com o nome.
const retrato = await sharp('entrada/emilia-nutri/emilia-foto.jpg').resize(520, 630, { fit: 'cover', position: 'top' }).toBuffer();
const fundo = Buffer.from(`<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630">
  <defs><linearGradient id="g" x1="0" x2="1"><stop offset="0.72" stop-color="#24150f" stop-opacity="0"/><stop offset="1" stop-color="#24150f"/></linearGradient></defs>
  <rect width="1200" height="630" fill="#24150f"/>
</svg>`);
const degrade = Buffer.from(`<svg xmlns="http://www.w3.org/2000/svg" width="520" height="630">
  <defs><linearGradient id="g" x1="0" x2="1"><stop offset="0.7" stop-color="#24150f" stop-opacity="0"/><stop offset="1" stop-color="#24150f"/></linearGradient></defs>
  <rect width="520" height="630" fill="url(#g)"/></svg>`);
const texto = Buffer.from(`<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630">
  <text x="600" y="232" font-family="Arial, sans-serif" font-size="22" letter-spacing="5" fill="#e5997a">NUTRIÇÃO CLÍNICA E FUNCIONAL</text>
  <text x="596" y="340" font-family="Georgia, serif" font-size="96" fill="#f5ebe2">Emília</text>
  <text x="596" y="444" font-family="Georgia, serif" font-size="96" font-style="italic" fill="#f2b8a6">Kuwano</text>
  <line x1="600" y1="486" x2="1080" y2="486" stroke="#ab5639" stroke-width="2"/>
  <text x="600" y="530" font-family="Arial, sans-serif" font-size="24" fill="#c9b2a5">Nutricionista em Salvador · presencial e on-line</text>
</svg>`);
await sharp(fundo).composite([{ input: retrato, left: 0, top: 0 }, { input: degrade, left: 0, top: 0 }, { input: texto, left: 0, top: 0 }])
  .jpeg({ quality: 84, mozjpeg: true }).toFile('site/emilia-kuwano/imagens/social.jpg');
