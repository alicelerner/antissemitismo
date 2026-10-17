// Renders one of the static slide pages to a PNG, 1080 x 1440 (feed) or 1080 x 1920 with --story. Run from social/:
//   node post-b/render.mjs link 05-link [--story]      (post-b/link.html -> out/post-b/05-link[-story].png)
import { chromium } from "playwright";
import { fileURLToPath } from "node:url";
import path from "node:path";
import { format } from "./lib.mjs";

const here = path.dirname(fileURLToPath(import.meta.url));
const { H, suffix, args } = format(process.argv.slice(2));
const [name, outName = name] = args;
const file = path.resolve(here, `../out/post-b/${outName}${suffix}.png`);
const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 1080, height: H } });
await page.goto(`file://${here}/${name}.html?h=${H}`);
await page.waitForFunction(() => [...document.images].every(i => i.complete && i.naturalWidth));
await page.screenshot({ path: file });
await browser.close();
console.log(file);
