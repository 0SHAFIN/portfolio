import sharp from "sharp";

// Isolate the eight connected characters, rather than cutting through the artwork
// at the generated atlas's fractional 443.5-pixel cell boundaries.
const source = "design/source-art/byte-run-cycle.png";
const output = "public/art/byte-run-cycle-isolated.webp";
const { data, info } = await sharp(source).ensureAlpha().raw().toBuffer({ resolveWithObject: true });
const { width, height } = info;
const visited = new Uint8Array(width * height);
const queue = new Int32Array(width * height);
const characters = [];

for (let index = 0; index < width * height; index++) {
  if (visited[index] || data[index * 4 + 3] < 16) continue;
  let start = 0;
  let end = 1;
  let area = 0;
  let left = width;
  let right = 0;
  let top = height;
  let bottom = 0;
  queue[0] = index;
  visited[index] = 1;
  while (start < end) {
    const pixel = queue[start++];
    const x = pixel % width;
    const y = Math.floor(pixel / width);
    area++;
    left = Math.min(left, x);
    right = Math.max(right, x);
    top = Math.min(top, y);
    bottom = Math.max(bottom, y);
    for (let dy = -1; dy <= 1; dy++) {
      for (let dx = -1; dx <= 1; dx++) {
        const nx = x + dx;
        const ny = y + dy;
        if (nx < 0 || nx >= width || ny < 0 || ny >= height) continue;
        const next = ny * width + nx;
        if (!visited[next] && data[next * 4 + 3] >= 16) {
          visited[next] = 1;
          queue[end++] = next;
        }
      }
    }
  }
  if (area > 10000) characters.push({ left, right, top, bottom });
}

if (characters.length !== 8) throw new Error(`Expected 8 characters, found ${characters.length}`);
characters.sort((a, b) => Math.floor(a.top / (height / 2)) - Math.floor(b.top / (height / 2)) || a.left - b.left);

const cell = 512;
const gutter = 34;
const sprites = await Promise.all(characters.map(async (bounds, index) => {
  const col = index % 4;
  const row = Math.floor(index / 4);
  // Keep the original pose registration and its antialiased outline. Never crop
  // the head/scarf at the nominal cell edge, and never include another pose.
  const left = Math.max(0, bounds.left - 3);
  const top = Math.max(0, bounds.top - 3);
  const crop = { left, top, width: Math.min(width - left, bounds.right - left + 4), height: Math.min(height - top, bounds.bottom - top + 4) };
  const targetX = gutter + left - Math.round(col * width / 4);
  const targetY = gutter + top - Math.round(row * height / 2);
  if (targetX < 8 || targetY < 8 || targetX + crop.width > cell - 8 || targetY + crop.height > cell - 8) {
    throw new Error(`Frame ${index} does not have a safe transparent gutter`);
  }
  return {
    input: await sharp(source).extract(crop).png().toBuffer(),
    left: col * cell + targetX,
    top: row * cell + targetY,
  };
}));

await sharp({ create: { width: cell * 4, height: cell * 2, channels: 4, background: { r: 0, g: 0, b: 0, alpha: 0 } } })
  .composite(sprites)
  .webp({ quality: 94, alphaQuality: 100, effort: 6 })
  .toFile(output);

console.log(`${output}: 2048 × 1024, eight 512px cells with transparent gutters`);
