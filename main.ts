// Entry program for the make.fun "Day one, day seven" TikTok bounty (Node 22, standard library only).
// The real entry is the TikTok video itself; this program's single job is to place VIDEO.json —
// the file naming the posted video's full TikTok address — into the output directory, where the
// house gate reads it and then reads the video's public counts from TikTok.
// Local run (stands in for /bot and /output):
//   mkdir -p out && MAKEFUN_BOT_DIR=. MAKEFUN_OUTPUT_DIR=out node main.ts

import { copyFileSync, mkdirSync, readFileSync } from 'node:fs';
import { join } from 'node:path';

const botDir = process.env.MAKEFUN_BOT_DIR ?? '/bot';
const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? '/output';

mkdirSync(outDir, { recursive: true });
const target = join(outDir, 'VIDEO.json');
copyFileSync(join(botDir, 'VIDEO.json'), target);

// Read the copy back and fail loudly if it is not the JSON object the gate expects:
// a single "url" string naming the video on TikTok.
const parsed = JSON.parse(readFileSync(target, 'utf8'));
if (typeof parsed.url !== 'string' || !parsed.url.startsWith('https://www.tiktok.com/@')) {
  console.error('VIDEO.json in the output does not name a TikTok video');
  process.exit(1);
}
