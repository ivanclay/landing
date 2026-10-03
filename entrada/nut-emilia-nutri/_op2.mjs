import sharp from 'sharp';
// Opcao 2: recorte quadrado (para o circulo) achatado no rosa da marca. O topo do cabelo encosta na
// borda do original; o circulo recorta essa linha, entao o quadrado parte do topo, sem respiro falso.
const recorte = 'entrada/emilia-nutri/emilia-foto-sem-fundo.png';
const achatado = await sharp(recorte).flatten({ background: '#F2B8A6' }).png().toBuffer();
await sharp(achatado).extract({ left: 98, top: 0, width: 1300, height: 1300 })
  .jpeg({ quality: 95 }).toFile('entrada/emilia-nutri/op2-retrato.jpg');
