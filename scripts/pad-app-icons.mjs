/**
 * Pads app icons so they are not clipped on Android/iOS launchers.
 * Android adaptive icons only guarantee the center ~66% — keep artwork within ~58%.
 *
 * Usage: node scripts/pad-app-icons.mjs
 */
import sharp from 'sharp';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ASSETS = path.join(__dirname, '..', 'assets');

const OUTPUT_SIZE = 1024;
const ARTWORK_SCALE = 0.58;

async function padIcon(filename) {
    const inputPath = path.join(ASSETS, filename);
    const image = sharp(inputPath);
    const meta = await image.metadata();

    const artworkSize = Math.round(OUTPUT_SIZE * ARTWORK_SCALE);
    const resized = await image
        .resize(artworkSize, artworkSize, { fit: 'inside', withoutEnlargement: false })
        .png()
        .toBuffer();

    const left = Math.round((OUTPUT_SIZE - artworkSize) / 2);
    const top = Math.round((OUTPUT_SIZE - artworkSize) / 2);

    await sharp({
        create: {
            width: OUTPUT_SIZE,
            height: OUTPUT_SIZE,
            channels: 4,
            background: { r: 255, g: 255, b: 255, alpha: 1 },
        },
    })
        .composite([{ input: resized, left, top }])
        .png()
        .toFile(inputPath);

    console.log(`Padded ${filename} → ${OUTPUT_SIZE}×${OUTPUT_SIZE} (artwork ~${artworkSize}px)`);
}

const files = ['icon.png', 'adaptive-icon.png', 'splash-icon.png'];

for (const file of files) {
    await padIcon(file);
}
