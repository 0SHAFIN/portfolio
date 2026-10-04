const fs = require('fs');
const { chromium } = require('C:/Users/shafi/AppData/Local/npm-cache/_npx/420ff84f11983ee5/node_modules/playwright');
(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage();
  const source = 'data:image/png;base64,' + fs.readFileSync('public/brand/shafin-mark.png').toString('base64');
  for (const size of [16, 32, 180, 192, 512]) {
    const data = await page.evaluate(async ({source, size}) => {
      const image = new Image(); image.src = source; await image.decode();
      const canvas = document.createElement('canvas'); canvas.width = canvas.height = size;
      const ctx = canvas.getContext('2d'); ctx.fillStyle = '#090909'; ctx.fillRect(0,0,size,size);
      ctx.drawImage(image,0,0,size,size); return canvas.toDataURL('image/png').split(',')[1];
    }, {source, size});
    fs.writeFileSync(`public/brand/${size === 180 ? 'apple-touch-icon' : 'icon-'+size}.png`, Buffer.from(data,'base64'));
  }
  const png = fs.readFileSync('public/brand/icon-32.png');
  const header = Buffer.alloc(22); header.writeUInt16LE(1,2); header.writeUInt16LE(1,4);
  header[6] = header[7] = 32; header.writeUInt16LE(1,10); header.writeUInt16LE(32,12);
  header.writeUInt32LE(png.length,14); header.writeUInt32LE(22,18);
  const ico = Buffer.concat([header,png]);
  fs.writeFileSync('public/brand/favicon.ico',ico); fs.writeFileSync('app/favicon.ico',ico);
  const social = await page.evaluate(async (source) => {
    const image = new Image(); image.src = source; await image.decode();
    const canvas = document.createElement('canvas'); canvas.width=1200; canvas.height=630;
    const ctx=canvas.getContext('2d'); ctx.fillStyle='#090909'; ctx.fillRect(0,0,1200,630);
    ctx.drawImage(image,100,135,360,360);
    ctx.fillStyle='#ffffff'; ctx.font='bold 84px sans-serif'; ctx.fillText('SHAFIN',510,310);
    ctx.fillStyle='#C9EB00'; ctx.font='30px sans-serif'; ctx.fillText('FULL-STACK DEVELOPER',510,370);
    return canvas.toDataURL('image/png').split(',')[1];
  }, source);
  fs.writeFileSync('public/brand/shafin-social.png',Buffer.from(social,'base64'));
  await browser.close();
})();
