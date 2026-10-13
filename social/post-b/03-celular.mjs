// Post B, slide 3: the site in use on a phone, centred on --azul-3, 1080 x 1440 MP4.
// Hero -> tap the bar, the menu opens -> tap "03 Bolsonarismo" -> short scroll -> tap the first episode, the modal opens.
// Needs the local site server (port 8766). Run from social/:
//   node post-b/03-celular.mjs record                 capture
//   node post-b/03-celular.mjs [from] [to] [speed] [bg] composite (default 1.5 60 1 azul-3)
// Add --story for the 1080 x 1920 stories version, with a larger phone.
import { chromium } from "playwright";
import { fileURLToPath } from "node:url";
import path from "node:path";
import { screencast, compose, hex, format } from "./lib.mjs";

const here = path.dirname(fileURLToPath(import.meta.url));
const out = path.resolve(here, "../out/post-b");
const frames = path.join(out, "03-frames");
const fmt = format(process.argv), argv = fmt.args;
const PHONE_W = fmt.story ? 720 : 600;
const recording = argv[2] === "record";
const bgName = recording ? "azul-3" : (argv[5] || "azul-3");
const frame = path.join(out, `03-celular-${bgName}${fmt.suffix}.png`);
const canvas = { w: 1080, h: fmt.H }, video = path.join(out, `03-celular-${bgName}${fmt.suffix}.mp4`);

const browser = await chromium.launch();

// Phone frame overlay, and where its screen hole sits in the canvas.
const fp = await browser.newPage({ viewport: { width: 1080, height: fmt.H } });
await fp.goto(`file://${here}/celular.html?w=${PHONE_W}&bg=${hex(bgName)}&ch=${fmt.H}`);
await fp.screenshot({ path: frame, omitBackground: true });
const hole = await fp.evaluate(() => window.geometry);
await fp.close();

// Runs in the page: a translucent touch dot, like iOS screen recordings, shown around each tap. Dialogs sit in
// the top layer, so the dot moves into whichever dialog is open.
function addTouch() {
  const d = document.createElement("div");
  Object.assign(d.style, { position: "fixed", left: 0, top: 0, width: "44px", height: "44px", margin: "-22px 0 0 -22px",
    borderRadius: "50%", background: "rgba(40, 40, 48, .32)", boxShadow: "0 0 0 1.5px rgba(255, 255, 255, .7)",
    zIndex: 2147483647, pointerEvents: "none", opacity: 0, transform: "scale(.9)",
    transition: "opacity 160ms cubic-bezier(0.23, 1, 0.32, 1), transform 160ms cubic-bezier(0.23, 1, 0.32, 1)" });
  document.body.append(d);
  window.touchDot = (x, y, on) => {
    (document.querySelector("dialog[open]") || document.body).append(d);
    if (on) Object.assign(d.style, { left: x + "px", top: y + "px" });
    d.style.opacity = on ? 1 : 0; d.style.transform = on ? "scale(1)" : "scale(.9)";
  };
}

// Runs in the page: momentum-like scroll, strong ease-out.
async function flick({ by, ms }) {
  const b = (t, a, c) => 3 * a * t * (1 - t) ** 2 + 3 * c * t * t * (1 - t) + t ** 3;
  const db = (t, a, c) => 3 * a * (1 - t) ** 2 + 6 * (c - a) * t * (1 - t) + 3 * (1 - c) * t * t;
  const ease = x => { let t = x; for (let i = 0; i < 8; i++) t -= (b(t, .23, .32) - x) / (db(t, .23, .32) || 1e-6); return b(t, 1, 1); };
  const from = scrollY, t0 = performance.now();
  await new Promise(done => {
    const step = now => {
      const p = Math.min((now - t0) / ms, 1);
      scrollTo(0, from + by * ease(p));
      p < 1 ? requestAnimationFrame(step) : done();
    };
    requestAnimationFrame(step);
  });
}

async function tap(page, locator) {
  const box = await locator.boundingBox();
  const x = box.x + Math.min(box.width / 2, 120), y = box.y + box.height / 2;
  await page.evaluate(([x, y]) => window.touchDot(x, y, true), [x, y]);
  await page.waitForTimeout(140);
  await page.touchscreen.tap(x, y);
  await page.waitForTimeout(80);
  await page.evaluate(([x, y]) => window.touchDot(x, y, false), [x, y]);
}

if (recording) {
  const ctx = await browser.newContext({ viewport: { width: 390, height: 800 }, deviceScaleFactor: 3, isMobile: true, hasTouch: true });
  const page = await ctx.newPage();
  await page.route(/clarity\.ms/, r => r.abort());
  await page.goto("about:blank");
  const stop = await screencast(ctx, page, frames);
  await page.goto("http://localhost:8766/", { waitUntil: "load" });
  await page.evaluate(addTouch);
  await page.waitForTimeout(4500);                       // hero
  await tap(page, page.locator(".bar__menu"));
  await page.waitForTimeout(1800);                       // menu open
  await tap(page, page.locator('#menu a[href="#eixo-3"]'));
  await page.waitForTimeout(2200);                       // cover 03, title rises
  const row = await page.locator("#eixo-3 [data-ep]").first().boundingBox();
  await page.evaluate(flick, { by: row.y - 800 * 0.55, ms: 1200 });
  await page.waitForTimeout(900);
  await tap(page, page.locator("#eixo-3 [data-ep]").first());
  await page.waitForTimeout(5500);                       // modal
  const list = await stop();
  await browser.close();
  compose({ list, frame, hole, from: 1.5, bg: hex(bgName), canvas, file: video });
} else {
  await browser.close();
  const [from, to, speed] = [1.5, 60, 1].map((d, i) => +(argv[2 + i] ?? d));
  compose({ list: `${frames}.txt`, frame, hole, from, to, speed, bg: hex(bgName), canvas, file: video });
}
