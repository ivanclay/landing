import sharp from 'sharp';
const [,, saida, ...arqs] = process.argv;
const W=400,H=300,cols=4;
const rows=Math.ceil(arqs.length/cols);
const comps=[];
for (let i=0;i<arqs.length;i++){
  const img=await sharp(arqs[i]).resize(W,H,{fit:'contain',background:'#fff'}).toBuffer();
  const x=(i%cols)*W, y=Math.floor(i/cols)*(H+24);
  comps.push({input:img,left:x,top:y});
  const nome=arqs[i].split('/').pop();
  comps.push({input:Buffer.from(`<svg width="${W}" height="24"><rect width="100%" height="100%" fill="#fff"/><text x="4" y="17" font-size="15" font-family="Arial">${nome}</text></svg>`),left:x,top:y+H});
}
await sharp({create:{width:cols*W,height:rows*(H+24),channels:3,background:'#fff'}}).composite(comps).jpeg().toFile(saida);
